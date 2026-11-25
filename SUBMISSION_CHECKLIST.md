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
  预期实测结果：
  - `moon fmt --check`：0 差异通过
  - `moon info`：`.mbti` 接口文件 0 未提交差异
  - `moon check --deny-warn`：0 错误、0 警告
  - `moon test`（`wasm` / `wasm-gc` / `js` / `native`）：**Total tests: 116, passed: 116, failed: 0**
  - `moon run cmd/main --target native` & `js`：双端输出完全一致（6 记录 3188B WARC/1.1、`valid=true records=6 errors=0 warnings=0`、3 条排序 CDXJ、1 条 `ByRecordId` revisit、`Round-trip byte equality: true (3188 == 3188 bytes)`）
  - `python3 scripts/verify_oracle.py`：退出码 0，输出 `PYTHON ORACLE PASSED: CLI (native+js), SHA-1/SHA-256 Base32 digests, chunked HTTP, SURT/CDXJ, revisit resolution, folded headers, binary payloads, byte-for-byte roundtrip, and 6 tampered/negative archives verified.`
  - `moon package --list`：仅包含包源码与配置（未泄漏 `scripts/`、`docs/`、`PROJECT_PROPOSAL.md`、`AI_USAGE.md`、`SUBMISSION_CHECKLIST.md`）

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
  - **项目说明 / 简介**：直接打开并复制 [`PROJECT_PROPOSAL.md`](PROJECT_PROPOSAL.md) 中的内容粘贴填入
  - **个人真实联系与领奖信息**（姓名、邮箱、手机号、收款账号等）：请由本人按表单提示现场真实填写（本仓库刻意不存储任何个人隐私信息）

---

## 4. 可选：在 GitHub 启用 CI（GitHub Actions）

- 仓库已在 [`docs/ci.yml.example`](docs/ci.yml.example) 附带完整的多目标 CI 工作流模板（内容与本地 [`scripts/verify_all.sh`](scripts/verify_all.sh) 对齐）。
- **为何未直接放在 `.github/workflows/ci.yml`**：本地 `gh` CLI 授权令牌仅包含 `repo` 权限而无 `workflow` 权限，因此无法直接由本地推送工作流文件。
- **可选操作**：如需在 GitHub Actions 页面显示绿色 CI 徽章，可在 GitHub 网页端通过 `Add file → Create new file` 新建 `.github/workflows/ci.yml`，粘贴 [`docs/ci.yml.example`](docs/ci.yml.example) 内容提交即可。
