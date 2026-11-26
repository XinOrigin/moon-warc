///|
/// Returns the library version string.
pub fn library_version() -> String {
  "0.2.1"
}

///|
/// Creates a fresh incremental Sans-IO `WarcReader` for streaming WARC 1.0/1.1 archives.
pub fn new_reader(
  limits~ : @codec.ReaderLimits = @codec.ReaderLimits::default(),
) -> @codec.WarcReader {
  @codec.WarcReader::new(limits~)
}

///|
/// Parses a complete ISO 28500 WARC 1.0/1.1 byte stream into records.
pub fn parse_archive(
  raw : BytesView,
  limits~ : @codec.ReaderLimits = @codec.ReaderLimits::default(),
) -> Result[Array[@codec.WarcRecord], @codec.CodecError] {
  @codec.parse_all(raw, limits~)
}

///|
/// Streams a WARC 1.0/1.1 byte stream record-by-record via `on_record` without buffering
/// all decoded records in an `Array`, returning the count of records processed.
pub fn scan_archive(
  raw : BytesView,
  limits~ : @codec.ReaderLimits = @codec.ReaderLimits::default(),
  on_record : (@codec.WarcRecord) -> Unit,
) -> Result[Int64, @codec.CodecError] {
  @codec.scan_all(raw, limits~, on_record)
}

///|
/// Encodes an array of WARC records back into wire-format bytes.
/// When `auto_digest` is true (default), recomputes `Content-Length`,
/// `WARC-Block-Digest`, and HTTP response `WARC-Payload-Digest`.
pub fn encode_archive(
  records : Array[@codec.WarcRecord],
  auto_digest~ : Bool = true,
) -> Bytes {
  @codec.encode_all(records, auto_digest~)
}

///|
/// Encodes a single `WarcRecord` into one RFC 1952 `.warc.gz` member.
pub fn encode_record_gz(
  record : @codec.WarcRecord,
  auto_digest~ : Bool = true,
  level~ : Int32 = 6,
) -> Bytes {
  @codec.encode_record_gz(record, auto_digest~, level~)
}

///|
/// Encodes `records` into an RFC 1952 multi-member `.warc.gz` stream (one member per record).
pub fn encode_archive_gz(
  records : Array[@codec.WarcRecord],
  auto_digest~ : Bool = true,
  level~ : Int32 = 6,
) -> Bytes {
  @codec.encode_all_gz(records, auto_digest~, level~)
}

///|
/// Parses a single- or multi-member RFC 1952 `.warc.gz` byte stream into `WarcRecord`s,
/// preserving exact compressed member `(offset, record_length)` values for CDX/CDXJ indexing.
pub fn parse_archive_gz(
  raw : BytesView,
  limits~ : @codec.ReaderLimits = @codec.ReaderLimits::default(),
) -> Result[Array[@codec.WarcRecord], @codec.CodecError] {
  @codec.parse_all_gz(raw, limits~)
}

///|
/// Builds a lexicographically sorted CDXJ archival index from WARC records.
pub fn build_cdxj_index(
  records : Array[@codec.WarcRecord],
  filename~ : String = "archive.warc",
) -> @cdxj.CdxjIndex {
  @cdxj.CdxjIndex::build(records, filename~)
}

///|
/// Validates WARC records against ISO 28500 conformance rules and SHA-1/SHA-256 digests.
pub fn validate_archive(
  records : Array[@codec.WarcRecord],
) -> @validate.ValidationReport {
  @validate.validate_archive(records)
}

///|
/// Resolves `revisit` records back to their original captured payload records.
pub fn resolve_revisits(
  records : Array[@codec.WarcRecord],
) -> Array[@validate.ResolvedRevisit] {
  @validate.resolve_revisits(records)
}

///|
/// Splits an oversized WARC record into ISO 28500 §9 origin + `continuation` segments.
pub fn segment_record(
  record : @codec.WarcRecord,
  max_segment_bytes~ : Int32,
) -> Result[Array[@codec.WarcRecord], @pipeline.PipelineError] {
  @pipeline.segment_record(record, max_segment_bytes~)
}

///|
/// Reassembles ISO 28500 §9 segmented WARC records and verifies total lengths and digests.
pub fn reassemble_segments(
  records : Array[@codec.WarcRecord],
) -> Result[Array[@codec.WarcRecord], @pipeline.PipelineError] {
  @pipeline.reassemble_segments(records)
}

///|
/// Filters WARC records matching `filter` predicates.
pub fn filter_records(
  records : Array[@codec.WarcRecord],
  filter : @pipeline.ArchiveFilter,
  include_warcinfo~ : Bool = false,
) -> Array[@codec.WarcRecord] {
  @pipeline.filter_records(records, filter, include_warcinfo~)
}

