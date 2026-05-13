import { MAX_FILE_SIZE_MB } from './constants.js';

let _mem = {};

export function memGet(k) { return _mem[k] || null; }
export function memSet(k, v) { _mem[k] = v; }
export function memDel(k) { delete _mem[k]; }

export function storeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
export function storeSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }
export function storeDel(k) { try { localStorage.removeItem(k); } catch(e) {} }

export function safeGetHistory() { try { const m = memGet('hist'); if (m) return JSON.parse(m); const s = storeGet('catalogHistory'); if (s) return JSON.parse(s); return []; } catch(e) { return []; } }
export function safeSaveHistory(data) { try { const s = JSON.stringify(data); memSet('hist', s); storeSet('catalogHistory', s); } catch(e) {} }
export function safeGetToken() { return memGet('authToken') || storeGet('authToken') || null; }
export function safeSaveToken(token) { memSet('authToken', token); storeSet('authToken', token); }
export function safeClearToken() { memDel('authToken'); storeDel('authToken'); }
export function safeGetLang() { return memGet('appLang') || storeGet('appLang') || 'es'; }
export function safeSaveLang(l) { memSet('appLang', l); storeSet('appLang', l); }
export function safeGetDarkMode() { return memGet('darkMode') === 'true' || storeGet('darkMode') === 'true'; }
export function safeSaveDarkMode(v) { memSet('darkMode', String(v)); storeSet('darkMode', String(v)); }
export function safeGetBrowserNotifs() { return memGet('browserNotifs') === 'true' || storeGet('browserNotifs') === 'true'; }
export function safeSaveBrowserNotifs(v) { memSet('browserNotifs', String(v)); storeSet('browserNotifs', String(v)); }

