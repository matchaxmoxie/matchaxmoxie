# matchaxmoxie audit

Local repo: `~/Documents/matchaxmoxie/`  
Live: https://matchaxmoxie.github.io/matchaxmoxie/  
Checker: `node scripts/check-site.mjs` (HTML under `site/` only)

## Addendum · 30 Oct 2026

- Homepage three-door classroom (I211 / notes / handoffs) is still the live front door.
- `site/content/fase-26-27/` remains absent. Do not recreate it.
- Scratch is off the public nav. `scratch-play.html` is archive / noindex.
- `site/learn/`, `site/notebook/`, and `site/explore/` are on `main` and live under those paths. Homepage nav still leads with I211, notes, and handoffs.
- Facebook handoff PDF is still missing.
- Canonical résumé for hire work is [jadexzhao resume.pdf](https://jadexzhao.github.io/jadexzhao/resume.pdf), not this classroom.

---

## Original pass · 26 Oct 2026

## Publishing pipeline (verified)

| Item | Evidence |
| --- | --- |
| **Deployed tree** | Entire `site/` folder (`.github/workflows/pages.yml` → `upload-pages-artifact` path `site`) |
| **Not deployed** | Repo root `index.html` (redirect to `site/` for local only), `content/` at repo root, `docs/`, `latex/`, `html-plain/`, `scripts/` |
| **Build step** | None; `touch site/.nojekyll` only |
| **Trigger** | Push to `main` when `site/**` or workflow changes |

**Implication:** Anything under `site/` is public, including `site/content/` and `site/resume.pdf`, unless removed or blocked at host level.

---

## Executive summary

| Priority | Finding |
| --- | --- |
| **P0** | `site/content/fase-26-27/` was removed from the working tree. It was gitignored, not on `origin/main`, and must not be recreated in this repository. |
| **P0** | Missing `handoffs/handoff-facebook.pdf` while hub lists Facebook as primary family guide. |
| **P1** | Homepage hub (Courses / Projects / Handoffs) | **Shipped** 26 Oct 2026 (`6389b45`) |
| **P1** | Handoff HTML styling uneven (Facebook redesigned; others thinner). Markdown `**` literals still in some POS guides. |
| **P1** | No site-wide course template (nav, “mock-up vs live”, reflection blocks vary). |
| **P1** | `PUBLISH.md` / `humans.txt` IU Pages | **Shipped** (LinkedIn + jadexzhao résumé) |
| **P2** | Sitemap omits `scratch-play.html` (noindex OK), no filter/search on courses. |
| **P2** | `co-create.html` names ChatGPT; acceptable for process transparency but conflicts with hire-site no-brand rule on jadexzhao only. |
| **P2** | `site/resume.pdf` on classroom site; [VERIFY] canonical résumé is jadexzhao. |

ChatGPT’s “campus survival / four-year path / bars” pages are **not** in current `site/*.html`; those may be historical README promises or unshipped `html-plain/`. Do not treat as live defects.

---

## Page inventory (published HTML)

| File | URL | Purpose | Severity notes |
| --- | --- | --- | --- |
| `site/index.html` | `/` | Learning archive hub | Shipped hub (26 Oct 2026) |
| `site/i211.html` | `/i211.html` | Code conversation embeds | [VERIFY] Drive IDs for all weeks |
| `site/handoffs.html` | `/handoffs.html` | Handoff directory | P0: Facebook PDF gap |
| `site/handoff-*.html` (10) | `/handoff-….html` | Platform guides | P1: style parity; confirm “family uses” vs reference |
| `site/courses/*.html` (11) | `/courses/…` | Course portfolios | P1: standardise sections; kelley had broken I453 link (fixed) |
| `site/courses/stub.html` | `/courses/stub.html` | Legacy anchors | noindex; not in sitemap |
| `site/scratch-play.html` | `/scratch-play.html` | Retired | noindex |
| `site/404.html` | (error) | Branded 404 | OK |

---

## Handoffs · version matrix

| Guide | HTML | MD | PDF | Notes |
| --- | --- | --- | --- | --- |
| Facebook | Yes | Yes | **Missing** | P0 export PDF |
| CapCut, builders, POS | Yes | Yes | Yes | Re-export after MD edits |
| Worksheets | N/A | Yes | Yes | |
| Canonical rule | `site/handoffs/*.md` → Word → PDF per `HOW-TO-REFRESH.md` | | | |

---

## Cross-site links

| Target | Status |
| --- | --- |
| jadexzhao ships / projects | Linked from homepage |
| zhao-langxi | Footer site-switcher |
| IU Pages | Retired; LinkedIn + jadexzhao résumé |
| LinkedIn | Add where narrative needed |

---

## Accessibility / QA (manual)

- Skip links present on main templates.
- Contrast toggle: not site-wide (classroom CSS only).
- Keyboard/mobile: not certified this pass.
- Run checker before push: `node scripts/check-site.mjs`.

---

## Safe fixes applied (local, not committed)

- `kelley.html`: removed broken `i453.html` link.
- `humans.txt`, `PUBLISH.md`: IU Pages → LinkedIn + jadexzhao résumé (shipped).
- `404.html`, `scratch-play.html`, `courses/stub.html`: meta descriptions.
- `robots.txt`: `Disallow: /content/` (mitigation only; files still downloadable).
- `scripts/check-site.mjs`: new.

---

## Recommended next week

1. **Privacy:** `site/content/fase-26-27/` removed locally. Do not add it back.
2. Export `handoff-facebook.pdf`; spot-check PDFs against MD.
3. Push homepage hub + CSS when copy approved.
4. Course page template (one partial or documented section order).
5. Optional: client-side course filter (term/tag) without framework migration.
