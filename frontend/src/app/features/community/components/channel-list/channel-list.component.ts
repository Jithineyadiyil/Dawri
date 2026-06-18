/**
 * Sprint 15 — Mid-pane: channels within the active community.
 * Selecting a channel routes to /community/:slug/channel/:channelId.
 * Arena look: Anton header, mono channel names, a lime left-bar + glow on the
 * active channel, lime unread badge. Phase 7: the header gear opens the
 * consolidated Manage panel (via a shared state signal) instead of a dead route.
 */
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommunityStateService } from '../../services/community-state.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-channel-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <span class="title">{{ community()?.name ?? 'Community' }}</span>
      <button *ngIf="canManage()" class="gear" (click)="openManage()" title="Manage community">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
    </div>

    <div class="section-label" *ngIf="channels().length">Channels</div>
    <ul>
      <li *ngFor="let ch of channels()">
        <a [routerLink]="['/community', community()?.slug, 'channel', ch.id]"
           [class.active]="ch.id === activeChannelId()">
          <span class="hash" *ngIf="ch.type !== 'announcement'">#</span>
          <svg *ngIf="ch.type === 'announcement'" class="hash announce-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>
          <span class="name">{{ ch.name }}</span>
          <span class="badge" *ngIf="ch.unread_count && ch.unread_count > 0">
            {{ ch.unread_count > 99 ? '99+' : ch.unread_count }}
          </span>
        </a>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      --accent:   #7c3aed;
      --accent-s: #a78bfa;
      --hover:    #1c1833;
      --text:     #eaeaf2;
      --mut:      #7a7a92;
      --dim:      #4c4c63;
      --line:     rgba(255,255,255,0.06);
      display: flex; flex-direction: column; height: 100%;
    }
    .header {
      padding: 1.1rem 1.1rem 0.9rem;
      font-family: 'Anton', 'Bebas Neue', sans-serif;
      letter-spacing: 0.05em; text-transform: uppercase;
      border-bottom: 1px solid rgba(124,58,237,0.18);
      display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
      flex-shrink: 0; background: rgba(124,58,237,0.05);
    }
    .title {
      font-size: 1rem; line-height: 1.25; color: var(--text);
      overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
      -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    }
    .gear {
      background: none; border: none; cursor: pointer;
      color: var(--mut); font-size: 1rem; line-height: 1;
      width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
      display: grid; place-items: center;
      transition: color 0.16s ease, background 0.16s ease, transform 0.22s ease;
    }
    .gear:hover { color: var(--accent-s); background: var(--hover); transform: rotate(60deg); }

    .section-label {
      padding: 0.85rem 1.25rem 0.35rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.63rem; text-transform: uppercase; letter-spacing: 0.14em;
      color: var(--dim);
    }
    ul { list-style: none; padding: 0 0.55rem 0.8rem; margin: 0; overflow-y: auto; flex: 1; min-height: 0; }
    li { margin: 0 0 2px; }
    a {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.48rem 0.75rem;
      border-radius: 8px;
      color: var(--mut);
      text-decoration: none;
      position: relative;
      border-left: 2px solid transparent;
      transition: background 0.13s ease, color 0.13s ease, border-color 0.13s ease;
    }
    a:hover { background: var(--hover); color: var(--text); }
    a.active {
      background: rgba(124,58,237,0.15);
      color: var(--text);
      border-left-color: var(--accent);
      box-shadow: inset 0 0 30px rgba(124,58,237,0.12), inset 4px 0 16px rgba(124,58,237,0.15);
    }
    a.active .name { font-weight: 600; }
    a.active .hash { color: var(--accent-s); opacity: 1; }
    .hash { opacity: 0.5; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.88rem; flex-shrink: 0; }
    .announce-icon { display: block; flex-shrink: 0; }
    .name { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.86rem; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    @keyframes badgePulse {
      0%,100% { box-shadow: 0 0 8px rgba(124,58,237,.5); transform: scale(1); }
      50%      { box-shadow: 0 0 16px rgba(124,58,237,.8); transform: scale(1.1); }
    }
    .badge {
      margin-inline-start: auto;
      background: var(--accent); color: #fff;
      font-size: 0.65rem; padding: 0.05rem 0.42rem;
      border-radius: 999px; font-weight: 700; flex-shrink: 0;
      animation: badgePulse 2s ease-in-out infinite;
    }
  `],
})
export class ChannelListComponent {
  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);
  readonly community       = this.state.activeCommunity;
  readonly channels        = this.state.activeChannels;
  readonly activeChannelId = this.state.activeChannelId;

  /** Mods/admins of the active community (or global admins) see the gear. */
  readonly canManage = computed<boolean>(() => {
    const role = this.auth.currentUser()?.role;
    if (role === 'admin') return true;
    const uid = this.auth.currentUser()?.id;
    const cid = this.state.activeCommunityId();
    if (!uid || !cid) return false;
    const me = (this.state.membersByCommunity()[cid] ?? []).find(m => m.user?.id === uid);
    return me ? ['owner', 'admin', 'moderator'].includes(me.role) : false;
  });

  openManage(): void {
    this.state.requestManage();
  }
}