export default {
  toastMsg: '', toastType: 'success', toastVisible: false,
  showToast(msg, type) { this.toastMsg = msg; this.toastType = type || 'success'; this.toastVisible = true; setTimeout(() => { this.toastVisible = false; }, type === 'error' ? 6000 : 4000); },

  ratios: [{ value: '2:3', label: '2:3', dims: '1000x1500' }, { value: '1:1', label: '1:1', dims: '1000x1000' }, { value: '4:3', label: '4:3', dims: '1000x750' }],

  formatSize(bytes) { if (!bytes) return ''; if (bytes < 1024) return bytes + ' B'; if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'; return (bytes / (1024 * 1024)).toFixed(1) + ' MB'; },
  isValidExcel(file) { if (!file) return false; if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) { alert(this.t('file_too_large').replace('{max}', MAX_FILE_SIZE_MB)); return false; } return /\.(xlsx|xls|csv)$/i.test(file.name) && ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv', 'application/csv'].includes(file.type); },
  async parseExcel(file) { try { const data = await file.arrayBuffer(); const wb = XLSX.read(data); return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' }); } catch (err) { return []; } },
  addLog(logArr, refName, type, message) { const time = new Date().toLocaleTimeString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); logArr.push({ type, message, time }); this.$nextTick(() => { const c = this.$refs[refName]; if (c) c.scrollTop = c.scrollHeight; }); },

  saveToHistory(tool, filename, count, url, marketplace) {
    const entry = { tool, filename: filename || 'archivo.csv', date: new Date().toLocaleDateString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }), count: count || 0, url: url || '', marketplace: marketplace || '' };
    this.historyJobs.unshift(entry);
    if (this.historyJobs.length > 20) this.historyJobs = this.historyJobs.slice(0, 20);
    safeSaveHistory(this.historyJobs);
  },
  makeBlobUrl(base64, mime) { const raw = atob(base64); const bytes = new Uint8Array(raw.length); for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i); return URL.createObjectURL(new Blob([bytes], { type: mime || 'text/csv;charset=utf-8' })); },

  requestNotifPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  },
  sendBrowserNotif(title, body) {
    if (!this.browserNotifs) return;
    if ('Notification' in window && Notification.permission === 'granted') {
      try { new Notification(title, { body, icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAIAAABl4DQWAAAGKUlEQVR42nVWW6hdVxUdc621zm3SNK0JxQipoUbTUmpLoSVgSosPxIKWRlBJLQShiB/2y7aUoqBFKmIUsR+iH0ZL9UOMDzSKokgbTcXEPpI2pdKYaJp3bu69ubk35+615hx+rH2OJ2ncX+csxtxr7Tkec0mtFQBJESEJoP1469/LwUJEJ9cvgSkAgq2gPeP6hsPEM64fwXBJVcOPYUoSgZSSu4uIiNRaU0oRIYCZubuqkoyIlFKtVVV1AkZSVWutZgmAj2AioiKiqqWUnHOD5pxLKWZGoNaac25QM2swd48JWDvQYJDdq4ikHpZISimlfVdEqOpbm9vWGUFAVRkUvRwHEaJKEqCIRoQ0Tibbiv/3iPQdl8sjJylocADaeu3uKaVGi5m15oqgrUe4iKioezWz1sAxJUAPc3cAqupe23rfmdbTtoG7D3IujT3VUrqUcoSTTHlQui6lBLBWH1OiqrWUPBi4O8mUUk9J03tEtEONNndVJcigmXm4QEQTL7yuV6wPYhLWGqWqHq6ik29TXsxPTxeEJDiyEikp8fSPeeIpqgExKepWGIy+asIxilGv20EaB5as7aGqXqumjKUzPPgFrcedoiOqJj83PExtfPDmnrHeuybkpveu68yMYK01Z62QOP5DXTiJC6/lcthpDM85l9KZGYBa6yDnUsukLRihZASZUi6ltLM3BzUBmGmpNLic/h07xbljfvhJNRVFrSWlHpaSdaUk60Ux4VWIiDCoamTfzeaFnq6UOTyN2cPoBlwY6Js/w6Fv0gYCjmERVNVgjA0oIgQUIgp4uKmQ0c4bESoiQLT1pVnMnZSSMN9xcSAHnpTDz2ieCi+Ng9brnirpy/sU60Ojd5CUUnPOHgEgpakS0G5WFhdRVbsisxdkKck/Ho5jz+apZe6lF3jXpZQIenjOuY5ZFZFayjjwei+oUpMvHE+xyLP/QkdUctUmDhnTizi3oH95qJ4/YSlLI38wqKVntcUnSW3u1yZ+1f4zVUMESzN44YmQKRzaiSVgWPHeR7HiVjlzHvMJR/brnm2hBtLU3F2tV6TqOMXIy7mJVMXft8mpN3jiJX3lFxhClr0baz+EG7biAmR+iLJMX9iOUweYsiB6c3HszSCp0sKklhZDEZHMCkUXz+rfvqenTtovP4fZC7IAbvxqxLzcshXrNnF2iCXD6bP28jMQqV6bCgE2vZslkhoRETHIg5Y7qlq6pZwT9u3Em9M4+Cre2Itz4KYnuOFee/HzXs7woz/A1LU4u8ChxMu/lW4x5akRq3D3PBjUUQhqy6MmKZJmGgAPPIsZwXAKc4i7HuYHvySvbseup3X3l7lmA+//EboBFiFH/slTB0PVVCIC0odHe5teMmcBiiZGyNFDGBKnh7xlMzd/Q17/je54EFgtu76PXV/jTffwI49jnpi+IDNHCYiAJEiZGCkXj2NREakRKULmh5xH2NWx5dv6nxflu1ti9e28axtv2CI//aLs2xH3PBarrueMyHBoQK3eMqdN7T7FRiNiNLWDWbWIMV/NaeDmD9vb34nvPMCD5zn1HrqGrsXJkKc+o3WI2+7jOcZgZQVyzj4e7l2X04jV8bRrqeOlSyZ8x02cE67fGK/9lUPyznvl+R3kcux6Gje/P1beyL2/xpoNuEJw7fUGVHc1IxnulpOHi6DFCWTy0iNKAHduhhPTMzh2CHd8Chu3kNfg3wewqLz943L3pzE3h2NHuO42WbMOtWDiAiDo+z9Kgn46ByNSzt4tya3vk7s/gN//HKuuw59/JYPlfnResFJOzotdxT/tRLoqXtqrn3gEqjFxwVKzWj0lI9vUJixZ6UofQ+4DswKRY0f4yY149Ov4409Axo13wDsVcHaW+3fr1sfxyh489i1xV7PaLlKjpOpKSWYqIqJSa005BXsOSoQycN06bP9DPP9cfOyzfnQ6XJGWc9nq2LcfWx6BZDz0ldZZd7eUavQ6qbU2VqWWwosvp/+7f7ljMMDsDOdmYs/uum9PWrkihkNbu17vux9XXomUxStHd4JLy8nUvGRmpdZesO45pdqGeK11xcp0zdtk3bsiZZw+KWuW2wMPwsPDU7iTk6nbciUlK6Wa2X8BjsIPINGLxyMAAAAASUVORK5CYII=' }); } catch(e) {}
    }
  },
  toggleBrowserNotifs() {
    if (!this.browserNotifs) {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(p => { this.browserNotifs = p === 'granted'; });
      } else if ('Notification' in window && Notification.permission === 'granted') {
        this.browserNotifs = true;
      }
    } else {
      this.browserNotifs = false;
    }
  },

  async saveFileToAccount(tool, filename, count, csvBase64, marketplace) {
    if (!this.authToken || !csvBase64) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      await fetch(N8N_BASE + '/webhook/auth-save-file', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.authToken, email: this.currentUser?.email, userName: this.currentUser?.name, tool, filename, count, csvBase64, marketplace, date: new Date().toISOString() })
      });
    } catch(e) {}
  },

  async loadSavedFiles() {
    if (!this.authToken) return;
    this.savedFilesLoading = true;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-saved-files', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.authToken, email: this.currentUser?.email })
      });
      const data = await resp.json();
      if (data.success && data.files) {
        this.savedFiles = data.files.map(f => {
          const created = new Date(f.date);
          const expires = new Date(created.getTime() + 15 * 24 * 60 * 60 * 1000);
          const daysLeft = Math.max(0, Math.ceil((expires - new Date()) / (1000 * 60 * 60 * 24)));
          let downloadUrl = '#';
          if (f.csvBase64) downloadUrl = this.makeBlobUrl(f.csvBase64);
          return { ...f, daysLeft, downloadUrl, date: created.toLocaleDateString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) };
        });
      } else { this.savedFiles = []; }
    } catch(e) { this.savedFiles = []; }
    this.savedFilesLoading = false;
  },

  get totalProductsProcessed() { return this.historyJobs.reduce((sum, j) => sum + (j.count || 0), 0); },
  get successRate() {
    if (this.historyJobs.length === 0) return 100;
    const total = this.historyJobs.reduce((s, j) => s + (j.count || 0), 0);
    return total > 0 ? Math.round((total / (total + this.historyJobs.reduce((s, j) => s + (j.errors || 0), 0))) * 100) : 100;
  },
  get avgProductsPerJob() {
    if (this.historyJobs.length === 0) return 0;
    return Math.round(this.totalProductsProcessed / this.historyJobs.length);
  },

  get chartData() {
    const filtered = this.chartMarketplace === 'all' ? this.historyJobs : this.historyJobs.filter(j => j.marketplace === this.chartMarketplace);
    const catalog = filtered.filter(j => j.tool === 'catalog').reduce((s, j) => s + (j.count || 0), 0);
    const prices = filtered.filter(j => j.tool === 'prices').reduce((s, j) => s + (j.count || 0), 0);
    const validation = filtered.filter(j => j.tool === 'validation').reduce((s, j) => s + (j.count || 0), 0);
    const stock = filtered.filter(j => j.tool === 'stock').reduce((s, j) => s + (j.count || 0), 0);
    const repricing = filtered.filter(j => j.tool === 'repricing').reduce((s, j) => s + (j.count || 0), 0);
    return { catalog, prices, validation, stock, repricing, maxVal: Math.max(catalog, prices, validation, stock, repricing, 1) };
  },

  get recentActivity() { return this.historyJobs.slice(0, 5); },

  get subscriptionActive() {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin') return true;
    return this.currentUser.subscription_status === 'active';
  },

  get subscriptionPending() {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin') return false;
    return this.currentUser.subscription_status === 'pending_payment';
  },

  get subscriptionSuspended() {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin') return false;
    return this.currentUser.subscription_status === 'suspended' || this.currentUser.subscription_status === 'cancelled';
  },

  getSubStatusBadge(status) {
    if (status === 'active') return { label: this.t('sub_status_active'), class: 'bg-green-100 text-green-700' };
    if (status === 'pending_payment') return { label: this.t('sub_status_pending'), class: 'bg-amber-100 text-amber-700' };
    if (status === 'suspended') return { label: this.t('sub_status_suspended'), class: 'bg-red-100 text-red-700' };
    if (status === 'cancelled') return { label: this.t('sub_status_cancelled'), class: 'bg-gray-100 text-gray-500' };
    return { label: status || 'N/A', class: 'bg-gray-100 text-gray-500' };
  },
};
