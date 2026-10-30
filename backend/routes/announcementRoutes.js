const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { listAnnouncements, createAnnouncement } = require('../controllers/announcementController');

const router = express.Router();

router.use(schemaMiddleware);
router.get('/', listAnnouncements);
router.post('/', authenticate, authorize('admin'), createAnnouncement);

module.exports = router;
