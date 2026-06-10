/**
 * Phase 2 — renders a single poll: question, options with live vote bars, the
 * viewer's selection, and (for the creator/mods) close/delete. Styled to the
 * community "Arena" look.
 *
 * Phase 2e: the component holds its own local copy of the poll (a signal seeded
 * from the @Input) and updates it directly from the vote/close API response,
 * forcing change detection. This makes voting feel instant and immune to the
 * OnPush + nested-thread re-render timing that previously delayed updates.
 */
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges,
  computed, inject, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityStateService } from '../../services/community-state.service';
import { CommunityService } from '../../services/community.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Poll, PollOption } from '../../models/community.model';

@Component({
  selector: 'app-poll-display',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="poll" *ngIf="pollView() as p">
      <div class="poll-head">
        <span class="poll-icon">📊</span>
        <span class="poll-q">{{ p.question }}</span>
        <span class="poll-flag" *ngIf="p.is_multiple" title="Multiple choice">multi</span>
        <span class="poll-flag closed" *ngIf="!p.is_open">closed</span>
      </div>

      <div class="options">
        <button
          *ngFor="let opt of p.options; trackBy: trackOpt"
          class="opt"
          [class.voted]="opt.voted"
          [disabled]="!p.is_open || busy()"
          (click)="vote(opt)"
        >
          <span class="bar" [style.width.%]="pct(opt)"></span>
          <span class="marker" [class.checked]="opt.voted" [class.round]="p.is_multiple">
            <span class="tick" *ngIf="opt.voted">✓</span>
          </span>
          <span class="opt-label">{{ opt.label }}</span>
          <span class="opt-pct">{{ pct(opt) }}%</span>
          <span class="opt-count">{{ opt.votes }}</span>
        </button>
      </div>

      <div class="poll-hint" *ngIf="p.is_open && !hasVoted()">
        Tap an option to vote{{ p.is_multiple ? ' · you can choose more than one' : '' }}
      </div>

      <div class="poll-foot">
        <span class="total">{{ p.total_votes }} vote{{ p.total_votes === 1 ? '' : 's' }}</span>
        <span class="by" *ngIf="p.author.nickname">· by {{ p.author.nickname }}</span>
        <span class="spacer"></span>
        <button *ngIf="canManage() && p.is_open" class="ghost" (click)="close()">Close</button>
        <button *ngIf="canManage()" class="ghost danger" (click)="remove()">Delete</button>
      </div>
    </div>
  `,
  styles: [`
    :host { --accent: #00ffa3; --surface: #12121e; --raised: #16161f; --line: rgba(255,255,255,0.08); --text: #eaeaf2; --mut: #7a7a92; }
    .poll { background: var(--surface); border: 1px solid var(--line); border-left: 2px solid var(--accent); border-radius: 10px; padding: 0.75rem 0.9rem; margin: 0.4rem 0; }
    .poll-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
    .poll-icon { font-size: 0.95rem; }
    .poll-q { font-weight: 700; color: var(--text); font-size: 0.95rem; }
    .poll-flag { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; color: #06281c; background: var(--accent); padding: 0.05rem 0.4rem; border-radius: 999px; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .poll-flag.closed { background: #4c4c63; color: #d0d0e0; }
    .options { display: flex; flex-direction: column; gap: 0.35rem; }
    .opt {
      position: relative; display: flex; align-items: center; gap: 0.6rem;
      background: var(--raised); border: 1px solid var(--line); border-radius: 8px;
      padding: 0.55rem 0.7rem; cursor: pointer; overflow: hidden; text-align: left;
      color: var(--text); font-size: 0.88rem; transition: border-color 0.12s ease, background 0.12s ease;
    }
    .opt:hover:not(:disabled) { border-color: rgba(0,255,163,0.55); background: #1b1b28; }
    .opt:disabled { cursor: default; }
    .opt.voted { border-color: var(--accent); }
    .bar { position: absolute; left: 0; top: 0; bottom: 0; background: rgba(0,255,163,0.14); transition: width 0.3s ease; z-index: 0; }
    .opt.voted .bar { background: rgba(0,255,163,0.30); }
    .marker {
      position: relative; z-index: 1; flex-shrink: 0;
      width: 20px; height: 20px; border-radius: 5px;
      border: 2px solid var(--mut); display: grid; place-items: center;
      transition: border-color 0.12s ease, background 0.12s ease;
    }
    .marker.round { border-radius: 50%; }
    .marker.checked { background: var(--accent); border-color: var(--accent); }
    .tick { color: #06281c; font-size: 0.7rem; font-weight: 900; line-height: 1; }
    .opt-label { position: relative; z-index: 1; flex: 1; }
    .opt-pct { position: relative; z-index: 1; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.8rem; color: var(--accent); font-weight: 700; }
    .opt-count { position: relative; z-index: 1; font-size: 0.72rem; color: var(--mut); min-width: 1.5rem; text-align: right; }
    .poll-hint { font-size: 0.72rem; color: var(--mut); margin-top: 0.45rem; font-style: italic; }
    .poll-foot { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem; font-size: 0.75rem; color: var(--mut); }
    .spacer { flex: 1; }
    .ghost { background: transparent; border: none; color: var(--mut); cursor: pointer; font-size: 0.75rem; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .ghost:hover { color: var(--accent); }
    .ghost.danger:hover { color: #ff6b6b; }
  `],
})
export class PollDisplayComponent implements OnChanges {
  @Input({ required: true }) poll!: Poll;
  @Input({ required: true }) channelId!: string;

  private readonly state = inject(CommunityStateService);
  private readonly api   = inject(CommunityService);
  private readonly auth  = inject(AuthService);
  private readonly cdr   = inject(ChangeDetectorRef);

  /** Local, authoritative copy for rendering — updated on each vote response. */
  readonly pollView = signal<Poll | null>(null);

  /** True while a vote/close request is in flight (prevents double-taps). */
  readonly busy = signal(false);

  ngOnChanges(): void {
    // Seed/refresh the local view whenever the input poll changes (e.g. on a
    // real-time message update). Local edits from voting also flow into this.
    this.pollView.set(this.poll);
  }

  pct(opt: PollOption): number {
    const total = this.pollView()?.total_votes ?? 0;
    if (total === 0) return 0;
    return Math.round((opt.votes / total) * 100);
  }

  /** Whether the current viewer has voted for any option in this poll. */
  hasVoted(): boolean {
    return (this.pollView()?.options ?? []).some(o => o.voted);
  }

  /** Creator or platform admin may close/delete (community mods also, server-enforced). */
  canManage(): boolean {
    const me = this.auth.currentUser();
    const p  = this.pollView();
    if (!me || !p) return false;
    return me.role === 'admin' || me.id === p.author.id;
  }

  trackOpt(_i: number, opt: PollOption): string {
    return opt.id;
  }

  vote(opt: PollOption): void {
    const p = this.pollView();
    if (!p || !p.is_open || this.busy()) return;

    this.busy.set(true);
    this.api.votePoll(p.id, opt.id).subscribe({
      next: updated => {
        this.pollView.set(updated);     // instant local update
        this.busy.set(false);
        this.cdr.markForCheck();        // force OnPush re-render now
        this.state.syncPoll(this.channelId, updated); // keep shared state in step
      },
      error: () => {
        this.busy.set(false);
        this.cdr.markForCheck();
      },
    });
  }

  close(): void {
    const p = this.pollView();
    if (!p) return;
    this.busy.set(true);
    this.api.closePoll(p.id).subscribe({
      next: updated => {
        this.pollView.set(updated);
        this.busy.set(false);
        this.cdr.markForCheck();
        this.state.syncPoll(this.channelId, updated);
      },
      error: () => { this.busy.set(false); this.cdr.markForCheck(); },
    });
  }

  remove(): void {
    const p = this.pollView();
    if (!p) return;
    if (!confirm('Delete this poll?')) return;
    this.state.deletePoll(this.channelId, p.id);
  }
}
