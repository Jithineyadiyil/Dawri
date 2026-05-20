import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import type { BroadcastCredentials, LiveBroadcast } from '../live-broadcast.model';
import type {
  ClientPlatform,
  LogEventPayload,
  WizardConfig,
  WizardEvent,
  WizardScope,
} from './wizard.model';

interface ApiEnvelope<T> { readonly data: T; }

/**
 * ObsWizardService — typed HTTP client for the OBS Setup Wizard.
 *
 * Endpoints (both scopes — auto-detected from the caller's first argument):
 *
 *   GET  /broadcasts/{id}/setup-wizard/config
 *   POST /broadcasts/{id}/setup-wizard/event
 *   POST /broadcasts/{id}/setup-wizard/finish     ← auto-go-live
 *
 *   GET  /tournaments/{id}/setup-wizard/config
 *   POST /tournaments/{id}/setup-wizard/event
 *
 * Credential fetching delegates to the existing rate-limited endpoint
 * `GET /broadcasts/{id}/credentials` (handled by LiveBroadcastService).
 *
 * @file  obs-wizard.service.ts
 */
@Injectable({ providedIn: 'root' })
export class ObsWizardService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  /**
   * Fetch wizard configuration for the given scope.
   *
   * @param scope   Either `'broadcast'` or `'tournament'`
   * @param id      Broadcast UUID or Tournament UUID
   */
  getConfig(scope: WizardScope, id: string): Observable<WizardConfig> {
    const url = scope === 'broadcast'
      ? `${this.base}/broadcasts/${id}/setup-wizard/config`
      : `${this.base}/tournaments/${id}/setup-wizard/config`;
    return this.http.get<ApiEnvelope<WizardConfig>>(url)
      .pipe(map(r => r.data), catchError(this.handleError));
  }

  /**
   * Record an analytics event. Failures are swallowed — analytics never
   * blocks the UI — but logged to the console.
   */
  logEvent(
    scope: WizardScope,
    id: string,
    event: WizardEvent,
    opts: { stepNumber?: number; platform?: ClientPlatform; metadata?: Record<string, unknown> } = {},
  ): Observable<void> {
    const payload: LogEventPayload = {
      event,
      step_number: opts.stepNumber ?? null,
      platform:    opts.platform   ?? null,
      metadata:    opts.metadata   ?? null,
    };
    const url = scope === 'broadcast'
      ? `${this.base}/broadcasts/${id}/setup-wizard/event`
      : `${this.base}/tournaments/${id}/setup-wizard/event`;

    return this.http.post<ApiEnvelope<unknown>>(url, payload).pipe(
      map(() => void 0),
      catchError((err: HttpErrorResponse) => {
        // eslint-disable-next-line no-console
        console.warn('[ObsWizardService] logEvent failed', err.status, err.message);
        return of(void 0);
      }),
    );
  }

  /**
   * Auto-Go-Live: transitions the broadcast to LIVE and records the
   * `wizard_completed` event server-side in one round-trip.
   */
  finish(broadcastId: string): Observable<LiveBroadcast> {
    return this.http
      .post<ApiEnvelope<LiveBroadcast>>(`${this.base}/broadcasts/${broadcastId}/setup-wizard/finish`, {})
      .pipe(map(r => r.data), catchError(this.handleError));
  }

  /**
   * Helper — fetch credentials via the existing rate-limited endpoint.
   * Wizard component uses this on Step 2 ("Get credentials").
   */
  getCredentials(broadcastId: string): Observable<BroadcastCredentials> {
    return this.http
      .get<ApiEnvelope<BroadcastCredentials>>(`${this.base}/broadcasts/${broadcastId}/credentials`)
      .pipe(map(r => r.data), catchError(this.handleError));
  }

  /**
   * Detect client OS from `navigator.userAgent`.
   */
  detectPlatform(): ClientPlatform {
    if (typeof navigator === 'undefined') { return 'unknown'; }
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('windows'))                              { return 'windows'; }
    if (ua.includes('mac os') || ua.includes('macintosh'))   { return 'macos';   }
    if (ua.includes('linux')  || ua.includes('x11'))         { return 'linux';   }
    return 'unknown';
  }

  /**
   * Map HTTP errors to human-readable messages, mirroring the
   * StreamingException codes returned by LiveBroadcastController.
   */
  private handleError(err: HttpErrorResponse): Observable<never> {
    const errObj = (err.error as { error?: { code?: string; message?: string }; message?: string } | null);
    const apiMsg = errObj?.error?.message ?? errObj?.message;
    const code   = errObj?.error?.code;

    const message =
      err.status === 0   ? 'Could not reach Dawri. Check your connection.' :
      err.status === 401 ? 'You are not authenticated. Please sign in again.' :
      err.status === 403 ? (apiMsg ?? 'You are not allowed to use this wizard.') :
      err.status === 404 ? (code === 'broadcast_not_found' ? 'Broadcast no longer exists.' : 'Not found.') :
      err.status === 410 ? 'This broadcast has already ended.' :
      err.status === 422 ? (apiMsg ?? 'Invalid wizard request.') :
      err.status === 429 ? 'Too many requests — please wait a minute and try again.' :
                           (apiMsg ?? 'Unexpected server error. Try again.');
    return throwError(() => new Error(message));
  }
}
