# 0007: データの保存先

Status: Accepted (2026-11-23)

## 決定

保存先は、すべて Cloudflare の製品にする。

- D1: チャット履歴、会話の一覧
- R2: 添付ファイル、画像
- KV: ログインセッションの管理

## 理由

### 1. 保存先を Cloudflare に統一する

Cloudflare を選んだ理由(0001)に従う。

### 2. D1 にチャット履歴を置く

根拠:
「Persistent, relational storage for user data, account data, and other structured datasets.」(Cloudflare 公式、Choose a data or storage product)
「Workloads with a high ratio of reads to writes (most web applications).」(同)

### 3. R2 に添付ファイル・画像を置く

根拠:
「R2 is S3-compatible blob storage that allows developers to store large amounts of unstructured data without egress fees associated with typical cloud storage services.」(同)

### 4. KV にログインセッションを置く

根拠:
「We recommend using Workers KV for storing session data, credentials (API keys), and/or configuration data.」(同)
「Workers KV is an eventually consistent key-value data store that caches on the Cloudflare global network.」(同)
