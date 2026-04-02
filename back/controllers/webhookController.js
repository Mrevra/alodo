const geminiService = require('../services/geminiService');
const transactionService = require('../services/transactionService');
const scoreService = require('../services/scoreService');

const handleWhatsAppMessage = async (req, res, next) => {
    // 1. Intelligent Logging (CRITICAL)
    console.log("Incoming request:", JSON.stringify(req.body, null, 2));

    try {
        const raw = req.body || {};

        // 2. Flexible Input Parsing
        let phone =
            raw.phone ||
            raw.sender ||
            (raw.data?.key?.remoteJid?.split("@")[0]) ||
            "unknown_user";

        let message =
            raw.message ||
            raw.text ||
            raw.data?.message?.conversation ||
            raw.data?.message?.extendedTextMessage?.text ||
            raw.data?.message?.imageMessage?.caption ||
            "";

        // Nettoyage des données pour la propreté (si ça vient brut d'Evolution API)
        if (typeof phone === 'string') {
            phone = phone.replace('@s.whatsapp.net', '').replace('@c.us', '').trim();
        }
        if (typeof message === 'string') {
            message = message.trim();
        }

        // 3. Remove Hard Failures (Fallback si pas de message)
        if (!message) {
            return res.status(200).json({
                reply: "Salut ! 👋 Je suis l'assistant financier Alodo. Dis-moi par exemple : 'J'ai vendu pour 5000' ou 'Quel est mon bilan ?'",
                response: "Salut ! 👋 Je suis l'assistant financier Alodo. Dis-moi par exemple : 'J'ai vendu pour 5000' ou 'Quel est mon bilan ?'"
            });
        }

        // Détection de l'intention
        const { intent, amount } = await geminiService.processMessageIntent(message);

        let resultData = {};
        let actionContext = '';

        // Logique Métier
        switch (intent) {
            case 'VENTE':
            case 'ACHAT':
            case 'DETTE':
                if (!amount) {
                    return res.status(200).json({
                        reply: "Je n'ai pas compris le montant. Peux-tu reformuler avec un chiffre exact ?",
                        response: "Je n'ai pas compris le montant. Peux-tu reformuler avec un chiffre exact ?"
                    });
                }
                await transactionService.recordTransaction(phone, intent, amount);
                resultData = await transactionService.getEngineStats(phone);
                actionContext = `Tu confirmes l'enregistrement de ${amount} FCFA pour ${intent}. Donne le profit total actuel.`;
                break;

            case 'SCORE':
                resultData = await scoreService.calculateSimpleScore(phone);
                actionContext = `Tu donnes le score financier sur 100 de l'utilisateur et son bilan.`;
                break;

            case 'FUNDING':
                resultData = await scoreService.checkFunding(phone);
                actionContext = `Tu expliques si l'utilisateur peut avoir un crédit, d'après les données fournies.`;
                break;

            case 'INSIGHT':
                actionContext = `Donne un conseil court (1 phrase) pour un petit commerce, par ex sur comment attirer des clients ou gerer ses dettes.`;
                break;

            default:
                // 4. Safe Defaults si incompris
                return res.status(200).json({
                    reply: "Je n'ai pas bien compris. Essayez par exemple: 'j'ai vendu 5000'",
                    response: "Je n'ai pas bien compris. Essayez par exemple: 'j'ai vendu 5000'"
                });
        }

        const finalResponse = await geminiService.generateResponseTemplate(actionContext, resultData);

        // 5. Always Return a Response (200 OK avec fallback 'reply')
        res.status(200).json({
            reply: finalResponse,
            response: finalResponse // Pour rétro-compatibilité n8n
        });

    } catch (error) {
        // Global Try/Catch Protection
        console.error("Webhook Execution Error:", error);

        res.status(200).json({
            reply: "⚠️ Une erreur est survenue, veuillez réessayer.",
            response: "⚠️ Une erreur est survenue, veuillez réessayer."
        });
    }
};

module.exports = {
    handleWhatsAppMessage
};
