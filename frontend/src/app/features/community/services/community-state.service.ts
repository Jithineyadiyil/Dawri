/**
 * Sprint 15 — Local state store using Angular signals.
 *
 * Owns the in-memory model of communities, channels, messages, and
 * presence for the currently active community/channel. Every component
 * in the feature reads through these signals; nothing else does HTTP
 * directly.
 */
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {
  Channel,
  Community,
  CommunityEvent,
  CommunityMember,
  MemberRole,
  Message,
  Poll,
  PresenceStatus,
  RsvpStatus,
} from '../models/community.model';
import { CommunityService } from './community.service';

@Injectable({ providedIn: 'root' })
export class CommunityStateService {
  private readonly api = inject(CommunityService);

  // ── Signals ────────────────────────────────────────────────────────────

  readonly communities = signal<Community[]>([]);
  readonly activeCommunityId = signal<string | null>(null);
  readonly activeChannelId   = signal<string | null>(null);

  readonly channelsByCommunity = signal<Record<string, Channel[]>>({});
  readonly messagesByChannel   = signal<Record<string, Message[]>>({});
  readonly pinnedByChannel     = signal<Record<string, Message[]>>({});
  readonly cursorByChannel     = signal<Record<string, string | null>>({});

  readonly membersByCommunity = signal<Record<string, CommunityMember[]>>({});
  readonly presenceByUser     = signal<Record<string, PresenceStatus>>({});

  readonly pollsByChannel     = signal<Record<string, Poll[]>>({});

  readonly isLoadingMessages = signal(false);
  readonly isPosting         = signal(false);

  /** Phase 6 — last post error (e.g. a blocked word), shown by the composer. */
  readonly postError         = signal<string | null>(null);

  /** Phase 6 — message a moderator jumped to (briefly highlighted). */
  readonly flashedMessageId  = signal<string | null>(null);

  /**
   * Phase 7 — bumped when the channel-list gear is clicked, so the channel-view
   * (which owns the Manage panel) can open it. A counter rather than a boolean
   * so repeated clicks always re-trigger.
   */
  readonly manageRequested   = signal(0);

  /** Request the Manage panel to open (from the channel-list gear). */
  requestManage(): void {
    this.manageRequested.update(n => n + 1);
  }
  readonly isUploading       = signal(false);

  /** Phase 4 — events for the active community + loading flag. */
  readonly eventsByCommunity = signal<Record<string, CommunityEvent[]>>({});
  readonly isLoadingEvents   = signal(false);
  readonly replyingTo        = signal<Message | null>(null);

  // ── Computed ───────────────────────────────────────────────────────────

  readonly activeCommunity = computed(() => {
    const id = this.activeCommunityId();
    return id ? this.communities().find(c => c.id === id) ?? null : null;
  });

  /**
   * Phase 7 — map of userId → role for the active community, so the message
   * feed and member list can show role badges without a backend change.
   */
  readonly roleByUser = computed<Record<string, MemberRole>>(() => {
    const id = this.activeCommunityId();
    if (!id) return {};
    const map: Record<string, MemberRole> = {};
    for (const m of this.membersByCommunity()[id] ?? []) {
      if (m.user?.id) map[m.user.id] = m.role;
    }
    return map;
  });

  readonly activeChannels = computed<Channel[]>(() => {
    const id = this.activeCommunityId();
    return id ? (this.channelsByCommunity()[id] ?? []) : [];
  });

  readonly activeChannel = computed<Channel | null>(() => {
    const id = this.activeChannelId();
    if (!id) return null;
    return this.activeChannels().find(c => c.id === id) ?? null;
  });

  readonly activeMessages = computed<Message[]>(() => {
    const id = this.activeChannelId();
    return id ? (this.messagesByChannel()[id] ?? []) : [];
  });

  // ── Loaders ────────────────────────────────────────────────────────────

