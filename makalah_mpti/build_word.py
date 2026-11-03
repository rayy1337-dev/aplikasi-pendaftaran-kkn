import os
import re
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
    """Set inner padding for a table cell (in twips: 20 twips = 1 pt)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex):
    """Set background color of a cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    tcPr.append(shd)

def set_table_borders(table, color="D1D5DB", sz="4"):
    """Set clean subtle borders for the table."""
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideV w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:left w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def format_run(run, font_name="Times New Roman", size_pt=12, bold=False, italic=False, color_rgb=(0, 0, 0)):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = RGBColor(*color_rgb)

def add_styled_paragraph(doc, text="", align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=6, line_spacing=1.5):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    if text:
        add_formatted_text(p, text)
    return p

def add_formatted_text(paragraph, text, font_name="Times New Roman", size_pt=12, default_color=(0, 0, 0)):
    """Parse inline markdown: **bold**, *italic*, `code`, and plain text."""
    pattern = r'(\*\*.*?\*\*|\*.*?\*|`.*?`|\$\$.*?\$\$|\$.*?\$)'
    tokens = re.split(pattern, text)
    for token in tokens:
        if not token:
            continue
        if token.startswith('**') and token.endswith('**') and len(token) >= 4:
            run = paragraph.add_run(token[2:-2])
            format_run(run, font_name=font_name, size_pt=size_pt, bold=True, color_rgb=default_color)
        elif token.startswith('*') and token.endswith('*') and len(token) >= 2:
            run = paragraph.add_run(token[1:-1])
            format_run(run, font_name=font_name, size_pt=size_pt, italic=True, color_rgb=default_color)
        elif token.startswith('`') and token.endswith('`') and len(token) >= 2:
            run = paragraph.add_run(token[1:-1])
            format_run(run, font_name="Consolas", size_pt=size_pt-1.5, color_rgb=(185, 28, 28))
        elif (token.startswith('$') and token.endswith('$')) or (token.startswith('$$') and token.endswith('$$')):
            clean_math = token.strip('$').strip()
            run = paragraph.add_run(clean_math)
            format_run(run, font_name="Cambria Math", size_pt=size_pt, italic=True, color_rgb=(30, 58, 138))
        else:
            run = paragraph.add_run(token)
            format_run(run, font_name=font_name, size_pt=size_pt, color_rgb=default_color)

