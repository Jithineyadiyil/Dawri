/**
 * Sprint 15 — Dawri Community type definitions.
 * Mirrors backend API resources exactly. Keep in sync if backend changes.
 */

export type CommunityType = 'global' | 'tournament';
export type ChannelType   = 'text' | 'announcement';
export type MemberRole    = 'owner' | 'admin' | 'moderator' | 'member';
export type PresenceStatus = 'online' | 'idle' | 'offline';

export interface Community {
  id: string;
  type: CommunityType;
  tournament_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  icon_url: string | null;
  is_active: boolean;
  is_archived: boolean;
  archived_at: string | null;
  channels?: Channel[];
  member_count?: number;
  created_at: string;
}

export interface Channel {
  id: string;
  community_id: string;
  name: string;
  topic: string | null;
  type: ChannelType;
  position: number;
  is_archived: boolean;
  unread_count?: number;
}

export interface MessageAuthor {
  id: string | null;
  nickname: string | null;
  avatar: string | null;
  is_self: boolean;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  channel_id: string;
  author: MessageAuthor;
  content: string | null;
  edited_at: string | null;
  is_deleted: boolean;
  is_pinned: boolean;
  pinned_at: string | null;
  reactions: MessageReaction[];
  mentions: string[];
  created_at: string;
}

export interface CommunityMember {
  community_id: string;
  user: {
    id: string;
    nickname: string | null;
    avatar: string | null;
  };
  role: MemberRole;
  joined_at: string;
  muted_until: string | null;
  is_muted: boolean;
  is_banned: boolean;
  ban_reason: string | null;
}

export interface PaginatedMessages {
  data: Message[];
  next_cursor: string | null;
  prev_cursor: string | null;
}

export interface MembersResponse {
  data: CommunityMember[];
  presence: Record<string, { status: PresenceStatus; last_seen_at: string }>;
}

/** Wire events from Reverb broadcasting */
export interface MessagePostedEvent  { message: Message; }
export interface MessageEditedEvent  { message: Message; }
export interface MessageDeletedEvent {
  channel_id: string;
  message_id: string;
  deleted_by_moderator: boolean;
}
export interface ReactionEvent {
  channel_id: string;
  message_id: string;
  user_id: string;
  emoji: string;
}
