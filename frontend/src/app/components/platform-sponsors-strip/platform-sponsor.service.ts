import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PlatformSponsorRow {
  id: string;
  tier: 'title' | 'standard';
  display_order: number;
  sponsor: {
    id: string;
    name: string;
    name_ar: string | null;
    slug: string;
    tagline: string | null;
    tagline_ar: string | null;
    logo_url: string | null;
    website_url: string | null;
  };
}

export interface PlatformSponsorsByTier {
  title: PlatformSponsorRow[];
  standard: PlatformSponsorRow[];
}

/**
 * PlatformSponsorService
 *
 * Single source of truth for active platform sponsors. The shared strip
 * component, homepage hero, footer, and tournament list all consume the
 * same observable, so we only fetch once per session.
 *
 * Cached via shareReplay(1) — subsequent subscribers get the cached
 * value without re-fetching. Call refresh() if needed (e.g. after
 * admin saves a change in another tab and you want to re-read).
 */
@Injectable({ providedIn: 'root' })
export class PlatformSponsorService {
  private http = inject(HttpClient);

  // Resolve the API base from environment so production builds hit the
  // real domain instead of localhost. Other services in this codebase
  // (auth.service, tournament.service) follow the same pattern.
  private base = environment.apiUrl;

  private cache$: Observable<PlatformSponsorsByTier> | null = null;

  readonly latest = signal<PlatformSponsorsByTier | null>(null);

  load(): Observable<PlatformSponsorsByTier> {
    if (!this.cache$) {
      this.cache$ = this.http.get<{ data: PlatformSponsorsByTier }>(`${this.base}/platform-sponsors`)
        .pipe(
          // Map the response down to the inner shape
          (src) => new Observable<PlatformSponsorsByTier>(observer => {
            return src.subscribe({
              next: (r) => observer.next(r.data),
              error: (e) => observer.error(e),
              complete: () => observer.complete(),
            });
          }),
          tap(d => this.latest.set(d)),
          shareReplay(1),
        );
    }
    return this.cache$;
  }

  refresh(): Observable<PlatformSponsorsByTier> {
    this.cache$ = null;
    return this.load();
  }
}
