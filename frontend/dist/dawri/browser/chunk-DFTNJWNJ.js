import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DecimalPipe,
  UpperCasePipe,
  catchError,
  inject,
  of,
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
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
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

// src/app/pages/subscription/subscription.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function SubscriptionComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("toast-ok", ctx_r0.toast().ok)("toast-err", !ctx_r0.toast().ok);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.toast().msg, " ");
  }
}
function SubscriptionComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "div", 10);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading\u2026");
    \u0275\u0275elementEnd()();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" \xB7 Renews ", ctx_r0.formatDate(ctx_r0.currentSub().current_period_end), " ");
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.showCancel.set(true));
    });
    \u0275\u0275text(1, "Cancel subscription");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 16)(2, "span", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 18);
    \u0275\u0275text(6, "CURRENT PLAN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 20);
    \u0275\u0275text(10);
    \u0275\u0275template(11, SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 21)(13, "span", 22);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Conditional_16_Template, 2, 0, "button", 23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getMeta(ctx_r0.currentSub().plan).icon);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.currentSub().plan.toUpperCase());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Status: ", ctx_r0.currentSub().status, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r0.currentSub().current_period_end ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.currentSub().status === "active");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 8, ctx_r0.currentSub().status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(16, ctx_r0.currentSub().plan !== "free" ? 16 : -1);
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1, "MOST POPULAR");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1, "CURRENT PLAN");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "Free");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "Custom");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6, "/mo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, plan_r3.price_monthly));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r3.currency);
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 39);
    \u0275\u0275text(2, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feat_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", feat_r4, "");
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275text(1, "Current Plan");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.contactSales());
    });
    \u0275\u0275text(1, "Contact Sales");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Activate Free ");
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const plan_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate2(" Upgrade \xB7 ", \u0275\u0275pipeBind1(1, 2, plan_r3.price_monthly), " ", plan_r3.currency, "/mo ");
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const plan_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openPayment(plan_r3));
    });
    \u0275\u0275template(1, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Conditional_1_Template, 1, 0)(2, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Conditional_2_Template, 2, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(1, plan_r3.price_monthly === 0 ? 1 : 2);
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275template(1, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_1_Template, 2, 0, "div", 26)(2, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_2_Template, 2, 0, "div", 27);
    \u0275\u0275elementStart(3, "div", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 30);
    \u0275\u0275template(8, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_8_Template, 2, 0, "span", 31)(9, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_9_Template, 2, 0)(10, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_10_Template, 7, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ul", 32);
    \u0275\u0275repeaterCreate(12, SubscriptionComponent_Conditional_14_Conditional_0_For_3_For_13_Template, 4, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 33);
    \u0275\u0275template(15, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_15_Template, 2, 0, "button", 34)(16, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_16_Template, 2, 0)(17, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Conditional_17_Template, 3, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const plan_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--plan-color", ctx_r0.getMeta(plan_r3.key).color);
    \u0275\u0275classProp("highlight", ctx_r0.getMeta(plan_r3.key).highlight)("current", ctx_r0.isCurrentPlan(plan_r3.key));
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.getMeta(plan_r3.key).highlight ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ctx_r0.isCurrentPlan(plan_r3.key) ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getMeta(plan_r3.key).icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, plan_r3.price_monthly === 0 ? 8 : plan_r3.key === "enterprise" ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(plan_r3.features);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(15, ctx_r0.isCurrentPlan(plan_r3.key) ? 15 : plan_r3.key === "enterprise" ? 16 : 17);
  }
}
function SubscriptionComponent_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SubscriptionComponent_Conditional_14_Conditional_0_Conditional_0_Template, 17, 10, "div", 12);
    \u0275\u0275elementStart(1, "div", 13);
    \u0275\u0275repeaterCreate(2, SubscriptionComponent_Conditional_14_Conditional_0_For_3_Template, 18, 12, "div", 14, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15);
    \u0275\u0275text(5, "All plans include SSL, 99.9% uptime SLA, and full Arabic RTL support.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, ctx_r0.currentSub() ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.plans());
  }
}
function SubscriptionComponent_Conditional_14_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42);
    \u0275\u0275text(2, "\u{1F9FE}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43);
    \u0275\u0275text(4, "No invoices yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 44);
    \u0275\u0275text(6, "Billing history appears here once you upgrade to a paid plan.");
    \u0275\u0275elementEnd()();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_For_13_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 47);
    \u0275\u0275text(1, "Download PDF");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const inv_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("href", inv_r7.invoice_url + "?token=" + ctx_r0.getToken(), \u0275\u0275sanitizeUrl);
  }
}
function SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_For_13_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 46);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "uppercase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275template(11, SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_For_13_Conditional_11_Template, 2, 1, "a", 47)(12, SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_For_13_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const inv_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(inv_r7.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(5, 7, inv_r7.amount), " ", inv_r7.currency, "");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("paid", inv_r7.status === "paid");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, inv_r7.status));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(11, inv_r7.invoice_url ? 11 : 12);
  }
}
function SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 45)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Amount");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "PDF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_For_13_Template, 13, 11, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r0.invoices());
  }
}
function SubscriptionComponent_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, SubscriptionComponent_Conditional_14_Conditional_1_Conditional_1_Template, 7, 0, "div", 41)(2, SubscriptionComponent_Conditional_14_Conditional_1_Conditional_2_Template, 14, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.invoices().length === 0 ? 1 : 2);
  }
}
function SubscriptionComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SubscriptionComponent_Conditional_14_Conditional_0_Template, 6, 1)(1, SubscriptionComponent_Conditional_14_Conditional_1_Template, 3, 1, "div", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r0.activeTab() === "plans" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.activeTab() === "invoices" ? 1 : -1);
  }
}
function SubscriptionComponent_Conditional_15_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, "VISA");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_15_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1, "\u25C9\u25C9");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_15_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 89);
    \u0275\u0275text(1, "\u{1F4B3}");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_Conditional_15_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.paymentError());
  }
}
function SubscriptionComponent_Conditional_15_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 90);
    \u0275\u0275text(1, " Processing\u2026 ");
  }
}
function SubscriptionComponent_Conditional_15_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate2(" Pay ", \u0275\u0275pipeBind1(1, 2, ctx_r0.selectedPlan().price_monthly), " ", ctx_r0.selectedPlan().currency, " ");
  }
}
function SubscriptionComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closePayment());
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_15_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "button", 51);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_15_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closePayment());
    });
    \u0275\u0275text(3, "\u2715");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 52)(5, "div", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "div", 54);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 55);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementStart(13, "span", 56);
    \u0275\u0275text(14, "/ month");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275element(15, "div", 57);
    \u0275\u0275elementStart(16, "div", 58)(17, "div", 59);
    \u0275\u0275text(18, "CARD INFORMATION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 60)(20, "div", 61)(21, "div", 62);
    \u0275\u0275text(22, "\u2B1B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 63);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 64)(26, "div")(27, "div", 65);
    \u0275\u0275text(28, "CARD HOLDER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 66);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div")(32, "div", 65);
    \u0275\u0275text(33, "EXPIRES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 66);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 67);
    \u0275\u0275template(37, SubscriptionComponent_Conditional_15_Conditional_37_Template, 2, 0, "span", 68)(38, SubscriptionComponent_Conditional_15_Conditional_38_Template, 2, 0)(39, SubscriptionComponent_Conditional_15_Conditional_39_Template, 2, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 69);
    \u0275\u0275element(41, "div", 70);
    \u0275\u0275elementStart(42, "div", 71)(43, "div", 72);
    \u0275\u0275text(44, "CVV");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 73);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 74)(48, "label", 75);
    \u0275\u0275text(49, "Card Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 76);
    \u0275\u0275listener("input", function SubscriptionComponent_Conditional_15_Template_input_input_50_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCardNumber($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 74)(52, "label", 75);
    \u0275\u0275text(53, "Cardholder Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function SubscriptionComponent_Conditional_15_Template_input_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.cardName, $event) || (ctx_r0.cardName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 78)(56, "div", 74)(57, "label", 75);
    \u0275\u0275text(58, "Expiry Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "input", 79);
    \u0275\u0275listener("input", function SubscriptionComponent_Conditional_15_Template_input_input_59_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onExpiry($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 74)(61, "label", 75);
    \u0275\u0275text(62, "CVV");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function SubscriptionComponent_Conditional_15_Template_input_ngModelChange_63_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.cardCvv, $event) || (ctx_r0.cardCvv = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("focus", function SubscriptionComponent_Conditional_15_Template_input_focus_63_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showCvv = true);
    })("blur", function SubscriptionComponent_Conditional_15_Template_input_blur_63_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showCvv = false);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 81);
    \u0275\u0275text(65, " \u{1F512} Secured by 256-bit SSL encryption. Card details are not stored. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(66, SubscriptionComponent_Conditional_15_Conditional_66_Template, 2, 1, "div", 82);
    \u0275\u0275elementStart(67, "button", 83);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_15_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.processPayment());
    });
    \u0275\u0275template(68, SubscriptionComponent_Conditional_15_Conditional_68_Template, 2, 0)(69, SubscriptionComponent_Conditional_15_Conditional_69_Template, 2, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 84)(71, "span");
    \u0275\u0275text(72, "Accepted:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 85);
    \u0275\u0275text(74, "VISA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span", 86);
    \u0275\u0275text(76, "Mastercard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "span", 87);
    \u0275\u0275text(78, "mada");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.getMeta(ctx_r0.selectedPlan().key).icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedPlan().name, " Plan");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(12, 18, ctx_r0.selectedPlan().price_monthly), " ", ctx_r0.selectedPlan().currency, " ");
    \u0275\u0275advance(8);
    \u0275\u0275classProp("flipped", ctx_r0.showCvv);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.cardDisplay(), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.cardName || "YOUR NAME");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.cardExpiry || "MM/YY");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(37, ctx_r0.cardBrand() === "visa" ? 37 : ctx_r0.cardBrand() === "mc" ? 38 : 39);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.cardCvv || "\u2022\u2022\u2022");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r0.cardNumber);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cardName);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r0.cardExpiry);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cardCvv);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(66, ctx_r0.paymentError() ? 66 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.paying());
    \u0275\u0275advance();
    \u0275\u0275conditional(68, ctx_r0.paying() ? 68 : 69);
  }
}
function SubscriptionComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 91)(2, "div", 92);
    \u0275\u0275text(3, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 93);
    \u0275\u0275text(5, "Payment Successful!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 94);
    \u0275\u0275text(7, " Welcome to ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, "! Your subscription is now active. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 95);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_16_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSuccess());
    });
    \u0275\u0275text(12, "Continue");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.activatedPlan());
  }
}
function SubscriptionComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showCancel.set(false));
    });
    \u0275\u0275elementStart(1, "div", 96);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_17_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 97);
    \u0275\u0275text(3, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 98);
    \u0275\u0275text(5, "Cancel Subscription?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 99);
    \u0275\u0275text(7, "Your plan stays active until the end of the billing period.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 100)(9, "button", 101);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_17_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showCancel.set(false));
    });
    \u0275\u0275text(10, "Keep Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 102);
    \u0275\u0275listener("click", function SubscriptionComponent_Conditional_17_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelSub());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r0.cancelling());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.cancelling() ? "Cancelling\u2026" : "Yes, Cancel", " ");
  }
}
var SubscriptionComponent = class _SubscriptionComponent {
  constructor() {
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.plans = signal([]);
    this.currentSub = signal(null);
    this.invoices = signal([]);
    this.loading = signal(true);
    this.cancelling = signal(false);
    this.toast = signal(null);
    this.showCancel = signal(false);
    this.activeTab = signal("plans");
    this.showPayment = signal(false);
    this.selectedPlan = signal(null);
    this.paying = signal(false);
    this.paymentError = signal(null);
    this.showSuccess = signal(false);
    this.activatedPlan = signal("");
    this.cardNumber = "";
    this.cardName = "";
    this.cardExpiry = "";
    this.cardCvv = "";
    this.showCvv = false;
    this.planMeta = {
      free: { color: "#6b7280", icon: "\u{1F3AE}", highlight: false },
      starter: { color: "#fbbf24", icon: "\u{1F680}", highlight: false },
      professional: { color: "#a855f7", icon: "\u26A1", highlight: true },
      enterprise: { color: "#a855f7", icon: "\u{1F3C6}", highlight: false }
    };
  }
  getMeta(key) {
    return this.planMeta[key] ?? this.planMeta["free"];
  }
  isCurrentPlan(key) {
    return (this.currentSub()?.plan ?? "free") === key;
  }
  cardDisplay() {
    const n = this.cardNumber.replace(/\s/g, "");
    const padded = n.padEnd(16, "\u2022");
    return padded.match(/.{1,4}/g)?.join(" ") ?? "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022";
  }
  cardBrand() {
    const n = this.cardNumber.replace(/\s/g, "");
    if (n.startsWith("4"))
      return "visa";
    if (n.startsWith("5") || n.startsWith("2"))
      return "mc";
    return "generic";
  }
  onCardNumber(e) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    this.cardNumber = raw.match(/.{1,4}/g)?.join(" ") ?? raw;
    e.target.value = this.cardNumber;
  }
  onExpiry(e) {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2)
      val = val.slice(0, 2) + "/" + val.slice(2);
    this.cardExpiry = val;
    e.target.value = val;
  }
  ngOnInit() {
    this.loadAll();
  }
  loadAll() {
    this.loading.set(true);
    this.api.getSubscription().pipe(catchError(() => of({ data: null }))).subscribe((r) => {
      this.currentSub.set(r.data);
    });
    this.api.getSubscriptionPlans().pipe(catchError(() => of({ data: [] }))).subscribe((r) => {
      this.plans.set(r.data ?? []);
      this.loading.set(false);
    });
    this.api.getInvoices().pipe(catchError(() => of({ data: [], meta: null, links: null }))).subscribe((r) => {
      this.invoices.set(r.data ?? []);
    });
  }
  openPayment(plan) {
    this.selectedPlan.set(plan);
    this.paymentError.set(null);
    this.cardNumber = "";
    this.cardName = "";
    this.cardExpiry = "";
    this.cardCvv = "";
    this.showPayment.set(true);
  }
  closePayment() {
    this.showPayment.set(false);
    this.selectedPlan.set(null);
  }
  processPayment() {
    const plan = this.selectedPlan();
    if (!plan)
      return;
    const rawNum = this.cardNumber.replace(/\s/g, "");
    if (rawNum.length < 13) {
      this.paymentError.set("Please enter a valid card number.");
      return;
    }
    if (!this.cardName.trim()) {
      this.paymentError.set("Please enter the cardholder name.");
      return;
    }
    if (this.cardExpiry.length < 5) {
      this.paymentError.set("Please enter a valid expiry date.");
      return;
    }
    if (this.cardCvv.length < 3) {
      this.paymentError.set("Please enter a valid CVV.");
      return;
    }
    this.paymentError.set(null);
    this.paying.set(true);
    setTimeout(() => {
      this.api.subscribeToPlan(plan.key).pipe(catchError((err) => {
        this.paymentError.set(err?.error?.message ?? "Payment failed. Please try again.");
        this.paying.set(false);
        return of(null);
      })).subscribe((res) => {
        this.paying.set(false);
        if (res) {
          this.closePayment();
          this.activatedPlan.set(plan.name);
          this.showSuccess.set(true);
          this.loadAll();
        }
      });
    }, 2e3);
  }
  closeSuccess() {
    this.showSuccess.set(false);
  }
  cancelSub() {
    this.cancelling.set(true);
    this.api.cancelSubscription().pipe(catchError((err) => {
      this.notify(err?.error?.message ?? "Could not cancel.", false);
      this.cancelling.set(false);
      return of(null);
    })).subscribe((res) => {
      if (res) {
        this.currentSub.set(null);
        this.notify("Subscription cancelled.", true);
        this.showCancel.set(false);
      }
      this.cancelling.set(false);
    });
  }
  contactSales() {
    window.open("mailto:sales@dawri.gg?subject=Enterprise Plan Inquiry", "_blank");
  }
  getToken() {
    return localStorage.getItem("dawri_token") ?? "";
  }
  formatDate(iso) {
    if (!iso)
      return "\u2014";
    return new Date(iso).toLocaleDateString("en-SA", { year: "numeric", month: "short", day: "numeric" });
  }
  notify(msg, ok) {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3500);
  }
  static {
    this.\u0275fac = function SubscriptionComponent_Factory(t) {
      return new (t || _SubscriptionComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubscriptionComponent, selectors: [["app-subscription"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 9, consts: [[1, "sub-page"], [1, "toast", 3, "toast-ok", "toast-err"], [1, "page-header"], [1, "page-title"], [1, "page-sub"], [1, "header-tabs"], [1, "tab-btn", 3, "click"], [1, "loading-state"], [1, "modal-overlay"], [1, "toast"], [1, "spinner"], [1, "invoices-section"], [1, "current-banner"], [1, "plans-grid"], [1, "plan-card", 3, "highlight", "current", "--plan-color"], [1, "compare-note"], [1, "current-banner-left"], [1, "current-icon"], [1, "current-label"], [1, "current-name"], [1, "current-meta"], [1, "current-banner-right"], [1, "status-badge"], [1, "cancel-link"], [1, "cancel-link", 3, "click"], [1, "plan-card"], [1, "popular-badge"], [1, "current-badge"], [1, "plan-icon"], [1, "plan-name"], [1, "plan-price"], [1, "price-free"], [1, "feature-list"], [1, "plan-cta"], ["disabled", "", 1, "btn-current"], [1, "price-custom"], [1, "price-amount"], [1, "price-currency"], [1, "price-period"], [1, "feat-check"], [1, "btn-upgrade", 3, "click"], [1, "empty-state"], [1, "empty-icon"], [1, "empty-title"], [1, "empty-sub"], [1, "invoice-table"], [1, "inv-status"], ["target", "_blank", 1, "pdf-link", 3, "href"], [1, "no-pdf"], [1, "modal-overlay", 3, "click"], [1, "payment-modal", 3, "click"], [1, "modal-close", 3, "click"], [1, "order-summary"], [1, "order-icon"], [1, "order-plan"], [1, "order-amount"], [1, "order-period"], [1, "divider"], [1, "payment-form"], [1, "form-label"], [1, "card-preview"], [1, "card-front"], [1, "card-chip"], [1, "card-number-preview"], [1, "card-bottom"], [1, "card-field-label"], [1, "card-field-val"], [1, "card-logo"], [1, "brand-visa"], [1, "card-back"], [1, "card-strip"], [1, "card-cvv-row"], [1, "card-cvv-label"], [1, "card-cvv-box"], [1, "field-group"], [1, "field-label"], ["type", "text", "inputmode", "numeric", "maxlength", "19", "placeholder", "1234 5678 9012 3456", 1, "field-input", 3, "input", "value"], ["type", "text", "placeholder", "Name on card", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "field-row"], ["type", "text", "inputmode", "numeric", "maxlength", "5", "placeholder", "MM/YY", 1, "field-input", 3, "input", "value"], ["type", "password", "inputmode", "numeric", "maxlength", "4", "placeholder", "\u2022\u2022\u2022", 1, "field-input", 3, "ngModelChange", "focus", "blur", "ngModel"], [1, "secure-note"], [1, "payment-error"], [1, "btn-pay", 3, "click", "disabled"], [1, "accepted-cards"], [1, "acc-visa"], [1, "acc-mc"], [1, "acc-mada"], [1, "brand-mc"], [1, "brand-generic"], [1, "btn-spinner"], [1, "success-modal"], [1, "success-anim"], [1, "success-title"], [1, "success-body"], [1, "btn-pay", 3, "click"], [1, "modal-box", 3, "click"], [1, "modal-icon"], [1, "modal-title"], [1, "modal-body"], [1, "modal-actions"], [1, "btn-secondary", 3, "click"], [1, "btn-danger", 3, "click", "disabled"]], template: function SubscriptionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, SubscriptionComponent_Conditional_1_Template, 2, 5, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div")(4, "h1", 3);
        \u0275\u0275text(5, "SUBSCRIPTION & BILLING");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Manage your plan, upgrades, and payment history");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
        \u0275\u0275listener("click", function SubscriptionComponent_Template_button_click_9_listener() {
          return ctx.activeTab.set("plans");
        });
        \u0275\u0275text(10, "Plans");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 6);
        \u0275\u0275listener("click", function SubscriptionComponent_Template_button_click_11_listener() {
          return ctx.activeTab.set("invoices");
        });
        \u0275\u0275text(12, "Invoices");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(13, SubscriptionComponent_Conditional_13_Template, 4, 0, "div", 7)(14, SubscriptionComponent_Conditional_14_Template, 2, 2)(15, SubscriptionComponent_Conditional_15_Template, 79, 20, "div", 8)(16, SubscriptionComponent_Conditional_16_Template, 13, 1, "div", 8)(17, SubscriptionComponent_Conditional_17_Template, 13, 2, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.toast() ? 1 : -1);
        \u0275\u0275advance(8);
        \u0275\u0275classProp("active", ctx.activeTab() === "plans");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.activeTab() === "invoices");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(13, ctx.loading() ? 13 : 14);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(15, ctx.showPayment() && ctx.selectedPlan() ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(16, ctx.showSuccess() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(17, ctx.showCancel() ? 17 : -1);
      }
    }, dependencies: [CommonModule, UpperCasePipe, DecimalPipe, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.sub-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #0b1022;\n  padding: 2rem 2rem 4rem;\n  max-width: 1300px;\n  margin: 0 auto;\n  position: relative;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 80px;\n  right: 24px;\n  padding: 12px 20px;\n  border-radius: 8px;\n  font-family: "Rajdhani", sans-serif;\n  font-size: .95rem;\n  font-weight: 600;\n  z-index: 9999;\n  animation: _ngcontent-%COMP%_slideIn .25s ease;\n}\n.toast-ok[_ngcontent-%COMP%] {\n  background: #065f46;\n  color: #6ee7b7;\n  border: 1px solid #10b981;\n}\n.toast-err[_ngcontent-%COMP%] {\n  background: #7f1d1d;\n  color: #fca5a5;\n  border: 1px solid #ef4444;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 2.4rem;\n  color: #a855f7;\n  letter-spacing: 2px;\n  margin: 0 0 4px;\n}\n.page-sub[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  color: #6b7280;\n  font-size: .95rem;\n  margin: 0;\n}\n.header-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  background: #111827;\n  border-radius: 10px;\n  padding: 4px;\n  border: 1px solid #1f2937;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 600;\n  font-size: .9rem;\n  padding: 8px 20px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all .2s;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: #1e2a40;\n  color: #a855f7;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 60px 0;\n  justify-content: center;\n  color: #6b7280;\n  font-family: "Rajdhani", sans-serif;\n}\n.spinner[_ngcontent-%COMP%], .btn-spinner[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .8s linear infinite;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid #1f2937;\n  border-top-color: #a855f7;\n}\n.btn-spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  border: 2px solid currentColor;\n  border-top-color: transparent;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.current-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #111827,\n      #1a2235);\n  border: 1px solid #1f2937;\n  border-left: 4px solid #a855f7;\n  border-radius: 12px;\n  padding: 1.25rem 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.current-banner-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.current-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.current-label[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: .75rem;\n  letter-spacing: 2px;\n  color: #a855f7;\n}\n.current-name[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.6rem;\n  color: #fff;\n  letter-spacing: 1px;\n  line-height: 1.1;\n}\n.current-meta[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .85rem;\n  color: #6b7280;\n  margin-top: 2px;\n}\n.current-banner-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .75rem;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 20px;\n  background: #1f2937;\n  color: #6b7280;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, .15);\n  color: #10b981;\n}\n.cancel-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #ef4444;\n  font-family: "Rajdhani", sans-serif;\n  font-size: .82rem;\n  cursor: pointer;\n  text-decoration: underline;\n  opacity: .7;\n}\n.cancel-link[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.plans-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.plan-card[_ngcontent-%COMP%] {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 16px;\n  padding: 1.75rem 1.5rem;\n  position: relative;\n  transition:\n    transform .2s,\n    border-color .2s,\n    box-shadow .2s;\n  display: flex;\n  flex-direction: column;\n  gap: .75rem;\n}\n.plan-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  border-color: var(--plan-color,#1f2937);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, .4);\n}\n.plan-card.highlight[_ngcontent-%COMP%] {\n  border-color: #a855f7;\n  background:\n    linear-gradient(\n      160deg,\n      #1a2235,\n      #111827);\n  box-shadow: 0 0 30px rgba(168, 85, 247, .1);\n}\n.plan-card.current[_ngcontent-%COMP%] {\n  border-color: var(--plan-color,#a855f7);\n  background:\n    linear-gradient(\n      160deg,\n      #1a2235,\n      #0f1623);\n}\n.popular-badge[_ngcontent-%COMP%], .current-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-family: "Bebas Neue", sans-serif;\n  font-size: .72rem;\n  letter-spacing: 1.5px;\n  padding: 3px 14px;\n  border-radius: 20px;\n  white-space: nowrap;\n}\n.popular-badge[_ngcontent-%COMP%] {\n  background: #a855f7;\n  color: #0b1022;\n}\n.current-badge[_ngcontent-%COMP%] {\n  background: var(--plan-color,#fbbf24);\n  color: #0b1022;\n}\n.plan-icon[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n}\n.plan-name[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.6rem;\n  color: #fff;\n  letter-spacing: 1px;\n  line-height: 1;\n}\n.plan-price[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n  margin: .25rem 0;\n}\n.price-free[_ngcontent-%COMP%], .price-custom[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 2rem;\n  color: var(--plan-color,#6b7280);\n}\n.price-amount[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 2.4rem;\n  color: var(--plan-color,#a855f7);\n  line-height: 1;\n}\n.price-currency[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .9rem;\n  color: #9ca3af;\n  font-weight: 600;\n}\n.price-period[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .85rem;\n  color: #6b7280;\n}\n.feature-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  flex: 1;\n  border-top: 1px solid #1f2937;\n  padding-top: .75rem;\n}\n.feature-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .88rem;\n  color: #d1d5db;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n}\n.feat-check[_ngcontent-%COMP%] {\n  color: var(--plan-color,#10b981);\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.plan-cta[_ngcontent-%COMP%] {\n  margin-top: .5rem;\n}\n.btn-upgrade[_ngcontent-%COMP%], .btn-current[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1rem;\n  letter-spacing: 1px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all .2s;\n}\n.btn-upgrade[_ngcontent-%COMP%] {\n  border: 2px solid var(--plan-color,#a855f7);\n  background: transparent;\n  color: var(--plan-color,#a855f7);\n}\n.btn-upgrade[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--plan-color,#a855f7);\n  color: #0b1022;\n}\n.btn-upgrade[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.btn-current[_ngcontent-%COMP%] {\n  border: 2px solid #1f2937;\n  background: #1f2937;\n  color: #6b7280;\n  cursor: not-allowed;\n}\n.compare-note[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .88rem;\n  color: #6b7280;\n  text-align: center;\n  padding: 1rem;\n}\n.invoices-section[_ngcontent-%COMP%] {\n  margin-top: .5rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: .4;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.4rem;\n  color: #6b7280;\n  letter-spacing: 1px;\n}\n.empty-sub[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  color: #4b5563;\n  font-size: .9rem;\n  max-width: 400px;\n}\n.invoice-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-family: "Rajdhani", sans-serif;\n}\n.invoice-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 12px 16px;\n  font-size: .75rem;\n  letter-spacing: 1.5px;\n  color: #6b7280;\n  border-bottom: 1px solid #1f2937;\n  font-weight: 700;\n}\n.invoice-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: .92rem;\n  color: #d1d5db;\n  border-bottom: 1px solid #111827;\n}\n.invoice-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #111827;\n}\n.inv-status[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: .72rem;\n  font-weight: 700;\n  background: #1f2937;\n  color: #6b7280;\n}\n.inv-status.paid[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, .15);\n  color: #10b981;\n}\n.pdf-link[_ngcontent-%COMP%] {\n  color: #fbbf24;\n  text-decoration: none;\n  font-size: .85rem;\n}\n.no-pdf[_ngcontent-%COMP%] {\n  color: #4b5563;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .8);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n.payment-modal[_ngcontent-%COMP%] {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 20px;\n  padding: 2rem;\n  width: 100%;\n  max-width: 480px;\n  max-height: 90vh;\n  overflow-y: auto;\n  position: relative;\n}\n.modal-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  background: #1f2937;\n  border: none;\n  color: #9ca3af;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  cursor: pointer;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: #374151;\n  color: #fff;\n}\n.order-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.order-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n.order-plan[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.4rem;\n  color: #fff;\n  letter-spacing: 1px;\n}\n.order-amount[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.8rem;\n  color: #a855f7;\n}\n.order-period[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .85rem;\n  color: #6b7280;\n}\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #1f2937;\n  margin: 0 0 1.5rem;\n}\n.payment-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: .8rem;\n  letter-spacing: 2px;\n  color: #6b7280;\n}\n.card-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 180px;\n  perspective: 1000px;\n  margin-bottom: .5rem;\n}\n.card-front[_ngcontent-%COMP%], .card-back[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 180px;\n  border-radius: 16px;\n  backface-visibility: hidden;\n  transition: transform .6s;\n  padding: 1.25rem;\n  box-sizing: border-box;\n}\n.card-preview[_ngcontent-%COMP%] {\n  position: relative;\n}\n.card-front[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a5f 0%,\n      #0f2040 60%,\n      #1a1a2e 100%);\n  border: 1px solid rgba(255, 255, 255, .1);\n}\n.card-back[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #1a1a2e,\n      #0f2040);\n  transform: rotateY(180deg);\n}\n.card-preview.flipped[_ngcontent-%COMP%]   .card-front[_ngcontent-%COMP%] {\n  transform: rotateY(-180deg);\n}\n.card-preview.flipped[_ngcontent-%COMP%]   .card-back[_ngcontent-%COMP%] {\n  transform: rotateY(0);\n}\n.card-chip[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  margin-bottom: .75rem;\n}\n.card-number-preview[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 1.1rem;\n  color: #fff;\n  letter-spacing: 3px;\n  margin-bottom: .75rem;\n  opacity: .9;\n}\n.card-bottom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n.card-field-label[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .62rem;\n  letter-spacing: 1.5px;\n  color: rgba(255, 255, 255, .5);\n  margin-bottom: 2px;\n}\n.card-field-val[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: .8rem;\n  color: #fff;\n  text-transform: uppercase;\n}\n.card-logo[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1.25rem;\n  right: 1.25rem;\n}\n.brand-visa[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.4rem;\n  color: #fff;\n  letter-spacing: 2px;\n  font-style: italic;\n}\n.brand-mc[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  color: #f59e0b;\n  letter-spacing: -4px;\n}\n.brand-generic[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n}\n.card-strip[_ngcontent-%COMP%] {\n  background: #000;\n  height: 44px;\n  margin: 0 -1.25rem 1rem;\n}\n.card-cvv-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.card-cvv-label[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .75rem;\n  color: rgba(255, 255, 255, .5);\n}\n.card-cvv-box[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #111;\n  font-family: "Space Mono", monospace;\n  font-size: .9rem;\n  padding: 4px 12px;\n  border-radius: 4px;\n  letter-spacing: 3px;\n  min-width: 50px;\n  text-align: center;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.field-label[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .78rem;\n  font-weight: 600;\n  letter-spacing: 1px;\n  color: #6b7280;\n}\n.field-input[_ngcontent-%COMP%] {\n  background: #0b1022;\n  border: 1px solid #1f2937;\n  border-radius: 8px;\n  padding: 12px 14px;\n  color: #fff;\n  font-family: "Space Mono", monospace;\n  font-size: .9rem;\n  outline: none;\n  transition: border-color .2s;\n  width: 100%;\n  box-sizing: border-box;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  border-color: #a855f7;\n}\n.field-input[_ngcontent-%COMP%]::placeholder {\n  color: #374151;\n}\n.secure-note[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-size: .8rem;\n  color: #6b7280;\n  text-align: center;\n  background: rgba(16, 185, 129, .05);\n  border: 1px solid rgba(16, 185, 129, .1);\n  border-radius: 8px;\n  padding: 10px;\n}\n.payment-error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .1);\n  border: 1px solid rgba(239, 68, 68, .3);\n  border-radius: 8px;\n  padding: 10px 14px;\n  color: #fca5a5;\n  font-family: "Rajdhani", sans-serif;\n  font-size: .88rem;\n}\n.btn-pay[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #a855f7,\n      #e09400);\n  border: none;\n  border-radius: 10px;\n  color: #0b1022;\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.1rem;\n  letter-spacing: 1.5px;\n  cursor: pointer;\n  transition: opacity .2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.btn-pay[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: .9;\n}\n.btn-pay[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.accepted-cards[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  font-family: "Rajdhani", sans-serif;\n  font-size: .8rem;\n  color: #4b5563;\n}\n.acc-visa[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  color: #1a56db;\n  font-style: italic;\n  font-size: 1rem;\n}\n.acc-mc[_ngcontent-%COMP%] {\n  color: #f59e0b;\n  font-size: .85rem;\n  font-weight: 700;\n}\n.acc-mada[_ngcontent-%COMP%] {\n  color: #10b981;\n  font-size: .85rem;\n  font-weight: 700;\n}\n.success-modal[_ngcontent-%COMP%] {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 20px;\n  padding: 3rem 2rem;\n  width: 100%;\n  max-width: 420px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.success-anim[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  background: rgba(16, 185, 129, .15);\n  border: 2px solid #10b981;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n  color: #10b981;\n  animation: _ngcontent-%COMP%_popIn .4s ease;\n}\n@keyframes _ngcontent-%COMP%_popIn {\n  from {\n    transform: scale(0);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.success-title[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 2rem;\n  color: #fff;\n  letter-spacing: 1px;\n  margin: 0;\n}\n.success-body[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  color: #9ca3af;\n  font-size: .95rem;\n  line-height: 1.6;\n  margin: 0;\n}\n.success-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #a855f7;\n}\n.modal-box[_ngcontent-%COMP%] {\n  background: #111827;\n  border: 1px solid #1f2937;\n  border-radius: 16px;\n  padding: 2rem;\n  max-width: 440px;\n  width: 100%;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.6rem;\n  color: #fff;\n  letter-spacing: 1px;\n  margin: 0;\n}\n.modal-body[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  color: #9ca3af;\n  font-size: .95rem;\n  line-height: 1.6;\n  margin: 0;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  margin-top: .5rem;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border: 1px solid #1f2937;\n  background: transparent;\n  color: #9ca3af;\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #1f2937;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border: none;\n  background: #ef4444;\n  color: #fff;\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 700;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.btn-danger[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .sub-page[_ngcontent-%COMP%] {\n    padding: 1rem 1rem 3rem;\n  }\n  .plans-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .current-banner[_ngcontent-%COMP%], .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .current-banner-right[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .field-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=subscription.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubscriptionComponent, { className: "SubscriptionComponent", filePath: "src\\app\\pages\\subscription\\subscription.component.ts", lineNumber: 446 });
})();
export {
  SubscriptionComponent
};
//# sourceMappingURL=chunk-DFTNJWNJ.js.map
