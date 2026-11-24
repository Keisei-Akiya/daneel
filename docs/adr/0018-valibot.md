# 0018: 検証ライブラリに valibot を使う

Status: Accepted (2026-11-24)

## 決定

- スキーマ検証ライブラリには、zod ではなく valibot を使う。
- 対象は、リクエストの検証や環境変数（`void/env`）など、daneel の入力検証すべて。

## 理由

- 検証ライブラリは、zod ではなく valibot を採用すると判断した。

## 補足（アシスタントによる。ユーザーの言葉ではない）

- valibot は Standard Schema 互換。
  Void の docs は、Standard Schema 互換のライブラリを検証に使えるとしている。
- Void は valibot 向けの連携も持つ。
  Drizzle のテーブルからリクエスト用の検証を作る `void/drizzle-valibot` がある。
- 現時点で、コードと ADR に zod の使用はない。置き換える対象はない。
- 未確認: `void/env` と valibot の組み合わせ、`void/drizzle-valibot` の動作。実際に使うときに確認する。

## 根拠

「you can write validators by hand using any [Standard Schema](https://standardschema.dev/)-compatible library (Valibot, Zod, ArkType, etc.)」
(void@1.11.0 同梱ドキュメント、guide/server-routing.md)

「Derive request validators from your tables with `void/drizzle-zod`, `void/drizzle-valibot`, or `void/drizzle-arktype`.」
(同、guide/database.md)
