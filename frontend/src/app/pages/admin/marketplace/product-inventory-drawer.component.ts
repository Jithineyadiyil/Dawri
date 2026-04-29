import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BulkUploadModalComponent } from './bulk-upload-modal.component';
import {
  CodeBatch,
  InventoryOverview,
  InventoryService,
  StockBreakdown,
  UploadResult,
} from './inventory.service';

/**
 * ProductInventoryDrawerComponent
 *
 * Per-product inventory pool dashboard — opens as a modal from the
 * products tab. Shows:
 *   - Fulfillment mode toggle (api <-> inventory)
 *   - Auto-hide toggle (Sprint 12A+) — opt-out of auto-hide behaviour
 *   - Stock breakdown (available / reserved / delivered / expired)
 *   - Recent batches with delete option
 *   - "Upload codes" button → opens BulkUploadModalComponent
 *
 * Angular 17 template quirks addressed:
 *   - no method calls on primitives in templates — use component methods
 *   - no object spread `{...x}` — assemble in TS
 *   - `@if (x; as y)` for null-narrowing
 */
@Component({
  selector: 'app-product-inventory-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe, BulkUploadModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onOverlayClick($event)">
      <div class="drawer">
        <header>
          <div>
            <h2>📦 Inventory</h2>
            @if (overview(); as ov) {
              <p class="subtitle">{{ ov.product.name }}</p>
            }
          </div>
          <button class="close" (click)="close.emit()" aria-label="Close">✕</button>
        </header>

        @if (loading()) {
          <div class="loading">Loading inventory…</div>
        }

        @if (error()) {
          <div class="error">{{ error() }}</div>
        }

        @if (overview(); as ov) {
          <!-- Fulfillment mode switcher -->
          <section class="mode">
            <label>Fulfillment mode</label>
            <div class="toggle">
              <button
                [class.active]="ov.product.fulfillment_mode === 'api'"
                (click)="switchMode('api')"
                [disabled]="modeBusy()"
              >API (distributor)</button>
              <button
                [class.active]="ov.product.fulfillment_mode === 'inventory'"
                (click)="switchMode('inventory')"
                [disabled]="modeBusy()"
              >Inventory (pre-loaded)</button>
            </div>
            @if (ov.product.fulfillment_mode === 'api') {
              <p class="mode-hint">
                This product fetches codes from the distributor at order time.
                Switch to Inventory mode to upload pre-purchased codes.
              </p>
            } @else {
              <p class="mode-hint">
                This product serves codes from the pool below.
              </p>
            }
          </section>

          <!-- Auto-hide toggle (inventory mode only) -->
          @if (ov.product.fulfillment_mode === 'inventory') {
            <section class="auto-hide">
              <div class="auto-hide-row">
                <div class="auto-hide-label">
                  <strong>Auto-hide when empty</strong>
                  <p class="mode-hint">
                    @if (ov.product.auto_hide_when_empty) {
                      Product hides from storefront when stock reaches 0.
                      Re-enables automatically on refill.
                    } @else {
                      Product stays visible at 0 stock.
                      Storefront shows "Sold out" — you manage active state manually.
                    }
                  </p>
                </div>
                <button
                  class="switch"
                  [class.on]="ov.product.auto_hide_when_empty"
                  (click)="toggleAutoHide(ov.product.auto_hide_when_empty)"
                  [disabled]="autoHideBusy()"
                  [attr.aria-label]="ov.product.auto_hide_when_empty ? 'Disable auto-hide' : 'Enable auto-hide'"
                >
                  <span class="knob"></span>
                </button>
              </div>
            </section>
          }

          <!-- Stock breakdown -->
          <section class="stock">
            <h3>Stock</h3>
            <div class="grid">
              <div class="stat available">
                <div class="num">{{ ov.stock.available | number }}</div>
                <div class="lbl">Available</div>
              </div>
              <div class="stat reserved">
                <div class="num">{{ ov.stock.reserved | number }}</div>
                <div class="lbl">Reserved</div>
              </div>
              <div class="stat delivered">
                <div class="num">{{ ov.stock.delivered | number }}</div>
                <div class="lbl">Delivered</div>
              </div>
              <div class="stat expired">
                <div class="num">{{ ov.stock.expired | number }}</div>
                <div class="lbl">Expired</div>
              </div>
            </div>
            @if (isLowStock(ov.stock, ov.product.low_stock_threshold)) {
              <div class="low-stock-warn">
                ⚠️ Low stock — only {{ ov.stock.available }} code(s) left
                (threshold: {{ ov.product.low_stock_threshold }})
              </div>
            }
            @if (ov.product.fulfillment_mode === 'inventory' && !ov.product.is_active) {
              <div class="hidden-warn">
                👁️‍🗨️ Product is currently <strong>hidden</strong> from storefront
                @if (ov.product.auto_hide_when_empty) {
                  (auto-hidden, stock = 0)
                } @else {
                  (manually hidden — toggle is_active in product edit to restore)
                }
              </div>
            }
            @if (ov.product.fulfillment_mode === 'inventory' && !ov.product.auto_hide_when_empty && ov.stock.available === 0 && ov.product.is_active) {
              <div class="sold-out-warn">
                🏷️ Stock is 0 but product stays visible (auto-hide disabled).
                Storefront will render "Sold out".
              </div>
            }
          </section>

          <!-- Batch list -->
          <section class="batches">
            <div class="batches-header">
              <h3>Batches ({{ ov.batches.length }})</h3>
              <button
                class="primary"
                (click)="openUploadModal()"
                [disabled]="ov.product.fulfillment_mode !== 'inventory'"
                [title]="ov.product.fulfillment_mode !== 'inventory' ? 'Switch to inventory mode first' : ''"
              >+ Upload codes</button>
            </div>

            @if (ov.batches.length === 0) {
              <p class="empty">No batches yet. Click "Upload codes" to add the first one.</p>
            } @else {
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Supplier</th>
                    <th>Ref</th>
                    <th class="r">Count</th>
                    <th class="r">Cost/unit</th>
                    <th class="r">Total</th>
                    <th>Source</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  @for (b of ov.batches; track b.id) {
                    <tr>
                      <td>{{ b.created_at | date: 'MMM d, y' }}</td>
                      <td>{{ b.supplier_name }}</td>
                      <td class="muted">{{ b.supplier_ref || '—' }}</td>
                      <td class="r">{{ b.code_count | number }}</td>
                      <td class="r">
                        @if (b.unit_cost_sar !== null) {
                          {{ b.unit_cost_sar | number:'1.2-2' }}
                        } @else { — }
                      </td>
                      <td class="r">
                        @if (b.total_cost_sar !== null) {
                          {{ b.total_cost_sar | number:'1.2-2' }}
                        } @else { — }
                      </td>
                      <td><span class="src src-{{ b.source }}">{{ b.source }}</span></td>
                      <td>
                        <button
                          class="danger-ghost"
                          (click)="deleteBatch(b)"
                          [disabled]="deletingBatchId() === b.id"
                          title="Delete this batch (only if no codes delivered)"
                        >✕</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            }
          </section>
        }

        <footer>
          <button class="ghost" (click)="close.emit()">Close</button>
        </footer>
      </div>
    </div>

    @if (showUploadModal() && overview(); as ov2) {
      <app-bulk-upload-modal
        [productId]="productId"
        [productName]="ov2.product.name"
        (close)="showUploadModal.set(false)"
        (uploaded)="onUploaded($event)"
      />
    }
  `,
  styles: [`
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(4px); display:flex; align-items:center; justify-content:center; z-index:900; padding:24px; }
    .drawer  { background:#14141f; border:1px solid #2a2a3a; border-radius:12px; width:100%; max-width:960px; max-height:92vh; overflow:auto; display:flex; flex-direction:column; }
    header   { display:flex; justify-content:space-between; align-items:flex-start; padding:20px 24px; border-bottom:1px solid #2a2a3a; }
    h2       { margin:0; font-size:20px; color:#fff; font-family: Rajdhani, sans-serif; letter-spacing:.5px; }
    .subtitle { margin:4px 0 0; color:#888; font-size:13px; }
    .close   { background:transparent; border:0; color:#888; font-size:20px; cursor:pointer; }
    .close:hover { color:#fff; }
    .loading, .empty { padding: 40px; text-align:center; color:#888; }
    .error   { color:#fca5a5; background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.3); padding:12px 16px; margin:16px 24px; border-radius:6px; font-size:13px; }
    section  { padding:16px 24px; border-bottom:1px solid #1f1f2e; }
    section:last-of-type { border-bottom:0; }
    h3       { margin:0 0 12px; font-size:13px; color:#a855f7; text-transform:uppercase; letter-spacing:1px; font-family: Rajdhani, sans-serif; }
    label    { display:block; font-size:12px; color:#aaa; margin-bottom:8px; }
    .toggle  { display:flex; gap:0; }
    .toggle button { flex:1; background:#0a0a14; border:1px solid #2a2a3a; color:#888; padding:10px; cursor:pointer; font-size:13px; }
    .toggle button:first-child { border-radius:6px 0 0 6px; }
    .toggle button:last-child { border-radius:0 6px 6px 0; border-left:0; }
    .toggle button.active { background:#a855f7; border-color:#a855f7; color:#fff; }
    .toggle button:disabled { opacity:.5; cursor:not-allowed; }
    .mode-hint { color:#888; font-size:12px; margin:8px 0 0; }

    /* auto-hide toggle row */
    .auto-hide-row { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
    .auto-hide-label { flex:1; }
    .auto-hide-label strong { color:#fff; font-size:14px; font-weight:600; display:block; }
    .auto-hide-label .mode-hint { margin-top:4px; }
    .switch { flex-shrink:0; width:48px; height:26px; border-radius:13px; background:#2a2a3a; border:0; cursor:pointer; position:relative; padding:0; transition:background .2s; }
    .switch .knob { position:absolute; top:3px; left:3px; width:20px; height:20px; border-radius:10px; background:#fff; transition:left .2s; }
    .switch.on { background:#a855f7; }
    .switch.on .knob { left:25px; }
    .switch:disabled { opacity:.5; cursor:not-allowed; }

    .grid    { display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; }
    .stat    { background:#0a0a14; border:1px solid #2a2a3a; border-radius:6px; padding:14px; text-align:center; }
    .stat .num { font-size:24px; font-weight:700; font-family:'Space Mono', monospace; }
    .stat .lbl { font-size:11px; color:#888; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
    .stat.available .num { color:#86efac; }
    .stat.reserved  .num { color:#fbbf24; }
    .stat.delivered .num { color:#60a5fa; }
    .stat.expired   .num { color:#666; }
    .low-stock-warn { margin-top:12px; background:rgba(251,191,36,.1); border:1px solid rgba(251,191,36,.3); color:#fbbf24; padding:10px 14px; border-radius:6px; font-size:13px; }
    .hidden-warn    { margin-top:12px; background:rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.25); color:#fca5a5; padding:10px 14px; border-radius:6px; font-size:13px; }
    .sold-out-warn  { margin-top:12px; background:rgba(96,165,250,.08); border:1px solid rgba(96,165,250,.25); color:#60a5fa; padding:10px 14px; border-radius:6px; font-size:13px; }
    .batches-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .batches-header h3 { margin:0; }
    table    { width:100%; border-collapse:collapse; font-size:13px; }
    th, td   { padding:10px 8px; text-align:left; border-bottom:1px solid #1f1f2e; }
    th       { color:#888; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:.5px; }
    .r       { text-align:right; }
    td.muted { color:#666; }
    .src     { font-size:11px; padding:2px 8px; border-radius:10px; background:#2a2a3a; color:#aaa; }
    .src-webhook   { background:rgba(168,85,247,.2); color:#c084fc; }
    .src-csv_upload{ background:rgba(34,197,94,.2);  color:#86efac; }
    .src-manual    { background:rgba(251,191,36,.2); color:#fbbf24; }
    button.primary { background:#a855f7; border:0; color:#fff; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:600; font-size:13px; }
    button.primary:disabled { opacity:.5; cursor:not-allowed; }
    button.ghost   { background:transparent; border:1px solid #2a2a3a; color:#888; padding:8px 16px; border-radius:6px; cursor:pointer; }
    button.ghost:hover { color:#fff; border-color:#888; }
    button.danger-ghost { background:transparent; border:0; color:#666; font-size:14px; cursor:pointer; padding:4px 8px; }
    button.danger-ghost:hover { color:#ef4444; }
    button.danger-ghost:disabled { opacity:.3; cursor:not-allowed; }
    footer   { display:flex; justify-content:flex-end; padding:16px 24px; border-top:1px solid #2a2a3a; margin-top:auto; }
  `],
})
export class ProductInventoryDrawerComponent implements OnInit {
  @Input({ required: true }) productId!: string;
  @Output() close   = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  private inventory = inject(InventoryService);

  readonly overview        = signal<InventoryOverview | null>(null);
  readonly loading         = signal(true);
  readonly error           = signal<string | null>(null);
  readonly modeBusy        = signal(false);
  readonly autoHideBusy    = signal(false);
  readonly deletingBatchId = signal<string | null>(null);
  readonly showUploadModal = signal(false);

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.inventory.overview(this.productId).subscribe({
      next: (r) => {
        this.overview.set(r.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Failed to load inventory.');
        this.loading.set(false);
      },
    });
  }

  onOverlayClick(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close.emit();
  }

  switchMode(mode: 'api' | 'inventory'): void {
    const cur = this.overview();
    if (!cur || cur.product.fulfillment_mode === mode || this.modeBusy()) return;

    if (!confirm(`Switch "${cur.product.name}" to ${mode.toUpperCase()} mode?`)) return;

    this.modeBusy.set(true);
    this.inventory.setMode(this.productId, mode).subscribe({
      next: () => {
        this.modeBusy.set(false);
        this.refresh();
        this.changed.emit();
      },
      error: (err) => {
        this.modeBusy.set(false);
        alert(err?.error?.message ?? 'Failed to change mode.');
      },
    });
  }

  /**
   * Toggle the auto-hide flag. Current value is passed in so the
   * button callsite doesn't have to re-query the signal.
   */
  toggleAutoHide(currentValue: boolean): void {
    if (this.autoHideBusy()) return;

    const next = !currentValue;
    this.autoHideBusy.set(true);
    this.inventory.setAutoHide(this.productId, next).subscribe({
      next: () => {
        this.autoHideBusy.set(false);
        this.refresh();
        this.changed.emit();
      },
      error: (err) => {
        this.autoHideBusy.set(false);
        alert(err?.error?.message ?? 'Failed to change auto-hide setting.');
      },
    });
  }

  openUploadModal(): void {
    this.showUploadModal.set(true);
  }

  onUploaded(_result: UploadResult): void {
    this.refresh();
    this.changed.emit();
  }

  deleteBatch(batch: CodeBatch): void {
    if (!confirm(
      `Delete batch from ${batch.supplier_name} (${batch.code_count} codes)?\n\n` +
      `This is only allowed if NO code from this batch has been delivered.`
    )) return;

    this.deletingBatchId.set(batch.id);
    this.inventory.deleteBatch(batch.id).subscribe({
      next: () => {
        this.deletingBatchId.set(null);
        this.refresh();
        this.changed.emit();
      },
      error: (err) => {
        this.deletingBatchId.set(null);
        alert(err?.error?.message ?? 'Failed to delete batch.');
      },
    });
  }

  isLowStock(stock: StockBreakdown, threshold: number): boolean {
    return stock.available > 0 && stock.available <= threshold;
  }
}
