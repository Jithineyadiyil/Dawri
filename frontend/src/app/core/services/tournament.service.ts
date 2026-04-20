import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tournament, Bracket } from '../../shared/models/tournament.model';

export interface TournamentFilters {
  game?: string;
  format?: string;
  open_only?: boolean;
  search?: string;
}

export interface CreateTournamentPayload {
  name: string;
  name_ar?: string;
  game: string;
  format: string;
  max_participants: number;
  swiss_rounds?: number;
  registration_closes_at: string;
  starts_at: string;
  timezone?: string;
  is_public?: boolean;
  prize_pool?: Array<{ position: number; reward: string }>;
}

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  /** Fetch all public tournaments with optional filters. */
  getAll(filters: TournamentFilters = {}): Observable<Tournament[]> {
    let params = new HttpParams();
    if (filters.game)      params = params.set('game',      filters.game);
    if (filters.format)    params = params.set('format',    filters.format);
    if (filters.open_only) params = params.set('open_only', 'true');
    if (filters.search)    params = params.set('search',    filters.search);
    return this.http.get<{ data: Tournament[] }>(`${this.base}/tournaments`, { params })
      .pipe(map(r => r.data ?? []));
  }

  /** Fetch a single tournament with full bracket data. */
  getById(id: string): Observable<Tournament> {
    return this.http.get<{ data: Tournament }>(`${this.base}/tournaments/${id}`)
      .pipe(map(r => r.data));
  }

  /** Create a new tournament (organizers only). */
  create(payload: CreateTournamentPayload): Observable<Tournament> {
    return this.http.post<{ data: Tournament }>(`${this.base}/tournaments`, payload)
      .pipe(map(r => r.data));
  }

  /** Register authenticated player for a tournament. */
  register(id: string): Observable<Tournament> {
    return this.http.post<{ data: Tournament }>(`${this.base}/tournaments/${id}/register`, {})
      .pipe(map(r => r.data));
  }

  /** Generate the bracket (organizer only). */
  generateBracket(id: string): Observable<Bracket> {
    return this.http.post<{ data: Bracket }>(`${this.base}/tournaments/${id}/bracket`, {})
      .pipe(map(r => r.data));
  }

  /** Fetch tournament leaderboard. */
  getLeaderboard(id: string): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.base}/tournaments/${id}/leaderboard`)
      .pipe(map(r => r.data ?? []));
  }

  /** Submit a match result. */
  submitResult(matchId: string, form: FormData): Observable<any> {
    return this.http.post<{ data: any }>(`${this.base}/matches/${matchId}/result`, form)
      .pipe(map(r => r.data));
  }

  /** Confirm a match result. */
  confirmResult(matchId: string): Observable<any> {
    return this.http.post<{ data: any }>(`${this.base}/matches/${matchId}/confirm`, {})
      .pipe(map(r => r.data));
  }

  /** Dispute a match result. */
  disputeResult(matchId: string, reason: string): Observable<any> {
    return this.http.post<{ data: any }>(`${this.base}/matches/${matchId}/dispute`, { reason })
      .pipe(map(r => r.data));
  }

  /** Moderator override for a match. */
  moderatorOverride(matchId: string, winnerId: string, reason: string): Observable<any> {
    return this.http.post<{ data: any }>(`${this.base}/matches/${matchId}/moderator-override`, {
      winner_participant_id: winnerId,
      reason,
    }).pipe(map(r => r.data));
  }
}
