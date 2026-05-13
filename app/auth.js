import { _rateLimiter } from './constants.js';
import { safeSaveToken, safeClearToken, safeSaveLang, storeDel } from './helpers.js';

export default {
  authPage: 'login', authEmail: '', authPassword: '', authName: '', authError: '', authBusy: false, authLoading: true,
  currentUser: null, authToken: null, showLoginPass: false, showRegisterPass: false, showPwdCurrent: false, showPwdNew: false,

  profileName: '', profileCompany: '', profileBusy: false, profileMsg: '', profileMsgType: 'success',
  pwdCurrent: '', pwdNew: '', pwdBusy: false, pwdMsg: '', pwdMsgType: 'success',

  async doRegister() {
    this.authError = this.t('register_disabled');
  },

  async doLogin() {
    if (this.authBusy) return;
    this.authError = '';
    if (!this.authEmail || !this.authPassword) { this.authError = this.t('empty_credentials'); return; }
    if (!_rateLimiter.check('login', 5, 60000)) { this.authError = this.t('rate_limit'); return; }
    this.authBusy = true;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: this.authEmail, password: this.authPassword }) });
      const data = await resp.json();
      if (!data.success) { this.authError = data.error || this.t('login_error_fallback'); this.authBusy = false; return; }
      this.authToken = data.token;
      const role = data.role === 'admin' ? 'super_admin' : (data.role || 'user');
      this.currentUser = { name: data.name, email: data.email, role, marketplace_id: data.marketplace_id || '', company: data.company || '', onboarded: data.onboarded !== false, subscription_status: data.subscription_status || 'active', stripe_checkout_url: data.stripe_checkout_url || '' };
      safeSaveToken(data.token);
      this.authPassword = '';
      if (data.lang) { this.lang = data.lang; safeSaveLang(data.lang); }
      if (!this.currentUser.onboarded) { this.showOnboarding = true; }
      this.authBusy = false;
      this.loadNotifications();
      this.loadSavedFiles();
    } catch(e) { this.authError = this.t('connection_error'); this.authBusy = false; this.authPassword = ''; }
  },

  async verifySession(token) {
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
      const data = await resp.json();
      if (data.success) {
        const role = data.role === 'admin' ? 'super_admin' : (data.role || 'user');
        this.currentUser = { name: data.name, email: data.email, role, marketplace_id: data.marketplace_id || '', company: data.company || '', onboarded: data.onboarded !== false, subscription_status: data.subscription_status || 'active', stripe_checkout_url: data.stripe_checkout_url || '' };
        if (data.lang) { this.lang = data.lang; safeSaveLang(data.lang); }
        this.unreadNotifCount = data.unreadNotifications || 0;
        this.profileName = data.name; this.profileCompany = data.company || ''; this.profileLang = data.lang || this.lang;
        if (!this.currentUser.onboarded) { this.showOnboarding = true; }
        this.loadSavedFiles();
        if (this.paymentJustCompleted && this.currentUser.subscription_status !== 'active') {
          this.currentUser.subscription_status = 'active';
          fetch(N8N_BASE + '/webhook/auth-admin-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, email: this.currentUser.email, subscription_status: 'active', source: 'stripe_redirect' }) });
        }
      } else { safeClearToken(); this.authToken = null; }
    } catch(e) { safeClearToken(); this.authToken = null; }
    this.authLoading = false;
  },

  doLogout() {
    this.currentUser = null; this.authToken = null; this.authEmail = ''; this.authPassword = '';
    this.authName = ''; this.authError = ''; this.authPage = 'login'; this.showUserMenu = false;
    this.showNotifPanel = false; this.notifications = []; this.unreadNotifCount = 0;
    this.savedFiles = [];
    safeClearToken();
    storeDel('darkMode'); storeDel('browserNotifs'); storeDel('appLang'); storeDel('catalogHistory');
    window.location.href = '/';
  },

  async saveProfile() {
    this.profileBusy = true; this.profileMsg = '';
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, name: this.profileName, company: this.profileCompany, lang: this.profileLang }) });
      const data = await resp.json();
      if (data.success) {
        this.profileMsg = data.message || this.t('saved_msg'); this.profileMsgType = 'success';
        if (this.currentUser) { this.currentUser.name = this.profileName; this.currentUser.company = this.profileCompany; }
        this.lang = this.profileLang; safeSaveLang(this.profileLang);
      } else { this.profileMsg = data.error || 'Error'; this.profileMsgType = 'error'; }
    } catch(e) { this.profileMsg = this.t('connection_error_short'); this.profileMsgType = 'error'; }
    this.profileBusy = false;
    setTimeout(() => { this.profileMsg = ''; }, 4000);
  },

  async changePassword() {
    this.pwdBusy = true; this.pwdMsg = '';
    if (!this.pwdCurrent || !this.pwdNew) { this.pwdMsg = this.t('fill_both_fields'); this.pwdMsgType = 'error'; this.pwdBusy = false; return; }
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, currentPassword: this.pwdCurrent, newPassword: this.pwdNew }) });
      const data = await resp.json();
      if (data.success) { this.pwdMsg = data.message || this.t('updated_msg'); this.pwdMsgType = 'success'; this.pwdCurrent = ''; this.pwdNew = ''; }
      else { this.pwdMsg = data.error || 'Error'; this.pwdMsgType = 'error'; }
    } catch(e) { this.pwdMsg = this.t('connection_error_short'); this.pwdMsgType = 'error'; }
    this.pwdBusy = false;
    setTimeout(() => { this.pwdMsg = ''; }, 4000);
  },
};
