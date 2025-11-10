# 🚀 GUIDE DE DÉPLOIEMENT PAS-À-PAS

## 📋 CE DONT TU AS BESOIN

- [ ] Une adresse email
- [ ] 30 minutes de temps
- [ ] Une connexion internet
- [ ] C'est tout ! 🎉

---

## PARTIE 1 : SUPABASE (Base de données) - 10 minutes

### Étape 1.1 : Créer un compte
1. Va sur https://supabase.com
2. Clique sur "Start your project"
3. Inscris-toi avec ton email ou GitHub
4. **✅ Confirme ton email**

### Étape 1.2 : Créer le projet
1. Clique sur "New Project"
2. Remplis :
   - **Organization** : Ton nom ou "Super Élève"
   - **Name** : `supereleve`
   - **Database Password** : Choisis un mot de passe FORT
     ⚠️ **IMPORTANT : NOTE-LE QUELQUE PART !**
   - **Region** : `Europe West (Frankfurt)`
   - **Pricing Plan** : Free (0€)
3. Clique sur "Create new project"
4. ⏱️ **Attends 2-3 minutes** (le projet se crée)

### Étape 1.3 : Créer les tables
1. Dans le menu à gauche, clique sur 🔧 "SQL Editor"
2. Clique sur "+ New query"
3. **Ouvre le fichier `database/init.sql` sur ton ordinateur**
4. **Copie TOUT le contenu** (Ctrl+A puis Ctrl+C)
5. **Colle dans l'éditeur** Supabase (Ctrl+V)
6. Clique sur le bouton ▶️ **"Run"** en bas à droite
7. Tu dois voir : "Success. No rows returned" ✅

### Étape 1.4 : Récupérer tes clés
1. Dans le menu à gauche, clique sur ⚙️ "Settings"
2. Clique sur "API"
3. **COPIE ces 2 valeurs** (tu en auras besoin bientôt) :

```
📋 Project URL : https://xxxxxxxxxxxxx.supabase.co
📋 anon public key : eyJhbGc...très longue chaîne...
```

⚠️ **GARDE CES VALEURS OUVERTES DANS UN NOTEPAD**

---

## PARTIE 2 : GITHUB (Stockage du code) - 5 minutes

### Étape 2.1 : Créer un compte GitHub
1. Va sur https://github.com
2. Clique sur "Sign up"
3. Crée ton compte (email, mot de passe, username)
4. ✅ Vérifie ton email

### Étape 2.2 : Créer un repository
1. Une fois connecté, clique sur le "+" en haut à droite
2. Clique sur "New repository"
3. Remplis :
   - **Repository name** : `supereleve-app`
   - **Description** : "Application Super Élève"
   - Coche **"Public"**
   - Coche **"Add a README file"**
4. Clique sur "Create repository"

### Étape 2.3 : Uploader les fichiers
1. Dans ton repository GitHub, clique sur "Add file" > "Upload files"
2. **Fais glisser TOUS les fichiers** du dossier `supereleve-app` 
   (sauf node_modules si il existe)
3. En bas, écris "Initial commit"
4. Clique sur "Commit changes"

✅ **Ton code est maintenant sur GitHub !**

---

## PARTIE 3 : VERCEL (Hébergement) - 10 minutes

### Étape 3.1 : Créer un compte Vercel
1. Va sur https://vercel.com
2. Clique sur "Sign Up"
3. **Connecte-toi avec ton compte GitHub** (bouton "Continue with GitHub")
4. Autorise Vercel à accéder à GitHub

### Étape 3.2 : Importer le projet
1. Sur le dashboard Vercel, clique sur "Add New..." > "Project"
2. Tu vas voir ton repository `supereleve-app`
3. Clique sur **"Import"** à côté de ce repository

### Étape 3.3 : Configurer les variables d'environnement
⚠️ **ÉTAPE CRUCIALE** - Sans ça, l'app ne marchera pas !

1. Descends jusqu'à la section "Environment Variables"
2. Première variable :
   - **Name** : `VITE_SUPABASE_URL`
   - **Value** : Colle ton Project URL de Supabase
   - Clique sur "Add"
