///|
fn fuzz_pattern_bytes(len : Int32, seed : Int32) -> Bytes {
  Bytes::makei(len, i => ((i * 37 + seed * 13) % 256).to_byte())
}

///|
fn fuzz_build_corpus() -> Array[@codec.WarcRecord] {
  let wi = @codec.build_warcinfo(
    record_id="<urn:uuid:fuzz-wi-0001>",
    date="2026-11-25T00:00:00Z",
    filename="fuzz-corpus.warc",
    b"software: moon-warc/0.1.0\r\nhost: fuzz.local\r\n",
  )
  let req = @codec.build_request(
    record_id="<urn:uuid:fuzz-req-0002>",
    date="2026-11-25T00:00:01Z",
    target_uri="https://example.org/bin?a=1&b=2",
    concurrent_to="<urn:uuid:fuzz-resp-0003>",
    b"GET /bin?a=1&b=2 HTTP/1.1\r\nHost: example.org\r\n\r\n",
    version=@header.Warc1_0,
  )
  let resp = @codec.build_response(
    record_id="<urn:uuid:fuzz-resp-0003>",
    date="2026-11-25T00:00:01Z",
    target_uri="https://example.org/bin?a=1&b=2",
    b"HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n6\r\n\x00\r\n\r\n\xff\r\n0\r\n\r\n",
  )
  let res = @codec.build_resource(
    record_id="<urn:uuid:fuzz-res-0004>",
    date="2026-11-25T00:00:02Z",
    target_uri="https://example.org/raw.bin",
    content_type="application/octet-stream",
    b"\x00\r\n\r\n\xff\xfe\x00\r\n\r\n\xff",
  )
  let rev = @codec.build_revisit(
    record_id="<urn:uuid:fuzz-rev-0005>",
    date="2026-11-25T00:05:00Z",
    target_uri="https://example.org/bin?a=1&b=2",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"Hello\x00\r\n\r\n\xff"),
    refers_to="<urn:uuid:fuzz-resp-0003>",
  )
  [wi, req, resp, res, rev]
}

///|
fn fuzz_stream_with_chunk(
  wire : Bytes,
  chunk_sz : Int32,
) -> Result[Array[@codec.WarcRecord], @codec.CodecError] {
  let reader = @codec.WarcReader::new()
  let out : Array[@codec.WarcRecord] = []
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
        Ok(Some(r)) => out.push(r)
        Ok(None) => break
        Err(e) => return Err(e)
      }
    }
    pos = end
  }
  match reader.finish() {
    Ok(_) => Ok(out)
    Err(e) => Err(e)
  }
}

///|
fn fuzz_assert_stream_matches(
  wire : Bytes,
  expected : Array[@codec.WarcRecord],
  chunk_sz : Int32,
) -> Unit raise {
  match fuzz_stream_with_chunk(wire, chunk_sz) {
    Ok(got) => {
      assert_eq(got, expected)
      let mut expected_off = 0
      for rec in got {
        assert_eq(rec.offset, expected_off)
        expected_off = expected_off + rec.record_length
      }
      assert_eq(expected_off, wire.length())
    }
    Err(_) => fail("streaming parse failed at chunk_sz=\{chunk_sz.to_string()}")
  }
}

///|
fn fuzz_assert_boundary_len(payload_len : Int32) -> Unit raise {
  let payload = fuzz_pattern_bytes(payload_len, payload_len + 1)
  let r1 = @codec.build_resource(
    record_id="<urn:uuid:bound-\{payload_len.to_string()}-a>",
    date="2026-11-25T11:00:00Z",
    target_uri="https://example.org/len/\{payload_len.to_string()}",
    content_type="application/octet-stream",
    payload,
  )
  let r2 = @codec.build_resource(
    record_id="<urn:uuid:bound-\{payload_len.to_string()}-b>",
    date="2026-11-25T11:00:01Z",
    target_uri="https://example.org/len/\{payload_len.to_string()}/b",
    content_type="application/octet-stream",
    b"\x00\r\n\r\n\xff" + payload,
  )
  let wire = @codec.encode_all([r1, r2])
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed for len=\{payload_len.to_string()}")
  }
  assert_eq(baseline.length(), 2)
  assert_eq(baseline[0].payload, payload)
  assert_eq(baseline[1].payload, b"\x00\r\n\r\n\xff" + payload)
  for chunk_sz in [1, 2, 3, 7, 13, 31, 64, 256, wire.length()] {
    fuzz_assert_stream_matches(wire, baseline, chunk_sz)
  }
}

///|
test "fuzz stream chunk_size=1 byte-by-byte across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 1)
}

