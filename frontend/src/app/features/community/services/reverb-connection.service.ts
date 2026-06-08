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
      key:    'app-key',           // matches REVERB_APP_KEY in .env
      wsHost: 'localhost',
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ['ws'],
      authEndpoint: 'http://localhost:8001/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('dawri_token') ?? ''}`,
        },
      },
    });
  }

  /** Subscribe to a presence channel for a community text channel. */
  subscribeToChannel(channelId: string): void {
    if (!this.echo || this.subscribedChannelIds.has(channelId)) return;
    this.subscribedChannelIds.add(channelId);

    this.echo.join(`community.channel.${channelId}`)
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
