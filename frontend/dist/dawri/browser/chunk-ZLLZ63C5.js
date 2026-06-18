import {
  FriendsPageComponent
} from "./chunk-GNMVS55F.js";
import {
  MessagesPageComponent
} from "./chunk-6HJMVQ2X.js";
import "./chunk-UCVFPWUM.js";
import {
  ChallengesPageComponent
} from "./chunk-VOY7GMHG.js";
import {
  ChallengeService
} from "./chunk-ILO7ZWQZ.js";
import "./chunk-WWXU4OML.js";
import {
  FriendService
} from "./chunk-H4EFRF6P.js";
import {
  DmService
} from "./chunk-5L7FNWZJ.js";
import "./chunk-QBAOKTDJ.js";
import "./chunk-GFWMVHEB.js";
import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import "./chunk-MOASSL4Z.js";
import "./chunk-LNNIKBGT.js";
import "./chunk-EVGLZ2AV.js";
import "./chunk-OERRWE4S.js";
import {
  ActivatedRoute
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DestroyRef,
  inject,
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
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/social/social-home.component.ts
function SocialHomeComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.friends.requestCount());
  }
}
function SocialHomeComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.dm.unread());
  }
}
function SocialHomeComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cs.alertCount());
  }
}
function SocialHomeComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-friends-page");
  }
}
function SocialHomeComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-messages-page", 22);
  }
  if (rf & 2) {
    \u0275\u0275property("embedded", true);
  }
}
function SocialHomeComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-challenges-page", 22);
  }
  if (rf & 2) {
    \u0275\u0275property("embedded", true);
  }
}
var SocialHomeComponent = class _SocialHomeComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.destroyRef = inject(DestroyRef);
    this.dm = inject(DmService);
    this.friends = inject(FriendService);
    this.cs = inject(ChallengeService);
    this.pane = signal("friends");
  }
  ngOnInit() {
    if (!this.friends.loaded())
      this.friends.load();
    this.dm.loadUnread();
    if (!this.cs.loaded())
      this.cs.load();
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => {
      const v = p.get("pane");
      if (v === "messages" || v === "friends" || v === "challenges")
        this.pane.set(v);
    });
  }
  setPane(p) {
    this.pane.set(p);
  }
  static {
    this.\u0275fac = function SocialHomeComponent_Factory(t) {
      return new (t || _SocialHomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SocialHomeComponent, selectors: [["app-social-home"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 38, vars: 12, consts: [[1, "social-home"], [1, "sh-switch"], [1, "sh-brand"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "sh-brand__mark"], ["d", "M13 2 3 14h7l-1 8 10-12h-7l1-8z"], [1, "sh-tabs"], [3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "sh-badge"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], [1, "sh-badge", "sh-badge--blue"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"], [1, "sh-body"], [3, "embedded"]], template: function SocialHomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275text(5, " Dawri ");
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "span");
        \u0275\u0275text(7, "Connect");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "em");
        \u0275\u0275text(9, "+");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 5)(11, "button", 6);
        \u0275\u0275listener("click", function SocialHomeComponent_Template_button_click_11_listener() {
          return ctx.setPane("friends");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 7);
        \u0275\u0275element(13, "path", 8)(14, "circle", 9)(15, "path", 10)(16, "path", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275text(17, " Friends ");
        \u0275\u0275template(18, SocialHomeComponent_Conditional_18_Template, 2, 1, "span", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(19, "button", 6);
        \u0275\u0275listener("click", function SocialHomeComponent_Template_button_click_19_listener() {
          return ctx.setPane("messages");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(20, "svg", 7);
        \u0275\u0275element(21, "path", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275text(22, " Messages ");
        \u0275\u0275template(23, SocialHomeComponent_Conditional_23_Template, 2, 1, "span", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "button", 6);
        \u0275\u0275listener("click", function SocialHomeComponent_Template_button_click_24_listener() {
          return ctx.setPane("challenges");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(25, "svg", 7);
        \u0275\u0275element(26, "path", 15)(27, "path", 16)(28, "path", 17)(29, "path", 18)(30, "path", 19)(31, "path", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " Challenges ");
        \u0275\u0275template(33, SocialHomeComponent_Conditional_33_Template, 2, 1, "span", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(34, "div", 21);
        \u0275\u0275template(35, SocialHomeComponent_Conditional_35_Template, 1, 0, "app-friends-page")(36, SocialHomeComponent_Conditional_36_Template, 1, 1)(37, SocialHomeComponent_Conditional_37_Template, 1, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275classProp("active", ctx.pane() === "friends");
        \u0275\u0275advance(7);
        \u0275\u0275conditional(18, ctx.friends.requestCount() > 0 ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.pane() === "messages");
        \u0275\u0275advance(4);
        \u0275\u0275conditional(23, ctx.dm.unread() > 0 ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.pane() === "challenges");
        \u0275\u0275advance(9);
        \u0275\u0275conditional(33, ctx.cs.alertCount() > 0 ? 33 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("sh-body--chat", ctx.pane() === "messages");
        \u0275\u0275advance();
        \u0275\u0275conditional(35, ctx.pane() === "friends" ? 35 : ctx.pane() === "messages" ? 36 : 37);
      }
    }, dependencies: [CommonModule, FriendsPageComponent, MessagesPageComponent, ChallengesPageComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n.social-home[_ngcontent-%COMP%] {\n  height: 100%;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.sh-switch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 10px 16px;\n  border-bottom: 1px solid var(--br, rgba(255,255,255,.08));\n  flex-shrink: 0;\n  flex-wrap: wrap;\n}\n.sh-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.sh-brand[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-family: var(--fh, "Anton", sans-serif);\n  font-size: 17px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text, #ececf1);\n  span {\n    color: var(--accent, #d4af37);\n  }\n  em {\n    font-style: normal;\n    color: var(--primary, #4ade80);\n    margin-left: 1px;\n  }\n}\n.sh-brand__mark[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n  flex-shrink: 0;\n}\n.sh-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 16px;\n  border-radius: 9px;\n  border: none;\n  cursor: pointer;\n  background: transparent;\n  color: var(--mu, #8a8aa0);\n  font-family: var(--fb, sans-serif);\n  font-weight: 700;\n  font-size: 13.5px;\n  transition: background .15s, color .15s;\n}\n.sh-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--text, #ececf1);\n  background: rgba(255, 255, 255, .04);\n}\n.sh-switch[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff;\n  background: var(--primary, #006c35);\n}\n.sh-badge[_ngcontent-%COMP%] {\n  display: inline-grid;\n  place-items: center;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 100px;\n  background: #ef4444;\n  color: #fff;\n  font-family: var(--fm, monospace);\n  font-size: 0.62rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.sh-switch[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]   .sh-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .25);\n}\n.sh-badge--blue[_ngcontent-%COMP%] {\n  background: #2e8bff;\n}\n.sh-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.sh-body--chat[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n/*# sourceMappingURL=social-home.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SocialHomeComponent, { className: "SocialHomeComponent", filePath: "src\\app\\features\\social\\social-home.component.ts", lineNumber: 105 });
})();
export {
  SocialHomeComponent
};
//# sourceMappingURL=chunk-ZLLZ63C5.js.map
