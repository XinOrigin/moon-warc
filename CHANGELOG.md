# Changelog

All notable changes to `xinorigin/moon_warc` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-11-26

### Fixed & Hardened

- **`codec` Streaming & Digest Fixes ([`codec/reader.mbt`](codec/reader.mbt), [`codec/writer.mbt`](codec/writer.mbt))**:
  - Replaced 4KB suffix-copying compaction with amortized compaction (`cursor >= 4096 && cursor >= remaining`), added `header_scan_pos` scan watermark to prevent `O(n^2)` header rescanning, and added `checked_add_i32` overflow protection on offsets and record lengths.
  - Hid `WarcReader` mutable internal fields (`priv`), recomputed `WARC-Payload-Digest` on unsegmented `Resource` records during `encode_record(auto_digest=true)`, and exposed `new_reader()` on the root facade ([`moon_warc.mbt`](moon_warc.mbt)).
- **`cdxj` & `http_payload` Hardening ([`cdxj/cdxj.mbt`](cdxj/cdxj.mbt), [`http_payload/http_payload.mbt`](http_payload/http_payload.mbt))**:
  - Converted 14-digit UTC timestamps to Gregorian epoch seconds in `CdxjIndex::lookup_closest` so cross-midnight and cross-month intervals match accurately, added `CdxjIndex::from_entries` sorted constructor, tightened `CdxjIndex` construction, and guarded `parse_int_string` against `Int32` overflow.
  - Fixed `find_header_split` to pick whichever of `\r\n\r\n` or `\n\n` appears earlier, added HTTP `obs-fold` continuation line unfolding, and checked comma-separated tokens across all `Transfer-Encoding` header lines in `HttpResponse::is_chunked`.
- **`pipeline`, `digest`, & `header` Hardening**:
  - Enforced stream ordering in `reassemble_segments` when a `continuation` record precedes its origin, avoided buffer capacity multiplication overflow, populated the CDX-11 redirect column (`r`) from HTTP `Location`, and percent-encoded spaces/tabs/newlines in CDX-11 columns via `sanitize_cdx_field`.
  - Marked `Sha1Hasher`/`Sha256Hasher` fields `priv` with reusable block schedule buffers (`w`), eliminated duplicate `sb.to_string()` allocation in `WarcHeader::serialize`, expanded test coverage to **173 / 173 passing tests**, and aligned `PROJECT_PROPOSAL.md` and documentation.

## [0.2.0] - 2026-11-25

### Added

- **`pipeline` Package ([`pipeline/`](pipeline/))**:
  - **ISO 28500 §9 Segmentation & Reassembly (`segment.mbt`)**: `segment_record`, `reassemble_segments`, and `PipelineError` (`InvalidSegmentSize`, `MissingOriginRecord`, `MissingSegmentNumber`, `OutOfOrderSegment`, `TotalLengthMismatch`, `PayloadDigestMismatch`) preserving full logical `WARC-Payload-Digest` across origin + `continuation` slices and verifying contiguous `2..N` sequencing, `WARC-Segment-Total-Length`, and reassembled entity digests.
  - **Archive Subset Filtering (`filter.mbt`)**: `ArchiveFilter` (`ArchiveFilter::all`, `ArchiveFilter::new`), `matches_filter`, `filter_records`, and `extract_subset` supporting `warc_types`, `surt_prefix`, lowercase `mime_prefix`, HTTP `status_min`/`status_max`, and normalized 14-digit UTC `date_from`/`date_to` (`String::lexical_compare`), with optional `warcinfo` retention.
  - **CDX-11 & LLM JSONL Export (`export.mbt`)**: `export_cdx11` (standard `" CDX N b a m s k r M S V g"` header + 11 space-delimited columns) and `export_jsonl` (`JsonlOptions`, RFC 8259 control-character escaping, HTTP de-chunking, Unicode scalar truncation, graceful omission of `"text"` on binary or non-UTF-8 payloads).
