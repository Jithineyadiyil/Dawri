import { ChangeDetectionStrategy, Component, OnInit, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Conversation, DmService } from './dm.service';
import { ToastService } from '../../core/services/toast.service';
import { VoiceRecorderService } from '../../core/services/voice-recorder.service';
import { VoicePlayerComponent } from '../../shared/components/voice/voice-player.component';

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, VoicePlayerComponent],
  host: { '[class.embedded]': 'embedded()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="dm">
  <!-- ── Conversation list ── -->
  <aside class="dm-list" [class.dm-list--hidden-mobile]="dm.activeId()">
    <header class="dm-list__head">
      <h1>Messages</h1>
      <a routerLink="/friends" class="dm-list__friends" title="Friends">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </a>
    </header>

    @if (dm.loadingList() && dm.conversations().length === 0) {
      @for (i of [1,2,3,4]; track i) { <div class="dm-skel"></div> }
    } @else if (dm.conversations().length === 0) {
      <div class="dm-empty dm-empty--list">
        <p>No conversations yet.</p>
        <a routerLink="/friends" class="dm-btn dm-btn--primary">Message a friend</a>
      </div>
    } @else {
      @for (c of dm.conversations(); track c.id) {
        <button class="dm-conv" [class.active]="c.id === dm.activeId()" (click)="dm.activate(c.id)">
          <span class="dm-ava" [class.dm-ava--group]="!c.user">
            @if (c.user) {
              @if (c.user.avatar_url) { <img [src]="c.user.avatar_url" [alt]="c.user.display_name"/> }
              @else { <span class="dm-ava-letter">{{ (c.user.display_name || '?').charAt(0) }}</span> }
            } @else if (c.group?.logo_url) {
              <img [src]="c.group!.logo_url!" [alt]="c.group!.name ?? 'Group'"/>
            } @else {
              <span class="dm-ava-letter">{{ (c.group?.tag || c.group?.name || '#').charAt(0).toUpperCase() }}</span>
            }
          </span>
          <span class="dm-conv__body">
            <span class="dm-conv__top">
              <span class="dm-conv__name">
                @if (c.user) { {{ c.user.display_name }} }
                @else { {{ (c.group?.tag ? '[' + c.group!.tag + '] ' : '') + (c.group?.name ?? 'Team chat') }} }
              </span>
              @if (c.last_message) { <span class="dm-conv__time">{{ c.last_message.created_at | date:'shortTime' }}</span> }
            </span>
            <span class="dm-conv__preview">
              @if (c.last_message) {
                {{ c.last_message.sender_id === dm.myId ? 'You: ' : '' }}{{ c.last_message.body }}
              } @else { Say hi }
            </span>
          </span>
          @if (c.unread > 0) { <span class="dm-conv__badge">{{ c.unread }}</span> }
        </button>
      }
    }
  </aside>

  <!-- ── Active thread ── -->
  <section class="dm-thread">
    @if (dm.activeConversation(); as conv) {
      <header class="dm-thread__head">
        <button class="dm-back" (click)="dm.activeId.set(null)" aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span class="dm-ava dm-ava--sm" [class.dm-ava--group]="!conv.user">
          @if (conv.user) {
            @if (conv.user.avatar_url) { <img [src]="conv.user.avatar_url" [alt]="conv.user.display_name"/> }
            @else { <span class="dm-ava-letter">{{ (conv.user.display_name || '?').charAt(0) }}</span> }
          } @else if (conv.group?.logo_url) {
            <img [src]="conv.group!.logo_url!" [alt]="conv.group?.name ?? 'Group'"/>
          } @else {
            <span class="dm-ava-letter">{{ (conv.group?.tag || conv.group?.name || '#').charAt(0).toUpperCase() }}</span>
          }
        </span>
        <div class="dm-thread__who">
          <div class="dm-thread__name">
            @if (conv.user) { {{ conv.user.display_name }} }
            @else { {{ (conv.group?.tag ? '[' + conv.group!.tag + '] ' : '') + (conv.group?.name ?? 'Team chat') }} }
          </div>
          @if (conv.user?.nickname) { <div class="dm-thread__nick">{{ '@' + conv.user!.nickname }}</div> }
          @else if (conv.group?.kind === 'team') { <div class="dm-thread__nick">Team chat</div> }
        </div>
      </header>

      <div class="dm-feed" #feed>
        @if (dm.loadingThread() && dm.activeMessages().length === 0) {
          <div class="dm-loading">Loading…</div>
        }
        @for (m of dm.activeMessages(); track m.id) {
          <div class="dm-msg" [class.dm-msg--mine]="m.sender_id === dm.myId">
            @if (m.audio_url) {
              <div class="dm-bubble dm-bubble--audio">
                <app-voice-player [src]="m.audio_url" [durationMs]="m.audio_duration_ms ?? null" [mine]="m.sender_id === dm.myId" />
              </div>
            } @else {
              <div class="dm-bubble">{{ m.body }}</div>
            }
            <div class="dm-meta">{{ m.created_at | date:'shortTime' }}</div>
          </div>
        }
      </div>

      @if (rec.recording()) {
        <div class="dm-composer dm-rec">
          <span class="dm-rec__dot"></span>
          <span class="dm-rec__time">{{ recTime() }}</span>
          <span class="dm-rec__label">Recording — tap send when done</span>
          <button type="button" class="dm-rec__cancel" (click)="cancelVoice()" title="Cancel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <button type="button" class="dm-send" [disabled]="sending()" (click)="stopAndSendVoice(conv)" aria-label="Send voice">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      } @else {
        <form class="dm-composer" (ngSubmit)="send(conv)">
          <textarea
            class="dm-input"
            [(ngModel)]="draft"
            name="draft"
            rows="1"
            placeholder="Message {{ conv.user?.display_name ?? conv.group?.name ?? 'group' }}…"
            (keydown.enter)="onEnter($event, conv)"></textarea>
          @if (draft.trim()) {
            <button type="submit" class="dm-send" [disabled]="sending()" aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          } @else if (conv.user) {
            <button type="button" class="dm-mic" (click)="startVoice()" [disabled]="!rec.supported()" [title]="rec.supported() ? 'Record voice message' : 'Recording not supported'" aria-label="Record voice message">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            </button>
          }
        </form>
      }
    } @else {
      <div class="dm-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <h3>Your messages</h3>
        <p>Pick a conversation, or start one from a friend's profile.</p>
      </div>
    }
  </section>
</div>
  `,
  styles: [`
    :host { display:block; }
    :host(.embedded) { height: 100%; min-height: 0; }
    .dm { display:grid; grid-template-columns: 320px 1fr; height: calc(100vh - 60px); color: var(--text, #ececf1); }
    :host(.embedded) .dm { height: 100%; }
    @media (max-width: 760px) { .dm { grid-template-columns: 1fr; } .dm-list--hidden-mobile { display:none; } }

    .dm-list { border-right: 1px solid var(--br, rgba(255,255,255,.08)); display:flex; flex-direction:column; overflow-y:auto; background: var(--bg, #0a0a12); }
    .dm-list__head { display:flex; align-items:center; justify-content:space-between; padding: 18px 18px 12px; position:sticky; top:0; background: var(--bg, #0a0a12); }
    .dm-list__head h1 { font-family: var(--fh, sans-serif); font-size: 24px; letter-spacing:.5px; text-transform:uppercase; margin:0; }
    .dm-list__friends { color: var(--mu, #8a8aa0); display:grid; place-items:center; width:34px; height:34px; border-radius:8px; &:hover { color: var(--text); background: rgba(255,255,255,.05); } }

    .dm-conv {
      display:flex; align-items:center; gap:10px; padding: 11px 14px; width:100%; text-align:left;
      background: transparent; border:none; border-left: 2px solid transparent; cursor:pointer; color:inherit;
      transition: background .12s, border-color .12s;
    }
    .dm-conv:hover { background: rgba(255,255,255,.03); }
    .dm-conv.active { background: rgba(0,108,53,.1); border-left-color: var(--primary, #006c35); }
    .dm-conv__body { flex:1; min-width:0; }
    .dm-conv__top { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
    .dm-conv__name { font-weight:700; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .dm-conv__time { font-size:11px; color: var(--mu); flex-shrink:0; }
    .dm-conv__preview { display:block; font-size:12.5px; color: var(--mu, #8a8aa0); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px; }
    .dm-conv__badge { min-width:18px; height:18px; padding:0 5px; border-radius:100px; background: var(--primary, #006c35); color:#fff; font-family: var(--fm, monospace); font-size:10px; font-weight:700; display:grid; place-items:center; flex-shrink:0; }

    .dm-ava { width:42px; height:42px; border-radius:50%; overflow:hidden; flex-shrink:0; display:grid; place-items:center; background: linear-gradient(135deg, var(--primary,#006c35), var(--accent,#d4af37)); }
    .dm-ava img { width:100%; height:100%; object-fit:cover; }
    .dm-ava-letter { font-family: var(--fh, sans-serif); font-size:18px; color:#fff; }
    .dm-ava--sm { width:36px; height:36px; }

    .dm-thread { display:flex; flex-direction:column; min-width:0; }
    .dm-thread__head { display:flex; align-items:center; gap:10px; padding: 12px 18px; border-bottom: 1px solid var(--br, rgba(255,255,255,.08)); }
    .dm-back { display:none; background:none; border:none; color:var(--text); cursor:pointer; }
    @media (max-width: 760px) { .dm-back { display:grid; place-items:center; } }
    .dm-thread__name { font-weight:700; font-size:15px; }
    .dm-thread__nick { font-size:12px; color: var(--mu); }

    .dm-feed { flex:1; overflow-y:auto; padding: 18px; display:flex; flex-direction:column; gap:8px; }
    .dm-msg { display:flex; flex-direction:column; align-items:flex-start; max-width: 72%; }
    .dm-msg--mine { align-self:flex-end; align-items:flex-end; }
    .dm-bubble {
      padding: 9px 13px; border-radius: 14px; font-size:14px; line-height:1.4; word-break:break-word;
      background: var(--bg3, #181826); border: 1px solid var(--br, rgba(255,255,255,.08)); border-bottom-left-radius: 4px;
    }
    .dm-msg--mine .dm-bubble { background: var(--primary, #006c35); border-color: transparent; color:#fff; border-bottom-left-radius:14px; border-bottom-right-radius:4px; }
    .dm-meta { font-size:10px; color: var(--mu, #8a8aa0); margin-top:3px; padding: 0 4px; }

    .dm-composer { display:flex; gap:8px; align-items:flex-end; padding: 12px 16px; border-top:1px solid var(--br, rgba(255,255,255,.08)); }
    .dm-input {
      flex:1; resize:none; max-height:120px; background: var(--bg2, #10101c); border:1px solid var(--br2, rgba(255,255,255,.14));
      border-radius: 12px; padding: 11px 14px; color: var(--text); font-family: var(--fb, sans-serif); font-size:14px; outline:none;
      &:focus { border-color: var(--primary, #006c35); }
    }
    .dm-send {
      width:42px; height:42px; flex-shrink:0; border-radius:12px; border:none; cursor:pointer;
      background: var(--primary, #006c35); color:#fff; display:grid; place-items:center;
      transition: background .15s, opacity .15s;
      &:hover:not(:disabled){ background: var(--primary-soft, #2d8c5e); }
      &:disabled { opacity:.45; cursor:not-allowed; }
    }
    .dm-mic {
      width:42px; height:42px; flex-shrink:0; border-radius:12px; cursor:pointer;
      background: var(--bg2, #10101c); border:1px solid var(--br2, rgba(255,255,255,.14)); color: var(--mu, #8a8aa0);
      display:grid; place-items:center; transition: color .15s, border-color .15s, background .15s;
      &:hover:not(:disabled){ color: var(--primary, #4ade80); border-color: rgba(0,108,53,.5); background: rgba(0,108,53,.08); }
      &:disabled { opacity:.4; cursor:not-allowed; }
    }
    .dm-rec { align-items:center; gap:10px; }
    .dm-rec__dot { width:10px; height:10px; border-radius:50%; background:#ef4444; box-shadow:0 0 8px #ef4444; animation: recPulse 1.1s ease-in-out infinite; flex-shrink:0; }
    .dm-rec__time { font-family: var(--fm, monospace); font-size:14px; color: var(--text); min-width:38px; }
    .dm-rec__label { flex:1; font-size:13px; color: var(--mu, #8a8aa0); }
    .dm-rec__cancel { width:38px; height:38px; flex-shrink:0; border-radius:10px; cursor:pointer; background:transparent; border:1px solid var(--br2, rgba(255,255,255,.14)); color: var(--mu); display:grid; place-items:center;
      &:hover { color:#fca5a5; border-color: rgba(239,68,68,.4); } }
    .dm-bubble--audio { padding: 8px 12px; }
    @keyframes recPulse { 0%,100%{opacity:1} 50%{opacity:.35} }

    .dm-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; color: var(--mu, #8a8aa0);
      svg { color: var(--dim, #55556e); margin-bottom:12px; }
      h3 { color: var(--text); margin:0 0 6px; font-family: var(--fh, sans-serif); letter-spacing:.5px; }
      p { margin:0; max-width: 36ch; }
    }
    .dm-empty--list { height:auto; padding: 40px 20px; }
    .dm-btn { padding: 9px 16px; border-radius:8px; font-weight:700; font-size:13px; text-decoration:none; cursor:pointer; margin-top:12px; }
    .dm-btn--primary { background: var(--primary,#006c35); color:#fff; }
    .dm-skel { height:62px; margin: 4px 12px; border-radius:10px; background: rgba(255,255,255,.05); animation: dmPulse 1.5s ease-in-out infinite; }
    .dm-loading { text-align:center; color: var(--mu); padding: 20px; font-size:13px; }
    @keyframes dmPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
    @media (prefers-reduced-motion: reduce) { .dm-skel, .dm-rec__dot { animation:none; } }
  `],
})
export class MessagesPageComponent implements OnInit {
  readonly dm = inject(DmService);
  readonly rec = inject(VoiceRecorderService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  private feed = viewChild<ElementRef<HTMLElement>>('feed');

  /** When embedded inside the community shell, fill the container instead
   *  of the viewport height. */
  readonly embedded = input(false);

  draft = '';
  readonly sending = signal(false);

  constructor() {
    // Auto-scroll the feed to the bottom whenever the active thread changes.
    effect(() => {
      this.dm.activeMessages();
      queueMicrotask(() => {
        const el = this.feed()?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  }

  ngOnInit(): void {
    this.dm.loadConversations();
    const convId = this.route.snapshot.queryParamMap.get('conversation');
    if (convId) this.dm.activate(convId);
  }

  onEnter(ev: Event, conv: Conversation): void {
    const e = ev as KeyboardEvent;
    if (e.shiftKey) return;            // shift+enter = newline
    e.preventDefault();
    this.send(conv);
  }

  send(conv: Conversation): void {
    const body = this.draft.trim();
    if (!body || this.sending()) return;
    this.sending.set(true);
    this.dm.send(conv, body).subscribe({
      next: () => { this.draft = ''; this.sending.set(false); },
      error: (e) => { this.toast.error(e?.error?.message ?? 'Could not send.'); this.sending.set(false); },
    });
  }

  // ── Voice notes ───────────────────────────────────────────────────
  recTime(): string {
    const s = Math.floor(this.rec.elapsedMs() / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }

  async startVoice(): Promise<void> {
    try { await this.rec.start(); }
    catch { this.toast.error('Microphone access is needed to record.'); }
  }

  cancelVoice(): void { this.rec.cancel(); }

  async stopAndSendVoice(conv: Conversation): Promise<void> {
    if (this.sending()) return;
    let clip;
    try { clip = await this.rec.stop(); }
    catch { this.toast.error('Recording failed.'); return; }
    if (clip.durationMs < 500) { this.toast.info('Too short — hold a moment longer.'); return; }
    this.sending.set(true);
    this.dm.sendVoice(conv, clip.blob, clip.durationMs).subscribe({
      next: () => this.sending.set(false),
      error: (e) => { this.toast.error(e?.error?.message ?? 'Could not send voice note.'); this.sending.set(false); },
    });
  }
}
