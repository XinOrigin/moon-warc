# moon-warc

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)

纯 MoonBit 实现的 **ISO 28500 WARC 1.0 / 1.1** 流式编解码器、**SHA-1 / SHA-256** 摘要校验器、**SURT / CDXJ** 归档索引器与档案合规验证库，零第三方依赖，原生支持 `wasm`、`wasm-gc`、`js` 与 `native` 四大编译目标。

> **English Summary:** `xinorigin/moon_warc` is a zero-dependency, pure-MoonBit library for reading, writing, indexing, and validating ISO 28500 Web ARChive (WARC 1.0 / 1.1) streams. Built with a Sans-IO state-machine parser, RFC 9112 HTTP/1.x payload & chunked transfer decoding, FIPS 180-4 SHA-1/SHA-256 + RFC 4648 Base32/Hex digests, SURT/CDXJ binary-search indexing, and ISO 28500 conformance diagnostics (including `revisit` resolution), it targets `wasm`, `wasm-gc`, `js`, and `native` identically.

---

## 核心特性 / Key Features

- **Sans-IO 流式解析与编码 (`codec`)**：基于状态机（`WarcReader`）的增量解码器，支持任意分片大小喂入与 4KB 滑动缓冲压缩，精确记录每条记录在流中的字节偏移（`offset`）与总长度（`record_length`）；提供标准记录构建器（`build_warcinfo`、`build_request`、`build_response`、`build_resource`、`build_metadata`、`build_revisit`、`build_conversion`、`make_record`）及自动摘要计算（`auto_digest`）。
- **纯 MoonBit 密码学摘要与编码 (`digest`)**：内置完整增量式 FIPS 180-4 / RFC 3174 `Sha1Hasher`、`Sha256Hasher` 与 RFC 4648 `Base32` / `Hex` 编解码，支持 `WARC-Block-Digest` 与 `WARC-Payload-Digest`（如 `sha256:<base32>`、`sha1:<hex>`）格式化、解析与验真。
- **HTTP/1.x 负载拆解与 Chunked 解码 (`http_payload`)**：对内嵌于 `request` / `response` 记录中的 HTTP 报文进行二进制安全的头体分离（支持正文包含 `\x00` 与非 UTF-8 字节），完整实现 RFC 9112 `Transfer-Encoding: chunked`（含 chunk extensions 与 trailer headers）解码，确保 `WARC-Payload-Digest` 针对真实 HTTP 实体体校验。
- **SURT 规范化与 CDXJ 二分索引 (`surt`, `cdxj`)**：实现 URI 域名标签反转、默认端口剥离、`.` / `..` 路径段消解、查询参数按字典序排列（支持 IPv4 与 `[IPv6]` 字面量），并支持 CDXJ 行格式解析/转义格式化及基于 `String::lexical_compare` 的二分检索（`lookup_exact`、`lookup_prefix`、`lookup_closest`）。
- **ISO 28500 合规验证与 Revisit 溯源 (`validate`)**：逐条检查强制头部、`<...>` 记录 ID 格式与重复性、严格 UTC `WARC-Date`（含闰年与 WARC 1.1 小数秒）、`Content-Length`、Block/Payload 摘要匹配度与跨记录悬空引用（共 18 个结构化 `Error` / `Warning` 诊断码）；并提供 `resolve_revisits`（优先 `WARC-Refers-To`，回退至 `(WARC-Target-URI, WARC-Payload-Digest)`）。
- **零外部依赖、全目标一致**：仅依赖 `moonbitlang/core`，无需 C FFI 或外部运行时库，可在浏览器（WASM/JS）、Node.js 与 Native 环境下零修改运行。

---

## 作用域与明确非目标 / Scope & Non-Goals

为保持核心协议层的纯洁性与可移植性，本仓库遵循明确的 **Sans-IO** 边界：

### 在范围内 (In Scope)
- ISO 28500:2009 (`WARC/1.0`) 与 ISO 28500:2017 (`WARC/1.1`) 头部解析、折叠行展开、序列化、流式帧定界与往返字节级无损编码。
- 8 种标准 `WARC-Type`（`warcinfo`、`response`、`resource`、`request`、`metadata`、`revisit`、`conversion`、`continuation`）及自定义扩展类型 `Extension(String)`。
- 纯 MoonBit SHA-1 / SHA-256、Base32 / Hex、HTTP/1.x 负载与 Chunked 解码、SURT、CDXJ 索引及 ISO 28500 合规性校验与 `revisit` 解析。

