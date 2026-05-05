import {
  ChangeDetectionStrategy, Component, AfterViewInit, DestroyRef, ElementRef, inject, signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
export class HomeComponent implements AfterViewInit {
  /**
   * Tracks whether ANY active platform sponsor exists. Used to gate the
   * "See All Partners →" CTA below the sponsor strip on the home page —
   * we don't show the link when there's nothing to see. Reuses the same
   * shared service the strip itself consumes, so this triggers no extra
   * network call.
   */
  private sponsorService = inject(PlatformSponsorService);
  private destroyRef     = inject(DestroyRef);
  readonly hasPartners   = signal(false);

  /**
   * Game catalogue shown in the "Featured games" carousel.
   *
   * Field notes:
   *   - shortCode    Two- or three-letter glyph rendered on the cover when
   *                  the artwork is missing. Falls back to name.substr(0,2)
   *                  in the template, but Angular's strict template type-
   *                  check requires the property to exist on the type.
   *   - activeText   Mini stat badge ("12 active now") shown on the cover.
   *   - formatsText  Bottom-row label ("All formats", "SE · DE · Swiss").
   *                  Mirrors `badge` in current data — kept separate so
   *                  designers can tweak either independently.
   */
  readonly games: Array<{
    name: string;
    icon: string;
    badge: string;
    color: string;
    img: string;
    desc: string;
    shortCode?: string;
    activeText?: string;
    formatsText?: string;
  }> = [
    {
      name: 'EA FC 25',
      icon: '⚽',
      badge: 'All formats',
      color: '#fbbf24',
      img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80&fit=crop',
      desc: 'The world\'s biggest football game. Single Elimination, Double Elimination, Round Robin & Swiss.',
      shortCode: 'EA',
      activeText: 'Active now',
      formatsText: 'All formats',
    },
    {
      name: 'PUBG Mobile',
      icon: '🔫',
      badge: 'SE · DE · Swiss',
      color: '#a855f7',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80&fit=crop',
      desc: 'Battle royale at its finest. Squad up and compete for the Chicken Dinner.',
      shortCode: 'PG',
      activeText: 'Active now',
      formatsText: 'SE · DE · Swiss',
    },
    {
      name: 'Call of Duty',
      icon: '💣',
      badge: 'SE · DE · Swiss',
      color: '#a78bfa',
      img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80&fit=crop',
      desc: 'Fast-paced mobile FPS. Dominate the leaderboard across the GCC.',
      shortCode: 'CD',
      activeText: 'Active now',
      formatsText: 'SE · DE · Swiss',
    },
  ];

  readonly formats = [
    { name: 'Single Elimination', icon: '🏆', badge: 'Most popular',      desc: 'Classic knockout. One loss and you are out. Fast and dramatic.'           },
    { name: 'Double Elimination', icon: '⚔',  badge: 'Fairest knockout',  desc: 'Two brackets. Lose once and you get a second chance.'                       },
    { name: 'Round Robin',        icon: '🔄', badge: 'Most accurate',     desc: 'Everyone plays everyone. Best overall record wins.'                          },
    { name: 'Swiss System',       icon: '♟',  badge: 'Most sophisticated', desc: 'Paired by score. No eliminations. Full ranking produced.'                   },
  ];

  readonly steps = [
    {
      n: '01',
      title: 'Create or join a tournament',
      desc: 'Browse public events or create your own in under 2 minutes.',
      img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&q=80&fit=crop'
    },
    {
      n: '02',
      title: 'Compete and submit results',
      desc: 'Play your match, upload a screenshot. The bracket updates instantly.',
      img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=500&q=80&fit=crop'
    },
    {
      n: '03',
      title: 'Win prizes',
      desc: 'Corporate prize pools pay out automatically — PSN cards, Apple credit, PUBG UC.',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&fit=crop'
    },
  ];

  readonly b2bFeatures = [
    '✓ Automated bracket generation',
    '✓ HR system integration (SAP, Oracle, Workday)',
    '✓ Department-level engagement reports',
    '✓ White label on your company subdomain',
    '✓ Bulk digital prize distribution',
    '✓ Arabic RTL — native GCC experience',
  ];

  // Testimonial / social proof images
  readonly players = [
    { name: 'Faisal A.', role: 'PUBG Champion', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face' },
    { name: 'Sara K.',   role: 'EA FC Finalist', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face' },
    { name: 'Omar M.',   role: 'CoD Finalist',   img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face' },
    { name: 'Noura R.',  role: 'Tournament Org', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face' },
    { name: 'Khalid T.', role: 'Swiss Master',   img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face' },
  ];

  constructor(private el: ElementRef) {
    // Probe the shared platform-sponsor cache so we can hide the
    // "See All Partners →" CTA when there are no partners to show.
    // Errors are non-fatal — fall back to hidden CTA, never break home.
    this.sponsorService.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => this.hasPartners.set((d.title.length + d.standard.length) > 0),
        error: ()  => this.hasPartners.set(false),
      });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );

    this.el.nativeElement.querySelectorAll('.reveal').forEach((el: Element, i: number) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  }
}
