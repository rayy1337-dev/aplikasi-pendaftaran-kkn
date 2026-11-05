# Entity Relationship Diagram (ERD): SIM KKN LPPM 2026

Dokumen ini mendokumentasikan model konseptual, logikal, dan fisik basis data untuk **Sistem Informasi Pendaftaran Kuliah Kerja Nyata (SIM KKN)** pada basis data relasional **MySQL (`kkn_db`)**.

---

## 1. Visualisasi Diagram ERD (Mermaid)

```mermaid
erDiagram
    users ||--|| mahasiswa_profiles : "1 to 1 (user_id)"
    mahasiswa_profiles ||--o{ registrations : "1 to N (mahasiswa_id)"
    locations ||--o{ registrations : "1 to N (location_id)"
    registrations ||--o{ registration_files : "1 to N (registration_id)"
    
    users {
        bigint id PK "AUTO_INCREMENT"
        varchar nim UK "NIM Mahasiswa (Opsional akun Admin)"
        varchar email UK "Email resmi kampus"
        varchar password_hash "Bcrypt Hash (Cost 12)"
        enum role "'mahasiswa' atau 'admin'"
        timestamp created_at "Default CURRENT_TIMESTAMP"
    }

    mahasiswa_profiles {
        bigint id PK "AUTO_INCREMENT"
        bigint user_id FK "Relasi ke users.id (UNIQUE)"
        varchar nim UK "Nomor Induk Mahasiswa"
        varchar nama_lengkap "Nama lengkap mahasiswa"
        varchar program_studi "Program studi"
        varchar fakultas "Fakultas"
        varchar no_hp "Nomor WhatsApp aktif"
        enum jenis_kelamin "'L' atau 'P'"
        int total_sks "Syarat pendaftaran (>= 100 SKS)"
    }

    locations {
        bigint id PK "AUTO_INCREMENT"
        varchar nama_desa_wilayah "Nama desa mitra penempatan"
        varchar kecamatan "Kecamatan"
        varchar kabupaten "Kabupaten/Kota"
        int kuota_maksimal "Kapasitas kuota maksimal"
        int kuota_terisi "Jumlah mahasiswa terdaftar"
        varchar periode_kkn "Contoh: 2026/2027 Ganjil"
        boolean status_aktif "Status buka/tutup pendaftaran desa"
    }

    registrations {
        bigint id PK "AUTO_INCREMENT"
        bigint mahasiswa_id FK "Relasi ke mahasiswa_profiles.id"
        bigint location_id FK "Relasi ke locations.id"
        enum status "'pending', 'verified', 'revision', 'approved', 'rejected'"
        text catatan_admin "Catatan evaluasi/revisi LPPM"
        timestamp tanggal_daftar "Waktu pengiriman formulir"
    }

    registration_files {
        bigint id PK "AUTO_INCREMENT"
        bigint registration_id FK "Relasi ke registrations.id"
        enum jenis_berkas "'ktm', 'khs', 'surat_sehat', 'surat_izin'"
        varchar file_url "Jalur simpan berkas di server"
        timestamp uploaded_at "Waktu pengunggahan berkas"
    }

    announcements {
        bigint id PK "AUTO_INCREMENT"
        varchar judul "Judul pengumuman resmi"
        text konten "Isi rincian pengumuman penempatan"
        varchar lampiran_pdf_url "Tautan berkas SK penugasan (opsional)"
        timestamp tanggal_rilis "Waktu publikasi"
    }
```

---

## 2. Kardinalitas & Penjelasan Relasi Antartabel

| Relasi Antartabel | Kardinalitas | Atribut Kunci | Sifat Relasi & Integritas Referensial |
|---|:---:|---|---|
| `users` ➔ `mahasiswa_profiles` | **1 : 1** | `users.id` = `mahasiswa_profiles.user_id` | Setiap akun login mahasiswa memiliki tepat satu profil akademik. Menggunakan `ON DELETE CASCADE` sehingga penghapusan user otomatis menghapus profilnya. |
| `mahasiswa_profiles` ➔ `registrations` | **1 : N** | `mahasiswa_profiles.id` = `registrations.mahasiswa_id` | Satu mahasiswa memiliki riwayat registrasi KKN pada periode berjalan. |
| `locations` ➔ `registrations` | **1 : N** | `locations.id` = `registrations.location_id` | Satu desa mitra menampung banyak mahasiswa pendaftar hingga batas `kuota_maksimal` tercapai (dijaga oleh transaksi atomik basis data). |
| `registrations` ➔ `registration_files` | **1 : N** | `registrations.id` = `registration_files.registration_id` | Satu registrasi pendaftaran memiliki banyak lampiran dokumen pendukung (KTM, Transkrip KHS, Surat Sehat, Surat Izin). Menggunakan `ON DELETE CASCADE`. |

---

## 3. Lokasi File ERD di dalam Proyek

1. **Implementasi Kode Nyata (Auto-Migration DDL):**  
   [`backend/config/schema.js`](../backend/config/schema.js)  
   *File ini dieksekusi secara otomatis oleh Express backend saat server dijalankan untuk membuat 6 tabel MySQL beserta constraint Foreign Key.*
2. **Halaman HTML Interaktif ERD:**  
   [`design/08_erd_database.html`](08_erd_database.html)  
   *Dapat dibuka langsung di browser untuk melihat tampilan kartu entitas tabel yang interaktif.*
3. **Tangkapan Layar Gambar ERD:**  
   [`design/screenshots/08_erd_database.png`](screenshots/08_erd_database.png)
4. **Ringkasan Skema pada Perencanaan:**  
   [`plan.md#5-rancangan-tabel-basis-data-erd-ringkas`](../plan.md)
5. **Dokumentasi pada Makalah UTS:**  
   [`makalah_mpti/MAKALAH_UTS_MPTI_KELOMPOK_2.md`](../makalah_mpti/MAKALAH_UTS_MPTI_KELOMPOK_2.md) (Bagian WP-1.3 dan Bab VI).
