import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export type Presence = 'online' | 'idle' | 'offline';
export type Relationship =
  | 'self' | 'none' | 'friends' | 'pending_outgoing' | 'pending_incoming';

export interface FriendUser {
  id: string;
  name: string;
  nickname: string | null;
  display_name: string;
  avatar_url: string | null;
}

export interface FriendRequestRow {
  friendship_id: string;
  created_at: string;
  user: FriendUser;
}

/**
 * FriendService — the social friends graph.
 *
 * Holds friend / incoming-request / sent-request state as signals so any
 * component (member list, friends page, future DM/challenge UIs) can read
 * a member's relationship synchronously and stay in sync after mutations.
 */
@Injectable({ providedIn: 'root' })
export class FriendService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private base = environment.apiUrl + '/friends';

  readonly friends  = signal<FriendUser[]>([]);
  readonly requests = signal<FriendRequestRow[]>([]);   // incoming (awaiting me)
  readonly sent     = signal<FriendRequestRow[]>([]);   // outgoing (awaiting them)
  readonly presence = signal<Record<string, Presence>>({});
  readonly loading  = signal(false);
  readonly loaded   = signal(false);

  readonly friendIds   = computed(() => new Set(this.friends().map(f => f.id)));
  readonly sentIds     = computed(() => new Set(this.sent().map(r => r.user.id)));
  readonly incomingIds = computed(() => new Set(this.requests().map(r => r.user.id)));
  readonly requestCount = computed(() => this.requests().length);

  /** Load all three lists in one pass. Safe to call repeatedly. */
  load(): void {
    if (this.loading()) return;
    this.loading.set(true);
    forkJoin({
      friends:  this.http.get<{ data: FriendUser[]; presence: Record<string, Presence> }>(this.base),
      requests: this.http.get<{ data: FriendRequestRow[] }>(`${this.base}/requests`),
      sent:     this.http.get<{ data: FriendRequestRow[] }>(`${this.base}/sent`),
    }).subscribe({
      next: (r) => {
        this.friends.set(r.friends.data ?? []);
        this.presence.set(r.friends.presence ?? {});
        this.requests.set(r.requests.data ?? []);
        this.sent.set(r.sent.data ?? []);
        this.loading.set(false);
        this.loaded.set(true);
      },
      error: () => { this.loading.set(false); this.loaded.set(true); },
    });
  }

  /** Relationship with a user, resolved from local signals. */
  relationshipWith(userId: string): Relationship {
    if (userId === this.auth.currentUser()?.id) return 'self';
    if (this.friendIds().has(userId))   return 'friends';
    if (this.sentIds().has(userId))     return 'pending_outgoing';
    if (this.incomingIds().has(userId)) return 'pending_incoming';
    return 'none';
  }

  /**
   * Send a friend request. Pass the target user so we can optimistically
   * reflect the new "pending"/"friends" state without a full reload.
   */
  sendRequest(user: FriendUser): Observable<{ status: string; friendship_id: string }> {
    return this.http.post<{ status: string; friendship_id: string }>(this.base, { user_id: user.id }).pipe(
      tap((res) => {
        if (res.status === 'friends') {
          // Mutual intent — they'd already requested us.
          this.requests.update(list => list.filter(r => r.user.id !== user.id));
          this.friends.update(list => [user, ...list.filter(f => f.id !== user.id)]);
        } else {
          this.sent.update(list =>
            list.some(r => r.user.id === user.id)
              ? list
              : [{ friendship_id: res.friendship_id, created_at: new Date().toISOString(), user }, ...list]);
        }
      }),
    );
  }

  /** Accept an incoming request; moves it into the friends list. */
  accept(req: FriendRequestRow): Observable<unknown> {
    return this.http.post(`${this.base}/${req.friendship_id}/accept`, {}).pipe(
      tap(() => {
        this.requests.update(list => list.filter(r => r.friendship_id !== req.friendship_id));
        this.friends.update(list => [req.user, ...list.filter(f => f.id !== req.user.id)]);
      }),
    );
  }

  /** Decline an incoming request. */
  decline(req: FriendRequestRow): Observable<unknown> {
    return this.http.post(`${this.base}/${req.friendship_id}/decline`, {}).pipe(
      tap(() => this.requests.update(list => list.filter(r => r.friendship_id !== req.friendship_id))),
    );
  }

  /** Remove a friend OR cancel a sent request (by the other user's id). */
  remove(userId: string): Observable<unknown> {
    return this.http.delete(`${this.base}/${userId}`).pipe(
      tap(() => {
        this.friends.update(list => list.filter(f => f.id !== userId));
        this.sent.update(list => list.filter(r => r.user.id !== userId));
      }),
    );
  }

  presenceOf(userId: string): Presence {
    return this.presence()[userId] ?? 'offline';
  }
}
