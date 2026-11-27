///|
fn hardening_build_res(
  id : String,
  date : String,
  uri : String,
  ct~ : String = "text/plain",
  body~ : Bytes = b"ok",
) -> @codec.WarcRecord {
  @codec.build_resource(
    record_id=id,
    date~,
    target_uri=uri,
    content_type=ct,
    body,
  )
}

///|
test "hardening root facade library_version and sample_archive_bytes roundtrip" {
  assert_eq(@moon_warc.library_version(), "0.5.0")
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(r) => r
    Err(_) => fail("parse_archive failed on sample_archive_bytes")
  }
  assert_eq(recs.length(), 6)
  let re_auto = @moon_warc.encode_archive(recs)
  assert_eq(re_auto, raw)
  let re_exact = @moon_warc.encode_archive(recs, auto_digest=false)
  assert_eq(re_exact, raw)
}

///|
test "hardening root facade validate_archive and resolve_revisits on sample" {
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(r) => r
    Err(_) => fail("parse_archive failed")
  }
  let report = @moon_warc.validate_archive(recs)
  assert_true(report.is_valid())
  assert_eq(report.record_count, 6)
  assert_eq(report.error_count, 0)
  assert_eq(report.warning_count, 0)
  let revisits = @moon_warc.resolve_revisits(recs)
  assert_eq(revisits.length(), 1)
  assert_eq(revisits[0].match_kind, @validate.ByRecordId)
  assert_eq(revisits[0].target_index, Some(2))
  assert_eq(
    revisits[0].target_record_id,
    Some("<urn:uuid:00000000-0000-4000-8000-000000000003>"),
  )
}

///|
test "hardening python oracle golden SHA-1 and SHA-256 Base32 vectors" {
  assert_eq(
    @digest.format_warc_digest_sha1(b""),
    "sha1:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ",
  )
  assert_eq(
    @digest.format_warc_digest_sha256(b""),
    "sha256:4OYMIQUY7QOBJGX36TEJS35ZEQT24QPEMSNZGTFESWMRW6CSXBKQ====",
  )
  assert_eq(
    @digest.format_warc_digest_sha1(b"abc"),
    "sha1:VGMT4NSHA2AWVOR6EVYXQUGCNSONBWE5",
  )
  assert_eq(
    @digest.format_warc_digest_sha256(b"abc"),
    "sha256:XJ4BNP4PAHH6UQKBIDPF3LRCEOYAGYNDSYLXVHFUCD7WD4QACWWQ====",
  )
  assert_eq(
    @digest.format_warc_digest_sha1(b"Hello"),
    "sha1:677Z5C33WLQJW4ETLJOXQXQMYXM5BK7Q",
  )
  assert_eq(
    @digest.format_warc_digest_sha256(b"Hello"),
    "sha256:DBPY3MZCOH7CL5LBU36JHCZOEZBQN3BQJ3NFDAAH2F3EQJRYDFUQ====",
  )
  assert_eq(
    @digest.format_warc_digest_sha1(
      b"<!doctype html><html><body><h1>Hello WARC</h1></body></html>\n",
    ),
    "sha1:MHIRBCOCMGIMNLRMF4I4OJQWRXEP5Y6C",
  )
  assert_eq(
    @digest.format_warc_digest_sha256(
      b"<!doctype html><html><body><h1>Hello WARC</h1></body></html>\n",
    ),
    "sha256:PYDFIEG33DIQDE7JE73F4LKHUKHF6CWBTGOAYMQJWHUEG5PKBZ7A====",
  )
  assert_eq(
    @digest.format_warc_digest_sha1(b"\x00\r\n\r\n\xff\xfeWARC\x00"),
    "sha1:7P5X7Q5WM3WPCKQIOYKLHM64HIKE3XAG",
  )
  assert_eq(
    @digest.format_warc_digest_sha256(b"\x00\r\n\r\n\xff\xfeWARC\x00"),
    "sha256:MEZELUBAJSUYYR22LMPT2BL2T4VJ2J42OK5PEA6HDYBT4Y7T6NCQ====",
  )
}

