const insightService = require('../services/insightService');

const getInsights = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const insights = await insightService.getInsights(userId);
        res.status(200).json({ success: true, data: insights });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getInsights
};
