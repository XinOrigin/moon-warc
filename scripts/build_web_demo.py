#!/usr/bin/env python3
"""Build docs/moon_warc_web.js directly from XinOrigin/moon_warc via MoonBit JS foreign_library."""

from __future__ import annotations

import atexit
import json
import os
from pathlib import Path
import pwd
import re
import shutil
import subprocess
import sys

REPO_ROOT = Path(__file__).resolve().parent.parent
TMP_PKG = "_web_build_tmp"


def resolve_moon_bin() -> tuple[str | None, str | None]:
    which_moon = shutil.which("moon")
    if which_moon:
        moon_bin = str(Path(which_moon).resolve().parent)
        return moon_bin, str(Path(moon_bin).parent)
    candidates: list[Path] = []
    if os.environ.get("MOON_HOME"):
        candidates.append(Path(os.environ["MOON_HOME"]))
    candidates.append(Path.home() / ".moon")
    try:
        candidates.append(Path(pwd.getpwuid(os.getuid()).pw_dir) / ".moon")
    except KeyError:
        pass
    candidates.append(Path("/Users/xinorigin/.moon"))
    for home_dir in candidates:
        exe = home_dir / "bin" / "moon"
        if exe.is_file() and os.access(exe, os.X_OK):
            return str(exe.parent), str(home_dir)
    return None, None


def moon_env() -> dict[str, str]:
    env = os.environ.copy()
    moon_bin, moon_home = resolve_moon_bin()
    if not moon_bin:
        raise FileNotFoundError(
            "Unable to locate 'moon' binary via PATH, MOON_HOME, HOME, or passwd home."
        )
    parts = env.get("PATH", "").split(os.pathsep) if env.get("PATH") else []
    if moon_bin not in parts:
        env["PATH"] = moon_bin + os.pathsep + env.get("PATH", "")
    if moon_home and "MOON_HOME" not in env:
        env["MOON_HOME"] = moon_home
    return env


MOON_PKG = """import {
  "XinOrigin/moon_warc" @warc,
  "XinOrigin/moon_warc/codec",
  "XinOrigin/moon_warc/cdxj",
  "XinOrigin/moon_warc/digest",
  "XinOrigin/moon_warc/header",
  "XinOrigin/moon_warc/http_payload",
  "XinOrigin/moon_warc/surt",
  "moonbitlang/core/encoding/utf8",
}

pkgtype(kind: "foreign_library")
"""

