///|
/// Errors returned by RFC 1951 DEFLATE and RFC 1952 Gzip codecs.
#derive(Eq, Debug)
pub(all) enum GzipError {
  InvalidHeader(String)
  InvalidDeflateStream(String)
  UnexpectedEof(String)
  ChecksumMismatch(String)
  SizeMismatch(String)
  LimitExceeded(String)
}

///|
priv struct BitReader {
  data : BytesView
  mut byte_pos : Int32
  mut bit_buf : UInt32
  mut bit_cnt : Int32
}

///|
fn BitReader::new(data : BytesView, start : Int32) -> BitReader {
  { data, byte_pos: start, bit_buf: 0U, bit_cnt: 0, }
}

///|
fn BitReader::ensure_bits(
  self : BitReader,
  n : Int32,
) -> Result[Unit, GzipError] {
  while self.bit_cnt < n {
    if self.byte_pos >= self.data.length() {
      return Err(UnexpectedEof("unexpected EOF inside DEFLATE bitstream"))
    }
    let b = self.data[self.byte_pos].to_uint()
    self.byte_pos = self.byte_pos + 1
    self.bit_buf = self.bit_buf | (b << self.bit_cnt)
    self.bit_cnt = self.bit_cnt + 8
  }
  Ok(())
}

///|
fn BitReader::read_bits(
  self : BitReader,
  n : Int32,
) -> Result[Int32, GzipError] {
  if n == 0 {
    return Ok(0)
  }
  match self.ensure_bits(n) {
    Err(e) => return Err(e)
    Ok(_) => ()
  }
  let mask = (1U << n) - 1U
  let val = (self.bit_buf & mask).reinterpret_as_int()
  self.bit_buf = self.bit_buf >> n
  self.bit_cnt = self.bit_cnt - n
  Ok(val)
}

///|
fn BitReader::align_to_byte(self : BitReader) -> Unit {
  let drop = self.bit_cnt % 8
  if drop > 0 {
    self.bit_buf = self.bit_buf >> drop
    self.bit_cnt = self.bit_cnt - drop
  }
}

///|
fn BitReader::read_aligned_u16_le(self : BitReader) -> Result[Int32, GzipError] {
  let lo = match self.read_bits(8) {
    Ok(v) => v
    Err(e) => return Err(e)
  }
  let hi = match self.read_bits(8) {
    Ok(v) => v
    Err(e) => return Err(e)
  }
  Ok(lo | (hi << 8))
}

///|
priv struct ByteSink {
  mut buf : FixedArray[Byte]
  mut len : Int32
}

///|
fn ByteSink::new(initial_cap : Int32) -> ByteSink {
  let cap = if initial_cap < 256 { 256 } else { initial_cap }
  { buf: FixedArray::make(cap, b'\x00'), len: 0, }
}

///|
fn ByteSink::ensure_extra(self : ByteSink, extra : Int32) -> Unit {
  if extra <= self.buf.length() - self.len {
    return
  }
  if extra > 2147483647 - self.len {
    abort("ByteSink buffer overflow")
  }
  let needed = self.len + extra
  let doubled = if self.buf.length() > 1073741823 {
    2147483647
  } else {
    self.buf.length() * 2
  }
  let new_cap = if doubled < needed { needed } else { doubled }
  let next = FixedArray::make(new_cap, b'\x00')
  for i in 0..<self.len {
    next[i] = self.buf[i]
  }
  self.buf = next
}

///|
fn ByteSink::push_byte(self : ByteSink, b : Byte) -> Unit {
  if self.len >= self.buf.length() {
    self.ensure_extra(1)
  }
  self.buf[self.len] = b
  self.len = self.len + 1
}

///|
fn ByteSink::push_slice(
  self : ByteSink,
  src : BytesView,
  start : Int32,
  n : Int32,
) -> Unit {
  if n <= 0 {
    return
  }
  self.ensure_extra(n)
  let dst = self.len
  for i in 0..<n {
    self.buf[dst + i] = src[start + i]
  }
  self.len = dst + n
}

///|
fn ByteSink::copy_match(
  self : ByteSink,
  dist : Int32,
  match_len : Int32,
) -> Unit {
  self.ensure_extra(match_len)
  let dst = self.len
  let src = dst - dist
  for i in 0..<match_len {
    self.buf[dst + i] = self.buf[src + i]
  }
  self.len = dst + match_len
}

///|
fn ByteSink::to_bytes(self : ByteSink) -> Bytes {
  Bytes::makei(self.len, i => self.buf[i])
}

