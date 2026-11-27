# AI 使用声明与可解释性说明 / AI Usage & Explainability Disclosure

为响应 MoonBit Hackathon 2026 官方规则中关于 **“AI 辅助开发需做到可解释、可审查、可独立验证”** 的要求，本文档透明披露 [`XinOrigin/moon-warc`](https://github.com/XinOrigin/moon-warc) 开发过程中的 AI 协助方式，以及人工审查与自动化验证机制。

---

## 1. AI 协助范围 (How AI Assisted)

本项目在设计与开发过程中使用了 AI 编码助手，主要辅助完成以下工作：
- **架构拆解与文档起草**：将 ISO 28500 WARC 规范拆分为职责正交的子包（`digest`、`surt`、`http_payload`、`header`、`codec`、`cdxj`、`validate`、`pipeline`、根门面 `moon_warc` 与 `cmd/main`），并起草 README、项目说明、架构文档（[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)）、设计问答（[`docs/FAQ.md`](docs/FAQ.md)）与变更日志。
- **样板代码与边界测试生成**：辅助编写结构化测试集，包括 RFC 3174 / FIPS 180-4 / RFC 4648 标准向量测试、多切片尺寸流式状态机测试（[`codec/fuzz_test.mbt`](codec/fuzz_test.mbt)）、畸形与篡改报文负例测试（[`validate/negative_test.mbt`](validate/negative_test.mbt)）、ISO 28500 §9 分片重组与过滤导出测试（[`pipeline/pipeline_test.mbt`](pipeline/pipeline_test.mbt)）以及根门面集成测试（[`moon_warc_test.mbt`](moon_warc_test.mbt)、[`moon_warc_hardening_test.mbt`](moon_warc_hardening_test.mbt)）。
- **差分验证脚本与交互构建**：辅助构建 [`scripts/verify_oracle.py`](scripts/verify_oracle.py)（在 `native` 下调用 Python `hashlib`、`base64`、`zlib.crc32`、`gzip` 动态哈夫曼及 `json` 做双向差分对拍），以及 [`scripts/run_benchmarks.py`](scripts/run_benchmarks.py) 与 [`scripts/build_web_demo.py`](scripts/build_web_demo.py)（将 MoonBit JS 后端产出接入 [`docs/index.html`](docs/index.html)）。

---

## 2. 审查方式、确定性工程门禁与 Harness 实际拦错记录 (Verification & Defects Caught)

本项目 `v0.1.0`–`v0.2.0` 初始版本于 2026-11-25 在高密度 AI 辅助开发下完成，后续 `v0.2.1`–`v0.4.0` 经过完整的**多轮交叉审计与缺陷清零**、`Int64` 位宽升级、多成员 `.warc.gz` 流式扩展、9-bit 哈夫曼快速查表优化、`moon coverage` 覆盖率加固及外部基线对拍：

1. **Harness 实际发现并阻止的真实缺陷（具体案例）**：
   - **`String::compare` shortlex 排序语义陷阱**：单测 `surt_test.mbt` 早期暴露 MoonBit `String::compare` 按“先长度后字典序”比较，导致查询串 `"k=v"` 排在 `"flag"` 之前、长 URL 无法正确接入 CDXJ 二分边界。发现后在 [`surt/surt.mbt`](surt/surt.mbt)、[`cdxj/cdxj.mbt`](cdxj/cdxj.mbt) 与 [`pipeline/filter.mbt`](pipeline/filter.mbt) 全部切换为显式 `String::lexical_compare`，并用 Python `sorted()` 在 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 逐条锁死。
   - **ISO 28500 §9 Origin 记录被 `auto_digest` 覆写摘要**：分片测试发现第 1 段 Origin 的 `payload` 仅含截断前缀，若按未分片 HTTP 响应重新计算 `WARC-Payload-Digest` 会覆盖整包逻辑摘要，导致 `reassemble_segments` 校验失败；随后在 [`codec/writer.mbt`](codec/writer.mbt) 对 `WARC-Segment-Number` 记录保留逻辑实体摘要，由全包重组后再验真。
   - **`Int32` 流偏移溢出与畸形流无界缓存**：审计定位原 `Int32` 无法表达 >2 GiB WARC 归档偏移且 `WarcReader` 缺头/体上限；重构升级为 `Int64` + `ReaderLimits`，并在 `gzip/` 全部长度加法中引入减法防溢出边界检查。
   - **`CdxjIndex` 同成员多记录排序不确定 & Gzip 动态表前向兼容**：固定同成员多记录次级排序键（`offset -> warc_type -> url -> digest`），并修复 CRLF 头注入、`\t` 控制字符转义及 `WarcGzReader` 截断前缀与真损坏区分（`NeedMoreInput` vs `Failed`）。

2. **编译器静态契约、文档测试、覆盖率与零告警门禁**：
   - 运行 `moon check --deny-warn` 确保全部 11 个包（`35` 份 `.mbt` 源码）零编译错误、零静态警告。
   - 运行 `moon fmt --check` 与 `moon info`，通过各包的 `pkg.generated.mbti` 追踪公共签名，并在 [`README.mbt.md`](README.mbt.md) 中提供由 `moon test` 直接编译运行的 **3 个 `` ```moonbit check `` 文档测试**。
   - 运行 `moon test --target native --enable-coverage && moon coverage analyze` 持续巡检未覆盖分支，核心 10 包未覆盖行数在 `v0.4.0` 新增流式 `WarcGzReader` / `scan_archive_gz` / 爬虫捕获接口的同时，仍由 `v0.3.1` 的 `267` 行进一步下降至 **`229` 行**。

3. **四目标矩阵一致性测试与外部基准测量**：
   - 全套 **194 项**测试（191 项模块单测/Fuzz/负例 + 3 项 `README.mbt.md` 文档测试）在 `wasm`、`wasm-gc`、`js` 与 `native` 四个后端均实测 **194 / 194 通过（0 失败）**，并按 [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md) 在 92.37 MiB 混合流水线上实测稳态吞吐：**`native 112.39 MiB/s`**（达同机 CPython `zlib`+`hashlib` C 扩展 `196.11 MiB/s` 的 **57.3%**）、**`js 63.68 MiB/s`**、**`wasm-gc 52.03 MiB/s`**、**`wasm 47.78 MiB/s`**。

4. **Python 差分验证交叉校验**：
   - 通过 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 在 `native` 探针下调用 Python 标准库（`hashlib`、`base64`、`zlib`、`gzip`、`json`）核对 SHA-1/SHA-256 Base32、双向 multi-member `.warc.gz`（含 `gzip -9` 动态哈夫曼与 `FNAME`）、流式 `scan_archive_gz`、7 字节分片 `WarcGzReader`、爬虫 HTTP 会话捕获及 RFC 8259 JSONL 解析，并核验 CLI `native`/`js` 输出逐字节一致。

---

## 3. 作者可解释性承诺 (Explainability Statement)

项目作者对仓库中每一份 `.mbt` 源码、`pkg.generated.mbti` 接口契约及测试断言均可独立解释其状态转换、错误处理分支、复杂度边界及对应的标准条款；所有构建与验证均可由第三方通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 一键复现。
