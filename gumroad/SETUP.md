# Gumroad setup — crochet patterns only

## Profile (Settings → Profile)
- **Name:** Calvin Dsouza
- **Bio:** `Crochet patterns from a developer who thinks in topology. Clear PDFs, honest skill levels, and no filler.`
- **Username:** `dscalvin` (keep)

## Store theme (store colors / font)
| Token   | Value     | Use                          |
| ------- | --------- | ---------------------------- |
| BG      | `#0f0e0c` | ink (dark) or `#f4efe6` bone |
| Accent  | `#e8a87c` | yarn                         |
| Alt     | `#7fb3a3` | sage (secondary)             |
| Font    | Fraunces or system serif for headings | |

## Custom profile page
HTML source: `gumroad/profile.html`  
Publish:

```bash
export PATH="$HOME/.local/bin:$PATH"
gumroad auth login   # device flow, or: gumroad auth login --with-token < token.txt
gumroad user update --name "Calvin Dsouza" --bio "$(cat gumroad/bio.txt)"
gumroad user page preview ./gumroad/profile.html
gumroad user page publish ./gumroad/profile.html
gumroad user page url
```

## Storefront / products
Create each pattern as a Gumroad product (digital download, PDF):
- Name: what they make, not “Pattern 1” (e.g. “Amigurumi — BeginnerFox”)
- Price: start simple ($5–$9) unless it’s a bundle
- Category: pick the closest Gumroad craft/design category
- Description: skill level, yarn weight, hook size, finished size, what’s in the PDF
- File: the pattern PDF
- Optional later: custom product landing page via `gumroad products page publish`

Do **not** embed buy buttons in the profile HTML — link to product pages only (Gumroad sandbox rules).

## Auth needed
API token or device-login before any of the `gumroad user …` commands can run from this server.
