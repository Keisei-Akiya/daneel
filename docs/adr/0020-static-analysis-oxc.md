# 0020: 静的解析に oxlint と oxfmt を使う

Status: Accepted (2026-11-24)

## 決定

- リントには oxlint を使う。
- フォーマットには oxfmt を使う。
- ルート `package.json` の devDependencies に固定バージョンで入れる（oxlint 1.94.0、oxfmt 0.79.0）。
- ルート `package.json` に `lint`、`fmt`、`fmt:check` scripts を置く。
- oxfmt の設定はルート `.oxfmtrc.json` に置く。
- `.oxfmtrc.json` の `ignorePatterns` は `aube-lock.yaml`、`**/routeTree.gen.ts`、`**/db/migrations/**`、`docs/**`。
  この設定では ADR を含む `docs/` 全体がフォーマット対象外となる。
- oxlint の設定はルート `.oxlintrc.json` に置き、`ignorePatterns` で `**/routeTree.gen.ts` を除外する。
  oxlint 1.94.0 のファイル検出では `aube-lock.yaml` と `db/migrations/` は対象にならないため、除外設定には加えない。
- 既存コードを一括整形する。

## 理由

この ADR では、確認できるユーザーの理由を記録しない。
導入理由を推測で補わない。

## 検証結果（2026-11-24）

- `aube install --frozen-lockfile`: exit 0。
  aube は 284 packages について「Already up to date」と報告した。
- `aube run fmt`: exit 0。
  oxfmt は 23 files を処理した。
- `aube run fmt:check`: exit 0。
  全対象ファイルが正しいフォーマットであると報告した。
- `aube run lint`: exit 0。
- `node_modules/.bin/oxfmt --check mise.toml`: exit 0。
  mise.toml は整形されており、別途1ファイルとして確認した。
- `aube -F @daneel/frontend run build`: exit 0。
  Vite の client、SSR、void_worker の各 production build が完了した。
- `docs/**` は除外設定のため、今回の一括整形では ADR を変更していない。
  この ADR の検証記録は手動で更新した。

## 追加検証（2026-11-25）

- `.oxlintrc.json` を追加し、`**/routeTree.gen.ts` のみを明示的に除外した。
- `oxlint --debug=files` で、`routeTree.gen.ts`、`aube-lock.yaml`、`db/migrations/` が検出対象に含まれないことを確認した。
- `aube run lint`: exit 0。
- `aube run fmt:check`: exit 0。24 files を検査し、すべて正しいフォーマットであると報告した。

## 未決

- `lint` と `fmt:check` を CI（ADR 0013）に組み込むか。
- pre-commit で lint / format check を実行するか。
- docs/ADR を将来フォーマット対象に含めるか。
- 最初に作るカスタムルール。
  例: 依存の向き（ADR 0015）の検査を oxlint で行うか、別ツールを使うか。
- Solid JSX を含む frontend の lint に対して、追加の検証が必要か。
