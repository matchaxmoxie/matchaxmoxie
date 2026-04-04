# Site README

Public portfolio frontend for  
[matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/).

This site uses a Greco-Latin plus English content system, explicit AI disclosure, and a year-by-year structure.

## Pages

- [`index.html`](index.html): landing page and year navigation.
- [`freshman.html`](freshman.html): 2023 to 2024.
- [`sophomore.html`](sophomore.html): 2024 to 2025.
- [`junior.html`](junior.html): 2025 to 2026.
- [`senior.html`](senior.html): 2026 to 2027 projection.
- [`ai-transparency.html`](ai-transparency.html): AI and agentic workflow disclosure.

## Design System

- Fonts: Playfair Display (headings), DM Sans (body).
- Shared stylesheet: [`styles.css`](styles.css).
- Favicon and image anchor: [`j-adezhao.jpg`](j-adezhao.jpg).
- Label style: Greco-Latin plus English, for example `Theoria (Learning)`.
- Icon policy: no emoji icons, only geometric/classical symbols.

## SEO and Alt Text Standard

- Every HTML page includes canonical URL tags and robot indexing directives.
- Every HTML page includes Open Graph and Twitter metadata for share consistency.
- Social preview alt text is present through `og:image:alt` and `twitter:image:alt`.
- Favicon is standardized across entry and site pages for visual identity continuity.

## Contact Links in Site

- Résumé (canonical PDF): [jlzhao.pages.iu.edu/resume.pdf](https://jlzhao.pages.iu.edu/resume.pdf) (IU Pages; also linked from the homepage footer)
- LinkedIn: `jadexzhao`
- GitHub: `jazhao-ucm`
- Instagram: `j.adezhao`
- Goodreads: `jadewowgreen`
- Email: `jadexzhao@outlook.com`

## Run Locally

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080`.

## Mirror and Source

- Mirror repo: [github.com/matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie)
- Source subtree path in monorepo: [`matchaxmoxie/site`](.)
