#!/usr/bin/env python3
"""Regenerate matchaxmoxie site/handoffs/*.pdf (reportlab). Priority SOP + simple."""

from __future__ import annotations

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "site" / "handoffs"
PAGES_BASE = "https://matchaxmoxie.github.io/matchaxmoxie"
PFP = ROOT / "site" / "assets" / "site-pfp.jpg"
# Twin checklist/map live in jadexzhao generator; regenerate platforms here.

INK = HexColor("#1a1a1a")
MUTED = HexColor("#3d4a3f")
ACCENT = HexColor("#006B45")
RULE = HexColor("#3D6B4A")
WARN_BG = HexColor("#E8F0E4")
BOX_BG = HexColor("#FFF4E8")

LAST_CHECKED = "October 2026"

POS_HOURS_NOTE = (
    "If DoorDash (or another delivery app) is integrated with your POS, store hours may sync from the POS. "
    "Change hours in Square or Toast first so the apps do not fight each other."
)

SOP_SHEETS = [
    {
        "slug": "wix",
        "platform": "Wix Website & Store Management",
        "what": "The organisation's website and Wix dashboard (and store / inbox if those apps are on).",
        "owners": [
            "Primary site owner: ____________________",
            "Backup owner / co-owner: ____________________",
            "Wix account email (owner): ____________________",
            "Where recovery info lives: password manager, held by ____________________",
        ],
        "owner_note": (
            "Assign staff custom roles (for example Store Manager or Website Manager) rather than sharing "
            "the primary owner login. Admin Co-Owner cannot delete or transfer the site. "
            "Transferring ownership does not move your payment method. Never put the password on this sheet."
        ),
        "steps": [
            "Go to wix.com and sign in with your own account. Pick the right site if you manage more than one.",
            "For messages: open Inbox in the left menu, read the thread, write a short reply, then Send.",
            "For store reviews: open Stores, then Product Reviews (or your reviews app), reply, then publish.",
            "To invite help: Settings → Roles & Permissions → Invite Collaborators. Give only the role they need.",
            "When someone leaves: Owner goes to Roles & Permissions, opens More Actions on that person, then Remove.",
            "If you forgot the login, use Wix account recovery. Do not borrow someone else's password.",
        ],
        "help": [
            (
                "Inviting people to collaborate on your site",
                "https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site",
            ),
            (
                "Roles & Permissions overview",
                "https://support.wix.com/en/article/roles-permissions-overview",
            ),
            (
                "Transferring a premium site to another Wix account",
                "https://support.wix.com/en/article/transferring-a-premium-site-to-another-wix-account",
            ),
        ],
        "warnings": [
            "The site owner should be the organisation, not a former employee or outside designer.",
            "Cannot edit something? Check your role under Settings → Roles & Permissions.",
            "US help links. Your region may show different wording.",
        ],
        "do_not": [
            "Do not share the primary owner login with temporary contractors.",
            "Do not publish major layout edits without Preview (and a mobile check).",
            "Do not offer payment to delete a negative product review.",
            "Never put passwords or MFA codes on this sheet.",
        ],
    },
    {
        "slug": "wordpress",
        "platform": "WordPress (WordPress.com or self-hosted)",
        "what": "The organisation website's content-management system.",
        "owners": [
            "Is this WordPress.com or self-hosted? ☐ WordPress.com  ☐ Self-hosted / hosting company",
            "Site owner / admin: ____________________",
            "Hosting company (if self-hosted): ____________________",
            "Domain owner: ____________________",
        ],
        "owner_note": (
            "Write which flavour the org uses on this sheet. Do not give every volunteer Administrator. "
            "When you Add New User, leave the checkbox that emails them a password unchecked; "
            "they should set their own password. Never put the password on this sheet."
        ),
        "steps": [
            "Confirm whether the site is WordPress.com or self-hosted (/wp-admin).",
            "Sign in with your own account. Open Users to see who has access.",
            "Add people with the lowest role that lets them do the job (Author or Editor often beats Administrator).",
            "On Add New User, leave the send-password-by-email checkbox unchecked. They reset or set their own password.",
            "When someone leaves, remove or demote their user account.",
            "If you forgot the password, use the official reset for WordPress.com or your host / wp-login reset.",
        ],
        "help": [
            (
                "WordPress.com invite people and user roles",
                "https://wordpress.com/support/invite-people/user-roles/",
            ),
            (
                "WordPress.org roles and capabilities",
                "https://wordpress.org/documentation/article/roles-and-capabilities/",
            ),
            (
                "WordPress.org Users Add New screen",
                "https://wordpress.org/documentation/article/users-add-new-screen/",
            ),
        ],
        "warnings": [
            "Administrator can delete the site and other users. Use it sparingly.",
            "US / .org docs. Hosting panels differ by company.",
        ],
        "do_not": [
            "Do not share one Administrator password across the team.",
            "Do not email passwords in plain text. Leave the Add New password-email checkbox unchecked.",
            "Never put passwords on this sheet.",
        ],
    },
    {
        "slug": "square",
        "platform": "Square",
        "what": "The organisation's Square account for payments, staff permissions, and often online store tools.",
        "owners": [
            "Square account owner / admin: ____________________",
            "Backup authorised person: ____________________",
            "Location name on the register: ____________________",
        ],
        "owner_note": (
            "Add administrators or authorised representatives with their own access. "
            f"{POS_HOURS_NOTE} Never put the password on this sheet."
        ),
        "steps": [
            "Sign in at squareup.com or open the Square Point of Sale app with your staff login.",
            "Confirm you are on the right business location.",
            "To take a payment: add items (or an amount), tap Charge, let the customer tap / insert / swipe, wait for success.",
            "Owner adds staff in Square Team / permissions tools. Give only the access they need.",
            "When someone leaves, remove or disable their team permissions.",
            "If DoorDash hours look wrong and POS is linked, change hours in Square first.",
        ],
        "help": [
            (
                "Add an administrator or authorised representative",
                "https://squareup.com/help/us/en/article/6316-add-an-administrator-or-authorized-representative",
            ),
            (
                "Square Team permissions (article 5822)",
                "https://squareup.com/help/us/en/article/5822",
            ),
            (
                "Square account access (article 5591)",
                "https://squareup.com/help/us/en/article/5591",
            ),
        ],
        "warnings": [
            POS_HOURS_NOTE,
            "US help links. Your region may show different wording.",
        ],
        "do_not": [
            "Do not write PINs or passwords on this sheet.",
            "Do not leave former staff with admin access.",
        ],
    },
    {
        "slug": "toast",
        "platform": "Toast",
        "what": "The restaurant Toast POS and Toast Web login for menus, permissions, and guest-facing ops.",
        "owners": [
            "Toast Web owner / restaurant admin: ____________________",
            "Who issues staff PINs: ____________________",
            "Restaurant location name: ____________________",
        ],
        "owner_note": (
            "Staff use individual PINs or employee logins. Do not write PINs on this sheet. "
            f"{POS_HOURS_NOTE}"
        ),
        "steps": [
            "On the Toast terminal, sign in with your staff PIN or card. Owners use Toast Web for permissions.",
            "Start the order, add items, tap Pay, then take the card on the reader.",
            "Owners assign user access permissions in Toast Web. Give only what the job needs.",
            "When someone leaves, remove or disable their employee access / PIN.",
            "If DoorDash hours look wrong and Toast is linked, change hours in Toast first.",
            "If permissions fail, check Toast's troubleshooting docs before creating a second restaurant account.",
        ],
        "help": [
            (
                "Assigning user access permissions",
                "https://support.toasttab.com/en/article/Assigning-User-Access-Permissions",
            ),
            (
                "Troubleshooting permissions",
                "https://support.toasttab.com/en/article/Troubleshooting-Permissions",
            ),
            (
                "Add and manage employees in Toast Web (Toast Central)",
                "https://intercom.help/toast-central/en/articles/14844231-add-and-manage-employees-in-toast-web",
            ),
        ],
        "warnings": [
            POS_HOURS_NOTE,
            "Toast help may live on support.toasttab.com or Toast Central (Intercom). Both are official paths.",
        ],
        "do_not": [
            "Do not write staff PINs or passwords on this sheet.",
            "Do not share one manager login for every shift if individual employees exist.",
        ],
    },
    {
        "slug": "doordash",
        "platform": "DoorDash Merchant",
        "what": "The DoorDash Merchant Portal (and store tablet) for orders, store status, and users.",
        "owners": [
            "Merchant portal owner / business admin: ____________________",
            "Backup store manager: ____________________",
            "Store name: ____________________",
        ],
        "owner_note": (
            "Add users under Settings → Manage Users with their own email invites. "
            f"{POS_HOURS_NOTE} Never put the password on this sheet."
        ),
        "steps": [
            "Sign in at merchants.doordash.com (or open the store tablet) with the store login.",
            "Open Orders to see active, scheduled, and history. On the tablet, confirm new orders.",
            "Check store status and hours under merchant settings. If POS is integrated, change hours in the POS first.",
            "To add staff: Settings → Manage Users → Add User → send invite (business-level Manage Users for full control).",
            "When someone leaves, remove them from Manage Users.",
            "Do not invent a second merchant account if you are locked out. Use official recovery / support.",
        ],
        "help": [
            (
                "Logging in to the Merchant Portal",
                "https://merchants.doordash.com/en-us/learning-center/logging-in",
            ),
            (
                "Merchant Portal settings",
                "https://help.doordash.com/en-us/merchants/article/merchant-portal-settings",
            ),
            (
                "What is my store status (hours / special hours)",
                "https://help.doordash.com/en-us/merchants/article/what-is-my-store-status",
            ),
        ],
        "warnings": [
            POS_HOURS_NOTE,
            "Manage Users steps also appear inside the logging-in learning centre article.",
        ],
        "do_not": [
            "Do not write the merchant password on this sheet.",
            "Do not leave former managers as Business Admin.",
        ],
    },
]

