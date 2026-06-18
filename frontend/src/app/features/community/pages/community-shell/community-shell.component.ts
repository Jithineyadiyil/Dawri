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
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    <div class="community-shell" [class.shell--home]="isHome()">
      <app-server-sidebar class="server-sidebar" />
      @if (!isHome()) {
        <app-channel-list class="channel-list" />
      }
      <main class="channel-content">
        <div class="shell-bg" aria-hidden="true">
          <div class="shell-orb o1"></div>
          <div class="shell-orb o2"></div>
          <div class="shell-orb o3"></div>
          <div class="shell-grid"></div>
        </div>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    /* ── Vibe design tokens — deep purple community identity ─────────── */
    :host {
      --v-bg:       #0b0a14;
      --v-rail:     #0e0c1a;
      --v-panel:    #110f1e;
      --v-surface:  #161228;
      --v-raised:   #1c1833;
      --v-line:     rgba(124,58,237,0.14);
      --v-line-2:   rgba(255,255,255,0.06);
      --v-accent:   #7c3aed;
      --v-accent-s: #a78bfa;
      --v-accent-g: rgba(124,58,237,0.32);
      --v-cta:      #22c55e;
      --v-gold:     #d4af37;
      --v-text:     #eaeaf2;
      --v-mut:      #7a7a92;
      --v-dim:      #4c4c63;
      --v-display:  'Anton', 'Bebas Neue', sans-serif;
      --v-mono:     'JetBrains Mono', ui-monospace, monospace;
      --v-body:     'Archivo', system-ui, sans-serif;
    }

    .community-shell {
      display: grid;
      grid-template-columns: 76px 248px 1fr;
      height: calc(100vh - 64px);
      background: var(--v-bg);
      color: var(--v-text);
      font-family: var(--v-body);
      position: relative;
    }
    /* Home (Friends + DMs) hides the channel list → two columns */
    .community-shell.shell--home { grid-template-columns: 76px 1fr; }

    /* Purple gradient spine on the far left edge */
    .server-sidebar {
      background: var(--v-rail);
      position: relative;
      box-shadow: inset -1px 0 0 var(--v-line-2);
    }
    .server-sidebar::before {
      content: '';
      position: absolute;
      top: 0; bottom: 0; left: 0;
      width: 3px;
      background: linear-gradient(180deg, var(--v-accent) 0%, var(--v-accent-s) 50%, transparent 100%);
      opacity: 0.9;
    }

    .channel-list {
      background: var(--v-panel);
      box-shadow: inset -1px 0 0 var(--v-line-2);
    }
    .channel-content {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--v-bg);
      position: relative;
    }

    /* ── Animated background layer ─────────────────────────── */
    .shell-bg {
      position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
    }
    .shell-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(124,58,237,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124,58,237,.06) 1px, transparent 1px);
      background-size: 60px 60px;
      -webkit-mask-image: radial-gradient(ellipse 70% 60% at 60% 40%, #000 20%, transparent 75%);
      mask-image: radial-gradient(ellipse 70% 60% at 60% 40%, #000 20%, transparent 75%);
      animation: shellGridPan 20s linear infinite;
    }
    @keyframes shellGridPan { from { background-position: 0 0; } to { background-position: 60px 60px; } }

    .shell-orb {
      position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
    }
    .shell-orb.o1 {
      width: 600px; height: 600px; top: -200px; right: -100px;
      background: radial-gradient(circle, rgba(124,58,237,.18) 0%, transparent 65%);
      animation: shellFloat1 22s ease-in-out infinite;
    }
    .shell-orb.o2 {
      width: 400px; height: 400px; bottom: -100px; left: 20%;
      background: radial-gradient(circle, rgba(167,139,250,.12) 0%, transparent 65%);
      animation: shellFloat2 28s ease-in-out infinite;
    }
    .shell-orb.o3 {
      width: 300px; height: 300px; top: 40%; right: 30%;
      background: radial-gradient(circle, rgba(212,175,55,.08) 0%, transparent 65%);
      animation: shellFloat3 18s ease-in-out infinite;
    }
    @keyframes shellFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-60px,80px)} }
    @keyframes shellFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(80px,-60px)} }
    @keyframes shellFloat3 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-40px,50px)} 66%{transform:translate(50px,-30px)} }

    /* Make router outlet sit above the bg layer */
    .channel-content > router-outlet + * { position: relative; z-index: 1; }

    @media (max-width: 768px) {
      .community-shell { grid-template-columns: 60px 1fr; }
      .channel-list    { display: none; }
    }
  `],
})
export class CommunityShellComponent implements OnInit, OnDestroy {
  private readonly state  = inject(CommunityStateService);
  private readonly reverb = inject(ReverbConnectionService);
  private readonly router = inject(Router);

  /** True when the Social Home (Friends + DMs) route is active. */
  readonly isHome = signal(false);

  constructor() {
    const computeHome = () => this.isHome.set(this.router.url.split('?')[0].split('#')[0] === '/community/home');
    computeHome();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(computeHome);

    /**
     * Auto-navigate fix: when the user lands on bare /community (no slug in URL)
     * the <router-outlet> has no child component → blank content area.
     *
     * loadCommunities() selects the global community and its first channel into
     * signals, but the URL stays at /community. This effect watches both signals
     * and navigates to /community/:slug/channel/:channelId as soon as they are
     * set, making the channel view render immediately.
     *
     * replaceUrl:true keeps the browser history clean (no extra back-stack entry).
     */
    effect(() => {
      const community = this.state.activeCommunity();
      const channelId = this.state.activeChannelId();

      if (!community?.slug || !channelId) return;

      // Only redirect when sitting at the bare /community root.
      // Once a slug is in the URL, ChannelViewComponent handles its own routing.
      untracked(() => {
        const url = this.router.url.split('?')[0].split('#')[0];
        const isAtRoot = url === '/community' || url === '/community/';
        if (isAtRoot) {
          this.router.navigate(
            ['/community', community.slug, 'channel', channelId],
            { replaceUrl: true }
          );
        }
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.state.loadCommunities();
    await this.reverb.init();
  }

  ngOnDestroy(): void {
    this.reverb.disconnect();
  }
}
