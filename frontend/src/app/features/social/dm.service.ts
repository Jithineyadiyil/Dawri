import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { ReverbConnectionService } from '../community/services/reverb-connection.service';

export interface DmUser {
  id: string;
  name: string;
  nickname: string | null;
  display_name: string;
  avatar_url: string | null;
}

export interface DmMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string | null;
  audio_url?: string | null;
  audio_duration_ms?: number | null;
  read_at: string | null;
  created_at: string;
}

export interface ConversationGroup {
  kind: 'group' | 'team';
  id?: string;
  name: string | null;
  tag?: string | null;
  logo_url?: string | null;
}
export interface Conversation {
  id: string;
  type?: 'dm' | 'group' | 'team';
  user: DmUser | null;
  group?: ConversationGroup | null;
  last_message: { body: string; sender_id: string; created_at: string } | null;
  unread: number;
  updated_at: string | null;
}

/**
 * DmService — 1:1 private chat between friends.
 *
 * Holds the conversation list, per-conversation message arrays, and the
 * total unread count as signals. Receives new messages in real time over
 * the shared Reverb connection (private channel `dm.{conversationId}`).
 */
@Injectable({ providedIn: 'root' })
export class DmService {
  private http   = inject(HttpClient);
  private auth   = inject(AuthService);
  private reverb = inject(ReverbConnectionService);
  private base   = environment.apiUrl + '/dm';

  readonly conversations = signal<Conversation[]>([]);
  readonly activeId      = signal<string | null>(null);
  readonly messages      = signal<Record<string, DmMessage[]>>({});
  readonly unread        = signal(0);
  readonly loadingList   = signal(false);
  readonly loadingThread = signal(false);

  private subscribed = new Set<string>();

  readonly activeMessages = computed<DmMessage[]>(() => {
    const id = this.activeId();
    return id ? (this.messages()[id] ?? []) : [];
  });
  readonly activeConversation = computed<Conversation | null>(() =>
    this.conversations().find(c => c.id === this.activeId()) ?? null);

  get myId(): string | undefined { return this.auth.currentUser()?.id; }

  /** Lightweight unread total for the nav badge. */
  loadUnread(): void {
    this.http.get<{ count: number }>(`${this.base}/unread-count`)
      .subscribe({ next: r => this.unread.set(r.count ?? 0), error: () => {} });
  }

  /** Load the conversation list. */
  loadConversations(): void {
    if (this.loadingList()) return;
    this.loadingList.set(true);
    this.http.get<{ data: Conversation[] }>(this.base).subscribe({
      next: r => {
        const list = r.data ?? [];
        this.conversations.set(list);
        this.unread.set(list.reduce((s, c) => s + c.unread, 0));
        this.loadingList.set(false);
        // Keep realtime alive for every known conversation.
        list.forEach(c => this.subscribe(c.id));
      },
      error: () => this.loadingList.set(false),
    });
  }

  /** Open (or create) a conversation with a user, then load + activate it. */
  openWith(user: DmUser): Observable<{ id: string; user: DmUser }> {
    return this.http.get<{ id: string; user: DmUser }>(`${this.base}/with/${user.id}`).pipe(
      tap(res => {
        if (!this.conversations().some(c => c.id === res.id)) {
          this.conversations.update(list => [{
            id: res.id, user: res.user, last_message: null, unread: 0, updated_at: null,
          }, ...list]);
        }
        this.activate(res.id);
      }),
    );
  }

  /** Mark a conversation active, load its messages, subscribe, clear unread. */
  activate(conversationId: string): void {
    this.activeId.set(conversationId);
    this.subscribe(conversationId);
    this.loadMessages(conversationId);
    this.markRead(conversationId);
  }

  loadMessages(conversationId: string): void {
    this.loadingThread.set(true);
    this.http.get<{ data: DmMessage[] }>(`${this.base}/${conversationId}/messages`).subscribe({
      next: r => {
        this.messages.update(m => ({ ...m, [conversationId]: r.data ?? [] }));
        this.loadingThread.set(false);
      },
      error: () => this.loadingThread.set(false),
    });
  }

  /** Send a message — DMs use /with/{user} (friend-gated), groups/teams use /{conv}/send. */
  send(conv: Conversation, body: string): Observable<{ data: DmMessage }> {
    const url = conv.user ? `${this.base}/with/${conv.user.id}` : `${this.base}/${conv.id}/send`;
    return this.http.post<{ data: DmMessage }>(url, { body }).pipe(
      tap(res => this.appendMessage(res.data, /*mine*/ true)),
    );
  }

  /** Send a voice note. Currently DM-only (groups/teams are text in v1). */
  sendVoice(conv: Conversation, blob: Blob, durationMs: number): Observable<{ data: DmMessage }> {
    if (!conv.user) throw new Error('Voice notes are only available in direct messages.');
    const fd = new FormData();
    const ext = (blob.type.includes('ogg') ? 'ogg' : blob.type.includes('mp4') ? 'm4a' : 'webm');
    fd.append('audio', blob, `voice.${ext}`);
    fd.append('duration_ms', String(Math.round(durationMs)));
    return this.http.post<{ data: DmMessage }>(`${this.base}/with/${conv.user.id}/voice`, fd).pipe(
      tap(res => this.appendMessage(res.data, /*mine*/ true)),
    );
  }

  markRead(conversationId: string): void {
    const conv = this.conversations().find(c => c.id === conversationId);
    if (!conv || conv.unread === 0) return;
    this.http.post(`${this.base}/${conversationId}/read`, {}).subscribe({ error: () => {} });
    this.conversations.update(list => list.map(c => c.id === conversationId ? { ...c, unread: 0 } : c));
    this.unread.update(n => Math.max(0, n - conv.unread));
  }

  // ── Realtime ──────────────────────────────────────────────────────

  private subscribe(conversationId: string): void {
    if (this.subscribed.has(conversationId)) return;
    this.subscribed.add(conversationId);
    this.reverb.subscribePrivate(`dm.${conversationId}`, '.dm.sent', (e: { message: DmMessage }) => {
      if (e?.message) this.appendMessage(e.message, e.message.sender_id === this.myId);
    });
  }

  private appendMessage(msg: DmMessage, mine: boolean): void {
    // De-dupe (own messages arrive via the POST response AND, defensively, echo).
    const existing = this.messages()[msg.conversation_id] ?? [];
    if (existing.some(m => m.id === msg.id)) return;

    this.messages.update(m => ({
      ...m,
      [msg.conversation_id]: [...(m[msg.conversation_id] ?? []), msg],
    }));

    const isActive = this.activeId() === msg.conversation_id;
    this.conversations.update(list => {
      const idx = list.findIndex(c => c.id === msg.conversation_id);
      if (idx === -1) return list;
      const c = list[idx];
      const updated: Conversation = {
        ...c,
        last_message: { body: msg.audio_url ? 'Voice message' : (msg.body ?? ''), sender_id: msg.sender_id, created_at: msg.created_at },
        updated_at: msg.created_at,
        unread: (!mine && !isActive) ? c.unread + 1 : c.unread,
      };
      return [updated, ...list.filter(x => x.id !== c.id)]; // bump to top
    });

    if (!mine && !isActive) this.unread.update(n => n + 1);
    if (!mine && isActive) this.markRead(msg.conversation_id);
  }
}
