# Changelog

All notable changes to `XinOrigin/moon_warc` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-11-26

### Added

- **Pure-MoonBit Multi-Member `.warc.gz` (`gzip/`, `codec/`, `moon_warc.mbt`, PR #15 closes #11)**:
  - Implemented zero-dependency IEEE 802.3 CRC-32 (`gzip/crc32.mbt`), RFC 1951 DEFLATE decompression (`Stored`, `Fixed Huffman`, `Dynamic Huffman` with `max_output_bytes` zip-bomb guard in `gzip/inflate.mbt`), LZ77 + Fixed Huffman compression (`gzip/deflate.mbt`), and RFC 1952 multi-member container support (`FEXTRA`, `FNAME`, `FCOMMENT`, `FHCRC`, per-member CRC-32 / ISIZE, and exact `compressed_offset` / `compressed_length` in `gzip/gzip.mbt`).
  - Added `encode_record_gz`, `encode_all_gz` / `encode_archive_gz`, and `parse_all_gz` / `parse_archive_gz` to `codec` and the root facade, mapping compressed member spans directly into `CDXJ` / `CDX-11` offsets for HTTP byte-range lookups.
  - Added bidirectional Python `gzip` (`compresslevel=9` dynamic Huffman + `FNAME`) and `zlib.crc32` differential checks in [`scripts/verify_oracle.py`](scripts/verify_oracle.py).
- **64-Bit Offsets, Resource Guardrails & Streaming Scan (`codec/`, `header/`, `cdxj/`, `validate/`, PR #14)**:
  - Widened record `offset`, `record_length`, `Diagnostic.offset`, `Content-Length`, `WARC-Segment-Total-Length`, and `CDXJ` byte positions to `Int64` (> 2 GiB streams).
  - Added configurable `ReaderLimits` (`max_header_bytes`, `max_payload_bytes`) to `WarcReader` / `parse_archive` and zero-array `scan_all` / `scan_archive` streaming callbacks.
- **Executable Doc-Tests, Offline Browser `.warc.gz` Inspector & Multi-Target Benchmarks (PR #16 closes #12)**:
  - Added [`README.mbt.md`](README.mbt.md) with runnable `` ```moonbit check `` doc-tests, aligned [`moon.mod`](moon.mod) package namespace to `XinOrigin/moon_warc` with `supported_targets = [ "wasm", "wasm-gc", "js", "native" ]`, and updated [`cmd/main/main.mbt`](cmd/main/main.mbt) with a `.warc.gz` CLI demo section.
  - Built [`docs/index.html`](docs/index.html) + [`docs/moon_warc_web.js`](docs/moon_warc_web.js) via [`scripts/build_web_demo.py`](scripts/build_web_demo.py) for 100% client-side offline browser inspection of `.warc` and `.warc.gz` files.
  - Added [`scripts/run_benchmarks.py`](scripts/run_benchmarks.py) and published measured Apple M4 throughput across `wasm`, `wasm-gc`, `native`, and `js` in [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md).

### Fixed & Hardened

- Encapsulated `CdxjIndex` internal `entries` field (`priv`) with safe read-only accessors (`length`, `is_empty`, `get`, `entries()`) and strict JSON numeric validation in `cdxj::parse_line`.
- Prevented CRLF header injection in `WarcHeader::serialize`, rejected embedded blank lines in WARC and HTTP headers, percent-encoded whitespace/control bytes in `to_surt` for lossless CDXJ round-tripping, enforced ISO 28500 §9 final-segment `WARC-Segment-Total-Length` and origin target checks, and unified 14-digit calendar validation in `WarcDate::parse_cdxj_timestamp`.
- Fixed missing `docs/` exclusion pattern in [`docs/ci.yml.example`](docs/ci.yml.example).

## [0.2.1] - 2026-11-26

### Fixed & Hardened

- Amortized `WarcReader` compaction and header scan watermark (`O(n)`), Gregorian epoch-second distance in `CdxjIndex::lookup_closest`, HTTP `obs-fold` + multi-header `Transfer-Encoding` handling, CDX-11 redirect/escaping, reusable SHA work buffers, and `173/173` cross-target verification.

## [0.2.0] - 2026-11-25

### Added

- `pipeline` package: ISO 28500 §9 `segment_record` / `reassemble_segments`, multi-criteria `ArchiveFilter` / `extract_subset`, 11-column `export_cdx11`, and RFC 8259 `export_jsonl`.

## [0.1.0] - 2026-11-25

### Added

- Initial `moon-warc` pure-MoonBit release with `digest`, `surt`, `http_payload`, `header`, `codec`, `cdxj`, `validate`, root facade, CLI showcase, and Python differential oracle.
