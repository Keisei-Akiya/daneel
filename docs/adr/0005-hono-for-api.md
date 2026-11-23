# 0005: API を Hono で書く

Status: Accepted (2026-11-23)

## 決定

API は Hono で書く。

## 理由

### 1. Start の変更からの切り離し

根拠:
Start は Vinxi から Vite への移行(v1.121.0)で、破壊的変更が入った。
「these issues were caused by breaking changes introduced in Start's recent migration from Vinxi to Vite, specifically in the v1.121.0 release」(LogRocket)
Start も Hono も、標準の Request / Response を使う。
そのため、`/api/*` に来たリクエストを `app.fetch(request)` で Hono に渡せる(sigh.dev のコード例)。

### 2. Hono のミドルウェア

根拠:
「we can use the built-in or third party middleware」(Hono 公式、Middleware)

### 3. SSE

根拠:
「It allows you to stream Server-Sent Events (SSE) seamlessly.」(Hono 公式、Streaming Helper)
SSE 用のヘルパー `streamSSE()` がある。

### 4. テストのしやすさ

根拠:
「it is easy to test Hono's applications」(Hono 公式、Testing)
サーバーを起動せず、`app.request('/posts')` でテストできる。

### 5. パフォーマンス

根拠:
Workers 向けルーターの比較で最速。
「Hono x 402,820 ops/sec」「itty-router x 212,598 ops/sec」「Fastest is Hono」(Hono 公式、Benchmarks)

### 6. Workers 向き

根拠:
`export default app` だけで Workers 上で動き、バインディングは `c.env` から型付きで使える(Hono 公式、Cloudflare Workers)。

### 7. 日本発

根拠:
作者は Yusuke Wada(yusu.ke)。
