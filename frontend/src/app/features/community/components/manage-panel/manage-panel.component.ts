/**
 * Phase 7 — consolidated "Manage" panel (moderators+). A single slide-in panel
 * that hosts the channel-management, join/invite, and admin/safety panels as
 * three tabs, replacing the three separate header buttons. Each child renders
 * in embedded mode (no overlay/header of its own). The Admin tab keeps its own
 * internal Rules / Blocked words / Audit log sub-tabs.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelManageComponent } from '../channel-manage/channel-manage.component';
import { JoinPanelComponent } from '../join-panel/join-panel.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { CommunityInsightsComponent } from '../community-insights/community-insights.component';
import { JoinPolicy } from '../../models/community.model';

type ManageTab = 'channels' | 'join' | 'admin' | 'insights';

@Component({
  selector: 'app-manage-panel',
  standalone: true,
  imports: [CommonModule, ChannelManageComponent, JoinPanelComponent, AdminPanelComponent, CommunityInsightsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onBackdrop($event)">
      <aside class="panel">
        <header class="ph">
          <span class="title">Manage community</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <nav class="tabs">
          <button [class.active]="tab() === 'channels'" (click)="tab.set('channels')">Channels</button>
          <button [class.active]="tab() === 'join'" (click)="tab.set('join')">Join &amp; invites</button>
          <button [class.active]="tab() === 'admin'" (click)="tab.set('admin')">Admin &amp; safety</button>
          <button [class.active]="tab() === 'insights'" (click)="tab.set('insights')">Insights</button>
        </nav>

        <div class="content">
          <app-channel-manage
            *ngIf="tab() === 'channels'"
            [communityId]="communityId"
            [embedded]="true"
          />
          <app-join-panel
            *ngIf="tab() === 'join'"
            [communityId]="communityId"
            [initialPolicy]="initialPolicy"
            [embedded]="true"
          />
          <app-admin-panel
            *ngIf="tab() === 'admin'"
            [communityId]="communityId"
            [embedded]="true"
            (jumpToMessage)="jumpToMessage.emit($event)"
          />
          <app-community-insights
            *ngIf="tab() === 'insights'"
            [communityId]="communityId"
            [embedded]="true"
          />
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host { --accent: #00ffa3; --bg: #0b0b14; --raised: #16161f; --line: rgba(255,255,255,0.09); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 960; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; }
    .panel { width: 100%; max-width: 500px; height: 100%; background: var(--bg); border-left: 1px solid var(--line); display: flex; flex-direction: column; animation: slide 0.18s ease-out; }
    @keyframes slide { from { transform: translateX(30px); opacity: 0; } to { transform: none; opacity: 1; } }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .tabs { display: flex; gap: 0.25rem; padding: 0.6rem 1.1rem 0; border-bottom: 1px solid var(--line); }
    .tabs button { background: none; border: none; border-bottom: 2px solid transparent; color: var(--mut); padding: 0.55rem 0.75rem; cursor: pointer; font-size: 0.86rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .tabs button.active { color: var(--accent); border-bottom-color: var(--accent); }
    .content { flex: 1; overflow-y: auto; padding: 0 1.1rem 1.5rem; min-height: 0; }
  `],
})
export class ManagePanelComponent {
  @Input({ required: true }) communityId!: string;
  @Input() initialPolicy: JoinPolicy = 'closed';
  @Output() close = new EventEmitter<void>();
  @Output() jumpToMessage = new EventEmitter<{ channelId: string; messageId: string }>();

  readonly tab = signal<ManageTab>('channels');

  onBackdrop(ev: MouseEvent): void {
    if ((ev.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}
