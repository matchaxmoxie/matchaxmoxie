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

ChatGPT cannot access your Mac; Cursor can edit markdown and HTML here. PDF export is still a manual step unless you install `pandoc`.

## ChatGPT → PDF (no code)

1. Open the **web guide** in a browser (or paste `pdftotext` output from the old PDF).
2. Paste **Prompt PDF** (in chat with agent) into ChatGPT.
3. Copy ChatGPT’s answer into **Word** or **Google Docs** (Times or Arial, 12pt, big headings).
4. **File → Print → Save as PDF** (or Export PDF).
5. Drop the file on `site/handoffs/handoff-[name].pdf` (same filename).
6. Hard refresh `handoffs.html` locally.

## ChatGPT → web page

1. Paste **Prompt HTML** into ChatGPT with the same facts as the PDF.
2. Save output into `site/handoff-[name].html` (keep the same shell: topbar, PDF link, video section).
3. Add `bubble.css` and `classroom-ux.css` in `<head>` if missing.

## Do not put in ChatGPT or PDFs

Passwords, client secrets, ServeIT internal emails, or anything the family would not want on a sheet by the register.