///|
test "hardening python oracle golden 3-record WARC/1.1 archive byte-for-byte match" {
  let r0 = b"WARC/1.1\r\nWARC-Type: warcinfo\r\nWARC-Record-ID: <urn:uuid:11111111-1111-4111-8111-111111111111>\r\nWARC-Date: 2026-11-25T08:00:00Z\r\nContent-Type: application/warc-fields\r\nWARC-Filename: golden.warc\r\nContent-Length: 29\r\nWARC-Block-Digest: sha256:IUOZ3QIAIQNIR7E2CJG2VPCKBDE3LMT2NJDVTG23C3PSYKVBZX2Q====\r\n\r\nsoftware: python-oracle/1.0\r\n\r\n\r\n"
  let r1 = b"WARC/1.1\r\nWARC-Type: response\r\nWARC-Record-ID: <urn:uuid:22222222-2222-4222-8222-222222222222>\r\nWARC-Date: 2026-11-25T08:01:00Z\r\nWARC-Target-URI: https://docs.example.org:443/a/./b/../c?z=9&a=1#frag\r\nContent-Type: application/http; msgtype=response\r\nContent-Length: 137\r\nWARC-Block-Digest: sha256:TSQICO77U7DBPJWLSM4VP3KUP34ADHL5MW4DLVNZNF5X5QJG5Q2A====\r\nWARC-Payload-Digest: sha256:OMFWJA5VUCBRKXT5QL4WAZXMB3LCOO5OMYSXZ7CGOUHHYEL3ROBQ====\r\n\r\nHTTP/1.1 200 OK\r\nContent-Type: text/plain; charset=utf-8\r\nTransfer-Encoding: chunked\r\n\r\n6\r\nOracle\r\n6;ext=1\r\n\x00Data!\r\n0\r\nX-Trailer: yes\r\n\r\n\r\n\r\n"
  let r2 = b"WARC/1.1\r\nWARC-Type: revisit\r\nWARC-Record-ID: <urn:uuid:33333333-3333-4333-8333-333333333333>\r\nWARC-Date: 2026-11-25T08:02:00Z\r\nWARC-Target-URI: https://docs.example.org/a/c?a=1&z=9\r\nWARC-Profile: http://netpreserve.org/warc/1.1/revisit/identical-payload-digest\r\nWARC-Payload-Digest: sha256:OMFWJA5VUCBRKXT5QL4WAZXMB3LCOO5OMYSXZ7CGOUHHYEL3ROBQ====\r\nWARC-Refers-To: <urn:uuid:22222222-2222-4222-8222-222222222222>\r\nContent-Type: application/http; msgtype=response\r\nContent-Length: 0\r\nWARC-Block-Digest: sha256:4OYMIQUY7QOBJGX36TEJS35ZEQT24QPEMSNZGTFESWMRW6CSXBKQ====\r\n\r\n\r\n\r\n"
  let golden = r0 + r1 + r2
  assert_eq(golden.length(), 1492)
  assert_eq(
    @digest.hex_encode(@digest.sha256(golden)),
    "5cec14d3db2199b7073dce238cb2b8c619358308dcf46458498fa20f33d51035",
  )
  let recs = match @moon_warc.parse_archive(golden) {
    Ok(v) => v
    Err(_) => fail("golden parse_archive failed")
  }
  assert_eq(recs.length(), 3)
  assert_eq(recs[0].offset, 0L)
  assert_eq(recs[0].record_length, 335L)
  assert_eq(recs[1].offset, 335L)
  assert_eq(recs[1].record_length, 584L)
  assert_eq(recs[2].offset, 919L)
  assert_eq(recs[2].record_length, 573L)
  let report = @moon_warc.validate_archive(recs)
  assert_true(report.is_valid())
  assert_eq(report.error_count, 0)
  assert_eq(report.warning_count, 0)
  let idx = @moon_warc.build_cdxj_index(recs, filename="golden.warc")
  let idx_entries = idx.entries()
  assert_eq(idx_entries.length(), 2)
  assert_eq(idx_entries[0].surt, "org,example,docs)/a/c?a=1&z=9")
  assert_eq(idx_entries[0].timestamp, "20261125080100")
  assert_eq(idx_entries[1].surt, "org,example,docs)/a/c?a=1&z=9")
  assert_eq(idx_entries[1].timestamp, "20261125080200")
  assert_eq(@moon_warc.encode_archive(recs, auto_digest=false), golden)
}

