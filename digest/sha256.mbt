///|
let sha256_k : FixedArray[UInt32] = [
  0x428a2f98U, 0x71374491U, 0xb5c0fbcfU, 0xe9b5dba5U, 0x3956c25bU, 0x59f111f1U, 0x923f82a4U,
  0xab1c5ed5U, 0xd807aa98U, 0x12835b01U, 0x243185beU, 0x550c7dc3U, 0x72be5d74U, 0x80deb1feU,
  0x9bdc06a7U, 0xc19bf174U, 0xe49b69c1U, 0xefbe4786U, 0x0fc19dc6U, 0x240ca1ccU, 0x2de92c6fU,
  0x4a7484aaU, 0x5cb0a9dcU, 0x76f988daU, 0x983e5152U, 0xa831c66dU, 0xb00327c8U, 0xbf597fc7U,
  0xc6e00bf3U, 0xd5a79147U, 0x06ca6351U, 0x14292967U, 0x27b70a85U, 0x2e1b2138U, 0x4d2c6dfcU,
  0x53380d13U, 0x650a7354U, 0x766a0abbU, 0x81c2c92eU, 0x92722c85U, 0xa2bfe8a1U, 0xa81a664bU,
  0xc24b8b70U, 0xc76c51a3U, 0xd192e819U, 0xd6990624U, 0xf40e3585U, 0x106aa070U, 0x19a4c116U,
  0x1e376c08U, 0x2748774cU, 0x34b0bcb5U, 0x391c0cb3U, 0x4ed8aa4aU, 0x5b9cca4fU, 0x682e6ff3U,
  0x748f82eeU, 0x78a5636fU, 0x84c87814U, 0x8cc70208U, 0x90befffaU, 0xa4506cebU, 0xbef9a3f7U,
  0xc67178f2U,
]

///|
fn rotr32(x : UInt32, n : Int32) -> UInt32 {
  (x >> n) | (x << (32 - n))
}

///|
/// Incremental FIPS 180-4 SHA-256 hasher.
pub struct Sha256Hasher {
  h : FixedArray[UInt32]
  block : FixedArray[Byte]
  mut block_len : Int32
  mut total_bytes : UInt64
}

///|
/// Creates a fresh SHA-256 hasher.
pub fn Sha256Hasher::new() -> Sha256Hasher {
  {
    h: [
      0x6a09e667U, 0xbb67ae85U, 0x3c6ef372U, 0xa54ff53aU, 0x510e527fU, 0x9b05688cU,
      0x1f83d9abU, 0x5be0cd19U,
    ],
    block: FixedArray::make(64, b'\x00'),
    block_len: 0,
    total_bytes: 0UL,
  }
}

///|
fn Sha256Hasher::compress_block(
  self : Sha256Hasher,
  block : FixedArray[Byte],
) -> Unit {
  let w = FixedArray::make(64, 0U)
  for i in 0..<16 {
    w[i] = read_u32_be_fixed(block, i * 4)
  }
  for i in 16..<64 {
    let s0 = rotr32(w[i - 15], 7) ^ rotr32(w[i - 15], 18) ^ (w[i - 15] >> 3)
    let s1 = rotr32(w[i - 2], 17) ^ rotr32(w[i - 2], 19) ^ (w[i - 2] >> 10)
    w[i] = w[i - 16] + s0 + w[i - 7] + s1
  }
  let mut a = self.h[0]
  let mut b = self.h[1]
  let mut c = self.h[2]
  let mut d = self.h[3]
  let mut e = self.h[4]
  let mut f = self.h[5]
  let mut g = self.h[6]
  let mut h = self.h[7]
  for i in 0..<64 {
    let s1 = rotr32(e, 6) ^ rotr32(e, 11) ^ rotr32(e, 25)
    let ch = (e & f) ^ (e.lnot() & g)
    let temp1 = h + s1 + ch + sha256_k[i] + w[i]
    let s0 = rotr32(a, 2) ^ rotr32(a, 13) ^ rotr32(a, 22)
    let maj = (a & b) ^ (a & c) ^ (b & c)
    let temp2 = s0 + maj
    h = g
    g = f
    f = e
    e = d + temp1
    d = c
    c = b
    b = a
    a = temp1 + temp2
  }
  self.h[0] = self.h[0] + a
  self.h[1] = self.h[1] + b
  self.h[2] = self.h[2] + c
  self.h[3] = self.h[3] + d
  self.h[4] = self.h[4] + e
  self.h[5] = self.h[5] + f
  self.h[6] = self.h[6] + g
  self.h[7] = self.h[7] + h
}

///|
/// Feeds additional input bytes into the SHA-256 hasher.
pub fn Sha256Hasher::update(self : Sha256Hasher, data : BytesView) -> Unit {
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
/// Finalizes a snapshot of the current SHA-256 state and returns the 32-byte digest.
pub fn Sha256Hasher::finalize(self : Sha256Hasher) -> Bytes {
  let clone : Sha256Hasher = {
    h: self.h.copy(),
    block: self.block.copy(),
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
  let out = @buffer.Buffer(capacity=32)
  for i in 0..<8 {
    write_u32_be(out, clone.h[i])
  }
  out.to_bytes()
}

///|
/// Computes the 32-byte SHA-256 digest of `data`.
pub fn sha256(data : BytesView) -> Bytes {
  let h = Sha256Hasher::new()
  h.update(data)
  h.finalize()
}
