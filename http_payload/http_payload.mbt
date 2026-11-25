///|
/// Errors returned when parsing HTTP/1.x payloads or decoding chunked bodies.
#derive(Eq, Debug)
pub(all) enum HttpError {
  MissingHeaderTerminator
  InvalidStartLine(String)
  InvalidHeaderLine(String)
  InvalidChunkSize(String)
  TruncatedChunkBody
  MissingChunkCrlf
}

///|
/// Parsed HTTP/1.x response captured inside a WARC `response` record.
#derive(Eq, Debug)
pub struct HttpResponse {
  version : String
  status_code : Int32
  reason : String
  headers : Array[(String, String)]
  body : Bytes
}

///|
/// Parsed HTTP/1.x request captured inside a WARC `request` record.
#derive(Eq, Debug)
pub struct HttpRequest {
  method_name : String
  target : String
  version : String
  headers : Array[(String, String)]
  body : Bytes
}

///|
fn find_header_split(raw : BytesView) -> (Int32, Int32)? {
  match raw.find(b"\r\n\r\n") {
    Some(idx) => Some((idx, idx + 4))
    None =>
      match raw.find(b"\n\n") {
        Some(idx) => Some((idx, idx + 2))
        None => None
      }
  }
}

///|
fn parse_ascii_int(s : String) -> Int32? {
  if s.is_empty() {
    return None
  }
  let mut acc = 0
  for i in 0..<s.length() {
    let c = s[i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    acc = acc * 10 + (c - 48)
    if acc > 999999 {
      return None
    }
  }
  Some(acc)
}

///|
fn parse_header_lines(
  lines : Array[String],
) -> Result[Array[(String, String)], HttpError] {
  let out : Array[(String, String)] = []
  for i in 1..<lines.length() {
    let line = lines[i]
    if line.is_empty() {
      continue
    }
    match line.split_once(":") {
      None => return Err(InvalidHeaderLine(line))
      Some((k, v)) => {
        let name = k.trim().to_owned()
        if name.is_empty() {
          return Err(InvalidHeaderLine(line))
        }
        out.push((name, v.trim().to_owned()))
      }
    }
  }
  Ok(out)
}

///|
fn split_header_lines(header_bytes : BytesView) -> Array[String] {
  let header_str = @utf8.decode_lossy(header_bytes)
  let lines : Array[String] = []
  for line_v in header_str.split("\n") {
    let clean = match line_v.strip_suffix("\r") {
      Some(stripped) => stripped.to_owned()
      None => line_v.to_owned()
    }
    lines.push(clean)
  }
  lines
}

///|
/// Performs a case-insensitive header lookup on HTTP headers.
pub fn header_value(
  headers : Array[(String, String)],
  name : StringView,
) -> String? {
  let target = name.to_owned().to_lower()
  for pair in headers {
    if pair.0.to_lower() == target {
      return Some(pair.1)
    }
  }
  None
}

///|
/// Parses a raw HTTP/1.x response (`status line + headers + binary body`).
pub fn parse_http_response(raw : BytesView) -> Result[HttpResponse, HttpError] {
  let (header_end, body_start) = match find_header_split(raw) {
    Some(pair) => pair
    None => return Err(MissingHeaderTerminator)
  }
  let lines = split_header_lines(raw[0:header_end])
  if lines.is_empty() || lines[0].is_empty() {
    return Err(InvalidStartLine("empty response start line"))
  }
  let start = lines[0]
  let (version, rest1) = match start.split_once(" ") {
    Some((v, r)) => (v.to_owned(), r.trim_start().to_owned())
    None => return Err(InvalidStartLine(start))
  }
  if !version.has_prefix("HTTP/") {
    return Err(InvalidStartLine(start))
  }
  let (code_str, reason) = match rest1.split_once(" ") {
    Some((c, r)) => (c.to_owned(), r.trim().to_owned())
    None => (rest1, "")
  }
  let status_code = match parse_ascii_int(code_str) {
    Some(c) =>
      if c >= 100 && c <= 599 {
        c
      } else {
        return Err(InvalidStartLine(start))
      }
    None => return Err(InvalidStartLine(start))
  }
  let headers = match parse_header_lines(lines) {
    Ok(h) => h
    Err(e) => return Err(e)
  }
  let body = raw[body_start:raw.length()].to_owned()
  Ok({ version, status_code, reason, headers, body, })
}

///|
/// Parses a raw HTTP/1.x request (`request line + headers + binary body`).
pub fn parse_http_request(raw : BytesView) -> Result[HttpRequest, HttpError] {
  let (header_end, body_start) = match find_header_split(raw) {
    Some(pair) => pair
    None => return Err(MissingHeaderTerminator)
  }
  let lines = split_header_lines(raw[0:header_end])
  if lines.is_empty() || lines[0].is_empty() {
    return Err(InvalidStartLine("empty request start line"))
  }
  let start = lines[0]
  let (method_name, rest1) = match start.split_once(" ") {
    Some((m, r)) => (m.to_owned(), r.trim_start().to_owned())
    None => return Err(InvalidStartLine(start))
  }
  let (target, version) = match rest1.split_once(" ") {
    Some((t, v)) => (t.to_owned(), v.trim().to_owned())
    None => return Err(InvalidStartLine(start))
  }
  if method_name.is_empty() || target.is_empty() || !version.has_prefix("HTTP/") {
    return Err(InvalidStartLine(start))
  }
  let headers = match parse_header_lines(lines) {
    Ok(h) => h
    Err(e) => return Err(e)
  }
  let body = raw[body_start:raw.length()].to_owned()
  Ok({ method_name, target, version, headers, body, })
}

///|
/// Returns the MIME media type from `Content-Type` without parameters (e.g. `text/html`).
pub fn HttpResponse::content_type_mime(self : HttpResponse) -> String? {
  match header_value(self.headers, "content-type") {
    None => None
    Some(ct) => {
      let mime = match ct.split_once(";") {
        Some((m, _)) => m.trim().to_owned()
        None => ct.trim().to_owned()
      }
      if mime.is_empty() {
        None
      } else {
        Some(mime.to_lower())
      }
    }
  }
}

///|
/// Returns the `Location` header value if present.
pub fn HttpResponse::location(self : HttpResponse) -> String? {
  header_value(self.headers, "location")
}

///|
/// Reports whether `Transfer-Encoding` includes `chunked`.
pub fn HttpResponse::is_chunked(self : HttpResponse) -> Bool {
  match header_value(self.headers, "transfer-encoding") {
    None => false
    Some(v) => v.to_lower().contains("chunked")
  }
}

///|
fn parse_hex_size(s : String) -> Result[Int32, HttpError] {
  let clean = match s.split_once(";") {
    Some((sz, _)) => sz.trim().to_owned()
    None => s.trim().to_owned()
  }
  if clean.is_empty() {
    return Err(InvalidChunkSize(s))
  }
  let mut val = 0
  for i in 0..<clean.length() {
    let c = clean[i].to_int()
    let digit = if c >= 48 && c <= 57 {
      c - 48
    } else if c >= 97 && c <= 102 {
      c - 97 + 10
    } else if c >= 65 && c <= 70 {
      c - 65 + 10
    } else {
      return Err(InvalidChunkSize(s))
    }
    if val > 0x07ffffff {
      return Err(InvalidChunkSize(s))
    }
    val = (val << 4) | digit
  }
  Ok(val)
}

///|
/// Decodes an RFC 9112 `Transfer-Encoding: chunked` message body.
pub fn decode_chunked(raw : BytesView) -> Result[Bytes, HttpError] {
  let out = @buffer.Buffer(capacity=raw.length())
  let len = raw.length()
  let mut pos = 0
  while true {
    if pos >= len {
      return Err(TruncatedChunkBody)
    }
    let slice = raw[pos:len]
    let line_end = match slice.find(b"\r\n") {
      Some(rel) => rel
      None => return Err(MissingChunkCrlf)
    }
    let size_line = @utf8.decode_lossy(raw[pos:pos + line_end])
    let chunk_size = match parse_hex_size(size_line) {
      Ok(sz) => sz
      Err(e) => return Err(e)
    }
    pos = pos + line_end + 2
    if chunk_size == 0 {
      // Consume optional trailer lines until an empty CRLF line.
      while true {
        if pos + 2 > len {
          return Err(TruncatedChunkBody)
        }
        if raw[pos] == b'\r' && raw[pos + 1] == b'\n' {
          return Ok(out.to_bytes())
        }
        let rem = raw[pos:len]
        match rem.find(b"\r\n") {
          Some(rel) => pos = pos + rel + 2
          None => return Err(MissingChunkCrlf)
        }
      }
    }
    if pos + chunk_size > len {
      return Err(TruncatedChunkBody)
    }
    out.write_bytesview(raw[pos:pos + chunk_size])
    pos = pos + chunk_size
    if pos + 2 > len {
      return Err(TruncatedChunkBody)
    }
    if raw[pos] != b'\r' || raw[pos + 1] != b'\n' {
      return Err(MissingChunkCrlf)
    }
    pos = pos + 2
  }
  Ok(out.to_bytes())
}

///|
/// Returns the decoded HTTP entity body (de-chunking automatically if `chunked`).
pub fn extract_entity_body(resp : HttpResponse) -> Result[Bytes, HttpError] {
  if resp.is_chunked() {
    decode_chunked(resp.body)
  } else {
    Ok(resp.body)
  }
}
