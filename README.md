# Sistem Informasi Pendaftaran KKN (SIM KKN)

**Mata Kuliah:** Tugas MPTI  
**Kelompok:** 2  
**Topik:** Sistem Informasi Pendaftaran Kuliah Kerja Nyata (KKN)  
**Status Rilis:** Branch `staging` (Konsolidasi Monorepo & Integrasi Siap Uji)

---

## 1. Tentang Proyek
Aplikasi berbasis web untuk mendigitalisasi proses pendaftaran KKN bagi mahasiswa, memfasilitasi pemilihan lokasi/desa dengan validasi kuota real-time, upload berkas persyaratan (KTM, KHS, Surat Sehat, Surat Izin), serta mempermudah panitia/admin LPPM dalam melakukan verifikasi pendaftar dan pengumuman penempatan.

---

## 2. Struktur Tim & Pembagian Peran

| No | Nama | Peran | Tanggung Jawab Utama | Branch Git |
|---|---|---|---|---|
| 1 | **Rayhan** | Project Manager (PM) & QA Lead | Manajemen timeline, skenario uji blackbox, laporan & presentasi | `rayhan-pm` |
| 2 | **Virdi** | UI/UX Designer | User flow, prototipe interaktif (Hi-Fi), design system | `virdi-uiux` |
| 3 | **Ricko** | Backend Developer | Database MySQL, REST API Express.js, auth JWT, upload Multer | `ricko-backend` |
| 4 | **Feris** | Frontend Developer | React.js (Vite), routing, integrasi REST API, wizard form | `feris-frontend` |

Dokumentasi rencana kerja dan timeline lengkap dapat dibaca pada file [plan.md](plan.md).

---

## 3. Struktur Direktori Proyek (Monorepo)

```
Kelompok 2 (Pendaftaran KKN)/
├── backend/                  # Server REST API Express.js & Database MySQL
│   ├── config/               # Koneksi database & auto-migration schema
│   ├── controllers/          # Logika Auth, Lokasi, Pendaftaran, Admin
│   ├── middlewares/          # JWT Auth, Schema, Upload Multer
│   ├── routes/               # Routing API endpoint
│   ├── seeds/                # Script seeder otomatis (Admin & Lokasi awal)
│   ├── postman_collection.json # Dokumentasi API siap impor Postman
│   └── .env.example          # Template konfigurasi environment backend
├── frontend/                 # Client Aplikasi React.js (Vite)
│   ├── src/
│   │   ├── pages/            # Landing, Auth, Mahasiswa Wizard & Dashboard, Admin
│   │   ├── components/       # ProtectedRoute, Navbar, Footer
│   │   └── services/api.js   # Client Axios terintegrasi JWT
│   └── .env.example          # Konfigurasi environment frontend
├── design/                   # Luaran Desain UI/UX & Prototipe Interaktif Virdi
│   ├── 01_landing_page.html ... 05_autentikasi_login_register.html
│   ├── screenshots/          # Dokumentasi visual resolusi tinggi
│   └── README.md             # Panduan Design System & Handoff
├── package.json              # Script orkestrasi monorepo root
└── README.md
```

---

## 4. Panduan Menjalankan Sistem untuk Pengujian Pertama (Quick Start)

### Prasyarat:
- **Node.js** v18+ dan **npm** terpasang.
- **MySQL / XAMPP** (aktifkan modul MySQL di XAMPP Control Panel).

### Langkah 1: Instalasi Seluruh Dependensi
Jalankan perintah berikut di root folder:
```bash
npm run install:all
```
*(Atau instal secara manual di masing-masing subfolder: `cd backend && npm install` lalu `cd ../frontend && npm install`)*

---

### Langkah 2: Konfigurasi Database & Environment
1. Buat database baru bernama `kkn_db` di phpMyAdmin (`http://localhost/phpmyadmin`).
2. Masuk ke folder `backend`, buat file `.env` dari `.env.example`:
   ```bash
   cp backend/.env.example backend/.env
   ```
   *(Sesuaikan kredensial MySQL jika password root XAMPP Anda tidak kosong).*

---

### Langkah 3: Jalankan Seeding Data Awal (Admin & Desa Mitra)
Jalankan perintah ini di root folder:
```bash
npm run seed
```
Perintah ini akan otomatis:
- Menjalankan migrasi pembuatan seluruh tabel database.
- Membuat akun admin default: `admin@lppm.ac.id` / `admin123` (NIM: `ADMIN001`).
- Menambahkan 3 lokasi desa KKN uji coba (*Desa Cibodas*, *Desa Sukamaju*, *Desa Bojong Kulon*).

---

### Langkah 4: Menjalankan Server Backend & Frontend
Buka dua terminal terpisah:

**Terminal 1 (Backend - Port 5001):**
```bash
npm run dev:backend
```
Server backend berjalan di: `http://localhost:5001/api`

**Terminal 2 (Frontend - Port 5173):**
```bash
npm run dev:frontend
```
Buka antarmuka aplikasi di browser: `http://localhost:5173`

---

## 5. Skenario Uji Coba Pertama Kali (First E2E Test)

1. **Uji Mahasiswa:**
   - Akses `http://localhost:5173/register` $\rightarrow$ Daftarkan akun mahasiswa baru.
   - Login dengan NIM/email mahasiswa.
   - Klik **"Mulai Isi Pendaftaran"** $\rightarrow$ Konfirmasi data akademik $\rightarrow$ Pilih salah satu desa $\rightarrow$ Upload berkas (KTM/KHS) $\rightarrow$ Kirim.
   - Cek dashboard mahasiswa $\rightarrow$ Status berubah menjadi **"Menunggu Verifikasi LPPM"**.
2. **Uji Admin LPPM:**
   - Buka jendela *Incognito* / tab baru $\rightarrow$ Akses `http://localhost:5173/login`.
   - Login dengan:
     - **Email:** `admin@lppm.ac.id`
     - **Password:** `admin123`
   - Buka Dashboard Admin $\rightarrow$ Pendaftar baru langsung tampil di tabel antrian.
   - Klik tombol **"Terima"** untuk menyetujui pendaftaran.
3. **Validasi Balik:**
   - Di sisi mahasiswa, refresh dashboard $\rightarrow$ Status langsung terupdate menjadi **"Berkas Diverifikasi / Disetujui"**.
