# Building PDFs for the site

Sources are `jade-zhao-*.tex` in this **`latex/`** folder. Outputs for the live site go in **`../site/`** with the same basename as the HTML download links.

## Requirements

- `pdflatex` (TeX Live, MacTeX, MiKTeX, etc.)
- Pink marker highlights: sources `\input{jade-zhao-pink-highlight}` so you can write `\hl{like this}` or `\pinkhl{like this}` in the body (soft pink, matchaxmoxie site palette). Avoid `\hl` inside math or verbatim.

## Shared style snippet

| File | Role |
|------|------|
| [`jade-zhao-pink-highlight.tex`](jade-zhao-pink-highlight.tex) | `xcolor` + `soul`: `\sethlcolor{MatchaxMoxiePink}` (`#FFD6E8`). Loaded before `hyperref` in each `jade-zhao-*.tex`. |
| [`jade-zhao-header.tex`](jade-zhao-header.tex) | Contact block; `\input{}` after `\begin{document}` |

## One file

```bash
cd matchaxmoxie/latex
pdflatex -interaction=nonstopmode jade-zhao-resume.tex
```

Run **twice** if you use cross-references and the log asks for it.

Copy to **`site/`**:

```bash
cp jade-zhao-resume.pdf ../site/jade-zhao-resume.pdf
# Homepage “Download resume” button uses resume.pdf:
cp jade-zhao-resume.pdf ../site/resume.pdf
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

`jade-zhao-header.tex` and `jade-zhao-pink-highlight.tex` are fragments; don’t compile them alone.

## Placeholders

The repo may ship minimal placeholder PDFs under **`site/`** so links never 404. Replace them with your real builds when ready.

## Copy note (optional)

If you add or edit body text in the `.tex` files, keeping **plain punctuation** (periods, commas, **and** instead of long dashes) matches the voice of [`../site/index.html`](../site/index.html). LaTeX `---` renders as an em dash; prefer rephrasing if you want the same feel as the static site.
