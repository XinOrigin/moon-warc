///|
fn make_pipeline_fixture() -> Array[@codec.WarcRecord] {
  let wi = @codec.build_warcinfo(
    record_id="<urn:uuid:pipe-0001>",
    date="2026-11-25T10:00:00Z",
    filename="pipe-crawl.warc",
    b"software: moon-warc/0.2.0\r\n",
  )
  let req = @codec.build_request(
    record_id="<urn:uuid:pipe-0002>",
    date="2026-11-25T10:05:00Z",
    target_uri="https://docs.example.org/guide.html",
    concurrent_to="<urn:uuid:pipe-0003>",
    b"GET /guide.html HTTP/1.1\r\nHost: docs.example.org\r\n\r\n",
  )
  let resp_ok = @codec.build_response(
    record_id="<urn:uuid:pipe-0003>",
    date="2026-11-25T10:05:00Z",
    target_uri="https://docs.example.org/guide.html",
    concurrent_to="<urn:uuid:pipe-0002>",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n9\r\n \"World\"\n\r\n0\r\n\r\n",
  )
  let resp_not_found = @codec.build_response(
    record_id="<urn:uuid:pipe-0004>",
    date="2026-11-25T11:00:00Z",
    target_uri="https://api.example.org/missing",
    b"HTTP/1.1 404 Not Found\r\nContent-Type: application/json\r\n\r\n{\"error\":\"not_found\"}\n",
  )
  let res_bin = @codec.build_resource(
    record_id="<urn:uuid:pipe-0005>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://cdn.example.org/img.png",
    content_type="application/octet-stream",
    b"\x89PNG\r\n\x1a\n\x00\xff",
  )
  let res_txt = @codec.build_resource(
    record_id="<urn:uuid:pipe-0006>",
    date="2026-11-25T12:30:00Z",
    target_uri="https://cdn.example.org/notes.txt",
    content_type="text/plain; charset=utf-8",
    b"Line1\tTabbed\nLine2\\Slash\x01Ctrl\xe4\xb8\xad\xe6\x96\x87\xf0\x9f\x8c\x99",
  )
  let raw = @codec.encode_all([
    wi, req, resp_ok, resp_not_found, res_bin, res_txt,
  ])
  match @codec.parse_all(raw) {
    Ok(recs) => recs
    Err(_) => abort("fixture parse failed")
  }
}

///|
test "segment_record rejects non-positive max_segment_bytes" {
  let recs = make_pipeline_fixture()
  assert_true(
    @pipeline.segment_record(recs[2], max_segment_bytes=0)
    is Err(@pipeline.InvalidSegmentSize(_)),
  )
  assert_true(
    @pipeline.segment_record(recs[2], max_segment_bytes=-16)
    is Err(@pipeline.InvalidSegmentSize(_)),
  )
}

///|
test "segment_record returns original record unsplit when payload <= max_segment_bytes" {
  let small = @codec.build_resource(
    record_id="<urn:uuid:small-1>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/s.txt",
    content_type="text/plain",
    b"abc",
  )
  match @pipeline.segment_record(small, max_segment_bytes=3) {
    Ok(segs) => {
      assert_eq(segs.length(), 1)
      assert_eq(segs[0], small)
    }
    Err(_) => fail("expected unsplit record")
  }
}

///|
test "segment_record splits chunked HTTP response and preserves logical WARC-Payload-Digest" {
  let recs = make_pipeline_fixture()
  let orig = recs[2]
  let segs = match @pipeline.segment_record(orig, max_segment_bytes=25) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  assert_true(segs.length() >= 4)
  assert_eq(segs[0].header.warc_type(), Some(@header.Response))
  assert_eq(segs[0].header.segment_number(), Some(1))
  assert_eq(segs[0].header.payload_digest(), orig.header.payload_digest())
  assert_eq(segs[0].payload.length(), 25)
  for k in 1..<segs.length() {
    assert_eq(segs[k].header.warc_type(), Some(@header.Continuation))
    assert_eq(segs[k].header.segment_origin_id(), orig.header.record_id())
    assert_eq(segs[k].header.segment_number(), Some(k + 1))
    assert_true(segs[k].payload.length() <= 25)
  }
  assert_eq(
    segs[segs.length() - 1].header.segment_total_length(),
    Some(orig.payload.length().to_int64()),
  )
}

