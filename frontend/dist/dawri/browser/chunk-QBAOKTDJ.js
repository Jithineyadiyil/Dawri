import {
  CommunityService
} from "./chunk-GFWMVHEB.js";
import {
  computed,
  inject,
  signal,
  take,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/features/community/services/community-state.service.ts
var CommunityStateService = class _CommunityStateService {
  constructor() {
    this.api = inject(CommunityService);
    this.communities = signal([]);
    this.activeCommunityId = signal(null);
    this.activeChannelId = signal(null);
    this.channelsByCommunity = signal({});
    this.messagesByChannel = signal({});
    this.pinnedByChannel = signal({});
    this.cursorByChannel = signal({});
    this.membersByCommunity = signal({});
    this.presenceByUser = signal({});
    this.pollsByChannel = signal({});
    this.isLoadingMessages = signal(false);
    this.isPosting = signal(false);
    this.postError = signal(null);
    this.flashedMessageId = signal(null);
    this.manageRequested = signal(0);
    this.isUploading = signal(false);
    this.eventsByCommunity = signal({});
    this.isLoadingEvents = signal(false);
    this.replyingTo = signal(null);
    this.activeCommunity = computed(() => {
      const id = this.activeCommunityId();
      return id ? this.communities().find((c) => c.id === id) ?? null : null;
    });
    this.roleByUser = computed(() => {
      const id = this.activeCommunityId();
      if (!id)
        return {};
      const map = {};
      for (const m of this.membersByCommunity()[id] ?? []) {
        if (m.user?.id)
          map[m.user.id] = m.role;
      }
      return map;
    });
    this.activeChannels = computed(() => {
      const id = this.activeCommunityId();
      return id ? this.channelsByCommunity()[id] ?? [] : [];
    });
    this.activeChannel = computed(() => {
      const id = this.activeChannelId();
      if (!id)
        return null;
      return this.activeChannels().find((c) => c.id === id) ?? null;
    });
    this.activeMessages = computed(() => {
      const id = this.activeChannelId();
      return id ? this.messagesByChannel()[id] ?? [] : [];
    });
  }
  /** Request the Manage panel to open (from the channel-list gear). */
  requestManage() {
    this.manageRequested.update((n) => n + 1);
  }
  // ── Loaders ────────────────────────────────────────────────────────────
  loadCommunities() {
    this.api.list().subscribe((list) => {
      this.communities.set(list);
      const global = list.find((c) => c.type === "global") ?? list[0];
      if (global) {
        if (!this.activeCommunityId()) {
          this.activeCommunityId.set(global.id);
        }
        if (!this.channelsByCommunity()[global.id]) {
          this.loadChannels(global.id, true);
        } else if (!this.activeChannelId()) {
          this.selectFirstChannel(global.id);
        }
      }
    });
  }
  loadChannels(communityId, selectFirst = false) {
    this.api.channels(communityId).subscribe((channels) => {
      this.channelsByCommunity.update((prev) => __spreadProps(__spreadValues({}, prev), { [communityId]: channels }));
      if (selectFirst && !this.activeChannelId() && channels.length > 0) {
        const first = channels.find((c) => !c.is_archived) ?? channels[0];
        this.activeChannelId.set(first.id);
        this.loadMessages(first.id);
        this.loadPinned(first.id);
        this.markChannelRead(first.id);
      }
    });
  }
  /** Select the first available channel of a community (no-op if none). */
  selectFirstChannel(communityId) {
    const channels = this.channelsByCommunity()[communityId] ?? [];
    if (channels.length > 0) {
      this.activeChannelId.set(channels[0].id);
      this.loadMessages(channels[0].id);
    }
  }
  loadMessages(channelId, append = false) {
    this.isLoadingMessages.set(true);
    const cursor = append ? this.cursorByChannel()[channelId] ?? void 0 : void 0;
    this.api.messages(channelId, cursor ?? void 0).subscribe({
      next: (page) => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [channelId]: append ? [...prev[channelId] ?? [], ...page.data] : page.data
        }));
        this.cursorByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), { [channelId]: page.next_cursor }));
        this.isLoadingMessages.set(false);
      },
      error: () => this.isLoadingMessages.set(false)
    });
  }
  loadMembers(communityId, search) {
    this.api.members(communityId, search).subscribe((resp) => {
      this.membersByCommunity.update((prev) => __spreadProps(__spreadValues({}, prev), { [communityId]: resp.data }));
      const presenceMap = __spreadValues({}, this.presenceByUser());
      for (const [uid, p] of Object.entries(resp.presence)) {
        presenceMap[uid] = p.status;
      }
      this.presenceByUser.set(presenceMap);
    });
  }
  // ── Live presence (from the Reverb presence channel) ───────────────────────
  /** The full roster present on the channel right now (Echo `here`). */
  presenceHere(members) {
    const online = new Set(members.map((m) => m.id));
    this.presenceByUser.update((prev) => {
      const next = __spreadValues({}, prev);
      for (const uid of Object.keys(next)) {
        if (next[uid] === "online" && !online.has(uid)) {
          next[uid] = "offline";
        }
      }
      for (const uid of online) {
        next[uid] = "online";
      }
      return next;
    });
  }
  /** A single member joined (Echo `joining`). */
  presenceJoin(member) {
    this.presenceByUser.update((prev) => __spreadProps(__spreadValues({}, prev), { [member.id]: "online" }));
  }
  /** A single member left (Echo `leaving`). */
  presenceLeave(member) {
    this.presenceByUser.update((prev) => __spreadProps(__spreadValues({}, prev), { [member.id]: "offline" }));
  }
  // ── Mutations ──────────────────────────────────────────────────────────
  post(channelId, content) {
    this.isPosting.set(true);
    this.postError.set(null);
    const parentId = this.replyingTo()?.id ?? null;
    this.api.post(channelId, content, parentId).subscribe({
      next: (msg) => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [channelId]: [msg, ...(prev[channelId] ?? []).filter((m) => m.id !== msg.id)]
        }));
        this.isPosting.set(false);
        this.clearReplyTo();
      },
      error: (err) => {
        this.isPosting.set(false);
        const msg = err?.error?.errors?.content?.[0] ?? err?.error?.message ?? "Your message could not be sent.";
        this.postError.set(msg);
      }
    });
  }
  /** Set the message the composer is replying to (null clears it). */
  setReplyTo(message) {
    this.replyingTo.set(message);
  }
  clearReplyTo() {
    this.replyingTo.set(null);
  }
  /**
   * Upload images into a channel. The server returns the carrier message; we
   * prepend it (the broadcast to others dedupes by id).
   */
  uploadImages(channelId, files, caption) {
    if (files.length === 0)
      return;
    this.isUploading.set(true);
    this.api.uploadImages(channelId, files, caption).subscribe({
      next: (msg) => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [channelId]: [msg, ...(prev[channelId] ?? []).filter((m) => m.id !== msg.id)]
        }));
        this.isUploading.set(false);
      },
      error: () => this.isUploading.set(false)
    });
  }
  /** Upload a voice note into a channel; prepend the returned carrier message. */
  uploadVoice(channelId, blob, durationMs) {
    this.isUploading.set(true);
    this.api.uploadVoice(channelId, blob, durationMs).subscribe({
      next: (msg) => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [channelId]: [msg, ...(prev[channelId] ?? []).filter((m) => m.id !== msg.id)]
        }));
        this.isUploading.set(false);
      },
      error: () => this.isUploading.set(false)
    });
  }
  // ── Events (Phase 4) ───────────────────────────────────────────────────────
  /** Load events for a community into eventsByCommunity. */
  loadEvents(communityId, includePast = false) {
    this.isLoadingEvents.set(true);
    this.api.listEvents(communityId, includePast).subscribe({
      next: (list) => {
        this.eventsByCommunity.update((prev) => __spreadProps(__spreadValues({}, prev), { [communityId]: list }));
        this.isLoadingEvents.set(false);
      },
      error: () => this.isLoadingEvents.set(false)
    });
  }
  createEvent(communityId, payload) {
    this.api.createEvent(communityId, payload).subscribe((ev) => {
      this.eventsByCommunity.update((prev) => {
        const list = [...prev[communityId] ?? [], ev].sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
        return __spreadProps(__spreadValues({}, prev), { [communityId]: list });
      });
    });
  }
  rsvpEvent(communityId, eventId, status) {
    this.api.rsvpEvent(eventId, status).subscribe((updated) => this.replaceEvent(communityId, updated));
  }
  cancelEvent(communityId, eventId) {
    this.api.cancelEvent(eventId).subscribe((updated) => this.replaceEvent(communityId, updated));
  }
  deleteEvent(communityId, eventId) {
    this.api.deleteEvent(eventId).subscribe(() => {
      this.eventsByCommunity.update((prev) => __spreadProps(__spreadValues({}, prev), {
        [communityId]: (prev[communityId] ?? []).filter((e) => e.id !== eventId)
      }));
    });
  }
  replaceEvent(communityId, ev) {
    this.eventsByCommunity.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [communityId]: (prev[communityId] ?? []).map((e) => e.id === ev.id ? ev : e)
    }));
  }
  edit(messageId, content) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    this.messagesByChannel.update((prev) => {
      const updated = {};
      for (const [cid, msgs] of Object.entries(prev)) {
        updated[cid] = msgs.map((m) => m.id === messageId ? __spreadProps(__spreadValues({}, m), { content, edited_at: now }) : m);
      }
      return updated;
    });
    this.api.edit(messageId, content).pipe(take(1)).subscribe((updated) => this.upsertMessage(updated));
  }
  delete(message) {
    this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [message.channel_id]: (prev[message.channel_id] ?? []).map((m) => m.id === message.id ? __spreadProps(__spreadValues({}, m), { is_deleted: true, content: null }) : m)
    }));
    this.api.delete(message.id).pipe(take(1)).subscribe();
  }
  /**
   * Phase 6 — delete a message by id (used by the admin panel to remove a
   * flagged message). Marks it deleted in the given channel's list if present.
   */
  deleteMessageById(channelId, messageId) {
    this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [channelId]: (prev[channelId] ?? []).map((m) => m.id === messageId ? __spreadProps(__spreadValues({}, m), { is_deleted: true, content: null }) : m)
    }));
    this.api.delete(messageId).pipe(take(1)).subscribe();
  }
  /** Briefly highlight a message (after a moderator jumps to it). */
  flashMessage(messageId) {
    this.flashedMessageId.set(messageId);
    setTimeout(() => {
      if (this.flashedMessageId() === messageId)
        this.flashedMessageId.set(null);
    }, 2e3);
  }
  toggleReaction(message, emoji, currentUserId) {
    const already = message.reactions.find((r) => r.emoji === emoji)?.users.includes(currentUserId);
    this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [message.channel_id]: (prev[message.channel_id] ?? []).map((m) => m.id === message.id ? this.applyReactionToggle(m, emoji, currentUserId, !already) : m)
    }));
    const obs = already ? this.api.unreact(message.id, emoji) : this.api.react(message.id, emoji);
    obs.pipe(take(1)).subscribe({
      error: () => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [message.channel_id]: (prev[message.channel_id] ?? []).map((m) => m.id === message.id ? this.applyReactionToggle(m, emoji, currentUserId, !!already) : m)
        }));
      }
    });
  }
  // ── Pinning ──────────────────────────────────────────────────────────────
  /**
   * Pin or unpin a message. Applies optimistically then syncs the pinned list.
   */
  togglePin(message) {
    const newPinned = !message.is_pinned;
    this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [message.channel_id]: (prev[message.channel_id] ?? []).map((m) => m.id === message.id ? __spreadProps(__spreadValues({}, m), { is_pinned: newPinned }) : m)
    }));
    const obs = message.is_pinned ? this.api.unpin(message.id) : this.api.pin(message.id);
    obs.pipe(take(1)).subscribe({
      next: (updated) => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [message.channel_id]: (prev[message.channel_id] ?? []).map((m) => m.id === message.id ? __spreadProps(__spreadValues({}, m), { is_pinned: updated.is_pinned, pinned_at: updated.pinned_at }) : m)
        }));
        this.loadPinned(message.channel_id);
      },
      error: () => {
        this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
          [message.channel_id]: (prev[message.channel_id] ?? []).map((m) => m.id === message.id ? __spreadProps(__spreadValues({}, m), { is_pinned: message.is_pinned }) : m)
        }));
      }
    });
  }
  /** Load the pinned messages for a channel into pinnedByChannel. */
  loadPinned(channelId) {
    this.api.pinned(channelId).subscribe((list) => {
      this.pinnedByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), { [channelId]: list }));
    });
  }
  // ── Mark as read ───────────────────────────────────────────────────────────
  /**
   * Mark a channel read up to its newest message and clear its unread badge
   * locally. Safe to call on channel open.
   */
  markChannelRead(channelId) {
    const msgs = this.messagesByChannel()[channelId] ?? [];
    const lastId = msgs.length > 0 ? msgs[0].id : void 0;
    this.api.markRead(channelId, lastId).subscribe(() => {
      this.clearUnread(channelId);
    });
    this.clearUnread(channelId);
  }
  clearUnread(channelId) {
    const communityId = this.activeCommunityId();
    if (!communityId)
      return;
    this.channelsByCommunity.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [communityId]: (prev[communityId] ?? []).map((c) => c.id === channelId ? __spreadProps(__spreadValues({}, c), { unread_count: 0 }) : c)
    }));
  }
  // ── Moderation ─────────────────────────────────────────────────────────────
  /**
   * Perform a moderation action on a member, then refresh the member list so
   * mute/ban/role/removal changes are reflected.
   *
   * @param payload action + target user, with optional minutes/reason/role.
   */
  moderate(payload) {
    const communityId = this.activeCommunityId();
    if (!communityId)
      return;
    this.api.moderate(communityId, payload).subscribe({
      next: () => this.loadMembers(communityId),
      error: () => this.loadMembers(communityId)
    });
  }
  // ── Polls ────────────────────────────────────────────────────────────────
  /** Load polls for a channel into pollsByChannel. */
  loadPolls(channelId) {
    this.api.listPolls(channelId).subscribe((list) => {
      this.pollsByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), { [channelId]: list }));
    });
  }
  /** Create a poll and prepend it to the channel's poll list. */
  createPoll(channelId, payload) {
    this.api.createPoll(channelId, payload).pipe(take(1)).subscribe((poll) => {
      this.pollsByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
        [channelId]: [poll, ...prev[channelId] ?? []]
      }));
      this.silentRefreshMessages(channelId);
    });
  }
  /**
   * Silently fetch the latest page of messages and merge any NEW ones into the
   * channel's list. Never sets isLoadingMessages so there is no spinner flash.
   * Used as a lightweight fallback after optimistic mutations (polls, etc.).
   */
  silentRefreshMessages(channelId) {
    this.api.messages(channelId).pipe(take(1)).subscribe((page) => {
      this.messagesByChannel.update((prev) => {
        const existing = prev[channelId] ?? [];
        const knownIds = new Set(existing.map((m) => m.id));
        const fresh = page.data.filter((m) => !knownIds.has(m.id));
        if (fresh.length === 0)
          return prev;
        return __spreadProps(__spreadValues({}, prev), { [channelId]: [...fresh, ...existing] });
      });
    });
  }
  /** Vote on a poll; replace it in place with the updated results. */
  votePoll(channelId, pollId, optionId) {
    this.api.votePoll(pollId, optionId).pipe(take(1)).subscribe((updated) => {
      this.replacePoll(channelId, updated);
    });
  }
  closePoll(channelId, pollId) {
    this.pollsByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [channelId]: (prev[channelId] ?? []).map((p) => p.id === pollId ? __spreadProps(__spreadValues({}, p), { is_open: false }) : p)
    }));
    this.api.closePoll(pollId).pipe(take(1)).subscribe((updated) => {
      this.replacePoll(channelId, updated);
    });
  }
  deletePoll(channelId, pollId) {
    this.messagesByChannel.update((prev) => {
      const list = prev[channelId];
      if (!list)
        return prev;
      const next = list.filter((m) => !(m.poll && m.poll.id === pollId));
      return next.length !== list.length ? __spreadProps(__spreadValues({}, prev), { [channelId]: next }) : prev;
    });
    this.pollsByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [channelId]: (prev[channelId] ?? []).filter((p) => p.id !== pollId)
    }));
    this.api.deletePoll(pollId).pipe(take(1)).subscribe();
  }
  /**
   * Public hook for components that updated a poll themselves (e.g. poll-display
   * after a vote) to push the new poll into shared state, keeping the inline
   * message copy and the separate-section list consistent.
   */
  syncPoll(channelId, poll) {
    this.replacePoll(channelId, poll);
  }
  replacePoll(channelId, poll) {
    this.pollsByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [channelId]: (prev[channelId] ?? []).map((p) => p.id === poll.id ? poll : p)
    }));
    this.messagesByChannel.update((prev) => {
      const list = prev[channelId];
      if (!list)
        return prev;
      let changed = false;
      const next = list.map((m) => {
        if (m.poll && m.poll.id === poll.id) {
          changed = true;
          return __spreadProps(__spreadValues({}, m), { poll });
        }
        return m;
      });
      return changed ? __spreadProps(__spreadValues({}, prev), { [channelId]: next }) : prev;
    });
  }
  // ── Real-time event handlers (called by ReverbConnectionService) ───────
  onMessagePosted(msg) {
    this.upsertMessage(msg);
  }
  onMessageEdited(msg) {
    this.upsertMessage(msg);
  }
  onMessageDeleted(channelId, messageId) {
    this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [channelId]: (prev[channelId] ?? []).map((m) => m.id === messageId ? __spreadProps(__spreadValues({}, m), { is_deleted: true, content: null }) : m)
    }));
  }
  onReactionChange(channelId, messageId, userId, emoji, added) {
    this.messagesByChannel.update((prev) => __spreadProps(__spreadValues({}, prev), {
      [channelId]: (prev[channelId] ?? []).map((m) => m.id === messageId ? this.applyReactionToggle(m, emoji, userId, added) : m)
    }));
  }
  // ── Helpers ────────────────────────────────────────────────────────────
  upsertMessage(msg) {
    this.messagesByChannel.update((prev) => {
      const existing = prev[msg.channel_id] ?? [];
      const idx = existing.findIndex((m) => m.id === msg.id);
      const next = idx >= 0 ? existing.map((m) => m.id === msg.id ? msg : m) : [msg, ...existing];
      return __spreadProps(__spreadValues({}, prev), { [msg.channel_id]: next });
    });
  }
  applyReactionToggle(msg, emoji, userId, added) {
    const reactions = [...msg.reactions];
    const idx = reactions.findIndex((r) => r.emoji === emoji);
    if (added) {
      if (idx >= 0) {
        if (!reactions[idx].users.includes(userId)) {
          reactions[idx] = __spreadProps(__spreadValues({}, reactions[idx]), { users: [...reactions[idx].users, userId], count: reactions[idx].count + 1 });
        }
      } else {
        reactions.push({ emoji, count: 1, users: [userId] });
      }
    } else if (idx >= 0) {
      const users = reactions[idx].users.filter((u) => u !== userId);
      if (users.length === 0) {
        reactions.splice(idx, 1);
      } else {
        reactions[idx] = __spreadProps(__spreadValues({}, reactions[idx]), { users, count: users.length });
      }
    }
    return __spreadProps(__spreadValues({}, msg), { reactions });
  }
  static {
    this.\u0275fac = function CommunityStateService_Factory(t) {
      return new (t || _CommunityStateService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CommunityStateService, factory: _CommunityStateService.\u0275fac, providedIn: "root" });
  }
};

export {
  CommunityStateService
};
//# sourceMappingURL=chunk-QBAOKTDJ.js.map
