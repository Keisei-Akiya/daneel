# 0002: コンテナではなく関数(Workers)で動かす

Status: Accepted (2026-11-23)

## 前提

[0001](0001-cloudflare-as-platform.md) で基盤を Cloudflare にした。
Cloudflare 上の選択肢は、関数(Workers)とコンテナ(Cloudflare Containers)の 2 つ。

## 決定

Daneel は Workers で動かす。
コンテナは使わない。

## 理由

1. 重い処理がない。
   今の要件は、LLM API の呼び出しと、会話の保存が中心。
   コンテナが必要になる処理(大量のメモリや CPU、Linux 環境やネイティブバイナリ、既存のコンテナイメージの利用)は、今は無い。
2. 個人開発なので、アイドル時のコストを抑えたい。
   関数はリクエストがなければ動かない。

## 根拠(公式ドキュメント、2026-11-23 確認)

- Workers の CPU 時間は、ネットワーク待ちを数えない。
  原文: 「Waiting on network requests (such as `fetch()` calls, KV reads, or database queries) does **not** count toward CPU time.」
- HTTP リクエストの壁時間は無制限で、ストリーミング中は有効なまま。
  LLM の応答を流す用途と合う。
- Containers の用途は、重い計算、フルのファイルシステムや Linux 環境、既存のコンテナイメージの 3 つ。
  今の Daneel はどれにも当たらない。
- Containers は Workers Paid(月 $5)が前提。
  料金表の Free 行は N/A。
