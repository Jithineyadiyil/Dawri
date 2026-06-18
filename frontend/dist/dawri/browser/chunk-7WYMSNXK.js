import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/auth/auth.component.ts
var _forTrack0 = ($index, $item) => $item.text;
var _forTrack1 = ($index, $item) => $item.code;
function AuthComponent_For_22_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 27)(2, "path", 28)(3, "path", 29)(4, "path", 30)(5, "path", 31)(6, "path", 32);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_For_22_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "polyline", 33)(2, "rect", 34)(3, "line", 35)(4, "path", 36)(5, "path", 37);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_For_22_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "line", 38)(2, "line", 39)(3, "line", 40);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_For_22_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "circle", 41)(2, "line", 42)(3, "path", 43);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 13)(1, "span", 25);
    \u0275\u0275template(2, AuthComponent_For_22_Case_2_Template, 7, 0)(3, AuthComponent_For_22_Case_3_Template, 6, 0)(4, AuthComponent_For_22_Case_4_Template, 4, 0)(5, AuthComponent_For_22_Case_5_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const f_r1 = ctx.$implicit;
    const i_r2 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, (tmp_10_0 = i_r2) === 0 ? 2 : tmp_10_0 === 1 ? 3 : tmp_10_0 === 2 ? 4 : tmp_10_0 === 3 ? 5 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(f_r1.text);
  }
}
function AuthComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 44);
    \u0275\u0275listener("click", function AuthComponent_Conditional_43_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setTab("login"));
    });
    \u0275\u0275text(2, "Sign In");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 44);
    \u0275\u0275listener("click", function AuthComponent_Conditional_43_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setTab("register"));
    });
    \u0275\u0275text(4, "Create Account");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("on", ctx_r3.tab() === "login");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("on", ctx_r3.tab() === "register");
  }
}
function AuthComponent_Conditional_44_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 63)(2, "path", 64)(3, "line", 65);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_44_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 66)(2, "circle", 67);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_44_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 41)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.errorMsg(), " ");
  }
}
function AuthComponent_Conditional_44_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
    \u0275\u0275text(1, " Signing in\u2026 ");
  }
}
function AuthComponent_Conditional_44_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Sign In ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 72);
    \u0275\u0275element(2, "path", 73)(3, "path", 74);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 45);
    \u0275\u0275listener("ngSubmit", function AuthComponent_Conditional_44_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.login());
    });
    \u0275\u0275elementStart(1, "div", 46)(2, "label", 47);
    \u0275\u0275text(3, "Email address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48)(5, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 26);
    \u0275\u0275element(7, "path", 50)(8, "polyline", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(9, "input", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 46)(11, "label", 47);
    \u0275\u0275text(12, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 48)(14, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 26);
    \u0275\u0275element(16, "rect", 53)(17, "path", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(18, "input", 55);
    \u0275\u0275elementStart(19, "button", 56);
    \u0275\u0275listener("click", function AuthComponent_Conditional_44_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showLoginPw.set(!ctx_r3.showLoginPw()));
    });
    \u0275\u0275template(20, AuthComponent_Conditional_44_Conditional_20_Template, 4, 0, ":svg:svg", 26)(21, AuthComponent_Conditional_44_Conditional_21_Template, 3, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 57)(23, "label", 58);
    \u0275\u0275element(24, "input", 59);
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Remember me");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "button", 60);
    \u0275\u0275listener("click", function AuthComponent_Conditional_44_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setTab("forgot"));
    });
    \u0275\u0275text(28, " Forgot password? ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(29, AuthComponent_Conditional_44_Conditional_29_Template, 6, 1, "div", 61);
    \u0275\u0275elementStart(30, "button", 62);
    \u0275\u0275template(31, AuthComponent_Conditional_44_Conditional_31_Template, 2, 0)(32, AuthComponent_Conditional_44_Conditional_32_Template, 4, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r3.loginForm);
    \u0275\u0275advance(18);
    \u0275\u0275property("type", ctx_r3.showLoginPw() ? "text" : "password");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r3.showLoginPw() ? "Hide password" : "Show password");
    \u0275\u0275advance();
    \u0275\u0275conditional(20, ctx_r3.showLoginPw() ? 20 : 21);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(29, ctx_r3.errorMsg() ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(31, ctx_r3.loading() ? 31 : 32);
  }
}
function AuthComponent_Conditional_45_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r7 = ctx.$implicit;
    \u0275\u0275property("value", c_r7.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r7.flag, " ", c_r7.code, "");
  }
}
function AuthComponent_Conditional_45_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 63)(2, "path", 64)(3, "line", 65);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_45_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 66)(2, "circle", 67);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_45_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 63)(2, "path", 64)(3, "line", 65);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_45_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 66)(2, "circle", 67);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_45_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 41)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.errorMsg(), " ");
  }
}
function AuthComponent_Conditional_45_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
    \u0275\u0275text(1, " Creating account\u2026 ");
  }
}
function AuthComponent_Conditional_45_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Create Account ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 72);
    \u0275\u0275element(2, "path", 73)(3, "path", 74);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 45);
    \u0275\u0275listener("ngSubmit", function AuthComponent_Conditional_45_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.register());
    });
    \u0275\u0275elementStart(1, "div", 46)(2, "label", 47);
    \u0275\u0275text(3, "Full name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48)(5, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 26);
    \u0275\u0275element(7, "path", 75)(8, "circle", 76);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(9, "input", 77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 46)(11, "label", 47);
    \u0275\u0275text(12, "Email address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 48)(14, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 26);
    \u0275\u0275element(16, "path", 50)(17, "polyline", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(18, "input", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 46)(20, "label", 47);
    \u0275\u0275text(21, "Mobile number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 78)(23, "select", 79);
    \u0275\u0275repeaterCreate(24, AuthComponent_Conditional_45_For_25_Template, 2, 3, "option", 80, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 81)(27, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(28, "svg", 26);
    \u0275\u0275element(29, "rect", 82)(30, "line", 83);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(31, "input", 84);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 46)(33, "label", 47);
    \u0275\u0275text(34, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 48)(36, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 26);
    \u0275\u0275element(38, "rect", 53)(39, "path", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(40, "input", 85);
    \u0275\u0275elementStart(41, "button", 56);
    \u0275\u0275listener("click", function AuthComponent_Conditional_45_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showRegPw.set(!ctx_r3.showRegPw()));
    });
    \u0275\u0275template(42, AuthComponent_Conditional_45_Conditional_42_Template, 4, 0, ":svg:svg", 26)(43, AuthComponent_Conditional_45_Conditional_43_Template, 3, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 46)(45, "label", 47);
    \u0275\u0275text(46, "Confirm password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 48)(48, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(49, "svg", 26);
    \u0275\u0275element(50, "rect", 53)(51, "path", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(52, "input", 86);
    \u0275\u0275elementStart(53, "button", 56);
    \u0275\u0275listener("click", function AuthComponent_Conditional_45_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showRegConfirm.set(!ctx_r3.showRegConfirm()));
    });
    \u0275\u0275template(54, AuthComponent_Conditional_45_Conditional_54_Template, 4, 0, ":svg:svg", 26)(55, AuthComponent_Conditional_45_Conditional_55_Template, 3, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "label", 87);
    \u0275\u0275element(57, "input", 88);
    \u0275\u0275elementStart(58, "span");
    \u0275\u0275text(59, "I agree to the ");
    \u0275\u0275elementStart(60, "a", 89);
    \u0275\u0275text(61, "Terms");
    \u0275\u0275elementEnd();
    \u0275\u0275text(62, " and ");
    \u0275\u0275elementStart(63, "a", 89);
    \u0275\u0275text(64, "Privacy Policy");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(65, AuthComponent_Conditional_45_Conditional_65_Template, 6, 1, "div", 61);
    \u0275\u0275elementStart(66, "button", 62);
    \u0275\u0275template(67, AuthComponent_Conditional_45_Conditional_67_Template, 2, 0)(68, AuthComponent_Conditional_45_Conditional_68_Template, 4, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r3.registerForm);
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r3.countryCodes);
    \u0275\u0275advance(16);
    \u0275\u0275property("type", ctx_r3.showRegPw() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(42, ctx_r3.showRegPw() ? 42 : 43);
    \u0275\u0275advance(10);
    \u0275\u0275property("type", ctx_r3.showRegConfirm() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(54, ctx_r3.showRegConfirm() ? 54 : 55);
    \u0275\u0275advance(11);
    \u0275\u0275conditional(65, ctx_r3.errorMsg() ? 65 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(67, ctx_r3.loading() ? 67 : 68);
  }
}
function AuthComponent_Conditional_46_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 41)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.errorMsg(), " ");
  }
}
function AuthComponent_Conditional_46_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
    \u0275\u0275text(1, " Verifying\u2026 ");
  }
}
function AuthComponent_Conditional_46_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Verify & Continue ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 72);
    \u0275\u0275element(2, "path", 73)(3, "path", 74);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 91);
    \u0275\u0275element(3, "rect", 82)(4, "line", 83);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3", 92);
    \u0275\u0275text(6, "Verify Your Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 93);
    \u0275\u0275text(8, "Enter the 6-digit code sent via SMS to your mobile number.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "form", 94);
    \u0275\u0275listener("ngSubmit", function AuthComponent_Conditional_46_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.verifyOtp());
    });
    \u0275\u0275elementStart(10, "div", 46)(11, "label", 47);
    \u0275\u0275text(12, "Verification code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 95);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, AuthComponent_Conditional_46_Conditional_14_Template, 6, 1, "div", 61);
    \u0275\u0275elementStart(15, "button", 62);
    \u0275\u0275template(16, AuthComponent_Conditional_46_Conditional_16_Template, 2, 0)(17, AuthComponent_Conditional_46_Conditional_17_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 96);
    \u0275\u0275text(19, " Didn't receive it? ");
    \u0275\u0275elementStart(20, "button", 97);
    \u0275\u0275listener("click", function AuthComponent_Conditional_46_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.resendOtp());
    });
    \u0275\u0275text(21, "Resend OTP");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx_r3.otpForm);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(14, ctx_r3.errorMsg() ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(16, ctx_r3.loading() ? 16 : 17);
  }
}
function AuthComponent_Conditional_47_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 41)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.errorMsg(), " ");
  }
}
function AuthComponent_Conditional_47_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
    \u0275\u0275text(1, " Sending\u2026 ");
  }
}
function AuthComponent_Conditional_47_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Send Reset Link ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 72);
    \u0275\u0275element(2, "path", 73)(3, "path", 74);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "button", 98);
    \u0275\u0275listener("click", function AuthComponent_Conditional_47_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setTab("login"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 99);
    \u0275\u0275element(3, "path", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Back to Sign In ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 91);
    \u0275\u0275element(7, "rect", 53)(8, "path", 101);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "h3", 92);
    \u0275\u0275text(10, "Reset Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 93);
    \u0275\u0275text(12, "Enter your email address and we'll send you a link to reset your password.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "form", 94);
    \u0275\u0275listener("ngSubmit", function AuthComponent_Conditional_47_Template_form_ngSubmit_13_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.forgotPassword());
    });
    \u0275\u0275elementStart(14, "div", 46)(15, "label", 47);
    \u0275\u0275text(16, "Email address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 48)(18, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 26);
    \u0275\u0275element(20, "path", 50)(21, "polyline", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(22, "input", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, AuthComponent_Conditional_47_Conditional_23_Template, 6, 1, "div", 61);
    \u0275\u0275elementStart(24, "button", 62);
    \u0275\u0275template(25, AuthComponent_Conditional_47_Conditional_25_Template, 2, 0)(26, AuthComponent_Conditional_47_Conditional_26_Template, 4, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("formGroup", ctx_r3.forgotForm);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(23, ctx_r3.errorMsg() ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(25, ctx_r3.loading() ? 25 : 26);
  }
}
function AuthComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 102);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 103);
    \u0275\u0275element(3, "polyline", 104);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3", 92);
    \u0275\u0275text(5, "Check your email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 93);
    \u0275\u0275text(7, "If an account exists for that email, we've sent a password reset link. Check your inbox and spam folder.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 105);
    \u0275\u0275listener("click", function AuthComponent_Conditional_48_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setTab("login"));
    });
    \u0275\u0275text(9, " Back to Sign In ");
    \u0275\u0275elementEnd()();
  }
}
function AuthComponent_Conditional_49_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 63)(2, "path", 64)(3, "line", 65);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_49_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 66)(2, "circle", 67);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_49_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 63)(2, "path", 64)(3, "line", 65);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_49_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 66)(2, "circle", 67);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_49_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 68);
    \u0275\u0275element(2, "circle", 41)(3, "line", 69)(4, "line", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.errorMsg(), " ");
  }
}
function AuthComponent_Conditional_49_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 71);
    \u0275\u0275text(1, " Saving\u2026 ");
  }
}
function AuthComponent_Conditional_49_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Set New Password ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 72);
    \u0275\u0275element(2, "path", 73)(3, "path", 74);
    \u0275\u0275elementEnd();
  }
}
function AuthComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 90);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 91);
    \u0275\u0275element(3, "rect", 53)(4, "path", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3", 92);
    \u0275\u0275text(6, "Set New Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 93);
    \u0275\u0275text(8, "Choose a strong password for your Dawri account.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "form", 94);
    \u0275\u0275listener("ngSubmit", function AuthComponent_Conditional_49_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.resetPassword());
    });
    \u0275\u0275elementStart(10, "div", 46)(11, "label", 47);
    \u0275\u0275text(12, "New password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 48)(14, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 26);
    \u0275\u0275element(16, "rect", 53)(17, "path", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(18, "input", 85);
    \u0275\u0275elementStart(19, "button", 56);
    \u0275\u0275listener("click", function AuthComponent_Conditional_49_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showResetPw.set(!ctx_r3.showResetPw()));
    });
    \u0275\u0275template(20, AuthComponent_Conditional_49_Conditional_20_Template, 4, 0, ":svg:svg", 26)(21, AuthComponent_Conditional_49_Conditional_21_Template, 3, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 46)(23, "label", 47);
    \u0275\u0275text(24, "Confirm new password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 48)(26, "span", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(27, "svg", 26);
    \u0275\u0275element(28, "rect", 53)(29, "path", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(30, "input", 86);
    \u0275\u0275elementStart(31, "button", 56);
    \u0275\u0275listener("click", function AuthComponent_Conditional_49_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showResetConf.set(!ctx_r3.showResetConf()));
    });
    \u0275\u0275template(32, AuthComponent_Conditional_49_Conditional_32_Template, 4, 0, ":svg:svg", 26)(33, AuthComponent_Conditional_49_Conditional_33_Template, 3, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(34, AuthComponent_Conditional_49_Conditional_34_Template, 6, 1, "div", 61);
    \u0275\u0275elementStart(35, "button", 62);
    \u0275\u0275template(36, AuthComponent_Conditional_49_Conditional_36_Template, 2, 0)(37, AuthComponent_Conditional_49_Conditional_37_Template, 4, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("formGroup", ctx_r3.resetForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("type", ctx_r3.showResetPw() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(20, ctx_r3.showResetPw() ? 20 : 21);
    \u0275\u0275advance(10);
    \u0275\u0275property("type", ctx_r3.showResetConf() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(32, ctx_r3.showResetConf() ? 32 : 33);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(34, ctx_r3.errorMsg() ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(36, ctx_r3.loading() ? 36 : 37);
  }
}
var AuthComponent = class _AuthComponent {
  constructor() {
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.toast = inject(ToastService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.fb = inject(FormBuilder);
    this.tab = signal("login");
    this.loading = signal(false);
    this.errorMsg = signal("");
    this.showLoginPw = signal(false);
    this.showRegPw = signal(false);
    this.showRegConfirm = signal(false);
    this.showResetPw = signal(false);
    this.showResetConf = signal(false);
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      remember: [true]
    });
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      country_code: ["+966"],
      phone_number: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      password_confirmation: ["", Validators.required],
      terms: [false, Validators.requiredTrue]
    });
    this.otpForm = this.fb.group({
      otp: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
    this.resetForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      password_confirmation: ["", Validators.required]
    });
    this.resetToken = "";
    this.resetEmail = "";
    this.features = [
      { text: "Join tournaments for EA FC 25, PUBG Mobile, and CoD Mobile" },
      { text: "Win digital prizes \u2014 PSN, iTunes, PUBG UC and more" },
      { text: "Track your ranking and full tournament history" },
      { text: "Full Arabic RTL support and GCC regional coverage" }
    ];
    this.countryCodes = [
      { code: "+966", flag: "\u{1F1F8}\u{1F1E6}", name: "KSA" },
      { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", name: "UAE" },
      { code: "+965", flag: "\u{1F1F0}\u{1F1FC}", name: "KWT" },
      { code: "+974", flag: "\u{1F1F6}\u{1F1E6}", name: "QAT" },
      { code: "+973", flag: "\u{1F1E7}\u{1F1ED}", name: "BHR" },
      { code: "+968", flag: "\u{1F1F4}\u{1F1F2}", name: "OMN" }
    ];
    this.route.queryParams.subscribe((params) => {
      if (params["token"] && params["email"]) {
        this.resetToken = params["token"];
        this.resetEmail = params["email"];
        this.tab.set("reset");
      }
    });
  }
  setTab(t) {
    this.tab.set(t);
    this.errorMsg.set("");
  }
  // ── Login ─────────────────────────────────────────────────────────────
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set("");
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.api.login(payload).subscribe({
      next: (res) => {
        const token = res?.data?.token ?? res?.token;
        const user = res?.data?.user ?? res?.user;
        if (!token || !user) {
          this.errorMsg.set("Unexpected response.");
          this.loading.set(false);
          return;
        }
        this.auth.setSession(token, user);
        this.loading.set(false);
        this.toast.success("Welcome back, " + user.name + "!");
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message ?? err.error?.errors?.email?.[0] ?? "Invalid credentials.");
        this.loading.set(false);
      }
    });
  }
  // ── Register ──────────────────────────────────────────────────────────
  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const v = this.registerForm.value;
    const phone = (v.country_code ?? "+966") + (v.phone_number ?? "");
    this.loading.set(true);
    this.errorMsg.set("");
    this.api.register({
      name: v.name,
      email: v.email,
      password: v.password,
      password_confirmation: v.password_confirmation,
      phone
    }).subscribe({
      next: (res) => {
        const token = res?.data?.token ?? res?.token;
        const user = res?.data?.user ?? res?.user;
        if (token && user)
          this.auth.setSession(token, user);
        this.loading.set(false);
        this.setTab("otp");
        this.toast.info("Account created! Please verify your phone.");
      },
      error: (err) => {
        const ve = err.error?.errors;
        this.errorMsg.set(ve ? Object.values(ve)[0][0] : err.error?.message ?? "Registration failed.");
        this.loading.set(false);
      }
    });
  }
  // ── OTP ───────────────────────────────────────────────────────────────
  verifyOtp() {
    if (this.otpForm.invalid)
      return;
    this.loading.set(true);
    this.errorMsg.set("");
    this.api.verifyOtp(this.otpForm.value.otp).subscribe({
      next: (res) => {
        const user = res?.data?.user ?? res?.user;
        if (user)
          this.auth.updateUser(user);
        this.loading.set(false);
        this.toast.success("Phone verified! Welcome to Dawri.");
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message ?? "Invalid OTP.");
        this.loading.set(false);
      }
    });
  }
  resendOtp() {
    this.api.sendOtp().subscribe({
      next: () => this.toast.info("New OTP sent."),
      error: () => this.toast.error("Failed to send OTP.")
    });
  }
  // ── Forgot password ───────────────────────────────────────────────────
  forgotPassword() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set("");
    this.api.forgotPassword(this.forgotForm.value.email).subscribe({
      next: () => {
        this.loading.set(false);
        this.setTab("forgot-sent");
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message ?? "Failed to send reset link.");
        this.loading.set(false);
      }
    });
  }
  // ── Reset password ────────────────────────────────────────────────────
  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMsg.set("");
    this.api.resetPassword({
      token: this.resetToken,
      email: this.resetEmail,
      password: this.resetForm.value.password,
      password_confirmation: this.resetForm.value.password_confirmation
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success("Password reset! Please sign in.");
        this.router.navigate(["/auth"]);
        this.setTab("login");
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message ?? "Reset failed. The link may have expired.");
        this.loading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function AuthComponent_Factory(t) {
      return new (t || _AuthComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthComponent, selectors: [["dw-auth"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 50, vars: 7, consts: [[1, "auth-page"], [1, "auth-left"], ["aria-hidden", "true", 1, "auth-bg"], [1, "auth-bg__orb", "auth-bg__orb--gold"], [1, "auth-bg__orb", "auth-bg__orb--green"], [1, "auth-bg__grid"], [1, "auth-brand"], [1, "auth-logo"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "13 2 3 14 12 14 11 22 21 10 12 10 13 2"], [1, "logo-ar"], [1, "auth-headline"], [1, "auth-features"], [1, "auth-feat"], [1, "auth-stats"], [1, "as-item"], [1, "as-val"], [1, "as-label"], ["aria-hidden", "true", 1, "as-sep"], [1, "auth-right"], [1, "auth-box"], [1, "auth-tabs"], ["novalidate", "", 3, "formGroup"], [1, "alt-panel"], [1, "alt-panel", "alt-panel--success"], ["aria-hidden", "true", 1, "af-icon"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"], ["points", "20 12 20 22 4 22 4 12"], ["x", "2", "y", "7", "width", "20", "height", "5"], ["x1", "12", "y1", "22", "x2", "12", "y2", "7"], ["d", "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"], ["d", "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"], ["x1", "18", "y1", "20", "x2", "18", "y2", "10"], ["x1", "12", "y1", "20", "x2", "12", "y2", "4"], ["x1", "6", "y1", "20", "x2", "6", "y2", "14"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "2", "y1", "12", "x2", "22", "y2", "12"], ["d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"], [1, "auth-tab", 3, "click"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "form-label"], [1, "input-wrap"], ["aria-hidden", "true", 1, "input-icon"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["formControlName", "email", "type", "email", "placeholder", "your@email.com", "autocomplete", "email", 1, "input"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 1, "input", "input--pw", 3, "type"], ["type", "button", 1, "pw-toggle", 3, "click"], [1, "auth-row"], [1, "auth-remember"], ["type", "checkbox", "formControlName", "remember"], ["type", "button", 1, "forgot-link", 3, "click"], [1, "auth-error"], ["type", "submit", 1, "auth-submit", 3, "disabled"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"], ["d", "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["aria-hidden", "true", 1, "auth-spinner"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M5 12h14"], ["d", "m12 5 7 7-7 7"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], ["formControlName", "name", "placeholder", "Faisal Al-Ghamdi", "autocomplete", "name", 1, "input"], [1, "phone-row"], ["formControlName", "country_code", 1, "input", "input--select"], [3, "value"], [1, "input-wrap", 2, "flex", "1"], ["x", "5", "y", "2", "width", "14", "height", "20", "rx", "2", "ry", "2"], ["x1", "12", "y1", "18", "x2", "12.01", "y2", "18"], ["formControlName", "phone_number", "placeholder", "5X XXX XXXX", "type", "tel", "autocomplete", "tel-national", 1, "input"], ["formControlName", "password", "placeholder", "Min. 8 characters", "autocomplete", "new-password", 1, "input", "input--pw", 3, "type"], ["formControlName", "password_confirmation", "placeholder", "Repeat password", "autocomplete", "new-password", 1, "input", "input--pw", 3, "type"], [1, "terms-check"], ["type", "checkbox", "formControlName", "terms"], ["href", "#", 1, "terms-link"], [1, "alt-panel__icon"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "alt-panel__title"], [1, "alt-panel__sub"], [3, "ngSubmit", "formGroup"], ["formControlName", "otp", "placeholder", "000000", "maxlength", "6", "inputmode", "numeric", "autocomplete", "one-time-code", 1, "input", "otp-input"], [1, "alt-link-row"], ["type", "button", 1, "alt-link", 3, "click"], ["type", "button", 1, "back-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "m15 18-6-6 6-6"], ["d", "M7 11V7a5 5 0 0 1 9.9-1"], [1, "alt-panel__icon", "alt-panel__icon--success"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["type", "button", 1, "auth-submit", "auth-submit--ghost", 3, "click"]], template: function AuthComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 6)(7, "div", 7);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "polygon", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "DAWRI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "span", 10);
        \u0275\u0275text(13, "\u062F\u0627\u0648\u0631\u064A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "h2", 11);
        \u0275\u0275text(15, "Saudi Arabia's ");
        \u0275\u0275elementStart(16, "em");
        \u0275\u0275text(17, "Premier");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "br");
        \u0275\u0275text(19, "Esports Platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "ul", 12);
        \u0275\u0275repeaterCreate(21, AuthComponent_For_22_Template, 8, 2, "li", 13, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 14)(24, "div", 15)(25, "span", 16);
        \u0275\u0275text(26, "23M+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "span", 17);
        \u0275\u0275text(28, "KSA Gamers");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(29, "div", 18);
        \u0275\u0275elementStart(30, "div", 15)(31, "span", 16);
        \u0275\u0275text(32, "4");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "span", 17);
        \u0275\u0275text(34, "Bracket Formats");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(35, "div", 18);
        \u0275\u0275elementStart(36, "div", 15)(37, "span", 16);
        \u0275\u0275text(38, "3K+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "span", 17);
        \u0275\u0275text(40, "Gift Card Brands");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(41, "div", 19)(42, "div", 20);
        \u0275\u0275template(43, AuthComponent_Conditional_43_Template, 5, 4, "div", 21)(44, AuthComponent_Conditional_44_Template, 33, 7, "form", 22)(45, AuthComponent_Conditional_45_Template, 69, 8, "form", 22)(46, AuthComponent_Conditional_46_Template, 22, 4, "div", 23)(47, AuthComponent_Conditional_47_Template, 27, 4, "div", 23)(48, AuthComponent_Conditional_48_Template, 10, 0, "div", 24)(49, AuthComponent_Conditional_49_Template, 38, 8, "div", 23);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(21);
        \u0275\u0275repeater(ctx.features);
        \u0275\u0275advance(22);
        \u0275\u0275conditional(43, ctx.tab() === "login" || ctx.tab() === "register" ? 43 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(44, ctx.tab() === "login" ? 44 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(45, ctx.tab() === "register" ? 45 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(46, ctx.tab() === "otp" ? 46 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(47, ctx.tab() === "forgot" ? 47 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(48, ctx.tab() === "forgot-sent" ? 48 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(49, ctx.tab() === "reset" ? 49 : -1);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, CommonModule], styles: ['@charset "UTF-8";\n\n\n\n@keyframes _ngcontent-%COMP%_auth-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat1 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(-40px, 30px);\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat2 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(40px, -40px);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmerBtn {\n  0% {\n    left: -100%;\n  }\n  100% {\n    left: 100%;\n  }\n}\n@keyframes _ngcontent-%COMP%_panelFadeUp {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n.auth-page[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n  background: var(--bg);\n}\n@media (max-width: 768px) {\n  .auth-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.auth-left[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      160deg,\n      var(--bg2) 0%,\n      rgba(0, 108, 53, 0.06) 100%);\n  border-right: 1px solid var(--br);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 5vw;\n}\n@media (max-width: 768px) {\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.auth-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.auth-bg__orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(90px);\n  opacity: 0.4;\n}\n.auth-bg__orb--gold[_ngcontent-%COMP%] {\n  width: 500px;\n  height: 500px;\n  top: -150px;\n  right: -100px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, 0.25),\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orbFloat1 20s ease-in-out infinite;\n}\n.auth-bg__orb--green[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  bottom: -100px;\n  left: -80px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.2),\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orbFloat2 26s ease-in-out infinite;\n}\n.auth-bg__grid[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.04) 1px,\n      transparent 1px);\n  background-size: 56px 56px;\n  mask-image:\n    radial-gradient(\n      ellipse 80% 70% at 50% 40%,\n      #000 20%,\n      transparent 75%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 80% 70% at 50% 40%,\n      #000 20%,\n      transparent 75%);\n}\n.auth-brand[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 420px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-family: var(--fh);\n  font-size: 1.6rem;\n  letter-spacing: 0.1em;\n  color: var(--accent, #d4af37);\n  margin-bottom: 28px;\n}\n.auth-logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.logo-ar[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 0.8rem;\n  color: var(--mu);\n}\n.auth-headline[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.8rem, 2.5vw, 2.4rem);\n  letter-spacing: 0.04em;\n  line-height: 1.1;\n  margin-bottom: 32px;\n  color: var(--text);\n}\n.auth-headline[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: var(--accent, #d4af37);\n}\n.auth-features[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin-bottom: 36px;\n}\n.auth-feat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n}\n.af-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  flex-shrink: 0;\n  margin-top: 1px;\n  background: rgba(212, 175, 55, 0.1);\n  border: 1px solid rgba(212, 175, 55, 0.2);\n  color: var(--accent, #d4af37);\n  display: grid;\n  place-items: center;\n}\n.auth-feat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  font-size: 0.87rem;\n  color: var(--mu);\n  line-height: 1.5;\n}\n.auth-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n}\n.as-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n}\n.as-val[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.5rem;\n  color: var(--accent, #d4af37);\n  letter-spacing: 0.04em;\n}\n.as-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: var(--mu);\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n}\n.as-sep[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 32px;\n  background: rgba(255, 255, 255, 0.1);\n  margin: 0 16px;\n}\n.auth-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 5vw;\n  background: var(--bg);\n}\n.auth-box[_ngcontent-%COMP%] {\n  width: min(440px, 100%);\n  animation: _ngcontent-%COMP%_panelFadeUp 0.4s ease both;\n}\n.auth-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  position: relative;\n  border-bottom: 1px solid var(--br2);\n  margin-bottom: 28px;\n}\n.auth-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 14px 12px;\n  background: none;\n  border: none;\n  font-family: var(--fb);\n  font-weight: 700;\n  font-size: 0.88rem;\n  letter-spacing: 0.06em;\n  color: var(--mu);\n  cursor: pointer;\n  position: relative;\n  transition: color 0.22s;\n}\n.auth-tab[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.auth-tab.on[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n.auth-tab[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 12px;\n  right: 12px;\n  bottom: -1px;\n  height: 2px;\n  background: var(--accent, #d4af37);\n  border-radius: 2px;\n  transform: scaleX(0);\n  transform-origin: center;\n  transition: transform 0.28s ease;\n}\n.auth-tab.on[_ngcontent-%COMP%]::after {\n  transform: scaleX(1);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 16px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu);\n}\n.input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 13px;\n  color: var(--dim);\n  pointer-events: none;\n  display: flex;\n  align-items: center;\n}\n.input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  color: var(--text);\n  border-radius: 10px;\n  padding: 12px 14px 12px 40px;\n  font-family: var(--fb);\n  font-size: 14px;\n  outline: none;\n  transition:\n    border-color 0.16s,\n    background 0.16s,\n    box-shadow 0.16s;\n}\n.input[_ngcontent-%COMP%]::placeholder {\n  color: var(--dim);\n}\n.input[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.06);\n}\n.input[_ngcontent-%COMP%]:focus {\n  border-color: rgba(212, 175, 55, 0.5);\n  background: rgba(212, 175, 55, 0.04);\n  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.12);\n}\n.input--pw[_ngcontent-%COMP%] {\n  padding-right: 42px;\n}\n.input--select[_ngcontent-%COMP%] {\n  padding: 12px 10px;\n  flex-shrink: 0;\n  width: 100px;\n}\n.pw-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--dim);\n  display: grid;\n  place-items: center;\n  padding: 4px;\n  border-radius: 5px;\n  transition: color 0.14s;\n}\n.pw-toggle[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.phone-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n}\n.auth-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: -4px 0 18px;\n}\n.auth-remember[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.82rem;\n  color: var(--mu);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.auth-remember[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  accent-color: var(--accent, #d4af37);\n  cursor: pointer;\n}\n.auth-remember[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.forgot-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  font-size: 0.82rem;\n  font-family: var(--fb);\n  font-weight: 600;\n  color: var(--accent, #d4af37);\n  text-decoration: none;\n  transition: opacity 0.15s;\n}\n.forgot-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n  text-decoration: underline;\n}\n.auth-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  margin: 0 0 14px;\n  padding: 10px 14px;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  border-radius: 10px;\n  color: #fca5a5;\n  font-size: 0.85rem;\n  line-height: 1.4;\n}\n.auth-error[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.auth-submit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  width: 100%;\n  margin-top: 8px;\n  padding: 14px 22px;\n  border: none;\n  border-radius: 10px;\n  overflow: hidden;\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary, #006c35),\n      var(--primary-soft, #2d8c5e));\n  color: #fff;\n  font-family: var(--fh);\n  font-size: 0.92rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  cursor: pointer;\n  text-transform: uppercase;\n  box-shadow: 0 6px 20px rgba(0, 108, 53, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15);\n  transition:\n    transform 0.22s,\n    box-shadow 0.22s,\n    filter 0.22s;\n}\n.auth-submit[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  transition: transform 0.2s;\n}\n.auth-submit[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  width: 60%;\n  height: 100%;\n  left: -100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.18),\n      transparent);\n  transition: left 0.6s;\n}\n.auth-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 28px rgba(0, 108, 53, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15);\n  filter: brightness(1.06);\n}\n.auth-submit[_ngcontent-%COMP%]:hover:not(:disabled)   svg[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.auth-submit[_ngcontent-%COMP%]:hover:not(:disabled)::before {\n  left: 100%;\n}\n.auth-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n  transform: none;\n}\n.auth-submit--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  color: var(--text);\n  box-shadow: none;\n}\n.auth-submit--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--text);\n  background: rgba(255, 255, 255, 0.04);\n  box-shadow: none;\n  filter: none;\n}\n.auth-spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_auth-spin 0.7s linear infinite;\n}\n.terms-check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  font-size: 0.82rem;\n  color: var(--mu);\n  cursor: pointer;\n  margin: 4px 0 14px;\n}\n.terms-check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  accent-color: var(--accent, #d4af37);\n  flex-shrink: 0;\n}\n.terms-check[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.terms-link[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n  text-decoration: none;\n}\n.terms-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.otp-input[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  letter-spacing: 0.4em;\n  text-align: center;\n  padding-left: 14px;\n  padding-right: 14px;\n}\n.alt-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 0;\n  animation: _ngcontent-%COMP%_panelFadeUp 0.3s ease both;\n}\n.alt-panel--success[_ngcontent-%COMP%] {\n  gap: 12px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  margin-bottom: 20px;\n  font-family: var(--fb);\n  font-size: 0.82rem;\n  color: var(--mu);\n  transition: color 0.15s;\n}\n.back-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.alt-panel__icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: rgba(212, 175, 55, 0.1);\n  border: 1px solid rgba(212, 175, 55, 0.25);\n  color: var(--accent, #d4af37);\n  display: grid;\n  place-items: center;\n  margin-bottom: 20px;\n}\n.alt-panel__icon--success[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.12);\n  border-color: rgba(74, 222, 128, 0.3);\n  color: var(--green, #4ade80);\n}\n.alt-panel__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.6rem;\n  letter-spacing: 0.04em;\n  color: var(--text);\n  margin-bottom: 8px;\n}\n.alt-panel__sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.88rem;\n  line-height: 1.6;\n  margin-bottom: 28px;\n  max-width: 34ch;\n}\n.alt-link-row[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 16px;\n  font-size: 0.82rem;\n  color: var(--mu);\n}\n.alt-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  margin-left: 6px;\n  color: var(--accent, #d4af37);\n  font-family: var(--fb);\n  font-weight: 700;\n  font-size: 0.82rem;\n}\n.alt-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n@media (prefers-reduced-motion: reduce) {\n  .auth-tab[_ngcontent-%COMP%]::after, .auth-submit[_ngcontent-%COMP%], .auth-submit[_ngcontent-%COMP%]::before, .auth-spinner[_ngcontent-%COMP%], .auth-bg__orb[_ngcontent-%COMP%] {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n@media (max-width: 768px) {\n  .auth-right[_ngcontent-%COMP%] {\n    padding: 32px 20px;\n  }\n  .auth-page[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.alt-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n}\n/*# sourceMappingURL=auth.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthComponent, { className: "AuthComponent", filePath: "src\\app\\pages\\auth\\auth.component.ts", lineNumber: 17 });
})();
export {
  AuthComponent
};
//# sourceMappingURL=chunk-7WYMSNXK.js.map
