import {
  GAME_LABELS,
  PlayerProfileService
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
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  Router
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
  InputFlags,
  computed,
  inject,
  input,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";

// src/app/features/achievements/achievement.service.ts
var AchievementService = class _AchievementService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = `${environment.apiUrl}`;
    this.unlocked = signal([]);
    this.inProgress = signal([]);
    this.xp = signal({ total: 0, level: 1, next_at: 200, current_at: 100 });
    this.loading = signal(false);
    this.progressPct = computed(() => {
      const x = this.xp();
      const span = Math.max(1, x.next_at - x.current_at);
      return Math.min(100, Math.round((x.total - x.current_at) / span * 100));
    });
  }
  loadMine() {
    this.loading.set(true);
    this.http.get(`${this.base}/me/achievements`).subscribe({
      next: (r) => {
        this.unlocked.set(r.data.unlocked ?? []);
        this.inProgress.set(r.data.in_progress ?? []);
        this.xp.set(r.data.xp);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  loadForUser(userId) {
    this.loading.set(true);
    this.http.get(`${this.base}/users/${userId}/achievements`).subscribe({
      next: (r) => {
        this.unlocked.set(r.data.unlocked ?? []);
        this.inProgress.set(r.data.in_progress ?? []);
        this.xp.set(r.data.xp);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  static {
    this.\u0275fac = function AchievementService_Factory(t) {
      return new (t || _AchievementService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AchievementService, factory: _AchievementService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/achievements/achievements-grid.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function AchievementsGridComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Loading achievements\u2026");
    \u0275\u0275elementEnd();
  }
}
function AchievementsGridComponent_Conditional_29_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "div", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("data-tier", a_r1.tier);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.iconFor(a_r1.icon));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("+", a_r1.xp_reward, " XP \xB7 ", a_r1.tier, "");
  }
}
function AchievementsGridComponent_Conditional_29_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 10);
    \u0275\u0275text(1, "Unlocked");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 11);
    \u0275\u0275repeaterCreate(3, AchievementsGridComponent_Conditional_29_Conditional_0_For_4_Template, 10, 6, "div", 12, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.svc.unlocked());
  }
}
function AchievementsGridComponent_Conditional_29_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14)(4, "div", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 19)(9, "div", 20);
    \u0275\u0275element(10, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const a_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("data-tier", a_r3.tier);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.iconFor(a_r3.icon));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r3.description);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.pct(a_r3), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", a_r3.progress, " / ", a_r3.threshold, "");
  }
}
function AchievementsGridComponent_Conditional_29_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 10);
    \u0275\u0275text(1, "In progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 11);
    \u0275\u0275repeaterCreate(3, AchievementsGridComponent_Conditional_29_Conditional_1_For_4_Template, 13, 8, "div", 18, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.svc.inProgress());
  }
}
function AchievementsGridComponent_Conditional_29_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "No achievements yet \u2014 go win a match!");
    \u0275\u0275elementEnd();
  }
}
function AchievementsGridComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AchievementsGridComponent_Conditional_29_Conditional_0_Template, 5, 0)(1, AchievementsGridComponent_Conditional_29_Conditional_1_Template, 5, 0)(2, AchievementsGridComponent_Conditional_29_Conditional_2_Template, 2, 0, "p", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r1.svc.unlocked().length ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.svc.inProgress().length ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, !ctx_r1.svc.unlocked().length && !ctx_r1.svc.inProgress().length ? 2 : -1);
  }
}
var AchievementsGridComponent = class _AchievementsGridComponent {
  constructor() {
    this.svc = inject(AchievementService);
    this.userId = input(null);
  }
  ngOnInit() {
    const uid = this.userId();
    if (uid)
      this.svc.loadForUser(uid);
    else
      this.svc.loadMine();
  }
  pct(a) {
    return Math.min(100, Math.round(a.progress / Math.max(1, a.threshold) * 100));
  }
  iconFor(key) {
    const map = {
      "trophy": "\u{1F3C6}",
      "crown": "\u{1F451}",
      "flame": "\u{1F525}",
      "sword": "\u2694\uFE0F",
      "swords": "\u2694\uFE0F",
      "medal": "\u{1F947}",
      "shield": "\u{1F6E1}\uFE0F",
      "star": "\u2B50",
      "flag": "\u{1F6A9}",
      "crosshair": "\u{1F3AF}",
      "user-plus": "\u{1F91D}",
      "users": "\u{1F465}",
      "users-round": "\u{1F465}",
      "mic": "\u{1F399}\uFE0F",
      "shopping-bag": "\u{1F6CD}\uFE0F",
      "id-card": "\u{1FAAA}"
    };
    return map[key] ?? "\u{1F3C5}";
  }
  static {
    this.\u0275fac = function AchievementsGridComponent_Factory(t) {
      return new (t || _AchievementsGridComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AchievementsGridComponent, selectors: [["app-achievements-grid"]], inputs: { userId: [InputFlags.SignalBased, "userId"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 12, consts: [[1, "ach-wrap"], [1, "ach-xp"], [1, "ach-xp__level"], [1, "ach-xp__lvl-num"], [1, "ach-xp__lvl-label"], [1, "ach-xp__bar-block"], [1, "ach-xp__bar"], [1, "ach-xp__meta"], [1, "ach-xp__stats"], [1, "ach-empty"], [1, "ach-title"], [1, "ach-grid"], [1, "ach-card", "ach-card--unlocked"], [1, "ach-icon"], [1, "ach-card__body"], [1, "ach-card__name"], [1, "ach-card__desc"], [1, "ach-card__xp"], [1, "ach-card", "ach-card--locked"], [1, "ach-prog"], [1, "ach-prog__bar"]], template: function AchievementsGridComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Level");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
        \u0275\u0275element(9, "span");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 7)(11, "span");
        \u0275\u0275text(12);
        \u0275\u0275pipe(13, "number");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span");
        \u0275\u0275text(15);
        \u0275\u0275pipe(16, "number");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 8)(18, "div")(19, "b");
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span");
        \u0275\u0275text(22, "Unlocked");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div")(24, "b");
        \u0275\u0275text(25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span");
        \u0275\u0275text(27, "In progress");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(28, AchievementsGridComponent_Conditional_28_Template, 2, 0, "p", 9)(29, AchievementsGridComponent_Conditional_29_Template, 3, 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.svc.xp().level);
        \u0275\u0275advance(5);
        \u0275\u0275styleProp("width", ctx.svc.progressPct(), "%");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(13, 8, ctx.svc.xp().total), " XP");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(16, 10, ctx.svc.xp().next_at - ctx.svc.xp().total), " to next level");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.svc.unlocked().length);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.svc.inProgress().length);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(28, ctx.svc.loading() ? 28 : 29);
      }
    }, dependencies: [CommonModule, DecimalPipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.ach-wrap[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.ach-xp[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  padding: 1rem 1.25rem;\n  margin-bottom: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(0, 108, 53, 0.18),\n      rgba(212, 175, 55, 0.12));\n  border: 1px solid rgba(212, 175, 55, 0.35);\n  border-radius: 16px;\n}\n.ach-xp__level[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #006c35,\n      #d4af37);\n  color: #fff;\n  flex-shrink: 0;\n}\n.ach-xp__lvl-num[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 800;\n  line-height: 1;\n}\n.ach-xp__lvl-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  opacity: 0.9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.ach-xp__bar-block[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ach-xp__bar[_ngcontent-%COMP%] {\n  height: 10px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.ach-xp__bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #006c35,\n      #d4af37);\n  transition: width 0.6s ease;\n}\n.ach-xp__meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.78rem;\n  margin-top: 0.4rem;\n  opacity: 0.85;\n}\n.ach-xp__stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n.ach-xp__stats[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  text-align: center;\n  min-width: 64px;\n}\n.ach-xp__stats[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.3rem;\n  font-weight: 700;\n}\n.ach-xp__stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  opacity: 0.75;\n  text-transform: uppercase;\n}\n.ach-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  opacity: 0.9;\n  margin: 1.25rem 0 0.75rem;\n}\n.ach-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 0.75rem;\n}\n.ach-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  padding: 0.85rem;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 12px;\n  transition: transform 0.15s ease;\n}\n.ach-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.ach-card--locked[_ngcontent-%COMP%] {\n  opacity: 0.65;\n  filter: grayscale(0.5);\n}\n.ach-card[data-tier=bronze][_ngcontent-%COMP%] {\n  border-color: rgba(205, 127, 50, 0.5);\n}\n.ach-card[data-tier=silver][_ngcontent-%COMP%] {\n  border-color: rgba(192, 192, 192, 0.55);\n}\n.ach-card[data-tier=gold][_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.65);\n  box-shadow: 0 0 12px rgba(212, 175, 55, 0.15);\n}\n.ach-card[data-tier=platinum][_ngcontent-%COMP%] {\n  border-color: rgba(46, 139, 255, 0.7);\n  box-shadow: 0 0 18px rgba(46, 139, 255, 0.18);\n}\n.ach-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  background: rgba(255, 255, 255, 0.06);\n  flex-shrink: 0;\n}\n.ach-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.ach-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.95rem;\n}\n.ach-card__desc[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  opacity: 0.75;\n  margin-top: 0.15rem;\n}\n.ach-card__xp[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  margin-top: 0.4rem;\n  color: #d4af37;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.ach-prog[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.ach-prog__bar[_ngcontent-%COMP%] {\n  height: 6px;\n  background: rgba(255, 255, 255, 0.06);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.ach-prog__bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #2e8bff,\n      #d4af37);\n}\n.ach-prog[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  opacity: 0.7;\n}\n.ach-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=achievements-grid.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AchievementsGridComponent, { className: "AchievementsGridComponent", filePath: "src\\app\\features\\achievements\\achievements-grid.component.ts", lineNumber: 141 });
})();

