# moon-warc 项目申报书

## 基本信息
- 项目名称：`moon-warc`（包名 `XinOrigin/moon_warc`）
- 参赛者：`XinOrigin`
- 联系方式：GitHub @XinOrigin（技术交流走仓库 Issues，个人联系信息见报名表）
- GitHub 仓库链接：https://github.com/XinOrigin/moon-warc （在线浏览器演示：https://xinorigin.github.io/moon-warc/ ，当前版本 `v0.5.0`）
- 项目方向与通用性说明：协议解析 / 网页归档与大模型语料数据基础设施。ISO 28500 WARC 与多成员 `.warc.gz`、WACZ 1.1.1、CDXJ/SURT 是网页归档、爬虫快照与大模型网页语料清洗的通用标准格式；内核采用零第三方依赖的 Sans-IO 设计，仅依赖 `moonbitlang/core`，同一套代码编译覆盖 `wasm`、`wasm-gc`、`js` 和 `native` 四个目标，已在本地 macOS `arm64` 与腾讯云 CNB `16C32G` Linux `x86_64`（`moonc v1.0.0-rc1`）双平台通过 **196 项**四端 `--deny-warn` 测试、**5 项** `moon bench --release` 微基准、92.37 MiB 四端与 CPython `zlib`/`hashlib` 基线对照（Dynamic Huffman `BTYPE=2` 压缩 `118,906 B`，`native 76.26 MiB/s`、`wasm-gc 68.42 MiB/s`）与在线浏览器工作台验证。
- 原创与移植说明：原创项目，非移植项目，不涉及其他开源项目代码移植（无原移植项目名称与来源链接）；参照 ISO 28500:2009/2017、RFC 1951、RFC 1952、RFC 9112、FIPS 180-4、RFC 4648、SURT/CDXJ、WebRecorder WACZ 1.1.1、RFC 8259 从零设计与实现，采用 `Apache-2.0` 协议。

## 项目简介
`moon-warc` 是一个纯 MoonBit 实现的 ISO 28500（WARC 1.0/1.1）、多成员 Dynamic-Huffman `.warc.gz` 与 WebRecorder WACZ 1.1.1 网页归档流式解析、压缩、校验、索引与语料导出库。对照 `mooncakes.io` 既有 `xiaojing012/moon-warc`（`0.1.0`，在其 `docs/limitations.md` 中明确聚焦基础 WARC/1.1 帧且无 `.warc.gz` 与 SHA 摘要计算），本项目补齐了生产级网页归档流水线的全套核心能力：`WARC/1.0+1.1` 与多成员 `.warc.gz` 增量分片编解码（`WarcReader` + `WarcGzReader` + `scan_archive_gz`，支持 `Int64` >2 GiB 偏移与 `ReaderLimits`）、纯 MoonBit RFC 1951 DEFLATE/LZ77（含零分配 `DeflateScratch` Dynamic Huffman `BTYPE=2` 压缩与 `InflateScratch` 多成员解压复用）及 CRC-32、HTTP/1.x 分块负载拆解、纯 MoonBit SHA-1/SHA-256 验真、`String::lexical_compare` SURT/CDXJ 二分检索、22 码合规诊断与 `revisit` 溯源、§9 分片重组、爬虫 HTTP 会话捕获 `record_http_exchange_gz`、WACZ 1.1.1 清单生成、CDX-11/RFC 8259 JSONL 导出、[`examples/crawler_to_rag/`](examples/crawler_to_rag/) 示例及离线浏览器巡检台。

## 预期使用场景
1. 浏览器端离线查看与校验网页归档（已交付上线 [`docs/index.html`](docs/index.html)）：无需上传服务器，在浏览器本地调用 MoonBit 编译生成的纯前端引擎解压多成员 Gzip、校验 SHA-1/SHA-256 与 ISO 28500 合规性、预览去分块 HTTP 正文并执行 SURT/`lookup_closest` 检索。
2. JS / Wasm / Native 爬虫采集、WACZ 打包与 LLM 语料清洗：爬虫直接调用 `record_http_exchange_gz` 落盘符合 Common Crawl 惯例的 `.warc.gz`；下游利用 `scan_archive_gz` / `WarcGzReader` 恒定成员内存扫描，调用 `build_wacz_manifests` 生成完整 WACZ 1.1.1 包索引，并按 SURT/状态码/MIME/时间筛选导出 CDXJ / CDX-11 或 RFC 8259 JSONL 语料（参考 [`examples/crawler_to_rag/`](examples/crawler_to_rag/)）。
3. 归档入库审计与超大记录分片处理：通过 `validate_archive` 核验强制头、UTC 公历日期、去分块后真实 `WARC-Payload-Digest` 与 `revisit` 溯源，并对超长记录执行 §9 切分与回拼验真。

## 拟实现的核心功能与迭代完成情况
截至 `v0.5.0`（12 个包，38 份 `.mbt` 源码），已全部交付并通过四端 **196 项测试**（193 单测/Fuzz/负例 + 3 `README.mbt.md` 可执行文档测试，核心 10 库包未覆盖行数降至 **227 行**）与 **5 项 `moon bench --release` 微基准**：
- 解析与序列化 ISO 28500 `WARC/1.0` / `WARC/1.1`、8 类标准类型、折叠头、CRLF 注入防护、严格闰年日期与 `Int64` >2 GiB 流偏移。
- 双 Sans-IO 增量读取器（`WarcReader` + 压缩成员粒度 `WarcGzReader`）与零数组回调 `scan_archive` / `scan_archive_gz`；纯 MoonBit RFC 1951 DEFLATE（Stored `BTYPE=0` / Fixed `BTYPE=1` / 零分配 Dynamic Huffman `BTYPE=2`，压缩率 `73.7%` 逼近 C `gzip -6` `73.4%`）与 RFC 1952 `.warc.gz`（支持 `scan_members_while`、`FEXTRA`/`FNAME`/`FCOMMENT`/`FHCRC`、`max_output_bytes` 防护）及 `record_http_exchange_gz`。
- 纯 MoonBit SHA-1/SHA-256 + RFC 9112 Chunked 解码、`String::lexical_compare` SURT/CDXJ/CDX-11、WebRecorder WACZ 1.1.1（`build_wacz_manifests`）、§9 分片重组、`export_jsonl`、`examples/crawler_to_rag`、3-OS [`docs/ci.yml.example`](docs/ci.yml.example)、Python 差分预言机与 [`AI_USAGE.md`](AI_USAGE.md) 透明披露。

后续节奏：
- 启用 GitHub Actions 工作流（`.github/workflows/ci.yml`）并上架 `mooncakes.io`（`moon login && moon publish`），完成十一月赛结项闭环，持续迭代面向 Q2 季度与年度奖评优。
