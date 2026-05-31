/**
 * @fileoverview Source picker — small standalone UI for capture mode selection.
 *
 * Three options: Webcam, Screen, Screen + Cam (PIP).
 * Emits the chosen mode via an output signal so the parent can proceed
 * to the capture step.
 */

import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { CaptureMode } from '../browser-broadcast.model';

/**
 * Capture-mode picker.
 *
 * @example
 *   <app-source-picker (modeSelected)="onModeSelected($event)" />
 */
@Component({
  selector: 'app-source-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sp">
      <h3 class="sp__title">What do you want to broadcast?</h3>
      <p class="sp__subtitle">Pick one — you can change it next time.</p>

      <div class="sp__grid">
        <button class="sp__opt" type="button" (click)="modeSelected.emit('webcam')">
          <span class="sp__icon" aria-hidden="true">📹</span>
          <span class="sp__opt-title">Webcam &amp; Mic</span>
          <span class="sp__opt-desc">Face-to-camera commentary, post-match talks.</span>
        </button>

        <button class="sp__opt" type="button" (click)="modeSelected.emit('screen')">
          <span class="sp__icon" aria-hidden="true">🖥️</span>
          <span class="sp__opt-title">Screen &amp; Mic</span>
          <span class="sp__opt-desc">Show brackets, dashboards, in-progress matches.</span>
        </button>

        <button class="sp__opt" type="button" (click)="modeSelected.emit('screen_with_cam')">
          <span class="sp__icon" aria-hidden="true">🎬</span>
          <span class="sp__opt-title">Screen + Webcam</span>
          <span class="sp__opt-desc">Casting: screen with your face in the corner.</span>
        </button>
      </div>

      <p class="sp__hint">
        🎮 For high-quality game capture, install <strong>OBS Studio</strong> and use the
        OBS path instead — browser capture is best for commentary and casting.
      </p>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .sp {
        padding: 24px;
        color: var(--text, #fff);
        font-family: 'Rajdhani', sans-serif;
      }

      .sp__title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 1.6rem;
        letter-spacing: 0.04em;
        color: var(--gold, #f0a500);
        margin: 0 0 4px 0;
      }

      .sp__subtitle {
        margin: 0 0 20px 0;
        font-size: 0.9rem;
        color: var(--muted, rgba(255, 255, 255, 0.6));
      }

      .sp__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 14px;
      }

      .sp__opt {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 18px;
        background: var(--bg-3, #0f172a);
        border: 1px solid rgba(0, 229, 255, 0.18);
        border-radius: 10px;
        color: inherit;
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        transition: all 0.18s ease;
      }

      .sp__opt:hover,
      .sp__opt:focus-visible {
        border-color: var(--cyan, #00e5ff);
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(0, 229, 255, 0.18);
        outline: none;
      }

      .sp__icon {
        font-size: 1.6rem;
      }

      .sp__opt-title {
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 0.06em;
        font-size: 1.15rem;
      }

      .sp__opt-desc {
        font-size: 0.85rem;
        color: var(--muted, rgba(255, 255, 255, 0.6));
        line-height: 1.4;
      }

      .sp__hint {
        margin-top: 18px;
        padding: 12px 14px;
        font-size: 0.82rem;
        color: var(--muted, rgba(255, 255, 255, 0.6));
        background: rgba(240, 165, 0, 0.06);
        border-left: 3px solid var(--gold, #f0a500);
        border-radius: 4px;
      }

      [dir='rtl'] .sp__hint {
        border-left: none;
        border-right: 3px solid var(--gold, #f0a500);
      }
    `,
  ],
})
export class SourcePickerComponent {
  /** Emits when the user picks a mode. */
  readonly modeSelected = output<CaptureMode>();
}
