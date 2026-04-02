const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middlewares/error');
// Routes will be imported here
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Main Webhook Route for n8n/WhatsApp
app.use('/webhook', webhookRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur Alodo démarré sur le port ${PORT}`);
    console.log(`⚠️ Environnement : ${process.env.NODE_ENV || 'non défini'}`);
});

// Prévenir le crash total de l'application en cas d'erreur non gérée
process.on('uncaughtException', (err) => {
    console.error('Erreur non capturée (uncaughtException) :', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejet de promesse non géré (unhandledRejection) :', reason);
});
