const transactionService = require('./transactionService');

const calculateSimpleScore = async (phone) => {
    const stats = await transactionService.getEngineStats(phone);

    let score = 50;
    if (stats.totalVentes > 0) {
        if (stats.profit > 0) score += 30; // Profitable
        else score -= 10;
    }
    if (stats.dettes > 0 && stats.totalVentes === 0) score -= 30; // Debt without sales

    score = Math.max(0, Math.min(100, Math.round(score)));

    let niveau = 'MOYEN';
    if (score >= 70) niveau = 'BON';
    if (score <= 40) niveau = 'FAIBLE';

    return { score, niveau, stats };
};

const checkFunding = async (phone) => {
    const { score } = await calculateSimpleScore(phone);

    let eligible = false;
    let amount = 0;
    let reason = '';

    if (score >= 70) {
        eligible = true;
        amount = 500000;
        reason = "Votre gestion saine vous rend éligible à un crédit conséquent.";
    } else if (score >= 50) {
        eligible = true;
        amount = 50000;
        reason = "Votre score est moyen, vous êtes éligible à un micro-crédit de lancement.";
    } else {
        reason = "Votre score est trop faible, vous devez augmenter vos ventes ou rembourser vos dettes d'abord.";
    }

    return { eligible, amount, reason };
};

module.exports = {
    calculateSimpleScore,
    checkFunding
};
