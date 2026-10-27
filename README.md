# matchaxmoxie

**凤凰 · phoenix · cookie classroom** ... Jade Zhao's IU Luddy informatics portfolio and handoff guides.

| | |
| --- | --- |
| **Live site** | https://matchaxmoxie.github.io/matchaxmoxie/ |
| **Hire / ships** | https://jadexzhao.github.io/jadexzhao/ |
| **Publish notes** | [PUBLISH.md](./PUBLISH.md) (profile bio, deploy, site map) |

## On the site

- **Informatics portfolio** ... course pages (I101 through I211, Kelley, public health, ServeIT, career prep)
- **I211** ... code conversation video embeds
- **Handoffs** ... Facebook, site builders, POS, and worksheets for family / small nonprofits

Static HTML in [`site/`](./site/). GitHub Actions deploys `site/` to Pages on push to `main`.

## Local preview

```bash
./scripts/serve.sh
```

## Repo layout

| Path | Role |
| --- | --- |
| `site/` | Pages artifact (edit this) |
| `scripts/` | serve, handoff helpers, sync |
| `content/` | drafts not deployed |
| `docs/` | transparency / sync notes |
| `PUBLISH.md` | Profile + SEO + workflow (start here) |
