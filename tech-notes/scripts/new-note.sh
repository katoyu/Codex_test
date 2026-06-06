#!/usr/bin/env bash
# 新しいノートの雛形を作成する。
# 使い方: ./scripts/new-note.sh "ノートのタイトル" [slug]
set -euo pipefail

TITLE="${1:-}"
if [ -z "$TITLE" ]; then
  echo "使い方: $0 \"ノートのタイトル\" [slug]" >&2
  exit 1
fi

DATE="$(date +%Y-%m-%d)"
SLUG="${2:-$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')}"
if [ -z "$SLUG" ]; then
  SLUG="note"
fi
FILE="docs/notes/${DATE}-${SLUG}.md"

if [ -e "$FILE" ]; then
  echo "エラー: すでに存在します: $FILE" >&2
  exit 1
fi

cat > "$FILE" <<EOS
---
tags:
  - TODO
---

# ${TITLE}

## 概要

## 詳細

## ハマりどころ

## 参考リンク
EOS

echo "作成しました: $FILE"
echo "次を忘れずに:"
echo "  - mkdocs.yml の nav に追記"
echo "  - docs/notes/index.md の表に追記"
echo "  - docs/index.md の『最近のノート』に追記"
