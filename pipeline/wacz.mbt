///|
/// Frictionless Data & WebRecorder WACZ 1.1.1 manifest artifacts generated for a `.warc.gz` archive.
#derive(Eq, Debug)
pub(all) struct WaczManifests {
  datapackage_json : String
  datapackage_digest_json : String
  cdxj_text : String
}

///|
fn write_wacz_resource_json(
  sb : StringBuilder,
  name : String,
  path : String,
  raw_bytes : BytesView,
) -> Unit {
  let hash_str = "sha256:" + @digest.hex_encode(@digest.sha256(raw_bytes))
  sb.write_char('{')
  let mut first = true
  first = write_json_str_field(sb, first, "name", name)
  first = write_json_str_field(sb, first, "path", path)
  first = write_json_str_field(sb, first, "hash", hash_str)
  first = write_json_int64_field(
    sb,
    first,
    "bytes",
    raw_bytes.length().to_int64(),
  )
  ignore(first)
  sb.write_char('}')
}

///|
/// Generates WebRecorder WACZ 1.1.1 specification manifests (`datapackage.json`,
/// `datapackage-digest.json`, and `indexes/index.cdxj`) over `records` and their
/// corresponding compressed `.warc.gz` archive bytes (`warc_gz_bytes`), computing
/// exact lowercase SHA-256 hex digests and byte sizes across archive and index payloads.
pub fn build_wacz_manifests(
  records : Array[@codec.WarcRecord],
  warc_gz_bytes : BytesView,
  warc_filename~ : String = "data.warc.gz",
  title~ : String = "moon-warc archive",
  main_page_url? : String,
  main_page_date? : String,
) -> WaczManifests {
  let clean_warc_name = if warc_filename.trim().to_owned().is_empty() {
    "data.warc.gz"
  } else {
    warc_filename.trim().to_owned()
  }
  let cdx_body = @cdxj.CdxjIndex::build(records, filename=clean_warc_name).format_all()
  let cdxj_text = if cdx_body.is_empty() { "" } else { cdx_body + "\n" }
  let cdxj_bytes = @utf8.encode(cdxj_text)

  let dp = StringBuilder()
  dp.write_char('{')
  let mut first = true
  first = write_json_str_field(dp, first, "profile", "data-package")
  first = write_json_str_field(dp, first, "wacz_version", "1.1.1")
  first = write_json_str_field(dp, first, "title", title)
  match main_page_url {
    Some(u) => first = write_json_str_field(dp, first, "mainPageUrl", u)
    None => ()
  }
  match main_page_date {
    Some(d) => first = write_json_str_field(dp, first, "mainPageDate", d)
    None => ()
  }
  if !first {
    dp.write_char(',')
  }
  write_json_escaped(dp, "resources")
  dp.write_string(":[")
  write_wacz_resource_json(
    dp,
    clean_warc_name,
    "archive/" + clean_warc_name,
    warc_gz_bytes,
  )
  dp.write_char(',')
  write_wacz_resource_json(dp, "index.cdxj", "indexes/index.cdxj", cdxj_bytes)
  dp.write_string("]}")
  let datapackage_json = dp.to_string()

  let dp_hash = "sha256:" +
    @digest.hex_encode(@digest.sha256(@utf8.encode(datapackage_json)))
  let dd = StringBuilder()
  dd.write_char('{')
  let mut dd_first = true
  dd_first = write_json_str_field(dd, dd_first, "path", "datapackage.json")
  dd_first = write_json_str_field(dd, dd_first, "hash", dp_hash)
  ignore(dd_first)
  dd.write_char('}')
  let datapackage_digest_json = dd.to_string()

  { datapackage_json, datapackage_digest_json, cdxj_text, }
}
