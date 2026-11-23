# 0009: 認証と組織・メンバーの管理

Status: Accepted (2026-11-24)

## 決定

Cloudflare Access は、入口の関門にとどめる。
Access には、IdP で本人確認できた人だけを通す、広い Allow ポリシーを 1 つ置く。

組織、セットアップユーザー、メンバーの管理は、D1(0007)で行う。
誰がどの組織に属し、何を許されるかは、アプリが D1 を見て判定する。

ユーザーを D1 に追加するとき、Access の設定は変更しない。

## 前提

daneel はエンタープライズ向けを想定する。
セットアップユーザーと、そのメンバーの束(組織)が複数ある。

## 理由

### 1. 組織を増やしても Access 側の変更をなくす

組織ごとに Access のルールグループやリストを持つと、組織が増えるたびに Access の設定が増える。
Access 側の数には上限がある。

根拠(Cloudflare 公式、Account limits):
Rule groups は 300、Reusable policies は 500、Applications は 500。
Gateway の Lists は 100。
「These limits may be increased on Enterprise accounts. To request a limit increase, contact your account team.」

組織数の見込みは、まだ決めていない。
D1 で持てば、組織数は Access の上限に左右されない。

### 2. 組織の管理を、アプリの機能にする

セットアップユーザーが自分の組織のメンバーを追加する操作は、アプリの機能になる。
許可を Access に持たせると、アプリが Cloudflare の API を呼ぶことになり、アプリが Cloudflare の API トークンを持つ必要がある。
D1 で持てば、この必要はない。

## 検討した他の選択肢

### 組織ごとに Access のルールグループを作る

上限の面で、組織数が増えると使えなくなるおそれがある。
アプリから Access の API を呼ぶ必要も出る。
このため採用しない。

### External Evaluation で D1 を引く

根拠(Cloudflare 公式、External Evaluation rules):
「After the user authenticates with your identity provider, Access sends the user's identity to the external API at **Evaluate URL**.」

判定用の API が別途必要になる。
0006 では Worker を 1 つにしている。
判定 API が落ちたときの挙動は、確認できていない。
このため採用しない。

## 未決

- IdP の選定。0014 で扱う。
- アプリ側でのユーザーの識別方法(Access が付ける情報の検証を含む)。
- 組織数の見込み。
