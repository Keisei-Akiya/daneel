# 0015: ディレクトリ構成（frontend / bff / backend）

Status: Accepted (2026-11-24)

## 決定

aube のワークスペース（ADR 0016）で、次の 4 つのパッケージに分ける。

```
apps/
  frontend/   TanStack Solid Start。画面（SSR）と、Worker の入口。
  bff/        Hono。画面向けの API を組み立てる層。
  backend/    ドメインの処理（チャット生成など）。
packages/
  contracts/  共有する型だけ。実装を持たない。
```

依存の向きは、一方向に固定する。

```
frontend → bff → backend → contracts
```

- 下の層は、上の層を import しない。
- `contracts` は、どの層からも import してよい。ただし、`contracts` は他を import しない。
- `bff` と `backend` は、ライブラリとして TS のソースをそのまま公開する（`exports` が `./src/index.ts`）。
- ビルドして Worker を作るのは `frontend` だけ。
  0006（SSR・BFF・API を 1 つの Worker に載せる）は、この形で保たれる。

`bff` は、`frontend/src/routes/api/$.ts` から `app.fetch(request)` で呼ぶ。

## 理由

ユーザーが挙げた条件:

1. 依存の向きと層が、構造から読み取れること。
2. 共有する型を、外に出すこと（ユーザーが承認）。
3. 名前が、frontend → bff → backend の流れに沿うこと。

条件に対する対応（以下は、条件を満たすために選んだ形）:

- 層ごとに別パッケージにし、`package.json` の `dependencies` で依存の向きを書く。
  向きに反する import は、依存に無いので解決できず、エラーになる。
- 共有する型は `packages/contracts` に出した。
- `apps/` の下に 3 層を並べた（ユーザーの決定）。

## 検証（scratch で実施、2026-11-24）

- （0017 で Void に置き換え済み。`cloudflare.config.ts` と `cf` は削除した）設定は `wrangler.jsonc` ではなく `cloudflare.config.ts`（`cf` CLI）を使う（ユーザーの指示）。
  `cf migrate` で変換し、`cf@1.0.0-rc.4` と `@cloudflare/vite-plugin@2.0.0-rc.4` を入れた。
- `aube run build`（`apps/frontend`）は `cf` 構成でも通った。
  Worker の入口は `.cloudflare/output/v1/workers/default/bundle/index.js` の 1 つ。
- 旧構成（wrangler）の PoC では、workerd 上で `/` の SSR は 200、`/api/ping` は `{"ok":true}`。
  `/api/chat` の SSE は、約 0.4 秒ごとに 1 件ずつ届いた（バッファされない）。
  この SSE の確認は、`cf` 構成ではまだやり直していない（未確認）。

## 注意点

- `@cloudflare/vite-plugin` を入れた `vite dev` では、`/` が 500 になった。
  エラーは `getContextId cannot be used under non-hydrating context`。
  プラグインを外すと、`vite dev` でも SSR・`/api/*`・SSE が動いた。
  原因は未切り分け（プラグインの `ssr` 環境の設定か、Solid 側の不具合かは未確認）。
  `cf dev` は内部で `vite dev` に委譲し（`Delegating to vite dev`）、同じく `/` が 500、`/api/ping` は `{"ok":true}` だった。
  `cf dev --local` は「not supported」で使えない。
  build 後に workerd で動かす `cf` 側の手順は、まだ見つけていない（未確認）。
- dependency-cruiser などで、依存の向きを機械的に検査するところは、まだ試していない（未確認）。
- `bff` の中身を、1 つの Worker に収めたまま分割し続けられるかは、実装が増えてから見直す。

## 未決

- 依存の向きの検査を、CI（0013）に入れるか。
- `vite dev` の 500 の原因と、dev の標準手順。
