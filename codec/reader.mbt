///|
/// Errors returned by the Sans-IO streaming WARC reader.
#derive(Eq, Debug)
pub(all) enum CodecError {
  HeaderError(@header.HeaderError)
  UnexpectedEof(String)
  InvalidTrailingSeparator(String)
  InvalidContentLength(String)
  LimitExceeded(String)
}

///|
/// Resource bounds enforced by `WarcReader` to guard against untrusted oversized frames.
#derive(Eq, Debug)
pub(all) struct ReaderLimits {
  max_header_bytes : Int32
  max_payload_bytes : Int32
}

///|
/// Default reader limits (`64 KiB` max header block, `64 MiB` max payload).
pub fn ReaderLimits::default() -> ReaderLimits {
  { max_header_bytes: 65536, max_payload_bytes: 67108864, }
}

///|
/// Decoded ISO 28500 WARC record with exact byte offset and total encoded length.
#derive(Eq, Debug)
pub(all) struct WarcRecord {
  header : @header.WarcHeader
  payload : Bytes
  offset : Int64
  record_length : Int64
}

///|
enum ReaderState {
  SeekHeader
  ReadPayload(@header.WarcHeader, Int32, Int64, Int64)
  ReadTrailingCrlf(@header.WarcHeader, Bytes, Int64, Int64)
}

///|
fn checked_add_i64(a : Int64, b : Int64) -> Int64? {
  if b < 0L || a < 0L || a > 9223372036854775807L - b {
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
  priv mut total_consumed : Int64
  priv limits : ReaderLimits
  priv mut state : ReaderState
}

///|
/// Creates a fresh streaming `WarcReader`.
pub fn WarcReader::new(
  limits~ : ReaderLimits = ReaderLimits::default(),
) -> WarcReader {
  {
    buf: [],
    cursor: 0,
    header_scan_pos: 0,
    total_consumed: 0L,
    limits,
    state: SeekHeader,
  }
}

///|
/// Returns the cumulative number of uncompressed WARC stream bytes consumed so far.
pub fn WarcReader::bytes_consumed(self : WarcReader) -> Int64 {
  self.total_consumed
}

///|
/// Sets the starting stream byte offset before parsing resumes (for windowed/multi-part streams).
pub fn WarcReader::set_bytes_consumed(
  self : WarcReader,
  offset : Int64,
) -> Unit {
  if offset >= 0L {
    self.total_consumed = offset
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
          None => {
            if self.limits.max_header_bytes >= 0 &&
              self.available() > self.limits.max_header_bytes {
              return Err(
                LimitExceeded(
                  "unterminated WARC header exceeds max_header_bytes (\{self.limits.max_header_bytes.to_string()})",
                ),
              )
            }
            return Ok(None)
          }
          Some(end_idx) => {
            let hdr_body_len = end_idx - self.cursor
            if self.limits.max_header_bytes >= 0 &&
              hdr_body_len > self.limits.max_header_bytes {
              return Err(
                LimitExceeded(
                  "WARC header exceeds max_header_bytes (\{self.limits.max_header_bytes.to_string()})",
                ),
              )
            }
            let hdr_bytes = self.slice_bytes(self.cursor, end_idx)
            let hdr_len = (hdr_body_len + 4).to_int64()
            let rec_offset = self.total_consumed
            let hdr = match @header.WarcHeader::parse(hdr_bytes) {
              Ok(h) => h
              Err(e) => return Err(HeaderError(e))
            }
            let content_len_i64 = match hdr.parse_content_length() {
              Ok(n) => n
              Err(e) => return Err(HeaderError(e))
            }
            if self.limits.max_payload_bytes >= 0 &&
              content_len_i64 > self.limits.max_payload_bytes.to_int64() {
              return Err(
                LimitExceeded(
                  "WARC Content-Length \{content_len_i64.to_string()} exceeds max_payload_bytes (\{self.limits.max_payload_bytes.to_string()})",
                ),
              )
            }
            if content_len_i64 > 2147483647L {
              return Err(
                LimitExceeded(
                  "WARC payload exceeds single-record buffer capacity (2 GiB)",
                ),
              )
            }
            let content_len = content_len_i64.to_int()
            let next_consumed = match
              checked_add_i64(self.total_consumed, hdr_len) {
              Some(v) => v
              None =>
                return Err(
                  InvalidContentLength(
                    "WARC stream byte offset exceeds Int64 range",
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
        let content_len_i64 = content_len.to_int64()
        let body_plus_hdr = match checked_add_i64(hdr_len, content_len_i64) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength("WARC record length exceeds Int64 range"),
            )
        }
        let next_consumed = match
          checked_add_i64(self.total_consumed, content_len_i64) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength(
                "WARC stream byte offset exceeds Int64 range",
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
        let total_rec_len = match checked_add_i64(body_plus_hdr_len, 4L) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength("WARC record length exceeds Int64 range"),
            )
        }
        let next_consumed = match checked_add_i64(self.total_consumed, 4L) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength(
                "WARC stream byte offset exceeds Int64 range",
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
/// Streams through a complete WARC byte sequence invoking `on_record` per decoded record
/// without allocating a combined `Array[WarcRecord]`, returning the number of scanned records.
pub fn scan_all(
  raw : BytesView,
  limits~ : ReaderLimits = ReaderLimits::default(),
  on_record : (WarcRecord) -> Unit,
) -> Result[Int64, CodecError] {
  let reader = WarcReader::new(limits~)
  reader.feed(raw)
  let mut count = 0L
  while true {
    match reader.next_record() {
      Err(e) => return Err(e)
      Ok(None) => break
      Ok(Some(rec)) => {
        on_record(rec)
        count = count + 1L
      }
    }
  }
  match reader.finish() {
    Ok(_) => Ok(count)
    Err(e) => Err(e)
  }
}

///|
/// Parses a complete WARC archive byte sequence into an array of `WarcRecord`s.
pub fn parse_all(
  raw : BytesView,
  limits~ : ReaderLimits = ReaderLimits::default(),
) -> Result[Array[WarcRecord], CodecError] {
  let out : Array[WarcRecord] = []
  match scan_all(raw, limits~, fn(rec) { out.push(rec) }) {
    Ok(_) => Ok(out)
    Err(e) => Err(e)
  }
}
