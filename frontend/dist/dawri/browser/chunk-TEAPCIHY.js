import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  CommonModule,
  HttpClient,
  InputFlags,
  inject,
  input,
  signal,
  tap,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";

// src/app/features/organizer/organizer-verification.service.ts
var OrganizerVerificationService = class _OrganizerVerificationService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl;
    this.status = signal(null);
    this.loading = signal(false);
  }
  loadStatus() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.http.get(`${this.base}/me/organizer-status`).subscribe({
      next: (s) => {
        this.status.set(s);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
  apply(payload) {
    return this.http.post(`${this.base}/me/organizer-verification`, payload).pipe(tap(() => this.loadStatus()));
  }
  // Admin
  listAdmin(status = "pending") {
    return this.http.get(`${this.base}/admin/organizer-verifications`, { params: { status } });
  }
  approveAdmin(id, tier, note) {
    return this.http.post(`${this.base}/admin/organizer-verifications/${id}/approve`, { tier, note });
  }
  rejectAdmin(id, note) {
    return this.http.post(`${this.base}/admin/organizer-verifications/${id}/reject`, { note });
  }
  static {
    this.\u0275fac = function OrganizerVerificationService_Factory(t) {
      return new (t || _OrganizerVerificationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrganizerVerificationService, factory: _OrganizerVerificationService.\u0275fac, providedIn: "root" });
  }
};
var TIER_LABELS = {
  none: "Unverified",
  verified: "Verified",
  professional: "Professional",
  admin: "Admin"
};

// src/app/features/organizer/tier-badge.component.ts
function TierBadgeComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275element(1, "path", 3);
    \u0275\u0275elementEnd();
  }
}
function TierBadgeComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275element(1, "path", 4);
    \u0275\u0275elementEnd();
  }
}
function TierBadgeComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275element(1, "path", 5);
    \u0275\u0275elementEnd();
  }
}
function TierBadgeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275template(1, TierBadgeComponent_Conditional_0_Conditional_1_Template, 2, 0, ":svg:svg", 2)(2, TierBadgeComponent_Conditional_0_Conditional_2_Template, 2, 0)(3, TierBadgeComponent_Conditional_0_Conditional_3_Template, 2, 0);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("tb--" + ctx_r0.tier());
    \u0275\u0275property("title", ctx_r0.label());
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.tier() === "professional" ? 1 : ctx_r0.tier() === "verified" ? 2 : ctx_r0.tier() === "admin" ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.label(), " ");
  }
}
var TierBadgeComponent = class _TierBadgeComponent {
  constructor() {
    this.tier = input("none");
  }
  label() {
    return TIER_LABELS[this.tier() ?? "none"];
  }
  static {
    this.\u0275fac = function TierBadgeComponent_Factory(t) {
      return new (t || _TierBadgeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TierBadgeComponent, selectors: [["app-tier-badge"]], inputs: { tier: [InputFlags.SignalBased, "tier"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [[1, "tb", 3, "class", "title"], [1, "tb", 3, "title"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"], ["d", "M9 12l2 2 4-4M12 1l3 2h4v4l2 3-2 3v4h-4l-3 2-3-2H5v-4l-2-3 2-3V3h4l3-2z"], ["d", "M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"]], template: function TierBadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TierBadgeComponent_Conditional_0_Template, 5, 5, "span", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.tier() && ctx.tier() !== "none" ? 0 : -1);
      }
    }, dependencies: [CommonModule], styles: ["\n\n.tb[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 8px;\n  border-radius: 100px;\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  line-height: 1;\n}\n.tb--verified[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .16);\n  color: #4ade80;\n  border: 1px solid rgba(0, 108, 53, .5);\n}\n.tb--professional[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .15);\n  color: var(--accent, #d4af37);\n  border: 1px solid rgba(212, 175, 55, .5);\n}\n.tb--admin[_ngcontent-%COMP%] {\n  background: rgba(46, 139, 255, .15);\n  color: #5ba6ff;\n  border: 1px solid rgba(46, 139, 255, .5);\n}\n/*# sourceMappingURL=tier-badge.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TierBadgeComponent, { className: "TierBadgeComponent", filePath: "src\\app\\features\\organizer\\tier-badge.component.ts", lineNumber: 41 });
})();

export {
  OrganizerVerificationService,
  TierBadgeComponent
};
//# sourceMappingURL=chunk-TEAPCIHY.js.map
