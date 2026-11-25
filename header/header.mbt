///|
/// Supported ISO 28500 WARC format versions.
#derive(Eq, Debug)
pub(all) enum WarcVersion {
  Warc1_0
  Warc1_1
}

///|
/// Converts a `WarcVersion` into its wire-format line (`WARC/1.0` or `WARC/1.1`).
pub fn WarcVersion::to_wire_string(self : WarcVersion) -> String {
  match self {
    Warc1_0 => "WARC/1.0"
    Warc1_1 => "WARC/1.1"
  }
}

///|
/// Parses a WARC version line (`WARC/1.0` or `WARC/1.1`).
pub fn WarcVersion::parse(
  line : StringView,
) -> Result[WarcVersion, HeaderError] {
  let s = line.trim().to_owned()
  if s == "WARC/1.0" {
    Ok(Warc1_0)
  } else if s == "WARC/1.1" {
    Ok(Warc1_1)
  } else {
    Err(InvalidVersion(s))
  }
}

///|
/// ISO 28500 record types plus extensibility for custom types.
#derive(Eq, Debug)
pub(all) enum WarcType {
  WarcInfo
  Response
  Resource
  Request
  Metadata
  Revisit
  Conversion
  Continuation
  Extension(String)
}

///|
/// Converts a `WarcType` to its canonical lowercase header value.
pub fn WarcType::to_wire_string(self : WarcType) -> String {
  match self {
    WarcInfo => "warcinfo"
    Response => "response"
    Resource => "resource"
    Request => "request"
    Metadata => "metadata"
    Revisit => "revisit"
    Conversion => "conversion"
    Continuation => "continuation"
    Extension(name) => name
  }
}

///|
/// Parses a `WARC-Type` value (case-insensitive for standard ISO 28500 types).
pub fn WarcType::parse(val : StringView) -> WarcType {
  let lower = val.trim().to_owned().to_lower()
  if lower == "warcinfo" {
    WarcInfo
  } else if lower == "response" {
    Response
  } else if lower == "resource" {
    Resource
  } else if lower == "request" {
    Request
  } else if lower == "metadata" {
    Metadata
  } else if lower == "revisit" {
    Revisit
  } else if lower == "conversion" {
    Conversion
  } else if lower == "continuation" {
    Continuation
  } else {
    Extension(val.trim().to_owned())
  }
}

///|
/// Parsed ISO 28500 WARC record header block.
#derive(Eq, Debug)
pub(all) struct WarcHeader {
  version : WarcVersion
  fields : Array[(String, String)]
}

///|
/// Constructs a `WarcHeader` from version and field pairs.
pub fn WarcHeader::new(
  version : WarcVersion,
  fields : Array[(String, String)],
) -> WarcHeader {
  { version, fields, }
}

///|
/// Parses a raw WARC header block (without the terminating `\r\n\r\n` separator).
/// Supports folded continuation lines starting with space or tab.
pub fn WarcHeader::parse(raw : BytesView) -> Result[WarcHeader, HeaderError] {
  let text = @utf8.decode_lossy(raw)
  let raw_lines : Array[String] = []
  for part in text.split("\n") {
    let line = match part.strip_suffix("\r") {
      Some(s) => s.to_owned()
      None => part.to_owned()
    }
    raw_lines.push(line)
  }
  if raw_lines.is_empty() || raw_lines[0].is_empty() {
    return Err(InvalidVersion("empty WARC header"))
  }
  let version = match WarcVersion::parse(raw_lines[0]) {
    Ok(v) => v
    Err(e) => return Err(e)
  }
  let fields : Array[(String, String)] = []
  for i in 1..<raw_lines.length() {
    let line = raw_lines[i]
    if line.is_empty() {
      continue
    }
    let first_ch = line[0].to_int()
    if first_ch == 32 || first_ch == 9 {
      if fields.is_empty() {
        return Err(InvalidHeaderLine(line))
      }
      let last_idx = fields.length() - 1
      let (k, v) = fields[last_idx]
      let cont = line.trim().to_owned()
      let merged = if v.is_empty() {
        cont
      } else if cont.is_empty() {
        v
      } else {
        v + " " + cont
      }
      fields[last_idx] = (k, merged)
    } else {
      match line.split_once(":") {
        None => return Err(InvalidHeaderLine(line))
        Some((k, v)) => {
          let name = k.trim().to_owned()
          if name.is_empty() {
            return Err(InvalidHeaderLine(line))
          }
          fields.push((name, v.trim().to_owned()))
        }
      }
    }
  }
  Ok({ version, fields, })
}

///|
/// Looks up the first value of header `name` (case-insensitive).
pub fn WarcHeader::get(self : WarcHeader, name : StringView) -> String? {
  let target = name.to_owned().to_lower()
  for pair in self.fields {
    if pair.0.to_lower() == target {
      return Some(pair.1)
    }
  }
  None
}

///|
/// Returns all values of header `name` (case-insensitive), preserving order.
pub fn WarcHeader::get_all(
  self : WarcHeader,
  name : StringView,
) -> Array[String] {
  let target = name.to_owned().to_lower()
  let out : Array[String] = []
  for pair in self.fields {
    if pair.0.to_lower() == target {
      out.push(pair.1)
    }
  }
  out
}

///|
/// Returns a new `WarcHeader` with `name` updated in-place if present or appended otherwise.
pub fn WarcHeader::with_field(
  self : WarcHeader,
  name : String,
  value : String,
) -> WarcHeader {
  let target = name.to_lower()
  let next : Array[(String, String)] = []
  let mut replaced = false
  for pair in self.fields {
    if !replaced && pair.0.to_lower() == target {
      next.push((pair.0, value))
      replaced = true
    } else {
      next.push(pair)
    }
  }
  if !replaced {
    next.push((name, value))
  }
  { version: self.version, fields: next, }
}