### 明确非目标 (Explicit Non-Goals)
- **不包含 gzip / `.warc.gz` 容器压缩与解压**：采用 Sans-IO 模型，调用方只需传入解压后的 WARC 字节流或自行在外部接入流式 gzip 编解码器。
- **不包含网络爬虫与套接字 I/O**：不内置 HTTP 客户端、DNS 解析或异步网络调度。
- **不包含本地文件系统持久化与浏览器 DOM 重写**：不直接读写磁盘文件，也不对 HTML/CSS/JS 资源执行 URL 重写（适合作为 WASM/Native 归档回放器或索引管线的底层内核）。

---

## 模块架构 / Package Architecture

| 包名 (Package) | 路径 | 核心职责与公开接口 |
| --- | --- | --- |
| `xinorigin/moon_warc` | [`moon_warc.mbt`](moon_warc.mbt) | 根门面 API：`library_version`、`parse_archive`、`encode_archive`、`build_cdxj_index`、`validate_archive`、`resolve_revisits`、`sample_archive_bytes` |
| `xinorigin/moon_warc/digest` | [`digest/`](digest/) | `sha1`、`sha256`、`Sha1Hasher`、`Sha256Hasher`、`base32_encode` / `base32_decode`、`hex_encode` / `hex_decode`、`format_warc_digest_sha1` / `format_warc_digest_sha256`、`parse_warc_digest`、`verify_warc_digest` |
| `xinorigin/moon_warc/surt` | [`surt/`](surt/) | `parse_uri`、`to_surt`、`ParsedUri`、`SurtError` |
| `xinorigin/moon_warc/http_payload` | [`http_payload/`](http_payload/) | `parse_http_request`、`parse_http_response`、`decode_chunked`、`extract_entity_body`、`header_value`、`HttpResponse` / `HttpRequest` |
| `xinorigin/moon_warc/header` | [`header/`](header/) | `WarcVersion`、`WarcType`、`WarcDate`（`parse`、`to_cdxj_timestamp`、`to_iso_string`）、`WarcHeader`（`parse`、`serialize`、`with_field`、大小写不敏感查找与折叠行合并） |
| `xinorigin/moon_warc/codec` | [`codec/`](codec/) | 流式状态机 `WarcReader`（`new`、`feed`、`next_record`、`finish`）、`parse_all`、`encode_record`、`encode_all`、全类型 `build_*` / `make_record` 与 `WarcRecord` |
| `xinorigin/moon_warc/cdxj` | [`cdxj/`](cdxj/) | `CdxjEntry`、`CdxjIndex`（`build`、`format_all`、`lookup_exact`、`lookup_prefix`、`lookup_closest`）、`from_record`、`format_line`、`parse_line` |
| `xinorigin/moon_warc/validate` | [`validate/`](validate/) | `validate_archive`、`ValidationReport`、`Diagnostic`、`Severity`、`resolve_revisits`、`ResolvedRevisit`、`RevisitMatchKind` |
| `xinorigin/moon_warc/cmd/main` | [`cmd/main/`](cmd/main/) | 端到端命令行演示程序（解析样本归档、输出偏移/摘要表、执行合规审计、构建并查询 CDXJ、解析 revisit 并校验字节级往返一致性） |

---

## 快速开始 / Quick Start

### 环境要求
- MoonBit 工具链（已通过 `moon 0.1.20261119` / `moonc v0.10.22+124d61d05` 实测，请确保 `$HOME/.moon/bin` 在 `PATH` 中）
- Python 3（可选，仅运行差分验证预言机 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 时需要）

### 常用命令

```bash
export PATH="$HOME/.moon/bin:$PATH"

# 1. 类型检查与零告警 Lint
moon check --deny-warn

# 2. 格式检查与公开接口 (.mbti) 校验
moon fmt --check
moon info

# 3. 运行四目标全量测试
moon test --target wasm
moon test --target wasm-gc
moon test --target js
moon test --target native

# 4. 运行端到端 CLI 演示 (Native & JS)
moon run cmd/main --target native
moon run cmd/main --target js

# 5. 运行 Python 差分预言机交叉验证
python3 scripts/verify_oracle.py

# 6. 一键执行全套本地验证门禁（含 moon package 打包洁净度检查）
./scripts/verify_all.sh
```

---

## API 使用示例 / API Snippets

### 1. 根门面快速流水线（解析 → 校验 → 建索引 → 解析 Revisit → 往返编码）

```moonbit
let wire = @moon_warc.sample_archive_bytes()
let records = match @moon_warc.parse_archive(wire) {
  Ok(recs) => recs
  Err(err) => abort("parse failed: \{Debug::to_repr(err).to_string()}")
}
let report = @moon_warc.validate_archive(records)
let index = @moon_warc.build_cdxj_index(records, filename="sample-crawl-2026.warc")
let hits = index.lookup_exact("https://example.org:443/index.html#top")
let closest = index.lookup_closest("https://example.org/index.html", "20261125121000")
let revisits = @moon_warc.resolve_revisits(records)
let re_encoded = @moon_warc.encode_archive(records)
// re_encoded == wire -> true (3188 == 3188 bytes)
```

