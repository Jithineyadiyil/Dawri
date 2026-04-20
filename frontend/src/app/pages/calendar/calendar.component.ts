import {
  ChangeDetectionStrategy, Component, OnInit, computed, inject, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

const API = 'http://localhost:8001/api/v1';

/** Tournament chip on the calendar. */
export interface CalendarEvent {
  type?: 'tournament';
  id: string;
  name: string;
  name_ar: string | null;
  game: string;
  game_label: string;
  format: string;
  format_label: string;
  status: string;
  status_label: string;
  tier: string | null;
  starts_at: string | null;
  starts_at_date: string | null;
  registration_closes_at: string | null;
  registration_closes_at_date: string | null;
  timezone: string | null;
  max_participants: number | null;
  has_prize: boolean;
  is_live?: boolean;
  is_participant?: boolean;
}

/** Individual scheduled match chip (player view). */
export interface CalendarMatch {
  type: 'match';
  id: string;
  tournament_id: string | null;
  tournament_name: string | null;
  game: string | null;
  game_label: string;
  round_number: number | null;
  match_number: number | null;
  bracket_section: string | null;
  status: string;
  status_label: string;
  scheduled_at: string | null;
  scheduled_at_date: string | null;
  scheduled_at_time: string | null;
  opponent_name: string | null;
  opponent_display_name: string;
  opponent_nickname: string | null;
  opponent_avatar_url: string | null;
}

interface CalendarResponse {
  data: {
    company_id: string | null;
    company_name: string;
    from: string;
    to: string;
    scope: 'all' | 'organizer' | 'player';
    events: CalendarEvent[];
    matches: CalendarMatch[];
  };
}

interface DayCell {
  date: Date;
  iso: string;                  // Y-m-d
  inMonth: boolean;             // belongs to the currently-viewed month
  isToday: boolean;
  isWeekend: boolean;
  starts: CalendarEvent[];      // tournaments STARTING on this day
  regClosures: CalendarEvent[]; // registration DEADLINES on this day
  matches: CalendarMatch[];     // scheduled matches on this day
}

/**
 * CalendarComponent — company tournament calendar at /calendar.
 *
 * Shows a month grid populated with tournament chips on their start dates,
 * plus registration-deadline markers. Click a chip to open that tournament.
 * Intended for organizers/admins; players still use /tournaments to browse.
 */
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  private readonly http = inject(HttpClient);
  readonly auth         = inject(AuthService);

  /** The month currently being viewed (always 1st of month at 00:00). */
  readonly viewMonth = signal<Date>(this.startOfMonth(new Date()));

  readonly loading = signal(false);
  readonly error   = signal<string | null>(null);
  readonly events  = signal<CalendarEvent[]>([]);
  readonly matches = signal<CalendarMatch[]>([]);
  readonly scope   = signal<'all' | 'organizer' | 'player'>('organizer');
  readonly companyName = signal<string>('');

  /** "April 2026" etc. */
  readonly monthLabel = computed(() =>
    this.viewMonth().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }));

  /** Weekday headers in user's locale. Sunday-first (matches Arabic week). */
  readonly weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /** The 6×7 month grid. */
  readonly monthGrid = computed<DayCell[][]>(() => {
    const first = this.viewMonth();
    const year  = first.getFullYear();
    const month = first.getMonth();

    // Start the grid on the Sunday before (or on) the 1st of the month.
    const gridStart = new Date(year, month, 1);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());

    const todayIso  = this.isoDate(new Date());
    const evMap     = this.eventsByStartDate();
    const closeMap  = this.eventsByCloseDate();
    const matchMap  = this.matchesByDate();

    const weeks: DayCell[][] = [];
    const cursor = new Date(gridStart);
    for (let w = 0; w < 6; w++) {
      const week: DayCell[] = [];
      for (let d = 0; d < 7; d++) {
        const iso   = this.isoDate(cursor);
        const dow   = cursor.getDay();
        week.push({
          date:        new Date(cursor),
          iso,
          inMonth:     cursor.getMonth() === month,
          isToday:     iso === todayIso,
          isWeekend:   dow === 5 || dow === 6,  // Fri/Sat (GCC weekend)
          starts:      evMap.get(iso) ?? [],
          regClosures: closeMap.get(iso) ?? [],
          matches:     matchMap.get(iso) ?? [],
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  });

  /** Counts for the summary bar at the top of the grid. */
  readonly stats = computed(() => {
    const all = this.events();
    return {
      total:     all.length,
      open:      all.filter(e => e.status === 'registration' || e.status === 'registration_open').length,
      live:      all.filter(e => e.status === 'ongoing'      || e.status === 'in_progress').length,
      completed: all.filter(e => e.status === 'completed').length,
      matches:   this.matches().length,
    };
  });

  /** Adaptive page title based on who's viewing. */
  readonly pageTitle = computed(() =>
    this.scope() === 'player' ? 'My Schedule' : 'Tournament Calendar');

  /** Players don't create tournaments — hide the CTA. */
  readonly canCreateTournament = computed(() =>
    this.scope() === 'all' || this.scope() === 'organizer');

  ngOnInit(): void { this.loadMonth(); }

  prevMonth(): void {
    const d = this.viewMonth();
    this.viewMonth.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.loadMonth();
  }

  nextMonth(): void {
    const d = this.viewMonth();
    this.viewMonth.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.loadMonth();
  }

  goToday(): void {
    this.viewMonth.set(this.startOfMonth(new Date()));
    this.loadMonth();
  }

  private loadMonth(): void {
    // Fetch 6-week window so edge cells (leading / trailing days from
    // sibling months) can still show events.
    const first = this.viewMonth();
    const from  = new Date(first);
    from.setDate(from.getDate() - from.getDay());
    const to    = new Date(from);
    to.setDate(to.getDate() + 41);

    const params = `?from=${this.isoDate(from)}&to=${this.isoDate(to)}`;
    this.loading.set(true);
    this.error.set(null);
    this.http.get<CalendarResponse>(`${API}/companies/mine/calendar${params}`).subscribe({
      next: res => {
        this.events.set(res.data.events ?? []);
        this.matches.set(res.data.matches ?? []);
        this.scope.set(res.data.scope ?? 'organizer');
        this.companyName.set(res.data.company_name);
        this.loading.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Failed to load calendar.');
      },
    });
  }

  private matchesByDate(): Map<string, CalendarMatch[]> {
    const m = new Map<string, CalendarMatch[]>();
    for (const match of this.matches()) {
      const d = match.scheduled_at_date;
      if (!d) continue;
      const arr = m.get(d) ?? [];
      arr.push(match);
      m.set(d, arr);
    }
    // Sort each day's matches by time so the earliest shows first.
    for (const list of m.values()) {
      list.sort((a, b) => (a.scheduled_at_time ?? '').localeCompare(b.scheduled_at_time ?? ''));
    }
    return m;
  }

  private eventsByStartDate(): Map<string, CalendarEvent[]> {
    const m = new Map<string, CalendarEvent[]>();
    const first = this.viewMonth();
    const dayOneIso = this.isoDate(first);
    const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0);
    const lastIso = this.isoDate(lastDay);
    const todayIso = this.isoDate(new Date());
    // If today is in the viewed month, prefer pinning live tournaments there; else day 1.
    const livePin = (todayIso >= dayOneIso && todayIso <= lastIso) ? todayIso : dayOneIso;

    for (const ev of this.events()) {
      let pinDate = ev.starts_at_date;

      // Live tournaments with a start date before the viewed month — pin them
      // so HR/organizers can always see what's running right now.
      if (ev.is_live) {
        if (!pinDate || pinDate < dayOneIso) {
          pinDate = livePin;
        }
      }

      if (!pinDate) continue;
      const arr = m.get(pinDate) ?? [];
      arr.push(ev);
      m.set(pinDate, arr);
    }
    return m;
  }

  private eventsByCloseDate(): Map<string, CalendarEvent[]> {
    const m = new Map<string, CalendarEvent[]>();
    for (const ev of this.events()) {
      const d = ev.registration_closes_at_date;
      if (!d || d === ev.starts_at_date) continue; // don't double-mark same day
      const arr = m.get(d) ?? [];
      arr.push(ev);
      m.set(d, arr);
    }
    return m;
  }

  private startOfMonth(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  private isoDate(d: Date): string {
    const y  = d.getFullYear();
    const m  = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  /** CSS modifier class for an event's status. */
  statusClass(ev: CalendarEvent): string {
    return 'chip--' + (ev.status.replace(/_/g, '-'));
  }
}
