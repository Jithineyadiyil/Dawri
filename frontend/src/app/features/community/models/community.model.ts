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
  join_policy?: JoinPolicy;
  rules?: string | null;
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
  reply_to?: { id: string; author: string | null; snippet: string | null } | null;
  poll?: Poll | null;
  attachments?: MessageAttachment[];
  created_at: string;
}

/** Phase 3 — an image attached to a message. */
export interface MessageAttachment {
  id: string;
  url: string;
  mime: string;
  width: number | null;
  height: number | null;
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

/** A message together with its nested replies (built client-side for threads). */
export interface MessageNode {
  message: Message;
  children: MessageNode[];
}

/** Phase 2 — Polls. */
export interface PollOption {
  id: string;
  label: string;
  votes: number;
  voted: boolean;
}

export interface Poll {
  id: string;
  channel_id: string;
  question: string;
  is_multiple: boolean;
  is_open: boolean;
  closes_at: string | null;
  author: { id: string | null; nickname: string | null };
  options: PollOption[];
  total_votes: number;
  created_at: string;
}

/** Phase 4 — Community events + RSVPs. */
export type RsvpStatus = 'going' | 'maybe' | 'declined';

export interface CommunityEvent {
  id: string;
  community_id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
  is_cancelled: boolean;
  is_upcoming: boolean;
  creator: { id: string | null; nickname: string | null };
  counts: { going: number; maybe: number; declined: number };
  my_status: RsvpStatus | null;
  created_at: string;
}

/** Phase 5 — join flow. */
export type JoinPolicy = 'open' | 'request' | 'closed';

export interface CommunityInvite {
  id: string;
  token: string;
  max_uses: number | null;
  uses: number;
  expires_at: string | null;
  is_revoked: boolean;
  is_usable: boolean;
  created_at: string;
}

export interface JoinRequest {
  id: string;
  status: 'pending' | 'approved' | 'denied';
  message: string | null;
  user: { id: string | null; nickname: string | null; avatar: string | null };
  created_at: string;
}

/** Result of redeeming an invite or requesting to join. */
export type JoinResult = 'joined' | 'requested' | 'member';

/** Phase 6 — admin & safety. */
export type WordMode = 'block' | 'flag';

export interface BlockedWord {
  id: string;
  word: string;
  mode: WordMode;
  created_at: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  meta: Record<string, unknown> | null;
  actor: { id: string | null; nickname: string | null } | null;
  target: { id: string | null; nickname: string | null } | null;
  created_at: string;
}
