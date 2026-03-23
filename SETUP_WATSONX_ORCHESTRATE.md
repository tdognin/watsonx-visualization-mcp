# 🚀 Configuration du Serveur MCP Local dans Watsonx Orchestrate

Guide simplifié pour connecter votre serveur MCP local à IBM Watsonx Orchestrate.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Node.js 18+ installé
- ✅ Le projet watsonx-visualization-mcp installé localement
- ✅ Un compte IBM Watsonx Orchestrate avec accès administrateur
- ✅ Le serveur MCP testé et fonctionnel (`npm test` passe)

## 🎯 Vue d'Ensemble

Il existe **2 méthodes principales** pour connecter le serveur MCP à Watsonx Orchestrate :

1. **Méthode A : Via l'Interface Web Watsonx** (Recommandée - Plus simple)
2. **Méthode B : Via Fichier de Configuration** (Pour utilisateurs avancés)

---

## 📱 Méthode A : Configuration via l'Interface Web Watsonx

### Étape 1 : Préparer le Serveur Local

```bash
# 1. Aller dans le répertoire du projet
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp

# 2. Installer les dépendances (si pas déjà fait)
npm install

# 3. Tester le serveur
npm test

# 4. Noter le chemin complet du serveur
pwd
# Résultat : /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp
```

### Étape 2 : Se Connecter à Watsonx Orchestrate

1. **Ouvrir votre navigateur** et aller sur : https://orchestrate.ibm.com
2. **Se connecter** avec vos identifiants IBM
3. **Accéder aux paramètres** :
   - Cliquer sur votre profil (en haut à droite)
   - Sélectionner **"Settings"** ou **"Paramètres"**

### Étape 3 : Ajouter une Connexion MCP

1. **Dans le menu Settings**, chercher :
   - **"Connections"** ou **"Connexions"**
   - Ou **"Integrations"** ou **"Intégrations"**
   - Ou **"Skills"** ou **"Compétences"**

2. **Cliquer sur "Add Connection"** ou **"Ajouter une connexion"**

3. **Sélectionner le type** :
   - Chercher **"MCP Server"** ou **"Model Context Protocol"**
   - Ou **"Custom Integration"** si MCP n'est pas listé

### Étape 4 : Remplir le Formulaire de Configuration

Remplissez les champs suivants :

#### Informations de Base

| Champ | Valeur |
|-------|--------|
| **Name** / **Nom** | `watsonx-visualization` |
| **Description** | `MCP Server for data visualization and analysis` |
| **Type** | `MCP Server` ou `STDIO` |

#### Configuration de Connexion

| Champ | Valeur |
|-------|--------|
| **Command** / **Commande** | `node` |
| **Arguments** / **Args** | `/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js` |
| **Working Directory** | `/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp` |
| **Environment Variables** | (laisser vide) |

#### Exemple de Configuration Complète

```
Name: watsonx-visualization
Type: MCP Server (STDIO)
Command: node
Arguments: /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js
Working Directory: /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp
Environment: {}
```

### Étape 5 : Tester la Connexion

