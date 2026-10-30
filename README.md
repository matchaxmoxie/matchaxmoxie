# matchaxmoxie

**凤凰 · phoenix · cookie classroom**

Making STEM a little less intimidating.

This is a student-kept classroom, not a second résumé. If you want to learn Python, read an Informatics note, or keep a small website running, start here.

| | |
| --- | --- |
| **Live classroom** | https://matchaxmoxie.github.io/matchaxmoxie/ |
| **Ships and résumé** | https://jadexzhao.github.io/jadexzhao/ |
| **Photographs and days** | https://zhao-langxi.github.io/zhao-langxi/ |
| **How the classroom is built** | [docs/LEARNING-ARCHITECTURE.md](./docs/LEARNING-ARCHITECTURE.md) |
| **How to publish** | [PUBLISH.md](./PUBLISH.md) |
| **How to help** | [CONTRIBUTING.md](./CONTRIBUTING.md) |

## What this door is for

Three jobs, one site:

1. **University learning archive** ... real IU coursework Jade already did, labelled as coursework
2. **Beginner coding classroom** ... I211 Python videos and one written Python lesson with a real in-browser run
3. **Shared STEM notes** ... independently authored notebook pages, Explore guides, and handoffs anyone can read without an account

Jade Zhao keeps the site. The useful part is the lessons, not her job titles.

## Start here (live on Pages)

| Path | What you get | Status |
| --- | --- | --- |
| [Python 01 · variables](https://matchaxmoxie.github.io/matchaxmoxie/learn/python/variables.html) | Written lesson plus in-browser Python | Independently authored. Requires JavaScript and a CDN load for Run. |
| [I211 Python videos](https://matchaxmoxie.github.io/matchaxmoxie/i211.html) | Code conversation recordings | Weeks 1 to 5 ready. Week 6 is a placeholder until Drive IDs exist. |
| [Notebook](https://matchaxmoxie.github.io/matchaxmoxie/notebook/) | Course notes plus “explained earlier” pages | Coursework stays labelled as coursework. |
| [Explore](https://matchaxmoxie.github.io/matchaxmoxie/explore/) | Informatics, first GitHub repo, asking for help | No invented campus programmes. |
| [Handoffs](https://matchaxmoxie.github.io/matchaxmoxie/handoffs.html) | Facebook, site builders, POS, worksheets | Still published. Not the front door. |

## Learning pathways

| Pathway | What is published |
| --- | --- |
| **Python** | Written lesson 01 plus I211 weeks 1 to 5 |
| **Web development** | Notebook note and MDN links. No live HTML editor yet. |
| **Git and GitHub** | First-repository guide. Not a full branching course. |

## What was retired

- **Scratch studio** is off the homepage. `scratch-play.html` still exists and is noindex. Starters stay under `site/scratch-projects/` as archive.
- **`site/content/fase-26-27/`** is gone from this repository. Do not recreate FASE MAP, protégé, or office material here.
- There is no AI tutor, login wall, or fake catalogue of unfinished weeks.

## Local preview

```bash
./scripts/serve.sh
node scripts/check-site.mjs
```

`serve.sh` serves `site/` (default port 8080). The checker walks HTML under `site/` for missing meta descriptions and broken relative links.

Static HTML. GitHub Actions uploads `site/` to Pages on push to `main`. No Vite build.

## Licence

Public pages. The only licence file in-tree is TurboWarp Scaffolding's MPL 2.0 under `site/scratch-player/`. There is no root licence, so do not call the whole classroom open source. Beginner pull requests are still welcome; Jade reviews before merge.
