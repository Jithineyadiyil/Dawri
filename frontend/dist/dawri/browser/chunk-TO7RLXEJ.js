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
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  HttpClient,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
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
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/settings/company-branding/company-branding.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function CompanyBrandingComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function CompanyBrandingComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275text(2, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Locked");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 8);
    \u0275\u0275text(8, "View Plans \u2192");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function CompanyBrandingComponent_Conditional_10_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const c_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", c_r3.logo_url, \u0275\u0275sanitizeUrl)("alt", c_r3.name);
  }
}
function CompanyBrandingComponent_Conditional_10_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r3.name.charAt(0).toUpperCase());
  }
}
function CompanyBrandingComponent_Conditional_10_Conditional_0_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r4 = ctx.$implicit;
    \u0275\u0275property("value", f_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r4.label);
  }
}
function CompanyBrandingComponent_Conditional_10_Conditional_0_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 42);
  }
  if (rf & 2) {
    const c_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", c_r3.logo_url, \u0275\u0275sanitizeUrl);
  }
}
function CompanyBrandingComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "form", 10);
    \u0275\u0275listener("ngSubmit", function CompanyBrandingComponent_Conditional_10_Conditional_0_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275elementStart(2, "section", 11)(3, "h2", 12);
    \u0275\u0275text(4, "Company");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 13);
    \u0275\u0275template(6, CompanyBrandingComponent_Conditional_10_Conditional_0_Conditional_6_Template, 1, 2, "img", 14)(7, CompanyBrandingComponent_Conditional_10_Conditional_0_Conditional_7_Template, 2, 1);
    \u0275\u0275elementStart(8, "div")(9, "div", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 16)(12, "input", 17);
    \u0275\u0275listener("change", function CompanyBrandingComponent_Conditional_10_Conditional_0_Template_input_change_12_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onLogoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "small", 18);
    \u0275\u0275text(15, "JPG/PNG/WEBP/SVG \xB7 Max 2MB");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "section", 11)(17, "h2", 12);
    \u0275\u0275text(18, "Colors");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 19)(20, "div", 20)(21, "label", 21);
    \u0275\u0275text(22, "Primary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 22);
    \u0275\u0275element(24, "input", 23)(25, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "small", 18);
    \u0275\u0275text(27, "Used for buttons, highlights.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 20)(29, "label", 21);
    \u0275\u0275text(30, "Secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 22);
    \u0275\u0275element(32, "input", 25)(33, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "small", 18);
    \u0275\u0275text(35, "Used for accents, links.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 20)(37, "label", 21);
    \u0275\u0275text(38, "Accent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 22);
    \u0275\u0275element(40, "input", 27)(41, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "small", 18);
    \u0275\u0275text(43, "Used for success states.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 20)(45, "label", 21);
    \u0275\u0275text(46, "Background");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 22);
    \u0275\u0275element(48, "input", 29)(49, "input", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "small", 18);
    \u0275\u0275text(51, "Page background base.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(52, "section", 11)(53, "h2", 12);
    \u0275\u0275text(54, "Typography");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 31)(56, "label", 21);
    \u0275\u0275text(57, "Font Family");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "select", 32);
    \u0275\u0275repeaterCreate(59, CompanyBrandingComponent_Conditional_10_Conditional_0_For_60_Template, 2, 2, "option", 33, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 34)(62, "button", 35);
    \u0275\u0275listener("click", function CompanyBrandingComponent_Conditional_10_Conditional_0_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.resetToDefaults());
    });
    \u0275\u0275text(63, "Reset to Platform Defaults");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "button", 36);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "aside", 37)(67, "div", 38);
    \u0275\u0275element(68, "span", 39);
    \u0275\u0275text(69, " Live Preview ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 40)(71, "div", 41);
    \u0275\u0275template(72, CompanyBrandingComponent_Conditional_10_Conditional_0_Conditional_72_Template, 1, 1, "img", 42);
    \u0275\u0275elementStart(73, "span", 43);
    \u0275\u0275text(74, "LIVE");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 44)(76, "h3");
    \u0275\u0275text(77, "Sample Tournament");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "p");
    \u0275\u0275text(79, "This is how your tournament cards will look with the current brand settings.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 45)(81, "span");
    \u0275\u0275text(82, "8/8 players");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "span", 46);
    \u0275\u0275text(84, "REGISTER");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(85, "div", 47)(86, "div", 48);
    \u0275\u0275text(87, "The Quick Brown Fox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "div", 49);
    \u0275\u0275text(89, "Jumps over the lazy dog 1234567890");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 50);
    \u0275\u0275text(91, "\u0627\u0644\u0637\u064A\u0648\u0631 \u0627\u0644\u0630\u0647\u0628\u064A\u0629 \u062A\u062D\u0644\u0642 \u0641\u0648\u0642 \u0627\u0644\u062C\u0628\u0627\u0644 \u2014 Arabic sample text for RTL verification.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div", 51)(93, "div", 52);
    \u0275\u0275element(94, "span", 53);
    \u0275\u0275elementStart(95, "span");
    \u0275\u0275text(96, "Primary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "span", 54);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 52);
    \u0275\u0275element(100, "span", 53);
    \u0275\u0275elementStart(101, "span");
    \u0275\u0275text(102, "Secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "span", 54);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(105, "div", 52);
    \u0275\u0275element(106, "span", 53);
    \u0275\u0275elementStart(107, "span");
    \u0275\u0275text(108, "Accent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "span", 54);
    \u0275\u0275text(110);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const c_r3 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(6, c_r3.logo_url ? 6 : 7);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(c_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.uploading() ? "Uploading\u2026" : c_r3.logo_url ? "Replace logo" : "Upload logo", " ");
    \u0275\u0275advance(46);
    \u0275\u0275repeater(ctx_r0.fontOptions);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Saving\u2026" : "Save Branding", " ");
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx_r0.form.value.primary_color + " 0%, " + ctx_r0.form.value.secondary_color + " 100%)");
    \u0275\u0275advance();
    \u0275\u0275conditional(72, c_r3.logo_url ? 72 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("font-family", ctx_r0.form.value.font_family);
    \u0275\u0275advance(8);
    \u0275\u0275styleProp("background", ctx_r0.form.value.primary_color)("color", "#1a1208");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("font-family", ctx_r0.form.value.font_family);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r0.form.value.primary_color);
    \u0275\u0275advance(8);
    \u0275\u0275styleProp("background", ctx_r0.form.value.primary_color);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.form.value.primary_color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", ctx_r0.form.value.secondary_color);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.form.value.secondary_color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", ctx_r0.form.value.accent_color);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.form.value.accent_color);
  }
}
function CompanyBrandingComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CompanyBrandingComponent_Conditional_10_Conditional_0_Template, 111, 28, "div", 9);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_1_0 = ctx_r0.company()) ? 0 : -1, tmp_1_0);
  }
}
var API = "http://192.168.100.67:8001/api/v1";
var CompanyBrandingComponent = class _CompanyBrandingComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.http = inject(HttpClient);
    this.fb = inject(FormBuilder);
    this.brand = inject(BrandingService);
    this.toast = inject(ToastService);
    this.loading = signal(true);
    this.saving = signal(false);
    this.uploading = signal(false);
    this.company = signal(null);
    this.error = signal(null);
    this.fontOptions = [
      { value: "Bebas Neue, Rajdhani, sans-serif", label: "Bebas Neue (default)" },
      { value: "Rajdhani, sans-serif", label: "Rajdhani" },
      { value: "Orbitron, sans-serif", label: "Orbitron (gaming)" },
      { value: "Poppins, sans-serif", label: "Poppins (friendly)" },
      { value: "Inter, sans-serif", label: "Inter" },
      { value: "Cairo, sans-serif", label: "Cairo (Arabic)" },
      { value: "Space Mono, monospace", label: "Space Mono" }
    ];
    this.form = this.fb.group({
      primary_color: ["#f0a500"],
      secondary_color: ["#00e5ff"],
      accent_color: ["#22c55e"],
      background_color: ["#0b1022"],
      font_family: ["Bebas Neue, Rajdhani, sans-serif"]
    });
  }
  ngOnInit() {
    this.http.get(`${API}/companies/mine`).subscribe({
      next: (res) => {
        const c = res.data;
        if (c) {
          this.company.set(c);
          this.form.patchValue({
            primary_color: c.primary_color ?? "#f0a500",
            secondary_color: c.secondary_color ?? "#00e5ff",
            accent_color: c.accent_color ?? "#22c55e",
            background_color: c.background_color ?? "#0b1022",
            font_family: c.font_family ?? "Bebas Neue, Rajdhani, sans-serif"
          });
        }
        this.loading.set(false);
      },
      error: (err) => {
        if (err.status === 403) {
          this.error.set("Custom branding is available on Professional and Enterprise plans.");
        } else {
          this.error.set(err.error?.message ?? "Failed to load company.");
        }
        this.loading.set(false);
      }
    });
    this.form.valueChanges.subscribe((v) => {
      this.brand.apply({
        primary_color: v.primary_color ?? "",
        secondary_color: v.secondary_color ?? "",
        accent_color: v.accent_color ?? "",
        background_color: v.background_color ?? "",
        font_family: v.font_family ?? "",
        logo_url: this.company()?.logo_url ?? null,
        source: "company"
      });
    });
  }
  ngOnDestroy() {
    this.brand.reset();
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.http.patch(`${API}/companies/mine/brand`, this.form.value).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.company.set(res.data);
        this.toast.success("Branding saved.");
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err.error?.message ?? "Failed to save.");
      }
    });
  }
  onLogoSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    if (file.size > 2 * 1024 * 1024) {
      this.toast.error("Logo must be under 2MB.");
      return;
    }
    const form = new FormData();
    form.append("file", file);
    this.uploading.set(true);
    this.http.post(`${API}/companies/mine/logo`, form).subscribe({
      next: (res) => {
        this.uploading.set(false);
        const curr = this.company();
        if (curr) {
          this.company.set(__spreadProps(__spreadValues({}, curr), { logo_url: res.logo_url }));
        }
        this.toast.success("Logo uploaded.");
      },
      error: (err) => {
        this.uploading.set(false);
        this.toast.error(err.error?.message ?? "Upload failed.");
      }
    });
  }
  resetToDefaults() {
    this.form.patchValue({
      primary_color: "#f0a500",
      secondary_color: "#00e5ff",
      accent_color: "#22c55e",
      background_color: "#0b1022",
      font_family: "Bebas Neue, Rajdhani, sans-serif"
    });
  }
  static {
    this.\u0275fac = function CompanyBrandingComponent_Factory(t) {
      return new (t || _CompanyBrandingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CompanyBrandingComponent, selectors: [["app-company-branding"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 1, consts: [[1, "cb-page"], [1, "cb-header"], ["routerLink", "/dashboard", 1, "cb-back"], [1, "cb-title"], [1, "cb-sub"], [1, "loading"], [1, "locked-panel"], [1, "locked-panel__icon"], ["routerLink", "/subscription/plans", 1, "btn", "btn--gold"], [1, "cb-grid"], [1, "cb-form", 3, "ngSubmit", "formGroup"], [1, "card"], [1, "card__title"], [1, "company-info"], [1, "company-logo", 3, "src", "alt"], [1, "company-name"], [1, "logo-upload-trigger"], ["type", "file", "accept", "image/jpeg,image/png,image/webp,image/svg+xml", 3, "change"], [1, "hint"], [1, "color-grid"], [1, "color-field"], [1, "label"], [1, "color-pick"], ["type", "color", "formControlName", "primary_color"], ["type", "text", "formControlName", "primary_color", "maxlength", "7", 1, "color-hex"], ["type", "color", "formControlName", "secondary_color"], ["type", "text", "formControlName", "secondary_color", "maxlength", "7", 1, "color-hex"], ["type", "color", "formControlName", "accent_color"], ["type", "text", "formControlName", "accent_color", "maxlength", "7", 1, "color-hex"], ["type", "color", "formControlName", "background_color"], ["type", "text", "formControlName", "background_color", "maxlength", "7", 1, "color-hex"], [1, "field"], ["formControlName", "font_family", 1, "input"], [3, "value"], [1, "actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "submit", 1, "btn", "btn--gold", 3, "disabled"], [1, "cb-preview"], [1, "preview-head"], [1, "preview-dot"], [1, "mock-card"], [1, "mock-card__cover"], ["alt", "", 1, "mock-card__logo", 3, "src"], [1, "mock-card__badge"], [1, "mock-card__body"], [1, "mock-card__stats"], [1, "mock-card__cta"], [1, "mock-typography"], [1, "mock-h1"], [1, "mock-h2"], [1, "mock-p"], [1, "chip-list"], [1, "chip"], [1, "chip__sw"], [1, "chip__hex"], [1, "company-logo", "company-logo--empty"]], template: function CompanyBrandingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Company Branding");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Customize the look of every tournament your company runs. Changes preview live on the right.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, CompanyBrandingComponent_Conditional_8_Template, 2, 0, "div", 5)(9, CompanyBrandingComponent_Conditional_9_Template, 9, 1)(10, CompanyBrandingComponent_Conditional_10_Template, 1, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(8, ctx.loading() ? 8 : ctx.error() ? 9 : 10);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  --gold: #f0a500;\n  --cyan: #00e5ff;\n  --green: #22c55e;\n  --red: #ef4444;\n  --bg: #0b1022;\n  --bg2: #12182e;\n  --bg3: #1a2040;\n  --bg4: #232a4f;\n  --br: #2d3560;\n  --br2: #3d4670;\n  --text: #e4e6f0;\n  --mu: #8a90a8;\n  --dim: #4a5268;\n  --fh:\n    "Bebas Neue",\n    "Rajdhani",\n    sans-serif;\n  --fb: "Rajdhani", sans-serif;\n  --fm: "Space Mono", monospace;\n}\n.cb-page[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 28px 24px 80px;\n  color: var(--text);\n  font-family: var(--fb);\n}\n.cb-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.cb-back[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.88rem;\n  text-decoration: none;\n}\n.cb-back[_ngcontent-%COMP%]:hover {\n  color: var(--cyan);\n}\n.cb-title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  font-weight: 900;\n  letter-spacing: 2px;\n  margin: 10px 0 6px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold) 0%,\n      var(--cyan) 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.cb-sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  margin: 0;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--mu);\n  padding: 60px 0;\n  font-family: var(--fm);\n}\n.locked-panel[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 40px auto;\n  padding: 40px;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(167, 139, 250, 0.1) 0%,\n      transparent 70%);\n  border: 1px solid rgba(167, 139, 250, 0.3);\n  border-radius: 12px;\n}\n.locked-panel__icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 20px;\n  opacity: 0.7;\n}\n.locked-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2rem;\n  letter-spacing: 1.5px;\n  margin: 0 0 12px;\n}\n.locked-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mu);\n  margin: 0 0 24px;\n  line-height: 1.6;\n}\n.cb-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.cb-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.cb-preview[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 20px;\n  align-self: start;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 12px;\n  padding: 20px;\n}\n.card__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.1rem;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  margin: 0 0 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid var(--br);\n}\n.company-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.company-logo[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 10px;\n  object-fit: contain;\n  background: var(--bg);\n  padding: 4px;\n  border: 1px solid var(--br);\n  flex-shrink: 0;\n}\n.company-logo--empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--fh);\n  font-size: 2rem;\n  font-weight: 900;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold),\n      rgba(240, 165, 0, 0.6));\n  color: #1a1208;\n}\n.company-name[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.2rem;\n  letter-spacing: 1px;\n  margin-bottom: 4px;\n}\n.logo-upload-trigger[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 12px;\n  background: rgba(0, 229, 255, 0.1);\n  border: 1px solid rgba(0, 229, 255, 0.3);\n  border-radius: 4px;\n  color: var(--cyan);\n  font-family: var(--fm);\n  font-size: 0.78rem;\n  cursor: pointer;\n  margin: 4px 0;\n  transition: all 0.15s;\n}\n.logo-upload-trigger[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.logo-upload-trigger[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 229, 255, 0.18);\n  border-color: var(--cyan);\n}\n.color-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n.color-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.color-pick[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n.color-pick[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%] {\n  width: 44px;\n  height: 38px;\n  padding: 2px;\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  background: var(--bg);\n  cursor: pointer;\n  color-scheme: dark;\n}\n.color-hex[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  padding: 8px 10px;\n  color: var(--text);\n  font-family: var(--fm);\n  font-size: 0.88rem;\n}\n.color-hex[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--cyan);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.label[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  color: var(--mu);\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--mu);\n  margin-top: 2px;\n}\n.input[_ngcontent-%COMP%] {\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  padding: 10px 12px;\n  color: var(--text);\n  font-family: var(--fb);\n  font-size: 0.95rem;\n  transition: border-color 0.15s;\n  color-scheme: dark;\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--cyan);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 6px 0;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 6px;\n  border: none;\n  font-family: var(--fh);\n  font-weight: 900;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: transform 0.15s;\n}\n.btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  transform: translateY(-1px);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--gold[_ngcontent-%COMP%] {\n  background: var(--gold);\n  color: #1a1208;\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text);\n  border: 1px solid var(--br);\n}\n.preview-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  color: var(--mu);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  margin-bottom: 12px;\n}\n.preview-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--green);\n  box-shadow: 0 0 10px var(--green);\n  animation: _ngcontent-%COMP%_pulse 1.6s ease-in-out infinite;\n}\n.mock-card[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 12px;\n  overflow: hidden;\n  margin-bottom: 16px;\n  transition: transform 0.2s;\n}\n.mock-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.mock-card__cover[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.mock-card__logo[_ngcontent-%COMP%] {\n  max-width: 80px;\n  max-height: 80px;\n  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));\n}\n.mock-card__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  padding: 3px 10px;\n  background: rgba(0, 0, 0, 0.6);\n  color: var(--red);\n  font-family: var(--fm);\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  border-radius: 4px;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.mock-card__body[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.mock-card__body[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.3rem;\n  letter-spacing: 1px;\n  margin: 0 0 8px;\n}\n.mock-card__body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.88rem;\n  line-height: 1.5;\n  margin: 0 0 14px;\n}\n.mock-card__stats[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-family: var(--fm);\n  font-size: 0.82rem;\n}\n.mock-card__cta[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-radius: 4px;\n  font-family: var(--fh);\n  font-size: 0.82rem;\n  font-weight: 900;\n  letter-spacing: 1.5px;\n}\n.mock-typography[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 10px;\n  margin-bottom: 16px;\n}\n.mock-typography[_ngcontent-%COMP%]   .mock-h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 900;\n  letter-spacing: 1.5px;\n  margin-bottom: 6px;\n}\n.mock-typography[_ngcontent-%COMP%]   .mock-h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--text);\n  margin-bottom: 10px;\n}\n.mock-typography[_ngcontent-%COMP%]   .mock-p[_ngcontent-%COMP%] {\n  color: var(--mu);\n  line-height: 1.7;\n}\n.chip-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.chip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 28px 1fr auto;\n  gap: 10px;\n  align-items: center;\n  padding: 8px 12px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  font-size: 0.88rem;\n}\n.chip__sw[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.chip__hex[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.78rem;\n  color: var(--mu);\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.3);\n    opacity: 0.6;\n  }\n}\n@media (max-width: 900px) {\n  .cb-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .cb-preview[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .color-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=company-branding.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CompanyBrandingComponent, { className: "CompanyBrandingComponent", filePath: "src\\app\\pages\\settings\\company-branding\\company-branding.component.ts", lineNumber: 46 });
})();
export {
  CompanyBrandingComponent
};
//# sourceMappingURL=chunk-TO7RLXEJ.js.map
