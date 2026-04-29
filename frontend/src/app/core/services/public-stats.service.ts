import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Shape returned by GET /api/v1/stats/public.
 * Counts only — no projections, no marketing inflations.
 */
export interface PublicStats {
  tournaments_completed: number;
  tournaments_active: number;
  registered_players: number;
  total_prize_distributed_sar: number;
  active_partners: number;
  generated_at: string;
}

/**
 * PublicStatsService
 *
 * Reads platform stats from the public stats endpoint.
 * Stats are server-side cached for 5 minutes; we add a `shareReplay(1)`
 * client-side cache so multiple consumers in a single session don't
 * hit the network twice.
 */
@Injectable({ providedIn: 'root' })
export class PublicStatsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;
  private cache$: Observable<PublicStats> | null = null;

  load(): Observable<PublicStats> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<{ data: PublicStats }>(`${this.base}/stats/public`)
        .pipe(
          map(r => r.data),
          shareReplay(1),
        );
    }
    return this.cache$;
  }
}
