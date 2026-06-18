import { ChangeDetectionStrategy, Component, ElementRef, computed, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * VoicePlayerComponent — compact inline audio player for voice notes.
 *
 * Used by both DM and community voice messages. Pass the audio `src` and the
 * known `durationMs` (MediaRecorder webm often reports Infinity duration, so
 * we trust the recorded length instead of the element's metadata).
 *
 *   <app-voice-player [src]="url" [durationMs]="ms" [mine]="true" />
 */
@Component({
  selector: 'app-voice-player',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="vp" [class.vp--mine]="mine()">
      <button type="button" class="vp-btn" (click)="toggle()" [attr.aria-label]="playing() ? 'Pause' : 'Play'">
        @if (playing()) {
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
        } @else {
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        }
      </button>

      <div class="vp-track" (click)="seek($event)">
        <div class="vp-fill" [style.width.%]="progressPct()"></div>
        <div class="vp-knob" [style.left.%]="progressPct()"></div>
      </div>

      <span class="vp-time">{{ display() }}</span>

      <audio #audio [src]="src()" preload="metadata"
             (timeupdate)="onTime()" (ended)="onEnded()" (loadedmetadata)="onMeta()"></audio>
    </div>
  `,
  styles: [`
    .vp { display:inline-flex; align-items:center; gap:10px; min-width: 200px; max-width: 280px; }
    .vp-btn {
      width: 34px; height: 34px; flex-shrink:0; border-radius:50%; border:none; cursor:pointer;
      display:grid; place-items:center; background: var(--primary, #006c35); color:#fff;
      transition: background .15s, transform .12s;
      &:hover { background: var(--primary-soft, #2d8c5e); } &:active { transform: scale(.94); }
    }
    .vp--mine .vp-btn { background: #fff; color: var(--primary, #006c35); }
    .vp-track { position:relative; flex:1; height:4px; border-radius:100px; background: rgba(255,255,255,.18); cursor:pointer; }
    .vp--mine .vp-track { background: rgba(255,255,255,.35); }
    .vp-fill { position:absolute; inset:0 auto 0 0; height:100%; border-radius:100px; background: var(--accent, #d4af37); }
    .vp--mine .vp-fill { background:#fff; }
    .vp-knob { position:absolute; top:50%; width:9px; height:9px; border-radius:50%; background: var(--accent, #d4af37); transform: translate(-50%,-50%); }
    .vp--mine .vp-knob { background:#fff; }
    .vp-time { font-family: var(--fm, monospace); font-size: 11px; color: var(--mu, #8a8aa0); min-width: 34px; text-align:right; flex-shrink:0; }
    .vp--mine .vp-time { color: rgba(255,255,255,.85); }
    audio { display:none; }
  `],
})
export class VoicePlayerComponent {
  readonly src       = input.required<string>();
  readonly durationMs = input<number | null>(null);
  readonly mine      = input(false);

  private audioEl = viewChild<ElementRef<HTMLAudioElement>>('audio');

  readonly playing  = signal(false);
  readonly current  = signal(0);          // seconds
  private  metaDur  = signal(0);          // seconds, from element if reliable

  /** Authoritative total seconds: prefer the recorded duration. */
  readonly total = computed(() => {
    const ms = this.durationMs();
    if (ms && ms > 0) return ms / 1000;
    const m = this.metaDur();
    return Number.isFinite(m) && m > 0 ? m : 0;
  });

  readonly progressPct = computed(() => {
    const t = this.total();
    return t > 0 ? Math.min(100, (this.current() / t) * 100) : 0;
  });

  readonly display = computed(() =>
    this.fmt(this.playing() || this.current() > 0 ? this.current() : this.total()));

  toggle(): void {
    const el = this.audioEl()?.nativeElement;
    if (!el) return;
    if (el.paused) { el.play(); this.playing.set(true); }
    else { el.pause(); this.playing.set(false); }
  }

  seek(ev: MouseEvent): void {
    const el = this.audioEl()?.nativeElement;
    const t  = this.total();
    if (!el || t <= 0) return;
    const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
    el.currentTime = ratio * t;
    this.current.set(el.currentTime);
  }

  onTime(): void { this.current.set(this.audioEl()?.nativeElement.currentTime ?? 0); }
  onMeta(): void { this.metaDur.set(this.audioEl()?.nativeElement.duration ?? 0); }
  onEnded(): void { this.playing.set(false); this.current.set(0); }

  private fmt(secs: number): string {
    if (!Number.isFinite(secs) || secs < 0) secs = 0;
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
