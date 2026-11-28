///|
test "wbtest ByteSink ensure_extra rejects >2GiB overflow without abort and parse_member_at caps initial sink" {
  let sink = ByteSink::new(16)
  sink.len = 2147483640
  assert_true(sink.ensure_extra(16) is Err(LimitExceeded(_)))

  assert_true(read_u16_le_at(b"ab", 2147483646) is Err(UnexpectedEof(_)))
  assert_true(read_u32_le_at(b"abcd", 2147483645) is Err(UnexpectedEof(_)))

  let sc = InflateScratch::new()
  assert_eq(
    parse_member_at(b"1234567890", 2147483640, 0L, 1024, sc),
    NeedMoreInput,
  )

  let m0 = compress(b"tiny", level=6)
  let padded = m0 + Bytes::make(120000, b'\x00')
  match parse_member_at(padded, 0, 0L, 67108864, sc) {
    Parsed(m, _) => {
      assert_eq(m.uncompressed, b"tiny")
      assert_true(sc.sink.buf.length() <= 65536)
    }
    _ => fail("expected tiny member followed by trailing bytes to parse")
  }
}
