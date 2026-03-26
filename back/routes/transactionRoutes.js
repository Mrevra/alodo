const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// POST /transactions
router.post('/', transactionController.createTransaction);

// GET /transactions
router.get('/', transactionController.getTransactions);

// GET /transactions/dashboard (mapped to /dashboard or /transactions/dashboard)
router.get('/dashboard', transactionController.getDashboardStats);

module.exports = router;
