# PANDUAN DAN DAFTAR TUGAS: BACKEND DEVELOPER

**Penanggung Jawab:** Ricko  
**Peran:** Backend Developer & Database Engineer  
**Branch:** `ricko-backend`  

---

## Deskripsi Peran
Sebagai Backend Developer, Anda bertanggung jawab membangun pondasi server, merancang basis data relasional (PostgreSQL / MySQL / Supabase), mengimplementasikan seluruh endpoint RESTful API, mengamankan autentikasi dengan JWT, mengelola upload berkas persyaratan, dan memastikan integritas data kuota pendaftaran KKN.

---

## Rincian Tugas dan Spesifikasi API

### 1. Perancangan Basis Data (Database Design)
Gunakan database relasional (PostgreSQL atau MySQL) atau Supabase. Buat skema tabel dan relasi foreign key sebagai berikut:

1. **`users`**
   - `id` (UUID / INT, Primary Key)
   - `email` (VARCHAR, Unique)
   - `password_hash` (VARCHAR)
   - `role` (ENUM: `mahasiswa`, `admin`)
   - `created_at` (TIMESTAMP)

2. **`mahasiswa_profiles`**
   - `id` (Primary Key)
   - `user_id` (Foreign Key ke `users.id`)
   - `nim` (VARCHAR, Unique)
   - `nama_lengkap` (VARCHAR)
   - `program_studi` (VARCHAR)
   - `fakultas` (VARCHAR)
   - `no_hp` (VARCHAR)
   - `jenis_kelamin` (ENUM: `L`, `P`)
   - `total_sks` (INT)

3. **`locations`**
   - `id` (Primary Key)
   - `nama_desa_wilayah` (VARCHAR)
   - `kecamatan` (VARCHAR)
   - `kabupaten` (VARCHAR)
   - `kuota_maksimal` (INT)
   - `kuota_terisi` (INT, Default 0)
   - `periode_kkn` (VARCHAR)
   - `status_aktif` (BOOLEAN, Default true)

4. **`registrations`**
   - `id` (Primary Key)
   - `mahasiswa_id` (Foreign Key ke `mahasiswa_profiles.id`)
   - `location_id` (Foreign Key ke `locations.id`)
   - `status` (ENUM: `pending`, `verified`, `revision`, `approved`, `rejected`)
   - `catatan_admin` (TEXT, Nullable)
   - `tanggal_daftar` (TIMESTAMP)

5. **`registration_files`**
   - `id` (Primary Key)
   - `registration_id` (Foreign Key ke `registrations.id`)
   - `jenis_berkas` (ENUM: `ktm`, `khs`, `surat_sehat`, `surat_izin`)
   - `file_url` (VARCHAR / TEXT)
   - `uploaded_at` (TIMESTAMP)

6. **`announcements`**
   - `id` (Primary Key)
   - `judul` (VARCHAR)
   - `konten` (TEXT)
   - `lampiran_pdf_url` (VARCHAR, Nullable)
   - `tanggal_rilis` (TIMESTAMP)

---

### 2. Spesifikasi Endpoint REST API

#### A. Autentikasi (`/api/auth`)
- `POST /api/auth/register`
  - Input: `email`, `password`, `nim`, `nama_lengkap`, `program_studi`, `fakultas`, `no_hp`, `total_sks`
  - Output: Objek user baru, profile, dan token JWT.
- `POST /api/auth/login`
  - Input: `email` (atau `nim`) dan `password`.
  - Output: `token`, data user, data profile, dan `role`.
- `GET /api/auth/me` (Protected)
  - Output: Data user & profile yang sedang login berdasarkan token.

#### B. Lokasi KKN (`/api/locations`)
- `GET /api/locations` (Publik / Mahasiswa)
  - Output: Daftar lokasi KKN, kapasitas kuota, dan sisa kuota yang tersedia.
- `POST /api/locations` (Admin only)
  - Input: Data lokasi baru, kuota maksimal.
- `PUT /api/locations/:id` (Admin only)
  - Input: Update informasi wilayah / perubahan kuota.

