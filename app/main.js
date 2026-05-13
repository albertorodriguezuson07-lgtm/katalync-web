import { N8N_WEBHOOK_BASE } from './constants.js';
import { TRANSLATIONS } from './i18n.js';
import { safeGetLang, safeSaveLang, safeGetDarkMode, safeSaveDarkMode, safeGetBrowserNotifs, safeSaveBrowserNotifs, safeGetToken, safeSaveToken, safeClearToken, safeGetHistory } from './helpers.js';
import helpers from './helpers.js';
import auth from './auth.js';
import onboarding from './onboarding.js';
import notifications from './notifications.js';
import stripe from './stripe.js';
import catalog from './catalog.js';
import prices from './prices.js';
import stock from './stock.js';
import validation from './validation.js';
import repricing from './repricing.js';
import templates from './templates.js';
import sync from './sync.js';
import admin from './admin.js';
import chat from './chat.js';
import competitors from './competitors.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    _N8N_BASE: (typeof N8N_WEBHOOK_BASE !== 'undefined') ? N8N_WEBHOOK_BASE : '',

    lang: safeGetLang(),
    darkMode: safeGetDarkMode(),
    browserNotifs: safeGetBrowserNotifs(),

    t(key) { return (TRANSLATIONS[this.lang] || TRANSLATIONS.es)[key] || (TRANSLATIONS.es)[key] || key; },

    page: 'home',
    showHistory: false,
    historyJobs: safeGetHistory(),
    chartMarketplace: 'all',
    chartMetric: 'products',
    showUserMenu: false,
    savedFiles: [],
    savedFilesLoading: false,
    profileLang: safeGetLang(),
    onboardLang: safeGetLang(),

    ...helpers,
    ...auth,
    ...onboarding,
    ...notifications,
    ...stripe,
    ...catalog,
    ...prices,
    ...stock,
    ...validation,
    ...repricing,
    ...templates,
    ...sync,
    ...admin,
    ...chat,
    ...competitors,

    init() {
      const saved = safeGetToken();
      if (saved) { this.authToken = saved; this.verifySession(saved); }
      else { this.authLoading = false; }
      this.$watch('darkMode', v => safeSaveDarkMode(v));
      this.$watch('browserNotifs', v => safeSaveBrowserNotifs(v));
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('payment') === 'success') {
        this.paymentJustCompleted = true;
        window.history.replaceState({}, '', window.location.pathname);
      }
    },
  }));
});
