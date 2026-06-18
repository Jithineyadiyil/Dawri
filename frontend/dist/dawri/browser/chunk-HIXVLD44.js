import {
  OrganizerVerificationService,
  TierBadgeComponent
} from "./chunk-TEAPCIHY.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RadioControlValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-LNNIKBGT.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
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

// src/app/features/organizer/organizer-verify-page.component.ts
function OrganizerVerifyPageComponent_Conditional_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "Unverified \u2014 basic limits apply.");
    \u0275\u0275elementEnd();
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Organization");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r1.pending.organization_name);
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Website");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r1.pending.website);
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r1.pending.phone);
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r1.pending.reason);
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 14)(1, "header", 15)(2, "h2");
    \u0275\u0275text(3, "Request pending");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-tier-badge", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Your application for ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " is awaiting admin review.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dl", 16)(11, "dt");
    \u0275\u0275text(12, "Legal name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "dd");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_15_Template, 4, 1);
    \u0275\u0275elementStart(16, "dt");
    \u0275\u0275text(17, "Country");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_20_Template, 4, 1)(21, OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_21_Template, 4, 1)(22, OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Conditional_22_Template, 4, 1);
    \u0275\u0275elementStart(23, "dt");
    \u0275\u0275text(24, "Submitted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "dd");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("tier", s_r1.pending.requested_tier);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r1.pending.requested_tier);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(s_r1.pending.legal_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, s_r1.pending.organization_name ? 15 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", s_r1.pending.country, "", s_r1.pending.city ? ", " + s_r1.pending.city : "", "");
    \u0275\u0275advance();
    \u0275\u0275conditional(20, s_r1.pending.website ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, s_r1.pending.phone ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(22, s_r1.pending.reason ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 10, s_r1.pending.created_at, "d MMM y \xB7 HH:mm"));
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 5)(1, "p", 17);
    \u0275\u0275text(2, "You already hold the highest organizer tier.");
    \u0275\u0275elementEnd()();
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 5)(1, "h2", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 19);
    \u0275\u0275text(4, "Tell us about you so we can verify your application. Reviewed within 1\u20132 business days.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 20);
    \u0275\u0275listener("ngSubmit", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.submit());
    });
    \u0275\u0275elementStart(6, "div", 21)(7, "label", 22)(8, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.requested_tier, $event) || (ctx_r2.form.requested_tier = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 24);
    \u0275\u0275text(10, "Verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 25);
    \u0275\u0275text(12, "Up to 128 participants \xB7 entry fees \xB7 sponsors");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label", 22)(14, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.requested_tier, $event) || (ctx_r2.form.requested_tier = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 24);
    \u0275\u0275text(16, "Professional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 25);
    \u0275\u0275text(18, "Unlimited \xB7 featured listings \xB7 ticketing");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "label", 27)(20, "span");
    \u0275\u0275text(21, "Legal name ");
    \u0275\u0275elementStart(22, "em");
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.legal_name, $event) || (ctx_r2.form.legal_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "label", 27)(26, "span");
    \u0275\u0275text(27, "Organization (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.organization_name, $event) || (ctx_r2.form.organization_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 30)(30, "label", 27)(31, "span");
    \u0275\u0275text(32, "Country ");
    \u0275\u0275elementStart(33, "em");
    \u0275\u0275text(34, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.country, $event) || (ctx_r2.form.country = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "label", 27)(37, "span");
    \u0275\u0275text(38, "City");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.city, $event) || (ctx_r2.form.city = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 30)(41, "label", 27)(42, "span");
    \u0275\u0275text(43, "Website");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.website, $event) || (ctx_r2.form.website = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "label", 27)(46, "span");
    \u0275\u0275text(47, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.phone, $event) || (ctx_r2.form.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "label", 27)(50, "span");
    \u0275\u0275text(51, "Why are you applying?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "textarea", 35);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template_textarea_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.form.reason, $event) || (ctx_r2.form.reason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 36)(54, "button", 37);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Apply for ", s_r1.tier === "none" ? "verified" : "professional", " tier");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r2.form.requested_tier === "verified");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.requested_tier);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r2.form.requested_tier === "professional");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.requested_tier);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.legal_name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.organization_name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.country);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.city);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.website);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.reason);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.submitting() || !ctx_r2.form.legal_name || !ctx_r2.form.country);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.submitting() ? "Submitting\u2026" : "Submit application", " ");
  }
}
function OrganizerVerifyPageComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3, "Your tier");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-tier-badge", 8);
    \u0275\u0275template(5, OrganizerVerifyPageComponent_Conditional_9_Conditional_5_Template, 2, 0, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 10)(7, "div", 11)(8, "span", 12);
    \u0275\u0275text(9, "Max participants");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 13);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 11)(13, "span", 12);
    \u0275\u0275text(14, "Charge entry fees");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 13);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 11)(18, "span", 12);
    \u0275\u0275text(19, "Featured listing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 13);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 11)(23, "span", 12);
    \u0275\u0275text(24, "Attach sponsors");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 13);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(27, OrganizerVerifyPageComponent_Conditional_9_Conditional_27_Template, 28, 13, "section", 14)(28, OrganizerVerifyPageComponent_Conditional_9_Conditional_28_Template, 3, 0)(29, OrganizerVerifyPageComponent_Conditional_9_Conditional_29_Template, 56, 16);
  }
  if (rf & 2) {
    let tmp_4_0;
    const s_r1 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275property("tier", s_r1.tier);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, s_r1.tier === "none" ? 5 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((tmp_4_0 = s_r1.caps.max_participants) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "Unlimited");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r1.caps.can_charge_fees ? "Yes" : "No");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r1.caps.can_feature ? "Yes" : "No");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r1.caps.can_sponsor ? "Yes" : "No");
    \u0275\u0275advance();
    \u0275\u0275conditional(27, s_r1.pending ? 27 : s_r1.tier === "professional" ? 28 : 29);
  }
}
function OrganizerVerifyPageComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 38)(1, "div", 38);
  }
}
var OrganizerVerifyPageComponent = class _OrganizerVerifyPageComponent {
  constructor() {
    this.svc = inject(OrganizerVerificationService);
    this.toast = inject(ToastService);
    this.submitting = signal(false);
    this.form = {
      requested_tier: "verified",
      legal_name: "",
      organization_name: "",
      country: "",
      city: "",
      website: "",
      phone: "",
      reason: ""
    };
  }
  ngOnInit() {
    this.svc.loadStatus();
  }
  submit() {
    if (this.submitting())
      return;
    if (!this.form.legal_name.trim() || !this.form.country.trim()) {
      this.toast.error("Legal name and country are required.");
      return;
    }
    this.submitting.set(true);
    this.svc.apply(this.form).subscribe({
      next: () => {
        this.toast.success("Application submitted. We'll review it shortly.");
        this.submitting.set(false);
      },
      error: (e) => {
        const msg = e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? "Failed to submit.";
        this.toast.error(msg);
        this.submitting.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function OrganizerVerifyPageComponent_Factory(t) {
      return new (t || _OrganizerVerifyPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizerVerifyPageComponent, selectors: [["app-organizer-verify-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 1, consts: [[1, "ov-shell"], [1, "ov-head"], [1, "ov-eyebrow"], [1, "ov-title"], ["routerLink", "/tournaments/create", 1, "ov-link"], [1, "ov-card"], [1, "ov-tierline"], [1, "ov-l"], [3, "tier"], [1, "ov-tierline__hint"], [1, "ov-caps"], [1, "ov-cap"], [1, "ov-cap__l"], [1, "ov-cap__v"], [1, "ov-card", "ov-pending"], [1, "ov-pending__head"], [1, "ov-dl"], [2, "margin", "0", "color", "var(--mu)"], [1, "ov-h"], [1, "ov-lede"], [1, "ov-form", 3, "ngSubmit"], [1, "ov-tier-pick"], [1, "ov-tier-opt"], ["type", "radio", "name", "tier", "value", "verified", 3, "ngModelChange", "ngModel"], [1, "ov-tier-opt__name"], [1, "ov-tier-opt__cap"], ["type", "radio", "name", "tier", "value", "professional", 3, "ngModelChange", "ngModel"], [1, "ov-f"], ["name", "legal_name", "required", "", "maxlength", "150", 3, "ngModelChange", "ngModel"], ["name", "organization_name", "maxlength", "150", 3, "ngModelChange", "ngModel"], [1, "ov-row"], ["name", "country", "required", "", "maxlength", "80", 3, "ngModelChange", "ngModel"], ["name", "city", "maxlength", "80", 3, "ngModelChange", "ngModel"], ["name", "website", "type", "url", "placeholder", "https://", "maxlength", "255", 3, "ngModelChange", "ngModel"], ["name", "phone", "maxlength", "40", 3, "ngModelChange", "ngModel"], ["rows", "3", "maxlength", "2000", "name", "reason", "placeholder", "A short note about the tournaments you plan to run.", 3, "ngModelChange", "ngModel"], [1, "ov-actions"], ["type", "submit", 1, "ov-btn", "ov-btn--primary", 3, "disabled"], [1, "ov-skel"]], template: function OrganizerVerifyPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Organizer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Verification");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 4);
        \u0275\u0275text(8, "Back to tournament create \u2192");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, OrganizerVerifyPageComponent_Conditional_9_Template, 30, 7)(10, OrganizerVerifyPageComponent_Conditional_10_Template, 2, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, (tmp_0_0 = ctx.svc.status()) ? 9 : 10, tmp_0_0);
      }
    }, dependencies: [CommonModule, DatePipe, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, RouterLink, TierBadgeComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.ov-shell[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n}\n.ov-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.2rem;\n  flex-wrap: wrap;\n}\n.ov-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.ov-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.ov-link[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  text-decoration: none;\n  &:hover {\n    color: var(--text);\n  }\n}\n.ov-card[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  padding: 20px 22px;\n  margin-bottom: 14px;\n}\n.ov-tierline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.ov-l[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n}\n.ov-tierline__hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n}\n.ov-caps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 8px;\n}\n@media (max-width: 540px) {\n  .ov-caps[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.ov-cap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 12px;\n  background: var(--bg3, #181826);\n  border-radius: 8px;\n}\n.ov-cap__l[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n}\n.ov-cap__v[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n}\n.ov-pending__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 8px;\n  h2 {\n    font-family: var(--fh, sans-serif);\n    font-size: 18px;\n    letter-spacing: .5px;\n    text-transform: uppercase;\n    margin: 0;\n  }\n}\n.ov-dl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 130px 1fr;\n  gap: 6px 14px;\n  margin: 12px 0 0;\n  font-size: 13px;\n  dt {\n    color: var(--mu, #8a8aa0);\n  }\n  dd {\n    margin: 0;\n    color: var(--text);\n  }\n}\n.ov-h[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0 0 6px;\n}\n.ov-lede[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  margin: 0 0 16px;\n}\n.ov-tier-pick[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.ov-tier-opt[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n  min-width: 220px;\n  padding: 12px 14px;\n  cursor: pointer;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 10px;\n  input {\n    display: none;\n  }\n  &.active {\n    border-color: var(--primary, #006c35);\n    background: rgba(0, 108, 53, .1);\n  }\n}\n.ov-tier-opt__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.ov-tier-opt__cap[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n}\n.ov-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.ov-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n@media (max-width: 540px) {\n  .ov-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.ov-f[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  span {\n    font-family: var(--fm, monospace);\n    font-size: 10px;\n    letter-spacing: 1.3px;\n    text-transform: uppercase;\n    color: var(--mu, #8a8aa0);\n    em {\n      color: #fca5a5;\n      font-style: normal;\n    }\n  }\n  input,\n  textarea {\n    background: var(--bg3, #181826);\n    border: 1px solid var(--br2, rgba(255,255,255,.14));\n    border-radius: 8px;\n    padding: 10px 12px;\n    color: var(--text);\n    font-size: 13px;\n    outline: none;\n    font-family: inherit;\n    &:focus {\n      border-color: var(--primary, #006c35);\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n}\n.ov-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.ov-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 10px;\n  border: 1px solid transparent;\n  font-weight: 700;\n  font-size: 14px;\n  cursor: pointer;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.ov-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.ov-skel[_ngcontent-%COMP%] {\n  height: 90px;\n  background: rgba(255, 255, 255, .05);\n  border-radius: 14px;\n  margin-bottom: 12px;\n  animation: _ngcontent-%COMP%_ovPulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_ovPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ov-skel[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=organizer-verify-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizerVerifyPageComponent, { className: "OrganizerVerifyPageComponent", filePath: "src\\app\\features\\organizer\\organizer-verify-page.component.ts", lineNumber: 163 });
})();
export {
  OrganizerVerifyPageComponent
};
//# sourceMappingURL=chunk-HIXVLD44.js.map
