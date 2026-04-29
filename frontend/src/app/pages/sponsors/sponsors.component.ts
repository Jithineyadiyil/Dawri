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
import {
  PublicStats,
  PublicStatsService,
} from '../../core/services/public-stats.service';

/**
 * SponsorsComponent — public-facing /sponsors page.
 *
 * Layout (top to bottom):
 *   1. Massive full-bleed Title Sponsor hero band (only when there is one)
 *   2. Page intro ("Our Partners" header + subtitle)
 *   3. Platform stats band (real DB-backed numbers, never hardcoded)
 *   4. Supporting Partners grid (smaller cards)
 *   5. Become-a-partner CTA
 *
 * Linked from the homepage and the footer. No auth required.
 */
@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sponsors-page">

      <!-- ── 1. Massive Title Sponsor hero band ─────────────────────────
           Full-bleed, glass-modern with animated gradient mesh.
           Layout: logo on LEFT in a frosted glass card with soft glow,
           text content on RIGHT (chip → name → tagline → CTA).
           Animations respect prefers-reduced-motion. -->
      @if (titleSponsor(); as ts) {
        <section class="sp-hero" aria-label="Title Sponsor">

          <!-- Animated gradient mesh background. Pure CSS, GPU-accelerated.
               Stops moving for users with reduced-motion preference. -->
          <div class="sp-hero__mesh" aria-hidden="true">
            <div class="sp-hero__orb sp-hero__orb--gold"></div>
            <div class="sp-hero__orb sp-hero__orb--violet"></div>
            <div class="sp-hero__orb sp-hero__orb--cyan"></div>
            <div class="sp-hero__grid"></div>
          </div>

          <div class="sp-hero__layout">
            <!-- LEFT: glass card holding the logo -->
            <div class="sp-hero__glass">
              <div class="sp-hero__glass-glow" aria-hidden="true"></div>
              <div class="sp-hero__logo-wrap">
                @if (ts.sponsor.logo_url) {
                  <img [src]="ts.sponsor.logo_url" [alt]="ts.sponsor.name" />
                } @else {
                  <div class="sp-hero__logo-fallback">{{ ts.sponsor.name }}</div>
                }
              </div>
            </div>

            <!-- RIGHT: chip + name + tagline + CTA -->
            <div class="sp-hero__text">
              <div class="sp-hero__chip">
                <span class="sp-hero__chip-dot" aria-hidden="true"></span>
                Title Sponsor
              </div>
              <h1 class="sp-hero__name">{{ ts.sponsor.name }}</h1>
              @if (ts.sponsor.tagline) {
                <p class="sp-hero__tagline">{{ ts.sponsor.tagline }}</p>
              }
              @if (ts.sponsor.website_url) {
                <a class="sp-hero__cta"
                   [href]="ts.sponsor.website_url"
                   target="_blank" rel="noopener">
                  <span class="sp-hero__cta-text">Visit {{ ts.sponsor.name }}</span>
                  <span class="sp-hero__cta-arrow" aria-hidden="true">→</span>
                </a>
              }
            </div>
          </div>
        </section>
      }

      <!-- ── 2. Page intro ──────────────────────────────────────────── -->
      <header class="sp-header">
        <h2 class="sp-header__title">Our Partners</h2>
        <p class="sp-subtitle">
          Dawri is proudly powered by visionary partners committed to growing
          the esports ecosystem in Saudi Arabia and beyond.
        </p>
      </header>

      <!-- ── 3. Stats band — real numbers, no fabrications ──────────── -->
      @if (stats(); as s) {
        <section class="sp-stats" aria-label="Platform impact">
          <div class="sp-stat">
            <span class="sp-stat__num">{{ formatCount(s.tournaments_completed) }}</span>
            <span class="sp-stat__label">Tournaments Completed</span>
          </div>
          <div class="sp-stat">
            <span class="sp-stat__num">{{ formatCount(s.tournaments_active) }}</span>
            <span class="sp-stat__label">Active Now</span>
          </div>
          <div class="sp-stat">
            <span class="sp-stat__num">{{ formatCount(s.registered_players) }}</span>
            <span class="sp-stat__label">Registered Players</span>
          </div>
          @if (s.total_prize_distributed_sar > 0) {
            <div class="sp-stat">
              <span class="sp-stat__num">{{ formatCurrency(s.total_prize_distributed_sar) }}</span>
              <span class="sp-stat__label">Prize Pool Distributed</span>
            </div>
          }
          <div class="sp-stat">
            <span class="sp-stat__num">{{ formatCount(s.active_partners) }}</span>
            <span class="sp-stat__label">Active Partners</span>
          </div>
        </section>
      }

      <!-- ── 4. Sponsor states: loading / error / empty / list ──────── -->
      @if (loading()) {
        <p class="sp-loading">Loading partners…</p>
      } @else if (errored()) {
        <div class="sp-empty sp-error">
          <p>We couldn't load partners right now.</p>
          <p class="muted">This is usually a temporary network issue.</p>
          <button type="button" class="sp-retry-btn" (click)="fetch(true)">Try again</button>
        </div>
      } @else if (allCount() === 0) {
        <div class="sp-empty">
          <p>Partner announcements coming soon.</p>
          <p class="muted">Interested in partnering with Dawri? <a routerLink="/contact">Contact us</a>.</p>
        </div>
      } @else if (standardSponsors().length > 0) {
        <section class="sp-tier-section">
          <h2>Supporting Partners</h2>
          <div class="sp-standard-grid">
            @for (sp of standardSponsors(); track sp.id) {
              @if (sp.sponsor.website_url) {
                <a class="sp-standard-card sp-card-link"
                   [href]="sp.sponsor.website_url"
                   target="_blank" rel="noopener">
                  <ng-container *ngTemplateOutlet="standardCardBody; context: { s: sp }"></ng-container>
                </a>
              } @else {
                <div class="sp-standard-card">
                  <ng-container *ngTemplateOutlet="standardCardBody; context: { s: sp }"></ng-container>
                </div>
              }
            }
          </div>
        </section>
      }

      <ng-template #standardCardBody let-s="s">
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
      </ng-template>

      <!-- ── 5. CTA ─────────────────────────────────────────────────── -->
      <section class="sp-cta">
        <h2>Become a Partner</h2>
        <p>Connect your brand with the growing Dawri esports community across the GCC.</p>
        <a class="sp-cta-btn" routerLink="/contact">Get in Touch</a>
      </section>

    </div>
  `,
  styles: [`
    /* Page wrapper — narrower max for the body content,
       hero breaks out via negative margin below. */
    .sponsors-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 100px;
      color: #fff;
    }
    .muted { color: #888; }

    /* ──────────────────────────────────────────────────────────────────
       Title-sponsor hero — glass / modern aesthetic.

       Layout: full-bleed band, 2-column grid (logo glass card + text).
       Background: animated gradient mesh (3 colored orbs + subtle grid).
       Motion: gentle 20s drift on the orbs, gated behind reduced-motion.
       ────────────────────────────────────────────────────────────────── */
    .sp-hero {
      position: relative;
      width: 100vw;
      left: 50%;
      margin-left: -50vw;
      margin-bottom: 80px;
      padding: 96px 24px;
      min-height: 60vh;
      background: #0a0a14;
      overflow: hidden;
      isolation: isolate;
      /* Entrance animation — entire hero fades up on first paint. */
      animation: sp-hero-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    /* Animated gradient mesh — three blurred orbs that slowly drift. */
    .sp-hero__mesh {
      position: absolute;
      inset: -100px;
      pointer-events: none;
      z-index: 0;
    }
    .sp-hero__orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.45;
      mix-blend-mode: screen;
      will-change: transform;
    }
    .sp-hero__orb--gold {
      width: 500px; height: 500px;
      top: -100px; left: -50px;
      background: radial-gradient(circle, #f0a500 0%, transparent 70%);
      animation: sp-orb-float-a 18s ease-in-out infinite alternate;
    }
    .sp-hero__orb--violet {
      width: 600px; height: 600px;
      top: 20%; right: -100px;
      background: radial-gradient(circle, #a855f7 0%, transparent 70%);
      animation: sp-orb-float-b 22s ease-in-out infinite alternate;
    }
    .sp-hero__orb--cyan {
      width: 400px; height: 400px;
      bottom: -100px; left: 30%;
      background: radial-gradient(circle, #38bdf8 0%, transparent 70%);
      opacity: 0.25;
      animation: sp-orb-float-c 25s ease-in-out infinite alternate;
    }
    /* Subtle grid pattern overlay for the cyber/tech texture. */
    .sp-hero__grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
    }
    /* Vignette darkens edges so content stays prominent. */
    .sp-hero::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.6) 100%);
    }

    /* 2-column layout: logo glass card on left, text on right.
       Stacks on small screens. */
    .sp-hero__layout {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: minmax(320px, 460px) 1fr;
      gap: 64px;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Glass card holding the logo. Frosted backdrop, soft border, glow halo. */
    .sp-hero__glass {
      position: relative;
      aspect-ratio: 1 / 1;
      max-width: 460px;
      border-radius: 28px;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.02) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(24px) saturate(140%);
      -webkit-backdrop-filter: blur(24px) saturate(140%);
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      overflow: hidden;
      animation: sp-glass-rise 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both;
    }
    /* Glow halo that pulses softly behind the logo. */
    .sp-hero__glass-glow {
      position: absolute;
      inset: 20%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(240, 165, 0, 0.25) 0%, transparent 70%);
      filter: blur(40px);
      animation: sp-glow-pulse 4s ease-in-out infinite alternate;
      z-index: 0;
    }
    .sp-hero__logo-wrap {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.4));
      }
    }
    .sp-hero__logo-fallback {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 72px;
      letter-spacing: 4px;
      color: #f0a500;
      text-shadow: 0 4px 30px rgba(240, 165, 0, 0.5);
    }

    /* Right side — text column. */
    .sp-hero__text {
      animation: sp-text-rise 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s both;
    }

    /* Title sponsor chip — slim pill with pulsing dot. */
    .sp-hero__chip {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 18px 8px 14px;
      margin-bottom: 28px;
      font-family: 'Bebas Neue', sans-serif;
      letter-spacing: 3px;
      font-size: 13px;
      color: #f0a500;
      border: 1px solid rgba(240, 165, 0, 0.4);
      border-radius: 999px;
      background: rgba(240, 165, 0, 0.06);
      text-transform: uppercase;
      backdrop-filter: blur(8px);
    }
    .sp-hero__chip-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #f0a500;
      box-shadow: 0 0 12px #f0a500;
      animation: sp-dot-pulse 2s ease-in-out infinite;
    }

    /* Big name — gradient-clipped text, soft glow. */
    .sp-hero__name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(44px, 6vw, 80px);
      letter-spacing: 3px;
      line-height: 0.95;
      margin: 0 0 20px;
      background: linear-gradient(135deg, #fff 0%, #f0a500 60%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 4px 20px rgba(240, 165, 0, 0.2));
    }
    .sp-hero__tagline {
      max-width: 540px;
      margin: 0 0 36px;
      color: #d0d0e0;
      font-size: clamp(15px, 1.4vw, 18px);
      line-height: 1.7;
    }

    /* CTA — modern pill with gradient border + filled-on-hover shimmer. */
    .sp-hero__cta {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 14px 30px;
      background: linear-gradient(135deg, #f0a500, #ffba2e);
      color: #0a0a14;
      text-decoration: none;
      border-radius: 999px;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0.5px;
      box-shadow:
        0 8px 32px rgba(240, 165, 0, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
      transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
                  box-shadow 0.25s,
                  filter 0.25s;
      overflow: hidden;
    }
    /* Light sweep shimmer on hover. */
    .sp-hero__cta::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: left 0.6s;
    }
    .sp-hero__cta:hover {
      transform: translateY(-3px);
      filter: brightness(1.05);
      box-shadow:
        0 16px 40px rgba(240, 165, 0, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
    .sp-hero__cta:hover::before { left: 100%; }
    .sp-hero__cta-arrow { transition: transform 0.25s; }
    .sp-hero__cta:hover .sp-hero__cta-arrow { transform: translateX(6px); }

    /* ── Keyframes ───────────────────────────────────────────────────── */
    @keyframes sp-hero-rise {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes sp-glass-rise {
      from { opacity: 0; transform: translateY(20px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes sp-text-rise {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes sp-orb-float-a {
      from { transform: translate(0, 0)     scale(1); }
      to   { transform: translate(60px, 80px) scale(1.15); }
    }
    @keyframes sp-orb-float-b {
      from { transform: translate(0, 0)       scale(1); }
      to   { transform: translate(-80px, 60px) scale(1.1); }
    }
    @keyframes sp-orb-float-c {
      from { transform: translate(0, 0)       scale(1); }
      to   { transform: translate(40px, -50px) scale(1.2); }
    }
    @keyframes sp-glow-pulse {
      from { opacity: 0.6; transform: scale(0.95); }
      to   { opacity: 1;   transform: scale(1.05); }
    }
    @keyframes sp-dot-pulse {
      0%, 100% { box-shadow: 0 0 8px  #f0a500; opacity: 1; }
      50%      { box-shadow: 0 0 18px #f0a500; opacity: 0.7; }
    }

    /* Accessibility: kill all motion for users who request it. */
    @media (prefers-reduced-motion: reduce) {
      .sp-hero, .sp-hero__glass, .sp-hero__text,
      .sp-hero__orb--gold, .sp-hero__orb--violet, .sp-hero__orb--cyan,
      .sp-hero__glass-glow, .sp-hero__chip-dot {
        animation: none !important;
      }
      .sp-hero__cta::before { display: none; }
    }

    /* Responsive: stack the 2-column layout on tablets and smaller. */
    @media (max-width: 900px) {
      .sp-hero { padding: 64px 20px; min-height: auto; }
      .sp-hero__layout {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      .sp-hero__glass {
        max-width: 320px;
        margin: 0 auto;
      }
      .sp-hero__tagline { margin-left: auto; margin-right: auto; }
    }
    @media (max-width: 500px) {
      .sp-hero { padding: 48px 16px; }
      .sp-hero__glass { max-width: 240px; padding: 32px; }
      .sp-hero__logo-fallback { font-size: 40px; }
    }

    /* ── Page intro header ───────────────────────────────────────────── */
    .sp-header {
      padding-top: 32px;
      text-align: center;
      margin-bottom: 48px;
    }
    .sp-header__title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 42px;
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

    /* ── Stats band — glass-card style with glowing numbers ──────────── */
    .sp-stats {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px 56px;
      padding: 40px 28px;
      margin-bottom: 80px;
      border-radius: 20px;
      background: linear-gradient(
        135deg,
        rgba(168, 85, 247, 0.08),
        rgba(240, 165, 0, 0.04)
      );
      border: 1px solid rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(16px) saturate(140%);
      -webkit-backdrop-filter: blur(16px) saturate(140%);
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }
    .sp-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 140px;
    }
    .sp-stat__num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(38px, 4vw, 52px);
      letter-spacing: 1.5px;
      line-height: 1;
      background: linear-gradient(135deg, #f0a500 0%, #ffba2e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 18px rgba(240, 165, 0, 0.25));
    }
    .sp-stat__label {
      margin-top: 8px;
      font-size: 11px;
      letter-spacing: 1.5px;
      color: #999;
      text-transform: uppercase;
      font-weight: 500;
    }

    /* ── Loading / Empty / Error ────────────────────────────────────── */
    .sp-loading, .sp-empty {
      text-align: center;
      padding: 60px 20px;
      color: #888;
      font-size: 14px;
      a { color: #a855f7; text-decoration: none; }
    }
    .sp-error p:first-child {
      color: #e1c4ff;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .sp-retry-btn {
      margin-top: 20px;
      padding: 10px 24px;
      background: transparent;
      color: #a855f7;
      border: 1px solid #a855f7;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      &:hover { background: #a855f7; color: #fff; }
    }
    .sp-card-link { cursor: pointer; }

    /* ── Supporting partners ────────────────────────────────────────── */
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
    .sp-standard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 260px));
      justify-content: center;
      gap: 16px;
    }
    .sp-standard-card {
      display: block;
      position: relative;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.01) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 16px;
      padding: 28px 22px;
      text-align: center;
      text-decoration: none;
      color: inherit;
      box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
      transition:
        transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
        border-color 0.3s,
        box-shadow 0.3s;

      &.sp-card-link:hover {
        transform: translateY(-4px);
        border-color: rgba(168, 85, 247, 0.4);
        box-shadow:
          0 16px 40px rgba(168, 85, 247, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .sp-logo-wrap {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 18px;
        img {
          max-height: 64px;
          max-width: 160px;
          object-fit: contain;
          filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.4));
        }
      }
      .sp-name {
        margin: 0 0 6px;
        font-size: 16px;
        color: #e0e0e8;
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
    }

    /* ── CTA ────────────────────────────────────────────────────────── */
    .sp-cta {
      margin-top: 80px;
      padding: 56px 32px;
      text-align: center;
      border-radius: 20px;
      background: linear-gradient(
        135deg,
        rgba(168, 85, 247, 0.12),
        rgba(240, 165, 0, 0.06)
      );
      border: 1px solid rgba(168, 85, 247, 0.25);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow:
        0 24px 60px rgba(168, 85, 247, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);

      h2 {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 34px;
        letter-spacing: 2px;
        margin: 0 0 14px;
        background: linear-gradient(135deg, #fff 0%, #a855f7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      p {
        color: #c0c0d0;
        margin: 0 0 28px;
        font-size: 15px;
      }
    }
    .sp-cta-btn {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
      color: #fff;
      text-decoration: none;
      border-radius: 999px;
      font-weight: 600;
      letter-spacing: 0.5px;
      box-shadow:
        0 8px 24px rgba(168, 85, 247, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s;

      &:hover {
        transform: translateY(-3px);
        box-shadow:
          0 16px 40px rgba(168, 85, 247, 0.55),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
    }
  `],
})
export class SponsorsComponent implements OnInit {
  private service = inject(PlatformSponsorService);
  private statsService = inject(PublicStatsService);
  private destroyRef = inject(DestroyRef);

  readonly data    = signal<PlatformSponsorsByTier | null>(null);
  readonly stats   = signal<PublicStats | null>(null);
  readonly loading = signal(true);
  readonly errored = signal(false);

  /** First title sponsor (the design assumes a single exclusive title). */
  readonly titleSponsor: () => PlatformSponsorRow | null = computed(
    () => this.data()?.title?.[0] ?? null,
  );
  readonly standardSponsors = computed(() => this.data()?.standard ?? []);
  readonly allCount = computed<number>(
    () => (this.data()?.title?.length ?? 0) + this.standardSponsors().length,
  );

  ngOnInit(): void {
    this.fetch(false);
    this.fetchStats();
  }

  /**
   * @param forceRefresh  When true, busts the shared sponsor cache.
   *                      Used by the retry button on the error state.
   *                      First load uses the cached value if available
   *                      so the strip / home / footer don't double-fetch.
   */
  fetch(forceRefresh: boolean = false): void {
    this.loading.set(true);
    this.errored.set(false);
    const source$ = forceRefresh ? this.service.refresh() : this.service.load();
    source$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => { this.data.set(d); this.loading.set(false); },
        error: ()  => { this.data.set({ title: [], standard: [] }); this.loading.set(false); this.errored.set(true); },
      });
  }

  private fetchStats(): void {
    this.statsService.load()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (s) => this.stats.set(s),
        // Stats failure is non-fatal — the page still works without them.
        // Silently swallow; the band just won't render.
        error: () => this.stats.set(null),
      });
  }

  /** Format a count with thousands separators (e.g. 1234 → "1,234"). */
  formatCount(n: number): string {
    return new Intl.NumberFormat('en-US').format(n);
  }

  /**
   * Format a SAR amount as "1.2K SAR" / "1.5M SAR" for compact display.
   * Below 1000 we show the exact number with thousands separators.
   */
  formatCurrency(sar: number): string {
    if (sar >= 1_000_000) {
      return (sar / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M SAR';
    }
    if (sar >= 1000) {
      return (sar / 1000).toFixed(1).replace(/\.0$/, '') + 'K SAR';
    }
    return new Intl.NumberFormat('en-US').format(sar) + ' SAR';
  }
}