def add_callout_box(doc, text, title=None, border_color="004532", fill_color="F8FAFC"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_color}"/>')
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="160" w:type="dxa"/>'
        f'<w:bottom w:w="160" w:type="dxa"/>'
        f'<w:left w:w="240" w:type="dxa"/>'
        f'<w:right w:w="200" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/>'
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'<w:left w:val="single" w:sz="36" w:space="0" w:color="{border_color}"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(shd)
    tcPr.append(tcMar)
    tcPr.append(tcBorders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    
    if title:
        run_title = p.add_run(title + "\n")
        format_run(run_title, font_name="Times New Roman", size_pt=11, bold=True, color_rgb=(0, 69, 50))
    
    for line in text.split('\n'):
        if line.strip():
            p_line = cell.add_paragraph() if p.text else p
            p_line.paragraph_format.space_before = Pt(1)
            p_line.paragraph_format.space_after = Pt(2)
            p_line.paragraph_format.line_spacing = 1.15
            add_formatted_text(p_line, line, font_name="Times New Roman", size_pt=10.5, default_color=(30, 41, 59))
            p = p_line

def add_code_box(doc, code_text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="F1F5F9"/>')
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="140" w:type="dxa"/>'
        f'<w:bottom w:w="140" w:type="dxa"/>'
        f'<w:left w:w="180" w:type="dxa"/>'
        f'<w:right w:w="180" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:left w:val="single" w:sz="18" w:space="0" w:color="004532"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(shd)
    tcPr.append(tcMar)
    tcPr.append(tcBorders)
    
    first = True
    for line in code_text.split('\n'):
        if first:
            p = cell.paragraphs[0]
            first = False
        else:
            p = cell.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(1)
        p.paragraph_format.line_spacing = 1.05
        run = p.add_run(line if line else " ")
        format_run(run, font_name="Consolas", size_pt=9.0, color_rgb=(15, 23, 42))

def create_table_from_markdown(doc, header_row, data_rows):
    cols_count = len(header_row)
    table = doc.add_table(rows=len(data_rows) + 1, cols=cols_count)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = True
    set_table_borders(table, color="D1D5DB", sz="4")
    
    # Repeat header row on every page
    header_tr = table.rows[0]._tr.get_or_add_trPr()
    header_tr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
    
    # Format Header Row
    for idx, col_name in enumerate(header_row):
        cell = table.cell(0, idx)
        set_cell_shading(cell, "004532")  # Deep Emerald
        set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.line_spacing = 1.15
        run = p.add_run(col_name.strip())
        format_run(run, font_name="Times New Roman", size_pt=10.5, bold=True, color_rgb=(255, 255, 255))
    
    # Format Data Rows
    for r_idx, row_data in enumerate(data_rows):
        tr = table.rows[r_idx + 1]._tr.get_or_add_trPr()
        tr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        
        bg_color = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx in range(cols_count):
            cell = table.cell(r_idx + 1, c_idx)
            set_cell_shading(cell, bg_color)
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            
            val = row_data[c_idx].strip() if c_idx < len(row_data) else ""
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(1)
            p.paragraph_format.line_spacing = 1.15
            
            # Align center for short numbers/codes, left for text
            if len(val) <= 4 or val in ['Pass', 'Fail', 'Kritis', 'Non-Kritis', 'Tinggi', 'Sedang', 'Rendah', '1 Mgg', '2 Mgg', '3 Mgg']:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                
            add_formatted_text(p, val, font_name="Times New Roman", size_pt=10.0, default_color=(15, 23, 42))

def build_cover_page(doc):
    # Title Section
    p_inst = add_styled_paragraph(doc, "KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2, line_spacing=1.15)
    for r in p_inst.runs: r.font.bold = True; r.font.size = Pt(12)
    
    p_fac = add_styled_paragraph(doc, "FAKULTAS TEKNIK DAN ILMU KOMPUTER\nPROGRAM STUDI S1 INFORMATIKA", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24, line_spacing=1.15)
    for r in p_fac.runs: r.font.bold = True; r.font.size = Pt(13)
    
    p_div = add_styled_paragraph(doc, "______________________________________________________________________", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=32)
    for r in p_div.runs: r.font.color.rgb = RGBColor(0, 69, 50); r.font.bold = True
    
    p_makalah = add_styled_paragraph(doc, "MAKALAH UJIAN TENGAH SEMESTER (UTS)\nMANAJEMEN PROYEK TEKNOLOGI INFORMASI (MPTI)\nTA. 2026/2027", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=18, line_spacing=1.3)
    for r in p_makalah.runs: r.font.bold = True; r.font.size = Pt(14); r.font.color.rgb = RGBColor(0, 69, 50)
    
    p_title = add_styled_paragraph(doc, "ANALISIS MANAJEMEN PROYEK PADA PENGEMBANGAN\nSISTEM INFORMASI PENDAFTARAN KULIAH KERJA NYATA (SIM KKN)\nBERBASIS WEB", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=36, line_spacing=1.3)
    for r in p_title.runs: r.font.bold = True; r.font.size = Pt(15); r.font.color.rgb = RGBColor(15, 23, 42)
    
    # Metadata Box
    p_meta = add_styled_paragraph(doc, "Disusun untuk Memenuhi Penilaian Ujian Tengah Semester Berbasis OBE\nMata Kuliah: Manajemen Proyek Teknologi Informasi (5ITA1)\nDosen Pengampu: Maysas Yafi Urrochman, S.E., M.Kom", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=36, line_spacing=1.2)
    for r in p_meta.runs: r.font.italic = True; r.font.size = Pt(11)
    
    p_kel = add_styled_paragraph(doc, "DISUSUN OLEH:\nKELOMPOK 2", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=14, line_spacing=1.15)
    for r in p_kel.runs: r.font.bold = True; r.font.size = Pt(12)
    
    # Team Table on Cover
    table = doc.add_table(rows=5, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table, color="004532", sz="6")
    
    headers = ["No", "Nama Mahasiswa", "NIM", "Peran Proyek"]
    for i, h in enumerate(headers):
        c = table.cell(0, i)
        set_cell_shading(c, "004532")
        set_cell_margins(c, top=100, bottom=100, left=120, right=120)
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        format_run(r, font_name="Times New Roman", size_pt=10.5, bold=True, color_rgb=(255, 255, 255))
        
    members = [
        ("1", "Rayhan", "220101001", "Project Manager & QA Lead"),
        ("2", "Virdi", "220101015", "UI/UX Designer & Analyst"),
        ("3", "Feris", "220101032", "Frontend Developer"),
        ("4", "Ricko", "220101048", "Backend Developer & DBA")
    ]
    for row_idx, mem in enumerate(members):
        for col_idx in range(4):
            c = table.cell(row_idx + 1, col_idx)
            set_cell_margins(c, top=80, bottom=80, left=100, right=100)
            p = c.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx in [0, 2] else WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(mem[col_idx])
            format_run(r, font_name="Times New Roman", size_pt=10.5, color_rgb=(15, 23, 42))
            
    p_foot = add_styled_paragraph(doc, "\n\nPROGRAM STUDI S1 INFORMATIKA\n2026", align=WD_ALIGN_PARAGRAPH.CENTER, space_before=40, space_after=0)
    for r in p_foot.runs: r.font.bold = True; r.font.size = Pt(12)
    
    doc.add_page_break()

def convert_markdown_to_docx(md_path, docx_path):
    print(f"[INFO] Membaca file markdown: {md_path}")
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    doc = docx.Document()
    
    # Page Setup (A4 with 4cm Left, 3cm Top, 3cm Right, 3cm Bottom)
    section = doc.sections[0]
    section.page_width = Inches(8.27)   # A4
    section.page_height = Inches(11.69) # A4
    section.left_margin = Inches(1.57)  # 4 cm
    section.right_margin = Inches(1.18) # 3 cm
    section.top_margin = Inches(1.18)   # 3 cm
    section.bottom_margin = Inches(1.18)# 3 cm

    # Build Elegant Academic Cover Page
    print("[INFO] Menyusun Halaman Judul / Cover formal...")
    build_cover_page(doc)

    lines = content.split('\n')
    i = 0
    total_lines = len(lines)
    
    # State tracking
    in_code_block = False
    code_block_lines = []
    in_table = False
    table_header = []
    table_rows = []
    
    print("[INFO] Memproses konten bab dan tabel...")
    while i < total_lines:
        line = lines[i]
        stripped = line.strip()
        
        # Skip the original markdown cover lines (since we built an executive cover page)
        if i < 45 and ("# MAKALAH UJIAN TENGAH SEMESTER" in line or "SUSUNAN ANGGOTA" in line or "| **Mata Kuliah**" in line):
            i += 1
            continue
            
        # Code Block Delimiter
        if stripped.startswith('```'):
            if in_code_block:
                in_code_block = False
                code_text = '\n'.join(code_block_lines)
                add_code_box(doc, code_text)
                code_block_lines = []
            else:
                in_code_block = True
                code_block_lines = []
            i += 1
            continue
            
        if in_code_block:
            code_block_lines.append(line)
            i += 1
            continue

        # Markdown Table Detection
        if '|' in line and not in_code_block:
            parts = [p.strip() for p in line.strip().split('|')]
            if parts and parts[0] == '': parts.pop(0)
            if parts and parts[-1] == '': parts.pop()
            
            # Check if this line is separator (|---|---|)
            is_separator = all(re.match(r'^:?-+:?$', p) for p in parts if p)
            
            if is_separator:
                # previous line was header
                i += 1
                continue
                
            if not in_table:
                # First row of table
                in_table = True
                table_header = parts
                table_rows = []
            else:
                table_rows.append(parts)
                
            # Check if next line is not a table row
            if i + 1 < total_lines and '|' not in lines[i + 1]:
                # End of table
                create_table_from_markdown(doc, table_header, table_rows)
                add_styled_paragraph(doc, "", space_after=6) # Spacing after table
                in_table = False
                table_header = []
                table_rows = []
            i += 1
            continue
        else:
            if in_table:
                create_table_from_markdown(doc, table_header, table_rows)
                add_styled_paragraph(doc, "", space_after=6)
                in_table = False
                table_header = []
                table_rows = []

        # Empty line
        if not stripped:
            i += 1
            continue

        # Horizontal rule
        if stripped in ['---', '***', '___']:
            i += 1
            continue

        # Headings
        if stripped.startswith('# '):
            heading_text = stripped[2:].strip()
            # If it's a major chapter (BAB), add page break
            if "BAB " in heading_text or "KATA PENGANTAR" in heading_text or "DAFTAR ISI" in heading_text or "DAFTAR PUSTAKA" in heading_text:
                doc.add_page_break()
                p = add_styled_paragraph(doc, heading_text, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=18, space_after=14)
                for r in p.runs:
                    r.font.bold = True
                    r.font.size = Pt(14)
                    r.font.color.rgb = RGBColor(0, 69, 50)
            else:
                p = add_styled_paragraph(doc, heading_text, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=16, space_after=8)
                for r in p.runs:
                    r.font.bold = True
                    r.font.size = Pt(13)
                    r.font.color.rgb = RGBColor(15, 23, 42)
            i += 1
            continue
            
        if stripped.startswith('## '):
            heading_text = stripped[3:].strip()
            p = add_styled_paragraph(doc, heading_text, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=14, space_after=6)
            for r in p.runs:
                r.font.bold = True
                r.font.size = Pt(13)
                r.font.color.rgb = RGBColor(0, 69, 50)
            i += 1
            continue

        if stripped.startswith('### '):
            heading_text = stripped[4:].strip()
            p = add_styled_paragraph(doc, heading_text, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=10, space_after=4)
            for r in p.runs:
                r.font.bold = True
                r.font.size = Pt(12)
                r.font.color.rgb = RGBColor(30, 41, 59)
            i += 1
            continue

        if stripped.startswith('#### '):
            heading_text = stripped[5:].strip()
            p = add_styled_paragraph(doc, heading_text, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=8, space_after=3)
            for r in p.runs:
                r.font.bold = True
                r.font.italic = True
                r.font.size = Pt(11.5)
                r.font.color.rgb = RGBColor(51, 65, 85)
            i += 1
            continue

        # Blockquote / Alert
        if stripped.startswith('> '):
            quote_text = stripped[2:].strip()
            alert_title = None
            if quote_text.startswith('[!IMPORTANT]'):
                alert_title = "PENTING (KEY TAKEAWAY)"
                quote_text = quote_text.replace('[!IMPORTANT]', '').strip()
            elif quote_text.startswith('[!WARNING]'):
                alert_title = "PERINGATAN (WARNING)"
                quote_text = quote_text.replace('[!WARNING]', '').strip()
            elif quote_text.startswith('[!NOTE]'):
                alert_title = "CATATAN (NOTE)"
                quote_text = quote_text.replace('[!NOTE]', '').strip()
                
            # Collect multiline quote if any
            while i + 1 < total_lines and lines[i+1].strip().startswith('>'):
                i += 1
                quote_text += "\n" + lines[i].strip()[1:].strip()
                
            add_callout_box(doc, quote_text, title=alert_title)
            i += 1
            continue

        # Bullet List
        if re.match(r'^[\*\-]\s+', stripped):
            item_text = re.sub(r'^[\*\-]\s+', '', stripped)
            p = doc.add_paragraph(style='List Bullet')
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.line_spacing = 1.25
            add_formatted_text(p, item_text, font_name="Times New Roman", size_pt=11.5)
            i += 1
            continue

        # Numbered List
        if re.match(r'^\d+\.\s+', stripped):
            item_text = re.sub(r'^\d+\.\s+', '', stripped)
            p = doc.add_paragraph(style='List Number')
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.line_spacing = 1.25
            add_formatted_text(p, item_text, font_name="Times New Roman", size_pt=11.5)
            i += 1
            continue

        # Standard Paragraph
        add_styled_paragraph(doc, stripped, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=6, line_spacing=1.5)
        i += 1

    # Save Document
    print(f"[INFO] Menyimpan dokumen Word ke: {docx_path}")
    doc.save(docx_path)
    print("[SUCCESS] Dokumen Word (.docx) berhasil dibuat dengan sempurna!")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    md_file = os.path.join(current_dir, "MAKALAH_UTS_MPTI_KELOMPOK_2.md")
    docx_file = os.path.join(current_dir, "MAKALAH_UTS_MPTI_KELOMPOK_2.docx")
    convert_markdown_to_docx(md_file, docx_file)
