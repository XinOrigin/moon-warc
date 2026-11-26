# moon-warc

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Version: v0.3.0](https://img.shields.io/badge/Version-v0.3.0-green.svg)](CHANGELOG.md)
[![Targets: wasm | wasm-gc | js | native](https://img.shields.io/badge/Targets-wasm%20%7C%20wasm--gc%20%7C%20js%20%7C%20native-purple.svg)](#多目标验证矩阵与基准测试--verification--benchmarks)
[![Live Offline Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-orange.svg)](https://xinorigin.github.io/moon-warc/)

纯 MoonBit 实现的 **ISO 28500 WARC 1.0 / 1.1** 与**多成员 RFC 1952 `.warc.gz`** 流式编解码器、**SHA-1 / SHA-256** 摘要校验器、**SURT / CDXJ / CDX-11** 归档索引器与语料管线库，零第三方依赖，原生支持 `wasm`、`wasm-gc`、`js` 与 `native` 四大编译目标。

> **在线交互演示（100% 浏览器本地运行，零文件上传）：** [https://xinorigin.github.io/moon-warc/](https://xinorigin.github.io/moon-warc/)（源码位于 [`docs/index.html`](docs/index.html)，由 [`scripts/build_web_demo.py`](scripts/build_web_demo.py) 直接从 MoonBit JS 后端编译 [`docs/moon_warc_web.js`](docs/moon_warc_web.js) 生成）。
>
> **English Summary:** `XinOrigin/moon_warc` is a zero-dependency, pure-MoonBit library for reading, writing, indexing, segmenting, exporting, and validating ISO 28500 WARC 1.0/1.1 streams and multi-member RFC 1952 `.warc.gz` archives. Targeting `wasm`, `wasm-gc`, `js`, and `native` identically, it includes executable doc-tests, `Int64` >2 GiB stream offsets, configurable `ReaderLimits`, RFC 1951 DEFLATE/LZ77 + CRC-32, RFC 9112 chunked HTTP entity extraction, FIPS 180-4 SHA-1/SHA-256 + Base32/Hex digests, `String::lexical_compare` SURT/CDXJ/CDX-11 binary-search indexing, §9 segmentation/reassembly, and RFC 8259 JSONL export.

---

## 安装方式 / Installation

在你的 MoonBit 工程中添加 `XinOrigin/moon_warc` 依赖：

```bash
moon add XinOrigin/moon_warc
```

然后在需要使用本库的包 `moon.pkg` 中导入（推荐别名 `@warc`）：

```moonbit nocheck
import {
  "XinOrigin/moon_warc" @warc,
}
```

---

## 可执行文档测试 / Executable Doc-Tests

以下两个示例使用 MoonBit 原生 `` ```moonbit `` 块编写——每次运行 `moon test` 都会真实编译并执行它们，确保文档与代码契约永不漂移：

### 1. 端到端归档解析、ISO 28500 合规验证、CDXJ 检索与 JSONL 导出

```moonbit
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

```moonbit
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

---

## 核心特性 / Key Features

- **Sans-IO 流式解析、`Int64` 偏移与资源护栏 (`codec`)**：基于状态机（`WarcReader`）的增量解码器，支持任意分片大小喂入、均摊缓冲压缩（`cursor >= 4096 && cursor >= remaining`）、头扫描水位与可配置 `ReaderLimits`（默认最大头部 `64 KiB` / 最大单记录载荷 `64 MiB`，防御畸形流内存膨胀）；全面使用 **`Int64` 流偏移与 `Content-Length`（突破 2 GiB 上限）**，并提供零全量数组驻留的 `scan_all` / `scan_archive` 流式扫描接口与 CRLF 头注入防护。
- **纯 MoonBit 多成员 `.warc.gz` 压缩与解压 (`gzip`)**：零外部依赖实现完整 RFC 1951 DEFLATE 解压（Stored `BTYPE=0`、Fixed Huffman `BTYPE=1`、Dynamic Huffman `BTYPE=2`）、LZ77 + Fixed Huffman 压缩、IEEE 802.3 CRC-32 与 RFC 1952 多成员容器（支持 `FEXTRA`、`FNAME`、`FCOMMENT`、`FHCRC`、`max_output_bytes` 压缩炸弹防护）；`encode_archive_gz` 与 `parse_archive_gz` 按 Common Crawl 惯例每条记录独立封装一个 Gzip 成员并精确记录压缩成员 `(offset, record_length)` 供 HTTP `Range` 随机读取。
- **纯 MoonBit 密码学摘要与编码 (`digest`)**：内置完整增量式 FIPS 180-4 / RFC 3174 `Sha1Hasher`、`Sha256Hasher` 与 RFC 4648 `Base32` / `Hex` 编解码，支持 `WARC-Block-Digest` 与 `WARC-Payload-Digest` 格式化、解析与验真。
- **HTTP/1.x 负载拆解与 Chunked 解码 (`http_payload`)**：对内嵌于 `request` / `response` 记录中的 HTTP 报文进行二进制安全的头体分离（支持 obs-fold 折叠头、多行 `Transfer-Encoding` 与 `\x00` / 非 UTF-8 正文），完整实现 RFC 9112 `Transfer-Encoding: chunked` 解码，确保 `WARC-Payload-Digest` 针对真实实体体校验。
- **SURT 规范化与 CDXJ 二分索引 (`surt`, `cdxj`)**：实现 URI 域名标签反转、默认端口剥离、`.` / `..` 路径段消解、空白/控制字符百分号转义（保障 CDXJ 往返安全）、查询参数字典序排列（`IPv4` / `[IPv6]`），并采用私有封装的 `CdxjIndex` 与 `String::lexical_compare` 二分检索（`lookup_exact`、`lookup_prefix`、`lookup_closest` 按公历秒差匹配）。
- **ISO 28500 合规验证与 Revisit 溯源 (`validate`)**：校验强制头、`<...>` ID、`WARCDate` 严格闰年日历、Block/Payload 摘要、§9 原点记录与段序校验（共 **22 个**诊断码）及 `resolve_revisits`。
- **ISO 28500 §9 分片重组、子集提取与数据管线导出 (`pipeline`)**：`segment_record` / `reassemble_segments`、`ArchiveFilter` / `extract_subset`、11 列 `export_cdx11`（含 Redirect 列与百分号转义）以及文本清洗用 RFC 8259 `export_jsonl`。

> 更多设计细节请参见：[架构设计文档 (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md)、[基准测试报告 (`docs/BENCHMARKS.md`)](docs/BENCHMARKS.md) 与 [设计问答 (`docs/FAQ.md`)](docs/FAQ.md)。

---

## 作用域与非目标 / Scope & Non-Goals

### 在范围内 (In Scope `v0.3.0`)
- ISO 28500:2009 (`WARC/1.0`) 与 ISO 28500:2017 (`WARC/1.1`) 全类型记录帧解析、编码、合规校验与 §9 分片重组。
- 纯 MoonBit RFC 1951 DEFLATE / RFC 1952 **多成员 `.warc.gz`** 流式压缩、解压、CRC-32/ISIZE 校验与压缩字节范围索引。
- 纯 MoonBit SHA-1 / SHA-256、Base32 / Hex、HTTP/1.x Chunked 实体提取、SURT、CDXJ、11 列 CDX、`revisit` 溯源与 RFC 8259 JSONL 导出。

### 明确非目标 (Explicit Non-Goals)
- **不包含网络爬虫与套接字 I/O**：采用 Sans-IO 边界，不内置 HTTP 客户端或异步网络调度。
- **不包含本地磁盘持久化与 HTML DOM 重写**：不直接读写磁盘，也不对 HTML/CSS/JS 执行 URL 重写。

---

## 模块架构 / Package Architecture

| 包名 (Package) | 路径 | 核心职责与公开接口 |
| --- | --- | --- |
| `XinOrigin/moon_warc` | [`moon_warc.mbt`](moon_warc.mbt) | 根门面 API：`library_version`、`new_reader`、`parse_archive`、`scan_archive`、`encode_archive`、`encode_record_gz`、`encode_archive_gz`、`parse_archive_gz`、`build_cdxj_index`、`validate_archive`、`resolve_revisits`、`segment_record`、`reassemble_segments`、`filter_records`、`extract_subset`、`export_cdx11`、`export_jsonl`、`sample_archive_bytes` |
| `XinOrigin/moon_warc/gzip` | [`gzip/`](gzip/) | 纯 MoonBit RFC 1951 DEFLATE (`inflate_raw` / `deflate_raw`)、IEEE 802.3 `Crc32Hasher` / `crc32`、RFC 1952 多成员 `compress` / `decompress` / `decompress_members` |
| `XinOrigin/moon_warc/digest` | [`digest/`](digest/) | `sha1`、`sha256`、`Sha1Hasher`、`Sha256Hasher`、`base32_encode/decode`、`hex_encode/decode`、`format/parse/verify_warc_digest` |
| `XinOrigin/moon_warc/surt` | [`surt/`](surt/) | `parse_uri`、`to_surt`、`ParsedUri`、`SurtError` |
| `XinOrigin/moon_warc/http_payload` | [`http_payload/`](http_payload/) | `parse_http_request`、`parse_http_response`、`decode_chunked`、`extract_entity_body`、`header_value` |
| `XinOrigin/moon_warc/header` | [`header/`](header/) | `WarcVersion`、`WarcType`、`WarcDate`（`parse`、`parse_cdxj_timestamp`）、`WarcHeader`（CRLF 安全序列化、`Int64` `content_length`） |
| `XinOrigin/moon_warc/codec` | [`codec/`](codec/) | `ReaderLimits`、`WarcReader`、`scan_all`、`parse_all`、`parse_all_gz`、`encode_record/all/_gz`、`build_*` |
| `XinOrigin/moon_warc/cdxj` | [`cdxj/`](cdxj/) | `CdxjEntry`、`CdxjIndex`（私有排序切片 + `Int64` 偏移、只读访问器与 `lookup_*`） |
| `XinOrigin/moon_warc/validate` | [`validate/`](validate/) | `validate_archive`、`ValidationReport`、`Diagnostic`（22 诊断码）、`resolve_revisits` |
| `XinOrigin/moon_warc/pipeline` | [`pipeline/`](pipeline/) | §9 `segment_record` / `reassemble_segments`、`ArchiveFilter` / `extract_subset`、`export_cdx11`、`export_jsonl` |
| `XinOrigin/moon_warc/cmd/main` | [`cmd/main/`](cmd/main/) | 端到端命令行演示程序（覆盖 plain + multi-member `.warc.gz`，`native` / `js` 输出字节一致） |

---

## 快速开始 / Quick Start

```bash
export PATH="$HOME/.moon/bin:$PATH"

# 类型检查与零告警 Lint
moon check --deny-warn

# 格式与 .mbti 接口契约检查
moon fmt --check && moon info

# 运行四目标全量测试（包含 README.mbt.md 可执行文档测试）
moon test --target wasm
moon test --target wasm-gc
moon test --target js
moon test --target native

# 运行 CLI 演示、Python 差分预言机与全量验收门禁
./scripts/verify_all.sh
```

---

## 多目标验证矩阵与基准测试 / Verification & Benchmarks

本仓库通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 在全部 4 个 MoonBit 目标平台上验证，共 **187 项**测试（185 个模块单元测试/Fuzz/负例 + **2 个 `README.mbt.md` 可执行文档测试**），`10,594` 行 `.mbt` 源码（35 个源文件）：

| 编译目标 / 门禁 | 实测结果 | 端到端流水线吞吐 (`--release`, Apple M4, 9.24 MiB 工作负载) |
| --- | --- | --- |
| **`wasm`** | **187 / 187 passed** | **`2.50 MiB/s`** (`3.702 s`) |
| **`wasm-gc`** | **187 / 187 passed** | **`0.55 MiB/s`** (`16.937 s`) |
| **`native`** | **187 / 187 passed** | **`0.51 MiB/s`** (`18.114 s`) |
| **`js`** | **187 / 187 passed** | **`0.31 MiB/s`** (`29.611 s`) |
| **CLI 演示** (`cmd/main`) | `native` / `js` 逐字节一致 | 含 `.warc.gz` 多成员编码解析与压缩 CDXJ |
| **Python 差分预言机** | **通过（exit 0）** | 对照 `hashlib`、`base64`、`zlib.crc32`、`gzip`（`compresslevel=9` 动态哈夫曼 + `FNAME`）、`json` |
| **包洁净度** (`moon package --list`) | **零泄漏** | 通过 [`.moonignore`](.moonignore) 排除 `scripts/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md` 等非包文件 |

> 详细基准测试方法与各指标数据请见：[`docs/BENCHMARKS.md`](docs/BENCHMARKS.md)。

---

## 开源协议 / License

本项目采用 [Apache-2.0](LICENSE) 开源协议发布。
