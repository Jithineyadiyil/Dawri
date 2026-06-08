/**
 * Sprint 15 — HTTP layer for Dawri Community.
 *
 * Pure HTTP only; state lives in CommunityStateService. All endpoints
 * sit under /api/v1 and require auth:sanctum (Bearer token interceptor
 * is already wired in the core HttpInterceptor).
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Channel,
  Community,
  CommunityMember,
  MembersResponse,
  Message,
  PaginatedMessages,
} from '../models/community.model';

interface ApiEnvelope<T> { data: T; }

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://localhost:8001/api/v1';

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
    const params = search ? { search } : {};
    return this.http.get<MembersResponse>(`${this.base}/communities/${communityId}/members`, { params });
  }

  leave(communityId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/communities/${communityId}/leave`, {});
  }

  moderate(communityId: string, payload: {
    action: 'mute' | 'unmute' | 'ban' | 'unban';
    user_id: string;
    minutes?: number;
    reason?: string;
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

  post(channelId: string, content: string): Observable<Message> {
    return this.http.post<ApiEnvelope<Message>>(`${this.base}/channels/${channelId}/messages`, { content })
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
}
