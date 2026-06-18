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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/privacy/privacy.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PrivacyComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 28);
    \u0275\u0275listener("click", function PrivacyComponent_For_20_Template_button_click_1_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.jumpTo(s_r2.id));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.label);
  }
}
var PrivacyComponent = class _PrivacyComponent {
  constructor() {
    this.lastUpdated = "April 21, 2026";
    this.lastUpdatedAr = "\u0662\u0661 \u0623\u0628\u0631\u064A\u0644 \u0662\u0660\u0662\u0666";
    this.sections = [
      { id: "overview", label: "1. Overview" },
      { id: "collect", label: "2. Information we collect" },
      { id: "use", label: "3. How we use information" },
      { id: "share", label: "4. How we share information" },
      { id: "retention", label: "5. Data retention" },
      { id: "security", label: "6. Security" },
      { id: "rights", label: "7. Your PDPL rights" },
      { id: "minors", label: "8. Minors" },
      { id: "cookies", label: "9. Cookies & analytics" },
      { id: "transfers", label: "10. International transfers" },
      { id: "changes", label: "11. Changes to this policy" },
      { id: "contact", label: "12. Contact our DPO" }
    ];
  }
  /**
   * Smooth-scroll to an in-page anchor. Honors `prefers-reduced-motion`.
   */
  jumpTo(id) {
    const el = document.getElementById(id);
    if (!el)
      return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }
  static {
    this.\u0275fac = function PrivacyComponent_Factory(t) {
      return new (t || _PrivacyComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivacyComponent, selectors: [["app-privacy"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 312, vars: 2, consts: [[1, "privacy-page"], [1, "privacy-hero"], [1, "privacy-hero__title"], [1, "privacy-hero__title-ar"], [1, "privacy-hero__sub"], [1, "privacy-hero__date"], [1, "privacy-hero__date-ar"], [1, "privacy-body"], ["aria-label", "On this page", 1, "privacy-toc"], [1, "privacy-toc__title"], [1, "privacy-content"], ["id", "overview"], ["id", "collect"], ["id", "use"], ["id", "share"], ["id", "retention"], ["id", "security"], ["id", "rights"], ["href", "mailto:dpo@dawri.gg", 1, "inline-link"], ["id", "minors"], ["id", "cookies"], ["id", "transfers"], ["id", "changes"], ["id", "contact"], [1, "dpo-card"], ["href", "https://sdaia.gov.sa", "target", "_blank", "rel", "noopener noreferrer", 1, "inline-link"], [1, "back-to-contact"], ["routerLink", "/contact", 1, "inline-link"], ["type", "button", 3, "click"]], template: function PrivacyComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
        \u0275\u0275text(3, " Privacy Policy ");
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7, " How Dawri collects, uses, stores, and protects your personal information. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9, " Last updated: ");
        \u0275\u0275elementStart(10, "strong");
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "span", 6);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(14, "section", 7)(15, "aside", 8)(16, "strong", 9);
        \u0275\u0275text(17, "On this page");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "ul");
        \u0275\u0275repeaterCreate(19, PrivacyComponent_For_20_Template, 3, 1, "li", null, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "article", 10)(22, "section", 11)(23, "h2");
        \u0275\u0275text(24, "1. Overview");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p");
        \u0275\u0275text(26, ' Dawri Platform ("Dawri", "we", "us") provides esports tournament hosting, a digital goods marketplace, and workplace engagement tools. This policy explains what personal information we collect when you use our website or mobile apps, why we collect it, and the rights you have over that information under the Saudi Personal Data Protection Law ("PDPL") and applicable regional laws. ');
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p");
        \u0275\u0275text(28, ' If you use Dawri through an employer, university, or partner organization ("Enterprise Customer"), that organization may also have its own privacy notice. Where the Enterprise Customer is the controller of your data, their policy takes precedence over ours for data shared with them. ');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "section", 12)(30, "h2");
        \u0275\u0275text(31, "2. Information we collect");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p");
        \u0275\u0275text(33, "We collect information in three ways: you provide it directly, we observe it automatically, and we receive it from partners.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "h3");
        \u0275\u0275text(35, "You provide:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "ul")(37, "li")(38, "strong");
        \u0275\u0275text(39, "Account information");
        \u0275\u0275elementEnd();
        \u0275\u0275text(40, " \u2014 name, email, mobile number, password, country.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "li")(42, "strong");
        \u0275\u0275text(43, "Gaming profile");
        \u0275\u0275elementEnd();
        \u0275\u0275text(44, " \u2014 in-game nicknames, PSN ID, PUBG ID, COD ID, preferred games.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "li")(46, "strong");
        \u0275\u0275text(47, "Payment information");
        \u0275\u0275elementEnd();
        \u0275\u0275text(48, " \u2014 card details processed by our payment gateway (we never store full card numbers), wallet top-ups, billing address.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "li")(50, "strong");
        \u0275\u0275text(51, "Tournament submissions");
        \u0275\u0275elementEnd();
        \u0275\u0275text(52, " \u2014 match screenshots, result disputes, messages to moderators.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "li")(54, "strong");
        \u0275\u0275text(55, "Communications");
        \u0275\u0275elementEnd();
        \u0275\u0275text(56, " \u2014 emails, support tickets, survey responses.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(57, "h3");
        \u0275\u0275text(58, "We collect automatically:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "ul")(60, "li")(61, "strong");
        \u0275\u0275text(62, "Device data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(63, " \u2014 IP address, browser type, operating system, device identifiers.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "li")(65, "strong");
        \u0275\u0275text(66, "Usage data");
        \u0275\u0275elementEnd();
        \u0275\u0275text(67, " \u2014 pages visited, tournaments joined, marketplace actions, session duration.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "li")(69, "strong");
        \u0275\u0275text(70, "Cookies & similar tech");
        \u0275\u0275elementEnd();
        \u0275\u0275text(71, " \u2014 see Section 9.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(72, "h3");
        \u0275\u0275text(73, "From partners:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "ul")(75, "li")(76, "strong");
        \u0275\u0275text(77, "Enterprise HR systems");
        \u0275\u0275elementEnd();
        \u0275\u0275text(78, " \u2014 when your employer integrates SAP SuccessFactors, Oracle HCM, or Workday, we receive your employee roster entry (name, email, department).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "li")(80, "strong");
        \u0275\u0275text(81, "Payment providers");
        \u0275\u0275elementEnd();
        \u0275\u0275text(82, " \u2014 transaction confirmations, chargeback notices.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "li")(84, "strong");
        \u0275\u0275text(85, "SMS verification");
        \u0275\u0275elementEnd();
        \u0275\u0275text(86, " \u2014 phone carrier verification status via Unifonic / Taqnyat.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(87, "section", 13)(88, "h2");
        \u0275\u0275text(89, "3. How we use information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "p");
        \u0275\u0275text(91, "We use your information only for the purposes described below:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "ul")(93, "li")(94, "strong");
        \u0275\u0275text(95, "Running the service");
        \u0275\u0275elementEnd();
        \u0275\u0275text(96, " \u2014 creating your account, letting you register for and compete in tournaments, generating brackets, delivering digital card codes.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "li")(98, "strong");
        \u0275\u0275text(99, "Payments & billing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(100, " \u2014 processing purchases, wallet top-ups, refunds, and sending invoices.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(101, "li")(102, "strong");
        \u0275\u0275text(103, "Security & fraud prevention");
        \u0275\u0275elementEnd();
        \u0275\u0275text(104, " \u2014 rate-limiting, SMS OTP verification, detecting cheating in tournaments, investigating abuse of the marketplace.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(105, "li")(106, "strong");
        \u0275\u0275text(107, "Customer support");
        \u0275\u0275elementEnd();
        \u0275\u0275text(108, " \u2014 responding to your messages and resolving complaints.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(109, "li")(110, "strong");
        \u0275\u0275text(111, "Analytics & improvement");
        \u0275\u0275elementEnd();
        \u0275\u0275text(112, " \u2014 understanding which features are used, optimizing match scheduling, measuring performance.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "li")(114, "strong");
        \u0275\u0275text(115, "Legal obligations");
        \u0275\u0275elementEnd();
        \u0275\u0275text(116, " \u2014 responding to lawful requests from Saudi authorities, complying with tax and anti-money-laundering rules.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(117, "li")(118, "strong");
        \u0275\u0275text(119, "Marketing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(120, " \u2014 only with your consent, and only for Dawri's own services; you can opt out at any time from your account settings.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(121, "section", 14)(122, "h2");
        \u0275\u0275text(123, "4. How we share information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "p");
        \u0275\u0275text(125, "We do not sell your personal information. We share it only with the parties below and only to the extent necessary:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(126, "ul")(127, "li")(128, "strong");
        \u0275\u0275text(129, "Gift card distributors");
        \u0275\u0275elementEnd();
        \u0275\u0275text(130, " \u2014 LikeCard, WUPEX, Reloadly, and similar partners receive the minimum data needed to fulfill a marketplace order (order reference, product ID, quantity). They do not receive your email, phone, or payment details.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(131, "li")(132, "strong");
        \u0275\u0275text(133, "Payment gateways");
        \u0275\u0275elementEnd();
        \u0275\u0275text(134, " \u2014 Moyasar, Tap Payments, or HyperPay receive the card details you enter to process a charge. These are PCI-DSS compliant providers; Dawri does not see or store raw card numbers.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(135, "li")(136, "strong");
        \u0275\u0275text(137, "SMS & email providers");
        \u0275\u0275elementEnd();
        \u0275\u0275text(138, " \u2014 Unifonic, Taqnyat, and our email platform receive your phone or email solely to deliver a specific message (OTP, order confirmation, match reminder).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(139, "li")(140, "strong");
        \u0275\u0275text(141, "Enterprise Customers");
        \u0275\u0275elementEnd();
        \u0275\u0275text(142, " \u2014 if you joined via an employer, we share tournament participation and engagement statistics with the HR administrator who organized the event. Individual match screenshots are never shared with HR.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(143, "li")(144, "strong");
        \u0275\u0275text(145, "Service providers");
        \u0275\u0275elementEnd();
        \u0275\u0275text(146, " \u2014 cloud hosting, error monitoring, and analytics vendors who process data on our behalf under contracts that restrict their use.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(147, "li")(148, "strong");
        \u0275\u0275text(149, "Legal authorities");
        \u0275\u0275elementEnd();
        \u0275\u0275text(150, " \u2014 where we receive a lawful request or are required by PDPL, court order, or regulator in a jurisdiction where we operate.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(151, "li")(152, "strong");
        \u0275\u0275text(153, "Business transfers");
        \u0275\u0275elementEnd();
        \u0275\u0275text(154, " \u2014 if Dawri is acquired or merged, personal data may transfer to the successor entity; you will be notified and given the rights described in Section 7.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(155, "section", 15)(156, "h2");
        \u0275\u0275text(157, "5. Data retention");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(158, "p");
        \u0275\u0275text(159, "We keep your information only as long as we need it:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(160, "ul")(161, "li")(162, "strong");
        \u0275\u0275text(163, "Active accounts");
        \u0275\u0275elementEnd();
        \u0275\u0275text(164, " \u2014 for as long as you maintain an account with us.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(165, "li")(166, "strong");
        \u0275\u0275text(167, "Closed accounts");
        \u0275\u0275elementEnd();
        \u0275\u0275text(168, " \u2014 30 days after deletion request, then permanently erased or anonymized (except where legal obligations require longer retention, e.g. tax records kept for 10 years per Saudi ZATCA rules).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(169, "li")(170, "strong");
        \u0275\u0275text(171, "Marketplace codes");
        \u0275\u0275elementEnd();
        \u0275\u0275text(172, " \u2014 unrevealed codes auto-expire after 30 days; revealed codes are stored encrypted for 12 months for dispute resolution.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(173, "li")(174, "strong");
        \u0275\u0275text(175, "Match screenshots");
        \u0275\u0275elementEnd();
        \u0275\u0275text(176, " \u2014 retained for the duration of the tournament plus 90 days for dispute windows.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(177, "li")(178, "strong");
        \u0275\u0275text(179, "Support tickets");
        \u0275\u0275elementEnd();
        \u0275\u0275text(180, " \u2014 retained for 24 months.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(181, "li")(182, "strong");
        \u0275\u0275text(183, "Server logs");
        \u0275\u0275elementEnd();
        \u0275\u0275text(184, " \u2014 retained for 90 days unless flagged for security investigation.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(185, "section", 16)(186, "h2");
        \u0275\u0275text(187, "6. Security");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(188, "p");
        \u0275\u0275text(189, "We implement industry-standard controls to protect your information:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(190, "ul")(191, "li");
        \u0275\u0275text(192, "All traffic to Dawri is encrypted in transit with TLS 1.3.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(193, "li");
        \u0275\u0275text(194, "Marketplace card codes are encrypted at rest with AES-256-GCM.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(195, "li");
        \u0275\u0275text(196, "Passwords are hashed with bcrypt.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(197, "li");
        \u0275\u0275text(198, "SMS OTP is required for account registration, login from new devices, and high-value marketplace purchases.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(199, "li");
        \u0275\u0275text(200, "Multi-factor authentication (MFA) is mandatory for administrator accounts and available to all users.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(201, "li");
        \u0275\u0275text(202, "Access to production systems is limited to a small, audited engineering team.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(203, "p");
        \u0275\u0275text(204, "No system is perfectly secure. If we learn of a breach that affects your information, we will notify you and the relevant regulator within 72 hours, as required by PDPL.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(205, "section", 17)(206, "h2");
        \u0275\u0275text(207, "7. Your PDPL rights");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(208, "p");
        \u0275\u0275text(209, "Saudi PDPL grants you the following rights over your personal data:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(210, "ul")(211, "li")(212, "strong");
        \u0275\u0275text(213, "Right to know");
        \u0275\u0275elementEnd();
        \u0275\u0275text(214, " \u2014 request a summary of what data we hold about you and how it is used.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(215, "li")(216, "strong");
        \u0275\u0275text(217, "Right of access");
        \u0275\u0275elementEnd();
        \u0275\u0275text(218, " \u2014 receive a copy of your data in a portable format.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(219, "li")(220, "strong");
        \u0275\u0275text(221, "Right to correction");
        \u0275\u0275elementEnd();
        \u0275\u0275text(222, " \u2014 update inaccurate or incomplete information.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(223, "li")(224, "strong");
        \u0275\u0275text(225, "Right to erasure");
        \u0275\u0275elementEnd();
        \u0275\u0275text(226, " \u2014 request deletion of data that is no longer necessary (subject to legal retention rules in Section 5).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(227, "li")(228, "strong");
        \u0275\u0275text(229, "Right to object");
        \u0275\u0275elementEnd();
        \u0275\u0275text(230, " \u2014 refuse certain types of processing, including marketing.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(231, "li")(232, "strong");
        \u0275\u0275text(233, "Right to portability");
        \u0275\u0275elementEnd();
        \u0275\u0275text(234, " \u2014 receive your data in a machine-readable format to transfer elsewhere.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(235, "li")(236, "strong");
        \u0275\u0275text(237, "Right to withdraw consent");
        \u0275\u0275elementEnd();
        \u0275\u0275text(238, " \u2014 where processing is based on your consent, you may revoke it at any time without affecting prior lawful processing.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(239, "li")(240, "strong");
        \u0275\u0275text(241, "Right to complain");
        \u0275\u0275elementEnd();
        \u0275\u0275text(242, " \u2014 lodge a complaint with the Saudi Data & Artificial Intelligence Authority (SDAIA) if you believe your rights have been violated.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(243, "p");
        \u0275\u0275text(244, "To exercise any of these rights, email our Data Protection Officer at ");
        \u0275\u0275elementStart(245, "a", 18);
        \u0275\u0275text(246, "dpo@dawri.gg");
        \u0275\u0275elementEnd();
        \u0275\u0275text(247, ". We respond within 30 days.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(248, "section", 19)(249, "h2");
        \u0275\u0275text(250, "8. Minors");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(251, "p");
        \u0275\u0275text(252, " Dawri is designed for users aged 13 and over. Users under 18 require the consent of a parent or legal guardian to create an account. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal data, email ");
        \u0275\u0275elementStart(253, "a", 18);
        \u0275\u0275text(254, "dpo@dawri.gg");
        \u0275\u0275elementEnd();
        \u0275\u0275text(255, " and we will delete the account and data promptly. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(256, "section", 20)(257, "h2");
        \u0275\u0275text(258, "9. Cookies & analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(259, "p");
        \u0275\u0275text(260, "We use cookies and similar technologies for three purposes:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(261, "ul")(262, "li")(263, "strong");
        \u0275\u0275text(264, "Strictly necessary");
        \u0275\u0275elementEnd();
        \u0275\u0275text(265, " \u2014 keeping you signed in, remembering your language and region preferences. These cannot be disabled.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(266, "li")(267, "strong");
        \u0275\u0275text(268, "Analytics");
        \u0275\u0275elementEnd();
        \u0275\u0275text(269, " \u2014 understanding how users navigate the platform. You can opt out in your account settings.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(270, "li")(271, "strong");
        \u0275\u0275text(272, "Marketing");
        \u0275\u0275elementEnd();
        \u0275\u0275text(273, " \u2014 measuring ad effectiveness when we run promotions. Off by default; enabled only with your explicit consent.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(274, "p");
        \u0275\u0275text(275, "You can also control cookies directly in your browser settings, though some features of Dawri will not work without the strictly necessary cookies.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(276, "section", 21)(277, "h2");
        \u0275\u0275text(278, "10. International transfers");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(279, "p");
        \u0275\u0275text(280, " Your data is primarily stored on servers located in Saudi Arabia. Some of our service providers (such as cloud hosting and email delivery) process data in other countries. When we transfer data outside Saudi Arabia, we ensure an equivalent level of protection either through PDPL-approved standard contractual clauses or by transferring only to jurisdictions recognized as providing adequate protection. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(281, "section", 22)(282, "h2");
        \u0275\u0275text(283, "11. Changes to this policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(284, "p");
        \u0275\u0275text(285, ' We may update this policy as our services evolve. If a change materially affects your rights or how your data is used, we will notify you by email and in-app notification at least 14 days before the change takes effect. The "Last updated" date at the top of this page always reflects the most recent revision. ');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(286, "section", 23)(287, "h2");
        \u0275\u0275text(288, "12. Contact our DPO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(289, "p");
        \u0275\u0275text(290, " Questions about this policy, your data, or how to exercise your rights? Reach our Data Protection Officer: ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(291, "div", 24)(292, "div")(293, "strong");
        \u0275\u0275text(294, "Email:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(295, "a", 18);
        \u0275\u0275text(296, "dpo@dawri.gg");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(297, "div")(298, "strong");
        \u0275\u0275text(299, "Post:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(300, " Data Protection Officer, Dawri Platform, King Fahd Road, Al Olaya, Riyadh 12211, Saudi Arabia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(301, "div")(302, "strong");
        \u0275\u0275text(303, "Complaints:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(304, " You may also contact the Saudi Data & Artificial Intelligence Authority (SDAIA) at ");
        \u0275\u0275elementStart(305, "a", 25);
        \u0275\u0275text(306, "sdaia.gov.sa");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(307, "p", 26);
        \u0275\u0275text(308, " For everything else, the ");
        \u0275\u0275elementStart(309, "a", 27);
        \u0275\u0275text(310, "Contact page");
        \u0275\u0275elementEnd();
        \u0275\u0275text(311, " is the fastest way to reach us. ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate(ctx.lastUpdated);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.lastUpdatedAr);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.sections);
      }
    }, dependencies: [CommonModule, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.privacy-page[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 48px 32px 96px;\n  color: var(--tx);\n}\n.privacy-hero[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 56px;\n  padding-bottom: 36px;\n  border-bottom: 1px solid var(--br);\n}\n.privacy-hero__title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: clamp(2rem, 5vw, 3.2rem);\n  letter-spacing: 0.04em;\n  margin: 0 0 12px;\n  background:\n    linear-gradient(\n      120deg,\n      var(--gold),\n      var(--cyan));\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n.privacy-hero__title-ar[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fa);\n  font-size: 1.1rem;\n  color: var(--mu);\n  margin-top: 8px;\n  -webkit-text-fill-color: initial;\n}\n.privacy-hero__sub[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 1rem;\n  max-width: 580px;\n  margin: 0 auto 18px;\n}\n.privacy-hero__date[_ngcontent-%COMP%] {\n  color: var(--dim);\n  font-size: 0.82rem;\n  margin: 0;\n}\n.privacy-hero__date[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.privacy-hero__date-ar[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-family: var(--fa);\n  margin-left: 8px;\n  color: var(--mu);\n}\n.privacy-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 48px;\n  align-items: flex-start;\n}\n@media (max-width: 860px) {\n  .privacy-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n.privacy-toc[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 24px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 14px;\n  padding: 20px;\n  max-height: calc(100vh - 48px);\n  overflow-y: auto;\n}\n@media (max-width: 860px) {\n  .privacy-toc[_ngcontent-%COMP%] {\n    position: static;\n    max-height: none;\n  }\n}\n.privacy-toc__title[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--fh);\n  font-size: 0.78rem;\n  letter-spacing: 0.08em;\n  color: var(--gold);\n  text-transform: uppercase;\n  margin-bottom: 14px;\n}\n.privacy-toc[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.privacy-toc[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mu);\n  text-align: left;\n  padding: 6px 8px;\n  border-radius: 6px;\n  font-size: 0.82rem;\n  cursor: pointer;\n  width: 100%;\n  font-family: inherit;\n  transition: color 0.15s, background 0.15s;\n}\n.privacy-toc[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n  background: rgba(168, 85, 247, 0.08);\n}\n.privacy-content[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  line-height: 1.75;\n  color: var(--tx);\n  max-width: 800px;\n}\n.privacy-content[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {\n  margin-bottom: 44px;\n  scroll-margin-top: 24px;\n}\n.privacy-content[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.privacy-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.4rem;\n  letter-spacing: 0.02em;\n  margin: 0 0 16px;\n  color: var(--gold);\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--br);\n}\n.privacy-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  color: var(--cyan);\n  text-transform: uppercase;\n  margin: 24px 0 10px;\n}\n.privacy-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n  color: var(--mu);\n}\n.privacy-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--tx);\n}\n.privacy-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  padding-left: 22px;\n}\n.privacy-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  color: var(--mu);\n  line-height: 1.65;\n}\n.privacy-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--tx);\n}\n.privacy-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::marker {\n  color: var(--gold);\n}\n.privacy-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.dpo-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.08),\n      rgba(251, 191, 36, 0.04));\n  border: 1px solid var(--br);\n  border-left: 3px solid var(--gold);\n  border-radius: 10px;\n  padding: 20px 24px;\n  margin: 20px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  font-size: 0.9rem;\n}\n.dpo-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 100px;\n  color: var(--gold);\n  font-weight: 600;\n}\n.back-to-contact[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding-top: 20px;\n  border-top: 1px dashed var(--br);\n  color: var(--dim);\n  font-size: 0.9rem;\n}\n.inline-link[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  text-decoration: underline;\n  text-underline-offset: 2px;\n  transition: color 0.15s;\n}\n.inline-link[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n}\n@media (prefers-reduced-motion: reduce) {\n  .privacy-toc[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .inline-link[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=privacy.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivacyComponent, { className: "PrivacyComponent", filePath: "src\\app\\pages\\privacy\\privacy.component.ts", lineNumber: 30 });
})();
export {
  PrivacyComponent
};
//# sourceMappingURL=chunk-X73J44OW.js.map
