///|
fn neg_has_code(report : @validate.ValidationReport, code : String) -> Bool {
  for d in report.diagnostics {
    if d.code == code {
      return true
    }
  }
  false
}

///|
fn neg_count_code(report : @validate.ValidationReport, code : String) -> Int32 {
  let mut count = 0
  for d in report.diagnostics {
    if d.code == code {
      count = count + 1
    }
  }
  count
}

///|
test "negative bad WARC version rejected by header parser and codec" {
  assert_true(@header.WarcVersion::parse("WARC/1.2") is Err(_))
  assert_true(@header.WarcVersion::parse("WARC/0.9") is Err(_))
  assert_true(@header.WarcVersion::parse("WARC/2.0") is Err(_))
  let bad_wire = b"WARC/1.2\r\nWARC-Type: warcinfo\r\nWARC-Record-ID: <urn:uuid:v1>\r\nWARC-Date: 2026-11-25T00:00:00Z\r\nContent-Length: 0\r\n\r\n\r\n\r\n"
  assert_true(
    @codec.parse_all(bad_wire)
    is Err(@codec.HeaderError(@header.InvalidVersion(_))),
  )
}

///|
test "negative malformed WARC header lines rejected by codec" {
  let no_colon = b"WARC/1.1\r\nBadHeaderWithoutColon\r\nContent-Length: 0\r\n\r\n\r\n\r\n"
  assert_true(
    @codec.parse_all(no_colon)
    is Err(@codec.HeaderError(@header.InvalidHeaderLine(_))),
  )
  let empty_name = b"WARC/1.1\r\n: missing-name\r\nContent-Length: 0\r\n\r\n\r\n\r\n"
  assert_true(
    @codec.parse_all(empty_name)
    is Err(@codec.HeaderError(@header.InvalidHeaderLine(_))),
  )
  let leading_fold = b"WARC/1.1\r\n  orphan-fold\r\nContent-Length: 0\r\n\r\n\r\n\r\n"
  assert_true(
    @codec.parse_all(leading_fold)
    is Err(@codec.HeaderError(@header.InvalidHeaderLine(_))),
  )
}

///|
test "negative Content-Length negative values rejected by codec and validator" {
  let neg_wire = b"WARC/1.1\r\nWARC-Type: warcinfo\r\nWARC-Record-ID: <urn:uuid:neg-cl>\r\nWARC-Date: 2026-11-25T00:00:00Z\r\nContent-Length: -1\r\n\r\n\r\n\r\n"
  assert_true(
    @codec.parse_all(neg_wire)
    is Err(@codec.HeaderError(@header.InvalidContentLength(_))),
  )
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "warcinfo"),
      ("WARC-Record-ID", "<urn:uuid:neg-cl>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("Content-Length", "-42"),
    ],
    b"",
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "INVALID_CONTENT_LENGTH"))
}

///|
test "negative Content-Length overflow, non-numeric, empty, and missing rejected" {
  for bad_cl in ["2000000010", "999999999999999999", "12abc", "", "12.5"] {
    let hdr = @header.WarcHeader::new(@header.Warc1_1, [
      ("WARC-Type", "warcinfo"),
      ("WARC-Record-ID", "<urn:uuid:cl-err>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("Content-Length", bad_cl),
    ])
    assert_true(
      hdr.parse_content_length() is Err(@header.InvalidContentLength(_)),
    )
  }
  let missing_hdr = @header.WarcHeader::new(@header.Warc1_1, [
    ("WARC-Type", "warcinfo"),
    ("WARC-Record-ID", "<urn:uuid:cl-miss>"),
    ("WARC-Date", "2026-11-25T00:00:00Z"),
  ])
  assert_true(
    missing_hdr.parse_content_length()
    is Err(@header.MissingRequiredHeader("Content-Length")),
  )
  let report = @validate.validate_archive([
    @codec.make_record(@header.Warc1_1, missing_hdr.fields, b""),
  ])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "INVALID_CONTENT_LENGTH"))
}

