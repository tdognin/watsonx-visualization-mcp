# 🚀 Guide de Démarrage Rapide Complet

Ce guide vous accompagne pas à pas pour installer, configurer et utiliser le serveur MCP de visualisation watsonx.

## 📋 Prérequis

- **Node.js** version 18 ou supérieure
- **npm** (inclus avec Node.js)
- **Git** (pour cloner le projet)

### Vérifier les prérequis

```bash
node --version    # Doit afficher v18.0.0 ou supérieur
npm --version     # Doit afficher une version
git --version     # Doit afficher une version
```

## 📥 Étape 1 : Installation du Projet

### Option A : Cloner depuis GitHub (Recommandé)

```bash
# Cloner le repository
git clone https://github.com/tdognin/watsonx-visualization-mcp.git

# Aller dans le répertoire
cd watsonx-visualization-mcp

# Installer les dépendances
npm install
```

### Option B : Si vous avez déjà le projet

```bash
# Aller dans le répertoire du projet
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp

# Installer les dépendances
npm install
```

## ✅ Étape 2 : Vérifier l'Installation

```bash
# Lancer les tests
npm test
```

Vous devriez voir :
```
✓ tests 35
✓ pass 35
✓ fail 0
```

## 🔧 Étape 3 : Configuration MCP (IMPORTANT)

### Comprendre la Configuration

Le serveur MCP doit être configuré dans un **fichier système**, pas dans le projet lui-même.

### Créer le Fichier de Configuration

#### Sur macOS/Linux :

```bash
# 1. Créer le répertoire de configuration
mkdir -p ~/.config/mcp

# 2. Créer le fichier settings.json
cat > ~/.config/mcp/settings.json << 'EOF'
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": [
        "/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js"
      ],
      "env": {}
    }
  }
}
EOF

# 3. Vérifier que le fichier a été créé
cat ~/.config/mcp/settings.json
```

#### Sur Windows (PowerShell) :

```powershell
# 1. Créer le répertoire de configuration
New-Item -ItemType Directory -Force -Path "$env:APPDATA\mcp"

# 2. Créer le fichier settings.json
@"
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": [
        "C:\\Users\\VOTRE_NOM\\Documents\\watsonx-visualization-mcp\\src\\mcp-server\\index.js"
      ],
      "env": {}
    }
  }
}
"@ | Out-File -FilePath "$env:APPDATA\mcp\settings.json" -Encoding UTF8

# 3. Vérifier que le fichier a été créé
Get-Content "$env:APPDATA\mcp\settings.json"
```

**⚠️ IMPORTANT** : Remplacez le chemin par le chemin réel de votre projet !

### Trouver le Chemin de Votre Projet

```bash
# Aller dans le répertoire du projet
cd watsonx-visualization-mcp

# Afficher le chemin complet
pwd
```

Copiez ce chemin et utilisez-le dans le fichier `settings.json`.

## 🎯 Étape 4 : Tester le Serveur MCP

```bash
# Aller dans le répertoire du projet
cd watsonx-visualization-mcp

# Démarrer le serveur
npm start
```

Vous devriez voir :
```
MCP Server started on stdio
Listening for requests...
```

**Pour arrêter le serveur** : Appuyez sur `Ctrl+C`

## 📊 Étape 5 : Utiliser le Serveur

### Option A : Avec Claude Desktop

1. **Installer Claude Desktop** depuis https://claude.ai/download
2. **Le serveur sera automatiquement détecté** via le fichier `~/.config/mcp/settings.json`
3. **Utiliser les outils** dans vos conversations avec Claude

### Option B : Avec Watsonx Orchestrate

Suivez le guide détaillé : [docs/WATSONX_INTEGRATION.md](docs/WATSONX_INTEGRATION.md)

### Option C : Tests Manuels

Utilisez les exemples fournis :

```bash
# Voir les exemples disponibles
ls examples/

# Lire le guide d'utilisation
cat examples/run-examples.md
```

## 🧪 Étape 6 : Exemples d'Utilisation

### Exemple 1 : Analyse de Données Simple

