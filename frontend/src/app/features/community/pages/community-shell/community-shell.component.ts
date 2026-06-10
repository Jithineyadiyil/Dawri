/**
 * Sprint 15 — Discord-style three-pane shell, redesigned with the Dawri
 * "Arena" visual language: deep near-black surfaces, an electric-lime
 * signature accent, gold reserved for owner/special states, and an
 * accent-lit left spine that gives the community its own identity.
 *
 *   ┌──────┬──────────────┬──────────┐
 *   │serv. │ channel list │ messages │
 *   │sidebr│              │  panel   │
 *   └──────┴──────────────┴──────────┘
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
    /* ── Arena design tokens (scoped to the community) ───────────────── */
    :host {
      --arena-bg:       #07070d;
      --arena-rail:     #0a0a12;
      --arena-panel:    #0d0d17;
      --arena-surface:  #12121e;
      --arena-raised:   #16161f;
      --arena-line:     rgba(0,255,163,0.10);
      --arena-line-2:   rgba(255,255,255,0.06);
      --arena-accent:   #00ffa3;   /* electric lime — the signature */
      --arena-accent-d: #00b574;
      --arena-gold:     #d4af37;   /* ties back to the Dawri brand */
      --arena-text:     #eaeaf2;
      --arena-mut:      #7a7a92;
      --arena-dim:      #4c4c63;
      --arena-display:  'Anton', 'Bebas Neue', sans-serif;
      --arena-mono:     'JetBrains Mono', ui-monospace, monospace;
      --arena-body:     'Archivo', system-ui, sans-serif;
    }

    .community-shell {
      display: grid;
      grid-template-columns: 76px 248px 1fr;
      height: calc(100vh - 64px);
      background: var(--arena-bg);
      color: var(--arena-text);
      font-family: var(--arena-body);
      position: relative;
    }

    /* The signature: a thin lime spine running down the rail's outer edge. */
    .server-sidebar {
      background: var(--arena-rail);
      position: relative;
      box-shadow: inset -1px 0 0 var(--arena-line-2);
    }
    .server-sidebar::before {
      content: '';
      position: absolute;
      top: 0; bottom: 0; left: 0;
      width: 3px;
      background: linear-gradient(180deg, var(--arena-accent), transparent 60%);
      opacity: 0.8;
    }

    .channel-list {
      background: var(--arena-panel);
      box-shadow: inset -1px 0 0 var(--arena-line-2);
    }
    .channel-content {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--arena-bg);
    }

    @media (max-width: 768px) {
      .community-shell { grid-template-columns: 60px 1fr; }
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