///|
/// Extracts matching WARC records (preserving `warcinfo` by default) into a re-encoded WARC byte stream.
pub fn extract_subset(
  records : Array[@codec.WarcRecord],
  filter : @pipeline.ArchiveFilter,
  include_warcinfo~ : Bool = true,
) -> Bytes {
  @pipeline.extract_subset(records, filter, include_warcinfo~)
}

///|
/// Exports WARC archival entries in lexicographically sorted 11-column CDX format.
pub fn export_cdx11(
  records : Array[@codec.WarcRecord],
  filename~ : String = "archive.warc",
  include_header~ : Bool = true,
) -> String {
  @pipeline.export_cdx11(records, filename~, include_header~)
}

///|
/// Exports WARC records as RFC 8259 JSON Lines (JSONL) with optional UTF-8 body text extraction.
pub fn export_jsonl(
  records : Array[@codec.WarcRecord],
  options~ : @pipeline.JsonlOptions = @pipeline.JsonlOptions::default(),
) -> String {
  @pipeline.export_jsonl(records, options~)
}

///|
/// Generates a realistic multi-record ISO 28500 WARC/1.1 sample archive containing
/// `warcinfo`, `request`, chunked HTTP `response`, `metadata`, `resource`, and `revisit`
/// records encoded with SHA-256 block and payload digests.
pub fn sample_archive_bytes() -> Bytes {
  let warcinfo_rec = @codec.build_warcinfo(
    record_id="<urn:uuid:00000000-0000-4000-8000-000000000001>",
    date="2026-11-25T12:00:00Z",
    filename="sample-crawl-2026.warc",
    version=@header.Warc1_1,
    b"software: moon-warc/0.2.1\r\nformat: WARC File Format 1.1\r\nconformsTo: https://iipc.github.io/warc-specifications/specifications/warc-format/warc-1.1/\r\n",
  )
  let req_rec = @codec.build_request(
    record_id="<urn:uuid:00000000-0000-4000-8000-000000000002>",
    date="2026-11-25T12:00:01Z",
    target_uri="https://example.org/index.html",
    concurrent_to="<urn:uuid:00000000-0000-4000-8000-000000000003>",
    version=@header.Warc1_1,
    b"GET /index.html HTTP/1.1\r\nHost: example.org\r\nUser-Agent: moon-warc/0.2.1\r\nAccept: text/html\r\n\r\n",
  )
  let html_entity = b"<!doctype html><html><body><h1>Hello WARC</h1></body></html>\n"
  let resp_payload = b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nTransfer-Encoding: chunked\r\n\r\nf\r\n<!doctype html>\r\n2e\r\n<html><body><h1>Hello WARC</h1></body></html>\n\r\n0\r\n\r\n"
  let resp_rec = @codec.build_response(
    record_id="<urn:uuid:00000000-0000-4000-8000-000000000003>",
    date="2026-11-25T12:00:01Z",
    target_uri="https://example.org/index.html",
    concurrent_to="<urn:uuid:00000000-0000-4000-8000-000000000002>",
    version=@header.Warc1_1,
    resp_payload,
  )
  let meta_rec = @codec.build_metadata(
    record_id="<urn:uuid:00000000-0000-4000-8000-000000000004>",
    date="2026-11-25T12:00:01Z",
    target_uri="https://example.org/index.html",
    concurrent_to="<urn:uuid:00000000-0000-4000-8000-000000000003>",
    version=@header.Warc1_1,
    b"fetchTimeMs: 42\r\nvia: https://example.org/\r\nhopsFromSeed: L\r\n",
  )
  let resource_payload = b"{\"status\":\"ok\",\"version\":1}\n"
  let resource_base = @codec.build_resource(
    record_id="<urn:uuid:00000000-0000-4000-8000-000000000005>",
    date="2026-11-25T12:00:05Z",
    target_uri="https://cdn.example.org/app.json",
    content_type="application/json",
    version=@header.Warc1_1,
    resource_payload,
  )
  let resource_rec : @codec.WarcRecord = {
    header: resource_base.header.with_field(
      "WARC-Payload-Digest",
      @digest.format_warc_digest_sha256(resource_payload),
    ),
    payload: resource_base.payload,
    offset: resource_base.offset,
    record_length: resource_base.record_length,
  }
  let revisit_rec = @codec.build_revisit(
    record_id="<urn:uuid:00000000-0000-4000-8000-000000000006>",
    date="2026-11-25T12:15:00Z",
    target_uri="https://example.org/index.html",
    profile="http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    payload_digest=@digest.format_warc_digest_sha256(html_entity),
    refers_to="<urn:uuid:00000000-0000-4000-8000-000000000003>",
    refers_to_target_uri="https://example.org/index.html",
    refers_to_date="2026-11-25T12:00:01Z",
    version=@header.Warc1_1,
  )
  @codec.encode_all([
    warcinfo_rec, req_rec, resp_rec, meta_rec, resource_rec, revisit_rec,
  ])
}
