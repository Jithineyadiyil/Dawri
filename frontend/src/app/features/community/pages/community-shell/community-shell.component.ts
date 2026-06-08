/**
 * Sprint 15 — Discord-style three-pane shell:
 *   ┌──────┬──────────────┬──────────┐
 *   │serv. │ channel list │ messages │
 *   │sidebr│              │  panel   │
 *   └──────┴──────────────┴──────────┘
 *
 * On mobile, the side panels collapse to a hamburger drawer.
 */
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CommunityStateService } from '../../services/community-state.service';
import { ReverbConnectionService } from '../../services/reverb-connection.service';
import { ServerSidebarComponent } from '../../components/server-sidebar/server-sidebar.component';
import { ChannelListComponent } from '../../components/channel-list/channel-list.component';

@Component({
  selector: 'app-community-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ServerSidebarComponent, ChannelListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="community-shell">
      <app-server-sidebar class="server-sidebar" />
      <app-channel-list class="channel-list" />
      <main class="channel-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .community-shell {
      display: grid;
      grid-template-columns: 72px 240px 1fr;
      height: calc(100vh - 64px);
      background: var(--bg, #0b1022);
      color: #e6e8f5;
      font-family: 'Rajdhani', 'Noto Sans Arabic', sans-serif;
    }
    .server-sidebar  { background: #060810; border-right: 1px solid #1a1f3a; }
    .channel-list    { background: #0e1428; border-right: 1px solid #1a1f3a; }
    .channel-content { display: flex; flex-direction: column; overflow: hidden; }
    @media (max-width: 768px) {
      .community-shell { grid-template-columns: 56px 1fr; }
      .channel-list    { display: none; }
    }
  `],
})
export class CommunityShellComponent implements OnInit, OnDestroy {
  private readonly state = inject(CommunityStateService);
  private readonly reverb = inject(ReverbConnectionService);

  async ngOnInit(): Promise<void> {
    this.state.loadCommunities();
    await this.reverb.init();
  }

  ngOnDestroy(): void {
    this.reverb.disconnect();
  }
}
