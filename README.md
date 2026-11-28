# moon-warc

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Version: v0.5.1](https://img.shields.io/badge/Version-v0.5.1-green.svg)](CHANGELOG.md)
[![Targets: wasm | wasm-gc | js | native](https://img.shields.io/badge/Targets-wasm%20%7C%20wasm--gc%20%7C%20js%20%7C%20native-purple.svg)](#多目标验证矩阵与基准测试--verification--benchmarks)
[![Live Offline Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-orange.svg)](https://xinorigin.github.io/moon-warc/)

纯 MoonBit 实现的 **ISO 28500 WARC 1.0 / 1.1**、**多成员 Dynamic Huffman (`BTYPE=2`) RFC 1952 `.warc.gz`** 流式编解码器、**WebRecorder WACZ 1.1.1** 清单生成器、**SHA-1 / SHA-256** 摘要校验器、**SURT / CDXJ / CDX-11** 归档索引器与语料管线库，零第三方依赖，原生支持 `wasm`、`wasm-gc`、`js` 与 `native` 四大编译目标。

> **在线交互演示（100% 浏览器本地运行，零文件上传）：** [https://xinorigin.github.io/moon-warc/](https://xinorigin.github.io/moon-warc/)（源码位于 [`docs/index.html`](docs/index.html)，由 [`scripts/build_web_demo.py`](scripts/build_web_demo.py) 直接从 MoonBit JS 后端编译 [`docs/moon_warc_web.js`](docs/moon_warc_web.js) 生成）。
>
> **English Summary:** `XinOrigin/moon_warc` (`v0.5.1`) is a zero-dependency, pure-MoonBit library for reading, writing, compressing, indexing, segmenting, packaging (`WACZ 1.1.1`), exporting, and validating ISO 28500 WARC 1.0/1.1 streams and multi-member RFC 1952 `.warc.gz` archives. Targeting `wasm`, `wasm-gc`, `js`, and `native` identically, it includes executable doc-tests, `Int64` >2 GiB stream offsets, configurable `ReaderLimits`, zero-allocation Dynamic Huffman (`BTYPE=2`) DEFLATE encoding + reusable `InflateScratch` (`scan_members_while`), RFC 9112 chunked HTTP entity extraction, FIPS 180-4 SHA-1/SHA-256 + Base32/Hex digests, `String::lexical_compare` SURT/CDXJ/CDX-11 binary-search indexing, §9 segmentation/reassembly, WACZ 1.1.1 manifest generation, RFC 8259 JSONL export, native `moon bench` benchmarks, and a runnable `examples/crawler_to_rag` pipeline.

---

## 安装方式 / Installation

在你的 MoonBit 工程中添加 `XinOrigin/moon_warc` 依赖：

```bash
moon add XinOrigin/moon_warc
```

然后在需要使用本库的包 `moon.pkg` 中导入（推荐别名 `@warc`）：

```moonbit nocheck
///|
import {
  "XinOrigin/moon_warc" @warc,
}
```

---

## 可执行文档测试 / Executable Doc-Tests

以下三个示例使用 MoonBit 原生 `` ```moonbit check `` 块编写——每次运行 `moon test` 都会真实编译并执行它们，确保文档与代码契约永不漂移：

### 1. 端到端归档解析、ISO 28500 合规验证、CDXJ 检索与 JSONL 导出

```moonbit check
///|
test "readme: parse, validate, index CDXJ, lookup_closest, and export" {
  let wire = @moon_warc.sample_archive_bytes()
  let records = @moon_warc.parse_archive(wire).unwrap()
  let report = @moon_warc.validate_archive(records)
  assert_true(report.is_valid())
  assert_eq(report.record_count, 6)

  let index = @moon_warc.build_cdxj_index(
    records,
    filename="sample-crawl-2026.warc",
  )
  assert_eq(index.length(), 3)
  assert_eq(
    index.lookup_exact("https://example.org:443/index.html#top").length(),
    2,
  )
  match
    index.lookup_closest("https://example.org/index.html", "20261125121000") {
    Some(hit) => assert_eq(hit.warc_type, "revisit")
    None => fail("expected closest CDXJ hit")
  }

  assert_eq(@moon_warc.resolve_revisits(records).length(), 1)
  assert_eq(@moon_warc.encode_archive(records), wire)
  assert_true(@moon_warc.export_jsonl(records).contains("Hello WARC"))
}
```

### 2. 多成员 RFC 1952 `.warc.gz` 编解码与压缩成员精确偏移索引

```moonbit check
///|
test "readme: multi-member .warc.gz round-trip and compressed byte-range CDXJ" {
  let records = @moon_warc.parse_archive(@moon_warc.sample_archive_bytes()).unwrap()
  let gz_wire = @moon_warc.encode_archive_gz(records)
  let gz_records = @moon_warc.parse_archive_gz(gz_wire).unwrap()
  assert_eq(gz_records.length(), 6)
  assert_eq(gz_records[0].offset, 0L)
  assert_true(@moon_warc.validate_archive(gz_records).is_valid())

  let gz_index = @moon_warc.build_cdxj_index(
    gz_records,
    filename="sample-crawl-2026.warc.gz",
  )
  assert_eq(gz_index.get(0).map(e => e.offset), Some(gz_records[2].offset))
  assert_eq(
    gz_index.get(0).map(e => e.length),
    Some(gz_records[2].record_length),
  )
}
```

### 3. 恒定成员内存流式 `.warc.gz` 分片解析、HTTP 会话直录与 WACZ 1.1.1 清单生成

```moonbit check
///|
test "readme: chunked WarcGzReader streaming, HTTP exchange capture, and WACZ 1.1.1" {
  let gz_wire = @moon_warc.record_http_exchange_gz(
    request_id="<urn:uuid:doc-req-1>",
    response_id="<urn:uuid:doc-resp-1>",
    date="2026-11-27T12:00:00Z",
    target_uri="https://crawl.example.org/post",
    request_bytes=b"GET /post HTTP/1.1\r\nHost: crawl.example.org\r\n\r\n",
    response_bytes=b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Captured</h1>",
  )
  let mut scanned = 0L
  assert_eq(
    @moon_warc.scan_archive_gz(gz_wire, fn(_r) { scanned = scanned + 1L }),
    Ok(2L),
  )
  assert_eq(scanned, 2L)

  let reader = @moon_warc.new_gz_reader()
  let out = []
  let mut pos = 0
  while pos < gz_wire.length() {
    let end = if pos + 13 > gz_wire.length() {
      gz_wire.length()
    } else {
      pos + 13
    }
    reader.feed(gz_wire[pos:end])
    while true {
      match reader.next_record() {
        Ok(Some(r)) => out.push(r)
        Ok(None) => break
        Err(_) => fail("WarcGzReader failed")
      }
    }
    pos = end
  }
  assert_eq(reader.finish(), Ok(()))
  assert_eq(out.length(), 2)
  assert_true(@moon_warc.validate_archive(out).is_valid())

  let wacz = @moon_warc.build_wacz_manifests(
    out,
    gz_wire,
    warc_filename="crawl.warc.gz",
    title="Crawler Capture WACZ",
  )
  assert_true(wacz.datapackage_json.contains("\"wacz_version\":\"1.1.1\""))
  assert_true(wacz.datapackage_digest_json.contains("\"sha256:"))
}
```

---

## 核心特性 / Key Features

- **Sans-IO 流式解析、`Int64` 偏移与资源护栏 (`codec`)**：提供平文件状态机 `WarcReader` 与压缩分片状态机 **`WarcGzReader`**（`new_gz_reader`，按 Gzip 成员粒度流式释放内存，支持任意分片大小喂入与 `finish()` 截断审计）；全面采用 **`Int64` 流偏移与 `Content-Length`（突破 2 GiB 上限）**、`ReaderLimits` 资源限制、零全量数组驻留的 `scan_archive` / `scan_archive_gz`、CRLF 头注入防护，以及面向爬虫集成的 `record_http_exchange` / `record_http_exchange_gz`。
- **纯 MoonBit Dynamic Huffman `.warc.gz` 编解码 (`gzip`)**：零外部依赖完整实现 RFC 1951 DEFLATE 解压与压缩，编码端在 `level >= 6` 自动在 **Dynamic Huffman (`BTYPE=2`, 零分配双队列 + Kraft 限长哈夫曼编码器与 O(1) 长度/距离查表)**、Fixed Huffman (`BTYPE=1`) 与 Stored (`BTYPE=0`) 间精确比较比特成本并择优输出，使 240 条多成员 `.warc.gz` 体积降至 `118,906 B`（`73.7%`，逼近 C `gzip -6` `118,547 B`）；解码端提供可复用 **`InflateScratch`** 与 **`scan_members_while`** 早停流式接口，全量支持 `FEXTRA`、`FNAME`、`FCOMMENT`、`FHCRC`、CRC-32 / ISIZE 校验、`max_output_bytes` 压缩炸弹防护与压缩成员 `(offset, record_length)` 精确记录。
- **纯 MoonBit 密码学摘要与编码 (`digest`)**：内置完整增量式 FIPS 180-4 / RFC 3174 `Sha1Hasher`、`Sha256Hasher` 与 RFC 4648 `Base32` / `Hex` 编解码，支持 `WARC-Block-Digest` 与 `WARC-Payload-Digest` 格式化、解析与验真。
- **HTTP/1.x 负载拆解与 Chunked 解码 (`http_payload`)**：对内嵌于 `request` / `response` 记录中的 HTTP 报文进行二进制安全的头体分离（支持 obs-fold 折叠头、多行 `Transfer-Encoding` 与 `\x00` / 非 UTF-8 正文），完整实现 RFC 9112 `Transfer-Encoding: chunked` 解码，确保 `WARC-Payload-Digest` 针对真实实体体校验。
- **SURT 规范化与 CDXJ 二分索引 (`surt`, `cdxj`)**：实现 URI 域名标签反转、默认端口剥离、`.` / `..` 路径段消解、空白/控制字符百分号转义（保障 CDXJ 往返安全）、查询参数字典序排列（`IPv4` / `[IPv6]`），并采用私有封装的 `CdxjIndex` 与 `String::lexical_compare` 二分检索（`lookup_exact`、`lookup_prefix`、`lookup_closest` 按公历秒差匹配）。
- **ISO 28500 合规验证与 Revisit 溯源 (`validate`)**：校验强制头、`<...>` ID、`WARCDate` 严格闰年日历、Block/Payload 摘要、§9 原点记录与段序校验（共 **22 个**诊断码）及 `resolve_revisits`。
- **WACZ 1.1.1 清单生成、§9 分片重组与语料导出 (`pipeline`, `examples/crawler_to_rag`)**：内置 **`build_wacz_manifests`**（输出 WebRecorder WACZ 1.1.1 规范的 `datapackage.json`、`datapackage-digest.json` 与 `indexes/index.cdxj` 及 SHA-256 校验摘要）、`segment_record` / `reassemble_segments`、`ArchiveFilter` / `extract_subset`、11 列 `export_cdx11`、RFC 8259 `export_jsonl`，以及可独立运行的端到端爬虫到 RAG 示例 [`examples/crawler_to_rag/`](examples/crawler_to_rag/)。

> 更多设计细节请参见：[架构设计文档 (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md)、[基准测试报告 (`docs/BENCHMARKS.md`)](docs/BENCHMARKS.md) 与 [设计问答 (`docs/FAQ.md`)](docs/FAQ.md)。

---

## 生态对比与差异化说明 / MoonBit Ecosystem Differentiation

`mooncakes.io` 既有同类库 `xiaojing012/moon-warc@0.1.0` 在其 [`docs/limitations.md`](https://github.com/xiaojing012/moon-warc/blob/main/docs/limitations.md) 中明确聚焦于基础 `WARC/1.1` 帧解析，尚未实现 `.warc.gz` 压缩/流式解码、加密摘要计算、HTTP 分块负载拆解与导出生态。`XinOrigin/moon_warc@0.5.1` 在保持零第三方依赖与 `Apache-2.0` 原创实现的基础上，补齐了完整的端到端生产能力：

| 维度 | `xiaojing012/moon-warc@0.1.0` (`mooncakes.io`) | `XinOrigin/moon_warc@0.5.1` (本仓库) |
| --- | --- | --- |
| **WARC 版本与大文件边界** | `WARC/1.1` 基础记录解析 | **WARC 1.0 & 1.1**、严格闰年日历、`Int64` >2 GiB 流偏移、`ReaderLimits` 与 CRLF 注入防护 |
| **`.warc.gz` 多成员流式编解码** | 不包含（未实现 Gzip/DEFLATE） | 纯 MoonBit **Dynamic Huffman (`BTYPE=2`)** 压缩、`scan_members_while` / `WarcGzReader` 恒定成员内存流式解码、`compressed_offset` 范围跟踪 |
| **密码学摘要验真** | 文档注明 `SHA` 摘要计算延后（deferred） | 纯 MoonBit FIPS 180-4 **SHA-1 / SHA-256** + RFC 4648 Base32/Hex 增量自动签发与验真 |
| **HTTP/1.x 载荷与 Chunked 解码** | 基础头分离 | 二进制安全分割（`obs-fold`、多头 `Transfer-Encoding`）+ 完整 **RFC 9112 Chunked** 解码 |
| **检索、打包与 RAG 管线** | 基础内存索引与校验 | `String::lexical_compare` SURT/CDXJ `lookup_closest`、CDX-11、**WACZ 1.1.1 清单**、§9 分片重组、`revisit` 溯源、RFC 8259 JSONL |
| **实战接入、基准与交互演示** | 库内基础单测 | 四端 **211/211 测试** + **`moon bench`**（**5/5**）+ Python 差分预言机 + CPython `zlib`/`hashlib` 基准 + **`examples/crawler_to_rag`** + 浏览器离线工作台 |

---

## 作用域与非目标 / Scope & Non-Goals

### 在范围内 (In Scope `v0.5.1`)
- ISO 28500:2009 (`WARC/1.0`) 与 ISO 28500:2017 (`WARC/1.1`) 全类型记录帧解析、编码、合规校验与 §9 分片重组。
- 纯 MoonBit RFC 1951 DEFLATE（Stored `BTYPE=0` / Fixed `BTYPE=1` / Dynamic Huffman `BTYPE=2`）与 RFC 1952 **多成员 `.warc.gz`** 压缩、流式解压（`InflateScratch` 复用与 `scan_members_while`）、CRC-32/ISIZE 校验与压缩字节范围索引。
- 纯 MoonBit SHA-1 / SHA-256、Base32 / Hex、HTTP/1.x Chunked 实体提取、SURT、CDXJ、11 列 CDX、`revisit` 溯源、**WebRecorder WACZ 1.1.1** 清单生成与 RFC 8259 JSONL 导出。

### 明确非目标 (Explicit Non-Goals)
- **不包含网络爬虫与套接字 I/O**：采用 Sans-IO 边界，不内置 HTTP 客户端或异步网络调度。
- **不包含本地磁盘持久化与 HTML DOM 重写**：不直接读写磁盘，也不对 HTML/CSS/JS 执行 URL 重写。

---

## 模块架构 / Package Architecture

| 包名 (Package) | 路径 | 核心职责与公开接口 |
| --- | --- | --- |
| `XinOrigin/moon_warc` | [`moon_warc.mbt`](moon_warc.mbt) | 根门面 API：`library_version`、`new_reader`、`new_gz_reader`、`parse_archive`、`scan_archive`、`scan_archive_gz`、`encode_archive`、`encode_record_gz`、`encode_archive_gz`、`parse_archive_gz`、`record_http_exchange`、`record_http_exchange_gz`、`build_cdxj_index`、`validate_archive`、`resolve_revisits`、`segment_record`、`reassemble_segments`、`filter_records`、`extract_subset`、`export_cdx11`、`export_jsonl`、`build_wacz_manifests`、`sample_archive_bytes` |
| `XinOrigin/moon_warc/gzip` | [`gzip/`](gzip/) | 纯 MoonBit RFC 1951 DEFLATE (`inflate_raw` / `deflate_raw` 含 Dynamic Huffman `BTYPE=2`)、IEEE 802.3 `Crc32Hasher` / `crc32`、RFC 1952 多成员 `compress` / `decompress` / `decompress_members` / `scan_members` / `scan_members_while` / `try_decompress_member` |
| `XinOrigin/moon_warc/digest` | [`digest/`](digest/) | `sha1`、`sha256`、`Sha1Hasher`、`Sha256Hasher`、`base32_encode/decode`、`hex_encode/decode`、`format/parse/verify_warc_digest` |
| `XinOrigin/moon_warc/surt` | [`surt/`](surt/) | `parse_uri`、`to_surt`、`ParsedUri`、`SurtError` |
| `XinOrigin/moon_warc/http_payload` | [`http_payload/`](http_payload/) | `parse_http_request`、`parse_http_response`、`decode_chunked`、`extract_entity_body`、`header_value` |
| `XinOrigin/moon_warc/header` | [`header/`](header/) | `WarcVersion`、`WarcType`、`WarcDate`（`parse`、`parse_cdxj_timestamp`）、`WarcHeader`（CRLF 安全序列化、`Int64` `content_length`） |
| `XinOrigin/moon_warc/codec` | [`codec/`](codec/) | `ReaderLimits`、`WarcReader`、`WarcGzReader`、`scan_all`、`scan_all_gz`、`parse_all`、`parse_all_gz`、`encode_record/all/_gz`、`build_http_exchange`、`encode_http_exchange_gz` |
| `XinOrigin/moon_warc/cdxj` | [`cdxj/`](cdxj/) | `CdxjEntry`、`CdxjIndex`（私有排序切片 + `Int64` 偏移、只读访问器与 `lookup_*`） |
| `XinOrigin/moon_warc/validate` | [`validate/`](validate/) | `validate_archive`、`ValidationReport`、`Diagnostic`（22 诊断码）、`resolve_revisits` |
| `XinOrigin/moon_warc/pipeline` | [`pipeline/`](pipeline/) | §9 `segment_record` / `reassemble_segments`、`ArchiveFilter` / `extract_subset`、`export_cdx11`、`export_jsonl`、`WaczManifests` / `build_wacz_manifests` |
| `XinOrigin/moon_warc/cmd/main` | [`cmd/main/`](cmd/main/) | 端到端命令行演示程序（覆盖 plain + multi-member `.warc.gz`，`native` / `js` 输出字节一致） |
| `XinOrigin/moon_warc/examples/crawler_to_rag` | [`examples/crawler_to_rag/`](examples/crawler_to_rag/) | 爬虫 HTTP 会话捕获 -> `WarcGzReader` -> WACZ 1.1.1 -> RAG JSONL 实战示例（`native` / `js` 一致） |

---

## 快速开始 / Quick Start

```bash
export PATH="$HOME/.moon/bin:$PATH"

# 类型检查与零告警 Lint
moon check --deny-warn --target all

# 格式与 .mbti 接口契约检查
moon fmt --check && moon info

# 运行四目标全量测试（包含 README.mbt.md 可执行文档测试）
moon test --deny-warn --target all

# 运行爬虫到 RAG 示例与原生微基准测试
moon run examples/crawler_to_rag --target native
moon bench --release --target native

# 运行 CLI 演示、示例、Python 差分预言机与全量验收门禁
./scripts/verify_all.sh
```

---

## 多目标验证矩阵与基准测试 / Verification & Benchmarks

本仓库通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 在全部 4 个 MoonBit 目标平台（含 macOS `arm64` 与腾讯云 CNB `16 vCPU / 32 GiB` `Linux x86_64`）严格验证，共 **211 项**测试（208 个模块单元测试/Fuzz/白盒/负例 + **3 个 `README.mbt.md` 可执行文档测试**）+ **5 个 `moon bench` 原生基准**，覆盖全部 **12 个包 / 40 个 `.mbt` 源文件**（`moon coverage` 实测全仓库未覆盖降至 **`286` 行 / `20` 文件**）：

| 编译目标 / 外部基线 / 门禁 | 实测结果 | 端到端稳态流水线吞吐 (`--release`, 腾讯云 CNB `16C32G` `AMD EPYC 9754`, Dynamic Huffman `BTYPE=2`, `92.37 MiB`) |
| --- | --- | --- |
| **`native`** (纯 MoonBit) | **211 / 211 passed** + **5/5 `moon bench`** | **`76.26 MiB/s`** (`steady 1.211 s`, `wall 1.235 s` · 压缩 `118,906 B` = **`73.7%`**) |
| **`wasm-gc`** (纯 MoonBit) | **211 / 211 passed** | **`68.42 MiB/s`** (`steady 1.350 s`, `wall 1.393 s` · 压缩与 `native` 比特一致) |
| **`js`** (纯 MoonBit) | **211 / 211 passed** | **`43.76 MiB/s`** (`steady 2.111 s`, `wall 2.217 s`) |
| **`wasm`** (纯 MoonBit) | **211 / 211 passed** | **`31.74 MiB/s`** (`steady 2.910 s`, `wall 2.969 s`) |
| *外部基线*: CPython (`zlib` + `hashlib` C 扩展) | 同机同语料基线 | `184.19 MiB/s` (`0.501 s`, `gzip -6` `118,547 B` = **`73.4%`** · 与本库仅差 359 B / 0.3%) |
| **CLI + 示例** (`cmd/main` + `crawler_to_rag`) | `native` / `js` 逐字节一致 | 含 `.warc.gz` 多成员、分片 `WarcGzReader`、HTTP 会话捕获与 WACZ 1.1.1 -> RAG JSONL |
| **Python 差分预言机** | **通过（exit 0）** | 对照 `hashlib`、`base64`、`zlib.crc32`、`gzip -9` 动态哈夫曼、`scan_archive_gz`、7B 分片 `WarcGzReader`、WACZ 与 `json` |
| **包洁净度** (`moon package --list`) | **零泄漏** | 通过 [`.moonignore`](.moonignore) 排除 `scripts/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md` 等非包文件 |

> 详细基准测试方法与 `moon bench` / 四端各指标数据请见：[`docs/BENCHMARKS.md`](docs/BENCHMARKS.md)。

---

## 开源协议 / License

本项目采用 [Apache-2.0](LICENSE) 开源协议发布。
