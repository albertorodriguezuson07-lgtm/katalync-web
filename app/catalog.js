import { SPRINTER_PRODUCTS_HEADERS, SPRINTER_OFFERS_HEADERS, SPRINTER_INPUT_MAP, MAX_PRODUCTS_PER_REQUEST } from './constants.js';

export default {
  catalogStep: 'upload', catalogMarketplace: 'sprinter_es', catalogRatio: '2:3', catalogGenDesc: true, catalogGenTitle: true, catalogConvertImages: true, catalogRemoveBg: false,
  catalogShipmentOrigin: 'ES', catalogVatPct: 'ES-21%,PT-23%', catalogOfferState: 'Nuevo',
  catalogFile: null, catalogRows: [], catalogCols: [], catalogTotalProducts: 0, catalogLog: [],
  showCatalogErrors: false, healthReport: null, showHealthDetail: false,
  catalogBatchCurrent: 0, catalogBatchTotal: 0, catalogProgress: 0,
  catalogResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', productsUrl: '', productsFilename: '', offersUrl: '', offersFilename: '' },

  handleCatalogDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.catalogFile = file; this.loadCatalogExcel(file); } },
  handleCatalogSelect(event) { const file = event.target.files[0]; if (file) { this.catalogFile = file; this.loadCatalogExcel(file); } },
  async loadCatalogExcel(file) { const rows = await this.parseExcel(file); this.catalogRows = rows; this.catalogCols = rows.length > 0 ? Object.keys(rows[0]) : []; },

  _normalizeRows(rows) {
    const apiCodeValues = new Set(SPRINTER_PRODUCTS_HEADERS[1]);
    return rows.filter(row => {
      const vals = Object.values(row).map(v => String(v).trim());
      const matchCount = vals.filter(v => apiCodeValues.has(v)).length;
      return matchCount < 10;
    }).map(row => {
      const mapped = {};
      for (const [key, val] of Object.entries(row)) {
        const target = SPRINTER_INPUT_MAP[key] || key;
        mapped[target] = val;
      }
      return mapped;
    });
  },

  buildSprinterXlsx(headerRows, dataRows) {
    const displayNames = headerRows[0];
    const apiCodes = headerRows[1];
    const ws = XLSX.utils.aoa_to_sheet([displayNames]);
    for (const row of dataRows) {
      const arr = apiCodes.map(code => row[code] || '');
      XLSX.utils.sheet_add_aoa(ws, [arr], { origin: -1 });
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const xlsxData = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    return xlsxData;
  },

  async startCatalogProcessing() {
    if (!this.catalogFile || this.catalogRows.length === 0) return;
    this.requestNotifPermission();
    this.catalogStep = 'processing'; this.catalogLog = [];
    const normalizedRows = this._normalizeRows(this.catalogRows);
    this.catalogTotalProducts = normalizedRows.length;
    if (normalizedRows.length === 0) { this.addLog(this.catalogLog, 'catalogLogContainer', 'error', this.t('no_valid_products') || 'No valid products found'); return; }
    if (normalizedRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.catalogLog, 'catalogLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', normalizedRows.length)); return; }
    this.addLog(this.catalogLog, 'catalogLogContainer', 'info', normalizedRows.length + ' ' + this.t('log_products_read'));
    this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.t('log_marketplace') + ' ' + this.catalogMarketplace + ' | Ratio: ' + this.catalogRatio);
    const BATCH_SIZE = 50;
    const batches = [];
    for (let i = 0; i < normalizedRows.length; i += BATCH_SIZE) batches.push(normalizedRows.slice(i, i + BATCH_SIZE));
    this.catalogBatchTotal = batches.length;
    this.catalogBatchCurrent = 0;
    this.catalogProgress = 0;
    let allProductRows = [], allOfferRows = [], allPreviews = [], allErrors = [];
    let totalSuccess = 0, totalErrors = 0;
    let csvFilename = '', productsFilename = '', offersFilename = '', lastCsvBase64 = '';
    const N8N_BASE = this._N8N_BASE;
    this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.t('log_sending') + (batches.length > 1 ? (' (' + batches.length + ' lotes)') : ''));
    for (let b = 0; b < batches.length; b++) {
      this.catalogBatchCurrent = b + 1;
      this.catalogProgress = Math.round((b / batches.length) * 100);
      if (batches.length > 1) this.addLog(this.catalogLog, 'catalogLogContainer', 'info', (this.lang === 'pt' ? 'Lote' : 'Lote') + ' ' + (b + 1) + '/' + batches.length + ' (' + batches[b].length + ' productos)...');
      try {
        const resp = await fetch(N8N_BASE + '/webhook/catalog-process', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.catalogMarketplace, ratio: this.catalogRatio, generateDescriptions: this.catalogGenDesc, generateTitles: this.catalogGenTitle, convertImages: this.catalogConvertImages, removeBg: this.catalogRemoveBg, shipmentOrigin: this.catalogShipmentOrigin, vatPct: this.catalogVatPct, offerState: this.catalogOfferState, outputFormat: 'sprinter_mirakl', products: batches[b] }) });
        if (!resp.ok) throw new Error('Server error ' + resp.status);
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || 'Server error');
        if (result.sprinterProductRows) allProductRows.push(...result.sprinterProductRows);
        if (result.sprinterOfferRows) allOfferRows.push(...result.sprinterOfferRows);
        if (result.products) allPreviews.push(...result.products);
        if (result.errorList) allErrors.push(...result.errorList);
        totalSuccess += result.success || 0;
        totalErrors += result.errors || 0;
        if (result.productsFilename) productsFilename = result.productsFilename;
        if (result.offersFilename) offersFilename = result.offersFilename;
        if (result.csvFilename) csvFilename = result.csvFilename;
        if (result.csvBase64) lastCsvBase64 = result.csvBase64;
        if (batches.length > 1) this.addLog(this.catalogLog, 'catalogLogContainer', 'info', '✓ ' + (this.lang === 'pt' ? 'Lote' : 'Lote') + ' ' + (b + 1) + ': ' + (result.success || 0) + ' OK' + (result.errors > 0 ? (', ' + result.errors + ' errores') : ''));
      } catch (err) {
        totalErrors += batches[b].length;
        this.addLog(this.catalogLog, 'catalogLogContainer', 'error', '✗ ' + (this.lang === 'pt' ? 'Lote' : 'Lote') + ' ' + (b + 1) + ': ' + err.message);
      }
    }
    this.catalogProgress = 100;
    this.addLog(this.catalogLog, 'catalogLogContainer', 'info', (this.t('log_completed') || 'Completed') + ': ' + totalSuccess + ' OK, ' + totalErrors + ' errors');
    if (totalErrors > 0) this.addLog(this.catalogLog, 'catalogLogContainer', 'error', totalErrors + ' ' + this.t('log_products_with_errors'));
    const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    let excelUrl = '#'; if (lastCsvBase64) excelUrl = this.makeBlobUrl(lastCsvBase64);
    let productsUrl = '#', productsB64 = '';
    let offersUrl = '#', offersB64 = '';
    if (allProductRows.length > 0) {
      productsB64 = this.buildSprinterXlsx(SPRINTER_PRODUCTS_HEADERS, allProductRows);
      productsUrl = this.makeBlobUrl(productsB64, xlsxMime);
    }
    if (allOfferRows.length > 0) {
      offersB64 = this.buildSprinterXlsx(SPRINTER_OFFERS_HEADERS, allOfferRows);
      offersUrl = this.makeBlobUrl(offersB64, xlsxMime);
    }
    productsFilename = productsFilename || 'productos_sprinter.xlsx';
    offersFilename = offersFilename || 'ofertas_sprinter.xlsx';
    csvFilename = csvFilename || 'catalogo.csv';
    this.catalogResults = { success: totalSuccess, errors: totalErrors, previews: allPreviews, errorList: allErrors, excelUrl, csvFilename, productsUrl, productsFilename, offersUrl, offersFilename };
    this.saveToHistory('catalog', productsFilename, totalSuccess, productsUrl !== '#' ? productsUrl : excelUrl, this.catalogMarketplace);
    this.saveFileToAccount('catalog', productsFilename, totalSuccess, productsB64 || lastCsvBase64, this.catalogMarketplace);
    this.sendBrowserNotif(this.t('notif_catalog_done'), totalSuccess + ' ' + this.t('products_ok'));
    this.createServerNotification(this.t('notif_catalog_done') + ': ' + totalSuccess + ' ' + this.t('products_ok'));
    const combinedResult = { success: totalSuccess, errors: totalErrors, sprinterProductRows: allProductRows, sprinterOfferRows: allOfferRows, products: allPreviews, errorList: allErrors };
    this.healthReport = this.generateHealthReport(combinedResult, normalizedRows);
    try { localStorage.setItem('kt_last_health', JSON.stringify(this.healthReport)); } catch(e) {}
    this.catalogStep = 'results';
  },

  resetCatalog() { this.catalogStep = 'upload'; this.catalogFile = null; this.catalogRows = []; this.catalogCols = []; this.catalogTotalProducts = 0; this.catalogLog = []; this.showCatalogErrors = false; this.healthReport = null; this.showHealthDetail = false; this.catalogBatchCurrent = 0; this.catalogBatchTotal = 0; this.catalogProgress = 0; this.catalogResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', productsUrl: '', productsFilename: '', offersUrl: '', offersFilename: '' }; },

  generateHealthReport(result, inputRows) {
    const total = inputRows.length || 1;
    const checks = [];
    const mandatory = [
      { key: 'sku', label: 'SKU', aliases: ['sku', 'SKU', 'referencia', 'sku-de-vendedor'] },
      { key: 'ean', label: 'EAN', aliases: ['ean', 'EAN', 'ean13', 'product-id'] },
      { key: 'marca', label: 'Marca', aliases: ['marca', 'brand', 'marcas'] },
      { key: 'nombre', label: 'Nombre', aliases: ['nombre', 'name', 'product_name', 'nombre-del-articulo'] },
      { key: 'categoria', label: 'Categoría', aliases: ['categoria', 'category', 'categorias', 'Tipo de producto'] },
      { key: 'genero', label: 'Género', aliases: ['genero', 'gender', 'Sexo'] },
      { key: 'talla', label: 'Talla', aliases: ['talla', 'size'] },
      { key: 'material', label: 'Material', aliases: ['material', 'composicion', 'material-composicion'] },
      { key: 'imagen', label: 'Imagen principal', aliases: ['imagen', 'image_url', 'imageUrl', 'foto', 'URL Imagen', 'imagenes-1'] },
      { key: 'pais', label: 'País fabricación', aliases: ['pais_fabricacion', 'pais fabricacion', 'pais-fabricante'] },
      { key: 'fab_nombre', label: 'Fabricante nombre', aliases: ['fabricante_nombre', 'nombre-del-fabricante'] },
      { key: 'fab_nombre_com', label: 'Fabricante nombre comercial', aliases: ['fabricante_nombre_comercial', 'nombre-comercial-registrado-del-fabricante'] },
      { key: 'fab_direccion', label: 'Fabricante dirección', aliases: ['fabricante_direccion', 'direccion-del-fabricante'] },
      { key: 'fab_email', label: 'Fabricante email', aliases: ['fabricante_email', 'correo-electronico-del-fabricante'] },
    ];
    let score = 100;
    const recommendations = [];
    const availableKeys = inputRows.length > 0 ? Object.keys(inputRows[0]) : [];
    const availableKeysLow = availableKeys.map(k => k.toLowerCase().trim());
    for (const field of mandatory) {
      const matchedKey = availableKeys.find(ak => field.aliases.some(alias => ak.toLowerCase().trim() === alias.toLowerCase()));
      if (!matchedKey) {
        checks.push({ field: field.label, status: 'missing', count: 0, total, pct: 0 });
        score -= 5;
        continue;
      }
      let filled = 0;
      for (const row of inputRows) {
        const val = row[matchedKey];
        if (val && String(val).trim()) filled++;
      }
      const pct = Math.round((filled / total) * 100);
      checks.push({ field: field.label, status: pct === 100 ? 'ok' : pct >= 80 ? 'warn' : 'error', count: filled, total, pct });
      if (pct < 100) score -= Math.round((100 - pct) / 20);
    }
    let withImg2 = 0, withImg3 = 0;
    for (const row of inputRows) {
      const keys = Object.keys(row);
      const img2Key = keys.find(k => k.toLowerCase().match(/imagen.?2|image.?2|imagenes.?2/));
      const img3Key = keys.find(k => k.toLowerCase().match(/imagen.?3|image.?3|imagenes.?3/));
      if (img2Key && row[img2Key] && String(row[img2Key]).trim()) withImg2++;
      if (img3Key && row[img3Key] && String(row[img3Key]).trim()) withImg3++;
    }
    const img2Pct = Math.round((withImg2 / total) * 100);
    const img3Pct = Math.round((withImg3 / total) * 100);
    if (img2Pct < 80) recommendations.push({ impact: 'high', text: this.lang === 'es' ? `Añade imagen 2 a ${total - withImg2} productos — mejora la conversión un 35% en Sprinter` : `Adicione imagem 2 a ${total - withImg2} produtos — melhora a conversão 35% no Sprinter` });
    if (img3Pct < 50) recommendations.push({ impact: 'medium', text: this.lang === 'es' ? `Añade imagen 3 a ${total - withImg3} productos para una ficha más completa` : `Adicione imagem 3 a ${total - withImg3} produtos para uma ficha mais completa` });
    if (result.errors > 0) {
      score -= result.errors * 3;
      recommendations.push({ impact: 'high', text: this.lang === 'es' ? `${result.errors} productos con errores — revisa los campos obligatorios antes de subir` : `${result.errors} produtos com erros — revise os campos obrigatórios antes de enviar` });
    }
    const descKey = inputRows.length > 0 ? Object.keys(inputRows[0]).find(k => k.toLowerCase().match(/desc/)) : null;
    if (descKey) {
      const withDesc = inputRows.filter(r => r[descKey] && String(r[descKey]).trim().length > 10).length;
      const descPct = Math.round((withDesc / total) * 100);
      if (descPct < 80) recommendations.push({ impact: 'medium', text: this.lang === 'es' ? `Completa la descripción en ${total - withDesc} productos — Mirakl lo muestra en la ficha` : `Complete a descrição em ${total - withDesc} produtos — Mirakl mostra-a na ficha` });
    }
    let gpsrFound = 0;
    for (const gf of ['nombre-persona-responsable-en-eu', 'direccion-de-la-persona-responsable', 'correo-electronico-de-la-persona-responsable']) {
      if (availableKeysLow.some(k => k === gf || k.replace(/[\s_-]/g, '') === gf.replace(/[\s_-]/g, ''))) gpsrFound++;
    }
    if (gpsrFound === 0) {
      for (const gf of ['responsable_ue_nombre', 'responsable_ue_direccion', 'responsable_ue_email']) {
        if (availableKeysLow.some(k => k.replace(/[\s_-]/g, '') === gf.replace(/[\s_-]/g, ''))) gpsrFound++;
      }
    }
    if (gpsrFound < 3) recommendations.push({ impact: 'medium', text: this.lang === 'es' ? `Falta GPSR Responsable UE (${3 - gpsrFound} campos) — obligatorio para campañas y promociones` : `Falta GPSR Responsável UE (${3 - gpsrFound} campos) — obrigatório para campanhas e promoções` });
    score = Math.max(0, Math.min(100, score));
    return { score, checks, recommendations: recommendations.slice(0, 5), totalProducts: total, successProducts: result.success || 0, errorProducts: result.errors || 0, img2Pct, img3Pct };
  },

  downloadHealthReport() {
    if (!this.healthReport) return;
    const r = this.healthReport;
    const scoreColor = r.score >= 80 ? '#10b981' : r.score >= 50 ? '#f59e0b' : '#ef4444';
    const checksHtml = r.checks.map(c => {
      const icon = c.status === 'ok' ? '&#10004;' : c.status === 'warn' ? '&#9888;' : '&#10008;';
      const color = c.status === 'ok' ? '#10b981' : c.status === 'warn' ? '#f59e0b' : '#ef4444';
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;"><span style="color:${color};font-size:16px;margin-right:8px;">${icon}</span>${c.field}</td><td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:center;font-weight:600;">${c.pct}%</td><td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;">${c.count}/${c.total}</td></tr>`;
    }).join('');
    const recsHtml = r.recommendations.map(rec => `<div style="padding:12px 16px;background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;margin-bottom:8px;font-size:14px;color:#78350f;">${rec.text}</div>`).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Informe de Salud — Katalync</title></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:700px;margin:0 auto;padding:40px 24px;color:#0f172a;background:#fff;">
<div style="text-align:center;margin-bottom:32px;"><h1 style="font-size:24px;margin:0 0 4px;">Informe de Salud del Catálogo</h1><p style="color:#64748b;font-size:14px;margin:0;">Generado por Katalync — ${new Date().toLocaleDateString()}</p></div>
<div style="text-align:center;margin-bottom:32px;"><div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:8px solid ${scoreColor};display:flex;align-items:center;justify-content:center;"><span style="font-size:42px;font-weight:700;color:${scoreColor};">${r.score}</span></div><p style="margin-top:8px;font-size:14px;color:#64748b;">/100</p></div>
<div style="display:flex;gap:16px;margin-bottom:32px;justify-content:center;"><div style="text-align:center;padding:16px 24px;background:#f0fdf4;border-radius:12px;"><div style="font-size:24px;font-weight:700;color:#10b981;">${r.successProducts}</div><div style="font-size:12px;color:#64748b;">Productos OK</div></div><div style="text-align:center;padding:16px 24px;background:#fef2f2;border-radius:12px;"><div style="font-size:24px;font-weight:700;color:#ef4444;">${r.errorProducts}</div><div style="font-size:12px;color:#64748b;">Con errores</div></div><div style="text-align:center;padding:16px 24px;background:#f0f9ff;border-radius:12px;"><div style="font-size:24px;font-weight:700;color:#0ea5e9;">${r.img2Pct}%</div><div style="font-size:12px;color:#64748b;">Con imagen 2</div></div></div>
<h2 style="font-size:18px;margin-bottom:12px;">Checklist de campos</h2>
<table style="width:100%;border-collapse:collapse;margin-bottom:32px;"><thead><tr style="background:#f8fafc;"><th style="padding:10px 12px;text-align:left;font-size:13px;color:#64748b;">Campo</th><th style="padding:10px 12px;text-align:center;font-size:13px;color:#64748b;">Completitud</th><th style="padding:10px 12px;text-align:left;font-size:13px;color:#64748b;">Detalle</th></tr></thead><tbody>${checksHtml}</tbody></table>
${recsHtml ? '<h2 style="font-size:18px;margin-bottom:12px;">Recomendaciones</h2>' + recsHtml : ''}
<div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;">Generado por Katalync — katalync.com</div>
</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'informe_salud_katalync_' + new Date().toISOString().slice(0, 10) + '.html';
    a.click(); URL.revokeObjectURL(url);
  },
};
