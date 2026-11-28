# moon-warc Architecture Guide (`v0.5.1`)

`XinOrigin/moon_warc` is a pure-MoonBit, zero-external-dependency implementation of **ISO 28500 (WARC 1.0 / 1.1)**, **Dynamic-Huffman RFC 1951/1952 multi-member `.warc.gz`**, and **WebRecorder WACZ 1.1.1** manifests, built as a layered **Sans-IO** protocol engine across 12 workspace packages (`moon.mod` version `0.5.1`, 40 `.mbt` files, **211/211 tests** across `wasm`, `wasm-gc`, `js`, and `native` + **5/5** `moon bench` native benchmarks).

---

## 1. Layered Package DAG

```mermaid
flowchart TD
  CMD["cmd/main (CLI Showcase)"] --> ROOT["moon_warc (Root Facade)"]
  EX["examples/crawler_to_rag (End-to-End Example)"] --> ROOT
  EX --> PIPE
  ROOT --> CODEC["codec (Sans-IO Stream Reader, Limits & .warc.gz)"]
  ROOT --> CDXJ["cdxj (Private Sorted Index & Binary Search)"]
  ROOT --> VAL["validate (22 Diagnostic Codes & Revisit Resolver)"]
  ROOT --> PIPE["pipeline (ISO 28500 §9, Filter, CDX-11, WACZ 1.1.1 & JSONL)"]
  ROOT --> HDR["header (WARC 1.0/1.1 Headers & UTC Date)"]
  ROOT --> DIG["digest (FIPS 180-4 SHA-1/256 & Base32/Hex)"]

  PIPE --> CODEC
  PIPE --> HDR
  PIPE --> DIG
  PIPE --> HTTP["http_payload (HTTP/1.x & RFC 9112 Chunked)"]
  PIPE --> SURT["surt (URI Parser & SURT Canonicalizer)"]
  PIPE --> CDXJ

  VAL --> CODEC
  VAL --> HDR
  VAL --> DIG
  VAL --> HTTP

  CDXJ --> CODEC
  CDXJ --> HDR
  CDXJ --> SURT
  CDXJ --> HTTP

  CODEC --> HDR
  CODEC --> DIG
  CODEC --> HTTP
  CODEC --> GZIP["gzip (Dynamic-Huffman DEFLATE/LZ77, InflateScratch, CRC-32 & RFC 1952)"]

  GZIP --> CORE["moonbitlang/core (Zero External Deps)"]
  HDR --> CORE
  DIG --> CORE
  SURT --> CORE
  HTTP --> CORE
```

### ASCII Dependency View

```text
                +-----------------------+   +---------------------------+
                |   cmd/main (demo)     |   | examples/crawler_to_rag   |
                +-----------+-----------+   +-------------+-------------+
                            |                             |
                            +--------------+--------------+
                                           |
                               +-----------v-----------+
                               | moon_warc (root API)  |
                               +--+----+----+----+---+-+
                                  |    |    |    |   |
                +-----------------+    |    |    |   +-----------------+
                v                      v    v    v                     v
        +---------------+      +-------+  +-+--+ +----------+  +---------------+
        | pipeline (§9, |      | validate| |cdxj| |  codec   |  | digest / hdr  |
        | wacz, jsonl)  |      +----+----+ +--+-+ +----+-----+  +-------+-------+
        +---+--+--+--+-+            |         |        |                |
            |  |  |  +--------------+---------+--------+                |
            |  |  |                 |         |        |                |
            v  v  v                 v         v        v                v
         +--+--+--+-----------------+---------+--------+----------------+--+
         |     digest  |  gzip  |  header  |  http_payload  |  surt  | core|
         +-----------------------------------------------------------------+
```

Notice the strict **acyclic bottom-up** design:
- Leaf primitives (`digest`, `surt`, `http_payload`) depend solely on `moonbitlang/core`.
- `header` adds ISO 28500 framing types, UTC date validation, and folded headers.
- `codec` drives wire-level streaming and serialization without touching filesystems or sockets.
- `cdxj`, `validate`, and `pipeline` sit atop `codec` for archival indexing, conformance auditing, segmentation/reassembly, subsetting, and corpus export.

---

## 2. Sans-IO Streaming State Machine (`codec/reader.mbt`)

`WarcReader` decouples framing from I/O so the exact same parser runs over Node streams, browser `ReadableStream` chunks, WASM host buffers, or local file reads without conditional compilation.

