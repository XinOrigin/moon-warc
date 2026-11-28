///|
fn make_multi_type_records() -> Array[@codec.WarcRecord] {
  let wi = @codec.build_warcinfo(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000001>",
    date="2026-11-25T10:00:00Z",
    filename="crawl-20261125.warc",
    b"software: moon-warc/0.1.0\r\nformat: WARC File Format 1.1\r\n",
  )
  let req = @codec.build_request(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000002>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/hello",
    concurrent_to="<urn:uuid:00000000-0000-0000-0000-000000000003>",
    b"GET /hello HTTP/1.1\r\nHost: example.org\r\n\r\n",
  )
  let resp = @codec.build_response(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000003>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/hello",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n0\r\n\r\n",
  )
  let res = @codec.build_resource(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000004>",
    date="2026-11-25T10:00:02Z",
    target_uri="https://example.org/blob.bin",
    content_type="application/octet-stream",
    b"\x00\x01\xff\xfe\r\n\r\n\x00",
  )
  let meta = @codec.build_metadata(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000005>",
    date="2026-11-25T10:00:03Z",
    target_uri="https://example.org/hello",
    concurrent_to="<urn:uuid:00000000-0000-0000-0000-000000000003>",
    b"via: https://example.org/\r\n",
  )
  let rev = @codec.build_revisit(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000006>",
    date="2026-11-25T10:05:00Z",
    target_uri="https://example.org/hello",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"Hello"),
    refers_to="<urn:uuid:00000000-0000-0000-0000-000000000003>",
    payload=b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n",
  )
  let conv = @codec.build_conversion(
    record_id="<urn:uuid:00000000-0000-0000-0000-000000000007>",
    date="2026-11-25T10:06:00Z",
    target_uri="https://example.org/hello",
    content_type="text/markdown",
    refers_to="<urn:uuid:00000000-0000-0000-0000-000000000003>",
    b"# Hello\n",
  )
  let cont = @codec.make_record(
    @header.Warc1_0,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:00000000-0000-0000-0000-000000000008>"),
      ("WARC-Date", "2026-11-25T10:07:00Z"),
      ("WARC-Segment-Number", "2"),
      ("Content-Length", "4"),
    ],
    b"tail",
  )
  [wi, req, resp, res, meta, rev, conv, cont]
}

///|
test "encode_all and parse_all round-trip across all 8 WARC types" {
  let recs = make_multi_type_records()
  let wire = @codec.encode_all(recs)
  match @codec.parse_all(wire) {
    Ok(parsed) => {
      assert_eq(parsed.length(), 8)
      assert_eq(parsed[0].offset, 0L)
      let mut expected_off = 0L
      for i in 0..<parsed.length() {
        assert_eq(parsed[i].offset, expected_off)
        assert_true(
          parsed[i].record_length > parsed[i].payload.length().to_int64(),
        )
        expected_off = expected_off + parsed[i].record_length
        assert_eq(parsed[i].payload, recs[i].payload)
      }
      assert_eq(expected_off, wire.length().to_int64())
      // Re-encoding with auto_digest=false produces identical bytes
      let wire2 = @codec.encode_all(parsed, auto_digest=false)
      assert_eq(wire2, wire)
    }
    Err(_) => fail("parse_all failed")
  }
}

///|
test "auto_digest computes block digest and de-chunked response payload digest" {
  let resp = @codec.build_response(
    record_id="<urn:uuid:1111>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/chunked",
    b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n0\r\n\r\n",
  )
  let wire = @codec.encode_record(resp)
  match @codec.parse_all(wire) {
    Ok(parsed) => {
      assert_eq(parsed.length(), 1)
      let h = parsed[0].header
      assert_eq(
        h.block_digest(),
        Some(@digest.format_warc_digest_sha256(parsed[0].payload)),
      )
      assert_eq(
        h.payload_digest(),
        Some(@digest.format_warc_digest_sha256(b"Hello")),
      )
    }
    Err(_) => fail("parse_all failed")
  }
}

