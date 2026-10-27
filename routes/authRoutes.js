const express = require('express');
const { register, login, me } = require('../controllers/authController');
const schemaMiddleware = require('../middlewares/schemaMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(schemaMiddleware);
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, me);

module.exports = router;
