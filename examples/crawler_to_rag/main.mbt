///|
fn main {
  println(
    "moon-warc v\{@warc.library_version()} Example: Crawler Capture -> .warc.gz -> WarcGzReader -> WACZ 1.1.1 -> RAG JSONL",
  )

  // 1. Capture crawled HTTP exchanges directly as linked RFC 1952 multi-member .warc.gz
  let exchange_a = @warc.record_http_exchange_gz(
    request_id="<urn:uuid:crawl-req-1>",
    response_id="<urn:uuid:crawl-resp-1>",
    metadata_id="<urn:uuid:crawl-meta-1>",
    date="2026-11-28T01:00:00Z",
    target_uri="https://docs.example.org/moonbit/warc.html",
    request_bytes=b"GET /moonbit/warc.html HTTP/1.1\r\nHost: docs.example.org\r\n\r\n",
    response_bytes=b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nTransfer-Encoding: chunked\r\n\r\n26\r\n<html><body>MoonBit WARC</body></html>\r\n0\r\n\r\n",
    metadata_bytes=b"fetchTimeMs: 14\r\ncrawler: example-bot/1.0\r\n",
  )
  let exchange_b = @warc.record_http_exchange_gz(
    request_id="<urn:uuid:crawl-req-2>",
    response_id="<urn:uuid:crawl-resp-2>",
    date="2026-11-28T01:05:00Z",
    target_uri="https://docs.example.org/moonbit/warc.html",
    request_bytes=b"GET /moonbit/warc.html HTTP/1.1\r\nHost: docs.example.org\r\n\r\n",
    response_bytes=b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n<html><body>MoonBit WARC v2</body></html>",
  )
  let archive_gz = exchange_a + exchange_b

  // 2. Stream chunk-by-chunk (19B chunks) via Sans-IO WarcGzReader
  let gz_reader = @warc.new_gz_reader()
  let records = []
  let mut pos = 0
  while pos < archive_gz.length() {
    let end = if pos + 19 > archive_gz.length() {
      archive_gz.length()
    } else {
      pos + 19
    }
    gz_reader.feed(archive_gz[pos:end])
    while true {
      match gz_reader.next_record() {
        Ok(Some(r)) => records.push(r)
        Ok(None) => break
        Err(e) => {
          println("Stream decode error: \{Debug::to_repr(e).to_string()}")
          return
        }
      }
    }
    pos = end
  }
  ignore(gz_reader.finish().unwrap())

  // 3. Validate ISO 28500 conformance & generate WACZ 1.1.1 package manifests
  let report = @warc.validate_archive(records)
  let wacz = @warc.build_wacz_manifests(
    records,
    archive_gz,
    warc_filename="crawl-session.warc.gz",
    title="MoonBit Crawl Session",
    main_page_url="https://docs.example.org/moonbit/warc.html",
    main_page_date="2026-11-28T01:05:00Z",
  )
  let cdx = @warc.build_cdxj_index(records, filename="crawl-session.warc.gz")
  let closest = cdx.lookup_closest(
    "https://docs.example.org/moonbit/warc.html", "20261128010400",
  )

  // 4. Filter clean HTTP 200 captures & export UTF-8 LLM RAG JSONL
  let docs_only = @warc.filter_records(
    records,
    @pipeline.ArchiveFilter::new(
      surt_prefix="org,example,docs)",
      status_min=200,
      status_max=200,
    ),
  )
  let jsonl = @warc.export_jsonl(docs_only)

  println(
    "Captured: bytes=\{archive_gz.length().to_string()} records=\{records.length().to_string()} valid=\{report.is_valid().to_string()} errors=\{report.error_count.to_string()}",
  )
  println(
    "WACZ 1.1.1 datapackage bytes=\{wacz.datapackage_json.length().to_string()} cdxj_entries=\{cdx.length().to_string()}",
  )
  println("WACZ digest: \{wacz.datapackage_digest_json}")
  match closest {
    Some(hit) =>
      println(
        "Closest hit @20261128010400: ts=\{hit.timestamp} offset=\{hit.offset.to_string()} length=\{hit.length.to_string()}",
      )
    None => println("Closest hit: none")
  }
  println("RAG JSONL lines: \{docs_only.length().to_string()}")
  println(jsonl)
}
