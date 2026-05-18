import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
  inject, signal, computed, HostListener
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { interval, Subscription } from 'rxjs';
import { catchError, of } from 'rxjs';

interface DawriNotification {
  id: string;
  data: {
    type: string;
    title: string;
    body: string;
    icon: string;
    action_url?: string;
    action_label?: string;
    urgent?: boolean;
    tournament_id?: string;
  };
  read_at: string | null;
  created_at: string;
}

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="notif-bell" [class.notif-bell--open]="open()">

  <!-- Bell button -->
  <button class="bell-btn" (click)="toggleOpen()" [attr.aria-label]="'Notifications' + (unreadCount() > 0 ? ' (' + unreadCount() + ' unread)' : '')">
    <svg class="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
    @if (unreadCount() > 0) {
      <span class="bell-badge">{{ unreadCount() > 99 ? '99+' : unreadCount() }}</span>
    }
  </button>

  <!-- Dropdown -->
  @if (open()) {
    <div class="notif-dropdown" (click)="$event.stopPropagation()">
      <div class="notif-header">
        <span class="notif-header__title">Notifications</span>
        @if (unreadCount() > 0) {
          <button class="notif-header__markall" (click)="markAllRead()">Mark all read</button>
        }
      </div>

      @if (loading()) {
        <div class="notif-empty">
          <div class="notif-spinner"></div>
        </div>
      } @else if (notifications().length === 0) {
        <div class="notif-empty">
          <span class="notif-empty__icon">🔔</span>
          <p>You're all caught up!</p>
        </div>
      } @else {
        <div class="notif-list">
          @for (n of notifications(); track n.id) {
            <div class="notif-item"
                 [class.notif-item--unread]="!n.read_at"
                 [class.notif-item--urgent]="n.data.urgent">
              <div class="notif-item__icon">{{ n.data.icon }}</div>
              <div class="notif-item__body">
                <div class="notif-item__title">{{ n.data.title }}</div>
                <div class="notif-item__text">{{ n.data.body }}</div>
                <div class="notif-item__meta">
                  {{ n.created_at | date:'d MMM · HH:mm' }}
                  @if (n.data.action_url) {
                    <a class="notif-item__action" [routerLink]="n.data.action_url" (click)="markRead(n); open.set(false)">
                      {{ n.data.action_label || 'View' }} →
                    </a>
                  }
                </div>
              </div>
              <div class="notif-item__actions">
                @if (!n.read_at) {
                  <button class="notif-item__read-btn" (click)="markRead(n)" title="Mark as read">●</button>
                }
                <button class="notif-item__del-btn" (click)="deleteNotif(n)" title="Delete">✕</button>
              </div>
            </div>
          }
        </div>

        @if (hasMore()) {
          <div class="notif-load-more">
            <button (click)="loadMore()" [disabled]="loadingMore()">
              {{ loadingMore() ? 'Loading…' : 'Load more' }}
            </button>
          </div>
        }
      }
    </div>
  }
