# 0014: IdP の選定

Status: Accepted (2026-11-24)

## 決定

Cloudflare Access の IdP には、Access 自身のパスキー（WebAuthn）を使う。
外部の IdP（Entra ID、GitHub など）は、今は繋がない。
「まず」の決定であり、将来の差し替えは妨げない。

## 理由

- 「シークレットは使いたくないので、まずはパスキーにしましょう」
- Entra ID も GitHub も、Access に繋ぐにはクライアントシークレットを発行して保管する必要がある。
  パスキーは Access の設定だけで済み、管理するシークレットが増えない。

## 根拠（Cloudflare 公式、2026-11-24 確認）

- 「With passkeys, users can sign in to Access without an independent IDP or one-time PIN.」
- 「Passkeys use WebAuthn to authenticate users with a device, security key, or password manager. The authenticator must support discoverable credentials and user verification, such as a fingerprint, face scan, or PIN.」
- Entra ID の接続に必要な値は、「Application (client) ID」「Directory (tenant) ID」「Client secret」。
- GitHub の接続でも、OAuth App の「Client secret」を Access に登録する。

## 検討した他の選択肢

- Entra ID
  Free は無料（Microsoft 公式: 「Free / Microsoft Azure subscription required」）。
  ただしクライアントシークレットが要るため、今回は見送った。
- GitHub
  GitHub 組織は不要。
  こちらもクライアントシークレットが要るため、今回は見送った。

## 注意点

- パスキーの機能は 2026-11-06 の changelog で入ったばかりで新しい。
- 原文: 「Passkey authentication does not retrieve group memberships or custom attributes from another identity provider.」
  グループや属性は取れないため、権限の判定は Access policy（許可するメールなど）で行う。
- 初回の登録は、他のログイン方法か、メールの確認コードが要る。
  原文: 「If passkeys are the application's only login method, Access sends a verification code to your email address during enrollment.」
- パスキーを失った場合は、管理者が Users 画面から削除して再登録する。
  管理者自身が失った場合の復旧手段は、未確認。

## 未決

- ログインする人の範囲（自分だけか、他の人も入れるか）。
- 組織ごとの権限の持たせ方（0009 の前提との整合）。
- Entra ID や GitHub に切り替える条件。
