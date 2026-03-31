# Building PDFs for the site

Sources are in **`latex/docs/`** (`jade-zhao-*.tex`) and shared snippets are in **`latex/shared/`**. Outputs for the live site go in **`../site/`** with the same basename as the HTML download links.

## Requirements

- `pdflatex` (TeX Live, MacTeX, MiKTeX, etc.)
- Pink marker highlights: sources `\input{../shared/jade-zhao-pink-highlight}` so you can write `\hl{like this}` or `\pinkhl{like this}` in the body (soft pink, matchaxmoxie site palette). Avoid `\hl` inside math or verbatim.

## Shared style snippet

| File | Role |
|------|------|
| [`shared/jade-zhao-pink-highlight.tex`](shared/jade-zhao-pink-highlight.tex) | `xcolor` + `soul`: `\sethlcolor{MatchaxMoxiePink}`. Loaded before `hyperref` in each `jade-zhao-*.tex`. |
| [`shared/jade-zhao-header.tex`](shared/jade-zhao-header.tex) | Contact block; `\input{}` after `\begin{document}` |

## One file

```bash
cd matchaxmoxie/latex/docs
pdflatex -interaction=nonstopmode jade-zhao-resume.tex
```

Run **twice** if you use cross-references and the log asks for it.

Copy to **`site/`**:

```bash
cp jade-zhao-resume.pdf ../../site/jade-zhao-resume.pdf
# Homepage “Download resume” button uses resume.pdf:
cp jade-zhao-resume.pdf ../../site/resume.pdf
```

## All portfolio PDFs

Repeat `pdflatex` for each:

| TeX source | Copy to `site/` as |
|------------|-------------------|
| `jade-zhao-profile-full.tex` | `jade-zhao-profile-full.pdf` |
| `jade-zhao-quotes-principles.tex` | `jade-zhao-quotes-principles.pdf` |
| `jade-zhao-three-pillars.tex` | `jade-zhao-three-pillars.pdf` |
| `jade-zhao-inclusive-tech-statement.tex` | `jade-zhao-inclusive-tech-statement.pdf` |
| `jade-zhao-philosophy-mentorship.tex` | `jade-zhao-philosophy-mentorship.pdf` |
| `jade-zhao-resume.tex` | `jade-zhao-resume.pdf` and `resume.pdf` |

`../shared/jade-zhao-header.tex` and `../shared/jade-zhao-pink-highlight.tex` are fragments; don’t compile them alone.

## Placeholders

The repo may ship minimal placeholder PDFs under **`site/`** so links never 404. Replace them with your real builds when ready.

## Copy note (optional)

If you add or edit body text in the `.tex` files, keeping **plain punctuation** (periods, commas, **and** instead of long dashes) matches the voice of [`../site/index.html`](../site/index.html). LaTeX `---` renders as an em dash; prefer rephrasing if you want the same feel as the static site.

The **canonical** long-form explanation of **Cursor**, **agents**, **business--technology--law** triangulation, **SWOT**, and IU or UCM-shaped habits lives on the **static site**: [`#cursor-and-agents`](../site/index.html) (tooling), [`#business-tech-law`](../site/index.html) (governance vocabulary), then [`#how-i-work`](../site/index.html) for the full memo. PDFs here stay short; point readers to the site for the full disclosure.
