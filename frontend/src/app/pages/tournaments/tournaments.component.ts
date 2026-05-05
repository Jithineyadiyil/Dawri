import {
  ChangeDetectionStrategy, Component, OnInit,
  inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService }  from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { PlatformSponsorsStripComponent } from '../../components/platform-sponsors-strip/platform-sponsors-strip.component';

/**
 * Tournaments listing page (Saudi palette redesign).
 *
 * Functionality preserved:
 *   • Search (live filter on name/name_ar)
 *   • Game / Format / Status chip filters (existing signals)
 *   • Loading skeleton, error box, empty state
 *   • Card → /tournaments/:id route
 *   • canCreate() gate for "+ New Tournament"
 *   • <app-platform-sponsors-strip>
 *
 * Added (purely additive — does not break existing logic):
 *   • Live counter values from items() (live / open / total / payouts)
 *   • Chip counts per game/status
 *   • Sort dropdown (starting_soon / prize_high / popular / newest)
 *   • View toggle (grid / list / calendar — calendar = "soon" placeholder)
 *   • Per-card derived helpers: progress %, time-until-close, status group
 */
@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, PlatformSponsorsStripComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly fb  = inject(FormBuilder);

  readonly loading   = signal(true);
  readonly error     = signal<string | null>(null);
  readonly items     = signal<any[]>([]);
  readonly search    = signal('');

  // View mode: 'grid' | 'list' | 'calendar' (calendar shows a "coming soon" panel)
  readonly view = signal<'grid' | 'list' | 'calendar'>('grid');

  // Sort: 'starting_soon' | 'prize_high' | 'popular' | 'newest'
  readonly sort = signal<'starting_soon' | 'prize_high' | 'popular' | 'newest'>('starting_soon');

  // Chip-based filters
  readonly games = [
    { value: '',            label: 'All Games',    short: 'All' },
    { value: 'ea_fc25',     label: 'EA FC 25',     short: 'FC' },
    { value: 'pubg_mobile', label: 'PUBG Mobile',  short: 'PB' },
    { value: 'cod_mobile',  label: 'CoD Mobile',   short: 'CD' },
  ];
  readonly formats = [
    { value: '',                   label: 'All Formats' },
    { value: 'single_elimination', label: 'Single Elim' },
    { value: 'double_elimination', label: 'Double Elim' },
    { value: 'round_robin',        label: 'Round Robin' },
    { value: 'swiss',              label: 'Swiss' },
  ];
  readonly statuses: { value: string; label: string; match: string[] }[] = [
    { value: '',          label: 'All',       match: [] },
    { value: 'live',      label: 'Live',      match: ['ongoing', 'in_progress'] },
    { value: 'open',      label: 'Open',      match: ['registration', 'registration_open'] },
    { value: 'completed', label: 'Completed', match: ['completed'] },
  ];
  readonly sortOptions = [
    { value: 'starting_soon', label: 'Sort: Starting soon' },
    { value: 'prize_high',    label: 'Sort: Highest prize' },
    { value: 'popular',       label: 'Sort: Most popular' },
    { value: 'newest',        label: 'Sort: Newest' },
  ];

  readonly filter = {
    game:   signal<string>(''),
    format: signal<string>(''),
    status: signal<string>(''),
  };

  /** Filtered + sorted list. */
  readonly filtered = computed(() => {
    const s  = this.search().trim().toLowerCase();
    const g  = this.filter.game();
    const f  = this.filter.format();
    const st = this.filter.status();
    const stMatches = st ? (this.statuses.find(x => x.value === st)?.match ?? []) : [];

    const list = this.items().filter(t => {
      if (s  && !(`${t.name} ${t.name_ar ?? ''}`.toLowerCase().includes(s))) return false;
      if (g  && t.game   !== g)  return false;
      if (f  && t.format !== f)  return false;
      if (stMatches.length && !stMatches.includes(t.status)) return false;
      return true;
    });

    const sorted = [...list];
    switch (this.sort()) {
      case 'prize_high':
        sorted.sort((a, b) => (this.prizeTotal(b) - this.prizeTotal(a))); break;
      case 'popular':
        sorted.sort((a, b) => (b.participant_count ?? 0) - (a.participant_count ?? 0)); break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at ?? b.starts_at ?? 0).getTime()
                            - new Date(a.created_at ?? a.starts_at ?? 0).getTime()); break;
      case 'starting_soon':
      default:
        sorted.sort((a, b) => new Date(a.starts_at ?? 0).getTime()
                            - new Date(b.starts_at ?? 0).getTime());
    }
    return sorted;
  });

  // ── Counters ─────────────────────────────────────────────────────
  readonly liveCount = computed(() =>
    this.items().filter(t => ['ongoing', 'in_progress'].includes(t.status)).length);
  readonly openCount = computed(() =>
    this.items().filter(t => ['registration', 'registration_open'].includes(t.status)).length);
  readonly totalCount = computed(() => this.items().length);
  readonly payoutsTotal = computed(() => {
    const sar = this.items().reduce((sum, t) => sum + this.prizeTotal(t), 0);
    if (sar >= 1_000_000) return (sar / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (sar >= 1_000)     return (sar / 1_000).toFixed(0) + 'K';
    return String(sar);
  });

  // Per-game counts for chip badges
  gameCount(value: string): number {
    if (!value) return this.items().length;
    return this.items().filter(t => t.game === value).length;
  }
  statusCount(value: string): number {
    const match = this.statuses.find(s => s.value === value)?.match ?? [];
    if (!match.length) return this.items().length;
    return this.items().filter(t => match.includes(t.status)).length;
  }

  readonly canCreate = computed(() => {
    const role = this.auth.currentUser()?.role ?? '';
    return role === 'organizer' || role === 'admin';
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.api.getTournaments({}).subscribe({
      next: (res: any) => { this.items.set(res.data ?? []); this.loading.set(false); },
      error: (err: any) => { this.error.set(err?.error?.message ?? 'Failed to load tournaments.'); this.loading.set(false); },
    });
  }

  setFilter(key: 'game' | 'format' | 'status', value: string): void {
    this.filter[key].set(value);
  }
  setView(v: 'grid' | 'list' | 'calendar'): void { this.view.set(v); }
  setSort(v: string): void { this.sort.set(v as any); }

  /** Prize pool total in SAR — supports prize_pool: [{amount}], prize_pool_sar: number, prize_pool_total. */
  prizeTotal(t: any): number {
    if (typeof t?.prize_pool_sar === 'number')   return t.prize_pool_sar;
    if (typeof t?.prize_pool_total === 'number') return t.prize_pool_total;
    if (Array.isArray(t?.prize_pool)) {
      return t.prize_pool.reduce((sum: number, p: any) => sum + (p?.amount ?? 0), 0);
    }
    return 0;
  }

  /** Short prize string e.g. "15,000 SAR" or "—". */
  prizeLabel(t: any): string {
    const total = this.prizeTotal(t);
    return total > 0 ? `${total.toLocaleString('en-US')}` : '—';
  }

  /** Participation progress 0..100. */
  progressPct(t: any): number {
    const filled = t?.participant_count ?? 0;
    const max    = t?.max_participants ?? 0;
    if (!max) return 0;
    return Math.max(0, Math.min(100, Math.round((filled / max) * 100)));
  }

  /** Status group used by template: 'live' | 'open' | 'completed' | 'draft'. */
  statusGroup(s: string): 'live' | 'open' | 'completed' | 'draft' {
    if (['ongoing', 'in_progress'].includes(s)) return 'live';
    if (['registration', 'registration_open'].includes(s)) return 'open';
    if (s === 'completed') return 'completed';
    return 'draft';
  }

  /** Short two-letter game code for the cover glyph. */
  gameShort(g: string): string {
    return this.games.find(x => x.value === g)?.short ?? '·';
  }

  /** "Closes in N days" / "Closes in N hours" / "Starting soon". */
  closesIn(t: any): string {
    if (!t?.registration_closes_at && !t?.starts_at) return '';
    const target = new Date(t.registration_closes_at ?? t.starts_at).getTime();
    const diffMs = target - Date.now();
    if (diffMs <= 0) return 'Registration closed';
    const days  = Math.floor(diffMs / 86_400_000);
    const hours = Math.floor(diffMs / 3_600_000);
    if (days >= 2)  return `Closes in ${days} days`;
    if (hours >= 1) return `Closes in ${hours} hours`;
    return 'Closes soon';
  }

  /** Whether closing soon (<2 days) — used to colour the foot-time red. */
  isUrgent(t: any): boolean {
    if (!t?.registration_closes_at && !t?.starts_at) return false;
    const target = new Date(t.registration_closes_at ?? t.starts_at).getTime();
    const diffMs = target - Date.now();
    return diffMs > 0 && diffMs < 2 * 86_400_000;
  }
}
