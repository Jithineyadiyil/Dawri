import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  HttpClient,
  inject,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/features/profile/player-profile.service.ts
var PlayerProfileService = class _PlayerProfileService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  show(userId) {
    return this.http.get(`${this.base}/players/${userId}/full`);
  }
  me() {
    return this.http.get(`${this.base}/me/profile`);
  }
  updateGamingIds(ids) {
    return this.http.patch(`${this.base}/me/gaming-ids`, ids);
  }
  static {
    this.\u0275fac = function PlayerProfileService_Factory(t) {
      return new (t || _PlayerProfileService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlayerProfileService, factory: _PlayerProfileService.\u0275fac, providedIn: "root" });
  }
};
var GAME_LABELS = {
  ea_fc25: "EA FC 25",
  pubg_mobile: "PUBG Mobile",
  cod_mobile: "Call of Duty Mobile",
  valorant: "Valorant",
  fortnite: "Fortnite",
  tekken: "Tekken",
  rocket_league: "Rocket League",
  dota2: "Dota 2",
  league_of_legends: "League of Legends",
  counter_strike: "Counter-Strike"
};

export {
  PlayerProfileService,
  GAME_LABELS
};
//# sourceMappingURL=chunk-7NGWYCOU.js.map
