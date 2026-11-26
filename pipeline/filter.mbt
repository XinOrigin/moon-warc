///|
/// Filter criteria applied by `matches_filter`, `filter_records`, and `extract_subset`.
#derive(Eq, Debug)
pub(all) struct ArchiveFilter {
  warc_types : Array[@header.WarcType]?
  surt_prefix : String?
  mime_prefix : String?
  status_min : Int32?
  status_max : Int32?
  date_from : String?
  date_to : String?
}

///|
/// Returns an unconstrained filter matching all WARC records.
pub fn ArchiveFilter::all() -> ArchiveFilter {
  {
    warc_types: None,
    surt_prefix: None,
    mime_prefix: None,
    status_min: None,
    status_max: None,
    date_from: None,
    date_to: None,
  }
}

///|
/// Constructs an `ArchiveFilter` using optional keyword criteria.
pub fn ArchiveFilter::new(
  warc_types? : Array[@header.WarcType],
  surt_prefix? : String,
  mime_prefix? : String,
  status_min? : Int32,
  status_max? : Int32,
  date_from? : String,
  date_to? : String,
) -> ArchiveFilter {
  {
    warc_types,
    surt_prefix,
    mime_prefix,
    status_min,
    status_max,
    date_from,
    date_to,
  }
}

///|
fn strip_mime_params(ct : String) -> String? {
  let mime = match ct.split_once(";") {
    Some((m, _)) => m.trim().to_owned()
    None => ct.trim().to_owned()
  }
  if mime.is_empty() {
    None
  } else {
    Some(mime.to_lower())
  }
}

///|
fn extract_mime_and_status(record : @codec.WarcRecord) -> (String?, Int32?) {
  let warc_mime = match record.header.content_type() {
    Some(ct) => strip_mime_params(ct)
    None => None
  }
  match record.header.warc_type() {
    Some(@header.Response) =>
      match @http_payload.parse_http_response(record.payload) {
        Ok(resp) => {
          let mime = match resp.content_type_mime() {
            Some(m) => Some(m)
            None => warc_mime
          }
          (mime, Some(resp.status_code))
        }
        Err(_) => (warc_mime, None)
      }
    Some(@header.Revisit) =>
      match @http_payload.parse_http_response(record.payload) {
        Ok(resp) => {
          let mime = match resp.content_type_mime() {
            Some(m) => Some(m)
            None => warc_mime
          }
          (mime, Some(resp.status_code))
        }
        Err(_) => (warc_mime, None)
      }
    _ => (warc_mime, None)
  }
}

///|
fn normalize_timestamp(raw : String) -> String? {
  let s = raw.trim().to_owned()
  match @header.WarcDate::parse(s) {
    Ok(d) => Some(d.to_cdxj_timestamp())
    Err(_) =>
      match @header.WarcDate::parse_cdxj_timestamp(s) {
        Ok(d) => Some(d.to_cdxj_timestamp())
        Err(_) => None
      }
  }
}

///|
/// Evaluates whether a single `WarcRecord` satisfies all active predicates in `filter`.
pub fn matches_filter(
  record : @codec.WarcRecord,
  filter : ArchiveFilter,
) -> Bool {
  match filter.warc_types {
    Some(allowed) => {
      let wt = match record.header.warc_type() {
        Some(t) => t
        None => return false
      }
      if !allowed.contains(wt) {
        return false
      }
    }
    None => ()
  }
  match filter.surt_prefix {
    Some(prefix) => {
      let uri = match record.header.target_uri() {
        Some(u) => u
        None => return false
      }
      let surt_key = match @surt.to_surt(uri) {
        Ok(k) => k
        Err(_) => return false
      }
      if !surt_key.has_prefix(prefix) {
        return false
      }
    }
    None => ()
  }
  let (mime_opt, status_opt) = extract_mime_and_status(record)
  match filter.mime_prefix {
    Some(mp) => {
      let target = mp.trim().to_owned().to_lower()
      match mime_opt {
        Some(m) => if !m.has_prefix(target) { return false }
        None => return false
      }
    }
    None => ()
  }
  if filter.status_min is Some(_) || filter.status_max is Some(_) {
    let st = match status_opt {
      Some(v) => v
      None => return false
    }
    match filter.status_min {
      Some(lo) => if st < lo { return false }
      None => ()
    }
    match filter.status_max {
      Some(hi) => if st > hi { return false }
      None => ()
    }
  }
  if filter.date_from is Some(_) || filter.date_to is Some(_) {
    let rec_ts = match record.header.warc_date() {
      Some(d) =>
        match normalize_timestamp(d) {
          Some(ts) => ts
          None => return false
        }
      None => return false
    }
    match filter.date_from {
      Some(df) =>
        match normalize_timestamp(df) {
          Some(lo) => if rec_ts.lexical_compare(lo) < 0 { return false }
          None => return false
        }
      None => ()
    }
    match filter.date_to {
      Some(dt) =>
        match normalize_timestamp(dt) {
          Some(hi) => if rec_ts.lexical_compare(hi) > 0 { return false }
          None => return false
        }
      None => ()
    }
  }
  true
}

///|
/// Filters parsed `WarcRecord`s according to `filter`, optionally retaining `warcinfo` header records.
pub fn filter_records(
  records : Array[@codec.WarcRecord],
  filter : ArchiveFilter,
  include_warcinfo~ : Bool = false,
) -> Array[@codec.WarcRecord] {
  let out : Array[@codec.WarcRecord] = []
  for rec in records {
    let is_warcinfo = rec.header.warc_type() == Some(@header.WarcInfo)
    if (include_warcinfo && is_warcinfo) || matches_filter(rec, filter) {
      out.push(rec)
    }
  }
  out
}

///|
/// Extracts matching WARC records (with `warcinfo` preserved by default) and re-encodes them into
/// a valid self-contained ISO 28500 WARC byte stream with updated `Content-Length` and digests.
pub fn extract_subset(
  records : Array[@codec.WarcRecord],
  filter : ArchiveFilter,
  include_warcinfo~ : Bool = true,
) -> Bytes {
  let subset = filter_records(records, filter, include_warcinfo~)
  @codec.encode_all(subset, auto_digest=true)
}
