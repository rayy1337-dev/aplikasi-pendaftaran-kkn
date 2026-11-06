const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { uploadMiddleware } = require('../middlewares/uploadMiddleware');
const {
    createRegistration,
    listMyRegistrations,
    uploadRegistrationFile,
    downloadRegistrationFile
} = require('../controllers/registrationController');

const router = express.Router();

/**
 * @swagger
 * /api/registrations/files/{id}:
 *   get:
 *     summary: Mengunduh berkas pendaftaran
 *     tags: [Pendaftaran]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berkas pendaftaran
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Tidak memiliki akses ke berkas
 */
router.get('/files/:id', schemaMiddleware, authenticate, downloadRegistrationFile);
router.use(schemaMiddleware, authenticate, authorize('mahasiswa'));
/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Membuat pendaftaran KKN
 *     tags: [Pendaftaran]
 *     responses:
 *       201:
 *         description: Pendaftaran berhasil dibuat
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Hanya mahasiswa yang dapat mendaftar
 */
router.post('/', createRegistration);
/**
 * @swagger
 * /api/registrations/my:
 *   get:
 *     summary: Melihat riwayat pendaftaran sendiri
 *     tags: [Pendaftaran]
 *     responses:
 *       200:
 *         description: Daftar pendaftaran milik pengguna
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */
router.get('/my', listMyRegistrations);
/**
 * @swagger
 * /api/registrations/upload:
 *   post:
 *     summary: Mengunggah berkas persyaratan pendaftaran
 *     tags: [Pendaftaran]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               registration_id:
 *                 type: integer
 *               jenis_berkas:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Berkas berhasil diunggah
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */
router.post('/upload', uploadMiddleware, uploadRegistrationFile);

module.exports = router;
