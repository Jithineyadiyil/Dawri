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
  readonly liveTournaments = signal<Tournament[]>([]);
  readonly topTournaments  = signal<Tournament[]>([]);
  readonly topPlayers      = signal<LeaderboardEntry[]>([]);
  readonly statsLoading    = signal(true);
  readonly activeLiveCount = signal(0);

  readonly games = [
    { name: 'EA FC 25',     icon: '⚽', badge: 'All formats',    color: '#fbbf24',
      shortCode: 'FC',  activeText: 'Active now', formatsText: 'All formats',
      desc: 'The world\'s biggest football game. SE, DE, Round Robin & Swiss.' },
    { name: 'PUBG Mobile',  icon: '🔫', badge: 'SE · DE · Swiss', color: '#a855f7',
      shortCode: 'PB',  activeText: 'Active now', formatsText: 'SE · DE · Swiss',
      desc: 'Battle royale at its finest. Squad up and compete for the Chicken Dinner.' },
    { name: 'Call of Duty', icon: '💣', badge: 'SE · DE · Swiss', color: '#a78bfa',
      shortCode: 'CoD', activeText: 'Active now', formatsText: 'SE · DE · Swiss',
      desc: 'Fast-paced mobile FPS. Dominate the leaderboard across the GCC.' },
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
    '✓ Automated bracket generation',
    '✓ HR system integration (SAP, Oracle, Workday)',
    '✓ Department-level engagement reports',
    '✓ White label on your company subdomain',
    '✓ Bulk digital prize distribution',
    '✓ Arabic RTL — native GCC experience',
  ];

  readonly players = [
    { name: 'Faisal A.', role: 'PUBG Champion',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face' },
    { name: 'Sara K.',   role: 'EA FC Finalist',  img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face' },
    { name: 'Omar M.',   role: 'CoD Finalist',    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face' },
    { name: 'Noura R.',  role: 'Tournament Org',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face' },
    { name: 'Khalid T.', role: 'Swiss Master',    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face' },
  ];

  ngOnInit(): void {
    this.sponsorService.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => this.hasPartners.set((d.title.length + d.standard.length) > 0),
        error: ()  => this.hasPartners.set(false),
      });

    forkJoin({
      tournaments: this.api.getTournaments({}).pipe(
        catchError(() => of({ data: [] as Tournament[], meta: null as any, links: null as any }))
      ),
      leaderboard: this.api.getLeaderboard('ea_fc', 5).pipe(
        catchError(() => of({ data: [] as LeaderboardEntry[] }))
      ),
    }).subscribe(({ tournaments, leaderboard }) => {
      const all  = tournaments.data ?? [];
      const live = all.filter(t => !['completed', 'cancelled'].includes(t.status));
      const liveCount = all.filter(t => ['in_progress', 'ongoing'].includes(t.status)).length;

      this.liveTournaments.set(live);
      this.topTournaments.set(live.slice(0, 6));
      this.topPlayers.set(leaderboard.data ?? []);
      this.activeLiveCount.set(liveCount);
      this.statsLoading.set(false);
    });
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

  getPrizePool(t: Tournament): string {
    if (!t.prize_pool) return '';
    if (Array.isArray(t.prize_pool) && t.prize_pool.length > 0) return t.prize_pool[0]?.reward ?? '';
    if (typeof t.prize_pool === 'string') return t.prize_pool;
    return '';
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
