const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

function createToken(user) {
    if (!process.env.JWT_SECRET) {
        const error = new Error('JWT_SECRET belum dikonfigurasi.');
        error.code = 'JWT_CONFIGURATION';
        throw error;
    }
    return jwt.sign({ sub: String(user.id), role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
}

function handleConfigurationError(error, res) {
    if (error.code === 'JWT_CONFIGURATION') {
        console.error(error.message);
        res.status(503).json({ status: 'Gagal', message: 'Autentikasi belum dikonfigurasi di server.' });
        return true;
    }
    return false;
}

async function register(req, res) {
    const body = req.body ?? {};
    const nim = typeof body.nim === 'string' ? body.nim.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const profileFields = ['nama_lengkap', 'program_studi', 'fakultas', 'no_hp', 'total_sks'];
    const hasProfile = Boolean(email || profileFields.some((field) => body[field] !== undefined));

    if (!nim || nim.length > 32) {
        return res.status(400).json({ status: 'Gagal', message: 'NIM wajib diisi dan maksimal 32 karakter.' });
    }
    if (typeof body.password !== 'string' || body.password.length === 0 || Buffer.byteLength(body.password, 'utf8') > 72) {
        return res.status(400).json({ status: 'Gagal', message: 'Password wajib diisi dan maksimal 72 byte.' });
    }
    if (body.role !== undefined && body.role !== 'mahasiswa') {
        return res.status(403).json({ status: 'Gagal', message: 'Pendaftaran publik hanya tersedia untuk role mahasiswa.' });
    }
    if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) {
        return res.status(400).json({ status: 'Gagal', message: 'Format email tidak valid.' });
    }
    if (hasProfile) {
        const textFields = profileFields.filter((field) => field !== 'total_sks');
        const invalidText = textFields.some((field) => typeof body[field] !== 'string' || !body[field].trim());
        const totalSks = typeof body.total_sks === 'number' ? body.total_sks : Number(body.total_sks);
        if (!email || invalidText || !Number.isInteger(totalSks) || totalSks < 0
            || totalSks > 4294967295 || typeof body.total_sks === 'boolean'
            || body.total_sks === null
            || (typeof body.total_sks === 'string' && !body.total_sks.trim())) {
            return res.status(400).json({
                status: 'Gagal',
                message: 'Email, nama_lengkap, program_studi, fakultas, no_hp, dan total_sks wajib diisi dengan format yang valid.'
            });
        }
        if (textFields.some((field) => body[field].trim().length > (field === 'no_hp' ? 32 : 150))) {
            return res.status(400).json({ status: 'Gagal', message: 'Panjang data profil melebihi batas yang diperbolehkan.' });
        }
        if (body.jenis_kelamin !== undefined && !['L', 'P'].includes(body.jenis_kelamin)) {
            return res.status(400).json({ status: 'Gagal', message: 'jenis_kelamin harus bernilai L atau P.' });
        }
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.execute(
            'INSERT INTO users (nim, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [nim, email || null, passwordHash, 'mahasiswa']
        );

        let profile = null;
        if (hasProfile) {
            const [profileResult] = await connection.execute(
                `INSERT INTO mahasiswa_profiles
                    (user_id, nim, nama_lengkap, program_studi, fakultas, no_hp, jenis_kelamin, total_sks)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    result.insertId,
                    nim,
                    body.nama_lengkap.trim(),
                    body.program_studi.trim(),
                    body.fakultas.trim(),
                    body.no_hp.trim(),
                    body.jenis_kelamin || null,
                    totalSks
                ]
            );
            profile = {
                id: profileResult.insertId,
                nim,
                nama_lengkap: body.nama_lengkap.trim(),
                program_studi: body.program_studi.trim(),
                fakultas: body.fakultas.trim(),
                no_hp: body.no_hp.trim(),
                jenis_kelamin: body.jenis_kelamin || null,
                total_sks: totalSks
            };
        }

        const user = { id: result.insertId, nim, email: email || null, role: 'mahasiswa' };
        const token = createToken(user);
        await connection.commit();
        return res.status(201).json({
            status: 'Sukses',
            message: 'Registrasi berhasil.',
            data: { user, profile, token }
        });
    } catch (error) {
        await connection.rollback();
        if (handleConfigurationError(error, res)) return;
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 'Gagal', message: 'Email atau NIM sudah terdaftar.' });
        }
        console.error('Gagal menyimpan akun:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Registrasi gagal diproses.' });
    } finally {
        connection.release();
    }
}

async function login(req, res) {
    const identity = typeof req.body?.email === 'string'
        ? req.body.email.trim().toLowerCase()
        : typeof req.body?.nim === 'string' ? req.body.nim.trim() : '';
    const password = req.body?.password;

    if (!identity || typeof password !== 'string' || !password) {
        return res.status(400).json({ status: 'Gagal', message: 'Email atau NIM dan password wajib diisi.' });
    }

    try {
        const [users] = await pool.execute(
            `SELECT id, nim, email, password_hash, role
             FROM users WHERE email = ? OR nim = ? LIMIT 1`,
            [identity, identity]
        );
        if (!users.length || !(await bcrypt.compare(password, users[0].password_hash))) {
            return res.status(401).json({ status: 'Gagal', message: 'Email/NIM atau password salah.' });
        }

        const user = users[0];
        const [profiles] = await pool.execute(
            'SELECT id, nim, nama_lengkap, program_studi, fakultas, no_hp, jenis_kelamin, total_sks FROM mahasiswa_profiles WHERE user_id = ? LIMIT 1',
            [user.id]
        );
        const token = createToken(user);
        return res.json({
            status: 'Sukses',
            data: {
                token,
                user: { id: user.id, nim: user.nim, email: user.email, role: user.role },
                profile: profiles[0] || null,
                role: user.role
            }
        });
    } catch (error) {
        if (handleConfigurationError(error, res)) return;
        console.error('Gagal memproses login:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Login gagal diproses.' });
    }
}

async function me(req, res) {
    try {
        const [users] = await pool.execute(
            'SELECT id, nim, email, role, created_at FROM users WHERE id = ? LIMIT 1',
            [req.auth.sub]
        );
        if (!users.length) {
            return res.status(401).json({ status: 'Gagal', message: 'Akun pada token tidak ditemukan.' });
        }
        const [profiles] = await pool.execute(
            'SELECT id, nim, nama_lengkap, program_studi, fakultas, no_hp, jenis_kelamin, total_sks FROM mahasiswa_profiles WHERE user_id = ? LIMIT 1',
            [req.auth.sub]
        );
        return res.json({ status: 'Sukses', data: { user: users[0], profile: profiles[0] || null } });
    } catch (error) {
        console.error('Gagal mengambil profil akun:', error);
        return res.status(500).json({ status: 'Gagal', message: 'Data akun gagal diambil.' });
    }
}

module.exports = { register, login, me };
