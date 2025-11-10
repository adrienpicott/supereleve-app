# 🎓 Super Élève - Plateforme d'Apprentissage Gamifiée

Application web moderne pour l'apprentissage des mathématiques avec système de gamification intégré.

## 🚀 DÉPLOIEMENT RAPIDE (30 minutes)

### ÉTAPE 1 : Configuration Supabase (10 min)

1. **Créer un compte Supabase**
   - Allez sur [supabase.com](https://supabase.com)
   - Cliquez sur "Start your project"
   - Créez un compte gratuit

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Nom : `supereleve`
   - Database Password : **NOTEZ-LE** (vous en aurez besoin)
   - Region : `Europe West (Frankfurt)` (ou la plus proche)
   - Cliquez sur "Create new project" (⏱️ ~2 minutes)

3. **Configurer la base de données**
   - Dans le menu latéral, cliquez sur "SQL Editor"
   - Cliquez sur "New query"
   - Copiez TOUT le contenu du fichier `database/init.sql`
   - Collez dans l'éditeur SQL
   - Cliquez sur "Run" (▶️)
   - Vérifiez qu'il y a un message "Success. No rows returned"

4. **Récupérer vos clés API**
   - Dans le menu latéral, cliquez sur "Settings" (⚙️)
   - Cliquez sur "API"
   - **COPIEZ** ces deux valeurs :
     - `Project URL` (ex: https://xxxxx.supabase.co)
     - `anon public` key (longue chaîne de caractères)

### ÉTAPE 2 : Configuration Vercel (10 min)

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up"
   - Connectez-vous avec GitHub (recommandé)

2. **Préparer votre projet**
   - Créez un compte GitHub si vous n'en avez pas
   - Créez un nouveau repository "supereleve-app"
   - Uploadez TOUS les fichiers de ce dossier sur GitHub

3. **Importer le projet sur Vercel**
   - Sur Vercel, cliquez sur "Add New..." > "Project"
   - Sélectionnez votre repository "supereleve-app"
   - Cliquez sur "Import"

4. **Configurer les variables d'environnement**
   - Dans "Environment Variables", ajoutez :
     - Name : `VITE_SUPABASE_URL`
     - Value : Votre Project URL de Supabase
   - Cliquez sur "Add" et ajoutez la deuxième :
     - Name : `VITE_SUPABASE_ANON_KEY`
     - Value : Votre anon public key de Supabase
   - Cliquez sur "Deploy" 🚀

5. **Attendre le déploiement**
   - ⏱️ ~3-5 minutes
   - Vous verrez des confettis 🎉 quand c'est terminé !

### ÉTAPE 3 : Créer un compte de test (5 min)

1. **Accéder à votre application**
   - Cliquez sur le bouton "Visit" sur Vercel
   - Votre app est accessible à l'URL : `https://supereleve-app.vercel.app`

2. **Créer votre premier compte**
   - Cliquez sur "Inscription"
   - Remplissez le formulaire
   - Cliquez sur "Créer mon compte"
   - Vous êtes connecté ! 🎉

3. **OU utiliser le compte de démo**
   - Email : `demo@supereleve.fr`
   - Mot de passe : `demo123`
   - (⚠️ Vous devrez créer ce compte manuellement d'abord)

## 📱 CRÉER DES COMPTES ÉLÈVES

### Via l'interface
1. Demandez à chaque élève d'aller sur votre URL
2. Cliquez sur "Inscription"
3. Remplir les informations

### Via Supabase (pour créer plusieurs comptes)
1. Allez sur Supabase > Authentication > Users
2. Cliquez sur "Add user" > "Create new user"
3. Remplissez email et mot de passe
4. Envoyez les identifiants aux élèves

## 🎮 FONCTIONNALITÉS ACTUELLES

### ✅ Déjà implémenté
- ✅ Authentification élèves (inscription/connexion)
- ✅ Dashboard personnalisé avec progression
- ✅ Système XP et niveaux
- ✅ Système de cristaux (monnaie virtuelle)
- ✅ Quiz interactifs sur 4 chapitres :
  - Suites Numériques
  - Fonctions du 2nd Degré
  - Dérivation
  - Probabilités
- ✅ Sauvegarde automatique des résultats
- ✅ Graphiques de progression
- ✅ Historique des quiz
- ✅ Feedback immédiat avec explications

### 🚧 À venir (Semaines 3-8)
- 🔄 Agent Analyseur de Performance
- 🔄 Agent Créateur de Parcours
- 🔄 Agent Générateur de Questions
- 🔄 Missions quotidiennes automatiques
- 🔄 Rapports hebdomadaires aux parents
- 🔄 Système de badges avancé
- 🔄 Parcours adaptatifs

## 🛠️ DÉVELOPPEMENT LOCAL

### Prérequis
- Node.js 18+ installé
- Un compte Supabase configuré

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/supereleve-app.git
cd supereleve-app

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Éditer .env avec vos clés Supabase
# VITE_SUPABASE_URL=votre_url
# VITE_SUPABASE_ANON_KEY=votre_clé

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build pour production
```bash
npm run build
```

## 📊 STRUCTURE DU PROJET

```
supereleve-app/
├── src/
│   ├── components/          # Composants React
│   │   ├── Login.jsx       # Page de connexion/inscription
│   │   ├── Dashboard.jsx   # Dashboard élève principal
│   │   └── Quiz.jsx        # Interface de quiz
│   ├── lib/                # Utilitaires
│   │   ├── supabase.js     # Client Supabase + fonctions
│   │   └── AuthContext.jsx # Contexte d'authentification
│   ├── App.jsx             # Composant principal
│   └── main.jsx            # Point d'entrée
├── database/
│   └── init.sql            # Script d'initialisation DB
├── package.json            # Dépendances
├── vite.config.js          # Configuration Vite
└── README.md              # Ce fichier
```

## 🔒 SÉCURITÉ

- ✅ Row Level Security (RLS) activé sur Supabase
- ✅ Authentification sécurisée
- ✅ Chaque élève ne voit que ses propres données
- ✅ Variables d'environnement protégées

## 📈 PROCHAINES ÉTAPES

### Semaine 1-2 (FAIT ✅)
- [x] Application de base déployée
- [x] Authentification fonctionnelle
- [x] Quiz de démonstration
- [x] Système de progression

### Semaine 3-4 (PROCHAIN)
- [ ] Intégrer Claude API pour l'Agent Analyseur
- [ ] Dashboard coach/professeur
- [ ] Statistiques avancées par élève
- [ ] Graphiques de progression détaillés

### Semaine 5-6
- [ ] Agent Créateur de Parcours
- [ ] Missions quotidiennes personnalisées
- [ ] Système de notifications
- [ ] Rapports automatiques parents

### Semaine 7-8
- [ ] Agent Générateur de Questions
- [ ] Interface de validation questions
- [ ] Système de badges automatisé
- [ ] Gamification avancée

## 💰 COÛTS

### Phase actuelle (0-30 élèves)
- Vercel : **GRATUIT** ✅
- Supabase : **GRATUIT** (500 MB) ✅
- **Total : 0€/mois**

### Phase croissance (30-100 élèves)
- Vercel : **GRATUIT** (bande passante suffisante)
- Supabase Pro : **25€/mois**
- Claude API : **50-100€/mois**
- **Total : ~75-125€/mois**

## 🆘 DÉPANNAGE

### L'application ne se lance pas
1. Vérifiez que les variables d'environnement sont bien configurées sur Vercel
2. Vérifiez que le script SQL a été exécuté dans Supabase
3. Regardez les logs sur Vercel (onglet "Logs")

### Je ne peux pas me connecter
1. Vérifiez que le compte existe dans Supabase > Authentication
2. Vérifiez que le profil a été créé dans la table `profiles`
3. Essayez de réinitialiser le mot de passe

### Les quiz ne se sauvegardent pas
1. Vérifiez que les tables existent dans Supabase
2. Vérifiez les politiques RLS dans Supabase
3. Regardez la console du navigateur (F12) pour les erreurs

## 📧 SUPPORT

Pour toute question :
- Créez une issue sur GitHub
- Ou contactez : adrien@supereleve.fr

## 🎉 PRÊT À COMMENCER !

Votre application est maintenant déployée et accessible ! Partagez l'URL avec vos élèves :

🔗 **https://supereleve-app.vercel.app**

---

**Créé avec ❤️ pour l'académie Super Élève**

*"Chaque élève peut devenir un super élève !"* 🌟
