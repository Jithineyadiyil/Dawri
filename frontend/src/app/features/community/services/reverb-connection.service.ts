/**
 * Sprint 15 — Laravel Reverb (Pusher protocol) connection lifecycle.
 *
 * Uses Laravel Echo with the pusher-js client pointed at the local Reverb
 * server. Subscribes to per-channel presence channels when the user
 * enters a channel; unsubscribes when they leave to avoid socket
 * fan-out costs.
 */
import { Injectable, inject } from '@angular/core';
import { CommunityStateService } from './community-state.service';
import type {
  MessageDeletedEvent,
  MessageEditedEvent,
  MessagePostedEvent,
  ReactionEvent,
} from '../models/community.model';

declare global {
  interface Window { Pusher?: unknown; Echo?: any; }
}

@Injectable({ providedIn: 'root' })
export class ReverbConnectionService {
  private readonly state = inject(CommunityStateService);
  private echo: any = null;
  private subscribedChannelIds = new Set<string>();

  /**
   * Initialise the Echo client. Must be called once after auth, before
   * any channel subscriptions. Token is read from localStorage where
   * the existing Dawri auth flow stores it (key: `dawri_token`).
   */
  async init(): Promise<void> {
    if (this.echo) return;

    const [{ default: Echo }, pusher] = await Promise.all([
      import('laravel-echo'),
      import('pusher-js'),
    ]);
    window.Pusher = pusher.default;

    this.echo = new Echo({
      broadcaster: 'reverb',
      key:    'chqtxmkwrfl1idgytd3e',   // matches REVERB_APP_KEY in backend .env
      wsHost: '192.168.100.67',
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ['ws'],
      // Custom authorizer: builds the /broadcasting/auth request per channel
      // subscription and reads the bearer token FRESH each time. This avoids
      // the bug where a token captured once at init() (possibly empty if init
      // ran before login) is reused for the whole session, causing 403s on
      // presence channel auth.
      authorizer: (channel: any) => ({
        authorize: (socketId: string, callback: (error: Error | null, data: any) => void) => {
          const token = localStorage.getItem('dawri_token') ?? '';
          fetch('http://192.168.100.67:8001/broadcasting/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          })
            .then(res => {
              if (!res.ok) {
                callback(new Error(`Auth failed: ${res.status}`), null);
                return;
              }
              return res.json().then(data => callback(null, data));
            })
            .catch(err => callback(err instanceof Error ? err : new Error(String(err)), null));
        },
      }),
    });
  }

  /** Subscribe to a presence channel for a community text channel. */
  subscribeToChannel(channelId: string): void {
    if (!this.echo || this.subscribedChannelIds.has(channelId)) return;
    this.subscribedChannelIds.add(channelId);

    this.echo.join(`community.channel.${channelId}`)
      .here((members: Array<{ id: string }>) => this.state.presenceHere(members ?? []))
      .joining((member: { id: string }) => this.state.presenceJoin(member))
      .leaving((member: { id: string }) => this.state.presenceLeave(member))
      .listen('.message.posted',  (e: MessagePostedEvent)  => this.state.onMessagePosted(e.message))
      .listen('.message.edited',  (e: MessageEditedEvent)  => this.state.onMessageEdited(e.message))
      .listen('.message.deleted', (e: MessageDeletedEvent) =>
        this.state.onMessageDeleted(e.channel_id, e.message_id))
      .listen('.reaction.added',  (e: ReactionEvent) =>
        this.state.onReactionChange(e.channel_id, e.message_id, e.user_id, e.emoji, true))
      .listen('.reaction.removed', (e: ReactionEvent) =>
        this.state.onReactionChange(e.channel_id, e.message_id, e.user_id, e.emoji, false));
  }

  unsubscribeFromChannel(channelId: string): void {
    if (!this.echo || !this.subscribedChannelIds.has(channelId)) return;
    this.echo.leave(`community.channel.${channelId}`);
    this.subscribedChannelIds.delete(channelId);
  }

  /**
   * Generic private-channel listener — reuses the one authenticated Echo
   * connection. Used by the DM feature (channel `dm.{conversationId}`).
   * `eventName` is the broadcastAs() name WITH a leading dot, e.g. '.dm.sent'.
   */
  async subscribePrivate(channelName: string, eventName: string, handler: (e: any) => void): Promise<void> {
    await this.init();
    if (!this.echo) return;
    this.echo.private(channelName).listen(eventName, handler);
  }

  /** Leave a private channel subscribed via subscribePrivate(). */
  leavePrivate(channelName: string): void {
    this.echo?.leave(channelName);
  }

  disconnect(): void {
    if (this.echo) {
      for (const id of this.subscribedChannelIds) {
        this.echo.leave(`community.channel.${id}`);
      }
      this.subscribedChannelIds.clear();
      this.echo.disconnect();
      this.echo = null;
    }
  }
}
