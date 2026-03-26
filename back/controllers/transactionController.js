const transactionService = require('../services/transactionService');

const createTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        next(error);
    }
};

const getTransactions = async (req, res, next) => {
    try {
        const { userId } = req.query; // Normally from auth token, but simplfied for hackathon

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId est requis' });
        }

        const transactions = await transactionService.getTransactionsByUser(userId);
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        next(error);
    }
};

const getDashboardStats = async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId est requis' });
        }

        const stats = await transactionService.getDashboardStats(userId);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getDashboardStats,
};
