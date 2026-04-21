import {
  ChangeDetectionStrategy, Component, OnInit,
  inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, SubscriptionPlan, Subscription, Invoice } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="sub-page">

  @if (toast()) {
    <div class="toast" [class.toast-ok]="toast()!.ok" [class.toast-err]="!toast()!.ok">
      {{ toast()!.msg }}
    </div>
  }

  <div class="page-header">
    <div>
      <h1 class="page-title">SUBSCRIPTION & BILLING</h1>
      <p class="page-sub">Manage your plan, upgrades, and payment history</p>
    </div>
    <div class="header-tabs">
      <button class="tab-btn" [class.active]="activeTab()==='plans'" (click)="activeTab.set('plans')">Plans</button>
      <button class="tab-btn" [class.active]="activeTab()==='invoices'" (click)="activeTab.set('invoices')">Invoices</button>
    </div>
  </div>

  @if (loading()) {
    <div class="loading-state"><div class="spinner"></div><span>Loading…</span></div>
  } @else {

    @if (activeTab() === 'plans') {

      @if (currentSub()) {
        <div class="current-banner">
          <div class="current-banner-left">
            <span class="current-icon">{{ getMeta(currentSub()!.plan).icon }}</span>
            <div>
              <div class="current-label">CURRENT PLAN</div>
              <div class="current-name">{{ currentSub()!.plan.toUpperCase() }}</div>
              <div class="current-meta">
                Status: {{ currentSub()!.status }}
                @if (currentSub()!.current_period_end) {
                  · Renews {{ formatDate(currentSub()!.current_period_end) }}
                }
              </div>
            </div>
          </div>
          <div class="current-banner-right">
            <span class="status-badge" [class.active]="currentSub()!.status === 'active'">
              {{ currentSub()!.status | uppercase }}
            </span>
            @if (currentSub()!.plan !== 'free') {
              <button class="cancel-link" (click)="showCancel.set(true)">Cancel subscription</button>
            }
          </div>
        </div>
      }

      <div class="plans-grid">
        @for (plan of plans(); track plan.key) {
          <div class="plan-card"
               [class.highlight]="getMeta(plan.key).highlight"
               [class.current]="isCurrentPlan(plan.key)"
               [style.--plan-color]="getMeta(plan.key).color">
            @if (getMeta(plan.key).highlight) {
              <div class="popular-badge">MOST POPULAR</div>
            }
            @if (isCurrentPlan(plan.key)) {
              <div class="current-badge">CURRENT PLAN</div>
            }
            <div class="plan-icon">{{ getMeta(plan.key).icon }}</div>
            <div class="plan-name">{{ plan.name }}</div>
            <div class="plan-price">
              @if (plan.price_monthly === 0) {
                <span class="price-free">Free</span>
              } @else if (plan.key === 'enterprise') {
                <span class="price-custom">Custom</span>
              } @else {
                <span class="price-amount">{{ plan.price_monthly | number }}</span>
                <span class="price-currency">{{ plan.currency }}</span>
                <span class="price-period">/mo</span>
              }
            </div>
            <ul class="feature-list">
              @for (feat of plan.features; track feat) {
                <li><span class="feat-check">✓</span> {{ feat }}</li>
              }
            </ul>
            <div class="plan-cta">
              @if (isCurrentPlan(plan.key)) {
                <button class="btn-current" disabled>Current Plan</button>
              } @else if (plan.key === 'enterprise') {
                <button class="btn-upgrade" (click)="contactSales()">Contact Sales</button>
              } @else {
                <button class="btn-upgrade" (click)="openPayment(plan)">
                  @if (plan.price_monthly === 0) { Activate Free } @else { Upgrade · {{ plan.price_monthly | number }} {{ plan.currency }}/mo }
                </button>
              }
            </div>
          </div>
        }
      </div>
      <div class="compare-note">All plans include SSL, 99.9% uptime SLA, and full Arabic RTL support.</div>
    }

    @if (activeTab() === 'invoices') {
      <div class="invoices-section">
        @if (invoices().length === 0) {
          <div class="empty-state">
            <div class="empty-icon">🧾</div>
            <div class="empty-title">No invoices yet</div>
            <div class="empty-sub">Billing history appears here once you upgrade to a paid plan.</div>
          </div>
        } @else {
          <table class="invoice-table">
            <thead><tr><th>Date</th><th>Amount</th><th>Status</th><th>PDF</th></tr></thead>
            <tbody>
              @for (inv of invoices(); track inv.id) {
                <tr>
                  <td>{{ formatDate(inv.created_at) }}</td>
                  <td>{{ inv.amount | number }} {{ inv.currency }}</td>
                  <td><span class="inv-status" [class.paid]="inv.status === 'paid'">{{ inv.status | uppercase }}</span></td>
                  <td>
                    @if (inv.invoice_url) { <a [href]="inv.invoice_url + '?token=' + getToken()" target="_blank" class="pdf-link">Download PDF</a> }
                    @else { <span class="no-pdf">—</span> }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    }
  }

  <!-- ── PAYMENT MODAL ──────────────────────────────────────── -->
  @if (showPayment() && selectedPlan()) {
    <div class="modal-overlay" (click)="closePayment()">
      <div class="payment-modal" (click)="$event.stopPropagation()">

        <button class="modal-close" (click)="closePayment()">✕</button>

        <!-- Order Summary -->
        <div class="order-summary">
          <div class="order-icon">{{ getMeta(selectedPlan()!.key).icon }}</div>
          <div>
            <div class="order-plan">{{ selectedPlan()!.name }} Plan</div>
            <div class="order-amount">
              {{ selectedPlan()!.price_monthly | number }} {{ selectedPlan()!.currency }}
              <span class="order-period">/ month</span>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Card Form -->
        <div class="payment-form">
          <div class="form-label">CARD INFORMATION</div>

          <div class="card-preview" [class.flipped]="showCvv">
            <div class="card-front">
              <div class="card-chip">⬛</div>
              <div class="card-number-preview">
                {{ cardDisplay() }}
              </div>
              <div class="card-bottom">
                <div>
                  <div class="card-field-label">CARD HOLDER</div>
                  <div class="card-field-val">{{ cardName || 'YOUR NAME' }}</div>
                </div>
                <div>
                  <div class="card-field-label">EXPIRES</div>
                  <div class="card-field-val">{{ cardExpiry || 'MM/YY' }}</div>
                </div>
              </div>
              <div class="card-logo">
                @if (cardBrand() === 'visa') { <span class="brand-visa">VISA</span> }
                @else if (cardBrand() === 'mc') { <span class="brand-mc">◉◉</span> }
                @else { <span class="brand-generic">💳</span> }
              </div>
            </div>
            <div class="card-back">
              <div class="card-strip"></div>
              <div class="card-cvv-row">
                <div class="card-cvv-label">CVV</div>
                <div class="card-cvv-box">{{ cardCvv || '•••' }}</div>
              </div>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Card Number</label>
            <input class="field-input" type="text" inputmode="numeric"
                   maxlength="19" placeholder="1234 5678 9012 3456"
                   [value]="cardNumber"
                   (input)="onCardNumber($event)" />
          </div>

          <div class="field-group">
            <label class="field-label">Cardholder Name</label>
            <input class="field-input" type="text" placeholder="Name on card"
                   [(ngModel)]="cardName" />
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Expiry Date</label>
              <input class="field-input" type="text" inputmode="numeric"
                     maxlength="5" placeholder="MM/YY"
                     [value]="cardExpiry"
                     (input)="onExpiry($event)" />
            </div>
            <div class="field-group">
              <label class="field-label">CVV</label>
              <input class="field-input" type="password" inputmode="numeric"
                     maxlength="4" placeholder="•••"
                     [(ngModel)]="cardCvv"
                     (focus)="showCvv = true"
                     (blur)="showCvv = false" />
            </div>
          </div>

          <div class="secure-note">
            🔒 Secured by 256-bit SSL encryption. Card details are not stored.
          </div>

          @if (paymentError()) {
            <div class="payment-error">{{ paymentError() }}</div>
          }

          <button class="btn-pay"
                  [disabled]="paying()"
                  (click)="processPayment()">
            @if (paying()) {
              <span class="btn-spinner"></span> Processing…
            } @else {
              Pay {{ selectedPlan()!.price_monthly | number }} {{ selectedPlan()!.currency }}
            }
          </button>

          <div class="accepted-cards">
            <span>Accepted:</span>
            <span class="acc-visa">VISA</span>
            <span class="acc-mc">Mastercard</span>
            <span class="acc-mada">mada</span>
          </div>
        </div>
      </div>
    </div>
  }

  <!-- ── SUCCESS MODAL ──────────────────────────────────────── -->
  @if (showSuccess()) {
    <div class="modal-overlay">
      <div class="success-modal">
        <div class="success-anim">✓</div>
        <h3 class="success-title">Payment Successful!</h3>
        <p class="success-body">
          Welcome to <strong>{{ activatedPlan() }}</strong>!
          Your subscription is now active.
        </p>
        <button class="btn-pay" (click)="closeSuccess()">Continue</button>
      </div>
    </div>
  }

  <!-- ── CANCEL MODAL ──────────────────────────────────────── -->
  @if (showCancel()) {
    <div class="modal-overlay" (click)="showCancel.set(false)">
      <div class="modal-box" (click)="$event.stopPropagation()">
        <div class="modal-icon">⚠️</div>
        <h3 class="modal-title">Cancel Subscription?</h3>
        <p class="modal-body">Your plan stays active until the end of the billing period.</p>
        <div class="modal-actions">
          <button class="btn-secondary" (click)="showCancel.set(false)">Keep Plan</button>
          <button class="btn-danger" [disabled]="cancelling()" (click)="cancelSub()">
            {{ cancelling() ? 'Cancelling…' : 'Yes, Cancel' }}
          </button>
        </div>
      </div>
    </div>
  }

</div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .sub-page { min-height: 100vh; background: #0b1022; padding: 2rem 2rem 4rem; max-width: 1300px; margin: 0 auto; position: relative; }
    .toast { position: fixed; top: 80px; right: 24px; padding: 12px 20px; border-radius: 8px; font-family: 'Rajdhani', sans-serif; font-size: .95rem; font-weight: 600; z-index: 9999; animation: slideIn .25s ease; }
    .toast-ok  { background: #065f46; color: #6ee7b7; border: 1px solid #10b981; }
    .toast-err { background: #7f1d1d; color: #fca5a5; border: 1px solid #ef4444; }
    @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
    .page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
    .page-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: #a855f7; letter-spacing: 2px; margin: 0 0 4px; }
    .page-sub { font-family: 'Rajdhani', sans-serif; color: #6b7280; font-size: .95rem; margin: 0; }
    .header-tabs { display: flex; gap: 4px; background: #111827; border-radius: 10px; padding: 4px; border: 1px solid #1f2937; }
    .tab-btn { font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: .9rem; padding: 8px 20px; border-radius: 8px; border: none; background: transparent; color: #6b7280; cursor: pointer; transition: all .2s; }
    .tab-btn.active { background: #1e2a40; color: #a855f7; }
    .loading-state { display: flex; align-items: center; gap: 12px; padding: 60px 0; justify-content: center; color: #6b7280; font-family: 'Rajdhani', sans-serif; }
    .spinner,.btn-spinner { border-radius: 50%; animation: spin .8s linear infinite; }
    .spinner { width: 24px; height: 24px; border: 3px solid #1f2937; border-top-color: #a855f7; }
    .btn-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid currentColor; border-top-color: transparent; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .current-banner { background: linear-gradient(135deg,#111827,#1a2235); border: 1px solid #1f2937; border-left: 4px solid #a855f7; border-radius: 12px; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
    .current-banner-left { display: flex; align-items: center; gap: 1rem; }
    .current-icon { font-size: 2rem; }
    .current-label { font-family: 'Bebas Neue', sans-serif; font-size: .75rem; letter-spacing: 2px; color: #a855f7; }
    .current-name { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; color: #fff; letter-spacing: 1px; line-height: 1.1; }
    .current-meta { font-family: 'Rajdhani', sans-serif; font-size: .85rem; color: #6b7280; margin-top: 2px; }
    .current-banner-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .status-badge { font-family: 'Rajdhani', sans-serif; font-size: .75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; background: #1f2937; color: #6b7280; }
    .status-badge.active { background: rgba(16,185,129,.15); color: #10b981; }
    .cancel-link { background: none; border: none; color: #ef4444; font-family: 'Rajdhani', sans-serif; font-size: .82rem; cursor: pointer; text-decoration: underline; opacity: .7; }
    .cancel-link:hover { opacity: 1; }
    .plans-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 1.25rem; margin-bottom: 1.5rem; }
    .plan-card { background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 1.75rem 1.5rem; position: relative; transition: transform .2s,border-color .2s,box-shadow .2s; display: flex; flex-direction: column; gap: .75rem; }
    .plan-card:hover { transform: translateY(-4px); border-color: var(--plan-color,#1f2937); box-shadow: 0 12px 40px rgba(0,0,0,.4); }
    .plan-card.highlight { border-color: #a855f7; background: linear-gradient(160deg,#1a2235,#111827); box-shadow: 0 0 30px rgba(168,85,247,.1); }
    .plan-card.current { border-color: var(--plan-color,#a855f7); background: linear-gradient(160deg,#1a2235,#0f1623); }
    .popular-badge,.current-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); font-family: 'Bebas Neue', sans-serif; font-size: .72rem; letter-spacing: 1.5px; padding: 3px 14px; border-radius: 20px; white-space: nowrap; }
    .popular-badge { background: #a855f7; color: #0b1022; }
    .current-badge { background: var(--plan-color,#fbbf24); color: #0b1022; }
    .plan-icon { font-size: 1.8rem; }
    .plan-name { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; color: #fff; letter-spacing: 1px; line-height: 1; }
    .plan-price { display: flex; align-items: baseline; gap: 4px; margin: .25rem 0; }
    .price-free,.price-custom { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--plan-color,#6b7280); }
    .price-amount { font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; color: var(--plan-color,#a855f7); line-height: 1; }
    .price-currency { font-family: 'Rajdhani', sans-serif; font-size: .9rem; color: #9ca3af; font-weight: 600; }
    .price-period { font-family: 'Rajdhani', sans-serif; font-size: .85rem; color: #6b7280; }
    .feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; flex: 1; border-top: 1px solid #1f2937; padding-top: .75rem; }
    .feature-list li { font-family: 'Rajdhani', sans-serif; font-size: .88rem; color: #d1d5db; display: flex; align-items: flex-start; gap: 8px; }
    .feat-check { color: var(--plan-color,#10b981); font-weight: 700; flex-shrink: 0; }
    .plan-cta { margin-top: .5rem; }
    .btn-upgrade,.btn-current { width: 100%; padding: 12px; font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 1px; border-radius: 8px; cursor: pointer; transition: all .2s; }
    .btn-upgrade { border: 2px solid var(--plan-color,#a855f7); background: transparent; color: var(--plan-color,#a855f7); }
    .btn-upgrade:hover:not(:disabled) { background: var(--plan-color,#a855f7); color: #0b1022; }
    .btn-upgrade:disabled { opacity: .5; cursor: not-allowed; }
    .btn-current { border: 2px solid #1f2937; background: #1f2937; color: #6b7280; cursor: not-allowed; }
    .compare-note { font-family: 'Rajdhani', sans-serif; font-size: .88rem; color: #6b7280; text-align: center; padding: 1rem; }
    .invoices-section { margin-top: .5rem; }
    .empty-state { text-align: center; padding: 80px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .empty-icon { font-size: 3rem; opacity: .4; }
    .empty-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: #6b7280; letter-spacing: 1px; }
    .empty-sub { font-family: 'Rajdhani', sans-serif; color: #4b5563; font-size: .9rem; max-width: 400px; }
    .invoice-table { width: 100%; border-collapse: collapse; font-family: 'Rajdhani', sans-serif; }
    .invoice-table th { text-align: left; padding: 12px 16px; font-size: .75rem; letter-spacing: 1.5px; color: #6b7280; border-bottom: 1px solid #1f2937; font-weight: 700; }
    .invoice-table td { padding: 14px 16px; font-size: .92rem; color: #d1d5db; border-bottom: 1px solid #111827; }
    .invoice-table tr:hover td { background: #111827; }
    .inv-status { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: .72rem; font-weight: 700; background: #1f2937; color: #6b7280; }
    .inv-status.paid { background: rgba(16,185,129,.15); color: #10b981; }
    .pdf-link { color: #fbbf24; text-decoration: none; font-size: .85rem; }
    .no-pdf { color: #4b5563; }

    /* ── Payment Modal ── */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.8); backdrop-filter: blur(6px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .payment-modal { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 2rem; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; position: relative; }
    .modal-close { position: absolute; top: 16px; right: 16px; background: #1f2937; border: none; color: #9ca3af; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; }
    .modal-close:hover { background: #374151; color: #fff; }
    .order-summary { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
    .order-icon { font-size: 2.5rem; }
    .order-plan { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: #fff; letter-spacing: 1px; }
    .order-amount { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: #a855f7; }
    .order-period { font-family: 'Rajdhani', sans-serif; font-size: .85rem; color: #6b7280; }
    .divider { height: 1px; background: #1f2937; margin: 0 0 1.5rem; }
    .payment-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-label { font-family: 'Bebas Neue', sans-serif; font-size: .8rem; letter-spacing: 2px; color: #6b7280; }

    /* Card preview */
    .card-preview { width: 100%; height: 180px; perspective: 1000px; margin-bottom: .5rem; }
    .card-front,.card-back { position: absolute; width: 100%; height: 180px; border-radius: 16px; backface-visibility: hidden; transition: transform .6s; padding: 1.25rem; box-sizing: border-box; }
    .card-preview { position: relative; }
    .card-front { background: linear-gradient(135deg,#1e3a5f 0%,#0f2040 60%,#1a1a2e 100%); border: 1px solid rgba(255,255,255,.1); }
    .card-back { background: linear-gradient(135deg,#1a1a2e,#0f2040); transform: rotateY(180deg); }
    .card-preview.flipped .card-front { transform: rotateY(-180deg); }
    .card-preview.flipped .card-back { transform: rotateY(0); }
    .card-chip { font-size: 1.4rem; margin-bottom: .75rem; }
    .card-number-preview { font-family: 'Space Mono', monospace; font-size: 1.1rem; color: #fff; letter-spacing: 3px; margin-bottom: .75rem; opacity: .9; }
    .card-bottom { display: flex; justify-content: space-between; }
    .card-field-label { font-family: 'Rajdhani', sans-serif; font-size: .62rem; letter-spacing: 1.5px; color: rgba(255,255,255,.5); margin-bottom: 2px; }
    .card-field-val { font-family: 'Space Mono', monospace; font-size: .8rem; color: #fff; text-transform: uppercase; }
    .card-logo { position: absolute; top: 1.25rem; right: 1.25rem; }
    .brand-visa { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: #fff; letter-spacing: 2px; font-style: italic; }
    .brand-mc { font-size: 1.4rem; color: #f59e0b; letter-spacing: -4px; }
    .brand-generic { font-size: 1.4rem; }
    .card-strip { background: #000; height: 44px; margin: 0 -1.25rem 1rem; }
    .card-cvv-row { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
    .card-cvv-label { font-family: 'Rajdhani', sans-serif; font-size: .75rem; color: rgba(255,255,255,.5); }
    .card-cvv-box { background: #fff; color: #111; font-family: 'Space Mono', monospace; font-size: .9rem; padding: 4px 12px; border-radius: 4px; letter-spacing: 3px; min-width: 50px; text-align: center; }

    /* Fields */
    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .field-label { font-family: 'Rajdhani', sans-serif; font-size: .78rem; font-weight: 600; letter-spacing: 1px; color: #6b7280; }
    .field-input { background: #0b1022; border: 1px solid #1f2937; border-radius: 8px; padding: 12px 14px; color: #fff; font-family: 'Space Mono', monospace; font-size: .9rem; outline: none; transition: border-color .2s; width: 100%; box-sizing: border-box; }
    .field-input:focus { border-color: #a855f7; }
    .field-input::placeholder { color: #374151; }
    .secure-note { font-family: 'Rajdhani', sans-serif; font-size: .8rem; color: #6b7280; text-align: center; background: rgba(16,185,129,.05); border: 1px solid rgba(16,185,129,.1); border-radius: 8px; padding: 10px; }
    .payment-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); border-radius: 8px; padding: 10px 14px; color: #fca5a5; font-family: 'Rajdhani', sans-serif; font-size: .88rem; }
    .btn-pay { width: 100%; padding: 14px; background: linear-gradient(90deg,#a855f7,#e09400); border: none; border-radius: 10px; color: #0b1022; font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 1.5px; cursor: pointer; transition: opacity .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .btn-pay:hover:not(:disabled) { opacity: .9; }
    .btn-pay:disabled { opacity: .5; cursor: not-allowed; }
    .accepted-cards { display: flex; align-items: center; justify-content: center; gap: 10px; font-family: 'Rajdhani', sans-serif; font-size: .8rem; color: #4b5563; }
    .acc-visa { font-family: 'Bebas Neue', sans-serif; color: #1a56db; font-style: italic; font-size: 1rem; }
    .acc-mc { color: #f59e0b; font-size: .85rem; font-weight: 700; }
    .acc-mada { color: #10b981; font-size: .85rem; font-weight: 700; }

    /* Success Modal */
    .success-modal { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 3rem 2rem; width: 100%; max-width: 420px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .success-anim { width: 72px; height: 72px; background: rgba(16,185,129,.15); border: 2px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #10b981; animation: popIn .4s ease; }
    @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .success-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; letter-spacing: 1px; margin: 0; }
    .success-body { font-family: 'Rajdhani', sans-serif; color: #9ca3af; font-size: .95rem; line-height: 1.6; margin: 0; }
    .success-body strong { color: #a855f7; }

    /* Cancel Modal */
    .modal-box { background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 2rem; max-width: 440px; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 1rem; }
    .modal-icon { font-size: 2.5rem; }
    .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; color: #fff; letter-spacing: 1px; margin: 0; }
    .modal-body { font-family: 'Rajdhani', sans-serif; color: #9ca3af; font-size: .95rem; line-height: 1.6; margin: 0; }
    .modal-actions { display: flex; gap: 12px; justify-content: center; margin-top: .5rem; }
    .btn-secondary { padding: 10px 24px; border: 1px solid #1f2937; background: transparent; color: #9ca3af; font-family: 'Rajdhani', sans-serif; font-weight: 600; border-radius: 8px; cursor: pointer; }
    .btn-secondary:hover { background: #1f2937; }
    .btn-danger { padding: 10px 24px; border: none; background: #ef4444; color: #fff; font-family: 'Rajdhani', sans-serif; font-weight: 700; border-radius: 8px; cursor: pointer; }
    .btn-danger:hover { background: #dc2626; }
    .btn-danger:disabled { opacity: .5; cursor: not-allowed; }

    @media (max-width: 768px) {
      .sub-page { padding: 1rem 1rem 3rem; }
      .plans-grid { grid-template-columns: 1fr; }
      .current-banner,.page-header { flex-direction: column; }
      .current-banner-right { align-items: flex-start; }
      .field-row { grid-template-columns: 1fr; }
    }
  `]
})
export class SubscriptionComponent implements OnInit {
  private api   = inject(ApiService);
  readonly auth = inject(AuthService);

  plans      = signal<SubscriptionPlan[]>([]);
  currentSub = signal<Subscription | null>(null);
  invoices   = signal<Invoice[]>([]);
  loading    = signal(true);
  cancelling = signal(false);
  toast      = signal<{ msg: string; ok: boolean } | null>(null);
  showCancel = signal(false);
  activeTab  = signal<'plans' | 'invoices'>('plans');

  // Payment modal
  showPayment   = signal(false);
  selectedPlan  = signal<SubscriptionPlan | null>(null);
  paying        = signal(false);
  paymentError  = signal<string | null>(null);
  showSuccess   = signal(false);
  activatedPlan = signal('');

  // Card fields
  cardNumber = '';
  cardName   = '';
  cardExpiry = '';
  cardCvv    = '';
  showCvv    = false;

  readonly planMeta: Record<string, { color: string; icon: string; highlight: boolean }> = {
    free:         { color: '#6b7280', icon: '🎮', highlight: false },
    starter:      { color: '#fbbf24', icon: '🚀', highlight: false },
    professional: { color: '#a855f7', icon: '⚡', highlight: true  },
    enterprise:   { color: '#a855f7', icon: '🏆', highlight: false },
  };

  getMeta(key: string) { return this.planMeta[key] ?? this.planMeta['free']; }
  isCurrentPlan(key: string): boolean { return (this.currentSub()?.plan ?? 'free') === key; }

  cardDisplay(): string {
    const n = this.cardNumber.replace(/\s/g, '');
    const padded = n.padEnd(16, '•');
    return padded.match(/.{1,4}/g)?.join(' ') ?? '•••• •••• •••• ••••';
  }

  cardBrand(): string {
    const n = this.cardNumber.replace(/\s/g, '');
    if (n.startsWith('4')) return 'visa';
    if (n.startsWith('5') || n.startsWith('2')) return 'mc';
    return 'generic';
  }

  onCardNumber(e: Event): void {
    const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16);
    this.cardNumber = raw.match(/.{1,4}/g)?.join(' ') ?? raw;
    (e.target as HTMLInputElement).value = this.cardNumber;
  }

  onExpiry(e: Event): void {
    let val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
    this.cardExpiry = val;
    (e.target as HTMLInputElement).value = val;
  }

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.loading.set(true);
    this.api.getSubscription().pipe(catchError(() => of({ data: null }))).subscribe(r => {
      this.currentSub.set(r.data);
    });
    this.api.getSubscriptionPlans().pipe(catchError(() => of({ data: [] as SubscriptionPlan[] }))).subscribe(r => {
      this.plans.set(r.data ?? []);
      this.loading.set(false);
    });
    this.api.getInvoices().pipe(catchError(() => of({ data: [] as Invoice[], meta: null as any, links: null as any }))).subscribe(r => {
      this.invoices.set(r.data ?? []);
    });
  }

  openPayment(plan: SubscriptionPlan): void {
    this.selectedPlan.set(plan);
    this.paymentError.set(null);
    this.cardNumber = ''; this.cardName = ''; this.cardExpiry = ''; this.cardCvv = '';
    this.showPayment.set(true);
  }

  closePayment(): void { this.showPayment.set(false); this.selectedPlan.set(null); }

  processPayment(): void {
    const plan = this.selectedPlan();
    if (!plan) return;

    // Basic validation
    const rawNum = this.cardNumber.replace(/\s/g, '');
    if (rawNum.length < 13) { this.paymentError.set('Please enter a valid card number.'); return; }
    if (!this.cardName.trim()) { this.paymentError.set('Please enter the cardholder name.'); return; }
    if (this.cardExpiry.length < 5) { this.paymentError.set('Please enter a valid expiry date.'); return; }
    if (this.cardCvv.length < 3) { this.paymentError.set('Please enter a valid CVV.'); return; }

    this.paymentError.set(null);
    this.paying.set(true);

    // Simulate payment processing (2s delay) then subscribe
    setTimeout(() => {
      this.api.subscribeToPlan(plan.key).pipe(
        catchError(err => {
          this.paymentError.set(err?.error?.message ?? 'Payment failed. Please try again.');
          this.paying.set(false);
          return of(null);
        })
      ).subscribe(res => {
        this.paying.set(false);
        if (res) {
          this.closePayment();
          this.activatedPlan.set(plan.name);
          this.showSuccess.set(true);
          this.loadAll();
        }
      });
    }, 2000);
  }

  closeSuccess(): void { this.showSuccess.set(false); }

  cancelSub(): void {
    this.cancelling.set(true);
    this.api.cancelSubscription().pipe(
      catchError(err => { this.notify(err?.error?.message ?? 'Could not cancel.', false); this.cancelling.set(false); return of(null); })
    ).subscribe(res => {
      if (res) { this.currentSub.set(null); this.notify('Subscription cancelled.', true); this.showCancel.set(false); }
      this.cancelling.set(false);
    });
  }

  contactSales(): void { window.open('mailto:sales@dawri.gg?subject=Enterprise Plan Inquiry', '_blank'); }

  getToken(): string {
    return localStorage.getItem('dawri_token') ?? '';
  }

  formatDate(iso: string | null): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  private notify(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3500);
  }
}
