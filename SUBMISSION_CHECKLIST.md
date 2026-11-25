# MoonBit Hackathon 2026 提交核对清单 (2 分钟人工完成)

本清单用于参赛者 `XinOrigin` 在提交前完成最终确认与官方报名登记。

---

## 1. 仓库与本地门禁最后确认（~30 秒）

- [ ] 确认开源仓库公开可访问：`https://github.com/XinOrigin/moon-warc`（License：`Apache-2.0`）
- [ ] 在仓库根目录执行一次全量验证并确认全部通过：
  ```bash
  export PATH="$HOME/.moon/bin:$PATH"
  ./scripts/verify_all.sh
  ```
  预期实测结果（`v0.2.0`）：
  - `moon fmt --check`：0 差异通过
  - `moon info`：`.mbti` 接口文件 0 未提交差异
  - `moon check --deny-warn`：0 错误、0 警告
  - `moon test`（`wasm` / `wasm-gc` / `js` / `native`）：**Total tests: 163, passed: 163, failed: 0**
  - `moon run cmd/main --target native` & `js`：双端输出完全一致（`moon-warc v0.2.0`、6 记录 3188B WARC/1.1、`valid=true records=6 errors=0 warnings=0`、3 条排序 CDXJ、1 条 `ByRecordId` revisit、`Round-trip byte equality: true (3188 == 3188 bytes)`、§9 3 段重组 `payload_exact=true`、2xx 子集 2 记录 1126B `valid=true`、CDX-11 4 行、JSONL 6 行）
  - `python3 scripts/verify_oracle.py`：退出码 0，输出 `PYTHON ORACLE PASSED: CLI (native+js), SHA-1/SHA-256 Base32 digests, chunked HTTP, SURT/CDXJ, revisit resolution, folded headers, binary payloads, byte-for-byte roundtrip, 6 negative archives, and v0.2.0 segmentation/subset/CDX-11/JSONL verified.`
  - `moon package --list`：仅包含 52 个包源码与配置（未泄漏 `scripts/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md`、`SUBMISSION_CHECKLIST.md`）

---

## 2. 加入官方群并修改群昵称（~30 秒）

- [ ] 打开官方赛事主页与章程确认最新通知：
  - 官方主页：`https://moonbitlang.github.io/Hackathon2026/`
  - 官方飞书章程：`https://bxup9uklfcb.feishu.cn/wiki/Dx4Bwd6D1i3GfHkajQCcF7SznEd`
- [ ] 加入官方企业微信参赛群：`https://work.weixin.qq.com/gm/5b6b92c8677d0555f3fb6a3f1a081399`
- [ ] **【强制要求】进入企微群后，立即将群昵称修改为你的 GitHub ID：`XinOrigin`**
- [ ] （如有赛事问题需要联系小助手）官方小助手微信：`https://u.wechat.com/EA2rUlkjobqjS4EeOCKuKdY`

---

## 3. 填写官方飞书报名表单（~1 分钟）

- [ ] 打开官方飞书报名表单：`https://bxup9uklfcb.feishu.cn/share/base/form/shrcnWUMlgpbwHaXgzV7HmNhNhg`
- [ ] 按表单字段如实填写：
  - **GitHub ID**：`XinOrigin`
  - **项目仓库地址**：`https://github.com/XinOrigin/moon-warc`
  - **发布版本**：`v0.2.0`
  - **项目标签**：`ISO 28500`、`WARC`、`CDXJ`、`CDX-11`、`SURT`、`Sans-IO`、`Zero-Dependency`、`JSONL`
  - **项目说明 / 简介**：根据飞书表单输入框要求，直接复制下方【第 4 节：飞书报名表一键复制文案包】中的 50 字 / 200 字 / 500 字版本（或直接复制 [`PROJECT_PROPOSAL.md`](PROJECT_PROPOSAL.md) 整页说明）
  - **个人真实联系与领奖信息**（姓名、邮箱、手机号、收款账号等）：请由本人按表单提示现场真实填写（本仓库刻意不存储任何个人隐私信息）

