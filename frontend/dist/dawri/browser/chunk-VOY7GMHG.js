import {
  ChallengeService
} from "./chunk-ILO7ZWQZ.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  InputFlags,
  computed,
  inject,
  input,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";

// src/app/features/social/challenges-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => [1, 2, 3];
var _c1 = () => ({ pane: "friends" });
function ChallengesPageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cs.incoming().length);
  }
}
function ChallengesPageComponent_Conditional_22_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
}
function ChallengesPageComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ChallengesPageComponent_Conditional_22_For_1_Template, 1, 0, "div", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 11);
    \u0275\u0275element(2, "path", 12)(3, "path", 13)(4, "path", 14)(5, "path", 15)(6, "path", 16)(7, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "Challenge a friend from the Friends list to get started.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "a", 18);
    \u0275\u0275text(13, "Go to Friends");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.emptyTitle());
    \u0275\u0275advance(3);
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(2, _c1));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl)("alt", ctx_r0.opponentName(c_r2));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.opponentInitial(c_r2));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, "team");
    \u0275\u0275elementEnd();
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
    \u0275\u0275elementStart(1, "span", 33);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \xB7 ");
    \u0275\u0275elementStart(4, "span", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", c_r2.my_score, "\u2013", c_r2.their_score, "");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("win", c_r2.i_won === true)("loss", c_r2.i_won === false);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r2.i_won === true ? "Won" : c_r2.i_won === false ? "Lost" : "");
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 Declined ");
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 Cancelled ");
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('"', c_r2.message, '"');
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.run(c_r2, "decline"));
    });
    \u0275\u0275text(1, "Decline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 36);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_18_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.run(c_r2, "accept"));
    });
    \u0275\u0275text(3, "Accept");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.busy(c_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy(c_r2.id));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 35);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_19_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const c_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.run(c_r2, "cancel"));
    });
    \u0275\u0275text(3, "Cancel");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy(c_r2.id));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 36);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_0_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const c_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.run(c_r2, "confirm"));
    });
    \u0275\u0275text(3, "Confirm");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("They reported ", c_r2.my_score, "\u2013", c_r2.their_score, "");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.busy(c_r2.id));
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "Awaiting confirmation");
    \u0275\u0275elementEnd();
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_2_Template(rf, ctx) {
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const c_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.startReport(c_r2));
    });
    \u0275\u0275text(1, "Report result");
    \u0275\u0275elementEnd();
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_0_Template, 4, 3)(1, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_1_Template, 2, 0)(2, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_2_Template, 0, 0)(3, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Conditional_3_Template, 2, 0);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(0, c_r2.can_confirm ? 0 : c_r2.i_reported ? 1 : ctx_r0.reportingId() === c_r2.id ? 2 : 3);
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 40)(2, "label");
    \u0275\u0275text(3, "You ");
    \u0275\u0275elementStart(4, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.myScore, $event) || (ctx_r0.myScore = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 42);
    \u0275\u0275text(6, "\u2013");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.theirScore, $event) || (ctx_r0.theirScore = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 43)(11, "span", 44);
    \u0275\u0275text(12, "Winner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 45);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.winner.set("me"));
    });
    \u0275\u0275text(14, "You");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 45);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.winner.set("them"));
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 46)(18, "button", 47);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.reportingId.set(null));
    });
    \u0275\u0275text(19, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 36);
    \u0275\u0275listener("click", function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r7);
      const c_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.submitReport(c_r2));
    });
    \u0275\u0275text(21, "Submit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.myScore);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.opponentName(c_r2), " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.theirScore);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.winner() === "me");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.winner() === "them");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.opponentName(c_r2));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.busy(c_r2.id) || ctx_r0.winner() === null);
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 22);
    \u0275\u0275template(2, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_2_Template, 1, 2, "img", 23)(3, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24)(5, "div", 25);
    \u0275\u0275text(6, "vs ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_9_Template, 2, 0, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 27)(11, "span", 28);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_13_Template, 6, 7)(14, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_14_Template, 1, 0)(15, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_15_Template, 1, 0)(16, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_16_Template, 2, 1, "div", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 30);
    \u0275\u0275template(18, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_18_Template, 4, 2)(19, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_19_Template, 4, 1)(20, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Case_20_Template, 4, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Conditional_21_Template, 22, 9, "div", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    let tmp_21_0;
    const c_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("ch-card--win", c_r2.status === "completed" && c_r2.i_won === true)("ch-card--loss", c_r2.status === "completed" && c_r2.i_won === false);
    \u0275\u0275advance();
    \u0275\u0275classProp("ch-ava--team", c_r2.kind === "team");
    \u0275\u0275advance();
    \u0275\u0275conditional(2, (tmp_15_0 = ctx_r0.opponentAvatar(c_r2)) ? 2 : 3, tmp_15_0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.opponentName(c_r2));
    \u0275\u0275advance();
    \u0275\u0275conditional(9, c_r2.kind === "team" ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r2.game_label);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, c_r2.status === "completed" ? 13 : c_r2.status === "declined" ? 14 : c_r2.status === "cancelled" ? 15 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(16, c_r2.message && c_r2.status !== "completed" ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(18, (tmp_21_0 = ctx_r0.tab()) === "incoming" ? 18 : tmp_21_0 === "sent" ? 19 : tmp_21_0 === "active" ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(21, ctx_r0.tab() === "active" && ctx_r0.reportingId() === c_r2.id && !c_r2.can_confirm && !c_r2.i_reported ? 21 : -1);
  }
}
function ChallengesPageComponent_Conditional_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275repeaterCreate(1, ChallengesPageComponent_Conditional_23_Conditional_1_For_2_Template, 22, 14, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.list());
  }
}
function ChallengesPageComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ChallengesPageComponent_Conditional_23_Conditional_0_Template, 14, 3, "div", 10)(1, ChallengesPageComponent_Conditional_23_Conditional_1_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r0.list().length === 0 ? 0 : 1);
  }
}
var ChallengesPageComponent = class _ChallengesPageComponent {
  constructor() {
    this.cs = inject(ChallengeService);
    this.auth = inject(AuthService);
    this.toast = inject(ToastService);
    this.embedded = input(false);
    this.tab = signal("active");
    this.reportingId = signal(null);
    this.winner = signal(null);
    this.busyIds = signal(/* @__PURE__ */ new Set());
    this.myScore = null;
    this.theirScore = null;
    this.list = computed(() => {
      switch (this.tab()) {
        case "incoming":
          return this.cs.incoming();
        case "sent":
          return this.cs.sent();
        case "history":
          return this.cs.history();
        default:
          return this.cs.active();
      }
    });
    this.emptyTitle = computed(() => ({
      active: "No active challenges",
      incoming: "No incoming challenges",
      sent: "No sent challenges",
      history: "No past challenges"
    })[this.tab()]);
  }
  ngOnInit() {
    this.cs.load();
  }
  busy(id) {
    return this.busyIds().has(id);
  }
  mark(id, on) {
    this.busyIds.update((s) => {
      const n = new Set(s);
      on ? n.add(id) : n.delete(id);
      return n;
    });
  }
  run(c, action) {
    this.mark(c.id, true);
    this.cs[action](c).subscribe({
      next: () => this.mark(c.id, false),
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(c.id, false);
      }
    });
  }
  /** Other side display: team name (for team challenges) or opponent display name. */
  opponentName(c) {
    if (c.kind === "team") {
      const t = c.i_am_challenger ? c.opponent_team : c.challenger_team;
      return t ? t.tag ? `[${t.tag}] ${t.name}` : t.name : "Team";
    }
    return c.opponent?.display_name ?? "?";
  }
  /** My side name (team challenges only — used in the vs line). */
  myTeamName(c) {
    if (c.kind !== "team")
      return "";
    const t = c.i_am_challenger ? c.challenger_team : c.opponent_team;
    return t ? t.tag ? `[${t.tag}]` : t.name : "My team";
  }
  opponentAvatar(c) {
    if (c.kind === "team") {
      const t = c.i_am_challenger ? c.opponent_team : c.challenger_team;
      return t?.logo_url ?? null;
    }
    return c.opponent?.avatar_url ?? null;
  }
  opponentInitial(c) {
    return (this.opponentName(c) || "?").charAt(0).toUpperCase();
  }
  startReport(c) {
    this.reportingId.set(c.id);
    this.winner.set(null);
    this.myScore = null;
    this.theirScore = null;
  }
  submitReport(c) {
    const my = Number(this.myScore ?? 0), their = Number(this.theirScore ?? 0);
    const w = this.winner();
    if (w === null)
      return;
    const challengerScore = c.i_am_challenger ? my : their;
    const opponentScore = c.i_am_challenger ? their : my;
    this.mark(c.id, true);
    const obs = c.kind === "team" ? (() => {
      const myTeamId = c.i_am_challenger ? c.challenger_team?.id : c.opponent_team?.id;
      const theirTeamId = c.i_am_challenger ? c.opponent_team?.id : c.challenger_team?.id;
      const winnerTeamId = (w === "me" ? myTeamId : theirTeamId) ?? "";
      return this.cs.reportTeamResult(c, challengerScore, opponentScore, winnerTeamId);
    })() : (() => {
      const myId = this.auth.currentUser()?.id ?? "";
      const winnerId = w === "me" ? myId : c.opponent?.id ?? "";
      return this.cs.reportResult(c, challengerScore, opponentScore, winnerId);
    })();
    obs.subscribe({
      next: () => {
        this.mark(c.id, false);
        this.reportingId.set(null);
        this.toast.success("Result reported \u2014 waiting for confirmation.");
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(c.id, false);
      }
    });
  }
  static {
    this.\u0275fac = function ChallengesPageComponent_Factory(t) {
      return new (t || _ChallengesPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChallengesPageComponent, selectors: [["app-challenges-page"]], hostVars: 2, hostBindings: function ChallengesPageComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("embedded", ctx.embedded());
      }
    }, inputs: { embedded: [InputFlags.SignalBased, "embedded"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 12, consts: [[1, "ch-page"], [1, "ch-head"], [1, "ch-eyebrow"], [1, "ch-title"], [1, "ch-tabs"], [3, "click"], [1, "ch-count"], [1, "ch-count", "ch-count--alert"], [1, "ch-body"], [1, "ch-skel"], [1, "ch-empty"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.4", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"], ["routerLink", "/community/home", 1, "ch-btn", "ch-btn--primary", 3, "queryParams"], [1, "ch-list"], [1, "ch-card", 3, "ch-card--win", "ch-card--loss"], [1, "ch-card"], [1, "ch-ava"], [3, "src", "alt"], [1, "ch-info"], [1, "ch-vs"], [1, "ch-kind"], [1, "ch-meta"], [1, "ch-game"], [1, "ch-msg"], [1, "ch-actions"], [1, "ch-report"], [1, "ch-ava-letter"], [1, "ch-score"], [1, "ch-result"], [1, "ch-btn", "ch-btn--ghost", 3, "click", "disabled"], [1, "ch-btn", "ch-btn--primary", 3, "click", "disabled"], [1, "ch-pending"], [1, "ch-reported"], [1, "ch-btn", "ch-btn--primary", 3, "click"], [1, "ch-report__scores"], ["type", "number", "min", "0", 1, "ch-score-input", 3, "ngModelChange", "ngModel"], [1, "ch-x"], [1, "ch-report__winner"], [1, "ch-w-label"], ["type", "button", 3, "click"], [1, "ch-report__actions"], [1, "ch-btn", "ch-btn--ghost", 3, "click"]], template: function ChallengesPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Compete");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Challenges");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
        \u0275\u0275listener("click", function ChallengesPageComponent_Template_button_click_8_listener() {
          return ctx.tab.set("active");
        });
        \u0275\u0275text(9, " Active ");
        \u0275\u0275elementStart(10, "span", 6);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "button", 5);
        \u0275\u0275listener("click", function ChallengesPageComponent_Template_button_click_12_listener() {
          return ctx.tab.set("incoming");
        });
        \u0275\u0275text(13, " Incoming ");
        \u0275\u0275template(14, ChallengesPageComponent_Conditional_14_Template, 2, 1, "span", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 5);
        \u0275\u0275listener("click", function ChallengesPageComponent_Template_button_click_15_listener() {
          return ctx.tab.set("sent");
        });
        \u0275\u0275text(16, "Sent ");
        \u0275\u0275elementStart(17, "span", 6);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "button", 5);
        \u0275\u0275listener("click", function ChallengesPageComponent_Template_button_click_19_listener() {
          return ctx.tab.set("history");
        });
        \u0275\u0275text(20, "History");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 8);
        \u0275\u0275template(22, ChallengesPageComponent_Conditional_22_Template, 2, 1)(23, ChallengesPageComponent_Conditional_23_Template, 2, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275classProp("active", ctx.tab() === "active");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.cs.active().length);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "incoming");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(14, ctx.cs.incoming().length > 0 ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "sent");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.cs.sent().length);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "history");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(22, ctx.cs.loading() && !ctx.cs.loaded() ? 22 : 23);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.embedded[_nghost-%COMP%]   .ch-page[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow-y: auto;\n}\n.ch-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n  color: var(--text, #ececf1);\n}\n.ch-head[_ngcontent-%COMP%] {\n  margin-bottom: 1.1rem;\n}\n.ch-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.ch-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.ch-tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 2px;\n  padding: 3px;\n  margin-bottom: 1.1rem;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 10px;\n}\n.ch-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 7px 14px;\n  border-radius: 7px;\n  background: transparent;\n  border: none;\n  color: var(--mu, #8a8aa0);\n  font-family: var(--fb, sans-serif);\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background .15s, color .15s;\n}\n.ch-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.ch-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  color: var(--text);\n}\n.ch-count[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  padding: 1px 7px;\n  border-radius: 100px;\n  background: rgba(255, 255, 255, .08);\n  color: var(--mu);\n}\n.ch-count--alert[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n}\n.ch-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ch-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  flex-wrap: wrap;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 12px;\n}\n.ch-card--win[_ngcontent-%COMP%] {\n  border-color: rgba(74, 222, 128, .4);\n}\n.ch-card--loss[_ngcontent-%COMP%] {\n  opacity: .8;\n}\n.ch-ava[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.ch-ava--team[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n.ch-kind[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  padding: 1px 6px;\n  border: 1px solid rgba(212, 175, 55, .4);\n  border-radius: 100px;\n  margin-left: 8px;\n}\n.ch-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.ch-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  color: #fff;\n}\n.ch-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n}\n.ch-vs[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.ch-vs[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.ch-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 2px;\n}\n.ch-game[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.ch-score[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  color: var(--text);\n}\n.ch-result.win[_ngcontent-%COMP%] {\n  color: #4ade80;\n  font-weight: 700;\n}\n.ch-result.loss[_ngcontent-%COMP%] {\n  color: #fca5a5;\n  font-weight: 700;\n}\n.ch-msg[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-style: italic;\n  margin-top: 3px;\n}\n.ch-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.ch-pending[_ngcontent-%COMP%], .ch-reported[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n}\n.ch-reported[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.ch-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.ch-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.ch-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n.ch-report[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 6px;\n  padding-top: 12px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.ch-report__scores[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  gap: 14px;\n}\n.ch-report__scores[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  align-items: center;\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n}\n.ch-score-input[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 48px;\n  text-align: center;\n  font-family: var(--fh, sans-serif);\n  font-size: 24px;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 8px;\n  color: var(--text);\n  outline: none;\n  &:focus {\n    border-color: var(--primary, #006c35);\n  }\n}\n.ch-x[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 20px;\n  color: var(--mu);\n  padding-bottom: 12px;\n}\n.ch-report__winner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.ch-w-label[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu);\n}\n.ch-report__winner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 13px;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  color: var(--text);\n}\n.ch-report__winner[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .16);\n  border-color: var(--primary, #006c35);\n  color: #4ade80;\n  font-weight: 700;\n}\n.ch-report__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.ch-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 50px 20px;\n  color: var(--mu, #8a8aa0);\n  svg {\n    color: var(--dim, #55556e);\n    margin-bottom: 12px;\n  }\n  h3 {\n    color: var(--text);\n    margin: 0 0 8px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: .5px;\n  }\n  p {\n    margin: 0 auto 16px;\n    max-width: 40ch;\n  }\n}\n.ch-skel[_ngcontent-%COMP%] {\n  height: 66px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, .05);\n  animation: _ngcontent-%COMP%_chPulse 1.5s ease-in-out infinite;\n  margin-bottom: 8px;\n}\n@keyframes _ngcontent-%COMP%_chPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ch-skel[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=challenges-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChallengesPageComponent, { className: "ChallengesPageComponent", filePath: "src\\app\\features\\social\\challenges-page.component.ts", lineNumber: 177 });
})();

export {
  ChallengesPageComponent
};
//# sourceMappingURL=chunk-VOY7GMHG.js.map
