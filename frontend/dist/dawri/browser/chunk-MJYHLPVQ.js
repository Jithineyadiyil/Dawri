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
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
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
  TitleCasePipe,
  computed,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/profile/my-profile.component.ts
function MyProfileComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 10);
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", p_r3.avatar_url, \u0275\u0275sanitizeUrl)("alt", p_r3.display_name);
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.avatarLetter());
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, "Uploading\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r3.name);
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function MyProfileComponent_Conditional_10_Conditional_0_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeAvatar());
    });
    \u0275\u0275text(1, "Remove");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Name is required.");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Letters, numbers, and underscores only.");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Minimum 3 characters.");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "That nickname is already taken.");
    \u0275\u0275elementEnd();
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Conditional_0_Template, 2, 0, "span", 27)(1, MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Conditional_1_Template, 2, 0)(2, MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Conditional_2_Template, 2, 0);
  }
  if (rf & 2) {
    const errs_r5 = ctx;
    \u0275\u0275conditional(0, errs_r5["pattern"] ? 0 : errs_r5["minlength"] ? 1 : errs_r5["taken"] ? 2 : -1);
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 41);
    \u0275\u0275text(2, "Phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r3.phone);
  }
}
function MyProfileComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "section", 8)(2, "div", 9);
    \u0275\u0275template(3, MyProfileComponent_Conditional_10_Conditional_0_Conditional_3_Template, 1, 2, "img", 10)(4, MyProfileComponent_Conditional_10_Conditional_0_Conditional_4_Template, 2, 1)(5, MyProfileComponent_Conditional_10_Conditional_0_Conditional_5_Template, 2, 0, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12)(7, "div", 13);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, MyProfileComponent_Conditional_10_Conditional_0_Conditional_9_Template, 2, 1, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 15)(11, "label", 16)(12, "input", 17);
    \u0275\u0275listener("change", function MyProfileComponent_Conditional_10_Conditional_0_Template_input_change_12_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAvatarSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, MyProfileComponent_Conditional_10_Conditional_0_Conditional_14_Template, 2, 0, "button", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 19);
    \u0275\u0275text(16, "JPG / PNG / WEBP \xB7 Max 2MB \xB7 Square works best");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "form", 20);
    \u0275\u0275listener("ngSubmit", function MyProfileComponent_Conditional_10_Conditional_0_Template_form_ngSubmit_17_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275elementStart(18, "section", 21)(19, "h2", 22);
    \u0275\u0275text(20, "Identity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 23)(22, "label", 24);
    \u0275\u0275text(23, "Full Name ");
    \u0275\u0275elementStart(24, "span", 25);
    \u0275\u0275text(25, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(26, "input", 26);
    \u0275\u0275template(27, MyProfileComponent_Conditional_10_Conditional_0_Conditional_27_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 23)(29, "label", 24);
    \u0275\u0275text(30, " Nickname ");
    \u0275\u0275elementStart(31, "span", 28);
    \u0275\u0275text(32, "(gamer tag)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 29)(34, "span", 30);
    \u0275\u0275text(35, "@");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, MyProfileComponent_Conditional_10_Conditional_0_Conditional_37_Template, 3, 1);
    \u0275\u0275elementStart(38, "small", 19);
    \u0275\u0275text(39, "This is how opponents see you on brackets and leaderboards. Leave blank to show your real name.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 23)(41, "label", 24);
    \u0275\u0275text(42, " Bio ");
    \u0275\u0275elementStart(43, "span", 28);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(45, "textarea", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "section", 21)(47, "h2", 22);
    \u0275\u0275text(48, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 33)(50, "div", 23)(51, "label", 24);
    \u0275\u0275text(52, "Country");
    \u0275\u0275elementEnd();
    \u0275\u0275element(53, "input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 23)(55, "label", 24);
    \u0275\u0275text(56, "City");
    \u0275\u0275elementEnd();
    \u0275\u0275element(57, "input", 35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(58, "section", 21)(59, "h2", 22);
    \u0275\u0275text(60, "Game Handles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "p", 36);
    \u0275\u0275text(62, "Optional. Used to help verify match results with official game APIs.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 33)(64, "div", 23)(65, "label", 24);
    \u0275\u0275text(66, "\u{1F3AE} PSN ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(67, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 23)(69, "label", 24);
    \u0275\u0275text(70, "\u{1F52B} PUBG ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(71, "input", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 23)(73, "label", 24);
    \u0275\u0275text(74, "\u{1F3AF} CoD ID");
    \u0275\u0275elementEnd();
    \u0275\u0275element(75, "input", 39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(76, "section", 21)(77, "h2", 22);
    \u0275\u0275text(78, "Account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 40)(80, "div")(81, "span", 41);
    \u0275\u0275text(82, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "span", 42);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(85, MyProfileComponent_Conditional_10_Conditional_0_Conditional_85_Template, 5, 1, "div");
    \u0275\u0275elementStart(86, "div")(87, "span", 41);
    \u0275\u0275text(88, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "span", 42);
    \u0275\u0275text(90);
    \u0275\u0275pipe(91, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(92, "div")(93, "span", 41);
    \u0275\u0275text(94, "Plan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "span", 42);
    \u0275\u0275text(96);
    \u0275\u0275pipe(97, "titlecase");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(98, "div", 43)(99, "button", 44);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const p_r3 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, p_r3.avatar_url ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(5, ctx_r0.uploading() ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.display_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, p_r3.nickname && p_r3.name !== p_r3.nickname ? 9 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", p_r3.avatar_url ? "Change Photo" : "Upload Photo", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(14, p_r3.avatar_url ? 14 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(27, ctx_r0.form.controls.name.touched && (ctx_r0.form.controls.name.errors == null ? null : ctx_r0.form.controls.name.errors["required"]) ? 27 : -1);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(37, (tmp_11_0 = ctx_r0.form.controls.nickname.touched && ctx_r0.form.controls.nickname.errors) ? 37 : -1, tmp_11_0);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("(", ctx_r0.bioLen(), "/500)");
    \u0275\u0275advance(40);
    \u0275\u0275textInterpolate(p_r3.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(85, p_r3.phone ? 85 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(91, 16, p_r3.role));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(97, 18, p_r3.subscription_plan));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.saving() || ctx_r0.form.pristine);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Saving\u2026" : "Save Profile", " ");
  }
}
function MyProfileComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MyProfileComponent_Conditional_10_Conditional_0_Template, 101, 20, "div", 7);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_1_0 = ctx_r0.profile()) ? 0 : -1, tmp_1_0);
  }
}
var API = "http://192.168.100.67:8001/api/v1";
var MyProfileComponent = class _MyProfileComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.fb = inject(FormBuilder);
    this.auth = inject(AuthService);
    this.toast = inject(ToastService);
    this.profile = signal(null);
    this.loading = signal(true);
    this.saving = signal(false);
    this.uploading = signal(false);
    this.error = signal(null);
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      nickname: ["", [Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9_]*$/)]],
      bio: ["", [Validators.maxLength(500)]],
      country: ["", [Validators.maxLength(50)]],
      city: ["", [Validators.maxLength(50)]],
      psn_id: ["", [Validators.maxLength(50)]],
      pubg_id: ["", [Validators.maxLength(50)]],
      cod_id: ["", [Validators.maxLength(50)]]
    });
    this.bioLen = computed(() => (this.form.value.bio ?? "").length);
    this.nicknameTaken = signal(false);
    this.avatarLetter = computed(() => {
      const p = this.profile();
      return (p?.display_name ?? p?.name ?? "?").charAt(0).toUpperCase();
    });
  }
  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    this.loading.set(true);
    this.http.get(`${API}/profile/me`).subscribe({
      next: (res) => {
        const p = res.data;
        this.profile.set(p);
        this.form.patchValue({
          name: p.name ?? "",
          nickname: p.nickname ?? "",
          bio: p.bio ?? "",
          country: p.country ?? "",
          city: p.city ?? "",
          psn_id: p.psn_id ?? "",
          pubg_id: p.pubg_id ?? "",
          cod_id: p.cod_id ?? ""
        });
        this.form.markAsPristine();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? "Failed to load profile.");
        this.loading.set(false);
      }
    });
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {};
    for (const key of Object.keys(this.form.controls)) {
      const ctrl = this.form.controls[key];
      if (ctrl.dirty) {
        const v = ctrl.value;
        payload[key] = v === "" ? null : v;
      }
    }
    if (Object.keys(payload).length === 0) {
      this.toast.info("Nothing to save.");
      return;
    }
    this.saving.set(true);
    this.nicknameTaken.set(false);
    this.http.patch(`${API}/profile/me`, payload).subscribe({
      next: (res) => {
        this.profile.set(res.data);
        this.form.markAsPristine();
        this.saving.set(false);
        this.syncAuth(res.data);
        this.toast.success("Profile saved.");
      },
      error: (err) => {
        this.saving.set(false);
        if (err.status === 422 && err.error?.errors?.nickname) {
          this.nicknameTaken.set(true);
          this.form.controls.nickname.setErrors({ taken: true });
        }
        this.toast.error(err.error?.message ?? "Failed to save.");
      }
    });
  }
  onAvatarSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    if (file.size > 2 * 1024 * 1024) {
      this.toast.error("Avatar must be under 2MB.");
      return;
    }
    const form = new FormData();
    form.append("file", file);
    this.uploading.set(true);
    this.http.post(`${API}/profile/me/avatar`, form).subscribe({
      next: (res) => {
        this.uploading.set(false);
        const curr = this.profile();
        if (curr) {
          const next = __spreadProps(__spreadValues({}, curr), { avatar_url: res.avatar_url });
          this.profile.set(next);
          this.syncAuth(next);
        }
        this.toast.success("Avatar updated.");
      },
      error: (err) => {
        this.uploading.set(false);
        this.toast.error(err.error?.message ?? "Upload failed.");
      }
    });
  }
  removeAvatar() {
    this.http.delete(`${API}/profile/me/avatar`).subscribe({
      next: () => {
        const curr = this.profile();
        if (curr) {
          const next = __spreadProps(__spreadValues({}, curr), { avatar_url: null });
          this.profile.set(next);
          this.syncAuth(next);
        }
        this.toast.success("Avatar removed.");
      },
      error: (err) => this.toast.error(err.error?.message ?? "Failed.")
    });
  }
  /**
   * Push relevant profile fields into the AuthService so the nav avatar
   * + drawer reflect changes immediately without a full reload.
   */
  syncAuth(p) {
    const u = this.auth.currentUser();
    if (!u)
      return;
    this.auth.updateUser(__spreadProps(__spreadValues({}, u), {
      name: p.name,
      nickname: p.nickname,
      display_name: p.display_name,
      avatar_url: p.avatar_url
    }));
  }
  static {
    this.\u0275fac = function MyProfileComponent_Factory(t) {
      return new (t || _MyProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyProfileComponent, selectors: [["app-my-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 1, consts: [[1, "profile-page"], [1, "profile-header"], ["routerLink", "/dashboard", 1, "profile-back"], [1, "profile-title"], [1, "profile-sub"], [1, "loading"], [1, "alert", "alert--error"], [1, "profile-grid"], [1, "card", "avatar-card"], [1, "avatar-display"], [1, "avatar-img", 3, "src", "alt"], [1, "avatar-overlay"], [1, "avatar-name"], [1, "avatar-display-name"], [1, "avatar-real-name"], [1, "avatar-actions"], [1, "btn", "btn--cyan", "btn--sm"], ["type", "file", "accept", "image/jpeg,image/png,image/webp", "hidden", "", 3, "change"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], [1, "hint"], [1, "profile-form", 3, "ngSubmit", "formGroup"], [1, "card"], [1, "card__title"], [1, "field"], [1, "label"], [1, "req"], ["formControlName", "name", "placeholder", "Your real name", "maxlength", "100", 1, "input"], [1, "err"], [1, "label-hint"], [1, "nickname-input"], [1, "at"], ["formControlName", "nickname", "placeholder", "e.g. dawri_king", "maxlength", "30", "autocomplete", "off", 1, "input", "input--flush"], ["formControlName", "bio", "rows", "4", "maxlength", "500", "placeholder", "Tell people about your game, achievements, or favorite setup\u2026", 1, "input", "input--textarea"], [1, "field-row"], ["formControlName", "country", "placeholder", "Saudi Arabia", "maxlength", "50", 1, "input"], ["formControlName", "city", "placeholder", "Riyadh", "maxlength", "50", 1, "input"], [1, "card__desc"], ["formControlName", "psn_id", "placeholder", "PSN-Username", "maxlength", "50", 1, "input"], ["formControlName", "pubg_id", "placeholder", "PUBG-Username", "maxlength", "50", 1, "input"], ["formControlName", "cod_id", "placeholder", "CoD-Username", "maxlength", "50", 1, "input"], [1, "readonly-grid"], [1, "readonly-label"], [1, "readonly-value"], [1, "profile-actions"], ["type", "submit", 1, "btn", "btn--gold", 3, "disabled"], [1, "avatar-placeholder"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"]], template: function MyProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "My Profile");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Your nickname and photo will be shown on tournament brackets and leaderboards.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, MyProfileComponent_Conditional_8_Template, 2, 0, "div", 5)(9, MyProfileComponent_Conditional_9_Template, 2, 1)(10, MyProfileComponent_Conditional_10_Template, 1, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(8, ctx.loading() ? 8 : ctx.error() ? 9 : 10);
      }
    }, dependencies: [CommonModule, TitleCasePipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  --gold: #f0a500;\n  --cyan: #00e5ff;\n  --green: #22c55e;\n  --red: #ef4444;\n  --bg: #0b1022;\n  --bg2: #12182e;\n  --bg3: #1a2040;\n  --br: #2d3560;\n  --br2: #3d4670;\n  --text: #e4e6f0;\n  --mu: #8a90a8;\n  --fh:\n    "Bebas Neue",\n    "Rajdhani",\n    sans-serif;\n  --fb: "Rajdhani", sans-serif;\n  --fm: "Space Mono", monospace;\n}\n.profile-page[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 28px 24px 80px;\n  color: var(--text);\n  font-family: var(--fb);\n}\n.profile-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.profile-back[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.88rem;\n  text-decoration: none;\n}\n.profile-back[_ngcontent-%COMP%]:hover {\n  color: var(--cyan);\n}\n.profile-title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  font-weight: 900;\n  letter-spacing: 2px;\n  margin: 10px 0 6px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold) 0%,\n      var(--cyan) 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.profile-sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  margin: 0;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--mu);\n  padding: 60px 0;\n  font-family: var(--fm);\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 14px 18px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.alert--error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  color: #fca5a5;\n}\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 24px;\n  align-items: start;\n}\n.profile-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 12px;\n  padding: 20px;\n}\n.card__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.05rem;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  margin: 0 0 14px;\n  padding-bottom: 10px;\n  border-bottom: 1px solid var(--br);\n  text-transform: uppercase;\n}\n.card__desc[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.85rem;\n  margin: -6px 0 14px;\n}\n.avatar-card[_ngcontent-%COMP%] {\n  text-align: center;\n  position: sticky;\n  top: 20px;\n}\n.avatar-display[_ngcontent-%COMP%] {\n  position: relative;\n  width: 180px;\n  height: 180px;\n  margin: 8px auto 16px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: var(--bg3);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(240, 165, 0, 0.15);\n  transition: box-shadow 0.2s;\n}\n.avatar-display[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(240, 165, 0, 0.35);\n}\n.avatar-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatar-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--fh);\n  font-size: 5rem;\n  font-weight: 900;\n  color: #1a1208;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold) 0%,\n      rgba(240, 165, 0, 0.6) 100%);\n}\n.avatar-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(11, 16, 34, 0.8);\n  color: var(--cyan);\n  font-family: var(--fm);\n  font-size: 0.85rem;\n  letter-spacing: 1.5px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.avatar-name[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.avatar-display-name[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.3rem;\n  letter-spacing: 1.5px;\n  color: var(--text);\n}\n.avatar-real-name[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.82rem;\n  margin-top: 2px;\n}\n.avatar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n  margin-bottom: 14px;\n}\n.field[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.field-row[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 150px;\n  margin-bottom: 0;\n}\n.label[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  color: var(--mu);\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n}\n.label-hint[_ngcontent-%COMP%] {\n  font-family: var(--fb);\n  text-transform: none;\n  letter-spacing: 0;\n  color: var(--mu);\n  font-size: 0.78rem;\n  font-weight: 400;\n  margin-left: 6px;\n}\n.req[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mu);\n  margin-top: 4px;\n}\n.err[_ngcontent-%COMP%] {\n  color: #fca5a5;\n  font-size: 0.78rem;\n  margin-top: 2px;\n}\n.input[_ngcontent-%COMP%] {\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  padding: 10px 12px;\n  color: var(--text);\n  font-family: var(--fb);\n  font-size: 0.95rem;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  color-scheme: dark;\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--cyan);\n  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1);\n}\n.input--textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.5;\n}\n.input--flush[_ngcontent-%COMP%] {\n  border: none;\n  padding-left: 0;\n  background: transparent;\n  flex: 1;\n}\n.input--flush[_ngcontent-%COMP%]:focus {\n  box-shadow: none;\n}\n.nickname-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  padding: 0 12px;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.nickname-input[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--cyan);\n  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1);\n}\n.nickname-input[_ngcontent-%COMP%]   .at[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  color: var(--gold);\n  font-weight: 700;\n  font-size: 1rem;\n}\n.readonly-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 10px;\n}\n.readonly-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 10px;\n  background: var(--bg);\n  border-radius: 6px;\n  border: 1px solid var(--br);\n}\n.readonly-label[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.68rem;\n  color: var(--mu);\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n}\n.readonly-value[_ngcontent-%COMP%] {\n  font-family: var(--fb);\n  font-size: 0.95rem;\n  color: var(--text);\n  word-break: break-all;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 6px;\n  border: none;\n  font-family: var(--fh);\n  font-weight: 900;\n  letter-spacing: 1.5px;\n  font-size: 0.88rem;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.2s;\n  text-decoration: none;\n}\n.btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--gold[_ngcontent-%COMP%] {\n  background: var(--gold);\n  color: #1a1208;\n}\n.btn--cyan[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--cyan);\n  border: 1px solid var(--cyan);\n}\n.btn--cyan[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 229, 255, 0.1);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text);\n  border: 1px solid var(--br);\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  font-size: 0.78rem;\n}\n.profile-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 10px 0;\n}\n.profile-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  font-size: 0.92rem;\n}\n@media (max-width: 860px) {\n  .profile-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .avatar-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n/*# sourceMappingURL=my-profile.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyProfileComponent, { className: "MyProfileComponent", filePath: "src\\app\\pages\\profile\\my-profile.component.ts", lineNumber: 60 });
})();
export {
  MyProfileComponent
};
//# sourceMappingURL=chunk-MJYHLPVQ.js.map
