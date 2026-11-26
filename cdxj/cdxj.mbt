///|
/// Errors returned while parsing CDXJ index lines.
#derive(Eq, Debug)
pub(all) enum CdxjError {
  InvalidLineFormat(String)
  InvalidJsonBlock(String)
  MissingJsonField(String)
}

///|
/// Single CDXJ archival index entry (`<surt> <timestamp> <json>`).
#derive(Eq, Debug)
pub(all) struct CdxjEntry {
  surt : String
  timestamp : String
  url : String
  mime : String?
  status : Int32?
  digest : String?
  length : Int64
  offset : Int64
  filename : String
  warc_type : String
}

///|
/// Sorted CDXJ index supporting fast binary-search queries.
/// Internal entries slice is private to uphold lexicographic sorting invariant.
#derive(Eq, Debug)
pub struct CdxjIndex {
  priv entries : Array[CdxjEntry]
}

///|
/// Returns the number of entries in the sorted index.
pub fn CdxjIndex::length(self : CdxjIndex) -> Int32 {
  self.entries.length()
}

///|
/// Returns `true` when the index contains no entries.
pub fn CdxjIndex::is_empty(self : CdxjIndex) -> Bool {
  self.entries.is_empty()
}

///|
/// Returns the `i`-th sorted entry if `index` is within bounds.
pub fn CdxjIndex::get(self : CdxjIndex, index : Int32) -> CdxjEntry? {
  if index >= 0 && index < self.entries.length() {
    Some(self.entries[index])
  } else {
    None
  }
}

