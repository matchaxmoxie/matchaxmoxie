#!/usr/bin/env python3
"""Write minimal one-page placeholder PDFs into ../site/ (same paths as README badges).

Run from this directory: python3 regenerate-placeholder-pdfs.py
"""

from pathlib import Path


def minimal_pdf(message: str) -> bytes:
    enc = "latin-1"
    parts = [b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"]
    offsets = [0]

    def add(obj: bytes):
        offsets.append(sum(len(p) for p in parts))
        parts.append(obj)

    stream = (
        "BT /F1 11 Tf 72 720 Td ("
        + message.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        + ") Tj ET"
    ).encode(enc)
    add(b"1 0 obj<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    add(b"2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    add(
        b"3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        b"/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n"
    )
    add(
        f"4 0 obj<< /Length {len(stream)} >>\nstream\n".encode(enc)
        + stream
        + b"\nendstream\nendobj\n"
    )
    add(b"5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    body = b"".join(parts)
    xref_pos = len(body)
    xref_lines = ["xref\n", f"0 {len(offsets)}\n", "0000000000 65535 f \n"]
    for off in offsets[1:]:
        xref_lines.append(f"{off:010d} 00000 n \n")
    xref = "".join(xref_lines).encode(enc)
    trailer = (
        f"trailer<< /Size {len(offsets)} /Root 1 0 R >>\n"
        f"startxref\n{xref_pos + len(xref)}\n%%EOF\n"
    ).encode(enc)
    return body + xref + trailer


def main() -> None:
    base = Path(__file__).resolve().parent.parent / "site"
    specs = {
        "jade-zhao-resume.pdf": "Placeholder: compile jade-zhao-resume.tex then replace this file.",
        "jade-zhao-profile-full.pdf": "Placeholder: compile jade-zhao-profile-full.tex then replace.",
        "jade-zhao-quotes-principles.pdf": "Placeholder: compile jade-zhao-quotes-principles.tex then replace.",
        "jade-zhao-three-pillars.pdf": "Placeholder: compile jade-zhao-three-pillars.tex then replace.",
        "jade-zhao-inclusive-tech-statement.pdf": "Placeholder: compile jade-zhao-inclusive-tech-statement.tex then replace.",
        "jade-zhao-philosophy-mentorship.pdf": "Placeholder: compile jade-zhao-philosophy-mentorship.tex then replace.",
    }
    for name, msg in specs.items():
        if len(msg) > 120:
            msg = msg[:117] + "..."
        (base / name).write_bytes(minimal_pdf(msg))
        print("wrote", base / name)


if __name__ == "__main__":
    main()
