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
    let idx = @warc.build_cdxj_index(gz_recs, filename="bench.warc.gz")
    for k in 0..<50 {
      cdx_hits = cdx_hits + idx.lookup_exact("https://bench0.example.org/page/0.html").length()
      ignore(k)
    }
  }
  println("BENCH_DONE|plain_bytes=" + parsed_bytes.to_string() + "|gz_uncompressed_bytes=" + gz_bytes.to_string() + "|gz_compressed_bytes=" + (gz.length().to_int64() * iters.to_int64()).to_string() + "|digest_bytes=" + digest_bytes.to_string() + "|cdx_hits=" + cdx_hits.to_string())
}

///|
fn main {
  run_bench(__ITERS__)
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

    results = []
    iters = 150
    for target in ["native", "js", "wasm-gc", "wasm"]:
        # 1) Measure 0-iter baseline (runtime spawn + corpus encode)
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
        b0 = time.perf_counter()
        run0 = subprocess.run(
            ["moon", "run", TMP_PKG, "--target", target, "--release"],
            cwd=str(REPO_ROOT),
            env=moon_env(),
            capture_output=True,
            text=True,
            check=False,
        )
        dt_base = time.perf_counter() - b0
        if run0.returncode != 0:
            print(f"Baseline run failed for {target}:\n{run0.stdout}\n{run0.stderr}", file=sys.stderr)
            return run0.returncode

        # 2) Measure 50-iter full benchmark
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

        t0 = time.perf_counter()
        run = subprocess.run(
            ["moon", "run", TMP_PKG, "--target", target, "--release"],
            cwd=str(REPO_ROOT),
            env=moon_env(),
            capture_output=True,
            text=True,
            check=False,
        )
        dt = time.perf_counter() - t0
        if run.returncode != 0:
            print(f"Run failed for {target}:\n{run.stdout}\n{run.stderr}", file=sys.stderr)
            return run.returncode
        line = [l for l in run.stdout.splitlines() if l.startswith("BENCH_DONE|")][-1]
        kv = dict(item.split("=", 1) for item in line.split("|")[1:])
        plain_mb = int(kv["plain_bytes"]) / (1024 * 1024)
        total_pipeline_mb = plain_mb * 3  # plain parse + sha256 + gz inflate/parse
        steady_dt = max(0.001, dt - dt_base)
        results.append((target, dt, dt_base, steady_dt, plain_mb, total_pipeline_mb / dt, total_pipeline_mb / steady_dt, int(kv["gz_compressed_bytes"])))
        print(
            f"{target}: wall={dt:.3f}s (baseline={dt_base:.3f}s, steady={steady_dt:.3f}s) "
            f"plain={plain_mb:.2f}MiB wall_throughput={total_pipeline_mb/dt:.2f} MiB/s "
            f"steady_throughput={total_pipeline_mb/steady_dt:.2f} MiB/s ({line})"
        )

    return 0


if __name__ == "__main__":
    sys.exit(main())