Créez un fichier `test-data.json` :

```json
[
  {"month": "Jan", "sales": 1200},
  {"month": "Feb", "sales": 1500},
  {"month": "Mar", "sales": 1800}
]
```

Utilisez le serveur MCP pour analyser ces données (via Claude Desktop ou Watsonx).

### Exemple 2 : Utiliser les Données d'Exemple

```bash
# Les données d'exemple sont dans le dossier examples/
cat examples/sales-analysis.json
cat examples/project-timeline.json
cat examples/network-connections.json
```

## 📚 Documentation Complète

### Guides Disponibles

1. **[README.md](README.md)** - Vue d'ensemble et référence complète
2. **[GUIDE_CONFIGURATION_MCP.md](GUIDE_CONFIGURATION_MCP.md)** - Configuration détaillée du MCP
3. **[docs/API.md](docs/API.md)** - Référence API complète
4. **[docs/WATSONX_INTEGRATION.md](docs/WATSONX_INTEGRATION.md)** - Intégration avec Watsonx
5. **[examples/run-examples.md](examples/run-examples.md)** - Guide d'utilisation des exemples
6. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guide de contribution

### Outils MCP Disponibles

Le serveur expose 4 outils :

1. **`generate_visualization`** - Génère une visualisation avec analyse
2. **`analyze_data`** - Analyse les données sans visualisation
3. **`suggest_chart_type`** - Suggère le meilleur type de graphique
4. **`batch_visualize`** - Génère plusieurs visualisations

Voir [docs/API.md](docs/API.md) pour les détails.

## 🔍 Dépannage

### Problème : "Cannot find module"

```bash
# Solution : Réinstaller les dépendances
cd watsonx-visualization-mcp
rm -rf node_modules package-lock.json
npm install
```

### Problème : "Command not found: node"

```bash
# Solution : Installer Node.js
# Télécharger depuis https://nodejs.org/
# Ou utiliser nvm (Node Version Manager)
```

### Problème : Le serveur ne démarre pas

```bash
# Vérifier les logs
cd watsonx-visualization-mcp
npm start 2>&1 | tee server.log
cat server.log
```

### Problème : Configuration MCP non trouvée

```bash
# Vérifier que le fichier existe
ls -la ~/.config/mcp/settings.json

# Vérifier le contenu
cat ~/.config/mcp/settings.json

# Vérifier le chemin dans le fichier
# Il doit pointer vers le bon emplacement du projet
```

## 📞 Support

### Ressources

- **GitHub Issues** : https://github.com/tdognin/watsonx-visualization-mcp/issues
- **Documentation** : Voir le dossier `docs/`
- **Exemples** : Voir le dossier `examples/`

### Checklist de Vérification

- [ ] Node.js v18+ installé
- [ ] Projet cloné ou téléchargé
- [ ] Dépendances installées (`npm install`)
- [ ] Tests passent (`npm test`)
- [ ] Fichier `~/.config/mcp/settings.json` créé
- [ ] Chemin correct dans `settings.json`
- [ ] Serveur démarre (`npm start`)

## 🎉 Prochaines Étapes

Une fois le serveur configuré et fonctionnel :

1. **Explorez les exemples** dans `examples/`
2. **Lisez la documentation API** dans `docs/API.md`
3. **Intégrez avec Watsonx** en suivant `docs/WATSONX_INTEGRATION.md`
4. **Contribuez au projet** en suivant `CONTRIBUTING.md`

## 📝 Résumé des Commandes

```bash
# Installation
git clone https://github.com/tdognin/watsonx-visualization-mcp.git
cd watsonx-visualization-mcp
npm install

# Tests
npm test

# Démarrage
npm start

# Configuration (une seule fois)
mkdir -p ~/.config/mcp
# Puis créer le fichier settings.json avec le bon chemin
```

---

**Félicitations !** Vous êtes maintenant prêt à utiliser le serveur MCP de visualisation watsonx ! 🚀

Pour toute question, consultez la documentation ou ouvrez une issue sur GitHub.