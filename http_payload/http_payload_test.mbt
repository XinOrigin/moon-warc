///|
test "parse_http_response with binary body containing NUL and non-UTF8" {
  let raw = b"HTTP/1.1 200 OK\r\nContent-Type: Application/Octet-Stream; charset=binary\r\nX-Custom: val:with:colon\r\n\r\n\x00\xff\xfeWARC\x00"
  match @http_payload.parse_http_response(raw) {
    Ok(resp) => {
      assert_eq(resp.version, "HTTP/1.1")
      assert_eq(resp.status_code, 200)
      assert_eq(resp.reason, "OK")
      assert_eq(resp.content_type_mime(), Some("application/octet-stream"))
      assert_eq(
        @http_payload.header_value(resp.headers, "x-custom"),
        Some("val:with:colon"),
      )
      assert_eq(resp.body, b"\x00\xff\xfeWARC\x00")
      assert_eq(
        @http_payload.extract_entity_body(resp),
        Ok(b"\x00\xff\xfeWARC\x00"),
      )
    }
    Err(_) => fail("unexpected HTTP parse error")
  }
}

///|
test "parse_http_response with redirect and chunked body" {
  let raw = b"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nHello\r\n7;ext=1\r\n, WARC!\r\n0\r\nX-Trailer: done\r\n\r\n"
  match @http_payload.parse_http_response(raw) {
    Ok(resp) => {
      assert_true(resp.is_chunked())
      assert_eq(resp.content_type_mime(), Some("text/html"))
      assert_eq(@http_payload.extract_entity_body(resp), Ok(b"Hello, WARC!"))
    }
    Err(_) => fail("unexpected HTTP parse error")
  }
}

///|
test "parse_http_request and LF fallback" {
  let raw = b"GET /archive/index.html HTTP/1.1\nHost: example.org\nUser-Agent: moon-warc\n\n"
  match @http_payload.parse_http_request(raw) {
    Ok(req) => {
      assert_eq(req.method_name, "GET")
      assert_eq(req.target, "/archive/index.html")
      assert_eq(req.version, "HTTP/1.1")
      assert_eq(
        @http_payload.header_value(req.headers, "HOST"),
        Some("example.org"),
      )
      assert_eq(req.body, b"")
    }
    Err(_) => fail("unexpected HTTP parse error")
  }
}

///|
test "chunked binary data and empty chunked body" {
  assert_eq(@http_payload.decode_chunked(b"0\r\n\r\n"), Ok(b""))
  assert_eq(
    @http_payload.decode_chunked(
      b"4\r\n\x00\xff\x0d\x0a\r\n2\r\nOK\r\n0\r\n\r\n",
    ),
    Ok(b"\x00\xff\x0d\x0aOK"),
  )
}

///|
test "http_payload error rejection cases" {
  assert_eq(
    @http_payload.parse_http_response(b"HTTP/1.1 200 OK\r\nHost: a"),
    Err(@http_payload.MissingHeaderTerminator),
  )
  assert_true(@http_payload.parse_http_response(b"BADLINE\r\n\r\n") is Err(_))
  assert_true(
    @http_payload.parse_http_response(b"HTTP/1.1 999 Weird\r\n\r\n") is Err(_),
  )
  assert_true(
    @http_payload.parse_http_response(b"HTTP/1.1 200 OK\r\nNoColon\r\n\r\n")
    is Err(_),
  )
  assert_eq(
    @http_payload.decode_chunked(b"ZZ\r\nab\r\n0\r\n\r\n"),
    Err(@http_payload.InvalidChunkSize("ZZ")),
  )
  assert_eq(
    @http_payload.decode_chunked(b"5\r\nabc"),
    Err(@http_payload.TruncatedChunkBody),
  )
  assert_eq(
    @http_payload.decode_chunked(b"3\r\nabcXX0\r\n\r\n"),
    Err(@http_payload.MissingChunkCrlf),
  )
  assert_eq(
    @http_payload.decode_chunked(b"3\r\nabc\r\n0\r\n"),
    Err(@http_payload.TruncatedChunkBody),
  )
}

