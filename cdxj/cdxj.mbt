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
  length : Int32
  offset : Int32
  filename : String
  warc_type : String
}

///|
/// Sorted CDXJ index supporting fast binary-search queries.
#derive(Eq, Debug)
pub(all) struct CdxjIndex {
  entries : Array[CdxjEntry]
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
fn parse_int_string(s : String) -> Int32? {
  let clean = s.trim().to_owned()
  if clean.is_empty() {
    return None
  }
  let mut acc = 0
  for i in 0..<clean.length() {
    let c = clean[i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    acc = acc * 10 + (c - 48)
  }
  Some(acc)
}

///|
fn parse_u64_timestamp(ts : String) -> Int64? {
  if ts.is_empty() {
    return None
  }
  let mut acc = 0L
  for i in 0..<ts.length() {
    let c = ts[i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    acc = acc * 10L + (c - 48).to_int64()
  }
  Some(acc)
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
fn json_get_int(obj : Map[String, Json], key : String) -> Int32? {
  match obj.get(key) {
    Some(Json::String(s)) => parse_int_string(s)
    Some(Json::Number(n, ..)) => Some(n.to_int())
    _ => None
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
  let length = match json_get_int(obj, "length") {
    Some(n) => n
    None => return Err(MissingJsonField("length"))
  }
  let offset = match json_get_int(obj, "offset") {
    Some(n) => n
    None => return Err(MissingJsonField("offset"))
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
    status: json_get_int(obj, "status"),
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
  let target_num = match
    parse_u64_timestamp(target_timestamp.trim().to_owned()) {
    Some(v) => v
    None => return Some(matches[0])
  }
  let mut best = matches[0]
  let mut best_diff = match parse_u64_timestamp(best.timestamp) {
    Some(v) => (v - target_num).abs()
    None => 99999999999999L
  }
  for i in 1..<matches.length() {
    let cand = matches[i]
    let diff = match parse_u64_timestamp(cand.timestamp) {
      Some(v) => (v - target_num).abs()
      None => 99999999999999L
    }
    if diff < best_diff {
      best = cand
      best_diff = diff
    }
  }
  Some(best)
}