///|
/// Returns a defensive copy of all sorted entries in the index.
pub fn CdxjIndex::entries(self : CdxjIndex) -> Array[CdxjEntry] {
  self.entries.copy()
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
fn parse_int64_string(s : String) -> Int64? {
  let clean = s.trim().to_owned()
  if clean.is_empty() {
    return None
  }
  let mut acc = 0L
  for i in 0..<clean.length() {
    let c = clean[i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    let digit = (c - 48).to_int64()
    if acc > 922337203685477580L || (acc == 922337203685477580L && digit > 7L) {
      return None
    }
    acc = acc * 10L + digit
  }
  Some(acc)
}

///|
fn parse_digits_slice(s : String, start : Int32, len : Int32) -> Int32? {
  if start < 0 || len <= 0 || start + len > s.length() {
    return None
  }
  let mut acc = 0
  for i in 0..<len {
    let c = s[start + i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    acc = acc * 10 + (c - 48)
  }
  Some(acc)
}

///|
fn is_leap_year(year : Int32) -> Bool {
  (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

///|
fn days_in_month(year : Int32, month : Int32) -> Int32 {
  match month {
    1 | 3 | 5 | 7 | 8 | 10 | 12 => 31
    4 | 6 | 9 | 11 => 30
    2 => if is_leap_year(year) { 29 } else { 28 }
    _ => 0
  }
}

///|
fn timestamp_to_epoch_seconds(ts : String) -> Int64? {
  if ts.length() != 14 {
    return None
  }
  let year = match parse_digits_slice(ts, 0, 4) {
    Some(v) => v
    None => return None
  }
  let month = match parse_digits_slice(ts, 4, 2) {
    Some(v) => v
    None => return None
  }
  let day = match parse_digits_slice(ts, 6, 2) {
    Some(v) => v
    None => return None
  }
  let hour = match parse_digits_slice(ts, 8, 2) {
    Some(v) => v
    None => return None
  }
  let minute = match parse_digits_slice(ts, 10, 2) {
    Some(v) => v
    None => return None
  }
  let second = match parse_digits_slice(ts, 12, 2) {
    Some(v) => v
    None => return None
  }
  if year < 1 || month < 1 || month > 12 {
    return None
  }
  let max_day = days_in_month(year, month)
  if day < 1 || day > max_day || hour > 23 || minute > 59 || second > 59 {
    return None
  }
  let y = if month <= 2 { (year - 1).to_int64() } else { year.to_int64() }
  let era = if y >= 0L { y / 400L } else { (y - 399L) / 400L }
  let yoe = y - era * 400L
  let adj_m = month + (if month > 2 { -3 } else { 9 })
  let doy = (153L * adj_m.to_int64() + 2L) / 5L + day.to_int64() - 1L
  let doe = yoe * 365L + yoe / 4L - yoe / 100L + doy
  let days = era * 146097L + doe - 719468L
  Some(
    days * 86400L +
    hour.to_int64() * 3600L +
    minute.to_int64() * 60L +
    second.to_int64(),
  )
}

///|
/// Builds a `CdxjEntry` from an indexable WARC record (`response`, `resource`, `revisit`, `conversion`).
pub fn from_record(
  record : @codec.WarcRecord,
  filename~ : String = "archive.warc",
) -> CdxjEntry? {
  let hdr = record.header
  let wt = match hdr.warc_type() {
    Some(t) => t
    None => return None
  }
  let indexable = match wt {
    @header.Response
    | @header.Resource
    | @header.Revisit
    | @header.Conversion => true
    _ => false
  }
  if !indexable {
    return None
  }
  let url = match hdr.target_uri() {
    Some(u) => u
    None => return None
  }
  let surt_key = match @surt.to_surt(url) {
    Ok(s) => s
    Err(_) => return None
  }
  let raw_date = match hdr.warc_date() {
    Some(d) => d
    None => return None
  }
  let timestamp = match @header.WarcDate::parse(raw_date) {
    Ok(d) => d.to_cdxj_timestamp()
    Err(_) => return None
  }
  let (mime, status) = match wt {
    @header.Response =>
      match @http_payload.parse_http_response(record.payload) {
        Ok(resp) => (resp.content_type_mime(), Some(resp.status_code))
        Err(_) =>
          (
            match hdr.content_type() {
              Some(ct) => strip_mime_params(ct)
              None => None
            },
            None,
          )
      }
    @header.Revisit =>
      match @http_payload.parse_http_response(record.payload) {
        Ok(resp) =>
          (
            match resp.content_type_mime() {
              Some(m) => Some(m)
              None => Some("warc/revisit")
            },
            Some(resp.status_code),
          )
        Err(_) => (Some("warc/revisit"), None)
      }
    _ =>
      (
        match hdr.content_type() {
          Some(ct) => strip_mime_params(ct)
          None => None
        },
        None,
      )
  }
  let digest = match hdr.payload_digest() {
    Some(d) => Some(d)
    None => hdr.block_digest()
  }
  Some({
    surt: surt_key,
    timestamp,
    url,
    mime,
    status,
    digest,
    length: record.record_length,
    offset: record.offset,
    filename,
    warc_type: wt.to_wire_string(),
  })
}

///|
/// Formats a `CdxjEntry` as `<surt> <timestamp> <json>` using canonical JSON escaping.
pub fn format_line(entry : CdxjEntry) -> String {
  let obj : Map[String, Json] = Map([])
  obj["url"] = Json::string(entry.url)
  match entry.mime {
    Some(m) => obj["mime"] = Json::string(m)
    None => ()
  }
  match entry.status {
    Some(st) => obj["status"] = Json::string(st.to_string())
    None => ()
  }
  match entry.digest {
    Some(d) => obj["digest"] = Json::string(d)
    None => ()
  }
  obj["length"] = Json::string(entry.length.to_string())
  obj["offset"] = Json::string(entry.offset.to_string())
  obj["filename"] = Json::string(entry.filename)
  obj["warc-type"] = Json::string(entry.warc_type)
  let json_str = Json::object(obj).stringify(escape_slash=false)
  entry.surt + " " + entry.timestamp + " " + json_str
}

///|
fn json_get_string(obj : Map[String, Json], key : String) -> String? {
  match obj.get(key) {
    Some(Json::String(s)) => Some(s)
    _ => None
  }
}

///|
fn parse_int64_json_val(v : Json) -> Int64? {
  match v {
    Json::String(s) => parse_int64_string(s)
    Json::Number(n, ..) =>
      if n.is_nan() ||
        n.is_inf() ||
        n < 0.0 ||
        n.floor() != n ||
        n > 9007199254740991.0 {
        None
      } else {
        Some(n.to_int64())
      }
    _ => None
  }
}

///|
fn json_get_int64_field(
  obj : Map[String, Json],
  key : String,
) -> Result[Int64, CdxjError] {
  match obj.get(key) {
    None => Err(MissingJsonField(key))
    Some(v) =>
      match parse_int64_json_val(v) {
        Some(n) => Ok(n)
        None =>
          Err(InvalidJsonBlock("invalid non-negative integer field '\{key}'"))
      }
  }
}

///|
fn json_get_optional_status(
  obj : Map[String, Json],
) -> Result[Int32?, CdxjError] {
  match obj.get("status") {
    None => Ok(None)
    Some(Json::Null) => Ok(None)
    Some(v) =>
      match parse_int64_json_val(v) {
        Some(n) =>
          if n <= 2147483647L {
            Ok(Some(n.to_int()))
          } else {
            Err(InvalidJsonBlock("overflowing integer field 'status'"))
          }
        None =>
          Err(InvalidJsonBlock("invalid non-negative integer field 'status'"))
      }
  }
}

///|
/// Parses a single CDXJ line (`<surt> <timestamp> <json>`).
pub fn parse_line(line_view : StringView) -> Result[CdxjEntry, CdxjError] {
  let line = line_view.trim().to_owned()
  let (surt_v, rest1) = match line.split_once(" ") {
    Some(p) => p
    None => return Err(InvalidLineFormat(line))
  }
  let (ts_v, json_v) = match rest1.trim_start().split_once(" ") {
    Some(p) => p
    None => return Err(InvalidLineFormat(line))
  }
  let surt_key = surt_v.to_owned()
  let timestamp = ts_v.to_owned()
  if surt_key.is_empty() || timestamp.is_empty() || timestamp.has_prefix("{") {
    return Err(InvalidLineFormat(line))
  }
  let json_raw = json_v.trim().to_owned()
  let parsed = @json.parse(json_raw) catch {
    _ => return Err(InvalidJsonBlock(json_raw))
  }
  let obj = match parsed {
    Json::Object(m) => m
    _ => return Err(InvalidJsonBlock(json_raw))
  }
  let url = match json_get_string(obj, "url") {
    Some(u) => u
    None => return Err(MissingJsonField("url"))
  }
  let length = match json_get_int64_field(obj, "length") {
    Ok(n) => n
    Err(e) => return Err(e)
  }
  let offset = match json_get_int64_field(obj, "offset") {
    Ok(n) => n
    Err(e) => return Err(e)
  }
  let status = match json_get_optional_status(obj) {
    Ok(st) => st
    Err(e) => return Err(e)
  }
  let filename = match json_get_string(obj, "filename") {
    Some(f) => f
    None => ""
  }
  let warc_type = match json_get_string(obj, "warc-type") {
    Some(t) => t
    None => "response"
  }
  Ok({
    surt: surt_key,
    timestamp,
    url,
    mime: json_get_string(obj, "mime"),
    status,
    digest: json_get_string(obj, "digest"),
    length,
    offset,
    filename,
    warc_type,
  })
}

///|
fn compare_entries(a : CdxjEntry, b : CdxjEntry) -> Int32 {
  let cs = a.surt.lexical_compare(b.surt)
  if cs != 0 {
    return cs
  }
  let ct = a.timestamp.lexical_compare(b.timestamp)
  if ct != 0 {
    return ct
  }
  a.offset.compare(b.offset)
}

///|
/// Builds a lexicographically sorted `CdxjIndex` from parsed WARC records.
pub fn CdxjIndex::build(
  records : Array[@codec.WarcRecord],
  filename~ : String = "archive.warc",
) -> CdxjIndex {
  let entries : Array[CdxjEntry] = []
  for rec in records {
    match from_record(rec, filename~) {
      Some(e) => entries.push(e)
      None => ()
    }
  }
  entries.sort_by(compare_entries)
  { entries, }
}

///|
/// Builds a lexicographically sorted `CdxjIndex` from pre-constructed `CdxjEntry` values.
pub fn CdxjIndex::from_entries(entries : Array[CdxjEntry]) -> CdxjIndex {
  let copy : Array[CdxjEntry] = []
  for e in entries {
    copy.push(e)
  }
  copy.sort_by(compare_entries)
  { entries: copy, }
}

///|
/// Renders all entries as newline-separated CDXJ lines.
pub fn CdxjIndex::format_all(self : CdxjIndex) -> String {
  let lines : Array[String] = []
  for e in self.entries {
    lines.push(format_line(e))
  }
  lines.join("\n")
}

///|
fn lower_bound_surt(entries : Array[CdxjEntry], target : String) -> Int32 {
  let mut lo = 0
  let mut hi = entries.length()
  while lo < hi {
    let mid = lo + (hi - lo) / 2
    if entries[mid].surt.lexical_compare(target) < 0 {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  lo
}

///|
/// Finds all entries whose SURT matches `url` using binary search.
pub fn CdxjIndex::lookup_exact(
  self : CdxjIndex,
  url : StringView,
) -> Array[CdxjEntry] {
  let key = match @surt.to_surt(url) {
    Ok(k) => k
    Err(_) => return []
  }
  let out : Array[CdxjEntry] = []
  let mut idx = lower_bound_surt(self.entries, key)
  while idx < self.entries.length() && self.entries[idx].surt == key {
    out.push(self.entries[idx])
    idx = idx + 1
  }
  out
}

///|
/// Finds all entries whose SURT starts with `surt_prefix` using binary search.
pub fn CdxjIndex::lookup_prefix(
  self : CdxjIndex,
  surt_prefix : StringView,
) -> Array[CdxjEntry] {
  let prefix = surt_prefix.to_owned()
  let out : Array[CdxjEntry] = []
  let mut idx = lower_bound_surt(self.entries, prefix)
  while idx < self.entries.length() && self.entries[idx].surt.has_prefix(prefix) {
    out.push(self.entries[idx])
    idx = idx + 1
  }
  out
}

///|
/// Finds the entry for `url` closest in capture time to `target_timestamp` (`YYYYMMDDhhmmss`).
pub fn CdxjIndex::lookup_closest(
  self : CdxjIndex,
  url : StringView,
  target_timestamp : StringView,
) -> CdxjEntry? {
  let matches = self.lookup_exact(url)
  if matches.is_empty() {
    return None
  }
  let target_sec = match
    timestamp_to_epoch_seconds(target_timestamp.trim().to_owned()) {
    Some(v) => v
    None => return Some(matches[0])
  }
  let max_diff = 9223372036854775807L
  let mut best = matches[0]
  let mut best_diff = match timestamp_to_epoch_seconds(best.timestamp) {
    Some(v) => (v - target_sec).abs()
    None => max_diff
  }
  for i in 1..<matches.length() {
    let cand = matches[i]
    let diff = match timestamp_to_epoch_seconds(cand.timestamp) {
      Some(v) => (v - target_sec).abs()
      None => max_diff
    }
    if diff < best_diff {
      best = cand
      best_diff = diff
    }
  }
  Some(best)
}
