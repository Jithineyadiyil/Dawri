/**
 * Sprint 15 — The message panel: header + scrolling feed + composer.
 *
 * Hydrates messages when the route channelId changes, subscribes to the
 * Reverb presence channel, marks the channel read, loads pinned messages,
 * and unsubscribes on teardown.
 */
import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
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
        <div class="channel-id">
          <div class="channel-title">
            <span class="hash">#</span>{{ channel()?.name }}
          </div>
          <div class="channel-topic">{{ channel()?.topic }}</div>
        </div>
        <div class="channel-tools">
          <button
            *ngIf="pinned().length > 0"
            class="tool-btn pin-toggle"
            (click)="showPinned.set(!showPinned())"
            title="Pinned messages"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
            {{ pinned().length }}
          </button>
          <button
            class="tool-btn events-toggle"
            (click)="showEvents.set(true)"
            title="Community events"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Events
          </button>
          <button
            class="tool-btn rules-toggle"
            (click)="showRules.set(true)"
            title="Community rules"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Rules
          </button>
          <button
            *ngIf="canManageJoin()"
            class="tool-btn manage-toggle"
            (click)="showManage.set(true)"
            title="Manage community"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Manage
          </button>
        </div>
      </div>

      <div class="pinned-panel" *ngIf="showPinned() && pinned().length > 0">
        <div class="pinned-head">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
          Pinned messages
        </div>
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
      padding: 0.7rem 1.1rem;
      border-bottom: 1px solid rgba(124,58,237,0.18);
      background: #0e0c1a;
      flex-shrink: 0;
    }
    .channel-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .channel-id { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
    .channel-tools { display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; justify-content: flex-end; flex-shrink: 0; }
    .channel-title {
      font-family: 'Anton', 'Bebas Neue', sans-serif; text-transform: uppercase;
      font-size: 1.2rem; letter-spacing: 0.05em; color: #eaeaf2;
      display: flex; align-items: center;
    }
    .hash { margin-inline-end: 0.2rem; color: #7c3aed; opacity: 0.9; }
    .channel-topic { font-size: 0.78rem; color: #7a7a92; font-family: 'JetBrains Mono', ui-monospace, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .tool-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.22);
      color: #a78bfa; border-radius: 8px; padding: 0.3rem 0.65rem;
      cursor: pointer; font-size: 0.78rem; font-family: 'JetBrains Mono', ui-monospace, monospace;
      white-space: nowrap; transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
    }
    .tool-btn:hover { background: rgba(124,58,237,0.18); border-color: #7c3aed; box-shadow: 0 0 12px rgba(124,58,237,0.25); color: #c4b5fd; }
    .manage-toggle { border-color: rgba(124,58,237,0.35); }
    .pinned-panel {
      margin-top: 0.6rem; background: rgba(124,58,237,0.07); border: 1px solid rgba(124,58,237,0.2);
      border-radius: 10px; padding: 0.55rem 0.85rem; max-height: 180px; overflow-y: auto;
    }
    .pinned-head {
      display: flex; align-items: center; gap: 0.35rem;
      font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em;
      color: #a78bfa; margin-bottom: 0.45rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .pinned-panel ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }
    .pinned-panel li { font-size: 0.82rem; color: #c8cbe0; }
    .pin-author { font-weight: 700; color: #e6e8f5; margin-inline-end: 0.35rem; }
    .pin-content { white-space: pre-wrap; word-wrap: break-word; }
    .channel-body { display: grid; grid-template-columns: 1fr 240px; flex: 1; overflow: hidden; min-height: 0; }
    .messages-pane { display: flex; flex-direction: column; overflow: hidden; min-height: 0; }
    .members-pane  { border-inline-start: 1px solid rgba(124,58,237,0.15); background: #110f1e; overflow-y: auto; }
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

  /**
   * When resolveChannel() fires before communities are loaded (common on first
   * navigation), these hold the pending params so the retry effect can replay
   * them once the communities signal populates.
   */
  private pendingSlug: string | null = null;
  private pendingChannelId: string | null = null;

  constructor() {
    /**
     * Retry resolution whenever the communities list changes.
     * This fires the very first time communities finish loading (HTTP response)
     * and resolves the blank-tab race condition: route params arrive before the
     * communities array is populated, resolveChannel() bails early, and without
     * this effect it would never be retried.
     */
    effect(() => {
      const communities = this.state.communities();
      if (communities.length > 0 && this.pendingSlug) {
        // Run outside the effect's reactive context so it doesn't create
        // tracked dependencies that would cause infinite re-runs.
        untracked(() => {
          const slug = this.pendingSlug;
          const channelId = this.pendingChannelId;
          this.pendingSlug = null;
          this.pendingChannelId = null;
          this.resolveChannel(slug, channelId);
        });
      }
    });
  }

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
    if (!community) {
      // Communities not loaded yet — park the params; the effect() will retry
      // once the communities signal populates (fixes blank tab on first visit).
      this.pendingSlug = slug;
      this.pendingChannelId = channelId;
      return;
    }
    // Successfully resolved — clear any parked params.
    this.pendingSlug = null;
    this.pendingChannelId = null;

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
