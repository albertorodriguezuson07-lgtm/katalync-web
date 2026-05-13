import { storeGet, storeSet } from './helpers.js';

export default {
  adminUsers: [], adminActiveSessions: 0, adminLoading: false, adminConfirmDelete: null, adminMessage: '', adminMessageType: 'success',
  adminNewName: '', adminNewEmail: '', adminNewPassword: '', adminNewRole: 'user', adminNewMarketplace: '', adminCreateBusy: false, adminCreateMsg: '', adminCreateOk: false,
  adminTab: 'dashboard',
  adminMarketplaceFilter: '',
  adminMarketplaces: JSON.parse(storeGet('adminMarketplaces') || '["sprinter"]'),
  adminNewMarketplaceName: '',
  adminDashboard: { loading: false, totalJobs: 0, totalProducts: 0, todayJobs: 0, byTool: [], byUser: [], recentActivity: [] },

  get isAdmin() { return this.currentUser && (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin'); },
  get isMarketplaceAdmin() { return this.currentUser && this.currentUser.role === 'marketplace_admin'; },
  get canAccessAdmin() { return this.isAdmin || this.isMarketplaceAdmin; },

  get filteredAdminUsers() {
    let users = this.adminUsers;
    if (this.isMarketplaceAdmin && this.currentUser.marketplace_id) {
      users = users.filter(u => u.marketplace_id === this.currentUser.marketplace_id);
    } else if (this.adminMarketplaceFilter) {
      users = users.filter(u => u.marketplace_id === this.adminMarketplaceFilter);
    }
    return users;
  },

  getRoleBadge(role) {
    if (role === 'super_admin' || role === 'admin') return { label: this.t('role_super_admin'), class: 'bg-purple-100 text-purple-700' };
    if (role === 'marketplace_admin') return { label: this.t('role_marketplace_admin'), class: 'bg-blue-100 text-blue-700' };
    return { label: this.t('role_user'), class: 'bg-gray-100 text-gray-500' };
  },

  showAdminMsg(msg, type) { this.adminMessage = msg; this.adminMessageType = type; setTimeout(() => { this.adminMessage = ''; }, 4000); },

  async loadAdminUsers() {
    if (!this.authToken) return;
    this.adminLoading = true; this.adminMessage = '';
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-admin-users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken }) });
      const data = await resp.json();
      if (data.success) { this.adminUsers = data.users || []; this.adminActiveSessions = data.activeSessions || 0; }
      else { this.showAdminMsg(data.error || 'Error', 'error'); }
    } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
    this.adminLoading = false;
  },

  async deleteUser(email) {
    if (!this.authToken || !email) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-admin-delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email }) });
      const data = await resp.json();
      if (data.success) { this.showAdminMsg(data.message, 'success'); this.loadAdminUsers(); }
      else { this.showAdminMsg(data.error || 'Error', 'error'); }
    } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
  },

  async toggleUserRole(email, newRole) {
    if (!this.authToken || !email) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-admin-role', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email, role: newRole }) });
      const data = await resp.json();
      if (data.success) { this.showAdminMsg(data.message || 'OK', 'success'); this.loadAdminUsers(); }
      else { this.showAdminMsg(data.error || 'Error', 'error'); }
    } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
  },

  async assignMarketplace(email, marketplace_id) {
    if (!this.authToken || !email) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-admin-role', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email, marketplace_id }) });
      const data = await resp.json();
      if (data.success) { this.showAdminMsg(data.message || 'OK', 'success'); this.loadAdminUsers(); }
      else { this.showAdminMsg(data.error || 'Error', 'error'); }
    } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
  },

  addMarketplace() {
    const name = this.adminNewMarketplaceName.trim().toLowerCase();
    if (!name || this.adminMarketplaces.includes(name)) return;
    this.adminMarketplaces.push(name);
    storeSet('adminMarketplaces', JSON.stringify(this.adminMarketplaces));
    this.adminNewMarketplaceName = '';
  },

  removeMarketplace(name) {
    this.adminMarketplaces = this.adminMarketplaces.filter(m => m !== name);
    storeSet('adminMarketplaces', JSON.stringify(this.adminMarketplaces));
  },

  async changeSubscriptionStatus(email, newStatus) {
    if (!this.authToken || !email) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-admin-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email, subscription_status: newStatus }) });
      const data = await resp.json();
      if (data.success) { this.showAdminMsg(data.message || 'OK', 'success'); this.loadAdminUsers(); }
      else { this.showAdminMsg(data.error || 'Error', 'error'); }
    } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
  },

  async loadAdminDashboard() {
    if (!this.authToken) return;
    this.adminDashboard.loading = true;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-admin-dashboard', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken }) });
      const data = await resp.json();
      if (data.success) {
        const toolLabels = { catalog: this.t('nav_converter'), prices: this.t('nav_prices'), validation: this.t('nav_validation'), stock: this.t('nav_stock'), repricing: this.t('nav_repricing') };
        const toolColors = { catalog: 'bg-blue-500', prices: 'bg-green-500', validation: 'bg-yellow-500', stock: 'bg-purple-500', repricing: 'bg-rose-500' };
        let allFiles = data.allFiles || [];
        if (this.isMarketplaceAdmin && this.currentUser.marketplace_id) {
          const mpEmails = new Set(this.filteredAdminUsers.map(u => u.email));
          allFiles = allFiles.filter(f => mpEmails.has(f.userEmail));
        }
        const now = Date.now();
        const todayStart = new Date(); todayStart.setHours(0,0,0,0);
        let totalProducts = 0; let todayJobs = 0;
        const toolMap = {}; const userMap = {};
        const activity = [];
        for (const f of allFiles) {
          totalProducts += (f.count || 0);
          if (new Date(f.date).getTime() >= todayStart.getTime()) todayJobs++;
          const t = f.tool || 'unknown';
          if (!toolMap[t]) toolMap[t] = { count: 0, products: 0 };
          toolMap[t].count++; toolMap[t].products += (f.count || 0);
          const ue = f.userEmail || 'unknown';
          if (!userMap[ue]) userMap[ue] = { name: f.userName || ue, email: ue, jobs: 0, products: 0 };
          userMap[ue].jobs++; userMap[ue].products += (f.count || 0);
          const ago = now - new Date(f.date).getTime();
          let timeAgo = '';
          if (ago < 60000) timeAgo = this.t('time_now');
          else if (ago < 3600000) timeAgo = Math.floor(ago/60000) + ' min';
          else if (ago < 86400000) timeAgo = Math.floor(ago/3600000) + ' h';
          else timeAgo = Math.floor(ago/86400000) + ' d';
          activity.push({ tool: t, toolLabel: toolLabels[t] || t, userName: f.userName || ue, filename: f.filename, count: f.count || 0, timeAgo, date: f.date });
        }
        this.adminDashboard.totalJobs = allFiles.length;
        this.adminDashboard.totalProducts = totalProducts;
        this.adminDashboard.todayJobs = todayJobs;
        this.adminDashboard.byTool = Object.entries(toolMap).map(([k, v]) => ({ name: toolLabels[k] || k, count: v.count, products: v.products, color: toolColors[k] || 'bg-gray-500' })).sort((a,b) => b.count - a.count);
        this.adminDashboard.byUser = Object.values(userMap).sort((a,b) => b.jobs - a.jobs);
        this.adminDashboard.recentActivity = activity.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 30);
      }
    } catch(e) {}
    this.adminDashboard.loading = false;
  },

  async adminCreateUser() {
    if (!this.adminNewName || !this.adminNewEmail || this.adminNewPassword.length < 8) return;
    this.adminCreateBusy = true; this.adminCreateMsg = '';
    const N8N_BASE = this._N8N_BASE;
    try {
      const role = this.isMarketplaceAdmin ? (this.adminNewRole === 'marketplace_admin' ? 'marketplace_admin' : 'user') : this.adminNewRole;
      const marketplace_id = this.isMarketplaceAdmin ? this.currentUser.marketplace_id : this.adminNewMarketplace;
      const payload = { name: this.adminNewName, email: this.adminNewEmail, password: this.adminNewPassword, adminToken: this.authToken, role, marketplace_id };
      const resp = await fetch(N8N_BASE + '/webhook/auth-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await resp.json();
      if (data.success) {
        this.adminCreateMsg = this.t('user_created') + this.adminNewEmail;
        this.adminCreateOk = true;
        fetch(N8N_BASE + '/webhook/katalync-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'welcome', email: this.adminNewEmail, name: this.adminNewName }) }).catch(() => {});
        this.adminNewName = ''; this.adminNewEmail = ''; this.adminNewPassword = ''; this.adminNewRole = 'user'; this.adminNewMarketplace = '';
        this.loadAdminUsers();
      } else { this.adminCreateMsg = data.error || 'Error'; this.adminCreateOk = false; }
    } catch(e) { this.adminCreateMsg = this.t('connection_error_short'); this.adminCreateOk = false; }
    this.adminCreateBusy = false;
    setTimeout(() => { this.adminCreateMsg = ''; }, 5000);
  },
};
