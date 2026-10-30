# `site/` · GitHub Pages root

Everything in this folder is what visitors get at  
https://matchaxmoxie.github.io/matchaxmoxie/

**Do not** add a Vite build step for deploy. Edit HTML/CSS here and push; Actions uploads this tree.

| Entry | File | On Pages? |
| --- | --- | --- |
| Classroom hub | `index.html` | Yes |
| Course notes | `courses/` | Yes |
| I211 Python videos | `i211.html` | Yes |
| Handoffs | `handoffs.html`, `handoff-*.html`, `handoffs/` | Yes |
| Library data | `library.json` | Yes |
| SEO | `sitemap.xml`, `robots.txt`, `humans.txt` | Yes |
| Scratch playground | `scratch-play.html` | Yes, noindex, off the homepage |
| Learn / Notebook / Explore | `learn/`, `notebook/`, `explore/` | Yes. Homepage still leads with I211, notes, handoffs. |

`site/content/` is not a public content tree. `content/fase-26-27/` is gitignored and must not reappear.

Learner intro: [../README.md](../README.md)  
Publish steps: [../PUBLISH.md](../PUBLISH.md)
