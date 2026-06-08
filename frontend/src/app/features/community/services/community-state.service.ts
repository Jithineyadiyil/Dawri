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
  CommunityMember,
  Message,
  PresenceStatus,
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
  readonly cursorByChannel     = signal<Record<string, string | null>>({});

  readonly membersByCommunity = signal<Record<string, CommunityMember[]>>({});
  readonly presenceByUser     = signal<Record<string, PresenceStatus>>({});

  readonly isLoadingMessages = signal(false);
  readonly isPosting         = signal(false);

  // ── Computed ───────────────────────────────────────────────────────────

  readonly activeCommunity = computed(() => {
    const id = this.activeCommunityId();
    return id ? this.communities().find(c => c.id === id) ?? null : null;
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
        this.activeChannelId.set(channels[0].id);
        this.loadMessages(channels[0].id);
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

  // ── Mutations ──────────────────────────────────────────────────────────

  post(channelId: string, content: string): void {
    this.isPosting.set(true);
    this.api.post(channelId, content).subscribe({
      next: msg => {
        // Optimistic: prepend; the broadcast event will dedupe if a delta comes through
        this.messagesByChannel.update(prev => ({
          ...prev,
          [channelId]: [msg, ...(prev[channelId] ?? []).filter(m => m.id !== msg.id)],
        }));
        this.isPosting.set(false);
      },
      error: () => this.isPosting.set(false),
    });
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
