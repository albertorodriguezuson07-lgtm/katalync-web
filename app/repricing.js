export default {
  repricingStep: 'upload', repricingMarketplace: 'sprinter_es',
  repricingProductFile: null, repricingProductRows: [], repricingProductCols: [],
  repricingCompFile: null, repricingCompRows: [], repricingCompCols: [],
  repricingMarginMin: 15, repricingUndercut: 0.50, repricingMaxDecrease: 10, repricingRoundTo: '.99',
  repricingLog: [], repricingResults: { recommendations: [], summary: {}, csvUrl: '', csvFilename: '' },

  handleRepricingProductDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.repricingProductFile = file; this.loadRepricingProducts(file); } },
  handleRepricingProductSelect(event) { const file = event.target.files[0]; if (file) { this.repricingProductFile = file; this.loadRepricingProducts(file); } },
  async loadRepricingProducts(file) { const rows = await this.parseExcel(file); this.repricingProductRows = rows; this.repricingProductCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
  handleRepricingCompDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.repricingCompFile = file; this.loadRepricingComp(file); } },
  handleRepricingCompSelect(event) { const file = event.target.files[0]; if (file) { this.repricingCompFile = file; this.loadRepricingComp(file); } },
  async loadRepricingComp(file) { const rows = await this.parseExcel(file); this.repricingCompRows = rows; this.repricingCompCols = rows.length > 0 ? Object.keys(rows[0]) : []; },

  calculateRepricing() {
    if (!this.repricingProductFile || this.repricingProductRows.length === 0) return;
    this.repricingStep = 'processing'; this.repricingLog = [];
    this.addLog(this.repricingLog, 'repricingLogContainer', 'info', this.repricingProductRows.length + ' ' + this.t('log_products_read'));
    const getSku = (row) => String(row['offer-sku'] || row['sku'] || row['SKU'] || row['Sku'] || row['shop-sku'] || '').trim();
    const compMap = {};
    for (const c of this.repricingCompRows) {
      const sku = getSku(c);
      if (!sku) continue;
      const price = parseFloat(c.price || c.Price || c.precio || c.Precio || 0);
      const shipping = parseFloat(c.shipping || c.Shipping || c.envio || c.Envio || 0);
      const total = price + shipping;
      if (!compMap[sku] || total < compMap[sku].total) {
        compMap[sku] = { price, shipping, total };
      }
    }
    this.addLog(this.repricingLog, 'repricingLogContainer', 'info', Object.keys(compMap).length + ' SKUs competidores cargados');
    const recommendations = [];
    let lowerCount = 0, keepCount = 0, noCompCount = 0, totalMargin = 0, marginCount = 0;
    for (const p of this.repricingProductRows) {
      const sku = getSku(p);
      if (!sku) continue;
      const myPrice = parseFloat(p.price || p.Price || p.precio || p.Precio || 0);
      const myCost = parseFloat(p.cost || p.Cost || p.coste || p.Coste || p.costo || p.Costo || 0);
      const comp = compMap[sku];
      let recommended = myPrice;
      let action = 'keep';
      let margin = myCost > 0 ? ((myPrice - myCost) / myPrice) * 100 : 0;
      if (!comp) {
        action = 'no_data';
        noCompCount++;
      } else {
        const target = comp.total - this.repricingUndercut;
        const minByMargin = myCost > 0 ? myCost / (1 - this.repricingMarginMin / 100) : 0;
        const maxDecrease = myPrice * (1 - this.repricingMaxDecrease / 100);
        const floor = Math.max(minByMargin, maxDecrease);
        if (myPrice <= comp.total) {
          action = 'keep';
          keepCount++;
        } else if (target >= floor) {
          recommended = target;
          action = 'lower';
          lowerCount++;
        } else if (floor < myPrice) {
          recommended = floor;
          action = 'lower';
          lowerCount++;
        } else {
          action = 'keep';
          keepCount++;
        }
      }
      if (this.repricingRoundTo === '.99') recommended = Math.floor(recommended) + 0.99;
      else if (this.repricingRoundTo === '.95') recommended = Math.floor(recommended) + 0.95;
      else recommended = Math.round(recommended * 100) / 100;
      if (recommended > myPrice) recommended = myPrice;
      const finalMargin = myCost > 0 ? ((recommended - myCost) / recommended) * 100 : 0;
      totalMargin += finalMargin; marginCount++;
      recommendations.push({
        sku, currentPrice: myPrice, cost: myCost,
        competitorPrice: comp ? comp.total : null,
        competitorShipping: comp ? comp.shipping : null,
        recommended: Math.round(recommended * 100) / 100,
        margin: Math.round(finalMargin * 10) / 10,
        action, savings: comp ? Math.round((myPrice - recommended) * 100) / 100 : 0
      });
    }
    const avgMargin = marginCount > 0 ? Math.round(totalMargin / marginCount * 10) / 10 : 0;
    const totalSavings = recommendations.reduce((s, r) => s + (r.savings || 0), 0).toFixed(2);
    this.addLog(this.repricingLog, 'repricingLogContainer', 'info', this.t('log_completed'));
    this.addLog(this.repricingLog, 'repricingLogContainer', 'info', lowerCount + ' ' + this.t('repricing_lower') + ' | ' + keepCount + ' ' + this.t('repricing_keep') + ' | ' + noCompCount + ' ' + this.t('repricing_no_data'));
    const csvRows = [['offer-sku', 'price', 'discount-price', 'discount-start-date', 'discount-end-date']];
    for (const r of recommendations) {
      csvRows.push([r.sku, r.recommended, '', '', '']);
    }
    let csvContent = csvRows.map(row => row.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(';')).join('\n');
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvFilename = 'repricing_' + new Date().toISOString().slice(0,10) + '.csv';
    this.repricingResults = {
      recommendations: recommendations.slice(0, 50),
      summary: { total: recommendations.length, lower: lowerCount, keep: keepCount, noComp: noCompCount, avgMargin, totalSavings },
      csvUrl, csvFilename
    };
    this.saveToHistory('repricing', csvFilename, recommendations.length, csvUrl, this.repricingMarketplace);
    this.sendBrowserNotif(this.t('repricing_done'), recommendations.length + ' ' + this.t('repricing_recommendations'));
    this.createServerNotification(this.t('repricing_done') + ': ' + recommendations.length + ' ' + this.t('repricing_recommendations'));
    this.repricingStep = 'results';
  },

  resetRepricing() { this.repricingStep = 'upload'; this.repricingProductFile = null; this.repricingProductRows = []; this.repricingProductCols = []; this.repricingCompFile = null; this.repricingCompRows = []; this.repricingCompCols = []; this.repricingLog = []; this.repricingResults = { recommendations: [], summary: {}, csvUrl: '', csvFilename: '' }; },
};
