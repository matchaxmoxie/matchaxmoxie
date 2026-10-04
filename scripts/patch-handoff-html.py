#!/usr/bin/env python3
"""Add Official help sections and CapCut PDF link on matchaxmoxie handoff HTML."""

from __future__ import annotations

import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[1] / "site"

HELP = {
    "google-sites": [
        ("How to use Google Sites", "https://support.google.com/sites/answer/6372878"),
        ("Publish and share your site", "https://support.google.com/sites/answer/6372880"),
    ],
    "wix": [
        (
            "Wix Editor: Adding and Editing Text",
            "https://support.wix.com/en/article/wix-editor-adding-and-editing-text",
        ),
        (
            "Wix Editor: Publishing Your Site",
            "https://support.wix.com/en/article/wix-editor-publishing-your-site",
        ),
    ],
    "squarespace": [
        ("Squarespace Help Center", "https://support.squarespace.com/hc/en-us"),
    ],
    "wordpress": [
        ("WordPress.com: Create a page", "https://wordpress.com/support/pages/"),
        (
            "WordPress.org: Block Editor",
            "https://wordpress.org/documentation/article/wordpress-block-editor/",
        ),
        (
            "WordPress.org: Create pages",
            "https://wordpress.org/documentation/article/create-pages/",
        ),
    ],
    "capcut": [
        ("CapCut Help Center", "https://www.capcut.com/help"),
        ("Log in to CapCut", "https://www.capcut.com/help/log-in-to-capcut"),
        ("Editing and exporting", "https://www.capcut.com/help/editing-and-exporting"),
    ],
    "square": [
        ("Square Support Center", "https://squareup.com/help/us/en"),
        (
            "Sign in to your Square account",
            "https://squareup.com/help/us/en/article/5062-sign-in-and-out-of-square-point-of-sale",
        ),
    ],
    "clover": [
        ("Clover Help", "https://www.clover.com/help/"),
        (
            "How do I take a payment",
            "https://www.clover.com/us/en/helpcenter/article/how-do-i-take-a-payment",
        ),
    ],
    "toast": [
        ("Toast Support Center", "https://support.toasttab.com/en"),
        ("Toast platform docs", "https://doc.toasttab.com/"),
    ],
    "doordash": [
        ("DoorDash Merchant Support", "https://help.doordash.com/en-us/merchants"),
    ],
}

TITLES = {
    "google-sites": "Google Sites",
    "wix": "Wix",
    "squarespace": "Squarespace",
    "wordpress": "WordPress",
    "capcut": "CapCut",
    "square": "Square",
    "clover": "Clover",
    "toast": "Toast",
    "doordash": "DoorDash",
}


def help_block(slug: str) -> str:
    items = "\n".join(
        f'        <li><a href="{url}" rel="noopener noreferrer">{label}</a>'
        f'<br><span class="note">{url}</span></li>'
        for label, url in HELP[slug]
    )
    return f"""    <section class="band" aria-labelledby="help-heading">
      <h2 id="help-heading">Official help</h2>
      <p>Beginner docs from the product itself. Open these if a button name moved.</p>
      <ul class="write-down">
{items}
      </ul>
    </section>
"""


def pdf_block(slug: str) -> str:
    title = TITLES[slug]
    fname = f"handoff-{slug}.pdf"
    return f"""    <section class="band" aria-labelledby="pdf-heading">
      <h2 id="pdf-heading">PDF</h2>
      <p>The same steps, for someone who wants a file.</p>
      <p><a class="pdf-link" href="handoffs/{fname}" download="{fname}">Download the {title} PDF</a></p>
    </section>
"""


def patch_page(path: Path) -> None:
    slug = path.name.removeprefix("handoff-").removesuffix(".html")
    text = path.read_text(encoding="utf-8")

    text = re.sub(
        r'\s*<section class="band" aria-labelledby="help-heading">.*?</section>\s*',
        "\n",
        text,
        flags=re.S,
    )
    # Replace existing PDF section entirely so CapCut gets one too
    text = re.sub(
        r'\s*<section class="band" aria-labelledby="pdf-heading">.*?</section>\s*',
        "\n",
        text,
        flags=re.S,
    )

    insert = help_block(slug) + pdf_block(slug)
    # Prefer insert before Video; else before Other handoffs
    for marker in (
        '<section class="band" aria-labelledby="video-heading">',
        '<section class="band" aria-labelledby="more-heading">',
    ):
        if marker in text:
            text = text.replace(marker, insert + "    " + marker, 1)
            break
    else:
        raise SystemExit(f"no insert point in {path}")

    path.write_text(text, encoding="utf-8")
    print(f"patched {path.name}")


def patch_index() -> None:
    path = SITE / "handoffs.html"
    text = path.read_text(encoding="utf-8")
    # CapCut card currently lacks PDF line
    if "handoff-capcut.pdf" not in text:
        text = text.replace(
            """          <h3><a href="handoff-capcut.html">CapCut</a></h3>
          <p>Open a project, edit a short vertical video, and export.</p>
        </li>""",
            """          <h3><a href="handoff-capcut.html">CapCut</a></h3>
          <p>Open a project, edit a short vertical video, and export.</p>
          <p><a href="handoffs/handoff-capcut.pdf" download="handoff-capcut.pdf">Download the CapCut PDF</a></p>
        </li>""",
            1,
        )
    # Standfirst already mentions PDF on most guides; tighten to all guides
    text = text.replace(
        "A PDF of the same steps on most guides.",
        "A PDF of the same steps on each guide.",
        1,
    )
    path.write_text(text, encoding="utf-8")
    print("patched handoffs.html")


def main() -> None:
    for path in sorted(SITE.glob("handoff-*.html")):
        slug = path.name.removeprefix("handoff-").removesuffix(".html")
        if slug in HELP:
            patch_page(path)
    patch_index()


if __name__ == "__main__":
    main()
