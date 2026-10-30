const pool = require('../config/database');

const validStatuses = ['verified', 'revision', 'approved', 'rejected'];

async function listRegistrations(req, res) {
    const status = req.query.status;
    if (status !== undefined && !['pending', ...validStatuses].includes(status)) {
        return res.status(400).json({ status: 'Gagal', message: 'Filter status tidak valid.' });
    }
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const limit = req.query.limit === undefined ? 20 : Number(req.query.limit);
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({ status: 'Gagal', message: 'page minimal 1 dan limit harus antara 1 sampai 100.' });
    }

    const conditions = [];
    const parameters = [];
    if (status) {
        conditions.push('r.status = ?');
        parameters.push(status);
    }
    if (typeof req.query.search === 'string' && req.query.search.trim()) {
        const search = `%${req.query.search.trim().replace(/[\\%_]/g, '\\$&')}%`;
        conditions.push('(p.nim LIKE ? OR p.nama_lengkap LIKE ? OR u.email LIKE ?)');
        parameters.push(search, search, search);
    }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (page - 1) * limit;

    try {
        const [[count]] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM registrations r
             JOIN mahasiswa_profiles p ON p.id = r.mahasiswa_id
             JOIN users u ON u.id = p.user_id
             JOIN locations l ON l.id = r.location_id ${where}`,
            parameters
        );
        const [registrations] = await pool.execute(
            `SELECT r.id, r.status, r.catatan_admin, r.tanggal_daftar,
                    p.id AS mahasiswa_id, p.user_id, p.nim, p.nama_lengkap, p.program_studi,
                    p.fakultas, p.no_hp, p.jenis_kelamin, p.total_sks, u.email,
                    l.id AS location_id, l.nama_desa_wilayah, l.kecamatan, l.kabupaten, l.periode_kkn
             FROM registrations r
             JOIN mahasiswa_profiles p ON p.id = r.mahasiswa_id
             JOIN users u ON u.id = p.user_id
             JOIN locations l ON l.id = r.location_id
             ${where}
             ORDER BY r.tanggal_daftar DESC LIMIT ? OFFSET ?`,
            [...parameters, limit, offset]
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
                id: registration.id,
                status: registration.status,
                catatan_admin: registration.catatan_admin,
                tanggal_daftar: registration.tanggal_daftar,
                mahasiswa: {
                    id: registration.mahasiswa_id,
                    user_id: registration.user_id,
                    nim: registration.nim,
                    email: registration.email,
                    nama_lengkap: registration.nama_lengkap,
                    program_studi: registration.program_studi,
                    fakultas: registration.fakultas,
                    no_hp: registration.no_hp,
                    jenis_kelamin: registration.jenis_kelamin,
                    total_sks: registration.total_sks
                },
                lokasi: {
                    id: registration.location_id,
                    nama_desa_wilayah: registration.nama_desa_wilayah,
                    kecamatan: registration.kecamatan,
                    kabupaten: registration.kabupaten,
                    periode_kkn: registration.periode_kkn
                },
                berkas: filesByRegistration[registration.id] || []
            })),
            pagination: { page, limit, total: count.total, total_pages: Math.ceil(count.total / limit) }
        });
    } catch (error) {
        console.error('Gagal mengambil data pendaftar:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Daftar pendaftar gagal diambil.' });
    }
}

async function updateRegistrationStatus(req, res) {
    const id = Number(req.params.id);
    const body = req.body ?? {};
    const { status } = body;
    const hasCatatan = Object.prototype.hasOwnProperty.call(body, 'catatan_admin');
    const requestedNote = hasCatatan ? body.catatan_admin : undefined;
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ status: 'Gagal', message: 'ID pendaftaran tidak valid.' });
    }
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ status: 'Gagal', message: 'status harus verified, revision, approved, atau rejected.' });
    }
    if (requestedNote !== undefined && requestedNote !== null && typeof requestedNote !== 'string') {
        return res.status(400).json({ status: 'Gagal', message: 'catatan_admin harus berupa teks atau null.' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [registrations] = await connection.execute(
            'SELECT id, location_id, status, catatan_admin FROM registrations WHERE id = ? FOR UPDATE',
            [id]
        );
        if (!registrations.length) {
            await connection.rollback();
            return res.status(404).json({ status: 'Gagal', message: 'Pendaftaran tidak ditemukan.' });
        }
        const registration = registrations[0];
        const catatanAdmin = hasCatatan ? requestedNote : registration.catatan_admin;
        const [locations] = await connection.execute(
            'SELECT id, kuota_maksimal, kuota_terisi FROM locations WHERE id = ? FOR UPDATE',
            [registration.location_id]
        );
        const location = locations[0];

        if (registration.status !== 'rejected' && status === 'rejected') {
            await connection.execute(
                'UPDATE locations SET kuota_terisi = GREATEST(kuota_terisi - 1, 0) WHERE id = ?',
                [registration.location_id]
            );
        } else if (registration.status === 'rejected' && status !== 'rejected') {
            if (location.kuota_terisi >= location.kuota_maksimal) {
                await connection.rollback();
                return res.status(409).json({ status: 'Gagal', message: 'Kuota lokasi sudah penuh; pendaftaran ditolak tidak dapat diaktifkan kembali.' });
            }
            await connection.execute('UPDATE locations SET kuota_terisi = kuota_terisi + 1 WHERE id = ?', [registration.location_id]);
        }

        await connection.execute(
            'UPDATE registrations SET status = ?, catatan_admin = ? WHERE id = ?',
            [status, catatanAdmin, id]
        );
        await connection.commit();
        return res.json({
            status: 'Sukses',
            message: 'Status pendaftaran berhasil diperbarui.',
            data: { id, status, catatan_admin: catatanAdmin }
        });
    } catch (error) {
        await connection.rollback();
        console.error('Gagal memverifikasi pendaftaran:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Status pendaftaran gagal diperbarui.' });
    } finally {
        connection.release();
    }
}

module.exports = { listRegistrations, updateRegistrationStatus };
