const geminiService = require('../services/geminiService');
const transactionService = require('../services/transactionService');
const scoreService = require('../services/scoreService');
const axios = require('axios');

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

// 🧩 STEP 4 — SEND RESPONSE VIA EVOLUTION API
const sendWhatsAppReply = async (phone, responseText) => {
    try {
        if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
            console.error("Missing EVOLUTION_API_URL or EVOLUTION_API_KEY in .env");
            return;
        }

        const url = EVOLUTION_API_URL.endsWith('/')
            ? `${EVOLUTION_API_URL}message/sendText`
            : `${EVOLUTION_API_URL}/message/sendText`;

        await axios.post(url, {
            number: phone,
            text: responseText
        }, {
            headers: {
                'Authorization': `Bearer ${EVOLUTION_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(`Reply sent to ${phone} successfully`);
    } catch (error) {
        console.error("Evolution API Target Error:", error.response?.data || error.message);
    }
};

const handleWhatsAppMessage = async (req, res, next) => {
    // 🧩 STEP 6 — LOGGING
    console.log("Incoming webhook:", JSON.stringify(req.body, null, 2));

    try {
        const raw = req.body || {};

        // 🧩 STEP 2 — ROBUST EXTRACTION
        let phone = raw?.data?.key?.remoteJid?.split("@")[0] || "unknown_user";

        let message =
            raw?.data?.message?.conversation ||
            raw?.data?.message?.extendedTextMessage?.text ||
            "";

        // 🧩 STEP 1 — FILTER EVENTS (Ignore empty messages)
        if (!message || message.trim() === "") {
            return res.status(200).send("OK: No message content to process");
        }

        // Nettoyage rapide
        message = message.trim();

        let finalResponse = "";

        // 🧩 STEP 3 — PROCESS MESSAGE
        const { intent, amount } = await geminiService.processMessageIntent(message);

        let resultData = {};
        let actionContext = '';

        switch (intent) {
            case 'VENTE':
            case 'ACHAT':
            case 'DETTE':
                if (!amount) {
                    finalResponse = "Je n'ai pas compris le montant. Peux-tu reformuler avec un chiffre exact ?";
                } else {
                    await transactionService.recordTransaction(phone, intent, amount);
                    resultData = await transactionService.getEngineStats(phone);
                    actionContext = `Tu confirmes l'enregistrement de ${amount} FCFA pour ${intent}. Donne le profit total actuel.`;
                }
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
                finalResponse = "Je n'ai pas bien compris. Essayez par exemple : 'J'ai vendu pour 5000'";
        }

        // Generation de reponse dynamique si non fixée
        if (!finalResponse) {
            finalResponse = await geminiService.generateResponseTemplate(actionContext, resultData);
        }

        // Repondre asynchronement à Whatsapp
        if (phone !== "unknown_user") {
            await sendWhatsAppReply(phone, finalResponse);
        }

        // 🧩 STEP 7 — RESPONSE FORMAT (Simple 200 OK to webhook)
        return res.status(200).json({ status: "success" });

    } catch (error) {
        // 🧩 STEP 5 — FAIL SAFE
        console.error("Webhook Execution Error:", error);
        return res.status(200).json({ status: "fail-safe ok" });
    }
};

module.exports = {
    handleWhatsAppMessage
};
