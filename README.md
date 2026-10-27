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
```

Pastikan MySQL aktif dan database `pendaftaran_kkn` sudah dibuat. Server tetap
dapat dijalankan tanpa koneksi database, tetapi fitur yang memerlukan database
tidak akan berfungsi.

Endpoint `POST /api/auth/register` menerima JSON `{"nim":"12345678","password":"password-kampus"}`.
Role akun publik selalu `mahasiswa`, dan tabel `users` dibuat otomatis ketika
registrasi pertama dilakukan. Jika tabel `users` sebelumnya dibuat dengan kolom
email, server akan menambahkan kolom NIM dan membuat email opsional secara
otomatis.

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