///|
test "streaming WarcReader yields identical records across chunk sizes 1..64" {
  let recs = make_multi_type_records()
  let wire = @codec.encode_all(recs)
  let baseline = match @codec.parse_all(wire) {
    Ok(r) => r
    Err(_) => fail("baseline failed")
  }
  for chunk_sz in [1, 2, 5, 17, 64] {
    let reader = @codec.WarcReader::new()
    let collected : Array[@codec.WarcRecord] = []
    let mut pos = 0
    while pos < wire.length() {
      let end = if pos + chunk_sz > wire.length() {
        wire.length()
      } else {
        pos + chunk_sz
      }
      reader.feed(wire[pos:end])
      while true {
        match reader.next_record() {
          Ok(Some(r)) => collected.push(r)
          Ok(None) => break
          Err(_) => fail("streaming decode failed")
        }
      }
      pos = end
    }
    assert_eq(reader.finish(), Ok(()))
    assert_eq(collected, baseline)
  }
}

///|
test "WarcReader rejects truncated payload, bad trailing CRLF, and trailing garbage" {
  let rec = @codec.build_resource(
    record_id="<urn:uuid:2222>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/x",
    content_type="text/plain",
    b"abcdef",
  )
  let wire = @codec.encode_record(rec)
  assert_true(@codec.parse_all(wire[0:wire.length() - 6]) is Err(_))
  assert_true(@codec.parse_all(wire[0:wire.length() - 2]) is Err(_))
  let bad_sep = wire[0:wire.length() - 4].to_owned() + b"XXXX"
  assert_true(@codec.parse_all(bad_sep) is Err(_))
  assert_true(@codec.parse_all(wire + b"WARC/1.1\r\n") is Err(_))
}

///|
test "parse_all handles empty archive and zero-byte payload records" {
  assert_eq(@codec.parse_all(b""), Ok([]))
  let empty_res = @codec.build_resource(
    record_id="<urn:uuid:empty-1>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/empty",
    content_type="text/plain",
    b"",
  )
  let wire = @codec.encode_record(empty_res)
  match @codec.parse_all(wire) {
    Ok(parsed) => {
      assert_eq(parsed.length(), 1)
      assert_eq(parsed[0].payload, b"")
      assert_eq(parsed[0].offset, 0L)
      assert_eq(parsed[0].record_length, wire.length().to_int64())
    }
    Err(_) => fail("empty payload parse failed")
  }
}

///|
test "WarcReader compacts large multi-record stream beyond 4KB without losing offsets" {
  let big_body = Bytes::makei(2500, i => (65 + i % 26).to_byte())
  let recs : Array[@codec.WarcRecord] = []
  for idx in 0..<4 {
    recs.push(
      @codec.build_resource(
        record_id="<urn:uuid:big-\{idx.to_string()}>",
        date="2026-11-25T10:00:0\{idx.to_string()}Z",
        target_uri="https://example.org/big/\{idx.to_string()}",
        content_type="application/octet-stream",
        big_body,
      ),
    )
  }
  let wire = @codec.encode_all(recs)
  assert_true(wire.length() > 10000)
  let reader = @codec.WarcReader::new()
  let got : Array[@codec.WarcRecord] = []
  let mut pos = 0
  while pos < wire.length() {
    let end = if pos + 137 > wire.length() { wire.length() } else { pos + 137 }
    reader.feed(wire[pos:end])
    while true {
      match reader.next_record() {
        Ok(Some(r)) => got.push(r)
        Ok(None) => break
        Err(_) => fail("stream failed")
      }
    }
    pos = end
  }
  assert_eq(reader.finish(), Ok(()))
  assert_eq(got.length(), 4)
  let mut expected_offset = 0L
  for r in got {
    assert_eq(r.offset, expected_offset)
    assert_eq(r.payload, big_body)
    expected_offset = expected_offset + r.record_length
  }
  assert_eq(expected_offset, wire.length().to_int64())
}