```mermaid
flowchart LR
  S0["SeekHeader"] -->|"Found \r\n\r\n & valid Content-Length"| S1["ReadPayload (hdr, remaining)"]
  S1 -->|"Available >= remaining"| S2["ReadTrailingCrlf (hdr, payload)"]
  S2 -->|"Found trailing \r\n\r\n"| EMIT["Emit WarcRecord (exact offset, record_length) -> SeekHeader"]
  S2 -->|"Mismatch after payload"| ERR["Err(InvalidTrailingSeparator)"]
  EOF["finish()"] -->|"Non-SeekHeader or leftover bytes"| UEOF["Err(UnexpectedEof)"]
  EOF -->|"SeekHeader & available == 0"| OK["Ok(())"]
```

### Memory, Scratch Reuse & Offset Invariants
1. **Amortized Compaction & Header Scan Watermark (`WarcReader`)**: `WarcReader::compact_if_needed()` resets exhausted buffers immediately and only compacts non-empty buffers when `cursor >= 4096 && cursor >= remaining`, while `header_scan_pos` tracks the `\r\n\r\n` scan watermark across incremental `feed()` calls so large `parse_all()` buffers and multi-chunk streams avoid `O(n²)` copying or rescanning.
2. **Zero-Allocation Dynamic Huffman & `InflateScratch` (`gzip/deflate.mbt`, `gzip/inflate.mbt`, `gzip/gzip.mbt`)**:
   - **Encoding (`deflate_raw`)**: Uses module-level O(1) packed LUTs (`len_packed_lut`, `dist_lo_lut`, `dist_hi_lut`), an adaptive-sized LZ77 hash chain (`1024` / `4096` / `32768`), and a reusable `DeflateScratch` (`in_use` re-entrancy guard) running flat insertion sort + Van Leeuwen two-queue Huffman tree construction + exact Kraft `max_bits` (`15`/`7`) clamping; selects exact minimum-bit-cost output among Dynamic (`BTYPE=2`), Fixed (`BTYPE=1`), and Stored (`BTYPE=0`) before invoking `BitWriter` once.
   - **Decoding (`inflate_raw` / `scan_members_while` / `WarcGzReader`)**: Reuses a single `InflateScratch` (`cl_tbl` 7-bit, `lit_tbl` 9-bit, `dist_tbl` 8-bit fast lookup tables + `ByteSink` shrinking >1 MiB buffers back to `32 KiB`) across all `.warc.gz` members in `scan_members_while` and `scan_all_gz`, falling back cleanly on re-entrant callbacks. `gzip::try_decompress_member` distinguishes truncated stream prefixes (`NeedMoreInput`) from hard corruption (`Failed(GzipError)`), enabling `WarcGzReader` (`new_gz_reader()`) to stream over arbitrary chunk splits while tracking cumulative compressed `bytes_consumed() -> Int64`.
3. **Arbitrary Slice Independence**: `codec/fuzz_test.mbt`, `codec/codec_test.mbt`, `gzip/gzip_test.mbt`, and `moon_warc_test.mbt` verify identical decoded records, `Int64` byte offsets, and `record_length` values across plain chunks and compressed `.warc.gz` chunks (`1B`, `2B`, `3B`, `5B`, `7B`, `13B`, `17B`, `32B`, `64B`).
4. **Crawler Exchange Capture (`record_http_exchange` / `record_http_exchange_gz`)**: Generates bidirectional `WARC-Concurrent-To` linked `request` + `response` (+ optional `metadata`) captures with automatic SHA-256 block & de-chunked HTTP entity payload digests.
5. **Exact `Int64` Offset Tracking & Overflow Guard**: `total_consumed` / `compressed_consumed` track cumulative stream bytes using `checked_add_i64` (exceeding 2 GiB streams cleanly while rejecting `Int64` wraparound).

---

## 3. Block Digest vs. De-Chunked Payload Digest Closed Loop

ISO 28500 distinguishes two cryptographic integrity levels on HTTP captures:
- **`WARC-Block-Digest`**: SHA-1 or SHA-256 (Base32 or Hex) over the raw WARC record payload bytes (`HTTP/1.x status line + headers + body`, including chunked framing).
- **`WARC-Payload-Digest`**: Digest over the **logical entity payload** inside the record. For HTTP `response` records encoded with `Transfer-Encoding: chunked`, RFC 9112 chunk sizes, `;ext=val` extensions, CRLFs, and trailers must be stripped first via `http_payload::extract_entity_body()`.

Both `codec::encode_record(..., auto_digest=true)` and `validate::validate_archive()` apply this same HTTP parser + chunk decoder, and `scripts/verify_oracle.py` cross-checks both digests against Python's `hashlib` + `base64.b32encode`.

---

## 4. ISO 28500 §9 Segmentation, Filtering, WACZ 1.1.1 & Export Pipeline (`pipeline/`)

