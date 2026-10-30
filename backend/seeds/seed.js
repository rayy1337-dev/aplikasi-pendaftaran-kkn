const bcrypt = require('bcrypt');
const pool = require('../config/database');
const ensureSchema = require('../config/schema');

async function seed() {
    console.log('🔄 Memeriksa & membuat skema database...');
    await ensureSchema();

    console.log('🌱 Menjalankan seeding data awal...');

    // 1. Akun Admin Default LPPM
    const adminEmail = 'admin@lppm.ac.id';
    const [existingAdmins] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [adminEmail]);
    if (existingAdmins.length === 0) {
        const passwordHash = await bcrypt.hash('admin123', 12);
        await pool.execute(
            'INSERT INTO users (nim, email, password_hash, role) VALUES (?, ?, ?, ?)',
            ['ADMIN001', adminEmail, passwordHash, 'admin']
        );
        console.log('✅ Akun Admin berhasil dibuat: admin@lppm.ac.id / admin123');
    } else {
        console.log('ℹ️ Akun Admin sudah terdaftar: admin@lppm.ac.id');
    }

    // 2. Data Lokasi KKN Uji Coba
    const sampleLocations = [
        {
            nama: 'Desa Cibodas',
            kecamatan: 'Lembang',
            kabupaten: 'Bandung Barat',
            kuota_maksimal: 5,
            periode: '2026/2027 Ganjil'
        },
        {
            nama: 'Desa Sukamaju',
            kecamatan: 'Cisarua',
            kabupaten: 'Bandung Barat',
            kuota_maksimal: 4,
            periode: '2026/2027 Ganjil'
        },
        {
            nama: 'Desa Bojong Kulon',
            kecamatan: 'Parongpong',
            kabupaten: 'Bandung Barat',
            kuota_maksimal: 3,
            periode: '2026/2027 Ganjil'
        }
    ];

    for (const loc of sampleLocations) {
        const [existing] = await pool.execute(
            'SELECT id FROM locations WHERE nama_desa_wilayah = ? LIMIT 1',
            [loc.nama]
        );
        if (existing.length === 0) {
            await pool.execute(
                `INSERT INTO locations (nama_desa_wilayah, kecamatan, kabupaten, kuota_maksimal, kuota_terisi, periode_kkn, status_aktif)
                 VALUES (?, ?, ?, ?, 0, ?, TRUE)`,
                [loc.nama, loc.kecamatan, loc.kabupaten, loc.kuota_maksimal, loc.periode]
            );
            console.log(`✅ Lokasi dibuat: ${loc.nama} (Kuota: ${loc.kuota_maksimal})`);
        }
    }

    // 3. Pengumuman Default
    const [existingAnnouncements] = await pool.execute('SELECT id FROM announcements LIMIT 1');
    if (existingAnnouncements.length === 0) {
        await pool.execute(
            `INSERT INTO announcements (judul, konten) VALUES (?, ?)`,
            [
                'Pendaftaran KKN Periode 2026/2027 Dibuka',
                'Pendaftaran Kuliah Kerja Nyata (KKN) resmi dibuka. Seluruh mahasiswa semester 5 yang memenuhi syarat dipersilakan melengkapi pendaftaran dan memilih lokasi desa mitra.'
            ]
        );
        console.log('✅ Pengumuman perdana berhasil dibuat.');
    }

    console.log('\n🎉 Seeding selesai! Database siap untuk pengujian API & Frontend.');
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Gagal menjalankan seeder:', err.message);
    process.exit(1);
});

