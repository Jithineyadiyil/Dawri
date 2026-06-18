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
import { VoiceRecorderService } from '../../../../core/services/voice-recorder.service';
import { ToastService } from '../../../../core/services/toast.service';

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

      <div class="typing-indicator" *ngIf="typingUser()">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span style="margin-left:4px">{{ typingUser() }} is typing…</span>
      </div>

      <div class="post-error" *ngIf="postError()">
        <span>⚠ {{ postError() }}</span>
        <button class="pe-x" (click)="dismissError()" title="Dismiss">✕</button>
      </div>

      <div class="composer">
        <button class="icon-btn emoji-btn" (click)="togglePicker()" title="Insert emoji">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        </button>
        <button class="icon-btn poll-btn" (click)="togglePollForm()" title="Create a poll">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </button>
        <button *ngIf="canModerate()" class="icon-btn sched-btn" (click)="showScheduled.set(true)" title="Scheduled posts">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </button>
        <button class="icon-btn img-btn" (click)="fileInput.click()" title="Attach images">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </button>
        <button class="icon-btn mic-btn" *ngIf="!rec.recording()" (click)="startVoice()" [disabled]="!rec.supported()" [title]="rec.supported() ? 'Record voice message' : 'Recording not supported'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </button>
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

        <ng-container *ngIf="!rec.recording(); else recBar">
          <app-mention-textarea
            class="mention-field"
            [value]="content()"
            (valueChange)="content.set($event)"
            (submit)="send()"
            [placeholder]="placeholder()"
          />
          <button class="send" (click)="send()" [disabled]="!canSend()">Send</button>
        </ng-container>
        <ng-template #recBar>
          <div class="rec-bar">
            <span class="rec-dot"></span>
            <span class="rec-time">{{ recTime() }}</span>
            <span class="rec-label">Recording…</span>
            <button class="rec-cancel" (click)="cancelVoice()" title="Cancel">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <button class="send" (click)="stopAndSendVoice()" [disabled]="isUploading()">Send</button>
        </ng-template>
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
      padding: 0.45rem 1.1rem; background: #110f1e;
      border-top: 1px solid rgba(124,58,237,0.22);
      font-size: 0.82rem; color: #9a9ab0;
    }
    .rb-icon { color: #a78bfa; }
    .rb-text strong { color: #eaeaf2; }
    .rb-cancel { margin-inline-start: auto; background: none; border: none; color: #7a7a92; cursor: pointer; font-size: 0.9rem; padding: 0 0.3rem; }
    .rb-cancel:hover { color: #ff6b6b; }
    .post-error {
      display: flex; align-items: center; justify-content: space-between;
      gap: 0.5rem; margin: 0 1rem 0.5rem; padding: 0.5rem 0.75rem;
      background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.35);
      border-radius: 8px; color: #ff8a8a; font-size: 0.84rem;
    }
    .pe-x { background: none; border: none; color: #ff8a8a; cursor: pointer; font-size: 0.85rem; }
    @keyframes typingBounce {
      0%,80%,100% { transform: translateY(0); opacity: .4; }
      40%          { transform: translateY(-6px); opacity: 1; }
    }
    .composer {
      position: relative;
      display: flex;
      gap: 0.4rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid rgba(124,58,237,0.15);
      background: #0b0a14;
      flex-shrink: 0;
      align-items: flex-end;
      transition: box-shadow 0.2s ease;
    }
    .composer:focus-within {
      box-shadow: 0 -2px 20px rgba(124,58,237,0.18);
      border-top-color: rgba(124,58,237,0.4);
    }
    .mention-field { flex: 1; }

    /* Typing indicator dots */
    .typing-indicator {
      display: inline-flex; align-items: center; gap: 3px;
      padding: 0.3rem 0.75rem; background: rgba(124,58,237,0.1);
      border: 1px solid rgba(124,58,237,0.2); border-radius: 999px;
      font-size: 0.75rem; color: #7a7a92; font-family: 'JetBrains Mono', ui-monospace, monospace;
      margin: 0 1rem 0.4rem; align-self: flex-start; flex-shrink: 0;
    }
    .typing-dot {
      width: 5px; height: 5px; border-radius: 50%; background: #a78bfa;
      animation: typingBounce 1.2s ease-in-out infinite;
      &:nth-child(2) { animation-delay: .15s; }
      &:nth-child(3) { animation-delay: .3s; }
    }
    .send {
      background: #7c3aed; color: #fff; border: none; border-radius: 8px;
      padding: 0.5rem 1.1rem; cursor: pointer; font-weight: 700; font-size: 0.875rem;
      transition: background 0.14s, box-shadow 0.14s;
      white-space: nowrap; flex-shrink: 0;
    }
    .send:hover { background: #6d28d9; box-shadow: 0 0 18px rgba(124,58,237,0.45); }
    .send:disabled { opacity: 0.35; cursor: not-allowed; }
    .icon-btn {
      background: transparent; border: none; cursor: pointer;
      color: #5a5a72; padding: 0.4rem; border-radius: 7px;
      display: grid; place-items: center;
      transition: color 0.14s, background 0.14s;
      flex-shrink: 0;
    }
    .icon-btn:hover { color: #a78bfa; background: rgba(124,58,237,0.12); }
    .preview-strip { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; padding: 0.6rem 1.1rem; border-top: 1px solid rgba(124,58,237,0.18); background: #110f1e; }
    .preview { position: relative; width: 64px; height: 64px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(124,58,237,0.25); }
    .preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .preview .rm { position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; border-radius: 50%; border: none; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.6rem; cursor: pointer; display: grid; place-items: center; line-height: 1; }
    .preview .rm:hover { background: #ff6b6b; }
    .upinfo { font-size: 0.78rem; color: #a78bfa; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .rec-bar { flex: 1; display: flex; align-items: center; gap: 10px; padding: 0 6px; }
    .rec-dot { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px #ef4444; animation: recPulse 1.1s ease-in-out infinite; flex-shrink: 0; }
    .rec-time { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.85rem; color: #eaeaf2; min-width: 38px; }
    .rec-label { flex: 1; font-size: 0.82rem; color: #7a7a92; }
    .rec-cancel { width: 30px; height: 30px; border-radius: 8px; background: transparent; border: 1px solid rgba(255,255,255,.14); color: #7a7a92; cursor: pointer; display: grid; place-items: center; }
    .rec-cancel:hover { color: #fca5a5; border-color: rgba(239,68,68,.4); }
    @keyframes recPulse { 0%,100%{opacity:1} 50%{opacity:.35} }
    @media (prefers-reduced-motion: reduce) { .rec-dot { animation: none; } }
  `],
})
export class MessageComposerComponent {
  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);
  readonly rec = inject(VoiceRecorderService);
  private readonly toast = inject(ToastService);

  readonly showScheduled = signal(false);
  /** Populated by Reverb typing events; null = nobody typing. */
  readonly typingUser = signal<string | null>(null);

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

  // ── Voice notes ───────────────────────────────────────────────────
  recTime(): string {
    const s = Math.floor(this.rec.elapsedMs() / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }

  async startVoice(): Promise<void> {
    if (!this.canPost()) { this.toast.error('You cannot post in this channel.'); return; }
    try { await this.rec.start(); }
    catch { this.toast.error('Microphone access is needed to record.'); }
  }

  cancelVoice(): void { this.rec.cancel(); }

  async stopAndSendVoice(): Promise<void> {
    const channelId = this.state.activeChannelId();
    if (!channelId) { this.rec.cancel(); return; }
    let clip;
    try { clip = await this.rec.stop(); }
    catch { this.toast.error('Recording failed.'); return; }
    if (clip.durationMs < 500) { this.toast.info('Too short — hold a moment longer.'); return; }
    this.state.uploadVoice(channelId, clip.blob, clip.durationMs);
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
