#!/bin/bash

# Script de nettoyage du projet watsonx-visualization-mcp
# Supprime tous les fichiers de documentation obsolètes et redondants

echo "🧹 Nettoyage du projet watsonx-visualization-mcp..."

# Fichiers de documentation obsolètes à supprimer
OBSOLETE_FILES=(
    "AJOUTER_TOOLS_AGENT.md"
    "COMMANDES_COMPLETES.md"
    "COMMANDES_INTERFACE_WEB.md"
    "CONFIGURATION_TOOLS_AGENT.md"
    "CORRECTION_CONFIGURATION.md"
    "CREER_CONNEXION_MCP_GUIDE.md"
    "DECLARATION_MCP_ETAPE_PAR_ETAPE.md"
    "DEMARRAGE_RAPIDE_INTERFACE_WEB.md"
    "DEMARRAGE_RAPIDE.md"
    "DEPLOIEMENT_HTTP_INTERFACE_WEB.md"
    "DEPLOIEMENT_ORCHESTRATE_README.md"
    "DEPLOIEMENT_PYTHON_MCP_COMPLET.md"
    "DEPLOIEMENT_REUSSI.md"
    "DEPLOYMENT_GUIDE.md"
    "DEPLOYMENT_WEB_SERVER.md"
    "DIAGNOSTIC_FINAL.md"
    "EXEMPLES_UTILISATION.md"
    "FINAL_SETUP_INSTRUCTIONS.md"
    "FIX_2FA_AND_PUBLISH.md"
    "GUIDE_AJOUT_MCP_INTERFACE_WEB.md"
    "GUIDE_DEPLOIEMENT_ORCHESTRATE.md"
    "GUIDE_FINAL_CREATION_CONNEXION.md"
    "INSTRUCTIONS_DEPLOIEMENT_FINAL.md"
    "MISE_A_JOUR_CONNEXION_ORCHESTRATE.md"
    "OU_TROUVER_LES_LOGS.md"
    "PARAMETRES_FINAUX_INTERFACE_WEB.md"
    "PARAMETRES_MCP_AGENT.md"
    "PARAMETRES_MCP_PYTHON.md"
    "PUBLISH_NOW.md"
    "PUBLISH_NPM_GUIDE.md"
    "QUICK_PUBLISH.md"
    "QUICK_START.md"
    "RESUME_DEPLOIEMENT.md"
    "SETUP_COMPLETE.md"
    "SOLUTION_ERREUR_INTERFACE_WEB.md"
    "SOLUTION_FINALE_MCP.md"
    "VALEURS_FORMULAIRE_MCP.txt"
    "WATSONX_WEB_CONFIG.md"
    "WEB_DEPLOYMENT_GUIDE.md"
)

# Scripts obsolètes à supprimer
OBSOLETE_SCRIPTS=(
    "deploy-orchestrate.sh"
    "diagnostic-orchestrate.sh"
    "mcp-server-http-simple.js"
    "mcp-server-http.js"
    "mcp_server_http.py"
    "mcp_server.py"
    "publish-secure.sh"
    "publish.sh"
    "start-http-server.sh"
    "start-mcp-server.sh"
    "test-http-server.sh"
    "test-mcp-server.sh"
    "test-sse-connection.sh"
    "verifier-tools.sh"
)

# Fichiers de configuration obsolètes
OBSOLETE_CONFIGS=(
    "exported.yaml"
    "mcp-server.log"
    "requirements-http.txt"
    "config/agent-config.json"
    "config/mcp-connection.json"
    "config/mcp-connection.json.bak"
    "config/visualization-agent.yaml"
    "config/watsonx-connection-configured.yaml"
    "config/watsonx-connection-local.yaml"
    "config/watsonx-connection-python.yaml"
    "config/watsonx-connection.yaml"
)

# Supprimer les fichiers obsolètes
for file in "${OBSOLETE_FILES[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "✓ Supprimé: $file"
    fi
done

for script in "${OBSOLETE_SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        rm "$script"
        echo "✓ Supprimé: $script"
    fi
done

for config in "${OBSOLETE_CONFIGS[@]}"; do
    if [ -f "$config" ]; then
        rm "$config"
        echo "✓ Supprimé: $config"
    fi
done

# Supprimer le dossier scripts obsolète
if [ -d "scripts" ]; then
    rm -rf "scripts"
    echo "✓ Supprimé: dossier scripts/"
fi

# Nettoyer le dossier output
if [ -d "output" ]; then
    rm -rf "output"
    mkdir -p "output"
    echo "✓ Nettoyé: dossier output/"
fi

echo ""
echo "✅ Nettoyage terminé!"
echo "📁 Structure du projet optimisée"

# Made with Bob
