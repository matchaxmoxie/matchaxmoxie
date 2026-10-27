# matchaxmoxie · profile + Pages publish

**GitHub profile:** https://github.com/matchaxmoxie  
**Live site:** https://matchaxmoxie.github.io/matchaxmoxie/  
**Who this is for:** IU peers, mentees, and anyone who wants course-by-course undergrad proof ... not the hire-facing portfolio (that is [jadexzhao](https://jadexzhao.github.io/jadexzhao/)).

Local repo: `~/Documents/matchaxmoxie/`

---

## What ships on Pages today

| Area | URL path | Notes |
| --- | --- | --- |
| Informatics hub | `/` · `index.html` | Course grid, IU Informatics blurb, co-create link |
| Course pages | `/courses/*.html` | I101, I245, I300, I345, I308, ServeIT, public health, Kelley, career prep (I301), co-create |
| I211 code videos | `/i211.html` | Weeks 1 to 6 (embeds when Drive IDs exist) |
| Handoffs hub | `/handoffs.html` | Family / small org guides + worksheets |
| Platform guides | `/handoff-*.html` | Facebook, builders, POS, DoorDash, CapCut |
| Markdown sources | `/handoffs/*.md` | Paste into Word for PDF export |
| SEO | `/sitemap.xml`, `/robots.txt`, `/humans.txt` | Submit sitemap in Google Search Console if you want indexing |

**Deploy:** `site/` is the Pages artifact (GitHub Actions). **Static HTML/CSS/JS only** ... no Vite, no npm build on publish.

---

## Four doors (do not merge)

| Door | URL | Job on matchaxmoxie |
| --- | --- | --- |
| **matchaxmoxie** | this site | Classroom + informatics portfolio + handoffs |
| **jadexzhao** | https://jadexzhao.github.io/jadexzhao/ | Technical proof / ships |
| **LinkedIn** | https://www.linkedin.com/in/zhao-langxi/ | Hire-facing narrative (IU Pages retired) |
| **zhao-langxi** | https://zhao-langxi.github.io/zhao-langxi/ | Essays / BTS |

Cross-link in one line; do not paste the whole hire stack here.

---

## GitHub profile · manual fields

**Pins (up to six):**

| Priority | Repo | Why |
| --- | --- | --- |
| 1 | `matchaxmoxie/matchaxmoxie` | IU informatics portfolio + handoffs (this Pages site) |
| 2 | `jadexzhao/jadexzhao` | Shipped portfolio |
| 3 | `jadexzhao/pstickers24` | Family restaurant site ship |

**matchaxmoxie account bio (suggested):**

```
Jade Zhao · IU Luddy Informatics · 🍪 cookie classroom · course portfolio + website handoffs
```

**Website field:** `https://matchaxmoxie.github.io/matchaxmoxie/`

**jadexzhao account bio** (hire door ... keep Digital Humans / builder centred; edit on GitHub only):

```
Informatics @ IU Luddy · Digital Humans · human-centered AI & business tech · May 2027
```

**Social (public):** Instagram [@zhao.langxi](https://instagram.com/zhao.langxi) · LinkedIn [zhao-langxi](https://www.linkedin.com/in/zhao-langxi/)

---

## Edit and publish workflow

1. Change files under `site/` (HTML, CSS, `handoffs/*.md`, assets).
2. Optional local preview: `scripts/serve.sh` (serves `site/`).
3. Commit and push `main` ... workflow deploys when `site/**` changes.

```bash
cd ~/Documents/matchaxmoxie
git add site
git commit -m "文档：简短说明本次 site 变更"
git push origin main
```

Path filter: only `site/**` and `.github/workflows/pages.yml` trigger deploy. **Actions → Deploy GitHub Pages → Run workflow** for a manual republish.

SSH remote on this machine is usually the **matchaxmoxie** GitHub account.

---

## Pages architecture (keep this)

| Item | Reality |
| --- | --- |
| Publish path | `site/` uploaded as artifact |
| Build step | none at deploy time |
| `base: '/matchaxmoxie/'` | GitHub project Pages subpath ... use root-relative links in HTML (`courses/i101.html`, not `/courses/...`) |
| Vite / Astro | **not** in this repo yet. Stay static until course artifacts and handoff PDFs are stable. |
| 404 | `site/404.html` branded miss page |

Sister repo `jadexzhao/jadexzhao` uses a different layout (briefcase + Vite duck-farm). Do not copy that base path here.

---

## Static + templates (planned, same URLs)

Goal: easier edits without changing the deploy story.

1. **Shared layouts** for course pages and handoff guides (same matcha CSS).
2. **One nav/footer source** so updates are not copied across 26 files.
3. **Pre-publish check** ... broken internal links, missing `meta description`, images without `alt`.

Implementation will be a **small build-time script** that writes plain HTML into `site/`. Published output stays static; no runtime framework on Pages.

Until that exists, edit HTML directly and keep `sitemap.xml` in sync when you add routes.

---

## Handoff PDFs

Sources: `site/handoffs/handoff-*.md` and worksheets under `site/handoffs/worksheets/`.  
Export: open in Word → PDF → save beside guides (e.g. `handoff-facebook.pdf`).  
Refresh notes: `site/handoffs/HOW-TO-REFRESH.md`

Helper script (optional): `scripts/generate-handoff-pdfs.py` if `pandoc` is installed locally.

---

## I211 Drive folder (code conversations)

Shared folder (local reference):  
https://drive.google.com/drive/folders/1QEgqdYcMswp5-B1wedybTgnZwZtFFPzP

Embed file IDs on `i211.html` when week 6 (or other) MP4s are ready.

---

## Co-create pages

Workflow and prompt live at:  
https://matchaxmoxie.github.io/matchaxmoxie/courses/co-create.html

Draft in chat → verify against `jlzhao2023/by-term-courses/` → paste into `site/courses/` → build/sitemap if needed → push.
