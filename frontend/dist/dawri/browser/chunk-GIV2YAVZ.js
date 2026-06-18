import {
  PlayerProfileViewComponent
} from "./chunk-6X7FC2BZ.js";
import "./chunk-7NGWYCOU.js";
import "./chunk-WWXU4OML.js";
import "./chunk-H4EFRF6P.js";
import "./chunk-5L7FNWZJ.js";
import "./chunk-QBAOKTDJ.js";
import "./chunk-GFWMVHEB.js";
import {
  toSignal
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
  inject,
  map,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/profile/profile.component.ts
function ProfileComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-player-profile-view", 0);
  }
  if (rf & 2) {
    \u0275\u0275property("userId", ctx);
  }
}
function ProfileComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1, "Player not found.");
    \u0275\u0275elementEnd();
  }
}
var ProfileComponent = class _ProfileComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.userId = toSignal(this.route.paramMap.pipe(map((p) => p.get("id"))), { initialValue: this.route.snapshot.paramMap.get("id") });
  }
  static {
    this.\u0275fac = function ProfileComponent_Factory(t) {
      return new (t || _ProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["dw-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [["mode", "public", 3, "userId"], [2, "padding", "24px", "text-align", "center", "color", "#8a8aa0"]], template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProfileComponent_Conditional_0_Template, 1, 1, "app-player-profile-view", 0)(1, ProfileComponent_Conditional_1_Template, 2, 0);
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275conditional(0, (tmp_0_0 = ctx.userId()) ? 0 : 1, tmp_0_0);
      }
    }, dependencies: [CommonModule, PlayerProfileViewComponent], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src\\app\\pages\\profile\\profile.component.ts", lineNumber: 27 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-GIV2YAVZ.js.map
