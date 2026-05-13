export default {
  syncSimulating: false, syncSimVendor: null, syncUploadSimulating: false, syncUploadProgress: 0, syncUploadDone: false,
  syncDemoVendors: [
    { id: 1, name: 'JOMA Sport', company: 'Joma Sport S.A.', source: 'Shopify', products: 4232, lastSync: Date.now() - 2*3600000, nextSync: Date.now() + 2*3600000, status: 'active', interval: 4, synced: 4180, errors: 52 },
    { id: 2, name: 'Adidas Iberia', company: 'Adidas España S.A.', source: 'PrestaShop', products: 8915, lastSync: Date.now() - 45*60000, nextSync: Date.now() + 195*60000, status: 'active', interval: 4, synced: 8870, errors: 45 },
    { id: 3, name: 'Decimas Sport', company: 'Decimas Deportes S.L.', source: 'API propia', products: 2103, lastSync: Date.now() - 24*3600000, nextSync: null, status: 'error', interval: 12, synced: 1890, errors: 213 },
  ],
  syncDemoLogs: [
    { id: 1, vendor: 'JOMA Sport', direction: 'in', total: 4232, created: 12, updated: 87, errors: 3, status: 'success', time: Date.now() - 2*3600000 },
    { id: 2, vendor: 'JOMA Sport', direction: 'out', total: 4180, created: 12, updated: 87, errors: 0, status: 'success', time: Date.now() - 2*3600000 + 120000 },
    { id: 3, vendor: 'Adidas Iberia', direction: 'in', total: 8915, created: 230, updated: 415, errors: 15, status: 'partial', time: Date.now() - 45*60000 },
    { id: 4, vendor: 'Adidas Iberia', direction: 'out', total: 8870, created: 230, updated: 400, errors: 2, status: 'success', time: Date.now() - 43*60000 },
    { id: 5, vendor: 'Decimas Sport', direction: 'in', total: 2103, created: 0, updated: 0, errors: 213, status: 'failed', time: Date.now() - 24*3600000 },
    { id: 6, vendor: 'JOMA Sport', direction: 'in', total: 4220, created: 5, updated: 42, errors: 1, status: 'success', time: Date.now() - 6*3600000 },
    { id: 7, vendor: 'JOMA Sport', direction: 'out', total: 4168, created: 5, updated: 42, errors: 0, status: 'success', time: Date.now() - 6*3600000 + 90000 },
    { id: 8, vendor: 'Adidas Iberia', direction: 'in', total: 8850, created: 180, updated: 320, errors: 8, status: 'success', time: Date.now() - 4.75*3600000 },
  ],

  get syncTotalProducts() { return this.syncDemoVendors.reduce((s, v) => s + v.products, 0); },
  get syncTotalSynced() { return this.syncDemoVendors.reduce((s, v) => s + v.synced, 0); },
  get syncSuccessRate() { const t = this.syncTotalProducts; return t ? ((this.syncTotalSynced / t) * 100).toFixed(1) : '0'; },
  get syncLastTime() { const ts = Math.max(...this.syncDemoVendors.map(v => v.lastSync)); return this.syncTimeAgo(ts); },

  syncTimeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return mins + ' ' + this.t('sync_minutes');
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h';
    return Math.floor(hrs / 24) + 'd';
  },

  async simulateSync(vendor) {
    this.syncSimulating = true;
    this.syncSimVendor = vendor.id;
    await new Promise(r => setTimeout(r, 2500));
    vendor.lastSync = Date.now();
    vendor.nextSync = Date.now() + vendor.interval * 3600000;
    if (vendor.status === 'error') { vendor.status = 'active'; vendor.errors = Math.floor(vendor.errors * 0.3); vendor.synced = vendor.products - vendor.errors; }
    const newCreated = Math.floor(Math.random() * 20) + 1;
    const newUpdated = Math.floor(Math.random() * 50) + 5;
    this.syncDemoLogs.unshift({ id: Date.now(), vendor: vendor.name, direction: 'in', total: vendor.products, created: newCreated, updated: newUpdated, errors: Math.floor(Math.random() * 3), status: 'success', time: Date.now() });
    this.syncSimulating = false;
    this.syncSimVendor = null;
    this.showToast(vendor.name + ': sync ' + this.t('sync_upload_done').toLowerCase(), 'success');
  },

  async simulateUpload() {
    this.syncUploadSimulating = true;
    this.syncUploadProgress = 0;
    this.syncUploadDone = false;
    const total = this.syncTotalSynced;
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      await new Promise(r => setTimeout(r, 200));
      this.syncUploadProgress = Math.round((i / steps) * 100);
    }
    this.syncUploadDone = true;
    this.syncUploadSimulating = false;
    this.syncDemoLogs.unshift({ id: Date.now(), vendor: 'Todos', direction: 'out', total: total, created: Math.floor(total * 0.02), updated: Math.floor(total * 0.06), errors: Math.floor(Math.random() * 15) + 3, status: 'success', time: Date.now() });
  },
};
