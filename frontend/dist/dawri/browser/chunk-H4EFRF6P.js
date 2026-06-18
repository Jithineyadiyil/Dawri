import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  HttpClient,
  computed,
  forkJoin,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/core/services/friend.service.ts
var FriendService = class _FriendService {
  constructor() {
    this.http = inject(HttpClient);
    this.auth = inject(AuthService);
    this.base = environment.apiUrl + "/friends";
    this.friends = signal([]);
    this.requests = signal([]);
    this.sent = signal([]);
    this.presence = signal({});
    this.loading = signal(false);
    this.loaded = signal(false);
    this.friendIds = computed(() => new Set(this.friends().map((f) => f.id)));
    this.sentIds = computed(() => new Set(this.sent().map((r) => r.user.id)));
    this.incomingIds = computed(() => new Set(this.requests().map((r) => r.user.id)));
    this.requestCount = computed(() => this.requests().length);
  }
  /** Load all three lists in one pass. Safe to call repeatedly. */
  load() {
    if (this.loading())
      return;
    this.loading.set(true);
    forkJoin({
      friends: this.http.get(this.base),
      requests: this.http.get(`${this.base}/requests`),
      sent: this.http.get(`${this.base}/sent`)
    }).subscribe({
      next: (r) => {
        this.friends.set(r.friends.data ?? []);
        this.presence.set(r.friends.presence ?? {});
        this.requests.set(r.requests.data ?? []);
        this.sent.set(r.sent.data ?? []);
        this.loading.set(false);
        this.loaded.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.loaded.set(true);
      }
    });
  }
  /** Relationship with a user, resolved from local signals. */
  relationshipWith(userId) {
    if (userId === this.auth.currentUser()?.id)
      return "self";
    if (this.friendIds().has(userId))
      return "friends";
    if (this.sentIds().has(userId))
      return "pending_outgoing";
    if (this.incomingIds().has(userId))
      return "pending_incoming";
    return "none";
  }
  /**
   * Send a friend request. Pass the target user so we can optimistically
   * reflect the new "pending"/"friends" state without a full reload.
   */
  sendRequest(user) {
    return this.http.post(this.base, { user_id: user.id }).pipe(tap((res) => {
      if (res.status === "friends") {
        this.requests.update((list) => list.filter((r) => r.user.id !== user.id));
        this.friends.update((list) => [user, ...list.filter((f) => f.id !== user.id)]);
      } else {
        this.sent.update((list) => list.some((r) => r.user.id === user.id) ? list : [{ friendship_id: res.friendship_id, created_at: (/* @__PURE__ */ new Date()).toISOString(), user }, ...list]);
      }
    }));
  }
  /** Accept an incoming request; moves it into the friends list. */
  accept(req) {
    return this.http.post(`${this.base}/${req.friendship_id}/accept`, {}).pipe(tap(() => {
      this.requests.update((list) => list.filter((r) => r.friendship_id !== req.friendship_id));
      this.friends.update((list) => [req.user, ...list.filter((f) => f.id !== req.user.id)]);
    }));
  }
  /** Decline an incoming request. */
  decline(req) {
    return this.http.post(`${this.base}/${req.friendship_id}/decline`, {}).pipe(tap(() => this.requests.update((list) => list.filter((r) => r.friendship_id !== req.friendship_id))));
  }
  /** Remove a friend OR cancel a sent request (by the other user's id). */
  remove(userId) {
    return this.http.delete(`${this.base}/${userId}`).pipe(tap(() => {
      this.friends.update((list) => list.filter((f) => f.id !== userId));
      this.sent.update((list) => list.filter((r) => r.user.id !== userId));
    }));
  }
  presenceOf(userId) {
    return this.presence()[userId] ?? "offline";
  }
  static {
    this.\u0275fac = function FriendService_Factory(t) {
      return new (t || _FriendService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FriendService, factory: _FriendService.\u0275fac, providedIn: "root" });
  }
};

export {
  FriendService
};
//# sourceMappingURL=chunk-H4EFRF6P.js.map
