import {
  FormsModule
} from "./chunk-LNNIKBGT.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import {
  CommonModule,
  DecimalPipe,
  UpperCasePipe,
  catchError,
  computed,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/leaderboard/leaderboard.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.user_id;
function LeaderboardComponent_For_16_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 20);
    \u0275\u0275element(1, "circle", 21)(2, "path", 22)(3, "path", 23);
    \u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_For_16_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 20);
    \u0275\u0275element(1, "circle", 21)(2, "circle", 24)(3, "line", 25)(4, "line", 26)(5, "line", 27)(6, "line", 28);
    \u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_For_16_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 20);
    \u0275\u0275element(1, "path", 29)(2, "path", 30)(3, "path", 31)(4, "path", 32)(5, "path", 33)(6, "path", 34)(7, "path", 35)(8, "path", 36);
    \u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_For_16_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 20);
    \u0275\u0275element(1, "polygon", 37)(2, "line", 38)(3, "line", 39);
    \u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_For_16_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 20);
    \u0275\u0275element(1, "path", 40)(2, "polyline", 41);
    \u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function LeaderboardComponent_For_16_Template_button_click_0_listener() {
      const g_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectGame(g_r2.key));
    });
    \u0275\u0275elementStart(1, "span", 18);
    \u0275\u0275template(2, LeaderboardComponent_For_16_Case_2_Template, 4, 0)(3, LeaderboardComponent_For_16_Case_3_Template, 7, 0)(4, LeaderboardComponent_For_16_Case_4_Template, 9, 0)(5, LeaderboardComponent_For_16_Case_5_Template, 4, 0)(6, LeaderboardComponent_For_16_Case_6_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const g_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeGame() === g_r2.key);
    \u0275\u0275attribute("aria-selected", ctx_r2.activeGame() === g_r2.key);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, (tmp_12_0 = g_r2.key) === "ea_fc" ? 2 : tmp_12_0 === "pubg_mobile" ? 3 : tmp_12_0 === "cod_mobile" ? 4 : tmp_12_0 === "valorant" ? 5 : tmp_12_0 === "fortnite" ? 6 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(g_r2.label);
  }
}
function LeaderboardComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "div", 42)(2, "div", 43)(3, "div", 44);
    \u0275\u0275elementStart(4, "span", 45);
    \u0275\u0275text(5, "Loading rankings\u2026");
    \u0275\u0275elementEnd()();
  }
}
function LeaderboardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 46);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 47);
    \u0275\u0275element(3, "path", 48)(4, "line", 49)(5, "line", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 50);
    \u0275\u0275listener("click", function LeaderboardComponent_Conditional_18_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.load());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 51);
    \u0275\u0275element(10, "polyline", 52)(11, "path", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Retry ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
function LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 63);
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("src", p_r5.avatar_url, \u0275\u0275sanitizeUrl)("alt", p_r5.display_name || p_r5.name);
  }
}
function LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "uppercase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, (p_r5.display_name || p_r5.name)[0]));
  }
}
function LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 65);
    \u0275\u0275element(1, "path", 7);
    \u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", p_r5.rank, " ");
  }
}
function LeaderboardComponent_Conditional_19_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "div", 61);
    \u0275\u0275elementStart(2, "div", 62);
    \u0275\u0275template(3, LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_3_Template, 1, 2, "img", 63)(4, LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_4_Template, 3, 3);
    \u0275\u0275elementStart(5, "span", 64);
    \u0275\u0275template(6, LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_6_Template, 2, 0, ":svg:svg", 65)(7, LeaderboardComponent_Conditional_19_For_3_Conditional_0_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 66);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 67)(11, "span", 68);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 69);
    \u0275\u0275text(15, "PTS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 70)(17, "span", 71);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r5 = ctx;
    const idx_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("--delay", idx_r6 * 0.15 + "s");
    \u0275\u0275classProp("gold", p_r5.rank === 1)("silver", p_r5.rank === 2)("bronze", p_r5.rank === 3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, p_r5.avatar_url ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(6, p_r5.rank === 1 ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r5.display_name || p_r5.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 19, p_r5.points));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("podium-pillar--1", p_r5.rank === 1)("podium-pillar--2", p_r5.rank === 2)("podium-pillar--3", p_r5.rank === 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r5.rank);
  }
}
function LeaderboardComponent_Conditional_19_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, LeaderboardComponent_Conditional_19_For_3_Conditional_0_Template, 19, 21, "div", 59);
  }
  if (rf & 2) {
    let tmp_11_0;
    const idx_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, (tmp_11_0 = ctx_r2.top3()[idx_r6]) ? 0 : -1, tmp_11_0);
  }
}
function LeaderboardComponent_Conditional_19_For_22_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 63);
  }
  if (rf & 2) {
    const e_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", e_r8.avatar_url, \u0275\u0275sanitizeUrl)("alt", e_r8.display_name || e_r8.name);
  }
}
function LeaderboardComponent_Conditional_19_For_22_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "uppercase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, (e_r8.display_name || e_r8.name)[0]));
  }
}
function LeaderboardComponent_Conditional_19_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 73);
    \u0275\u0275listener("mouseenter", function LeaderboardComponent_Conditional_19_For_22_Template_tr_mouseenter_0_listener() {
      const e_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.highlight(e_r8.user_id));
    })("mouseleave", function LeaderboardComponent_Conditional_19_For_22_Template_tr_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.unhighlight());
    });
    \u0275\u0275elementStart(1, "td", 74)(2, "span", 75);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 76)(5, "div", 77)(6, "div", 78);
    \u0275\u0275template(7, LeaderboardComponent_Conditional_19_For_22_Conditional_7_Template, 1, 2, "img", 63)(8, LeaderboardComponent_Conditional_19_For_22_Conditional_8_Template, 3, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 79);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "td", 80)(12, "span", 81);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 82);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 83);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 84)(20, "div", 85)(21, "div", 86);
    \u0275\u0275element(22, "div", 87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 88);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const e_r8 = ctx.$implicit;
    const i_r9 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--row-delay", i_r9 * 0.025 + "s");
    \u0275\u0275classProp("highlighted", ctx_r2.highlightedId() === e_r8.user_id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(e_r8.rank);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(7, e_r8.avatar_url ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(e_r8.display_name || e_r8.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 13, e_r8.points));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(e_r8.wins);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r8.losses);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r2.winRate(e_r8) !== "\u2014" ? ctx_r2.winRate(e_r8) : "0%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.winRate(e_r8));
  }
}
function LeaderboardComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 54);
    \u0275\u0275repeaterCreate(2, LeaderboardComponent_Conditional_19_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 55)(5, "table", 56)(6, "thead")(7, "tr")(8, "th", 57);
    \u0275\u0275text(9, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 57);
    \u0275\u0275text(11, "Player");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 57);
    \u0275\u0275text(13, "Points");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 57);
    \u0275\u0275text(15, "W");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 57);
    \u0275\u0275text(17, "L");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 57);
    \u0275\u0275text(19, "Win %");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275repeaterCreate(21, LeaderboardComponent_Conditional_19_For_22_Template, 25, 15, "tr", 58, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.podiumOrder);
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r2.rest());
  }
}
function LeaderboardComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 89);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 90);
    \u0275\u0275element(3, "path", 91)(4, "path", 92)(5, "path", 93)(6, "path", 94)(7, "path", 95)(8, "path", 96);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "h3");
    \u0275\u0275text(10, "No rankings yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Be the first to compete and claim the top spot.");
    \u0275\u0275elementEnd()();
  }
}
var LeaderboardComponent = class _LeaderboardComponent {
  constructor() {
    this.api = inject(ApiService);
    this.games = [
      { key: "ea_fc", label: "EA FC 25", icon: "\u26BD" },
      { key: "pubg_mobile", label: "PUBG Mobile", icon: "\u{1F3AF}" },
      { key: "cod_mobile", label: "Call of Duty", icon: "\u{1F480}" },
      { key: "valorant", label: "Valorant", icon: "\u{1F52B}" },
      { key: "fortnite", label: "Fortnite", icon: "\u{1F3D7}\uFE0F" }
    ];
    this.activeGame = signal("ea_fc");
    this.entries = signal([]);
    this.loading = signal(true);
    this.error = signal(null);
    this.highlightedId = signal(null);
    this.top3 = computed(() => this.entries().slice(0, 3));
    this.rest = computed(() => this.entries().slice(3));
    this.podiumOrder = [1, 0, 2];
  }
  ngOnInit() {
    this.load();
  }
  selectGame(key) {
    this.activeGame.set(key);
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set(null);
    this.entries.set([]);
    this.api.getLeaderboard(this.activeGame(), 50).pipe(
      // Any API error (404, 500, network) = no rankings yet — show empty state
      catchError(() => of({ data: [] }))
    ).subscribe((res) => {
      this.entries.set(res.data ?? []);
      this.loading.set(false);
    });
  }
  highlight(id) {
    this.highlightedId.set(id);
  }
  unhighlight() {
    this.highlightedId.set(null);
  }
  trackById(_, e) {
    return e.user_id;
  }
  winRate(e) {
    const total = e.wins + e.losses;
    return total === 0 ? "\u2014" : Math.round(e.wins / total * 100) + "%";
  }
  static {
    this.\u0275fac = function LeaderboardComponent_Factory(t) {
      return new (t || _LeaderboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaderboardComponent, selectors: [["app-leaderboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 4, consts: [[1, "lb-page"], ["aria-hidden", "true", 1, "lb-bg"], [1, "lb-bg__orb", "lb-bg__orb--gold"], [1, "lb-bg__orb", "lb-bg__orb--green"], [1, "lb-header"], ["aria-hidden", "true", 1, "lb-crown"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M2 20h20v2H2v-2zm2-4h16l1-9-5 3-4-6-4 6-5-3 1 9z"], [1, "lb-title"], ["lang", "ar", 1, "lb-title-ar"], [1, "lb-subtitle"], ["role", "tablist", "aria-label", "Game selector", 1, "game-tabs"], ["role", "tab", 1, "game-tab", 3, "active"], ["aria-live", "polite", 1, "lb-loading"], [1, "lb-error"], [1, "lb-content"], [1, "lb-empty"], ["role", "tab", 1, "game-tab", 3, "click"], ["aria-hidden", "true", 1, "tab-icon"], [1, "tab-label"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"], ["d", "M2 12h20"], ["cx", "12", "cy", "12", "r", "3"], ["x1", "12", "y1", "2", "x2", "12", "y2", "9"], ["x1", "12", "y1", "15", "x2", "12", "y2", "22"], ["x1", "2", "y1", "12", "x2", "9", "y2", "12"], ["x1", "15", "y1", "12", "x2", "22", "y2", "12"], ["d", "M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"], ["d", "M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"], ["d", "M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"], ["d", "M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"], ["d", "M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"], ["d", "M15.5 9H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S16.33 9 15.5 9z"], ["d", "M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"], ["d", "M8.5 15H10v-1.5c0-.83-.67-1.5-1.5-1.5S7 12.67 7 13.5 7.67 15 8.5 15z"], ["points", "12 2 22 20 2 20"], ["x1", "12", "y1", "9", "x2", "12", "y2", "14"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["d", "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"], ["points", "9 22 9 12 15 12 15 22"], [1, "pulse-ring"], [1, "pulse-ring", "delay-1"], [1, "pulse-ring", "delay-2"], [1, "loading-text"], [1, "error-icon"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], [1, "retry-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "23 4 23 10 17 10"], ["d", "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"], ["aria-label", "Top 3 players", 1, "podium"], ["role", "region", "aria-label", "Full rankings", 1, "lb-table-wrap"], [1, "lb-table"], ["scope", "col"], [1, "lb-row", 3, "highlighted", "--row-delay"], [1, "podium-slot", 3, "gold", "silver", "bronze", "--delay"], [1, "podium-slot"], ["aria-hidden", "true", 1, "podium-halo"], [1, "podium-avatar"], [3, "src", "alt"], [1, "podium-rank-badge"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "currentColor"], [1, "podium-name"], [1, "podium-points"], [1, "pts-value"], [1, "pts-label"], [1, "podium-pillar"], [1, "pillar-rank"], [1, "avatar-initial"], [1, "lb-row", 3, "mouseenter", "mouseleave"], [1, "col-rank"], [1, "rank-num"], [1, "col-player"], [1, "player-cell"], [1, "row-avatar"], [1, "player-name"], [1, "col-points"], [1, "points-val"], [1, "col-w"], [1, "col-l"], [1, "col-wr"], [1, "wr-wrap"], [1, "wr-bar"], [1, "wr-fill"], [1, "wr-text"], [1, "lb-empty__icon"], ["width", "36", "height", "36", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"]], template: function LeaderboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "header", 4)(5, "div", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(6, "svg", 6);
        \u0275\u0275element(7, "path", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(8, "h1", 8);
        \u0275\u0275text(9, "Leaderboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 9);
        \u0275\u0275text(11, "\u0627\u0644\u0645\u062A\u0635\u062F\u0631\u0648\u0646");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p", 10);
        \u0275\u0275text(13, "Top 50 champions across the GCC");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "nav", 11);
        \u0275\u0275repeaterCreate(15, LeaderboardComponent_For_16_Template, 9, 5, "button", 12, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, LeaderboardComponent_Conditional_17_Template, 6, 0, "div", 13)(18, LeaderboardComponent_Conditional_18_Template, 13, 1, "div", 14)(19, LeaderboardComponent_Conditional_19_Template, 23, 0, "div", 15)(20, LeaderboardComponent_Conditional_20_Template, 13, 0, "div", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275repeater(ctx.games);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(17, ctx.loading() ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(18, ctx.error() ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(19, !ctx.loading() && !ctx.error() && ctx.entries().length ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(20, !ctx.loading() && !ctx.error() && !ctx.entries().length ? 20 : -1);
      }
    }, dependencies: [CommonModule, UpperCasePipe, DecimalPipe, FormsModule], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  --gold: #d4af37;\n  --silver: #94a3b8;\n  --bronze: #cd7f32;\n  --good: var(--green, #4ade80);\n}\n@keyframes _ngcontent-%COMP%_fadeDown {\n  from {\n    opacity: 0;\n    transform: translateY(-16px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_riseUp {\n  from {\n    opacity: 0;\n    transform: translateY(40px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_rowFadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_pulseRing {\n  0% {\n    transform: scale(0.5);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(2.2);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_crownPulse {\n  0%, 100% {\n    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));\n  }\n  50% {\n    filter: drop-shadow(0 0 24px rgba(212, 175, 55, 0.9));\n  }\n}\n@keyframes _ngcontent-%COMP%_haloPulse {\n  0%, 100% {\n    opacity: 0.5;\n    transform: translateX(-50%) scale(1);\n  }\n  50% {\n    opacity: 0.8;\n    transform: translateX(-50%) scale(1.1);\n  }\n}\n@keyframes _ngcontent-%COMP%_blink {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.3;\n  }\n}\n.lb-page[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: var(--bg);\n  color: var(--text);\n  padding: 0 1rem 5rem;\n}\n.lb-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n.lb-bg__orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(100px);\n  opacity: 0.4;\n}\n.lb-bg__orb--gold[_ngcontent-%COMP%] {\n  width: 600px;\n  height: 400px;\n  top: -100px;\n  left: 50%;\n  transform: translateX(-50%);\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, 0.22),\n      transparent 70%);\n}\n.lb-bg__orb--green[_ngcontent-%COMP%] {\n  width: 500px;\n  height: 500px;\n  bottom: -100px;\n  left: -150px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.16),\n      transparent 70%);\n}\n.lb-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  padding: 56px 0 36px;\n  animation: _ngcontent-%COMP%_fadeDown 0.6s ease both;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.lb-crown[_ngcontent-%COMP%] {\n  color: var(--gold);\n  animation: _ngcontent-%COMP%_crownPulse 3s ease-in-out infinite;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.lb-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, "Anton", sans-serif);\n  font-size: clamp(2.8rem, 7vw, 5.5rem);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin: 0;\n  color: var(--text);\n  text-shadow: 0 0 40px rgba(212, 175, 55, 0.2), 0 0 80px rgba(212, 175, 55, 0.08);\n}\n.lb-title-ar[_ngcontent-%COMP%] {\n  font-family: var(--fa, "Noto Sans Arabic", sans-serif);\n  font-size: 1rem;\n  color: var(--accent, #d4af37);\n  opacity: 0.75;\n  letter-spacing: 0.04em;\n}\n.lb-subtitle[_ngcontent-%COMP%] {\n  font-family: var(--fm, "JetBrains Mono", monospace);\n  font-size: 0.78rem;\n  color: var(--mu, #8a8aa0);\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  margin-top: 4px;\n}\n.game-tabs[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 3rem;\n  animation: _ngcontent-%COMP%_fadeDown 0.6s 0.12s ease both;\n}\n.game-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.3rem;\n  background: var(--bg2, #10101c);\n  border: 1px solid rgba(255, 255, 255, 0.09);\n  border-radius: 8px;\n  color: var(--mu, #8a8aa0);\n  font-family: var(--fm, "JetBrains Mono", monospace);\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.game-tab[_ngcontent-%COMP%]   .tab-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.game-tab[_ngcontent-%COMP%]:hover {\n  border-color: rgba(212, 175, 55, 0.4);\n  color: var(--accent, #d4af37);\n}\n.game-tab.active[_ngcontent-%COMP%] {\n  border-color: var(--accent, #d4af37);\n  color: var(--accent, #d4af37);\n  background: rgba(212, 175, 55, 0.08);\n  box-shadow: 0 0 20px rgba(212, 175, 55, 0.15), inset 0 0 12px rgba(212, 175, 55, 0.06);\n}\n.game-tab.active[_ngcontent-%COMP%]   .tab-icon[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.6));\n}\n@media (max-width: 640px) {\n  .game-tab[_ngcontent-%COMP%] {\n    padding: 0.55rem 0.85rem;\n  }\n  .game-tab[_ngcontent-%COMP%]   .tab-label[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.lb-loading[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1.5rem;\n  padding: 8rem 0;\n}\n.pulse-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  border: 2px solid rgba(212, 175, 55, 0.6);\n  animation: _ngcontent-%COMP%_pulseRing 2s ease-out infinite;\n}\n.pulse-ring.delay-1[_ngcontent-%COMP%] {\n  animation-delay: 0.5s;\n}\n.pulse-ring.delay-2[_ngcontent-%COMP%] {\n  animation-delay: 1s;\n}\n.loading-text[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.8rem;\n  letter-spacing: 0.3em;\n  color: var(--accent, #d4af37);\n  margin-top: 5rem;\n  animation: _ngcontent-%COMP%_blink 1.2s step-end infinite;\n}\n.lb-error[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  padding: 5rem 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.error-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: rgba(248, 113, 113, 0.1);\n  border: 1px solid rgba(248, 113, 113, 0.3);\n  display: grid;\n  place-items: center;\n  color: #f87171;\n}\n.lb-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--fb, sans-serif);\n  font-size: 1rem;\n  color: #f87171;\n  margin: 0;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0.65rem 1.8rem;\n  background: transparent;\n  border: 1px solid #f87171;\n  color: #f87171;\n  border-radius: 8px;\n  font-family: var(--fm, monospace);\n  font-size: 0.8rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(248, 113, 113, 0.1);\n}\n.lb-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 900px;\n  margin: 0 auto;\n}\n.podium[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  gap: 1.5rem;\n  margin-bottom: 3.5rem;\n  padding-bottom: 2px;\n}\n.podium-slot[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 0 0 160px;\n  animation: _ngcontent-%COMP%_riseUp 0.7s var(--delay, 0s) cubic-bezier(0.22, 0.68, 0, 1.3) both;\n  position: relative;\n}\n.podium-slot.gold[_ngcontent-%COMP%] {\n  --accent-p: var(--gold);\n}\n.podium-slot.silver[_ngcontent-%COMP%] {\n  --accent-p: var(--silver);\n}\n.podium-slot.bronze[_ngcontent-%COMP%] {\n  --accent-p: var(--bronze);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-halo[_ngcontent-%COMP%] {\n  background:\n    radial-gradient(\n      circle,\n      color-mix(in srgb, var(--accent-p) 30%, transparent) 0%,\n      transparent 70%);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-avatar[_ngcontent-%COMP%] {\n  border-color: var(--accent-p);\n}\n.podium-slot[_ngcontent-%COMP%]   .avatar-initial[_ngcontent-%COMP%] {\n  color: var(--accent-p);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-rank-badge[_ngcontent-%COMP%] {\n  background: var(--accent-p);\n  box-shadow: 0 0 12px var(--accent-p);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-points[_ngcontent-%COMP%] {\n  border-color: var(--accent-p);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-points[_ngcontent-%COMP%]   .pts-value[_ngcontent-%COMP%] {\n  color: var(--accent-p);\n  text-shadow: 0 0 12px var(--accent-p);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-pillar[_ngcontent-%COMP%] {\n  border-color: var(--accent-p);\n}\n.podium-slot[_ngcontent-%COMP%]   .podium-pillar[_ngcontent-%COMP%]   .pillar-rank[_ngcontent-%COMP%] {\n  color: var(--accent-p);\n}\n@media (max-width: 640px) {\n  .podium-slot[_ngcontent-%COMP%] {\n    flex: 0 0 100px;\n  }\n}\n.podium-halo[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -20px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  pointer-events: none;\n  animation: _ngcontent-%COMP%_haloPulse 3s ease-in-out infinite;\n}\n.podium-avatar[_ngcontent-%COMP%] {\n  position: relative;\n  width: 84px;\n  height: 84px;\n  border-radius: 50%;\n  border: 3px solid;\n  box-shadow: 0 0 24px rgba(0, 0, 0, 0.4), 0 0 0 6px rgba(255, 255, 255, 0.03);\n  overflow: visible;\n  margin-bottom: 0.75rem;\n}\n.podium-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .podium-avatar[_ngcontent-%COMP%]   .avatar-initial[_ngcontent-%COMP%] {\n  width: 84px;\n  height: 84px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  object-fit: cover;\n  background: var(--bg2, #10101c);\n  font-family: var(--fh, sans-serif);\n  font-size: 2rem;\n}\n@media (max-width: 640px) {\n  .podium-avatar[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 84px;\n  }\n  .podium-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .podium-avatar[_ngcontent-%COMP%]   .avatar-initial[_ngcontent-%COMP%] {\n    width: 64px;\n    height: 64px;\n    font-size: 1.5rem;\n  }\n}\n.podium-rank-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -6px;\n  right: -6px;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  color: #000;\n  display: grid;\n  place-items: center;\n  font-family: var(--fh, sans-serif);\n  font-size: 0.8rem;\n}\n.podium-name[_ngcontent-%COMP%] {\n  font-family: var(--fb, sans-serif);\n  font-weight: 700;\n  font-size: 0.95rem;\n  color: var(--text);\n  text-align: center;\n  margin: 0 0 0.45rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 140px;\n}\n.podium-points[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.25rem;\n  margin-bottom: 0.9rem;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid;\n  border-radius: 6px;\n  padding: 0.2rem 0.75rem;\n}\n.podium-points[_ngcontent-%COMP%]   .pts-value[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 1.4rem;\n  line-height: 1;\n}\n.podium-points[_ngcontent-%COMP%]   .pts-label[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.6rem;\n  color: var(--mu, #8a8aa0);\n  letter-spacing: 0.1em;\n}\n.podium-pillar[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid;\n  border-bottom: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.05) 0%,\n      rgba(255, 255, 255, 0.01) 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 0 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.07);\n}\n.podium-pillar--1[_ngcontent-%COMP%] {\n  height: 100px;\n}\n.podium-pillar--2[_ngcontent-%COMP%] {\n  height: 72px;\n}\n.podium-pillar--3[_ngcontent-%COMP%] {\n  height: 44px;\n}\n.podium-pillar[_ngcontent-%COMP%]   .pillar-rank[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 1.4rem;\n  opacity: 0.5;\n}\n.lb-table-wrap[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.35);\n}\n.lb-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.lb-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.025);\n  border-bottom: 1px solid rgba(212, 175, 55, 0.18);\n}\n.lb-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n  padding: 0.9rem 1rem;\n  text-align: left;\n  white-space: nowrap;\n}\n.lb-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  transition: background 0.14s, transform 0.14s;\n  animation: _ngcontent-%COMP%_rowFadeIn 0.4s var(--row-delay, 0s) ease both;\n  cursor: default;\n}\n.lb-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-family: var(--fb, sans-serif);\n  font-size: 0.92rem;\n  color: var(--text);\n  vertical-align: middle;\n}\n.lb-row[_ngcontent-%COMP%]:hover, .lb-row.highlighted[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.05);\n  transform: translateX(4px);\n}\n.lb-row[_ngcontent-%COMP%]:hover   .rank-num[_ngcontent-%COMP%], .lb-row.highlighted[_ngcontent-%COMP%]   .rank-num[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.lb-row[_ngcontent-%COMP%]:hover   .player-name[_ngcontent-%COMP%], .lb-row.highlighted[_ngcontent-%COMP%]   .player-name[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.lb-row[_ngcontent-%COMP%]:hover   .points-val[_ngcontent-%COMP%], .lb-row.highlighted[_ngcontent-%COMP%]   .points-val[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n  text-shadow: 0 0 10px rgba(212, 175, 55, 0.4);\n}\n.lb-row[_ngcontent-%COMP%]:hover   .wr-fill[_ngcontent-%COMP%], .lb-row.highlighted[_ngcontent-%COMP%]   .wr-fill[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n  box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);\n}\n.lb-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.col-rank[_ngcontent-%COMP%] {\n  width: 56px;\n}\n.col-points[_ngcontent-%COMP%] {\n  width: 110px;\n}\n.col-w[_ngcontent-%COMP%], .col-l[_ngcontent-%COMP%] {\n  width: 52px;\n}\n.col-wr[_ngcontent-%COMP%] {\n  width: 140px;\n}\n@media (max-width: 640px) {\n  .col-w[_ngcontent-%COMP%], .col-l[_ngcontent-%COMP%], .col-wr[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.rank-num[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.82rem;\n  color: var(--mu, #8a8aa0);\n  transition: color 0.14s;\n}\n.player-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n.row-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--fh, sans-serif);\n  font-size: 1rem;\n  color: var(--mu, #8a8aa0);\n}\n.row-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.player-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  transition: color 0.14s;\n}\n.points-val[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.88rem;\n  color: rgba(212, 175, 55, 0.85);\n  transition: all 0.14s;\n}\n.wr-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.wr-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.wr-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--primary, #006c35);\n  border-radius: 2px;\n  transition:\n    width 0.6s var(--row-delay, 0s) ease,\n    background 0.14s,\n    box-shadow 0.14s;\n}\n.wr-text[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.72rem;\n  color: var(--mu, #8a8aa0);\n  white-space: nowrap;\n  min-width: 36px;\n}\n.col-w[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .col-l[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: var(--dim, #55556e);\n  font-size: 0.88rem;\n}\n.lb-empty[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  padding: 7rem 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  color: var(--mu, #8a8aa0);\n}\n.lb-empty__icon[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: rgba(212, 175, 55, 0.08);\n  border: 1px solid rgba(212, 175, 55, 0.2);\n  display: grid;\n  place-items: center;\n  color: rgba(212, 175, 55, 0.6);\n  margin-bottom: 8px;\n}\n.lb-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 1.6rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin: 0;\n  color: var(--text);\n}\n.lb-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.6;\n  max-width: 32ch;\n  margin: 0;\n}\n/*# sourceMappingURL=leaderboard.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaderboardComponent, { className: "LeaderboardComponent", filePath: "src\\app\\pages\\leaderboard\\leaderboard.component.ts", lineNumber: 17 });
})();
export {
  LeaderboardComponent
};
//# sourceMappingURL=chunk-G4JJX7DN.js.map
