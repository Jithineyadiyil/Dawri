import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeamDetail, TeamMemberRow, TeamService, TeamSummary } from './team.service';
import { GAME_LABELS } from '../profile/player-profile.service';
import { AuthService } from '../../core/services/auth.service';
import { ChallengeService } from '../social/challenge.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-team-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
@if (team(); as t) {
  <div class="tp-shell">
    <a routerLink="/teams" class="tp-back">← Back to teams</a>

    <header class="tp-hero">
      <span class="tp-logo">
        @if (t.logo_url) { <img [src]="t.logo_url" [alt]="t.name"/> }
        @else { <span class="tp-logo-letter">{{ (t.tag || t.name).charAt(0).toUpperCase() }}</span> }
      </span>
      <div class="tp-id">
        <h1 class="tp-name">{{ t.name }}@if (t.tag) { <span class="tp-tag">[{{ t.tag }}]</span> }</h1>
        <div class="tp-meta">
          {{ gameLabel(t.game) }}
          @if (t.region) { · {{ t.region }} }
          · {{ t.members.length }} member{{ t.members.length === 1 ? '' : 's' }}
          @if (t.is_recruiting) { · <span class="tp-recruit">Recruiting</span> }
        </div>
        @if (t.description) { <p class="tp-desc">{{ t.description }}</p> }
      </div>
      <div class="tp-actions">
        @if (canManage(t)) {
          <button class="tp-btn tp-btn--ghost" (click)="openInvite.set(true)">+ Invite player</button>
        }
        @if (!t.my_role && eligibleChallengerTeam(t)) {
          <button class="tp-btn tp-btn--accent" (click)="openChallenge.set(true)">Challenge this team</button>
        }
        @if (canLeave(t)) {
          <button class="tp-btn tp-btn--danger" [disabled]="busy()" (click)="leave(t)">Leave team</button>
        }
        @if (t.i_am_owner) {
          <button class="tp-btn tp-btn--danger" [disabled]="busy()" (click)="disband(t)">Disband</button>
        }
      </div>
    </header>

    <section class="tp-section">
      <h2 class="tp-h">Roster</h2>
      <div class="tp-roster">
        @for (m of t.members; track m.id) {
          <div class="tp-row">
            <span class="tp-ava">
              @if (m.user.avatar_url) { <img [src]="m.user.avatar_url" [alt]="m.user.display_name"/> }
              @else { <span class="tp-ava-letter">{{ (m.user.display_name || '?').charAt(0) }}</span> }
            </span>
            <div class="tp-info">
              <a [routerLink]="['/players', m.user.id]" class="tp-pname">{{ m.user.display_name }}</a>
              @if (m.user.nickname) { <div class="tp-pnick">{{ '@' + m.user.nickname }}</div> }
            </div>
            <span class="tp-role tp-role--{{ m.role }}">{{ m.role }}</span>
            @if (canManageRoster(t, m)) {
              <div class="tp-row-actions">
                @if (t.i_am_owner && m.role === 'member') {
                  <button class="tp-icon" title="Promote to captain" (click)="promote(t, m)" [disabled]="busy()">↑</button>
                }
                @if (t.i_am_owner && m.role === 'captain') {
                  <button class="tp-icon" title="Demote to member" (click)="demote(t, m)" [disabled]="busy()">↓</button>
                }
                @if (m.role !== 'owner') {
                  <button class="tp-icon tp-icon--danger" title="Remove from team" (click)="kick(t, m)" [disabled]="busy()">×</button>
                }
              </div>
            }
          </div>
        }
      </div>
    </section>

    @if (openChallenge() && !t.my_role) {
      <div class="tp-modal-overlay" (click)="openChallenge.set(false)">
        <div class="tp-modal" (click)="$event.stopPropagation()">
          <header class="tp-modal__head">
            <h3>Challenge {{ t.name }}</h3>
            <button class="tp-x" (click)="openChallenge.set(false)" aria-label="Close">×</button>
          </header>
          <div class="tp-modal__body">
            <p>Pick one of your teams to challenge <strong>{{ t.name }}</strong> ({{ gameLabel(t.game) }}). Both teams must play the same game.</p>
            <div class="tp-challenger-options">
              @for (mine of eligibleTeams(t); track mine.id) {
                <button type="button"
                  class="tp-chal-opt" [class.active]="challengerTeamId() === mine.id"
                  (click)="challengerTeamId.set(mine.id)">
                  <strong>{{ mine.name }}</strong>
                  @if (mine.tag) { <span>[{{ mine.tag }}]</span> }
                </button>
              }
              @if (eligibleTeams(t).length === 0) {
                <div class="tp-empty">You don't own/captain any {{ gameLabel(t.game) }} teams.</div>
              }
            </div>
            <textarea class="tp-input" rows="2" maxlength="500" [(ngModel)]="challengeMessage" placeholder="Trash talk, proposed time, rules… (optional)"></textarea>
          </div>
          <footer class="tp-modal__foot">
            <button class="tp-btn tp-btn--ghost" (click)="openChallenge.set(false)">Cancel</button>
            <button class="tp-btn tp-btn--primary" [disabled]="!challengerTeamId() || busy()" (click)="submitChallenge(t)">Send challenge</button>
          </footer>
        </div>
      </div>
    }

    @if (openInvite() && canManage(t)) {
      <div class="tp-modal-overlay" (click)="openInvite.set(false)">
        <div class="tp-modal" (click)="$event.stopPropagation()">
          <header class="tp-modal__head">
            <h3>Invite a player</h3>
            <button class="tp-x" (click)="openInvite.set(false)" aria-label="Close">×</button>
          </header>
          <div class="tp-modal__body">
            <p>Paste the player's user ID. (Friend invites integration coming with achievements.)</p>
            <input [(ngModel)]="inviteUserId" placeholder="Player UUID" />
          </div>
          <footer class="tp-modal__foot">
            <button class="tp-btn tp-btn--ghost" (click)="openInvite.set(false)">Cancel</button>
            <button class="tp-btn tp-btn--primary" [disabled]="!inviteUserId.trim() || busy()" (click)="invite(t)">Send invite</button>
          </footer>
        </div>
      </div>
    }
  </div>
} @else if (loading()) {
  <div class="tp-shell"><div class="tp-skel"></div></div>
} @else if (error()) {
  <div class="tp-shell"><div class="tp-error">{{ error() }}</div></div>
}
  `,
  styles: [`
    :host { display:block; color: var(--text, #ececf1); }
    .tp-shell { max-width: 900px; margin: 0 auto; padding: 1.25rem 1.5rem 4rem; }
    .tp-back { display:inline-block; font-family: var(--fm, monospace); font-size: 12px; color: var(--mu, #8a8aa0); text-decoration: none; margin-bottom: 12px; &:hover { color: var(--text); } }

    .tp-hero { display:grid; grid-template-columns: auto 1fr auto; gap: 18px; align-items:center; padding: 22px; background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius: 14px; margin-bottom: 14px; }
    @media (max-width: 720px) { .tp-hero { grid-template-columns: auto 1fr; } .tp-actions { grid-column: 1 / -1; justify-content: flex-start; } }
    .tp-logo { width: 76px; height: 76px; border-radius: 14px; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .tp-logo img { width:100%; height:100%; object-fit:cover; }
    .tp-logo-letter { font-family: var(--fh, sans-serif); font-size: 32px; color:#fff; }

    .tp-id { min-width: 0; }
    .tp-name { font-family: var(--fh, sans-serif); font-size: clamp(22px, 3vw, 30px); letter-spacing:.8px; text-transform: uppercase; margin: 0; display: inline-flex; align-items: center; gap: 8px; }
    .tp-tag { font-family: var(--fm, monospace); font-size: 14px; color: var(--accent, #d4af37); }
    .tp-meta { font-size: 13px; color: var(--mu, #8a8aa0); margin-top: 6px; }
    .tp-recruit { color: #4ade80; font-weight: 700; }
    .tp-desc { margin: 10px 0 0; font-size: 14px; color: var(--text); line-height: 1.5; max-width: 60ch; }

    .tp-actions { display:flex; gap: 8px; flex-wrap: wrap; flex-shrink: 0; }
    .tp-btn { padding: 9px 14px; border-radius: 9px; font-weight: 700; font-size: 13px; cursor: pointer; border: 1px solid transparent; &:disabled { opacity:.5; cursor:not-allowed; } }
    .tp-btn--primary { background: var(--primary, #006c35); color: #fff; &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); } }
    .tp-btn--ghost { background: transparent; border-color: var(--br2, rgba(255,255,255,.14)); color: var(--text); &:hover:not(:disabled){ background: rgba(255,255,255,.05); } }
    .tp-btn--danger { background: transparent; border-color: rgba(239,68,68,.4); color: #fca5a5; &:hover:not(:disabled){ background: rgba(239,68,68,.1); border-color: rgba(239,68,68,.7); } }
    .tp-btn--accent { background: var(--accent, #d4af37); color: #1a1100; &:hover:not(:disabled){ background: var(--accent-soft, #e8c965); } }

    .tp-challenger-options { display:flex; flex-direction:column; gap: 6px; }
    .tp-chal-opt { display:flex; align-items:center; gap: 8px; padding: 10px 12px; background: var(--bg3, #181826); border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 8px; color: var(--text); cursor: pointer; text-align: left;
      strong { font-weight: 700; } span { font-family: var(--fm, monospace); font-size: 11px; color: var(--accent, #d4af37); }
      &.active { border-color: var(--primary, #006c35); background: rgba(0,108,53,.14); } }
    .tp-input { background: var(--bg3, #181826); border: 1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 8px; padding: 10px 12px; color: var(--text); font-size: 13px; outline: none; font-family: var(--fb, sans-serif); resize: vertical; margin-top: 8px;
      &:focus { border-color: var(--primary, #006c35); } }
    .tp-empty { padding: 14px; text-align: center; color: var(--mu, #8a8aa0); font-size: 13px; border: 1px dashed var(--br2, rgba(255,255,255,.14)); border-radius: 8px; }

    .tp-section { background: var(--bg2, #10101c); border:1px solid var(--br, rgba(255,255,255,.08)); border-radius: 14px; padding: 18px 20px; }
    .tp-h { font-family: var(--fh, sans-serif); font-size: 16px; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px; }
    .tp-roster { display:flex; flex-direction: column; gap: 4px; }
    .tp-row { display:flex; align-items:center; gap: 10px; padding: 9px 10px; border-radius: 10px; transition: background .12s; }
    .tp-row:hover { background: var(--bg3, #181826); }
    .tp-ava { width: 36px; height: 36px; border-radius: 50%; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .tp-ava img { width:100%; height:100%; object-fit: cover; } .tp-ava-letter { font-family: var(--fh, sans-serif); font-size: 14px; color:#fff; }
    .tp-info { flex:1; min-width: 0; }
    .tp-pname { font-weight: 700; font-size: 14px; color: var(--text); text-decoration: none; &:hover { color: var(--accent, #d4af37); } }
    .tp-pnick { font-family: var(--fm, monospace); font-size: 11px; color: var(--mu, #8a8aa0); margin-top: 2px; }
    .tp-role { font-family: var(--fm, monospace); font-size: 10px; padding: 2px 8px; border-radius: 100px; letter-spacing: 1.2px; text-transform: uppercase; }
    .tp-role--owner   { background: rgba(212,175,55,.16); color: var(--accent, #d4af37); }
    .tp-role--captain { background: rgba(0,108,53,.16); color: #4ade80; }
    .tp-role--member  { background: rgba(255,255,255,.06); color: var(--mu, #8a8aa0); }
    .tp-row-actions { display:flex; gap: 4px; }
    .tp-icon { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--br2, rgba(255,255,255,.14)); background: transparent; color: var(--mu); cursor: pointer; font-size: 14px; line-height: 1; padding: 0;
      &:hover:not(:disabled){ color: var(--text); border-color: var(--text); } }
    .tp-icon--danger:hover:not(:disabled) { color: #fca5a5; border-color: rgba(239,68,68,.5); background: rgba(239,68,68,.1); }

    .tp-modal-overlay { position: fixed; inset:0; z-index: 1000; background: rgba(0,0,0,.7); backdrop-filter: blur(4px); display:grid; place-items:center; padding: 20px; }
    .tp-modal { width:100%; max-width: 460px; background: var(--bg2, #10101c); border:1px solid var(--br2, rgba(255,255,255,.14)); border-radius:16px; overflow: hidden; }
    .tp-modal__head { display:flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--br, rgba(255,255,255,.08)); h3 { margin: 0; font-size: 16px; font-family: var(--fh, sans-serif); letter-spacing: 1px; text-transform: uppercase; } }
    .tp-x { background: none; border: none; color: var(--mu); cursor: pointer; font-size: 22px; line-height: 1; padding: 0 6px; &:hover { color: var(--text); } }
    .tp-modal__body { padding: 16px 20px; display: flex; flex-direction: column; gap: 10px;
      p { margin: 0; font-size: 13px; color: var(--mu, #8a8aa0); }
      input { background: var(--bg3, #181826); border:1px solid var(--br2, rgba(255,255,255,.14)); border-radius: 8px; padding: 10px 12px; color: var(--text); font-size: 13px; outline: none; font-family: var(--fm, monospace); &:focus { border-color: var(--primary, #006c35); } } }
    .tp-modal__foot { display:flex; justify-content: flex-end; gap: 10px; padding: 14px 20px; border-top: 1px solid var(--br, rgba(255,255,255,.08)); }

    .tp-error { padding: 24px; text-align: center; color: #fca5a5; background: rgba(239,68,68,.08); border:1px solid rgba(239,68,68,.25); border-radius: 12px; }
    .tp-skel { height: 110px; background: rgba(255,255,255,.05); border-radius: 14px; animation: tpPulse 1.5s ease-in-out infinite; }
    @keyframes tpPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .tp-skel { animation: none; } }
  `],
})
export class TeamProfilePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(TeamService);
  private auth = inject(AuthService);
  private challenges = inject(ChallengeService);
  private toast = inject(ToastService);

  readonly team = signal<TeamDetail | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly busy = signal(false);
  readonly openInvite = signal(false);
  readonly openChallenge = signal(false);
  readonly challengerTeamId = signal<string | null>(null);
  challengeMessage = '';
  inviteUserId = '';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.fetch(slug);
    if (!this.svc.loadedMine()) this.svc.loadMine();
  }

  private fetch(slug: string): void {
    this.loading.set(true); this.error.set(null);
    this.svc.show(slug).subscribe({
      next: (r) => { this.team.set(r.data); this.loading.set(false); },
      error: (e) => { this.error.set(e?.status === 404 ? 'Team not found.' : (e?.error?.message ?? 'Could not load team.')); this.loading.set(false); },
    });
  }

  gameLabel(g: string): string { return GAME_LABELS[g] ?? g; }
  canManage(t: TeamDetail): boolean { return t.my_role === 'owner' || t.my_role === 'captain'; }
  canLeave(t: TeamDetail): boolean  { return !!t.my_role && t.my_role !== 'owner'; }
  canManageRoster(t: TeamDetail, m: TeamMemberRow): boolean {
    if (m.role === 'owner') return false;
    if (t.i_am_owner) return true;
    return t.my_role === 'captain' && m.role === 'member';
  }

  invite(t: TeamDetail): void {
    const userId = this.inviteUserId.trim();
    if (!userId) return;
    this.busy.set(true);
    this.svc.invite(t.id, userId).subscribe({
      next: () => { this.toast.success('Invite sent.'); this.busy.set(false); this.openInvite.set(false); this.inviteUserId = ''; },
      error: (e) => { this.toast.error(e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? 'Failed.'); this.busy.set(false); },
    });
  }

  kick(t: TeamDetail, m: TeamMemberRow): void {
    this.busy.set(true);
    this.svc.kick(t.id, m.user.id).subscribe({
      next: () => { this.toast.info(`${m.user.display_name} removed.`); this.busy.set(false); this.fetch(t.slug); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.busy.set(false); },
    });
  }
  promote(t: TeamDetail, m: TeamMemberRow): void {
    this.busy.set(true);
    this.svc.promote(t.id, m.user.id).subscribe({
      next: () => { this.toast.success(`${m.user.display_name} promoted to captain.`); this.busy.set(false); this.fetch(t.slug); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.busy.set(false); },
    });
  }
  demote(t: TeamDetail, m: TeamMemberRow): void {
    this.busy.set(true);
    this.svc.demote(t.id, m.user.id).subscribe({
      next: () => { this.toast.info(`${m.user.display_name} demoted to member.`); this.busy.set(false); this.fetch(t.slug); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.busy.set(false); },
    });
  }
  leave(t: TeamDetail): void {
    this.busy.set(true);
    this.svc.leave(t.id).subscribe({
      next: () => { this.toast.info('You left the team.'); this.router.navigate(['/teams']); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.busy.set(false); },
    });
  }
  /** Teams I own/captain that play the same game as the target — eligible challengers. */
  eligibleTeams(target: TeamDetail): TeamSummary[] {
    return this.svc.myTeams().filter(m =>
      m.game === target.game &&
      (m.my_role === 'owner' || m.my_role === 'captain') &&
      m.id !== target.id);
  }
  /** Quick boolean for the button: I can challenge this team if I have at least one eligible team. */
  eligibleChallengerTeam(target: TeamDetail): boolean {
    return this.eligibleTeams(target).length > 0;
  }

  submitChallenge(t: TeamDetail): void {
    const cid = this.challengerTeamId();
    if (!cid || this.busy()) return;
    this.busy.set(true);
    this.challenges.createTeam(cid, t.id, t.game, this.challengeMessage.trim()).subscribe({
      next: () => {
        this.toast.success(`Challenge sent to ${t.name}.`);
        this.busy.set(false); this.openChallenge.set(false); this.challengeMessage = ''; this.challengerTeamId.set(null);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? 'Failed.');
        this.busy.set(false);
      },
    });
  }

  disband(t: TeamDetail): void {
    if (!confirm(`Disband ${t.name}? This cannot be undone.`)) return;
    this.busy.set(true);
    this.svc.destroy(t.id).subscribe({
      next: () => { this.toast.info('Team disbanded.'); this.router.navigate(['/teams']); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Failed.'); this.busy.set(false); },
    });
  }
}
