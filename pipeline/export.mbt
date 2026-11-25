///|
/// Options controlling JSONL export and textual body extraction.
#derive(Eq, Debug)
pub(all) struct JsonlOptions {
  include_body_text : Bool
  max_body_chars : Int32
}

///|
/// Default JSONL export options (`include_body_text: true`, `max_body_chars: 4096`).
pub fn JsonlOptions::default() -> JsonlOptions {
  { include_body_text: true, max_body_chars: 4096, }
}

///|
fn sanitize_cdx_field(s : String) -> String {
  if s.is_empty() {
    return "-"
  }
  let sb = StringBuilder()
  for ch in s {
    if ch == ' ' {
      sb.write_string("%20")
    } else if ch == '\t' {
      sb.write_string("%09")
    } else if ch == '\r' {
      sb.write_string("%0D")
    } else if ch == '\n' {
      sb.write_string("%0A")
    } else {
      sb.write_char(ch)
    }
  }
  sb.to_string()
}

///|
/// Exports records in classic 11-column space-delimited CDX format
/// (`N b a m s k r M S V g`: SURT, timestamp, URL, MIME, status, digest, redirect, -, length, offset, filename),
/// sorted lexicographically identically to `CdxjIndex`.
pub fn export_cdx11(
  records : Array[@codec.WarcRecord],
  filename~ : String = "archive.warc",
  include_header~ : Bool = true,
) -> String {
  let redirects : Map[String, String] = Map([])
  for rec in records {
    if rec.header.warc_type() == Some(@header.Response) {
      match @http_payload.parse_http_response(rec.payload) {
        Ok(resp) =>
          match resp.location() {
            Some(loc) =>
              match @cdxj.from_record(rec, filename~) {
                Some(entry) => redirects[@cdxj.format_line(entry)] = loc
                None => ()
              }
            None => ()
          }
        Err(_) => ()
      }
    }
  }
  let index = @cdxj.CdxjIndex::build(records, filename~)
  let lines : Array[String] = []
  if include_header {
    lines.push(" CDX N b a m s k r M S V g")
  }
  for e in index.entries {
    let surt_s = sanitize_cdx_field(e.surt)
    let url_s = sanitize_cdx_field(e.url)
    let mime_s = sanitize_cdx_field(e.mime.unwrap_or("-"))
    let status_s = match e.status {
      Some(st) => st.to_string()
      None => "-"
    }
    let digest_s = sanitize_cdx_field(e.digest.unwrap_or("-"))
    let redirect_s = match redirects.get(@cdxj.format_line(e)) {
      Some(loc) => sanitize_cdx_field(loc)
      None => "-"
    }
    let file_s = sanitize_cdx_field(e.filename)
    let row = [
      surt_s,
      e.timestamp,
      url_s,
      mime_s,
      status_s,
      digest_s,
      redirect_s,
      "-",
      e.length.to_string(),
      e.offset.to_string(),
      file_s,
    ]
    lines.push(row.join(" "))
  }
  lines.join("\n")
}

///|
fn hex_nibble(n : Int32) -> Char {
  let v = n & 0x0f
  if v < 10 {
    (48 + v).to_char().unwrap()
  } else {
    (97 + v - 10).to_char().unwrap()
  }
}

///|
fn write_json_escaped(sb : StringBuilder, s : String) -> Unit {
  sb.write_char('"')
  for ch in s {
    let code = ch.to_int()
    if ch == '"' {
      sb.write_string("\\\"")
    } else if ch == '\\' {
      sb.write_string("\\\\")
    } else if code == 8 {
      sb.write_string("\\b")
    } else if code == 12 {
      sb.write_string("\\f")
    } else if code == 10 {
      sb.write_string("\\n")
    } else if code == 13 {
      sb.write_string("\\r")
    } else if code == 9 {
      sb.write_string("\\t")
    } else if code >= 0 && code < 32 {
      sb.write_string("\\u00")
      sb.write_char(hex_nibble((code >> 4) & 0x0f))
      sb.write_char(hex_nibble(code & 0x0f))
    } else {
      sb.write_char(ch)
    }
  }
  sb.write_char('"')
}

///|
fn write_json_str_field(
  sb : StringBuilder,
  first : Bool,
  key : String,
  val : String,
) -> Bool {
  if !first {
    sb.write_char(',')
  }
  write_json_escaped(sb, key)
  sb.write_char(':')
  write_json_escaped(sb, val)
  false
}

