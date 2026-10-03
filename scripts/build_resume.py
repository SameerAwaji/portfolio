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
    "Headline", parent=BODY, fontName=BOLD_FONT, fontSize=13,
    leading=17.5, textColor=ACCENT,
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
    # Keep concurrent freelance work alongside engineering employment.
    priority = {"Mrasim": 0, "Maeen": 1, "MIP Marketing Agency": 2, "Nana": 3}
    return sorted(entries, key=lambda entry: priority.get(entry["company"], 4))


def experience_entry(pdf, y, entry):
    title = f"{entry['role']} | {entry['company']}"
    period = plain(entry["period"])
    title_width = stringWidth(plain(title), BOLD_FONT, 11.2)
    date_width = stringWidth(period, NORMAL_FONT, 10.3)
    if title_width + date_width + 18 <= CONTENT_W:
        pdf.setFillColor(INK)
        pdf.setFont(BOLD_FONT, 11.2)
        pdf.drawString(LEFT, y - 11.2, plain(title))
        pdf.setFillColor(SOFT)
        pdf.setFont(NORMAL_FONT, 10.3)
        pdf.drawRightString(RIGHT, y - 11.2, period)
        y -= 22
    else:
        y = draw_paragraph(pdf, f"<b>{markup(title)}</b>", y)
        y = draw_paragraph(pdf, markup(period), y, style=DETAIL)
        y -= 4
    for bullet in entry["bullets"]:
        y = draw_paragraph(pdf, f"- {bullet_markup(bullet)}", y, style=BULLET)
        y -= 3
    return y - 8


def build_plain_text(site, resume, education, experience):
    portfolio = site.get("portfolio")
    lines = [
        site["name"],
        resume.get("headline", "Software Engineer | Web & Mobile"),
        f"{english(site['location'])} | {english(site.get('opportunities', 'Open to remote software engineering roles'))}",
        f"Email: {site['email']}",
        f"GitHub: {site['github']}",
        f"LinkedIn: {site['linkedin']}",
    ]
    if portfolio:
        lines.append(f"Portfolio: {portfolio}")
    lines += ["", "SUMMARY", resume["profile"], "", "PROFESSIONAL EXPERIENCE"]
    for entry in experience:
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
        location = english(site["location"])
        opportunities = english(site.get("opportunities", "Open to remote software engineering roles"))
        y = draw_paragraph(pdf, markup(f"{location} | {opportunities}"), y, style=DETAIL)
        y -= 16
        contacts = [
            (site["email"], f"mailto:{site['email']}"),
            (short_url(site["github"]), site["github"]),
            ("LinkedIn", site["linkedin"]),
        ]
        if site.get("portfolio"):
            contacts.append(("Portfolio", site["portfolio"]))
        y = draw_contact_line(pdf, contacts, y)
        pdf.setStrokeColor(ACCENT)
        pdf.setLineWidth(1.3)
        pdf.line(LEFT, y - 2, RIGHT, y - 2)
        y -= 10

        y = section_title(pdf, "Summary", y)
        y = draw_paragraph(pdf, markup(resume["profile"]), y)

        y = section_title(pdf, "Professional Experience", y)
        for entry in experience:
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