WEB_MBT = r'''///|
fn truncate_str(s : String, max_chars : Int32) -> String {
  let sb = StringBuilder()
  let mut count = 0
  for ch in s {
    if count >= max_chars {
      sb.write_string("\n... (truncated)")
      break
    }
    sb.write_char(ch)
    count = count + 1
  }
  sb.to_string()
}

///|
fn extract_preview(rec : @codec.WarcRecord) -> String {
  match rec.header.warc_type() {
    Some(@header.Response) =>
      match @http_payload.parse_http_response(rec.payload) {
        Ok(resp) =>
          match @http_payload.extract_entity_body(resp) {
            Ok(ent) => {
              let decoded = @utf8.decode(ent) catch { _ => return "<binary HTTP body: " + ent.length().to_string() + " bytes>" }
              truncate_str(decoded, 1200)
            }
            Err(_) => truncate_str(@utf8.decode_lossy(rec.payload), 1200)
          }
        Err(_) => truncate_str(@utf8.decode_lossy(rec.payload), 1200)
      }
    _ => {
      let decoded = @utf8.decode(rec.payload) catch { _ => return "<binary payload: " + rec.payload.length().to_string() + " bytes>" }
      truncate_str(decoded, 1200)
    }
  }
}

///|
fn error_json(msg : String) -> String {
  let obj : Map[String, Json] = Map([])
  obj["ok"] = Json::boolean(false)
  obj["error"] = Json::string(msg)
  Json::object(obj).stringify(escape_slash=false)
}

///|
#export_name("sampleWarcGzHex")
pub fn sample_warc_gz_hex() -> String {
  let raw = @warc.sample_archive_bytes()
  match @warc.parse_archive(raw) {
    Ok(recs) => @digest.hex_encode(@warc.encode_archive_gz(recs))
    Err(_) => ""
  }
}

///|
#export_name("inspectArchiveHex")
pub fn inspect_archive_hex(
  hex_bytes : String,
  filename : String,
  surt_prefix : String,
  closest_url : String,
  closest_ts : String,
) -> String {
  let raw = match @digest.hex_decode(hex_bytes.trim().to_owned()) {
    Ok(b) => b
    Err(e) => return error_json("Invalid hex bytes: " + Debug::to_repr(e).to_string())
  }
  let is_gz = raw.length() >= 2 && raw[0] == b'\x1f' && raw[1] == b'\x8b'
  let format_str = if is_gz { "Multi-Member .warc.gz (RFC 1952)" } else { "Uncompressed WARC (ISO 28500)" }
  let records = if is_gz {
    match @warc.parse_archive_gz(raw) {
      Ok(r) => r
      Err(e) => return error_json("WARC.GZ parse failed: " + Debug::to_repr(e).to_string())
    }
  } else {
    match @warc.parse_archive(raw) {
      Ok(r) => r
      Err(e) => return error_json("WARC parse failed: " + Debug::to_repr(e).to_string())
    }
  }
  let fname = if filename.trim().is_empty() {
    if is_gz { "archive.warc.gz" } else { "archive.warc" }
  } else {
    filename.trim().to_owned()
  }
  let report = @warc.validate_archive(records)
  let revisits = @warc.resolve_revisits(records)
  let index = @warc.build_cdxj_index(records, filename=fname)

  let diags_arr : Array[Json] = []
  for d in report.diagnostics {
    let do_obj : Map[String, Json] = Map([])
    do_obj["severity"] = Json::string(Debug::to_repr(d.severity).to_string())
    do_obj["code"] = Json::string(d.code)
    do_obj["record_index"] = Json::number(d.record_index.to_double())
    do_obj["offset"] = Json::string(d.offset.to_string())
    do_obj["message"] = Json::string(d.message)
    diags_arr.push(Json::object(do_obj))
  }

  let recs_arr : Array[Json] = []
  for idx in 0..<records.length() {
    let r = records[idx]
    let h = r.header
    let ro : Map[String, Json] = Map([])
    ro["index"] = Json::number(idx.to_double())
    ro["version"] = Json::string(h.version.to_wire_string())
    ro["warc_type"] = Json::string(
      match h.warc_type() { Some(t) => t.to_wire_string(); None => "unknown" },
    )
    ro["record_id"] = Json::string(h.record_id().unwrap_or("-"))
    ro["target_uri"] = Json::string(h.target_uri().unwrap_or("-"))
    ro["date"] = Json::string(h.warc_date().unwrap_or("-"))
    ro["offset"] = Json::string(r.offset.to_string())
    ro["length"] = Json::string(r.record_length.to_string())
    ro["payload_bytes"] = Json::number(r.payload.length().to_double())
    ro["block_digest"] = Json::string(h.block_digest().unwrap_or("-"))
    ro["payload_digest"] = Json::string(h.payload_digest().unwrap_or("-"))
    ro["headers_text"] = Json::string(@utf8.decode_lossy(h.serialize()))
    ro["body_preview"] = Json::string(extract_preview(r))
    match h.warc_type() {
      Some(@header.Response) =>
        match @http_payload.parse_http_response(r.payload) {
          Ok(resp) => {
            ro["http_status"] = Json::number(resp.status_code.to_double())
            match resp.content_type_mime() {
              Some(m) => ro["mime"] = Json::string(m)
              None => ()
            }
          }
          Err(_) => ()
        }
      _ =>
        match h.content_type() {
          Some(ct) => ro["mime"] = Json::string(ct)
          None => ()
        }
    }
    recs_arr.push(Json::object(ro))
  }

  let rev_arr : Array[Json] = []
  for rv in revisits {
    let rvo : Map[String, Json] = Map([])
    rvo["revisit_index"] = Json::number(rv.revisit_index.to_double())
    rvo["revisit_id"] = Json::string(rv.revisit_id)
    rvo["match_kind"] = Json::string(Debug::to_repr(rv.match_kind).to_string())
    match rv.target_index {
      Some(ti) => rvo["target_index"] = Json::number(ti.to_double())
      None => ()
    }
    match rv.target_record_id {
      Some(tid) => rvo["target_record_id"] = Json::string(tid)
      None => ()
    }
    rev_arr.push(Json::object(rvo))
  }

  let prefix_clean = surt_prefix.trim().to_owned()
  let cdxj_list = if prefix_clean.is_empty() {
    index.entries()
  } else if prefix_clean.has_prefix("http://") || prefix_clean.has_prefix("https://") || prefix_clean.has_prefix("ftp://") {
    match @surt.to_surt(prefix_clean) {
      Ok(s) => index.lookup_prefix(s)
      Err(_) => index.lookup_prefix(prefix_clean)
    }
  } else {
    index.lookup_prefix(prefix_clean)
  }
  let cdxj_arr : Array[Json] = []
  for e in cdxj_list {
    let co : Map[String, Json] = Map([])
    co["surt"] = Json::string(e.surt)
    co["timestamp"] = Json::string(e.timestamp)
    co["url"] = Json::string(e.url)
    co["warc_type"] = Json::string(e.warc_type)
    co["offset"] = Json::string(e.offset.to_string())
    co["length"] = Json::string(e.length.to_string())
    co["line"] = Json::string(@cdxj.format_line(e))
    match e.mime { Some(m) => co["mime"] = Json::string(m); None => () }
    match e.status { Some(st) => co["status"] = Json::number(st.to_double()); None => () }
    match e.digest { Some(dg) => co["digest"] = Json::string(dg); None => () }
    cdxj_arr.push(Json::object(co))
  }

  let out : Map[String, Json] = Map([])
  out["ok"] = Json::boolean(true)
  out["version"] = Json::string(@warc.library_version())
  out["format"] = Json::string(format_str)
  out["is_gz"] = Json::boolean(is_gz)
  out["input_bytes"] = Json::number(raw.length().to_double())
  out["record_count"] = Json::number(report.record_count.to_double())
  out["valid"] = Json::boolean(report.is_valid())
  out["error_count"] = Json::number(report.error_count.to_double())
  out["warning_count"] = Json::number(report.warning_count.to_double())
  out["cdxj_total"] = Json::number(index.length().to_double())
  out["diagnostics"] = Json::array(diags_arr)
  out["records"] = Json::array(recs_arr)
  out["revisits"] = Json::array(rev_arr)
  out["cdxj_entries"] = Json::array(cdxj_arr)
  out["cdxj_text"] = Json::string(index.format_all())
  out["cdx11"] = Json::string(@warc.export_cdx11(records, filename=fname))
  out["jsonl"] = Json::string(@warc.export_jsonl(records))

  let cu = closest_url.trim().to_owned()
  let ct = closest_ts.trim().to_owned()
  if !cu.is_empty() {
    match index.lookup_closest(cu, ct) {
      Some(hit) => {
        let ho : Map[String, Json] = Map([])
        ho["surt"] = Json::string(hit.surt)
        ho["timestamp"] = Json::string(hit.timestamp)
        ho["warc_type"] = Json::string(hit.warc_type)
        ho["offset"] = Json::string(hit.offset.to_string())
        ho["length"] = Json::string(hit.length.to_string())
        match hit.digest { Some(dg) => ho["digest"] = Json::string(dg); None => () }
        out["closest_hit"] = Json::object(ho)
      }
      None => ()
    }
  }
  Json::object(out).stringify(escape_slash=false)
}
'''


