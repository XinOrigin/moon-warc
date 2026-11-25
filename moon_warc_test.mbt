///|
test "root facade sample_archive_bytes parses, validates, indexes, resolves revisits, and round-trips" {
  assert_eq(@moon_warc.library_version(), "0.1.0")
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
