# 0010: チャットの応答を SSE で流す

Status: Accepted (2026-11-24)

## 決定

LLM の応答は、SSE(Server-Sent Events)でクライアントに流す。

## 理由

LLM の応答を流す方式として、SSE が一般的だから。
Workers AI(0008)も Hono(0005)も、SSE をそのまま扱える(下の根拠 1、2)。

## 根拠

### 1. Workers AI が SSE で返せる

根拠:
「To get started using streaming on Workers AI's text generation models with server-sent events, set the "stream" parameter to true in the input of request.」(Cloudflare Blog、Streaming and longer context lengths for LLMs on Workers AI)
0008 で LLM の呼び出しを Workers AI にしている。
その出力形式がそのまま SSE になる。

### 2. Hono に SSE 用のヘルパーがある

根拠:
「It allows you to stream Server-Sent Events (SSE) seamlessly.」(Hono 公式、Streaming Helper)
0005 で API を Hono にしている。
`streamSSE()` で、`event`、`data`、`id` を持つ SSE を書き出せる。

### 3. Workers が SSE の長い接続に耐える

根拠:
0002 で確認したとおり、HTTP リクエストの壁時間は無制限で、ストリーミング中は有効なまま。
ネットワーク待ちは CPU 時間に数えない。

## 未決

- 途中停止(クライアントが切断したときの扱い)。
  Hono の `stream.aborted` と `stream.onAbort()` で検知できる。
- 切断後の再開。
  SSE には `id` があるが、再開するかどうかは決めていない。
- 応答の保存。
  ストリームが終わった時点で D1(0007)に書くか、途中で書くかは決めていない。
