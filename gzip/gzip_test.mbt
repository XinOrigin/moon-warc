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
  // Truncated trailer (< 8 bytes remaining after DEFLATE end)
  assert_true(
    @gzip.decompress(gz[0:gz.length() - 5]) is Err(@gzip.UnexpectedEof(_)),
  )
}

///|
test "gzip fast-table dynamic Huffman and overlapping LZ77 distance round-trip" {
  // Overlapping RLE (dist == 1) and short repeating period (dist < match_len)
  let buf = @buffer.Buffer(capacity=4096)
  for i in 0..<256 {
    buf.write_byte((i % 251).to_byte())
  }
  for _ in 0..<512 {
    buf.write_byte(b'A')
  }
  for i in 0..<600 {
    buf.write_byte((i % 3 + 65).to_byte())
  }
  let payload = buf.to_bytes()
  for lvl in [0, 1, 6] {
    let gz = @gzip.compress(payload, level=lvl)
    assert_eq(@gzip.decompress(gz), Ok(payload))
  }
}

///|
test "gzip scan_members and try_decompress_member handle NeedMoreInput, offsets, and header error branches" {
  let m0 = @gzip.compress(b"member-zero", level=0)
  let m1 = @gzip.compress(b"member-one-repeated-repeated", level=6)
  let combined = m0 + m1
  let offsets : Array[(Int64, Int64)] = []
  assert_eq(
    @gzip.scan_members(combined, fn(m) {
      offsets.push((m.compressed_offset, m.compressed_length))
    }),
    Ok(2L),
  )
  assert_eq(offsets, [
    (0L, m0.length().to_int64()),
    (m0.length().to_int64(), m1.length().to_int64()),
  ])

  // Truncated prefixes must return NeedMoreInput instead of hard failure
  for cut in [0, 5, 9, m0.length() - 1] {
    assert_true(@gzip.try_decompress_member(m0[0:cut]) is @gzip.NeedMoreInput)
  }

  // Invalid CM != 8, reserved FLG bit, FHCRC16 mismatch, and ISIZE mismatch
  let bad_cm = b"\x1f\x8b\x09\x00\x00\x00\x00\x00\x00\x03\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00"
  assert_true(
    @gzip.try_decompress_member(bad_cm) is @gzip.Failed(@gzip.InvalidHeader(_)),
  )
  let bad_flg = b"\x1f\x8b\x08\xe0\x00\x00\x00\x00\x00\x03\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00"
  assert_true(@gzip.decompress(bad_flg) is Err(@gzip.InvalidHeader(_)))
  // FHCRC present (FLG=0x02) with bogus 16-bit header CRC
  let bad_hcrc = b"\x1f\x8b\x08\x02\x00\x00\x00\x00\x00\x03\xde\xad\x03\x00\x00\x00\x00\x00\x00\x00\x00\x00"
  assert_true(@gzip.decompress(bad_hcrc) is Err(@gzip.ChecksumMismatch(_)))
  // ISIZE mismatch (correct CRC32 for empty b"", wrong ISIZE=1)
  let bad_isize = b"\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03\x03\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00"
  assert_true(@gzip.decompress(bad_isize) is Err(@gzip.SizeMismatch(_)))
  // Reserved DEFLATE BTYPE=3 and Stored LEN/NLEN mismatch
  let bad_btype3 = b"\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03\x07\x00\x00\x00\x00\x00\x00\x00\x00\x00"
  assert_true(
    @gzip.decompress(bad_btype3) is Err(@gzip.InvalidDeflateStream(_)),
  )
  let bad_stored = b"\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
  assert_true(
    @gzip.decompress(bad_stored) is Err(@gzip.InvalidDeflateStream(_)),
  )
}

