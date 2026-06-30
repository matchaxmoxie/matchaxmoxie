# matchaxmoxie GitHub profile — status

**Live:** https://github.com/matchaxmoxie (profile README in `matchaxmoxie/matchaxmoxie`)

Local mirror of the published README: this folder. Sync with:

```bash
cd /Users/jadexzhao/Documents/jadexzhao/Archive/github-profile/matchaxmoxie-publish
git pull origin main
```

## Still to do (manual)

### 1. Pin repos

Profile → **Customize your pins** → pick up to six **public** repos you own:

| Priority | Repo | Why |
| --- | --- | --- |
| 1 | `matchaxmoxie/matchaxmoxie` | Profile + future FASE MAP Pages source |
| 2 | `jadexzhao/jadexzhao` | Shipped portfolio (cross-account pin works if you have access) |
| 3 | `jadexzhao/pstickers24` | First production ship |

Stats widgets on both profiles use **`username=jadexzhao`** (rose theme) — matchaxmoxie account commits are sparse.

### 2. Profile bio (Settings → Profile)

**jadexzhao:**

```
Informatics @ IU · I build tools people actually use · open to SWE/GTM roles
```

**matchaxmoxie:**

```
Same Jade · FASE MAP coordinator · portfolio @jadexzhao
```

**Website (jadexzhao):** `https://jadexzhao.github.io/jadexzhao/`  
**Website (matchaxmoxie):** `https://matchaxmoxie.github.io/matchaxmoxie/`  
**Instagram:** `@matchaxmoxie`, `@zhao.langxi` (badge color `#00a86b`; both → `@jadexzhao`)

### 3. Deploy FASE / about site (fixes 404 badge links)

README links to `matchaxmoxie.github.io/matchaxmoxie/` — Pages is not deployed yet (repo is README-only).

```bash
cd /Users/jadexzhao/Documents/jadexzhao/Projects/matchaxmoxie
cp /Users/jadexzhao/Documents/jadexzhao/Archive/github-profile/matchaxmoxie-publish/README.md ./README.md
git remote add matchaxmoxie git@github.com:matchaxmoxie/matchaxmoxie.git 2>/dev/null || true
git push matchaxmoxie main
```

Then on GitHub: **Settings → Pages → Source: GitHub Actions** (workflow already in `.github/workflows/pages.yml`).

### 4. Edit README later

```bash
cd /Users/jadexzhao/Documents/jadexzhao/Archive/github-profile/matchaxmoxie-publish
# edit README.md
git add README.md && git commit -m "Update profile README"
git push origin main
```

SSH on this machine authenticates as **matchaxmoxie**. `gh` is installed at `/opt/homebrew/bin/gh` but needs `gh auth login` for API tasks.
