import {
  GAME_LABELS
} from "./chunk-7NGWYCOU.js";
import {
  TeamService
} from "./chunk-5HMXBCYT.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-LNNIKBGT.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
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
  ɵɵtextInterpolate3,
  ɵɵtextInterpolate4
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/teams/teams-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
var _c0 = () => [1, 2, 3];
var _c1 = (a0) => ["/teams", a0];
var _c2 = () => [1, 2, 3, 4];
function TeamsPageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.svc.invites().length);
  }
}
function TeamsPageComponent_Conditional_19_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
}
function TeamsPageComponent_Conditional_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TeamsPageComponent_Conditional_19_Conditional_0_For_1_Template, 1, 0, "div", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function TeamsPageComponent_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3");
    \u0275\u0275text(2, "You're not on any teams yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Create a team to compete together, or browse open rosters that are recruiting.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 4);
    \u0275\u0275text(6, "+ Create a team");
    \u0275\u0275elementEnd()();
  }
}
function TeamsPageComponent_Conditional_19_Conditional_2_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", t_r2.logo_url, \u0275\u0275sanitizeUrl)("alt", t_r2.name);
  }
}
function TeamsPageComponent_Conditional_19_Conditional_2_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((t_r2.tag || t_r2.name).charAt(0).toUpperCase());
  }
}
function TeamsPageComponent_Conditional_19_Conditional_2_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", t_r2.tag, "]");
  }
}
function TeamsPageComponent_Conditional_19_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12)(1, "span", 13);
    \u0275\u0275template(2, TeamsPageComponent_Conditional_19_Conditional_2_For_2_Conditional_2_Template, 1, 2, "img", 14)(3, TeamsPageComponent_Conditional_19_Conditional_2_For_2_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "div", 16);
    \u0275\u0275text(6);
    \u0275\u0275template(7, TeamsPageComponent_Conditional_19_Conditional_2_For_2_Conditional_7_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c1, t_r2.slug));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, t_r2.logo_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, t_r2.tag ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4("", ctx_r0.gameLabel(t_r2.game), " \xB7 ", t_r2.member_count, " member", t_r2.member_count === 1 ? "" : "s", " \xB7 ", t_r2.region || "Any region", "");
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("tm-role tm-role--", t_r2.my_role, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.my_role);
  }
}
function TeamsPageComponent_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, TeamsPageComponent_Conditional_19_Conditional_2_For_2_Template, 12, 14, "a", 12, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.svc.myTeams());
  }
}
function TeamsPageComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TeamsPageComponent_Conditional_19_Conditional_0_Template, 2, 1)(1, TeamsPageComponent_Conditional_19_Conditional_1_Template, 7, 0)(2, TeamsPageComponent_Conditional_19_Conditional_2_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, !ctx_r0.svc.loadedMine() ? 0 : ctx_r0.svc.myTeams().length === 0 ? 1 : 2);
  }
}
function TeamsPageComponent_Conditional_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3");
    \u0275\u0275text(2, "No pending invites");
    \u0275\u0275elementEnd()();
  }
}
function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const i_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", i_r4.team.logo_url, \u0275\u0275sanitizeUrl)("alt", i_r4.team.name);
  }
}
function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((i_r4.team == null ? null : i_r4.team.tag) || (i_r4.team == null ? null : i_r4.team.name) || "?").charAt(0).toUpperCase());
  }
}
function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", i_r4.team.tag, "]");
  }
}
function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const i_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" Invited by ", i_r4.inviter.display_name, " \xB7 ");
  }
}
function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 13);
    \u0275\u0275template(2, TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_2_Template, 1, 2, "img", 14)(3, TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "div", 16);
    \u0275\u0275text(6);
    \u0275\u0275template(7, TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_7_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 18);
    \u0275\u0275template(9, TeamsPageComponent_Conditional_20_Conditional_1_For_2_Conditional_9_Template, 1, 1);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 21)(12, "button", 22);
    \u0275\u0275listener("click", function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Template_button_click_12_listener() {
      const i_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.decline(i_r4));
    });
    \u0275\u0275text(13, "Decline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 23);
    \u0275\u0275listener("click", function TeamsPageComponent_Conditional_20_Conditional_1_For_2_Template_button_click_14_listener() {
      const i_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.accept(i_r4));
    });
    \u0275\u0275text(15, "Accept");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, (i_r4.team == null ? null : i_r4.team.logo_url) ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(i_r4.team == null ? null : i_r4.team.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, (i_r4.team == null ? null : i_r4.team.tag) ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, i_r4.inviter ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", i_r4.team ? ctx_r0.gameLabel(i_r4.team.game) : "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy(i_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy(i_r4.id));
  }
}
function TeamsPageComponent_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, TeamsPageComponent_Conditional_20_Conditional_1_For_2_Template, 16, 7, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.svc.invites());
  }
}
function TeamsPageComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TeamsPageComponent_Conditional_20_Conditional_0_Template, 3, 0, "div", 10)(1, TeamsPageComponent_Conditional_20_Conditional_1_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r0.svc.invites().length === 0 ? 0 : 1);
  }
}
function TeamsPageComponent_Conditional_21_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function TeamsPageComponent_Conditional_21_For_10_Template_button_click_0_listener() {
      const g_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setGame(g_r7.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.game() === g_r7.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r7.label);
  }
}
function TeamsPageComponent_Conditional_21_Conditional_14_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
}
function TeamsPageComponent_Conditional_21_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TeamsPageComponent_Conditional_21_Conditional_14_For_1_Template, 1, 0, "div", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c2));
  }
}
function TeamsPageComponent_Conditional_21_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3");
    \u0275\u0275text(2, "No teams match");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Try a different game, clear the recruiting filter, or broaden the search.");
    \u0275\u0275elementEnd()();
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const t_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", t_r8.logo_url, \u0275\u0275sanitizeUrl)("alt", t_r8.name);
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((t_r8.tag || t_r8.name).charAt(0).toUpperCase());
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", t_r8.tag, "]");
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r8.region);
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "Recruiting");
    \u0275\u0275elementEnd();
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 36)(1, "span", 37);
    \u0275\u0275template(2, TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_2_Template, 1, 2, "img", 14)(3, TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "div", 16);
    \u0275\u0275text(6);
    \u0275\u0275template(7, TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_7_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_10_Template, 2, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, TeamsPageComponent_Conditional_21_Conditional_16_For_2_Conditional_11_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c1, t_r8.slug));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, t_r8.logo_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r8.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, t_r8.tag ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r0.gameLabel(t_r8.game), " \xB7 ", t_r8.member_count, " member", t_r8.member_count === 1 ? "" : "s", "");
    \u0275\u0275advance();
    \u0275\u0275conditional(10, t_r8.region ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, t_r8.is_recruiting ? 11 : -1);
  }
}
function TeamsPageComponent_Conditional_21_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275repeaterCreate(1, TeamsPageComponent_Conditional_21_Conditional_16_For_2_Template, 12, 11, "a", 36, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.browseRows());
  }
}
function TeamsPageComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 26);
    \u0275\u0275element(3, "circle", 27)(4, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "input", 29);
    \u0275\u0275listener("ngModelChange", function TeamsPageComponent_Conditional_21_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.q.set($event);
      return \u0275\u0275resetView(ctx_r0.refreshBrowse());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 30)(7, "button", 31);
    \u0275\u0275listener("click", function TeamsPageComponent_Conditional_21_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setGame(null));
    });
    \u0275\u0275text(8, "All games");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, TeamsPageComponent_Conditional_21_For_10_Template, 2, 3, "button", 32, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 33)(12, "input", 34);
    \u0275\u0275listener("change", function TeamsPageComponent_Conditional_21_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.recruiting.set(!ctx_r0.recruiting());
      return \u0275\u0275resetView(ctx_r0.refreshBrowse());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Recruiting only ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, TeamsPageComponent_Conditional_21_Conditional_14_Template, 2, 1)(15, TeamsPageComponent_Conditional_21_Conditional_15_Template, 5, 0)(16, TeamsPageComponent_Conditional_21_Conditional_16_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r0.q());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", !ctx_r0.game());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.games);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r0.recruiting());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(14, ctx_r0.browseLoading() ? 14 : ctx_r0.browseRows().length === 0 ? 15 : 16);
  }
}
var TeamsPageComponent = class _TeamsPageComponent {
  constructor() {
    this.svc = inject(TeamService);
    this.toast = inject(ToastService);
    this.games = Object.entries(GAME_LABELS).map(([value, label]) => ({ value, label }));
    this.tab = signal("mine");
    this.q = signal("");
    this.game = signal(null);
    this.recruiting = signal(false);
    this.browseRows = signal([]);
    this.browseLoading = signal(false);
    this.browseFetched = signal(false);
    this.busyIds = signal(/* @__PURE__ */ new Set());
    this.searchTimer = null;
  }
  ngOnInit() {
    if (!this.svc.loadedMine())
      this.svc.loadMine();
  }
  gameLabel(g) {
    return GAME_LABELS[g] ?? g;
  }
  busy(id) {
    return this.busyIds().has(id);
  }
  ensureBrowse() {
    if (this.browseFetched())
      return;
    this.refreshBrowse(true);
  }
  setGame(g) {
    this.game.set(g);
    this.refreshBrowse(true);
  }
  refreshBrowse(immediate = false) {
    if (this.searchTimer)
      clearTimeout(this.searchTimer);
    const run = () => {
      this.browseLoading.set(true);
      this.svc.browse({ q: this.q().trim() || null, game: this.game(), recruiting: this.recruiting() }).subscribe({
        next: (r) => {
          this.browseRows.set(r.data ?? []);
          this.browseLoading.set(false);
          this.browseFetched.set(true);
        },
        error: () => {
          this.browseRows.set([]);
          this.browseLoading.set(false);
          this.browseFetched.set(true);
        }
      });
    };
    if (immediate)
      run();
    else
      this.searchTimer = setTimeout(run, 280);
  }
  mark(id, on) {
    this.busyIds.update((s) => {
      const n = new Set(s);
      on ? n.add(id) : n.delete(id);
      return n;
    });
  }
  accept(i) {
    this.mark(i.id, true);
    this.svc.acceptInvite(i.id).subscribe({
      next: () => {
        this.toast.success(`Joined ${i.team?.name ?? "team"}.`);
        this.mark(i.id, false);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(i.id, false);
      }
    });
  }
  decline(i) {
    this.mark(i.id, true);
    this.svc.declineInvite(i.id).subscribe({
      next: () => this.mark(i.id, false),
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(i.id, false);
      }
    });
  }
  static {
    this.\u0275fac = function TeamsPageComponent_Factory(t) {
      return new (t || _TeamsPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamsPageComponent, selectors: [["app-teams-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 22, vars: 11, consts: [[1, "tm-shell"], [1, "tm-head"], [1, "tm-eyebrow"], [1, "tm-title"], ["routerLink", "/teams/create", 1, "tm-btn", "tm-btn--primary"], [1, "tm-tabs"], [3, "click"], [1, "tm-count"], [1, "tm-count", "tm-count--alert"], [1, "tm-skel"], [1, "tm-empty"], [1, "tm-list"], [1, "tm-row", 3, "routerLink"], [1, "tm-logo"], [3, "src", "alt"], [1, "tm-info"], [1, "tm-name"], [1, "tm-tag"], [1, "tm-meta"], [1, "tm-logo-letter"], [1, "tm-row"], [1, "tm-actions"], [1, "tm-btn", "tm-btn--ghost", 3, "click", "disabled"], [1, "tm-btn", "tm-btn--primary", 3, "click", "disabled"], [1, "tm-filters"], [1, "tm-search"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "text", "placeholder", "Search teams by name or tag", 3, "ngModelChange", "ngModel"], [1, "tm-chips"], [1, "tm-chip", 3, "click"], [1, "tm-chip", 3, "active"], [1, "tm-recruit"], ["type", "checkbox", 3, "change", "checked"], [1, "tm-grid"], [1, "tm-card", 3, "routerLink"], [1, "tm-logo", "tm-logo--lg"], [1, "tm-recruiting-pill"]], template: function TeamsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Compete");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Teams");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 4);
        \u0275\u0275text(8, "+ New team");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 5)(10, "button", 6);
        \u0275\u0275listener("click", function TeamsPageComponent_Template_button_click_10_listener() {
          return ctx.tab.set("mine");
        });
        \u0275\u0275text(11, " My teams ");
        \u0275\u0275elementStart(12, "span", 7);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "button", 6);
        \u0275\u0275listener("click", function TeamsPageComponent_Template_button_click_14_listener() {
          return ctx.tab.set("invites");
        });
        \u0275\u0275text(15, " Invites ");
        \u0275\u0275template(16, TeamsPageComponent_Conditional_16_Template, 2, 1, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 6);
        \u0275\u0275listener("click", function TeamsPageComponent_Template_button_click_17_listener() {
          ctx.tab.set("browse");
          return ctx.ensureBrowse();
        });
        \u0275\u0275text(18, "Browse");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, TeamsPageComponent_Conditional_19_Template, 3, 1)(20, TeamsPageComponent_Conditional_20_Template, 2, 1)(21, TeamsPageComponent_Conditional_21_Template, 17, 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275classProp("active", ctx.tab() === "mine");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.svc.myTeams().length);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "invites");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(16, ctx.svc.invites().length > 0 ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "browse");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(19, ctx.tab() === "mine" ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(20, ctx.tab() === "invites" ? 20 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(21, ctx.tab() === "browse" ? 21 : -1);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.tm-shell[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n}\n.tm-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.1rem;\n  flex-wrap: wrap;\n}\n.tm-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.tm-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.tm-tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 2px;\n  padding: 3px;\n  margin-bottom: 1.1rem;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 10px;\n}\n.tm-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 7px 14px;\n  border-radius: 7px;\n  background: transparent;\n  border: none;\n  color: var(--mu, #8a8aa0);\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background .15s, color .15s;\n}\n.tm-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.tm-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  color: var(--text);\n}\n.tm-count[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  padding: 1px 7px;\n  border-radius: 100px;\n  background: rgba(255, 255, 255, .08);\n  color: var(--mu);\n}\n.tm-count--alert[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n}\n.tm-filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 14px;\n}\n.tm-search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 13px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 10px;\n  svg {\n    color: var(--mu, #8a8aa0);\n    flex-shrink: 0;\n  }\n  input {\n    flex: 1;\n    background: transparent;\n    border: none;\n    outline: none;\n    color: var(--text);\n    font-size: 14px;\n    &::placeholder {\n      color: var(--mu);\n    }\n  }\n}\n.tm-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.tm-chip[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 12.5px;\n  font-weight: 600;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  color: var(--mu);\n  transition:\n    color .15s,\n    border-color .15s,\n    background .15s;\n  &:hover {\n    color: var(--text);\n    border-color: var(--br2, rgba(255,255,255,.14));\n  }\n  &.active {\n    color: #4ade80;\n    border-color: var(--primary, #006c35);\n    background: rgba(0, 108, 53, .14);\n  }\n}\n.tm-recruit[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--mu, #8a8aa0);\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n  input {\n    accent-color: var(--primary, #006c35);\n  }\n}\n.tm-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.tm-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: transparent;\n  text-decoration: none;\n  color: inherit;\n  transition: background .12s;\n}\n.tm-row[_ngcontent-%COMP%]:hover {\n  background: var(--bg2, #10101c);\n}\n.tm-logo[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.tm-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.tm-logo-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  color: #fff;\n}\n.tm-logo--lg[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  .tm-logo-letter {\n    font-size: 22px;\n  }\n}\n.tm-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.tm-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.tm-tag[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  color: var(--accent, #d4af37);\n}\n.tm-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 2px;\n}\n.tm-role[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  padding: 2px 8px;\n  border-radius: 100px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.tm-role--owner[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .16);\n  color: var(--accent, #d4af37);\n}\n.tm-role--captain[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .16);\n  color: #4ade80;\n}\n.tm-role--member[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .06);\n  color: var(--mu, #8a8aa0);\n}\n.tm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.tm-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.tm-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.tm-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n.tm-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 10px;\n}\n.tm-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 12px;\n  text-decoration: none;\n  color: inherit;\n  transition: border-color .15s, transform .15s;\n  position: relative;\n}\n.tm-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2, rgba(255,255,255,.14));\n  transform: translateY(-2px);\n}\n.tm-recruiting-pill[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  padding: 2px 8px;\n  border-radius: 100px;\n  background: rgba(0, 108, 53, .18);\n  color: #4ade80;\n  border: 1px solid rgba(0, 108, 53, .4);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.tm-empty[_ngcontent-%COMP%] {\n  padding: 40px 20px;\n  text-align: center;\n  color: var(--mu, #8a8aa0);\n  h3 {\n    color: var(--text);\n    margin: 0 0 8px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: .5px;\n  }\n  p {\n    margin: 0 auto 16px;\n    max-width: 42ch;\n    line-height: 1.5;\n  }\n}\n.tm-skel[_ngcontent-%COMP%] {\n  height: 64px;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, .05);\n  animation: _ngcontent-%COMP%_tmPulse 1.5s ease-in-out infinite;\n  margin-bottom: 4px;\n}\n@keyframes _ngcontent-%COMP%_tmPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .tm-skel[_ngcontent-%COMP%], .tm-card[_ngcontent-%COMP%] {\n    transition: none;\n    animation: none;\n  }\n}\n/*# sourceMappingURL=teams-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamsPageComponent, { className: "TeamsPageComponent", filePath: "src\\app\\features\\teams\\teams-page.component.ts", lineNumber: 197 });
})();
export {
  TeamsPageComponent
};
//# sourceMappingURL=chunk-XLOXW73S.js.map
