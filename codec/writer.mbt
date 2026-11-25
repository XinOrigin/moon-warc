///|
/// Constructs a `WarcRecord` with raw headers and payload (`offset` / `record_length` default to 0 until serialized).
pub fn make_record(
  version : @header.WarcVersion,
  fields : Array[(String, String)],
  payload : Bytes,
) -> WarcRecord {
  {
    header: @header.WarcHeader::new(version, fields),
    payload,
    offset: 0,
    record_length: 0,
  }
}

///|
/// Builds an ISO 28500 `warcinfo` record.
pub fn build_warcinfo(
  record_id~ : String,
  date~ : String,
  payload : Bytes,
  filename? : String,
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "warcinfo"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("Content-Type", "application/warc-fields"),
  ]
  match filename {
    Some(f) => fields.push(("WARC-Filename", f))
    None => ()
  }
  fields.push(("Content-Length", payload.length().to_string()))
  make_record(version, fields, payload)
}

///|
/// Builds an ISO 28500 `request` record (`application/http; msgtype=request`).
pub fn build_request(
  record_id~ : String,
  date~ : String,
  target_uri~ : String,
  payload : Bytes,
  concurrent_to? : String,
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "request"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("WARC-Target-URI", target_uri),
    ("Content-Type", "application/http; msgtype=request"),
  ]
  match concurrent_to {
    Some(c) => fields.push(("WARC-Concurrent-To", c))
    None => ()
  }
  fields.push(("Content-Length", payload.length().to_string()))
  make_record(version, fields, payload)
}

///|
/// Builds an ISO 28500 `response` record (`application/http; msgtype=response`).
pub fn build_response(
  record_id~ : String,
  date~ : String,
  target_uri~ : String,
  payload : Bytes,
  concurrent_to? : String,
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "response"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("WARC-Target-URI", target_uri),
    ("Content-Type", "application/http; msgtype=response"),
  ]
  match concurrent_to {
    Some(c) => fields.push(("WARC-Concurrent-To", c))
    None => ()
  }
  fields.push(("Content-Length", payload.length().to_string()))
  make_record(version, fields, payload)
}

///|
/// Builds an ISO 28500 `resource` record.
pub fn build_resource(
  record_id~ : String,
  date~ : String,
  target_uri~ : String,
  content_type~ : String,
  payload : Bytes,
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "resource"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("WARC-Target-URI", target_uri),
    ("Content-Type", content_type),
    ("Content-Length", payload.length().to_string()),
  ]
  make_record(version, fields, payload)
}

///|
/// Builds an ISO 28500 `metadata` record.
pub fn build_metadata(
  record_id~ : String,
  date~ : String,
  target_uri~ : String,
  payload : Bytes,
  concurrent_to? : String,
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "metadata"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("WARC-Target-URI", target_uri),
    ("Content-Type", "application/warc-fields"),
  ]
  match concurrent_to {
    Some(c) => fields.push(("WARC-Concurrent-To", c))
    None => ()
  }
  fields.push(("Content-Length", payload.length().to_string()))
  make_record(version, fields, payload)
}

///|
/// Builds an ISO 28500 `revisit` record for deduplicating unchanged captures.
pub fn build_revisit(
  record_id~ : String,
  date~ : String,
  target_uri~ : String,
  profile~ : String,
  payload_digest~ : String,
  refers_to? : String,
  refers_to_target_uri? : String,
  refers_to_date? : String,
  payload~ : Bytes = b"",
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "revisit"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("WARC-Target-URI", target_uri),
    ("WARC-Profile", profile),
    ("WARC-Payload-Digest", payload_digest),
  ]
  match refers_to {
    Some(r) => fields.push(("WARC-Refers-To", r))
    None => ()
  }
  match refers_to_target_uri {
    Some(u) => fields.push(("WARC-Refers-To-Target-URI", u))
    None => ()
  }
  match refers_to_date {
    Some(d) => fields.push(("WARC-Refers-To-Date", d))
    None => ()
  }
  fields.push(("Content-Type", "application/http; msgtype=response"))
  fields.push(("Content-Length", payload.length().to_string()))
  make_record(version, fields, payload)
}

///|
/// Builds an ISO 28500 `conversion` record.
pub fn build_conversion(
  record_id~ : String,
  date~ : String,
  target_uri~ : String,
  content_type~ : String,
  payload : Bytes,
  refers_to? : String,
  version~ : @header.WarcVersion = @header.Warc1_1,
) -> WarcRecord {
  let fields : Array[(String, String)] = [
    ("WARC-Type", "conversion"),
    ("WARC-Record-ID", record_id),
    ("WARC-Date", date),
    ("WARC-Target-URI", target_uri),
    ("Content-Type", content_type),
  ]
  match refers_to {
    Some(r) => fields.push(("WARC-Refers-To", r))
    None => ()
  }
  fields.push(("Content-Length", payload.length().to_string()))
  make_record(version, fields, payload)
}

///|
/// Serializes a single `WarcRecord` to ISO 28500 wire bytes.
/// When `auto_digest` is true (default), updates `Content-Length`, `WARC-Block-Digest`,
/// and (for HTTP `response` records) `WARC-Payload-Digest` using SHA-256 Base32.
pub fn encode_record(record : WarcRecord, auto_digest~ : Bool = true) -> Bytes {
  let hdr = if auto_digest {
    let mut h = record.header
      .with_field("Content-Length", record.payload.length().to_string())
      .with_field(
        "WARC-Block-Digest",
        @digest.format_warc_digest_sha256(record.payload),
      )
    match h.warc_type() {
      Some(@header.Response) =>
        match @http_payload.parse_http_response(record.payload) {
          Ok(resp) =>
            match @http_payload.extract_entity_body(resp) {
              Ok(entity) =>
                h = h.with_field(
                  "WARC-Payload-Digest",
                  @digest.format_warc_digest_sha256(entity),
                )
              Err(_) => ()
            }
          Err(_) => ()
        }
      _ => ()
    }
    h
  } else {
    record.header
  }
  let hdr_bytes = hdr.serialize()
  let out = @buffer.Buffer(
    capacity=hdr_bytes.length() + record.payload.length() + 4,
  )
  out.write_bytes(hdr_bytes)
  out.write_bytes(record.payload)
  out.write_bytes(b"\r\n\r\n")
  out.to_bytes()
}

///|
/// Serializes an array of `WarcRecord`s into a contiguous WARC archive byte stream.
pub fn encode_all(
  records : Array[WarcRecord],
  auto_digest~ : Bool = true,
) -> Bytes {
  let out = @buffer.Buffer(capacity=1024)
  for rec in records {
    out.write_bytes(encode_record(rec, auto_digest~))
  }
  out.to_bytes()
}
