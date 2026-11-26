# 设计问答与技术说明 / Design FAQ (`v0.3.0`)

本文档记录 `XinOrigin/moon-warc` 在架构选型、MoonBit 语义细节、`.warc.gz` 多成员设计、验证方法与 AI 使用披露上的 10 个常见问题。

---

### Q1：为什么选择实现纯 MoonBit 的 ISO 28500 WARC 与 `.warc.gz` 解析与管线库？生态查重情况如何？
- **生态定位与差异化**：MoonBit 生态中已有 `xiaojing012/moon-warc`（`0.1.0`），提供基础的 WARC/1.1 帧封装、校验、分段与内存索引，但源码明确注明暂未实现摘要计算（`digest` deferred）且未提供 `.warc.gz` 与导出管线。本项目在 `v0.3.0` 完整覆盖了 `WARC/1.0` 兼容、纯 MoonBit 增量 SHA-1/SHA-256 与 Base32/Hex 验真、多成员 RFC 1951/1952 `.warc.gz`、RFC 9112 Chunked HTTP 实体提取、SURT/CDXJ/CDX-11 词法序索引、`revisit` 溯源、§9 分片重组及 RFC 8259 JSONL 导出。
- **真实需求**：WARC 与多成员 `.warc.gz` 是 Internet Archive、Common Crawl 及大模型预训练网页语料库的标准载体。主流工具链依赖 Python/Java/C++，而 `moon-warc` 零第三方依赖，一次编写可编译到 `wasm`、`wasm-gc`、`js` 与 `native` 运行（含纯前端 [`docs/index.html`](https://xinorigin.github.io/moon-warc/) 离线分析台）。

### Q2：核心解析器 `WarcReader` 为什么采用 Sans-IO 设计，如何防范超大文件与畸形流？
- **跨四端零条件编译**：WASM 沙箱、浏览器 `ReadableStream`、Node/Deno JS 与 Native 文件句柄的 I/O 原语完全不同。Sans-IO 只负责状态机（`SeekHeader -> ReadPayload -> ReadTrailingCrlf`）和字节切片：`feed(BytesView)` 喂入、`next_record()` 增量产出、`finish()` 做 EOF 截断审计，`scan_archive` 支持逐条流式消费而无需将整文件 `Array[WarcRecord]` 驻留内存。
- **`Int64` 偏移、均摊压缩与 `ReaderLimits`**：消费游标耗尽缓冲时会直接清空重置，仅在 `cursor >= 4096 && cursor >= remaining` 时触发 `compact_if_needed()` 压缩；同时通过 `header_scan_pos` 记录 `\r\n\r\n` 扫描水位、`checked_add_i64` 支持超过 2 GiB 的 `Int64` 流偏移，并内置可配置 `ReaderLimits`（默认头部 64 KiB、载荷 64 MiB）防御畸形未闭合头与超大记录。

### Q3：`WARC-Block-Digest` 与 `WARC-Payload-Digest` 有何区别？遇到 HTTP Chunked 如何处理？
- **ISO 28500 语义差异**：`WARC-Block-Digest` 对记录体完整字节流（例如包含 `HTTP/1.1 200 OK` 状态行、HTTP 头和 chunk 帧）计算摘要；而对于 `response` 记录，`WARC-Payload-Digest` 必须穿透 HTTP 头与 `Transfer-Encoding: chunked` 分块边界，仅对**解码后的真实 HTTP 实体体（entity body）**计算哈希。
- **工程实现**：`http_payload::extract_entity_body()` 先解码 chunk 大小、`;ext=val` 分块扩展和末尾 trailer 头，再由 `codec::encode_record`（生成）和 `validate::validate_archive`（验真）共同调用，确保生成与审计完全闭环。

### Q4：为什么不能直接用 MoonBit 的 `String::compare` 做 SURT 排序、CDXJ 二分检索或时间范围过滤？
- **关键语言陷阱**：MoonBit 标准库中 `String::compare` 采用 **shortlex 序（先比字符串长度，同长度再比字典序）**，这会导致 `"k=v"` 排在 `"flag"` 之前，或者变长查询参数/SURT 键顺序错乱。
- **修复与锁定**：所有涉及规范字典序的位置——`surt::sort_query`、`cdxj::compare_entries` / `lower_bound_surt` 二分查找，以及 `pipeline` 中标准化 14 位时间戳比较——均显式调用 **`String::lexical_compare`**，并通过 Python `sorted()` 在差分预言机中逐行交叉验证。

### Q5：`sha1` 和 `sha256` 在 `wasm` / `wasm-gc` / `js` / `native` 上如何保证比特级一致？
- **确定性算术**：纯 MoonBit 实现的 FIPS 180-4 / RFC 3174 哈希器在 [`digest/sha1.mbt`](../digest/sha1.mbt) 与 [`digest/sha256.mbt`](../digest/sha256.mbt) 中显式使用 32/64 位无符号整型（`UInt32` / `UInt64`）和定长掩码位运算，完全规避 JS 53-bit float 精度截断及有符号右移语义差异。
- **实测覆盖**：同一套包含密码学摘要、Fuzz 与负例的 **173 个测试用例**在四大编译目标全部跑通（`173/173 passed`），CLI 在 `--target native` 与 `--target js` 下的 stdout 字节级一致。

### Q6：ISO 28500 §9 分片记录（`WARC-Segment-Number`）是如何解决 `auto_digest` 冲突的？
- 当一条超长 HTTP `response` 被 `segment_record` 切分为第 1 段（origin）和第 `2..N` 段（`continuation`）时，第 1 段的 `payload` 仅包含前 `max_segment_bytes` 字节，但协议要求其保留整个完整逻辑实体的 `WARC-Payload-Digest`。
- 在 [`codec/writer.mbt`](../codec/writer.mbt) 中，`encode_record` 会检测 `h.get("WARC-Segment-Number") is None`：未分片记录正常重算 Block + Payload 双摘要；分片记录仅重算当前分段自己的 `Content-Length` 与 `WARC-Block-Digest`，保留原逻辑 `WARC-Payload-Digest` 不被部分切片覆盖。待 `reassemble_segments()` 拼回全文后再执行整包实体摘要验真。

### Q7：`export_jsonl` 面向大模型预训练语料/检索场景做了哪些安全处理？
- **严格 RFC 8259 转义**：手写字符遍历转义 `\"`、`\\`、`\b`、`\f`、`\n`、`\r`、`\t` 以及 `< 0x20` 控制字节的 `\u00XX` 编码，并支持按 Unicode 标量字符数截断（`max_body_chars`），不会撕裂中文或 Emoji（如 `🌙`）多字节 UTF-8 序列。
- **二进制安全优雅降级**：仅当 MIME 属于文本类型（`text/*`、`application/json`、`application/xml`、`application/warc-fields`、`application/xhtml+xml`、`+json`、`+xml`）且 `@utf8.decode` 无错误时才提取 `"text"` 字段；遇到 PNG 等二进制负载或混合非 UTF-8 字节流时自动跳过 `"text"`，保证每行严格可被 Python `json.loads()` 解析。

### Q8：你们声称“零依赖”，是如何证明没有意外打包临时脚本或文档到发布包里的？
- [`moon.mod`](../moon.mod) 中无任何外部 `[deps]`，全仓库仅引用 `moonbitlang/core` 标准库。
- 通过 [`.moonignore`](../.moonignore) 严格排除 `scripts/`、`.github/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md` 与 `pkg-list.txt`。
- 本地验收门禁 [`scripts/verify_all.sh`](../scripts/verify_all.sh) 每次运行都会执行 `moon package --list` 并使用正则断言**未泄漏任何非包源码文件**。

### Q9：如何回应大赛规则中的“AI 辅助编程必须可解释、可审查、可验证”？
- **透明披露**：仓库根目录 [`AI_USAGE.md`](../AI_USAGE.md) 明确披露了 `v0.1.0`–`v0.2.0` 初始原型的高密度 AI 辅助过程，以及后续 `v0.2.1+` 缺陷修复与独立核查机制。
- **跨后端与 Python 对照**：通过四编译目标全量测试（173 项），并在 `native` 探针下由 [`scripts/verify_oracle.py`](../scripts/verify_oracle.py) 调用 Python 标准库（`hashlib`、`base64`、`json`）核对摘要与 JSONL，结合 Python 参考函数检查分块 HTTP、SURT/CDXJ、折叠头、6 组负例及 §9 管线。
- **公共契约固化**：通过 `moon info` 生成并跟踪各包 `pkg.generated.mbti` 接口文件，`v0.2.1` 已将 `WarcReader`、`Sha1Hasher`、`Sha256Hasher` 与 `CdxjIndex` 内部可变字段收紧至包内私有。

### Q10：下一步多成员 `.warc.gz` 与性能基准实现了什么？
- **已完成并超越原 `v0.3.0` 规划**：
  1. **纯 MoonBit RFC 1951/1952 多成员 `.warc.gz`（Issue #11）**：零依赖实现了 IEEE 802.3 CRC-32、DEFLATE 解压（Stored / Fixed / Dynamic Huffman）与 LZ77 压缩、以及每条记录独立 Gzip member 封装与精确压缩成员 `(offset, record_length)` 映射（已与 Python `gzip compresslevel=9` + `FNAME` 双向差分验证）。
  2. **四目标吞吐基准与离线浏览工作台（Issue #12）**：已提供 [`scripts/run_benchmarks.py`](../scripts/run_benchmarks.py) 与实测报告 [`docs/BENCHMARKS.md`](BENCHMARKS.md)，并上线基于 MoonBit JS 后端的纯离线浏览器分析台 [`docs/index.html`](https://xinorigin.github.io/moon-warc/)。
