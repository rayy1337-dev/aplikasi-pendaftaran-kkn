const fs = require('fs/promises');
const path = require('path');
const pool = require('../config/database');
const { uploadDirectory } = require('../middlewares/uploadMiddleware');

async function createRegistration(req, res) {
    const locationId = Number(req.body?.location_id);
    if (!Number.isSafeInteger(locationId) || locationId < 1) {
        return res.status(400).json({ status: 'Gagal', message: 'location_id wajib berupa ID lokasi yang valid.' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [profiles] = await connection.execute(
            'SELECT id FROM mahasiswa_profiles WHERE user_id = ? FOR UPDATE',
            [req.auth.sub]
        );
        if (!profiles.length) {
            await connection.rollback();
            return res.status(409).json({ status: 'Gagal', message: 'Profil mahasiswa belum tersedia untuk akun ini.' });
        }

        const [locations] = await connection.execute(
            'SELECT id, nama_desa_wilayah, kuota_maksimal, kuota_terisi, status_aktif FROM locations WHERE id = ? FOR UPDATE',
            [locationId]
        );
        if (!locations.length) {
            await connection.rollback();
            return res.status(404).json({ status: 'Gagal', message: 'Lokasi KKN tidak ditemukan.' });
        }
        const location = locations[0];
        if (!location.status_aktif) {
            await connection.rollback();
            return res.status(409).json({ status: 'Gagal', message: 'Lokasi KKN sedang tidak aktif.' });
        }
        if (location.kuota_terisi >= location.kuota_maksimal) {
            await connection.rollback();
            return res.status(409).json({ status: 'Gagal', message: 'Kuota lokasi KKN sudah penuh.' });
        }

        const [result] = await connection.execute(
            'INSERT INTO registrations (mahasiswa_id, location_id) VALUES (?, ?)',
            [profiles[0].id, locationId]
        );
        await connection.execute('UPDATE locations SET kuota_terisi = kuota_terisi + 1 WHERE id = ?', [locationId]);
        await connection.commit();
        return res.status(201).json({
            status: 'Sukses',
            message: 'Pendaftaran KKN berhasil disimpan.',
            data: {
                id: result.insertId,
                mahasiswa_id: profiles[0].id,
                location_id: locationId,
                lokasi: location.nama_desa_wilayah,
                status: 'pending'
            }
        });
    } catch (error) {
        await connection.rollback();
        console.error('Gagal membuat pendaftaran KKN:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Pendaftaran gagal diproses.' });
    } finally {
        connection.release();
    }
}

async function listMyRegistrations(req, res) {
    try {
        const [registrations] = await pool.execute(
            `SELECT r.id, r.status, r.catatan_admin, r.tanggal_daftar, r.location_id,
                    l.nama_desa_wilayah, l.kecamatan, l.kabupaten, l.periode_kkn
             FROM registrations r
             JOIN mahasiswa_profiles p ON p.id = r.mahasiswa_id
             JOIN locations l ON l.id = r.location_id
             WHERE p.user_id = ? ORDER BY r.tanggal_daftar DESC`,
            [req.auth.sub]
        );

        const ids = registrations.map((registration) => registration.id);
        let filesByRegistration = {};
        if (ids.length) {
            const placeholders = ids.map(() => '?').join(', ');
            const [files] = await pool.execute(
                `SELECT id, registration_id, jenis_berkas, file_url, uploaded_at
                 FROM registration_files WHERE registration_id IN (${placeholders}) ORDER BY uploaded_at DESC`,
                ids
            );
            filesByRegistration = files.reduce((result, file) => {
                file.file_url = `/api/registrations/files/${file.id}`;
                (result[file.registration_id] ||= []).push(file);
                return result;
            }, {});
        }
        return res.json({
            status: 'Sukses',
            data: registrations.map((registration) => ({
                ...registration,
                berkas: filesByRegistration[registration.id] || []
            }))
        });
    } catch (error) {
        console.error('Gagal mengambil riwayat pendaftaran:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Riwayat pendaftaran gagal diambil.' });
    }
}

