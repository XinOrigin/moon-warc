# 评委与社区技术问答速查 / Judge & Reviewer Technical Q&A (`v0.2.0`)

本文档整理了围绕 `XinOrigin/moon-warc` 架构选型、MoonBit 语言细节、验证方法论及 AI 可解释性的 10 个核心技术问题，便于参赛者现场答辩或回应社区评审。

---

### Q1：为什么选择实现纯 MoonBit 的 ISO 28500 WARC 解析与管线库？生态查重情况如何？
- **查重事实**：立项前对 `mooncakes.io` 与 GitHub MoonBit 生态检索，已有 `jsonpath`、`cbor`、`toml`、`modbus`、`iso8583` 等格式库，但 **WARC / ISO 28500 / CDXJ 领域为空白（0 现有包）**。
- **真实需求**：WARC 是 Internet Archive、Common Crawl 及大模型预训练网页语料库的标准载体。主流工具链依赖 Python/Java/C++，而 `moon-warc` 零第三方依赖，可一次编译运行于浏览器 `wasm`/`wasm-gc` 网页回放器、Edge JS 节点与 `native` 数据清洗管线。

### Q2：核心解析器 `WarcReader` 为什么采用 Sans-IO 设计，而不直接封装文件/网络 I/O？
- **跨四端零条件编译**：WASM 沙箱、浏览器 `ReadableStream`、Node/Deno JS 与 Native 文件句柄的 I/O 原语完全不同。Sans-IO 只负责状态机（`SeekHeader -> ReadPayload -> ReadTrailingCrlf`）和字节切片：`feed(BytesView)` 喂入、`next_record()` 增量产出、`finish()` 做 EOF 截断审计。
- **缓冲优化**：消费游标达到 `>= 4096` 字节或耗尽缓冲时触发滑动压缩（`compact_if_needed`），避免每次读包全量搬移数组，同时通过 `total_consumed` 保证多块喂入后 `offset` 与 `record_length` 的字节精确性。

### Q3：`WARC-Block-Digest` 与 `WARC-Payload-Digest` 有何区别？遇到 HTTP Chunked 如何处理？
- **ISO 28500 语义差异**：`WARC-Block-Digest` 对记录体完整字节流（例如包含 `HTTP/1.1 200 OK` 状态行、HTTP 头和 chunk 帧）计算摘要；而对于 `response` 记录，`WARC-Payload-Digest` 必须穿透 HTTP 头与 `Transfer-Encoding: chunked` 分块边界，仅对**解码后的真实 HTTP 实体体（entity body）**计算哈希。
- **工程实现**：`http_payload::extract_entity_body()` 先解码 chunk 大小、`;ext=val` 分块扩展和末尾 trailer 头，再由 `codec::encode_record`（生成）和 `validate::validate_archive`（验真）共同调用，确保生成与审计完全闭环。

### Q4：为什么不能直接用 MoonBit 的 `String::compare` 做 SURT 排序、CDXJ 二分检索或时间范围过滤？
- **关键语言陷阱**：MoonBit 标准库中 `String::compare` 采用 **shortlex 序（先比字符串长度，同长度再比字典序）**，这会导致 `"k=v"` 排在 `"flag"` 之前，或者变长查询参数/SURT 键顺序错乱。
- **修复与锁定**：所有涉及规范字典序的位置——`surt::sort_query`、`cdxj::compare_entries` / `lower_bound_surt` 二分查找，以及 `pipeline` 中标准化 14 位时间戳比较——均显式调用 **`String::lexical_compare`**，并通过 Python `sorted()` 在差分预言机中逐行交叉验证。

### Q5：`sha1` 和 `sha256` 在 `wasm` / `wasm-gc` / `js` / `native` 上如何保证比特级一致？
- **确定性算术**：纯 MoonBit 实现的 FIPS 180-4 / RFC 3174 哈希器在 [`digest/sha1.mbt`](../digest/sha1.mbt) 与 [`digest/sha256.mbt`](../digest/sha256.mbt) 中显式使用 32/64 位无符号整型（`UInt32` / `UInt64`）和定长掩码位运算，完全规避 JS 53-bit float 精度截断及有符号右移语义差异。
- **实测覆盖**：同一套包含密码学摘要、Fuzz 与负例的 **163 个测试用例**在四大编译目标全部跑通（`163/163 passed`），CLI 在 `--target native` 与 `--target js` 下的 stdout 字节级一致。

