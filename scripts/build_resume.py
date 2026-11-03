"""Build the one-page, selectable-text résumé from shared portfolio content."""

import json
import re
from pathlib import Path
from tempfile import NamedTemporaryFile
from xml.sax.saxutils import escape

import reportlab
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import registerFont, registerFontFamily, stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Sameer_Awaji_Resume.pdf"
TEXT_OUTPUT = OUTPUT.with_suffix(".txt")
PAGE_W, PAGE_H = letter
LEFT = 42
RIGHT = PAGE_W - LEFT
CONTENT_W = RIGHT - LEFT
BOTTOM = 34

INK = HexColor("#17212A")
SOFT = HexColor("#52606C")
ACCENT = HexColor("#184C43")
LINE = HexColor("#D8E0DE")

# Embed the bundled font faces so regular and bold weights render consistently.
FONT_DIR = Path(reportlab.__file__).parent / "fonts"
NORMAL_FONT = "ResumeSans"
BOLD_FONT = "ResumeSans-Bold"
registerFont(TTFont(NORMAL_FONT, str(FONT_DIR / "Vera.ttf")))
registerFont(TTFont(BOLD_FONT, str(FONT_DIR / "VeraBd.ttf")))
registerFontFamily(NORMAL_FONT, normal=NORMAL_FONT, bold=BOLD_FONT)


def plain(text):
    """Normalize punctuation that standard PDF fonts do not reliably encode."""
    return str(text).translate(
        str.maketrans({"—": "-", "–": "-", "‑": "-", "’": "'", "‘": "'", "“": '"', "”": '"'})
    )


def english(value):
    return value.get("en", "") if isinstance(value, dict) else value


def markup(text):
    return escape(plain(text))


def bullet_markup(text):
    # Emphasize numbers already present in the source; do not add new claims.
    return re.sub(
        r"\b\d[\d,]*\+|\b\d+(?:\.\d+)?s(?: to \d+(?:\.\d+)?s)?|\b\d+(?:\.\d+)? to \d+(?:\.\d+)?",
        lambda match: f"<b>{match.group(0)}</b>",
        markup(text),
    )


BODY = ParagraphStyle(
    "Body", fontName=NORMAL_FONT, fontSize=11, leading=15,
    textColor=INK, allowWidows=0, allowOrphans=0,
)
BULLET = ParagraphStyle(
    "Bullet", parent=BODY, leftIndent=11, firstLineIndent=-11,
)
DETAIL = ParagraphStyle(
    "Detail", parent=BODY, fontSize=10.3, leading=14, textColor=SOFT,
)
HEADLINE = ParagraphStyle(
    "Headline", parent=BODY, fontName=BOLD_FONT, fontSize=12.5,
    leading=16.5, textColor=ACCENT,
)
COMPACT_BULLET = ParagraphStyle(
    "CompactBullet", parent=BODY, fontSize=9.5, leading=12.5,
    leftIndent=11, firstLineIndent=-11, textColor=SOFT,
)


def draw_paragraph(pdf, text, y, *, style=BODY, width=CONTENT_W, x=LEFT):
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, PAGE_H)
    bottom = y - height
    if bottom < BOTTOM:
        raise ValueError(
            f"Résumé exceeds one page at {bottom:.1f}pt; shorten the shared résumé content."
        )
    paragraph.drawOn(pdf, x, bottom)
    return bottom


def section_title(pdf, title, y):
    y -= 17
    pdf.setFillColor(ACCENT)
    pdf.setFont(BOLD_FONT, 11)
    pdf.drawString(LEFT, y, title.upper())
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.6)
    title_width = stringWidth(title.upper(), BOLD_FONT, 11)
    pdf.line(LEFT + title_width + 13, y + 3, RIGHT, y + 3)
    return y - 14


def short_url(url):
    return url.removeprefix("https://").removeprefix("http://").rstrip("/")


def resume_location(site):
    location = english(site["location"])
    timezone = english(site.get("timezone", ""))
    if "UTC+3" in timezone and "UTC+3" not in location:
        return f"{location} (UTC+3)"
    return location


