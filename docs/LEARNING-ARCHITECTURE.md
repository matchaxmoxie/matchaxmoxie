# matchaxmoxie · learning architecture

**Door job:** A public classroom and learning archive. Not a second [jadexzhao](https://jadexzhao.github.io/jadexzhao/) hire portfolio.

**Audience:** Beginners, first-generation and low-income students finding their way into Informatics, and anyone who wants a plain-language note.

**Value:** How Jade learns, writes something down, and makes it usable for the next person.

## Three purposes

| Purpose | What a visitor can do | What is live |
| --- | --- | --- |
| University learning archive | Open a course page and see what the term actually produced | `site/courses/*.html` plus homepage library |
| Beginner coding classroom | Watch I211 videos; work one written Python lesson | `i211.html` and `learn/` |
| Shared STEM notes | Keep a small org site running | `handoffs.html` and platform guides |

Do not duplicate professional case studies from jadexzhao. Do not paste zhao-langxi photographs or essays here.

## Homepage (live)

Shipped 26 Oct 2026 (`6389b45`), still the Pages front door.

| Block | Job |
| --- | --- |
| Kicker | 凤凰 · cookie classroom |
| H1 | Making STEM a little less intimidating. |
| Lead | I211 videos, course notes, handoffs · first-generation and low-income students |
| Start here | I211 · notes · handoffs |
| Library | Filter over `library.json` (real pages only) |
| Handoffs | Guides → `handoffs.html` |

Homepage topbar is still Home · I211 · Notes · Handoffs. Learn, Notebook, and Explore are live routes (`/learn/`, `/notebook/`, `/explore/`) even when they are not the homepage lead.

## Course page template

Every `site/courses/*.html` page should answer:

1. Short intro ... what the course was, when, solo or team
2. What you learned ... concepts, not grade bragging
3. Selected artefacts ... labelled: presentation, group assignment, prototype, screenshot, external link, mock-up
4. One concrete example of using a concept
5. One honest line about what you would do differently

A Facebook campaign mock-up is not a website homepage. Label artefact types in plain language.

## I211 pathway (implemented)

- Page: `site/i211.html`
- Weeks 1 to 5: Drive embeds when IDs exist
- Week 6: placeholder until a file ID is ready
- Coursework recordings, not independently authored tutorials

## Written Python lesson (implemented)

Lesson data lives in `curriculum/` so the classroom runner and the HTML can share one shape.

| Path | Status |
| --- | --- |
| `curriculum/python/01-variables.json` | Source |
| `site/learn/python/variables.html` | Published: explanation, in-browser run, quiz, then Week 1 videos |
| `site/learn/index.html` | Published hub: Python, web intro, Git intro |

Web and Git on that hub are short introductions, not empty tracks pretending to be a full syllabus.

Copy a changed JSON file into `site/learn/data/` before previewing if the page fetches it. The first lesson also embeds the same object so it still reads without JavaScript.

Do not invent I211 snippets. Week 1 videos remain the source for what Jade recorded.

## Notebook and Explore (implemented)

| Folder | Intent |
| --- | --- |
| `site/notebook/` | Course notes plus independently written "I wish someone had explained this" pages |
| `site/explore/` | First GitHub repository, Informatics orientation, asking for help |

Label coursework and independent writing separately. Do not invent weeks.

## Handoffs (priority work, live)

1. Markdown, HTML, and PDF should agree
2. Hub sections: Start here · Family uses · Reference library
3. Every guide: what they can change · what never to change · account owner · who to contact
4. Facebook PDF is still missing; do not treat a hub TODO as a live download

See `site/handoffs/HOW-TO-REFRESH.md`.

## Educational standards (what we actually do)

- Pages work without an account
- Skip links on main templates
- Alt text and headings that a beginner can follow
- `node scripts/check-site.mjs` before publish (meta description + relative links)
- UK spelling in public copy; ranges use "to"; no em dash
- No FASE MAP, protégé names, or payroll material
- No feature that does not work (no fake tutor, no fake progress wall)

Co-Create workflow is documented on `courses/co-create.html`. Keep tool brand names off hire-facing jadexzhao copy; this classroom may name a process when the course requires it.

## Retired and removed

| Item | What to do |
| --- | --- |
| Scratch on the homepage | Keep off the main nav. `scratch-play.html` is noindex archive. |
| `site/content/fase-26-27/` | Removed. Gitignored at `content/fase-26-27/`. Do not recreate. |
| Campus survival / four-year path pages | Not in current `site/*.html`. Do not document as live. |

## Publishing

- Static HTML/CSS · GitHub Pages from `site/`
- Workflow: `.github/workflows/pages.yml`
- Before push: `node scripts/check-site.mjs`
- Preview: `./scripts/serve.sh`

## Build order

1. Homepage learning directory ... **shipped** 26 Oct 2026 (`6389b45`)
2. Finish handoff PDFs + verify links ... Facebook PDF still missing
3. Standardise course pages to the template
4. Add more written lessons only when a real JSON file and page exist. Do not invent a catalogue.
