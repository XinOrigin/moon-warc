# 一页项目说明：moon-warc（MoonBit Hackathon 2026）

> 本文档可直接复制粘贴至官方飞书报名表单的项目说明栏。

---

## 基本信息

- **项目名称**：`moon-warc`（包名：`xinorigin/moon_warc`，当前版本 `v0.2.0`）
- **GitHub ID**：`XinOrigin`
- **开源仓库**：`https://github.com/XinOrigin/moon-warc`
- **开源协议**：`Apache-2.0`
- **技术栈**：纯 MoonBit（零第三方外部依赖，仅使用 `moonbitlang/core`；10 个工作区包、30 个 `.mbt` 文件共 8,192 行源码）
- **适用平台**：`wasm`、`wasm-gc`、`js`、`native` 四目标全量兼容
- **扩展阅读**：[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | [`docs/JUDGE_QA.md`](docs/JUDGE_QA.md)

---

## 1. 真实需求与背景

**WARC（ISO 28500）** 是国际互联网档案馆（Internet Archive）、Common Crawl、各国国家图书馆以及大模型预训练网页语料管线通用的网页归档标准格式，配合 **SURT / CDXJ** 索引实现网页快照的快速定位与去重回放。

然而，社区主流 WARC 处理库长期集中在 Python（`warcio`）、Java（`jwat`）或 C++ 工具链中。当开发者尝试在以下轻量级/跨端场景中处理 WARC 数据时，往往面临沉重依赖或无法编译至 WebAssembly 的困境：
1. **浏览器端 / WASM 网页归档回放器（Replay）**：需要在浏览器沙箱或 Edge Worker 中直接解析 WARC 流、解码 HTTP Chunked 载荷并查询 CDXJ，而无需将整套服务端搬入前端。
2. **边缘节点与数据管线合规审计**：需要在 Native 或 JS/WASM 运行时中校验 `WARC-Block-Digest`、`WARC-Payload-Digest` 与 ISO 28500 结构合规性，识别损坏切片或悬空 `revisit` 引用。

因此，生态亟需一个**零依赖、协议层纯正（Sans-IO）、一次编写即可同时跑在 WASM / WASM-GC / JS / Native 上的 ISO 28500 WARC 基础库**。

---

## 2. 项目目标

1. 完整实现 **ISO 28500 WARC 1.0 / 1.1** 流式读写编解码器（覆盖全 8 类标准记录类型及自定义扩展类型），支持任意字节分片喂入与字节级无损往返。
2. 内置纯 MoonBit **FIPS 180-4 / RFC 3174 SHA-1 & SHA-256** 与 **RFC 4648 Base32 / Hex** 实现，以及 **RFC 9112 HTTP/1.x** 拆包与 `Transfer-Encoding: chunked` 解码，保证 Payload 摘要对真实 HTTP 实体体精确验真。
3. 实现 **SURT** URL 规范化、**CDXJ / CDX-11** 索引构建解析，以及基于词法序的高效二分查找（精确、前缀、最近时间戳）与多维度子集提取（`ArchiveFilter` / `extract_subset`）。
4. 完整支持 **ISO 28500 §9 大文件分片与流式重组**（`segment_record` / `reassemble_segments`）、结构化合规审计（**22 个诊断码**，含 `continuation` 规则）、**`revisit` 双策略溯源**，以及面向大模型语料清洗的 **RFC 8259 JSONL 导出**（`export_jsonl`）。
5. 通过 **4 编译目标全量测试（163 / 163 通过，652 次后端执行）** 与 **独立 Python 差分预言机（`hashlib` / `base64` / `json`）** 交叉验证，交付高质量、可直接复用的 MoonBit 基础设施。

---

## 3. 明确非目标（Scope Boundaries）

为确保核心协议库轻量、可嵌入任意宿主环境，本项目明确**不**包含以下内容：
- **不内置 gzip / `.warc.gz` 压缩与解压缩**：采用 Sans-IO 设计，由调用方在流外层接入解压后的字节流。
- **不包含网络爬虫与 Socket I/O**：不内置 HTTP 网络请求客户端或任务调度器。
- **不包含文件系统读写与浏览器 DOM 重写**：不强绑定具体运行时的文件 API 或 HTML 重写逻辑。

---

## 4. 模块交付物清单

| 模块 / 文件 | 交付内容与定位 |
| --- | --- |
| [`moon_warc.mbt`](moon_warc.mbt) | 根门面 API（`library_version`、`parse_archive`、`encode_archive`、`build_cdxj_index`、`validate_archive`、`resolve_revisits`、`segment_record`、`reassemble_segments`、`filter_records`、`extract_subset`、`export_cdx11`、`export_jsonl`、`sample_archive_bytes`） |
| [`digest/`](digest/) | 纯 MoonBit 增量 SHA-1/SHA-256、Base32/Hex 编解码、`WARC-*-Digest` 解析与校验 |
| [`surt/`](surt/) | URI 解析与 SURT 规范化（域名反转、默认端口移除、路径归一化、查询参数排序、IPv4/IPv6） |
| [`http_payload/`](http_payload/) | 二进制安全的 HTTP/1.x 请求/响应拆解、RFC 9112 Chunked（含扩展与 Trailer）解码 |
| [`header/`](header/) | WARC 1.0/1.1 版本、全 8 类记录类型、折叠头部解析/序列化、严格 UTC 时间戳、CDXJ 时间转换与 §9 分片字段访问器 |
| [`codec/`](codec/) | Sans-IO 状态机 `WarcReader`（4KB 缓冲压缩 + 精确偏移追踪）、批量读写与类型化记录构建器（含分片逻辑摘要保护） |
| [`cdxj/`](cdxj/) | `CdxjEntry` / `CdxjIndex` 构建、JSON 转义行格式互转与二分查找（精确/前缀/最近时间） |
| [`validate/`](validate/) | ISO 28500 合规诊断报告（22 项诊断码，含 `continuation` 规则）与 `revisit` 溯源（`ByRecordId` / `ByUriAndDigest` / `Unresolved`） |
| [`pipeline/`](pipeline/) | ISO 28500 §9 分片与重组（`segment_record` / `reassemble_segments`）、多条件筛选与子集打包（`ArchiveFilter` / `extract_subset`）、`export_cdx11` 与 `export_jsonl` |
| [`cmd/main/`](cmd/main/) | 可执行 CLI 演示，展示 6 记录 3188B WARC/1.1 样本解析、校验、CDXJ、Revisit、字节往返、§9 分片重组与子集/CDX-11/JSONL 导出 |
| [`scripts/verify_oracle.py`](scripts/verify_oracle.py) | Python 差分预言机，核对摘要、HTTP 解块、SURT/CDXJ、归档编码、6 类负例与 v0.2.0 分片/子集/CDX-11/JSONL 管线 |
| [`scripts/verify_all.sh`](scripts/verify_all.sh) | 本地一键全量验证脚本（`fmt`、`info`、`check --deny-warn`、4 目标测试、CLI、Oracle、打包洁净度） |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) & [`docs/JUDGE_QA.md`](docs/JUDGE_QA.md) | 系统架构图解与评委技术问答速查手册 |

