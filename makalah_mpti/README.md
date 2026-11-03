# PANDUAN DOKUMEN MAKALAH UTS MPTI KELOMPOK 2

Direktori ini (`makalah_mpti/`) berisi dokumen resmi Makalah Ujian Tengah Semester (UTS) mata kuliah **Manajemen Proyek Teknologi Informasi (MPTI)** untuk **Kelompok 2 (Topik: Aplikasi Pendaftaran KKN)**.

---

## 📄 File Utama

* **[MAKALAH_UTS_MPTI_KELOMPOK_2.md](MAKALAH_UTS_MPTI_KELOMPOK_2.md)**: Dokumen lengkap makalah akademik terstruktur dari Halaman Judul, Kata Pengantar, Daftar Isi, Bab I s/d Bab VII, hingga Daftar Pustaka, yang secara khusus menjawab seluruh butir Soal UTS MPTI Ganjil 2026/2027 (Soal 1 s/d Soal 6) dengan nilai 100 poin berbasis OBE.

---

## 📑 Struktur Isi Makalah & Pemetaan Soal UTS

| Bagian Dokumen | Butir Soal UTS MPTI Terkait | Poin & Pemetaan CPL/CPMK | Ringkasan Konten Utama |
|---|---|:---:|---|
| **Bab I: Analisis Kebutuhan Proyek** | Soal 1 (Analisis Kebutuhan) | 15 Poin<br>[CPL03 \| CPMK031 \| Sub-CPMK0311] | Problem statement antrean LPPM & race condition kuota, tujuan SMART, 6 stakeholder utama, kebutuhan fungsional (FR-01 s/d FR-07) dan non-fungsional (NFR). |
| **Bab II: Project Charter** | Soal 2 (Project Charter) | 20 Poin<br>[CPL03 \| CPMK031 \| Sub-CPMK0312] | Piagam proyek formal, latar belakang, tujuan, deliverable, susunan tim, triple constraints, asumsi, dan kriteria sukses. |
| **Bab III: Ruang Lingkup & WBS** | Soal 3 (Scope & WBS) | 20 Poin<br>[CPL03 \| CPMK031 \| Sub-CPMK0313] | In Scope & Out of Scope tegas, diagram hierarki WBS Level 1–3, serta Kamus WBS (WBS Dictionary) untuk 8 Work Package (WP-1.1 s/d WP-1.8). |
| **Bab IV: Penjadwalan Proyek & CPM** | Soal 4 (Penjadwalan Proyek) | 20 Poin<br>[CPL03 \| CPMK032 \| Sub-CPMK0321, Sub-CPMK0324] | Baseline aktivitas A–H, diagram jaringan PDM, tabel Forward/Backward Pass & Float, Jalur Kritis (10 Minggu), analisis Fast-Tracking vs Crashing, dan skenario keterlambatan aktivitas inti D 1 minggu dari 5 dimensi. |
| **Bab V: Manajemen Risiko Proyek** | Soal 5 (Manajemen Risiko) | 15 Poin<br>[CPL03 \| CPMK032 \| Sub-CPMK0322] | Identifikasi 5 risiko nyata (konflik port 5000, bug totalSks, merge conflict, dsb), matriks nilai risiko, dampak ke mutu/komunikasi/stakeholder, mitigasi preventif/kontingensi, serta justifikasi 2 risiko prioritas tertinggi. |
| **Bab VI: Dokumentasi, Tim, & Progres** | Soal 6 (Dokumentasi & Progres) | 10 Poin<br>[CPL09 \| CPMK091, CPMK092 \| Sub-CPMK0913, Sub-CPMK0922] | Pembagian peran tim & RACI matrix, prosedur koordinasi & toolset (Git, Postman, Stitch, Discord), progres nyata sebelum UTS, keputusan teknis, dan bukti artefak repositori/screenshot/database. |
| **Bab VII: Penutup & Pustaka** | Sintesis & Standar Ilmiah | - | Kesimpulan kesiapan status Alpha Release E2E dan daftar pustaka standar IEEE/PMBOK 7th Ed. |

---

## 🖨️ Cara Konversi ke Format Word / PDF

1. **Menggunakan VS Code Extension:**
   - Pasang ekstensi **Markdown PDF** atau **Markdown All in One** di VS Code.
   - Buka file `makalah_mpti/MAKALAH_UTS_MPTI_KELOMPOK_2.md`.
   - Klik kanan pada editor $\rightarrow$ pilih **Markdown PDF: Export (pdf)** atau **Markdown PDF: Export (docx)**.
2. **Menggunakan Pandoc (Command Line):**
   ```bash
   pandoc makalah_mpti/MAKALAH_UTS_MPTI_KELOMPOK_2.md -o makalah_mpti/MAKALAH_UTS_MPTI_KELOMPOK_2.docx
   ```
3. **Copy-Paste langsung ke Google Docs / Microsoft Word:**
   - Buka preview markdown di editor atau browser, lalu salin langsung teks berformat ke dalam Microsoft Word untuk disesuaikan tata letak font (Times New Roman / Calibri, Margin 4-4-3-3, Spasi 1.5).
