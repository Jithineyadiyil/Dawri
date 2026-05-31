/**
 * @fileoverview Angular HTTP client for the browser-broadcast feature.
 *
 * Wraps the two backend endpoints behind a typed, observable-returning
 * API so components stay free of HTTP details.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { BrowserBroadcastSession, CreateSessionPayload } from './browser-broadcast.model';

/**
 * Service for managing browser-broadcast sessions.
 *
 * Sanctum's HTTP interceptor (provided elsewhere in the app) attaches
 * the `dawri_token` automatically, so this service stays auth-agnostic.
 *
 * @example
 *   const session = await firstValueFrom(
 *     this.broadcastService.openSession(broadcastId)
 *   );
 *   await whipClient.publish(session.whip_url, mediaStream);
 */
@Injectable({ providedIn: 'root' })
export class BrowserBroadcastService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/broadcasts`;

  /**
   * Open a new browser-broadcast session for the given broadcast.
   *
   * The backend creates a Mux live stream wired to simulcast to Dawri's
   * YouTube channel and returns the WHIP credentials.
   *
   * @param broadcastId  UUID of the LiveBroadcast row.
   * @param payload      Optional capture preferences.
   *
   * @returns Observable that emits the session once.
   */
  openSession(
    broadcastId: string,
    payload: CreateSessionPayload = {},
  ): Observable<BrowserBroadcastSession> {
    return this.http
      .post<{ data: BrowserBroadcastSession }>(
        `${this.baseUrl}/${broadcastId}/browser-session`,
        payload,
      )
      .pipe(map((response) => response.data));
  }

  /**
   * Close an active browser-broadcast session.
   *
   * Idempotent — calling for an already-closed session returns 204.
   *
   * @param broadcastId  UUID of the LiveBroadcast row.
   *
   * @returns Observable that completes on success.
   */
  closeSession(broadcastId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${broadcastId}/browser-session`);
  }
}
