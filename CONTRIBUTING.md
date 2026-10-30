# Contributing

This is a student-kept classroom archive. Beginner pull requests are welcome. Jade reviews everything before it is merged.

## Good first help

- Fix a typo or a broken link
- Clarify an I211 or course note that already exists
- Improve alt text or a heading so a page is easier to follow

## Please do not

- Add FASE MAP, protégé names, or office material
- Put passwords, PINs, or recovery codes anywhere
- Add an AI tutor, login wall, or a feature that does not actually work
- Invent weeks, Drive embeds, or coursework that is not on the site yet

## How to try a change

```bash
./scripts/serve.sh
node scripts/check-site.mjs
```

Edit files under `site/`. GitHub Actions publishes `site/` to Pages.

Questions: jlzhao@iu.edu