///|
test "parse_all and chunked WarcReader match exactly across >64KB multi-record compaction cycles" {
  let body_a = Bytes::makei(2400, i => (48 + i % 40).to_byte())
  let recs : Array[@codec.WarcRecord] = []
  for idx in 0..<30 {
    let mut rec = @codec.build_resource(
      record_id="<urn:uuid:large-\{idx.to_string()}>",
      date="2026-11-26T00:00:00Z",
      target_uri="https://example.org/chunk/\{idx.to_string()}",
      content_type="application/octet-stream",
      body_a,
    )
    // Add long custom header lines to also exercise incremental header scanning
    rec = {
      header: rec.header.with_field(
        "X-Padding", "abcdefghijklmnopqrstuvwxyz-0123456789-abcdefghijklmnopqrstuvwxyz",
      ),
      payload: rec.payload,
      offset: 0L,
      record_length: 0L,
    }
    recs.push(rec)
  }
  let wire = @codec.encode_all(recs)
  assert_true(wire.length() > 65536)
  let full_parsed = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("parse_all >64KB failed")
  }
  assert_eq(full_parsed.length(), 30)
  for step in [1, 17] {
    let reader = @codec.WarcReader::new()
    let streamed : Array[@codec.WarcRecord] = []
    let mut pos = 0
    while pos < wire.length() {
      let end = if pos + step > wire.length() {
        wire.length()
      } else {
        pos + step
      }
      reader.feed(wire[pos:end])
      while true {
        match reader.next_record() {
          Ok(Some(r)) => streamed.push(r)
          Ok(None) => break
          Err(_) => fail("chunked reader failed")
        }
      }
      pos = end
    }
    assert_eq(reader.finish(), Ok(()))
    assert_eq(streamed, full_parsed)
  }
}

///|
test "encode_record updates Resource WARC-Payload-Digest unless segmented" {
  let base = @codec.build_resource(
    record_id="<urn:uuid:res-digest-update>",
    date="2026-11-26T00:00:00Z",
    target_uri="https://example.org/asset.bin",
    content_type="application/octet-stream",
    b"initial-data",
  )
  let edited : @codec.WarcRecord = {
    header: base.header.with_field(
      "WARC-Payload-Digest",
      @digest.format_warc_digest_sha256(b"initial-data"),
    ),
    payload: b"updated-data",
    offset: 0L,
    record_length: 0L,
  }
  let encoded = @codec.encode_record(edited, auto_digest=true)
  let reparsed = match @codec.parse_all(encoded) {
    Ok(v) => v
    Err(_) => fail("reparse failed")
  }
  assert_eq(
    reparsed[0].header.payload_digest(),
    Some(@digest.format_warc_digest_sha256(b"updated-data")),
  )
  let full_digest = @digest.format_warc_digest_sha256(
    b"updated-data-full-entity",
  )
  let segmented : @codec.WarcRecord = {
    header: base.header
    .with_field("WARC-Segment-Number", "1")
    .with_field("WARC-Payload-Digest", full_digest),
    payload: b"part-one",
    offset: 0L,
    record_length: 0L,
  }
  let seg_encoded = @codec.encode_record(segmented, auto_digest=true)
  let seg_reparsed = match @codec.parse_all(seg_encoded) {
    Ok(v) => v
    Err(_) => fail("seg reparse failed")
  }
  assert_eq(seg_reparsed[0].header.payload_digest(), Some(full_digest))
}

///|
test "WarcReader enforces ReaderLimits, supports Int64 offsets > 2GiB, and scan_all streams cleanly" {
  let rec = @codec.build_resource(
    record_id="<urn:uuid:limit-test>",
    date="2026-11-26T00:00:00Z",
    target_uri="https://example.org/lim",
    content_type="text/plain",
    b"0123456789abcdef",
  )
  let wire = @codec.encode_record(rec)
  assert_true(
    @codec.parse_all(wire, limits={
      max_header_bytes: 32,
      max_payload_bytes: 1024,
    })
    is Err(@codec.LimitExceeded(_)),
  )
  assert_true(
    @codec.parse_all(wire, limits={
      max_header_bytes: 4096,
      max_payload_bytes: 8,
    })
    is Err(@codec.LimitExceeded(_)),
  )
  assert_true(
    @codec.parse_all(
      b"WARC/1.1\r\nX-Huge-Unterminated: abcdefghijklmnopqrstuvwxyz",
      limits={ max_header_bytes: 24, max_payload_bytes: 1024, },
    )
    is Err(@codec.LimitExceeded(_)),
  )
  let big_reader = @codec.WarcReader::new()
  big_reader.set_bytes_consumed(5000000000L)
  big_reader.feed(wire)
  match big_reader.next_record() {
    Ok(Some(got)) => {
      assert_eq(got.offset, 5000000000L)
      assert_eq(got.record_length, wire.length().to_int64())
      assert_eq(
        big_reader.bytes_consumed(),
        5000000000L + wire.length().to_int64(),
      )
    }
    _ => fail("expected Int64 offset > 2GiB to decode cleanly")
  }
  let mut scanned = 0L
  let res = @codec.scan_all(wire + wire, fn(r) {
    scanned = scanned + r.record_length
  })
  assert_eq(res, Ok(2L))
  assert_eq(scanned, (wire.length() * 2).to_int64())
}

