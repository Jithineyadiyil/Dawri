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
      <button *ngIf="canManage()" class="gear" (click)="openManage()" title="Manage community">⚙</button>
    </div>

    <div class="section-label" *ngIf="channels().length">Channels</div>
    <ul>
      <li *ngFor="let ch of channels()">
        <a [routerLink]="['/community', community()?.slug, 'channel', ch.id]"
           [class.active]="ch.id === activeChannelId()">
          <span class="hash">{{ ch.type === 'announcement' ? '📢' : '#' }}</span>
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
      --accent: #00ffa3;
      --surface-hover: #16161f;
      --text: #eaeaf2;
      --mut: #7a7a92;
      --dim: #4c4c63;
      --line: rgba(255,255,255,0.06);
      display: flex; flex-direction: column; height: 100%;
    }
    .header {
      padding: 1.15rem 1.15rem 1rem;
      font-family: 'Anton', 'Bebas Neue', sans-serif;
      letter-spacing: 0.05em; text-transform: uppercase;
      border-bottom: 1px solid var(--line);
      display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
      flex-shrink: 0;
    }
    .title {
      font-size: 1.1rem; line-height: 1.25; color: var(--text);
      overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
      -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    }
    .gear {
      background: none; border: none; cursor: pointer;
      color: var(--mut); font-size: 1.15rem; line-height: 1;
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      display: grid; place-items: center;
      transition: color 0.16s ease, background 0.16s ease, transform 0.2s ease;
    }
    .gear:hover { color: var(--accent); background: var(--surface-hover); transform: rotate(45deg); }

    .section-label {
      padding: 0.85rem 1.25rem 0.35rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.14em;
      color: var(--dim);
    }
    ul { list-style: none; padding: 0 0.6rem 0.8rem; margin: 0; overflow-y: auto; flex: 1; min-height: 0; }
    li { margin: 0 0 3px; }
    a {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      color: var(--mut);
      text-decoration: none;
      position: relative;
      border-left: 2px solid transparent;
      transition: background 0.14s ease, color 0.14s ease, border-color 0.14s ease;
    }
    a:hover { background: var(--surface-hover); color: var(--text); }
    a.active {
      background: var(--surface-hover);
      color: var(--text);
      border-left-color: var(--accent);
      box-shadow: inset 0 0 18px rgba(0,255,163,0.06);
    }
    a.active .name { font-weight: 600; }
    a.active .hash { color: var(--accent); opacity: 1; }
    .hash { opacity: 0.55; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.9rem; }
    .name { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.88rem; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .badge {
      margin-inline-start: auto;
      background: var(--accent); color: #06281c;
      font-size: 0.68rem; padding: 0.05rem 0.42rem;
      border-radius: 999px; font-weight: 700; flex-shrink: 0;
      box-shadow: 0 0 10px rgba(0,255,163,0.4);
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
