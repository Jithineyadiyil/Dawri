/**
 * Sprint 15 — Right-side member list, grouped by role, with moderation
 * actions (mute / unmute / ban / unban / kick / change role) exposed via a
 * per-member menu. Actions are gated by the viewer's permissions:
 *   - Platform admins and the community owner can do everything (except touch
 *     the owner).
 *   - Moderators can mute/kick regular members only.
 *   - Role changes (promote/demote) are owner/admin only.
 * The actual permission enforcement is server-side; this UI hides actions the
 * viewer cannot perform to avoid dead buttons.
 */
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommunityMember, MemberRole, PresenceStatus } from '../../models/community.model';

interface MuteOption { label: string; minutes: number; }

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="member-list">
      <section *ngFor="let group of groups()">
        <h4>{{ group.label }} — {{ group.members.length }}</h4>
        <ul>
          <li *ngFor="let m of group.members" [class.has-menu]="openMenuFor() === m.user.id">
            <span class="dot" [class]="presence(m.user.id)"></span>
            <span class="ava">
              <img *ngIf="m.user.avatar" [src]="m.user.avatar" [alt]="m.user.nickname ?? ''" />
              <span *ngIf="!m.user.avatar" class="ava-letter">{{ initials(m.user.nickname) }}</span>
            </span>
            <span class="nick" [class.muted]="m.is_muted">{{ m.user.nickname ?? '—' }}</span>
            <span class="muted-flag" *ngIf="m.is_muted" title="Muted">🔇</span>

            <button
              *ngIf="canModerate(m)"
              class="kebab"
              (click)="toggleMenu(m.user.id, $event)"
              title="Moderate"
            >⋯</button>

            <div class="menu" *ngIf="openMenuFor() === m.user.id" (click)="$event.stopPropagation()">
              <!-- Mute / Unmute -->
              <ng-container *ngIf="!m.is_muted">
                <div class="menu-group">
                  <span class="menu-label">Mute for…</span>
                  <button *ngFor="let opt of muteOptions" (click)="mute(m, opt.minutes)">{{ opt.label }}</button>
                </div>
              </ng-container>
              <button *ngIf="m.is_muted" (click)="unmute(m)">Unmute</button>

              <!-- Ban / Unban -->
              <button *ngIf="!m.is_banned" class="danger" (click)="ban(m)">Ban…</button>
              <button *ngIf="m.is_banned" (click)="unban(m)">Unban</button>

              <!-- Kick -->
              <button class="danger" (click)="kick(m)">Remove from community</button>

              <!-- Role change (owner/admin only) -->
              <ng-container *ngIf="canChangeRoles()">
                <div class="menu-group">
                  <span class="menu-label">Set role</span>
                  <button *ngIf="m.role !== 'admin'" (click)="setRole(m, 'admin')">Make admin</button>
                  <button *ngIf="m.role !== 'moderator'" (click)="setRole(m, 'moderator')">Make moderator</button>
                  <button *ngIf="m.role !== 'member'" (click)="setRole(m, 'member')">Make member</button>
                </div>
              </ng-container>
            </div>
          </li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .member-list { padding: 0.75rem; font-size: 0.85rem; }
    section { margin-bottom: 1rem; }
    h4 { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: #00ffa3; margin: 0 0 0.4rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { position: relative; display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.4rem; border-radius: 4px; }
    li:hover { background: #16161f; }
    li:hover .kebab { opacity: 1; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #4c4c63; }
    .dot.online  { background: #00ffa3; box-shadow: 0 0 6px rgba(0,255,163,0.6); }
    .dot.idle    { background: #d4af37; }
    .dot.offline { background: #4c4c63; }
    .ava { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: grid; place-items: center; background: #16161f; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); }
    .ava img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
    .ava-letter { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 0.7rem; color: #00ffa3; line-height: 1; }
    .nick { flex: 1; color: #cfcfe0; }
    .nick.muted { opacity: 0.55; }
    .kebab {
      opacity: 0; background: none; border: none; color: #7a7a92; cursor: pointer;
      font-size: 1.1rem; line-height: 1; padding: 0 0.25rem; border-radius: 4px;
    }
    .kebab:hover { color: #fff; background: #16161f; }
    .menu {
      position: absolute; right: 0.4rem; top: 100%; z-index: 20;
      background: #0d0d17; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
      padding: 0.4rem; min-width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      display: flex; flex-direction: column; gap: 0.15rem;
    }
    .menu button {
      text-align: left; background: none; border: none; color: #cfcfe0;
      padding: 0.4rem 0.5rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;
    }
    .menu button:hover { background: #16161f; color: #fff; }
    .menu button.danger { color: #ff6b6b; }
    .menu button.danger:hover { background: #3a1a1a; }
    .menu-group { display: flex; flex-direction: column; gap: 0.1rem; padding: 0.2rem 0; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 0.2rem; }
    .menu-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.08em; color: #7a7a92; padding: 0.2rem 0.5rem; }
  `],
})
export class MemberListComponent {
  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);

  readonly muteOptions: MuteOption[] = [
    { label: '5 minutes',  minutes: 5 },
    { label: '30 minutes', minutes: 30 },
    { label: '1 hour',     minutes: 60 },
    { label: '4 hours',    minutes: 240 },
    { label: '1 day',      minutes: 1440 },
    { label: '1 week',     minutes: 10080 },
  ];

  /** Which member's action menu is currently open (by user id). */
  readonly openMenuFor = signal<string | null>(null);

  readonly groups = computed(() => {
    const communityId = this.state.activeCommunityId();
    if (!communityId) return [];
    const members = this.state.membersByCommunity()[communityId] ?? [];
    const buckets: Record<MemberRole, CommunityMember[]> = { owner: [], admin: [], moderator: [], member: [] };
    for (const m of members) buckets[m.role].push(m);
    const labelMap: Record<MemberRole, string> = {
      owner: 'Owner', admin: 'Admins', moderator: 'Moderators', member: 'Members',
    };
    return (['owner', 'admin', 'moderator', 'member'] as MemberRole[])
      .filter(role => buckets[role].length > 0)
      .map(role => ({ label: labelMap[role], members: buckets[role] }));
  });

  /** The viewer's membership row in the active community (if any). */
  private readonly myMembership = computed<CommunityMember | null>(() => {
    const communityId = this.state.activeCommunityId();
    const myId = this.auth.currentUser()?.id;
    if (!communityId || !myId) return null;
    const members = this.state.membersByCommunity()[communityId] ?? [];
    return members.find(m => m.user.id === myId) ?? null;
  });

  private isPlatformAdmin(): boolean {
    return this.auth.currentUser()?.role === 'admin';
  }

  /** Owner or platform admin may change roles. */
  canChangeRoles(): boolean {
    return this.isPlatformAdmin() || this.myMembership()?.role === 'owner';
  }

  /**
   * Whether the viewer may moderate this target. Mirrors server rules so the
   * menu only shows where an action would succeed.
   */
  canModerate(target: CommunityMember): boolean {
    const myId = this.auth.currentUser()?.id;
    if (!myId || target.user.id === myId) return false;        // not on self
    if (target.role === 'owner') return false;                 // never the owner
    if (this.isPlatformAdmin()) return true;

    const mine = this.myMembership();
    if (!mine) return false;
    if (mine.role === 'owner' || mine.role === 'admin') return true;
    if (mine.role === 'moderator') {
      // moderators act on regular members only
      return target.role === 'member';
    }
    return false;
  }

  toggleMenu(userId: string, ev: Event): void {
    ev.stopPropagation();
    this.openMenuFor.update(cur => (cur === userId ? null : userId));
  }

  private close(): void { this.openMenuFor.set(null); }

  mute(m: CommunityMember, minutes: number): void {
    this.state.moderate({ action: 'mute', user_id: m.user.id, minutes });
    this.close();
  }

  unmute(m: CommunityMember): void {
    this.state.moderate({ action: 'unmute', user_id: m.user.id });
    this.close();
  }

  ban(m: CommunityMember): void {
    const reason = window.prompt('Reason for banning ' + (m.user.nickname ?? 'this member') + '?');
    if (reason === null) { this.close(); return; }              // cancelled
    this.state.moderate({ action: 'ban', user_id: m.user.id, reason: reason || 'No reason provided' });
    this.close();
  }

  unban(m: CommunityMember): void {
    this.state.moderate({ action: 'unban', user_id: m.user.id });
    this.close();
  }

  kick(m: CommunityMember): void {
    const ok = window.confirm('Remove ' + (m.user.nickname ?? 'this member') + ' from the community? They can rejoin later.');
    if (!ok) { this.close(); return; }
    this.state.moderate({ action: 'kick', user_id: m.user.id });
    this.close();
  }

  setRole(m: CommunityMember, role: 'admin' | 'moderator' | 'member'): void {
    this.state.moderate({ action: 'set_role', user_id: m.user.id, role });
    this.close();
  }

  presence(userId: string): PresenceStatus {
    return this.state.presenceByUser()[userId] ?? 'offline';
  }

  /** Two-letter fallback shown when a member has no avatar. */
  initials(nickname: string | null): string {
    return (nickname ?? '?').slice(0, 2).toUpperCase();
  }
}
