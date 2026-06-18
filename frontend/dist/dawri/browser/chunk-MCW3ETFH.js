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
  NgControlStatus,
  NgModel
} from "./chunk-LNNIKBGT.js";
import "./chunk-OERRWE4S.js";
import {
  CommonModule,
  DatePipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
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
import "./chunk-7XEFWCRO.js";

// src/app/features/organizer/admin-organizer-verifications.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
var _c0 = () => [1, 2, 3];
function AdminOrganizerVerificationsComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function AdminOrganizerVerificationsComponent_For_9_Template_button_click_0_listener() {
      const f_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setFilter(f_r2.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.filter() === f_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r2.label);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 7);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AdminOrganizerVerificationsComponent_Conditional_10_For_1_Template, 1, 0, "div", 7, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function AdminOrganizerVerificationsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("No ", ctx_r2.filter() === "all" ? "" : ctx_r2.filter(), " requests");
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", r_r4.user.avatar_url, \u0275\u0275sanitizeUrl);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_12_0 = r_r4.user == null ? null : r_r4.user.display_name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "?").charAt(0));
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Organization");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.organization_name);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Website");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd")(3, "a", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("href", r_r4.website, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r4.website);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.phone);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.reason);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Decided");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 1, r_r4.decided_at, "d MMM y \xB7 HH:mm"));
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Note");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.decision_note);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const r_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.approve(r_r4, "professional"));
    });
    \u0275\u0275text(1, "Upgrade to professional");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.busy(r_r4.id));
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "footer", 21)(1, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.notes[r_r4.id], $event) || (ctx_r2.notes[r_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 25)(3, "button", 26);
    \u0275\u0275listener("click", function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.reject(r_r4));
    });
    \u0275\u0275text(4, "Reject");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 27);
    \u0275\u0275listener("click", function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const r_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.approve(r_r4, r_r4.requested_tier));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Conditional_7_Template, 2, 1, "button", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.notes[r_r4.id]);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.busy(r_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.busy(r_r4.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Approve as ", r_r4.requested_tier, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(7, r_r4.requested_tier === "verified" ? 7 : -1);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 11)(1, "header", 12)(2, "div", 13);
    \u0275\u0275template(3, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_3_Template, 1, 1, "img", 14)(4, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_4_Template, 2, 1);
    \u0275\u0275elementStart(5, "div")(6, "div", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 16);
    \u0275\u0275text(9, " Currently: ");
    \u0275\u0275element(10, "app-tier-badge", 17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 18)(12, "span", 19);
    \u0275\u0275text(13, "Requesting");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "app-tier-badge", 17);
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "dl", 20)(18, "dt");
    \u0275\u0275text(19, "Legal name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "dd");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_22_Template, 4, 1);
    \u0275\u0275elementStart(23, "dt");
    \u0275\u0275text(24, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "dd");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_27_Template, 5, 2)(28, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_28_Template, 4, 1)(29, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_29_Template, 4, 1);
    \u0275\u0275elementStart(30, "dt");
    \u0275\u0275text(31, "Submitted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "dd");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(35, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_35_Template, 5, 4)(36, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_36_Template, 4, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Conditional_37_Template, 8, 5, "footer", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    let tmp_14_0;
    const r_r4 = ctx.$implicit;
    \u0275\u0275classProp("aov-card--decided", r_r4.status !== "pending");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, (r_r4.user == null ? null : r_r4.user.avatar_url) ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_13_0 = r_r4.user == null ? null : r_r4.user.display_name) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275property("tier", (tmp_14_0 = r_r4.user == null ? null : r_r4.user.organizer_tier) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : "none");
    \u0275\u0275advance(4);
    \u0275\u0275property("tier", r_r4.requested_tier);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("aov-status aov-status--", r_r4.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r4.status);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(r_r4.legal_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(22, r_r4.organization_name ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", r_r4.country, "", r_r4.city ? ", " + r_r4.city : "", "");
    \u0275\u0275advance();
    \u0275\u0275conditional(27, r_r4.website ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(28, r_r4.phone ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(29, r_r4.reason ? 29 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(34, 21, r_r4.created_at, "d MMM y \xB7 HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(35, r_r4.decided_at ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(36, r_r4.decision_note ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(37, r_r4.status === "pending" ? 37 : -1);
  }
}
function AdminOrganizerVerificationsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, AdminOrganizerVerificationsComponent_Conditional_12_For_2_Template, 38, 24, "article", 10, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.rows());
  }
}
var AdminOrganizerVerificationsComponent = class _AdminOrganizerVerificationsComponent {
  constructor() {
    this.svc = inject(OrganizerVerificationService);
    this.toast = inject(ToastService);
    this.filters = [
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      { value: "all", label: "All" }
    ];
    this.filter = signal("pending");
    this.rows = signal([]);
    this.loading = signal(false);
    this.notes = {};
    this.busyIds = signal(/* @__PURE__ */ new Set());
  }
  ngOnInit() {
    this.refresh();
  }
  setFilter(f) {
    this.filter.set(f);
    this.refresh();
  }
  refresh() {
    this.loading.set(true);
    this.svc.listAdmin(this.filter()).subscribe({
      next: (r) => {
        this.rows.set(r.data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.rows.set([]);
        this.loading.set(false);
      }
    });
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
  approve(r, tier) {
    this.mark(r.id, true);
    this.svc.approveAdmin(r.id, tier, this.notes[r.id] || void 0).subscribe({
      next: () => {
        this.toast.success(`Approved as ${tier}.`);
        this.mark(r.id, false);
        this.refresh();
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(r.id, false);
      }
    });
  }
  reject(r) {
    this.mark(r.id, true);
    this.svc.rejectAdmin(r.id, this.notes[r.id] || void 0).subscribe({
      next: () => {
        this.toast.info("Request rejected.");
        this.mark(r.id, false);
        this.refresh();
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Failed.");
        this.mark(r.id, false);
      }
    });
  }
  static {
    this.\u0275fac = function AdminOrganizerVerificationsComponent_Factory(t) {
      return new (t || _AdminOrganizerVerificationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminOrganizerVerificationsComponent, selectors: [["app-admin-organizer-verifications"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 1, consts: [[1, "aov-shell"], [1, "aov-head"], [1, "aov-eyebrow"], [1, "aov-title"], [1, "aov-tabs"], [3, "active"], [3, "click"], [1, "aov-skel"], [1, "aov-empty"], [1, "aov-list"], [1, "aov-card", 3, "aov-card--decided"], [1, "aov-card"], [1, "aov-card__head"], [1, "aov-who"], ["alt", "", 1, "aov-ava", 3, "src"], [1, "aov-name"], [1, "aov-current"], [3, "tier"], [1, "aov-req"], [1, "aov-l"], [1, "aov-dl"], [1, "aov-actions"], [1, "aov-ava", "aov-ava--letter"], ["target", "_blank", "rel", "noopener", 3, "href"], ["placeholder", "Decision note (optional)", 1, "aov-note", 3, "ngModelChange", "ngModel"], [1, "aov-btns"], [1, "aov-btn", "aov-btn--ghost", 3, "click", "disabled"], [1, "aov-btn", "aov-btn--primary", 3, "click", "disabled"], [1, "aov-btn", "aov-btn--gold", 3, "disabled"], [1, "aov-btn", "aov-btn--gold", 3, "click", "disabled"]], template: function AdminOrganizerVerificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Organizer Verifications");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4);
        \u0275\u0275repeaterCreate(8, AdminOrganizerVerificationsComponent_For_9_Template, 2, 3, "button", 5, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, AdminOrganizerVerificationsComponent_Conditional_10_Template, 2, 1)(11, AdminOrganizerVerificationsComponent_Conditional_11_Template, 3, 1)(12, AdminOrganizerVerificationsComponent_Conditional_12_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275repeater(ctx.filters);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(10, ctx.loading() ? 10 : ctx.rows().length === 0 ? 11 : 12);
      }
    }, dependencies: [CommonModule, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, TierBadgeComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.aov-shell[_ngcontent-%COMP%] {\n  max-width: 980px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n}\n.aov-head[_ngcontent-%COMP%] {\n  margin-bottom: 1.1rem;\n}\n.aov-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.aov-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.aov-tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 2px;\n  padding: 3px;\n  margin-bottom: 1.1rem;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 10px;\n}\n.aov-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  border-radius: 7px;\n  background: transparent;\n  border: none;\n  color: var(--mu, #8a8aa0);\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background .15s, color .15s;\n  text-transform: capitalize;\n}\n.aov-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.aov-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  color: var(--text);\n}\n.aov-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.aov-card[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  padding: 16px 18px;\n}\n.aov-card--decided[_ngcontent-%COMP%] {\n  opacity: .85;\n}\n.aov-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  margin-bottom: 10px;\n  flex-wrap: wrap;\n}\n.aov-who[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.aov-ava[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  object-fit: cover;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary, #006c35),\n      var(--accent, #d4af37));\n  display: grid;\n  place-items: center;\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  color: #fff;\n}\n.aov-ava--letter[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.aov-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n}\n.aov-current[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 3px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.aov-req[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.aov-l[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n}\n.aov-status[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  padding: 2px 8px;\n  border-radius: 100px;\n  font-weight: 700;\n}\n.aov-status--pending[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .16);\n  color: var(--accent, #d4af37);\n}\n.aov-status--approved[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .16);\n  color: #4ade80;\n}\n.aov-status--rejected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .12);\n  color: #fca5a5;\n}\n.aov-dl[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 140px 1fr;\n  gap: 5px 14px;\n  margin: 10px 0 0;\n  font-size: 13px;\n  dt {\n    color: var(--mu, #8a8aa0);\n  }\n  dd {\n    margin: 0;\n    color: var(--text);\n    word-break: break-word;\n  }\n  a {\n    color: var(--accent, #d4af37);\n    text-decoration: none;\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n}\n.aov-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 14px;\n  padding-top: 12px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.aov-note[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 8px;\n  color: var(--text);\n  font-size: 13px;\n  outline: none;\n  &:focus {\n    border-color: var(--primary, #006c35);\n  }\n}\n.aov-btns[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.aov-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  border: 1px solid transparent;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.aov-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.aov-btn--gold[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n  color: #1a1100;\n  &:hover:not(:disabled) {\n    background: var(--accent-soft, #e8c965);\n  }\n}\n.aov-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover:not(:disabled) {\n    background: rgba(239, 68, 68, .1);\n    border-color: rgba(239, 68, 68, .3);\n    color: #fca5a5;\n  }\n}\n.aov-empty[_ngcontent-%COMP%] {\n  padding: 50px 20px;\n  text-align: center;\n  color: var(--mu, #8a8aa0);\n  h3 {\n    color: var(--text);\n    margin: 0;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: .5px;\n    text-transform: capitalize;\n  }\n}\n.aov-skel[_ngcontent-%COMP%] {\n  height: 110px;\n  background: rgba(255, 255, 255, .05);\n  border-radius: 14px;\n  animation: _ngcontent-%COMP%_aovPulse 1.5s ease-in-out infinite;\n  margin-bottom: 10px;\n}\n@keyframes _ngcontent-%COMP%_aovPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .aov-skel[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=admin-organizer-verifications.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminOrganizerVerificationsComponent, { className: "AdminOrganizerVerificationsComponent", filePath: "src\\app\\features\\organizer\\admin-organizer-verifications.component.ts", lineNumber: 137 });
})();
export {
  AdminOrganizerVerificationsComponent
};
//# sourceMappingURL=chunk-MCW3ETFH.js.map
