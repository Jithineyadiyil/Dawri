/**
 * Phase 2c — WhatsApp-style "Create poll" screen.
 *
 * A centered modal overlay with a top bar (cancel + send), a labelled Question
 * field, an Options list where an empty row is always available until the max
 * is reached (drag-free; remove via the ✕), and a "multiple answers" toggle.
 * Emits via the state service and closes on success/cancel.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';

@Component({
  selector: 'app-poll-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onBackdrop($event)">
      <div class="sheet" role="dialog" aria-modal="true">
        <header class="bar">
          <button class="icon" (click)="cancel.emit()" title="Cancel" aria-label="Cancel">✕</button>
          <span class="title">Create poll</span>
          <button class="send" [disabled]="!canCreate()" (click)="create()" title="Send poll" aria-label="Send poll">✓</button>
        </header>

        <div class="body">
          <section class="block">
            <label class="label">Question</label>
            <textarea
              class="q"
              [(ngModel)]="question"
              placeholder="Ask a question"
              maxlength="300"
              rows="1"
            ></textarea>
          </section>

          <section class="block">
            <label class="label">Options</label>
            <div class="opt-row" *ngFor="let row of rows(); let i = index; trackBy: trackRow">
              <input
                class="opt"
                [ngModel]="row"
                (ngModelChange)="setOption(i, $event)"
                placeholder="Add"
                maxlength="150"
              />
              <button
                class="icon dim"
                *ngIf="canRemove(i)"
                (click)="removeOption(i)"
                title="Remove option"
                aria-label="Remove option"
              >✕</button>
            </div>
            <div class="hint" *ngIf="rows().length >= MAX">Maximum {{ MAX }} options</div>
          </section>

          <section class="block">
            <label class="setting">
              <span>Allow multiple answers</span>
              <button
                type="button"
                class="switch"
                [class.on]="isMultiple"
                (click)="isMultiple = !isMultiple"
                [attr.aria-pressed]="isMultiple"
              ><span class="knob"></span></button>
            </label>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --accent: #00ffa3; --accent-d: #06281c;
      --bg: #0b0b14; --surface: #14141f; --raised: #1c1c28;
      --line: rgba(255,255,255,0.09); --text: #eaeaf2; --mut: #8a8a9e;
    }
    .overlay {
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(3px);
      display: flex; align-items: center; justify-content: center; padding: 1rem;
    }
    .sheet {
      width: 100%; max-width: 480px; max-height: 86vh; overflow: hidden;
      background: var(--bg); border: 1px solid var(--line); border-radius: 16px;
      display: flex; flex-direction: column;
      box-shadow: 0 24px 70px rgba(0,0,0,0.6);
      animation: pop 0.16s ease-out;
    }
    @keyframes pop { from { transform: translateY(8px) scale(0.98); opacity: 0; } to { transform: none; opacity: 1; } }

    .bar {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.85rem 1rem; border-bottom: 1px solid var(--line);
    }
    .title { flex: 1; font-family: 'Anton', 'Bebas Neue', sans-serif; letter-spacing: 0.04em; font-size: 1.15rem; color: var(--text); text-transform: uppercase; }
    .icon {
      background: transparent; border: none; color: var(--mut); cursor: pointer;
      width: 34px; height: 34px; border-radius: 50%; font-size: 1rem;
      display: grid; place-items: center; transition: background 0.12s ease, color 0.12s ease;
    }
    .icon:hover { background: var(--raised); color: var(--text); }
    .icon.dim { width: 30px; height: 30px; font-size: 0.85rem; }
    .icon.dim:hover { color: #ff6b6b; }
    .send {
      background: var(--accent); color: var(--accent-d); border: none; cursor: pointer;
      width: 38px; height: 38px; border-radius: 50%; font-size: 1.05rem; font-weight: 800;
      display: grid; place-items: center; transition: box-shadow 0.14s ease, opacity 0.14s ease;
    }
    .send:hover:not(:disabled) { box-shadow: 0 0 18px rgba(0,255,163,0.45); }
    .send:disabled { opacity: 0.35; cursor: not-allowed; }

    .body { padding: 0.5rem 1rem 1.1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.2rem; }
    .block { display: flex; flex-direction: column; gap: 0.55rem; }
    .label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); padding-top: 0.5rem; }

    .q {
      background: var(--surface); border: none; border-bottom: 2px solid var(--line);
      border-radius: 10px 10px 0 0; padding: 0.7rem 0.8rem; color: var(--text);
      font-family: 'Archivo', system-ui, sans-serif; font-size: 1rem; resize: none;
      line-height: 1.4; min-height: 2.6rem;
    }
    .q:focus { outline: none; border-bottom-color: var(--accent); }

    .opt-row { display: flex; align-items: center; gap: 0.5rem; }
    .opt {
      flex: 1; background: var(--surface); border: 1px solid var(--line);
      border-radius: 10px; padding: 0.65rem 0.8rem; color: var(--text);
      font-family: 'Archivo', system-ui, sans-serif; font-size: 0.95rem;
      transition: border-color 0.12s ease;
    }
    .opt:focus { outline: none; border-color: rgba(0,255,163,0.55); }
    .opt::placeholder { color: var(--mut); }
    .hint { font-size: 0.72rem; color: var(--mut); padding-left: 0.2rem; }

    .setting { display: flex; align-items: center; justify-content: space-between; color: var(--text); font-size: 0.95rem; cursor: pointer; }
    .switch {
      position: relative; width: 46px; height: 26px; border-radius: 999px;
      background: var(--raised); border: 1px solid var(--line); cursor: pointer;
      transition: background 0.16s ease, border-color 0.16s ease;
    }
    .switch.on { background: var(--accent); border-color: var(--accent); }
    .knob {
      position: absolute; top: 2px; left: 2px; width: 20px; height: 20px;
      border-radius: 50%; background: #fff; transition: transform 0.16s ease;
    }
    .switch.on .knob { transform: translateX(20px); background: var(--accent-d); }
  `],
})
export class PollCreateComponent {
  @Input({ required: true }) channelId!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  private readonly state = inject(CommunityStateService);

  readonly MAX = 10;

  question = '';
  isMultiple = false;

  /** Filled option values. The view always shows one extra empty row (up to MAX). */
  readonly options = signal<string[]>([]);

  /**
   * Rows to render: every filled option plus a trailing empty row so the user
   * can keep adding (WhatsApp behaviour), capped at MAX.
   */
  readonly rows = computed<string[]>(() => {
    const filled = this.options();
    if (filled.length >= this.MAX) return filled.slice(0, this.MAX);
    return [...filled, ''];
  });

  readonly canCreate = computed(() => {
    const q = this.question.trim().length > 0;
    const filled = this.options().filter(o => o.trim().length > 0).length;
    return q && filled >= 2;
  });

  trackRow(i: number): number {
    return i;
  }

  /** Whether a given row shows a remove button (only real, non-last-empty rows). */
  canRemove(i: number): boolean {
    return i < this.options().length && this.options().length > 0;
  }

  setOption(i: number, value: string): void {
    this.options.update(arr => {
      const next = [...arr];
      if (i < next.length) {
        next[i] = value;
      } else {
        // Typing into the trailing empty row appends a new option.
        next.push(value);
      }
      // Trim trailing empties beyond the kept set (keeps state clean).
      while (next.length > 0 && next[next.length - 1].trim() === '' && next.length > i + 1) {
        next.pop();
      }
      return next;
    });
  }

  removeOption(i: number): void {
    this.options.update(arr => arr.filter((_, idx) => idx !== i));
  }

  create(): void {
    if (!this.canCreate()) return;
    const opts = this.options().map(o => o.trim()).filter(o => o.length > 0);
    this.state.createPoll(this.channelId, {
      question: this.question.trim(),
      options: opts,
      is_multiple: this.isMultiple,
    });
    this.created.emit();
  }

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this.cancel.emit();
    }
  }
}
