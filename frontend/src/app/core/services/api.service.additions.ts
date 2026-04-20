/**
 * NEW API METHODS — merge into your existing ApiService.
 *
 * Path: src/app/core/services/api.service.ts
 */

/*

  // ── Dashboard ─────────────────────────────────────────────────

  getDashboard(): Observable<any> {
    return this.http.get(`${this.base}/dashboard`);
  }

  // ── Subscription ──────────────────────────────────────────────

  getSubscription(): Observable<any> {
    return this.http.get(`${this.base}/subscription`);
  }

  getSubscriptionPlans(): Observable<any> {
    return this.http.get(`${this.base}/subscription/plans`);
  }

  subscribeToPlan(plan: string, paymentMethod?: string): Observable<any> {
    return this.http.post(`${this.base}/subscription/subscribe`, { plan, payment_method: paymentMethod });
  }

  startTrial(): Observable<any> {
    return this.http.post(`${this.base}/subscription/trial`, {});
  }

  changeSubscriptionPlan(plan: string): Observable<any> {
    return this.http.put(`${this.base}/subscription/change`, { plan });
  }

  cancelSubscription(): Observable<any> {
    return this.http.post(`${this.base}/subscription/cancel`, {});
  }

  getInvoices(): Observable<any> {
    return this.http.get(`${this.base}/subscription/invoices`);
  }

*/