///|
test "http_payload extracts redirect location and preserves case-insensitive headers" {
  let raw = b"HTTP/1.1 301 Moved Permanently\r\nLocation: https://example.org/new\r\nContent-Length: 0\r\n\r\n"
  match @http_payload.parse_http_response(raw) {
    Ok(resp) => {
      assert_eq(resp.status_code, 301)
      assert_eq(resp.location(), Some("https://example.org/new"))
      assert_eq(resp.content_type_mime(), None)
      assert_false(resp.is_chunked())
    }
    Err(_) => fail("unexpected HTTP parse error")
  }
}

///|
test "http_payload decodes uppercase hex chunks and multi-line trailers" {
  let raw = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: gzip, CHUNKED\r\n\r\nA\r\n0123456789\r\nf\r\nabcdefghijklmno\r\n0\r\nX-A: 1\r\nX-B: 2\r\n\r\n"
  match @http_payload.parse_http_response(raw) {
    Ok(resp) => {
      assert_true(resp.is_chunked())
      assert_eq(
        @http_payload.extract_entity_body(resp),
        Ok(b"0123456789abcdefghijklmno"),
      )
    }
    Err(_) => fail("unexpected HTTP parse error")
  }
}

///|
test "http_payload prefers earliest LF-LF header split over CRLF-CRLF inside body" {
  let raw = b"HTTP/1.1 200 OK\nContent-Type: text/plain\n\nhello\r\n\r\nworld"
  match @http_payload.parse_http_response(raw) {
    Ok(resp) => {
      assert_eq(resp.status_code, 200)
      assert_eq(resp.content_type_mime(), Some("text/plain"))
      assert_eq(resp.body, b"hello\r\n\r\nworld")
    }
    Err(_) => fail("expected LF-LF header split to succeed")
  }
}

///|
test "http_payload handles obs-fold headers and multiple Transfer-Encoding headers accurately" {
  let folded = b"HTTP/1.1 200 OK\r\nX-Custom: line1\r\n\tline2\r\nTransfer-Encoding: gzip\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nhello\r\n0\r\n\r\n"
  match @http_payload.parse_http_response(folded) {
    Ok(resp) => {
      assert_eq(
        @http_payload.header_value(resp.headers, "X-Custom"),
        Some("line1 line2"),
      )
      assert_true(resp.is_chunked())
      assert_eq(@http_payload.extract_entity_body(resp), Ok(b"hello"))
    }
    Err(_) => fail("expected obs-fold + multi TE parse to succeed")
  }
  let fake_te = b"HTTP/1.1 200 OK\r\nTransfer-Encoding: x-chunked-custom\r\n\r\nraw"
  match @http_payload.parse_http_response(fake_te) {
    Ok(resp) => assert_false(resp.is_chunked())
    Err(_) => fail("unexpected error on non-chunked TE")
  }
  let blank_in_hdr = b"HTTP/1.1 200 OK\n\r\nHost: example.org\r\n\r\nbody"
  assert_true(
    @http_payload.parse_http_response(blank_in_hdr)
    is Err(@http_payload.InvalidHeaderLine(_)),
  )
  // Chunked error branches: truncated chunk, missing trailing CRLF, and invalid hex length
  for
    bad_chunked in [
      b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\nzz\r\nhi\r\n0\r\n\r\n",
      b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n5\r\nhi", b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n2\r\nhiXX0\r\n\r\n",
      b"HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n0\r\nX-Trailer: v",
    ] {
    let parsed = @http_payload.parse_http_response(bad_chunked).unwrap()
    assert_true(@http_payload.extract_entity_body(parsed) is Err(_))
  }
  assert_true(@http_payload.parse_http_request(b"BAD") is Err(_))
  assert_true(
    @http_payload.parse_http_response(b"NOTHTTP 200 OK\r\n\r\n") is Err(_),
  )
}

///|
test "decode_chunked rejects Int32::MAX hex chunk size without integer overflow panic" {
  assert_eq(
    @http_payload.decode_chunked(b"7fffffff\r\n\r\n"),
    Err(@http_payload.TruncatedChunkBody),
  )
  assert_eq(
    @http_payload.decode_chunked(b"7fffffff\r\nabc"),
    Err(@http_payload.TruncatedChunkBody),
  )
}
