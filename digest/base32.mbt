///|
/// Errors raised or returned during digest encoding, decoding, and verification.
#derive(Eq, Debug)
pub(all) enum DigestError {
  InvalidAlgorithm(String)
  InvalidEncoding(String)
  InvalidFormat(String)
  InvalidLength(String)
}

///|
let base32_alphabet : String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

///|
let hex_alphabet : String = "0123456789abcdef"

///|
fn base32_char(idx : Int32) -> Char {
  base32_alphabet[idx].to_int().to_char().unwrap()
}

///|
fn hex_char(idx : Int32) -> Char {
  hex_alphabet[idx].to_int().to_char().unwrap()
}

///|
fn decode_base32_val(code : Int32) -> Int32? {
  if code >= 65 && code <= 90 {
    Some(code - 65)
  } else if code >= 97 && code <= 122 {
    Some(code - 97)
  } else if code >= 50 && code <= 55 {
    Some(code - 50 + 26)
  } else {
    None
  }
}

///|
fn decode_hex_val(code : Int32) -> Int32? {
  if code >= 48 && code <= 57 {
    Some(code - 48)
  } else if code >= 97 && code <= 102 {
    Some(code - 97 + 10)
  } else if code >= 65 && code <= 70 {
    Some(code - 65 + 10)
  } else {
    None
  }
}

///|
/// Encodes raw bytes using RFC 4648 uppercase Base32 with `=` padding.
pub fn base32_encode(data : BytesView) -> String {
  let len = data.length()
  if len == 0 {
    return ""
  }
  let sb = StringBuilder()
  let mut i = 0
  while i < len {
    let b0 = data[i].to_int()
    let has1 = i + 1 < len
    let has2 = i + 2 < len
    let has3 = i + 3 < len
    let has4 = i + 4 < len
    let b1 = if has1 { data[i + 1].to_int() } else { 0 }
    let b2 = if has2 { data[i + 2].to_int() } else { 0 }
    let b3 = if has3 { data[i + 3].to_int() } else { 0 }
    let b4 = if has4 { data[i + 4].to_int() } else { 0 }
    let c0 = (b0 >> 3) & 0x1f
    let c1 = ((b0 & 0x07) << 2) | ((b1 >> 6) & 0x03)
    let c2 = (b1 >> 1) & 0x1f
    let c3 = ((b1 & 0x01) << 4) | ((b2 >> 4) & 0x0f)
    let c4 = ((b2 & 0x0f) << 1) | ((b3 >> 7) & 0x01)
    let c5 = (b3 >> 2) & 0x1f
    let c6 = ((b3 & 0x03) << 3) | ((b4 >> 5) & 0x07)
    let c7 = b4 & 0x1f
    sb.write_char(base32_char(c0))
    sb.write_char(base32_char(c1))
    sb.write_char(if has1 { base32_char(c2) } else { '=' })
    sb.write_char(if has1 { base32_char(c3) } else { '=' })
    sb.write_char(if has2 { base32_char(c4) } else { '=' })
    sb.write_char(if has3 { base32_char(c5) } else { '=' })
    sb.write_char(if has3 { base32_char(c6) } else { '=' })
    sb.write_char(if has4 { base32_char(c7) } else { '=' })
    i = i + 5
  }
  sb.to_string()
}

///|
/// Decodes an RFC 4648 Base32 string (case-insensitive, padded or unpadded).
pub fn base32_decode(encoded : StringView) -> Result[Bytes, DigestError] {
  let raw = encoded.to_owned()
  let mut end = raw.length()
  let mut pad_count = 0
  while end > 0 && raw[end - 1].to_int() == 61 {
    end = end - 1
    pad_count = pad_count + 1
  }
  if pad_count > 0 && raw.length() % 8 != 0 {
    return Err(InvalidEncoding("padded Base32 length must be a multiple of 8"))
  }
  if pad_count > 6 {
    return Err(InvalidEncoding("too many Base32 padding characters"))
  }
  if end == 0 {
    if pad_count > 0 {
      return Err(InvalidEncoding("Base32 input cannot consist only of padding"))
    }
    return Ok(b"")
  }
  let rem = end % 8
  if rem == 1 || rem == 3 || rem == 6 {
    return Err(InvalidEncoding("invalid Base32 non-padding character count"))
  }
  let out = @buffer.Buffer(capacity=end * 5 / 8 + 1)
  let mut buf_bits = 0
  let mut bits_left = 0
  for i in 0..<end {
    let code = raw[i].to_int()
    match decode_base32_val(code) {
      Some(v) => {
        buf_bits = (buf_bits << 5) | v
        bits_left = bits_left + 5
        if bits_left >= 8 {
          bits_left = bits_left - 8
          out.write_byte(((buf_bits >> bits_left) & 0xff).to_byte())
        }
      }
      None =>
        return Err(
          InvalidEncoding("invalid Base32 character at index \{i.to_string()}"),
        )
    }
  }
  if bits_left > 0 {
    let mask = (1 << bits_left) - 1
    if (buf_bits & mask) != 0 {
      return Err(InvalidEncoding("non-zero Base32 trailing padding bits"))
    }
  }
  Ok(out.to_bytes())
}

///|
/// Encodes raw bytes as lowercase hexadecimal.
pub fn hex_encode(data : BytesView) -> String {
  let sb = StringBuilder()
  for i in 0..<data.length() {
    let v = data[i].to_int()
    sb.write_char(hex_char((v >> 4) & 0x0f))
    sb.write_char(hex_char(v & 0x0f))
  }
  sb.to_string()
}

///|
/// Decodes a hexadecimal string (case-insensitive) into raw bytes.
pub fn hex_decode(encoded : StringView) -> Result[Bytes, DigestError] {
  let s = encoded.to_owned()
  let len = s.length()
  if len % 2 != 0 {
    return Err(InvalidEncoding("hex string must have even length"))
  }
  let out = @buffer.Buffer(capacity=len / 2)
  let mut i = 0
  while i < len {
    let hi = decode_hex_val(s[i].to_int())
    let lo = decode_hex_val(s[i + 1].to_int())
    match (hi, lo) {
      (Some(h), Some(l)) => out.write_byte(((h << 4) | l).to_byte())
      _ =>
        return Err(
          InvalidEncoding("invalid hex character near index \{i.to_string()}"),
        )
    }
    i = i + 2
  }
  Ok(out.to_bytes())
}
