const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

const configuredOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
    origin(origin, callback) {
        if (!origin || configuredOrigins.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} tidak diizinkan oleh konfigurasi CORS.`));
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });

require('./config/database');

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));

// Root Endpoint
app.get('/api', (req, res) => {
    res.json({
        status: 'Sukses',
        message: '🚀 API Pendaftaran KKN siap digunakan!'
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
    if (error.message?.includes('tidak diizinkan oleh konfigurasi CORS')) {
        return res.status(403).json({ status: 'Gagal', message: 'Origin tidak diizinkan oleh konfigurasi CORS.' });
    }
    return res.status(500).json({
        status: 'Gagal',
        message: 'Terjadi kesalahan pada server.'
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`=========================================\n`);
});
