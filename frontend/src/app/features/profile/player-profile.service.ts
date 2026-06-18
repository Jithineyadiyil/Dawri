import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProfileUser {
  id: string;
  name: string;
  nickname: string | null;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  role: string;
  organization: string | null;
  created_at: string;
}

export interface GamingIds {
  psn_id: string | null;
  xbox_gamertag: string | null;
  steam_id: string | null;
  riot_id: string | null;
  epic_id: string | null;
  pubg_id: string | null;
  cod_id: string | null;
}

export interface ProfilePresence {
  status: 'online' | 'idle' | 'offline';
  last_seen_at: string | null;
}

export interface ProfileTotals {
  matches_played: number;
  wins: number;
  losses: number;
  win_rate: number;
  tournaments_played: number;
  tournaments_won: number;
  mvp_count: number;
}

export interface ProfileGameStat {
  game: string;
  matches_played: number;
  wins: number;
  losses: number;
  draws: number;
  win_rate: number;
  tournaments_played: number;
  tournaments_won: number;
  mvp_count: number;
  current_win_streak: number;
  best_win_streak: number;
  last_match_at: string | null;
}

export interface FullProfile {
  user: ProfileUser;
  gaming_ids: GamingIds;
  presence: ProfilePresence;
  totals: ProfileTotals;
  games: ProfileGameStat[];
}

@Injectable({ providedIn: 'root' })
export class PlayerProfileService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  show(userId: string): Observable<{ data: FullProfile }> {
    return this.http.get<{ data: FullProfile }>(`${this.base}/players/${userId}/full`);
  }

  me(): Observable<{ data: FullProfile }> {
    return this.http.get<{ data: FullProfile }>(`${this.base}/me/profile`);
  }

  updateGamingIds(ids: Partial<GamingIds>): Observable<{ data: FullProfile }> {
    return this.http.patch<{ data: FullProfile }>(`${this.base}/me/gaming-ids`, ids);
  }
}

export const GAME_LABELS: Record<string, string> = {
  ea_fc25:      'EA FC 25',
  pubg_mobile:  'PUBG Mobile',
  cod_mobile:   'Call of Duty Mobile',
  valorant:     'Valorant',
  fortnite:     'Fortnite',
  tekken:       'Tekken',
  rocket_league:'Rocket League',
  dota2:        'Dota 2',
  league_of_legends: 'League of Legends',
  counter_strike:    'Counter-Strike',
};
