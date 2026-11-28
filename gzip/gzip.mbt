///|
/// A single decoded RFC 1952 Gzip member with exact compressed stream byte range.
#derive(Eq, Debug)
pub(all) struct GzipMember {
  compressed_offset : Int64
  compressed_length : Int64
  uncompressed : Bytes
  crc32 : UInt32
}

///|
/// Result of attempting to parse the next complete RFC 1952 Gzip member from a chunked buffer.
#derive(Eq, Debug)
pub(all) enum MemberStep {
  Parsed(GzipMember, Int32)
  NeedMoreInput
  Failed(GzipError)
}

///|
fn read_u16_le_at(data : BytesView, pos : Int32) -> Result[Int32, GzipError] {
  if pos < 0 || data.length() - pos < 2 {
    return Err(
      UnexpectedEof("unexpected EOF reading RFC 1952 u16 header field"),
    )
  }
  Ok(data[pos].to_int() | (data[pos + 1].to_int() << 8))
}

///|
fn read_u32_le_at(data : BytesView, pos : Int32) -> Result[UInt32, GzipError] {
  if pos < 0 || data.length() - pos < 4 {
    return Err(UnexpectedEof("unexpected EOF reading RFC 1952 u32 trailer"))
  }
  let b0 = data[pos].to_uint()
  let b1 = data[pos + 1].to_uint()
  let b2 = data[pos + 2].to_uint()
  let b3 = data[pos + 3].to_uint()
  Ok(b0 | (b1 << 8) | (b2 << 16) | (b3 << 24))
}

///|
fn write_u32_le(buf : @buffer.Buffer, v : UInt32) -> Unit {
  buf.write_byte((v & 0xffU).to_byte())
  buf.write_byte(((v >> 8) & 0xffU).to_byte())
  buf.write_byte(((v >> 16) & 0xffU).to_byte())
  buf.write_byte(((v >> 24) & 0xffU).to_byte())
}

///|
fn skip_zero_terminated(
  data : BytesView,
  start : Int32,
  label : String,
) -> Result[Int32, GzipError] {
  let mut pos = start
  while pos < data.length() {
    if data[pos] == b'\x00' {
      return Ok(pos + 1)
    }
    pos = pos + 1
  }
  Err(UnexpectedEof("unterminated gzip header \{label} field"))
}

///|
/// Compresses `data` into a single RFC 1952 Gzip member.
pub fn compress(data : BytesView, level~ : Int32 = 6) -> Bytes {
  let deflated = deflate_raw(data, level~)
  let sum = crc32(data)
  let isize = data.length().reinterpret_as_uint()
  let cap64 = 18L + deflated.length().to_int64()
  let cap = if cap64 > 2147483647L { 2147483647 } else { cap64.to_int() }
  let out = @buffer.Buffer(capacity=cap)
  // RFC 1952 10-byte header: ID1 ID2 CM FLG MTIME(4) XFL OS
  out.write_byte(b'\x1f')
  out.write_byte(b'\x8b')
  out.write_byte(b'\x08')
  out.write_byte(b'\x00')
  out.write_byte(b'\x00')
  out.write_byte(b'\x00')
  out.write_byte(b'\x00')
  out.write_byte(b'\x00')
  out.write_byte(
    if level >= 6 {
      b'\x02'
    } else if level <= 0 {
      b'\x04'
    } else {
      b'\x00'
    },
  )
  out.write_byte(b'\xff')
  out.write_bytesview(deflated[:])
  write_u32_le(out, sum)
  write_u32_le(out, isize)
  out.to_bytes()
}