///|
test "hardening golden sample_archive_bytes HTML entity digest matches python oracle" {
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(r) => r
    Err(_) => fail("parse failed")
  }
  assert_eq(
    recs[2].header.payload_digest(),
    Some("sha256:PYDFIEG33DIQDE7JE73F4LKHUKHF6CWBTGOAYMQJWHUEG5PKBZ7A===="),
  )
  assert_eq(
    recs[5].header.payload_digest(),
    Some("sha256:PYDFIEG33DIQDE7JE73F4LKHUKHF6CWBTGOAYMQJWHUEG5PKBZ7A===="),
  )
}

///|
test "hardening CDXJ SURT lexical vs shortlex ordering on query parameters" {
  let r1 = hardening_build_res(
    "<urn:uuid:q1>", "2026-11-25T10:00:00Z", "https://example.com/search?z=1&alpha=2&a=3",
  )
  let r2 = hardening_build_res(
    "<urn:uuid:q2>", "2026-11-25T10:00:01Z", "https://example.com/search?b=2&a=1&b=1",
  )
  let parsed = match
    @moon_warc.parse_archive(@moon_warc.encode_archive([r1, r2])) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  let entries = idx.entries()
  assert_eq(entries[0].surt, "com,example)/search?a=1&b=1&b=2")
  assert_eq(entries[1].surt, "com,example)/search?a=3&alpha=2&z=1")
}

///|
test "hardening CDXJ SURT lexical sorting across domain labels and ports" {
  let urls = [
    "http://example.org:8080/a", "https://z.example.org/a", "https://example.org/a",
    "https://a.b.example.org/a", "https://example.org/alpha",
  ]
  let recs : Array[@codec.WarcRecord] = []
  for i in 0..<urls.length() {
    recs.push(
      hardening_build_res(
        "<urn:uuid:dom-\{i.to_string()}>",
        "2026-11-25T10:00:0\{i.to_string()}Z",
        urls[i],
      ),
    )
  }
  let parsed = match @moon_warc.parse_archive(@moon_warc.encode_archive(recs)) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  let surts = idx.entries().map(e => e.surt)
  // ASCII: ')' (41) < ',' (44) < ':' (58), and "a" < "alpha"
  assert_eq(surts, [
    "org,example)/a", "org,example)/alpha", "org,example,b,a)/a", "org,example,z)/a",
    "org,example:8080)/a",
  ])
}

///|
test "hardening CDXJ SURT dot-segment clamping and trailing slash semantics" {
  let r1 = hardening_build_res(
    "<urn:uuid:p1>", "2026-11-25T10:00:00Z", "https://example.org/a/b/../../..",
  )
  let r2 = hardening_build_res(
    "<urn:uuid:p2>", "2026-11-25T10:00:01Z", "https://example.org/a/b/..",
  )
  let r3 = hardening_build_res(
    "<urn:uuid:p3>", "2026-11-25T10:00:02Z", "https://example.org/a/./b/",
  )
  let parsed = match
    @moon_warc.parse_archive(@moon_warc.encode_archive([r1, r2, r3])) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  let entries = idx.entries()
  assert_eq(entries[0].surt, "org,example)/")
  assert_eq(entries[1].surt, "org,example)/a")
  assert_eq(entries[2].surt, "org,example)/a/b/")
}

///|
test "hardening CDXJ SURT IPv4, IPv6, localhost, trailing dot, and default ports" {
  let recs = [
    hardening_build_res(
      "<urn:uuid:ip4>", "2026-11-25T10:00:00Z", "http://192.0.2.10:80/status",
    ),
    hardening_build_res(
      "<urn:uuid:ip6>", "2026-11-25T10:00:01Z", "http://[::1]:8080/metrics?flag&&k=v",
    ),
    hardening_build_res(
      "<urn:uuid:loc>", "2026-11-25T10:00:02Z", "ws://LOCALHOST:80/ws",
    ),
    hardening_build_res(
      "<urn:uuid:dot>", "2026-11-25T10:00:03Z", "ftp://Files.Example.ORG.:21/pub/archive.warc#end",
    ),
  ]
  let parsed = match @moon_warc.parse_archive(@moon_warc.encode_archive(recs)) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  let surts = idx.entries().map(e => e.surt)
  assert_true(surts.contains("192.0.2.10)/status"))
  assert_true(surts.contains("[::1]:8080)/metrics?flag&k=v"))
  assert_true(surts.contains("localhost)/ws"))
  assert_true(surts.contains("org,example,files)/pub/archive.warc"))
}

