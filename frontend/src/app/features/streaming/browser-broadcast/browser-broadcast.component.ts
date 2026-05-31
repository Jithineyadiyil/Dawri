/**
 * @fileoverview Main browser-broadcast component.
 *
 * Orchestrates the full flow:
 *   1. Show source-picker (webcam / screen / PIP)
 *   2. Request media via MediaCaptureService → preview
 *   3. Open session via BrowserBroadcastService → get WHIP URL
 *   4. Publish via WhipClient → broadcast is live
 *   5. Stop teardown
 *
 * Uses Angular 17 signals + OnPush. No reactive forms here — the
 * interaction model is button-driven, not form-driven.
 */

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

import {
  BroadcastError,
  BroadcastState,
  BrowserBroadcastSession,
  CaptureMode,
} from './browser-broadcast.model';
import { BrowserBroadcastService } from './browser-broadcast.service';
import { CaptureError, MediaCaptureService } from './media-capture.service';
import { SourcePickerComponent } from './source-picker/source-picker.component';
import { WhipClient, WhipError } from './whip-client';

/**
 * Self-contained widget that turns the streamer's browser into a
 * fully working broadcaster.
 *
 * Usage from `tournament-detail.component.html`:
 *   <app-browser-broadcast [broadcastId]="broadcast.id" />
 */
@Component({
  selector: 'app-browser-broadcast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SourcePickerComponent],
  template: `
    <section class="bb" [attr.data-state]="state()">
      @if (state() === 'idle') {
        <app-source-picker (modeSelected)="onModeSelected($event)" />
      } @else {
        <header class="bb__header">
          <h3 class="bb__title">
            @switch (state()) {
              @case ('requesting') { Requesting permission… }
              @case ('capturing')  { Ready to broadcast }
              @case ('publishing') { Connecting to Dawri… }
              @case ('live')       { <span class="bb__pulse">🔴</span> Live on Dawri }
              @case ('stopping')   { Wrapping up… }
              @case ('error')      { Something went wrong }
            }
          </h3>

          @if (statusPill(); as pill) {
            <span class="bb__pill" [class]="'bb__pill--' + pill.tone">{{ pill.text }}</span>
          }
        </header>

        <div class="bb__preview">
          <video #preview class="bb__video" autoplay muted playsinline></video>
          @if (state() === 'requesting' || state() === 'publishing') {
            <div class="bb__overlay">
              <div class="bb__spinner" aria-hidden="true"></div>
            </div>
          }
        </div>

        @if (errorState(); as err) {
          <div class="bb__error" role="alert">
            <strong>{{ err.message }}</strong>
            @if (err.retryable) {
              <button class="bb__link" type="button" (click)="reset()">Try again</button>
            }
          </div>
        }

        <footer class="bb__actions">
          @if (state() === 'capturing') {
            <button class="bb__btn bb__btn--primary" type="button" (click)="goLive()">
              🔴 Go Live
            </button>
            <button class="bb__btn bb__btn--ghost" type="button" (click)="reset()">
              Cancel
            </button>
          } @else if (state() === 'live') {
            <button class="bb__btn bb__btn--danger" type="button" (click)="stop()">
              ⏹ Stop Broadcasting
            </button>
            @if (session(); as s) {
              <a class="bb__link" [href]="s.watch_url" target="_blank" rel="noopener noreferrer">
                Open on YouTube ↗
              </a>
            }
          } @else if (state() === 'error') {
            <button class="bb__btn bb__btn--ghost" type="button" (click)="reset()">Start over</button>
          }
        </footer>
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .bb {
        background: var(--bg-2, #0b1022);
        border: 1px solid rgba(0, 229, 255, 0.18);
        border-radius: 12px;
        overflow: hidden;
        font-family: 'Rajdhani', sans-serif;
        color: var(--text, #fff);
      }
      .bb__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 20px;
        background: var(--bg-3, #060810);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      .bb__title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.2rem;
        letter-spacing: 0.05em;
        margin: 0;
      }
      .bb__pulse {
        animation: pulse 1.4s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .bb__pill {
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 0.75rem;
        font-family: 'Space Mono', monospace;
        letter-spacing: 0.04em;
      }
      .bb__pill--neutral { background: rgba(255,255,255,0.08); }
      .bb__pill--ok      { background: rgba(0,229,255,0.18); color: var(--cyan,#00e5ff); }
      .bb__pill--live    { background: rgba(255,0,0,0.18); color: #ff4d4d; }
      .bb__pill--warn    { background: rgba(240,165,0,0.18); color: var(--gold,#f0a500); }

      .bb__preview {
        position: relative;
        background: #000;
        aspect-ratio: 16 / 9;
      }
      .bb__video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #000;
      }
      .bb__overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.45);
      }
      .bb__spinner {
        width: 44px;
        height: 44px;
        border: 3px solid rgba(255,255,255,0.18);
        border-top-color: var(--cyan, #00e5ff);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      .bb__error {
        padding: 12px 20px;
        background: rgba(255, 64, 64, 0.12);
        color: #ffb6b6;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .bb__actions {
        display: flex;
        gap: 12px;
        padding: 16px 20px;
        align-items: center;
      }
      .bb__btn {
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 0.07em;
        font-size: 1rem;
        padding: 10px 22px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: transform 0.12s ease, box-shadow 0.12s ease;
      }
      .bb__btn--primary {
        background: var(--gold, #f0a500);
        color: #111;
      }
      .bb__btn--primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(240,165,0,0.35); }
      .bb__btn--danger {
        background: #ff3b3b;
        color: #fff;
      }
      .bb__btn--ghost {
        background: transparent;
        color: var(--text, #fff);
        border: 1px solid rgba(255,255,255,0.18);
      }
      .bb__link {
        color: var(--cyan, #00e5ff);
        text-decoration: none;
        font-size: 0.9rem;
      }
      .bb__link:hover { text-decoration: underline; }
    `,
  ],
})
export class BrowserBroadcastComponent {
  /** UUID of the LiveBroadcast we're streaming on behalf of. */
  readonly broadcastId = input.required<string>();

