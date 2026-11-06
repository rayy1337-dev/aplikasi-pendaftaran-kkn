const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { listAnnouncements, createAnnouncement } = require('../controllers/announcementController');

const router = express.Router();

router.use(schemaMiddleware);
/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Melihat daftar pengumuman
 *     tags: [Pengumuman]
 *     security: []
 *     responses:
 *       200:
 *         description: Daftar pengumuman
 */
router.get('/', listAnnouncements);
/**
 * @swagger
 * /api/announcements:
 *   post:
 *     summary: Membuat pengumuman
 *     tags: [Pengumuman]
 *     responses:
 *       201:
 *         description: Pengumuman berhasil dibuat
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Hanya admin yang dapat membuat pengumuman
 */
router.post('/', authenticate, authorize('admin'), createAnnouncement);

module.exports = router;
