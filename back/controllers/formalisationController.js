const formalisationService = require('../services/formalisationService');

const getFormalisationStatus = async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'userId est requis' });
        }

        const statusData = await formalisationService.getFormalisationStatus(userId);
        res.status(200).json({ success: true, data: statusData });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFormalisationStatus
};