///|
test "hardening CDXJ tie-breaks identical SURT and timestamp by ascending offset" {
  let r_first = hardening_build_res(
    "<urn:uuid:off-1>",
    "2026-11-25T10:00:00Z",
    "https://example.org/same",
    body=b"first",
  )
  let r_second = hardening_build_res(
    "<urn:uuid:off-2>",
    "2026-11-25T10:00:00Z",
    "https://example.org/same",
    body=b"second-longer",
  )
  let parsed = match
    @moon_warc.parse_archive(@moon_warc.encode_archive([r_first, r_second])) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  let entries = idx.entries()
  assert_eq(entries.length(), 2)
  assert_eq(entries[0].offset, 0L)
  assert_eq(entries[1].offset, parsed[1].offset)
  assert_true(entries[0].offset < entries[1].offset)
}

///|
test "hardening CDXJ indexes conversion records and skips warcinfo request metadata continuation" {
  let wi = @codec.build_warcinfo(
    record_id="<urn:uuid:skip-1>",
    date="2026-11-25T10:00:00Z",
    b"info\r\n",
  )
  let req = @codec.build_request(
    record_id="<urn:uuid:skip-2>",
    date="2026-11-25T10:00:01Z",
    target_uri="https://example.org/x",
    b"GET /x HTTP/1.1\r\nHost: example.org\r\n\r\n",
  )
  let meta = @codec.build_metadata(
    record_id="<urn:uuid:skip-3>",
    date="2026-11-25T10:00:02Z",
    target_uri="https://example.org/x",
    b"hops: 1\r\n",
  )
  let cont = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", "<urn:uuid:skip-4>"),
      ("WARC-Date", "2026-11-25T10:00:03Z"),
      ("WARC-Target-URI", "https://example.org/x"),
      ("Content-Length", "3"),
    ],
    b"abc",
  )
  let conv = @codec.build_conversion(
    record_id="<urn:uuid:keep-1>",
    date="2026-11-25T10:00:04Z",
    target_uri="https://example.org/x",
    content_type="text/plain; charset=utf-8",
    b"plain text",
  )
  let parsed = match
    @moon_warc.parse_archive(
      @moon_warc.encode_archive([wi, req, meta, cont, conv]),
    ) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed, filename="conv.warc")
  let entries = idx.entries()
  assert_eq(entries.length(), 1)
  assert_eq(entries[0].warc_type, "conversion")
  assert_eq(entries[0].mime, Some("text/plain"))
  assert_eq(entries[0].filename, "conv.warc")
}

