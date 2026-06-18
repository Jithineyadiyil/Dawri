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
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/contact/contact.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.label;
function ContactComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1, "Please enter your name (2\u201380 characters).");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1, "Please enter a valid email address.");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    \u0275\u0275property("value", s_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r1.label);
  }
}
function ContactComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1, "Message must be between 10 and 1000 characters.");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 35);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Sending\u2026");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Send message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 36);
    \u0275\u0275text(3, "\u2192");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_For_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 33)(1, "span", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275property("href", s_r2.href, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("aria-label", s_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.label);
  }
}
function ContactComponent_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx;
    \u0275\u0275classProp("toast--ok", t_r3.ok)("toast--err", !t_r3.ok);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r3.msg, " ");
  }
}
var ContactComponent = class _ContactComponent {
  constructor(fb) {
    this.fb = fb;
    this.submitting = signal(false);
    this.toast = signal(null);
    this.charCount = signal(0);
    this.company = {
      email: "support@dawri.com.sa",
      sales: "sales@dawri.com.sa",
      phone: "+966 55 000 0000",
      address: "King Fahd Road, Al Olaya, Riyadh 12211, Saudi Arabia",
      addressAr: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062F\u060C \u0627\u0644\u0639\u0644\u064A\u0627\u060C \u0627\u0644\u0631\u064A\u0627\u0636 \u0661\u0662\u0662\u0661\u0661\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
      hours: "Sunday \u2013 Thursday, 9:00 AM \u2013 6:00 PM (AST)",
      hoursAr: "\u0627\u0644\u0623\u062D\u062F \u0625\u0644\u0649 \u0627\u0644\u062E\u0645\u064A\u0633\u060C \u0669:\u0660\u0660 \u0635\u0628\u0627\u062D\u064B\u0627 \u2013 \u0666:\u0660\u0660 \u0645\u0633\u0627\u0621\u064B (\u0628\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629)",
      socials: [
        { label: "Twitter / X", href: "https://twitter.com/dawri_gg", icon: "\u{1D54F}" },
        { label: "Instagram", href: "https://instagram.com/dawri.gg", icon: "\u{1F4F7}" },
        { label: "LinkedIn", href: "https://linkedin.com/company/dawri", icon: "\u{1F4BC}" },
        { label: "Discord", href: "https://discord.gg/dawri", icon: "\u{1F4AC}" }
      ]
    };
    this.subjects = [
      { value: "general", label: "General inquiry" },
      { value: "support", label: "Account or technical support" },
      { value: "tournament", label: "Tournament question" },
      { value: "marketplace", label: "Marketplace / order help" },
      { value: "billing", label: "Billing or subscription" },
      { value: "partnership", label: "B2B / partnership opportunity" },
      { value: "press", label: "Press or media" }
    ];
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(120)]],
      subject: ["general", [Validators.required]],
      message: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(1e3)]]
    });
    this.form.get("message")?.valueChanges.subscribe((v) => {
      this.charCount.set((v ?? "").length);
    });
  }
  /** Convenience accessor for template invalid-state styling. */
  invalid(field) {
    const c = this.form.get(field);
    return !!c && c.invalid && (c.dirty || c.touched);
  }
  /**
   * Submit handler.
   *
   * TODO (Sprint 8): replace the simulated delay with a real POST to
   * `/api/v1/contact` once the backend ContactController + ContactMessage
   * model are in place. The form payload shape already matches what the
   * API is planned to accept.
   */
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.flashToast("Please correct the highlighted fields.", false);
      return;
    }
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.form.reset({ subject: "general" });
      this.charCount.set(0);
      this.flashToast(`Thanks \u2014 we'll reply within one business day.`, true);
    }, 700);
  }
  /** Show a toast for 3.5 seconds. */
  flashToast(msg, ok) {
    this.toast.set({ msg, ok });
    setTimeout(() => this.toast.set(null), 3500);
  }
  static {
    this.\u0275fac = function ContactComponent_Factory(t) {
      return new (t || _ContactComponent)(\u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContactComponent, selectors: [["app-contact"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 99, vars: 24, consts: [[1, "contact-page"], [1, "contact-hero"], [1, "contact-hero__title"], [1, "contact-hero__title-ar"], [1, "contact-hero__sub"], [1, "contact-body"], ["novalidate", "", 1, "contact-form", 3, "ngSubmit", "formGroup"], [1, "contact-form__title"], [1, "field-row"], [1, "field"], ["for", "c-name"], ["id", "c-name", "type", "text", "formControlName", "name", "placeholder", "Your name", "autocomplete", "name", "maxlength", "80"], [1, "field__error"], ["for", "c-email"], ["id", "c-email", "type", "email", "formControlName", "email", "placeholder", "you@example.com", "autocomplete", "email", "maxlength", "120"], ["for", "c-subject"], ["id", "c-subject", "formControlName", "subject"], [3, "value"], ["for", "c-message"], [1, "field__count"], ["id", "c-message", "formControlName", "message", "rows", "6", "maxlength", "1000", "placeholder", "Tell us what's on your mind\u2026"], ["type", "submit", 1, "contact-btn", 3, "disabled"], [1, "contact-form__fine"], ["routerLink", "/privacy", 1, "inline-link"], [1, "contact-side"], [1, "side-card"], [1, "side-card__title"], [1, "side-row"], ["aria-hidden", "true", 1, "side-row__icon"], [1, "side-row__body"], [1, "side-row__link", 3, "href"], [1, "side-row__ar"], [1, "socials"], ["target", "_blank", "rel", "noopener noreferrer", 1, "social-chip", 3, "href"], ["role", "status", 1, "toast", 3, "toast--ok", "toast--err"], ["aria-hidden", "true", 1, "spinner"], ["aria-hidden", "true", 1, "contact-btn__arrow"], [1, "social-chip__icon"], ["role", "status", 1, "toast"]], template: function ContactComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
        \u0275\u0275text(3, " Get in touch ");
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, " Questions, feedback, or a B2B opportunity \u2014 we reply within one business day. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "section", 5)(9, "form", 6);
        \u0275\u0275listener("ngSubmit", function ContactComponent_Template_form_ngSubmit_9_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(10, "h2", 7);
        \u0275\u0275text(11, "Send us a message");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "label", 10);
        \u0275\u0275text(15, "Full name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 11);
        \u0275\u0275template(17, ContactComponent_Conditional_17_Template, 2, 0, "small", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 9)(19, "label", 13);
        \u0275\u0275text(20, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "input", 14);
        \u0275\u0275template(22, ContactComponent_Conditional_22_Template, 2, 0, "small", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 9)(24, "label", 15);
        \u0275\u0275text(25, "What's it about?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "select", 16);
        \u0275\u0275repeaterCreate(27, ContactComponent_For_28_Template, 2, 2, "option", 17, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 9)(30, "label", 18);
        \u0275\u0275text(31, " Message ");
        \u0275\u0275elementStart(32, "span", 19);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(34, "textarea", 20);
        \u0275\u0275template(35, ContactComponent_Conditional_35_Template, 2, 0, "small", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "button", 21);
        \u0275\u0275template(37, ContactComponent_Conditional_37_Template, 3, 0)(38, ContactComponent_Conditional_38_Template, 4, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "p", 22);
        \u0275\u0275text(40, " By sending this message you agree to our ");
        \u0275\u0275elementStart(41, "a", 23);
        \u0275\u0275text(42, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(43, ". ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "aside", 24)(45, "div", 25)(46, "h3", 26);
        \u0275\u0275text(47, "Reach us directly");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div", 27)(49, "span", 28);
        \u0275\u0275text(50, "\u2709\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "div", 29)(52, "strong");
        \u0275\u0275text(53, "General support");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "a", 30);
        \u0275\u0275text(55);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(56, "div", 27)(57, "span", 28);
        \u0275\u0275text(58, "\u{1F91D}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "div", 29)(60, "strong");
        \u0275\u0275text(61, "Enterprise & partnerships");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "a", 30);
        \u0275\u0275text(63);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(64, "div", 27)(65, "span", 28);
        \u0275\u0275text(66, "\u{1F4DE}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "div", 29)(68, "strong");
        \u0275\u0275text(69, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "a", 30);
        \u0275\u0275text(71);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(72, "div", 27)(73, "span", 28);
        \u0275\u0275text(74, "\u{1F3E2}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "div", 29)(76, "strong");
        \u0275\u0275text(77, "Head office");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "span");
        \u0275\u0275text(79);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "span", 31);
        \u0275\u0275text(81);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(82, "div", 27)(83, "span", 28);
        \u0275\u0275text(84, "\u{1F550}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "div", 29)(86, "strong");
        \u0275\u0275text(87, "Working hours");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "span");
        \u0275\u0275text(89);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "span", 31);
        \u0275\u0275text(91);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(92, "div", 25)(93, "h3", 26);
        \u0275\u0275text(94, "Follow us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "div", 32);
        \u0275\u0275repeaterCreate(96, ContactComponent_For_97_Template, 5, 4, "a", 33, _forTrack1);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(98, ContactComponent_Conditional_98_Template, 2, 5, "div", 34);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_22_0;
        \u0275\u0275advance(9);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("has-error", ctx.invalid("name"));
        \u0275\u0275advance(4);
        \u0275\u0275conditional(17, ctx.invalid("name") ? 17 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("has-error", ctx.invalid("email"));
        \u0275\u0275advance(4);
        \u0275\u0275conditional(22, ctx.invalid("email") ? 22 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.subjects);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("has-error", ctx.invalid("message"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("", ctx.charCount(), " / 1000");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(35, ctx.invalid("message") ? 35 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.submitting());
        \u0275\u0275advance();
        \u0275\u0275conditional(37, ctx.submitting() ? 37 : 38);
        \u0275\u0275advance(17);
        \u0275\u0275property("href", "mailto:" + ctx.company.email, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.company.email);
        \u0275\u0275advance(7);
        \u0275\u0275property("href", "mailto:" + ctx.company.sales, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.company.sales);
        \u0275\u0275advance(7);
        \u0275\u0275property("href", "tel:" + ctx.company.phone.replace(" ", ""), \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.company.phone);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.company.address);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.company.addressAr);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.company.hours);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.company.hoursAr);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.company.socials);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(98, (tmp_22_0 = ctx.toast()) ? 98 : -1, tmp_22_0);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, RouterLink], styles: [`@charset "UTF-8";



.contact-page[_ngcontent-%COMP%] {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 32px 96px;
  color: var(--tx);
}
.contact-hero[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 48px;
}
.contact-hero__title[_ngcontent-%COMP%] {
  font-family: var(--fh);
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: 0.04em;
  margin: 0 0 12px;
  background:
    linear-gradient(
      120deg,
      var(--gold),
      var(--cyan));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.contact-hero__title-ar[_ngcontent-%COMP%] {
  display: block;
  font-family: var(--fa);
  font-size: 1.1rem;
  color: var(--mu);
  margin-top: 8px;
  -webkit-text-fill-color: initial;
}
.contact-hero__sub[_ngcontent-%COMP%] {
  color: var(--mu);
  font-size: 1rem;
  max-width: 560px;
  margin: 0 auto;
}
.contact-body[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
}
@media (max-width: 860px) {
  .contact-body[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.contact-form[_ngcontent-%COMP%] {
  background: var(--bg2);
  border: 1px solid var(--br);
  border-radius: 18px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.contact-form__title[_ngcontent-%COMP%] {
  font-family: var(--fh);
  font-size: 1.4rem;
  margin: 0 0 8px;
  color: var(--tx);
}
.contact-form__fine[_ngcontent-%COMP%] {
  font-size: 0.78rem;
  color: var(--dim);
  margin: 0;
  text-align: center;
}
.field-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
@media (max-width: 600px) {
  .field-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--mu);
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--br);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--tx);
  font-family: inherit;
  font-size: 0.95rem;
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    background 0.15s;
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15);
  background: rgba(255, 255, 255, 0.05);
}
.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, .field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {
  color: var(--dim);
}
.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}
.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23a855f7' stroke-width='2' fill='none' stroke-linecap='round'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.field.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field.has-error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .field.has-error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  border-color: #f87171;
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.12);
}
.field__error[_ngcontent-%COMP%] {
  color: #f87171;
  font-size: 0.75rem;
}
.field__count[_ngcontent-%COMP%] {
  font-weight: 400;
  font-size: 0.7rem;
  color: var(--dim);
  text-transform: none;
  letter-spacing: 0;
}
.contact-btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background:
    linear-gradient(
      120deg,
      var(--gold),
      #7e22ce);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  font-size: 0.95rem;
  transition:
    transform 0.1s,
    box-shadow 0.2s,
    opacity 0.2s;
  box-shadow: 0 6px 20px -8px rgba(168, 85, 247, 0.6);
}
.contact-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 28px -8px rgba(168, 85, 247, 0.8);
}
.contact-btn[_ngcontent-%COMP%]:active:not(:disabled) {
  transform: translateY(0);
}
.contact-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.contact-btn__arrow[_ngcontent-%COMP%] {
  transition: transform 0.2s;
}
.contact-btn[_ngcontent-%COMP%]:hover:not(:disabled)   .contact-btn__arrow[_ngcontent-%COMP%] {
  transform: translateX(3px);
}
.spinner[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.contact-side[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.side-card[_ngcontent-%COMP%] {
  background: var(--bg2);
  border: 1px solid var(--br);
  border-radius: 18px;
  padding: 24px;
}
.side-card__title[_ngcontent-%COMP%] {
  font-family: var(--fh);
  font-size: 1rem;
  letter-spacing: 0.06em;
  margin: 0 0 18px;
  color: var(--gold);
  text-transform: uppercase;
}
.side-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
}
.side-row[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.side-row__icon[_ngcontent-%COMP%] {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(168, 85, 247, 0.12);
  display: grid;
  place-items: center;
  font-size: 0.95rem;
}
.side-row__body[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.88rem;
  color: var(--tx);
}
.side-row__body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--mu);
  text-transform: uppercase;
  margin-bottom: 2px;
}
.side-row__link[_ngcontent-%COMP%] {
  color: var(--cyan);
  text-decoration: none;
  transition: color 0.15s;
}
.side-row__link[_ngcontent-%COMP%]:hover {
  color: var(--gold);
}
.side-row__ar[_ngcontent-%COMP%] {
  font-family: var(--fa);
  font-size: 0.78rem;
  color: var(--mu);
  direction: rtl;
}
.socials[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.social-chip[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--br);
  border-radius: 10px;
  color: var(--tx);
  text-decoration: none;
  font-size: 0.85rem;
  transition:
    border-color 0.15s,
    background 0.15s,
    transform 0.1s;
}
.social-chip[_ngcontent-%COMP%]:hover {
  border-color: var(--gold);
  background: rgba(168, 85, 247, 0.08);
  transform: translateY(-1px);
}
.social-chip__icon[_ngcontent-%COMP%] {
  font-size: 1rem;
  width: 24px;
  text-align: center;
}
.inline-link[_ngcontent-%COMP%] {
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.inline-link[_ngcontent-%COMP%]:hover {
  color: var(--cyan);
}
.toast[_ngcontent-%COMP%] {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 500;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, 0.4);
  z-index: 100;
  animation: _ngcontent-%COMP%_toast-in 0.25s ease-out;
}
.toast--ok[_ngcontent-%COMP%] {
  background: rgba(52, 211, 153, 0.2);
  border: 1px solid rgba(52, 211, 153, 0.4);
  color: #6ee7b7;
}
.toast--err[_ngcontent-%COMP%] {
  background: rgba(248, 113, 113, 0.2);
  border: 1px solid rgba(248, 113, 113, 0.4);
  color: #fca5a5;
}
@keyframes _ngcontent-%COMP%_toast-in {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .contact-btn[_ngcontent-%COMP%], .social-chip[_ngcontent-%COMP%], .contact-btn__arrow[_ngcontent-%COMP%] {
    transition: none;
  }
  .toast[_ngcontent-%COMP%], .spinner[_ngcontent-%COMP%] {
    animation: none;
  }
}
/*# sourceMappingURL=contact.component.css.map */`], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContactComponent, { className: "ContactComponent", filePath: "src\\app\\pages\\contact\\contact.component.ts", lineNumber: 28 });
})();
export {
  ContactComponent
};
//# sourceMappingURL=chunk-IKA2NNZB.js.map