///|
test "fuzz stream chunk_size=2 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 2)
}

///|
test "fuzz stream chunk_size=3 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 3)
}

///|
test "fuzz stream chunk_size=7 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 7)
}

///|
test "fuzz stream chunk_size=13 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 13)
}

///|
test "fuzz stream chunk_size=31 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 31)
}

///|
test "fuzz stream chunk_size=64 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 64)
}

///|
test "fuzz stream chunk_size=256 across multi-record archive" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 256)
}

///|
test "fuzz stream chunk_size=full single feed" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  fuzz_assert_stream_matches(wire, baseline, wire.length())
}

///|
test "fuzz stream alternating empty feeds and prime chunk splits" {
  let wire = @codec.encode_all(fuzz_build_corpus())
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("baseline parse failed")
  }
  let reader = @codec.WarcReader::new()
  let collected : Array[@codec.WarcRecord] = []
  let steps = [0, 1, 0, 3, 0, 7, 0, 13, 0, 31]
  let mut pos = 0
  let mut step_idx = 0
  while pos < wire.length() {
    let sz = steps[step_idx % steps.length()]
    step_idx = step_idx + 1
    let end = if pos + sz > wire.length() { wire.length() } else { pos + sz }
    reader.feed(wire[pos:end])
    while true {
      match reader.next_record() {
        Ok(Some(r)) => collected.push(r)
        Ok(None) => break
        Err(_) => fail("stream failed with empty feeds")
      }
    }
    pos = end
  }
  assert_eq(reader.finish(), Ok(()))
  assert_eq(collected, baseline)
}

///|
test "fuzz boundary payload length=0 across chunk sizes 1..full" {
  fuzz_assert_boundary_len(0)
}

///|
test "fuzz boundary payload length=1 across chunk sizes 1..full" {
  fuzz_assert_boundary_len(1)
}

///|
test "fuzz boundary payload length=63 across chunk sizes 1..full" {
  fuzz_assert_boundary_len(63)
}

///|
test "fuzz boundary payload length=64 across chunk sizes 1..full" {
  fuzz_assert_boundary_len(64)
}

///|
test "fuzz boundary payload length=65 across chunk sizes 1..full" {
  fuzz_assert_boundary_len(65)
}

///|
test "fuzz boundary payload length=512 across chunk sizes 1..full" {
  fuzz_assert_boundary_len(512)
}

///|
test "fuzz folded multi-line headers with spaces tabs and empty continuation" {
  let payload = b"\x00\r\n\r\n\xffpayload"
  let digest_str = @digest.format_warc_digest_sha256(payload)
  let hdr_buf = @buffer.Buffer(capacity=512)
  hdr_buf.write_string_utf8(
    "WARC/1.1\r\nWARC-Type: resource\r\nWARC-Record-ID: <urn:uuid:folded-1>\r\nWARC-Date: 2026-11-25T12:00:00Z\r\nWARC-Target-URI: https://example.org/\r\n  folded/path\r\nX-Folded: first\r\n  second\r\n\t\r\n\tthird\r\nWARC-Block-Digest: \{digest_str}\r\nContent-Type: application/octet-stream\r\nContent-Length: 13\r\n\r\n",
  )
  let wire = hdr_buf.to_bytes() + payload + b"\r\n\r\n"
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("folded header parse failed")
  }
  assert_eq(baseline.length(), 1)
  assert_eq(
    baseline[0].header.target_uri(),
    Some("https://example.org/ folded/path"),
  )
  assert_eq(baseline[0].header.get("X-Folded"), Some("first second third"))
  assert_eq(baseline[0].payload, payload)
  for chunk_sz in [1, 2, 3, 7, 13, 31, 64, 256, wire.length()] {
    fuzz_assert_stream_matches(wire, baseline, chunk_sz)
  }
}

///|
test "fuzz binary payload containing NUL CRLFCRLF and 0xFF bytes" {
  let bin = b"\x00\r\n\r\n\xff\x00\r\n\r\n\xff\x80\x7f\r\n\r\n"
  let rec = @codec.build_resource(
    record_id="<urn:uuid:bin-crlfcrlf>",
    date="2026-11-25T12:01:00Z",
    target_uri="https://example.org/raw",
    content_type="application/octet-stream",
    bin,
  )
  let wire = @codec.encode_all([rec, rec])
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("binary parse failed")
  }
  assert_eq(baseline.length(), 2)
  assert_eq(baseline[0].payload, bin)
  assert_eq(baseline[1].payload, bin)
  for chunk_sz in [1, 2, 3, 7, 13, 31, 64, 256, wire.length()] {
    fuzz_assert_stream_matches(wire, baseline, chunk_sz)
  }
}

