import {
  ChangeDetectionStrategy, Component, OnInit, inject, signal
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';

interface DawriNotification {
  id: string;
  data: {
    type: string; title: string; body: string; icon: string;
    action_url?: string; action_label?: string; urgent?: boolean;
  };
  read_at: string | null;
  created_at: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="notif-page">
  <div class="notif-page__head">
    <div>
      <div class="eyebrow">Activity</div>
      <h1 class="page-title">Notifications</h1>
    </div>
    @if (unreadCount() > 0) {
      <button class="btn-mark-all" (click)="markAllRead()">
        ✓ Mark all as read ({{ unreadCount() }})
      </button>
    }
  </div>

  <!-- Filter tabs -->
  <div class="notif-tabs">
    @for (tab of tabs; track tab.value) {
      <button class="notif-tab" [class.notif-tab--active]="activeFilter() === tab.value"
              (click)="activeFilter.set(tab.value)">
        {{ tab.label }}
      </button>
    }
  </div>

  <!-- List -->
  @if (loading()) {
    <div class="notif-loading">Loading…</div>
  } @else if (filtered().length === 0) {
    <div class="notif-empty-pg">
      <div class="notif-empty-pg__icon">🔔</div>
      <h3>No notifications here</h3>
      <p>{{ activeFilter() === 'unread' ? 'You\'re all caught up!' : 'Nothing to show yet.' }}</p>
    </div>
  } @else {
    <div class="notif-list-pg">
      @for (n of filtered(); track n.id) {
        <div class="notif-row"
             [class.notif-row--unread]="!n.read_at"
             [class.notif-row--urgent]="n.data.urgent">
          <div class="notif-row__icon">{{ n.data.icon }}</div>
          <div class="notif-row__body">
            <div class="notif-row__title">{{ n.data.title }}</div>
            <div class="notif-row__text">{{ n.data.body }}</div>
            <div class="notif-row__meta">
              <span>{{ n.created_at | date:'EEEE d MMMM · HH:mm' }}</span>
              @if (n.data.action_url) {
                <a [routerLink]="n.data.action_url" class="notif-row__link" (click)="markRead(n)">
                  {{ n.data.action_label || 'View' }} →
                </a>
              }
            </div>
          </div>
          <div class="notif-row__actions">
            @if (!n.read_at) {
              <button class="nr-btn nr-btn--read" (click)="markRead(n)" title="Mark read">✓</button>
            }
            <button class="nr-btn nr-btn--del" (click)="deleteNotif(n)" title="Delete">✕</button>
          </div>
        </div>
      }
    </div>

    @if (hasMore()) {
      <div style="text-align:center;padding:20px">
        <button class="btn-load-more" (click)="loadMore()" [disabled]="loadingMore()">
          {{ loadingMore() ? 'Loading…' : 'Load more notifications' }}
        </button>
      </div>
    }
  }
</div>
  `,
  styles: [`
    .notif-page { max-width: 720px; margin: 0 auto; padding: 32px 24px; }

    .notif-page__head {
      display: flex; align-items: flex-start; justify-content: space-between;
      margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
    }
    .eyebrow {
      font-family: var(--mono); font-size: 10px; letter-spacing: 2px;
      text-transform: uppercase; color: var(--accent, #f0a500); margin-bottom: 4px;
    }
    .page-title { font-family: var(--display); font-size: 36px; margin: 0; color: #fff; }
    .btn-mark-all {
      padding: 10px 16px; background: rgba(240,165,0,.1); border: 1px solid rgba(240,165,0,.3);
      border-radius: 8px; color: var(--accent, #f0a500); font-size: 13px; font-weight: 700;
      cursor: pointer; transition: all .15s;
      &:hover { background: rgba(240,165,0,.2); }
    }

    /* Filter tabs */
    .notif-tabs {
      display: flex; gap: 4px; margin-bottom: 20px;
      padding: 4px; background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.08); border-radius: 10px;
      width: fit-content;
    }
    .notif-tab {
      padding: 7px 16px; font-size: 12px; font-family: var(--mono);
      letter-spacing: .5px; border: none; background: transparent;
      color: #6b7280; border-radius: 7px; cursor: pointer; transition: all .15s;
    }
    .notif-tab--active { background: rgba(255,255,255,.1); color: #fff; font-weight: 700; }
    .notif-tab:hover:not(.notif-tab--active) { color: #d1d5db; }

    .notif-loading { text-align: center; padding: 40px; color: #6b7280; }

    /* Empty state */
    .notif-empty-pg { text-align: center; padding: 60px 20px; color: #6b7280; }
    .notif-empty-pg__icon { font-size: 3rem; opacity: .4; margin-bottom: 12px; }
    .notif-empty-pg h3 { font-size: 18px; color: #9ca3af; margin: 0 0 8px; }
    .notif-empty-pg p { font-size: 14px; margin: 0; }

    /* Notification rows */
    .notif-list-pg { display: flex; flex-direction: column; gap: 8px; }
    .notif-row {
      display: grid; grid-template-columns: 48px 1fr auto;
      gap: 14px; padding: 16px;
      background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
      border-radius: 12px; transition: border-color .15s;
    }
    .notif-row:hover { border-color: rgba(255,255,255,.14); }
    .notif-row--unread { background: rgba(240,165,0,.05); border-left: 3px solid var(--accent, #f0a500); }
    .notif-row--urgent { border-left: 3px solid #ef4444 !important; background: rgba(239,68,68,.04); }
    .notif-row__icon {
      width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,.07);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .notif-row__body { min-width: 0; }
    .notif-row__title { font-weight: 700; font-size: 14px; color: #fff; margin-bottom: 4px; }
    .notif-row__text { font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 8px; }
    .notif-row__meta {
      display: flex; align-items: center; gap: 12px;
      font-size: 11px; color: #4b5563; font-family: monospace;
    }
    .notif-row__link {
      color: var(--accent, #f0a500); font-weight: 700; text-decoration: none;
      &:hover { text-decoration: underline; }
    }
    .notif-row__actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
    .nr-btn {
      padding: 5px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,.1);
      background: transparent; font-size: 12px; cursor: pointer; transition: all .15s;
    }
    .nr-btn--read { color: #10b981; border-color: rgba(16,185,129,.2); }
    .nr-btn--read:hover { background: rgba(16,185,129,.1); }
    .nr-btn--del  { color: #6b7280; }
    .nr-btn--del:hover { color: #ef4444; border-color: rgba(239,68,68,.3); background: rgba(239,68,68,.08); }

    .btn-load-more {
      padding: 10px 24px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12);
      border-radius: 8px; color: #9ca3af; font-size: 13px; cursor: pointer; transition: all .15s;
      &:hover:not(:disabled) { background: rgba(255,255,255,.1); color: #fff; }
      &:disabled { opacity: .5; cursor: not-allowed; }
    }
  `]
})
export class NotificationsComponent implements OnInit {
  private api  = inject(ApiService);
  private auth = inject(AuthService);

  readonly loading      = signal(true);
  readonly loadingMore  = signal(false);
  readonly notifications = signal<DawriNotification[]>([]);
  readonly unreadCount  = signal(0);
  readonly hasMore      = signal(false);
  readonly activeFilter = signal<'all' | 'unread' | 'urgent'>('all');

  readonly tabs = [
    { label: 'All',    value: 'all'    as const },
    { label: 'Unread', value: 'unread' as const },
    { label: 'Urgent', value: 'urgent' as const },
  ];

  readonly filtered = () => {
    const f = this.activeFilter();
    return this.notifications().filter(n => {
      if (f === 'unread') return !n.read_at;
      if (f === 'urgent') return n.data.urgent;
      return true;
    });
  };

  private page = 1;

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) return;
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
}
