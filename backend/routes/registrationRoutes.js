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

router.get('/files/:id', schemaMiddleware, authenticate, downloadRegistrationFile);
router.use(schemaMiddleware, authenticate, authorize('mahasiswa'));
router.post('/', createRegistration);
router.get('/my', listMyRegistrations);
router.post('/upload', uploadMiddleware, uploadRegistrationFile);

module.exports = router;
