///|
/// Diagnostic severity level emitted during ISO 28500 validation.
#derive(Eq, Debug)
pub(all) enum Severity {
  Error
  Warning
}

///|
/// Structured conformance diagnostic pointing to a specific record and byte offset.
#derive(Eq, Debug)
pub(all) struct Diagnostic {
  severity : Severity
  code : String
  record_index : Int32
  offset : Int32
  message : String
}

///|
/// Summary report produced by `validate_archive`.
#derive(Eq, Debug)
pub(all) struct ValidationReport {
  record_count : Int32
  error_count : Int32
  warning_count : Int32
  diagnostics : Array[Diagnostic]
}

///|
/// Returns `true` when validation produced zero errors (warnings may still exist).
pub fn ValidationReport::is_valid(self : ValidationReport) -> Bool {
  self.error_count == 0
}

///|
fn is_uri_angle_wrapped(s : String) -> Bool {
  let clean = s.trim().to_owned()
  clean.length() >= 3 && clean.has_prefix("<") && clean.has_suffix(">")
}

///|
fn push_diag(
  diags : Array[Diagnostic],
  severity : Severity,
  code : String,
  record_index : Int32,
  offset : Int32,
  message : String,
) -> Unit {
  diags.push({ severity, code, record_index, offset, message, })
}

