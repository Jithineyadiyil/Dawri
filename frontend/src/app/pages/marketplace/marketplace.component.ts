import {
  ChangeDetectionStrategy, Component, OnInit,
  inject, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';

interface Product {
  id: string; name: string; name_ar: string | null;
  brand: string; category: string;
  face_value: number; currency: string; our_price: number;
  region: string; image_url: string | null;
}

interface CartItem { product: Product; qty: number; }

type PayMethod = 'wallet' | 'card' | 'mada' | 'stc_pay';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  private api   = inject(ApiService);
  readonly auth = inject(AuthService);

  products      = signal<Product[]>([]);
  orders        = signal<any[]>([]);
  walletBalance = signal(0);
  loading       = signal(true);
  ordersLoading = signal(false);
  activeCategory = signal('all');
  activeTab     = signal<'store' | 'orders'>('store');
  searchQuery   = signal('');

  // Cart
  cart         = signal<CartItem[]>([]);
  showCart     = signal(false);
  paymentMethod = signal<PayMethod>('card');
  purchasing   = signal(false);

  // Payment modal
  showPaymentModal = signal(false);
  paymentError     = signal<string | null>(null);
  paying           = signal(false);
  cardNumber = ''; cardName = ''; cardExpiry = ''; cardCvv = '';
  showCvv    = false;

  // Wallet top-up modal
  showTopUp     = signal(false);
  topUpAmount   = signal(100);
  topUpMethod   = signal<PayMethod>('card');
  topUpPaying   = signal(false);
  topUpError    = signal<string | null>(null);
  topUpSuccess  = signal(false);
  tuCardNumber = ''; tuCardName = ''; tuCardExpiry = ''; tuCardCvv = '';
  tuShowCvv    = false;

  revealedCodes = signal<Record<string, string>>({});
  revealing     = signal<string | null>(null);
  toast         = signal<{ msg: string; ok: boolean } | null>(null);

  readonly categories = ['all', 'gaming', 'streaming', 'shopping', 'topup'];
  readonly payMethods: { id: PayMethod; label: string; icon: string }[] = [
    { id: 'wallet',  label: 'Wallet',   icon: '👛' },
    { id: 'card',    label: 'Card',     icon: '💳' },
    { id: 'mada',    label: 'Mada',     icon: '🏧' },
    { id: 'stc_pay', label: 'STC Pay',  icon: '📱' },
  ];
  readonly topUpAmounts = [50, 100, 200, 500, 1000];

  filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.products().filter(p => {
      const matchCat = this.activeCategory() === 'all' || p.category === this.activeCategory();
      const matchQ   = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  grouped = computed(() => {
    const map: Record<string, Product[]> = {};
    for (const p of this.filtered()) (map[p.brand] ??= []).push(p);
    return map;
  });

  brandKeys(): string[] { return Object.keys(this.grouped()); }
  cartCount  = computed(() => this.cart().reduce((s, i) => s + i.qty, 0));
  cartTotal  = computed(() => this.cart().reduce((s, i) => s + i.product.our_price * i.qty, 0));
  canAfford  = computed(() => this.paymentMethod() !== 'wallet' || this.walletBalance() >= this.cartTotal());
  shortfall  = computed(() => Math.max(0, this.cartTotal() - this.walletBalance()));
  cartQty(productId: string): number { return this.cart().find(i => i.product.id === productId)?.qty ?? 0; }

  // Card display helpers
  cardDisplay(): string {
    const n = this.cardNumber.replace(/\s/g, '');
    return (n.padEnd(16, '•')).match(/.{1,4}/g)?.join(' ') ?? '•••• •••• •••• ••••';
  }
  cardBrand(): string {
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

  ngOnInit(): void {
    this.loadProducts();
    if (this.auth.isLoggedIn()) this.loadWallet();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.api.getProducts().pipe(catchError(() => of({ data: [] as any[], meta: null as any, links: null as any })))
      .subscribe(r => { this.products.set(r.data); this.loading.set(false); });
  }

  loadWallet(): void {
    this.api.getWallet().pipe(catchError(() => of({ data: { balance: 0, currency: 'SAR', transactions: [] } })))
      .subscribe(r => this.walletBalance.set(r.data?.balance ?? 0));
  }

  loadOrders(): void {
    this.ordersLoading.set(true);
    this.api.getOrders().pipe(catchError(() => of({ data: [] as any[], meta: null as any, links: null as any })))
      .subscribe(r => { this.orders.set(r.data); this.ordersLoading.set(false); });
  }

  switchTab(tab: 'store' | 'orders'): void {
    this.activeTab.set(tab);
    if (tab === 'orders' && this.orders().length === 0) this.loadOrders();
  }

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

  removeFromCart(productId: string): void { this.cart.update(items => items.filter(i => i.product.id !== productId)); }
  updateQty(productId: string, delta: number): void {
    this.cart.update(items => items.map(i => i.product.id === productId ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }
  clearCart(): void { this.cart.set([]); }
  openCart(): void {
    if (!this.auth.isLoggedIn()) { this.notify('Please sign in first.', false); return; }
    this.showCart.set(true);
  }
  closeCart(): void { this.showCart.set(false); }

  // ── Checkout ──────────────────────────────────────────────────────────────
  checkout(): void {
    if (this.cart().length === 0) return;
    if (this.paymentMethod() === 'wallet' && !this.canAfford()) {
      this.notify('Insufficient wallet balance.', false); return;
    }
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
    if (rawNum.length < 13) { this.paymentError.set('Please enter a valid card number.'); return; }
    if (!this.cardName.trim()) { this.paymentError.set('Please enter the cardholder name.'); return; }
    if (this.cardExpiry.length < 5) { this.paymentError.set('Please enter a valid expiry date.'); return; }
    if (this.cardCvv.length < 3) { this.paymentError.set('Please enter a valid CVV.'); return; }
    this.paymentError.set(null);
    this.paying.set(true);
    setTimeout(() => { this.paying.set(false); this.showPaymentModal.set(false); this.processCheckout(); }, 2000);
  }

  private processCheckout(): void {
    this.purchasing.set(true);
    const items = this.cart();
    let completed = 0, failed = 0;
    const purchaseNext = (index: number) => {
      if (index >= items.length) {
        this.purchasing.set(false);
        this.loadWallet();
        if (failed === 0) {
          this.notify(`${completed} item(s) purchased!`, true);
          this.clearCart(); this.closeCart(); this.switchTab('orders');
        } else {
          this.notify(`${completed} purchased, ${failed} failed.`, false);
        }
        return;
      }
      const item = items[index];
      const purchaseQty = (qtyLeft: number) => {
        if (qtyLeft === 0) { purchaseNext(index + 1); return; }
        this.api.purchaseProduct(item.product.id).pipe(catchError(() => { failed++; return of(null); }))
          .subscribe(res => { if (res) completed++; purchaseQty(qtyLeft - 1); });
      };
      purchaseQty(item.qty);
    };
    purchaseNext(0);
  }

  // ── Wallet Top-Up ─────────────────────────────────────────────────────────
  openTopUp(): void {
    if (!this.auth.isLoggedIn()) { this.notify('Please sign in first.', false); return; }
    this.showTopUp.set(true);
    this.topUpSuccess.set(false);
    this.topUpError.set(null);
    this.tuCardNumber = ''; this.tuCardName = ''; this.tuCardExpiry = ''; this.tuCardCvv = '';
  }

  processTopUp(): void {
    if (this.topUpAmount() < 10) { this.topUpError.set('Minimum top-up is 10 SAR.'); return; }
    if (this.topUpMethod() !== 'wallet') {
      const rawNum = this.tuCardNumber.replace(/\s/g, '');
      if (rawNum.length < 13) { this.topUpError.set('Please enter a valid card number.'); return; }
      if (!this.tuCardName.trim()) { this.topUpError.set('Please enter the cardholder name.'); return; }
      if (this.tuCardExpiry.length < 5) { this.topUpError.set('Please enter a valid expiry date.'); return; }
      if (this.tuCardCvv.length < 3) { this.topUpError.set('Please enter a valid CVV.'); return; }
    }
    this.topUpError.set(null);
    this.topUpPaying.set(true);
    setTimeout(() => {
      this.api.topUpWallet(this.topUpAmount(), this.topUpMethod()).pipe(
        catchError(err => { this.topUpError.set(err?.error?.message ?? 'Top-up failed.'); this.topUpPaying.set(false); return of(null); })
      ).subscribe(res => {
        this.topUpPaying.set(false);
        if (res) { this.topUpSuccess.set(true); this.loadWallet(); }
      });
    }, 2000);
  }

  // ── Code reveal ──────────────────────────────────────────────────────────
  revealCode(orderId: string): void {
    this.revealing.set(orderId);
    this.api.revealCode(orderId).pipe(
      catchError(err => { this.notify(err?.error?.message ?? 'Could not reveal.', false); this.revealing.set(null); return of(null); })
    ).subscribe(res => {
      if (!res) return;
      this.revealedCodes.update(c => ({ ...c, [orderId]: (res as any).data?.code }));
      this.revealing.set(null);
    });
  }

  copyCode(code: string): void { navigator.clipboard.writeText(code).then(() => this.notify('Copied!', true)); }
  setSearch(e: Event): void { this.searchQuery.set((e.target as HTMLInputElement).value); }
  statusClass(s: string): string { return s === 'completed' ? 'status-ok' : s === 'failed' ? 'status-err' : 'status-pend'; }
  statusLabel(s: string): string { return ({ pending:'Pending', processing:'Processing', completed:'Completed', failed:'Failed', refunded:'Refunded' })[s] ?? s; }

  private notify(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3000);
  }
}
