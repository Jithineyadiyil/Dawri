import {
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
  environment
} from "./chunk-OERRWE4S.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/admin/admin-sponsors.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminSponsorsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.pendingCount() + " awaiting approval");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.pendingCount(), " ");
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Cancel ");
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " + New sponsor ");
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "h3");
    \u0275\u0275text(2, "New sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "label");
    \u0275\u0275text(5, "Name * ");
    \u0275\u0275elementStart(6, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.name, $event) || (ctx_r0.newSponsor.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "Arabic name ");
    \u0275\u0275elementStart(9, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.name_ar, $event) || (ctx_r0.newSponsor.name_ar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label", 15);
    \u0275\u0275text(11, "Tagline ");
    \u0275\u0275elementStart(12, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.tagline, $event) || (ctx_r0.newSponsor.tagline = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "Logo URL ");
    \u0275\u0275elementStart(15, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.logo_url, $event) || (ctx_r0.newSponsor.logo_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "label");
    \u0275\u0275text(17, "Website ");
    \u0275\u0275elementStart(18, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.website_url, $event) || (ctx_r0.newSponsor.website_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "label");
    \u0275\u0275text(20, "Contact name ");
    \u0275\u0275elementStart(21, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.contact_name, $event) || (ctx_r0.newSponsor.contact_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label");
    \u0275\u0275text(23, "Contact email ");
    \u0275\u0275elementStart(24, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.contact_email, $event) || (ctx_r0.newSponsor.contact_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 21)(26, "button", 10);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_14_Conditional_7_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveSponsor());
    });
    \u0275\u0275text(27, "Save sponsor");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.name);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.name_ar);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.tagline);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.logo_url);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.website_url);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.contact_name);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.contact_email);
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, 'No sponsors yet. Click "New sponsor" to add one.');
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 24);
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r5.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r5.name);
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.name_ar);
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", s_r5.website_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.website_url);
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", "mailto:" + s_r5.contact_email, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.contact_email);
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "Private");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Global");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const s_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.promoteSponsor(s_r5));
    });
    \u0275\u0275text(1, "Promote");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275template(2, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_2_Template, 1, 2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_6_Template, 2, 1, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275template(8, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_8_Template, 2, 2, "a", 26)(9, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_9_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275template(11, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_11_Template, 2, 2, "a", 27)(12, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275template(14, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_14_Template, 2, 0, "span", 28)(15, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_15_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td")(17, "span", 29);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 30);
    \u0275\u0275template(20, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Conditional_20_Template, 2, 0, "button", 31);
    \u0275\u0275elementStart(21, "button", 32);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Template_button_click_21_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleSponsorActive(s_r5));
    });
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, s_r5.logo_url ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r5.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, s_r5.name_ar ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, s_r5.website_url ? 8 : 9);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(11, s_r5.contact_email ? 11 : 12);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(14, s_r5.is_global === false ? 14 : 15);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("badge--ok", s_r5.is_active)("badge--muted", !s_r5.is_active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r5.is_active ? "Active" : "Inactive", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(20, s_r5.is_global === false ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", s_r5.is_active ? "Deactivate" : "Activate", " ");
  }
}
function AdminSponsorsComponent_Conditional_14_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 22)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Logo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Website");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, AdminSponsorsComponent_Conditional_14_Conditional_10_For_18_Template, 23, 13, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.sponsors());
  }
}
function AdminSponsorsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 6)(1, "div", 9)(2, "h2");
    \u0275\u0275text(3, "Brand partners");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 10);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_14_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showNewSponsor.set(!ctx_r0.showNewSponsor()));
    });
    \u0275\u0275template(5, AdminSponsorsComponent_Conditional_14_Conditional_5_Template, 1, 0)(6, AdminSponsorsComponent_Conditional_14_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, AdminSponsorsComponent_Conditional_14_Conditional_7_Template, 28, 7, "div", 11)(8, AdminSponsorsComponent_Conditional_14_Conditional_8_Template, 2, 0, "div", 12)(9, AdminSponsorsComponent_Conditional_14_Conditional_9_Template, 2, 0)(10, AdminSponsorsComponent_Conditional_14_Conditional_10_Template, 19, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ctx_r0.showNewSponsor() ? 5 : 6);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(7, ctx_r0.showNewSponsor() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, ctx_r0.loading() ? 8 : ctx_r0.sponsors().length === 0 ? 9 : 10);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Cancel ");
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " + New deal ");
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_7_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    \u0275\u0275property("value", t_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r9.name);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_7_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r10 = ctx.$implicit;
    \u0275\u0275property("value", s_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r10.name);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 15);
    \u0275\u0275text(1, "Cash amount (SAR) ");
    \u0275\u0275elementStart(2, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_36_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.cash_amount_sar, $event) || (ctx_r0.newDeal.cash_amount_sar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.cash_amount_sar);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 15);
    \u0275\u0275text(1, "In-kind description (English) ");
    \u0275\u0275elementStart(2, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_37_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.in_kind_description, $event) || (ctx_r0.newDeal.in_kind_description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "label");
    \u0275\u0275text(4, "Estimated value (SAR) ");
    \u0275\u0275elementStart(5, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_37_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.in_kind_value_sar, $event) || (ctx_r0.newDeal.in_kind_value_sar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.in_kind_description);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.in_kind_value_sar);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "h3");
    \u0275\u0275text(2, "New sponsorship deal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13)(4, "label");
    \u0275\u0275text(5, "Tournament * ");
    \u0275\u0275elementStart(6, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.tournament_id, $event) || (ctx_r0.newDeal.tournament_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(7, "option", 37);
    \u0275\u0275text(8, "Select a tournament");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, AdminSponsorsComponent_Conditional_15_Conditional_7_For_10_Template, 2, 2, "option", 38, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Sponsor * ");
    \u0275\u0275elementStart(13, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.sponsor_id, $event) || (ctx_r0.newDeal.sponsor_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 37);
    \u0275\u0275text(15, "Select a sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, AdminSponsorsComponent_Conditional_15_Conditional_7_For_17_Template, 2, 2, "option", 38, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label");
    \u0275\u0275text(19, "Placement ");
    \u0275\u0275elementStart(20, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.placement_type, $event) || (ctx_r0.newDeal.placement_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 39);
    \u0275\u0275text(22, 'Title \u2014 "Brand X Dawri Cup"');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 40);
    \u0275\u0275text(24, 'Presenting \u2014 "Presented by Brand X"');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 41);
    \u0275\u0275text(26, "Supporting \u2014 logo in sidebar grid");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "label");
    \u0275\u0275text(28, "Contribution ");
    \u0275\u0275elementStart(29, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Template_select_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.contribution_type, $event) || (ctx_r0.newDeal.contribution_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(30, "option", 42);
    \u0275\u0275text(31, "Cash (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 43);
    \u0275\u0275text(33, "In-kind goods");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 44);
    \u0275\u0275text(35, "Logo only (no money)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(36, AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_36_Template, 3, 1, "label", 15)(37, AdminSponsorsComponent_Conditional_15_Conditional_7_Conditional_37_Template, 6, 2);
    \u0275\u0275elementStart(38, "label", 15);
    \u0275\u0275text(39, "Internal notes ");
    \u0275\u0275elementStart(40, "textarea", 45);
    \u0275\u0275twoWayListener("ngModelChange", function AdminSponsorsComponent_Conditional_15_Conditional_7_Template_textarea_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.notes, $event) || (ctx_r0.newDeal.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "p", 46);
    \u0275\u0275text(42, "Deal will be saved as ");
    \u0275\u0275elementStart(43, "strong");
    \u0275\u0275text(44, "draft");
    \u0275\u0275elementEnd();
    \u0275\u0275text(45, ". Activate it to make it public on the tournament page.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 21)(47, "button", 10);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Conditional_7_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveDeal());
    });
    \u0275\u0275text(48, "Save deal");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.tournament_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.tournaments());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.sponsor_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.activeSponsors());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.placement_type);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.contribution_type);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(36, ctx_r0.newDeal.contribution_type === "cash" ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(37, ctx_r0.newDeal.contribution_type === "in_kind" ? 37 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.notes);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "No deals yet.");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const d_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, d_r13.cash_amount_sar), " SAR ");
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const d_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", d_r13.in_kind_description, " ");
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "Logo only");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const d_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.transitionDeal(d_r13, "approve"));
    });
    \u0275\u0275text(1, "Approve");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 53);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_18_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r14);
      const d_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.transitionDeal(d_r13, "reject"));
    });
    \u0275\u0275text(3, "Reject");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const d_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.transitionDeal(d_r13, "activate"));
    });
    \u0275\u0275text(1, "Activate");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const d_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.transitionDeal(d_r13, "fulfill"));
    });
    \u0275\u0275text(1, "Fulfill");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const d_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.transitionDeal(d_r13, "cancel"));
    });
    \u0275\u0275text(1, "Cancel");
    \u0275\u0275elementEnd();
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275template(11, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_11_Template, 2, 3)(12, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_12_Template, 1, 1)(13, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_13_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 29);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 30);
    \u0275\u0275template(18, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_18_Template, 4, 0)(19, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_19_Template, 2, 0, "button", 50)(20, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_20_Template, 2, 0, "button", 50)(21, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Conditional_21_Template, 2, 0, "button", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const d_r13 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_12_0 = d_r13.sponsor == null ? null : d_r13.sponsor.name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.tournamentName(d_r13.tournament_id));
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("tier-pill tier-", d_r13.placement_type, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r13.placement_type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r13.contribution_type);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, d_r13.contribution_type === "cash" ? 11 : d_r13.contribution_type === "in_kind" ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.statusClass(d_r13.contract_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r13.contract_status);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(18, d_r13.contract_status === "pending" ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(19, d_r13.contract_status === "draft" ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(20, d_r13.contract_status === "active" ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, d_r13.contract_status !== "cancelled" && d_r13.contract_status !== "fulfilled" && d_r13.contract_status !== "pending" ? 21 : -1);
  }
}
function AdminSponsorsComponent_Conditional_15_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 22)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Tournament");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Placement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Contribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Value");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, AdminSponsorsComponent_Conditional_15_Conditional_9_For_19_Template, 22, 15, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r0.sponsorships());
  }
}
function AdminSponsorsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 6)(1, "div", 9)(2, "h2");
    \u0275\u0275text(3, "Tournament deals");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 10);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_15_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showNewDeal.set(!ctx_r0.showNewDeal()));
    });
    \u0275\u0275template(5, AdminSponsorsComponent_Conditional_15_Conditional_5_Template, 1, 0)(6, AdminSponsorsComponent_Conditional_15_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, AdminSponsorsComponent_Conditional_15_Conditional_7_Template, 49, 7, "div", 11)(8, AdminSponsorsComponent_Conditional_15_Conditional_8_Template, 2, 0, "div", 12)(9, AdminSponsorsComponent_Conditional_15_Conditional_9_Template, 20, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ctx_r0.showNewDeal() ? 5 : 6);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(7, ctx_r0.showNewDeal() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, ctx_r0.sponsorships().length === 0 ? 8 : 9);
  }
}
function AdminSponsorsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54)(4, "button", 55);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_16_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmNo());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 56);
    \u0275\u0275listener("click", function AdminSponsorsComponent_Conditional_16_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmYes());
    });
    \u0275\u0275text(7, "Confirm");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.confirmMsg());
  }
}
function AdminSponsorsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r19 = ctx;
    \u0275\u0275classProp("toast--ok", t_r19.ok)("toast--err", !t_r19.ok);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r19.msg);
  }
}
var AdminSponsorsComponent = class _AdminSponsorsComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.apiAdmin = `${environment.apiUrl}/admin`;
    this.activeTab = signal("sponsors");
    this.loading = signal(false);
    this.toast = signal(null);
    this.sponsors = signal([]);
    this.showNewSponsor = signal(false);
    this.newSponsor = this.emptySponsor();
    this.sponsorships = signal([]);
    this.tournaments = signal([]);
    this.showNewDeal = signal(false);
    this.newDeal = this.emptyDeal();
    this.activeSponsors = computed(() => this.sponsors().filter((s) => s.is_active));
    this.pendingCount = computed(() => this.sponsorships().filter((d) => d.contract_status === "pending").length);
    this.confirmMsg = signal(null);
    this.confirmCallback = null;
  }
  ngOnInit() {
    this.loadSponsors();
    this.loadSponsorships();
    this.loadTournaments();
  }
  /* ═══════════════════════════════════════════════════════════════
   *  Data loads
   * ═══════════════════════════════════════════════════════════════ */
  loadSponsors() {
    this.loading.set(true);
    this.http.get(`${this.apiAdmin}/sponsors`).subscribe({
      next: (res) => {
        this.sponsors.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.flash("Could not load sponsors", false);
        this.loading.set(false);
      }
    });
  }
  loadSponsorships() {
    this.http.get(`${this.apiAdmin}/sponsorships`).subscribe({
      next: (res) => this.sponsorships.set(res.data),
      error: () => this.flash("Could not load sponsorships", false)
    });
  }
  loadTournaments() {
    this.http.get(`${environment.apiUrl}/tournaments`).subscribe({
      next: (res) => this.tournaments.set(res.data),
      error: () => {
      }
    });
  }
  /* ═══════════════════════════════════════════════════════════════
   *  Sponsors CRUD
   * ═══════════════════════════════════════════════════════════════ */
  saveSponsor() {
    if (!this.newSponsor.name?.trim()) {
      this.flash("Name is required", false);
      return;
    }
    this.http.post(`${this.apiAdmin}/sponsors`, this.newSponsor).subscribe({
      next: () => {
        this.flash("Sponsor created", true);
        this.showNewSponsor.set(false);
        this.newSponsor = this.emptySponsor();
        this.loadSponsors();
      },
      error: (err) => this.flash(err.error?.message ?? "Save failed", false)
    });
  }
  toggleSponsorActive(s) {
    this.http.patch(`${this.apiAdmin}/sponsors/${s.id}`, __spreadProps(__spreadValues({}, s), {
      is_active: !s.is_active
    })).subscribe({
      next: () => {
        this.flash("Updated", true);
        this.loadSponsors();
      },
      error: (err) => this.flash(err.error?.message ?? "Update failed", false)
    });
  }
  /** Sprint 10: promote a scoped sponsor to the global catalog. */
  promoteSponsor(s) {
    this.ask(`Promote ${s.name} to the global catalog? Every organizer will then be able to use this sponsor.`, () => {
      this.http.post(`${this.apiAdmin}/sponsors/${s.id}/promote`, {}).subscribe({
        next: () => {
          this.flash(`${s.name} promoted to global`, true);
          this.loadSponsors();
        },
        error: (err) => this.flash(err.error?.message ?? "Promote failed", false)
      });
    });
  }
  /* ═══════════════════════════════════════════════════════════════
   *  Sponsorships (deals) CRUD
   * ═══════════════════════════════════════════════════════════════ */
  saveDeal() {
    if (!this.newDeal.tournament_id || !this.newDeal.sponsor_id) {
      this.flash("Tournament and sponsor are required", false);
      return;
    }
    if (this.newDeal.contribution_type === "cash" && !(this.newDeal.cash_amount_sar > 0)) {
      this.flash("Cash amount must be positive", false);
      return;
    }
    if (this.newDeal.contribution_type === "in_kind" && !this.newDeal.in_kind_description?.trim()) {
      this.flash("In-kind requires a description", false);
      return;
    }
    this.http.post(`${this.apiAdmin}/sponsorships`, this.newDeal).subscribe({
      next: () => {
        this.flash("Deal created as draft", true);
        this.showNewDeal.set(false);
        this.newDeal = this.emptyDeal();
        this.loadSponsorships();
      },
      error: (err) => this.flash(err.error?.message ?? "Save failed", false)
    });
  }
  transitionDeal(deal, action) {
    const confirmMessages = {
      cancel: "Cancel this deal?",
      reject: "Reject this pending proposal? The organizer will be notified.",
      approve: "Approve this proposal and make it live on the tournament page?"
    };
    const run = () => {
      this.http.post(`${this.apiAdmin}/sponsorships/${deal.id}/${action}`, {}).subscribe({
        next: () => {
          this.flash(`Deal ${action}${action.endsWith("e") ? "d" : "ed"}`, true);
          this.loadSponsorships();
        },
        error: (err) => this.flash(err.error?.message ?? `${action} failed`, false)
      });
    };
    if (confirmMessages[action]) {
      this.ask(confirmMessages[action], run);
    } else {
      run();
    }
  }
  /* ═══════════════════════════════════════════════════════════════
   *  UI helpers
   * ═══════════════════════════════════════════════════════════════ */
  statusClass(s) {
    return `status-${s}`;
  }
  tournamentName(id) {
    return this.tournaments().find((t) => t.id === id)?.name ?? "\u2014";
  }
  flash(msg, ok) {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3e3);
  }
  confirmYes() {
    this.confirmCallback?.();
    this.confirmMsg.set(null);
    this.confirmCallback = null;
  }
  confirmNo() {
    this.confirmMsg.set(null);
    this.confirmCallback = null;
  }
  ask(msg, cb) {
    this.confirmMsg.set(msg);
    this.confirmCallback = cb;
  }
  emptySponsor() {
    return {
      name: "",
      name_ar: null,
      tagline: null,
      logo_url: null,
      website_url: null,
      contact_name: null,
      contact_email: null,
      is_active: true
    };
  }
  emptyDeal() {
    return {
      tournament_id: "",
      sponsor_id: "",
      placement_type: "supporting",
      contribution_type: "cash",
      cash_amount_sar: 0,
      in_kind_description: "",
      in_kind_value_sar: null,
      notes: ""
    };
  }
  static {
    this.\u0275fac = function AdminSponsorsComponent_Factory(t) {
      return new (t || _AdminSponsorsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminSponsorsComponent, selectors: [["app-admin-sponsors"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 11, consts: [[1, "as-page"], [1, "as-hero"], [1, "as-hero__ar"], ["role", "tablist", 1, "as-tabs"], ["type", "button", "role", "tab", 3, "click"], [1, "pending-badge", 3, "title"], [1, "as-section"], [1, "as-confirm-bar"], [1, "toast", 3, "toast--ok", "toast--err"], [1, "as-section-header"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [1, "as-form-card"], [1, "as-empty"], [1, "form-grid"], ["type", "text", "maxlength", "120", 3, "ngModelChange", "ngModel"], [1, "span-2"], ["type", "text", "maxlength", "500", 3, "ngModelChange", "ngModel"], ["type", "url", "placeholder", "/brands/\u2026", 3, "ngModelChange", "ngModel"], ["type", "url", 3, "ngModelChange", "ngModel"], ["type", "text", 3, "ngModelChange", "ngModel"], ["type", "email", 3, "ngModelChange", "ngModel"], [1, "form-actions"], [1, "as-table"], [1, "logo-cell"], [3, "src", "alt"], [1, "ar-sub"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [3, "href"], ["title", "Only visible to creator + admins", 1, "badge", "badge--scoped"], [1, "badge"], [1, "actions-cell"], ["type", "button", 1, "btn-link", "btn-link--ok"], ["type", "button", 1, "btn-link", 3, "click"], [1, "muted"], ["title", "In global catalog \u2014 all organizers can use", 1, "badge", "badge--global"], ["type", "button", 1, "btn-link", "btn-link--ok", 3, "click"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["value", "title"], ["value", "presenting"], ["value", "supporting"], ["value", "cash"], ["value", "in_kind"], ["value", "logo"], ["rows", "3", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["type", "number", "min", "1", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "e.g. 10 Logitech G Pro Keyboards", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [1, "btn-link", "btn-link--ok"], [1, "btn-link", "btn-link--danger"], [1, "btn-link", "btn-link--ok", 3, "click"], [1, "btn-link", "btn-link--danger", 3, "click"], [1, "as-confirm-actions"], [1, "btn-link", 3, "click"], [1, "btn", "btn--primary", 3, "click"], [1, "toast"]], template: function AdminSponsorsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
        \u0275\u0275text(3, " Sponsors ");
        \u0275\u0275elementStart(4, "span", 2);
        \u0275\u0275text(5, "\u0627\u0644\u0631\u064F\u0639\u0627\u0629");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Manage brand partners and their tournament deals.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 3)(9, "button", 4);
        \u0275\u0275listener("click", function AdminSponsorsComponent_Template_button_click_9_listener() {
          return ctx.activeTab.set("sponsors");
        });
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 4);
        \u0275\u0275listener("click", function AdminSponsorsComponent_Template_button_click_11_listener() {
          return ctx.activeTab.set("deals");
        });
        \u0275\u0275text(12);
        \u0275\u0275template(13, AdminSponsorsComponent_Conditional_13_Template, 2, 2, "span", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(14, AdminSponsorsComponent_Conditional_14_Template, 11, 3, "section", 6)(15, AdminSponsorsComponent_Conditional_15_Template, 10, 3, "section", 6)(16, AdminSponsorsComponent_Conditional_16_Template, 8, 1, "div", 7)(17, AdminSponsorsComponent_Conditional_17_Template, 2, 5, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_8_0;
        \u0275\u0275advance(9);
        \u0275\u0275classProp("active", ctx.activeTab() === "sponsors");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" Sponsors (", ctx.sponsors().length, ") ");
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.activeTab() === "deals");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" Deals (", ctx.sponsorships().length, ") ");
        \u0275\u0275advance();
        \u0275\u0275conditional(13, ctx.pendingCount() > 0 ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(14, ctx.activeTab() === "sponsors" ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.activeTab() === "deals" ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(16, ctx.confirmMsg() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(17, (tmp_8_0 = ctx.toast()) ? 17 : -1, tmp_8_0);
      }
    }, dependencies: [CommonModule, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, NgModel], styles: ['@charset "UTF-8";\n\n\n\n.as-page[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem 80px;\n  color: var(--tx);\n}\n.as-hero[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.as-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.8rem, 3vw, 2.4rem);\n  letter-spacing: 0.03em;\n  margin: 0 0 8px;\n  color: var(--tx);\n}\n.as-hero__ar[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 1.1rem;\n  color: var(--mu);\n  margin-left: 12px;\n  font-weight: 400;\n}\n.as-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mu);\n  margin: 0;\n  font-size: 0.95rem;\n}\n.as-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid var(--br);\n  margin-bottom: 28px;\n}\n.as-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--mu);\n  font-family: inherit;\n  font-size: 0.92rem;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  cursor: pointer;\n  transition: color 0.15s, border-color 0.15s;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.as-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--tx);\n}\n.as-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: var(--gold);\n  border-bottom-color: var(--gold);\n}\n.pending-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 7px;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      120deg,\n      var(--cyan),\n      var(--gold));\n  color: #1a0a00;\n  font-size: 0.72rem;\n  font-weight: 800;\n  line-height: 22px;\n  text-align: center;\n  letter-spacing: 0;\n  box-shadow: 0 2px 10px -4px rgba(251, 191, 36, 0.8);\n  animation: _ngcontent-%COMP%_pending-pulse 2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pending-pulse {\n  0%, 100% {\n    transform: scale(1);\n    box-shadow: 0 2px 10px -4px rgba(251, 191, 36, 0.8);\n  }\n  50% {\n    transform: scale(1.1);\n    box-shadow: 0 3px 14px -4px rgb(251, 191, 36);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .pending-badge[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.as-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.as-section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.as-section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.2rem;\n  letter-spacing: 0.02em;\n  margin: 0;\n  color: var(--tx);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border-radius: 10px;\n  font-weight: 700;\n  font-size: 0.88rem;\n  letter-spacing: 0.03em;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition: transform 0.1s, box-shadow 0.2s;\n  font-family: inherit;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      var(--gold),\n      var(--cyan));\n  color: #fff;\n  box-shadow: 0 4px 14px -6px rgba(0, 108, 53, 0.6);\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 18px -6px rgba(0, 108, 53, 0.8);\n}\n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px 8px;\n  color: var(--cyan);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 0.85rem;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  transition: color 0.15s;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n}\n.btn-link--ok[_ngcontent-%COMP%] {\n  color: #4ade80;\n}\n.btn-link--ok[_ngcontent-%COMP%]:hover {\n  color: #86efac;\n}\n.btn-link--danger[_ngcontent-%COMP%] {\n  color: #f87171;\n}\n.btn-link--danger[_ngcontent-%COMP%]:hover {\n  color: #fca5a5;\n}\n.as-form-card[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 14px;\n  padding: 24px;\n  margin-bottom: 16px;\n}\n.as-form-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1rem;\n  letter-spacing: 0.05em;\n  margin: 0 0 18px;\n  color: var(--gold);\n  text-transform: uppercase;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px 18px;\n}\n@media (max-width: 720px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  font-size: 0.76rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  color: var(--mu);\n  text-transform: uppercase;\n}\n.form-grid[_ngcontent-%COMP%]   label.span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n@media (max-width: 720px) {\n  .form-grid[_ngcontent-%COMP%]   label.span-2[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n}\n.form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid var(--br);\n  border-radius: 8px;\n  padding: 10px 12px;\n  color: var(--tx);\n  font-family: inherit;\n  font-size: 0.92rem;\n  text-transform: none;\n  letter-spacing: normal;\n  font-weight: 400;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--gold);\n  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.14);\n}\n.form-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n.form-hint[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--dim);\n  margin: 14px 0 0;\n}\n.form-hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  font-weight: 600;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 18px;\n  padding-top: 16px;\n  border-top: 1px solid var(--br);\n}\n.as-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 14px;\n  overflow: hidden;\n}\n.as-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n}\n.as-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 12px 16px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--mu);\n  border-bottom: 1px solid var(--br);\n}\n.as-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 0.9rem;\n  color: var(--tx);\n  border-bottom: 1px solid var(--br);\n  vertical-align: middle;\n}\n.as-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.as-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.015);\n}\n.as-table[_ngcontent-%COMP%]   .logo-cell[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: contain;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.04);\n  padding: 4px;\n}\n.as-table[_ngcontent-%COMP%]   .ar-sub[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 0.78rem;\n  color: var(--mu);\n  margin-top: 2px;\n}\n.as-table[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: var(--dim);\n}\n.as-table[_ngcontent-%COMP%]   .actions-cell[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.as-table[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  text-decoration: none;\n}\n.as-table[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.badge--ok[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.14);\n  color: #4ade80;\n  border: 1px solid rgba(74, 222, 128, 0.3);\n}\n.badge--muted[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--mu);\n  border: 1px solid var(--br);\n}\n.badge.status-draft[_ngcontent-%COMP%] {\n  background: rgba(203, 213, 225, 0.1);\n  color: #cbd5e1;\n  border: 1px solid rgba(203, 213, 225, 0.2);\n}\n.badge.status-pending[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.12);\n  color: var(--cyan);\n  border: 1px solid rgba(251, 191, 36, 0.3);\n}\n.badge.status-active[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.14);\n  color: #4ade80;\n  border: 1px solid rgba(74, 222, 128, 0.3);\n}\n.badge.status-fulfilled[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.14);\n  color: var(--cyan);\n  border: 1px solid rgba(212, 175, 55, 0.3);\n}\n.badge.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.12);\n  color: #f87171;\n  border: 1px solid rgba(248, 113, 113, 0.3);\n}\n.tier-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.tier-pill.tier-title[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      rgba(212, 175, 55, 0.25),\n      rgba(212, 175, 55, 0.08));\n  color: var(--cyan);\n  border: 1px solid var(--cyan);\n}\n.tier-pill.tier-presenting[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.12);\n  color: var(--cyan);\n  border: 1px solid var(--cyan);\n}\n.tier-pill.tier-supporting[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--mu);\n  border: 1px solid var(--br);\n}\n.as-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  color: var(--dim);\n  background: var(--bg2);\n  border: 1px dashed var(--br);\n  border-radius: 14px;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 32px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 12px 20px;\n  border-radius: 10px;\n  font-size: 0.88rem;\n  font-weight: 500;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, 0.4);\n  z-index: 100;\n  animation: _ngcontent-%COMP%_toast-in 0.25s ease-out;\n}\n.toast--ok[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.2);\n  border: 1px solid rgba(74, 222, 128, 0.4);\n  color: #6ee7b7;\n}\n.toast--err[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.2);\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  color: #fca5a5;\n}\n@keyframes _ngcontent-%COMP%_toast-in {\n  from {\n    opacity: 0;\n    transform: translate(-50%, 10px);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n.as-confirm-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 32px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 12px 18px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 10px;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, 0.5);\n  font-size: 0.9rem;\n  color: var(--tx);\n  z-index: 100;\n  animation: _ngcontent-%COMP%_toast-in 0.25s ease-out;\n}\n.as-confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n@media (prefers-reduced-motion: reduce) {\n  .btn[_ngcontent-%COMP%], .btn-link[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .toast[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.badge--global[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.14);\n  color: #4ade80;\n  border: 1px solid rgba(74, 222, 128, 0.3);\n}\n.badge--scoped[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.12);\n  color: var(--cyan);\n  border: 1px solid rgba(251, 191, 36, 0.35);\n}\n/*# sourceMappingURL=admin-sponsors.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminSponsorsComponent, { className: "AdminSponsorsComponent", filePath: "src\\app\\pages\\admin\\admin-sponsors.component.ts", lineNumber: 65 });
})();
export {
  AdminSponsorsComponent
};
//# sourceMappingURL=chunk-J5OUUZ4K.js.map
