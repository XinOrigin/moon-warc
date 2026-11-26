# Multi-Target Throughput Benchmarks (`v0.3.0`)

This report records measured end-to-end throughput across all four MoonBit compilation targets (`wasm`, `wasm-gc`, `native`, `js`) for `XinOrigin/moon_warc` `v0.3.0`.

## Environment & Toolchain

- **Hardware**: Apple M4 (`Darwin 27.2.0 arm64`)
- **Toolchain**: `moon 0.1.20261119` / `moonc v0.10.22+124d61d05` / `moonrun 0.1.20261119`
- **Harness**: [`scripts/run_benchmarks.py`](../scripts/run_benchmarks.py) (builds with `--release`)

## Workload Definition

Each target invocation constructs a 240-record corpus (`~161.4 KiB` plain ISO 28500 WARC / `~136.1 KiB` multi-member `.warc.gz`) and executes **20 full iterations** sequentially:
1. **Plain WARC streaming parse (`parse_archive` / `WarcReader`)**: `3,228,400` bytes (`3.08 MiB`)
2. **Pure-MoonBit FIPS 180-4 SHA-256 (`@digest.sha256`)**: `3,228,400` bytes (`3.08 MiB`)
3. **Multi-member RFC 1952 `.warc.gz` DEFLATE + WARC parse (`parse_archive_gz`)**: `2,721,120` compressed bytes -> `3,228,400` uncompressed bytes (`3.08 MiB`)
4. **Lexicographic CDXJ index build + 1,000 exact binary-search lookups (`build_cdxj_index` + `lookup_exact`)**

Total verified bytes processed per run (parse + SHA-256 + `.warc.gz` inflate/parse): **`9.24 MiB`** (`9,685,200` bytes) plus initial corpus generation (`encode_archive_gz` LZ77 + `encode_archive`) and CDXJ indexing.

## Measured Results (`--release`)

| Target | Wall Time (s) | Plain Parsed | `.warc.gz` Inflated+Parsed | SHA-256 Hashed | CDXJ Hits | Combined Pipeline Throughput |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **`wasm`** | `3.702 s` | `3.08 MiB` | `3.08 MiB` | `3.08 MiB` | `1,000` | **`2.50 MiB/s`** |
| **`wasm-gc`** | `16.937 s` | `3.08 MiB` | `3.08 MiB` | `3.08 MiB` | `1,000` | **`0.55 MiB/s`** |
| **`native`** | `18.114 s` | `3.08 MiB` | `3.08 MiB` | `3.08 MiB` | `1,000` | **`0.51 MiB/s`** |
| **`js`** | `29.611 s` | `3.08 MiB` | `3.08 MiB` | `3.08 MiB` | `1,000` | **`0.31 MiB/s`** |

## Key Engineering Takeaways

1. **Zero-FFI Linear Memory Wasm Leads Multi-Stage Pipelines**: The `wasm` linear-memory backend completes full plain parsing + SHA-256 + RFC 1951 DEFLATE decompression + 20 CDXJ rebuilds in `3.702 s` (`2.50 MiB/s` combined pipeline throughput), making client-side offline browser WARC inspection (`docs/index.html`) highly responsive.
2. **Future Optimization Target**: Current `WarcReader::feed` and DEFLATE `inflate_raw` allocate intermediate `Array[Byte]` growable arrays and copy byte-by-byte; migrating hot inner loops to pre-sized `FixedArray[Byte]` / `@buffer.Buffer` chunks is the primary lever to bring `native` and `wasm-gc` in line with `wasm`.

Reproduce locally:

```bash
export PATH="$HOME/.moon/bin:$PATH"
python3 scripts/run_benchmarks.py
```
