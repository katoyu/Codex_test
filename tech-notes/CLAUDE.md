# 技術ノート運用ルール（Claude Code 用）

このリポジトリは「自分のための技術ナレッジベース」です。Markdown で書いたノートを
MkDocs Material で HTML 化し、GitHub Pages に公開します。Claude Code はこのファイルの
ルールに従ってノートの追加・更新を行ってください。

## このリポジトリの構成

```
.
├── docs/
│   ├── index.md                 # トップページ（最近のノート一覧つき）
│   ├── notes/
│   │   ├── index.md             # ノート一覧（表）
│   │   └── YYYY-MM-DD-slug.md   # 1 ノート = 1 ファイル
│   ├── stylesheets/extra.css    # 軽い見た目の調整
│   └── tags.md                  # タグ索引（自動生成）
├── mkdocs.yml                   # サイト設定とナビゲーション
├── requirements.txt             # ビルド依存
└── .github/workflows/deploy.yml # Pages への自動デプロイ
```

## ノートを追加するときの手順

ユーザーから「〇〇についてノートにして」と頼まれたら、次を **すべて** 行う。

1. **ファイル作成**: `docs/notes/YYYY-MM-DD-slug.md` を作る。
   - 日付は今日の日付（`YYYY-MM-DD`）。`slug` は内容を表す半角英数とハイフン。
   - 冒頭に front matter でタグを付ける（最低 1 つ）。日本語タグ可。

     ```markdown
     ---
     tags:
       - JavaScript
       - 日時
     ---

     # タイトル
     ```

2. **本文を書く**: 見出し（`##`）で構造化し、必要に応じて
   コードブロック、表、`!!! note` / `!!! warning` などの admonition、
   参考リンクを付ける。結論や「ハマりどころ」を必ず残すと後で役に立つ。

3. **3 か所のリンクを更新**（これを忘れると一覧やナビに出ない）:
   - `mkdocs.yml` の `nav:` 内「ノート」セクションに `- タイトル: notes/ファイル名.md` を追記。
   - `docs/notes/index.md` の表に新しい行を **一番上** に追記。
   - `docs/index.md` の「最近のノート」に 1 行追記（5 件程度を保ち、古いものは削る）。

4. **ビルド確認**（可能なら）: `pip install -r requirements.txt && mkdocs build` が
   警告なく通ることを確認する。リンク切れがないかチェックする。

5. **コミット**: 1 ノート 1 コミット。メッセージは日本語で簡潔に。
   - 例: `Add note: Temporal API 入門`

## 書き方の指針

- 1 ノートは 1 トピックに絞る。長くなりそうなら分割する。
- 出典・参考リンクは必ず残す。あいまいな記憶で断定しない。
- コードは動く最小例にする。言語名を付けてシンタックスハイライトを効かせる。
- タグは「言語/技術名」＋「カテゴリ」で 2〜3 個が目安（例: `JavaScript`, `日時`）。
- 個人用なので完璧主義にならない。雑なメモでも残すことを優先する。

## やってはいけないこと

- `site/`（ビルド成果物）をコミットしない（`.gitignore` 済み）。
- 既存ノートを理由なく削除・改変しない。内容を直すときは差分を最小に。
- `mkdocs.yml` のテーマ/プラグイン設定を、依頼なく大きく変えない。

## プレビュー・公開

- ローカルプレビュー: `mkdocs serve` → http://127.0.0.1:8000
- 公開: `main` に push すると `.github/workflows/deploy.yml` が走り、
  GitHub Pages（Settings > Pages > Source: GitHub Actions）に自動デプロイされる。
