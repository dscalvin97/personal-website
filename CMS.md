# CMS notes (Decap) + content model

## Content source of truth
Work page, skills, education, achievements, and profile/resume metadata read from:

- `content/work.json`

Edit via:
1. **Decap admin** at https://calvin.makes.fyi/admin/
2. Or GitHub → `content/work.json`
3. Then rebuild/redeploy (static export)

Resume PDF:
- `public/calvin-dsouza-resume.pdf`
- Linked from home, work, and footer

## GitHub OAuth (Decap Netlify popup protocol)
Decap’s GitHub backend opens a **popup** and expects `postMessage`:
`authorization:github:success:{"token":"..."}`

| Piece | Value |
| ----- | ----- |
| OAuth app client ID | in `public/admin/config.yml` |
| Client secret | `/etc/decap-proxy.env` (mode 600, never commit) |
| Proxy | systemd `decap-oauth-proxy` → `127.0.0.1:8787` |
| Nginx | `/admin/oauth/` → proxy |
| **GitHub callback URL (must match exactly)** | `https://calvin.makes.fyi/admin/oauth/callback` |
| CMS popup entry | `https://calvin.makes.fyi/admin/oauth/authorize` |

Flow:
1. Login at `/admin/` → popup opens `/admin/oauth/authorize`
2. Popup handshakes with CMS via `postMessage`
3. Redirects to GitHub → callback on `/admin/oauth/callback`
4. Proxy exchanges code (secret stays server-side) → posts token back to CMS

If login fails:
- Confirm GitHub OAuth app callback URL is exactly the table value
- Allow popups for calvin.makes.fyi
- Check `journalctl -u decap-oauth-proxy`

## Umami analytics
- Dashboard: https://umami.makes.fyi/
- Credentials: `/home/calvin/.config/umami-bootstrap.txt`
- Change the default admin password on first login