///|
test "segment_record encodes to wire bytes and reassembles cleanly via WarcReader" {
  let recs = make_pipeline_fixture()
  let orig = recs[2]
  let segs = match @pipeline.segment_record(orig, max_segment_bytes=31) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  let wire = @codec.encode_all(segs, auto_digest=true)
  let reparsed = match @codec.parse_all(wire) {
    Ok(r) => r
    Err(_) => fail("parse_all failed on segmented wire bytes")
  }
  assert_eq(reparsed[0].header.payload_digest(), orig.header.payload_digest())
  let reassembled = match @pipeline.reassemble_segments(reparsed) {
    Ok(r) => r
    Err(_) => fail("reassemble_segments failed")
  }
  assert_eq(reassembled.length(), 1)
  assert_eq(reassembled[0].payload, orig.payload)
  assert_eq(reassembled[0].header.segment_number(), None)
  assert_eq(
    reassembled[0].header.content_length(),
    Some(orig.payload.length().to_int64()),
  )
  assert_eq(
    reassembled[0].header.block_digest(),
    Some(@digest.format_warc_digest_sha256(orig.payload)),
  )
}

///|
test "segment_record splits resource record without WARC-Payload-Digest and computes digest" {
  let res = @codec.build_resource(
    record_id="<urn:uuid:res-seg-1>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/raw.txt",
    content_type="text/plain",
    b"0123456789abcdefghijklmnopqrstuvwxyz",
  )
  let segs = match @pipeline.segment_record(res, max_segment_bytes=10) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  assert_eq(segs.length(), 4)
  assert_eq(
    segs[0].header.payload_digest(),
    Some(@digest.format_warc_digest_sha256(res.payload)),
  )
  let reassembled = match @pipeline.reassemble_segments(segs) {
    Ok(r) => r
    Err(_) => fail("reassemble failed")
  }
  assert_eq(reassembled[0].payload, res.payload)
}

///|
test "reassemble_segments passes through non-segmented records mixed with segmented records" {
  let recs = make_pipeline_fixture()
  let segs = match @pipeline.segment_record(recs[2], max_segment_bytes=40) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  let mixed : Array[@codec.WarcRecord] = [recs[0], recs[1]]
  for s in segs {
    mixed.push(s)
  }
  mixed.push(recs[4])
  let reassembled = match @pipeline.reassemble_segments(mixed) {
    Ok(r) => r
    Err(_) => fail("reassemble failed")
  }
  assert_eq(reassembled.length(), 4)
  assert_eq(reassembled[0].header.record_id(), recs[0].header.record_id())
  assert_eq(reassembled[1].header.record_id(), recs[1].header.record_id())
  assert_eq(reassembled[2].payload, recs[2].payload)
  assert_eq(reassembled[3].header.record_id(), recs[4].header.record_id())
}

///|
test "segment_record rejects record without WARC-Record-ID" {
  let no_id = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/a"),
      ("Content-Length", "10"),
    ],
    b"0123456789",
  )
  assert_true(
    @pipeline.segment_record(no_id, max_segment_bytes=4)
    is Err(@pipeline.MissingOriginRecord(_)),
  )
}

///|
test "reassemble_segments rejects orphan continuation record" {
  let orphan = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:orphan-2>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Segment-Origin-ID", "<urn:uuid:absent>"),
      ("WARC-Segment-Number", "2"),
      ("Content-Length", "3"),
    ],
    b"xyz",
  )
  assert_true(
    @pipeline.reassemble_segments([orphan])
    is Err(@pipeline.MissingOriginRecord(_)),
  )
}

///|
test "reassemble_segments rejects continuation missing WARC-Segment-Origin-ID" {
  let c = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:c-noid>"),
      ("WARC-Segment-Number", "2"),
      ("Content-Length", "1"),
    ],
    b"x",
  )
  assert_true(
    @pipeline.reassemble_segments([c]) is Err(@pipeline.MissingOriginRecord(_)),
  )
}

///|
test "reassemble_segments rejects continuation missing WARC-Segment-Number" {
  let c = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:c-nonum>"),
      ("WARC-Segment-Origin-ID", "<urn:uuid:orig>"),
      ("Content-Length", "1"),
    ],
    b"x",
  )
  assert_true(
    @pipeline.reassemble_segments([c]) is Err(@pipeline.MissingSegmentNumber(_)),
  )
}

