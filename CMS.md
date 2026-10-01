# CMS notes (Decap) + content model

## Content source of truth
Work page, skills, education, achievements, and profile/resume metadata read from:

- `content/work.json`

Edit via:
1. **Decap admin** at https://calvin.makes.fyi/admin/ (GitHub OAuth is wired)
2. Or directly in GitHub → `content/work.json`
3. Then rebuild/redeploy (static export)

Resume PDF is a separate binary file:
- `public/calvin-dsouza-resume.pdf`
- Linked from home, work, and footer (`download` attribute)

To update the PDF: replace the file in `public/`, redeploy.

## GitHub OAuth (Decap)
- OAuth app client ID is in `public/admin/config.yml` (`backend.base_url` + public client usage)
- **Client secret lives only on the server** in `/etc/decap-proxy.env` (mode 600). Never commit it.
- Proxy service: `decap-oauth-proxy` (systemd) on `127.0.0.1:8787`
- Nginx routes `https://calvin.makes.fyi/admin/api/*` → proxy
- **GitHub OAuth App callback URL must be:**
  `https://calvin.makes.fyi/admin/api/v1/authorize`
- Open https://calvin.makes.fyi/admin/ → Login with GitHub → Edit Work content → Commit to `main`

After CMS commits to `main`, the static site does **not** auto-update until rebuild/deploy from this server (or a future GitHub Action).

## Umami analytics
- Dashboard: https://calvin.makes.fyi/umami/
- Login: see `/home/calvin/.config/umami-bootstrap.txt`
- Script injected at build via `.env.production.local`
- Change the default admin password on first login
