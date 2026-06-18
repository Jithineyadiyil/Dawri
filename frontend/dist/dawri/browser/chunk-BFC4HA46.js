import {
  TierBadgeComponent
} from "./chunk-TEAPCIHY.js";
import {
  BrandingService
} from "./chunk-XFEL6GUA.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
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
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  ActivatedRoute,
  DomSanitizer,
  Router,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  HttpClient,
  InputFlags,
  KeyValuePipe,
  computed,
  inject,
  input,
  map,
  output,
  signal,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
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
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/shared/tournament-sponsors/tournament-sponsors.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => [];
function TournamentSponsorsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 1)(2, "div", 2);
    \u0275\u0275elementEnd();
  }
}
function TournamentSponsorsComponent_Conditional_1_Template(rf, ctx) {
}
function TournamentSponsorsComponent_Conditional_2_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 9);
    \u0275\u0275listener("error", function TournamentSponsorsComponent_Conditional_2_For_5_Conditional_1_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r1);
      const s_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.markLogoBroken(s_r2.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r2.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r2.name);
  }
}
function TournamentSponsorsComponent_Conditional_2_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r2.name.charAt(0));
  }
}
function TournamentSponsorsComponent_Conditional_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7);
    \u0275\u0275template(1, TournamentSponsorsComponent_Conditional_2_For_5_Conditional_1_Template, 1, 2, "img", 8)(2, TournamentSponsorsComponent_Conditional_2_For_5_Conditional_2_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const s_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ts-logos__item--title", s_r2.placement_type === "title");
    \u0275\u0275property("href", (tmp_12_0 = s_r2.website_url) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : null, \u0275\u0275sanitizeUrl)("title", s_r2.name + (s_r2.placement_type === "title" ? " \u2014 Title Sponsor" : ""));
    \u0275\u0275attribute("target", s_r2.website_url ? "_blank" : null)("rel", s_r2.website_url ? "noopener noreferrer" : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, s_r2.logo_url && !ctx_r2.brokenLogos().has(s_r2.id) ? 1 : 2);
  }
}
function TournamentSponsorsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "span", 4);
    \u0275\u0275text(2, "Sponsored by");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 5);
    \u0275\u0275repeaterCreate(4, TournamentSponsorsComponent_Conditional_2_For_5_Template, 3, 7, "a", 6, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.allSponsors());
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 16);
    \u0275\u0275text(2, "Total Prize Pool");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 24);
    \u0275\u0275listener("error", function TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_4_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r4);
      const title_r5 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.markLogoBroken(title_r5.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const title_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("src", title_r5.logo_url, \u0275\u0275sanitizeUrl)("alt", title_r5.name);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const title_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(title_r5.name.charAt(0));
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const title_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(title_r5.name_ar);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 18);
    \u0275\u0275text(2, "Title Sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 19);
    \u0275\u0275template(4, TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_4_Template, 1, 2, "img", 20)(5, TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_5_Template, 2, 1);
    \u0275\u0275elementStart(6, "div", 21)(7, "div", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, TournamentSponsorsComponent_Conditional_3_Conditional_2_Conditional_9_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const title_r5 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("href", (tmp_3_0 = title_r5.website_url) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : null, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("target", title_r5.website_url ? "_blank" : null)("rel", title_r5.website_url ? "noopener noreferrer" : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, title_r5.logo_url && !ctx_r2.brokenLogos().has(title_r5.id) ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(title_r5.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, title_r5.name_ar ? 9 : -1);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 38);
    \u0275\u0275listener("error", function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_2_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r6);
      const s_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.markLogoBroken(s_r7.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r7.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r7.name);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.name.charAt(0));
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.name_ar);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.tagline);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275text(1, " Visit ");
    \u0275\u0275elementStart(2, "span", 40);
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd()();
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 29)(1, "div", 30);
    \u0275\u0275template(2, TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_2_Template, 1, 2, "img", 31)(3, TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "div", 33);
    \u0275\u0275text(6, "Presented by");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 34);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_9_Template, 2, 1, "div", 35)(10, TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_10_Template, 2, 1, "div", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Conditional_11_Template, 4, 0, "div", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const s_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", (tmp_12_0 = s_r7.website_url) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : null, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("target", s_r7.website_url ? "_blank" : null)("rel", s_r7.website_url ? "noopener noreferrer" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, s_r7.logo_url && !ctx_r2.brokenLogos().has(s_r7.id) ? 2 : 3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(s_r7.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, s_r7.name_ar ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, s_r7.tagline ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, s_r7.website_url ? 11 : -1);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 26)(2, "span", 27);
    \u0275\u0275text(3, "\u2726");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 28);
    \u0275\u0275repeaterCreate(7, TournamentSponsorsComponent_Conditional_3_Conditional_3_For_8_Template, 12, 8, "a", 29, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Presenting Partner", ((tmp_2_0 = (tmp_2_0 = ctx_r2.summary()) == null ? null : tmp_2_0.presenting_sponsors) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : \u0275\u0275pureFunction0(1, _c0)).length > 1 ? "s" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater((tmp_3_0 = (tmp_3_0 = ctx_r2.summary()) == null ? null : tmp_3_0.presenting_sponsors) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : \u0275\u0275pureFunction0(2, _c0));
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 9);
    \u0275\u0275listener("error", function TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Conditional_1_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r8);
      const s_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.markLogoBroken(s_r9.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r9.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r9.name);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9.name);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 42);
    \u0275\u0275template(1, TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Conditional_1_Template, 1, 2, "img", 8)(2, TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Conditional_2_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const s_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", (tmp_12_0 = s_r9.website_url) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : null, \u0275\u0275sanitizeUrl)("title", s_r9.name);
    \u0275\u0275attribute("target", s_r9.website_url ? "_blank" : null)("rel", s_r9.website_url ? "noopener noreferrer" : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, s_r9.logo_url && !ctx_r2.brokenLogos().has(s_r9.id) ? 1 : 2);
  }
}
function TournamentSponsorsComponent_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 18);
    \u0275\u0275text(2, "Supported By");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41);
    \u0275\u0275repeaterCreate(4, TournamentSponsorsComponent_Conditional_3_Conditional_4_For_5_Template, 3, 5, "a", 42, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater((tmp_2_0 = (tmp_2_0 = ctx_r2.summary()) == null ? null : tmp_2_0.supporting_sponsors) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : \u0275\u0275pureFunction0(0, _c0));
  }
}
function TournamentSponsorsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11);
    \u0275\u0275template(1, TournamentSponsorsComponent_Conditional_3_Conditional_1_Template, 5, 1, "div", 12)(2, TournamentSponsorsComponent_Conditional_3_Conditional_2_Template, 10, 6, "div", 13)(3, TournamentSponsorsComponent_Conditional_3_Conditional_3_Template, 9, 3, "div", 14)(4, TournamentSponsorsComponent_Conditional_3_Conditional_4_Template, 6, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", "Tournament sponsors");
    \u0275\u0275advance();
    \u0275\u0275conditional(1, (tmp_2_0 = ctx_r2.prizePoolLabel()) ? 1 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, (tmp_3_0 = (tmp_3_0 = ctx_r2.summary()) == null ? null : tmp_3_0.title_sponsor) ? 2 : -1, tmp_3_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ((tmp_4_0 = (tmp_4_0 = ctx_r2.summary()) == null ? null : tmp_4_0.presenting_sponsors) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : \u0275\u0275pureFunction0(5, _c0)).length > 0 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ((tmp_5_0 = (tmp_5_0 = ctx_r2.summary()) == null ? null : tmp_5_0.supporting_sponsors) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : \u0275\u0275pureFunction0(6, _c0)).length > 0 ? 4 : -1);
  }
}
var TournamentSponsorsComponent = class _TournamentSponsorsComponent {
  constructor() {
    this.tournamentId = input.required();
    this.variant = input("full");
    this.http = inject(HttpClient);
    this.loading = signal(true);
    this.error = signal(null);
    this.summary = signal(null);
    this.brokenLogos = signal(/* @__PURE__ */ new Set());
    this.hasAnySponsor = computed(() => {
      const s = this.summary();
      if (!s)
        return false;
      return !!s.title_sponsor || s.presenting_sponsors.length > 0 || s.supporting_sponsors.length > 0;
    });
    this.allSponsors = computed(() => {
      const s = this.summary();
      if (!s)
        return [];
      return [
        ...s.title_sponsor ? [s.title_sponsor] : [],
        ...s.presenting_sponsors,
        ...s.supporting_sponsors
      ];
    });
    this.prizePoolLabel = computed(() => {
      const s = this.summary();
      if (!s || s.total_pool_sar <= 0)
        return null;
      return `${s.total_pool_sar.toLocaleString("en-US")} SAR`;
    });
  }
  /** Called from the template on <img (error)> — adds the sponsor ID to the
   *  broken set so the fallback renders on the next CD pass. */
  markLogoBroken(sponsorId) {
    const s = new Set(this.brokenLogos());
    s.add(sponsorId);
    this.brokenLogos.set(s);
  }
  ngOnChanges(changes) {
    if (changes["tournamentId"])
      this.fetch();
  }
  fetch() {
    this.loading.set(true);
    this.error.set(null);
    this.http.get(`${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships`).subscribe({
      next: (res) => {
        this.summary.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Could not load sponsors.");
        this.loading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function TournamentSponsorsComponent_Factory(t) {
      return new (t || _TournamentSponsorsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TournamentSponsorsComponent, selectors: [["app-tournament-sponsors"]], inputs: { tournamentId: [InputFlags.SignalBased, "tournamentId"], variant: [InputFlags.SignalBased, "variant"] }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "ts-skeleton"], [1, "ts-skeleton-bar"], [1, "ts-skeleton-bar", "ts-skeleton-bar--short"], [1, "ts-logos"], [1, "ts-logos__label"], [1, "ts-logos__row"], [1, "ts-logos__item", 3, "ts-logos__item--title", "href", "title"], [1, "ts-logos__item", 3, "href", "title"], [3, "src", "alt"], [3, "error", "src", "alt"], [1, "ts-logos__fallback"], [1, "ts-root"], [1, "ts-pool"], [1, "ts-tier", "ts-tier--title"], [1, "ts-tier", "ts-tier--presenting"], [1, "ts-tier", "ts-tier--supporting"], [1, "ts-pool__label"], [1, "ts-pool__value"], [1, "ts-tier__label"], [1, "ts-title-card", 3, "href"], [1, "ts-title-card__logo", 3, "src", "alt"], [1, "ts-title-card__text"], [1, "ts-title-card__name"], [1, "ts-title-card__name-ar"], [1, "ts-title-card__logo", 3, "error", "src", "alt"], [1, "ts-title-card__logo", "ts-logo-fallback"], [1, "ts-tier__label", "ts-tier__label--presenting"], ["aria-hidden", "true", 1, "ts-tier__label-icon"], [1, "ts-presenting-stack"], [1, "ts-presenting-hero", 3, "href"], [1, "ts-presenting-hero__logo-wrap"], [1, "ts-presenting-hero__logo", 3, "src", "alt"], [1, "ts-presenting-hero__text"], [1, "ts-presenting-hero__eyebrow"], [1, "ts-presenting-hero__name"], [1, "ts-presenting-hero__name-ar"], [1, "ts-presenting-hero__tagline"], ["aria-hidden", "true", 1, "ts-presenting-hero__cta"], [1, "ts-presenting-hero__logo", 3, "error", "src", "alt"], [1, "ts-presenting-hero__logo-fallback"], [1, "ts-presenting-hero__cta-arrow"], [1, "ts-supporting-grid"], [1, "ts-supporting-chip", 3, "href", "title"]], template: function TournamentSponsorsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TournamentSponsorsComponent_Conditional_0_Template, 3, 0, "div", 0)(1, TournamentSponsorsComponent_Conditional_1_Template, 0, 0)(2, TournamentSponsorsComponent_Conditional_2_Template, 6, 0)(3, TournamentSponsorsComponent_Conditional_3_Template, 5, 7);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.loading() ? 0 : !ctx.hasAnySponsor() ? 1 : ctx.variant() === "logos" ? 2 : 3);
      }
    }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.ts-root[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 18px;\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 28px;\n  margin: 24px 0;\n}\n.ts-pool[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 14px;\n  padding: 16px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.18),\n      rgba(251, 191, 36, 0.08));\n  border: 1px solid var(--br);\n  border-left: 4px solid var(--gold);\n  border-radius: 12px;\n}\n.ts-pool__label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: var(--mu);\n  font-weight: 600;\n}\n.ts-pool__value[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.4rem, 3vw, 1.9rem);\n  color: var(--gold);\n  letter-spacing: 0.04em;\n}\n.ts-tier__label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  color: var(--mu);\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.ts-title-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  padding: 22px 28px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.12),\n      rgba(0, 0, 0, 0));\n  border: 1px solid var(--gold);\n  border-radius: 14px;\n  text-decoration: none;\n  transition: transform 0.15s, box-shadow 0.2s;\n}\n.ts-title-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px -10px rgba(168, 85, 247, 0.6);\n}\n.ts-title-card__logo[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  object-fit: contain;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.04);\n  padding: 10px;\n  flex-shrink: 0;\n}\n.ts-title-card[_ngcontent-%COMP%]   .ts-logo-fallback[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  font-family: var(--fh);\n  font-size: 3rem;\n  font-weight: 700;\n  color: var(--gold);\n  background: rgba(168, 85, 247, 0.1);\n  padding: 0;\n}\n.ts-title-card__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.ts-title-card__name[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.4rem, 3vw, 1.8rem);\n  color: var(--tx);\n  letter-spacing: 0.04em;\n}\n.ts-title-card__name-ar[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 1rem;\n  color: var(--mu);\n}\n.ts-tier__label--presenting[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--cyan);\n  font-size: 0.78rem;\n  letter-spacing: 0.18em;\n  font-weight: 700;\n}\n.ts-tier__label-icon[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  font-size: 1rem;\n  display: inline-block;\n  transform: translateY(-1px);\n}\n.ts-presenting-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.ts-presenting-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto;\n  align-items: center;\n  gap: 28px;\n  padding: 24px 28px;\n  background:\n    radial-gradient(\n      circle at 0% 50%,\n      rgba(251, 191, 36, 0.1),\n      transparent 55%),\n    linear-gradient(\n      135deg,\n      rgba(251, 191, 36, 0.08),\n      rgba(168, 85, 247, 0.04));\n  border: 1px solid rgba(251, 191, 36, 0.35);\n  border-left: 4px solid var(--cyan);\n  border-radius: 14px;\n  text-decoration: none;\n  position: relative;\n  overflow: hidden;\n  transition:\n    transform 0.15s,\n    border-color 0.2s,\n    box-shadow 0.25s;\n}\n.ts-presenting-hero[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      110deg,\n      transparent 30%,\n      rgba(255, 255, 255, 0.08) 45%,\n      transparent 60%);\n  transform: translateX(-100%);\n  transition: transform 0.6s ease;\n  pointer-events: none;\n}\n.ts-presenting-hero[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: var(--cyan);\n  box-shadow: 0 12px 32px -10px rgba(251, 191, 36, 0.35);\n}\n.ts-presenting-hero[_ngcontent-%COMP%]:hover::after {\n  transform: translateX(100%);\n}\n.ts-presenting-hero[_ngcontent-%COMP%]:hover   .ts-presenting-hero__cta-arrow[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n@media (max-width: 640px) {\n  .ts-presenting-hero[_ngcontent-%COMP%] {\n    grid-template-columns: auto 1fr;\n    gap: 18px;\n    padding: 18px 20px;\n  }\n  .ts-presenting-hero[_ngcontent-%COMP%]   .ts-presenting-hero__cta[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.ts-presenting-hero__logo-wrap[_ngcontent-%COMP%] {\n  width: 96px;\n  height: 96px;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.06);\n  display: grid;\n  place-items: center;\n  padding: 12px;\n  flex-shrink: 0;\n}\n@media (max-width: 640px) {\n  .ts-presenting-hero__logo-wrap[_ngcontent-%COMP%] {\n    width: 72px;\n    height: 72px;\n    padding: 10px;\n  }\n}\n.ts-presenting-hero__logo[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n.ts-presenting-hero__logo-fallback[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  color: var(--cyan);\n  font-weight: 700;\n}\n.ts-presenting-hero__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n}\n.ts-presenting-hero__eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  color: var(--cyan);\n  margin-bottom: 4px;\n}\n.ts-presenting-hero__name[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.4rem, 2.6vw, 1.9rem);\n  letter-spacing: 0.04em;\n  color: var(--tx);\n  line-height: 1.1;\n}\n.ts-presenting-hero__name-ar[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 0.95rem;\n  color: var(--mu);\n  margin-top: 2px;\n}\n.ts-presenting-hero__tagline[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--mu);\n  font-style: italic;\n  margin-top: 4px;\n  line-height: 1.5;\n}\n.ts-presenting-hero__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  background: rgba(251, 191, 36, 0.12);\n  border: 1px solid rgba(251, 191, 36, 0.4);\n  border-radius: 999px;\n  color: var(--cyan);\n  font-size: 0.85rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.ts-presenting-hero__cta-arrow[_ngcontent-%COMP%] {\n  display: inline-block;\n  transition: transform 0.2s;\n}\n.ts-supporting-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));\n  gap: 10px;\n}\n.ts-supporting-chip[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  height: 68px;\n  padding: 12px;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid var(--br);\n  border-radius: 10px;\n  text-decoration: none;\n  transition: border-color 0.15s, background 0.15s;\n}\n.ts-supporting-chip[_ngcontent-%COMP%]:hover {\n  border-color: var(--gold);\n  background: rgba(168, 85, 247, 0.06);\n}\n.ts-supporting-chip[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 48px;\n  object-fit: contain;\n}\n.ts-supporting-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.8rem;\n  text-align: center;\n  font-weight: 500;\n}\n.ts-skeleton[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 18px;\n  padding: 24px;\n  margin: 24px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.ts-skeleton-bar[_ngcontent-%COMP%] {\n  height: 48px;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.03),\n      rgba(255, 255, 255, 0.06),\n      rgba(255, 255, 255, 0.03));\n  background-size: 200% 100%;\n  border-radius: 10px;\n  animation: _ngcontent-%COMP%_ts-shimmer 1.4s infinite;\n}\n.ts-skeleton-bar--short[_ngcontent-%COMP%] {\n  width: 40%;\n  height: 28px;\n}\n@keyframes _ngcontent-%COMP%_ts-shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ts-skeleton-bar[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .ts-title-card[_ngcontent-%COMP%], .ts-presenting-card[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n.ts-logos[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  padding-top: 16px;\n  border-top: 1px solid var(--line, rgba(255, 255, 255, 0.08));\n}\n.ts-logos__label[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n  margin-bottom: 10px;\n}\n.ts-logos__row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: center;\n}\n.ts-logos__item[_ngcontent-%COMP%] {\n  display: inline-grid;\n  place-items: center;\n  height: 40px;\n  min-width: 52px;\n  padding: 6px 10px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--line, rgba(255, 255, 255, 0.08));\n  border-radius: 8px;\n  text-decoration: none;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    transform 0.15s;\n}\n.ts-logos__item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 26px;\n  max-width: 84px;\n  width: auto;\n  object-fit: contain;\n  display: block;\n  opacity: 0.92;\n  transition: opacity 0.15s;\n}\n.ts-logos__item[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent, #d4af37);\n  background: rgba(255, 255, 255, 0.08);\n  transform: translateY(-2px);\n}\n.ts-logos__item[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.ts-logos__item--title[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.45);\n  background: rgba(212, 175, 55, 0.08);\n  height: 46px;\n}\n.ts-logos__item--title[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 30px;\n}\n.ts-logos__fallback[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  color: var(--accent, #d4af37);\n  line-height: 1;\n}\n/*# sourceMappingURL=tournament-sponsors.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TournamentSponsorsComponent, { className: "TournamentSponsorsComponent", filePath: "src\\app\\shared\\tournament-sponsors\\tournament-sponsors.component.ts", lineNumber: 60 });
})();