///|
test "encode_all_gz and parse_all_gz preserve payloads and exact per-member compressed offsets" {
  let recs = make_multi_type_records()
  let gz_wire = @codec.encode_all_gz(recs)
  let plain_wire = @codec.encode_all(recs)
  assert_true(gz_wire.length() < plain_wire.length())
  let parsed_gz = match @codec.parse_all_gz(gz_wire) {
    Ok(rs) => rs
    Err(_) => fail("parse_all_gz failed")
  }
  assert_eq(parsed_gz.length(), recs.length())
  let mut expected_off = 0L
  for i in 0..<parsed_gz.length() {
    assert_eq(parsed_gz[i].payload, recs[i].payload)
    assert_eq(parsed_gz[i].offset, expected_off)
    assert_true(parsed_gz[i].record_length > 18L)
    let end_off = (parsed_gz[i].offset + parsed_gz[i].record_length).to_int()
    let slice = gz_wire[parsed_gz[i].offset.to_int():end_off]
    assert_eq(slice[0], b'\x1f')
    assert_eq(slice[1], b'\x8b')
    expected_off = expected_off + parsed_gz[i].record_length
  }
  assert_eq(expected_off, gz_wire.length().to_int64())
}

///|
test "WarcGzReader and scan_all_gz enforce finish EOF, hard corrupt failures, and multi-record members" {
  let recs = make_multi_type_records()
  // Bundle 2 records into member 0 + remaining 4 into separate members
  let member0 = @gzip.compress(@codec.encode_all([recs[0], recs[1]]), level=6)
  let tail = @codec.encode_all_gz([recs[2], recs[3], recs[4], recs[5]])
  let combined = member0 + tail

  let expected = @codec.parse_all_gz(combined).unwrap()
  assert_eq(expected.length(), 6)
  assert_eq(expected[0].offset, 0L)
  assert_eq(expected[1].offset, 0L)
  assert_eq(expected[1].record_length, member0.length().to_int64())
  assert_eq(expected[2].offset, member0.length().to_int64())

  let scanned : Array[@codec.WarcRecord] = []
  assert_eq(@codec.scan_all_gz(combined, fn(r) { scanned.push(r) }), Ok(6L))
  assert_eq(scanned, expected)

  let reader = @codec.WarcGzReader::new()
  reader.feed(b"")
  assert_eq(reader.next_record(), Ok(None))
  assert_eq(reader.finish(), Ok(()))

  // Truncated trailing bytes fail finish()
  reader.feed(combined[0:combined.length() - 3])
  while true {
    match reader.next_record() {
      Ok(Some(_)) => ()
      Ok(None) => break
      Err(_) => fail("unexpected error before EOF")
    }
  }
  assert_eq(reader.next_record(), Ok(None))
  assert_true(reader.finish() is Err(@codec.GzipError(_)))

  // Corrupt magic after a valid member fails next_record immediately
  let bad = member0 +
    b"\x1f\x8b\x09\x00\x00\x00\x00\x00\x00\x03\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00"
  assert_true(@codec.scan_all_gz(bad, fn(_) { () }) is Err(@codec.GzipError(_)))
  let bad_reader = @codec.WarcGzReader::new()
  bad_reader.feed(bad)
  assert_true(bad_reader.next_record() is Ok(Some(_)))
  assert_true(bad_reader.next_record() is Ok(Some(_)))
  assert_true(bad_reader.next_record() is Err(@codec.GzipError(_)))
}

