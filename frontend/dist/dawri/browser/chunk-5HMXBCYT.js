import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  HttpClient,
  HttpParams,
  computed,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/features/teams/team.service.ts
var TeamService = class _TeamService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl;
    this.myTeams = signal([]);
    this.invites = signal([]);
    this.loadedMine = signal(false);
    this.alertCount = computed(() => this.invites().length);
  }
  loadMine() {
    this.http.get(`${this.base}/me/teams`).subscribe({
      next: (r) => {
        this.myTeams.set(r.data ?? []);
        this.loadedMine.set(true);
      },
      error: () => this.loadedMine.set(true)
    });
    this.http.get(`${this.base}/me/team-invites`).subscribe({
      next: (r) => this.invites.set(r.data ?? []),
      error: () => {
      }
    });
  }
  browse(filters) {
    let params = new HttpParams();
    if (filters.game)
      params = params.set("game", filters.game);
    if (filters.q)
      params = params.set("q", filters.q);
    if (filters.recruiting)
      params = params.set("recruiting", "1");
    return this.http.get(`${this.base}/teams`, { params });
  }
  show(idOrSlug) {
    return this.http.get(`${this.base}/teams/${idOrSlug}`);
  }
  create(payload) {
    return this.http.post(`${this.base}/teams`, payload).pipe(tap(() => this.loadMine()));
  }
  update(teamId, payload) {
    return this.http.patch(`${this.base}/teams/${teamId}`, payload);
  }
  destroy(teamId) {
    return this.http.delete(`${this.base}/teams/${teamId}`).pipe(tap(() => this.loadMine()));
  }
  invite(teamId, userId) {
    return this.http.post(`${this.base}/teams/${teamId}/invites`, { user_id: userId });
  }
  leave(teamId) {
    return this.http.post(`${this.base}/teams/${teamId}/leave`, {}).pipe(tap(() => this.loadMine()));
  }
  kick(teamId, userId) {
    return this.http.delete(`${this.base}/teams/${teamId}/members/${userId}`);
  }
  promote(teamId, userId) {
    return this.http.post(`${this.base}/teams/${teamId}/members/${userId}/promote`, {});
  }
  demote(teamId, userId) {
    return this.http.post(`${this.base}/teams/${teamId}/members/${userId}/demote`, {});
  }
  acceptInvite(id) {
    return this.http.post(`${this.base}/team-invites/${id}/accept`, {}).pipe(tap(() => this.loadMine()));
  }
  declineInvite(id) {
    return this.http.post(`${this.base}/team-invites/${id}/decline`, {}).pipe(tap(() => this.loadMine()));
  }
  static {
    this.\u0275fac = function TeamService_Factory(t) {
      return new (t || _TeamService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TeamService, factory: _TeamService.\u0275fac, providedIn: "root" });
  }
};

export {
  TeamService
};
//# sourceMappingURL=chunk-5HMXBCYT.js.map
