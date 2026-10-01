# Calvin Dsouza — personal website

Static personal site for [calvin.makes.fyi](https://calvin.makes.fyi).

**Stack:** Next.js 16 (static export), React 19, Tailwind CSS v4, shadcn/ui (Base UI), three.js + React Three Fiber.

## Pages

| Route        | Focus                         |
| ------------ | ----------------------------- |
| `/`          | Home — hero scene, index      |
| `/developer/`| Software work, projects       |
| `/studio/`   | 3D practice                   |
| `/craft/`    | Crochet and handmade work     |

The home hero is live WebGL geometry (no remote HDRI). three.js loads after first paint.

## Develop

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build   # static export → out/
```

Deploy `out/` to any static host. On the current server: rsync to `/var/www/calvin/` and reload nginx.

## Profiles

- [LinkedIn](https://www.linkedin.com/in/dscalvin)
- [GitHub](https://github.com/dscalvin97)
- [Gumroad](https://dscalvin.gumroad.com/)
