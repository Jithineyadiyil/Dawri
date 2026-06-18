import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DecimalPipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/pricing/pricing.component.ts
var _forTrack0 = ($index, $item) => $item.name;
function PricingComponent_For_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 38);
    \u0275\u0275element(2, "polygon", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Most popular ");
    \u0275\u0275elementEnd();
  }
}
function PricingComponent_For_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 27);
  }
}
function PricingComponent_For_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Free");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 41);
    \u0275\u0275text(3, "Forever");
    \u0275\u0275elementEnd();
  }
}
function PricingComponent_For_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "Custom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 41);
    \u0275\u0275text(3, "Contact us");
    \u0275\u0275elementEnd();
  }
}
function PricingComponent_For_20_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 45);
    \u0275\u0275text(5, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 41);
    \u0275\u0275text(7, "per month");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, plan_r1.price));
  }
}
function PricingComponent_For_20_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 46);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 47);
    \u0275\u0275element(3, "polyline", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", f_r2, " ");
  }
}
function PricingComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275template(1, PricingComponent_For_20_Conditional_1_Template, 4, 0, "div", 26)(2, PricingComponent_For_20_Conditional_2_Template, 1, 0, "div", 27);
    \u0275\u0275elementStart(3, "div", 28)(4, "div", 29);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 31);
    \u0275\u0275template(9, PricingComponent_For_20_Conditional_9_Template, 4, 0)(10, PricingComponent_For_20_Conditional_10_Template, 4, 0)(11, PricingComponent_For_20_Conditional_11_Template, 8, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 32);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ul", 33);
    \u0275\u0275repeaterCreate(15, PricingComponent_For_20_For_16_Template, 5, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "a", 34);
    \u0275\u0275text(18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 35);
    \u0275\u0275element(20, "path", 36)(21, "path", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const plan_r1 = ctx.$implicit;
    const i_r3 = ctx.$index;
    \u0275\u0275styleProp("animation-delay", i_r3 * 0.1 + "s");
    \u0275\u0275classProp("plan-card--highlight", plan_r1.highlight);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, plan_r1.highlight ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, plan_r1.highlight ? 2 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r1.nameAr);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, plan_r1.price === 0 ? 9 : plan_r1.price === null ? 10 : 11);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(plan_r1.desc);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(plan_r1.features);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("plan-cta--primary", plan_r1.highlight)("plan-cta--outline", !plan_r1.highlight);
    \u0275\u0275property("routerLink", plan_r1.ctaLink);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", plan_r1.cta, " ");
  }
}
var PricingComponent = class _PricingComponent {
  constructor() {
    this.plans = [
      {
        name: "Free",
        nameAr: "\u0645\u062C\u0627\u0646\u064A",
        price: 0,
        period: "Forever",
        desc: "For individual players who want to compete.",
        highlight: false,
        features: [
          "Join unlimited public tournaments",
          "All 4 bracket formats",
          "Receive digital prize rewards",
          "Player ranking & leaderboard",
          "Match history & stats"
        ],
        cta: "Get started free",
        ctaLink: "/auth"
      },
      {
        name: "Starter",
        nameAr: "\u0627\u0644\u0645\u0628\u062A\u062F\u0626",
        price: 299,
        period: "per month",
        desc: "For small companies running occasional events.",
        highlight: false,
        features: [
          "Everything in Free",
          "Create up to 5 tournaments/month",
          "Up to 64 participants per tournament",
          "Department engagement report",
          "CSV employee import",
          "Email support"
        ],
        cta: "Start Starter plan",
        ctaLink: "/auth"
      },
      {
        name: "Professional",
        nameAr: "\u0627\u0644\u0645\u062D\u062A\u0631\u0641",
        price: 999,
        period: "per month",
        desc: "For HR teams running regular engagement programs.",
        highlight: true,
        features: [
          "Everything in Starter",
          "Unlimited tournaments",
          "Up to 256 participants",
          "SAP / Oracle / Workday integration",
          "White label subdomain",
          "Bulk prize distribution",
          "Priority support"
        ],
        cta: "Start Professional",
        ctaLink: "/auth"
      },
      {
        name: "Enterprise",
        nameAr: "\u0627\u0644\u0645\u0624\u0633\u0633\u064A",
        price: null,
        period: "Custom pricing",
        desc: "For large enterprises and multi-location companies.",
        highlight: false,
        features: [
          "Everything in Professional",
          "Up to 512 participants",
          "Dedicated account manager",
          "Custom SLA",
          "SAML 2.0 / OIDC SSO",
          "Advanced analytics & retention reports",
          "On-site onboarding"
        ],
        cta: "Contact sales",
        ctaLink: "/contact"
      }
    ];
  }
  static {
    this.\u0275fac = function PricingComponent_Factory(t) {
      return new (t || _PricingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PricingComponent, selectors: [["app-pricing"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 43, vars: 0, consts: [[1, "pricing-page"], ["aria-hidden", "true", 1, "pricing-bg"], [1, "pricing-bg__orb", "pricing-bg__orb--gold"], [1, "pricing-bg__orb", "pricing-bg__orb--green"], [1, "pricing-bg__grid"], [1, "pricing-hero"], [1, "pricing-eyebrow"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "1", "y", "4", "width", "22", "height", "16", "rx", "2", "ry", "2"], ["x1", "1", "y1", "10", "x2", "23", "y2", "10"], [1, "pricing-title"], [1, "pricing-sub"], [1, "plans-grid"], [1, "plan-card", 3, "plan-card--highlight", "animation-delay"], [1, "trust-strip"], [1, "trust-item"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2", "ry", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], ["aria-hidden", "true", 1, "trust-sep"], ["points", "23 4 23 10 17 10"], ["d", "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], [1, "pricing-note"], ["routerLink", "/contact"], [1, "plan-card"], [1, "plan-popular"], ["aria-hidden", "true", 1, "plan-card__glow"], [1, "plan-header"], [1, "plan-name"], ["dir", "rtl", "lang", "ar", 1, "plan-name-ar"], [1, "plan-price"], [1, "plan-desc"], [1, "plan-features"], [1, "plan-cta", 3, "routerLink"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M5 12h14"], ["d", "m12 5 7 7-7 7"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "currentColor"], ["points", "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"], [1, "plan-price__free"], [1, "plan-price__period"], [1, "plan-price__custom"], [1, "plan-price__row"], [1, "plan-price__n"], [1, "plan-price__u"], ["aria-hidden", "true", 1, "feat-tick"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"]], template: function PricingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "header", 5)(6, "span", 6);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(7, "svg", 7);
        \u0275\u0275element(8, "rect", 8)(9, "line", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " Pricing \xB7 \u0627\u0644\u062A\u0633\u0639\u064A\u0631 ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "h1", 10);
        \u0275\u0275text(12, "Simple, ");
        \u0275\u0275elementStart(13, "em");
        \u0275\u0275text(14, "transparent");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " pricing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p", 11);
        \u0275\u0275text(17, " Players always join free. Corporate plans unlock tournament creation, HR integrations, and prize pool management. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 12);
        \u0275\u0275repeaterCreate(19, PricingComponent_For_20_Template, 22, 16, "div", 13, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 14)(22, "div", 15);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(23, "svg", 16);
        \u0275\u0275element(24, "rect", 17)(25, "path", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275text(26, " No credit card required for Free ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(27, "div", 19);
        \u0275\u0275elementStart(28, "div", 15);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(29, "svg", 16);
        \u0275\u0275element(30, "polyline", 20)(31, "path", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " Cancel anytime, no lock-in ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(33, "div", 19);
        \u0275\u0275elementStart(34, "div", 15);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(35, "svg", 16);
        \u0275\u0275element(36, "path", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275text(37, " Prices exclusive of 15% VAT ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(38, "p", 23);
        \u0275\u0275text(39, " For custom enterprise requirements or volume discounts, ");
        \u0275\u0275elementStart(40, "a", 24);
        \u0275\u0275text(41, "contact our sales team");
        \u0275\u0275elementEnd();
        \u0275\u0275text(42, ". ");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(19);
        \u0275\u0275repeater(ctx.plans);
      }
    }, dependencies: [RouterLink, CommonModule, DecimalPipe], styles: ['@charset "UTF-8";\n\n\n\n@keyframes _ngcontent-%COMP%_fadeUp {\n  from {\n    opacity: 0;\n    transform: translateY(24px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat1 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(40px, -50px);\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat2 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(-40px, 40px);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0%, 100% {\n    opacity: 0.5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_cardShine {\n  0% {\n    transform: translateX(-100%) skewX(-15deg);\n    opacity: 0;\n  }\n  60% {\n    opacity: 0.5;\n  }\n  100% {\n    transform: translateX(220%) skewX(-15deg);\n    opacity: 0;\n  }\n}\n.pricing-page[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  overflow-x: hidden;\n  padding: 0 32px 100px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.pricing-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n.pricing-bg__orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(110px);\n  opacity: 0.4;\n}\n.pricing-bg__orb--gold[_ngcontent-%COMP%] {\n  width: 700px;\n  height: 500px;\n  top: -120px;\n  right: -150px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, 0.22),\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orbFloat1 20s ease-in-out infinite;\n}\n.pricing-bg__orb--green[_ngcontent-%COMP%] {\n  width: 500px;\n  height: 500px;\n  bottom: 10%;\n  left: -120px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.18),\n      transparent 70%);\n  animation: _ngcontent-%COMP%_orbFloat2 26s ease-in-out infinite;\n}\n.pricing-bg__grid[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.04) 1px,\n      transparent 1px);\n  background-size: 60px 60px;\n  mask-image:\n    radial-gradient(\n      ellipse 80% 60% at 50% 20%,\n      #000 20%,\n      transparent 75%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 80% 60% at 50% 20%,\n      #000 20%,\n      transparent 75%);\n}\n.pricing-hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  padding: 80px 0 64px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  animation: _ngcontent-%COMP%_fadeUp 0.6s ease both;\n}\n.pricing-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--fm);\n  font-size: 11px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent);\n  padding: 6px 14px 6px 12px;\n  background: rgba(212, 175, 55, 0.08);\n  border: 1px solid rgba(212, 175, 55, 0.25);\n  border-radius: 100px;\n}\n.pricing-eyebrow[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.pricing-title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(40px, 6vw, 72px);\n  line-height: 0.92;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  margin: 0;\n  color: var(--text);\n}\n.pricing-title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: var(--accent);\n}\n.pricing-sub[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--mu);\n  max-width: 520px;\n  margin: 0;\n  line-height: 1.8;\n}\n.plans-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  margin-bottom: 48px;\n}\n@media (max-width: 1024px) {\n  .plans-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 560px) {\n  .plans-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.plan-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--bg2);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  padding: 32px 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  transition:\n    transform 0.25s,\n    border-color 0.25s,\n    box-shadow 0.25s;\n  animation: _ngcontent-%COMP%_fadeUp 0.6s ease both;\n}\n.plan-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  border-color: rgba(212, 175, 55, 0.3);\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);\n}\n.plan-card--highlight[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.45);\n  background:\n    linear-gradient(\n      160deg,\n      rgba(212, 175, 55, 0.07) 0%,\n      rgba(0, 108, 53, 0.04) 100%);\n  box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.2), 0 12px 40px rgba(212, 175, 55, 0.12);\n}\n.plan-card--highlight[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.4), 0 20px 50px rgba(212, 175, 55, 0.2);\n}\n.plan-card__glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  background:\n    linear-gradient(\n      105deg,\n      transparent 40%,\n      rgba(212, 175, 55, 0.06) 50%,\n      transparent 60%);\n  animation: _ngcontent-%COMP%_cardShine 4s ease-in-out infinite;\n}\n.plan-popular[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -1px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: var(--accent);\n  color: #1a1100;\n  font-family: var(--fm);\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  padding: 4px 14px;\n  border-radius: 0 0 10px 10px;\n}\n.plan-popular[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  fill: #1a1100;\n}\n.plan-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-bottom: 20px;\n}\n.plan-name[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.7rem;\n  letter-spacing: 1.5px;\n  color: var(--text);\n  margin-bottom: 3px;\n}\n.plan-name-ar[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 0.82rem;\n  color: var(--mu);\n}\n.plan-price[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin-bottom: 16px;\n}\n.plan-price__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n}\n.plan-price__n[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.6rem;\n  color: var(--accent);\n  letter-spacing: 0.04em;\n  line-height: 1;\n}\n.plan-price__u[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.78rem;\n  color: var(--mu);\n}\n.plan-price__period[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.75rem;\n  color: var(--dim);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.plan-price__free[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  color: var(--good, var(--green));\n  letter-spacing: 0.04em;\n  line-height: 1;\n}\n.plan-price__custom[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  color: var(--text);\n  letter-spacing: 0.04em;\n  line-height: 1;\n}\n.plan-desc[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  font-size: 0.85rem;\n  color: var(--mu);\n  line-height: 1.6;\n  margin-bottom: 24px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n}\n.plan-features[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 28px;\n  flex: 1;\n}\n.plan-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--mu);\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  line-height: 1.4;\n}\n.feat-tick[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin-top: 1px;\n  background: rgba(0, 108, 53, 0.2);\n  border: 1px solid rgba(0, 108, 53, 0.4);\n  color: var(--green, #4ade80);\n  display: grid;\n  place-items: center;\n}\n.plan-card--highlight[_ngcontent-%COMP%]   .feat-tick[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  border-color: rgba(212, 175, 55, 0.35);\n  color: var(--accent);\n}\n.plan-cta[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 13px 20px;\n  border-radius: 10px;\n  font-family: var(--fb);\n  font-weight: 700;\n  font-size: 0.84rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  text-decoration: none;\n  transition: all 0.18s;\n}\n.plan-cta[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  transition: transform 0.2s;\n}\n.plan-cta[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.plan-cta--primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #1a1100;\n}\n.plan-cta--primary[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);\n}\n.plan-cta--outline[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  color: var(--text);\n}\n.plan-cta--outline[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent);\n  background: rgba(212, 175, 55, 0.06);\n}\n.trust-strip[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 24px;\n  flex-wrap: wrap;\n  padding: 20px 24px;\n  background: rgba(255, 255, 255, 0.025);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 12px;\n  margin-bottom: 24px;\n}\n.trust-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--fm);\n  font-size: 0.78rem;\n  letter-spacing: 0.8px;\n  text-transform: uppercase;\n  color: var(--mu);\n}\n.trust-item[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--green, #4ade80);\n}\n.trust-sep[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 20px;\n  background: rgba(255, 255, 255, 0.1);\n}\n@media (max-width: 640px) {\n  .trust-sep[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .trust-strip[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 14px;\n  }\n}\n.pricing-note[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  font-size: 0.82rem;\n  color: var(--dim);\n}\n.pricing-note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--accent);\n  text-decoration: none;\n}\n.pricing-note[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=pricing.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PricingComponent, { className: "PricingComponent", filePath: "src\\app\\pages\\pricing\\pricing.component.ts", lineNumber: 12 });
})();
export {
  PricingComponent
};
//# sourceMappingURL=chunk-NKEG7CGR.js.map
