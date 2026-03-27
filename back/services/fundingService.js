const scoreService = require('./scoreService');

const getFundingMatch = async (userId) => {
    // on se base sur le score de l'utilisateur pour estimer l'éligibilité
    const scoreData = await scoreService.calculateScore(userId);

    let eligible = false;
    let montantEstime = 0;
    let type = null;
    let institution = null;

    if (scoreData.score >= 70) {
        eligible = true;
        montantEstime = 500000; // XOF
        type = 'Crédit PME';
        institution = 'Banque Partenaire (Ex: BOA Bénin)';
    } else if (scoreData.score >= 40) {
        eligible = true;
        montantEstime = 100000; // XOF
        type = 'Micro-crédit solidaire';
        institution = 'Institution de Microfinance (Ex: PEBCO Bethesda)';
    } else {
        type = 'Formation en gestion';
        institution = 'Alodo Academy'; // Needs training before funding
    }

    const { translations } = require('./translationService');
    
    return {
        eligible,
        montantEstime,
        typeFinancement: type,
        institutionSuggeree: institution,
        texts: eligible ? (montantEstime > 200000 ? translations.funding.eligible_high : translations.funding.eligible_micro) : translations.funding.need_training,
        scoreUtilise: scoreData.score
    };
};

module.exports = {
    getFundingMatch
};
