export default {
  async openStripeCheckout() {
    if (this.currentUser && this.currentUser.stripe_checkout_url) {
      window.location.href = this.currentUser.stripe_checkout_url;
      return;
    }
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/stripe-create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.currentUser?.email || '', role: this.currentUser?.role || 'user' })
      });
      const data = await resp.json();
      if (data.success && data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        this.showToast(data.error || 'Error al crear sesión de pago', 'error');
      }
    } catch(e) {
      this.showToast('Error de conexión con el servidor de pagos', 'error');
    }
  },

  async openBillingPortal() {
    const N8N_BASE = this._N8N_BASE;
    try {
      const resp = await fetch(N8N_BASE + '/webhook/stripe-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.currentUser?.email || '' })
      });
      const data = await resp.json();
      if (data.success && data.portal_url) {
        window.location.href = data.portal_url;
      } else {
        this.openStripeCheckout();
      }
    } catch(e) {
      this.showToast(this.t('billing_portal_error'), 'error');
    }
  },
};
