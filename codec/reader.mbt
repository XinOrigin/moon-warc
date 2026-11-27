///|
/// Errors returned by the Sans-IO streaming WARC reader.
#derive(Eq, Debug)
pub(all) enum CodecError {
  HeaderError(@header.HeaderError)
  UnexpectedEof(String)
  InvalidTrailingSeparator(String)
  InvalidContentLength(String)
  LimitExceeded(String)
  GzipError(@gzip.GzipError)
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
  priv mut buf : FixedArray[Byte]
  priv mut buf_len : Int32
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
    buf: FixedArray::make(0, b'\x00'),
    buf_len: 0,
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
  let n = chunk.length()
  if n == 0 {
    return
  }
  if self.cursor == self.buf_len {
    self.buf_len = 0
    self.cursor = 0
    self.header_scan_pos = 0
  } else if n > self.buf.length() - self.buf_len && self.cursor > 0 {
    let rem = self.available()
    for i in 0..<rem {
      self.buf[i] = self.buf[self.cursor + i]
    }
    self.header_scan_pos = if self.header_scan_pos > self.cursor {
      self.header_scan_pos - self.cursor
    } else {
      0
    }
    self.buf_len = rem
    self.cursor = 0
  }
  if n > 2147483647 - self.buf_len {
    abort("WarcReader buffer overflow")
  }
  let needed = self.buf_len + n
  if needed > self.buf.length() {
    let doubled = if self.buf.length() > 1073741823 {
      2147483647
    } else {
      self.buf.length() * 2
    }
    let cap0 = if doubled < 256 { 256 } else { doubled }
    let new_cap = if cap0 < needed { needed } else { cap0 }
    let next = FixedArray::make(new_cap, b'\x00')
    for i in 0..<self.buf_len {
      next[i] = self.buf[i]
    }
    self.buf = next
  }
  let base = self.buf_len
  for i in 0..<n {
    self.buf[base + i] = chunk[i]
  }
  self.buf_len = needed
}

///|
fn WarcReader::available(self : WarcReader) -> Int32 {
  self.buf_len - self.cursor
}

