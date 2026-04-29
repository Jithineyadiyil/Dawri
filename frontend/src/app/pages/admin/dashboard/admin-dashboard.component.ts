import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

/**
 * KPI tile shape — one of six on the top row. The backend returns these
 * under `data.kpis.{users,tournaments,orders_today,revenue_today,mrr,sponsorships}`.
 */
export interface KpiTile {
  label: string;
  value: number;
  sub: string;
  delta_pct: number | null;
  trend: 'up' | 'down' | 'flat';
}

export interface ChartsPayload {
  labels: string[];
  orders: number[];
  revenue: number[];
  signups: number[];
}

export interface ActivityEvent {
  type: 'order' | 'signup' | 'tournament' | 'sponsorship';
  icon: string;
  headline: string;
  detail: string;
  status: string | null;
  link: string;
  timestamp: string | null;
}

export interface AlertRow {
  severity: 'info' | 'warning' | 'critical';
  title: string;
  detail: string;
  link: string;
  count: number;
}

export interface DashboardPayload {
  kpis: {
    users: KpiTile;
    tournaments: KpiTile;
    orders_today: KpiTile;
    revenue_today: KpiTile;
    mrr: KpiTile;
    sponsorships: KpiTile;
  };
  charts: ChartsPayload;
  activity: ActivityEvent[];
  alerts: AlertRow[];
  generated_at: string;
}

declare const Chart: any; // loaded from CDN — see ngAfterViewInit

/**
 * AdminDashboardComponent
 *
 * Single-page admin overview — KPIs + charts + activity + alerts.
 * All four sections render from one backend call to /admin/dashboard.
 *
 * Chart.js is loaded via a CDN script tag injected into <head> the first
 * time this component mounts. Done this way so we don't add chart.js to
 * package.json for a single-page use — the CDN version (~70kb gzipped)
 * loads once and caches.
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/dashboard';

  readonly payload = signal<DashboardPayload | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /** Auto-refresh interval in ms. 60s = 1min. */
  private readonly REFRESH_INTERVAL_MS = 60_000;
  private refreshTimer: number | null = null;

  // Chart.js script URL — locked to a specific version for reproducibility
  private readonly CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';

  @ViewChild('ordersCanvas')  ordersCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('signupsCanvas') signupsCanvas!: ElementRef<HTMLCanvasElement>;

  private chartsRendered = false;

  readonly kpiTiles = computed(() => {
    const p = this.payload();
    if (!p) return [];
    return [
      { key: 'users',         data: p.kpis.users },
      { key: 'tournaments',   data: p.kpis.tournaments },
      { key: 'orders_today',  data: p.kpis.orders_today },
      { key: 'revenue_today', data: p.kpis.revenue_today },
      { key: 'mrr',           data: p.kpis.mrr },
      { key: 'sponsorships',  data: p.kpis.sponsorships },
    ];
  });

  readonly criticalAlertsCount = computed(() => {
    return this.payload()?.alerts.filter(a => a.severity === 'critical').length ?? 0;
  });

  ngOnInit(): void {
    this.loadDashboard();

    // Auto-refresh every 60 seconds
    this.refreshTimer = window.setInterval(() => this.loadDashboard(), this.REFRESH_INTERVAL_MS);
    this.destroyRef.onDestroy(() => {
      if (this.refreshTimer !== null) {
        window.clearInterval(this.refreshTimer);
      }
    });
  }

  ngAfterViewInit(): void {
    this.loadChartJsThenRender();
  }

  /**
   * Fetch dashboard data. Silent refresh — don't toggle loading signal
   * on subsequent pulls so the UI doesn't flicker on auto-refresh.
   */
  loadDashboard(isInitial = true): void {
    if (isInitial && !this.payload()) {
      this.loading.set(true);
    }
    this.error.set(null);

    this.http.get<{ data: DashboardPayload }>(this.base)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (r) => {
          this.payload.set(r.data);
          this.loading.set(false);
          // Re-render charts if we've already loaded Chart.js + have canvas refs
          if (typeof Chart !== 'undefined' && this.ordersCanvas) {
            this.renderCharts();
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Failed to load dashboard.');
        },
      });
  }

  refreshManually(): void {
    this.loadDashboard(false);
  }

  // ── Chart.js bootstrap + render ─────────────────────────────────

  /**
   * Load Chart.js from CDN once per page lifetime, then render all three
   * charts once the library is available and data has arrived.
   */
  private loadChartJsThenRender(): void {
    // Already loaded (e.g. by another component earlier)?
    if (typeof Chart !== 'undefined') {
      this.tryRenderWhenReady();
      return;
    }

    // Already loading? Wait for the existing script to finish.
    if (document.querySelector(`script[src="${this.CHART_JS_URL}"]`)) {
      const check = () => {
        if (typeof Chart !== 'undefined') {
          this.tryRenderWhenReady();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
      return;
    }

    const script = document.createElement('script');
    script.src = this.CHART_JS_URL;
    script.async = true;
    script.onload = () => this.tryRenderWhenReady();
    script.onerror = () => this.error.set('Failed to load charts library.');
    document.head.appendChild(script);
  }

  private tryRenderWhenReady(): void {
    // Data may not have arrived yet — if so, the next loadDashboard tick will render
    if (this.payload() && this.ordersCanvas) {
      this.renderCharts();
    }
  }

  /**
   * Render the three Chart.js line charts. Destroys any previous chart
   * instances first so auto-refresh doesn't stack charts on top of each
   * other in the same canvas.
   */
  private renderCharts(): void {
    const p = this.payload();
    if (!p) return;

    const charts: Array<[HTMLCanvasElement, number[], string, string]> = [
      [this.ordersCanvas.nativeElement,  p.charts.orders,  'Orders',  '#a855f7'],
      [this.revenueCanvas.nativeElement, p.charts.revenue, 'Revenue', '#fbbf24'],
      [this.signupsCanvas.nativeElement, p.charts.signups, 'Signups', '#38bdf8'],
    ];

    for (const [canvas, data, label, color] of charts) {
      const existing = Chart.getChart(canvas);
      if (existing) existing.destroy();

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: p.charts.labels,
          datasets: [{
            label,
            data,
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
            x: {
              grid:  { color: '#1a1a2a' },
              ticks: { color: '#666', font: { size: 10 } },
            },
            y: {
              grid:  { color: '#1a1a2a' },
              ticks: { color: '#666', font: { size: 10 } },
              beginAtZero: true,
            },
          },
        },
      });
    }

    this.chartsRendered = true;
  }

  // ── Formatting helpers ──────────────────────────────────────────

  formatDelta(pct: number | null): string {
    if (pct === null) return '—';
    const sign = pct > 0 ? '+' : '';
    return `${sign}${pct.toFixed(1)}%`;
  }

  trendSymbol(trend: 'up' | 'down' | 'flat'): string {
    return trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
  }

  timeAgo(iso: string | null): string {
    if (!iso) return '';
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
