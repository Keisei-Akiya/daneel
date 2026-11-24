# 0019: 認証に Better Auth を使う

Status: Accepted (2026-11-24)

## 決定

- アプリの認証（ログインとセッション）には Better Auth を使う。

## 理由

- 認証を自力で実装するのは負担が大きい。
  そのため、認証ライブラリを採用する。
- OAuth との連携やパスキーの設定など、必要とする機能を実現できる。
  そのため、Better Auth を採用する。

## 補足（アシスタントによる。ユーザーの言葉ではない）

- Void の既定の認証は Better Auth。
  ただし、Void 管理の認証は Meta-Frameworks モードでは使えない（0017）。
  そのため、Better Auth を直接組み込む。
  - TanStack Start 向けの Better Auth 公式連携を使う。
  - DB は D1（`void/db`、0007、0011）を使う。
  - `void/auth` は使わない。
- 0009 と 0014 の認証まわりの決定と重なる。
  Cloudflare Access をどうするかは、未決（下記）。

- Better Auth の機能（公式 docs で確認）。
  - OAuth: 本体に組み込み。`socialProviders` に `clientId` と `clientSecret` を設定する。
  - パスキー: 別パッケージ `@better-auth/passkey` のプラグイン。
- OAuth は `clientSecret` が必要。0014 の「シークレットは使いたくない」と食い違うため、OAuth を使う場合は 0014 の見直しが要る。パスキーのみならシークレットは不要。

## 根拠

「Better Auth is a framework-agnostic, universal authentication and authorization framework for TypeScript.」
(https://better-auth.com/docs/introduction)

「Void-managed auth requires a native Void app on Cloudflare. For meta-frameworks or Node.js, Bun, and Deno, use Better Auth directly.」
(void@1.11.0 同梱ドキュメント、guide/auth.md)

「Void-managed auth is not supported in framework mode yet. For now, use Better Auth's official integration for your framework.」
(同、integrations/frameworks/overview.md)

「Better Auth comes with built-in support for OAuth 2.0 and OpenID Connect. This allows you to authenticate users via popular OAuth providers like Google, Facebook, GitHub, and more.」
(https://better-auth.com/docs/concepts/oauth)

「Passkeys are a secure, passwordless authentication method using cryptographic key pairs, supported by WebAuthn and FIDO2 standards in web browsers.」
(https://better-auth.com/docs/plugins/passkey)

## 未決

- Cloudflare Access（0009、0014）を残すか、外すか。
- 組織・メンバーの管理を、Better Auth のプラグインで行うか、D1 の自前テーブルで行うか。
- ログイン方式（メールとパスワード、パスキー、ソーシャルログイン）。
- Better Auth の導入と、組み込みの実装。
