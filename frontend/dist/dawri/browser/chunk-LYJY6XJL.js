import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  DestroyRef,
  HttpClient,
  NgIf,
  TitleCasePipe,
  UpperCasePipe,
  catchError,
  computed,
  filter,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/admin/dashboard-subs/subscriptions-dashboard.component.ts
var _c0 = ["subsCanvas"];
var _c1 = ["churnCanvas"];
var _forTrack0 = ($index, $item) => $item.plan;
var _forTrack1 = ($index, $item) => $item.id;
function SubscriptionsDashboardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 9);
    \u0275\u0275listener("click", function SubscriptionsDashboardComponent_Conditional_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshManually());
    });
    \u0275\u0275text(4, "\u27F3");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Updated ", ctx_r1.timeAgo(ctx.generated_at), "");
  }
}
function SubscriptionsDashboardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Loading subscriptions dashboard\u2026");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionsDashboardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 10);
    \u0275\u0275listener("click", function SubscriptionsDashboardComponent_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadDashboard());
    });
    \u0275\u0275text(3, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u26A0\uFE0F ", ctx, " ");
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No active subscriptions yet.");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_66_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 28)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 31);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("plan-badge plan-", row_r4.plan, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r4.plan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.planPercentage(row_r4), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 7, row_r4.mrr_contribution, "1.2-2"));
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 27);
    \u0275\u0275text(6, "Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 27);
    \u0275\u0275text(8, "%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 27);
    \u0275\u0275text(10, "MRR");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_66_For_13_Template, 11, 10, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275repeater(p_r5.plans);
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No renewals in the next 7 days.");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_72_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 29);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 30);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r6.user_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.user_email);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("plan-badge plan-", r_r6.plan, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r6.plan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 8, r_r6.price, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.daysUntil(r_r6.renews_at));
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 27);
    \u0275\u0275text(8, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 27);
    \u0275\u0275text(10, "Renews");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_72_For_13_Template, 14, 11, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275repeater(p_r5.upcoming_renewals);
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No trials expiring in the next 14 days.");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_77_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 28);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 30);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r7.user_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r7.user_email);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("plan-badge plan-", t_r7.plan, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r7.plan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.daysUntil(t_r7.trial_ends_at));
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 27);
    \u0275\u0275text(8, "Expires");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_77_For_11_Template, 11, 7, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(p_r5.expiring_trials);
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3, "MRR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15);
    \u0275\u0275text(8, "SAR monthly");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 16)(10, "div", 13);
    \u0275\u0275text(11, "ARR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 14);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 15);
    \u0275\u0275text(16, "SAR annualized");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 16)(18, "div", 13);
    \u0275\u0275text(19, "Active subs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 14);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 15);
    \u0275\u0275text(24, "paying customers");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 16)(26, "div", 13);
    \u0275\u0275text(27, "Trials");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 14);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 15);
    \u0275\u0275text(32, "pending conversion");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 17)(34, "div", 13);
    \u0275\u0275text(35, "New this week");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 14);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 15);
    \u0275\u0275text(40, "last 7 days");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 18)(42, "div", 13);
    \u0275\u0275text(43, "Churn this month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 14);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 15);
    \u0275\u0275text(48, "cancellations");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "section", 19)(50, "div", 20)(51, "h3");
    \u0275\u0275text(52, "New subscriptions (14 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 21);
    \u0275\u0275element(54, "canvas", null, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 20)(57, "h3");
    \u0275\u0275text(58, "Cancellations (14 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 21);
    \u0275\u0275element(60, "canvas", null, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 22)(63, "h3");
    \u0275\u0275text(64, "\u{1F4E6} Active subs by plan");
    \u0275\u0275elementEnd();
    \u0275\u0275template(65, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_65_Template, 2, 0, "p", 23)(66, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_66_Template, 14, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "section", 24)(68, "div", 25)(69, "h3");
    \u0275\u0275text(70, "\u{1F4C5} Upcoming renewals (next 7 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(71, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_71_Template, 2, 0, "p", 23)(72, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_72_Template, 14, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 25)(74, "h3");
    \u0275\u0275text(75, "\u23F0 Expiring trials (next 14 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(76, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_76_Template, 2, 0, "p", 23)(77, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Conditional_77_Template, 12, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const k_r8 = ctx;
    const p_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 9, k_r8.mrr, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 12, k_r8.arr, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 15, k_r8.active_count));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 17, k_r8.trial_count));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(38, 19, k_r8.new_this_week));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(46, 21, k_r8.cancelled_this_month));
    \u0275\u0275advance(20);
    \u0275\u0275conditional(65, p_r5.plans.length === 0 ? 65 : 66);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(71, p_r5.upcoming_renewals.length === 0 ? 71 : 72);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(76, p_r5.expiring_trials.length === 0 ? 76 : 77);
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "Subscriptions table not found \u2014 module not installed.");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionsDashboardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SubscriptionsDashboardComponent_Conditional_8_Conditional_0_Template, 78, 23)(1, SubscriptionsDashboardComponent_Conditional_8_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    let tmp_2_0;
    \u0275\u0275conditional(0, (tmp_2_0 = ctx.kpis) ? 0 : 1, tmp_2_0);
  }
}
var SubscriptionsDashboardComponent = class _SubscriptionsDashboardComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.destroyRef = inject(DestroyRef);
    this.base = "http://192.168.100.67:8001/api/v1/admin/subscriptions/dashboard";
    this.isActive = true;
    this.payload = signal(null);
    this.loading = signal(false);
    this.error = signal(null);
    this.CHART_JS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
    this.refreshTimer = null;
    this.totalActive = computed(() => this.payload()?.kpis?.active_count ?? 0);
  }
  ngOnInit() {
    if (this.isActive)
      this.loadDashboard();
    this.refreshTimer = window.setInterval(() => {
      if (this.isActive)
        this.loadDashboard();
    }, 6e4);
    this.destroyRef.onDestroy(() => {
      if (this.refreshTimer !== null)
        window.clearInterval(this.refreshTimer);
    });
  }
  ngAfterViewInit() {
    this.loadChartJsThenRender();
  }
  ngOnChanges(changes) {
    if (changes["isActive"]?.currentValue === true && !this.payload()) {
      this.loadDashboard();
    }
  }
  loadDashboard() {
    if (!this.payload())
      this.loading.set(true);
    this.error.set(null);
    this.http.get(this.base).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (r) => {
        this.payload.set(r.data);
        this.loading.set(false);
        if (typeof Chart !== "undefined" && this.subsCanvas) {
          this.renderCharts();
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? "Failed to load subscriptions dashboard.");
      }
    });
  }
  refreshManually() {
    this.loadDashboard();
  }
  // ── Chart.js bootstrap ─────────────────────────────────────────
  loadChartJsThenRender() {
    if (typeof Chart !== "undefined") {
      this.tryRender();
      return;
    }
    if (document.querySelector(`script[src="${this.CHART_JS_URL}"]`)) {
      const check = () => typeof Chart !== "undefined" ? this.tryRender() : setTimeout(check, 100);
      check();
      return;
    }
    const script = document.createElement("script");
    script.src = this.CHART_JS_URL;
    script.async = true;
    script.onload = () => this.tryRender();
    script.onerror = () => this.error.set("Failed to load charts library.");
    document.head.appendChild(script);
  }
  tryRender() {
    if (this.payload() && this.subsCanvas)
      this.renderCharts();
  }
  renderCharts() {
    const p = this.payload();
    if (!p || !p.charts)
      return;
    const configs = [
      [this.subsCanvas.nativeElement, p.charts.new_subs, "New subscriptions", "#22c55e"],
      [this.churnCanvas.nativeElement, p.charts.cancellations, "Cancellations", "#ef4444"]
    ];
    for (const [canvas, data, label, color] of configs) {
      const existing = Chart.getChart(canvas);
      if (existing)
        existing.destroy();
      new Chart(canvas, {
        type: "line",
        data: {
          labels: p.charts.labels,
          datasets: [{
            label,
            data,
            borderColor: color,
            backgroundColor: color + "20",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: color,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#0a0a14",
              titleColor: "#fff",
              bodyColor: "#ccc",
              borderColor: color,
              borderWidth: 1
            }
          },
          scales: {
            x: { grid: { color: "#1a1a2a" }, ticks: { color: "#666", font: { size: 10 } } },
            y: { grid: { color: "#1a1a2a" }, ticks: { color: "#666", font: { size: 10 } }, beginAtZero: true }
          }
        }
      });
    }
  }
  // ── Helpers ────────────────────────────────────────────────────
  timeAgo(iso) {
    if (!iso)
      return "";
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
    if (seconds < 60)
      return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
      return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
      return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }
  daysUntil(iso) {
    const ms = new Date(iso).getTime() - Date.now();
    const days = Math.ceil(ms / (1e3 * 60 * 60 * 24));
    if (days < 0)
      return "expired";
    if (days === 0)
      return "today";
    if (days === 1)
      return "tomorrow";
    return `in ${days}d`;
  }
  planPercentage(plan) {
    const total = this.totalActive();
    if (total === 0)
      return 0;
    return Math.round(plan.count / total * 100);
  }
  static {
    this.\u0275fac = function SubscriptionsDashboardComponent_Factory(t) {
      return new (t || _SubscriptionsDashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubscriptionsDashboardComponent, selectors: [["app-subscriptions-dashboard"]], viewQuery: function SubscriptionsDashboardComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.subsCanvas = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.churnCanvas = _t.first);
      }
    }, inputs: { isActive: "isActive" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 9, vars: 4, consts: [["subsCanvas", ""], ["churnCanvas", ""], [1, "subs-dashboard"], [1, "page-header"], [1, "title-row"], [1, "meta"], [1, "loading"], [1, "error-box"], [1, "muted"], ["title", "Refresh", 1, "btn-ghost", 3, "click"], [1, "btn-ghost", 3, "click"], [1, "kpi-grid"], [1, "kpi-tile", "mrr"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], [1, "kpi-tile"], [1, "kpi-tile", "good"], [1, "kpi-tile", "warn"], [1, "mid-row"], [1, "chart-card"], [1, "chart-wrap"], [1, "card", "plans-card"], [1, "empty"], [1, "bottom-row"], [1, "card"], [1, "data-table"], [1, "r"], [1, "strong"], [1, "r", "mono"], [1, "r", "muted"], [1, "r", "strong"], [1, "muted", "small"]], template: function SubscriptionsDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "header", 3)(2, "div", 4)(3, "h2");
        \u0275\u0275text(4, "\u{1F4C8} Subscriptions overview");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, SubscriptionsDashboardComponent_Conditional_5_Template, 5, 1, "div", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, SubscriptionsDashboardComponent_Conditional_6_Template, 2, 0, "p", 6)(7, SubscriptionsDashboardComponent_Conditional_7_Template, 4, 1, "div", 7)(8, SubscriptionsDashboardComponent_Conditional_8_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_2_0;
        let tmp_3_0;
        \u0275\u0275advance(5);
        \u0275\u0275conditional(5, (tmp_0_0 = ctx.payload()) ? 5 : -1, tmp_0_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.loading() && !ctx.payload() ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(7, (tmp_2_0 = ctx.error()) ? 7 : -1, tmp_2_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(8, (tmp_3_0 = ctx.payload()) ? 8 : -1, tmp_3_0);
      }
    }, dependencies: [CommonModule, DecimalPipe], styles: ['@charset "UTF-8";\n\n\n\n.subs-dashboard[_ngcontent-%COMP%] {\n  color: #fff;\n  padding: 0;\n  margin-bottom: 24px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: #666;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 24px;\n  letter-spacing: 1.2px;\n  margin: 0;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 12px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .error-box[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px;\n  color: #666;\n  font-size: 12px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #38bdf8;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile.mrr[_ngcontent-%COMP%]::before {\n  background: #fbbf24;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile.good[_ngcontent-%COMP%]::before {\n  background: #22c55e;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile.warn[_ngcontent-%COMP%]::before {\n  background: #ef4444;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n  color: #888;\n  margin-bottom: 6px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 28px;\n  font-weight: 700;\n  color: #38bdf8;\n  line-height: 1;\n  margin-bottom: 8px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile.mrr[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile.good[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile.warn[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]   .kpi-sub[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #666;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .mid-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 14px;\n  margin-bottom: 20px;\n}\n@media (max-width: 1200px) {\n  .subs-dashboard[_ngcontent-%COMP%]   .mid-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .subs-dashboard[_ngcontent-%COMP%]   .mid-row[_ngcontent-%COMP%]   .plans-card[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n}\n@media (max-width: 768px) {\n  .subs-dashboard[_ngcontent-%COMP%]   .mid-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.subs-dashboard[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%], .subs-dashboard[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 16px 18px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .subs-dashboard[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  font-size: 12px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #aaa;\n  font-weight: 600;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  text-transform: none;\n  font-size: 14px;\n  color: #ddd;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   .chart-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  height: 180px;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  margin-bottom: 20px;\n}\n@media (max-width: 1024px) {\n  .subs-dashboard[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 8px 10px;\n  border-bottom: 1px solid #2a2a3a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: #888;\n  font-weight: 600;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 12px;\n  color: #ddd;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .plan-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  background: #2a2a3a;\n  color: #ddd;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .plan-badge.plan-free[_ngcontent-%COMP%] {\n  background: #2a2a3a;\n  color: #aaa;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .plan-badge.plan-starter[_ngcontent-%COMP%] {\n  background: rgba(56, 189, 248, 0.2);\n  color: #7dd3fc;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .plan-badge.plan-professional[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #c4b5fd;\n}\n.subs-dashboard[_ngcontent-%COMP%]   .plan-badge.plan-enterprise[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.2);\n  color: #fcd34d;\n}\n/*# sourceMappingURL=subscriptions-dashboard.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubscriptionsDashboardComponent, { className: "SubscriptionsDashboardComponent", filePath: "src\\app\\pages\\admin\\dashboard-subs\\subscriptions-dashboard.component.ts", lineNumber: 83 });
})();

