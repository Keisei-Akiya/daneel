# 0012: UI コンポーネントに solid-ui を使う

Status: Accepted (2026-11-24)

## 決定

UI コンポーネントには、solid-ui を使う。
solid-ui は Tailwind CSS 前提のため、スタイリングは Tailwind CSS になる。

## 理由

UI ライブラリの選定では、動作が軽く、パフォーマンスが良いものを選びたいから。
MUI などの大きな UI ライブラリと比べて、solid-ui は軽い。
補足として、solid-ui は npm の依存に入れず、必要なコンポーネントだけをコピーして使う(下の根拠 2)。

## 根拠

### 1. solid-ui は SolidJS 向けである

根拠:
「This is an unofficial port of shadcn/ui & tremor-raw to Solid.」(solid-ui 公式、Introduction)
0003 で SolidJS を選んでいる。

### 2. コードをコピーして自分のものにする方式である

根拠:
「This is **NOT** a component library. It's a collection of re-usable components that you can copy and paste into your apps.」
「Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.」(solid-ui 公式、Introduction)
npm の依存として入れないため、取り込んだ後は自分で変更できる。

### 3. Tailwind CSS が前提である

根拠:
「Re-usable components. Built with Kobalte & corvu. Styled with Tailwind CSS.」(solid-ui 公式、Introduction)
そのため、solid-ui を使うと Tailwind CSS も使うことになる。
生の CSS だけで進める方針とは両立しない。

## 検討した他の選択肢

- Kobalte ＋ 生の CSS。
  solid-ui の土台は Kobalte で、見た目を生の CSS で書く道もある。
  「生の CSS のほうが良いと言われている」という話は、2026 年時点で実際にある(Native CSS の事例や、ブログでの Tailwind からの移行)。
  一方で、Tailwind v4 が「just use CSS」派の批判に応えたという反論もあり、定説にはなっていない。
- Tailwind ＋ 自前コンポーネント。

## 未決

- 「MUI などと比べて軽い」は、実測による比較ではない。
  バンドルサイズなどの数値は、まだ取っていない。
- solid-ui を TanStack Start に入れる手順の確認。
  公式サイトで TanStack Start 向けの手順のページは見つからなかった(2026-11-24 時点)。
- solid-ui は非公式の移植であり、メンテナンスは個人による。
  更新が止まったときは、コピー済みのコードを自分で保守する。
