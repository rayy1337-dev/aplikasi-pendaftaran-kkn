# PANDUAN DAN DAFTAR TUGAS: UI/UX DESIGNER

**Penanggung Jawab:** Virdi  
**Peran:** UI/UX Designer & Product Designer  
**Branch:** `virdi-uiux`  

---

## Deskripsi Peran
Sebagai UI/UX Designer, Anda bertanggung jawab merancang seluruh pengalaman pengguna (UX) dan antarmuka visual (UI) aplikasi pendaftaran KKN di Figma. Hasil desain Anda menjadi acuan utama bagi Feris (Frontend Developer) dalam membangun antarmuka React.js dan menjadi bahan visual penting untuk Laporan Proyek Rayhan (PM).

---

## Rincian Desain & Deliverables

### 1. User Flow & Wireframing (Lo-Fi)
- Merancang bagan alur pendaftaran mahasiswa dari awal hingga selesai:
  - Registrasi/Login -> Isi Biodata -> Pilih Lokasi -> Upload Dokumen -> Submit -> Menunggu Verifikasi -> Pengumuman Penempatan.
- Merancang alur verifikasi admin:
  - Login Admin -> Buka Daftar Pendaftar -> Review Dokumen -> Aksi (Terima / Minta Revisi / Tolak) -> Rilis Pengumuman.
- Membuat sketsa tata letak awal (Wireframe Lo-Fi) di Figma untuk menentukan posisi navigasi, formulir, dan tabel.

### 2. Design System & Style Guide
Buat komponen standar yang konsisten di Figma sebelum mendesain halaman lengkap:
- **Palet Warna:**
  - Warna Utama (Primary): Nuansa hijau akademik / biru kampus (sesuai tema KKN).
  - Warna Status: Hijau (Diterima / Terverifikasi), Kuning/Oranye (Menunggu / Butuh Revisi), Merah (Ditolak / Kuota Penuh).
  - Warna Netral: Abu-abu gelap untuk teks, putih dan abu-abu terang untuk latar belakang.
- **Tipografi:** Menggunakan font modern dan mudah dibaca (misalnya: Inter, Roboto, atau Poppins).
- **Komponen UI Reusable:** Tombol (Primary, Secondary, Danger), Form Input & Dropdown, Badge Status, Card Lokasi, Modal Dialog, Progress Stepper.

### 3. Daftar Halaman High-Fidelity (Hi-Fi) yang Harus Didesain

#### A. Halaman Publik & Autentikasi
- **Landing Page:**
  - Header dengan logo dan menu navigasi (Beranda, Panduan, Jadwal, Login).
  - Hero banner pendaftaran KKN dilengkapi ilustrasi mahasiswa dan tombol "Daftar Sekarang".
  - Kartu panduan 4 langkah pendaftaran: Isi Formulir -> Pilih Lokasi -> Upload Berkas -> Konfirmasi.
  - Bagian linimasa jadwal pelaksanaan KKN dan bagian FAQ.
- **Halaman Login & Registrasi:**
  - Formulir login mahasiswa & login admin.
  - Formulir registrasi akun mahasiswa baru.

#### B. Portal Mahasiswa (Pendaftaran KKN)
- **Wizard Pendaftaran Multi-Step:**
  - *Langkah 1:* Formulir data diri & akademik (NIM, Nama, Jurusan, Fakultas, No HP, SKS).
  - *Langkah 2:* Katalog pemilihan lokasi KKN dalam bentuk kartu desa/wilayah, lengkap dengan indikator kuota (misal: "Sisa Kuota: 5 dari 20 orang").
  - *Langkah 3:* Area unggah berkas persyaratan (KTM, Transkrip Nilai, Surat Kesehatan) dengan area drag-and-drop dan petunjuk batas ukuran file.
  - *Langkah 4:* Ringkasan formulir pendaftaran untuk konfirmasi akhir dan tampilan bukti registrasi berhasil.
- **Dashboard Status Mahasiswa:**
  - Kartu informasi status verifikasi pendaftaran (`Menunggu`, `Diverifikasi`, `Revisi Berkas`, `Diterima`).
  - Tampilan catatan revisi dari admin dan form unggah ulang berkas jika berstatus revisi.
  - Halaman pengumuman kelompok dan lokasi penempatan KKN.

#### C. Dashboard Admin (Pengelolaan & Verifikasi)
- **Ringkasan / Overview:** Kartu statistik total pendaftar, kuota per lokasi, pendaftar belum diverifikasi, dan pendaftar lolos.
- **Tabel Verifikasi Pendaftar:**
  - Tabel dengan kolom NIM, Nama, Lokasi Dipilih, Tanggal Daftar, Status, dan Tombol Aksi.
  - Fitur filter status dan pencarian pendaftar.
- **Modal Detail & Preview Berkas:**
  - Tampilan pratinjau dokumen (PDF/gambar KTM dan transkrip) untuk diperiksa admin.
  - Tombol aksi verifikasi: `Terima`, `Minta Revisi`, `Tolak`, disertai kolom input catatan revisi.
- **Halaman Kelola Lokasi:** Form tambah lokasi KKN baru dan ubah kuota maksimal per desa.

### 4. Handoff ke Frontend (Feris)
- Membagikan tautan file Figma dengan akses Dev Mode / Viewer kepada tim.
- Mengekspor semua aset ilustrasi dan icon dalam format SVG atau PNG transparan.
- Menyimpan tautan Figma dan aset di branch ini (bisa diletakkan di folder `design/`).

---

## Checklist Progres Mingguan

### Minggu 1: Riset, Alur, & Design System
- [ ] Menyusun User Flow pendaftaran mahasiswa dan alur kerja admin.
- [ ] Membuat Wireframe Lo-Fi seluruh halaman utama di Figma.
- [ ] Menentukan Style Guide (warna, font, komponen dasar) dan membagikannya ke Feris & Rayhan.

### Minggu 2: Desain Hi-Fi Halaman Publik & Autentikasi
- [ ] Menyelesaikan desain Hi-Fi Landing Page (Hero, Jadwal, Panduan, Footer).
- [ ] Menyelesaikan desain Hi-Fi Halaman Login dan Registrasi.
- [ ] Memulai desain wizard form pendaftaran multi-step.

### Minggu 3: Desain Hi-Fi Pendaftaran & Dashboard Admin
- [ ] Menyelesaikan desain kartu pemilihan lokasi KKN dan visualisasi kuota.
- [ ] Menyelesaikan antarmuka upload berkas dan preview bukti pendaftaran.
- [ ] Menyelesaikan desain Dashboard Admin (tabel verifikasi, modal review berkas).
- [ ] Handoff seluruh aset visual dan icon ke Feris (Frontend).

### Minggu 4: Prototyping Interaktif & Dokumentasi Laporan
- [ ] Membuat prototipe interaktif di Figma untuk demonstrasi alur klik.
- [ ] Menyediakan tangkapan layar (screenshot) desain Hi-Fi dengan resolusi tinggi untuk dimasukkan ke Bab 2 Laporan Proyek oleh Rayhan.
- [ ] Mendukung tim saat persiapan materi slide presentasi.
