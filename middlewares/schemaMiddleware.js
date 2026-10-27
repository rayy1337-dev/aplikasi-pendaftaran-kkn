const ensureSchema = require('../config/schema');

async function schemaMiddleware(req, res, next) {
    try {
        await ensureSchema();
        return next();
    } catch (error) {
        console.error('Gagal menyiapkan skema database:', error);
        return res.status(503).json({
            status: 'Gagal',
            message: 'Database tidak dapat diakses atau skema belum siap.'
        });
    }
}

module.exports = schemaMiddleware;