// src/app/shared/tournament-sponsors-manage/tournament-sponsors-manage.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function TournamentSponsorsManageComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4, "awaiting approval");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.pendingCount());
  }
}
function TournamentSponsorsManageComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4, "live");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.activeCount());
  }
}
function TournamentSponsorsManageComponent_Conditional_14_For_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " (private) ");
  }
}
function TournamentSponsorsManageComponent_Conditional_14_For_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \u2014 ", s_r3.tagline, " ");
  }
}
function TournamentSponsorsManageComponent_Conditional_14_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275text(1);
    \u0275\u0275template(2, TournamentSponsorsManageComponent_Conditional_14_For_13_Conditional_2_Template, 1, 0)(3, TournamentSponsorsManageComponent_Conditional_14_For_13_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275property("value", s_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r3.name, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(2, s_r3.is_global === false ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, s_r3.tagline ? 3 : -1);
  }
}
function TournamentSponsorsManageComponent_Conditional_14_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 24);
    \u0275\u0275text(1, 'No sponsors yet. Click "Create new sponsor" to add one.');
    \u0275\u0275elementEnd();
  }
}
function TournamentSponsorsManageComponent_Conditional_14_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 18)(1, "span", 19);
    \u0275\u0275text(2, "Cash amount (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Conditional_35_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.cash_amount_sar, $event) || (ctx_r0.newDeal.cash_amount_sar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.cash_amount_sar);
  }
}
function TournamentSponsorsManageComponent_Conditional_14_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 18)(1, "span", 19);
    \u0275\u0275text(2, "In-kind description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Conditional_36_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.in_kind_description, $event) || (ctx_r0.newDeal.in_kind_description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "label", 25)(5, "span", 19);
    \u0275\u0275text(6, "Estimated value (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Conditional_36_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.in_kind_value_sar, $event) || (ctx_r0.newDeal.in_kind_value_sar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.in_kind_description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.in_kind_value_sar);
  }
}
function TournamentSponsorsManageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "h4", 16);
    \u0275\u0275text(2, "Propose a new sponsorship");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "label", 18)(5, "span", 19);
    \u0275\u0275text(6, " Sponsor ");
    \u0275\u0275elementStart(7, "button", 20);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openCreateSponsor());
    });
    \u0275\u0275text(8, "+ Create new sponsor");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.sponsor_id, $event) || (ctx_r0.newDeal.sponsor_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(10, "option", 22);
    \u0275\u0275text(11, "Select a sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, TournamentSponsorsManageComponent_Conditional_14_For_13_Template, 4, 4, "option", 23, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, TournamentSponsorsManageComponent_Conditional_14_Conditional_14_Template, 2, 0, "small", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "label", 25)(16, "span", 19);
    \u0275\u0275text(17, "Placement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Template_select_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.placement_type, $event) || (ctx_r0.newDeal.placement_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(19, "option", 26);
    \u0275\u0275text(20, "Title \u2014 headline branding");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 27);
    \u0275\u0275text(22, "Presenting \u2014 large hero card");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 28);
    \u0275\u0275text(24, "Supporting \u2014 logo in grid");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "label", 25)(26, "span", 19);
    \u0275\u0275text(27, "Contribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.contribution_type, $event) || (ctx_r0.newDeal.contribution_type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(29, "option", 29);
    \u0275\u0275text(30, "Cash (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 30);
    \u0275\u0275text(32, "In-kind goods");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 31);
    \u0275\u0275text(34, "Logo only (no money)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(35, TournamentSponsorsManageComponent_Conditional_14_Conditional_35_Template, 4, 1, "label", 18)(36, TournamentSponsorsManageComponent_Conditional_14_Conditional_36_Template, 8, 2);
    \u0275\u0275elementStart(37, "label", 18)(38, "span", 19);
    \u0275\u0275text(39, "Notes for admin (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "textarea", 32);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_14_Template_textarea_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newDeal.notes, $event) || (ctx_r0.newDeal.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 33)(42, "button", 34);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_14_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelForm());
    });
    \u0275\u0275text(43, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 9);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_14_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveDeal());
    });
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.sponsor_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.catalog());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(14, ctx_r0.catalog().length === 0 ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.placement_type);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.contribution_type);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(35, ctx_r0.newDeal.contribution_type === "cash" ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(36, ctx_r0.newDeal.contribution_type === "in_kind" ? 36 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newDeal.notes);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Submitting\u2026" : "Submit for approval", " ");
  }
}
function TournamentSponsorsManageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function TournamentSponsorsManageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, " No sponsorship deals yet. Click ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Propose sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " to add one. ");
    \u0275\u0275elementEnd();
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 40);
  }
  if (rf & 2) {
    const d_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", d_r6.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", d_r6.sponsor.name);
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const d_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, d_r6.cash_amount_sar), " SAR ");
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 43);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind1(2, 1, d_r6.in_kind_value_sar), " SAR)");
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275template(1, TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_12_Conditional_1_Template, 3, 3, "small", 43);
  }
  if (rf & 2) {
    const d_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", d_r6.in_kind_description, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(1, d_r6.in_kind_value_sar ? 1 : -1);
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "Logo only");
    \u0275\u0275elementEnd();
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const d_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.withdrawProposal(d_r6));
    });
    \u0275\u0275text(1, " Withdraw ");
    \u0275\u0275elementEnd();
  }
}
function TournamentSponsorsManageComponent_Conditional_17_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 39);
    \u0275\u0275template(2, TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_2_Template, 1, 2, "img", 40);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275template(11, TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_11_Template, 2, 3)(12, TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_12_Template, 2, 2)(13, TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_13_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 41);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275template(18, TournamentSponsorsManageComponent_Conditional_17_For_16_Conditional_18_Template, 2, 0, "button", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const d_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, (d_r6.sponsor == null ? null : d_r6.sponsor.logo_url) ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_12_0 = d_r6.sponsor == null ? null : d_r6.sponsor.name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("tier-pill tier-", d_r6.placement_type, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r6.placement_type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r6.contribution_type);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, d_r6.contribution_type === "cash" ? 11 : d_r6.contribution_type === "in_kind" ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r0.statusClass(d_r6.contract_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.prettyStatus(d_r6.contract_status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(18, d_r6.contract_status === "pending" ? 18 : -1);
  }
}
function TournamentSponsorsManageComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Placement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Contribution");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Value");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, TournamentSponsorsManageComponent_Conditional_17_For_16_Template, 19, 12, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.deals());
  }
}
function TournamentSponsorsManageComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = ctx;
    \u0275\u0275classProp("ok", t_r8.ok)("err", !t_r8.ok);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r8.msg);
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_9_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "em");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const kv_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", kv_r10.key, ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", kv_r10.value, "");
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 64);
    \u0275\u0275repeaterCreate(1, TournamentSponsorsManageComponent_Conditional_19_Conditional_9_Conditional_6_For_2_Template, 4, 2, "li", null, _forTrack1);
    \u0275\u0275pipe(3, "keyvalue");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r11 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(3, 0, err_r11.fields));
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "span", 62);
    \u0275\u0275text(2, "\u26A0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 63)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, TournamentSponsorsManageComponent_Conditional_19_Conditional_9_Conditional_6_Template, 4, 2, "ul", 64);
    \u0275\u0275pipe(7, "keyvalue");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const err_r11 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(err_r11.message);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, \u0275\u0275pipeBind1(7, 2, err_r11.fields).length > 0 ? 6 : -1);
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "img", 65);
    \u0275\u0275elementStart(2, "span", 66);
    \u0275\u0275text(3, "Preview");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.logoPreviewUrl(), \u0275\u0275sanitizeUrl);
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.uploadingLogo() ? "Uploading logo\u2026" : "Creating sponsor\u2026", " ");
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Save sponsor ");
  }
}
function TournamentSponsorsManageComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelCreateSponsor());
    });
    \u0275\u0275elementStart(1, "div", 47);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 48)(3, "h3");
    \u0275\u0275text(4, "Create a new sponsor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 49);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelCreateSponsor());
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 50);
    \u0275\u0275text(8, " This sponsor will be visible on your tournaments immediately. An admin can later add it to the global catalog so other organizers can use it too. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, TournamentSponsorsManageComponent_Conditional_19_Conditional_9_Template, 8, 4, "div", 51);
    \u0275\u0275elementStart(10, "div", 17)(11, "label", 18)(12, "span", 19);
    \u0275\u0275text(13, "Brand name *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_19_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.name, $event) || (ctx_r0.newSponsor.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, TournamentSponsorsManageComponent_Conditional_19_Conditional_15_Template, 2, 1, "small", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "label", 25)(17, "span", 19);
    \u0275\u0275text(18, "Arabic name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_19_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.name_ar, $event) || (ctx_r0.newSponsor.name_ar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label", 25)(21, "span", 19);
    \u0275\u0275text(22, "Website");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_19_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.website_url, $event) || (ctx_r0.newSponsor.website_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, TournamentSponsorsManageComponent_Conditional_19_Conditional_24_Template, 2, 1, "small", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "label", 18)(26, "span", 19);
    \u0275\u0275text(27, "Tagline (short slogan)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_19_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.tagline, $event) || (ctx_r0.newSponsor.tagline = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "label", 25)(30, "span", 19);
    \u0275\u0275text(31, "Contact name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_19_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.contact_name, $event) || (ctx_r0.newSponsor.contact_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "label", 25)(34, "span", 19);
    \u0275\u0275text(35, "Contact email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function TournamentSponsorsManageComponent_Conditional_19_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newSponsor.contact_email, $event) || (ctx_r0.newSponsor.contact_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, TournamentSponsorsManageComponent_Conditional_19_Conditional_37_Template, 2, 1, "small", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "label", 18)(39, "span", 19);
    \u0275\u0275text(40, "Logo (PNG, JPG, SVG, WebP \u2014 max 2 MB)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 59);
    \u0275\u0275listener("change", function TournamentSponsorsManageComponent_Conditional_19_Template_input_change_41_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onLogoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, TournamentSponsorsManageComponent_Conditional_19_Conditional_42_Template, 4, 1, "div", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "footer", 61)(44, "button", 34);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_19_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelCreateSponsor());
    });
    \u0275\u0275text(45, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 9);
    \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Conditional_19_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveNewSponsor());
    });
    \u0275\u0275template(47, TournamentSponsorsManageComponent_Conditional_19_Conditional_47_Template, 1, 1)(48, TournamentSponsorsManageComponent_Conditional_19_Conditional_48_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_11_0;
    let tmp_13_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(9, (tmp_1_0 = ctx_r0.createError()) ? 9 : -1, tmp_1_0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tsm-field--invalid", (tmp_2_0 = ctx_r0.createError()) == null ? null : tmp_2_0.fields == null ? null : tmp_2_0.fields["name"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, (tmp_4_0 = (tmp_4_0 = ctx_r0.createError()) == null ? null : tmp_4_0.fields == null ? null : tmp_4_0.fields["name"]) ? 15 : -1, tmp_4_0);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.name_ar);
    \u0275\u0275advance();
    \u0275\u0275classProp("tsm-field--invalid", (tmp_6_0 = ctx_r0.createError()) == null ? null : tmp_6_0.fields == null ? null : tmp_6_0.fields["website_url"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.website_url);
    \u0275\u0275advance();
    \u0275\u0275conditional(24, (tmp_8_0 = (tmp_8_0 = ctx_r0.createError()) == null ? null : tmp_8_0.fields == null ? null : tmp_8_0.fields["website_url"]) ? 24 : -1, tmp_8_0);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.tagline);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.contact_name);
    \u0275\u0275advance();
    \u0275\u0275classProp("tsm-field--invalid", (tmp_11_0 = ctx_r0.createError()) == null ? null : tmp_11_0.fields == null ? null : tmp_11_0.fields["contact_email"]);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newSponsor.contact_email);
    \u0275\u0275advance();
    \u0275\u0275conditional(37, (tmp_13_0 = (tmp_13_0 = ctx_r0.createError()) == null ? null : tmp_13_0.fields == null ? null : tmp_13_0.fields["contact_email"]) ? 37 : -1, tmp_13_0);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(42, ctx_r0.logoPreviewUrl() ? 42 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.creatingSponsor() || ctx_r0.uploadingLogo());
    \u0275\u0275advance();
    \u0275\u0275conditional(47, ctx_r0.creatingSponsor() || ctx_r0.uploadingLogo() ? 47 : 48);
  }
}
var TournamentSponsorsManageComponent = class _TournamentSponsorsManageComponent {
  constructor() {
    this.tournamentId = input.required();
    this.http = inject(HttpClient);
    this.loading = signal(true);
    this.deals = signal([]);
    this.catalog = signal([]);
    this.showForm = signal(false);
    this.saving = signal(false);
    this.toast = signal(null);
    this.showCreateSponsor = signal(false);
    this.creatingSponsor = signal(false);
    this.uploadingLogo = signal(false);
    this.logoFile = signal(null);
    this.logoPreviewUrl = signal(null);
    this.createError = signal(null);
    this.newSponsor = this.emptySponsor();
    this.newDeal = this.emptyDeal();
    this.pendingCount = computed(() => this.deals().filter((d) => d.contract_status === "pending").length);
    this.activeCount = computed(() => this.deals().filter((d) => d.contract_status === "active").length);
  }
  ngOnChanges(ch) {
    if (ch["tournamentId"]) {
      this.loadDeals();
      this.loadCatalog();
    }
  }
  /* ── Data loads ─────────────────────────────────────────────────── */
  loadDeals() {
    this.loading.set(true);
    this.http.get(`${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships/manage`).subscribe({
      next: (res) => {
        this.deals.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.flash("Could not load sponsorships", false);
        this.loading.set(false);
      }
    });
  }
  loadCatalog() {
    this.http.get(`${environment.apiUrl}/sponsors-catalog`).subscribe({
      next: (res) => this.catalog.set(res.data),
      error: () => {
      }
    });
  }
  /* ── Form actions ───────────────────────────────────────────────── */
  openForm() {
    this.newDeal = this.emptyDeal();
    this.showForm.set(true);
  }
  cancelForm() {
    this.showForm.set(false);
  }
  saveDeal() {
    if (!this.newDeal.sponsor_id) {
      this.flash("Pick a sponsor", false);
      return;
    }
    if (this.newDeal.contribution_type === "cash" && !(this.newDeal.cash_amount_sar > 0)) {
      this.flash("Cash amount must be positive", false);
      return;
    }
    if (this.newDeal.contribution_type === "in_kind" && !this.newDeal.in_kind_description.trim()) {
      this.flash("In-kind requires a description", false);
      return;
    }
    this.saving.set(true);
    this.http.post(`${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships/manage`, this.newDeal).subscribe({
      next: () => {
        this.saving.set(false);
        this.showForm.set(false);
        this.flash("Proposal sent for admin review", true);
        this.loadDeals();
      },
      error: (err) => {
        this.saving.set(false);
        this.flash(err.error?.message ?? "Could not submit proposal", false);
      }
    });
  }
  withdrawProposal(deal) {
    if (!confirm(`Withdraw proposal to sponsor ${deal.sponsor?.name ?? "this deal"}?`))
      return;
    this.http.delete(`${environment.apiUrl}/tournaments/${this.tournamentId()}/sponsorships/manage/${deal.id}`).subscribe({
      next: () => {
        this.flash("Proposal withdrawn", true);
        this.loadDeals();
      },
      error: (err) => this.flash(err.error?.message ?? "Could not withdraw", false)
    });
  }
  /* ── Helpers ────────────────────────────────────────────────────── */
  statusClass(s) {
    return `status-${s}`;
  }
  prettyStatus(s) {
    const map2 = {
      draft: "Draft",
      pending: "Awaiting approval",
      active: "Active",
      fulfilled: "Fulfilled",
      cancelled: "Cancelled"
    };
    return map2[s] ?? s;
  }
  flash(msg, ok) {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3e3);
  }
  emptyDeal() {
    return {
      sponsor_id: "",
      placement_type: "supporting",
      contribution_type: "cash",
      cash_amount_sar: 0,
      in_kind_description: "",
      in_kind_value_sar: null,
      notes: ""
    };
  }
  /* ═══════════════════════════════════════════════════════════════
   *  Sprint 10 — Inline sponsor creation + logo upload
   * ═══════════════════════════════════════════════════════════════ */
  openCreateSponsor() {
    this.newSponsor = this.emptySponsor();
    this.logoFile.set(null);
    this.logoPreviewUrl.set(null);
    this.createError.set(null);
    this.showCreateSponsor.set(true);
  }
  cancelCreateSponsor() {
    this.showCreateSponsor.set(false);
  }
  /** Handle <input type="file"> change. Validates size and type client-side. */
  onLogoSelected(event) {
    const input2 = event.target;
    const file = input2.files?.[0] ?? null;
    if (!file) {
      this.logoFile.set(null);
      this.logoPreviewUrl.set(null);
      return;
    }
    const allowed = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
    if (!allowed.includes(file.type)) {
      this.flash("Logo must be PNG, JPG, SVG, or WebP", false);
      input2.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.flash("Logo must be 2 MB or smaller", false);
      input2.value = "";
      return;
    }
    this.logoFile.set(file);
    const reader = new FileReader();
    reader.onload = () => this.logoPreviewUrl.set(reader.result);
    reader.readAsDataURL(file);
  }
  /**
   * Create the sponsor, then upload its logo (if one was chosen), then
   * refresh the catalog and auto-select the new entry in the deal form.
   */
  saveNewSponsor() {
    this.createError.set(null);
    if (!this.newSponsor.name.trim()) {
      this.createError.set({ message: "Brand name is required.", fields: { name: "Required" } });
      return;
    }
    if (this.newSponsor.website_url && !/^https?:\/\//i.test(this.newSponsor.website_url)) {
      this.newSponsor.website_url = "https://" + this.newSponsor.website_url.trim();
    }
    this.creatingSponsor.set(true);
    this.http.post(`${environment.apiUrl}/sponsors`, this.newSponsor).subscribe({
      next: (res) => {
        const created = res.data;
        if (this.logoFile()) {
          this.uploadLogoFor(created.id, () => this.onSponsorCreated(created));
        } else {
          this.onSponsorCreated(created);
        }
      },
      error: (err) => {
        this.creatingSponsor.set(false);
        this.applyServerError(err);
      }
    });
  }
  /**
   * Parse a Laravel error response and render inline in the modal.
   * Handles 422 (validation), 403 (authz), 500 (server), and network errors.
   */
  applyServerError(err) {
    const e = err;
    const fields = {};
    if (e.error?.errors) {
      for (const [key, msgs] of Object.entries(e.error.errors)) {
        fields[key] = Array.isArray(msgs) ? msgs[0] : String(msgs);
      }
    }
    const topMessage = e.error?.message ?? (e.status === 0 ? "Cannot reach the server. Check your connection." : e.status === 403 ? "You are not authorized to create sponsors." : e.status === 500 ? "Server error. Please try again or contact support." : "Could not create sponsor.");
    this.createError.set({ message: topMessage, fields });
  }
  uploadLogoFor(sponsorId, done) {
    const file = this.logoFile();
    if (!file) {
      done();
      return;
    }
    this.uploadingLogo.set(true);
    const fd = new FormData();
    fd.append("logo", file);
    this.http.post(`${environment.apiUrl}/sponsors/${sponsorId}/logo`, fd).subscribe({
      next: () => {
        this.uploadingLogo.set(false);
        done();
      },
      error: () => {
        this.uploadingLogo.set(false);
        this.flash("Sponsor created but logo upload failed. You can retry later.", false);
        done();
      }
    });
  }
  onSponsorCreated(created) {
    this.creatingSponsor.set(false);
    this.flash("Sponsor created. Now set up the deal.", true);
    this.showCreateSponsor.set(false);
    this.loadCatalog();
    this.newDeal.sponsor_id = created.id;
  }
  emptySponsor() {
    return {
      name: "",
      name_ar: null,
      tagline: null,
      website_url: null,
      contact_name: null,
      contact_email: null
    };
  }
  static {
    this.\u0275fac = function TournamentSponsorsManageComponent_Factory(t) {
      return new (t || _TournamentSponsorsManageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TournamentSponsorsManageComponent, selectors: [["app-tournament-sponsors-manage"]], inputs: { tournamentId: [InputFlags.SignalBased, "tournamentId"] }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 20, vars: 7, consts: [[1, "tsm-root"], [1, "tsm-header"], [1, "tsm-header__titles"], [1, "tsm-header__title"], ["aria-hidden", "true", 1, "tsm-header__icon"], [1, "tsm-header__sub"], [1, "tsm-header__stats"], [1, "tsm-chip", "tsm-chip--pending"], [1, "tsm-chip", "tsm-chip--active"], ["type", "button", 1, "tsm-btn", "tsm-btn--primary", 3, "click", "disabled"], [1, "tsm-form"], [1, "tsm-empty"], [1, "tsm-toast", 3, "ok", "err"], [1, "tsm-modal-backdrop"], [1, "tsm-chip__num"], [1, "tsm-chip__label"], [1, "tsm-form__title"], [1, "tsm-form__grid"], [1, "tsm-field", "tsm-field--span2"], [1, "tsm-field__label"], ["type", "button", 1, "tsm-inline-create", 3, "click"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "tsm-field__hint"], [1, "tsm-field"], ["value", "title"], ["value", "presenting"], ["value", "supporting"], ["value", "cash"], ["value", "in_kind"], ["value", "logo"], ["rows", "3", "placeholder", "Any context the admin should know \u2014 contract status, sponsor contacts, etc.", 3, "ngModelChange", "ngModel"], [1, "tsm-form__actions"], ["type", "button", 1, "tsm-btn", "tsm-btn--ghost", 3, "click"], ["type", "number", "min", "1", "step", "1", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "e.g. 10 Logitech G Pro Keyboards", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "1", 3, "ngModelChange", "ngModel"], [1, "tsm-table"], [1, "sponsor-cell"], [3, "src", "alt"], [1, "tsm-badge"], [1, "tsm-btn-link", "tsm-btn-link--danger"], [1, "muted"], [1, "tsm-btn-link", "tsm-btn-link--danger", 3, "click"], [1, "tsm-toast"], [1, "tsm-modal-backdrop", 3, "click"], [1, "tsm-modal", 3, "click"], [1, "tsm-modal__header"], ["type", "button", "aria-label", "Close", 1, "tsm-modal__close", 3, "click"], [1, "tsm-modal__intro"], ["role", "alert", 1, "tsm-modal__error"], ["type", "text", "maxlength", "120", "placeholder", "e.g. Acme Energy Drinks", 3, "ngModelChange", "ngModel"], [1, "tsm-field__error"], ["type", "text", "maxlength", "120", 3, "ngModelChange", "ngModel"], ["type", "url", "placeholder", "https://", 3, "ngModelChange", "ngModel"], ["type", "text", "maxlength", "200", "placeholder", "e.g. Fuel your play", 3, "ngModelChange", "ngModel"], ["type", "text", 3, "ngModelChange", "ngModel"], ["type", "email", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", "image/png,image/jpeg,image/svg+xml,image/webp", 3, "change"], [1, "tsm-logo-preview"], [1, "tsm-modal__actions"], ["aria-hidden", "true", 1, "tsm-modal__error-icon"], [1, "tsm-modal__error-body"], [1, "tsm-modal__error-list"], ["alt", "Logo preview", 3, "src"], [1, "tsm-logo-preview__label"]], template: function TournamentSponsorsManageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "h3", 3)(4, "span", 4);
        \u0275\u0275text(5, "\u{1F91D}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Tournament Sponsors ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 5);
        \u0275\u0275text(8, " Propose sponsorship deals for this tournament. Proposals require admin approval before going public. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6);
        \u0275\u0275template(10, TournamentSponsorsManageComponent_Conditional_10_Template, 5, 1, "div", 7)(11, TournamentSponsorsManageComponent_Conditional_11_Template, 5, 1, "div", 8);
        \u0275\u0275elementStart(12, "button", 9);
        \u0275\u0275listener("click", function TournamentSponsorsManageComponent_Template_button_click_12_listener() {
          return ctx.openForm();
        });
        \u0275\u0275text(13, " + Propose sponsor ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(14, TournamentSponsorsManageComponent_Conditional_14_Template, 46, 9, "div", 10)(15, TournamentSponsorsManageComponent_Conditional_15_Template, 2, 0, "div", 11)(16, TournamentSponsorsManageComponent_Conditional_16_Template, 5, 0)(17, TournamentSponsorsManageComponent_Conditional_17_Template, 17, 0)(18, TournamentSponsorsManageComponent_Conditional_18_Template, 2, 5, "div", 12)(19, TournamentSponsorsManageComponent_Conditional_19_Template, 49, 19, "div", 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_5_0;
        \u0275\u0275advance(10);
        \u0275\u0275conditional(10, ctx.pendingCount() > 0 ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, ctx.activeCount() > 0 ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.showForm());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(14, ctx.showForm() ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.loading() ? 15 : ctx.deals().length === 0 ? 16 : 17);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(18, (tmp_5_0 = ctx.toast()) ? 18 : -1, tmp_5_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(19, ctx.showCreateSponsor() ? 19 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, KeyValuePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, NgModel], styles: ['@charset "UTF-8";\n\n\n\n.tsm-root[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 14px;\n  padding: 24px;\n  margin: 24px 0;\n  color: var(--tx);\n  position: relative;\n}\n.tsm-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 18px;\n  margin-bottom: 22px;\n  flex-wrap: wrap;\n}\n.tsm-header__titles[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 240px;\n}\n.tsm-header__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.15rem;\n  letter-spacing: 0.03em;\n  margin: 0;\n  color: var(--tx);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.tsm-header__icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.tsm-header__sub[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--mu);\n  margin: 0;\n  line-height: 1.55;\n  max-width: 520px;\n}\n.tsm-header__stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.tsm-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n.tsm-chip__num[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1rem;\n  font-weight: 700;\n}\n.tsm-chip__label[_ngcontent-%COMP%] {\n  opacity: 0.85;\n  font-size: 0.72rem;\n  letter-spacing: 0.04em;\n}\n.tsm-chip--pending[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.12);\n  color: var(--cyan);\n  border: 1px solid rgba(251, 191, 36, 0.35);\n}\n.tsm-chip--active[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.12);\n  color: #4ade80;\n  border: 1px solid rgba(74, 222, 128, 0.35);\n}\n.tsm-btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border-radius: 10px;\n  font-weight: 700;\n  font-size: 0.85rem;\n  letter-spacing: 0.03em;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition:\n    transform 0.1s,\n    box-shadow 0.2s,\n    opacity 0.2s;\n  font-family: inherit;\n}\n.tsm-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.tsm-btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      var(--gold),\n      #7e22ce);\n  color: #fff;\n  box-shadow: 0 4px 14px -6px rgba(168, 85, 247, 0.6);\n}\n.tsm-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 18px -6px rgba(168, 85, 247, 0.8);\n}\n.tsm-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--mu);\n  border-color: var(--br);\n}\n.tsm-btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--tx);\n  border-color: var(--mu);\n}\n.tsm-btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 4px 8px;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 0.85rem;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  transition: color 0.15s;\n}\n.tsm-btn-link--danger[_ngcontent-%COMP%] {\n  color: #f87171;\n}\n.tsm-btn-link--danger[_ngcontent-%COMP%]:hover {\n  color: #fca5a5;\n}\n.tsm-form[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.04);\n  border: 1px dashed rgba(168, 85, 247, 0.4);\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 22px;\n}\n.tsm-form__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 0.95rem;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: var(--gold);\n  margin: 0 0 16px;\n}\n.tsm-form__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n@media (max-width: 640px) {\n  .tsm-form__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.tsm-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  margin-top: 16px;\n  padding-top: 14px;\n  border-top: 1px solid var(--br);\n}\n.tsm-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.tsm-field--span2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n@media (max-width: 640px) {\n  .tsm-field--span2[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n}\n.tsm-field__label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  color: var(--mu);\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n}\n.tsm-field__hint[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--dim);\n}\n.tsm-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .tsm-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .tsm-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: #12132b;\n  border: 1px solid #2a2d4a;\n  border-radius: 8px;\n  padding: 10px 12px;\n  color: #f4f4f7;\n  font-family: inherit;\n  font-size: 0.95rem;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background-color 0.15s;\n}\n.tsm-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, .tsm-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, .tsm-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: #6b6f8a;\n}\n.tsm-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover, .tsm-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover, .tsm-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:hover {\n  border-color: #3a3d5c;\n}\n.tsm-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .tsm-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .tsm-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--gold);\n  background: #181932;\n  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.25);\n}\n.tsm-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, .tsm-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, .tsm-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.tsm-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  appearance: none;\n  -webkit-appearance: none;\n  background-image:\n    linear-gradient(\n      45deg,\n      transparent 50%,\n      #f4f4f7 50%),\n    linear-gradient(\n      -45deg,\n      transparent 50%,\n      #f4f4f7 50%);\n  background-position: calc(100% - 18px) calc(50% - 2px), calc(100% - 13px) calc(50% - 2px);\n  background-size: 5px 5px, 5px 5px;\n  background-repeat: no-repeat;\n  padding-right: 36px;\n  cursor: pointer;\n}\n.tsm-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background-color: #12132b;\n  color: #f4f4f7;\n  padding: 8px 12px;\n}\n.tsm-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]:checked, .tsm-field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%]:hover {\n  background-color: #2a1f4a;\n  color: #fbbf24;\n}\n.tsm-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 70px;\n}\n.tsm-field[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  cursor: pointer;\n}\n.tsm-field[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]::file-selector-button {\n  background: rgba(168, 85, 247, 0.18);\n  color: #f4f4f7;\n  border: 1px solid rgba(168, 85, 247, 0.4);\n  border-radius: 6px;\n  padding: 6px 12px;\n  margin-right: 12px;\n  font-family: inherit;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.tsm-field[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]::file-selector-button:hover {\n  background: rgba(168, 85, 247, 0.3);\n}\n.tsm-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.tsm-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--mu);\n  border-bottom: 1px solid var(--br);\n}\n.tsm-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n  font-size: 0.88rem;\n  color: var(--tx);\n  border-bottom: 1px solid var(--br);\n  vertical-align: middle;\n}\n.tsm-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.tsm-table[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: var(--dim);\n  font-size: 0.78rem;\n}\n.tsm-table[_ngcontent-%COMP%]   .sponsor-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.tsm-table[_ngcontent-%COMP%]   .sponsor-cell[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  object-fit: contain;\n  background: rgba(255, 255, 255, 0.04);\n  padding: 4px;\n}\n.tier-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n.tier-pill.tier-title[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      rgba(168, 85, 247, 0.25),\n      rgba(168, 85, 247, 0.08));\n  color: var(--gold);\n  border: 1px solid var(--gold);\n}\n.tier-pill.tier-presenting[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.12);\n  color: var(--cyan);\n  border: 1px solid var(--cyan);\n}\n.tier-pill.tier-supporting[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--mu);\n  border: 1px solid var(--br);\n}\n.tsm-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n}\n.tsm-badge.status-draft[_ngcontent-%COMP%] {\n  background: rgba(203, 213, 225, 0.1);\n  color: #cbd5e1;\n  border: 1px solid rgba(203, 213, 225, 0.2);\n}\n.tsm-badge.status-pending[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.12);\n  color: var(--cyan);\n  border: 1px solid rgba(251, 191, 36, 0.3);\n}\n.tsm-badge.status-active[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.14);\n  color: #4ade80;\n  border: 1px solid rgba(74, 222, 128, 0.3);\n}\n.tsm-badge.status-fulfilled[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.14);\n  color: var(--gold);\n  border: 1px solid rgba(168, 85, 247, 0.3);\n}\n.tsm-badge.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.12);\n  color: #f87171;\n  border: 1px solid rgba(248, 113, 113, 0.3);\n}\n.tsm-empty[_ngcontent-%COMP%] {\n  padding: 32px;\n  text-align: center;\n  color: var(--dim);\n  background: rgba(255, 255, 255, 0.02);\n  border: 1px dashed var(--br);\n  border-radius: 10px;\n}\n.tsm-empty[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--tx);\n}\n.tsm-toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 32px;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 12px 20px;\n  border-radius: 10px;\n  font-size: 0.88rem;\n  z-index: 300;\n}\n.tsm-toast.ok[_ngcontent-%COMP%] {\n  background: rgba(74, 222, 128, 0.2);\n  border: 1px solid rgba(74, 222, 128, 0.4);\n  color: #6ee7b7;\n}\n.tsm-toast.err[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.2);\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  color: #fca5a5;\n}\n.tsm-inline-create[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-family: inherit;\n  background: none;\n  border: none;\n  color: var(--cyan);\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  padding: 0 0 0 10px;\n}\n.tsm-inline-create[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n}\n.tsm-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(10, 10, 20, 0.72);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: grid;\n  place-items: center;\n  z-index: 200;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_tsm-backdrop-in 0.15s ease-out;\n}\n.tsm-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 640px;\n  max-height: calc(100vh - 48px);\n  overflow-y: auto;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 16px;\n  padding: 28px;\n  color: var(--tx);\n  animation: _ngcontent-%COMP%_tsm-modal-in 0.2s cubic-bezier(0.2, 0.9, 0.3, 1.1);\n}\n.tsm-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.tsm-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.2rem;\n  letter-spacing: 0.03em;\n  margin: 0;\n  color: var(--gold);\n}\n.tsm-modal__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mu);\n  font-size: 1.3rem;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 6px;\n  transition: color 0.15s, background 0.15s;\n}\n.tsm-modal__close[_ngcontent-%COMP%]:hover {\n  color: var(--tx);\n  background: rgba(255, 255, 255, 0.05);\n}\n.tsm-modal__intro[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.85rem;\n  line-height: 1.6;\n  margin: 0 0 20px;\n  padding: 12px 14px;\n  background: rgba(251, 191, 36, 0.08);\n  border-left: 3px solid var(--cyan);\n  border-radius: 6px;\n}\n.tsm-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  margin-top: 22px;\n  padding-top: 16px;\n  border-top: 1px solid var(--br);\n}\n.tsm-logo-preview[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 10px 14px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px dashed var(--br);\n  border-radius: 10px;\n}\n.tsm-logo-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  object-fit: contain;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.04);\n  padding: 6px;\n}\n.tsm-logo-preview__label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--mu);\n  font-weight: 600;\n}\n@keyframes _ngcontent-%COMP%_tsm-backdrop-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tsm-modal-in {\n  from {\n    opacity: 0;\n    transform: translateY(16px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .tsm-modal-backdrop[_ngcontent-%COMP%], .tsm-modal[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.tsm-modal__error[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  padding: 14px 16px;\n  margin: 0 0 20px;\n  background: rgba(248, 113, 113, 0.12);\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  border-left: 4px solid #f87171;\n  border-radius: 8px;\n  color: #fecaca;\n  font-size: 0.88rem;\n}\n.tsm-modal__error-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  line-height: 1.3;\n  flex-shrink: 0;\n}\n.tsm-modal__error-body[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.5;\n}\n.tsm-modal__error-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fecaca;\n  font-weight: 600;\n  display: block;\n  margin-bottom: 4px;\n}\n.tsm-modal__error-list[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  padding-left: 18px;\n  font-size: 0.82rem;\n  color: #fca5a5;\n}\n.tsm-modal__error-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 2px;\n}\n.tsm-modal__error-list[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: 600;\n  text-transform: capitalize;\n}\n.tsm-field--invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .tsm-field--invalid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .tsm-field--invalid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border-color: #f87171 !important;\n  background: rgba(248, 113, 113, 0.06);\n}\n.tsm-field--invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .tsm-field--invalid[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .tsm-field--invalid[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  border-color: #f87171 !important;\n  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2) !important;\n}\n.tsm-field__error[_ngcontent-%COMP%] {\n  color: #fca5a5;\n  font-size: 0.75rem;\n  font-weight: 500;\n  margin-top: 2px;\n}\n/*# sourceMappingURL=tournament-sponsors-manage.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TournamentSponsorsManageComponent, { className: "TournamentSponsorsManageComponent", filePath: "src\\app\\shared\\tournament-sponsors-manage\\tournament-sponsors-manage.component.ts", lineNumber: 64 });
})();

// src/app/shared/components/stream-embed/stream-embed.component.ts
function StreamEmbedComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 0);
    \u0275\u0275text(1, "Unable to render stream \u2014 unsupported URL.");
    \u0275\u0275elementEnd();
  }
}
function StreamEmbedComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeResourceUrl)("title", ctx_r0.title());
  }
}
function StreamEmbedComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275template(1, StreamEmbedComponent_Conditional_1_Conditional_1_Template, 1, 2, "iframe", 2);
    \u0275\u0275elementStart(2, "a", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, (tmp_1_0 = ctx_r0.embedSrc()) ? 1 : -1, tmp_1_0);
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r0.streamUrl(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Open on ", ctx_r0.providerLabel(), " \u2197 ");
  }
}
function StreamEmbedComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 9);
    \u0275\u0275listener("error", function StreamEmbedComponent_Conditional_2_Conditional_1_Template_img_error_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onThumbnailError($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl)("alt", ctx_r0.title());
  }
}
function StreamEmbedComponent_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.providerLabel());
  }
}
function StreamEmbedComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function StreamEmbedComponent_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.promoteToLive());
    });
    \u0275\u0275template(1, StreamEmbedComponent_Conditional_2_Conditional_1_Template, 1, 2, "img", 5)(2, StreamEmbedComponent_Conditional_2_Conditional_2_Template, 2, 1);
    \u0275\u0275elementStart(3, "div", 6)(4, "div", 7);
    \u0275\u0275text(5, "\u25B6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, (tmp_1_0 = ctx_r0.thumbnailUrl()) ? 1 : 2, tmp_1_0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.providerLabel());
  }
}
var StreamEmbedComponent = class _StreamEmbedComponent {
  constructor() {
    this.streamUrl = input.required();
    this.title = input("Live stream");
    this.mode = input("live");
    this.sanitizer = inject(DomSanitizer);
    this.promoted = signal(false);
    this.showLive = computed(() => this.mode() === "live" || this.promoted());
    this.provider = computed(() => {
      const url = this.streamUrl();
      if (!url)
        return "unknown";
      try {
        const u = new URL(url);
        const host = u.hostname.toLowerCase();
        if (host === "twitch.tv" || host === "www.twitch.tv")
          return "twitch";
        if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
          return "youtube";
        }
      } catch {
        return "unknown";
      }
      return "unknown";
    });
    this.providerLabel = computed(() => {
      switch (this.provider()) {
        case "twitch":
          return "Twitch";
        case "youtube":
          return "YouTube";
        default:
          return "site";
      }
    });
    this.embedSrc = computed(() => {
      const url = this.streamUrl();
      if (!url)
        return null;
      let raw = null;
      try {
        const u = new URL(url);
        const host = u.hostname.toLowerCase();
        if (host === "twitch.tv" || host === "www.twitch.tv") {
          const channel = u.pathname.replace(/^\/+|\/+$/g, "");
          if (!/^[a-z0-9][a-z0-9_]{3,24}$/i.test(channel))
            return null;
          const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";
          raw = `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${encodeURIComponent(parent)}&muted=true`;
        } else if (host === "youtu.be") {
          const id = u.pathname.replace(/^\/+|\/+$/g, "");
          if (!/^[A-Za-z0-9_-]{11}$/.test(id))
            return null;
          raw = `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0`;
        } else if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") {
          let id = u.searchParams.get("v");
          if (!id) {
            const m = u.pathname.match(/^\/live\/([A-Za-z0-9_-]{11})$/);
            if (m)
              id = m[1];
          }
          if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id))
            return null;
          raw = `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0`;
        }
      } catch {
        return null;
      }
      if (!raw)
        return null;
      return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
    });
    this.thumbnailUrl = computed(() => {
      const url = this.streamUrl();
      if (!url)
        return null;
      try {
        const u = new URL(url);
        const host = u.hostname.toLowerCase();
        if (host === "twitch.tv" || host === "www.twitch.tv") {
          const channel = u.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
          if (!/^[a-z0-9][a-z0-9_]{3,24}$/i.test(channel))
            return null;
          const t = Math.floor(Date.now() / 6e4);
          return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-640x360.jpg?cb=${t}`;
        }
        if (host === "youtu.be") {
          const id = u.pathname.replace(/^\/+|\/+$/g, "");
          if (!/^[A-Za-z0-9_-]{11}$/.test(id))
            return null;
          return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }
        if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") {
          let id = u.searchParams.get("v");
          if (!id) {
            const m = u.pathname.match(/^\/live\/([A-Za-z0-9_-]{11})$/);
            if (m)
              id = m[1];
          }
          if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id))
            return null;
          return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }
      } catch {
        return null;
      }
      return null;
    });
  }
  /**
   * Click handler on the thumbnail tile — switches the component to
   * live iframe rendering for the rest of the session.
   */
  promoteToLive() {
    this.promoted.set(true);
  }
  /**
   * Thumbnail load failed (offline channel, network blip). We hide the
   * broken image; the play-overlay is still visible so the user can
   * click through to live or to the external site.
   */
  onThumbnailError(event) {
    const img = event.target;
    if (img)
      img.style.display = "none";
  }
  static {
    this.\u0275fac = function StreamEmbedComponent_Factory(t) {
      return new (t || _StreamEmbedComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StreamEmbedComponent, selectors: [["app-stream-embed"]], inputs: { streamUrl: [InputFlags.SignalBased, "streamUrl"], title: [InputFlags.SignalBased, "title"], mode: [InputFlags.SignalBased, "mode"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 1, consts: [[1, "stream-embed__error"], [1, "stream-embed", "stream-embed--live"], ["loading", "lazy", "frameborder", "0", "scrolling", "no", "allowfullscreen", "", "allow", "autoplay; fullscreen; encrypted-media; picture-in-picture", 3, "src", "title"], ["target", "_blank", "rel", "noopener noreferrer", 1, "stream-embed__open", 3, "href"], ["type", "button", 1, "stream-embed", "stream-embed--thumb", 3, "click"], ["loading", "lazy", 3, "src", "alt"], ["aria-hidden", "true", 1, "stream-embed__overlay"], [1, "stream-embed__play"], [1, "stream-embed__provider-tag"], ["loading", "lazy", 3, "error", "src", "alt"], [1, "stream-embed__thumb-fallback"]], template: function StreamEmbedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, StreamEmbedComponent_Conditional_0_Template, 2, 0, "p", 0)(1, StreamEmbedComponent_Conditional_1_Template, 4, 3)(2, StreamEmbedComponent_Conditional_2_Template, 8, 2);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.provider() === "unknown" ? 0 : ctx.showLive() ? 1 : 2);
      }
    }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.stream-embed[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background: #000;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid var(--br, rgba(255, 255, 255, 0.08));\n}\n.stream-embed[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.stream-embed--thumb[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0;\n  cursor: pointer;\n  transition: transform 0.2s, border-color 0.2s;\n  img {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n  &:hover {\n    border-color: var(--gold, #a855f7);\n    transform: translateY(-2px);\n  }\n  &:hover .stream-embed__play {\n    background: var(--gold, #a855f7);\n    transform: scale(1.1);\n  }\n  &:focus-visible {\n    outline: 2px solid var(--gold, #a855f7);\n    outline-offset: 2px;\n  }\n}\n.stream-embed__thumb-fallback[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #1a1a2e 0%,\n      #16162d 100%);\n  color: var(--mu, #888);\n  font-family: var(--fh, system-ui);\n  font-size: 1.4rem;\n  letter-spacing: 0.1em;\n}\n.stream-embed__overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 12px;\n  background:\n    linear-gradient(\n      to top,\n      rgba(0, 0, 0, 0.5) 0%,\n      rgba(0, 0, 0, 0.15) 50%,\n      rgba(0, 0, 0, 0.4) 100%);\n  pointer-events: none;\n}\n.stream-embed__play[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  padding-left: 4px;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  transition: background 0.2s, transform 0.2s;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);\n}\n.stream-embed__provider-tag[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  padding: 3px 10px;\n  font-family: var(--fm, system-ui);\n  font-size: 0.65rem;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  border-radius: 999px;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n}\n.stream-embed__open[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 8px;\n  right: 8px;\n  padding: 4px 10px;\n  font-family: var(--fm, system-ui);\n  font-size: 0.7rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  border-radius: 999px;\n  text-decoration: none;\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  transition: background 0.15s;\n  z-index: 2;\n}\n.stream-embed__open[_ngcontent-%COMP%]:hover {\n  background: rgba(168, 85, 247, 0.85);\n}\n.stream-embed__error[_ngcontent-%COMP%] {\n  padding: 14px;\n  text-align: center;\n  color: var(--mu, #888);\n  background: var(--bg2, rgba(255, 255, 255, 0.04));\n  border: 1px dashed var(--br, rgba(255, 255, 255, 0.12));\n  border-radius: 12px;\n  font-size: 0.85rem;\n}\n/*# sourceMappingURL=stream-embed.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StreamEmbedComponent, { className: "StreamEmbedComponent", filePath: "src\\app\\shared\\components\\stream-embed\\stream-embed.component.ts", lineNumber: 219 });
})();

// src/app/features/streaming/live-broadcast.service.ts
var LiveBroadcastService = class _LiveBroadcastService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl;
  }
  /** POST /matches/{matchId}/broadcast — create + bind RTMP stream */
  createForMatch(matchId, payload) {
    return this.http.post(`${this.base}/matches/${matchId}/broadcast`, payload).pipe(map((r) => r.data));
  }
  /** POST /tournaments/{tournamentId}/broadcast — tournament-level broadcast */
  createForTournament(tournamentId, payload) {
    return this.http.post(`${this.base}/tournaments/${tournamentId}/broadcast`, payload).pipe(map((r) => r.data));
  }
  /** GET /broadcasts/{id} */
  get(broadcastId) {
    return this.http.get(`${this.base}/broadcasts/${broadcastId}`).pipe(map((r) => r.data));
  }
  /** POST /broadcasts/{id}/go-live — start the broadcast */
  goLive(broadcastId) {
    return this.http.post(`${this.base}/broadcasts/${broadcastId}/go-live`, {}).pipe(map((r) => r.data));
  }
  /** POST /broadcasts/{id}/complete — end the broadcast */
  complete(broadcastId) {
    return this.http.post(`${this.base}/broadcasts/${broadcastId}/complete`, {}).pipe(map((r) => r.data));
  }
  /** DELETE /broadcasts/{id} — cancel a pre-live broadcast */
  cancel(broadcastId) {
    return this.http.delete(`${this.base}/broadcasts/${broadcastId}`).pipe(map(() => void 0));
  }
  /**
   * GET /broadcasts/{id}/credentials — RTMP URL + stream key.
   *
   * IMPORTANT FOR CONSUMERS:
   *   - Display the stream_key exactly once
   *   - Provide a "Copy to clipboard" button, then mask the value
   *   - NEVER persist the key in localStorage / sessionStorage / IndexedDB
   *   - Rate-limited server-side: 5 requests/minute/user
   */
  getCredentials(broadcastId) {
    return this.http.get(`${this.base}/broadcasts/${broadcastId}/credentials`).pipe(map((r) => r.data));
  }
  static {
    this.\u0275fac = function LiveBroadcastService_Factory(t) {
      return new (t || _LiveBroadcastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LiveBroadcastService, factory: _LiveBroadcastService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/streaming/broadcast-controls.component.ts
function BroadcastControlsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "No broadcast yet for this match.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 8);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.creating.set(true));
    });
    \u0275\u0275text(3, " Start broadcast ");
    \u0275\u0275elementEnd();
  }
}
function BroadcastControlsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 9);
    \u0275\u0275listener("submit", function BroadcastControlsComponent_Conditional_5_Template_form_submit_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCreate($event));
    });
    \u0275\u0275elementStart(1, "label", 10)(2, "span");
    \u0275\u0275text(3, "Title");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function BroadcastControlsComponent_Conditional_5_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formTitle, $event) || (ctx_r1.formTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "label", 10)(6, "span");
    \u0275\u0275text(7, "Privacy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 12);
    \u0275\u0275twoWayListener("ngModelChange", function BroadcastControlsComponent_Conditional_5_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formPrivacy, $event) || (ctx_r1.formPrivacy = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 13);
    \u0275\u0275text(10, "Public");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 14);
    \u0275\u0275text(12, "Unlisted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 15);
    \u0275\u0275text(14, "Private");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 16)(16, "button", 17);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 18);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_5_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.creating.set(false));
    });
    \u0275\u0275text(19, " Cancel ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTitle);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formPrivacy);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.busy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.busy() ? "Creating\u2026" : "Create", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy());
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("href", b_r4.watch_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r4.watch_url);
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onRevealCredentials());
    });
    \u0275\u0275text(1, " Reveal RTMP credentials ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.busy());
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "p", 27);
    \u0275\u0275text(2, "\u26A0\uFE0F Don't share these. They'll only be shown once.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 10)(4, "span");
    \u0275\u0275text(5, "RTMP URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "input", 28, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 29);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const urlInput_r7 = \u0275\u0275reference(7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copy(urlInput_r7.value));
    });
    \u0275\u0275text(9, "Copy URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label", 10)(11, "span");
    \u0275\u0275text(12, "Stream key");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 30, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 16)(16, "button", 29);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_1_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r6);
      const keyInput_r8 = \u0275\u0275reference(14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copy(keyInput_r8.value));
    });
    \u0275\u0275text(17, "Copy key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 31);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_1_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleKeyVisible());
    });
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 31);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_1_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.credentials.set(null));
    });
    \u0275\u0275text(21, "Hide credentials");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "p", 7);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.credentials().rtmp_url);
    \u0275\u0275advance(7);
    \u0275\u0275property("type", ctx_r1.keyVisible() ? "text" : "password")("value", ctx_r1.credentials().stream_key);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.keyVisible() ? "Hide" : "Show", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.credentials().instructions.obs);
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_0_Template, 2, 1, "button", 25)(1, BroadcastControlsComponent_Conditional_6_Conditional_14_Conditional_1_Template, 24, 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, !ctx_r1.credentials() ? 0 : 1);
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onGoLive());
    });
    \u0275\u0275text(1, " Go live \u25B6 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.busy());
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onComplete());
    });
    \u0275\u0275text(1, " End broadcast \u25A0 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.busy());
  }
}
function BroadcastControlsComponent_Conditional_6_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function BroadcastControlsComponent_Conditional_6_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(1, " Cancel ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.busy());
  }
}
function BroadcastControlsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 19)(1, "dt");
    \u0275\u0275text(2, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dt");
    \u0275\u0275text(6, "Privacy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dd");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dt");
    \u0275\u0275text(10, "Watch URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dd");
    \u0275\u0275template(12, BroadcastControlsComponent_Conditional_6_Conditional_12_Template, 2, 2, "a", 20)(13, BroadcastControlsComponent_Conditional_6_Conditional_13_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, BroadcastControlsComponent_Conditional_6_Conditional_14_Template, 2, 1);
    \u0275\u0275elementStart(15, "div", 21);
    \u0275\u0275template(16, BroadcastControlsComponent_Conditional_6_Conditional_16_Template, 2, 1, "button", 22)(17, BroadcastControlsComponent_Conditional_6_Conditional_17_Template, 2, 1, "button", 23)(18, BroadcastControlsComponent_Conditional_6_Conditional_18_Template, 2, 1, "button", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r4 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(b_r4.status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(b_r4.privacy);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(12, b_r4.watch_url ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(14, !b_r4.is_terminal ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(16, b_r4.status === "ready" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(17, b_r4.is_live ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, !b_r4.is_terminal ? 18 : -1);
  }
}
function BroadcastControlsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
var BroadcastControlsComponent = class _BroadcastControlsComponent {
  constructor() {
    this.matchId = input.required();
    this.defaultTitle = input("");
    this.initialBroadcast = input(null);
    this.broadcastChanged = output();
    this.broadcast = signal(null);
    this.credentials = signal(null);
    this.busy = signal(false);
    this.creating = signal(false);
    this.keyVisible = signal(false);
    this.error = signal(null);
    this.formTitle = "";
    this.formPrivacy = "public";
    this.statusLabel = computed(() => this.broadcast()?.status ?? "idle");
    this.api = inject(LiveBroadcastService);
  }
  ngOnInit() {
    this.broadcast.set(this.initialBroadcast());
    this.formTitle = this.defaultTitle();
  }
  /* ──────── actions ──────── */
  onCreate(ev) {
    ev.preventDefault();
    if (this.busy() || !this.formTitle.trim())
      return;
    this.busy.set(true);
    this.error.set(null);
    this.api.createForMatch(this.matchId(), {
      title: this.formTitle.trim(),
      privacy: this.formPrivacy,
      source: "obs"
    }).subscribe({
      next: (b) => {
        this.broadcast.set(b);
        this.creating.set(false);
        this.busy.set(false);
        this.broadcastChanged.emit(b);
      },
      error: (e) => this.onError(e, "Failed to create broadcast")
    });
  }
  onRevealCredentials() {
    const b = this.broadcast();
    if (!b || this.busy())
      return;
    this.busy.set(true);
    this.error.set(null);
    this.api.getCredentials(b.id).subscribe({
      next: (c) => {
        this.credentials.set(c);
        this.busy.set(false);
      },
      error: (e) => this.onError(e, "Failed to fetch credentials")
    });
  }
  onGoLive() {
    const b = this.broadcast();
    if (!b || this.busy())
      return;
    this.busy.set(true);
    this.error.set(null);
    this.api.goLive(b.id).subscribe({
      next: (next) => {
        this.broadcast.set(next);
        this.busy.set(false);
        this.broadcastChanged.emit(next);
      },
      error: (e) => this.onError(e, "Failed to go live \u2014 is OBS streaming?")
    });
  }
  onComplete() {
    const b = this.broadcast();
    if (!b || this.busy())
      return;
    if (!confirm("End the broadcast? Viewers will be disconnected."))
      return;
    this.busy.set(true);
    this.error.set(null);
    this.api.complete(b.id).subscribe({
      next: (next) => {
        this.broadcast.set(next);
        this.busy.set(false);
        this.broadcastChanged.emit(next);
      },
      error: (e) => this.onError(e, "Failed to end broadcast")
    });
  }
  onCancel() {
    const b = this.broadcast();
    if (!b || this.busy())
      return;
    if (!confirm("Cancel this broadcast? The YouTube event will be deleted."))
      return;
    this.busy.set(true);
    this.error.set(null);
    this.api.cancel(b.id).subscribe({
      next: () => {
        this.broadcast.set(null);
        this.credentials.set(null);
        this.busy.set(false);
        this.broadcastChanged.emit(null);
      },
      error: (e) => this.onError(e, "Failed to cancel broadcast")
    });
  }
  copy(value) {
    return __async(this, null, function* () {
      try {
        yield navigator.clipboard.writeText(value);
      } catch {
      }
    });
  }
  /** Toggle visibility of the masked stream key input. */
  toggleKeyVisible() {
    this.keyVisible.update((v) => !v);
  }
  onError(e, fallback) {
    this.busy.set(false);
    const apiMsg = e?.error?.error?.message;
    this.error.set(apiMsg ?? fallback);
  }
  static {
    this.\u0275fac = function BroadcastControlsComponent_Factory(t) {
      return new (t || _BroadcastControlsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BroadcastControlsComponent, selectors: [["dawri-broadcast-controls"]], inputs: { matchId: [InputFlags.SignalBased, "matchId"], defaultTitle: [InputFlags.SignalBased, "defaultTitle"], initialBroadcast: [InputFlags.SignalBased, "initialBroadcast"] }, outputs: { broadcastChanged: "broadcastChanged" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 6, consts: [["urlInput", ""], ["keyInput", ""], [1, "bc"], [1, "bc__title"], [1, "bc__dot"], [1, "bc__form"], [1, "bc__error"], [1, "bc__muted"], ["type", "button", 1, "bc__btn", "bc__btn--primary", 3, "click"], [1, "bc__form", 3, "submit"], [1, "bc__label"], ["type", "text", "name", "title", "maxlength", "100", "required", "", 1, "bc__input", 3, "ngModelChange", "ngModel"], ["name", "privacy", 1, "bc__input", 3, "ngModelChange", "ngModel"], ["value", "public"], ["value", "unlisted"], ["value", "private"], [1, "bc__row"], ["type", "submit", 1, "bc__btn", "bc__btn--primary", 3, "disabled"], ["type", "button", 1, "bc__btn", 3, "click", "disabled"], [1, "bc__meta"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "bc__row", "bc__row--actions"], ["type", "button", 1, "bc__btn", "bc__btn--go", 3, "disabled"], ["type", "button", 1, "bc__btn", "bc__btn--end", 3, "disabled"], ["type", "button", 1, "bc__btn", "bc__btn--danger", 3, "disabled"], ["type", "button", 1, "bc__btn", 3, "disabled"], [1, "bc__creds"], [1, "bc__warn"], ["readonly", "", 1, "bc__input", "bc__input--mono", 3, "value"], ["type", "button", 1, "bc__btn", "bc__btn--copy", 3, "click"], ["readonly", "", 1, "bc__input", "bc__input--mono", 3, "type", "value"], ["type", "button", 1, "bc__btn", 3, "click"], ["type", "button", 1, "bc__btn", "bc__btn--go", 3, "click", "disabled"], ["type", "button", 1, "bc__btn", "bc__btn--end", 3, "click", "disabled"], ["type", "button", 1, "bc__btn", "bc__btn--danger", 3, "click", "disabled"]], template: function BroadcastControlsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 2)(1, "h3", 3);
        \u0275\u0275element(2, "span", 4);
        \u0275\u0275text(3, " Live Broadcast ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, BroadcastControlsComponent_Conditional_4_Template, 4, 0)(5, BroadcastControlsComponent_Conditional_5_Template, 20, 5, "form", 5)(6, BroadcastControlsComponent_Conditional_6_Template, 19, 7)(7, BroadcastControlsComponent_Conditional_7_Template, 2, 1, "p", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_3_0;
        let tmp_4_0;
        \u0275\u0275advance(2);
        \u0275\u0275classProp("bc__dot--live", (tmp_0_0 = ctx.broadcast()) == null ? null : tmp_0_0.is_live);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(4, !ctx.broadcast() && !ctx.creating() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(5, ctx.creating() && !ctx.broadcast() ? 5 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, (tmp_3_0 = ctx.broadcast()) ? 6 : -1, tmp_3_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(7, (tmp_4_0 = ctx.error()) ? 7 : -1, tmp_4_0);
      }
    }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  color: #e6e8ec;\n}\n.bc[_ngcontent-%COMP%] {\n  background: rgba(11, 16, 34, 0.6);\n  border: 1px solid rgba(240, 165, 0, 0.25);\n  border-radius: 8px;\n  padding: 1rem;\n  font-family: "Rajdhani", sans-serif;\n}\n.bc__title[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  letter-spacing: 2px;\n  color: var(--gold, #f0a500);\n  margin: 0 0 0.75rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.2rem;\n}\n.bc__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #555;\n}\n.bc__dot--live[_ngcontent-%COMP%] {\n  background: #ff3b3b;\n  box-shadow: 0 0 8px #ff3b3b;\n  animation: _ngcontent-%COMP%_pulse 1.4s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  50% {\n    opacity: 0.4;\n  }\n}\n.bc__muted[_ngcontent-%COMP%] {\n  color: #8b909a;\n  font-size: 0.9rem;\n}\n.bc__warn[_ngcontent-%COMP%] {\n  color: #f0a500;\n  font-size: 0.85rem;\n  margin: 0 0 0.5rem;\n}\n.bc__error[_ngcontent-%COMP%] {\n  color: #ff6b6b;\n  font-size: 0.9rem;\n  margin-top: 0.75rem;\n}\n.bc__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.bc__label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  font-size: 0.85rem;\n  color: #c8ccd4;\n}\n.bc__input[_ngcontent-%COMP%] {\n  background: #0b1022;\n  border: 1px solid rgba(0, 229, 255, 0.2);\n  color: #fff;\n  padding: 0.5rem 0.75rem;\n  border-radius: 4px;\n  font: inherit;\n}\n.bc__input--mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 0.85rem;\n}\n.bc__row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.bc__row--actions[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.bc__btn[_ngcontent-%COMP%] {\n  background: #1a2240;\n  color: #fff;\n  border: 1px solid rgba(0, 229, 255, 0.3);\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  cursor: pointer;\n  font: inherit;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-size: 0.85rem;\n  transition: all 0.15s;\n}\n.bc__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #243056;\n}\n.bc__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.bc__btn--primary[_ngcontent-%COMP%] {\n  background: var(--gold, #f0a500);\n  color: #0b1022;\n  border-color: var(--gold, #f0a500);\n}\n.bc__btn--go[_ngcontent-%COMP%] {\n  background: #2ecc71;\n  color: #0b1022;\n  border-color: #2ecc71;\n}\n.bc__btn--end[_ngcontent-%COMP%] {\n  background: #e67e22;\n  color: #0b1022;\n  border-color: #e67e22;\n}\n.bc__btn--danger[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #ff6b6b;\n  border-color: #ff6b6b;\n}\n.bc__btn--copy[_ngcontent-%COMP%] {\n  background: var(--cyan, #00e5ff);\n  color: #0b1022;\n  border-color: var(--cyan, #00e5ff);\n}\n.bc__meta[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: max-content 1fr;\n  gap: 0.3rem 1rem;\n  margin: 0.5rem 0 1rem;\n  font-size: 0.9rem;\n}\n.bc__meta[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #8b909a;\n}\n.bc__meta[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  word-break: break-all;\n}\n.bc__meta[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--cyan, #00e5ff);\n  text-decoration: none;\n}\n.bc__meta[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.bc__creds[_ngcontent-%COMP%] {\n  margin: 0.75rem 0;\n  padding: 0.75rem;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  border-left: 3px solid var(--gold, #f0a500);\n}\n/*# sourceMappingURL=broadcast-controls.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BroadcastControlsComponent, { className: "BroadcastControlsComponent", filePath: "src\\app\\features\\streaming\\broadcast-controls.component.ts", lineNumber: 214 });
})();

// src/app/pages/tournaments/tournament-detail.component.ts
var _forTrack03 = ($index, $item) => $item.position;
var _forTrack12 = ($index, $item) => $item.num + $item.section;
var _forTrack2 = ($index, $item) => $item.id;
var _forTrack3 = ($index, $item) => $item.rank;
function TournamentDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 3)(2, "div", 4)(3, "div", 5);
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("src", t_r2.cover_image_url, \u0275\u0275sanitizeUrl)("alt", t_r2.name);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275element(1, "span", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Live \xB7 Round ", t_r2.bracket.current_round, "");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1, "Registration Open");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-tier-badge", 56);
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("tier", t_r2.organizer.organizer_tier);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275template(2, TournamentDetailComponent_Conditional_2_Conditional_22_Conditional_2_Template, 1, 1, "app-tier-badge", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Hosted by ", t_r2.organizer_name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(2, (t_r2.organizer == null ? null : t_r2.organizer.organizer_tier) && t_r2.organizer.organizer_tier !== "none" ? 2 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.name_ar);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "polyline", 57)(3, "polyline", 58)(4, "path", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Swiss rounds ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(t_r2.swiss_rounds);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_54_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1, "Tournament complete");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_54_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const b_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Round ", b_r3.current_round, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" of ", b_r3.total_rounds, " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 60)(2, "span");
    \u0275\u0275template(3, TournamentDetailComponent_Conditional_2_Conditional_54_Conditional_3_Template, 2, 0, "strong")(4, TournamentDetailComponent_Conditional_2_Conditional_54_Conditional_4_Template, 3, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 61);
    \u0275\u0275element(9, "div", 62);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r3 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, b_r3.status === "completed" ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(7, 4, b_r3.current_round / b_r3.total_rounds * 100, "1.0-0"), "% complete ");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", b_r3.current_round / b_r3.total_rounds * 100, "%");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 63);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_56_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.register());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r4.registering());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.registering() ? "Registering\u2026" : "Register Now", " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 64);
    \u0275\u0275element(2, "polyline", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Registered");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 63);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_58_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.generateBracket());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r4.generating());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.generating() ? "Generating\u2026" : "Generate Bracket", " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_59_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.activeTab.set("live"));
    });
    \u0275\u0275text(1, "Watch live \u2192");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275elementStart(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.totalPrizeCurrency());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, "Multiple Tiers");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_63_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70)(1, "span", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 75);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("gold", p_r8.position === 1)("silver", p_r8.position === 2)("bronze", p_r8.position === 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r8.position === 1 ? "1st place" : p_r8.position === 2 ? "2nd place" : p_r8.position === 3 ? "3rd place" : p_r8.position + "th place", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r8.reward);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.openPrizeEditor());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 77);
    \u0275\u0275element(2, "path", 78)(3, "path", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Edit prizes ");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "div", 66);
    \u0275\u0275text(2, "Total Prize Pool");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 67);
    \u0275\u0275template(4, TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_4_Template, 3, 2, "span", 68)(5, TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_5_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 69);
    \u0275\u0275repeaterCreate(7, TournamentDetailComponent_Conditional_2_Conditional_63_For_8_Template, 5, 8, "div", 70, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "app-tournament-sponsors", 71);
    \u0275\u0275template(10, TournamentDetailComponent_Conditional_2_Conditional_63_Conditional_10_Template, 5, 0, "button", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const t_r2 = \u0275\u0275nextContext();
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, (tmp_3_0 = ctx_r4.totalPrizeDisplay()) ? 4 : 5, tmp_3_0);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r4.normalizedPrizes());
    \u0275\u0275advance(2);
    \u0275\u0275property("tournamentId", t_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r4.canEditTournament() ? 10 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_64_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.openPrizeEditor());
    });
    \u0275\u0275elementStart(1, "div", 66);
    \u0275\u0275text(2, "Total Prize Pool");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 81)(4, "strong");
    \u0275\u0275text(5, "No prizes configured");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Click to add prize tiers");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 82);
    \u0275\u0275text(9, "+ Add Prizes");
    \u0275\u0275elementEnd()();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_86_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 90);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2713 Rules accepted on ", \u0275\u0275pipeBind2(2, 1, t_r2.my_participant.rules_accepted_at, "d MMM y \xB7 HH:mm"), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_86_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "pre", 89);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, TournamentDetailComponent_Conditional_2_Conditional_86_Conditional_8_Conditional_3_Template, 3, 4, "p", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.rules);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, (t_r2.my_participant == null ? null : t_r2.my_participant.rules_accepted_at) ? 3 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 83)(1, "header", 84);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_86_Template_header_click_1_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.rulesExpanded.set(!ctx_r4.rulesExpanded()));
    });
    \u0275\u0275elementStart(2, "span", 85);
    \u0275\u0275text(3, "\u{1F4DC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 86);
    \u0275\u0275text(5, "Rules & Conditions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 87);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TournamentDetailComponent_Conditional_2_Conditional_86_Conditional_8_Template, 4, 2, "div", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("rules-section--expanded", ctx_r4.rulesExpanded());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r4.rulesExpanded() ? "\u25B2 Hide" : "\u25BC Show", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(8, ctx_r4.rulesExpanded() ? 8 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-tournament-sponsors-manage", 45);
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("tournamentId", t_r2.id);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "span");
    \u0275\u0275text(2, "\u{1F4E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 92);
    \u0275\u0275text(5, "Live Streaming");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 93);
    \u0275\u0275text(7, "No YouTube stream configured yet. Ask your Dawri admin to set one up via Admin \u2192 Live Streams.");
    \u0275\u0275elementEnd()()();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
    \u0275\u0275text(1, " LIVE NOW ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2713 Stream Ended ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u23F3 Waiting for stream ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 107)(2, "span", 108);
    \u0275\u0275text(3, "\u{1F3AE}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 109);
    \u0275\u0275text(6, "PlayStation 5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 110);
    \u0275\u0275text(8, "Built-in broadcaster \u2014 no extra software");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "ol", 111)(10, "li");
    \u0275\u0275text(11, "PS5 \u2192 Settings \u2192 Captures and Broadcasts \u2192 Broadcast \u2192 Broadcasting Service \u2192 ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13, "Custom RTMP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "li");
    \u0275\u0275text(15, "RTMP URL: ");
    \u0275\u0275elementStart(16, "code");
    \u0275\u0275text(17, "rtmp://a.rtmp.youtube.com/live2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "li");
    \u0275\u0275text(19, "Stream Key: ");
    \u0275\u0275elementStart(20, "button", 112);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_25_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.copyStreamKey());
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "li");
    \u0275\u0275text(23, "Press ");
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25, "Start Broadcasting");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " when your match begins");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 113);
    \u0275\u0275text(28, "\u{1F4A1} Works for EA FC 25, Call of Duty, and any PS5 game");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(21);
    \u0275\u0275textInterpolate(ctx_r4.keyCopied() ? "\u2713 Copied!" : "Copy Key");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 107)(2, "span", 108);
    \u0275\u0275text(3, "\u{1F5A5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 109);
    \u0275\u0275text(6, "OBS Studio (PC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 110);
    \u0275\u0275text(8, "Free professional streaming software");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "a", 114);
    \u0275\u0275text(10, "\u2B07 Download OBS Free");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ol", 111)(12, "li");
    \u0275\u0275text(13, "Download ");
    \u0275\u0275elementStart(14, "a", 115);
    \u0275\u0275text(15, "OBS Studio");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " (free)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "li");
    \u0275\u0275text(18, "Settings \u2192 Stream \u2192 Service: ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, "Custom\u2026");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "li");
    \u0275\u0275text(22, "Server: ");
    \u0275\u0275elementStart(23, "code");
    \u0275\u0275text(24, "rtmp://a.rtmp.youtube.com/live2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "li");
    \u0275\u0275text(26, "Stream Key: ");
    \u0275\u0275elementStart(27, "button", 112);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_26_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.copyStreamKey());
    });
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "li");
    \u0275\u0275text(30, "Add Game Capture source \u2192 ");
    \u0275\u0275elementStart(31, "strong");
    \u0275\u0275text(32, "Start Streaming");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 113);
    \u0275\u0275text(34, "\u2699\uFE0F Recommended: 1080p, 60fps, 6000 Kbps. Works for any PC game.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(28);
    \u0275\u0275textInterpolate(ctx_r4.keyCopied() ? "\u2713 Copied!" : "Copy Key");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 107)(2, "span", 108);
    \u0275\u0275text(3, "\u{1F4F1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 109);
    \u0275\u0275text(6, "Mobile Games");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 110);
    \u0275\u0275text(8, "PUBG Mobile, CoD Mobile, Free Fire");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "a", 116);
    \u0275\u0275text(10, "\u2B07 StreamLabs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ol", 111)(12, "li");
    \u0275\u0275text(13, "Download ");
    \u0275\u0275elementStart(14, "a", 117);
    \u0275\u0275text(15, "StreamLabs Mobile");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " (free)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "li");
    \u0275\u0275text(18, "Settings \u2192 Streaming \u2192 Platform: ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, "Custom RTMP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "li");
    \u0275\u0275text(22, "RTMP URL: ");
    \u0275\u0275elementStart(23, "code");
    \u0275\u0275text(24, "rtmp://a.rtmp.youtube.com/live2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "li");
    \u0275\u0275text(26, "Stream Key: ");
    \u0275\u0275elementStart(27, "button", 112);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_27_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.copyStreamKey());
    });
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "li");
    \u0275\u0275text(30, "Tap ");
    \u0275\u0275elementStart(31, "strong");
    \u0275\u0275text(32, "Go Live");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " \u2014 grant screen recording permission");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 113);
    \u0275\u0275text(35, "\u{1F4A1} Keep your phone plugged in \u2014 streaming drains battery fast.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(28);
    \u0275\u0275textInterpolate(ctx_r4.keyCopied() ? "\u2713 Copied!" : "Copy Key");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 107)(2, "span", 108);
    \u0275\u0275text(3, "\u{1F310}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 109);
    \u0275\u0275text(6, "Browser Streaming");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 110);
    \u0275\u0275text(8, "No software to install \u2014 Chrome or Edge");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 118)(10, "div", 119)(11, "div", 120)(12, "span", 121);
    \u0275\u0275text(13, "Free");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 122);
    \u0275\u0275text(15, "YouTube Studio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 123);
    \u0275\u0275text(17, "No install needed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "ol", 111)(19, "li");
    \u0275\u0275text(20, "Go to ");
    \u0275\u0275elementStart(21, "a", 124);
    \u0275\u0275text(22, "studio.youtube.com");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " \u2192 Go Live \u2192 Share screen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "li");
    \u0275\u0275text(25, "Copy YouTube URL \u2192 give to admin \u2192 Admin \u2192 Live Streams \u2192 Manual URL");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 119)(27, "div", 120)(28, "span", 121);
    \u0275\u0275text(29, "Free Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 122);
    \u0275\u0275text(31, "Streamyard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 123);
    \u0275\u0275text(33, "Browser studio with screen share and overlays");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "a", 125);
    \u0275\u0275text(35, "Open \u2197");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "ol", 111)(37, "li");
    \u0275\u0275text(38, "Go to ");
    \u0275\u0275elementStart(39, "a", 126);
    \u0275\u0275text(40, "streamyard.com");
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " \u2192 Add Destination \u2192 ");
    \u0275\u0275elementStart(42, "strong");
    \u0275\u0275text(43, "Custom RTMP");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "li");
    \u0275\u0275text(45, "Server: ");
    \u0275\u0275elementStart(46, "code");
    \u0275\u0275text(47, "rtmp://a.rtmp.youtube.com/live2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(48, " \xA0 Key: ");
    \u0275\u0275elementStart(49, "button", 112);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_28_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.copyStreamKey());
    });
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "li");
    \u0275\u0275text(52, "Share screen \u2192 ");
    \u0275\u0275elementStart(53, "strong");
    \u0275\u0275text(54, "Go Live");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(50);
    \u0275\u0275textInterpolate(ctx_r4.keyCopied() ? "\u2713 Copied!" : "Copy Key");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 106);
    \u0275\u0275text(1, "\u25B6 Watch on YouTube \u2197");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275property("href", ctx_r4.streamInfo().watch_url, \u0275\u0275sanitizeUrl);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96)(1, "div", 97);
    \u0275\u0275text(2, "\u{1F511} Your Stream Key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 98)(4, "code", 99);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 100);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.keyHidden.set(!ctx_r4.keyHidden()));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 100);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.copyStreamKey());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 101)(11, "span");
    \u0275\u0275text(12, "RTMP URL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "code");
    \u0275\u0275text(14, "rtmp://a.rtmp.youtube.com/live2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 102)(16, "div", 103)(17, "button", 104);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.setupPlatform.set("ps5"));
    });
    \u0275\u0275text(18, "\u{1F3AE} PS5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 104);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.setupPlatform.set("obs"));
    });
    \u0275\u0275text(20, "\u{1F5A5} OBS (PC)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 104);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.setupPlatform.set("mobile"));
    });
    \u0275\u0275text(22, "\u{1F4F1} Mobile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 104);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.setupPlatform.set("browser"));
    });
    \u0275\u0275text(24, "\u{1F310} Browser");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(25, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_25_Template, 29, 1, "div", 105)(26, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_26_Template, 35, 1, "div", 105)(27, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_27_Template, 36, 1, "div", 105)(28, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_28_Template, 55, 1, "div", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Conditional_29_Template, 2, 1, "a", 106);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("stream-key-val--hidden", ctx_r4.keyHidden());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.keyHidden() ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : ctx_r4.streamKey());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.keyHidden() ? "\u{1F441} Show" : "\u{1F648} Hide");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.keyCopied() ? "\u2713 Copied!" : "\u{1F4CB} Copy");
    \u0275\u0275advance(8);
    \u0275\u0275classProp("setup-tab--active", ctx_r4.setupPlatform() === "ps5");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("setup-tab--active", ctx_r4.setupPlatform() === "obs");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("setup-tab--active", ctx_r4.setupPlatform() === "mobile");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("setup-tab--active", ctx_r4.setupPlatform() === "browser");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(25, ctx_r4.setupPlatform() === "ps5" ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(26, ctx_r4.setupPlatform() === "obs" ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(27, ctx_r4.setupPlatform() === "mobile" ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(28, ctx_r4.setupPlatform() === "browser" ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(29, ((tmp_17_0 = ctx_r4.streamInfo()) == null ? null : tmp_17_0.watch_url) ? 29 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 94)(1, "div", 95);
    \u0275\u0275template(2, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_2_Template, 2, 0)(3, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_3_Template, 1, 0)(4, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_4_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Conditional_5_Template, 30, 18, "div", 96);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("stream-panel__active--live", ((tmp_4_0 = ctx_r4.streamInfo()) == null ? null : tmp_4_0.stream_status) === "live");
    \u0275\u0275advance();
    \u0275\u0275classMap("stream-status-badge--" + (((tmp_5_0 = ctx_r4.streamInfo()) == null ? null : tmp_5_0.stream_status) || "pending"));
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ((tmp_6_0 = ctx_r4.streamInfo()) == null ? null : tmp_6_0.stream_status) === "live" ? 2 : ((tmp_6_0 = ctx_r4.streamInfo()) == null ? null : tmp_6_0.stream_status) === "ended" ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(5, ctx_r4.streamKey() ? 5 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_1_Template, 8, 0, "div", 91)(2, TournamentDetailComponent_Conditional_2_Conditional_89_Conditional_2_Template, 6, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !ctx_r4.streamInfo() ? 1 : 2);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_94_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.activeTab.set("standings"));
    });
    \u0275\u0275text(1, "Standings");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("tab--active", ctx_r4.activeTab() === "standings");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.matchCounts().all);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_102_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 128);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 127);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_102_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.activeTab.set("live"));
    });
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_102_Conditional_1_Template, 1, 0, "span", 128);
    \u0275\u0275text(2, " Streams ");
    \u0275\u0275elementStart(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("tab--active", ctx_r4.activeTab() === "live")("tab--actually-live", ctx_r4.trulyLiveCount() > 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r4.trulyLiveCount() > 0 ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("tab-badge--live", ctx_r4.trulyLiveCount() > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.liveStreamsCount());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 131);
    \u0275\u0275element(3, "path", 132)(4, "path", 133)(5, "path", 134)(6, "path", 135)(7, "path", 136)(8, "path", 137);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(t_r2.is_registration_open ? "Bracket will be generated when registration closes." : t_r2.status === "ongoing" ? "Bracket generation in progress\u2026" : "Bracket has not been generated yet.");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 Complete ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 Live ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 156);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.jumpToMyMatch());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 157);
    \u0275\u0275element(2, "circle", 158)(3, "path", 159);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " My Match ");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Tournament Complete ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const b_r20 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" Round ", b_r20.current_round, " of ", b_r20.total_rounds, " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145)(1, "div", 160);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 161);
    \u0275\u0275element(3, "path", 132)(4, "path", 133)(5, "path", 134)(6, "path", 135)(7, "path", 136)(8, "path", 137);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 162)(10, "div", 163);
    \u0275\u0275text(11, "CHAMPION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 164);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r20 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(b_r20.winner.name);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 174);
    \u0275\u0275element(1, "span", 54);
    \u0275\u0275text(2, "Live");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 180);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, m_r22.scheduled_at, "d MMM \xB7 HH:mm"));
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 181);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.statusLabel(m_r22.status));
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "em", 177);
    \u0275\u0275text(1, "BYE");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 183);
  }
  if (rf & 2) {
    let tmp_30_0;
    const pa_r23 = \u0275\u0275nextContext();
    \u0275\u0275property("src", pa_r23.avatar_url, \u0275\u0275sanitizeUrl)("alt", (tmp_30_0 = pa_r23.display_name) !== null && tmp_30_0 !== void 0 ? tmp_30_0 : "");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 184);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_29_0;
    const pa_r23 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_29_0 = pa_r23.display_name) !== null && tmp_29_0 !== void 0 ? tmp_29_0 : "?").charAt(0).toUpperCase());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_0_Conditional_0_Template, 1, 2, "img", 183)(1, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_0_Conditional_1_Template, 2, 1);
    \u0275\u0275elementStart(2, "span", 182);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pa_r23 = ctx;
    \u0275\u0275conditional(0, pa_r23.avatar_url ? 0 : 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pa_r23.display_name || pa_r23.name || "TBD");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 185);
    \u0275\u0275text(1, "TBD");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_0_Template, 4, 2, "span", 182)(1, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    let tmp_26_0;
    const m_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(0, (tmp_26_0 = m_r22.participant_a) ? 0 : 1, tmp_26_0);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 186);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("b-match__score--win", m_r22.winner_id === (m_r22.participant_a == null ? null : m_r22.participant_a.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r22.score_a, " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "em", 177);
    \u0275\u0275text(1, "BYE");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 183);
  }
  if (rf & 2) {
    let tmp_30_0;
    const pb_r24 = \u0275\u0275nextContext();
    \u0275\u0275property("src", pb_r24.avatar_url, \u0275\u0275sanitizeUrl)("alt", (tmp_30_0 = pb_r24.display_name) !== null && tmp_30_0 !== void 0 ? tmp_30_0 : "");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 184);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_29_0;
    const pb_r24 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_29_0 = pb_r24.display_name) !== null && tmp_29_0 !== void 0 ? tmp_29_0 : "?").charAt(0).toUpperCase());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_0_Conditional_0_Template, 1, 2, "img", 183)(1, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_0_Conditional_1_Template, 2, 1);
    \u0275\u0275elementStart(2, "span", 182);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pb_r24 = ctx;
    \u0275\u0275conditional(0, pb_r24.avatar_url ? 0 : 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pb_r24.display_name || pb_r24.name || "TBD");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 185);
    \u0275\u0275text(1, "TBD");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_0_Template, 4, 2, "span", 182)(1, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    let tmp_26_0;
    const m_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(0, (tmp_26_0 = m_r22.participant_b) ? 0 : 1, tmp_26_0);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 186);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("b-match__score--win", m_r22.winner_id === (m_r22.participant_b == null ? null : m_r22.participant_b.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r22.score_b, " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 179);
    \u0275\u0275text(1, "\u26A0 Disputed");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 170)(1, "div", 171);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Template_div_click_1_listener() {
      const m_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.openMatch(m_r22));
    });
    \u0275\u0275elementStart(2, "div", 172)(3, "span", 173);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_5_Template, 3, 0, "span", 174)(6, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_6_Template, 3, 4)(7, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_7_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 175)(9, "span", 176);
    \u0275\u0275template(10, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_10_Template, 2, 0, "em", 177)(11, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_11_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_12_Template, 2, 3, "span", 178);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 175)(14, "span", 176);
    \u0275\u0275template(15, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_15_Template, 2, 0, "em", 177)(16, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_16_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_17_Template, 2, 3, "span", 178);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Conditional_18_Template, 2, 0, "div", 179);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r22 = ctx.$implicit;
    const matchIdx_r25 = ctx.$index;
    const ctx_r25 = \u0275\u0275nextContext();
    const round_r27 = ctx_r25.$implicit;
    const roundIdx_r28 = ctx_r25.$index;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("height", round_r27.slotHeight, "px")("--slot-h", round_r27.slotHeight, "px")("--delay", matchIdx_r25 * 60 + roundIdx_r28 * 120, "ms");
    \u0275\u0275advance();
    \u0275\u0275classMap("b-match--" + m_r22.status);
    \u0275\u0275classProp("b-match--clickable", ctx_r4.matchIsClickable(m_r22))("b-match--bye", m_r22.participant_a_is_bye || m_r22.participant_b_is_bye)("b-match--mine", ctx_r4.myParticipantId() && ((m_r22.participant_a == null ? null : m_r22.participant_a.id) === ctx_r4.myParticipantId() || (m_r22.participant_b == null ? null : m_r22.participant_b.id) === ctx_r4.myParticipantId()));
    \u0275\u0275attribute("data-my-match", ctx_r4.myParticipantId() && ((m_r22.participant_a == null ? null : m_r22.participant_a.id) === ctx_r4.myParticipantId() || (m_r22.participant_b == null ? null : m_r22.participant_b.id) === ctx_r4.myParticipantId()) ? "" : null)("role", ctx_r4.matchIsClickable(m_r22) ? "button" : null)("tabindex", ctx_r4.matchIsClickable(m_r22) ? 0 : null);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Match #", m_r22.match_number, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(5, m_r22.status === "live" || m_r22.status === "in_progress" ? 5 : m_r22.status === "scheduled" && m_r22.scheduled_at ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("b-match__p--winner", m_r22.winner_id === (m_r22.participant_a == null ? null : m_r22.participant_a.id) && m_r22.status === "completed")("b-match__p--loser", m_r22.winner_id && m_r22.winner_id !== (m_r22.participant_a == null ? null : m_r22.participant_a.id) && m_r22.status === "completed");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, m_r22.participant_a_is_bye ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(12, m_r22.score_a !== null && m_r22.score_a !== void 0 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("b-match__p--winner", m_r22.winner_id === (m_r22.participant_b == null ? null : m_r22.participant_b.id) && m_r22.status === "completed")("b-match__p--loser", m_r22.winner_id && m_r22.winner_id !== (m_r22.participant_b == null ? null : m_r22.participant_b.id) && m_r22.status === "completed");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(15, m_r22.participant_b_is_bye ? 15 : 16);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(17, m_r22.score_b !== null && m_r22.score_b !== void 0 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, m_r22.status === "disputed" ? 18 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 165)(1, "div", 166)(2, "span", 167);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 168);
    \u0275\u0275repeaterCreate(5, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_For_6_Template, 19, 32, "div", 169, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const round_r27 = ctx.$implicit;
    const \u0275roundIdx_750_r29 = ctx.$index;
    const \u0275$count_750_r30 = ctx.$count;
    \u0275\u0275classMap("b-round--" + round_r27.section);
    \u0275\u0275classProp("b-round--last", \u0275roundIdx_750_r29 === \u0275$count_750_r30 - 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("b-round__label--losers", round_r27.section === "losers")("b-round__label--final", round_r27.section === "grand_final");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", round_r27.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(round_r27.matches);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "div")(2, "div", 139);
    \u0275\u0275text(3, " Bracket ");
    \u0275\u0275template(4, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_4_Template, 1, 0)(5, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_5_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 140);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 141);
    \u0275\u0275template(9, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_9_Template, 5, 0, "button", 142);
    \u0275\u0275elementStart(10, "span", 143);
    \u0275\u0275template(11, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_11_Template, 1, 0)(12, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_12_Template, 1, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 144);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(15, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Conditional_15_Template, 14, 1, "div", 145);
    \u0275\u0275elementStart(16, "div", 146)(17, "div", 147);
    \u0275\u0275repeaterCreate(18, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_For_19_Template, 7, 9, "div", 148, _forTrack12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 149)(21, "div", 150);
    \u0275\u0275element(22, "span", 151);
    \u0275\u0275text(23, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 150);
    \u0275\u0275element(25, "span", 152);
    \u0275\u0275text(26, "Submitted");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 150);
    \u0275\u0275element(28, "span", 153);
    \u0275\u0275text(29, "Disputed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 150);
    \u0275\u0275element(31, "span", 154);
    \u0275\u0275text(32, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 155);
    \u0275\u0275text(34, "Click any match to view or submit a result.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r20 = ctx;
    const t_r2 = \u0275\u0275nextContext(2);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, b_r20.status === "completed" ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r2.format_label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, ctx_r4.hasMyMatch() ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, b_r20.status === "completed" ? 11 : 12);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", t_r2.participant_count, " players");
    \u0275\u0275advance();
    \u0275\u0275conditional(15, b_r20.status === "completed" && b_r20.winner ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bracket-tree--rr", t_r2.format === "round_robin")("bracket-tree--swiss", t_r2.format === "swiss");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.rounds());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_1_Template, 11, 1, "div", 129)(2, TournamentDetailComponent_Conditional_2_Conditional_103_Conditional_2_Template, 35, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !t_r2.bracket ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, (tmp_4_0 = t_r2.bracket) ? 2 : -1, tmp_4_0);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275text(2, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Standings will appear once the bracket is generated.");
    \u0275\u0275elementEnd()();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 189);
    \u0275\u0275text(1, "Buchholz");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 193);
  }
  if (rf & 2) {
    const p_r31 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", p_r31.avatar_url, \u0275\u0275sanitizeUrl)("alt", p_r31.display_name);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 198);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const p_r31 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_15_0 = p_r31.display_name) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "?").charAt(0).toUpperCase(), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 195);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r31 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("SEED #", p_r31.seed, "");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 197);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r31 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r31.buchholz);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 191);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "div", 192);
    \u0275\u0275template(7, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_7_Template, 1, 2, "img", 193)(8, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_8_Template, 2, 1);
    \u0275\u0275elementStart(9, "div")(10, "div", 194);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_12_Template, 2, 1, "div", 195);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "td")(14, "span", 196);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td")(17, "span", 197);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td")(20, "span", 196);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Conditional_22_Template, 3, 1, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r31 = ctx.$implicit;
    const i_r32 = ctx.$index;
    const t_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("standings-table__row--rank-1", i_r32 === 0)("standings-table__row--rank-2", i_r32 === 1)("standings-table__row--rank-3", i_r32 === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("rank--gold", i_r32 === 0)("rank--silver", i_r32 === 1)("rank--bronze", i_r32 === 2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 20, i_r32 + 1, "2.0-0"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(7, p_r31.avatar_url ? 7 : 8);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r31.display_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, p_r31.seed ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r31.wins);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r31.losses);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r31.points);
    \u0275\u0275advance();
    \u0275\u0275conditional(22, t_r2.format === "swiss" ? 22 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "div")(2, "div", 139);
    \u0275\u0275text(3, "Standings \xB7 Live");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 140);
    \u0275\u0275text(5, "Tournament Leaderboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 187);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "table", 188)(9, "thead")(10, "tr")(11, "th");
    \u0275\u0275text(12, "Rank");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Player");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 189);
    \u0275\u0275text(16, "W");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 189);
    \u0275\u0275text(18, "L");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 189);
    \u0275\u0275text(20, "Pts");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_Conditional_21_Template, 2, 0, "th", 189);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275repeaterCreate(23, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_For_24_Template, 23, 23, "tr", 190, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" Sorted by wins, then points", t_r2.format === "swiss" ? ", then Buchholz" : "", " ");
    \u0275\u0275advance(14);
    \u0275\u0275conditional(21, t_r2.format === "swiss" ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.leaderboard());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_1_Template, 5, 0, "div", 129)(2, TournamentDetailComponent_Conditional_2_Conditional_104_Conditional_2_Template, 25, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !t_r2.bracket || ctx_r4.leaderboard().length === 0 ? 1 : 2);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 131);
    \u0275\u0275element(3, "polyline", 199)(4, "line", 200)(5, "line", 201)(6, "line", 202)(7, "polyline", 203)(8, "line", 204)(9, "line", 205)(10, "line", 206);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(t_r2.bracket ? "No matches yet." : "Bracket has not been generated yet.");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 211)(1, "p");
    \u0275\u0275text(2, "No matches match the current filter.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 212);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_23_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.matchesFilter.set("all"));
    });
    \u0275\u0275text(4, "Show all");
    \u0275\u0275elementEnd()();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 221);
  }
  if (rf & 2) {
    const m_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", m_r36.participant_a.avatar_url, \u0275\u0275sanitizeUrl);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 228);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const m_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_16_0 = (tmp_16_0 = m_r36.participant_a == null ? null : m_r36.participant_a.display_name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : m_r36.participant_a == null ? null : m_r36.participant_a.name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "?").charAt(0).toUpperCase(), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 229);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 230);
    \u0275\u0275text(3, "\u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 229);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    let tmp_17_0;
    const m_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_16_0 = m_r36.score_a) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "\u2013");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_17_0 = m_r36.score_b) !== null && tmp_17_0 !== void 0 ? tmp_17_0 : "\u2013");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 231);
    \u0275\u0275text(1, "VS");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 221);
  }
  if (rf & 2) {
    const m_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", m_r36.participant_b.avatar_url, \u0275\u0275sanitizeUrl);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 228);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const m_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_16_0 = (tmp_16_0 = m_r36.participant_b == null ? null : m_r36.participant_b.display_name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : m_r36.participant_b == null ? null : m_r36.participant_b.name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "?").charAt(0).toUpperCase(), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 226);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r36 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, m_r36.scheduled_at, "d MMM \xB7 HH:mm"), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 215);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Template_div_click_0_listener() {
      const m_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.openMatch(m_r36));
    })("keyup.enter", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Template_div_keyup_enter_0_listener() {
      const m_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r4.openMatch(m_r36));
    })("keyup.space", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Template_div_keyup_space_0_listener($event) {
      const m_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(5);
      ctx_r4.openMatch(m_r36);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275elementStart(1, "div", 216)(2, "span", 217);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 218);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 219)(7, "div", 220);
    \u0275\u0275template(8, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_8_Template, 1, 1, "img", 221)(9, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_9_Template, 2, 1);
    \u0275\u0275elementStart(10, "span", 222);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 223);
    \u0275\u0275template(13, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_13_Template, 6, 2)(14, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_14_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 224)(16, "span", 222);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_18_Template, 1, 1, "img", 221)(19, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_19_Template, 2, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 225);
    \u0275\u0275template(21, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_21_Template, 3, 4, "span", 226);
    \u0275\u0275elementStart(22, "span", 227);
    \u0275\u0275template(23, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Conditional_23_Template, 1, 0, "span", 54);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_24_0;
    let tmp_28_0;
    const m_r36 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(5);
    \u0275\u0275classMap("match-row-card--" + m_r36.status);
    \u0275\u0275classProp("match-row-card--clickable", ctx_r4.matchIsClickable(m_r36));
    \u0275\u0275attribute("role", ctx_r4.matchIsClickable(m_r36) ? "button" : null)("tabindex", ctx_r4.matchIsClickable(m_r36) ? 0 : null);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("R", m_r36.round_number, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", m_r36.match_number, "");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("match-row-card__player--win", m_r36.winner_id === (m_r36.participant_a == null ? null : m_r36.participant_a.id) && (m_r36.status === "completed" || m_r36.status === "walkover"))("match-row-card__player--lose", m_r36.winner_id && m_r36.winner_id !== (m_r36.participant_a == null ? null : m_r36.participant_a.id) && (m_r36.status === "completed" || m_r36.status === "walkover"));
    \u0275\u0275advance();
    \u0275\u0275conditional(8, (m_r36.participant_a == null ? null : m_r36.participant_a.avatar_url) ? 8 : 9);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_24_0 = (tmp_24_0 = m_r36.participant_a == null ? null : m_r36.participant_a.display_name) !== null && tmp_24_0 !== void 0 ? tmp_24_0 : m_r36.participant_a == null ? null : m_r36.participant_a.name) !== null && tmp_24_0 !== void 0 ? tmp_24_0 : "TBD");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(13, m_r36.status === "completed" || m_r36.status === "walkover" ? 13 : 14);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("match-row-card__player--win", m_r36.winner_id === (m_r36.participant_b == null ? null : m_r36.participant_b.id) && (m_r36.status === "completed" || m_r36.status === "walkover"))("match-row-card__player--lose", m_r36.winner_id && m_r36.winner_id !== (m_r36.participant_b == null ? null : m_r36.participant_b.id) && (m_r36.status === "completed" || m_r36.status === "walkover"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_28_0 = (tmp_28_0 = m_r36.participant_b == null ? null : m_r36.participant_b.display_name) !== null && tmp_28_0 !== void 0 ? tmp_28_0 : m_r36.participant_b == null ? null : m_r36.participant_b.name) !== null && tmp_28_0 !== void 0 ? tmp_28_0 : "TBD");
    \u0275\u0275advance();
    \u0275\u0275conditional(18, (m_r36.participant_b == null ? null : m_r36.participant_b.avatar_url) ? 18 : 19);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(21, m_r36.scheduled_at ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap("match-row-card__status--" + m_r36.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(23, m_r36.status === "live" || m_r36.status === "in_progress" ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.statusLabel(m_r36.status), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 213);
    \u0275\u0275repeaterCreate(1, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_For_2_Template, 25, 26, "div", 214, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.matchesList());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 138)(1, "div")(2, "div", 139);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 140);
    \u0275\u0275text(5, "All Matches");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 207)(7, "button", 208);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.matchesFilter.set("all"));
    });
    \u0275\u0275text(8, " All ");
    \u0275\u0275elementStart(9, "span", 209);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 208);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.matchesFilter.set("upcoming"));
    });
    \u0275\u0275text(12, " Upcoming ");
    \u0275\u0275elementStart(13, "span", 209);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 210);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.matchesFilter.set("live"));
    });
    \u0275\u0275text(16, " Live ");
    \u0275\u0275elementStart(17, "span", 209);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 208);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.matchesFilter.set("completed"));
    });
    \u0275\u0275text(20, " Completed ");
    \u0275\u0275elementStart(21, "span", 209);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(23, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_23_Template, 5, 0, "div", 211)(24, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Conditional_24_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Matches \xB7 ", ctx_r4.matchCounts().all, " total");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("match-chip--active", ctx_r4.matchesFilter() === "all");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.matchCounts().all);
    \u0275\u0275advance();
    \u0275\u0275classProp("match-chip--active", ctx_r4.matchesFilter() === "upcoming");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.matchCounts().upcoming);
    \u0275\u0275advance();
    \u0275\u0275classProp("match-chip--active", ctx_r4.matchesFilter() === "live");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.matchCounts().live);
    \u0275\u0275advance();
    \u0275\u0275classProp("match-chip--active", ctx_r4.matchesFilter() === "completed");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.matchCounts().completed);
    \u0275\u0275advance();
    \u0275\u0275conditional(23, ctx_r4.matchesList().length === 0 ? 23 : 24);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_1_Template, 13, 1, "div", 129)(2, TournamentDetailComponent_Conditional_2_Conditional_105_Conditional_2_Template, 25, 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !t_r2.bracket || ctx_r4.matchCounts().all === 0 ? 1 : 2);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275text(2, "\u{1F465}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No players registered yet.");
    \u0275\u0275elementEnd()();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 236);
  }
  if (rf & 2) {
    let tmp_16_0;
    const p_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", p_r37.avatar_url, \u0275\u0275sanitizeUrl)("alt", (tmp_16_0 = p_r37.display_name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 242);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const p_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_15_0 = (tmp_15_0 = p_r37.display_name) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : p_r37.name) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "?").charAt(0).toUpperCase());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 238);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("SEED #", p_r37.seed, "");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 240);
    \u0275\u0275text(2, "Buchholz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 241);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r37.buchholz);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 234)(1, "div", 235);
    \u0275\u0275template(2, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_2_Template, 1, 2, "img", 236)(3, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_3_Template, 2, 1);
    \u0275\u0275elementStart(4, "div")(5, "div", 237);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_7_Template, 2, 1, "div", 238);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 239)(9, "div")(10, "div", 240);
    \u0275\u0275text(11, "Wins");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 241);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "div", 240);
    \u0275\u0275text(16, "Losses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 241);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "div", 240);
    \u0275\u0275text(21, "Pts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 241);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Conditional_24_Template, 5, 1, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_18_0;
    const p_r37 = ctx.$implicit;
    const i_r38 = ctx.$index;
    const t_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("player-card--gold", i_r38 === 0)("player-card--silver", i_r38 === 1)("player-card--bronze", i_r38 === 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, p_r37.avatar_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_18_0 = p_r37.display_name) !== null && tmp_18_0 !== void 0 ? tmp_18_0 : p_r37.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, p_r37.seed ? 7 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(p_r37.wins);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r37.losses);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r37.points);
    \u0275\u0275advance();
    \u0275\u0275conditional(24, t_r2.format === "swiss" ? 24 : -1);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "div")(2, "div", 139);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 140);
    \u0275\u0275text(5, "Registered Players");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 232);
    \u0275\u0275repeaterCreate(7, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_For_8_Template, 25, 13, "div", 233, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext(2);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Players \xB7 ", t_r2.participants.length, " of ", t_r2.max_participants, "");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r4.leaderboard());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_1_Template, 5, 0, "div", 129)(2, TournamentDetailComponent_Conditional_2_Conditional_106_Conditional_2_Template, 9, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !(t_r2.participants == null ? null : t_r2.participants.length) ? 1 : 2);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 243);
    \u0275\u0275text(1, " Set up rewards for top finishers \u2014 gift cards, cash, hardware, anything. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 244);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Conditional_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r39);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.openPrizeEditor());
    });
    \u0275\u0275text(3, " Set Prizes ");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 243);
    \u0275\u0275text(1, " The organizer hasn't published prize details for this tournament. ");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 131);
    \u0275\u0275element(3, "path", 132)(4, "path", 133)(5, "path", 134)(6, "path", 135)(7, "path", 136)(8, "path", 137);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "No prize pool configured yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Conditional_11_Template, 4, 0)(12, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(11);
    \u0275\u0275conditional(11, ctx_r4.canManageMatch() ? 11 : 12);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 212);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r40);
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.openPrizeEditor());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "path", 78)(3, "path", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Edit prizes");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 250);
    \u0275\u0275element(1, "circle", 253)(2, "path", 254);
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 255);
    \u0275\u0275element(1, "circle", 253)(2, "path", 254);
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 256);
    \u0275\u0275element(1, "circle", 253)(2, "path", 254);
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 257);
    \u0275\u0275element(1, "circle", 253)(2, "path", 254);
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 248)(1, "div", 249);
    \u0275\u0275template(2, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_2_Template, 3, 0, ":svg:svg", 250)(3, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_3_Template, 3, 0)(4, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_4_Template, 3, 0)(5, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Conditional_5_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 251);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 252);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r41 = ctx.$implicit;
    const i_r42 = ctx.$index;
    \u0275\u0275styleProp("--delay", i_r42 * 80, "ms");
    \u0275\u0275classProp("prize-tier--t1", p_r41.position === 1)("prize-tier--t2", p_r41.position === 2)("prize-tier--t3", p_r41.position === 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, p_r41.position === 1 ? 2 : p_r41.position === 2 ? 3 : p_r41.position === 3 ? 4 : 5);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", p_r41.position === 1 ? "1st Place \xB7 Champion" : p_r41.position === 2 ? "2nd Place \xB7 Runner-up" : p_r41.position === 3 ? "3rd Place \xB7 Bronze" : p_r41.position + "th Place", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r41.reward);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "div")(2, "div", 139);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 140);
    \u0275\u0275text(5, "Rewards & Tiers");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_Conditional_6_Template, 5, 0, "button", 245);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 246);
    \u0275\u0275repeaterCreate(8, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_For_9_Template, 10, 11, "div", 247, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Prize Pool \xB7 ", ctx_r4.normalizedPrizes().length, " ", ctx_r4.normalizedPrizes().length === 1 ? "tier" : "tiers", "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(6, ctx_r4.canEditTournament() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.normalizedPrizes());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_1_Template, 13, 1, "div", 129)(2, TournamentDetailComponent_Conditional_2_Conditional_107_Conditional_2_Template, 10, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !ctx_r4.normalizedPrizes().length ? 1 : 2);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275text(2, "\u{1F4E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No streams yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 243);
    \u0275\u0275text(6, " Streams appear here once organizers or participants set a Twitch or YouTube link on a match. ");
    \u0275\u0275elementEnd()();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 260);
    \u0275\u0275text(1, "\u25CF");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r4.trulyLiveCount(), " ", ctx_r4.trulyLiveCount() === 1 ? "match" : "matches", " live now ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" Streams \xB7 ", ctx_r4.liveStreams().length, " available ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 187);
    \u0275\u0275text(1, "No matches live right now \u2014 these are upcoming streams and replays.");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 187);
    \u0275\u0275text(1, "Click a thumbnail to start watching.");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r44 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, m_r44.scheduled_at, "d MMM \xB7 HH:mm"));
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 261)(1, "div", 262);
    \u0275\u0275element(2, "app-stream-embed", 263);
    \u0275\u0275elementStart(3, "span", 264);
    \u0275\u0275template(4, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Conditional_4_Template, 1, 0, "span", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 265)(7, "div", 266);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 267);
    \u0275\u0275text(10, "vs");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 268)(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Conditional_15_Template, 3, 4, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 269)(17, "span", 270);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 271);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Template_button_click_19_listener() {
      const m_r44 = \u0275\u0275restoreView(_r43).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.openMatch(m_r44));
    });
    \u0275\u0275text(20, " Match \u2192 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_20_0;
    let tmp_21_0;
    const m_r44 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap("stream-card--cat-" + ctx_r4.streamCategory(m_r44));
    \u0275\u0275advance(2);
    \u0275\u0275property("streamUrl", m_r44.stream_url)("title", ctx_r4.liveStreamTitle(m_r44));
    \u0275\u0275advance();
    \u0275\u0275classMap("stream-tag--" + ctx_r4.streamCategory(m_r44));
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ctx_r4.streamCategory(m_r44) === "live" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.streamCategoryLabel(m_r44), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_20_0 = (tmp_20_0 = m_r44.participant_a == null ? null : m_r44.participant_a.display_name) !== null && tmp_20_0 !== void 0 ? tmp_20_0 : m_r44.participant_a == null ? null : m_r44.participant_a.name) !== null && tmp_20_0 !== void 0 ? tmp_20_0 : "TBD", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_21_0 = (tmp_21_0 = m_r44.participant_b == null ? null : m_r44.participant_b.display_name) !== null && tmp_21_0 !== void 0 ? tmp_21_0 : m_r44.participant_b == null ? null : m_r44.participant_b.name) !== null && tmp_21_0 !== void 0 ? tmp_21_0 : "TBD", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("R", m_r44.round_number, " \xB7 #", m_r44.match_number, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(15, m_r44.scheduled_at && ctx_r4.streamCategory(m_r44) !== "live" ? 15 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("stream-card__status--" + m_r44.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.statusLabel(m_r44.status), " ");
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "div")(2, "div", 139);
    \u0275\u0275template(3, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_3_Template, 3, 2)(4, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 140);
    \u0275\u0275text(6, "Streams & Replays");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_7_Template, 2, 0, "p", 187)(8, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Conditional_8_Template, 2, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 258);
    \u0275\u0275repeaterCreate(10, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_For_11_Template, 21, 16, "article", 259, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, ctx_r4.trulyLiveCount() > 0 ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(7, ctx_r4.trulyLiveCount() === 0 ? 7 : ctx_r4.liveStreams().length > ctx_r4.trulyLiveCount() ? 8 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r4.liveStreams());
  }
}
function TournamentDetailComponent_Conditional_2_Conditional_108_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 53);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_1_Template, 7, 0, "div", 129)(2, TournamentDetailComponent_Conditional_2_Conditional_108_Conditional_2_Template, 12, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r4.liveStreams().length === 0 ? 1 : 2);
  }
}
function TournamentDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "a", 7);
    \u0275\u0275text(2, "Tournaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 8);
    \u0275\u0275text(4, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 8);
    \u0275\u0275text(8, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "section", 10);
    \u0275\u0275template(12, TournamentDetailComponent_Conditional_2_Conditional_12_Template, 1, 2, "img", 11);
    \u0275\u0275element(13, "div", 12)(14, "div", 13);
    \u0275\u0275elementStart(15, "div", 14)(16, "div", 15)(17, "div", 16)(18, "span", 17);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, TournamentDetailComponent_Conditional_2_Conditional_20_Template, 3, 1, "span", 18)(21, TournamentDetailComponent_Conditional_2_Conditional_21_Template, 2, 0)(22, TournamentDetailComponent_Conditional_2_Conditional_22_Template, 3, 2, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h1", 19);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, TournamentDetailComponent_Conditional_2_Conditional_25_Template, 2, 1, "div", 20);
    \u0275\u0275elementStart(26, "div", 21)(27, "span");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(28, "svg", 22);
    \u0275\u0275element(29, "rect", 23)(30, "line", 24)(31, "line", 25)(32, "line", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " Starts ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(34, "strong");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(38, "svg", 22);
    \u0275\u0275element(39, "polygon", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " Reg. closes ");
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(41, "strong");
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(45, "svg", 22);
    \u0275\u0275element(46, "path", 28)(47, "circle", 29)(48, "path", 30)(49, "path", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(50, "strong");
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275text(52, " joined ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(53, TournamentDetailComponent_Conditional_2_Conditional_53_Template, 8, 1, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275template(54, TournamentDetailComponent_Conditional_2_Conditional_54_Template, 10, 7, "div", 32);
    \u0275\u0275elementStart(55, "div", 33);
    \u0275\u0275template(56, TournamentDetailComponent_Conditional_2_Conditional_56_Template, 2, 2, "button", 34)(57, TournamentDetailComponent_Conditional_2_Conditional_57_Template, 4, 0, "span", 35)(58, TournamentDetailComponent_Conditional_2_Conditional_58_Template, 2, 2, "button", 34)(59, TournamentDetailComponent_Conditional_2_Conditional_59_Template, 2, 0, "button", 36);
    \u0275\u0275elementStart(60, "button", 37);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.activeTab.set("matches"));
    });
    \u0275\u0275text(61, "View matches");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "aside", 38);
    \u0275\u0275template(63, TournamentDetailComponent_Conditional_2_Conditional_63_Template, 11, 3, "div", 39)(64, TournamentDetailComponent_Conditional_2_Conditional_64_Template, 10, 0);
    \u0275\u0275elementStart(65, "div", 40)(66, "div", 41)(67, "div", 42);
    \u0275\u0275text(68, "Format");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 43);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 41)(72, "div", 42);
    \u0275\u0275text(73, "Entry fee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 43);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 41)(77, "div", 42);
    \u0275\u0275text(78, "Game");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 43);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "div", 41)(82, "div", 42);
    \u0275\u0275text(83, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 43);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275template(86, TournamentDetailComponent_Conditional_2_Conditional_86_Template, 9, 4, "section", 44);
    \u0275\u0275element(87, "app-tournament-sponsors", 45);
    \u0275\u0275template(88, TournamentDetailComponent_Conditional_2_Conditional_88_Template, 1, 1, "app-tournament-sponsors-manage", 45)(89, TournamentDetailComponent_Conditional_2_Conditional_89_Template, 3, 1, "div", 46);
    \u0275\u0275elementStart(90, "div", 47)(91, "div", 48)(92, "button", 49);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Template_button_click_92_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.activeTab.set("bracket"));
    });
    \u0275\u0275text(93, "Bracket");
    \u0275\u0275elementEnd();
    \u0275\u0275template(94, TournamentDetailComponent_Conditional_2_Conditional_94_Template, 2, 2, "button", 50);
    \u0275\u0275elementStart(95, "button", 49);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.activeTab.set("matches"));
    });
    \u0275\u0275text(96, " Matches ");
    \u0275\u0275template(97, TournamentDetailComponent_Conditional_2_Conditional_97_Template, 2, 1, "span", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "button", 49);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Template_button_click_98_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.activeTab.set("leaderboard"));
    });
    \u0275\u0275text(99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "button", 49);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_2_Template_button_click_100_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.activeTab.set("prize"));
    });
    \u0275\u0275text(101, "Prize Pool");
    \u0275\u0275elementEnd();
    \u0275\u0275template(102, TournamentDetailComponent_Conditional_2_Conditional_102_Template, 5, 8, "button", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(103, TournamentDetailComponent_Conditional_2_Conditional_103_Template, 3, 2, "section", 53)(104, TournamentDetailComponent_Conditional_2_Conditional_104_Template, 3, 1, "section", 53)(105, TournamentDetailComponent_Conditional_2_Conditional_105_Template, 3, 1, "section", 53)(106, TournamentDetailComponent_Conditional_2_Conditional_106_Template, 3, 1, "section", 53)(107, TournamentDetailComponent_Conditional_2_Conditional_107_Template, 3, 1, "section", 53)(108, TournamentDetailComponent_Conditional_2_Conditional_108_Template, 3, 1, "section", 53);
  }
  if (rf & 2) {
    let tmp_16_0;
    let tmp_19_0;
    const t_r2 = ctx;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(t_r2.game_label);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r2.name);
    \u0275\u0275advance();
    \u0275\u0275classMap("hero game-bg game-bg--" + t_r2.game + (t_r2.cover_image_url ? " hero--has-cover" : ""));
    \u0275\u0275classProp("hero--has-cover", t_r2.cover_image_url);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, t_r2.cover_image_url ? 12 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", t_r2.game_label, " \xB7 ", t_r2.format_label, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(20, t_r2.bracket && t_r2.bracket.status !== "completed" && ctx_r4.trulyLiveCount() > 0 ? 20 : t_r2.is_registration_open ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(22, t_r2.organizer_name ? 22 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(25, t_r2.name_ar ? 25 : -1);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(36, 52, t_r2.starts_at, "d MMM, HH:mm"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(43, 55, t_r2.registration_closes_at, "d MMM, HH:mm"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate2("", t_r2.participant_count, "/", t_r2.max_participants, "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(53, t_r2.format === "swiss" && t_r2.swiss_rounds ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(54, (tmp_16_0 = t_r2.bracket) ? 54 : -1, tmp_16_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(56, t_r2.is_registration_open && ctx_r4.auth.isLoggedIn() && !t_r2.is_registered ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(57, t_r2.is_registered ? 57 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(58, !t_r2.is_registration_open && !t_r2.bracket && ctx_r4.auth.isLoggedIn() && (((tmp_19_0 = ctx_r4.auth.currentUser()) == null ? null : tmp_19_0.role) === "organizer" || ((tmp_19_0 = ctx_r4.auth.currentUser()) == null ? null : tmp_19_0.role) === "admin") ? 58 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(59, ctx_r4.trulyLiveCount() > 0 ? 59 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(63, ctx_r4.normalizedPrizes().length > 0 ? 63 : ctx_r4.canEditTournament() ? 64 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(t_r2.format_label);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("meta-card__v--good", t_r2.entry_fee_sar === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2.entry_fee_sar === 0 ? "FREE" : t_r2.entry_fee_sar + " SAR", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r2.game_label);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r2.status_label);
    \u0275\u0275advance();
    \u0275\u0275conditional(86, t_r2.has_rules && t_r2.rules ? 86 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("tournamentId", t_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(88, ctx_r4.canManageMatch() ? 88 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(89, ctx_r4.canManageMatch() ? 89 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("tab--active", ctx_r4.activeTab() === "bracket");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(94, ctx_r4.isFlatFormat() ? 94 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("tab--active", ctx_r4.activeTab() === "matches");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(97, ctx_r4.matchCounts().all ? 97 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("tab--active", ctx_r4.activeTab() === "leaderboard");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (t_r2.participants == null ? null : t_r2.participants.length) ? "Players (" + t_r2.participants.length + ")" : "Players", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("tab--active", ctx_r4.activeTab() === "prize");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(102, ctx_r4.liveStreamsCount() > 0 ? 102 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(103, ctx_r4.activeTab() === "bracket" ? 103 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(104, ctx_r4.activeTab() === "standings" ? 104 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(105, ctx_r4.activeTab() === "matches" ? 105 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(106, ctx_r4.activeTab() === "leaderboard" ? 106 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(107, ctx_r4.activeTab() === "prize" ? 107 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(108, ctx_r4.activeTab() === "live" ? 108 : -1);
  }
}
function TournamentDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 272);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showPrizeEditor.set(false));
    });
    \u0275\u0275elementStart(1, "div", 273);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_3_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r45);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 274)(3, "div")(4, "p", 275);
    \u0275\u0275text(5, "Edit tournament");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 276);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 277);
    \u0275\u0275element(8, "path", 132)(9, "path", 133)(10, "path", 134)(11, "path", 135)(12, "path", 136)(13, "path", 137);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Prize Pool");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(15, "button", 278);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_3_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showPrizeEditor.set(false));
    });
    \u0275\u0275text(16, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "form", 279);
    \u0275\u0275listener("ngSubmit", function TournamentDetailComponent_Conditional_3_Template_form_ngSubmit_17_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.savePrizes());
    });
    \u0275\u0275elementStart(18, "div", 280)(19, "label", 281);
    \u0275\u0275text(20, "\u{1F947} 1st Place");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 282);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 280)(23, "label", 281);
    \u0275\u0275text(24, "\u{1F948} 2nd Place");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 283);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 280)(27, "label", 281);
    \u0275\u0275text(28, "\u{1F949} 3rd Place");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 284);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 285);
    \u0275\u0275text(31, "Leave a field blank to omit that tier. Clearing all three removes the prize pool.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 286)(33, "button", 212);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_3_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showPrizeEditor.set(false));
    });
    \u0275\u0275text(34, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 287);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("formGroup", ctx_r4.prizeForm);
    \u0275\u0275advance(18);
    \u0275\u0275property("disabled", ctx_r4.savingPrizes());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.savingPrizes() ? "Saving\u2026" : "Save Prizes", " ");
  }
}
function TournamentDetailComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 272);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_4_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showRegisterModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 288);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_4_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r46);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 274)(3, "div")(4, "p", 275);
    \u0275\u0275text(5, "Before you register");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 276);
    \u0275\u0275text(7, "Rules & Conditions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 278);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_4_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showRegisterModal.set(false));
    });
    \u0275\u0275text(9, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 289)(11, "pre", 89);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label", 290)(14, "input", 291);
    \u0275\u0275listener("change", function TournamentDetailComponent_Conditional_4_Template_input_change_14_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.acceptedRules.set($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "I have read and agree to the tournament rules and conditions.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 286)(18, "button", 37);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_4_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showRegisterModal.set(false));
    });
    \u0275\u0275text(19, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 292);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_4_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.confirmRegisterWithRules());
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx.rules);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r4.acceptedRules());
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", !ctx_r4.acceptedRules() || ctx_r4.registering());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.registering() ? "Registering\u2026" : "Accept & Register", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 295);
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275property("src", m_r48.participant_a.avatar_url, \u0275\u0275sanitizeUrl);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 311);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_3_0 = (tmp_3_0 = m_r48.participant_a == null ? null : m_r48.participant_a.display_name) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : m_r48.participant_a == null ? null : m_r48.participant_a.name) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "?").charAt(0).toUpperCase(), " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 298);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r48.score_a);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 298);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r48.score_b);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 295);
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275property("src", m_r48.participant_b.avatar_url, \u0275\u0275sanitizeUrl);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 311);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_3_0 = (tmp_3_0 = m_r48.participant_b == null ? null : m_r48.participant_b.display_name) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : m_r48.participant_b == null ? null : m_r48.participant_b.name) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "?").charAt(0).toUpperCase(), " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 312);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleScheduleEditor());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r48.scheduled_at ? "Change" : "Set Time", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_39_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 313)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 2, m_r48.scheduled_at, "EEEE, d MMM y"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" at ", \u0275\u0275pipeBind2(5, 5, m_r48.scheduled_at, "HH:mm"), " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_39_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 309);
    \u0275\u0275text(1, "Not yet scheduled.");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentDetailComponent_Conditional_5_Conditional_39_Conditional_0_Template, 6, 8, "div", 313)(1, TournamentDetailComponent_Conditional_5_Conditional_39_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, m_r48.scheduled_at ? 0 : 1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 314);
    \u0275\u0275listener("ngSubmit", function TournamentDetailComponent_Conditional_5_Conditional_40_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r50);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.saveSchedule());
    });
    \u0275\u0275element(1, "input", 315);
    \u0275\u0275elementStart(2, "div", 316)(3, "button", 212);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_40_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r50);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleScheduleEditor());
    });
    \u0275\u0275text(4, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 287);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroup", ctx_r4.scheduleForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r4.scheduleForm.invalid || ctx_r4.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.submitting() ? "Saving\u2026" : "Save", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 312);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_47_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r51);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleStreamEditor());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r48.stream_url ? "Change" : "Add Stream", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_49_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 318)(1, "button", 319);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_49_Conditional_1_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.removeStream());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.savingStream());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.savingStream() ? "Removing\u2026" : "Remove stream", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-stream-embed", 317);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_5_Conditional_49_Conditional_1_Template, 3, 2, "div", 318);
  }
  if (rf & 2) {
    let tmp_4_0;
    const m_r48 = \u0275\u0275nextContext();
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("streamUrl", m_r48.stream_url)("title", "Match #" + m_r48.match_number + " \u2014 " + ((tmp_4_0 = (tmp_4_0 = m_r48.participant_a == null ? null : m_r48.participant_a.display_name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : m_r48.participant_a == null ? null : m_r48.participant_a.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "") + " vs " + ((tmp_4_0 = (tmp_4_0 = m_r48.participant_b == null ? null : m_r48.participant_b.display_name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : m_r48.participant_b == null ? null : m_r48.participant_b.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : ""));
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r4.canModifyStream() ? 1 : -1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 309);
    \u0275\u0275text(1, "No live stream for this match.");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 309);
    \u0275\u0275text(1, " No stream yet. Click ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Add Stream");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " above to share a Twitch or YouTube live link. ");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 320);
    \u0275\u0275listener("ngSubmit", function TournamentDetailComponent_Conditional_5_Conditional_52_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r53);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.saveStream());
    });
    \u0275\u0275elementStart(1, "label", 321);
    \u0275\u0275text(2, " Stream URL ");
    \u0275\u0275elementStart(3, "span", 322);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 323);
    \u0275\u0275elementStart(6, "p", 324);
    \u0275\u0275text(7, " Paste a Twitch channel URL or a YouTube live/watch URL. Other links won't be accepted. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 316)(9, "button", 325);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_52_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r53);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleStreamEditor());
    });
    \u0275\u0275text(10, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 287);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroup", ctx_r4.streamForm);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r4.savingStream());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.streamForm.invalid || ctx_r4.savingStream());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.savingStream() ? "Saving\u2026" : "Save Stream", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 303)(1, "header", 304)(2, "span", 305);
    \u0275\u0275text(3, "\u{1F3A5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 306);
    \u0275\u0275text(5, "Dawri Broadcast");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 308)(7, "dawri-broadcast-controls", 326);
    \u0275\u0275listener("broadcastChanged", function TournamentDetailComponent_Conditional_5_Conditional_53_Template_dawri_broadcast_controls_broadcastChanged_7_listener($event) {
      \u0275\u0275restoreView(_r54);
      const m_r48 = \u0275\u0275nextContext();
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.onBroadcastChanged($event, m_r48));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const m_r48 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("matchId", m_r48.id)("defaultTitle", "Match #" + m_r48.match_number + " \u2014 " + ((tmp_4_0 = (tmp_4_0 = m_r48.participant_a == null ? null : m_r48.participant_a.display_name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : m_r48.participant_a == null ? null : m_r48.participant_a.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "") + " vs " + ((tmp_4_0 = (tmp_4_0 = m_r48.participant_b == null ? null : m_r48.participant_b.display_name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : m_r48.participant_b == null ? null : m_r48.participant_b.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : ""));
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 312);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.toggleRescheduleForm());
    });
    \u0275\u0275text(1, " Propose Change ");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 320);
    \u0275\u0275listener("ngSubmit", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r56);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.requestReschedule());
    });
    \u0275\u0275elementStart(1, "label", 281);
    \u0275\u0275text(2, "Proposed Time ");
    \u0275\u0275elementStart(3, "span", 322);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 329);
    \u0275\u0275elementStart(6, "label", 281);
    \u0275\u0275text(7, "Reason (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "textarea", 330);
    \u0275\u0275elementStart(9, "div", 316)(10, "button", 212);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_8_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r56);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.toggleRescheduleForm());
    });
    \u0275\u0275text(11, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 287);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275property("formGroup", ctx_r4.rescheduleForm);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r4.rescheduleForm.invalid || ctx_r4.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.submitting() ? "Sending\u2026" : "Send Request", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 333);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const req_r58 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('"', req_r58.reason, '"');
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 327)(1, "div", 331)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " proposed a new time: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 332);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_9_Conditional_8_Template, 2, 1, "div", 333);
    \u0275\u0275elementStart(9, "div", 334)(10, "button", 335);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_9_Template_button_click_10_listener() {
      const req_r58 = \u0275\u0275restoreView(_r57);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.respondToReschedule(req_r58, false));
    });
    \u0275\u0275text(11, "Reject");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 292);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_9_Template_button_click_12_listener() {
      const req_r58 = \u0275\u0275restoreView(_r57);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.respondToReschedule(req_r58, true));
    });
    \u0275\u0275text(13, "Accept");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const req_r58 = ctx;
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = req_r58.requested_by.name) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : "Opponent");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(7, 5, req_r58.proposed_at, "EEE, d MMM \xB7 HH:mm"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, req_r58.reason ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.submitting());
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 333);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const req_r60 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('"', req_r60.reason, '"');
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 328)(1, "div", 331);
    \u0275\u0275text(2, " You proposed ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u2014 awaiting opponent. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_10_Conditional_7_Template, 2, 1, "div", 333);
    \u0275\u0275elementStart(8, "div", 334)(9, "button", 37);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_10_Template_button_click_9_listener() {
      const req_r60 = \u0275\u0275restoreView(_r59);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.cancelMyReschedule(req_r60));
    });
    \u0275\u0275text(10, "Cancel request");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const req_r60 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 2, req_r60.proposed_at, "EEE, d MMM \xB7 HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(7, req_r60.reason ? 7 : -1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 333);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r62 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('"', r_r62.reason, '"');
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 336)(1, "div", 331)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " proposed ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Conditional_0_Conditional_8_Template, 2, 1, "div", 333);
    \u0275\u0275elementStart(9, "div", 334)(10, "button", 337);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r61);
      const r_r62 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.organizerOverrideReschedule(r_r62, false));
    });
    \u0275\u0275text(11, " Force reject ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 338);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r61);
      const r_r62 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.organizerOverrideReschedule(r_r62, true));
    });
    \u0275\u0275text(13, " Force approve ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r62 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r62.requested_by.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 5, r_r62.proposed_at, "EEE, d MMM \xB7 HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, r_r62.reason ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.submitting());
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Conditional_0_Template, 14, 8, "div", 336);
  }
  if (rf & 2) {
    const r_r62 = ctx.$implicit;
    \u0275\u0275conditional(0, r_r62.is_pending ? 0 : -1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_For_1_Template, 1, 1, null, null, _forTrack2);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r4.rescheduleRequests());
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 303)(1, "header", 304)(2, "span", 305);
    \u0275\u0275text(3, "\u21BB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 306);
    \u0275\u0275text(5, "Reschedule Requests");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_6_Template, 2, 0, "button", 307);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 308);
    \u0275\u0275template(8, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_8_Template, 14, 3, "form", 310)(9, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_9_Template, 14, 8, "div", 327)(10, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_10_Template, 11, 5, "div", 328)(11, TournamentDetailComponent_Conditional_5_Conditional_54_Conditional_11_Template, 2, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const m_r48 = \u0275\u0275nextContext();
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, ctx_r4.currentUserIsParticipant() && !ctx_r4.showRescheduleForm() && !ctx_r4.myPendingReschedule() && m_r48.status !== "completed" && m_r48.status !== "walkover" ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, ctx_r4.showRescheduleForm() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, (tmp_5_0 = ctx_r4.pendingRescheduleAwaitingMe()) ? 9 : -1, tmp_5_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, (tmp_6_0 = ctx_r4.myPendingReschedule()) ? 10 : -1, tmp_6_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r4.canManageMatch() ? 11 : -1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 340)(1, "span", 343);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 344);
    \u0275\u0275text(4, "Winner: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const m_r48 = \u0275\u0275nextContext(2);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", (tmp_4_0 = m_r48.score_a) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "\u2013", " \u2014 ", (tmp_4_0 = m_r48.score_b) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "\u2013", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r4.getWinnerName(m_r48));
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 345);
    \u0275\u0275listener("ngSubmit", function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_14_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.submitResult());
    });
    \u0275\u0275elementStart(1, "p", 346);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 347)(4, "label", 348)(5, "span", 349);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 350);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 351);
    \u0275\u0275text(9, "\u2013");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "label", 348)(11, "span", 349);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 352);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 281);
    \u0275\u0275text(15, "Winner ");
    \u0275\u0275elementStart(16, "span", 322);
    \u0275\u0275text(17, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 353)(19, "label", 354);
    \u0275\u0275element(20, "input", 355);
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "label", 354);
    \u0275\u0275element(24, "input", 355);
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 316)(28, "button", 287);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_11_0;
    const m_r48 = \u0275\u0275nextContext(2);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r4.resultForm);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.canSubmitResult(m_r48) ? "Report the final score and select the winner. Your opponent confirms it." : "Enter the final score and winner for this match (organizer override \u2014 applied immediately).", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_6_0 = (tmp_6_0 = m_r48.participant_a == null ? null : m_r48.participant_a.display_name) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : m_r48.participant_a == null ? null : m_r48.participant_a.name) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : "TBD");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((tmp_7_0 = (tmp_7_0 = m_r48.participant_b == null ? null : m_r48.participant_b.display_name) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : m_r48.participant_b == null ? null : m_r48.participant_b.name) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : "TBD");
    \u0275\u0275advance(8);
    \u0275\u0275property("value", m_r48.participant_a == null ? null : m_r48.participant_a.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_9_0 = (tmp_9_0 = m_r48.participant_a == null ? null : m_r48.participant_a.display_name) !== null && tmp_9_0 !== void 0 ? tmp_9_0 : m_r48.participant_a == null ? null : m_r48.participant_a.name) !== null && tmp_9_0 !== void 0 ? tmp_9_0 : "TBD");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", m_r48.participant_b == null ? null : m_r48.participant_b.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_11_0 = (tmp_11_0 = m_r48.participant_b == null ? null : m_r48.participant_b.display_name) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : m_r48.participant_b == null ? null : m_r48.participant_b.name) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : "TBD");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.resultForm.invalid || ctx_r4.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.submitting() ? "Submitting\u2026" : "Submit Result", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 342)(1, "p", 356);
    \u0275\u0275text(2, " Your opponent reported ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, ". Confirm if it's correct, or dispute it. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 316)(7, "button", 357);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.confirmResult());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "form", 358);
    \u0275\u0275listener("ngSubmit", function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_15_Template_form_ngSubmit_9_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.submitDispute());
    });
    \u0275\u0275elementStart(10, "label", 281);
    \u0275\u0275text(11, "Dispute reason");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "textarea", 359);
    \u0275\u0275elementStart(13, "div", 316)(14, "button", 360);
    \u0275\u0275text(15, "Raise Dispute");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const m_r48 = \u0275\u0275nextContext(2);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", (tmp_4_0 = m_r48.score_a) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "\u2013", " \u2014 ", (tmp_4_0 = m_r48.score_b) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "\u2013", "");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r4.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.submitting() ? "Confirming\u2026" : "Confirm Result", " ");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r4.disputeForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r4.disputeForm.invalid || ctx_r4.submitting());
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 309);
    \u0275\u0275text(1, "Result reported \u2014 awaiting opponent confirmation.");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 303)(1, "header", 304)(2, "span", 305);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 339);
    \u0275\u0275element(4, "path", 132)(5, "path", 133)(6, "path", 134)(7, "path", 135)(8, "path", 136)(9, "path", 137);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "span", 306);
    \u0275\u0275text(11, "Match Result");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 308);
    \u0275\u0275template(13, TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_13_Template, 7, 3, "div", 340)(14, TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_14_Template, 30, 10, "form", 341)(15, TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_15_Template, 16, 6, "div", 342)(16, TournamentDetailComponent_Conditional_5_Conditional_55_Conditional_16_Template, 2, 0, "p", 309);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r48 = \u0275\u0275nextContext();
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275conditional(13, m_r48.status === "completed" ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(14, ctx_r4.canSubmitResult(m_r48) || ctx_r4.canManageMatch() && m_r48.participant_a && m_r48.participant_b && m_r48.status !== "completed" && m_r48.status !== "walkover" ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, ctx_r4.canConfirmResult(m_r48) ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, m_r48.status === "pending" && !ctx_r4.canConfirmResult(m_r48) && !ctx_r4.canSubmitResult(m_r48) ? 16 : -1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 363);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.evidenceList().length);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 364)(1, "label", 365)(2, "input", 366);
    \u0275\u0275listener("change", function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_10_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r65);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.onEvidenceFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 367);
    \u0275\u0275element(4, "path", 368)(5, "polyline", 369)(6, "line", 370);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(8, "input", 371);
    \u0275\u0275elementStart(9, "button", 372);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_10_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r65);
      const ctx_r4 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r4.uploadEvidence());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275property("formGroup", ctx_r4.evidenceForm);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r4.evidenceFile() ? ctx_r4.evidenceFile().name : "Choose screenshot or clip", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r4.evidenceFile() || ctx_r4.uploadingEvidence());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.uploadingEvidence() ? "Uploading\u2026" : "Upload", " ");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 309);
    \u0275\u0275text(1, "No evidence uploaded yet.");
    \u0275\u0275elementEnd();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 375);
    \u0275\u0275element(1, "img", 380);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const ev_r66 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", ev_r66.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("src", ev_r66.url, \u0275\u0275sanitizeUrl)("alt", (tmp_17_0 = ev_r66.caption) !== null && tmp_17_0 !== void 0 ? tmp_17_0 : "Evidence");
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "video", 381);
  }
  if (rf & 2) {
    const ev_r66 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", ev_r66.url, \u0275\u0275sanitizeUrl);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 377);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ev_r66 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ev_r66.caption);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 382);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r67);
      const ev_r66 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r4.deleteEvidence(ev_r66));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "polyline", 383)(3, "path", 384);
    \u0275\u0275elementEnd()();
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 374);
    \u0275\u0275template(1, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_1_Template, 2, 3, "a", 375)(2, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_2_Template, 1, 1);
    \u0275\u0275elementStart(3, "div", 376);
    \u0275\u0275template(4, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_4_Template, 2, 1, "span", 377);
    \u0275\u0275elementStart(5, "span", 378);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Conditional_7_Template, 4, 0, "button", 379);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const ev_r66 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ev_r66.file_type === "image" ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(4, ev_r66.caption ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("by ", (tmp_16_0 = ev_r66.uploaded_by.name) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "Player", "");
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r4.canDeleteEvidence(ev_r66) ? 7 : -1);
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 373);
    \u0275\u0275repeaterCreate(1, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_For_2_Template, 8, 4, "div", 374, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.evidenceList());
  }
}
function TournamentDetailComponent_Conditional_5_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 303)(1, "header", 304)(2, "span", 305);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 339);
    \u0275\u0275element(4, "path", 361)(5, "circle", 362);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span", 306);
    \u0275\u0275text(7, "Evidence");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_8_Template, 2, 1, "span", 363);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 308);
    \u0275\u0275template(10, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_10_Template, 11, 4, "div", 364)(11, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_11_Template, 2, 0, "p", 309)(12, TournamentDetailComponent_Conditional_5_Conditional_56_Conditional_12_Template, 3, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(8, ctx_r4.evidenceList().length > 0 ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, ctx_r4.canManageMatch() || ctx_r4.currentUserIsParticipant() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r4.evidenceList().length === 0 ? 11 : 12);
  }
}
function TournamentDetailComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 272);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 288);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r47);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 274)(3, "div")(4, "p", 275);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 276);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 278);
    \u0275\u0275listener("click", function TournamentDetailComponent_Conditional_5_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.closeModal());
    });
    \u0275\u0275text(9, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 293)(11, "div", 294);
    \u0275\u0275template(12, TournamentDetailComponent_Conditional_5_Conditional_12_Template, 1, 1, "img", 295)(13, TournamentDetailComponent_Conditional_5_Conditional_13_Template, 2, 1);
    \u0275\u0275elementStart(14, "div", 296)(15, "div", 297);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, TournamentDetailComponent_Conditional_5_Conditional_17_Template, 2, 1, "div", 298);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 299);
    \u0275\u0275text(19, "VS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 300);
    \u0275\u0275template(21, TournamentDetailComponent_Conditional_5_Conditional_21_Template, 2, 1, "div", 298);
    \u0275\u0275elementStart(22, "div", 296)(23, "div", 297);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(25, TournamentDetailComponent_Conditional_5_Conditional_25_Template, 1, 1, "img", 295)(26, TournamentDetailComponent_Conditional_5_Conditional_26_Template, 2, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 301)(28, "span", 302);
    \u0275\u0275template(29, TournamentDetailComponent_Conditional_5_Conditional_29_Template, 1, 0, "span", 54);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "section", 303)(32, "header", 304)(33, "span", 305);
    \u0275\u0275text(34, "\u{1F550}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 306);
    \u0275\u0275text(36, "Schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, TournamentDetailComponent_Conditional_5_Conditional_37_Template, 2, 1, "button", 307);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 308);
    \u0275\u0275template(39, TournamentDetailComponent_Conditional_5_Conditional_39_Template, 2, 1)(40, TournamentDetailComponent_Conditional_5_Conditional_40_Template, 7, 3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "section", 303)(42, "header", 304)(43, "span", 305);
    \u0275\u0275text(44, "\u{1F4FA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 306);
    \u0275\u0275text(46, "Live Stream");
    \u0275\u0275elementEnd();
    \u0275\u0275template(47, TournamentDetailComponent_Conditional_5_Conditional_47_Template, 2, 1, "button", 307);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 308);
    \u0275\u0275template(49, TournamentDetailComponent_Conditional_5_Conditional_49_Template, 2, 3)(50, TournamentDetailComponent_Conditional_5_Conditional_50_Template, 2, 0, "p", 309)(51, TournamentDetailComponent_Conditional_5_Conditional_51_Template, 5, 0, "p", 309)(52, TournamentDetailComponent_Conditional_5_Conditional_52_Template, 13, 4, "form", 310);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(53, TournamentDetailComponent_Conditional_5_Conditional_53_Template, 8, 2, "section", 303)(54, TournamentDetailComponent_Conditional_5_Conditional_54_Template, 12, 5, "section", 303)(55, TournamentDetailComponent_Conditional_5_Conditional_55_Template, 17, 4, "section", 303)(56, TournamentDetailComponent_Conditional_5_Conditional_56_Template, 13, 3, "section", 303);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_10_0;
    const m_r48 = ctx;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("Round ", m_r48.round_number, " \xB7 ", m_r48.bracket_section, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Match #", m_r48.match_number, "");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("modal__player--winner", m_r48.winner_id === (m_r48.participant_a == null ? null : m_r48.participant_a.id) && m_r48.status === "completed");
    \u0275\u0275advance();
    \u0275\u0275conditional(12, (m_r48.participant_a == null ? null : m_r48.participant_a.avatar_url) ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_6_0 = (tmp_6_0 = m_r48.participant_a == null ? null : m_r48.participant_a.display_name) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : m_r48.participant_a == null ? null : m_r48.participant_a.name) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : "TBD");
    \u0275\u0275advance();
    \u0275\u0275conditional(17, m_r48.score_a !== null && m_r48.score_a !== void 0 ? 17 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("modal__player--winner", m_r48.winner_id === (m_r48.participant_b == null ? null : m_r48.participant_b.id) && m_r48.status === "completed");
    \u0275\u0275advance();
    \u0275\u0275conditional(21, m_r48.score_b !== null && m_r48.score_b !== void 0 ? 21 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_10_0 = (tmp_10_0 = m_r48.participant_b == null ? null : m_r48.participant_b.display_name) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : m_r48.participant_b == null ? null : m_r48.participant_b.name) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : "TBD");
    \u0275\u0275advance();
    \u0275\u0275conditional(25, (m_r48.participant_b == null ? null : m_r48.participant_b.avatar_url) ? 25 : 26);
    \u0275\u0275advance(3);
    \u0275\u0275classMap("modal__status-badge--" + m_r48.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(29, m_r48.status === "live" || m_r48.status === "in_progress" ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.statusLabel(m_r48.status), " ");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(37, ctx_r4.canManageMatch() && !ctx_r4.showScheduleEditor() && m_r48.status !== "completed" && m_r48.status !== "walkover" ? 37 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(39, !ctx_r4.showScheduleEditor() ? 39 : 40);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(47, ctx_r4.canModifyStream() && !ctx_r4.showStreamEditor() ? 47 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(49, m_r48.stream_url && !ctx_r4.showStreamEditor() ? 49 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(50, !m_r48.stream_url && !ctx_r4.showStreamEditor() && !ctx_r4.canModifyStream() ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(51, !m_r48.stream_url && !ctx_r4.showStreamEditor() && ctx_r4.canModifyStream() ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(52, ctx_r4.showStreamEditor() ? 52 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(53, ctx_r4.canModifyStream() ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(54, m_r48.scheduled_at || ctx_r4.rescheduleRequests().length ? 54 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(55, ctx_r4.canSubmitResult(m_r48) || ctx_r4.canConfirmResult(m_r48) || m_r48.status === "completed" || m_r48.status === "pending" ? 55 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(56, ctx_r4.canManageMatch() || ctx_r4.currentUserIsParticipant() || ctx_r4.evidenceList().length > 0 ? 56 : -1);
  }
}
var TournamentDetailComponent = class _TournamentDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.toast = inject(ToastService);
    this.fb = inject(FormBuilder);
    this.brand = inject(BrandingService);
    this.tournament = signal(null);
    this.loading = signal(true);
    this.error = signal(null);
    this.generating = signal(false);
    this.registering = signal(false);
    this.submitting = signal(false);
    this.activeTab = signal("bracket");
    this.selectedMatch = signal(null);
    this.disputeMode = signal(false);
    this.rulesExpanded = signal(false);
    this.showRegisterModal = signal(false);
    this.acceptedRules = signal(false);
    this.showPrizeEditor = signal(false);
    this.savingPrizes = signal(false);
    this.prizeForm = this.fb.group({
      prize_1: [""],
      prize_2: [""],
      prize_3: [""]
    });
    this.canEditTournament = computed(() => {
      const u = this.auth.currentUser();
      const t = this.tournament();
      if (!u || !t)
        return false;
      return u.role === "admin" || u.id === t.organizer_id;
    });
    this.normalizedPrizes = computed(() => {
      const raw = this.tournament()?.prize_pool;
      if (!raw)
        return [];
      let arr = raw;
      if (typeof raw === "string") {
        try {
          arr = JSON.parse(raw);
        } catch {
          return [];
        }
      }
      if (!Array.isArray(arr) && typeof arr === "object") {
        arr = [arr];
      }
      if (!Array.isArray(arr))
        return [];
      return arr.map((item, idx) => {
        if (typeof item === "string" || typeof item === "number") {
          return { position: idx + 1, reward: String(item) };
        }
        return {
          position: Number(item?.position ?? item?.place ?? idx + 1),
          reward: String(item?.reward ?? item?.prize ?? item?.value ?? "")
        };
      }).filter((p) => p.reward.trim().length > 0);
    });
    this.showScheduleEditor = signal(false);
    this.showRescheduleForm = signal(false);
    this.rescheduleRequests = signal([]);
    this.evidenceList = signal([]);
    this.loadingMatchDetails = signal(false);
    this.uploadingEvidence = signal(false);
    this.showStreamEditor = signal(false);
    this.savingStream = signal(false);
    this.resultForm = this.fb.group({
      winner_participant_id: ["", Validators.required],
      score_a: [null],
      score_b: [null]
    });
    this.disputeForm = this.fb.group({
      reason: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(1e3)]]
    });
    this.scheduleForm = this.fb.group({
      scheduled_at: ["", Validators.required]
    });
    this.rescheduleForm = this.fb.group({
      proposed_at: ["", Validators.required],
      reason: ["", Validators.maxLength(500)]
    });
    this.evidenceForm = this.fb.group({
      caption: ["", Validators.maxLength(255)]
    });
    this.evidenceFile = signal(null);
    this.streamForm = this.fb.group({
      stream_url: ["", [Validators.required, Validators.maxLength(500)]]
    });
    this.rounds = computed(() => {
      const t = this.tournament();
      if (!t)
        return [];
      const matches = t?.bracket?.matches ?? t?.matches ?? [];
      if (!matches.length)
        return [];
      const format = t.format ?? "single_elimination";
      const map2 = /* @__PURE__ */ new Map();
      for (const m of matches) {
        const key = `${m.bracket_section ?? "winners"}::${m.round_number}`;
        if (!map2.has(key))
          map2.set(key, []);
        map2.get(key).push(m);
      }
      const MATCH_H = 88;
      const GAP = 20;
      const sorted = [...map2.entries()].sort((a, b) => {
        const [secA, rA] = a[0].split("::");
        const [secB, rB] = b[0].split("::");
        const secOrder = { winners: 0, swiss: 0, round_robin: 0, losers: 1, grand_final: 2 };
        const sO = (secOrder[secA] ?? 0) - (secOrder[secB] ?? 0);
        return sO !== 0 ? sO : parseInt(rA) - parseInt(rB);
      });
      const sectionRoundIdx = /* @__PURE__ */ new Map();
      return sorted.map(([key, ms]) => {
        const [section, rn] = key.split("::");
        const roundNum = parseInt(rn);
        const sectionIdx = sectionRoundIdx.get(section) ?? 0;
        sectionRoundIdx.set(section, sectionIdx + 1);
        let slotHeight;
        if (format === "single_elimination" || format === "double_elimination" && section === "winners") {
          slotHeight = (MATCH_H + GAP) * Math.pow(2, sectionIdx) - GAP;
        } else {
          slotHeight = MATCH_H;
        }
        const totalRounds = t?.bracket?.total_rounds ?? sorted.length;
        return {
          num: roundNum,
          label: this.roundLabel(section, roundNum, totalRounds, format),
          section,
          matches: ms.sort((a, b) => a.match_number - b.match_number),
          slotHeight
        };
      });
    });
    this.leaderboard = computed(() => {
      const t = this.tournament();
      if (!t?.participants?.length)
        return [];
      return [...t.participants].sort((a, b) => b.wins - a.wins || b.points - a.points || a.losses - b.losses).map((p, i) => ({
        rank: i + 1,
        name: p.name ?? "\u2014",
        display_name: p.display_name ?? p.name ?? "\u2014",
        avatar_url: p.avatar_url ?? null,
        seed: p.seed,
        wins: p.wins ?? 0,
        losses: p.losses ?? 0,
        points: p.points ?? 0,
        buchholz: p.buchholz ?? 0
      }));
    });
    this.isFlatFormat = computed(() => {
      const fmt = this.tournament()?.format ?? "";
      return fmt === "swiss" || fmt === "round_robin";
    });
    this.clearChampion = computed(() => {
      const lb = this.leaderboard();
      if (lb.length < 2)
        return null;
      const t = this.tournament();
      if (t?.status !== "completed")
        return null;
      return lb[0];
    });
    this.matchesFilter = signal("all");
    this.MATCH_BUCKETS = {
      upcoming: ["pending", "scheduled"],
      live: ["ongoing", "submitted", "disputed"],
      completed: ["completed", "walkover"]
    };
    this.matchesList = computed(() => {
      const t = this.tournament();
      const all = t?.bracket?.matches ?? t?.matches ?? [];
      const filter = this.matchesFilter();
      const allowed = filter === "all" ? null : this.MATCH_BUCKETS[filter];
      return all.filter((m) => !m.participant_a_is_bye && !m.participant_b_is_bye).filter((m) => !allowed || allowed.includes(m.status)).sort((a, b) => a.round_number - b.round_number || a.match_number - b.match_number);
    });
    this.matchCounts = computed(() => {
      const t = this.tournament();
      const all = t?.bracket?.matches ?? t?.matches ?? [];
      const real = all.filter((m) => !m.participant_a_is_bye && !m.participant_b_is_bye);
      const inBucket = (bucket) => real.filter((m) => bucket.includes(m.status)).length;
      return {
        all: real.length,
        upcoming: inBucket(this.MATCH_BUCKETS.upcoming),
        live: inBucket(this.MATCH_BUCKETS.live),
        completed: inBucket(this.MATCH_BUCKETS.completed)
      };
    });
    this.STARTING_SOON_MS = 2 * 60 * 60 * 1e3;
    this.liveStreams = computed(() => {
      const t = this.tournament();
      const all = t?.bracket?.matches ?? t?.matches ?? [];
      return all.filter((m) => !m.participant_a_is_bye && !m.participant_b_is_bye).filter((m) => !!m.stream_url).sort((a, b) => {
        const oa = this.categoryRank(a);
        const ob = this.categoryRank(b);
        if (oa !== ob)
          return oa - ob;
        if (oa === 3) {
          const ta2 = this.completionTime(a);
          const tb2 = this.completionTime(b);
          return tb2 - ta2;
        }
        const ta = a.scheduled_at ? new Date(a.scheduled_at).getTime() : 0;
        const tb = b.scheduled_at ? new Date(b.scheduled_at).getTime() : 0;
        return ta - tb;
      });
    });
    this.liveStreamsCount = computed(() => this.liveStreams().length);
    this.trulyLiveCount = computed(() => this.liveStreams().filter((m) => this.streamCategory(m) === "live").length);
    this.isOrganizerOrAdmin = computed(() => {
      const role = this.auth.currentUser()?.role ?? "";
      return role === "organizer" || role === "admin";
    });
    this.canManageMatch = computed(() => {
      const t = this.tournament();
      const u = this.auth.currentUser();
      if (!u)
        return false;
      if (u.role === "admin")
        return true;
      const organizerId = t?.organizer_id ?? t?.organizer?.id;
      return organizerId !== void 0 && String(organizerId) === String(u.id);
    });
    this.currentUserIsParticipant = computed(() => {
      const m = this.selectedMatch();
      const u = this.auth.currentUser();
      if (!m || !u)
        return false;
      const t = this.tournament();
      const parts = t?.participants ?? [];
      const myP = parts.find((p) => String(p.user_id) === String(u.id));
      if (!myP)
        return false;
      return myP.id === m.participant_a?.id || myP.id === m.participant_b?.id;
    });
    this.pendingRescheduleAwaitingMe = computed(() => {
      const reqs = this.rescheduleRequests();
      const u = this.auth.currentUser();
      if (!u || !reqs.length)
        return null;
      return reqs.find((r) => r.is_pending && r.requested_by.id !== String(u.id)) ?? null;
    });
    this.myPendingReschedule = computed(() => {
      const reqs = this.rescheduleRequests();
      const u = this.auth.currentUser();
      if (!u || !reqs.length)
        return null;
      return reqs.find((r) => r.is_pending && r.requested_by.id === String(u.id)) ?? null;
    });
    this.streamInfo = signal(null);
    this.streamKey = signal(null);
    this.keyHidden = signal(true);
    this.keyCopied = signal(false);
    this.setupPlatform = signal("ps5");
    this.tournamentBanner = signal(null);
    this.linkCopied = signal(false);
    this.unregistering = signal(false);
    this.showEditModal = signal(false);
    this.savingEdit = signal(false);
    this.showDeleteConfirm = signal(false);
    this.deleting = signal(false);
    this.editForm = this.fb.group({ name: [""], description: [""], starts_at: [""], max_participants: [null] });
    this.shuffling = signal(false);
    this.predictionsMode = signal(false);
    this.predictionsSaved = signal(false);
    this.submittingPred = signal(false);
    this.showPredictionLb = signal(false);
    this.predictionLb = signal([]);
    this.showSubModal = signal(false);
    this.subParticipant = signal(null);
    this.subUserId = signal("");
    this.subDisplayName = signal("");
    this.substituting = signal(false);
    this.selectedRound = signal(1);
    this.playerSearch = signal("");
    this.evidencePreview = signal(null);
    this._preds = {};
    this.myParticipantId = computed(() => {
      const t = this.tournament();
      const u = this.auth.currentUser();
      if (!t || !u)
        return null;
      const myP = (t.participants ?? []).find((p) => String(p.user_id) === String(u.id));
      return myP?.id ?? null;
    });
    this.hasMyMatch = computed(() => {
      const t = this.tournament();
      const u = this.auth.currentUser();
      if (!t || !u || !t.is_registered)
        return false;
      const parts = t.participants ?? [];
      const myP = parts.find((p) => String(p.user_id) === String(u.id));
      if (!myP)
        return false;
      const all = t?.bracket?.matches ?? t?.matches ?? [];
      return all.some((m) => !m.participant_a_is_bye && !m.participant_b_is_bye && (m.participant_a?.id === myP.id || m.participant_b?.id === myP.id));
    });
  }
  /** Open the prize editor modal pre-populated from current normalizedPrizes. */
  openPrizeEditor() {
    const prizes = this.normalizedPrizes();
    this.prizeForm.reset({
      prize_1: prizes.find((p) => p.position === 1)?.reward ?? "",
      prize_2: prizes.find((p) => p.position === 2)?.reward ?? "",
      prize_3: prizes.find((p) => p.position === 3)?.reward ?? ""
    });
    this.showPrizeEditor.set(true);
  }
  /** Save prizes via PUT /tournaments/{id}. */
  savePrizes() {
    const v = this.prizeForm.value;
    const pool = [];
    if (v.prize_1?.trim())
      pool.push({ position: 1, reward: v.prize_1.trim() });
    if (v.prize_2?.trim())
      pool.push({ position: 2, reward: v.prize_2.trim() });
    if (v.prize_3?.trim())
      pool.push({ position: 3, reward: v.prize_3.trim() });
    this.savingPrizes.set(true);
    this.api.updateTournament(this.tournament()?.id, {
      prize_pool: pool.length ? pool : null
    }).subscribe({
      next: (res) => {
        const current = this.tournament();
        this.tournament.set(__spreadProps(__spreadValues({}, current), { prize_pool: pool.length ? pool : null }));
        this.savingPrizes.set(false);
        this.showPrizeEditor.set(false);
        this.toast.success("Prizes saved.");
      },
      error: (err) => {
        this.savingPrizes.set(false);
        this.toast.error(err.error?.message ?? "Failed to save prizes.");
      }
    });
  }
  /**
   * Category rank for sorting. Lower = appears first in the list.
   * Tied with streamCategory() string output below.
   */
  categoryRank(m) {
    const cat = this.streamCategory(m);
    switch (cat) {
      case "live":
        return 0;
      case "starting":
        return 1;
      case "scheduled":
        return 2;
      case "replay":
        return 3;
      default:
        return 4;
    }
  }
  /** Best-available "when did this match end" timestamp for replay sort. */
  completionTime(m) {
    return m.scheduled_at ? new Date(m.scheduled_at).getTime() : 0;
  }
  /**
   * Public categoriser used by the template to pick a status badge.
   *
   *   live       — match is in flight (ongoing/submitted/disputed)
   *   starting   — scheduled and within the next 2 hours
   *   scheduled  — scheduled but more than 2 hours away
   *   replay     — match has completed; embed shows the VOD or channel
   *   pending    — has a stream URL but no schedule and not in flight
   */
  streamCategory(m) {
    if (m.status === "ongoing" || m.status === "submitted" || m.status === "disputed") {
      return "live";
    }
    if (m.status === "completed" || m.status === "walkover") {
      return "replay";
    }
    if (m.scheduled_at) {
      const ts = new Date(m.scheduled_at).getTime();
      if (!Number.isNaN(ts)) {
        const delta = ts - Date.now();
        if (delta >= 0 && delta <= this.STARTING_SOON_MS)
          return "starting";
        return "scheduled";
      }
    }
    return "pending";
  }
  /** Human label for the badge on each card. */
  streamCategoryLabel(m) {
    switch (this.streamCategory(m)) {
      case "live":
        return "Live";
      case "starting":
        return "Starting Soon";
      case "scheduled":
        return "Scheduled";
      case "replay":
        return "Replay";
      default:
        return "Stream";
    }
  }
  /**
   * Build a per-stream display title for accessibility & overlay text.
   * Shows participant display names so spectators know who's playing.
   */
  liveStreamTitle(m) {
    const a = m.participant_a?.display_name ?? m.participant_a?.name ?? "TBD";
    const b = m.participant_b?.display_name ?? m.participant_b?.name ?? "TBD";
    return `Match #${m.match_number}: ${a} vs ${b}`;
  }
  loadStreamInfo() {
    const t = this.tournament();
    if (!t)
      return;
    if (t.youtube_stream_url) {
      this.streamInfo.set({ has_stream: true, stream_status: t.youtube_stream_status ?? "pending", watch_url: t.youtube_stream_url });
      if (this.canManageMatch() && t.youtube_broadcast_id) {
        this.api.getStreamKey(t.youtube_broadcast_id).subscribe({
          next: (sk) => {
            const c = sk?.data ?? sk;
            if (c?.stream_key)
              this.streamKey.set(c.stream_key);
          },
          error: () => {
          }
        });
      }
    } else {
      this.streamInfo.set(null);
    }
  }
  copyStreamKey() {
    const k = this.streamKey();
    if (!k)
      return;
    navigator.clipboard.writeText(k).then(() => {
      this.keyCopied.set(true);
      setTimeout(() => this.keyCopied.set(false), 2500);
    });
  }
  loadTournamentBanner(id) {
    this.api.getAdPlacementsForTournament(id).subscribe({ next: (r) => this.tournamentBanner.set((r?.data ?? [])[0] ?? null), error: () => {
    } });
  }
  gameArtUrl(game) {
    const m = { ea_fc_25: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80", pubg_mobile: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80", cod_mobile: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400&q=80" };
    return m[game?.toLowerCase().replace(/\s+/g, "_")] ?? "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80";
  }
  shareLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.linkCopied.set(true);
      setTimeout(() => this.linkCopied.set(false), 2500);
    });
  }
  unregister() {
    const t = this.tournament();
    if (!t)
      return;
    this.tournament.update((cur) => cur ? __spreadProps(__spreadValues({}, cur), {
      is_registered: false,
      participant_count: Math.max(0, (cur.participant_count ?? 1) - 1)
    }) : cur);
    this.unregistering.set(true);
    this.api.unregisterFromTournament(t.id).subscribe({
      next: () => {
        this.unregistering.set(false);
        this.refresh();
      },
      error: () => {
        this.tournament.update((cur) => cur ? __spreadProps(__spreadValues({}, cur), {
          is_registered: true,
          participant_count: (cur.participant_count ?? 0) + 1
        }) : cur);
        this.unregistering.set(false);
      }
    });
  }
  openEditModal() {
    this.showEditModal.set(true);
  }
  saveEdit() {
    const t = this.tournament();
    if (!t)
      return;
    this.savingEdit.set(true);
    this.api.updateTournament(t.id, this.editForm.value).subscribe({ next: () => {
      this.savingEdit.set(false);
      this.showEditModal.set(false);
      this.refresh();
    }, error: () => this.savingEdit.set(false) });
  }
  deleteTournament() {
    const t = this.tournament();
    if (!t)
      return;
    this.deleting.set(true);
    this.api.deleteTournament(t.id).subscribe({ next: () => {
      this.deleting.set(false);
      this.router.navigate(["/tournaments"]);
    }, error: () => this.deleting.set(false) });
  }
  shuffleSeeds() {
    const t = this.tournament();
    if (!t)
      return;
    this.shuffling.set(true);
    this.api.shuffleTournamentSeeds(t.id).subscribe({ next: () => {
      this.shuffling.set(false);
      this.refresh();
    }, error: () => this.shuffling.set(false) });
  }
  togglePredictionsMode() {
    this.predictionsMode.update((v) => !v);
  }
  hasPrediction(id) {
    return this._preds[id] ?? null;
  }
  countPredictions() {
    return Object.keys(this._preds).length;
  }
  pickA(m, e) {
    e.stopPropagation();
    if (m.participant_a_id)
      this._preds[m.id] = m.participant_a_id;
  }
  pickB(m, e) {
    e.stopPropagation();
    if (m.participant_b_id)
      this._preds[m.id] = m.participant_b_id;
  }
  clickMatch(m, e) {
    if (!this.predictionsMode())
      this.openMatch(m);
  }
  saveAllPredictions() {
    const t = this.tournament();
    if (!t || !Object.keys(this._preds).length)
      return;
    this.submittingPred.set(true);
    const p = Object.entries(this._preds).map(([match_id, participant_id]) => ({ match_id, participant_id }));
    this.api.saveBracketPredictions(t.id, p).subscribe({ next: () => {
      this.submittingPred.set(false);
      this.predictionsSaved.set(true);
      setTimeout(() => this.predictionsSaved.set(false), 3e3);
    }, error: () => this.submittingPred.set(false) });
  }
  loadPredictionLeaderboard() {
    const t = this.tournament();
    if (!t)
      return;
    this.showPredictionLb.set(true);
    this.api.getPredictionLeaderboard(t.id).subscribe({ next: (r) => this.predictionLb.set(r.data ?? []), error: () => {
    } });
  }
  openSubModal(p) {
    this.subParticipant.set(p);
    this.subUserId.set("");
    this.subDisplayName.set("");
    this.showSubModal.set(true);
  }
  confirmSub() {
    const t = this.tournament();
    const p = this.subParticipant();
    if (!t || !p)
      return;
    this.substituting.set(true);
    this.api.substituteParticipant(t.id, p.id, { new_user_id: this.subUserId(), new_display_name: this.subDisplayName() }).subscribe({ next: () => {
      this.substituting.set(false);
      this.showSubModal.set(false);
      this.refresh();
    }, error: () => this.substituting.set(false) });
  }
  isRoundFormat() {
    const f = this.tournament()?.format;
    return f === "swiss" || f === "round_robin";
  }
  roundStats() {
    const b = this.tournament()?.bracket;
    if (!b?.rounds)
      return [];
    return b.rounds.map((r) => ({ num: r.round_number, total: r.matches?.length ?? 0, completed: r.matches?.filter((m) => m.status === "completed").length ?? 0 }));
  }
  selectRound(n) {
    this.selectedRound.set(n);
  }
  currentRoundMatches() {
    const b = this.tournament()?.bracket;
    if (!b?.rounds)
      return [];
    return b.rounds.find((r) => r.round_number === this.selectedRound())?.matches ?? [];
  }
  jumpToMyMatch() {
    document.querySelector("[data-my-match]")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  filteredLeaderboard() {
    const s = this.playerSearch().toLowerCase();
    const lb = this.leaderboard();
    return s ? lb.filter((p) => (p.display_name ?? p.name ?? "").toLowerCase().includes(s)) : lb;
  }
  clearEvidence() {
    this.evidencePreview.set(null);
  }
  onEvidenceSelected(e) {
    const f = e.target?.files?.[0];
    if (!f)
      return;
    const r = new FileReader();
    r.onload = (ev) => this.evidencePreview.set(ev.target?.result);
    r.readAsDataURL(f);
  }
  /**
   * Resolve the current user's PARTICIPANT id for this tournament.
   * The BracketMatch participant objects don't carry user_id, so we map
   * user → participant via the tournament.participants list (same approach
   * as currentUserIsParticipant). Returns null if the user isn't entered.
   */
  myParticipantIdFor(m) {
    const u = this.auth.currentUser();
    if (!u)
      return null;
    const parts = this.tournament()?.participants ?? [];
    const myP = parts.find((p) => String(p.user_id) === String(u.id));
    if (!myP)
      return null;
    return myP.id === m?.participant_a?.id || myP.id === m?.participant_b?.id ? String(myP.id) : null;
  }
  canSubmitResult(m) {
    if (!m || m.status === "completed" || m.status === "walkover")
      return false;
    if (!m.participant_a?.id || !m.participant_b?.id)
      return false;
    return this.myParticipantIdFor(m) !== null;
  }
  canConfirmResult(m) {
    if (!m || m.status !== "pending")
      return false;
    const myPid = this.myParticipantIdFor(m);
    if (!myPid)
      return false;
    const sub = String(m.submitted_by_participant_id ?? m.submitted_by_id ?? m.submitted_by?.id ?? "");
    return sub !== myPid && sub !== String(this.auth.currentUser()?.id ?? "");
  }
  disputeResult() {
    const m = this.selectedMatch();
    if (!m)
      return;
    const reason = this.disputeForm?.value?.reason ?? "";
    this.api.disputeResult(m.id, reason).subscribe({ next: () => {
      this.toast.success("Dispute raised.");
      this.closeModal();
      this.refresh();
    }, error: (e) => this.toast.error(e?.error?.message ?? "Failed.") });
  }
  // ── Lifecycle ────────────────────────────────────────────────────────
  ngOnInit() {
    this.route.paramMap.pipe(switchMap((p) => {
      this.loading.set(true);
      this.error.set(null);
      this.tournament.set(null);
      return this.api.getTournament(p.get("id"));
    })).subscribe({
      next: (res) => {
        const t = res.data ?? res;
        this.tournament.set(t);
        this.loading.set(false);
        this.loadStreamInfo();
        if (t?.id) {
          this.loadTournamentBanner(t.id);
        }
        if (t?.brand) {
          this.brand.apply(t.brand);
        }
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? "Failed to load tournament.");
        this.loading.set(false);
      }
    });
  }
  ngOnDestroy() {
    this.brand.reset();
  }
  // ── Registration / bracket ───────────────────────────────────────────
  register() {
    if (!this.auth.isLoggedIn()) {
      this.toast.info("Sign in to register.");
      return;
    }
    const t = this.tournament();
    if (t?.has_rules && !this.acceptedRules()) {
      this.showRegisterModal.set(true);
      return;
    }
    this.doRegister(this.acceptedRules());
  }
  /** User clicked Confirm & Register in the rules-acceptance modal. */
  confirmRegisterWithRules() {
    if (!this.acceptedRules()) {
      this.toast.warning("You must accept the rules to register.");
      return;
    }
    this.showRegisterModal.set(false);
    this.doRegister(true);
  }
  doRegister(acceptedRules) {
    this.tournament.update((cur) => cur ? __spreadProps(__spreadValues({}, cur), {
      is_registered: true,
      participant_count: (cur.participant_count ?? 0) + 1
    }) : cur);
    this.registering.set(true);
    this.api.registerForTournamentWithRules(this.tournament()?.id, acceptedRules).subscribe({
      next: () => {
        this.registering.set(false);
        this.toast.success("Registered!");
        this.refresh();
      },
      error: (err) => {
        this.tournament.update((cur) => cur ? __spreadProps(__spreadValues({}, cur), {
          is_registered: false,
          participant_count: Math.max(0, (cur.participant_count ?? 1) - 1)
        }) : cur);
        this.toast.error(err.error?.message ?? "Failed.");
        this.registering.set(false);
      }
    });
  }
  generateBracket() {
    this.generating.set(true);
    this.api.generateBracket(this.tournament()?.id).subscribe({
      next: () => {
        this.refresh();
        this.generating.set(false);
        this.toast.success("Bracket generated!");
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? "Failed.");
        this.generating.set(false);
      }
    });
  }
  /**
   * Whether a match cell should respond to clicks.
   *
   * Active statuses (pending/scheduled/ongoing/submitted/disputed) open the
   * modal in editable mode for participants and organizers. Completed and
   * walkover matches also open the modal but in a read-only view — the
   * action forms inside (schedule editor, result form, dispute form) are
   * already gated by their own m.status checks, so the same modal naturally
   * presents as a read-only result panel for finished matches.
   *
   * BYE-only slots (no participant_b yet awaiting an opponent) stay
   * non-clickable since there's nothing to view.
   */
  matchIsClickable(m) {
    return ["pending", "scheduled", "ongoing", "submitted", "disputed", "completed", "walkover"].includes(m.status) && !!m.participant_a && !!m.participant_b;
  }
  openMatch(m) {
    if (!this.matchIsClickable(m))
      return;
    this.selectedMatch.set(m);
    this.disputeMode.set(false);
    this.showScheduleEditor.set(false);
    this.showRescheduleForm.set(false);
    this.showStreamEditor.set(false);
    this.evidenceFile.set(null);
    this.resultForm.reset({ winner_participant_id: "", score_a: null, score_b: null });
    this.disputeForm.reset();
    this.scheduleForm.reset({ scheduled_at: this.toLocalIso(m.scheduled_at) });
    this.rescheduleForm.reset({ proposed_at: "", reason: "" });
    this.evidenceForm.reset();
    this.streamForm.reset({ stream_url: m.stream_url ?? "" });
    this.loadMatchDetails(m.id);
  }
  closeModal() {
    this.selectedMatch.set(null);
    this.rescheduleRequests.set([]);
    this.evidenceList.set([]);
  }
  getWinnerName(m) {
    if (!m.winner_id)
      return "N/A";
    if (m.participant_a?.id === m.winner_id)
      return m.participant_a?.name ?? "N/A";
    if (m.participant_b?.id === m.winner_id)
      return m.participant_b?.name ?? "N/A";
    return "N/A";
  }
  // ── Result lifecycle (Sprint 1) ──────────────────────────────────────
  submitResult() {
    if (this.resultForm.invalid) {
      this.resultForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const v = this.resultForm.value;
    const body = { winner_participant_id: v.winner_participant_id };
    if (v.score_a != null)
      body.score_a = v.score_a;
    if (v.score_b != null)
      body.score_b = v.score_b;
    this.api.submitResult(this.tournament().id, this.selectedMatch().id, body).subscribe({
      next: () => {
        this.submitting.set(false);
        this.toast.success("Result submitted!");
        this.closeModal();
        this.refresh();
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? "Failed.");
        this.submitting.set(false);
      }
    });
  }
  confirmResult() {
    this.submitting.set(true);
    this.api.confirmResult(this.selectedMatch().id).subscribe({
      next: () => {
        this.submitting.set(false);
        this.toast.success("Confirmed!");
        this.closeModal();
        this.refresh();
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? "Failed.");
        this.submitting.set(false);
      }
    });
  }
  submitDispute() {
    if (this.disputeForm.invalid)
      return;
    this.submitting.set(true);
    this.api.disputeResult(this.selectedMatch().id, this.disputeForm.value.reason).subscribe({
      next: () => {
        this.submitting.set(false);
        this.toast.warning("Dispute submitted.");
        this.closeModal();
      },
      error: (err) => {
        this.toast.error(err.error?.message ?? "Failed.");
        this.submitting.set(false);
      }
    });
  }
  // ═══════════════════════════════════════════════════════════════════
  // SPRINT 2: SCHEDULE HANDLERS
  // ═══════════════════════════════════════════════════════════════════
  /**
   * Loads all reschedule requests and evidence for a match. Called when
   * the modal opens.
   */
  loadMatchDetails(matchId) {
    this.loadingMatchDetails.set(true);
    this.api.listReschedules(matchId).subscribe({
      next: (res) => this.rescheduleRequests.set(res.data),
      error: () => this.rescheduleRequests.set([])
    });
    this.api.listEvidence(matchId).subscribe({
      next: (res) => {
        this.evidenceList.set(res.data);
        this.loadingMatchDetails.set(false);
      },
      error: () => {
        this.evidenceList.set([]);
        this.loadingMatchDetails.set(false);
      }
    });
  }
  toggleScheduleEditor() {
    const m = this.selectedMatch();
    if (!m)
      return;
    this.scheduleForm.reset({ scheduled_at: this.toLocalIso(m.scheduled_at) });
    this.showScheduleEditor.update((v) => !v);
  }
  /** Organizer saves a direct schedule change. */
  saveSchedule() {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    const m = this.selectedMatch();
    if (!m)
      return;
    const iso = this.fromLocalIso(this.scheduleForm.value.scheduled_at);
    this.submitting.set(true);
    this.api.scheduleMatch(m.id, iso).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.toast.success("Schedule updated.");
        this.showScheduleEditor.set(false);
        this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), {
          scheduled_at: res.data?.scheduled_at ?? iso,
          status: res.data?.status ?? curr.status
        }) : curr);
        this.refresh();
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? "Failed to update schedule.");
      }
    });
  }
  // ── Stream editor (Sprint: live streaming Option A) ────────────────────
  //
  // The stream URL is a Twitch or YouTube URL. Server-side validation is
  // authoritative; the frontend just submits and reflects the response.
  //
  // ACL surfaces in canModifyStream(): organizers/admins always allowed,
  // and either of the two participants can also set/clear (it's their
  // match). Other viewers see the embed read-only.
  /** Permission gate for the editor + edit buttons. */
  canModifyStream() {
    return this.canManageMatch() || this.currentUserIsParticipant();
  }
  toggleStreamEditor() {
    const m = this.selectedMatch();
    if (!m)
      return;
    this.streamForm.reset({ stream_url: m.stream_url ?? "" });
    this.showStreamEditor.update((v) => !v);
  }
  /**
   * Save the stream URL. The server normalises (canonicalises) the URL,
   * so we update the local match with the SERVER's stored value rather
   * than the raw input — keeps the embed in sync with what's persisted.
   */
  saveStream() {
    if (this.streamForm.invalid) {
      this.streamForm.markAllAsTouched();
      return;
    }
    const m = this.selectedMatch();
    if (!m)
      return;
    const url = (this.streamForm.value.stream_url ?? "").trim();
    if (!url)
      return;
    this.savingStream.set(true);
    this.api.setMatchStream(m.id, url).subscribe({
      next: (res) => {
        this.savingStream.set(false);
        this.toast.success("Stream URL saved.");
        this.showStreamEditor.set(false);
        const canonical = res.data?.stream?.canonical_url ?? url;
        this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), { stream_url: canonical }) : curr);
        this.refresh();
      },
      error: (err) => {
        this.savingStream.set(false);
        this.toast.error(err.error?.message ?? "Invalid stream URL.");
      }
    });
  }
  /** Remove the stream URL — embed disappears, editor stays available. */
  removeStream() {
    const m = this.selectedMatch();
    if (!m)
      return;
    this.savingStream.set(true);
    this.api.clearMatchStream(m.id).subscribe({
      next: () => {
        this.savingStream.set(false);
        this.toast.success("Stream removed.");
        this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), { stream_url: null }) : curr);
        this.streamForm.reset({ stream_url: "" });
        this.refresh();
      },
      error: (err) => {
        this.savingStream.set(false);
        this.toast.error(err.error?.message ?? "Failed to remove stream.");
      }
    });
  }
  /**
   * Sync local state when the Dawri-managed broadcast (Option B) component
   * reports a change. The backend mirrors the watch URL into
   * tournament_matches.stream_url on create, and nulls it on cancel — so
   * the local signal needs to match.
   *
   * Accepts the BracketMatch the modal is currently bound to so we don't
   * accidentally update state for a stale selection.
   */
  onBroadcastChanged(broadcast, m) {
    const current = this.selectedMatch();
    if (!current || current.id !== m.id)
      return;
    if (broadcast === null) {
      this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), { stream_url: null }) : curr);
    } else if (broadcast.watch_url && !broadcast.is_terminal) {
      this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), { stream_url: broadcast.watch_url }) : curr);
    }
  }
  toggleRescheduleForm() {
    this.rescheduleForm.reset({ proposed_at: "", reason: "" });
    this.showRescheduleForm.update((v) => !v);
  }
  /** Player proposes a new time — opponent must accept (or organizer overrides). */
  requestReschedule() {
    if (this.rescheduleForm.invalid) {
      this.rescheduleForm.markAllAsTouched();
      return;
    }
    const m = this.selectedMatch();
    if (!m)
      return;
    const iso = this.fromLocalIso(this.rescheduleForm.value.proposed_at);
    this.submitting.set(true);
    this.api.requestReschedule(m.id, iso, this.rescheduleForm.value.reason || void 0).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.toast.success("Reschedule request sent.");
        this.showRescheduleForm.set(false);
        this.rescheduleRequests.update((list) => [res.data, ...list]);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? "Failed to request reschedule.");
      }
    });
  }
  respondToReschedule(req, accept) {
    const m = this.selectedMatch();
    if (!m)
      return;
    this.submitting.set(true);
    this.api.respondReschedule(m.id, req.id, accept ? "accept" : "reject").subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.toast.success(accept ? "Reschedule accepted." : "Reschedule rejected.");
        this.rescheduleRequests.update((list) => list.map((r) => r.id === req.id ? res.data : r));
        if (accept) {
          this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), { scheduled_at: req.proposed_at }) : curr);
          this.refresh();
        }
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? "Failed to respond.");
      }
    });
  }
  /** Organizer/admin forces acceptance (or rejection) without opponent consent. */
  organizerOverride(req, accept) {
    const m = this.selectedMatch();
    if (!m)
      return;
    this.submitting.set(true);
    this.api.respondReschedule(m.id, req.id, accept ? "accept" : "reject", true).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.toast.success("Request overridden.");
        this.rescheduleRequests.update((list) => list.map((r) => r.id === req.id ? res.data : r));
        if (accept) {
          this.selectedMatch.update((curr) => curr ? __spreadProps(__spreadValues({}, curr), { scheduled_at: req.proposed_at }) : curr);
          this.refresh();
        }
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? "Failed to override.");
      }
    });
  }
  /**
   * Template-side alias for organizerOverride(). The bracket template
   * was authored expecting this longer name; keeping a thin alias avoids
   * touching the template while satisfying its bindings.
   */
  organizerOverrideReschedule(req, accept) {
    this.organizerOverride(req, accept);
  }
  /**
   * Combined prize total as a display string, or null when prizes are
   * non-numeric or mixed-currency. Template falls through to the
   * "Multiple Tiers" branch when this returns null.
   *
   * Edge cases:
   *   - Empty prize_pool → null
   *   - Any reward without a parseable number ("iPhone 15") → null
   *   - Mixed currencies → null (companion method returns null too)
   */
  totalPrizeDisplay() {
    const prizes = this.normalizedPrizes();
    if (prizes.length === 0)
      return null;
    let sum = 0;
    for (const p of prizes) {
      const match = p.reward.replace(/,/g, "").match(/[\d.]+/);
      if (!match)
        return null;
      const n = parseFloat(match[0]);
      if (!isFinite(n))
        return null;
      sum += n;
    }
    return sum > 0 ? sum.toLocaleString() : null;
  }
  /**
   * Currency code detected across rewards, or null if no currency is
   * present or rewards use mixed currencies. Recognises SAR / USD / EUR /
   * GBP plus their symbols (ر.س, ﷼, $, €, £).
   */
  totalPrizeCurrency() {
    const prizes = this.normalizedPrizes();
    if (prizes.length === 0)
      return null;
    const currencies = /* @__PURE__ */ new Set();
    for (const p of prizes) {
      const m = p.reward.match(/SAR|USD|EUR|GBP|ر\.س|﷼|\$|€|£/i);
      if (m) {
        const raw = m[0].toUpperCase();
        const normalised = raw === "\u0631.\u0633" || raw === "\uFDFC" ? "SAR" : raw;
        currencies.add(normalised);
      }
    }
    return currencies.size === 1 ? Array.from(currencies)[0] : null;
  }
  cancelMyReschedule(req) {
    const m = this.selectedMatch();
    if (!m)
      return;
    this.api.cancelReschedule(m.id, req.id).subscribe({
      next: () => {
        this.toast.info("Request cancelled.");
        this.rescheduleRequests.update((list) => list.map((r) => r.id === req.id ? __spreadProps(__spreadValues({}, r), { status: "cancelled", is_pending: false }) : r));
      },
      error: (err) => this.toast.error(err.error?.message ?? "Failed to cancel.")
    });
  }
  // ═══════════════════════════════════════════════════════════════════
  // SPRINT 2: EVIDENCE HANDLERS
  // ═══════════════════════════════════════════════════════════════════
  onEvidenceFileSelected(event) {
    const input2 = event.target;
    const file = input2.files?.[0] ?? null;
    this.evidenceFile.set(file);
  }
  uploadEvidence() {
    const m = this.selectedMatch();
    const file = this.evidenceFile();
    if (!m || !file) {
      this.toast.info("Choose a file first.");
      return;
    }
    this.uploadingEvidence.set(true);
    this.api.uploadEvidence(m.id, file, this.evidenceForm.value.caption || void 0).subscribe({
      next: (res) => {
        this.uploadingEvidence.set(false);
        this.toast.success("Evidence uploaded.");
        this.evidenceList.update((list) => [res.data, ...list]);
        this.evidenceFile.set(null);
        this.evidenceForm.reset();
        const input2 = document.querySelector("#evidence-file-input");
        if (input2)
          input2.value = "";
      },
      error: (err) => {
        this.uploadingEvidence.set(false);
        this.toast.error(err.error?.message ?? "Upload failed.");
      }
    });
  }
  deleteEvidence(ev) {
    const m = this.selectedMatch();
    if (!m)
      return;
    if (!confirm("Delete this evidence? This cannot be undone."))
      return;
    this.api.deleteEvidence(m.id, ev.id).subscribe({
      next: () => {
        this.toast.info("Evidence deleted.");
        this.evidenceList.update((list) => list.filter((e) => e.id !== ev.id));
      },
      error: (err) => this.toast.error(err.error?.message ?? "Delete failed.")
    });
  }
  canDeleteEvidence(ev) {
    const u = this.auth.currentUser();
    if (!u)
      return false;
    return String(ev.uploaded_by.id) === String(u.id) || this.isOrganizerOrAdmin();
  }
  // ── Utilities ────────────────────────────────────────────────────────
  statusLabel(status) {
    const map2 = {
      pending: "Pending",
      scheduled: "Scheduled",
      ongoing: "Live",
      submitted: "Awaiting confirm",
      confirmed: "Confirmed",
      disputed: "Disputed",
      completed: "Done",
      walkover: "Walkover",
      bye: "Bye"
    };
    return map2[status] ?? status;
  }
  rescheduleStatusLabel(s) {
    const map2 = {
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
      cancelled: "Cancelled",
      overridden: "Overridden"
    };
    return map2[s] ?? s;
  }
  /**
   * Convert an ISO-8601 UTC timestamp to a value suitable for an
   * <input type="datetime-local"> element (i.e. local timezone, no tz suffix,
   * "YYYY-MM-DDTHH:mm").
   */
  toLocalIso(iso) {
    if (!iso)
      return "";
    const d = new Date(iso);
    if (isNaN(d.getTime()))
      return "";
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off * 60 * 1e3);
    return local.toISOString().slice(0, 16);
  }
  /**
   * Convert a datetime-local input value (local, no tz) back to a UTC ISO
   * string the backend expects.
   */
  fromLocalIso(localVal) {
    if (!localVal)
      return "";
    return new Date(localVal).toISOString();
  }
  roundLabel(section, num, total, format) {
    if (section === "grand_final")
      return "Grand Final";
    if (section === "losers")
      return `Losers R${num}`;
    if (section === "round_robin")
      return `Round ${num}`;
    if (section === "swiss")
      return `Swiss R${num}`;
    const wbRounds = format === "double_elimination" ? Math.ceil(total / 2) : total;
    if (num === wbRounds)
      return "Final";
    if (num === wbRounds - 1)
      return "Semis";
    if (num === wbRounds - 2)
      return "Quarters";
    return `Round ${num}`;
  }
  refresh() {
    const id = this.tournament()?.id;
    if (!id)
      return;
    this.api.getTournament(id).subscribe({
      next: (res) => this.tournament.set(res.data ?? res)
    });
  }
  static {
    this.\u0275fac = function TournamentDetailComponent_Factory(t) {
      return new (t || _TournamentDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TournamentDetailComponent, selectors: [["app-tournament-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 5, consts: [[1, "detail-page"], [1, "detail-loading"], ["role", "dialog", "aria-modal", "true", 1, "modal-overlay"], [1, "skel", "skel--title"], [1, "skel", "skel--meta"], [1, "skel", "skel--bracket"], [1, "breadcrumbs"], ["routerLink", "/tournaments"], [1, "sep"], [1, "breadcrumbs__current"], [1, "hero"], ["loading", "eager", 1, "hero__cover", 3, "src", "alt"], [1, "hero__grid-bg"], [1, "hero__glow"], [1, "hero__wrap"], [1, "hero__main"], [1, "hero__eyebrow"], [1, "hero__game-tag"], [1, "live-pill"], [1, "hero__title"], ["dir", "rtl", "lang", "ar", 1, "hero__title-ar"], [1, "hero__meta-row"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "18", "height", "18", "x", "3", "y", "4", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["points", "5 3 19 12 5 21 5 3"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "hero__progress"], [1, "hero__actions"], [1, "btn", "btn--primary", "btn--lg", 3, "disabled"], [1, "registered-tag"], [1, "btn", "btn--ghost"], [1, "btn", "btn--ghost", 3, "click"], [1, "hero__side"], [1, "prize-card"], [1, "meta-card"], [1, "meta-card__cell"], [1, "meta-card__l"], [1, "meta-card__v"], [1, "rules-section", 3, "rules-section--expanded"], [3, "tournamentId"], [1, "stream-panel"], [1, "tab-bar-wrap"], ["role", "tablist", 1, "tab-bar"], ["role", "tab", 1, "tab", 3, "click"], ["role", "tab", 1, "tab", 3, "tab--active"], [1, "tab-badge"], ["role", "tab", 1, "tab", "tab--live", 3, "tab--active", "tab--actually-live"], [1, "tab-content"], [1, "dot"], [1, "open-pill"], [3, "tier"], ["points", "23 4 23 10 17 10"], ["points", "1 20 1 14 7 14"], ["d", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"], [1, "hero__progress-row"], [1, "progress-bar"], [1, "progress-fill"], [1, "btn", "btn--primary", "btn--lg", 3, "click", "disabled"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], [1, "prize-card__label"], [1, "prize-card__total"], [1, "prize-card__curr"], [1, "prize-card__list"], [1, "prize-card__row"], ["variant", "logos", 3, "tournamentId"], ["type", "button", 1, "prize-card__edit"], [1, "prize-card__total-label"], [1, "prize-card__pos"], [1, "prize-card__amt"], ["type", "button", 1, "prize-card__edit", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 2, "vertical-align", "-2px", "margin-right", "4px"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["type", "button", 1, "prize-card", "prize-card--empty", 3, "click"], [1, "prize-card__empty-text"], [1, "prize-card__empty-cta"], [1, "rules-section"], [1, "rules-section__head", 3, "click"], [1, "rules-section__icon"], [1, "rules-section__title"], [1, "rules-section__toggle"], [1, "rules-section__body"], [1, "rules-text"], [1, "rules-accepted"], [1, "stream-panel__empty"], [1, "stream-panel__label"], [1, "stream-panel__hint"], [1, "stream-panel__active"], [1, "stream-status-badge"], [1, "stream-key-section"], [1, "stream-key-label"], [1, "stream-key-wrap"], [1, "stream-key-val"], [1, "stream-key-btn", 3, "click"], [1, "stream-key-rtmp"], [1, "setup-guides"], [1, "setup-tabs-row"], [1, "setup-tab", 3, "click"], [1, "setup-guide-card"], ["target", "_blank", "rel", "noopener", 1, "stream-watch-btn", 3, "href"], [1, "setup-guide-card__head"], [1, "setup-platform-icon"], [1, "setup-platform-name"], [1, "setup-platform-sub"], [1, "setup-steps"], [1, "inline-copy", 3, "click"], [1, "setup-note"], ["href", "https://obsproject.com/download", "target", "_blank", "rel", "noopener", 1, "setup-download-btn"], ["href", "https://obsproject.com/download", "target", "_blank", "rel", "noopener", 1, "setup-link"], ["href", "https://streamlabs.com/mobile-app", "target", "_blank", "rel", "noopener", 1, "setup-download-btn"], ["href", "https://streamlabs.com/mobile-app", "target", "_blank", "rel", "noopener", 1, "setup-link"], [1, "browser-options"], [1, "browser-option"], [1, "browser-option__head"], [1, "browser-option__badge", "browser-option__badge--free"], [1, "browser-option__name"], [1, "browser-option__sub"], ["href", "https://studio.youtube.com", "target", "_blank", "rel", "noopener", 1, "setup-link"], ["href", "https://streamyard.com", "target", "_blank", "rel", "noopener", 1, "setup-download-btn"], ["href", "https://streamyard.com", "target", "_blank", "rel", "noopener", 1, "setup-link"], ["role", "tab", 1, "tab", "tab--live", 3, "click"], ["aria-hidden", "true", 1, "tab__live-dot"], [1, "empty-state"], [1, "empty-state__icon"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"], ["d", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"], ["d", "M4 22h16"], ["d", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"], ["d", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"], ["d", "M18 2H6v7a6 6 0 0 0 12 0V2Z"], [1, "bracket-toolbar"], [1, "section-eyebrow"], [1, "section-title"], [1, "bracket-toolbar__right"], ["type", "button", 1, "btn", "btn--ghost", "btn--small"], [1, "bracket-stat"], [1, "bracket-stat", "bracket-stat--mute"], [1, "champion-banner"], [1, "bracket-scroll"], [1, "bracket-tree"], [1, "b-round", 3, "class", "b-round--last"], [1, "bracket-legend"], [1, "legend-item"], [1, "legend-dot", "ld--pending"], [1, "legend-dot", "ld--submitted"], [1, "legend-dot", "ld--disputed"], [1, "legend-dot", "ld--completed"], [1, "legend-item", "legend-item--click"], ["type", "button", 1, "btn", "btn--ghost", "btn--small", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], [1, "champion-banner__trophy"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "champion-banner__body"], [1, "champion-banner__label"], [1, "champion-banner__name"], [1, "b-round"], [1, "b-round__header"], [1, "b-round__label"], [1, "b-round__matches"], [1, "b-slot", 3, "height", "--slot-h", "--delay"], [1, "b-slot"], [1, "b-match", 3, "click"], [1, "b-match__head"], [1, "b-match__num"], [1, "b-match__head-live"], [1, "b-match__p"], [1, "b-match__name"], [1, "b-match__bye"], [1, "b-match__score", 3, "b-match__score--win"], [1, "b-match__disputed-flag"], [1, "b-match__head-time"], [1, "b-match__head-status"], [1, "b-match__name-text"], [1, "b-match__avatar", 3, "src", "alt"], [1, "b-match__avatar", "b-match__avatar--placeholder"], [1, "b-match__name-text", "b-match__name-text--tbd"], [1, "b-match__score"], [1, "section-hint"], [1, "standings-table"], [1, "standings-table__num"], [3, "standings-table__row--rank-1", "standings-table__row--rank-2", "standings-table__row--rank-3"], [1, "rank"], [1, "player-cell"], [1, "player-avatar", 3, "src", "alt"], [1, "player-name"], [1, "player-seed"], [1, "stat-num"], [1, "stat-num", "stat-num--dim"], [1, "player-avatar", "player-avatar--placeholder"], ["points", "14.5 17.5 3 6 3 3 6 3 17.5 14.5"], ["x1", "13", "y1", "19", "x2", "19", "y2", "13"], ["x1", "16", "y1", "16", "x2", "20", "y2", "20"], ["x1", "19", "y1", "21", "x2", "21", "y2", "19"], ["points", "14.5 6.5 18 3 21 3 21 6 17.5 9.5"], ["x1", "5", "y1", "14", "x2", "9", "y2", "18"], ["x1", "7", "y1", "17", "x2", "4", "y2", "20"], ["x1", "3", "y1", "19", "x2", "5", "y2", "21"], ["role", "tablist", "aria-label", "Filter matches by status", 1, "match-filters"], ["type", "button", 1, "match-chip", 3, "click"], [1, "match-chip__count"], ["type", "button", 1, "match-chip", "match-chip--live", 3, "click"], [1, "matches-empty"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "list"], [1, "match-row-card", 3, "match-row-card--clickable", "class"], [1, "match-row-card", 3, "click", "keyup.enter", "keyup.space"], [1, "match-row-card__round"], [1, "match-row-card__round-num"], [1, "match-row-card__match-num"], [1, "match-row-card__vs"], [1, "match-row-card__player"], ["alt", "", 1, "match-row-card__avatar", 3, "src"], [1, "match-row-card__name"], [1, "match-row-card__score"], [1, "match-row-card__player", "match-row-card__player--right"], [1, "match-row-card__meta"], [1, "match-row-card__time"], [1, "match-row-card__status"], [1, "match-row-card__avatar", "match-row-card__avatar--placeholder"], [1, "match-row-card__score-num"], [1, "match-row-card__score-sep"], [1, "match-row-card__score-vs"], [1, "players-grid"], [1, "player-card", 3, "player-card--gold", "player-card--silver", "player-card--bronze"], [1, "player-card"], [1, "player-card__top"], [1, "player-card__avatar", 3, "src", "alt"], [1, "player-card__name"], [1, "player-card__handle"], [1, "player-card__stats"], [1, "player-card__stat-l"], [1, "player-card__stat-v"], [1, "player-card__avatar", "player-card__avatar--placeholder"], [1, "empty-state__hint"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["type", "button", 1, "btn", "btn--ghost"], [1, "prize-grid"], [1, "prize-tier", 3, "prize-tier--t1", "prize-tier--t2", "prize-tier--t3", "--delay"], [1, "prize-tier"], [1, "prize-tier__medal"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#f59e0b", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "prize-tier__pos"], [1, "prize-tier__amt"], ["cx", "12", "cy", "8", "r", "6"], ["d", "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#94a3b8", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#cd7f32", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "streams-grid"], [1, "stream-card", 3, "class"], [2, "color", "var(--live)"], [1, "stream-card"], [1, "stream-card__thumb"], ["mode", "thumbnail", 3, "streamUrl", "title"], [1, "stream-tag"], [1, "stream-card__body"], [1, "stream-card__title"], [1, "stream-card__vs"], [1, "stream-card__meta"], [1, "stream-card__row"], [1, "stream-card__status"], ["type", "button", 1, "stream-card__open", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal__head"], [1, "modal__round-label"], [1, "modal__title"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 2, "vertical-align", "-3px", "margin-right", "6px"], ["aria-label", "Close", 1, "modal__close", 3, "click"], [1, "modal__body", "prize-edit-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "form-label"], ["formControlName", "prize_1", "placeholder", "e.g. 500 SAR PSN voucher", "maxlength", "150", 1, "input"], ["formControlName", "prize_2", "placeholder", "e.g. 300 SAR", "maxlength", "150", 1, "input"], ["formControlName", "prize_3", "placeholder", "e.g. 150 SAR", "maxlength", "150", 1, "input"], [1, "prize-edit-hint"], [1, "modal__actions"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], [1, "modal", "modal--wide", 3, "click"], [1, "modal__body"], [1, "rules-accept-box"], ["type", "checkbox", 3, "change", "checked"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "modal__vs"], [1, "modal__player"], ["alt", "", 1, "modal__avatar", 3, "src"], [1, "modal__player-info"], [1, "modal__player-name"], [1, "modal__player-score"], [1, "modal__vs-sep"], [1, "modal__player", "modal__player--right"], [1, "modal__status-strip"], [1, "modal__status-badge"], [1, "m-section"], [1, "m-section__head"], [1, "m-section__icon"], [1, "m-section__title"], ["type", "button", 1, "m-section__action"], [1, "m-section__body"], [1, "m-section__empty"], [1, "m-inline-form", "m-inline-form--stack", 3, "formGroup"], [1, "modal__avatar", "modal__avatar--placeholder"], ["type", "button", 1, "m-section__action", 3, "click"], [1, "scheduled-at"], [1, "m-inline-form", 3, "ngSubmit", "formGroup"], ["type", "datetime-local", "formControlName", "scheduled_at", 1, "input"], [1, "m-inline-form__actions"], [3, "streamUrl", "title"], [1, "stream-actions"], ["type", "button", 1, "btn", "btn--ghost", "btn--small", 3, "click", "disabled"], [1, "m-inline-form", "m-inline-form--stack", 3, "ngSubmit", "formGroup"], ["for", "stream-url-input", 1, "form-label"], [1, "req"], ["id", "stream-url-input", "type", "url", "formControlName", "stream_url", "placeholder", "https://twitch.tv/yourchannel  or  https://youtube.com/watch?v=\u2026", "inputmode", "url", "autocomplete", "off", "spellcheck", "false", 1, "input"], [1, "m-inline-form__hint"], ["type", "button", 1, "btn", "btn--ghost", 3, "click", "disabled"], [3, "broadcastChanged", "matchId", "defaultTitle"], [1, "reschedule-card", "reschedule-card--awaiting-you"], [1, "reschedule-card", "reschedule-card--mine"], ["type", "datetime-local", "formControlName", "proposed_at", 1, "input"], ["formControlName", "reason", "rows", "2", "maxlength", "500", "placeholder", "Exam clash, travel, etc.", 1, "input"], [1, "reschedule-card__head"], [1, "reschedule-card__time"], [1, "reschedule-card__reason"], [1, "reschedule-card__actions"], [1, "btn", "btn--ghost", 3, "click", "disabled"], [1, "reschedule-card", "reschedule-card--organizer"], [1, "btn", "btn--ghost", "btn--small", 3, "click", "disabled"], [1, "btn", "btn--primary", "btn--small", 3, "click", "disabled"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "result-final"], [1, "result-form", 3, "formGroup"], [1, "result-confirm"], [1, "result-final__score"], [1, "result-final__winner"], [1, "result-form", 3, "ngSubmit", "formGroup"], [1, "result-form__lede"], [1, "result-form__scores"], [1, "result-score"], [1, "result-score__name"], ["type", "number", "min", "0", "inputmode", "numeric", "formControlName", "score_a", 1, "input", "result-score__input"], [1, "result-form__x"], ["type", "number", "min", "0", "inputmode", "numeric", "formControlName", "score_b", 1, "input", "result-score__input"], [1, "result-form__winner"], [1, "winner-opt"], ["type", "radio", "formControlName", "winner_participant_id", 3, "value"], [1, "result-confirm__lede"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "m-inline-form", "m-inline-form--stack", "result-dispute", 3, "ngSubmit", "formGroup"], ["formControlName", "reason", "rows", "2", "maxlength", "1000", "placeholder", "Explain what's wrong (min 10 characters)\u2026", 1, "input"], ["type", "submit", 1, "btn", "btn--ghost", 3, "disabled"], ["d", "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"], ["cx", "12", "cy", "13", "r", "3"], [1, "m-section__count"], [1, "evidence-upload", 3, "formGroup"], [1, "evidence-upload__file"], ["id", "evidence-file-input", "type", "file", "accept", "image/*,video/*", 3, "change"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "17 8 12 3 7 8"], ["x1", "12", "y1", "3", "x2", "12", "y2", "15"], ["formControlName", "caption", "maxlength", "255", "placeholder", "Caption (optional)", 1, "input"], ["type", "button", 1, "btn", "btn--primary", "btn--small", 3, "click", "disabled"], [1, "evidence-grid"], [1, "evidence-item"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "evidence-item__meta"], [1, "evidence-item__caption"], [1, "evidence-item__by"], ["type", "button", "aria-label", "Delete evidence", 1, "evidence-item__del"], ["loading", "lazy", 1, "evidence-item__media", 3, "src", "alt"], ["controls", "", "preload", "metadata", 1, "evidence-item__media", 3, "src"], ["type", "button", "aria-label", "Delete evidence", 1, "evidence-item__del", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]], template: function TournamentDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, TournamentDetailComponent_Conditional_1_Template, 4, 0, "div", 1)(2, TournamentDetailComponent_Conditional_2_Template, 109, 58);
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, TournamentDetailComponent_Conditional_3_Template, 37, 3, "div", 2)(4, TournamentDetailComponent_Conditional_4_Template, 22, 4, "div", 2)(5, TournamentDetailComponent_Conditional_5_Template, 57, 28, "div", 2);
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_3_0;
        let tmp_4_0;
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.loading() ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(2, (tmp_1_0 = ctx.tournament()) ? 2 : -1, tmp_1_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(3, ctx.showPrizeEditor() ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, (tmp_3_0 = ctx.showRegisterModal() && ctx.tournament()) ? 4 : -1, tmp_3_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(5, (tmp_4_0 = ctx.selectedMatch()) ? 5 : -1, tmp_4_0);
      }
    }, dependencies: [CommonModule, DecimalPipe, DatePipe, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, MinValidator, FormGroupDirective, FormControlName, TournamentSponsorsComponent, TournamentSponsorsManageComponent, StreamEmbedComponent, BroadcastControlsComponent, TierBadgeComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.detail-page[_ngcontent-%COMP%] {\n  max-width: var(--maxw, 1440px);\n  margin: 0 auto;\n  padding: 0 var(--gutter, 32px);\n}\n.detail-loading[_ngcontent-%COMP%] {\n  padding: 60px 0;\n}\n.skel[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--bg-2) 0%,\n      var(--bg-3) 50%,\n      var(--bg-2) 100%);\n  background-size: 200% 100%;\n  border-radius: 8px;\n  animation: _ngcontent-%COMP%_skel 1.4s ease-in-out infinite;\n}\n.skel--title[_ngcontent-%COMP%] {\n  height: 64px;\n  width: 60%;\n  margin-bottom: 16px;\n}\n.skel--meta[_ngcontent-%COMP%] {\n  height: 24px;\n  width: 40%;\n  margin-bottom: 24px;\n}\n.skel--bracket[_ngcontent-%COMP%] {\n  height: 360px;\n  width: 100%;\n}\n@keyframes _ngcontent-%COMP%_skel {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.breadcrumbs[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  padding: 24px 0 0;\n}\n.breadcrumbs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  transition: color 0.15s;\n}\n.breadcrumbs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--accent);\n}\n.breadcrumbs[_ngcontent-%COMP%]   .sep[_ngcontent-%COMP%] {\n  margin: 0 10px;\n  color: var(--text-mute);\n}\n.breadcrumbs__current[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 32px 0 0;\n  overflow: hidden;\n}\n.hero__cover[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center 28%;\n  opacity: 0.15;\n  z-index: 0;\n  transform: scale(1.05);\n  -webkit-mask-image:\n    linear-gradient(\n      180deg,\n      #000 30%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      180deg,\n      #000 30%,\n      transparent 100%);\n  animation: _ngcontent-%COMP%_heroCoverKen 30s ease-in-out infinite alternate;\n}\n.hero__grid-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  background-image:\n    linear-gradient(var(--line) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      var(--line) 1px,\n      transparent 1px);\n  background-size: 80px 80px;\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 80% 60% at 30% 50%,\n      #000 30%,\n      transparent 80%);\n  mask-image:\n    radial-gradient(\n      ellipse 80% 60% at 30% 50%,\n      #000 30%,\n      transparent 80%);\n  opacity: 0.4;\n  pointer-events: none;\n}\n.hero__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -100px;\n  right: -100px;\n  width: 600px;\n  height: 600px;\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.18),\n      transparent 60%);\n  filter: blur(100px);\n  pointer-events: none;\n  z-index: 0;\n  animation: _ngcontent-%COMP%_heroGlowBreathe 12s ease-in-out infinite;\n}\n.hero__wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 40px;\n  padding-bottom: 32px;\n}\n.hero__main[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.hero__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  margin-bottom: 18px;\n}\n.hero__game-tag[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.hero__title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(34px, 4.4vw, 62px);\n  line-height: 0.96;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  margin: 0 0 10px;\n  max-width: 20ch;\n}\n.hero__title-ar[_ngcontent-%COMP%] {\n  font-family: var(--arabic);\n  font-size: 19px;\n  font-weight: 700;\n  color: var(--text-dim);\n  margin-bottom: 14px;\n  direction: rtl;\n}\n.hero__meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 20px 0 22px;\n}\n.hero__meta-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 13px;\n  border-radius: 10px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text-mute);\n}\n.hero__meta-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--accent);\n  flex-shrink: 0;\n}\n.hero__meta-row[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 700;\n  font-size: 12.5px;\n  letter-spacing: 0.2px;\n  text-transform: none;\n}\n.hero__progress[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.hero__progress-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-bottom: 8px;\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text-dim);\n}\n.hero__progress-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 700;\n}\n.hero__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 24px;\n}\n.hero__side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n@media (max-width: 980px) {\n  .hero__wrap[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.live-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 4px 11px 4px 9px;\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  background: rgba(248, 113, 113, 0.08);\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--live);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.live-pill[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--live);\n  box-shadow: 0 0 8px var(--live);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.open-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 4px 11px;\n  border: 1px solid rgba(74, 222, 128, 0.35);\n  background: rgba(74, 222, 128, 0.1);\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--good);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.35;\n  }\n}\n@keyframes _ngcontent-%COMP%_heroGlowBreathe {\n  0%, 100% {\n    opacity: 0.8;\n    transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.12);\n  }\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 6px;\n  background: var(--bg-3);\n  border-radius: 100px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary) 0%,\n      var(--accent) 100%);\n  border-radius: 100px;\n  transition: width 0.4s ease;\n}\n.progress-fill[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.5) 50%,\n      transparent 100%);\n  transform: translateX(-100%);\n  animation: _ngcontent-%COMP%_progressSheen 2.4s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_progressSheen {\n  0% {\n    transform: translateX(-100%);\n  }\n  60%, 100% {\n    transform: translateX(220%);\n  }\n}\n.registered-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 12px 22px;\n  border-radius: var(--r);\n  border: 1px solid rgba(74, 222, 128, 0.4);\n  background: rgba(74, 222, 128, 0.1);\n  color: var(--good);\n  font-weight: 700;\n  font-size: 14px;\n}\n.prize-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      var(--bg-3) 0%,\n      var(--bg-2) 100%);\n  border: 1px solid var(--line-2);\n  border-radius: var(--r-lg);\n  padding: 28px 26px;\n  position: relative;\n  overflow: hidden;\n}\n.prize-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(212, 175, 55, 0.08),\n      transparent 60%);\n  pointer-events: none;\n}\n.prize-card__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin-bottom: 8px;\n}\n.prize-card__total[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 56px;\n  line-height: 1;\n  color: var(--accent);\n  letter-spacing: 0.5px;\n}\n.prize-card__total-label[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n.prize-card__curr[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 14px;\n  color: var(--text-dim);\n  margin-left: 6px;\n}\n.prize-card__list[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  border-top: 1px solid var(--line);\n  padding-top: 18px;\n}\n.prize-card__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding: 8px 0;\n  font-size: 13px;\n}\n.prize-card__row[_ngcontent-%COMP%]    + .prize-card__row[_ngcontent-%COMP%] {\n  border-top: 1px dashed var(--line);\n}\n.prize-card__pos[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n}\n.prize-card__pos.gold[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.prize-card__pos.silver[_ngcontent-%COMP%] {\n  color: #c0c0d0;\n}\n.prize-card__pos.bronze[_ngcontent-%COMP%] {\n  color: #cd7f32;\n}\n.prize-card__amt[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 16px;\n  color: var(--text);\n  letter-spacing: 0.5px;\n  text-align: right;\n  flex: 1;\n  margin-left: 12px;\n}\n.prize-card__edit[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  width: 100%;\n  padding: 10px;\n  border: 1px dashed var(--line-2);\n  border-radius: var(--r);\n  background: transparent;\n  color: var(--text-dim);\n  cursor: pointer;\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  transition: all 0.15s;\n}\n.prize-card__edit[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent);\n}\n.prize-card--empty[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-style: dashed;\n  text-align: left;\n  transition: border-color 0.15s;\n}\n.prize-card--empty[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n}\n.prize-card__empty-text[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.prize-card__empty-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--display);\n  font-size: 22px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--text);\n  margin-bottom: 4px;\n}\n.prize-card__empty-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n}\n.prize-card__empty-cta[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 8px 14px;\n  border-radius: var(--r);\n  background: var(--accent);\n  color: #1a1100;\n  font-weight: 700;\n  font-size: 12px;\n  font-family: var(--mono);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.meta-card[_ngcontent-%COMP%] {\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  padding: 16px 18px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px 22px;\n}\n.meta-card__l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin-bottom: 4px;\n}\n.meta-card__v[_ngcontent-%COMP%] {\n  font-family: var(--body);\n  font-size: 14px;\n  color: var(--text);\n  font-weight: 600;\n}\n.meta-card__v--good[_ngcontent-%COMP%] {\n  color: var(--good);\n}\n.rules-section[_ngcontent-%COMP%] {\n  margin: 24px 0;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  overflow: hidden;\n}\n.rules-section__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.rules-section__head[_ngcontent-%COMP%]:hover {\n  background: var(--bg-3);\n}\n.rules-section__icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.rules-section__title[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n}\n.rules-section__toggle[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n}\n.rules-section__body[_ngcontent-%COMP%] {\n  padding: 0 22px 22px;\n}\n.rules-section[_ngcontent-%COMP%]   .rules-text[_ngcontent-%COMP%] {\n  font-family: var(--body);\n  font-size: 14px;\n  color: var(--text-dim);\n  line-height: 1.7;\n  white-space: pre-wrap;\n  margin: 0;\n}\n.rules-section[_ngcontent-%COMP%]   .rules-accepted[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 12px 14px;\n  background: rgba(74, 222, 128, 0.08);\n  border: 1px solid rgba(74, 222, 128, 0.3);\n  border-radius: var(--r);\n  color: var(--good);\n  font-size: 13px;\n}\n.tab-bar-wrap[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 60px;\n  z-index: 40;\n  background: rgba(10, 10, 18, 0.85);\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n  border-top: 1px solid var(--line);\n  border-bottom: 1px solid var(--line);\n  margin: 32px calc(-1 * var(--gutter, 32px)) 0;\n  padding: 0 var(--gutter, 32px);\n}\n.tab-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  overflow-x: auto;\n}\n.tab[_ngcontent-%COMP%] {\n  padding: 18px 22px;\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text-dim);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  border: none;\n  background: none;\n  border-bottom: 2px solid transparent;\n  transition: color 0.15s, border-color 0.15s;\n  white-space: nowrap;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.tab[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n.tab--active[_ngcontent-%COMP%] {\n  color: var(--text);\n  border-bottom-color: var(--accent);\n}\n.tab--live.tab--actually-live[_ngcontent-%COMP%] {\n  color: var(--live);\n}\n.tab__live-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--live);\n  box-shadow: 0 0 8px var(--live);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.tab-badge[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  padding: 2px 7px;\n  background: var(--bg-3);\n  color: var(--text-dim);\n  border-radius: 100px;\n}\n.tab-badge--live[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.15);\n  color: var(--live);\n}\n.tab--active[_ngcontent-%COMP%]   .tab-badge[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #1a1100;\n  font-weight: 700;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 40px 0;\n}\n.section-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 2px;\n  color: var(--accent);\n  text-transform: uppercase;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.section-eyebrow[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 24px;\n  height: 1px;\n  background: var(--accent);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 36px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.section-hint[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  margin-top: 8px;\n  font-size: 14px;\n}\n.bracket-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.bracket-toolbar__right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.bracket-stat[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--text);\n  padding: 8px 14px;\n  border: 1px solid var(--line);\n  border-radius: 100px;\n}\n.bracket-stat--mute[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n}\n.empty-state__icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.6;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 15px;\n  margin: 0 0 8px;\n}\n.empty-state__hint[_ngcontent-%COMP%] {\n  font-size: 13px !important;\n  color: var(--text-mute) !important;\n  max-width: 420px;\n  margin: 8px auto 20px !important;\n}\n.champion-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 28px 32px;\n  margin-bottom: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(212, 175, 55, 0.15),\n      var(--bg-2) 70%);\n  border: 1px solid rgba(212, 175, 55, 0.4);\n  border-radius: var(--r-lg);\n}\n.champion-banner__trophy[_ngcontent-%COMP%] {\n  font-size: 56px;\n}\n.champion-banner__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--accent);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  margin-bottom: 6px;\n}\n.champion-banner__name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 36px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.bracket-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 12px 4px 32px;\n}\n.bracket-tree[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 36px;\n  min-width: min-content;\n}\n.b-round[_ngcontent-%COMP%] {\n  flex: 0 0 280px;\n  display: flex;\n  flex-direction: column;\n}\n.b-round__header[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n  padding-left: 4px;\n}\n.b-round__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n}\n.b-round__label--losers[_ngcontent-%COMP%] {\n  color: var(--bad);\n}\n.b-round__label--final[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.b-round__matches[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  justify-content: space-around;\n  gap: 20px;\n}\n.b-slot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.b-match[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  overflow: hidden;\n  transition: border-color 0.18s, transform 0.18s;\n}\n.b-match--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.b-match--clickable[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n  transform: translateY(-1px);\n}\n.b-match--bye[_ngcontent-%COMP%] {\n  opacity: 0.55;\n}\n.b-match--live[_ngcontent-%COMP%], .b-match--in_progress[_ngcontent-%COMP%] {\n  border-color: rgba(248, 113, 113, 0.4);\n}\n.b-match--disputed[_ngcontent-%COMP%] {\n  border-color: rgba(245, 185, 66, 0.5);\n}\n.b-match__head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 12px;\n  border-bottom: 1px solid var(--line);\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.b-match__head-live[_ngcontent-%COMP%] {\n  color: var(--live);\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.b-match__head-live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--live);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.b-match__p[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 14px;\n  font-size: 14px;\n}\n.b-match__p[_ngcontent-%COMP%]    + .b-match__p[_ngcontent-%COMP%] {\n  border-top: 1px dashed var(--line);\n}\n.b-match__p--winner[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 700;\n}\n.b-match__p--loser[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n}\n.b-match__name[_ngcontent-%COMP%] {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.b-match__name-text[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.b-match__name-text--tbd[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n  font-style: italic;\n}\n.b-match__avatar[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex: 0 0 auto;\n}\n.b-match__avatar--placeholder[_ngcontent-%COMP%] {\n  background: var(--bg-3);\n  border: 1px solid var(--line-2);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 11px;\n  color: var(--text-dim);\n}\n.b-match__bye[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--text-mute);\n}\n.b-match__score[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-weight: 700;\n  color: var(--text-dim);\n}\n.b-match__score--win[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.b-match__disputed-flag[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: rgba(245, 185, 66, 0.1);\n  border-top: 1px solid rgba(245, 185, 66, 0.3);\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--warn);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.b-round[_ngcontent-%COMP%]:not(.b-round--last)   .b-slot[_ngcontent-%COMP%] {\n  position: relative;\n  justify-content: center;\n}\n.b-round[_ngcontent-%COMP%]:not(.b-round--last)   .b-slot[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  right: -36px;\n  top: 50%;\n  transform: translateY(-0.5px);\n  width: 36px;\n  height: 1px;\n  background: rgba(255, 255, 255, 0.18);\n  pointer-events: none;\n  z-index: 3;\n}\n.b-round[_ngcontent-%COMP%]:not(.b-round--last)   .b-slot[_ngcontent-%COMP%]:nth-child(odd)::before {\n  content: "";\n  position: absolute;\n  right: -36px;\n  top: 50%;\n  height: calc(var(--slot-h, 88px) + 20px);\n  width: 1px;\n  background: rgba(255, 255, 255, 0.18);\n  pointer-events: none;\n  z-index: 3;\n}\n.b-match--mine[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.55) !important;\n  box-shadow:\n    0 0 0 1px rgba(212, 175, 55, 0.2),\n    0 0 20px rgba(212, 175, 55, 0.18),\n    inset 0 0 24px rgba(212, 175, 55, 0.06);\n}\n.b-match--mine[_ngcontent-%COMP%]   .b-match__head[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.08);\n  border-bottom-color: rgba(212, 175, 55, 0.2);\n}\n.b-match--mine[_ngcontent-%COMP%]   .b-match__head[_ngcontent-%COMP%]::after {\n  content: "YOUR MATCH";\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  color: var(--accent);\n  font-weight: 700;\n  padding: 1px 6px;\n  border: 1px solid rgba(212, 175, 55, 0.4);\n  border-radius: 4px;\n  background: rgba(212, 175, 55, 0.12);\n}\n.b-match__p[_ngcontent-%COMP%] {\n  transition: background 0.12s;\n}\n.b-match__p--winner[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 700;\n  background: rgba(212, 175, 55, 0.06);\n  border-left: 2px solid rgba(212, 175, 55, 0.5);\n  padding-left: 12px;\n}\n.b-match__p--loser[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n  opacity: 0.75;\n  padding-left: 14px;\n}\n.b-match__p[_ngcontent-%COMP%]   .b-match__score--win[_ngcontent-%COMP%] {\n  color: var(--accent);\n  font-weight: 900;\n  text-shadow: 0 0 12px rgba(212, 175, 55, 0.4);\n}\n.b-match--live[_ngcontent-%COMP%], .b-match--in_progress[_ngcontent-%COMP%] {\n  border-color: rgba(248, 113, 113, 0.45) !important;\n  box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.15), 0 0 16px rgba(248, 113, 113, 0.1);\n  animation: _ngcontent-%COMP%_matchPulse 3s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_matchPulse {\n  0%, 100% {\n    box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.15), 0 0 16px rgba(248, 113, 113, 0.1);\n  }\n  50% {\n    box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.25), 0 0 28px rgba(248, 113, 113, 0.22);\n  }\n}\n.b-match--clickable[_ngcontent-%COMP%]:hover {\n  border-color: rgba(255, 255, 255, 0.25) !important;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);\n}\n.bracket-legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 18px;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 20px;\n  padding: 16px 20px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.legend-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.legend-item--click[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n  margin-left: auto;\n  text-transform: none;\n  letter-spacing: 0.5px;\n}\n.legend-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--text-mute);\n}\n.legend-dot.ld--pending[_ngcontent-%COMP%] {\n  background: var(--text-mute);\n}\n.legend-dot.ld--submitted[_ngcontent-%COMP%] {\n  background: var(--warn);\n}\n.legend-dot.ld--disputed[_ngcontent-%COMP%] {\n  background: #f5b942;\n}\n.legend-dot.ld--completed[_ngcontent-%COMP%] {\n  background: var(--good);\n}\n.standings-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  overflow: hidden;\n}\n.standings-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 14px 16px;\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  border-bottom: 1px solid var(--line);\n  background: var(--bg-3);\n}\n.standings-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid var(--line);\n  font-size: 14px;\n}\n.standings-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.standings-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-3);\n}\n.standings-table__num[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.rank[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  color: var(--text-mute);\n  letter-spacing: 1px;\n  min-width: 48px;\n  display: inline-block;\n}\n.rank--gold[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.rank--silver[_ngcontent-%COMP%] {\n  color: #c0c0d0;\n}\n.rank--bronze[_ngcontent-%COMP%] {\n  color: #cd7f32;\n}\n.player-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.player-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex: 0 0 auto;\n}\n.player-avatar--placeholder[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bg-3),\n      var(--bg-4));\n  border: 1px solid var(--line);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 14px;\n  color: var(--text-dim);\n}\n.player-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.player-seed[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  margin-top: 2px;\n  letter-spacing: 1px;\n}\n.stat-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-weight: 700;\n  color: var(--text);\n}\n.stat-num--dim[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n}\n.match-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.match-chip[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  border: 1px solid var(--line);\n  border-radius: 100px;\n  cursor: pointer;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: transparent;\n  transition: all 0.15s;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.match-chip[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n  border-color: var(--line-2);\n}\n.match-chip--active[_ngcontent-%COMP%] {\n  background: var(--text);\n  color: var(--bg);\n  border-color: var(--text);\n  font-weight: 700;\n}\n.match-chip__count[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  padding: 2px 7px;\n  background: var(--bg-3);\n  color: var(--text-dim);\n  border-radius: 100px;\n}\n.match-chip--active[_ngcontent-%COMP%]   .match-chip__count[_ngcontent-%COMP%] {\n  background: var(--bg);\n  color: var(--text);\n}\n.matches-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-dim);\n}\n.matches-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.match-row-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 80px 1fr auto;\n  gap: 20px;\n  align-items: center;\n  padding: 14px 22px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  transition: border-color 0.15s, background 0.15s;\n}\n.match-row-card--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.match-row-card--clickable[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n  background: var(--bg-3);\n}\n.match-row-card__round[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.match-row-card__round-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text);\n  letter-spacing: 1.5px;\n}\n.match-row-card__match-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1px;\n}\n.match-row-card__vs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  gap: 16px;\n  align-items: center;\n}\n.match-row-card__player[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n.match-row-card__player--right[_ngcontent-%COMP%] {\n  flex-direction: row-reverse;\n  text-align: right;\n  justify-content: flex-end;\n}\n.match-row-card__player--win[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.match-row-card__player--lose[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n}\n.match-row-card__avatar[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex: 0 0 auto;\n}\n.match-row-card__avatar--placeholder[_ngcontent-%COMP%] {\n  background: var(--bg-3);\n  border: 1px solid var(--line-2);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 12px;\n  color: var(--text-dim);\n}\n.match-row-card__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.match-row-card__score[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--display);\n  font-size: 22px;\n  color: var(--accent);\n  letter-spacing: 1px;\n  min-width: 80px;\n  justify-content: center;\n}\n.match-row-card__score-num[_ngcontent-%COMP%] {\n  font-family: var(--display);\n}\n.match-row-card__score-sep[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n  font-size: 14px;\n}\n.match-row-card__score-vs[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text-mute);\n  letter-spacing: 2px;\n}\n.match-row-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.match-row-card__time[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 0.8px;\n}\n.match-row-card__status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  padding: 4px 10px;\n  border-radius: 100px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  font-weight: 700;\n}\n.match-row-card__status--live[_ngcontent-%COMP%], .match-row-card__status--in_progress[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.15);\n  border: 1px solid rgba(248, 113, 113, 0.4);\n  color: var(--live);\n}\n.match-row-card__status--live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%], .match-row-card__status--in_progress[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--live);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.match-row-card__status--completed[_ngcontent-%COMP%], .match-row-card__status--walkover[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--line-2);\n  color: var(--text-dim);\n}\n.match-row-card__status--scheduled[_ngcontent-%COMP%], .match-row-card__status--pending[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  border: 1px solid rgba(212, 175, 55, 0.3);\n  color: var(--accent);\n}\n.match-row-card__status--disputed[_ngcontent-%COMP%] {\n  background: rgba(245, 185, 66, 0.1);\n  border: 1px solid rgba(245, 185, 66, 0.4);\n  color: var(--warn);\n}\n.players-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 12px;\n}\n.player-card[_ngcontent-%COMP%] {\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  padding: 18px 18px 16px;\n  transition: border-color 0.15s, transform 0.15s;\n}\n.player-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n  transform: translateY(-1px);\n}\n.player-card--gold[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.4);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(212, 175, 55, 0.05),\n      var(--bg-2));\n}\n.player-card--silver[_ngcontent-%COMP%] {\n  border-color: rgba(192, 192, 208, 0.3);\n}\n.player-card--bronze[_ngcontent-%COMP%] {\n  border-color: rgba(205, 127, 50, 0.3);\n}\n.player-card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.player-card__avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex: 0 0 auto;\n}\n.player-card__avatar--placeholder[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bg-3),\n      var(--bg-4));\n  border: 1px solid var(--line);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 16px;\n  color: var(--accent);\n}\n.player-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 1.2;\n}\n.player-card__handle[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  margin-top: 2px;\n  letter-spacing: 0.5px;\n}\n.player-card__stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 4px;\n  padding-top: 12px;\n  border-top: 1px dashed var(--line);\n}\n.player-card__stat-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  color: var(--text-mute);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.player-card__stat-v[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 18px;\n  color: var(--text);\n  margin-top: 2px;\n}\n.prize-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n@media (max-width: 800px) {\n  .prize-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.prize-tier[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r-lg);\n  padding: 32px 28px;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_prize-in 0.5s ease both;\n  animation-delay: var(--delay, 0ms);\n}\n.prize-tier[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--text-mute);\n}\n.prize-tier--t1[_ngcontent-%COMP%]::before {\n  background: var(--accent);\n}\n.prize-tier--t2[_ngcontent-%COMP%]::before {\n  background: #c0c0d0;\n}\n.prize-tier--t3[_ngcontent-%COMP%]::before {\n  background: #cd7f32;\n}\n.prize-tier--t1[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(212, 175, 55, 0.06),\n      var(--bg-2) 70%);\n}\n.prize-tier__medal[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 14px;\n}\n.prize-tier__pos[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n  margin-bottom: 12px;\n}\n.prize-tier__amt[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 32px;\n  line-height: 1.1;\n  letter-spacing: 1px;\n  color: var(--text);\n}\n.prize-tier--t1[_ngcontent-%COMP%]   .prize-tier__amt[_ngcontent-%COMP%] {\n  color: var(--accent);\n  font-size: 44px;\n}\n@keyframes _ngcontent-%COMP%_prize-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n.streams-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n@media (max-width: 900px) {\n  .streams-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .streams-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.stream-card[_ngcontent-%COMP%] {\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  overflow: hidden;\n  transition: border-color 0.18s, transform 0.18s;\n}\n.stream-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n  transform: translateY(-2px);\n}\n.stream-card__thumb[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/9;\n  background:\n    linear-gradient(\n      135deg,\n      var(--bg-3),\n      var(--bg-2));\n}\n.stream-card__body[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n}\n.stream-card__title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 18px;\n  line-height: 1.2;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 6px;\n}\n.stream-card__vs[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 6px;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  vertical-align: 2px;\n}\n.stream-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 0.8px;\n}\n.stream-card__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 1px dashed var(--line);\n}\n.stream-card__status[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-dim);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.stream-card__status--live[_ngcontent-%COMP%], .stream-card__status--in_progress[_ngcontent-%COMP%] {\n  color: var(--live);\n}\n.stream-card__open[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--accent);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n.stream-card__open[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.stream-tag[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  font-family: var(--mono);\n  font-size: 9px;\n  padding: 3px 8px;\n  border-radius: 100px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  z-index: 2;\n}\n.stream-tag--live[_ngcontent-%COMP%] {\n  background: var(--live);\n  color: #fff;\n}\n.stream-tag--live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #fff;\n}\n.stream-tag--starting[_ngcontent-%COMP%] {\n  background: rgba(74, 144, 226, 0.2);\n  color: #4a90e2;\n  border: 1px solid rgba(74, 144, 226, 0.4);\n}\n.stream-tag--scheduled[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  color: var(--accent);\n  border: 1px solid rgba(212, 175, 55, 0.3);\n}\n.stream-tag--replay[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  color: var(--text-dim);\n  border: 1px solid var(--line-2);\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 22px;\n  border-radius: var(--r);\n  font: 700 14px/1 var(--body);\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition:\n    transform 0.18s,\n    background 0.18s,\n    border-color 0.18s,\n    color 0.18s;\n}\n.btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #1a1100;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--accent-soft, #e8c965);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--line-2);\n  color: var(--text);\n}\n.btn--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--text);\n  background: rgba(255, 255, 255, 0.04);\n}\n.btn--lg[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  font-size: 15px;\n}\n.btn--small[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  font-size: 12px;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(5, 5, 10, 0.78);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 60px 20px;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_modal-fade 0.15s ease;\n}\n@keyframes _ngcontent-%COMP%_modal-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 560px;\n  background: var(--bg-2);\n  border: 1px solid var(--line-2);\n  border-radius: var(--r-lg);\n  overflow: hidden;\n  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);\n}\n.modal--wide[_ngcontent-%COMP%] {\n  max-width: 720px;\n}\n.modal__head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 22px 28px 18px;\n  border-bottom: 1px solid var(--line);\n}\n.modal__round-label[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-dim);\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n}\n.modal__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--display);\n  font-size: 28px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.modal__close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 1px solid var(--line);\n  color: var(--text-dim);\n  background: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.modal__close[_ngcontent-%COMP%]:hover {\n  border-color: var(--text);\n  color: var(--text);\n}\n.modal__body[_ngcontent-%COMP%] {\n  padding: 20px 28px;\n}\n.modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 16px 28px;\n  border-top: 1px solid var(--line);\n  background: var(--bg-3);\n}\n.modal__vs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  gap: 16px;\n  padding: 28px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--bg-3),\n      var(--bg-2));\n  border-bottom: 1px solid var(--line);\n}\n.modal__player[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal__player--right[_ngcontent-%COMP%] {\n  flex-direction: row-reverse;\n  text-align: right;\n}\n.modal__player--winner[_ngcontent-%COMP%]   .modal__player-score[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.modal__avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex: 0 0 auto;\n}\n.modal__avatar--placeholder[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bg-3),\n      var(--bg-4));\n  border: 1px solid var(--line-2);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 22px;\n  color: var(--accent);\n}\n.modal__player-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.modal__player-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.modal__player-score[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 56px;\n  line-height: 1;\n  color: var(--text);\n  letter-spacing: 1px;\n}\n.modal__vs-sep[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text-mute);\n  letter-spacing: 2px;\n}\n.modal__status-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 28px;\n  border-bottom: 1px solid var(--line);\n}\n.modal__status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  padding: 4px 10px;\n  border-radius: 100px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  font-weight: 700;\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  color: var(--text-dim);\n}\n.modal__status-badge--live[_ngcontent-%COMP%], .modal__status-badge--in_progress[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.15);\n  border-color: rgba(248, 113, 113, 0.4);\n  color: var(--live);\n}\n.modal__status-badge--live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%], .modal__status-badge--in_progress[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--live);\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.modal__status-badge--completed[_ngcontent-%COMP%], .modal__status-badge--walkover[_ngcontent-%COMP%] {\n  color: var(--good);\n  border-color: rgba(74, 222, 128, 0.3);\n}\n.modal__status-badge--disputed[_ngcontent-%COMP%] {\n  color: var(--warn);\n  border-color: rgba(245, 185, 66, 0.4);\n}\n.m-section[_ngcontent-%COMP%] {\n  padding: 22px 28px;\n  border-bottom: 1px solid var(--line);\n}\n.m-section[_ngcontent-%COMP%]:last-of-type {\n  border-bottom: none;\n}\n.m-section__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 14px;\n}\n.m-section__icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  opacity: 0.8;\n}\n.m-section__title[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1.8px;\n  text-transform: uppercase;\n}\n.m-section__action[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--accent);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n.m-section__action[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.m-section__empty[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n  margin: 0;\n}\n.scheduled-at[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--text);\n}\n.scheduled-at[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.stream-actions[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: flex;\n  justify-content: flex-end;\n}\n.m-inline-form[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.m-inline-form--stack[_ngcontent-%COMP%] {\n  flex-direction: column;\n  align-items: stretch;\n}\n.m-inline-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  margin-top: 4px;\n}\n.m-inline-form__hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-dim);\n  margin: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 14px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.form-label[_ngcontent-%COMP%]   .req[_ngcontent-%COMP%] {\n  color: var(--bad);\n}\n.input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  background: var(--bg);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  color: var(--text);\n  font-family: var(--body);\n  font-size: 14px;\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n}\n.reschedule-card[_ngcontent-%COMP%] {\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  padding: 16px 18px;\n  margin-bottom: 10px;\n}\n.reschedule-card--awaiting-you[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.4);\n  background:\n    linear-gradient(\n      180deg,\n      rgba(212, 175, 55, 0.05),\n      var(--bg-3));\n}\n.reschedule-card--organizer[_ngcontent-%COMP%] {\n  border-color: rgba(74, 144, 226, 0.3);\n}\n.reschedule-card__head[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text);\n  margin-bottom: 8px;\n}\n.reschedule-card__time[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  color: var(--accent);\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n.reschedule-card__reason[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n  font-style: italic;\n  padding: 8px 12px;\n  background: var(--bg-2);\n  border-left: 2px solid var(--line-2);\n  border-radius: 4px;\n  margin-bottom: 12px;\n}\n.reschedule-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n.rules-accept-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 14px;\n  margin-top: 16px;\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  font-size: 13px;\n  color: var(--text);\n  cursor: pointer;\n}\n.rules-accept-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n.prize-edit-form[_ngcontent-%COMP%]   .modal__actions[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 0 -28px -20px;\n}\n.prize-edit-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-dim);\n  margin: 0 0 16px;\n  padding: 10px 12px;\n  background: var(--bg-3);\n  border-radius: var(--r);\n}\n.bracket-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  overflow-y: visible;\n  padding: 12px 4px 40px;\n  -webkit-overflow-scrolling: touch;\n  scrollbar-width: thin;\n  scrollbar-color: var(--line-2, rgba(255, 255, 255, 0.15)) transparent;\n}\n.bracket-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 6px;\n}\n.bracket-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.bracket-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--line-2, rgba(255, 255, 255, 0.15));\n  border-radius: 3px;\n}\n.bracket-tree[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 36px;\n  min-width: min-content;\n  width: max-content;\n  align-items: flex-start;\n}\n.b-round[_ngcontent-%COMP%] {\n  flex: 0 0 260px;\n  min-width: 260px;\n  max-width: 260px;\n  display: flex;\n  flex-direction: column;\n}\n.b-round__matches[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  justify-content: flex-start;\n}\n.tab-content[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n.bracket-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.b-round__label--swiss[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n}\n@media (max-width: 768px) {\n  .bracket-scroll[_ngcontent-%COMP%]::after {\n    content: "\\2190  scroll \\2192";\n    display: block;\n    text-align: center;\n    font-family: var(--mono);\n    font-size: 10px;\n    color: var(--text-mute, #6b7280);\n    letter-spacing: 1.5px;\n    margin-top: 8px;\n  }\n}\n.bracket-tree--swiss[_ngcontent-%COMP%]   .b-slot[_ngcontent-%COMP%], .bracket-tree--rr[_ngcontent-%COMP%]   .b-slot[_ngcontent-%COMP%] {\n  height: auto !important;\n  min-height: 0 !important;\n}\n.bracket-tree--swiss[_ngcontent-%COMP%]   .b-round__matches[_ngcontent-%COMP%], .bracket-tree--rr[_ngcontent-%COMP%]   .b-round__matches[_ngcontent-%COMP%] {\n  gap: 20px;\n  justify-content: flex-start;\n}\n.bracket-tree--swiss[_ngcontent-%COMP%]   .b-round[_ngcontent-%COMP%], .bracket-tree--rr[_ngcontent-%COMP%]   .b-round[_ngcontent-%COMP%] {\n  flex: 0 0 280px;\n  min-width: 280px;\n}\n.tab-content[_ngcontent-%COMP%]   .bracket-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  overflow-y: visible;\n}\n.bracket-tree[_ngcontent-%COMP%]:not(.bracket-tree--swiss):not(.bracket-tree--rr) {\n  align-items: flex-start;\n}\n.round-picker[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.round-picker__tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.round-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 16px;\n  min-width: 80px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.round-tab[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.round-tab.active[_ngcontent-%COMP%] {\n  border-color: var(--accent);\n  background: rgba(212, 175, 55, 0.08);\n}\n.round-tab.active[_ngcontent-%COMP%]   .round-tab__label[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.round-tab__label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n  white-space: nowrap;\n}\n.round-tab__progress[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 3px;\n  background: var(--line);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.round-tab__done[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  background: var(--good, #10b981);\n  border-radius: 2px;\n  transition: width 0.3s ease;\n}\n.round-tab__count[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n}\n.round-matches-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 12px;\n}\n.round-matches-grid[_ngcontent-%COMP%]   .b-slot[_ngcontent-%COMP%] {\n  height: auto !important;\n}\n.players-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.players-search-wrap[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.players-search[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  width: 220px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  color: var(--text);\n  font-family: var(--body);\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.15s;\n}\n.players-search[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n}\n.players-search[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-mute);\n}\n.podium-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  gap: 8px;\n  margin-bottom: 32px;\n}\n.podium-slot[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  flex: 0 0 120px;\n  text-align: center;\n}\n.podium-slot--first[_ngcontent-%COMP%] {\n  order: 2;\n}\n.podium-slot--second[_ngcontent-%COMP%] {\n  order: 1;\n}\n.podium-slot--third[_ngcontent-%COMP%] {\n  order: 3;\n}\n.podium-medal[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.podium-avatar[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.podium-slot--first[_ngcontent-%COMP%]   .podium-avatar[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n}\n.podium-avatar--ph[_ngcontent-%COMP%] {\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 20px;\n  color: var(--accent);\n  border-radius: 50%;\n}\n.podium-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 13px;\n  color: var(--text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 110px;\n}\n.podium-stats[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-dim);\n}\n.podium-base[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 8px;\n  border-radius: 4px 4px 0 0;\n}\n.podium-base--gold[_ngcontent-%COMP%] {\n  background: var(--accent);\n}\n.podium-base--silver[_ngcontent-%COMP%] {\n  background: #c0c0d0;\n}\n.podium-base--bronze[_ngcontent-%COMP%] {\n  background: #cd7f32;\n}\n.players-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.player-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 40px 44px 1fr auto auto;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  transition: border-color 0.15s;\n}\n.player-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.player-row--gold[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.35);\n}\n.player-row--silver[_ngcontent-%COMP%] {\n  border-color: rgba(192, 192, 208, 0.25);\n}\n.player-row--bronze[_ngcontent-%COMP%] {\n  border-color: rgba(205, 127, 50, 0.25);\n}\n.player-row__rank[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 1.1rem;\n}\n.player-row__rank-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text-mute);\n  font-weight: 700;\n}\n.player-row__avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.player-row__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.player-row__avatar-ph[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 14px;\n  color: var(--accent);\n}\n.player-row__info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.player-row__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.player-row__seed[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 0.5px;\n  margin-top: 2px;\n}\n.player-row__stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n}\n.player-row__stat[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 20px;\n}\n.player-row__stat--win[_ngcontent-%COMP%] {\n  color: var(--good);\n  background: rgba(16, 185, 129, 0.1);\n}\n.player-row__stat--loss[_ngcontent-%COMP%] {\n  color: var(--bad);\n  background: rgba(239, 68, 68, 0.1);\n}\n.player-row__stat--pts[_ngcontent-%COMP%] {\n  color: var(--accent);\n  background: rgba(212, 175, 55, 0.1);\n}\n.player-row__stat--buch[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  background: var(--bg-3);\n}\n.player-row__winrate[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n  width: 80px;\n}\n@media (max-width: 640px) {\n  .player-row__winrate[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.wr-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 4px;\n  background: var(--line);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.wr-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--good);\n  border-radius: 2px;\n  transition: width 0.3s;\n}\n.wr-label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  white-space: nowrap;\n}\n.players-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  font-family: var(--mono);\n  font-size: 13px;\n  color: var(--text-mute);\n}\n.lb-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 28px;\n}\n.lb-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 28px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text);\n}\n.lb-subtitle[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 1px;\n  margin-top: 4px;\n}\n.lb-search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 14px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  min-width: 200px;\n}\n.lb-search-box[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n  flex-shrink: 0;\n}\n.lb-search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  outline: none;\n  color: var(--text);\n  font-size: 13px;\n  font-family: var(--body);\n  width: 100%;\n}\n.lb-search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-mute);\n}\n.lb-search-box[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--accent);\n}\n.lb-podium[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  gap: 0;\n  margin-bottom: 40px;\n  padding: 32px 0 0;\n  overflow: hidden;\n  border-radius: var(--r-lg);\n}\n.lb-podium__bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(\n      ellipse 80% 60% at 50% 100%,\n      rgba(212, 175, 55, 0.08) 0%,\n      transparent 70%);\n  pointer-events: none;\n}\n.lb-podium__slot[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n  max-width: 200px;\n  z-index: 1;\n}\n.lb-podium__slot--1[_ngcontent-%COMP%] {\n  order: 2;\n}\n.lb-podium__slot--2[_ngcontent-%COMP%] {\n  order: 1;\n}\n.lb-podium__slot--3[_ngcontent-%COMP%] {\n  order: 3;\n}\n.lb-podium__crown[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  line-height: 1;\n}\n.lb-podium__ring[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 22px;\n  color: var(--text);\n  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px rgba(255, 255, 255, 0.1);\n  width: 68px;\n  height: 68px;\n}\n.lb-podium__ring[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.lb-podium__slot--1[_ngcontent-%COMP%]   .lb-podium__ring[_ngcontent-%COMP%] {\n  width: 88px;\n  height: 88px;\n  font-size: 28px;\n}\n.lb-podium__ring--gold[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #b8960c,\n      #d4af37);\n  box-shadow:\n    0 0 0 3px var(--bg),\n    0 0 0 5px rgba(212, 175, 55, 0.6),\n    0 8px 30px rgba(212, 175, 55, 0.3);\n}\n.lb-podium__ring--silver[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #888,\n      #c0c0d0);\n  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px rgba(192, 192, 208, 0.5);\n}\n.lb-podium__ring--bronze[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b4513,\n      #cd7f32);\n  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px rgba(205, 127, 50, 0.5);\n}\n.lb-podium__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 13px;\n  color: var(--text);\n  text-align: center;\n  max-width: 130px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.lb-podium__score[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n}\n.lb-podium__plinth[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: center;\n  font-family: var(--display);\n  font-size: 13px;\n  letter-spacing: 1px;\n  padding: 12px 8px;\n  border-radius: 4px 4px 0 0;\n}\n.lb-podium__plinth--1[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(212, 175, 55, 0.25),\n      rgba(212, 175, 55, 0.1));\n  color: #d4af37;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lb-podium__plinth--2[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(192, 192, 208, 0.15),\n      rgba(192, 192, 208, 0.05));\n  color: #c0c0d0;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lb-podium__plinth--3[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      rgba(205, 127, 50, 0.15),\n      rgba(205, 127, 50, 0.05));\n  color: #cd7f32;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lb-podium__plinth[_ngcontent-%COMP%]   sup[_ngcontent-%COMP%] {\n  font-size: 10px;\n  vertical-align: super;\n}\n.lb-table-head[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 48px 1fr 48px 48px 64px 100px;\n  gap: 0;\n  padding: 8px 16px;\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  border-radius: var(--r) var(--r) 0 0;\n  margin-bottom: 2px;\n}\n.lb-th[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-mute);\n  font-weight: 700;\n}\n.lb-th--rank[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.lb-th--w[_ngcontent-%COMP%], .lb-th--l[_ngcontent-%COMP%], .lb-th--pts[_ngcontent-%COMP%], .lb-th--bh[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.lb-th--wr[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.lb-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.lb-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 48px 1fr 48px 48px 64px 100px;\n  align-items: center;\n  padding: 12px 16px;\n  background: var(--bg-2);\n  border: 1px solid transparent;\n  border-radius: var(--r);\n  transition: border-color 0.15s, background 0.15s;\n}\n.lb-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--line);\n  background: var(--bg-3);\n}\n.lb-row--gold[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.2);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(212, 175, 55, 0.06),\n      var(--bg-2));\n}\n.lb-row--silver[_ngcontent-%COMP%] {\n  border-color: rgba(192, 192, 208, 0.15);\n}\n.lb-row--bronze[_ngcontent-%COMP%] {\n  border-color: rgba(205, 127, 50, 0.15);\n}\n.lb-cell--rank[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lb-cell--w[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family: var(--mono);\n  font-weight: 700;\n  color: var(--good);\n}\n.lb-cell--l[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family: var(--mono);\n  font-weight: 700;\n  color: var(--bad);\n}\n.lb-cell--pts[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.lb-cell--bh[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family: var(--mono);\n  font-size: 13px;\n  color: var(--text-dim);\n}\n.lb-cell--wr[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.lb-cell--player[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.lb-medal[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 13px;\n  font-weight: 900;\n}\n.lb-medal--gold[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #b8960c,\n      #d4af37);\n  color: #1a1100;\n}\n.lb-medal--silver[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #888,\n      #c0c0d0);\n  color: #1a1a2e;\n}\n.lb-medal--bronze[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b4513,\n      #cd7f32);\n  color: #fff;\n}\n.lb-rank-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 13px;\n  color: var(--text-mute);\n  font-weight: 700;\n}\n.lb-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  background: var(--bg-3);\n  border: 1px solid var(--line);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 14px;\n  color: var(--accent);\n}\n.lb-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.lb-player-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.lb-player-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.lb-player-seed[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 0.5px;\n  margin-top: 2px;\n}\n.lb-pts-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-family: var(--mono);\n  font-weight: 700;\n  font-size: 13px;\n  color: var(--accent);\n}\n.lb-wr[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  justify-content: flex-end;\n}\n.lb-wr__track[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 4px;\n  background: var(--line);\n  border-radius: 2px;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.lb-wr__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 2px;\n  transition: width 0.4s ease;\n}\n.lb-wr__fill--high[_ngcontent-%COMP%] {\n  background: var(--good);\n}\n.lb-wr__fill--mid[_ngcontent-%COMP%] {\n  background: var(--warn, #f5b942);\n}\n.lb-wr__fill--low[_ngcontent-%COMP%] {\n  background: var(--bad);\n}\n.lb-wr__pct[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  min-width: 34px;\n  text-align: right;\n}\n.lb-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  font-family: var(--mono);\n  font-size: 13px;\n  color: var(--text-mute);\n}\n.lb-table-head[_ngcontent-%COMP%]:has(.lb-th--bh), .lb-row[_ngcontent-%COMP%]:has(.lb-cell--bh) {\n  grid-template-columns: 48px 1fr 48px 48px 64px 56px 100px;\n}\n.modal--edit[_ngcontent-%COMP%] {\n  max-width: 640px;\n}\n.modal--sm[_ngcontent-%COMP%] {\n  max-width: 480px;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.edit-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.edit-field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n@media (max-width: 600px) {\n  .edit-field-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.modal-foot[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 16px 24px;\n  border-top: 1px solid var(--line);\n}\n.modal__warn-text[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  line-height: 1.6;\n}\n.modal__warn-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.btn--danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  border-color: rgba(239, 68, 68, 0.4);\n  color: #fca5a5;\n}\n.btn--danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.25);\n}\n.btn--danger-solid[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border: none;\n  color: #fff;\n}\n.btn--danger-solid[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n}\n.result-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.score-input-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: var(--bg-3);\n  border-radius: var(--r);\n  padding: 16px;\n}\n.score-player[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.score-player--right[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.score-player-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-dim);\n  font-family: var(--mono);\n  letter-spacing: 0.5px;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 120px;\n}\n.score-input[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 56px;\n  text-align: center;\n  font-family: var(--display);\n  font-size: 32px;\n  letter-spacing: 1px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  color: var(--text);\n  outline: none;\n}\n.score-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n}\n.score-sep[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 20px;\n  color: var(--text-mute);\n  flex-shrink: 0;\n}\n.winner-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.winner-opt[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  cursor: pointer;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  transition: border-color 0.15s;\n}\n.winner-opt[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%] {\n  display: none;\n}\n.winner-opt.active[_ngcontent-%COMP%] {\n  border-color: var(--accent);\n  background: rgba(212, 175, 55, 0.08);\n  color: var(--accent);\n  font-weight: 700;\n}\n.winner-opt[_ngcontent-%COMP%]:hover:not(.active) {\n  border-color: var(--line-2);\n}\n.evidence-upload[_ngcontent-%COMP%] {\n  border: 2px dashed var(--line);\n  border-radius: var(--r);\n  overflow: hidden;\n  min-height: 100px;\n}\n.evidence-drop[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 24px;\n  cursor: pointer;\n  min-height: 100px;\n}\n.evidence-drop[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.evidence-drop[_ngcontent-%COMP%]:hover {\n  background: var(--bg-3);\n}\n.evidence-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.evidence-preview[_ngcontent-%COMP%] {\n  position: relative;\n}\n.evidence-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 200px;\n  object-fit: cover;\n  display: block;\n}\n.evidence-remove[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: rgba(0, 0, 0, 0.7);\n  border: none;\n  color: #fff;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  cursor: pointer;\n  font-size: 12px;\n}\n.result-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n}\n.dispute-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: 12px;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.mine-toggle[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--text-dim);\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n.mine-toggle.active[_ngcontent-%COMP%] {\n  border-color: var(--accent);\n  color: var(--accent);\n  background: rgba(212, 175, 55, 0.08);\n}\n.mine-toggle[_ngcontent-%COMP%]:hover:not(.active) {\n  border-color: var(--line-2);\n}\n.card-organizer[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 0.5px;\n  display: block;\n  margin-top: 2px;\n}\n.hero__cover--game-art[_ngcontent-%COMP%] {\n  opacity: 0.35;\n  filter: saturate(0.7);\n}\n.hero--has-cover[_ngcontent-%COMP%]   .hero__cover[_ngcontent-%COMP%] {\n  opacity: 0.7;\n  filter: saturate(0.95) brightness(0.85);\n}\n.hero--has-cover[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      90deg,\n      var(--bg) 0%,\n      rgba(10, 10, 18, 0.55) 45%,\n      rgba(10, 10, 18, 0.15) 80%),\n    linear-gradient(\n      180deg,\n      transparent 30%,\n      rgba(10, 10, 18, 0.85) 100%);\n}\n@keyframes _ngcontent-%COMP%_heroCoverKen {\n  0% {\n    transform: scale(1.05) translate(0, 0);\n  }\n  100% {\n    transform: scale(1.14) translate(-1.5%, -1.5%);\n  }\n}\n.btn--active[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, 0.15) !important;\n  border-color: rgba(240, 165, 0, 0.4) !important;\n  color: var(--accent) !important;\n}\n.pred-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 16px;\n  margin-bottom: 12px;\n  background: rgba(240, 165, 0, 0.08);\n  border: 1px solid rgba(240, 165, 0, 0.2);\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n.pred-bar__info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n  flex: 1;\n  min-width: 200px;\n}\n.pred-bar__count[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--accent);\n  font-weight: 700;\n}\n.pred-bar__saved[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: #10b981;\n  font-weight: 700;\n}\n.b-match--pred-mode[_ngcontent-%COMP%]   .b-match__p[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.b-match--pred-mode[_ngcontent-%COMP%]   .b-match__p[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.05);\n}\n.b-match__p--pick[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, 0.12) !important;\n  color: #fff !important;\n  font-weight: 700;\n}\n.b-match__p--pick[_ngcontent-%COMP%]::before {\n  background: var(--accent) !important;\n}\n.lb-cell--sub[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sub-btn[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  font-size: 11px;\n  font-family: var(--mono);\n  letter-spacing: 0.5px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n.sub-btn[_ngcontent-%COMP%]:hover {\n  border-color: rgba(240, 165, 0, 0.4);\n  color: var(--accent);\n  background: rgba(240, 165, 0, 0.08);\n}\n.pred-lb[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.pred-lb__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  border-radius: 8px;\n  transition: background 0.15s;\n}\n.pred-lb__row[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.06);\n}\n.pred-lb__rank[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 16px;\n  min-width: 28px;\n  text-align: center;\n}\n.pred-lb__rank--gold[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.pred-lb__rank--silver[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n.pred-lb__rank--bronze[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.pred-lb__avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--display);\n  font-size: 13px;\n  color: var(--accent);\n  flex-shrink: 0;\n}\n.pred-lb__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.pred-lb__name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 14px;\n  font-weight: 600;\n}\n.pred-lb__correct[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: #10b981;\n}\n.pred-lb__pts[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 18px;\n  color: var(--accent);\n  min-width: 60px;\n  text-align: right;\n}\n.form-dots[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n}\n.form-dot[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--mono);\n  font-size: 9px;\n  font-weight: 900;\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--text-mute);\n}\n.form-dot--w[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2);\n  color: #10b981;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n}\n.form-dot--l[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n}\n.lb-cell--form[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.lb-table-head[_ngcontent-%COMP%], .lb-row[_ngcontent-%COMP%] {\n  grid-template-columns: 48px 1fr 48px 48px 64px 100px 80px 60px !important;\n}\n.pred-pick-label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.3);\n  padding: 2px 7px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 4px;\n  margin-left: auto;\n  flex-shrink: 0;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pred-pick-label--active[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, 0.15);\n  border-color: rgba(240, 165, 0, 0.4);\n  color: var(--accent);\n  font-weight: 700;\n}\n.b-match--pred-mode[_ngcontent-%COMP%]   .b-match__p[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.b-match--pred-mode[_ngcontent-%COMP%]   .b-match__p[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.t-banner-ad[_ngcontent-%COMP%] {\n  --banner-accent: #f0a500;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 20px;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.03),\n      rgba(255, 255, 255, 0.01));\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-left: 3px solid var(--banner-accent);\n  border-radius: 10px;\n  margin: 0 0 16px;\n  position: relative;\n  overflow: hidden;\n}\n.t-banner-ad__img[_ngcontent-%COMP%] {\n  height: 40px;\n  width: auto;\n  max-width: 120px;\n  object-fit: contain;\n  flex-shrink: 0;\n  border-radius: 4px;\n}\n.t-banner-ad__content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.t-banner-ad__brand[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--banner-accent);\n}\n.t-banner-ad__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #fff;\n}\n.t-banner-ad__cta[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  background: var(--banner-accent);\n  color: #0b1022;\n  font-size: 12px;\n  font-weight: 700;\n  border-radius: 6px;\n  text-decoration: none;\n  white-space: nowrap;\n  flex-shrink: 0;\n  transition: opacity 0.15s;\n}\n.t-banner-ad__cta[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.t-banner-ad__label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  right: 8px;\n  font-family: var(--mono);\n  font-size: 8px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, 0.2);\n}\n.stream-panel[_ngcontent-%COMP%] {\n  margin: 0 0 20px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 12px;\n  overflow: hidden;\n  background: #0a1020;\n}\n.stream-panel__empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  font-size: 22px;\n}\n.stream-panel__label[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: #fff;\n}\n.stream-panel__hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 2px;\n}\n.stream-panel__active[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.stream-panel__active--live[_ngcontent-%COMP%] {\n  border-left: 3px solid #ef4444;\n  background: rgba(239, 68, 68, 0.04);\n}\n.stream-status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  background: rgba(255, 255, 255, 0.06);\n  color: #9ca3af;\n  width: fit-content;\n}\n.stream-status-badge[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #ef4444;\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.stream-status-badge--live[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n}\n.stream-status-badge--ended[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.1);\n  color: #10b981;\n}\n.stream-key-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.stream-key-label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #f0a500;\n}\n.stream-key-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.stream-key-val[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n  padding: 10px 14px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 8px;\n  font-family: monospace;\n  font-size: 13px;\n  color: #10b981;\n}\n.stream-key-val--hidden[_ngcontent-%COMP%] {\n  color: #4b5563;\n  letter-spacing: 4px;\n}\n.stream-key-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 8px;\n  color: #9ca3af;\n  font-size: 12px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.stream-key-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.12);\n  color: #fff;\n}\n.stream-key-rtmp[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.stream-key-rtmp[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 12px;\n}\n.setup-guides[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.setup-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 14px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 8px;\n  color: #6b7280;\n  font-size: 12px;\n  cursor: pointer;\n  margin-right: 6px;\n}\n.setup-tab[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background: rgba(255, 255, 255, 0.08);\n}\n.setup-tab--active[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, 0.1);\n  border-color: rgba(240, 165, 0, 0.3);\n  color: #f0a500;\n  font-weight: 700;\n}\n.setup-steps[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  padding: 14px 16px 14px 32px;\n  background: rgba(255, 255, 255, 0.03);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  list-style: decimal;\n}\n.setup-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9ca3af;\n  line-height: 1.5;\n}\n.setup-steps[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: #10b981;\n  font-size: 12px;\n  background: rgba(16, 185, 129, 0.08);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.inline-copy[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 3px 10px;\n  background: #f0a500;\n  color: #0b1022;\n  border: none;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  cursor: pointer;\n}\n.stream-watch-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 10px 20px;\n  background: #ff0000;\n  color: #fff;\n  font-weight: 700;\n  font-size: 13px;\n  text-decoration: none;\n  border-radius: 8px;\n  width: fit-content;\n}\n.stream-watch-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.setup-tabs-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.setup-guide-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 10px;\n  overflow: hidden;\n}\n.setup-guide-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: rgba(255, 255, 255, 0.03);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  flex-wrap: wrap;\n}\n.setup-platform-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  flex-shrink: 0;\n}\n.setup-platform-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 15px;\n  color: #fff;\n}\n.setup-platform-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 2px;\n}\n.setup-download-btn[_ngcontent-%COMP%] {\n  margin-left: auto;\n  padding: 7px 14px;\n  background: #f0a500;\n  color: #0b1022;\n  font-size: 12px;\n  font-weight: 700;\n  text-decoration: none;\n  border-radius: 6px;\n  white-space: nowrap;\n  transition: opacity 0.15s;\n  flex-shrink: 0;\n}\n.setup-download-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.setup-steps[_ngcontent-%COMP%] {\n  padding: 14px 16px 4px 36px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  list-style: decimal;\n  margin: 0;\n}\n.setup-steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9ca3af;\n  line-height: 1.6;\n}\n.setup-steps[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.setup-steps[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: #10b981;\n  font-size: 12px;\n  background: rgba(16, 185, 129, 0.08);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.setup-link[_ngcontent-%COMP%] {\n  color: #f0a500;\n  text-decoration: none;\n  font-weight: 600;\n}\n.setup-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.setup-note[_ngcontent-%COMP%] {\n  margin: 8px 16px 12px;\n  padding: 8px 12px;\n  background: rgba(255, 255, 255, 0.03);\n  border-left: 2px solid rgba(255, 255, 255, 0.1);\n  border-radius: 0 6px 6px 0;\n  font-size: 12px;\n  color: #6b7280;\n  line-height: 1.5;\n}\n.setup-note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #f0a500;\n  text-decoration: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .hero__cover[_ngcontent-%COMP%], .hero__glow[_ngcontent-%COMP%], .progress-fill[_ngcontent-%COMP%]::after {\n    animation: none !important;\n  }\n}\n.m-section__count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-family: var(--mono);\n  font-size: 11px;\n  background: rgba(212, 175, 55, 0.14);\n  color: var(--accent);\n  padding: 1px 8px;\n  border-radius: 100px;\n}\n.result-final[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 16px;\n  flex-wrap: wrap;\n  padding: 14px 16px;\n  background: var(--bg-3);\n  border-radius: var(--r);\n  border: 1px solid rgba(212, 175, 55, 0.2);\n}\n.result-final__score[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 26px;\n  letter-spacing: 1px;\n  color: var(--text);\n}\n.result-final__winner[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n}\n.result-final__winner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.result-form__lede[_ngcontent-%COMP%], .result-confirm__lede[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n  line-height: 1.5;\n  margin: 0;\n}\n.result-form__scores[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  gap: 16px;\n  padding: 8px 0;\n}\n.result-score[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n  max-width: 160px;\n}\n.result-score__name[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 0.5px;\n  color: var(--text-dim);\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n}\n.result-score__input[_ngcontent-%COMP%] {\n  width: 84px;\n  height: 60px;\n  text-align: center;\n  font-family: var(--display);\n  font-size: 30px;\n  letter-spacing: 1px;\n  padding: 0;\n  color: var(--text);\n}\n.result-form__x[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 22px;\n  color: var(--text-mute);\n  padding-bottom: 16px;\n}\n.result-form__winner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.winner-opt[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 11px 14px;\n  cursor: pointer;\n  font-size: 13px;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    color 0.15s;\n}\n.winner-opt[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%] {\n  accent-color: var(--accent);\n  width: 15px;\n  height: 15px;\n  flex-shrink: 0;\n}\n.winner-opt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.winner-opt[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.winner-opt[_ngcontent-%COMP%]:has(input:checked) {\n  border-color: var(--accent);\n  background: rgba(212, 175, 55, 0.1);\n  color: var(--accent);\n  font-weight: 700;\n}\n.result-confirm[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.result-dispute[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  padding-top: 12px;\n  border-top: 1px solid var(--line);\n}\n.evidence-upload[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n  margin-bottom: 14px;\n  border: 0;\n  min-height: 0;\n  overflow: visible;\n}\n.evidence-upload__file[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  cursor: pointer;\n  font-size: 13px;\n  color: var(--text-dim);\n  background: var(--bg-2);\n  border: 1px dashed var(--line-2);\n  border-radius: var(--r);\n  transition: border-color 0.15s, color 0.15s;\n  max-width: 240px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.evidence-upload__file[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%] {\n  display: none;\n}\n.evidence-upload__file[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--text);\n}\n.evidence-upload__file[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.evidence-upload[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n}\n.evidence-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: 12px;\n}\n.evidence-item[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--bg-2);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  overflow: hidden;\n  transition: border-color 0.15s;\n}\n.evidence-item[_ngcontent-%COMP%]:hover {\n  border-color: var(--line-2);\n}\n.evidence-item__media[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 110px;\n  object-fit: cover;\n  display: block;\n  background: #000;\n}\n.evidence-item__meta[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.evidence-item__caption[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text);\n  line-height: 1.3;\n}\n.evidence-item__by[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 0.3px;\n}\n.evidence-item__del[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  cursor: pointer;\n  background: rgba(0, 0, 0, 0.65);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  color: #fca5a5;\n  display: grid;\n  place-items: center;\n  opacity: 0;\n  transition: opacity 0.15s, background 0.15s;\n}\n.evidence-item[_ngcontent-%COMP%]:hover   .evidence-item__del[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.evidence-item__del[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.85);\n  color: #fff;\n}\n/*# sourceMappingURL=tournament-detail.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TournamentDetailComponent, { className: "TournamentDetailComponent", filePath: "src\\app\\pages\\tournaments\\tournament-detail.component.ts", lineNumber: 70 });
})();
export {
  TournamentDetailComponent
};
//# sourceMappingURL=chunk-BFC4HA46.js.map
