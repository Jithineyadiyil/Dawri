/**
 * Sprint 15 — The scrolling message feed (newest at bottom).
 * Auto-scrolls to bottom on new message unless user has scrolled up.
 * Phase 1b: messages render as nested threads — replies are grouped under
 * their parent. Top-level messages stay in chronological order; each
 * message renders its own replies recursively (indent capped in the item).
 */
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { MessageItemComponent } from '../message-item/message-item.component';
import { Message, MessageNode } from '../../models/community.model';

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
          *ngFor="let node of threadRoots(); trackBy: trackById"
          [message]="node.message"
          [replies]="node.children"
          [depth]="0"
        />
      </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; flex: 1; min-height: 0; }
    .scroller { flex: 1; overflow-y: auto; padding: 1rem; min-height: 0; }
    .messages-reversed { display: flex; flex-direction: column; gap: 0.25rem; }
    .loading, .load-more {
      display: block;
      margin: 0 auto 0.5rem;
      padding: 0.5rem 1rem;
      color: #7a7a92;
      background: transparent;
      border: 1px solid #16161f;
      border-radius: 6px;
      cursor: pointer;
    }
    .load-more:hover { color: #00ffa3; border-color: #00ffa3; }
  `],
})
export class MessageListComponent {
  private readonly state = inject(CommunityStateService);
  @ViewChild('scroller', { static: true }) scroller!: ElementRef<HTMLDivElement>;

  readonly isLoading = this.state.isLoadingMessages;

  /**
   * Build a reply tree from the flat message list.
   *
   * Top-level nodes = messages with no parent OR whose parent isn't currently
   * loaded (so a reply whose parent is on an older, unfetched page still shows
   * — it keeps its "reply to" reference for context). Children and roots are
   * sorted chronologically.
   */
  readonly threadRoots = computed<MessageNode[]>(() => {
    const all = this.state.activeMessages();
    const byId = new Map<string, Message>();
    for (const m of all) byId.set(m.id, m);

    const childrenOf = new Map<string, Message[]>();
    const roots: Message[] = [];

    for (const m of all) {
      const parentLoaded = m.reply_to != null && byId.has(m.reply_to.id);
      if (parentLoaded) {
        const pid = m.reply_to!.id;
        const arr = childrenOf.get(pid) ?? [];
        arr.push(m);
        childrenOf.set(pid, arr);
      } else {
        roots.push(m);
      }
    }

    const byTime = (a: Message, b: Message) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

    const build = (msg: Message): MessageNode => ({
      message: msg,
      children: (childrenOf.get(msg.id) ?? []).sort(byTime).map(build),
    });

    return roots.sort(byTime).map(build);
  });

  readonly hasMore = computed(() => {
    const id = this.state.activeChannelId();
    return id ? !!this.state.cursorByChannel()[id] : false;
  });

  private autoScroll = true;

  constructor() {
    effect(() => {
      const roots = this.threadRoots();
      if (roots.length === 0) return;
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

  trackById(_idx: number, node: MessageNode): string {
    return node.message.id;
  }

  private scrollToBottom(): void {
    const el = this.scroller.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
