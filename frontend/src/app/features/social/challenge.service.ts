import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChallengeUser {
  id: string;
  name: string;
  nickname: string | null;
  display_name: string;
  avatar_url: string | null;
}

export type ChallengeStatus = 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed';

export interface ChallengeTeam {
  id: string; name: string; slug: string; tag: string | null; logo_url: string | null;
}
export interface Challenge {
  id: string;
  kind?: 'player' | 'team';
  game: string;
  game_label: string;
  message: string | null;
  status: ChallengeStatus;
  scheduled_at: string | null;
  i_am_challenger: boolean;
  opponent: ChallengeUser | null;
  challenger: ChallengeUser | null;
  challenger_team?: ChallengeTeam | null;
  opponent_team?: ChallengeTeam | null;
  my_score: number | null;
  their_score: number | null;
  challenger_score: number | null;
  opponent_score: number | null;
  winner_id: string | null;
  winner_team_id?: string | null;
  i_won: boolean | null;
  result_reported: boolean;
  i_reported: boolean;
  can_confirm: boolean;
  created_at: string;
}

export const CHALLENGE_GAMES = [
  { value: 'ea_fc25',     label: 'EA FC 25' },
  { value: 'pubg_mobile', label: 'PUBG Mobile' },
  { value: 'cod_mobile',  label: 'Call of Duty Mobile' },
];

/**
 * ChallengeService — friendly 1v1 challenges between friends.
 */
@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private http = inject(HttpClient);
  private base = environment.apiUrl + '/challenges';

  readonly incoming = signal<Challenge[]>([]);
  readonly sent     = signal<Challenge[]>([]);
  readonly active   = signal<Challenge[]>([]);
  readonly history  = signal<Challenge[]>([]);
  readonly loading  = signal(false);
  readonly loaded   = signal(false);

  /** Things needing my attention: incoming requests + results to confirm. */
  readonly alertCount = computed(() =>
    this.incoming().length + this.active().filter(c => c.can_confirm).length);

  load(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.http.get<{ incoming: Challenge[]; sent: Challenge[]; active: Challenge[]; history: Challenge[] }>(this.base)
      .subscribe({
        next: (r) => {
          this.incoming.set(r.incoming ?? []);
          this.sent.set(r.sent ?? []);
          this.active.set(r.active ?? []);
          this.history.set(r.history ?? []);
          this.loading.set(false);
          this.loaded.set(true);
        },
        error: () => { this.loading.set(false); this.loaded.set(true); },
      });
  }

  create(opponentId: string, game: string, message?: string, scheduledAt?: string): Observable<{ data: Challenge }> {
    return this.http.post<{ data: Challenge }>(this.base, {
      opponent_id: opponentId, game, message: message || null, scheduled_at: scheduledAt || null,
    }).pipe(tap(() => this.load()));
  }

  /** Team vs team challenge — caller must be captain/owner of challenger team. */
  createTeam(challengerTeamId: string, opponentTeamId: string, game: string, message?: string, scheduledAt?: string): Observable<{ data: Challenge }> {
    return this.http.post<{ data: Challenge }>(this.base, {
      challenger_team_id: challengerTeamId,
      opponent_team_id: opponentTeamId,
      game, message: message || null, scheduled_at: scheduledAt || null,
    }).pipe(tap(() => this.load()));
  }

  reportTeamResult(c: Challenge, challengerScore: number, opponentScore: number, winnerTeamId: string): Observable<unknown> {
    return this.http.post(`${this.base}/${c.id}/result`, {
      challenger_score: challengerScore, opponent_score: opponentScore, winner_team_id: winnerTeamId,
    }).pipe(tap(() => this.load()));
  }

  accept(c: Challenge):  Observable<unknown> { return this.act(c, 'accept'); }
  decline(c: Challenge): Observable<unknown> { return this.act(c, 'decline'); }
  cancel(c: Challenge):  Observable<unknown> { return this.act(c, 'cancel'); }
  confirm(c: Challenge): Observable<unknown> { return this.act(c, 'confirm'); }

  reportResult(c: Challenge, challengerScore: number, opponentScore: number, winnerId: string): Observable<unknown> {
    return this.http.post(`${this.base}/${c.id}/result`, {
      challenger_score: challengerScore, opponent_score: opponentScore, winner_id: winnerId,
    }).pipe(tap(() => this.load()));
  }

  private act(c: Challenge, action: string): Observable<unknown> {
    return this.http.post(`${this.base}/${c.id}/${action}`, {}).pipe(tap(() => this.load()));
  }
}