///|
test "WarcGzReader enforces compressed member limit on unterminated FNAME and shrinks large completed buffers" {
  let gz_limited = @codec.WarcGzReader::new(limits={
    max_header_bytes: 64,
    max_payload_bytes: 128,
  })
  // RFC 1952 header with FNAME flag (0x08) and 6000 bytes without NUL terminator
  gz_limited.feed(
    b"\x1f\x8b\x08\x08\x00\x00\x00\x00\x00\xff" + Bytes::make(6000, b'a'),
  )
  assert_true(gz_limited.next_record() is Err(@codec.LimitExceeded(_)))

  // Large >64 KiB stored .warc.gz member completes and resets oversized internal buffer cleanly
  let large_payload = Bytes::make(70000, b'X')
  let large_rec = @codec.build_resource(
    record_id="<urn:uuid:large-gz-member>",
    date="2026-11-28T00:00:00Z",
    target_uri="https://example.org/large.bin",
    content_type="application/octet-stream",
    large_payload,
  )
  let large_gz = @codec.encode_record_gz(large_rec, level=0)
  assert_true(large_gz.length() > 65536)
  let r = @codec.WarcGzReader::new()
  r.feed(large_gz)
  match r.next_record() {
    Ok(Some(got)) => assert_eq(got.payload, large_payload)
    _ => fail("expected large >64KiB .warc.gz record to decode")
  }
  assert_eq(r.next_record(), Ok(None))
  assert_eq(r.finish(), Ok(()))
}

///|
test "encode_record synchronizes mismatched Content-Length when auto_digest=false and strips stale payload digest on corrupt response" {
  let smuggle_payload = b"ok\r\n\r\nWARC/1.1\r\nWARC-Type: warcinfo\r\nWARC-Record-ID: <urn:uuid:fake>\r\nWARC-Date: 2026-11-28T00:00:00Z\r\nContent-Length: 0\r\n\r\n"
  let smuggled = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:smug-res>"),
      ("WARC-Date", "2026-11-28T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/smug"),
      ("Content-Length", "0"),
    ],
    smuggle_payload,
  )
  let wire = @codec.encode_record(smuggled, auto_digest=false)
  let parsed = @codec.parse_all(wire).unwrap()
  assert_eq(parsed.length(), 1)
  assert_eq(parsed[0].payload, smuggle_payload)

  let corrupt_resp = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:stale-resp>"),
      ("WARC-Date", "2026-11-28T00:00:00Z"),
      ("WARC-Target-URI", "https://example.org/bad"),
      ("WARC-Payload-Digest", "sha256:STALE"),
      ("Content-Length", "11"),
    ],
    b"not-http-ok",
  )
  let resp_wire = @codec.encode_record(corrupt_resp, auto_digest=true)
  let parsed_resp = @codec.parse_all(resp_wire).unwrap()
  assert_eq(parsed_resp[0].header.payload_digest(), None)
}

///|
test "WarcGzReader incremental multi-record member offsets, unconsumed finish, and inner WARC error" {
  let recs = make_multi_type_records()
  let m0 = @gzip.compress(@codec.encode_all([recs[0], recs[1]]), level=6)
  let m1 = @codec.encode_record_gz(recs[2])
  let combined = m0 + m1
  let baseline = @codec.parse_all_gz(combined).unwrap()
  for step in [1, 11] {
    let r = @codec.WarcGzReader::new()
    let got : Array[@codec.WarcRecord] = []
    let mut pos = 0
    while pos < combined.length() {
      let end = if pos + step > combined.length() {
        combined.length()
      } else {
        pos + step
      }
      r.feed(combined[pos:end])
      while true {
        match r.next_record() {
          Ok(Some(rec)) => {
            got.push(rec)
            if got.length() <= 2 {
              assert_eq(r.bytes_consumed(), m0.length().to_int64())
            } else {
              assert_eq(r.bytes_consumed(), combined.length().to_int64())
            }
          }
          Ok(None) => break
          Err(_) => fail("incremental WarcGzReader failed")
        }
      }
      pos = end
    }
    assert_eq(r.finish(), Ok(()))
    assert_eq(got, baseline)
  }
  let partial = @codec.WarcGzReader::new()
  partial.feed(m0)
  assert_true(partial.next_record() is Ok(Some(_)))
  assert_true(partial.finish() is Err(@codec.UnexpectedEof(_)))

  let bad_warc_gz = @gzip.compress(
    b"WARC/1.1\r\nWARC-Type: resource\r\nContent-Length: nope\r\n\r\n",
    level=6,
  )
  let bad_reader = @codec.WarcGzReader::new()
  bad_reader.feed(bad_warc_gz)
  assert_true(bad_reader.next_record() is Err(@codec.HeaderError(_)))
}
