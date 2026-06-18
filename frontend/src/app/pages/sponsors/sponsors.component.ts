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

      <!-- Ambient background -->
      <div class="sp-bg" aria-hidden="true">
        <div class="sp-bg__orb sp-bg__orb--gold"></div>
        <div class="sp-bg__orb sp-bg__orb--green"></div>
      </div>

      <!-- ── Header ─────────────────────────────────────────────────── -->
      <header class="sp-header">
        <div class="sp-eyebrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Our Partners
        </div>
        <h1 class="sp-title">Powering <em>GCC Esports</em></h1>
        <p class="sp-subtitle">
          Dawri is proudly powered by visionary partners committed to growing
          the esports ecosystem in Saudi Arabia and beyond.
        </p>
      </header>

      <!-- ── Loading ────────────────────────────────────────────────── -->
      @if (loading()) {
        <div class="sp-loading">
          <div class="sp-loading__spinner"></div>
          <span>Loading partners…</span>
        </div>
      } @else if (allCount() === 0) {
        <div class="sp-empty">
          <div class="sp-empty__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3>Partner announcements coming soon</h3>
          <p>Interested in partnering with Dawri?</p>
          <a class="sp-contact-link" routerLink="/contact">
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      } @else {

        <!-- Title sponsors -->
        @if (titleSponsors().length > 0) {
          <section class="sp-tier">
            <div class="sp-tier__head">
              <span class="sp-tier__badge sp-tier__badge--title">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v2H2v-2zm2-4h16l1-9-5 3-4-6-4 6-5-3 1 9z"/></svg>
                Title Sponsor
              </span>
              <div class="sp-tier__line"></div>
            </div>
            <div class="sp-title-grid">
              @for (s of titleSponsors(); track s.id) {
                <a class="sp-title-card"
                   [href]="s.sponsor.website_url || '#'"
                   [target]="s.sponsor.website_url ? '_blank' : '_self'"
                   [attr.rel]="s.sponsor.website_url ? 'noopener' : null">
                  <div class="sp-title-card__glow" aria-hidden="true"></div>
                  <div class="sp-logo-wrap sp-logo-wrap--lg">
                    @if (s.sponsor.logo_url) {
                      <img [src]="s.sponsor.logo_url" [alt]="s.sponsor.name" />
                    } @else {
                      <span class="sp-name-fallback sp-name-fallback--lg">{{ s.sponsor.name }}</span>
                    }
                  </div>
                  <h3 class="sp-card-name">{{ s.sponsor.name }}</h3>
                  @if (s.sponsor.tagline) {
                    <p class="sp-card-tagline">{{ s.sponsor.tagline }}</p>
                  }
                  <span class="sp-card-link">
                    Visit partner
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </a>
              }
            </div>
          </section>
        }

        <!-- Supporting partners -->
        @if (standardSponsors().length > 0) {
          <section class="sp-tier">
            <div class="sp-tier__head">
              <span class="sp-tier__badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Supporting Partners
              </span>
              <div class="sp-tier__line"></div>
            </div>
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
                      <span class="sp-name-fallback">{{ s.sponsor.name }}</span>
                    }
                  </div>
                  <h3 class="sp-card-name sp-card-name--sm">{{ s.sponsor.name }}</h3>
                  @if (s.sponsor.tagline) {
                    <p class="sp-card-tagline sp-card-tagline--sm">{{ s.sponsor.tagline }}</p>
                  }
                </a>
              }
            </div>
          </section>
        }
      }

      <!-- ── CTA ─────────────────────────────────────────────────────── -->
      <section class="sp-cta">
        <div class="sp-cta__grid-bg" aria-hidden="true"></div>
        <div class="sp-cta__glow" aria-hidden="true"></div>
        <div class="sp-cta__content">
          <div class="sp-eyebrow">Become a Partner</div>
          <h2 class="sp-cta__title">Join the <em>GCC's fastest-growing</em><br>esports platform</h2>
          <p class="sp-cta__sub">
            Reach over 5,000 active gamers and 100+ corporate communities through Dawri.
            Brand exposure across tournaments, marketplace, and community channels.
          </p>
          <div class="sp-cta__actions">
            <a class="sp-btn sp-btn--primary" routerLink="/contact">
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a class="sp-btn sp-btn--ghost" routerLink="/pricing">View packages</a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    :host { display: block; }

    /* ── Keyframes ─────────────────────────────────────────────────────── */
    @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-50px)} }
    @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,40px)} }
    @keyframes shimmer   { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes spin      { to{transform:rotate(360deg)} }

    /* ── Page ────────────────────────────────────────────────────────────── */
    .sponsors-page {
      position: relative; min-height: 100vh; overflow-x: hidden;
      background: var(--bg); color: var(--text);
      max-width: 1440px; margin: 0 auto;
      padding: 0 32px 100px;
    }

    /* ── Ambient background ──────────────────────────────────────────────── */
    .sp-bg { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
    .sp-bg__orb { position: absolute; border-radius: 50%; filter: blur(110px); opacity: .4; }
    .sp-bg__orb--gold  { width:600px;height:500px;top:-150px;right:-100px; background:radial-gradient(circle,rgba(212,175,55,.22),transparent 70%); animation:orbFloat1 22s ease-in-out infinite; }
    .sp-bg__orb--green { width:500px;height:500px;bottom:-100px;left:-120px; background:radial-gradient(circle,rgba(0,108,53,.18),transparent 70%); animation:orbFloat2 28s ease-in-out infinite; }

    /* ── Header ────────────────────────────────────────────────────────────── */
    .sp-header {
      position: relative; z-index: 1; text-align: center;
      padding: 80px 0 64px; display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    .sp-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--fm, monospace); font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--accent, #d4af37); padding: 6px 14px 6px 12px;
      background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.25);
      border-radius: 100px;
      svg { flex-shrink: 0; }
    }
    .sp-title {
      font-family: var(--fh, 'Anton', sans-serif);
      font-size: clamp(42px, 7vw, 84px);
      line-height: .92; letter-spacing: .06em; text-transform: uppercase; margin: 0;
      color: var(--text);
      em { font-style: normal; color: var(--accent, #d4af37); }
    }
    .sp-subtitle {
      max-width: 600px; color: var(--mu, #8a8aa0); font-size: 16px; line-height: 1.7; margin: 0;
    }

    /* ── Loading ─────────────────────────────────────────────────────────── */
    .sp-loading {
      position: relative; z-index: 1; display: flex; flex-direction: column;
      align-items: center; gap: 16px; padding: 80px 0;
      font-family: var(--fm, monospace); font-size: 12px; letter-spacing: 2px;
      text-transform: uppercase; color: var(--mu, #8a8aa0);
    }
    .sp-loading__spinner {
      width: 40px; height: 40px; border-radius: 50%;
      border: 2px solid rgba(212,175,55,.2); border-top-color: var(--accent, #d4af37);
      animation: spin .8s linear infinite;
    }

    /* ── Empty ───────────────────────────────────────────────────────────── */
    .sp-empty {
      position: relative; z-index: 1; text-align: center; padding: 80px 20px;
      display: flex; flex-direction: column; align-items: center; gap: 14px;
    }
    .sp-empty__icon {
      width: 72px; height: 72px; border-radius: 50%;
      background: rgba(212,175,55,.08); border: 1px solid rgba(212,175,55,.2);
      display: grid; place-items: center; color: var(--accent, #d4af37);
      margin-bottom: 8px;
    }
    .sp-empty h3 { font-family: var(--fh, sans-serif); font-size: 1.6rem; text-transform: uppercase; letter-spacing: .06em; margin: 0; }
    .sp-empty p  { color: var(--mu, #8a8aa0); font-size: .95rem; margin: 0; }
    .sp-contact-link {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 10px 22px; background: var(--primary, #006c35); color: #fff;
      border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;
      transition: background .18s, transform .18s; margin-top: 8px;
      svg { transition: transform .2s; }
      &:hover { background: var(--primary-soft, #2d8c5e); transform: translateY(-2px); svg { transform: translateX(3px); } }
    }

    /* ── Tier sections ───────────────────────────────────────────────────── */
    .sp-tier { position: relative; z-index: 1; margin-bottom: 72px; }
    .sp-tier__head {
      display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
    }
    .sp-tier__badge {
      display: inline-flex; align-items: center; gap: 7px; flex-shrink: 0;
      font-family: var(--fm, monospace); font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: var(--mu, #8a8aa0); padding: 5px 12px;
      background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 6px;
    }
    .sp-tier__badge svg { flex-shrink: 0; }
    .sp-tier__badge--title { color: var(--accent, #d4af37); background: rgba(212,175,55,.08); border-color: rgba(212,175,55,.25); }
    .sp-tier__line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,.08), transparent); }

    /* ── Title sponsor cards ─────────────────────────────────────────────── */
    .sp-title-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 24px; max-width: 820px; margin: 0 auto;
    }
    .sp-title-card {
      position: relative; overflow: hidden;
      background: linear-gradient(160deg, rgba(212,175,55,.06) 0%, rgba(0,108,53,.04) 100%);
      border: 1px solid rgba(212,175,55,.22); border-radius: 16px;
      padding: 44px 36px; text-align: center; text-decoration: none; color: inherit;
      display: flex; flex-direction: column; align-items: center; gap: 16px;
      transition: transform .25s, border-color .25s, box-shadow .25s;
      &:hover {
        transform: translateY(-5px); border-color: var(--accent, #d4af37);
        box-shadow: 0 20px 50px rgba(212,175,55,.15);
        .sp-title-card__glow { opacity: 1; }
        .sp-card-link svg { transform: translateX(4px); }
      }
    }
    .sp-title-card__glow {
      position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .3s;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,.1), transparent 70%);
    }
    .sp-logo-wrap { display: flex; align-items: center; justify-content: center; height: 80px; }
    .sp-logo-wrap img { max-height: 80px; max-width: 200px; object-fit: contain; filter: brightness(1.1); }
    .sp-logo-wrap--lg { height: 120px; }
    .sp-logo-wrap--lg img { max-height: 120px; max-width: 280px; }

    /* ── Standard sponsor cards ──────────────────────────────────────────── */
    .sp-standard-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;
    }
    .sp-standard-card {
      background: var(--bg2, #10101c); border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px; padding: 28px 20px; text-align: center;
      text-decoration: none; color: inherit;
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      transition: transform .2s, border-color .2s, box-shadow .2s;
      &:hover {
        transform: translateY(-3px); border-color: rgba(212,175,55,.35);
        box-shadow: 0 8px 28px rgba(0,0,0,.3);
      }
      .sp-logo-wrap { height: 60px; img { max-height: 60px; max-width: 140px; } }
    }

    /* ── Shared card text ────────────────────────────────────────────────── */
    .sp-card-name { font-family: var(--fh, sans-serif); font-size: 22px; letter-spacing: .5px; text-transform: uppercase; margin: 0; color: var(--text); }
    .sp-card-name--sm { font-size: 16px; }
    .sp-card-tagline { margin: 0; color: var(--mu, #8a8aa0); font-size: 14px; line-height: 1.6; }
    .sp-card-tagline--sm { font-size: 12px; }
    .sp-card-link {
      display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;
      font-family: var(--fm, monospace); font-size: 11px; letter-spacing: 1.2px;
      text-transform: uppercase; color: var(--accent, #d4af37);
      svg { transition: transform .2s; }
    }
    .sp-name-fallback { font-family: var(--fh, sans-serif); letter-spacing: 2px; text-transform: uppercase; color: var(--accent, #d4af37); font-size: 22px; }
    .sp-name-fallback--lg { font-size: 34px; }

    /* ── CTA section ─────────────────────────────────────────────────────── */
    .sp-cta {
      position: relative; z-index: 1; overflow: hidden;
      margin-top: 24px; border-radius: 20px;
      border: 1px solid rgba(212,175,55,.18); padding: 72px 48px;
      background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(0,108,53,.1), transparent 65%),
                  radial-gradient(ellipse 60% 80% at 80% 0%, rgba(212,175,55,.08), transparent 60%),
                  var(--bg2, #10101c);
      text-align: center;
      @media (max-width: 640px) { padding: 48px 24px; }
    }
    .sp-cta__grid-bg {
      position: absolute; inset: 0; pointer-events: none;
      background-image: linear-gradient(rgba(212,175,55,.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(212,175,55,.04) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, #000 20%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, #000 20%, transparent 75%);
    }
    .sp-cta__glow {
      position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
      width: 800px; height: 500px;
      background: radial-gradient(ellipse, rgba(0,108,53,.18) 0%, rgba(212,175,55,.06) 40%, transparent 70%);
      filter: blur(60px); pointer-events: none;
      animation: shimmer 5s ease-in-out infinite;
    }
    .sp-cta__content { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .sp-cta__title {
      font-family: var(--fh, sans-serif); font-size: clamp(32px, 5vw, 56px);
      line-height: .92; text-transform: uppercase; letter-spacing: .06em; margin: 0; color: var(--text);
      em { font-style: normal; color: var(--accent, #d4af37); }
    }
    .sp-cta__sub { color: var(--mu, #8a8aa0); font-size: 15px; line-height: 1.7; margin: 0; }
    .sp-cta__actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }

    .sp-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 26px; border-radius: 10px; font-weight: 700; font-size: 14px;
      text-decoration: none; cursor: pointer; border: 1px solid transparent;
      transition: transform .18s, background .18s, border-color .18s, box-shadow .18s;
    }
    .sp-btn svg { flex-shrink: 0; transition: transform .2s; }
    .sp-btn:hover { transform: translateY(-2px); }
    .sp-btn:hover svg { transform: translateX(3px); }
    .sp-btn--primary { background: var(--primary, #006c35); color: #fff; }
    .sp-btn--primary:hover { background: var(--primary-soft, #2d8c5e); box-shadow: 0 8px 24px rgba(0,108,53,.3); }
    .sp-btn--ghost { background: transparent; border-color: rgba(255,255,255,.15); color: var(--text); }
    .sp-btn--ghost:hover { border-color: var(--text); background: rgba(255,255,255,.04); }
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
