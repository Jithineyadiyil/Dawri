import {
  ChangeDetectionStrategy, Component, OnInit, AfterViewInit,
  DestroyRef, ElementRef, inject, signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService, Tournament, LeaderboardEntry } from '../../core/services/api.service';
import { PlatformSponsorsStripComponent } from '../../components/platform-sponsors-strip/platform-sponsors-strip.component';
import { PlatformSponsorService } from '../../components/platform-sponsors-strip/platform-sponsor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, PlatformSponsorsStripComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  private api            = inject(ApiService);
  private sponsorService = inject(PlatformSponsorService);
  private destroyRef     = inject(DestroyRef);
  private el             = inject(ElementRef);

  readonly hasPartners     = signal(false);
  liveTournaments          = signal<Tournament[]>([]);
  upcomingTournaments      = signal<Tournament[]>([]);
  topPlayers               = signal<LeaderboardEntry[]>([]);
  heroTournament           = signal<Tournament | null>(null);
  tickerItems              = signal<string[]>([]);
  statsLoading             = signal(true);

  readonly games = [
    { name: 'EA FC 25',     icon: '⚽', badge: 'All formats',     color: '#fbbf24', desc: 'The world\'s biggest football game. Single Elimination, Double Elimination, Round Robin & Swiss.' },
    { name: 'PUBG Mobile',  icon: '🔫', badge: 'SE · DE · Swiss', color: '#a855f7', desc: 'Battle royale at its finest. Squad up and compete for the Chicken Dinner.' },
    { name: 'Call of Duty', icon: '💣', badge: 'SE · DE · Swiss', color: '#a78bfa', desc: 'Fast-paced mobile FPS. Dominate the leaderboard across the GCC.' },
  ];

  readonly formats = [
    { name: 'Single Elimination', icon: '🏆', badge: 'Most popular',       desc: 'Classic knockout. One loss and you are out. Fast and dramatic.' },
    { name: 'Double Elimination', icon: '⚔',  badge: 'Fairest knockout',   desc: 'Two brackets. Lose once and you get a second chance.' },
    { name: 'Round Robin',        icon: '🔄', badge: 'Most accurate',      desc: 'Everyone plays everyone. Best overall record wins.' },
    { name: 'Swiss System',       icon: '♟',  badge: 'Most sophisticated', desc: 'Paired by score. No eliminations. Full ranking produced.' },
  ];

  readonly steps = [
    { n: '01', title: 'Create or join a tournament', desc: 'Browse public events or create your own in under 2 minutes.' },
    { n: '02', title: 'Compete and submit results',  desc: 'Play your match, upload a screenshot. The bracket updates instantly.' },
    { n: '03', title: 'Win prizes',                  desc: 'Corporate prize pools pay out automatically — PSN cards, Apple credit, PUBG UC.' },
  ];

  readonly b2bFeatures = [
    'Automated bracket generation',
    'HR system integration (SAP, Oracle, Workday)',
    'Department-level engagement reports',
    'White label on your company subdomain',
    'Bulk digital prize distribution',
    'Arabic RTL — native GCC experience',
  ];

  ngOnInit(): void {
    this.loadLiveData();
    this.sponsorService.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => this.hasPartners.set((d.title.length + d.standard.length) > 0),
        error: ()  => this.hasPartners.set(false),
      });
  }

  private loadLiveData(): void {
    forkJoin({
      tournaments: this.api.getTournaments({}).pipe(
        catchError(() => of({ data: [] as Tournament[], meta: null as any, links: null as any }))
      ),
      leaderboard: this.api.getLeaderboard('ea_fc', 5).pipe(
        catchError(() => of({ data: [] as LeaderboardEntry[] }))
      ),
    }).subscribe(({ tournaments, leaderboard }) => {
      const all      = tournaments.data ?? [];
      const live     = all.filter(t => ['in_progress', 'ongoing'].includes(t.status));
      const upcoming = all.filter(t => ['registration_open', 'registration'].includes(t.status));
      const fallback = all.filter(t => !['completed', 'cancelled'].includes(t.status));

      this.liveTournaments.set(live);
      this.upcomingTournaments.set(upcoming.length > 0 ? upcoming : fallback.filter(t => !live.includes(t)));
      this.topPlayers.set(leaderboard.data ?? []);
      this.heroTournament.set(live[0] ?? upcoming[0] ?? fallback[0] ?? null);

      const ticker: string[] = [];
      for (const t of live)     ticker.push(`● LIVE · ${t.game_label} · ${t.name} · ${t.participant_count}/${t.max_participants} players`);
      for (const t of upcoming) ticker.push(`UPCOMING · ${t.game_label} · ${t.name} · Registration open`);
      if (ticker.length === 0)  ticker.push('New tournaments added daily · Create a free account to get notified');
      this.tickerItems.set([...ticker, ...ticker]);

      this.statsLoading.set(false);
    });
  }

  getPrizePool(t: Tournament): string {
    if (!t.prize_pool) return 'TBA';
    if (Array.isArray(t.prize_pool) && t.prize_pool.length > 0) {
      return t.prize_pool[0]?.reward ?? 'TBA';
    }
    return typeof t.prize_pool === 'string' ? t.prize_pool : 'TBA';
  }

  getStatusClass(status: string): string {
    if (['in_progress', 'ongoing'].includes(status)) return 'live';
    if (['registration_open', 'registration'].includes(status)) return 'open';
    return 'upcoming';
  }

  getStatusLabel(status: string): string {
    if (['in_progress', 'ongoing'].includes(status)) return 'LIVE';
    if (['registration_open', 'registration'].includes(status)) return 'Open';
    return status.replace(/_/g, ' ');
  }

  allTournaments(): Tournament[] {
    return [...this.liveTournaments(), ...this.upcomingTournaments()].slice(0, 6);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    this.el.nativeElement.querySelectorAll('.reveal').forEach((el: Element, i: number) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  }
}