---

## 5. 核心技术要点

1. **Sans-IO 增量状态机与流式偏移追踪**：`WarcReader` 通过 `SeekHeader → ReadPayload → ReadTrailingCrlf` 显式状态机驱动，配合 4096 字节阈值缓冲压缩，在任意 1B–256B 碎片喂入下均能保持字节偏移 `offset` 与 `record_length` 零误差，并在 `finish()` 时捕获所有 EOF 截断异常。
2. **De-chunked HTTP 实体摘要闭环**：不同于仅对原始 HTTP 字节做哈希的简陋实现，`codec` 自动生成与 `validate` 验真均会穿透 `Transfer-Encoding: chunked` 边界提取真实实体体（entity body），严格对齐 ISO 28500 对 `WARC-Payload-Digest` 的定义。
3. **字节级词法序一致性的 SURT 与 CDXJ 二分检索**：针对 MoonBit `String::compare` 采用短词序（shortlex）的特性，明确采用 `String::lexical_compare` 统一 SURT 查询参数排序与 CDXJ 索引二分查找，杜绝长度不同键的排序偏差。
4. **二进制安全与跨目标确定性**：HTTP 正文与 `resource` 负载均以 `Bytes` / `BytesView` 零假定处理（兼容 `\x00\r\n\r\n\xff` 等二进制序列），SHA 位运算与编码逻辑在 `wasm`、`wasm-gc`、`js`、`native` 上输出比特级一致结果。

---

## 6. 本地验证命令与实测结果

```bash
export PATH="$HOME/.moon/bin:$PATH"
./scripts/verify_all.sh
```

- `moon check --deny-warn`：通过（0 error, 0 warning）
- `moon fmt --check` & `moon info`：通过（代码格式 0 差异，`.mbti` 公共接口契约 0 未提交变更）
- `moon test --target wasm`：**Total tests: 163, passed: 163, failed: 0**
- `moon test --target wasm-gc`：**Total tests: 163, passed: 163, failed: 0**
- `moon test --target js`：**Total tests: 163, passed: 163, failed: 0**
- `moon test --target native`：**Total tests: 163, passed: 163, failed: 0**
- `moon run cmd/main --target native` & `--target js`：均以退出码 0 运行并输出完全一致的 `moon-warc v0.2.0` 演示结果（6 记录 3188B WARC/1.1、`valid=true records=6 errors=0 warnings=0`、3 条排序 CDXJ 索引、1 条 `ByRecordId` revisit 溯源、`Round-trip byte equality: true (3188 == 3188 bytes)`、§9 3 段重组 `payload_exact=true`、`org,example)` 2xx 子集 2 记录 1126B `valid=true`、CDX-11 4 行、JSONL 6 行）
- `python3 scripts/verify_oracle.py`：通过（exit 0，验证 CLI 双目标一致性、SHA-1/SHA-256 Base32、Chunked HTTP、SURT/CDXJ、Revisit、折叠头、二进制负载、字节往返、6 组负例篡改归档以及 v0.2.0 §9 分片重组/子集抽出/CDX-11/JSONL `json.loads()` 全量校验）
- `moon package --list`：通过（52 个包源码与配置，通过 [`.moonignore`](.moonignore) 严格排除 `scripts/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md`、`SUBMISSION_CHECKLIST.md`）
