# Changelog

All notable changes to `xinorigin/moon_warc` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- **Documentation & Handoff**: Added [`README.md`](README.md), [`PROJECT_PROPOSAL.md`](PROJECT_PROPOSAL.md), [`AI_USAGE.md`](AI_USAGE.md), [`SUBMISSION_CHECKLIST.md`](SUBMISSION_CHECKLIST.md), and [`docs/ci.yml.example`](docs/ci.yml.example).