  loadCommunities(): void {
    this.api.list().subscribe(list => {
      this.communities.set(list);
      // Auto-hydrate channels for the global community on first load and
      // make it the active community so the channel list renders without
      // requiring the user to first navigate into a specific channel URL.
      const global = list.find(c => c.type === 'global') ?? list[0];
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

  loadChannels(communityId: string, selectFirst = false): void {
    this.api.channels(communityId).subscribe(channels => {
      this.channelsByCommunity.update(prev => ({ ...prev, [communityId]: channels }));
      if (selectFirst && !this.activeChannelId() && channels.length > 0) {
        const first = channels.find(c => !c.is_archived) ?? channels[0];
        this.activeChannelId.set(first.id);
        this.loadMessages(first.id);
        this.loadPinned(first.id);
        this.markChannelRead(first.id);
      }
    });
  }

  /** Select the first available channel of a community (no-op if none). */
  private selectFirstChannel(communityId: string): void {
    const channels = this.channelsByCommunity()[communityId] ?? [];
    if (channels.length > 0) {
      this.activeChannelId.set(channels[0].id);
      this.loadMessages(channels[0].id);
    }
  }

  loadMessages(channelId: string, append = false): void {
    this.isLoadingMessages.set(true);
    const cursor = append ? this.cursorByChannel()[channelId] ?? undefined : undefined;
    this.api.messages(channelId, cursor ?? undefined).subscribe({
      next: page => {
        this.messagesByChannel.update(prev => ({
          ...prev,
          [channelId]: append ? [...(prev[channelId] ?? []), ...page.data] : page.data,
        }));
        this.cursorByChannel.update(prev => ({ ...prev, [channelId]: page.next_cursor }));
        this.isLoadingMessages.set(false);
      },
      error: () => this.isLoadingMessages.set(false),
    });
  }

  loadMembers(communityId: string, search?: string): void {
    this.api.members(communityId, search).subscribe(resp => {
      this.membersByCommunity.update(prev => ({ ...prev, [communityId]: resp.data }));
      const presenceMap: Record<string, PresenceStatus> = { ...this.presenceByUser() };
      for (const [uid, p] of Object.entries(resp.presence)) {
        presenceMap[uid] = p.status;
      }
      this.presenceByUser.set(presenceMap);
    });
  }

  // ── Live presence (from the Reverb presence channel) ───────────────────────

  /** The full roster present on the channel right now (Echo `here`). */
  presenceHere(members: { id: string }[]): void {
    const online = new Set(members.map(m => m.id));
    this.presenceByUser.update(prev => {
      const next: Record<string, PresenceStatus> = { ...prev };
      for (const uid of Object.keys(next)) {
        if (next[uid] === 'online' && !online.has(uid)) {
          next[uid] = 'offline';
        }
      }
      for (const uid of online) {
        next[uid] = 'online';
      }
      return next;
    });
  }

  /** A single member joined (Echo `joining`). */
  presenceJoin(member: { id: string }): void {
    this.presenceByUser.update(prev => ({ ...prev, [member.id]: 'online' }));
  }

  /** A single member left (Echo `leaving`). */
  presenceLeave(member: { id: string }): void {
    this.presenceByUser.update(prev => ({ ...prev, [member.id]: 'offline' }));
  }

  // ── Mutations ──────────────────────────────────────────────────────────

  post(channelId: string, content: string): void {
    this.isPosting.set(true);
    this.postError.set(null);
    const parentId = this.replyingTo()?.id ?? null;
    this.api.post(channelId, content, parentId).subscribe({
      next: msg => {
        // Optimistic: prepend; the broadcast event will dedupe if a delta comes through
        this.messagesByChannel.update(prev => ({
          ...prev,
          [channelId]: [msg, ...(prev[channelId] ?? []).filter(m => m.id !== msg.id)],
        }));
        this.isPosting.set(false);
        this.clearReplyTo();
      },
      error: (err) => {
        this.isPosting.set(false);
        // Surface validation errors (e.g. a blocked word, 422) to the composer.
        const msg = err?.error?.errors?.content?.[0]
          ?? err?.error?.message
          ?? 'Your message could not be sent.';
        this.postError.set(msg);
      },
    });
  }

  /** Set the message the composer is replying to (null clears it). */
  setReplyTo(message: Message): void {
    this.replyingTo.set(message);
  }

  clearReplyTo(): void {
    this.replyingTo.set(null);
  }

  /**
   * Upload images into a channel. The server returns the carrier message; we
   * prepend it (the broadcast to others dedupes by id).
   */
  uploadImages(channelId: string, files: File[], caption?: string): void {
    if (files.length === 0) return;
    this.isUploading.set(true);
    this.api.uploadImages(channelId, files, caption).subscribe({
      next: msg => {
        this.messagesByChannel.update(prev => ({
          ...prev,
          [channelId]: [msg, ...(prev[channelId] ?? []).filter(m => m.id !== msg.id)],
        }));
        this.isUploading.set(false);
      },
      error: () => this.isUploading.set(false),
    });
  }

  // ── Events (Phase 4) ───────────────────────────────────────────────────────

  /** Load events for a community into eventsByCommunity. */
  loadEvents(communityId: string, includePast = false): void {
    this.isLoadingEvents.set(true);
    this.api.listEvents(communityId, includePast).subscribe({
      next: list => {
        this.eventsByCommunity.update(prev => ({ ...prev, [communityId]: list }));
        this.isLoadingEvents.set(false);
      },
      error: () => this.isLoadingEvents.set(false),
    });
  }

  createEvent(communityId: string, payload: {
    title: string;
    description?: string | null;
    location?: string | null;
    starts_at: string;
    ends_at?: string | null;
  }): void {
    this.api.createEvent(communityId, payload).subscribe(ev => {
      this.eventsByCommunity.update(prev => {
        const list = [...(prev[communityId] ?? []), ev]
          .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
        return { ...prev, [communityId]: list };
      });
    });
  }

  rsvpEvent(communityId: string, eventId: string, status: RsvpStatus): void {
    this.api.rsvpEvent(eventId, status).subscribe(updated => this.replaceEvent(communityId, updated));
  }

  cancelEvent(communityId: string, eventId: string): void {
    this.api.cancelEvent(eventId).subscribe(updated => this.replaceEvent(communityId, updated));
  }

  deleteEvent(communityId: string, eventId: string): void {
    this.api.deleteEvent(eventId).subscribe(() => {
      this.eventsByCommunity.update(prev => ({
        ...prev,
        [communityId]: (prev[communityId] ?? []).filter(e => e.id !== eventId),
      }));
    });
  }

  private replaceEvent(communityId: string, ev: CommunityEvent): void {
    this.eventsByCommunity.update(prev => ({
      ...prev,
      [communityId]: (prev[communityId] ?? []).map(e => (e.id === ev.id ? ev : e)),
    }));
  }
  edit(messageId: string, content: string): void {
    this.api.edit(messageId, content).subscribe(updated => this.upsertMessage(updated));
  }

  delete(message: Message): void {
    this.api.delete(message.id).subscribe(() => {
      this.messagesByChannel.update(prev => ({
        ...prev,
        [message.channel_id]: (prev[message.channel_id] ?? []).map(m =>
          m.id === message.id ? { ...m, is_deleted: true, content: null } : m
        ),
      }));
    });
  }

  /**
   * Phase 6 — delete a message by id (used by the admin panel to remove a
   * flagged message). Marks it deleted in the given channel's list if present.
   */
  deleteMessageById(channelId: string, messageId: string): void {
    this.api.delete(messageId).subscribe(() => {
      this.messagesByChannel.update(prev => ({
        ...prev,
        [channelId]: (prev[channelId] ?? []).map(m =>
          m.id === messageId ? { ...m, is_deleted: true, content: null } : m
        ),
      }));
    });
  }

  /** Briefly highlight a message (after a moderator jumps to it). */
  flashMessage(messageId: string): void {
    this.flashedMessageId.set(messageId);
    setTimeout(() => {
      if (this.flashedMessageId() === messageId) this.flashedMessageId.set(null);
    }, 2000);
  }

  toggleReaction(message: Message, emoji: string, currentUserId: string): void {
    const already = message.reactions.find(r => r.emoji === emoji)?.users.includes(currentUserId);
    const obs = already ? this.api.unreact(message.id, emoji) : this.api.react(message.id, emoji);
    obs.subscribe(() => {
      this.messagesByChannel.update(prev => ({
        ...prev,
        [message.channel_id]: (prev[message.channel_id] ?? []).map(m =>
          m.id === message.id ? this.applyReactionToggle(m, emoji, currentUserId, !already) : m
        ),
      }));
    });
  }

  // ── Pinning ──────────────────────────────────────────────────────────────

  /**
   * Pin or unpin a message, then reflect the change locally so the 📌
   * indicator and the pinned panel update without a refetch.
   */
  togglePin(message: Message): void {
    const obs = message.is_pinned ? this.api.unpin(message.id) : this.api.pin(message.id);
    obs.subscribe(updated => {
      this.messagesByChannel.update(prev => ({
        ...prev,
        [message.channel_id]: (prev[message.channel_id] ?? []).map(m =>
          m.id === message.id ? { ...m, is_pinned: updated.is_pinned, pinned_at: updated.pinned_at } : m
        ),
      }));
      // Refresh the pinned list for the channel.
      this.loadPinned(message.channel_id);
    });
  }

  /** Load the pinned messages for a channel into pinnedByChannel. */
  loadPinned(channelId: string): void {
    this.api.pinned(channelId).subscribe(list => {
      this.pinnedByChannel.update(prev => ({ ...prev, [channelId]: list }));
    });
  }

  // ── Mark as read ───────────────────────────────────────────────────────────

  /**
   * Mark a channel read up to its newest message and clear its unread badge
   * locally. Safe to call on channel open.
   */
  markChannelRead(channelId: string): void {
    const msgs = this.messagesByChannel()[channelId] ?? [];
    const lastId = msgs.length > 0 ? msgs[0].id : undefined;
    this.api.markRead(channelId, lastId).subscribe(() => {
      this.clearUnread(channelId);
    });
    // Optimistically clear immediately.
    this.clearUnread(channelId);
  }

  private clearUnread(channelId: string): void {
    const communityId = this.activeCommunityId();
    if (!communityId) return;
    this.channelsByCommunity.update(prev => ({
      ...prev,
      [communityId]: (prev[communityId] ?? []).map(c =>
        c.id === channelId ? { ...c, unread_count: 0 } : c
      ),
    }));
  }

  // ── Moderation ─────────────────────────────────────────────────────────────

  /**
   * Perform a moderation action on a member, then refresh the member list so
   * mute/ban/role/removal changes are reflected.
   *
   * @param payload action + target user, with optional minutes/reason/role.
   */
  moderate(payload: {
    action: 'mute' | 'unmute' | 'ban' | 'unban' | 'kick' | 'set_role';
    user_id: string;
    minutes?: number;
    reason?: string;
    role?: 'admin' | 'moderator' | 'member';
  }): void {
    const communityId = this.activeCommunityId();
    if (!communityId) return;
    this.api.moderate(communityId, payload).subscribe({
      next: () => this.loadMembers(communityId),
      error: () => this.loadMembers(communityId),
    });
  }

  // ── Polls ────────────────────────────────────────────────────────────────

  /** Load polls for a channel into pollsByChannel. */
  loadPolls(channelId: string): void {
    this.api.listPolls(channelId).subscribe(list => {
      this.pollsByChannel.update(prev => ({ ...prev, [channelId]: list }));
    });
  }

  /** Create a poll and prepend it to the channel's poll list. */
  createPoll(channelId: string, payload: {
    question: string;
    options: string[];
    is_multiple?: boolean;
    closes_at?: string | null;
  }): void {
    this.api.createPoll(channelId, payload).subscribe(poll => {
      this.pollsByChannel.update(prev => ({
        ...prev,
        [channelId]: [poll, ...(prev[channelId] ?? [])],
      }));
      // The poll is carried by a message; reload so the carrier message (with
      // its poll attached) appears in the feed immediately rather than only
      // after navigating away and back.
      this.loadMessages(channelId);
    });
  }

  /** Vote on a poll; replace it in place with the updated results. */
  votePoll(channelId: string, pollId: string, optionId: string): void {
    this.api.votePoll(pollId, optionId).subscribe(updated => {
      this.replacePoll(channelId, updated);
    });
  }

  closePoll(channelId: string, pollId: string): void {
    this.api.closePoll(pollId).subscribe(updated => {
      this.replacePoll(channelId, updated);
    });
  }

  deletePoll(channelId: string, pollId: string): void {
    this.api.deletePoll(pollId).subscribe(() => {
      // Remove from the separate-section list (Phase 2 layout).
      this.pollsByChannel.update(prev => ({
        ...prev,
        [channelId]: (prev[channelId] ?? []).filter(p => p.id !== pollId),
      }));
      // Remove the inline carrier message (Phase 2b layout).
      this.messagesByChannel.update(prev => {
        const list = prev[channelId];
        if (!list) return prev;
        const next = list.filter(m => !(m.poll && m.poll.id === pollId));
        return next.length !== list.length ? { ...prev, [channelId]: next } : prev;
      });
    });
  }

  /**
   * Public hook for components that updated a poll themselves (e.g. poll-display
   * after a vote) to push the new poll into shared state, keeping the inline
   * message copy and the separate-section list consistent.
   */
  syncPoll(channelId: string, poll: Poll): void {
    this.replacePoll(channelId, poll);
  }

  private replacePoll(channelId: string, poll: Poll): void {
    // Separate-section polls (Phase 2 layout).
    this.pollsByChannel.update(prev => ({
      ...prev,
      [channelId]: (prev[channelId] ?? []).map(p => (p.id === poll.id ? poll : p)),
    }));

    // Inline polls (Phase 2b): the poll lives inside its carrier message.
    this.messagesByChannel.update(prev => {
      const list = prev[channelId];
      if (!list) return prev;
      let changed = false;
      const next = list.map(m => {
        if (m.poll && m.poll.id === poll.id) {
          changed = true;
          return { ...m, poll };
        }
        return m;
      });
      return changed ? { ...prev, [channelId]: next } : prev;
    });
  }

  // ── Real-time event handlers (called by ReverbConnectionService) ───────

  onMessagePosted(msg: Message): void {
    this.upsertMessage(msg);
  }

  onMessageEdited(msg: Message): void {
    this.upsertMessage(msg);
  }

  onMessageDeleted(channelId: string, messageId: string): void {
    this.messagesByChannel.update(prev => ({
      ...prev,
      [channelId]: (prev[channelId] ?? []).map(m =>
        m.id === messageId ? { ...m, is_deleted: true, content: null } : m
      ),
    }));
  }

  onReactionChange(channelId: string, messageId: string, userId: string, emoji: string, added: boolean): void {
    this.messagesByChannel.update(prev => ({
      ...prev,
      [channelId]: (prev[channelId] ?? []).map(m =>
        m.id === messageId ? this.applyReactionToggle(m, emoji, userId, added) : m
      ),
    }));
  }

  // ── Helpers ────────────────────────────────────────────────────────────

  private upsertMessage(msg: Message): void {
    this.messagesByChannel.update(prev => {
      const existing = prev[msg.channel_id] ?? [];
      const idx = existing.findIndex(m => m.id === msg.id);
      const next = idx >= 0
        ? existing.map(m => m.id === msg.id ? msg : m)
        : [msg, ...existing];
      return { ...prev, [msg.channel_id]: next };
    });
  }

  private applyReactionToggle(msg: Message, emoji: string, userId: string, added: boolean): Message {
    const reactions = [...msg.reactions];
    const idx = reactions.findIndex(r => r.emoji === emoji);
    if (added) {
      if (idx >= 0) {
        if (!reactions[idx].users.includes(userId)) {
          reactions[idx] = { ...reactions[idx], users: [...reactions[idx].users, userId], count: reactions[idx].count + 1 };
        }
      } else {
        reactions.push({ emoji, count: 1, users: [userId] });
      }
    } else if (idx >= 0) {
      const users = reactions[idx].users.filter(u => u !== userId);
      if (users.length === 0) {
        reactions.splice(idx, 1);
      } else {
        reactions[idx] = { ...reactions[idx], users, count: users.length };
      }
    }
    return { ...msg, reactions };
  }
}
