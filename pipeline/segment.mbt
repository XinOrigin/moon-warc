///|
/// Errors returned by ISO 28500 §9 record segmentation and reassembly.
#derive(Eq, Debug)
pub(all) enum PipelineError {
  InvalidSegmentSize(String)
  MissingOriginRecord(String)
  MissingSegmentNumber(String)
  OutOfOrderSegment(String)
  TotalLengthMismatch(String)
  PayloadDigestMismatch(String)
}

///|
fn derive_continuation_id(origin_id : String, seg_num : Int32) -> String {
  let clean = origin_id.trim().to_owned()
  if clean.length() >= 3 && clean.has_prefix("<") && clean.has_suffix(">") {
    let inner = clean[0:clean.length() - 1].to_owned()
    inner + "-seg-" + seg_num.to_string() + ">"
  } else {
    "<urn:segment:" + seg_num.to_string() + ">"
  }
}

///|
fn next_segment_end(
  pos : Int32,
  max_segment_bytes : Int32,
  total : Int32,
) -> Int32 {
  let rem = total - pos
  if max_segment_bytes < rem {
    pos + max_segment_bytes
  } else {
    total
  }
}

///|
fn compute_logical_payload_digest(record : @codec.WarcRecord) -> String? {
  match record.header.payload_digest() {
    Some(pd) => Some(pd)
    None =>
      match record.header.warc_type() {
        Some(@header.Response) =>
          match @http_payload.parse_http_response(record.payload) {
            Ok(resp) =>
              match @http_payload.extract_entity_body(resp) {
                Ok(entity) => Some(@digest.format_warc_digest_sha256(entity))
                Err(_) => None
              }
            Err(_) => None
          }
        Some(@header.WarcInfo) | Some(@header.Metadata) => None
        _ => Some(@digest.format_warc_digest_sha256(record.payload))
      }
  }
}

///|
/// Splits an oversized `WarcRecord` into ISO 28500 §9 segmented records (`WARC-Segment-Number: 1`
/// origin record plus `continuation` records), each with payload `<= max_segment_bytes`.
pub fn segment_record(
  record : @codec.WarcRecord,
  max_segment_bytes~ : Int32,
) -> Result[Array[@codec.WarcRecord], PipelineError] {
  if max_segment_bytes <= 0 {
    return Err(InvalidSegmentSize("max_segment_bytes must be > 0"))
  }
  let total = record.payload.length()
  if total <= max_segment_bytes {
    return Ok([record])
  }
  let origin_id = match record.header.record_id() {
    Some(id) =>
      if id.trim().is_empty() {
        return Err(
          MissingOriginRecord("cannot segment record with blank WARC-Record-ID"),
        )
      } else {
        id
      }
    None =>
      return Err(
        MissingOriginRecord("cannot segment record without WARC-Record-ID"),
      )
  }
  let logical_pd = compute_logical_payload_digest(record)
  let first_slice = record.payload[0:max_segment_bytes].to_owned()
  let mut first_hdr = record.header
    .without_field("WARC-Segment-Origin-ID")
    .without_field("WARC-Segment-Total-Length")
    .with_field("WARC-Segment-Number", "1")
    .with_field("Content-Length", first_slice.length().to_string())
    .with_field(
      "WARC-Block-Digest",
      @digest.format_warc_digest_sha256(first_slice),
    )
  match logical_pd {
    Some(pd) => first_hdr = first_hdr.with_field("WARC-Payload-Digest", pd)
    None => ()
  }
  let out : Array[@codec.WarcRecord] = [
    { header: first_hdr, payload: first_slice, offset: 0L, record_length: 0L, },
  ]
  let mut pos = max_segment_bytes
  let mut seg_num = 2
  while pos < total {
    let end = next_segment_end(pos, max_segment_bytes, total)
    let slice = record.payload[pos:end].to_owned()
    let fields : Array[(String, String)] = [
      ("WARC-Type", "continuation"),
      ("WARC-Record-ID", derive_continuation_id(origin_id, seg_num)),
    ]
    match record.header.warc_date() {
      Some(d) => fields.push(("WARC-Date", d))
      None => ()
    }
    match record.header.target_uri() {
      Some(u) => fields.push(("WARC-Target-URI", u))
      None => ()
    }
    fields.push(("WARC-Segment-Origin-ID", origin_id))
    fields.push(("WARC-Segment-Number", seg_num.to_string()))
    if end == total {
      fields.push(("WARC-Segment-Total-Length", total.to_string()))
    }
    fields.push(("WARC-Block-Digest", @digest.format_warc_digest_sha256(slice)))
    fields.push(("Content-Length", slice.length().to_string()))
    out.push(@codec.make_record(record.header.version, fields, slice))
    pos = end
    seg_num = seg_num + 1
  }
  Ok(out)
}