3. Deuxième variable :
   - **Name** : `VITE_SUPABASE_ANON_KEY`
   - **Value** : Colle ta clé anon public de Supabase
   - Clique sur "Add"

### Étape 3.4 : Déployer
1. Clique sur le gros bouton bleu **"Deploy"** 🚀
2. ⏱️ **Attends 3-5 minutes**
3. Tu vas voir une animation de construction
4. Puis des confettis 🎉 : **C'EST EN LIGNE !**

### Étape 3.5 : Accéder à ton app
1. Clique sur le bouton **"Visit"**
2. Ton app s'ouvre dans un nouvel onglet
3. L'URL ressemble à : `https://supereleve-app.vercel.app`

📋 **NOTE TON URL** : _______________________________

---

## PARTIE 4 : TESTER TON APP - 5 minutes

### Étape 4.1 : Créer ton premier compte
1. Va sur ton URL Vercel
2. Clique sur "Inscription"
3. Remplis :
   - Nom complet : "Professeur Test"
   - Email : Ton vrai email
   - Mot de passe : Un mot de passe de ton choix
4. Clique sur "Créer mon compte"

### Étape 4.2 : Explorer le dashboard
✅ Tu devrais voir :
- Ton nom en haut
- Tes statistiques (0 XP, 0 cristaux au début)
- Les 4 chapitres de maths disponibles

### Étape 4.3 : Faire un quiz test
1. Clique sur un chapitre (ex: "Suites Numériques")
2. Réponds aux questions
3. À la fin, vérifie que :
   - Ton score s'affiche
   - Tu gagnes des XP
   - Les résultats sont dans "Activité récente"

### Étape 4.4 : Créer un élève test
1. Ouvre un nouvel onglet en navigation privée
2. Va sur ton URL
3. Clique sur "Inscription"
4. Crée un compte élève : "Élève Test"
5. Connecte-toi avec ce compte

---

## ✅ CHECKLIST DE VÉRIFICATION

Avant de partager avec tes élèves, vérifie que :

- [ ] L'app se charge correctement
- [ ] Tu peux créer un compte
- [ ] Tu peux te connecter
- [ ] Les quiz fonctionnent
- [ ] Les scores se sauvegardent
- [ ] Les XP s'ajoutent correctement
- [ ] Tu peux te déconnecter et te reconnecter

---

## 🎓 PARTAGER AVEC TES ÉLÈVES

### Message type à envoyer :

```
Salut ! 👋

J'ai créé une plateforme d'apprentissage interactive pour nos cours de maths ! 

🔗 Lien : [TON URL VERCEL]

📝 Instructions :
1. Clique sur "Inscription"
2. Crée ton compte avec ton vrai email
3. Commence les quiz pour gagner des XP ! 🎮

Tu peux faire les quiz autant de fois que tu veux pour t'entraîner.

À bientôt ! 🚀
```

---

## 🆘 PROBLÈMES FRÉQUENTS

### "Page blanche" ou erreur au chargement
→ Vérifie que les variables d'environnement sont bien configurées sur Vercel
→ Va sur Vercel > Ton projet > Settings > Environment Variables

### Je ne peux pas me connecter
→ Va sur Supabase > Authentication > Users
→ Vérifie que ton compte existe
→ Essaie de réinitialiser le mot de passe

### Les quiz ne se sauvegardent pas
→ Va sur Supabase > Table Editor
→ Vérifie que les tables `profiles` et `quiz_results` existent
→ Essaie de faire un nouveau quiz

---

## 📞 BESOIN D'AIDE ?

Si tu bloques quelque part, note :
1. À quelle étape tu es bloqué
2. Le message d'erreur exact (fais une capture d'écran)
3. Ce que tu as déjà essayé

Et contacte-moi ! 💪

---

## 🎉 FÉLICITATIONS !

Si tu es arrivé ici et que tout fonctionne, tu viens de :

✅ Créer une base de données cloud
✅ Héberger une application web
✅ Déployer un système d'authentification sécurisé
✅ Mettre en place une plateforme de quiz interactive

C'est énorme ! 🚀🎊

Maintenant, direction les **Semaines 3-8** pour ajouter les agents AI ! 🤖
