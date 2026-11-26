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
fn read_u16_le_at(data : BytesView, pos : Int32) -> Result[Int32, GzipError] {
  if pos + 2 > data.length() {
    return Err(
      UnexpectedEof("unexpected EOF reading RFC 1952 u16 header field"),
    )
  }
  Ok(data[pos].to_int() | (data[pos + 1].to_int() << 8))
}

///|
fn read_u32_le_at(data : BytesView, pos : Int32) -> Result[UInt32, GzipError] {
  if pos + 4 > data.length() {
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
  let out = @buffer.Buffer(capacity=18 + deflated.length())
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
  out.write_bytes(deflated)
  write_u32_le(out, sum)
  write_u32_le(out, isize)
  out.to_bytes()
}

///|
/// Decodes all RFC 1952 Gzip members in `raw`, verifying each member's CRC-32 and ISIZE
/// while tracking exact `(compressed_offset, compressed_length)` byte ranges.
pub fn decompress_members(
  raw : BytesView,
  max_member_output_bytes~ : Int32 = 67108864,
) -> Result[Array[GzipMember], GzipError] {
  let members : Array[GzipMember] = []
  let total_len = raw.length()
  let mut pos = 0
  while pos < total_len {
    let member_start = pos
    if pos + 10 > total_len {
      return Err(UnexpectedEof("truncated RFC 1952 Gzip header"))
    }
    if raw[pos] != b'\x1f' || raw[pos + 1] != b'\x8b' {
      return Err(
        InvalidHeader("invalid gzip magic bytes at offset \{pos.to_string()}"),
      )
    }
    if raw[pos + 2] != b'\x08' {
      return Err(
        InvalidHeader(
          "unsupported gzip compression method \{raw[pos + 2].to_int().to_string()}",
        ),
      )
    }
    let flg = raw[pos + 3].to_int()
    if (flg & 0xe0) != 0 {
      return Err(InvalidHeader("reserved gzip header flags set"))
    }
    pos = pos + 10
    if (flg & 0x04) != 0 {
      let xlen = match read_u16_le_at(raw, pos) {
        Ok(v) => v
        Err(e) => return Err(e)
      }
      pos = pos + 2
      if total_len - pos < xlen {
        return Err(UnexpectedEof("truncated gzip FEXTRA header field"))
      }
      pos = pos + xlen
    }
    if (flg & 0x08) != 0 {
      pos = match skip_zero_terminated(raw, pos, "FNAME") {
        Ok(p) => p
        Err(e) => return Err(e)
      }
    }
    if (flg & 0x10) != 0 {
      pos = match skip_zero_terminated(raw, pos, "FCOMMENT") {
        Ok(p) => p
        Err(e) => return Err(e)
      }
    }
    if (flg & 0x02) != 0 {
      let expected_hcrc = match read_u16_le_at(raw, pos) {
        Ok(v) => v
        Err(e) => return Err(e)
      }
      let actual_hcrc = (crc32(raw[member_start:pos]) & 0xffffU).reinterpret_as_int()
      if expected_hcrc != actual_hcrc {
        return Err(ChecksumMismatch("gzip header FHCRC16 mismatch"))
      }
      pos = pos + 2
    }
    let (uncompressed, deflate_end) = match
      inflate_raw(raw, start=pos, max_output_bytes=max_member_output_bytes) {
      Ok(pair) => pair
      Err(e) => return Err(e)
    }
    if total_len - deflate_end < 8 {
      return Err(UnexpectedEof("unexpected EOF reading RFC 1952 trailer"))
    }
    let expected_crc = match read_u32_le_at(raw, deflate_end) {
      Ok(v) => v
      Err(e) => return Err(e)
    }
    let expected_isize = match read_u32_le_at(raw, deflate_end + 4) {
      Ok(v) => v
      Err(e) => return Err(e)
    }
    let actual_crc = crc32(uncompressed)
    if actual_crc != expected_crc {
      return Err(
        ChecksumMismatch(
          "gzip member CRC-32 mismatch at offset \{member_start.to_string()}",
        ),
      )
    }
    let actual_isize = uncompressed.length().reinterpret_as_uint()
    if actual_isize != expected_isize {
      return Err(
        SizeMismatch(
          "gzip member ISIZE mismatch at offset \{member_start.to_string()}",
        ),
      )
    }
    let member_end = deflate_end + 8
    members.push({
      compressed_offset: member_start.to_int64(),
      compressed_length: (member_end - member_start).to_int64(),
      uncompressed,
      crc32: actual_crc,
    })
    pos = member_end
  }
  Ok(members)
}

///|
/// Decompresses a single- or multi-member RFC 1952 Gzip byte stream and concatenates outputs.
pub fn decompress(
  raw : BytesView,
  max_output_bytes~ : Int32 = 67108864,
) -> Result[Bytes, GzipError] {
  let members = match
    decompress_members(raw, max_member_output_bytes=max_output_bytes) {
    Ok(ms) => ms
    Err(e) => return Err(e)
  }
  let mut total_len = 0L
  for m in members {
    total_len = total_len + m.uncompressed.length().to_int64()
    if max_output_bytes >= 0 && total_len > max_output_bytes.to_int64() {
      return Err(
        LimitExceeded("total decompressed gzip output exceeds max_output_bytes"),
      )
    }
  }
  let out = @buffer.Buffer(capacity=total_len.to_int())
  for m in members {
    out.write_bytes(m.uncompressed)
  }
  Ok(out.to_bytes())
}
