# moon-warc 项目申报书

## 基本信息
- 项目名称：`moon-warc`（包名 `xinorigin/moon_warc`）
- 参赛者：`XinOrigin`
- 联系方式：GitHub @XinOrigin（技术交流走仓库 Issues，个人联系信息见报名表）
- GitHub 仓库链接：https://github.com/XinOrigin/moon-warc （当前 `v0.2.1`，含 11 个有效功能与缺陷修复提交，无空提交或无意义拆分）
- 项目方向与通用性说明：协议解析 / 网页归档数据工具库。ISO 28500 WARC 与 CDXJ/SURT 是网页归档、爬虫快照与大模型网页语料清洗的通用标准格式；内核采用零第三方依赖的 Sans-IO 设计，只依赖 `moonbitlang/core`，同一套代码可编译到 `wasm`、`wasm-gc`、`js` 和 `native` 四个目标复用。
- 原创与移植说明：原创项目，非移植项目，不涉及其他开源项目代码移植（无原移植项目名称与来源链接）；参照 ISO 28500:2009/2017、RFC 9112、FIPS 180-4、RFC 4648、SURT/CDXJ、RFC 8259 从零设计与实现，采用 `Apache-2.0` 协议。

## 项目简介
`moon-warc` 是一个纯 MoonBit 实现的 ISO 28500（WARC 1.0/1.1）网页归档解析、校验、索引与导出库。MoonBit 生态已有偏重 WARC/1.1 基础帧封装的 `xiaojing012/moon-warc`；本项目在此基础上补齐网页归档中更完整的协议与处理能力，覆盖 WARC 1.0/1.1 增量读写、HTTP 分块负载拆解、纯 MoonBit SHA-1/SHA-256 验真、SURT/CDXJ 检索、合规校验，以及 ISO 28500 §9 分片重组与 CDX-11/JSONL 导出。

## 预期使用场景
1. 浏览器端离线查看与校验网页归档：在前端使用浏览器原生 `DecompressionStream` 解压归档字节流，喂给编译为 Wasm 的 `WarcReader` 逐条解析，在本地检查快照摘要完整性、查看 HTTP 响应并按 SURT/CDXJ 检索历史时间点，无需把归档文件上传到服务器。
2. JS 或 Native 端归档抽子集与语料清洗：在脚本或数据管线中按域名 SURT 前缀、HTTP 状态码区间、MIME 类型和日期范围筛选 WARC 子集，生成标准 CDXJ / 11 列 CDX 索引，或按 RFC 8259 转义导出含正文的 JSONL 用于文本清洗与检索。
3. 归档入库巡检与大记录分片处理：在网页归档落盘或迁移前调用 `validate_archive` 核验强制头、UTC 日期、去分块后的真实 `WARC-Payload-Digest` 以及 `revisit` 去重溯源，并对超长记录执行 ISO 28500 §9 分片切分与回拼验真。

## 拟实现的核心功能与迭代计划
当前 `v0.2.1` 已实现并通过四端 173 项测试：
- 解析与序列化 ISO 28500 `WARC/1.0` 和 `WARC/1.1` 头部，支持 8 类标准记录类型、扩展类型、折叠头部和 UTC 日期校验。
- Sans-IO 增量帧读取器 `WarcReader`（均摊缓冲压缩、头扫描水位与 `Int32` 偏移溢出保护）及构建器，支持任意切片喂入和字节级往返编码。
- 纯 MoonBit 增量 SHA-1/SHA-256 与 Base32/Hex（显式 `UInt32`/`UInt64` 位运算，复用内部工作数组，保证跨 JS/Wasm/Native 一致）；对 HTTP `response` 先按 `BytesView` 分离头部（支持 obs-fold 折叠头与多行 `Transfer-Encoding`）再解 RFC 9112 `chunked`，使 `WARC-Payload-Digest` 只校验真实实体体。
- URL 转 SURT 规范键与排序 CDXJ 索引，因 MoonBit 默认 `String::compare` 为短词序会破坏前缀连续性，排序、二分查找与日期筛选统一使用 `String::lexical_compare`；`lookup_closest` 按公历换算秒级时间差，避免跨日/跨月误判。
- 22 种结构化诊断码的 `validate_archive`、`revisit` 溯源，以及 ISO 28500 §9 分片重组（保留分片起源记录逻辑 `WARC-Payload-Digest` 并检查段序）、多条件子集筛选、支持重定向列的 11 列 CDX 和 RFC 8259 JSONL 导出。
- 仓库提供 `cmd/main` 演示（`native`/`js` 输出一致）与 `scripts/verify_oracle.py`（在 `native` 下调用 Python `hashlib`/`base64`/`json` 对照摘要与 JSONL）；AI 辅助开发范围与边界透明记录于仓库 `AI_USAGE.md`。

当前局限与 `v0.3.0` 计划：
- 目前仅处理未压缩 WARC、单记录 `Content-Length` 上限约 1.86 GiB（`2,000,000,009` 字节）、根门面批处理接口仍基于全量内存 `Array[WarcRecord]`，测试以合成语料为主且尚未发布到 `mooncakes.io`。
- 下一阶段（`v0.3.0`）计划发布至 `mooncakes.io`，迁移偏移至 `Int64` 并补充逐记录流式消费接口，实现多成员 `.warc.gz` 解压与压缩成员偏移追踪（Issue #11），交付磁盘/stdin CLI 与浏览器 Wasm 拖拽查看页，并补齐线上 GitHub Actions CI、真实 Common Crawl 样本对拍与四端吞吐基准（Issue #12）。
