import {
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
  ApiService
} from "./chunk-XKV56PBS.js";
import {
  CommonModule,
  DecimalPipe,
  catchError,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
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

// src/app/pages/admin/admin-ads.component.ts
var _forTrack0 = ($index, $item) => $item.type;
var _forTrack1 = ($index, $item) => $item.id;
function AdminAdsComponent_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8, "impressions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 17)(10, "span", 18);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 19);
    \u0275\u0275text(14, "clicks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 20);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTypeLabel(s_r1.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 4, s_r1.impressions));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 6, s_r1.clicks));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("CTR: ", s_r1.impressions > 0 ? \u0275\u0275pipeBind2(17, 8, s_r1.clicks / s_r1.impressions * 100, "1.1-1") : "0", "%");
  }
}
function AdminAdsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, AdminAdsComponent_Conditional_9_For_2_Template, 18, 11, "div", 15, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.stats());
  }
}
function AdminAdsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminAdsComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 23);
    \u0275\u0275element(3, "path", 24)(4, "path", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "No ad placements yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_32_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCreate());
    });
    \u0275\u0275text(8, "Create first placement");
    \u0275\u0275elementEnd()();
  }
}
function AdminAdsComponent_Conditional_33_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", p_r5.image_url, \u0275\u0275sanitizeUrl)("alt", p_r5.title);
  }
}
function AdminAdsComponent_Conditional_33_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("background", p_r5.brand_color || "#1a2235");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((p_r5.brand_name || p_r5.title).charAt(0));
  }
}
function AdminAdsComponent_Conditional_33_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.brand_name);
  }
}
function AdminAdsComponent_Conditional_33_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "Paused");
    \u0275\u0275elementEnd();
  }
}
function AdminAdsComponent_Conditional_33_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29);
    \u0275\u0275template(2, AdminAdsComponent_Conditional_33_For_2_Conditional_2_Template, 1, 2, "img", 30)(3, AdminAdsComponent_Conditional_33_For_2_Conditional_3_Template, 2, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 31)(5, "div", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 33)(8, "span", 34);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AdminAdsComponent_Conditional_33_For_2_Conditional_10_Template, 2, 1, "span")(11, AdminAdsComponent_Conditional_33_For_2_Conditional_11_Template, 2, 0, "span", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 36)(13, "div", 37)(14, "span", 38);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 39);
    \u0275\u0275text(18, "views");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 37)(20, "span", 38);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 39);
    \u0275\u0275text(24, "clicks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 40)(26, "span", 38);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 39);
    \u0275\u0275text(30, "CTR");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 41)(32, "button", 42);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_33_For_2_Template_button_click_32_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onToggle(p_r5));
    });
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 43);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_33_For_2_Template_button_click_34_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEdit(p_r5));
    });
    \u0275\u0275text(35, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 44);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_33_For_2_Template_button_click_36_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDelete(p_r5));
    });
    \u0275\u0275text(37, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("placement-row--inactive", !p_r5.is_active);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, p_r5.image_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("type-badge--" + p_r5.type);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTypeLabel(p_r5.type));
    \u0275\u0275advance();
    \u0275\u0275conditional(10, p_r5.brand_name ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, !p_r5.is_active ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 15, p_r5.impression_count));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 17, p_r5.click_count));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", p_r5.impression_count > 0 ? \u0275\u0275pipeBind2(28, 19, p_r5.click_count / p_r5.impression_count * 100, "1.1-1") : "0", "%");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("btn-toggle--on", p_r5.is_active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.is_active ? "Live" : "Paused");
  }
}
function AdminAdsComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275repeaterCreate(1, AdminAdsComponent_Conditional_33_For_2_Template, 38, 22, "div", 27, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.placements());
  }
}
function AdminAdsComponent_Conditional_34_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Uploading\u2026 ");
  }
}
function AdminAdsComponent_Conditional_34_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Upload Image ");
  }
}
function AdminAdsComponent_Conditional_34_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 66);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.form.image_url, \u0275\u0275sanitizeUrl);
  }
}
function AdminAdsComponent_Conditional_34_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "label");
    \u0275\u0275text(2, "Tournament ID (UUID)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Conditional_57_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.tournament_id, $event) || (ctx_r1.form.tournament_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.tournament_id);
  }
}
function AdminAdsComponent_Conditional_34_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formError());
  }
}
function AdminAdsComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_34_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCloseModal());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 47);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_34_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 48)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 49);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_34_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCloseModal());
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 50)(8, "div", 51)(9, "div", 52)(10, "label");
    \u0275\u0275text(11, "Type *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 53);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.type, $event) || (ctx_r1.form.type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(13, "option", 54);
    \u0275\u0275text(14, "In-Grid Sponsor Card");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 55);
    \u0275\u0275text(16, "Promoted Tournament");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 56);
    \u0275\u0275text(18, "Tournament Banner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 57);
    \u0275\u0275text(20, "Left Sidebar Ad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 58);
    \u0275\u0275text(22, "Right Sidebar Ad");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 59)(24, "label");
    \u0275\u0275text(25, "Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.title, $event) || (ctx_r1.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 59)(28, "label");
    \u0275\u0275text(29, "Arabic Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.title_ar, $event) || (ctx_r1.form.title_ar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 52)(32, "label");
    \u0275\u0275text(33, "Banner Image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 62)(35, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.image_url, $event) || (ctx_r1.form.image_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "label", 64);
    \u0275\u0275template(37, AdminAdsComponent_Conditional_34_Conditional_37_Template, 1, 0)(38, AdminAdsComponent_Conditional_34_Conditional_38_Template, 1, 0);
    \u0275\u0275elementStart(39, "input", 65);
    \u0275\u0275listener("change", function AdminAdsComponent_Conditional_34_Template_input_change_39_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelect($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(40, AdminAdsComponent_Conditional_34_Conditional_40_Template, 1, 1, "img", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 59)(42, "label");
    \u0275\u0275text(43, "Link URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.link_url, $event) || (ctx_r1.form.link_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 59)(46, "label");
    \u0275\u0275text(47, "CTA Label");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.cta_label, $event) || (ctx_r1.form.cta_label = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 59)(50, "label");
    \u0275\u0275text(51, "Brand Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.brand_name, $event) || (ctx_r1.form.brand_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 59)(54, "label");
    \u0275\u0275text(55, "Brand Colour");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.brand_color, $event) || (ctx_r1.form.brand_color = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(57, AdminAdsComponent_Conditional_34_Conditional_57_Template, 4, 1, "div", 52);
    \u0275\u0275elementStart(58, "div", 59)(59, "label");
    \u0275\u0275text(60, "Start Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.starts_at, $event) || (ctx_r1.form.starts_at = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 59)(63, "label");
    \u0275\u0275text(64, "End Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.ends_at, $event) || (ctx_r1.form.ends_at = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 59)(67, "label");
    \u0275\u0275text(68, "Sort Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function AdminAdsComponent_Conditional_34_Template_input_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sort_order, $event) || (ctx_r1.form.sort_order = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(70, AdminAdsComponent_Conditional_34_Conditional_70_Template, 2, 1, "p", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "footer", 74)(72, "button", 75);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_34_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCloseModal());
    });
    \u0275\u0275text(73, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 76);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_34_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSave());
    });
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.editingId() ? "Edit Placement" : "New Ad Placement");
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.type);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.title_ar);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.image_url);
    \u0275\u0275advance();
    \u0275\u0275classProp("upload-btn--loading", ctx_r1.uploading());
    \u0275\u0275advance();
    \u0275\u0275conditional(37, ctx_r1.uploading() ? 37 : 38);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(40, ctx_r1.form.image_url ? 40 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.link_url);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.cta_label);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.brand_name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.brand_color);
    \u0275\u0275advance();
    \u0275\u0275conditional(57, ctx_r1.form.type === "promoted_tournament" || ctx_r1.form.type === "tournament_banner" ? 57 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.starts_at);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.ends_at);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sort_order);
    \u0275\u0275advance();
    \u0275\u0275conditional(70, ctx_r1.formError() ? 70 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "Saving\u2026" : ctx_r1.editingId() ? "Save Changes" : "Create");
  }
}
function AdminAdsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 78)(4, "button", 79);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_35_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmNo());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 80);
    \u0275\u0275listener("click", function AdminAdsComponent_Conditional_35_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmYes());
    });
    \u0275\u0275text(7, "Delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.confirmMsg());
  }
}
function AdminAdsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("toast--ok", ctx_r1.toastOk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.toastMsg());
  }
}
var AdminAdsComponent = class _AdminAdsComponent {
  constructor() {
    this.api = inject(ApiService);
    this.placements = signal([]);
    this.stats = signal([]);
    this.loading = signal(true);
    this.showModal = signal(false);
    this.editingId = signal(null);
    this.saving = signal(false);
    this.formError = signal(null);
    this.toastMsg = signal(null);
    this.toastOk = signal(true);
    this.uploading = signal(false);
    this.confirmMsg = signal(null);
    this.confirmCallback = null;
    this.form = this.buildEmptyForm();
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
    this.loadPlacements();
    this.loadStats();
  }
  loadPlacements() {
    this.loading.set(true);
    this.api.adminGetAdPlacements().pipe(catchError(() => of({ data: [] }))).subscribe((r) => {
      this.placements.set(r.data ?? []);
      this.loading.set(false);
    });
  }
  loadStats() {
    this.api.adminGetAdStats().pipe(catchError(() => of({ data: [] }))).subscribe((r) => this.stats.set(r.data ?? []));
  }
  onCreate() {
    this.form = this.buildEmptyForm();
    this.editingId.set(null);
    this.formError.set(null);
    this.showModal.set(true);
  }
  onEdit(p) {
    this.form = { type: p.type, title: p.title, title_ar: p.title_ar ?? "", image_url: p.image_url ?? "", link_url: p.link_url ?? "", cta_label: p.cta_label ?? "", brand_name: p.brand_name ?? "", brand_color: p.brand_color ?? "#d4af37", tournament_id: p.tournament_id ?? "", sort_order: p.sort_order, starts_at: p.starts_at?.slice(0, 16) ?? "", ends_at: p.ends_at?.slice(0, 16) ?? "" };
    this.editingId.set(p.id);
    this.formError.set(null);
    this.showModal.set(true);
  }
  onCloseModal() {
    this.showModal.set(false);
  }
  onSave() {
    if (!this.form.title) {
      this.formError.set("Title is required.");
      return;
    }
    this.saving.set(true);
    const payload = __spreadProps(__spreadValues({}, this.form), { sort_order: Number(this.form.sort_order) });
    const req = this.editingId() ? this.api.adminUpdateAdPlacement(this.editingId(), payload) : this.api.adminCreateAdPlacement(payload);
    req.pipe(catchError((err) => {
      this.formError.set(err?.error?.message ?? "Save failed.");
      this.saving.set(false);
      return of(null);
    })).subscribe((r) => {
      if (r) {
        this.saving.set(false);
        this.onCloseModal();
        this.loadPlacements();
        this.loadStats();
        this.showToast("Saved!", true);
      }
    });
  }
  onToggle(p) {
    this.api.adminToggleAdPlacement(p.id).pipe(catchError(() => of(null))).subscribe((r) => {
      if (r)
        this.loadPlacements();
    });
  }
  onDelete(p) {
    this.ask('Delete "' + p.title + '"?', () => {
      this.api.adminDeleteAdPlacement(p.id).pipe(catchError(() => of(null))).subscribe(() => {
        this.loadPlacements();
        this.showToast("Deleted.", true);
      });
    });
  }
  getTypeLabel(type) {
    const m = { promoted_tournament: "Promoted", in_grid_sponsor: "In-Grid", tournament_banner: "Banner", sidebar_left: "Left Sidebar", sidebar_right: "Right Sidebar" };
    return m[type] ?? type;
  }
  onFileSelect(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    this.uploading.set(true);
    this.api.uploadAdImage(file).subscribe({
      next: (r) => {
        this.form.image_url = r.url;
        this.uploading.set(false);
      },
      error: () => {
        this.uploading.set(false);
        this.showToast("Upload failed. Check file size (max 5MB) and format.", false);
      }
    });
  }
  buildEmptyForm() {
    return { type: "in_grid_sponsor", title: "", title_ar: "", image_url: "", link_url: "", cta_label: "Learn More", brand_name: "", brand_color: "#d4af37", tournament_id: "", sort_order: 0, starts_at: "", ends_at: "" };
  }
  showToast(msg, ok) {
    this.toastMsg.set(msg);
    this.toastOk.set(ok);
    setTimeout(() => this.toastMsg.set(null), 3e3);
  }
  static {
    this.\u0275fac = function AdminAdsComponent_Factory(t) {
      return new (t || _AdminAdsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminAdsComponent, selectors: [["app-admin-ads"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 37, vars: 5, consts: [[1, "ads-page"], [1, "ads-header"], [1, "ads-title"], [1, "ads-sub"], [1, "btn-primary", 3, "click"], [1, "stats-strip"], [1, "type-guide"], [1, "tg-item"], [1, "tg-badge", "tg-badge--promoted"], [1, "tg-badge", "tg-badge--ingrid"], [1, "tg-badge", "tg-badge--banner"], [1, "tg-badge", "tg-badge--sidebar"], [1, "loading"], [1, "confirm-bar"], [1, "toast", 3, "toast--ok"], [1, "stat-card"], [1, "stat-type"], [1, "stat-row"], [1, "stat-val"], [1, "stat-lbl"], [1, "stat-ctr"], [1, "empty"], [1, "empty-icon"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M3 11l18-5v12L3 14v-3z"], ["d", "M11.6 16.8a3 3 0 1 1-5.8-1.6"], [1, "placements-list"], [1, "placement-row", 3, "placement-row--inactive"], [1, "placement-row"], [1, "placement-preview"], [3, "src", "alt"], [1, "placement-info"], [1, "placement-title"], [1, "placement-meta"], [1, "type-badge"], [1, "paused-tag"], [1, "placement-stats"], [1, "pstat"], [1, "pstat-n"], [1, "pstat-l"], [1, "pstat", "pstat--ctr"], [1, "placement-actions"], [1, "btn-toggle", 3, "click"], [1, "btn-edit", 3, "click"], [1, "btn-delete", 3, "click"], [1, "preview-placeholder"], [1, "modal-back", 3, "click"], [1, "modal", 3, "click"], [1, "modal-head"], [3, "click"], [1, "modal-body"], [1, "form-grid"], [1, "field", "field--full"], [3, "ngModelChange", "ngModel"], ["value", "in_grid_sponsor"], ["value", "promoted_tournament"], ["value", "tournament_banner"], ["value", "sidebar_left"], ["value", "sidebar_right"], [1, "field"], ["placeholder", "e.g. PSN Summer Sale", 3, "ngModelChange", "ngModel"], ["dir", "rtl", "placeholder", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646", 3, "ngModelChange", "ngModel"], [1, "upload-row"], ["placeholder", "Paste image URL or upload below\u2026", 1, "upload-input", 3, "ngModelChange", "ngModel"], [1, "upload-btn"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], ["alt", "preview", 1, "img-preview", 3, "src"], ["placeholder", "https://\u2026", 3, "ngModelChange", "ngModel"], ["placeholder", "Shop Now", 3, "ngModelChange", "ngModel"], ["placeholder", "PlayStation", 3, "ngModelChange", "ngModel"], ["type", "color", 3, "ngModelChange", "ngModel"], ["type", "datetime-local", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [1, "form-error"], [1, "modal-foot"], [1, "btn-ghost", 3, "click", "disabled"], [1, "btn-primary", 3, "click", "disabled"], ["placeholder", "550e8400-\u2026", 3, "ngModelChange", "ngModel"], [1, "confirm-actions"], [1, "btn-ghost", "btn-sm", 3, "click"], [1, "btn-danger", "btn-sm", 3, "click"], [1, "toast"]], template: function AdminAdsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "Ad Placements");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Manage sponsored content across the platform");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function AdminAdsComponent_Template_button_click_7_listener() {
          return ctx.onCreate();
        });
        \u0275\u0275text(8, "+ New Placement");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, AdminAdsComponent_Conditional_9_Template, 3, 0, "div", 5);
        \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "span", 8);
        \u0275\u0275text(13, "Promoted Tournament");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p");
        \u0275\u0275text(15, "Pins a tournament with a gold border.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 7)(17, "span", 9);
        \u0275\u0275text(18, "In-Grid Sponsor");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "p");
        \u0275\u0275text(20, "Sponsor card every 6th slot in the grid.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 7)(22, "span", 10);
        \u0275\u0275text(23, "Tournament Banner");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "p");
        \u0275\u0275text(25, "Banner above bracket tabs on a tournament page.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 7)(27, "span", 11);
        \u0275\u0275text(28, "Sidebar Ads");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "p");
        \u0275\u0275text(30, "160px ads on left/right sides of all pages. Hidden for premium users.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(31, AdminAdsComponent_Conditional_31_Template, 2, 0, "div", 12)(32, AdminAdsComponent_Conditional_32_Template, 9, 0)(33, AdminAdsComponent_Conditional_33_Template, 3, 0)(34, AdminAdsComponent_Conditional_34_Template, 76, 21)(35, AdminAdsComponent_Conditional_35_Template, 8, 1, "div", 13)(36, AdminAdsComponent_Conditional_36_Template, 2, 3, "div", 14);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, ctx.stats().length > 0 ? 9 : -1);
        \u0275\u0275advance(22);
        \u0275\u0275conditional(31, ctx.loading() ? 31 : ctx.placements().length === 0 ? 32 : 33);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(34, ctx.showModal() ? 34 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(35, ctx.confirmMsg() ? 35 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(36, ctx.toastMsg() ? 36 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.ads-page[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.ads-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.ads-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 800;\n  margin: 0;\n}\n.ads-sub[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 13px;\n  margin: 4px 0 0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: #d4af37;\n  border: none;\n  border-radius: 8px;\n  color: #1a1205;\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 14px;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, .15);\n  border-radius: 8px;\n  color: #9ca3af;\n  cursor: pointer;\n}\n.stats-strip[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .04);\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 10px;\n  padding: 16px 20px;\n  min-width: 160px;\n}\n.stat-type[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #6b7280;\n  font-family: monospace;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  margin-bottom: 8px;\n}\n.stat-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 6px;\n}\n.stat-val[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n}\n.stat-lbl[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6b7280;\n}\n.stat-ctr[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #d4af37;\n  margin-top: 4px;\n}\n.type-guide[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.tg-item[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n  padding: 12px 14px;\n  background: rgba(255, 255, 255, .02);\n  border: 1px solid rgba(255, 255, 255, .07);\n  border-radius: 8px;\n}\n.tg-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 6px 0 0;\n}\n.tg-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 3px 8px;\n  border-radius: 4px;\n}\n.tg-badge--promoted[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .15);\n  color: #d4af37;\n}\n.tg-badge--ingrid[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .18);\n  color: #4ade80;\n}\n.tg-badge--banner[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, .12);\n  color: #10b981;\n}\n.tg-badge--sidebar[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .08);\n  color: #9ca3af;\n}\n.placements-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.placement-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 64px 1fr auto auto;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  background: rgba(255, 255, 255, .03);\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 10px;\n}\n.placement-row--inactive[_ngcontent-%COMP%] {\n  opacity: .5;\n}\n.placement-preview[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 40px;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.placement-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.preview-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  font-weight: 700;\n}\n.placement-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.placement-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  margin-top: 4px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.type-badge[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 10px;\n  font-family: monospace;\n  text-transform: uppercase;\n}\n.type-badge--promoted_tournament[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .15);\n  color: #d4af37;\n}\n.type-badge--in_grid_sponsor[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .18);\n  color: #4ade80;\n}\n.type-badge--tournament_banner[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, .12);\n  color: #10b981;\n}\n.paused-tag[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 11px;\n}\n.placement-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.pstat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.pstat-n[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n}\n.pstat-l[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #6b7280;\n}\n.pstat--ctr[_ngcontent-%COMP%]   .pstat-n[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.placement-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-toggle[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  border-radius: 6px;\n  border: none;\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  background: rgba(255, 255, 255, .08);\n  color: #6b7280;\n}\n.btn-toggle--on[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, .15);\n  color: #10b981;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, .15);\n  border-radius: 6px;\n  color: #9ca3af;\n  font-size: 12px;\n  cursor: pointer;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  padding: 5px 12px;\n  background: transparent;\n  border: 1px solid rgba(239, 68, 68, .25);\n  border-radius: 6px;\n  color: #ef4444;\n  font-size: 12px;\n  cursor: pointer;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #6b7280;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: .4;\n  margin-bottom: 12px;\n}\n.empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  margin: 0 0 16px;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #6b7280;\n}\n.modal-back[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .6);\n  z-index: 500;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 501;\n  width: min(680px, calc(100vw - 32px));\n  max-height: 90vh;\n  overflow-y: auto;\n  background: #111827;\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 16px;\n}\n.modal-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid rgba(255, 255, 255, .08);\n}\n.modal-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n}\n.modal-head[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #9ca3af;\n  font-size: 18px;\n  cursor: pointer;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.modal-foot[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 16px 24px;\n  border-top: 1px solid rgba(255, 255, 255, .08);\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.field--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  font-family: monospace;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  background: rgba(255, 255, 255, .05);\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 8px;\n  color: #fff;\n  font-size: 14px;\n  outline: none;\n}\n.field[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%] {\n  padding: 4px;\n  height: 40px;\n  cursor: pointer;\n}\n.upload-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.upload-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.upload-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n  padding: 10px 14px;\n  background: rgba(255, 255, 255, .07);\n  border: 1px solid rgba(255, 255, 255, .15);\n  border-radius: 8px;\n  color: #9ca3af;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all .15s;\n  flex-shrink: 0;\n}\n.upload-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, .12);\n  color: #fff;\n}\n.upload-btn--loading[_ngcontent-%COMP%] {\n  opacity: .6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.img-preview[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 100px;\n  object-fit: cover;\n  border-radius: 6px;\n  margin-top: 8px;\n  border: 1px solid rgba(255, 255, 255, .1);\n}\n.form-error[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n  margin-top: 8px;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  padding: 12px 20px;\n  border-radius: 8px;\n  font-size: 14px;\n  z-index: 600;\n  background: rgba(239, 68, 68, .15);\n  color: #fca5a5;\n}\n.toast--ok[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, .15);\n  color: #10b981;\n}\n.confirm-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 600;\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 12px 18px;\n  background: #111827;\n  border: 1px solid rgba(255, 255, 255, .12);\n  border-radius: 10px;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, .5);\n  font-size: 14px;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border: none;\n  color: #fff;\n}\n/*# sourceMappingURL=admin-ads.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminAdsComponent, { className: "AdminAdsComponent", filePath: "src\\app\\pages\\admin\\admin-ads.component.ts", lineNumber: 233 });
})();
export {
  AdminAdsComponent
};
//# sourceMappingURL=chunk-JDNUVDSM.js.map
