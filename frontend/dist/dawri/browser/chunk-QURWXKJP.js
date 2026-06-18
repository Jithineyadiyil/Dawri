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
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
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
  Router,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  HttpClient,
  computed,
  inject,
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
import "./chunk-7XEFWCRO.js";

// src/app/pages/tournaments/create-tournament.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function CreateTournamentComponent_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 44);
    \u0275\u0275element(1, "input", 45);
    \u0275\u0275elementStart(2, "span", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("game-opt--active", ctx_r1.form.value.game === g_r1.value);
    \u0275\u0275advance();
    \u0275\u0275property("value", g_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r1.emoji);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r1.label);
  }
}
function CreateTournamentComponent_For_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275property("value", p_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r3.label);
  }
}
function CreateTournamentComponent_For_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 48);
    \u0275\u0275element(1, "input", 49);
    \u0275\u0275elementStart(2, "span", 50);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 51);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("format-opt--active", ctx_r1.form.value.format === f_r4.value);
    \u0275\u0275advance();
    \u0275\u0275property("value", f_r4.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r4.desc);
  }
}
function CreateTournamentComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "label", 14);
    \u0275\u0275text(2, "Swiss Rounds");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 52);
    \u0275\u0275elementEnd();
  }
}
function CreateTournamentComponent_For_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tz_r5 = ctx.$implicit;
    \u0275\u0275property("value", tz_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tz_r5.label);
  }
}
function CreateTournamentComponent_Conditional_130_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "img", 53);
    \u0275\u0275elementStart(2, "button", 54);
    \u0275\u0275listener("click", function CreateTournamentComponent_Conditional_130_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeCover());
    });
    \u0275\u0275text(3, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.coverPreview(), \u0275\u0275sanitizeUrl);
  }
}
function CreateTournamentComponent_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 55)(1, "input", 56);
    \u0275\u0275listener("change", function CreateTournamentComponent_Conditional_131_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCoverSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 57)(3, "div", 58);
    \u0275\u0275text(4, "\u{1F5BC}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 59);
    \u0275\u0275text(6, "Choose cover image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 60);
    \u0275\u0275text(8, "JPG/PNG/WEBP \xB7 16:9 recommended \xB7 Max 5MB");
    \u0275\u0275elementEnd()()();
  }
}
function CreateTournamentComponent_Conditional_141_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "\u{1F512} Pro / Enterprise");
    \u0275\u0275elementEnd();
  }
}
function CreateTournamentComponent_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Override the default colors & fonts for this tournament. ");
  }
}
function CreateTournamentComponent_Conditional_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " White-label branding is available on Professional and Enterprise plans. ");
  }
}
function CreateTournamentComponent_Conditional_146_Conditional_5_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r8 = ctx.$implicit;
    \u0275\u0275property("value", f_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(f_r8.label);
  }
}
function CreateTournamentComponent_Conditional_146_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 17)(2, "label", 14);
    \u0275\u0275text(3, "Primary Color");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 17)(6, "label", 14);
    \u0275\u0275text(7, "Secondary Color");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 13)(10, "label", 14);
    \u0275\u0275text(11, "Font Family");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 68)(13, "option", 69);
    \u0275\u0275text(14, "-- Keep company/default --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(15, CreateTournamentComponent_Conditional_146_Conditional_5_For_16_Template, 2, 2, "option", 24, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 70)(18, "div", 71);
    \u0275\u0275text(19, "Primary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 72);
    \u0275\u0275text(21, "Secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 73);
    \u0275\u0275text(23, "The quick brown fox \u2014 Aa 1234");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r1.fontOptions);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("--p", ctx_r1.form.value.primary_color || "#f0a500")("--s", ctx_r1.form.value.secondary_color || "#00e5ff")("--ff", ctx_r1.form.value.font_family || "Bebas Neue, sans-serif");
  }
}
function CreateTournamentComponent_Conditional_146_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 61);
    \u0275\u0275element(1, "input", 62)(2, "span", 63);
    \u0275\u0275elementStart(3, "span", 64);
    \u0275\u0275text(4, "Use custom branding for this tournament");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, CreateTournamentComponent_Conditional_146_Conditional_5_Template, 24, 6);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ctx_r1.form.value.brand_override ? 5 : -1);
  }
}
function CreateTournamentComponent_Conditional_147_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74)(1, "p");
    \u0275\u0275text(2, "Upgrade to Professional or Enterprise to unlock:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul")(4, "li");
    \u0275\u0275text(5, "Company-wide brand defaults (colors, fonts, logo)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "li");
    \u0275\u0275text(7, "Per-tournament brand overrides");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "li");
    \u0275\u0275text(9, "White-label player experience (no Dawri branding)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 75);
    \u0275\u0275text(11, "View Plans \u2192");
    \u0275\u0275elementEnd()();
  }
}
var API = "http://192.168.100.67:8001/api/v1";
var CreateTournamentComponent = class _CreateTournamentComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.api = inject(ApiService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.saving = signal(false);
    this.games = signal([
      { value: "ea_fc25", label: "EA FC 25", emoji: "\u26BD" },
      { value: "pubg_mobile", label: "PUBG Mobile", emoji: "\u{1F52B}" },
      { value: "cod_mobile", label: "Call of Duty Mobile", emoji: "\u{1F3AF}" }
    ]);
    this.timezones = [
      { value: "Asia/Riyadh", label: "Riyadh (AST, UTC+3)" },
      { value: "Asia/Dubai", label: "Dubai (GST, UTC+4)" },
      { value: "Asia/Kuwait", label: "Kuwait (AST, UTC+3)" },
      { value: "Asia/Qatar", label: "Qatar (AST, UTC+3)" },
      { value: "Asia/Bahrain", label: "Bahrain (AST, UTC+3)" },
      { value: "Africa/Cairo", label: "Egypt (EET, UTC+2)" },
      { value: "UTC", label: "UTC (UTC+0)" }
    ];
    this.formats = [
      { value: "single_elimination", label: "Single Elimination", desc: "Lose once \u2192 out." },
      { value: "double_elimination", label: "Double Elimination", desc: "Losers get a second chance." },
      { value: "round_robin", label: "Round Robin", desc: "Everyone plays everyone." },
      { value: "swiss", label: "Swiss System", desc: "Paired by performance." },
      { value: "group_knockout", label: "Group Stage + Knockout", desc: "Round-robin groups \u2192 top 2 advance to knockout." }
    ];
    this.platforms = [
      { value: "", label: "Any / unspecified" },
      { value: "psn", label: "PlayStation" },
      { value: "xbox", label: "Xbox" },
      { value: "pc", label: "PC" },
      { value: "mobile", label: "Mobile" },
      { value: "cross", label: "Cross-platform" }
    ];
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
      name: ["", [Validators.required, Validators.maxLength(150)]],
      name_ar: ["", Validators.maxLength(150)],
      game: ["ea_fc25", Validators.required],
      platform: [""],
      format: ["single_elimination", Validators.required],
      max_participants: [16, [Validators.required, Validators.min(2), Validators.max(512)]],
      swiss_rounds: [5],
      registration_closes_at: [this.dt(24), Validators.required],
      starts_at: [this.dt(48), Validators.required],
      timezone: ["Asia/Riyadh"],
      is_public: [true],
      entry_fee_sar: [0, [Validators.min(0)]],
      prize_1: [""],
      prize_2: [""],
      prize_3: [""],
      prize_4: [""],
      prize_5: [""],
      // Sprint 3
      rules: [""],
      brand_override: [false],
      primary_color: [""],
      secondary_color: [""],
      font_family: [""]
    });
    this.coverFile = signal(null);
    this.coverPreview = signal(null);
    this.canBrand = signal(false);
    this.isSwiss = computed(() => this.form.value.format === "swiss");
    this.brandEnabled = computed(() => this.form.value.brand_override && this.canBrand());
  }
  ngOnInit() {
    this.http.get(`${API}/games/active`).subscribe((res) => {
      if (res?.data?.length) {
        this.games.set(res.data.map((g) => ({
          value: g.key,
          label: g.name,
          emoji: g.icon_emoji ?? "\u{1F3AE}"
        })));
      }
    });
    this.http.get(`${API}/companies/mine`).subscribe({
      next: (res) => this.canBrand.set(res?.data?.has_branding !== void 0),
      error: () => this.canBrand.set(false)
    });
  }
  onCoverSelected(event) {
    const file = event.target.files?.[0] ?? null;
    if (!file)
      return;
    if (file.size > 5 * 1024 * 1024) {
      this.toast.error("Cover must be under 5MB.");
      return;
    }
    this.coverFile.set(file);
    const reader = new FileReader();
    reader.onload = () => this.coverPreview.set(reader.result);
    reader.readAsDataURL(file);
  }
  removeCover() {
    this.coverFile.set(null);
    this.coverPreview.set(null);
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const v = this.form.value;
    const prize_pool = [];
    if (v.prize_1)
      prize_pool.push({ position: 1, reward: v.prize_1 });
    if (v.prize_2)
      prize_pool.push({ position: 2, reward: v.prize_2 });
    if (v.prize_3)
      prize_pool.push({ position: 3, reward: v.prize_3 });
    if (v.prize_4)
      prize_pool.push({ position: 4, reward: v.prize_4 });
    if (v.prize_5)
      prize_pool.push({ position: 5, reward: v.prize_5 });
    const payload = {
      name: v.name,
      name_ar: v.name_ar || null,
      game: v.game,
      platform: v.platform || null,
      format: v.format,
      max_participants: v.max_participants,
      swiss_rounds: this.isSwiss() ? v.swiss_rounds : null,
      registration_closes_at: new Date(v.registration_closes_at).toISOString(),
      starts_at: new Date(v.starts_at).toISOString(),
      timezone: v.timezone,
      is_public: v.is_public,
      entry_fee_sar: v.entry_fee_sar,
      prize_pool: prize_pool.length ? prize_pool : null,
      rules: v.rules || null
    };
    this.api.createTournament(payload).subscribe({
      next: (res) => {
        const created = res.data;
        this.postCreateChain(created);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err.error?.message ?? "Failed to create tournament.");
      }
    });
  }
  /**
   * Post-create: upload cover (if any), set brand override (if any), then redirect.
   * Failures in these secondary steps are surfaced but don't block the redirect —
   * the user can retry from the tournament detail page.
   */
  postCreateChain(created) {
    const id = created.id;
    const coverUpload$ = this.coverFile() ? this.http.post(`${API}/tournaments/${id}/cover`, (() => {
      const f = new FormData();
      f.append("file", this.coverFile());
      return f;
    })()) : null;
    const brandUpdate$ = this.brandEnabled() && (this.form.value.primary_color || this.form.value.font_family) ? this.http.patch(`${API}/tournaments/${id}/brand`, {
      brand_override: true,
      primary_color: this.form.value.primary_color || null,
      secondary_color: this.form.value.secondary_color || null,
      font_family: this.form.value.font_family || null
    }) : null;
    const finish = () => {
      this.saving.set(false);
      this.toast.success("Tournament created!");
      this.router.navigate(["/tournaments", id]);
    };
    if (coverUpload$) {
      coverUpload$.subscribe({
        next: () => {
          if (brandUpdate$) {
            brandUpdate$.subscribe({ next: finish, error: finish });
          } else
            finish();
        },
        error: () => {
          this.toast.warning("Created, but cover failed to upload.");
          finish();
        }
      });
    } else if (brandUpdate$) {
      brandUpdate$.subscribe({ next: finish, error: finish });
    } else {
      finish();
    }
  }
  dt(hoursFromNow) {
    const d = new Date(Date.now() + hoursFromNow * 60 * 60 * 1e3);
    const off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60 * 1e3).toISOString().slice(0, 16);
  }
  static {
    this.\u0275fac = function CreateTournamentComponent_Factory(t) {
      return new (t || _CreateTournamentComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateTournamentComponent, selectors: [["app-create-tournament"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 183, vars: 10, consts: [[1, "ct-page"], [1, "ct-header"], ["routerLink", "/tournaments", 1, "ct-back"], [1, "ct-title"], [1, "ct-sub"], ["novalidate", "", 1, "ct-form", 3, "ngSubmit", "formGroup"], [1, "ct-section"], [1, "ct-section__head"], [1, "ct-section__num"], [1, "ct-section__title"], [1, "ct-section__desc"], [1, "ct-section__body"], [1, "field-row"], [1, "field", "field--grow"], [1, "label"], [1, "req"], ["formControlName", "name", "placeholder", "Spring Showdown 2026", "maxlength", "150", 1, "input"], [1, "field"], ["formControlName", "name_ar", "dir", "rtl", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0628\u0637\u0648\u0644\u0629", "maxlength", "150", 1, "input"], ["formControlName", "description", "placeholder", "A brief description shown on the tournament card\u2026", "maxlength", "500", 1, "input"], [1, "hint"], [1, "game-picker"], [1, "game-opt", 3, "game-opt--active"], ["formControlName", "platform", 1, "input", 2, "max-width", "240px"], [3, "value"], [1, "format-picker"], [1, "format-opt", 3, "format-opt--active"], ["type", "datetime-local", "formControlName", "registration_closes_at", 1, "input"], ["type", "datetime-local", "formControlName", "starts_at", 1, "input"], ["type", "number", "min", "2", "max", "512", "formControlName", "max_participants", 1, "input"], ["formControlName", "timezone", 1, "input"], ["type", "number", "min", "0", "formControlName", "entry_fee_sar", 1, "input"], ["formControlName", "rules", "rows", "8", "maxlength", "10000", "placeholder", "Example:\n1. Be respectful to opponents.\n2. Matches must be played within 48 hours of the scheduled time.\n3. Any form of cheating results in immediate disqualification.\n4. Screenshot evidence is required for all disputed results.\n5. The organizer's decision is final.", 1, "input", "input--textarea"], [1, "cover-uploader"], [1, "cover-preview"], [1, "locked-badge"], ["formControlName", "prize_1", "placeholder", "e.g. 500 SAR PSN voucher", 1, "input"], ["formControlName", "prize_2", "placeholder", "e.g. 300 SAR", 1, "input"], ["formControlName", "prize_3", "placeholder", "e.g. 150 SAR", 1, "input"], ["formControlName", "prize_4", "placeholder", "e.g. 100 SAR", 1, "input"], ["formControlName", "prize_5", "placeholder", "e.g. 50 SAR", 1, "input"], [1, "ct-actions"], ["routerLink", "/tournaments", 1, "btn", "btn--ghost"], ["type", "submit", 1, "btn", "btn--gold", "btn--lg", 3, "disabled"], [1, "game-opt"], ["type", "radio", "formControlName", "game", 3, "value"], [1, "game-opt__emoji"], [1, "game-opt__label"], [1, "format-opt"], ["type", "radio", "formControlName", "format", 3, "value"], [1, "format-opt__name"], [1, "format-opt__desc"], ["type", "number", "min", "1", "max", "15", "formControlName", "swiss_rounds", 1, "input"], ["alt", "Cover preview", 3, "src"], ["type", "button", "aria-label", "Remove", 1, "cover-preview__remove", 3, "click"], [1, "cover-drop"], ["type", "file", "accept", "image/jpeg,image/png,image/webp", 3, "change"], [1, "cover-drop__inner"], [1, "cover-drop__icon"], [1, "cover-drop__prompt"], [1, "cover-drop__hint"], [1, "toggle"], ["type", "checkbox", "formControlName", "brand_override"], [1, "toggle__slider"], [1, "toggle__label"], [1, "brand-grid"], ["type", "color", "formControlName", "primary_color", 1, "input", "input--color"], ["type", "color", "formControlName", "secondary_color", 1, "input", "input--color"], ["formControlName", "font_family", 1, "input"], ["value", ""], [1, "brand-preview"], [1, "brand-preview__swatch", 2, "background", "var(--p)"], [1, "brand-preview__swatch", 2, "background", "var(--s)", "color", "#0b1022"], [1, "brand-preview__type"], [1, "upsell"], ["routerLink", "/subscription/plans", 1, "btn", "btn--gold"]], template: function CreateTournamentComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "a", 2);
        \u0275\u0275text(3, "\u2190 Back to Tournaments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, "Create Tournament");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, "Fill the essentials below \u2014 sections stack vertically, scroll to any.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "form", 5);
        \u0275\u0275listener("ngSubmit", function CreateTournamentComponent_Template_form_ngSubmit_8_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(9, "section", 6)(10, "div", 7)(11, "span", 8);
        \u0275\u0275text(12, "1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div")(14, "h2", 9);
        \u0275\u0275text(15, "Basics");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p", 10);
        \u0275\u0275text(17, "Name, game, and tournament format.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "div", 11)(19, "div", 12)(20, "div", 13)(21, "label", 14);
        \u0275\u0275text(22, "Tournament Name ");
        \u0275\u0275elementStart(23, "span", 15);
        \u0275\u0275text(24, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(25, "input", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "div", 17)(27, "label", 14);
        \u0275\u0275text(28, "Arabic Name (optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "input", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 17)(31, "label", 14);
        \u0275\u0275text(32, "Short Description (optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(33, "input", 19);
        \u0275\u0275elementStart(34, "small", 20);
        \u0275\u0275text(35, "Shown on the tournament listing page. Max 500 characters.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 17)(37, "label", 14);
        \u0275\u0275text(38, "Game ");
        \u0275\u0275elementStart(39, "span", 15);
        \u0275\u0275text(40, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "div", 21);
        \u0275\u0275repeaterCreate(42, CreateTournamentComponent_For_43_Template, 6, 5, "label", 22, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 17)(45, "label", 14);
        \u0275\u0275text(46, "Platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "select", 23);
        \u0275\u0275repeaterCreate(48, CreateTournamentComponent_For_49_Template, 2, 2, "option", 24, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "small", 20);
        \u0275\u0275text(51, "Optional \u2014 restrict the tournament to players on a specific platform.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 17)(53, "label", 14);
        \u0275\u0275text(54, "Format ");
        \u0275\u0275elementStart(55, "span", 15);
        \u0275\u0275text(56, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(57, "div", 25);
        \u0275\u0275repeaterCreate(58, CreateTournamentComponent_For_59_Template, 6, 5, "label", 26, _forTrack0);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(60, "section", 6)(61, "div", 7)(62, "span", 8);
        \u0275\u0275text(63, "2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "div")(65, "h2", 9);
        \u0275\u0275text(66, "Schedule & Capacity");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "p", 10);
        \u0275\u0275text(68, "When it opens, closes, and how many can join.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(69, "div", 11)(70, "div", 12)(71, "div", 17)(72, "label", 14);
        \u0275\u0275text(73, "Registration Closes ");
        \u0275\u0275elementStart(74, "span", 15);
        \u0275\u0275text(75, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(76, "input", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "div", 17)(78, "label", 14);
        \u0275\u0275text(79, "Tournament Starts ");
        \u0275\u0275elementStart(80, "span", 15);
        \u0275\u0275text(81, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(82, "input", 28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(83, "div", 12)(84, "div", 17)(85, "label", 14);
        \u0275\u0275text(86, "Max Participants ");
        \u0275\u0275elementStart(87, "span", 15);
        \u0275\u0275text(88, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(89, "input", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275template(90, CreateTournamentComponent_Conditional_90_Template, 4, 0, "div", 17);
        \u0275\u0275elementStart(91, "div", 17)(92, "label", 14);
        \u0275\u0275text(93, "Timezone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(94, "select", 30);
        \u0275\u0275repeaterCreate(95, CreateTournamentComponent_For_96_Template, 2, 2, "option", 24, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(97, "div", 17)(98, "label", 14);
        \u0275\u0275text(99, "Entry Fee (SAR)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(100, "input", 31);
        \u0275\u0275elementStart(101, "small", 20);
        \u0275\u0275text(102, "Set 0 for free tournaments.");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(103, "section", 6)(104, "div", 7)(105, "span", 8);
        \u0275\u0275text(106, "3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(107, "div")(108, "h2", 9);
        \u0275\u0275text(109, "Rules & Conditions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(110, "p", 10);
        \u0275\u0275text(111, "Players will see these before registering and must accept them.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(112, "div", 11)(113, "div", 17)(114, "label", 14);
        \u0275\u0275text(115, "Rules (optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(116, "textarea", 32);
        \u0275\u0275elementStart(117, "small", 20);
        \u0275\u0275text(118, "Plain text. Line breaks are preserved. Maximum 10,000 characters.");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(119, "section", 6)(120, "div", 7)(121, "span", 8);
        \u0275\u0275text(122, "4");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(123, "div")(124, "h2", 9);
        \u0275\u0275text(125, "Cover Image");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "p", 10);
        \u0275\u0275text(127, "Optional. A good cover makes your tournament stand out.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(128, "div", 11)(129, "div", 33);
        \u0275\u0275template(130, CreateTournamentComponent_Conditional_130_Template, 4, 1, "div", 34)(131, CreateTournamentComponent_Conditional_131_Template, 9, 0);
        \u0275\u0275elementStart(132, "p", 20);
        \u0275\u0275text(133, "If no cover is uploaded, a game-specific gradient will be used automatically.");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(134, "section", 6)(135, "div", 7)(136, "span", 8);
        \u0275\u0275text(137, "5");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(138, "div")(139, "h2", 9);
        \u0275\u0275text(140, "Branding ");
        \u0275\u0275template(141, CreateTournamentComponent_Conditional_141_Template, 2, 0, "span", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(142, "p", 10);
        \u0275\u0275template(143, CreateTournamentComponent_Conditional_143_Template, 1, 0)(144, CreateTournamentComponent_Conditional_144_Template, 1, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(145, "div", 11);
        \u0275\u0275template(146, CreateTournamentComponent_Conditional_146_Template, 6, 1)(147, CreateTournamentComponent_Conditional_147_Template, 12, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(148, "section", 6)(149, "div", 7)(150, "span", 8);
        \u0275\u0275text(151, "6");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(152, "div")(153, "h2", 9);
        \u0275\u0275text(154, "Prizes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(155, "p", 10);
        \u0275\u0275text(156, "Optional. Describe up to three prize tiers.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(157, "div", 11)(158, "div", 17)(159, "label", 14);
        \u0275\u0275text(160, "\u{1F947} 1st Place");
        \u0275\u0275elementEnd();
        \u0275\u0275element(161, "input", 36);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(162, "div", 17)(163, "label", 14);
        \u0275\u0275text(164, "\u{1F948} 2nd Place");
        \u0275\u0275elementEnd();
        \u0275\u0275element(165, "input", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(166, "div", 17)(167, "label", 14);
        \u0275\u0275text(168, "\u{1F949} 3rd Place");
        \u0275\u0275elementEnd();
        \u0275\u0275element(169, "input", 38);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(170, "div", 17)(171, "label", 14);
        \u0275\u0275text(172, "4th Place (optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(173, "input", 39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(174, "div", 17)(175, "label", 14);
        \u0275\u0275text(176, "5th Place (optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(177, "input", 40);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(178, "div", 41)(179, "a", 42);
        \u0275\u0275text(180, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(181, "button", 43);
        \u0275\u0275text(182);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(34);
        \u0275\u0275repeater(ctx.games());
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.platforms);
        \u0275\u0275advance(10);
        \u0275\u0275repeater(ctx.formats);
        \u0275\u0275advance(32);
        \u0275\u0275conditional(90, ctx.isSwiss() ? 90 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.timezones);
        \u0275\u0275advance(35);
        \u0275\u0275conditional(130, ctx.coverPreview() ? 130 : 131);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("ct-section--locked", !ctx.canBrand());
        \u0275\u0275advance(7);
        \u0275\u0275conditional(141, !ctx.canBrand() ? 141 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(143, ctx.canBrand() ? 143 : 144);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(146, ctx.canBrand() ? 146 : 147);
        \u0275\u0275advance(35);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.saving());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Creating\u2026" : "Create Tournament", " ");
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, MinValidator, MaxValidator, FormGroupDirective, FormControlName, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  --gold: #a855f7;\n  --cyan: #fbbf24;\n  --green: #22c55e;\n  --red: #ef4444;\n  --bg: #0b1022;\n  --bg2: #12182e;\n  --bg3: #1a2040;\n  --bg4: #232a4f;\n  --br: #2d3560;\n  --br2: #3d4670;\n  --text: #e4e6f0;\n  --mu: #8a90a8;\n  --dim: #4a5268;\n  --fh:\n    "Bebas Neue",\n    "Rajdhani",\n    sans-serif;\n  --fb: "Rajdhani", sans-serif;\n  --fm: "Space Mono", monospace;\n}\n.ct-page[_ngcontent-%COMP%] {\n  max-width: 820px;\n  margin: 0 auto;\n  padding: 28px 24px 80px;\n  color: var(--text);\n  font-family: var(--fb);\n}\n.ct-header[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.ct-back[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.88rem;\n  text-decoration: none;\n}\n.ct-back[_ngcontent-%COMP%]:hover {\n  color: var(--cyan);\n}\n.ct-title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  font-weight: 900;\n  letter-spacing: 2px;\n  margin: 10px 0 6px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold) 0%,\n      var(--cyan) 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.ct-sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  margin: 0;\n}\n.ct-section[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 12px;\n  margin-bottom: 16px;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_section-in 0.3s cubic-bezier(0.2, 0.7, 0.2, 1) both;\n}\n.ct-section__head[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  padding: 18px 20px;\n  border-bottom: 1px solid var(--br);\n  background:\n    linear-gradient(\n      90deg,\n      rgba(168, 85, 247, 0.05),\n      transparent 60%);\n}\n.ct-section__head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.2rem;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  margin: 0;\n}\n.ct-section__head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--mu);\n  margin: 2px 0 0;\n}\n.ct-section__num[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 34px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold) 0%,\n      rgba(168, 85, 247, 0.7) 100%);\n  color: #1a1208;\n  font-family: var(--fh);\n  font-weight: 900;\n  font-size: 1.2rem;\n  border-radius: 50%;\n  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);\n}\n.ct-section__body[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.ct-section--locked[_ngcontent-%COMP%]   .ct-section__head[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(167, 139, 250, 0.08),\n      transparent 60%);\n}\n.ct-section--locked[_ngcontent-%COMP%]   .ct-section__num[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a78bfa,\n      #7c68e0);\n  color: #fff;\n}\n.locked-badge[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.65rem;\n  padding: 2px 8px;\n  border-radius: 4px;\n  background: rgba(167, 139, 250, 0.15);\n  color: #a78bfa;\n  letter-spacing: 1px;\n  margin-left: 8px;\n  vertical-align: middle;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n}\n.field--grow[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.field-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  flex-wrap: wrap;\n}\n.field-row[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.label[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  color: var(--mu);\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n}\n.req[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--mu);\n  margin-top: 2px;\n}\n.input[_ngcontent-%COMP%] {\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 6px;\n  padding: 10px 12px;\n  color: var(--text);\n  font-family: var(--fb);\n  font-size: 0.95rem;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  color-scheme: dark;\n}\n.input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--cyan);\n  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);\n}\n.input--textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.5;\n  font-family: var(--fb);\n}\n.input--color[_ngcontent-%COMP%] {\n  height: 44px;\n  padding: 4px;\n  cursor: pointer;\n}\n.game-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 10px;\n}\n.game-opt[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 14px;\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 10px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.15s;\n}\n.game-opt[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.game-opt__emoji[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n}\n.game-opt__label[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-weight: 700;\n  letter-spacing: 1px;\n  font-size: 0.95rem;\n}\n.game-opt[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2);\n  transform: translateY(-1px);\n}\n.game-opt--active[_ngcontent-%COMP%] {\n  border-color: var(--gold);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.1),\n      transparent 70%);\n  box-shadow: 0 0 14px rgba(168, 85, 247, 0.2);\n}\n.format-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.format-opt[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 12px 14px;\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  transition: all 0.15s;\n}\n.format-opt[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.format-opt__name[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-weight: 700;\n  letter-spacing: 1px;\n  font-size: 0.92rem;\n}\n.format-opt__desc[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mu);\n}\n.format-opt[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2);\n}\n.format-opt--active[_ngcontent-%COMP%] {\n  border-color: var(--cyan);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(251, 191, 36, 0.08),\n      transparent 70%);\n}\n.cover-uploader[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.cover-drop[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  aspect-ratio: 16/9;\n  background: var(--bg);\n  border: 2px dashed var(--br2);\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.15s;\n  overflow: hidden;\n}\n.cover-drop[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  cursor: pointer;\n}\n.cover-drop__inner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 10px;\n}\n.cover-drop__icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: 0.5;\n}\n.cover-drop__prompt[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.1rem;\n  letter-spacing: 1.5px;\n  color: var(--text);\n}\n.cover-drop__hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mu);\n}\n.cover-drop[_ngcontent-%COMP%]:hover {\n  border-color: var(--cyan);\n  background: rgba(251, 191, 36, 0.04);\n}\n.cover-drop[_ngcontent-%COMP%]:hover   .cover-drop__icon[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.cover-preview[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 16/9;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid var(--br);\n}\n.cover-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.cover-preview__remove[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: none;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  cursor: pointer;\n  font-size: 0.9rem;\n  transition: background 0.15s;\n}\n.cover-preview__remove[_ngcontent-%COMP%]:hover {\n  background: var(--red);\n}\n.toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.toggle__slider[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 24px;\n  background: var(--bg3);\n  border: 1px solid var(--br);\n  border-radius: 12px;\n  position: relative;\n  transition: background 0.15s;\n}\n.toggle__slider[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  background: var(--mu);\n  border-radius: 50%;\n  transition: all 0.2s;\n}\ninput[_ngcontent-%COMP%]:checked    + .toggle__slider[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  border-color: var(--gold);\n}\ninput[_ngcontent-%COMP%]:checked    + .toggle__slider[_ngcontent-%COMP%]::after {\n  left: 22px;\n  background: var(--gold);\n}\n.toggle__label[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n}\n.brand-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto 1fr;\n  gap: 14px;\n  align-items: end;\n}\n.brand-preview[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding: 16px;\n  background: var(--bg);\n  border: 1px solid var(--br);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--ff, var(--fh));\n}\n.brand-preview__swatch[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border-radius: 6px;\n  color: #1a1208;\n  font-weight: 900;\n  letter-spacing: 1px;\n  font-size: 0.9rem;\n}\n.brand-preview__type[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 1.2rem;\n  color: var(--text);\n}\n.upsell[_ngcontent-%COMP%] {\n  padding: 16px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(167, 139, 250, 0.08),\n      transparent 70%);\n  border: 1px solid rgba(167, 139, 250, 0.25);\n  border-radius: 8px;\n}\n.upsell[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  color: var(--text);\n}\n.upsell[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  padding-left: 22px;\n  color: var(--mu);\n  font-size: 0.9rem;\n  line-height: 1.7;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 6px;\n  border: none;\n  font-family: var(--fh);\n  font-weight: 900;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  text-decoration: none;\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.2s;\n}\n.btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--gold[_ngcontent-%COMP%] {\n  background: var(--gold);\n  color: #1a1208;\n  font-size: 0.95rem;\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text);\n  border: 1px solid var(--br);\n}\n.btn--lg[_ngcontent-%COMP%] {\n  padding: 14px 28px;\n  font-size: 1rem;\n}\n.ct-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 18px 0;\n  margin-top: 10px;\n}\n@keyframes _ngcontent-%COMP%_section-in {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 640px) {\n  .format-picker[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .brand-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=create-tournament.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateTournamentComponent, { className: "CreateTournamentComponent", filePath: "src\\app\\pages\\tournaments\\create-tournament.component.ts", lineNumber: 38 });
})();
export {
  CreateTournamentComponent
};
//# sourceMappingURL=chunk-QURWXKJP.js.map
