const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyediakan folder 'public' untuk file HTML tester
app.use(express.static(path.join(__dirname, 'public')));

// Inisialisasi koneksi database
require('./config/database');

// Rute autentikasi
app.use('/api/auth', require('./routes/authRoutes'));

// Root Endpoint
app.get('/api', (req, res) => {
    res.json({
        status: 'Sukses',
        message: '🚀 API Pendaftaran KKN ITB Widya Gama siap digunakan!'
    });
});

app.use('/api', (req, res) => {
    res.status(404).json({
        status: 'Gagal',
        message: 'Endpoint API tidak ditemukan.'
    });
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({
            status: 'Gagal',
            message: 'Format JSON request tidak valid.'
        });
    }

    console.error('Kesalahan request:', error);
    return res.status(500).json({
        status: 'Gagal',
        message: 'Terjadi kesalahan pada server.'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`=========================================\n`);
});