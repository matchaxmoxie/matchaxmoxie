# matchaxmoxie · profile + Pages publish

**GitHub:** https://github.com/matchaxmoxie/matchaxmoxie  
**Live site:** https://matchaxmoxie.github.io/matchaxmoxie/  
**Who this is for:** learners, IU peers, and mentees. Hire-facing work lives on [jadexzhao](https://jadexzhao.github.io/jadexzhao/).

Local repo: `~/Documents/matchaxmoxie/`

## What ships on Pages today

| Area | URL path | Notes |
| --- | --- | --- |
| Classroom hub | `/` · `index.html` | I211, notes, handoffs |
| Course pages | `/courses/*.html` | I101, I245, I300, I345, I308, ServeIT, public health, Kelley, career prep, co-create |
| I211 code videos | `/i211.html` | Weeks 1 to 5; week 6 placeholder |
| Handoffs hub | `/handoffs.html` | Family / small org guides + worksheets |
| Platform guides | `/handoff-*.html` | Facebook, builders, POS, DoorDash, CapCut |
| Markdown sources | `/handoffs/*.md` | Paste into Word for PDF export |
| Scratch playground | `/scratch-play.html` | Retired from homepage nav; noindex |
| Learn hub | `/learn/` | One Python lesson plus I211 pointer |
| Notebook | `/notebook/` | Course notes and independently written explainers |
| Explore | `/explore/` | First GitHub repo, Informatics, asking for help |
| SEO | `/sitemap.xml`, `/robots.txt`, `/humans.txt` | Update sitemap when you add a public route |

**Source only (not a URL):** `curriculum/` holds lesson JSON. `site/classroom/` is not a documented public hub.

**Never deploy:** `content/fase-26-27/`, protégé notes, office PDFs.

**Deploy:** `site/` is the Pages artifact (GitHub Actions). Static HTML/CSS/JS only. No Vite, no npm build on publish.

## Three doors (do not merge)

| Surface | URL | Job |
| --- | --- | --- |
| **matchaxmoxie** | this site | What she teaches and shares |
| **jadexzhao** | https://jadexzhao.github.io/jadexzhao/ | What she has built |
| **zhao-langxi** | https://zhao-langxi.github.io/zhao-langxi/ | What she notices and photographs |
| **LinkedIn** | https://www.linkedin.com/in/zhao-langxi/ | Hire narrative |

IU Pages is retired. Cross-link in one line.

## GitHub profile · manual fields

There is no separate `matchaxmoxie/.github` profile repository in this workspace. Edit the user or org bio on GitHub. Suggested classroom bio (not a hire headline):

```
Cookie classroom · I211 Python, Informatics notes, and website handoffs
```

**Website field:** `https://matchaxmoxie.github.io/matchaxmoxie/`

**Pins (up to six), classroom first:**

| Priority | Repo | Why |
| --- | --- | --- |
| 1 | `matchaxmoxie/matchaxmoxie` | This classroom |
| 2 | `jadexzhao/jadexzhao` | Ships (pointer, not the bio) |
| 3 | `jadexzhao/pstickers24` | Family restaurant site |

**jadexzhao account bio** stays on that account (edit on GitHub only). Suggested hire line:

```
Informatics @ IU Luddy · software, accessibility, human-centred AI · May 2027
```

**Social (public):** Instagram [@zhao.langxi](https://instagram.com/zhao.langxi) · LinkedIn [zhao-langxi](https://www.linkedin.com/in/zhao-langxi/)

## Edit and publish

1. Change files under `site/` (HTML, CSS, `handoffs/*.md`, assets).
2. Optional local preview: `./scripts/serve.sh`
3. `node scripts/check-site.mjs`
4. Commit and push `main`. Workflow deploys when `site/**` or `.github/workflows/pages.yml` change.

```bash
cd ~/Documents/matchaxmoxie
git add site
git commit -m "文档：简短说明本次 site 变更"
git push origin main
```

**Actions → Deploy GitHub Pages → Run workflow** for a manual republish.

SSH remote on this machine is usually the **matchaxmoxie** GitHub account.

## Pages architecture

| Item | Reality |
| --- | --- |
| Publish path | `site/` uploaded as artifact |
| Build step | `touch site/.nojekyll` only |
| Subpath | Project Pages at `/matchaxmoxie/`. Use relative links (`courses/i101.html`), not `/courses/...` |
| Vite / Astro | Not in this repo. Stay static. |
| 404 | `site/404.html` |

Sister repo `jadexzhao/jadexzhao` uses `briefcase/` plus a Vite duck-farm. Do not copy that layout here.

## Shared layouts (planned)

Easier edits without changing the deploy story:

1. Shared layouts for course pages and handoff guides (same matcha CSS)
2. One nav/footer source so updates are not copied across many files
3. Keep `node scripts/check-site.mjs` as the pre-publish check

Until a shared layout exists, edit HTML directly and keep `sitemap.xml` in sync when you add routes.

## Handoff PDFs

Sources: `site/handoffs/handoff-*.md` and worksheets under `site/handoffs/worksheets/`.  
Export: open in Word → PDF → save beside the guides.  
**Gap:** Facebook PDF is still missing.  
Refresh notes: `site/handoffs/HOW-TO-REFRESH.md`

Helper script (optional): `scripts/generate-handoff-pdfs.py` if `pandoc` is installed locally.

## I211 Drive folder

Shared folder (local reference):  
https://drive.google.com/drive/folders/1QEgqdYcMswp5-B1wedybTgnZwZtFFPzP

Embed file IDs on `i211.html` when week 6 (or other) MP4s are ready.

## Co-create pages

Workflow lives at:  
https://matchaxmoxie.github.io/matchaxmoxie/courses/co-create.html

Draft → verify against Jade's own course files → paste into `site/courses/` → update sitemap if needed → push.
