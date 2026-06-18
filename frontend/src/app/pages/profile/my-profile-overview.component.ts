import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlayerProfileViewComponent } from '../../features/profile/player-profile-view.component';

/**
 * /profile — the user's own gaming-focused overview.
 *
 * Wraps the unified PlayerProfileView in self mode (shows the Edit Gaming
 * IDs modal). Account-level edits (name, bio, country, avatar) live on
 * /profile/account for separation of concerns.
 */
@Component({
  selector: 'dw-my-profile-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, PlayerProfileViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mpv-shell">
      <div class="mpv-account">
        <a routerLink="/profile/account" class="mpv-account__link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Account settings
        </a>
      </div>
      <app-player-profile-view mode="self" />
    </div>
  `,
  styles: [`
    :host { display: block; }
    .mpv-shell { position: relative; }
    .mpv-account { display: flex; justify-content: flex-end; max-width: 980px; margin: 0 auto; padding: 12px 1.5rem 0; }
    .mpv-account__link {
      display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px;
      font-size: 12px; color: var(--mu, #8a8aa0); text-decoration: none;
      border: 1px solid var(--br, rgba(255,255,255,.08)); border-radius: 8px;
      background: var(--bg2, #10101c); transition: border-color .15s, color .15s;
    }
    .mpv-account__link:hover { color: var(--text, #ececf1); border-color: var(--br2, rgba(255,255,255,.14)); }
  `],
})
export class MyProfileOverviewComponent {}
