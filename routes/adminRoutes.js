const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { listRegistrations, updateRegistrationStatus } = require('../controllers/adminController');

const router = express.Router();

router.use(schemaMiddleware, authenticate, authorize('admin'));
/**
 * @swagger
 * /api/admin/registrations:
 *   get:
 *     summary: Melihat daftar pendaftaran mahasiswa
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Daftar pendaftaran mahasiswa
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Hanya admin yang dapat melihat daftar ini
 */
router.get('/registrations', listRegistrations);
/**
 * @swagger
 * /api/admin/registrations/{id}/verify:
 *   put:
 *     summary: Memverifikasi pendaftaran mahasiswa
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status pendaftaran berhasil diperbarui
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Hanya admin yang dapat memverifikasi pendaftaran
 */
router.put('/registrations/:id/verify', updateRegistrationStatus);

module.exports = router;
