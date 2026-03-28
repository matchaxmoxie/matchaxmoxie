# Jade Zhao
<!-- markdownlint-disable MD033 -->
<div align="center">

# **Jade Zhao** 🪴
**Informatics and Kelley · Madrid · business–technology–law-minded builder: compliance-aware delivery, vendor &amp; data risk, EU study context. Pink static portfolio + living governance memo. Health / ServeIT / civic. @matchaxmoxie = food on IG.**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-@jadexzhao-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jadexzhao)
[![Instagram](https://img.shields.io/badge/Instagram-@matchaxmoxie-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/matchaxmoxie/)
[![Resume](https://img.shields.io/badge/Resume-PDF-4A4A4A?style=flat)](site/resume.pdf)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-e85a9e?style=flat&logo=github)](https://matchaxmoxie.github.io/matchaxmoxie/)

<br/>

<sub><b>LaTeX to PDF</b> (placeholder PDFs in <code>site/</code> until you compile and swap)</sub><br/>
[![Profile PDF](https://img.shields.io/badge/Profile-PDF-e85a9e?style=flat)](site/jade-zhao-profile-full.pdf)
[![Quotes PDF](https://img.shields.io/badge/Quotes-PDF-e85a9e?style=flat)](site/jade-zhao-quotes-principles.pdf)
[![Pillars PDF](https://img.shields.io/badge/Pillars-PDF-e85a9e?style=flat)](site/jade-zhao-three-pillars.pdf)
[![Statement PDF](https://img.shields.io/badge/Statement-PDF-e85a9e?style=flat)](site/jade-zhao-inclusive-tech-statement.pdf)
[![Philosophy PDF](https://img.shields.io/badge/Philosophy-PDF-e85a9e?style=flat)](site/jade-zhao-philosophy-mentorship.pdf)
[![Résumé TeX PDF](https://img.shields.io/badge/Résumé%20%28TeX%29-PDF-4A4A4A?style=flat)](site/jade-zhao-resume.pdf)

</div>

**Layout:** This **`README.md`** is the only file at `matchaxmoxie/` root. Everything else lives in **`site/`**, **`latex/`**, **`scripts/`**, or **`docs/`**.

**Live site:** [matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/) (hand-written **`site/index.html`**). The homepage reads like a **product and governance memo**: **business–technology–law** triangulation (ToS/DPA awareness, institutional policy, HIPAA- and WCAG-adjacent norms, EU digital rulemaking as scan input), problem framing, stakeholders, SWOT, vendor map—plus **Cursor vs. agents** at [`#cursor-and-agents`](https://matchaxmoxie.github.io/matchaxmoxie/#cursor-and-agents). Long-form narrative: [`latex/jade-zhao-profile-full.tex`](latex/jade-zhao-profile-full.tex).

---

## Product lens (how I talk about the work)

- **Stakeholders first:** first-gen students, patients and clinics, nonprofits, hiring managers, and collaborators each need different evidence—and often different **policy or contractual** hooks.
- **Requirements mindset:** accessibility and ethics show up as **non-functional requirements**, not a late QA panic; regulated-adjacent work gets **audit-style traceability**.
- **Business–technology–law:** vendor terms, academic integrity, HIPAA-shaped lab norms, **GDPR/EU rulemaking** as environmental scan, **IP and attribution** for AI-assisted work—**risk-aware shipping** in plain language.
- **Strategy tools:** SWOT, PEST (+ legal/regulatory), traceability (same discipline as `docs/INDEX.md` in the UCM repo).
- **Delivery:** small shippable slices, documented assumptions, human sign-off when stakes are high.

---

## Transparent stack (Cursor, AI, agents)

**Yes, I use Cursor. Yes, I use AI and agentic workflows.** Full write-up: **“How I build and ship”** in [`site/index.html`](site/index.html) (`#how-i-work`).

**Cursor vs. agents (quick read):**

- **Cursor** — AI-native editor (chat, completions, repo context, `.cursorrules`). I ground work in real files and read every diff before it counts as mine.
- **Agents** — Supervised multi-step runs in that editor: plan → tool use → multi-file edits → **human review**. Not a substitute for honor code, HIPAA judgment, or accessibility sign-off.

Deep dive still lives in **`#how-i-work`**; tooling crib sheet **`#cursor-and-agents`**; **business–technology–law** triangulation **`#business-tech-law`**.

| Topic | What you will find there |
|-------|---------------------------|
| Business–technology–law | Triangulation: ToS/subprocessors, institutional “private law,” sector norms (HIPAA, WCAG/508), EU links, IP, provenance |
| Cursor and agents | Two-card crib sheet: editor vs. agentic loop, red lines, optional MCP |
| Product brief | Problem, users, in/out of scope, governance row, success metrics for this disclosure |
| Market context | iPhone / Facebook / Amazon / Tesla style hype cycles vs generative AI today |
| Vocabulary | AI vs copilot vs agentic (chained tools, human supervises) |
| Practice | What an agent does in my editor; health informatics and ServeIT as **high-stakes products** |
| Honesty | Hallucinations, bad prompts, reverting commits, golden-retriever transparency |
| School habits | IU Luddy, Kelley exposure, UCM five-course monorepo discipline, PEST or SWOT-style thinking |
| SWOT | Personal strengths / weaknesses / opportunities / threats (living **risk register** for agent use) |
| More | Vendor map (Cursor, NIST AI RMF), **operating principles** runbook, **backlog** of open questions |

**Philosophy:** Do not fear the tools. Be **clear** about them. I own what ships; agents speed up drafts, not accountability.

---

## Folders

| Folder | Contents |
|--------|----------|
| **`site/`** | Pages root: [`index.html`](site/index.html), [`styles.css`](site/styles.css), assets, PDFs, [`LICENSE`](site/LICENSE) (MIT), [`README.md`](site/README.md), [`CONTRIBUTING.md`](site/CONTRIBUTING.md) |
| **`latex/`** | `jade-zhao-*.tex`; [`BUILD.md`](latex/BUILD.md) for `pdflatex` and copying into `site/` |
| **`scripts/`** | [`publish-site.sh`](scripts/publish-site.sh): subtree push of **`site/`** to [matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) (needs `matchaxmoxie` remote and SSH) |
| **`docs/`** | [`.markdownlint.yaml`](docs/.markdownlint.yaml) for Markdown style |

### Quick start (local preview)

```bash
cd matchaxmoxie/site
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080`.

### LaTeX sources

| File | Role |
|------|------|
| [`jade-zhao-header.tex`](latex/jade-zhao-header.tex) | Contact block; `\input{}` after `\begin{document}` |
| [`jade-zhao-pink-highlight.tex`](latex/jade-zhao-pink-highlight.tex) | Pink highlights; `\input{}` in preamble before `hyperref` |
| [`jade-zhao-resume.tex`](latex/jade-zhao-resume.tex) | Compact résumé |
| [`jade-zhao-profile-full.tex`](latex/jade-zhao-profile-full.tex) | Long profile: who I am, Matchaxmoxie, quotes, pillars, experience, projects |
| [`jade-zhao-quotes-principles.tex`](latex/jade-zhao-quotes-principles.tex) | Quotes and principles, first person |
| [`jade-zhao-three-pillars.tex`](latex/jade-zhao-three-pillars.tex) | Numbered pillars (community, technical depth, first gen and access) |
| [`jade-zhao-inclusive-tech-statement.tex`](latex/jade-zhao-inclusive-tech-statement.tex) | Short access and values statement |
| [`jade-zhao-philosophy-mentorship.tex`](latex/jade-zhao-philosophy-mentorship.tex) | Mentorship, clients, shipping usable systems |
| [`regenerate-placeholder-pdfs.py`](latex/regenerate-placeholder-pdfs.py) | Optional stub PDFs for `site/` |

**Build:** See [`latex/BUILD.md`](latex/BUILD.md). Typical flow: from `matchaxmoxie/latex/` run `pdflatex jade-zhao-resume.tex` (no images); run twice if the log asks; copy outputs to **`site/`** so badges and [`site/index.html`](site/index.html) links stay valid. The homepage **Download resume** button uses **`site/resume.pdf`** (sync from `jade-zhao-resume.pdf` per BUILD).

---

## Technical stack

**Languages and frameworks:** `Python` · `TypeScript` · `React` · `Node.js` · `SQL` · `D3.js` · `PostgreSQL`

**Tools and platforms:** Git · **Cursor** (editor + agent workflows; [disclosure](https://matchaxmoxie.github.io/matchaxmoxie/#how-i-work)) · Figma · WordPress · WCAG 2.1 AA/AAA · WAVE · Axe DevTools

**Specializations:**

- **Product and delivery:** Discovery notes, lightweight specs, stakeholder alignment, shippable increments
- **Full-stack:** Accessible web products people actually use
- **Ethical AI and ML:** Humans in the loop, **governance- and procurement-friendly** language, fewer creepy surprises
- **Data viz:** Honest charts (civic and health-flavored contexts)
- **Civic tech:** Nonprofit and city work that should not suck to use

---

## Research and cross-cultural skills

- **User-centered research:** Mixed methods for inclusive design
- **Cross-cultural analysis:** Spain and US tech adoption, fintech, student access
- **Field research:** Madrid startup and smart-city context
- **Languages:** Native English, professional Mandarin, conversational Spanish

---

## Leadership and collaboration

- **Mentorship:** First-gen peers, tech literacy, career readiness
- **Stakeholder alignment:** Technical work tied to org goals
- **Advocacy:** Accessibility, ethical AI, tech for good
- **Adaptability:** Interdisciplinary, fast-moving teams

---

## Experience

**Software Engineer** · *Self-directed, Jan 2026 to present*

- Full-stack apps, clean architecture, accessibility
- Open code for civic tech and nonprofits

**AI Research Assistant** · *IU Luddy Proactive Health Informatics, May 2024 to Dec 2025*

- HIPAA-aware data systems for patient monitoring
- Ethical AI safeguards for health informatics

**Machine Learning Researcher** · *Luddy ServeIT Clinic, Jan 2024 to Dec 2025*

- Nonprofit-facing AI with bias detection and community impact
- Cross-functional, transparent, user-centered delivery

**Assistant Instructor** · *IU Office of Student Life, Aug 2023 to Dec 2025*

- First-gen students: tech skills and academic success
- Advisor workflows automated where it helped

---

## Education

**B.S. in Informatics** (Business and Society)  
*Indiana University Luddy School of Informatics, Computing, and Engineering*

- Hudson and Holland Scholar
- Dean’s List
- Study abroad: Madrid, Spain (Spring 2026)

---

## Beyond code

- **Film photography:** Slow, deliberate, no undo
- **Jade plants and side projects:** Keeping both alive
- **Current read:** Ask me
- **Madrid semester:** Culture, tech scene, café con leche

---

<div align="center">
<small><i>Building things that feel kind in your hands.</i> 🌷</small>
</div>

---

## GitHub Pages and deploy

**What ships:** Only **`site/`** is the public site (`index.html`, `styles.css`, `LICENSE`, PDFs, images). **`latex/`**, **`scripts/`**, and **`docs/`** are not on the live URL.

**Public mirror:** [matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) holds a **subtree** of **`matchaxmoxie/site/`** at repo root. After commits in the UCM monorepo, run **`scripts/publish-site.sh`**. On GitHub: **Settings → Pages →** branch **`main`**, folder **`/` (root)**.

**UCM monorepo:** [`.github/workflows/matchaxmoxie-pages.yml`](../.github/workflows/matchaxmoxie-pages.yml) deploys **`matchaxmoxie/site`** when `matchaxmoxie/**` or that workflow changes. **Settings → Pages → Source: GitHub Actions**; confirm Actions is green. Manual run: **Actions → Deploy matchaxmoxie to Pages → Run workflow**.

*(If you pointed Pages at this monorepo without Actions, you would use folder **`/matchaxmoxie/site`**; the usual setup here is Actions.)*

**Meta tags:** [`site/index.html`](site/index.html) sets `canonical`, `og:url`, and `og:image`. Update those if the repo name or custom domain changes.
