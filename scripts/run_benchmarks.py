#!/usr/bin/env python3
"""Measure cross-target throughput of XinOrigin/moon_warc across native, js, wasm, and wasm-gc."""

from __future__ import annotations

import atexit
import os
from pathlib import Path
import shutil
import subprocess
import sys
import time

REPO_ROOT = Path(__file__).resolve().parent.parent
TMP_PKG = "_bench_probe_tmp"


def moon_env() -> dict[str, str]:
    env = os.environ.copy()
    moon_bin = str(Path.home() / ".moon" / "bin")
    parts = env.get("PATH", "").split(os.pathsep) if env.get("PATH") else []
    if moon_bin not in parts:
        env["PATH"] = moon_bin + os.pathsep + env.get("PATH", "")
    return env


MOON_PKG = """import {
  "XinOrigin/moon_warc" @warc,
  "XinOrigin/moon_warc/codec",
  "XinOrigin/moon_warc/digest",
  "moonbitlang/core/encoding/utf8",
}

pkgtype(kind: "executable")
"""

BENCH_MBT = r'''///|
fn make_corpus() -> (Array[@codec.WarcRecord], Bytes, Bytes) {
  let records : Array[@codec.WarcRecord] = []
  let body_txt = "<!doctype html><html><body><h1>Benchmark Archive Record</h1><p>ISO 28500 WARC & multi-member .warc.gz streaming throughput corpus for MoonBit across native, js, wasm, and wasm-gc targets.</p></body></html>\n"
  let raw_http = ("HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n" + body_txt)
  let http_bytes = @utf8.encode(raw_http)
  for i in 0..<240 {
    records.push(
      @codec.build_response(
        record_id="<urn:uuid:bench-\{i.to_string()}>",
        date="2026-11-26T12:00:00Z",
        target_uri="https://bench\{((i % 20)).to_string()}.example.org/page/\{i.to_string()}.html",
        http_bytes,
      ),
    )
  }
  let plain = @warc.encode_archive(records)
  let gz = @warc.encode_archive_gz(records)
  (records, plain, gz)
}

///|
fn run_bench(iters : Int) -> Unit {
  let (_records, plain, gz) = make_corpus()
  let mut parsed_bytes = 0L
  let mut gz_bytes = 0L
  let mut digest_bytes = 0L
  let mut cdx_hits = 0
  for _ in 0..<iters {
    let recs = @warc.parse_archive(plain).unwrap()
    parsed_bytes = parsed_bytes + plain.length().to_int64()
    ignore(@digest.sha256(plain))
    digest_bytes = digest_bytes + plain.length().to_int64()
    let gz_recs = @warc.parse_archive_gz(gz).unwrap()
    gz_bytes = gz_bytes + plain.length().to_int64()
    let mut scanned_gz_bytes = 0L
    match @warc.scan_archive_gz(gz, fn(_r) { () }) {
      Ok(_) => scanned_gz_bytes = scanned_gz_bytes + plain.length().to_int64()
      Err(_) => abort("scan_archive_gz failed")
    }
    let idx = @warc.build_cdxj_index(gz_recs, filename="bench.warc.gz")
    for k in 0..<50 {
      cdx_hits = cdx_hits + idx.lookup_exact("https://bench0.example.org/page/0.html").length()
      ignore(k)
    }
    ignore(scanned_gz_bytes)
  }
  let combined_plain = parsed_bytes + (gz_bytes * 2L)
  println("BENCH_DONE|plain_bytes=" + parsed_bytes.to_string() + "|gz_uncompressed_bytes=" + gz_bytes.to_string() + "|gz_compressed_bytes=" + (gz.length().to_int64() * iters.to_int64()).to_string() + "|digest_bytes=" + digest_bytes.to_string() + "|cdx_hits=" + cdx_hits.to_string() + "|corp_plain_len=" + plain.length().to_string() + "|corp_gz_len=" + gz.length().to_string() + "|total_bytes=" + (combined_plain + digest_bytes).to_string())
}

///|
fn main {
  run_bench(__ITERS__)
}
'''


