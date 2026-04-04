# matchaxmoxie (informatics portfolio)

**UCM subtree:** this folder lives inside the **[UCM monorepo](../README.md)** at `matchaxmoxie/`. Content is mirrored to [matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie) for GitHub Pages.

**Live site:** [matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/)

## Profiles and contact

- [Portfolio](https://matchaxmoxie.github.io/matchaxmoxie/)  
- [Résumé (PDF, IU Pages)](https://jlzhao.pages.iu.edu/resume.pdf)  
- [LinkedIn](https://www.linkedin.com/in/jadexzhao)  
- [GitHub](https://github.com/jazhao-ucm)  
- [Instagram](https://instagram.com/j.adezhao)  
- [Goodreads](https://www.goodreads.com/jadewowgreen)  
- [Email](mailto:jadexzhao@outlook.com)  

## Repository layout

| Path | Purpose |
|------|---------|
| [`site/`](site/) | Public Pages site (HTML, CSS, images). Entry: [`site/index.html`](site/index.html). Details: [`site/README.md`](site/README.md). |
| [`site/j-adezhao.jpg`](site/j-adezhao.jpg) (and `.webp` variants) | Favicon and hero image assets |
| [`latex/`](latex/) | Résumé and PDFs; sources in [`latex/docs/`](latex/docs/), shared TeX in [`latex/shared/`](latex/shared/). Build: [`latex/BUILD.md`](latex/BUILD.md). |
| [`docs/`](docs/) | Transparency and governance (e.g. [`docs/TRANSPARENCY.md`](docs/TRANSPARENCY.md)) |
| [`scripts/`](scripts/) | Publish and maintenance (e.g. subtree push) |
| [`index.html`](index.html) | Root redirect into `site/` |

**Year pages (academic narrative):** `site/freshman.html` through `site/senior.html`. **AI disclosure:** `site/ai-transparency.html`. **Styles:** `site/styles.css`.

## Design and content method

- **Voice:** Greco-Latin plus English labels where it fits (e.g. *Theoria (Learning)*); no emoji motifs.  
- **Opus:** Work evidence sits on year pages; each year includes an *Opus (Work)* card (problem, decision, result, reflection). Index links: *Opus Selectum* → anchors such as `sophomore.html#piece-mentorship-template`, `junior.html#piece-madrid-stress-test`.  
- **Accessibility / SEO:** Canonical URLs, robots, Open Graph, Twitter cards, explicit `og:image:alt` / `twitter:image:alt`.  
- **AI:** Drafting and speed are fine; human review and sign-off are required. See [`docs/TRANSPARENCY.md`](docs/TRANSPARENCY.md).

## Run locally

```bash
cd matchaxmoxie/site
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080`.

## Mirror sync (from monorepo root)

- Pull mirror into this subtree: `./matchaxmoxie/pull-mirror.sh`  
- Push subtree to `matchaxmoxie/matchaxmoxie` main: `./matchaxmoxie/scripts/publish-site.sh`  

More detail: [`SYNC-FROM-MIRROR.md`](SYNC-FROM-MIRROR.md).

## Related in this monorepo

- Photo portfolio: [`../jadewowgreen/README.md`](../jadewowgreen/README.md)  
- Private research: [`../j-adezhao/README.md`](../j-adezhao/README.md)  

## License

Copyright © 2026 Jade Zhao. All rights reserved unless stated otherwise.
