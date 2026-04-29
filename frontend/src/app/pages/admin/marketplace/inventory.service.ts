import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

/** Shape of a code batch (admin UI only). */
export interface CodeBatch {
  id: string;
  product_id: string;
  supplier_name: string;
  supplier_ref: string | null;
  source: 'manual' | 'csv_upload' | 'webhook';
  code_count: number;
  unit_cost_sar: number | null;
  total_cost_sar: number | null;
  notes: string | null;
  uploaded_by?: { id: string | null; name: string | null };
  created_at: string;
}

export interface StockBreakdown {
  available: number;
  reserved: number;
  delivered: number;
  expired: number;
  total: number;
}

export interface InventoryOverview {
  product: {
    id: string;
    name: string;
    fulfillment_mode: 'api' | 'inventory';
    is_active: boolean;
    low_stock_threshold: number;
    /** Sprint 12A+ — per-product opt-out of auto-hide behaviour. */
    auto_hide_when_empty: boolean;
  };
  stock: StockBreakdown;
  batches: CodeBatch[];
}

export interface ProductCodeRow {
  id: string;
  batch_id: string | null;
  masked: string;
  serial_number: string | null;
  status: 'available' | 'reserved' | 'delivered' | 'expired';
  expires_at: string | null;
  reserved_by_order_id: string | null;
  reserved_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

export interface UploadRow {
  code: string;
  serial?: string;
  expires_at?: string;
}

export interface UploadPayload {
  supplier_name: string;
  supplier_ref?: string;
  unit_cost_sar?: number;
  notes?: string;
  source?: 'manual' | 'csv_upload';
  codes_text?: string;
  codes?: UploadRow[];
}

export interface UploadResult {
  batch: CodeBatch;
  inserted: number;
  duplicates: number;
  invalid: number;
  sample_errors: string[];
  stock: StockBreakdown;
}

/**
 * InventoryService — wraps `/api/v1/admin/marketplace/...` inventory routes.
 *
 * All methods return Observables. The AuthInterceptor attaches the admin
 * Sanctum token automatically.
 */
@Injectable({ providedIn: 'root' })
export class InventoryService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8001/api/v1/admin/marketplace';

  /** GET — overview (product meta + stock + recent batches). */
  overview(productId: string): Observable<{ data: InventoryOverview }> {
    return this.http.get<{ data: InventoryOverview }>(
      `${this.base}/products/${productId}/inventory`,
    );
  }

  /** GET — paginated masked code list. */
  codes(
    productId: string,
    opts: { page?: number; status?: ProductCodeRow['status'] } = {},
  ): Observable<{
    data: ProductCodeRow[];
    meta: { current_page: number; last_page: number; total: number; per_page: number };
  }> {
    const params: Record<string, string> = {};
    if (opts.page)   params['page']   = String(opts.page);
    if (opts.status) params['status'] = opts.status;
    return this.http.get<any>(
      `${this.base}/products/${productId}/inventory/codes`,
      { params },
    );
  }

  /** POST — bulk upload. */
  upload(productId: string, payload: UploadPayload): Observable<{ data: UploadResult; message: string }> {
    return this.http.post<any>(
      `${this.base}/products/${productId}/inventory/upload`,
      payload,
    );
  }

  /** POST — switch fulfillment mode. */
  setMode(
    productId: string,
    mode: 'api' | 'inventory',
  ): Observable<{ data: { id: string; fulfillment_mode: string; stock: StockBreakdown }; message: string }> {
    return this.http.post<any>(
      `${this.base}/products/${productId}/fulfillment-mode`,
      { fulfillment_mode: mode },
    );
  }

  /**
   * POST — toggle auto_hide_when_empty (Sprint 12A+).
   *
   * When true: product hides when stock hits 0, shows again on refill.
   * When false: product stays visible at 0 stock — storefront renders
   * "Sold out" based on stock breakdown instead.
   */
  setAutoHide(
    productId: string,
    autoHide: boolean,
  ): Observable<{ data: { id: string; auto_hide_when_empty: boolean }; message: string }> {
    return this.http.post<any>(
      `${this.base}/products/${productId}/auto-hide`,
      { auto_hide_when_empty: autoHide },
    );
  }

  /** DELETE — remove a batch (fails if any code delivered). */
  deleteBatch(batchId: string): Observable<{ message: string }> {
    return this.http.delete<any>(`${this.base}/batches/${batchId}`);
  }
}
