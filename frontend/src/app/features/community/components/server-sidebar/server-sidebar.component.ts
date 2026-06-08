/**
 * Sprint 15 — Far-left rail of server icons (Discord style).
 * Shows the Dawri Community icon + per-tournament rooms the user belongs to.
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
        <div class="bubble" [class.global]="c.type === 'global'">
          <img *ngIf="c.icon_url" [src]="c.icon_url" [alt]="c.name" />
          <span *ngIf="!c.icon_url">{{ initials(c.name) }}</span>
        </div>
      </a>
    </nav>
  `,
  styles: [`
    nav { display: flex; flex-direction: column; align-items: center; padding: 0.75rem 0; gap: 0.5rem; }
    a   { text-decoration: none; }
    .bubble {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #1a1f3a;
      display: grid; place-items: center;
      color: #e6e8f5;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.1rem;
      transition: border-radius 0.15s ease, background 0.15s ease;
      cursor: pointer;
    }
    .bubble:hover { border-radius: 16px; background: var(--cyan, #00e5ff); color: #060810; }
    .bubble.global { background: var(--gold, #f0a500); color: #060810; }
    .active .bubble { border-radius: 16px; box-shadow: 0 0 0 2px var(--cyan, #00e5ff); }
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
