import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TeamService, TeamSummary } from './team.service';
import { GAME_LABELS } from '../profile/player-profile.service';
import { ToastService } from '../../core/services/toast.service';

type Tab = 'mine' | 'browse' | 'invites';

@Component({
  selector: 'app-teams-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="tm-shell">
  <header class="tm-head">
    <div>
      <div class="tm-eyebrow">Compete</div>
      <h1 class="tm-title">Teams</h1>
    </div>
    <a routerLink="/teams/create" class="tm-btn tm-btn--primary">+ New team</a>
  </header>

  <div class="tm-tabs">
    <button [class.active]="tab() === 'mine'" (click)="tab.set('mine')">
      My teams <span class="tm-count">{{ svc.myTeams().length }}</span>
    </button>
    <button [class.active]="tab() === 'invites'" (click)="tab.set('invites')">
      Invites
      @if (svc.invites().length > 0) { <span class="tm-count tm-count--alert">{{ svc.invites().length }}</span> }
    </button>
    <button [class.active]="tab() === 'browse'" (click)="tab.set('browse'); ensureBrowse()">Browse</button>
  </div>

  @if (tab() === 'mine') {
    @if (!svc.loadedMine()) {
      @for (i of [1,2,3]; track i) { <div class="tm-skel"></div> }
    } @else if (svc.myTeams().length === 0) {
      <div class="tm-empty">
        <h3>You're not on any teams yet</h3>
        <p>Create a team to compete together, or browse open rosters that are recruiting.</p>
        <a routerLink="/teams/create" class="tm-btn tm-btn--primary">+ Create a team</a>
      </div>
    } @else {
      <div class="tm-list">
        @for (t of svc.myTeams(); track t.id) {
          <a class="tm-row" [routerLink]="['/teams', t.slug]">
            <span class="tm-logo">
              @if (t.logo_url) { <img [src]="t.logo_url" [alt]="t.name"/> }
              @else { <span class="tm-logo-letter">{{ (t.tag || t.name).charAt(0).toUpperCase() }}</span> }
            </span>
            <div class="tm-info">
              <div class="tm-name">{{ t.name }}@if (t.tag) { <span class="tm-tag">[{{ t.tag }}]</span> }</div>
              <div class="tm-meta">{{ gameLabel(t.game) }} · {{ t.member_count }} member{{ t.member_count === 1 ? '' : 's' }} · {{ t.region || 'Any region' }}</div>
            </div>
            <span class="tm-role tm-role--{{ t.my_role }}">{{ t.my_role }}</span>
          </a>
        }
      </div>
    }
  }

  @if (tab() === 'invites') {
    @if (svc.invites().length === 0) {
      <div class="tm-empty"><h3>No pending invites</h3></div>
    } @else {
      <div class="tm-list">
        @for (i of svc.invites(); track i.id) {
          <div class="tm-row">
            <span class="tm-logo">
              @if (i.team?.logo_url) { <img [src]="i.team!.logo_url!" [alt]="i.team!.name"/> }
              @else { <span class="tm-logo-letter">{{ (i.team?.tag || i.team?.name || '?').charAt(0).toUpperCase() }}</span> }
            </span>
            <div class="tm-info">
              <div class="tm-name">{{ i.team?.name }}@if (i.team?.tag) { <span class="tm-tag">[{{ i.team!.tag }}]</span> }</div>
              <div class="tm-meta">
                @if (i.inviter) { Invited by {{ i.inviter.display_name }} · }
                {{ i.team ? gameLabel(i.team.game) : '' }}
              </div>
            </div>
            <div class="tm-actions">
              <button class="tm-btn tm-btn--ghost" [disabled]="busy(i.id)" (click)="decline(i)">Decline</button>
              <button class="tm-btn tm-btn--primary" [disabled]="busy(i.id)" (click)="accept(i)">Accept</button>
            </div>
          </div>
        }
      </div>
    }
  }

  @if (tab() === 'browse') {
    <div class="tm-filters">
      <div class="tm-search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Search teams by name or tag" [ngModel]="q()" (ngModelChange)="q.set($event); refreshBrowse()"/>
      </div>
      <div class="tm-chips">
        <button class="tm-chip" [class.active]="!game()" (click)="setGame(null)">All games</button>
        @for (g of games; track g.value) {
          <button class="tm-chip" [class.active]="game() === g.value" (click)="setGame(g.value)">{{ g.label }}</button>
        }
      </div>
      <label class="tm-recruit">
        <input type="checkbox" [checked]="recruiting()" (change)="recruiting.set(!recruiting()); refreshBrowse()"/>
        Recruiting only
      </label>
    </div>

    @if (browseLoading()) {
      @for (i of [1,2,3,4]; track i) { <div class="tm-skel"></div> }
    } @else if (browseRows().length === 0) {
      <div class="tm-empty"><h3>No teams match</h3><p>Try a different game, clear the recruiting filter, or broaden the search.</p></div>
    } @else {
      <div class="tm-grid">
        @for (t of browseRows(); track t.id) {
          <a class="tm-card" [routerLink]="['/teams', t.slug]">
            <span class="tm-logo tm-logo--lg">
              @if (t.logo_url) { <img [src]="t.logo_url" [alt]="t.name"/> }
              @else { <span class="tm-logo-letter">{{ (t.tag || t.name).charAt(0).toUpperCase() }}</span> }
            </span>
            <div class="tm-info">
              <div class="tm-name">{{ t.name }}@if (t.tag) { <span class="tm-tag">[{{ t.tag }}]</span> }</div>
              <div class="tm-meta">{{ gameLabel(t.game) }} · {{ t.member_count }} member{{ t.member_count === 1 ? '' : 's' }}</div>
              @if (t.region) { <div class="tm-meta">{{ t.region }}</div> }
            </div>
            @if (t.is_recruiting) { <span class="tm-recruiting-pill">Recruiting</span> }
          </a>
        }
      </div>
    }
  }
</div>
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .tm-shell { max-width: 900px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }
    .tm-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom: 1.1rem; flex-wrap:wrap; }
    .tm-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .tm-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing: .8px; text-transform: uppercase; margin: 0; }

    .tm-tabs { display:inline-flex; gap:2px; padding:3px; margin-bottom:1.1rem; background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius:10px; }
    .tm-tabs button { display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:7px; background:transparent; border:none; color: var(--mu, #8a8aa0); font-weight:600; font-size:13px; cursor:pointer; transition: background .15s, color .15s; }
    .tm-tabs button:hover { color: var(--text); }
    .tm-tabs button.active { background: var(--bg3, #181826); color: var(--text); }
    .tm-count { font-family: var(--fm, monospace); font-size: 11px; padding: 1px 7px; border-radius: 100px; background: rgba(255,255,255,.08); color: var(--mu); }
    .tm-count--alert { background: var(--primary, #006c35); color:#fff; }

    .tm-filters { display:flex; flex-direction:column; gap: 10px; margin-bottom: 14px; }
    .tm-search { display:flex; align-items:center; gap:8px; padding: 10px 13px; background: var(--bg2, #10101c); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 10px;
      svg { color: var(--mu, #8a8aa0); flex-shrink:0; }
      input { flex:1; background:transparent; border:none; outline:none; color: var(--text); font-size:14px; &::placeholder { color: var(--mu); } } }
    .tm-chips { display:flex; gap:6px; flex-wrap:wrap; }
    .tm-chip { padding: 6px 12px; border-radius: 8px; cursor:pointer; font-size: 12.5px; font-weight:600; background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); color: var(--mu); transition: color .15s, border-color .15s, background .15s;
      &:hover { color: var(--text); border-color: var(--br2, rgba(255,255,255,.14)); }
      &.active { color: #4ade80; border-color: var(--primary, #006c35); background: rgba(0,108,53,.14); } }
    .tm-recruit { font-size: 13px; color: var(--mu, #8a8aa0); display:inline-flex; align-items:center; gap:6px; cursor:pointer;
      input { accent-color: var(--primary, #006c35); } }

    .tm-list { display:flex; flex-direction:column; gap: 4px; }
    .tm-row { display:flex; align-items:center; gap: 12px; padding: 10px 12px; border-radius: 10px; background: transparent; text-decoration:none; color:inherit; transition: background .12s; }
    .tm-row:hover { background: var(--bg2, #10101c); }
    .tm-logo { width: 44px; height: 44px; border-radius: 10px; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .tm-logo img { width:100%; height:100%; object-fit: cover; }
    .tm-logo-letter { font-family: var(--fh, sans-serif); font-size: 18px; color:#fff; }
    .tm-logo--lg { width: 56px; height: 56px; .tm-logo-letter { font-size: 22px; } }

    .tm-info { flex:1; min-width:0; }
    .tm-name { font-weight: 700; font-size: 14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display: inline-flex; align-items: center; gap: 6px; }
    .tm-tag { font-family: var(--fm, monospace); font-size: 11px; color: var(--accent, #d4af37); }
    .tm-meta { font-size: 12px; color: var(--mu, #8a8aa0); margin-top: 2px; }

    .tm-role { font-family: var(--fm, monospace); font-size: 10px; padding: 2px 8px; border-radius: 100px; letter-spacing: 1.2px; text-transform: uppercase; }
    .tm-role--owner   { background: rgba(212,175,55,.16); color: var(--accent, #d4af37); }
    .tm-role--captain { background: rgba(0,108,53,.16); color: #4ade80; }
    .tm-role--member  { background: rgba(255,255,255,.06); color: var(--mu, #8a8aa0); }

    .tm-actions { display:flex; gap: 8px; flex-shrink:0; }
    .tm-btn { padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; border: 1px solid transparent; text-decoration:none; display:inline-flex; align-items:center; gap:6px; &:disabled { opacity:.5; cursor:not-allowed; } }
    .tm-btn--primary { background: var(--primary, #006c35); color: #fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .tm-btn--ghost { background: transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover:not(:disabled){ background: rgba(255,255,255,.05); } }

    .tm-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
    .tm-card { display:flex; align-items:center; gap:12px; padding:14px; background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius: 12px; text-decoration:none; color:inherit; transition: border-color .15s, transform .15s; position: relative; }
    .tm-card:hover { border-color: var(--br2, rgba(255,255,255,.14)); transform: translateY(-2px); }
    .tm-recruiting-pill { font-family: var(--fm, monospace); font-size: 10px; padding: 2px 8px; border-radius: 100px; background: rgba(0,108,53,.18); color: #4ade80; border: 1px solid rgba(0,108,53,.4); letter-spacing: 1px; text-transform: uppercase; }

    .tm-empty { padding: 40px 20px; text-align:center; color: var(--mu, #8a8aa0);
      h3 { color: var(--text); margin: 0 0 8px; font-family: var(--fh, sans-serif); letter-spacing:.5px; }
      p { margin: 0 auto 16px; max-width: 42ch; line-height: 1.5; } }
    .tm-skel { height: 64px; border-radius: 10px; background: rgba(255,255,255,.05); animation: tmPulse 1.5s ease-in-out infinite; margin-bottom: 4px; }
    @keyframes tmPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .tm-skel, .tm-card { transition: none; animation: none; } }
  `],
})
export class TeamsPageComponent implements OnInit {
  readonly svc = inject(TeamService);
  private toast = inject(ToastService);

  readonly games = Object.entries(GAME_LABELS).map(([value, label]) => ({ value, label }));

  readonly tab        = signal<Tab>('mine');
  readonly q          = signal('');
  readonly game       = signal<string | null>(null);
  readonly recruiting = signal(false);

  readonly browseRows    = signal<TeamSummary[]>([]);
  readonly browseLoading = signal(false);
  readonly browseFetched = signal(false);

  private busyIds = signal<Set<string>>(new Set());
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!this.svc.loadedMine()) this.svc.loadMine();
  }

  gameLabel(g: string): string { return GAME_LABELS[g] ?? g; }
  busy(id: string): boolean { return this.busyIds().has(id); }

  ensureBrowse(): void {
    if (this.browseFetched()) return;
    this.refreshBrowse(true);
  }
  setGame(g: string | null): void { this.game.set(g); this.refreshBrowse(true); }

  refreshBrowse(immediate = false): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    const run = () => {
      this.browseLoading.set(true);
      this.svc.browse({ q: this.q().trim() || null, game: this.game(), recruiting: this.recruiting() }).subscribe({
        next: (r) => { this.browseRows.set(r.data ?? []); this.browseLoading.set(false); this.browseFetched.set(true); },
        error: () => { this.browseRows.set([]); this.browseLoading.set(false); this.browseFetched.set(true); },
      });
    };
    if (immediate) run();
    else this.searchTimer = setTimeout(run, 280);
  }

  private mark(id: string, on: boolean): void {
    this.busyIds.update(s => { const n = new Set(s); on ? n.add(id) : n.delete(id); return n; });
  }
  accept(i: { id: string; team: { name: string } | null }): void {
    this.mark(i.id, true);
    this.svc.acceptInvite(i.id).subscribe({
      next: () => { this.toast.success(`Joined ${i.team?.name ?? 'team'}.`); this.mark(i.id, false); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(i.id, false); },
    });
  }
  decline(i: { id: string }): void {
    this.mark(i.id, true);
    this.svc.declineInvite(i.id).subscribe({
      next: () => this.mark(i.id, false),
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(i.id, false); },
    });
  }
}
