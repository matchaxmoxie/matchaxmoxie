# Contributing

This is a student-kept classroom. Beginner pull requests are welcome. Jade reviews everything before it is merged.

If you are new to GitHub, that is fine. A small, honest fix is more useful than a large rewrite.

## Good first help

- Fix a typo or a broken link
- Clarify an I211 or course note that already exists
- Improve alt text or a heading so a page is easier to follow
- Point out a place where coursework is described as if it were an independent tutorial

## Please do not

- Add FASE MAP, protégé names, or office material
- Put passwords, PINs, or recovery codes anywhere
- Add an AI tutor, login wall, or a feature that does not actually work
- Invent weeks, Drive embeds, or coursework that is not on the site yet
- Recreate `site/content/fase-26-27/`

## How to try a change

```bash
./scripts/serve.sh
node scripts/check-site.mjs
```

Edit files under `site/`. GitHub Actions publishes `site/` to Pages.

Questions: jlzhao@iu.edu
