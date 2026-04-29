import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductInventoryDrawerComponent } from './product-inventory-drawer.component';
import { MarketplaceDashboardComponent } from './marketplace-dashboard.component';

export interface ProductRow {
  id: string;
  distributor: string;
  distributor_product_id?: string | null;
  name: string;
  name_ar?: string | null;
  brand: string;
  category: string;
  face_value: number;
  currency: string;
  our_cost: number | null;
  our_price: number;
  region: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  fulfillment_mode?: 'api' | 'inventory';
  low_stock_threshold?: number;
  auto_hide_when_empty?: boolean;
}

/**
 * OrderRow — row shape in the orders table. Backend returns BOTH flat
 * convenience fields (user_name, user_email) AND a nested `user` object.
 * Read flat first, fall back to nested. Same for product.
 */
export interface OrderRow {
  id: string;
  user_id: string;
  user_name?: string | null;
  user_email?: string | null;
  user?: { id: string; name: string; email: string; nickname?: string | null } | null;
  product_id: string;
  product_name?: string | null;
  product_brand?: string | null;
  product?: { id: string; name: string; brand: string; face_value?: number; currency?: string } | null;
  distributor: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  payment_ref: string;
  fulfilled_at: string | null;
  created_at: string;
  refunded_at?: string | null;
  refund_reason?: string | null;
  admin_notes?: string | null;
}

export interface OrderCodeDetail {
  id: string;
  masked: string;
  full: string | null;
  revealed_at: string | null;
  created_at: string | null;
  expires_at: string | null;
}
export interface InventoryCodeDetail {
  id: string;
  batch_id: string;
  serial_number: string | null;
  status: 'available' | 'reserved' | 'delivered' | 'expired';
  delivered_at: string | null;
  reserved_at: string | null;
  expires_at: string | null;
  can_void: boolean;
}
export interface OrderDetail extends OrderRow {
  distributor_order_id: string | null;
  idempotency_key: string | null;
  code: OrderCodeDetail | null;
  inventory_code: InventoryCodeDetail | null;
}

export interface DistributorStockSummary {
  inventory_products: number;
  available_codes: number;
  delivered_30d: number;
}
export interface DistributorCredentialInfo {
  api_key_masked: string;
  has_secret: boolean;
  has_client_id: boolean;
  has_client_secret: boolean;
  environment?: string;
  updated_at: string | null;
}
export interface DistributorCard {
  distributor: string;
  display_name: string;
  product_count: number;
  health: unknown | null;
  credentials: unknown[];
  has_active_creds: boolean;
  stock_summary: DistributorStockSummary;
  credential_info: DistributorCredentialInfo | null;
}
export interface TestConnectionResult {
  success: boolean;
  message: string;
  checked_at: string;
}

export interface StatsTotals {
  total_orders: number;
  completed: number;
  failed: number;
  refunded: number;
  gross_revenue: number;
}
export interface Stats {
  totals: StatsTotals;
  daily_last_7_days?: unknown[];
  top_products?: unknown[];
}

interface ProductFormShape {
  id?: string;
  distributor: string;
  distributor_product_id: string;
  name: string;
  name_ar: string;
  brand: string;
  category: string;
  face_value: number;
  currency: string;
  our_cost: number;
  our_price: number;
  region: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  fulfillment_mode: 'api' | 'inventory';
  low_stock_threshold: number;
}

interface CredentialFormShape {
  api_key: string;
  api_secret: string;
  client_id: string;
  client_secret: string;
  is_active: boolean;
}

@Component({
  selector: 'app-admin-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe, ProductInventoryDrawerComponent, MarketplaceDashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-marketplace.component.html',
  styleUrls: ['./admin-marketplace.component.scss'],
})
export class AdminMarketplaceComponent implements OnInit {
  private http = inject(HttpClient);
  private base = 'http://localhost:8001/api/v1/admin/marketplace';

  readonly tab = signal<'dashboard' | 'products' | 'orders' | 'distributors'>('dashboard');

  readonly stats = signal<Stats | null>(null);

  readonly statsVm = computed(() => {
    const s = this.stats();
    const prods = this.products();
    return {
      total_products: prods.length,
      active_products: prods.filter(p => p.is_active).length,
      total_orders:    s?.totals?.total_orders    ?? 0,
      completed:       s?.totals?.completed       ?? 0,
      gross_revenue:   s?.totals?.gross_revenue   ?? 0,
    };
  });

  // Products
  readonly products = signal<ProductRow[]>([]);
  readonly productsLoading = signal(false);
  readonly productSearch = signal('');

