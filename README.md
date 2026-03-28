# Jade Zhao
<!-- markdownlint-disable MD033 -->
<div align="center">

# **Jade Zhao** 🪴
**Informatics and Kelley · Madrid · access-minded tech, pink static site. Health / ServeIT / civic on the side. @matchaxmoxie = food on IG.**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-@jadexzhao-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jadexzhao)
[![Instagram](https://img.shields.io/badge/Instagram-@matchaxmoxie-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/matchaxmoxie/)
[![Resume](https://img.shields.io/badge/Resume-PDF-4A4A4A?style=flat)](site/resume.pdf)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-e85a9e?style=flat&logo=github)](https://matchaxmoxie.github.io/matchaxmoxie/)

<br/>

<sub><b>LaTeX → PDF</b> (tiny placeholder PDFs in <code>site/</code> until you compile and swap)</sub><br/>
[![Profile PDF](https://img.shields.io/badge/Profile-PDF-e85a9e?style=flat)](site/jade-zhao-profile-full.pdf)
[![Quotes PDF](https://img.shields.io/badge/Quotes-PDF-e85a9e?style=flat)](site/jade-zhao-quotes-principles.pdf)
[![Pillars PDF](https://img.shields.io/badge/Pillars-PDF-e85a9e?style=flat)](site/jade-zhao-three-pillars.pdf)
[![Statement PDF](https://img.shields.io/badge/Statement-PDF-e85a9e?style=flat)](site/jade-zhao-inclusive-tech-statement.pdf)
[![Philosophy PDF](https://img.shields.io/badge/Philosophy-PDF-e85a9e?style=flat)](site/jade-zhao-philosophy-mentorship.pdf)
[![Résumé TeX PDF](https://img.shields.io/badge/Résumé%20%28TeX%29-PDF-4A4A4A?style=flat)](site/jade-zhao-resume.pdf)

</div>

**Layout:** Only this **`README.md`** lives at `matchaxmoxie/` root. Site assets, LaTeX sources, and deploy scripts live in subfolders below.

**Live site:** [matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/) with soft, human copy on **`site/`**. Longer-form source content lives in `latex/jade-zhao-profile-full.tex`.

---

## **Transparent stack (Cursor and agents)**

**Yes, I use Cursor. Yes, I use AI agents.** The public site says it out loud: see **“How I actually work”** in [`site/index.html`](site/index.html) (`#how-i-work`) for agents in plain English, **health informatics and ServeIT** context, the messy part people gloss over (**hallucinations**, tired prompts, **reverting** when wrong), **golden-retriever** collaboration energy, learn-more links (Cursor, docs, **NIST AI RMF**, GitHub source), **tips** (repo rules, **`@file` / paths**, batching, **read the diff**, right-sized models, **high-stakes checklists**, **syllabus and honor code**, rubber-duck the task in two sentences, **disclosure**), and **ideas I’m still sorting out** (portfolio vs lab notebook, when not to automate, teaching without vendor voice).

**Philosophy:** don’t be afraid of the tools. Be **clear** about them. I own what ships; agents accelerate drafts, not accountability.

---

## **📁 Folders**

| Folder | Contents |
|--------|----------|
| **`site/`** | GitHub Pages root: [`index.html`](site/index.html), [`styles.css`](site/styles.css), assets, PDFs, **[`LICENSE`](site/LICENSE)** (MIT), **[`README.md`](site/README.md)** (local preview + links), **[`CONTRIBUTING.md`](site/CONTRIBUTING.md)** |
| **`latex/`** | `jade-zhao-*.tex` sources; **[`BUILD.md`](latex/BUILD.md)** = `pdflatex` + copy paths into `site/` |
| **`scripts/`** | [`publish-site.sh`](scripts/publish-site.sh) pushes **`site/`** to [matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) via `git subtree split` (needs SSH + `matchaxmoxie` remote) |
| **`docs/`** | [`.markdownlint.yaml`](docs/.markdownlint.yaml) (README / profile Markdown style). Deploy notes: this README (**GitHub Pages** below). |

### **Quick start**

```bash
cd matchaxmoxie/site
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080`.

### **`latex/` sources**

| File | Role |
|------|------|
| [`jade-zhao-header.tex`](latex/jade-zhao-header.tex) | Shared contact block + @matchaxmoxie; `\input{}` after `\begin{document}` |
| [`jade-zhao-pink-highlight.tex`](latex/jade-zhao-pink-highlight.tex) | Pink `\hl{...}` / `\pinkhl{...}` (soul + `MatchaxMoxiePink`); `\input{}` in preamble before `hyperref` |
| [`jade-zhao-resume.tex`](latex/jade-zhao-resume.tex) | Compact résumé |
| [`jade-zhao-profile-full.tex`](latex/jade-zhao-profile-full.tex) | Long-form profile: who I am, Matchaxmoxie, quotes, pillars, experience, projects |
| [`jade-zhao-quotes-principles.tex`](latex/jade-zhao-quotes-principles.tex) | Boxed quotes + principles in first person |
| [`jade-zhao-three-pillars.tex`](latex/jade-zhao-three-pillars.tex) | Numbered pillars (community / technical depth / first gen \& access) |
| [`jade-zhao-inclusive-tech-statement.tex`](latex/jade-zhao-inclusive-tech-statement.tex) | Short statement on access and how you want to work |
| [`jade-zhao-philosophy-mentorship.tex`](latex/jade-zhao-philosophy-mentorship.tex) | Mentorship, clients, and shipping usable systems |
| [`regenerate-placeholder-pdfs.py`](latex/regenerate-placeholder-pdfs.py) | Optional: regenerate minimal `site/jade-zhao-*.pdf` stubs |

**Build:** see **[`latex/BUILD.md`](latex/BUILD.md)** for `pdflatex` per file and which PDF names go in **`site/`**. Short version: from `matchaxmoxie/latex/` run `pdflatex jade-zhao-resume.tex` (no images); run twice if references need it; copy outputs into **`site/`** so badges and [`site/index.html`](site/index.html) links stay true. Homepage **Download resume** uses **`site/resume.pdf`** (sync from `jade-zhao-resume.pdf` as in BUILD).

---

## **🔧 Technical Stack**
**Languages and frameworks:**
`Python` · `TypeScript` · `React` · `Node.js` · `SQL` · `D3.js` · `PostgreSQL`

**Tools and platforms:**
Git · Figma · WordPress · WCAG 2.1 AA/AAA · WAVE · Axe DevTools

**Specializations:**
- **Full-stack**: Accessible web things that real people click
- **Ethical AI/ML**: Keeping humans in the loop, fewer creepy surprises
- **Data viz**: Charts that tell the truth (civic + health-ish contexts)
- **Civic tech**: Nonprofit and city stuff that should not suck to use

---

## **🌍 Research and cross-cultural skills**
- **User-Centered Research**: Mixed-methods studies to inform inclusive tech design
- **Cross-Cultural Analysis**: Tech adoption in Spain/US, fintech, and access across student backgrounds
- **Field Research**: Madrid’s startup ecosystem and smart city initiatives
- **Bilingual Communication**: Native English, professional Mandarin, conversational Spanish

---

## **💡 Leadership and collaboration**
- **Mentorship**: Guiding first-gen students in tech literacy and career readiness
- **Stakeholder Alignment**: Bridging technical solutions with organizational goals
- **Advocacy**: Digital accessibility, ethical AI, and tech-for-good initiatives
- **Adaptability**: Thriving in interdisciplinary, fast-paced environments

---

## **🚀 Experience**

**Software Engineer** · *Self-directed, Jan 2026 to present*
- Building full-stack applications with clean architecture and accessibility compliance
- Open-sourcing reusable code for civic tech and nonprofit projects

**AI Research Assistant** · *IU Luddy Proactive Health Informatics, May 2024 to Dec 2025*
- Developed HIPAA-compliant data systems for real-time patient monitoring
- Designed ethical AI safeguards for health informatics applications

**Machine Learning Researcher** · *Luddy ServeIT Clinic, Jan 2024 to Dec 2025*
- Built AI solutions for nonprofits, focusing on bias detection and community impact
- Collaborated with cross-functional teams to deliver transparent, user-centered tools

**Assistant Instructor** · *IU Office of Student Life, Aug 2023 to Dec 2025*
- Mentored first-generation students in tech skills and academic success
- Automated resource-sharing workflows for advisors, improving efficiency

---

## **🎓 Education**
**B.S. in Informatics** (Business and Society) <br/>
*Indiana University Luddy School of Informatics, Computing, and Engineering*
- Hudson and Holland Scholar
- Dean’s List
- Study Abroad: Madrid, Spain (Spring 2026)

---

## **🌱 Beyond Code**
- **Film Photography**: Deliberate, slow, no undos
- **Jade plants and side projects**: Keeping both alive and thriving
- **Current Read**: Ask me!
- **Madrid Semester**: Soaking in the culture, tech scene, and café con leche

---

<div align="center">
<small><i>Building things that feel kind in your hands.</i> 🌷</small>
</div>

---

## **🌐 GitHub Pages**

Published **site root** = everything inside **`site/`** (`index.html`, `styles.css`, `LICENSE`, `README.md`, PDFs, images, etc.). **`latex/`**, **`scripts/`**, and **`docs/`** are not part of the live URL. The public repo [matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) is a **subtree mirror** of **`site/`** at repo root (run **`scripts/publish-site.sh`** from the UCM repo after committing).

- **Live site:** [https://matchaxmoxie.github.io/matchaxmoxie/](https://matchaxmoxie.github.io/matchaxmoxie/)

[`site/index.html`](site/index.html) sets canonical URL and Open Graph / Twitter meta tags. If you rename the repo or add a custom domain, update those tags in `<head>`.

### Public repo [matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) (subtree mirror)

1. Contents of **`matchaxmoxie/site/`** from the monorepo are pushed to the **root** of that repo (`index.html`, `styles.css`, `LICENSE`, …).
2. **Settings → Pages → Source:** branch **`main`**, folder **`/` (root)**.

### UCM monorepo only (this folder layout)

If you pointed Pages at this repo instead of Actions: **Settings → Pages** would use folder **`/matchaxmoxie/site`**. The usual setup here is **GitHub Actions** (below), not that path.

### UCM monorepo (GitHub Actions)

Workflow: [`.github/workflows/matchaxmoxie-pages.yml`](../.github/workflows/matchaxmoxie-pages.yml) uploads **`matchaxmoxie/site`** when `matchaxmoxie/**` or that workflow changes.

1. **Settings → Pages → Source: GitHub Actions**
2. Push and confirm **Actions** is green
3. URL is usually `https://<owner>.github.io/<repo>/` (relative links inside `site/` stay the same)

**Run manually:** **Actions → Deploy matchaxmoxie to Pages → Run workflow**.

If you change the repo name or site URL, update the absolute URLs in the `<head>` of [`site/index.html`](site/index.html) (`canonical`, `og:url`, `og:image`).
