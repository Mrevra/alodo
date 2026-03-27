const prisma = require('../prisma');

const getFormalisationStatus = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    const { ifu, rccm } = user;

    let recommandation = '';

    if (ifu && rccm) {
        recommandation = 'Votre entreprise est pleinement formalisée. Félicitations !';
    } else if (ifu && !rccm) {
        recommandation = 'Vous avez votre IFU, pensez à vous inscrire au RCCM pour faciliter vos démarches.';
    } else if (!ifu && rccm) {
        recommandation = 'Inscrit au RCCM, il ne vous reste plus qu\'à créer votre IFU en ligne.';
    } else {
        recommandation = 'La formalisation vous ouvre les portes du financement. Commencez par créer votre IFU gratuit en ligne.';
    }

    const { translations } = require('./translationService');
    
    let textsKey = 'full';
    if (!ifu && !rccm) textsKey = 'need_ifu';
    else if (!ifu || !rccm) textsKey = 'need_ifu'; // simplifié pour la démo
    
    return {
        ifu,
        rccm,
        recommandation,
        texts: translations.formalisation[textsKey]
    };
};

module.exports = {
    getFormalisationStatus
};
