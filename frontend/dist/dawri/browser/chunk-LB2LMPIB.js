import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
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
  DatePipe,
  DecimalPipe,
  DestroyRef,
  HttpClient,
  computed,
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
import "./chunk-7XEFWCRO.js";

// src/app/pages/admin/platform-sponsors/admin-platform-sponsors.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminPlatformSponsorsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5, "Total");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10)(7, "span", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10, "Live now");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 10)(12, "span", 11);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15, "Title");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 10)(17, "span", 11);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 12);
    \u0275\u0275text(20, "Paused");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.rows().length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.liveCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.titleCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.pausedCount());
  }
}
function AdminPlatformSponsorsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx, "");
  }
}
function AdminPlatformSponsorsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AdminPlatformSponsorsComponent_Conditional_11_Conditional_0_Template, 2, 1, "div", 13);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_1_0 = ctx_r0.error()) ? 0 : -1, tmp_1_0);
  }
}
function AdminPlatformSponsorsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "p");
    \u0275\u0275text(2, "No platform sponsors yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 15);
    \u0275\u0275text(4, "Click ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "Add platform sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " to feature a brand on the homepage and across Dawri.");
    \u0275\u0275elementEnd()();
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 20);
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", row_r3.sponsor_logo, \u0275\u0275sanitizeUrl)("alt", row_r3.sponsor_name);
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r3.sponsor_name.charAt(0));
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, "Sponsor record inactive");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, " live");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "scheduled");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "paused");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 19);
    \u0275\u0275template(3, AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_3_Template, 1, 2, "img", 20)(4, AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_4_Template, 2, 1);
    \u0275\u0275elementStart(5, "div")(6, "div", 21);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_8_Template, 2, 0, "div", 22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 23);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 24);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275element(17, "br");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275template(21, AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_21_Template, 2, 0, "span", 25)(22, AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_22_Template, 2, 0)(23, AdminPlatformSponsorsComponent_Conditional_13_For_19_Conditional_23_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td", 26);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td", 27)(28, "button", 28);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_13_For_19_Template_button_click_28_listener() {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggle(row_r3));
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 29);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_13_For_19_Template_button_click_30_listener() {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEdit(row_r3));
    });
    \u0275\u0275text(31, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 30);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_13_For_19_Template_button_click_32_listener() {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.remove(row_r3));
    });
    \u0275\u0275text(33, "Del");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classProp("row-paused", !row_r3.is_active)("row-not-live", row_r3.is_active && !row_r3.is_currently_live);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, row_r3.sponsor_logo ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(row_r3.sponsor_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, !row_r3.sponsor_active ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("tier-pill tier-", row_r3.tier, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r3.tier);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r3.display_order);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", row_r3.starts_at ? \u0275\u0275pipeBind2(16, 18, row_r3.starts_at, "shortDate") : "always", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u2192 ", row_r3.ends_at ? \u0275\u0275pipeBind2(19, 21, row_r3.ends_at, "shortDate") : "no end", " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(21, row_r3.is_currently_live ? 21 : row_r3.is_active ? 22 : 23);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", row_r3.contract_value_sar ? \u0275\u0275pipeBind2(26, 24, row_r3.contract_value_sar, "1.2-2") + " SAR" : "\u2014", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("title", row_r3.is_active ? "Pause" : "Activate");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.is_active ? "Pause" : "Resume", " ");
  }
}
function AdminPlatformSponsorsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 16)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Tier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Window");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 17);
    \u0275\u0275text(14, "Contract value");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 17);
    \u0275\u0275text(16, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, AdminPlatformSponsorsComponent_Conditional_13_For_19_Template, 34, 27, "tr", 18, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r0.rows());
  }
}
function AdminPlatformSponsorsComponent_Conditional_14_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275property("value", s_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.name);
  }
}
function AdminPlatformSponsorsComponent_Conditional_14_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Sponsor cannot be changed; remove and re-add to swap.");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_14_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Sponsor not listed? Add it via the Sponsors admin first.");
    \u0275\u0275elementEnd();
  }
}
function AdminPlatformSponsorsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 35);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_14_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 36);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 37)(8, "label");
    \u0275\u0275text(9, " Sponsor * ");
    \u0275\u0275elementStart(10, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.sponsor_id, $event) || (ctx_r0.form.sponsor_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(11, "option", 39);
    \u0275\u0275text(12, "\u2014 Select sponsor \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, AdminPlatformSponsorsComponent_Conditional_14_For_14_Template, 2, 2, "option", 40, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, AdminPlatformSponsorsComponent_Conditional_14_Conditional_15_Template, 2, 0, "span", 41)(16, AdminPlatformSponsorsComponent_Conditional_14_Conditional_16_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 42)(18, "label");
    \u0275\u0275text(19, " Tier * ");
    \u0275\u0275elementStart(20, "select", 43);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.tier, $event) || (ctx_r0.form.tier = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 44);
    \u0275\u0275text(22, "Title (large hero placement, only one allowed)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 45);
    \u0275\u0275text(24, "Standard (carousel placement)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "label");
    \u0275\u0275text(26, " Display order ");
    \u0275\u0275elementStart(27, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.display_order, $event) || (ctx_r0.form.display_order = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 41);
    \u0275\u0275text(29, "Lower = earlier in the carousel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label");
    \u0275\u0275text(31, " Starts (optional) ");
    \u0275\u0275elementStart(32, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.starts_at, $event) || (ctx_r0.form.starts_at = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "label");
    \u0275\u0275text(34, " Ends (optional) ");
    \u0275\u0275elementStart(35, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.ends_at, $event) || (ctx_r0.form.ends_at = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "label");
    \u0275\u0275text(37, " Contract value (SAR, internal) ");
    \u0275\u0275elementStart(38, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.contract_value_sar, $event) || (ctx_r0.form.contract_value_sar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "label", 49)(40, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.is_active, $event) || (ctx_r0.form.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " Active ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "label");
    \u0275\u0275text(43, " Internal notes ");
    \u0275\u0275elementStart(44, "textarea", 51);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPlatformSponsorsComponent_Conditional_14_Template_textarea_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.internal_notes, $event) || (ctx_r0.form.internal_notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "footer")(46, "button", 52);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_14_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeModal());
    });
    \u0275\u0275text(47, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 53);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_14_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const mode_r6 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(mode_r6 === "edit" ? "Edit platform sponsor" : "Add platform sponsor");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.sponsor_id);
    \u0275\u0275property("disabled", mode_r6 === "edit");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.catalog());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(15, mode_r6 === "edit" ? 15 : 16);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.tier);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.display_order);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.starts_at);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.ends_at);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.contract_value_sar);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.is_active);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.internal_notes);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Saving\u2026" : "Save", " ");
  }
}
function AdminPlatformSponsorsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54)(4, "button", 55);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_15_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmNo());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 56);
    \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Conditional_15_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
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
function AdminPlatformSponsorsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("toast--error", !ctx_r0.toastOk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.toastMsg());
  }
}
var AdminPlatformSponsorsComponent = class _AdminPlatformSponsorsComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.destroyRef = inject(DestroyRef);
    this.base = environment.apiUrl + "/admin/platform-sponsorships";
    this.rows = signal([]);
    this.catalog = signal([]);
    this.loading = signal(true);
    this.error = signal(null);
    this.modalMode = signal(null);
    this.saving = signal(false);
    this.editingId = signal(null);
    this.form = this.freshForm();
    this.toastMsg = signal(null);
    this.toastOk = signal(true);
    this.confirmMsg = signal(null);
    this.confirmCallback = null;
    this.liveCount = computed(() => this.rows().filter((r) => r.is_currently_live).length);
    this.titleCount = computed(() => this.rows().filter((r) => r.tier === "title" && r.is_currently_live).length);
    this.pausedCount = computed(() => this.rows().filter((r) => !r.is_active).length);
  }
  notify(msg, ok = true) {
    this.toastMsg.set(msg);
    this.toastOk.set(ok);
    setTimeout(() => this.toastMsg.set(null), 3500);
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
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get(this.base).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (r) => {
        this.rows.set(r.data ?? []);
        this.catalog.set(r.catalog ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? "Failed to load.");
        this.loading.set(false);
      }
    });
  }
  // ── Modal ────────────────────────────────────────────────────────
  openCreate() {
    this.form = this.freshForm();
    this.editingId.set(null);
    this.modalMode.set("create");
  }
  openEdit(row) {
    this.form = {
      sponsor_id: row.sponsor_id,
      tier: row.tier,
      display_order: row.display_order,
      starts_at: row.starts_at ? row.starts_at.substring(0, 10) : "",
      ends_at: row.ends_at ? row.ends_at.substring(0, 10) : "",
      is_active: row.is_active,
      contract_value_sar: row.contract_value_sar,
      internal_notes: row.internal_notes ?? ""
    };
    this.editingId.set(row.id);
    this.modalMode.set("edit");
  }
  closeModal() {
    this.modalMode.set(null);
    this.editingId.set(null);
  }
  save() {
    if (this.saving())
      return;
    if (!this.form.sponsor_id) {
      this.notify("Please pick a sponsor.", false);
      return;
    }
    const body = {
      sponsor_id: this.form.sponsor_id,
      tier: this.form.tier,
      display_order: this.form.display_order,
      is_active: this.form.is_active,
      contract_value_sar: this.form.contract_value_sar || null,
      internal_notes: this.form.internal_notes || null
    };
    if (this.form.starts_at)
      body["starts_at"] = this.form.starts_at;
    if (this.form.ends_at)
      body["ends_at"] = this.form.ends_at;
    this.saving.set(true);
    const id = this.editingId();
    const req = id ? this.http.put(`${this.base}/${id}`, body) : this.http.post(this.base, body);
    req.subscribe({
      next: () => {
        this.saving.set(false);
        this.modalMode.set(null);
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message ?? Object.values(err?.error?.errors ?? {}).flat().join("\n") ?? "Save failed.";
        this.notify(msg, false);
      }
    });
  }
  remove(row) {
    this.ask(`Remove ${row.sponsor_name} from platform sponsors?`, () => {
      this.http.delete(`${this.base}/${row.id}`).subscribe({
        next: () => {
          this.load();
          this.notify("Sponsor removed.");
        },
        error: (err) => this.notify(err?.error?.message ?? "Remove failed.", false)
      });
    });
  }
  toggle(row) {
    this.http.post(`${this.base}/${row.id}/toggle`, {}).subscribe({
      next: () => this.load(),
      error: (err) => this.notify(err?.error?.message ?? "Toggle failed.", false)
    });
  }
  freshForm() {
    return {
      sponsor_id: "",
      tier: "standard",
      display_order: 0,
      starts_at: "",
      ends_at: "",
      is_active: true,
      contract_value_sar: null,
      internal_notes: ""
    };
  }
  static {
    this.\u0275fac = function AdminPlatformSponsorsComponent_Factory(t) {
      return new (t || _AdminPlatformSponsorsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPlatformSponsorsComponent, selectors: [["app-admin-platform-sponsors"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 17, vars: 5, consts: [[1, "aps"], [1, "page-header"], [1, "title-row"], [1, "btn-primary", 3, "click"], [1, "subtitle"], [1, "kpi-row"], [1, "loading"], [1, "overlay"], [1, "confirm-bar"], [1, "toast", 3, "toast--error"], [1, "kpi"], [1, "n"], [1, "l"], [1, "error-box"], [1, "empty"], [1, "muted"], [1, "data-table"], [1, "r"], [3, "row-paused", "row-not-live"], [1, "sponsor-cell"], [1, "sponsor-logo-thumb", 3, "src", "alt"], [1, "strong"], [1, "muted", "small"], [1, "mono"], [1, "muted", "small", "mono"], [1, "status-pill", "status-live"], [1, "r", "mono"], [1, "r", "actions"], [1, "btn-icon", 3, "click", "title"], ["title", "Edit", 1, "btn-icon", 3, "click"], ["title", "Remove", 1, "btn-icon", "danger", 3, "click"], [1, "sponsor-logo-placeholder"], [1, "status-pill", "status-scheduled"], [1, "status-pill", "status-paused"], [1, "overlay", 3, "click"], [1, "modal", 3, "click"], [1, "close", 3, "click"], [1, "body"], [3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], [1, "hint-inline"], [1, "grid-2"], [3, "ngModelChange", "ngModel"], ["value", "title"], ["value", "standard"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", "min", "0", 3, "ngModelChange", "ngModel"], [1, "inline"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Notes visible only to admins (contract terms, deliverables, etc.)", 3, "ngModelChange", "ngModel"], [1, "ghost", 3, "click"], [1, "btn-primary", 3, "click", "disabled"], [2, "display", "flex", "gap", "8px", "flex-shrink", "0"], [1, "btn-ghost", "btn-sm", 3, "click"], [1, "btn-danger", "btn-sm", 3, "click"], [1, "toast"]], template: function AdminPlatformSponsorsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, " Platform Sponsors");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function AdminPlatformSponsorsComponent_Template_button_click_5_listener() {
          return ctx.openCreate();
        });
        \u0275\u0275text(6, "+ Add platform sponsor");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "p", 4);
        \u0275\u0275text(8, "Brands sponsoring Dawri-the-platform \u2014 visible on home, footer, /sponsors page, and tournament list.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, AdminPlatformSponsorsComponent_Conditional_9_Template, 21, 4, "div", 5)(10, AdminPlatformSponsorsComponent_Conditional_10_Template, 2, 0, "p", 6)(11, AdminPlatformSponsorsComponent_Conditional_11_Template, 1, 1)(12, AdminPlatformSponsorsComponent_Conditional_12_Template, 8, 0)(13, AdminPlatformSponsorsComponent_Conditional_13_Template, 20, 0)(14, AdminPlatformSponsorsComponent_Conditional_14_Template, 50, 13, "div", 7)(15, AdminPlatformSponsorsComponent_Conditional_15_Template, 8, 1, "div", 8)(16, AdminPlatformSponsorsComponent_Conditional_16_Template, 2, 3, "div", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, !ctx.loading() && ctx.rows().length > 0 ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.loading() ? 10 : ctx.error() ? 11 : ctx.rows().length === 0 ? 12 : 13);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(14, (tmp_2_0 = ctx.modalMode()) ? 14 : -1, tmp_2_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.confirmMsg() ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(16, ctx.toastMsg() ? 16 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ['\n\n.aps[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.aps[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.aps[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.aps[_ngcontent-%COMP%]   .mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.aps[_ngcontent-%COMP%]   .strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.aps[_ngcontent-%COMP%]   .hint-inline[_ngcontent-%COMP%] {\n  display: block;\n  color: #666;\n  font-size: 10px;\n  margin-top: 3px;\n}\n.aps[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.aps[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.aps[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 30px;\n  margin: 0;\n  letter-spacing: 1.3px;\n}\n.aps[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  color: #888;\n  font-size: 12px;\n}\n.aps[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background: #006c35;\n  color: #fff;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 5px;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.aps[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: #00592b;\n}\n.aps[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.aps[_ngcontent-%COMP%]   .ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #aaa;\n  border: 1px solid #2a2a3a;\n  padding: 7px 14px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 13px;\n}\n.aps[_ngcontent-%COMP%]   .ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.aps[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  padding: 5px 9px;\n  border-radius: 4px;\n  cursor: pointer;\n  color: #aaa;\n  font-size: 14px;\n  margin-left: 4px;\n}\n.aps[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.aps[_ngcontent-%COMP%]   .btn-icon.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n  border-color: #ef4444;\n}\n.aps[_ngcontent-%COMP%]   .kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.aps[_ngcontent-%COMP%]   .kpi[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 8px;\n  padding: 14px 16px;\n  display: flex;\n  flex-direction: column;\n}\n.aps[_ngcontent-%COMP%]   .kpi[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 24px;\n  font-weight: 700;\n  color: #d4af37;\n}\n.aps[_ngcontent-%COMP%]   .kpi[_ngcontent-%COMP%]   .l[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #888;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  margin-top: 4px;\n}\n.aps[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%], .aps[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #888;\n}\n.aps[_ngcontent-%COMP%]   .error-box[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  border-bottom: 1px solid #2a2a3a;\n  background: #0d0d1a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n  color: #888;\n  font-weight: 600;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 13px;\n  color: #ddd;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.actions[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tr.row-paused[_ngcontent-%COMP%] {\n  opacity: 0.55;\n}\n.aps[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tr.row-not-live[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.04);\n}\n.aps[_ngcontent-%COMP%]   .sponsor-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.aps[_ngcontent-%COMP%]   .sponsor-logo-thumb[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: contain;\n  background: #fff;\n  border-radius: 4px;\n  padding: 3px;\n  flex-shrink: 0;\n}\n.aps[_ngcontent-%COMP%]   .sponsor-logo-placeholder[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #006c35,\n      #d4af37);\n  color: #fff;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.aps[_ngcontent-%COMP%]   .tier-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n}\n.aps[_ngcontent-%COMP%]   .tier-title[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  color: #d4af37;\n  border: 1px solid rgba(212, 175, 55, 0.3);\n}\n.aps[_ngcontent-%COMP%]   .tier-standard[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, 0.18);\n  color: #4ade80;\n  border: 1px solid rgba(0, 108, 53, 0.4);\n}\n.aps[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 9px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n}\n.aps[_ngcontent-%COMP%]   .status-live[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #4ade80;\n}\n.aps[_ngcontent-%COMP%]   .status-scheduled[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n  color: #fcd34d;\n}\n.aps[_ngcontent-%COMP%]   .status-paused[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.15);\n  color: #9ca3af;\n}\n.aps[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  width: 100%;\n  max-width: 700px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-bottom: 1px solid #2a2a3a;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #fff;\n  font-weight: 600;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #888;\n  cursor: pointer;\n  font-size: 20px;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%] {\n  padding: 20px;\n  overflow-y: auto;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #aaa;\n  margin-bottom: 14px;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin-top: 4px;\n  padding: 8px 10px;\n  background: #0d0d1a;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  border-radius: 4px;\n  font-family: inherit;\n  font-size: 13px;\n  box-sizing: border-box;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label.inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   label.inline[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: inline;\n  width: auto;\n  margin-top: 0;\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n@media (max-width: 600px) {\n  .aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.aps[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  padding: 14px 20px;\n  border-top: 1px solid #2a2a3a;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.confirm-bar[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.9rem 1.5rem;\n  background: rgba(239, 68, 68, 0.12);\n  border-top: 1px solid rgba(239, 68, 68, 0.35);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  z-index: 50;\n}\n.confirm-bar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: #fca5a5;\n  font-weight: 600;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.8);\n  border: none;\n  color: #fff;\n  cursor: pointer;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  padding: 0.3rem 0.7rem;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #ef4444;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #374151;\n  color: #9ca3af;\n  cursor: pointer;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  padding: 0.3rem 0.7rem;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1f2937;\n  color: #fff;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.3rem 0.7rem;\n  font-size: 0.72rem;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2rem;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #22c55e;\n  color: #fff;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  z-index: 100;\n  font-weight: 600;\n}\n.toast--error[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n/*# sourceMappingURL=admin-platform-sponsors.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPlatformSponsorsComponent, { className: "AdminPlatformSponsorsComponent", filePath: "src\\app\\pages\\admin\\platform-sponsors\\admin-platform-sponsors.component.ts", lineNumber: 66 });
})();
export {
  AdminPlatformSponsorsComponent
};
//# sourceMappingURL=chunk-LB2LMPIB.js.map
