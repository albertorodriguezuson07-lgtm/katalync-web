import { safeSaveLang } from './helpers.js';

export default {
  showOnboarding: false, onboardStep: 1, onboardCompany: '', onboardBusy: false, paymentJustCompleted: false,

  async finishOnboarding() {
    this.onboardBusy = true;
    this.lang = this.onboardLang;
    safeSaveLang(this.onboardLang);
    const N8N_BASE = this._N8N_BASE;
    try {
      await fetch(N8N_BASE + '/webhook/auth-profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, company: this.onboardCompany, lang: this.onboardLang, onboarded: true }) });
      if (this.currentUser) { this.currentUser.company = this.onboardCompany; this.currentUser.onboarded = true; }
      this.profileName = this.currentUser?.name || ''; this.profileCompany = this.onboardCompany; this.profileLang = this.onboardLang;
    } catch(e) {}
    this.showOnboarding = false;
    this.onboardBusy = false;
  },
};
