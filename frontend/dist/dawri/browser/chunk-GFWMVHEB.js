import {
  HttpClient,
  HttpParams,
  inject,
  map,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/features/community/services/community.service.ts
var CommunityService = class _CommunityService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = "http://192.168.100.67:8001/api/v1";
  }
  // ── Communities ────────────────────────────────────────────────────────
  list() {
    return this.http.get(`${this.base}/communities`).pipe(map((r) => r.data));
  }
  show(slug) {
    return this.http.get(`${this.base}/communities/${slug}`).pipe(map((r) => r.data));
  }
  members(communityId, search) {
    let params = new HttpParams();
    if (search) {
      params = params.set("search", search);
    }
    return this.http.get(`${this.base}/communities/${communityId}/members`, { params });
  }
  leave(communityId) {
    return this.http.post(`${this.base}/communities/${communityId}/leave`, {});
  }
  moderate(communityId, payload) {
    return this.http.post(`${this.base}/communities/${communityId}/moderate`, payload).pipe(map((r) => r.data));
  }
  // ── Channels ───────────────────────────────────────────────────────────
  channels(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/channels`).pipe(map((r) => r.data));
  }
  createChannel(communityId, payload) {
    return this.http.post(`${this.base}/communities/${communityId}/channels`, payload).pipe(map((r) => r.data));
  }
  updateChannel(channelId, payload) {
    return this.http.patch(`${this.base}/channels/${channelId}`, payload).pipe(map((r) => r.data));
  }
  archiveChannel(channelId) {
    return this.http.delete(`${this.base}/channels/${channelId}`);
  }
  markRead(channelId, lastMessageId) {
    return this.http.post(`${this.base}/channels/${channelId}/mark-read`, {
      last_message_id: lastMessageId ?? null
    });
  }
  // ── Messages ───────────────────────────────────────────────────────────
  messages(channelId, cursor, limit = 50) {
    const params = { limit: String(limit) };
    if (cursor)
      params["cursor"] = cursor;
    return this.http.get(`${this.base}/channels/${channelId}/messages`, { params });
  }
  pinned(channelId) {
    return this.http.get(`${this.base}/channels/${channelId}/messages/pinned`).pipe(map((r) => r.data));
  }
  post(channelId, content, parentId) {
    const body = { content };
    if (parentId) {
      body.parent_id = parentId;
    }
    return this.http.post(`${this.base}/channels/${channelId}/messages`, body).pipe(map((r) => r.data));
  }
  edit(messageId, content) {
    return this.http.patch(`${this.base}/messages/${messageId}`, { content }).pipe(map((r) => r.data));
  }
  delete(messageId) {
    return this.http.delete(`${this.base}/messages/${messageId}`);
  }
  pin(messageId) {
    return this.http.post(`${this.base}/messages/${messageId}/pin`, {}).pipe(map((r) => r.data));
  }
  unpin(messageId) {
    return this.http.delete(`${this.base}/messages/${messageId}/pin`).pipe(map((r) => r.data));
  }
  react(messageId, emoji) {
    return this.http.post(`${this.base}/messages/${messageId}/reactions`, { emoji });
  }
  unreact(messageId, emoji) {
    return this.http.delete(`${this.base}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`);
  }
  // ── Polls ──────────────────────────────────────────────────────────────────
  listPolls(channelId) {
    return this.http.get(`${this.base}/channels/${channelId}/polls`).pipe(map((r) => r.data));
  }
  createPoll(channelId, payload) {
    return this.http.post(`${this.base}/channels/${channelId}/polls`, payload).pipe(map((r) => r.data));
  }
  votePoll(pollId, optionId) {
    return this.http.post(`${this.base}/polls/${pollId}/vote`, { option_id: optionId }).pipe(map((r) => r.data));
  }
  closePoll(pollId) {
    return this.http.post(`${this.base}/polls/${pollId}/close`, {}).pipe(map((r) => r.data));
  }
  deletePoll(pollId) {
    return this.http.delete(`${this.base}/polls/${pollId}`);
  }
  // ── Attachments (Phase 3) ────────────────────────────────────────────────
  /**
   * Upload one or more images into a channel. The server creates a single
   * message carrying the images and returns it (so it renders inline).
   */
  uploadImages(channelId, files, caption) {
    const form = new FormData();
    for (const f of files) {
      form.append("images[]", f, f.name);
    }
    if (caption && caption.trim().length > 0) {
      form.append("caption", caption.trim());
    }
    return this.http.post(`${this.base}/channels/${channelId}/attachments`, form).pipe(map((r) => r.data));
  }
  /** Upload a voice note; the carrier message is returned (and broadcast). */
  uploadVoice(channelId, blob, durationMs) {
    const form = new FormData();
    const ext = blob.type.includes("ogg") ? "ogg" : blob.type.includes("mp4") ? "m4a" : "webm";
    form.append("audio", blob, `voice.${ext}`);
    form.append("duration_ms", String(Math.round(durationMs)));
    return this.http.post(`${this.base}/channels/${channelId}/voice`, form).pipe(map((r) => r.data));
  }
  // ── Events (Phase 4) ─────────────────────────────────────────────────────
  listEvents(communityId, includePast = false) {
    const url = `${this.base}/communities/${communityId}/events${includePast ? "?past=1" : ""}`;
    return this.http.get(url).pipe(map((r) => r.data));
  }
  createEvent(communityId, payload) {
    return this.http.post(`${this.base}/communities/${communityId}/events`, payload).pipe(map((r) => r.data));
  }
  rsvpEvent(eventId, status) {
    return this.http.post(`${this.base}/events/${eventId}/rsvp`, { status }).pipe(map((r) => r.data));
  }
  cancelEvent(eventId) {
    return this.http.post(`${this.base}/events/${eventId}/cancel`, {}).pipe(map((r) => r.data));
  }
  deleteEvent(eventId) {
    return this.http.delete(`${this.base}/events/${eventId}`);
  }
  // ── Join flow (Phase 5) ────────────────────────────────────────────────────
  setJoinPolicy(communityId, policy) {
    return this.http.patch(`${this.base}/communities/${communityId}/join-policy`, { join_policy: policy }).pipe(map((r) => r.data.join_policy));
  }
  listInvites(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/invites`).pipe(map((r) => r.data));
  }
  createInvite(communityId, opts) {
    return this.http.post(`${this.base}/communities/${communityId}/invites`, opts).pipe(map((r) => r.data));
  }
  revokeInvite(inviteId) {
    return this.http.delete(`${this.base}/invites/${inviteId}`);
  }
  redeemInvite(token) {
    return this.http.post(`${this.base}/invites/${token}/redeem`, {}).pipe(map((r) => r.data));
  }
  requestJoin(communityId, message) {
    return this.http.post(`${this.base}/communities/${communityId}/join`, { message }).pipe(map((r) => r.data.result));
  }
  listJoinRequests(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/join-requests`).pipe(map((r) => r.data));
  }
  approveRequest(requestId) {
    return this.http.post(`${this.base}/join-requests/${requestId}/approve`, {});
  }
  denyRequest(requestId) {
    return this.http.post(`${this.base}/join-requests/${requestId}/deny`, {});
  }
  // ── Admin & safety (Phase 6) ───────────────────────────────────────────────
  getRules(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/rules`).pipe(map((r) => r.data.rules));
  }
  setRules(communityId, rules) {
    return this.http.put(`${this.base}/communities/${communityId}/rules`, { rules }).pipe(map((r) => r.data.rules));
  }
  listBlockedWords(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/blocked-words`).pipe(map((r) => r.data));
  }
  addBlockedWord(communityId, word, mode = "block") {
    return this.http.post(`${this.base}/communities/${communityId}/blocked-words`, { word, mode }).pipe(map((r) => r.data));
  }
  removeBlockedWord(communityId, wordId) {
    return this.http.delete(`${this.base}/communities/${communityId}/blocked-words/${wordId}`);
  }
  getAuditLog(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/audit-log`).pipe(map((r) => r.data));
  }
  getAnalytics(communityId) {
    return this.http.get(`${this.base}/communities/${communityId}/analytics`).pipe(map((r) => r.data));
  }
  listScheduled(channelId) {
    return this.http.get(`${this.base}/channels/${channelId}/scheduled`).pipe(map((r) => r.data));
  }
  scheduleMessage(channelId, content, scheduledFor) {
    return this.http.post(`${this.base}/channels/${channelId}/scheduled`, { content, scheduled_for: scheduledFor }).pipe(map((r) => r.data));
  }
  cancelScheduled(scheduledId) {
    return this.http.delete(`${this.base}/scheduled/${scheduledId}`);
  }
  static {
    this.\u0275fac = function CommunityService_Factory(t) {
      return new (t || _CommunityService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CommunityService, factory: _CommunityService.\u0275fac, providedIn: "root" });
  }
};

export {
  CommunityService
};
//# sourceMappingURL=chunk-GFWMVHEB.js.map
