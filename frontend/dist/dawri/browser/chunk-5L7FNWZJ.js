import {
  CommunityStateService
} from "./chunk-QBAOKTDJ.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  HttpClient,
  computed,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/features/community/services/reverb-connection.service.ts
var ReverbConnectionService = class _ReverbConnectionService {
  constructor() {
    this.state = inject(CommunityStateService);
    this.echo = null;
    this.subscribedChannelIds = /* @__PURE__ */ new Set();
  }
  /**
   * Initialise the Echo client. Must be called once after auth, before
   * any channel subscriptions. Token is read from localStorage where
   * the existing Dawri auth flow stores it (key: `dawri_token`).
   */
  init() {
    return __async(this, null, function* () {
      if (this.echo)
        return;
      const [{ default: Echo }, pusher] = yield Promise.all([
        import("./chunk-GNJIEV7S.js"),
        import("./chunk-ZNORO6QP.js")
      ]);
      window.Pusher = pusher.default;
      this.echo = new Echo({
        broadcaster: "reverb",
        key: "chqtxmkwrfl1idgytd3e",
        // matches REVERB_APP_KEY in backend .env
        wsHost: "192.168.100.67",
        wsPort: 8080,
        forceTLS: false,
        enabledTransports: ["ws"],
        // Custom authorizer: builds the /broadcasting/auth request per channel
        // subscription and reads the bearer token FRESH each time. This avoids
        // the bug where a token captured once at init() (possibly empty if init
        // ran before login) is reused for the whole session, causing 403s on
        // presence channel auth.
        authorizer: (channel) => ({
          authorize: (socketId, callback) => {
            const token = localStorage.getItem("dawri_token") ?? "";
            fetch("http://192.168.100.67:8001/broadcasting/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name
              })
            }).then((res) => {
              if (!res.ok) {
                callback(new Error(`Auth failed: ${res.status}`), null);
                return;
              }
              return res.json().then((data) => callback(null, data));
            }).catch((err) => callback(err instanceof Error ? err : new Error(String(err)), null));
          }
        })
      });
    });
  }
  /** Subscribe to a presence channel for a community text channel. */
  subscribeToChannel(channelId) {
    if (!this.echo || this.subscribedChannelIds.has(channelId))
      return;
    this.subscribedChannelIds.add(channelId);
    this.echo.join(`community.channel.${channelId}`).here((members) => this.state.presenceHere(members ?? [])).joining((member) => this.state.presenceJoin(member)).leaving((member) => this.state.presenceLeave(member)).listen(".message.posted", (e) => this.state.onMessagePosted(e.message)).listen(".message.edited", (e) => this.state.onMessageEdited(e.message)).listen(".message.deleted", (e) => this.state.onMessageDeleted(e.channel_id, e.message_id)).listen(".reaction.added", (e) => this.state.onReactionChange(e.channel_id, e.message_id, e.user_id, e.emoji, true)).listen(".reaction.removed", (e) => this.state.onReactionChange(e.channel_id, e.message_id, e.user_id, e.emoji, false));
  }
  unsubscribeFromChannel(channelId) {
    if (!this.echo || !this.subscribedChannelIds.has(channelId))
      return;
    this.echo.leave(`community.channel.${channelId}`);
    this.subscribedChannelIds.delete(channelId);
  }
  /**
   * Generic private-channel listener — reuses the one authenticated Echo
   * connection. Used by the DM feature (channel `dm.{conversationId}`).
   * `eventName` is the broadcastAs() name WITH a leading dot, e.g. '.dm.sent'.
   */
  subscribePrivate(channelName, eventName, handler) {
    return __async(this, null, function* () {
      yield this.init();
      if (!this.echo)
        return;
      this.echo.private(channelName).listen(eventName, handler);
    });
  }
  /** Leave a private channel subscribed via subscribePrivate(). */
  leavePrivate(channelName) {
    this.echo?.leave(channelName);
  }
  disconnect() {
    if (this.echo) {
      for (const id of this.subscribedChannelIds) {
        this.echo.leave(`community.channel.${id}`);
      }
      this.subscribedChannelIds.clear();
      this.echo.disconnect();
      this.echo = null;
    }
  }
  static {
    this.\u0275fac = function ReverbConnectionService_Factory(t) {
      return new (t || _ReverbConnectionService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReverbConnectionService, factory: _ReverbConnectionService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/social/dm.service.ts
var DmService = class _DmService {
  constructor() {
    this.http = inject(HttpClient);
    this.auth = inject(AuthService);
    this.reverb = inject(ReverbConnectionService);
    this.base = environment.apiUrl + "/dm";
    this.conversations = signal([]);
    this.activeId = signal(null);
    this.messages = signal({});
    this.unread = signal(0);
    this.loadingList = signal(false);
    this.loadingThread = signal(false);
    this.subscribed = /* @__PURE__ */ new Set();
    this.activeMessages = computed(() => {
      const id = this.activeId();
      return id ? this.messages()[id] ?? [] : [];
    });
    this.activeConversation = computed(() => this.conversations().find((c) => c.id === this.activeId()) ?? null);
  }
  get myId() {
    return this.auth.currentUser()?.id;
  }
  /** Lightweight unread total for the nav badge. */
  loadUnread() {
    this.http.get(`${this.base}/unread-count`).subscribe({ next: (r) => this.unread.set(r.count ?? 0), error: () => {
    } });
  }
  /** Load the conversation list. */
  loadConversations() {
    if (this.loadingList())
      return;
    this.loadingList.set(true);
    this.http.get(this.base).subscribe({
      next: (r) => {
        const list = r.data ?? [];
        this.conversations.set(list);
        this.unread.set(list.reduce((s, c) => s + c.unread, 0));
        this.loadingList.set(false);
        list.forEach((c) => this.subscribe(c.id));
      },
      error: () => this.loadingList.set(false)
    });
  }
  /** Open (or create) a conversation with a user, then load + activate it. */
  openWith(user) {
    return this.http.get(`${this.base}/with/${user.id}`).pipe(tap((res) => {
      if (!this.conversations().some((c) => c.id === res.id)) {
        this.conversations.update((list) => [{
          id: res.id,
          user: res.user,
          last_message: null,
          unread: 0,
          updated_at: null
        }, ...list]);
      }
      this.activate(res.id);
    }));
  }
  /** Mark a conversation active, load its messages, subscribe, clear unread. */
  activate(conversationId) {
    this.activeId.set(conversationId);
    this.subscribe(conversationId);
    this.loadMessages(conversationId);
    this.markRead(conversationId);
  }
  loadMessages(conversationId) {
    this.loadingThread.set(true);
    this.http.get(`${this.base}/${conversationId}/messages`).subscribe({
      next: (r) => {
        this.messages.update((m) => __spreadProps(__spreadValues({}, m), { [conversationId]: r.data ?? [] }));
        this.loadingThread.set(false);
      },
      error: () => this.loadingThread.set(false)
    });
  }
  /** Send a message — DMs use /with/{user} (friend-gated), groups/teams use /{conv}/send. */
  send(conv, body) {
    const url = conv.user ? `${this.base}/with/${conv.user.id}` : `${this.base}/${conv.id}/send`;
    return this.http.post(url, { body }).pipe(tap((res) => this.appendMessage(
      res.data,
      /*mine*/
      true
    )));
  }
  /** Send a voice note. Currently DM-only (groups/teams are text in v1). */
  sendVoice(conv, blob, durationMs) {
    if (!conv.user)
      throw new Error("Voice notes are only available in direct messages.");
    const fd = new FormData();
    const ext = blob.type.includes("ogg") ? "ogg" : blob.type.includes("mp4") ? "m4a" : "webm";
    fd.append("audio", blob, `voice.${ext}`);
    fd.append("duration_ms", String(Math.round(durationMs)));
    return this.http.post(`${this.base}/with/${conv.user.id}/voice`, fd).pipe(tap((res) => this.appendMessage(
      res.data,
      /*mine*/
      true
    )));
  }
  markRead(conversationId) {
    const conv = this.conversations().find((c) => c.id === conversationId);
    if (!conv || conv.unread === 0)
      return;
    this.http.post(`${this.base}/${conversationId}/read`, {}).subscribe({ error: () => {
    } });
    this.conversations.update((list) => list.map((c) => c.id === conversationId ? __spreadProps(__spreadValues({}, c), { unread: 0 }) : c));
    this.unread.update((n) => Math.max(0, n - conv.unread));
  }
  // ── Realtime ──────────────────────────────────────────────────────
  subscribe(conversationId) {
    if (this.subscribed.has(conversationId))
      return;
    this.subscribed.add(conversationId);
    this.reverb.subscribePrivate(`dm.${conversationId}`, ".dm.sent", (e) => {
      if (e?.message)
        this.appendMessage(e.message, e.message.sender_id === this.myId);
    });
  }
  appendMessage(msg, mine) {
    const existing = this.messages()[msg.conversation_id] ?? [];
    if (existing.some((m) => m.id === msg.id))
      return;
    this.messages.update((m) => __spreadProps(__spreadValues({}, m), {
      [msg.conversation_id]: [...m[msg.conversation_id] ?? [], msg]
    }));
    const isActive = this.activeId() === msg.conversation_id;
    this.conversations.update((list) => {
      const idx = list.findIndex((c2) => c2.id === msg.conversation_id);
      if (idx === -1)
        return list;
      const c = list[idx];
      const updated = __spreadProps(__spreadValues({}, c), {
        last_message: { body: msg.audio_url ? "Voice message" : msg.body ?? "", sender_id: msg.sender_id, created_at: msg.created_at },
        updated_at: msg.created_at,
        unread: !mine && !isActive ? c.unread + 1 : c.unread
      });
      return [updated, ...list.filter((x) => x.id !== c.id)];
    });
    if (!mine && !isActive)
      this.unread.update((n) => n + 1);
    if (!mine && isActive)
      this.markRead(msg.conversation_id);
  }
  static {
    this.\u0275fac = function DmService_Factory(t) {
      return new (t || _DmService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DmService, factory: _DmService.\u0275fac, providedIn: "root" });
  }
};

export {
  ReverbConnectionService,
  DmService
};
//# sourceMappingURL=chunk-5L7FNWZJ.js.map