def draw_contact_line(pdf, contacts, y):
    size = 10
    gap = 16
    widths = [stringWidth(label, NORMAL_FONT, size) for label, _ in contacts]
    if sum(widths) + gap * (len(contacts) - 1) > CONTENT_W:
        raise ValueError("Résumé contact line exceeds page width.")
    x = LEFT
    for (label, url), width in zip(contacts, widths):
        pdf.setFillColor(INK)
        pdf.setFont(NORMAL_FONT, size)
        pdf.drawString(x, y, label)
        if url:
            pdf.linkURL(url, (x, y - 2, x + width, y + 10), relative=0)
        x += width + gap
    return y - 16


def ordered_experience(entries):
    # Engineering employment and freelance work lead. Earlier non-engineering
    # roles stay in the source and render in a quieter block.
    priority = {"Mrasim": 0, "Maeen": 1, "MIP Marketing Agency": 2, "Nana": 3}
    return sorted(entries, key=lambda entry: priority.get(entry["company"], 4))


def is_compact(entry):
    return entry.get("tier") == "compact"


def experience_entry(pdf, y, entry):
    compact = is_compact(entry)
    title = f"{entry['role']} | {entry['company']}"
    period = plain(entry["period"])
    title_font = NORMAL_FONT if compact else BOLD_FONT
    title_size = 10 if compact else 11.2
    date_size = 9.5 if compact else 10.3
    title_width = stringWidth(plain(title), title_font, title_size)
    date_width = stringWidth(period, NORMAL_FONT, date_size)
    if title_width + date_width + 18 <= CONTENT_W:
        pdf.setFillColor(SOFT if compact else INK)
        pdf.setFont(title_font, title_size)
        pdf.drawString(LEFT, y - title_size, plain(title))
        pdf.setFillColor(SOFT)
        pdf.setFont(NORMAL_FONT, date_size)
        pdf.drawRightString(RIGHT, y - title_size, period)
        y -= 16 if compact else 22
    else:
        y = draw_paragraph(
            pdf,
            f"<b>{markup(title)}</b>" if not compact else markup(title),
            y,
            style=DETAIL if compact else BODY,
        )
        y = draw_paragraph(pdf, markup(period), y, style=DETAIL)
        y -= 2
    bullet_style = COMPACT_BULLET if compact else BULLET
    for bullet in entry["bullets"]:
        y = draw_paragraph(pdf, f"- {bullet_markup(bullet)}", y, style=bullet_style)
        y -= 2 if compact else 3
    return y - (4 if compact else 8)


def build_plain_text(site, resume, education, experience):
    portfolio = site.get("portfolio")
    lines = [
        site["name"],
        resume.get("headline", "Software Engineer | Web & Mobile"),
        f"{resume_location(site)} | {english(site.get('opportunities', 'Open to remote software engineering roles'))}",
        f"Email: {site['email']}",
        f"GitHub: {site['github']}",
        f"LinkedIn: {site['linkedin']}",
    ]
    if isinstance(portfolio, str) and portfolio.startswith("http") and "chatgpt.site" not in portfolio:
        lines.append(f"Portfolio: {portfolio}")
    lines += ["", "SUMMARY", resume["profile"], "", "PROFESSIONAL EXPERIENCE"]
    wrote_additional = False
    for entry in experience:
        if is_compact(entry) and not wrote_additional:
            lines += ["ADDITIONAL EXPERIENCE"]
            wrote_additional = True
        lines += [f"{entry['role']} | {entry['company']}", entry["period"]]
        lines += [f"- {bullet}" for bullet in entry["bullets"]]
        lines.append("")
    lines += ["TECHNICAL SKILLS"]
    lines += [f"{label}: {value}" for label, value in resume["capabilities"]]
    lines.append("")
    lines += [
        "EDUCATION",
        f"{english(education['degree'])} | {english(education['school'])} | {education['year']}",
        f"GPA: {education['gpa']}",
    ]
    return plain("\n".join(lines)) + "\n"


