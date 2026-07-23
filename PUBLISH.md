# matchaxmoxie · profile + Pages publish

**Live profile:** https://github.com/matchaxmoxie  
**Live Pages:** https://matchaxmoxie.github.io/matchaxmoxie/  
**Artifact:** `site/` via `.github/workflows/pages.yml` (GitHub Actions). Static HTML/CSS. Not a Vite build.

Local working copy: this folder (`Documents/matchaxmoxie/`).

## Pages architecture (do not invent a Vite base)

| Item | Reality |
| --- | --- |
| Publish path | `site/` uploaded as the Pages artifact |
| Build step | none (`npm` / Vite not involved) |
| Vite `base: '/matchaxmoxie/'` | **wrong** for this repo. Do not add. |
| SPA 404 sessionStorage trap | **not needed**. Flat multipage HTML. `site/404.html` is a branded miss page. |
| CNAME | none today. Keep custom domains off throwaway experiments if added later. |
| Settings | **Pages → Source: GitHub Actions** |

Sister footprint (`jadexzhao/jadexzhao`) is different on purpose: composite briefcase root + Vite duck farm at `/jadexzhao/duck-farm/`. See [how i work · pages deploy](https://jadexzhao.github.io/jadexzhao/how-i-work.html#pages-deploy).

## Profile pins / bio (manual)

Profile → **Customize your pins** → up to six public repos:

| Priority | Repo | Why |
| --- | --- | --- |
| 1 | `matchaxmoxie/matchaxmoxie` | Profile + Miss Zhao / GWC classroom Pages |
| 2 | `jadexzhao/jadexzhao` | Shipped portfolio (cross-account pin if you have access) |
| 3 | `jadexzhao/pstickers24` | First production ship |

**jadexzhao bio:**

```
Informatics @ IU · I build tools people actually use · open to SWE/GTM roles
```

**matchaxmoxie bio:**

```
Same Jade · Miss Zhao · GWC archive · portfolio @jadexzhao
```

**Website (jadexzhao):** `https://jadexzhao.github.io/jadexzhao/`  
**Website (matchaxmoxie):** `https://matchaxmoxie.github.io/matchaxmoxie/`  
**Instagram:** `@zhao.langxi`

## Push Pages content

```bash
cd /Users/jadexzhao/Documents/matchaxmoxie
# edit site/* as needed, then:
git add site .github/workflows/pages.yml
git commit -m "文档：同步 matchax Pages 与静态 site 发布说明"
git push origin main
```

Path filters on the workflow mean only `site/**` (and the workflow file) trigger deploy. Use **Actions → Deploy GitHub Pages → Run workflow** for a manual republish.

SSH on this machine authenticates as **matchaxmoxie** for that remote. Prefer `git` over `gh` until `gh auth login` is set for API tasks.
