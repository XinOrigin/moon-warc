///|
fn main {
  println(
    "moon-warc v\{@warc.library_version()} — ISO 28500 WARC 1.0/1.1 Showcase",
  )
  let raw = @warc.sample_archive_bytes()
  println("Sample archive size: \{raw.length().to_string()} bytes")
  let records = match @warc.parse_archive(raw) {
    Ok(recs) => recs
    Err(e) => {
      println("Parse failed: \{Debug::to_repr(e).to_string()}")
      return
    }
  }
  println("")
  println("=== Records (\{records.length().to_string()}) ===")
  for i in 0..<records.length() {
    let rec = records[i]
    let hdr = rec.header
    let ver = @header.WarcVersion::to_wire_string(hdr.version)
    let wt = match @header.WarcHeader::warc_type(hdr) {
      Some(t) => t.to_wire_string()
      None => "unknown"
    }
    let rid = hdr.record_id().unwrap_or("-")
    let uri = hdr.target_uri().unwrap_or("-")
    let bdig = hdr.block_digest().unwrap_or("-")
    let pdig = hdr.payload_digest().unwrap_or("-")
    println(
      "#\{i.to_string()} [\{ver}] type=\{wt} offset=\{rec.offset.to_string()} len=\{rec.record_length.to_string()} payload=\{rec.payload.length().to_string()} id=\{rid} uri=\{uri}",
    )
    println("   block-digest=\{bdig}")
    println("   payload-digest=\{pdig}")
  }

  println("")
  let report = @warc.validate_archive(records)
  println(
    "=== ISO 28500 Validation: valid=\{report.is_valid().to_string()} records=\{report.record_count.to_string()} errors=\{report.error_count.to_string()} warnings=\{report.warning_count.to_string()} ===",
  )
  for d in report.diagnostics {
    println(
      "  [\{Debug::to_repr(d.severity).to_string()}] #\{d.record_index.to_string()} @\{d.offset.to_string()} \{d.code}: \{d.message}",
    )
  }

  println("")
  let index = @warc.build_cdxj_index(records, filename="sample-crawl-2026.warc")
  println(
    "=== Sorted CDXJ Index (\{index.entries.length().to_string()} entries) ===",
  )
  println(index.format_all())

  let exact = index.lookup_exact("https://example.org:443/index.html#top")
  println("")
  println(
    "lookup_exact('https://example.org:443/index.html#top') -> \{exact.length().to_string()} hit(s)",
  )
  match
    index.lookup_closest("https://example.org/index.html", "20261125121000") {
    Some(hit) =>
      println(
        "lookup_closest('https://example.org/index.html', '20261125121000') -> ts=\{hit.timestamp} warc_type=\{hit.warc_type} offset=\{hit.offset.to_string()}",
      )
    None => println("lookup_closest -> none")
  }

  println("")
  let revisits = @warc.resolve_revisits(records)
  println("=== Revisit Resolution (\{revisits.length().to_string()}) ===")
  for rv in revisits {
    let target_str = match rv.target_record_id {
      Some(tid) => tid
      None => "<none>"
    }
    println(
      "  revisit #\{rv.revisit_index.to_string()} (\{rv.revisit_id}) -> kind=\{Debug::to_repr(rv.match_kind).to_string()} target=\{target_str}",
    )
  }

  let reencoded = @warc.encode_archive(records)
  let eq = reencoded == raw
  println("")
  println(
    "=== Round-trip byte equality: \{eq.to_string()} (\{reencoded.length().to_string()} == \{raw.length().to_string()} bytes) ===",
  )
  if !eq {
    println("ERROR: round-trip mismatch")
  }
}