///|
test "reassemble_segments rejects out-of-order and gapped continuation segments" {
  let recs = make_pipeline_fixture()
  let segs = match @pipeline.segment_record(recs[2], max_segment_bytes=30) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  assert_true(segs.length() >= 3)
  let swapped : Array[@codec.WarcRecord] = [segs[0], segs[2], segs[1]]
  for i in 3..<segs.length() {
    swapped.push(segs[i])
  }
  assert_true(
    @pipeline.reassemble_segments(swapped)
    is Err(@pipeline.OutOfOrderSegment(_)),
  )
  let gapped = [segs[0], segs[2]]
  assert_true(
    @pipeline.reassemble_segments(gapped) is Err(@pipeline.OutOfOrderSegment(_)),
  )
}

///|
test "reassemble_segments rejects segment total length mismatch" {
  let recs = make_pipeline_fixture()
  let segs = match @pipeline.segment_record(recs[2], max_segment_bytes=50) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  let last_idx = segs.length() - 1
  let bad_last : @codec.WarcRecord = {
    header: segs[last_idx].header.with_field(
      "WARC-Segment-Total-Length", "99999",
    ),
    payload: segs[last_idx].payload,
    offset: 0L,
    record_length: 0L,
  }
  let bad_segs = segs[0:last_idx].to_owned()
  bad_segs.push(bad_last)
  assert_true(
    @pipeline.reassemble_segments(bad_segs)
    is Err(@pipeline.TotalLengthMismatch(_)),
  )
}

///|
test "reassemble_segments detects tampered payload digest across segments" {
  let recs = make_pipeline_fixture()
  let segs = match @pipeline.segment_record(recs[5], max_segment_bytes=12) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  let tampered_seg0 : @codec.WarcRecord = {
    header: segs[0].header.with_field(
      "WARC-Payload-Digest",
      @digest.format_warc_digest_sha256(b"wrong-content"),
    ),
    payload: segs[0].payload,
    offset: 0L,
    record_length: 0L,
  }
  let modified = [tampered_seg0]
  for i in 1..<segs.length() {
    modified.push(segs[i])
  }
  assert_true(
    @pipeline.reassemble_segments(modified)
    is Err(@pipeline.PayloadDigestMismatch(_)),
  )
}

///|
test "reassemble_segments rejects origin segment 1 with no continuation records" {
  let solo_seg1 = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:solo-1>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/solo"),
      ("WARC-Segment-Number", "1"),
      ("Content-Length", "3"),
    ],
    b"abc",
  )
  assert_true(
    @pipeline.reassemble_segments([solo_seg1])
    is Err(@pipeline.OutOfOrderSegment(_)),
  )
}

///|
test "ArchiveFilter::all matches every record" {
  let recs = make_pipeline_fixture()
  let filtered = @pipeline.filter_records(recs, @pipeline.ArchiveFilter::all())
  assert_eq(filtered.length(), 6)
}

///|
test "ArchiveFilter filters by warc_types and include_warcinfo flag" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(warc_types=[@header.Response])
  assert_eq(@pipeline.filter_records(recs, f).length(), 2)
  let with_wi = @pipeline.filter_records(recs, f, include_warcinfo=true)
  assert_eq(with_wi.length(), 3)
  assert_eq(with_wi[0].header.warc_type(), Some(@header.WarcInfo))
}

///|
test "ArchiveFilter filters by surt_prefix" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(surt_prefix="org,example,cdn)")
  let matched = @pipeline.filter_records(recs, f)
  assert_eq(matched.length(), 2)
  assert_eq(matched[0].header.record_id(), Some("<urn:uuid:pipe-0005>"))
  assert_eq(matched[1].header.record_id(), Some("<urn:uuid:pipe-0006>"))
}

///|
test "ArchiveFilter filters by mime_prefix across HTTP responses and resources" {
  let recs = make_pipeline_fixture()
  let f_text = @pipeline.ArchiveFilter::new(mime_prefix="TEXT/")
  let matched_text = @pipeline.filter_records(recs, f_text)
  assert_eq(matched_text.length(), 2)
  assert_eq(matched_text[0].header.record_id(), Some("<urn:uuid:pipe-0003>"))
  assert_eq(matched_text[1].header.record_id(), Some("<urn:uuid:pipe-0006>"))
  let f_json = @pipeline.ArchiveFilter::new(mime_prefix="application/json")
  let matched_json = @pipeline.filter_records(recs, f_json)
  assert_eq(matched_json.length(), 1)
  assert_eq(matched_json[0].header.record_id(), Some("<urn:uuid:pipe-0004>"))
}