///|
test "hardening CDXJ empty archive produces empty index and empty format_all" {
  let recs = match @moon_warc.parse_archive(b"") {
    Ok(v) => v
    Err(_) => fail("empty parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(recs)
  assert_eq(idx.length(), 0)
  assert_eq(idx.format_all(), "")
  assert_eq(idx.lookup_exact("https://example.org/"), [])
  assert_eq(idx.lookup_prefix("org,example"), [])
  assert_eq(idx.lookup_closest("https://example.org/", "20261125000000"), None)
}

///|
test "hardening CDXJ lookup_exact canonicalizes query, case, port, and fragment" {
  let rec = hardening_build_res(
    "<urn:uuid:canon-hit>", "2026-11-25T10:00:00Z", "https://docs.example.org/v1/guide?a=1&b=2",
  )
  let parsed = match
    @moon_warc.parse_archive(@moon_warc.encode_archive([rec])) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  let hits = idx.lookup_exact(
    "HTTPS://Docs.Example.ORG:443/v1/./sub/../guide?b=2&a=1#section",
  )
  assert_eq(hits.length(), 1)
  assert_eq(hits[0].surt, "org,example,docs)/v1/guide?a=1&b=2")
}

///|
test "hardening CDXJ lookup_prefix enforces strict boundary without false positives" {
  let recs = [
    hardening_build_res(
      "<urn:uuid:px-1>", "2026-11-25T10:00:00Z", "https://example.org/a",
    ),
    hardening_build_res(
      "<urn:uuid:px-2>", "2026-11-25T10:00:01Z", "https://sub.example.org/b",
    ),
    hardening_build_res(
      "<urn:uuid:px-3>", "2026-11-25T10:00:02Z", "https://example2.org/c",
    ),
  ]
  let parsed = match @moon_warc.parse_archive(@moon_warc.encode_archive(recs)) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  assert_eq(idx.lookup_prefix("org,example)").length(), 1)
  assert_eq(idx.lookup_prefix("org,example,").length(), 1)
  assert_eq(idx.lookup_prefix("org,example").length(), 3)
  assert_eq(idx.lookup_prefix("org,example2)").length(), 1)
  assert_eq(idx.lookup_prefix("com,").length(), 0)
}

///|
test "hardening CDXJ lookup_closest picks nearest capture and handles tie and invalid ts" {
  let recs = [
    hardening_build_res(
      "<urn:uuid:t1>", "2026-11-25T10:00:00Z", "https://example.org/ts",
    ),
    hardening_build_res(
      "<urn:uuid:t2>", "2026-11-25T10:30:00Z", "https://example.org/ts",
    ),
    hardening_build_res(
      "<urn:uuid:t3>", "2026-11-25T10:50:00Z", "https://example.org/ts",
    ),
  ]
  let parsed = match @moon_warc.parse_archive(@moon_warc.encode_archive(recs)) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(parsed)
  match idx.lookup_closest("https://example.org/ts", "20261125101500") {
    Some(hit) => assert_eq(hit.timestamp, "20261125100000")
    None => fail("expected tie-break hit")
  }
  match idx.lookup_closest("https://example.org/ts", "20261125104500") {
    Some(hit) => assert_eq(hit.timestamp, "20261125105000")
    None => fail("expected nearest hit")
  }
  match idx.lookup_closest("https://example.org/ts", "invalid-ts") {
    Some(hit) => assert_eq(hit.timestamp, "20261125100000")
    None => fail("expected fallback hit")
  }
}

///|
test "hardening CDXJ format_line omits optional None fields and parses numeric JSON" {
  let minimal : @cdxj.CdxjEntry = {
    surt: "org,example)/min",
    timestamp: "20261125000000",
    url: "https://example.org/min",
    mime: None,
    status: None,
    digest: None,
    length: 120L,
    offset: 0L,
    filename: "min.warc",
    warc_type: "resource",
  }
  let line = @cdxj.format_line(minimal)
  assert_false(line.contains("\"mime\""))
  assert_false(line.contains("\"status\""))
  assert_false(line.contains("\"digest\""))
  assert_eq(@cdxj.parse_line(line), Ok(minimal))
  let numeric_json = "org,example)/min 20261125000000 {\"url\":\"https://example.org/min\",\"status\":200,\"length\":120,\"offset\":64}"
  match @cdxj.parse_line(numeric_json) {
    Ok(e) => {
      assert_eq(e.status, Some(200))
      assert_eq(e.length, 120L)
      assert_eq(e.offset, 64L)
      assert_eq(e.filename, "")
      assert_eq(e.warc_type, "response")
    }
    Err(_) => fail("numeric JSON CDXJ parse failed")
  }
}

///|
test "hardening CDXJ parse_line rejects missing required JSON fields and bad JSON" {
  assert_true(@cdxj.parse_line("") is Err(@cdxj.InvalidLineFormat(_)))
  assert_true(@cdxj.parse_line("a b") is Err(@cdxj.InvalidLineFormat(_)))
  assert_true(@cdxj.parse_line("a b [1,2]") is Err(@cdxj.InvalidJsonBlock(_)))
  assert_true(
    @cdxj.parse_line("a b {\"url\":\"https://a.org\",\"offset\":\"0\"}")
    is Err(@cdxj.MissingJsonField("length")),
  )
  assert_true(
    @cdxj.parse_line("a b {\"url\":\"https://a.org\",\"length\":\"10\"}")
    is Err(@cdxj.MissingJsonField("offset")),
  )
}

///|
test "hardening CDXJ response without HTTP payload falls back to WARC Content-Type" {
  let weird_resp = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "response"),
      ("WARC-Record-ID", "<urn:uuid:nonhttp-resp>"),
      ("WARC-Date", "2026-11-25T10:00:00Z"),
      ("WARC-Target-URI", "https://example.org/dns"),
      ("Content-Type", "text/dns; charset=utf-8"),
      ("Content-Length", "10"),
    ],
    b"dns-record",
  )
  match @cdxj.from_record(weird_resp) {
    Some(e) => {
      assert_eq(e.mime, Some("text/dns"))
      assert_eq(e.status, None)
    }
    None => fail("expected indexable entry")
  }
}

