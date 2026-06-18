import {
  GAME_LABELS
} from "./chunk-7NGWYCOU.js";
import {
  TeamService
} from "./chunk-5HMXBCYT.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-LNNIKBGT.js";
import "./chunk-OERRWE4S.js";
import {
  Router,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/teams/team-create-page.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function TeamCreatePageComponent_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function TeamCreatePageComponent_For_27_Template_button_click_0_listener() {
      const g_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.form.game = g_r2.value);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.form.game === g_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r2.label);
  }
}
var TeamCreatePageComponent = class _TeamCreatePageComponent {
  constructor() {
    this.svc = inject(TeamService);
    this.toast = inject(ToastService);
    this.router = inject(Router);
    this.games = Object.entries(GAME_LABELS).map(([value, label]) => ({ value, label }));
    this.submitting = signal(false);
    this.form = { name: "", tag: "", game: "ea_fc25", region: "", description: "", logo_url: "" };
  }
  canSubmit() {
    return this.form.name.trim().length >= 2 && !!this.form.game;
  }
  submit() {
    if (!this.canSubmit() || this.submitting())
      return;
    this.submitting.set(true);
    this.svc.create({
      name: this.form.name.trim(),
      tag: this.form.tag.trim() || null,
      game: this.form.game,
      region: this.form.region.trim() || null,
      description: this.form.description.trim() || null,
      logo_url: this.form.logo_url.trim() || null
    }).subscribe({
      next: (r) => {
        this.submitting.set(false);
        this.toast.success(`Team ${r.data.name} created.`);
        this.router.navigate(["/teams", r.data.slug]);
      },
      error: (e) => {
        const msg = e?.error?.message ?? Object.values(e?.error?.errors ?? {}).flat()[0] ?? "Could not create team.";
        this.toast.error(msg);
        this.submitting.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function TeamCreatePageComponent_Factory(t) {
      return new (t || _TeamCreatePageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamCreatePageComponent, selectors: [["app-team-create-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 46, vars: 7, consts: [[1, "tc-shell"], [1, "tc-head"], [1, "tc-eyebrow"], [1, "tc-title"], ["routerLink", "/teams", 1, "tc-link"], [1, "tc-card", 3, "ngSubmit"], [1, "tc-row"], [1, "tc-f"], ["name", "name", "maxlength", "100", "required", "", "placeholder", "e.g. Riyadh Vipers", 3, "ngModelChange", "ngModel"], ["name", "tag", "maxlength", "10", "placeholder", "e.g. RVP", 3, "ngModelChange", "ngModel"], [1, "tc-l"], [1, "tc-games"], ["type", "button", 1, "tc-game", 3, "active"], ["name", "region", "maxlength", "80", "placeholder", "e.g. KSA, GCC, MENA", 3, "ngModelChange", "ngModel"], ["name", "logo_url", "type", "url", "maxlength", "500", "placeholder", "https://", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "3", "maxlength", "500", "placeholder", "Who you are, what you play, what you're looking for.", 3, "ngModelChange", "ngModel"], [1, "tc-actions"], ["routerLink", "/teams", 1, "tc-btn", "tc-btn--ghost"], ["type", "submit", 1, "tc-btn", "tc-btn--primary", 3, "disabled"], ["type", "button", 1, "tc-game", 3, "click"]], template: function TeamCreatePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Compete");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Create Team");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 4);
        \u0275\u0275text(8, "\u2190 Back to teams");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "form", 5);
        \u0275\u0275listener("ngSubmit", function TeamCreatePageComponent_Template_form_ngSubmit_9_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(10, "div", 6)(11, "label", 7)(12, "span");
        \u0275\u0275text(13, "Team name ");
        \u0275\u0275elementStart(14, "em");
        \u0275\u0275text(15, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function TeamCreatePageComponent_Template_input_ngModelChange_16_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "label", 7)(18, "span");
        \u0275\u0275text(19, "Tag");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function TeamCreatePageComponent_Template_input_ngModelChange_20_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.tag, $event) || (ctx.form.tag = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "span", 10);
        \u0275\u0275text(22, "Primary game ");
        \u0275\u0275elementStart(23, "em");
        \u0275\u0275text(24, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 11);
        \u0275\u0275repeaterCreate(26, TeamCreatePageComponent_For_27_Template, 2, 3, "button", 12, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 6)(29, "label", 7)(30, "span");
        \u0275\u0275text(31, "Region");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function TeamCreatePageComponent_Template_input_ngModelChange_32_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.region, $event) || (ctx.form.region = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "label", 7)(34, "span");
        \u0275\u0275text(35, "Logo URL");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function TeamCreatePageComponent_Template_input_ngModelChange_36_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.logo_url, $event) || (ctx.form.logo_url = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "label", 7)(38, "span");
        \u0275\u0275text(39, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "textarea", 15);
        \u0275\u0275twoWayListener("ngModelChange", function TeamCreatePageComponent_Template_textarea_ngModelChange_40_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.description, $event) || (ctx.form.description = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "div", 16)(42, "a", 17);
        \u0275\u0275text(43, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "button", 18);
        \u0275\u0275text(45);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.tag);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.games);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.region);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.logo_url);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.description);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.submitting() || !ctx.canSubmit());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.submitting() ? "Creating\u2026" : "Create team", " ");
      }
    }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text, #ececf1);\n}\n.tc-shell[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1.5rem 1.5rem 4rem;\n}\n.tc-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.1rem;\n  flex-wrap: wrap;\n}\n.tc-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  margin-bottom: 5px;\n}\n.tc-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(26px, 3.4vw, 34px);\n  letter-spacing: .8px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.tc-link[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  text-decoration: none;\n  &:hover {\n    color: var(--text);\n  }\n}\n.tc-card[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-radius: 14px;\n  padding: 20px 22px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.tc-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n@media (max-width: 540px) {\n  .tc-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.tc-l[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n  em {\n    color: #fca5a5;\n    font-style: normal;\n  }\n}\n.tc-f[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  span {\n    font-family: var(--fm, monospace);\n    font-size: 10px;\n    letter-spacing: 1.3px;\n    text-transform: uppercase;\n    color: var(--mu, #8a8aa0);\n    em {\n      color: #fca5a5;\n      font-style: normal;\n    }\n  }\n  input,\n  textarea {\n    background: var(--bg3, #181826);\n    border: 1px solid var(--br2, rgba(255,255,255,.14));\n    border-radius: 8px;\n    padding: 10px 12px;\n    color: var(--text);\n    font-size: 13px;\n    outline: none;\n    font-family: inherit;\n    &:focus {\n      border-color: var(--primary, #006c35);\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n}\n.tc-games[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.tc-game[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 12.5px;\n  font-weight: 600;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  color: var(--text);\n  &:hover {\n    border-color: var(--br2, rgba(255,255,255,.14));\n  }\n  &.active {\n    border-color: var(--primary, #006c35);\n    background: rgba(0, 108, 53, .14);\n    color: #4ade80;\n    font-weight: 700;\n  }\n}\n.tc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n}\n.tc-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 10px;\n  border: 1px solid transparent;\n  font-weight: 700;\n  font-size: 14px;\n  cursor: pointer;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.tc-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.tc-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n/*# sourceMappingURL=team-create-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamCreatePageComponent, { className: "TeamCreatePageComponent", filePath: "src\\app\\features\\teams\\team-create-page.component.ts", lineNumber: 91 });
})();
export {
  TeamCreatePageComponent
};
//# sourceMappingURL=chunk-JS7SQOX2.js.map