///|
test "negative Content-Length mismatch flagged by validate_archive" {
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:cl-mismatch>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/a"),
      ("Content-Length", "10"),
    ],
    b"12345",
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "CONTENT_LENGTH_MISMATCH"))
}

///|
test "negative truncated WARC payload rejected with UnexpectedEof" {
  let rec = @codec.build_resource(
    record_id="<urn:uuid:trunc-pay>",
    date="2026-11-25T00:00:00Z",
    target_uri="https://example.org/t",
    content_type="text/plain",
    b"0123456789abcdef",
  )
  let wire = @codec.encode_record(rec)
  assert_true(
    @codec.parse_all(wire[0:wire.length() - 5]) is Err(@codec.UnexpectedEof(_)),
  )
  assert_true(
    @codec.parse_all(wire[0:wire.length() - 10]) is Err(@codec.UnexpectedEof(_)),
  )
}

///|
test "negative bad trailing record separator rejected" {
  let rec = @codec.build_warcinfo(
    record_id="<urn:uuid:bad-sep>",
    date="2026-11-25T00:00:00Z",
    b"software: moon-warc\r\n",
  )
  let wire = @codec.encode_record(rec)
  let prefix = wire[0:wire.length() - 4].to_owned()
  assert_true(
    @codec.parse_all(prefix + b"\r\n\n\n")
    is Err(@codec.InvalidTrailingSeparator(_)),
  )
  assert_true(
    @codec.parse_all(prefix + b"\n\n\r\n")
    is Err(@codec.InvalidTrailingSeparator(_)),
  )
  assert_true(
    @codec.parse_all(prefix + b"\r\n\rX")
    is Err(@codec.InvalidTrailingSeparator(_)),
  )
  assert_true(
    @codec.parse_all(prefix + b"\r\n") is Err(@codec.UnexpectedEof(_)),
  )
}

///|
test "negative incomplete header missing CRLFCRLF terminator rejected" {
  let partial_hdr = b"WARC/1.1\r\nWARC-Type: warcinfo\r\nWARC-Record-ID: <urn:uuid:h1>\r\nContent-Length: 0\r\n"
  assert_true(@codec.parse_all(partial_hdr) is Err(@codec.UnexpectedEof(_)))
}

///|
test "negative tampered SHA-256 WARC-Block-Digest detected" {
  let rec = @codec.build_resource(
    record_id="<urn:uuid:tamper-bd-256>",
    date="2026-11-25T00:00:00Z",
    target_uri="https://example.org/bd",
    content_type="application/octet-stream",
    b"authentic-block-bytes",
  )
  let wire = @codec.encode_record(rec)
  let parsed = match @codec.parse_all(wire) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let tampered : @codec.WarcRecord = {
    header: parsed[0].header,
    payload: b"tampered!-block-bytes",
    offset: 0,
    record_length: parsed[0].record_length,
  }
  let report = @validate.validate_archive([tampered])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "BLOCK_DIGEST_MISMATCH"))
}

///|
test "negative tampered SHA-1 WARC-Block-Digest detected" {
  let payload = b"sha1-block-data"
  let bad_sha1 = "sha1:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:tamper-bd-1>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/bd1"),
      ("WARC-Block-Digest", bad_sha1),
      ("Content-Length", payload.length().to_string()),
    ],
    payload,
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "BLOCK_DIGEST_MISMATCH"))
}

///|
test "negative malformed or unsupported WARC-Block-Digest flagged" {
  for
    bad_bd in [
      "md5:d41d8cd98f00b204e9800998ecf8427e", "sha256:SHORT", "nocolon",
    ] {
    let rec = @codec.make_record(
      @header.Warc1_1,
      [
        ("WARC-Type", "warcinfo"),
        ("WARC-Record-ID", "<urn:uuid:bad-bd>"),
        ("WARC-Date", "2026-11-25T00:00:00Z"),
        ("WARC-Block-Digest", bad_bd),
        ("Content-Length", "2"),
      ],
      b"hi",
    )
    let report = @validate.validate_archive([rec])
    assert_false(report.is_valid())
    assert_true(neg_has_code(report, "INVALID_BLOCK_DIGEST"))
  }
}

