import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export type TeamRole = 'owner' | 'captain' | 'member';

export interface TeamUser {
  id: string;
  name: string;
  nickname: string | null;
  display_name: string;
  avatar_url: string | null;
}

export interface TeamSummary {
  id: string;
  name: string;
  slug: string;
  tag: string | null;
  logo_url: string | null;
  region: string | null;
  game: string;
  is_active: boolean;
  is_recruiting: boolean;
  member_count: number;
  owner: TeamUser | null;
  created_at: string;
  my_role?: TeamRole | null;
}

export interface TeamMemberRow {
  id: string;
  user: TeamUser;
  role: TeamRole;
  jersey_number: string | null;
  joined_at: string;
}

export interface TeamDetail extends TeamSummary {
  description: string | null;
  members: TeamMemberRow[];
  my_role: TeamRole | null;
  i_am_owner: boolean;
}

export interface TeamInvite {
  id: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  created_at: string;
  team: { id: string; name: string; tag: string | null; logo_url: string | null; game: string } | null;
  inviter: TeamUser | null;
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  readonly myTeams = signal<TeamSummary[]>([]);
  readonly invites = signal<TeamInvite[]>([]);
  readonly loadedMine = signal(false);

  /** Combined badge count for nav / Connect+. */
  readonly alertCount = computed(() => this.invites().length);

  loadMine(): void {
    this.http.get<{ data: TeamSummary[] }>(`${this.base}/me/teams`).subscribe({
      next: (r) => { this.myTeams.set(r.data ?? []); this.loadedMine.set(true); },
      error: () => this.loadedMine.set(true),
    });
    this.http.get<{ data: TeamInvite[] }>(`${this.base}/me/team-invites`).subscribe({
      next: (r) => this.invites.set(r.data ?? []),
      error: () => {},
    });
  }

  browse(filters: { game?: string | null; q?: string | null; recruiting?: boolean }): Observable<{ data: TeamSummary[] }> {
    let params = new HttpParams();
    if (filters.game)        params = params.set('game', filters.game);
    if (filters.q)           params = params.set('q', filters.q);
    if (filters.recruiting)  params = params.set('recruiting', '1');
    return this.http.get<{ data: TeamSummary[] }>(`${this.base}/teams`, { params });
  }

  show(idOrSlug: string): Observable<{ data: TeamDetail }> {
    return this.http.get<{ data: TeamDetail }>(`${this.base}/teams/${idOrSlug}`);
  }

  create(payload: { name: string; tag?: string | null; game: string; region?: string | null; description?: string | null; logo_url?: string | null }): Observable<{ data: TeamSummary }> {
    return this.http.post<{ data: TeamSummary }>(`${this.base}/teams`, payload).pipe(tap(() => this.loadMine()));
  }
  update(teamId: string, payload: Partial<TeamSummary> & { description?: string | null }): Observable<{ data: TeamSummary }> {
    return this.http.patch<{ data: TeamSummary }>(`${this.base}/teams/${teamId}`, payload);
  }
  destroy(teamId: string): Observable<unknown> {
    return this.http.delete(`${this.base}/teams/${teamId}`).pipe(tap(() => this.loadMine()));
  }

  invite(teamId: string, userId: string): Observable<unknown>     { return this.http.post(`${this.base}/teams/${teamId}/invites`, { user_id: userId }); }
  leave(teamId: string): Observable<unknown>                       { return this.http.post(`${this.base}/teams/${teamId}/leave`, {}).pipe(tap(() => this.loadMine())); }
  kick(teamId: string, userId: string): Observable<unknown>        { return this.http.delete(`${this.base}/teams/${teamId}/members/${userId}`); }
  promote(teamId: string, userId: string): Observable<unknown>     { return this.http.post(`${this.base}/teams/${teamId}/members/${userId}/promote`, {}); }
  demote(teamId: string, userId: string): Observable<unknown>      { return this.http.post(`${this.base}/teams/${teamId}/members/${userId}/demote`, {}); }

  acceptInvite(id: string): Observable<unknown>  { return this.http.post(`${this.base}/team-invites/${id}/accept`, {}).pipe(tap(() => this.loadMine())); }
  declineInvite(id: string): Observable<unknown> { return this.http.post(`${this.base}/team-invites/${id}/decline`, {}).pipe(tap(() => this.loadMine())); }
}
