aplikasi-pendaftaran-kkn/
├── config/
│   └── database.js       # Konfigurasi koneksi ke MySQL XAMPP
├── controllers/          # Logika pemrosesan request (authController, locationController)
├── middlewares/          # Fungsi penengah (authMiddleware, uploadMiddleware)
├── routes/               # Definisi jalur endpoint (authRoutes, locationRoutes)
├── uploads/              # Folder lokal sementara untuk menyimpan berkas pendaftaran
├── .env                  # Penyimpanan variabel lingkungan (kredensial DB, Secret JWT)
└── index.js              # Entry point utama server (menjalankan Express)