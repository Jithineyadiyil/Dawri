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
          <!--
            Hero variant. Glass-modern aesthetic to match the /sponsors page:
            - Wrapped in a glass panel container with soft border + glow
            - Title sponsor logo sits in a small glass card (proper anchor for the SVG)
            - Decorative side rules around the labels for editorial feel
            - "Visit →" affordance only when website URL exists
            - Subtle pulsing dot near "PRESENTED BY"
          -->
          <div class="ps-hero">
            <div class="ps-hero__panel">

              @if (titleSponsors().length > 0) {
                <div class="ps-title-row">
                  <div class="ps-label-frame">
                    <span class="ps-label-rule" aria-hidden="true"></span>
                    <span class="ps-presented-by">
                      <span class="ps-label-dot" aria-hidden="true"></span>
                      Presented by
                    </span>
                    <span class="ps-label-rule" aria-hidden="true"></span>
                  </div>
                  <div class="ps-title-logos">
                    @for (s of titleSponsors(); track s.id) {
                      <a class="ps-title-logo"
                         [href]="s.sponsor.website_url || '#'"
                         [target]="s.sponsor.website_url ? '_blank' : '_self'"
                         [attr.rel]="s.sponsor.website_url ? 'noopener' : null"
                         [title]="s.sponsor.tagline || s.sponsor.name">
                        <div class="ps-title-glass">
                          @if (s.sponsor.logo_url) {
                            <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                          } @else {
                            <span class="ps-name-fallback">{{ s.sponsor.name }}</span>
                          }
                        </div>
                        @if (s.sponsor.tagline) {
                          <span class="ps-title-tagline">{{ s.sponsor.tagline }}</span>
                        }
                      </a>
                    }
                  </div>
                </div>
              }

              @if (standardSponsors().length > 0) {
                <div class="ps-standard-row">
                  <div class="ps-label-frame ps-label-frame--small">
                    <span class="ps-label-rule" aria-hidden="true"></span>
                    <span class="ps-also-supported">Also supported by</span>
                    <span class="ps-label-rule" aria-hidden="true"></span>
                  </div>
                  <div class="ps-standard-logos">
                    @for (s of standardSponsors(); track s.id) {
                      <a class="ps-standard-logo"
                         [href]="s.sponsor.website_url || '#'"
                         [target]="s.sponsor.website_url ? '_blank' : '_self'"
                         [attr.rel]="s.sponsor.website_url ? 'noopener' : null"
                         [title]="s.sponsor.name">
                        <div class="ps-standard-glass">
                          @if (s.sponsor.logo_url) {
                            <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                          } @else {
                            <span class="ps-name-fallback small">{{ s.sponsor.name }}</span>
                          }
                        </div>
                      </a>
                    }
                  </div>
                </div>
              }

            </div>
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

    /* ── Hero variant — glass panel design ─────────────────────
       Wrapped section + framed labels + glass logo cards.
       Matches the /sponsors page aesthetic for visual cohesion. */
    .ps-hero {
      padding: 56px 24px;
      background:
        radial-gradient(circle at 20% 0%, rgba(240, 165, 0, 0.08), transparent 55%),
        radial-gradient(circle at 80% 100%, rgba(168, 85, 247, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(15, 15, 30, 0.4) 0%, transparent 100%);
      border-top: 1px solid rgba(168, 85, 247, 0.15);
      border-bottom: 1px solid rgba(168, 85, 247, 0.08);
    }
    .ps-hero__panel {
      max-width: 980px;
      margin: 0 auto;
      padding: 40px 32px;
      border-radius: 20px;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.01) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(16px) saturate(140%);
      -webkit-backdrop-filter: blur(16px) saturate(140%);
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      text-align: center;
    }

    /* Framed label: ── DOT  PRESENTED BY  ── */
    .ps-label-frame {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .ps-label-rule {
      flex: 1;
      max-width: 80px;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(240, 165, 0, 0.3),
        transparent
      );
    }
    .ps-label-frame--small .ps-label-rule {
      max-width: 50px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(168, 85, 247, 0.25),
        transparent
      );
    }
    .ps-presented-by, .ps-also-supported {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: #f0a500;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 13px;
      letter-spacing: 4px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .ps-also-supported {
      color: #a855f7;
      font-size: 11px;
      letter-spacing: 3px;
    }
    .ps-label-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #f0a500;
      box-shadow: 0 0 8px #f0a500;
      animation: ps-dot-pulse 2s ease-in-out infinite;
    }

    /* Title sponsor block */
    .ps-title-row {
      margin-bottom: 36px;
    }
    .ps-title-logos {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
    }
    .ps-title-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      &:hover { transform: translateY(-3px); }
    }
    .ps-title-glass {
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      border-radius: 20px;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.02) 100%
      );
      border: 1px solid rgba(240, 165, 0, 0.15);
      backdrop-filter: blur(8px);
      box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      transition:
        border-color 0.3s,
        box-shadow 0.3s;

      img {
        height: auto;
        width: auto;
        max-height: 100px;
        max-width: 100%;
        object-fit: contain;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
      }
    }
    .ps-title-logo:hover .ps-title-glass {
      border-color: rgba(240, 165, 0, 0.4);
      box-shadow:
        0 16px 50px rgba(240, 165, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    .ps-title-tagline {
      font-size: 13px;
      color: #aaa;
      letter-spacing: 0.3px;
      max-width: 180px;
      text-align: center;
      line-height: 1.4;
    }

    /* Standard sponsor block */
    .ps-standard-row {
      padding-top: 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.04);
    }
    .ps-standard-logos {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }
    .ps-standard-logo {
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      opacity: 0.85;
      &:hover { transform: translateY(-2px); opacity: 1; }
    }
    .ps-standard-glass {
      width: 88px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      transition: border-color 0.3s, background 0.3s;

      img {
        height: auto;
        width: auto;
        max-height: 44px;
        max-width: 100%;
        object-fit: contain;
        filter: grayscale(0.3);
        transition: filter 0.3s;
      }
    }
    .ps-standard-logo:hover .ps-standard-glass {
      background: rgba(168, 85, 247, 0.06);
      border-color: rgba(168, 85, 247, 0.3);
      img { filter: grayscale(0); }
    }

    @keyframes ps-dot-pulse {
      0%, 100% { box-shadow: 0 0 6px  #f0a500; opacity: 1; }
      50%      { box-shadow: 0 0 14px #f0a500; opacity: 0.7; }
    }
    @media (prefers-reduced-motion: reduce) {
      .ps-label-dot { animation: none; }
    }
    @media (max-width: 700px) {
      .ps-hero { padding: 36px 16px; }
      .ps-hero__panel { padding: 28px 20px; border-radius: 16px; }
      .ps-title-glass { width: 120px; height: 120px; }
      .ps-label-rule { max-width: 30px !important; }
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
        height: 32px;
        width: auto;
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
        height: 22px;
        width: auto;
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