SIMPLE_SHEETS = [
    {
        "slug": "google-sites",
        "title": "Google Sites handoff",
        "for_whom": "For the person who will update the live Google Sites page after the builder leaves.",
        "why": "Tickets pile up when nobody knows which Google account owns the site, or when someone edits but never clicks Publish.",
        "steps": [
            "Sign in at sites.google.com with the Google account that owns the site.",
            "Open the site. Click Pages at the top right.",
            "Click the page you want to change.",
            "Click the text and type. Replace images with More → Replace image.",
            "Click Publish at the top right so visitors see the update.",
        ],
        "write_down": [
            "The Google account that owns the site.",
            "The published address.",
            "Who to ask if that account is unknown.",
            "Never put the password on this sheet.",
        ],
        "help": [
            ("How to use Google Sites", "https://support.google.com/sites/answer/6372878"),
            ("Publish and share your site", "https://support.google.com/sites/answer/6372880"),
        ],
    },
    {
        "slug": "squarespace",
        "title": "Squarespace handoff",
        "for_whom": "For the person who will edit and save the live Squarespace site after the builder leaves.",
        "why": "Tickets pile up when someone edits a draft and never Saves (or Publishes) the live page.",
        "steps": [
            "Sign in at squarespace.com with the email that owns the site.",
            "Open the site. Pages live in the Pages list.",
            "Click the page, then Edit.",
            "Edit text and replace pictures.",
            "Click Done, then Save (or Publish if it is still a draft).",
        ],
        "write_down": [
            "The email that owns the Squarespace login.",
            "The live site address.",
            "Who to ask if that email is unknown.",
            "Never put the password on this sheet.",
        ],
        "help": [
            ("Squarespace Help Center", "https://support.squarespace.com/hc/en-us"),
        ],
    },
    {
        "slug": "capcut",
        "title": "CapCut handoff",
        "for_whom": "For the person who will edit a short vertical video in CapCut after the builder leaves.",
        "why": "Tickets pile up when the project is finished on the timeline but nobody Exports a file.",
        "steps": [
            "Open CapCut and sign in if it asks.",
            "Start a new project. Import the clips.",
            "Set the ratio to 9:16 before you frame.",
            "Trim and arrange clips. Add a short caption if needed.",
            "Export, save the file, then upload where you post.",
        ],
        "write_down": [
            "Which device has CapCut installed.",
            "Where exported videos should be saved.",
            "Who posts the finished video.",
            "Never put the password on this sheet.",
        ],
        "help": [
            ("CapCut Help Center", "https://www.capcut.com/help"),
            ("Log in to CapCut", "https://www.capcut.com/help/log-in-to-capcut"),
        ],
    },
    {
        "slug": "clover",
        "title": "Clover handoff",
        "for_whom": "For the person who will ring a sale and take a card on Clover after the builder leaves.",
        "why": "Tickets pile up when the device passcode is unknown, or when staff leave before Done.",
        "steps": [
            "On the Clover device, sign in with the passcode your manager gave you.",
            "Open Register and tap the items (or type the amount).",
            "Tap Pay or Charge.",
            "Customer inserts, swipes, or taps the card.",
            "Choose Print, Email, or Text for the receipt, then Done.",
        ],
        "write_down": [
            "Who owns the Clover account at clover.com.",
            "Who issues the device passcode.",
            "The device or location name.",
            "Never put the password or the passcode on this sheet.",
        ],
        "help": [
            ("Clover Help", "https://www.clover.com/help/"),
            (
                "How do I take a payment",
                "https://www.clover.com/us/en/helpcenter/article/how-do-i-take-a-payment",
            ),
        ],
    },
]


