const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini with the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const processMessageIntent = async (message) => {
    const prompt = `
Tu es l'assistant IA d'un système financier pour MPME.
Analyse ce message: "${message}".

Missions:
1. Identifie l'intention parmi: VENTE, ACHAT, DETTE, SCORE, FUNDING, INSIGHT.
2. Si un montant est précisé (en chiffres), extrais-le. Sinon, retourne null.

Règles:
- VENTE: l'utilisateur a vendu un produit ou service, a reçu de l'argent de son activité.
- ACHAT: l'utilisateur a acheté une marchandise, a dépensé pour son activité.
- DETTE: un client lui doit de l'argent, ou il doit de l'argent.
- SCORE: l'utilisateur veut connaitre son score ou bilan financier.
- FUNDING: l'utilisateur veut savoir s'il peut avoir un crédit.
- INSIGHT: l'utilisateur veut un conseil.

Retourne UNIQUEMENT un objet JSON (sans retour à la ligne et sans markdown) au format stict:
{"intent": "INTENT", "amount": 1000}
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0,
            }
        });

        const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Error:", error);
        return { intent: "UNKNOWN", amount: null };
    }
};

const generateResponseTemplate = async (context, resultsData) => {
    const prompt = `
Tu es un assistant financier par WhatsApp pour une commerçante Béninoise.
Sois, court, bienveillant, et direct (pas de texte rallonge). 

Contexte de l'action: ${context}
Données à intégrer: ${JSON.stringify(resultsData)}

Rédige une courte réponse WhatsApp adaptée. Utilise des emojis simples.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        });
        return response.text.trim();
    } catch (error) {
        return "C'est noté !";
    }
};

module.exports = {
    processMessageIntent,
    generateResponseTemplate
};
