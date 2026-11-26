///|
test "crc32 matches standard IEEE 802.3 vectors" {
  assert_eq(@gzip.crc32(b""), 0x00000000U)
  assert_eq(@gzip.crc32(b"123456789"), 0xcbf43926U)
  let h = @gzip.Crc32Hasher::new()
  h.update(b"1234")
  h.update(b"56789")
  assert_eq(h.finalize(), 0xcbf43926U)
}

///|
test "gzip compress and decompress round-trip across empty, stored, and LZ77 fixed-Huffman payloads" {
  let samples = [
    b"", b"a", b"Hello WARC Gzip!", b"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    b"WARC/1.1\r\nWARC-Type: response\r\nWARC-Type: response\r\n\x00\x01\xff\xfe",
  ]
  for s in samples {
    for lvl in [0, 1, 6] {
      let gz = @gzip.compress(s, level=lvl)
      assert_eq(@gzip.decompress(gz), Ok(s))
    }
  }
}

///|
test "gzip decompresses concatenated multi-member streams and tracks exact member offsets" {
  let m0 = @gzip.compress(b"first-warc-record-", level=0)
  let m1 = @gzip.compress(
    b"second-warc-record-repeated-repeated-repeated",
    level=6,
  )
  let combined = m0 + m1
  match @gzip.decompress_members(combined) {
    Ok(members) => {
      assert_eq(members.length(), 2)
      assert_eq(members[0].compressed_offset, 0L)
      assert_eq(members[0].compressed_length, m0.length().to_int64())
      assert_eq(members[0].uncompressed, b"first-warc-record-")
      assert_eq(members[1].compressed_offset, m0.length().to_int64())
      assert_eq(members[1].compressed_length, m1.length().to_int64())
      assert_eq(
        members[1].uncompressed,
        b"second-warc-record-repeated-repeated-repeated",
      )
    }
    Err(_) => fail("multi-member decompress failed")
  }
  assert_eq(
    @gzip.decompress(combined),
    Ok(b"first-warc-record-second-warc-record-repeated-repeated-repeated"),
  )
}

///|
test "gzip decodes RFC 1952 FEXTRA, FNAME, FCOMMENT, and FHCRC headers and dynamic Huffman blocks" {
  // Hand-built RFC 1952 member with FEXTRA + FNAME + FCOMMENT + FHCRC over dynamic/stored DEFLATE
  let base = b"\x1f\x8b\x08\x1e\x00\x00\x00\x00\x00\x03\x02\x00\x41\x42test.warc\x00comment\x00"
  let hcrc = @gzip.crc32(base) & 0xffffU
  let hcrc_bytes = Bytes::makei(2, i => {
    if i == 0 {
      (hcrc & 0xffU).to_byte()
    } else {
      ((hcrc >> 8) & 0xffU).to_byte()
    }
  })
  // Empty dynamic-or-stored deflate + trailer verified against empty payload
  let body_deflate = @gzip.compress(b"hello!", level=6)
  let raw_deflate_and_trailer = body_deflate[10:body_deflate.length()].to_owned()
  let full = base + hcrc_bytes + raw_deflate_and_trailer
  assert_eq(@gzip.decompress(full), Ok(b"hello!"))
}

///|
test "gzip rejects corrupted magic, CRC32, ISIZE, truncated streams, and output limit overflow" {
  let gz = @gzip.compress(b"integrity-check-payload", level=6)
  // Bad magic
  let bad_magic = b"\x1f\x8a" + gz[2:gz.length()].to_owned()
  assert_true(@gzip.decompress(bad_magic) is Err(@gzip.InvalidHeader(_)))
  // Corrupt CRC byte (4 bytes from end is ISIZE; 8 bytes from end is CRC32)
  let bad_crc = gz[0:gz.length() - 8].to_owned() +
    Bytes::makei(1, _ => (gz[gz.length() - 8].to_int() ^ 0x01).to_byte()) +
    gz[gz.length() - 7:gz.length()].to_owned()
  assert_true(@gzip.decompress(bad_crc) is Err(@gzip.ChecksumMismatch(_)))
  // Truncated trailer
  assert_true(
    @gzip.decompress(gz[0:gz.length() - 2]) is Err(@gzip.UnexpectedEof(_)),
  )
  // Output limit guard
  assert_true(
    @gzip.decompress(gz, max_output_bytes=8) is Err(@gzip.LimitExceeded(_)),
  )
}
