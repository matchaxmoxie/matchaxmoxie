# Jade Zhao | Informatics Portfolio

Portfolio repository for the public site at  
[matchaxmoxie.github.io/matchaxmoxie](https://matchaxmoxie.github.io/matchaxmoxie/).

The current edition uses a Greco-Latin plus English design and language system, with explicit AI workflow disclosure and a year-by-year academic narrative.

## Live Profiles

- [Portfolio](https://matchaxmoxie.github.io/matchaxmoxie/)
- [LinkedIn](https://www.linkedin.com/in/jadexzhao)
- [GitHub](https://github.com/jazhao-ucm)
- [Instagram](https://instagram.com/j.adezhao)
- [Goodreads](https://www.goodreads.com/jadewowgreen)
- [Email](mailto:jadexzhao@outlook.com)

## Site Structure

Main site files are under [`site`](site/):

- [`site/index.html`](site/index.html): landing page and navigation hub.
- [`site/freshman.html`](site/freshman.html): 2023 to 2024.
- [`site/sophomore.html`](site/sophomore.html): 2024 to 2025.
- [`site/junior.html`](site/junior.html): 2025 to 2026.
- [`site/senior.html`](site/senior.html): 2026 to 2027 projection.
- [`site/ai-transparency.html`](site/ai-transparency.html): AI and agentic disclosure.
- [`site/styles.css`](site/styles.css): single shared stylesheet.
- [`site/j.adezhao.jpg`](site/j.adezhao.jpg): profile image used as favicon and visual anchor.

For site-only details, see [`site/README.md`](site/README.md).

## Design System Notes

- Greco-Latin plus English labeling pattern, for example `Theoria (Learning)`.
- Non-emoji symbolic motifs only.
- Color palette tuned to the profile image so branding and favicon remain coherent.
- Accessibility and responsive behavior preserved across desktop and mobile breakpoints.

## AI Transparency

The site explicitly documents AI-assisted workflow boundaries and human accountability:

- AI can draft, suggest, and accelerate iteration.
- Human review, policy alignment, and publication sign-off are mandatory.
- Reference memo: [`docs/TRANSPARENCY.md`](docs/TRANSPARENCY.md).

## Repository Layout

| Path | Purpose |
| :--- | :--- |
| [`site`](site/) | Public Pages site (HTML/CSS/assets). |
| [`latex`](latex/) | LaTeX source tree for resume and supporting documents. |
| [`latex/docs`](latex/docs/) | Primary document `.tex` files. |
| [`latex/shared`](latex/shared/) | Shared style/header partials. |
| [`docs`](docs/) | Governance and transparency documentation. |
| [`scripts`](scripts/) | Publishing and maintenance scripts. |

## Run Locally

```bash
cd matchaxmoxie/site
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Mirror Sync Workflow

From the monorepo root:

- Pull mirror into this subtree:  
  `./matchaxmoxie/pull-mirror.sh`
- Publish subtree back to mirror repo:  
  `./matchaxmoxie/scripts/publish-site.sh`

The publish script uses `git subtree split` to push [`matchaxmoxie`](.) to `matchaxmoxie/matchaxmoxie` main.

## Deployment Notes

- Public Pages content is served from [`site`](site/).
- Root [`index.html`](index.html) redirects into [`site`](site/).
- Canonical and social metadata live in [`site/index.html`](site/index.html).

## License

Copyright © 2026 Jade Zhao.  
All rights reserved unless stated otherwise.
