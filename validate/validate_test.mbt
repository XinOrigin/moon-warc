///|
test "validate_archive passes clean multi-record archive with zero errors or warnings" {
  let wi = @codec.build_warcinfo(
    record_id="<urn:uuid:01>",
    date="2026-11-25T10:00:00Z",
    b"software: moon-warc\r\n",
  )
  let req = @codec.build_request(
    record_id="<urn:uuid:02>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/hello",
    concurrent_to="<urn:uuid:03>",
    b"GET /hello HTTP/1.1\r\nHost: example.org\r\n\r\n",
  )
  let resp = @codec.build_response(
    record_id="<urn:uuid:03>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/hello",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n0\r\n\r\n",
  )
  let rev = @codec.build_revisit(
    record_id="<urn:uuid:04>",
    date="2026-11-25T10:05:00Z",
    target_uri="https://example.org/hello",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"Hello"),
    refers_to="<urn:uuid:03>",
  )
  let wire = @codec.encode_all([wi, req, resp, rev])
  let parsed = match @codec.parse_all(wire) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let report = @validate.validate_archive(parsed)
  assert_true(report.is_valid())
  assert_eq(report.record_count, 4)
  assert_eq(report.error_count, 0)
  assert_eq(report.warning_count, 0)
}

///|
test "validate_archive detects tampered block digest and tampered HTTP payload digest" {
  let resp = @codec.build_response(
    record_id="<urn:uuid:10>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/data",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nOriginal",
  )
  let wire = @codec.encode_record(resp)
  let parsed = match @codec.parse_all(wire) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let tampered : @codec.WarcRecord = {
    header: parsed[0].header,
    payload: b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nTampered",
    offset: 0L,
    record_length: parsed[0].record_length,
  }
  let report = @validate.validate_archive([tampered])
  assert_false(report.is_valid())
  let codes = report.diagnostics.map(d => d.code)
  assert_true(codes.contains("BLOCK_DIGEST_MISMATCH"))
  assert_true(codes.contains("PAYLOAD_DIGEST_MISMATCH"))
}

///|
test "validate_archive flags duplicate IDs, bad date, missing target URI, missing profile, and dangling refs" {
  let r1 = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:dup>"),
      ("WARC-Date", "2025-02-29T00:00:00Z"),
      ("WARC-Concurrent-To", "<urn:uuid:missing-concurrent>"),
      ("Content-Length", "18"),
    ],
    b"HTTP/1.1 200 OK\r\n\r\n",
  )
  let r2 = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "revisit"),
      ("WARC-Record-ID", "<urn:uuid:dup>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/"),
      ("WARC-Refers-To", "<urn:uuid:missing-ref>"),
      ("Content-Length", "0"),
    ],
    b"",
  )
  let report = @validate.validate_archive([r1, r2])
  assert_false(report.is_valid())
  let codes = report.diagnostics.map(d => d.code)
  assert_true(codes.contains("DUPLICATE_RECORD_ID"))
  assert_true(codes.contains("INVALID_WARC_DATE"))
  assert_true(codes.contains("MISSING_TARGET_URI"))
  assert_true(codes.contains("CONTENT_LENGTH_MISMATCH"))
  assert_true(codes.contains("MISSING_WARC_PROFILE"))
  assert_true(codes.contains("UNRESOLVED_CONCURRENT_TO"))
  assert_true(codes.contains("UNRESOLVED_REFERS_TO"))
  assert_eq(report.warning_count, 2)
}

///|
test "resolve_revisits resolves ByRecordId, ByUriAndDigest, and Unresolved" {
  let orig = @codec.build_response(
    record_id="<urn:uuid:orig-1>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/page",
    b"HTTP/1.1 200 OK\r\n\r\nPayload",
  )
  let rev_by_id = @codec.build_revisit(
    record_id="<urn:uuid:rev-1>",
    date="2026-11-25T10:01:00Z",
    target_uri="https://example.org/page",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"Payload"),
    refers_to="<urn:uuid:orig-1>",
  )
  let rev_by_uri_digest = @codec.build_revisit(
    record_id="<urn:uuid:rev-2>",
    date="2026-11-25T10:02:00Z",
    target_uri="https://example.org/page",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"Payload"),
  )
  let rev_unresolved = @codec.build_revisit(
    record_id="<urn:uuid:rev-3>",
    date="2026-11-25T10:03:00Z",
    target_uri="https://example.org/other",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"Missing"),
  )
  let wire = @codec.encode_all([
    orig, rev_by_id, rev_by_uri_digest, rev_unresolved,
  ])
  let parsed = match @codec.parse_all(wire) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let res = @validate.resolve_revisits(parsed)
  assert_eq(res.length(), 3)
  assert_eq(res[0].match_kind, @validate.ByRecordId)
  assert_eq(res[0].target_index, Some(0))
  assert_eq(res[0].target_record_id, Some("<urn:uuid:orig-1>"))
  assert_eq(res[1].match_kind, @validate.ByUriAndDigest)
  assert_eq(res[1].target_index, Some(0))
  assert_eq(res[2].match_kind, @validate.Unresolved)
  assert_eq(res[2].target_index, None)
}

///|
test "validate_archive verifies SHA-1 digests and WARC/1.0 non-HTTP resource records" {
  let payload = b"resource-bytes"
  let res_rec = @codec.make_record(
    @header.Warc1_0,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:sha1-res>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/res.bin"),
      ("WARC-Block-Digest", @digest.format_warc_digest_sha1(payload)),
      ("WARC-Payload-Digest", @digest.format_warc_digest_sha1(payload)),
      ("Content-Type", "application/octet-stream"),
      ("Content-Length", payload.length().to_string()),
    ],
    payload,
  )
  let wire = @codec.encode_record(res_rec, auto_digest=false)
  let parsed = match @codec.parse_all(wire) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let report = @validate.validate_archive(parsed)
  assert_true(report.is_valid())
  assert_eq(report.error_count, 0)
  assert_eq(report.warning_count, 0)
}

///|
test "validate_archive rejects WARC-Record-ID and WARC-Segment-Origin-ID with inner whitespace or nested angle brackets" {
  let bad_id = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:bad space>"),
      ("WARC-Date", "2026-11-28T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/a"),
      ("Content-Length", "2"),
    ],
    b"hi",
  )
  let bad_cont = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:ok-cont>"),
      ("WARC-Date", "2026-11-28T00:00:01Z"),
      ("WARC-Segment-Origin-ID", "<<urn:uuid:nested>>"),
      ("WARC-Segment-Number", "2"),
      ("Content-Length", "2"),
    ],
    b"hi",
  )
  let report = @validate.validate_archive([bad_id, bad_cont])
  assert_false(report.is_valid())
  let codes = report.diagnostics.map(d => d.code)
  assert_true(codes.contains("INVALID_RECORD_ID"))
  assert_true(codes.contains("INVALID_SEGMENT_ORIGIN_ID"))
}
