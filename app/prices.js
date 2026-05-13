import { SPRINTER_OFFERS_HEADERS, MAX_PRODUCTS_PER_REQUEST } from './constants.js';

export default {
  priceStep: 'upload', priceMarketplace: 'sprinter_es', priceIncludeDiscount: false, pricePromoTag: '',
  priceFile: null, priceRows: [], priceCols: [], priceTotalProducts: 0, priceLog: [],
  showPriceErrors: false, priceResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' },

  handlePriceDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.priceFile = file; this.loadPriceExcel(file); } },
  handlePriceSelect(event) { const file = event.target.files[0]; if (file) { this.priceFile = file; this.loadPriceExcel(file); } },
  async loadPriceExcel(file) { const rows = await this.parseExcel(file); this.priceRows = rows; this.priceCols = rows.length > 0 ? Object.keys(rows[0]) : []; },

  async startPriceProcessing() {
    if (!this.priceFile || this.priceRows.length === 0) return;
    if (this.priceRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.priceLog, 'priceLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.priceRows.length)); return; }
    this.requestNotifPermission();
    this.priceStep = 'processing'; this.priceLog = []; this.priceTotalProducts = this.priceRows.length;
    this.addLog(this.priceLog, 'priceLogContainer', 'info', this.priceRows.length + ' ' + this.t('log_products_read'));
    this.addLog(this.priceLog, 'priceLogContainer', 'info', this.t('log_marketplace') + ' ' + this.priceMarketplace);
    this.addLog(this.priceLog, 'priceLogContainer', 'info', this.t('log_sending'));
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/price-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.priceMarketplace, includeDiscount: this.priceIncludeDiscount, promoTag: this.pricePromoTag.trim(), shipmentOrigin: this.catalogShipmentOrigin, vatPct: this.catalogVatPct, outputFormat: 'sprinter_mirakl', products: this.priceRows }) });
      if (!resp.ok) throw new Error(this.t('log_server_error'));
      const result = await resp.json();
      if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
      this.addLog(this.priceLog, 'priceLogContainer', 'info', result.message || this.t('log_completed'));
      if (result.errors > 0) this.addLog(this.priceLog, 'priceLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
      let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
      let offersUrl = ''; let offersFilename = '';
      const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (result.sprinterOfferRows && result.sprinterOfferRows.length > 0) {
        const b64 = this.buildSprinterXlsx(SPRINTER_OFFERS_HEADERS, result.sprinterOfferRows);
        offersUrl = this.makeBlobUrl(b64, xlsxMime);
        offersFilename = result.offersFilename || 'ofertas_sprinter.xlsx';
      }
      this.priceResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'precios.csv', offersUrl, offersFilename };
      this.saveToHistory('prices', offersFilename || result.csvFilename, result.success, offersUrl || excelUrl, this.priceMarketplace);
      this.saveFileToAccount('prices', result.csvFilename, result.success, result.csvBase64, this.priceMarketplace);
      this.sendBrowserNotif(this.t('notif_prices_done'), (result.success || 0) + ' ' + this.t('products_ok'));
      this.createServerNotification(this.t('notif_prices_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
      this.priceStep = 'results';
    } catch (err) { this.addLog(this.priceLog, 'priceLogContainer', 'error', 'Error: ' + err.message); }
  },

  resetPrices() { this.priceStep = 'upload'; this.priceFile = null; this.priceRows = []; this.priceCols = []; this.priceTotalProducts = 0; this.priceLog = []; this.showPriceErrors = false; this.pricePromoTag = ''; this.priceResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', offersUrl: '', offersFilename: '' }; },
};
