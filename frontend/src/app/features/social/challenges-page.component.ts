import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Challenge, ChallengeService } from './challenge.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

type Tab = 'active' | 'incoming' | 'sent' | 'history';

@Component({
  selector: 'app-challenges-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  host: { '[class.embedded]': 'embedded()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="ch-page">
  <header class="ch-head">
    <div>
      <div class="ch-eyebrow">Compete</div>
      <h1 class="ch-title">Challenges</h1>
    </div>
  </header>

  <div class="ch-tabs">
    <button [class.active]="tab() === 'active'" (click)="tab.set('active')">
      Active <span class="ch-count">{{ cs.active().length }}</span>
    </button>
    <button [class.active]="tab() === 'incoming'" (click)="tab.set('incoming')">
      Incoming
      @if (cs.incoming().length > 0) { <span class="ch-count ch-count--alert">{{ cs.incoming().length }}</span> }
    </button>
    <button [class.active]="tab() === 'sent'" (click)="tab.set('sent')">Sent <span class="ch-count">{{ cs.sent().length }}</span></button>
    <button [class.active]="tab() === 'history'" (click)="tab.set('history')">History</button>
  </div>

  <div class="ch-body">
    @if (cs.loading() && !cs.loaded()) {
      @for (i of [1,2,3]; track i) { <div class="ch-skel"></div> }
    } @else {
      @if (list().length === 0) {
        <div class="ch-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          <h3>{{ emptyTitle() }}</h3>
          <p>Challenge a friend from the Friends list to get started.</p>
          <a routerLink="/community/home" [queryParams]="{ pane: 'friends' }" class="ch-btn ch-btn--primary">Go to Friends</a>
        </div>
      } @else {
        <div class="ch-list">
          @for (c of list(); track c.id) {
            <div class="ch-card" [class.ch-card--win]="c.status === 'completed' && c.i_won === true" [class.ch-card--loss]="c.status === 'completed' && c.i_won === false">
              <span class="ch-ava" [class.ch-ava--team]="c.kind === 'team'">
                @if (opponentAvatar(c); as av) { <img [src]="av" [alt]="opponentName(c)"/> }
                @else { <span class="ch-ava-letter">{{ opponentInitial(c) }}</span> }
              </span>
              <div class="ch-info">
                <div class="ch-vs">vs <strong>{{ opponentName(c) }}</strong>@if (c.kind === 'team') { <span class="ch-kind">team</span> }</div>
                <div class="ch-meta">
                  <span class="ch-game">{{ c.game_label }}</span>
                  @if (c.status === 'completed') {
                    · <span class="ch-score">{{ c.my_score }}–{{ c.their_score }}</span>
                    · <span class="ch-result" [class.win]="c.i_won === true" [class.loss]="c.i_won === false">{{ c.i_won === true ? 'Won' : c.i_won === false ? 'Lost' : '' }}</span>
                  } @else if (c.status === 'declined') { · Declined
                  } @else if (c.status === 'cancelled') { · Cancelled }
                  @if (c.message && c.status !== 'completed') { <div class="ch-msg">"{{ c.message }}"</div> }
                </div>
              </div>

              <div class="ch-actions">
                @switch (tab()) {
                  @case ('incoming') {
                    <button class="ch-btn ch-btn--ghost" [disabled]="busy(c.id)" (click)="run(c, 'decline')">Decline</button>
                    <button class="ch-btn ch-btn--primary" [disabled]="busy(c.id)" (click)="run(c, 'accept')">Accept</button>
                  }
                  @case ('sent') {
                    <span class="ch-pending">Pending</span>
                    <button class="ch-btn ch-btn--ghost" [disabled]="busy(c.id)" (click)="run(c, 'cancel')">Cancel</button>
                  }
                  @case ('active') {
                    @if (c.can_confirm) {
                      <span class="ch-reported">They reported {{ c.my_score }}–{{ c.their_score }}</span>
                      <button class="ch-btn ch-btn--primary" [disabled]="busy(c.id)" (click)="run(c, 'confirm')">Confirm</button>
                    } @else if (c.i_reported) {
                      <span class="ch-pending">Awaiting confirmation</span>
                    } @else if (reportingId() === c.id) {
                      <!-- inline report form -->
                    } @else {
                      <button class="ch-btn ch-btn--primary" (click)="startReport(c)">Report result</button>
                    }
                  }
                }
              </div>

              @if (tab() === 'active' && reportingId() === c.id && !c.can_confirm && !c.i_reported) {
                <div class="ch-report">
                  <div class="ch-report__scores">
                    <label>You <input type="number" min="0" [(ngModel)]="myScore" class="ch-score-input"/></label>
                    <span class="ch-x">–</span>
                    <label>{{ opponentName(c) }} <input type="number" min="0" [(ngModel)]="theirScore" class="ch-score-input"/></label>
                  </div>
                  <div class="ch-report__winner">
                    <span class="ch-w-label">Winner</span>
                    <button type="button" [class.active]="winner() === 'me'"   (click)="winner.set('me')">You</button>
                    <button type="button" [class.active]="winner() === 'them'" (click)="winner.set('them')">{{ opponentName(c) }}</button>
                  </div>
                  <div class="ch-report__actions">
                    <button class="ch-btn ch-btn--ghost" (click)="reportingId.set(null)">Cancel</button>
                    <button class="ch-btn ch-btn--primary" [disabled]="busy(c.id) || winner() === null" (click)="submitReport(c)">Submit</button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }
    }
  </div>
</div>
  `,
  styles: [`
    :host { display:block; height:100%; }
    :host(.embedded) .ch-page { height:100%; overflow-y:auto; }
    .ch-page { max-width: 720px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; color: var(--text, #ececf1); }
    .ch-head { margin-bottom: 1.1rem; }
    .ch-eyebrow { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent, #d4af37); margin-bottom: 5px; }
    .ch-title { font-family: var(--fh, sans-serif); font-size: clamp(26px, 3.4vw, 34px); letter-spacing:.8px; text-transform: uppercase; margin: 0; }

    .ch-tabs { display:inline-flex; gap:2px; padding:3px; margin-bottom:1.1rem; background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius:10px; }
    .ch-tabs button { display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:7px; background:transparent; border:none; color: var(--mu, #8a8aa0); font-family: var(--fb, sans-serif); font-weight:600; font-size:13px; cursor:pointer; transition: background .15s, color .15s; }
    .ch-tabs button:hover { color: var(--text); } .ch-tabs button.active { background: var(--bg3, #181826); color: var(--text); }
    .ch-count { font-family: var(--fm, monospace); font-size:11px; padding:1px 7px; border-radius:100px; background: rgba(255,255,255,.08); color: var(--mu); }
    .ch-count--alert { background: var(--primary, #006c35); color:#fff; }

    .ch-list { display:flex; flex-direction:column; gap:8px; }
    .ch-card { display:flex; align-items:center; gap:12px; padding:12px 14px; flex-wrap:wrap;
      background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius:12px; }
    .ch-card--win  { border-color: rgba(74,222,128,.4); }
    .ch-card--loss { opacity:.8; }
    .ch-ava { width:42px; height:42px; border-radius:50%; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .ch-ava--team { border-radius: 10px; }
    .ch-kind { font-family: var(--fm, monospace); font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent, #d4af37); padding: 1px 6px; border: 1px solid rgba(212,175,55,.4); border-radius: 100px; margin-left: 8px; }
    .ch-ava img { width:100%; height:100%; object-fit:cover; } .ch-ava-letter { font-family: var(--fh, sans-serif); font-size:18px; color:#fff; }
    .ch-info { flex:1; min-width:140px; }
    .ch-vs { font-size:14px; } .ch-vs strong { font-weight:800; }
    .ch-meta { font-size:12px; color: var(--mu, #8a8aa0); margin-top:2px; }
    .ch-game { color: var(--accent, #d4af37); }
    .ch-score { font-family: var(--fm, monospace); color: var(--text); }
    .ch-result.win { color:#4ade80; font-weight:700; } .ch-result.loss { color:#fca5a5; font-weight:700; }
    .ch-msg { color: var(--mu); font-style:italic; margin-top:3px; }
    .ch-actions { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    .ch-pending, .ch-reported { font-size:12px; color: var(--mu, #8a8aa0); }
    .ch-reported { color: var(--accent, #d4af37); }

    .ch-btn { padding:8px 14px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; border:1px solid transparent; &:disabled { opacity:.5; cursor:not-allowed; } }
    .ch-btn--primary { background: var(--primary, #006c35); color:#fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .ch-btn--ghost { background:transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover { background: rgba(255,255,255,.05); } }

    .ch-report { width:100%; margin-top:6px; padding-top:12px; border-top:1px solid var(--br, rgba(255,255,255,.08)); display:flex; flex-direction:column; gap:12px; }
    .ch-report__scores { display:flex; align-items:flex-end; justify-content:center; gap:14px; }
    .ch-report__scores label { display:flex; flex-direction:column; gap:6px; align-items:center; font-size:12px; color: var(--mu, #8a8aa0); }
    .ch-score-input { width:64px; height:48px; text-align:center; font-family: var(--fh, sans-serif); font-size:24px; background: var(--bg3, #181826); border:1px solid var(--br2, rgba(255,255,255,.14)); border-radius:8px; color: var(--text); outline:none; &:focus { border-color: var(--primary, #006c35); } }
    .ch-x { font-family: var(--fm, monospace); font-size:20px; color: var(--mu); padding-bottom:12px; }
    .ch-report__winner { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .ch-w-label { font-family: var(--fm, monospace); font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color: var(--mu); }
    .ch-report__winner button { padding:8px 14px; border-radius:8px; cursor:pointer; font-size:13px; background: var(--bg3, #181826); border:1px solid var(--br, rgba(255,255,255,.08)); color: var(--text); }
    .ch-report__winner button.active { background: rgba(0,108,53,.16); border-color: var(--primary, #006c35); color:#4ade80; font-weight:700; }
    .ch-report__actions { display:flex; justify-content:flex-end; gap:8px; }

    .ch-empty { text-align:center; padding: 50px 20px; color: var(--mu, #8a8aa0);
      svg { color: var(--dim, #55556e); margin-bottom:12px; } h3 { color: var(--text); margin:0 0 8px; font-family: var(--fh, sans-serif); letter-spacing:.5px; } p { margin:0 auto 16px; max-width: 40ch; } }
    .ch-skel { height:66px; border-radius:12px; background: rgba(255,255,255,.05); animation: chPulse 1.5s ease-in-out infinite; margin-bottom: 8px; }
    @keyframes chPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .ch-skel { animation:none; } }
  `],
})
export class ChallengesPageComponent implements OnInit {
  readonly cs = inject(ChallengeService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  readonly embedded = input(false);
  readonly tab = signal<Tab>('active');
  readonly reportingId = signal<string | null>(null);
  readonly winner = signal<'me' | 'them' | null>(null);
  private busyIds = signal<Set<string>>(new Set());
  myScore: number | null = null;
  theirScore: number | null = null;

  readonly list = computed<Challenge[]>(() => {
    switch (this.tab()) {
      case 'incoming': return this.cs.incoming();
      case 'sent':     return this.cs.sent();
      case 'history':  return this.cs.history();
      default:         return this.cs.active();
    }
  });

  readonly emptyTitle = computed(() => ({
    active: 'No active challenges', incoming: 'No incoming challenges',
    sent: 'No sent challenges', history: 'No past challenges',
  }[this.tab()]));

  ngOnInit(): void { this.cs.load(); }

  busy(id: string): boolean { return this.busyIds().has(id); }
  private mark(id: string, on: boolean): void {
    this.busyIds.update(s => { const n = new Set(s); on ? n.add(id) : n.delete(id); return n; });
  }

  run(c: Challenge, action: 'accept' | 'decline' | 'cancel' | 'confirm'): void {
    this.mark(c.id, true);
    (this.cs as any)[action](c).subscribe({
      next: () => this.mark(c.id, false),
      error: (e: any) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(c.id, false); },
    });
  }

  /** Other side display: team name (for team challenges) or opponent display name. */
  opponentName(c: Challenge): string {
    if (c.kind === 'team') {
      const t = c.i_am_challenger ? c.opponent_team : c.challenger_team;
      return t ? (t.tag ? `[${t.tag}] ${t.name}` : t.name) : 'Team';
    }
    return c.opponent?.display_name ?? '?';
  }
  /** My side name (team challenges only — used in the vs line). */
  myTeamName(c: Challenge): string {
    if (c.kind !== 'team') return '';
    const t = c.i_am_challenger ? c.challenger_team : c.opponent_team;
    return t ? (t.tag ? `[${t.tag}]` : t.name) : 'My team';
  }
  opponentAvatar(c: Challenge): string | null {
    if (c.kind === 'team') {
      const t = c.i_am_challenger ? c.opponent_team : c.challenger_team;
      return t?.logo_url ?? null;
    }
    return c.opponent?.avatar_url ?? null;
  }
  opponentInitial(c: Challenge): string {
    return (this.opponentName(c) || '?').charAt(0).toUpperCase();
  }

  startReport(c: Challenge): void {
    this.reportingId.set(c.id);
    this.winner.set(null);
    this.myScore = null;
    this.theirScore = null;
  }

  submitReport(c: Challenge): void {
    const my = Number(this.myScore ?? 0), their = Number(this.theirScore ?? 0);
    const w = this.winner();
    if (w === null) return;
    const challengerScore = c.i_am_challenger ? my : their;
    const opponentScore   = c.i_am_challenger ? their : my;
    this.mark(c.id, true);

    const obs = c.kind === 'team'
      ? (() => {
          const myTeamId    = c.i_am_challenger ? c.challenger_team?.id : c.opponent_team?.id;
          const theirTeamId = c.i_am_challenger ? c.opponent_team?.id   : c.challenger_team?.id;
          const winnerTeamId = (w === 'me' ? myTeamId : theirTeamId) ?? '';
          return this.cs.reportTeamResult(c, challengerScore, opponentScore, winnerTeamId);
        })()
      : (() => {
          const myId = this.auth.currentUser()?.id ?? '';
          const winnerId = w === 'me' ? myId : (c.opponent?.id ?? '');
          return this.cs.reportResult(c, challengerScore, opponentScore, winnerId);
        })();

    obs.subscribe({
      next: () => { this.mark(c.id, false); this.reportingId.set(null); this.toast.success('Result reported — waiting for confirmation.'); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.mark(c.id, false); },
    });
  }
}
