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
fn BitWriter::flush_bytes(self : BitWriter) -> Unit {
  if self.bit_cnt > 0 {
    self.buf.write_byte((self.bit_buf & 0xffU).to_byte())
    self.bit_buf = 0U
    self.bit_cnt = 0
  }
}

///|
fn reverse_bits(code : Int32, nbits : Int32) -> Int32 {
  let mut rev = 0
  let mut m = code
  for _ in 0..<nbits {
    rev = (rev << 1) | (m & 1)
    m = m >> 1
  }
  rev
}

///|
fn build_fixed_lit_lens() -> FixedArray[Int32] {
  let a = FixedArray::make(288, 0)
  for sym in 0..<288 {
    if sym <= 143 {
      a[sym] = 8
    } else if sym <= 255 {
      a[sym] = 9
    } else if sym <= 279 {
      a[sym] = 7
    } else {
      a[sym] = 8
    }
  }
  a
}

///|
fn build_fixed_lit_rev() -> FixedArray[Int32] {
  let a = FixedArray::make(288, 0)
  for sym in 0..<288 {
    if sym <= 143 {
      a[sym] = reverse_bits(48 + sym, 8)
    } else if sym <= 255 {
      a[sym] = reverse_bits(400 + (sym - 144), 9)
    } else if sym <= 279 {
      a[sym] = reverse_bits(sym - 256, 7)
    } else {
      a[sym] = reverse_bits(192 + (sym - 280), 8)
    }
  }
  a
}

///|
fn build_fixed_dist_rev() -> FixedArray[Int32] {
  let a = FixedArray::make(32, 0)
  for d in 0..<32 {
    a[d] = reverse_bits(d, 5)
  }
  a
}

///|
let fixed_lit_lens : FixedArray[Int32] = build_fixed_lit_lens()

///|
let fixed_lit_rev : FixedArray[Int32] = build_fixed_lit_rev()

///|
let fixed_dist_rev : FixedArray[Int32] = build_fixed_dist_rev()

///|
fn build_len_packed_lut() -> FixedArray[Int32] {
  let lut = FixedArray::make(259, 0)
  for length in 3..<=258 {
    let mut matched = false
    for idx in 0..<29 {
      let base = len_base[idx]
      let extra_bits = len_extra[idx]
      let span = 1 << extra_bits
      if length >= base && length < base + span {
        let sym = 257 + idx
        let extra = length - base
        lut[length] = sym | (extra << 9) | (extra_bits << 16)
        matched = true
        break
      }
    }
    if !matched {
      lut[length] = 285
    }
  }
  lut
}

///|
fn build_dist_lo_lut() -> FixedArray[Int32] {
  let lut = FixedArray::make(256, 0)
  for dist in 1..<=256 {
    for idx in 0..<16 {
      let base = dist_base[idx]
      let extra_bits = dist_extra[idx]
      let span = 1 << extra_bits
      if dist >= base && dist < base + span {
        let extra = dist - base
        lut[dist - 1] = idx | (extra << 5) | (extra_bits << 19)
        break
      }
    }
  }
  lut
}

///|
fn build_dist_hi_lut() -> FixedArray[Int32] {
  let lut = FixedArray::make(256, 0)
  for hi in 2..<256 {
    let sample_dist = (hi << 7) + 1
    let mut found = 29
    for idx in 16..<30 {
      let base = dist_base[idx]
      let extra_bits = dist_extra[idx]
      let span = 1 << extra_bits
      if sample_dist >= base && sample_dist < base + span {
        found = idx
        break
      }
    }
    lut[hi] = found
  }
  lut
}

///|
let len_packed_lut : FixedArray[Int32] = build_len_packed_lut()

///|
let dist_lo_lut : FixedArray[Int32] = build_dist_lo_lut()

///|
let dist_hi_lut : FixedArray[Int32] = build_dist_hi_lut()

