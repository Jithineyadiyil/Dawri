/**
 * Phase 4 — a form to create a community event: title, optional description,
 * optional location/link, start (and optional end) datetime. Emits via the
 * state service and closes on success/cancel.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ec">
      <div class="ec-head">
        <span>New event</span>
        <button class="x" (click)="cancel.emit()" title="Cancel">✕</button>
      </div>

      <label class="lbl">Title</label>
      <input class="f" [(ngModel)]="title" placeholder="e.g. Tournament watch party" maxlength="200" />

      <label class="lbl">Description <span class="opt">(optional)</span></label>
      <textarea class="f" [(ngModel)]="description" rows="2" placeholder="What's happening?" maxlength="5000"></textarea>

      <label class="lbl">Location or link <span class="opt">(optional)</span></label>
      <input class="f" [(ngModel)]="location" placeholder="Discord, stream URL, or a place" maxlength="255" />

      <div class="row">
        <div class="col">
          <label class="lbl">Starts</label>
          <input class="f" type="datetime-local" [(ngModel)]="startsAt" />
        </div>
        <div class="col">
          <label class="lbl">Ends <span class="opt">(optional)</span></label>
          <input class="f" type="datetime-local" [(ngModel)]="endsAt" />
        </div>
      </div>

      <div class="actions">
        <button class="create" [disabled]="!canCreateNow()" (click)="create()">Create event</button>
      </div>
    </div>
  `,
  styles: [`
    :host { --accent: #00ffa3; --accent-d: #06281c; --surface: #0d0d17; --raised: #16161f; --line: rgba(255,255,255,0.1); --text: #eaeaf2; --mut: #8a8a9e; }
    .ec { background: var(--surface); border: 1px solid rgba(0,255,163,0.25); border-radius: 12px; padding: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem; }
    .ec-head { display: flex; align-items: center; justify-content: space-between; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 0.2rem; }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 0.9rem; }
    .x:hover { color: #ff6b6b; }
    .lbl { font-size: 0.72rem; color: var(--mut); margin-top: 0.35rem; font-family: 'JetBrains Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.05em; }
    .opt { text-transform: none; opacity: 0.7; letter-spacing: 0; }
    .f { background: var(--raised); border: 1px solid var(--line); border-radius: 8px; padding: 0.5rem 0.65rem; color: var(--text); font-family: 'Archivo', system-ui, sans-serif; font-size: 0.92rem; }
    .f:focus { outline: none; border-color: rgba(0,255,163,0.55); }
    textarea.f { resize: vertical; }
    .row { display: flex; gap: 0.6rem; }
    .col { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
    .actions { display: flex; justify-content: flex-end; margin-top: 0.6rem; }
    .create { background: var(--accent); color: var(--accent-d); border: none; border-radius: 8px; padding: 0.5rem 1.1rem; font-weight: 700; cursor: pointer; }
    .create:disabled { opacity: 0.4; cursor: not-allowed; }
  `],
})
export class EventCreateComponent {
  @Input({ required: true }) communityId!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  private readonly state = inject(CommunityStateService);

  title = '';
  description = '';
  location = '';
  startsAt = '';
  endsAt = '';

  /** Valid when title and a start time are present, and end (if set) is after start. */
  private valid(): boolean {
    if (this.title.trim().length === 0) return false;
    if (!this.startsAt) return false;
    if (this.endsAt && new Date(this.endsAt) < new Date(this.startsAt)) return false;
    return true;
  }

  // Use a method in the template for live validation (signals not needed here).
  canCreateNow(): boolean {
    return this.valid();
  }

  create(): void {
    if (!this.valid()) return;
    this.state.createEvent(this.communityId, {
      title: this.title.trim(),
      description: this.description.trim() || null,
      location: this.location.trim() || null,
      // datetime-local yields 'YYYY-MM-DDTHH:mm' (local). Send as-is; the API
      // parses it. Append ':00' seconds for consistency.
      starts_at: this.toIso(this.startsAt),
      ends_at: this.endsAt ? this.toIso(this.endsAt) : null,
    });
    this.created.emit();
  }

  private toIso(local: string): string {
    // 'YYYY-MM-DDTHH:mm' -> 'YYYY-MM-DDTHH:mm:00'
    return local.length === 16 ? `${local}:00` : local;
  }
}
