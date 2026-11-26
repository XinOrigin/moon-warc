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
  println("=== Sorted CDXJ Index (\{index.length().to_string()} entries) ===")
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

  println("")
  println("=== ISO 28500 §9 Segmentation & Reassembly ===")
  let orig_resp = records[2]
  match @warc.segment_record(orig_resp, max_segment_bytes=64) {
    Err(e) => println("Segmentation failed: \{Debug::to_repr(e).to_string()}")
    Ok(segs) => {
      let seg_wire = @warc.encode_archive(segs)
      match @warc.parse_archive(seg_wire) {
        Err(e) =>
          println("Segmented parse failed: \{Debug::to_repr(e).to_string()}")
        Ok(seg_parsed) => {
          let seg_rep = @warc.validate_archive(seg_parsed)
          println(
            "Segmented response (max=64B): segments=\{seg_parsed.length().to_string()} wire=\{seg_wire.length().to_string()}B valid=\{seg_rep.is_valid().to_string()} errors=\{seg_rep.error_count.to_string()} warnings=\{seg_rep.warning_count.to_string()}",
          )
          match @warc.reassemble_segments(seg_parsed) {
            Err(e) =>
              println("Reassembly failed: \{Debug::to_repr(e).to_string()}")
            Ok(reassembled) => {
              let payload_eq = reassembled.length() == 1 &&
                reassembled[0].payload == orig_resp.payload
              println(
                "Reassembled records=\{reassembled.length().to_string()} payload_exact=\{payload_eq.to_string()} bytes=\{orig_resp.payload.length().to_string()}",
              )
            }
          }
        }
      }
    }
  }

  println("")
  println("=== Subset Filter & Export (CDX-11 / JSONL) ===")
  let sub_filter = @pipeline.ArchiveFilter::new(
    surt_prefix="org,example)",
    status_min=200,
    status_max=299,
  )
  let sub_wire = @warc.extract_subset(
    records,
    sub_filter,
    include_warcinfo=true,
  )
  match @warc.parse_archive(sub_wire) {
    Err(e) => println("Subset parse failed: \{Debug::to_repr(e).to_string()}")
    Ok(sub_recs) => {
      let sub_rep = @warc.validate_archive(sub_recs)
      let cdx11 = @warc.export_cdx11(records, filename="sample-crawl-2026.warc")
      let cdx11_lines : Array[String] = []
      for lv in cdx11.split("\n") {
        cdx11_lines.push(lv.to_owned())
      }
      let jsonl = @warc.export_jsonl(records)
      let jsonl_lines : Array[String] = []
      for lv in jsonl.split("\n") {
        jsonl_lines.push(lv.to_owned())
      }
      println(
        "Subset (surt='org,example)' status=200..299 +warcinfo): records=\{sub_recs.length().to_string()} wire=\{sub_wire.length().to_string()}B valid=\{sub_rep.is_valid().to_string()}",
      )
      println(
        "CDX-11 lines=\{cdx11_lines.length().to_string()} (1 header + \{index.length().to_string()} rows) | JSONL lines=\{jsonl_lines.length().to_string()}",
      )
    }
  }

  println("")
  println("=== Multi-Member .warc.gz & Compressed CDXJ ===")
  let gz_wire = @warc.encode_archive_gz(records)
  match @warc.parse_archive_gz(gz_wire) {
    Err(e) => println("Gzip parse failed: \{Debug::to_repr(e).to_string()}")
    Ok(gz_recs) => {
      let gz_rep = @warc.validate_archive(gz_recs)
      let gz_idx = @warc.build_cdxj_index(
        gz_recs,
        filename="sample-crawl-2026.warc.gz",
      )
      println(
        "Multi-member .warc.gz: members=\{gz_recs.length().to_string()} compressed=\{gz_wire.length().to_string()}B raw=\{raw.length().to_string()}B valid=\{gz_rep.is_valid().to_string()} cdxj=\{gz_idx.length().to_string()}",
      )
    }
  }
}
