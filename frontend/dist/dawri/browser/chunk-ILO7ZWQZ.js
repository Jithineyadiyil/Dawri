import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  HttpClient,
  computed,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/features/social/challenge.service.ts
var CHALLENGE_GAMES = [
  { value: "ea_fc25", label: "EA FC 25" },
  { value: "pubg_mobile", label: "PUBG Mobile" },
  { value: "cod_mobile", label: "Call of Duty Mobile" }
];
var ChallengeService = class _ChallengeService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl + "/challenges";
    this.incoming = signal([]);
    this.sent = signal([]);
    this.active = signal([]);
    this.history = signal([]);
    this.loading = signal(false);
    this.loaded = signal(false);
    this.alertCount = computed(() => this.incoming().length + this.active().filter((c) => c.can_confirm).length);
  }
  load() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.http.get(this.base).subscribe({
      next: (r) => {
        this.incoming.set(r.incoming ?? []);
        this.sent.set(r.sent ?? []);
        this.active.set(r.active ?? []);
        this.history.set(r.history ?? []);
        this.loading.set(false);
        this.loaded.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.loaded.set(true);
      }
    });
  }
  create(opponentId, game, message, scheduledAt) {
    return this.http.post(this.base, {
      opponent_id: opponentId,
      game,
      message: message || null,
      scheduled_at: scheduledAt || null
    }).pipe(tap(() => this.load()));
  }
  /** Team vs team challenge — caller must be captain/owner of challenger team. */
  createTeam(challengerTeamId, opponentTeamId, game, message, scheduledAt) {
    return this.http.post(this.base, {
      challenger_team_id: challengerTeamId,
      opponent_team_id: opponentTeamId,
      game,
      message: message || null,
      scheduled_at: scheduledAt || null
    }).pipe(tap(() => this.load()));
  }
  reportTeamResult(c, challengerScore, opponentScore, winnerTeamId) {
    return this.http.post(`${this.base}/${c.id}/result`, {
      challenger_score: challengerScore,
      opponent_score: opponentScore,
      winner_team_id: winnerTeamId
    }).pipe(tap(() => this.load()));
  }
  accept(c) {
    return this.act(c, "accept");
  }
  decline(c) {
    return this.act(c, "decline");
  }
  cancel(c) {
    return this.act(c, "cancel");
  }
  confirm(c) {
    return this.act(c, "confirm");
  }
  reportResult(c, challengerScore, opponentScore, winnerId) {
    return this.http.post(`${this.base}/${c.id}/result`, {
      challenger_score: challengerScore,
      opponent_score: opponentScore,
      winner_id: winnerId
    }).pipe(tap(() => this.load()));
  }
  act(c, action) {
    return this.http.post(`${this.base}/${c.id}/${action}`, {}).pipe(tap(() => this.load()));
  }
  static {
    this.\u0275fac = function ChallengeService_Factory(t) {
      return new (t || _ChallengeService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChallengeService, factory: _ChallengeService.\u0275fac, providedIn: "root" });
  }
};

export {
  CHALLENGE_GAMES,
  ChallengeService
};
//# sourceMappingURL=chunk-ILO7ZWQZ.js.map