### Q6：ISO 28500 §9 分片记录（`WARC-Segment-Number`）是如何解决 `auto_digest` 冲突的？
- 当一条超长 HTTP `response` 被 `segment_record` 切分为第 1 段（origin）和第 `2..N` 段（`continuation`）时，第 1 段的 `payload` 仅包含前 `max_segment_bytes` 字节，但协议要求其保留整个完整逻辑实体的 `WARC-Payload-Digest`。
- 在 [`codec/writer.mbt`](../codec/writer.mbt) 中，`encode_record` 会检测 `h.get("WARC-Segment-Number") is None`：未分片记录正常重算 Block + Payload 双摘要；分片记录仅重算当前分段自己的 `Content-Length` 与 `WARC-Block-Digest`，保留原逻辑 `WARC-Payload-Digest` 不被部分切片覆盖。待 `reassemble_segments()` 拼回全文后再执行整包实体摘要验真。

### Q7：`export_jsonl` 面向大模型预训练语料/检索场景做了哪些安全处理？
- **严格 RFC 8259 转义**：手写字符遍历转义 `\"`、`\\`、`\b`、`\f`、`\n`、`\r`、`\t` 以及 `< 0x20` 控制字节的 `\u00XX` 编码，并支持按 Unicode 标量字符数截断（`max_body_chars`），不会撕裂中文或 Emoji（如 `🌙`）多字节 UTF-8 序列。
- **二进制安全优雅降级**：仅当 MIME 属于文本类型（`text/*`、`application/json`、`application/xml`、`application/warc-fields`、`application/xhtml+xml`、`+json`、`+xml`）且 `@utf8.decode` 无错误时才提取 `"text"` 字段；遇到 PNG 等二进制负载或混合非 UTF-8 字节流时自动跳过 `"text"`，保证每行严格可被 Python `json.loads()` 解析。

### Q8：你们声称“零依赖”，是如何证明没有意外打包临时脚本或文档到发布包里的？
- [`moon.mod`](../moon.mod) 中无任何外部 `[deps]`，全仓库仅引用 `moonbitlang/core` 标准库。
- 通过 [`.moonignore`](../.moonignore) 严格排除 `scripts/`、`.github/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md`、`SUBMISSION_CHECKLIST.md` 与 `pkg-list.txt`。
- 本地验收门禁 [`scripts/verify_all.sh`](../scripts/verify_all.sh) 每次运行都会执行 `moon package --list` 并使用正则断言**未泄漏任何非包源码文件**。

### Q9：如何回应大赛规则中的“AI 辅助编程必须可解释、可审查、可验证”？
- **透明披露**：仓库根目录 [`AI_USAGE.md`](../AI_USAGE.md) 明确界定了 AI 辅助范围（模块拆分、测试矩阵扩展、差分脚本骨架）与人工逐行审阅规则。
- **拒绝“AI 自证循环”**：核心验证不依赖单侧单元测试，而是通过 [`scripts/verify_oracle.py`](../scripts/verify_oracle.py) 调用独立的 **Python 标准库（`hashlib`、`base64`、`json`）** 作为外部参照系（Differential Oracle），独立生成合规 WARC 归档、恶意篡改负例与分片/JSONL 校验用例并核对 MoonBit 端输出。
- **公共契约固化**：通过 `moon info` 生成的各包 `pkg.generated.mbti` 对所有导出类型与签名进行静态契约锁定，任何无意 API 变动都会被 CI 门禁拦截。

### Q10：`v0.2.0` 之后下一步演进路线是什么？
- 已在 GitHub 公开规划两个后续 Issue 持续推进：
  1. **RFC 1952 多成员 `.warc.gz` 流式压缩与解压**：支持每条 WARC 记录独立 zlib/gzip member 压缩（Common Crawl 标准存储布局），依然保持 Sans-IO 字节流接口。
  2. **四目标吞吐与内存基准测试套件（Benchmark Harness）**：系统度量 `native`、`wasm`、`wasm-gc`、`js` 在百 MB 级流式解析、SHA-256 与 CDXJ 构建上的吞吐量与 GC 停顿表现，冲刺季度/年度榜单。
