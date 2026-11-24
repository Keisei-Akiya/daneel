# 0016: パッケージ管理は aube を使う

Status: Accepted (2026-11-24)

## 決定

- パッケージ管理には aube を使う。
- aube は mise でプロジェクトに入れる（`mise.toml`、バージョンは 2.10.1 に固定）。
- リポジトリは `aube init` から作る。ルートと各パッケージの `package.json` は `aube init` の生成物をもとにする。
- ワークスペース定義は `aube-workspace.yaml`、ロックファイルは `aube-lock.yaml` を使う。
- 依存の追加は `aube add`、スクリプトは `aube run <script>`、CI は `aube ci` を使う。
- ルートの `package.json` に `packageManager: "aube@2.10.1"` を入れる（`aube init` が書いた）。
- ワークスペース内の参照は `workspace:*` を使う。

## 理由

パッケージ管理に aube を選んだ理由は、次の 3 点（ユーザーの発言）。

1. サプライチェーン攻撃対策
2. 依存解決のスピード
3. ディスク容量の最適化

## 根拠

以下は各理由に対応する公式の記述。

### 1. サプライチェーン攻撃対策

「Review dependency code. Dependency build scripts need an allow rule or built-in trust. Explicit denies take precedence. Optional build jails restrict approved scripts; release-age and publishing-trust checks run during resolution.」
(aubepkg/aube README)

実機でも、`solid-js@1.9.20` が公開元の信頼性の低下（`ERR_AUBE_TRUST_DOWNGRADE`）で止まった（後述）。

### 2. 依存解決のスピード

「Fast installs. Warm installs are about 2x faster than pnpm and about 2x faster than Bun in the current benchmarks. Repeat test commands run up to 4x faster than pnpm and up to 2x faster than Bun.」
「Those results describe the recorded fixtures and cache conditions.」
(aubepkg/aube README)

この数値は aube 側の公表値で、このリポジトリでは計測していない（未確認）。

### 3. ディスク容量の最適化

「Share package files. A content-addressable store deduplicates files; the global virtual store also reuses package directory trees across local projects.」
(aubepkg/aube README)

ストアの場所は `$XDG_DATA_HOME/aube/store/v1/`（既定は `~/.local/share/aube/store/v1/`）。削減量はこのリポジトリでは計測していない（未確認）。

### 運用面の事実（理由ではない）

- 新規プロジェクトのロックファイルは `aube-lock.yaml`。（aube docs、For pnpm users）
- mise で入れるのが推奨。「We recommend mise because it can manage `aube` and your Node.js runtime from the same toolchain.」（aube docs、Installation）
- CI は `aube ci`。「A frozen install fails when the manifest and lockfile disagree」（aube docs、CI and containers）
- GitHub は `aubepkg/aube`、ライセンスは MIT、作者は jdx（mise の作者）。

## 検証結果（2026-11-24、aube 2.10.1、Rocky 10）

- `mise use aube` でプロジェクトの `mise.toml` に入れ、2.10.1 に固定した。
  - 2.11.0 は mise の `minimum_release_age` により、リリース直後として除外された。
- `aube init` でルートと 4 パッケージ（`apps/frontend`、`apps/bff`、`apps/backend`、`packages/contracts`）の `package.json` を作った。
- `aube add` で依存を入れ、`aube-lock.yaml`（161 パッケージ）ができた。
- `aube ci` は通った。`aube ignored-builds` は「No ignored builds」だった。
- `aube run build`（`apps/frontend`、`cf` 構成）は通った。Worker の入口は `.cloudflare/output/v1/workers/default/bundle/index.js` の 1 つ。

### solid-js は 1.9.19 に固定した

新規の解決で `solid-js@1.9.20`（2026-11-19 公開）が `ERR_AUBE_TRUST_DOWNGRADE` で止まった。

「earlier published version 2.0.0 had trusted publisher but this version has no trust evidence」(aube のエラー)

`aube trust check solid-js@1.9.20` は `downgrade`（current evidence: none、strongest earlier evidence: trusted publisher (2.0.0)）だった。1.9.19 は `pass`。

`trustPolicy` の無効化や `trustPolicyExclude` による除外はしていない。`apps/frontend` の `solid-js` を `1.9.19` に固定して通した。

## 未確認・未検証

- `aube-workspace.yaml` の `minimumReleaseAgeExclude` が、aube で必要か、効いているか。
- `onlyBuiltDependencies` が効いて「No ignored builds」になったのか、aube の built-in trust によるのか。
- build 後の SSR と SSE が、aube で入れた依存でも 200 になるか（0015 で `cf` 構成の SSR/SSE は未確認のまま）。
- GitHub Actions（ADR 0013）の CI での動作。
- `solid-js@1.9.20` の trust 失敗が、上流の公開手順の差によるものか。調べていない。
