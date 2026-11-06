require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Memanggil konfigurasi database
const db = require('./config/database'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// KONFIGURASI SWAGGER UI
// ==========================================
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Pendaftaran KKN ITB Widya Gama',
            version: '1.0.0',
            description: 'Dokumentasi RESTful API untuk sistem pendaftaran KKN Mahasiswa',
            contact: {
                name: 'Ricko - Backend Developer'
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./index.js', './routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ==========================================
// ENDPOINT ROUTES
// ==========================================

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Cek status server API
 *     tags: [Sistem]
 *     description: Mengembalikan pesan status bahwa server API sedang berjalan normal.
 *     responses:
 *       200:
 *         description: Server berjalan dengan baik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API Server Pendaftaran KKN Berjalan Normal 🚀
 * /api:
 *   get:
 *     summary: Cek status server API
 *     tags: [Sistem]
 *     responses:
 *       200:
 *         description: Server berjalan dengan baik
 */
app.get('/', (req, res) => {
    res.json({ message: 'API Server Pendaftaran KKN Berjalan Normal 🚀' });
});

app.get('/api', (req, res) => {
    res.json({ message: 'API Server Pendaftaran KKN Berjalan Normal 🚀' });
});

// ==========================================
// JALANKAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
    console.log(`📄 Swagger UI tersedia di http://localhost:${PORT}/api-docs`);
});