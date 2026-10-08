# PANDUAN DAN DAFTAR TUGAS: PROJECT MANAGER (PM)

**Penanggung Jawab:** Rayhan  
**Peran:** Project Manager (PM) & QA Lead  
**Branch:** `rayhan-pm`  

---

## Deskripsi Peran
Sebagai Project Manager, Anda memimpin jalannya proyek secara keseluruhan, memastikan alur koordinasi antar anggota (Virdi, Feris, Ricko) berjalan lancar, menjaga timeline 4 minggu sesuai target, melakukan pengujian sistem (QA), serta bertanggung jawab penuh atas luaran dokumen laporan dan materi presentasi akhir.

---

## Rincian Tugas dan Tanggung Jawab

### 1. Manajemen Tim & Timeline
- Menyusun papan tugas (Trello / Notion / GitHub Projects) dan membagikan kartu tugas kepada masing-masing anggota.
- Mengadakan evaluasi singkat mingguan (standup sync) untuk memantau progres dan mengatasi kendala teknis (blocker).
- Memastikan handoff dari Desain (Virdi) ke Frontend (Feris) dan kesiapan API (Ricko) berjalan tepat waktu.

### 2. Dokumen Kebutuhan Sistem (SRS)
- Menentukan daftar kebutuhan fungsional (FR) dan non-fungsional (NFR) sistem pendaftaran KKN.
- Memastikan semua fitur utama pada brief terpenuhi:
  - Registrasi & login mahasiswa
  - Pengisian form pendaftaran multi-step
  - Pemilihan lokasi KKN dan validasi kuota
  - Upload berkas persyaratan
  - Verifikasi dan catatan revisi oleh admin
  - Pengumuman hasil penempatan

### 3. Quality Assurance (QA) & Pengujian Sistem
- Menyusun tabel skenario uji (Blackbox Testing) untuk dua sisi pengguna:
  - Sisi Mahasiswa: registrasi, login, alur pendaftaran, pemilihan lokasi saat kuota penuh, upload file berbagai format/ukuran, dan melihat status.
  - Sisi Admin: login admin, validasi berkas, penolakan dengan catatan revisi, persetujuan pendaftar, dan update status lokasi.
- Mencatat temuan bug ke dalam issue list untuk ditindaklanjuti oleh Frontend (Feris) dan Backend (Ricko).

### 4. Penyusunan Laporan Proyek
Mengoordinasikan dan menyusun laporan akhir tugas besar dengan struktur:
- Bab 1: Pendahuluan (Latar belakang, rumusan masalah, tujuan, batasan sistem).
- Bab 2: Analisis dan Perancangan (Analisis kebutuhan, User Flow, Use Case, Activity Diagram, ERD basis data, Wireframe/Mockup).
- Bab 3: Implementasi Sistem (Arsitektur sistem, tech stack React.js & DB, implementasi antarmuka, implementasi API).
- Bab 4: Pengujian dan Evaluasi (Tabel skenario uji blackbox, hasil pengujian, evaluasi kendala).
- Bab 5: Penutup (Kesimpulan dan saran pengembangan).
- Lampiran: Dokumentasi pengerjaan tim dan logbook kontribusi anggota.

### 5. Presentasi Hasil & Demo
- Menyusun slide presentasi akhir yang profesional dan ringkas (10-15 slide).
- Mempersiapkan skenario alur demo aplikasi langsung dari sisi mahasiswa hingga verifikasi admin.
- Memimpin jalannya sesi presentasi dan pembagian segmen bicara bagi setiap anggota kelompok.

---

## Checklist Progres Mingguan

### Minggu 1: Inisiasi & Perencanaan
- [ ] Membuat backlog tugas di GitHub Projects / Trello.
- [ ] Menyusun spesifikasi kebutuhan sistem pendaftaran KKN.
- [ ] Memvalidasi rancangan alur user flow dan wireframe dari Virdi.
- [ ] Memvalidasi skema ERD database dari Ricko.

### Minggu 2: Monitoring Tahap Awal Development
- [ ] Memastikan Virdi menyelesaikan High-Fidelity UI di Figma dan handoff ke Feris.
- [ ] Memastikan Ricko menyelesaikan API Autentikasi dan CRUD data master lokasi.
- [ ] Memastikan Feris menyelesaikan struktur proyek React.js dan layout dasar.

### Minggu 3: Monitoring Integrasi Fitur Utama
- [ ] Memastikan modul formulir pendaftaran, upload berkas, dan dashboard verifikasi admin berfungsi.
- [ ] Memulai penulisan draf Bab 1, Bab 2, dan Bab 3 Laporan Proyek.
- [ ] Memantau pengujian awal integrasi API frontend-backend.

### Minggu 4: QA, Finalisasi Dokumen, & Presentasi
- [ ] Melakukan pengujian menyeluruh (UAT & Blackbox Testing) dan rekap bug fix.
- [ ] Menyelesaikan Bab 4 dan Bab 5 Laporan Proyek serta kompilasi lampiran.
- [ ] Membuat slide deck presentasi dan gladi resik demo sistem bersama seluruh anggota.
- [ ] Merge akhir seluruh branch ke `main` dan verifikasi kestabilan rilis.
