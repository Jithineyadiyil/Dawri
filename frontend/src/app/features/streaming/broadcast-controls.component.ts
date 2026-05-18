import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LiveBroadcastService } from './live-broadcast.service';
import {
  BroadcastCredentials,
  BroadcastPrivacy,
  LiveBroadcast,
} from './live-broadcast.model';

/**
 * BroadcastControlsComponent — organizer-facing widget to manage a match's
 * live broadcast end-to-end.
 *
 * UX flow:
 *   1. (no broadcast)  → "Start broadcast" button → form (title/privacy)
 *   2. (status=ready)  → "Reveal RTMP credentials" → copy URL + key
 *   3. (after OBS connected) → "Go live" button → status flips to live
 *   4. (status=live)   → "End broadcast" button → status flips to complete
 *   5. (any state)     → "Cancel" (red) returns to step 1
 *
 * Inputs:
 *   matchId       — the tournament_matches.id to attach the broadcast to
 *   defaultTitle  — pre-fills the title field
 *
 * Outputs:
 *   broadcastChanged — emits the latest LiveBroadcast after any mutation,
 *                      so the parent (match modal) can refresh its embed
 *
 * Design tokens consumed from globals: --gold, --cyan, --bg
 */
@Component({
  selector: 'dawri-broadcast-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bc">
      <h3 class="bc__title">
        <span class="bc__dot" [class.bc__dot--live]="broadcast()?.is_live"></span>
        Live Broadcast
      </h3>

      <!-- ── State: no broadcast yet ─────────────────────────────────── -->
      @if (!broadcast() && !creating()) {
        <p class="bc__muted">No broadcast yet for this match.</p>
        <button class="bc__btn bc__btn--primary" (click)="creating.set(true)" type="button">
          Start broadcast
        </button>
      }

      <!-- ── State: create form ──────────────────────────────────────── -->
      @if (creating() && !broadcast()) {
        <form (submit)="onCreate($event)" class="bc__form">
          <label class="bc__label">
            <span>Title</span>
            <input
              type="text"
              [(ngModel)]="formTitle"
              name="title"
              maxlength="100"
              required
              class="bc__input"
            />
          </label>
          <label class="bc__label">
            <span>Privacy</span>
            <select [(ngModel)]="formPrivacy" name="privacy" class="bc__input">
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
          </label>
          <div class="bc__row">
            <button type="submit" class="bc__btn bc__btn--primary" [disabled]="busy()">
              {{ busy() ? 'Creating…' : 'Create' }}
            </button>
            <button type="button" class="bc__btn" (click)="creating.set(false)" [disabled]="busy()">
              Cancel
            </button>
          </div>
        </form>
      }

      <!-- ── State: ready / live / complete ──────────────────────────── -->
      @if (broadcast(); as b) {
        <dl class="bc__meta">
          <dt>Status</dt><dd>{{ b.status }}</dd>
          <dt>Privacy</dt><dd>{{ b.privacy }}</dd>
          <dt>Watch URL</dt>
          <dd>
            @if (b.watch_url) {
              <a [href]="b.watch_url" target="_blank" rel="noopener">{{ b.watch_url }}</a>
            } @else { — }
          </dd>
        </dl>

        <!-- Reveal credentials block — only for ready/live -->
        @if (!b.is_terminal) {
          @if (!credentials()) {
            <button class="bc__btn" (click)="onRevealCredentials()" [disabled]="busy()" type="button">
              Reveal RTMP credentials
            </button>
          } @else {
            <div class="bc__creds">
              <p class="bc__warn">⚠️ Don't share these. They'll only be shown once.</p>
              <label class="bc__label">
                <span>RTMP URL</span>
                <input class="bc__input bc__input--mono" readonly [value]="credentials()!.rtmp_url" #urlInput />
              </label>
              <button class="bc__btn bc__btn--copy" (click)="copy(urlInput.value)" type="button">Copy URL</button>

              <label class="bc__label">
                <span>Stream key</span>
                <input
                  class="bc__input bc__input--mono"
                  readonly
                  [type]="keyVisible() ? 'text' : 'password'"
                  [value]="credentials()!.stream_key"
                  #keyInput
                />
              </label>
              <div class="bc__row">
                <button class="bc__btn bc__btn--copy" (click)="copy(keyInput.value)" type="button">Copy key</button>
                <button class="bc__btn" (click)="toggleKeyVisible()" type="button">
                  {{ keyVisible() ? 'Hide' : 'Show' }}
                </button>
                <button class="bc__btn" (click)="credentials.set(null)" type="button">Hide credentials</button>
              </div>
              <p class="bc__muted">{{ credentials()!.instructions.obs }}</p>
            </div>
          }
        }

        <div class="bc__row bc__row--actions">
          @if (b.status === 'ready') {
            <button class="bc__btn bc__btn--go" (click)="onGoLive()" [disabled]="busy()" type="button">
              Go live ▶
            </button>
          }
          @if (b.is_live) {
            <button class="bc__btn bc__btn--end" (click)="onComplete()" [disabled]="busy()" type="button">
              End broadcast ■
            </button>
          }
          @if (!b.is_terminal) {
            <button class="bc__btn bc__btn--danger" (click)="onCancel()" [disabled]="busy()" type="button">
              Cancel
            </button>
          }
        </div>
      }

      @if (error(); as err) {
        <p class="bc__error">{{ err }}</p>
      }
    </section>
  `,
  styles: [`
    :host { display: block; color: #e6e8ec; }
    .bc { background: rgba(11, 16, 34, 0.6); border: 1px solid rgba(240, 165, 0, 0.25);
          border-radius: 8px; padding: 1rem; font-family: 'Rajdhani', sans-serif; }
    .bc__title { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; color: var(--gold, #f0a500);
                 margin: 0 0 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem; }
    .bc__dot { width: 10px; height: 10px; border-radius: 50%; background: #555; }
    .bc__dot--live { background: #ff3b3b; box-shadow: 0 0 8px #ff3b3b; animation: pulse 1.4s infinite; }
    @keyframes pulse { 50% { opacity: 0.4; } }

    .bc__muted { color: #8b909a; font-size: 0.9rem; }
    .bc__warn  { color: #f0a500; font-size: 0.85rem; margin: 0 0 0.5rem; }
    .bc__error { color: #ff6b6b; font-size: 0.9rem; margin-top: 0.75rem; }

    .bc__form  { display: flex; flex-direction: column; gap: 0.75rem; }
    .bc__label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.85rem; color: #c8ccd4; }
    .bc__input { background: #0b1022; border: 1px solid rgba(0, 229, 255, 0.2); color: #fff;
                 padding: 0.5rem 0.75rem; border-radius: 4px; font: inherit; }
    .bc__input--mono { font-family: 'Space Mono', monospace; font-size: 0.85rem; }

    .bc__row   { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .bc__row--actions { margin-top: 1rem; }

    .bc__btn { background: #1a2240; color: #fff; border: 1px solid rgba(0, 229, 255, 0.3);
               padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font: inherit;
               text-transform: uppercase; letter-spacing: 1px; font-size: 0.85rem;
               transition: all 0.15s; }
    .bc__btn:hover:not(:disabled) { background: #243056; }
    .bc__btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .bc__btn--primary { background: var(--gold, #f0a500); color: #0b1022; border-color: var(--gold, #f0a500); }
    .bc__btn--go      { background: #2ecc71; color: #0b1022; border-color: #2ecc71; }
    .bc__btn--end     { background: #e67e22; color: #0b1022; border-color: #e67e22; }
    .bc__btn--danger  { background: transparent; color: #ff6b6b; border-color: #ff6b6b; }
    .bc__btn--copy    { background: var(--cyan, #00e5ff); color: #0b1022; border-color: var(--cyan, #00e5ff); }

    .bc__meta  { display: grid; grid-template-columns: max-content 1fr; gap: 0.3rem 1rem;
                 margin: 0.5rem 0 1rem; font-size: 0.9rem; }
    .bc__meta dt { color: #8b909a; }
    .bc__meta dd { margin: 0; word-break: break-all; }
    .bc__meta a  { color: var(--cyan, #00e5ff); text-decoration: none; }
    .bc__meta a:hover { text-decoration: underline; }

    .bc__creds { margin: 0.75rem 0; padding: 0.75rem; background: rgba(0, 0, 0, 0.3);
                 border-radius: 4px; border-left: 3px solid var(--gold, #f0a500); }
  `],
})
export class BroadcastControlsComponent {
  /** Required — match ID this widget operates on. */
  readonly matchId = input.required<string>();

  /** Optional pre-filled title (e.g. "Quarterfinal 3 — Player A vs Player B"). */
  readonly defaultTitle = input<string>('');

  /** Optional pre-existing broadcast (passed from parent so we don't refetch). */
  readonly initialBroadcast = input<LiveBroadcast | null>(null);

  /** Emits after every successful mutation so the parent can refresh embeds. */
  readonly broadcastChanged = output<LiveBroadcast | null>();

  /* ──────── state signals ──────── */

  protected readonly broadcast    = signal<LiveBroadcast | null>(null);
  protected readonly credentials  = signal<BroadcastCredentials | null>(null);
  protected readonly busy         = signal(false);
  protected readonly creating     = signal(false);
  protected readonly keyVisible   = signal(false);
  protected readonly error        = signal<string | null>(null);

  /* ──────── form fields (template-driven, simple) ──────── */

  protected formTitle = '';
  protected formPrivacy: BroadcastPrivacy = 'public';

  /* ──────── derived ──────── */

  protected readonly statusLabel = computed(() => this.broadcast()?.status ?? 'idle');

  /* ──────── deps ──────── */

  private readonly api = inject(LiveBroadcastService);

  ngOnInit(): void {
    this.broadcast.set(this.initialBroadcast());
    this.formTitle = this.defaultTitle();
  }

  /* ──────── actions ──────── */

  protected onCreate(ev: Event): void {
    ev.preventDefault();
    if (this.busy() || !this.formTitle.trim()) return;

    this.busy.set(true);
    this.error.set(null);

    this.api.createForMatch(this.matchId(), {
      title:   this.formTitle.trim(),
      privacy: this.formPrivacy,
      source:  'obs',
    }).subscribe({
      next: (b) => {
        this.broadcast.set(b);
        this.creating.set(false);
        this.busy.set(false);
        this.broadcastChanged.emit(b);
      },
      error: (e) => this.onError(e, 'Failed to create broadcast'),
    });
  }

  protected onRevealCredentials(): void {
    const b = this.broadcast();
    if (!b || this.busy()) return;

    this.busy.set(true);
    this.error.set(null);

    this.api.getCredentials(b.id).subscribe({
      next: (c) => {
        this.credentials.set(c);
        this.busy.set(false);
      },
      error: (e) => this.onError(e, 'Failed to fetch credentials'),
    });
  }

  protected onGoLive(): void {
    const b = this.broadcast();
    if (!b || this.busy()) return;

    this.busy.set(true);
    this.error.set(null);

    this.api.goLive(b.id).subscribe({
      next: (next) => {
        this.broadcast.set(next);
        this.busy.set(false);
        this.broadcastChanged.emit(next);
      },
      error: (e) => this.onError(e, 'Failed to go live — is OBS streaming?'),
    });
  }

  protected onComplete(): void {
    const b = this.broadcast();
    if (!b || this.busy()) return;
    if (!confirm('End the broadcast? Viewers will be disconnected.')) return;

    this.busy.set(true);
    this.error.set(null);

    this.api.complete(b.id).subscribe({
      next: (next) => {
        this.broadcast.set(next);
        this.busy.set(false);
        this.broadcastChanged.emit(next);
      },
      error: (e) => this.onError(e, 'Failed to end broadcast'),
    });
  }

  protected onCancel(): void {
    const b = this.broadcast();
    if (!b || this.busy()) return;
    if (!confirm('Cancel this broadcast? The YouTube event will be deleted.')) return;

    this.busy.set(true);
    this.error.set(null);

    this.api.cancel(b.id).subscribe({
      next: () => {
        this.broadcast.set(null);
        this.credentials.set(null);
        this.busy.set(false);
        this.broadcastChanged.emit(null);
      },
      error: (e) => this.onError(e, 'Failed to cancel broadcast'),
    });
  }

  protected async copy(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API can fail on insecure origins; fall back silently.
    }
  }

  /** Toggle visibility of the masked stream key input. */
  protected toggleKeyVisible(): void {
    this.keyVisible.update(v => !v);
  }

  private onError(e: unknown, fallback: string): void {
    this.busy.set(false);
    const apiMsg = (e as { error?: { error?: { message?: string } } })?.error?.error?.message;
    this.error.set(apiMsg ?? fallback);
  }
}
