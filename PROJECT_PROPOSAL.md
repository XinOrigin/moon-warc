# moon-warc 项目申报书

## 基本信息
- 项目名称：`moon-warc`（包名 `XinOrigin/moon_warc`）
- 参赛者：`XinOrigin`
- 联系方式：GitHub @XinOrigin（技术交流走仓库 Issues，个人联系信息见报名表）
- GitHub 仓库链接：https://github.com/XinOrigin/moon-warc （在线浏览器演示：https://xinorigin.github.io/moon-warc/ ，当前版本 `v0.3.0`）
- 项目方向与通用性说明：协议解析 / 网页归档与大模型语料数据基础设施。ISO 28500 WARC 与多成员 `.warc.gz`、CDXJ/SURT 是网页归档、爬虫快照与大模型网页语料清洗的通用标准格式；内核采用零第三方依赖的 Sans-IO 设计，仅依赖 `moonbitlang/core`，同一套代码编译覆盖 `wasm`、`wasm-gc`、`js` 和 `native` 四个目标，并已在全部四端跑通 187 项测试与 9.24 MiB 多阶段吞吐基准测试。
- 原创与移植说明：原创项目，非移植项目，不涉及其他开源项目代码移植（无原移植项目名称与来源链接）；参照 ISO 28500:2009/2017、RFC 1951、RFC 1952、RFC 9112、FIPS 180-4、RFC 4648、SURT/CDXJ、RFC 8259 从零设计与实现，采用 `Apache-2.0` 协议。

## 项目简介
`moon-warc` 是一个纯 MoonBit 实现的 ISO 28500（WARC 1.0/1.1）与多成员 RFC 1952 `.warc.gz` 网页归档解析、压缩、校验、索引与语料导出库。MoonBit 生态已有侧重 WARC/1.1 基础帧封装且尚未实现密码学摘要与压缩的 `xiaojing012/moon-warc`；本项目在 `v0.3.0` 完整补齐了生产级网页归档流水线所需的核心能力：WARC 1.0/1.1 与多成员 `.warc.gz` 增量编解码（`Int64` >2 GiB 偏移 + 压缩成员定位 + `ReaderLimits` 防护）、纯 MoonBit RFC 1951 DEFLATE/LZ77 与 CRC-32、HTTP/1.x 分块负载拆解、纯 MoonBit SHA-1/SHA-256 验真、`String::lexical_compare` SURT/CDXJ 检索、ISO 28500 合规诊断与 `revisit` 溯源、§9 分片重组，以及 CDX-11/JSONL 导出与离线浏览器巡检页面。

## 预期使用场景
1. 浏览器端离线查看与校验网页归档（已交付上线 [`docs/index.html`](docs/index.html)）：无需将 `.warc` 或 `.warc.gz` 上传到服务器，在浏览器本地调用 MoonBit 编译生成的纯前端引擎直接解压多成员 Gzip、校验 SHA-1/SHA-256 与 ISO 28500 合规性、高亮 HTTP 实体正文并支持 SURT 前缀过滤与 `lookup_closest` 时间点检索。
2. JS / Wasm / Native 端归档抽子集与 LLM 语料清洗：利用 `scan_archive` 流式扫描、按域名 SURT 前缀、HTTP 状态码区间、MIME 类型和日期范围筛选 WARC 子集，生成基于压缩成员偏移的标准 CDXJ / 11 列 CDX 索引以支持 HTTP `Range` 切片读取，或按 RFC 8259 导出 UTF-8 正文 JSONL。
3. 归档入库巡检与超大记录分片处理：在网页归档落盘或迁移前调用 `validate_archive` 核验强制头、UTC 日历日期、去分块后的真实 `WARC-Payload-Digest` 与 `revisit` 溯源，并对超长记录执行 ISO 28500 §9 分片切分与回拼验真。

## 拟实现的核心功能与迭代完成情况
截至 `v0.3.0`（PR #14 / #15 / #16，11 个包，10,594 行 `.mbt` 源码），已全部交付并通过四端 **187 项测试**（185 单元测试 + 2 `README.mbt.md` 可执行文档测试）：
- 解析与序列化 ISO 28500 `WARC/1.0` 和 `WARC/1.1` 头部，支持 8 类标准记录类型、扩展类型、折叠头部、CRLF 序列化注入防护与严格公历 `WarcDate` / 14 位 CDXJ 日期校验。
- Sans-IO 增量帧读取器 `WarcReader`（`Int64` 偏移、可配置 `ReaderLimits`、均摊缓冲压缩、头扫描水位与零全量数组 `scan_all` / `scan_archive`）及 `auto_digest` 构建器。
- 纯 MoonBit RFC 1951 DEFLATE 解压（Stored / Fixed / Dynamic Huffman + 压缩炸弹 `max_output_bytes` 守卫）与 LZ77 + Fixed Huffman 压缩、IEEE 802.3 CRC-32 与 RFC 1952 多成员 `.warc.gz` 容器，精确追踪每个压缩成员的 `(compressed_offset, compressed_length)` 供 CDXJ/CDX-11 使用。
- 纯 MoonBit 增量 SHA-1/SHA-256 与 Base32/Hex；对 HTTP `response` 先分离头部（obs-fold 与多行 `Transfer-Encoding`）再解 RFC 9112 `chunked`，使 `WARC-Payload-Digest` 校验真实实体体。
- 私有封装 `CdxjIndex` 与显式 `String::lexical_compare` SURT 排序、SURT 空白百分号转义及公历秒级 `lookup_closest`；22 种结构化诊断码的 `validate_archive`、`revisit` 溯源、§9 分片重组、多条件子集筛选、支持重定向列的 11 列 CDX 和 RFC 8259 JSONL 导出。
- 端到端离线浏览器工具 [`docs/index.html`](docs/index.html)、`native`/`js` 一致性 CLI、Python 差分预言机（覆盖 `hashlib`/`base64`/`zlib.crc32`/`gzip -9` 动态哈夫曼与 `FNAME`/`json`）及四端性能基准测试 [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md)；AI 辅助范围与可解释性透明披露于 [`AI_USAGE.md`](AI_USAGE.md)。

后续发布收尾：
- 完成 `moon login && moon publish` 正式上架 `mooncakes.io`，并在开启 GitHub `workflow` 作用域后启用仓库 [`.github/workflows/ci.yml`](docs/ci.yml.example) 线上自动测试。
