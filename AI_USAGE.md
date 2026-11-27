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

本项目 `v0.1.0`–`v0.2.0` 初始版本于 2026-11-25 在高密度 AI 辅助开发下完成，后续 `v0.2.1`–`v0.5.0` 经过完整的**多轮交叉审计与缺陷清零**、`Int64` 位宽升级、多成员 `.warc.gz` 流式扩展、零分配 Dynamic Huffman (`BTYPE=2`) 与 `InflateScratch` 复用、WACZ 1.1.1 支持、`moon coverage` 覆盖率加固及腾讯云 CNB `16C32G` Linux / 本地 macOS 双平台压测：

1. **Harness 实际发现并阻止的真实缺陷（具体案例）**：
   - **`String::compare` shortlex 排序语义陷阱**：单测 `surt_test.mbt` 早期暴露 MoonBit `String::compare` 按“先长度后字典序”比较，导致查询串 `"k=v"` 排在 `"flag"` 之前、长 URL 无法正确接入 CDXJ 二分边界。发现后在 [`surt/surt.mbt`](surt/surt.mbt)、[`cdxj/cdxj.mbt`](cdxj/cdxj.mbt) 与 [`pipeline/filter.mbt`](pipeline/filter.mbt) 全部切换为显式 `String::lexical_compare`，并用 Python `sorted()` 在 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 逐条锁死。
   - **ISO 28500 §9 Origin 记录被 `auto_digest` 覆写摘要**：分片测试发现第 1 段 Origin 的 `payload` 仅含截断前缀，若按未分片 HTTP 响应重新计算 `WARC-Payload-Digest` 会覆盖整包逻辑摘要，导致 `reassemble_segments` 校验失败；随后在 [`codec/writer.mbt`](codec/writer.mbt) 对 `WARC-Segment-Number` 记录保留逻辑实体摘要，由全包重组后再验真。
   - **`Int32` 流偏移溢出与畸形流无界缓存**：审计定位原 `Int32` 无法表达 >2 GiB WARC 归档偏移且 `WarcReader` 缺头/体上限；重构升级为 `Int64` + `ReaderLimits`，并在 `gzip/` 全部长度加法中引入减法防溢出边界检查。
   - **`v0.5.0` Dynamic Huffman 初版堆分配退化**：初版 Package-Merge 在每条 ~670 B WARC 成员上频繁拷贝嵌套 `Array[Int32]` 与 `32768` 哈希表，引发 `native` 降至 `16.49 MiB/s` 与 `wasm-gc` 超时；基准门禁捕获后彻底重写为 [`gzip/deflate.mbt`](gzip/deflate.mbt) 零分配 `DeflateScratch`（自适应哈希、`len_packed_lut`/`dist_lo_lut`/`dist_hi_lut`、Van Leeuwen 双队列 + Kraft 限长）与 [`gzip/inflate.mbt`](gzip/inflate.mbt) `InflateScratch` 跨成员复用，在压缩率降至 `118,906 B` (`73.7%`) 的同时恢复 `native 76.26 MiB/s` / `wasm-gc 68.42 MiB/s`。
   - **CNB 云端 `moonc v1.0.0-rc1` `--deny-warn` 捕获接口弃用告警**：本地 `moonc v0.10.22` 未提示的 `@buffer.Buffer::write_bytes` 在腾讯云 CNB `moonc v1.0.0-rc1` 下触发严格 `--deny-warn` 阻断；立即将全库 14 处调用迁移至 `write_bytesview(...[:])`，实现新旧编译器双端零告警通过。
   - **`examples/crawler_to_rag` HTTP Chunked 字节长度误算**：差分预言机早期校验指出内联 chunked 示例响应正文长度为 38 字节（`0x26`）而非 `0x24`，立即修正为 `"26\r\n"` 并验证去分块后 SHA-256 与 Python 一致。
   - **发布前对抗安全审计发现的 6 项边界缺陷（`v0.5.0` 压线清零）**：在最终封板前通过人工对抗审计捕获并修复了 `decode_chunked` 处理 `7fffffff\r\n\r\n` 时的 `Int32` 加法溢出 panic、`WarcGzReader` 未闭合压缩成员缺省限流及成员完成后未缩容、`export_jsonl` 误将 `revisit`/`continuation` 协议头导出为正文 `"text"`、`build_wacz_manifests` 未剥离 `warc_filename` 目录穿越前缀、`deflate_raw` 比特成本统计的 `Int32` 位宽上限，以及 `validate_archive` 中 `<...>` ID 包裹缺少内嵌空白/嵌套括号检查，并补齐 4 组专项负例单测。

