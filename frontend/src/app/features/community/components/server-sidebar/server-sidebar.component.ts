/**
 * Sprint 15 — Far-left rail of server icons, redesigned for the Arena look:
 * squared-then-rounded bubbles, a lime active ring, and a gold ring for the
 * global Dawri Community. An active item also shows a lime pill on the rail
 * edge (Discord-style selection indicator).
 */
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommunityStateService } from '../../services/community-state.service';
import { FriendService } from '../../../../core/services/friend.service';
import { DmService } from '../../../social/dm.service';

@Component({
  selector: 'app-server-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
      <!-- Home: Friends + Direct Messages -->
      <a routerLink="/community/home" routerLinkActive="active" class="home-link" title="Dawri Connect+ — Friends, Messages & Challenges">
        <span class="pill"></span>
        <div class="bubble bubble--home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        @if (socialAlerts() > 0) { <span class="home-badge">{{ socialAlerts() }}</span> }
      </a>
      <div class="rail-divider" aria-hidden="true"></div>

      <a *ngFor="let c of communities()"
         [routerLink]="['/community', c.slug]"
         [class.active]="c.id === activeId()"
         [title]="c.name">
        <span class="pill"></span>
        <div class="bubble" [class.global]="c.type === 'global'">
          <img *ngIf="c.icon_url" [src]="c.icon_url" [alt]="c.name" />
          <span *ngIf="!c.icon_url">{{ initials(c.name) }}</span>
        </div>
      </a>
    </nav>
  `,
  styles: [`
    :host {
      --accent:   #7c3aed;
      --accent-s: #a78bfa;
      --gold:     #d4af37;
      --surface:  #1c1833;
      --text:     #eaeaf2;
    }
    nav { display: flex; flex-direction: column; align-items: center; padding: 1rem 0; gap: 0.65rem; }
    a   { text-decoration: none; position: relative; display: grid; place-items: center; }

    /* Selection pill on the rail edge */
    .pill {
      position: absolute; left: -14px; top: 50%; transform: translateY(-50%) scaleY(0);
      width: 4px; height: 28px; border-radius: 0 4px 4px 0; background: var(--accent-s);
      transition: transform 0.18s ease;
    }
    a:hover .pill { transform: translateY(-50%) scaleY(0.5); background: var(--text); }
    a.active .pill { transform: translateY(-50%) scaleY(1); background: var(--accent-s); }

    @keyframes bubbleIn { 0%{transform:scale(.8);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
    @keyframes pillExpand { from{transform:translateY(-50%) scaleY(0)} 60%{transform:translateY(-50%) scaleY(1.15)} to{transform:translateY(-50%) scaleY(1)} }

    .bubble {
      width: 50px; height: 50px;
      border-radius: 16px;
      background: var(--surface);
      display: grid; place-items: center;
      color: var(--text);
      font-family: 'Anton', 'Bebas Neue', sans-serif;
      font-size: 1.05rem; letter-spacing: 0.04em;
      transition: border-radius 0.22s cubic-bezier(.34,1.56,.64,1),
                  box-shadow 0.22s ease,
                  transform 0.22s cubic-bezier(.34,1.56,.64,1),
                  background 0.18s ease;
      cursor: pointer;
    }
    .bubble:hover {
      border-radius: 12px;
      transform: translateY(-3px) scale(1.06);
      box-shadow: 0 0 0 2px rgba(167,139,250,0.6), 0 6px 20px rgba(124,58,237,0.35);
    }
    .bubble.global { background: #1a1710; color: var(--gold); box-shadow: inset 0 0 0 1px rgba(212,175,55,0.4); }

    /* Home (Friends + DMs) button */
    .home-link { position: relative; }
    .bubble--home { background: #14211a; color: #4ade80; box-shadow: inset 0 0 0 1px rgba(0,108,53,.5); }
    .home-link.active .bubble--home { border-radius: 12px; box-shadow: 0 0 0 2.5px #006c35, 0 0 20px rgba(0,108,53,.5); }
    .home-link:hover .bubble--home { box-shadow: 0 0 0 2px rgba(74,222,128,.6), 0 6px 20px rgba(0,108,53,.35); }
    .home-badge {
      position: absolute; top: -2px; right: -2px; min-width: 18px; height: 18px; padding: 0 5px;
      border-radius: 100px; background: #ef4444; color: #fff; border: 2px solid #0d0a18;
      font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 700;
      display: grid; place-items: center; line-height: 1;
    }
    .rail-divider { width: 32px; height: 2px; border-radius: 2px; background: rgba(255,255,255,.1); margin: 2px 0; }
    .active .bubble {
      border-radius: 12px;
      box-shadow: 0 0 0 2.5px var(--accent-s), 0 0 24px rgba(124,58,237,0.5);
      animation: bubbleIn .35s cubic-bezier(.34,1.56,.64,1) both;
    }
    .active .bubble.global { box-shadow: 0 0 0 2.5px var(--gold), 0 0 20px rgba(212,175,55,0.4); }
    .active .pill { animation: pillExpand .3s cubic-bezier(.34,1.56,.64,1) both; }
    img { width: 100%; height: 100%; border-radius: inherit; object-fit: cover; }
  `],
})
export class ServerSidebarComponent {
  private readonly state = inject(CommunityStateService);
  readonly friends = inject(FriendService);
  readonly dm      = inject(DmService);
  readonly communities = this.state.communities;
  readonly activeId    = this.state.activeCommunityId;

  /** Combined friend-request + unread-DM count for the Home badge. */
  readonly socialAlerts = computed(() => this.friends.requestCount() + this.dm.unread());

  constructor() {
    if (!this.friends.loaded()) this.friends.load();
    this.dm.loadUnread();
  }

  initials(name: string): string {
    return name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  }
}
