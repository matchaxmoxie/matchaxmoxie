# GitHub Pages for this folder

Static assets: `index.html`, `styles.css`, `j.adezhao.jpg`, `resume.pdf` (and anything else you add here).

## Live site

**[https://matchaxmoxie.github.io/matchaxmoxie/](https://matchaxmoxie.github.io/matchaxmoxie/)**

`index.html` includes a canonical URL and Open Graph / Twitter meta tags for that address. If you rename the repo or add a custom domain, update those tags in `<head>`.

---

## Option A Dedicated `matchaxmoxie` repo (what powers the live URL above)

Typical setup: repo **`matchaxmoxie`** under user/org **`matchaxmoxie`**, **Settings → Pages → Source**: branch **`main`**, folder **`/ (root)`**, with these files at the repo root.

---

## Option B UCM monorepo (GitHub Actions)

Workflow: [`.github/workflows/matchaxmoxie-pages.yml`](../.github/workflows/matchaxmoxie-pages.yml). It deploys **only** the `matchaxmoxie/` folder when you push to `main` and that folder (or the workflow) changes.

1. **Settings → Pages → Source: GitHub Actions**
2. Push the workflow; check **Actions** for a green run
3. Pages shows the site URL (usually `https://<owner>.github.io/<repo>/`)

Relative asset paths work for that base path.

**Run manually:** **Actions → Deploy matchaxmoxie to Pages → Run workflow**.
