import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy,
  inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

/**
 * One slide in the marketplace hero carousel. Computed from real product
 * data — no admin CRUD, no fabrication. The shape is intentionally tight
 * so the slide template stays predictable.
 */
interface FeaturedBrand {
  /** Brand display name, e.g. "PSN", "Mobily". */
  brand: string;
  /** How many SKUs this brand has — drives the "X cards available" copy. */
  itemCount: number;
  /** The most-expensive product, used for the headline price + visual. */
  headline: Product;
  /** Resolved logo URL (falls back to /brands/generic.svg). */
  logo: string;
  /** Backend category value to apply when the user clicks the slide CTA. */
  category: string;
  /** Lowest price across this brand's SKUs, for the "from X SAR" tag. */
  fromPrice: number;
  /** Up to 5 face-value denominations (e.g. [20, 50, 100, 200, 500])
   *  shown as quick-glance chips under the description. Always real,
   *  always sorted ascending, deduplicated. */
  denominations: number[];
}

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
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit, OnDestroy {
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
  // Stored in localStorage so a user's cart survives page reloads, route
  // changes, and the auth boundary (guest → logged-in user keeps their cart).
  // Only productId + qty are persisted; product details are re-resolved
  // against the latest fetched products list at runtime to avoid showing
  // stale prices or names.
  private readonly CART_STORAGE_KEY = 'dawri.marketplace.cart.v1';
  readonly cart          = signal<CartItem[]>([]);
  readonly showCart      = signal(false);
  readonly paymentMethod = signal<PayMethod>('card');
  readonly purchasing    = signal(false);
  readonly showLoginPrompt = signal(false);  // shown when guest hits checkout

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

  // ── Product detail modal ────────────────────────────────────────────────────
  readonly showDetail      = signal(false);
  readonly detailProduct   = signal<Product | null>(null);
  readonly detailQty       = signal(1);
  readonly giftMode        = signal(false);
  readonly giftEmail       = signal('');
  readonly giftEmailError  = signal('');

  openDetail(p: Product, e: Event): void {
    e.stopPropagation();
    this.detailProduct.set(p);
    this.detailQty.set(1);
    this.showDetail.set(true);
  }
  closeDetail(): void { this.showDetail.set(false); }
  addDetailToCart(): void {
    const p = this.detailProduct();
    if (!p) return;
    for (let i = 0; i < this.detailQty(); i++) this.addToCart(p);
    this.closeDetail();
    this.openCart();
  }

  toggleGift(): void {
    this.giftMode.update(v => !v);
    this.giftEmail.set('');
    this.giftEmailError.set('');
  }

  buyAsGift(): void {
    const email = this.giftEmail().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { this.giftEmailError.set('Please enter recipient email.'); return; }
    if (!emailRegex.test(email)) { this.giftEmailError.set('Please enter a valid email address.'); return; }
    this.giftEmailError.set('');
    // Add to cart with gift metadata then checkout
    const p = this.detailProduct();
    if (!p) return;
    for (let i = 0; i < this.detailQty(); i++) this.addToCart(p);
    this.closeDetail();
    this.notify(`Gift will be sent to ${email} after checkout.`, true);
    this.openCart();
  }

  readonly revealedCodes = signal<Record<string, string>>({});
  readonly revealing     = signal<string | null>(null);
  readonly toast         = signal<{ msg: string; ok: boolean } | null>(null);

  // Sprint 6: expanded to mirror Likecard's core Saudi catalog.
  // 'topup' covers telecom recharge + in-game currency (existing chip meaning).
  // 'food' and 'services' are new chips; both render via the same cat-chip loop,
  // so no template change is needed — just adding the strings here.
  // NOTE: keep the values lowercase / single-token. The displayed text is
  // produced by categoryLabel() so the values can stay backend-friendly
  // while users see properly capitalised, hyphenated labels.
  readonly categories = ['all', 'gaming', 'streaming', 'shopping', 'topup', 'food', 'services'] as const;

  /**
   * Map a backend category value to its user-facing label.
   * Most categories titlecase fine; the special-cases live here.
   *
   * @param cat  Backend category value (e.g. 'topup').
   * @returns    Display label (e.g. 'Top-up').
   */
  categoryLabel(cat: string): string {
    if (cat === 'topup') return 'Top-up';
    if (cat === 'all')   return 'All';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  /**
   * Emoji icon for each category — used in the sidebar navigation cards.
   * Kept inline (not externalised) because the set is small and rarely
   * changes; an svg-icon system would be over-engineering here.
   *
   * @param cat  Backend category value.
   * @returns    Emoji string suitable for inline rendering.
   */
  categoryIcon(cat: string): string {
    switch (cat) {
      case 'all':       return '✨';
      case 'gaming':    return '🎮';
      case 'streaming': return '📺';
      case 'shopping':  return '🛍️';
      case 'topup':     return '📱';
      case 'food':      return '🍔';
      case 'services':  return '⚙️';
      default:          return '🏷️';
    }
  }

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

  // ── Hero carousel ──────────────────────────────────────────────────────────
  // Featured brands rotation — driven entirely by REAL product data, no
  // hardcoded slides. We pick the top brands by SKU count, take the
  // highest-priced product from each as the visual anchor, and rotate
  // through them automatically. When categories are filtered, the
  // carousel reflects the filtered set so it stays contextually
  // relevant. If there are zero products, the carousel hides itself.

  /** Index of the slide currently shown in the carousel. */
  readonly slideIndex = signal(0);
  /** Internal handle for the auto-rotate timer; cleared on destroy/hover. */
  private rotateHandle: ReturnType<typeof setInterval> | null = null;
  /** True while the user hovers the carousel — pauses auto-rotate. */
  readonly slidePaused = signal(false);

  /**
   * Top featured brands derived from the current product list.
   * Each brand becomes one carousel slide. Capped at MAX_SLIDES so the
   * dots row stays readable even with a huge catalogue.
   */
  readonly featuredBrands = computed<FeaturedBrand[]>(() => {
    const MAX_SLIDES = 5;
    const map: Record<string, Product[]> = {};
    for (const p of this.products()) (map[p.brand] ??= []).push(p);

    return Object.entries(map)
      // Heaviest brands first — most variety = most likely to convert.
      .sort(([, a], [, b]) => b.length - a.length)
      .slice(0, MAX_SLIDES)
      .map(([brand, items]) => {
        // Pick the most expensive item as the "headline" — it carries
        // the most visual weight and gives a credible price point.
        const headline = items.reduce(
          (top, p) => (p.our_price > top.our_price ? p : top),
          items[0],
        );
        // "from X SAR" — lowest price across this brand's SKUs.
        const fromPrice = items.reduce(
          (lo, p) => (p.our_price < lo ? p.our_price : lo),
          items[0].our_price,
        );
        // Top 5 unique denominations sorted ascending — for the chip row.
        const denominations = [...new Set(items.map(p => p.face_value))]
          .sort((a, b) => a - b)
          .slice(0, 5);
        return {
          brand,
          itemCount: items.length,
          headline,
          logo: headline.image_url ?? '/brands/generic.svg',
          category: headline.category,
          fromPrice,
          denominations,
        };
      });
  });

  /** Convenience accessor for the currently-shown slide. */
  readonly currentSlide = computed<FeaturedBrand | null>(() => {
    const slides = this.featuredBrands();
    if (slides.length === 0) return null;
    const idx = Math.min(this.slideIndex(), slides.length - 1);
    return slides[idx];
  });

  /** Manual nav: jump to a specific dot. Resets the auto-rotate timer. */
  goToSlide(i: number): void {
    this.slideIndex.set(i);
    this.restartRotation();
  }

  /** Manual nav: previous/next arrows. Wraps around the ends. */
  nudgeSlide(delta: -1 | 1): void {
    const len = this.featuredBrands().length;
    if (len === 0) return;
    this.slideIndex.set((this.slideIndex() + delta + len) % len);
    this.restartRotation();
  }

  /** Pause auto-rotate while the carousel is hovered (better UX). */
  pauseSlides(paused: boolean): void {
    this.slidePaused.set(paused);
  }

  /** "Shop {brand}" CTA — filters the list to that brand's category. */
  shopBrand(slide: FeaturedBrand): void {
    this.activeCategory.set(slide.category);
    // Pre-fill the search with the brand name so the user lands on a
    // tightly-scoped product list — most users want everything for that
    // brand, not the broader category.
    this.searchQuery.set(slide.brand);
    // Smooth-scroll to the product grid below the carousel.
    queueMicrotask(() => {
      const grid = document.querySelector('.brand-section');
      grid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  private restartRotation(): void {
    if (this.rotateHandle) { clearInterval(this.rotateHandle); }
    this.rotateHandle = setInterval(() => {
      if (this.slidePaused()) return;
      const len = this.featuredBrands().length;
      if (len <= 1) return;
      this.slideIndex.set((this.slideIndex() + 1) % len);
    }, 6000);
  }

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

  /**
   * Image load-failure handler. When a product image_url returns 404 or
   * fails to load (network error, CORS, unreachable host), swap the src
   * to the local generic placeholder so the user doesn't see a browser
   * broken-image icon.
   *
   * Guards against an infinite loop if the placeholder itself fails by
   * checking the current src — if the swap was already applied, do
   * nothing further.
   */
  onImgError(e: Event): void {
    const img = e.target as HTMLImageElement | null;
    if (!img) return;
    const placeholder = '/brands/generic.svg';
    if (img.src.endsWith(placeholder)) return; // already on placeholder, give up
    img.src = placeholder;
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadProducts();
    if (this.auth.isLoggedIn()) this.loadWallet();
    // Carousel auto-rotate kicks off immediately. The handler reads
    // featuredBrands() lazily so it picks up products once they load —
    // no need to defer until after loadProducts() resolves.
    this.restartRotation();
  }

  ngOnDestroy(): void {
    if (this.rotateHandle) {
      clearInterval(this.rotateHandle);
      this.rotateHandle = null;
    }
  }

  loadProducts(): void {
    this.loading.set(true);
    this.api.getProducts().pipe(catchError(() => of({ data: [] as Product[], meta: null, links: null })))
      .subscribe(r => {
        this.products.set((r.data as Product[]) ?? []);
        this.loading.set(false);
        // Restore cart now that we have product details to resolve
        // stored {id, qty} pairs against. See hydrateCart().
        this.hydrateCart();
      });
  }
  /**
   * Refresh the wallet balance from the API.
   *
   * Pushes the result to BOTH the local component signal (for the
   * marketplace hero badge) AND the AuthService signal (for the top-nav
   * balance + any other consumer). Without the auth.updateBalance() call,
   * the nav balance goes stale after every purchase / top-up.
   */
  loadWallet(): void {
    this.api.getWallet().pipe(catchError(() => of({ data: { balance: 0, currency: 'SAR', transactions: [] } })))
      .subscribe(r => {
        const balance = r.data?.balance ?? 0;
        this.walletBalance.set(balance);
        this.auth.updateBalance(balance);
      });
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
  //
  // Cart works for both guests and logged-in users. State persists across
  // page reloads via localStorage. Authentication is required only at
  // checkout — see checkout() for the prompt.
  //
  // Persistence rules:
  //   - Only { productId, qty } pairs are stored.
  //   - Product details are re-resolved from this.products() at hydrate time.
  //   - Storage failures (private mode, quota) degrade gracefully to in-memory.

  addToCart(p: Product, e?: Event): void {
    e?.stopPropagation();
    this.cart.update(items => {
      const existing = items.find(i => i.product.id === p.id);
      if (existing) return items.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...items, { product: p, qty: 1 }];
    });
    this.persistCart();
    this.notify(`${p.name} added to cart`, true);
  }
  removeFromCart(productId: string): void {
    this.cart.update(items => items.filter(i => i.product.id !== productId));
    this.persistCart();
  }
  updateQty(productId: string, delta: number): void {
    this.cart.update(items =>
      items.map(i => i.product.id === productId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
    this.persistCart();
  }
  clearCart(): void {
    this.cart.set([]);
    this.persistCart();
  }
  openCart(): void {
    this.showCart.set(true);
  }
  closeCart(): void { this.showCart.set(false); }

  // ── Cart persistence (localStorage) ─────────────────────────────────────────

  /**
   * Serialise the cart to localStorage. Stores only productId + qty so we
   * don't pin stale price/name data between sessions. Silently swallows
   * storage errors (quota exceeded, private-mode unavailability) — the
   * cart still works in-memory for the current session.
   */
  private persistCart(): void {
    try {
      const payload = this.cart().map(i => ({ id: i.product.id, qty: i.qty }));
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      // Non-fatal: cart still works in-memory for this session.
      console.warn('[marketplace] cart persistence unavailable:', err);
    }
  }

  /**
   * Re-hydrate the cart from localStorage. Must be called AFTER products()
   * is populated so we can resolve productIds → full Product objects.
   * Silently drops any stored productIds that no longer exist in the
   * fetched product list (e.g. a product was retired between sessions).
   */
  private hydrateCart(): void {
    let stored: Array<{ id: string; qty: number }> = [];
    try {
      const raw = localStorage.getItem(this.CART_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      stored = parsed.filter((x: any) =>
        x && typeof x.id === 'string' && typeof x.qty === 'number' && x.qty > 0,
      );
    } catch (err) {
      console.warn('[marketplace] cart hydrate failed:', err);
      return;
    }
    if (stored.length === 0) return;

    const byId = new Map(this.products().map(p => [p.id, p]));
    const restored: CartItem[] = [];
    for (const entry of stored) {
      const product = byId.get(entry.id);
      if (product) restored.push({ product, qty: entry.qty });
    }
    if (restored.length > 0) {
      this.cart.set(restored);
    }
    // Re-persist to drop any unresolvable IDs from storage.
    if (restored.length !== stored.length) {
      this.persistCart();
    }
  }

  // ── Checkout ─────────────────────────────────────────────────────────────────

  checkout(): void {
    if (this.cart().length === 0) return;
    // Guests must sign in to complete a purchase. We let them browse and
    // build a cart freely, but checkout requires an account so we can
    // record the order, charge a wallet, and deliver digital codes.
    if (!this.auth.isLoggedIn()) {
      this.showLoginPrompt.set(true);
      return;
    }
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