///|
test "hardening revisit fallback resolution ByUriAndDigest and precedence of ByRecordId" {
  let orig1 = @codec.build_response(
    record_id="<urn:uuid:orig-a>",
    date="2026-11-25T09:00:00Z",
    target_uri="https://example.org/doc",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nBodyA",
  )
  let orig2 = @codec.build_response(
    record_id="<urn:uuid:orig-b>",
    date="2026-11-25T09:05:00Z",
    target_uri="https://example.org/doc",
    b"HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nBodyA",
  )
  let rev_id = @codec.build_revisit(
    record_id="<urn:uuid:rev-by-id>",
    date="2026-11-25T09:10:00Z",
    target_uri="https://example.org/doc",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"BodyA"),
    refers_to="<urn:uuid:orig-b>",
  )
  let rev_uri = @codec.build_revisit(
    record_id="<urn:uuid:rev-by-uri>",
    date="2026-11-25T09:15:00Z",
    target_uri="https://example.org/doc",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(b"BodyA"),
  )
  let parsed = match
    @moon_warc.parse_archive(
      @moon_warc.encode_archive([orig1, orig2, rev_id, rev_uri]),
    ) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let res = @moon_warc.resolve_revisits(parsed)
  assert_eq(res.length(), 2)
  assert_eq(res[0].match_kind, @validate.ByRecordId)
  assert_eq(res[0].target_index, Some(1))
  assert_eq(res[0].target_record_id, Some("<urn:uuid:orig-b>"))
  assert_eq(res[1].match_kind, @validate.ByUriAndDigest)
  assert_eq(res[1].target_index, Some(0))
  assert_eq(res[1].target_record_id, Some("<urn:uuid:orig-a>"))
}

///|
test "hardening revisit resolves against resource record by URI and payload digest" {
  let res_body = b"\x89PNG\r\n\x1a\n\x00\x00"
  let res_base = @codec.build_resource(
    record_id="<urn:uuid:img-1>",
    date="2026-11-25T09:00:00Z",
    target_uri="https://cdn.example.org/logo.png",
    content_type="image/png",
    res_body,
  )
  let res_rec : @codec.WarcRecord = {
    header: res_base.header.with_field(
      "WARC-Payload-Digest",
      @digest.format_warc_digest_sha256(res_body),
    ),
    payload: res_base.payload,
    offset: 0L,
    record_length: 0L,
  }
  let rev = @codec.build_revisit(
    record_id="<urn:uuid:img-rev>",
    date="2026-11-25T09:30:00Z",
    target_uri="https://cdn.example.org/logo.png",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(res_body),
  )
  let parsed = match
    @moon_warc.parse_archive(@moon_warc.encode_archive([res_rec, rev])) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  assert_true(@moon_warc.validate_archive(parsed).is_valid())
  let resolved = @moon_warc.resolve_revisits(parsed)
  assert_eq(resolved.length(), 1)
  assert_eq(resolved[0].match_kind, @validate.ByUriAndDigest)
  assert_eq(resolved[0].target_index, Some(0))
}

///|
test "hardening digest cross-format SHA-1 and SHA-256 hex vs base32 equivalence" {
  let msg = b"WARC digest cross-encoding check \x00\xff"
  let sha1_hex = "sha1:" + @digest.hex_encode(@digest.sha1(msg)).to_upper()
  let sha1_b32 = @digest.format_warc_digest_sha1(msg)
  let sha256_hex = "sha256:" + @digest.hex_encode(@digest.sha256(msg))
  let sha256_b32 = @digest.format_warc_digest_sha256(msg)
  assert_eq(
    @digest.parse_warc_digest(sha1_hex),
    @digest.parse_warc_digest(sha1_b32),
  )
  assert_eq(
    @digest.parse_warc_digest(sha256_hex),
    @digest.parse_warc_digest(sha256_b32),
  )
  assert_eq(@digest.verify_warc_digest(sha1_hex, msg), Ok(true))
  assert_eq(@digest.verify_warc_digest(sha256_hex, msg), Ok(true))
}

