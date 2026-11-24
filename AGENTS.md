## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (Keisei-Akiya/daneel) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context (pnpm monorepo: apps/frontend, apps/bff, apps/backend, packages/contracts。依存は frontend → bff → backend → contracts。docs/adr/0015). Root `GLOSSARY-MAP.md` points to per-context `GLOSSARY.md`. See `docs/agents/domain.md`.
