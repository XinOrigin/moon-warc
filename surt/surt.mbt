///|
/// Errors returned while parsing a URI or computing its SURT key.
#derive(Eq, Debug)
pub(all) enum SurtError {
  EmptyUri
  MissingScheme
  MissingHost
  InvalidPort(String)
}

///|
/// Parsed components of an HTTP/HTTPS/FTP URI.
#derive(Eq, Debug)
pub struct ParsedUri {
  scheme : String
  userinfo : String?
  host : String
  port : Int32?
  path : String
  query : String?
  fragment : String?
}

///|
fn is_valid_scheme(s : String) -> Bool {
  if s.is_empty() {
    return false
  }
  for i in 0..<s.length() {
    let c = s[i].to_int()
    let is_alpha = (c >= 97 && c <= 122) || (c >= 65 && c <= 90)
    let is_digit = c >= 48 && c <= 57
    let is_extra = c == 43 || c == 45 || c == 46
    if i == 0 {
      if !is_alpha {
        return false
      }
    } else if !(is_alpha || is_digit || is_extra) {
      return false
    }
  }
  true
}

///|
fn parse_port(s : String) -> Result[Int32, SurtError] {
  if s.is_empty() {
    return Err(InvalidPort("empty port"))
  }
  let mut acc = 0
  for i in 0..<s.length() {
    let c = s[i].to_int()
    if c < 48 || c > 57 {
      return Err(InvalidPort(s))
    }
    acc = acc * 10 + (c - 48)
    if acc > 65535 {
      return Err(InvalidPort(s))
    }
  }
  if acc == 0 {
    return Err(InvalidPort(s))
  }
  Ok(acc)
}

///|
fn find_first_authority_delim(s : String) -> Int32 {
  let len = s.length()
  let mut idx = len
  for i in 0..<len {
    let c = s[i].to_int()
    if c == 47 || c == 63 || c == 35 {
      idx = i
      break
    }
  }
  idx
}

///|
fn substr(s : String, start : Int32, end : Int32) -> String {
  s[start:end].to_owned()
}

///|
/// Parses a URI string into scheme, authority, path, query, and fragment.
pub fn parse_uri(raw : StringView) -> Result[ParsedUri, SurtError] {
  let trimmed = raw.trim().to_owned()
  if trimmed.is_empty() {
    return Err(EmptyUri)
  }
  let (scheme_raw, after_scheme) = match trimmed.split_once("://") {
    Some((s, rest)) => (s.to_owned(), rest.to_owned())
    None => return Err(MissingScheme)
  }
  let scheme = scheme_raw.to_lower()
  if !is_valid_scheme(scheme) {
    return Err(MissingScheme)
  }
  let auth_end = find_first_authority_delim(after_scheme)
  let authority = substr(after_scheme, 0, auth_end)
  let tail = substr(after_scheme, auth_end, after_scheme.length())
  if authority.is_empty() {
    return Err(MissingHost)
  }
  let (userinfo, host_port) = match authority.rev_split_once("@") {
    Some((u, hp)) => (Some(u.to_owned()), hp.to_owned())
    None => (None, authority)
  }
  if host_port.is_empty() {
    return Err(MissingHost)
  }
  let (host, port) = if host_port[0].to_int() == 91 {
    // Bracketed IPv6 literal: [::1] or [::1]:8080
    match host_port.find("]") {
      None => return Err(MissingHost)
      Some(rb) => {
        let h = substr(host_port, 0, rb + 1).to_lower()
        let rest_hp = substr(host_port, rb + 1, host_port.length())
        if rest_hp.is_empty() {
          (h, None)
        } else if rest_hp[0].to_int() == 58 {
          match parse_port(substr(rest_hp, 1, rest_hp.length())) {
            Ok(p) => (h, Some(p))
            Err(e) => return Err(e)
          }
        } else {
          return Err(MissingHost)
        }
      }
    }
  } else {
    match host_port.rev_split_once(":") {
      Some((h, p_str)) => {
        let p_owned = p_str.to_owned()
        match parse_port(p_owned) {
          Ok(p) => (h.to_owned().to_lower(), Some(p))
          Err(e) => return Err(e)
        }
      }
      None => (host_port.to_lower(), None)
    }
  }
  if host.is_empty() {
    return Err(MissingHost)
  }
  let (before_frag, fragment) = match tail.split_once("#") {
    Some((bf, f)) => (bf.to_owned(), Some(f.to_owned()))
    None => (tail, None)
  }
  let (path_raw, query) = match before_frag.split_once("?") {
    Some((p, q)) => (p.to_owned(), Some(q.to_owned()))
    None => (before_frag, None)
  }
  let path = if path_raw.is_empty() { "/" } else { path_raw }
  Ok({ scheme, userinfo, host, port, path, query, fragment, })
}