///|
test "ArchiveFilter filters by HTTP status_min and status_max bounds" {
  let recs = make_pipeline_fixture()
  let f2xx = @pipeline.ArchiveFilter::new(status_min=200, status_max=299)
  let m2xx = @pipeline.filter_records(recs, f2xx)
  assert_eq(m2xx.length(), 1)
  assert_eq(m2xx[0].header.record_id(), Some("<urn:uuid:pipe-0003>"))
  let f4xx = @pipeline.ArchiveFilter::new(status_min=400, status_max=499)
  let m4xx = @pipeline.filter_records(recs, f4xx)
  assert_eq(m4xx.length(), 1)
  assert_eq(m4xx[0].header.record_id(), Some("<urn:uuid:pipe-0004>"))
}

///|
test "ArchiveFilter filters by date_from and date_to using lexical_compare" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(
    date_from="2026-11-25T11:00:00Z",
    date_to="20261125120000",
  )
  let matched = @pipeline.filter_records(recs, f)
  assert_eq(matched.length(), 2)
  assert_eq(matched[0].header.record_id(), Some("<urn:uuid:pipe-0004>"))
  assert_eq(matched[1].header.record_id(), Some("<urn:uuid:pipe-0005>"))
}

///|
test "ArchiveFilter handles combined predicates cleanly" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(
    warc_types=[@header.Response],
    surt_prefix="org,example,docs)",
    mime_prefix="text/html",
    status_min=200,
    status_max=299,
    date_from="2026-11-25T10:00:00Z",
    date_to="2026-11-25T10:10:00Z",
  )
  let matched = @pipeline.filter_records(recs, f)
  assert_eq(matched.length(), 1)
  assert_eq(matched[0].header.record_id(), Some("<urn:uuid:pipe-0003>"))
}

///|
test "ArchiveFilter returns false on invalid date_from bound" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(date_from="not-a-date")
  assert_eq(@pipeline.filter_records(recs, f).length(), 0)
}

///|
test "extract_subset produces valid wire WARC with recalculated offsets and warcinfo" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(status_min=200, status_max=299)
  let wire = @pipeline.extract_subset(recs, f, include_warcinfo=true)
  let sub = match @codec.parse_all(wire) {
    Ok(r) => r
    Err(_) => fail("extract_subset parse_all failed")
  }
  assert_eq(sub.length(), 2)
  assert_eq(sub[0].header.warc_type(), Some(@header.WarcInfo))
  assert_eq(sub[0].offset, 0L)
  assert_eq(sub[1].header.warc_type(), Some(@header.Response))
  assert_eq(sub[1].offset, sub[0].record_length)
  assert_eq(sub[1].header.record_id(), Some("<urn:uuid:pipe-0003>"))
}

///|
test "export_cdx11 outputs header and 11 space-delimited fields sorted lexicographically" {
  let recs = make_pipeline_fixture()
  let cdx = @pipeline.export_cdx11(recs, filename="pipe-crawl.warc")
  let lines : Array[String] = []
  for lv in cdx.split("\n") {
    lines.push(lv.to_owned())
  }
  // 1 header + 4 indexable records (response x2, resource x2)
  assert_eq(lines.length(), 5)
  assert_eq(lines[0], " CDX N b a m s k r M S V g")
  for i in 1..<lines.length() {
    let cols : Array[String] = []
    for c in lines[i].split(" ") {
      cols.push(c.to_owned())
    }
    assert_eq(cols.length(), 11)
    assert_eq(cols[6], "-")
    assert_eq(cols[7], "-")
    assert_eq(cols[10], "pipe-crawl.warc")
  }
  // Verify SURT order: api.example.org < cdn/img < cdn/notes < docs/guide
  assert_true(lines[1].has_prefix("org,example,api)/missing "))
  assert_true(lines[2].has_prefix("org,example,cdn)/img.png "))
  assert_true(lines[3].has_prefix("org,example,cdn)/notes.txt "))
  assert_true(lines[4].has_prefix("org,example,docs)/guide.html "))
}

///|
test "export_cdx11 can omit header line" {
  let recs = make_pipeline_fixture()
  let cdx = @pipeline.export_cdx11(
    recs,
    filename="pipe.warc",
    include_header=false,
  )
  let lines : Array[String] = []
  for lv in cdx.split("\n") {
    lines.push(lv.to_owned())
  }
  assert_eq(lines.length(), 4)
  assert_false(lines[0].has_prefix(" CDX"))
}