---

## 4. 飞书报名表一键复制文案包 (Feishu Registration Copy Kit)

### 4.1 一句话简介（~50 字）

```text
moon-warc 是零依赖纯 MoonBit 实现的 ISO 28500 WARC 1.0/1.1 流式编解码、分片重组、SURT/CDXJ/CDX-11 索引与 JSONL/合规验证库，四端 163 项测试全通。
```

### 4.2 标准项目摘要（~200 字）

```text
moon-warc（xinorigin/moon_warc v0.2.0，Apache-2.0）为零依赖纯 MoonBit 的 ISO 28500 WARC 1.0/1.1 协议与语料管线基础设施（仅依赖 moonbitlang/core，兼容 wasm/wasm-gc/js/native）。内置 Sans-IO 流式状态机、RFC 9112 分块 HTTP 解码、FIPS 180-4 SHA-1/256、SURT/CDXJ/CDX-11 索引、22 项诊断码合规审计、§9 大文件分片重组、子集筛选及 LLM JSONL 导出。全套 163 项测试在四编译目标全通，并通过独立 Python 差分预言机字节级交叉验证。
```

### 4.3 完整技术亮点说明（~500 字）

```text
【项目定位】moon-warc 是 MoonBit 生态首个 ISO 28500 (WARC 1.0/1.1) 纯语言协议栈与语料管线库（Apache-2.0，v0.2.0）。WARC 是 Internet Archive、Common Crawl 与大模型网页语料库的标准载体；针对现有生态依赖 Python/Java/C++ 难以嵌入浏览器 WASM 或轻量边缘节点的问题，本项目完全基于 moonbitlang/core 实现，共 10 个包、30 个 .mbt 文件（8,192 行源码），一次编写无缝运行于 wasm、wasm-gc、js 与 native 四大目标。

【核心能力】
1. Sans-IO 流式解码与精确偏移（codec/header）：显式状态机支持任意 1B+ 碎片喂入与 4KB 缓冲压缩，输出字节级精确 offset 与 record_length，覆盖全 8 类标准记录类型及折叠头部。
2. 密码学摘要与 HTTP 解块闭环（digest/http_payload）：纯 MoonBit 实现增量 SHA-1/SHA-256 与 Base32/Hex，穿透 Transfer-Encoding: chunked 对真实 HTTP 实体体校验 WARC-Payload-Digest。
3. 检索、合规审计与 §9 管线（surt/cdxj/validate/pipeline）：基于 String::lexical_compare 实现 SURT 与 CDXJ 二分检索；支持 22 个诊断码与 revisit 双策略溯源；v0.2.0 新增 ISO 28500 §9 分片重组、多条件子集抽出（extract_subset）、11 列 CDX 与大模型清洗用 RFC 8259 JSONL 文本导出。

【确定性验证】全库 163 项单元/Fuzz/负例/管线测试在四大后端 163/163 通过，native 与 js CLI 输出完全一致，并配有独立 Python 标准库差分预言机（scripts/verify_oracle.py）交叉核验。
```

---

## 5. 可选：在 GitHub 启用 CI（GitHub Actions）

- 仓库已在 [`docs/ci.yml.example`](docs/ci.yml.example) 附带完整的多目标 CI 工作流模板（内容与本地 [`scripts/verify_all.sh`](scripts/verify_all.sh) 对齐）。
- **为何未直接放在 `.github/workflows/ci.yml`**：本地 `gh` CLI 授权令牌仅包含 `repo` 权限而无 `workflow` 权限，因此无法直接由本地推送工作流文件。
- **可选操作**：如需在 GitHub Actions 页面显示绿色 CI 徽章，可在 GitHub 网页端通过 `Add file → Create new file` 新建 `.github/workflows/ci.yml`，粘贴 [`docs/ci.yml.example`](docs/ci.yml.example) 内容提交即可。
