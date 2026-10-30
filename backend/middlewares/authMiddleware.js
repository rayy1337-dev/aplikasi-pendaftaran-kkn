const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authorization = req.get('authorization');
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '';

    if (!token) {
        return res.status(401).json({ status: 'Gagal', message: 'Token autentikasi wajib disertakan.' });
    }
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET belum dikonfigurasi.');
        return res.status(503).json({ status: 'Gagal', message: 'Autentikasi belum dikonfigurasi di server.' });
    }

    try {
        req.auth = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch {
        return res.status(401).json({ status: 'Gagal', message: 'Token tidak valid atau sudah kedaluwarsa.' });
    }
}

function authorize(...roles) {
    return (req, res, next) => {
        if (!req.auth || !roles.includes(req.auth.role)) {
            return res.status(403).json({ status: 'Gagal', message: 'Anda tidak memiliki izin untuk mengakses endpoint ini.' });
        }
        return next();
    };
}

module.exports = { authenticate, authorize };
