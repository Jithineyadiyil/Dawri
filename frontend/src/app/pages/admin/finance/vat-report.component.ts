import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateRangePickerComponent, DateRange } from './date-range-picker.component';

export interface VatPayload {
  period: { from: string; to: string };
  summary: {
    invoices_gross: number; invoices_vat: number; invoices_net: number;
    marketplace_gross: number; marketplace_vat: number; marketplace_net: number;
    sponsorships_gross: number; sponsorships_vat: number; sponsorships_net: number;
    total_gross: number; total_vat: number; total_net: number;
  };
  monthly: Array<{ month: string; gross: number; vat: number; net: number }>;
  invoice_lines: Array<{ invoice_number: string; customer: string; paid_at: string; net: number; vat: number; gross: number }>;
  vat_rate: number;
}

/**
 * VatReportComponent
 *
 * ZATCA-oriented VAT breakdown for a Saudi Arabia filing period.
 * Shows per-source VAT totals, monthly rollup, and invoice-line detail.
 */
@Component({
  selector: 'app-vat-report',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DateRangePickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vat-report.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class VatReportComponent implements OnInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/finance';

  readonly payload = signal<VatPayload | null>(null);
  readonly loading = signal(false);
  readonly error   = signal<string | null>(null);
  readonly range   = signal<DateRange>({ from: '', to: '' });

  ngOnInit(): void {
    // Load on initial date-range emit
  }

  onRangeChange(r: DateRange): void {
    this.range.set(r);
    this.load();
  }

  load(): void {
    const r = this.range();
    if (!r.from || !r.to) return;

    this.loading.set(true);
    this.error.set(null);

    const params = new HttpParams().set('from', r.from).set('to', r.to);

    this.http.get<{ data: VatPayload }>(`${this.base}/vat`, { params })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.payload.set(res.data);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Failed to load VAT report.');
        },
      });
  }

  downloadPdf(): void {
    const r = this.range();
    const token = localStorage.getItem('dawri_token');
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
    window.open(`${this.base}/vat.pdf?from=${r.from}&to=${r.to}${tokenParam}`, '_blank');
  }
  downloadXlsx(): void {
    const r = this.range();
    const token = localStorage.getItem('dawri_token');
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
    window.open(`${this.base}/vat.xlsx?from=${r.from}&to=${r.to}${tokenParam}`, '_blank');
  }

  vatPct(): string {
    const rate = this.payload()?.vat_rate ?? 0.15;
    return `${(rate * 100).toFixed(0)}%`;
  }
}
