import {
  PlatformSponsorService
} from "./chunk-O6BWIF6D.js";
import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/sponsors/sponsors.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SponsorsComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "div", 26);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading partners\u2026");
    \u0275\u0275elementEnd()();
  }
}
function SponsorsComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 29);
    \u0275\u0275element(3, "path", 7)(4, "circle", 8)(5, "path", 9)(6, "path", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h3");
    \u0275\u0275text(8, "Partner announcements coming soon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10, "Interested in partnering with Dawri?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 30);
    \u0275\u0275text(12, " Get in touch ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 31);
    \u0275\u0275element(14, "path", 23)(15, "path", 24);
    \u0275\u0275elementEnd()()();
  }
}
function SponsorsComponent_Conditional_20_Conditional_0_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 42);
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r1.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r1.sponsor.name);
  }
}
function SponsorsComponent_Conditional_20_Conditional_0_For_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r1.sponsor.name);
  }
}
function SponsorsComponent_Conditional_20_Conditional_0_For_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r1.sponsor.tagline);
  }
}
function SponsorsComponent_Conditional_20_Conditional_0_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 39);
    \u0275\u0275element(1, "div", 40);
    \u0275\u0275elementStart(2, "div", 41);
    \u0275\u0275template(3, SponsorsComponent_Conditional_20_Conditional_0_For_9_Conditional_3_Template, 1, 2, "img", 42)(4, SponsorsComponent_Conditional_20_Conditional_0_For_9_Conditional_4_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, SponsorsComponent_Conditional_20_Conditional_0_For_9_Conditional_7_Template, 2, 1, "p", 44);
    \u0275\u0275elementStart(8, "span", 45);
    \u0275\u0275text(9, " Visit partner ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 46);
    \u0275\u0275element(11, "path", 23)(12, "path", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    \u0275\u0275property("href", s_r1.sponsor.website_url || "#", \u0275\u0275sanitizeUrl)("target", s_r1.sponsor.website_url ? "_blank" : "_self");
    \u0275\u0275attribute("rel", s_r1.sponsor.website_url ? "noopener" : null);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, s_r1.sponsor.logo_url ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r1.sponsor.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, s_r1.sponsor.tagline ? 7 : -1);
  }
}
function SponsorsComponent_Conditional_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 32)(1, "div", 33)(2, "span", 34);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 35);
    \u0275\u0275element(4, "path", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Title Sponsor ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(6, "div", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 38);
    \u0275\u0275repeaterCreate(8, SponsorsComponent_Conditional_20_Conditional_0_For_9_Template, 13, 6, "a", 39, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.titleSponsors());
  }
}
function SponsorsComponent_Conditional_20_Conditional_1_For_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 42);
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", s_r3.sponsor.logo_url, \u0275\u0275sanitizeUrl)("alt", s_r3.sponsor.name);
  }
}
function SponsorsComponent_Conditional_20_Conditional_1_For_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3.sponsor.name);
  }
}
function SponsorsComponent_Conditional_20_Conditional_1_For_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3.sponsor.tagline);
  }
}
function SponsorsComponent_Conditional_20_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 52)(1, "div", 53);
    \u0275\u0275template(2, SponsorsComponent_Conditional_20_Conditional_1_For_9_Conditional_2_Template, 1, 2, "img", 42)(3, SponsorsComponent_Conditional_20_Conditional_1_For_9_Conditional_3_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, SponsorsComponent_Conditional_20_Conditional_1_For_9_Conditional_6_Template, 2, 1, "p", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275property("href", s_r3.sponsor.website_url || "#", \u0275\u0275sanitizeUrl)("target", s_r3.sponsor.website_url ? "_blank" : "_self");
    \u0275\u0275attribute("rel", s_r3.sponsor.website_url ? "noopener" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, s_r3.sponsor.logo_url ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r3.sponsor.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, s_r3.sponsor.tagline ? 6 : -1);
  }
}
function SponsorsComponent_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 32)(1, "div", 33)(2, "span", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 49);
    \u0275\u0275element(4, "polygon", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Supporting Partners ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(6, "div", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 51);
    \u0275\u0275repeaterCreate(8, SponsorsComponent_Conditional_20_Conditional_1_For_9_Template, 7, 6, "a", 52, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.standardSponsors());
  }
}
function SponsorsComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SponsorsComponent_Conditional_20_Conditional_0_Template, 10, 0, "section", 32)(1, SponsorsComponent_Conditional_20_Conditional_1_Template, 10, 0, "section", 32);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r1.titleSponsors().length > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.standardSponsors().length > 0 ? 1 : -1);
  }
}
var SponsorsComponent = class _SponsorsComponent {
  constructor() {
    this.service = inject(PlatformSponsorService);
    this.destroyRef = inject(DestroyRef);
    this.data = signal(null);
    this.loading = signal(true);
    this.titleSponsors = computed(() => this.data()?.title ?? []);
    this.standardSponsors = computed(() => this.data()?.standard ?? []);
    this.allCount = computed(() => this.titleSponsors().length + this.standardSponsors().length);
  }
  ngOnInit() {
    this.service.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (d) => {
        this.data.set(d);
        this.loading.set(false);
      },
      error: () => {
        this.data.set({ title: [], standard: [] });
        this.loading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function SponsorsComponent_Factory(t) {
      return new (t || _SponsorsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SponsorsComponent, selectors: [["app-sponsors"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 43, vars: 1, consts: [[1, "sponsors-page"], ["aria-hidden", "true", 1, "sp-bg"], [1, "sp-bg__orb", "sp-bg__orb--gold"], [1, "sp-bg__orb", "sp-bg__orb--green"], [1, "sp-header"], [1, "sp-eyebrow"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "sp-title"], [1, "sp-subtitle"], [1, "sp-loading"], [1, "sp-cta"], ["aria-hidden", "true", 1, "sp-cta__grid-bg"], ["aria-hidden", "true", 1, "sp-cta__glow"], [1, "sp-cta__content"], [1, "sp-cta__title"], [1, "sp-cta__sub"], [1, "sp-cta__actions"], ["routerLink", "/contact", 1, "sp-btn", "sp-btn--primary"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M5 12h14"], ["d", "m12 5 7 7-7 7"], ["routerLink", "/pricing", 1, "sp-btn", "sp-btn--ghost"], [1, "sp-loading__spinner"], [1, "sp-empty"], [1, "sp-empty__icon"], ["width", "32", "height", "32", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["routerLink", "/contact", 1, "sp-contact-link"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "sp-tier"], [1, "sp-tier__head"], [1, "sp-tier__badge", "sp-tier__badge--title"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M2 20h20v2H2v-2zm2-4h16l1-9-5 3-4-6-4 6-5-3 1 9z"], [1, "sp-tier__line"], [1, "sp-title-grid"], [1, "sp-title-card", 3, "href", "target"], ["aria-hidden", "true", 1, "sp-title-card__glow"], [1, "sp-logo-wrap", "sp-logo-wrap--lg"], [3, "src", "alt"], [1, "sp-card-name"], [1, "sp-card-tagline"], [1, "sp-card-link"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "sp-name-fallback", "sp-name-fallback--lg"], [1, "sp-tier__badge"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"], [1, "sp-standard-grid"], [1, "sp-standard-card", 3, "href", "target"], [1, "sp-logo-wrap"], [1, "sp-card-name", "sp-card-name--sm"], [1, "sp-card-tagline", "sp-card-tagline--sm"], [1, "sp-name-fallback"]], template: function SponsorsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "header", 4)(5, "div", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(6, "svg", 6);
        \u0275\u0275element(7, "path", 7)(8, "circle", 8)(9, "path", 9)(10, "path", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Our Partners ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "h1", 11);
        \u0275\u0275text(13, "Powering ");
        \u0275\u0275elementStart(14, "em");
        \u0275\u0275text(15, "GCC Esports");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "p", 12);
        \u0275\u0275text(17, " Dawri is proudly powered by visionary partners committed to growing the esports ecosystem in Saudi Arabia and beyond. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(18, SponsorsComponent_Conditional_18_Template, 4, 0, "div", 13)(19, SponsorsComponent_Conditional_19_Template, 16, 0)(20, SponsorsComponent_Conditional_20_Template, 2, 2);
        \u0275\u0275elementStart(21, "section", 14);
        \u0275\u0275element(22, "div", 15)(23, "div", 16);
        \u0275\u0275elementStart(24, "div", 17)(25, "div", 5);
        \u0275\u0275text(26, "Become a Partner");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "h2", 18);
        \u0275\u0275text(28, "Join the ");
        \u0275\u0275elementStart(29, "em");
        \u0275\u0275text(30, "GCC's fastest-growing");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "br");
        \u0275\u0275text(32, "esports platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "p", 19);
        \u0275\u0275text(34, " Reach over 5,000 active gamers and 100+ corporate communities through Dawri. Brand exposure across tournaments, marketplace, and community channels. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 20)(36, "a", 21);
        \u0275\u0275text(37, " Get in touch ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(38, "svg", 22);
        \u0275\u0275element(39, "path", 23)(40, "path", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(41, "a", 25);
        \u0275\u0275text(42, "View packages");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(18);
        \u0275\u0275conditional(18, ctx.loading() ? 18 : ctx.allCount() === 0 ? 19 : 20);
      }
    }, dependencies: [CommonModule, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_orbFloat1 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(40px, -50px);\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat2 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(-50px, 40px);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0%, 100% {\n    opacity: .6;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.sponsors-page[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  overflow-x: hidden;\n  background: var(--bg);\n  color: var(--text);\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 32px 100px;\n}\n.sp-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n.sp-bg__orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(110px);\n  opacity: .4;\n}\n.sp-bg__orb--gold[_ngcontent-%COMP%] {\n  width: 600px;\n  height: 500px;\n  top: -150px;\n  right: -100px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, .22),\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orbFloat1 22s ease-in-out infinite;\n}\n.sp-bg__orb--green[_ngcontent-%COMP%] {\n  width: 500px;\n  height: 500px;\n  bottom: -100px;\n  left: -120px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, .18),\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orbFloat2 28s ease-in-out infinite;\n}\n.sp-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  padding: 80px 0 64px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}\n.sp-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  padding: 6px 14px 6px 12px;\n  background: rgba(212, 175, 55, .08);\n  border: 1px solid rgba(212, 175, 55, .25);\n  border-radius: 100px;\n  svg {\n    flex-shrink: 0;\n  }\n}\n.sp-title[_ngcontent-%COMP%] {\n  font-family: var(--fh, "Anton", sans-serif);\n  font-size: clamp(42px, 7vw, 84px);\n  line-height: .92;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  margin: 0;\n  color: var(--text);\n  em {\n    font-style: normal;\n    color: var(--accent, #d4af37);\n  }\n}\n.sp-subtitle[_ngcontent-%COMP%] {\n  max-width: 600px;\n  color: var(--mu, #8a8aa0);\n  font-size: 16px;\n  line-height: 1.7;\n  margin: 0;\n}\n.sp-loading[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 80px 0;\n  font-family: var(--fm, monospace);\n  font-size: 12px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n}\n.sp-loading__spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 2px solid rgba(212, 175, 55, .2);\n  border-top-color: var(--accent, #d4af37);\n  animation: _ngcontent-%COMP%_spin .8s linear infinite;\n}\n.sp-empty[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  padding: 80px 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n}\n.sp-empty__icon[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: rgba(212, 175, 55, .08);\n  border: 1px solid rgba(212, 175, 55, .2);\n  display: grid;\n  place-items: center;\n  color: var(--accent, #d4af37);\n  margin-bottom: 8px;\n}\n.sp-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 1.6rem;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  margin: 0;\n}\n.sp-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  font-size: .95rem;\n  margin: 0;\n}\n.sp-contact-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 10px 22px;\n  background: var(--primary, #006c35);\n  color: #fff;\n  border-radius: 8px;\n  text-decoration: none;\n  font-weight: 700;\n  font-size: 14px;\n  transition: background .18s, transform .18s;\n  margin-top: 8px;\n  svg {\n    transition: transform .2s;\n  }\n  &:hover {\n    background: var(--primary-soft, #2d8c5e);\n    transform: translateY(-2px);\n    svg {\n      transform: translateX(3px);\n    }\n  }\n}\n.sp-tier[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-bottom: 72px;\n}\n.sp-tier__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 36px;\n}\n.sp-tier__badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  flex-shrink: 0;\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n  padding: 5px 12px;\n  background: rgba(255, 255, 255, .04);\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 6px;\n}\n.sp-tier__badge[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.sp-tier__badge--title[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n  background: rgba(212, 175, 55, .08);\n  border-color: rgba(212, 175, 55, .25);\n}\n.sp-tier__line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, .08),\n      transparent);\n}\n.sp-title-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));\n  gap: 24px;\n  max-width: 820px;\n  margin: 0 auto;\n}\n.sp-title-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      160deg,\n      rgba(212, 175, 55, .06) 0%,\n      rgba(0, 108, 53, .04) 100%);\n  border: 1px solid rgba(212, 175, 55, .22);\n  border-radius: 16px;\n  padding: 44px 36px;\n  text-align: center;\n  text-decoration: none;\n  color: inherit;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  transition:\n    transform .25s,\n    border-color .25s,\n    box-shadow .25s;\n  &:hover {\n    transform: translateY(-5px);\n    border-color: var(--accent, #d4af37);\n    box-shadow: 0 20px 50px rgba(212, 175, 55, .15);\n    .sp-title-card__glow {\n      opacity: 1;\n    }\n    .sp-card-link svg {\n      transform: translateX(4px);\n    }\n  }\n}\n.sp-title-card__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity .3s;\n  background:\n    radial-gradient(\n      ellipse 80% 60% at 50% 0%,\n      rgba(212, 175, 55, .1),\n      transparent 70%);\n}\n.sp-logo-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 80px;\n}\n.sp-logo-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 80px;\n  max-width: 200px;\n  object-fit: contain;\n  filter: brightness(1.1);\n}\n.sp-logo-wrap--lg[_ngcontent-%COMP%] {\n  height: 120px;\n}\n.sp-logo-wrap--lg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-height: 120px;\n  max-width: 280px;\n}\n.sp-standard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n}\n.sp-standard-card[_ngcontent-%COMP%] {\n  background: var(--bg2, #10101c);\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 12px;\n  padding: 28px 20px;\n  text-align: center;\n  text-decoration: none;\n  color: inherit;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  transition:\n    transform .2s,\n    border-color .2s,\n    box-shadow .2s;\n  &:hover {\n    transform: translateY(-3px);\n    border-color: rgba(212, 175, 55, .35);\n    box-shadow: 0 8px 28px rgba(0, 0, 0, .3);\n  }\n  .sp-logo-wrap {\n    height: 60px;\n    img {\n      max-height: 60px;\n      max-width: 140px;\n    }\n  }\n}\n.sp-card-name[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 22px;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n  margin: 0;\n  color: var(--text);\n}\n.sp-card-name--sm[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.sp-card-tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--mu, #8a8aa0);\n  font-size: 14px;\n  line-height: 1.6;\n}\n.sp-card-tagline--sm[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.sp-card-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  svg {\n    transition: transform .2s;\n  }\n}\n.sp-name-fallback[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--accent, #d4af37);\n  font-size: 22px;\n}\n.sp-name-fallback--lg[_ngcontent-%COMP%] {\n  font-size: 34px;\n}\n.sp-cta[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  overflow: hidden;\n  margin-top: 24px;\n  border-radius: 20px;\n  border: 1px solid rgba(212, 175, 55, .18);\n  padding: 72px 48px;\n  background:\n    radial-gradient(\n      ellipse 80% 100% at 50% 100%,\n      rgba(0, 108, 53, .1),\n      transparent 65%),\n    radial-gradient(\n      ellipse 60% 80% at 80% 0%,\n      rgba(212, 175, 55, .08),\n      transparent 60%),\n    var(--bg2, #10101c);\n  text-align: center;\n  @media (max-width: 640px) {\n    padding: 48px 24px;\n  }\n}\n.sp-cta__grid-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image:\n    linear-gradient(rgba(212, 175, 55, .04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(212, 175, 55, .04) 1px,\n      transparent 1px);\n  background-size: 60px 60px;\n  mask-image:\n    radial-gradient(\n      ellipse 80% 100% at 50% 50%,\n      #000 20%,\n      transparent 75%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 80% 100% at 50% 50%,\n      #000 20%,\n      transparent 75%);\n}\n.sp-cta__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 800px;\n  height: 500px;\n  background:\n    radial-gradient(\n      ellipse,\n      rgba(0, 108, 53, .18) 0%,\n      rgba(212, 175, 55, .06) 40%,\n      transparent 70%);\n  filter: blur(60px);\n  pointer-events: none;\n  animation: _ngcontent-%COMP%_shimmer 5s ease-in-out infinite;\n}\n.sp-cta__content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 680px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n}\n.sp-cta__title[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: clamp(32px, 5vw, 56px);\n  line-height: .92;\n  text-transform: uppercase;\n  letter-spacing: .06em;\n  margin: 0;\n  color: var(--text);\n  em {\n    font-style: normal;\n    color: var(--accent, #d4af37);\n  }\n}\n.sp-cta__sub[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  font-size: 15px;\n  line-height: 1.7;\n  margin: 0;\n}\n.sp-cta__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-top: 8px;\n}\n.sp-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 26px;\n  border-radius: 10px;\n  font-weight: 700;\n  font-size: 14px;\n  text-decoration: none;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition:\n    transform .18s,\n    background .18s,\n    border-color .18s,\n    box-shadow .18s;\n}\n.sp-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  transition: transform .2s;\n}\n.sp-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.sp-btn[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(3px);\n}\n.sp-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n}\n.sp-btn--primary[_ngcontent-%COMP%]:hover {\n  background: var(--primary-soft, #2d8c5e);\n  box-shadow: 0 8px 24px rgba(0, 108, 53, .3);\n}\n.sp-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: rgba(255, 255, 255, .15);\n  color: var(--text);\n}\n.sp-btn--ghost[_ngcontent-%COMP%]:hover {\n  border-color: var(--text);\n  background: rgba(255, 255, 255, .04);\n}\n/*# sourceMappingURL=sponsors.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SponsorsComponent, { className: "SponsorsComponent", filePath: "src\\app\\pages\\sponsors\\sponsors.component.ts", lineNumber: 373 });
})();
export {
  SponsorsComponent
};
//# sourceMappingURL=chunk-SWIFGEQY.js.map
