# 🔧 Guide de Configuration MCP - Explications Détaillées

## 📍 Où se trouve le fichier de configuration ?

Le fichier de configuration MCP **N'EST PAS** dans le projet `watsonx-visualization-mcp`. C'est un fichier **système** qui se trouve dans votre répertoire personnel.

### Emplacements selon le système d'exploitation

#### macOS / Linux
```bash
~/.config/mcp/settings.json
```
Chemin complet : `/Users/VOTRE_NOM/.config/mcp/settings.json`

#### Windows
```bash
%APPDATA%\mcp\settings.json
```
Chemin complet : `C:\Users\VOTRE_NOM\AppData\Roaming\mcp\settings.json`

## 🚀 Configuration Étape par Étape

### Étape 1 : Créer le répertoire de configuration

Si le répertoire n'existe pas encore, créez-le :

#### macOS / Linux
```bash
mkdir -p ~/.config/mcp
```

#### Windows (PowerShell)
```powershell
New-Item -ItemType Directory -Force -Path "$env:APPDATA\mcp"
```

### Étape 2 : Créer le fichier settings.json

#### macOS / Linux
```bash
# Créer le fichier
touch ~/.config/mcp/settings.json

# Ouvrir avec un éditeur
nano ~/.config/mcp/settings.json
# ou
code ~/.config/mcp/settings.json  # Si vous utilisez VS Code
```

#### Windows (PowerShell)
```powershell
# Créer le fichier
New-Item -ItemType File -Force -Path "$env:APPDATA\mcp\settings.json"

# Ouvrir avec Notepad
notepad "$env:APPDATA\mcp\settings.json"
```

### Étape 3 : Ajouter la configuration

Copiez et collez ce contenu dans le fichier `settings.json` :

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": [
        "/CHEMIN_COMPLET/watsonx-visualization-mcp/src/mcp-server/index.js"
      ],
      "env": {}
    }
  }
}
```

**⚠️ IMPORTANT** : Remplacez `/CHEMIN_COMPLET/` par le chemin réel vers votre projet !

### Étape 4 : Trouver le chemin complet de votre projet

#### macOS / Linux
```bash
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp
pwd
```

Résultat : `/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp`

#### Windows
```powershell
cd "C:\Users\VOTRE_NOM\Documents\watsonx-visualization-mcp"
pwd
```

### Étape 5 : Configuration finale

Voici votre configuration complète avec le bon chemin :

```json
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
```

## 🔍 Vérification de la Configuration

### Vérifier que le fichier existe

#### macOS / Linux
```bash
ls -la ~/.config/mcp/settings.json
cat ~/.config/mcp/settings.json
```

#### Windows
```powershell
Get-Item "$env:APPDATA\mcp\settings.json"
Get-Content "$env:APPDATA\mcp\settings.json"
```

### Vérifier que le serveur MCP fonctionne

```bash
# Aller dans le répertoire du projet
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp

# Tester le serveur
npm start
```

Si tout fonctionne, vous devriez voir :
```
MCP Server started on stdio
Listening for requests...
```

## 📋 Configuration Alternative : Watsonx Orchestrate

Si vous utilisez **IBM Watsonx Orchestrate**, la configuration est différente :

### Via l'Interface Web Watsonx

1. **Connectez-vous à Watsonx Orchestrate**
2. **Allez dans Settings → Connections**
3. **Cliquez sur "Add Connection"**
4. **Sélectionnez "MCP Server"**
5. **Remplissez les champs** :
   - **Name** : `watsonx-visualization`
   - **Command** : `node`
   - **Arguments** : `/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js`
   - **Environment** : (laisser vide)

### Via le fichier de configuration Watsonx

Créez un fichier `watsonx-mcp-config.yaml` dans le projet :

```yaml
connections:
  - name: watsonx-visualization
    type: mcp
    command: node
    args:
      - /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js
    env: {}
```

## 🛠️ Dépannage

### Problème : "Cannot find module"

**Solution** : Vérifiez que les dépendances sont installées :
```bash
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp
npm install
```

### Problème : "Permission denied"

**Solution** : Rendez le fichier exécutable :
```bash
chmod +x /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp/src/mcp-server/index.js
```

### Problème : "Command not found: node"

**Solution** : Vérifiez que Node.js est installé :
```bash
node --version
```

Si Node.js n'est pas installé, installez-le depuis https://nodejs.org/

### Problème : Le serveur ne démarre pas

**Solution** : Vérifiez les logs :
```bash
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp
npm start 2>&1 | tee server.log
```

## 📚 Ressources Supplémentaires

- **Documentation MCP** : https://modelcontextprotocol.io/
- **Guide d'intégration Watsonx** : [docs/WATSONX_INTEGRATION.md](docs/WATSONX_INTEGRATION.md)
- **API Reference** : [docs/API.md](docs/API.md)
- **Exemples d'utilisation** : [examples/run-examples.md](examples/run-examples.md)

## ✅ Checklist de Configuration

- [ ] Répertoire `~/.config/mcp/` créé
- [ ] Fichier `settings.json` créé
- [ ] Chemin complet du projet ajouté dans `settings.json`
- [ ] Dépendances npm installées (`npm install`)
- [ ] Serveur MCP testé (`npm start`)
- [ ] Configuration vérifiée

## 🎯 Résumé

**Le fichier `~/.config/mcp/settings.json` est un fichier de configuration SYSTÈME, pas un fichier du projet.**

- **Emplacement** : Dans votre répertoire personnel (`~/.config/mcp/`)
- **Contenu** : Configuration pointant vers le serveur MCP du projet
- **Chemin du serveur** : `/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js`

Une fois configuré, le serveur MCP sera disponible pour tous les clients MCP (Claude Desktop, Watsonx Orchestrate, etc.).

---

**Besoin d'aide ?** Consultez le [README.md](README.md) ou ouvrez une issue sur GitHub.