///|
fn encode_dist_packed(dist : Int32) -> Int32 {
  if dist <= 256 {
    dist_lo_lut[dist - 1]
  } else {
    let d_sym = dist_hi_lut[(dist - 1) >> 7]
    let d_extra = dist - dist_base[d_sym]
    let d_bits = dist_extra[d_sym]
    d_sym | (d_extra << 5) | (d_bits << 19)
  }
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
fn hash3_masked(data : BytesView, pos : Int32, mask : Int32) -> Int32 {
  let b0 = data[pos].to_int()
  let b1 = data[pos + 1].to_int()
  let b2 = data[pos + 2].to_int()
  ((b0 * 251) ^ (b1 << 4) ^ b2) & mask
}

///|
priv struct DeflateScratch {
  head : FixedArray[Int32]
  mut prev : FixedArray[Int32]
  mut tok_l : FixedArray[Int32]
  mut tok_d : FixedArray[Int32]
  lit_freq : FixedArray[Int32]
  dist_freq : FixedArray[Int32]
  lit_lens : FixedArray[Int32]
  dist_lens : FixedArray[Int32]
  lit_rev : FixedArray[Int32]
  dist_rev : FixedArray[Int32]
  combined : FixedArray[Int32]
  rle_sym : FixedArray[Int32]
  rle_extra : FixedArray[Int32]
  cl_freq : FixedArray[Int32]
  cl_lens : FixedArray[Int32]
  cl_rev : FixedArray[Int32]
  syms : FixedArray[Int32]
  weights : FixedArray[Int64]
  parent : FixedArray[Int32]
  node_w : FixedArray[Int64]
  depth : FixedArray[Int32]
  bl_count : FixedArray[Int32]
  next_code : FixedArray[Int32]
}

///|
fn DeflateScratch::new() -> DeflateScratch {
  {
    head: FixedArray::make(32768, -1),
    prev: FixedArray::make(4096, -1),
    tok_l: FixedArray::make(4096, 0),
    tok_d: FixedArray::make(4096, -1),
    lit_freq: FixedArray::make(286, 0),
    dist_freq: FixedArray::make(30, 0),
    lit_lens: FixedArray::make(286, 0),
    dist_lens: FixedArray::make(30, 0),
    lit_rev: FixedArray::make(286, 0),
    dist_rev: FixedArray::make(30, 0),
    combined: FixedArray::make(320, 0),
    rle_sym: FixedArray::make(320, 0),
    rle_extra: FixedArray::make(320, 0),
    cl_freq: FixedArray::make(19, 0),
    cl_lens: FixedArray::make(19, 0),
    cl_rev: FixedArray::make(19, 0),
    syms: FixedArray::make(288, 0),
    weights: FixedArray::make(288, 0L),
    parent: FixedArray::make(576, -1),
    node_w: FixedArray::make(576, 0L),
    depth: FixedArray::make(576, 0),
    bl_count: FixedArray::make(16, 0),
    next_code: FixedArray::make(16, 0),
  }
}

///|
fn DeflateScratch::ensure_capacity(
  self : DeflateScratch,
  total : Int32,
) -> Unit {
  if total > self.prev.length() {
    self.prev = FixedArray::make(total, -1)
    self.tok_l = FixedArray::make(total, 0)
    self.tok_d = FixedArray::make(total, -1)
  }
}

///|
fn DeflateScratch::shrink_if_huge(self : DeflateScratch) -> Unit {
  if self.prev.length() > 1048576 {
    self.prev = FixedArray::make(4096, -1)
    self.tok_l = FixedArray::make(4096, 0)
    self.tok_d = FixedArray::make(4096, -1)
  }
}

///|
priv struct DeflateScratchSlot {
  mut in_use : Bool
  scratch : DeflateScratch
}

///|
let deflate_scratch_slot : DeflateScratchSlot = {
  in_use: false,
  scratch: DeflateScratch::new(),
}

///|
fn collect_lz77_tokens(
  data : BytesView,
  level : Int32,
  sc : DeflateScratch,
) -> Int32 {
  let total = data.length()
  sc.ensure_capacity(total)
  let hash_size = if total < 2048 {
    1024
  } else if total < 16384 {
    4096
  } else {
    32768
  }
  let hash_mask = hash_size - 1
  let head = sc.head
  for i in 0..<hash_size {
    head[i] = -1
  }
  let lit_freq = sc.lit_freq
  for i in 0..<286 {
    lit_freq[i] = 0
  }
  let dist_freq = sc.dist_freq
  for i in 0..<30 {
    dist_freq[i] = 0
  }
  let prev = sc.prev
  let tok_l = sc.tok_l
  let tok_d = sc.tok_d
  let max_chain = if level >= 6 { 64 } else { 16 }
  let mut tok_cnt = 0
  let mut pos = 0
  while pos < total {
    let mut best_len = 0
    let mut best_dist = 0
    if pos + 3 <= total {
      let h = hash3_masked(data, pos, hash_mask)
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
      let l_packed = len_packed_lut[best_len]
      let d_packed = encode_dist_packed(best_dist)
      let l_sym = l_packed & 0x1ff
      let d_sym = d_packed & 0x1f
      lit_freq[l_sym] = lit_freq[l_sym] + 1
      dist_freq[d_sym] = dist_freq[d_sym] + 1
      tok_l[tok_cnt] = l_packed
      tok_d[tok_cnt] = d_packed
      tok_cnt = tok_cnt + 1
      let advance_end = if pos + best_len - 2 <= total {
        pos + best_len
      } else {
        pos + 1
      }
      for p in (pos + 1)..<advance_end {
        if p + 2 < total {
          let hh = hash3_masked(data, p, hash_mask)
          prev[p] = head[hh]
          head[hh] = p
        }
      }
      pos = pos + best_len
    } else {
      let lit = data[pos].to_int()
      lit_freq[lit] = lit_freq[lit] + 1
      tok_l[tok_cnt] = lit
      tok_d[tok_cnt] = -1
      tok_cnt = tok_cnt + 1
      pos = pos + 1
    }
  }
  lit_freq[256] = lit_freq[256] + 1
  tok_cnt
}

///|
/// Zero-allocation Van Leeuwen two-queue Huffman tree + Kraft length-limited code length builder (`<= max_bits`).
/// Guarantees `sum(2^-len) == 1` when active symbols `>= 2`, and assigns length 1 to `(only, sibling)` when `n == 1`.
fn compute_code_lengths_into(
  freqs : FixedArray[Int32],
  num_syms : Int32,
  max_bits : Int32,
  lens : FixedArray[Int32],
  sc : DeflateScratch,
) -> Unit {
  for i in 0..<num_syms {
    lens[i] = 0
  }
  let syms = sc.syms
  let weights = sc.weights
  let mut n = 0
  for sym in 0..<num_syms {
    let f = freqs[sym]
    if f > 0 {
      syms[n] = sym
      weights[n] = f.to_int64()
      n = n + 1
    }
  }
  if n == 0 {
    return
  }
  if n == 1 {
    let only = syms[0]
    let other = if only == 0 { 1 } else { 0 }
    lens[only] = 1
    if other < num_syms {
      lens[other] = 1
    }
    return
  }
  // Insertion-sort active `(weight, sym)` ascending (n <= 286).
  for i in 1..<n {
    let key_s = syms[i]
    let key_w = weights[i]
    let mut j = i - 1
    while j >= 0 &&
          (weights[j] > key_w || (weights[j] == key_w && syms[j] > key_s)) {
      syms[j + 1] = syms[j]
      weights[j + 1] = weights[j]
      j = j - 1
    }
    syms[j + 1] = key_s
    weights[j + 1] = key_w
  }
  let parent = sc.parent
  let node_w = sc.node_w
  let depth = sc.depth
  for i in 0..<n {
    node_w[i] = weights[i]
    parent[i] = -1
  }
  let mut leaf_idx = 0
  let mut int_idx = n
  let mut next_node = n
  for _ in 0..<(n - 1) {
    let left_node = if leaf_idx < n &&
      (int_idx >= next_node || node_w[leaf_idx] <= node_w[int_idx]) {
      let id = leaf_idx
      leaf_idx = leaf_idx + 1
      id
    } else {
      let id = int_idx
      int_idx = int_idx + 1
      id
    }
    let right_node = if leaf_idx < n &&
      (int_idx >= next_node || node_w[leaf_idx] <= node_w[int_idx]) {
      let id = leaf_idx
      leaf_idx = leaf_idx + 1
      id
    } else {
      let id = int_idx
      int_idx = int_idx + 1
      id
    }
    let cur = next_node
    next_node = next_node + 1
    node_w[cur] = node_w[left_node] + node_w[right_node]
    parent[left_node] = cur
    parent[right_node] = cur
    parent[cur] = -1
  }
  let root = next_node - 1
  depth[root] = 0
  let mut node = root - 1
  while node >= 0 {
    depth[node] = depth[parent[node]] + 1
    node = node - 1
  }
  let bl_count = sc.bl_count
  for bits in 0..<=max_bits {
    bl_count[bits] = 0
  }
  let target = 1 << max_bits
  let mut kraft = 0
  for i in 0..<n {
    let d = depth[i]
    let c = if d > max_bits { max_bits } else { d }
    bl_count[c] = bl_count[c] + 1
    kraft = kraft + (1 << (max_bits - c))
  }
  while kraft > target {
    let mut bits = max_bits - 1
    while bits > 1 && bl_count[bits] == 0 {
      bits = bits - 1
    }
    bl_count[bits] = bl_count[bits] - 1
    bl_count[bits + 1] = bl_count[bits + 1] + 2
    bl_count[max_bits] = bl_count[max_bits] - 1
    kraft = kraft - 1
  }
  let mut sym_idx = 0
  let mut bits = max_bits
  while bits >= 1 {
    let cnt = bl_count[bits]
    for _ in 0..<cnt {
      lens[syms[sym_idx]] = bits
      sym_idx = sym_idx + 1
    }
    bits = bits - 1
  }
}

///|
fn build_reversed_codes_into(
  lens : FixedArray[Int32],
  num_syms : Int32,
  max_bits : Int32,
  rev_codes : FixedArray[Int32],
  sc : DeflateScratch,
) -> Unit {
  let bl_count = sc.bl_count
  for bits in 0..<=max_bits {
    bl_count[bits] = 0
  }
  for sym in 0..<num_syms {
    let l = lens[sym]
    if l > 0 {
      bl_count[l] = bl_count[l] + 1
    }
  }
  let next_code = sc.next_code
  next_code[0] = 0
  let mut code = 0
  for bits in 1..<=max_bits {
    code = (code + bl_count[bits - 1]) << 1
    next_code[bits] = code
  }
  for sym in 0..<num_syms {
    let l = lens[sym]
    if l > 0 {
      rev_codes[sym] = reverse_bits(next_code[l], l)
      next_code[l] = next_code[l] + 1
    } else {
      rev_codes[sym] = 0
    }
  }
}

///|
fn rle_encode_lengths_into(
  lens : FixedArray[Int32],
  total_len : Int32,
  cl_freq : FixedArray[Int32],
  rle_sym : FixedArray[Int32],
  rle_extra : FixedArray[Int32],
) -> Int32 {
  for s in 0..<19 {
    cl_freq[s] = 0
  }
  let mut out_len = 0
  let mut i = 0
  while i < total_len {
    let val = lens[i]
    let mut run = 1
    while i + run < total_len && lens[i + run] == val {
      run = run + 1
    }
    if val == 0 {
      let mut rem = run
      while rem >= 3 {
        if rem >= 11 {
          let chunk = if rem > 138 { 138 } else { rem }
          cl_freq[18] = cl_freq[18] + 1
          rle_sym[out_len] = 18
          rle_extra[out_len] = chunk - 11
          out_len = out_len + 1
          rem = rem - chunk
        } else {
          cl_freq[17] = cl_freq[17] + 1
          rle_sym[out_len] = 17
          rle_extra[out_len] = rem - 3
          out_len = out_len + 1
          rem = 0
        }
      }
      while rem > 0 {
        cl_freq[0] = cl_freq[0] + 1
        rle_sym[out_len] = 0
        rle_extra[out_len] = 0
        out_len = out_len + 1
        rem = rem - 1
      }
    } else {
      cl_freq[val] = cl_freq[val] + 1
      rle_sym[out_len] = val
      rle_extra[out_len] = 0
      out_len = out_len + 1
      let mut rem = run - 1
      while rem >= 3 {
        let chunk = if rem > 6 { 6 } else { rem }
        cl_freq[16] = cl_freq[16] + 1
        rle_sym[out_len] = 16
        rle_extra[out_len] = chunk - 3
        out_len = out_len + 1
        rem = rem - chunk
      }
      while rem > 0 {
        cl_freq[val] = cl_freq[val] + 1
        rle_sym[out_len] = val
        rle_extra[out_len] = 0
        out_len = out_len + 1
        rem = rem - 1
      }
    }
    i = i + run
  }
  out_len
}

///|
fn compute_extra_bits(
  lit_freq : FixedArray[Int32],
  dist_freq : FixedArray[Int32],
) -> Int64 {
  let mut bits = 0L
  for k in 0..<29 {
    let c = lit_freq[257 + k].to_int64()
    if c > 0L {
      bits = bits + c * len_extra[k].to_int64()
    }
  }
  for d in 0..<30 {
    let c = dist_freq[d].to_int64()
    if c > 0L {
      bits = bits + c * dist_extra[d].to_int64()
    }
  }
  bits
}

///|
fn compute_fixed_bits(
  lit_freq : FixedArray[Int32],
  dist_freq : FixedArray[Int32],
  extra_bits : Int64,
) -> Int64 {
  let mut bits = 3L + extra_bits
  for sym in 0..<286 {
    let c = lit_freq[sym].to_int64()
    if c > 0L {
      bits = bits + c * fixed_lit_lens[sym].to_int64()
    }
  }
  for d in 0..<30 {
    let c = dist_freq[d].to_int64()
    if c > 0L {
      bits = bits + c * 5L
    }
  }
  bits
}

///|
fn encode_fixed_tokens(
  sc : DeflateScratch,
  tok_cnt : Int32,
  est_cap : Int32,
) -> Bytes {
  let bw = BitWriter::new(capacity=est_cap)
  bw.write_bits_lsb(1, 1)
  bw.write_bits_lsb(1, 2)
  let tok_l = sc.tok_l
  let tok_d = sc.tok_d
  for i in 0..<tok_cnt {
    let d_packed = tok_d[i]
    if d_packed < 0 {
      let lit = tok_l[i]
      bw.write_bits_lsb(fixed_lit_rev[lit], fixed_lit_lens[lit])
    } else {
      let l_packed = tok_l[i]
      let l_sym = l_packed & 0x1ff
      let l_extra = (l_packed >> 9) & 0x1f
      let l_bits = (l_packed >> 16) & 0x7
      bw.write_bits_lsb(fixed_lit_rev[l_sym], fixed_lit_lens[l_sym])
      if l_bits > 0 {
        bw.write_bits_lsb(l_extra, l_bits)
      }
      let d_sym = d_packed & 0x1f
      let d_extra = (d_packed >> 5) & 0x1fff
      let d_bits = (d_packed >> 19) & 0xf
      bw.write_bits_lsb(fixed_dist_rev[d_sym], 5)
      if d_bits > 0 {
        bw.write_bits_lsb(d_extra, d_bits)
      }
    }
  }
  bw.write_bits_lsb(fixed_lit_rev[256], fixed_lit_lens[256])
  bw.flush_bytes()
  bw.buf.to_bytes()
}

///|
fn prepare_dynamic_tables(
  sc : DeflateScratch,
  extra_bits : Int64,
) -> (Int32, Int32, Int32, Int32, Int64) {
  let lit_freq = sc.lit_freq
  let dist_freq = sc.dist_freq
  let lit_lens = sc.lit_lens
  let dist_lens = sc.dist_lens
  compute_code_lengths_into(lit_freq, 286, 15, lit_lens, sc)
  compute_code_lengths_into(dist_freq, 30, 15, dist_lens, sc)
  let mut hlit = 286
  while hlit > 257 && lit_lens[hlit - 1] == 0 {
    hlit = hlit - 1
  }
  let mut hdist = 30
  while hdist > 1 && dist_lens[hdist - 1] == 0 {
    hdist = hdist - 1
  }
  let combined = sc.combined
  for i in 0..<hlit {
    combined[i] = lit_lens[i]
  }
  for i in 0..<hdist {
    combined[hlit + i] = dist_lens[i]
  }
  let cl_freq = sc.cl_freq
  let rle_sym = sc.rle_sym
  let rle_extra = sc.rle_extra
  let rle_len = rle_encode_lengths_into(
    combined,
    hlit + hdist,
    cl_freq,
    rle_sym,
    rle_extra,
  )
  let cl_lens = sc.cl_lens
  compute_code_lengths_into(cl_freq, 19, 7, cl_lens, sc)
  let mut hclen = 19
  while hclen > 4 && cl_lens[codelen_order[hclen - 1]] == 0 {
    hclen = hclen - 1
  }
  let mut bits = (17 + 3 * hclen).to_int64() + extra_bits
  for s in 0..<19 {
    let c = cl_freq[s].to_int64()
    if c > 0L {
      bits = bits + c * cl_lens[s].to_int64()
    }
  }
  bits = bits +
    cl_freq[16].to_int64() * 2L +
    cl_freq[17].to_int64() * 3L +
    cl_freq[18].to_int64() * 7L
  for sym in 0..<hlit {
    let c = lit_freq[sym].to_int64()
    if c > 0L {
      bits = bits + c * lit_lens[sym].to_int64()
    }
  }
  for d in 0..<hdist {
    let c = dist_freq[d].to_int64()
    if c > 0L {
      bits = bits + c * dist_lens[d].to_int64()
    }
  }
  (hlit, hdist, hclen, rle_len, bits)
}

///|
fn encode_dynamic_tokens(
  sc : DeflateScratch,
  tok_cnt : Int32,
  hlit : Int32,
  hdist : Int32,
  hclen : Int32,
  rle_len : Int32,
  out_bytes : Int32,
) -> Bytes {
  let cl_lens = sc.cl_lens
  let cl_rev = sc.cl_rev
  let lit_lens = sc.lit_lens
  let lit_rev = sc.lit_rev
  let dist_lens = sc.dist_lens
  let dist_rev = sc.dist_rev
  build_reversed_codes_into(cl_lens, 19, 7, cl_rev, sc)
  build_reversed_codes_into(lit_lens, hlit, 15, lit_rev, sc)
  build_reversed_codes_into(dist_lens, hdist, 15, dist_rev, sc)

  let bw = BitWriter::new(capacity=out_bytes + 4)
  bw.write_bits_lsb(1, 1)
  bw.write_bits_lsb(2, 2)
  bw.write_bits_lsb(hlit - 257, 5)
  bw.write_bits_lsb(hdist - 1, 5)
  bw.write_bits_lsb(hclen - 4, 4)
  for i in 0..<hclen {
    bw.write_bits_lsb(cl_lens[codelen_order[i]], 3)
  }
  let rle_sym = sc.rle_sym
  let rle_extra = sc.rle_extra
  for i in 0..<rle_len {
    let sym = rle_sym[i]
    bw.write_bits_lsb(cl_rev[sym], cl_lens[sym])
    if sym == 16 {
      bw.write_bits_lsb(rle_extra[i], 2)
    } else if sym == 17 {
      bw.write_bits_lsb(rle_extra[i], 3)
    } else if sym == 18 {
      bw.write_bits_lsb(rle_extra[i], 7)
    }
  }
  let tok_l = sc.tok_l
  let tok_d = sc.tok_d
  for i in 0..<tok_cnt {
    let d_packed = tok_d[i]
    if d_packed < 0 {
      let lit = tok_l[i]
      bw.write_bits_lsb(lit_rev[lit], lit_lens[lit])
    } else {
      let l_packed = tok_l[i]
      let l_sym = l_packed & 0x1ff
      let l_extra = (l_packed >> 9) & 0x1f
      let l_bits = (l_packed >> 16) & 0x7
      bw.write_bits_lsb(lit_rev[l_sym], lit_lens[l_sym])
      if l_bits > 0 {
        bw.write_bits_lsb(l_extra, l_bits)
      }
      let d_sym = d_packed & 0x1f
      let d_extra = (d_packed >> 5) & 0x1fff
      let d_bits = (d_packed >> 19) & 0xf
      bw.write_bits_lsb(dist_rev[d_sym], dist_lens[d_sym])
      if d_bits > 0 {
        bw.write_bits_lsb(d_extra, d_bits)
      }
    }
  }
  bw.write_bits_lsb(lit_rev[256], lit_lens[256])
  bw.flush_bytes()
  bw.buf.to_bytes()
}

///|
fn clamp_capacity_i32(n : Int64) -> Int32 {
  if n <= 0L {
    16
  } else if n > 2147483640L {
    2147483640
  } else {
    n.to_int()
  }
}

///|
/// Compresses `data` into an RFC 1951 DEFLATE raw stream (`level == 0` uses Stored blocks;
/// `level 1..5` uses LZ77 + Fixed Huffman; `level >= 6` selects the smallest of Dynamic Huffman `BTYPE=2`, Fixed Huffman `BTYPE=1`, and Stored `BTYPE=0`).
pub fn deflate_raw(data : BytesView, level~ : Int32 = 6) -> Bytes {
  if level <= 0 {
    return deflate_stored(data)
  }
  let total = data.length()
  if total == 0 {
    let bw = BitWriter::new(capacity=8)
    bw.write_bits_lsb(1, 1)
    bw.write_bits_lsb(1, 2)
    bw.write_bits_lsb(fixed_lit_rev[256], fixed_lit_lens[256])
    bw.flush_bytes()
    return bw.buf.to_bytes()
  }
  let owns_slot = !deflate_scratch_slot.in_use
  let sc = if owns_slot {
    deflate_scratch_slot.in_use = true
    deflate_scratch_slot.scratch
  } else {
    DeflateScratch::new()
  }
  let tok_cnt = collect_lz77_tokens(data, level, sc)
  let extra_bits = compute_extra_bits(sc.lit_freq, sc.dist_freq)
  let fixed_bits = compute_fixed_bits(sc.lit_freq, sc.dist_freq, extra_bits)
  let fixed_bytes_i64 = (fixed_bits + 7L) / 8L
  let out = if level >= 6 && total >= 64 {
    let (hlit, hdist, hclen, rle_len, dyn_bits) = prepare_dynamic_tables(
      sc, extra_bits,
    )
    let dyn_bytes_i64 = (dyn_bits + 7L) / 8L
    let total_i64 = total.to_int64()
    let stored_bytes_i64 = total_i64 + 5L * ((total_i64 + 65534L) / 65535L)
    let best_huff = if dyn_bytes_i64 < fixed_bytes_i64 {
      dyn_bytes_i64
    } else {
      fixed_bytes_i64
    }
    if stored_bytes_i64 < best_huff {
      deflate_stored(data)
    } else if dyn_bytes_i64 < fixed_bytes_i64 {
      encode_dynamic_tokens(
        sc,
        tok_cnt,
        hlit,
        hdist,
        hclen,
        rle_len,
        clamp_capacity_i32(dyn_bytes_i64),
      )
    } else {
      encode_fixed_tokens(sc, tok_cnt, clamp_capacity_i32(fixed_bytes_i64 + 4L))
    }
  } else {
    encode_fixed_tokens(sc, tok_cnt, clamp_capacity_i32(fixed_bytes_i64 + 4L))
  }
  if owns_slot {
    sc.shrink_if_huge()
    deflate_scratch_slot.in_use = false
  }
  out
}
