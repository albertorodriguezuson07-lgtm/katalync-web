export default {
  showNotifPanel: false, notifications: [], unreadNotifCount: 0,

  async loadNotifications() {
    if (!this.authToken) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'list' }) });
      const data = await resp.json();
      if (data.success) {
        this.notifications = data.notifications || [];
        this.unreadNotifCount = this.notifications.filter(n => !n.read).length;
      }
    } catch(e) {}
  },

  async markNotifRead(id) {
    const N8N_BASE = this._N8N_BASE;
    try {
      await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'markRead', notifId: id }) });
      const n = this.notifications.find(x => x.id === id);
      if (n) n.read = true;
      this.unreadNotifCount = this.notifications.filter(x => !x.read).length;
    } catch(e) {}
  },

  async markAllNotifRead() {
    const N8N_BASE = this._N8N_BASE;
    try {
      await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'markAllRead' }) });
      this.notifications.forEach(n => n.read = true);
      this.unreadNotifCount = 0;
    } catch(e) {}
  },

  async createServerNotification(message) {
    if (!this.authToken) return;
    const N8N_BASE = this._N8N_BASE;
    try {
      await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'create', message }) });
      this.loadNotifications();
    } catch(e) {}
  },

  async clearNotifications() {
    const N8N_BASE = this._N8N_BASE;
    try {
      await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'clear' }) });
      this.notifications = []; this.unreadNotifCount = 0;
    } catch(e) {}
  },
};
