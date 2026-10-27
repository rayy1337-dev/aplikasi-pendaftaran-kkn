const pool = require('../config/database');

const requiredTextFields = ['nama_desa_wilayah', 'kecamatan', 'kabupaten', 'periode_kkn'];

function parseLocation(body, partial = false) {
    const values = {};
    for (const field of requiredTextFields) {
        if (partial && body[field] === undefined) continue;
        if (typeof body[field] !== 'string' || !body[field].trim()) {
            return { error: `${field} wajib berupa teks yang tidak kosong.` };
        }
        values[field] = body[field].trim();
    }

    if (!partial || body.kuota_maksimal !== undefined) {
        const rawQuota = body.kuota_maksimal;
        const quota = typeof rawQuota === 'number' ? rawQuota : Number(rawQuota);
        if (rawQuota === null || rawQuota === '' || typeof rawQuota === 'boolean'
            || !Number.isInteger(quota) || quota < 0 || quota > 4294967295) {
            return { error: 'kuota_maksimal wajib berupa bilangan bulat non-negatif.' };
        }
        values.kuota_maksimal = quota;
    }
    if (body.status_aktif !== undefined) {
        if (![true, false, 0, 1, '0', '1'].includes(body.status_aktif)) {
            return { error: 'status_aktif harus bernilai boolean.' };
        }
        values.status_aktif = body.status_aktif === true || body.status_aktif === 1 || body.status_aktif === '1';
    }
    return { values };
}

async function listLocations(req, res) {
    try {
        const [locations] = await pool.query(`
            SELECT id, nama_desa_wilayah, kecamatan, kabupaten, kuota_maksimal, kuota_terisi,
                   GREATEST(kuota_maksimal - kuota_terisi, 0) AS kuota_tersedia,
                   periode_kkn, status_aktif
            FROM locations ORDER BY id DESC
        `);
        return res.json({ status: 'Sukses', data: locations });
    } catch (error) {
        console.error('Gagal mengambil daftar lokasi:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Daftar lokasi gagal diambil.' });
    }
}

async function createLocation(req, res) {
    const { values, error } = parseLocation(req.body ?? {});
    if (error) return res.status(400).json({ status: 'Gagal', message: error });
    try {
        const [result] = await pool.execute(
            `INSERT INTO locations
                (nama_desa_wilayah, kecamatan, kabupaten, kuota_maksimal, periode_kkn, status_aktif)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                values.nama_desa_wilayah, values.kecamatan, values.kabupaten,
                values.kuota_maksimal, values.periode_kkn, values.status_aktif ?? true
            ]
        );
        return res.status(201).json({
            status: 'Sukses',
            data: {
                id: result.insertId,
                ...values,
                kuota_terisi: 0,
                kuota_tersedia: values.kuota_maksimal,
                status_aktif: values.status_aktif ?? true
            }
        });
    } catch (error) {
        console.error('Gagal membuat lokasi:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Lokasi gagal dibuat.' });
    }
}

async function updateLocation(req, res) {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ status: 'Gagal', message: 'ID lokasi tidak valid.' });
    }
    const { values, error } = parseLocation(req.body ?? {}, true);
    if (error) return res.status(400).json({ status: 'Gagal', message: error });
    if (!Object.keys(values).length) {
        return res.status(400).json({ status: 'Gagal', message: 'Tidak ada informasi lokasi yang diperbarui.' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [locations] = await connection.execute('SELECT id, kuota_terisi FROM locations WHERE id = ? FOR UPDATE', [id]);
        if (!locations.length) {
            await connection.rollback();
            return res.status(404).json({ status: 'Gagal', message: 'Lokasi tidak ditemukan.' });
        }
        if (values.kuota_maksimal !== undefined && values.kuota_maksimal < locations[0].kuota_terisi) {
            await connection.rollback();
            return res.status(409).json({ status: 'Gagal', message: 'Kuota maksimal tidak boleh lebih kecil dari kuota yang sudah terisi.' });
        }

        const fields = Object.keys(values);
        const assignments = fields.map((field) => `\`${field}\` = ?`).join(', ');
        await connection.execute(`UPDATE locations SET ${assignments} WHERE id = ?`, [...fields.map((field) => values[field]), id]);
        const [updated] = await connection.execute(
            `SELECT id, nama_desa_wilayah, kecamatan, kabupaten, kuota_maksimal, kuota_terisi,
                    GREATEST(kuota_maksimal - kuota_terisi, 0) AS kuota_tersedia,
                    periode_kkn, status_aktif FROM locations WHERE id = ?`,
            [id]
        );
        await connection.commit();
        return res.json({ status: 'Sukses', data: updated[0] });
    } catch (error) {
        await connection.rollback();
        console.error('Gagal memperbarui lokasi:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Lokasi gagal diperbarui.' });
    } finally {
        connection.release();
    }
}

module.exports = { listLocations, createLocation, updateLocation };