///|
test "export_jsonl emits one RFC 8259 JSON line per record with escaped body text" {
  let recs = make_pipeline_fixture()
  let jsonl = @pipeline.export_jsonl(recs)
  let lines : Array[String] = []
  for lv in jsonl.split("\n") {
    lines.push(lv.to_owned())
  }
  assert_eq(lines.length(), 6)
  // Chunked HTTP response de-chunked body with escaped quotes and newline
  assert_true(lines[2].contains("\"warc_type\":\"response\""))
  assert_true(lines[2].contains("\"status\":200"))
  assert_true(lines[2].contains("\"mime\":\"text/html\""))
  assert_true(lines[2].contains("\"text\":\"Hello \\\"World\\\"\\n\""))
  // Binary resource omits text
  assert_true(lines[4].contains("\"warc_type\":\"resource\""))
  assert_false(lines[4].contains("\"text\":"))
  // Text resource escapes tabs, newlines, backslashes, control chars, and preserves UTF-8 emoji
  assert_true(
    lines[5].contains(
      "\"text\":\"Line1\\tTabbed\\nLine2\\\\Slash\\u0001Ctrl中文🌙\"",
    ),
  )
}

///|
test "export_jsonl respects include_body_text=false and max_body_chars truncation" {
  let recs = make_pipeline_fixture()
  let no_body = @pipeline.export_jsonl(recs, options={
    include_body_text: false,
    max_body_chars: 100,
  })
  assert_false(no_body.contains("\"text\":"))
  let short_body = @pipeline.export_jsonl([recs[2]], options={
    include_body_text: true,
    max_body_chars: 5,
  })
  assert_true(short_body.contains("\"text\":\"Hello\""))
  assert_false(short_body.contains("World"))
}

///|
test "export_jsonl skips invalid UTF-8 bytes in textual MIME record gracefully" {
  let bad_utf8_rec = @codec.build_resource(
    record_id="<urn:uuid:bad-utf8>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/bad.txt",
    content_type="text/plain",
    b"abc\xff\xfe",
  )
  let line = @pipeline.export_jsonl([bad_utf8_rec])
  assert_true(line.contains("\"record_id\":\"<urn:uuid:bad-utf8>\""))
  assert_false(line.contains("\"text\":"))
}

///|
test "export_jsonl escapes backspace and formfeed control bytes" {
  let ctrl_rec = @codec.build_resource(
    record_id="<urn:uuid:ctrl-bf>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/ctrl.txt",
    content_type="text/plain",
    b"a\x08b\x0cc",
  )
  let line = @pipeline.export_jsonl([ctrl_rec])
  assert_true(line.contains("\"text\":\"a\\bb\\fc\""))
}

///|
test "segment_record supports WARC/1.0 records cleanly" {
  let rec = @codec.build_resource(
    record_id="<urn:uuid:v10-seg>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/v10.txt",
    content_type="text/plain",
    version=@header.Warc1_0,
    b"0123456789abcdefghij",
  )
  let segs = match @pipeline.segment_record(rec, max_segment_bytes=7) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  assert_eq(segs.length(), 3)
  assert_eq(segs[0].header.version, @header.Warc1_0)
  assert_eq(segs[1].header.version, @header.Warc1_0)
  let rebuilt = match @pipeline.reassemble_segments(segs) {
    Ok(r) => r
    Err(_) => fail("reassemble failed")
  }
  assert_eq(rebuilt[0].header.version, @header.Warc1_0)
  assert_eq(rebuilt[0].payload, b"0123456789abcdefghij")
}

///|
test "segment_record rejects blank WARC-Record-ID" {
  let blank_id = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "   "),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/a"),
      ("Content-Length", "8"),
    ],
    b"abcdefgh",
  )
  assert_true(
    @pipeline.segment_record(blank_id, max_segment_bytes=4)
    is Err(@pipeline.MissingOriginRecord(_)),
  )
}

///|
test "segment_record splits exact multiple without trailing empty continuation" {
  let exact = @codec.build_resource(
    record_id="<urn:uuid:exact-mult>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/exact",
    content_type="text/plain",
    b"1234567890",
  )
  let segs = match @pipeline.segment_record(exact, max_segment_bytes=5) {
    Ok(s) => s
    Err(_) => fail("segment_record failed")
  }
  assert_eq(segs.length(), 2)
  assert_eq(segs[0].payload.length(), 5)
  assert_eq(segs[1].payload.length(), 5)
  assert_eq(segs[1].header.segment_total_length(), Some(10L))
}

