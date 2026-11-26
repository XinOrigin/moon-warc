///|
fn make_crc32_table() -> FixedArray[UInt32] {
  let table = FixedArray::make(256, 0U)
  for i in 0..<256 {
    let mut c = i.reinterpret_as_uint()
    for _ in 0..<8 {
      if (c & 1U) != 0U {
        c = 0xedb88320U ^ (c >> 1)
      } else {
        c = c >> 1
      }
    }
    table[i] = c
  }
  table
}

///|
let crc32_table : FixedArray[UInt32] = make_crc32_table()

///|
/// Incremental IEEE 802.3 CRC-32 checksum calculator for RFC 1952 Gzip streams.
pub struct Crc32Hasher {
  priv mut state : UInt32
}

///|
/// Creates a fresh CRC-32 hasher.
pub fn Crc32Hasher::new() -> Crc32Hasher {
  { state: 0xffffffffU, }
}

///|
/// Feeds additional input bytes into the CRC-32 state.
pub fn Crc32Hasher::update(self : Crc32Hasher, data : BytesView) -> Unit {
  let mut crc = self.state
  for i in 0..<data.length() {
    let idx = ((crc ^ data[i].to_uint()) & 0xffU).reinterpret_as_int()
    crc = crc32_table[idx] ^ (crc >> 8)
  }
  self.state = crc
}

///|
/// Returns the finalized 32-bit CRC-32 digest.
pub fn Crc32Hasher::finalize(self : Crc32Hasher) -> UInt32 {
  self.state ^ 0xffffffffU
}

///|
/// Computes the IEEE 802.3 CRC-32 digest of `data`.
pub fn crc32(data : BytesView) -> UInt32 {
  let h = Crc32Hasher::new()
  h.update(data)
  h.finalize()
}
