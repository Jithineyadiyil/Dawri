import {
  CommunityService
} from "./chunk-GFWMVHEB.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  NgSwitch,
  NgSwitchCase,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/community/pages/invite-redeem/invite-redeem.component.ts
function InviteRedeemComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Checking your invite\u2026");
    \u0275\u0275elementEnd()();
  }
}
function InviteRedeemComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Request sent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Your request to join has been sent to the moderators. You'll be added once it's approved.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 8);
    \u0275\u0275text(8, "Back to communities");
    \u0275\u0275elementEnd()();
  }
}
function InviteRedeemComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 9);
    \u0275\u0275text(2, "!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Invite unavailable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 8);
    \u0275\u0275text(8, "Back to communities");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var InviteRedeemComponent = class _InviteRedeemComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.api = inject(CommunityService);
    this.state = signal("loading");
    this.error = signal("");
  }
  ngOnInit() {
    const token = this.route.snapshot.paramMap.get("token");
    if (!token) {
      this.state.set("error");
      this.error.set("No invite token provided.");
      return;
    }
    this.api.redeemInvite(token).subscribe({
      next: (res) => this.handle(res.result, res.community_slug),
      error: (err) => {
        this.state.set("error");
        this.error.set(err?.error?.message ?? "This invite link is invalid or has expired.");
      }
    });
  }
  handle(result, slug) {
    if (result === "joined" || result === "member") {
      this.router.navigate(["/community", slug]);
      return;
    }
    this.state.set("requested");
  }
  static {
    this.\u0275fac = function InviteRedeemComponent_Factory(t) {
      return new (t || _InviteRedeemComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InviteRedeemComponent, selectors: [["app-invite-redeem"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 4, consts: [[1, "wrap"], [1, "card"], [1, "logo"], [3, "ngSwitch"], ["class", "msg", 4, "ngSwitchCase"], [1, "msg"], [1, "spinner"], [1, "icon", "ok"], ["routerLink", "/community", 1, "btn"], [1, "icon", "bad"]], template: function InviteRedeemComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3, "\u062F\u0627\u0648\u0631\u064A");
        \u0275\u0275elementEnd();
        \u0275\u0275elementContainerStart(4, 3);
        \u0275\u0275template(5, InviteRedeemComponent_div_5_Template, 4, 0, "div", 4)(6, InviteRedeemComponent_div_6_Template, 9, 0, "div", 4)(7, InviteRedeemComponent_div_7_Template, 9, 1, "div", 4);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("ngSwitch", ctx.state());
        \u0275\u0275advance();
        \u0275\u0275property("ngSwitchCase", "loading");
        \u0275\u0275advance();
        \u0275\u0275property("ngSwitchCase", "requested");
        \u0275\u0275advance();
        \u0275\u0275property("ngSwitchCase", "error");
      }
    }, dependencies: [CommonModule, NgSwitch, NgSwitchCase, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --gold: #d4af37;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --line: rgba(124,58,237,0.18);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.wrap[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: var(--bg);\n  padding: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 16px;\n  padding: 2.2rem 1.8rem;\n  text-align: center;\n  box-shadow: 0 0 40px rgba(124, 58, 237, 0.12);\n}\n.logo[_ngcontent-%COMP%] {\n  font-family:\n    "Noto Sans Arabic",\n    "Anton",\n    sans-serif;\n  font-size: 2rem;\n  color: var(--gold);\n  margin-bottom: 1.4rem;\n}\n.msg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.7rem;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text);\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\np[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--mut);\n  font-size: 0.92rem;\n  line-height: 1.5;\n}\n.icon[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  font-size: 1.6rem;\n  font-weight: 700;\n}\n.icon.ok[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, 0.18);\n  color: var(--accent-s);\n}\n.icon.bad[_ngcontent-%COMP%] {\n  background: rgba(255, 107, 107, 0.15);\n  color: #ff6b6b;\n}\n.btn[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n  display: inline-block;\n  background: var(--accent);\n  color: #fff;\n  text-decoration: none;\n  padding: 0.55rem 1.2rem;\n  border-radius: 8px;\n  font-weight: 700;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--line);\n  border-top-color: var(--accent);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=invite-redeem.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InviteRedeemComponent, { className: "InviteRedeemComponent", filePath: "src\\app\\features\\community\\pages\\invite-redeem\\invite-redeem.component.ts", lineNumber: 64 });
})();
export {
  InviteRedeemComponent
};
//# sourceMappingURL=chunk-3QUEE6J4.js.map
