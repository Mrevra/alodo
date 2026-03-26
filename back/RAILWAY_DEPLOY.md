# 🚂 Guide de Déploiement Railway

Ce backend a été entièrement optimisé pour fonctionner **directement** et **gratuitement** sur Railway (idéal pour un hackathon).

## 🧰 Variables d'environnement nécessaires sur Railway

Vous devez configurer les variables suivantes dans le panneau Settings de Railway :

- `DATABASE_URL` : (Sera injecté automatiquement si vous ajoutez un module PostgreSQL sur Railway).
- `PORT` : (Généré par Railway, mais vous pouvez forcer à `3000`).
- `NODE_ENV` : Mettez la valeur `production`.
- `JWT_SECRET` : Ajouter une chaîne secrète longue si vous implémentez l'authentification (Ex: `VotR3Sup3rScreT01928`).

---

## 🚀 Étapes de Déploiement

### Étape 1 : Pousser sur GitHub
Railway déploie depuis votre dépôt GitHub. Vous devez d'abord commiter ce dossier :
```bash
git init
git add .
git commit -m "Initial backend complet pour Railway"
git branch -M main
git remote add origin https://github.com/votre-compte/votre-nom-de-repo.git
git push -u origin main
```

### Étape 2 : Connecter à Railway
1. Créez un compte sur [Railway.app](https://railway.app/).
2. Cliquez sur **"New Project"**.
3. Sélectionnez **"Provision PostgreSQL"** (cela créera d'abord la base de données).
4. Cliquez ensuite sur **"New"** (ou le +) -> **"GitHub Repo"** et choisissez votre dépôt contenant ce code.

### Étape 3 : Configuration du projet sur Railway
1. Une fois le code importé, allez sur le composant Web (celui qui a le code source).
2. Vérifiez dans **Variables** que `DATABASE_URL` est bien présente (Railway injecte automatiquement l'URL de votre Postgres s'ils sont dans le même projet).
3. Ajoutez `NODE_ENV = production` dans les variables.

### Étape 4 : Lancement automatique
- Railway détectera automatiquement que c'est une application Node.js (via le fichier `package.json`).
- Il exécutera la commande d'installation et notre script de démarrage `start`.
- Notre script `npm start` se chargera de :
  1. `npx prisma generate` (pour recréer le client avec le bon OS)
  2. `npx prisma db push --accept-data-loss` (pour synchroniser rapidement la DB PostgreSQL hébergée)
  3. `node index.js` (démarrer Express)

### ✅ Étape 5 : Tester l'API
Railway génère une URL publique (Allez dans *Settings > Networking* et cliquez sur *Generate Domain*).
- Vous pouvez vérifier que le backend tourne avec : `GET https://votre-domaine.up.railway.app/health` qui doit retourner `{"status": "ok"}`.
- Testez votre dashboard via : `GET https://votre-domaine.up.railway.app/dashboard?userId=test`
