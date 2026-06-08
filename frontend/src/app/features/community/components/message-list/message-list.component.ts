/**
 * Sprint 15 — The scrolling message feed (newest at bottom).
 * Auto-scrolls to bottom on new message unless user has scrolled up.
 */
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #scroller class="scroller" (scroll)="onScroll()">
      <div class="loading" *ngIf="isLoading()">Loading messages…</div>

      <button class="load-more" *ngIf="hasMore() && !isLoading()" (click)="loadMore()">
        Load older messages
      </button>

      <div class="messages-reversed">
        <app-message-item
          *ngFor="let msg of messagesReversed(); trackBy: trackById"
          [message]="msg"
        />
      </div>
    </div>
  `,
  styles: [`
    .scroller { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; }
    .messages-reversed { display: flex; flex-direction: column; gap: 0.25rem; }
    .loading, .load-more {
      align-self: center;
      padding: 0.5rem 1rem;
      color: #8b91b3;
      background: transparent;
      border: 1px solid #1a1f3a;
      border-radius: 6px;
      cursor: pointer;
    }
    .load-more:hover { color: var(--cyan, #00e5ff); border-color: var(--cyan, #00e5ff); }
  `],
})
export class MessageListComponent {
  private readonly state = inject(CommunityStateService);
  @ViewChild('scroller', { static: true }) scroller!: ElementRef<HTMLDivElement>;

  readonly isLoading = this.state.isLoadingMessages;
  // Backend returns newest-first; reverse for chronological display
  readonly messagesReversed = computed(() => [...this.state.activeMessages()].reverse());
  readonly hasMore = computed(() => {
    const id = this.state.activeChannelId();
    return id ? !!this.state.cursorByChannel()[id] : false;
  });

  private autoScroll = true;

  constructor() {
    effect(() => {
      // Re-run whenever messages change
      const msgs = this.messagesReversed();
      if (msgs.length === 0) return;
      if (this.autoScroll) queueMicrotask(() => this.scrollToBottom());
    });
  }

  loadMore(): void {
    const id = this.state.activeChannelId();
    if (id) this.state.loadMessages(id, true);
  }

  onScroll(): void {
    const el = this.scroller.nativeElement;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    this.autoScroll = nearBottom;
  }

  trackById(_idx: number, msg: { id: string }): string {
    return msg.id;
  }

  private scrollToBottom(): void {
    const el = this.scroller.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
