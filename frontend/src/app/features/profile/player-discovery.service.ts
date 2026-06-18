import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DiscoveryRow {
  user: {
    id: string;
    name: string;
    nickname: string | null;
    display_name: string;
    avatar_url: string | null;
    country: string | null;
    city: string | null;
  };
  presence: 'online' | 'idle' | 'offline';
  matches_played: number;
  wins: number;
  losses: number;
  win_rate: number;
  tournaments_won: number;
  top_game: string | null;
}

export interface DiscoveryFilters {
  game?: string | null;
  country?: string | null;
  q?: string | null;
  available?: boolean;
  min_wins?: number | null;
  sort?: 'wins' | 'win_rate' | 'recent';
}

@Injectable({ providedIn: 'root' })
export class PlayerDiscoveryService {
  private http = inject(HttpClient);
  private base = environment.apiUrl + '/players';

  search(filters: DiscoveryFilters): Observable<{ data: DiscoveryRow[]; meta: { count: number } }> {
    let params = new HttpParams();
    if (filters.game)      params = params.set('game', filters.game);
    if (filters.country)   params = params.set('country', filters.country);
    if (filters.q)         params = params.set('q', filters.q);
    if (filters.available) params = params.set('available', '1');
    if (filters.min_wins != null) params = params.set('min_wins', String(filters.min_wins));
    if (filters.sort)      params = params.set('sort', filters.sort);
    return this.http.get<{ data: DiscoveryRow[]; meta: { count: number } }>(this.base, { params });
  }
}
