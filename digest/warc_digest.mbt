///|
/// Parsed `WARC-Block-Digest` or `WARC-Payload-Digest` header value.
#derive(Eq, Debug)
pub(all) enum WarcDigest {
  Sha1(Bytes)
  Sha256(Bytes)
  Other(String, String)
}

///|
/// Formats a WARC `sha1:<base32>` digest string over `data`.
pub fn format_warc_digest_sha1(data : BytesView) -> String {
  "sha1:" + base32_encode(sha1(data))
}

///|
/// Formats a WARC `sha256:<base32>` digest string over `data`.
pub fn format_warc_digest_sha256(data : BytesView) -> String {
  "sha256:" + base32_encode(sha256(data))
}

///|
/// Parses a WARC digest header value (`<algorithm>:<encoded-value>`).
/// Supports Base32 (RFC 4648) and lowercase/uppercase Hex for `sha1` and `sha256`.
pub fn parse_warc_digest(
  header_value : StringView,
) -> Result[WarcDigest, DigestError] {
  let trimmed = header_value.trim().to_owned()
  match trimmed.split_once(":") {
    None =>
      Err(InvalidFormat("digest header missing ':' separator: \{trimmed}"))
    Some((algo_view, val_view)) => {
      let algo = algo_view.trim().to_owned().to_lower()
      let val = val_view.trim().to_owned()
      if algo.is_empty() || val.is_empty() {
        return Err(
          InvalidFormat("digest algorithm and value must be non-empty"),
        )
      }
      if algo == "sha1" {
        let bytes = if val.length() == 40 {
          match hex_decode(val) {
            Ok(b) => b
            Err(e) => return Err(e)
          }
        } else if val.length() == 32 {
          match base32_decode(val) {
            Ok(b) => b
            Err(e) => return Err(e)
          }
        } else {
          return Err(
            InvalidLength(
              "sha1 digest expects 32 Base32 chars or 40 hex chars, got \{val.length().to_string()}",
            ),
          )
        }
        if bytes.length() != 20 {
          return Err(InvalidLength("decoded sha1 digest must be 20 bytes"))
        }
        Ok(Sha1(bytes))
      } else if algo == "sha256" {
        let bytes = if val.length() == 64 {
          match hex_decode(val) {
            Ok(b) => b
            Err(e) => return Err(e)
          }
        } else if val.length() == 52 || val.length() == 56 {
          match base32_decode(val) {
            Ok(b) => b
            Err(e) => return Err(e)
          }
        } else {
          return Err(
            InvalidLength(
              "sha256 digest expects 52/56 Base32 chars or 64 hex chars, got \{val.length().to_string()}",
            ),
          )
        }
        if bytes.length() != 32 {
          return Err(InvalidLength("decoded sha256 digest must be 32 bytes"))
        }
        Ok(Sha256(bytes))
      } else {
        Ok(Other(algo, val))
      }
    }
  }
}

///|
/// Verifies a WARC digest header value against raw `data`.
pub fn verify_warc_digest(
  header_value : StringView,
  data : BytesView,
) -> Result[Bool, DigestError] {
  match parse_warc_digest(header_value) {
    Err(e) => Err(e)
    Ok(Sha1(expected)) => Ok(sha1(data) == expected)
    Ok(Sha256(expected)) => Ok(sha256(data) == expected)
    Ok(Other(algo, _)) =>
      Err(InvalidAlgorithm("unsupported digest algorithm: \{algo}"))
  }
}
