///|
test "cdxj indexes response and revisit records and skips warcinfo/request/metadata" {
  let wi = @codec.build_warcinfo(
    record_id="<urn:uuid:wi>",
    date="2026-11-25T10:00:00Z",
    b"software: moon-warc\r\n",
  )
  let req = @codec.build_request(
    record_id="<urn:uuid:req>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/b",
    b"GET /b HTTP/1.1\r\nHost: example.org\r\n\r\n",
  )
  let r1 = @codec.build_response(
    record_id="<urn:uuid:r1>",
    date="2026-11-25T10:00:02Z",
    target_uri="https://docs.example.org:443/z?b=2&a=1#frag",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n<h1>Hi</h1>",
  )
  let r2 = @codec.build_response(
    record_id="<urn:uuid:r2>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/a",
    b"HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{}",
  )
  let rev = @codec.build_revisit(
    record_id="<urn:uuid:rev>",
    date="2026-11-25T10:10:00Z",
    target_uri="https://example.org/a",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest="sha256:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    refers_to="<urn:uuid:r2>",
  )
  let wire = @codec.encode_all([wi, req, r1, r2, rev])
  let parsed = match @codec.parse_all(wire) {
    Ok(p) => p
    Err(_) => fail("parse_all failed")
  }
  let index = @cdxj.CdxjIndex::build(parsed, filename="test.warc")
  assert_eq(index.entries.length(), 3)
  // Sorted lexicographically: "org,example)/a" before "org,example,docs)/z?a=1&b=2"
  assert_eq(index.entries[0].surt, "org,example)/a")
  assert_eq(index.entries[0].timestamp, "20261125100001")
  assert_eq(index.entries[0].status, Some(200))
  assert_eq(index.entries[0].mime, Some("application/json"))
  assert_eq(index.entries[1].surt, "org,example)/a")
  assert_eq(index.entries[1].warc_type, "revisit")
  assert_eq(index.entries[2].surt, "org,example,docs)/z?a=1&b=2")
}

///|
test "cdxj format_line and parse_line round-trip with JSON escaping" {
  let entry : @cdxj.CdxjEntry = {
    surt: "org,example)/path",
    timestamp: "20261125100001",
    url: "https://example.org/path?q=\"hello\\world\"",
    mime: Some("text/plain"),
    status: Some(200),
    digest: Some("sha256:ABC123"),
    length: 512,
    offset: 1024,
    filename: "crawl-\"01\".warc",
    warc_type: "response",
  }
  let line = @cdxj.format_line(entry)
  assert_eq(@cdxj.parse_line(line), Ok(entry))
}

///|
test "cdxj binary search lookup_exact, lookup_prefix, and lookup_closest" {
  let r1 = @codec.build_response(
    record_id="<urn:uuid:1>",
    date="2026-11-25T10:00:00Z",
    target_uri="https://example.org/item",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nv1",
  )
  let r2 = @codec.build_response(
    record_id="<urn:uuid:2>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/item",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nv2",
  )
  let r3 = @codec.build_resource(
    record_id="<urn:uuid:3>",
    date="2026-11-25T11:00:00Z",
    target_uri="https://sub.example.org/asset.png",
    content_type="image/png",
    b"\x89PNG",
  )
  let parsed = match @codec.parse_all(@codec.encode_all([r1, r2, r3])) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let idx = @cdxj.CdxjIndex::build(parsed, filename="demo.warc")
  assert_eq(idx.lookup_exact("https://example.org:443/item#top").length(), 2)
  assert_eq(idx.lookup_prefix("org,example").length(), 3)
  assert_eq(idx.lookup_prefix("org,example,sub)").length(), 1)
  match idx.lookup_closest("https://example.org/item", "20261125115000") {
    Some(hit) => assert_eq(hit.timestamp, "20261125120000")
    None => fail("expected closest hit")
  }
  assert_eq(
    idx.lookup_closest("https://missing.invalid/", "20261125120000"),
    None,
  )
}

///|
test "cdxj parse_line rejects malformed input" {
  assert_true(@cdxj.parse_line("only_one_token") is Err(_))
  assert_true(
    @cdxj.parse_line(
      "org,example)/ {\"url\": \"https://example.org/\", \"length\": 1, \"offset\": 0}",
    )
    is Err(_),
  )
  assert_true(@cdxj.parse_line("surt ts {bad-json") is Err(_))
  assert_true(@cdxj.parse_line("surt ts {\"mime\":\"text/html\"}") is Err(_))
}

