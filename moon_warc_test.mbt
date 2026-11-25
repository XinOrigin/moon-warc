///|
test "root facade sample_archive_bytes parses, validates, indexes, resolves revisits, and round-trips" {
  assert_eq(@moon_warc.library_version(), "0.2.0")
  let raw = @moon_warc.sample_archive_bytes()
  let records = match @moon_warc.parse_archive(raw) {
    Ok(recs) => recs
    Err(_) => fail("parse_archive failed")
  }
  assert_eq(records.length(), 6)
  assert_eq(records[0].header.warc_type(), Some(@header.WarcInfo))
  assert_eq(records[1].header.warc_type(), Some(@header.Request))
  assert_eq(records[2].header.warc_type(), Some(@header.Response))
  assert_eq(records[3].header.warc_type(), Some(@header.Metadata))
  assert_eq(records[4].header.warc_type(), Some(@header.Resource))
  assert_eq(records[5].header.warc_type(), Some(@header.Revisit))

  // Verify response has both SHA-256 block digest and de-chunked payload digest
  assert_true(records[2].header.block_digest() is Some(_))
  assert_true(records[2].header.payload_digest() is Some(_))
  assert_true(records[4].header.block_digest() is Some(_))
  assert_true(records[4].header.payload_digest() is Some(_))

  let report = @moon_warc.validate_archive(records)
  assert_true(report.is_valid())
  assert_eq(report.record_count, 6)
  assert_eq(report.error_count, 0)
  assert_eq(report.warning_count, 0)

  let index = @moon_warc.build_cdxj_index(
    records,
    filename="sample-crawl-2026.warc",
  )
  assert_eq(index.entries.length(), 3)
  assert_eq(index.entries[0].surt, "org,example)/index.html")
  assert_eq(index.entries[0].status, Some(200))
  assert_eq(index.entries[0].mime, Some("text/html"))
  assert_eq(index.entries[1].surt, "org,example)/index.html")
  assert_eq(index.entries[1].warc_type, "revisit")
  assert_eq(index.entries[2].surt, "org,example,cdn)/app.json")
  assert_eq(index.entries[2].warc_type, "resource")

  assert_eq(
    index.lookup_exact("https://example.org:443/index.html#section").length(),
    2,
  )
  match
    index.lookup_closest("https://example.org/index.html", "20261125121000") {
    Some(hit) => assert_eq(hit.warc_type, "revisit")
    None => fail("expected closest CDXJ hit")
  }

  let revisits = @moon_warc.resolve_revisits(records)
  assert_eq(revisits.length(), 1)
  assert_eq(revisits[0].match_kind, @validate.ByRecordId)
  assert_eq(revisits[0].target_index, Some(2))
  assert_eq(
    revisits[0].target_record_id,
    Some("<urn:uuid:00000000-0000-4000-8000-000000000003>"),
  )

  let reencoded = @moon_warc.encode_archive(records)
  assert_eq(reencoded, raw)
}

///|
test "root facade parse_archive rejects malformed stream and encode_archive preserves custom records" {
  assert_true(@moon_warc.parse_archive(b"NOT_A_WARC\r\n\r\n") is Err(_))
  let rec = @codec.build_resource(
    record_id="<urn:uuid:facade-res-1>",
    date="2026-11-25T13:00:00Z",
    target_uri="https://example.org/data.bin",
    content_type="application/octet-stream",
    b"\x00\x01\x02\x03",
  )
  let wire = @moon_warc.encode_archive([rec])
  let parsed = match @moon_warc.parse_archive(wire) {
    Ok(p) => p
    Err(_) => fail("parse_archive failed")
  }
  assert_eq(parsed.length(), 1)
  assert_eq(parsed[0].payload, b"\x00\x01\x02\x03")
  let rep = @moon_warc.validate_archive(parsed)
  assert_true(rep.is_valid())
}

///|
test "root facade segment_record and reassemble_segments round-trip with validation" {
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(r) => r
    Err(_) => fail("parse failed")
  }
  let orig = recs[2]
  let segs = match @moon_warc.segment_record(orig, max_segment_bytes=48) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  assert_true(segs.length() >= 3)
  let seg_wire = @moon_warc.encode_archive(segs)
  let reparsed = match @moon_warc.parse_archive(seg_wire) {
    Ok(r) => r
    Err(_) => fail("parse segmented failed")
  }
  let val = @moon_warc.validate_archive([recs[1], ..reparsed])
  assert_true(val.is_valid())
  assert_eq(val.error_count, 0)
  assert_eq(val.warning_count, 0)
  let rebuilt = match @moon_warc.reassemble_segments(reparsed) {
    Ok(r) => r
    Err(_) => fail("reassemble failed")
  }
  assert_eq(rebuilt.length(), 1)
  assert_eq(rebuilt[0].payload, orig.payload)
  assert_true(@moon_warc.validate_archive(rebuilt).is_valid())
}

///|
test "root facade filter_records and extract_subset produce self-consistent WARC" {
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(r) => r
    Err(_) => fail("parse failed")
  }
  let flt = @pipeline.ArchiveFilter::new(
    surt_prefix="org,example,cdn)",
    mime_prefix="application/json",
  )
  assert_eq(@moon_warc.filter_records(recs, flt).length(), 1)
  let sub_wire = @moon_warc.extract_subset(recs, flt, include_warcinfo=true)
  let sub_recs = match @moon_warc.parse_archive(sub_wire) {
    Ok(r) => r
    Err(_) => fail("parse subset failed")
  }
  assert_eq(sub_recs.length(), 2)
  assert_true(@moon_warc.validate_archive(sub_recs).is_valid())
}

///|
test "root facade export_cdx11 and export_jsonl reflect sample archive" {
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(r) => r
    Err(_) => fail("parse failed")
  }
  let cdx11 = @moon_warc.export_cdx11(recs, filename="sample-crawl-2026.warc")
  assert_true(cdx11.has_prefix(" CDX N b a m s k r M S V g\n"))
  let jsonl = @moon_warc.export_jsonl(recs)
  assert_true(jsonl.contains("\"warc_type\":\"response\""))
  assert_true(
    jsonl.contains(
      "\"text\":\"<!doctype html><html><body><h1>Hello WARC</h1></body></html>\\n\"",
    ),
  )
}

///|
test "root facade validate_archive flags dangling segment origin with warning" {
  let dangling_cont = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:dangling-cont-2>"),
      ("WARC-Date", "2026-11-25T12:00:00Z"),
      ("WARC-Segment-Origin-ID", "<urn:uuid:missing-origin>"),
      ("WARC-Segment-Number", "2"),
      ("Content-Length", "4"),
    ],
    b"part",
  )
  let rep = @moon_warc.validate_archive([dangling_cont])
  assert_true(rep.is_valid())
  assert_eq(rep.warning_count, 1)
  assert_eq(rep.diagnostics[0].code, "UNRESOLVED_SEGMENT_ORIGIN_ID")
}
