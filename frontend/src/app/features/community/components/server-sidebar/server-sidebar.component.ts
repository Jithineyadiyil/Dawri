/**
 * Sprint 15 — Far-left rail of server icons, redesigned for the Arena look:
 * squared-then-rounded bubbles, a lime active ring, and a gold ring for the
 * global Dawri Community. An active item also shows a lime pill on the rail
 * edge (Discord-style selection indicator).
 */
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommunityStateService } from '../../services/community-state.service';

@Component({
  selector: 'app-server-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
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
      --accent: #00ffa3;
      --gold:   #d4af37;
      --surface:#1b1b27;
      --text:   #eaeaf2;
    }
    nav { display: flex; flex-direction: column; align-items: center; padding: 1rem 0; gap: 0.65rem; }
    a   { text-decoration: none; position: relative; display: grid; place-items: center; }

    /* Selection pill on the rail edge */
    .pill {
      position: absolute; left: -14px; top: 50%; transform: translateY(-50%) scaleY(0);
      width: 4px; height: 28px; border-radius: 0 4px 4px 0; background: var(--accent);
      transition: transform 0.18s ease;
    }
    a:hover .pill { transform: translateY(-50%) scaleY(0.5); background: var(--text); }
    a.active .pill { transform: translateY(-50%) scaleY(1); background: var(--accent); }

    .bubble {
      width: 50px; height: 50px;
      border-radius: 16px;
      background: var(--surface);
      display: grid; place-items: center;
      color: var(--text);
      font-family: 'Anton', 'Bebas Neue', sans-serif;
      font-size: 1.05rem; letter-spacing: 0.04em;
      transition: border-radius 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
      cursor: pointer;
    }
    .bubble:hover { border-radius: 14px; transform: translateY(-1px); box-shadow: 0 0 0 2px rgba(0,255,163,0.4), 0 0 16px rgba(0,255,163,0.25); }
    .bubble.global { background: #1a1710; color: var(--gold); box-shadow: inset 0 0 0 1px rgba(212,175,55,0.4); }
    .active .bubble { border-radius: 14px; box-shadow: 0 0 0 2px var(--accent), 0 0 18px rgba(0,255,163,0.35); }
    .active .bubble.global { box-shadow: 0 0 0 2px var(--gold), 0 0 18px rgba(212,175,55,0.35); }
    img { width: 100%; height: 100%; border-radius: inherit; object-fit: cover; }
  `],
})
export class ServerSidebarComponent {
  private readonly state = inject(CommunityStateService);
  readonly communities = this.state.communities;
  readonly activeId    = this.state.activeCommunityId;

  initials(name: string): string {
    return name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  }
}
