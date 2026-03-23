# 📦 Installation Locale - Guide Complet

## ℹ️ Important

Le package **n'est pas encore publié sur npm**. Vous devez utiliser l'installation locale pour l'instant.

## 🚀 Installation Locale (Méthode Recommandée)

### Étape 1 : Cloner ou Télécharger le Projet

#### Option A : Via Git (Recommandé)

```bash
# Cloner depuis GitHub
git clone https://github.com/tdognin/watsonx-visualization-mcp.git

# Aller dans le répertoire
cd watsonx-visualization-mcp
```

#### Option B : Téléchargement Direct

1. Aller sur https://github.com/tdognin/watsonx-visualization-mcp
2. Cliquer sur "Code" → "Download ZIP"
3. Extraire le fichier ZIP
4. Ouvrir un terminal dans le dossier extrait

### Étape 2 : Installer les Dépendances

```bash
# Installer toutes les dépendances nécessaires
npm install
```

Vous devriez voir :
```
added XXX packages in XXs
```

### Étape 3 : Vérifier l'Installation

```bash
# Lancer les tests
npm test
```

Résultat attendu :
```
✓ tests 35
✓ pass 35
✓ fail 0
```

### Étape 4 : Tester le Serveur

```bash
# Démarrer le serveur MCP
npm start
```

Vous devriez voir :
```
MCP Server started on stdio
Listening for requests...
```

**Pour arrêter** : Appuyez sur `Ctrl+C`

## 📍 Localisation du Projet

Après l'installation, notez le chemin complet de votre projet :

```bash
# Afficher le chemin complet
pwd
```

Exemple de résultat :
```
/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp
```

**Conservez ce chemin** - vous en aurez besoin pour la configuration !

## 🔧 Configuration pour Utilisation

### Pour Claude Desktop

Créez ou modifiez `~/.config/mcp/settings.json` :

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": [
        "/VOTRE/CHEMIN/COMPLET/watsonx-visualization-mcp/src/mcp-server/index.js"
      ],
      "env": {}
    }
  }
}
```

**⚠️ Remplacez `/VOTRE/CHEMIN/COMPLET/` par le chemin obtenu avec `pwd`**

### Pour Watsonx Orchestrate

Suivez le guide : [SETUP_WATSONX_ORCHESTRATE.md](SETUP_WATSONX_ORCHESTRATE.md)

Configuration dans l'interface Watsonx :
- **Command** : `node`
- **Arguments** : `/VOTRE/CHEMIN/COMPLET/watsonx-visualization-mcp/src/mcp-server/index.js`
- **Working Directory** : `/VOTRE/CHEMIN/COMPLET/watsonx-visualization-mcp`

## 🔄 Mise à Jour du Projet

Pour obtenir les dernières mises à jour :

```bash
# Aller dans le répertoire du projet
cd watsonx-visualization-mcp

# Récupérer les dernières modifications
git pull origin main

# Réinstaller les dépendances (si nécessaire)
npm install

# Vérifier que tout fonctionne
npm test
```

## ❌ Pourquoi pas npm install -g ?

Le package n'est **pas encore publié sur npm** pour les raisons suivantes :

1. **En cours de développement** - Le projet est en phase de finalisation
2. **Tests en cours** - Validation complète avant publication
3. **Documentation en cours** - Finalisation de tous les guides

### Publication Future sur npm

Une fois publié, vous pourrez installer globalement :

```bash
# Cette commande fonctionnera après publication
npm install -g @tdognin/watsonx-visualization-mcp
```

Pour l'instant, **utilisez l'installation locale** décrite ci-dessus.

## 🛠️ Dépannage

### Problème : "npm install" échoue

**Solution** :
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : "npm test" échoue

**Solution** :
```bash
# Vérifier la version de Node.js
node --version
# Doit être v18.0.0 ou supérieur

# Si version trop ancienne, mettre à jour Node.js
# Télécharger depuis https://nodejs.org/
```

### Problème : "npm start" ne démarre pas

**Solution** :
```bash
# Vérifier les dépendances
npm install

# Vérifier les permissions
chmod +x src/mcp-server/index.js

# Relancer
npm start
```

### Problème : Chemin introuvable dans la configuration

**Solution** :
```bash
# Vérifier que le fichier existe
ls -la src/mcp-server/index.js

# Afficher le chemin complet
cd watsonx-visualization-mcp
pwd
# Copier ce chemin et l'utiliser dans la configuration
```

## 📚 Prochaines Étapes

Après l'installation locale :

1. **Configurer MCP** : Voir [GUIDE_CONFIGURATION_MCP.md](GUIDE_CONFIGURATION_MCP.md)
2. **Configurer Watsonx** : Voir [SETUP_WATSONX_ORCHESTRATE.md](SETUP_WATSONX_ORCHESTRATE.md)
3. **Utiliser les exemples** : Voir [examples/run-examples.md](examples/run-examples.md)
4. **Lire l'API** : Voir [docs/API.md](docs/API.md)

## ✅ Checklist d'Installation

- [ ] Projet cloné ou téléchargé
- [ ] Dépendances installées (`npm install`)
- [ ] Tests passent (`npm test`)
- [ ] Serveur démarre (`npm start`)
- [ ] Chemin complet noté
- [ ] Configuration MCP créée
- [ ] Testé avec Claude Desktop ou Watsonx

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifier les prérequis** : Node.js 18+
2. **Consulter les guides** :
   - [DEMARRAGE_RAPIDE_COMPLET.md](DEMARRAGE_RAPIDE_COMPLET.md)
   - [GUIDE_CONFIGURATION_MCP.md](GUIDE_CONFIGURATION_MCP.md)
3. **Ouvrir une issue** : https://github.com/tdognin/watsonx-visualization-mcp/issues

## 🎯 Résumé

**Installation locale en 4 étapes** :

```bash
# 1. Cloner
git clone https://github.com/tdognin/watsonx-visualization-mcp.git
cd watsonx-visualization-mcp

# 2. Installer
npm install

# 3. Tester
npm test

# 4. Noter le chemin
pwd
```

**Puis configurer** avec le chemin obtenu dans :
- Claude Desktop : `~/.config/mcp/settings.json`
- Watsonx Orchestrate : Interface web

---

**Le package sera publié sur npm prochainement. Pour l'instant, utilisez l'installation locale.** ✅