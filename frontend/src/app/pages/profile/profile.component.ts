import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { PlayerProfile, MatchHistoryEntry, GAME_LABELS } from '../../core/models/ranking.model';

/**
 * Player profile page — public view with stats, rankings, match history.
 *
 * Route: /players/:id  (public view)
 *
 * SETUP:
 *  1. Place at: src/app/pages/profile/profile.component.ts
 *  2. Add route:
 *       { path: 'players/:id', loadComponent: () =>
 *           import('./pages/profile/profile.component').then(m => m.ProfileComponent) }
 */
@Component({
  selector: 'dw-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="profile-page" *ngIf="!loading() && profile()">
      <div class="profile-hero">
        <div class="profile-avatar">
          <div class="avatar-circle" *ngIf="!profile()!.avatar">
            {{ profile()!.name.charAt(0).toUpperCase() }}
          </div>
          <img *ngIf="profile()!.avatar" [src]="profile()!.avatar" [alt]="profile()!.name" class="avatar-img" />
        </div>
        <div class="profile-info">
          <h1 class="profile-name">{{ profile()!.game_username || profile()!.name }}</h1>
          <p class="profile-real-name" *ngIf="profile()!.game_username && profile()!.name !== profile()!.game_username">
            {{ profile()!.name }}
          </p>
          <p class="profile-bio" *ngIf="profile()!.bio">{{ profile()!.bio }}</p>
          <div class="profile-meta">
            <span *ngIf="profile()!.country">📍 {{ profile()!.country }}{{ profile()!.city ? ', ' + profile()!.city : '' }}</span>
            <span>📅 Joined {{ profile()!.member_since | date:'mediumDate' }}</span>
          </div>
          <div class="profile-ids" *ngIf="profile()!.psn_id || profile()!.pubg_id || profile()!.cod_id">
            <span class="id-badge" *ngIf="profile()!.psn_id">PSN: {{ profile()!.psn_id }}</span>
            <span class="id-badge" *ngIf="profile()!.pubg_id">PUBG: {{ profile()!.pubg_id }}</span>
            <span class="id-badge" *ngIf="profile()!.cod_id">COD: {{ profile()!.cod_id }}</span>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" *ngIf="profile()!.stats.length > 0">
        @for (stat of profile()!.stats; track stat.game) {
          <div class="stat-card">
            <div class="stat-card__game">{{ gameLabel(stat.game) }}</div>
            <div class="stat-card__row">
              <div class="stat-item">
                <span class="stat-val">{{ stat.total_wins }}</span>
                <span class="stat-lbl">Wins</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">{{ stat.total_losses }}</span>
                <span class="stat-lbl">Losses</span>
              </div>
              <div class="stat-item">
                <span class="stat-val stat-val--gold">{{ stat.win_rate }}%</span>
                <span class="stat-lbl">Win Rate</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">{{ stat.total_tournaments }}</span>
                <span class="stat-lbl">Tournaments</span>
              </div>
              <div class="stat-item">
                <span class="stat-val stat-val--cyan">{{ stat.total_points }}</span>
                <span class="stat-lbl">Points</span>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Rankings -->
      <div class="section" *ngIf="profile()!.rankings.length > 0">
        <h2 class="section-title">Rankings</h2>
        <div class="rankings-grid">
          @for (r of profile()!.rankings; track r.game) {
            <div class="rank-card">
              <span class="rank-card__game">{{ gameLabel(r.game) }}</span>
              <span class="rank-card__pos">#{{ r.rank_position }}</span>
              <span class="rank-card__pts">{{ r.total_points }} pts</span>
            </div>
          }
        </div>
      </div>

      <!-- Match History -->
      <div class="section">
        <h2 class="section-title">Recent Matches</h2>
        <div class="match-list" *ngIf="matches().length > 0">
          @for (m of matches(); track m.match_id) {
            <div class="match-row" [class.match-row--win]="m.result === 'win'"
                 [class.match-row--loss]="m.result === 'loss'">
              <span class="match-result" [class]="'result--' + m.result">{{ m.result | uppercase }}</span>
              <span class="match-opponent">vs {{ m.opponent?.name ?? 'TBD' }}</span>
              <span class="match-score" *ngIf="m.score_a !== null">{{ m.score_a }} - {{ m.score_b }}</span>
              <span class="match-tourney">{{ m.tournament_name }}</span>
              <span class="match-round">R{{ m.round }}</span>
              <span class="match-date">{{ m.played_at | date:'shortDate' }}</span>
            </div>
          }
        </div>
        <p class="empty-msg" *ngIf="matches().length === 0">No matches played yet.</p>
      </div>

      <!-- Recent Tournaments -->
      <div class="section" *ngIf="profile()!.recent_tournaments.length > 0">
        <h2 class="section-title">Tournament History</h2>
        <div class="tourney-list">
          @for (t of profile()!.recent_tournaments; track t.tournament_id) {
            <div class="tourney-row" [routerLink]="['/tournaments', t.tournament_id]">
              <span class="tourney-name">{{ t.tournament_name }}</span>
              <span class="tourney-game">{{ gameLabel(t.game) }}</span>
              <span class="tourney-record">{{ t.wins }}W / {{ t.losses }}L</span>
              <span class="tourney-pts">{{ t.points }} pts</span>
              <span class="tourney-date">{{ t.registered_at | date:'shortDate' }}</span>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div class="loading-state" *ngIf="loading()">
      <div class="lb-spinner"></div>
      <p>Loading profile…</p>
    </div>

    <!-- Error -->
    <div class="error-state" *ngIf="error()">
      <p>{{ error() }}</p>
    </div>
  `,
  styles: [`
    .profile-page { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }

    .profile-hero { display: flex; gap: 1.5rem; margin-bottom: 2rem; align-items: flex-start; }
    .avatar-circle {
      width: 80px; height: 80px; border-radius: 50%; background: #243048;
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; color: var(--cyan, #00e5ff); font-weight: 700;
    }
    .avatar-img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
    .profile-name { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff; margin: 0; }
    .profile-real-name { color: #8892a4; margin: 0.15rem 0 0; font-size: 0.9rem; }
    .profile-bio { color: #dde1ee; margin: 0.5rem 0; max-width: 500px; }
    .profile-meta { display: flex; gap: 1.5rem; color: #8892a4; font-size: 0.85rem; margin: 0.5rem 0; }
    .profile-ids { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
    .id-badge { padding: 0.2rem 0.6rem; border-radius: 4px; background: #1a2235; color: var(--cyan, #00e5ff); font-size: 0.8rem; font-family: 'Space Mono', monospace; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #1a2235; border: 1px solid #243048; border-radius: 8px; padding: 1rem; }
    .stat-card__game { font-size: 0.8rem; text-transform: uppercase; color: var(--cyan, #00e5ff); letter-spacing: 0.05em; margin-bottom: 0.75rem; }
    .stat-card__row { display: flex; gap: 1rem; flex-wrap: wrap; }
    .stat-item { text-align: center; flex: 1; min-width: 50px; }
    .stat-val { display: block; font-size: 1.3rem; font-weight: 700; color: #fff; }
    .stat-val--gold { color: var(--gold, #f0a500); }
    .stat-val--cyan { color: var(--cyan, #00e5ff); }
    .stat-lbl { font-size: 0.7rem; text-transform: uppercase; color: #8892a4; letter-spacing: 0.04em; }

    .section { margin-bottom: 2rem; }
    .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: var(--gold, #f0a500); margin: 0 0 1rem; }

    .rankings-grid { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .rank-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: #1a2235; border: 1px solid #243048; border-radius: 8px; }
    .rank-card__game { font-size: 0.8rem; color: var(--cyan, #00e5ff); text-transform: uppercase; }
    .rank-card__pos { font-size: 1.2rem; font-weight: 700; color: var(--gold, #f0a500); }
    .rank-card__pts { font-size: 0.85rem; color: #8892a4; }

    .match-list, .tourney-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .match-row, .tourney-row {
      display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem;
      background: #1a2235; border: 1px solid #243048; border-radius: 6px;
      font-size: 0.9rem; color: #dde1ee; cursor: pointer; transition: background 0.15s;
    }
    .match-row:hover, .tourney-row:hover { background: #1a2235; }
    .match-result { font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; min-width: 40px; }
    .result--win { color: #2ed573; }
    .result--loss { color: #ff4757; }
    .result--pending { color: #8892a4; }
    .match-opponent { flex: 1; color: #fff; }
    .match-score { font-family: 'Space Mono', monospace; color: var(--gold, #f0a500); }
    .match-tourney { color: #8892a4; font-size: 0.8rem; }
    .match-round { color: #8892a4; font-size: 0.8rem; }
    .match-date { color: #8892a4; font-size: 0.8rem; }
    .match-row--win { border-left: 3px solid #2ed573; }
    .match-row--loss { border-left: 3px solid #ff4757; }

    .tourney-name { flex: 1; color: #fff; }
    .tourney-game { font-size: 0.75rem; text-transform: uppercase; color: var(--cyan, #00e5ff); }
    .tourney-record { font-size: 0.85rem; }
    .tourney-pts { color: var(--gold, #f0a500); font-weight: 600; }
    .tourney-date { color: #8892a4; font-size: 0.8rem; }

    .empty-msg { color: #8892a4; font-style: italic; }
    .loading-state, .error-state { text-align: center; padding: 4rem; color: #8892a4; }
    .lb-spinner { width: 32px; height: 32px; border: 3px solid #243048; border-top-color: var(--cyan, #00e5ff); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 600px) {
      .profile-hero { flex-direction: column; align-items: center; text-align: center; }
      .profile-meta { flex-direction: column; gap: 0.25rem; align-items: center; }
      .match-row, .tourney-row { flex-wrap: wrap; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api   = inject(ApiService);
  readonly auth          = inject(AuthService);

  readonly profile  = signal<PlayerProfile | null>(null);
  readonly matches  = signal<MatchHistoryEntry[]>([]);
  readonly loading  = signal(true);
  readonly error    = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error.set('Player not found.'); this.loading.set(false); return; }

    this.api.getPlayerProfile(id).subscribe({
      next: (res: any) => {
        this.profile.set(res.data);
        this.loading.set(false);
        this.loadMatches(id);
      },
      error: () => {
        this.error.set('Failed to load player profile.');
        this.loading.set(false);
      },
    });
  }

  gameLabel(game: string): string {
    return GAME_LABELS[game] ?? game;
  }

  private loadMatches(userId: string): void {
    this.api.getPlayerMatches(userId, { limit: 20 }).subscribe({
      next: (res: any) => this.matches.set(res.data ?? []),
      error: () => {}, // silent — profile still shows
    });
  }
}