///|
test "reassemble_segments rejects duplicate continuation segment number" {
  let recs = make_pipeline_fixture()
  let segs = match @pipeline.segment_record(recs[5], max_segment_bytes=12) {
    Ok(s) => s
    Err(_) => fail("segment failed")
  }
  assert_true(segs.length() >= 3)
  let dup = [segs[0], segs[1], segs[1]]
  assert_true(
    @pipeline.reassemble_segments(dup) is Err(@pipeline.OutOfOrderSegment(_)),
  )
}

///|
test "reassemble_segments rejects non-continuation record with segment number 2" {
  let bad = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:bad-segnum>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/bad"),
      ("WARC-Segment-Number", "2"),
      ("Content-Length", "3"),
    ],
    b"abc",
  )
  assert_true(
    @pipeline.reassemble_segments([bad]) is Err(@pipeline.OutOfOrderSegment(_)),
  )
}

///|
test "ArchiveFilter handles status_min without status_max and excludes non-responses" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(status_min=300)
  let matched = @pipeline.filter_records(recs, f)
  assert_eq(matched.length(), 1)
  assert_eq(matched[0].header.record_id(), Some("<urn:uuid:pipe-0004>"))
}

///|
test "ArchiveFilter handles empty archive and extract_subset empty output" {
  let empty = @pipeline.filter_records([], @pipeline.ArchiveFilter::all())
  assert_eq(empty.length(), 0)
  let wire = @pipeline.extract_subset(
    make_pipeline_fixture(),
    @pipeline.ArchiveFilter::new(status_min=500),
    include_warcinfo=false,
  )
  assert_eq(wire, b"")
}

///|
test "ArchiveFilter date_to boundary is inclusive and excludes invalid record dates" {
  let recs = make_pipeline_fixture()
  let f = @pipeline.ArchiveFilter::new(date_to="2026-11-25T10:05:00Z")
  let matched = @pipeline.filter_records(recs, f)
  assert_eq(matched.length(), 3)
  let bad_rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:bad-dt>"),
      ("WARC-Date", "2025-02-29T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/bad"),
      ("Content-Length", "2"),
    ],
    b"hi",
  )
  assert_false(
    @pipeline.matches_filter(
      bad_rec,
      @pipeline.ArchiveFilter::new(date_from="2020-01-01T00:00:00Z"),
    ),
  )
}

///|
test "export_cdx11 handles empty record list cleanly" {
  assert_eq(@pipeline.export_cdx11([], include_header=false), "")
  assert_eq(
    @pipeline.export_cdx11([], include_header=true),
    " CDX N b a m s k r M S V g",
  )
}

///|
test "export_jsonl omits text on max_body_chars <= 0 and extracts +json vendor MIME" {
  let vendor_json = @codec.build_resource(
    record_id="<urn:uuid:vendor-json>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/api.jsonld",
    content_type="application/ld+json",
    b"{\"@type\":\"WebPage\"}",
  )
  let with_text = @pipeline.export_jsonl([vendor_json])
  assert_true(
    with_text.contains("\"text\":\"{\\\"@type\\\":\\\"WebPage\\\"}\""),
  )
  let zero_max = @pipeline.export_jsonl([vendor_json], options={
    include_body_text: true,
    max_body_chars: 0,
  })
  assert_false(zero_max.contains("\"text\":"))
}

///|
test "ArchiveFilter excludes records missing target_uri when surt_prefix is set" {
  let recs = make_pipeline_fixture()
  // warcinfo has no WARC-Target-URI
  let f = @pipeline.ArchiveFilter::new(surt_prefix="org,example")
  assert_false(@pipeline.matches_filter(recs[0], f))
  assert_true(@pipeline.matches_filter(recs[1], f))
}

///|
test "reassemble_segments rejects continuation appearing before origin in stream" {
  let recs = make_pipeline_fixture()
  let segs = match @pipeline.segment_record(recs[2], max_segment_bytes=40) {
    Ok(s) => s
    Err(_) => fail("segment failed")
  }
  assert_true(segs.length() >= 2)
  let reversed : Array[@codec.WarcRecord] = [segs[1], segs[0]]
  for i in 2..<segs.length() {
    reversed.push(segs[i])
  }
  assert_true(
    @pipeline.reassemble_segments(reversed)
    is Err(@pipeline.OutOfOrderSegment(_)),
  )
}