  // ─────────────── injected ────────────────────────────────────────────
  private readonly api = inject(BrowserBroadcastService);
  private readonly capture = inject(MediaCaptureService);
  private readonly destroyRef = inject(DestroyRef);

  // ─────────────── reactive state ──────────────────────────────────────
  readonly state = signal<BroadcastState>('idle');
  readonly errorState = signal<BroadcastError | null>(null);
  readonly session = signal<BrowserBroadcastSession | null>(null);
  readonly mode = signal<CaptureMode | null>(null);

  readonly statusPill = computed(() => {
    switch (this.state()) {
      case 'capturing':  return { text: 'PREVIEW',     tone: 'ok' };
      case 'publishing': return { text: 'CONNECTING',  tone: 'warn' };
      case 'live':       return { text: 'BROADCASTING', tone: 'live' };
      case 'error':      return { text: 'ERROR',       tone: 'warn' };
      default:           return null;
    }
  });

  // ─────────────── private internals ───────────────────────────────────
  private readonly previewEl = viewChild<ElementRef<HTMLVideoElement>>('preview');
  private mediaStream: MediaStream | null = null;
  private whipClient: WhipClient | null = null;

  constructor() {
    // Ensure we always release media on destroy.
    this.destroyRef.onDestroy(() => this.cleanup());
  }

  // ─────────────── UI handlers ─────────────────────────────────────────

  async onModeSelected(mode: CaptureMode): Promise<void> {
    this.mode.set(mode);
    this.state.set('requesting');
    this.errorState.set(null);

    try {
      const stream = await this.capture.capture(mode);
      this.mediaStream = stream;
      this.attachPreview(stream);
      this.state.set('capturing');
    } catch (e) {
      this.handleError(e);
    }
  }

