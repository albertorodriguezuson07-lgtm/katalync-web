#!/bin/bash
# deploy.sh — Deploy process-products.js to n8n workflow
# Usage: ./backend/deploy.sh
#
# What it does:
#   1. Downloads the current workflow from n8n
#   2. Saves a timestamped backup
#   3. Injects process-products.js into the "Process Products" node
#   4. Uploads the updated workflow
#   5. Activates it

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
JS_FILE="$SCRIPT_DIR/process-products.js"
WORKFLOW_ID="4R88x26cesnzRqMD"
N8N_HOST="https://api.katalync.com"
N8N_API_KEY="${N8N_API_KEY:?ERROR: N8N_API_KEY not set. Run: source backend/.env}"

if [ ! -f "$JS_FILE" ]; then
  echo "ERROR: $JS_FILE not found"
  exit 1
fi

echo "=== Katalync Backend Deploy ==="
echo "Source: process-products.js ($(wc -l < "$JS_FILE" | tr -d ' ') lines)"
echo ""

# Step 1: Download current workflow
echo "[1/5] Downloading current workflow..."
curl -sf \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "$N8N_HOST/api/v1/workflows/$WORKFLOW_ID" \
  -o /tmp/_deploy_wf_current.json
echo "      OK ($(wc -c < /tmp/_deploy_wf_current.json | tr -d ' ') bytes)"

# Step 2: Save backup
BACKUP_DIR="$SCRIPT_DIR/backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp /tmp/_deploy_wf_current.json "$BACKUP_DIR/workflow_$TIMESTAMP.json"
echo "[2/5] Backup saved: backups/workflow_$TIMESTAMP.json"

# Step 3: Inject JS code into workflow
echo "[3/5] Injecting code..."
python3 "$SCRIPT_DIR/deploy_inject.py" \
  /tmp/_deploy_wf_current.json \
  "$JS_FILE" \
  /tmp/_deploy_wf_updated.json
echo "      OK"

# Step 4: Upload
echo "[4/5] Uploading to n8n..."
HTTP_CODE=$(curl -s -o /tmp/_deploy_response.json -w "%{http_code}" \
  -X PUT \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Content-Type: application/json" \
  -d @/tmp/_deploy_wf_updated.json \
  "$N8N_HOST/api/v1/workflows/$WORKFLOW_ID")

if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: Upload failed (HTTP $HTTP_CODE)"
  cat /tmp/_deploy_response.json 2>/dev/null
  echo ""
  rm -f /tmp/_deploy_wf_current.json /tmp/_deploy_wf_updated.json /tmp/_deploy_response.json
  exit 1
fi
echo "      OK (HTTP $HTTP_CODE)"

# Step 5: Verify active
echo "[5/5] Verifying..."
IS_ACTIVE=$(python3 -c "import json; d=json.load(open('/tmp/_deploy_response.json')); print(d.get('active', False))")
if [ "$IS_ACTIVE" = "True" ]; then
  echo "      Workflow is ACTIVE"
else
  echo "      Activating..."
  curl -s -o /dev/null \
    -X POST \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"active": true}' \
    "$N8N_HOST/api/v1/workflows/$WORKFLOW_ID/activate"
  echo "      OK"
fi

# Cleanup temp files
rm -f /tmp/_deploy_wf_current.json /tmp/_deploy_wf_updated.json /tmp/_deploy_response.json

echo ""
echo "=== Deploy Complete ==="
echo "Backup: backups/workflow_$TIMESTAMP.json"
echo "Status: ACTIVE"
