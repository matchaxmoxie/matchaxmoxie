# Building PDFs for the site

Sources are `jade-zhao-*.tex` in this **`latex/`** folder. Outputs for the live site go in **`../site/`** with the same basename as the HTML download links.

## Requirements

- `pdflatex` (TeX Live, MacTeX, MiKTeX, etc.)

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

`jade-zhao-header.tex` is `\input{}` by other files; don’t compile it alone.

## Placeholders

The repo may ship minimal placeholder PDFs under **`site/`** so links never 404. Replace them with your real builds when ready.