///|
test "fuzz binary payload mimicking fake WARC/1.1 header inside body" {
  let fake_inner = b"WARC/1.1\r\nWARC-Type: warcinfo\r\nContent-Length: 0\r\n\r\n\r\n\r\n\x00\xff"
  let outer = @codec.build_resource(
    record_id="<urn:uuid:nested-fake-warc>",
    date="2026-11-25T12:02:00Z",
    target_uri="https://example.org/nested.warc",
    content_type="application/warc",
    fake_inner,
  )
  let follower = @codec.build_warcinfo(
    record_id="<urn:uuid:follower-ok>",
    date="2026-11-25T12:02:01Z",
    b"ok: true\r\n",
  )
  let wire = @codec.encode_all([outer, follower])
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("nested fake warc parse failed")
  }
  assert_eq(baseline.length(), 2)
  assert_eq(baseline[0].payload, fake_inner)
  assert_eq(baseline[1].payload, b"ok: true\r\n")
  for chunk_sz in [1, 2, 3, 7, 13, 31, 64, 256, wire.length()] {
    fuzz_assert_stream_matches(wire, baseline, chunk_sz)
  }
}

///|
test "fuzz WARC/1.0 and WARC/1.1 mixed records with CRLF split across chunks" {
  let r1 = @codec.build_warcinfo(
    record_id="<urn:uuid:v10-wi>",
    date="2026-11-25T12:03:00Z",
    b"format: WARC File Format 1.0\r\n",
    version=@header.Warc1_0,
  )
  let r2 = @codec.build_response(
    record_id="<urn:uuid:v11-resp>",
    date="2026-11-25T12:03:01.250Z",
    target_uri="https://example.org/v11",
    b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n3\r\nabc\r\n0\r\n\r\n",
    version=@header.Warc1_1,
  )
  let wire = @codec.encode_all([r1, r2])
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("mixed version parse failed")
  }
  assert_eq(baseline[0].header.version, @header.Warc1_0)
  assert_eq(baseline[1].header.version, @header.Warc1_1)
  fuzz_assert_stream_matches(wire, baseline, 1)
  fuzz_assert_stream_matches(wire, baseline, 3)
  fuzz_assert_stream_matches(wire, baseline, 7)
}

///|
test "fuzz streaming compaction exactly at and across 4096-byte boundary" {
  let recs : Array[@codec.WarcRecord] = []
  for idx in 0..<5 {
    let body = fuzz_pattern_bytes(1024 + idx, idx)
    recs.push(
      @codec.build_resource(
        record_id="<urn:uuid:compact-\{idx.to_string()}>",
        date="2026-11-25T12:04:0\{idx.to_string()}Z",
        target_uri="https://example.org/compact/\{idx.to_string()}",
        content_type="application/octet-stream",
        body,
      ),
    )
  }
  let wire = @codec.encode_all(recs)
  assert_true(wire.length() > 5120)
  let baseline = match @codec.parse_all(wire) {
    Ok(v) => v
    Err(_) => fail("compaction baseline failed")
  }
  fuzz_assert_stream_matches(wire, baseline, 13)
  fuzz_assert_stream_matches(wire, baseline, 31)
  fuzz_assert_stream_matches(wire, baseline, 256)
}

///|
test "fuzz codec rejects truncated header, truncated payload, split bad trailer, and trailing byte" {
  let rec = @codec.build_resource(
    record_id="<urn:uuid:err-stream>",
    date="2026-11-25T12:05:00Z",
    target_uri="https://example.org/err",
    content_type="application/octet-stream",
    b"\x00\x01\x02\x03\x04\x05",
  )
  let wire = @codec.encode_record(rec)
  assert_true(
    fuzz_stream_with_chunk(wire[0:20].to_owned(), 1)
    is Err(@codec.UnexpectedEof(_)),
  )
  assert_true(
    fuzz_stream_with_chunk(wire[0:wire.length() - 5].to_owned(), 3)
    is Err(@codec.UnexpectedEof(_)),
  )
  assert_true(
    fuzz_stream_with_chunk(wire[0:wire.length() - 1].to_owned(), 1)
    is Err(@codec.UnexpectedEof(_)),
  )
  let bad_trailer = wire[0:wire.length() - 1].to_owned() + b"X"
  assert_true(
    fuzz_stream_with_chunk(bad_trailer, 1)
    is Err(@codec.InvalidTrailingSeparator(_)),
  )
  assert_true(
    fuzz_stream_with_chunk(wire + b"!", 7) is Err(@codec.UnexpectedEof(_)),
  )
}
