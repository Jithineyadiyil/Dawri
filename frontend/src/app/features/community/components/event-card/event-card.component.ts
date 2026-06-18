/**
 * Phase 4 — a single community event: title, when, where, RSVP buttons with
 * live counts, and (for moderators) cancel/delete. Arena-styled.
 */
import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommunityEvent, RsvpStatus } from '../../models/community.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="event" [class.cancelled]="event.is_cancelled">
      <div class="when">
        <span class="day">{{ event.starts_at | date:'MMM d' }}</span>
        <span class="time">{{ event.starts_at | date:'h:mm a' }}</span>
      </div>

      <div class="info">
        <div class="title-row">
          <span class="title">{{ event.title }}</span>
          <span class="badge cancelled" *ngIf="event.is_cancelled">cancelled</span>
          <span class="badge past" *ngIf="!event.is_cancelled && !event.is_upcoming">ended</span>
        </div>
        <p class="desc" *ngIf="event.description">{{ event.description }}</p>
        <div class="meta">
          <span *ngIf="event.location" class="loc">📍 {{ event.location }}</span>
          <span class="range" *ngIf="event.ends_at">
            until {{ event.ends_at | date:'MMM d, h:mm a' }}
          </span>
          <span class="by" *ngIf="event.creator.nickname">· by {{ event.creator.nickname }}</span>
        </div>

        <div class="rsvp" *ngIf="!event.is_cancelled">
          <button
            *ngFor="let opt of options"
            class="rsvp-btn"
            [class.active]="event.my_status === opt.key"
            [attr.data-kind]="opt.key"
            (click)="rsvp(opt.key)"
          >
            {{ opt.label }}
            <span class="n">{{ countFor(opt.key) }}</span>
          </button>
        </div>

        <div class="admin" *ngIf="canManage()">
          <button class="ghost" *ngIf="!event.is_cancelled" (click)="cancel()">Cancel event</button>
          <button class="ghost danger" (click)="remove()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --accent: #7c3aed; --accent-s: #a78bfa; --surface: #161228; --raised: #1c1833; --line: rgba(124,58,237,0.18); --text: #eaeaf2; --mut: #8a8a9e; --gold: #d4af37; }
    .event { display: flex; gap: 0.9rem; background: var(--surface); border: 1px solid var(--line); border-left: 3px solid var(--accent); border-radius: 12px; padding: 0.85rem 1rem; }
    .event.cancelled { opacity: 0.6; border-left-color: #4c4c63; }
    .when { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 64px; padding: 0.4rem 0.5rem; background: var(--raised); border-radius: 10px; }
    .day { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.05rem; color: var(--accent-s); text-transform: uppercase; letter-spacing: 0.03em; }
    .time { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.7rem; color: var(--mut); margin-top: 0.15rem; }
    .info { flex: 1; min-width: 0; }
    .title-row { display: flex; align-items: center; gap: 0.5rem; }
    .title { font-weight: 700; color: var(--text); font-size: 1rem; }
    .badge { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.05rem 0.4rem; border-radius: 999px; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .badge.cancelled { background: #ff6b6b; color: #2a0a0a; }
    .badge.past { background: #4c4c63; color: #d0d0e0; }
    .desc { margin: 0.35rem 0 0; color: #cfcfe0; font-size: 0.88rem; line-height: 1.45; white-space: pre-wrap; }
    .meta { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.4rem; font-size: 0.76rem; color: var(--mut); }
    .loc { color: #b8b8c8; }
    .rsvp { display: flex; gap: 0.4rem; margin-top: 0.7rem; flex-wrap: wrap; }
    .rsvp-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      padding: 0.35rem 0.7rem; border-radius: 999px; cursor: pointer;
      background: var(--raised); border: 1px solid var(--line); color: #cfcfe0;
      font-size: 0.8rem; transition: border-color 0.12s ease, background 0.12s ease;
    }
    .rsvp-btn:hover { border-color: rgba(124,58,237,0.5); background: rgba(124,58,237,0.08); }
    .rsvp-btn .n { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.72rem; color: var(--mut); }
    .rsvp-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); font-weight: 700; box-shadow: 0 0 12px rgba(124,58,237,0.35); }
    .rsvp-btn.active .n { color: rgba(255,255,255,0.8); }
    .admin { display: flex; gap: 0.6rem; margin-top: 0.6rem; }
    .ghost { background: transparent; border: none; color: var(--mut); cursor: pointer; font-size: 0.74rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .ghost:hover { color: var(--accent-s); }
    .ghost.danger:hover { color: #ff6b6b; }
  `],
})
export class EventCardComponent {
  @Input({ required: true }) event!: CommunityEvent;
  @Input({ required: true }) communityId!: string;

  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);

  readonly options: { key: RsvpStatus; label: string }[] = [
    { key: 'going',    label: 'Going' },
    { key: 'maybe',    label: 'Maybe' },
    { key: 'declined', label: "Can't go" },
  ];

  countFor(key: RsvpStatus): number {
    return this.event.counts[key] ?? 0;
  }

  /** Creator or platform admin (community mods also; server enforces). */
  canManage(): boolean {
    const me = this.auth.currentUser();
    if (!me) return false;
    return me.role === 'admin' || me.id === this.event.creator.id;
  }

  rsvp(status: RsvpStatus): void {
    if (this.event.is_cancelled) return;
    this.state.rsvpEvent(this.communityId, this.event.id, status);
  }

  cancel(): void {
    if (!confirm('Cancel this event? Members will see it as cancelled.')) return;
    this.state.cancelEvent(this.communityId, this.event.id);
  }

  remove(): void {
    if (!confirm('Delete this event permanently?')) return;
    this.state.deleteEvent(this.communityId, this.event.id);
  }
}
