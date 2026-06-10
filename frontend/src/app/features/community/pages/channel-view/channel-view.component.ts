/**
 * Sprint 15 — The message panel: header + scrolling feed + composer.
 *
 * Hydrates messages when the route channelId changes, subscribes to the
 * Reverb presence channel, marks the channel read, loads pinned messages,
 * and unsubscribes on teardown.
 */
import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommunityStateService } from '../../services/community-state.service';
import { ReverbConnectionService } from '../../services/reverb-connection.service';
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { MessageComposerComponent } from '../../components/message-composer/message-composer.component';
import { MemberListComponent } from '../../components/member-list/member-list.component';
import { EventsPanelComponent } from '../../components/events-panel/events-panel.component';
import { RulesModalComponent } from '../../components/rules-modal/rules-modal.component';
import { ManagePanelComponent } from '../../components/manage-panel/manage-panel.component';
import { AuthService } from '../../../../core/services/auth.service';
import { JoinPolicy } from '../../models/community.model';
import { Message } from '../../models/community.model';

@Component({
  selector: 'app-channel-view',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageComposerComponent, MemberListComponent, EventsPanelComponent, RulesModalComponent, ManagePanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="channel-header">
      <div class="channel-row">
        <div>
          <div class="channel-title">
            <span class="hash">#</span>{{ channel()?.name }}
          </div>
          <div class="channel-topic">{{ channel()?.topic }}</div>
        </div>
        <div class="channel-tools">
          <button
            *ngIf="pinned().length > 0"
            class="pin-toggle"
            (click)="showPinned.set(!showPinned())"
            title="Pinned messages"
          >📌 {{ pinned().length }}</button>
          <button
            class="events-toggle"
            (click)="showEvents.set(true)"
            title="Community events"
          >📅 Events</button>
          <button
            class="rules-toggle"
            (click)="showRules.set(true)"
            title="Community rules"
          >📜 Rules</button>
          <button
            *ngIf="canManageJoin()"
            class="manage-toggle"
            (click)="showManage.set(true)"
            title="Manage community"
          >🛡️ Manage</button>
        </div>
      </div>

      <div class="pinned-panel" *ngIf="showPinned() && pinned().length > 0">
        <div class="pinned-head">Pinned messages</div>
        <ul>
          <li *ngFor="let p of pinned()">
            <span class="pin-author">{{ p.author.nickname ?? 'Unknown' }}:</span>
            <span class="pin-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </header>

    <div class="channel-body">
      <div class="messages-pane">
        <app-message-list />
        <app-message-composer />
      </div>
      <app-member-list class="members-pane" />
    </div>

    <app-events-panel
      *ngIf="showEvents() && communityId()"
      [communityId]="communityId()!"
      (close)="showEvents.set(false)"
    />

    <app-manage-panel
      *ngIf="showManage() && communityId()"
      [communityId]="communityId()!"
      [initialPolicy]="joinPolicy()"
      (close)="showManage.set(false)"
      (jumpToMessage)="onJumpToMessage($event)"
    />

    <app-rules-modal
      *ngIf="showRules() && communityId()"
      [communityId]="communityId()!"
      (close)="showRules.set(false)"
    />
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; min-height: 0; }
    .channel-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      background: #0a0a12;
      flex-shrink: 0;
    }
    .channel-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
    .channel-tools { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; justify-content: flex-end; flex-shrink: 0; }
    .channel-title {
      font-family: 'Anton', 'Bebas Neue', sans-serif; text-transform: uppercase;
      font-size: 1.25rem;
      letter-spacing: 0.05em;
      color: #eaeaf2;
    }
    .hash { opacity: 0.6; margin-inline-end: 0.25rem; color: #00ffa3; }
    .channel-topic { font-size: 0.82rem; color: #7a7a92; margin-top: 0.25rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .pin-toggle {
      background: #16161f; border: 1px solid rgba(0,255,163,0.25); color: #00ffa3;
      border-radius: 999px; padding: 0.2rem 0.6rem; cursor: pointer; font-size: 0.8rem;
      white-space: nowrap;
    }
    .pin-toggle:hover { border-color: #eaeaf2; }
    .events-toggle {
      background: #16161f; border: 1px solid rgba(0,255,163,0.25); color: #00ffa3;
      border-radius: 999px; padding: 0.2rem 0.7rem; cursor: pointer; font-size: 0.8rem;
      white-space: nowrap; font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .events-toggle:hover { border-color: #00ffa3; box-shadow: 0 0 12px rgba(0,255,163,0.25); }
    .rules-toggle {
      background: #16161f; border: 1px solid rgba(255,255,255,0.18); color: #cfcfe0;
      border-radius: 999px; padding: 0.2rem 0.7rem; cursor: pointer; font-size: 0.8rem;
      white-space: nowrap; font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .rules-toggle:hover { border-color: #eaeaf2; }
    .manage-toggle {
      background: #16161f; border: 1px solid rgba(255,107,107,0.3); color: #ff8a8a;
      border-radius: 999px; padding: 0.2rem 0.7rem; cursor: pointer; font-size: 0.8rem;
      white-space: nowrap; font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .manage-toggle:hover { border-color: #ff6b6b; box-shadow: 0 0 12px rgba(255,107,107,0.25); }
    .pinned-panel {
      margin-top: 0.6rem; background: #0d0d17; border: 1px solid rgba(255,255,255,0.07);
      border-radius: 8px; padding: 0.5rem 0.75rem; max-height: 180px; overflow-y: auto;
    }
    .pinned-head { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: #00ffa3; margin-bottom: 0.4rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .pinned-panel ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }
    .pinned-panel li { font-size: 0.82rem; color: #c8cbe0; }
    .pin-author { font-weight: 700; color: #e6e8f5; margin-inline-end: 0.35rem; }
    .pin-content { white-space: pre-wrap; word-wrap: break-word; }
    .channel-body { display: grid; grid-template-columns: 1fr 240px; flex: 1; overflow: hidden; min-height: 0; }
    .messages-pane { display: flex; flex-direction: column; overflow: hidden; min-height: 0; }
    .members-pane  { border-inline-start: 1px solid rgba(255,255,255,0.07); background: #0d0d17; overflow-y: auto; }
    @media (max-width: 1024px) { .members-pane { display: none; } }
  `],
})
export class ChannelViewComponent implements OnInit, OnDestroy {
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly state  = inject(CommunityStateService);
  private readonly auth   = inject(AuthService);
  private readonly reverb = inject(ReverbConnectionService);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Phase 7 — open the Manage panel when the channel-list gear requests it.
   * Skips the initial value so it doesn't auto-open on load.
   */
  private manageSeen = 0;
  private readonly manageEffect = effect(() => {
    const n = this.state.manageRequested();
    if (n > this.manageSeen) {
      this.manageSeen = n;
      if (this.canManageJoin()) this.showManage.set(true);
    }
  });

  readonly channel = this.state.activeChannel;
  readonly showPinned = signal(false);
  readonly showEvents = signal(false);
  readonly showManage = signal(false);

  /**
   * Phase 6 — jump to a flagged message. Switches channel if needed, then
   * scrolls to and flashes the message. Closes the admin panel first.
   */
  onJumpToMessage(payload: { channelId: string; messageId: string }): void {
    this.showManage.set(false);
    const slug = this.state.activeCommunity()?.slug;
    const currentChannel = this.state.activeChannelId();

    const scrollToIt = () => {
      // Allow the channel's messages to render, then scroll + flash.
      setTimeout(() => {
        const el = document.getElementById('msg-' + payload.messageId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        this.state.flashMessage(payload.messageId);
      }, 400);
    };

    if (currentChannel === payload.channelId) {
      scrollToIt();
    } else if (slug) {
      // Navigate to the target channel, then scroll once it loads.
      this.router.navigate(['/community', slug, 'channel', payload.channelId]).then(scrollToIt);
    }
  }
  readonly showRules = signal(false);

  /** Active community id (for the events panel). */
  readonly communityId = this.state.activeCommunityId;

  /** Current community's join policy (defaults to closed if unknown). */
  joinPolicy(): JoinPolicy {
    return (this.state.activeCommunity()?.join_policy ?? 'closed') as JoinPolicy;
  }

  /** Moderators+ (or platform admin) can open join settings. */
  canManageJoin(): boolean {
    const me = this.auth.currentUser();
    if (!me) return false;
    if (me.role === 'admin') return true;
    const cid = this.communityId();
    if (!cid) return false;
    const member = (this.state.membersByCommunity()[cid] ?? []).find(m => m.user.id === me.id);
    return !!member && (member.role === 'owner' || member.role === 'admin' || member.role === 'moderator');
  }

  /** Pinned messages for the currently active channel. */
  readonly pinned = computed<Message[]>(() => {
    const id = this.state.activeChannelId();
    return id ? (this.state.pinnedByChannel()[id] ?? []) : [];
  });

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

    const switchingCommunity = this.state.activeCommunityId() !== community.id;
    this.state.activeCommunityId.set(community.id);
    this.state.loadMembers(community.id);

    // When switching to a different community without a specific channel in the
    // URL, drop any channel still selected from the previous community —
    // otherwise activeChannel can't resolve it (blank header / "Select a
    // channel") and the first-channel auto-select is skipped.
    if (switchingCommunity && !channelId) {
      this.state.activeChannelId.set(null);
    }

    const loaded = this.state.channelsByCommunity()[community.id];

    // If channels aren't loaded yet, load them. When no specific channel was
    // requested in the URL, ask loadChannels to auto-select the first one once
    // the response arrives (otherwise the first paint has no channel and the
    // message area stays blank until the user navigates).
    if (!loaded) {
      this.state.loadChannels(community.id, !channelId);
      if (!channelId) return; // first channel will be selected + loaded on arrival
    }

    // Default to the community's first non-archived channel
    const channels = loaded ?? community.channels ?? [];
    const targetId = channelId ?? channels.find(c => !c.is_archived)?.id ?? null;
    if (!targetId) return;

    this.state.activeChannelId.set(targetId);
    this.state.loadMessages(targetId);
    this.state.loadPinned(targetId);
    this.state.markChannelRead(targetId);
    this.showPinned.set(false);

    if (this.subscribedChannelId && this.subscribedChannelId !== targetId) {
      this.reverb.unsubscribeFromChannel(this.subscribedChannelId);
    }
    this.reverb.subscribeToChannel(targetId);
    this.subscribedChannelId = targetId;
  }
}
