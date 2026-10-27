const pool = require('../config/database');

async function listAnnouncements(req, res) {
    try {
        const [announcements] = await pool.query(
            'SELECT id, judul, konten, lampiran_pdf_url, tanggal_rilis FROM announcements ORDER BY tanggal_rilis DESC'
        );
        return res.json({ status: 'Sukses', data: announcements });
    } catch (error) {
        console.error('Gagal mengambil pengumuman:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Daftar pengumuman gagal diambil.' });
    }
}

async function createAnnouncement(req, res) {
    const { judul, konten, lampiran_pdf_url: lampiranPdfUrl = null } = req.body ?? {};
    if (typeof judul !== 'string' || !judul.trim() || judul.trim().length > 200
        || typeof konten !== 'string' || !konten.trim()) {
        return res.status(400).json({ status: 'Gagal', message: 'judul (maksimal 200 karakter) dan konten wajib diisi.' });
    }
    if (lampiranPdfUrl !== null && (typeof lampiranPdfUrl !== 'string' || !lampiranPdfUrl.trim())) {
        return res.status(400).json({ status: 'Gagal', message: 'lampiran_pdf_url harus berupa URL teks atau null.' });
    }
    try {
        const [result] = await pool.execute(
            'INSERT INTO announcements (judul, konten, lampiran_pdf_url) VALUES (?, ?, ?)',
            [judul.trim(), konten.trim(), lampiranPdfUrl?.trim() || null]
        );
        return res.status(201).json({
            status: 'Sukses',
            data: {
                id: result.insertId,
                judul: judul.trim(),
                konten: konten.trim(),
                lampiran_pdf_url: lampiranPdfUrl?.trim() || null,
                tanggal_rilis: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Gagal membuat pengumuman:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Pengumuman gagal dibuat.' });
    }
}

module.exports = { listAnnouncements, createAnnouncement };
