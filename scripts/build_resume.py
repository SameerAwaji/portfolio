from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Sameer_Awaji_Resume.pdf"

INK = HexColor("#171A17")
SOFT = HexColor("#50564F")
GREEN = HexColor("#123D37")
TEAL = HexColor("#0B6B61")
AMBER = HexColor("#E6A33A")
LINE = HexColor("#D5D0C3")
PAPER = HexColor("#FFFDF7")

PAGE_W, PAGE_H = letter
LEFT = 0.56 * inch
RIGHT = PAGE_W - 0.56 * inch
CONTENT_W = RIGHT - LEFT


def paragraph_style(
    name: str,
    *,
    font: str = "Helvetica",
    size: float = 8.7,
    leading: float = 11.5,
    color=SOFT,
    alignment=TA_LEFT,
    space_after: float = 0,
):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=alignment,
        spaceAfter=space_after,
        allowWidows=0,
        allowOrphans=0,
    )


BODY = paragraph_style("Body")
SUMMARY = paragraph_style("Summary", size=9.1, leading=12.4, color=INK)
BULLET = paragraph_style("Bullet", size=8.35, leading=10.7)
SKILL = paragraph_style("Skill", size=8.2, leading=10.5)


def draw_paragraph(pdf, text: str, x: float, y_top: float, width: float, style=BODY):
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, PAGE_H)
    paragraph.drawOn(pdf, x, y_top - height)
    return y_top - height


def section_title(pdf, title: str, y: float):
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 8.1)
    pdf.drawString(LEFT, y, title.upper())
    title_width = stringWidth(title.upper(), "Helvetica-Bold", 8.1)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.7)
    pdf.line(LEFT + title_width + 12, y + 2.5, RIGHT, y + 2.5)
    return y - 13


def experience_entry(pdf, y: float, role: str, company: str, period: str, bullets: list[str]):
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9.8)
    heading = f"{role} - {company}" if company else role
    pdf.drawString(LEFT, y, heading)
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 8.2)
    pdf.drawRightString(RIGHT, y + 0.4, period)
    y -= 15

    for bullet in bullets:
        y = draw_paragraph(pdf, f"<font color='#0B6B61'><b>-</b></font> {bullet}", LEFT, y, CONTENT_W, BULLET)
        y -= 4

    return y - 10


