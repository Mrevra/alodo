const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middlewares/error');
// Routes will be imported here
const transactionRoutes = require('./routes/transactionRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const insightRoutes = require('./routes/insightRoutes');
const fundingRoutes = require('./routes/fundingRoutes');
const formalisationRoutes = require('./routes/formalisationRoutes');
const translationRoutes = require('./routes/translationRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API Alodo (Backend Hackathon)' });
});

// Endpoint de test de santé (requis pour Railway)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/transactions', transactionRoutes);
const transactionController = require('./controllers/transactionController');
app.get('/dashboard', transactionController.getDashboardStats);
app.use('/score', scoreRoutes);
app.use('/insights', insightRoutes);
app.use('/funding-match', fundingRoutes);
app.use('/formalisation-status', formalisationRoutes);
app.use('/translate', translationRoutes);

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
