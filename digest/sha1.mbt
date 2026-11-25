///|
fn rotl32(x : UInt32, n : Int32) -> UInt32 {
  (x << n) | (x >> (32 - n))
}

///|
fn read_u32_be_fixed(buf : FixedArray[Byte], offset : Int32) -> UInt32 {
  (buf[offset].to_uint() << 24) |
  (buf[offset + 1].to_uint() << 16) |
  (buf[offset + 2].to_uint() << 8) |
  buf[offset + 3].to_uint()
}

///|
fn write_u32_be(buf : @buffer.Buffer, v : UInt32) -> Unit {
  buf.write_byte(((v >> 24) & 0xffU).to_byte())
  buf.write_byte(((v >> 16) & 0xffU).to_byte())
  buf.write_byte(((v >> 8) & 0xffU).to_byte())
  buf.write_byte((v & 0xffU).to_byte())
}

///|
/// Incremental FIPS 180-4 SHA-1 hasher.
pub struct Sha1Hasher {
  priv mut h0 : UInt32
  priv mut h1 : UInt32
  priv mut h2 : UInt32
  priv mut h3 : UInt32
  priv mut h4 : UInt32
  priv block : FixedArray[Byte]
  priv w : FixedArray[UInt32]
  priv mut block_len : Int32
  priv mut total_bytes : UInt64
}

///|
/// Creates a fresh SHA-1 hasher.
pub fn Sha1Hasher::new() -> Sha1Hasher {
  {
    h0: 0x67452301U,
    h1: 0xefcdab89U,
    h2: 0x98badcfeU,
    h3: 0x10325476U,
    h4: 0xc3d2e1f0U,
    block: FixedArray::make(64, b'\x00'),
    w: FixedArray::make(80, 0U),
    block_len: 0,
    total_bytes: 0UL,
  }
}

///|
fn Sha1Hasher::compress_block(
  self : Sha1Hasher,
  block : FixedArray[Byte],
) -> Unit {
  let w = self.w
  for i in 0..<16 {
    w[i] = read_u32_be_fixed(block, i * 4)
  }
  for i in 16..<80 {
    w[i] = rotl32(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1)
  }
  let mut a = self.h0
  let mut b = self.h1
  let mut c = self.h2
  let mut d = self.h3
  let mut e = self.h4
  for i in 0..<80 {
    let (f, k) = if i < 20 {
      ((b & c) | (b.lnot() & d), 0x5a827999U)
    } else if i < 40 {
      (b ^ c ^ d, 0x6ed9eba1U)
    } else if i < 60 {
      ((b & c) | (b & d) | (c & d), 0x8f1bbcdcU)
    } else {
      (b ^ c ^ d, 0xca62c1d6U)
    }
    let temp = rotl32(a, 5) + f + e + k + w[i]
    e = d
    d = c
    c = rotl32(b, 30)
    b = a
    a = temp
  }
  self.h0 = self.h0 + a
  self.h1 = self.h1 + b
  self.h2 = self.h2 + c
  self.h3 = self.h3 + d
  self.h4 = self.h4 + e
}

///|
/// Feeds additional input bytes into the SHA-1 hasher.
pub fn Sha1Hasher::update(self : Sha1Hasher, data : BytesView) -> Unit {
  let len = data.length()
  for i in 0..<len {
    self.block[self.block_len] = data[i]
    self.block_len = self.block_len + 1
    if self.block_len == 64 {
      self.compress_block(self.block)
      self.block_len = 0
    }
  }
  self.total_bytes = self.total_bytes + len.to_uint64()
}

///|
/// Finalizes a snapshot of the current SHA-1 state and returns the 20-byte digest.
pub fn Sha1Hasher::finalize(self : Sha1Hasher) -> Bytes {
  let clone : Sha1Hasher = {
    h0: self.h0,
    h1: self.h1,
    h2: self.h2,
    h3: self.h3,
    h4: self.h4,
    block: self.block.copy(),
    w: FixedArray::make(80, 0U),
    block_len: self.block_len,
    total_bytes: self.total_bytes,
  }
  let bit_len = clone.total_bytes * 8UL
  clone.block[clone.block_len] = b'\x80'
  clone.block_len = clone.block_len + 1
  if clone.block_len > 56 {
    while clone.block_len < 64 {
      clone.block[clone.block_len] = b'\x00'
      clone.block_len = clone.block_len + 1
    }
    clone.compress_block(clone.block)
    clone.block_len = 0
  }
  while clone.block_len < 56 {
    clone.block[clone.block_len] = b'\x00'
    clone.block_len = clone.block_len + 1
  }
  for i in 0..<8 {
    let shift = (7 - i) * 8
    clone.block[56 + i] = ((bit_len >> shift) & 0xffUL).to_byte()
  }
  clone.compress_block(clone.block)
  let out = @buffer.Buffer(capacity=20)
  write_u32_be(out, clone.h0)
  write_u32_be(out, clone.h1)
  write_u32_be(out, clone.h2)
  write_u32_be(out, clone.h3)
  write_u32_be(out, clone.h4)
  out.to_bytes()
}

///|
/// Computes the 20-byte SHA-1 digest of `data`.
pub fn sha1(data : BytesView) -> Bytes {
  let h = Sha1Hasher::new()
  h.update(data)
  h.finalize()
}
