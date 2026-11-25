///|
test "sha1 RFC 3174 vectors" {
  assert_eq(
    @digest.hex_encode(@digest.sha1(b"")),
    "da39a3ee5e6b4b0d3255bfef95601890afd80709",
  )
  assert_eq(
    @digest.hex_encode(@digest.sha1(b"abc")),
    "a9993e364706816aba3e25717850c26c9cd0d89d",
  )
  assert_eq(
    @digest.hex_encode(
      @digest.sha1(b"abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"),
    ),
    "84983e441c3bd26ebaae4aa1f95129e5e54670f1",
  )
}

///|
test "sha256 FIPS 180-4 vectors" {
  assert_eq(
    @digest.hex_encode(@digest.sha256(b"")),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  )
  assert_eq(
    @digest.hex_encode(@digest.sha256(b"abc")),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  )
  assert_eq(
    @digest.hex_encode(
      @digest.sha256(
        b"abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq",
      ),
    ),
    "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1",
  )
}

///|
test "sha1 and sha256 block-boundary lengths and incremental feeding" {
  for len in [55, 56, 63, 64, 65, 119, 120, 128, 129] {
    let payload = Bytes::makei(len, i => (i * 31 % 251).to_byte())
    let expected1 = @digest.sha1(payload)
    let expected256 = @digest.sha256(payload)
    for chunk in [1, 3, 7, 17, 64] {
      let h1 = @digest.Sha1Hasher::new()
      let h256 = @digest.Sha256Hasher::new()
      let mut pos = 0
      while pos < len {
        let end = if pos + chunk > len { len } else { pos + chunk }
        h1.update(payload[pos:end])
        h256.update(payload[pos:end])
        pos = end
      }
      assert_eq(h1.finalize(), expected1)
      assert_eq(h256.finalize(), expected256)
    }
  }
}

///|
test "base32 RFC 4648 vectors" {
  let cases : Array[(Bytes, String)] = [
    (b"", ""),
    (b"f", "MY======"),
    (b"fo", "MZXQ===="),
    (b"foo", "MZXW6==="),
    (b"foob", "MZXW6YQ="),
    (b"fooba", "MZXW6YTB"),
    (b"foobar", "MZXW6YTBOI======"),
  ]
  for pair in cases {
    let (raw, enc) = pair
    assert_eq(@digest.base32_encode(raw), enc)
    assert_eq(@digest.base32_decode(enc), Ok(raw))
    assert_eq(@digest.base32_decode(enc.to_lower()), Ok(raw))
  }
  assert_eq(@digest.base32_decode("mzxw6"), Ok(b"foo"))
  assert_true(@digest.base32_decode("MZXW!===") is Err(_))
  assert_true(@digest.base32_decode("A") is Err(_))
  assert_true(@digest.base32_decode("========") is Err(_))
}

///|
test "warc digest format parse and verify" {
  let body = b"WARC/1.1 payload verification test"
  let d1 = @digest.format_warc_digest_sha1(body)
  let d256 = @digest.format_warc_digest_sha256(body)
  assert_eq(d1.length(), 5 + 32)
  assert_eq(d256.length(), 7 + 56)
  assert_eq(@digest.verify_warc_digest(d1, body), Ok(true))
  assert_eq(@digest.verify_warc_digest(d256, body), Ok(true))
  assert_eq(
    @digest.verify_warc_digest(
      "sha1:" + @digest.hex_encode(@digest.sha1(body)),
      body,
    ),
    Ok(true),
  )
  assert_eq(
    @digest.verify_warc_digest(
      "sha256:" + @digest.hex_encode(@digest.sha256(body)),
      body,
    ),
    Ok(true),
  )
  assert_eq(@digest.verify_warc_digest(d1, b"tampered"), Ok(false))
  assert_eq(@digest.verify_warc_digest(d256, b"tampered"), Ok(false))
  assert_true(
    @digest.verify_warc_digest("md5:d41d8cd98f00b204e9800998ecf8427e", b"")
    is Err(_),
  )
  assert_true(@digest.parse_warc_digest("badformat") is Err(_))
  assert_true(@digest.parse_warc_digest("sha1:TOOSHORT") is Err(_))
  assert_true(@digest.parse_warc_digest("sha256:TOOSHORT") is Err(_))
}

///|
test "digest hex uppercase and whitespace tolerance" {
  let msg = b"ISO 28500 WARC digest test"
  let upper_sha1 = "sha1: " + @digest.hex_encode(@digest.sha1(msg)).to_upper()
  let upper_sha256 = " SHA256 : " +
    @digest.hex_encode(@digest.sha256(msg)).to_upper()
  assert_eq(@digest.verify_warc_digest(upper_sha1, msg), Ok(true))
  assert_eq(@digest.verify_warc_digest(upper_sha256, msg), Ok(true))
}

///|
test "digest decode error edge cases" {
  assert_true(@digest.hex_decode("abc") is Err(_))
  assert_true(@digest.hex_decode("zzzz") is Err(_))
  assert_true(@digest.base32_decode("MZXW6===") is Ok(_))
  assert_true(@digest.base32_decode("MZXW6==") is Err(_))
  assert_true(@digest.base32_decode("MY======A") is Err(_))
  assert_true(@digest.parse_warc_digest("sha1:") is Err(_))
  assert_true(@digest.parse_warc_digest(":abc") is Err(_))
}
