# 0006: Worker を 1 つにする

Status: Accepted (2026-11-23)

## 決定

SSR・BFF・API を、1 つの Worker に載せる。

## 理由

### 1. 隠す対象

インターネットから隠したいのは、SSR・BFF・API のすべて。
API だけを別の Worker に分けて隠す意味がない。

根拠:
分ける利点として挙げられるのは、API を公開インターネットから隠せること(Service bindings)。
全部を隠すなら、この利点は使わない。

### 2. 前段での保護

隠す役目は、Worker の前段に置く別の層が持つ。
前段には Cloudflare Access と WAF を使う。

根拠:
「All Access applications are deny by default -- a user must match an Allow policy before they are granted access.」(Cloudflare 公式、Access)
WAF は「Apply application-layer rules and managed protections」(Cloudflare 公式 cloudflare スキル)の役目を持つ。
