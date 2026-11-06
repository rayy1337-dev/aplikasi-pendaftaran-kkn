const express = require('express');
const { register, login, me } = require('../controllers/authController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(schemaMiddleware);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Mendaftarkan akun mahasiswa
 *     tags: [Autentikasi]
 *     security: []
 *     responses:
 *       201:
 *         description: Akun mahasiswa berhasil dibuat
 *       400:
 *         description: Data pendaftaran tidak valid
 */
router.post('/register', register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Autentikasi]
 *     security: []
 *     responses:
 *       200:
 *         description: Login berhasil dan token diberikan
 *       401:
 *         description: Email/NIM atau password tidak sesuai
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Mendapatkan profil pengguna yang sedang login
 *     tags: [Autentikasi]
 *     responses:
 *       200:
 *         description: Profil pengguna
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 */
router.get('/me', authenticate, me);

module.exports = router;
