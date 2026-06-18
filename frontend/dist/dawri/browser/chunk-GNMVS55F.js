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
  Router,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";

// src/app/features/social/friends-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.friendship_id;
var _c0 = () => [1, 2, 3, 4, 5, 6];
function FriendsPageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.fs.requestCount());
  }
}
function FriendsPageComponent_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 10);
  }
}
function FriendsPageComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, FriendsPageComponent_Conditional_21_For_2_Template, 1, 0, "div", 10, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13)(3, "circle", 14)(4, "path", 15)(5, "path", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h3");
    \u0275\u0275text(7, "No friends yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Open a community and add members as friends to start chatting and challenging them.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 17);
    \u0275\u0275text(11, "Browse communities");
    \u0275\u0275elementEnd()();
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('No friends match "', ctx_r0.query(), '".');
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 28);
  }
  if (rf & 2) {
    const f_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", f_r4.avatar_url, \u0275\u0275sanitizeUrl)("alt", f_r4.display_name);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((f_r4.display_name || "?").charAt(0));
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const f_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 ", "@" + f_r4.nickname, " ");
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 26);
    \u0275\u0275element(2, "span", 27);
    \u0275\u0275template(3, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Conditional_3_Template, 1, 2, "img", 28)(4, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Conditional_4_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 29)(6, "div", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 31)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 32)(13, "button", 33);
    \u0275\u0275listener("click", function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Template_button_click_13_listener() {
      const f_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.challenge(f_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 34);
    \u0275\u0275element(15, "path", 35)(16, "path", 36)(17, "path", 37)(18, "path", 38)(19, "path", 39)(20, "path", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "button", 41);
    \u0275\u0275listener("click", function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Template_button_click_21_listener() {
      const f_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.message(f_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(22, "svg", 34);
    \u0275\u0275element(23, "path", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(24, "button", 43);
    \u0275\u0275listener("click", function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Template_button_click_24_listener() {
      const f_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.remove(f_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 34);
    \u0275\u0275element(26, "path", 13)(27, "circle", 14)(28, "line", 44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const f_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("fr-dot--" + ctx_r0.fs.presenceOf(f_r4.id));
    \u0275\u0275property("title", ctx_r0.fs.presenceOf(f_r4.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(3, f_r4.avatar_url ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(f_r4.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("fr-pres fr-pres--", ctx_r0.fs.presenceOf(f_r4.id), "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.fs.presenceOf(f_r4.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(11, f_r4.nickname ? 11 : -1);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_For_2_Template, 29, 10, "div", 25, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.filteredFriends());
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 19);
    \u0275\u0275element(2, "circle", 20)(3, "path", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "input", 22);
    \u0275\u0275listener("input", function FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.query.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_5_Template, 2, 1, "p", 23)(6, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Conditional_6_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r0.query());
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ctx_r0.filteredFriends().length === 0 ? 5 : 6);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_0_Template, 12, 0, "div", 11)(1, FriendsPageComponent_Conditional_22_Conditional_0_Conditional_1_Template, 7, 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, ctx_r0.fs.friends().length === 0 ? 0 : 1);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "h3");
    \u0275\u0275text(2, "No pending requests");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "When someone adds you, their request shows up here.");
    \u0275\u0275elementEnd()();
  }
}
function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 28);
  }
  if (rf & 2) {
    const r_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", r_r6.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", r_r6.user.display_name);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((r_r6.user.display_name || "?").charAt(0));
  }
}
function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 46);
    \u0275\u0275template(2, FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Conditional_2_Template, 1, 2, "img", 28)(3, FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 29)(5, "div", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 31);
    \u0275\u0275text(8, "wants to be friends");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 32)(10, "button", 47);
    \u0275\u0275listener("click", function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Template_button_click_10_listener() {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.decline(r_r6));
    });
    \u0275\u0275text(11, "Decline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 48);
    \u0275\u0275listener("click", function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Template_button_click_12_listener() {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.accept(r_r6));
    });
    \u0275\u0275text(13, "Accept");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, r_r6.user.avatar_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r6.user.display_name);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.busy().has(r_r6.friendship_id));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy().has(r_r6.friendship_id));
  }
}
function FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_For_2_Template, 14, 4, "div", 25, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.fs.requests());
  }
}
function FriendsPageComponent_Conditional_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FriendsPageComponent_Conditional_22_Conditional_1_Conditional_0_Template, 5, 0, "div", 11)(1, FriendsPageComponent_Conditional_22_Conditional_1_Conditional_1_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, ctx_r0.fs.requests().length === 0 ? 0 : 1);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "h3");
    \u0275\u0275text(2, "No sent requests");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Requests you send that are still pending will appear here.");
    \u0275\u0275elementEnd()();
  }
}
function FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 28);
  }
  if (rf & 2) {
    const r_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", r_r8.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", r_r8.user.display_name);
  }
}
function FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((r_r8.user.display_name || "?").charAt(0));
  }
}
function FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 46);
    \u0275\u0275template(2, FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Conditional_2_Template, 1, 2, "img", 28)(3, FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 29)(5, "div", 30);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 31);
    \u0275\u0275text(8, "request pending\u2026");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 32)(10, "button", 47);
    \u0275\u0275listener("click", function FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Template_button_click_10_listener() {
      const r_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.cancel(r_r8.user));
    });
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, r_r8.user.avatar_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r8.user.display_name);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.busy().has(r_r8.user.id));
  }
}
function FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_For_2_Template, 12, 3, "div", 25, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.fs.sent());
  }
}
function FriendsPageComponent_Conditional_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FriendsPageComponent_Conditional_22_Conditional_2_Conditional_0_Template, 5, 0, "div", 11)(1, FriendsPageComponent_Conditional_22_Conditional_2_Conditional_1_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, ctx_r0.fs.sent().length === 0 ? 0 : 1);
  }
}
function FriendsPageComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FriendsPageComponent_Conditional_22_Conditional_0_Template, 2, 1)(1, FriendsPageComponent_Conditional_22_Conditional_1_Template, 2, 1)(2, FriendsPageComponent_Conditional_22_Conditional_2_Template, 2, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r0.tab() === "friends" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.tab() === "requests" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ctx_r0.tab() === "sent" ? 2 : -1);
  }
}
var FriendsPageComponent = class _FriendsPageComponent {
  constructor() {
    this.fs = inject(FriendService);
    this.dm = inject(DmService);
    this.challengeUi = inject(ChallengeUiService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.tab = signal("friends");
    this.busy = signal(/* @__PURE__ */ new Set());
    this.query = signal("");
    this.filteredFriends = computed(() => {
      const q = this.query().toLowerCase().trim();
      const list = this.fs.friends();
      if (!q)
        return list;
      return list.filter((f) => (f.display_name ?? "").toLowerCase().includes(q) || (f.nickname ?? "").toLowerCase().includes(q));
    });
  }
  ngOnInit() {
    this.fs.load();
    const t = new URLSearchParams(location.search).get("tab");
    if (t === "requests" || t === "sent")
      this.tab.set(t);
  }
  mark(id, on) {
    this.busy.update((s) => {
      const n = new Set(s);
      on ? n.add(id) : n.delete(id);
      return n;
    });
  }
  accept(r) {
    this.mark(r.friendship_id, true);
    this.fs.accept(r).subscribe({
      next: () => {
        this.toast.success(`You and ${r.user.display_name} are now friends.`);
        this.mark(r.friendship_id, false);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed to accept.");
        this.mark(r.friendship_id, false);
      }
    });
  }
  decline(r) {
    this.mark(r.friendship_id, true);
    this.fs.decline(r).subscribe({
      next: () => this.mark(r.friendship_id, false),
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(r.friendship_id, false);
      }
    });
  }
  cancel(user) {
    this.mark(user.id, true);
    this.fs.remove(user.id).subscribe({
      next: () => this.mark(user.id, false),
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(user.id, false);
      }
    });
  }
  remove(user) {
    this.fs.remove(user.id).subscribe({
      next: () => this.toast.info(`Removed ${user.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Failed.")
    });
  }
  message(user) {
    this.dm.openWith(user).subscribe({
      next: () => this.router.navigate(["/community/home"], { queryParams: { pane: "messages" } }),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not open chat.")
    });
  }
  challenge(user) {
    this.challengeUi.open(user);
  }
  static {
    this.\u0275fac = function FriendsPageComponent_Factory(t) {
      return new (t || _FriendsPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FriendsPageComponent, selectors: [["app-friends-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 10, consts: [[1, "fr-page"], [1, "fr-head"], [1, "fr-eyebrow"], [1, "fr-title"], ["routerLink", "/community", 1, "fr-link"], ["role", "tablist", 1, "fr-tabs"], ["role", "tab", 3, "click"], [1, "fr-count"], [1, "fr-count", "fr-count--alert"], [1, "fr-grid"], [1, "fr-skel"], [1, "fr-empty"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], ["routerLink", "/community", 1, "fr-btn", "fr-btn--primary"], [1, "fr-search"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "text", "placeholder", "Search friends", 3, "input", "value"], [1, "fr-none"], [1, "fr-list"], [1, "fr-row"], [1, "fr-ava", "fr-ava--sm"], [1, "fr-dot", "fr-dot--corner", 3, "title"], [3, "src", "alt"], [1, "fr-info"], [1, "fr-name"], [1, "fr-sub"], [1, "fr-actions"], ["title", "Challenge to a match", 1, "fr-icon", "fr-icon--challenge", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"], ["title", "Message", 1, "fr-icon", "fr-icon--msg", 3, "click"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], ["title", "Remove friend", 1, "fr-icon", 3, "click"], ["x1", "22", "y1", "11", "x2", "16", "y2", "11"], [1, "fr-ava-letter"], [1, "fr-ava"], [1, "fr-btn", "fr-btn--ghost", 3, "click", "disabled"], [1, "fr-btn", "fr-btn--primary", 3, "click", "disabled"]], template: function FriendsPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Social");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Friends");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 4);
        \u0275\u0275text(8, "Back to Community \u2192");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 5)(10, "button", 6);
        \u0275\u0275listener("click", function FriendsPageComponent_Template_button_click_10_listener() {
          return ctx.tab.set("friends");
        });
        \u0275\u0275text(11, " Friends ");
        \u0275\u0275elementStart(12, "span", 7);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "button", 6);
        \u0275\u0275listener("click", function FriendsPageComponent_Template_button_click_14_listener() {
          return ctx.tab.set("requests");
        });
        \u0275\u0275text(15, " Requests ");
        \u0275\u0275template(16, FriendsPageComponent_Conditional_16_Template, 2, 1, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 6);
        \u0275\u0275listener("click", function FriendsPageComponent_Template_button_click_17_listener() {
          return ctx.tab.set("sent");
        });
        \u0275\u0275text(18, " Sent ");
        \u0275\u0275elementStart(19, "span", 7);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(21, FriendsPageComponent_Conditional_21_Template, 3, 1, "div", 9)(22, FriendsPageComponent_Conditional_22_Template, 3, 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275classProp("active", ctx.tab() === "friends");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.fs.friends().length);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "requests");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(16, ctx.fs.requestCount() > 0 ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "sent");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.fs.sent().length);
        \u0275\u0275advance();
        \u0275\u0275conditional(21, ctx.fs.loading() && !ctx.fs.loaded() ? 21 : 22);
      }
    }, dependencies: [CommonModule, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.fr-page[_ngcontent-%COMP%] {\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n  color: var(--text, #ececf1);\n}\n.fr-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.1rem;\n  flex-wrap: wrap;\n}\n.fr-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.fr-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.fr-link[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  text-decoration: none;\n  &:hover {\n    color: var(--text);\n  }\n}\n.fr-tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 2px;\n  padding: 3px;\n  margin-bottom: 1.1rem;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 10px;\n}\n.fr-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 7px 14px;\n  border-radius: 7px;\n  background: transparent;\n  border: none;\n  color: var(--mu, #8a8aa0);\n  font-family: var(--fb, sans-serif);\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background .15s, color .15s;\n}\n.fr-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.fr-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  color: var(--text);\n}\n.fr-search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 12px;\n  margin-bottom: 10px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 10px;\n}\n.fr-search[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  flex-shrink: 0;\n}\n.fr-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--text);\n  font-size: 14px;\n  font-family: var(--fb, sans-serif);\n  &::placeholder {\n    color: var(--mu, #8a8aa0);\n  }\n}\n.fr-none[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  padding: 16px 4px;\n  font-size: 14px;\n}\n.fr-pres[_ngcontent-%COMP%] {\n  text-transform: capitalize;\n}\n.fr-pres--online[_ngcontent-%COMP%] {\n  color: #4ade80;\n}\n.fr-pres--idle[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.fr-pres--offline[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n}\n.fr-count[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  padding: 1px 7px;\n  border-radius: 100px;\n  background: rgba(255, 255, 255, .08);\n  color: var(--mu);\n}\n.fr-count--alert[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n}\n.fr-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 12px;\n}\n.fr-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px;\n  position: relative;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 12px;\n  transition: border-color .15s, transform .15s;\n}\n.fr-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2, rgba(255,255,255,.14));\n  transform: translateY(-2px);\n}\n.fr-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fr-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 8px 10px;\n  border-radius: 10px;\n  transition: background .12s;\n}\n.fr-row[_ngcontent-%COMP%]:hover {\n  background: var(--bg2, #10101c);\n}\n.fr-ava[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.fr-ava--sm[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n}\n.fr-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.fr-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 17px;\n  color: #fff;\n}\n.fr-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  border: 2px solid var(--bg2, #10101c);\n}\n.fr-dot--corner[_ngcontent-%COMP%] {\n  top: auto;\n  left: auto;\n  bottom: -1px;\n  right: -1px;\n  width: 11px;\n  height: 11px;\n  border-color: var(--bg, #0a0a12);\n}\n.fr-dot--online[_ngcontent-%COMP%] {\n  background: #4ade80;\n  box-shadow: 0 0 6px #4ade80;\n}\n.fr-dot--idle[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n}\n.fr-dot--offline[_ngcontent-%COMP%] {\n  background: #4b5563;\n}\n.fr-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.fr-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.fr-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.fr-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.fr-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-family: var(--fb, sans-serif);\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition:\n    background .15s,\n    border-color .15s,\n    color .15s;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.fr-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.fr-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n.fr-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  color: var(--mu, #8a8aa0);\n  transition:\n    color .15s,\n    border-color .15s,\n    background .15s;\n  &:hover {\n    color: #fca5a5;\n    border-color: rgba(239, 68, 68, .4);\n    background: rgba(239, 68, 68, .08);\n  }\n}\n.fr-icon--msg[_ngcontent-%COMP%]:hover {\n  color: #4ade80 !important;\n  border-color: rgba(0, 108, 53, .5) !important;\n  background: rgba(0, 108, 53, .12) !important;\n}\n.fr-icon--challenge[_ngcontent-%COMP%]:hover {\n  color: var(--accent, #d4af37) !important;\n  border-color: rgba(212, 175, 55, .5) !important;\n  background: rgba(212, 175, 55, .12) !important;\n}\n.fr-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--mu, #8a8aa0);\n  svg {\n    color: var(--dim, #55556e);\n    margin-bottom: 12px;\n  }\n  h3 {\n    color: var(--text);\n    margin: 0 0 8px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: .5px;\n  }\n  p {\n    margin: 0 auto 18px;\n    max-width: 42ch;\n    line-height: 1.5;\n  }\n}\n.fr-skel[_ngcontent-%COMP%] {\n  height: 64px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, .05);\n  animation: _ngcontent-%COMP%_frPulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_frPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .fr-card[_ngcontent-%COMP%], .fr-skel[_ngcontent-%COMP%] {\n    transition: none;\n    animation: none;\n  }\n}\n/*# sourceMappingURL=friends-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FriendsPageComponent, { className: "FriendsPageComponent", filePath: "src\\app\\features\\social\\friends-page.component.ts", lineNumber: 247 });
})();

export {
  FriendsPageComponent
};
//# sourceMappingURL=chunk-GNMVS55F.js.map
