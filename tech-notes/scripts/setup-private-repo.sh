#!/usr/bin/env bash
# このフォルダを独立した Private リポジトリとして GitHub に作成し push する。
# 前提: gh CLI がインストール・認証済み（gh auth login）であること。
# 使い方: ./scripts/setup-private-repo.sh [リポジトリ名]
set -euo pipefail

REPO_NAME="${1:-tech-notes}"

if ! command -v gh >/dev/null 2>&1; then
  echo "エラー: gh CLI が見つかりません。https://cli.github.com/ からインストールしてください。" >&2
  exit 1
fi

if [ ! -d .git ]; then
  git init -b main
fi

git add .
git commit -m "Initialize tech-notes knowledge base" || echo "コミットする変更はありません（スキップ）。"

# Private リポジトリを作成し、現在のフォルダを source として push する
gh repo create "$REPO_NAME" --private --source=. --remote=origin --push

cat <<'EOS'

完了しました。仕上げに GitHub Pages を有効化してください:
  Settings > Pages > Source: GitHub Actions

注意: Private リポジトリで Pages を使うには GitHub Pro / Team / Enterprise が必要です。
無料プランの場合は Public にするか、ローカルで `mkdocs serve` を使ってください。
EOS
