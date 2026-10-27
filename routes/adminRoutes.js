const express = require('express');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { listRegistrations, updateRegistrationStatus } = require('../controllers/adminController');

const router = express.Router();

router.use(schemaMiddleware, authenticate, authorize('admin'));
router.get('/registrations', listRegistrations);
router.put('/registrations/:id/verify', updateRegistrationStatus);

module.exports = router;
