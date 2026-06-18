import {
  GAME_LABELS
} from "./chunk-7NGWYCOU.js";
import {
  ChallengeService
} from "./chunk-ILO7ZWQZ.js";
import {
  TeamService
} from "./chunk-5HMXBCYT.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import "./chunk-OERRWE4S.js";
import {
  ActivatedRoute,
  Router,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/teams/team-profile-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/players", a0];
function TeamProfilePageComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 4);
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", t_r1.logo_url, \u0275\u0275sanitizeUrl)("alt", t_r1.name);
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((t_r1.tag || t_r1.name).charAt(0).toUpperCase());
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", t_r1.tag, "]");
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \xB7 ", t_r1.region, " ");
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
    \u0275\u0275elementStart(1, "span", 9);
    \u0275\u0275text(2, "Recruiting");
    \u0275\u0275elementEnd();
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r1.description);
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openInvite.set(true));
    });
    \u0275\u0275text(1, "+ Invite player");
    \u0275\u0275elementEnd();
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openChallenge.set(true));
    });
    \u0275\u0275text(1, "Challenge this team");
    \u0275\u0275elementEnd();
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.leave(t_r1));
    });
    \u0275\u0275text(1, "Leave team");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.disband(t_r1));
    });
    \u0275\u0275text(1, "Disband");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 4);
  }
  if (rf & 2) {
    const m_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", m_r7.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", m_r7.user.display_name);
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((m_r7.user.display_name || "?").charAt(0));
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate("@" + m_r7.user.nickname);
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const m_r7 = \u0275\u0275nextContext(2).$implicit;
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.promote(t_r1, m_r7));
    });
    \u0275\u0275text(1, "\u2191");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const m_r7 = \u0275\u0275nextContext(2).$implicit;
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.demote(t_r1, m_r7));
    });
    \u0275\u0275text(1, "\u2193");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const m_r7 = \u0275\u0275nextContext(2).$implicit;
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.kick(t_r1, m_r7));
    });
    \u0275\u0275text(1, "\xD7");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_1_Template, 2, 1, "button", 30)(2, TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_2_Template, 2, 1, "button", 31)(3, TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Conditional_3_Template, 2, 1, "button", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = \u0275\u0275nextContext().$implicit;
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, t_r1.i_am_owner && m_r7.role === "member" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, t_r1.i_am_owner && m_r7.role === "captain" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, m_r7.role !== "owner" ? 3 : -1);
  }
}
function TeamProfilePageComponent_Conditional_0_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 24);
    \u0275\u0275template(2, TeamProfilePageComponent_Conditional_0_For_27_Conditional_2_Template, 1, 2, "img", 4)(3, TeamProfilePageComponent_Conditional_0_For_27_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "a", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, TeamProfilePageComponent_Conditional_0_For_27_Conditional_7_Template, 2, 1, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, TeamProfilePageComponent_Conditional_0_For_27_Conditional_10_Template, 4, 3, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r7 = ctx.$implicit;
    const t_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, m_r7.user.avatar_url ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, m_r7.user.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r7.user.display_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, m_r7.user.nickname ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("tp-role tp-role--", m_r7.role, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r7.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r2.canManageRoster(t_r1, m_r7) ? 10 : -1);
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_28_For_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mine_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("[", mine_r13.tag, "]");
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_28_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_28_For_15_Template_button_click_0_listener() {
      const mine_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.challengerTeamId.set(mine_r13.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, TeamProfilePageComponent_Conditional_0_Conditional_28_For_15_Conditional_3_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mine_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r2.challengerTeamId() === mine_r13.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mine_r13.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, mine_r13.tag ? 3 : -1);
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_28_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("You don't own/captain any ", ctx_r2.gameLabel(t_r1.game), " teams.");
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_28_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openChallenge.set(false));
    });
    \u0275\u0275elementStart(1, "div", 37);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_28_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r11);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 38)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 39);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_28_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openChallenge.set(false));
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 40)(8, "p");
    \u0275\u0275text(9, "Pick one of your teams to challenge ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 41);
    \u0275\u0275repeaterCreate(14, TeamProfilePageComponent_Conditional_0_Conditional_28_For_15_Template, 4, 4, "button", 42, _forTrack0);
    \u0275\u0275template(16, TeamProfilePageComponent_Conditional_0_Conditional_28_Conditional_16_Template, 2, 1, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function TeamProfilePageComponent_Conditional_0_Conditional_28_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.challengeMessage, $event) || (ctx_r2.challengeMessage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "footer", 45)(19, "button", 21);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_28_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openChallenge.set(false));
    });
    \u0275\u0275text(20, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 46);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_28_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r11);
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitChallenge(t_r1));
    });
    \u0275\u0275text(22, "Send challenge");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Challenge ", t_r1.name, "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", ctx_r2.gameLabel(t_r1.game), "). Both teams must play the same game.");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.eligibleTeams(t_r1));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(16, ctx_r2.eligibleTeams(t_r1).length === 0 ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.challengeMessage);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.challengerTeamId() || ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_29_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openInvite.set(false));
    });
    \u0275\u0275elementStart(1, "div", 37);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_29_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 38)(3, "h3");
    \u0275\u0275text(4, "Invite a player");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 39);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_29_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openInvite.set(false));
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 40)(8, "p");
    \u0275\u0275text(9, "Paste the player's user ID. (Friend invites integration coming with achievements.)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function TeamProfilePageComponent_Conditional_0_Conditional_29_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.inviteUserId, $event) || (ctx_r2.inviteUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "footer", 45)(12, "button", 21);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_29_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openInvite.set(false));
    });
    \u0275\u0275text(13, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 46);
    \u0275\u0275listener("click", function TeamProfilePageComponent_Conditional_0_Conditional_29_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r14);
      const t_r1 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.invite(t_r1));
    });
    \u0275\u0275text(15, "Send invite");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.inviteUserId);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.inviteUserId.trim() || ctx_r2.busy());
  }
}
function TeamProfilePageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
    \u0275\u0275text(2, "\u2190 Back to teams");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "header", 2)(4, "span", 3);
    \u0275\u0275template(5, TeamProfilePageComponent_Conditional_0_Conditional_5_Template, 1, 2, "img", 4)(6, TeamProfilePageComponent_Conditional_0_Conditional_6_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 5)(8, "h1", 6);
    \u0275\u0275text(9);
    \u0275\u0275template(10, TeamProfilePageComponent_Conditional_0_Conditional_10_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 8);
    \u0275\u0275text(12);
    \u0275\u0275template(13, TeamProfilePageComponent_Conditional_0_Conditional_13_Template, 1, 1);
    \u0275\u0275text(14);
    \u0275\u0275template(15, TeamProfilePageComponent_Conditional_0_Conditional_15_Template, 3, 0, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, TeamProfilePageComponent_Conditional_0_Conditional_16_Template, 2, 1, "p", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 11);
    \u0275\u0275template(18, TeamProfilePageComponent_Conditional_0_Conditional_18_Template, 2, 0, "button", 12)(19, TeamProfilePageComponent_Conditional_0_Conditional_19_Template, 2, 0, "button", 13)(20, TeamProfilePageComponent_Conditional_0_Conditional_20_Template, 2, 1, "button", 14)(21, TeamProfilePageComponent_Conditional_0_Conditional_21_Template, 2, 1, "button", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "section", 15)(23, "h2", 16);
    \u0275\u0275text(24, "Roster");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 17);
    \u0275\u0275repeaterCreate(26, TeamProfilePageComponent_Conditional_0_For_27_Template, 11, 11, "div", 18, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(28, TeamProfilePageComponent_Conditional_0_Conditional_28_Template, 23, 6, "div", 19)(29, TeamProfilePageComponent_Conditional_0_Conditional_29_Template, 16, 2, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, t_r1.logo_url ? 5 : 6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, t_r1.tag ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.gameLabel(t_r1.game), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(13, t_r1.region ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \xB7 ", t_r1.members.length, " member", t_r1.members.length === 1 ? "" : "s", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(15, t_r1.is_recruiting ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, t_r1.description ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(18, ctx_r2.canManage(t_r1) ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(19, !t_r1.my_role && ctx_r2.eligibleChallengerTeam(t_r1) ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(20, ctx_r2.canLeave(t_r1) ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, t_r1.i_am_owner ? 21 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(t_r1.members);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(28, ctx_r2.openChallenge() && !t_r1.my_role ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(29, ctx_r2.openInvite() && ctx_r2.canManage(t_r1) ? 29 : -1);
  }
}
function TeamProfilePageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275elementEnd();
  }
}
function TeamProfilePageComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
var TeamProfilePageComponent = class _TeamProfilePageComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.svc = inject(TeamService);
    this.auth = inject(AuthService);
    this.challenges = inject(ChallengeService);
    this.toast = inject(ToastService);
    this.team = signal(null);
    this.loading = signal(true);
    this.error = signal(null);
    this.busy = signal(false);
    this.openInvite = signal(false);
    this.openChallenge = signal(false);
    this.challengerTeamId = signal(null);
    this.challengeMessage = "";
    this.inviteUserId = "";
  }
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get("slug") ?? "";
    this.fetch(slug);
    if (!this.svc.loadedMine())
      this.svc.loadMine();
  }
  fetch(slug) {
    this.loading.set(true);
    this.error.set(null);
    this.svc.show(slug).subscribe({
      next: (r) => {
        this.team.set(r.data);
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e?.status === 404 ? "Team not found." : e?.error?.message ?? "Could not load team.");
        this.loading.set(false);
      }
    });
  }
  gameLabel(g) {
    return GAME_LABELS[g] ?? g;
  }
  canManage(t) {
    return t.my_role === "owner" || t.my_role === "captain";
  }
  canLeave(t) {
    return !!t.my_role && t.my_role !== "owner";
  }
  canManageRoster(t, m) {
    if (m.role === "owner")
      return false;
    if (t.i_am_owner)
      return true;
    return t.my_role === "captain" && m.role === "member";
  }
  invite(t) {
    const userId = this.inviteUserId.trim();
    if (!userId)
      return;
    this.busy.set(true);
    this.svc.invite(t.id, userId).subscribe({
      next: () => {
        this.toast.success("Invite sent.");
        this.busy.set(false);
        this.openInvite.set(false);
        this.inviteUserId = "";
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  kick(t, m) {
    this.busy.set(true);
    this.svc.kick(t.id, m.user.id).subscribe({
      next: () => {
        this.toast.info(`${m.user.display_name} removed.`);
        this.busy.set(false);
        this.fetch(t.slug);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  promote(t, m) {
    this.busy.set(true);
    this.svc.promote(t.id, m.user.id).subscribe({
      next: () => {
        this.toast.success(`${m.user.display_name} promoted to captain.`);
        this.busy.set(false);
        this.fetch(t.slug);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  demote(t, m) {
    this.busy.set(true);
    this.svc.demote(t.id, m.user.id).subscribe({
      next: () => {
        this.toast.info(`${m.user.display_name} demoted to member.`);
        this.busy.set(false);
        this.fetch(t.slug);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  leave(t) {
    this.busy.set(true);
    this.svc.leave(t.id).subscribe({
      next: () => {
        this.toast.info("You left the team.");
        this.router.navigate(["/teams"]);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  /** Teams I own/captain that play the same game as the target — eligible challengers. */
  eligibleTeams(target) {
    return this.svc.myTeams().filter((m) => m.game === target.game && (m.my_role === "owner" || m.my_role === "captain") && m.id !== target.id);
  }
  /** Quick boolean for the button: I can challenge this team if I have at least one eligible team. */
  eligibleChallengerTeam(target) {
    return this.eligibleTeams(target).length > 0;
  }
  submitChallenge(t) {
    const cid = this.challengerTeamId();
    if (!cid || this.busy())
      return;
    this.busy.set(true);
    this.challenges.createTeam(cid, t.id, t.game, this.challengeMessage.trim()).subscribe({
      next: () => {
        this.toast.success(`Challenge sent to ${t.name}.`);
        this.busy.set(false);
        this.openChallenge.set(false);
        this.challengeMessage = "";
        this.challengerTeamId.set(null);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  disband(t) {
    if (!confirm(`Disband ${t.name}? This cannot be undone.`))
      return;
    this.busy.set(true);
    this.svc.destroy(t.id).subscribe({
      next: () => {
        this.toast.info("Team disbanded.");
        this.router.navigate(["/teams"]);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.busy.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function TeamProfilePageComponent_Factory(t) {
      return new (t || _TeamProfilePageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamProfilePageComponent, selectors: [["app-team-profile-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 1, consts: [[1, "tp-shell"], ["routerLink", "/teams", 1, "tp-back"], [1, "tp-hero"], [1, "tp-logo"], [3, "src", "alt"], [1, "tp-id"], [1, "tp-name"], [1, "tp-tag"], [1, "tp-meta"], [1, "tp-recruit"], [1, "tp-desc"], [1, "tp-actions"], [1, "tp-btn", "tp-btn--ghost"], [1, "tp-btn", "tp-btn--accent"], [1, "tp-btn", "tp-btn--danger", 3, "disabled"], [1, "tp-section"], [1, "tp-h"], [1, "tp-roster"], [1, "tp-row"], [1, "tp-modal-overlay"], [1, "tp-logo-letter"], [1, "tp-btn", "tp-btn--ghost", 3, "click"], [1, "tp-btn", "tp-btn--accent", 3, "click"], [1, "tp-btn", "tp-btn--danger", 3, "click", "disabled"], [1, "tp-ava"], [1, "tp-info"], [1, "tp-pname", 3, "routerLink"], [1, "tp-pnick"], [1, "tp-row-actions"], [1, "tp-ava-letter"], ["title", "Promote to captain", 1, "tp-icon", 3, "disabled"], ["title", "Demote to member", 1, "tp-icon", 3, "disabled"], ["title", "Remove from team", 1, "tp-icon", "tp-icon--danger", 3, "disabled"], ["title", "Promote to captain", 1, "tp-icon", 3, "click", "disabled"], ["title", "Demote to member", 1, "tp-icon", 3, "click", "disabled"], ["title", "Remove from team", 1, "tp-icon", "tp-icon--danger", 3, "click", "disabled"], [1, "tp-modal-overlay", 3, "click"], [1, "tp-modal", 3, "click"], [1, "tp-modal__head"], ["aria-label", "Close", 1, "tp-x", 3, "click"], [1, "tp-modal__body"], [1, "tp-challenger-options"], ["type", "button", 1, "tp-chal-opt", 3, "active"], [1, "tp-empty"], ["rows", "2", "maxlength", "500", "placeholder", "Trash talk, proposed time, rules\u2026 (optional)", 1, "tp-input", 3, "ngModelChange", "ngModel"], [1, "tp-modal__foot"], [1, "tp-btn", "tp-btn--primary", 3, "click", "disabled"], ["type", "button", 1, "tp-chal-opt", 3, "click"], ["placeholder", "Player UUID", 3, "ngModelChange", "ngModel"], [1, "tp-skel"], [1, "tp-error"]], template: function TeamProfilePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TeamProfilePageComponent_Conditional_0_Template, 30, 15, "div", 0)(1, TeamProfilePageComponent_Conditional_1_Template, 2, 0)(2, TeamProfilePageComponent_Conditional_2_Template, 3, 1);
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275conditional(0, (tmp_0_0 = ctx.team()) ? 0 : ctx.loading() ? 1 : ctx.error() ? 2 : -1, tmp_0_0);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.tp-shell[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 1.25rem 1.5rem 4rem;\n}\n.tp-back[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-family: var(--fm, monospace);\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  text-decoration: none;\n  margin-bottom: 12px;\n  &:hover {\n    color: var(--text);\n  }\n}\n.tp-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  gap: 18px;\n  align-items: center;\n  padding: 22px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  margin-bottom: 14px;\n}\n@media (max-width: 720px) {\n  .tp-hero[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n  }\n  .tp-actions[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    justify-content: flex-start;\n  }\n}\n.tp-logo[_ngcontent-%COMP%] {\n  width: 76px;\n  height: 76px;\n  border-radius: 14px;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.tp-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.tp-logo-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 32px;\n  color: #fff;\n}\n.tp-id[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.tp-name[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(22px, 3vw, 30px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.tp-tag[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 14px;\n  color: var(--accent, #d4af37);\n}\n.tp-meta[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 6px;\n}\n.tp-recruit[_ngcontent-%COMP%] {\n  color: #4ade80;\n  font-weight: 700;\n}\n.tp-desc[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  font-size: 14px;\n  color: var(--text);\n  line-height: 1.5;\n  max-width: 60ch;\n}\n.tp-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  flex-shrink: 0;\n}\n.tp-btn[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border-radius: 9px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.tp-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.tp-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n.tp-btn--danger[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: rgba(239, 68, 68, .4);\n  color: #fca5a5;\n  &:hover:not(:disabled) {\n    background: rgba(239, 68, 68, .1);\n    border-color: rgba(239, 68, 68, .7);\n  }\n}\n.tp-btn--accent[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n  color: #1a1100;\n  &:hover:not(:disabled) {\n    background: var(--accent-soft, #e8c965);\n  }\n}\n.tp-challenger-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.tp-chal-opt[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 12px;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 8px;\n  color: var(--text);\n  cursor: pointer;\n  text-align: left;\n  strong {\n    font-weight: 700;\n  }\n  span {\n    font-family: var(--fm, monospace);\n    font-size: 11px;\n    color: var(--accent, #d4af37);\n  }\n  &.active {\n    border-color: var(--primary, #006c35);\n    background: rgba(0, 108, 53, .14);\n  }\n}\n.tp-input[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 8px;\n  padding: 10px 12px;\n  color: var(--text);\n  font-size: 13px;\n  outline: none;\n  font-family: var(--fb, sans-serif);\n  resize: vertical;\n  margin-top: 8px;\n  &:focus {\n    border-color: var(--primary, #006c35);\n  }\n}\n.tp-empty[_ngcontent-%COMP%] {\n  padding: 14px;\n  text-align: center;\n  color: var(--mu, #8a8aa0);\n  font-size: 13px;\n  border: 1px dashed var(--br2, rgba(255,255,255,.14));\n  border-radius: 8px;\n}\n.tp-section[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  padding: 18px 20px;\n}\n.tp-h[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 16px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin: 0 0 12px;\n}\n.tp-roster[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.tp-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 9px 10px;\n  border-radius: 10px;\n  transition: background .12s;\n}\n.tp-row[_ngcontent-%COMP%]:hover {\n  background: var(--bg3, #181826);\n}\n.tp-ava[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.tp-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.tp-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 14px;\n  color: #fff;\n}\n.tp-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.tp-pname[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--text);\n  text-decoration: none;\n  &:hover {\n    color: var(--accent, #d4af37);\n  }\n}\n.tp-pnick[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 2px;\n}\n.tp-role[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  padding: 2px 8px;\n  border-radius: 100px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.tp-role--owner[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .16);\n  color: var(--accent, #d4af37);\n}\n.tp-role--captain[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .16);\n  color: #4ade80;\n}\n.tp-role--member[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .06);\n  color: var(--mu, #8a8aa0);\n}\n.tp-row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.tp-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  background: transparent;\n  color: var(--mu);\n  cursor: pointer;\n  font-size: 14px;\n  line-height: 1;\n  padding: 0;\n  &:hover:not(:disabled) {\n    color: var(--text);\n    border-color: var(--text);\n  }\n}\n.tp-icon--danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #fca5a5;\n  border-color: rgba(239, 68, 68, .5);\n  background: rgba(239, 68, 68, .1);\n}\n.tp-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, .7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: grid;\n  place-items: center;\n  padding: 20px;\n}\n.tp-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 460px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 16px;\n  overflow: hidden;\n}\n.tp-modal__head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--br, rgba(255,255,255,.08));\n  h3 {\n    margin: 0;\n    font-size: 16px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: 1px;\n    text-transform: uppercase;\n  }\n}\n.tp-x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mu);\n  cursor: pointer;\n  font-size: 22px;\n  line-height: 1;\n  padding: 0 6px;\n  &:hover {\n    color: var(--text);\n  }\n}\n.tp-modal__body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  p {\n    margin: 0;\n    font-size: 13px;\n    color: var(--mu, #8a8aa0);\n  }\n  input {\n    background: var(--bg3, #181826);\n    border: 1px solid var(--br2, rgba(255,255,255,.14));\n    border-radius: 8px;\n    padding: 10px 12px;\n    color: var(--text);\n    font-size: 13px;\n    outline: none;\n    font-family: var(--fm, monospace);\n    &:focus {\n      border-color: var(--primary, #006c35);\n    }\n  }\n}\n.tp-modal__foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 14px 20px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.tp-error[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #fca5a5;\n  background: rgba(239, 68, 68, .08);\n  border: 1px solid rgba(239, 68, 68, .25);\n  border-radius: 12px;\n}\n.tp-skel[_ngcontent-%COMP%] {\n  height: 110px;\n  background: rgba(255, 255, 255, .05);\n  border-radius: 14px;\n  animation: _ngcontent-%COMP%_tpPulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_tpPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .tp-skel[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=team-profile-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamProfilePageComponent, { className: "TeamProfilePageComponent", filePath: "src\\app\\features\\teams\\team-profile-page.component.ts", lineNumber: 208 });
})();
export {
  TeamProfilePageComponent
};
//# sourceMappingURL=chunk-MQXFZY24.js.map
