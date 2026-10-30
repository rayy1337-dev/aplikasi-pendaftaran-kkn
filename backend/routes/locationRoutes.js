const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { listLocations, createLocation, updateLocation } = require('../controllers/locationController');

const router = express.Router();

router.use(schemaMiddleware);
router.get('/', listLocations);
router.post('/', authenticate, authorize('admin'), createLocation);
router.put('/:id', authenticate, authorize('admin'), updateLocation);

module.exports = router;
