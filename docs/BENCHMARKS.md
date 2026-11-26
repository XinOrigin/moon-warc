# Multi-Target Throughput Benchmarks (`v0.3.1`)

This report records measured end-to-end throughput across all four MoonBit compilation targets (`wasm`, `wasm-gc`, `native`, `js`) for `XinOrigin/moon_warc` `v0.3.1`.

## Environment & Toolchain

- **Hardware**: Apple M4 (`Darwin arm64`)
- **Toolchain**: `moon 0.1.20261119` / `moonc v0.10.22+124d61d05` / `moonrun 0.1.20261119`
- **Harness**: [`scripts/run_benchmarks.py`](../scripts/run_benchmarks.py) (`--release`, measuring both 0-iteration baseline and 150-iteration steady-state execution)

## Workload Definition

Each target invocation constructs a 240-record corpus (`~161.4 KiB` plain ISO 28500 WARC / `~136.1 KiB` multi-member `.warc.gz`) and executes **150 full pipeline iterations** sequentially:
1. **Plain WARC zero-copy streaming scan/parse (`parse_archive` / `scan_all`)**: `24,213,000` bytes (`23.09 MiB`)
2. **Pure-MoonBit FIPS 180-4 SHA-256 (`@digest.sha256`)**: `24,213,000` bytes (`23.09 MiB`)
3. **Multi-member RFC 1952 `.warc.gz` DEFLATE + WARC parse (`parse_archive_gz`)**: `20,408,400` compressed bytes -> `24,213,000` uncompressed bytes (`23.09 MiB`)
4. **Lexicographic CDXJ index build + 7,500 exact binary-search lookups (`build_cdxj_index` + `lookup_exact`)**

Total verified bytes processed per run (plain parse + SHA-256 + `.warc.gz` inflate/parse): **`69.28 MiB`** (`72,639,000` bytes) plus 150 full CDXJ index rebuilds and 7,500 exact lookups.

## Measured Results (`v0.3.1`, `--release`)

| Target | Total Wall (s) | 0-Iter Baseline (s) | Steady Pipeline (s) | Combined Bytes Processed | Wall Throughput | Steady-State Throughput | Speedup vs `v0.3.0` |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **`native`** | `1.035 s` | `0.244 s` | `0.791 s` | `69.28 MiB` | **`66.92 MiB/s`** | **`87.53 MiB/s`** | **171x** (`0.51` -> `87.53`) |
| **`wasm-gc`** | `1.083 s` | `0.037 s` | `1.047 s` | `69.28 MiB` | **`63.94 MiB/s`** | **`66.19 MiB/s`** | **120x** (`0.55` -> `66.19`) |
| **`js`** | `1.133 s` | `0.078 s` | `1.055 s` | `69.28 MiB` | **`61.12 MiB/s`** | **`65.65 MiB/s`** | **211x** (`0.31` -> `65.65`) |
| **`wasm`** | `1.319 s` | `0.044 s` | `1.276 s` | `69.28 MiB` | **`52.50 MiB/s`** | **`54.30 MiB/s`** | **21.7x** (`2.50` -> `54.30`) |

## Key Optimizations Delivered in `v0.3.1`

1. **9-Bit Canonical Huffman Lookup Table + Unboxed `ByteSink` (`gzip/inflate.mbt`)**: Replaced bit-by-bit tree walks and generic boxed `Array[Byte]` pushes with a 512-entry O(1) prefix lookup table (`<= 9` bits) and doubling `FixedArray[Byte]` output buffer + tight LZ77 match copy.
2. **Zero-Copy Direct `BytesView` Path in `scan_all` + Unboxed `WarcReader` (`codec/reader.mbt`)**: Eliminated full-archive copies in `scan_all` / `parse_archive` by scanning headers directly on `BytesView` and upgrading `WarcReader` internal buffering to unboxed `FixedArray[Byte]`.
3. **Zero-Allocation ASCII Header Matching (`header/header.mbt`)**: Replaced `.to_owned().to_lower()` string allocations on header field lookups and `WARC-Type` matching with `eq_ignore_ascii_case`.

Reproduce locally:

```bash
export PATH="$HOME/.moon/bin:$PATH"
python3 scripts/run_benchmarks.py
```
