# Changelog

All notable changes to `XinOrigin/moon_warc` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.1] - 2026-11-28

### Fixed & Hardened

- **Multi-Member Gzip Bomb & `>2 GiB` Truncation Guard (`gzip/gzip.mbt`)**: Rewrote `decompress` to stream members via `scan_members_while`-style `parse_member_at` iteration with cumulative `max_output_bytes` clamping (aborting *mid-member* before aggregate overflow, eliminating double-copy on single-member streams and `Int64::to_int()` wraparound when `max_output_bytes < 0`).
- **Signed `Int32` Addition Overflow Guards (`gzip/gzip.mbt`, `gzip/deflate.mbt`, `pipeline/segment.mbt`)**: Replaced addition-based bounds checks (`pos + N > total`) with subtraction-based guards and `Int64`-clamped buffer capacities across `read_u16_le_at`, `read_u32_le_at`, `compress`, `parse_member_at`, `deflate_stored`, `collect_lz77_tokens`, and `segment_record::next_segment_end`.
- **Inflate Entry Validation & Error Propagation (`gzip/inflate.mbt`)**: Rejected negative or out-of-bounds `start` offsets in `inflate_raw_with_scratch`, converted `ByteSink::ensure_extra` / `push_*` / `copy_match` from `abort()` panics to `Result[Unit, GzipError]` (`LimitExceeded`), and capped initial sink preallocation to `64 KiB` so large `.warc.gz` scans do not eagerly allocate `2 * remaining` bytes.
- **WARC Header Name Sanitization & Folded Injection Defense (`header/header.mbt`)**: Sanitized whitespace (`<= 32`, `DEL`), `\r`, `\n`, and `:` consistently inside `WarcHeader::with_field`, `without_field`, and `serialize`, collapsed duplicate header names (preventing dual `Content-Length` smuggling), and stripped NUL bytes (`\u0000`) from header values.
- **`encode_record` Wire Framing & Payload Digest Integrity (`codec/writer.mbt`)**: Synchronized `Content-Length` even under `auto_digest=false` whenever missing, duplicated, or mismatched with `payload.length()` (while preserving byte-for-byte identity for already-valid records), cleared stale `WARC-Payload-Digest` headers when `auto_digest=true` encounters corrupt HTTP `Response` payloads, and clamped `Buffer` preallocation via `Int64`.
- **Verification Script Portability & Cross-Target Probe Parity (`scripts/`)**: Updated `scripts/verify_oracle.py`, `scripts/build_web_demo.py`, `scripts/run_benchmarks.py`, and `scripts/verify_all.sh` to resolve `moon` across `PATH`, `MOON_HOME`, `$HOME`, and `passwd` home directories, run `verify_oracle.py` differential probes on both `native` and `js`, and clean `pkg-list.txt` via `trap ... EXIT`.

### Added

- **P0/P1 Regression & Whitebox Unit-Test Suite (`gzip/gzip_wbtest.mbt`, `pipeline/segment_wbtest.mbt`, `*_test.mbt`)**: Expanded total verification suite from `200` to **`211/211` passing tests** (`12` packages, `40` `.mbt` files) covering multi-member Gzip aggregate bombs, negative `inflate_raw` offsets, near-`Int32::MAX` bounds, header smuggling/folding injection, `encode_record` frame smuggling, `WarcGzReader` multi-record incremental slicing, `reassemble_segments` `Response` entity mismatch, `build_wacz_manifests` SHA-256 verification, Base32 trailing-bit checks, and root-facade `ReaderLimits` / `.warc.gz` negative paths.

## [0.5.0] - 2026-11-28

### Added