///|
test "cdxj format_all round-trip, numeric JSON fields, and conversion indexing" {
  let conv = @codec.build_conversion(
    record_id="<urn:uuid:conv-1>",
    date="2026-11-25T10:15:00Z",
    target_uri="https://example.org/doc.pdf",
    content_type="text/plain",
    refers_to="<urn:uuid:orig-doc>",
    b"Extracted text",
  )
  let parsed = match @codec.parse_all(@codec.encode_all([conv])) {
    Ok(p) => p
    Err(_) => fail("parse failed")
  }
  let idx = @cdxj.CdxjIndex::build(parsed, filename="conv.warc")
  assert_eq(idx.entries.length(), 1)
  assert_eq(idx.entries[0].warc_type, "conversion")
  assert_eq(idx.entries[0].mime, Some("text/plain"))
  let rendered = idx.format_all()
  match @cdxj.parse_line(rendered) {
    Ok(e) => assert_eq(e, idx.entries[0])
    Err(_) => fail("format_all line failed parse_line")
  }
  let numeric_line = "org,example)/n 20261125101500 {\"url\":\"https://example.org/n\",\"status\":200,\"length\":64,\"offset\":128}"
  match @cdxj.parse_line(numeric_line) {
    Ok(e) => {
      assert_eq(e.status, Some(200))
      assert_eq(e.length, 64)
      assert_eq(e.offset, 128)
      assert_eq(e.warc_type, "response")
    }
    Err(_) => fail("numeric JSON fields failed")
  }
  let empty = @cdxj.CdxjIndex::build([])
  assert_eq(empty.format_all(), "")
  assert_eq(empty.lookup_exact("https://example.org/"), [])
  assert_eq(empty.lookup_prefix("org,example"), [])
}

///|
test "cdxj lookup_closest uses epoch seconds across midnight and month-end boundaries" {
  let midnight_entries : Array[@cdxj.CdxjEntry] = [
    {
      surt: "org,example)/boundary",
      timestamp: "20261126000001",
      url: "https://example.org/boundary",
      mime: Some("text/html"),
      status: Some(200),
      digest: None,
      length: 100,
      offset: 200,
      filename: "b.warc",
      warc_type: "response",
    },
    {
      surt: "org,example)/boundary",
      timestamp: "20261125235000",
      url: "https://example.org/boundary",
      mime: Some("text/html"),
      status: Some(200),
      digest: None,
      length: 100,
      offset: 0,
      filename: "b.warc",
      warc_type: "response",
    },
  ]
  let idx = @cdxj.CdxjIndex::from_entries(midnight_entries)
  assert_eq(idx.entries[0].timestamp, "20261125235000")
  assert_eq(idx.entries[1].timestamp, "20261126000001")
  match idx.lookup_closest("https://example.org/boundary", "20261125235959") {
    Some(hit) => assert_eq(hit.timestamp, "20261126000001")
    None => fail("expected cross-midnight hit")
  }
  let month_idx = @cdxj.CdxjIndex::from_entries([
    {
      surt: "org,example)/month",
      timestamp: "20260228235000",
      url: "https://example.org/month",
      mime: None,
      status: Some(200),
      digest: None,
      length: 10,
      offset: 0,
      filename: "m.warc",
      warc_type: "response",
    },
    {
      surt: "org,example)/month",
      timestamp: "20260301000001",
      url: "https://example.org/month",
      mime: None,
      status: Some(200),
      digest: None,
      length: 10,
      offset: 50,
      filename: "m.warc",
      warc_type: "response",
    },
  ])
  match
    month_idx.lookup_closest("https://example.org/month", "20260228235959") {
    Some(hit) => assert_eq(hit.timestamp, "20260301000001")
    None => fail("expected cross-month hit")
  }
}

///|
test "cdxj parse_line rejects overflowing Int32 length field" {
  let overflow_line = "org,example)/ov 20261125101500 {\"url\":\"https://example.org/ov\",\"length\":\"999999999999\",\"offset\":0}"
  assert_true(@cdxj.parse_line(overflow_line) is Err(_))
}