def build_resume():
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter)
    pdf.setTitle("Sameer Awaji - Resume")
    pdf.setAuthor("Sameer Awaji")
    pdf.setSubject("Software engineering, product, marketing, and web development experience")

    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    y = PAGE_H - 38

    pdf.setFillColor(GREEN)
    pdf.rect(LEFT, y - 35, 37, 37, stroke=0, fill=1)
    pdf.setFillColor(PAPER)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawCentredString(LEFT + 18.5, y - 21, "SA")

    name_x = LEFT + 49
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(name_x, y - 8, "Sameer Awaji")
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 9.6)
    pdf.drawString(name_x, y - 24, "SOFTWARE ENGINEER | PRODUCT & WEB DEVELOPMENT | MARKETING")

    pdf.setFillColor(SOFT)
    pdf.setFont("Helvetica", 8.3)
    contact = "sameer2study@gmail.com  |  github.com/SameerAwaji  |  linkedin.com/in/sameer-awaji-6a0986211"
    pdf.drawRightString(RIGHT, y - 36, contact)

    y -= 52
    pdf.setStrokeColor(LINE)
    pdf.line(LEFT, y, RIGHT, y)
    y -= 17

    y = section_title(pdf, "Profile", y)
    summary = (
        "Software engineer with experience in freelance development, product management, marketing, and web and mobile products. "
        "I began freelance work with Maeen in 2023, completed a Product Manager internship at Nana in early 2025, then joined "
        "MIP mainly as Marketing Manager while also developing its website. Since April 2026, I have worked at Mrasim, where "
        "QARAR is one of the projects I contribute to."
    )
    y = draw_paragraph(pdf, summary, LEFT, y, CONTENT_W, SUMMARY)
    y -= 12

    y = section_title(pdf, "Core capabilities", y)
    skill_rows = [
        ("Engineering", "React, Next.js, JavaScript, Flutter, Laravel, Supabase, REST APIs"),
        ("Product work", "Requirements, user journeys, stakeholder feedback, UAT, QA, release checks"),
        ("Marketing", "Marketing management, SEO, web performance, content and campaign coordination"),
        ("Languages & tools", "Arabic and English, Git, Figma, AI-assisted research and implementation"),
    ]
    label_width = 96
    for label, value in skill_rows:
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 8.25)
        pdf.drawString(LEFT, y - 8.5, label)
        y = draw_paragraph(pdf, value, LEFT + label_width, y, CONTENT_W - label_width, SKILL)
        y -= 2
    y -= 7

    y = section_title(pdf, "Experience", y)
    y = experience_entry(
        pdf,
        y,
        "Mrasim",
        "",
        "Apr 2026 - Present",
        [
            "QARAR is one of the projects I work on at Mrasim. My responsibilities include product clarification, Flutter and Laravel coordination, Arabic UX, authentication flows, QA, and release preparation.",
            "Write user flows and acceptance criteria, coordinate app and API changes, and test the end-to-end experience.",
        ],
    )
    y = experience_entry(
        pdf,
        y,
        "Marketing Manager",
        "MIP Marketing Agency",
        "2025 - Mar 2026",
        [
            "My main role was Marketing Manager. I also handled hands-on web development and connected the website work to the agency's marketing goals.",
            "Rebuilt the site in Next.js, improving its Lighthouse score from 77 to 100 and Largest Contentful Paint from 4.8s to 0.8s.",
        ],
    )
    y = experience_entry(
        pdf,
        y,
        "Product Manager Intern",
        "Nana",
        "Feb 2025 - Apr 2025",
        [
            "My first formal product role, covering engagement ideas, product documentation, competitor research, cross-functional work, and user acceptance testing.",
        ],
    )
    y = section_title(pdf, "Freelance work", y)
    y = experience_entry(
        pdf,
        y,
        "Freelance Developer",
        "Maeen",
        "2023 - Present",
        [
            "Develop and maintain Maeen's React and Supabase website, database-backed forms, and internal workflows as an independent freelancer.",
            "Work directly with stakeholders on requirements and feedback; delivered an internal dashboard built to support 60+ users.",
        ],
    )

    y -= 2
    y = section_title(pdf, "Education", y)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9.7)
    pdf.drawString(LEFT, y, "Bachelor of Software Engineering - University of Jeddah")
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 8.2)
    pdf.drawRightString(RIGHT, y + 0.4, "2024")
    y -= 14
    y = draw_paragraph(
        pdf,
        "GPA 4.48 / 5.0 | Focus: web development, algorithms, and software architecture",
        LEFT,
        y,
        CONTENT_W,
        BODY,
    )

    y -= 15
    y = section_title(pdf, "Selected outcomes", y)
    metrics = [
        ("77 to 100", "Lighthouse score on MIP"),
        ("4.8s to 0.8s", "LCP on the MIP rebuild"),
        ("60+", "People supported by Maeen dashboard"),
    ]
    metric_gap = 9
    metric_width = (CONTENT_W - (metric_gap * 2)) / 3
    metric_height = 58
    for index, (metric, label) in enumerate(metrics):
        x = LEFT + index * (metric_width + metric_gap)
        pdf.setStrokeColor(LINE)
        pdf.setLineWidth(0.7)
        pdf.rect(x, y - metric_height, metric_width, metric_height, stroke=1, fill=0)
        pdf.setFillColor(AMBER)
        pdf.rect(x, y - 3, metric_width, 3, stroke=0, fill=1)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 16)
        pdf.drawString(x + 11, y - 25, metric)
        pdf.setFillColor(SOFT)
        pdf.setFont("Helvetica", 7.6)
        pdf.drawString(x + 11, y - 42, label)

    pdf.setStrokeColor(AMBER)
    pdf.setLineWidth(2)
    pdf.line(LEFT, 25, RIGHT, 25)
    pdf.setFillColor(SOFT)
    pdf.setFont("Helvetica", 7.2)
    pdf.drawString(LEFT, 13, "Metrics relate to the projects and responsibilities described above.")

    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    build_resume()
