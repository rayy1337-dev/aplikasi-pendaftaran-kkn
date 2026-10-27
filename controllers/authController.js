const bcrypt = require('bcrypt');
const pool = require('../config/database');

let usersTableReady;

async function ensureUsersTable() {
    if (!usersTableReady) {
        usersTableReady = pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nim VARCHAR(32) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('mahasiswa', 'admin') NOT NULL DEFAULT 'mahasiswa',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `).then(async () => {
            const [columns] = await pool.query('SHOW COLUMNS FROM users');
            const hasNim = columns.some((column) => column.Field === 'nim');
            const emailColumn = columns.find((column) => column.Field === 'email');

            if (!hasNim) {
                await pool.query(
                    'ALTER TABLE users ADD COLUMN nim VARCHAR(32) NULL UNIQUE AFTER id'
                );
            }

            if (emailColumn && emailColumn.Null === 'NO') {
                await pool.query('ALTER TABLE users MODIFY email VARCHAR(254) NULL');
            }
        }).catch((error) => {
            usersTableReady = undefined;
            throw error;
        });
    }

    await usersTableReady;
}

async function register(req, res) {
    const { nim, password, role } = req.body ?? {};
    const normalizedNim = typeof nim === 'string' ? nim.trim() : '';

    if (!normalizedNim || normalizedNim.length > 32) {
        return res.status(400).json({
            status: 'Gagal',
            message: 'NIM wajib diisi dan maksimal 32 karakter.'
        });
    }

    if (typeof password !== 'string' || password.length === 0 || Buffer.byteLength(password, 'utf8') > 72) {
        return res.status(400).json({
            status: 'Gagal',
            message: 'Password wajib diisi dan maksimal 72 byte.'
        });
    }

    if (role !== undefined && role !== 'mahasiswa') {
        return res.status(403).json({
            status: 'Gagal',
            message: 'Pendaftaran publik hanya tersedia untuk role mahasiswa.'
        });
    }

    try {
        await ensureUsersTable();
    } catch (error) {
        console.error('Gagal menyiapkan tabel akun:', error);
        return res.status(503).json({
            status: 'Gagal',
            message: 'Database tidak dapat diakses. Periksa konfigurasi MySQL.'
        });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const [result] = await pool.execute(
            'INSERT INTO users (nim, password_hash, role) VALUES (?, ?, ?)',
            [normalizedNim, passwordHash, 'mahasiswa']
        );

        return res.status(201).json({
            status: 'Sukses',
            message: 'Registrasi berhasil.',
            data: {
                id: result.insertId,
                nim: normalizedNim,
                role: 'mahasiswa'
            }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'Gagal',
                message: 'NIM sudah terdaftar.'
            });
        }

        console.error('Gagal menyimpan akun:', error);
        return res.status(500).json({
            status: 'Gagal',
            message: 'Registrasi gagal diproses.'
        });
    }
}

module.exports = { register };
