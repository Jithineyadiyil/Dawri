import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateRangePickerComponent, DateRange } from './date-range-picker.component';

export interface InvoiceRow {
  id: string;
  invoice_number: string;
  user_name: string;
  user_email: string;
  subtotal: number;
  vat_amount: number;
  total: number;
  currency: string;
  status: string;
  payment_method: string | null;
  period_start: string | null;
  period_end: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface InvoicePayload {
  data: InvoiceRow[];
  meta: { total: number; page: number; per_page: number };
  summary: { count: number; subtotal: number; vat: number; total: number; paid: number; unpaid: number };
}

/**
 * InvoiceRegisterComponent
 *
 * Paginated, filterable list of invoices with bulk export. Supports
 * filtering by date range, status (paid / draft / overdue / all), and
 * keyword search across invoice number, customer name, and email.
 */
@Component({
  selector: 'app-invoice-register',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe, DateRangePickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-register.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class InvoiceRegisterComponent implements OnInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/finance';

  readonly payload = signal<InvoicePayload | null>(null);
  readonly loading = signal(false);
  readonly error   = signal<string | null>(null);

  readonly range    = signal<DateRange>({ from: '', to: '' });
  readonly status   = signal<'all' | 'paid' | 'draft' | 'overdue' | 'cancelled'>('all');
  readonly search   = signal<string>('');
  readonly page     = signal<number>(1);
  readonly perPage  = signal<number>(20);

  ngOnInit(): void {
    // Load triggered by initial date-range emit
  }

  onRangeChange(r: DateRange): void {
    this.range.set(r);
    this.page.set(1);
    this.load();
  }

  onStatusChange(v: string): void {
    this.status.set(v as any);
    this.page.set(1);
    this.load();
  }

  onSearchChange(v: string): void {
    this.search.set(v);
    this.page.set(1);
    this.load();
  }

  goToPage(p: number): void {
    this.page.set(p);
    this.load();
  }

  load(): void {
    const r = this.range();
    if (!r.from || !r.to) return;

    this.loading.set(true);
    this.error.set(null);

    let params = new HttpParams()
      .set('from', r.from).set('to', r.to)
      .set('status', this.status())
      .set('page', String(this.page()))
      .set('per_page', String(this.perPage()));
    if (this.search().trim()) params = params.set('search', this.search().trim());

    this.http.get<InvoicePayload>(`${this.base}/invoices`, { params })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.payload.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Failed to load invoices.');
        },
      });
  }

  downloadPdf(): void {
    const params = this.buildQueryString();
    window.open(`${this.base}/invoices.pdf?${params}`, '_blank');
  }
  downloadXlsx(): void {
    const params = this.buildQueryString();
    window.open(`${this.base}/invoices.xlsx?${params}`, '_blank');
  }

  private buildQueryString(): string {
    const r = this.range();
    const qp = new URLSearchParams({
      from: r.from, to: r.to, status: this.status(),
    });
    if (this.search().trim()) qp.set('search', this.search().trim());
    const token = localStorage.getItem('dawri_token');
    if (token) qp.set('token', token);
    return qp.toString();
  }

  /**
   * Download a single invoice as PDF. Uses the token-in-query auth
   * pattern so the browser can open the URL in a new tab without a
   * bearer header.
   */
  downloadInvoicePdf(invoiceId: string): void {
    const base = 'http://localhost:8001/api/v1/admin/finance/invoices';
    const token = localStorage.getItem('dawri_token');
    const tokenParam = token ? `?token=${encodeURIComponent(token)}` : '';
    window.open(`${base}/${invoiceId}.pdf${tokenParam}`, '_blank');
  }

  // View helpers
  statusClass(status: string): string {
    return `status-pill status-${status}`;
  }

  lastPage(): number {
    const p = this.payload();
    if (!p) return 1;
    return Math.max(1, Math.ceil(p.meta.total / p.meta.per_page));
  }
}