def styles() -> dict:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "HTitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=17,
            textColor=ACCENT,
            spaceAfter=2,
        ),
        "meta": ParagraphStyle(
            "HMeta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=MUTED,
            spaceAfter=6,
        ),
        "h2": ParagraphStyle(
            "HH2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=ACCENT,
            spaceBefore=6,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "HBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=3,
        ),
        "li": ParagraphStyle(
            "HLi",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11,
            textColor=INK,
        ),
        "link": ParagraphStyle(
            "HLink",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=INK,
            spaceAfter=1,
        ),
        "foot": ParagraphStyle(
            "HFoot",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=9.5,
            textColor=MUTED,
            spaceBefore=4,
        ),
        "warn": ParagraphStyle(
            "HWarn",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=10.5,
            textColor=INK,
        ),
    }


def _box(text: str, st: ParagraphStyle, bg=WARN_BG) -> Table:
    t = Table([[Paragraph(text, st)]], colWidths=[7.1 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("BOX", (0, 0), (-1, -1), 0.5, RULE),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def _numbered(items: list[str], s: dict) -> ListFlowable:
    return ListFlowable(
        [
            ListItem(Paragraph(x, s["li"]), leftIndent=10, value=str(i))
            for i, x in enumerate(items, 1)
        ],
        bulletType="1",
        start="1",
        leftIndent=16,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=9,
        bulletColor=ACCENT,
    )


def _bullets(items: list[str], s: dict) -> ListFlowable:
    return ListFlowable(
        [ListItem(Paragraph(x, s["li"]), leftIndent=6) for x in items],
        bulletType="bullet",
        leftIndent=12,
        bulletFontName="Helvetica",
        bulletFontSize=9,
        bulletColor=RULE,
    )


def make_sop_pdf(item: dict, s: dict) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"handoff-{item['slug']}.pdf"
    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
        title=f"{item['platform']} handoff",
        author="Jade Zhao",
    )
    story = [
        Paragraph(f"Account handoff · {item['platform']}", s["title"]),
        Paragraph(
            f"Last checked: {LAST_CHECKED} · Managed by: ____________________ "
            f"(organisation fills this in) · Prepared by Jade Zhao",
            s["meta"],
        ),
        Paragraph("<b>What this is</b>", s["h2"]),
        Paragraph(item["what"], s["body"]),
        Paragraph("<b>Who owns the login?</b>", s["h2"]),
        _bullets(item["owners"], s),
        Paragraph(item["owner_note"], s["body"]),
        Paragraph("<b>ELI5 steps</b>", s["h2"]),
        _numbered(item["steps"], s),
        Spacer(1, 4),
        Paragraph("<b>Official help</b> (US links; region may differ)", s["h2"]),
    ]
    for label, url in item["help"]:
        story.append(
            Paragraph(
                f'{label}: <link href="{url}" color="#006B45"><u>{url}</u></link>',
                s["link"],
            )
        )
    if item.get("warnings"):
        story.append(Spacer(1, 4))
        story.append(Paragraph("<b>Warning / troubleshooting</b>", s["h2"]))
        story.append(_box("<br/>".join(f"• {w}" for w in item["warnings"]), s["warn"]))
    if item.get("do_not"):
        story.append(Paragraph("<b>Do not</b>", s["h2"]))
        story.append(_bullets(item["do_not"], s))
    html_url = f"{PAGES_BASE}/handoff-{item['slug']}.html"
    story.append(Paragraph("<b>Longer guide</b>", s["h2"]))
    story.append(
        Paragraph(
            f'<link href="{html_url}" color="#006B45"><u>{html_url}</u></link>',
            s["link"],
        )
    )
    story.append(
        Paragraph(
            "Footer: Who owns this account? ____________________ · Backup: ____________________ · "
            "Credentials in the password manager only · When someone leaves, remove access · "
            f"Last checked: {LAST_CHECKED} · Checked by: ____________________ · "
            "Jade Zhao · independent guide, not affiliated with the platform · "
            "Never put the password on this sheet.",
            s["foot"],
        )
    )
    doc.build(story)
    return path


def make_simple_pdf(item: dict, s: dict) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"handoff-{item['slug']}.pdf"
    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.55 * inch,
        title=item["title"],
        author="Jade Zhao",
    )
    story = [
        Paragraph(item["title"], s["title"]),
        Paragraph(
            f"matchaxmoxie · handoff sheet · Last checked: {LAST_CHECKED}",
            s["meta"],
        ),
        Paragraph(item["for_whom"], s["body"]),
        Paragraph("<b>Why tickets happen</b>", s["h2"]),
        Paragraph(item["why"], s["body"]),
        Paragraph("<b>Steps</b>", s["h2"]),
        _numbered(item["steps"], s),
        Spacer(1, 4),
        Paragraph("<b>Write this down</b>", s["h2"]),
        _bullets(item["write_down"], s),
        Paragraph("<b>Official help</b>", s["h2"]),
    ]
    for label, url in item["help"]:
        story.append(
            Paragraph(
                f'{label}: <link href="{url}" color="#006B45"><u>{url}</u></link>',
                s["link"],
            )
        )
    html_url = f"{PAGES_BASE}/handoff-{item['slug']}.html"
    story.append(Paragraph("<b>Longer guide (with video)</b>", s["h2"]))
    story.append(
        Paragraph(
            f'<link href="{html_url}" color="#006B45"><u>{html_url}</u></link>',
            s["link"],
        )
    )
    story.append(
        Paragraph(
            f"Last checked: {LAST_CHECKED}. Never put the password on this sheet.",
            s["foot"],
        )
    )
    doc.build(story)
    return path


def main() -> None:
    s = styles()
    for item in SOP_SHEETS:
        path = make_sop_pdf(item, s)
        print(f"wrote {path} ({path.stat().st_size} bytes)")
    for item in SIMPLE_SHEETS:
        path = make_simple_pdf(item, s)
        print(f"wrote {path} ({path.stat().st_size} bytes)")
    if PFP.exists():
        print(f"pfp available for hubs: {PFP}")


if __name__ == "__main__":
    main()
