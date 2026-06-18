import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DiscoveryRow, PlayerDiscoveryService } from './player-discovery.service';
import { GAME_LABELS } from './player-profile.service';
import { FriendService } from '../../core/services/friend.service';
import { DmService } from '../social/dm.service';
import { ChallengeUiService } from '../social/challenge-ui.service';
import { ToastService } from '../../core/services/toast.service';

/**
 * /players — Player Discovery (Dawri 2.0).
 *
 * Faceted search: game + country + name + online + min-wins + sort.
 * Each result has inline Add-friend / Message / Challenge based on the
 * relationship state from FriendService.
 */
@Component({
  selector: 'app-player-discovery-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="pd-shell">
  <header class="pd-head">
    <div>
      <div class="pd-eyebrow">Discover</div>
      <h1 class="pd-title">Players</h1>
    </div>
  </header>

  <div class="pd-filters">
    <div class="pd-search">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" placeholder="Search by name or nickname" [ngModel]="q()" (ngModelChange)="q.set($event); refresh()"/>
    </div>

    <div class="pd-chips">
      <button class="pd-chip" [class.active]="!game()" (click)="setGame(null)">All games</button>
      @for (g of games; track g.value) {
        <button class="pd-chip" [class.active]="game() === g.value" (click)="setGame(g.value)">{{ g.label }}</button>
      }
    </div>

    <div class="pd-row">
      <label class="pd-online">
        <input type="checkbox" [checked]="onlineOnly()" (change)="onlineOnly.set(!onlineOnly()); refresh()"/>
        Online only
      </label>
      <div class="pd-sort">
        <span class="pd-l">Sort</span>
        <select [ngModel]="sort()" (ngModelChange)="sort.set($event); refresh()">
          <option value="wins">Most wins</option>
          <option value="win_rate">Best win rate</option>
          <option value="recent">Most active</option>
        </select>
      </div>
      @if (resultCount() != null) {
        <span class="pd-count"><strong>{{ resultCount() }}</strong> players</span>
      }
    </div>
  </div>

  @if (loading()) {
    <div class="pd-grid">
      @for (i of [1,2,3,4,5,6]; track i) { <div class="pd-skel"></div> }
    </div>
  } @else if (rows().length === 0) {
    <div class="pd-empty">
      <h3>No players match</h3>
      <p>Try a different game, clear the online filter, or broaden the search.</p>
    </div>
  } @else {
    <div class="pd-grid">
      @for (r of rows(); track r.user.id) {
        <article class="pd-card">
          <a class="pd-card__main" [routerLink]="['/players', r.user.id]">
            <span class="pd-ava">
              <span class="pd-dot" [class]="'pd-dot--' + r.presence" [title]="r.presence"></span>
              @if (r.user.avatar_url) { <img [src]="r.user.avatar_url" [alt]="r.user.display_name"/> }
              @else { <span class="pd-ava-letter">{{ (r.user.display_name || '?').charAt(0) }}</span> }
            </span>
            <div class="pd-id">
              <div class="pd-name">{{ r.user.display_name }}</div>
              @if (r.user.nickname) { <div class="pd-nick">{{ '@' + r.user.nickname }}</div> }
              @if (r.user.city || r.user.country) {
                <div class="pd-loc">{{ r.user.city }}{{ r.user.city && r.user.country ? ', ' : '' }}{{ r.user.country }}</div>
              }
              <div class="pd-stats">
                <span class="pd-stat"><strong>{{ r.wins }}</strong>W</span>
                <span class="pd-stat"><strong>{{ r.matches_played }}</strong>M</span>
                <span class="pd-stat">{{ r.win_rate }}%</span>
                @if (r.tournaments_won > 0) { <span class="pd-stat pd-stat--gold">{{ r.tournaments_won }} 🏆</span> }
              </div>
            </div>
          </a>
          <div class="pd-actions">
            @switch (friends.relationshipWith(r.user.id)) {
              @case ('none') {
                <button class="pd-icon" title="Add friend" (click)="addFriend(r)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                </button>
              }
              @case ('pending_outgoing') { <span class="pd-icon pd-icon--pending" title="Request sent">···</span> }
              @case ('pending_incoming') {
                <button class="pd-icon pd-icon--accept" title="Accept friend request" (click)="acceptFriend(r)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
              }
              @case ('friends') {
                <button class="pd-icon pd-icon--msg" title="Message" (click)="message(r)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
                <button class="pd-icon pd-icon--challenge" title="Challenge" (click)="challenge(r)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </button>
              }
            }
          </div>
        </article>
      }
    </div>
  }
</div>
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .pd-shell { max-width: 1100px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }
    .pd-head { margin-bottom: 1.1rem; }
    .pd-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .pd-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing: .8px; text-transform: uppercase; margin: 0; }

    .pd-filters { display:flex; flex-direction:column; gap: 10px; margin-bottom: 18px; }
    .pd-search { display:flex; align-items:center; gap:8px; padding: 10px 13px; background: var(--bg2, #10101c); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 10px;
      svg { color: var(--mu, #8a8aa0); flex-shrink:0; }
      input { flex:1; background:transparent; border:none; outline:none; color: var(--text); font-size:14px; font-family: var(--fb, sans-serif);
        &::placeholder { color: var(--mu, #8a8aa0); } } }
    .pd-chips { display:flex; gap:6px; flex-wrap:wrap; }
    .pd-chip {
      padding: 6px 12px; border-radius: 8px; cursor:pointer; font-size:12.5px; font-weight:600;
      background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); color: var(--mu, #8a8aa0);
      transition: color .15s, border-color .15s, background .15s;
      &:hover { color: var(--text); border-color: var(--br2, rgba(255,255,255,.14)); }
      &.active { color: #4ade80; border-color: var(--primary, #006c35); background: rgba(0,108,53,.14); }
    }
    .pd-row { display:flex; align-items:center; gap:14px; flex-wrap:wrap; font-size:13px; color: var(--mu, #8a8aa0); }
    .pd-online { display:inline-flex; align-items:center; gap:6px; cursor:pointer;
      input { accent-color: var(--primary, #006c35); } }
    .pd-sort { display:inline-flex; align-items:center; gap:8px;
      .pd-l { font-family: var(--fm, monospace); font-size:10px; letter-spacing:1.5px; text-transform: uppercase; }
      select { background: var(--bg2, #10101c); color: var(--text); border:1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 7px; padding: 5px 8px; font-size: 12px; outline:none; }
    }
    .pd-count { margin-left:auto; font-size:13px; color: var(--mu, #8a8aa0); strong { color: var(--text); } }

    .pd-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
    .pd-card {
      display:flex; align-items:center; gap: 10px; padding: 12px 14px;
      background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 12px;
      transition: border-color .15s, transform .15s;
    }
    .pd-card:hover { border-color: var(--br2, rgba(255,255,255,.14)); transform: translateY(-2px); }
    .pd-card__main { display:flex; align-items:center; gap: 10px; flex:1; min-width:0; text-decoration:none; color:inherit; }

    .pd-ava { position: relative; width: 46px; height: 46px; border-radius: 50%; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .pd-ava img { width:100%; height:100%; object-fit:cover; }
    .pd-ava-letter { font-family: var(--fh, sans-serif); font-size: 19px; color:#fff; }
    .pd-dot { position:absolute; bottom:-1px; right:-1px; width:11px; height:11px; border-radius:50%; border:2px solid var(--bg2, #10101c); z-index:2; }
    .pd-dot--online { background: #4ade80; }
    .pd-dot--idle   { background: var(--accent, #d4af37); }
    .pd-dot--offline{ background: #4b5563; }

    .pd-id { flex:1; min-width: 0; }
    .pd-name { font-weight: 700; font-size: 14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .pd-nick { font-family: var(--fm, monospace); font-size: 11px; color: var(--accent, #d4af37); }
    .pd-loc  { font-size: 11.5px; color: var(--mu, #8a8aa0); }
    .pd-stats { display: flex; gap: 9px; margin-top: 5px; font-size: 11px; color: var(--mu, #8a8aa0); }
    .pd-stat strong { color: var(--text); }
    .pd-stat--gold { color: var(--accent, #d4af37); }

    .pd-actions { display:flex; gap:5px; flex-shrink:0; }
    .pd-icon {
      width: 32px; height: 32px; border-radius: 8px; display:grid; place-items:center; cursor:pointer;
      background: transparent; border: 1px solid var(--br2, rgba(255,255,255,.14)); color: var(--mu, #8a8aa0);
      transition: color .15s, border-color .15s, background .15s;
      &:hover { color: var(--primary, #4ade80); border-color: rgba(0,108,53,.5); background: rgba(0,108,53,.08); }
    }
    .pd-icon--msg:hover { color: #4ade80; border-color: rgba(0,108,53,.5); background: rgba(0,108,53,.08); }
    .pd-icon--challenge:hover { color: var(--accent, #d4af37); border-color: rgba(212,175,55,.5); background: rgba(212,175,55,.12); }
    .pd-icon--accept { color: #4ade80; border-color: rgba(74,222,128,.4); }
    .pd-icon--pending { color: var(--accent, #d4af37); cursor: default; font-weight: 700; }

    .pd-empty { padding: 50px 20px; text-align:center; color: var(--mu, #8a8aa0);
      h3 { color: var(--text); margin: 0 0 8px; font-family: var(--fh, sans-serif); letter-spacing:.5px; }
      p { margin:0 auto; max-width: 40ch; } }
    .pd-skel { height: 70px; border-radius: 12px; background: rgba(255,255,255,.05); animation: pdPulse 1.5s ease-in-out infinite; }
    @keyframes pdPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .pd-card, .pd-skel { animation: none; transition:none; } }
  `],
})
export class PlayerDiscoveryPageComponent implements OnInit {
  private api = inject(PlayerDiscoveryService);
  readonly friends = inject(FriendService);
  private dm = inject(DmService);
  private challengeUi = inject(ChallengeUiService);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly games = Object.entries(GAME_LABELS).map(([value, label]) => ({ value, label }));

  readonly q          = signal('');
  readonly game       = signal<string | null>(null);
  readonly onlineOnly = signal(false);
  readonly sort       = signal<'wins' | 'win_rate' | 'recent'>('wins');

  readonly rows        = signal<DiscoveryRow[]>([]);
  readonly resultCount = signal<number | null>(null);
  readonly loading     = signal(false);

  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!this.friends.loaded()) this.friends.load();
    this.refresh(true);
  }

  setGame(g: string | null): void { this.game.set(g); this.refresh(true); }

  /** Debounced search. Pass `immediate` to skip the debounce (chip click). */
  refresh(immediate = false): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    const run = () => {
      this.loading.set(true);
      this.api.search({
        q: this.q().trim() || null, game: this.game(), available: this.onlineOnly(), sort: this.sort(),
      }).subscribe({
        next: (r) => { this.rows.set(r.data); this.resultCount.set(r.meta.count); this.loading.set(false); },
        error: () => { this.rows.set([]); this.resultCount.set(0); this.loading.set(false); },
      });
    };
    if (immediate) run();
    else this.searchTimer = setTimeout(run, 280);
  }

  addFriend(r: DiscoveryRow): void {
    this.friends.sendRequest({ id: r.user.id, name: r.user.name, nickname: r.user.nickname, display_name: r.user.display_name, avatar_url: r.user.avatar_url } as any).subscribe({
      next: () => this.toast.success(`Friend request sent to ${r.user.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not send request.'),
    });
  }
  acceptFriend(r: DiscoveryRow): void {
    const req = this.friends.requests().find(x => x.user.id === r.user.id);
    if (!req) return;
    this.friends.accept(req).subscribe({
      next: () => this.toast.success(`You and ${r.user.display_name} are now friends.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Failed.'),
    });
  }
  message(r: DiscoveryRow): void {
    this.dm.openWith({ id: r.user.id, name: r.user.name, nickname: r.user.nickname, display_name: r.user.display_name, avatar_url: r.user.avatar_url } as any).subscribe({
      next: () => this.router.navigate(['/community/home'], { queryParams: { pane: 'messages' } }),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not open chat.'),
    });
  }
  challenge(r: DiscoveryRow): void {
    this.challengeUi.open({ id: r.user.id, name: r.user.name, nickname: r.user.nickname, display_name: r.user.display_name, avatar_url: r.user.avatar_url } as any);
  }
}
