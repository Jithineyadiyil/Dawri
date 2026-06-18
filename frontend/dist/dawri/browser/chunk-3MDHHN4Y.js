import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  TitleCasePipe,
  catchError,
  computed,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
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
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/marketplace/marketplace.component.ts
function _forTrack0($index, $item) {
  return this.slideIndex();
}
var _forTrack1 = ($index, $item) => $item.brand;
var _forTrack2 = ($index, $item) => $item.id;
var _forTrack3 = ($index, $item) => $item.product.id;
var _c0 = (a0) => [a0];
var _c1 = () => [1, 2, 3, 4, 5, 6, 7, 8];
var _c2 = () => [1, 2, 3, 4];
function MarketplaceComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.switchTab("orders"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " My Orders ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "orders");
  }
}
function MarketplaceComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openTopUp());
    });
    \u0275\u0275elementStart(1, "span", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 8);
    \u0275\u0275element(3, "path", 26)(4, "path", 27)(5, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 29);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 31);
    \u0275\u0275element(13, "line", 32)(14, "line", 33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 1, ctx_r1.walletBalance(), "1.2-2"), " ");
  }
}
function MarketplaceComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.cartCount() > 99 ? "99+" : ctx_r1.cartCount());
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "rect", 41)(2, "rect", 42)(3, "rect", 43)(4, "rect", 44);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "line", 45)(2, "line", 46)(3, "line", 47)(4, "line", 48)(5, "path", 49);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "path", 50)(2, "line", 51)(3, "line", 52)(4, "line", 53);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "path", 9)(2, "line", 10)(3, "path", 11);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "rect", 54)(2, "line", 55)(3, "line", 56);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "path", 57)(2, "path", 58)(3, "line", 59)(4, "line", 60)(5, "line", 61);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 40);
    \u0275\u0275element(1, "path", 62);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_23_For_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 39);
  }
}
function MarketplaceComponent_Conditional_23_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_23_For_3_Template_button_click_0_listener() {
      const cat_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeCategory.set(cat_r5));
    });
    \u0275\u0275elementStart(1, "span", 37);
    \u0275\u0275template(2, MarketplaceComponent_Conditional_23_For_3_Case_2_Template, 5, 0)(3, MarketplaceComponent_Conditional_23_For_3_Case_3_Template, 6, 0)(4, MarketplaceComponent_Conditional_23_For_3_Case_4_Template, 5, 0)(5, MarketplaceComponent_Conditional_23_For_3_Case_5_Template, 4, 0)(6, MarketplaceComponent_Conditional_23_For_3_Case_6_Template, 4, 0)(7, MarketplaceComponent_Conditional_23_For_3_Case_7_Template, 6, 0)(8, MarketplaceComponent_Conditional_23_For_3_Case_8_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 38);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, MarketplaceComponent_Conditional_23_For_3_Conditional_11_Template, 1, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const cat_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeCategory() === cat_r5);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, (tmp_12_0 = cat_r5) === "all" ? 2 : tmp_12_0 === "gaming" ? 3 : tmp_12_0 === "streaming" ? 4 : tmp_12_0 === "shopping" ? 5 : tmp_12_0 === "topup" ? 6 : tmp_12_0 === "food" ? 7 : tmp_12_0 === "services" ? 8 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.categoryLabel(cat_r5));
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r1.activeCategory() === cat_r5 ? 11 : -1);
  }
}
function MarketplaceComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 21)(1, "div", 34);
    \u0275\u0275repeaterCreate(2, MarketplaceComponent_Conditional_23_For_3_Template, 12, 5, "button", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.categories);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.searchQuery.set(""));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 75);
    \u0275\u0275element(2, "line", 76)(3, "line", 77);
    \u0275\u0275elementEnd()();
  }
}
function MarketplaceComponent_Conditional_24_Conditional_7_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 81);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_7_For_5_Template_button_click_0_listener() {
      const brand_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.searchQuery.set(brand_r9));
    });
    \u0275\u0275elementStart(1, "img", 82);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_24_Conditional_7_For_5_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 83);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const brand_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.grouped()[brand_r9][0].image_url || "/brands/generic.svg", \u0275\u0275sanitizeUrl)("alt", brand_r9);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(brand_r9);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 78);
    \u0275\u0275text(2, "Shop by Brand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 79);
    \u0275\u0275repeaterCreate(4, MarketplaceComponent_Conditional_24_Conditional_7_For_5_Template, 4, 3, "button", 80, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.brandKeys());
  }
}
function MarketplaceComponent_Conditional_24_Conditional_8_For_2_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 115);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_8_For_2_Conditional_23_For_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const s_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.shopBrand(s_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "small");
    \u0275\u0275text(3, "SAR");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r14, " ");
  }
}
function MarketplaceComponent_Conditional_24_Conditional_8_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275repeaterCreate(1, MarketplaceComponent_Conditional_24_Conditional_8_For_2_Conditional_23_For_2_Template, 4, 1, "button", 114, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(s_r13.denominations);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 89)(4, "div", 90)(5, "span", 91);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 92);
    \u0275\u0275element(7, "polygon", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Instant delivery ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "span", 94);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 95);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "h2", 96);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 97)(16, "span", 98);
    \u0275\u0275text(17, "from");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 99);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 100);
    \u0275\u0275text(22, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, MarketplaceComponent_Conditional_24_Conditional_8_For_2_Conditional_23_Template, 3, 0, "div", 101);
    \u0275\u0275elementStart(24, "button", 102);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_8_For_2_Template_button_click_24_listener() {
      const s_r13 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.shopBrand(s_r13));
    });
    \u0275\u0275text(25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 103);
    \u0275\u0275element(27, "path", 104)(28, "path", 105);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(29, "div", 106)(30, "div", 107)(31, "div", 108);
    \u0275\u0275element(32, "div", 109)(33, "div", 110);
    \u0275\u0275elementStart(34, "img", 111);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_24_Conditional_8_For_2_Template_img_error_34_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 112);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(37, "div", 113);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("slide-fwd", ctx_r1.slideDir() === 1)("slide-bwd", ctx_r1.slideDir() === -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r13.brand);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.categoryLabel(s_r13.category));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", s_r13.itemCount, " variants");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r13.brand);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 15, s_r13.fromPrice, "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(23, s_r13.denominations.length > 0 ? 23 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Shop ", s_r13.brand, " ");
    \u0275\u0275advance(9);
    \u0275\u0275property("src", s_r13.logo, \u0275\u0275sanitizeUrl)("alt", s_r13.brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", s_r13.brand, " \xB7 ", ctx_r1.categoryLabel(s_r13.category), "");
  }
}
function MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_For_6_Template_button_click_0_listener() {
      const i_r17 = \u0275\u0275restoreView(_r16).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.goToSlide(i_r17));
    });
    \u0275\u0275element(1, "div", 123);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r17 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", i_r17 === ctx_r1.slideIndex());
    \u0275\u0275attribute("aria-label", "Slide " + (i_r17 + 1));
  }
}
function MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86)(1, "button", 116);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.nudgeSlide(-1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 103);
    \u0275\u0275element(3, "path", 117);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div", 118);
    \u0275\u0275repeaterCreate(5, MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_For_6_Template, 2, 3, "button", 119, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 120);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.nudgeSlide(1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 103);
    \u0275\u0275element(9, "path", 121);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.featuredBrands());
  }
}
function MarketplaceComponent_Conditional_24_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 84);
    \u0275\u0275listener("mouseenter", function MarketplaceComponent_Conditional_24_Conditional_8_Template_section_mouseenter_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pauseSlides(true));
    })("mouseleave", function MarketplaceComponent_Conditional_24_Conditional_8_Template_section_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pauseSlides(false));
    });
    \u0275\u0275repeaterCreate(1, MarketplaceComponent_Conditional_24_Conditional_8_For_2_Template, 38, 18, "div", 85, _forTrack0, true);
    \u0275\u0275template(3, MarketplaceComponent_Conditional_24_Conditional_8_Conditional_3_Template, 10, 0, "div", 86);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction1(1, _c0, ctx));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, ctx_r1.featuredBrands().length > 1 ? 3 : -1);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 124);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275repeaterCreate(1, MarketplaceComponent_Conditional_24_Conditional_10_For_2_Template, 1, 0, "div", 124, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function MarketplaceComponent_Conditional_24_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "div", 126);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 127);
    \u0275\u0275element(3, "path", 128)(4, "path", 129)(5, "path", 130)(6, "path", 131)(7, "path", 132);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9, "No products match your search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "Try a different category or clear the filters.");
    \u0275\u0275elementEnd()();
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 148);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 156);
    \u0275\u0275element(2, "polyline", 157);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.cartQty(p_r20.id), " in cart ");
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 151);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r20.name_ar);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 155);
    \u0275\u0275element(1, "polyline", 157);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 158);
    \u0275\u0275element(1, "line", 32)(2, "line", 33);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 140);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Template_article_click_0_listener($event) {
      const p_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openDetail(p_r20, $event));
    });
    \u0275\u0275elementStart(1, "div", 141)(2, "img", 142);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Template_img_error_2_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 143)(4, "button", 144);
    \u0275\u0275text(5, "View details");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 145)(7, "span", 146);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 147);
    \u0275\u0275text(11, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_12_Template, 4, 1, "div", 148);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 149)(14, "h3", 150);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_16_Template, 2, 1, "p", 151);
    \u0275\u0275elementStart(17, "div", 152)(18, "span", 153);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 154);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Template_button_click_20_listener($event) {
      const p_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addToCart(p_r20, $event));
    });
    \u0275\u0275template(21, MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_21_Template, 2, 0, ":svg:svg", 155)(22, MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Conditional_22_Template, 3, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", p_r20.image_url || "/brands/generic.svg", \u0275\u0275sanitizeUrl)("alt", p_r20.brand);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 11, p_r20.our_price, "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(12, ctx_r1.cartQty(p_r20.id) ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r20.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, p_r20.name_ar ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r20.region);
    \u0275\u0275advance();
    \u0275\u0275classProp("added", ctx_r1.cartQty(p_r20.id));
    \u0275\u0275attribute("aria-label", "Add " + p_r20.name + " to cart");
    \u0275\u0275advance();
    \u0275\u0275conditional(21, ctx_r1.cartQty(p_r20.id) ? 21 : 22);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 133)(1, "header", 134)(2, "img", 135);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_24_Conditional_12_For_1_Template_img_error_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 136);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 137);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 138);
    \u0275\u0275repeaterCreate(8, MarketplaceComponent_Conditional_24_Conditional_12_For_1_For_9_Template, 23, 14, "article", 139, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const brand_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.grouped()[brand_r21][0].image_url || "/brands/generic.svg", \u0275\u0275sanitizeUrl)("alt", brand_r21);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(brand_r21);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.grouped()[brand_r21].length, " ", ctx_r1.grouped()[brand_r21].length === 1 ? "item" : "items", "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.grouped()[brand_r21]);
  }
}
function MarketplaceComponent_Conditional_24_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MarketplaceComponent_Conditional_24_Conditional_12_For_1_Template, 10, 5, "section", 133, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.brandKeys());
  }
}
function MarketplaceComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 65);
    \u0275\u0275element(3, "circle", 66)(4, "path", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "input", 68);
    \u0275\u0275listener("input", function MarketplaceComponent_Conditional_24_Template_input_input_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSearch($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MarketplaceComponent_Conditional_24_Conditional_6_Template, 4, 0, "button", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, MarketplaceComponent_Conditional_24_Conditional_7_Template, 6, 0, "div", 70)(8, MarketplaceComponent_Conditional_24_Conditional_8_Template, 4, 3, "section", 71);
    \u0275\u0275elementStart(9, "div", 72);
    \u0275\u0275template(10, MarketplaceComponent_Conditional_24_Conditional_10_Template, 3, 1, "div", 73)(11, MarketplaceComponent_Conditional_24_Conditional_11_Template, 12, 0)(12, MarketplaceComponent_Conditional_24_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.searchQuery());
    \u0275\u0275advance();
    \u0275\u0275conditional(6, ctx_r1.searchQuery() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r1.brandKeys().length > 0 && !ctx_r1.searchQuery() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, (tmp_4_0 = ctx_r1.activeCategory() === "all" && !ctx_r1.searchQuery() && ctx_r1.currentSlide()) ? 8 : -1, tmp_4_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, ctx_r1.loading() ? 10 : ctx_r1.filtered().length === 0 ? 11 : 12);
  }
}
function MarketplaceComponent_Conditional_25_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 160);
  }
}
function MarketplaceComponent_Conditional_25_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 159);
    \u0275\u0275repeaterCreate(1, MarketplaceComponent_Conditional_25_Conditional_0_For_2_Template, 1, 0, "div", 160, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c2));
  }
}
function MarketplaceComponent_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 161)(1, "div", 126);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 127);
    \u0275\u0275element(3, "path", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "No orders yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Your purchase history will appear here after checkout.");
    \u0275\u0275elementEnd()();
  }
}
function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 166);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r23 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r23.product == null ? null : o_r23.product.name_ar);
  }
}
function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 171)(1, "code");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 172);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Conditional_0_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r24);
      const o_r23 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copyCode(ctx_r1.revealedCodes()[o_r23.id]));
    });
    \u0275\u0275text(4, "Copy");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r23 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.revealedCodes()[o_r23.id]);
  }
}
function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 173);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const o_r23 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.revealCode(o_r23.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r23 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.revealing() === o_r23.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.revealing() === o_r23.id ? "Revealing\u2026" : o_r23.revealed ? "Show again" : "Reveal code", " ");
  }
}
function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Conditional_0_Template, 5, 1, "div", 171)(1, MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Conditional_1_Template, 2, 2);
  }
  if (rf & 2) {
    const o_r23 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(0, ctx_r1.revealedCodes()[o_r23.id] ? 0 : 1);
  }
}
function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 162)(1, "img", 163);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_25_Conditional_2_For_2_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 164)(3, "p", 165);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_5_Template, 2, 1, "p", 166);
    \u0275\u0275elementStart(6, "p", 167);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275element(9, "span", 168);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275element(12, "span", 168);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 169)(16, "span", 170);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, MarketplaceComponent_Conditional_25_Conditional_2_For_2_Conditional_18_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r23 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", (o_r23.product == null ? null : o_r23.product.image_url) || "/brands/generic.svg", \u0275\u0275sanitizeUrl)("alt", (o_r23.product == null ? null : o_r23.product.brand) || "Product");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((o_r23.product == null ? null : o_r23.product.name) || "Product");
    \u0275\u0275advance();
    \u0275\u0275conditional(5, (o_r23.product == null ? null : o_r23.product.name_ar) ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 11, o_r23.created_at, "d MMM yyyy, HH:mm"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 14, o_r23.total_price, "1.2-2"), " SAR ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 17, o_r23.payment_method), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.statusClass(o_r23.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusLabel(o_r23.status));
    \u0275\u0275advance();
    \u0275\u0275conditional(18, o_r23.status === "completed" && o_r23.has_code ? 18 : -1);
  }
}
function MarketplaceComponent_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 159);
    \u0275\u0275repeaterCreate(1, MarketplaceComponent_Conditional_25_Conditional_2_For_2_Template, 19, 19, "article", 162, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.orders());
  }
}
function MarketplaceComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MarketplaceComponent_Conditional_25_Conditional_0_Template, 3, 1, "div", 159)(1, MarketplaceComponent_Conditional_25_Conditional_1_Template, 8, 0)(2, MarketplaceComponent_Conditional_25_Conditional_2_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r1.ordersLoading() ? 0 : ctx_r1.orders().length === 0 ? 1 : 2);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 178)(1, "div", 126);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 127);
    \u0275\u0275element(3, "circle", 17)(4, "circle", 18)(5, "path", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h4");
    \u0275\u0275text(7, "Your cart is empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Browse the store and add items to get started.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 179);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_9_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeCart());
    });
    \u0275\u0275text(11, "Continue shopping");
    \u0275\u0275elementEnd()();
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 190);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r30 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r30.product.name_ar);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 181)(1, "img", 187);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_26_Conditional_10_For_2_Template_img_error_1_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 188)(3, "p", 189);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, MarketplaceComponent_Conditional_26_Conditional_10_For_2_Conditional_5_Template, 2, 1, "p", 190);
    \u0275\u0275elementStart(6, "p", 191);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 192)(10, "button", 193);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_10_For_2_Template_button_click_10_listener() {
      const item_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateQty(item_r30.product.id, -1));
    });
    \u0275\u0275text(11, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 193);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_10_For_2_Template_button_click_14_listener() {
      const item_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateQty(item_r30.product.id, 1));
    });
    \u0275\u0275text(15, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 194);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_10_For_2_Template_button_click_16_listener() {
      const item_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeFromCart(item_r30.product.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 8);
    \u0275\u0275element(18, "polyline", 195)(19, "path", 196);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r30 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r30.product.image_url || "/brands/generic.svg", \u0275\u0275sanitizeUrl)("alt", item_r30.product.brand);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r30.product.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, item_r30.product.name_ar ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 6, item_r30.product.our_price, "1.0-2"), " SAR each");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r30.qty);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 26)(1, "path", 27)(2, "path", 28);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 199)(1, "line", 200);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 201)(1, "line", 202)(2, "line", 203);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "rect", 54)(1, "line", 55);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 198);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r31);
      const m_r32 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.paymentMethod.set(m_r32.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275template(2, MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_2_Template, 3, 0)(3, MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_3_Template, 2, 0)(4, MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_4_Template, 3, 0)(5, MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Case_5_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    const m_r32 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.paymentMethod() === m_r32.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, (tmp_14_0 = m_r32.id) === "wallet" ? 2 : tmp_14_0 === "card" ? 3 : tmp_14_0 === "mada" ? 4 : tmp_14_0 === "stc_pay" ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", m_r32.label, " ");
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MarketplaceComponent_Conditional_26_Conditional_10_For_14_Conditional_0_Template, 7, 4, "button", 197);
  }
  if (rf & 2) {
    const m_r32 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(0, m_r32.id !== "wallet" || ctx_r1.auth.isLoggedIn() ? 0 : -1);
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 185);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementStart(3, "button", 204);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_10_Conditional_15_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openTopUp());
    });
    \u0275\u0275text(4, "Top up");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Insufficient wallet balance \u2014 short by ", \u0275\u0275pipeBind2(2, 1, ctx_r1.shortfall(), "1.2-2"), " SAR. ");
  }
}
function MarketplaceComponent_Conditional_26_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 180);
    \u0275\u0275repeaterCreate(1, MarketplaceComponent_Conditional_26_Conditional_10_For_2_Template, 20, 9, "div", 181, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 182)(4, "div", 183)(5, "span");
    \u0275\u0275text(6, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementStart(10, "small");
    \u0275\u0275text(11, "SAR");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 184);
    \u0275\u0275repeaterCreate(13, MarketplaceComponent_Conditional_26_Conditional_10_For_14_Template, 1, 1, null, null, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, MarketplaceComponent_Conditional_26_Conditional_10_Conditional_15_Template, 5, 4, "p", 185);
    \u0275\u0275elementStart(16, "button", 186);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Conditional_10_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.checkout());
    });
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.cart());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 4, ctx_r1.cartTotal(), "1.2-2"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.payMethods);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(15, ctx_r1.paymentMethod() === "wallet" && !ctx_r1.canAfford() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.purchasing() || !ctx_r1.canAfford());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.purchasing() ? "Processing\u2026" : "Checkout \xB7 " + \u0275\u0275pipeBind2(18, 7, ctx_r1.cartTotal(), "1.2-2") + " SAR", " ");
  }
}
function MarketplaceComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCart());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "aside", 175)(2, "header", 176)(3, "h3");
    \u0275\u0275text(4, "Your cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 177);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_26_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCart());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 75);
    \u0275\u0275element(7, "line", 76)(8, "line", 77);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, MarketplaceComponent_Conditional_26_Conditional_9_Template, 12, 0, "div", 178)(10, MarketplaceComponent_Conditional_26_Conditional_10_Template, 19, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(9, ctx_r1.cart().length === 0 ? 9 : 10);
  }
}
function MarketplaceComponent_Conditional_27_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 220);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.paymentError());
  }
}
function MarketplaceComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_27_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPaymentModal.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 205)(2, "header", 206)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 207);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_27_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPaymentModal.set(false));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 75);
    \u0275\u0275element(7, "line", 76)(8, "line", 77);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 208)(10, "div", 209);
    \u0275\u0275element(11, "div", 210);
    \u0275\u0275elementStart(12, "p", 211);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 212)(15, "div")(16, "span");
    \u0275\u0275text(17, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "span");
    \u0275\u0275text(22, "Expires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 213)(26, "label", 214)(27, "span");
    \u0275\u0275text(28, "Card number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 215);
    \u0275\u0275listener("input", function MarketplaceComponent_Conditional_27_Template_input_input_29_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCardNumber($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label", 214)(31, "span");
    \u0275\u0275text(32, "Cardholder name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 216);
    \u0275\u0275twoWayListener("ngModelChange", function MarketplaceComponent_Conditional_27_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.cardName, $event) || (ctx_r1.cardName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "label", 217)(35, "span");
    \u0275\u0275text(36, "Expiry");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 218);
    \u0275\u0275listener("input", function MarketplaceComponent_Conditional_27_Template_input_input_37_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onExpiry($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "label", 217)(39, "span");
    \u0275\u0275text(40, "CVV");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 219);
    \u0275\u0275twoWayListener("ngModelChange", function MarketplaceComponent_Conditional_27_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.cardCvv, $event) || (ctx_r1.cardCvv = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(42, MarketplaceComponent_Conditional_27_Conditional_42_Template, 2, 1, "p", 220);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "footer", 221)(44, "button", 222);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_27_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPaymentModal.set(false));
    });
    \u0275\u0275text(45, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 223);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_27_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.processPayment());
    });
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.paymentMethod() === "mada" ? "Mada" : ctx_r1.paymentMethod() === "stc_pay" ? "STC Pay" : "Card", " payment");
    \u0275\u0275advance(6);
    \u0275\u0275attribute("data-brand", ctx_r1.cardBrand());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.cardDisplay());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.cardName || "CARDHOLDER");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.cardExpiry || "MM/YY");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.cardName);
    \u0275\u0275advance(8);
    \u0275\u0275property("type", ctx_r1.showCvv ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.cardCvv);
    \u0275\u0275advance();
    \u0275\u0275conditional(42, ctx_r1.paymentError() ? 42 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.paying());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.paying());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.paying() ? "Processing\u2026" : "Pay " + \u0275\u0275pipeBind2(48, 12, ctx_r1.cartTotal(), "1.2-2") + " SAR", " ");
  }
}
function MarketplaceComponent_Conditional_28_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 225)(1, "div", 226);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 227);
    \u0275\u0275element(3, "polyline", 157);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5, "Top-up successful");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 228);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Conditional_9_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showTopUp.set(false));
    });
    \u0275\u0275text(10, "Done");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("New balance: ", \u0275\u0275pipeBind2(8, 1, ctx_r1.walletBalance(), "1.2-2"), " SAR");
  }
}
function MarketplaceComponent_Conditional_28_Conditional_10_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 232);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Conditional_10_For_3_Template_button_click_0_listener() {
      const a_r39 = \u0275\u0275restoreView(_r38).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.topUpAmount.set(a_r39));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.topUpAmount() === a_r39);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", a_r39, " SAR");
  }
}
function MarketplaceComponent_Conditional_28_Conditional_10_For_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 198);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Conditional_10_For_10_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r40);
      const m_r41 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.topUpMethod.set(m_r41.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r41 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.topUpMethod() === m_r41.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r41.label, " ");
  }
}
function MarketplaceComponent_Conditional_28_Conditional_10_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MarketplaceComponent_Conditional_28_Conditional_10_For_10_Conditional_0_Template, 2, 3, "button", 197);
  }
  if (rf & 2) {
    const m_r41 = ctx.$implicit;
    \u0275\u0275conditional(0, m_r41.id !== "wallet" ? 0 : -1);
  }
}
function MarketplaceComponent_Conditional_28_Conditional_10_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 220);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.topUpError());
  }
}
function MarketplaceComponent_Conditional_28_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 208)(1, "div", 229);
    \u0275\u0275repeaterCreate(2, MarketplaceComponent_Conditional_28_Conditional_10_For_3_Template, 2, 3, "button", 230, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 214)(5, "span");
    \u0275\u0275text(6, "Or enter amount (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 231);
    \u0275\u0275listener("ngModelChange", function MarketplaceComponent_Conditional_28_Conditional_10_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.topUpAmount.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 184);
    \u0275\u0275repeaterCreate(9, MarketplaceComponent_Conditional_28_Conditional_10_For_10_Template, 1, 1, null, null, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 213)(12, "label", 214)(13, "span");
    \u0275\u0275text(14, "Card number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 215);
    \u0275\u0275listener("input", function MarketplaceComponent_Conditional_28_Conditional_10_Template_input_input_15_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCardNumber($event, "topup"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "label", 214)(17, "span");
    \u0275\u0275text(18, "Cardholder name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 216);
    \u0275\u0275twoWayListener("ngModelChange", function MarketplaceComponent_Conditional_28_Conditional_10_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.tuCardName, $event) || (ctx_r1.tuCardName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label", 217)(21, "span");
    \u0275\u0275text(22, "Expiry");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 218);
    \u0275\u0275listener("input", function MarketplaceComponent_Conditional_28_Conditional_10_Template_input_input_23_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onExpiry($event, "topup"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "label", 217)(25, "span");
    \u0275\u0275text(26, "CVV");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 219);
    \u0275\u0275twoWayListener("ngModelChange", function MarketplaceComponent_Conditional_28_Conditional_10_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.tuCardCvv, $event) || (ctx_r1.tuCardCvv = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(28, MarketplaceComponent_Conditional_28_Conditional_10_Conditional_28_Template, 2, 1, "p", 220);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "footer", 221)(30, "button", 222);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Conditional_10_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showTopUp.set(false));
    });
    \u0275\u0275text(31, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 223);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Conditional_10_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.processTopUp());
    });
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.topUpAmounts);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.topUpAmount());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.payMethods);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tuCardName);
    \u0275\u0275advance(8);
    \u0275\u0275property("type", ctx_r1.tuShowCvv ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tuCardCvv);
    \u0275\u0275advance();
    \u0275\u0275conditional(28, ctx_r1.topUpError() ? 28 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.topUpPaying());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.topUpPaying());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.topUpPaying() ? "Processing\u2026" : "Top up " + ctx_r1.topUpAmount() + " SAR", " ");
  }
}
function MarketplaceComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTopUp.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 224)(2, "header", 206)(3, "h3");
    \u0275\u0275text(4, "Top up wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 207);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_28_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTopUp.set(false));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 75);
    \u0275\u0275element(7, "line", 76)(8, "line", 77);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(9, MarketplaceComponent_Conditional_28_Conditional_9_Template, 11, 4, "div", 225)(10, MarketplaceComponent_Conditional_28_Conditional_10_Template, 34, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(9, ctx_r1.topUpSuccess() ? 9 : 10);
  }
}
function MarketplaceComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_29_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showLoginPrompt.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 233)(2, "header", 206)(3, "h3");
    \u0275\u0275text(4, "Sign in to check out");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 207);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_29_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showLoginPrompt.set(false));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 75);
    \u0275\u0275element(7, "line", 76)(8, "line", 77);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 208)(10, "p", 234);
    \u0275\u0275text(11, "Your cart is saved. Sign in to complete your purchase and we'll deliver your codes instantly.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "ul", 235)(13, "li");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 236);
    \u0275\u0275element(15, "polyline", 157);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Your cart will still be here ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "li");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 236);
    \u0275\u0275element(19, "polyline", 157);
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " One-tap purchases on future visits ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "li");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(22, "svg", 236);
    \u0275\u0275element(23, "polyline", 157);
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " Order history and reveal-on-demand codes ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(25, "footer", 221)(26, "button", 179);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_29_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showLoginPrompt.set(false));
    });
    \u0275\u0275text(27, "Keep shopping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "a", 237);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_29_Template_a_click_28_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showLoginPrompt.set(false));
    });
    \u0275\u0275text(29, "Sign in");
    \u0275\u0275elementEnd()()();
  }
}
function MarketplaceComponent_Conditional_30_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 250);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r44 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r44.name_ar);
  }
}
function MarketplaceComponent_Conditional_30_Conditional_70_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 276);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.giftEmailError());
  }
}
function MarketplaceComponent_Conditional_30_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 268)(1, "div", 274);
    \u0275\u0275text(2, "Recipient email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 275);
    \u0275\u0275listener("input", function MarketplaceComponent_Conditional_30_Conditional_70_Template_input_input_3_listener($event) {
      \u0275\u0275restoreView(_r45);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.giftEmail.set($event.target.value));
    })("keyup.enter", function MarketplaceComponent_Conditional_30_Conditional_70_Template_input_keyup_enter_3_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.buyAsGift());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, MarketplaceComponent_Conditional_30_Conditional_70_Conditional_4_Template, 2, 1, "span", 276);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.giftEmail());
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ctx_r1.giftEmailError() ? 4 : -1);
  }
}
function MarketplaceComponent_Conditional_30_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 277);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Conditional_72_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addDetailToCart());
    });
    \u0275\u0275text(1, "Add to cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 278);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Conditional_72_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.addDetailToCart();
      return \u0275\u0275resetView(ctx_r1.checkout());
    });
    \u0275\u0275text(3, "Buy now");
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_30_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 277);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Conditional_73_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleGift());
    });
    \u0275\u0275text(1, "Cancel gift");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 278);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Conditional_73_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.buyAsGift());
    });
    \u0275\u0275text(3, "Send as gift");
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 238)(2, "button", 239);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetail());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 75);
    \u0275\u0275element(4, "line", 76)(5, "line", 77);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 240)(7, "img", 241);
    \u0275\u0275listener("error", function MarketplaceComponent_Conditional_30_Template_img_error_7_listener($event) {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onImgError($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "div", 242);
    \u0275\u0275elementStart(9, "span", 243);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 244);
    \u0275\u0275element(11, "polygon", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " Instant delivery ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 245)(14, "div", 246)(15, "span", 247);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 248);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "h2", 249);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, MarketplaceComponent_Conditional_30_Conditional_21_Template, 2, 1, "p", 250);
    \u0275\u0275elementStart(22, "div", 251)(23, "div", 252)(24, "span", 253);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 254);
    \u0275\u0275text(28, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 255);
    \u0275\u0275text(30, " Face value: ");
    \u0275\u0275elementStart(31, "strong");
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 256)(35, "div", 257)(36, "span", 258);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 259);
    \u0275\u0275element(38, "rect", 260)(39, "path", 261);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(40, " Encrypted delivery ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(41, "div", 257)(42, "span", 258);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(43, "svg", 259);
    \u0275\u0275element(44, "polygon", 93);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(45, " Instant code ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(46, "div", 257)(47, "span", 258);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(48, "svg", 259);
    \u0275\u0275element(49, "path", 262);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(50, " No expiry ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(51, "div", 257)(52, "span", 258);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(53, "svg", 259);
    \u0275\u0275element(54, "rect", 260)(55, "path", 263);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(56, " Reveal anytime ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(57, "div", 264)(58, "span", 265);
    \u0275\u0275text(59, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 266)(61, "button", 193);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.detailQty.set(ctx_r1.detailQty() > 1 ? ctx_r1.detailQty() - 1 : 1));
    });
    \u0275\u0275text(62, "\u2212");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "span");
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 193);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Template_button_click_65_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.detailQty.set(ctx_r1.detailQty() + 1));
    });
    \u0275\u0275text(66, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "span", 267);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(70, MarketplaceComponent_Conditional_30_Conditional_70_Template, 5, 2, "div", 268);
    \u0275\u0275elementStart(71, "div", 269);
    \u0275\u0275template(72, MarketplaceComponent_Conditional_30_Conditional_72_Template, 4, 0)(73, MarketplaceComponent_Conditional_30_Conditional_73_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 270);
    \u0275\u0275listener("click", function MarketplaceComponent_Conditional_30_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleGift());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(75, "svg", 8);
    \u0275\u0275element(76, "polyline", 271)(77, "rect", 272)(78, "line", 273)(79, "path", 131)(80, "path", 132);
    \u0275\u0275elementEnd();
    \u0275\u0275text(81);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r44 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", p_r44.name);
    \u0275\u0275advance(6);
    \u0275\u0275property("src", p_r44.image_url || "/brands/generic.svg", \u0275\u0275sanitizeUrl)("alt", p_r44.brand);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(p_r44.brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r44.region);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r44.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, p_r44.name_ar ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(26, 15, p_r44.our_price, "1.0-0"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(33, 18, p_r44.face_value, "1.0-0"), " ", p_r44.currency, "");
    \u0275\u0275advance(32);
    \u0275\u0275textInterpolate(ctx_r1.detailQty());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(69, 21, p_r44.our_price * ctx_r1.detailQty(), "1.0-0"), " SAR total");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(70, ctx_r1.giftMode() ? 70 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(72, !ctx_r1.giftMode() ? 72 : 73);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", !ctx_r1.giftMode() ? "Send as a gift" : "Back to purchase", " ");
  }
}
function MarketplaceComponent_Conditional_31_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 281);
    \u0275\u0275element(1, "polyline", 157);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_31_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 281);
    \u0275\u0275element(1, "path", 282)(2, "line", 283)(3, "line", 284);
    \u0275\u0275elementEnd();
  }
}
function MarketplaceComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 279)(1, "span", 280);
    \u0275\u0275template(2, MarketplaceComponent_Conditional_31_Conditional_2_Template, 2, 0, ":svg:svg", 281)(3, MarketplaceComponent_Conditional_31_Conditional_3_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r48 = ctx;
    \u0275\u0275classProp("toast--ok", t_r48.ok)("toast--err", !t_r48.ok);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, t_r48.ok ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", t_r48.msg, " ");
  }
}
var MarketplaceComponent = class _MarketplaceComponent {
  constructor() {
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.products = signal([]);
    this.orders = signal([]);
    this.walletBalance = signal(0);
    this.loading = signal(true);
    this.ordersLoading = signal(false);
    this.activeCategory = signal("all");
    this.activeTab = signal("store");
    this.searchQuery = signal("");
    this.CART_STORAGE_KEY = "dawri.marketplace.cart.v1";
    this.cart = signal([]);
    this.showCart = signal(false);
    this.paymentMethod = signal("card");
    this.purchasing = signal(false);
    this.showLoginPrompt = signal(false);
    this.currentIdempotencyKey = null;
    this.showPaymentModal = signal(false);
    this.paymentError = signal(null);
    this.paying = signal(false);
    this.cardNumber = "";
    this.cardName = "";
    this.cardExpiry = "";
    this.cardCvv = "";
    this.showCvv = false;
    this.showTopUp = signal(false);
    this.topUpAmount = signal(100);
    this.topUpMethod = signal("card");
    this.topUpPaying = signal(false);
    this.topUpError = signal(null);
    this.topUpSuccess = signal(false);
    this.tuCardNumber = "";
    this.tuCardName = "";
    this.tuCardExpiry = "";
    this.tuCardCvv = "";
    this.tuShowCvv = false;
    this.showDetail = signal(false);
    this.detailProduct = signal(null);
    this.detailQty = signal(1);
    this.giftMode = signal(false);
    this.giftEmail = signal("");
    this.giftEmailError = signal("");
    this.revealedCodes = signal({});
    this.revealing = signal(null);
    this.toast = signal(null);
    this.categories = ["all", "gaming", "streaming", "shopping", "topup", "food", "services"];
    this.payMethods = [
      { id: "wallet", label: "Wallet", icon: "\u{1F45B}" },
      { id: "card", label: "Card", icon: "\u{1F4B3}" },
      { id: "mada", label: "Mada", icon: "\u{1F3E7}" },
      { id: "stc_pay", label: "STC Pay", icon: "\u{1F4F1}" }
    ];
    this.topUpAmounts = [50, 100, 200, 500, 1e3];
    this.STATUS_LABELS = {
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      refunded: "Refunded"
    };
    this.filtered = computed(() => {
      const q = this.searchQuery().toLowerCase();
      return this.products().filter((p) => {
        const matchCat = this.activeCategory() === "all" || p.category === this.activeCategory();
        const matchQ = !q || p.name.toLowerCase().includes(q) || (p.name_ar ?? "").toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
        return matchCat && matchQ;
      });
    });
    this.grouped = computed(() => {
      const map = {};
      for (const p of this.filtered())
        (map[p.brand] ??= []).push(p);
      return map;
    });
    this.slideIndex = signal(0);
    this.slideDir = signal(1);
    this.rotateHandle = null;
    this.slidePaused = signal(false);
    this.featuredBrands = computed(() => {
      const MAX_SLIDES = 5;
      const map = {};
      for (const p of this.products())
        (map[p.brand] ??= []).push(p);
      return Object.entries(map).sort(([, a], [, b]) => b.length - a.length).slice(0, MAX_SLIDES).map(([brand, items]) => {
        const headline = items.reduce((top, p) => p.our_price > top.our_price ? p : top, items[0]);
        const fromPrice = items.reduce((lo, p) => p.our_price < lo ? p.our_price : lo, items[0].our_price);
        const denominations = [...new Set(items.map((p) => p.face_value))].sort((a, b) => a - b).slice(0, 5);
        return {
          brand,
          itemCount: items.length,
          headline,
          logo: headline.image_url ?? "/brands/generic.svg",
          category: headline.category,
          fromPrice,
          denominations
        };
      });
    });
    this.currentSlide = computed(() => {
      const slides = this.featuredBrands();
      if (slides.length === 0)
        return null;
      const idx = Math.min(this.slideIndex(), slides.length - 1);
      return slides[idx];
    });
    this.cartCount = computed(() => this.cart().reduce((s, i) => s + i.qty, 0));
    this.cartTotal = computed(() => this.cart().reduce((s, i) => s + i.product.our_price * i.qty, 0));
    this.canAfford = computed(() => this.paymentMethod() !== "wallet" || this.walletBalance() >= this.cartTotal());
    this.shortfall = computed(() => Math.max(0, this.cartTotal() - this.walletBalance()));
  }
  openDetail(p, e) {
    e.stopPropagation();
    this.detailProduct.set(p);
    this.detailQty.set(1);
    this.showDetail.set(true);
  }
  closeDetail() {
    this.showDetail.set(false);
  }
  addDetailToCart() {
    const p = this.detailProduct();
    if (!p)
      return;
    for (let i = 0; i < this.detailQty(); i++)
      this.addToCart(p);
    this.closeDetail();
    this.openCart();
  }
  toggleGift() {
    this.giftMode.update((v) => !v);
    this.giftEmail.set("");
    this.giftEmailError.set("");
  }
  buyAsGift() {
    const email = this.giftEmail().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      this.giftEmailError.set("Please enter recipient email.");
      return;
    }
    if (!emailRegex.test(email)) {
      this.giftEmailError.set("Please enter a valid email address.");
      return;
    }
    this.giftEmailError.set("");
    const p = this.detailProduct();
    if (!p)
      return;
    for (let i = 0; i < this.detailQty(); i++)
      this.addToCart(p);
    this.closeDetail();
    this.notify(`Gift will be sent to ${email} after checkout.`, true);
    this.openCart();
  }
  /**
   * Map a backend category value to its user-facing label.
   * Most categories titlecase fine; the special-cases live here.
   *
   * @param cat  Backend category value (e.g. 'topup').
   * @returns    Display label (e.g. 'Top-up').
   */
  categoryLabel(cat) {
    if (cat === "topup")
      return "Top-up";
    if (cat === "all")
      return "All";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }
  /**
   * Emoji icon for each category — used in the sidebar navigation cards.
   * Kept inline (not externalised) because the set is small and rarely
   * changes; an svg-icon system would be over-engineering here.
   *
   * @param cat  Backend category value.
   * @returns    Emoji string suitable for inline rendering.
   */
  categoryIcon(cat) {
    switch (cat) {
      case "all":
        return "\u2728";
      case "gaming":
        return "\u{1F3AE}";
      case "streaming":
        return "\u{1F4FA}";
      case "shopping":
        return "\u{1F6CD}\uFE0F";
      case "topup":
        return "\u{1F4F1}";
      case "food":
        return "\u{1F354}";
      case "services":
        return "\u2699\uFE0F";
      default:
        return "\u{1F3F7}\uFE0F";
    }
  }
  brandKeys() {
    return Object.keys(this.grouped());
  }
  /** Manual nav: jump to a specific dot. Resets the auto-rotate timer. */
  goToSlide(i) {
    if (i === this.slideIndex())
      return;
    this.slideDir.set(i > this.slideIndex() ? 1 : -1);
    this.slideIndex.set(i);
    this.restartRotation();
  }
  /** Manual nav: previous/next arrows. Wraps around the ends. */
  nudgeSlide(delta) {
    const len = this.featuredBrands().length;
    if (len === 0)
      return;
    this.slideDir.set(delta);
    this.slideIndex.set((this.slideIndex() + delta + len) % len);
    this.restartRotation();
  }
  /** Pause auto-rotate while the carousel is hovered (better UX). */
  pauseSlides(paused) {
    this.slidePaused.set(paused);
  }
  /** "Shop {brand}" CTA — filters the list to that brand's category. */
  shopBrand(slide) {
    this.activeCategory.set(slide.category);
    this.searchQuery.set(slide.brand);
    queueMicrotask(() => {
      const grid = document.querySelector(".brand-section");
      grid?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  restartRotation() {
    if (this.rotateHandle) {
      clearInterval(this.rotateHandle);
    }
    this.rotateHandle = setInterval(() => {
      if (this.slidePaused())
        return;
      const len = this.featuredBrands().length;
      if (len <= 1)
        return;
      this.slideDir.set(1);
      this.slideIndex.set((this.slideIndex() + 1) % len);
    }, 5e3);
  }
  cartQty(productId) {
    return this.cart().find((i) => i.product.id === productId)?.qty ?? 0;
  }
  // ── Card UI helpers ─────────────────────────────────────────────────────────
  cardDisplay() {
    const n = this.cardNumber.replace(/\s/g, "");
    return n.padEnd(16, "\u2022").match(/.{1,4}/g)?.join(" ") ?? "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022";
  }
  cardBrand() {
    const n = this.cardNumber.replace(/\s/g, "");
    if (n.startsWith("4"))
      return "visa";
    if (n.startsWith("5") || n.startsWith("2"))
      return "mc";
    return "generic";
  }
  onCardNumber(e, target = "checkout") {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const fmt = raw.match(/.{1,4}/g)?.join(" ") ?? raw;
    if (target === "checkout")
      this.cardNumber = fmt;
    else
      this.tuCardNumber = fmt;
    e.target.value = fmt;
  }
  onExpiry(e, target = "checkout") {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2)
      val = val.slice(0, 2) + "/" + val.slice(2);
    if (target === "checkout")
      this.cardExpiry = val;
    else
      this.tuCardExpiry = val;
    e.target.value = val;
  }
  /**
   * Image load-failure handler. When a product image_url returns 404 or
   * fails to load (network error, CORS, unreachable host), swap the src
   * to the local generic placeholder so the user doesn't see a browser
   * broken-image icon.
   *
   * Guards against an infinite loop if the placeholder itself fails by
   * checking the current src — if the swap was already applied, do
   * nothing further.
   */
  onImgError(e) {
    const img = e.target;
    if (!img)
      return;
    const placeholder = "/brands/generic.svg";
    if (img.src.endsWith(placeholder))
      return;
    img.src = placeholder;
  }
  // ── Lifecycle ────────────────────────────────────────────────────────────────
  ngOnInit() {
    this.loadProducts();
    if (this.auth.isLoggedIn())
      this.loadWallet();
    this.restartRotation();
  }
  ngOnDestroy() {
    if (this.rotateHandle) {
      clearInterval(this.rotateHandle);
      this.rotateHandle = null;
    }
  }
  loadProducts() {
    this.loading.set(true);
    this.api.getProducts().pipe(catchError(() => of({ data: [], meta: null, links: null }))).subscribe((r) => {
      this.products.set(r.data ?? []);
      this.loading.set(false);
      this.hydrateCart();
    });
  }
  /**
   * Refresh the wallet balance from the API.
   *
   * Pushes the result to BOTH the local component signal (for the
   * marketplace hero badge) AND the AuthService signal (for the top-nav
   * balance + any other consumer). Without the auth.updateBalance() call,
   * the nav balance goes stale after every purchase / top-up.
   */
  loadWallet() {
    this.api.getWallet().pipe(catchError(() => of({ data: { balance: 0, currency: "SAR", transactions: [] } }))).subscribe((r) => {
      const balance = r.data?.balance ?? 0;
      this.walletBalance.set(balance);
      this.auth.updateBalance(balance);
    });
  }
  loadOrders() {
    this.ordersLoading.set(true);
    this.api.getOrders().pipe(catchError(() => of({ data: [], meta: null, links: null }))).subscribe((r) => {
      this.orders.set(r.data ?? []);
      this.ordersLoading.set(false);
    });
  }
  switchTab(tab) {
    this.activeTab.set(tab);
    if (tab === "orders" && this.orders().length === 0)
      this.loadOrders();
  }
  // ── Cart ─────────────────────────────────────────────────────────────────────
  //
  // Cart works for both guests and logged-in users. State persists across
  // page reloads via localStorage. Authentication is required only at
  // checkout — see checkout() for the prompt.
  //
  // Persistence rules:
  //   - Only { productId, qty } pairs are stored.
  //   - Product details are re-resolved from this.products() at hydrate time.
  //   - Storage failures (private mode, quota) degrade gracefully to in-memory.
  addToCart(p, e) {
    e?.stopPropagation();
    this.cart.update((items) => {
      const existing = items.find((i) => i.product.id === p.id);
      if (existing)
        return items.map((i) => i.product.id === p.id ? __spreadProps(__spreadValues({}, i), { qty: i.qty + 1 }) : i);
      return [...items, { product: p, qty: 1 }];
    });
    this.persistCart();
    this.notify(`${p.name} added to cart`, true);
  }
  removeFromCart(productId) {
    this.cart.update((items) => items.filter((i) => i.product.id !== productId));
    this.persistCart();
  }
  updateQty(productId, delta) {
    this.cart.update((items) => items.map((i) => i.product.id === productId ? __spreadProps(__spreadValues({}, i), { qty: i.qty + delta }) : i).filter((i) => i.qty > 0));
    this.persistCart();
  }
  clearCart() {
    this.cart.set([]);
    this.persistCart();
  }
  openCart() {
    this.showCart.set(true);
  }
  closeCart() {
    this.showCart.set(false);
  }
  // ── Cart persistence (localStorage) ─────────────────────────────────────────
  /**
   * Serialise the cart to localStorage. Stores only productId + qty so we
   * don't pin stale price/name data between sessions. Silently swallows
   * storage errors (quota exceeded, private-mode unavailability) — the
   * cart still works in-memory for the current session.
   */
  persistCart() {
    try {
      const payload = this.cart().map((i) => ({ id: i.product.id, qty: i.qty }));
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("[marketplace] cart persistence unavailable:", err);
    }
  }
  /**
   * Re-hydrate the cart from localStorage. Must be called AFTER products()
   * is populated so we can resolve productIds → full Product objects.
   * Silently drops any stored productIds that no longer exist in the
   * fetched product list (e.g. a product was retired between sessions).
   */
  hydrateCart() {
    let stored = [];
    try {
      const raw = localStorage.getItem(this.CART_STORAGE_KEY);
      if (!raw)
        return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed))
        return;
      stored = parsed.filter((x) => x && typeof x.id === "string" && typeof x.qty === "number" && x.qty > 0);
    } catch (err) {
      console.warn("[marketplace] cart hydrate failed:", err);
      return;
    }
    if (stored.length === 0)
      return;
    const byId = new Map(this.products().map((p) => [p.id, p]));
    const restored = [];
    for (const entry of stored) {
      const product = byId.get(entry.id);
      if (product)
        restored.push({ product, qty: entry.qty });
    }
    if (restored.length > 0) {
      this.cart.set(restored);
    }
    if (restored.length !== stored.length) {
      this.persistCart();
    }
  }
  // ── Checkout ─────────────────────────────────────────────────────────────────
  checkout() {
    if (this.cart().length === 0)
      return;
    if (!this.auth.isLoggedIn()) {
      this.showLoginPrompt.set(true);
      return;
    }
    if (this.paymentMethod() === "wallet" && !this.canAfford()) {
      this.notify("Insufficient wallet balance.", false);
      return;
    }
    this.currentIdempotencyKey = this.generateIdempotencyKey();
    if (this.paymentMethod() !== "wallet") {
      this.showPaymentModal.set(true);
      this.paymentError.set(null);
      this.cardNumber = "";
      this.cardName = "";
      this.cardExpiry = "";
      this.cardCvv = "";
      return;
    }
    this.processCheckout();
  }
  processPayment() {
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
      this.paying.set(false);
      this.showPaymentModal.set(false);
      this.processCheckout();
    }, 1200);
  }
  /**
   * BATCHED checkout — single API call fulfils the whole cart.
   * Fixes the previous N-sequential-request pattern.
   */
  processCheckout() {
    this.purchasing.set(true);
    const items = this.cart().map((i) => ({ product_id: i.product.id, qty: i.qty }));
    const payload = {
      items,
      payment_method: this.paymentMethod(),
      idempotency_key: this.currentIdempotencyKey
    };
    this.api.placeOrderBatch(payload).pipe(catchError((err) => {
      this.notify(err?.error?.message ?? "Checkout failed.", false);
      return of(null);
    })).subscribe((res) => {
      this.purchasing.set(false);
      if (!res)
        return;
      const summary = res.summary ?? { completed: items.length, failed: 0 };
      this.loadWallet();
      this.clearCart();
      this.closeCart();
      this.switchTab("orders");
      this.loadOrders();
      this.currentIdempotencyKey = null;
      if (summary.failed === 0) {
        this.notify(`${summary.completed} item(s) purchased!`, true);
      } else {
        this.notify(`${summary.completed} purchased, ${summary.failed} refunded.`, false);
      }
    });
  }
  // ── Wallet top-up ────────────────────────────────────────────────────────────
  openTopUp() {
    if (!this.auth.isLoggedIn()) {
      this.notify("Please sign in first.", false);
      return;
    }
    this.showTopUp.set(true);
    this.topUpSuccess.set(false);
    this.topUpError.set(null);
    this.tuCardNumber = "";
    this.tuCardName = "";
    this.tuCardExpiry = "";
    this.tuCardCvv = "";
  }
  processTopUp() {
    if (this.topUpAmount() < 10) {
      this.topUpError.set("Minimum top-up is 10 SAR.");
      return;
    }
    const rawNum = this.tuCardNumber.replace(/\s/g, "");
    if (rawNum.length < 13) {
      this.topUpError.set("Please enter a valid card number.");
      return;
    }
    if (!this.tuCardName.trim()) {
      this.topUpError.set("Please enter the cardholder name.");
      return;
    }
    if (this.tuCardExpiry.length < 5) {
      this.topUpError.set("Please enter a valid expiry date.");
      return;
    }
    if (this.tuCardCvv.length < 3) {
      this.topUpError.set("Please enter a valid CVV.");
      return;
    }
    this.topUpError.set(null);
    this.topUpPaying.set(true);
    const key = this.generateIdempotencyKey();
    setTimeout(() => {
      this.api.topUpWallet(this.topUpAmount(), this.topUpMethod(), key).pipe(catchError((err) => {
        this.topUpError.set(err?.error?.message ?? "Top-up failed.");
        this.topUpPaying.set(false);
        return of(null);
      })).subscribe((res) => {
        this.topUpPaying.set(false);
        if (res) {
          this.topUpSuccess.set(true);
          this.loadWallet();
        }
      });
    }, 1200);
  }
  // ── Code reveal ──────────────────────────────────────────────────────────────
  revealCode(orderId) {
    this.revealing.set(orderId);
    this.api.revealCode(orderId).pipe(catchError((err) => {
      this.notify(err?.error?.message ?? "Could not reveal.", false);
      this.revealing.set(null);
      return of(null);
    })).subscribe((res) => {
      if (!res)
        return;
      const typed = res;
      this.revealedCodes.update((c) => __spreadProps(__spreadValues({}, c), { [orderId]: typed.data.code }));
      this.revealing.set(null);
    });
  }
  copyCode(code) {
    navigator.clipboard.writeText(code).then(() => this.notify("Copied!", true));
  }
  // ── Helpers ──────────────────────────────────────────────────────────────────
  setSearch(e) {
    this.searchQuery.set(e.target.value);
  }
  statusClass(s) {
    return s === "completed" ? "status-ok" : s === "failed" ? "status-err" : s === "refunded" ? "status-ref" : "status-pend";
  }
  statusLabel(s) {
    return this.STATUS_LABELS[s] ?? s;
  }
  generateIdempotencyKey() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return "k-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }
  notify(msg, ok) {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3e3);
  }
  static {
    this.\u0275fac = function MarketplaceComponent_Factory(t) {
      return new (t || _MarketplaceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketplaceComponent, selectors: [["app-marketplace"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 15, consts: [[1, "mp-page"], ["aria-hidden", "true", 1, "mp-bg"], [1, "mp-bg__orb", "mp-bg__orb--gold"], [1, "mp-bg__orb", "mp-bg__orb--green"], [1, "mp-inner"], [1, "mp-topbar"], ["role", "tablist", 1, "mp-tabs"], ["type", "button", "role", "tab", 1, "mp-tab", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["d", "M16 10a4 4 0 0 1-8 0"], ["type", "button", "role", "tab", 1, "mp-tab", 3, "active"], [1, "mp-topbar__actions"], ["type", "button", 1, "wallet-badge"], ["type", "button", 1, "cart-btn", 3, "click", "disabled"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "9", "cy", "21", "r", "1"], ["cx", "20", "cy", "21", "r", "1"], ["d", "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"], [1, "cart-count"], ["aria-label", "Categories", 1, "cat-strip"], ["role", "status", 1, "toast", 3, "toast--ok", "toast--err"], ["d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"], ["type", "button", 1, "wallet-badge", 3, "click"], [1, "wallet-icon"], ["d", "M21 12V7H5a2 2 0 0 1 0-4h14v4"], ["d", "M3 5v14a2 2 0 0 0 2 2h16v-5"], ["d", "M18 12a2 2 0 0 0 0 4h4v-4Z"], [1, "wallet-val"], [1, "wallet-plus"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "cat-strip__scroll"], ["type", "button", 1, "cat-tile", 3, "active"], ["type", "button", 1, "cat-tile", 3, "click"], ["aria-hidden", "true", 1, "cat-tile__icon"], [1, "cat-tile__label"], [1, "cat-tile__dot"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], ["x1", "6", "y1", "12", "x2", "10", "y2", "12"], ["x1", "8", "y1", "10", "x2", "8", "y2", "14"], ["x1", "15", "y1", "11", "x2", "15.01", "y2", "11"], ["x1", "18", "y1", "13", "x2", "18.01", "y2", "13"], ["d", "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"], ["d", "M21 2H3v16h5l3 3 3-3h7V2z"], ["x1", "8", "y1", "9", "x2", "8.01", "y2", "9"], ["x1", "12", "y1", "9", "x2", "12.01", "y2", "9"], ["x1", "16", "y1", "9", "x2", "16.01", "y2", "9"], ["x", "5", "y", "2", "width", "14", "height", "20", "rx", "2", "ry", "2"], ["x1", "12", "y1", "18", "x2", "12.01", "y2", "18"], ["x1", "9", "y1", "7", "x2", "15", "y2", "7"], ["d", "M18 8h1a4 4 0 0 1 0 8h-1"], ["d", "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"], ["x1", "6", "y1", "1", "x2", "6", "y2", "4"], ["x1", "10", "y1", "1", "x2", "10", "y2", "4"], ["x1", "14", "y1", "1", "x2", "14", "y2", "4"], ["d", "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"], [1, "mp-search"], [1, "search-box"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "text", "placeholder", "Search brands or products\u2026", 1, "search-input", 3, "input", "value"], ["type", "button", "aria-label", "Clear search", 1, "search-clear"], [1, "brand-rail"], ["aria-roledescription", "carousel", "aria-label", "Featured brands", 1, "spotlight"], [1, "mp-main", "mp-main--full"], [1, "mp-skeleton"], ["type", "button", "aria-label", "Clear search", 1, "search-clear", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "brand-rail__label"], [1, "brand-rail__scroll"], ["type", "button", 1, "brand-pill"], ["type", "button", 1, "brand-pill", 3, "click"], ["loading", "lazy", 1, "brand-pill__img", 3, "error", "src", "alt"], [1, "brand-pill__name"], ["aria-roledescription", "carousel", "aria-label", "Featured brands", 1, "spotlight", 3, "mouseenter", "mouseleave"], [1, "spotlight__card", 3, "slide-fwd", "slide-bwd"], [1, "spotlight__nav"], [1, "spotlight__card"], ["aria-hidden", "true", 1, "spotlight__watermark"], [1, "spotlight__left"], [1, "spotlight__pills"], [1, "s-pill"], ["width", "9", "height", "9", "viewBox", "0 0 24 24", "fill", "currentColor"], ["points", "13 2 3 14 12 14 11 22 21 10 12 10 13 2"], [1, "s-pill", "s-pill--cat"], [1, "s-pill", "s-pill--count"], [1, "spotlight__brand"], [1, "spotlight__price"], [1, "sp-from"], [1, "sp-num"], [1, "sp-ccy"], [1, "spotlight__denoms"], ["type", "button", 1, "spotlight__cta", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M5 12h14"], ["d", "m12 5 7 7-7 7"], [1, "spotlight__right"], [1, "spotlight__card-3d"], [1, "spotlight__card-face"], [1, "spotlight__card-shine"], [1, "spotlight__card-chip"], ["loading", "eager", 1, "spotlight__card-logo", 3, "error", "src", "alt"], [1, "spotlight__card-band"], [1, "spotlight__card-shadow"], ["type", "button", 1, "s-denom"], ["type", "button", 1, "s-denom", 3, "click"], ["type", "button", "aria-label", "Previous", 1, "spotlight__arrow", 3, "click"], ["d", "m15 18-6-6 6-6"], ["role", "tablist", 1, "spotlight__progress"], ["type", "button", "role", "tab", 1, "spotlight__prog-track", 3, "active"], ["type", "button", "aria-label", "Next", 1, "spotlight__arrow", 3, "click"], ["d", "m9 18 6-6-6-6"], ["type", "button", "role", "tab", 1, "spotlight__prog-track", 3, "click"], [1, "spotlight__prog-fill"], [1, "skel-card"], [1, "mp-empty"], [1, "empty-icon"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M20 12V22H4V12"], ["d", "M22 7H2v5h20V7z"], ["d", "M12 22V7"], ["d", "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"], ["d", "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"], [1, "brand-section"], [1, "brand-head"], ["loading", "lazy", 1, "brand-logo", 3, "error", "src", "alt"], [1, "brand-name"], [1, "brand-count"], [1, "product-grid"], [1, "product-card"], [1, "product-card", 3, "click"], [1, "product-art"], ["loading", "lazy", 3, "error", "src", "alt"], [1, "product-art__overlay"], ["type", "button", 1, "quick-view-btn"], [1, "product-price-badge"], [1, "price-num"], [1, "price-ccy"], [1, "in-cart-badge"], [1, "product-card__body"], [1, "product-name"], ["dir", "rtl", "lang", "ar", 1, "product-name-ar"], [1, "product-foot"], [1, "product-region"], ["type", "button", 1, "product-cta", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round"], [1, "orders-list"], [1, "skel-row"], [1, "mp-empty", "mp-empty--orders"], [1, "order-row"], [1, "order-logo", 3, "error", "src", "alt"], [1, "order-main"], [1, "order-name"], ["dir", "rtl", "lang", "ar", 1, "order-name-ar"], [1, "order-meta"], [1, "dot"], [1, "order-right"], [1, "order-status"], [1, "code-block"], ["type", "button", 1, "code-copy", 3, "click"], ["type", "button", 1, "reveal-btn", 3, "click", "disabled"], [1, "modal-back", 3, "click"], ["role", "dialog", "aria-label", "Cart", 1, "cart-drawer"], [1, "cart-head"], ["type", "button", "aria-label", "Close", 1, "cart-close", 3, "click"], [1, "cart-empty"], ["type", "button", 1, "btn-ghost", 3, "click"], [1, "cart-items"], [1, "cart-item"], [1, "cart-foot"], [1, "cart-total"], [1, "pay-chips"], [1, "cart-warn"], ["type", "button", 1, "btn-checkout", 3, "click", "disabled"], [1, "cart-item-img", 3, "error", "src", "alt"], [1, "cart-item-info"], [1, "cart-item-name"], ["dir", "rtl", "lang", "ar", 1, "cart-item-name-ar"], [1, "cart-item-price"], [1, "cart-item-qty"], ["type", "button", 3, "click"], ["type", "button", "aria-label", "Remove", 1, "cart-item-rm", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"], ["type", "button", 1, "pay-chip", 3, "active"], ["type", "button", 1, "pay-chip", 3, "click"], ["x", "1", "y", "4", "width", "22", "height", "16", "rx", "2", "ry", "2"], ["x1", "1", "y1", "10", "x2", "23", "y2", "10"], ["x", "2", "y", "5", "width", "20", "height", "14", "rx", "2"], ["x1", "2", "y1", "10", "x2", "22", "y2", "10"], ["x1", "7", "y1", "15", "x2", "7.01", "y2", "15"], ["type", "button", 1, "topup-link", 3, "click"], ["role", "dialog", "aria-label", "Card payment", 1, "modal"], [1, "modal-head"], ["type", "button", "aria-label", "Close", 1, "modal-close", 3, "click"], [1, "modal-body"], [1, "card-visual"], [1, "card-visual-chip"], [1, "card-visual-num"], [1, "card-visual-row"], [1, "form-grid"], [1, "form-field"], ["type", "text", "inputmode", "numeric", "maxlength", "19", "placeholder", "1234 5678 9012 3456", 3, "input"], ["type", "text", "placeholder", "As shown on card", 3, "ngModelChange", "ngModel"], [1, "form-field", "form-field--half"], ["type", "text", "inputmode", "numeric", "maxlength", "5", "placeholder", "MM/YY", 3, "input"], ["inputmode", "numeric", "maxlength", "4", "placeholder", "\u2022\u2022\u2022", 3, "ngModelChange", "type", "ngModel"], [1, "form-error"], [1, "modal-foot"], ["type", "button", 1, "btn-ghost", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], ["role", "dialog", "aria-label", "Top up wallet", 1, "modal"], [1, "topup-success"], [1, "big-check"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["type", "button", 1, "btn-primary", 3, "click"], [1, "amt-chips"], ["type", "button", 1, "amt-chip", 3, "active"], ["type", "number", "min", "10", "max", "10000", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "amt-chip", 3, "click"], ["role", "dialog", "aria-label", "Sign in required", 1, "modal", "modal--prompt"], [1, "prompt-line"], [1, "prompt-bullets"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["routerLink", "/auth", 1, "btn-primary", 3, "click"], ["role", "dialog", 1, "detail-modal"], ["type", "button", "aria-label", "Close", 1, "modal-close", "detail-close", 3, "click"], [1, "detail-art"], [3, "error", "src", "alt"], [1, "detail-art-glow"], [1, "detail-instant-badge"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "currentColor"], [1, "detail-body"], [1, "detail-meta"], [1, "detail-brand"], [1, "detail-region"], [1, "detail-name"], ["dir", "rtl", "lang", "ar", 1, "detail-name-ar"], [1, "detail-price-row"], [1, "detail-price"], [1, "detail-price-num"], [1, "detail-price-ccy"], [1, "detail-face"], [1, "detail-features"], [1, "detail-feat"], [1, "feat-icon"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], ["d", "M7 11V7a5 5 0 0 1 9.9-1"], [1, "detail-qty-row"], [1, "detail-qty-label"], [1, "detail-qty-ctrl"], [1, "detail-qty-total"], [1, "gift-input-wrap"], [1, "detail-actions"], ["type", "button", 1, "gift-toggle-btn", 3, "click"], ["points", "20 12 20 22 4 22 4 12"], ["x", "2", "y", "7", "width", "20", "height", "5"], ["x1", "12", "y1", "22", "x2", "12", "y2", "7"], [1, "gift-input-label"], ["type", "email", "placeholder", "friend@example.com", 1, "gift-email-input", 3, "input", "keyup.enter", "value"], [1, "gift-email-error"], ["type", "button", 1, "detail-btn-cart", 3, "click"], ["type", "button", 1, "detail-btn-buy", 3, "click"], ["role", "status", 1, "toast"], [1, "toast-icon"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"]], template: function MarketplaceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "nav", 6)(7, "button", 7);
        \u0275\u0275listener("click", function MarketplaceComponent_Template_button_click_7_listener() {
          return ctx.switchTab("store");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "path", 9)(10, "line", 10)(11, "path", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275text(12, " Store ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, MarketplaceComponent_Conditional_13_Template, 4, 2, "button", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(14, "div", 13);
        \u0275\u0275template(15, MarketplaceComponent_Conditional_15_Template, 15, 4, "button", 14);
        \u0275\u0275elementStart(16, "button", 15);
        \u0275\u0275listener("click", function MarketplaceComponent_Template_button_click_16_listener() {
          return ctx.openCart();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 16);
        \u0275\u0275element(18, "circle", 17)(19, "circle", 18)(20, "path", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, " Cart ");
        \u0275\u0275template(22, MarketplaceComponent_Conditional_22_Template, 2, 1, "span", 20);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(23, MarketplaceComponent_Conditional_23_Template, 4, 0, "nav", 21)(24, MarketplaceComponent_Conditional_24_Template, 13, 5)(25, MarketplaceComponent_Conditional_25_Template, 3, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, MarketplaceComponent_Conditional_26_Template, 11, 1)(27, MarketplaceComponent_Conditional_27_Template, 49, 15)(28, MarketplaceComponent_Conditional_28_Template, 11, 1)(29, MarketplaceComponent_Conditional_29_Template, 30, 0)(30, MarketplaceComponent_Conditional_30_Template, 82, 24)(31, MarketplaceComponent_Conditional_31_Template, 5, 6, "div", 22);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_12_0;
        let tmp_13_0;
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.activeTab() === "store");
        \u0275\u0275advance(6);
        \u0275\u0275conditional(13, ctx.auth.isLoggedIn() ? 13 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(15, ctx.auth.isLoggedIn() ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.cartCount());
        \u0275\u0275advance(6);
        \u0275\u0275conditional(22, ctx.cartCount() ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(23, ctx.activeTab() === "store" ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(24, ctx.activeTab() === "store" ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(25, ctx.activeTab() === "orders" ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.showCart() ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(27, ctx.showPaymentModal() ? 27 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(28, ctx.showTopUp() ? 28 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(29, ctx.showLoginPrompt() ? 29 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(30, (tmp_12_0 = ctx.showDetail() && ctx.detailProduct()) ? 30 : -1, tmp_12_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(31, (tmp_13_0 = ctx.toast()) ? 31 : -1, tmp_13_0);
      }
    }, dependencies: [CommonModule, DecimalPipe, TitleCasePipe, DatePipe, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, MaxValidator, NgModel, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.mp-page[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  background: var(--bg);\n  color: var(--text);\n  font-family: var(--body);\n  overflow-x: hidden;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  from {\n    background-position: 200% 0;\n  }\n  to {\n    background-position: -200% 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_detailIn {\n  from {\n    opacity: 0;\n    transform: translate(-50%, -48%) scale(0.96);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, -50%) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_toastIn {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.35;\n  }\n}\n.mp-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n.mp-bg__orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(120px);\n  opacity: 0.5;\n}\n.mp-bg__orb--gold[_ngcontent-%COMP%] {\n  width: 520px;\n  height: 520px;\n  top: -120px;\n  right: -160px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, 0.18),\n      transparent 70%);\n}\n.mp-bg__orb--green[_ngcontent-%COMP%] {\n  width: 460px;\n  height: 460px;\n  bottom: 20%;\n  left: -180px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.18),\n      transparent 70%);\n}\n.mp-inner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.mp-topbar[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 0 var(--gutter);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid var(--line);\n  gap: 16px;\n}\n.mp-topbar__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-shrink: 0;\n}\n.wallet-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(212, 175, 55, 0.12),\n      rgba(212, 175, 55, 0.04));\n  border: 1px solid rgba(212, 175, 55, 0.32);\n  border-radius: 100px;\n  cursor: pointer;\n  transition: border-color 0.18s, background 0.18s;\n}\n.wallet-badge[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n}\n.wallet-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: rgba(212, 175, 55, 0.2);\n  display: grid;\n  place-items: center;\n  color: var(--accent);\n}\n.wallet-val[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--accent);\n}\n.wallet-val[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  opacity: 0.7;\n  margin-left: 4px;\n}\n.wallet-plus[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: var(--accent);\n  color: #1a1100;\n  display: grid;\n  place-items: center;\n}\n.cart-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: 100px;\n  font-weight: 600;\n  font-size: 13px;\n  color: var(--text);\n  position: relative;\n  cursor: pointer;\n  transition: border-color 0.18s, background 0.18s;\n}\n.cart-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n  background: var(--bg3);\n}\n.cart-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.cart-count[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 5px;\n  background: var(--accent);\n  color: #1a1100;\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 10px;\n  font-weight: 700;\n  display: grid;\n  place-items: center;\n  border: 2px solid var(--bg);\n}\n.mp-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.mp-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 18px 16px;\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n  position: relative;\n  cursor: pointer;\n  background: transparent;\n  border: none;\n  transition: color 0.18s;\n  white-space: nowrap;\n}\n.mp-tab[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.mp-tab[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.mp-tab.active[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.mp-tab.active[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background: var(--accent);\n}\n@keyframes _ngcontent-%COMP%_spotlightIn {\n  from {\n    opacity: 0;\n    transform: translateX(32px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    opacity: 0;\n    transform: translateX(46px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInLeft {\n  from {\n    opacity: 0;\n    transform: translateX(-46px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_cardShine {\n  0% {\n    transform: translateX(-100%) skewX(-15deg);\n  }\n  100% {\n    transform: translateX(250%) skewX(-15deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_progFill {\n  from {\n    width: 0;\n  }\n  to {\n    width: 100%;\n  }\n}\n.spotlight[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 0 var(--gutter);\n  position: relative;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_spotlightReveal 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes _ngcontent-%COMP%_spotlightReveal {\n  from {\n    opacity: 0;\n    transform: translateY(-12px);\n    max-height: 0;\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n    max-height: 600px;\n  }\n}\n.spotlight__card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      #0d0c1a 0%,\n      #12101f 40%,\n      #0a0d16 100%);\n  border: 1px solid rgba(212, 175, 55, 0.15);\n  border-radius: var(--r-lg);\n  padding: 32px 48px;\n  display: grid;\n  grid-template-columns: 1fr 320px;\n  gap: 32px;\n  align-items: center;\n  min-height: 220px;\n  animation: _ngcontent-%COMP%_spotlightIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.spotlight__card.slide-fwd[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideInRight 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.spotlight__card.slide-bwd[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideInLeft 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n.spotlight__card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      ellipse 60% 80% at 80% 50%,\n      rgba(212, 175, 55, 0.12) 0%,\n      transparent 60%),\n    radial-gradient(\n      ellipse 50% 60% at 10% 80%,\n      rgba(0, 108, 53, 0.1) 0%,\n      transparent 55%);\n}\n.spotlight__card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image:\n    linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(212, 175, 55, 0.03) 1px,\n      transparent 1px);\n  background-size: 64px 64px;\n  mask-image:\n    radial-gradient(\n      ellipse at center,\n      #000 30%,\n      transparent 80%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse at center,\n      #000 30%,\n      transparent 80%);\n}\n@media (max-width: 900px) {\n  .spotlight__card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 28px 24px;\n    min-height: 0;\n  }\n}\n.spotlight__watermark[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: -20px;\n  transform: translateY(-50%);\n  font-family: var(--display);\n  font-size: clamp(60px, 10vw, 150px);\n  line-height: 1;\n  letter-spacing: -4px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.028);\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  z-index: 0;\n}\n.spotlight__left[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.spotlight__right[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 900px) {\n  .spotlight__right[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.spotlight__pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.s-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 11px;\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  background: rgba(212, 175, 55, 0.12);\n  border: 1px solid rgba(212, 175, 55, 0.28);\n  color: var(--accent);\n  font-weight: 600;\n}\n.s-pill[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.s-pill--cat[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, 0.14);\n  border-color: rgba(0, 108, 53, 0.38);\n  color: var(--primary-soft, #2d8c5e);\n}\n.s-pill--count[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border-color: var(--line);\n  color: var(--text-dim);\n}\n.spotlight__brand[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(34px, 4vw, 52px);\n  line-height: 0.92;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--text);\n  margin: 0;\n}\n.spotlight__price[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n}\n.sp-from[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-mute);\n}\n.sp-num[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(30px, 3.6vw, 46px);\n  color: var(--accent);\n  line-height: 1;\n}\n.sp-ccy[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 14px;\n  color: var(--text-dim);\n  letter-spacing: 1px;\n}\n.spotlight__denoms[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.s-denom[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n  font-family: var(--mono);\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    transform 0.15s;\n}\n.s-denom[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--text-dim);\n  margin-left: 4px;\n}\n.s-denom[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.12);\n  border-color: rgba(212, 175, 55, 0.4);\n  transform: translateY(-1px);\n}\n.spotlight__cta[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 28px;\n  background: var(--accent);\n  color: #1a1100;\n  border: none;\n  border-radius: 100px;\n  font-weight: 700;\n  font-size: 14px;\n  cursor: pointer;\n  transition:\n    background 0.18s,\n    transform 0.18s,\n    box-shadow 0.18s;\n}\n.spotlight__cta[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: transform 0.2s;\n}\n.spotlight__cta[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 28px rgba(212, 175, 55, 0.3);\n}\n.spotlight__cta[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.spotlight__card-3d[_ngcontent-%COMP%] {\n  position: relative;\n  transform: perspective(800px) rotateY(-12deg) rotateX(4deg);\n  transform-style: preserve-3d;\n  transition: transform 0.4s ease;\n  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.6));\n}\n.spotlight__card-3d[_ngcontent-%COMP%]:hover {\n  transform: perspective(800px) rotateY(-6deg) rotateX(2deg);\n}\n.spotlight__card-face[_ngcontent-%COMP%] {\n  width: 280px;\n  aspect-ratio: 1.586/1;\n  background:\n    linear-gradient(\n      135deg,\n      #1c1a2e 0%,\n      #111020 50%,\n      #1a1628 100%);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 18px;\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 20px;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.spotlight__card-shine[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 3;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      105deg,\n      transparent 40%,\n      rgba(255, 255, 255, 0.12) 50%,\n      transparent 60%);\n  animation: _ngcontent-%COMP%_cardShine 3.5s ease-in-out infinite;\n}\n.spotlight__card-chip[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 28px;\n  border-radius: 5px;\n  background:\n    linear-gradient(\n      135deg,\n      #d4af37 0%,\n      #f5d77e 40%,\n      #b8870a 100%);\n  position: relative;\n  z-index: 2;\n  flex-shrink: 0;\n  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.3);\n}\n.spotlight__card-chip[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 5px 0;\n  border-top: 1px solid rgba(180, 130, 0, 0.5);\n  border-bottom: 1px solid rgba(180, 130, 0, 0.5);\n}\n.spotlight__card-chip[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  width: 1px;\n  background: rgba(180, 130, 0, 0.5);\n  transform: translateX(-50%);\n}\n.spotlight__card-logo[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 22px;\n  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));\n}\n.spotlight__card-band[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  align-self: flex-end;\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.4);\n}\n.spotlight__card-shadow[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -24px;\n  left: 10%;\n  right: 10%;\n  height: 40px;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.5);\n  filter: blur(18px);\n}\n.spotlight__nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px 0 4px;\n}\n.spotlight__arrow[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: var(--text-dim);\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.spotlight__arrow[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.15);\n  border-color: rgba(212, 175, 55, 0.4);\n  color: var(--accent);\n}\n.spotlight__progress[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex: 1;\n}\n.spotlight__prog-track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 4px;\n  border-radius: 100px;\n  background: rgba(255, 255, 255, 0.1);\n  border: none;\n  cursor: pointer;\n  overflow: hidden;\n  transition: background 0.15s, transform 0.15s;\n}\n.spotlight__prog-track.active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n}\n.spotlight__prog-track[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.22);\n  transform: scaleY(1.6);\n}\n.spotlight__prog-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--accent);\n  border-radius: 100px;\n  width: 0;\n}\n.active[_ngcontent-%COMP%]   .spotlight__prog-fill[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_progFill 5s linear forwards;\n}\n.mp-search[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 24px auto 4px;\n  padding: 0 var(--gutter);\n}\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  color: var(--text-mute);\n  pointer-events: none;\n  transition: color 0.18s;\n}\n.search-box[_ngcontent-%COMP%]:focus-within   .search-icon[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.04),\n      rgba(255, 255, 255, 0.015)),\n    var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: 14px;\n  padding: 15px 46px 15px 48px;\n  color: var(--text);\n  font-family: var(--body);\n  font-size: 14px;\n  outline: none;\n  transition:\n    border-color 0.2s,\n    box-shadow 0.2s,\n    background 0.2s,\n    transform 0.2s;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-mute);\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.14), 0 10px 30px -16px rgba(0, 0, 0, 0.6);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.06),\n      rgba(255, 255, 255, 0.02)),\n    var(--bg2);\n}\n.search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  display: grid;\n  place-items: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text-dim);\n  transition:\n    background 0.15s,\n    color 0.15s,\n    transform 0.15s;\n}\n.search-clear[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.12);\n  color: var(--text);\n  transform: scale(1.08);\n}\n.cat-strip[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n  padding: 0 var(--gutter);\n  border-bottom: 1px solid var(--line);\n  background: rgba(255, 255, 255, 0.015);\n}\n.cat-strip__scroll[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  overflow-x: auto;\n  padding-bottom: 0;\n  scrollbar-width: none;\n}\n.cat-strip__scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.cat-tile[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 18px 14px;\n  min-width: 80px;\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid transparent;\n  cursor: pointer;\n  white-space: nowrap;\n  position: relative;\n  transition: border-color 0.18s, background 0.18s;\n}\n.cat-tile[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.cat-tile.active[_ngcontent-%COMP%] {\n  border-bottom-color: var(--accent);\n}\n.cat-tile.active[_ngcontent-%COMP%]   .cat-tile__icon[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  color: var(--accent);\n}\n.cat-tile.active[_ngcontent-%COMP%]   .cat-tile__label[_ngcontent-%COMP%] {\n  color: var(--accent);\n  font-weight: 700;\n}\n.cat-tile__icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  display: grid;\n  place-items: center;\n  color: var(--text-mute);\n  transition: background 0.18s, color 0.18s;\n  flex-shrink: 0;\n}\n.cat-tile__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n  transition: color 0.18s;\n}\n.cat-tile__dot[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -1px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: var(--accent);\n}\n.brand-rail[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 24px auto 0;\n  padding: 0 var(--gutter);\n}\n.brand-rail__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.brand-rail__label[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 24px;\n  height: 1px;\n  background: var(--text-mute);\n}\n.brand-rail__scroll[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  overflow-x: auto;\n  padding-bottom: 4px;\n  scrollbar-width: none;\n}\n.brand-rail__scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.brand-pill[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  min-width: 88px;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: 12px;\n  cursor: pointer;\n  transition:\n    border-color 0.18s,\n    transform 0.18s,\n    box-shadow 0.18s;\n  flex-shrink: 0;\n}\n.brand-pill[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);\n}\n.brand-pill__img[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  object-fit: contain;\n  border-radius: 8px;\n}\n.brand-pill__name[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 0.5px;\n  color: var(--text-dim);\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.mp-main[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.mp-main--full[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 24px auto 0;\n  padding: 0 var(--gutter) 80px;\n}\n.brand-section[_ngcontent-%COMP%] {\n  margin-bottom: 48px;\n}\n.brand-section[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.brand-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 18px;\n  padding-bottom: 14px;\n  border-bottom: 1px solid var(--line);\n}\n.brand-logo[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  flex-shrink: 0;\n  object-fit: contain;\n  padding: 4px;\n}\n.brand-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  flex: 1;\n  margin: 0;\n}\n.brand-count[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1.2px;\n  color: var(--text-mute);\n}\n.product-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n}\n.product-card[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.045),\n      rgba(255, 255, 255, 0.015)),\n    var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: var(--r-lg);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  height: 100%;\n  min-height: 280px;\n  transition:\n    transform 0.26s cubic-bezier(0.2, 0.7, 0.2, 1),\n    border-color 0.24s,\n    box-shadow 0.24s;\n}\n.product-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  z-index: 4;\n  background: var(--grad-brand, linear-gradient(120deg, #006c35, #2e8bff));\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.4s ease;\n}\n.product-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: 3;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      105deg,\n      transparent 40%,\n      rgba(255, 255, 255, 0.06) 50%,\n      transparent 60%);\n  transform: translateX(-120%) skewX(-18deg);\n  transition: transform 0.8s ease;\n}\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  border-color: var(--accent);\n  box-shadow: 0 22px 50px -18px rgba(0, 0, 0, 0.65), 0 0 34px -14px rgba(212, 175, 55, 0.4);\n}\n.product-card[_ngcontent-%COMP%]:hover::before {\n  transform: scaleX(1);\n}\n.product-card[_ngcontent-%COMP%]:hover::after {\n  transform: translateX(120%) skewX(-18deg);\n}\n.product-card[_ngcontent-%COMP%]:hover   .product-art__overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n  pointer-events: auto;\n}\n.product-card[_ngcontent-%COMP%]:hover   .product-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n.product-card[_ngcontent-%COMP%]:has(.in-cart-badge) {\n  border-color: rgba(16, 185, 129, 0.5);\n  box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);\n}\n.product-art[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 1/1;\n  background: #111827;\n  overflow: hidden;\n  z-index: 0;\n}\n.product-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 20px;\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  z-index: 1;\n  transition: transform 0.3s ease;\n}\n.product-art__overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 2;\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.2s ease;\n}\n.quick-view-btn[_ngcontent-%COMP%] {\n  padding: 9px 18px;\n  background: var(--accent);\n  color: #1a1100;\n  border: none;\n  border-radius: 100px;\n  font-family: var(--body);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.product-price-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  z-index: 3;\n  background: rgba(0, 0, 0, 0.75);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 100px;\n  padding: 4px 10px;\n  display: flex;\n  align-items: baseline;\n  gap: 3px;\n  font-family: var(--mono);\n}\n.product-price-badge[_ngcontent-%COMP%]   .price-num[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--accent);\n}\n.product-price-badge[_ngcontent-%COMP%]   .price-ccy[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: var(--text-dim);\n}\n.in-cart-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n  z-index: 3;\n  background: rgba(16, 185, 129, 0.9);\n  color: #fff;\n  border-radius: 100px;\n  padding: 3px 10px;\n  font-size: 11px;\n  font-weight: 700;\n  font-family: var(--mono);\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.in-cart-badge[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.product-card__body[_ngcontent-%COMP%] {\n  padding: 12px 14px 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  flex: 1;\n}\n.product-name[_ngcontent-%COMP%] {\n  font-family: var(--body);\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n  line-height: 1.35;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.product-name-ar[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-dim);\n  margin: 0;\n}\n.product-foot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: auto;\n  padding-top: 8px;\n}\n.product-region[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1px;\n  color: var(--text-mute);\n  text-transform: uppercase;\n  padding: 2px 7px;\n  border: 1px solid var(--line);\n  border-radius: 4px;\n}\n.product-cta[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 2px solid var(--accent);\n  background: transparent;\n  color: var(--accent);\n  font-size: 18px;\n  line-height: 1;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    transform 0.15s;\n}\n.product-cta[_ngcontent-%COMP%]:hover {\n  background: var(--accent);\n  color: #0b1022;\n  transform: scale(1.1);\n}\n.product-cta.added[_ngcontent-%COMP%] {\n  background: var(--good, #10b981);\n  border-color: var(--good, #10b981);\n  color: #fff;\n}\n.mp-skeleton[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 16px;\n}\n.skel-card[_ngcontent-%COMP%], .skel-row[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--bg2) 0%,\n      var(--bg3) 50%,\n      var(--bg2) 100%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: var(--r-lg);\n}\n.skel-card[_ngcontent-%COMP%] {\n  aspect-ratio: 1/1.3;\n}\n.skel-row[_ngcontent-%COMP%] {\n  height: 88px;\n  margin-bottom: 12px;\n}\n.mp-empty[_ngcontent-%COMP%] {\n  padding: 80px 24px;\n  text-align: center;\n  background: var(--bg2);\n  border: 1px dashed var(--line);\n  border-radius: var(--r-lg);\n}\n.mp-empty--orders[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 32px auto 80px;\n  padding: 80px 24px;\n}\n.mp-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 24px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin: 0 0 8px;\n}\n.mp-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 14px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 20px;\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--line);\n  color: var(--text-mute);\n}\n.orders-list[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 32px auto 0;\n  padding: 0 var(--gutter) 80px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.order-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 56px 1fr auto;\n  gap: 20px;\n  align-items: center;\n  padding: 18px 24px;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: var(--r-lg);\n  transition: border-color 0.18s;\n}\n.order-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.order-logo[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 10px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  object-fit: contain;\n  padding: 6px;\n}\n.order-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  margin: 0 0 4px;\n}\n.order-name-ar[_ngcontent-%COMP%] {\n  font-family: "Noto Sans Arabic", sans-serif;\n  font-size: 13px;\n  color: var(--text-dim);\n  margin: 0 0 6px;\n}\n.order-meta[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 0;\n}\n.order-meta[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 3px;\n  background: currentColor;\n  border-radius: 50%;\n  opacity: 0.5;\n}\n.order-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 8px;\n}\n.order-status[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.order-status.status-ok[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.12);\n  color: var(--good);\n  border: 1px solid rgba(74, 222, 128, 0.3);\n}\n.order-status.status-err[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.12);\n  color: var(--bad);\n  border: 1px solid rgba(248, 113, 113, 0.3);\n}\n.order-status.status-ref[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: var(--accent);\n  border: 1px solid rgba(212, 175, 55, 0.3);\n}\n.order-status.status-pend[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text-dim);\n  border: 1px solid var(--line-2);\n}\n.reveal-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  background: var(--accent);\n  color: #1a1100;\n  border: none;\n  border-radius: 8px;\n  font-family: var(--mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: background 0.18s;\n}\n.reveal-btn[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n}\n.reveal-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.code-block[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 6px 8px 6px 12px;\n  background: var(--bg3);\n  border: 1px solid var(--accent);\n  border-radius: 8px;\n}\n.code-block[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--accent);\n  letter-spacing: 1px;\n}\n.code-copy[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  background: rgba(212, 175, 55, 0.16);\n  color: var(--accent);\n  border: none;\n  border-radius: 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 1px;\n  cursor: pointer;\n}\n.modal-back[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 90;\n}\n.cart-drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 480px;\n  max-width: 100vw;\n  background: var(--bg2);\n  border-left: 1px solid var(--line);\n  z-index: 100;\n  display: flex;\n  flex-direction: column;\n  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.4);\n}\n.cart-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--line);\n}\n.cart-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 28px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.cart-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  cursor: pointer;\n  color: var(--text);\n  display: grid;\n  place-items: center;\n  transition: border-color 0.18s, background 0.18s;\n}\n.cart-close[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n  background: var(--bg4);\n}\n.cart-items[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.cart-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 56px 1fr auto auto;\n  gap: 12px;\n  align-items: center;\n  padding: 12px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n}\n.cart-item-img[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #1a1a26,\n      #0d0d16);\n  border: 1px solid var(--line);\n  object-fit: contain;\n  padding: 6px;\n}\n.cart-item-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0 0 2px;\n}\n.cart-item-name-ar[_ngcontent-%COMP%] {\n  font-family: "Noto Sans Arabic", sans-serif;\n  font-size: 11px;\n  color: var(--text-dim);\n  margin: 0 0 4px;\n}\n.cart-item-price[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 0.5px;\n  margin: 0;\n}\n.cart-item-qty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: var(--bg);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 2px;\n}\n.cart-item-qty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: var(--text-dim);\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.cart-item-qty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: var(--bg4);\n  color: var(--text);\n}\n.cart-item-qty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  min-width: 24px;\n  text-align: center;\n  font-family: var(--mono);\n  font-size: 12px;\n  font-weight: 600;\n}\n.cart-item-rm[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: var(--text-mute);\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition: color 0.15s, background 0.15s;\n}\n.cart-item-rm[_ngcontent-%COMP%]:hover {\n  color: var(--bad);\n  background: rgba(248, 113, 113, 0.08);\n}\n.cart-foot[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px;\n  border-top: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.cart-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding-bottom: 4px;\n}\n.cart-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n}\n.cart-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 32px;\n  color: var(--accent);\n  letter-spacing: 1px;\n  font-weight: 400;\n}\n.cart-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  margin-left: 6px;\n  letter-spacing: 1px;\n}\n.pay-chips[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 6px;\n}\n.pay-chip[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  justify-content: center;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.pay-chip[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.pay-chip[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.pay-chip.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  border-color: var(--accent);\n  color: var(--accent);\n}\n.cart-warn[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  background: rgba(248, 113, 113, 0.08);\n  border: 1px solid rgba(248, 113, 113, 0.3);\n  border-radius: 8px;\n  font-size: 12px;\n  color: var(--bad);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n.topup-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  color: var(--accent);\n  font-weight: 700;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.btn-checkout[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: var(--accent);\n  color: #1a1100;\n  border: none;\n  border-radius: 10px;\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n  cursor: pointer;\n  transition: background 0.18s;\n}\n.btn-checkout[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n}\n.btn-checkout[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.cart-empty[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  text-align: center;\n  gap: 8px;\n}\n.cart-empty[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.cart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 13px;\n  margin: 0 0 16px;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  background: transparent;\n  border: 1px solid var(--line-2);\n  border-radius: 8px;\n  color: var(--text);\n  font-weight: 600;\n  font-size: 13px;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  border-color: var(--text);\n  background: rgba(255, 255, 255, 0.04);\n}\n.btn-ghost[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: var(--accent);\n  color: #1a1100;\n  border: none;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 13px;\n  cursor: pointer;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.18s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 540px;\n  max-width: calc(100vw - 32px);\n  max-height: 90vh;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: var(--r-lg);\n  z-index: 100;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);\n}\n.modal-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--line);\n}\n.modal-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 24px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  cursor: pointer;\n  color: var(--text);\n  display: grid;\n  place-items: center;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.modal-foot[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 20px 28px;\n  border-top: 1px solid var(--line);\n}\n.card-visual[_ngcontent-%COMP%] {\n  aspect-ratio: 1.6/1;\n  background:\n    linear-gradient(\n      135deg,\n      #1a1a30,\n      #0a0a18);\n  border: 1px solid rgba(212, 175, 55, 0.3);\n  border-radius: 14px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n}\n.card-visual[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse at top right,\n      rgba(212, 175, 55, 0.15),\n      transparent 65%);\n}\n.card-visual-chip[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 32px;\n  background:\n    linear-gradient(\n      135deg,\n      #d4af37,\n      #8b7000);\n  border-radius: 6px;\n  position: relative;\n  z-index: 1;\n}\n.card-visual-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 18px;\n  letter-spacing: 3px;\n  color: var(--text);\n  position: relative;\n  z-index: 1;\n  margin: 0;\n}\n.card-visual-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  position: relative;\n  z-index: 1;\n}\n.card-visual-row[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.card-visual-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-mute);\n  display: block;\n  margin-bottom: 4px;\n}\n.card-visual-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  letter-spacing: 1px;\n  color: var(--text);\n  text-transform: uppercase;\n  margin: 0;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  grid-column: span 2;\n}\n.form-field--half[_ngcontent-%COMP%] {\n  grid-column: span 1;\n}\n.form-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  color: var(--text);\n  font-family: var(--body);\n  font-size: 14px;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n}\n.form-error[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  background: rgba(248, 113, 113, 0.08);\n  border: 1px solid rgba(248, 113, 113, 0.3);\n  border-radius: 8px;\n  font-size: 12px;\n  color: var(--bad);\n  margin: 0;\n}\n.amt-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.amt-chip[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  font-family: var(--mono);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text);\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.amt-chip[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.amt-chip.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  border-color: var(--accent);\n  color: var(--accent);\n}\n.topup-success[_ngcontent-%COMP%] {\n  padding: 48px 28px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.topup-success[_ngcontent-%COMP%]   .big-check[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: rgba(74, 222, 128, 0.12);\n  border: 2px solid var(--good);\n  color: var(--good);\n  display: grid;\n  place-items: center;\n  margin-bottom: 8px;\n}\n.topup-success[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 24px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.topup-success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 14px;\n  margin: 0 0 8px;\n}\n.modal--prompt[_ngcontent-%COMP%]   .prompt-line[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 14px;\n  line-height: 1.6;\n  margin: 0;\n}\n.prompt-bullets[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 16px 18px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  margin: 0;\n}\n.prompt-bullets[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.detail-modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 501;\n  width: min(880px, 100vw - 32px);\n  max-height: 90vh;\n  overflow-y: auto;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: 20px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  animation: _ngcontent-%COMP%_detailIn 0.25s ease;\n}\n@media (max-width: 640px) {\n  .detail-modal[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.detail-modal[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n.detail-modal[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--line);\n  border-radius: 2px;\n}\n.detail-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 10;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 1px solid var(--line);\n  background: var(--bg3);\n  color: var(--text-dim);\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition: background 0.15s, color 0.15s;\n}\n.detail-close[_ngcontent-%COMP%]:hover {\n  background: var(--line);\n  color: var(--text);\n}\n.detail-art[_ngcontent-%COMP%] {\n  position: relative;\n  background: #111827;\n  min-height: 320px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 20px 0 0 20px;\n  overflow: hidden;\n}\n@media (max-width: 640px) {\n  .detail-art[_ngcontent-%COMP%] {\n    border-radius: 20px 20px 0 0;\n    min-height: 220px;\n  }\n}\n.detail-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 70%;\n  max-height: 240px;\n  object-fit: contain;\n  position: relative;\n  z-index: 1;\n}\n.detail-art-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      circle at center,\n      rgba(212, 175, 55, 0.12) 0%,\n      transparent 70%);\n}\n.detail-instant-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 16px;\n  left: 16px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(16, 185, 129, 0.15);\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  color: #10b981;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: var(--mono);\n  padding: 5px 12px;\n  border-radius: 100px;\n}\n.detail-instant-badge[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.detail-body[_ngcontent-%COMP%] {\n  padding: 36px 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.detail-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.detail-brand[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--accent);\n}\n.detail-region[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text-mute);\n  padding: 2px 8px;\n  border: 1px solid var(--line);\n  border-radius: 4px;\n}\n.detail-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(20px, 3vw, 28px);\n  color: var(--text);\n  margin: 0;\n  line-height: 1.1;\n}\n.detail-name-ar[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-dim);\n  margin: -8px 0 0;\n  direction: rtl;\n}\n.detail-price-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.detail-price[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n}\n.detail-price-num[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 40px;\n  line-height: 1;\n  color: var(--accent);\n}\n.detail-price-ccy[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 14px;\n  color: var(--text-dim);\n}\n.detail-face[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n}\n.detail-face[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.detail-features[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.detail-feat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  color: var(--text-dim);\n}\n.detail-feat[_ngcontent-%COMP%]   .feat-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--line);\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n  color: var(--accent);\n}\n.detail-qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  flex-wrap: wrap;\n}\n.detail-qty-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n  font-family: var(--mono);\n  letter-spacing: 1px;\n}\n.detail-qty-ctrl[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.detail-qty-ctrl[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background: var(--bg2);\n  border: none;\n  color: var(--text);\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.detail-qty-ctrl[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: var(--line);\n}\n.detail-qty-ctrl[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 44px;\n  text-align: center;\n  font-family: var(--mono);\n  font-weight: 700;\n  font-size: 15px;\n  color: var(--text);\n  border-left: 1px solid var(--line);\n  border-right: 1px solid var(--line);\n  line-height: 36px;\n}\n.detail-qty-total[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-family: var(--mono);\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--accent);\n}\n.detail-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  margin-top: auto;\n}\n.detail-btn-cart[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: transparent;\n  border: 2px solid var(--accent);\n  color: var(--accent);\n  border-radius: var(--r, 10px);\n  font-family: var(--body);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.15s, color 0.15s;\n}\n.detail-btn-cart[_ngcontent-%COMP%]:hover {\n  background: var(--accent);\n  color: #0b1022;\n}\n.detail-btn-buy[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: var(--accent);\n  border: 2px solid var(--accent);\n  color: #0b1022;\n  border-radius: var(--r, 10px);\n  font-family: var(--body);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.detail-btn-buy[_ngcontent-%COMP%]:hover {\n  opacity: 0.88;\n}\n.gift-toggle-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  background: transparent;\n  border: 1px dashed var(--line);\n  border-radius: var(--r, 10px);\n  color: var(--text-dim);\n  font-family: var(--body);\n  font-size: 13px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: border-color 0.15s, color 0.15s;\n}\n.gift-toggle-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent);\n}\n.gift-input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.gift-input-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-dim);\n  font-family: var(--mono);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.gift-email-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  background: var(--bg3);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  color: var(--text);\n  font-size: 14px;\n  font-family: var(--body);\n  outline: none;\n  box-sizing: border-box;\n  transition: border-color 0.15s;\n}\n.gift-email-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n}\n.gift-email-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-mute);\n}\n.gift-email-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--bad, #ef4444);\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 12px 20px;\n  background: var(--bg2);\n  border: 1px solid var(--line);\n  border-radius: 100px;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 500;\n  z-index: 200;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);\n  animation: _ngcontent-%COMP%_toastIn 0.25s ease;\n  white-space: nowrap;\n}\n.toast[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.toast--ok[_ngcontent-%COMP%] {\n  border-color: rgba(74, 222, 128, 0.3);\n}\n.toast--ok[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: var(--good);\n}\n.toast--err[_ngcontent-%COMP%] {\n  border-color: rgba(248, 113, 113, 0.3);\n}\n.toast--err[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: var(--bad);\n}\n@media (prefers-reduced-motion: reduce) {\n  .product-card[_ngcontent-%COMP%]::after {\n    display: none;\n  }\n  .product-card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-3px);\n  }\n  .product-card[_ngcontent-%COMP%]:hover   .product-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    transform: none;\n  }\n  .spotlight[_ngcontent-%COMP%], .spotlight__card[_ngcontent-%COMP%], .spotlight__card.slide-fwd[_ngcontent-%COMP%], .spotlight__card.slide-bwd[_ngcontent-%COMP%] {\n    animation: none !important;\n  }\n  .spotlight__prog-fill.active[_ngcontent-%COMP%], .active[_ngcontent-%COMP%]   .spotlight__prog-fill[_ngcontent-%COMP%] {\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=marketplace.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketplaceComponent, { className: "MarketplaceComponent", filePath: "src\\app\\pages\\marketplace\\marketplace.component.ts", lineNumber: 88 });
})();
export {
  MarketplaceComponent
};
//# sourceMappingURL=chunk-3MDHHN4Y.js.map
