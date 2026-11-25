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
      assert_eq(parsed[0].offset, 0)
      let mut expected_off = 0
      for i in 0..<parsed.length() {
        assert_eq(parsed[i].offset, expected_off)
        assert_true(parsed[i].record_length > parsed[i].payload.length())
        expected_off = expected_off + parsed[i].record_length
        assert_eq(parsed[i].payload, recs[i].payload)
      }
      assert_eq(expected_off, wire.length())
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
      assert_eq(parsed[0].offset, 0)
      assert_eq(parsed[0].record_length, wire.length())
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
  let mut expected_offset = 0
  for r in got {
    assert_eq(r.offset, expected_offset)
    assert_eq(r.payload, big_body)
    expected_offset = expected_offset + r.record_length
  }
  assert_eq(expected_offset, wire.length())
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
      offset: 0,
      record_length: 0,
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
    offset: 0,
    record_length: 0,
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
    offset: 0,
    record_length: 0,
  }
  let seg_encoded = @codec.encode_record(segmented, auto_digest=true)
  let seg_reparsed = match @codec.parse_all(seg_encoded) {
    Ok(v) => v
    Err(_) => fail("seg reparse failed")
  }
  assert_eq(seg_reparsed[0].header.payload_digest(), Some(full_digest))
}
