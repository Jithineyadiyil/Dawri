import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DateRange {
  from: string;   // YYYY-MM-DD
  to: string;     // YYYY-MM-DD
}

/**
 * DateRangePickerComponent
 *
 * Shared across all finance reports. Renders two date inputs + preset
 * quick-select buttons (Today, This week, This month, Last 30 days,
 * This quarter, This year, Custom).
 *
 * Emits a `rangeChange` event whenever the user modifies either input
 * or picks a preset. Parent owns the state.
 */
@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="drp">
      <div class="presets">
        @for (preset of presets; track preset.key) {
          <button class="preset" [class.active]="activePreset === preset.key"
                  (click)="applyPreset(preset.key)">
            {{ preset.label }}
          </button>
        }
      </div>
      <div class="inputs">
        <label>
          From
          <input type="date" [ngModel]="from" (ngModelChange)="onFromChange($event)" />
        </label>
        <label>
          To
          <input type="date" [ngModel]="to" (ngModelChange)="onToChange($event)" />
        </label>
      </div>
    </div>
  `,
  styles: [`
    .drp {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
      padding: 10px 14px;
      background: #0d0d1a;
      border: 1px solid #2a2a3a;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .presets { display: flex; gap: 6px; flex-wrap: wrap; }
    .preset {
      background: transparent;
      border: 1px solid #2a2a3a;
      color: #aaa;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      letter-spacing: 0.4px;
      transition: all 0.15s;
    }
    .preset:hover  { background: #1a1a2a; color: #fff; }
    .preset.active { background: #a855f7; color: #fff; border-color: #a855f7; }
    .inputs { display: flex; gap: 12px; }
    .inputs label {
      display: flex;
      flex-direction: column;
      font-size: 10px;
      color: #888;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
    .inputs input {
      background: #111122;
      border: 1px solid #2a2a3a;
      color: #fff;
      padding: 6px 8px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 12px;
      margin-top: 3px;
    }
    .inputs input:focus { outline: none; border-color: #a855f7; }
  `],
})
export class DateRangePickerComponent implements OnInit {
  @Input() from = '';
  @Input() to   = '';
  @Output() rangeChange = new EventEmitter<DateRange>();

  readonly presets = [
    { key: 'today',      label: 'Today' },
    { key: 'this_week',  label: 'This week' },
    { key: 'this_month', label: 'This month' },
    { key: 'last_30',    label: 'Last 30 days' },
    { key: 'quarter',    label: 'This quarter' },
    { key: 'year',       label: 'This year' },
  ] as const;

  activePreset: string = 'last_30';

  ngOnInit(): void {
    // Default to last 30 days if nothing provided
    if (!this.from || !this.to) {
      this.applyPreset('last_30');
    }
  }

  applyPreset(key: string): void {
    const now = new Date();
    let start: Date;
    let end: Date = new Date(now);

    switch (key) {
      case 'today':
        start = new Date(now);
        break;
      case 'this_week': {
        const day = now.getDay(); // 0=Sun .. 6=Sat
        start = new Date(now);
        start.setDate(now.getDate() - day);
        break;
      }
      case 'this_month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last_30':
        start = new Date(now);
        start.setDate(now.getDate() - 30);
        break;
      case 'quarter': {
        const q = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), q * 3, 1);
        break;
      }
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return;
    }

    this.from = this.fmt(start);
    this.to   = this.fmt(end);
    this.activePreset = key;
    this.emit();
  }

  onFromChange(v: string): void {
    this.from = v;
    this.activePreset = 'custom';
    this.emit();
  }

  onToChange(v: string): void {
    this.to = v;
    this.activePreset = 'custom';
    this.emit();
  }

  private emit(): void {
    if (this.from && this.to) {
      this.rangeChange.emit({ from: this.from, to: this.to });
    }
  }

  private fmt(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }
}
