import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FriendsPageComponent } from './friends-page.component';
import { MessagesPageComponent } from './messages-page.component';
import { ChallengesPageComponent } from './challenges-page.component';
import { DmService } from './dm.service';
import { FriendService } from '../../core/services/friend.service';
import { ChallengeService } from './challenge.service';

type Pane = 'friends' | 'messages' | 'challenges';

/**
 * SocialHomeComponent — the "Home" view of the community shell.
 *
 * Merges Friends and Direct Messages into the community page (Discord
 * style). The shell hides the channel list on this route and renders this
 * in the main area. A compact switch flips between the Friends and
 * Messages panes; each reuses the existing standalone page component.
 */
@Component({
  selector: 'app-social-home',
  standalone: true,
  imports: [CommonModule, FriendsPageComponent, MessagesPageComponent, ChallengesPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="social-home">
      <div class="sh-switch">
        <div class="sh-brand">
          <svg class="sh-brand__mark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
          Dawri <span>Connect</span><em>+</em>
        </div>
        <div class="sh-tabs">
        <button [class.active]="pane() === 'friends'" (click)="setPane('friends')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Friends
          @if (friends.requestCount() > 0) { <span class="sh-badge">{{ friends.requestCount() }}</span> }
        </button>
        <button [class.active]="pane() === 'messages'" (click)="setPane('messages')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Messages
          @if (dm.unread() > 0) { <span class="sh-badge sh-badge--blue">{{ dm.unread() }}</span> }
        </button>
        <button [class.active]="pane() === 'challenges'" (click)="setPane('challenges')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          Challenges
          @if (cs.alertCount() > 0) { <span class="sh-badge">{{ cs.alertCount() }}</span> }
        </button>
        </div>
      </div>

      <div class="sh-body" [class.sh-body--chat]="pane() === 'messages'">
        @if (pane() === 'friends') {
          <app-friends-page />
        } @else if (pane() === 'messages') {
          <app-messages-page [embedded]="true" />
        } @else {
          <app-challenges-page [embedded]="true" />
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; height: 100%; min-height: 0; }
    .social-home { height: 100%; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }

    .sh-switch {
      display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 16px;
      border-bottom: 1px solid var(--br, rgba(255,255,255,.08));
      flex-shrink: 0; flex-wrap: wrap;
    }
    .sh-tabs { display: flex; gap: 4px; }
    .sh-brand {
      display: inline-flex; align-items: center; gap: 7px;
      font-family: var(--fh, 'Anton', sans-serif); font-size: 17px; letter-spacing: 1px; text-transform: uppercase;
      color: var(--text, #ececf1);
      span { color: var(--accent, #d4af37); }
      em { font-style: normal; color: var(--primary, #4ade80); margin-left: 1px; }
    }
    .sh-brand__mark { color: var(--accent, #d4af37); flex-shrink: 0; }
    .sh-switch button {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 9px 16px; border-radius: 9px; border: none; cursor: pointer;
      background: transparent; color: var(--mu, #8a8aa0);
      font-family: var(--fb, sans-serif); font-weight: 700; font-size: 13.5px;
      transition: background .15s, color .15s;
    }
    .sh-switch button:hover { color: var(--text, #ececf1); background: rgba(255,255,255,.04); }
    .sh-switch button.active { color: #fff; background: var(--primary, #006c35); }

    .sh-badge {
      display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 5px;
      border-radius: 100px; background: #ef4444; color: #fff;
      font-family: var(--fm, monospace); font-size: 0.62rem; font-weight: 700; line-height: 1;
    }
    .sh-switch button.active .sh-badge { background: rgba(255,255,255,.25); }
    .sh-badge--blue { background: #2e8bff; }

    .sh-body { flex: 1; min-height: 0; overflow-y: auto; }
    /* Messages manages its own internal scroll + height. */
    .sh-body--chat { overflow: hidden; }
  `],
})
export class SocialHomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  readonly dm = inject(DmService);
  readonly friends = inject(FriendService);
  readonly cs = inject(ChallengeService);
  readonly pane = signal<Pane>('friends');

  ngOnInit(): void {
    if (!this.friends.loaded()) this.friends.load();
    this.dm.loadUnread();
    if (!this.cs.loaded()) this.cs.load();
    // React to ?pane= so nav deep-links switch panes without remounting.
    // A missing param leaves the current pane untouched (Home button default).
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(p => {
      const v = p.get('pane');
      if (v === 'messages' || v === 'friends' || v === 'challenges') this.pane.set(v);
    });
  }

  setPane(p: Pane): void { this.pane.set(p); }
}
