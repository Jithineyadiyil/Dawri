import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/about/about.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.title;
function AboutComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 35);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r1.sub);
  }
}
function AboutComponent_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 21)(1, "div", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "span", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 40);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "a", 41);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 42);
    \u0275\u0275text(12, "\u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", p_r2.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.titleAr);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.body);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", p_r2.link);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r2.linkLabel, " ");
  }
}
function AboutComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r3.body);
  }
}
function AboutComponent_For_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 27)(1, "div", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 47)(4, "h3", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r4.year);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(m_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r4.body);
  }
}
var AboutComponent = class _AboutComponent {
  constructor() {
    this.stats = [
      { label: "Saudi gamers reached", value: "23M+", sub: "addressable market" },
      { label: "Vision 2030 gaming", value: "$38B", sub: "national investment" },
      { label: "GCC countries", value: "6", sub: "primary markets" },
      { label: "Supported languages", value: "2", sub: "Arabic + English, RTL-native" }
    ];
    this.pillars = [
      {
        icon: "\u{1F3C6}",
        title: "Tournament Engine",
        titleAr: "\u0645\u062D\u0631\u0643 \u0627\u0644\u0628\u0637\u0648\u0644\u0627\u062A",
        body: "Automated brackets for single elimination, double elimination, round robin, and Swiss formats. Real-time results, dispute resolution, and AI-assisted screenshot verification.",
        link: "/tournaments",
        linkLabel: "Browse tournaments"
      },
      {
        icon: "\u{1F381}",
        title: "Digital Marketplace",
        titleAr: "\u0627\u0644\u0645\u062A\u062C\u0631 \u0627\u0644\u0631\u0642\u0645\u064A",
        body: "98 SKUs across 37 brands \u2014 gaming cards, streaming, shopping, food delivery, telecom. Instant delivery via a multi-distributor backend with automatic failover.",
        link: "/marketplace",
        linkLabel: "Open marketplace"
      },
      {
        icon: "\u{1F3E2}",
        title: "Enterprise Engagement",
        titleAr: "\u062D\u0644\u0648\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A",
        body: "White-label tournaments for corporates, universities, and government. Native integrations with SAP SuccessFactors, Oracle HCM, and Workday.",
        link: "/pricing",
        linkLabel: "See plans"
      }
    ];
    this.values = [
      {
        icon: "\u{1F1F8}\u{1F1E6}",
        title: "Saudi-first",
        body: "Arabic-native UX, Saudi payment rails, KSA-hosted servers, PDPL-compliant by design."
      },
      {
        icon: "\u26A1",
        title: "Ship quickly, then iterate",
        body: "We ship small, measure real usage, and let the data pick the next feature. No committee-driven roadmaps."
      },
      {
        icon: "\u{1F512}",
        title: "Fair and transparent",
        body: "Automated brackets with screenshot verification. Clear rules, visible moderator actions, honest dispute handling."
      },
      {
        icon: "\u{1F91D}",
        title: "Players own their data",
        body: "We never sell personal information. Every PDPL right is real: access, correction, deletion, portability."
      }
    ];
    this.milestones = [
      { year: "2025", title: "Dawri founded in Riyadh", body: "Initial platform and Sprint 1 MVP \u2014 single elimination brackets, manual moderators." },
      { year: "2026", title: "Marketplace + distributor abstraction", body: "Multi-vendor fulfillment with circuit breaker, 98 SKUs across 7 categories." },
      { year: "2026", title: "Saudi Arabia launch", body: "Arabic-native rollout, SMS OTP via Unifonic and Taqnyat, wallet + Mada + STC Pay." },
      { year: "2027", title: "GCC expansion", body: "UAE, Kuwait, Qatar, Bahrain, Oman rollout with local payment rails and brand partners." },
      { year: "2027", title: "Enterprise engagement GA", body: "HR integrations for SAP, Oracle, Workday. White-label subdomains. Department-level analytics." }
    ];
  }
  static {
    this.\u0275fac = function AboutComponent_Factory(t) {
      return new (t || _AboutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 70, vars: 0, consts: [[1, "about-page"], [1, "about-hero"], [1, "about-hero__badge"], [1, "about-hero__title"], [1, "about-hero__title-ar"], [1, "about-hero__sub"], [1, "about-mission"], [1, "about-mission__col"], [1, "section-title"], [1, "about-mission__col", "about-mission__visual"], [1, "visual-stack"], [1, "visual-block", "visual-block--1"], [1, "visual-block", "visual-block--2"], [1, "visual-block", "visual-block--3"], [1, "visual-caption"], [1, "about-stats"], [1, "stat-card"], [1, "about-pillars"], [1, "section-title", "section-title--center"], [1, "section-sub"], [1, "pillars-grid"], [1, "pillar-card"], [1, "about-values"], [1, "values-grid"], [1, "value-card"], [1, "about-timeline"], [1, "timeline"], [1, "timeline-item"], [1, "about-cta"], [1, "about-cta__title"], [1, "about-cta__sub"], [1, "about-cta__buttons"], ["routerLink", "/tournaments", 1, "btn", "btn--primary"], ["routerLink", "/contact", 1, "btn", "btn--secondary"], [1, "stat-card__value"], [1, "stat-card__label"], [1, "stat-card__sub"], ["aria-hidden", "true", 1, "pillar-card__icon"], [1, "pillar-card__title"], [1, "pillar-card__title-ar"], [1, "pillar-card__body"], [1, "pillar-card__link", 3, "routerLink"], ["aria-hidden", "true"], ["aria-hidden", "true", 1, "value-card__icon"], [1, "value-card__title"], [1, "value-card__body"], [1, "timeline-item__year"], [1, "timeline-item__body"], [1, "timeline-item__title"], [1, "timeline-item__desc"]], template: function AboutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
        \u0275\u0275text(3, "About Dawri");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1", 3);
        \u0275\u0275text(5, " The first Arabic-native esports platform for the GCC ");
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7, "\u0623\u0648\u0644 \u0645\u0646\u0635\u0629 \u0631\u064A\u0627\u0636\u0627\u062A \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0639\u0631\u0628\u064A\u0629 \u0641\u064A \u0627\u0644\u062E\u0644\u064A\u062C");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9, " We build the infrastructure that turns casual gaming into organized, measurable, fair competition \u2014 for players, for companies, and for the next generation of Saudi esports. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "section", 6)(11, "div", 7)(12, "h2", 8);
        \u0275\u0275text(13, "Our mission");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p");
        \u0275\u0275text(15, " Saudi Arabia has over 23 million active gamers. The Kingdom committed $38 billion to the gaming and esports sector as part of Vision 2030 \u2014 the single largest national investment in gaming anywhere in the world. Yet until recently, no Arabic-first platform existed to channel that energy into structured, competitive play. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p");
        \u0275\u0275text(17, " Dawri exists to close that gap. We give individual players a trusted home for competition and give companies the tools to turn gaming into measurable employee engagement \u2014 with all the cultural, linguistic, and regulatory fit that international platforms lack. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 9)(19, "div", 10)(20, "div", 11);
        \u0275\u0275text(21, "\u062F\u0627\u0648\u0631\u064A");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 12);
        \u0275\u0275text(23, "\u062F\u0648\u0631\u064A");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 13);
        \u0275\u0275text(25, "DAWRI");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "p", 14)(27, "strong");
        \u0275\u0275text(28, "Dawri");
        \u0275\u0275elementEnd();
        \u0275\u0275text(29, " (\u062F\u0627\u0648\u0631\u064A) means ");
        \u0275\u0275elementStart(30, "em");
        \u0275\u0275text(31, '"my league"');
        \u0275\u0275elementEnd();
        \u0275\u0275text(32, " in Arabic \u2014 a place that belongs to the player, their team, and their community. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "section", 15);
        \u0275\u0275repeaterCreate(34, AboutComponent_For_35_Template, 7, 3, "div", 16, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "section", 17)(37, "h2", 18);
        \u0275\u0275text(38, "What we build");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "p", 19);
        \u0275\u0275text(40, "Three interlocking products, one platform.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "div", 20);
        \u0275\u0275repeaterCreate(42, AboutComponent_For_43_Template, 13, 6, "article", 21, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "section", 22)(45, "h2", 18);
        \u0275\u0275text(46, "What we stand for");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "p", 19);
        \u0275\u0275text(48, "Principles we refuse to compromise on.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "div", 23);
        \u0275\u0275repeaterCreate(50, AboutComponent_For_51_Template, 7, 3, "div", 24, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "section", 25)(53, "h2", 18);
        \u0275\u0275text(54, "Where we've been, where we're going");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "p", 19);
        \u0275\u0275text(56, "Real milestones, not marketing fiction.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "ol", 26);
        \u0275\u0275repeaterCreate(58, AboutComponent_For_59_Template, 8, 3, "li", 27, _forTrack1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(60, "section", 28)(61, "h2", 29);
        \u0275\u0275text(62, "Ready to compete?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "p", 30);
        \u0275\u0275text(64, " Browse open tournaments, claim a spot, or get in touch about running your company's first event. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "div", 31)(66, "a", 32);
        \u0275\u0275text(67, "Browse tournaments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "a", 33);
        \u0275\u0275text(69, "Talk to us");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(34);
        \u0275\u0275repeater(ctx.stats);
        \u0275\u0275advance(8);
        \u0275\u0275repeater(ctx.pillars);
        \u0275\u0275advance(8);
        \u0275\u0275repeater(ctx.values);
        \u0275\u0275advance(8);
        \u0275\u0275repeater(ctx.milestones);
      }
    }, dependencies: [CommonModule, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.about-page[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 48px 32px 96px;\n  color: var(--tx);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.5rem, 3.5vw, 2.1rem);\n  letter-spacing: 0.02em;\n  margin: 0 0 18px;\n  color: var(--tx);\n}\n.section-title--center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.section-sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 1rem;\n  margin: -8px auto 32px;\n  text-align: center;\n  max-width: 620px;\n}\n.about-hero[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 72px;\n}\n.about-hero__badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 14px;\n  background: rgba(168, 85, 247, 0.12);\n  border: 1px solid rgba(168, 85, 247, 0.35);\n  border-radius: 999px;\n  color: var(--gold);\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  margin-bottom: 22px;\n}\n.about-hero__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(2rem, 5vw, 3.2rem);\n  letter-spacing: 0.02em;\n  line-height: 1.2;\n  margin: 0 0 18px;\n  max-width: 880px;\n  margin-inline: auto;\n  background:\n    linear-gradient(\n      120deg,\n      var(--gold),\n      var(--cyan));\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n.about-hero__title-ar[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fa);\n  font-size: clamp(1rem, 2vw, 1.4rem);\n  color: var(--mu);\n  margin-top: 14px;\n  -webkit-text-fill-color: initial;\n  letter-spacing: 0;\n}\n.about-hero__sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 1.02rem;\n  line-height: 1.75;\n  max-width: 680px;\n  margin: 0 auto;\n}\n.about-mission[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr;\n  gap: 48px;\n  align-items: center;\n  margin-bottom: 72px;\n}\n@media (max-width: 860px) {\n  .about-mission[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 32px;\n  }\n}\n.about-mission__col[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--mu);\n  line-height: 1.8;\n  font-size: 0.98rem;\n  margin: 0 0 16px;\n}\n.about-mission__visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 18px;\n}\n.visual-stack[_ngcontent-%COMP%] {\n  position: relative;\n  width: 260px;\n  height: 260px;\n}\n.visual-block[_ngcontent-%COMP%] {\n  position: absolute;\n  display: grid;\n  place-items: center;\n  font-family: var(--fa);\n  border-radius: 18px;\n  padding: 20px;\n  font-weight: 700;\n  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2);\n}\n.visual-block--1[_ngcontent-%COMP%] {\n  top: 0;\n  left: 0;\n  width: 160px;\n  height: 160px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.25),\n      rgba(168, 85, 247, 0.08));\n  border: 1px solid rgba(168, 85, 247, 0.35);\n  color: var(--gold);\n  font-size: 2.4rem;\n  transform: rotate(-6deg);\n}\n.visual-block--2[_ngcontent-%COMP%] {\n  top: 40px;\n  right: 0;\n  width: 140px;\n  height: 140px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(251, 191, 36, 0.22),\n      rgba(251, 191, 36, 0.06));\n  border: 1px solid rgba(251, 191, 36, 0.35);\n  color: var(--cyan);\n  font-size: 2rem;\n  transform: rotate(4deg);\n}\n.visual-block--3[_ngcontent-%COMP%] {\n  bottom: 0;\n  left: 50px;\n  width: 180px;\n  height: 90px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  color: var(--tx);\n  font-family: var(--fh);\n  font-size: 1.6rem;\n  letter-spacing: 0.1em;\n  transform: rotate(-2deg);\n}\n.about-mission__visual[_ngcontent-%COMP%]:hover   .visual-block--1[_ngcontent-%COMP%] {\n  transform: rotate(-10deg) translate(-6px, -4px);\n}\n.about-mission__visual[_ngcontent-%COMP%]:hover   .visual-block--2[_ngcontent-%COMP%] {\n  transform: rotate(8deg) translate(6px, -2px);\n}\n.about-mission__visual[_ngcontent-%COMP%]:hover   .visual-block--3[_ngcontent-%COMP%] {\n  transform: rotate(-5deg) translate(-2px, 4px);\n}\n.visual-caption[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.88rem;\n  line-height: 1.65;\n  text-align: center;\n  max-width: 360px;\n}\n.visual-caption[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.visual-caption[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  font-style: normal;\n}\n.about-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 18px;\n  margin-bottom: 72px;\n  padding: 32px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.06),\n      rgba(251, 191, 36, 0.04));\n  border: 1px solid var(--br);\n  border-radius: 18px;\n}\n@media (max-width: 860px) {\n  .about-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 500px) {\n  .about-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.stat-card[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.stat-card__value[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.8rem, 4vw, 2.6rem);\n  color: var(--gold);\n  letter-spacing: 0.02em;\n  line-height: 1.1;\n  margin-bottom: 6px;\n}\n.stat-card__label[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tx);\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.stat-card__sub[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--dim);\n}\n.about-pillars[_ngcontent-%COMP%] {\n  margin-bottom: 72px;\n}\n.pillars-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n@media (max-width: 860px) {\n  .pillars-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.pillar-card[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 18px;\n  padding: 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  transition: border-color 0.2s, transform 0.15s;\n}\n.pillar-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--gold);\n  transform: translateY(-3px);\n}\n.pillar-card__icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  background: rgba(168, 85, 247, 0.12);\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n}\n.pillar-card__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.2rem;\n  letter-spacing: 0.02em;\n  margin: 0;\n  color: var(--tx);\n}\n.pillar-card__title-ar[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fa);\n  font-size: 0.85rem;\n  color: var(--mu);\n  margin-top: 4px;\n  font-weight: 400;\n}\n.pillar-card__body[_ngcontent-%COMP%] {\n  color: var(--mu);\n  line-height: 1.65;\n  font-size: 0.9rem;\n  margin: 0;\n  flex-grow: 1;\n}\n.pillar-card__link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 6px;\n  color: var(--cyan);\n  font-size: 0.88rem;\n  font-weight: 600;\n  text-decoration: none;\n  transition: color 0.15s, gap 0.15s;\n}\n.pillar-card__link[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n  gap: 10px;\n}\n.about-values[_ngcontent-%COMP%] {\n  margin-bottom: 72px;\n}\n.values-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}\n@media (max-width: 680px) {\n  .values-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.value-card[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-left: 3px solid var(--gold);\n  border-radius: 12px;\n  padding: 22px 24px;\n}\n.value-card__icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin-bottom: 10px;\n}\n.value-card__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1rem;\n  letter-spacing: 0.03em;\n  margin: 0 0 8px;\n  color: var(--gold);\n}\n.value-card__body[_ngcontent-%COMP%] {\n  color: var(--mu);\n  line-height: 1.65;\n  font-size: 0.9rem;\n  margin: 0;\n}\n.value-card[_ngcontent-%COMP%]:nth-child(even) {\n  border-left-color: var(--cyan);\n}\n.value-card[_ngcontent-%COMP%]:nth-child(even)   .value-card__title[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.about-timeline[_ngcontent-%COMP%] {\n  margin-bottom: 72px;\n}\n.timeline[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 auto;\n  max-width: 720px;\n  position: relative;\n}\n.timeline[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 12px;\n  bottom: 12px;\n  left: 50px;\n  width: 2px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--gold),\n      var(--cyan));\n  opacity: 0.4;\n}\n.timeline-item[_ngcontent-%COMP%] {\n  position: relative;\n  padding-left: 96px;\n  padding-bottom: 28px;\n}\n.timeline-item[_ngcontent-%COMP%]:last-child {\n  padding-bottom: 0;\n}\n.timeline-item__year[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 6px;\n  width: 72px;\n  height: 36px;\n  background: var(--bg2);\n  border: 1px solid var(--gold);\n  border-radius: 999px;\n  display: grid;\n  place-items: center;\n  color: var(--gold);\n  font-family: var(--fh);\n  font-size: 0.82rem;\n  letter-spacing: 0.06em;\n  z-index: 1;\n}\n.timeline-item__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1rem;\n  letter-spacing: 0.02em;\n  margin: 0 0 6px;\n  color: var(--tx);\n}\n.timeline-item__desc[_ngcontent-%COMP%] {\n  color: var(--mu);\n  line-height: 1.65;\n  font-size: 0.9rem;\n  margin: 0;\n}\n.about-cta[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 32px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.1),\n      rgba(251, 191, 36, 0.05));\n  border: 1px solid var(--br);\n  border-radius: 22px;\n}\n.about-cta__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(1.6rem, 4vw, 2.2rem);\n  letter-spacing: 0.02em;\n  margin: 0 0 12px;\n  color: var(--tx);\n}\n.about-cta__sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  max-width: 520px;\n  margin: 0 auto 28px;\n  font-size: 0.98rem;\n  line-height: 1.65;\n}\n.about-cta__buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 24px;\n  border-radius: 12px;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-decoration: none;\n  font-size: 0.92rem;\n  transition: transform 0.1s, box-shadow 0.2s;\n  cursor: pointer;\n  border: 1px solid transparent;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      var(--gold),\n      #7e22ce);\n  color: #fff;\n  box-shadow: 0 6px 20px -8px rgba(168, 85, 247, 0.6);\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 10px 28px -8px rgba(168, 85, 247, 0.8);\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--tx);\n  border-color: var(--br);\n}\n.btn--secondary[_ngcontent-%COMP%]:hover {\n  border-color: var(--cyan);\n  color: var(--cyan);\n}\n@media (prefers-reduced-motion: reduce) {\n  .pillar-card[_ngcontent-%COMP%], .btn[_ngcontent-%COMP%], .visual-block[_ngcontent-%COMP%], .pillar-card__link[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .about-mission__visual[_ngcontent-%COMP%]:hover   .visual-block[_ngcontent-%COMP%] {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=about.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent", filePath: "src\\app\\pages\\about\\about.component.ts", lineNumber: 23 });
})();
export {
  AboutComponent
};
//# sourceMappingURL=chunk-7XKYY76U.js.map
