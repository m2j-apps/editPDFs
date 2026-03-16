# AGENTS.md — EditPDFs Guardrails

## Account + Deploy Rules (Mandatory)

- **GitHub remote must stay personal:** `origin` must be `github.com/m2j-apps/editPDFs.git` (or existing m2j-apps editpdfs origin)
- **Never use Boomerang accounts/orgs** for this repo.
- **Do not run** `gh auth switch` unless Mike explicitly asks.
- **Push pattern:** `git push origin <branch>`

## Vercel Rules (Mandatory)

- Deploy only from inside this repo:
  - `vercel --prod --yes`
- `.vercel/project.json` is the source of truth for the linked personal Vercel project.
- **Never run** `vercel switch` or `vercel link` to a different team/project unless Mike explicitly asks.

## Preflight Checklist (Run before push/deploy)

1. `git remote -v` shows `m2j-apps/editPDFs` (or existing canonical m2j-apps editpdfs remote)
2. `gh auth status` is personal context (not Boomerang)
3. `.vercel/project.json` exists and has expected project/team

If any check fails, **stop and report** — do not continue.