  async goLive(): Promise<void> {
    if (!this.mediaStream || !this.mode()) return;

    this.state.set('publishing');
    this.errorState.set(null);

    try {
      const session = await firstValueFrom(
        this.api.openSession(this.broadcastId(), { capture_mode: this.mode()! }),
      );
      this.session.set(session);

      const whip = new WhipClient(session.whip_url, session.whip_token);
      whip.on('failed', () => this.handleError(
        new WhipError('ice_failed', 'Connection to Dawri was lost.'),
      ));

      await whip.publish(this.mediaStream);
      this.whipClient = whip;
      this.state.set('live');
    } catch (e) {
      this.handleError(e);
    }
  }

  async stop(): Promise<void> {
    this.state.set('stopping');

    try {
      if (this.whipClient) {
        await this.whipClient.stop();
        this.whipClient = null;
      }

      const id = this.broadcastId();
      if (id) {
        this.api.closeSession(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          // Errors closing the session shouldn't trap the user in a "stopping" state.
          error: () => undefined,
        });
      }
    } finally {
      this.cleanup();
      this.state.set('idle');
      this.session.set(null);
      this.mode.set(null);
    }
  }

  reset(): void {
    this.cleanup();
    this.errorState.set(null);
    this.state.set('idle');
    this.session.set(null);
    this.mode.set(null);
  }

  // ─────────────── helpers ─────────────────────────────────────────────

  private attachPreview(stream: MediaStream): void {
    const el = this.previewEl()?.nativeElement;
    if (el) {
      el.srcObject = stream;
    }
  }

  private cleanup(): void {
    if (this.whipClient) {
      this.whipClient.stop().catch(() => undefined);
      this.whipClient = null;
    }
    if (this.mediaStream) {
      this.capture.release(this.mediaStream);
      this.mediaStream = null;
    }
    const el = this.previewEl()?.nativeElement;
    if (el) {
      el.srcObject = null;
    }
  }

  private handleError(e: unknown): void {
    let err: BroadcastError;

    if (e instanceof CaptureError) {
      err = {
        code: e.code,
        message: this.captureMsg(e.code),
        retryable: e.code !== 'unsupported',
      };
    } else if (e instanceof WhipError) {
      err = {
        code: e.code,
        message: this.whipMsg(e.code),
        retryable: e.code !== 'unsupported',
      };
    } else {
      err = {
        code: 'unknown',
        message: e instanceof Error ? e.message : 'An unexpected error occurred.',
        retryable: true,
      };
    }

    this.errorState.set(err);
    this.state.set('error');
    this.cleanup();
  }

  private captureMsg(code: CaptureError['code']): string {
    switch (code) {
      case 'permission_denied': return 'You denied camera or screen access. Allow it in your browser and try again.';
      case 'no_device':         return 'No webcam or microphone was found.';
      case 'unsupported':       return 'Your browser does not support browser broadcasting. Use the latest Chrome, Edge, or Safari.';
      case 'aborted':           return 'You cancelled the request before granting access.';
      default:                   return 'Could not access your camera or screen.';
    }
  }

  private whipMsg(code: WhipError['code']): string {
    switch (code) {
      case 'unauthorized':         return 'Your session was rejected by Dawri. Refresh the page and try again.';
      case 'not_found':            return 'The broadcast session is no longer valid.';
      case 'rate_limited':         return 'Too many broadcasts started recently. Wait a minute and retry.';
      case 'ice_failed':           return 'Your network blocks WebRTC. Try a different network or contact your admin about firewall rules.';
      case 'sdp_handshake_failed': return 'The streaming server rejected the negotiation.';
      case 'unsupported':          return 'Your browser does not support this kind of broadcast.';
      default:                      return 'A network error stopped the broadcast.';
    }
  }
}