async function uploadRegistrationFile(req, res) {
    if (!req.file) {
        return res.status(400).json({ status: 'Gagal', message: 'File wajib dikirim pada field multipart bernama "file".' });
    }

    const registrationId = Number(req.body?.registration_id);
    const jenisBerkas = req.body?.jenis_berkas;
    if (!Number.isSafeInteger(registrationId) || registrationId < 1
        || !['ktm', 'khs', 'surat_sehat', 'surat_izin'].includes(jenisBerkas)) {
        await fs.unlink(req.file.path).catch((error) => console.error('Gagal membersihkan file upload:', error));
        return res.status(400).json({
            status: 'Gagal',
            message: 'registration_id yang valid dan jenis_berkas (ktm, khs, surat_sehat, surat_izin) wajib diisi.'
        });
    }

    try {
        const [registrations] = await pool.execute(
            `SELECT r.id FROM registrations r
             JOIN mahasiswa_profiles p ON p.id = r.mahasiswa_id
             WHERE r.id = ? AND p.user_id = ? LIMIT 1`,
            [registrationId, req.auth.sub]
        );
        if (!registrations.length) {
            await fs.unlink(req.file.path).catch((error) => console.error('Gagal membersihkan file upload:', error));
            return res.status(404).json({ status: 'Gagal', message: 'Pendaftaran tidak ditemukan pada akun mahasiswa ini.' });
        }

        const storedPath = `/uploads/${path.basename(req.file.filename)}`;
        const [result] = await pool.execute(
            'INSERT INTO registration_files (registration_id, jenis_berkas, file_url) VALUES (?, ?, ?)',
            [registrationId, jenisBerkas, storedPath]
        );
        const fileUrl = `/api/registrations/files/${result.insertId}`;
        return res.status(201).json({
            status: 'Sukses',
            data: {
                id: result.insertId,
                registration_id: registrationId,
                jenis_berkas: jenisBerkas,
                file_url: fileUrl,
                uploaded_at: new Date().toISOString()
            }
        });
    } catch (error) {
        await fs.unlink(req.file.path).catch((cleanupError) => console.error('Gagal membersihkan file upload:', cleanupError));
        console.error('Gagal menyimpan berkas pendaftaran:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Berkas gagal disimpan.' });
    }
}

async function downloadRegistrationFile(req, res) {
    const fileId = Number(req.params.id);
    if (!Number.isSafeInteger(fileId) || fileId < 1) {
        return res.status(400).json({ status: 'Gagal', message: 'ID berkas tidak valid.' });
    }

    try {
        const [files] = await pool.execute(
            `SELECT f.id, f.file_url, r.mahasiswa_id, p.user_id
             FROM registration_files f
             JOIN registrations r ON r.id = f.registration_id
             JOIN mahasiswa_profiles p ON p.id = r.mahasiswa_id
             WHERE f.id = ? LIMIT 1`,
            [fileId]
        );
        if (!files.length) {
            return res.status(404).json({ status: 'Gagal', message: 'Berkas tidak ditemukan.' });
        }
        if (req.auth.role !== 'admin' && String(files[0].user_id) !== String(req.auth.sub)) {
            return res.status(403).json({ status: 'Gagal', message: 'Anda tidak memiliki akses ke berkas ini.' });
        }

        const filename = path.basename(files[0].file_url);
        const filePath = path.join(uploadDirectory, filename);
        return res.sendFile(filePath, (error) => {
            if (error && !res.headersSent) {
                if (error.code === 'ENOENT') {
                    res.status(404).json({ status: 'Gagal', message: 'File berkas tidak tersedia di penyimpanan.' });
                } else {
                    console.error('Gagal mengirim berkas pendaftaran:', error);
                    res.status(500).json({ status: 'Gagal', message: 'Berkas gagal diunduh.' });
                }
            }
        });
    } catch (error) {
        console.error('Gagal mengambil berkas pendaftaran:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Berkas gagal diambil.' });
    }
}

module.exports = {
    createRegistration,
    listMyRegistrations,
    uploadRegistrationFile,
    downloadRegistrationFile
};
