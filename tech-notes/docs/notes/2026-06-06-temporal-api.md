---
tags:
  - JavaScript
  - 日時
---

# Temporal API 入門

!!! info "このノートについて"
    サンプルノートです。書き方の見本として残してあります。不要なら削除してください。

JavaScript の `Date` は使いにくいことで有名です。`Temporal` はそれを置き換えるために提案された新しい日時 API で、イミュータブルで型が明確、タイムゾーンの扱いも安全です。

## なぜ `Date` がつらいのか

- ミュータブル（`setMonth` などが元のオブジェクトを破壊する）
- 月が 0 始まり（`0` が 1 月）
- タイムゾーンは「ローカル」か「UTC」しか扱えない
- パースの挙動が実装依存になりがち

## Temporal の主な型

| 型 | 用途 |
| --- | --- |
| `Temporal.PlainDate` | 時刻を持たない日付（`2026-06-06`） |
| `Temporal.PlainTime` | 日付を持たない時刻（`13:00`） |
| `Temporal.PlainDateTime` | タイムゾーンなしの日時 |
| `Temporal.ZonedDateTime` | タイムゾーン付きの日時 |
| `Temporal.Duration` | 期間（差分） |

## 使い方の例

```javascript
// 今日の日付（イミュータブル）
const today = Temporal.Now.plainDateISO();        // 2026-06-06

// 計算しても元の値は変わらない
const nextWeek = today.add({ days: 7 });          // 2026-06-13
console.log(today.toString());                     // 2026-06-06 のまま

// 差分は Duration として得られる
const diff = nextWeek.since(today);                // P7D
console.log(diff.days);                            // 7

// タイムゾーン付きの「いま」
const nowTokyo = Temporal.Now.zonedDateTimeISO("Asia/Tokyo");
```

## ハマりどころ

!!! warning "比較は `==` ではなく専用メソッドで"
    Temporal オブジェクト同士は `===` で比較できません。等価判定は `a.equals(b)`、大小は `Temporal.PlainDate.compare(a, b)` を使います。

## 参考リンク

- [TC39 Proposal: Temporal](https://github.com/tc39/proposal-temporal)
- [MDN: Temporal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Temporal)
