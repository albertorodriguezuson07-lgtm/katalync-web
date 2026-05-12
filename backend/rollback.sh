#!/bin/bash
# rollback.sh — Restore a previous version from backup
# Usage: ./backend/rollback.sh                  (uses latest backup)
#        ./backend/rollback.sh <backup_file>    (uses specific backup)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/backups"
WORKFLOW_ID="4R88x26cesnzRqMD"
N8N_HOST="https://api.katalync.com"
N8N_API_KEY="${N8N_API_KEY:?ERROR: N8N_API_KEY not set. Run: source backend/.env}"

if [ -n "$1" ]; then
  BACKUP_FILE="$1"
else
  BACKUP_FILE=$(ls -t "$BACKUP_DIR"/workflow_*.json 2>/dev/null | head -2 | tail -1)
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "ERROR: No backup file found"
  echo "Available backups:"
  ls -lt "$BACKUP_DIR"/workflow_*.json 2>/dev/null | head -10
  exit 1
fi

echo "=== Katalync Rollback ==="
echo "Restoring: $(basename "$BACKUP_FILE")"
echo ""

# Extract only the allowed keys from the backup
python3 -c "
import json
with open('$BACKUP_FILE') as f:
    w = json.load(f)
clean = {k: v for k, v in w.items() if k in {'name','nodes','connections','settings','staticData'}}
with open('/tmp/_rollback_wf.json', 'w') as f:
    json.dump(clean, f)
# Find the code length
for n in w['nodes']:
    if n['name'] == 'Process Products':
        print(f'Code version: {len(n[\"parameters\"][\"jsCode\"]):,} chars')
        break
"

echo "[1/2] Uploading backup..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X PUT \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Content-Type: application/json" \
  -d @/tmp/_rollback_wf.json \
  "$N8N_HOST/api/v1/workflows/$WORKFLOW_ID")

if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: Rollback failed (HTTP $HTTP_CODE)"
  rm -f /tmp/_rollback_wf.json
  exit 1
fi
echo "      OK (HTTP $HTTP_CODE)"

echo "[2/2] Activating..."
curl -s -o /dev/null \
  -X POST \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"active": true}' \
  "$N8N_HOST/api/v1/workflows/$WORKFLOW_ID/activate"
echo "      OK"

rm -f /tmp/_rollback_wf.json

echo ""
echo "=== Rollback Complete ==="
echo "Restored: $(basename "$BACKUP_FILE")"
echo "Status: ACTIVE"
