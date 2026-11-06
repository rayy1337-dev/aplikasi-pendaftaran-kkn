const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { listLocations, createLocation, updateLocation } = require('../controllers/locationController');

const router = express.Router();

router.use(schemaMiddleware);
/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Melihat daftar lokasi KKN
 *     tags: [Lokasi]
 *     security: []
 *     responses:
 *       200:
 *         description: Daftar lokasi
 */
router.get('/', listLocations);
/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Menambahkan lokasi KKN
 *     tags: [Lokasi]
 *     responses:
 *       201:
 *         description: Lokasi berhasil dibuat
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Hanya admin yang dapat menambahkan lokasi
 */
router.post('/', authenticate, authorize('admin'), createLocation);
/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Memperbarui lokasi KKN
 *     tags: [Lokasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lokasi berhasil diperbarui
 *       401:
 *         description: Token tidak valid atau tidak tersedia
 *       403:
 *         description: Hanya admin yang dapat memperbarui lokasi
 */
router.put('/:id', authenticate, authorize('admin'), updateLocation);

module.exports = router;