///|
fn parse_member_at(
  raw : BytesView,
  member_start : Int32,
  base_offset : Int64,
  max_member_output_bytes : Int32,
  sc : InflateScratch,
) -> MemberStep {
  let total_len = raw.length()
  let mut pos = member_start
  if pos < 0 || total_len - pos < 10 {
    return NeedMoreInput
  }
  if raw[pos] != b'\x1f' || raw[pos + 1] != b'\x8b' {
    let abs_pos = base_offset + member_start.to_int64()
    return Failed(
      InvalidHeader("invalid gzip magic bytes at offset \{abs_pos.to_string()}"),
    )
  }
  if raw[pos + 2] != b'\x08' {
    return Failed(
      InvalidHeader(
        "unsupported gzip compression method \{raw[pos + 2].to_int().to_string()}",
      ),
    )
  }
  let flg = raw[pos + 3].to_int()
  if (flg & 0xe0) != 0 {
    return Failed(InvalidHeader("reserved gzip header flags set"))
  }
  pos = pos + 10
  if (flg & 0x04) != 0 {
    if total_len - pos < 2 {
      return NeedMoreInput
    }
    let xlen = match read_u16_le_at(raw, pos) {
      Ok(v) => v
      Err(_) => return NeedMoreInput
    }
    pos = pos + 2
    if total_len - pos < xlen {
      return NeedMoreInput
    }
    pos = pos + xlen
  }
  if (flg & 0x08) != 0 {
    pos = match skip_zero_terminated(raw, pos, "FNAME") {
      Ok(p) => p
      Err(_) => return NeedMoreInput
    }
  }
  if (flg & 0x10) != 0 {
    pos = match skip_zero_terminated(raw, pos, "FCOMMENT") {
      Ok(p) => p
      Err(_) => return NeedMoreInput
    }
  }
  if (flg & 0x02) != 0 {
    if total_len - pos < 2 {
      return NeedMoreInput
    }
    let expected_hcrc = match read_u16_le_at(raw, pos) {
      Ok(v) => v
      Err(_) => return NeedMoreInput
    }
    let actual_hcrc = (crc32(raw[member_start:pos]) & 0xffffU).reinterpret_as_int()
    if expected_hcrc != actual_hcrc {
      return Failed(ChecksumMismatch("gzip header FHCRC16 mismatch"))
    }
    pos = pos + 2
  }
  let (uncompressed, deflate_end) = match
    inflate_raw_with_scratch(raw, pos, max_member_output_bytes, sc) {
    Ok(pair) => pair
    Err(UnexpectedEof(_)) => return NeedMoreInput
    Err(e) => return Failed(e)
  }
  if total_len - deflate_end < 8 {
    return NeedMoreInput
  }
  let expected_crc = match read_u32_le_at(raw, deflate_end) {
    Ok(v) => v
    Err(_) => return NeedMoreInput
  }
  let expected_isize = match read_u32_le_at(raw, deflate_end + 4) {
    Ok(v) => v
    Err(_) => return NeedMoreInput
  }
  let abs_member_start = base_offset + member_start.to_int64()
  let actual_crc = crc32(uncompressed)
  if actual_crc != expected_crc {
    return Failed(
      ChecksumMismatch(
        "gzip member CRC-32 mismatch at offset \{abs_member_start.to_string()}",
      ),
    )
  }
  let actual_isize = uncompressed.length().reinterpret_as_uint()
  if actual_isize != expected_isize {
    return Failed(
      SizeMismatch(
        "gzip member ISIZE mismatch at offset \{abs_member_start.to_string()}",
      ),
    )
  }
  let member_end = deflate_end + 8
  Parsed(
    {
      compressed_offset: abs_member_start,
      compressed_length: (member_end - member_start).to_int64(),
      uncompressed,
      crc32: actual_crc,
    },
    member_end,
  )
}

///|
/// Attempts to decode one complete RFC 1952 Gzip member from the start of `raw`.
/// Returns `NeedMoreInput` if the buffer only holds a valid truncated prefix, `Parsed(member, next_pos)`
/// on completion, or `Failed(err)` on malformed headers, DEFLATE syntax errors, or checksum/size mismatches.
pub fn try_decompress_member(
  raw : BytesView,
  base_offset~ : Int64 = 0L,
  max_member_output_bytes~ : Int32 = 67108864,
) -> MemberStep {
  let owns_slot = !inflate_scratch_slot.in_use
  let sc = if owns_slot {
    inflate_scratch_slot.in_use = true
    inflate_scratch_slot.scratch
  } else {
    InflateScratch::new()
  }
  let step = parse_member_at(raw, 0, base_offset, max_member_output_bytes, sc)
  if owns_slot {
    sc.shrink_if_huge()
    inflate_scratch_slot.in_use = false
  }
  step
}

///|
/// Streams RFC 1952 Gzip members in `raw` one-by-one while `on_member` returns `true`,
/// reusing scratch decompression tables across members and stopping early on `false`.
pub fn scan_members_while(
  raw : BytesView,
  max_member_output_bytes~ : Int32 = 67108864,
  on_member : (GzipMember) -> Bool,
) -> Result[Int64, GzipError] {
  let owns_slot = !inflate_scratch_slot.in_use
  let sc = if owns_slot {
    inflate_scratch_slot.in_use = true
    inflate_scratch_slot.scratch
  } else {
    InflateScratch::new()
  }
  let total_len = raw.length()
  let mut pos = 0
  let mut count = 0L
  let mut res : Result[Int64, GzipError] = Ok(0L)
  while pos < total_len {
    match parse_member_at(raw, pos, 0L, max_member_output_bytes, sc) {
      Parsed(gz_m, next_pos) => {
        count = count + 1L
        pos = next_pos
        if !on_member(gz_m) {
          break
        }
      }
      NeedMoreInput => {
        res = Err(
          UnexpectedEof(
            "truncated RFC 1952 Gzip member at compressed offset \{pos.to_string()}",
          ),
        )
        break
      }
      Failed(e) => {
        res = Err(e)
        break
      }
    }
  }
  if owns_slot {
    sc.shrink_if_huge()
    inflate_scratch_slot.in_use = false
  }
  match res {
    Ok(_) => Ok(count)
    Err(e) => Err(e)
  }
}

