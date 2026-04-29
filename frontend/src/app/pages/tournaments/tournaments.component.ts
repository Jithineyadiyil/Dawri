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
 * Tournaments listing page (Sprint 3 redesign).
 *
 * Key UX additions:
 *   • Hero-style cards with game-specific cover art and gradient accent
 *   • Animated filter chips (game, format, status)
 *   • Search with live filtering
 *   • Skeleton loader + empty state with illustration
 *   • Entry animation stagger (60ms per card, 4-col grid)
 *
 * Branding is intentionally NOT applied here — the listing page stays on
 * platform defaults so different companies' tournaments don't visually
 * fight each other in the grid.
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

  // Chip-based filters
  readonly games = [
    { value: '',            label: 'All Games',    emoji: '🎮' },
    { value: 'ea_fc25',     label: 'EA FC 25',     emoji: '⚽' },
    { value: 'pubg_mobile', label: 'PUBG Mobile',  emoji: '🔫' },
    { value: 'cod_mobile',  label: 'CoD Mobile',   emoji: '🎯' },
  ];
  readonly formats = [
    { value: '',                     label: 'All Formats' },
    { value: 'single_elimination',   label: 'Single Elim' },
    { value: 'double_elimination',   label: 'Double Elim' },
    { value: 'round_robin',          label: 'Round Robin' },
    { value: 'swiss',                label: 'Swiss' },
  ];
  readonly statuses: { value: string; label: string; match: string[] }[] = [
    { value: '',          label: 'All Status', match: [] },
    { value: 'open',      label: 'Open',       match: ['registration', 'registration_open'] },
    { value: 'live',      label: 'Live',       match: ['ongoing', 'in_progress'] },
    { value: 'completed', label: 'Completed',  match: ['completed'] },
  ];

  readonly filter = {
    game:   signal<string>(''),
    format: signal<string>(''),
    status: signal<string>(''),
  };

  /** Filter applied client-side on the cached list. */
  readonly filtered = computed(() => {
    const s  = this.search().trim().toLowerCase();
    const g  = this.filter.game();
    const f  = this.filter.format();
    const st = this.filter.status();
    const stMatches = st ? (this.statuses.find(s => s.value === st)?.match ?? []) : [];
    return this.items().filter(t => {
      if (s  && !(`${t.name} ${t.name_ar ?? ''}`.toLowerCase().includes(s))) return false;
      if (g  && t.game   !== g)  return false;
      if (f  && t.format !== f)  return false;
      if (stMatches.length && !stMatches.includes(t.status)) return false;
      return true;
    });
  });

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

  /** Game-specific default cover (used when tournament has no uploaded cover). */
  defaultCoverClass(game: string): string {
    return `game-bg game-bg--${game}`;
  }

  statusAccentClass(status: string): string {
    return `status-dot status-dot--${status}`;
  }
}