///|
fn WarcReader::compact_if_needed(self : WarcReader) -> Unit {
  if self.cursor == 0 {
    return
  }
  if self.cursor == self.buf_len {
    self.buf_len = 0
    self.cursor = 0
    self.header_scan_pos = 0
    return
  }
  let rem = self.available()
  if self.cursor >= 4096 && self.cursor >= rem {
    for i in 0..<rem {
      self.buf[i] = self.buf[self.cursor + i]
    }
    self.header_scan_pos = if self.header_scan_pos > self.cursor {
      self.header_scan_pos - self.cursor
    } else {
      0
    }
    self.buf_len = rem
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
  let limit = self.buf_len - 3
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
fn find_crlfcrlf_view(
  raw : BytesView,
  start : Int32,
  total_len : Int32,
  max_header_bytes : Int32,
) -> Result[Int32?, CodecError] {
  let limit = total_len - 3
  let mut i = start
  while i < limit {
    if max_header_bytes >= 0 && i - start > max_header_bytes {
      return Err(
        LimitExceeded(
          "WARC header exceeds max_header_bytes (\{max_header_bytes.to_string()})",
        ),
      )
    }
    if raw[i] == b'\r' &&
      raw[i + 1] == b'\n' &&
      raw[i + 2] == b'\r' &&
      raw[i + 3] == b'\n' {
      return Ok(Some(i))
    }
    i = i + 1
  }
  Ok(None)
}

///|
/// Streams through a complete WARC byte sequence invoking `on_record` per decoded record
/// without allocating a combined `Array[WarcRecord]` or copying the input buffer, returning the count.
pub fn scan_all(
  raw : BytesView,
  limits~ : ReaderLimits = ReaderLimits::default(),
  on_record : (WarcRecord) -> Unit,
) -> Result[Int64, CodecError] {
  let total_len = raw.length()
  let mut pos = 0
  let mut consumed = 0L
  let mut count = 0L
  while pos < total_len {
    let end_idx = match
      find_crlfcrlf_view(raw, pos, total_len, limits.max_header_bytes) {
      Err(e) => return Err(e)
      Ok(Some(idx)) => idx
      Ok(None) => {
        let rem = total_len - pos
        if limits.max_header_bytes >= 0 && rem > limits.max_header_bytes {
          return Err(
            LimitExceeded(
              "unterminated WARC header exceeds max_header_bytes (\{limits.max_header_bytes.to_string()})",
            ),
          )
        }
        return Err(
          UnexpectedEof(
            "trailing \{rem.to_string()} bytes of incomplete WARC header at EOF",
          ),
        )
      }
    }
    let hdr_body_len = end_idx - pos
    if limits.max_header_bytes >= 0 && hdr_body_len > limits.max_header_bytes {
      return Err(
        LimitExceeded(
          "WARC header exceeds max_header_bytes (\{limits.max_header_bytes.to_string()})",
        ),
      )
    }
    let hdr_len = (hdr_body_len + 4).to_int64()
    let rec_offset = consumed
    let hdr = match @header.WarcHeader::parse(raw[pos:end_idx]) {
      Ok(h) => h
      Err(e) => return Err(HeaderError(e))
    }
    let content_len_i64 = match hdr.parse_content_length() {
      Ok(n) => n
      Err(e) => return Err(HeaderError(e))
    }
    if limits.max_payload_bytes >= 0 &&
      content_len_i64 > limits.max_payload_bytes.to_int64() {
      return Err(
        LimitExceeded(
          "WARC Content-Length \{content_len_i64.to_string()} exceeds max_payload_bytes (\{limits.max_payload_bytes.to_string()})",
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
    let payload_start = end_idx + 4
    let avail_after_hdr = total_len - payload_start
    if avail_after_hdr < content_len {
      return Err(
        UnexpectedEof(
          "truncated WARC payload at EOF: expected \{content_len.to_string()} bytes, got \{avail_after_hdr.to_string()}",
        ),
      )
    }
    let sep_start = payload_start + content_len
    let avail_after_payload = total_len - sep_start
    if avail_after_payload < 4 {
      return Err(
        UnexpectedEof("missing trailing \\r\\n\\r\\n record separator at EOF"),
      )
    }
    if raw[sep_start] != b'\r' ||
      raw[sep_start + 1] != b'\n' ||
      raw[sep_start + 2] != b'\r' ||
      raw[sep_start + 3] != b'\n' {
      let sep_offset = rec_offset + hdr_len + content_len_i64
      return Err(
        InvalidTrailingSeparator(
          "expected \\r\\n\\r\\n after WARC payload at offset \{sep_offset.to_string()}",
        ),
      )
    }
    let total_rec_len = match checked_add_i64(hdr_len + content_len_i64, 4L) {
      Some(v) => v
      None =>
        return Err(
          InvalidContentLength("WARC record length exceeds Int64 range"),
        )
    }
    let next_consumed = match checked_add_i64(consumed, total_rec_len) {
      Some(v) => v
      None =>
        return Err(
          InvalidContentLength("WARC stream byte offset exceeds Int64 range"),
        )
    }
    let payload = raw[payload_start:sep_start].to_owned()
    on_record({
      header: hdr,
      payload,
      offset: rec_offset,
      record_length: total_rec_len,
    })
    pos = sep_start + 4
    consumed = next_consumed
    count = count + 1L
  }
  Ok(count)
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

///|
fn max_member_output_for_limits(limits : ReaderLimits) -> Int32 {
  if limits.max_header_bytes >= 0 && limits.max_payload_bytes >= 0 {
    let sum = limits.max_header_bytes.to_int64() +
      limits.max_payload_bytes.to_int64() +
      1024L
    if sum > 2147483647L {
      2147483647
    } else {
      sum.to_int()
    }
  } else {
    67108864
  }
}

///|
fn max_compressed_member_for_limits(limits : ReaderLimits) -> Int32 {
  if limits.max_header_bytes >= 0 && limits.max_payload_bytes >= 0 {
    let max_out = max_member_output_for_limits(limits).to_int64()
    let hdr_slack = if limits.max_header_bytes > 4096 {
      limits.max_header_bytes.to_int64()
    } else {
      4096L
    }
    let cap = max_out + max_out / 1024L + hdr_slack
    if cap > 2147483647L {
      2147483647
    } else {
      cap.to_int()
    }
  } else {
    -1
  }
}

///|
/// Scans a single- or multi-member RFC 1952 `.warc.gz` byte stream record-by-record without
/// retaining prior decompressed members or all decoded records in RAM, returning record count.
pub fn scan_all_gz(
  raw : BytesView,
  limits~ : ReaderLimits = ReaderLimits::default(),
  on_record : (WarcRecord) -> Unit,
) -> Result[Int64, CodecError] {
  let max_member_out = max_member_output_for_limits(limits)
  let mut count = 0L
  let mut err_opt : CodecError? = None
  let gz_res = @gzip.scan_members_while(
    raw,
    max_member_output_bytes=max_member_out,
    fn(m) {
      match
        scan_all(m.uncompressed, limits~, fn(rec) {
          on_record({
            header: rec.header,
            payload: rec.payload,
            offset: m.compressed_offset,
            record_length: m.compressed_length,
          })
          count = count + 1L
        }) {
        Ok(_) => true
        Err(e) => {
          err_opt = Some(e)
          false
        }
      }
    },
  )
  match err_opt {
    Some(e) => Err(e)
    None =>
      match gz_res {
        Ok(_) => Ok(count)
        Err(e) => Err(GzipError(e))
      }
  }
}

///|
/// Parses a single- or multi-member RFC 1952 `.warc.gz` byte stream into `WarcRecord`s.
/// Sets each record's `offset` and `record_length` to its enclosing gzip member's compressed
/// byte offset and compressed length so `CDXJ` / `CDX-11` indexes support HTTP range fetches.
pub fn parse_all_gz(
  raw : BytesView,
  limits~ : ReaderLimits = ReaderLimits::default(),
) -> Result[Array[WarcRecord], CodecError] {
  let out : Array[WarcRecord] = []
  match scan_all_gz(raw, limits~, fn(rec) { out.push(rec) }) {
    Ok(_) => Ok(out)
    Err(e) => Err(e)
  }
}

///|
/// Chunk-incremental Sans-IO streaming reader for single- and multi-member RFC 1952 `.warc.gz` archives.
/// Buffers only the currently incomplete compressed Gzip member across `feed()` calls and frees
/// compressed & uncompressed member buffers immediately after each member completes.
pub struct WarcGzReader {
  priv mut buf : FixedArray[Byte]
  priv mut buf_len : Int32
  priv mut compressed_consumed : Int64
  priv limits : ReaderLimits
  priv mut pending : Array[WarcRecord]
  priv mut pending_idx : Int32
  priv mut last_need_more_len : Int32
}

///|
/// Creates a fresh incremental `.warc.gz` streaming reader.
pub fn WarcGzReader::new(
  limits~ : ReaderLimits = ReaderLimits::default(),
) -> WarcGzReader {
  {
    buf: FixedArray::make(0, b'\x00'),
    buf_len: 0,
    compressed_consumed: 0L,
    limits,
    pending: [],
    pending_idx: 0,
    last_need_more_len: -1,
  }
}

///|
/// Returns the cumulative number of compressed `.warc.gz` stream bytes consumed from completed members.
pub fn WarcGzReader::bytes_consumed(self : WarcGzReader) -> Int64 {
  self.compressed_consumed
}

///|
/// Appends a compressed `.warc.gz` chunk into the streaming reader buffer.
pub fn WarcGzReader::feed(self : WarcGzReader, chunk : BytesView) -> Unit {
  let n = chunk.length()
  if n == 0 {
    return
  }
  if n > 2147483647 - self.buf_len {
    abort("WarcGzReader buffer overflow")
  }
  let needed = self.buf_len + n
  if needed > self.buf.length() {
    let doubled = if self.buf.length() > 1073741823 {
      2147483647
    } else {
      self.buf.length() * 2
    }
    let cap0 = if doubled < 256 { 256 } else { doubled }
    let new_cap = if cap0 < needed { needed } else { cap0 }
    let next = FixedArray::make(new_cap, b'\x00')
    for i in 0..<self.buf_len {
      next[i] = self.buf[i]
    }
    self.buf = next
  }
  let base = self.buf_len
  for i in 0..<n {
    self.buf[base + i] = chunk[i]
  }
  self.buf_len = needed
  self.last_need_more_len = -1
}

///|
fn WarcGzReader::shift_left(self : WarcGzReader, n : Int32) -> Unit {
  let rem = self.buf_len - n
  if rem <= 0 {
    self.buf_len = 0
    if self.buf.length() > 65536 {
      self.buf = FixedArray::make(0, b'\x00')
    }
  } else {
    for i in 0..<rem {
      self.buf[i] = self.buf[n + i]
    }
    self.buf_len = rem
  }
  self.last_need_more_len = -1
}

///|
/// Advances the `.warc.gz` streaming parser and yields the next complete `WarcRecord`, if available.
pub fn WarcGzReader::next_record(
  self : WarcGzReader,
) -> Result[WarcRecord?, CodecError] {
  while true {
    if self.pending_idx < self.pending.length() {
      let rec = self.pending[self.pending_idx]
      self.pending_idx = self.pending_idx + 1
      if self.pending_idx >= self.pending.length() {
        self.pending = []
        self.pending_idx = 0
      }
      return Ok(Some(rec))
    }
    if self.buf_len == 0 || self.buf_len == self.last_need_more_len {
      return Ok(None)
    }
    let view = self.buf.unsafe_reinterpret_as_bytes()[0:self.buf_len]
    let max_member_out = max_member_output_for_limits(self.limits)
    match
      @gzip.try_decompress_member(
        view,
        base_offset=self.compressed_consumed,
        max_member_output_bytes=max_member_out,
      ) {
      NeedMoreInput => {
        let max_comp = max_compressed_member_for_limits(self.limits)
        if max_comp >= 0 && self.buf_len > max_comp {
          return Err(
            LimitExceeded(
              "incomplete RFC 1952 Gzip member (\{self.buf_len.to_string()} bytes) exceeds compressed member limit (\{max_comp.to_string()})",
            ),
          )
        }
        self.last_need_more_len = self.buf_len
        return Ok(None)
      }
      Failed(e) => return Err(GzipError(e))
      Parsed(m, consumed_i32) => {
        let next_consumed = match
          checked_add_i64(self.compressed_consumed, m.compressed_length) {
          Some(v) => v
          None =>
            return Err(
              InvalidContentLength(
                "WARC compressed stream byte offset exceeds Int64 range",
              ),
            )
        }
        self.compressed_consumed = next_consumed
        self.shift_left(consumed_i32)
        let recs : Array[WarcRecord] = []
        match
          scan_all(m.uncompressed, limits=self.limits, fn(rec) {
            recs.push({
              header: rec.header,
              payload: rec.payload,
              offset: m.compressed_offset,
              record_length: m.compressed_length,
            })
          }) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
        if !recs.is_empty() {
          self.pending = recs
          self.pending_idx = 0
        }
      }
    }
  }
  Ok(None)
}

///|
/// Checks that no unconsumed or truncated trailing Gzip member bytes remain at EOF.
pub fn WarcGzReader::finish(self : WarcGzReader) -> Result[Unit, CodecError] {
  if self.pending_idx < self.pending.length() {
    return Err(
      UnexpectedEof("unconsumed buffered records remaining at end of .warc.gz"),
    )
  }
  if self.buf_len > 0 {
    return Err(
      GzipError(
        @gzip.UnexpectedEof(
          "truncated trailing RFC 1952 Gzip member (\{self.buf_len.to_string()} bytes) at offset \{self.compressed_consumed.to_string()}",
        ),
      ),
    )
  }
  Ok(())
}
