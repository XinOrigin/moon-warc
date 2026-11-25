///|
/// Strategy used to link a `revisit` record back to its original captured payload.
#derive(Eq, Debug)
pub(all) enum RevisitMatchKind {
  ByRecordId
  ByUriAndDigest
  Unresolved
}

///|
/// Resolution result for a single `revisit` record.
#derive(Eq, Debug)
pub(all) struct ResolvedRevisit {
  revisit_index : Int32
  revisit_id : String
  target_uri : String
  revisit_date : String
  match_kind : RevisitMatchKind
  target_index : Int32?
  target_record_id : String?
}

///|
/// Resolves each `revisit` record in `records` back to its original capture record,
/// preferring `WARC-Refers-To` ID lookup and falling back to `(WARC-Target-URI, WARC-Payload-Digest)`.
pub fn resolve_revisits(
  records : Array[@codec.WarcRecord],
) -> Array[ResolvedRevisit] {
  let id_to_index : Map[String, Int32] = Map([])
  let uri_digest_to_index : Map[String, Int32] = Map([])
  for idx in 0..<records.length() {
    let hdr = records[idx].header
    match hdr.record_id() {
      Some(rid) => id_to_index[rid] = idx
      None => ()
    }
    let is_original_payload = match hdr.warc_type() {
      Some(@header.Response) | Some(@header.Resource) => true
      _ => false
    }
    if is_original_payload {
      match (hdr.target_uri(), hdr.payload_digest()) {
        (Some(u), Some(d)) => {
          let key = u + "\u0000" + d
          if !uri_digest_to_index.contains(key) {
            uri_digest_to_index[key] = idx
          }
        }
        _ => ()
      }
    }
  }
  let out : Array[ResolvedRevisit] = []
  for idx in 0..<records.length() {
    let hdr = records[idx].header
    match hdr.warc_type() {
      Some(@header.Revisit) => {
        let rev_id = hdr.record_id().unwrap_or("")
        let uri = hdr.target_uri().unwrap_or("")
        let date = hdr.warc_date().unwrap_or("")
        let by_id = match hdr.refers_to() {
          Some(ref_id) =>
            match id_to_index.get(ref_id) {
              Some(t_idx) =>
                if t_idx != idx {
                  Some((t_idx, records[t_idx].header.record_id()))
                } else {
                  None
                }
              None => None
            }
          None => None
        }
        match by_id {
          Some((t_idx, t_rid)) =>
            out.push({
              revisit_index: idx,
              revisit_id: rev_id,
              target_uri: uri,
              revisit_date: date,
              match_kind: ByRecordId,
              target_index: Some(t_idx),
              target_record_id: t_rid,
            })
          None => {
            let key = uri + "\u0000" + hdr.payload_digest().unwrap_or("")
            match uri_digest_to_index.get(key) {
              Some(t_idx) =>
                out.push({
                  revisit_index: idx,
                  revisit_id: rev_id,
                  target_uri: uri,
                  revisit_date: date,
                  match_kind: ByUriAndDigest,
                  target_index: Some(t_idx),
                  target_record_id: records[t_idx].header.record_id(),
                })
              None =>
                out.push({
                  revisit_index: idx,
                  revisit_id: rev_id,
                  target_uri: uri,
                  revisit_date: date,
                  match_kind: Unresolved,
                  target_index: None,
                  target_record_id: None,
                })
            }
          }
        }
      }
      _ => ()
    }
  }
  out
}
