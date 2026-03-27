/**
 * Dictionnaire centralisé des traductions pour Alodó
 * Germain, c'est ici que tu peux ajouter tous les messages en Fon et Yoruba.
 */

const translations = {
    // Messages communs
    common: {
        welcome: {
            fr: "Bienvenue sur Alodó",
            fon: "Kwaabo do Alodó",
            yo: "E kaabo si Alodó"
        },
        error: {
            fr: "Une erreur est survenue",
            fon: "Afɔku ɖé jɛ",
            yo: "Asise kan sele"
        }
    },

    // Alertes Marché (Insights P1)
    insights: {
        maize_rising: {
            fr: "Le prix du maïs augmente sur le marché de Dantokpa cette semaine.",
            fon: "Maï tche bo dji do Dantokpa zogo é...",
            yo: "Iye agbado n lo soke ni oja Dantokpa ose yi..."
        },
        palm_oil_hot: {
            fr: "Forte demande d'huile de palme à Porto-Novo.",
            fon: "Ami vovo hudo dji gbé do Hogbonou...",
            yo: "Iye epo pupa n lo soke ni oja Hogbonou..."
        },
        alafia_credit: {
            fr: "Micro-crédit Alafia disponible pour les femmes commerçantes.",
            fon: "Alafia kwè gbé hudo...",
            yo: "Alafia owo wa fun awon obinrin..."
        }
    },

    // Financement (P3)
    funding: {
        eligible_high: {
            fr: "Félicitations ! Vous êtes éligible à un crédit PME.",
            fon: "Mi jɛ xa bo na dɔn kwè daxó...",
            yo: "O tọ si lati gba awin owo nla..."
        },
        eligible_micro: {
            fr: "Vous êtes éligible pour un micro-crédit solidaire.",
            fon: "Mi jɛ xa bo na dɔn kwè hwɛví...",
            yo: "O tọ si lati gba awin owo kekere..."
        },
        need_training: {
            fr: "Nous vous suggérons une formation en gestion avant le financement.",
            fon: "Mi ɖó na kplɔn zinzan kwè tɔn hwɛ...",
            yo: "O nilo eko nipa lilo owo ki o to gba awin..."
        }
    },

    // Formalisation (P4)
    formalisation: {
        full: {
            fr: "Votre entreprise est pleinement formalisée. Félicitations !",
            fon: "Azɔnxwé mitɔn sɔgbe ɖéwu. È sìn asy rɛ !",
            yo: "Ise rẹ ti forukọsilẹ ni kikun. Oriire!"
        },
        need_ifu: {
            fr: "La formalisation commence par l'IFU. C'est gratuit et rapide.",
            fon: "Mi gbé IFU mitɔn hwɛ, é fɛ́ bo bɔwù.",
            yo: "Bẹrẹ pẹlu IFU, o jẹ ọfẹ ati yara."
        }
    }
};

/**
 * Fonction pour récupérer une traduction
 * @param {string} category - La catégorie (ex: 'insights')
 * @param {string} key - La clé du message (ex: 'maize_rising')
 * @param {string} lang - La langue ('fr', 'fon', 'yo')
 */
const t = (category, key, lang = 'fr') => {
    try {
        return translations[category][key][lang] || translations[category][key]['fr'];
    } catch (e) {
        return "Message non trouvé";
    }
};

module.exports = {
    translations,
    t
};
