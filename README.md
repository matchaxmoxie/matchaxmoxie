# matchaxmoxie

**凤凰 · phoenix · cookie classroom** ... Jade Zhao's IU Luddy **learning archive**: coursework, I211 videos, and website handoff guides.

| | |
| --- | --- |
| **Live site** | https://matchaxmoxie.github.io/matchaxmoxie/ |
| **Hire / ships** | https://jadexzhao.github.io/jadexzhao/ |
| **Essays** | https://zhao-langxi.github.io/zhao-langxi/ |
| **Publish notes** | [PUBLISH.md](./PUBLISH.md) (profile bio, deploy, site map) |
| **Architecture** | [docs/LEARNING-ARCHITECTURE.md](./docs/LEARNING-ARCHITECTURE.md) |

This is **not** a second hire portfolio. jadexzhao answers what she has done; this site answers what she has learned and documented.

## On the site

- **I211** ... Python code conversation videos (weeks 1 to 5 ready; week 6 placeholder)
- **Notes** ... I101 through career prep, Kelley, public health, ServeIT
- **Handoffs** ... Facebook, site builders, POS, worksheets for family / small nonprofits

Static HTML in [`site/`](./site/). GitHub Actions deploys `site/` to Pages on push to `main`.

## Local preview

```bash
./scripts/serve.sh
```

Before publish:

```bash
node scripts/check-site.mjs
```

## Repo layout

| Path | Role |
| --- | --- |
| `site/` | Pages artifact (edit this) |
| `scripts/` | serve, handoff helpers, `check-site.mjs` |
| `content/` | drafts not deployed |
| `docs/` | architecture, audit, sync notes |
| `PUBLISH.md` | Profile + SEO + workflow (start here) |