///|
test "export_cdx11 populates redirect Location column and sanitizes spaces" {
  let redir = @codec.build_response(
    record_id="<urn:uuid:redir-302>",
    date="2026-11-26T00:10:00Z",
    target_uri="https://example.org/old path",
    b"HTTP/1.1 302 Found\r\nLocation: https://example.org/new location\r\nContent-Length: 0\r\n\r\n",
  )
  let parsed = match @codec.parse_all(@codec.encode_all([redir])) {
    Ok(r) => r
    Err(_) => fail("parse failed")
  }
  let cdx = @pipeline.export_cdx11(
    parsed,
    filename="my archive.warc",
    include_header=false,
  )
  let cols : Array[String] = []
  for c in cdx.split(" ") {
    cols.push(c.to_owned())
  }
  assert_eq(cols.length(), 11)
  assert_eq(cols[2], "https://example.org/old%20path")
  assert_eq(cols[4], "302")
  assert_eq(cols[6], "https://example.org/new%20location")
  assert_eq(cols[10], "my%20archive.warc")
}

///|
test "ArchiveFilter rejects invalid 14-digit calendar dates and reassemble_segments rejects non-final Total-Length" {
  let recs = make_pipeline_fixture()
  assert_eq(
    @pipeline.filter_records(
      recs,
      @pipeline.ArchiveFilter::new(date_from="20269999999999"),
    ).length(),
    0,
  )
  assert_eq(
    @pipeline.filter_records(
      recs,
      @pipeline.ArchiveFilter::new(date_to="20250229120000"),
    ).length(),
    0,
  )
  let segs = match @pipeline.segment_record(recs[2], max_segment_bytes=30) {
    Ok(s) => s
    Err(_) => fail("segment failed")
  }
  assert_true(segs.length() >= 3)
  let total_s = recs[2].payload.length().to_string()
  let bad_mid : @codec.WarcRecord = {
    header: segs[1].header.with_field("WARC-Segment-Total-Length", total_s),
    payload: segs[1].payload,
    offset: 0L,
    record_length: 0L,
  }
  let modified = [segs[0], bad_mid]
  for i in 2..<segs.length() {
    modified.push(segs[i])
  }
  assert_true(
    @pipeline.reassemble_segments(modified)
    is Err(@pipeline.TotalLengthMismatch(_)),
  )
  // Negative segmentation & JSONL binary/truncation coverage
  assert_true(
    @pipeline.segment_record(recs[2], max_segment_bytes=0)
    is Err(@pipeline.InvalidSegmentSize(_)),
  )
  assert_true(
    @pipeline.segment_record(recs[2], max_segment_bytes=100000)
    .unwrap()
    .length() ==
    1,
  )
  let jsonl_no_body = @pipeline.export_jsonl(recs, options={
    include_body_text: false,
    max_body_chars: 10,
  })
  assert_false(jsonl_no_body.contains("\"text\":"))
  let jsonl_short = @pipeline.export_jsonl(recs, options={
    include_body_text: true,
    max_body_chars: 5,
  })
  assert_true(jsonl_short.contains("\"text\":\"Hello\""))
}

///|
test "export_jsonl omits revisit/continuation body text and build_wacz_manifests normalizes warc_filename" {
  let rev = @codec.build_revisit(
    record_id="<urn:uuid:rev-jsonl>",
    date="2026-11-28T00:00:00Z",
    target_uri="https://example.org/rev.txt",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"body"),
    payload=b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n",
  )
  let cont = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:cont-jsonl>"),
      ("WARC-Date", "2026-11-28T00:00:01Z"),
      ("WARC-Target-URI", "https://example.org/rev.txt"),
      ("WARC-Segment-Origin-ID", "<urn:uuid:orig>"),
      ("WARC-Segment-Number", "2"),
      ("Content-Type", "text/plain"),
      ("Content-Length", "11"),
    ],
    b"raw-segment",
  )
  let jsonl = @pipeline.export_jsonl([rev, cont])
  assert_false(jsonl.contains("\"text\":"))
  assert_true(jsonl.contains("\"warc_type\":\"revisit\""))
  assert_true(jsonl.contains("\"warc_type\":\"continuation\""))

  let res = @codec.build_resource(
    record_id="<urn:uuid:wacz-path-res>",
    date="2026-11-28T00:00:02Z",
    target_uri="https://example.org/doc.txt",
    content_type="text/plain",
    b"ok",
  )
  let gz = @codec.encode_all_gz([res])
  let parsed = @codec.parse_all_gz(gz).unwrap()
  let wacz_nested = @pipeline.build_wacz_manifests(
    parsed,
    gz,
    warc_filename="archive/sub/crawl.warc.gz",
  )
  assert_true(
    wacz_nested.datapackage_json.contains("\"path\":\"archive/crawl.warc.gz\""),
  )
  assert_true(wacz_nested.cdxj_text.contains("\"filename\":\"crawl.warc.gz\""))
  let wacz_traversal = @pipeline.build_wacz_manifests(
    parsed,
    gz,
    warc_filename="../..",
  )
  assert_true(
    wacz_traversal.datapackage_json.contains(
      "\"path\":\"archive/data.warc.gz\"",
    ),
  )
}

