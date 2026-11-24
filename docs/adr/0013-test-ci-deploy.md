# 0013: テスト・CI・デプロイ

Status: Accepted (2026-11-24)

## 決定

- ユニットテストは Vitest を使う。
- E2E テストも書く。ツールは Flashwright（Playwright の drop-in で、より速い）を使う。
- E2E は CI（GitHub Actions）で、デプロイの前に動かす。
- デプロイの CLI は、Wrangler ではなく cf を使う。
- デプロイは CI から自動で行う。
- D1 のマイグレーションも、デプロイ時に自動で適用する（0011 の未決を解決）。

## 理由

- cf を選んだのは、新しいから。Wrangler はおそらく将来なくなると思う。
- デプロイを自動化するのは、継続的にバグ修正や機能追加をして、すぐに本番へ適用していくことが、この時代では大事だから。これは CI/CD が必要な理由でもある。
- E2E を CI で動かすのは、上の自動デプロイの流れに乗せるため。
- マイグレーションも自動適用にするのは、同じ流れ。
- E2E に Flashwright を選んだのは、Playwright より速いから。ユーザーは「Playwright より速いものがあればそれ、なければ Playwright」と言い、Flashwright を確認して OK とした。
- Vitest を選んだのは、公式推奨だから。
- E2E をデプロイ前に動かすのは、E2E が通らない変更を本番に出さないため（ユーザーの発言は「デプロイ前」のみ。この理由は文脈からの補足で、本人の言葉ではない）。

## 根拠

### 1. Vitest は Cloudflare 公式が推奨している

「For most users, Cloudflare recommends using the Workers Vitest integration for unit testing Workers and Pages Functions projects.」
「Cloudflare provides the `@cloudflare/vitest-plugin` Vite plugin, which runs your Vitest tests inside the Workers runtime.」
(Cloudflare Workers docs、Vitest integration、2026-11-24 確認)

### 2. cf は Cloudflare の新しい CLI

「The Cloudflare CLI, `cf`, is one command-line interface for the public Cloudflare API and for Workers projects.」
「`cf` covers the public Cloudflare API and uses `cloudflare.config.ts` for Workers projects.」
「Before you run `cf dev`, `cf build`, or `cf deploy` in a Wrangler project, convert it with `cf migrate`.」
(Cloudflare CLI docs、2026-11-24 確認)

Wrangler が終わっていく件は、ニュース記事の見出しだけが根拠で、公式の発表は未確認。
「Cloudflare opens the cf beta, a TypeScript CLI for AI agents, and begins retiring Wrangler with 18 months of migration support」

### 3. cf は GitHub Actions から自動デプロイできる

「This workflow builds the project once for every pull request and every push to `main`. It checks the build with a dry run, and deploys the same build only on pushes to `main`.」
「In CI, `cf` authenticates with an API token and does not wait for input.」
(Cloudflare CLI docs、Use cf in CI、2026-11-24 確認)

必要なのは、リポジトリの secrets に `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を入れること。

### 4. Playwright より速い E2E ツールとして Flashwright がある

「A drop-in Playwright: same API, same test runner, same `npx playwright test`. Your suite runs unmodified, 2–4× faster than on Playwright」
「`npm i -D @playwright/test@1.64.1`. Nothing in your code refers to Flashwright.」（戻し方）
「Mostly Chromium. Firefox and WebKit keep Playwright's behavior」
(flashwright.dev、2026-11-24 確認)

速度の数値は、ツール作者自身のベンチマーク。第三者の検証は未確認。
テストコードは Playwright のままなので、後から Playwright に戻せる。

## 検討した他の選択肢

- E2E: Playwright。Flashwright に問題が出た場合の戻り先。

## 未決（後で決める）

- D1 マイグレーションの自動適用を、cf のどのコマンドで行うか。ユーザーは cf のコマンドを知らないため、後で決める。ドキュメントは未確認。
- E2E の実行先や、テストの具体的な範囲・書き方。ユーザーが「後で決める」とした。
- cf は beta で、仕様が変わる可能性がある（2026-11-24 時点）。
