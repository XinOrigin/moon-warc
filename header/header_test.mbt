///|
test "WarcDate strict UTC validation and leap years" {
  match @header.WarcDate::parse("2024-02-29T23:59:59Z") {
    Ok(d) => {
      assert_eq(d.year, 2024)
      assert_eq(d.month, 2)
      assert_eq(d.day, 29)
      assert_eq(d.to_cdxj_timestamp(), "20240229235959")
      assert_eq(d.to_iso_string(), "2024-02-29T23:59:59Z")
    }
    Err(_) => fail("valid leap date rejected")
  }
  match @header.WarcDate::parse("2026-11-25T12:30:45.123456Z") {
    Ok(d) => {
      assert_eq(d.fraction, Some("123456"))
      assert_eq(d.to_cdxj_timestamp(), "20261125123045")
    }
    Err(_) => fail("WARC 1.1 fractional date rejected")
  }
  assert_true(@header.WarcDate::parse("2025-02-29T00:00:00Z") is Err(_))
  assert_true(@header.WarcDate::parse("2026-04-31T00:00:00Z") is Err(_))
  assert_true(@header.WarcDate::parse("2026-11-25T24:00:00Z") is Err(_))
  assert_true(@header.WarcDate::parse("2026-11-25T00:00:60Z") is Err(_))
  assert_true(@header.WarcDate::parse("2026-11-25T00:00:00+08:00") is Err(_))
  assert_true(@header.WarcDate::parse("2026-11-25T00:00:00.Z") is Err(_))
}

///|
test "WarcHeader parses folded headers case-insensitive getters and round-trips" {
  let raw = b"WARC/1.1\r\nWARC-Type: RESPONSE\r\nWARC-Record-ID: <urn:uuid:11111111-2222-3333-4444-555555555555>\r\nWARC-Date: 2026-11-25T10:00:00Z\r\nWARC-Target-URI: https://example.org/hello\r\nWARC-Concurrent-To: <urn:uuid:aaaa>\r\nWARC-Concurrent-To: <urn:uuid:bbbb>\r\nX-Note: folded\r\n  header\r\n\tvalue\r\nContent-Length: 42"
  match @header.WarcHeader::parse(raw) {
    Ok(h) => {
      assert_eq(h.version, @header.Warc1_1)
      assert_eq(h.warc_type(), Some(@header.Response))
      assert_eq(h.content_length(), Some(42L))
      assert_eq(h.target_uri(), Some("https://example.org/hello"))
      assert_eq(h.concurrent_to(), ["<urn:uuid:aaaa>", "<urn:uuid:bbbb>"])
      assert_eq(h.get("x-note"), Some("folded header value"))
      let ser = h.serialize()
      assert_true(ser.has_suffix(b"\r\n\r\n"))
      let body = ser[0:ser.length() - 4]
      match @header.WarcHeader::parse(body) {
        Ok(h2) => assert_eq(h2.get("x-note"), Some("folded header value"))
        Err(_) => fail("re-parse failed")
      }
    }
    Err(_) => fail("header parse failed")
  }
}

///|
test "WarcHeader error cases and WarcType extension" {
  assert_eq(
    @header.WarcType::parse("custom-type"),
    @header.Extension("custom-type"),
  )
  assert_true(
    @header.WarcHeader::parse(b"HTTP/1.1 200 OK\r\nContent-Length: 0") is Err(_),
  )
  assert_true(
    @header.WarcHeader::parse(b"WARC/1.1\r\n  leading-fold") is Err(_),
  )
  assert_true(
    @header.WarcHeader::parse(b"WARC/1.1\r\nMalformedHeaderLine") is Err(_),
  )
  let h = @header.WarcHeader::new(@header.Warc1_0, [
    ("WARC-Type", "warcinfo"),
    ("Content-Length", "-5"),
  ])
  assert_true(h.parse_content_length() is Err(_))
}

///|
test "WarcVersion parses WARC/1.0 and WARC/1.1" {
  assert_eq(@header.WarcVersion::parse("WARC/1.0"), Ok(@header.Warc1_0))
  assert_eq(@header.WarcVersion::parse("WARC/1.1"), Ok(@header.Warc1_1))
  assert_true(@header.WarcVersion::parse("WARC/2.0") is Err(_))
}

///|
test "WarcHeader typed accessors cover optional ISO 28500 fields" {
  let h = @header.WarcHeader::new(@header.Warc1_1, [
    ("WARC-Type", "revisit"),
    ("WARC-Record-ID", "<urn:uuid:rev-1>"),
    ("WARC-Date", "2026-11-25T10:00:00Z"),
    ("WARC-Target-URI", "https://example.org/a"),
    (
      "WARC-Profile", "http://netpreserve.org/warc/1.1/revisit/identical-payload-digest",
    ),
    ("WARC-Refers-To", "<urn:uuid:orig-1>"),
    ("WARC-Truncated", "length"),
    ("WARC-Identified-Payload-Type", "text/html"),
    ("Content-Length", "0"),
  ])
  assert_eq(h.record_id(), Some("<urn:uuid:rev-1>"))
  assert_eq(h.warc_date(), Some("2026-11-25T10:00:00Z"))
  assert_eq(h.refers_to(), Some("<urn:uuid:orig-1>"))
  assert_eq(h.truncated(), Some("length"))
  assert_eq(h.identified_payload_type(), Some("text/html"))
  assert_eq(
    h.profile(),
    Some("http://netpreserve.org/warc/1.1/revisit/identical-payload-digest"),
  )
}