///|
/// Streams all RFC 1952 Gzip members in `raw` one-by-one without retaining prior members
/// in memory, validating CRC-32 and ISIZE for each member and returning the member count.
pub fn scan_members(
  raw : BytesView,
  max_member_output_bytes~ : Int32 = 67108864,
  on_member : (GzipMember) -> Unit,
) -> Result[Int64, GzipError] {
  scan_members_while(raw, max_member_output_bytes~, fn(gz_m) {
    on_member(gz_m)
    true
  })
}

///|
/// Decodes all RFC 1952 Gzip members in `raw`, verifying each member's CRC-32 and ISIZE
/// while tracking exact `(compressed_offset, compressed_length)` byte ranges.
pub fn decompress_members(
  raw : BytesView,
  max_member_output_bytes~ : Int32 = 67108864,
) -> Result[Array[GzipMember], GzipError] {
  let members : Array[GzipMember] = []
  match scan_members(raw, max_member_output_bytes~, fn(m) { members.push(m) }) {
    Ok(_) => Ok(members)
    Err(e) => Err(e)
  }
}

///|
/// Decompresses a single- or multi-member RFC 1952 Gzip byte stream and concatenates outputs.
pub fn decompress(
  raw : BytesView,
  max_output_bytes~ : Int32 = 67108864,
) -> Result[Bytes, GzipError] {
  let total_in = raw.length()
  if total_in == 0 {
    return Ok(b"")
  }
  let owns_slot = !inflate_scratch_slot.in_use
  let sc = if owns_slot {
    inflate_scratch_slot.in_use = true
    inflate_scratch_slot.scratch
  } else {
    InflateScratch::new()
  }
  let release_slot = fn() {
    if owns_slot {
      sc.shrink_if_huge()
      inflate_scratch_slot.in_use = false
    }
  }
  let mut pos = 0
  let mut total_len = 0L
  let mut first_bytes : Bytes? = None
  let mut out_buf : @buffer.Buffer? = None
  while pos < total_in {
    let rem64 = if max_output_bytes >= 0 {
      max_output_bytes.to_int64() - total_len
    } else {
      2147483647L - total_len
    }
    if rem64 < 0L {
      release_slot()
      return Err(
        LimitExceeded("total decompressed gzip output exceeds max_output_bytes"),
      )
    }
    let member_limit = rem64.to_int()
    match parse_member_at(raw, pos, 0L, member_limit, sc) {
      Parsed(gz_m, next_pos) => {
        pos = next_pos
        total_len = total_len + gz_m.uncompressed.length().to_int64()
        match (out_buf, first_bytes) {
          (None, None) =>
            if pos == total_in {
              release_slot()
              return Ok(gz_m.uncompressed)
            } else {
              first_bytes = Some(gz_m.uncompressed)
            }
          (None, Some(first)) => {
            let cap64 = first.length().to_int64() +
              gz_m.uncompressed.length().to_int64()
            let cap = if cap64 > 2147483647L {
              2147483647
            } else {
              cap64.to_int()
            }
            let buf = @buffer.Buffer(capacity=cap)
            buf.write_bytesview(first[:])
            buf.write_bytesview(gz_m.uncompressed[:])
            first_bytes = None
            out_buf = Some(buf)
          }
          (Some(buf), _) => buf.write_bytesview(gz_m.uncompressed[:])
        }
      }
      NeedMoreInput => {
        release_slot()
        return Err(
          UnexpectedEof(
            "truncated RFC 1952 Gzip member at compressed offset \{pos.to_string()}",
          ),
        )
      }
      Failed(e) => {
        release_slot()
        return Err(e)
      }
    }
  }
  release_slot()
  match out_buf {
    Some(buf) => Ok(buf.to_bytes())
    None =>
      match first_bytes {
        Some(first) => Ok(first)
        None => Ok(b"")
      }
  }
}