///|
/// Validates an array of parsed `WarcRecord`s against ISO 28500 conformance rules:
/// mandatory headers, date & ID syntax, `Content-Length`, SHA-1/SHA-256 block & payload
/// digests (including HTTP de-chunking), duplicate IDs, and cross-record references.
pub fn validate_archive(records : Array[@codec.WarcRecord]) -> ValidationReport {
  let diags : Array[Diagnostic] = []
  let id_counts : Map[String, Int32] = Map([])
  for rec in records {
    match rec.header.record_id() {
      Some(id) => {
        let prev = match id_counts.get(id) {
          Some(c) => c
          None => 0
        }
        id_counts[id] = prev + 1
      }
      None => ()
    }
  }
  for idx in 0..<records.length() {
    let rec = records[idx]
    let hdr = rec.header
    let off = rec.offset
    let wt_opt = hdr.warc_type()
    if wt_opt is None {
      push_diag(
        diags,
        Error,
        "MISSING_WARC_TYPE",
        idx,
        off,
        "missing mandatory WARC-Type header",
      )
    }
    match hdr.record_id() {
      None =>
        push_diag(
          diags,
          Error,
          "MISSING_RECORD_ID",
          idx,
          off,
          "missing mandatory WARC-Record-ID header",
        )
      Some(id) => {
        if !is_uri_angle_wrapped(id) {
          push_diag(
            diags,
            Error,
            "INVALID_RECORD_ID",
            idx,
            off,
            "WARC-Record-ID must be enclosed in <...>: \{id}",
          )
        }
        match id_counts.get(id) {
          Some(cnt) =>
            if cnt > 1 {
              push_diag(
                diags,
                Error,
                "DUPLICATE_RECORD_ID",
                idx,
                off,
                "duplicate WARC-Record-ID: \{id}",
              )
            }
          None => ()
        }
      }
    }
    match hdr.warc_date() {
      None =>
        push_diag(
          diags,
          Error,
          "MISSING_WARC_DATE",
          idx,
          off,
          "missing mandatory WARC-Date header",
        )
      Some(d) =>
        match @header.WarcDate::parse(d) {
          Ok(_) => ()
          Err(_) =>
            push_diag(
              diags,
              Error,
              "INVALID_WARC_DATE",
              idx,
              off,
              "invalid ISO 28500 UTC WARC-Date: \{d}",
            )
        }
    }
    match hdr.parse_content_length() {
      Err(_) =>
        push_diag(
          diags,
          Error,
          "INVALID_CONTENT_LENGTH",
          idx,
          off,
          "missing or invalid Content-Length header",
        )
      Ok(cl) =>
        if cl != rec.payload.length() {
          push_diag(
            diags,
            Error,
            "CONTENT_LENGTH_MISMATCH",
            idx,
            off,
            "Content-Length \{cl.to_string()} != payload length \{rec.payload.length().to_string()}",
          )
        }
    }
    match wt_opt {
      Some(@header.Response)
      | Some(@header.Request)
      | Some(@header.Resource)
      | Some(@header.Revisit)
      | Some(@header.Conversion) =>
        match hdr.target_uri() {
          Some(u) =>
            if u.trim().is_empty() {
              push_diag(
                diags,
                Error,
                "MISSING_TARGET_URI",
                idx,
                off,
                "WARC-Target-URI cannot be empty",
              )
            }
          None =>
            push_diag(
              diags,
              Error,
              "MISSING_TARGET_URI",
              idx,
              off,
              "missing mandatory WARC-Target-URI header",
            )
        }
      _ => ()
    }
    match wt_opt {
      Some(@header.Revisit) =>
        match hdr.profile() {
          Some(p) =>
            if p.trim().is_empty() {
              push_diag(
                diags,
                Error,
                "MISSING_WARC_PROFILE",
                idx,
                off,
                "WARC-Profile cannot be empty for revisit record",
              )
            }
          None =>
            push_diag(
              diags,
              Error,
              "MISSING_WARC_PROFILE",
              idx,
              off,
              "missing mandatory WARC-Profile for revisit record",
            )
        }
      _ => ()
    }
    match hdr.block_digest() {
      Some(bd) =>
        match @digest.verify_warc_digest(bd, rec.payload) {
          Ok(true) => ()
          Ok(false) =>
            push_diag(
              diags,
              Error,
              "BLOCK_DIGEST_MISMATCH",
              idx,
              off,
              "WARC-Block-Digest verification failed",
            )
          Err(_) =>
            push_diag(
              diags,
              Error,
              "INVALID_BLOCK_DIGEST",
              idx,
              off,
              "invalid WARC-Block-Digest header: \{bd}",
            )
        }
      None => ()
    }
    match hdr.payload_digest() {
      Some(pd) =>
        match wt_opt {
          Some(@header.Revisit) =>
            match @digest.parse_warc_digest(pd) {
              Ok(_) => ()
              Err(_) =>
                push_diag(
                  diags,
                  Error,
                  "INVALID_PAYLOAD_DIGEST",
                  idx,
                  off,
                  "invalid WARC-Payload-Digest header: \{pd}",
                )
            }
          Some(@header.Response) =>
            match @http_payload.parse_http_response(rec.payload) {
              Err(_) =>
                push_diag(
                  diags,
                  Error,
                  "INVALID_HTTP_PAYLOAD",
                  idx,
                  off,
                  "failed to parse HTTP response for WARC-Payload-Digest verification",
                )
              Ok(resp) =>
                match @http_payload.extract_entity_body(resp) {
                  Err(_) =>
                    push_diag(
                      diags,
                      Error,
                      "INVALID_HTTP_CHUNKED_BODY",
                      idx,
                      off,
                      "failed to decode chunked HTTP body for WARC-Payload-Digest verification",
                    )
                  Ok(entity) =>
                    match @digest.verify_warc_digest(pd, entity) {
                      Ok(true) => ()
                      Ok(false) =>
                        push_diag(
                          diags,
                          Error,
                          "PAYLOAD_DIGEST_MISMATCH",
                          idx,
                          off,
                          "WARC-Payload-Digest verification failed",
                        )
                      Err(_) =>
                        push_diag(
                          diags,
                          Error,
                          "INVALID_PAYLOAD_DIGEST",
                          idx,
                          off,
                          "invalid WARC-Payload-Digest header: \{pd}",
                        )
                    }
                }
            }
          _ =>
            match @digest.verify_warc_digest(pd, rec.payload) {
              Ok(true) => ()
              Ok(false) =>
                push_diag(
                  diags,
                  Error,
                  "PAYLOAD_DIGEST_MISMATCH",
                  idx,
                  off,
                  "WARC-Payload-Digest verification failed",
                )
              Err(_) =>
                push_diag(
                  diags,
                  Error,
                  "INVALID_PAYLOAD_DIGEST",
                  idx,
                  off,
                  "invalid WARC-Payload-Digest header: \{pd}",
                )
            }
        }
      None => ()
    }
    match hdr.refers_to() {
      Some(ref_id) =>
        if !id_counts.contains(ref_id) {
          push_diag(
            diags,
            Warning,
            "UNRESOLVED_REFERS_TO",
            idx,
            off,
            "WARC-Refers-To target not found in archive: \{ref_id}",
          )
        }
      None => ()
    }
    for cid in hdr.concurrent_to() {
      if !id_counts.contains(cid) {
        push_diag(
          diags,
          Warning,
          "UNRESOLVED_CONCURRENT_TO",
          idx,
          off,
          "WARC-Concurrent-To target not found in archive: \{cid}",
        )
      }
    }
  }
  let mut error_count = 0
  let mut warning_count = 0
  for d in diags {
    match d.severity {
      Error => error_count = error_count + 1
      Warning => warning_count = warning_count + 1
    }
  }
  {
    record_count: records.length(),
    error_count,
    warning_count,
    diagnostics: diags,
  }
}