///|
test "WarcHeader segment helpers and without_field remove case-insensitively" {
  let h = @header.WarcHeader::new(@header.Warc1_1, [
    ("WARC-Type", "continuation"),
    ("WARC-Record-ID", "<urn:uuid:orig-1-seg-2>"),
    ("WARC-Date", "2026-11-25T10:00:00Z"),
    ("WARC-Segment-Origin-ID", "<urn:uuid:orig-1>"),
    ("WARC-Segment-Number", "2"),
    ("WARC-Segment-Total-Length", "128"),
    ("Content-Length", "28"),
  ])
  assert_eq(h.segment_number(), Some(2))
  assert_eq(h.segment_origin_id(), Some("<urn:uuid:orig-1>"))
  assert_eq(h.segment_total_length(), Some(128L))
  let stripped = h.without_field("warc-segment-number")
  assert_eq(stripped.segment_number(), None)
  assert_eq(stripped.segment_origin_id(), Some("<urn:uuid:orig-1>"))
  let invalid = @header.WarcHeader::new(@header.Warc1_1, [
    ("WARC-Segment-Number", "abc"),
    ("WARC-Segment-Total-Length", "-1"),
  ])
  assert_eq(invalid.segment_number(), None)
  assert_eq(invalid.segment_total_length(), None)
}

///|
test "WarcHeader rejects embedded empty lines, sanitizes CRLF serialization, and validates 14-digit CDXJ dates" {
  assert_true(
    @header.WarcHeader::parse(
      b"WARC/1.1\r\nWARC-Type: warcinfo\r\n\r\nContent-Length: 0",
    )
    is Err(_),
  )
  let dirty = @header.WarcHeader::new(@header.Warc1_1, [
    ("WARC-Type", "warcinfo\r\nWARC-Fake: injected"),
    ("WARC-Record-ID", "<urn:uuid:crlf-safe>"),
    ("WARC-Date", "2026-11-26T00:00:00Z"),
    ("Content-Length", "0"),
  ])
  let wire = dirty.serialize()
  assert_false(@utf8.decode_lossy(wire).contains("\nWARC-Fake:"))
  let without_end = wire[0:wire.length() - 4]
  match @header.WarcHeader::parse(without_end) {
    Ok(reparsed) => assert_eq(reparsed.get("WARC-Fake"), None)
    Err(_) => fail("expected sanitized header to re-parse safely")
  }
  assert_true(@header.WarcDate::parse_cdxj_timestamp("20240229120000") is Ok(_))
  assert_true(
    @header.WarcDate::parse_cdxj_timestamp("20250229120000") is Err(_),
  )
  assert_true(
    @header.WarcDate::parse_cdxj_timestamp("20269999999999") is Err(_),
  )
  let frac = @header.WarcDate::parse("0987-01-02T03:04:05.123456Z").unwrap()
  assert_eq(frac.to_iso_string(), "0987-01-02T03:04:05.123456Z")
  assert_true(@header.WarcDate::parse("0026-01-02T03:04:05Z") is Ok(_))
  for
    bad in [
      "abcd-01-02T03:04:05Z", "2026-ab-02T03:04:05Z", "2026-01-xxT03:04:05Z", "2026-01-02Tab:04:05Z",
      "2026-01-02T03:ab:05Z", "2026-01-02T03:04:abZ",
    ] {
    assert_true(@header.WarcDate::parse(bad) is Err(@header.InvalidDate(_)))
  }
  for
    bad14 in [
      "abcd0102030405", "2026ab02030405", "202601ab030405", "20260102ab0405", "2026010203ab05",
      "202601020304ab",
    ] {
    assert_true(
      @header.WarcDate::parse_cdxj_timestamp(bad14)
      is Err(@header.InvalidDate(_)),
    )
  }
}

///|
test "WarcHeader with_field and without_field sanitize names, collapse duplicate Content-Length, and block folded header injection" {
  let dirty = @header.WarcHeader::new(@header.Warc1_1, [
    ("WARC-Type", "resource"),
    ("WARC-Record-ID", "<urn:uuid:hdr-smuggle>"),
    ("WARC-Date", "2026-11-28T00:00:00Z"),
    ("Content-Length:", "999"),
    ("Content-Length", "0"),
    (" X-Fold", "injected\u0000line"),
    ("\tTab-Fold", "val"),
    (": \r\n", "drop-empty-name"),
  ])
  let updated = dirty.with_field("Content-Length", "5")
  assert_eq(updated.get_all("Content-Length"), ["5"])
  let wire = updated.serialize()
  let txt = @utf8.decode_lossy(wire)
  assert_false(txt.contains("999"))
  assert_false(txt.contains("drop-empty-name"))
  assert_false(txt.contains("\u0000"))
  let reparsed = @header.WarcHeader::parse(wire[0:wire.length() - 4]).unwrap()
  assert_eq(reparsed.get_all("Content-Length"), ["5"])
  assert_eq(reparsed.get("X-Fold"), Some("injected line"))
  assert_eq(reparsed.get("Tab-Fold"), Some("val"))

  let stripped = dirty.without_field("Content-Length")
  assert_eq(stripped.get_all("Content-Length"), [])
  assert_eq(stripped.get_all("Content-Length:"), [])
}
