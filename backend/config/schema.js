const pool = require('./database');

let schemaReady;

async function ensureSchema() {
    if (!schemaReady) {
        schemaReady = (async () => {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    nim VARCHAR(32) NULL UNIQUE,
                    email VARCHAR(254) NULL UNIQUE,
                    password_hash VARCHAR(255) NOT NULL,
                    role ENUM('mahasiswa', 'admin') NOT NULL DEFAULT 'mahasiswa',
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);

            const [columns] = await pool.query('SHOW COLUMNS FROM users');
            const fields = columns.map((column) => column.Field);
            if (!fields.includes('nim')) {
                await pool.query('ALTER TABLE users ADD COLUMN nim VARCHAR(32) NULL UNIQUE AFTER id');
            }
            if (!fields.includes('email')) {
                await pool.query('ALTER TABLE users ADD COLUMN email VARCHAR(254) NULL UNIQUE AFTER nim');
            } else {
                const emailColumn = columns.find((column) => column.Field === 'email');
                if (emailColumn.Null === 'NO') {
                    await pool.query('ALTER TABLE users MODIFY email VARCHAR(254) NULL');
                }
            }

            await pool.query(`
                CREATE TABLE IF NOT EXISTS mahasiswa_profiles (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
                    nim VARCHAR(32) NOT NULL UNIQUE,
                    nama_lengkap VARCHAR(150) NULL,
                    program_studi VARCHAR(150) NULL,
                    fakultas VARCHAR(150) NULL,
                    no_hp VARCHAR(32) NULL,
                    jenis_kelamin ENUM('L', 'P') NULL,
                    total_sks INT UNSIGNED NULL,
                    CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);

            await pool.query(`
                CREATE TABLE IF NOT EXISTS locations (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    nama_desa_wilayah VARCHAR(150) NOT NULL,
                    kecamatan VARCHAR(150) NOT NULL,
                    kabupaten VARCHAR(150) NOT NULL,
                    kuota_maksimal INT UNSIGNED NOT NULL,
                    kuota_terisi INT UNSIGNED NOT NULL DEFAULT 0,
                    periode_kkn VARCHAR(100) NOT NULL,
                    status_aktif BOOLEAN NOT NULL DEFAULT TRUE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);

            await pool.query(`
                CREATE TABLE IF NOT EXISTS registrations (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    mahasiswa_id BIGINT UNSIGNED NOT NULL,
                    location_id BIGINT UNSIGNED NOT NULL,
                    status ENUM('pending', 'verified', 'revision', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
                    catatan_admin TEXT NULL,
                    tanggal_daftar TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_registrations_student (mahasiswa_id),
                    INDEX idx_registrations_location (location_id),
                    INDEX idx_registrations_status (status),
                    CONSTRAINT fk_registrations_profile FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa_profiles(id),
                    CONSTRAINT fk_registrations_location FOREIGN KEY (location_id) REFERENCES locations(id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);

            await pool.query(`
                CREATE TABLE IF NOT EXISTS registration_files (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    registration_id BIGINT UNSIGNED NOT NULL,
                    jenis_berkas ENUM('ktm', 'khs', 'surat_sehat', 'surat_izin') NOT NULL,
                    file_url VARCHAR(500) NOT NULL,
                    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_files_registration (registration_id),
                    CONSTRAINT fk_files_registration FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);

            await pool.query(`
                CREATE TABLE IF NOT EXISTS announcements (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    judul VARCHAR(200) NOT NULL,
                    konten TEXT NOT NULL,
                    lampiran_pdf_url VARCHAR(500) NULL,
                    tanggal_rilis TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
            `);
        })().catch((error) => {
            schemaReady = undefined;
            throw error;
        });
    }

    await schemaReady;
}

module.exports = ensureSchema;
