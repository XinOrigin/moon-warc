///|
test "parse_uri components" {
  match @surt.parse_uri("https://user@Docs.Example.com:8443/a/b?k=v#frag") {
    Ok(u) => {
      assert_eq(u.scheme, "https")
      assert_eq(u.userinfo, Some("user"))
      assert_eq(u.host, "docs.example.com")
      assert_eq(u.port, Some(8443))
      assert_eq(u.path, "/a/b")
      assert_eq(u.query, Some("k=v"))
      assert_eq(u.fragment, Some("frag"))
    }
    Err(_) => fail("unexpected URI parse error")
  }
}

///|
test "to_surt canonicalization rules" {
  assert_eq(
    @surt.to_surt("https://docs.example.com:443/a/./b/../c?z=1&a=2#top"),
    Ok("com,example,docs)/a/c?a=2&z=1"),
  )
  assert_eq(@surt.to_surt("HTTP://Example.COM:80"), Ok("com,example)/"))
  assert_eq(
    @surt.to_surt("http://api.example.com:8080/v1/items/"),
    Ok("com,example,api:8080)/v1/items/"),
  )
  assert_eq(
    @surt.to_surt("https://example.org/a/b/../../.."),
    Ok("org,example)/"),
  )
  assert_eq(@surt.to_surt("https://example.org/a/b/.."), Ok("org,example)/a"))
  assert_eq(@surt.to_surt("https://example.org./foo"), Ok("org,example)/foo"))
}

///|
test "to_surt IPv4 IPv6 and query edge cases" {
  assert_eq(
    @surt.to_surt("http://192.0.2.10:80/status?b=2&a=1&b=1"),
    Ok("192.0.2.10)/status?a=1&b=1&b=2"),
  )
  assert_eq(
    @surt.to_surt("http://[::1]:8080/metrics?flag&&k=v"),
    Ok("[::1]:8080)/metrics?flag&k=v"),
  )
  assert_eq(
    @surt.to_surt("https://example.com/?#only-frag"),
    Ok("com,example)/"),
  )
}

///|
test "surt error rejection cases" {
  assert_eq(@surt.to_surt(""), Err(@surt.EmptyUri))
  assert_eq(@surt.to_surt("   "), Err(@surt.EmptyUri))
  assert_eq(@surt.to_surt("example.com/no-scheme"), Err(@surt.MissingScheme))
  assert_eq(@surt.to_surt("http:///missing-host"), Err(@surt.MissingHost))
  assert_eq(@surt.to_surt("http://user@/missing-host"), Err(@surt.MissingHost))
  assert_true(@surt.to_surt("http://example.com:99999/") is Err(_))
  assert_true(@surt.to_surt("http://example.com:abc/") is Err(_))
  assert_true(@surt.to_surt("http://example.com:0/") is Err(_))
}

///|
test "to_surt query lexical vs shortlex ordering" {
  assert_eq(
    @surt.to_surt("https://example.com/search?z=1&alpha=2&a=3"),
    Ok("com,example)/search?a=3&alpha=2&z=1"),
  )
}

///|
test "to_surt strips ftp default port and normalizes single label host" {
  assert_eq(
    @surt.to_surt("ftp://files.example.org:21/pub/./warc/../archive.warc"),
    Ok("org,example,files)/pub/archive.warc"),
  )
  assert_eq(
    @surt.to_surt("http://localhost:8000/health"),
    Ok("localhost:8000)/health"),
  )
}

///|
test "parse_uri preserves non-default port and query without path" {
  match @surt.parse_uri("https://example.org?page=2#sec") {
    Ok(u) => {
      assert_eq(u.path, "/")
      assert_eq(u.query, Some("page=2"))
      assert_eq(u.fragment, Some("sec"))
    }
    Err(_) => fail("unexpected URI parse error")
  }
}