///|
/// Consumes a contiguous byte slice after aligning to byte boundary.
fn BitReader::read_aligned_bytes(
  self : BitReader,
  n : Int32,
  out : ByteSink,
  max_output : Int32,
) -> Result[Unit, GzipError] {
  // Drain buffered whole bytes (if any) first, preserving exact stream cursor
  let buffered_bytes = self.bit_cnt / 8
  let unread_start = self.byte_pos - buffered_bytes
  self.byte_pos = unread_start
  self.bit_buf = 0U
  self.bit_cnt = 0
  if self.data.length() - self.byte_pos < n {
    return Err(UnexpectedEof("truncated DEFLATE stored block"))
  }
  if max_output >= 0 && max_output - out.len < n {
    return Err(
      LimitExceeded("decompressed stream exceeds max_output_bytes limit"),
    )
  }
  out.push_slice(self.data, self.byte_pos, n)
  self.byte_pos = self.byte_pos + n
  Ok(())
}

///|
fn BitReader::byte_offset_after_align(self : BitReader) -> Int32 {
  self.align_to_byte()
  let buffered_bytes = self.bit_cnt / 8
  self.byte_pos - buffered_bytes
}

///|
let huff_fast_bits : Int32 = 9

///|
let huff_fast_size : Int32 = 512

///|
let huff_fast_mask : UInt32 = 511U

///|
priv struct HuffmanTable {
  counts : FixedArray[Int32]
  symbols : FixedArray[Int32]
  fast : FixedArray[Int32]
}

///|
let max_huff_bits : Int32 = 15

///|
fn build_huffman(
  lengths : FixedArray[Int32],
  num_syms : Int32,
) -> Result[HuffmanTable, GzipError] {
  let counts = FixedArray::make(16, 0)
  for i in 0..<num_syms {
    let l = lengths[i]
    if l < 0 || l > max_huff_bits {
      return Err(InvalidDeflateStream("invalid Huffman code length"))
    }
    if l > 0 {
      counts[l] = counts[l] + 1
    }
  }
  let mut left = 1
  for len in 1..<=max_huff_bits {
    left = (left << 1) - counts[len]
    if left < 0 {
      return Err(InvalidDeflateStream("oversubscribed Huffman code tree"))
    }
  }
  let offsets = FixedArray::make(16, 0)
  let bl_code = FixedArray::make(16, 0)
  let mut c = 0
  for len in 1..<max_huff_bits {
    offsets[len + 1] = offsets[len] + counts[len]
    c = (c + counts[len]) << 1
    bl_code[len + 1] = c
  }
  let symbols = FixedArray::make(num_syms, 0)
  let fast = FixedArray::make(huff_fast_size, 0)
  for sym in 0..<num_syms {
    let l = lengths[sym]
    if l != 0 {
      symbols[offsets[l]] = sym
      offsets[l] = offsets[l] + 1
      if l <= huff_fast_bits {
        let msb_code = bl_code[l]
        bl_code[l] = msb_code + 1
        let mut rev = 0
        let mut m = msb_code
        for _ in 0..<l {
          rev = (rev << 1) | (m & 1)
          m = m >> 1
        }
        let entry = (l << 16) | sym
        let step = 1 << l
        let mut slot = rev
        while slot < huff_fast_size {
          fast[slot] = entry
          slot = slot + step
        }
      }
    }
  }
  Ok({ counts, symbols, fast, })
}

///|
fn decode_huffman(
  br : BitReader,
  table : HuffmanTable,
) -> Result[Int32, GzipError] {
  let data_len = br.data.length()
  while br.bit_cnt <= 23 && br.byte_pos < data_len {
    let b = br.data[br.byte_pos].to_uint()
    br.byte_pos = br.byte_pos + 1
    br.bit_buf = br.bit_buf | (b << br.bit_cnt)
    br.bit_cnt = br.bit_cnt + 8
  }
  let entry = table.fast[(br.bit_buf & huff_fast_mask).reinterpret_as_int()]
  if entry != 0 {
    let len = entry >> 16
    if br.bit_cnt >= len {
      br.bit_buf = br.bit_buf >> len
      br.bit_cnt = br.bit_cnt - len
      return Ok(entry & 0xffff)
    }
  }
  let mut code = 0
  let mut first = 0
  let mut index = 0
  for len in 1..<=max_huff_bits {
    let bit = match br.read_bits(1) {
      Ok(b) => b
      Err(e) => return Err(e)
    }
    code = code | bit
    let count = table.counts[len]
    if code - count < first {
      return Ok(table.symbols[index + (code - first)])
    }
    index = index + count
    first = (first + count) << 1
    code = code << 1
  }
  Err(InvalidDeflateStream("invalid Huffman code in DEFLATE stream"))
}

