/**
 * Sprint 15 — The message panel: header + scrolling feed + composer.
 *
 * Hydrates messages when the route channelId changes, subscribes to the
 * Reverb presence channel, and unsubscribes on teardown.
 */
import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommunityStateService } from '../../services/community-state.service';
import { ReverbConnectionService } from '../../services/reverb-connection.service';
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { MessageComposerComponent } from '../../components/message-composer/message-composer.component';
import { MemberListComponent } from '../../components/member-list/member-list.component';

@Component({
  selector: 'app-channel-view',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageComposerComponent, MemberListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="channel-header">
      <div class="channel-title">
        <span class="hash">#</span>{{ channel()?.name }}
      </div>
      <div class="channel-topic">{{ channel()?.topic }}</div>
    </header>

    <div class="channel-body">
      <div class="messages-pane">
        <app-message-list />
        <app-message-composer />
      </div>
      <app-member-list class="members-pane" />
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; }
    .channel-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #1a1f3a;
      background: #0b1022;
      flex-shrink: 0;
    }
    .channel-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.25rem;
      letter-spacing: 0.05em;
      color: var(--gold, #f0a500);
    }
    .hash { opacity: 0.6; margin-inline-end: 0.25rem; }
    .channel-topic { font-size: 0.85rem; color: #8b91b3; margin-top: 0.25rem; }
    .channel-body { display: grid; grid-template-columns: 1fr 240px; flex: 1; overflow: hidden; }
    .messages-pane { display: flex; flex-direction: column; overflow: hidden; }
    .members-pane  { border-inline-start: 1px solid #1a1f3a; background: #0e1428; overflow-y: auto; }
    @media (max-width: 1024px) { .members-pane { display: none; } }
  `],
})
export class ChannelViewComponent implements OnInit, OnDestroy {
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly state  = inject(CommunityStateService);
  private readonly reverb = inject(ReverbConnectionService);
  private readonly destroyRef = inject(DestroyRef);

  readonly channel = this.state.activeChannel;
  private subscribedChannelId: string | null = null;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => this.resolveChannel(params.get('slug'), params.get('channelId')));
  }

  ngOnDestroy(): void {
    if (this.subscribedChannelId) {
      this.reverb.unsubscribeFromChannel(this.subscribedChannelId);
    }
  }

  private resolveChannel(slug: string | null, channelId: string | null): void {
    if (!slug) return;
    const community = this.state.communities().find(c => c.slug === slug);
    if (!community) return;

    this.state.activeCommunityId.set(community.id);
    if (!this.state.channelsByCommunity()[community.id]) {
      this.state.loadChannels(community.id);
    }
    this.state.loadMembers(community.id);

    // Default to the community's first non-archived channel
    const channels = this.state.channelsByCommunity()[community.id] ?? community.channels ?? [];
    const targetId = channelId ?? channels.find(c => !c.is_archived)?.id ?? null;
    if (!targetId) return;

    this.state.activeChannelId.set(targetId);
    this.state.loadMessages(targetId);

    if (this.subscribedChannelId && this.subscribedChannelId !== targetId) {
      this.reverb.unsubscribeFromChannel(this.subscribedChannelId);
    }
    this.reverb.subscribeToChannel(targetId);
    this.subscribedChannelId = targetId;
  }
}
