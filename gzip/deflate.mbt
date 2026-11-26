///|
priv struct BitWriter {
  buf : @buffer.Buffer
  mut bit_buf : UInt32
  mut bit_cnt : Int32
}

///|
fn BitWriter::new(capacity~ : Int32 = 256) -> BitWriter {
  { buf: @buffer.Buffer(capacity~), bit_buf: 0U, bit_cnt: 0, }
}

///|
fn BitWriter::write_bits_lsb(
  self : BitWriter,
  val : Int32,
  nbits : Int32,
) -> Unit {
  self.bit_buf = self.bit_buf | (val.reinterpret_as_uint() << self.bit_cnt)
  self.bit_cnt = self.bit_cnt + nbits
  while self.bit_cnt >= 8 {
    self.buf.write_byte((self.bit_buf & 0xffU).to_byte())
    self.bit_buf = self.bit_buf >> 8
    self.bit_cnt = self.bit_cnt - 8
  }
}

///|
fn BitWriter::write_bits_msb(
  self : BitWriter,
  code : Int32,
  nbits : Int32,
) -> Unit {
  let mut shift = nbits - 1
  while shift >= 0 {
    let bit = (code >> shift) & 1
    self.write_bits_lsb(bit, 1)
    shift = shift - 1
  }
}

///|
fn BitWriter::flush_bytes(self : BitWriter) -> Unit {
  if self.bit_cnt > 0 {
    self.buf.write_byte((self.bit_buf & 0xffU).to_byte())
    self.bit_buf = 0U
    self.bit_cnt = 0
  }
}

///|
fn write_fixed_literal(bw : BitWriter, sym : Int32) -> Unit {
  if sym <= 143 {
    bw.write_bits_msb(48 + sym, 8)
  } else if sym <= 255 {
    bw.write_bits_msb(400 + (sym - 144), 9)
  } else if sym <= 279 {
    bw.write_bits_msb(sym - 256, 7)
  } else {
    bw.write_bits_msb(192 + (sym - 280), 8)
  }
}

///|
fn encode_length_code(length : Int32) -> (Int32, Int32, Int32) {
  for idx in 0..<29 {
    let base = len_base[idx]
    let extra_bits = len_extra[idx]
    let span = 1 << extra_bits
    if length >= base && length < base + span {
      return (257 + idx, length - base, extra_bits)
    }
  }
  (285, 0, 0)
}

///|
fn encode_dist_code(dist : Int32) -> (Int32, Int32, Int32) {
  for idx in 0..<30 {
    let base = dist_base[idx]
    let extra_bits = dist_extra[idx]
    let span = 1 << extra_bits
    if dist >= base && dist < base + span {
      return (idx, dist - base, extra_bits)
    }
  }
  (29, dist - dist_base[29], dist_extra[29])
}

///|
fn deflate_stored(data : BytesView) -> Bytes {
  let total = data.length()
  let bw = BitWriter::new(capacity=total + 16)
  if total == 0 {
    bw.write_bits_lsb(1, 1)
    bw.write_bits_lsb(0, 2)
    bw.flush_bytes()
    bw.buf.write_byte(b'\x00')
    bw.buf.write_byte(b'\x00')
    bw.buf.write_byte(b'\xff')
    bw.buf.write_byte(b'\xff')
    return bw.buf.to_bytes()
  }
  let mut pos = 0
  while pos < total {
    let rem = total - pos
    let blk_len = if rem > 65535 { 65535 } else { rem }
    let is_final = if pos + blk_len >= total { 1 } else { 0 }
    bw.write_bits_lsb(is_final, 1)
    bw.write_bits_lsb(0, 2)
    bw.flush_bytes()
    let len = blk_len
    let nlen = len ^ 0xffff
    bw.buf.write_byte((len & 0xff).to_byte())
    bw.buf.write_byte(((len >> 8) & 0xff).to_byte())
    bw.buf.write_byte((nlen & 0xff).to_byte())
    bw.buf.write_byte(((nlen >> 8) & 0xff).to_byte())
    bw.buf.write_bytesview(data[pos:pos + blk_len])
    pos = pos + blk_len
  }
  bw.buf.to_bytes()
}

///|
fn hash3(data : BytesView, pos : Int32) -> Int32 {
  let b0 = data[pos].to_int()
  let b1 = data[pos + 1].to_int()
  let b2 = data[pos + 2].to_int()
  ((b0 << 10) ^ (b1 << 5) ^ b2) & 0x7fff
}

///|
/// Compresses `data` into an RFC 1951 DEFLATE raw stream (`level == 0` uses Stored blocks;
/// `level >= 1` uses LZ77 + Fixed Huffman coding).
pub fn deflate_raw(data : BytesView, level~ : Int32 = 6) -> Bytes {
  if level <= 0 {
    return deflate_stored(data)
  }
  let total = data.length()
  let bw = BitWriter::new(capacity=total / 2 + 16)
  // BFINAL = 1, BTYPE = 1 (Fixed Huffman)
  bw.write_bits_lsb(1, 1)
  bw.write_bits_lsb(1, 2)
  if total == 0 {
    write_fixed_literal(bw, 256)
    bw.flush_bytes()
    return bw.buf.to_bytes()
  }
  let max_chain = if level >= 6 { 64 } else { 16 }
  let head = FixedArray::make(32768, -1)
  let prev = FixedArray::make(total, -1)
  let mut pos = 0
  while pos < total {
    let mut best_len = 0
    let mut best_dist = 0
    if pos + 3 <= total {
      let h = hash3(data, pos)
      let mut cand = head[h]
      prev[pos] = cand
      head[h] = pos
      let min_pos = if pos > 32768 { pos - 32768 } else { 0 }
      let max_match = if total - pos > 258 { 258 } else { total - pos }
      let mut steps = 0
      while cand >= min_pos && steps < max_chain {
        if best_len < 3 || data[cand + best_len] == data[pos + best_len] {
          let mut m = 0
          while m < max_match && data[cand + m] == data[pos + m] {
            m = m + 1
          }
          if m >= 3 && m > best_len {
            best_len = m
            best_dist = pos - cand
            if best_len == max_match {
              break
            }
          }
        }
        cand = prev[cand]
        steps = steps + 1
      }
    }
    if best_len >= 3 {
      let (l_sym, l_extra, l_bits) = encode_length_code(best_len)
      write_fixed_literal(bw, l_sym)
      if l_bits > 0 {
        bw.write_bits_lsb(l_extra, l_bits)
      }
      let (d_sym, d_extra, d_bits) = encode_dist_code(best_dist)
      bw.write_bits_msb(d_sym, 5)
      if d_bits > 0 {
        bw.write_bits_lsb(d_extra, d_bits)
      }
      let advance_end = if pos + best_len - 2 <= total {
        pos + best_len
      } else {
        pos + 1
      }
      for p in (pos + 1)..<advance_end {
        if p + 2 < total {
          let hh = hash3(data, p)
          prev[p] = head[hh]
          head[hh] = p
        }
      }
      pos = pos + best_len
    } else {
      write_fixed_literal(bw, data[pos].to_int())
      pos = pos + 1
    }
  }
  write_fixed_literal(bw, 256)
  bw.flush_bytes()
  bw.buf.to_bytes()
}