///|
/// Returns a new `WarcHeader` without any field matching `name` (case-insensitive).
pub fn WarcHeader::without_field(
  self : WarcHeader,
  name : StringView,
) -> WarcHeader {
  let target = name.to_owned().to_lower()
  let next : Array[(String, String)] = []
  for pair in self.fields {
    if pair.0.to_lower() != target {
      next.push(pair)
    }
  }
  { version: self.version, fields: next, }
}

///|
/// Parses a strict non-negative base-10 integer string with overflow guard.
fn parse_nonneg_int(raw : String) -> Int32? {
  let s = raw.trim().to_owned()
  if s.is_empty() {
    return None
  }
  let mut acc = 0
  for i in 0..<s.length() {
    let c = s[i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    if acc > 200000000 {
      return None
    }
    acc = acc * 10 + (c - 48)
  }
  Some(acc)
}

///|
/// Returns the parsed `WARC-Type` if present.
pub fn WarcHeader::warc_type(self : WarcHeader) -> WarcType? {
  match self.get("WARC-Type") {
    Some(v) => Some(WarcType::parse(v))
    None => None
  }
}

///|
/// Returns the `WARC-Record-ID` header value if present.
pub fn WarcHeader::record_id(self : WarcHeader) -> String? {
  self.get("WARC-Record-ID")
}

///|
/// Returns the raw `WARC-Date` header value if present.
pub fn WarcHeader::warc_date(self : WarcHeader) -> String? {
  self.get("WARC-Date")
}

///|
/// Parses `Content-Length` strictly as a non-negative integer.
pub fn WarcHeader::parse_content_length(
  self : WarcHeader,
) -> Result[Int32, HeaderError] {
  match self.get("Content-Length") {
    None => Err(MissingRequiredHeader("Content-Length"))
    Some(raw) =>
      match parse_nonneg_int(raw) {
        Some(n) => Ok(n)
        None => Err(InvalidContentLength(raw))
      }
  }
}

///|
/// Returns the parsed `Content-Length` if present and valid.
pub fn WarcHeader::content_length(self : WarcHeader) -> Int32? {
  match self.parse_content_length() {
    Ok(n) => Some(n)
    Err(_) => None
  }
}

///|
/// Returns `WARC-Target-URI` if present.
pub fn WarcHeader::target_uri(self : WarcHeader) -> String? {
  self.get("WARC-Target-URI")
}

///|
/// Returns `Content-Type` if present.
pub fn WarcHeader::content_type(self : WarcHeader) -> String? {
  self.get("Content-Type")
}

///|
/// Returns `WARC-Block-Digest` if present.
pub fn WarcHeader::block_digest(self : WarcHeader) -> String? {
  self.get("WARC-Block-Digest")
}

///|
/// Returns `WARC-Payload-Digest` if present.
pub fn WarcHeader::payload_digest(self : WarcHeader) -> String? {
  self.get("WARC-Payload-Digest")
}

///|
/// Returns `WARC-Refers-To` if present.
pub fn WarcHeader::refers_to(self : WarcHeader) -> String? {
  self.get("WARC-Refers-To")
}

///|
/// Returns all `WARC-Concurrent-To` values.
pub fn WarcHeader::concurrent_to(self : WarcHeader) -> Array[String] {
  self.get_all("WARC-Concurrent-To")
}

///|
/// Returns `WARC-Profile` if present.
pub fn WarcHeader::profile(self : WarcHeader) -> String? {
  self.get("WARC-Profile")
}

///|
/// Returns `WARC-Truncated` if present.
pub fn WarcHeader::truncated(self : WarcHeader) -> String? {
  self.get("WARC-Truncated")
}

///|
/// Returns `WARC-Identified-Payload-Type` if present.
pub fn WarcHeader::identified_payload_type(self : WarcHeader) -> String? {
  self.get("WARC-Identified-Payload-Type")
}

///|
/// Returns parsed `WARC-Segment-Number` if present and valid (non-negative integer).
pub fn WarcHeader::segment_number(self : WarcHeader) -> Int32? {
  match self.get("WARC-Segment-Number") {
    Some(raw) => parse_nonneg_int(raw)
    None => None
  }
}

///|
/// Returns `WARC-Segment-Origin-ID` if present.
pub fn WarcHeader::segment_origin_id(self : WarcHeader) -> String? {
  self.get("WARC-Segment-Origin-ID")
}

///|
/// Returns parsed `WARC-Segment-Total-Length` if present and valid (non-negative integer).
pub fn WarcHeader::segment_total_length(self : WarcHeader) -> Int32? {
  match self.get("WARC-Segment-Total-Length") {
    Some(raw) => parse_nonneg_int(raw)
    None => None
  }
}

///|
/// Serializes the WARC header block including its terminating blank line (`\r\n\r\n`).
pub fn WarcHeader::serialize(self : WarcHeader) -> Bytes {
  let sb = StringBuilder()
  sb.write_string(self.version.to_wire_string())
  sb.write_string("\r\n")
  for pair in self.fields {
    sb.write_string(pair.0)
    sb.write_string(": ")
    sb.write_string(pair.1)
    sb.write_string("\r\n")
  }
  sb.write_string("\r\n")
  let buf = @buffer.Buffer(capacity=sb.to_string().length() * 2)
  buf.write_string_utf8(sb.to_string())
  buf.to_bytes()
}
