const { translations } = require('./translationService');

const getInsights = async (userId) => {
    // Dans un vrai système, on choisirait l'insight selon le profil utilisateur.
    // Ici on renvoie les clés de traduction pour que le front puisse choisir la langue.

    const insightsList = [
        {
            key: 'maize_rising',
            type: 'MARKET_ALERT',
            texts: translations.insights.maize_rising
        },
        {
            key: 'palm_oil_hot',
            type: 'OPPORTUNITY',
            texts: translations.insights.palm_oil_hot
        },
        {
            key: 'alafia_credit',
            type: 'FINANCIAL_TIP',
            texts: translations.insights.alafia_credit
        }
    ];

    // Renvoie un insight au hasard pour la démo
    const randomIndex = Math.floor(Math.random() * insightsList.length);
    return insightsList[randomIndex];
};

module.exports = {
    getInsights
};