- **Zero-Allocation Dynamic Huffman (`BTYPE=2`) Compression & Reusable `InflateScratch` (`gzip/`, `codec/`)**:
  - Upgraded `gzip/deflate.mbt` with O(1) length/distance lookup LUTs (`len_packed_lut`, `dist_lo_lut`, `dist_hi_lut`), adaptive LZ77 hash window (`1024`/`4096`/`32768`), reusable `DeflateScratch` (`in_use` guard), and Van Leeuwen two-queue Huffman construction with exact Kraft `max_bits` (`15`/`7`) clamping, choosing the exact minimum-bit block among Dynamic (`BTYPE=2`), Fixed (`BTYPE=1`), and Stored (`BTYPE=0`). Cut 240-record `.warc.gz` corpus size from `136,056 B` (`84.3%`) to **`118,906 B` (`73.7%`)** — within `359 B` (`0.3%`) of CPython `gzip -6` (`118,547 B`).
  - Upgraded `gzip/inflate.mbt`, `gzip/gzip.mbt`, and `codec/reader.mbt` with parameterized-width `HuffmanTable` (`7`/`9`/`8` fast bits), reusable `InflateScratch` across Gzip members, and `@gzip.scan_members_while` early-stop streaming used by `scan_all_gz`, boosting CNB `16C32G` Linux `x86_64` steady throughput to **`76.26 MiB/s` `native`** and **`68.42 MiB/s` `wasm-gc`** with Dynamic Huffman enabled.
- **WebRecorder WACZ 1.1.1 Manifest Generator (`pipeline/wacz.mbt`, `moon_warc.mbt`)**:
  - Added `WaczManifests` and `build_wacz_manifests` generating `datapackage.json` (`wacz_version: "1.1.1"`), `datapackage-digest.json` (SHA-256 hex digest over `datapackage.json`), and `indexes/index.cdxj`.
- **End-to-End Example, Native `moon bench` Suite & Multi-OS / Ecosystem Readiness**:
  - Added runnable example [`examples/crawler_to_rag/`](examples/crawler_to_rag/) demonstrating HTTP crawler capture -> `WarcGzReader` -> WACZ 1.1.1 -> filtered LLM RAG JSONL (verified byte-identical on `native` & `js`).
  - Added 5 `@bench.T` microbenchmarks in [`moon_warc_bench_test.mbt`](moon_warc_bench_test.mbt) (`moon bench --release --target native`, all 5 passing on macOS `arm64` & CNB Linux `x86_64`).
  - Added strict 3-OS (`ubuntu`, `macos`, `windows`) workflow template in [`docs/ci.yml.example`](docs/ci.yml.example), explicit `xiaojing012/moon-warc@0.1.0` differentiation in [`README.mbt.md`](README.mbt.md), and WACZ + `examples/crawler_to_rag` oracle checks in [`scripts/verify_oracle.py`](scripts/verify_oracle.py) and [`scripts/verify_all.sh`](scripts/verify_all.sh).

### Changed

- **`moonc v1.0.0-rc1` Strict `--deny-warn` Compatibility (`codec/writer.mbt`, `gzip/`, `pipeline/segment.mbt`)**: Replaced all 14 deprecated `@buffer.Buffer::write_bytes` calls with `.write_bytesview(...[:])` caught by Tencent Cloud CNB `moon 0.1.20261126` (`v1.0.0-rc1`), ensuring clean `--deny-warn --target all` passes across both `0.10.22` and `1.0.0-rc1` with **200/200** tests passing (`12` packages, `38` `.mbt` files, **227** uncovered core library lines).

### Fixed & Hardened

- **Chunked Transfer `Int32` Overflow Guard (`http_payload/http_payload.mbt`)**: Replaced addition-based slice bounds checks in `decode_chunked` with subtraction-based guards so `7fffffff\r\n\r\n` returns `Err(TruncatedChunkBody)` instead of panicking on signed overflow.
- **`WarcGzReader` Compressed Member Limits & Buffer Reclamation (`codec/reader.mbt`)**: Enforced `max_compressed_member_for_limits(limits)` against unbounded incomplete gzip streams (`FNAME`/deflate stalling) and immediately released `> 64 KiB` buffers when drained.
- **Pipeline, DEFLATE & Validation Hardening (`pipeline/`, `gzip/`, `validate/`)**: Excluded `revisit` and `continuation` raw payloads from `export_jsonl` `"text"` extraction; normalized `warc_filename` to a clean basename in `build_wacz_manifests`; widened `deflate_raw` bit-cost accumulators to `Int64`; and rejected inner whitespace or nested `<`/`>` characters in `is_uri_angle_wrapped`.

## [0.4.0] - 2026-11-27

### Added

