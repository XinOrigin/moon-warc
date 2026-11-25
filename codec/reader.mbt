///|
/// Errors returned by the Sans-IO streaming WARC reader.
#derive(Eq, Debug)
pub(all) enum CodecError {
  HeaderError(@header.HeaderError)
  UnexpectedEof(String)
  InvalidTrailingSeparator(String)
  InvalidContentLength(String)
}

///|
/// Decoded ISO 28500 WARC record with exact byte offset and total encoded length.
#derive(Eq, Debug)
pub(all) struct WarcRecord {
  header : @header.WarcHeader
  payload : Bytes
  offset : Int32
  record_length : Int32
}

///|
enum ReaderState {
  SeekHeader
  ReadPayload(@header.WarcHeader, Int32, Int32, Int32)
  ReadTrailingCrlf(@header.WarcHeader, Bytes, Int32, Int32)
}

///|
fn checked_add_i32(a : Int32, b : Int32) -> Int32? {
  if b < 0 || a < 0 || a > 2147483647 - b {
    None
  } else {
    Some(a + b)
  }
}

///|
/// Sans-IO incremental streaming parser for ISO 28500 WARC 1.0/1.1 archives.
pub struct WarcReader {
  priv mut buf : Array[Byte]
  priv mut cursor : Int32
  priv mut header_scan_pos : Int32
  priv mut total_consumed : Int32
  priv mut state : ReaderState
}

///|
/// Creates a fresh streaming `WarcReader`.
pub fn WarcReader::new() -> WarcReader {
  {
    buf: [],
    cursor: 0,
    header_scan_pos: 0,
    total_consumed: 0,
    state: SeekHeader,
  }
}

///|
/// Appends raw archive bytes into the streaming reader buffer.
pub fn WarcReader::feed(self : WarcReader, chunk : BytesView) -> Unit {
  for i in 0..<chunk.length() {
    self.buf.push(chunk[i])
  }
}

///|
fn WarcReader::available(self : WarcReader) -> Int32 {
  self.buf.length() - self.cursor
}

///|
fn WarcReader::compact_if_needed(self : WarcReader) -> Unit {
  if self.cursor == 0 {
    return
  }
  if self.cursor == self.buf.length() {
    self.buf = []
    self.cursor = 0
    self.header_scan_pos = 0
    return
  }
  let rem = self.available()
  if self.cursor >= 4096 && self.cursor >= rem {
    let next : Array[Byte] = Array::make(rem, b'\x00')
    for i in 0..<rem {
      next[i] = self.buf[self.cursor + i]
    }
    self.header_scan_pos = if self.header_scan_pos > self.cursor {
      self.header_scan_pos - self.cursor
    } else {
      0
    }
    self.buf = next
    self.cursor = 0
  }
}

///|
fn WarcReader::slice_bytes(
  self : WarcReader,
  start : Int32,
  end : Int32,
) -> Bytes {
  let len = end - start
  Bytes::makei(len, i => self.buf[start + i])
}

///|
fn WarcReader::find_crlfcrlf(self : WarcReader) -> Int32? {
  let limit = self.buf.length() - 3
  let mut i = if self.header_scan_pos > self.cursor {
    self.header_scan_pos
  } else {
    self.cursor
  }
  while i < limit {
    if self.buf[i] == b'\r' &&
      self.buf[i + 1] == b'\n' &&
      self.buf[i + 2] == b'\r' &&
      self.buf[i + 3] == b'\n' {
      return Some(i)
    }
    i = i + 1
  }
  self.header_scan_pos = if limit > self.cursor { limit } else { self.cursor }
  None
}

