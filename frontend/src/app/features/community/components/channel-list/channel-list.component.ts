/**
 * Sprint 15 — Mid-pane: channels within the active community.
 * Selecting a channel routes to /community/:slug/channel/:channelId.
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommunityStateService } from '../../services/community-state.service';

@Component({
  selector: 'app-channel-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <span>{{ community()?.name ?? 'Community' }}</span>
    </div>
    <ul>
      <li *ngFor="let ch of channels()">
        <a [routerLink]="['/community', community()?.slug, 'channel', ch.id]"
           [class.active]="ch.id === activeChannelId()">
          <span class="hash">{{ ch.type === 'announcement' ? '📢' : '#' }}</span>
          {{ ch.name }}
          <span class="badge" *ngIf="ch.unread_count && ch.unread_count > 0">
            {{ ch.unread_count > 99 ? '99+' : ch.unread_count }}
          </span>
        </a>
      </li>
    </ul>
  `,
  styles: [`
    .header { padding: 0.75rem 1rem; font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.05em; color: var(--gold, #f0a500); border-bottom: 1px solid #1a1f3a; }
    ul { list-style: none; padding: 0.5rem; margin: 0; }
    li { margin: 0; }
    a {
      display: flex; align-items: center; gap: 0.25rem;
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
      color: #8b91b3;
      text-decoration: none;
      font-size: 0.9rem;
    }
    a:hover { background: #1a1f3a; color: #e6e8f5; }
    a.active { background: #1a1f3a; color: #e6e8f5; }
    .hash { opacity: 0.7; margin-inline-end: 0.25rem; }
    .badge { margin-inline-start: auto; background: var(--gold, #f0a500); color: #060810; font-size: 0.7rem; padding: 0 0.4rem; border-radius: 10px; font-weight: 700; }
  `],
})
export class ChannelListComponent {
  private readonly state = inject(CommunityStateService);
  readonly community       = this.state.activeCommunity;
  readonly channels        = this.state.activeChannels;
  readonly activeChannelId = this.state.activeChannelId;
}
