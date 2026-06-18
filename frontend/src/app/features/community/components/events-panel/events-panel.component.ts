/**
 * Phase 4 — the events panel for a community: a slide-in overlay listing
 * upcoming events with RSVP, a "New event" button (moderators+), and a toggle
 * to include past events. Opened from the community header.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { AuthService } from '../../../../core/services/auth.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventCreateComponent } from '../event-create/event-create.component';
import { CommunityEvent } from '../../models/community.model';

@Component({
  selector: 'app-events-panel',
  standalone: true,
  imports: [CommonModule, EventCardComponent, EventCreateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onBackdrop($event)">
      <aside class="panel">
        <header class="ph">
          <span class="title">Events</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <div class="bar">
          <button
            *ngIf="canCreate()"
            class="new"
            (click)="showForm.set(!showForm())"
          >{{ showForm() ? 'Close form' : '+ New event' }}</button>
          <label class="past-toggle">
            <input type="checkbox" [checked]="includePast()" (change)="togglePast()" />
            Show past
          </label>
        </div>

        <app-event-create
          *ngIf="showForm() && communityId"
          [communityId]="communityId"
          (cancel)="showForm.set(false)"
          (created)="showForm.set(false)"
        />

        <div class="list">
          <div class="loading" *ngIf="isLoading()">Loading events…</div>
          <div class="empty" *ngIf="!isLoading() && events().length === 0">
            No events yet.
            <span *ngIf="canCreate()">Create one to get the community together.</span>
          </div>
          <app-event-card
            *ngFor="let ev of events(); trackBy: trackEvent"
            [event]="ev"
            [communityId]="communityId"
          />
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host { --accent: #7c3aed; --accent-s: #a78bfa; --bg: #0b0a14; --surface: #161228; --raised: #1c1833; --line: rgba(124,58,237,0.15); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 900; background: rgba(0,0,0,0.55); display: flex; justify-content: flex-end; }
    .panel { width: 100%; max-width: 460px; height: 100%; background: var(--bg); border-left: 1px solid var(--line); display: flex; flex-direction: column; animation: slide 0.18s ease-out; }
    @keyframes slide {
      0%   { transform: translateX(40px); opacity: 0; }
      60%  { transform: translateX(-6px); opacity: 1; }
      80%  { transform: translateX(3px); }
      100% { transform: translateX(0); }
    }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .bar { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.1rem; gap: 0.6rem; }
    .new { background: var(--accent); color: #fff; border: none; border-radius: 8px; padding: 0.45rem 0.9rem; font-weight: 700; cursor: pointer; font-size: 0.85rem; transition: background 0.14s, box-shadow 0.14s; }
    .new:hover { background: #6d28d9; box-shadow: 0 0 14px rgba(124,58,237,0.4); }
    .past-toggle { display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: var(--mut); cursor: pointer; }
    .list { flex: 1; overflow-y: auto; padding: 0.5rem 1.1rem 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; min-height: 0; }
    .loading, .empty { color: var(--mut); font-size: 0.9rem; padding: 1rem 0; text-align: center; }
  `],
})
export class EventsPanelComponent implements OnInit {
  @Input({ required: true }) communityId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);

  readonly showForm    = signal(false);
  readonly includePast = signal(false);
  readonly isLoading   = this.state.isLoadingEvents;

  readonly events = computed<CommunityEvent[]>(() =>
    this.state.eventsByCommunity()[this.communityId] ?? []
  );

  ngOnInit(): void {
    this.state.loadEvents(this.communityId, this.includePast());
  }

  /** Moderators+ (or platform admin) may create events. */
  canCreate(): boolean {
    const me = this.auth.currentUser();
    if (!me) return false;
    if (me.role === 'admin') return true;
    const member = (this.state.membersByCommunity()[this.communityId] ?? [])
      .find(m => m.user.id === me.id);
    return !!member && (member.role === 'owner' || member.role === 'admin' || member.role === 'moderator');
  }

  togglePast(): void {
    this.includePast.update(v => !v);
    this.state.loadEvents(this.communityId, this.includePast());
  }

  trackEvent(_i: number, ev: CommunityEvent): string {
    return ev.id;
  }

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this.close.emit();
    }
  }
}