///|
fn build_fixed_tables() -> (HuffmanTable, HuffmanTable) {
  let lit_lens = FixedArray::make(288, 0)
  for i in 0..<144 {
    lit_lens[i] = 8
  }
  for i in 144..<256 {
    lit_lens[i] = 9
  }
  for i in 256..<280 {
    lit_lens[i] = 7
  }
  for i in 280..<288 {
    lit_lens[i] = 8
  }
  let dist_lens = FixedArray::make(32, 5)
  let lit_tbl = match build_huffman(lit_lens, 288) {
    Ok(t) => t
    Err(_) => abort("fixed lit table build failed")
  }
  let dist_tbl = match build_huffman(dist_lens, 32) {
    Ok(t) => t
    Err(_) => abort("fixed dist table build failed")
  }
  (lit_tbl, dist_tbl)
}

///|
let fixed_tables : (HuffmanTable, HuffmanTable) = build_fixed_tables()

///|
let len_base : FixedArray[Int32] = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83,
  99, 115, 131, 163, 195, 227, 258,
]

///|
let len_extra : FixedArray[Int32] = [
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5,
  5, 0,
]

///|
let dist_base : FixedArray[Int32] = [
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769,
  1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
]

///|
let dist_extra : FixedArray[Int32] = [
  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
  12, 12, 13, 13,
]

///|
let codelen_order : FixedArray[Int32] = [
  16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
]

///|
fn read_dynamic_tables(
  br : BitReader,
) -> Result[(HuffmanTable, HuffmanTable), GzipError] {
  let hlit = match br.read_bits(5) {
    Ok(v) => v + 257
    Err(e) => return Err(e)
  }
  let hdist = match br.read_bits(5) {
    Ok(v) => v + 1
    Err(e) => return Err(e)
  }
  let hclen = match br.read_bits(4) {
    Ok(v) => v + 4
    Err(e) => return Err(e)
  }
  if hlit > 286 || hdist > 30 {
    return Err(InvalidDeflateStream("invalid dynamic Huffman symbol counts"))
  }
  let cl_lens = FixedArray::make(19, 0)
  for i in 0..<hclen {
    let v = match br.read_bits(3) {
      Ok(b) => b
      Err(e) => return Err(e)
    }
    cl_lens[codelen_order[i]] = v
  }
  let cl_table = match build_huffman(cl_lens, 19) {
    Ok(t) => t
    Err(e) => return Err(e)
  }
  let total = hlit + hdist
  let all_lens = FixedArray::make(total, 0)
  let mut idx = 0
  while idx < total {
    let sym = match decode_huffman(br, cl_table) {
      Ok(s) => s
      Err(e) => return Err(e)
    }
    if sym < 16 {
      all_lens[idx] = sym
      idx = idx + 1
    } else {
      let mut rep_len = 0
      let rep_cnt = if sym == 16 {
        if idx == 0 {
          return Err(InvalidDeflateStream("code length repeat 16 at index 0"))
        }
        rep_len = all_lens[idx - 1]
        let extra = match br.read_bits(2) {
          Ok(e) => e
          Err(e) => return Err(e)
        }
        3 + extra
      } else if sym == 17 {
        let extra = match br.read_bits(3) {
          Ok(e) => e
          Err(e) => return Err(e)
        }
        3 + extra
      } else {
        let extra = match br.read_bits(7) {
          Ok(e) => e
          Err(e) => return Err(e)
        }
        11 + extra
      }
      if idx + rep_cnt > total {
        return Err(
          InvalidDeflateStream("dynamic Huffman code lengths overflow table"),
        )
      }
      for _ in 0..<rep_cnt {
        all_lens[idx] = rep_len
        idx = idx + 1
      }
    }
  }
  if all_lens[256] == 0 {
    return Err(InvalidDeflateStream("missing end-of-block symbol 256"))
  }
  let lit_lens = FixedArray::make(hlit, 0)
  for i in 0..<hlit {
    lit_lens[i] = all_lens[i]
  }
  let dist_lens = FixedArray::make(hdist, 0)
  for i in 0..<hdist {
    dist_lens[i] = all_lens[hlit + i]
  }
  let lit_tbl = match build_huffman(lit_lens, hlit) {
    Ok(t) => t
    Err(e) => return Err(e)
  }
  let dist_tbl = match build_huffman(dist_lens, hdist) {
    Ok(t) => t
    Err(e) => return Err(e)
  }
  Ok((lit_tbl, dist_tbl))
}

