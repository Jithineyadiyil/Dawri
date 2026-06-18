import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FullProfile, GAME_LABELS, PlayerProfileService } from './player-profile.service';
import { AuthService } from '../../core/services/auth.service';
import { FriendService } from '../../core/services/friend.service';
import { DmService } from '../social/dm.service';
import { ChallengeUiService } from '../social/challenge-ui.service';
import { ToastService } from '../../core/services/toast.service';
import { AchievementsGridComponent } from '../achievements/achievements-grid.component';

/**
 * PlayerProfileViewComponent — Dawri 2.0 gaming profile view.
 *
 *   <app-player-profile-view [userId]="id" [mode]="'public'" />
 *   <app-player-profile-view [userId]="id" [mode]="'self'" (edit)="..." />
 *
 * Self-profile shows the "Edit IDs" CTA; public profile shows the action
 * row (Add friend / Message / Challenge), gated on the relationship.
 */
@Component({
  selector: 'app-player-profile-view',
  standalone: true,
  imports: [CommonModule, FormsModule, AchievementsGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
@if (profile(); as p) {
  <div class="pp-shell">

    <!-- ── Hero ────────────────────────────────────────────────── -->
    <header class="pp-hero">
      <div class="pp-cover" aria-hidden="true">
        <div class="pp-cover__grid"></div>
        <div class="pp-cover__glow"></div>
      </div>
      <div class="pp-hero__row">
        <span class="pp-ava">
          <span class="pp-dot" [class]="'pp-dot--' + p.presence.status" [title]="p.presence.status"></span>
          @if (p.user.avatar_url) { <img [src]="p.user.avatar_url" [alt]="p.user.display_name"/> }
          @else { <span class="pp-ava-letter">{{ (p.user.display_name || '?').charAt(0) }}</span> }
        </span>
        <div class="pp-id">
          <h1 class="pp-name">{{ p.user.display_name }}</h1>
          @if (p.user.nickname) { <div class="pp-nick">{{ '@' + p.user.nickname }}</div> }
          <div class="pp-meta">
            <span class="pp-role">{{ roleLabel(p.user.role) }}</span>
            @if (p.user.city || p.user.country) { · {{ p.user.city }}{{ p.user.city && p.user.country ? ', ' : '' }}{{ p.user.country }} }
            @if (p.user.organization) { · {{ p.user.organization }} }
          </div>
          @if (p.user.bio) { <p class="pp-bio">{{ p.user.bio }}</p> }
        </div>

        <div class="pp-actions">
          @if (mode() === 'self') {
            <button class="pp-btn pp-btn--ghost" (click)="openEdit.set(true)">Edit gaming IDs</button>
          } @else {
            @switch (friends.relationshipWith(p.user.id)) {
              @case ('friends') {
                <button class="pp-btn pp-btn--primary" (click)="msg(p)">Message</button>
                <button class="pp-btn pp-btn--accent" (click)="challenge(p)">Challenge</button>
              }
              @case ('pending_outgoing') { <button class="pp-btn pp-btn--ghost" disabled>Request sent</button> }
              @case ('pending_incoming') { <button class="pp-btn pp-btn--primary" (click)="acceptFriend(p)">Accept request</button> }
              @case ('none') { <button class="pp-btn pp-btn--primary" (click)="addFriend(p)">Add friend</button> }
              @default {}
            }
          }
        </div>
      </div>
    </header>

    <!-- ── Totals strip ────────────────────────────────────────── -->
    <section class="pp-totals">
      <div class="pp-tot"><span class="pp-tot__n">{{ p.totals.matches_played }}</span><span class="pp-tot__l">Matches</span></div>
      <div class="pp-tot"><span class="pp-tot__n">{{ p.totals.wins }}</span><span class="pp-tot__l">Wins</span></div>
      <div class="pp-tot"><span class="pp-tot__n">{{ p.totals.win_rate }}%</span><span class="pp-tot__l">Win rate</span></div>
      <div class="pp-tot"><span class="pp-tot__n">{{ p.totals.tournaments_played }}</span><span class="pp-tot__l">Tournaments</span></div>
      <div class="pp-tot"><span class="pp-tot__n pp-tot__n--gold">{{ p.totals.tournaments_won }}</span><span class="pp-tot__l">Trophies</span></div>
      <div class="pp-tot"><span class="pp-tot__n">{{ p.totals.mvp_count }}</span><span class="pp-tot__l">MVPs</span></div>
    </section>

    <!-- ── Gaming IDs ──────────────────────────────────────────── -->
    @if (hasAnyId(p)) {
      <section class="pp-section">
        <h2 class="pp-h">Gaming IDs</h2>
        <div class="pp-ids">
          @for (id of idList(p); track id.label) {
            @if (id.value) {
              <button type="button" class="pp-idchip" (click)="copy(id.value!)" [title]="'Copy ' + id.label">
                <span class="pp-idchip__l">{{ id.label }}</span>
                <span class="pp-idchip__v">{{ id.value }}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            }
          }
        </div>
      </section>
    } @else if (mode() === 'self') {
      <section class="pp-section">
        <h2 class="pp-h">Gaming IDs</h2>
        <div class="pp-empty pp-empty--cta" (click)="openEdit.set(true)">
          Add your PSN / Xbox / Steam / Riot / Epic IDs so friends can find you on the games you play.
        </div>
      </section>
    }

    <!-- ── Per-game stats ──────────────────────────────────────── -->
    <section class="pp-section">
      <h2 class="pp-h">Games</h2>
      @if (p.games.length === 0) {
        <div class="pp-empty">No matches played yet.</div>
      } @else {
        <div class="pp-games">
          @for (g of p.games; track g.game) {
            <article class="pp-game">
              <header>
                <span class="pp-game__tag">{{ label(g.game) }}</span>
                @if (g.tournaments_won > 0) { <span class="pp-game__trophy">{{ g.tournaments_won }} 🏆</span> }
              </header>
              <div class="pp-game__wr">
                <span class="pp-game__wr-n">{{ g.win_rate }}%</span>
                <span class="pp-game__wr-l">win rate</span>
              </div>
              <div class="pp-game__wl">
                <span class="pp-wl pp-wl--w">{{ g.wins }}W</span>
                <span class="pp-wl pp-wl--l">{{ g.losses }}L</span>
                @if (g.draws > 0) { <span class="pp-wl pp-wl--d">{{ g.draws }}D</span> }
              </div>
              <div class="pp-game__row"><span>Matches</span><strong>{{ g.matches_played }}</strong></div>
              <div class="pp-game__row"><span>Tournaments</span><strong>{{ g.tournaments_played }}</strong></div>
              @if (g.best_win_streak > 0) { <div class="pp-game__row"><span>Best streak</span><strong>{{ g.best_win_streak }}</strong></div> }
            </article>
          }
        </div>
      }
    </section>

    <!-- ── Achievements ────────────────────────────────────────── -->
    <section class="pp-section">
      <h2 class="pp-h">Achievements</h2>
      <app-achievements-grid [userId]="userId()"></app-achievements-grid>
    </section>

    <!-- ── Edit gaming IDs modal (self only) ───────────────────── -->
    @if (mode() === 'self' && openEdit()) {
      <div class="pp-modal-overlay" (click)="openEdit.set(false)">
        <div class="pp-modal" (click)="$event.stopPropagation()">
          <header class="pp-modal__head">
            <h3>Gaming IDs</h3>
            <button class="pp-x" (click)="openEdit.set(false)" aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </header>
          <div class="pp-modal__body">
            <label><span>PSN ID</span>      <input [(ngModel)]="form.psn_id"        placeholder="PlayStation Network" /></label>
            <label><span>Xbox Gamertag</span><input [(ngModel)]="form.xbox_gamertag" placeholder="Xbox" /></label>
            <label><span>Steam ID</span>    <input [(ngModel)]="form.steam_id"      placeholder="Steam" /></label>
            <label><span>Riot ID</span>     <input [(ngModel)]="form.riot_id"       placeholder="Valorant / LoL" /></label>
            <label><span>Epic ID</span>     <input [(ngModel)]="form.epic_id"       placeholder="Fortnite / Rocket League" /></label>
            <label><span>PUBG ID</span>     <input [(ngModel)]="form.pubg_id"       placeholder="PUBG" /></label>
            <label><span>CoD ID</span>      <input [(ngModel)]="form.cod_id"        placeholder="Call of Duty" /></label>
          </div>
          <footer class="pp-modal__foot">
            <button class="pp-btn pp-btn--ghost" (click)="openEdit.set(false)">Cancel</button>
            <button class="pp-btn pp-btn--primary" [disabled]="saving()" (click)="saveIds()">{{ saving() ? 'Saving…' : 'Save' }}</button>
          </footer>
        </div>
      </div>
    }
  </div>
} @else if (loading()) {
  <div class="pp-shell">
    <div class="pp-skel pp-skel--hero"></div>
    <div class="pp-skel"></div>
    <div class="pp-skel"></div>
  </div>
} @else if (error()) {
  <div class="pp-shell"><div class="pp-error">{{ error() }}</div></div>
}
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .pp-shell { max-width: 980px; margin: 0 auto; padding: 1.25rem 1.5rem 4rem; display:flex; flex-direction:column; gap: 18px; }
    .pp-skel { height: 110px; border-radius: 14px; background: rgba(255,255,255,.05); animation: ppPulse 1.5s ease-in-out infinite; }
    .pp-skel--hero { height: 200px; }
    @keyframes ppPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    .pp-error { padding: 24px; text-align:center; color: #fca5a5; background: rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.25); border-radius: 12px; }

    /* ── Hero ─────────────────────────────────────────────── */
    .pp-hero { position: relative; border-radius: 16px; overflow: hidden; background: linear-gradient(180deg, rgba(0,108,53,.12), rgba(10,10,18,0) 60%), var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); }
    .pp-cover { position:absolute; inset: 0 0 auto 0; height: 130px; pointer-events:none; overflow:hidden; }
    .pp-cover__grid { position:absolute; inset:0; background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 36px 36px; mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, #000 30%, transparent 80%); }
    .pp-cover__glow { position:absolute; top: -40px; right: -60px; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(46,139,255,.22), transparent 65%); filter: blur(40px); }
    .pp-hero__row { position: relative; z-index: 1; display: grid; grid-template-columns: auto 1fr auto; align-items: end; gap: 18px; padding: 78px 22px 22px; }
    @media (max-width: 700px) { .pp-hero__row { grid-template-columns: auto 1fr; padding-top: 66px; } .pp-actions { grid-column: 1 / -1; justify-content: flex-start; padding-top: 8px; } }

    .pp-ava { position: relative; width: 92px; height: 92px; border-radius: 50%; overflow: hidden; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); display:grid; place-items:center; flex-shrink:0; border: 3px solid var(--bg2, #10101c); }
    .pp-ava img { width:100%; height:100%; object-fit:cover; }
    .pp-ava-letter { font-family: var(--fh, sans-serif); font-size: 38px; color: #fff; }
    .pp-dot { position:absolute; bottom: 3px; right: 3px; width: 18px; height: 18px; border-radius: 50%; border: 3px solid var(--bg2, #10101c); z-index: 2; }
    .pp-dot--online { background: #4ade80; box-shadow: 0 0 8px #4ade80; }
    .pp-dot--idle   { background: var(--accent, #d4af37); }
    .pp-dot--offline{ background: #4b5563; }

    .pp-name { font-family: var(--fh, sans-serif); font-size: clamp(26px, 4.4vw, 38px); letter-spacing: .8px; text-transform: uppercase; margin: 0; line-height: 1; }
    .pp-nick { font-family: var(--fm, monospace); font-size: 13px; color: var(--accent, #d4af37); margin-top: 4px; }
    .pp-meta { font-size: 13px; color: var(--mu, #8a8aa0); margin-top: 6px; }
    .pp-role { color: #4ade80; text-transform: capitalize; font-weight: 600; }
    .pp-bio  { margin: 10px 0 0; font-size: 14px; color: var(--text, #ececf1); line-height: 1.5; max-width: 60ch; }

    .pp-actions { display: flex; gap: 8px; flex-shrink: 0; }
    .pp-btn { padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; border: 1px solid transparent; &:disabled { opacity: .5; cursor: not-allowed; } }
    .pp-btn--primary { background: var(--primary, #006c35); color: #fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .pp-btn--accent  { background: var(--accent, #d4af37); color: #1a1100; &:hover:not(:disabled){ background: var(--accent-soft, #e8c965); } }
    .pp-btn--ghost   { background: transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover:not(:disabled){ background: rgba(255,255,255,.05); } }

    /* ── Totals ──────────────────────────────────────────── */
    .pp-totals { display:grid; grid-template-columns: repeat(6, 1fr); gap: 1px; background: var(--br, rgba(255,255,255,.08)); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 14px; overflow: hidden; }
    @media (max-width: 700px) { .pp-totals { grid-template-columns: repeat(3, 1fr); } }
    .pp-tot { background: var(--bg2, #10101c); padding: 14px 12px; text-align: center; display:flex; flex-direction:column; gap: 4px; }
    .pp-tot__n { font-family: var(--fh, sans-serif); font-size: 22px; color: var(--text, #ececf1); line-height: 1; }
    .pp-tot__n--gold { color: var(--accent, #d4af37); }
    .pp-tot__l { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mu, #8a8aa0); }

    /* ── Sections ────────────────────────────────────────── */
    .pp-section { background: var(--bg2, #10101c); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 14px; padding: 18px 20px; }
    .pp-h { font-family: var(--fh, sans-serif); font-size: 16px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text); margin: 0 0 14px; display:flex; align-items:center; gap: 10px; }
    .pp-soon { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--mu); border: 1px dashed var(--br2, rgba(255,255,255,.14)); padding: 2px 7px; border-radius: 100px; }

    .pp-ids { display:flex; flex-wrap:wrap; gap: 8px; }
    .pp-idchip { display:inline-flex; align-items:center; gap: 8px; padding: 8px 12px; background: var(--bg3, #181826); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 10px; cursor: pointer; color: var(--text); transition: border-color .15s, background .15s; }
    .pp-idchip:hover { border-color: var(--accent, #d4af37); background: rgba(212,175,55,.06); }
    .pp-idchip__l { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mu, #8a8aa0); }
    .pp-idchip__v { font-size: 13px; font-weight: 600; }
    .pp-idchip svg { color: var(--mu, #8a8aa0); flex-shrink: 0; }

    .pp-empty { padding: 18px; text-align:center; color: var(--mu, #8a8aa0); font-size: 13px; border: 1px dashed var(--br2, rgba(255,255,255,.14)); border-radius: 10px; }
    .pp-empty--cta { cursor: pointer; transition: border-color .15s, color .15s; &:hover { border-color: var(--accent, #d4af37); color: var(--text); } }

    /* ── Game cards ──────────────────────────────────────── */
    .pp-games { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
    .pp-game { background: var(--bg3, #181826); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; transition: border-color .15s, transform .15s; }
    .pp-game:hover { border-color: var(--br2, rgba(255,255,255,.14)); transform: translateY(-2px); }
    .pp-game header { display: flex; justify-content: space-between; align-items: center; }
    .pp-game__tag { font-family: var(--fm, monospace); font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--accent, #d4af37); }
    .pp-game__trophy { font-size: 12px; color: var(--accent, #d4af37); }
    .pp-game__wr { display: flex; align-items: baseline; gap: 6px; }
    .pp-game__wr-n { font-family: var(--fh, sans-serif); font-size: 32px; color: var(--text); line-height: 1; }
    .pp-game__wr-l { font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--mu, #8a8aa0); }
    .pp-game__wl { display: flex; gap: 8px; }
    .pp-wl { font-family: var(--fm, monospace); font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 100px; }
    .pp-wl--w { background: rgba(74,222,128,.14); color: #4ade80; }
    .pp-wl--l { background: rgba(239,68,68,.10); color: #fca5a5; }
    .pp-wl--d { background: rgba(255,255,255,.06); color: var(--mu, #8a8aa0); }
    .pp-game__row { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--mu, #8a8aa0); padding-top: 4px; border-top: 1px solid var(--br, rgba(255,255,255,.08)); strong { color: var(--text); font-weight: 700; } }

    /* ── Modal ───────────────────────────────────────────── */
    .pp-modal-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,.7); backdrop-filter: blur(4px); display: grid; place-items: center; padding: 20px; }
    .pp-modal { width: 100%; max-width: 460px; background: var(--bg2, #10101c); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 16px; overflow: hidden; }
    .pp-modal__head { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--br, rgba(255,255,255,.08)); h3 { margin: 0; font-size: 16px; font-family: var(--fh, sans-serif); letter-spacing: 1px; text-transform: uppercase; } }
    .pp-x { background: none; border: none; color: var(--mu); cursor: pointer; padding: 6px; border-radius: 6px; &:hover { color: var(--text); background: rgba(255,255,255,.06); } }
    .pp-modal__body { padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; max-height: 60vh; overflow-y: auto;
      label { display: grid; grid-template-columns: 110px 1fr; align-items: center; gap: 12px; font-size: 13px; color: var(--mu, #8a8aa0); }
      input { background: var(--bg3, #181826); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 8px; padding: 9px 12px; color: var(--text); font-size: 13px; outline: none; &:focus { border-color: var(--primary, #006c35); } }
    }
    .pp-modal__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 14px 20px; border-top: 1px solid var(--br, rgba(255,255,255,.08)); }

    @media (prefers-reduced-motion: reduce) { .pp-skel, .pp-game { transition: none; animation: none; } }
  `],
})
export class PlayerProfileViewComponent implements OnChanges {
  readonly userId = input<string | null>(null);
  readonly mode   = input<'public' | 'self'>('public');

  private api = inject(PlayerProfileService);
  readonly auth = inject(AuthService);
  readonly friends = inject(FriendService);
  private dm = inject(DmService);
  private challengeUi = inject(ChallengeUiService);
  private toast = inject(ToastService);
  private router = inject(Router);

  readonly profile = signal<FullProfile | null>(null);
  readonly loading = signal(false);
  readonly error   = signal<string | null>(null);
  readonly openEdit = signal(false);
  readonly saving   = signal(false);
  form = { psn_id: '', xbox_gamertag: '', steam_id: '', riot_id: '', epic_id: '', pubg_id: '', cod_id: '' };

  ngOnChanges(_c: SimpleChanges): void { this.fetch(); }

  private fetch(): void {
    this.loading.set(true);
    this.error.set(null);
    const req = this.mode() === 'self' ? this.api.me() : this.api.show(this.userId() ?? '');
    req.subscribe({
      next: (r) => { this.profile.set(r.data); this.syncForm(); this.loading.set(false); },
      error: (e) => { this.error.set(e?.error?.message ?? 'Could not load profile.'); this.loading.set(false); },
    });
  }

  private syncForm(): void {
    const ids = this.profile()?.gaming_ids;
    if (!ids) return;
    this.form = {
      psn_id: ids.psn_id ?? '', xbox_gamertag: ids.xbox_gamertag ?? '',
      steam_id: ids.steam_id ?? '', riot_id: ids.riot_id ?? '',
      epic_id: ids.epic_id ?? '',  pubg_id: ids.pubg_id ?? '', cod_id: ids.cod_id ?? '',
    };
  }

  // Template helpers
  label(game: string): string { return GAME_LABELS[game] ?? game; }
  roleLabel(r: string): string { return r === 'organizer' ? 'Organizer' : r === 'admin' ? 'Admin' : 'Player'; }
  hasAnyId(p: FullProfile): boolean { return Object.values(p.gaming_ids).some(v => !!v); }
  idList(p: FullProfile): Array<{ label: string; value: string | null }> {
    return [
      { label: 'PSN',  value: p.gaming_ids.psn_id },
      { label: 'Xbox', value: p.gaming_ids.xbox_gamertag },
      { label: 'Steam',value: p.gaming_ids.steam_id },
      { label: 'Riot', value: p.gaming_ids.riot_id },
      { label: 'Epic', value: p.gaming_ids.epic_id },
      { label: 'PUBG', value: p.gaming_ids.pubg_id },
      { label: 'CoD',  value: p.gaming_ids.cod_id },
    ];
  }
  copy(text: string): void {
    navigator.clipboard?.writeText(text).then(() => this.toast.success('Copied to clipboard.'));
  }

  // Self-profile: save IDs
  saveIds(): void {
    if (this.saving()) return;
    this.saving.set(true);
    this.api.updateGamingIds(this.form).subscribe({
      next: (r) => { this.profile.set(r.data); this.saving.set(false); this.openEdit.set(false); this.toast.success('Gaming IDs updated.'); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Could not save.'); this.saving.set(false); },
    });
  }

  // Public-profile actions
  addFriend(p: FullProfile): void {
    this.friends.sendRequest({ id: p.user.id, name: p.user.name, nickname: p.user.nickname, display_name: p.user.display_name, avatar_url: p.user.avatar_url } as any).subscribe({
      next: () => this.toast.success(`Friend request sent to ${p.user.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not send request.'),
    });
  }
  acceptFriend(p: FullProfile): void {
    const req = this.friends.requests().find(r => r.user.id === p.user.id);
    if (!req) return;
    this.friends.accept(req).subscribe({
      next: () => this.toast.success(`You and ${p.user.display_name} are now friends.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Failed.'),
    });
  }
  msg(p: FullProfile): void {
    this.dm.openWith({ id: p.user.id, name: p.user.name, nickname: p.user.nickname, display_name: p.user.display_name, avatar_url: p.user.avatar_url } as any).subscribe({
      next: () => this.router.navigate(['/community/home'], { queryParams: { pane: 'messages' } }),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not open chat.'),
    });
  }
  challenge(p: FullProfile): void {
    this.challengeUi.open({ id: p.user.id, name: p.user.name, nickname: p.user.nickname, display_name: p.user.display_name, avatar_url: p.user.avatar_url } as any);
  }
}
