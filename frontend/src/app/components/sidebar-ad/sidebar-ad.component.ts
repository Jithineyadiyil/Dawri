import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
  inject, input, signal, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-sidebar-ad',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
@if (!isPremium() && !dismissed() && currentAd()) {
  <div class="sad-wrap">

    <!-- Sponsored row -->
    <div class="sad-top">
      <span class="sad-sponsored">Sponsored</span>
      <button class="sad-close" (click)="closeSidebarAd()" title="Close">✕</button>
    </div>

    <!-- Image fills remaining height -->
    <div class="sad-img-wrap">
      @if (currentAd()!.image_url) {
        <img [src]="currentAd()!.image_url" [alt]="currentAd()!.title"/>
      } @else {
        <div class="sad-placeholder">
          <span class="sad-initial">{{ (currentAd()!.brand_name || currentAd()!.title).charAt(0) }}</span>
        </div>
      }
      <!-- Gradient overlay at bottom -->
      <div class="sad-overlay"></div>
    </div>

    <!-- Content overlaid on image bottom -->
    <div class="sad-content">
      @if (currentAd()!.brand_name) {
        <div class="sad-brand">{{ currentAd()!.brand_name }}</div>
      }
      <div class="sad-title">{{ currentAd()!.title }}</div>
      @if (currentAd()!.title_ar) {
        <div class="sad-title-ar" dir="rtl">{{ currentAd()!.title_ar }}</div>
      }
      @if (currentAd()!.link_url) {
        <a [href]="currentAd()!.link_url" target="_blank" rel="noopener"
           class="sad-cta" (click)="trackClick()">
          {{ currentAd()!.cta_label || 'Learn More' }} →
        </a>
      }
    </div>

    <!-- Rotation dots -->
    @if (ads().length > 1) {
      <div class="sad-dots">
        @for (ad of ads(); track ad.id; let i = $index) {
          <button class="sad-dot"
                  [class.sad-dot--active]="i === currentIndex()"
                  (click)="goTo(i)"></button>
        }
      </div>
    }
  </div>
}
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* Full-height wrapper */
    .sad-wrap {
      --accent: #f0a500;
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 300px;
      background: #080e1a;
      border: 1px solid rgba(255,255,255,.08);
      border-top: 3px solid var(--accent);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Sponsored header */
    .sad-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 10px;
      background: rgba(0,0,0,.4);
      flex-shrink: 0;
      z-index: 10;
    }
    .sad-sponsored {
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: rgba(255,255,255,.35);
    }
    .sad-close {
      background: none;
      border: none;
      color: rgba(255,255,255,.3);
      font-size: 12px;
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 4px;
      line-height: 1;
      transition: all .15s;
    }
    .sad-close:hover { color: #fff; background: rgba(255,255,255,.1); }

    /* Image fills all remaining space */
    .sad-img-wrap {
      flex: 1;
      position: relative;
      overflow: hidden;
      min-height: 0;
    }
    .sad-img-wrap img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .sad-placeholder {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(160deg, #0d1a2e, #091422);
    }
    .sad-initial {
      font-size: 80px;
      font-weight: 900;
      color: var(--accent);
      opacity: .15;
    }
    /* Gradient overlay so text reads over image */
    .sad-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        transparent 30%,
        rgba(8,14,26,.7) 65%,
        rgba(8,14,26,.97) 100%
      );
    }

    /* Content overlaid at bottom of image */
    .sad-content {
      position: absolute;
      bottom: 40px;   /* leave room for dots */
      left: 0; right: 0;
      padding: 0 12px 8px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sad-brand {
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent);
    }
    .sad-title {
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
      text-shadow: 0 1px 6px rgba(0,0,0,.8);
    }
    .sad-title-ar {
      font-size: 11px;
      color: rgba(255,255,255,.6);
    }
    .sad-cta {
      display: inline-block;
      margin-top: 6px;
      padding: 7px 12px;
      background: var(--accent);
      color: #080e1a;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      text-decoration: none;
      border-radius: 6px;
      transition: opacity .15s;
      align-self: stretch;
    }
    .sad-cta:hover { opacity: .85; }

    /* Dots at very bottom */
    .sad-dots {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      display: flex;
      justify-content: center;
      gap: 5px;
      padding: 8px 0;
      z-index: 6;
      background: rgba(8,14,26,.5);
    }
    .sad-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,.25);
      cursor: pointer;
      padding: 0;
      transition: background .15s;
    }
    .sad-dot--active { background: var(--accent); }
  `]
})
export class SidebarAdComponent implements OnInit, OnDestroy {
  readonly side = input<'sidebar_left' | 'sidebar_right'>('sidebar_left');

  private api  = inject(ApiService);
  private auth = inject(AuthService);

  readonly ads          = signal<any[]>([]);
  readonly currentIndex = signal(0);
  readonly currentAd    = signal<any>(null);
  // Persist dismissed state per-side in sessionStorage so closing on one page
  // keeps it closed on others, but resets when browser tab is closed
  private get dismissedKey(): string { return 'ad_dismissed_' + this.side(); }

  readonly dismissed = signal(
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ad_dismissed_' + (this.side?.() ?? '')) === '1'
  );

  closeSidebarAd(): void {
    this.dismissed.set(true);
    try { sessionStorage.setItem(this.dismissedKey, '1'); } catch (_) {}
  }

  readonly isPremium = () => {
    const plan = this.auth.currentUser()?.subscription_plan;
    return plan && plan !== 'free';
  };

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (this.isPremium()) return;
    this.api.getAdPlacements(this.side()).pipe(catchError(() => of({ data: [] }))).subscribe(r => {
      const list = r.data ?? [];
      this.ads.set(list);
      if (list.length) {
        this.currentAd.set(list[0]);
        if (list.length > 1) {
          this.timer = setInterval(() => this.advance(), 8000);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  advance(): void {
    const next = (this.currentIndex() + 1) % this.ads().length;
    this.currentIndex.set(next);
    this.currentAd.set(this.ads()[next]);
  }

  goTo(i: number): void {
    this.currentIndex.set(i);
    this.currentAd.set(this.ads()[i]);
  }

  trackClick(): void {
    const ad = this.currentAd();
    if (ad?.id) this.api.trackAdClick(ad.id);
  }
}
