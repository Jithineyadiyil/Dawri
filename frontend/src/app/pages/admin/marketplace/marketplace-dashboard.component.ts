import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface MarketplaceKpis {
  orders_today: number;
  orders_week: number;
  orders_month: number;
  revenue_today: number;
  revenue_month: number;
  completed_30d: number;
  failed_30d: number;
  refunded_30d: number;
}
export interface MarketplaceCharts {
  labels: string[];
  orders: number[];
  revenue: number[];
}
export interface TopProduct {
  id: string;
  name: string;
  brand: string;
  units_sold: number;
  revenue: number;
}
export interface DistributorSummaryRow {
  distributor: string;
  circuit_status: 'closed' | 'open' | 'half-open';
  failure_count: number;
  last_failure: string | null;
  product_count: number;
  available_codes: number;
}
export interface AlertRow {
  severity: 'info' | 'warning' | 'critical';
  title: string;
  detail: string;
  link: string;
  count: number;
}
export interface MarketplaceDashboardPayload {
  kpis: MarketplaceKpis;
  charts: MarketplaceCharts;
  top_products: TopProduct[];
  distributor_summary: DistributorSummaryRow[];
  alerts: AlertRow[];
  generated_at: string;
}

declare const Chart: any;

/**
 * MarketplaceDashboardComponent
 *
 * Marketplace-focused admin dashboard. Embedded as the landing tab of
 * /admin/marketplace. Shows orders/revenue KPIs, 7-day order+revenue
 * trend, top-selling products, distributor health, and alerts.
 *
 * Rendering is gated on `isActive` so Chart.js doesn't fire when the
 * parent tab is hidden (prevents wasted requests when admin is on
 * Products / Orders / Distributors tabs).
 */
@Component({
  selector: 'app-marketplace-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './marketplace-dashboard.component.html',
  styleUrls: ['./marketplace-dashboard.component.scss'],
})
export class MarketplaceDashboardComponent implements OnInit, AfterViewInit, OnChanges {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/marketplace/dashboard';

  /** Parent sets this to true only when Dashboard tab is active. */
  @Input() isActive = true;

  readonly payload = signal<MarketplaceDashboardPayload | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
  private refreshTimer: number | null = null;

  @ViewChild('ordersCanvas')  ordersCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;

  readonly criticalAlertsCount = computed(
    () => this.payload()?.alerts.filter(a => a.severity === 'critical').length ?? 0,
  );

  ngOnInit(): void {
    if (this.isActive) this.loadDashboard();

    this.refreshTimer = window.setInterval(() => {
      if (this.isActive) this.loadDashboard();
    }, 60_000);
    this.destroyRef.onDestroy(() => {
      if (this.refreshTimer !== null) window.clearInterval(this.refreshTimer);
    });
  }

  ngAfterViewInit(): void {
    this.loadChartJsThenRender();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isActive']?.currentValue === true && !this.payload()) {
      this.loadDashboard();
    }
  }

  loadDashboard(): void {
    if (!this.payload()) this.loading.set(true);
    this.error.set(null);

    this.http.get<{ data: MarketplaceDashboardPayload }>(this.base)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (r) => {
          this.payload.set(r.data);
          this.loading.set(false);
          if (typeof Chart !== 'undefined' && this.ordersCanvas) {
            this.renderCharts();
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Failed to load marketplace dashboard.');
        },
      });
  }

  refreshManually(): void {
    this.loadDashboard();
  }

  // ── Chart.js bootstrap ─────────────────────────────────────────

  private loadChartJsThenRender(): void {
    if (typeof Chart !== 'undefined') { this.tryRender(); return; }
    if (document.querySelector(`script[src="${this.CHART_JS_URL}"]`)) {
      const check = () => typeof Chart !== 'undefined' ? this.tryRender() : setTimeout(check, 100);
      check();
      return;
    }
    const script = document.createElement('script');
    script.src = this.CHART_JS_URL;
    script.async = true;
    script.onload = () => this.tryRender();
    script.onerror = () => this.error.set('Failed to load charts library.');
    document.head.appendChild(script);
  }

  private tryRender(): void {
    if (this.payload() && this.ordersCanvas) this.renderCharts();
  }

  private renderCharts(): void {
    const p = this.payload();
    if (!p) return;

    const configs: Array<[HTMLCanvasElement, number[], string, string]> = [
      [this.ordersCanvas.nativeElement,  p.charts.orders,  'Orders',  '#a855f7'],
      [this.revenueCanvas.nativeElement, p.charts.revenue, 'Revenue (SAR)', '#fbbf24'],
    ];

    for (const [canvas, data, label, color] of configs) {
      const existing = Chart.getChart(canvas);
      if (existing) existing.destroy();

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: p.charts.labels,
          datasets: [{
            label, data,
            borderColor: color,
            backgroundColor: color + '20',
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: color,
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0a0a14',
              titleColor: '#fff',
              bodyColor: '#ccc',
              borderColor: color,
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

  // ── Helpers ────────────────────────────────────────────────────

  timeAgo(iso: string | null): string {
    if (!iso) return '';
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  circuitPillClass(row: DistributorSummaryRow): string {
    return `pill pill-${row.circuit_status}`;
  }
}
