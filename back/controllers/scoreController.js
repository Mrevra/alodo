const scoreService = require('../services/scoreService');

const getScore = async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId est requis' });
        }

        const scoreData = await scoreService.calculateScore(userId);
        res.status(200).json({ success: true, data: scoreData });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getScore
};
