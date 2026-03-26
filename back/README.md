# Alodo Backend API

Ce projet est le backend de la solution Alodo, développée pour le hackathon. Il est conçu pour les MPME au Bénin afin de combler les problèmes de non-tenue de comptabilité, d'accès aux financements, et de formalisation.

## 🧱 Stack Technique
- Node.js & Express.js
- Base de données locale / PostgreSQL
- ORM Prima

## 🚀 Prérequis
- Node.js (v18 ou supérieur) installé sur votre machine.
- Une base de données PostgreSQL ou utiliser la configuration Prisma prête.

## 📦 Instructions de Déploiement Railway (Production)
Ce projet est configuré pour être déployé **gratuitement et en 2 minutes sur Railway**.
👉 **[Voir le Guide de Déploiement sur Railway](RAILWAY_DEPLOY.md)**

## 📦 Instructions d'installation et de lancement (Local)

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   Copiez ou renommez le fichier `.env.example` en `.env`.
   ```bash
   cp .env.example .env
   ```
   Renseignez l'URL de votre base de données PostgreSQL. (Exemple: `postgresql://postgres:password@localhost:5432/alodo_db?schema=public`)

3. **Générer et pousser le schéma Prisma**
   Générez le client Prisma :
   ```bash
   npx prisma generate
   ```
   Créez les tables dans votre base de données (si vide) :
   ```bash
   npx prisma db push
   ```

4. **Lancer le serveur en mode développement**
   ```bash
   npm run dev
   ```
   Le serveur sera accessible sur `http://localhost:3000`.

## 📌 Endpoints Principaux

### 1. Transactions `/transactions` et `/dashboard`
- **POST /transactions** : Créer une transaction.
  Body: `{ "type": "VENTE", "amount": 5000, "description": "Vente de tomates", "userId": "test-user-1" }`
- **GET /transactions?userId=test-user-1** : Liste des transactions de l'utilisateur.
- **GET /dashboard?userId=test-user-1** : Retourne les totaux et le profit.

### 2. Score Financier `/score`
- **GET /score?userId=test-user-1** : Retourne un score sur 100 basé sur la rentabilité et les dettes de la MPME. Accompagné d'un niveau et d'une recommandation.

### 3. Insights `/insights`
- **GET /insights?userId=test-user-1** : Analyse sectorielle simulée pour aider la MPME à s'adapter au marché.

### 4. Matching Financement `/funding-match`
- **GET /funding-match?userId=test-user-1** : Évalue l'éligibilité de la MPME et suggère une institution locale et un montant en fonction du score financier.

### 5. Statut de Formalisation `/formalisation-status`
- **GET /formalisation-status?userId=test-user-1** : Indique si l'entreprise a son IFU et/ou RCCM et recommande les prochaines étapes.

### 6. Traduction Langue Locale `/translate`
- **POST /translate** : Traduit des termes clés vers des langues locales (simulation Fon / Yoruba).
  Body: `{ "texte": "bonjour argent vente", "langchainCible": "fon" }`

---
*Ce backend a été structuré en MVC (Controllers / Services / Routes) garantissant un code propre et facilement maintenable.*