///|
fn verify_reassembled_payload_digest(
  header : @header.WarcHeader,
  full_payload : Bytes,
) -> Result[Unit, PipelineError] {
  match header.payload_digest() {
    None => Ok(())
    Some(pd) =>
      match header.warc_type() {
        Some(@header.Response) =>
          match @http_payload.parse_http_response(full_payload) {
            Err(_) =>
              Err(
                PayloadDigestMismatch(
                  "failed to parse HTTP response for reassembled WARC-Payload-Digest verification",
                ),
              )
            Ok(resp) =>
              match @http_payload.extract_entity_body(resp) {
                Err(_) =>
                  Err(
                    PayloadDigestMismatch(
                      "failed to decode chunked HTTP body for reassembled WARC-Payload-Digest verification",
                    ),
                  )
                Ok(entity) =>
                  match @digest.verify_warc_digest(pd, entity) {
                    Ok(true) => Ok(())
                    _ =>
                      Err(
                        PayloadDigestMismatch(
                          "reassembled HTTP response payload digest mismatch",
                        ),
                      )
                  }
              }
          }
        _ =>
          match @digest.verify_warc_digest(pd, full_payload) {
            Ok(true) => Ok(())
            _ =>
              Err(
                PayloadDigestMismatch(
                  "reassembled record payload digest mismatch",
                ),
              )
          }
      }
  }
}

