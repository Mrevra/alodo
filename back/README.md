# Alodo - WhatsApp Financial Assistant

Ceci est le backend transactionnel et décisionnel pour Alodo, adapté à un usage exclusif via WhatsApp (connecté via n8n). 

Il interprète le langage naturel, enregistre les finances des MPME, calcule les scores de crédit, et génère des réponses actionnables directement via l'API Gemini de Google.

## 🚀 Fonctionnement

Tout passe par un **endpoint unique (Webhook)** :
`POST /webhook`

**Input attendu depuis n8n:**
```json
{
  "phone": "22990000000",
  "message": "j'ai vendu pour 5000 ce matin"
}
```

**Output renvoyé (généré par Gemini) :**
```json
{
  "response": "Super ! J'ai enregistré 5000 FCFA de vente. Votre profit monte. Bon courage ! 🌱"
}
```

---

## 🛠 Variables d'Environnement

Pour fonctionner sur Railway, configurez :
- `DATABASE_URL` : (Injecté automatiquement par Railway Postgres)
- `GEMINI_API_KEY` : Clé secrète depuis Google AI Studio (Nécessaire pour l'intelligence)
- `PORT` : (Optionnel, généré par Railway. Par defaut: 3000)

---

## 🚂 Déploiement Railway (1 clic)

1. Connectez votre dépôt GitHub sur Railway.app.
2. Ajoutez un module PostgreSQL.
3. Renseignez la variable `GEMINI_API_KEY` dans les Settings.
4. Laissez la magie opérer. Prisma s'occupe de la base (`db push`) et Express se lance automatiquement.

---

## 🧪 Tests

Avec cURL ou Postman en mode local ou production :

**1. Vente :**
```bash
curl -X POST https://ton-url-railway/webhook \
-H "Content-Type: application/json" \
-d '{"phone": "22960000000", "message": "j ai vendu des chaussures pour 15000"}'
```

**2. Achat :**
```bash
curl -X POST https://ton-url-railway/webhook \
-H "Content-Type: application/json" \
-d '{"phone": "22960000000", "message": "j ai depensé 5000 en marchandise"}'
```

**3. Score :**
```bash
curl -X POST https://ton-url-railway/webhook \
-H "Content-Type: application/json" \
-d '{"phone": "22960000000", "message": "quel est mon bilan ?"}'
```

**4. Demande de Financement :**
```bash
curl -X POST https://ton-url-railway/webhook \
-H "Content-Type: application/json" \
-d '{"phone": "22960000000", "message": "je veux un crédit pour mon business"}'
```
