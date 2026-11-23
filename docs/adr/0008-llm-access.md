# 0008: LLM の呼び出し方

Status: Accepted (2026-11-23)

## 決定

LLM は Workers AI で呼ぶ。
呼び出しは AI Gateway 経由にする。
使うモデルは決めない。

## 理由

### 1. Cloudflare の製品で統一する

0001 の方針に従う。

### 2. 無料枠がある

> Our free allocation allows anyone to use a total of 10,000 Neurons per day at no charge.

(Cloudflare 公式、Workers AI Pricing)

> AI Gateway's core features available today are offered for free

(Cloudflare 公式、AI Gateway Pricing)

### 3. AI Gateway を経由する理由

- ログを取れる。
- 使いすぎを防げる。
- モデルを切り替えやすい。
- 外部プロバイダを呼ぶとコードが変わる。
  今後外部プロバイダに対応できるようにするため、Gateway を経由する。

## 検討した他の選択肢

### Workers AI を Gateway なしで直接呼ぶ

ログ、使いすぎ防止、モデルの切り替えやすさのために採用しない。

### 外部プロバイダを直接呼ぶ

コードが変わるため採用しない。