///|
test "negative tampered WARC-Payload-Digest on non-chunked HTTP response" {
  let http_raw = b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nreal body"
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:bad-pd-raw>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/raw-resp"),
      ("WARC-Block-Digest", @digest.format_warc_digest_sha256(http_raw)),
      (
        "WARC-Payload-Digest",
        @digest.format_warc_digest_sha256(b"different body"),
      ),
      ("Content-Length", http_raw.length().to_string()),
    ],
    http_raw,
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_false(neg_has_code(report, "BLOCK_DIGEST_MISMATCH"))
  assert_true(neg_has_code(report, "PAYLOAD_DIGEST_MISMATCH"))
}

///|
test "negative tampered WARC-Payload-Digest on chunked HTTP response" {
  let chunked_http = b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n7\r\n, World\r\n0\r\n\r\n"
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:bad-pd-chunked>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/chunked"),
      ("WARC-Block-Digest", @digest.format_warc_digest_sha256(chunked_http)),
      (
        "WARC-Payload-Digest",
        @digest.format_warc_digest_sha256(b"Hello, Tampered"),
      ),
      ("Content-Length", chunked_http.length().to_string()),
    ],
    chunked_http,
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_false(neg_has_code(report, "BLOCK_DIGEST_MISMATCH"))
  assert_true(neg_has_code(report, "PAYLOAD_DIGEST_MISMATCH"))
}

///|
test "negative tampered SHA-1 WARC-Payload-Digest on chunked HTTP response" {
  let chunked_http = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n4\r\nABCD\r\n0\r\n\r\n"
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:bad-pd-chunked-sha1>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/chunked-sha1"),
      ("WARC-Block-Digest", @digest.format_warc_digest_sha1(chunked_http)),
      ("WARC-Payload-Digest", @digest.format_warc_digest_sha1(b"WXYZ")),
      ("Content-Length", chunked_http.length().to_string()),
    ],
    chunked_http,
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_false(neg_has_code(report, "BLOCK_DIGEST_MISMATCH"))
  assert_true(neg_has_code(report, "PAYLOAD_DIGEST_MISMATCH"))
}

///|
test "negative invalid HTTP payload in response triggers INVALID_HTTP_PAYLOAD" {
  let bad_http = b"NOT AN HTTP RESPONSE"
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:bad-http>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/bad-http"),
      ("WARC-Payload-Digest", @digest.format_warc_digest_sha256(bad_http)),
      ("Content-Length", bad_http.length().to_string()),
    ],
    bad_http,
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "INVALID_HTTP_PAYLOAD"))
}

///|
test "negative malformed chunked hex sizes rejected by http_payload and validator" {
  assert_true(
    @http_payload.decode_chunked(b"ZZ\r\nab\r\n0\r\n\r\n")
    is Err(@http_payload.InvalidChunkSize(_)),
  )
  assert_true(
    @http_payload.decode_chunked(b"-5\r\nhello\r\n0\r\n\r\n")
    is Err(@http_payload.InvalidChunkSize(_)),
  )
  assert_true(
    @http_payload.decode_chunked(b"\r\nab\r\n0\r\n\r\n")
    is Err(@http_payload.InvalidChunkSize(_)),
  )
  assert_true(
    @http_payload.decode_chunked(b"ffffffff\r\nab\r\n0\r\n\r\n")
    is Err(@http_payload.InvalidChunkSize(_)),
  )
  let bad_chunk_http = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\nG1\r\nhello\r\n0\r\n\r\n"
  let rec = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:bad-chunk-hex>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/bad-chunk"),
      ("WARC-Payload-Digest", @digest.format_warc_digest_sha256(b"hello")),
      ("Content-Length", bad_chunk_http.length().to_string()),
    ],
    bad_chunk_http,
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "INVALID_HTTP_CHUNKED_BODY"))
}

