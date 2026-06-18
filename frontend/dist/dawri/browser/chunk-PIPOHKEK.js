import {
  GAME_LABELS
} from "./chunk-7NGWYCOU.js";
import {
  ChallengeUiService
} from "./chunk-WWXU4OML.js";
import {
  FriendService
} from "./chunk-H4EFRF6P.js";
import {
  DmService
} from "./chunk-5L7FNWZJ.js";
import "./chunk-QBAOKTDJ.js";
import "./chunk-GFWMVHEB.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import "./chunk-EVGLZ2AV.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  Router,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  HttpClient,
  HttpParams,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/profile/player-discovery.service.ts
var PlayerDiscoveryService = class _PlayerDiscoveryService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl + "/players";
  }
  search(filters) {
    let params = new HttpParams();
    if (filters.game)
      params = params.set("game", filters.game);
    if (filters.country)
      params = params.set("country", filters.country);
    if (filters.q)
      params = params.set("q", filters.q);
    if (filters.available)
      params = params.set("available", "1");
    if (filters.min_wins != null)
      params = params.set("min_wins", String(filters.min_wins));
    if (filters.sort)
      params = params.set("sort", filters.sort);
    return this.http.get(this.base, { params });
  }
  static {
    this.\u0275fac = function PlayerDiscoveryService_Factory(t) {
      return new (t || _PlayerDiscoveryService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlayerDiscoveryService, factory: _PlayerDiscoveryService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/profile/player-discovery-page.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.user.id;
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _c1 = (a0) => ["/players", a0];
function PlayerDiscoveryPageComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function PlayerDiscoveryPageComponent_For_17_Template_button_click_0_listener() {
      const g_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setGame(g_r2.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.game() === g_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r2.label);
  }
}
function PlayerDiscoveryPageComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " players");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.resultCount());
  }
}
function PlayerDiscoveryPageComponent_Conditional_33_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 24);
  }
}
function PlayerDiscoveryPageComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275repeaterCreate(1, PlayerDiscoveryPageComponent_Conditional_33_For_2_Template, 1, 0, "div", 24, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function PlayerDiscoveryPageComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "h3");
    \u0275\u0275text(2, "No players match");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Try a different game, clear the online filter, or broaden the search.");
    \u0275\u0275elementEnd()();
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", r_r4.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", r_r4.user.display_name);
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((r_r4.user.display_name || "?").charAt(0));
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate("@" + r_r4.user.nickname);
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", r_r4.user.city, "", r_r4.user.city && r_r4.user.country ? ", " : "", "", r_r4.user.country, "");
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", r_r4.tournaments_won, " \u{1F3C6}");
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.addFriend(r_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 41);
    \u0275\u0275element(2, "path", 42)(3, "circle", 43)(4, "line", 44)(5, "line", 45);
    \u0275\u0275elementEnd()();
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1, "\xB7\xB7\xB7");
    \u0275\u0275elementEnd();
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.acceptFriend(r_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 48);
    \u0275\u0275element(2, "polyline", 49);
    \u0275\u0275elementEnd()();
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.message(r_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 41);
    \u0275\u0275element(2, "path", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "button", 52);
    \u0275\u0275listener("click", function PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_27_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.challenge(r_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 41);
    \u0275\u0275element(5, "path", 53)(6, "path", 54)(7, "path", 55)(8, "path", 56)(9, "path", 57)(10, "path", 58);
    \u0275\u0275elementEnd()();
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 26)(1, "a", 27)(2, "span", 28);
    \u0275\u0275element(3, "span", 29);
    \u0275\u0275template(4, PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_4_Template, 1, 2, "img", 30)(5, PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_5_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 31)(7, "div", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_9_Template, 2, 1, "div", 33)(10, PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_10_Template, 2, 3, "div", 34);
    \u0275\u0275elementStart(11, "div", 35)(12, "span", 36)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, "W");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 36)(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 36);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, PlayerDiscoveryPageComponent_Conditional_35_For_2_Conditional_22_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 38);
    \u0275\u0275template(24, PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_24_Template, 6, 0)(25, PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_25_Template, 2, 0)(26, PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_26_Template, 3, 0)(27, PlayerDiscoveryPageComponent_Conditional_35_For_2_Case_27_Template, 11, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_22_0;
    const r_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c1, r_r4.user.id));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("pd-dot--" + r_r4.presence);
    \u0275\u0275property("title", r_r4.presence);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, r_r4.user.avatar_url ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r4.user.display_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, r_r4.user.nickname ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, r_r4.user.city || r_r4.user.country ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r4.wins);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r4.matches_played);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", r_r4.win_rate, "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(22, r_r4.tournaments_won > 0 ? 22 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(24, (tmp_22_0 = ctx_r2.friends.relationshipWith(r_r4.user.id)) === "none" ? 24 : tmp_22_0 === "pending_outgoing" ? 25 : tmp_22_0 === "pending_incoming" ? 26 : tmp_22_0 === "friends" ? 27 : -1);
  }
}
function PlayerDiscoveryPageComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275repeaterCreate(1, PlayerDiscoveryPageComponent_Conditional_35_For_2_Template, 28, 15, "article", 26, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.rows());
  }
}
var PlayerDiscoveryPageComponent = class _PlayerDiscoveryPageComponent {
  constructor() {
    this.api = inject(PlayerDiscoveryService);
    this.friends = inject(FriendService);
    this.dm = inject(DmService);
    this.challengeUi = inject(ChallengeUiService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.games = Object.entries(GAME_LABELS).map(([value, label]) => ({ value, label }));
    this.q = signal("");
    this.game = signal(null);
    this.onlineOnly = signal(false);
    this.sort = signal("wins");
    this.rows = signal([]);
    this.resultCount = signal(null);
    this.loading = signal(false);
    this.searchTimer = null;
  }
  ngOnInit() {
    if (!this.friends.loaded())
      this.friends.load();
    this.refresh(true);
  }
  setGame(g) {
    this.game.set(g);
    this.refresh(true);
  }
  /** Debounced search. Pass `immediate` to skip the debounce (chip click). */
  refresh(immediate = false) {
    if (this.searchTimer)
      clearTimeout(this.searchTimer);
    const run = () => {
      this.loading.set(true);
      this.api.search({
        q: this.q().trim() || null,
        game: this.game(),
        available: this.onlineOnly(),
        sort: this.sort()
      }).subscribe({
        next: (r) => {
          this.rows.set(r.data);
          this.resultCount.set(r.meta.count);
          this.loading.set(false);
        },
        error: () => {
          this.rows.set([]);
          this.resultCount.set(0);
          this.loading.set(false);
        }
      });
    };
    if (immediate)
      run();
    else
      this.searchTimer = setTimeout(run, 280);
  }
  addFriend(r) {
    this.friends.sendRequest({ id: r.user.id, name: r.user.name, nickname: r.user.nickname, display_name: r.user.display_name, avatar_url: r.user.avatar_url }).subscribe({
      next: () => this.toast.success(`Friend request sent to ${r.user.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not send request.")
    });
  }
  acceptFriend(r) {
    const req = this.friends.requests().find((x) => x.user.id === r.user.id);
    if (!req)
      return;
    this.friends.accept(req).subscribe({
      next: () => this.toast.success(`You and ${r.user.display_name} are now friends.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Failed.")
    });
  }
  message(r) {
    this.dm.openWith({ id: r.user.id, name: r.user.name, nickname: r.user.nickname, display_name: r.user.display_name, avatar_url: r.user.avatar_url }).subscribe({
      next: () => this.router.navigate(["/community/home"], { queryParams: { pane: "messages" } }),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not open chat.")
    });
  }
  challenge(r) {
    this.challengeUi.open({ id: r.user.id, name: r.user.name, nickname: r.user.nickname, display_name: r.user.display_name, avatar_url: r.user.avatar_url });
  }
  static {
    this.\u0275fac = function PlayerDiscoveryPageComponent_Factory(t) {
      return new (t || _PlayerDiscoveryPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlayerDiscoveryPageComponent, selectors: [["app-player-discovery-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 36, vars: 7, consts: [[1, "pd-shell"], [1, "pd-head"], [1, "pd-eyebrow"], [1, "pd-title"], [1, "pd-filters"], [1, "pd-search"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "text", "placeholder", "Search by name or nickname", 3, "ngModelChange", "ngModel"], [1, "pd-chips"], [1, "pd-chip", 3, "click"], [1, "pd-chip", 3, "active"], [1, "pd-row"], [1, "pd-online"], ["type", "checkbox", 3, "change", "checked"], [1, "pd-sort"], [1, "pd-l"], [3, "ngModelChange", "ngModel"], ["value", "wins"], ["value", "win_rate"], ["value", "recent"], [1, "pd-count"], [1, "pd-grid"], [1, "pd-skel"], [1, "pd-empty"], [1, "pd-card"], [1, "pd-card__main", 3, "routerLink"], [1, "pd-ava"], [1, "pd-dot", 3, "title"], [3, "src", "alt"], [1, "pd-id"], [1, "pd-name"], [1, "pd-nick"], [1, "pd-loc"], [1, "pd-stats"], [1, "pd-stat"], [1, "pd-stat", "pd-stat--gold"], [1, "pd-actions"], [1, "pd-ava-letter"], ["title", "Add friend", 1, "pd-icon", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["x1", "19", "y1", "8", "x2", "19", "y2", "14"], ["x1", "22", "y1", "11", "x2", "16", "y2", "11"], ["title", "Request sent", 1, "pd-icon", "pd-icon--pending"], ["title", "Accept friend request", 1, "pd-icon", "pd-icon--accept", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["title", "Message", 1, "pd-icon", "pd-icon--msg", 3, "click"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], ["title", "Challenge", 1, "pd-icon", "pd-icon--challenge", 3, "click"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"]], template: function PlayerDiscoveryPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Discover");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Players");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 6);
        \u0275\u0275element(10, "circle", 7)(11, "path", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "input", 9);
        \u0275\u0275listener("ngModelChange", function PlayerDiscoveryPageComponent_Template_input_ngModelChange_12_listener($event) {
          ctx.q.set($event);
          return ctx.refresh();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 10)(14, "button", 11);
        \u0275\u0275listener("click", function PlayerDiscoveryPageComponent_Template_button_click_14_listener() {
          return ctx.setGame(null);
        });
        \u0275\u0275text(15, "All games");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(16, PlayerDiscoveryPageComponent_For_17_Template, 2, 3, "button", 12, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 13)(19, "label", 14)(20, "input", 15);
        \u0275\u0275listener("change", function PlayerDiscoveryPageComponent_Template_input_change_20_listener() {
          ctx.onlineOnly.set(!ctx.onlineOnly());
          return ctx.refresh();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " Online only ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 16)(23, "span", 17);
        \u0275\u0275text(24, "Sort");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "select", 18);
        \u0275\u0275listener("ngModelChange", function PlayerDiscoveryPageComponent_Template_select_ngModelChange_25_listener($event) {
          ctx.sort.set($event);
          return ctx.refresh();
        });
        \u0275\u0275elementStart(26, "option", 19);
        \u0275\u0275text(27, "Most wins");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "option", 20);
        \u0275\u0275text(29, "Best win rate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "option", 21);
        \u0275\u0275text(31, "Most active");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(32, PlayerDiscoveryPageComponent_Conditional_32_Template, 4, 1, "span", 22);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(33, PlayerDiscoveryPageComponent_Conditional_33_Template, 3, 1, "div", 23)(34, PlayerDiscoveryPageComponent_Conditional_34_Template, 5, 0)(35, PlayerDiscoveryPageComponent_Conditional_35_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("ngModel", ctx.q());
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", !ctx.game());
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.games);
        \u0275\u0275advance(4);
        \u0275\u0275property("checked", ctx.onlineOnly());
        \u0275\u0275advance(5);
        \u0275\u0275property("ngModel", ctx.sort());
        \u0275\u0275advance(7);
        \u0275\u0275conditional(32, ctx.resultCount() != null ? 32 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(33, ctx.loading() ? 33 : ctx.rows().length === 0 ? 34 : 35);
      }
    }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.pd-shell[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n}\n.pd-head[_ngcontent-%COMP%] {\n  margin-bottom: 1.1rem;\n}\n.pd-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.pd-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.pd-filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 18px;\n}\n.pd-search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 13px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 10px;\n  svg {\n    color: var(--mu, #8a8aa0);\n    flex-shrink: 0;\n  }\n  input {\n    flex: 1;\n    background: transparent;\n    border: none;\n    outline: none;\n    color: var(--text);\n    font-size: 14px;\n    font-family: var(--fb, sans-serif);\n    &::placeholder {\n      color: var(--mu, #8a8aa0);\n    }\n  }\n}\n.pd-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.pd-chip[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 12.5px;\n  font-weight: 600;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  color: var(--mu, #8a8aa0);\n  transition:\n    color .15s,\n    border-color .15s,\n    background .15s;\n  &:hover {\n    color: var(--text);\n    border-color: var(--br2, rgba(255,255,255,.14));\n  }\n  &.active {\n    color: #4ade80;\n    border-color: var(--primary, #006c35);\n    background: rgba(0, 108, 53, .14);\n  }\n}\n.pd-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap;\n  font-size: 13px;\n  color: var(--mu, #8a8aa0);\n}\n.pd-online[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n  input {\n    accent-color: var(--primary, #006c35);\n  }\n}\n.pd-sort[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  .pd-l {\n    font-family: var(--fm, monospace);\n    font-size: 10px;\n    letter-spacing: 1.5px;\n    text-transform: uppercase;\n  }\n  select {\n    background: var(--bg2, #10101c);\n    color: var(--text);\n    border: 1px solid var(--br2, rgba(255,255,255,.14));\n    border-radius: 7px;\n    padding: 5px 8px;\n    font-size: 12px;\n    outline: none;\n  }\n}\n.pd-count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 13px;\n  color: var(--mu, #8a8aa0);\n  strong {\n    color: var(--text);\n  }\n}\n.pd-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 10px;\n}\n.pd-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 12px;\n  transition: border-color .15s, transform .15s;\n}\n.pd-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2, rgba(255,255,255,.14));\n  transform: translateY(-2px);\n}\n.pd-card__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n  min-width: 0;\n  text-decoration: none;\n  color: inherit;\n}\n.pd-ava[_ngcontent-%COMP%] {\n  position: relative;\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.pd-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.pd-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 19px;\n  color: #fff;\n}\n.pd-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -1px;\n  right: -1px;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  border: 2px solid var(--bg2, #10101c);\n  z-index: 2;\n}\n.pd-dot--online[_ngcontent-%COMP%] {\n  background: #4ade80;\n}\n.pd-dot--idle[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n}\n.pd-dot--offline[_ngcontent-%COMP%] {\n  background: #4b5563;\n}\n.pd-id[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.pd-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pd-nick[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  color: var(--accent, #d4af37);\n}\n.pd-loc[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--mu, #8a8aa0);\n}\n.pd-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 9px;\n  margin-top: 5px;\n  font-size: 11px;\n  color: var(--mu, #8a8aa0);\n}\n.pd-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.pd-stat--gold[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.pd-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-shrink: 0;\n}\n.pd-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  color: var(--mu, #8a8aa0);\n  transition:\n    color .15s,\n    border-color .15s,\n    background .15s;\n  &:hover {\n    color: var(--primary, #4ade80);\n    border-color: rgba(0, 108, 53, .5);\n    background: rgba(0, 108, 53, .08);\n  }\n}\n.pd-icon--msg[_ngcontent-%COMP%]:hover {\n  color: #4ade80;\n  border-color: rgba(0, 108, 53, .5);\n  background: rgba(0, 108, 53, .08);\n}\n.pd-icon--challenge[_ngcontent-%COMP%]:hover {\n  color: var(--accent, #d4af37);\n  border-color: rgba(212, 175, 55, .5);\n  background: rgba(212, 175, 55, .12);\n}\n.pd-icon--accept[_ngcontent-%COMP%] {\n  color: #4ade80;\n  border-color: rgba(74, 222, 128, .4);\n}\n.pd-icon--pending[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n  cursor: default;\n  font-weight: 700;\n}\n.pd-empty[_ngcontent-%COMP%] {\n  padding: 50px 20px;\n  text-align: center;\n  color: var(--mu, #8a8aa0);\n  h3 {\n    color: var(--text);\n    margin: 0 0 8px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: .5px;\n  }\n  p {\n    margin: 0 auto;\n    max-width: 40ch;\n  }\n}\n.pd-skel[_ngcontent-%COMP%] {\n  height: 70px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, .05);\n  animation: _ngcontent-%COMP%_pdPulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pdPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .pd-card[_ngcontent-%COMP%], .pd-skel[_ngcontent-%COMP%] {\n    animation: none;\n    transition: none;\n  }\n}\n/*# sourceMappingURL=player-discovery-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlayerDiscoveryPageComponent, { className: "PlayerDiscoveryPageComponent", filePath: "src\\app\\features\\profile\\player-discovery-page.component.ts", lineNumber: 201 });
})();
export {
  PlayerDiscoveryPageComponent
};
//# sourceMappingURL=chunk-PIPOHKEK.js.map
