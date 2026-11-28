///|
test "root facade sample_archive_bytes parses, validates, indexes, resolves revisits, and round-trips" {
  assert_eq(@moon_warc.library_version(), "0.5.1")
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
  let entries = index.entries()
  assert_eq(entries.length(), 3)
  assert_eq(entries[0].surt, "org,example)/index.html")
  assert_eq(entries[0].status, Some(200))
  assert_eq(entries[0].mime, Some("text/html"))
  assert_eq(entries[1].surt, "org,example)/index.html")
  assert_eq(entries[1].warc_type, "revisit")
  assert_eq(entries[2].surt, "org,example,cdn)/app.json")
  assert_eq(entries[2].warc_type, "resource")

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

///|
test "root facade new_reader streams sample archive incrementally" {
  let wire = @moon_warc.sample_archive_bytes()
  let reader = @moon_warc.new_reader()
  let streamed : Array[@codec.WarcRecord] = []
  let mut pos = 0
  while pos < wire.length() {
    let end = if pos + 43 > wire.length() { wire.length() } else { pos + 43 }
    reader.feed(wire[pos:end])
    while true {
      match reader.next_record() {
        Ok(Some(r)) => streamed.push(r)
        Ok(None) => break
        Err(_) => fail("root reader failed")
      }
    }
    pos = end
  }
  assert_eq(reader.finish(), Ok(()))
  let batch = match @moon_warc.parse_archive(wire) {
    Ok(v) => v
    Err(_) => fail("batch parse failed")
  }
  assert_eq(streamed, batch)
}

///|
test "root facade scan_archive and encode_archive_gz/parse_archive_gz round-trip with compressed CDXJ" {
  let wire = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(wire) {
    Ok(v) => v
    Err(_) => fail("parse_archive failed")
  }
  let mut scanned_count = 0L
  assert_eq(
    @moon_warc.scan_archive(wire, fn(r) {
      ignore(r)
      scanned_count = scanned_count + 1L
    }),
    Ok(6L),
  )
  assert_eq(scanned_count, 6L)
  let gz = @moon_warc.encode_archive_gz(recs)
  let parsed_gz = match @moon_warc.parse_archive_gz(gz) {
    Ok(v) => v
    Err(_) => fail("parse_archive_gz failed")
  }
  assert_eq(parsed_gz.length(), 6)
  assert_true(@moon_warc.validate_archive(parsed_gz).is_valid())
  let gz_cdx = @moon_warc.build_cdxj_index(
    parsed_gz,
    filename="sample-crawl-2026.warc.gz",
  )
  assert_eq(gz_cdx.length(), 3)
  assert_eq(gz_cdx.get(0).map(e => e.offset), Some(parsed_gz[2].offset))
  assert_eq(gz_cdx.get(0).map(e => e.length), Some(parsed_gz[2].record_length))
}

///|
test "root facade new_gz_reader and scan_archive_gz stream multi-member .warc.gz across tiny chunks" {
  let wire = @moon_warc.sample_archive_bytes()
  let recs = @moon_warc.parse_archive(wire).unwrap()
  let gz = @moon_warc.encode_archive_gz(recs)
  let scanned : Array[@codec.WarcRecord] = []
  assert_eq(@moon_warc.scan_archive_gz(gz, fn(r) { scanned.push(r) }), Ok(6L))
  let batch = @moon_warc.parse_archive_gz(gz).unwrap()
  assert_eq(scanned, batch)

  for step in [1, 7, 17, 64] {
    let reader = @moon_warc.new_gz_reader()
    let streamed : Array[@codec.WarcRecord] = []
    let mut pos = 0
    while pos < gz.length() {
      let end = if pos + step > gz.length() { gz.length() } else { pos + step }
      reader.feed(gz[pos:end])
      while true {
        match reader.next_record() {
          Ok(Some(r)) => streamed.push(r)
          Ok(None) => break
          Err(_) => fail("WarcGzReader failed")
        }
      }
      pos = end
    }
    assert_eq(reader.finish(), Ok(()))
    assert_eq(reader.bytes_consumed(), gz.length().to_int64())
    assert_eq(streamed, batch)
  }
}

///|
test "root facade record_http_exchange and record_http_exchange_gz produce valid linked WARC captures" {
  let req_bytes = b"GET /article HTTP/1.1\r\nHost: news.example.org\r\n\r\n"
  let resp_bytes = b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n0\r\n\r\n"
  let meta_bytes = b"fetchTimeMs: 18\r\nhopsFromSeed: 1\r\n"
  let recs = @moon_warc.record_http_exchange(
    request_id="<urn:uuid:ex-req-1>",
    response_id="<urn:uuid:ex-resp-1>",
    metadata_id="<urn:uuid:ex-meta-1>",
    date="2026-11-27T12:00:00Z",
    target_uri="https://news.example.org/article",
    request_bytes=req_bytes,
    response_bytes=resp_bytes,
    metadata_bytes=meta_bytes,
  )
  assert_eq(recs.length(), 3)
  let gz = @moon_warc.record_http_exchange_gz(
    request_id="<urn:uuid:ex-req-1>",
    response_id="<urn:uuid:ex-resp-1>",
    metadata_id="<urn:uuid:ex-meta-1>",
    date="2026-11-27T12:00:00Z",
    target_uri="https://news.example.org/article",
    request_bytes=req_bytes,
    response_bytes=resp_bytes,
    metadata_bytes=meta_bytes,
  )
  let parsed = @moon_warc.parse_archive_gz(gz).unwrap()
  assert_eq(parsed.length(), 3)
  let rep = @moon_warc.validate_archive(parsed)
  assert_true(rep.is_valid())
  assert_eq(rep.error_count, 0)
  assert_eq(
    parsed[0].header.get("WARC-Concurrent-To"),
    Some("<urn:uuid:ex-resp-1>"),
  )
  assert_eq(
    parsed[1].header.get("WARC-Concurrent-To"),
    Some("<urn:uuid:ex-req-1>"),
  )
  assert_eq(
    parsed[2].header.get("WARC-Concurrent-To"),
    Some("<urn:uuid:ex-resp-1>"),
  )
  let single_gz = @moon_warc.encode_record_gz(recs[1])
  assert_eq(@moon_warc.parse_archive_gz(single_gz).unwrap().length(), 1)

  let wacz = @moon_warc.build_wacz_manifests(
    parsed,
    gz,
    warc_filename="exchange.warc.gz",
    title="Exchange WACZ",
    main_page_url="https://news.example.org/article",
    main_page_date="2026-11-27T12:00:00Z",
  )
  assert_true(wacz.datapackage_json.contains("\"wacz_version\":\"1.1.1\""))
  assert_true(wacz.datapackage_json.contains("\"archive/exchange.warc.gz\""))
  assert_true(wacz.datapackage_json.contains("\"indexes/index.cdxj\""))
  assert_true(
    wacz.datapackage_digest_json.contains("\"path\":\"datapackage.json\""),
  )
  assert_true(wacz.cdxj_text.contains("org,example,news)/article"))
}

///|
test "root facade enforces ReaderLimits, rejects corrupt/truncated .warc.gz, and supports non-default params" {
  let wire = @moon_warc.sample_archive_bytes()
  let tight : @codec.ReaderLimits = {
    max_header_bytes: 32,
    max_payload_bytes: 16,
  }
  assert_true(
    @moon_warc.parse_archive(wire, limits=tight) is Err(@codec.LimitExceeded(_)),
  )
  let recs = @moon_warc.parse_archive(wire).unwrap()
  let gz = @moon_warc.encode_archive_gz(recs, auto_digest=false, level=0)
  assert_true(
    @moon_warc.parse_archive_gz(gz, limits=tight)
    is Err(@codec.LimitExceeded(_)),
  )
  assert_true(
    @moon_warc.scan_archive_gz(gz, limits=tight, fn(_) { () })
    is Err(@codec.LimitExceeded(_)),
  )
  let bad_crc = gz[0:gz.length() - 8].to_owned() +
    Bytes::makei(1, _ => (gz[gz.length() - 8].to_int() ^ 0x01).to_byte()) +
    gz[gz.length() - 7:gz.length()].to_owned()
  assert_true(@moon_warc.parse_archive_gz(bad_crc) is Err(@codec.GzipError(_)))
  assert_true(
    @moon_warc.scan_archive_gz(gz[0:gz.length() - 3], fn(_) { () })
    is Err(@codec.GzipError(_)),
  )
  let r = @moon_warc.new_gz_reader()
  r.feed(gz[0:gz.length() - 2])
  while true {
    match r.next_record() {
      Ok(Some(_)) => ()
      Ok(None) => break
      Err(_) => fail("unexpected error before finish")
    }
  }
  assert_true(r.finish() is Err(@codec.GzipError(_)))
  let ex = @moon_warc.record_http_exchange(
    request_id="<urn:uuid:v10-req>",
    response_id="<urn:uuid:v10-resp>",
    date="2026-11-28T00:00:00Z",
    target_uri="https://example.org/v10",
    request_bytes=b"GET /v10 HTTP/1.0\r\n\r\n",
    response_bytes=b"HTTP/1.0 200 OK\r\n\r\nok",
    version=@header.Warc1_0,
  )
  assert_eq(ex.length(), 2)
  assert_eq(ex[0].header.version, @header.Warc1_0)
}
