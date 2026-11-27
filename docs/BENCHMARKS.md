# Multi-Target Throughput & External Baseline Benchmarks (`v0.4.0`)

This report records measured end-to-end throughput across all four MoonBit compilation targets (`native`, `js`, `wasm-gc`, `wasm`) alongside a same-machine external CPython (`zlib` + `hashlib` C extension) baseline and an honest MoonBit ecosystem feature comparison.

## Environment & Toolchain

- **Hardware**: Apple M4 (`Darwin arm64`)
- **Toolchain**: `moon 0.1.20261119` / `moonc v0.10.22+124d61d05` / `moonrun 0.1.20261119`
- **Harness**: [`scripts/run_benchmarks.py`](../scripts/run_benchmarks.py) (`--release`, warm min-of-3 measurement eliminating cold start latency, comparing `0`-iter spawn/build baseline vs `150`-iter full workload)

## Workload Definition (`92.37 MiB` Verified Pipeline)

Each run constructs a 240-record ISO 28500 digest-bearing corpus (`161,420 B` plain WARC/1.1 with `WARC-Block-Digest` and de-chunked `WARC-Payload-Digest`; `136,056 B` multi-member `.warc.gz` compressed by `moon-warc`) and executes **150 full iterations**:
1. **Plain WARC zero-copy parse (`parse_archive`)**: `24,213,000` bytes (`23.09 MiB`)
2. **Pure-MoonBit FIPS 180-4 SHA-256 (`@digest.sha256`)**: `24,213,000` bytes (`23.09 MiB`)
3. **Multi-member `.warc.gz` batch decode (`parse_archive_gz`)**: `20,408,400` compressed bytes -> `24,213,000` uncompressed bytes (`23.09 MiB`)
4. **Constant-member-RAM `.warc.gz` streaming scan (`scan_archive_gz`)**: `20,408,400` compressed bytes -> `24,213,000` uncompressed bytes (`23.09 MiB`)
5. **150 `String::lexical_compare` CDXJ index rebuilds (`build_cdxj_index`) + 7,500 exact binary-search lookups (`lookup_exact`)**

Total uncompressed/verified stream data processed per target run: **`92.37 MiB`** (`96,852,000` bytes).

## Measured Results (`v0.4.0`, `--release`)

| Implementation / Target | Wall (s) | Baseline (s) | Steady (s) | Pipeline Processed | Wall Throughput | Steady Throughput | C-Ext / Relative Notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| **CPython `python3-c-ext`** (`zlib` + `hashlib` C ext + Python SURT/bisect) | `0.471 s` | — | `0.471 s` | `92.37 MiB` | `196.11 MiB/s` | `196.11 MiB/s` | Native C `zlib`/`OpenSSL` FFI baseline |
| **`moon-warc native`** (Pure MoonBit, zero C FFI) | `0.864 s` | `0.042 s` | `0.822 s` | `92.37 MiB` | **`106.96 MiB/s`** | **`112.39 MiB/s`** | **57.3%** of C-ext speed cleanly in safe MoonBit |
| **`moon-warc js`** (Pure MoonBit -> JS) | `1.532 s` | `0.082 s` | `1.450 s` | `92.37 MiB` | **`60.29 MiB/s`** | **`63.68 MiB/s`** | Runs natively in browsers / Node |
| **`moon-warc wasm-gc`** (Pure MoonBit -> WasmGC) | `1.815 s` | `0.040 s` | `1.775 s` | `92.37 MiB` | **`50.88 MiB/s`** | **`52.03 MiB/s`** | Runs inside sandboxed WasmGC runtimes |
| **`moon-warc wasm`** (Pure MoonBit -> Wasm32) | `1.978 s` | `0.045 s` | `1.933 s` | `92.37 MiB` | **`46.69 MiB/s`** | **`47.78 MiB/s`** | Portable linear-memory Wasm |

### Compression Ratio & Design Trade-off

On the 240-record multi-member `.warc.gz` corpus (`161,420 B` uncompressed containing ~116 B high-entropy Base32 SHA-256 headers per record):
- **CPython `gzip.compress(..., compresslevel=6)`** (Dynamic Huffman + LZ77, `BTYPE=2`): **`118,547 B`** (`73.4%` of raw size)
- **`XinOrigin/moon_warc` `encode_archive_gz`** (Fixed Huffman + LZ77, `BTYPE=1`): **`136,056 B`** (`84.3%` of raw size)
- *Trade-off disclosed*: Keeping `deflate_raw` on Fixed Huffman avoids per-record dynamic Huffman tree emission overhead for short WARC members (~500–700 B each) and achieves `50–112 MiB/s` streaming speed, while `inflate_raw` decodes **all three** RFC 1951 block types (`Stored`, `Fixed`, `Dynamic`, verified against `gzip -9`). Adding optional Dynamic Huffman compression (`BTYPE=2`) for multi-megabyte HTML bodies is scoped for future releases.

## MoonBit Ecosystem Comparison (`mooncakes.io` Baseline)

| Capability | `xiaojing012/moon-warc` (`0.1.0`, `mooncakes.io`) | `XinOrigin/moon_warc` (`v0.4.0`, this project) |
| --- | --- | --- |
| ISO 28500 WARC 1.0 & 1.1 Streaming (`Sans-IO`) | WARC/1.1 framing | WARC/1.0 & WARC/1.1, `Int64` > 2 GiB offsets, `ReaderLimits`, `scan_archive` |
| Pure-MoonBit RFC 1951/1952 `.warc.gz` | Not included | Multi-member DEFLATE/CRC-32, `scan_archive_gz`, **chunk-incremental `WarcGzReader`** |
| Pure-MoonBit SHA-1 / SHA-256 & Base32/Hex | Deferred (`SHA` not implemented) | Full FIPS 180-4 / RFC 3174 block + digest verifier & auto-digest writer |
| HTTP/1.x Header Split & RFC 9112 Chunked Decode | Basic header parsing | Binary-safe splitter (`obs-fold`, multi-TE) + full chunked decoder for `WARC-Payload-Digest` |
| SURT / CDXJ / CDX-11 / Revisit / §9 / JSONL | Basic index / validate | Lexical SURT (`lexical_compare`), CDXJ `lookup_closest`, CDX-11, `resolve_revisits`, §9 split/reassembly, RFC 8259 JSONL, `record_http_exchange_gz` |
| Cross-Target Verification & Live Demo | Library tests | **194/194 tests** on all 4 targets + Python differential oracle + CPython benchmark + offline browser app |

Reproduce locally:

```bash
export PATH="$HOME/.moon/bin:$PATH"
python3 scripts/run_benchmarks.py
```
