import {
  ChangeDetectionStrategy, Component, computed, inject, input, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * StreamEmbedComponent
 *
 * Renders a Twitch or YouTube live stream. Two modes:
 *
 *   mode='live'      (default) — embeds the iframe immediately. Use for
 *                                single-stream contexts (the match modal,
 *                                hero slots, ≤4-stream grids).
 *
 *   mode='thumbnail' — shows a static preview image with a play overlay.
 *                      Clicking promotes to live mode in-place. Use for
 *                      multi-stream grids (5+ streams) where embedding
 *                      every iframe would cripple performance.
 *
 * Provider detection happens client-side from the URL alone — no need
 * for the server to send provider/identifier separately. This keeps the
 * component reusable from anywhere a stream URL is available.
 *
 * Why DomSanitizer.bypassSecurityTrustResourceUrl?
 *   Angular blocks arbitrary URLs in iframe.src by default. Since we
 *   construct the embed URL ourselves from a tightly-validated identifier
 *   (server already parsed and rejected anything malformed), bypassing
 *   the sanitizer for OUR generated URL is safe.
 *
 * Twitch parent param:
 *   Twitch's iframe player refuses to load unless the `parent` query
 *   parameter matches the parent page's host. We auto-detect from
 *   window.location.hostname; in localhost / 127.0.0.1 dev that gives
 *   "localhost" which Twitch accepts.
 *
 * Thumbnail sources (no API keys required):
 *   - Twitch:  static-cdn.jtvnw.net/previews-ttv/live_user_{channel}-{w}x{h}.jpg
 *              Updates ~every minute. Offline channels return Twitch's
 *              default offline image — accepted as graceful fallback.
 *   - YouTube: img.youtube.com/vi/{video_id}/hqdefault.jpg
 *              Public CDN, reliable.
 */
@Component({
  selector: 'app-stream-embed',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (provider() === 'unknown') {
      <p class="stream-embed__error">Unable to render stream — unsupported URL.</p>
    } @else if (showLive()) {
      <div class="stream-embed stream-embed--live">
        @if (embedSrc(); as src) {
          <iframe
            [src]="src"
            [title]="title()"
            loading="lazy"
            frameborder="0"
            scrolling="no"
            allowfullscreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          ></iframe>
        }
        <a class="stream-embed__open" [href]="streamUrl()" target="_blank" rel="noopener noreferrer">
          Open on {{ providerLabel() }} ↗
        </a>
      </div>
    } @else {
      <button type="button" class="stream-embed stream-embed--thumb" (click)="promoteToLive()">
        @if (thumbnailUrl(); as thumb) {
          <img [src]="thumb" [alt]="title()" loading="lazy"
               (error)="onThumbnailError($event)"/>
        } @else {
          <div class="stream-embed__thumb-fallback">{{ providerLabel() }}</div>
        }
        <div class="stream-embed__overlay" aria-hidden="true">
          <div class="stream-embed__play">▶</div>
          <span class="stream-embed__provider-tag">{{ providerLabel() }}</span>
        </div>
      </button>
    }
  `,
  styles: [`
    :host { display: block; }

    .stream-embed {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--br, rgba(255, 255, 255, 0.08));
    }
    .stream-embed iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .stream-embed--thumb {
      display: block;
      padding: 0;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s;

      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        border-color: var(--gold, #a855f7);
        transform: translateY(-2px);
      }
      &:hover .stream-embed__play {
        background: var(--gold, #a855f7);
        transform: scale(1.1);
      }
      &:focus-visible {
        outline: 2px solid var(--gold, #a855f7);
        outline-offset: 2px;
      }
    }

    .stream-embed__thumb-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #16162d 100%);
      color: var(--mu, #888);
      font-family: var(--fh, system-ui);
      font-size: 1.4rem;
      letter-spacing: 0.1em;
    }

    .stream-embed__overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.15) 50%,
        rgba(0, 0, 0, 0.4) 100%
      );
      pointer-events: none;
    }
    .stream-embed__play {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      padding-left: 4px;
      backdrop-filter: blur(6px);
      transition: background 0.2s, transform 0.2s;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
    }
    .stream-embed__provider-tag {
      position: absolute;
      bottom: 10px;
      left: 10px;
      padding: 3px 10px;
      font-family: var(--fm, system-ui);
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      border-radius: 999px;
      backdrop-filter: blur(6px);
    }

    .stream-embed__open {
      position: absolute;
      bottom: 8px; right: 8px;
      padding: 4px 10px;
      font-family: var(--fm, system-ui);
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      border-radius: 999px;
      text-decoration: none;
      backdrop-filter: blur(6px);
      transition: background 0.15s;
      z-index: 2;
    }
    .stream-embed__open:hover { background: rgba(168, 85, 247, 0.85); }

    .stream-embed__error {
      padding: 14px;
      text-align: center;
      color: var(--mu, #888);
      background: var(--bg2, rgba(255, 255, 255, 0.04));
      border: 1px dashed var(--br, rgba(255, 255, 255, 0.12));
      border-radius: 12px;
      font-size: 0.85rem;
    }
  `],
})
export class StreamEmbedComponent {
  /** Canonical Twitch/YouTube URL. */
  readonly streamUrl = input.required<string>();
  /** Optional title for accessibility. */
  readonly title = input<string>('Live stream');
  /**
   * 'live' embeds the iframe immediately.
   * 'thumbnail' renders a clickable preview that promotes to live on click.
   * Use 'thumbnail' in grids of 5+ streams to avoid loading all iframes at once.
   */
  readonly mode = input<'live' | 'thumbnail'>('live');

  private readonly sanitizer = inject(DomSanitizer);

  /**
   * User-promoted state: starts true when mode is 'live'; becomes true
   * when a thumbnail-mode embed is clicked. Once true, never goes back —
   * no point un-loading the iframe just to show the thumbnail again.
   */
  private readonly promoted = signal(false);

  /** Combined: should we render the live iframe right now? */
  readonly showLive = computed(() => this.mode() === 'live' || this.promoted());

  /**
   * Parsed provider — drives label + embed URL shape.
   * 'unknown' when URL doesn't match Twitch or YouTube.
   */
  readonly provider = computed<'twitch' | 'youtube' | 'unknown'>(() => {
    const url = this.streamUrl();
    if (!url) return 'unknown';
    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();
      if (host === 'twitch.tv' || host === 'www.twitch.tv') return 'twitch';
      if (host === 'youtube.com' || host === 'www.youtube.com'
          || host === 'm.youtube.com' || host === 'youtu.be') {
        return 'youtube';
      }
    } catch {
      return 'unknown';
    }
    return 'unknown';
  });

  /** Human label for the "Open on X" link and provider tag. */
  readonly providerLabel = computed(() => {
    switch (this.provider()) {
      case 'twitch':  return 'Twitch';
      case 'youtube': return 'YouTube';
      default:        return 'site';
    }
  });

  /**
   * Build the embed URL based on provider. Returns null when we can't
   * extract enough information to embed safely.
   */
  readonly embedSrc = computed<SafeResourceUrl | null>(() => {
    const url = this.streamUrl();
    if (!url) return null;

    let raw: string | null = null;

    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();

      if (host === 'twitch.tv' || host === 'www.twitch.tv') {
        const channel = u.pathname.replace(/^\/+|\/+$/g, '');
        if (!/^[a-z0-9][a-z0-9_]{3,24}$/i.test(channel)) return null;
        const parent = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        raw = `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}`
            + `&parent=${encodeURIComponent(parent)}&muted=true`;
      } else if (host === 'youtu.be') {
        const id = u.pathname.replace(/^\/+|\/+$/g, '');
        if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
        raw = `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0`;
      } else if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
        let id: string | null = u.searchParams.get('v');
        if (!id) {
          const m = u.pathname.match(/^\/live\/([A-Za-z0-9_-]{11})$/);
          if (m) id = m[1];
        }
        if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
        raw = `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0`;
      }
    } catch {
      return null;
    }

    if (!raw) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
  });

  /**
   * Best-effort thumbnail URL. Twitch and YouTube both expose preview
   * thumbnails at predictable, public CDN endpoints — no API keys needed.
   * If the channel is offline or the video doesn't exist, the providers'
   * default placeholder is served (acceptable graceful fallback).
   */
  readonly thumbnailUrl = computed<string | null>(() => {
    const url = this.streamUrl();
    if (!url) return null;
    try {
      const u = new URL(url);
      const host = u.hostname.toLowerCase();

      if (host === 'twitch.tv' || host === 'www.twitch.tv') {
        const channel = u.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
        if (!/^[a-z0-9][a-z0-9_]{3,24}$/i.test(channel)) return null;
        // 640x360 = 16:9 at decent grid size. Cache-buster bumps per minute.
        const t = Math.floor(Date.now() / 60000);
        return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-640x360.jpg?cb=${t}`;
      }

      if (host === 'youtu.be') {
        const id = u.pathname.replace(/^\/+|\/+$/g, '');
        if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }

      if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
        let id: string | null = u.searchParams.get('v');
        if (!id) {
          const m = u.pathname.match(/^\/live\/([A-Za-z0-9_-]{11})$/);
          if (m) id = m[1];
        }
        if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    } catch {
      return null;
    }
    return null;
  });

  /**
   * Click handler on the thumbnail tile — switches the component to
   * live iframe rendering for the rest of the session.
   */
  promoteToLive(): void {
    this.promoted.set(true);
  }

  /**
   * Thumbnail load failed (offline channel, network blip). We hide the
   * broken image; the play-overlay is still visible so the user can
   * click through to live or to the external site.
   */
  onThumbnailError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) img.style.display = 'none';
  }
}
