# 0011: D1 へのアクセスに ORM を使い、マイグレーションを管理する

Status: Accepted (2026-11-24)

## 決定

D1(0007)へのアクセスには、ORM を使う。
スキーマの変更は、マイグレーションで管理する。

使う ORM の製品は、まだ決めていない。

## 理由

型を共有できるから。
スキーマを TypeScript で定義すれば、クエリの結果に型が付く。
その型を、API(Hono、0005)とフロント(Solid、0003)で共有できる。

マイグレーションを管理できるから。
スキーマの変更を、マイグレーションとしてコードと一緒に履歴に残せる(下の根拠 1、3)。

## 根拠

### 1. D1 にマイグレーションの仕組みがある

根拠:
「Database migrations are a way of versioning your database. Each migration is stored as an `.sql` file in your `migrations` folder.」(Cloudflare 公式、D1 Migrations)
適用済みの記録は、D1 の `d1_migrations` テーブルに残る。
`wrangler d1 migrations apply` で、未適用のものを適用できる。

### 2. ORM と D1 は公式に組み合わせられる

根拠:
Drizzle は「Drizzle ORM fully supports the Cloudflare D1 database and Cloudflare Workers environment.」(Drizzle 公式、Cloudflare D1)
Prisma は Cloudflare 公式のチュートリアルがある(Cloudflare 公式、Query D1 using Prisma ORM)。
どちらも、D1 のバインディング経由で使える。

### 3. ORM が書き出すマイグレーションを Wrangler が適用できる

根拠:
「If you use an ORM such as Drizzle that writes each migration as its own subdirectory (for example, `migrations/0001_init/migration.sql`), set `migrations_pattern` to the glob that matches your layout」(Cloudflare 公式、D1 Migrations)
Wrangler の `d1 migrations create` は、入れ子のレイアウトには使えない。
そのため、その場合は ORM のコマンド(例: `drizzle-kit generate`)でマイグレーションを作る。

## 未決

- ORM の製品。Drizzle か Prisma かなど。
- マイグレーションの作り方。
  Wrangler で SQL を手書きするか、ORM のスキーマから生成するか。
- マイグレーションを適用するタイミング。
  手動か、CI(0013)かは、0013 で扱う。