- **`header` Segmentation Helpers ([`header/header.mbt`](header/header.mbt))**: Added `WarcHeader::without_field`, `segment_number`, `segment_origin_id`, and `segment_total_length`.
- **`validate` Continuation Rules ([`validate/validate.mbt`](validate/validate.mbt))**: Expanded from 18 to **22 diagnostic codes** by validating `continuation` records (`MISSING_SEGMENT_ORIGIN_ID`, `INVALID_SEGMENT_ORIGIN_ID`, `UNRESOLVED_SEGMENT_ORIGIN_ID`, `INVALID_SEGMENT_NUMBER`) and syntax-checking `WARC-Payload-Digest` on segmented origin records (`WARC-Segment-Number: 1`).
- **Root Facade, CLI & Differential Oracle**: Exposed `segment_record`, `reassemble_segments`, `filter_records`, `extract_subset`, `export_cdx11`, and `export_jsonl` in [`moon_warc.mbt`](moon_warc.mbt), bumped `library_version()` and [`moon.mod`](moon.mod) to `0.2.0`, added §9 and subset/CDX-11/JSONL sections to [`cmd/main/main.mbt`](cmd/main/main.mbt), and expanded [`scripts/verify_oracle.py`](scripts/verify_oracle.py) to cross-check all `v0.2.0` pipeline outputs.
- **Documentation & Project Proposal**: Added [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/FAQ.md`](docs/FAQ.md); updated [`README.md`](README.md), [`PROJECT_PROPOSAL.md`](PROJECT_PROPOSAL.md), and [`AI_USAGE.md`](AI_USAGE.md).

### Changed

- **`codec` `auto_digest` Guard ([`codec/writer.mbt`](codec/writer.mbt))**: Preserved full logical `WARC-Payload-Digest` on segmented origin HTTP `response` records (`WARC-Segment-Number` present) when re-encoding wire records.
- **Verification Scale**: Test suite expanded from 116 to **163 / 163 passing tests** across `wasm`, `wasm-gc`, `js`, and `native` (8,192 total lines of `.mbt` across 10 workspace packages).

## [0.1.0] - 2026-11-25

### Added

- **Module & Packaging**: Initialized `xinorigin/moon_warc` (`Apache-2.0`) using modern MoonBit 1.0 `moon.mod` / `moon.pkg` configuration with zero external dependencies and [`.moonignore`](.moonignore) archive hygiene rules.
- **`digest` Package ([`digest/`](digest/))**: Pure-MoonBit incremental `Sha1Hasher` / `Sha256Hasher` (FIPS 180-4 / RFC 3174), RFC 4648 `base32_encode` / `base32_decode`, `hex_encode` / `hex_decode`, and `WARC-Block-Digest` / `WARC-Payload-Digest` formatting, parsing, and verification.
- **`surt` Package ([`surt/`](surt/))**: URI parser (`parse_uri`) and canonical SURT converter (`to_surt`) supporting reversed domain labels, default port stripping, dot-segment path normalization, lexicographically ordered query parameters (`String::lexical_compare`), IPv4 addresses, and bracketed IPv6 literals.
- **`http_payload` Package ([`http_payload/`](http_payload/))**: Binary-safe HTTP/1.x request & response parsers (`parse_http_request`, `parse_http_response`), RFC 9112 `Transfer-Encoding: chunked` decoder (`decode_chunked`, including chunk extensions and trailing headers), and `extract_entity_body`.
- **`header` Package ([`header/`](header/))**: `WarcVersion` (`WARC/1.0`, `WARC/1.1`), all 8 ISO 28500 `WarcType` variants plus `Extension`, strict UTC `WarcDate` validation (leap years, fractional seconds, and 14-digit CDXJ timestamps), and `WarcHeader` parser/serializer with folded header support and case-insensitive lookup.
- **`codec` Package ([`codec/`](codec/))**: Sans-IO incremental streaming `WarcReader` (`new`, `feed`, `next_record`, `finish`) with 4KB buffer compaction and exact `offset` / `record_length` tracking, batch `parse_all`, `encode_record` / `encode_all` (with `auto_digest` for Block & de-chunked HTTP Payload digests), and typed builders (`build_warcinfo`, `build_request`, `build_response`, `build_resource`, `build_metadata`, `build_revisit`, `build_conversion`, `make_record`).
- **`cdxj` Package ([`cdxj/`](cdxj/))**: `CdxjEntry` and lexicographically sorted `CdxjIndex` (`build`, `from_record`, `format_line`, `parse_line`, `format_all`) with binary-search `lookup_exact`, `lookup_prefix`, and `lookup_closest`.
- **`validate` Package ([`validate/`](validate/))**: ISO 28500 conformance validator (`validate_archive`) emitting structured `ValidationReport` diagnostics (`Error` / `Warning`, 18 diagnostic codes, record index, byte offset) and `resolve_revisits` (`ByRecordId`, `ByUriAndDigest`, `Unresolved`).
- **Root Facade & CLI ([`moon_warc.mbt`](moon_warc.mbt), [`cmd/main/`](cmd/main/))**: Unified library entrypoints (`library_version`, `parse_archive`, `encode_archive`, `build_cdxj_index`, `validate_archive`, `resolve_revisits`, `sample_archive_bytes`) and an executable end-to-end showcase CLI verified on both `native` and `js` targets.
- **Verification & Differential Oracle**: Added [`scripts/verify_all.sh`](scripts/verify_all.sh), [`scripts/verify_oracle.py`](scripts/verify_oracle.py) (Python `hashlib` / `base64` / `json` cross-check), and fuzz/negative/hardening suites ([`codec/fuzz_test.mbt`](codec/fuzz_test.mbt), [`validate/negative_test.mbt`](validate/negative_test.mbt), [`moon_warc_hardening_test.mbt`](moon_warc_hardening_test.mbt)), achieving **116 / 116 passing tests** across `wasm`, `wasm-gc`, `js`, and `native`.
- **Documentation & Handoff**: Added [`README.md`](README.md), [`PROJECT_PROPOSAL.md`](PROJECT_PROPOSAL.md), [`AI_USAGE.md`](AI_USAGE.md), and [`docs/ci.yml.example`](docs/ci.yml.example).
