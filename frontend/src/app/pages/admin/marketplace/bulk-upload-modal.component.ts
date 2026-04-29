import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InventoryService,
  UploadPayload,
  UploadResult,
} from './inventory.service';

/**
 * BulkUploadModalComponent
 *
 * A focused modal for uploading codes to one product's inventory pool.
 * Two input shapes:
 *   1. PASTE — textarea, one code per line (optional tab-separated
 *      `code<TAB>serial<TAB>expires_at`)
 *   2. CSV  — file upload, parsed client-side into the same row shape
 *
 * On success the component emits `uploaded` with the result, and the
 * parent drawer refreshes its stock breakdown + batch list.
 */
@Component({
  selector: 'app-bulk-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onOverlayClick($event)">
      <div class="modal">
        <header>
          <h2>Upload codes — {{ productName }}</h2>
          <button class="close" (click)="close.emit()" aria-label="Close">✕</button>
        </header>

        <div class="tabs">
          <button [class.active]="tab() === 'paste'" (click)="tab.set('paste')">Paste</button>
          <button [class.active]="tab() === 'csv'" (click)="tab.set('csv')">CSV upload</button>
        </div>

        <!-- Batch metadata (shared across both tabs) -->
        <div class="grid">
          <label>
            Supplier name *
            <input [(ngModel)]="supplierName" placeholder="LikeCard, WUPEX, self…" />
          </label>
          <label>
            Supplier ref / invoice #
            <input [(ngModel)]="supplierRef" placeholder="PO-2026-04-15" />
          </label>
          <label>
            Unit cost (SAR)
            <input type="number" step="0.01" min="0" [(ngModel)]="unitCost" placeholder="47.50" />
          </label>
          <label class="full">
            Notes
            <input [(ngModel)]="notes" placeholder="Optional batch notes" />
          </label>
        </div>

        @if (tab() === 'paste') {
          <label class="full">
            Codes — one per line. Tab-separated for serial + expiry: <code>CODE<kbd>→</kbd>SERIAL<kbd>→</kbd>YYYY-MM-DD</code>
            <textarea rows="10" [(ngModel)]="pastedCodes"
              placeholder="ABCD-1234-EFGH-5678&#10;XYZ9-8765-WVUT-4321"></textarea>
          </label>
          <p class="hint">{{ countPastedRows() }} rows detected</p>
        }

        @if (tab() === 'csv') {
          <label class="full">
            CSV file — columns: <code>code[,serial,expires_at]</code>
            <input type="file" accept=".csv,.txt" (change)="onFileSelected($event)" />
          </label>
          @if (csvRows().length > 0) {
            <p class="hint">{{ csvRows().length }} rows parsed from file</p>
          }
          @if (csvError()) {
            <p class="error">{{ csvError() }}</p>
          }
        }

        @if (result(); as r) {
          <div class="result" [class.error]="r.inserted === 0">
            <strong>{{ r.inserted }} inserted</strong>
            · {{ r.duplicates }} duplicates
            · {{ r.invalid }} invalid
            @if (r.sample_errors && r.sample_errors.length > 0) {
              <ul>
                @for (e of r.sample_errors; track e) { <li>{{ e }}</li> }
              </ul>
            }
          </div>
        }

        @if (apiError()) {
          <p class="error">{{ apiError() }}</p>
        }

        <footer>
          <button class="ghost" (click)="close.emit()">Close</button>
          <button class="primary" (click)="submit()" [disabled]="busy() || !canSubmit()">
            {{ busy() ? 'Uploading…' : 'Upload codes' }}
          </button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(4px); display:flex; align-items:center; justify-content:center; z-index:1000; padding:24px; }
    .modal   { background:#14141f; border:1px solid #2a2a3a; border-radius:12px; width:100%; max-width:720px; max-height:92vh; overflow:auto; display:flex; flex-direction:column; }
    header   { display:flex; justify-content:space-between; align-items:center; padding:20px 24px; border-bottom:1px solid #2a2a3a; }
    h2       { margin:0; font-size:18px; color:#fff; font-family: Rajdhani, sans-serif; letter-spacing:.5px; }
    .close   { background:transparent; border:0; color:#888; font-size:20px; cursor:pointer; }
    .close:hover { color:#fff; }
    .tabs    { display:flex; gap:8px; padding:16px 24px 0; }
    .tabs button { background:transparent; border:1px solid #2a2a3a; color:#888; padding:8px 16px; border-radius:6px; cursor:pointer; font-size:13px; }
    .tabs button.active { background:#a855f7; border-color:#a855f7; color:#fff; }
    .grid    { display:grid; grid-template-columns:1fr 1fr; gap:14px; padding:16px 24px; }
    .grid .full { grid-column: 1 / -1; }
    label    { display:flex; flex-direction:column; gap:6px; font-size:12px; color:#aaa; }
    input, textarea { background:#0a0a14; border:1px solid #2a2a3a; color:#fff; padding:8px 10px; border-radius:6px; font-size:13px; font-family: inherit; }
    textarea { font-family: 'Space Mono', monospace; font-size:12px; }
    input:focus, textarea:focus { outline:none; border-color:#a855f7; }
    .hint    { font-size:12px; color:#888; margin:0 24px 12px; }
    .error   { color:#ef4444; font-size:13px; margin:8px 24px; }
    .result  { background:rgba(34,197,94,.1); border:1px solid rgba(34,197,94,.3); color:#86efac; padding:12px 16px; margin:8px 24px; border-radius:6px; font-size:13px; }
    .result.error { background:rgba(239,68,68,.1); border-color:rgba(239,68,68,.3); color:#fca5a5; }
    .result ul { margin:6px 0 0; padding-left:20px; }
    footer   { display:flex; justify-content:flex-end; gap:8px; padding:16px 24px; border-top:1px solid #2a2a3a; margin-top:auto; }
    button.ghost { background:transparent; border:1px solid #2a2a3a; color:#888; padding:8px 16px; border-radius:6px; cursor:pointer; }
    button.ghost:hover { color:#fff; border-color:#888; }
    button.primary { background:#a855f7; border:0; color:#fff; padding:8px 20px; border-radius:6px; cursor:pointer; font-weight:600; }
    button.primary:disabled { opacity:.5; cursor:not-allowed; }
    code, kbd { background:#0a0a14; padding:1px 6px; border-radius:3px; font-size:11px; }
  `],
})
export class BulkUploadModalComponent {
  @Input({ required: true }) productId!: string;
  @Input() productName = '';
  @Output() close    = new EventEmitter<void>();
  @Output() uploaded = new EventEmitter<UploadResult>();

  private inventory = inject(InventoryService);

  readonly tab = signal<'paste' | 'csv'>('paste');
  readonly busy = signal(false);
  readonly result = signal<UploadResult | null>(null);
  readonly apiError = signal<string | null>(null);
  readonly csvRows = signal<{ code: string; serial?: string; expires_at?: string }[]>([]);
  readonly csvError = signal<string | null>(null);

  // ngModel targets — simple properties, not signals, to avoid
  // two-way binding footguns in Angular 17 templates.
  supplierName = '';
  supplierRef  = '';
  unitCost: number | null = null;
  notes = '';
  pastedCodes = '';

  countPastedRows(): number {
    return this.pastedCodes
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .length;
  }

  canSubmit(): boolean {
    if (!this.supplierName.trim()) return false;
    if (this.tab() === 'paste') return this.countPastedRows() > 0;
    return this.csvRows().length > 0;
  }

  onOverlayClick(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close.emit();
  }

  onFileSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? '');
        const rows = this.parseCsv(text);
        this.csvRows.set(rows);
        this.csvError.set(rows.length === 0 ? 'No valid rows found in CSV.' : null);
      } catch (e: any) {
        this.csvError.set(e?.message ?? 'Failed to parse CSV');
        this.csvRows.set([]);
      }
    };
    reader.onerror = () => this.csvError.set('Failed to read file.');
    reader.readAsText(file);
  }

  /**
   * Minimal CSV parser — handles code, serial, expires_at columns.
   * Accepts comma or tab separators. Trims whitespace. Skips empty lines.
   * Quoted fields with embedded commas are supported.
   */
  private parseCsv(text: string): { code: string; serial?: string; expires_at?: string }[] {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return [];

    // Detect header row — if first row contains "code" or "CODE"
    const firstLower = lines[0].toLowerCase();
    const hasHeader  = firstLower.includes('code');
    const dataLines  = hasHeader ? lines.slice(1) : lines;

    const parseRow = (line: string): string[] => {
      // Favour tab, then comma
      if (line.includes('\t')) return line.split('\t').map(s => s.trim());
      return this.splitCsvLine(line).map(s => s.trim());
    };

    return dataLines
      .map(parseRow)
      .filter(cols => cols[0] && cols[0].length > 0)
      .map(cols => ({
        code:       cols[0],
        serial:     cols[1] || undefined,
        expires_at: cols[2] || undefined,
      }));
  }

  private splitCsvLine(line: string): string[] {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; continue; }
      if (c === '"') { inQuotes = !inQuotes; continue; }
      if (c === ',' && !inQuotes) { out.push(cur); cur = ''; continue; }
      cur += c;
    }
    out.push(cur);
    return out;
  }

  submit(): void {
    if (!this.canSubmit() || this.busy()) return;

    this.busy.set(true);
    this.apiError.set(null);
    this.result.set(null);

    const payload: UploadPayload = {
      supplier_name: this.supplierName.trim(),
      supplier_ref:  this.supplierRef.trim() || undefined,
      unit_cost_sar: this.unitCost ?? undefined,
      notes:         this.notes.trim() || undefined,
      source:        this.tab() === 'csv' ? 'csv_upload' : 'manual',
    };

    if (this.tab() === 'paste') {
      payload.codes_text = this.pastedCodes;
    } else {
      payload.codes = this.csvRows();
    }

    this.inventory.upload(this.productId, payload).subscribe({
      next: (resp) => {
        this.result.set(resp.data);
        this.busy.set(false);
        this.uploaded.emit(resp.data);
      },
      error: (err) => {
        this.apiError.set(err?.error?.message ?? 'Upload failed — please check your payload.');
        this.busy.set(false);
      },
    });
  }
}