///|
test "gzip level=6 emits Dynamic Huffman BTYPE=2 smaller than Fixed BTYPE=1 and falls back to Stored on incompressible input" {
  // Repetitive 4-symbol / JSON-like WARC response benefits substantially from Dynamic Huffman (BTYPE=2)
  let rep_buf = @buffer.Buffer(capacity=2048)
  for i in 0..<40 {
    rep_buf.write_bytesview(b"{\"id\":"[:])
    rep_buf.write_bytesview(b"\"https://example.org/item/"[:])
    rep_buf.write_byte((48 + i % 10).to_byte())
    rep_buf.write_bytesview(b".html\",\"status\":200}\n"[:])
  }
  let rep_data = rep_buf.to_bytes()
  let fixed_raw = @gzip.deflate_raw(rep_data, level=1)
  let dyn_raw = @gzip.deflate_raw(rep_data, level=6)
  assert_eq(fixed_raw[0].to_int() & 0x07, 3) // BFINAL=1, BTYPE=1
  assert_eq(dyn_raw[0].to_int() & 0x07, 5) // BFINAL=1, BTYPE=2
  assert_true(dyn_raw.length() < fixed_raw.length())
  let gz_dyn = @gzip.compress(rep_data, level=6)
  assert_eq(@gzip.decompress(gz_dyn), Ok(rep_data))

  // Single-symbol (only 1 dist symbol after match) + uniform byte run
  let single = Bytes::make(512, b'Z')
  assert_eq(@gzip.decompress(@gzip.compress(single, level=6)), Ok(single))

  // Pseudo-random incompressible 512B LCG input selects Stored (BTYPE=0) cleanly
  let rand_bytes = Bytes::makei(512, i => {
    let mut s = (i.reinterpret_as_uint() + 1U) * 747796405U + 2891336453U
    s = (s ^ (s >> 16)) * 2246822519U
    ((s >> 16) & 0xffU).to_byte()
  })
  let raw_rand = @gzip.deflate_raw(rand_bytes, level=6)
  assert_eq(raw_rand[0].to_int() & 0x07, 1) // BFINAL=1, BTYPE=0 Stored
  assert_eq(
    @gzip.decompress(@gzip.compress(rand_bytes, level=6)),
    Ok(rand_bytes),
  )

  // Long-distance (> 256B and > 4096B) match round-trip exercises dist_hi_lut + adaptive hash
  let long_buf = @buffer.Buffer(capacity=6144)
  long_buf.write_bytesview(
    b"LONG-DIST-ANCHOR-0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ!"[:],
  )
  for i in 0..<4200 {
    long_buf.write_byte((65 + i * 7 % 26).to_byte())
  }
  long_buf.write_bytesview(
    b"LONG-DIST-ANCHOR-0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ!"[:],
  )
  let long_data = long_buf.to_bytes()
  assert_eq(@gzip.decompress(@gzip.compress(long_data, level=6)), Ok(long_data))
}

///|
test "gzip scan_members_while supports early stop and re-entrant decompress" {
  let inner_gz = @gzip.compress(b"nested-payload-check", level=6)
  let m0 = @gzip.compress(b"first-member-aaaaaaaaaaaaaaaaaaaa", level=6)
  let m1 = @gzip.compress(b"second-member-bbbbbbbbbbbbbbbbbbb", level=6)
  let stream = m0 + m1
  let seen : Array[Bytes] = []
  let inner_seen : Array[Result[Bytes, @gzip.GzipError]] = []
  let res = @gzip.scan_members_while(stream, fn(m) {
    // Re-entrant decompress inside active scan_members_while must not clobber scratch
    inner_seen.push(@gzip.decompress(inner_gz))
    seen.push(m.uncompressed)
    false
  })
  assert_eq(res, Ok(1L))
  assert_eq(seen, [b"first-member-aaaaaaaaaaaaaaaaaaaa"])
  assert_eq(inner_seen, [Ok(b"nested-payload-check")])
}

///|
test "gzip enforces aggregate max_output_bytes across multi-member stream and rejects invalid inflate start" {
  assert_eq(@gzip.decompress(b""), Ok(b""))
  let m10_a = @gzip.compress(Bytes::make(10, b'A'), level=6)
  let m10_b = @gzip.compress(Bytes::make(10, b'B'), level=6)
  assert_eq(
    @gzip.decompress(m10_a + m10_b, max_output_bytes=20),
    Ok(Bytes::make(10, b'A') + Bytes::make(10, b'B')),
  )
  assert_true(
    @gzip.decompress(m10_a + m10_b, max_output_bytes=19)
    is Err(@gzip.LimitExceeded(_)),
  )

  // 8 x 100 KiB members stay individually below 256 KiB limit, but must abort mid-member at aggregate cap
  let m100k = @gzip.compress(Bytes::make(102400, b'Z'), level=6)
  let mut bomb = b""
  for _ in 0..<8 {
    bomb = bomb + m100k
  }
  assert_true(
    @gzip.decompress(bomb, max_output_bytes=262144)
    is Err(@gzip.LimitExceeded(_)),
  )

  let raw_def = @gzip.deflate_raw(b"hello", level=6)
  assert_true(
    @gzip.inflate_raw(raw_def, start=-1) is Err(@gzip.InvalidDeflateStream(_)),
  )
  assert_true(
    @gzip.inflate_raw(raw_def, start=raw_def.length() + 1)
    is Err(@gzip.InvalidDeflateStream(_)),
  )
}

///|
test "gzip handles >65535B multi-block Stored and >32KiB LZ77 window at level 0 and 6" {
  let raw = Bytes::makei(70000, i => {
    let mut s = (i.reinterpret_as_uint() + 1U) * 747796405U + 2891336453U
    s = (s ^ (s >> 16)) * 2246822519U
    ((s >> 16) & 0xffU).to_byte()
  })
  let anchor = b"WINDOW-32K-ANCHOR-0123456789ABCDEF"
  let big = anchor + raw + anchor
  for lvl in [0, 6] {
    let gz = @gzip.compress(big, level=lvl)
    assert_eq(@gzip.decompress(gz), Ok(big))
  }
}
