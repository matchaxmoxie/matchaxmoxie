# How to refresh Handoffs (Jade workflow)

Three layers on the site:

| Layer | What it is | Where |
| --- | --- | --- |
| **Hub** | Links and one-line descriptions | `site/handoffs.html` |
| **Web guide** | Full steps + YouTube embeds | `site/handoff-wix.html`, etc. |
| **PDF** | One-page printout for family / client | `site/handoffs/handoff-wix.pdf` |

Checklist / who owns what: edit `site/handoffs/worksheets/*.md` → Word/Pages → Export PDF → replace `handoff-checklist.pdf` and `handoff-who-owns-what.pdf`.

## Replace all PDFs in one sitting (Word)

1. Open each `handoffs/handoff-*.md` and both `worksheets/*.md` in Word or Pages.
2. File → Print → Save as PDF using the **same filename** as the existing PDF in `handoffs/`.
3. Commit and push `site/handoffs/*.pdf` when happy.

PDF export is a manual step unless you install `pandoc`. Edit markdown and HTML locally, then export.

**Last reviewed on the public guides:** 26 Oct 2026. Bump that line when steps change.

**Facebook:** HTML + MD exist; `handoff-facebook.pdf` is still missing. Export before promising a download on the hub.

## Markdown → PDF (no extra tools)

1. Open `handoffs/handoff-*.md` (or a worksheet) in Word or Pages.
2. **File → Print → Save as PDF** using the **same filename** as the existing PDF.
3. Commit and push `site/handoffs/*.pdf` when happy.

## Writing assistant → PDF (optional)

1. Open the **web guide** in a browser.
2. Ask a writing assistant for a one-page print layout from the same facts (no invented steps).
3. Paste into **Word** or **Google Docs** (Times or Arial, 12pt, big headings).
4. **File → Print → Save as PDF**.
5. Drop the file on `site/handoffs/handoff-[name].pdf` (same filename).

## Writing assistant → web page

1. Ask for HTML that matches an existing `handoff-*.html` shell (topbar, PDF link, video section).
2. Save into `site/handoff-[name].html`.
3. Add `bubble.css` and `classroom-ux.css` in `<head>` if missing.
4. Run `node scripts/check-site.mjs`.

## Do not put in assistants or PDFs

Passwords, client secrets, ServeIT internal emails, or anything the family would not want on a sheet by the register.