def measure_warm_min(cmd: list[str], cwd: Path, repeats: int = 3) -> tuple[float, str]:
    # Warm up once (avoids macOS Gatekeeper / JIT cold-start outlier on first exec)
    warm = subprocess.run(cmd, cwd=str(cwd), env=moon_env(), capture_output=True, text=True, check=False)
    if warm.returncode != 0:
        raise RuntimeError(f"Run failed ({warm.returncode}): {' '.join(cmd)}\n{warm.stdout}\n{warm.stderr}")
    best_dt = float("inf")
    best_out = warm.stdout
    for _ in range(repeats):
        t0 = time.perf_counter()
        proc = subprocess.run(cmd, cwd=str(cwd), env=moon_env(), capture_output=True, text=True, check=False)
        dt = time.perf_counter() - t0
        if proc.returncode != 0:
            raise RuntimeError(f"Run failed ({proc.returncode}): {' '.join(cmd)}\n{proc.stdout}\n{proc.stderr}")
        if dt < best_dt:
            best_dt = dt
            best_out = proc.stdout
    return best_dt, best_out


def main() -> int:
    tmp_dir = REPO_ROOT / TMP_PKG
    if tmp_dir.exists():
        shutil.rmtree(tmp_dir)

    def cleanup() -> None:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    atexit.register(cleanup)
    tmp_dir.mkdir(parents=True, exist_ok=True)
    (tmp_dir / "moon.pkg").write_text(MOON_PKG, encoding="utf-8")

    results = []
    iters = 150
    for target in ["native", "js", "wasm-gc", "wasm"]:
        # 1) Measure 0-iter baseline (runtime spawn + corpus encode) with warm min-of-3
        (tmp_dir / "main.mbt").write_text(BENCH_MBT.replace("__ITERS__", "0"), encoding="utf-8")
        build0 = subprocess.run(
            ["moon", "build", TMP_PKG, "--target", target, "--release"],
            cwd=str(REPO_ROOT),
            env=moon_env(),
            capture_output=True,
            text=True,
            check=False,
        )
        if build0.returncode != 0:
            print(f"Baseline build failed for {target}:\n{build0.stdout}\n{build0.stderr}", file=sys.stderr)
            return build0.returncode
        dt_base, _ = measure_warm_min(["moon", "run", TMP_PKG, "--target", target, "--release"], REPO_ROOT)

        # 2) Measure 150-iter full benchmark (plain parse + sha256 + parse_archive_gz + scan_archive_gz + CDXJ)
        (tmp_dir / "main.mbt").write_text(BENCH_MBT.replace("__ITERS__", str(iters)), encoding="utf-8")
        build = subprocess.run(
            ["moon", "build", TMP_PKG, "--target", target, "--release"],
            cwd=str(REPO_ROOT),
            env=moon_env(),
            capture_output=True,
            text=True,
            check=False,
        )
        if build.returncode != 0:
            print(f"Build failed for {target}:\n{build.stdout}\n{build.stderr}", file=sys.stderr)
            return build.returncode

        dt, stdout_txt = measure_warm_min(["moon", "run", TMP_PKG, "--target", target, "--release"], REPO_ROOT)
        line = [l for l in stdout_txt.splitlines() if l.startswith("BENCH_DONE|")][-1]
        kv = dict(item.split("=", 1) for item in line.split("|")[1:])
        plain_mb = int(kv["plain_bytes"]) / (1024 * 1024)
        total_pipeline_mb = int(kv["total_bytes"]) / (1024 * 1024)  # plain parse + sha256 + parse_gz + scan_gz
        steady_dt = max(0.001, dt - dt_base)
        results.append((target, dt, dt_base, steady_dt, total_pipeline_mb, total_pipeline_mb / dt, total_pipeline_mb / steady_dt, int(kv["corp_plain_len"]), int(kv["corp_gz_len"])))
        print(
            f"{target}: wall={dt:.3f}s (baseline={dt_base:.3f}s, steady={steady_dt:.3f}s) "
            f"pipeline={total_pipeline_mb:.2f}MiB wall_throughput={total_pipeline_mb/dt:.2f} MiB/s "
            f"steady_throughput={total_pipeline_mb/steady_dt:.2f} MiB/s ({line})"
        )

    # 3) Measure CPython 3 (zlib + hashlib C extensions + Python WARC/SURT/CDXJ) on an identical digest-bearing 240-record corpus
    import base64
    import bisect
    import gzip
    import hashlib
    import zlib

    body_txt = (
        "<!doctype html><html><body><h1>Benchmark Archive Record</h1>"
        "<p>ISO 28500 WARC & multi-member .warc.gz streaming throughput corpus for "
        "MoonBit across native, js, wasm, and wasm-gc targets.</p></body></html>\n"
    )
    raw_http = f"HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n{body_txt}".encode("utf-8")
    entity_dig = "sha256:" + base64.b32encode(hashlib.sha256(raw_http.split(b"\r\n\r\n", 1)[1]).digest()).decode("ascii")
    block_dig = "sha256:" + base64.b32encode(hashlib.sha256(raw_http).digest()).decode("ascii")
    plain_parts = []
    gz_parts = []
    for i in range(240):
        hdr = (
            "WARC/1.1\r\n"
            "WARC-Type: response\r\n"
            f"WARC-Record-ID: <urn:uuid:bench-{i}>\r\n"
            "WARC-Date: 2026-11-26T12:00:00Z\r\n"
            f"WARC-Target-URI: https://bench{i % 20}.example.org/page/{i}.html\r\n"
            "Content-Type: application/http; msgtype=response\r\n"
            f"Content-Length: {len(raw_http)}\r\n"
            f"WARC-Block-Digest: {block_dig}\r\n"
            f"WARC-Payload-Digest: {entity_dig}\r\n\r\n"
        ).encode("utf-8")
        rec = hdr + raw_http + b"\r\n\r\n"
        plain_parts.append(rec)
        gz_parts.append(gzip.compress(rec, compresslevel=6))
    py_plain = b"".join(plain_parts)
    py_gz = b"".join(gz_parts)

    def py_to_surt_fast(url: str) -> str:
        _, rest = url.split("://", 1)
        host, path = rest.split("/", 1)
        labels = host.split(".")
        labels.reverse()
        return ",".join(labels) + ")/" + path

    def py_scan_warc(raw: bytes) -> list[tuple[str, bytes]]:
        out = []
        p = 0
        n = len(raw)
        while p < n:
            hend = raw.find(b"\r\n\r\n", p)
            hbytes = raw[p:hend]
            uri = ""
            clen = 0
            for ln in hbytes.split(b"\r\n")[1:]:
                if ln.startswith(b"WARC-Target-URI: "):
                    uri = ln[17:].decode("ascii")
                elif ln.startswith(b"Content-Length: "):
                    clen = int(ln[16:])
            pstart = hend + 4
            out.append((uri, raw[pstart : pstart + clen]))
            p = pstart + clen + 4
        return out

    def py_split_gz_members(raw: bytes) -> list[bytes]:
        out = []
        mv = memoryview(raw)
        while mv:
            d = zlib.decompressobj(16 + zlib.MAX_WBITS)
            out.append(d.decompress(mv))
            mv = memoryview(d.unused_data)
        return out

    py_t0 = time.perf_counter()
    py_cdx_hits = 0
    for _ in range(iters):
        _ = py_scan_warc(py_plain)
        _ = hashlib.sha256(py_plain).digest()
        # Run 2 gzip passes matching parse_archive_gz + scan_archive_gz
        ms = py_split_gz_members(py_gz)
        recs = [py_scan_warc(m)[0] for m in ms]
        _ = [py_scan_warc(m)[0] for m in py_split_gz_members(py_gz)]
        cdx = sorted((py_to_surt_fast(u), i) for i, (u, _) in enumerate(recs))
        keys = [item[0] for item in cdx]
        target_key = "org,example,bench0)/page/0.html"
        for _k in range(50):
            pos = bisect.bisect_left(keys, target_key)
            if pos < len(keys) and keys[pos] == target_key:
                py_cdx_hits += 1
    py_dt = time.perf_counter() - py_t0
    py_total_mb = (len(py_plain) * iters * 4) / (1024 * 1024)
    print(
        f"python3-c-ext (zlib+hashlib+surt+cdx): wall={py_dt:.3f}s pipeline={py_total_mb:.2f}MiB "
        f"throughput={py_total_mb/py_dt:.2f} MiB/s cdx_hits={py_cdx_hits} "
        f"py_corpus_plain={len(py_plain)}B py_corpus_gz_lvl6={len(py_gz)}B"
    )

    return 0


if __name__ == "__main__":
    sys.exit(main())
