const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const allowedTypes = new Map([
    ['.pdf', ['application/pdf']],
    ['.jpg', ['image/jpeg']],
    ['.jpeg', ['image/jpeg']],
    ['.png', ['image/png']]
]);

const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
        callback(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimeTypes = allowedTypes.get(extension);
        if (!mimeTypes || !mimeTypes.includes(file.mimetype)) {
            return callback(new Error('File harus berupa PDF, JPG, JPEG, atau PNG dengan tipe yang sesuai.'));
        }
        return callback(null, true);
    }
}).single('file');

function uploadMiddleware(req, res, next) {
    upload(req, res, (error) => {
        if (!error) {
            return next();
        }
        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ status: 'Gagal', message: 'Ukuran file maksimal 5 MB.' });
        }
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ status: 'Gagal', message: 'Permintaan upload tidak valid.' });
        }
        return res.status(400).json({ status: 'Gagal', message: error.message });
    });
}

module.exports = { uploadDirectory, uploadMiddleware };
