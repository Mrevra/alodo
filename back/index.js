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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
