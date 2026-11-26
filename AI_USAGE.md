# AI 使用声明与可解释性说明 / AI Usage & Explainability Disclosure

为响应 MoonBit Hackathon 2026 官方规则中关于 **“AI 辅助开发需做到可解释、可审查、可独立验证”** 的要求，本文档透明披露 [`XinOrigin/moon-warc`](https://github.com/XinOrigin/moon-warc) 开发过程中的 AI 协助方式，以及人工审查与自动化验证机制。

---

## 1. AI 协助范围 (How AI Assisted)

本项目在设计与开发过程中使用了 AI 编码助手，主要辅助完成以下工作：
- **架构拆解与文档起草**：将 ISO 28500 WARC 规范拆分为职责正交的子包（`digest`、`surt`、`http_payload`、`header`、`codec`、`cdxj`、`validate`、`pipeline`、根门面 `moon_warc` 与 `cmd/main`），并起草 README、项目说明、架构文档（[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)）、设计问答（[`docs/FAQ.md`](docs/FAQ.md)）与变更日志。
- **样板代码与边界测试生成**：辅助编写结构化测试集，包括 RFC 3174 / FIPS 180-4 / RFC 4648 标准向量测试、多切片尺寸流式状态机测试（[`codec/fuzz_test.mbt`](codec/fuzz_test.mbt)）、畸形与篡改报文负例测试（[`validate/negative_test.mbt`](validate/negative_test.mbt)）、ISO 28500 §9 分片重组与过滤导出测试（[`pipeline/pipeline_test.mbt`](pipeline/pipeline_test.mbt)）以及根门面集成测试（[`moon_warc_test.mbt`](moon_warc_test.mbt)、[`moon_warc_hardening_test.mbt`](moon_warc_hardening_test.mbt)）。
- **差分验证脚本与交互构建**：辅助构建 [`scripts/verify_oracle.py`](scripts/verify_oracle.py)（在 `native` 下调用 Python `hashlib`、`base64`、`zlib.crc32`、`gzip` 动态哈夫曼及 `json` 做双向差分对拍），以及 [`scripts/run_benchmarks.py`](scripts/run_benchmarks.py) 与 [`scripts/build_web_demo.py`](scripts/build_web_demo.py)（将 MoonBit JS 后端产出接入 [`docs/index.html`](docs/index.html)）。

---

## 2. 审查方式与确定性工程门禁 (Verification & Quality Gates)

本项目 `v0.1.0`–`v0.2.0` 初始版本于 2026-11-25 在高密度 AI 辅助开发下完成，后续 `v0.2.1`–`v0.3.1` 经过完整的**交叉审计与缺陷清零**、`Int64` 位宽升级、多成员 `.warc.gz` 扩展以及 9-bit 哈夫曼快速查表 / 零拷贝 `BytesView` 扫描优化与四端基准验证：

1. **规范对照与交叉审计**：
   - 对照 **ISO 28500:2017**、**RFC 1951/1952**、**RFC 9112**、**RFC 4648** 与 **FIPS 180-4** 逐行核对并修复了交叉审计发现的 7 项隐患：将 `CdxjIndex.entries` 收紧为 `priv` 只读封装、为 `WarcReader` 补充 `ReaderLimits` 体积护栏、升级偏移量与 `Content-Length` 至 `Int64`、防护 `WarcHeader::serialize` 中的 `\r`/`\n` 注入、对 `to_surt` 空白与控制字符做百分号转义、补齐 §9 `continuation` 原点与仅末段 `Total-Length` 检查，以及统一 `WarcDate::parse_cdxj_timestamp` 日历校验。
   - 核查并锁定 MoonBit 语言语义细节：在 [`surt/surt.mbt`](surt/surt.mbt)、[`cdxj/cdxj.mbt`](cdxj/cdxj.mbt) 与 [`pipeline/filter.mbt`](pipeline/filter.mbt) 中显式使用 `String::lexical_compare`；在 [`gzip/`](gzip/) 中全部使用 `UInt32` / `Int64` 实现跨四端位精确 DEFLATE/CRC-32。

2. **编译器静态契约、文档测试与零告警门禁**：
   - 运行 `moon check --deny-warn` 确保全部 11 个包（`35` 份 `.mbt` 源码）零编译错误、零静态警告。
   - 运行 `moon fmt --check` 与 `moon info`，通过各包的 `pkg.generated.mbti` 追踪公共签名，并在 [`README.mbt.md`](README.mbt.md) 中提供由 `moon test` 直接编译运行的 `` ```moonbit check `` 文档测试。

3. **四目标矩阵一致性测试与基准测量**：
   - 全套 **189 项**测试（187 项模块单测/Fuzz/负例 + 2 项 `README.mbt.md` 文档测试）在 `wasm`、`wasm-gc`、`js` 与 `native` 四个后端均实测 **189 / 189 通过（0 失败）**，并已通过 [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md) 实测四端 69.28 MiB 流水线吞吐（稳态 `54.30–87.53 MiB/s`）。

4. **Python 差分验证交叉校验**：
   - 通过 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 在 `native` 探针下调用 Python 标准库（`hashlib`、`base64`、`zlib`、`gzip`、`json`）核对 SHA-1/SHA-256 Base32、双向 multi-member `.warc.gz`（含 `gzip compresslevel=9` 动态哈夫曼与 `FNAME`）压缩偏移及 RFC 8259 JSONL 解析，并核验 CLI `native`/`js` 输出一致。

---

## 3. 作者可解释性承诺 (Explainability Statement)

项目作者对仓库中每一份 `.mbt` 源码、`pkg.generated.mbti` 接口契约及测试断言均可独立解释其状态转换、错误处理分支、复杂度边界及对应的标准条款；所有构建与验证均可由第三方通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 一键复现。
