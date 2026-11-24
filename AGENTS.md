## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (Keisei-Akiya/daneel) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context (aube monorepo: apps/frontend, apps/bff, apps/backend, packages/contracts。依存は frontend → bff → backend → contracts。docs/adr/0015). Root `GLOSSARY-MAP.md` points to per-context `GLOSSARY.md`. See `docs/agents/domain.md`.

### Deploy

デプロイとビルド基盤は Void（docs/adr/0017）。`apps/frontend` で `void deploy`。Node 24 と aube は `mise.toml` で固定。`cf` / wrangler は使わない。
SDK は `void/db`（スキーマは `apps/frontend/db/schema.ts`、import は `@schema`）、`void/kv`、`void/env`（`apps/frontend/env.ts`）。マイグレーションは `void db generate`。