- **Constant-Member-Memory Streaming `.warc.gz` & Chunked `WarcGzReader` (`gzip/`, `codec/`, `moon_warc.mbt`)**:
  - Added `@gzip.scan_members` and `@gzip.try_decompress_member` (`MemberStep::{Parsed, NeedMoreInput, Failed}`) distinguishing truncated prefixes from corrupted RFC 1952 headers, DEFLATE streams, or CRC-32/ISIZE trailers.
  - Added `@codec.scan_all_gz` / `@moon_warc.scan_archive_gz` and chunk-incremental Sans-IO `WarcGzReader` (`new`, `feed`, `next_record`, `finish`, `bytes_consumed`) streaming multi-record and multi-member `.warc.gz` archives at arbitrary chunk boundaries (`1B`/`7B`/`17B`/`64B`) with `O(single-member)` peak memory.
- **Crawler HTTP Exchange Capture API (`codec/writer.mbt`, `moon_warc.mbt`)**:
  - Added `build_http_exchange` / `record_http_exchange` and `encode_http_exchange_gz` / `record_http_exchange_gz`, generating `WARC-Concurrent-To`-linked `request` + `response` (+ optional `metadata`) `.warc.gz` archives with automatic SHA-256 block and de-chunked payload digests.
- **Executable Doc-Test #3, CLI Showcase, External Baseline & Coverage Hardening**:
  - Added Doc-Test #3 (`chunked WarcGzReader streaming and HTTP crawler exchange capture`) in [`README.mbt.md`](README.mbt.md) and extended [`cmd/main/main.mbt`](cmd/main/main.mbt) & [`scripts/verify_oracle.py`](scripts/verify_oracle.py) to differentially test `scan_archive_gz`, 7B-chunked `WarcGzReader`, and `record_http_exchange_gz` against Python `gzip -9`.
  - Extended [`scripts/run_benchmarks.py`](scripts/run_benchmarks.py) and [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md) with a same-machine external CPython (`zlib` + `hashlib` C extensions) baseline (`112.39 MiB/s` pure MoonBit `native` vs `196.11 MiB/s` CPython C-ext) and honest Fixed-vs-Dynamic Huffman compression comparison.
  - Expanded test coverage to **194/194 passing** across `wasm`, `wasm-gc`, `js`, and `native`, reducing uncovered core library lines from 267 to **229** via `moon coverage analyze`.

## [0.3.1] - 2026-11-26

### Performance

- **10x–200x Pipeline Throughput Upgrade across All 4 Targets ([`docs/BENCHMARKS.md`](docs/BENCHMARKS.md), PR #17)**:
  - **9-Bit Huffman Fast Lookup Table & Unboxed `ByteSink` (`gzip/inflate.mbt`)**: Replaced 1-bit-at-a-time Huffman loops and generic `Array[Byte]` pushes with a 512-entry O(1) prefix table (`<= 9`-bit codes) plus unboxed doubling `FixedArray[Byte]` buffers.
  - **Zero-Copy `BytesView` Fast Path in `scan_all` / `parse_archive` & Unboxed `WarcReader` (`codec/reader.mbt`)**: Removed full-stream copies for in-memory archives while preserving identical `ReaderLimits` / `CodecError` diagnostics, and upgraded incremental `WarcReader` buffering to unboxed `FixedArray[Byte]`.
  - **Zero-Allocation Header Comparisons (`header/header.mbt`)**: Replaced per-lookup `.to_owned().to_lower()` allocations in `WarcHeader::{get,get_all,with_field,without_field}` and `WarcType::parse` with `eq_ignore_ascii_case`.
  - Measured steady-state throughput on Apple M4 (`69.28 MiB` combined plain + SHA-256 + `.warc.gz` + CDXJ workload): **`native 87.53 MiB/s`**, **`wasm-gc 66.19 MiB/s`**, **`js 65.65 MiB/s`**, **`wasm 54.30 MiB/s`**.

### Fixed & Hardened

- **Subtraction-Based Overflow Guards (`gzip/inflate.mbt`, `gzip/gzip.mbt`)**: Hardened `FEXTRA` length, trailer 8-byte check (`total_len - deflate_end < 8`), stored-block length, and `max_output_bytes` bounds against signed `Int32` overflow near `Int32::MAX`.
- **Deterministic Multi-Record Single-Member `.warc.gz` CDXJ Tie-Breaking (`cdxj/cdxj.mbt`)**: Extended `compare_entries` with `warc_type`, `url`, and `digest` tie-breakers when multiple records inside one gzip member share `(surt, timestamp, offset)`.

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
