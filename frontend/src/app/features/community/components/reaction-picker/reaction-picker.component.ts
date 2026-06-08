/**
 * Sprint 15 — Tiny emoji picker. Hard-coded popular set for v1;
 * full picker comes in Sprint 16.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reaction-picker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="picker" (click)="close.emit()" >
      <button *ngFor="let e of emojis" (click)="$event.stopPropagation(); pick.emit(e)">{{ e }}</button>
    </div>
  `,
  styles: [`
    .picker {
      position: absolute;
      bottom: 56px;
      left: 0.75rem;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 0.25rem;
      padding: 0.5rem;
      background: #0e1428;
      border: 1px solid #1a1f3a;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      z-index: 100;
    }
    button {
      background: transparent;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
    }
    button:hover { background: #1a1f3a; }
  `],
})
export class ReactionPickerComponent {
  @Output() pick  = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  readonly emojis = [
    '👍', '❤️', '🔥', '😂', '🎉', '👀', '🙏', '💯',
    '⚡', '🏆', '🎮', '⚔️', '🛡️', '😎', '🤯', '💀',
  ];
}
