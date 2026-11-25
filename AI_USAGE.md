# AI 使用声明与可解释性说明 / AI Usage & Explainability Disclosure

为响应 MoonBit Hackathon 2026 官方规则中关于 **“AI 辅助开发需做到可解释、可审查、可独立验证”** 的要求，本文档透明披露 [`XinOrigin/moon-warc`](https://github.com/XinOrigin/moon-warc) 开发过程中的 AI 协助方式，以及人工审查与自动化验证机制。

---

## 1. AI 协助范围 (How AI Assisted)

本项目在设计与开发过程中使用了 AI 编码助手，主要辅助完成以下工作：
- **架构拆解与文档起草**：将 ISO 28500 WARC 规范拆分为职责正交的子包（`digest`、`surt`、`http_payload`、`header`、`codec`、`cdxj`、`validate`、根门面 `moon_warc` 与 `cmd/main`），并起草 README、项目说明、变更日志与提交核对清单。
- **样板代码与边界测试生成**：辅助编写结构化测试集，包括 RFC 3174 / FIPS 180-4 / RFC 4648 标准向量测试、多切片尺寸流式状态机测试（[`codec/fuzz_test.mbt`](codec/fuzz_test.mbt)）、畸形与篡改报文负例测试（[`validate/negative_test.mbt`](validate/negative_test.mbt)）以及根门面加固集成测试（[`moon_warc_hardening_test.mbt`](moon_warc_hardening_test.mbt)）。
- **差分预言机脚本编写**：辅助构建 [`scripts/verify_oracle.py`](scripts/verify_oracle.py)，利用 Python 标准库作为独立参考实现交叉核对 MoonBit 端产出。

---

## 2. 人工审查与确定性工程门禁 (Human Review & Deterministic Verification)

所有代码合入主分支前均经过人工逐行审阅及严格的自动化门禁验证，确保没有任何“黑盒代码”或“AI 自证循环”：

1. **规范对照与算法逐行审查**：
   - 对照 **ISO 28500:2017**、**RFC 9112**、**RFC 4648** 与 **FIPS 180-4** 逐条核对协议细节：如折叠头部（folded headers）空白拼接规则、RFC 9112 分块扩展（`;ext=val`）与结尾空行 CRLF、Base32 尾位零比特严格校验等。
   - 审查并锁定了 MoonBit 语言特有的语义细节：例如 `String::compare` 采用 shortlex（长度优先）而非字典序，因此在 [`surt/surt.mbt`](surt/surt.mbt) 查询参数排序与 [`cdxj/cdxj.mbt`](cdxj/cdxj.mbt) 二分查找中显式使用 `String::lexical_compare` 保证标准词法有序性；HTTP 与 WARC 负载坚持以 `Bytes` / `BytesView` 二进制安全切片，避免 UTF-8 转换破坏原始字节与摘要。

2. **编译器静态契约与零告警门禁**：
   - 运行 `moon check --deny-warn` 确保全部包零编译错误、零静态警告。
   - 运行 `moon fmt --check` 与 `moon info`，通过各包的 `pkg.generated.mbti` 接口文件审查所有公开类型与函数签名，防止内部实现细节意外泄漏到公共 API。

3. **四目标矩阵一致性测试**：
   - 全套 116 个测试用例（覆盖基础单元测试、22 个流式 Fuzz 用例、24 个负例校验用例与 26 个端到端加固用例）在 `wasm`、`wasm-gc`、`js` 与 `native` 四个后端均实测 **116 / 116 通过（0 失败）**，验证位运算（SHA-1/SHA-256）、字节切片与字符串处理在不同运行时下行为完全一致。

4. **独立 Python 差分预言机交叉校验**：
   - 通过 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 调用 Python 标准库（`hashlib`、`base64`、`json`）作为独立第三方参照系（Oracle），对 SHA-1/SHA-256 Base32 摘要、HTTP chunked 解码、SURT/CDXJ 生成、折叠头部、二进制负载、`revisit` 解析、字节往返以及 6 组负例篡改归档进行端到端比对，确保输出与外部成熟生态标准一致。

---

## 3. 作者可解释性承诺 (Explainability Statement)

项目作者对仓库中每一份 `.mbt` 源码、`pkg.generated.mbti` 接口契约及测试断言均可独立解释其状态转换、错误处理分支、复杂度边界及对应的标准条款；所有构建与验证均可由第三方通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 一键复现。