def main() -> int:
    tmp_dir = REPO_ROOT / TMP_PKG
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)

    def cleanup() -> None:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    atexit.register(cleanup)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    (tmp_dir / "moon.pkg").write_text(MOON_PKG, encoding="utf-8")
    (tmp_dir / "web_api.mbt").write_text(WEB_MBT, encoding="utf-8")

    proc = subprocess.run(
        ["moon", "build", TMP_PKG, "--target", "js", "--release"],
        cwd=str(REPO_ROOT),
        env=moon_env(),
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        print(proc.stdout)
        print(proc.stderr, file=sys.stderr)
        return proc.returncode

    built_js = REPO_ROOT / "_build" / "js" / "release" / "build" / TMP_PKG / f"{TMP_PKG}.js"
    if not built_js.exists():
        raise FileNotFoundError(f"Expected built JS bundle at {built_js}")

    raw_js = built_js.read_text(encoding="utf-8")
    # Convert trailing ESM export block (if emitted) into dual CJS/Browser global bundle
    wrapped = raw_js
    m = re.search(r"export\s*\{([^}]+)\}\s*;?\s*$", wrapped)
    if m:
        body = wrapped[: m.start()].rstrip()
        pairs = []
        for item in m.group(1).split(","):
            item = item.strip()
            if not item:
                continue
            if " as " in item:
                src, dst = item.split(" as ", 1)
                pairs.append(f"{dst.strip()}: {src.strip()}")
            else:
                pairs.append(f"{item}: {item}")
        api_obj = "{ " + ", ".join(pairs) + " }"
        wrapped = (
            "(function(globalScope){\n"
            + body
            + f"\nconst api = {api_obj};\n"
            "if (typeof module !== 'undefined' && module.exports) { module.exports = api; }\n"
            "if (globalScope) { globalScope.MoonWarcWeb = api; }\n"
            "})(typeof window !== 'undefined' ? window : globalThis);\n"
        )
    else:
        raise RuntimeError(f"Unexpected JS export footer in {built_js}:\n{raw_js[-400:]}")

    out_path = REPO_ROOT / "docs" / "moon_warc_web.js"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(wrapped, encoding="utf-8")

    # Smoke test under Node.js
    node_script = (
        f"const api = require({json.dumps(str(out_path))});"
        "const hex = api.sampleWarcGzHex();"
        "const res = JSON.parse(api.inspectArchiveHex(hex, 'sample.warc.gz', 'org,example)', 'https://example.org/index.html', '20261125121000'));"
        "if (!res.ok || res.record_count !== 6 || !res.valid || !res.is_gz || res.closest_hit.warc_type !== 'revisit') {"
        "  console.error(res); process.exit(1);"
        "}"
        "console.log('WEB_BUNDLE_OK', res.version, res.format, res.record_count, 'cdxj=' + res.cdxj_total);"
    )
    node_proc = subprocess.run(["node", "-e", node_script], capture_output=True, text=True, check=False)
    print(node_proc.stdout.strip())
    if node_proc.returncode != 0:
        print(node_proc.stderr, file=sys.stderr)
        return node_proc.returncode
    print(f"Wrote {out_path} ({len(wrapped)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
