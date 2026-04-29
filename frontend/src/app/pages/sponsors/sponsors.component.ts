import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  PlatformSponsorRow,
  PlatformSponsorService,
  PlatformSponsorsByTier,
} from '../../components/platform-sponsors-strip/platform-sponsor.service';

/**
 * SponsorsComponent — public-facing /sponsors page.
 *
 * Full showcase of platform sponsors with their tagline + logo,
 * grouped by tier. Linked from the homepage and the footer.
 */
@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sponsors-page">

      <header class="sp-header">
        <h1>Our Partners</h1>
        <p class="sp-subtitle">
          Dawri is proudly powered by visionary partners committed to growing
          the esports ecosystem in Saudi Arabia and beyond.
        </p>
      </header>

      @if (loading()) {
        <p class="sp-loading">Loading partners…</p>
      } @else if (allCount() === 0) {
        <div class="sp-empty">
          <p>Partner announcements coming soon.</p>
          <p class="muted">Interested in partnering with Dawri? <a routerLink="/contact">Contact us</a>.</p>
        </div>
      } @else {

        @if (titleSponsors().length > 0) {
          <section class="sp-tier-section sp-tier-title">
            <h2>Title Sponsor</h2>
            <div class="sp-title-grid">
              @for (s of titleSponsors(); track s.id) {
                <a class="sp-title-card"
                   [href]="s.sponsor.website_url || '#'"
                   [target]="s.sponsor.website_url ? '_blank' : '_self'"
                   [attr.rel]="s.sponsor.website_url ? 'noopener' : null">
                  <div class="sp-logo-wrap">
                    @if (s.sponsor.logo_url) {
                      <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                    } @else {
                      <div class="sp-name-fallback large">{{ s.sponsor.name }}</div>
                    }
                  </div>
                  <h3 class="sp-name">{{ s.sponsor.name }}</h3>
                  @if (s.sponsor.tagline) {
                    <p class="sp-tagline">{{ s.sponsor.tagline }}</p>
                  }
                </a>
              }
            </div>
          </section>
        }

        @if (standardSponsors().length > 0) {
          <section class="sp-tier-section">
            <h2>Supporting Partners</h2>
            <div class="sp-standard-grid">
              @for (s of standardSponsors(); track s.id) {
                <a class="sp-standard-card"
                   [href]="s.sponsor.website_url || '#'"
                   [target]="s.sponsor.website_url ? '_blank' : '_self'"
                   [attr.rel]="s.sponsor.website_url ? 'noopener' : null">
                  <div class="sp-logo-wrap">
                    @if (s.sponsor.logo_url) {
                      <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                    } @else {
                      <div class="sp-name-fallback">{{ s.sponsor.name }}</div>
                    }
                  </div>
                  <h3 class="sp-name">{{ s.sponsor.name }}</h3>
                  @if (s.sponsor.tagline) {
                    <p class="sp-tagline small">{{ s.sponsor.tagline }}</p>
                  }
                </a>
              }
            </div>
          </section>
        }
      }

      <section class="sp-cta">
        <h2>Become a Partner</h2>
        <p>Reach over 5,000 active gamers and 100+ corporate communities through Dawri.</p>
        <a class="sp-cta-btn" routerLink="/contact">Get in Touch</a>
      </section>

    </div>
  `,
  styles: [`
    .sponsors-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 24px 100px;
      color: #fff;
    }
    .muted { color: #888; }

    .sp-header {
      text-align: center;
      margin-bottom: 64px;
      h1 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 56px;
        letter-spacing: 3px;
        margin: 0 0 12px;
        background: linear-gradient(90deg, #a855f7, #f0a500);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .sp-subtitle {
        max-width: 640px;
        margin: 0 auto;
        color: #aaa;
        font-size: 16px;
        line-height: 1.7;
      }
    }

    .sp-loading, .sp-empty {
      text-align: center;
      padding: 80px 20px;
      color: #888;
      font-size: 14px;
      a { color: #a855f7; text-decoration: none; }
    }

    .sp-tier-section {
      margin-bottom: 80px;
      h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 28px;
        letter-spacing: 2px;
        color: #ddd;
        text-align: center;
        margin: 0 0 32px;
        padding-bottom: 12px;
        border-bottom: 1px solid #2a2a3a;
      }
    }

    .sp-tier-title h2 {
      color: #f0a500;
    }

    /* Title sponsor — large hero cards */
    .sp-title-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .sp-title-card {
      background: linear-gradient(180deg, rgba(240, 165, 0, 0.05), rgba(168, 85, 247, 0.03));
      border: 1px solid rgba(240, 165, 0, 0.3);
      border-radius: 14px;
      padding: 40px 32px;
      text-align: center;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-4px);
        border-color: #f0a500;
        box-shadow: 0 16px 40px rgba(240, 165, 0, 0.15);
      }

      .sp-logo-wrap {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        img {
          max-height: 120px;
          max-width: 280px;
          object-fit: contain;
        }
      }
      .sp-name {
        margin: 0 0 8px;
        font-size: 22px;
        font-weight: 600;
        color: #fff;
      }
      .sp-tagline {
        margin: 0;
        color: #aaa;
        font-size: 14px;
        line-height: 1.6;
      }
    }

    /* Standard sponsors — smaller grid */
    .sp-standard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    .sp-standard-card {
      background: #111122;
      border: 1px solid #2a2a3a;
      border-radius: 10px;
      padding: 24px 20px;
      text-align: center;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, border-color 0.2s;

      &:hover {
        transform: translateY(-3px);
        border-color: #a855f7;
      }

      .sp-logo-wrap {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        img {
          max-height: 64px;
          max-width: 160px;
          object-fit: contain;
        }
      }
      .sp-name {
        margin: 0 0 6px;
        font-size: 16px;
        color: #ddd;
        font-weight: 600;
      }
      .sp-tagline.small {
        margin: 0;
        color: #888;
        font-size: 12px;
        line-height: 1.5;
      }
    }

    .sp-name-fallback {
      font-family: 'Bebas Neue', sans-serif;
      letter-spacing: 1.5px;
      color: #f0a500;
      font-size: 24px;
      &.large { font-size: 36px; }
    }

    /* CTA */
    .sp-cta {
      margin-top: 80px;
      padding: 48px 32px;
      text-align: center;
      background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(240, 165, 0, 0.08));
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 14px;

      h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 30px;
        letter-spacing: 2px;
        color: #fff;
        margin: 0 0 12px;
      }
      p {
        color: #ccc;
        margin: 0 0 24px;
        font-size: 15px;
      }
    }
    .sp-cta-btn {
      display: inline-block;
      padding: 12px 28px;
      background: #a855f7;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: background 0.2s, transform 0.2s;

      &:hover {
        background: #9333ea;
        transform: translateY(-2px);
      }
    }
  `],
})
export class SponsorsComponent implements OnInit {
  private service = inject(PlatformSponsorService);
  private destroyRef = inject(DestroyRef);

  readonly data    = signal<PlatformSponsorsByTier | null>(null);
  readonly loading = signal(true);

  readonly titleSponsors    = computed(() => this.data()?.title ?? []);
  readonly standardSponsors = computed(() => this.data()?.standard ?? []);
  readonly allCount = computed<number>(
    () => this.titleSponsors().length + this.standardSponsors().length,
  );

  ngOnInit(): void {
    this.service.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => { this.data.set(d); this.loading.set(false); },
        error: ()  => { this.data.set({ title: [], standard: [] }); this.loading.set(false); },
      });
  }
}