///|
/// Advances the streaming parser and yields the next complete `WarcRecord`, if available.
pub fn WarcReader::next_record(
  self : WarcReader,
) -> Result[WarcRecord?, CodecError] {
  while true {
    match self.state {
      SeekHeader => {
        if self.available() == 0 {
          return Ok(None)
        }
        match self.find_crlfcrlf() {
          None => return Ok(None)
          Some(end_idx) => {
            let hdr_bytes = self.slice_bytes(self.cursor, end_idx)
            let hdr_len = end_idx - self.cursor + 4
            let rec_offset = self.total_consumed
            let hdr = match @header.WarcHeader::parse(hdr_bytes) {
              Ok(h) => h
              Err(e) => return Err(HeaderError(e))
            }
            let content_len = match hdr.parse_content_length() {
              Ok(n) => n
              Err(e) => return Err(HeaderError(e))
            }
            let next_consumed = match
              checked_add_i32(self.total_consumed, hdr_len) {
              Some(v) => v
              None =>
                return Err(
                  InvalidContentLength(
                    "WARC stream byte offset exceeds Int32 range",
                  ),
                )
            }
            self.cursor = end_idx + 4
            self.header_scan_pos = self.cursor
            self.total_consumed = next_consumed
            self.state = ReadPayload(hdr, content_len, rec_offset, hdr_len)
          }
        }
      }
      ReadPayload(hdr, content_len, rec_offset, hdr_len) => {
        if self.available() < content_len {
          return Ok(None)
        }
        let body_plus_hdr = match checked_add_i32(hdr_len, content_len) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength("WARC record length exceeds Int32 range"),
            )
        }
        let next_consumed = match
          checked_add_i32(self.total_consumed, content_len) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength(
                "WARC stream byte offset exceeds Int32 range",
              ),
            )
        }
        let payload = self.slice_bytes(self.cursor, self.cursor + content_len)
        self.cursor = self.cursor + content_len
        self.total_consumed = next_consumed
        self.state = ReadTrailingCrlf(hdr, payload, rec_offset, body_plus_hdr)
      }
      ReadTrailingCrlf(hdr, payload, rec_offset, body_plus_hdr_len) => {
        if self.available() < 4 {
          return Ok(None)
        }
        let c = self.cursor
        if self.buf[c] != b'\r' ||
          self.buf[c + 1] != b'\n' ||
          self.buf[c + 2] != b'\r' ||
          self.buf[c + 3] != b'\n' {
          return Err(
            InvalidTrailingSeparator(
              "expected \\r\\n\\r\\n after WARC payload at offset \{self.total_consumed.to_string()}",
            ),
          )
        }
        let total_rec_len = match checked_add_i32(body_plus_hdr_len, 4) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength("WARC record length exceeds Int32 range"),
            )
        }
        let next_consumed = match checked_add_i32(self.total_consumed, 4) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength(
                "WARC stream byte offset exceeds Int32 range",
              ),
            )
        }
        self.cursor = c + 4
        self.header_scan_pos = self.cursor
        self.total_consumed = next_consumed
        self.state = SeekHeader
        self.compact_if_needed()
        return Ok(
          Some({
            header: hdr,
            payload,
            offset: rec_offset,
            record_length: total_rec_len,
          }),
        )
      }
    }
  }
  Ok(None)
}

///|
/// Validates that no partial header, payload, or trailing separator remains at EOF.
pub fn WarcReader::finish(self : WarcReader) -> Result[Unit, CodecError] {
  match self.state {
    SeekHeader =>
      if self.available() == 0 {
        Ok(())
      } else {
        Err(
          UnexpectedEof(
            "trailing \{self.available().to_string()} bytes of incomplete WARC header at EOF",
          ),
        )
      }
    ReadPayload(_, expected, _, _) =>
      Err(
        UnexpectedEof(
          "truncated WARC payload at EOF: expected \{expected.to_string()} bytes, got \{self.available().to_string()}",
        ),
      )
    ReadTrailingCrlf(_, _, _, _) =>
      Err(
        UnexpectedEof("missing trailing \\r\\n\\r\\n record separator at EOF"),
      )
  }
}

///|
/// Parses a complete WARC archive byte sequence into an array of `WarcRecord`s.
pub fn parse_all(raw : BytesView) -> Result[Array[WarcRecord], CodecError] {
  let reader = WarcReader::new()
  reader.feed(raw)
  let out : Array[WarcRecord] = []
  while true {
    match reader.next_record() {
      Err(e) => return Err(e)
      Ok(None) => break
      Ok(Some(rec)) => out.push(rec)
    }
  }
  match reader.finish() {
    Ok(_) => Ok(out)
    Err(e) => Err(e)
  }
}
