/**
 * Sprint 15 — Message composer (textarea + send button + emoji picker).
 * Submits on Enter, newline on Shift+Enter.
 */
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';
import { ReactionPickerComponent } from '../reaction-picker/reaction-picker.component';

@Component({
  selector: 'app-message-composer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactionPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="composer">
      <button class="emoji-btn" (click)="togglePicker()" title="Insert emoji">😊</button>
      <app-reaction-picker
        *ngIf="pickerOpen()"
        (pick)="insertEmoji($event)"
        (close)="pickerOpen.set(false)"
      />
      <textarea
        [(ngModel)]="content"
        (keydown)="onKey($event)"
        [disabled]="!canPost() || isPosting()"
        [placeholder]="placeholder()"
        rows="1"
      ></textarea>
      <button class="send" (click)="send()" [disabled]="!canSend()">Send</button>
    </div>
  `,
  styles: [`
    .composer {
      position: relative;
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid #1a1f3a;
      background: #060810;
      flex-shrink: 0;
      align-items: flex-end;
    }
    textarea {
      flex: 1;
      padding: 0.6rem;
      background: #0e1428;
      color: #e6e8f5;
      border: 1px solid #1a1f3a;
      border-radius: 6px;
      resize: none;
      font-family: inherit;
      font-size: 0.9rem;
      min-height: 38px;
      max-height: 180px;
    }
    textarea:focus { outline: 2px solid var(--cyan, #00e5ff); outline-offset: -1px; }
    button { background: var(--cyan, #00e5ff); color: #060810; border: none; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; font-weight: 700; }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
    .emoji-btn { background: transparent; color: #8b91b3; font-size: 1.25rem; padding: 0 0.5rem; }
    .send:hover { background: var(--gold, #f0a500); }
  `],
})
export class MessageComposerComponent {
  private readonly state = inject(CommunityStateService);

  content = '';
  readonly pickerOpen = signal(false);
  readonly isPosting  = this.state.isPosting;

  readonly channel    = this.state.activeChannel;
  readonly placeholder = computed(() => {
    const c = this.channel();
    return c ? `Message #${c.name}` : 'Select a channel';
  });

  readonly canPost = computed(() => {
    const c = this.channel();
    return !!c && !c.is_archived;
  });

  readonly canSend = computed(() => this.canPost() && this.content.trim().length > 0 && !this.isPosting());

  onKey(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      this.send();
    }
  }

  send(): void {
    if (!this.canSend()) return;
    const channelId = this.state.activeChannelId();
    if (!channelId) return;
    this.state.post(channelId, this.content.trim());
    this.content = '';
  }

  togglePicker(): void {
    this.pickerOpen.update(v => !v);
  }

  insertEmoji(emoji: string): void {
    this.content += emoji;
    this.pickerOpen.set(false);
  }
}