2. **编译器静态契约、文档测试、覆盖率与零告警门禁**：
   - 运行 `moon check --deny-warn --target all` 确保全部 12 个包（`38` 份 `.mbt` 源码）在 `moonc v0.10.22` 与 `v1.0.0-rc1` 下均零编译错误、零静态警告。
   - 运行 `moon fmt --check` 与 `moon info`，通过各包的 `pkg.generated.mbti` 追踪公共签名，并在 [`README.mbt.md`](README.mbt.md) 中提供由 `moon test` 直接编译运行的 **3 个 `` ```moonbit check `` 文档测试**（覆盖 WACZ 1.1.1）。
   - 运行 `moon test --target native --enable-coverage && moon coverage analyze` 持续巡检未覆盖分支，全仓库 `Total: 295 uncovered line(s) in 20 file(s)`（含 68 行仅由 `moon run` 触发的 CLI / 示例入口），10 个核心库包未覆盖行数由 `v0.4.0` 的 `229` 行进一步下降至 **`227` 行**。

3. **四目标矩阵一致性测试、`moon bench` 与跨平台外部基准测量**：
   - 全套 **200 项**测试（197 项模块单测/Fuzz/负例 + 3 项 `README.mbt.md` 文档测试）+ **5 项** [`moon_warc_bench_test.mbt`](moon_warc_bench_test.mbt) 原生 `@bench.T` 基准在 `wasm`、`wasm-gc`, `js` 与 `native` 四个后端及 CNB `16C32G` Linux `x86_64` 均实测全部通过（0 失败）。按 [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md) 92.37 MiB 流水线实测压缩体积 `118,906 B` (`73.7%`，仅距 C `gzip -6` `118,547 B` 差 `359 B`)，稳态吞吐 **`native 76.26 MiB/s`**、**`wasm-gc 68.42 MiB/s`**、**`js 43.76 MiB/s`**、**`wasm 31.74 MiB/s`**（对比 CPython `zlib`+`hashlib` C 扩展 `184.19 MiB/s`）。

4. **Python 差分验证交叉校验**：
   - 通过 [`scripts/verify_oracle.py`](scripts/verify_oracle.py) 在 `native` 探针下调用 Python 标准库（`hashlib`、`base64`、`zlib`、`gzip`、`json`）核对 SHA-1/SHA-256 Base32、双向 multi-member Dynamic Huffman `.warc.gz`（含 `gzip -9` 与 `FNAME`）、流式 `scan_archive_gz`、7 字节分片 `WarcGzReader`、爬虫 HTTP 会话捕获、WACZ 1.1.1 清单与 RFC 8259 JSONL 解析，并核验 CLI 与 `examples/crawler_to_rag` 在 `native`/`js` 下的输出逐字节一致。

---

## 3. 作者可解释性承诺 (Explainability Statement)

项目作者对仓库中每一份 `.mbt` 源码、`pkg.generated.mbti` 接口契约及测试断言均可独立解释其状态转换、错误处理分支、复杂度边界及对应的标准条款；所有构建与验证均可由第三方通过 [`scripts/verify_all.sh`](scripts/verify_all.sh) 一键复现。
