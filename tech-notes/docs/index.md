# 技術ノート

自分のための技術ナレッジベースです。気になったこと・調べたこと・ハマったことを Markdown で書き溜め、GitHub Actions で自動的に HTML サイト化しています。

## 使い方

- **読む**: 上のナビゲーションか、右上の検索（日本語対応）からノートを探します。
- **書く**: 新しいノートは `docs/notes/` に Markdown を追加します。手元では Claude Code に「〇〇についてノートにして」と頼むのが一番速い運用です（→ [運用ルール](https://github.com/) は `CLAUDE.md` を参照）。
- **タグで辿る**: 各ノートにタグを付けておくと [タグ](tags.md) ページから横断的に辿れます。

## 最近のノート

- 2026-06-06 — [Temporal API 入門](notes/2026-06-06-temporal-api.md)

新しいノートを追加したら、この一覧と `mkdocs.yml` の `nav` にも 1 行追記してください（Claude Code に任せる場合は自動でやってくれます）。

!!! tip "プレビュー"
    手元できれいな見た目を確認するには、リポジトリのルートで次を実行します。

    ```bash
    pip install -r requirements.txt
    mkdocs serve
    # http://127.0.0.1:8000 を開く
    ```
