#!/usr/bin/env bash
set -euo pipefail

export PATH="/Users/xinorigin/.moon/bin:$PATH"

echo "=== Toolchain ==="
moon version --all

echo "=== Format Check ==="
moon fmt --check

echo "=== Interface Freshness (moon info) ==="
moon info
git diff --exit-code -- '*.mbti'
if [ -n "$(git ls-files --others --exclude-standard -- '*.mbti')" ]; then
  echo "ERROR: untracked .mbti files found; commit regenerated interfaces first."
  exit 1
fi

echo "=== Strict Check (--deny-warn --target all) ==="
moon check --deny-warn --target all

echo "=== Strict Tests (--deny-warn --target all: wasm, wasm-gc, js, native) ==="
moon test --deny-warn --target all

if [ -f cmd/main/main.mbt ]; then
  echo "=== CLI Demo (native & js) ==="
  moon run cmd/main --target native
  moon run cmd/main --target js
fi

if [ -f examples/crawler_to_rag/main.mbt ]; then
  echo "=== Example: crawler_to_rag (native & js) ==="
  moon run examples/crawler_to_rag --target native
  moon run examples/crawler_to_rag --target js
fi

if [ -f scripts/verify_oracle.py ]; then
  echo "=== Differential Oracle (Python) ==="
  python3 scripts/verify_oracle.py
fi

echo "=== Package Archive Hygiene (moon package --list) ==="
moon package --list >pkg-list.txt 2>&1
cat pkg-list.txt
if grep -E '^(scripts/|web_demo/|_build/|target/|\.github/|docs/|PROJECT_PROPOSAL\.md|AI_USAGE\.md|SUBMISSION_CHECKLIST\.md)' pkg-list.txt; then
  echo "ERROR: non-package files leaked into moon package"
  exit 1
fi
rm -f pkg-list.txt

echo "=== ALL VERIFICATION GATES PASSED ==="
