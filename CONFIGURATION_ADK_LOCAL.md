# 🚀 Configuration pour Watsonx Orchestrate ADK Local

Guide pour configurer le serveur MCP avec Watsonx Orchestrate ADK (Agent Development Kit) installé localement.

## ✅ Prérequis Vérifiés

Vous avez :
- ✅ Watsonx Orchestrate ADK 2.4.0 installé
- ✅ MCP Gateway disponible (Tag: 20260127-develop-75-36c9168)
- ✅ Commande `orchestrate` accessible
- ✅ Serveur MCP fonctionnel localement

## 📋 Configuration pour ADK Local

### Méthode 1 : Via le Script de Lancement (Recommandé)

**Dans l'interface web de l'ADK** (http://localhost:8080 ou le port configuré) :

1. **Aller dans** : Settings → MCP Servers → Add MCP Server

2. **Remplir les champs** :

```
Server name: watsonx-visualization
Description: MCP Server for data visualization
Install command: /Users/tdognin/start-watsonx-mcp.sh
Select Connection: None
```

### Méthode 2 : Configuration Directe

Si la méthode 1 ne fonctionne pas, utilisez :

```
Server name: watsonx-visualization
Install command: /Users/tdognin/.nvm/versions/node/v25.2.0/bin/node
Arguments: /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js
```

### Méthode 3 : Via Fichier de Configuration ADK

Créez ou modifiez le fichier de configuration de l'ADK :

**Localisation** : `~/.orchestrate/mcp-servers.json` ou dans le répertoire de l'ADK

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "/Users/tdognin/.nvm/versions/node/v25.2.0/bin/node",
      "args": [
        "/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js"
      ],
      "env": {},
      "cwd": "/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp"
    }
  }
}
```

## 🔧 Commandes ADK Utiles

### Démarrer l'ADK
```bash
orchestrate start
```

### Arrêter l'ADK
```bash
orchestrate stop
```

### Voir les logs
```bash
orchestrate logs
```

### Redémarrer après configuration
```bash
orchestrate restart
```

## ✅ Vérification

### 1. Vérifier que le serveur MCP démarre
```bash
/Users/tdognin/start-watsonx-mcp.sh
```

Vous devriez voir :
```
Canvas module not available. PNG export will be disabled.
Plotly module not available in Node.js environment. Some chart types will be limited.
watsonx Visualization MCP server running on stdio
```

### 2. Vérifier dans l'interface ADK

1. Aller dans **Skills** ou **Tools**
2. Chercher `watsonx-visualization`
3. Vous devriez voir **4 outils** :
   - generate_visualization
   - analyze_data
   - suggest_chart_type
   - batch_visualize

### 3. Tester avec un Agent

Créer un agent et tester :
```
"Analyze this data and create a bar chart:
[
  {"month": "January", "sales": 12500},
  {"month": "February", "sales": 13800},
  {"month": "March", "sales": 15200}
]"
```

## 🛠️ Dépannage ADK

### Problème : Le serveur ne démarre pas

**Solution 1** : Vérifier les logs ADK
```bash
orchestrate logs mcp-gateway
```

**Solution 2** : Redémarrer l'ADK
```bash
orchestrate restart
```

**Solution 3** : Vérifier le script
```bash
/Users/tdognin/start-watsonx-mcp.sh
```

### Problème : Les outils ne sont pas visibles

**Solution** :
1. Redémarrer l'ADK : `orchestrate restart`
2. Vider le cache du navigateur
3. Recharger l'interface web

### Problème : Erreur de connexion

**Vérifier** :
```bash
# Le serveur MCP fonctionne-t-il ?
/Users/tdognin/start-watsonx-mcp.sh

# L'ADK est-il démarré ?
orchestrate status

# Les ports sont-ils disponibles ?
lsof -i :8080
```

## 📊 Avantages de l'ADK Local

✅ **Accès au système de fichiers local** - Peut accéder à `/Users/tdognin/`
✅ **Pas besoin de déploiement cloud** - Tout fonctionne localement
✅ **Développement rapide** - Modifications instantanées
✅ **Debugging facile** - Logs accessibles localement
✅ **Pas de latence réseau** - Communication locale rapide

## 🎯 Configuration Finale Recommandée

**Pour l'ADK Local, utilisez** :

```
Server name: watsonx-visualization
Description: MCP Server for automated data visualization
Install command: /Users/tdognin/start-watsonx-mcp.sh
Connection: None
Authentication: None (local)
```

**Ou si cela ne fonctionne pas** :

```
Install command: /Users/tdognin/.nvm/versions/node/v25.2.0/bin/node
Arguments: /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js
Working Directory: /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp
```

## 📚 Ressources ADK

- **Documentation ADK** : Consulter la doc officielle IBM
- **Logs ADK** : `orchestrate logs`
- **Status ADK** : `orchestrate status`
- **Configuration** : `~/.orchestrate/`

## 🎉 Prochaines Étapes

1. **Configurer le serveur MCP** dans l'interface ADK
2. **Redémarrer l'ADK** : `orchestrate restart`
3. **Vérifier les outils** dans Skills
4. **Créer un agent de test**
5. **Tester avec des données réelles**

---

**Avec l'ADK local, votre serveur MCP devrait fonctionner parfaitement !** 🚀