const transactionService = require('./transactionService');

const calculateScore = async (userId) => {
    const stats = await transactionService.getDashboardStats(userId);

    // Logic simple pour le hackathon
    // 1. Ratio profit / ventes (marge)
    // 2. Ratio dettes / ventes
    // 3. Activité globale

    let score = 50; // Base score

    if (stats.totalVentes > 0) {
        // Si la marge est positive, on augmente le score
        if (stats.profit > 0) {
            const margin = stats.profit / stats.totalVentes;
            score += (margin * 30); // Max +30 points pour la marge
        } else {
            score -= 10;
        }

        // Impact des dettes
        const debtRatio = stats.dettesEnCours / stats.totalVentes;
        if (debtRatio > 0.5) {
            score -= 20; // Trop de dettes
        } else if (debtRatio > 0) {
            score -= (debtRatio * 20);
        }
    } else if (stats.dettesEnCours > 0) {
        score -= 30; // Dettes sans revenus
    }

    // Cap score entre 0 et 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    let niveau = 'MOYEN';
    let recommandation = 'Continuez à enregistrer vos transactions pour améliorer votre score.';

    if (score >= 70) {
        niveau = 'BON';
        recommandation = 'Excellente gestion financière. Vous êtes éligible à de meilleures offres de financement.';
    } else if (score < 40) {
        niveau = 'FAIBLE';
        recommandation = 'Attention à vos dettes et essayez de réduire vos dépenses pour remonter votre profit.';
    }

    return {
        score,
        niveau,
        recommandation
    };
};

module.exports = {
    calculateScore
};