///|
test "negative truncated chunk body and missing chunk CRLF flagged by validator" {
  let missing_crlf_http = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHelloXX0\r\n\r\n"
  let r1 = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:chunk-no-crlf>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/c1"),
      ("WARC-Payload-Digest", @digest.format_warc_digest_sha256(b"Hello")),
      ("Content-Length", missing_crlf_http.length().to_string()),
    ],
    missing_crlf_http,
  )
  let trunc_http = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHel"
  let r2 = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:chunk-trunc>"),
      ("WARC-Date", "2026-11-25T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/c2"),
      ("WARC-Payload-Digest", @digest.format_warc_digest_sha256(b"Hello")),
      ("Content-Length", trunc_http.length().to_string()),
    ],
    trunc_http,
  )
  let report = @validate.validate_archive([r1, r2])
  assert_false(report.is_valid())
  assert_eq(neg_count_code(report, "INVALID_HTTP_CHUNKED_BODY"), 2)
}

///|
test "negative invalid leap-day 2025-02-29T00:00:00Z and century 1900-02-29 rejected" {
  assert_true(
    @header.WarcDate::parse("2025-02-29T00:00:00Z")
    is Err(@header.InvalidDate(_)),
  )
  assert_true(
    @header.WarcDate::parse("1900-02-29T00:00:00Z")
    is Err(@header.InvalidDate(_)),
  )
  assert_true(@header.WarcDate::parse("2000-02-29T23:59:59Z") is Ok(_))
  let rec = @codec.build_warcinfo(
    record_id="<urn:uuid:bad-leap>",
    date="2025-02-29T00:00:00Z",
    b"test: leap\r\n",
  )
  let report = @validate.validate_archive([rec])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "INVALID_WARC_DATE"))
}

///|
test "negative out-of-range and non-UTC WARC-Date formats rejected" {
  for
    bad_date in [
      "2026-00-01T00:00:00Z", "2026-13-01T00:00:00Z", "2026-04-31T00:00:00Z", "2026-11-25T24:00:00Z",
      "2026-11-25T00:60:00Z", "2026-11-25T00:00:60Z", "2026-11-25T00:00:00+00:00",
      "2026-11-25 00:00:00Z", "2026-11-25T00:00:00.Z",
    ] {
    assert_true(
      @header.WarcDate::parse(bad_date) is Err(@header.InvalidDate(_)),
    )
  }
}

///|
test "negative duplicate WARC-Record-ID flags every offending record" {
  let r1 = @codec.build_warcinfo(
    record_id="<urn:uuid:dup-id>",
    date="2026-11-25T10:00:00Z",
    b"a: 1\r\n",
  )
  let r2 = @codec.build_resource(
    record_id="<urn:uuid:dup-id>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/1",
    content_type="text/plain",
    b"one",
  )
  let r3 = @codec.build_resource(
    record_id="<urn:uuid:dup-id>",
    date="2026-11-25T10:00:02Z",
    target_uri="https://example.org/2",
    content_type="text/plain",
    b"two",
  )
  let report = @validate.validate_archive([r1, r2, r3])
  assert_false(report.is_valid())
  assert_eq(neg_count_code(report, "DUPLICATE_RECORD_ID"), 3)
}

