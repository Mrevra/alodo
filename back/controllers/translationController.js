const translationService = require('../services/translationService');

const translateText = async (req, res, next) => {
    try {
        const { texte, langchainCible } = req.body;

        if (!texte || !langchainCible) {
            return res.status(400).json({
                success: false,
                message: 'texte et langchainCible (fon ou yoruba) sont requis'
            });
        }

        const translatedText = await translationService.translateContext(texte, langchainCible);
        res.status(200).json({ success: true, translatedText });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    translateText
};