  readonly filteredProducts = computed(() => {
    const q = this.productSearch().toLowerCase().trim();
    const all = this.products();
    if (!q) return all;
    return all.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.name_ar ?? '').toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.distributor.toLowerCase().includes(q),
    );
  });

  readonly productModalMode = signal<'create' | 'edit' | null>(null);
  readonly productSaving = signal(false);
  productForm: ProductFormShape = this.freshProductForm();

  readonly inventoryDrawerProductId = signal<string | null>(null);

  // Orders
  readonly orders = signal<OrderRow[]>([]);
  readonly ordersLoading = signal(false);
  readonly orderSearch = signal('');
  readonly orderStatusFilter = signal<'all' | OrderRow['status']>('all');

  readonly filteredOrders = computed(() => {
    const q = this.orderSearch().toLowerCase().trim();
    const s = this.orderStatusFilter();
    return this.orders().filter(o => {
      if (s !== 'all' && o.status !== s) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        (this.orderUserEmail(o)).toLowerCase().includes(q) ||
        (this.orderUserName(o)).toLowerCase().includes(q) ||
        (this.orderProductName(o)).toLowerCase().includes(q) ||
        (o.payment_ref ?? '').toLowerCase().includes(q)
      );
    });
  });

  readonly orderDetail = signal<OrderDetail | null>(null);
  readonly orderDetailLoading = signal(false);
  readonly refundBusy = signal(false);
  readonly codeRevealed = signal(false);
  refundReason = '';
  refundNotes = '';
  refundVoidCode = false;

  // Distributors
  readonly distributors = signal<DistributorCard[]>([]);
  readonly distributorsLoading = signal(false);
  readonly credentialsModal = signal<DistributorCard | null>(null);
  readonly credentialsSaving = signal(false);
  readonly revealField = signal<Record<string, boolean>>({});
  credentialForm: CredentialFormShape = this.freshCredentialForm();

  readonly testResults = signal<Record<string, TestConnectionResult | null>>({});
  readonly testBusyKey = signal<string | null>(null);

  ngOnInit(): void {
    this.loadStats();
    this.loadProducts();
    this.loadOrders();
    this.loadDistributors();
  }

  setTab(tab: 'dashboard' | 'products' | 'orders' | 'distributors'): void {
    this.tab.set(tab);
  }

  /**
   * Read order user/product display values defensively — flat field
   * first (Sprint 12A+ shape), nested object second (Sprint 11 shape).
   * Returns an empty string on no data so the template renders cleanly.
   */
  orderUserName(o: OrderRow): string {
    return o.user_name ?? o.user?.name ?? '';
  }
  orderUserEmail(o: OrderRow): string {
    return o.user_email ?? o.user?.email ?? '';
  }
  orderProductName(o: OrderRow): string {
    return o.product_name ?? o.product?.name ?? o.product_id ?? '';
  }
  orderProductBrand(o: OrderRow): string {
    return o.product_brand ?? o.product?.brand ?? '';
  }

  loadStats(): void {
    this.http.get<{ data: Stats }>(`${this.base}/stats`).subscribe({
      next: (r) => this.stats.set(r.data),
      error: () => {},
    });
  }

  loadProducts(): void {
    this.productsLoading.set(true);
    this.http.get<any>(`${this.base}/products?per_page=1000`).subscribe({
      next: (r) => {
        this.products.set(this.unwrapList<ProductRow>(r));
        this.productsLoading.set(false);
      },
      error: () => this.productsLoading.set(false),
    });
  }

  setProductSearch(v: string): void {
    this.productSearch.set(v);
  }

  openCreateProduct(): void {
    this.productForm = this.freshProductForm();
    this.productModalMode.set('create');
  }

  openEditProduct(p: ProductRow): void {
    this.productForm = {
      id:                     p.id,
      distributor:            p.distributor ?? '',
      distributor_product_id: p.distributor_product_id ?? '',
      name:                   p.name ?? '',
      name_ar:                p.name_ar ?? '',
      brand:                  p.brand ?? '',
      category:               p.category ?? '',
      face_value:             p.face_value ?? 0,
      currency:               p.currency ?? 'SAR',
      our_cost:               p.our_cost ?? 0,
      our_price:              p.our_price ?? 0,
      region:                 p.region ?? 'SA',
      image_url:              p.image_url ?? '',
      is_active:              !!p.is_active,
      sort_order:             p.sort_order ?? 0,
      fulfillment_mode:       (p.fulfillment_mode ?? 'api') as 'api' | 'inventory',
      low_stock_threshold:    p.low_stock_threshold ?? 5,
    };
    this.productModalMode.set('edit');
  }

  closeProductModal(): void {
    this.productModalMode.set(null);
  }

  /**
   * Sprint 12A+ pricing policy: no markup by default.
   * When the admin types in face value, mirror it to our_price IF
   * our_price is currently empty/zero or equal to the previous face value.
   * This respects manual overrides (if admin explicitly typed a different
   * price, we don't stomp on it).
   */
  onFaceValueChange(newVal: number): void {
    const prev = this.productForm.face_value;
    const currentPrice = this.productForm.our_price;
    if (currentPrice === 0 || currentPrice === prev) {
      this.productForm.our_price = newVal;
    }
    this.productForm.face_value = newVal;
  }

  saveProduct(): void {
    if (this.productSaving()) return;
    this.productSaving.set(true);
    const mode = this.productModalMode();
    const url = mode === 'edit'
      ? `${this.base}/products/${this.productForm.id}`
      : `${this.base}/products`;
    const req = mode === 'edit'
      ? this.http.put(url, this.productForm)
      : this.http.post(url, this.productForm);

    req.subscribe({
      next: () => {
        this.productSaving.set(false);
        this.productModalMode.set(null);
        this.loadProducts();
        this.loadStats();
      },
      error: (err) => {
        this.productSaving.set(false);
        const msg = err?.error?.message
          ?? Object.values(err?.error?.errors ?? {}).flat().join('\n')
          ?? 'Save failed.';
        alert(msg);
      },
    });
  }

  deleteProduct(p: ProductRow): void {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    this.http.delete(`${this.base}/products/${p.id}`).subscribe({
      next: () => {
        this.loadProducts();
        this.loadStats();
      },
      error: (err) => alert(err?.error?.message ?? 'Delete failed.'),
    });
  }

  openInventoryDrawer(productId: string): void {
    this.inventoryDrawerProductId.set(productId);
  }
  closeInventoryDrawer(): void {
    this.inventoryDrawerProductId.set(null);
  }
  onInventoryChanged(): void {
    this.loadProducts();
    this.loadDistributors();
  }

  productMargin(p: ProductRow): string {
    const cost = p.our_cost ?? 0;
    if (cost <= 0) return '—';
    const margin = ((p.our_price - cost) / cost) * 100;
    return `${margin.toFixed(1)}%`;
  }

  // Orders
  loadOrders(): void {
    this.ordersLoading.set(true);
    this.http.get<any>(`${this.base}/orders?per_page=200`).subscribe({
      next: (r) => {
        this.orders.set(this.unwrapList<OrderRow>(r));
        this.ordersLoading.set(false);
      },
      error: () => this.ordersLoading.set(false),
    });
  }

  setOrderSearch(v: string): void {
    this.orderSearch.set(v);
  }
  setOrderStatusFilter(v: 'all' | OrderRow['status']): void {
    this.orderStatusFilter.set(v);
  }

  openOrderDetail(o: OrderRow): void {
    this.orderDetail.set({
      ...o,
      distributor_order_id: null,
      idempotency_key: null,
      code: null,
      inventory_code: null,
    } as OrderDetail);
    this.codeRevealed.set(false);
    this.refundReason = '';
    this.refundNotes = '';
    this.refundVoidCode = false;

    this.orderDetailLoading.set(true);
    this.http.get<{ data: OrderDetail }>(`${this.base}/orders/${o.id}`).subscribe({
      next: (r) => {
        this.orderDetail.set(r.data);
        this.orderDetailLoading.set(false);
      },
      error: () => {
        this.orderDetailLoading.set(false);
      },
    });
  }

  closeOrderDetail(): void {
    this.orderDetail.set(null);
    this.codeRevealed.set(false);
    this.refundReason = '';
    this.refundNotes = '';
    this.refundVoidCode = false;
  }

  toggleCodeReveal(): void {
    this.codeRevealed.update(v => !v);
  }

  refundOrder(): void {
    const o = this.orderDetail();
    if (!o || this.refundBusy()) return;
    if (!this.refundReason.trim()) {
      alert('Please provide a reason for the refund.');
      return;
    }
    const voidingCode = this.refundVoidCode && !!o.inventory_code?.can_void;
    const confirmMsg = voidingCode
      ? `Refund ${o.total_price} SAR to user wallet AND void the delivered code?`
      : `Refund ${o.total_price} SAR to user wallet?`;
    if (!confirm(confirmMsg)) return;

    this.refundBusy.set(true);
    this.http.post<{ data: OrderDetail, message: string }>(
      `${this.base}/orders/${o.id}/refund`,
      {
        reason: this.refundReason,
        notes: this.refundNotes || null,
        void_code: voidingCode,
      },
    ).subscribe({
      next: (r) => {
        this.refundBusy.set(false);
        this.orderDetail.set(r.data);
        this.loadOrders();
        this.loadStats();
        this.loadDistributors();
      },
      error: (err) => {
        this.refundBusy.set(false);
        alert(err?.error?.message ?? 'Refund failed.');
      },
    });
  }

  // Distributors
  loadDistributors(): void {
    this.distributorsLoading.set(true);
    this.http.get<{ data: DistributorCard[] }>(`${this.base}/distributors`).subscribe({
      next: (r) => {
        this.distributors.set(r.data ?? []);
        this.distributorsLoading.set(false);
      },
      error: () => this.distributorsLoading.set(false),
    });
  }

  openCredentialsModal(d: DistributorCard): void {
    this.credentialForm = this.freshCredentialForm();
    this.credentialForm.is_active = d.has_active_creds;
    this.revealField.set({});
    this.credentialsModal.set(d);
  }
  closeCredentialsModal(): void {
    this.credentialsModal.set(null);
    this.revealField.set({});
  }

  toggleReveal(field: string): void {
    const cur = this.revealField();
    this.revealField.set({ ...cur, [field]: !cur[field] });
  }

  saveCredentials(): void {
    const d = this.credentialsModal();
    if (!d || this.credentialsSaving()) return;
    const body: Record<string, any> = { is_active: this.credentialForm.is_active };
    if (this.credentialForm.api_key.trim())        body['api_key']        = this.credentialForm.api_key;
    if (this.credentialForm.api_secret.trim())     body['api_secret']     = this.credentialForm.api_secret;
    if (this.credentialForm.client_id.trim())      body['client_id']      = this.credentialForm.client_id;
    if (this.credentialForm.client_secret.trim())  body['client_secret']  = this.credentialForm.client_secret;

    this.credentialsSaving.set(true);
    this.http.put(`${this.base}/distributors/${d.distributor}/credentials`, body).subscribe({
      next: () => {
        this.credentialsSaving.set(false);
        this.credentialsModal.set(null);
        this.loadDistributors();
      },
      error: (err) => {
        this.credentialsSaving.set(false);
        alert(err?.error?.message ?? 'Save failed.');
      },
    });
  }

  clearCredentials(): void {
    const d = this.credentialsModal();
    if (!d) return;
    if (!confirm(`Remove all credentials for ${d.display_name}? This will disable routing to this distributor.`)) return;

    this.credentialsSaving.set(true);
    this.http.delete(`${this.base}/distributors/${d.distributor}/credentials`).subscribe({
      next: () => {
        this.credentialsSaving.set(false);
        this.credentialsModal.set(null);
        this.loadDistributors();
      },
      error: (err) => {
        this.credentialsSaving.set(false);
        alert(err?.error?.message ?? 'Clear failed.');
      },
    });
  }

  testConnection(d: DistributorCard): void {
    if (this.testBusyKey()) return;
    this.testBusyKey.set(d.distributor);

    this.http.post<{ data: TestConnectionResult }>(
      `${this.base}/distributors/${d.distributor}/test-connection`,
      {},
    ).subscribe({
      next: (r) => {
        this.testResults.set({ ...this.testResults(), [d.distributor]: r.data });
        this.testBusyKey.set(null);
      },
      error: (err) => {
        this.testResults.set({
          ...this.testResults(),
          [d.distributor]: {
            success: false,
            message: err?.error?.message ?? 'Connection test failed.',
            checked_at: new Date().toISOString(),
          },
        });
        this.testBusyKey.set(null);
      },
    });
  }

  dismissTestResult(d: DistributorCard): void {
    const cur = { ...this.testResults() };
    delete cur[d.distributor];
    this.testResults.set(cur);
  }

  private unwrapList<T>(r: any): T[] {
    if (!r) return [];
    if (Array.isArray(r.data)) return r.data as T[];
    if (Array.isArray(r.data?.data)) return r.data.data as T[];
    if (Array.isArray(r)) return r as T[];
    return [];
  }

  private freshProductForm(): ProductFormShape {
    return {
      distributor:            'likecard',
      distributor_product_id: '',
      name:                   '',
      name_ar:                '',
      brand:                  '',
      category:               'gaming',
      face_value:             0,
      currency:               'SAR',
      our_cost:               0,
      our_price:              0,
      region:                 'SA',
      image_url:              '',
      is_active:              true,
      sort_order:             0,
      fulfillment_mode:       'api',
      low_stock_threshold:    5,
    };
  }

  private freshCredentialForm(): CredentialFormShape {
    return {
      api_key:       '',
      api_secret:    '',
      client_id:     '',
      client_secret: '',
      is_active:     true,
    };
  }
}
