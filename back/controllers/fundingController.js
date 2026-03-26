const fundingService = require('../services/fundingService');

const getFundingMatch = async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId est requis' });
        }

        const matchData = await fundingService.getFundingMatch(userId);
        res.status(200).json({ success: true, data: matchData });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFundingMatch
};
