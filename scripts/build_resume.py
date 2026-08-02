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
    pdf.drawString(LEFT, y, f"{role} - {company}")
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
    pdf.setSubject("Software engineering, product, marketing, and delivery experience")

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
    pdf.drawString(name_x, y - 24, "SOFTWARE ENGINEERING | PRODUCT | MARKETING | DELIVERY")

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
        "Product-minded software engineer with experience across freelance product development, product management, "
        "marketing leadership, and hands-on web and mobile delivery. After a Product Manager internship at Nana, "
        "I joined MIP primarily as Marketing Manager while also owning web-development outcomes. Since April 2026, "
        "I have worked at Mrasim on products including QARAR. Maeen has been an independent freelance project since 2023."
    )
    y = draw_paragraph(pdf, summary, LEFT, y, CONTENT_W, SUMMARY)
    y -= 12

    y = section_title(pdf, "Core capabilities", y)
    skill_rows = [
        ("Engineering", "React, Next.js, JavaScript, Flutter, Laravel, Supabase, REST APIs"),
        ("Product & delivery", "Requirements, user journeys, stakeholder iteration, UAT, QA, release verification"),
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
        "Product & Software Delivery",
        "Mrasim",
        "Apr 2026 - Present",
        [
            "Contribute to Mrasim product work including QARAR across product clarification, Flutter/Laravel coordination, Arabic-first UX, authentication journeys, QA, and release preparation.",
            "Translate ambiguous requirements into scoped user paths, implementation decisions, and real-path verification evidence.",
        ],
    )
    y = experience_entry(
        pdf,
        y,
        "Marketing Manager",
        "MIP Marketing Agency",
        "2025 - 2026",
        [
            "Worked primarily in marketing management after Nana while also handling hands-on web development and aligning the agency website with its marketing goals.",
            "Rebuilt the site in Next.js, improving Lighthouse performance from 77 to 100 and Largest Contentful Paint from 4.8s to 0.8s.",
        ],
    )
    y = experience_entry(
        pdf,
        y,
        "Product Manager Intern",
        "Nana",
        "Feb 2025 - Apr 2025",
        [
            "Contributed to customer-engagement concepts, cross-functional product documentation, competitive analysis, and user acceptance testing.",
        ],
    )
    y = experience_entry(
        pdf,
        y,
        "Freelance Product & Web Development",
        "Maeen",
        "Since 2023",
        [
            "Built and iterated on the React/Supabase public product, database-backed forms, and stakeholder-facing workflows as an independent freelance project.",
            "Delivered an internal progress dashboard supporting 60+ users while managing requirements and feedback directly with stakeholders.",
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
        ("77 to 100", "Lighthouse performance"),
        ("4.8s to 0.8s", "Largest Contentful Paint"),
        ("60+", "Users supported by internal software"),
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
    pdf.drawString(LEFT, 13, "Selected outcomes are scoped to the work described; project contributions do not imply sole authorship.")

    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    build_resume()