///|
fn write_json_int_field(
  sb : StringBuilder,
  first : Bool,
  key : String,
  val : Int32,
) -> Bool {
  if !first {
    sb.write_char(',')
  }
  write_json_escaped(sb, key)
  sb.write_char(':')
  sb.write_string(val.to_string())
  false
}

///|
fn is_textual_mime(mime : String) -> Bool {
  mime.has_prefix("text/") ||
  mime == "application/json" ||
  mime == "application/xml" ||
  mime == "application/warc-fields" ||
  mime == "application/xhtml+xml" ||
  mime.has_suffix("+json") ||
  mime.has_suffix("+xml")
}

///|
fn try_decode_utf8(raw : BytesView) -> String? {
  let decoded = @utf8.decode(raw) catch { _ => return None }
  Some(decoded)
}

///|
fn truncate_chars(s : String, max_chars : Int32) -> String {
  if max_chars <= 0 {
    return ""
  }
  let sb = StringBuilder()
  let mut count = 0
  for ch in s {
    if count >= max_chars {
      break
    }
    sb.write_char(ch)
    count = count + 1
  }
  sb.to_string()
}

///|
fn extract_body_text(
  rec : @codec.WarcRecord,
  mime_opt : String?,
  max_chars : Int32,
) -> String? {
  if max_chars <= 0 {
    return None
  }
  let mime = match mime_opt {
    Some(m) => m
    None => return None
  }
  if !is_textual_mime(mime) {
    return None
  }
  let body_bytes = match rec.header.warc_type() {
    Some(@header.Response) =>
      match @http_payload.parse_http_response(rec.payload) {
        Ok(resp) =>
          match @http_payload.extract_entity_body(resp) {
            Ok(ent) => ent
            Err(_) => return None
          }
        Err(_) => return None
      }
    _ => rec.payload
  }
  match try_decode_utf8(body_bytes) {
    Some(text) => Some(truncate_chars(text, max_chars))
    None => None
  }
}

///|
/// Exports WARC records as newline-delimited RFC 8259 JSON Lines (JSONL),
/// including structured headers, optional SURT/status/MIME/digests, and decoded UTF-8 body text
/// for archival search and LLM corpus pipelines.
pub fn export_jsonl(
  records : Array[@codec.WarcRecord],
  options~ : JsonlOptions = JsonlOptions::default(),
) -> String {
  let lines : Array[String] = []
  for rec in records {
    let hdr = rec.header
    let mut first = true
    let sb = StringBuilder()
    sb.write_char('{')
    first = write_json_str_field(
      sb,
      first,
      "record_id",
      hdr.record_id().unwrap_or(""),
    )
    let wt_str = match hdr.warc_type() {
      Some(wt) => wt.to_wire_string()
      None => ""
    }
    first = write_json_str_field(sb, first, "warc_type", wt_str)
    first = write_json_str_field(
      sb,
      first,
      "date",
      hdr.warc_date().unwrap_or(""),
    )
    first = write_json_int_field(sb, first, "offset", rec.offset)
    first = write_json_int_field(sb, first, "length", rec.record_length)
    first = write_json_int_field(
      sb,
      first,
      "payload_length",
      rec.payload.length(),
    )
    match hdr.target_uri() {
      Some(u) => {
        first = write_json_str_field(sb, first, "target_uri", u)
        match @surt.to_surt(u) {
          Ok(s) => first = write_json_str_field(sb, first, "surt", s)
          Err(_) => ()
        }
      }
      None => ()
    }
    let (mime_opt, status_opt) = extract_mime_and_status(rec)
    match mime_opt {
      Some(m) => first = write_json_str_field(sb, first, "mime", m)
      None => ()
    }
    match status_opt {
      Some(st) => first = write_json_int_field(sb, first, "status", st)
      None => ()
    }
    match hdr.block_digest() {
      Some(bd) => first = write_json_str_field(sb, first, "block_digest", bd)
      None => ()
    }
    match hdr.payload_digest() {
      Some(pd) => first = write_json_str_field(sb, first, "payload_digest", pd)
      None => ()
    }
    if options.include_body_text {
      match extract_body_text(rec, mime_opt, options.max_body_chars) {
        Some(text) => first = write_json_str_field(sb, first, "text", text)
        None => ()
      }
    }
    ignore(first)
    sb.write_char('}')
    lines.push(sb.to_string())
  }
  lines.join("\n")
}
