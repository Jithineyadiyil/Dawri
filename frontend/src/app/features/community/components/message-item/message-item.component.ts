/**
 * Sprint 15 — A single message: avatar, author, body, reactions, action row.
 * Adds: a quick-reaction emoji picker (add a new reaction) and pin/unpin.
 */
import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message, MessageNode, MemberRole } from '../../models/community.model';
import { CommunityStateService } from '../../services/community-state.service';
import { AuthService } from '../../../../core/services/auth.service';
import { PollDisplayComponent } from '../poll-display/poll-display.component';
import { ImageLightboxComponent } from '../image-lightbox/image-lightbox.component';
import { RoleBadgeComponent } from '../role-badge/role-badge.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { VoicePlayerComponent } from '../../../../shared/components/voice/voice-player.component';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, MessageItemComponent, PollDisplayComponent, ImageLightboxComponent, RoleBadgeComponent, EventCardComponent, VoicePlayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="thread">
    <article class="message" [id]="'msg-' + message.id" [class.deleted]="message.is_deleted" [class.flash]="isFlashed()" [class.is-pinned]="message.is_pinned">
      <div class="avatar">
        <img *ngIf="message.author.avatar" [src]="message.author.avatar" [alt]="message.author.nickname ?? ''" />
        <span *ngIf="!message.author.avatar">{{ initials() }}</span>
      </div>
      <div class="body">
        <div class="reply-ref" *ngIf="message.reply_to">
          <span class="reply-icon">↳</span>
          <span class="reply-author">{{ message.reply_to.author ?? 'Unknown' }}</span>
          <span class="reply-snippet">{{ message.reply_to.snippet }}</span>
        </div>
        <header>
          <span class="nick">{{ message.author.nickname ?? 'Unknown' }}</span>
          <app-role-badge [role]="authorRole()" />
          <time>{{ message.created_at | date:'short' }}</time>
          <span *ngIf="message.edited_at" class="edited">(edited)</span>
          <span *ngIf="message.is_pinned" class="pinned" title="Pinned">📌</span>
        </header>

        <ng-container *ngIf="!editing(); else editForm">
          <p class="content" *ngIf="!message.is_deleted && message.content">{{ message.content }}</p>
          <p class="content removed" *ngIf="message.is_deleted">message removed</p>
          <app-poll-display
            *ngIf="message.poll && !message.is_deleted"
            [poll]="message.poll"
            [channelId]="message.channel_id"
          />
          <app-event-card
            *ngIf="message.event && !message.is_deleted && communityId()"
            [event]="message.event"
            [communityId]="communityId()!"
          />
          <ng-container *ngIf="message.attachments?.length && !message.is_deleted">
            <div class="voice-attach" *ngIf="isAudio(message.attachments![0]); else imageGrid">
              <app-voice-player
                [src]="message.attachments![0].url"
                [durationMs]="message.attachments![0].duration_ms ?? null" />
            </div>
            <ng-template #imageGrid>
              <div
                class="attachments"
                [class.single]="message.attachments!.length === 1"
                [attr.data-count]="message.attachments!.length"
              >
                <button
                  type="button"
                  class="thumb"
                  *ngFor="let a of message.attachments"
                  (click)="openImage(a.url)"
                  [title]="'View image'"
                >
                  <img [src]="a.url" alt="" loading="lazy" />
                </button>
              </div>
            </ng-template>
          </ng-container>
        </ng-container>

        <ng-template #editForm>
          <textarea [(ngModel)]="draft" rows="2"></textarea>
          <div class="edit-actions">
            <button (click)="saveEdit()">Save</button>
            <button class="ghost" (click)="cancelEdit()">Cancel</button>
          </div>
        </ng-template>

        <div class="reactions" *ngIf="message.reactions.length > 0">
          <button *ngFor="let r of message.reactions"
                  class="reaction"
                  [class.just-added]="justReacted() === r.emoji"
                  (click)="toggleReaction(r.emoji)">
            {{ r.emoji }} <span class="count">{{ r.count }}</span>
          </button>
        </div>

        <div class="actions" *ngIf="!message.is_deleted">
          <!-- Add reaction -->
          <div class="react-wrap">
            <button class="ghost" (click)="togglePicker($event)" title="Add reaction">😀﹢</button>
            <div class="picker" *ngIf="pickerOpen()" (click)="$event.stopPropagation()">
              <button *ngFor="let e of quickEmojis" (click)="addReaction(e)">{{ e }}</button>
            </div>
          </div>

          <!-- Reply -->
          <button class="ghost" (click)="reply()">Reply</button>

          <!-- Pin / unpin (author or moderator) -->
          <button *ngIf="canPin()" class="ghost" (click)="togglePin()">
            {{ message.is_pinned ? 'Unpin' : 'Pin' }}
          </button>

          <!-- Author-only edit/delete -->
          <ng-container *ngIf="message.author.is_self">
            <button class="ghost" (click)="startEdit()">Edit</button>
            <button class="ghost" (click)="delete()">Delete</button>
          </ng-container>
        </div>
      </div>
    </article>

      <div class="replies" *ngIf="replies.length > 0" [class.capped]="depth >= maxIndentDepth">
        <app-message-item
          *ngFor="let child of replies; trackBy: trackChild"
          [message]="child.message"
          [replies]="child.children"
          [depth]="depth + 1"
        />
      </div>
    </div>

    <app-image-lightbox
      *ngIf="lightboxSrc() as src"
      [src]="src"
      (close)="closeImage()"
    />
  `,
  styles: [`
    :host {
      --accent:   #7c3aed;
      --accent-s: #a78bfa;
      --surface:  #161228;
      --raised:   #1c1833;
      --line:     rgba(255,255,255,0.07);
      --text:     #eaeaf2;
      --mut:      #7a7a92;
      --gold:     #d4af37;
    }
    .thread { display: block; }
    .replies {
      margin-left: 21px;
      padding-left: 0.85rem;
      border-left: 2px solid rgba(124,58,237,0.22);
    }
    .replies.capped { margin-left: 0; padding-left: 0; border-left: none; }
    .message { display: grid; grid-template-columns: 42px 1fr; gap: 0.75rem; padding: 0.45rem 0.65rem; border-radius: 8px; border-left: 2px solid transparent; transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease; }
    .message:hover { background: var(--surface); border-left-color: rgba(124,58,237,0.55); box-shadow: inset 3px 0 20px rgba(124,58,237,0.08); }
    .message.is-pinned { border-left-color: var(--gold) !important; animation: pinGlow 3s ease-in-out infinite; }
    .message.is-pinned:hover { box-shadow: inset 3px 0 20px rgba(212,175,55,0.12); }
    .message.flash { animation: flashHi 2s ease-out; }
    @keyframes flashHi {
      0%, 25% { background: rgba(124,58,237,0.2); border-left-color: var(--accent); }
      100% { background: transparent; border-left-color: transparent; }
    }
    @keyframes msgSlideIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes reactionPop {
      0%   { transform: scale(0.5); opacity: 0; }
      60%  { transform: scale(1.25); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pinGlow {
      0%,100% { box-shadow: 2px 0 12px rgba(212,175,55,.15); }
      50%      { box-shadow: 2px 0 24px rgba(212,175,55,.35); }
    }
    :host { animation: msgSlideIn .25s ease both; }
    .message.deleted { opacity: 0.5; }
    .avatar { width: 42px; height: 42px; border-radius: 12px; background: var(--raised); display: grid; place-items: center; color: var(--accent-s); font-family: 'Anton', 'Bebas Neue', sans-serif; box-shadow: inset 0 0 0 1px rgba(124,58,237,0.3); }
    .avatar img { width: 100%; height: 100%; border-radius: inherit; object-fit: cover; }
    header { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }
    .reply-ref { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: #7a7a92; margin-bottom: 0.15rem; padding-left: 0.1rem; }
    .reply-icon { color: var(--accent-s); opacity: 0.8; }
    .reply-author { font-weight: 600; color: #9a9ab0; }
    .reply-snippet { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%; opacity: 0.8; }
    .nick { font-weight: 700; color: var(--text); }
    time { font-size: 0.72rem; color: var(--mut); font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .edited { font-size: 0.72rem; color: var(--mut); font-style: italic; }
    .pinned { font-size: 0.85rem; }
    .content { margin: 0.2rem 0 0; color: #d0d0e8; white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; font-size: 0.9rem; }
    .voice-attach { margin-top: 0.4rem; display: inline-flex; padding: 8px 12px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; }
    .attachments { margin-top: 0.4rem; display: grid; gap: 4px; max-width: 420px; grid-template-columns: repeat(2, 1fr); }
    .attachments.single { display: block; max-width: 340px; }
    .attachments[data-count="3"] .thumb:first-child { grid-column: span 2; }
    .thumb { padding: 0; border: none; background: #110f1e; border-radius: 8px; overflow: hidden; cursor: pointer; aspect-ratio: 1 / 1; }
    .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.18s ease; }
    .attachments.single .thumb { display: inline-block; aspect-ratio: auto; background: transparent; max-width: 340px; max-height: 340px; }
    .attachments.single .thumb img { width: auto; height: auto; max-width: 340px; max-height: 340px; object-fit: contain; }
    .thumb:hover img { transform: scale(1.03); }
    .content.removed { font-style: italic; color: var(--mut); }
    .reactions { display: flex; gap: 0.3rem; margin-top: 0.45rem; flex-wrap: wrap; }
    .reaction { padding: 0.12rem 0.55rem; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.25); border-radius: 999px; color: #cfcfe0; cursor: pointer; font-size: 0.82rem; transition: border-color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease, transform 0.12s ease; }
    .reaction:hover { border-color: var(--accent); background: rgba(124,58,237,0.18); box-shadow: 0 0 10px rgba(124,58,237,0.3); transform: scale(1.08); }
    .reaction.just-added { animation: reactionPop .3s cubic-bezier(.34,1.56,.64,1) both; }
    .count { font-size: 0.72rem; font-weight: 700; margin-inline-start: 0.25rem; color: var(--accent-s); }
    .actions { display: flex; gap: 0.5rem; margin-top: 0.35rem; opacity: 0; transition: opacity 0.15s; align-items: center; }
    .message:hover .actions { opacity: 1; }
    .react-wrap { position: relative; }
    .picker {
      position: absolute; bottom: 100%; left: 0; z-index: 20; margin-bottom: 0.25rem;
      background: #110f1e; border: 1px solid rgba(124,58,237,0.3); border-radius: 10px; padding: 0.35rem;
      display: flex; gap: 0.15rem; box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(124,58,237,0.15);
    }
    .picker button { background: none; border: none; cursor: pointer; font-size: 1.15rem; padding: 0.2rem; border-radius: 6px; }
    .picker button:hover { background: var(--surface); }
    .ghost { background: transparent; border: none; color: var(--mut); cursor: pointer; font-size: 0.76rem; font-family: 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.02em; padding: 0.15rem 0.3rem; border-radius: 4px; transition: color 0.13s, background 0.13s; }
    .ghost:hover { color: var(--accent-s); background: rgba(124,58,237,0.1); }
    textarea { width: 100%; padding: 0.5rem; background: #0b0a14; color: var(--text); border: 1px solid rgba(124,58,237,0.3); border-radius: 8px; resize: vertical; outline: none; }
    textarea:focus { border-color: var(--accent); }
    .edit-actions { display: flex; gap: 0.5rem; margin-top: 0.3rem; }
    button:not(.ghost):not(.reaction):not(.picker button):not(.thumb) { padding: 0.28rem 0.75rem; background: var(--accent); color: #fff; border: none; border-radius: 7px; cursor: pointer; font-weight: 700; font-size: 0.82rem; transition: background 0.14s, box-shadow 0.14s; }
    button:not(.ghost):not(.reaction):not(.picker button):not(.thumb):hover { background: #6d28d9; box-shadow: 0 0 14px rgba(124,58,237,0.4); }
  `],
})
export class MessageItemComponent {
  @Input({ required: true }) message!: Message;
  /** Nested replies to this message (built by the message list). */
  @Input() replies: MessageNode[] = [];
  /** Nesting depth; 0 = top-level. Indentation is capped at maxIndentDepth. */
  @Input() depth = 0;

  /** Beyond this depth, replies stop indenting further to avoid squishing. */
  readonly maxIndentDepth = 4;

  trackChild(_idx: number, node: MessageNode): string {
    return node.message.id;
  }

  private readonly state = inject(CommunityStateService);

  /** True when this message is the one a moderator jumped to (brief flash). */
  isFlashed(): boolean {
    return this.state.flashedMessageId() === this.message.id;
  }

  /** The author's role in this community (for the badge), or null. */
  authorRole(): MemberRole | null {
    const id = this.message.author.id;
    return id ? (this.state.roleByUser()[id] ?? null) : null;
  }

  /** Active community id (for the inline event card). */
  communityId(): string | null {
    return this.state.activeCommunityId();
  }

  private readonly auth  = inject(AuthService);

  readonly editing = signal(false);
  readonly pickerOpen = signal(false);
  readonly justReacted = signal<string | null>(null);
  draft = '';

  /** A small set of common reactions for the quick picker. */
  readonly quickEmojis = ['👍', '❤️', '😂', '🎉', '🔥', '😮', '😢', '👏'];

  initials(): string {
    return (this.message.author.nickname ?? '?').slice(0, 2).toUpperCase();
  }

  /**
   * Pin permission: the message author, or a moderator/admin/owner of the
   * active community, or a platform admin. (Server enforces the real rule.)
   */
  canPin(): boolean {
    if (this.message.author.is_self) return true;
    if (this.auth.currentUser()?.role === 'admin') return true;
    const communityId = this.state.activeCommunityId();
    const myId = this.auth.currentUser()?.id;
    if (!communityId || !myId) return false;
    const me = (this.state.membersByCommunity()[communityId] ?? []).find(m => m.user.id === myId);
    return !!me && (me.role === 'owner' || me.role === 'admin' || me.role === 'moderator');
  }

  startEdit(): void {
    this.draft = this.message.content ?? '';
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
    this.draft = '';
  }

  saveEdit(): void {
    if (this.draft.trim().length === 0) return;
    this.state.edit(this.message.id, this.draft);
    this.editing.set(false);
  }

  delete(): void {
    if (!confirm('Delete this message?')) return;
    this.state.delete(this.message);
  }

  toggleReaction(emoji: string): void {
    const currentUserId = this.auth.currentUser()?.id ?? '';
    this.state.toggleReaction(this.message, emoji, currentUserId);
    this.justReacted.set(emoji);
    setTimeout(() => this.justReacted.set(null), 400);
  }

  togglePicker(ev: Event): void {
    ev.stopPropagation();
    this.pickerOpen.update(v => !v);
  }

  addReaction(emoji: string): void {
    const currentUserId = this.auth.currentUser()?.id ?? '';
    // Only add if the user hasn't already reacted with this emoji.
    const mine = this.message.reactions.find(r => r.emoji === emoji)?.users.includes(currentUserId);
    if (!mine) {
      this.state.toggleReaction(this.message, emoji, currentUserId);
    }
    this.pickerOpen.set(false);
  }

  togglePin(): void {
    this.state.togglePin(this.message);
  }

  reply(): void {
    this.state.setReplyTo(this.message);
  }

  /** Full-size image lightbox state. */
  readonly lightboxSrc = signal<string | null>(null);

  openImage(url: string): void {
    this.lightboxSrc.set(url);
  }

  /** True if an attachment is a voice note (audio), not an image. */
  isAudio(a: { mime?: string } | undefined): boolean {
    return !!a?.mime && a.mime.startsWith('audio/');
  }

  closeImage(): void {
    this.lightboxSrc.set(null);
  }
}
