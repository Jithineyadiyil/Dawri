import {
  PlatformSponsorService
} from "./chunk-O6BWIF6D.js";
import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import {
  CommonModule,
  DestroyRef,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3NRO4OA5.js";

// src/app/components/platform-sponsors-strip/platform-sponsors-strip.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r1.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r1.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r1.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r1.sponsor.tagline);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12)(1, "div", 13);
    \u0275\u0275template(2, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Conditional_2_Template, 1, 2, "img", 14)(3, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Conditional_4_Template, 2, 1, "span", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    \u0275\u0275property("href", s_r1.sponsor.website_url || "#", \u0275\u0275sanitizeUrl)("target", s_r1.sponsor.website_url ? "_blank" : "_self")("title", s_r1.sponsor.tagline || s_r1.sponsor.name);
    \u0275\u0275attribute("rel", s_r1.sponsor.website_url ? "noopener" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, s_r1.sponsor.logo_url ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(4, s_r1.sponsor.tagline ? 4 : -1);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7);
    \u0275\u0275element(2, "span", 8);
    \u0275\u0275elementStart(3, "span", 9);
    \u0275\u0275element(4, "span", 10);
    \u0275\u0275text(5, " Presented by ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "span", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 11);
    \u0275\u0275repeaterCreate(8, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_For_9_Template, 5, 6, "a", 12, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.titleSponsors());
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r3.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r3.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20)(1, "div", 21);
    \u0275\u0275template(2, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_For_8_Conditional_2_Template, 1, 2, "img", 14)(3, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_For_8_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275property("href", s_r3.sponsor.website_url || "#", \u0275\u0275sanitizeUrl)("target", s_r3.sponsor.website_url ? "_blank" : "_self")("title", s_r3.sponsor.name);
    \u0275\u0275attribute("rel", s_r3.sponsor.website_url ? "noopener" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, s_r3.sponsor.logo_url ? 2 : 3);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 17);
    \u0275\u0275element(2, "span", 8);
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "Also supported by");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 19);
    \u0275\u0275repeaterCreate(7, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_For_8_Template, 4, 5, "a", 20, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.standardSponsors());
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 4);
    \u0275\u0275template(2, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_2_Template, 10, 0, "div", 5)(3, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Conditional_3_Template, 9, 0, "div", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, ctx_r1.titleSponsors().length > 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r1.standardSponsors().length > 0 ? 3 : -1);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_2_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const s_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r4.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r4.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_2_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 25);
    \u0275\u0275template(1, PlatformSponsorsStripComponent_Conditional_0_Conditional_2_For_5_Conditional_1_Template, 1, 2, "img", 14)(2, PlatformSponsorsStripComponent_Conditional_0_Conditional_2_For_5_Conditional_2_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    \u0275\u0275property("href", s_r4.sponsor.website_url || "#", \u0275\u0275sanitizeUrl)("target", s_r4.sponsor.website_url ? "_blank" : "_self")("title", s_r4.sponsor.name);
    \u0275\u0275attribute("rel", s_r4.sponsor.website_url ? "noopener" : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, s_r4.sponsor.logo_url ? 1 : 2);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 23);
    \u0275\u0275text(2, "PARTNERS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24);
    \u0275\u0275repeaterCreate(4, PlatformSponsorsStripComponent_Conditional_0_Conditional_2_For_5_Template, 3, 5, "a", 25, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.allSponsors());
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_3_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r5.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r5.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_3_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.sponsor.name);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_3_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27);
    \u0275\u0275template(1, PlatformSponsorsStripComponent_Conditional_0_Conditional_3_For_5_Conditional_1_Template, 1, 2, "img", 14)(2, PlatformSponsorsStripComponent_Conditional_0_Conditional_3_For_5_Conditional_2_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275property("href", s_r5.sponsor.website_url || "#", \u0275\u0275sanitizeUrl)("target", s_r5.sponsor.website_url ? "_blank" : "_self")("title", s_r5.sponsor.name);
    \u0275\u0275attribute("rel", s_r5.sponsor.website_url ? "noopener" : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, s_r5.sponsor.logo_url ? 1 : 2);
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "span", 23);
    \u0275\u0275text(2, "Platform sponsors");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26);
    \u0275\u0275repeaterCreate(4, PlatformSponsorsStripComponent_Conditional_0_Conditional_3_For_5_Template, 3, 5, "a", 27, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.allSponsors());
  }
}
function PlatformSponsorsStripComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0);
    \u0275\u0275template(1, PlatformSponsorsStripComponent_Conditional_0_Conditional_1_Template, 4, 2, "div", 1)(2, PlatformSponsorsStripComponent_Conditional_0_Conditional_2_Template, 6, 0, "div", 2)(3, PlatformSponsorsStripComponent_Conditional_0_Conditional_3_Template, 6, 0, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-variant", ctx_r1.variant);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.variant === "hero" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ctx_r1.variant === "compact" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r1.variant === "footer" ? 3 : -1);
  }
}
var PlatformSponsorsStripComponent = class _PlatformSponsorsStripComponent {
  constructor() {
    this.service = inject(PlatformSponsorService);
    this.destroyRef = inject(DestroyRef);
    this.variant = "compact";
    this.data = signal(null);
    this.titleSponsors = computed(() => this.data()?.title ?? []);
    this.standardSponsors = computed(() => this.data()?.standard ?? []);
    this.allSponsors = computed(() => [...this.titleSponsors(), ...this.standardSponsors()]);
    this.allCount = computed(() => this.allSponsors().length);
  }
  ngOnInit() {
    this.service.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (d) => this.data.set(d),
      error: () => this.data.set({ title: [], standard: [] })
    });
  }
  static {
    this.\u0275fac = function PlatformSponsorsStripComponent_Factory(t) {
      return new (t || _PlatformSponsorsStripComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlatformSponsorsStripComponent, selectors: [["app-platform-sponsors-strip"]], inputs: { variant: "variant" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [[1, "ps-strip"], [1, "ps-hero"], [1, "ps-compact"], [1, "ps-footer"], [1, "ps-hero__panel"], [1, "ps-title-row"], [1, "ps-standard-row"], [1, "ps-label-frame"], ["aria-hidden", "true", 1, "ps-label-rule"], [1, "ps-presented-by"], ["aria-hidden", "true", 1, "ps-label-dot"], [1, "ps-title-logos"], [1, "ps-title-logo", 3, "href", "target", "title"], [1, "ps-title-glass"], [3, "src", "alt"], [1, "ps-title-tagline"], [1, "ps-name-fallback"], [1, "ps-label-frame", "ps-label-frame--small"], [1, "ps-also-supported"], [1, "ps-standard-logos"], [1, "ps-standard-logo", 3, "href", "target", "title"], [1, "ps-standard-glass"], [1, "ps-name-fallback", "small"], [1, "ps-label"], [1, "ps-compact-logos"], [1, "ps-compact-logo", 3, "href", "target", "title"], [1, "ps-footer-logos"], [1, "ps-footer-logo", 3, "href", "target", "title"], [1, "ps-name-fallback", "tiny"]], template: function PlatformSponsorsStripComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PlatformSponsorsStripComponent_Conditional_0_Template, 4, 4, "section", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.allCount() > 0 ? 0 : -1);
      }
    }, dependencies: [CommonModule], styles: ['\n\n.ps-strip[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.ps-name-fallback[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  letter-spacing: 1.2px;\n  color: #f0a500;\n  font-size: 22px;\n  &.small {\n    font-size: 14px;\n    color: #ccc;\n  }\n  &.tiny {\n    font-size: 11px;\n    color: #888;\n  }\n}\n.ps-hero[_ngcontent-%COMP%] {\n  padding: 56px 24px;\n  background:\n    radial-gradient(\n      circle at 20% 0%,\n      rgba(240, 165, 0, 0.08),\n      transparent 55%),\n    radial-gradient(\n      circle at 80% 100%,\n      rgba(168, 85, 247, 0.10),\n      transparent 55%),\n    linear-gradient(\n      180deg,\n      rgba(15, 15, 30, 0.4) 0%,\n      transparent 100%);\n  border-top: 1px solid rgba(168, 85, 247, 0.15);\n  border-bottom: 1px solid rgba(168, 85, 247, 0.08);\n}\n.ps-hero__panel[_ngcontent-%COMP%] {\n  max-width: 980px;\n  margin: 0 auto;\n  padding: 40px 32px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.04) 0%,\n      rgba(255, 255, 255, 0.01) 100%);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  backdrop-filter: blur(16px) saturate(140%);\n  -webkit-backdrop-filter: blur(16px) saturate(140%);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n  text-align: center;\n}\n.ps-label-frame[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.ps-label-rule[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 80px;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(240, 165, 0, 0.3),\n      transparent);\n}\n.ps-label-frame--small[_ngcontent-%COMP%]   .ps-label-rule[_ngcontent-%COMP%] {\n  max-width: 50px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(168, 85, 247, 0.25),\n      transparent);\n}\n.ps-presented-by[_ngcontent-%COMP%], .ps-also-supported[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  color: #f0a500;\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 13px;\n  letter-spacing: 4px;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n.ps-also-supported[_ngcontent-%COMP%] {\n  color: #a855f7;\n  font-size: 11px;\n  letter-spacing: 3px;\n}\n.ps-label-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #f0a500;\n  box-shadow: 0 0 8px #f0a500;\n  animation: _ngcontent-%COMP%_ps-dot-pulse 2s ease-in-out infinite;\n}\n.ps-title-row[_ngcontent-%COMP%] {\n  margin-bottom: 36px;\n}\n.ps-title-logos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 24px;\n}\n.ps-title-logo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  text-decoration: none;\n  color: inherit;\n  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);\n  &:hover {\n    transform: translateY(-3px);\n  }\n}\n.ps-title-glass[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 140px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(255, 255, 255, 0.06) 0%,\n      rgba(255, 255, 255, 0.02) 100%);\n  border: 1px solid rgba(240, 165, 0, 0.15);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n  transition: border-color 0.3s, box-shadow 0.3s;\n  img {\n    height: auto;\n    width: auto;\n    max-height: 100px;\n    max-width: 100%;\n    object-fit: contain;\n    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));\n  }\n}\n.ps-title-logo[_ngcontent-%COMP%]:hover   .ps-title-glass[_ngcontent-%COMP%] {\n  border-color: rgba(240, 165, 0, 0.4);\n  box-shadow: 0 16px 50px rgba(240, 165, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.ps-title-tagline[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #aaa;\n  letter-spacing: 0.3px;\n  max-width: 180px;\n  text-align: center;\n  line-height: 1.4;\n}\n.ps-standard-row[_ngcontent-%COMP%] {\n  padding-top: 28px;\n  border-top: 1px solid rgba(255, 255, 255, 0.04);\n}\n.ps-standard-logos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n}\n.ps-standard-logo[_ngcontent-%COMP%] {\n  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);\n  opacity: 0.85;\n  &:hover {\n    transform: translateY(-2px);\n    opacity: 1;\n  }\n}\n.ps-standard-glass[_ngcontent-%COMP%] {\n  width: 88px;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  transition: border-color 0.3s, background 0.3s;\n  img {\n    height: auto;\n    width: auto;\n    max-height: 44px;\n    max-width: 100%;\n    object-fit: contain;\n    filter: grayscale(0.3);\n    transition: filter 0.3s;\n  }\n}\n.ps-standard-logo[_ngcontent-%COMP%]:hover   .ps-standard-glass[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.06);\n  border-color: rgba(168, 85, 247, 0.3);\n  img {\n    filter: grayscale(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_ps-dot-pulse {\n  0%, 100% {\n    box-shadow: 0 0 6px #f0a500;\n    opacity: 1;\n  }\n  50% {\n    box-shadow: 0 0 14px #f0a500;\n    opacity: 0.7;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ps-label-dot[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n@media (max-width: 700px) {\n  .ps-hero[_ngcontent-%COMP%] {\n    padding: 36px 16px;\n  }\n  .ps-hero__panel[_ngcontent-%COMP%] {\n    padding: 28px 20px;\n    border-radius: 16px;\n  }\n  .ps-title-glass[_ngcontent-%COMP%] {\n    width: 120px;\n    height: 120px;\n  }\n  .ps-label-rule[_ngcontent-%COMP%] {\n    max-width: 30px !important;\n  }\n}\n.ps-compact[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  background: rgba(15, 18, 36, 0.6);\n  border-radius: 8px;\n  border: 1px solid #1a1a2a;\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.ps-compact[_ngcontent-%COMP%]   .ps-label[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 10px;\n  letter-spacing: 2px;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n.ps-compact-logos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 24px;\n  flex: 1;\n}\n.ps-compact-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  transition: opacity 0.2s ease;\n  opacity: 0.7;\n  img {\n    height: 32px;\n    width: auto;\n    max-width: 100px;\n    object-fit: contain;\n    filter: grayscale(0.5);\n  }\n  &:hover {\n    opacity: 1;\n    img {\n      filter: grayscale(0);\n    }\n  }\n}\n.ps-footer[_ngcontent-%COMP%] {\n  padding: 14px 18px;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.ps-footer[_ngcontent-%COMP%]   .ps-label[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.ps-footer-logos[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.ps-footer-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  transition: opacity 0.2s ease;\n  opacity: 0.5;\n  img {\n    height: 22px;\n    width: auto;\n    max-width: 70px;\n    object-fit: contain;\n    filter: grayscale(1) brightness(0.7);\n  }\n  &:hover {\n    opacity: 1;\n    img {\n      filter: grayscale(0) brightness(1);\n    }\n  }\n}\n/*# sourceMappingURL=platform-sponsors-strip.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlatformSponsorsStripComponent, { className: "PlatformSponsorsStripComponent", filePath: "src\\app\\components\\platform-sponsors-strip\\platform-sponsors-strip.component.ts", lineNumber: 471 });
})();

export {
  PlatformSponsorsStripComponent
};
//# sourceMappingURL=chunk-HAFUZNCS.js.map