///|
test "negative missing or malformed WARC-Record-ID and missing WARC-Type/Date" {
  let r_missing = @codec.make_record(
    @header.Warc1_1,
    [("Content-Length", "0")],
    b"",
  )
  let r_bad_id = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "warcinfo"),
      ("WARC-Record-ID", "urn:uuid:no-brackets"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("Content-Length", "0"),
    ],
    b"",
  )
  let r_empty_brackets = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "warcinfo"),
      ("WARC-Record-ID", "<>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("Content-Length", "0"),
    ],
    b"",
  )
  let report = @validate.validate_archive([
    r_missing, r_bad_id, r_empty_brackets,
  ])
  assert_false(report.is_valid())
  assert_true(neg_has_code(report, "MISSING_WARC_TYPE"))
  assert_true(neg_has_code(report, "MISSING_RECORD_ID"))
  assert_true(neg_has_code(report, "MISSING_WARC_DATE"))
  assert_eq(neg_count_code(report, "INVALID_RECORD_ID"), 2)
}

///|
test "negative missing or blank WARC-Target-URI flagged across URI-bearing types" {
  let recs : Array[@codec.WarcRecord] = []
  for wt in ["response", "request", "resource", "revisit", "conversion"] {
    let fields : Array[(String, String)] = [
      ("WARC-Type", wt),
      ("WARC-Record-ID", "<urn:uuid:no-uri-\{wt}>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("Content-Length", "0"),
    ]
    if wt == "revisit" {
      fields.push(
        (
          "WARC-Profile", "http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
        ),
      )
    }
    recs.push(@codec.make_record(@header.Warc1_1, fields, b""))
  }
  recs.push(
    @codec.make_record(
      @header.Warc1_1,
      [
        ("WARC-Type", "resource"),
        ("WARC-Record-ID", "<urn:uuid:blank-uri>"),
        ("WARC-Date", "2026-11-25T10:00:00Z"),
        ("WARC-Target-URI", "   "),
        ("Content-Length", "0"),
      ],
      b"",
    ),
  )
  let report = @validate.validate_archive(recs)
  assert_false(report.is_valid())
  assert_eq(neg_count_code(report, "MISSING_TARGET_URI"), 6)
}

///|
test "negative missing, blank WARC-Profile and invalid Payload-Digest on revisit" {
  let r_no_profile = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "revisit"),
      ("WARC-Record-ID", "<urn:uuid:rev-no-prof>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/rev"),
      ("Content-Length", "0"),
    ],
    b"",
  )
  let r_blank_profile = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "revisit"),
      ("WARC-Record-ID", "<urn:uuid:rev-blank-prof>"),
      ("WARC-Date", "2026-11-25T10:00:01Z"),
      ("WARC-Target-URI", "https://example.org/rev"),
      ("WARC-Profile", "   "),
      ("WARC-Payload-Digest", "sha256:BAD"),
      ("Content-Length", "0"),
    ],
    b"",
  )
  let report = @validate.validate_archive([r_no_profile, r_blank_profile])
  assert_false(report.is_valid())
  assert_eq(neg_count_code(report, "MISSING_WARC_PROFILE"), 2)
  assert_true(neg_has_code(report, "INVALID_PAYLOAD_DIGEST"))
}

///|
test "negative self-referential revisit does not self-resolve and dangling refs warn only" {
  let self_rev = @codec.build_revisit(
    record_id="<urn:uuid:self-rev>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/self",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"absent"),
    refers_to="<urn:uuid:self-rev>",
  )
  let dangling_req = @codec.build_request(
    record_id="<urn:uuid:req-warn>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/self",
    concurrent_to="<urn:uuid:nonexistent>",
    b"GET /self HTTP/1.1\r\nHost: example.org\r\n\r\n",
  )
  let report = @validate.validate_archive([self_rev, dangling_req])
  assert_true(report.is_valid())
  assert_eq(report.error_count, 0)
  assert_eq(report.warning_count, 1)
  assert_true(neg_has_code(report, "UNRESOLVED_CONCURRENT_TO"))
  let resolved = @validate.resolve_revisits([self_rev, dangling_req])
  assert_eq(resolved.length(), 1)
  assert_eq(resolved[0].match_kind, @validate.Unresolved)
}