</div>
  `,
  styles: [`
    .notif-bell { position: relative; display: inline-flex; }

    /* Bell button */
    .bell-btn {
      position: relative; background: none; border: none;
      color: var(--text-dim, #9ca3af); cursor: pointer;
      padding: 8px; border-radius: 8px;
      transition: color .15s, background .15s;
      display: flex; align-items: center; justify-content: center;

    }
    .bell-icon { width: 20px; height: 20px; }
    .bell-badge {
      position: absolute; top: 2px; right: 2px;
      min-width: 16px; height: 16px; padding: 0 4px;
      background: #ef4444; color: #fff;
      font-size: 9px; font-weight: 900; font-family: monospace;
      border-radius: 8px; display: flex; align-items: center; justify-content: center;
      border: 2px solid var(--bg, #0b1022);
      animation: bell-pop .3s ease;
    }
    @keyframes bell-pop {
      0%   { transform: scale(0); }
      70%  { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    /* Dropdown */
    .notif-dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      width: 360px; max-height: 480px;
      background: #111827; border: 1px solid rgba(255,255,255,.1);
      border-radius: 14px; box-shadow: 0 20px 60px rgba(0,0,0,.6);
      display: flex; flex-direction: column; overflow: hidden;
      z-index: 9999;
      animation: drop-in .2s ease;
    }
    @keyframes drop-in {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: none; }
    }

    /* Header */
    .notif-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px 12px;
      border-bottom: 1px solid rgba(255,255,255,.07);
      flex-shrink: 0;
    }
    .notif-header__title {
      font-weight: 700; font-size: 14px; color: #fff;
    }
    .notif-header__markall {
      font-size: 11px; color: var(--accent, #f0a500);
      background: none; border: none; cursor: pointer;
      font-family: monospace; letter-spacing: .5px;
    }
    .notif-header__markall:hover { text-decoration: underline; }

    /* Empty state */
    .notif-empty {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 40px 20px; gap: 10px;
      color: #4b5563;
    }
    .notif-empty__icon { font-size: 2rem; opacity: .4; }
    .notif-empty p { font-size: 13px; margin: 0; }
    .notif-spinner {
      width: 24px; height: 24px; border: 2px solid rgba(255,255,255,.1);
      border-top-color: var(--accent, #f0a500); border-radius: 50%;
      animation: spin .8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Notification list */
    .notif-list { overflow-y: auto; flex: 1; }
    .notif-item {
      display: grid; grid-template-columns: 36px 1fr auto;
      gap: 10px; padding: 12px 14px;
      border-bottom: 1px solid rgba(255,255,255,.05);
      transition: background .15s;
    }
    .notif-item:hover { background: rgba(255,255,255,.03); }
    .notif-item--unread { background: rgba(240,165,0,.04); border-left: 3px solid var(--accent, #f0a500); }
    .notif-item--urgent { border-left: 3px solid #ef4444 !important; }
    .notif-item--unread { background: rgba(240,165,0,.04); border-left: 3px solid var(--accent, #f0a500); }
    .notif-item--urgent { border-left: 3px solid #ef4444 !important; }
    .notif-item__icon {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,.07); display: flex;
      align-items: center; justify-content: center; font-size: 16px;
      flex-shrink: 0;
    }
    .notif-item__body { min-width: 0; }
    .notif-item__title {
      font-size: 13px; font-weight: 600; color: #fff;
      line-height: 1.3; margin-bottom: 3px;
    }
    .notif-item__text {
      font-size: 12px; color: #6b7280; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .notif-item__meta {
      display: flex; align-items: center; gap: 10px;
      margin-top: 5px; font-size: 10px; color: #4b5563;
      font-family: monospace;
    }
    .notif-item__action { color: var(--accent, #f0a500); text-decoration: none; font-weight: 700; }
    .notif-item__action:hover { text-decoration: underline; }
    .notif-item__actions {
      display: flex; flex-direction: column; gap: 4px; flex-shrink: 0;
    }
    .notif-item__read-btn, .notif-item__del-btn {
      background: none; border: none; cursor: pointer;
      font-size: 12px; color: #4b5563; padding: 2px 4px;
      border-radius: 4px; transition: all .15s;
    }
    .notif-item__read-btn { color: var(--accent, #f0a500); }
    .notif-item__read-btn:hover { background: rgba(240,165,0,.1); }
    .notif-item__del-btn:hover { color: #ef4444; background: rgba(239,68,68,.1); }

    /* Load more */
    .notif-load-more { padding: 10px; text-align: center; border-top: 1px solid rgba(255,255,255,.07); }
    .notif-load-more button {
      font-size: 12px; color: #6b7280; background: none; border: none;
      cursor: pointer; font-family: monospace;
    }
    .notif-load-more button:hover:not(:disabled) { color: var(--accent, #f0a500); }
    .notif-load-more button:disabled { opacity: .5; cursor: not-allowed; }

    @media (max-width: 420px) {
      .notif-dropdown { width: calc(100vw - 16px); right: -8px; }
    }
  `]
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  private api  = inject(ApiService);
  private auth = inject(AuthService);

  readonly open          = signal(false);
  readonly loading       = signal(false);
  readonly loadingMore   = signal(false);
  readonly unreadCount   = signal(0);
  readonly notifications = signal<DawriNotification[]>([]);
  readonly hasMore       = signal(false);

  private page        = 1;
  private pollSub?: Subscription;

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) return;
    this.fetchUnreadCount();
    // Poll every 30 seconds
    this.pollSub = interval(30_000).subscribe(() => this.fetchUnreadCount());
  }

  ngOnDestroy(): void { this.pollSub?.unsubscribe(); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('app-notification-bell')) this.open.set(false);
  }

  toggleOpen(): void {
    const next = !this.open();
    this.open.set(next);
    if (next && this.notifications().length === 0) this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.page = 1;
    this.api.getNotifications(1).pipe(catchError(() => of(null))).subscribe(r => {
      if (r) {
        this.notifications.set(r.data ?? []);
        this.unreadCount.set(r.meta?.unread_count ?? 0);
        this.hasMore.set(r.meta?.current_page < r.meta?.last_page);
      }
      this.loading.set(false);
    });
  }

  loadMore(): void {
    this.loadingMore.set(true);
    this.api.getNotifications(++this.page).pipe(catchError(() => of(null))).subscribe(r => {
      if (r) {
        this.notifications.update(n => [...n, ...(r.data ?? [])]);
        this.hasMore.set(r.meta?.current_page < r.meta?.last_page);
      }
      this.loadingMore.set(false);
    });
  }

  markRead(n: DawriNotification): void {
    if (n.read_at) return;
    n.read_at = new Date().toISOString();
    this.notifications.update(ns => [...ns]);
    this.unreadCount.update(c => Math.max(0, c - 1));
    this.api.markNotificationRead(n.id).pipe(catchError(() => of(null))).subscribe();
  }

  markAllRead(): void {
    this.notifications.update(ns => ns.map(n => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
    this.unreadCount.set(0);
    this.api.markAllNotificationsRead().pipe(catchError(() => of(null))).subscribe();
  }

  deleteNotif(n: DawriNotification): void {
    this.notifications.update(ns => ns.filter(x => x.id !== n.id));
    if (!n.read_at) this.unreadCount.update(c => Math.max(0, c - 1));
    this.api.deleteNotification(n.id).pipe(catchError(() => of(null))).subscribe();
  }

  private fetchUnreadCount(): void {
    this.api.getUnreadCount().pipe(catchError(() => of({ count: 0 }))).subscribe(r => {
      this.unreadCount.set(r.count ?? 0);
    });
  }
}
