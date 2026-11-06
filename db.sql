CREATE DATABASE IF NOT EXISTS `db_pendaftaran_kkn`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `db_pendaftaran_kkn`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(32) NULL,
    `email` VARCHAR(254) NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('mahasiswa', 'admin') NOT NULL DEFAULT 'mahasiswa',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_users_nim` (`nim`),
    UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `mahasiswa_profiles` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `nim` VARCHAR(32) NOT NULL,
    `nama_lengkap` VARCHAR(150) NULL,
    `program_studi` VARCHAR(150) NULL,
    `fakultas` VARCHAR(150) NULL,
    `no_hp` VARCHAR(32) NULL,
    `jenis_kelamin` ENUM('L', 'P') NULL,
    `total_sks` INT UNSIGNED NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_profiles_user_id` (`user_id`),
    UNIQUE KEY `uq_profiles_nim` (`nim`),
    CONSTRAINT `fk_profiles_user`
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `locations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama_desa_wilayah` VARCHAR(150) NOT NULL,
    `kecamatan` VARCHAR(150) NOT NULL,
    `kabupaten` VARCHAR(150) NOT NULL,
    `kuota_maksimal` INT UNSIGNED NOT NULL,
    `kuota_terisi` INT UNSIGNED NOT NULL DEFAULT 0,
    `periode_kkn` VARCHAR(100) NOT NULL,
    `status_aktif` BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `registrations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `mahasiswa_id` BIGINT UNSIGNED NOT NULL,
    `location_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'verified', 'revision', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `catatan_admin` TEXT NULL,
    `tanggal_daftar` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_registrations_student` (`mahasiswa_id`),
    KEY `idx_registrations_location` (`location_id`),
    KEY `idx_registrations_status` (`status`),
    CONSTRAINT `fk_registrations_profile`
        FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa_profiles` (`id`),
    CONSTRAINT `fk_registrations_location`
        FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `registration_files` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `registration_id` BIGINT UNSIGNED NOT NULL,
    `jenis_berkas` ENUM('ktm', 'khs', 'surat_sehat', 'surat_izin') NOT NULL,
    `file_url` VARCHAR(500) NOT NULL,
    `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_files_registration` (`registration_id`),
    CONSTRAINT `fk_files_registration`
        FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `announcements` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(200) NOT NULL,
    `konten` TEXT NOT NULL,
    `lampiran_pdf_url` VARCHAR(500) NULL,
    `tanggal_rilis` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
