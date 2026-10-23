<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Agent roster (gotchas)

- Team roster lives in `.opencode/agents/` (agent ID = first name): `iris`
  (primary PM, default agent), `otto` (QA), `ravi` (bug hunter), `nadia`
  (SDLC/release/security gate), `leo` (UX), and read-only domain advisors
  `priya` (SEO), `marcus` (content/copy), `yuki` (performance), `elena`
  (accessibility), `farid` (Next.js/React), `sana` (3D/WebGL). Iris
  orchestrates; she cannot edit code (permissions-enforced).
- The `group-discussion` skill (`.opencode/skills/group-discussion/`) is hidden
  and permission-locked to Iris only. Discussion minutes are append-only under
  `discussions/` — never edit prior entries.
- `opencode.json` sets `default_agent: iris` and locks the group-discussion
  skill to Iris.

## Project

Static personal site for calvin.makes.fyi. Next.js 16 static export → `out/`,
rsync to `/var/www/calvin/` + nginx reload. Content lives in `content/*.json`
(edited via Decap CMS, see `CMS.md`); publish flow is
`./scripts/promote-content.sh` (merge `content` → `main` → Actions deploys).
No WebGL ships in the UI — the old `hero-scene*.tsx` files were dead code and
were deleted in the 2026-10 neo-brutalist redesign; three.js / @react-three/*
stay in `package.json` for future /studio inline demos only. All UI motion is
hand-written CSS (reactive dot field, site loader) with reduced-motion kill
paths; zero idle rAF.
