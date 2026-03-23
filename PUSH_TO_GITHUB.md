# 🚀 Guide Rapide : Pousser sur GitHub

## ✅ Configuration Actuelle

- ✅ Git initialisé
- ✅ Commit initial créé (30 fichiers)
- ✅ Remote HTTPS configuré : `https://github.com/tdognin/watsonx-visualization-mcp.git`

## 📋 Étapes à Suivre

### Étape 1 : Créer le Dépôt sur GitHub

1. Allez sur **https://github.com/new**
2. Remplissez :
   - **Repository name** : `watsonx-visualization-mcp`
   - **Description** : `MCP server for automated data visualization and analysis with IBM watsonx Orchestrate - supports 40+ chart types`
   - **Visibility** : Public (ou Private selon votre choix)
   - ⚠️ **NE PAS** cocher "Add a README file"
   - ⚠️ **NE PAS** cocher "Add .gitignore"
   - ⚠️ **NE PAS** cocher "Choose a license"
3. Cliquez sur **"Create repository"**

### Étape 2 : Créer un Personal Access Token (PAT)

Vous avez besoin d'un token pour vous authentifier avec HTTPS.

1. Allez sur **https://github.com/settings/tokens**
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Remplissez :
   - **Note** : `watsonx-visualization-mcp`
   - **Expiration** : 90 days (ou selon votre préférence)
   - **Scopes** : Cochez **`repo`** (accès complet aux dépôts)
4. Cliquez sur **"Generate token"**
5. **⚠️ IMPORTANT** : Copiez le token immédiatement (vous ne pourrez plus le voir après)

### Étape 3 : Pousser le Code

```bash
cd watsonx-visualization-mcp

# Pousser le code
git push -u origin main
```

Quand on vous demande vos identifiants :
- **Username** : `tdognin`
- **Password** : Collez votre **Personal Access Token** (pas votre mot de passe GitHub)

### Étape 4 : Vérifier

Allez sur **https://github.com/tdognin/watsonx-visualization-mcp** et vérifiez que tous les fichiers sont présents.

## 🔐 Sauvegarder le Token (Optionnel)

Pour ne pas avoir à entrer le token à chaque fois :

### macOS / Linux

```bash
# Configurer Git pour utiliser le credential helper
git config --global credential.helper osxkeychain  # macOS
# ou
git config --global credential.helper store        # Linux

# Lors du prochain push, Git sauvegardera le token
```

### Windows

```bash
git config --global credential.helper wincred
```

## 🆘 En Cas de Problème

### Erreur : "repository not found"

Le dépôt n'existe pas encore sur GitHub. Créez-le d'abord (Étape 1).

### Erreur : "authentication failed"

Le token est incorrect ou n'a pas les bonnes permissions. Créez un nouveau token avec le scope `repo`.

### Erreur : "remote contains work that you do not have"

Le dépôt GitHub n'est pas vide. Assurez-vous de ne pas avoir initialisé avec README/LICENSE.

Si le dépôt existe déjà avec du contenu :
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## ✅ Après le Push

Une fois le code poussé, configurez votre dépôt :

### Ajouter des Topics

1. Sur la page du dépôt, cliquez sur l'icône ⚙️ à côté de "About"
2. Ajoutez ces topics :
   ```
   mcp
   model-context-protocol
   watsonx
   ibm
   data-visualization
   charts
   plotly
   carbon-design
   nodejs
   ```

### Activer GitHub Pages (Optionnel)

Pour héberger la documentation :
1. **Settings** → **Pages**
2. Source : Deploy from a branch
3. Branch : `main` / `docs`

### Configurer les Issues

1. **Settings** → **Features**
2. Cochez **Issues**
3. Créez des labels : `bug`, `enhancement`, `documentation`, `good first issue`

## 📝 Commandes Git Utiles

```bash
# Voir l'état
git status

# Voir l'historique
git log --oneline

# Ajouter des modifications
git add .
git commit -m "feat: description"
git push

# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Mettre à jour depuis GitHub
git pull origin main
```

## 🎉 C'est Tout !

Votre projet sera maintenant sur GitHub et accessible à :
**https://github.com/tdognin/watsonx-visualization-mcp**

---

**Besoin d'aide ?** Consultez le [GITHUB_SYNC_GUIDE.md](GITHUB_SYNC_GUIDE.md) pour plus de détails.