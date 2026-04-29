import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateRangePickerComponent, DateRange } from './date-range-picker.component';

export interface RevenuePayload {
  period: { from: string; to: string; days: number };
  totals: { marketplace: number; subscriptions: number; sponsorships: number; grand_total: number };
  rows: Array<{ source: string; period_label: string; count: number; gross: number; vat: number; net: number }>;
  daily_series: {
    labels: string[];
    marketplace: number[];
    subscriptions: number[];
    sponsorships: number[];
  };
}

declare const Chart: any;

/**
 * RevenueReportComponent
 *
 * Displays total revenue across marketplace, subscriptions, and
 * sponsorships for a selected date range. Includes a stacked-line chart
 * (one series per source), a summary table by source, and a drilldown
 * table showing monthly breakdown.
 */
@Component({
  selector: 'app-revenue-report',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, DateRangePickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./finance.component.scss'],
})
export class RevenueReportComponent implements OnInit, AfterViewInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/finance';
  private readonly CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';

  readonly payload = signal<RevenuePayload | null>(null);
  readonly loading = signal(false);
  readonly error   = signal<string | null>(null);

  // Filters
  readonly range = signal<DateRange>({ from: '', to: '' });
  readonly sources = signal<Record<'marketplace' | 'subscriptions' | 'sponsorships', boolean>>({
    marketplace: true,
    subscriptions: true,
    sponsorships: true,
  });

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    // Initial load happens after date range picker emits on mount
  }

  ngAfterViewInit(): void {
    this.loadChartJs();
  }

  onRangeChange(range: DateRange): void {
    this.range.set(range);
    this.load();
  }

  toggleSource(key: 'marketplace' | 'subscriptions' | 'sponsorships'): void {
    const cur = this.sources();
    this.sources.set({ ...cur, [key]: !cur[key] });
    this.load();
  }

  load(): void {
    const r = this.range();
    if (!r.from || !r.to) return;

    this.loading.set(true);
    this.error.set(null);

    const srcList = Object.entries(this.sources())
      .filter(([, on]) => on)
      .map(([k]) => k);

    let params = new HttpParams().set('from', r.from).set('to', r.to);
    for (const s of srcList) params = params.append('sources[]', s);

    this.http.get<{ data: RevenuePayload }>(`${this.base}/revenue`, { params })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.payload.set(res.data);
          this.loading.set(false);
          this.renderChart();
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Failed to load revenue report.');
        },
      });
  }

  downloadPdf(): void {
    const r = this.range();
    const srcList = Object.entries(this.sources()).filter(([, on]) => on).map(([k]) => k);
    const params = new URLSearchParams({ from: r.from, to: r.to });
    srcList.forEach(s => params.append('sources[]', s));
    const token = localStorage.getItem('dawri_token');
    if (token) params.set('token', token);
    window.open(`${this.base}/revenue.pdf?${params.toString()}`, '_blank');
  }

  downloadXlsx(): void {
    const r = this.range();
    const srcList = Object.entries(this.sources()).filter(([, on]) => on).map(([k]) => k);
    const params = new URLSearchParams({ from: r.from, to: r.to });
    srcList.forEach(s => params.append('sources[]', s));
    const token = localStorage.getItem('dawri_token');
    if (token) params.set('token', token);
    window.open(`${this.base}/revenue.xlsx?${params.toString()}`, '_blank');
  }

  // ── Chart.js bootstrap ────────────────────────────────────────

  private loadChartJs(): void {
    if (typeof Chart !== 'undefined') { this.renderChart(); return; }
    if (document.querySelector(`script[src="${this.CHART_JS_URL}"]`)) {
      const check = () => typeof Chart !== 'undefined' ? this.renderChart() : setTimeout(check, 100);
      check();
      return;
    }
    const s = document.createElement('script');
    s.src = this.CHART_JS_URL;
    s.async = true;
    s.onload = () => this.renderChart();
    document.head.appendChild(s);
  }

  private renderChart(): void {
    const p = this.payload();
    if (!p || !this.chartCanvas) return;

    const existing = Chart.getChart(this.chartCanvas.nativeElement);
    if (existing) existing.destroy();

    const datasets: any[] = [];
    const sources = this.sources();
    const colors: Record<string, string> = {
      marketplace: '#a855f7', subscriptions: '#fbbf24', sponsorships: '#38bdf8',
    };
    const labels: Record<string, string> = {
      marketplace: 'Marketplace', subscriptions: 'Subscriptions', sponsorships: 'Sponsorships',
    };

    for (const key of ['marketplace', 'subscriptions', 'sponsorships'] as const) {
      if (!sources[key]) continue;
      datasets.push({
        label: labels[key],
        data: p.daily_series[key],
        borderColor: colors[key],
        backgroundColor: colors[key] + '20',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        borderWidth: 2,
      });
    }

    new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: { labels: p.daily_series.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#ccc', font: { size: 11 } } },
          tooltip: {
            backgroundColor: '#0a0a14',
            titleColor: '#fff',
            bodyColor: '#ccc',
            borderColor: '#2a2a3a',
            borderWidth: 1,
          },
        },
        scales: {
          x: { grid: { color: '#1a1a2a' }, ticks: { color: '#666', font: { size: 10 } } },
          y: { grid: { color: '#1a1a2a' }, ticks: { color: '#666', font: { size: 10 } }, beginAtZero: true },
        },
      },
    });
  }
}
