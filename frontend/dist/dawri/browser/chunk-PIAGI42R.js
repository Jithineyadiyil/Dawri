import {
  PlatformSponsorsStripComponent
} from "./chunk-HAFUZNCS.js";
import "./chunk-O6BWIF6D.js";
import "./chunk-3KAEIJBU.js";
import {
  FormBuilder,
  FormsModule,
  NgSelectOption,
  ReactiveFormsModule,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  Subject,
  computed,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  inject,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-3NRO4OA5.js";
import {
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/tournaments/tournaments.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _c1 = (a0) => ["/tournaments", a0];
function TournamentsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8);
    \u0275\u0275text(1, "+ New Tournament");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 60);
    \u0275\u0275text(1, "Join Free");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 61);
    \u0275\u0275listener("click", function TournamentsComponent_Conditional_44_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.search.set(""));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 62);
    \u0275\u0275element(2, "line", 63)(3, "line", 64);
    \u0275\u0275elementEnd()();
  }
}
function TournamentsComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function TournamentsComponent_Conditional_46_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleMine());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 35);
    \u0275\u0275element(2, "path", 66)(3, "circle", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Mine ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.showMine());
  }
}
function TournamentsComponent_For_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    \u0275\u0275property("value", o_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r4.label);
  }
}
function TournamentsComponent_For_74_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
  }
  if (rf & 2) {
    const g_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("background", g_r6.value === "ea_fc25" ? "#00e05a" : g_r6.value === "pubg_mobile" ? "#f5b942" : "#ff4d4d");
  }
}
function TournamentsComponent_For_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function TournamentsComponent_For_74_Template_button_click_0_listener() {
      const g_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("game", g_r6.value));
    });
    \u0275\u0275template(1, TournamentsComponent_For_74_Conditional_1_Template, 1, 2, "span", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 70);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--chip-color", g_r6.value === "ea_fc25" ? "#00e05a" : g_r6.value === "pubg_mobile" ? "#f5b942" : g_r6.value === "cod_mobile" ? "#ff4d4d" : null);
    \u0275\u0275classProp("active", ctx_r1.filter.game() === g_r6.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, g_r6.value ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", g_r6.short || g_r6.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.gameCount(g_r6.value));
  }
}
function TournamentsComponent_For_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function TournamentsComponent_For_78_Template_button_click_0_listener() {
      const f_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("format", f_r8.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.filter.format() === f_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r8.value ? f_r8.label : "All formats", " ");
  }
}
function TournamentsComponent_For_82_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 72);
  }
}
function TournamentsComponent_For_82_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 73);
  }
}
function TournamentsComponent_For_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function TournamentsComponent_For_82_Template_button_click_0_listener() {
      const s_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("status", s_r10.value));
    });
    \u0275\u0275template(1, TournamentsComponent_For_82_Conditional_1_Template, 1, 0, "span", 72)(2, TournamentsComponent_For_82_Conditional_2_Template, 1, 0, "span", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 70);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.filter.status() === s_r10.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, s_r10.value === "live" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, s_r10.value === "open" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r10.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.statusCount(s_r10.value));
  }
}
function TournamentsComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "div", 50);
    \u0275\u0275elementStart(1, "button", 74);
    \u0275\u0275listener("click", function TournamentsComponent_Conditional_83_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.search.set("");
      ctx_r1.setFilter("game", "");
      ctx_r1.setFilter("format", "");
      return \u0275\u0275resetView(ctx_r1.setFilter("status", ""));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 75);
    \u0275\u0275element(3, "line", 63)(4, "line", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Clear ");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " results ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.filtered().length);
  }
}
function TournamentsComponent_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function TournamentsComponent_Conditional_86_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 76);
  }
}
function TournamentsComponent_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275repeaterCreate(1, TournamentsComponent_Conditional_86_For_2_Template, 1, 0, "div", 76, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function TournamentsComponent_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 77);
    \u0275\u0275text(2, "\u2205");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 78);
    \u0275\u0275text(4, "No tournaments match");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 79);
    \u0275\u0275text(6, " Try adjusting your filters or search \u2014 new tournaments go live every week. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 80);
    \u0275\u0275listener("click", function TournamentsComponent_Conditional_87_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.search.set("");
      ctx_r1.setFilter("game", "");
      ctx_r1.setFilter("format", "");
      return \u0275\u0275resetView(ctx_r1.setFilter("status", ""));
    });
    \u0275\u0275text(8, " Clear all filters ");
    \u0275\u0275elementEnd()();
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275element(1, "img", 91)(2, "div", 92);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", t_r13.image_url, \u0275\u0275sanitizeUrl)("alt", t_r13.brand_name || t_r13.title);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "div", 94);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((t_r13.brand_name || t_r13.title).charAt(0));
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r13.brand_name);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r13.title_ar);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 95);
    \u0275\u0275listener("click", function TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_11_Template_a_click_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("href", t_r13.link_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r13.cta_label || "Learn More", " \u2192 ");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 83);
    \u0275\u0275text(2, "Sponsored");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_3_Template, 3, 2, "div", 84)(4, TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_4_Template, 3, 1);
    \u0275\u0275elementStart(5, "div", 85);
    \u0275\u0275template(6, TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_6_Template, 2, 1, "div", 86);
    \u0275\u0275elementStart(7, "div", 87);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_9_Template, 2, 1, "div", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 89);
    \u0275\u0275template(11, TournamentsComponent_Conditional_88_For_2_Conditional_0_Conditional_11_Template, 2, 2, "a", 90);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("--ad-accent", t_r13.brand_color || "#f0a500");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, t_r13.image_url ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(6, t_r13.brand_name ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r13.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, t_r13.title_ar ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, t_r13.link_url ? 11 : -1);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 97);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 115);
    \u0275\u0275element(2, "polygon", 116);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Promoted ");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 91);
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("src", t_r13.cover_image_url, \u0275\u0275sanitizeUrl)("alt", t_r13.name);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 91);
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.gameImage(t_r13.game), \u0275\u0275sanitizeUrl)("alt", t_r13.game_label);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 117);
    \u0275\u0275element(1, "span", 118);
    \u0275\u0275text(2, "Live ");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 119);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 120);
    \u0275\u0275element(2, "polyline", 121)(3, "path", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Open ");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 120);
    \u0275\u0275element(2, "polyline", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Done ");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 125);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r13.status_label || "Soon");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 126);
    \u0275\u0275text(1, "by");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", t_r13.organizer_name || (t_r13.organizer == null ? null : t_r13.organizer.name), " ");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 126);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r13.game_label);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 102);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.statusGroup(t_r13.status) === "completed" ? "Ended" : "Starts", " ", \u0275\u0275pipeBind2(2, 2, t_r13.starts_at, "d MMM"), " ");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r13.name_ar);
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 127)(3, "path", 128)(4, "path", 129)(5, "path", 130)(6, "path", 131)(7, "path", 132);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Win ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " in prizes ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r1.prizeLabel(t_r13), " SAR");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 133);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "rect", 134)(3, "line", 135);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Free to enter ");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 136);
    \u0275\u0275element(1, "circle", 137);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Watch Live ");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " View Results ");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Register Now ");
  }
}
function TournamentsComponent_Conditional_88_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 96);
    \u0275\u0275template(1, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_1_Template, 4, 0, "div", 97);
    \u0275\u0275elementStart(2, "div", 98);
    \u0275\u0275template(3, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_3_Template, 1, 2, "img", 91)(4, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_4_Template, 1, 2);
    \u0275\u0275element(5, "div", 99);
    \u0275\u0275template(6, TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_6_Template, 3, 0)(7, TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_7_Template, 5, 0)(8, TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_8_Template, 4, 0)(9, TournamentsComponent_Conditional_88_For_2_Conditional_1_Case_9_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 100)(11, "span", 101);
    \u0275\u0275template(12, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_12_Template, 3, 1)(13, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_13_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_14_Template, 3, 5, "span", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 103)(16, "div", 104);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 105);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_20_Template, 2, 1, "div", 106)(21, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_21_Template, 12, 1, "div", 107)(22, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_22_Template, 5, 0);
    \u0275\u0275elementStart(23, "div", 108)(24, "div", 109);
    \u0275\u0275element(25, "div", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 111)(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 112)(31, "span", 113);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 114);
    \u0275\u0275template(34, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_34_Template, 3, 0)(35, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_35_Template, 1, 0)(36, TournamentsComponent_Conditional_88_For_2_Conditional_1_Conditional_36_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const t_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("card--promoted", ctx_r1.isPromoted(t_r13.id));
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(29, _c1, t_r13.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.isPromoted(t_r13.id) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--accent", ctx_r1.gameAccent(t_r13.game));
    \u0275\u0275advance();
    \u0275\u0275conditional(3, t_r13.cover_image_url ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(6, (tmp_17_0 = ctx_r1.statusGroup(t_r13.status)) === "live" ? 6 : tmp_17_0 === "open" ? 7 : tmp_17_0 === "completed" ? 8 : 9);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(12, t_r13.organizer_name || (t_r13.organizer == null ? null : t_r13.organizer.name) ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(14, t_r13.starts_at ? 14 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", t_r13.game_label, " \xB7 ", t_r13.format_label, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r13.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(20, t_r13.name_ar ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, ctx_r1.prizeTotal(t_r13) > 0 ? 21 : 22);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r1.progressPct(t_r13), "%");
    \u0275\u0275classProp("card-slots__fill--full", ctx_r1.progressPct(t_r13) >= 100);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r13.participant_count || 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("/", t_r13.max_participants, " slots");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("card-fee--free", t_r13.entry_fee_sar === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r13.entry_fee_sar === 0 ? "FREE" : t_r13.entry_fee_sar + " SAR", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("card-cta--live", ctx_r1.statusGroup(t_r13.status) === "live")("card-cta--done", ctx_r1.statusGroup(t_r13.status) === "completed");
    \u0275\u0275advance();
    \u0275\u0275conditional(34, ctx_r1.statusGroup(t_r13.status) === "live" ? 34 : ctx_r1.statusGroup(t_r13.status) === "completed" ? 35 : 36);
  }
}
function TournamentsComponent_Conditional_88_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentsComponent_Conditional_88_For_2_Conditional_0_Template, 12, 7, "div", 81)(1, TournamentsComponent_Conditional_88_For_2_Conditional_1_Template, 37, 31);
  }
  if (rf & 2) {
    const t_r13 = ctx.$implicit;
    \u0275\u0275conditional(0, t_r13.__adCard ? 0 : 1);
  }
}
function TournamentsComponent_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275repeaterCreate(1, TournamentsComponent_Conditional_88_For_2_Template, 2, 1, null, null, \u0275\u0275componentInstance().trackItem, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredWithAdsComputed());
  }
}
function TournamentsComponent_Conditional_89_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const t_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 by ", t_r15.organizer_name || (t_r15.organizer == null ? null : t_r15.organizer.name), " ");
  }
}
function TournamentsComponent_Conditional_89_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 153);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 154);
    \u0275\u0275text(3, "SAR pool");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.prizeLabel(t_r15));
  }
}
function TournamentsComponent_Conditional_89_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 154);
    \u0275\u0275text(1, "No prize pool");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_89_For_2_Case_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 155);
    \u0275\u0275element(1, "span", 118);
    \u0275\u0275text(2, "Live");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_89_For_2_Case_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 156);
    \u0275\u0275text(1, "Open");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_89_For_2_Case_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 157);
    \u0275\u0275text(1, "Done");
    \u0275\u0275elementEnd();
  }
}
function TournamentsComponent_Conditional_89_For_2_Case_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r15.status_label || t_r15.status);
  }
}
function TournamentsComponent_Conditional_89_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 139)(1, "div", 140);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 141)(4, "div", 142);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 143);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275template(9, TournamentsComponent_Conditional_89_For_2_Conditional_9_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 144);
    \u0275\u0275template(11, TournamentsComponent_Conditional_89_For_2_Conditional_11_Template, 4, 1)(12, TournamentsComponent_Conditional_89_For_2_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 145)(14, "div", 146)(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 147);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 148);
    \u0275\u0275element(20, "div", 149);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 150);
    \u0275\u0275template(22, TournamentsComponent_Conditional_89_For_2_Case_22_Template, 3, 0)(23, TournamentsComponent_Conditional_89_For_2_Case_23_Template, 2, 0)(24, TournamentsComponent_Conditional_89_For_2_Case_24_Template, 2, 0)(25, TournamentsComponent_Conditional_89_For_2_Case_25_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 151)(27, "span", 152);
    \u0275\u0275text(28, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_21_0;
    const t_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("row " + t_r15.game);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(19, _c1, t_r15.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.gameShort(t_r15.game));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r15.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", t_r15.game_label, " \xB7 ", t_r15.format_label, " \xB7 ", \u0275\u0275pipeBind2(8, 16, t_r15.starts_at, "d MMM \xB7 HH:mm"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, t_r15.organizer_name || (t_r15.organizer == null ? null : t_r15.organizer.name) ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, ctx_r1.prizeTotal(t_r15) > 0 ? 11 : 12);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", t_r15.participant_count || 0, "/", t_r15.max_participants, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.progressPct(t_r15), "%");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.progressPct(t_r15), "%");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(22, (tmp_21_0 = ctx_r1.statusGroup(t_r15.status)) === "live" ? 22 : tmp_21_0 === "open" ? 23 : tmp_21_0 === "completed" ? 24 : 25);
  }
}
function TournamentsComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275repeaterCreate(1, TournamentsComponent_Conditional_89_For_2_Template, 29, 21, "a", 138, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filtered());
  }
}
function TournamentsComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275element(1, "app-platform-sponsors-strip", 159);
    \u0275\u0275elementEnd();
  }
}
var TournamentsComponent = class _TournamentsComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.api = inject(ApiService);
    this.fb = inject(FormBuilder);
    this.loading = signal(true);
    this.error = signal(null);
    this.items = signal([]);
    this.search = signal("");
    this.searchInput$ = new Subject();
    this.destroy$ = new Subject();
    this.view = signal("grid");
    this.sort = signal("starting_soon");
    this.games = [
      { value: "", label: "All Games", short: "All" },
      { value: "ea_fc25", label: "EA FC 25", short: "FC" },
      { value: "pubg_mobile", label: "PUBG Mobile", short: "PB" },
      { value: "cod_mobile", label: "CoD Mobile", short: "CD" }
    ];
    this.formats = [
      { value: "", label: "All Formats" },
      { value: "single_elimination", label: "Single Elim" },
      { value: "double_elimination", label: "Double Elim" },
      { value: "round_robin", label: "Round Robin" },
      { value: "swiss", label: "Swiss" }
    ];
    this.statuses = [
      { value: "", label: "All", match: [] },
      { value: "live", label: "Live", match: ["ongoing", "in_progress"] },
      { value: "open", label: "Open", match: ["registration", "registration_open"] },
      { value: "completed", label: "Completed", match: ["completed"] }
    ];
    this.sortOptions = [
      { value: "starting_soon", label: "Sort: Starting soon" },
      { value: "prize_high", label: "Sort: Highest prize" },
      { value: "popular", label: "Sort: Most popular" },
      { value: "newest", label: "Sort: Newest" }
    ];
    this.showMine = signal(false);
    this.filter = {
      game: signal(""),
      format: signal(""),
      status: signal("")
    };
    this.filtered = computed(() => {
      const s = this.search().trim().toLowerCase();
      const g = this.filter.game();
      const f = this.filter.format();
      const st = this.filter.status();
      const stMatches = st ? this.statuses.find((x) => x.value === st)?.match ?? [] : [];
      const mine = this.showMine();
      const userId = this.auth.currentUser()?.id;
      const list = this.items().filter((t) => {
        if (mine && userId) {
          const isOrg = String(t.organizer_id) === String(userId) || String(t.organizer?.id) === String(userId);
          const isParticipant = t.is_registered;
          if (!isOrg && !isParticipant)
            return false;
        }
        if (s && !`${t.name} ${t.name_ar ?? ""}`.toLowerCase().includes(s))
          return false;
        if (g && t.game !== g)
          return false;
        if (f && t.format !== f)
          return false;
        if (stMatches.length && !stMatches.includes(t.status))
          return false;
        return true;
      });
      const now = Date.now();
      const sorted = [...list];
      switch (this.sort()) {
        case "prize_high":
          sorted.sort((a, b) => this.prizeTotal(b) - this.prizeTotal(a));
          break;
        case "popular":
          sorted.sort((a, b) => (b.participant_count ?? 0) - (a.participant_count ?? 0));
          break;
        case "newest":
          sorted.sort((a, b) => new Date(b.created_at ?? b.starts_at ?? 0).getTime() - new Date(a.created_at ?? a.starts_at ?? 0).getTime());
          break;
        case "starting_soon":
        default:
          sorted.sort((a, b) => {
            const ta = new Date(a.starts_at ?? 0).getTime();
            const tb = new Date(b.starts_at ?? 0).getTime();
            const aUpcoming = ta > now;
            const bUpcoming = tb > now;
            if (aUpcoming && !bUpcoming)
              return -1;
            if (!aUpcoming && bUpcoming)
              return 1;
            return aUpcoming ? ta - tb : tb - ta;
          });
      }
      return sorted;
    });
    this.liveCount = computed(() => this.items().filter((t) => ["ongoing", "in_progress"].includes(t.status)).length);
    this.openCount = computed(() => this.items().filter((t) => ["registration", "registration_open"].includes(t.status)).length);
    this.totalCount = computed(() => this.items().length);
    this.payoutsTotal = computed(() => {
      const sar = this.items().reduce((sum, t) => sum + this.prizeTotal(t), 0);
      if (sar >= 1e6)
        return (sar / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
      if (sar >= 1e3)
        return (sar / 1e3).toFixed(0) + "K";
      return String(sar);
    });
    this.gameCountMap = computed(() => {
      const items = this.items();
      const map = { "": items.length };
      for (const t of items) {
        map[t.game] = (map[t.game] ?? 0) + 1;
      }
      return map;
    });
    this.statusCountMap = computed(() => {
      const items = this.items();
      const map = { "": items.length };
      for (const s of this.statuses) {
        if (s.match.length) {
          map[s.value] = items.filter((t) => s.match.includes(t.status)).length;
        }
      }
      return map;
    });
    this.filteredWithAdsComputed = computed(() => {
      const items = this.filtered();
      const sponsors = this.sponsorCards();
      if (!sponsors.length)
        return items;
      const result = [];
      let si = 0;
      items.forEach((item, i) => {
        result.push(item);
        if ((i + 1) % 2 === 0 && si < sponsors.length) {
          result.push(__spreadValues({ __adCard: true }, sponsors[si++]));
        }
      });
      return result;
    });
    this.canCreate = computed(() => {
      const role = this.auth.currentUser()?.role ?? "";
      return role === "organizer" || role === "admin";
    });
    this.sponsorCards = signal([]);
    this.promotedIds = signal(/* @__PURE__ */ new Set());
  }
  gameCount(value) {
    return this.gameCountMap()[value] ?? 0;
  }
  statusCount(value) {
    return this.statusCountMap()[value] ?? 0;
  }
  loadAdPlacements() {
    forkJoin({
      grid: this.api.getAdPlacements("in_grid_sponsor"),
      promoted: this.api.getAdPlacements("promoted_tournament")
    }).subscribe({
      next: ({ grid, promoted }) => {
        this.sponsorCards.set(grid.data ?? []);
        const ids = new Set((promoted.data ?? []).map((p) => p.tournament_id).filter(Boolean));
        this.promotedIds.set(ids);
      },
      error: () => {
      }
    });
  }
  isPromoted(id) {
    return this.promotedIds().has(id);
  }
  /** @deprecated Use filteredWithAdsComputed signal instead */
  filteredWithAds() {
    return this.filteredWithAdsComputed();
  }
  trackItem(_, item) {
    return item.__adCard ? "ad-" + item.id : item.id;
  }
  ngOnInit() {
    this.searchInput$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((v) => this.search.set(v));
    this.loadAdPlacements();
    this.loading.set(true);
    this.api.getTournaments({}).subscribe({
      next: (res) => {
        this.items.set(res.data ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? "Failed to load tournaments.");
        this.loading.set(false);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /** Called from the search input (input) event — feeds the debounce pipe. */
  onSearchInput(value) {
    this.searchInput$.next(value);
  }
  setFilter(key, value) {
    this.filter[key].set(value);
  }
  setView(v) {
    this.view.set(v);
  }
  setSort(v) {
    this.sort.set(v);
  }
  toggleMine() {
    this.showMine.set(!this.showMine());
  }
  /** Prize pool total in SAR — supports prize_pool: [{amount}], prize_pool_sar: number, prize_pool_total. */
  prizeTotal(t) {
    if (typeof t?.prize_pool_sar === "number")
      return t.prize_pool_sar;
    if (typeof t?.prize_pool_total === "number")
      return t.prize_pool_total;
    if (Array.isArray(t?.prize_pool)) {
      return t.prize_pool.reduce((sum, p) => sum + (p?.amount ?? 0), 0);
    }
    return 0;
  }
  /** Short prize string e.g. "15,000 SAR" or "—". */
  prizeLabel(t) {
    const total = this.prizeTotal(t);
    return total > 0 ? `${total.toLocaleString("en-US")}` : "\u2014";
  }
  /** Participation progress 0..100. */
  progressPct(t) {
    const filled = t?.participant_count ?? 0;
    const max = t?.max_participants ?? 0;
    if (!max)
      return 0;
    return Math.max(0, Math.min(100, Math.round(filled / max * 100)));
  }
  /** Status group used by template: 'live' | 'open' | 'completed' | 'draft'. */
  statusGroup(s) {
    if (["ongoing", "in_progress"].includes(s))
      return "live";
    if (["registration", "registration_open"].includes(s))
      return "open";
    if (s === "completed")
      return "completed";
    return "draft";
  }
  /** Short two-letter game code for the cover glyph. */
  gameImage(g) {
    const map = {
      ea_fc25: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8pxf.jpg",
      pubg_mobile: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scnwp6.jpg",
      cod_mobile: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc5vff.jpg"
    };
    return map[g] ?? "";
  }
  gameAccent(g) {
    const map = {
      ea_fc25: "#00d473",
      pubg_mobile: "#f5b942",
      cod_mobile: "#ff4444"
    };
    return map[g] ?? "#f0a500";
  }
  gameShort(g) {
    return this.games.find((x) => x.value === g)?.short ?? "\xB7";
  }
  /** "Closes in N days" / "Closes in N hours" / "Starting soon". */
  closesIn(t) {
    if (!t?.registration_closes_at && !t?.starts_at)
      return "";
    const target = new Date(t.registration_closes_at ?? t.starts_at).getTime();
    const diffMs = target - Date.now();
    if (diffMs <= 0)
      return "Registration closed";
    const days = Math.floor(diffMs / 864e5);
    const hours = Math.floor(diffMs / 36e5);
    if (days >= 2)
      return `Closes in ${days} days`;
    if (hours >= 1)
      return `Closes in ${hours} hours`;
    return "Closes soon";
  }
  /** Whether closing soon (<2 days) — used to colour the foot-time red. */
  isUrgent(t) {
    if (!t?.registration_closes_at && !t?.starts_at)
      return false;
    const target = new Date(t.registration_closes_at ?? t.starts_at).getTime();
    const diffMs = target - Date.now();
    return diffMs > 0 && diffMs < 2 * 864e5;
  }
  static {
    this.\u0275fac = function TournamentsComponent_Factory(t) {
      return new (t || _TournamentsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TournamentsComponent, selectors: [["app-tournaments"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 91, vars: 21, consts: [[1, "tournaments-page"], [1, "page-head"], [1, "page-head-inner"], [1, "eyebrow"], [1, "page-title"], [1, "page-lede"], [1, "page-actions"], ["routerLink", "/leaderboard", 1, "btn", "btn-ghost"], ["routerLink", "/tournaments/create", 1, "btn", "btn-primary"], [1, "counters"], [1, "counters-grid"], [1, "counter"], [1, "counter-n", "live"], [1, "counter-l"], [1, "counter-n"], ["role", "search", "aria-label", "Tournament filters", 1, "filter-panel"], [1, "fp-top"], [1, "fp-search"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "fp-search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "text", "placeholder", "Search by name, organizer\u2026", "aria-label", "Search tournaments", 1, "fp-input", 3, "input", "value"], ["aria-label", "Clear search", 1, "fp-clear-input"], [1, "fp-controls"], ["type", "button", "title", "Show only my tournaments", 1, "fp-mine", 3, "active"], [1, "fp-sort-wrap"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "21", "y1", "10", "x2", "3", "y2", "10"], ["x1", "21", "y1", "6", "x2", "3", "y2", "6"], ["x1", "21", "y1", "14", "x2", "3", "y2", "14"], ["x1", "21", "y1", "18", "x2", "3", "y2", "18"], ["aria-label", "Sort tournaments", 1, "fp-sort", 3, "change", "value"], [3, "value"], ["role", "group", "aria-label", "View mode", 1, "fp-view"], ["type", "button", "title", "Grid view", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], ["type", "button", "title", "List view", 3, "click"], ["x1", "8", "y1", "6", "x2", "21", "y2", "6"], ["x1", "8", "y1", "12", "x2", "21", "y2", "12"], ["x1", "8", "y1", "18", "x2", "21", "y2", "18"], ["x1", "3", "y1", "6", "x2", "3.01", "y2", "6"], ["x1", "3", "y1", "12", "x2", "3.01", "y2", "12"], ["x1", "3", "y1", "18", "x2", "3.01", "y2", "18"], [1, "fp-chips"], ["role", "group", "aria-label", "Filter by game", 1, "fp-chip-group"], ["type", "button", 1, "fp-chip", 3, "active", "--chip-color"], ["aria-hidden", "true", 1, "fp-sep"], ["role", "group", "aria-label", "Filter by format", 1, "fp-chip-group"], ["type", "button", 1, "fp-chip", 3, "active"], ["role", "group", "aria-label", "Filter by status", 1, "fp-chip-group"], [1, "fp-result-count"], [1, "error-box"], [1, "grid"], [1, "empty"], [1, "list"], [2, "margin-top", "40px", "border-top", "1px solid var(--line)"], ["routerLink", "/auth", 1, "btn", "btn-primary"], ["aria-label", "Clear search", 1, "fp-clear-input", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["type", "button", "title", "Show only my tournaments", 1, "fp-mine", 3, "click"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], ["type", "button", 1, "fp-chip", 3, "click"], [1, "fp-chip-dot", 3, "background"], [1, "fp-chip-count"], [1, "fp-chip-dot"], [1, "fp-live-dot"], [1, "fp-open-dot"], ["type", "button", 1, "fp-clear-all", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], [1, "skeleton"], [1, "empty-glyph"], [1, "empty-title"], [1, "empty-sub"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "ad-card", 3, "--ad-accent"], [1, "ad-card"], [1, "ad-card__sponsored"], [1, "ad-card__art"], [1, "ad-card__body"], [1, "ad-card__brand"], [1, "ad-card__title"], ["dir", "rtl", 1, "ad-card__title-ar"], [1, "ad-card__foot"], ["target", "_blank", "rel", "noopener", 1, "ad-card__cta", 3, "href"], ["loading", "lazy", 3, "src", "alt"], [1, "ad-card__art-fade"], [1, "ad-card__art", "ad-card__art--placeholder"], [1, "ad-card__brand-initial"], ["target", "_blank", "rel", "noopener", 1, "ad-card__cta", 3, "click", "href"], [1, "card", 3, "routerLink"], [1, "promoted-badge"], [1, "card-art"], [1, "card-art__fade"], [1, "card-strip"], [1, "card-strip__org"], [1, "card-strip__date"], [1, "card-body"], [1, "card-game-line"], [1, "card-name"], ["dir", "rtl", 1, "card-name-ar"], [1, "card-reward"], [1, "card-slots"], [1, "card-slots__bar"], [1, "card-slots__fill"], [1, "card-slots__label"], [1, "card-actions"], [1, "card-fee"], [1, "card-cta"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "currentColor"], ["points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"], [1, "card-badge", "card-badge--live"], [1, "dot"], [1, "card-badge", "card-badge--open"], ["width", "9", "height", "9", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "9 11 12 14 22 4"], ["d", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"], [1, "card-badge", "card-badge--done"], ["points", "20 6 9 17 4 12"], [1, "card-badge", "card-badge--soon"], [1, "card-strip__by"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"], [1, "card-reward", "card-reward--free"], ["width", "20", "height", "14", "x", "2", "y", "5", "rx", "2"], ["x1", "2", "y1", "10", "x2", "22", "y2", "10"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "currentColor"], ["cx", "12", "cy", "12", "r", "10"], [1, "row", 3, "class", "routerLink"], [1, "row", 3, "routerLink"], [1, "row-glyph"], [1, "row-main"], [1, "row-title"], [1, "row-sub"], [1, "row-prize"], [1, "row-fill"], [1, "row-fill-row"], [2, "color", "var(--text-mute)"], [1, "progress-bar"], [1, "progress-fill"], [1, "row-status"], [1, "row-cta"], [1, "arrow"], [1, "row-prize-n"], [1, "row-prize-l"], [1, "card-status", "live"], [1, "card-status", "open"], [1, "card-status", "completed"], [1, "card-status", "draft"], ["variant", "compact"]], template: function TournamentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "div")(4, "div", 3);
        \u0275\u0275text(5, "Browse \xB7 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u0637\u0648\u0644\u0627\u062A");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "h1", 4);
        \u0275\u0275text(7, "Tournaments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9, " Open registrations, live brackets, and recently completed events across EA FC 25, PUBG Mobile, and Call of Duty Mobile. Filter by game, format, or status to find your next match. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 6)(11, "a", 7);
        \u0275\u0275text(12, "View Leaderboard \u2192");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, TournamentsComponent_Conditional_13_Template, 2, 0, "a", 8)(14, TournamentsComponent_Conditional_14_Template, 2, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(15, "section", 9)(16, "div", 10)(17, "div", 11)(18, "span", 12);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "span", 13);
        \u0275\u0275text(21, "Live now");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 11)(23, "span", 14);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "span", 13);
        \u0275\u0275text(26, "Open registration");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 11)(28, "span", 14);
        \u0275\u0275text(29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span", 13);
        \u0275\u0275text(31, "All time");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 11)(33, "span", 14);
        \u0275\u0275text(34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 13);
        \u0275\u0275text(36, "SAR in prizes");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(37, "div", 15)(38, "div", 16)(39, "div", 17);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(40, "svg", 18);
        \u0275\u0275element(41, "circle", 19)(42, "path", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(43, "input", 21);
        \u0275\u0275listener("input", function TournamentsComponent_Template_input_input_43_listener($event) {
          return ctx.onSearchInput($event.target.value);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(44, TournamentsComponent_Conditional_44_Template, 4, 0, "button", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "div", 23);
        \u0275\u0275template(46, TournamentsComponent_Conditional_46_Template, 5, 2, "button", 24);
        \u0275\u0275elementStart(47, "div", 25);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(48, "svg", 26);
        \u0275\u0275element(49, "line", 27)(50, "line", 28)(51, "line", 29)(52, "line", 30);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(53, "select", 31);
        \u0275\u0275listener("change", function TournamentsComponent_Template_select_change_53_listener($event) {
          return ctx.setSort($event.target.value);
        });
        \u0275\u0275repeaterCreate(54, TournamentsComponent_For_55_Template, 2, 2, "option", 32, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "div", 33)(57, "button", 34);
        \u0275\u0275listener("click", function TournamentsComponent_Template_button_click_57_listener() {
          return ctx.setView("grid");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(58, "svg", 35);
        \u0275\u0275element(59, "rect", 36)(60, "rect", 37)(61, "rect", 38)(62, "rect", 39);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(63, "button", 40);
        \u0275\u0275listener("click", function TournamentsComponent_Template_button_click_63_listener() {
          return ctx.setView("list");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(64, "svg", 35);
        \u0275\u0275element(65, "line", 41)(66, "line", 42)(67, "line", 43)(68, "line", 44)(69, "line", 45)(70, "line", 46);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(71, "div", 47)(72, "div", 48);
        \u0275\u0275repeaterCreate(73, TournamentsComponent_For_74_Template, 5, 7, "button", 49, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275element(75, "div", 50);
        \u0275\u0275elementStart(76, "div", 51);
        \u0275\u0275repeaterCreate(77, TournamentsComponent_For_78_Template, 2, 3, "button", 52, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275element(79, "div", 50);
        \u0275\u0275elementStart(80, "div", 53);
        \u0275\u0275repeaterCreate(81, TournamentsComponent_For_82_Template, 6, 6, "button", 52, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275template(83, TournamentsComponent_Conditional_83_Template, 6, 0)(84, TournamentsComponent_Conditional_84_Template, 4, 1, "span", 54);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(85, TournamentsComponent_Conditional_85_Template, 2, 1, "div", 55)(86, TournamentsComponent_Conditional_86_Template, 3, 1, "div", 56)(87, TournamentsComponent_Conditional_87_Template, 9, 0, "div", 57)(88, TournamentsComponent_Conditional_88_Template, 3, 0, "div", 56)(89, TournamentsComponent_Conditional_89_Template, 3, 0, "div", 58)(90, TournamentsComponent_Conditional_90_Template, 2, 0, "div", 59);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275conditional(13, ctx.canCreate() ? 13 : !ctx.auth.isLoggedIn() ? 14 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.liveCount());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.openCount());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.totalCount());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.payoutsTotal());
        \u0275\u0275advance(9);
        \u0275\u0275property("value", ctx.search());
        \u0275\u0275advance();
        \u0275\u0275conditional(44, ctx.search() ? 44 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(46, ctx.auth.isLoggedIn() ? 46 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275property("value", ctx.sort());
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.sortOptions);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.view() === "grid");
        \u0275\u0275advance(6);
        \u0275\u0275classProp("active", ctx.view() === "list");
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.games);
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.formats);
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.statuses);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(83, ctx.filter.game() || ctx.filter.format() || ctx.filter.status() || ctx.search() ? 83 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(84, !ctx.loading() && !ctx.error() ? 84 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(85, ctx.error() ? 85 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(86, ctx.loading() ? 86 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(87, !ctx.loading() && !ctx.error() && ctx.filtered().length === 0 ? 87 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(88, !ctx.loading() && !ctx.error() && ctx.view() === "grid" && ctx.filteredWithAdsComputed().length > 0 ? 88 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(89, !ctx.loading() && !ctx.error() && ctx.view() === "list" && ctx.filtered().length > 0 ? 89 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(90, ctx.sponsorCards().length > 0 ? 90 : -1);
      }
    }, dependencies: [CommonModule, DatePipe, ReactiveFormsModule, NgSelectOption, \u0275NgSelectMultipleOption, FormsModule, RouterLink, PlatformSponsorsStripComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  --gutter: 32px;\n  --maxw: 1440px;\n  --line: var(--br);\n  --line-2: var(--br2);\n  --text-dim: var(--mu);\n  --text-mute: var(--dim);\n  --good: var(--green);\n  --live-clr: var(--red, #f87171);\n  --display: var(--fh);\n  --body: var(--fb);\n  --mono: var(--fm);\n}\n.tournaments-page[_ngcontent-%COMP%] {\n  background: var(--bg);\n  min-height: 100vh;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.35;\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmerSkel {\n  from {\n    background-position: 200% 0;\n  }\n  to {\n    background-position: -200% 0;\n  }\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: var(--r);\n  font-family: var(--body);\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.2px;\n  border: 1px solid transparent;\n  text-decoration: none;\n  cursor: pointer;\n  transition:\n    transform 0.18s,\n    background 0.18s,\n    border-color 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #1a1100;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--line-2);\n  color: var(--text);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  border-color: var(--text);\n  background: rgba(255, 255, 255, 0.04);\n}\n.page-head[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 80px var(--gutter) 50px;\n  max-width: 100%;\n  background:\n    radial-gradient(\n      ellipse 80% 100% at 20% 50%,\n      rgba(0, 108, 53, 0.1) 0%,\n      transparent 60%),\n    radial-gradient(\n      ellipse 60% 80% at 90% 20%,\n      rgba(212, 175, 55, 0.07) 0%,\n      transparent 50%),\n    var(--bg2);\n  border-bottom: 1px solid var(--line);\n}\n.page-head[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.04) 1px,\n      transparent 1px);\n  background-size: 60px 60px;\n  mask-image:\n    radial-gradient(\n      ellipse 80% 100% at 20% 50%,\n      #000 30%,\n      transparent 80%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 80% 100% at 20% 50%,\n      #000 30%,\n      transparent 80%);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_thGridDrift 18s linear infinite;\n}\n.page-head[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  z-index: 0;\n  pointer-events: none;\n  width: 520px;\n  height: 520px;\n  border-radius: 50%;\n  top: -180px;\n  right: 8%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(46, 139, 255, 0.18) 0%,\n      rgba(46, 139, 255, 0) 65%);\n  filter: blur(40px);\n  animation: _ngcontent-%COMP%_thOrbFloat 20s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_thGridDrift {\n  from {\n    background-position: 0 0;\n  }\n  to {\n    background-position: 60px 60px;\n  }\n}\n@keyframes _ngcontent-%COMP%_thOrbFloat {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(-50px, 40px) scale(1.1);\n  }\n}\n.page-head-inner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: var(--maxw);\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 40px;\n  align-items: end;\n}\n@media (max-width: 800px) {\n  .page-head-inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent);\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.eyebrow[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 28px;\n  height: 1px;\n  background: var(--accent);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(48px, 8vw, 112px);\n  line-height: 0.9;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n  color: var(--text);\n}\n.page-lede[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 16px;\n  line-height: 1.6;\n  max-width: 56ch;\n}\n.page-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.counters[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 0 var(--gutter);\n}\n.counters-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  border-top: 1px solid var(--line);\n  border-bottom: 1px solid var(--line);\n}\n@media (max-width: 720px) {\n  .counters-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .counters-grid[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]:nth-child(2) {\n    border-right: none;\n  }\n  .counters-grid[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]:nth-child(1), .counters-grid[_ngcontent-%COMP%]   .counter[_ngcontent-%COMP%]:nth-child(2) {\n    border-bottom: 1px solid var(--line);\n  }\n}\n.counter[_ngcontent-%COMP%] {\n  padding: 22px 24px;\n  border-right: 1px solid var(--line);\n  display: flex;\n  align-items: baseline;\n  gap: 14px;\n}\n.counter[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n.counter-n[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 36px;\n  line-height: 1;\n  color: var(--text);\n}\n.counter-n.live[_ngcontent-%COMP%] {\n  color: var(--live-clr);\n}\n.counter-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n}\n.filter-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 60px;\n  z-index: 100;\n  background: rgba(10, 10, 18, 0.92);\n  -webkit-backdrop-filter: blur(16px);\n  backdrop-filter: blur(16px);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);\n}\n.fp-top[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 14px var(--gutter);\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.fp-search[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  flex: 1;\n  min-width: 0;\n}\n.fp-search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 13px;\n  color: var(--text-mute);\n  pointer-events: none;\n  flex-shrink: 0;\n}\n.fp-input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 9px;\n  padding: 10px 36px 10px 40px;\n  color: var(--text);\n  font-family: var(--body);\n  font-size: 13px;\n  outline: none;\n  transition:\n    border-color 0.18s,\n    box-shadow 0.18s,\n    background 0.18s;\n}\n.fp-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-mute);\n}\n.fp-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.12);\n  background: rgba(255, 255, 255, 0.07);\n}\n.fp-clear-input[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--text-mute);\n  display: grid;\n  place-items: center;\n  padding: 4px;\n  border-radius: 4px;\n  transition: color 0.15s, background 0.15s;\n}\n.fp-clear-input[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n  background: rgba(255, 255, 255, 0.08);\n}\n.fp-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.fp-mine[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 13px;\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 12px;\n  font-family: var(--body);\n  color: var(--text-dim);\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n.fp-mine[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.fp-mine.active[_ngcontent-%COMP%] {\n  border-color: var(--accent);\n  color: var(--accent);\n  background: rgba(212, 175, 55, 0.1);\n}\n.fp-mine[_ngcontent-%COMP%]:hover:not(.active) {\n  border-color: rgba(255, 255, 255, 0.2);\n  color: var(--text);\n}\n.fp-sort-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 0 4px 0 10px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 8px;\n  color: var(--text-mute);\n}\n.fp-sort[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  outline: none;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  cursor: pointer;\n  padding: 8px 8px 8px 0;\n}\n.fp-sort[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: #111827;\n}\n.fp-view[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  padding: 3px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 8px;\n}\n.fp-view[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  border-radius: 6px;\n  cursor: pointer;\n  color: var(--text-mute);\n  display: grid;\n  place-items: center;\n  transition: background 0.15s, color 0.15s;\n}\n.fp-view[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.12);\n  color: var(--text);\n}\n.fp-view[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(.active) {\n  color: var(--text);\n}\n.fp-chips[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 10px var(--gutter);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.fp-chip-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.fp-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 11px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.09);\n  border-radius: 7px;\n  font-size: 12px;\n  font-family: var(--body);\n  color: #9ca3af;\n  cursor: pointer;\n  white-space: nowrap;\n  transition:\n    background 0.14s,\n    border-color 0.14s,\n    color 0.14s,\n    box-shadow 0.14s,\n    transform 0.14s;\n}\n.fp-chip[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.09);\n  border-color: rgba(255, 255, 255, 0.2);\n  color: #fff;\n  transform: translateY(-1px);\n}\n.fp-chip.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  border-color: var(--accent);\n  color: var(--accent);\n  font-weight: 700;\n  box-shadow: 0 0 12px rgba(212, 175, 55, 0.2);\n}\n.fp-chip-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: box-shadow 0.14s;\n}\n.fp-chip.active[_ngcontent-%COMP%]   .fp-chip-dot[_ngcontent-%COMP%] {\n  box-shadow: 0 0 6px currentColor;\n}\n.fp-live-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #ef4444;\n  box-shadow: 0 0 6px rgba(239, 68, 68, 0.8);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n  flex-shrink: 0;\n}\n.fp-open-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #10b981;\n  flex-shrink: 0;\n}\n.fp-chip-count[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: #6b7280;\n  padding: 1px 5px;\n  background: rgba(255, 255, 255, 0.06);\n  border-radius: 4px;\n}\n.fp-chip.active[_ngcontent-%COMP%]   .fp-chip-count[_ngcontent-%COMP%] {\n  color: rgba(212, 175, 55, 0.8);\n  background: rgba(212, 175, 55, 0.12);\n}\n.fp-sep[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 20px;\n  background: rgba(255, 255, 255, 0.1);\n  flex-shrink: 0;\n  margin: 0 4px;\n}\n.fp-clear-all[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 10px;\n  background: rgba(248, 113, 113, 0.08);\n  border: 1px solid rgba(248, 113, 113, 0.25);\n  border-radius: 7px;\n  font-size: 12px;\n  font-family: var(--body);\n  color: #f87171;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.fp-clear-all[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.fp-clear-all[_ngcontent-%COMP%]:hover {\n  background: rgba(248, 113, 113, 0.15);\n  border-color: rgba(248, 113, 113, 0.4);\n}\n.fp-result-count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.fp-result-count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-size: 13px;\n  margin-right: 2px;\n}\n.error-box[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 24px auto;\n  padding: 16px 22px;\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  background: rgba(248, 113, 113, 0.08);\n  color: var(--live-clr);\n  border-radius: var(--r);\n  font-size: 14px;\n}\n.empty[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 80px auto;\n  text-align: center;\n  padding: 60px var(--gutter);\n}\n.empty-glyph[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 80px;\n  color: var(--text-mute);\n  margin-bottom: 24px;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 32px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 12px;\n}\n.empty-sub[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 15px;\n  line-height: 1.6;\n  margin-bottom: 24px;\n}\n.skeleton[_ngcontent-%COMP%] {\n  height: 380px;\n  border-radius: var(--r-lg);\n  background:\n    linear-gradient(\n      90deg,\n      var(--bg2) 0%,\n      var(--bg3) 50%,\n      var(--bg2) 100%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmerSkel 1.4s linear infinite;\n}\n.grid[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 24px var(--gutter) 80px;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  align-items: stretch;\n}\n@media (max-width: 1100px) {\n  .grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 700px) {\n  .grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  background: #111827;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 14px;\n  overflow: hidden;\n  text-decoration: none;\n  color: inherit;\n  cursor: pointer;\n  height: 100%;\n  min-height: 400px;\n  transition:\n    transform 0.26s cubic-bezier(0.2, 0.7, 0.2, 1),\n    border-color 0.24s,\n    box-shadow 0.24s;\n}\n.card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  z-index: 5;\n  background: var(--grad-brand, linear-gradient(120deg, #006c35, #2e8bff));\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.4s ease;\n}\n.card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: 4;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      105deg,\n      transparent 40%,\n      rgba(255, 255, 255, 0.07) 50%,\n      transparent 60%);\n  transform: translateX(-120%) skewX(-18deg);\n  transition: transform 0.8s ease;\n}\n.card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  border-color: rgba(212, 175, 55, 0.45);\n  box-shadow: 0 22px 50px -18px rgba(0, 0, 0, 0.7), 0 0 36px -14px rgba(212, 175, 55, 0.45);\n}\n.card[_ngcontent-%COMP%]:hover::before {\n  transform: scaleX(1);\n}\n.card[_ngcontent-%COMP%]:hover::after {\n  transform: translateX(120%) skewX(-18deg);\n}\n.card[_ngcontent-%COMP%]:hover   .card-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.12);\n  filter: brightness(1.06) saturate(1.05);\n}\n.card[_ngcontent-%COMP%]:hover   .card-foot-cta[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.card--promoted[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.35);\n  box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.15), 0 4px 20px rgba(212, 175, 55, 0.08);\n}\n.card-art[_ngcontent-%COMP%] {\n  position: relative;\n  height: 180px;\n  overflow: hidden;\n  background: #060810;\n  flex-shrink: 0;\n}\n.card-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n  display: block;\n  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.4s ease;\n}\n.card-art__fade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(6, 8, 16, 0.1) 0%,\n      rgba(6, 8, 16, 0.5) 50%,\n      rgba(6, 8, 16, 0.95) 100%);\n}\n.card-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  font-family: var(--mono);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  padding: 4px 10px;\n  border-radius: 100px;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n.card-badge--live[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n  border: 1px solid rgba(239, 68, 68, 0.4);\n}\n.card-badge--live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #ef4444;\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n  flex-shrink: 0;\n}\n.card-badge--open[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.15);\n  color: #6ee7b7;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n}\n.card-badge--done[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.08);\n  color: #9ca3af;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n}\n.card-badge--soon[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #fcd34d;\n  border: 1px solid rgba(245, 158, 11, 0.25);\n}\n.promoted-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  z-index: 10;\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #f0a500;\n  background: rgba(240, 165, 0, 0.15);\n  border: 1px solid rgba(240, 165, 0, 0.3);\n  padding: 3px 8px;\n  border-radius: 4px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.promoted-badge[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.card-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 14px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  background: rgba(255, 255, 255, 0.02);\n}\n.card-strip__org[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 0.5px;\n  color: #9ca3af;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.card-strip__by[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin-right: 3px;\n}\n.card-strip__date[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: #6b7280;\n  white-space: nowrap;\n  margin-left: 8px;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n}\n.card-game-line[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: #6b7280;\n}\n.card-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 18px;\n  line-height: 1.1;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  color: #fff;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.card-name-ar[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: -4px;\n}\n.card-reward[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: #d1d5db;\n}\n.card-reward[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #f0a500;\n  flex-shrink: 0;\n}\n.card-reward[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #f0a500;\n}\n.card-reward--free[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.card-reward--free[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.card-slots[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: auto;\n  padding-top: 6px;\n}\n.card-slots__bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 3px;\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.card-slots__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary, #006c35),\n      var(--accent, #d4af37));\n  border-radius: 2px;\n  transition: width 0.4s ease;\n}\n.card-slots__fill--full[_ngcontent-%COMP%] {\n  background: #10b981;\n}\n.card-slots__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: #6b7280;\n  white-space: nowrap;\n}\n.card-slots__label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px 14px;\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n}\n.card-fee[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  font-weight: 700;\n  color: #9ca3af;\n  padding: 5px 10px;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 6px;\n}\n.card-fee--free[_ngcontent-%COMP%] {\n  color: #10b981;\n  border-color: rgba(16, 185, 129, 0.3);\n  background: rgba(16, 185, 129, 0.08);\n}\n.card-cta[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 9px 14px;\n  background: var(--primary, #006c35);\n  border: none;\n  border-radius: 6px;\n  color: #fff;\n  font-family: var(--body);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  transition: background 0.15s, box-shadow 0.15s;\n}\n.card-cta[_ngcontent-%COMP%]:hover {\n  background: var(--primary-soft, #2d8c5e);\n  box-shadow: 0 4px 16px rgba(0, 108, 53, 0.3);\n}\n.card-cta--live[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n.card-cta--live[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.3);\n  box-shadow: none;\n}\n.card-cta--done[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.08);\n  color: #9ca3af;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n}\n.card-cta--done[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.12);\n  box-shadow: none;\n}\n.ad-card[_ngcontent-%COMP%] {\n  --ad-accent: #f0a500;\n  display: flex;\n  flex-direction: column;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  background: #0d1117;\n  position: relative;\n  transition: transform 0.2s, border-color 0.2s;\n  min-height: 380px;\n  height: 100%;\n}\n.ad-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: var(--ad-accent);\n}\n.ad-card__sponsored[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  z-index: 3;\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.5);\n  background: rgba(0, 0, 0, 0.6);\n  padding: 3px 8px;\n  border-radius: 4px;\n}\n.ad-card__art[_ngcontent-%COMP%] {\n  position: relative;\n  height: 160px;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.ad-card__art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.ad-card__art-fade[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      180deg,\n      transparent 40%,\n      rgba(13, 17, 23, 0.95) 100%);\n}\n.ad-card__art--placeholder[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0d1117,\n      #1a2235);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ad-card__brand-initial[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 80px;\n  color: var(--ad-accent);\n  opacity: 0.2;\n  line-height: 1;\n}\n.ad-card__body[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  flex: 1;\n}\n.ad-card__brand[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--ad-accent);\n  margin-bottom: 6px;\n}\n.ad-card__title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 18px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  color: #fff;\n  line-height: 1.2;\n}\n.ad-card__title-ar[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.ad-card__foot[_ngcontent-%COMP%] {\n  padding: 10px 16px 14px;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.ad-card__cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--ad-accent);\n  text-decoration: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  transition: background 0.15s;\n}\n.ad-card__cta[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.list[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 24px var(--gutter) 80px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 64px 1.5fr 1fr 1.2fr auto auto;\n  gap: 20px;\n  align-items: center;\n  padding: 16px 22px;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  transition:\n    border-color 0.18s,\n    transform 0.18s,\n    background 0.18s;\n  text-decoration: none;\n  color: inherit;\n  cursor: pointer;\n}\n.row[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  background: var(--bg3);\n  transform: translateX(2px);\n}\n@media (max-width: 900px) {\n  .row[_ngcontent-%COMP%] {\n    grid-template-columns: 56px 1fr auto;\n  }\n  .row[_ngcontent-%COMP%]   .row-prize[_ngcontent-%COMP%], .row[_ngcontent-%COMP%]   .row-fill[_ngcontent-%COMP%], .row[_ngcontent-%COMP%]   .row-cta[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.row-glyph[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: var(--r);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 22px;\n  letter-spacing: 1px;\n  color: var(--accent);\n  background: var(--bg3);\n  border: 1px solid var(--line);\n}\n.row-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--text);\n}\n.row-sub[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  margin-top: 4px;\n}\n.row-prize[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.row-prize-n[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  color: var(--accent);\n  line-height: 1;\n}\n.row-prize-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.row-fill[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 140px;\n}\n.row-fill-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: var(--bg3);\n  border-radius: 100px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      var(--accent));\n  border-radius: 100px;\n  transition: width 0.4s;\n}\n.row-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.row-cta[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 14px;\n  color: var(--accent);\n  font-weight: 700;\n}\n.card-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  padding: 5px 10px;\n  border-radius: 100px;\n  font-weight: 700;\n}\n.card-status.live[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.15);\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  color: var(--live-clr);\n}\n.card-status.live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--live-clr);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n  box-shadow: 0 0 8px var(--live-clr);\n}\n.card-status.open[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.12);\n  border: 1px solid rgba(74, 222, 128, 0.35);\n  color: var(--good);\n}\n.card-status.completed[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--line-2);\n  color: var(--text-dim);\n}\n.card-status.draft[_ngcontent-%COMP%] {\n  background: rgba(245, 185, 66, 0.1);\n  border: 1px solid rgba(245, 185, 66, 0.3);\n  color: #f5b942;\n}\n@media (prefers-reduced-motion: reduce) {\n  .page-head[_ngcontent-%COMP%]::before, .page-head[_ngcontent-%COMP%]::after {\n    animation: none !important;\n  }\n  .card[_ngcontent-%COMP%]::after {\n    display: none;\n  }\n  .card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-3px);\n  }\n  .card[_ngcontent-%COMP%]:hover   .card-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=tournaments.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TournamentsComponent, { className: "TournamentsComponent", filePath: "src\\app\\pages\\tournaments\\tournaments.component.ts", lineNumber: 39 });
})();
export {
  TournamentsComponent
};
//# sourceMappingURL=chunk-PIAGI42R.js.map
