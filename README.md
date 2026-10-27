# Aplikasi Pendaftaran KKN

**Mata Kuliah:** Tugas Semester 5  
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

## Menjalankan Backend

Pastikan Node.js dan pnpm sudah terpasang, lalu jalankan dari folder proyek:

```bash
pnpm install
pnpm dev
```

Untuk menjalankan tanpa mode pengembangan:

```bash
pnpm start
```

Server berjalan di `http://localhost:5000`. Endpoint pemeriksaan tersedia di
`http://localhost:5000/api`. Agar koneksi database berhasil, buat file `.env`
di folder proyek dengan konfigurasi MySQL berikut:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pendaftaran_kkn
DB_PORT=3306
PORT=5000
JWT_SECRET=ganti-dengan-secret-acak-minimal-32-karakter
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Pastikan MySQL aktif dan database `pendaftaran_kkn` sudah dibuat. Server tetap
dapat dijalankan tanpa koneksi database, tetapi fitur yang memerlukan database
tidak akan berfungsi. Tabel API dibuat otomatis saat endpoint pertama kali
dipanggil. Jangan gunakan nilai `JWT_SECRET` contoh pada deployment.

Registrasi utama menerima email dan data profil mahasiswa. Format lama
`{"nim":"12345678","password":"password-kampus"}` tetap didukung untuk
kompatibilitas; format lama tidak membuat profil sehingga perlu membuat profil
sebelum mendaftar KKN. Role registrasi publik selalu `mahasiswa`, tidak pernah
diambil dari input. Untuk menjadikan akun sebagai admin, ubah secara manual
setelah akun dibuat:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### Spesifikasi REST API

Semua endpoint mengembalikan JSON dengan `status` bernilai `Sukses` atau
`Gagal`. Endpoint terproteksi memakai header
`Authorization: Bearer <token>`; token diperoleh dari register/login dan berlaku
8 jam. Contoh lengkap request/response tersedia di
[postman_collection.json](postman_collection.json).

| Method & endpoint | Akses | Request utama | Response sukses |
|---|---|---|---|
| `POST /api/auth/register` | Publik | `email`, `password`, `nim`, `nama_lengkap`, `program_studi`, `fakultas`, `no_hp`, `total_sks` (opsional `jenis_kelamin`: `L`/`P`) | `201` berisi `user`, `profile`, dan `token` |
| `POST /api/auth/login` | Publik | `email` atau `nim`, dan `password` | `200` berisi `token`, `user`, `profile`, dan `role` |
| `GET /api/auth/me` | Login | — | `200` data `user` dan `profile` |
| `GET /api/locations` | Publik | — | `200` daftar lokasi dengan `kuota_maksimal`, `kuota_terisi`, `kuota_tersedia` |
| `POST /api/locations` | Admin | Nama wilayah, kecamatan, kabupaten, kuota maksimal, periode KKN; opsional status aktif | `201` data lokasi baru |
| `PUT /api/locations/:id` | Admin | Field lokasi yang akan diperbarui | `200` lokasi terbaru; kuota maksimal tidak dapat lebih kecil daripada kuota terisi |
| `POST /api/registrations` | Mahasiswa | `location_id` | `201` pendaftaran berstatus `pending`; pemeriksaan dan perubahan kuota dilakukan dalam transaksi |
| `GET /api/registrations/my` | Mahasiswa | — | `200` riwayat pendaftaran, lokasi, status, dan berkas |
| `POST /api/registrations/upload` | Mahasiswa | Multipart: `registration_id`, `jenis_berkas`, `file` | `201` metadata berkas; PDF/JPG/JPEG/PNG, maksimal 5 MB |
| `GET /api/registrations/files/:id` | Pemilik berkas/admin | — | File berkas; akses menggunakan token dan dibatasi berdasarkan pemilik |
| `GET /api/admin/registrations` | Admin | Query opsional `status`, `search`, `page`, `limit` | `200` data mahasiswa, lokasi, berkas, dan informasi pagination |
| `PUT /api/admin/registrations/:id/verify` | Admin | `status` (`verified`, `revision`, `approved`, `rejected`), opsional `catatan_admin` | `200` status terbaru; penolakan melepas kuota |
| `GET /api/announcements` | Publik | — | `200` daftar pengumuman |
| `POST /api/announcements` | Admin | `judul`, `konten`, opsional `lampiran_pdf_url` | `201` pengumuman baru |

Contoh register:

```json
{
  "email": "mahasiswa@example.com",
  "password": "password-kampus",
  "nim": "20260001",
  "nama_lengkap": "Nama Mahasiswa",
  "program_studi": "Informatika",
  "fakultas": "Teknik",
  "no_hp": "081234567890",
  "jenis_kelamin": "L",
  "total_sks": 100
}
```

Contoh response:

```json
{
  "status": "Sukses",
  "data": {
    "user": { "id": 1, "nim": "20260001", "email": "mahasiswa@example.com", "role": "mahasiswa" },
    "profile": { "id": 1, "nim": "20260001", "nama_lengkap": "Nama Mahasiswa" },
    "token": "<JWT>"
  }
}
```

CORS secara default menerima `http://localhost:5173` dan
`http://127.0.0.1:5173`. Atur `CORS_ORIGINS` sebagai daftar origin yang
dipisahkan koma untuk domain frontend lain.

---

## Struktur Branch Git
- `main` : Branch utama kode yang sudah stabil dan siap dipresentasikan.
- `rayhan-pm` : Branch untuk manajemen dokumen, laporan proyek, dan skenario QA.
- `feris-frontend` : Branch pengerjaan antarmuka dan interaktivitas React.js.
- `ricko-backend` : Branch pengerjaan REST API, autentikasi, dan database.
- `virdi-uiux` : Branch untuk aset desain, link prototipe Figma, dan dokumentasi flow.

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
