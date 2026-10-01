# CMS (Decap) + content model

## Content layout

Everything the work page renders lives under `content/`:

```
content/
  profile.json          # name, contact, links, resume path
  skills.json           # languages / web / cloud / creative lines
  achievements.json     # { "items": [{ "text": "..." }, ...] }
  site.json             # updatedAt stamp
  roles/                # one JSON file per job
    kolors.json
    snapwork.json
    ...
  education/            # one JSON file per credential
    bsc-computer-science.json
    ...
```

- **Roles & education** are folder collections — create/edit/delete entries independently in Decap.
- **Order field** controls display order (1 = first). Use gaps (10, 20, 30) if you want room to insert.
- **Slug** becomes the filename (Decap `slug: {{fields.slug}}`).
- After edits, rebuild/redeploy from this server (static export). CMS commits to `main` do not auto-publish.

## Admin UI

- https://calvin.makes.fyi/admin/
- Sidebar: Profile · Skills · Achievements · Roles · Education · Site meta

## GitHub OAuth (Netlify popup protocol)

| Piece | Value |
| ----- | ----- |
| Client ID | `public/admin/config.yml` (public) |
| Client secret | `/etc/decap-proxy.env` (600, never commit) |
| Proxy | systemd `decap-oauth-proxy` → `127.0.0.1:8787` |
| Nginx | `/admin/oauth/` → proxy |
| **GitHub OAuth callback URL** | `https://calvin.makes.fyi/admin/oauth/callback` |
| Popup entry | `https://calvin.makes.fyi/admin/oauth/authorize` |

CMS config:
```yaml
base_url: https://calvin.makes.fyi
auth_endpoint: admin/oauth/authorize
```

Flow: Login → popup `/admin/oauth/authorize` → `postMessage` handshake → GitHub → `/admin/oauth/callback` → token exchange (server-side) → `authorization:github:success:{"token":"..."}` back to CMS.

If login fails: check callback URL, allow popups, `journalctl -u decap-oauth-proxy`.

## Resume PDF

- File: `public/calvin-dsouza-resume.pdf`
- Path in CMS: Profile → Resume PDF path
- Replace the PDF file + redeploy to publish a new resume

## Umami analytics

- Dashboard: https://umami.makes.fyi/
- Credentials: `/home/calvin/.config/umami-bootstrap.txt`
- Change the default admin password on first login
