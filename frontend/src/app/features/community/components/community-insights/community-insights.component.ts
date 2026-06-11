/**
 * Phase 7 — community insights (moderators+). Activity overview: headline
 * totals, a 14-day message trend (CSS bars), per-channel message counts, and
 * the most active members. Self-contained; fetches on init. Embeddable in the
 * Manage panel (suppresses its own overlay when [embedded]).
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '../../services/community.service';
import { CommunityAnalytics } from '../../models/community.model';

@Component({
  selector: 'app-community-insights',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class.overlay]="!embedded" (click)="onBackdrop($event)">
      <aside [class.panel]="!embedded" [class.embedded-body]="embedded">
        <header class="ph" *ngIf="!embedded">
          <span class="title">Insights</span>
          <button class="x" (click)="close.emit()" title="Close">✕</button>
        </header>

        <div class="body" [class.flush]="embedded">
          <div class="loading" *ngIf="loading()">Loading…</div>

          <ng-container *ngIf="!loading() && data() as d">
            <!-- Totals -->
            <div class="cards">
              <div class="card">
                <span class="num">{{ d.totals.messages }}</span>
                <span class="lbl">Messages</span>
              </div>
              <div class="card">
                <span class="num">{{ d.totals.members }}</span>
                <span class="lbl">Members</span>
              </div>
              <div class="card">
                <span class="num">{{ d.totals.channels }}</span>
                <span class="lbl">Channels</span>
              </div>
              <div class="card">
                <span class="num">{{ d.totals.messages_last_7 }}</span>
                <span class="lbl">Last 7 days</span>
              </div>
            </div>

            <!-- 14-day trend -->
            <section class="block">
              <h4>Messages · last 14 days</h4>
              <div class="trend" *ngIf="maxTrend() > 0; else noTrend">
                <div class="bar-wrap" *ngFor="let t of d.trend" [title]="t.date + ': ' + t.count">
                  <div class="bar" [style.height.%]="barHeight(t.count)"></div>
                </div>
              </div>
              <ng-template #noTrend><p class="hint">No messages in this window.</p></ng-template>
            </section>

            <!-- Per channel -->
            <section class="block">
              <h4>By channel</h4>
              <p class="hint" *ngIf="d.per_channel.length === 0">No activity yet.</p>
              <div class="row" *ngFor="let c of d.per_channel">
                <span class="row-name"># {{ c.channel }}</span>
                <div class="row-bar"><div class="row-fill" [style.width.%]="pct(c.count, d.per_channel[0].count)"></div></div>
                <span class="row-num">{{ c.count }}</span>
              </div>
            </section>

            <!-- Top members -->
            <section class="block">
              <h4>Most active members</h4>
              <p class="hint" *ngIf="d.top_members.length === 0">No activity yet.</p>
              <div class="member" *ngFor="let m of d.top_members; let i = index">
                <span class="rank">{{ i + 1 }}</span>
                <span class="m-ava">{{ initials(m.name) }}</span>
                <span class="m-name">{{ m.name }}</span>
                <span class="m-num">{{ m.count }} msgs</span>
              </div>
            </section>
          </ng-container>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host { --accent: #00ffa3; --accent-d: #06281c; --gold: #d4af37; --bg: #0b0b14; --surface: #14141f; --raised: #16161f; --line: rgba(255,255,255,0.09); --text: #eaeaf2; --mut: #8a8a9e; }
    .overlay { position: fixed; inset: 0; z-index: 960; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; }
    .panel { width: 100%; max-width: 480px; height: 100%; background: var(--bg); border-left: 1px solid var(--line); display: flex; flex-direction: column; }
    .embedded-body { display: block; width: 100%; }
    .ph { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid var(--line); }
    .title { font-family: 'Anton','Bebas Neue',sans-serif; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text); }
    .x { background: none; border: none; color: var(--mut); cursor: pointer; font-size: 1.05rem; width: 32px; height: 32px; border-radius: 50%; }
    .body { flex: 1; overflow-y: auto; padding: 1rem 1.1rem 2rem; min-height: 0; }
    .body.flush { padding: 0.75rem 0 1rem; }
    .loading, .hint { color: var(--mut); font-size: 0.85rem; }
    .cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; margin-bottom: 1.4rem; }
    .card { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 0.75rem 0.9rem; display: flex; flex-direction: column; gap: 0.15rem; }
    .num { font-family: 'Anton','Bebas Neue',sans-serif; font-size: 1.7rem; color: var(--accent); line-height: 1; }
    .lbl { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--mut); }
    .block { margin-bottom: 1.5rem; }
    h4 { margin: 0 0 0.6rem; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--mut); font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .trend { display: flex; align-items: flex-end; gap: 3px; height: 90px; padding: 0.3rem 0; }
    .bar-wrap { flex: 1; height: 100%; display: flex; align-items: flex-end; }
    .bar { width: 100%; min-height: 2px; background: linear-gradient(180deg, var(--accent), var(--accent-d)); border-radius: 3px 3px 0 0; transition: height 0.2s ease; }
    .row { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.45rem; }
    .row-name { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.8rem; color: #cfcfe0; flex: 0 0 30%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .row-bar { flex: 1; height: 8px; background: var(--raised); border-radius: 999px; overflow: hidden; }
    .row-fill { height: 100%; background: var(--accent); border-radius: 999px; }
    .row-num { font-size: 0.78rem; color: var(--mut); flex: 0 0 auto; min-width: 28px; text-align: right; }
    .member { display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .rank { font-family: 'Anton','Bebas Neue',sans-serif; color: var(--gold); width: 20px; }
    .m-ava { width: 26px; height: 26px; border-radius: 50%; background: var(--raised); display: grid; place-items: center; font-family: 'Anton','Bebas Neue',sans-serif; font-size: 0.72rem; color: var(--accent); box-shadow: inset 0 0 0 1px var(--line); flex-shrink: 0; }
    .m-name { flex: 1; color: var(--text); font-size: 0.9rem; }
    .m-num { font-size: 0.78rem; color: var(--mut); }
  `],
})
export class CommunityInsightsComponent implements OnInit {
  @Input({ required: true }) communityId!: string;
  @Input() embedded = false;
  @Output() close = new EventEmitter<void>();

  private readonly api = inject(CommunityService);

  readonly data    = signal<CommunityAnalytics | null>(null);
  readonly loading = signal(true);

  readonly maxTrend = computed(() => {
    const d = this.data();
    if (!d) return 0;
    return d.trend.reduce((m, t) => Math.max(m, t.count), 0);
  });

  ngOnInit(): void {
    this.api.getAnalytics(this.communityId).subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  barHeight(count: number): number {
    const max = this.maxTrend();
    return max > 0 ? Math.max(3, Math.round((count / max) * 100)) : 0;
  }

  pct(count: number, max: number): number {
    return max > 0 ? Math.max(2, Math.round((count / max) * 100)) : 0;
  }

  /** Two-letter fallback for the member avatar circle. */
  initials(name: string): string {
    return (name ?? '?').slice(0, 2).toUpperCase();
  }

  onBackdrop(ev: MouseEvent): void {
    if (this.embedded) return;
    if ((ev.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }
}
