# CMS (Decap) + content model

## Content is split by page

```
content/
  shared.json           # nav, footer, brand — every page
  home.json             # hero, index, currently
  profile.json          # identity, links, resume (work contact + home fallback)
  skills.json           # work page tools
  achievements.json     # work highlights
  site-meta.json        # updatedAt
  pages/work.json       # work page header + section labels
  pages/developer.json  # developer page copy + cases + stack
  pages/studio.json     # 3D page copy + BlendKit + practice
  pages/craft.json      # craft page copy + pattern notes
  roles/                # one JSON per job (folder collection)
  education/            # one JSON per credential (folder collection)
```

Every visible string on the site is loaded from these files via `lib/content.ts`.

## Decap sidebar (one collection per page)

| Collection         | Page / use                          |
| ------------------ | ----------------------------------- |
| Shared             | Nav + footer on all pages           |
| Home page          | `/` hero + index + currently          |
| Profile            | Contact / identity                  |
| Work page          | `/work/` header + section labels      |
| Skills             | `/work/` tools list                   |
| Achievements       | `/work/` highlights                   |
| Site meta          | updatedAt stamp                     |
| Developer page     | `/developer/`                        |
| 3D page            | `/studio/`                           |
| Craft page         | `/craft/`                            |
| Roles              | `/work/` experience list (folder)    |
| Education          | `/work/` education list (folder)     |

## Live preview

- Editing any collection opens the **matching site page** in the preview iframe (`#preview=<token>`).
- Typing updates the preview via `postMessage` — **no save required**.
- Role drafts also get a spotlight card on `/work/`.
- Preview iframe does **not** reload on every keystroke (stable src).

## Save vs publish

Decap + GitHub has no draft-save. **Save = git commit** to branch **`content`**.

| Step | Result |
| ---- | ------ |
| Edit + Save | Commits to `content` — live site unchanged |
| Preview | Browser-local draft (works unsaved) |
| Publish | `./scripts/promote-content.sh` → merges to `main` → Actions deploys |

## Admin

https://calvin.makes.fyi/admin/

GitHub OAuth callback URL:
`https://calvin.makes.fyi/admin/oauth/callback`

## Resume PDF

`public/calvin-dsouza-resume.pdf` — path configured in Profile → Resume PDF path.

## Umami

https://umami.makes.fyi/ — credentials in `/home/calvin/.config/umami-bootstrap.txt`
