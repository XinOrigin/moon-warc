# Multi-Target Throughput & External Baseline Benchmarks (`v0.5.0`)

This report records measured end-to-end throughput across all four MoonBit compilation targets (`native`, `js`, `wasm-gc`, `wasm`), native `moon bench --release` microbenchmarks, Dynamic Huffman compression ratio vs CPython `zlib`, and an honest MoonBit ecosystem feature comparison.

## Environment & Toolchain

- **Cloud CI Runner (Primary `v0.5.0` Unthrottled Linux Baseline)**: Tencent Cloud CNB `16 vCPU / 32 GiB RAM` (`AMD EPYC 9754`, `Linux 5.4 x86_64`), `moon 0.1.20261126` / `moonc v1.0.0-rc1+3c0520448` / `moonrun 0.1.20261126`, `Node.js v22.20.0`, `Python 3.12.3`.
- **Local Cross-Check**: Apple M4 (`Darwin arm64`), `moon 0.1.20261119` / `moonc v0.10.22+124d61d05` (pass **200/200** tests across all 4 targets & **5/5** `moon bench`).
- **Harness**: [`scripts/run_benchmarks.py`](../scripts/run_benchmarks.py) (`--release`, warm min-of-3 measurement eliminating cold start latency, comparing `0`-iter spawn/build baseline vs `150`-iter full workload) and native [`moon_warc_bench_test.mbt`](../moon_warc_bench_test.mbt) (`moon bench --release --target native`).

## Workload Definition (`92.37 MiB` Verified Pipeline)

Each `run_benchmarks.py` run constructs a 240-record ISO 28500 digest-bearing corpus (`161,420 B` plain WARC/1.1 with `WARC-Block-Digest` and de-chunked `WARC-Payload-Digest`; **`118,906 B`** multi-member Dynamic-Huffman `.warc.gz` compressed by `moon-warc v0.5.0`) and executes **150 full iterations**:
1. **Plain WARC zero-copy parse (`parse_archive`)**: `24,213,000` bytes (`23.09 MiB`)
2. **Pure-MoonBit FIPS 180-4 SHA-256 (`@digest.sha256`)**: `24,213,000` bytes (`23.09 MiB`)
3. **Multi-member `.warc.gz` batch decode (`parse_archive_gz`)**: `17,835,900` compressed bytes -> `24,213,000` uncompressed bytes (`23.09 MiB`)
4. **Constant-member-RAM `.warc.gz` streaming scan (`scan_archive_gz` + `InflateScratch`)**: `17,835,900` compressed bytes -> `24,213,000` uncompressed bytes (`23.09 MiB`)
5. **150 `String::lexical_compare` CDXJ index rebuilds (`build_cdxj_index`) + 7,500 exact binary-search lookups (`lookup_exact`)**

Total uncompressed/verified stream data processed per target run: **`92.37 MiB`** (`96,852,000` bytes).

## Measured 4-Target Results (`v0.5.0`, `--release`, CNB `16C32G` Linux `x86_64`)

| Implementation / Target | Wall (s) | Baseline (s) | Steady (s) | Pipeline Processed | Wall Throughput | Steady Throughput | Relative Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| **CPython `python3-c-ext`** (`zlib` + `hashlib` C ext + Python SURT/bisect) | `0.501 s` | — | `0.501 s` | `92.37 MiB` | `184.19 MiB/s` | `184.19 MiB/s` | Native C `zlib`/`OpenSSL` FFI baseline |
| **`moon-warc native`** (Pure MoonBit, zero C FFI) | `1.235 s` | `0.024 s` | `1.211 s` | `92.37 MiB` | **`74.77 MiB/s`** | **`76.26 MiB/s`** | Includes Dynamic Huffman (`BTYPE=2`) across 36k enc + 72k dec members |
| **`moon-warc wasm-gc`** (Pure MoonBit -> WasmGC) | `1.393 s` | `0.043 s` | `1.350 s` | `92.37 MiB` | **`66.31 MiB/s`** | **`68.42 MiB/s`** | +31.5% faster than `v0.4.0` Fixed-Huffman even with full `BTYPE=2` |
| **`moon-warc js`** (Pure MoonBit -> JS) | `2.217 s` | `0.106 s` | `2.111 s` | `92.37 MiB` | **`41.67 MiB/s`** | **`43.76 MiB/s`** | Runs natively in browsers / Node `v22` |
| **`moon-warc wasm`** (Pure MoonBit -> Wasm32) | `2.969 s` | `0.059 s` | `2.910 s` | `92.37 MiB` | **`31.11 MiB/s`** | **`31.74 MiB/s`** | Portable linear-memory Wasm |

