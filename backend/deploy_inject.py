#!/usr/bin/env python3
"""Inject process-products.js into the n8n workflow JSON."""
import json, sys

if len(sys.argv) != 4:
    print("Usage: deploy_inject.py <workflow.json> <code.js> <output.json>")
    sys.exit(1)

wf_path, js_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

with open(js_path, 'r', encoding='utf-8') as f:
    js_code = f.read()

with open(wf_path, 'r', encoding='utf-8') as f:
    workflow = json.load(f)

found = False
for node in workflow['nodes']:
    if node['name'] == 'Process Products':
        old_len = len(node['parameters'].get('jsCode', ''))
        node['parameters']['jsCode'] = js_code
        found = True
        print(f"      Replaced {old_len:,} chars -> {len(js_code):,} chars")
        break

if not found:
    print('ERROR: Node "Process Products" not found')
    sys.exit(1)

ALLOWED_KEYS = {'name', 'nodes', 'connections', 'settings', 'staticData'}
clean = {k: v for k, v in workflow.items() if k in ALLOWED_KEYS}

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(clean, f)