///|
fn inflate_huffman_block(
  br : BitReader,
  lit_tbl : HuffmanTable,
  dist_tbl : HuffmanTable,
  out : ByteSink,
  max_output : Int32,
) -> Result[Unit, GzipError] {
  while true {
    let sym = match decode_huffman(br, lit_tbl) {
      Ok(s) => s
      Err(e) => return Err(e)
    }
    if sym < 256 {
      if max_output >= 0 && max_output - out.len < 1 {
        return Err(
          LimitExceeded("decompressed stream exceeds max_output_bytes limit"),
        )
      }
      out.push_byte(sym.to_byte())
    } else if sym == 256 {
      return Ok(())
    } else {
      let l_idx = sym - 257
      if l_idx < 0 || l_idx >= 29 {
        return Err(
          InvalidDeflateStream(
            "invalid literal/length symbol \{sym.to_string()}",
          ),
        )
      }
      let extra_l = match br.read_bits(len_extra[l_idx]) {
        Ok(v) => v
        Err(e) => return Err(e)
      }
      let match_len = len_base[l_idx] + extra_l
      let d_sym = match decode_huffman(br, dist_tbl) {
        Ok(s) => s
        Err(e) => return Err(e)
      }
      if d_sym < 0 || d_sym >= 30 {
        return Err(
          InvalidDeflateStream("invalid distance symbol \{d_sym.to_string()}"),
        )
      }
      let extra_d = match br.read_bits(dist_extra[d_sym]) {
        Ok(v) => v
        Err(e) => return Err(e)
      }
      let dist = dist_base[d_sym] + extra_d
      if dist <= 0 || dist > out.len {
        return Err(
          InvalidDeflateStream("DEFLATE match distance exceeds output history"),
        )
      }
      if max_output >= 0 && max_output - out.len < match_len {
        return Err(
          LimitExceeded("decompressed stream exceeds max_output_bytes limit"),
        )
      }
      out.copy_match(dist, match_len)
    }
  }
  Ok(())
}

///|
/// Decompresses an RFC 1951 DEFLATE stream starting at `start` inside `data`,
/// returning `(decompressed_bytes, next_byte_offset_after_deflate)`.
pub fn inflate_raw(
  data : BytesView,
  start~ : Int32 = 0,
  max_output_bytes~ : Int32 = 67108864,
) -> Result[(Bytes, Int32), GzipError] {
  let br = BitReader::new(data, start)
  let rem_in = data.length() - start
  let init_cap = if rem_in > 0 {
    let est = if rem_in > 536870911 { rem_in } else { rem_in * 2 }
    if max_output_bytes >= 0 && est > max_output_bytes {
      max_output_bytes
    } else {
      est
    }
  } else {
    256
  }
  let out = ByteSink::new(init_cap)
  let mut bfinal = 0
  while bfinal == 0 {
    bfinal = match br.read_bits(1) {
      Ok(b) => b
      Err(e) => return Err(e)
    }
    let btype = match br.read_bits(2) {
      Ok(t) => t
      Err(e) => return Err(e)
    }
    if btype == 0 {
      br.align_to_byte()
      let len = match br.read_aligned_u16_le() {
        Ok(v) => v
        Err(e) => return Err(e)
      }
      let nlen = match br.read_aligned_u16_le() {
        Ok(v) => v
        Err(e) => return Err(e)
      }
      if (len ^ 0xffff) != nlen {
        return Err(InvalidDeflateStream("stored block LEN/NLEN mismatch"))
      }
      match br.read_aligned_bytes(len, out, max_output_bytes) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else if btype == 1 {
      let (lit_tbl, dist_tbl) = fixed_tables
      match
        inflate_huffman_block(br, lit_tbl, dist_tbl, out, max_output_bytes) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else if btype == 2 {
      let (lit_tbl, dist_tbl) = match read_dynamic_tables(br) {
        Ok(t) => t
        Err(e) => return Err(e)
      }
      match
        inflate_huffman_block(br, lit_tbl, dist_tbl, out, max_output_bytes) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else {
      return Err(InvalidDeflateStream("reserved DEFLATE block type 3"))
    }
  }
  let end_pos = br.byte_offset_after_align()
  Ok((out.to_bytes(), end_pos))
}