#### C. Pendaftaran Mahasiswa (`/api/registrations`)
- `POST /api/registrations` (Mahasiswa only)
  - Input: `location_id`, data formulir pendukung.
  - Aturan Bisnis (Critical): Gunakan *Database Transaction* untuk memverifikasi bahwa kuota lokasi belum penuh sebelum menyimpan data pendaftaran dan menaikkan nilai `kuota_terisi` (mencegah *race condition*).
- `GET /api/registrations/my` (Mahasiswa only)
  - Output: Riwayat dan status pendaftaran akun mahasiswa yang sedang login beserta berkas yang diunggah.

#### D. Pengelolaan Berkas Persyaratan (`/api/registrations/upload`)
- `POST /api/registrations/upload` (Mahasiswa only)
  - Multipart/form-data: Mengunggah file berkas (KTM, Transkrip, Surat Kesehatan).
  - Validasi: Batas ukuran file (maksimal 2MB - 5MB) dan ekstensi file yang diizinkan (PDF, JPG, PNG).
  - Penyimpanan: Simpan ke folder server (static upload) atau cloud storage (Supabase Storage / Cloudinary).

#### E. Verifikasi & Manajemen Admin (`/api/admin`)
- `GET /api/admin/registrations` (Admin only)
  - Parameter: `status`, `search`, `page`, `limit`.
  - Output: Daftar pendaftar dengan relasi data profil, lokasi yang dipilih, dan link berkas.
- `PUT /api/admin/registrations/:id/verify` (Admin only)
  - Input: `status` (`verified`, `revision`, `approved`, `rejected`), `catatan_admin`.
  - Output: Status pendaftaran terupdate.

#### F. Pengumuman (`/api/announcements`)
- `GET /api/announcements` (Publik / Mahasiswa)
  - Output: Daftar berita/pengumuman penempatan KKN.
- `POST /api/announcements` (Admin only)
  - Input: `judul`, `konten`, `lampiran_pdf_url`.

---

### 3. Dokumentasi & Handoff ke Frontend
- Sediakan file koleksi Postman (`postman_collection.json`) atau dokumentasi Swagger.
- Cantumkan contoh format request body dan response JSON di setiap endpoint agar Feris (Frontend) mudah melakukan integrasi.
- Atur konfigurasi CORS (Cross-Origin Resource Sharing) agar frontend di localhost:5173 atau domain frontend dapat mengakses API tanpa hambatan.

---

## Checklist Progres Mingguan

### Minggu 1: Setup Lingkungan & Database
- [ ] Menentukan framework backend (Node.js/Express, NestJS, atau Laravel).
- [ ] Menyiapkan database PostgreSQL / MySQL dan membuat migrasi skema tabel.
- [ ] Menguji koneksi database dan skema relasi foreign key.

### Minggu 2: Modul Auth & Data Master Lokasi
- [ ] Implementasi registrasi mahasiswa & hashing password (Bcrypt).
- [ ] Implementasi login dan pembuatan token JWT.
- [ ] Middleware proteksi rute & otorisasi role (Mahasiswa vs Admin).
- [ ] CRUD API data master lokasi KKN.
- [ ] Membagikan dokumentasi Postman tahap awal ke Feris.

### Minggu 3: Modul Pendaftaran, Kuota, & Upload Berkas
- [ ] Implementasi endpoint pendaftaran dengan validasi transaksi kuota lokasi.
- [ ] Implementasi endpoint upload berkas (Multer / Supabase Storage).
- [ ] Implementasi API dashboard admin verifikasi pendaftar.
- [ ] Mendukung pengujian integrasi bersama Feris (Frontend).

### Minggu 4: Integrasi Penuh, Keamanan, & Dokumentasi Laporan
- [ ] Menuntaskan endpoint pengumuman hasil penempatan.
- [ ] Melakukan pengecekan keamanan (SQL Injection protection, input validation, CORS).
- [ ] Membantu Rayhan (PM) melengkapi diagram ERD dan daftar endpoint untuk Bab 3 Laporan Proyek.
