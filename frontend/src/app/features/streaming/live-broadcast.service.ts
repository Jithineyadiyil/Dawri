import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  BroadcastCredentials,
  CreateBroadcastPayload,
  LiveBroadcast,
} from './live-broadcast.model';

/**
 * LiveBroadcastService — Angular client for the Dawri YouTube Live API.
 *
 * Endpoint conventions (mirror Sprint 4 services):
 *   - All responses use `{ data: ... }` envelope
 *   - Auth handled globally by the `authInterceptor` (`dawri_token`)
 *   - Base URL comes from `environment.apiUrl` (e.g. http://localhost:8001/api/v1)
 *
 * Method naming:
 *   createForMatch / createForTournament — start a new broadcast
 *   goLive / complete / cancel           — state transitions
 *   getCredentials                       — one-time RTMP key reveal
 *
 * Note: `stream_key` returned by `getCredentials()` should be displayed
 * exactly once (clipboard copy + hide). The backend rate-limits this
 * endpoint to 5 requests/minute/user.
 */
@Injectable({ providedIn: 'root' })
export class LiveBroadcastService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  /** POST /matches/{matchId}/broadcast — create + bind RTMP stream */
  createForMatch(matchId: string, payload: CreateBroadcastPayload): Observable<LiveBroadcast> {
    return this.http
      .post<{ data: LiveBroadcast }>(`${this.base}/matches/${matchId}/broadcast`, payload)
      .pipe(map(r => r.data));
  }

  /** POST /tournaments/{tournamentId}/broadcast — tournament-level broadcast */
  createForTournament(
    tournamentId: string,
    payload: CreateBroadcastPayload,
  ): Observable<LiveBroadcast> {
    return this.http
      .post<{ data: LiveBroadcast }>(`${this.base}/tournaments/${tournamentId}/broadcast`, payload)
      .pipe(map(r => r.data));
  }

  /** GET /broadcasts/{id} */
  get(broadcastId: string): Observable<LiveBroadcast> {
    return this.http
      .get<{ data: LiveBroadcast }>(`${this.base}/broadcasts/${broadcastId}`)
      .pipe(map(r => r.data));
  }

  /** POST /broadcasts/{id}/go-live — start the broadcast */
  goLive(broadcastId: string): Observable<LiveBroadcast> {
    return this.http
      .post<{ data: LiveBroadcast }>(`${this.base}/broadcasts/${broadcastId}/go-live`, {})
      .pipe(map(r => r.data));
  }

  /** POST /broadcasts/{id}/complete — end the broadcast */
  complete(broadcastId: string): Observable<LiveBroadcast> {
    return this.http
      .post<{ data: LiveBroadcast }>(`${this.base}/broadcasts/${broadcastId}/complete`, {})
      .pipe(map(r => r.data));
  }

  /** DELETE /broadcasts/{id} — cancel a pre-live broadcast */
  cancel(broadcastId: string): Observable<void> {
    return this.http
      .delete<{ data: { cancelled: boolean } }>(`${this.base}/broadcasts/${broadcastId}`)
      .pipe(map(() => undefined));
  }

  /**
   * GET /broadcasts/{id}/credentials — RTMP URL + stream key.
   *
   * IMPORTANT FOR CONSUMERS:
   *   - Display the stream_key exactly once
   *   - Provide a "Copy to clipboard" button, then mask the value
   *   - NEVER persist the key in localStorage / sessionStorage / IndexedDB
   *   - Rate-limited server-side: 5 requests/minute/user
   */
  getCredentials(broadcastId: string): Observable<BroadcastCredentials> {
    return this.http
      .get<{ data: BroadcastCredentials }>(`${this.base}/broadcasts/${broadcastId}/credentials`)
      .pipe(map(r => r.data));
  }
}