// src/app/features/profile/player-profile-view.component.ts
var _forTrack02 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.game;
function PlayerProfileViewComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 8);
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", p_r1.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", p_r1.user.display_name);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((p_r1.user.display_name || "?").charAt(0));
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate("@" + p_r1.user.nickname);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate3(" \xB7 ", p_r1.user.city, "", p_r1.user.city && p_r1.user.country ? ", " : "", "", p_r1.user.country, " ");
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \xB7 ", p_r1.user.organization, " ");
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r1.user.bio);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit.set(true));
    });
    \u0275\u0275text(1, "Edit gaming IDs");
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const p_r1 = \u0275\u0275nextContext(2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.msg(p_r1));
    });
    \u0275\u0275text(1, "Message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 30);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_0_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const p_r1 = \u0275\u0275nextContext(2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.challenge(p_r1));
    });
    \u0275\u0275text(3, "Challenge");
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275text(1, "Request sent");
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const p_r1 = \u0275\u0275nextContext(2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.acceptFriend(p_r1));
    });
    \u0275\u0275text(1, "Accept request");
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const p_r1 = \u0275\u0275nextContext(2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addFriend(p_r1));
    });
    \u0275\u0275text(1, "Add friend");
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_4_Template(rf, ctx) {
}
function PlayerProfileViewComponent_Conditional_0_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_0_Template, 4, 0)(1, PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_1_Template, 2, 0)(2, PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_2_Template, 2, 0)(3, PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_3_Template, 2, 0)(4, PlayerProfileViewComponent_Conditional_0_Conditional_22_Case_4_Template, 0, 0);
  }
  if (rf & 2) {
    let tmp_3_0;
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_3_0 = ctx_r2.friends.relationshipWith(p_r1.user.id)) === "friends" ? 0 : tmp_3_0 === "pending_outgoing" ? 1 : tmp_3_0 === "pending_incoming" ? 2 : tmp_3_0 === "none" ? 3 : 4);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_54_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_54_For_5_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const id_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.copy(id_r8.value));
    });
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 37);
    \u0275\u0275element(6, "rect", 38)(7, "path", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const id_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", "Copy " + id_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(id_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(id_r8.value);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_54_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, PlayerProfileViewComponent_Conditional_0_Conditional_54_For_5_Conditional_0_Template, 8, 3, "button", 33);
  }
  if (rf & 2) {
    const id_r8 = ctx.$implicit;
    \u0275\u0275conditional(0, id_r8.value ? 0 : -1);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 22)(1, "h2", 23);
    \u0275\u0275text(2, "Gaming IDs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 32);
    \u0275\u0275repeaterCreate(4, PlayerProfileViewComponent_Conditional_0_Conditional_54_For_5_Template, 1, 1, null, null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.idList(p_r1));
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "h2", 23);
    \u0275\u0275text(2, "Gaming IDs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_55_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit.set(true));
    });
    \u0275\u0275text(4, " Add your PSN / Xbox / Steam / Riot / Epic IDs so friends can find you on the games you play. ");
    \u0275\u0275elementEnd()();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "No matches played yet.");
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", g_r10.tournaments_won, " \u{1F3C6}");
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", g_r10.draws, "D");
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "span");
    \u0275\u0275text(2, "Best streak");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(g_r10.best_win_streak);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 42)(1, "header")(2, "span", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Conditional_4_Template, 2, 1, "span", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 45)(6, "span", 46);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 47);
    \u0275\u0275text(9, "win rate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 48)(11, "span", 49);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 50);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Conditional_15_Template, 2, 1, "span", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 52)(17, "span");
    \u0275\u0275text(18, "Matches");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 52)(22, "span");
    \u0275\u0275text(23, "Tournaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Conditional_26_Template, 5, 1, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.label(g_r10.game));
    \u0275\u0275advance();
    \u0275\u0275conditional(4, g_r10.tournaments_won > 0 ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", g_r10.win_rate, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", g_r10.wins, "W");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", g_r10.losses, "L");
    \u0275\u0275advance();
    \u0275\u0275conditional(15, g_r10.draws > 0 ? 15 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(g_r10.matches_played);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(g_r10.tournaments_played);
    \u0275\u0275advance();
    \u0275\u0275conditional(26, g_r10.best_win_streak > 0 ? 26 : -1);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275repeaterCreate(1, PlayerProfileViewComponent_Conditional_0_Conditional_60_For_2_Template, 27, 9, "article", 42, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(p_r1.games);
  }
}
function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit.set(false));
    });
    \u0275\u0275elementStart(1, "div", 54);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r11);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 55)(3, "h3");
    \u0275\u0275text(4, "Gaming IDs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 56);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit.set(false));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 57);
    \u0275\u0275element(7, "line", 58)(8, "line", 59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 60)(10, "label")(11, "span");
    \u0275\u0275text(12, "PSN ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.psn_id, $event) || (ctx_r2.form.psn_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "label")(15, "span");
    \u0275\u0275text(16, "Xbox Gamertag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.xbox_gamertag, $event) || (ctx_r2.form.xbox_gamertag = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label")(19, "span");
    \u0275\u0275text(20, "Steam ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.steam_id, $event) || (ctx_r2.form.steam_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label")(23, "span");
    \u0275\u0275text(24, "Riot ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.riot_id, $event) || (ctx_r2.form.riot_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "label")(27, "span");
    \u0275\u0275text(28, "Epic ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.epic_id, $event) || (ctx_r2.form.epic_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label")(31, "span");
    \u0275\u0275text(32, "PUBG ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.pubg_id, $event) || (ctx_r2.form.pubg_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "label")(35, "span");
    \u0275\u0275text(36, "CoD ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.cod_id, $event) || (ctx_r2.form.cod_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "footer", 68)(39, "button", 28);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit.set(false));
    });
    \u0275\u0275text(40, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 69);
    \u0275\u0275listener("click", function PlayerProfileViewComponent_Conditional_0_Conditional_65_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.saveIds());
    });
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.psn_id);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.xbox_gamertag);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.steam_id);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.riot_id);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.epic_id);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.pubg_id);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.cod_id);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.saving() ? "Saving\u2026" : "Save");
  }
}
function PlayerProfileViewComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
    \u0275\u0275element(3, "div", 3)(4, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5)(6, "span", 6);
    \u0275\u0275element(7, "span", 7);
    \u0275\u0275template(8, PlayerProfileViewComponent_Conditional_0_Conditional_8_Template, 1, 2, "img", 8)(9, PlayerProfileViewComponent_Conditional_0_Conditional_9_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 9)(11, "h1", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, PlayerProfileViewComponent_Conditional_0_Conditional_13_Template, 2, 1, "div", 11);
    \u0275\u0275elementStart(14, "div", 12)(15, "span", 13);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, PlayerProfileViewComponent_Conditional_0_Conditional_17_Template, 1, 3)(18, PlayerProfileViewComponent_Conditional_0_Conditional_18_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, PlayerProfileViewComponent_Conditional_0_Conditional_19_Template, 2, 1, "p", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 15);
    \u0275\u0275template(21, PlayerProfileViewComponent_Conditional_0_Conditional_21_Template, 2, 0, "button", 16)(22, PlayerProfileViewComponent_Conditional_0_Conditional_22_Template, 5, 1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "section", 17)(24, "div", 18)(25, "span", 19);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 20);
    \u0275\u0275text(28, "Matches");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 18)(30, "span", 19);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 20);
    \u0275\u0275text(33, "Wins");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 18)(35, "span", 19);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 20);
    \u0275\u0275text(38, "Win rate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 18)(40, "span", 19);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 20);
    \u0275\u0275text(43, "Tournaments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 18)(45, "span", 21);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span", 20);
    \u0275\u0275text(48, "Trophies");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 18)(50, "span", 19);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "span", 20);
    \u0275\u0275text(53, "MVPs");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(54, PlayerProfileViewComponent_Conditional_0_Conditional_54_Template, 6, 0, "section", 22)(55, PlayerProfileViewComponent_Conditional_0_Conditional_55_Template, 5, 0);
    \u0275\u0275elementStart(56, "section", 22)(57, "h2", 23);
    \u0275\u0275text(58, "Games");
    \u0275\u0275elementEnd();
    \u0275\u0275template(59, PlayerProfileViewComponent_Conditional_0_Conditional_59_Template, 2, 0, "div", 24)(60, PlayerProfileViewComponent_Conditional_0_Conditional_60_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "section", 22)(62, "h2", 23);
    \u0275\u0275text(63, "Achievements");
    \u0275\u0275elementEnd();
    \u0275\u0275element(64, "app-achievements-grid", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(65, PlayerProfileViewComponent_Conditional_0_Conditional_65_Template, 43, 9, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275classMap("pp-dot--" + p_r1.presence.status);
    \u0275\u0275property("title", p_r1.presence.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, p_r1.user.avatar_url ? 8 : 9);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r1.user.display_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, p_r1.user.nickname ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.roleLabel(p_r1.user.role));
    \u0275\u0275advance();
    \u0275\u0275conditional(17, p_r1.user.city || p_r1.user.country ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, p_r1.user.organization ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(19, p_r1.user.bio ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(21, ctx_r2.mode() === "self" ? 21 : 22);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.totals.matches_played);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.totals.wins);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", p_r1.totals.win_rate, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.totals.tournaments_played);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.totals.tournaments_won);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.totals.mvp_count);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(54, ctx_r2.hasAnyId(p_r1) ? 54 : ctx_r2.mode() === "self" ? 55 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(59, p_r1.games.length === 0 ? 59 : 60);
    \u0275\u0275advance(5);
    \u0275\u0275property("userId", ctx_r2.userId());
    \u0275\u0275advance();
    \u0275\u0275conditional(65, ctx_r2.mode() === "self" && ctx_r2.openEdit() ? 65 : -1);
  }
}
function PlayerProfileViewComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 70)(2, "div", 71)(3, "div", 71);
    \u0275\u0275elementEnd();
  }
}
function PlayerProfileViewComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
var PlayerProfileViewComponent = class _PlayerProfileViewComponent {
  constructor() {
    this.userId = input(null);
    this.mode = input("public");
    this.api = inject(PlayerProfileService);
    this.auth = inject(AuthService);
    this.friends = inject(FriendService);
    this.dm = inject(DmService);
    this.challengeUi = inject(ChallengeUiService);
    this.toast = inject(ToastService);
    this.router = inject(Router);
    this.profile = signal(null);
    this.loading = signal(false);
    this.error = signal(null);
    this.openEdit = signal(false);
    this.saving = signal(false);
    this.form = { psn_id: "", xbox_gamertag: "", steam_id: "", riot_id: "", epic_id: "", pubg_id: "", cod_id: "" };
  }
  ngOnChanges(_c) {
    this.fetch();
  }
  fetch() {
    this.loading.set(true);
    this.error.set(null);
    const req = this.mode() === "self" ? this.api.me() : this.api.show(this.userId() ?? "");
    req.subscribe({
      next: (r) => {
        this.profile.set(r.data);
        this.syncForm();
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.error?.message ?? "Could not load profile.");
        this.loading.set(false);
      }
    });
  }
  syncForm() {
    const ids = this.profile()?.gaming_ids;
    if (!ids)
      return;
    this.form = {
      psn_id: ids.psn_id ?? "",
      xbox_gamertag: ids.xbox_gamertag ?? "",
      steam_id: ids.steam_id ?? "",
      riot_id: ids.riot_id ?? "",
      epic_id: ids.epic_id ?? "",
      pubg_id: ids.pubg_id ?? "",
      cod_id: ids.cod_id ?? ""
    };
  }
  // Template helpers
  label(game) {
    return GAME_LABELS[game] ?? game;
  }
  roleLabel(r) {
    return r === "organizer" ? "Organizer" : r === "admin" ? "Admin" : "Player";
  }
  hasAnyId(p) {
    return Object.values(p.gaming_ids).some((v) => !!v);
  }
  idList(p) {
    return [
      { label: "PSN", value: p.gaming_ids.psn_id },
      { label: "Xbox", value: p.gaming_ids.xbox_gamertag },
      { label: "Steam", value: p.gaming_ids.steam_id },
      { label: "Riot", value: p.gaming_ids.riot_id },
      { label: "Epic", value: p.gaming_ids.epic_id },
      { label: "PUBG", value: p.gaming_ids.pubg_id },
      { label: "CoD", value: p.gaming_ids.cod_id }
    ];
  }
  copy(text) {
    navigator.clipboard?.writeText(text).then(() => this.toast.success("Copied to clipboard."));
  }
  // Self-profile: save IDs
  saveIds() {
    if (this.saving())
      return;
    this.saving.set(true);
    this.api.updateGamingIds(this.form).subscribe({
      next: (r) => {
        this.profile.set(r.data);
        this.saving.set(false);
        this.openEdit.set(false);
        this.toast.success("Gaming IDs updated.");
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Could not save.");
        this.saving.set(false);
      }
    });
  }
  // Public-profile actions
  addFriend(p) {
    this.friends.sendRequest({ id: p.user.id, name: p.user.name, nickname: p.user.nickname, display_name: p.user.display_name, avatar_url: p.user.avatar_url }).subscribe({
      next: () => this.toast.success(`Friend request sent to ${p.user.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not send request.")
    });
  }
  acceptFriend(p) {
    const req = this.friends.requests().find((r) => r.user.id === p.user.id);
    if (!req)
      return;
    this.friends.accept(req).subscribe({
      next: () => this.toast.success(`You and ${p.user.display_name} are now friends.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Failed.")
    });
  }
  msg(p) {
    this.dm.openWith({ id: p.user.id, name: p.user.name, nickname: p.user.nickname, display_name: p.user.display_name, avatar_url: p.user.avatar_url }).subscribe({
      next: () => this.router.navigate(["/community/home"], { queryParams: { pane: "messages" } }),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not open chat.")
    });
  }
  challenge(p) {
    this.challengeUi.open({ id: p.user.id, name: p.user.name, nickname: p.user.nickname, display_name: p.user.display_name, avatar_url: p.user.avatar_url });
  }
  static {
    this.\u0275fac = function PlayerProfileViewComponent_Factory(t) {
      return new (t || _PlayerProfileViewComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlayerProfileViewComponent, selectors: [["app-player-profile-view"]], inputs: { userId: [InputFlags.SignalBased, "userId"], mode: [InputFlags.SignalBased, "mode"] }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 3, vars: 1, consts: [[1, "pp-shell"], [1, "pp-hero"], ["aria-hidden", "true", 1, "pp-cover"], [1, "pp-cover__grid"], [1, "pp-cover__glow"], [1, "pp-hero__row"], [1, "pp-ava"], [1, "pp-dot", 3, "title"], [3, "src", "alt"], [1, "pp-id"], [1, "pp-name"], [1, "pp-nick"], [1, "pp-meta"], [1, "pp-role"], [1, "pp-bio"], [1, "pp-actions"], [1, "pp-btn", "pp-btn--ghost"], [1, "pp-totals"], [1, "pp-tot"], [1, "pp-tot__n"], [1, "pp-tot__l"], [1, "pp-tot__n", "pp-tot__n--gold"], [1, "pp-section"], [1, "pp-h"], [1, "pp-empty"], [3, "userId"], [1, "pp-modal-overlay"], [1, "pp-ava-letter"], [1, "pp-btn", "pp-btn--ghost", 3, "click"], [1, "pp-btn", "pp-btn--primary", 3, "click"], [1, "pp-btn", "pp-btn--accent", 3, "click"], ["disabled", "", 1, "pp-btn", "pp-btn--ghost"], [1, "pp-ids"], ["type", "button", 1, "pp-idchip", 3, "title"], ["type", "button", 1, "pp-idchip", 3, "click", "title"], [1, "pp-idchip__l"], [1, "pp-idchip__v"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2", "ry", "2"], ["d", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"], [1, "pp-empty", "pp-empty--cta", 3, "click"], [1, "pp-games"], [1, "pp-game"], [1, "pp-game__tag"], [1, "pp-game__trophy"], [1, "pp-game__wr"], [1, "pp-game__wr-n"], [1, "pp-game__wr-l"], [1, "pp-game__wl"], [1, "pp-wl", "pp-wl--w"], [1, "pp-wl", "pp-wl--l"], [1, "pp-wl", "pp-wl--d"], [1, "pp-game__row"], [1, "pp-modal-overlay", 3, "click"], [1, "pp-modal", 3, "click"], [1, "pp-modal__head"], ["aria-label", "Close", 1, "pp-x", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "pp-modal__body"], ["placeholder", "PlayStation Network", 3, "ngModelChange", "ngModel"], ["placeholder", "Xbox", 3, "ngModelChange", "ngModel"], ["placeholder", "Steam", 3, "ngModelChange", "ngModel"], ["placeholder", "Valorant / LoL", 3, "ngModelChange", "ngModel"], ["placeholder", "Fortnite / Rocket League", 3, "ngModelChange", "ngModel"], ["placeholder", "PUBG", 3, "ngModelChange", "ngModel"], ["placeholder", "Call of Duty", 3, "ngModelChange", "ngModel"], [1, "pp-modal__foot"], [1, "pp-btn", "pp-btn--primary", 3, "click", "disabled"], [1, "pp-skel", "pp-skel--hero"], [1, "pp-skel"], [1, "pp-error"]], template: function PlayerProfileViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PlayerProfileViewComponent_Conditional_0_Template, 66, 21, "div", 0)(1, PlayerProfileViewComponent_Conditional_1_Template, 4, 0)(2, PlayerProfileViewComponent_Conditional_2_Template, 3, 1);
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275conditional(0, (tmp_0_0 = ctx.profile()) ? 0 : ctx.loading() ? 1 : ctx.error() ? 2 : -1, tmp_0_0);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, AchievementsGridComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.pp-shell[_ngcontent-%COMP%] {\n  max-width: 980px;\n  margin: 0 auto;\n  padding: 1.25rem 1.5rem 4rem;\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.pp-skel[_ngcontent-%COMP%] {\n  height: 110px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, .05);\n  animation: _ngcontent-%COMP%_ppPulse 1.5s ease-in-out infinite;\n}\n.pp-skel--hero[_ngcontent-%COMP%] {\n  height: 200px;\n}\n@keyframes _ngcontent-%COMP%_ppPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.pp-error[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #fca5a5;\n  background: rgba(239, 68, 68, .08);\n  border: 1px solid rgba(239, 68, 68, .25);\n  border-radius: 12px;\n}\n.pp-hero[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 16px;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(0, 108, 53, .12),\n      rgba(10, 10, 18, 0) 60%),\n    var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.pp-cover[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 130px;\n  pointer-events: none;\n  overflow: hidden;\n}\n.pp-cover__grid[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, .04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, .04) 1px,\n      transparent 1px);\n  background-size: 36px 36px;\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 80% 80% at 50% 30%,\n      #000 30%,\n      transparent 80%);\n  mask-image:\n    radial-gradient(\n      ellipse 80% 80% at 50% 30%,\n      #000 30%,\n      transparent 80%);\n}\n.pp-cover__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -40px;\n  right: -60px;\n  width: 320px;\n  height: 320px;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(46, 139, 255, .22),\n      transparent 65%);\n  filter: blur(40px);\n}\n.pp-hero__row[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: end;\n  gap: 18px;\n  padding: 78px 22px 22px;\n}\n@media (max-width: 700px) {\n  .pp-hero__row[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n    padding-top: 66px;\n  }\n  .pp-actions[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    justify-content: flex-start;\n    padding-top: 8px;\n  }\n}\n.pp-ava[_ngcontent-%COMP%] {\n  position: relative;\n  width: 92px;\n  height: 92px;\n  border-radius: 50%;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  border: 3px solid var(--bg2, #10101c);\n}\n.pp-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.pp-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 38px;\n  color: #fff;\n}\n.pp-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3px;\n  right: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 3px solid var(--bg2, #10101c);\n  z-index: 2;\n}\n.pp-dot--online[_ngcontent-%COMP%] {\n  background: #4ade80;\n  box-shadow: 0 0 8px #4ade80;\n}\n.pp-dot--idle[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n}\n.pp-dot--offline[_ngcontent-%COMP%] {\n  background: #4b5563;\n}\n.pp-name[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 4.4vw, 38px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n  line-height: 1;\n}\n.pp-nick[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 13px;\n  color: var(--accent, #d4af37);\n  margin-top: 4px;\n}\n.pp-meta[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 6px;\n}\n.pp-role[_ngcontent-%COMP%] {\n  color: #4ade80;\n  text-transform: capitalize;\n  font-weight: 600;\n}\n.pp-bio[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  font-size: 14px;\n  color: var(--text, #ececf1);\n  line-height: 1.5;\n  max-width: 60ch;\n}\n.pp-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.pp-btn[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  border-radius: 10px;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  border: 1px solid transparent;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.pp-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.pp-btn--accent[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n  color: #1a1100;\n  &:hover:not(:disabled) {\n    background: var(--accent-soft, #e8c965);\n  }\n}\n.pp-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n.pp-totals[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 1px;\n  background: var(--br, rgba(255,255,255,.08));\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  overflow: hidden;\n}\n@media (max-width: 700px) {\n  .pp-totals[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.pp-tot[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  padding: 14px 12px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.pp-tot__n[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 22px;\n  color: var(--text, #ececf1);\n  line-height: 1;\n}\n.pp-tot__n--gold[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.pp-tot__l[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n}\n.pp-section[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  padding: 18px 20px;\n}\n.pp-h[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 16px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text);\n  margin: 0 0 14px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.pp-soon[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--mu);\n  border: 1px dashed var(--br2, rgba(255,255,255,.14));\n  padding: 2px 7px;\n  border-radius: 100px;\n}\n.pp-ids[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.pp-idchip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 10px;\n  cursor: pointer;\n  color: var(--text);\n  transition: border-color .15s, background .15s;\n}\n.pp-idchip[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent, #d4af37);\n  background: rgba(212, 175, 55, .06);\n}\n.pp-idchip__l[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n}\n.pp-idchip__v[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.pp-idchip[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  flex-shrink: 0;\n}\n.pp-empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  text-align: center;\n  color: var(--mu, #8a8aa0);\n  font-size: 13px;\n  border: 1px dashed var(--br2, rgba(255,255,255,.14));\n  border-radius: 10px;\n}\n.pp-empty--cta[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: border-color .15s, color .15s;\n  &:hover {\n    border-color: var(--accent, #d4af37);\n    color: var(--text);\n  }\n}\n.pp-games[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 12px;\n}\n.pp-game[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 12px;\n  padding: 14px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  transition: border-color .15s, transform .15s;\n}\n.pp-game[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2, rgba(255,255,255,.14));\n  transform: translateY(-2px);\n}\n.pp-game[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.pp-game__tag[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n}\n.pp-game__trophy[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--accent, #d4af37);\n}\n.pp-game__wr[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 6px;\n}\n.pp-game__wr-n[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 32px;\n  color: var(--text);\n  line-height: 1;\n}\n.pp-game__wr-l[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n}\n.pp-game__wl[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.pp-wl[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 8px;\n  border-radius: 100px;\n}\n.pp-wl--w[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, .14);\n  color: #4ade80;\n}\n.pp-wl--l[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .10);\n  color: #fca5a5;\n}\n.pp-wl--d[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .06);\n  color: var(--mu, #8a8aa0);\n}\n.pp-game__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 12.5px;\n  color: var(--mu, #8a8aa0);\n  padding-top: 4px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n  strong {\n    color: var(--text);\n    font-weight: 700;\n  }\n}\n.pp-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, .7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: grid;\n  place-items: center;\n  padding: 20px;\n}\n.pp-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 460px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 16px;\n  overflow: hidden;\n}\n.pp-modal__head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--br, rgba(255,255,255,.08));\n  h3 {\n    margin: 0;\n    font-size: 16px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: 1px;\n    text-transform: uppercase;\n  }\n}\n.pp-x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mu);\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  &:hover {\n    color: var(--text);\n    background: rgba(255, 255, 255, .06);\n  }\n}\n.pp-modal__body[_ngcontent-%COMP%] {\n  padding: 18px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  max-height: 60vh;\n  overflow-y: auto;\n  label {\n    display: grid;\n    grid-template-columns: 110px 1fr;\n    align-items: center;\n    gap: 12px;\n    font-size: 13px;\n    color: var(--mu, #8a8aa0);\n  }\n  input {\n    background: var(--bg3, #181826);\n    border: 1px solid var(--br2, rgba(255,255,255,.14));\n    border-radius: 8px;\n    padding: 9px 12px;\n    color: var(--text);\n    font-size: 13px;\n    outline: none;\n    &:focus {\n      border-color: var(--primary, #006c35);\n    }\n  }\n}\n.pp-modal__foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 14px 20px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n}\n@media (prefers-reduced-motion: reduce) {\n  .pp-skel[_ngcontent-%COMP%], .pp-game[_ngcontent-%COMP%] {\n    transition: none;\n    animation: none;\n  }\n}\n/*# sourceMappingURL=player-profile-view.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlayerProfileViewComponent, { className: "PlayerProfileViewComponent", filePath: "src\\app\\features\\profile\\player-profile-view.component.ts", lineNumber: 272 });
})();

export {
  PlayerProfileViewComponent
};
//# sourceMappingURL=chunk-6X7FC2BZ.js.map