```mermaid
flowchart TD
  REC["Oversized WarcRecord"] --> SEG["segment_record(max_segment_bytes)"]
  SEG --> O["Origin Record (WARC-Segment-Number: 1, preserves logical WARC-Payload-Digest)"]
  SEG --> C["Continuation Records (WARC-Segment-Origin-ID, Number: 2..N, Total-Length on N)"]
  O --> WIRE["encode_archive + parse_archive + validate_archive"]
  C --> WIRE
  WIRE --> RE["reassemble_segments()"]
  RE --> CHECK["Verify contiguous 2..N + Total-Length + Block/Payload Digests"]
  CHECK --> OUT["Logical Restored WarcRecord"]

  WIRE --> FLT["filter_records / extract_subset(ArchiveFilter)"]
  WIRE --> CDX["export_cdx11 (CDX-11) & CdxjIndex (CDXJ)"]
  WIRE --> WACZ["build_wacz_manifests (WACZ 1.1.1 datapackage + digests)"]
  WIRE --> JSONL["export_jsonl (RFC 8259 JSONL + UTF-8 entity text)"]
```

### Key Pipeline Guarantees
1. **Digest Preservation Across Wire Re-Encoding**: `codec::encode_record` checks `if h.get("WARC-Segment-Number") is None` before recomputing `WARC-Payload-Digest` on `Response` records, ensuring segmented origin records retain their full logical entity digest while per-segment `Content-Length` and `WARC-Block-Digest` are recomputed automatically.
2. **Validation Rules in `validate`**: `continuation` records require `<...>` wrapped `WARC-Segment-Origin-ID` (`MISSING_SEGMENT_ORIGIN_ID` / `INVALID_SEGMENT_ORIGIN_ID` Errors; `UNRESOLVED_SEGMENT_ORIGIN_ID` Warning if origin missing in stream) and `WARC-Segment-Number >= 2` (`INVALID_SEGMENT_NUMBER` Error). Segmented origin records (`WARC-Segment-Number: 1`) syntax-check `WARC-Payload-Digest`, delegating byte-level entity verification to `reassemble_segments()`.
3. **WebRecorder WACZ 1.1.1 & RAG Export (`build_wacz_manifests`, `export_jsonl`, `examples/crawler_to_rag`)**: Generates Frictionless Data `datapackage.json`, `datapackage-digest.json` (SHA-256 hex digest over `datapackage.json`), and `indexes/index.cdxj`; extracts de-chunked HTTP bodies or textual resource bodies (`text/*`, `application/json`, `application/xml`, `application/warc-fields`, `application/xhtml+xml`, `+json`, `+xml`), validates strict UTF-8 via `@utf8.decode`, safely truncates by Unicode scalar count (`max_body_chars`), escapes control characters per RFC 8259, and omits `"text"` cleanly on binary or non-UTF-8 payloads.

---

## 5. MoonBit-Specific Engineering Decisions

| Decision | Problem Prevented | Implementation |
| --- | --- | --- |
| Explicit `String::lexical_compare` | MoonBit `String::compare` is shortlex (length-first: `"z"` < `"aa"`), breaking canonical SURT queries and binary search | Used in [`surt/surt.mbt`](../surt/surt.mbt), [`cdxj/cdxj.mbt`](../cdxj/cdxj.mbt), and [`pipeline/filter.mbt`](../pipeline/filter.mbt) (`date_from` / `date_to` normalized to `YYYYMMDDhhmmss`) |
| Unsigned 32/64-bit arithmetic (`UInt32`/`UInt64`) | JS numbers vs 32-bit Wasm / Native signed overflow divergence in bitwise digest rounds | [`digest/sha1.mbt`](../digest/sha1.mbt) & [`digest/sha256.mbt`](../digest/sha256.mbt) verified bit-identical across `wasm`, `wasm-gc`, `js`, `native` |
| `Bytes` / `BytesView` payload slicing | UTF-8 normalization or NUL termination mangling binary HTTP bodies (`\x00\r\n\r\n\xff`) | [`http_payload/http_payload.mbt`](../http_payload/http_payload.mbt) & [`codec/reader.mbt`](../codec/reader.mbt) never convert arbitrary bodies to `String` unless verified valid UTF-8 for textual `export_jsonl` |
| Minimal core-only `.moon` dependency footprint | Host/FFI incompatibilities blocking browser Wasm or Mooncakes reuse | Zero `[deps]` in [`moon.mod`](../moon.mod); all crypto, Base32/Hex, URI, HTTP, WARC, CDX/CDXJ, and JSONL logic lives inside the repository |
