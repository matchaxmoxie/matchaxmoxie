# GitHub Pages for matchaxmoxie

Published **site root** = contents of **`site/`** (`index.html`, `styles.css`, `j.adezhao.jpg`, `resume.pdf`, etc.). Everything else (`latex/`, `docs/`) stays out of the live URL.

## Live site

**[https://matchaxmoxie.github.io/matchaxmoxie/](https://matchaxmoxie.github.io/matchaxmoxie/)**

`site/index.html` sets canonical URL and Open Graph / Twitter meta tags. If you rename the repo or add a custom domain, update those tags in `<head>`.

---

## Option A — Dedicated `matchaxmoxie` repo (typical for matchaxmoxie.github.io)

1. Keep this folder layout: **`site/`** holds all static assets.
2. **Settings → Pages → Source**: branch **`main`**, folder **`/site`** (not repo root).

---

## Option B — UCM monorepo (GitHub Actions)

Workflow: [`../../.github/workflows/matchaxmoxie-pages.yml`](../../.github/workflows/matchaxmoxie-pages.yml). It uploads **`matchaxmoxie/site`** as the Pages artifact when `matchaxmoxie/**` or the workflow changes.

1. **Settings → Pages → Source: GitHub Actions**
2. Push; confirm **Actions** runs green
3. Site URL is usually `https://<owner>.github.io/<repo>/`

Relative links inside `site/` are unchanged (`styles.css`, `resume.pdf`, etc.).

**Run manually:** **Actions → Deploy matchaxmoxie to Pages → Run workflow**.