### 2. Sans-IO 流式读取任意字节分片

```moonbit
let reader = @codec.WarcReader::new()
reader.feed(chunk1)
reader.feed(chunk2)

while true {
  match reader.next_record() {
    Ok(Some(rec)) => {
      // rec.offset 与 rec.record_length 精确对应原始流位置
      println(rec.header.target_uri().unwrap_or("-"))
    }
    Ok(None) => break
    Err(err) => abort("decode error: \{Debug::to_repr(err).to_string()}")
  }
}

// 必须在 EOF 调用 finish()，确保无截断头部、负载或缺失尾分隔符
match reader.finish() {
  Ok(_) => ()
  Err(err) => abort("EOF check failed: \{Debug::to_repr(err).to_string()}")
}
```

### 3. CLI 演示输出摘要

执行 `moon run cmd/main --target native`（与 `--target js` 输出完全一致）：

```text
moon-warc v0.1.0 — ISO 28500 WARC 1.0/1.1 Showcase
Sample archive size: 3188 bytes

=== Records (6) ===
#0 [WARC/1.1] type=warcinfo offset=0 len=468 payload=150 id=<urn:uuid:00000000-0000-4000-8000-000000000001> uri=-
#1 [WARC/1.1] type=request offset=468 len=500 payload=95 id=<urn:uuid:00000000-0000-4000-8000-000000000002> uri=https://example.org/index.html
#2 [WARC/1.1] type=response offset=968 len=658 payload=164 id=<urn:uuid:00000000-0000-4000-8000-000000000003> uri=https://example.org/index.html
#3 [WARC/1.1] type=metadata offset=1626 len=457 payload=61 id=<urn:uuid:00000000-0000-4000-8000-000000000004> uri=https://example.org/index.html
#4 [WARC/1.1] type=resource offset=2083 len=436 payload=28 id=<urn:uuid:00000000-0000-4000-8000-000000000005> uri=https://cdn.example.org/app.json
#5 [WARC/1.1] type=revisit offset=2519 len=669 payload=0 id=<urn:uuid:00000000-0000-4000-8000-000000000006> uri=https://example.org/index.html
...
=== ISO 28500 Validation: valid=true records=6 errors=0 warnings=0 ===

=== Sorted CDXJ Index (3 entries) ===
org,example)/index.html 20261125120001 {"url":"https://example.org/index.html","mime":"text/html","status":"200","digest":"sha256:PYDFIEG33DIQDE7JE73F4LKHUKHF6CWBTGOAYMQJWHUEG5PKBZ7A====","length":"658","offset":"968","filename":"sample-crawl-2026.warc","warc-type":"response"}
org,example)/index.html 20261125121500 {"url":"https://example.org/index.html","mime":"warc/revisit","digest":"sha256:PYDFIEG33DIQDE7JE73F4LKHUKHF6CWBTGOAYMQJWHUEG5PKBZ7A====","length":"669","offset":"2519","filename":"sample-crawl-2026.warc","warc-type":"revisit"}
org,example,cdn)/app.json 20261125120005 {"url":"https://cdn.example.org/app.json","mime":"application/json","digest":"sha256:APOI67ZDJSRHVPVLBSCDTNKNGTCELBQREHFF6TKQVTT2FLZCRN5Q====","length":"436","offset":"2083","filename":"sample-crawl-2026.warc","warc-type":"resource"}

lookup_exact('https://example.org:443/index.html#top') -> 2 hit(s)
lookup_closest('https://example.org/index.html', '20261125121000') -> ts=20261125121500 warc_type=revisit offset=2519

=== Revisit Resolution (1) ===
  revisit #5 (<urn:uuid:00000000-0000-4000-8000-000000000006>) -> kind=ByRecordId target=<urn:uuid:00000000-0000-4000-8000-000000000003>

=== Round-trip byte equality: true (3188 == 3188 bytes) ===
```

---

## 多目标验证矩阵与差分测试 / Verification Matrix & Differential Oracle

本项目通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 在全部 4 个 MoonBit 目标平台上运行一致的测试与验收流程：