## Native `@bench.T` Microbenchmarks (`moon bench --release --target native`, CNB `16C32G`)

Measured directly from [`moon_warc_bench_test.mbt`](../moon_warc_bench_test.mbt) over `sample_archive_bytes()` (`3,188 B`, 6 ISO 28500 records / 6 `.warc.gz` members):

| Benchmark Case | Mean ± σ | Range (Min … Max) | Sample Size |
| --- | ---: | ---: | ---: |
| `bench: parse_archive plain WARC/1.1` | **`10.65 µs`** ± `17.27 ns` | `10.63 µs … 10.68 µs` | `10 × 9,380` |
| `bench: encode_archive_gz + parse_archive_gz (Dynamic Huffman)` | **`139.98 µs`** ± `165.49 ns` | `139.80 µs … 140.29 µs` | `10 × 709` |
| `bench: scan_archive_gz streaming` | **`64.05 µs`** ± `146.46 ns` | `63.87 µs … 64.38 µs` | `10 × 1,566` |
| `bench: sha256 FIPS 180-4 digest` | **`13.36 µs`** ± `6.34 ns` | `13.35 µs … 13.37 µs` | `10 × 7,468` |
| `bench: build_cdxj_index + lookup_closest` | **`5.65 µs`** ± `9.59 ns` | `5.64 µs … 5.67 µs` | `10 × 17,785` |

### Dynamic Huffman (`BTYPE=2`) Compression Ratio (`v0.4.0` -> `v0.5.0`)

On the 240-record multi-member `.warc.gz` corpus (`161,420 B` uncompressed containing ~116 B high-entropy Base32 SHA-256 headers per record):
- **`v0.4.0` Fixed Huffman (`BTYPE=1`)**: `136,056 B` (`84.3%` of raw size)
- **`v0.5.0` Dynamic Huffman (`BTYPE=2`, zero-alloc `DeflateScratch`)**: **`118,906 B`** (**`73.7%`** of raw size — saves `17,150 B` / `12.6%`)
- **CPython `gzip.compress(..., compresslevel=6)`**: **`118,547 B`** (**`73.4%`** of raw size — `moon-warc` is within **`359 B` (`0.3%`)** of C `zlib`)

At `level >= 6`, `deflate_raw` builds length-limited canonical Huffman trees (`compute_code_lengths_into` via Van Leeuwen two-queue merge + Kraft `<= 15`/`<= 7` clamping inside pre-allocated `DeflateScratch`), compares exact bit costs of Dynamic (`BTYPE=2`), Fixed (`BTYPE=1`), and Stored (`BTYPE=0`), and runs `BitWriter` once for the smallest representation.

## MoonBit Ecosystem Comparison (`mooncakes.io` Baseline)

| Capability | `xiaojing012/moon-warc@0.1.0` (`docs/limitations.md`) | `XinOrigin/moon_warc@0.5.0` (this project) |
| --- | --- | --- |
| ISO 28500 WARC 1.0 & 1.1 Streaming (`Sans-IO`) | WARC/1.1 framing | WARC/1.0 & WARC/1.1, `Int64` > 2 GiB offsets, `ReaderLimits`, `scan_archive` |
| Pure-MoonBit RFC 1951/1952 `.warc.gz` | Not included | Multi-member **Dynamic Huffman (`BTYPE=2`)** encoder, `InflateScratch` reuse, `scan_members_while`, **`WarcGzReader`** |
| Pure-MoonBit SHA-1 / SHA-256 & Base32/Hex | Deferred (not implemented) | Full FIPS 180-4 / RFC 3174 block + digest verifier & auto-digest writer |
| HTTP/1.x Header Split & RFC 9112 Chunked Decode | Basic header parsing | Binary-safe splitter (`obs-fold`, multi-TE) + full chunked decoder for `WARC-Payload-Digest` |
| SURT / CDXJ / WACZ 1.1.1 / §9 / JSONL | Basic index / validate | Lexical SURT (`lexical_compare`), CDXJ `lookup_closest`, CDX-11, **WACZ 1.1.1 manifests**, `resolve_revisits`, §9 split/reassembly, RFC 8259 JSONL, `record_http_exchange_gz` |
| Cross-Target Verification, `moon bench` & Examples | Basic unit tests | **200/200 tests** on all 4 targets + **5/5 `moon bench`** + `examples/crawler_to_rag` + Python oracle + browser demo |

Reproduce locally:

```bash
export PATH="/Users/xinorigin/.moon/bin:$PATH"
moon bench --release --target native
python3 scripts/run_benchmarks.py
```
