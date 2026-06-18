/**
 * Sprint 15 — HTTP layer for Dawri Community.
 *
 * Pure HTTP only; state lives in CommunityStateService. All endpoints
 * sit under /api/v1 and require auth:sanctum (Bearer token interceptor
 * is already wired in the core HttpInterceptor).
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Channel,
  Community,
  CommunityEvent,
  CommunityInvite,
  CommunityMember,
  JoinPolicy,
  JoinRequest,
  JoinResult,
  AuditEntry,
  CommunityAnalytics,
  ScheduledMessage,
  BlockedWord,
  WordMode,
  MembersResponse,
  Message,
  PaginatedMessages,
  Poll,
  RsvpStatus,
} from '../models/community.model';

interface ApiEnvelope<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://192.168.100.67:8001/api/v1';

  // ── Communities ────────────────────────────────────────────────────────

  list(): Observable<Community[]> {
    return this.http.get<ApiEnvelope<Community[]>>(`${this.base}/communities`)
      .pipe(map(r => r.data));
  }

  show(slug: string): Observable<Community> {
    return this.http.get<ApiEnvelope<Community>>(`${this.base}/communities/${slug}`)
      .pipe(map(r => r.data));
  }

  members(communityId: string, search?: string): Observable<MembersResponse> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<MembersResponse>(
      `${this.base}/communities/${communityId}/members`,
      { params },
    );
  }

  leave(communityId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/communities/${communityId}/leave`, {});
  }

  moderate(communityId: string, payload: {
    action: 'mute' | 'unmute' | 'ban' | 'unban' | 'kick' | 'set_role';
    user_id: string;
    minutes?: number;
    reason?: string;
    role?: 'admin' | 'moderator' | 'member';
  }): Observable<CommunityMember> {
    return this.http.post<ApiEnvelope<CommunityMember>>(
      `${this.base}/communities/${communityId}/moderate`, payload
    ).pipe(map(r => r.data));
  }

  // ── Channels ───────────────────────────────────────────────────────────

  channels(communityId: string): Observable<Channel[]> {
    return this.http.get<ApiEnvelope<Channel[]>>(`${this.base}/communities/${communityId}/channels`)
      .pipe(map(r => r.data));
  }

  createChannel(communityId: string, payload: Partial<Channel>): Observable<Channel> {
    return this.http.post<ApiEnvelope<Channel>>(`${this.base}/communities/${communityId}/channels`, payload)
      .pipe(map(r => r.data));
  }

  updateChannel(channelId: string, payload: Partial<Channel>): Observable<Channel> {
    return this.http.patch<ApiEnvelope<Channel>>(`${this.base}/channels/${channelId}`, payload)
      .pipe(map(r => r.data));
  }

  archiveChannel(channelId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/channels/${channelId}`);
  }

  markRead(channelId: string, lastMessageId?: string): Observable<void> {
    return this.http.post<void>(`${this.base}/channels/${channelId}/mark-read`, {
      last_message_id: lastMessageId ?? null,
    });
  }

  // ── Messages ───────────────────────────────────────────────────────────

  messages(channelId: string, cursor?: string, limit = 50): Observable<PaginatedMessages> {
    const params: Record<string, string> = { limit: String(limit) };
    if (cursor) params['cursor'] = cursor;
    return this.http.get<PaginatedMessages>(`${this.base}/channels/${channelId}/messages`, { params });
  }

  pinned(channelId: string): Observable<Message[]> {
    return this.http.get<ApiEnvelope<Message[]>>(`${this.base}/channels/${channelId}/messages/pinned`)
      .pipe(map(r => r.data));
  }

  post(channelId: string, content: string, parentId?: string | null): Observable<Message> {
    const body: { content: string; parent_id?: string } = { content };
    if (parentId) { body.parent_id = parentId; }
    return this.http.post<ApiEnvelope<Message>>(`${this.base}/channels/${channelId}/messages`, body)
      .pipe(map(r => r.data));
  }

  edit(messageId: string, content: string): Observable<Message> {
    return this.http.patch<ApiEnvelope<Message>>(`${this.base}/messages/${messageId}`, { content })
      .pipe(map(r => r.data));
  }

  delete(messageId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/messages/${messageId}`);
  }

  pin(messageId: string): Observable<Message> {
    return this.http.post<ApiEnvelope<Message>>(`${this.base}/messages/${messageId}/pin`, {})
      .pipe(map(r => r.data));
  }

  unpin(messageId: string): Observable<Message> {
    return this.http.delete<ApiEnvelope<Message>>(`${this.base}/messages/${messageId}/pin`)
      .pipe(map(r => r.data));
  }

  react(messageId: string, emoji: string): Observable<void> {
    return this.http.post<void>(`${this.base}/messages/${messageId}/reactions`, { emoji });
  }

  unreact(messageId: string, emoji: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}`);
  }

  // ── Polls ──────────────────────────────────────────────────────────────────

  listPolls(channelId: string): Observable<Poll[]> {
    return this.http.get<ApiEnvelope<Poll[]>>(`${this.base}/channels/${channelId}/polls`)
      .pipe(map(r => r.data));
  }

  createPoll(channelId: string, payload: {
    question: string;
    options: string[];
    is_multiple?: boolean;
    closes_at?: string | null;
  }): Observable<Poll> {
    return this.http.post<ApiEnvelope<Poll>>(`${this.base}/channels/${channelId}/polls`, payload)
      .pipe(map(r => r.data));
  }

  votePoll(pollId: string, optionId: string): Observable<Poll> {
    return this.http.post<ApiEnvelope<Poll>>(`${this.base}/polls/${pollId}/vote`, { option_id: optionId })
      .pipe(map(r => r.data));
  }

  closePoll(pollId: string): Observable<Poll> {
    return this.http.post<ApiEnvelope<Poll>>(`${this.base}/polls/${pollId}/close`, {})
      .pipe(map(r => r.data));
  }

  deletePoll(pollId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/polls/${pollId}`);
  }

  // ── Attachments (Phase 3) ────────────────────────────────────────────────

  /**
   * Upload one or more images into a channel. The server creates a single
   * message carrying the images and returns it (so it renders inline).
   */
  uploadImages(channelId: string, files: File[], caption?: string): Observable<Message> {
    const form = new FormData();
    for (const f of files) {
      form.append('images[]', f, f.name);
    }
    if (caption && caption.trim().length > 0) {
      form.append('caption', caption.trim());
    }
    return this.http.post<ApiEnvelope<Message>>(`${this.base}/channels/${channelId}/attachments`, form)
      .pipe(map(r => r.data));
  }

  /** Upload a voice note; the carrier message is returned (and broadcast). */
  uploadVoice(channelId: string, blob: Blob, durationMs: number): Observable<Message> {
    const form = new FormData();
    const ext = blob.type.includes('ogg') ? 'ogg' : blob.type.includes('mp4') ? 'm4a' : 'webm';
    form.append('audio', blob, `voice.${ext}`);
    form.append('duration_ms', String(Math.round(durationMs)));
    return this.http.post<ApiEnvelope<Message>>(`${this.base}/channels/${channelId}/voice`, form)
      .pipe(map(r => r.data));
  }

  // ── Events (Phase 4) ─────────────────────────────────────────────────────

  listEvents(communityId: string, includePast = false): Observable<CommunityEvent[]> {
    const url = `${this.base}/communities/${communityId}/events${includePast ? '?past=1' : ''}`;
    return this.http.get<ApiEnvelope<CommunityEvent[]>>(url).pipe(map(r => r.data));
  }

  createEvent(communityId: string, payload: {
    title: string;
    description?: string | null;
    location?: string | null;
    starts_at: string;
    ends_at?: string | null;
  }): Observable<CommunityEvent> {
    return this.http.post<ApiEnvelope<CommunityEvent>>(`${this.base}/communities/${communityId}/events`, payload)
      .pipe(map(r => r.data));
  }

  rsvpEvent(eventId: string, status: RsvpStatus): Observable<CommunityEvent> {
    return this.http.post<ApiEnvelope<CommunityEvent>>(`${this.base}/events/${eventId}/rsvp`, { status })
      .pipe(map(r => r.data));
  }

  cancelEvent(eventId: string): Observable<CommunityEvent> {
    return this.http.post<ApiEnvelope<CommunityEvent>>(`${this.base}/events/${eventId}/cancel`, {})
      .pipe(map(r => r.data));
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/events/${eventId}`);
  }

  // ── Join flow (Phase 5) ────────────────────────────────────────────────────

  setJoinPolicy(communityId: string, policy: JoinPolicy): Observable<JoinPolicy> {
    return this.http.patch<ApiEnvelope<{ join_policy: JoinPolicy }>>(
      `${this.base}/communities/${communityId}/join-policy`, { join_policy: policy }
    ).pipe(map(r => r.data.join_policy));
  }

  listInvites(communityId: string): Observable<CommunityInvite[]> {
    return this.http.get<ApiEnvelope<CommunityInvite[]>>(`${this.base}/communities/${communityId}/invites`)
      .pipe(map(r => r.data));
  }

  createInvite(communityId: string, opts: { max_uses?: number | null; expires_at?: string | null }): Observable<CommunityInvite> {
    return this.http.post<ApiEnvelope<CommunityInvite>>(`${this.base}/communities/${communityId}/invites`, opts)
      .pipe(map(r => r.data));
  }

  revokeInvite(inviteId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/invites/${inviteId}`);
  }

  redeemInvite(token: string): Observable<{ result: JoinResult; community_id: string; community_slug: string }> {
    return this.http.post<ApiEnvelope<{ result: JoinResult; community_id: string; community_slug: string }>>(
      `${this.base}/invites/${token}/redeem`, {}
    ).pipe(map(r => r.data));
  }

  requestJoin(communityId: string, message?: string | null): Observable<JoinResult> {
    return this.http.post<ApiEnvelope<{ result: JoinResult }>>(
      `${this.base}/communities/${communityId}/join`, { message }
    ).pipe(map(r => r.data.result));
  }

  listJoinRequests(communityId: string): Observable<JoinRequest[]> {
    return this.http.get<ApiEnvelope<JoinRequest[]>>(`${this.base}/communities/${communityId}/join-requests`)
      .pipe(map(r => r.data));
  }

  approveRequest(requestId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/join-requests/${requestId}/approve`, {});
  }

  denyRequest(requestId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/join-requests/${requestId}/deny`, {});
  }

  // ── Admin & safety (Phase 6) ───────────────────────────────────────────────

  getRules(communityId: string): Observable<string | null> {
    return this.http.get<ApiEnvelope<{ rules: string | null }>>(`${this.base}/communities/${communityId}/rules`)
      .pipe(map(r => r.data.rules));
  }

  setRules(communityId: string, rules: string | null): Observable<string | null> {
    return this.http.put<ApiEnvelope<{ rules: string | null }>>(`${this.base}/communities/${communityId}/rules`, { rules })
      .pipe(map(r => r.data.rules));
  }

  listBlockedWords(communityId: string): Observable<BlockedWord[]> {
    return this.http.get<ApiEnvelope<BlockedWord[]>>(`${this.base}/communities/${communityId}/blocked-words`)
      .pipe(map(r => r.data));
  }

  addBlockedWord(communityId: string, word: string, mode: WordMode = 'block'): Observable<BlockedWord> {
    return this.http.post<ApiEnvelope<BlockedWord>>(`${this.base}/communities/${communityId}/blocked-words`, { word, mode })
      .pipe(map(r => r.data));
  }

  removeBlockedWord(communityId: string, wordId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/communities/${communityId}/blocked-words/${wordId}`);
  }

  getAuditLog(communityId: string): Observable<AuditEntry[]> {
    return this.http.get<ApiEnvelope<AuditEntry[]>>(`${this.base}/communities/${communityId}/audit-log`)
      .pipe(map(r => r.data));
  }

  getAnalytics(communityId: string): Observable<CommunityAnalytics> {
    return this.http.get<ApiEnvelope<CommunityAnalytics>>(`${this.base}/communities/${communityId}/analytics`)
      .pipe(map(r => r.data));
  }

  listScheduled(channelId: string): Observable<ScheduledMessage[]> {
    return this.http.get<ApiEnvelope<ScheduledMessage[]>>(`${this.base}/channels/${channelId}/scheduled`)
      .pipe(map(r => r.data));
  }

  scheduleMessage(channelId: string, content: string, scheduledFor: string): Observable<ScheduledMessage> {
    return this.http.post<ApiEnvelope<ScheduledMessage>>(
      `${this.base}/channels/${channelId}/scheduled`,
      { content, scheduled_for: scheduledFor }
    ).pipe(map(r => r.data));
  }

  cancelScheduled(scheduledId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/scheduled/${scheduledId}`);
  }
}
