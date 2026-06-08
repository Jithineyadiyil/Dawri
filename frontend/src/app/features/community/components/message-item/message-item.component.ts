/**
 * Sprint 15 — A single message: avatar, author, body, reactions, action row.
 */
import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/community.model';
import { CommunityStateService } from '../../services/community-state.service';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="message" [class.deleted]="message.is_deleted">
      <div class="avatar">
        <img *ngIf="message.author.avatar" [src]="message.author.avatar" [alt]="message.author.nickname ?? ''" />
        <span *ngIf="!message.author.avatar">{{ initials() }}</span>
      </div>
      <div class="body">
        <header>
          <span class="nick">{{ message.author.nickname ?? 'Unknown' }}</span>
          <time>{{ message.created_at | date:'short' }}</time>
          <span *ngIf="message.edited_at" class="edited">(edited)</span>
          <span *ngIf="message.is_pinned" class="pinned">📌</span>
        </header>

        <ng-container *ngIf="!editing(); else editForm">
          <p class="content" *ngIf="!message.is_deleted">{{ message.content }}</p>
          <p class="content removed" *ngIf="message.is_deleted">message removed</p>
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
                  (click)="toggleReaction(r.emoji)">
            {{ r.emoji }} <span class="count">{{ r.count }}</span>
          </button>
        </div>

        <div class="actions" *ngIf="!message.is_deleted && message.author.is_self">
          <button class="ghost" (click)="startEdit()">Edit</button>
          <button class="ghost" (click)="delete()">Delete</button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .message { display: grid; grid-template-columns: 40px 1fr; gap: 0.75rem; padding: 0.5rem; border-radius: 6px; }
    .message:hover { background: #0e1428; }
    .message.deleted { opacity: 0.5; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; background: #1a1f3a; display: grid; place-items: center; color: var(--gold, #f0a500); font-family: 'Bebas Neue', sans-serif; }
    .avatar img { width: 100%; height: 100%; border-radius: inherit; object-fit: cover; }
    header { display: flex; align-items: baseline; gap: 0.5rem; }
    .nick { font-weight: 700; color: #e6e8f5; }
    time { font-size: 0.75rem; color: #8b91b3; }
    .edited { font-size: 0.75rem; color: #8b91b3; font-style: italic; }
    .pinned { font-size: 0.85rem; }
    .content { margin: 0.25rem 0 0; color: #c8cbe0; white-space: pre-wrap; word-wrap: break-word; }
    .content.removed { font-style: italic; color: #8b91b3; }
    .reactions { display: flex; gap: 0.25rem; margin-top: 0.4rem; flex-wrap: wrap; }
    .reaction { padding: 0.15rem 0.5rem; background: #1a1f3a; border: 1px solid #2a2f4d; border-radius: 999px; color: #c8cbe0; cursor: pointer; font-size: 0.85rem; }
    .reaction:hover { border-color: var(--cyan, #00e5ff); }
    .count { font-size: 0.75rem; font-weight: 600; margin-inline-start: 0.25rem; }
    .actions { display: flex; gap: 0.5rem; margin-top: 0.4rem; opacity: 0; transition: opacity 0.15s; }
    .message:hover .actions { opacity: 1; }
    .ghost { background: transparent; border: none; color: #8b91b3; cursor: pointer; font-size: 0.8rem; }
    .ghost:hover { color: var(--cyan, #00e5ff); }
    textarea { width: 100%; padding: 0.5rem; background: #060810; color: #e6e8f5; border: 1px solid #1a1f3a; border-radius: 4px; resize: vertical; }
    .edit-actions { display: flex; gap: 0.5rem; margin-top: 0.25rem; }
    button:not(.ghost):not(.reaction) { padding: 0.3rem 0.75rem; background: var(--cyan, #00e5ff); color: #060810; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; }
  `],
})
export class MessageItemComponent {
  @Input({ required: true }) message!: Message;

  private readonly state = inject(CommunityStateService);

  readonly editing = signal(false);
  draft = '';

  initials(): string {
    return (this.message.author.nickname ?? '?').slice(0, 2).toUpperCase();
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
    const currentUserId = localStorage.getItem('dawri_user_id') ?? '';
    this.state.toggleReaction(this.message, emoji, currentUserId);
  }
}