///|
fn is_ipv4(host : String) -> Bool {
  let parts = host.split(".").collect()
  if parts.length() != 4 {
    return false
  }
  for part_v in parts {
    let part = part_v.to_owned()
    if part.is_empty() || part.length() > 3 {
      return false
    }
    let mut val = 0
    for i in 0..<part.length() {
      let c = part[i].to_int()
      if c < 48 || c > 57 {
        return false
      }
      val = val * 10 + (c - 48)
    }
    if val > 255 {
      return false
    }
  }
  true
}

///|
fn is_default_port(scheme : String, port : Int32) -> Bool {
  (scheme == "http" && port == 80) ||
  (scheme == "https" && port == 443) ||
  (scheme == "ftp" && port == 21) ||
  (scheme == "ws" && port == 80) ||
  (scheme == "wss" && port == 443)
}

///|
fn normalize_path(raw_path : String) -> String {
  let segments : Array[String] = []
  let trailing_slash = raw_path.has_suffix("/")
  for seg_v in raw_path.split("/") {
    let seg = seg_v.to_owned()
    if seg.is_empty() || seg == "." {
      continue
    } else if seg == ".." {
      ignore(segments.pop())
    } else {
      segments.push(seg)
    }
  }
  if segments.is_empty() {
    return "/"
  }
  let sb = StringBuilder()
  for seg in segments {
    sb.write_char('/')
    sb.write_string(seg)
  }
  if trailing_slash && !raw_path.has_suffix("/.") && !raw_path.has_suffix("/..") {
    sb.write_char('/')
  }
  sb.to_string()
}

///|
fn surt_host(host : String) -> String {
  let clean = if host.has_suffix(".") && host.length() > 1 {
    substr(host, 0, host.length() - 1)
  } else {
    host
  }
  if clean.has_prefix("[") || is_ipv4(clean) {
    return clean
  }
  let labels : Array[String] = []
  for lbl in clean.split(".") {
    let s = lbl.to_owned()
    if !s.is_empty() {
      labels.push(s)
    }
  }
  labels.rev_in_place()
  labels.join(",")
}

///|
fn sort_query(query : String) -> String {
  let params : Array[(String, String, String)] = []
  for part_v in query.split("&") {
    let part = part_v.to_owned()
    if part.is_empty() {
      continue
    }
    let (k, v) = match part.split_once("=") {
      Some((kv, vv)) => (kv.to_owned(), vv.to_owned())
      None => (part, "")
    }
    params.push((k, v, part))
  }
  params.sort_by(fn(a, b) {
    let ck = a.0.lexical_compare(b.0)
    if ck != 0 {
      ck
    } else {
      let cv = a.1.lexical_compare(b.1)
      if cv != 0 {
        cv
      } else {
        a.2.lexical_compare(b.2)
      }
    }
  })
  let rendered : Array[String] = []
  for p in params {
    rendered.push(p.2)
  }
  rendered.join("&")
}

///|
/// Converts a URI string to canonical SURT form (`com,example,docs)/a/c?a=2&z=1`).
pub fn to_surt(raw : StringView) -> Result[String, SurtError] {
  match parse_uri(raw) {
    Err(e) => Err(e)
    Ok(uri) => {
      let sb = StringBuilder()
      sb.write_string(surt_host(uri.host))
      match uri.port {
        Some(p) =>
          if !is_default_port(uri.scheme, p) {
            sb.write_char(':')
            sb.write_string(p.to_string())
          }
        None => ()
      }
      sb.write_char(')')
      sb.write_string(normalize_path(uri.path))
      match uri.query {
        Some(q) => {
          let sq = sort_query(q)
          if !sq.is_empty() {
            sb.write_char('?')
            sb.write_string(sq)
          }
        }
        None => ()
      }
      Ok(sb.to_string())
    }
  }
}