1. **Cliquer sur "Test Connection"** ou **"Tester la connexion"**
2. **Vérifier le statut** :
   - ✅ **Success** : La connexion fonctionne !
   - ❌ **Failed** : Voir la section [Dépannage](#-dépannage)

3. **Sauvegarder** la configuration

### Étape 6 : Activer les Outils MCP

1. **Aller dans "Skills"** ou **"Compétences"**
2. **Chercher** `watsonx-visualization`
3. **Activer les 4 outils** :
   - ✅ `generate_visualization`
   - ✅ `analyze_data`
   - ✅ `suggest_chart_type`
   - ✅ `batch_visualize`

### Étape 7 : Créer un Agent de Test

1. **Créer un nouvel agent** :
   - Aller dans **"Agents"** ou **"Assistants"**
   - Cliquer sur **"Create Agent"** ou **"Créer un agent"**

2. **Configurer l'agent** :
   - **Name** : `Visualization Assistant`
   - **Description** : `Agent for data visualization`
   - **Skills** : Sélectionner `watsonx-visualization`

3. **Tester l'agent** :
   ```
   Prompt: "Analyze this data and create a visualization: 
   [{"month": "Jan", "sales": 1200}, {"month": "Feb", "sales": 1500}]"
   ```

---

## 📝 Méthode B : Configuration via Fichier YAML

Si Watsonx Orchestrate utilise des fichiers de configuration YAML :

### Étape 1 : Créer le Fichier de Configuration

Créez un fichier `watsonx-mcp-connection.yaml` :

```yaml
# watsonx-mcp-connection.yaml
apiVersion: orchestrate.ibm.com/v1
kind: MCPConnection
metadata:
  name: watsonx-visualization
  namespace: default
spec:
  displayName: "Watsonx Visualization MCP"
  description: "MCP Server for automated data visualization and analysis"
  
  # Configuration de connexion
  connection:
    type: stdio
    command: node
    args:
      - /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js
    workingDirectory: /Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp
    env: {}
  
  # Outils exposés
  tools:
    - name: generate_visualization
      enabled: true
    - name: analyze_data
      enabled: true
    - name: suggest_chart_type
      enabled: true
    - name: batch_visualize
      enabled: true
  
  # Configuration de sécurité
  security:
    allowLocalExecution: true
    timeout: 30000
```

### Étape 2 : Importer dans Watsonx

```bash
# Via CLI Watsonx (si disponible)
watsonx orchestrate import watsonx-mcp-connection.yaml

# Ou via l'interface web
# Settings → Connections → Import → Sélectionner le fichier YAML
```

---

## 🔍 Vérification de la Configuration

### Test 1 : Vérifier que le Serveur Démarre

```bash
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp
npm start
```

Vous devriez voir :
```
MCP Server started on stdio
Listening for requests...
```

### Test 2 : Vérifier les Outils Disponibles

Dans Watsonx Orchestrate :
1. Aller dans **Skills** ou **Compétences**
2. Chercher `watsonx-visualization`
3. Vérifier que les 4 outils sont listés

### Test 3 : Tester avec un Agent

Créer un prompt de test :
```
"Analyze this sales data and create a bar chart:
[
  {"month": "January", "sales": 12500, "profit": 3200},
  {"month": "February", "sales": 13800, "profit": 3500},
  {"month": "March", "sales": 15200, "profit": 4100}
]"
```

---

## 🛠️ Dépannage

### Problème 1 : "Connection Failed" ou "Connexion échouée"

**Causes possibles** :
- Le chemin vers le serveur est incorrect
- Node.js n'est pas dans le PATH
- Les dépendances ne sont pas installées

**Solutions** :
```bash
# Vérifier le chemin
ls -la /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp/src/mcp-server/index.js

# Vérifier Node.js
which node
node --version

# Réinstaller les dépendances
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp
rm -rf node_modules package-lock.json
npm install
```

### Problème 2 : "Tools Not Found" ou "Outils non trouvés"

**Solution** :
```bash
# Vérifier que le serveur expose bien les outils
cd /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp
node src/mcp-server/index.js
# Puis envoyer : {"method": "tools/list"}
```

### Problème 3 : "Permission Denied"

**Solution** :
```bash
# Rendre le fichier exécutable
chmod +x /Users/tdognin/Documents/tdognin/Outil\ BI/watsonx-visualization-mcp/src/mcp-server/index.js
```

### Problème 4 : "Timeout" ou "Délai d'attente dépassé"

**Solution** :
- Augmenter le timeout dans la configuration Watsonx (30000 → 60000 ms)
- Vérifier que le serveur répond rapidement : `npm test`

---

## 📊 Utilisation dans Watsonx Orchestrate

### Exemple 1 : Génération de Visualisation Simple

**Prompt** :
```
"Create a bar chart showing monthly sales:
January: 12500, February: 13800, March: 15200"
```

**Résultat attendu** :
- Graphique en barres généré
- Analyse statistique
- Recommandations

### Exemple 2 : Analyse de Données

**Prompt** :
```
"Analyze this customer data and suggest the best visualization:
[
  {"customer": "A", "age": 25, "spending": 1200},
  {"customer": "B", "age": 35, "spending": 2500},
  {"customer": "C", "age": 45, "spending": 3200}
]"
```

**Résultat attendu** :
- Type de graphique suggéré (scatter plot)
- Statistiques descriptives
- Insights sur les données

### Exemple 3 : Visualisations Multiples

**Prompt** :
```
"Create multiple visualizations for this sales data:
- Bar chart for monthly sales
- Line chart for trends
- Pie chart for category distribution"
```

---

## 🔐 Considérations de Sécurité

### Serveur Local

- ✅ **Avantages** :
  - Données restent sur votre machine
  - Pas de transfert réseau
  - Contrôle total

- ⚠️ **Limitations** :
  - Disponible uniquement quand votre machine est allumée
  - Pas accessible par d'autres utilisateurs

### Recommandations

1. **Ne pas exposer le serveur sur Internet** sans authentification
2. **Utiliser HTTPS** si déployé sur un serveur distant
3. **Limiter les permissions** de l'agent Watsonx
4. **Surveiller les logs** pour détecter les anomalies

---

## 📚 Ressources Supplémentaires

- **Documentation API** : [docs/API.md](docs/API.md)
- **Guide de configuration MCP** : [GUIDE_CONFIGURATION_MCP.md](GUIDE_CONFIGURATION_MCP.md)
- **Guide de démarrage rapide** : [DEMARRAGE_RAPIDE_COMPLET.md](DEMARRAGE_RAPIDE_COMPLET.md)
- **Exemples d'utilisation** : [examples/run-examples.md](examples/run-examples.md)

---

## ✅ Checklist de Configuration

- [ ] Node.js 18+ installé
- [ ] Projet cloné et dépendances installées
- [ ] Tests passent (`npm test`)
- [ ] Serveur démarre (`npm start`)
- [ ] Compte Watsonx Orchestrate actif
- [ ] Connexion MCP créée dans Watsonx
- [ ] Outils MCP activés
- [ ] Agent de test créé
- [ ] Test de visualisation réussi

---

## 🎯 Résumé

**Pour connecter le serveur MCP local à Watsonx Orchestrate** :

1. **Préparer** : Installer et tester le serveur localement
2. **Configurer** : Ajouter la connexion dans Watsonx (via UI ou YAML)
3. **Activer** : Activer les 4 outils MCP
4. **Tester** : Créer un agent et tester avec des données
5. **Utiliser** : Intégrer dans vos workflows Watsonx

**Chemin du serveur** : `/Users/tdognin/Documents/tdognin/Outil BI/watsonx-visualization-mcp/src/mcp-server/index.js`

---

**Besoin d'aide ?** Consultez la documentation complète ou ouvrez une issue sur GitHub.