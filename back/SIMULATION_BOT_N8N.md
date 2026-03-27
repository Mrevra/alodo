# Guide Simulation Bot WhatsApp (n8n) pour Germain

Ce guide t'explique comment créer le "cerveau" du bot WhatsApp pour la démo Alɔdó.

## Workflow n8n (Étapes)

### 1. Webhook (Trigger)
- **Node**: Webhook
- **HTTP Method**: POST
- **Path**: `whatsapp-simulation`
- **URL**: C'est l'adresse que tu appelleras pour faire la démo.

### 2. Le "Parseur" (Code Node)
C'est ici qu'on transforme le texte libre en données structurées.
- **Node**: Code
- **Language**: JavaScript
- **Code**:
```javascript
const message = $node["Webhook"].json["body"]["message"]; // ex: "VENTE 5000"
const parts = message.split(" ");
const type = parts[0].toUpperCase(); // VENTE
const montant = parseInt(parts[1]); // 5000

return {
  userId: "user_test_benin_01",
  type: type === "VENTE" ? "INCOME" : "EXPENSE",
  montant: montant,
  description: "Enregistré via WhatsApp Simulation",
  date: new Date().toISOString()
};
```

### 3. Appel au Backend (HTTP Request)
- **Node**: HTTP Request
- **Method**: POST
- **URL**: `https://ton-backend-railway.app/transactions`
- **Body Parameters**: Sélectionner "JSON" et envoyer les données du noeud précédent.

---

## Comment faire le test pendant le Pitch ?

Puisque tu n'utilises pas la vraie API WhatsApp Business (trop chère/longue pour 5 jours), utilise **Postman** ou un petit script Python pour envoyer un message au Webhook n8n :

**Exemple de test (avec `curl`) :**
```bash
curl -X POST https://ton-n8n.app/webhook/whatsapp-simulation \
     -H "Content-Type: application/json" \
     -d '{"message": "VENTE 7500"}'
```

Le jury verra alors la transaction apparaître instantanément sur le Dashboard d'Emmanuel !
```
