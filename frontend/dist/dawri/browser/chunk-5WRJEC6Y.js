import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgIf,
  TitleCasePipe,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.plan;
var _forTrack2 = ($index, $item) => $item.month;
var _forTrack3 = ($index, $item) => $item.id;
var _forTrack4 = ($index, $item) => $item.game;
var _forTrack5 = ($index, $item) => $item.tournament_id;
var _c0 = (a0) => ["/tournaments", a0];
var _c1 = () => [];
function DashboardComponent_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Platform overview");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Your tournament hub");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Your competitive journey");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_a_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275text(1, "Browse Tournaments");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_a_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275text(1, "Manage Plan");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "div", 14);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_12_For_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F465} ");
  }
}
function DashboardComponent_div_12_For_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F3C6} ");
  }
}
function DashboardComponent_div_12_For_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4B0} ");
  }
}
function DashboardComponent_div_12_For_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4CA} ");
  }
}
function DashboardComponent_div_12_For_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F534} ");
  }
}
function DashboardComponent_div_12_For_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2B50 ");
  }
}
function DashboardComponent_div_12_For_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4C8} ");
  }
}
function DashboardComponent_div_12_For_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4B3} ");
  }
}
function DashboardComponent_div_12_For_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2705 ");
  }
}
function DashboardComponent_div_12_For_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F4CC} ");
  }
}
function DashboardComponent_div_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275template(2, DashboardComponent_div_12_For_2_Case_2_Template, 1, 0)(3, DashboardComponent_div_12_For_2_Case_3_Template, 1, 0)(4, DashboardComponent_div_12_For_2_Case_4_Template, 1, 0)(5, DashboardComponent_div_12_For_2_Case_5_Template, 1, 0)(6, DashboardComponent_div_12_For_2_Case_6_Template, 1, 0)(7, DashboardComponent_div_12_For_2_Case_7_Template, 1, 0)(8, DashboardComponent_div_12_For_2_Case_8_Template, 1, 0)(9, DashboardComponent_div_12_For_2_Case_9_Template, 1, 0)(10, DashboardComponent_div_12_For_2_Case_10_Template, 1, 0)(11, DashboardComponent_div_12_For_2_Case_11_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 18)(13, "span", 19);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 20);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const s_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275attribute("data-icon", s_r1.icon);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, (tmp_12_0 = s_r1.icon) === "users" ? 2 : tmp_12_0 === "trophy" ? 3 : tmp_12_0 === "revenue" ? 4 : tmp_12_0 === "activity" ? 5 : tmp_12_0 === "live" ? 6 : tmp_12_0 === "win" ? 7 : tmp_12_0 === "percent" ? 8 : tmp_12_0 === "wallet" ? 9 : tmp_12_0 === "check" ? 10 : 11);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", s_r1.format === "currency" ? \u0275\u0275pipeBind2(15, 4, s_r1.value, "1.0-0") + " SAR" : s_r1.value, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r1.label);
  }
}
function DashboardComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, DashboardComponent_div_12_For_2_Template, 18, 7, "div", 16, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.stats());
  }
}
function DashboardComponent_ng_container_13_div_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32);
    \u0275\u0275element(5, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, entry_r3.plan));
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", entry_r3.pct, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r3.count);
  }
}
function DashboardComponent_ng_container_13_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275repeaterCreate(1, DashboardComponent_ng_container_13_div_5_For_2_Template, 8, 6, "div", 30, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.subEntries());
  }
}
function DashboardComponent_ng_container_13_div_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "div", 37);
    \u0275\u0275elementStart(2, "span", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", ctx_r1.barHeight(m_r4.total), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r4.month.slice(5));
  }
}
function DashboardComponent_ng_container_13_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275repeaterCreate(1, DashboardComponent_ng_container_13_div_9_For_2_Template, 4, 3, "div", 36, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data().revenue_trend);
  }
}
function DashboardComponent_ng_container_13_div_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, t_r5.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r5.game);
    \u0275\u0275advance();
    \u0275\u0275classMap("status--" + t_r5.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r5.status);
  }
}
function DashboardComponent_ng_container_13_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275repeaterCreate(1, DashboardComponent_ng_container_13_div_16_For_2_Template, 7, 8, "div", 40, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data().recent_tournaments);
  }
}
function DashboardComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 21)(2, "div", 22)(3, "h3", 23);
    \u0275\u0275text(4, "Active Subscriptions");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DashboardComponent_ng_container_13_div_5_Template, 3, 0, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22)(7, "h3", 23);
    \u0275\u0275text(8, "Revenue Trend");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, DashboardComponent_ng_container_13_div_9_Template, 3, 0, "div", 25);
    \u0275\u0275elementStart(10, "p", 26);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 27)(14, "h3", 23);
    \u0275\u0275text(15, "Recent Tournaments");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, DashboardComponent_ng_container_13_div_16_Template, 3, 0, "div", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_1_0 = ctx_r1.data()) == null ? null : tmp_1_0.subscriptions_by_plan);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.data()) == null ? null : tmp_2_0.revenue_trend);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind2(12, 4, (tmp_3_0 = ctx_r1.data()) == null ? null : tmp_3_0.total_revenue, "1.0-0"), " SAR");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.data()) == null ? null : tmp_4_0.recent_tournaments);
  }
}
function DashboardComponent_ng_container_14_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "span", 54);
    \u0275\u0275text(2, "Trial ends");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 55);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.data().subscription.trial_ends_at, "mediumDate"));
  }
}
function DashboardComponent_ng_container_14_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "span", 54);
    \u0275\u0275text(2, "Monthly cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 56);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(5, 1, ctx_r1.data().subscription.price, "1.0-0"), " SAR");
  }
}
function DashboardComponent_ng_container_14_div_8_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "span", 54);
    \u0275\u0275text(2, "Next billing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 56);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.data().subscription.period_end, "mediumDate"));
  }
}
function DashboardComponent_ng_container_14_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275template(1, DashboardComponent_ng_container_14_div_8_div_1_Template, 6, 4, "div", 52)(2, DashboardComponent_ng_container_14_div_8_div_2_Template, 6, 4, "div", 52)(3, DashboardComponent_ng_container_14_div_8_div_3_Template, 6, 4, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.data().subscription.on_trial);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.data().subscription.price > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.data().subscription.period_end);
  }
}
function DashboardComponent_ng_container_14_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 58)(2, "span");
    \u0275\u0275text(3, "Tournaments Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 59);
    \u0275\u0275element(7, "div", 60);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.data().usage.tournaments_this_month, " / ", ctx_r1.data().usage.limit === -1 ? "\u221E" : ctx_r1.data().usage.limit, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.usagePct(), "%");
  }
}
function DashboardComponent_ng_container_14_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 43);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, t_r6.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r6.game);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r6.participants_count, "/", t_r6.max_participants, "");
    \u0275\u0275advance();
    \u0275\u0275classMap("status--" + t_r6.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r6.status);
  }
}
function DashboardComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 21)(2, "div", 44)(3, "div", 45)(4, "h3", 23);
    \u0275\u0275text(5, "Your Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 46);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, DashboardComponent_ng_container_14_div_8_Template, 4, 3, "div", 47);
    \u0275\u0275elementStart(9, "a", 48);
    \u0275\u0275text(10, "Manage Plan \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 22)(12, "h3", 23);
    \u0275\u0275text(13, "Usage This Month");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardComponent_ng_container_14_div_14_Template, 8, 4, "div", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 27)(16, "h3", 23);
    \u0275\u0275text(17, "Your Tournaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 39);
    \u0275\u0275repeaterCreate(19, DashboardComponent_ng_container_14_For_20_Template, 9, 10, "div", 40, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "a", 50);
    \u0275\u0275text(22, "View all \u2192");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275classMap("plan--" + ((tmp_1_0 = ctx_r1.data()) == null ? null : tmp_1_0.subscription == null ? null : tmp_1_0.subscription.plan));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r1.data()) == null ? null : tmp_2_0.subscription == null ? null : tmp_2_0.subscription.plan_name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.data()) == null ? null : tmp_3_0.subscription);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.data()) == null ? null : tmp_4_0.usage);
    \u0275\u0275advance(5);
    \u0275\u0275repeater((tmp_5_0 = (tmp_5_0 = ctx_r1.data()) == null ? null : tmp_5_0.recent_tournaments) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : \u0275\u0275pureFunction0(5, _c1));
  }
}
function DashboardComponent_ng_container_15_div_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.gameLabel(r_r7.game));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", r_r7.rank_position, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", r_r7.total_points, " pts");
  }
}
function DashboardComponent_ng_container_15_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275repeaterCreate(1, DashboardComponent_ng_container_15_div_5_For_2_Template, 7, 3, "div", 67, _forTrack4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data().rankings);
  }
}
function DashboardComponent_ng_container_15_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 71);
    \u0275\u0275text(1, "Play tournaments to earn rankings!");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_15_div_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "span", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 75);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r8.bracket == null ? null : m_r8.bracket.tournament == null ? null : m_r8.bracket.tournament.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Round ", m_r8.round_number, "");
  }
}
function DashboardComponent_ng_container_15_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275repeaterCreate(1, DashboardComponent_ng_container_15_div_12_For_2_Template, 5, 2, "div", 73, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data().upcoming_matches);
  }
}
function DashboardComponent_ng_container_15_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 71);
    \u0275\u0275text(1, "No upcoming matches.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_ng_container_15_div_17_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r9 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c0, r_r9.tournament == null ? null : r_r9.tournament.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r9.tournament == null ? null : r_r9.tournament.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r9.tournament == null ? null : r_r9.tournament.game);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r9.wins, "W / ", r_r9.losses, "L");
  }
}
function DashboardComponent_ng_container_15_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275repeaterCreate(1, DashboardComponent_ng_container_15_div_17_For_2_Template, 7, 7, "div", 40, _forTrack5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data().recent_results);
  }
}
function DashboardComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 21)(2, "div", 22)(3, "h3", 23);
    \u0275\u0275text(4, "My Rankings");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DashboardComponent_ng_container_15_div_5_Template, 3, 0, "div", 62)(6, DashboardComponent_ng_container_15_p_6_Template, 2, 0, "p", 63);
    \u0275\u0275elementStart(7, "a", 64);
    \u0275\u0275text(8, "View Leaderboard \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 22)(10, "h3", 23);
    \u0275\u0275text(11, "Upcoming Matches");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, DashboardComponent_ng_container_15_div_12_Template, 3, 0, "div", 65)(13, DashboardComponent_ng_container_15_p_13_Template, 2, 0, "p", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 27)(15, "h3", 23);
    \u0275\u0275text(16, "Recent Activity");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, DashboardComponent_ng_container_15_div_17_Template, 3, 0, "div", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_1_0 = ctx_r1.data()) == null ? null : tmp_1_0.rankings == null ? null : tmp_1_0.rankings.length) > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !((tmp_2_0 = ctx_r1.data()) == null ? null : tmp_2_0.rankings == null ? null : tmp_2_0.rankings.length));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.data()) == null ? null : tmp_3_0.upcoming_matches == null ? null : tmp_3_0.upcoming_matches.length) > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !((tmp_4_0 = ctx_r1.data()) == null ? null : tmp_4_0.upcoming_matches == null ? null : tmp_4_0.upcoming_matches.length));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.data()) == null ? null : tmp_5_0.recent_results == null ? null : tmp_5_0.recent_results.length) > 0);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor() {
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.loading = signal(true);
    this.data = signal(null);
    this.role = computed(() => this.data()?.role ?? this.auth.currentUser()?.role ?? "player");
    this.stats = computed(() => this.data()?.stats ?? []);
    this.greeting = computed(() => {
      const name = this.auth.currentUser()?.name?.split(" ")[0] ?? "";
      const hour = (/* @__PURE__ */ new Date()).getHours();
      const time = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
      return name ? `${time}, ${name}` : time;
    });
    this.subEntries = computed(() => {
      const subs = this.data()?.subscriptions_by_plan;
      if (!subs)
        return [];
      const total = Object.values(subs).reduce((a, b) => a + b, 0);
      return Object.entries(subs).map(([plan, count]) => ({
        plan,
        count,
        pct: total > 0 ? Math.round(count / total * 100) : 0
      }));
    });
  }
  ngOnInit() {
    this.api.getDashboard().subscribe({
      next: (res) => {
        this.data.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  gameLabel(game) {
    const labels = { ea_fc25: "EA FC 25", pubg_mobile: "PUBG Mobile", cod_mobile: "CoD Mobile" };
    return labels[game] ?? game;
  }
  barHeight(value) {
    const trend = this.data()?.revenue_trend ?? [];
    const max = Math.max(...trend.map((m) => m.total), 1);
    return Math.round(value / max * 100);
  }
  usagePct() {
    const usage = this.data()?.usage;
    if (!usage || usage.limit === -1)
      return 0;
    return Math.min(100, Math.round(usage.tournaments_this_month / Math.max(usage.limit, 1) * 100));
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["dw-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 11, consts: [[1, "dash"], [1, "dash-header"], [1, "dash-greeting"], ["class", "dash-sub", 4, "ngIf"], [1, "dash-actions"], ["routerLink", "/tournaments", "class", "btn btn-outline", 4, "ngIf"], ["routerLink", "/subscription", "class", "btn btn-gold", 4, "ngIf"], ["class", "dash-loading", 4, "ngIf"], ["class", "stats-row", 4, "ngIf"], [4, "ngIf"], [1, "dash-sub"], ["routerLink", "/tournaments", 1, "btn", "btn-outline"], ["routerLink", "/subscription", 1, "btn", "btn-gold"], [1, "dash-loading"], [1, "spinner"], [1, "stats-row"], [1, "stat-card"], [1, "stat-card__icon"], [1, "stat-card__data"], [1, "stat-card__value"], [1, "stat-card__label"], [1, "dash-grid"], [1, "dash-panel"], [1, "panel-title"], ["class", "sub-breakdown", 4, "ngIf"], ["class", "chart-bars", 4, "ngIf"], [1, "panel-total"], [1, "dash-panel", "dash-panel--wide"], ["class", "activity-list", 4, "ngIf"], [1, "sub-breakdown"], [1, "sub-row"], [1, "sub-plan"], [1, "sub-bar-wrap"], [1, "sub-bar"], [1, "sub-count"], [1, "chart-bars"], [1, "chart-bar-group"], [1, "chart-bar"], [1, "chart-label"], [1, "activity-list"], [1, "activity-row", 3, "routerLink"], [1, "activity-name"], [1, "activity-game", "game-badge"], [1, "activity-status", "status-badge"], [1, "dash-panel", "plan-panel"], [1, "plan-header"], [1, "plan-badge"], ["class", "plan-details", 4, "ngIf"], ["routerLink", "/subscription", 1, "btn", "btn-outline", "btn-sm", "mt-1"], ["class", "usage-meter", 4, "ngIf"], ["routerLink", "/tournaments", 1, "panel-link"], [1, "plan-details"], ["class", "plan-detail", 4, "ngIf"], [1, "plan-detail"], [1, "detail-label"], [1, "detail-value", "detail-value--warn"], [1, "detail-value"], [1, "usage-meter"], [1, "usage-label"], [1, "usage-bar-wrap"], [1, "usage-bar"], [1, "activity-meta"], ["class", "rankings-list", 4, "ngIf"], ["class", "empty-msg", 4, "ngIf"], ["routerLink", "/leaderboard", 1, "panel-link"], ["class", "match-list", 4, "ngIf"], [1, "rankings-list"], [1, "rank-row"], [1, "rank-game"], [1, "rank-pos"], [1, "rank-pts"], [1, "empty-msg"], [1, "match-list"], [1, "match-row-mini"], [1, "match-tourney-name"], [1, "match-vs"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, DashboardComponent_p_5_Template, 2, 0, "p", 3)(6, DashboardComponent_p_6_Template, 2, 0, "p", 3)(7, DashboardComponent_p_7_Template, 2, 0, "p", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 4);
        \u0275\u0275template(9, DashboardComponent_a_9_Template, 2, 0, "a", 5)(10, DashboardComponent_a_10_Template, 2, 0, "a", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(11, DashboardComponent_div_11_Template, 2, 0, "div", 7)(12, DashboardComponent_div_12_Template, 3, 0, "div", 8)(13, DashboardComponent_ng_container_13_Template, 17, 7, "ng-container", 9)(14, DashboardComponent_ng_container_14_Template, 23, 6, "ng-container", 9)(15, DashboardComponent_ng_container_15_Template, 18, 5, "ng-container", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.greeting());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "admin");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "organizer");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "player");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.role() === "player");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "organizer");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && ctx.stats().length);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "admin" && !ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "organizer" && !ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.role() === "player" && !ctx.loading());
      }
    }, dependencies: [CommonModule, NgIf, DecimalPipe, TitleCasePipe, DatePipe, RouterModule, RouterLink], styles: ['\n\n.dash[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 2rem 1rem;\n}\n.dash-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 2rem;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.dash-greeting[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 2rem;\n  color: #fff;\n  margin: 0;\n  letter-spacing: 1px;\n}\n.dash-sub[_ngcontent-%COMP%] {\n  color: #8892a4;\n  margin: 0.2rem 0 0;\n  font-size: 0.9rem;\n}\n.dash-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.btn[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 700;\n  font-size: 0.82rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  padding: 0.5rem 1.2rem;\n  border-radius: 6px;\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  transition: all 0.15s;\n  display: inline-flex;\n  align-items: center;\n}\n.btn-gold[_ngcontent-%COMP%] {\n  background: var(--gold, #a855f7);\n  color: #060810;\n}\n.btn-gold[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  border: 1px solid #1e2a3a;\n  color: #8892a4;\n  background: transparent;\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  border-color: var(--gold, #a855f7);\n  color: var(--gold, #a855f7);\n}\n.btn-sm[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.4rem 0.8rem;\n}\n.mt-1[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 0.75rem;\n  margin-bottom: 2rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: #0a0e18;\n  border: 1px solid #1e2a3a;\n  border-radius: 10px;\n  transition: border-color 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  border-color: #2a3a4a;\n}\n.stat-card__icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(168, 85, 247, 0.08);\n  border-radius: 10px;\n}\n.stat-card__value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #fff;\n  font-family: "Bebas Neue", sans-serif;\n  letter-spacing: 0.5px;\n}\n.stat-card__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #8892a4;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.dash-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 1rem;\n}\n.dash-panel[_ngcontent-%COMP%] {\n  background: #0a0e18;\n  border: 1px solid #1e2a3a;\n  border-radius: 10px;\n  padding: 1.25rem;\n}\n.dash-panel--wide[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.1rem;\n  color: var(--gold, #a855f7);\n  margin: 0 0 1rem;\n  letter-spacing: 0.5px;\n}\n.panel-total[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #8892a4;\n  margin-top: 0.75rem;\n  text-align: right;\n}\n.panel-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 0.75rem;\n  font-size: 0.8rem;\n  color: var(--cyan, #fbbf24);\n  text-decoration: none;\n}\n.panel-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.sub-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.sub-plan[_ngcontent-%COMP%] {\n  width: 90px;\n  font-size: 0.85rem;\n  color: #c8cfd8;\n}\n.sub-bar-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: #111827;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.sub-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--gold, #a855f7),\n      var(--cyan, #fbbf24));\n  border-radius: 4px;\n  transition: width 0.6s ease;\n}\n.sub-count[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--gold, #a855f7);\n  font-weight: 600;\n  min-width: 30px;\n  text-align: right;\n}\n.chart-bars[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.5rem;\n  height: 120px;\n  padding-top: 0.5rem;\n}\n.chart-bar-group[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  justify-content: flex-end;\n}\n.chart-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      180deg,\n      var(--gold, #a855f7),\n      rgba(168, 85, 247, 0.3));\n  border-radius: 4px 4px 0 0;\n  min-height: 4px;\n  transition: height 0.6s ease;\n}\n.chart-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #8892a4;\n  margin-top: 0.4rem;\n}\n.plan-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.plan-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  padding: 0.25rem 0.75rem;\n  border-radius: 20px;\n}\n.plan--free[_ngcontent-%COMP%] {\n  background: #111827;\n  color: #8892a4;\n}\n.plan--starter[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.1);\n  color: var(--cyan, #fbbf24);\n}\n.plan--professional[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.15);\n  color: var(--gold, #a855f7);\n}\n.plan--enterprise[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.15);\n  color: #a855f7;\n}\n.plan-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.plan-detail[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.85rem;\n}\n.detail-label[_ngcontent-%COMP%] {\n  color: #8892a4;\n}\n.detail-value[_ngcontent-%COMP%] {\n  color: #fff;\n  font-weight: 500;\n}\n.detail-value--warn[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.usage-meter[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.usage-label[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.85rem;\n  color: #c8cfd8;\n  margin-bottom: 0.5rem;\n}\n.usage-bar-wrap[_ngcontent-%COMP%] {\n  height: 10px;\n  background: #111827;\n  border-radius: 5px;\n  overflow: hidden;\n}\n.usage-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--cyan, #fbbf24);\n  border-radius: 5px;\n  transition: width 0.5s ease;\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.activity-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  background: #060810;\n  border: 1px solid #111827;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.activity-row[_ngcontent-%COMP%]:hover {\n  background: #111827;\n}\n.activity-name[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #fff;\n  font-size: 0.9rem;\n}\n.activity-meta[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #8892a4;\n}\n.game-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  color: var(--cyan, #fbbf24);\n  letter-spacing: 0.04em;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 0.15rem 0.5rem;\n  border-radius: 4px;\n  letter-spacing: 0.04em;\n}\n.status--registration_open[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.1);\n  color: var(--cyan, #fbbf24);\n}\n.status--in_progress[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.1);\n  color: var(--gold, #a855f7);\n}\n.status--completed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.status--cancelled[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.rank-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #111827;\n}\n.rank-row[_ngcontent-%COMP%]:last-child {\n  border: none;\n}\n.rank-game[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.85rem;\n  color: var(--cyan, #fbbf24);\n  text-transform: uppercase;\n}\n.rank-pos[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--gold, #a855f7);\n}\n.rank-pts[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #8892a4;\n}\n.match-row-mini[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #111827;\n  font-size: 0.85rem;\n}\n.match-tourney-name[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.match-vs[_ngcontent-%COMP%] {\n  color: #8892a4;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  color: #8892a4;\n  font-size: 0.85rem;\n  font-style: italic;\n}\n.dash-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 4rem;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid #1e2a3a;\n  border-top-color: var(--cyan, #fbbf24);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 640px) {\n  .stats-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .dash-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\pages\\dashboard\\dashboard.component.ts", lineNumber: 322 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-5WRJEC6Y.js.map
