# matchaxmoxie site (GitHub Pages root)

Static **HTML + CSS** only: no build step, no framework. Live at [matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/).

## Run locally

From this folder:

```bash
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080).

## LaTeX sources

The portfolio `.tex` files live in the UCM monorepo under **`matchaxmoxie/latex/`**. See [`../latex/BUILD.md`](../latex/BUILD.md) for `pdflatex` and copying PDFs into **`site/`** with the same basenames as the download links.

## License & contributing

- **License:** [MIT](LICENSE) (code + markup here; your own resume/portfolio content stays yours).
- **Contributing:** see [CONTRIBUTING.md](CONTRIBUTING.md). Typos, contrast, keyboard/mobile quirks, and small a11y fixes are especially welcome.

## Public mirror repo

The repo [github.com/matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) is usually updated from the monorepo with a subtree push of this **`site/`** folder (see `../scripts/publish-site.sh`).
