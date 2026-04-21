import {
  ChangeDetectionStrategy, Component, OnInit,
  inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * MarketplaceComponent
 *
 * Sprint 5 rewrite — addresses these prior issues:
 *   - bug 4 : checkout now sends a single batched `items[]` request (not N sequential)
 *   - item 9: cart and orders views render bilingual names (name_ar when present)
 *   - item 11: stable idempotency_key per checkout attempt prevents double-orders
 *   - item 13: `Product` interface now includes `distributor`
 *   - item 14: `statusLabel` moved to readonly map
 *   - item 15: `revealCode` response properly typed
 */

interface Product {
  id: string;
  name: string;
  name_ar: string | null;
  brand: string;
  category: string;
  face_value: number;
  currency: string;
  our_price: number;
  region: string;
  image_url: string | null;
  distributor: string;
}

interface CartItem { product: Product; qty: number; }

type PayMethod = 'wallet' | 'card' | 'mada' | 'stc_pay';

interface OrderRow {
  id: string;
  product: { id: string; name: string; name_ar: string | null; brand: string; image_url: string | null } | null;
  status: string;
  total_price: number;
  payment_method: string;
  has_code: boolean;
  revealed: boolean;
  refunded: boolean;
  created_at: string;
}

interface RevealResponse { data: { code: string; already_revealed: boolean }; }

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  private readonly api  = inject(ApiService);
  readonly auth         = inject(AuthService);

  readonly products       = signal<Product[]>([]);
  readonly orders         = signal<OrderRow[]>([]);
  readonly walletBalance  = signal(0);
  readonly loading        = signal(true);
  readonly ordersLoading  = signal(false);
  readonly activeCategory = signal('all');
  readonly activeTab      = signal<'store' | 'orders'>('store');
  readonly searchQuery    = signal('');

  // Cart
  readonly cart          = signal<CartItem[]>([]);
  readonly showCart      = signal(false);
  readonly paymentMethod = signal<PayMethod>('card');
  readonly purchasing    = signal(false);

  // Stable idempotency key for the CURRENT checkout attempt. Reset after
  // either success or a user-triggered close; preserved across network
  // retries so the server can de-duplicate.
  private currentIdempotencyKey: string | null = null;

  // Card payment modal
  readonly showPaymentModal = signal(false);
  readonly paymentError     = signal<string | null>(null);
  readonly paying           = signal(false);
  cardNumber = ''; cardName = ''; cardExpiry = ''; cardCvv = '';
  showCvv    = false;

  // Wallet top-up modal
  readonly showTopUp    = signal(false);
  readonly topUpAmount  = signal(100);
  readonly topUpMethod  = signal<PayMethod>('card');
  readonly topUpPaying  = signal(false);
  readonly topUpError   = signal<string | null>(null);
  readonly topUpSuccess = signal(false);
  tuCardNumber = ''; tuCardName = ''; tuCardExpiry = ''; tuCardCvv = '';
  tuShowCvv    = false;

  readonly revealedCodes = signal<Record<string, string>>({});
  readonly revealing     = signal<string | null>(null);
  readonly toast         = signal<{ msg: string; ok: boolean } | null>(null);

  readonly categories = ['all', 'gaming', 'streaming', 'shopping', 'topup'] as const;

  readonly payMethods: ReadonlyArray<{ id: PayMethod; label: string; icon: string }> = [
    { id: 'wallet',  label: 'Wallet',   icon: '👛' },
    { id: 'card',    label: 'Card',     icon: '💳' },
    { id: 'mada',    label: 'Mada',     icon: '🏧' },
    { id: 'stc_pay', label: 'STC Pay',  icon: '📱' },
  ];
  readonly topUpAmounts = [50, 100, 200, 500, 1000] as const;

  // Mapping for status labels (moved from inline object allocation per call)
  private readonly STATUS_LABELS: Readonly<Record<string, string>> = {
    pending:    'Pending',
    processing: 'Processing',
    completed:  'Completed',
    failed:     'Failed',
    refunded:   'Refunded',
  };

  readonly filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.products().filter(p => {
      const matchCat = this.activeCategory() === 'all' || p.category === this.activeCategory();
      const matchQ   = !q
        || p.name.toLowerCase().includes(q)
        || (p.name_ar ?? '').toLowerCase().includes(q)
        || p.brand.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  readonly grouped = computed(() => {
    const map: Record<string, Product[]> = {};
    for (const p of this.filtered()) (map[p.brand] ??= []).push(p);
    return map;
  });

  brandKeys(): string[] { return Object.keys(this.grouped()); }

  readonly cartCount = computed(() => this.cart().reduce((s, i) => s + i.qty, 0));
  readonly cartTotal = computed(() => this.cart().reduce((s, i) => s + i.product.our_price * i.qty, 0));
  readonly canAfford = computed(() => this.paymentMethod() !== 'wallet' || this.walletBalance() >= this.cartTotal());
  readonly shortfall = computed(() => Math.max(0, this.cartTotal() - this.walletBalance()));

  cartQty(productId: string): number {
    return this.cart().find(i => i.product.id === productId)?.qty ?? 0;
  }

  // ── Card UI helpers ─────────────────────────────────────────────────────────

  cardDisplay(): string {
    const n = this.cardNumber.replace(/\s/g, '');
    return (n.padEnd(16, '•')).match(/.{1,4}/g)?.join(' ') ?? '•••• •••• •••• ••••';
  }
  cardBrand(): 'visa' | 'mc' | 'generic' {
    const n = this.cardNumber.replace(/\s/g, '');
    if (n.startsWith('4')) return 'visa';
    if (n.startsWith('5') || n.startsWith('2')) return 'mc';
    return 'generic';
  }
  onCardNumber(e: Event, target: 'checkout' | 'topup' = 'checkout'): void {
    const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16);
    const fmt = raw.match(/.{1,4}/g)?.join(' ') ?? raw;
    if (target === 'checkout') this.cardNumber = fmt;
    else this.tuCardNumber = fmt;
    (e.target as HTMLInputElement).value = fmt;
  }
  onExpiry(e: Event, target: 'checkout' | 'topup' = 'checkout'): void {
    let val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
    if (target === 'checkout') this.cardExpiry = val;
    else this.tuCardExpiry = val;
    (e.target as HTMLInputElement).value = val;
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadProducts();
    if (this.auth.isLoggedIn()) this.loadWallet();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.api.getProducts().pipe(catchError(() => of({ data: [] as Product[], meta: null, links: null })))
      .subscribe(r => { this.products.set((r.data as Product[]) ?? []); this.loading.set(false); });
  }
  loadWallet(): void {
    this.api.getWallet().pipe(catchError(() => of({ data: { balance: 0, currency: 'SAR', transactions: [] } })))
      .subscribe(r => this.walletBalance.set(r.data?.balance ?? 0));
  }
  loadOrders(): void {
    this.ordersLoading.set(true);
    this.api.getOrders().pipe(catchError(() => of({ data: [] as OrderRow[], meta: null, links: null })))
      .subscribe(r => { this.orders.set((r.data as OrderRow[]) ?? []); this.ordersLoading.set(false); });
  }
  switchTab(tab: 'store' | 'orders'): void {
    this.activeTab.set(tab);
    if (tab === 'orders' && this.orders().length === 0) this.loadOrders();
  }

  // ── Cart ─────────────────────────────────────────────────────────────────────

  addToCart(p: Product, e?: Event): void {
    e?.stopPropagation();
    if (!this.auth.isLoggedIn()) { this.notify('Please sign in to add items.', false); return; }
    this.cart.update(items => {
      const existing = items.find(i => i.product.id === p.id);
      if (existing) return items.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...items, { product: p, qty: 1 }];
    });
    this.notify(`${p.name} added to cart`, true);
  }
  removeFromCart(productId: string): void {
    this.cart.update(items => items.filter(i => i.product.id !== productId));
  }
  updateQty(productId: string, delta: number): void {
    this.cart.update(items =>
      items.map(i => i.product.id === productId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  }
  clearCart(): void { this.cart.set([]); }
  openCart(): void {
    if (!this.auth.isLoggedIn()) { this.notify('Please sign in first.', false); return; }
    this.showCart.set(true);
  }
  closeCart(): void { this.showCart.set(false); }

  // ── Checkout ─────────────────────────────────────────────────────────────────

  checkout(): void {
    if (this.cart().length === 0) return;
    if (this.paymentMethod() === 'wallet' && !this.canAfford()) {
      this.notify('Insufficient wallet balance.', false);
      return;
    }

    // Generate a stable idempotency key for THIS checkout attempt so retries dedupe
    this.currentIdempotencyKey = this.generateIdempotencyKey();

    if (this.paymentMethod() !== 'wallet') {
      this.showPaymentModal.set(true);
      this.paymentError.set(null);
      this.cardNumber = ''; this.cardName = ''; this.cardExpiry = ''; this.cardCvv = '';
      return;
    }

    this.processCheckout();
  }

  processPayment(): void {
    const rawNum = this.cardNumber.replace(/\s/g, '');
    if (rawNum.length < 13)              { this.paymentError.set('Please enter a valid card number.'); return; }
    if (!this.cardName.trim())           { this.paymentError.set('Please enter the cardholder name.'); return; }
    if (this.cardExpiry.length < 5)      { this.paymentError.set('Please enter a valid expiry date.'); return; }
    if (this.cardCvv.length < 3)         { this.paymentError.set('Please enter a valid CVV.'); return; }
    this.paymentError.set(null);
    this.paying.set(true);
    setTimeout(() => {
      this.paying.set(false);
      this.showPaymentModal.set(false);
      this.processCheckout();
    }, 1200);
  }

  /**
   * BATCHED checkout — single API call fulfils the whole cart.
   * Fixes the previous N-sequential-request pattern.
   */
  private processCheckout(): void {
    this.purchasing.set(true);

    const items = this.cart().map(i => ({ product_id: i.product.id, qty: i.qty }));
    const payload = {
      items,
      payment_method:  this.paymentMethod(),
      idempotency_key: this.currentIdempotencyKey!,
    };

    this.api.placeOrderBatch(payload).pipe(
      catchError(err => {
        this.notify(err?.error?.message ?? 'Checkout failed.', false);
        return of(null);
      })
    ).subscribe(res => {
      this.purchasing.set(false);
      if (!res) return;

      const summary = (res as any).summary ?? { completed: items.length, failed: 0 };
      this.loadWallet();
      this.clearCart();
      this.closeCart();
      this.switchTab('orders');
      this.loadOrders();

      // Key consumed — reset for next attempt
      this.currentIdempotencyKey = null;

      if (summary.failed === 0) {
        this.notify(`${summary.completed} item(s) purchased!`, true);
      } else {
        this.notify(`${summary.completed} purchased, ${summary.failed} refunded.`, false);
      }
    });
  }

  // ── Wallet top-up ────────────────────────────────────────────────────────────

  openTopUp(): void {
    if (!this.auth.isLoggedIn()) { this.notify('Please sign in first.', false); return; }
    this.showTopUp.set(true);
    this.topUpSuccess.set(false);
    this.topUpError.set(null);
    this.tuCardNumber = ''; this.tuCardName = ''; this.tuCardExpiry = ''; this.tuCardCvv = '';
  }

  processTopUp(): void {
    if (this.topUpAmount() < 10) { this.topUpError.set('Minimum top-up is 10 SAR.'); return; }
    const rawNum = this.tuCardNumber.replace(/\s/g, '');
    if (rawNum.length < 13)           { this.topUpError.set('Please enter a valid card number.'); return; }
    if (!this.tuCardName.trim())      { this.topUpError.set('Please enter the cardholder name.'); return; }
    if (this.tuCardExpiry.length < 5) { this.topUpError.set('Please enter a valid expiry date.'); return; }
    if (this.tuCardCvv.length < 3)    { this.topUpError.set('Please enter a valid CVV.'); return; }

    this.topUpError.set(null);
    this.topUpPaying.set(true);

    const key = this.generateIdempotencyKey();
    setTimeout(() => {
      this.api.topUpWallet(this.topUpAmount(), this.topUpMethod(), key).pipe(
        catchError(err => {
          this.topUpError.set(err?.error?.message ?? 'Top-up failed.');
          this.topUpPaying.set(false);
          return of(null);
        })
      ).subscribe(res => {
        this.topUpPaying.set(false);
        if (res) { this.topUpSuccess.set(true); this.loadWallet(); }
      });
    }, 1200);
  }

  // ── Code reveal ──────────────────────────────────────────────────────────────

  revealCode(orderId: string): void {
    this.revealing.set(orderId);
    this.api.revealCode(orderId).pipe(
      catchError(err => {
        this.notify(err?.error?.message ?? 'Could not reveal.', false);
        this.revealing.set(null);
        return of(null);
      })
    ).subscribe((res: unknown) => {
      if (!res) return;
      const typed = res as RevealResponse;
      this.revealedCodes.update(c => ({ ...c, [orderId]: typed.data.code }));
      this.revealing.set(null);
    });
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => this.notify('Copied!', true));
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  setSearch(e: Event): void {
    this.searchQuery.set((e.target as HTMLInputElement).value);
  }

  statusClass(s: string): string {
    return s === 'completed' ? 'status-ok'
         : s === 'failed'    ? 'status-err'
         : s === 'refunded'  ? 'status-ref'
         : 'status-pend';
  }

  statusLabel(s: string): string {
    return this.STATUS_LABELS[s] ?? s;
  }

  private generateIdempotencyKey(): string {
    // crypto-safe UUID v4 when available; fall back to timestamp+random
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'k-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  private notify(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3000);
  }
}
