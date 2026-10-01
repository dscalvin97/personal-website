# CMS notes (Decap) + content model

## Content is CMS-backed
Work page, skills, education, achievements, and profile/resume metadata read from:

- `content/work.json`

Edit via:
1. **Decap admin** at https://calvin.makes.fyi/admin/ (needs GitHub OAuth — see below)
2. Or directly in GitHub → `content/work.json`
3. Then rebuild/redeploy (static export)

Resume PDF is a separate binary file:
- `public/calvin-dsouza-resume.pdf`
- Linked from home, work, and footer (`download` attribute)

To update the PDF: replace the file in `public/`, redeploy.

## Decap CMS one-time GitHub OAuth
1. GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App
2. Application name: `calvin.makes.fyi CMS`
3. Homepage URL: `https://calvin.makes.fyi`
4. Authorization callback URL: `https://calvin.makes.fyi/admin/api/v1/authorize`
5. After creating, set `backend.base_url` in `public/admin/config.yml` if needed, then redeploy
6. Open `/admin/` → Login with GitHub → Edit Work content → Commit

## Umami analytics
- Dashboard: https://calvin.makes.fyi/umami/
- Script injected at build via `.env.production.local`
- Website id: see `.env.production.local`
- Change the default admin password on first login