def build_resume():
    content = json.loads((ROOT / "content" / "portfolio.json").read_text(encoding="utf-8"))
    site, resume, education = content["site"], content["resume"], content["education"]
    experience = ordered_experience(resume["experience"])
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    with NamedTemporaryFile(suffix=".pdf", prefix="resume-", dir=OUTPUT.parent, delete=False) as temp:
        temporary = Path(temp.name)
    try:
        pdf = canvas.Canvas(str(temporary), pagesize=letter, pageCompression=1)
        pdf.setTitle(f"{site['name']} - Software Engineer Resume")
        pdf.setAuthor(site["name"])
        pdf.setSubject("Software engineering experience, technical skills, and education")

        y = PAGE_H - 42
        pdf.setFillColor(INK)
        pdf.setFont(BOLD_FONT, 29)
        pdf.drawString(LEFT, y - 22, plain(site["name"]))
        y -= 38
        y = draw_paragraph(pdf, markup(resume.get("headline", "Software Engineer | Web & Mobile")), y, style=HEADLINE)
        y -= 4
        location = resume_location(site)
        opportunities = english(site.get("opportunities", "Open to remote software engineering roles"))
        y = draw_paragraph(pdf, markup(f"{location} | {opportunities}"), y, style=DETAIL)
        y -= 16
        contacts = [
            (site["email"], f"mailto:{site['email']}"),
            (short_url(site["github"]), site["github"]),
            ("LinkedIn", site["linkedin"]),
        ]
        portfolio = site.get("portfolio")
        if isinstance(portfolio, str) and portfolio.startswith("http") and "chatgpt.site" not in portfolio:
            contacts.append(("Portfolio", portfolio))
        y = draw_contact_line(pdf, contacts, y)
        pdf.setStrokeColor(ACCENT)
        pdf.setLineWidth(1.3)
        pdf.line(LEFT, y - 2, RIGHT, y - 2)
        y -= 10

        y = section_title(pdf, "Summary", y)
        y = draw_paragraph(pdf, markup(resume["profile"]), y)

        y = section_title(pdf, "Professional Experience", y)
        primary = [entry for entry in experience if not is_compact(entry)]
        compact = [entry for entry in experience if is_compact(entry)]
        for entry in primary:
            y = experience_entry(pdf, y, entry)
        if compact:
            y = section_title(pdf, "Additional experience", y)
            for entry in compact:
                y = experience_entry(pdf, y, entry)

        y = section_title(pdf, "Technical Skills", y)
        for label, value in resume["capabilities"]:
            y = draw_paragraph(pdf, f"<b>{markup(label)}:</b> {markup(value)}", y)
            y -= 3

        y = section_title(pdf, "Education", y)
        degree = f"{english(education['degree'])} | {english(education['school'])}"
        year = plain(education["year"])
        degree_width = stringWidth(plain(degree), BOLD_FONT, 11)
        if degree_width + stringWidth(year, NORMAL_FONT, 10.3) + 18 <= CONTENT_W:
            pdf.setFillColor(INK)
            pdf.setFont(BOLD_FONT, 11)
            pdf.drawString(LEFT, y - 11, plain(degree))
            pdf.setFillColor(SOFT)
            pdf.setFont(NORMAL_FONT, 10.3)
            pdf.drawRightString(RIGHT, y - 11, year)
            y -= 20
        else:
            y = draw_paragraph(pdf, f"<b>{markup(degree)}</b> | {markup(year)}", y)
            y -= 3
        y = draw_paragraph(pdf, markup(f"GPA: {education['gpa']}"), y, style=DETAIL)

        if y < BOTTOM:
            raise ValueError("Résumé content exceeds its one-page layout.")
        pdf.showPage()
        pdf.save()
        temporary.replace(OUTPUT)
        TEXT_OUTPUT.write_text(build_plain_text(site, resume, education, experience), encoding="utf-8")
        print(f"Built {OUTPUT.name}: one page, 11pt body text, {y:.1f}pt bottom clearance.")
        print(f"Built {TEXT_OUTPUT.name}: plain-text application copy.")
    finally:
        temporary.unlink(missing_ok=True)


if __name__ == "__main__":
    build_resume()
