import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  PlatformSponsorRow,
  PlatformSponsorService,
  PlatformSponsorsByTier,
} from './platform-sponsor.service';

/**
 * PlatformSponsorsStripComponent
 *
 * Reusable display of active platform sponsors. Three visual variants:
 *
 *   - "hero"     — homepage hero, large title sponsor + carousel of standards
 *   - "compact"  — tournament list & sponsors page bottom, mid-size logo row
 *   - "footer"   — site footer, tiny grayscale strip
 *
 * Hides itself entirely if no active sponsors are configured (so the
 * platform doesn't show empty placeholder strips on every page).
 *
 * Usage:
 *   <app-platform-sponsors-strip variant="hero"></app-platform-sponsors-strip>
 *   <app-platform-sponsors-strip variant="footer"></app-platform-sponsors-strip>
 */
@Component({
  selector: 'app-platform-sponsors-strip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (allCount() > 0) {
      <section class="ps-strip" [attr.data-variant]="variant">

        @if (variant === 'hero') {
          <!-- Hero variant: title sponsor banner, then standard logos -->
          <div class="ps-hero">
            @if (titleSponsors().length > 0) {
              <div class="ps-title-row">
                <span class="ps-presented-by">PRESENTED BY</span>
                @for (s of titleSponsors(); track s.id) {
                  <a class="ps-title-logo"
                     [href]="s.sponsor.website_url || '#'"
                     [target]="s.sponsor.website_url ? '_blank' : '_self'"
                     [attr.rel]="s.sponsor.website_url ? 'noopener' : null"
                     [title]="s.sponsor.tagline || s.sponsor.name">
                    @if (s.sponsor.logo_url) {
                      <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                    } @else {
                      <span class="ps-name-fallback">{{ s.sponsor.name }}</span>
                    }
                  </a>
                }
              </div>
            }
            @if (standardSponsors().length > 0) {
              <div class="ps-standard-row">
                <span class="ps-also-supported">ALSO SUPPORTED BY</span>
                <div class="ps-standard-logos">
                  @for (s of standardSponsors(); track s.id) {
                    <a class="ps-standard-logo"
                       [href]="s.sponsor.website_url || '#'"
                       [target]="s.sponsor.website_url ? '_blank' : '_self'"
                       [attr.rel]="s.sponsor.website_url ? 'noopener' : null"
                       [title]="s.sponsor.name">
                      @if (s.sponsor.logo_url) {
                        <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                      } @else {
                        <span class="ps-name-fallback small">{{ s.sponsor.name }}</span>
                      }
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        }

        @if (variant === 'compact') {
          <div class="ps-compact">
            <span class="ps-label">PARTNERS</span>
            <div class="ps-compact-logos">
              @for (s of allSponsors(); track s.id) {
                <a class="ps-compact-logo"
                   [href]="s.sponsor.website_url || '#'"
                   [target]="s.sponsor.website_url ? '_blank' : '_self'"
                   [attr.rel]="s.sponsor.website_url ? 'noopener' : null"
                   [title]="s.sponsor.name">
                  @if (s.sponsor.logo_url) {
                    <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                  } @else {
                    <span class="ps-name-fallback">{{ s.sponsor.name }}</span>
                  }
                </a>
              }
            </div>
          </div>
        }

        @if (variant === 'footer') {
          <div class="ps-footer">
            <span class="ps-label">Platform sponsors</span>
            <div class="ps-footer-logos">
              @for (s of allSponsors(); track s.id) {
                <a class="ps-footer-logo"
                   [href]="s.sponsor.website_url || '#'"
                   [target]="s.sponsor.website_url ? '_blank' : '_self'"
                   [attr.rel]="s.sponsor.website_url ? 'noopener' : null"
                   [title]="s.sponsor.name">
                  @if (s.sponsor.logo_url) {
                    <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                  } @else {
                    <span class="ps-name-fallback tiny">{{ s.sponsor.name }}</span>
                  }
                </a>
              }
            </div>
          </div>
        }

      </section>
    }
  `,
  styles: [`
    /* ── Common ──────────────────────────────────────────────── */
    .ps-strip {
      display: block;
      width: 100%;
    }
    .ps-name-fallback {
      font-family: 'Bebas Neue', sans-serif;
      letter-spacing: 1.2px;
      color: #f0a500;
      font-size: 22px;
      &.small { font-size: 14px; color: #ccc; }
      &.tiny  { font-size: 11px; color: #888; }
    }

    /* ── Hero variant ────────────────────────────────────────── */
    .ps-hero {
      padding: 32px 24px;
      background: linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, transparent 100%);
      border-top: 1px solid rgba(168, 85, 247, 0.2);
      border-bottom: 1px solid rgba(168, 85, 247, 0.1);
      text-align: center;
    }
    .ps-presented-by, .ps-also-supported {
      display: block;
      color: #888;
      font-size: 11px;
      letter-spacing: 2.5px;
      margin-bottom: 16px;
      text-transform: uppercase;
    }
    .ps-title-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }
    .ps-title-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, opacity 0.2s ease;
      img {
        max-height: 80px;
        max-width: 280px;
        object-fit: contain;
      }
      &:hover { transform: scale(1.03); }
    }
    .ps-standard-row {
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .ps-standard-logos {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 32px;
    }
    .ps-standard-logo {
      display: flex;
      align-items: center;
      transition: opacity 0.2s ease, transform 0.2s ease;
      opacity: 0.85;
      img {
        max-height: 44px;
        max-width: 140px;
        object-fit: contain;
        filter: grayscale(0.3);
      }
      &:hover {
        opacity: 1;
        transform: translateY(-2px);
        img { filter: grayscale(0); }
      }
    }

    /* ── Compact variant ─────────────────────────────────────── */
    .ps-compact {
      padding: 20px 24px;
      background: rgba(15, 18, 36, 0.6);
      border-radius: 8px;
      border: 1px solid #1a1a2a;
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }
    .ps-compact .ps-label {
      color: #888;
      font-size: 10px;
      letter-spacing: 2px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .ps-compact-logos {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 24px;
      flex: 1;
    }
    .ps-compact-logo {
      display: flex;
      align-items: center;
      transition: opacity 0.2s ease;
      opacity: 0.7;
      img {
        max-height: 32px;
        max-width: 100px;
        object-fit: contain;
        filter: grayscale(0.5);
      }
      &:hover { opacity: 1; img { filter: grayscale(0); } }
    }

    /* ── Footer variant ──────────────────────────────────────── */
    .ps-footer {
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .ps-footer .ps-label {
      color: #555;
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .ps-footer-logos {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ps-footer-logo {
      display: flex;
      align-items: center;
      transition: opacity 0.2s ease;
      opacity: 0.5;
      img {
        max-height: 22px;
        max-width: 70px;
        object-fit: contain;
        filter: grayscale(1) brightness(0.7);
      }
      &:hover {
        opacity: 1;
        img { filter: grayscale(0) brightness(1); }
      }
    }
  `],
})
export class PlatformSponsorsStripComponent implements OnInit {
  private service = inject(PlatformSponsorService);
  private destroyRef = inject(DestroyRef);

  /** Display variant — controls layout and sizing. */
  @Input() variant: 'hero' | 'compact' | 'footer' = 'compact';

  readonly data = signal<PlatformSponsorsByTier | null>(null);

  readonly titleSponsors    = computed(() => this.data()?.title ?? []);
  readonly standardSponsors = computed(() => this.data()?.standard ?? []);
  readonly allSponsors      = computed<PlatformSponsorRow[]>(
    () => [...this.titleSponsors(), ...this.standardSponsors()],
  );
  readonly allCount = computed(() => this.allSponsors().length);

  ngOnInit(): void {
    this.service.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => this.data.set(d),
        error: () => this.data.set({ title: [], standard: [] }),
      });
  }
}
