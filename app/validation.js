import { MAX_PRODUCTS_PER_REQUEST } from './constants.js';

export default {
  validateStep: 'upload', validateMarketplace: 'sprinter_es', validateFile: null, validateRows: [], validateCols: [],
  validateTotalProducts: 0, validateLog: [], showValidateErrors: false, showValidateWarnings: false,
  validateResults: { validCount: 0, totalCount: 0, checks: [], errorList: [], warningList: [] },

  handleValidateDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.validateFile = file; this.loadValidateExcel(file); } },
  handleValidateSelect(event) { const file = event.target.files[0]; if (file) { this.validateFile = file; this.loadValidateExcel(file); } },
  async loadValidateExcel(file) { const rows = await this.parseExcel(file); this.validateRows = rows; this.validateCols = rows.length > 0 ? Object.keys(rows[0]) : []; },

  async startValidation() {
    if (!this.validateFile || this.validateRows.length === 0) return;
    if (this.validateRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.validateLog, 'validateLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.validateRows.length)); return; }
    this.requestNotifPermission();
    this.validateStep = 'processing'; this.validateLog = []; this.validateTotalProducts = this.validateRows.length;
    this.addLog(this.validateLog, 'validateLogContainer', 'info', this.validateRows.length + ' ' + this.t('log_products_read'));
    this.addLog(this.validateLog, 'validateLogContainer', 'info', this.t('log_marketplace') + ' ' + this.validateMarketplace);
    this.addLog(this.validateLog, 'validateLogContainer', 'info', this.t('log_sending'));
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/catalog-validate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.validateMarketplace, products: this.validateRows }) });
      if (!resp.ok) throw new Error(this.t('log_server_error'));
      const result = await resp.json();
      if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
      this.addLog(this.validateLog, 'validateLogContainer', 'info', result.message || this.t('log_validation_complete'));
      const s = result.summary || {};
      const validCount = s.valid || result.validCount || 0;
      const totalCount = s.total || result.totalCount || this.validateRows.length;
      const checks = s.checks || result.checks || [{ name: 'SKU', passed: 0, failed: 0, warnings: 0 }, { name: 'EAN', passed: 0, failed: 0, warnings: 0 }, { name: 'Imagen', passed: 0, failed: 0, warnings: 0 }, { name: 'Precio', passed: 0, failed: 0, warnings: 0 }, { name: 'Categoria', passed: 0, failed: 0, warnings: 0 }, { name: 'Marca', passed: 0, failed: 0, warnings: 0 }];
      const errorList = result.errors || result.errorList || [];
      const warningList = result.warnings || result.warningList || [];
      if (errorList.length > 0) this.addLog(this.validateLog, 'validateLogContainer', 'error', errorList.length + ' ' + this.t('log_errors_found'));
      if (warningList.length > 0) this.addLog(this.validateLog, 'validateLogContainer', 'warn', warningList.length + ' ' + this.t('log_warnings_found'));
      this.validateResults = { validCount, totalCount, checks, errorList, warningList };
      this.saveToHistory('validation', this.validateFile.name, totalCount, '', this.validateMarketplace);
      this.saveFileToAccount('validation', this.validateFile.name, totalCount, '', this.validateMarketplace);
      this.sendBrowserNotif(this.t('notif_validate_done'), validCount + ' / ' + totalCount + ' ' + this.t('valid_products'));
      this.createServerNotification(this.t('notif_validate_done') + ': ' + validCount + ' / ' + totalCount + ' ' + this.t('valid_products'));
      this.validateStep = 'results';
    } catch (err) { this.addLog(this.validateLog, 'validateLogContainer', 'error', 'Error: ' + err.message); }
  },

  resetValidation() { this.validateStep = 'upload'; this.validateFile = null; this.validateRows = []; this.validateCols = []; this.validateTotalProducts = 0; this.validateLog = []; this.showValidateErrors = false; this.showValidateWarnings = false; this.validateResults = { validCount: 0, totalCount: 0, checks: [], errorList: [], warningList: [] }; },
};