///|
/// Reassembles ISO 28500 §9 segmented records (`segment 1` + `continuation` records)
/// back into logical unsegmented records and verifies total lengths and payload digests.
pub fn reassemble_segments(
  records : Array[@codec.WarcRecord],
) -> Result[Array[@codec.WarcRecord], PipelineError] {
  let origin_ids : Map[String, Bool] = Map([])
  let cont_by_origin : Map[String, Array[(Int32, @codec.WarcRecord)]] = Map([])
  let before_origin : Array[String] = []
  for rec in records {
    let hdr = rec.header
    match hdr.warc_type() {
      Some(@header.Continuation) => {
        let origin_id = match hdr.segment_origin_id() {
          Some(oid) =>
            if oid.trim().is_empty() {
              return Err(
                MissingOriginRecord(
                  "continuation record has empty WARC-Segment-Origin-ID",
                ),
              )
            } else {
              oid
            }
          None =>
            return Err(
              MissingOriginRecord(
                "continuation record missing WARC-Segment-Origin-ID",
              ),
            )
        }
        let seg_num = match hdr.get("WARC-Segment-Number") {
          None =>
            return Err(
              MissingSegmentNumber(
                "continuation record missing WARC-Segment-Number",
              ),
            )
          Some(_) =>
            match hdr.segment_number() {
              None =>
                return Err(
                  MissingSegmentNumber(
                    "continuation record has invalid WARC-Segment-Number",
                  ),
                )
              Some(n) =>
                if n < 2 {
                  return Err(
                    OutOfOrderSegment(
                      "continuation segment number must be >= 2, got \{n.to_string()}",
                    ),
                  )
                } else {
                  n
                }
            }
        }
        if !origin_ids.contains(origin_id) {
          before_origin.push(origin_id)
        }
        match cont_by_origin.get(origin_id) {
          Some(arr) => arr.push((seg_num, rec))
          None => cont_by_origin[origin_id] = [(seg_num, rec)]
        }
      }
      _ =>
        match hdr.get("WARC-Segment-Number") {
          None => ()
          Some(_) =>
            match hdr.segment_number() {
              Some(1) => {
                let oid = match hdr.record_id() {
                  Some(id) =>
                    if id.trim().is_empty() {
                      return Err(
                        MissingOriginRecord(
                          "segmented origin record has empty WARC-Record-ID",
                        ),
                      )
                    } else {
                      id
                    }
                  None =>
                    return Err(
                      MissingOriginRecord(
                        "segmented origin record missing WARC-Record-ID",
                      ),
                    )
                }
                if origin_ids.contains(oid) {
                  return Err(
                    OutOfOrderSegment(
                      "duplicate segmented origin WARC-Record-ID: \{oid}",
                    ),
                  )
                }
                origin_ids[oid] = true
              }
              _ =>
                return Err(
                  OutOfOrderSegment(
                    "non-continuation record must have WARC-Segment-Number: 1",
                  ),
                )
            }
        }
    }
  }
  for oid, _ in cont_by_origin {
    if !origin_ids.contains(oid) {
      return Err(
        MissingOriginRecord(
          "orphan continuation record refers to missing origin \{oid}",
        ),
      )
    }
  }
  for oid in before_origin {
    return Err(
      OutOfOrderSegment("continuation record appeared before origin \{oid}"),
    )
  }
  let out : Array[@codec.WarcRecord] = []
  for rec in records {
    if rec.header.warc_type() == Some(@header.Continuation) {
      continue
    }
    match rec.header.segment_number() {
      None => out.push(rec)
      Some(1) => {
        let oid = rec.header.record_id().unwrap_or("")
        let segs = match cont_by_origin.get(oid) {
          Some(arr) => arr
          None =>
            return Err(
              OutOfOrderSegment(
                "segmented origin record \{oid} has no continuation segments",
              ),
            )
        }
        if segs.is_empty() {
          return Err(
            OutOfOrderSegment(
              "segmented origin record \{oid} has no continuation segments",
            ),
          )
        }
        let buf = @buffer.Buffer(capacity=rec.payload.length())
        buf.write_bytesview(rec.payload[:])
        for i in 0..<segs.length() {
          let expected_seg = i + 2
          let (seg_num, cont_rec) = segs[i]
          if seg_num != expected_seg {
            return Err(
              OutOfOrderSegment(
                "expected segment \{expected_seg.to_string()} for \{oid}, got \{seg_num.to_string()}",
              ),
            )
          }
          buf.write_bytesview(cont_rec.payload[:])
        }
        let full_payload = buf.to_bytes()
        for j in 0..<segs.length() {
          let cont_hdr = segs[j].1.header
          if cont_hdr.get("WARC-Segment-Total-Length") is Some(_) {
            if j != segs.length() - 1 {
              return Err(
                TotalLengthMismatch(
                  "WARC-Segment-Total-Length is only permitted on the final continuation segment",
                ),
              )
            }
            match cont_hdr.segment_total_length() {
              Some(expected_total) =>
                if expected_total != full_payload.length().to_int64() {
                  return Err(
                    TotalLengthMismatch(
                      "WARC-Segment-Total-Length \{expected_total.to_string()} != reassembled \{full_payload.length().to_string()}",
                    ),
                  )
                }
              None =>
                return Err(
                  TotalLengthMismatch(
                    "invalid WARC-Segment-Total-Length header on continuation segment",
                  ),
                )
            }
          }
        }
        let rebuilt_hdr = rec.header
          .without_field("WARC-Segment-Number")
          .with_field("Content-Length", full_payload.length().to_string())
          .with_field(
            "WARC-Block-Digest",
            @digest.format_warc_digest_sha256(full_payload),
          )
        match verify_reassembled_payload_digest(rebuilt_hdr, full_payload) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
        out.push({
          header: rebuilt_hdr,
          payload: full_payload,
          offset: rec.offset,
          record_length: 0L,
        })
      }
      Some(_) =>
        return Err(
          OutOfOrderSegment(
            "non-continuation record must have WARC-Segment-Number: 1",
          ),
        )
    }
  }
  Ok(out)
}
