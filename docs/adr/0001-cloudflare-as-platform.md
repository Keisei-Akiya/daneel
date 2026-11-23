# 0001: 基盤に Cloudflare を選ぶ

Status: Accepted (2026-11-23)

## 判断の軸

個人開発では安さが大事。
無料で使えるリソースが多い基盤を選ぶ。

この ADR は無料枠の比較だけを扱う。
bot 対策、関数かコンテナか、SSE などは別の ADR で扱う。

## 比較した基盤

AWS、Azure、Cloudflare、Vercel。
無料枠の数値は、2026-11-23 に各社の公式ページで確認した。

- Cloudflare
  - Workers Free は 100,000 リクエスト/日。待ち時間(duration)は課金されない。
  - 静的アセットへのリクエストは無料で無制限。
  - D1 Free は読み取り 500 万/日、書き込み 10 万/日、容量 5 GB。
  - 期限のない常時無料。
- Azure
  - Functions は常時無料で 100 万リクエスト。
  - Container Apps は常時無料で 18 万 vCPU 秒、36 万 GiB 秒、200 万リクエスト。
  - Static Web Apps は常時無料で 100 GB の帯域。
  - 無料枠を超えると従量課金に移る。
- AWS
  - 現行の Free Tier は最大 $200 のクレジットで、期限は 6 か月。
  - Free plan はクレジット切れか 6 か月でアカウントが閉鎖される。
- Vercel
  - Hobby は Function 呼び出し 100 万、転送 100 GB など。
  - 上限を超えると、30 日待たないと機能を使えない。

## 決定

基盤は Cloudflare にする。

## 理由

1. 無料枠が期限付きの AWS(6 か月)と、超過で 30 日止まる Vercel は外す。
2. 残る Cloudflare と Azure は、無料枠の広さが同程度。
3. Azure は実務で経験しているので、個人開発では別のものを使いたい。
   これが最終的な決め手になった。
