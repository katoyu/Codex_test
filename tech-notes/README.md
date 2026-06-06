# 技術ノート

自分のための技術ナレッジベース。Markdown で書いたノートを
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/) で HTML 化し、
GitHub Actions で GitHub Pages に自動デプロイします。

[Zenn の記事「移動中でも就寝前でも、Codexと育てる『技術ノート』」](https://zenn.dev/ttaniguchi/articles/instant-question-html-notes)
の発想を、**Claude Code + Markdown 自動 HTML 化** で実現する構成です。

## 特徴

- ✍️ 執筆は **Markdown** だけ（軽快・スマホでも書きやすい）
- 🤖 **Claude Code** に「〇〇についてノートにして」と頼めば、ノート作成からナビ更新まで自動（運用ルールは [`CLAUDE.md`](CLAUDE.md)）
- 🔍 **日本語全文検索**・タグ・ダークモード対応のきれいなサイト
- 🚀 `main` に push すると **GitHub Pages に自動デプロイ**
- 🧱 資産は Markdown なので将来どこへでも持ち出せる

## セットアップ（このフォルダを独立した Private リポジトリにする）

このフォルダは現在 `codex_test` リポジトリ内の雛形です。次の手順で **独立した
Private リポジトリ** に切り出してください。

### 方法 A: スクリプトで一発（`gh` CLI が必要）

```bash
# このフォルダを任意の場所にコピーしてから実行
cp -r tech-notes ~/tech-notes && cd ~/tech-notes
./scripts/setup-private-repo.sh tech-notes   # 引数はリポジトリ名（省略可）
```

スクリプトは `git init` → コミット → `gh repo create --private` → push まで行います。

### 方法 B: 手動

```bash
cp -r tech-notes ~/tech-notes && cd ~/tech-notes
git init -b main
git add .
git commit -m "Initialize tech-notes knowledge base"
# GitHub の Web 画面で空の Private リポジトリ "tech-notes" を作成しておく
git remote add origin git@github.com:<ユーザー名>/tech-notes.git
git push -u origin main
```

### 公開を有効にする

1. リポジトリの **Settings > Pages** を開く。
2. **Source** を **GitHub Actions** に設定。
3. 以降 `main` への push で自動的にビルド＆公開されます。

> [!IMPORTANT]
> **Private リポジトリで GitHub Pages を使うには GitHub Pro / Team / Enterprise が必要です。**
> 無料プランの場合は (1) リポジトリを Public にする、または (2) 公開せず手元の
> `mkdocs serve` で閲覧する、のどちらかになります。
> なお Pro でも、公開した **サイト URL 自体は誰でもアクセス可能**（URL を知っていれば閲覧可）です。
> 閲覧者を限定できるのは Enterprise の Pages アクセス制御のみです。

## ローカルでプレビュー

```bash
pip install -r requirements.txt
mkdocs serve
# http://127.0.0.1:8000 を開く
```

## ノートを書く

- **Claude Code に頼む（推奨）**: 「Temporal API についてノートにして」のように頼むと、
  [`CLAUDE.md`](CLAUDE.md) のルールに従ってファイル作成・ナビ更新・コミットまで行います。
- **自分で書く**: `./scripts/new-note.sh "タイトル"` で雛形を作成し、`docs/notes/` を編集。
  追加後は `mkdocs.yml` の `nav` と `docs/notes/index.md`、`docs/index.md` を更新します。

## ライセンス / 公開範囲

個人用ナレッジベースを想定しています。Private リポジトリ運用を推奨します。
