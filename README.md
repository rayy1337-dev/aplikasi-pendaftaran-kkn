# Aplikasi Pendaftaran KKN

**Mata Kuliah:** Tugas MPTI Kelompok 2
**Kelompok:** 2  
**Topik:** Sistem Informasi Pendaftaran Kuliah Kerja Nyata (KKN)

---

## Tentang Proyek
Aplikasi berbasis web untuk memudahkan mahasiswa dalam proses pendaftaran KKN, pemilihan lokasi/desa, upload berkas persyaratan, serta mempermudah panitia/admin dalam melakukan verifikasi pendaftar dan pengumuman penempatan KKN.

---

## Tim Pengembang
| No | Nama | Peran | Branch Git |
|---|---|---|---|
| 1 | **Rayhan** | Project Manager (PM) | `rayhan-pm` |
| 2 | **Feris** | Frontend Developer | `feris-frontend` |
| 3 | **Ricko** | Backend Developer | `ricko-backend` |
| 4 | **Virdi** | UI/UX Designer | `virdi-uiux` |

Dokumentasi rencana kerja dan timeline lengkap dapat dibaca pada file [plan.md](plan.md).

---

## Struktur Branch Git
- `main` : Branch utama kode yang sudah stabil dan siap dipresentasikan.
- `rayhan-pm` : Branch Project Manager (memiliki file `TUGAS.md` untuk manajemen dokumen, laporan, dan QA).
- `feris-frontend` : Branch Frontend Developer (memiliki file `TUGAS.md` untuk panduan slicing React.js & integrasi API).
- `ricko-backend` : Branch Backend Developer (memiliki file `TUGAS.md` untuk skema ERD, spesifikasi REST API, & upload).
- `virdi-uiux` : Branch UI/UX Designer (memiliki file `TUGAS.md` untuk daftar halaman Figma, style guide, & aset).

Setiap anggota dapat membuka file `TUGAS.md` setelah beralih ke branch masing-masing untuk melihat rincian pekerjaan dan checklist progres mingguannya.

---

## Panduan Alur Kerja Git (Git Workflow)
Bagi setiap anggota, silakan ikuti langkah berikut untuk bekerja di branch masing-masing:

1. **Clone repository:**
   ```bash
   git clone https://github.com/rayy1337-dev/aplikasi-pendaftaran-kkn.git
   cd aplikasi-pendaftaran-kkn
   ```

2. **Pindah ke branch masing-masing:**
   - Feris: `git checkout feris-frontend`
   - Ricko: `git checkout ricko-backend`
   - Virdi: `git checkout virdi-uiux`
   - Rayhan: `git checkout rayhan-pm`

3. **Simpan dan push perubahan:**
   ```bash
   git add .
   git commit -m "Deskripsi perubahan yang dikerjakan"
   git push origin <nama-branch-anda>
   ```

4. **Penggabungan ke `main`:**
   Buat **Pull Request (PR)** di GitHub dari branch Anda ke branch `main`, lalu diskusikan/review bersama PM sebelum di-merge.