///|
test "hardening WARC 1.0 and 1.1 fractional timestamps preserve CDXJ 14-digit truncation" {
  let r1 = hardening_build_res(
    "<urn:uuid:frac-1>", "2026-11-25T23:59:59.987654321Z", "https://example.org/frac",
  )
  let parsed = match @moon_warc.parse_archive(@moon_warc.encode_archive([r1])) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  assert_true(@moon_warc.validate_archive(parsed).is_valid())
  let idx = @moon_warc.build_cdxj_index(parsed)
  assert_eq(idx.get(0).map(e => e.timestamp), Some("20261125235959"))
}

///|
test "hardening CDXJ format_all and parse_line round-trip every entry in sample archive" {
  let raw = @moon_warc.sample_archive_bytes()
  let recs = match @moon_warc.parse_archive(raw) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  let idx = @moon_warc.build_cdxj_index(recs, filename="sample.warc")
  let entries = idx.entries()
  let text = idx.format_all()
  let lines : Array[String] = []
  for part in text.split("\n") {
    lines.push(part.to_owned())
  }
  assert_eq(lines.length(), entries.length())
  for i in 0..<lines.length() {
    assert_eq(@cdxj.parse_line(lines[i]), Ok(entries[i]))
  }
}

///|
test "hardening header case-insensitivity and multi-value concurrent-to preservation" {
  let raw_wire = b"WARC/1.1\r\nwarc-type: RESPONSE\r\nwarc-record-id: <urn:uuid:ci-1>\r\nwarc-date: 2026-11-25T12:00:00Z\r\nwarc-target-uri: https://example.org/ci\r\nwarc-concurrent-to: <urn:uuid:c1>\r\nWARC-Concurrent-To: <urn:uuid:c2>\r\ncontent-type: application/http; msgtype=response\r\ncontent-length: 19\r\n\r\nHTTP/1.1 204 OK\r\n\r\n\r\n\r\n"
  let recs = match @moon_warc.parse_archive(raw_wire) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  assert_eq(recs.length(), 1)
  assert_eq(recs[0].header.warc_type(), Some(@header.Response))
  assert_eq(recs[0].header.concurrent_to(), ["<urn:uuid:c1>", "<urn:uuid:c2>"])
  let idx = @moon_warc.build_cdxj_index(recs)
  assert_eq(idx.length(), 1)
  assert_eq(idx.get(0).bind(e => e.status), Some(204))
}

///|
test "hardening UTF-8 payload round-trip preserves exact byte length vs char length" {
  let utf8_body = b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n<p>\xe4\xb8\xad\xe6\x96\x87\xf0\x9f\x8c\x99</p>"
  let resp = @codec.build_response(
    record_id="<urn:uuid:utf8-1>",
    date="2026-11-25T12:00:00Z",
    target_uri="https://example.org/cn",
    utf8_body,
  )
  let wire = @moon_warc.encode_archive([resp])
  let parsed = match @moon_warc.parse_archive(wire) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  assert_eq(parsed[0].payload, utf8_body)
  assert_true(@moon_warc.validate_archive(parsed).is_valid())
}

///|
test "hardening encode_archive auto_digest=true updates stale Content-Length and digests" {
  let stale = @codec.make_record(
    @header.Warc1_1,
    [
      ("WARC-Type", "resource"),
      ("WARC-Record-ID", "<urn:uuid:stale-1>"),
      ("WARC-Date", "2026-11-25T12:00:00Z"),
      ("WARC-Target-URI", "https://example.org/stale"),
      ("Content-Type", "text/plain"),
      ("WARC-Block-Digest", "sha256:STALE"),
      ("Content-Length", "9999"),
    ],
    b"fresh-bytes",
  )
  let fixed_wire = @moon_warc.encode_archive([stale], auto_digest=true)
  let parsed = match @moon_warc.parse_archive(fixed_wire) {
    Ok(v) => v
    Err(_) => fail("parse failed")
  }
  assert_eq(parsed[0].header.content_length(), Some(11L))
  assert_eq(
    parsed[0].header.block_digest(),
    Some(@digest.format_warc_digest_sha256(b"fresh-bytes")),
  )
  assert_true(@moon_warc.validate_archive(parsed).is_valid())
}
