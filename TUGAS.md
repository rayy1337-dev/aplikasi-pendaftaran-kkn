# PANDUAN DAN DAFTAR TUGAS: FRONTEND DEVELOPER

**Penanggung Jawab:** Feris  
**Peran:** Frontend Developer (React.js)  
**Branch:** `feris-frontend`  

---

## Deskripsi Peran
Sebagai Frontend Developer, Anda bertanggung jawab membangun antarmuka pengguna web menggunakan React.js yang modern, responsif, dan interaktif. Anda mengonversi desain Figma dari Virdi menjadi kode siap pakai serta menghubungkan antarmuka tersebut dengan REST API yang disediakan oleh Ricko.

---

## Rincian Tugas dan Modul Pengembangan

### 1. Inisialisasi & Setup Arsitektur React.js
- Inisialisasi proyek React menggunakan Vite untuk proses build yang cepat:
  - Setup routing aplikasi menggunakan `react-router-dom`.
  - Setup styling (Tailwind CSS atau Vanilla CSS modern).
  - Setup paket icon (Lucide React / Heroicons).
  - Konfigurasi variabel lingkungan di `.env` (misal: `VITE_API_BASE_URL=http://localhost:5000/api`).
- Struktur folder yang disarankan:
  ```
  src/
  ├── assets/          # Gambar, icon, font
  ├── components/      # Komponen reusable (Navbar, Footer, Button, Modal, Card, Input)
  ├── layouts/         # Layout Mahasiswa, Admin, dan Publik
  ├── pages/           # Halaman utama aplikasi
  │   ├── public/      # Landing page, Panduan, Jadwal
  │   ├── auth/        # Login, Register
  │   ├── mahasiswa/   # Form pendaftaran, Dashboard, Status
  │   └── admin/       # Verifikasi pendaftar, Data lokasi, Pengumuman
  ├── services/        # Konfigurasi Axios & fungsi pemanggilan API
  └── utils/           # Helper fungsi, format tanggal, validasi
  ```

### 2. Modul Autentikasi & Proteksi Rute
- Halaman Registrasi Mahasiswa (Nama, NIM, Email, Password).
- Halaman Login (Email/NIM dan Password).
- Penyimpanan token autentikasi (JWT) di `localStorage` atau `sessionStorage`.
- Pembuatan wrapper `ProtectedRoute` untuk membatasi akses:
  - Rute Mahasiswa hanya bisa diakses akun mahasiswa.
  - Rute Admin hanya bisa diakses akun berhak admin.
  - Redirect otomatis jika belum login atau token kedaluwarsa.

### 3. Modul Halaman Publik & Informasi
- Landing Page interaktif sesuai desain Virdi:
  - Hero banner pendaftaran KKN dengan tombol CTA "Daftar Sekarang".
  - Timeline jadwal penting pelaksanaan KKN.
  - Persyaratan dan alur pendaftaran.
  - Bagian FAQ dan kontak bantuan.

### 4. Modul Pendaftaran Mahasiswa (Multi-Step Form Wizard)
- **Langkah 1 (Isi Formulir):** Input biodata lengkap (NIM, Nama, Jurusan, Fakultas, No HP, IPK/SKS).
- **Langkah 2 (Pilih Lokasi):** Katalog pilihan desa/lokasi KKN, tampilan informasi kuota tersedia, dan peringatan jika kuota penuh.
- **Langkah 3 (Upload Berkas):** Form unggah file persyaratan (KTM, Transkrip Nilai, Surat Keterangan Sehat) dengan validasi format (PDF/JPG/PNG) dan batas ukuran file.
- **Langkah 4 (Konfirmasi & Bukti Pendaftaran):** Review data pendaftaran dan tombol final submit.

### 5. Modul Dashboard Mahasiswa
- Menampilkan status proses pendaftaran (`Menunggu Verifikasi`, `Diverifikasi`, `Revisi Berkas`, `Diterima / Penempatan Rilis`).
- Jika status `Revisi Berkas`, sediakan tombol dan modal untuk re-upload berkas yang ditolak sesuai catatan admin.
- Halaman pengumuman penempatan dan informasi kelompok KKN.

### 6. Modul Dashboard Admin
- Sidebar navigasi admin (Ringkasan, Data Pendaftar, Data Lokasi, Pengumuman).
- Tabel verifikasi pendaftar:
  - Filter berdasarkan status pendaftaran dan pencarian berdasarkan NIM/Nama.
  - Tombol aksi verifikasi detail pendaftar.
  - Modal preview berkas (melihat dokumen PDF / foto mahasiswa).
  - Formulir aksi: tombol `Terima`, tombol `Tolak`, dan kolom catatan revisi.
- Halaman kelola lokasi KKN: Form tambah/edit lokasi desa dan kuota maksimal.

### 7. Integrasi REST API & Feedback Pengguna
- Menggunakan Axios atau Fetch untuk integrasi ke backend Ricko.
- Menampilkan feedback visual yang jelas:
  - State loading (spinner atau skeleton card).
  - Pesan notifikasi toast saat berhasil atau gagal (misal: react-hot-toast).
  - Tampilan penanganan error jika server offline atau kuota habis.

---

## Checklist Progres Mingguan

### Minggu 1: Setup Lingkungan & Arsitektur
- [ ] Inisialisasi proyek React.js (Vite) dan konfigurasi styling.
- [ ] Setup struktur folder, layouting dasar (Navbar & Footer), dan konfigurasi route.
- [ ] Menerima dan mempelajari design token (warna, font) dari Virdi.

### Minggu 2: Slicing Halaman Publik & Autentikasi
- [ ] Slicing Landing Page, informasi jadwal, dan panduan.
- [ ] Slicing Halaman Login dan Registrasi.
- [ ] Implementasi manajemen token autentikasi dan komponen `ProtectedRoute`.
- [ ] Uji coba login/register ke endpoint backend Ricko.

### Minggu 3: Formulir Pendaftaran & Dashboard Admin
- [ ] Membangun form wizard multi-step pendaftaran mahasiswa.
- [ ] Implementasi komponen katalog pemilihan lokasi dan visualisasi sisa kuota.
- [ ] Membangun form upload berkas dengan validasi client-side.
- [ ] Membangun antarmuka dashboard admin dan tabel verifikasi pendaftar.
- [ ] Integrasi upload berkas dan form pendaftaran ke backend Ricko.

### Minggu 4: Integrasi End-to-End, Testing, & Poles UI
- [ ] Menyelesaikan integrasi seluruh endpoint (Admin verifikasi, pengumuman penempatan).
- [ ] Menguji responsivitas di layar ponsel dan laptop.
- [ ] Memperbaiki bug yang dilaporkan oleh Rayhan (PM).
- [ ] Menyiapkan build produksi (`npm run build`) dan demo aplikasi untuk presentasi.