///|
test "reassemble_segments rejects Response entity digest mismatch, duplicate origin ID, and non-numeric total length" {
  let recs = make_pipeline_fixture()
  let segs = @pipeline.segment_record(recs[2], max_segment_bytes=40).unwrap()
  let last = segs.length() - 1
  let tampered_payload = Bytes::makei(segs[last].payload.length(), i => {
    if i == 0 {
      (segs[last].payload[0].to_int() ^ 0x01).to_byte()
    } else {
      segs[last].payload[i]
    }
  })
  let bad_body_segs = segs[0:last].to_owned()
  bad_body_segs.push({ ..segs[last], payload: tampered_payload, })
  assert_true(
    @pipeline.reassemble_segments(bad_body_segs)
    is Err(@pipeline.PayloadDigestMismatch(_)),
  )

  let bad_total = segs[0:last].to_owned()
  bad_total.push({
    ..segs[last],
    header: segs[last].header.with_field("WARC-Segment-Total-Length", "abc"),
  })
  assert_true(
    @pipeline.reassemble_segments(bad_total)
    is Err(@pipeline.TotalLengthMismatch(_)),
  )

  assert_true(
    @pipeline.reassemble_segments([segs[0], ..segs])
    is Err(@pipeline.OutOfOrderSegment(_)),
  )
}

///|
test "build_wacz_manifests computes exact SHA-256 digests, byte sizes, metadata fields, and empty index" {
  let res = @codec.build_resource(
    record_id="<urn:uuid:wacz-check>",
    date="2026-11-28T00:00:00Z",
    target_uri="https://example.org/page.txt",
    content_type="text/plain",
    b"wacz-body",
  )
  let gz = @codec.encode_all_gz([res])
  let parsed = @codec.parse_all_gz(gz).unwrap()
  let wacz = @pipeline.build_wacz_manifests(
    parsed,
    gz,
    warc_filename="crawl.warc.gz",
    title="Crawl \"2026\"\nLine",
    main_page_url="https://example.org/page.txt",
    main_page_date="2026-11-28T00:00:00Z",
  )
  let dp_hash = "sha256:" +
    @digest.hex_encode(@digest.sha256(@utf8.encode(wacz.datapackage_json)))
  let gz_hash = "sha256:" + @digest.hex_encode(@digest.sha256(gz))
  let cdx_bytes = @utf8.encode(wacz.cdxj_text)
  let cdx_hash = "sha256:" + @digest.hex_encode(@digest.sha256(cdx_bytes))
  assert_true(wacz.datapackage_digest_json.contains("\"hash\":\"\{dp_hash}\""))
  assert_true(
    wacz.datapackage_json.contains("\"title\":\"Crawl \\\"2026\\\"\\nLine\""),
  )
  assert_true(
    wacz.datapackage_json.contains(
      "\"mainPageUrl\":\"https://example.org/page.txt\"",
    ),
  )
  assert_true(
    wacz.datapackage_json.contains(
      "\"hash\":\"\{gz_hash}\",\"bytes\":\{gz.length().to_string()}",
    ),
  )
  assert_true(
    wacz.datapackage_json.contains(
      "\"hash\":\"\{cdx_hash}\",\"bytes\":\{cdx_bytes.length().to_string()}",
    ),
  )

  let empty_wacz = @pipeline.build_wacz_manifests([], b"")
  assert_eq(empty_wacz.cdxj_text, "")
  assert_true(
    empty_wacz.datapackage_json.contains(
      "\"path\":\"indexes/index.cdxj\",\"hash\":\"sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\",\"bytes\":0",
    ),
  )
}
