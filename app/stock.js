import { SPRINTER_OFFERS_HEADERS, MAX_PRODUCTS_PER_REQUEST } from './constants.js';

export default {
  stockStep: 'upload', stockMarketplace: 'sprinter_es',
  stockFile: null, stockRows: [], stockCols: [], stockTotalProducts: 0, stockLog: [],
  showStockErrors: false, stockResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' },

  handleStockDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.stockFile = file; this.loadStockExcel(file); } },
  handleStockSelect(event) { const file = event.target.files[0]; if (file) { this.stockFile = file; this.loadStockExcel(file); } },
  async loadStockExcel(file) { const rows = await this.parseExcel(file); this.stockRows = rows; this.stockCols = rows.length > 0 ? Object.keys(rows[0]) : []; },

  async startStockProcessing() {
    if (!this.stockFile || this.stockRows.length === 0) return;
    if (this.stockRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.stockLog, 'stockLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.stockRows.length)); return; }
    this.requestNotifPermission();
    this.stockStep = 'processing'; this.stockLog = []; this.stockTotalProducts = this.stockRows.length;
    this.addLog(this.stockLog, 'stockLogContainer', 'info', this.stockRows.length + ' ' + this.t('log_products_read'));
    this.addLog(this.stockLog, 'stockLogContainer', 'info', this.t('log_marketplace') + ' ' + this.stockMarketplace);
    this.addLog(this.stockLog, 'stockLogContainer', 'info', this.t('log_sending'));
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/stock-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.stockMarketplace, outputFormat: 'sprinter_mirakl', shipmentOrigin: this.catalogShipmentOrigin, vatPct: this.catalogVatPct, products: this.stockRows }) });
      if (!resp.ok) throw new Error(this.t('log_server_error'));
      const result = await resp.json();
      if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
      this.addLog(this.stockLog, 'stockLogContainer', 'info', result.message || this.t('log_completed'));
      if (result.errors > 0) this.addLog(this.stockLog, 'stockLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
      let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
      let offersUrl = ''; let offersFilename = '';
      const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (result.sprinterOfferRows && result.sprinterOfferRows.length > 0) {
        const b64 = this.buildSprinterXlsx(SPRINTER_OFFERS_HEADERS, result.sprinterOfferRows);
        offersUrl = this.makeBlobUrl(b64, xlsxMime);
        offersFilename = result.offersFilename || 'stock_sprinter.xlsx';
      }
      this.stockResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'stock.csv', offersUrl, offersFilename };
      this.saveToHistory('stock', offersFilename || result.csvFilename, result.success, offersUrl || excelUrl, this.stockMarketplace);
      this.saveFileToAccount('stock', result.csvFilename, result.success, result.csvBase64, this.stockMarketplace);
      this.sendBrowserNotif(this.t('notif_stock_done'), (result.success || 0) + ' ' + this.t('products_ok'));
      this.createServerNotification(this.t('notif_stock_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
      this.stockStep = 'results';
    } catch (err) { this.addLog(this.stockLog, 'stockLogContainer', 'error', 'Error: ' + err.message); }
  },

  resetStock() { this.stockStep = 'upload'; this.stockFile = null; this.stockRows = []; this.stockCols = []; this.stockTotalProducts = 0; this.stockLog = []; this.showStockErrors = false; this.stockResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', offersUrl: '', offersFilename: '' }; },
};
