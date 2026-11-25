# AI 使用声明与可解释性说明 / AI Usage & Explainability Disclosure

为响应 MoonBit Hackathon 2026 官方规则中关于 **“AI 辅助开发需做到可解释、可审查、可独立验证”** 的要求，本文档透明披露 [`XinOrigin/moon-warc`](https://github.com/XinOrigin/moon-warc) 开发过程中的 AI 协助方式，以及人工审查与自动化验证机制。

---

## 1. AI 协助范围 (How AI Assisted)

本项目在设计与开发过程中使用了 AI 编码助手，主要辅助完成以下工作：
- **架构拆解与文档起草**：将 ISO 28500 WARC 规范拆分为职责正交的子包（`digest`、`surt`、`http_payload`、`header`、`codec`、`cdxj`、`validate`、`pipeline`、根门面 `moon_warc` 与 `cmd/main`），并起草 README、项目说明、架构文档（[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)）、设计问答（[`docs/FAQ.md`](docs/FAQ.md)）与变更日志。
- **样板代码与边界测试生成**：辅助编写结构化测试集，包括 RFC 3174 / FIPS 180-4 / RFC 4648 标准向量测试、多切片尺寸流式状态机测试（[`codec/fuzz_test.mbt`](codec/fuzz_test.mbt)）、畸形与篡改报文负例测试（[`validate/negative_test.mbt`](validate/negative_test.mbt)）、ISO 28500 §9 分片重组与过滤导出测试（[`pipeline/pipeline_test.mbt`](pipeline/pipeline_test.mbt)）以及根门面集成测试（[`moon_warc_test.mbt`](moon_warc_test.mbt)、[`moon_warc_hardening_test.mbt`](moon_warc_hardening_test.mbt)）。
- **差分验证脚本编写**：辅助构建 [`scripts/verify_oracle.py`](scripts/verify_oracle.py)，在 `native` 下调用 Python 标准库（`hashlib`、`base64`、`json`）核对 SHA-1/SHA-256 Base32 摘要与 RFC 8259 JSONL 解析，并搭配 Python 参考函数交叉核对 HTTP chunked 解码、SURT/CDXJ 与 `v0.2.0` 分片/子集/CDX-11 输出。

---

## 2. 审查方式与确定性工程门禁 (Verification & Quality Gates)

本项目 `v0.1.0`–`v0.2.0` 初始版本于 2026-11-25 在高密度 AI 辅助开发下完成并快速合入，通过自动化测试矩阵、接口契约检查与 Python 标准库对照把关；后续迭代（`v0.2.1+`）按独立 PR 持续推进人工核查、边界修复与外部语料实测：

1. **规范对照与核心语义核查**：
   - 对照 **ISO 28500:2017**、**RFC 9112**、**RFC 4648** 与 **FIPS 180-4** 核对协议细节：如折叠头部（folded headers）空白拼接规则、RFC 9112 分块扩展（`;ext=val`）与多行 `Transfer-Encoding`、Base32 尾位零比特严格校验等。
   - 核查并锁定 MoonBit 语言特有的语义细节：例如 `String::compare` 采用 shortlex（长度优先）而非字典序，因此在 [`surt/surt.mbt`](surt/surt.mbt)、[`cdxj/cdxj.mbt`](cdxj/cdxj.mbt) 与 [`pipeline/filter.mbt`](pipeline/filter.mbt) 中显式使用 `String::lexical_compare`；在 [`codec/writer.mbt`](codec/writer.mbt) 对分段起源记录保留逻辑 `WARC-Payload-Digest`；在 [`pipeline/export.mbt`](pipeline/export.mbt) 中使用 `@utf8.decode` 并显式按 Unicode 标量字符数截断与按 RFC 8259 转义控制字符，遇到二进制或非 UTF-8 实体体安全跳过 `"text"`。

2. **编译器静态契约与零告警门禁**：
   - 运行 `moon check --deny-warn` 确保全部包零编译错误、零静态警告。
   - 运行 `moon fmt --check` 与 `moon info`，通过各包的 `pkg.generated.mbti` 接口文件追踪公共签名；`v0.2.1` 收紧了 `WarcReader`、`Sha1Hasher`、`Sha256Hasher` 与 `CdxjIndex` 的内部字段可见性，防止外部绕过状态机或破坏排序不变式。

3. **四目标矩阵一致性测试**：
   - 全套 **173 个**测试用例（`pipeline` 42 + 根模块 33 + `validate` 31 + `codec` 30 + `http_payload` 9 + `digest` 8 + `cdxj` 7 + `surt` 7 + `header` 6）在 `wasm`、`wasm-gc`、`js` 与 `native` 四个后端均实测 **173 / 173 通过（0 失败）**，验证位运算（SHA-1/SHA-256）、字节切片与字符串处理在不同运行时下行为完全一致。

4. **Python 差分验证交叉校验**：
   - 通过 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 在 `native` 探针下调用 Python 标准库（`hashlib`、`base64`、`json`）核对 SHA-1/SHA-256 Base32 摘要与逐行 `json.loads()` JSONL 验证，并结合 Python 参考函数对 HTTP chunked 解码、SURT/CDXJ 生成、折叠头部、二进制负载、`revisit` 解析、字节往返、6 组负例篡改归档及 `v0.2.0` 的 §9 分片重组、2xx 子集抽出、11 列 CDX 与 `native`/`js` CLI 输出一致性进行核验（目前暂未与外部 `warcio` 或真实 Common Crawl 多 GB `.warc.gz` 语料做直接对拍）。

---

## 3. 作者可解释性承诺 (Explainability Statement)

项目作者对仓库中每一份 `.mbt` 源码、`pkg.generated.mbti` 接口契约及测试断言均可独立解释其状态转换、错误处理分支、复杂度边界及对应的标准条款；所有构建与验证均可由第三方通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 一键复现。