| 验证维度 | 命令 | 实测结果 | 覆盖说明 |
| --- | --- | --- | --- |
| 类型与 Lint | `moon check --deny-warn` | 通过（0 error, 0 warning） | 全模块及测试文件严格类型与告警检查 |
| 格式与契约 | `moon fmt --check && moon info` | 通过（0 diff） | `.mbti` 公共接口契约与代码格式完全同步 |
| `wasm` 测试 | `moon test --target wasm` | **116 / 116 passed (0 failed)** | 单元测试 + Fuzz + 负例 + 加固集成测试 |
| `wasm-gc` 测试 | `moon test --target wasm-gc` | **116 / 116 passed (0 failed)** | 单元测试 + Fuzz + 负例 + 加固集成测试 |
| `js` 测试 | `moon test --target js` | **116 / 116 passed (0 failed)** | 单元测试 + Fuzz + 负例 + 加固集成测试 |
| `native` 测试 | `moon test --target native` | **116 / 116 passed (0 failed)** | 单元测试 + Fuzz + 负例 + 加固集成测试 |
| CLI 演示 | `moon run cmd/main --target {native,js}` | 通过（双端 stdout 一致） | 6 记录 3188B WARC/1.1 解析、校验、CDXJ 与字节往返 |
| Python 差分预言机 | `python3 scripts/verify_oracle.py` | 通过（exit 0） | 核对 CLI、SHA-1/SHA-256 Base32、Chunked HTTP、SURT/CDXJ、Revisit、折叠头、二进制负载与 6 组恶意篡改归档 |
| 包打包洁净度 | `moon package --list` | 通过（零泄漏） | 通过 [`.moonignore`](.moonignore) 排除 `scripts/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md`、`SUBMISSION_CHECKLIST.md` 等非包文件 |

各包测试分布（共 116 个独立 `test` 用例）：
- 根模块（[`moon_warc_test.mbt`](moon_warc_test.mbt) + [`moon_warc_hardening_test.mbt`](moon_warc_hardening_test.mbt)）：2 + 26 = 28
- `codec`（[`codec/codec_test.mbt`](codec/codec_test.mbt) + [`codec/fuzz_test.mbt`](codec/fuzz_test.mbt)）：6 + 22 = 28
- `validate`（[`validate/validate_test.mbt`](validate/validate_test.mbt) + [`validate/negative_test.mbt`](validate/negative_test.mbt)）：5 + 24 = 29
- `digest`（[`digest/digest_test.mbt`](digest/digest_test.mbt)）：7
- `http_payload`（[`http_payload/http_payload_test.mbt`](http_payload/http_payload_test.mbt)）：7
- `surt`（[`surt/surt_test.mbt`](surt/surt_test.mbt)）：7
- `cdxj`（[`cdxj/cdxj_test.mbt`](cdxj/cdxj_test.mbt)）：5
- `header`（[`header/header_test.mbt`](header/header_test.mbt)）：5

### Python 差分预言机说明
为避免“用自己写的测试测自己的实现”，[`scripts/verify_oracle.py`](scripts/verify_oracle.py) 使用 Python 标准库（`hashlib`、`base64`、`json` 等）独立构造和核对参考真值，与 MoonBit 端运行结果进行字节级交叉验证（包含多记录归档、折叠头、`\x00\r\n\r\n\xff` 二进制载荷、`ByRecordId` / `ByUriAndDigest` revisit 溯源以及 6 类篡改/截断负例归档）。

---

## 参考规范 / Specifications Referenced

- **ISO 28500:2017 / ISO 28500:2009**：Information and documentation — WARC file format（WARC 1.1 & WARC 1.0 记录帧格式、强制头部、换行折叠、摘要字段与 Revisit 语义）
- **RFC 9112**：HTTP/1.1 Message Syntax and Routing（请求/响应起始行、头部解析与 Chunked Transfer Coding 解码）
- **RFC 4648**：The Base16, Base32, and Base64 Data Encodings（大写 Base32 编码及不区分大小写/可无填充解码规范）
- **FIPS 180-4 / RFC 3174**：Secure Hash Standard（SHA-256 与 SHA-1 增量消息摘要计算）
- **CDXJ & SURT**：Sort-friendly URI Reordering Transform 与 Web Archiving CDXJ 索引行格式规范

---

## CI 工作流说明 / GitHub Actions Note

仓库在 [`docs/ci.yml.example`](docs/ci.yml.example) 提供了完整的 GitHub Actions 多目标 CI 工作流模板。由于本地 `gh` CLI 令牌仅授予 `repo` 权限而未包含 `workflow` 权限，模板保留于 `docs/ci.yml.example`（未写入 `.github/workflows/`）；[`scripts/verify_all.sh`](scripts/verify_all.sh) 在本地执行与该模板完全一致的全套门禁检查。如需在 GitHub 端启用 Actions，可直接将该文件复制为 `.github/workflows/ci.yml`。

---

## 开源协议 / License

本项目采用 [Apache-2.0](LICENSE) 开源协议发布。
