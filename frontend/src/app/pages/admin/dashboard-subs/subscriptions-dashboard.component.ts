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

export interface SubsKpis {
  mrr: number;
  arr: number;
  active_count: number;
  trial_count: number;
  new_this_week: number;
  cancelled_this_month: number;
}
export interface PlanRow {
  plan: string;
  count: number;
  mrr_contribution: number;
}
export interface SubsCharts {
  labels: string[];
  new_subs: number[];
  cancellations: number[];
}
export interface UpcomingRenewal {
  id: string;
  user_name: string;
  user_email: string;
  plan: string;
  renews_at: string;
  price: number;
}
export interface ExpiringTrial {
  id: string;
  user_name: string;
  user_email: string;
  plan: string;
  trial_ends_at: string;
}
export interface SubsDashboardPayload {
  kpis: SubsKpis | null;
  plans: PlanRow[];
  charts: SubsCharts | null;
  upcoming_renewals: UpcomingRenewal[];
  expiring_trials: ExpiringTrial[];
  generated_at: string;
}

declare const Chart: any;

/**
 * SubscriptionsDashboardComponent
 *
 * SaaS-focused admin dashboard embedded at the top of the Subscriptions
 * tab on /admin. Shows MRR/ARR, plan breakdown, new-sub vs churn trend,
 * and upcoming renewals/expiring trials needing follow-up.
 *
 * Rendering is gated on `isActive` so Chart.js doesn't fire when the
 * parent tab is hidden (saves a network request when admin is on a
 * different tab).
 */
@Component({
  selector: 'app-subscriptions-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscriptions-dashboard.component.html',
  styleUrls: ['./subscriptions-dashboard.component.scss'],
})
export class SubscriptionsDashboardComponent implements OnInit, AfterViewInit, OnChanges {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private base = 'http://localhost:8001/api/v1/admin/subscriptions/dashboard';

  @Input() isActive = true;

  readonly payload = signal<SubsDashboardPayload | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
  private refreshTimer: number | null = null;

  @ViewChild('subsCanvas')   subsCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('churnCanvas')  churnCanvas!: ElementRef<HTMLCanvasElement>;

  readonly totalActive = computed(() => this.payload()?.kpis?.active_count ?? 0);

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

    this.http.get<{ data: SubsDashboardPayload }>(this.base)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (r) => {
          this.payload.set(r.data);
          this.loading.set(false);
          if (typeof Chart !== 'undefined' && this.subsCanvas) {
            this.renderCharts();
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err?.error?.message ?? 'Failed to load subscriptions dashboard.');
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
    if (this.payload() && this.subsCanvas) this.renderCharts();
  }

  private renderCharts(): void {
    const p = this.payload();
    if (!p || !p.charts) return;

    const configs: Array<[HTMLCanvasElement, number[], string, string]> = [
      [this.subsCanvas.nativeElement,  p.charts.new_subs,      'New subscriptions', '#22c55e'],
      [this.churnCanvas.nativeElement, p.charts.cancellations, 'Cancellations',     '#ef4444'],
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

  daysUntil(iso: string): string {
    const ms = new Date(iso).getTime() - Date.now();
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    if (days < 0) return 'expired';
    if (days === 0) return 'today';
    if (days === 1) return 'tomorrow';
    return `in ${days}d`;
  }

  planPercentage(plan: PlanRow): number {
    const total = this.totalActive();
    if (total === 0) return 0;
    return Math.round((plan.count / total) * 100);
  }
}
