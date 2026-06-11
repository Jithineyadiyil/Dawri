/**
 * Sprint 15 — Message composer. Uses the mention-aware textarea so typing
 * "@" surfaces member autocomplete; keeps the emoji insert picker and the
 * Enter-to-send / Shift+Enter-newline behaviour (handled inside the mention
 * textarea, surfaced here via the (submit) output).
 */
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';
import { ReactionPickerComponent } from '../reaction-picker/reaction-picker.component';
import { MentionTextareaComponent } from '../mention-textarea/mention-textarea.component';
import { PollCreateComponent } from '../poll-create/poll-create.component';
import { ScheduledPostsComponent } from '../scheduled-posts/scheduled-posts.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-message-composer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactionPickerComponent, MentionTextareaComponent, PollCreateComponent, ScheduledPostsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="composer-wrap">
      <app-poll-create
        *ngIf="showPollForm() && channelId()"
        [channelId]="channelId()!"
        (cancel)="showPollForm.set(false)"
        (created)="showPollForm.set(false)"
      />
      <div class="reply-banner" *ngIf="replyingTo() as r">
        <span class="rb-icon">↳</span>
        <span class="rb-text">Replying to <strong>{{ r.author.nickname ?? 'Unknown' }}</strong></span>
        <button class="rb-cancel" (click)="cancelReply()" title="Cancel reply">✕</button>
      </div>

      <div class="preview-strip" *ngIf="selectedImages().length > 0">
        <div class="preview" *ngFor="let p of previews(); let i = index">
          <img [src]="p" alt="" />
          <button class="rm" (click)="removeImage(i)" title="Remove">✕</button>
        </div>
        <span class="upinfo" *ngIf="isUploading()">Uploading…</span>
      </div>

      <div class="post-error" *ngIf="postError()">
        <span>⚠ {{ postError() }}</span>
        <button class="pe-x" (click)="dismissError()" title="Dismiss">✕</button>
      </div>

      <div class="composer">
        <button class="emoji-btn" (click)="togglePicker()" title="Insert emoji">😊</button>
        <button class="poll-btn" (click)="togglePollForm()" title="Create a poll">📊</button>
        <button *ngIf="canModerate()" class="sched-btn" (click)="showScheduled.set(true)" title="Scheduled posts">🕐</button>
        <button class="img-btn" (click)="fileInput.click()" title="Attach images">📎</button>
        <input
          #fileInput
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          (change)="onFilesPicked($event)"
        />
        <app-reaction-picker
          *ngIf="pickerOpen()"
          (pick)="insertEmoji($event)"
          (close)="pickerOpen.set(false)"
        />
        <app-mention-textarea
          class="mention-field"
          [value]="content()"
          (valueChange)="content.set($event)"
          (submit)="send()"
          [placeholder]="placeholder()"
        />
        <button class="send" (click)="send()" [disabled]="!canSend()">Send</button>
      </div>
    </div>

    <app-scheduled-posts
      *ngIf="showScheduled() && channelId()"
      [channelId]="channelId()!"
      (close)="showScheduled.set(false)"
    />
  `,
  styles: [`
    .composer-wrap { display: flex; flex-direction: column; flex-shrink: 0; }
    .reply-banner {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.45rem 1rem; background: #0d0d17;
      border-top: 1px solid rgba(0,255,163,0.2);
      font-size: 0.82rem; color: #9a9ab0;
    }
    .rb-icon { color: #00ffa3; }
    .rb-text strong { color: #eaeaf2; }
    .rb-cancel { margin-inline-start: auto; background: none; border: none; color: #7a7a92; cursor: pointer; font-size: 0.9rem; padding: 0 0.3rem; }
    .rb-cancel:hover { color: #ff6b6b; }
    .post-error {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.5rem; margin-bottom: 0.5rem; padding: 0.5rem 0.75rem;
      background: rgba(255,107,107,0.12); border: 1px solid rgba(255,107,107,0.4);
      border-radius: 8px; color: #ff8a8a; font-size: 0.85rem;
    }
    .pe-x { background: none; border: none; color: #ff8a8a; cursor: pointer; font-size: 0.85rem; }
    .composer {
      position: relative;
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid rgba(255,255,255,0.07);
      background: #07070d;
      flex-shrink: 0;
      align-items: flex-end;
    }
    .mention-field { flex: 1; }
    button { background: #00ffa3; color: #06281c; border: none; border-radius: 8px; padding: 0.5rem 1.1rem; cursor: pointer; font-weight: 700; transition: box-shadow 0.14s ease; }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
    .emoji-btn { background: transparent; color: #7a7a92; font-size: 1.25rem; padding: 0 0.5rem; }
    .poll-btn { background: transparent; color: #7a7a92; font-size: 1.1rem; padding: 0 0.4rem; }
    .poll-btn:hover { color: #00ffa3; }
    .sched-btn { background: transparent; color: #7a7a92; font-size: 1.05rem; padding: 0 0.4rem; cursor: pointer; border: none; }
    .sched-btn:hover { color: #00ffa3; }
    .img-btn { background: transparent; color: #7a7a92; font-size: 1.1rem; padding: 0 0.4rem; cursor: pointer; border: none; }
    .img-btn:hover { color: #00ffa3; }
    .preview-strip { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; padding: 0.6rem 1rem; border-top: 1px solid rgba(0,255,163,0.18); background: #0d0d17; }
    .preview { position: relative; width: 64px; height: 64px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
    .preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .preview .rm { position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; border-radius: 50%; border: none; background: rgba(0,0,0,0.65); color: #fff; font-size: 0.6rem; cursor: pointer; display: grid; place-items: center; line-height: 1; }
    .preview .rm:hover { background: #ff6b6b; }
    .upinfo { font-size: 0.78rem; color: #00ffa3; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .send:hover { box-shadow: 0 0 16px rgba(0,255,163,0.4); }
  `],
})
export class MessageComposerComponent {
  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);

  readonly showScheduled = signal(false);

  /** Mods/admins of the active community see the schedule + (server-enforced). */
  canModerate(): boolean {
    const role = this.auth.currentUser()?.role;
    if (role === 'admin') return true;
    const uid = this.auth.currentUser()?.id;
    const cid = this.state.activeCommunityId();
    if (!uid || !cid) return false;
    const me = (this.state.membersByCommunity()[cid] ?? []).find(m => m.user?.id === uid);
    return me ? ['owner', 'admin', 'moderator'].includes(me.role) : false;
  }

  /** Phase 6 — surfaced post error (e.g. a blocked word). */
  readonly postError = this.state.postError;

  content = signal('');
  readonly pickerOpen = signal(false);
  readonly showPollForm = signal(false);
  readonly isPosting  = this.state.isPosting;
  readonly isUploading = this.state.isUploading;

  /** Images queued in the composer before sending. */
  readonly selectedImages = signal<File[]>([]);
  /** Object URLs for previewing the queued images. */
  readonly previews = signal<string[]>([]);

  readonly channelId = this.state.activeChannelId;
  readonly channel    = this.state.activeChannel;
  readonly placeholder = computed(() => {
    const c = this.channel();
    return c ? `Message #${c.name}` : 'Select a channel';
  });

  readonly canPost = computed(() => {
    const c = this.channel();
    return !!c && !c.is_archived;
  });

  readonly canSend = computed(() =>
    this.canPost() &&
    !this.isPosting() &&
    !this.isUploading() &&
    (this.content().trim().length > 0 || this.selectedImages().length > 0)
  );

  readonly replyingTo = this.state.replyingTo;

  send(): void {
    if (!this.canSend()) return;
    const channelId = this.state.activeChannelId();
    if (!channelId) return;

    const images = this.selectedImages();
    if (images.length > 0) {
      // Caption is optional; send images (+ optional text) as one message.
      this.state.uploadImages(channelId, images, this.content().trim());
      this.clearImages();
      this.content.set('');
      return;
    }

    this.state.post(channelId, this.content().trim());
    this.content.set('');
  }

  /** Dismiss the blocked-word / post error banner. */
  dismissError(): void {
    this.state.postError.set(null);
  }

  onFilesPicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    if (files.length === 0) return;

    // Cap at 10 total; ignore non-images defensively.
    const images = files.filter(f => f.type.startsWith('image/'));
    this.selectedImages.update(prev => [...prev, ...images].slice(0, 10));
    this.rebuildPreviews();
    input.value = ''; // allow re-picking the same file
  }

  removeImage(i: number): void {
    this.selectedImages.update(arr => arr.filter((_, idx) => idx !== i));
    this.rebuildPreviews();
  }

  private rebuildPreviews(): void {
    // Revoke old object URLs to avoid leaks, then create fresh ones.
    for (const url of this.previews()) URL.revokeObjectURL(url);
    this.previews.set(this.selectedImages().map(f => URL.createObjectURL(f)));
  }

  private clearImages(): void {
    for (const url of this.previews()) URL.revokeObjectURL(url);
    this.previews.set([]);
    this.selectedImages.set([]);
  }

  cancelReply(): void {
    this.state.clearReplyTo();
  }

  togglePicker(): void {
    this.pickerOpen.update(v => !v);
  }

  togglePollForm(): void {
    this.showPollForm.update(v => !v);
  }

  insertEmoji(emoji: string): void {
    this.content.update(c => c + emoji);
    this.pickerOpen.set(false);
  }
}
