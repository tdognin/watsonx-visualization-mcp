# Guide de Synchronisation GitHub

Ce guide vous explique comment synchroniser le projet watsonx-visualization-mcp sur GitHub.

## Prérequis

1. **Compte GitHub** : Assurez-vous d'avoir un compte sur [github.com](https://github.com)
2. **Git installé** : Vérifiez avec `git --version`
3. **Authentification GitHub** : Token d'accès personnel ou SSH configuré

## Étape 1 : Initialiser le Dépôt Git Local

```bash
cd watsonx-visualization-mcp

# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Restructured and optimized project

- Added 35 unit tests (100% passing)
- Complete documentation (API, Integration, Contributing)
- 3 practical examples (sales, projects, networks)
- Support for 40+ chart types
- Updated dependencies (MCP SDK 1.27.1)
- Clean architecture and code standards
- Production-ready"
```

## Étape 2 : Créer le Dépôt sur GitHub

### Option A : Via l'Interface Web GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Remplissez les informations :
   - **Repository name** : `watsonx-visualization-mcp`
   - **Description** : `MCP server for automated data visualization and analysis with IBM watsonx Orchestrate - supports 40+ chart types`
   - **Visibility** : Public ou Private (selon votre choix)
   - **NE PAS** cocher "Initialize with README" (nous en avons déjà un)
3. Cliquez sur "Create repository"

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create watsonx-visualization-mcp --public --source=. --remote=origin --push
```

## Étape 3 : Lier le Dépôt Local à GitHub

Après avoir créé le dépôt sur GitHub, copiez l'URL et exécutez :

```bash
# Ajouter le remote origin (remplacez USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/USERNAME/watsonx-visualization-mcp.git

# Ou avec SSH (si configuré)
git remote add origin git@github.com:USERNAME/watsonx-visualization-mcp.git

# Vérifier le remote
git remote -v
```

## Étape 4 : Pousser le Code sur GitHub

```bash
# Renommer la branche en 'main' si nécessaire
git branch -M main

# Pousser le code
git push -u origin main
```

## Étape 5 : Vérifier la Synchronisation

1. Allez sur `https://github.com/USERNAME/watsonx-visualization-mcp`
2. Vérifiez que tous les fichiers sont présents
3. Le README.md devrait s'afficher automatiquement

## Configuration Recommandée du Dépôt GitHub

### Topics (Tags)

Ajoutez ces topics à votre dépôt pour une meilleure découvrabilité :
- `mcp`
- `model-context-protocol`
- `watsonx`
- `ibm`
- `data-visualization`
- `charts`
- `plotly`
- `carbon-design`
- `typescript`
- `nodejs`

### Description

```
MCP server for automated data visualization and analysis with IBM watsonx Orchestrate - supports 40+ chart types
```

### Website

Si vous déployez une démo : `https://your-demo-url.com`

### Protection de Branche

Pour protéger la branche `main` :

1. Allez dans **Settings** > **Branches**
2. Ajoutez une règle pour `main`
3. Cochez :
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

## Workflow de Développement

### Créer une Nouvelle Fonctionnalité

```bash
# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Faire vos modifications
# ...

# Commiter
git add .
git commit -m "feat: description de la fonctionnalité"

# Pousser la branche
git push -u origin feature/nouvelle-fonctionnalite
```

### Créer une Pull Request

1. Allez sur GitHub
2. Cliquez sur "Compare & pull request"
3. Remplissez la description
4. Assignez des reviewers si nécessaire
5. Créez la PR

### Mettre à Jour depuis GitHub

```bash
# Récupérer les dernières modifications
git pull origin main
```

## GitHub Actions (CI/CD)

Créez `.github/workflows/test.yml` pour automatiser les tests :

```yaml
name: Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
```

## Publier sur npm (Optionnel)

Si vous souhaitez publier le package sur npm :

```bash
# Se connecter à npm
npm login

# Publier
npm publish --access public
```

## Commandes Git Utiles

```bash
# Voir l'état
git status

# Voir l'historique
git log --oneline

# Voir les différences
git diff

# Annuler les modifications non commitées
git restore .

# Voir les branches
git branch -a

# Changer de branche
git checkout nom-branche

# Supprimer une branche locale
git branch -d nom-branche

# Supprimer une branche distante
git push origin --delete nom-branche
```

## Résolution de Problèmes

### Erreur : "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/watsonx-visualization-mcp.git
```

### Erreur : "failed to push some refs"

```bash
# Récupérer d'abord les modifications distantes
git pull origin main --rebase
git push origin main
```

### Erreur d'authentification

Si vous utilisez HTTPS et avez des problèmes d'authentification :

1. Créez un Personal Access Token sur GitHub
2. Utilisez-le comme mot de passe lors du push

Ou configurez SSH :

```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "votre.email@example.com"

# Ajouter la clé à ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copier la clé publique
cat ~/.ssh/id_ed25519.pub

# Ajouter la clé sur GitHub : Settings > SSH and GPG keys > New SSH key
```

## Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [GitHub CLI](https://cli.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Support

Pour toute question :
- Ouvrez une issue sur GitHub
- Consultez la documentation du projet
- Contactez les mainteneurs

---

**Prêt à synchroniser !** Suivez les étapes ci-dessus pour mettre votre projet sur GitHub. 🚀