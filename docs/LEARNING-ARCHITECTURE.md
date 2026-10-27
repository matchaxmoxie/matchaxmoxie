# matchaxmoxie · learning archive (source of truth)

**Door job:** Organised, public **learning library** ... not a second jadexzhao hire portfolio.

**Value:** How Jade learns, documents technical work, explains decisions, and makes information usable for someone else.

**Do not:** Duplicate professional case studies from jadexzhao · migrate frameworks · paste zhao-langxi robotics essays.

---

## Three visitor jobs

1. **Find coursework quickly** (by term, course code, topic)
2. **Understand what each project demonstrates** (problem, methods, artefact type, honest limits)
3. **Use handoff guides** (family-in-use vs reference-only; MD / HTML / PDF agree)

---

## Homepage hierarchy

| Block | Job |
| --- | --- |
| Kicker | MATCHAXMOXIE · LEARNING ARCHIVE |
| H1 | A place for the work behind the work. |
| Lead | Course projects, technical notes, practical guides · Informatics, design, business technology |
| **Courses** | Learning by term → `#courses-heading` / course grid |
| **Projects** | What I made → jadexzhao ships + on-site demos (I211, scratch) |
| **Handoffs** | Guides to keep things running → `handoffs.html` |

---

## Course page template (every `courses/*.html`)

Each page should answer:

1. **Short intro** ... what the course was, when, format (solo / team)
2. **What you learned** ... concepts, not grade bragging
3. **Selected artefacts** ... each labelled: presentation · group assignment · prototype · screenshot · external link · mock-up (not a live product)
4. **How you applied concepts** ... one concrete example
5. **What you'd do differently now** ... one honest line

**Artefact rule:** A Facebook campaign mock-up is **not** a website homepage. Label artefact types in plain language.

---

## Handoffs (priority work)

1. MD, HTML, and PDF agree on steps and warnings
2. Hub sections: **Start here** · **Family uses** · **Reference library**
3. Every guide: what they can change · what never to change · account owner · who to contact
4. Missing PDFs (e.g. Facebook) ... export or remove TODO from public hub

See `site/handoffs/HOW-TO-REFRESH.md`.

---

## Navigation (lightweight)

- Topbar: Home · Courses (anchor) · Code videos · Handoffs · Ships (jadexzhao)
- Footer: same + door switcher (matchaxmoxie · jadexzhao · zhao-langxi)
- Breadcrumbs on course + handoff pages (add incrementally)
- Optional: term filter on course grid (JS or static sections later)

---

## Publishing

- Static HTML/CSS · GitHub Pages
- Before push: link check, PDF paths, image paths (`scripts/check-site.mjs` when present)
- Co-Create workflow documented on `courses/co-create.html` ... no product names on student-facing pages per local rules

---

## Build order (agreed)

1. Finish handoff PDFs + verify links  
2. Standardise course pages to template  
3. Homepage learning directory (three destinations)  
4. Term/topic filter if still needed after (2)