// src/app/pages/admin/admin.component.ts
var _forTrack02 = ($index, $item) => $item.label;
var _forTrack12 = ($index, $item) => $item.plan;
var _forTrack2 = ($index, $item) => $item.month;
var _forTrack3 = ($index, $item) => $item.key;
var _forTrack4 = ($index, $item) => $item.id;
function AdminComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div")(2, "h1", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 50);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.currentPageTitle());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Dawri Control Panel \xB7 ", ctx_r0.today(), "");
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "span", 60);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 61);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.format === "currency" ? \u0275\u0275pipeBind2(3, 2, s_r2.value, "1.0-0") + " SAR" : s_r2.value);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r2.label);
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275repeaterCreate(1, AdminComponent_Conditional_91_Conditional_1_div_0_For_2_Template, 6, 5, "div", 59, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.overview().stats);
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 68);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 69);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, p_r3.plan));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", p_r3.count, " clients");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 5, p_r3.revenue, "1.0-0"), " SAR/mo");
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_4_For_1_Template, 9, 8, "div", 66, _forTrack12);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275repeater(ctx_r0.overview().subscriptions_by_plan);
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275text(1, "No active subscriptions yet. Plan breakdown appears once companies subscribe.");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "div", 72);
    \u0275\u0275elementStart(2, "span", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", ctx_r0.barH(m_r4.total, ctx_r0.overview().revenue_trend), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r4.month.slice(5));
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275repeaterCreate(1, AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_9_For_2_Template, 4, 3, "div", 71, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.overview().revenue_trend);
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275text(1, "No revenue recorded yet. Monthly trend appears after the first paid invoice.");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63)(2, "h3", 64);
    \u0275\u0275text(3, "Subscriptions by Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_4_Template, 2, 0)(5, AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_5_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 63)(7, "h3", 64);
    \u0275\u0275text(8, "Revenue Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_9_Template, 3, 0, "div", 65)(10, AdminComponent_Conditional_91_Conditional_1_div_1_Conditional_10_Template, 2, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ((tmp_3_0 = ctx_r0.overview().subscriptions_by_plan) == null ? null : tmp_3_0.length) ? 4 : 5);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(9, ((tmp_4_0 = ctx_r0.overview().revenue_trend) == null ? null : tmp_4_0.length) ? 9 : 10);
  }
}
function AdminComponent_Conditional_91_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AdminComponent_Conditional_91_Conditional_1_div_0_Template, 3, 0, "div", 56)(1, AdminComponent_Conditional_91_Conditional_1_div_1_Template, 11, 2, "div", 57);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngIf", ctx_r0.overview());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.overview());
  }
}
function AdminComponent_Conditional_91_Conditional_2_For_2_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
    \u0275\u0275text(1, "Custom pricing");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_2_For_2_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
    \u0275\u0275text(1, "Unlimited");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_2_For_2_span_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 97);
    \u0275\u0275text(1, "Unlimited");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_2_For_2_For_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 93)(1, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_For_53_Template_input_ngModelChange_1_listener($event) {
      const feat_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const plan_r6 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.features[feat_r8.key], $event) || (plan_r6.features[feat_r8.key] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feat_r8 = ctx.$implicit;
    const plan_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", plan_r6.features[feat_r8.key]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(feat_r8.label);
  }
}
function AdminComponent_Conditional_91_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 75)(1, "div", 76)(2, "div")(3, "span", 77);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 78);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 79);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "uppercase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 80);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 81)(13, "label", 82);
    \u0275\u0275text(14, "Price (SAR/month)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 83)(16, "input", 84);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_16_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.price, $event) || (plan_r6.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, AdminComponent_Conditional_91_Conditional_2_For_2_span_17_Template, 2, 0, "span", 85);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 81)(19, "label", 82);
    \u0275\u0275text(20, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_21_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.description, $event) || (plan_r6.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 81)(23, "label", 82);
    \u0275\u0275text(24, "Description (Arabic)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_25_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.description_ar, $event) || (plan_r6.description_ar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 81)(27, "label", 82);
    \u0275\u0275text(28, "Limits");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 88)(30, "div", 89)(31, "span");
    \u0275\u0275text(32, "Tournaments/month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_33_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.limits.tournaments_per_month, $event) || (plan_r6.limits.tournaments_per_month = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(34, AdminComponent_Conditional_91_Conditional_2_For_2_span_34_Template, 2, 0, "span", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 89)(36, "span");
    \u0275\u0275text(37, "Max participants");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 91);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_38_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.limits.max_participants, $event) || (plan_r6.limits.max_participants = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 89)(40, "span");
    \u0275\u0275text(41, "Max employees");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_42_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.limits.max_employees, $event) || (plan_r6.limits.max_employees = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(43, AdminComponent_Conditional_91_Conditional_2_For_2_span_43_Template, 2, 0, "span", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 89)(45, "span");
    \u0275\u0275text(46, "Moderators");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_47_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.limits.moderators, $event) || (plan_r6.limits.moderators = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 81)(49, "label", 82);
    \u0275\u0275text(50, "Features");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 92);
    \u0275\u0275repeaterCreate(52, AdminComponent_Conditional_91_Conditional_2_For_2_For_53_Template, 3, 2, "label", 93, _forTrack3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 94)(55, "label", 93)(56, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_input_ngModelChange_56_listener($event) {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(plan_r6.is_active, $event) || (plan_r6.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(57, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 96);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_2_For_2_Template_button_click_58_listener() {
      const plan_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.savePlan(plan_r6));
    });
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plan_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("plan-inactive", !plan_r6.is_active);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(plan_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r6.name_ar);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 22, plan_r6.type));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("plan--" + plan_r6.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plan_r6.key);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.price);
    \u0275\u0275property("disabled", plan_r6.key === "free");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r6.price === null);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.description_ar);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.limits.tournaments_per_month);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r6.limits.tournaments_per_month === -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.limits.max_participants);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.limits.max_employees);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r6.limits.max_employees === -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.limits.moderators);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.featureKeys);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", plan_r6.is_active);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.saving() ? "Saving..." : "Save Changes");
  }
}
function AdminComponent_Conditional_91_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275repeaterCreate(1, AdminComponent_Conditional_91_Conditional_2_For_2_Template, 60, 24, "div", 74, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.plansList());
  }
}
function AdminComponent_Conditional_91_Conditional_3_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 107)(3, "span", 108);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 109);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td")(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 110);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 110);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td")(18, "button", 111);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_3_For_31_Template_button_click_18_listener() {
      const c_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selectCompany(c_r11));
    });
    \u0275\u0275text(19, "View");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_14_0;
    let tmp_15_0;
    const c_r11 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(c_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r11.domain);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("plan-badge plan--", (tmp_14_0 = c_r11.active_subscription == null ? null : c_r11.active_subscription.plan) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : "None", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_15_0 = c_r11.active_subscription == null ? null : c_r11.active_subscription.plan) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "None");
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("status-badge status--", c_r11.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r11.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r11.users_count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r11.tournaments_count);
  }
}
function AdminComponent_Conditional_91_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 112);
    \u0275\u0275text(2, "No companies found.");
    \u0275\u0275elementEnd()();
  }
}
function AdminComponent_Conditional_91_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 98)(1, "input", 99);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_3_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.companySearch, $event) || (ctx_r0.companySearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function AdminComponent_Conditional_91_Conditional_3_Template_input_input_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadCompanies());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "select", 100);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_3_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.companyStatusFilter, $event) || (ctx_r0.companyStatusFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminComponent_Conditional_91_Conditional_3_Template_select_change_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadCompanies());
    });
    \u0275\u0275elementStart(3, "option", 101);
    \u0275\u0275text(4, "All Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 102);
    \u0275\u0275text(6, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 103);
    \u0275\u0275text(8, "Trial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 104);
    \u0275\u0275text(10, "Suspended");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 105);
    \u0275\u0275text(12, "Churned");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 52)(14, "table", 106)(15, "thead")(16, "tr")(17, "th");
    \u0275\u0275text(18, "Company");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "Users");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "Tournaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "tbody");
    \u0275\u0275repeaterCreate(30, AdminComponent_Conditional_91_Conditional_3_For_31_Template, 20, 12, "tr", null, _forTrack4);
    \u0275\u0275template(32, AdminComponent_Conditional_91_Conditional_3_Conditional_32_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.companySearch);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.companyStatusFilter);
    \u0275\u0275advance(28);
    \u0275\u0275repeater(ctx_r0.companies());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(32, !ctx_r0.companies().length ? 32 : -1);
  }
}
function AdminComponent_Conditional_91_Conditional_4_For_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 107)(3, "span", 108);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 109);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td")(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 110);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 109);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 120)(20, "button", 121);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_4_For_42_Template_button_click_20_listener() {
      const s_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.extendSub(s_r14.id));
    });
    \u0275\u0275text(21, "+1mo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 122);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_4_For_42_Template_button_click_22_listener() {
      const s_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelSub(s_r14.id));
    });
    \u0275\u0275text(23, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r14 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r14.user == null ? null : s_r14.user.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r14.user == null ? null : s_r14.user.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("plan-badge plan--", s_r14.plan, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r14.plan);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("status-badge status--", s_r14.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r14.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(15, 12, s_r14.price, "1.0-0"), " SAR");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 15, s_r14.current_period_end, "mediumDate"));
  }
}
function AdminComponent_Conditional_91_Conditional_4_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 112);
    \u0275\u0275text(2, "No subscriptions found.");
    \u0275\u0275elementEnd()();
  }
}
function AdminComponent_Conditional_91_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "app-subscriptions-dashboard", 113);
    \u0275\u0275elementStart(1, "div", 98)(2, "select", 100);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_4_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.subPlanFilter, $event) || (ctx_r0.subPlanFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminComponent_Conditional_91_Conditional_4_Template_select_change_2_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadSubscriptions());
    });
    \u0275\u0275elementStart(3, "option", 101);
    \u0275\u0275text(4, "All Plans");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 114);
    \u0275\u0275text(6, "Free");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 115);
    \u0275\u0275text(8, "Starter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 116);
    \u0275\u0275text(10, "Professional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 117);
    \u0275\u0275text(12, "Enterprise");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "select", 100);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_4_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.subStatusFilter, $event) || (ctx_r0.subStatusFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminComponent_Conditional_91_Conditional_4_Template_select_change_13_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadSubscriptions());
    });
    \u0275\u0275elementStart(14, "option", 101);
    \u0275\u0275text(15, "All Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 102);
    \u0275\u0275text(17, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 103);
    \u0275\u0275text(19, "Trial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 118);
    \u0275\u0275text(21, "Cancelled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 119);
    \u0275\u0275text(23, "Expired");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 52)(25, "table", 106)(26, "thead")(27, "tr")(28, "th");
    \u0275\u0275text(29, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th");
    \u0275\u0275text(31, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th");
    \u0275\u0275text(33, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th");
    \u0275\u0275text(35, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th");
    \u0275\u0275text(37, "Expires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "th");
    \u0275\u0275text(39, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "tbody");
    \u0275\u0275repeaterCreate(41, AdminComponent_Conditional_91_Conditional_4_For_42_Template, 24, 18, "tr", null, _forTrack4);
    \u0275\u0275template(43, AdminComponent_Conditional_91_Conditional_4_Conditional_43_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("isActive", ctx_r0.activeTab() === "subscriptions");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.subPlanFilter);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.subStatusFilter);
    \u0275\u0275advance(28);
    \u0275\u0275repeater(ctx_r0.subs());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(43, !ctx_r0.subs().length ? 43 : -1);
  }
}
function AdminComponent_Conditional_91_Conditional_5_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 107)(3, "span", 108);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 109);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td")(8, "span", 128);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "span", 129);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 109);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    let tmp_16_0;
    const u_r16 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(u_r16.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r16.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(u_r16.role);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("plan-badge plan--", (tmp_15_0 = u_r16.subscription_plan) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "free", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_16_0 = u_r16.subscription_plan) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "free");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(u_r16.phone_verified ? "status--active" : "status--suspended");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r16.phone_verified ? "Verified" : "Unverified");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 11, u_r16.created_at, "mediumDate"));
  }
}
function AdminComponent_Conditional_91_Conditional_5_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 130);
    \u0275\u0275text(2, "No users found.");
    \u0275\u0275elementEnd()();
  }
}
function AdminComponent_Conditional_91_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 98)(1, "input", 123);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_5_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.userSearch, $event) || (ctx_r0.userSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function AdminComponent_Conditional_91_Conditional_5_Template_input_input_1_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadUsers());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "select", 100);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_5_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.userRoleFilter, $event) || (ctx_r0.userRoleFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminComponent_Conditional_91_Conditional_5_Template_select_change_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadUsers());
    });
    \u0275\u0275elementStart(3, "option", 101);
    \u0275\u0275text(4, "All Roles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 124);
    \u0275\u0275text(6, "Admin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 125);
    \u0275\u0275text(8, "Organizer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "option", 126);
    \u0275\u0275text(10, "Player");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 127);
    \u0275\u0275text(12, "Moderator");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 52)(14, "table", 106)(15, "thead")(16, "tr")(17, "th");
    \u0275\u0275text(18, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "Joined");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "tbody");
    \u0275\u0275repeaterCreate(28, AdminComponent_Conditional_91_Conditional_5_For_29_Template, 19, 14, "tr", null, _forTrack4);
    \u0275\u0275template(30, AdminComponent_Conditional_91_Conditional_5_Conditional_30_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.userSearch);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.userRoleFilter);
    \u0275\u0275advance(26);
    \u0275\u0275repeater(ctx_r0.allUsers());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(30, !ctx_r0.allUsers().length ? 30 : -1);
  }
}
function AdminComponent_Conditional_91_Conditional_6_For_18_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 121);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_6_For_18_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const inv_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.markPaid(inv_r18.id));
    });
    \u0275\u0275text(1, "Mark Paid");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_6_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 110);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 107)(5, "span", 108);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 109);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td", 110);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 109);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275template(19, AdminComponent_Conditional_91_Conditional_6_For_18_button_19_Template, 2, 0, "button", 131);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const inv_r18 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r18.invoice_number);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(inv_r18.user == null ? null : inv_r18.user.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r18.user == null ? null : inv_r18.user.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(11, 11, inv_r18.total, "1.2-2"), " ", inv_r18.currency, "");
    \u0275\u0275advance(3);
    \u0275\u0275classMapInterpolate1("status-badge inv--", inv_r18.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(inv_r18.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 14, inv_r18.created_at, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", inv_r18.status !== "paid");
  }
}
function AdminComponent_Conditional_91_Conditional_6_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 112);
    \u0275\u0275text(2, "No invoices found.");
    \u0275\u0275elementEnd()();
  }
}
function AdminComponent_Conditional_91_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "table", 106)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Invoice #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, AdminComponent_Conditional_91_Conditional_6_For_18_Template, 20, 17, "tr", null, _forTrack4);
    \u0275\u0275template(19, AdminComponent_Conditional_91_Conditional_6_Conditional_19_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.invoices());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(19, !ctx_r0.invoices().length ? 19 : -1);
  }
}
function AdminComponent_Conditional_91_Conditional_7_For_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 137);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r21.icon_emoji);
  }
}
function AdminComponent_Conditional_91_Conditional_7_For_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 141);
    \u0275\u0275element(1, "line", 19)(2, "line", 20)(3, "line", 21)(4, "line", 22)(5, "path", 23);
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_7_For_33_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 142);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r21.name_ar);
  }
}
function AdminComponent_Conditional_91_Conditional_7_For_33_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 140);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r22 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r22 === "single_elimination" ? "SE" : f_r22 === "double_elimination" ? "DE" : f_r22 === "round_robin" ? "RR" : "SW", " ");
  }
}
function AdminComponent_Conditional_91_Conditional_7_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 136);
    \u0275\u0275template(3, AdminComponent_Conditional_91_Conditional_7_For_33_Conditional_3_Template, 2, 1, "span", 137)(4, AdminComponent_Conditional_91_Conditional_7_For_33_Conditional_4_Template, 6, 0);
    \u0275\u0275elementStart(5, "div", 107)(6, "span", 108);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AdminComponent_Conditional_91_Conditional_7_For_33_span_8_Template, 2, 1, "span", 138);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td")(10, "span", 110);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 109);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 109);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td")(17, "div", 139);
    \u0275\u0275repeaterCreate(18, AdminComponent_Conditional_91_Conditional_7_For_33_For_19_Template, 2, 1, "span", 140, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 110);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td")(23, "span", 129);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td", 120)(26, "button", 111);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_7_For_33_Template_button_click_26_listener() {
      const g_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openGameModal(g_r21));
    });
    \u0275\u0275text(27, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 111);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_7_For_33_Template_button_click_28_listener() {
      const g_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleGame(g_r21));
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 122);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_7_For_33_Template_button_click_30_listener() {
      const g_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteGame(g_r21));
    });
    \u0275\u0275text(31, "Del");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const g_r21 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, g_r21.icon_emoji ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(g_r21.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", g_r21.name_ar);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(g_r21.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r21.platform || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r21.genre || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(g_r21.supported_formats);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(g_r21.sort_order);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(g_r21.is_active ? "status--active" : "status--suspended");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", g_r21.is_active ? "Active" : "Inactive", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(g_r21.is_active ? "Disable" : "Enable");
  }
}
function AdminComponent_Conditional_91_Conditional_7_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 143);
    \u0275\u0275text(2, "No games found.");
    \u0275\u0275elementEnd()();
  }
}
function AdminComponent_Conditional_91_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 98)(1, "input", 132);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_7_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gameSearch, $event) || (ctx_r0.gameSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function AdminComponent_Conditional_91_Conditional_7_Template_input_input_1_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.filterGames());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "select", 100);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_7_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gameStatusFilter, $event) || (ctx_r0.gameStatusFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function AdminComponent_Conditional_91_Conditional_7_Template_select_change_2_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.filterGames());
    });
    \u0275\u0275elementStart(3, "option", 101);
    \u0275\u0275text(4, "All");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 102);
    \u0275\u0275text(6, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 133);
    \u0275\u0275text(8, "Inactive");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 134);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_7_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openGameModal());
    });
    \u0275\u0275text(10, "+ Add Game");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 52)(12, "table", 106)(13, "thead")(14, "tr")(15, "th");
    \u0275\u0275text(16, "Game");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Platform");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "Genre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "Formats");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "tbody");
    \u0275\u0275repeaterCreate(32, AdminComponent_Conditional_91_Conditional_7_For_33_Template, 32, 11, "tr", null, _forTrack4);
    \u0275\u0275template(34, AdminComponent_Conditional_91_Conditional_7_tr_34_Template, 3, 0, "tr", 135);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gameSearch);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gameStatusFilter);
    \u0275\u0275advance(30);
    \u0275\u0275repeater(ctx_r0.filteredGames());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r0.filteredGames().length);
  }
}
function AdminComponent_Conditional_91_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 144);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_8_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeGameModal());
    });
    \u0275\u0275elementStart(1, "div", 145);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_8_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r23);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 146)(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 147);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeGameModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 148);
    \u0275\u0275element(7, "line", 149)(8, "line", 150);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 151)(10, "div", 152)(11, "div", 153)(12, "label");
    \u0275\u0275text(13, "Key *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 154);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.key, $event) || (ctx_r0.gForm.key = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275text(16, "Lowercase + underscores. Locked after creation.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 153)(18, "label");
    \u0275\u0275text(19, "Name (English) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 155);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.name, $event) || (ctx_r0.gForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 152)(22, "div", 153)(23, "label");
    \u0275\u0275text(24, "Name (Arabic)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 156);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.name_ar, $event) || (ctx_r0.gForm.name_ar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 153)(27, "label");
    \u0275\u0275text(28, "Icon Emoji");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 157);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.icon_emoji, $event) || (ctx_r0.gForm.icon_emoji = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 153)(31, "label");
    \u0275\u0275text(32, "Cover Image URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 158);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.icon_url, $event) || (ctx_r0.gForm.icon_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 152)(35, "div", 153)(36, "label");
    \u0275\u0275text(37, "Platform");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "select", 159);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_select_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.platform, $event) || (ctx_r0.gForm.platform = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(39, "option", 101);
    \u0275\u0275text(40, "\u2014 Select \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option");
    \u0275\u0275text(42, "Mobile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option");
    \u0275\u0275text(44, "PC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option");
    \u0275\u0275text(46, "Console");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "option");
    \u0275\u0275text(48, "Cross-platform");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "div", 153)(50, "label");
    \u0275\u0275text(51, "Genre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "select", 159);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_select_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.genre, $event) || (ctx_r0.gForm.genre = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(53, "option", 101);
    \u0275\u0275text(54, "\u2014 Select \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "option");
    \u0275\u0275text(56, "Battle Royale");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "option");
    \u0275\u0275text(58, "FPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "option");
    \u0275\u0275text(60, "Sports");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "option");
    \u0275\u0275text(62, "Fighting");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "option");
    \u0275\u0275text(64, "MOBA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "option");
    \u0275\u0275text(66, "Strategy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "option");
    \u0275\u0275text(68, "Racing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "option");
    \u0275\u0275text(70, "Other");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(71, "div", 153)(72, "label");
    \u0275\u0275text(73, "Bracket Formats");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 160)(75, "label", 93)(76, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.fmt_se, $event) || (ctx_r0.gForm.fmt_se = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(77, "Single Elimination");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "label", 93)(79, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_79_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.fmt_de, $event) || (ctx_r0.gForm.fmt_de = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(80, "Double Elimination");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "label", 93)(82, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_82_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.fmt_rr, $event) || (ctx_r0.gForm.fmt_rr = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(83, "Round Robin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "label", 93)(85, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_85_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.fmt_sw, $event) || (ctx_r0.gForm.fmt_sw = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(86, "Swiss System");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "div", 152)(88, "div", 153)(89, "label");
    \u0275\u0275text(90, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "input", 91);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_91_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.sort_order, $event) || (ctx_r0.gForm.sort_order = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 153)(93, "label");
    \u0275\u0275text(94, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "label", 161)(96, "input", 95);
    \u0275\u0275twoWayListener("ngModelChange", function AdminComponent_Conditional_91_Conditional_8_Template_input_ngModelChange_96_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.gForm.is_active, $event) || (ctx_r0.gForm.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(97, "Active ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(98, "div", 162)(99, "button", 111);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_8_Template_button_click_99_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.closeGameModal());
    });
    \u0275\u0275text(100, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "button", 96);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_8_Template_button_click_101_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveGame());
    });
    \u0275\u0275text(102);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.editingGame() ? "Edit Game" : "Add Game");
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.key);
    \u0275\u0275property("disabled", !!ctx_r0.editingGame());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.name);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.name_ar);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.icon_emoji);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.icon_url);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.platform);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.genre);
    \u0275\u0275advance(24);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.fmt_se);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.fmt_de);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.fmt_rr);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.fmt_sw);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.sort_order);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.gForm.is_active);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Saving..." : ctx_r0.editingGame() ? "Save Changes" : "Add Game", " ");
  }
}
function AdminComponent_Conditional_91_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_9_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const cp_r26 = \u0275\u0275nextContext();
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelSubConfirmed(cp_r26.id));
    });
    \u0275\u0275text(1, "Yes, cancel");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_9_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r27);
      const cp_r26 = \u0275\u0275nextContext();
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteGameConfirmed(cp_r26.id));
    });
    \u0275\u0275text(1, "Yes, delete");
    \u0275\u0275elementEnd();
  }
}
function AdminComponent_Conditional_91_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "span", 163);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 164)(4, "button", 111);
    \u0275\u0275listener("click", function AdminComponent_Conditional_91_Conditional_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmPending.set(null));
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AdminComponent_Conditional_91_Conditional_9_Conditional_6_Template, 2, 0, "button", 165)(7, AdminComponent_Conditional_91_Conditional_9_Conditional_7_Template, 2, 0, "button", 165);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cp_r26 = ctx;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cp_r26.label);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(6, cp_r26.action === "cancelSub" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, cp_r26.action === "deleteGame" ? 7 : -1);
  }
}
function AdminComponent_Conditional_91_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 166);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("toast--error", ctx_r0.toastType() === "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.toast());
  }
}
function AdminComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275template(1, AdminComponent_Conditional_91_Conditional_1_Template, 2, 2)(2, AdminComponent_Conditional_91_Conditional_2_Template, 3, 0, "div", 51)(3, AdminComponent_Conditional_91_Conditional_3_Template, 33, 3)(4, AdminComponent_Conditional_91_Conditional_4_Template, 44, 4)(5, AdminComponent_Conditional_91_Conditional_5_Template, 31, 3)(6, AdminComponent_Conditional_91_Conditional_6_Template, 20, 1, "div", 52)(7, AdminComponent_Conditional_91_Conditional_7_Template, 35, 3)(8, AdminComponent_Conditional_91_Conditional_8_Template, 103, 17, "div", 53)(9, AdminComponent_Conditional_91_Conditional_9_Template, 8, 3, "div", 54)(10, AdminComponent_Conditional_91_Conditional_10_Template, 2, 3, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.activeTab() === "overview" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ctx_r0.activeTab() === "plans" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r0.activeTab() === "companies" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ctx_r0.activeTab() === "subscriptions" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ctx_r0.activeTab() === "users" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, ctx_r0.activeTab() === "invoices" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r0.activeTab() === "games" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, ctx_r0.showGameModal() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, (tmp_9_0 = ctx_r0.confirmPending()) ? 9 : -1, tmp_9_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r0.toast() ? 10 : -1);
  }
}
var AdminComponent = class _AdminComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.base = environment.apiUrl;
    this.hasChildRoute = signal(false);
    this.currentPageTitle = () => {
      const url = this.router.url;
      if (url.includes("/admin/marketplace"))
        return "Marketplace";
      if (url.includes("/admin/finance"))
        return "Finance & Reports";
      if (url.includes("/admin/platform-sponsors"))
        return "Platform Sponsors";
      if (url.includes("/admin/sponsors"))
        return "Sponsors";
      if (url.includes("/admin/ads"))
        return "Ad Placements";
      if (url.includes("/admin/streams"))
        return "Live Streams";
      const map = {
        overview: "Overview",
        plans: "Plans & Pricing",
        companies: "Companies",
        subscriptions: "Subscriptions",
        users: "Users",
        invoices: "Invoices",
        games: "Game Types"
      };
      return map[this.activeTab()] ?? "Admin";
    };
    this.today = () => (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    this.confirmPending = signal(null);
    this.tabs = [
      { key: "overview", label: "Overview" },
      { key: "plans", label: "Plans & Pricing" },
      { key: "companies", label: "Companies" },
      { key: "subscriptions", label: "Subscriptions" },
      { key: "users", label: "Users" },
      { key: "invoices", label: "Invoices" },
      { key: "games", label: "Game Types" }
    ];
    this.featureKeys = [
      { key: "create_tournaments", label: "Create tournaments" },
      { key: "hr_csv_import", label: "HR CSV import" },
      { key: "hr_api_integration", label: "SAP / Oracle / Workday" },
      { key: "white_label", label: "White label branding" },
      { key: "bulk_prize_distribution", label: "Bulk prize distribution" },
      { key: "engagement_reports", label: "Engagement reports" },
      { key: "advanced_analytics", label: "Advanced analytics" },
      { key: "sso_saml", label: "SAML 2.0 / SSO" },
      { key: "dedicated_manager", label: "Dedicated account manager" },
      { key: "custom_sla", label: "Custom SLA" }
    ];
    this.activeTab = signal("overview");
    this.overview = signal(null);
    this.plansList = signal([]);
    this.companies = signal([]);
    this.subs = signal([]);
    this.allUsers = signal([]);
    this.invoices = signal([]);
    this.gamesList = signal([]);
    this.filteredGames = signal([]);
    this.showGameModal = signal(false);
    this.editingGame = signal(null);
    this.toast = signal(null);
    this.toastType = signal("success");
    this.saving = signal(false);
    this.companySearch = "";
    this.companyStatusFilter = "";
    this.subPlanFilter = "";
    this.subStatusFilter = "";
    this.userSearch = "";
    this.userRoleFilter = "";
    this.gameSearch = "";
    this.gameStatusFilter = "";
    this.gForm = this.emptyGameForm();
    if (this.auth.currentUser()?.role !== "admin") {
      this.router.navigate(["/dashboard"]);
    }
    const updateChildRoute = () => {
      const isChild = this.router.url !== "/admin" && this.router.url.startsWith("/admin/");
      this.hasChildRoute.set(isChild);
    };
    updateChildRoute();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => updateChildRoute());
  }
  ngOnInit() {
    this.loadOverview();
    this.loadPlans();
    this.loadCompanies();
    this.loadSubscriptions();
    this.loadUsers();
    this.loadInvoices();
    this.loadGames();
  }
  switchTab(key) {
    this.activeTab.set(key);
    if (this.hasChildRoute()) {
      this.router.navigate(["/admin"]);
    }
  }
  loadOverview() {
    this.http.get(`${this.base}/admin/overview`).subscribe({ next: (r) => this.overview.set(r.data) });
  }
  loadPlans() {
    this.http.get(`${this.base}/admin/plans`).subscribe({ next: (r) => this.plansList.set(r.data ?? []) });
  }
  savePlan(plan) {
    this.saving.set(true);
    const body = {
      name: plan.name,
      name_ar: plan.name_ar,
      price: plan.price,
      description: plan.description,
      description_ar: plan.description_ar,
      is_active: plan.is_active,
      limit_tournaments_per_month: plan.limits.tournaments_per_month,
      limit_max_participants: plan.limits.max_participants,
      limit_max_employees: plan.limits.max_employees,
      limit_moderators: plan.limits.moderators,
      feat_create_tournaments: plan.features.create_tournaments,
      feat_hr_csv_import: plan.features.hr_csv_import,
      feat_hr_api_integration: plan.features.hr_api_integration,
      feat_white_label: plan.features.white_label,
      feat_bulk_prizes: plan.features.bulk_prize_distribution,
      feat_engagement_reports: plan.features.engagement_reports,
      feat_advanced_analytics: plan.features.advanced_analytics,
      feat_sso_saml: plan.features.sso_saml,
      feat_dedicated_manager: plan.features.dedicated_manager,
      feat_custom_sla: plan.features.custom_sla
    };
    this.http.put(`${this.base}/admin/plans/${plan.key}`, body).subscribe({
      next: (r) => {
        this.showToast(r.message ?? "Plan saved!", "success");
        this.saving.set(false);
      },
      error: (e) => {
        this.showToast(e.error?.message ?? "Failed to save.", "error");
        this.saving.set(false);
      }
    });
  }
  loadCompanies() {
    const p = {};
    if (this.companySearch)
      p.search = this.companySearch;
    if (this.companyStatusFilter)
      p.status = this.companyStatusFilter;
    this.http.get(`${this.base}/admin/companies`, { params: p }).subscribe({ next: (r) => this.companies.set(r.data ?? []) });
  }
  loadSubscriptions() {
    const p = {};
    if (this.subPlanFilter)
      p.plan = this.subPlanFilter;
    if (this.subStatusFilter)
      p.status = this.subStatusFilter;
    this.http.get(`${this.base}/admin/subscriptions`, { params: p }).subscribe({ next: (r) => this.subs.set(r.data ?? []) });
  }
  loadUsers() {
    const p = {};
    if (this.userSearch)
      p.search = this.userSearch;
    if (this.userRoleFilter)
      p.role = this.userRoleFilter;
    this.http.get(`${this.base}/admin/users`, { params: p }).subscribe({ next: (r) => this.allUsers.set(r.data ?? []) });
  }
  loadInvoices() {
    this.http.get(`${this.base}/admin/invoices`).subscribe({ next: (r) => this.invoices.set(r.data ?? []) });
  }
  selectCompany(c) {
    this.showToast(`Selected: ${c.name}`, "success");
  }
  extendSub(id) {
    this.http.post(`${this.base}/admin/subscriptions/${id}/extend`, { months: 1 }).subscribe({
      next: (r) => {
        this.showToast(r.message, "success");
        this.loadSubscriptions();
      },
      error: (e) => this.showToast(e.error?.message ?? "Failed", "error")
    });
  }
  cancelSub(id) {
    this.confirmPending.set({ action: "cancelSub", label: "Cancel this subscription?", id });
  }
  cancelSubConfirmed(id) {
    this.confirmPending.set(null);
    this.http.post(`${this.base}/admin/subscriptions/${id}/cancel`, {}).subscribe({
      next: () => {
        this.showToast("Cancelled.", "success");
        this.loadSubscriptions();
      },
      error: (e) => this.showToast(e.error?.message ?? "Failed", "error")
    });
  }
  markPaid(id) {
    this.http.put(`${this.base}/admin/invoices/${id}/mark-paid`, {}).subscribe({
      next: () => {
        this.showToast("Marked as paid.", "success");
        this.loadInvoices();
        this.loadOverview();
      },
      error: (e) => this.showToast(e.error?.message ?? "Failed", "error")
    });
  }
  // ── Games ──────────────────────────────────────────────────────────────────
  loadGames() {
    this.http.get(`${this.base}/games`).pipe(catchError(() => of({ data: [] }))).subscribe((r) => {
      this.gamesList.set(r.data ?? []);
      this.filterGames();
    });
  }
  filterGames() {
    const q = this.gameSearch.toLowerCase();
    this.filteredGames.set(this.gamesList().filter((g) => {
      const matchQ = !q || g.name.toLowerCase().includes(q) || g.key.includes(q);
      const matchF = !this.gameStatusFilter || (this.gameStatusFilter === "active" ? g.is_active : !g.is_active);
      return matchQ && matchF;
    }));
  }
  openGameModal(g) {
    this.editingGame.set(g ?? null);
    if (g) {
      this.gForm = {
        key: g.key,
        name: g.name,
        name_ar: g.name_ar ?? "",
        icon_emoji: g.icon_emoji ?? "",
        icon_url: g.icon_url ?? "",
        platform: g.platform ?? "",
        genre: g.genre ?? "",
        is_active: g.is_active,
        sort_order: g.sort_order,
        fmt_se: g.supported_formats?.includes("single_elimination") ?? false,
        fmt_de: g.supported_formats?.includes("double_elimination") ?? false,
        fmt_rr: g.supported_formats?.includes("round_robin") ?? false,
        fmt_sw: g.supported_formats?.includes("swiss") ?? false
      };
    } else {
      this.gForm = this.emptyGameForm();
    }
    this.showGameModal.set(true);
  }
  closeGameModal() {
    this.showGameModal.set(false);
  }
  saveGame() {
    if (!this.gForm.key || !this.gForm.name) {
      this.showToast("Key and Name are required.", "error");
      return;
    }
    this.saving.set(true);
    const formats = [
      ...this.gForm.fmt_se ? ["single_elimination"] : [],
      ...this.gForm.fmt_de ? ["double_elimination"] : [],
      ...this.gForm.fmt_rr ? ["round_robin"] : [],
      ...this.gForm.fmt_sw ? ["swiss"] : []
    ];
    const payload = {
      key: this.gForm.key,
      name: this.gForm.name,
      name_ar: this.gForm.name_ar || null,
      icon_emoji: this.gForm.icon_emoji || null,
      icon_url: this.gForm.icon_url || null,
      platform: this.gForm.platform || null,
      genre: this.gForm.genre || null,
      supported_formats: formats,
      is_active: this.gForm.is_active,
      sort_order: +this.gForm.sort_order
    };
    const edit = this.editingGame();
    const req$ = edit ? this.http.put(`${this.base}/admin/games/${edit.id}`, payload) : this.http.post(`${this.base}/admin/games`, payload);
    req$.pipe(catchError((e) => {
      this.showToast(e.error?.message ?? "Save failed.", "error");
      this.saving.set(false);
      return of(null);
    })).subscribe((res) => {
      if (!res)
        return;
      this.loadGames();
      this.saving.set(false);
      this.closeGameModal();
      this.showToast(edit ? "Game updated." : "Game added.", "success");
    });
  }
  toggleGame(g) {
    this.http.patch(`${this.base}/admin/games/${g.id}/toggle`, {}).pipe(catchError(() => {
      this.showToast("Toggle failed.", "error");
      return of(null);
    })).subscribe((res) => {
      if (!res)
        return;
      this.loadGames();
      this.showToast(`${res.data.name} ${res.data.is_active ? "enabled" : "disabled"}.`, "success");
    });
  }
  deleteGame(g) {
    this.confirmPending.set({ action: "deleteGame", label: `Delete "${g.name}"?`, id: g.id });
  }
  deleteGameConfirmed(id) {
    this.confirmPending.set(null);
    const g = this.gamesList().find((x) => x.id === id);
    this.http.delete(`${this.base}/admin/games/${id}`).pipe(catchError(() => {
      this.showToast("Delete failed.", "error");
      return of(null);
    })).subscribe(() => {
      this.loadGames();
      this.showToast(`${g?.name ?? "Game"} deleted.`, "success");
    });
  }
  emptyGameForm() {
    return { key: "", name: "", name_ar: "", icon_emoji: "", icon_url: "", platform: "", genre: "", is_active: true, sort_order: 0, fmt_se: true, fmt_de: true, fmt_rr: false, fmt_sw: false };
  }
  barH(val, trend) {
    const max = Math.max(...trend.map((m) => m.total), 1);
    return Math.round(val / max * 100);
  }
  showToast(msg, type) {
    this.toast.set(msg);
    this.toastType.set(type);
    setTimeout(() => this.toast.set(null), 3500);
  }
  static {
    this.\u0275fac = function AdminComponent_Factory(t) {
      return new (t || _AdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["dw-admin"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 92, vars: 16, consts: [[1, "admin-shell"], [1, "admin-nav"], [1, "admin-nav__brand"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "13 2 3 14 12 14 11 22 21 10 12 10 13 2"], [1, "nav-group"], [1, "nav-group-label"], [1, "nav-item", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], ["d", "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"], ["points", "9 22 9 12 15 12 15 22"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], ["x1", "6", "y1", "12", "x2", "10", "y2", "12"], ["x1", "8", "y1", "10", "x2", "8", "y2", "14"], ["x1", "15", "y1", "11", "x2", "15.01", "y2", "11"], ["x1", "18", "y1", "13", "x2", "18.01", "y2", "13"], ["d", "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], ["d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"], ["x", "2", "y", "5", "width", "20", "height", "14", "rx", "2"], ["x1", "2", "y1", "10", "x2", "22", "y2", "10"], ["routerLink", "/admin/marketplace", "routerLinkActive", "active", 1, "nav-item"], ["d", "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["d", "M16 10a4 4 0 0 1-8 0"], ["routerLink", "/admin/finance", "routerLinkActive", "active", 1, "nav-item"], ["x1", "12", "y1", "1", "x2", "12", "y2", "23"], ["d", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"], ["routerLink", "/admin/sponsors", "routerLinkActive", "active", 1, "nav-item"], ["routerLink", "/admin/platform-sponsors", "routerLinkActive", "active", 1, "nav-item"], ["points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"], ["routerLink", "/admin/ads", "routerLinkActive", "active", 1, "nav-item"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "9", "y1", "9", "x2", "15", "y2", "9"], ["x1", "9", "y1", "12", "x2", "15", "y2", "12"], ["x1", "9", "y1", "15", "x2", "12", "y2", "15"], [1, "admin-main"], [1, "admin-page-header"], [1, "admin"], [1, "admin-title"], [1, "admin-sub"], [1, "plans-config"], [1, "table-wrap"], [1, "modal-backdrop"], [1, "confirm-bar"], [1, "toast", 3, "toast--error"], ["class", "stats-row", 4, "ngIf"], ["class", "grid-2", 4, "ngIf"], [1, "stats-row"], [1, "stat-card"], [1, "stat-val"], [1, "stat-lbl"], [1, "grid-2"], [1, "panel"], [1, "panel-title"], [1, "chart-bars"], [1, "plan-row"], [1, "pr-name"], [1, "pr-count"], [1, "pr-rev"], [1, "panel-empty"], [1, "bar-group"], [1, "bar"], [1, "bar-label"], [1, "plan-config-card", 3, "plan-inactive"], [1, "plan-config-card"], [1, "pcc-header"], [1, "pcc-name"], [1, "pcc-name-ar"], [1, "pcc-type"], [1, "plan-badge"], [1, "pcc-section"], [1, "pcc-label"], [1, "pcc-row"], ["type", "number", "min", "0", 1, "pcc-input", 3, "ngModelChange", "ngModel", "disabled"], ["class", "pcc-hint", 4, "ngIf"], ["type", "text", 1, "pcc-input", "pcc-input--wide", 3, "ngModelChange", "ngModel"], ["type", "text", "dir", "rtl", 1, "pcc-input", "pcc-input--wide", 3, "ngModelChange", "ngModel"], [1, "pcc-limits"], [1, "pcc-limit"], ["type", "number", "min", "-1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [1, "pcc-features"], [1, "pcc-feat"], [1, "pcc-footer"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-gold", 3, "click", "disabled"], [1, "pcc-hint"], [1, "toolbar"], ["placeholder", "Search companies...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "active"], ["value", "trial"], ["value", "suspended"], ["value", "churned"], [1, "data-table"], [1, "company-cell"], [1, "cname"], [1, "dim"], [1, "mono"], [1, "btn-xs", 3, "click"], ["colspan", "6", 2, "text-align", "center", "color", "#8892a4", "padding", "2rem"], [3, "isActive"], ["value", "free"], ["value", "starter"], ["value", "professional"], ["value", "enterprise"], ["value", "cancelled"], ["value", "expired"], [2, "display", "flex", "gap", "0.3rem"], [1, "btn-xs", "btn-gold", 3, "click"], [1, "btn-xs", "btn-danger", 3, "click"], ["placeholder", "Search users...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["value", "admin"], ["value", "organizer"], ["value", "player"], ["value", "moderator"], [1, "role-badge"], [1, "status-badge"], ["colspan", "5", 2, "text-align", "center", "color", "#8892a4", "padding", "2rem"], ["class", "btn-xs btn-gold", 3, "click", 4, "ngIf"], ["placeholder", "Search games...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["value", "inactive"], [1, "btn", "btn-gold", 2, "margin-left", "auto", 3, "click"], [4, "ngIf"], [2, "display", "flex", "align-items", "center", "gap", "0.5rem"], [2, "font-size", "1.2rem"], ["class", "dim", "dir", "rtl", 4, "ngIf"], [2, "display", "flex", "gap", "0.2rem", "flex-wrap", "wrap"], [1, "plan-badge", "plan--starter", 2, "font-size", "0.6rem"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 2, "width", "18px", "height", "18px", "color", "#8892a4"], ["dir", "rtl", 1, "dim"], ["colspan", "8", 2, "text-align", "center", "color", "#8892a4", "padding", "2rem"], [1, "modal-backdrop", 3, "click"], [1, "modal-box", 3, "click"], [1, "modal-hdr"], ["title", "Close", 2, "background", "none", "border", "none", "color", "#8892a4", "cursor", "pointer", "display", "grid", "place-items", "center", "width", "28px", "height", "28px", "border-radius", "6px", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "modal-body"], [1, "mg-row"], [1, "mg-field"], ["placeholder", "e.g. pubg_mobile", 3, "ngModelChange", "ngModel", "disabled"], ["placeholder", "e.g. PUBG Mobile", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0628\u0628\u062C\u064A \u0645\u0648\u0628\u0627\u064A\u0644", "dir", "rtl", 3, "ngModelChange", "ngModel"], ["placeholder", "\u{1F3AF}", "maxlength", "4", 3, "ngModelChange", "ngModel"], ["placeholder", "https://cdn.example.com/game.png", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [1, "mg-checks"], [1, "pcc-feat", 2, "margin-top", "0.5rem"], [1, "modal-foot"], [1, "confirm-msg"], [1, "confirm-actions"], [1, "btn-xs", "btn-danger"], [1, "toast"]], template: function AdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "polygon", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "span");
        \u0275\u0275text(6, "Control Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "span", 6);
        \u0275\u0275text(9, "Platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_10_listener() {
          return ctx.switchTab("overview");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(11, "svg", 8);
        \u0275\u0275element(12, "rect", 9)(13, "rect", 10)(14, "rect", 11)(15, "rect", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275text(16, " Overview ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(17, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_17_listener() {
          return ctx.switchTab("companies");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(18, "svg", 8);
        \u0275\u0275element(19, "path", 13)(20, "polyline", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " Companies ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(22, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_22_listener() {
          return ctx.switchTab("users");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(23, "svg", 8);
        \u0275\u0275element(24, "path", 15)(25, "circle", 16)(26, "path", 17)(27, "path", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " Users ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(29, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_29_listener() {
          return ctx.switchTab("games");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(30, "svg", 8);
        \u0275\u0275element(31, "line", 19)(32, "line", 20)(33, "line", 21)(34, "line", 22)(35, "path", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, " Game Types ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(37, "div", 5)(38, "span", 6);
        \u0275\u0275text(39, "Monetization");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_40_listener() {
          return ctx.switchTab("plans");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(41, "svg", 8);
        \u0275\u0275element(42, "path", 24)(43, "polyline", 25)(44, "line", 26)(45, "line", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275text(46, " Plans & Pricing ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(47, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_47_listener() {
          return ctx.switchTab("subscriptions");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(48, "svg", 8);
        \u0275\u0275element(49, "path", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275text(50, " Subscriptions ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(51, "button", 7);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_51_listener() {
          return ctx.switchTab("invoices");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(52, "svg", 8);
        \u0275\u0275element(53, "rect", 29)(54, "line", 30);
        \u0275\u0275elementEnd();
        \u0275\u0275text(55, " Invoices ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(56, "div", 5)(57, "span", 6);
        \u0275\u0275text(58, "Sections");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "a", 31);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(60, "svg", 8);
        \u0275\u0275element(61, "path", 32)(62, "line", 33)(63, "path", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275text(64, " Marketplace ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(65, "a", 35);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(66, "svg", 8);
        \u0275\u0275element(67, "line", 36)(68, "path", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275text(69, " Finance ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(70, "a", 38);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(71, "svg", 8);
        \u0275\u0275element(72, "path", 15)(73, "circle", 16)(74, "path", 17)(75, "path", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275text(76, " Sponsors ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(77, "a", 39);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(78, "svg", 8);
        \u0275\u0275element(79, "polygon", 40);
        \u0275\u0275elementEnd();
        \u0275\u0275text(80, " Platform Sponsors ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(81, "a", 41);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(82, "svg", 8);
        \u0275\u0275element(83, "rect", 42)(84, "line", 43)(85, "line", 44)(86, "line", 45);
        \u0275\u0275elementEnd();
        \u0275\u0275text(87, " Ad Placements ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(88, "div", 46);
        \u0275\u0275template(89, AdminComponent_Conditional_89_Template, 6, 2, "div", 47);
        \u0275\u0275element(90, "router-outlet");
        \u0275\u0275template(91, AdminComponent_Conditional_91_Template, 11, 10, "div", 48);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275classProp("active", ctx.activeTab() === "overview");
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.activeTab() === "companies");
        \u0275\u0275advance(5);
        \u0275\u0275classProp("active", ctx.activeTab() === "users");
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.activeTab() === "games");
        \u0275\u0275advance(11);
        \u0275\u0275classProp("active", ctx.activeTab() === "plans");
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.activeTab() === "subscriptions");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.activeTab() === "invoices");
        \u0275\u0275advance(38);
        \u0275\u0275conditional(89, !ctx.hasChildRoute() ? 89 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(91, !ctx.hasChildRoute() ? 91 : -1);
      }
    }, dependencies: [CommonModule, NgIf, UpperCasePipe, DecimalPipe, TitleCasePipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, NgModel, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, SubscriptionsDashboardComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.admin-shell[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 220px 1fr;\n  min-height: calc(100vh - 60px);\n  background: #0b0f1a;\n}\n.admin-nav[_ngcontent-%COMP%] {\n  background: #0e1220;\n  border-right: 1px solid #1e2a3a;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  position: sticky;\n  top: 60px;\n  height: calc(100vh - 60px);\n  overflow-y: auto;\n}\n.admin-nav__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 1.25rem 1.1rem;\n  border-bottom: 1px solid #1e2a3a;\n  font-family: var(--fh, "Anton", sans-serif);\n  font-size: 0.9rem;\n  letter-spacing: .12em;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  svg {\n    flex-shrink: 0;\n  }\n}\n.nav-group[_ngcontent-%COMP%] {\n  padding: 1rem 0.65rem 0.5rem;\n}\n.nav-group-label[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0 0.5rem;\n  margin-bottom: 0.35rem;\n  font-family: var(--fm, monospace);\n  font-size: 0.62rem;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: #3d4f63;\n  font-weight: 600;\n}\n.nav-item[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 38px;\n  padding: 0 0.75rem;\n  margin: 0;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-family: inherit;\n  font-size: 0.84rem;\n  font-weight: 500;\n  line-height: 1;\n  text-align: left;\n  cursor: pointer;\n  text-decoration: none;\n  white-space: nowrap;\n  transition: background .14s, color .14s;\n  svg {\n    flex-shrink: 0;\n    display: block;\n    width: 15px;\n    height: 15px;\n    transition: color .14s;\n  }\n  &:hover {\n    background: rgba(255, 255, 255, .05);\n    color: #e5e7eb;\n  }\n  &.active {\n    background: rgba(212, 175, 55, .1);\n    color: var(--accent, #d4af37);\n    font-weight: 600;\n    svg {\n      color: var(--accent, #d4af37);\n    }\n  }\n}\n.nav-group[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]    + .nav-item[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n.admin-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.admin-page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.25rem 1.75rem;\n  border-bottom: 1px solid #1e2a3a;\n  background: #0e1220;\n}\n.admin-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, "Anton", sans-serif);\n  font-size: 1.6rem;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: #fff;\n  margin: 0;\n}\n.admin-sub[_ngcontent-%COMP%] {\n  color: #4b5563;\n  font-size: 0.78rem;\n  margin: 2px 0 0;\n  font-family: var(--fm, monospace);\n  letter-spacing: .5px;\n}\n.admin[_ngcontent-%COMP%] {\n  padding: 1.5rem 1.75rem;\n  flex: 1;\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 8px;\n  padding: 1rem;\n  min-height: 84px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.stat-val[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fh, sans-serif);\n  font-size: 1.8rem;\n  color: var(--accent, #d4af37);\n  line-height: 1.15;\n}\n.stat-lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: #8892a4;\n  margin-top: 0.25rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.grid-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.panel[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 8px;\n  padding: 1rem;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-family: var(--fb, sans-serif);\n  font-weight: 700;\n  font-size: 0.9rem;\n  letter-spacing: 0.08em;\n  color: #8892a4;\n  text-transform: uppercase;\n  margin: 0 0 0.75rem;\n}\n.panel-empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  min-height: 120px;\n  padding: 1rem;\n  color: #5b667a;\n  font-size: 0.82rem;\n  line-height: 1.5;\n  border: 1px dashed #243048;\n  border-radius: 6px;\n}\n.plan-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0;\n  border-bottom: 1px solid #1a2235;\n}\n.pr-name[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #dde1ee;\n  font-size: 0.85rem;\n}\n.pr-count[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #8892a4;\n}\n.pr-rev[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.75rem;\n  color: var(--accent, #d4af37);\n  margin-left: auto;\n}\n.chart-bars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.5rem;\n  height: 120px;\n}\n.bar-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  flex: 1;\n  height: 100%;\n  justify-content: flex-end;\n}\n.bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      180deg,\n      var(--accent, #d4af37),\n      rgba(212, 175, 55, 0.3));\n  border-radius: 3px 3px 0 0;\n  min-height: 4px;\n  transition: height 0.3s;\n}\n.bar-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: #8892a4;\n}\n.plans-config[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 1rem;\n}\n.plan-config-card[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 8px;\n  padding: 1rem;\n}\n.plan-inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.pcc-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n}\n.pcc-name[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fb, sans-serif);\n  font-weight: 700;\n  font-size: 1.1rem;\n  color: #fff;\n}\n.pcc-name-ar[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  color: #8892a4;\n  direction: rtl;\n}\n.pcc-type[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.65rem;\n  background: #1a2235;\n  color: #8892a4;\n  padding: 0.1rem 0.4rem;\n  border-radius: 4px;\n  margin-top: 0.25rem;\n}\n.pcc-section[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n}\n.pcc-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.7rem;\n  color: #8892a4;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  margin-bottom: 0.3rem;\n}\n.pcc-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pcc-input[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 4px;\n  color: #dde1ee;\n  padding: 0.35rem 0.6rem;\n  font-size: 0.85rem;\n  width: 100px;\n}\n.pcc-input--wide[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.pcc-hint[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--accent, #d4af37);\n}\n.pcc-limits[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.5rem;\n}\n.pcc-limit[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  font-size: 0.75rem;\n  color: #8892a4;\n}\n.pcc-limit[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 4px;\n  color: #dde1ee;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.8rem;\n  width: 70px;\n}\n.pcc-features[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.3rem;\n}\n.pcc-feat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.78rem;\n  color: #8892a4;\n  cursor: pointer;\n}\n.pcc-feat[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  accent-color: var(--accent, #d4af37);\n}\n.pcc-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 0.75rem;\n  border-top: 1px solid #1a2235;\n  margin-top: 0.75rem;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n}\n.search-input[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 6px;\n  color: #dde1ee;\n  padding: 0.45rem 0.75rem;\n  font-size: 0.85rem;\n  flex: 1;\n  min-width: 180px;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: #4b5563;\n}\n.filter-select[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid #243048;\n  border-radius: 6px;\n  color: #dde1ee;\n  padding: 0.45rem 0.75rem;\n  font-size: 0.85rem;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.65rem 0.75rem;\n  text-align: left;\n  font-family: var(--fb, sans-serif);\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #4b5563;\n  border-bottom: 1px solid #243048;\n  white-space: nowrap;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.65rem 0.75rem;\n  border-bottom: 1px solid #1a2235;\n  color: #dde1ee;\n  font-size: 0.85rem;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #1a2235;\n}\n.company-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.cname[_ngcontent-%COMP%] {\n  color: #fff;\n  font-weight: 500;\n}\n.dim[_ngcontent-%COMP%] {\n  color: #8892a4;\n}\n.mono[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 0.8rem;\n  color: var(--accent, #d4af37);\n}\n.plan-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  padding: 0.15rem 0.5rem;\n  border-radius: 4px;\n}\n.plan--free[_ngcontent-%COMP%] {\n  background: #1a2235;\n  color: #8892a4;\n}\n.plan--starter[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.1);\n  color: #fbbf24;\n}\n.plan--professional[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: #d4af37;\n}\n.plan--enterprise[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: #d4af37;\n}\n.plan--None[_ngcontent-%COMP%] {\n  background: #1a2235;\n  color: #4b5563;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 0.15rem 0.5rem;\n  border-radius: 4px;\n}\n.status--active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.status--trial[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.status--suspended[_ngcontent-%COMP%], .status--cancelled[_ngcontent-%COMP%], .status--expired[_ngcontent-%COMP%], .status--churned[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.inv--paid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.inv--pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.1);\n  color: #f59e0b;\n}\n.role-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n}\n.btn[_ngcontent-%COMP%] {\n  font-family: var(--fb, sans-serif);\n  font-weight: 700;\n  font-size: 0.8rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  padding: 0.45rem 1rem;\n  border-radius: 6px;\n  cursor: pointer;\n  border: none;\n  transition: all 0.15s;\n}\n.btn-gold[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n  color: #0b1022;\n}\n.btn-gold[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-xs[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  border: 1px solid #243048;\n  background: transparent;\n  color: #8892a4;\n  cursor: pointer;\n}\n.btn-xs[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent, #d4af37);\n  color: var(--accent, #d4af37);\n}\n.btn-xs.btn-gold[_ngcontent-%COMP%] {\n  background: var(--accent, #d4af37);\n  color: #0b1022;\n  border-color: var(--accent, #d4af37);\n}\n.btn-xs.btn-danger[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n  color: #ef4444;\n}\n.btn-xs.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #ef4444;\n  color: #fff;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.75);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  z-index: 500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n.modal-box[_ngcontent-%COMP%] {\n  background: #1a2235;\n  border: 1px solid rgba(212, 175, 55, 0.25);\n  border-radius: 8px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);\n}\n.modal-hdr[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #243048;\n  font-family: var(--fh, sans-serif);\n  font-size: 1.3rem;\n  letter-spacing: 0.1em;\n  color: var(--accent, #d4af37);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n}\n.modal-foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.65rem;\n  padding: 0.85rem 1.25rem;\n  border-top: 1px solid #243048;\n}\n.mg-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n.mg-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.mg-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: #8892a4;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.mg-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .mg-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid #243048;\n  border-radius: 4px;\n  color: #dde1ee;\n  padding: 0.45rem 0.65rem;\n  font-size: 0.88rem;\n  width: 100%;\n  box-sizing: border-box;\n}\n.mg-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .mg-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: rgba(251, 191, 36, 0.4);\n}\n.mg-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: #1a2235;\n}\n.mg-field[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #4b5563;\n}\n.mg-checks[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2rem;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #22c55e;\n  color: #fff;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  z-index: 100;\n  font-family: var(--fb, sans-serif);\n  font-weight: 600;\n}\n.toast--error[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.confirm-bar[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 50;\n  margin: 1rem -1.5rem -1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.9rem 1.5rem;\n  background: rgba(239, 68, 68, 0.12);\n  border-top: 1px solid rgba(239, 68, 68, 0.35);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.confirm-msg[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: #fca5a5;\n  font-weight: 600;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n@media (max-width: 768px) {\n  .stats-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .grid-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pcc-limits[_ngcontent-%COMP%], .pcc-features[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .mg-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=admin.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "src\\app\\pages\\admin\\admin.component.ts", lineNumber: 643 });
})();
export {
  AdminComponent
};
//# sourceMappingURL=chunk-LYJY6XJL.js.map
