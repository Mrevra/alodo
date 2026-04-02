# Alodo WhatsApp Assistant (Evolution API Direct Edition)

Ceci est le backend transactionnel et décisionnel pour Alodo. Il est désormais **directement intégré avec Evolution API**, éliminant tout besoin d'utiliser un middleware lourd comme n8n.

Le backend gère tout le flux de A à Z :
1. Réception silencieuse du Webhook d'Evolution API.
2. Protection avancée et parsing des numéros (via les suffixes `@s.whatsapp.net`).
3. Analyse intelligente de l'intention par l'intelligence Google Gemini.
4. Modification sécurisée de la base de données PostgreSQL.
5. Renvoi asynchrone ultra-rapide de la réponse via `axios` sur les routes de votre instance Evolution API.

## 🛠 Variables d'Environnement

Pour fonctionner en production (sur Railway.app par ex), configurez les variables suivantes dans vos Settings :

- `DATABASE_URL` : Injecté automatiquement par Railway Postgres
- `GEMINI_API_KEY` : Clé Google AI Studio
- `EVOLUTION_API_URL` : URL publique de votre serveur Evolution API (ex: `https://votre-domaine.com/`)
- `EVOLUTION_API_KEY` : Clé Globale de votre installation Evolution API
- `PORT` : (Généré par Railway, par defaut 3000)

## 🚂 Déploiement Railway (1 clic)

1. Connectez votre dépôt GitHub.
2. Ajoutez un module PostgreSQL.
3. Renseignez les variables (`GEMINI_API_KEY`, `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`).
4. Prisma s'occupe de la base (`db push`) au déploiement de façon automatique.

## 🔄 Connexion à Evolution API

Dans les paramètres de votre instance Evolution API (via le Manager ou l'API officielle) :
Réglez le chemin de votre Weberhook (Webhook URL) sur :
`https://[VOTRE_DOMAINE_RAILWAY]/webhook`

L'API est prête, sécurisée (sans crash 400), et ne retourne que des statuts de succès HTTP 200 à Evolution pour éviter les retry loops.
