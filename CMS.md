# CMS (Decap) + content model

## Content layout

```
content/
  site-content.json     # profile + skills + achievements + site meta (ONE form)
  roles/                # one JSON file per job
    kolors.json
    snapwork.json
    ...
  education/            # one JSON file per credential
    bsc-computer-science.json
    ...
```

### Why one file for profile/skills/achievements
Decap `files` collections always show a file list before the form. To avoid the extra click, all singleton data lives in **one file** → **one collection** → **one scrollable form** (Profile, Skills, Achievements list, Site).

Roles and Education are **folder** collections — separate entries you can add, reorder, and delete.

### Ordering
- Roles/Education: `order` field (1 = first). Gaps like 10/20/30 leave room to insert.
- Slug = filename via Decap `slug: {{fields.slug}}`.

After CMS edits, **rebuild/redeploy** from this server. Commits to `main` do not auto-publish.

## Save vs publish (important)

Decap + GitHub has **no draft-save**. In the admin, **Save = git commit**.

That is why CMS targets the **`content` branch**, not `main`:

| Step | What happens |
| ---- | ------------ |
| Edit + Save in Decap | Commits to `content` — **site does not change** |
| Preview pane | Shows your unsaved/saved draft in the browser (local) |
| Promote | Merge `content` → `main` (Action deploys) |

Promote from this repo (or GitHub PR):

```bash
./scripts/promote-content.sh
# or: gh pr create --base main --head content --title "CMS content"
```

## Admin UI

https://calvin.makes.fyi/admin/

1. **Site content** → one entry: *Profile, skills & highlights* → all singleton fields on one form  
2. **Roles** → list of jobs (Kolors, Snapwork, …)  
3. **Education** → list of credentials  

## GitHub OAuth (Netlify popup protocol)

| Piece | Value |
| ----- | ----- |
| Client ID | in `public/admin/config.yml` |
| Client secret | `/etc/decap-proxy.env` (600, never commit) |
| Proxy | systemd `decap-oauth-proxy` → `127.0.0.1:8787` |
| Nginx | `/admin/oauth/` → proxy |
| **GitHub OAuth callback URL** | `https://calvin.makes.fyi/admin/oauth/callback` |
| Popup entry | `https://calvin.makes.fyi/admin/oauth/authorize` |

Config:
```yaml
base_url: https://calvin.makes.fyi
auth_endpoint: admin/oauth/authorize
```

If login fails: verify callback URL exactly, allow popups, `journalctl -u decap-oauth-proxy`.

## Resume PDF

- File: `public/calvin-dsouza-resume.pdf`
- Path in CMS: Site content → Profile → Resume PDF path

## Umami analytics

- Dashboard: https://umami.makes.fyi/
- Credentials: `/home/calvin/.config/umami-bootstrap.txt`
- Change the default admin password on first login
