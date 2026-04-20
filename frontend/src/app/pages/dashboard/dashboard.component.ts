import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'dw-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dash">
      <!-- Header -->
      <div class="dash-header">
        <div>
          <h1 class="dash-greeting">{{ greeting() }}</h1>
          <p class="dash-sub" *ngIf="role() === 'admin'">Platform overview</p>
          <p class="dash-sub" *ngIf="role() === 'organizer'">Your tournament hub</p>
          <p class="dash-sub" *ngIf="role() === 'player'">Your competitive journey</p>
        </div>
        <div class="dash-actions">
          <a routerLink="/tournaments" class="btn btn-outline" *ngIf="role() === 'player'">Browse Tournaments</a>
          <a routerLink="/subscription" class="btn btn-gold" *ngIf="role() === 'organizer'">Manage Plan</a>
        </div>
      </div>

      <!-- Loading -->
      <div class="dash-loading" *ngIf="loading()">
        <div class="spinner"></div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row" *ngIf="!loading() && stats().length">
        @for (s of stats(); track s.label) {
          <div class="stat-card">
            <div class="stat-card__icon" [attr.data-icon]="s.icon">
              @switch (s.icon) {
                @case ('users')   { 👥 }
                @case ('trophy')  { 🏆 }
                @case ('revenue') { 💰 }
                @case ('activity'){ 📊 }
                @case ('live')    { 🔴 }
                @case ('win')     { ⭐ }
                @case ('percent') { 📈 }
                @case ('wallet')  { 💳 }
                @case ('check')   { ✅ }
                @default          { 📌 }
              }
            </div>
            <div class="stat-card__data">
              <span class="stat-card__value">
                {{ s.format === 'currency' ? (s.value | number:'1.0-0') + ' SAR' : s.value }}
              </span>
              <span class="stat-card__label">{{ s.label }}</span>
            </div>
          </div>
        }
      </div>

      <!-- ═══ ADMIN VIEW ═══ -->
      <ng-container *ngIf="role() === 'admin' && !loading()">
        <div class="dash-grid">
          <!-- Subscription Breakdown -->
          <div class="dash-panel">
            <h3 class="panel-title">Active Subscriptions</h3>
            <div class="sub-breakdown" *ngIf="data()?.subscriptions_by_plan">
              @for (entry of subEntries(); track entry.plan) {
                <div class="sub-row">
                  <span class="sub-plan">{{ entry.plan | titlecase }}</span>
                  <div class="sub-bar-wrap">
                    <div class="sub-bar" [style.width.%]="entry.pct"></div>
                  </div>
                  <span class="sub-count">{{ entry.count }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Revenue Trend -->
          <div class="dash-panel">
            <h3 class="panel-title">Revenue Trend</h3>
            <div class="chart-bars" *ngIf="data()?.revenue_trend">
              @for (m of data()!.revenue_trend; track m.month) {
                <div class="chart-bar-group">
                  <div class="chart-bar" [style.height.%]="barHeight(m.total)"></div>
                  <span class="chart-label">{{ m.month.slice(5) }}</span>
                </div>
              }
            </div>
            <p class="panel-total">Total: {{ data()?.total_revenue | number:'1.0-0' }} SAR</p>
          </div>

          <!-- Recent Tournaments -->
          <div class="dash-panel dash-panel--wide">
            <h3 class="panel-title">Recent Tournaments</h3>
            <div class="activity-list" *ngIf="data()?.recent_tournaments">
              @for (t of data()!.recent_tournaments; track t.id) {
                <div class="activity-row" [routerLink]="['/tournaments', t.id]">
                  <span class="activity-name">{{ t.name }}</span>
                  <span class="activity-game game-badge">{{ t.game }}</span>
                  <span class="activity-status status-badge" [class]="'status--' + t.status">{{ t.status }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </ng-container>

      <!-- ═══ ORGANIZER VIEW ═══ -->
      <ng-container *ngIf="role() === 'organizer' && !loading()">
        <div class="dash-grid">
          <!-- Subscription Card -->
          <div class="dash-panel plan-panel">
            <div class="plan-header">
              <h3 class="panel-title">Your Plan</h3>
              <span class="plan-badge" [class]="'plan--' + data()?.subscription?.plan">
                {{ data()?.subscription?.plan_name }}
              </span>
            </div>
            <div class="plan-details" *ngIf="data()?.subscription">
              <div class="plan-detail" *ngIf="data()!.subscription.on_trial">
                <span class="detail-label">Trial ends</span>
                <span class="detail-value detail-value--warn">{{ data()!.subscription.trial_ends_at | date:'mediumDate' }}</span>
              </div>
              <div class="plan-detail" *ngIf="data()!.subscription.price > 0">
                <span class="detail-label">Monthly cost</span>
                <span class="detail-value">{{ data()!.subscription.price | number:'1.0-0' }} SAR</span>
              </div>
              <div class="plan-detail" *ngIf="data()!.subscription.period_end">
                <span class="detail-label">Next billing</span>
                <span class="detail-value">{{ data()!.subscription.period_end | date:'mediumDate' }}</span>
              </div>
            </div>
            <a routerLink="/subscription" class="btn btn-outline btn-sm mt-1">Manage Plan →</a>
          </div>

          <!-- Usage -->
          <div class="dash-panel">
            <h3 class="panel-title">Usage This Month</h3>
            <div class="usage-meter" *ngIf="data()?.usage">
              <div class="usage-label">
                <span>Tournaments Created</span>
                <span>{{ data()!.usage.tournaments_this_month }} / {{ data()!.usage.limit === -1 ? '∞' : data()!.usage.limit }}</span>
              </div>
              <div class="usage-bar-wrap">
                <div class="usage-bar" [style.width.%]="usagePct()"></div>
              </div>
            </div>
          </div>

          <!-- Recent Tournaments -->
          <div class="dash-panel dash-panel--wide">
            <h3 class="panel-title">Your Tournaments</h3>
            <div class="activity-list">
              @for (t of data()?.recent_tournaments ?? []; track t.id) {
                <div class="activity-row" [routerLink]="['/tournaments', t.id]">
                  <span class="activity-name">{{ t.name }}</span>
                  <span class="activity-game game-badge">{{ t.game }}</span>
                  <span class="activity-meta">{{ t.participants_count }}/{{ t.max_participants }}</span>
                  <span class="activity-status status-badge" [class]="'status--' + t.status">{{ t.status }}</span>
                </div>
              }
            </div>
            <a routerLink="/tournaments" class="panel-link">View all →</a>
          </div>
        </div>
      </ng-container>

      <!-- ═══ PLAYER VIEW ═══ -->
      <ng-container *ngIf="role() === 'player' && !loading()">
        <div class="dash-grid">
          <!-- Rankings -->
          <div class="dash-panel">
            <h3 class="panel-title">My Rankings</h3>
            <div class="rankings-list" *ngIf="data()?.rankings?.length > 0">
              @for (r of data()!.rankings; track r.game) {
                <div class="rank-row">
                  <span class="rank-game">{{ gameLabel(r.game) }}</span>
                  <span class="rank-pos">#{{ r.rank_position }}</span>
                  <span class="rank-pts">{{ r.total_points }} pts</span>
                </div>
              }
            </div>
            <p class="empty-msg" *ngIf="!data()?.rankings?.length">Play tournaments to earn rankings!</p>
            <a routerLink="/leaderboard" class="panel-link">View Leaderboard →</a>
          </div>

          <!-- Upcoming Matches -->
          <div class="dash-panel">
            <h3 class="panel-title">Upcoming Matches</h3>
            <div class="match-list" *ngIf="data()?.upcoming_matches?.length > 0">
              @for (m of data()!.upcoming_matches; track m.id) {
                <div class="match-row-mini">
                  <span class="match-tourney-name">{{ m.bracket?.tournament?.name }}</span>
                  <span class="match-vs">Round {{ m.round_number }}</span>
                </div>
              }
            </div>
            <p class="empty-msg" *ngIf="!data()?.upcoming_matches?.length">No upcoming matches.</p>
          </div>

          <!-- Recent Activity -->
          <div class="dash-panel dash-panel--wide">
            <h3 class="panel-title">Recent Activity</h3>
            <div class="activity-list" *ngIf="data()?.recent_results?.length > 0">
              @for (r of data()!.recent_results; track r.tournament_id) {
                <div class="activity-row" [routerLink]="['/tournaments', r.tournament?.id]">
                  <span class="activity-name">{{ r.tournament?.name }}</span>
                  <span class="activity-game game-badge">{{ r.tournament?.game }}</span>
                  <span class="activity-meta">{{ r.wins }}W / {{ r.losses }}L</span>
                </div>
              }
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .dash { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }
    .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
    .dash-greeting { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; margin: 0; letter-spacing: 1px; }
    .dash-sub { color: #8892a4; margin: 0.2rem 0 0; font-size: 0.9rem; }
    .dash-actions { display: flex; gap: 0.5rem; }

    .btn { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.5rem 1.2rem; border-radius: 6px; cursor: pointer; text-decoration: none; border: none; transition: all 0.15s; display: inline-flex; align-items: center; }
    .btn-gold { background: var(--gold, #f0a500); color: #060810; }
    .btn-gold:hover { opacity: 0.85; }
    .btn-outline { border: 1px solid #1e2a3a; color: #8892a4; background: transparent; }
    .btn-outline:hover { border-color: var(--gold, #f0a500); color: var(--gold, #f0a500); }
    .btn-sm { font-size: 0.75rem; padding: 0.4rem 0.8rem; }
    .mt-1 { margin-top: 0.75rem; }

    /* Stats Row */
    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 2rem; }
    .stat-card { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; background: #0a0e18; border: 1px solid #1e2a3a; border-radius: 10px; transition: border-color 0.2s; }
    .stat-card:hover { border-color: #2a3a4a; }
    .stat-card__icon { font-size: 1.5rem; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(240, 165, 0, 0.08); border-radius: 10px; }
    .stat-card__value { display: block; font-size: 1.4rem; font-weight: 700; color: #fff; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.5px; }
    .stat-card__label { font-size: 0.75rem; color: #8892a4; text-transform: uppercase; letter-spacing: 0.04em; }

    /* Grid */
    .dash-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; }
    .dash-panel { background: #0a0e18; border: 1px solid #1e2a3a; border-radius: 10px; padding: 1.25rem; }
    .dash-panel--wide { grid-column: 1 / -1; }
    .panel-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: var(--gold, #f0a500); margin: 0 0 1rem; letter-spacing: 0.5px; }
    .panel-total { font-size: 0.85rem; color: #8892a4; margin-top: 0.75rem; text-align: right; }
    .panel-link { display: inline-block; margin-top: 0.75rem; font-size: 0.8rem; color: var(--cyan, #00e5ff); text-decoration: none; }
    .panel-link:hover { text-decoration: underline; }

    /* Subscription Breakdown */
    .sub-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
    .sub-plan { width: 90px; font-size: 0.85rem; color: #c8cfd8; }
    .sub-bar-wrap { flex: 1; height: 8px; background: #111827; border-radius: 4px; overflow: hidden; }
    .sub-bar { height: 100%; background: linear-gradient(90deg, var(--gold, #f0a500), var(--cyan, #00e5ff)); border-radius: 4px; transition: width 0.6s ease; }
    .sub-count { font-size: 0.85rem; color: var(--gold, #f0a500); font-weight: 600; min-width: 30px; text-align: right; }

    /* Chart Bars */
    .chart-bars { display: flex; align-items: flex-end; gap: 0.5rem; height: 120px; padding-top: 0.5rem; }
    .chart-bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
    .chart-bar { width: 100%; background: linear-gradient(180deg, var(--gold, #f0a500), rgba(240,165,0,0.3)); border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.6s ease; }
    .chart-label { font-size: 0.7rem; color: #8892a4; margin-top: 0.4rem; }

    /* Plan Panel */
    .plan-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .plan-badge { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.25rem 0.75rem; border-radius: 20px; }
    .plan--free { background: #111827; color: #8892a4; }
    .plan--starter { background: rgba(0, 229, 255, 0.1); color: var(--cyan, #00e5ff); }
    .plan--professional { background: rgba(240, 165, 0, 0.15); color: var(--gold, #f0a500); }
    .plan--enterprise { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
    .plan-details { display: flex; flex-direction: column; gap: 0.5rem; }
    .plan-detail { display: flex; justify-content: space-between; font-size: 0.85rem; }
    .detail-label { color: #8892a4; }
    .detail-value { color: #fff; font-weight: 500; }
    .detail-value--warn { color: #f59e0b; }

    /* Usage */
    .usage-meter { margin-top: 0.5rem; }
    .usage-label { display: flex; justify-content: space-between; font-size: 0.85rem; color: #c8cfd8; margin-bottom: 0.5rem; }
    .usage-bar-wrap { height: 10px; background: #111827; border-radius: 5px; overflow: hidden; }
    .usage-bar { height: 100%; background: var(--cyan, #00e5ff); border-radius: 5px; transition: width 0.5s ease; }

    /* Activity List */
    .activity-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .activity-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; background: #060810; border: 1px solid #111827; border-radius: 6px; cursor: pointer; transition: background 0.15s; }
    .activity-row:hover { background: #111827; }
    .activity-name { flex: 1; color: #fff; font-size: 0.9rem; }
    .activity-meta { font-size: 0.8rem; color: #8892a4; }
    .game-badge { font-size: 0.7rem; text-transform: uppercase; color: var(--cyan, #00e5ff); letter-spacing: 0.04em; }
    .status-badge { font-size: 0.7rem; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 4px; letter-spacing: 0.04em; }
    .status--registration_open { background: rgba(0,229,255,0.1); color: var(--cyan, #00e5ff); }
    .status--in_progress { background: rgba(240,165,0,0.1); color: var(--gold, #f0a500); }
    .status--completed { background: rgba(34,197,94,0.1); color: #22c55e; }
    .status--cancelled { background: rgba(239,68,68,0.1); color: #ef4444; }

    /* Rankings */
    .rank-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid #111827; }
    .rank-row:last-child { border: none; }
    .rank-game { flex: 1; font-size: 0.85rem; color: var(--cyan, #00e5ff); text-transform: uppercase; }
    .rank-pos { font-size: 1.1rem; font-weight: 700; color: var(--gold, #f0a500); }
    .rank-pts { font-size: 0.8rem; color: #8892a4; }

    /* Match mini */
    .match-row-mini { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #111827; font-size: 0.85rem; }
    .match-tourney-name { color: #fff; }
    .match-vs { color: #8892a4; }

    .empty-msg { color: #8892a4; font-size: 0.85rem; font-style: italic; }

    /* Loading */
    .dash-loading { display: flex; justify-content: center; padding: 4rem; }
    .spinner { width: 36px; height: 36px; border: 3px solid #1e2a3a; border-top-color: var(--cyan, #00e5ff); border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 640px) {
      .stats-row { grid-template-columns: repeat(2, 1fr); }
      .dash-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private readonly api  = inject(ApiService);
  private readonly auth = inject(AuthService);

  readonly loading = signal(true);
  readonly data    = signal<any>(null);

  readonly role = computed(() => this.data()?.role ?? this.auth.currentUser()?.role ?? 'player');
  readonly stats = computed(() => this.data()?.stats ?? []);

  readonly greeting = computed(() => {
    const name = this.auth.currentUser()?.name?.split(' ')[0] ?? '';
    const hour = new Date().getHours();
    const time = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return name ? `${time}, ${name}` : time;
  });

  readonly subEntries = computed(() => {
    const subs = this.data()?.subscriptions_by_plan;
    if (!subs) return [];
    const total = Object.values(subs).reduce((a: any, b: any) => a + b, 0) as number;
    return Object.entries(subs).map(([plan, count]: any) => ({
      plan,
      count,
      pct: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
  });

  ngOnInit(): void {
    this.api.getDashboard().subscribe({
      next: (res: any) => {
        this.data.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  gameLabel(game: string): string {
    const labels: Record<string, string> = { ea_fc25: 'EA FC 25', pubg_mobile: 'PUBG Mobile', cod_mobile: 'CoD Mobile' };
    return labels[game] ?? game;
  }

  barHeight(value: number): number {
    const trend = this.data()?.revenue_trend ?? [];
    const max = Math.max(...trend.map((m: any) => m.total), 1);
    return Math.round((value / max) * 100);
  }

  usagePct(): number {
    const usage = this.data()?.usage;
    if (!usage || usage.limit === -1) return 0;
    return Math.min(100, Math.round((usage.tournaments_this_month / Math.max(usage.limit, 1)) * 100));
  }
}
