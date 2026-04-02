const geminiService = require('../services/geminiService');
const transactionService = require('../services/transactionService');
const scoreService = require('../services/scoreService');

const handleWhatsAppMessage = async (req, res, next) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({ error: 'phone et message sont requis' });
        }

        // 1. Détecter l'intention via Gemini
        const { intent, amount } = await geminiService.processMessageIntent(message);

        let resultData = {};
        let actionContext = '';

        // 2. Router la logique métier
        switch (intent) {
            case 'VENTE':
            case 'ACHAT':
            case 'DETTE':
                if (!amount) {
                    return res.status(200).json({
                        response: "Je n'ai pas compris le montant. Veux-tu me le redire ?"
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
                return res.status(200).json({
                    response: "Je suis ton assistant financier. Dis-moi si tu as vendu, acheté, ou si tu veux ton score !"
                });
        }

        // 3. Générer la réponse naturelle via Gemini
        const finalResponse = await geminiService.generateResponseTemplate(actionContext, resultData);

        // 4. Retourner la réponse formattée pour WhatsApp (n8n la transmettra)
        res.status(200).json({ response: finalResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = {
    handleWhatsAppMessage
};
