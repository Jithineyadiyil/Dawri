/**
 * Phase 7 — scheduled posts panel (moderator+). Lists pending scheduled
 * messages for a channel, lets a mod schedule a new one for a future time, and
 * cancel pending ones. Self-contained; opens as a modal from the composer.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../services/community.service';
import { ScheduledMessage } from '../../models/community.model';

@Component({
  selector: 'app-scheduled-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay" (click)="onBackdrop($event)">
      <div class="card">
        <header class="ph">
          <span class="title">Scheduled posts</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <div class="content">
          <!-- Create -->
          <section class="block">
            <h4>Schedule a message</h4>
            <textarea class="f" [(ngModel)]="newContent" rows="3" maxlength="4000"
              placeholder="What should it say?"></textarea>
            <div class="when">
              <input class="f" type="datetime-local" [(ngModel)]="newWhen" [min]="minWhen" />
              <button class="schedule" (click)="schedule()" [disabled]="!canSchedule() || saving()">
                {{ saving() ? 'Scheduling…' : 'Schedule' }}
              </button>
            </div>
            <p class="err" *ngIf="error()">⚠ {{ error() }}</p>
          </section>

          <!-- Pending -->
          <section class="block">
            <h4>Pending</h4>
            <div class="loading" *ngIf="loading()">Loading…</div>
            <p class="hint" *ngIf="!loading() && items().length === 0">Nothing scheduled.</p>
            <div class="item" *ngFor="let s of items()">
              <div class="i-main">
                <span class="i-when">{{ s.scheduled_for | date:'MMM d, h:mm a' }}</span>
                <span class="i-content">{{ s.content }}</span>
              </div>
              <button class="mini danger" (click)="cancel(s)">Cancel</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --accent: #00ffa3; --accent-d: #06281c; --surface: #14141f; --raised: #16161f; --line: rgba(255,255,255,0.1); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 970; background: rgba(0,0,0,0.6); display: grid; place-items: center; padding: 1.5rem; }
    .card { width: 100%; max-width: 520px; max-height: 82vh; background: var(--surface); border: 1px solid var(--line); border-radius: 16px; display: flex; flex-direction: column; }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.2rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton','Bebas Neue',sans-serif; font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .x:hover { background: var(--raised); color: var(--text); }
    .content { padding: 1.1rem 1.2rem; overflow-y: auto; min-height: 0; }
    .block { margin-bottom: 1.4rem; }
    h4 { margin: 0 0 0.6rem; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--mut); font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .f { width: 100%; background: var(--raised); border: 1px solid var(--line); border-radius: 8px; padding: 0.55rem 0.7rem; color: var(--text); font-family: 'Archivo', system-ui, sans-serif; font-size: 0.92rem; }
    .f:focus { outline: none; border-color: rgba(0,255,163,0.55); }
    textarea.f { resize: vertical; line-height: 1.5; margin-bottom: 0.5rem; }
    .when { display: flex; gap: 0.5rem; align-items: center; }
    .when .f { flex: 1; }
    .schedule { background: var(--accent); color: var(--accent-d); border: none; border-radius: 8px; padding: 0.55rem 1rem; font-weight: 700; cursor: pointer; white-space: nowrap; }
    .schedule:disabled { opacity: 0.5; cursor: not-allowed; }
    .err { color: #ff8a8a; font-size: 0.82rem; margin: 0.5rem 0 0; }
    .loading, .hint { color: var(--mut); font-size: 0.85rem; }
    .item { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.55rem 0.6rem; background: var(--raised); border: 1px solid var(--line); border-radius: 8px; margin-bottom: 0.45rem; }
    .i-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.2rem; }
    .i-when { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.72rem; color: var(--accent); }
    .i-content { color: #dcdce8; font-size: 0.88rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    .mini { background: var(--surface); border: 1px solid var(--line); color: #cfcfe0; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.76rem; cursor: pointer; white-space: nowrap; }
    .mini.danger:hover { border-color: #ff6b6b; color: #ff6b6b; }
  `],
})
export class ScheduledPostsComponent implements OnInit {
  @Input({ required: true }) channelId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly api = inject(CommunityService);

  readonly items   = signal<ScheduledMessage[]>([]);
  readonly loading = signal(true);
  readonly saving  = signal(false);
  readonly error   = signal<string | null>(null);

  newContent = '';
  newWhen = '';
  readonly minWhen = this.toLocalInput(new Date(Date.now() + 60_000));

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.api.listScheduled(this.channelId).subscribe({
      next: list => { this.items.set(list); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  canSchedule(): boolean {
    return this.newContent.trim().length > 0 && this.newWhen.length > 0;
  }

  schedule(): void {
    if (!this.canSchedule()) return;
    const when = new Date(this.newWhen);
    if (when.getTime() <= Date.now()) {
      this.error.set('Pick a time in the future.');
      return;
    }
    this.error.set(null);
    this.saving.set(true);
    this.api.scheduleMessage(this.channelId, this.newContent.trim(), when.toISOString()).subscribe({
      next: created => {
        this.items.update(list => [...list, created].sort(
          (a, b) => new Date(a.scheduled_for).getTime() - new Date(b.scheduled_for).getTime()
        ));
        this.newContent = '';
        this.newWhen = '';
        this.saving.set(false);
      },
      error: (e) => {
        this.saving.set(false);
        this.error.set(e?.error?.errors?.scheduled_for?.[0] ?? e?.error?.message ?? 'Could not schedule.');
      },
    });
  }

  cancel(s: ScheduledMessage): void {
    this.api.cancelScheduled(s.id).subscribe(() => {
      this.items.update(list => list.filter(x => x.id !== s.id));
    });
  }

  private toLocalInput(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  onBackdrop(ev: MouseEvent): void {
    if ((ev.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}
