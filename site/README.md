# site README · @matchaxmoxie

Public portfolio frontend for [matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/). the pb&j ops side. code ships at [@jadexzhao](https://github.com/jadexzhao) / [the briefcase](https://jadexzhao.github.io/jadexzhao/).

Greco-Latin plus English content system, explicit AI disclosure, pb&j brand palette. restaurant kid wiring, program ops, 鸭年 lore.

## Pages

- [`index.html`](index.html): landing page and project cards.
- [`ops.html`](ops.html): pb&j ops philosophy and program coordination.
- [`ai-transparency.html`](ai-transparency.html): AI and agentic workflow disclosure.
- [`handoff-checklist.html`](handoff-checklist.html): open handoff checklist twin of [`../docs/handoff-checklist-template.md`](../docs/handoff-checklist-template.md).
- [`i18n-wcag.html`](i18n-wcag.html): multilingual WCAG ops pointer (full note on the briefcase).
- [`duck-farm.html`](duck-farm.html): ops showcase + deep link to the live React sandbox.

## Design System

- Fonts: Playfair Display (headings), DM Sans (body); index uses Fraunces + IBM Plex.
- Shared stylesheet: [`styles.css`](styles.css).
- PB&J palette: bread cream `#F5E6C8`, peanut butter `#C4A574`, jelly `#6B3FA0`, strawberry `#C41E3A`, jade accent `#00a86b`.
- Label style: Greco-Latin plus English, for example `Theoria (Learning)`.

## SEO and Alt Text Standard

- Every HTML page includes canonical URL tags and robot indexing directives.
- Every HTML page includes Open Graph and Twitter metadata for share consistency.
- Social preview alt text is present through `og:image:alt` and `twitter:image:alt`.
- Favicon is standardized across entry and site pages for visual identity continuity.

## Contact Links in Site

- Experience & résumé: [linkedin.com/in/jadexzhao](https://www.linkedin.com/in/jadexzhao/)
- LinkedIn: `jadexzhao`
- GitHub (code): `@jadexzhao`
- GitHub (brand/ops): `@matchaxmoxie`
- Instagram: `@zhao.langxi` (web green `#00a86b`; → code `@jadexzhao`)
- Email: `jlzhao@iu.edu`

## Run Locally

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080`.

## Mirror and Source

- Mirror repo: [github.com/matchaxmoxie/matchaxmoxie](https://github.com/matchaxmoxie/matchaxmoxie)
- Source subtree path in monorepo: [`matchaxmoxie/site`](.)
