import {
  PlatformSponsorsStripComponent
} from "./chunk-HAFUZNCS.js";
import {
  PlatformSponsorService
} from "./chunk-O6BWIF6D.js";
import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DestroyRef,
  ElementRef,
  catchError,
  forkJoin,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/home/home.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => "b" + $item.id;
var _forTrack2 = ($index, $item) => $item.name;
var _forTrack3 = ($index, $item) => $item.n;
var _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var _c1 = () => [1, 2, 3, 4, 5, 6];
var _c2 = (a0) => ["/tournaments", a0];
function HomeComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 110);
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    \u0275\u0275styleProp("--i", p_r1);
  }
}
function HomeComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275element(1, "span", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Live \xB7 ", ctx_r1.activeLiveCount(), " tournament", ctx_r1.activeLiveCount() === 1 ? "" : "s", "");
  }
}
function HomeComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.liveTournaments().length, " open for registration");
  }
}
function HomeComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Esports Platform");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_For_152_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 112)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 113);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 114);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 115);
    \u0275\u0275text(8, "\xB7");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(t_r3.status) === "live" ? "ticker-live" : "ticker-game");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusClass(t_r3.status) === "live" ? "\u25CF LIVE" : "UPCOMING");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r3.game_label, " \xB7 ", t_r3.name, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r3.participant_count, "/", t_r3.max_participants, "");
  }
}
function HomeComponent_Conditional_153_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 112)(1, "span", 116);
    \u0275\u0275text(2, "DAWRI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 113);
    \u0275\u0275text(4, "GCC Esports Platform \xB7 Free to join");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 115);
    \u0275\u0275text(6, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 112)(8, "span", 116);
    \u0275\u0275text(9, "EA FC 25");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 113);
    \u0275\u0275text(11, "PUBG Mobile \xB7 Call of Duty Mobile");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 115);
    \u0275\u0275text(13, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 112)(15, "span", 116);
    \u0275\u0275text(16, "4 FORMATS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 113);
    \u0275\u0275text(18, "SE \xB7 DE \xB7 Round Robin \xB7 Swiss");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "span", 115);
    \u0275\u0275text(20, "\xB7");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_For_155_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 112)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 113);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 114);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 115);
    \u0275\u0275text(8, "\xB7");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(t_r4.status) === "live" ? "ticker-live" : "ticker-game");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusClass(t_r4.status) === "live" ? "\u25CF LIVE" : "UPCOMING");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r4.game_label, " \xB7 ", t_r4.name, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r4.participant_count, "/", t_r4.max_participants, "");
  }
}
function HomeComponent_Conditional_156_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 112)(1, "span", 116);
    \u0275\u0275text(2, "DAWRI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 113);
    \u0275\u0275text(4, "GCC Esports Platform \xB7 Free to join");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 115);
    \u0275\u0275text(6, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 112)(8, "span", 116);
    \u0275\u0275text(9, "EA FC 25");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 113);
    \u0275\u0275text(11, "PUBG Mobile \xB7 Call of Duty Mobile");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "span", 115);
    \u0275\u0275text(13, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 112)(15, "span", 116);
    \u0275\u0275text(16, "4 FORMATS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 113);
    \u0275\u0275text(18, "SE \xB7 DE \xB7 Round Robin \xB7 Swiss");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "span", 115);
    \u0275\u0275text(20, "\xB7");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_Conditional_157_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275element(1, "app-platform-sponsors-strip", 117);
    \u0275\u0275elementStart(2, "div", 118)(3, "a", 119);
    \u0275\u0275text(4, " See All Partners ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 120);
    \u0275\u0275element(6, "path", 22)(7, "path", 23);
    \u0275\u0275elementEnd()()()();
  }
}
function HomeComponent_Conditional_173_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 121);
  }
}
function HomeComponent_Conditional_173_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275repeaterCreate(1, HomeComponent_Conditional_173_For_2_Template, 1, 0, "div", 121, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function HomeComponent_Conditional_174_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122)(1, "p");
    \u0275\u0275text(2, "No active tournaments right now. ");
    \u0275\u0275elementStart(3, "a", 123);
    \u0275\u0275text(4, "Browse all \u2192");
    \u0275\u0275elementEnd()()();
  }
}
function HomeComponent_Conditional_175_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getPrizePool(t_r5));
  }
}
function HomeComponent_Conditional_175_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 124)(1, "div", 125)(2, "span", 126);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 127);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 128);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 129)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, HomeComponent_Conditional_175_For_2_Conditional_13_Template, 2, 1, "div", 130);
    \u0275\u0275elementStart(14, "div", 131);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c2, t_r5.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r5.game_label);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(t_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(t_r5.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r5.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r5.format_label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r5.participant_count, "/", t_r5.max_participants, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(13, ctx_r1.getPrizePool(t_r5) ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getStatusClass(t_r5.status) === "open" ? "Register" : "Watch");
  }
}
function HomeComponent_Conditional_175_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275repeaterCreate(1, HomeComponent_Conditional_175_For_2_Template, 16, 13, "a", 124, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.topTournaments());
  }
}
function HomeComponent_For_190_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 132)(1, "div", 133);
    \u0275\u0275element(2, "img", 134)(3, "div", 135)(4, "div", 136);
    \u0275\u0275elementStart(5, "div", 137);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 138);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 139);
    \u0275\u0275element(10, "span", 140);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 141)(13, "h3", 142);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 143);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 144)(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 145);
    \u0275\u0275text(21, " View tournaments ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(22, "svg", 146);
    \u0275\u0275element(23, "path", 22)(24, "path", 23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const g_r6 = ctx.$implicit;
    const i_r7 = ctx.$index;
    \u0275\u0275styleProp("--game-color", g_r6.color)("animation-delay", i_r7 * 0.1 + "s");
    \u0275\u0275advance(2);
    \u0275\u0275property("src", g_r6.cover, \u0275\u0275sanitizeUrl)("alt", g_r6.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(g_r6.shortCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r6.badge);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", g_r6.activeText || "Active now", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(g_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r6.desc);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(g_r6.formatsText || "All formats");
  }
}
function HomeComponent_For_205_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 149);
  }
}
function HomeComponent_For_205_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 147)(1, "div", 148);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, HomeComponent_For_205_Conditional_3_Template, 1, 0, "div", 149);
    \u0275\u0275elementStart(4, "h3", 150);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 151);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    const i_r9 = ctx.$index;
    const \u0275i_537_r10 = ctx.$index;
    const \u0275$count_537_r11 = ctx.$count;
    \u0275\u0275styleProp("animation-delay", i_r9 * 0.12 + "s");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r8.n);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, !(\u0275i_537_r10 === \u0275$count_537_r11 - 1) ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r8.desc);
  }
}
function HomeComponent_For_220_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 152)(1, "span", 153);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 154);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 155);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 156);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "div", 157);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r12 = ctx.$implicit;
    const i_r13 = ctx.$index;
    \u0275\u0275styleProp("animation-delay", i_r13 * 0.08 + "s");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("0", i_r13 + 1, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r12.badge);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r12.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r12.desc);
  }
}
function HomeComponent_For_235_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158)(1, "span", 159);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 160);
    \u0275\u0275element(3, "polyline", 161);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r14 = ctx.$implicit;
    const i_r15 = ctx.$index;
    \u0275\u0275styleProp("animation-delay", i_r15 * 0.07 + "s");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", f_r14.replace("\u2713 ", ""), " ");
  }
}
function HomeComponent_For_271_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 92);
  }
  if (rf & 2) {
    const p_r16 = ctx.$implicit;
    \u0275\u0275property("src", p_r16.img, \u0275\u0275sanitizeUrl)("alt", p_r16.name);
  }
}
function HomeComponent_For_297_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 162);
  }
  if (rf & 2) {
    const i_r17 = ctx.$implicit;
    \u0275\u0275styleProp("--i", i_r17);
  }
}
var HomeComponent = class _HomeComponent {
  constructor() {
    this.api = inject(ApiService);
    this.sponsorService = inject(PlatformSponsorService);
    this.destroyRef = inject(DestroyRef);
    this.el = inject(ElementRef);
    this.hasPartners = signal(false);
    this.liveTournaments = signal([]);
    this.topTournaments = signal([]);
    this.topPlayers = signal([]);
    this.statsLoading = signal(true);
    this.activeLiveCount = signal(0);
    this.games = [
      {
        name: "EA FC 25",
        icon: "\u26BD",
        badge: "All formats",
        color: "#16a34a",
        shortCode: "FC",
        activeText: "Active now",
        formatsText: "All formats",
        cover: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&q=80&auto=format&fit=crop",
        desc: "The world's biggest football game. SE, DE, Round Robin & Swiss."
      },
      {
        name: "PUBG Mobile",
        icon: "\u{1F52B}",
        badge: "SE \xB7 DE \xB7 Swiss",
        color: "#d4af37",
        shortCode: "PB",
        activeText: "Active now",
        formatsText: "SE \xB7 DE \xB7 Swiss",
        cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop",
        desc: "Battle royale at its finest. Squad up and compete for the Chicken Dinner."
      },
      {
        name: "Call of Duty",
        icon: "\u{1F4A3}",
        badge: "SE \xB7 DE \xB7 Swiss",
        color: "#2e8bff",
        shortCode: "CoD",
        activeText: "Active now",
        formatsText: "SE \xB7 DE \xB7 Swiss",
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80&auto=format&fit=crop",
        desc: "Fast-paced mobile FPS. Dominate the leaderboard across the GCC."
      }
    ];
    this.formats = [
      { name: "Single Elimination", icon: "\u{1F3C6}", badge: "Most popular", desc: "Classic knockout. One loss and you are out. Fast and dramatic." },
      { name: "Double Elimination", icon: "\u2694", badge: "Fairest knockout", desc: "Two brackets. Lose once and you get a second chance." },
      { name: "Round Robin", icon: "\u{1F504}", badge: "Most accurate", desc: "Everyone plays everyone. Best overall record wins." },
      { name: "Swiss System", icon: "\u265F", badge: "Most sophisticated", desc: "Paired by score. No eliminations. Full ranking produced." }
    ];
    this.steps = [
      { n: "01", title: "Create or join a tournament", desc: "Browse public events or create your own in under 2 minutes." },
      { n: "02", title: "Compete and submit results", desc: "Play your match, upload a screenshot. The bracket updates instantly." },
      { n: "03", title: "Win prizes", desc: "Corporate prize pools pay out automatically \u2014 PSN cards, Apple credit, PUBG UC." }
    ];
    this.b2bFeatures = [
      "\u2713 Automated bracket generation",
      "\u2713 HR system integration (SAP, Oracle, Workday)",
      "\u2713 Department-level engagement reports",
      "\u2713 White label on your company subdomain",
      "\u2713 Bulk digital prize distribution",
      "\u2713 Arabic RTL \u2014 native GCC experience"
    ];
    this.players = [
      { name: "Faisal A.", role: "PUBG Champion", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face" },
      { name: "Sara K.", role: "EA FC Finalist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop&crop=face" },
      { name: "Omar M.", role: "CoD Finalist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face" },
      { name: "Noura R.", role: "Tournament Org", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face" },
      { name: "Khalid T.", role: "Swiss Master", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face" }
    ];
    this.heroParticles = Array.from({ length: 38 }, (_, i) => i);
  }
  ngOnInit() {
    this.sponsorService.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (d) => this.hasPartners.set(d.title.length + d.standard.length > 0),
      error: () => this.hasPartners.set(false)
    });
    forkJoin({
      tournaments: this.api.getTournaments({}).pipe(catchError(() => of({ data: [], meta: null, links: null }))),
      leaderboard: this.api.getLeaderboard("ea_fc", 5).pipe(catchError(() => of({ data: [] })))
    }).subscribe(({ tournaments, leaderboard }) => {
      const all = tournaments.data ?? [];
      const live = all.filter((t) => !["completed", "cancelled"].includes(t.status));
      const liveCount = all.filter((t) => ["in_progress", "ongoing"].includes(t.status)).length;
      this.liveTournaments.set(live);
      this.topTournaments.set(live.slice(0, 6));
      this.topPlayers.set(leaderboard.data ?? []);
      this.activeLiveCount.set(liveCount);
      this.statsLoading.set(false);
    });
  }
  getStatusClass(status) {
    if (["in_progress", "ongoing"].includes(status))
      return "live";
    if (["registration_open", "registration"].includes(status))
      return "open";
    return "upcoming";
  }
  getStatusLabel(status) {
    if (["in_progress", "ongoing"].includes(status))
      return "LIVE";
    if (["registration_open", "registration"].includes(status))
      return "Open";
    return status.replace(/_/g, " ");
  }
  getPrizePool(t) {
    if (!t.prize_pool)
      return "";
    if (Array.isArray(t.prize_pool) && t.prize_pool.length > 0)
      return t.prize_pool[0]?.reward ?? "";
    if (typeof t.prize_pool === "string")
      return t.prize_pool;
    return "";
  }
  ngAfterViewInit() {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }), { threshold: 0.12 });
    this.el.nativeElement.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
    const countObserver = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        this.runCount(e.target, reduce);
        countObserver.unobserve(e.target);
      }
    }), { threshold: 0.4 });
    this.el.nativeElement.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));
  }
  runCount(el, reduce) {
    const target = parseFloat(el.dataset["count"] ?? "0");
    const suffix = el.dataset["suffix"] ?? "";
    const prefix = el.dataset["prefix"] ?? "";
    const dur = 1400;
    if (reduce || target === 0) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = `${prefix}${val.toLocaleString()}${suffix}`;
      if (p < 1)
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(t) {
      return new (t || _HomeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 317, vars: 6, consts: [[1, "home"], [1, "hero"], ["aria-hidden", "true", 1, "hero-photo"], [1, "hero-grid-bg"], ["aria-hidden", "true", 1, "hero-beams"], [1, "hero-glow", "g1"], [1, "hero-glow", "g2"], ["aria-hidden", "true", 1, "hero-particles"], [1, "hero-p", 3, "--i"], [1, "hero-wrap"], [1, "hero-left"], [1, "hero-eyebrow"], [1, "live-pill"], [1, "hero-title"], [1, "line"], [1, "line", "outline"], [1, "line", "accent"], ["lang", "ar", "dir", "rtl", 1, "hero-arabic"], [1, "hero-sub"], [1, "hero-actions"], ["routerLink", "/auth", 1, "btn", "btn-primary", "btn-lg"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M5 12h14"], ["d", "m12 5 7 7-7 7"], ["routerLink", "/tournaments", 1, "btn", "btn-ghost", "btn-lg"], [1, "hero-meta"], [1, "hero-meta-item"], ["data-count", "512", 1, "hero-meta-n"], [1, "hero-meta-l"], ["data-count", "4", 1, "hero-meta-n"], ["data-count", "3", "data-suffix", "K+", 1, "hero-meta-n"], ["data-count", "200", "data-suffix", "+", 1, "hero-meta-n", "accent-n"], [1, "hero-right"], [1, "feature-card"], [1, "feature-card__shimmer"], [1, "fc-header"], [1, "fc-game"], [1, "dot"], [1, "fc-body"], [1, "fc-title"], [1, "fc-sub"], [1, "mini-bracket"], [1, "mb-match"], [1, "mb-row", "win"], [1, "mb-name"], [1, "mb-flag"], [1, "mb-score"], [1, "mb-row", "lose"], [1, "mb-row", "pending"], [1, "fc-prize"], [1, "fc-prize-l"], [1, "fc-prize-n"], [1, "fc-prize-curr"], ["routerLink", "/tournaments", 1, "fc-cta"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["aria-hidden", "true", 1, "ticker"], [1, "ticker-track"], [1, "sponsors-wrap"], [1, "section"], [1, "section-wrap"], [1, "section-head"], [1, "eyebrow"], [1, "section-title"], ["routerLink", "/tournaments", 1, "btn", "btn-ghost"], [1, "t-grid"], [1, "section", "section--alt"], [1, "section-lede"], [1, "games-grid"], ["routerLink", "/tournaments", 1, "game-card", "reveal", 3, "--game-color", "animation-delay"], [1, "steps"], [1, "step", "reveal", 3, "animation-delay"], [1, "formats"], [1, "format", "reveal", 3, "animation-delay"], [1, "b2b"], [1, "b2b-content"], [1, "b2b-lede"], [1, "b2b-feats"], [1, "b2b-feat", "reveal", 3, "animation-delay"], ["routerLink", "/pricing", 1, "btn", "btn-violet", "btn-lg", 2, "margin-top", "32px"], [1, "b2b-visual", "reveal"], [1, "b2b-card"], [1, "b2b-card__head"], [1, "b2b-card__title"], [1, "b2b-card__live"], [1, "b2b-card__stats"], [1, "b2b-card__stat"], [1, "b2b-card__stat-n"], [1, "b2b-card__stat-l"], [1, "b2b-card__progress-label"], [1, "b2b-card__bar"], [1, "b2b-card__bar-fill"], [1, "b2b-card__players"], ["loading", "lazy", 1, "b2b-card__avatar", 3, "src", "alt"], [1, "b2b-card__more"], [1, "b2b-card__footer"], [1, "b2b-card__footer-stat"], [1, "b2b-card__footer-n"], [1, "b2b-card__footer-l"], [1, "b2b-card__divider"], [1, "cta"], [1, "cta-grid-bg"], [1, "cta-glow"], ["aria-hidden", "true", 1, "cta-particles"], [1, "cta-p", 3, "--i"], [1, "cta-wrap"], [1, "eyebrow", 2, "display", "inline-flex"], [1, "cta-title"], [1, "cta-sub"], [1, "cta-actions"], ["routerLink", "/contact", 1, "btn", "btn-ghost", "btn-lg"], [1, "hero-p"], [1, "live-pill", "open-reg"], [1, "ticker-item"], [1, "ticker-name"], [1, "ticker-score"], [1, "ticker-sep"], [1, "ticker-game"], ["variant", "hero"], [1, "see-all-partners"], ["routerLink", "/sponsors", 1, "see-all-partners__link"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "t-skel"], [1, "t-empty"], ["routerLink", "/tournaments"], [1, "t-card", "reveal", 3, "routerLink"], [1, "t-card-head"], [1, "t-game"], [1, "t-status"], [1, "t-name"], [1, "t-meta"], [1, "t-prize"], [1, "t-cta"], ["routerLink", "/tournaments", 1, "game-card", "reveal"], [1, "game-cover"], ["loading", "lazy", 1, "game-cover-img", 3, "src", "alt"], [1, "game-cover-bar"], [1, "game-cover-stripe"], [1, "game-cover-glyph"], [1, "game-cover-tag"], [1, "game-cover-active"], [1, "game-cover-dot"], [1, "game-body"], [1, "game-name"], [1, "game-desc"], [1, "game-foot"], [1, "game-foot-arrow"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "step", "reveal"], [1, "step-num"], [1, "step-connector"], [1, "step-title"], [1, "step-desc"], [1, "format", "reveal"], [1, "format-num"], [1, "format-tag"], [1, "format-name"], [1, "format-desc"], [1, "format-bar"], [1, "b2b-feat", "reveal"], [1, "b2b-feat-check"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], [1, "cta-p"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementStart(4, "div", 4);
        \u0275\u0275element(5, "span")(6, "span")(7, "span");
        \u0275\u0275elementEnd();
        \u0275\u0275element(8, "div", 5)(9, "div", 6);
        \u0275\u0275elementStart(10, "div", 7);
        \u0275\u0275repeaterCreate(11, HomeComponent_For_12_Template, 1, 2, "span", 8, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 9)(14, "div", 10)(15, "div", 11);
        \u0275\u0275template(16, HomeComponent_Conditional_16_Template, 3, 2, "span", 12)(17, HomeComponent_Conditional_17_Template, 2, 1)(18, HomeComponent_Conditional_18_Template, 2, 0);
        \u0275\u0275elementStart(19, "span");
        \u0275\u0275text(20, "Saudi Arabia & GCC");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "h1", 13)(22, "span", 14);
        \u0275\u0275text(23, "Compete.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "span", 15);
        \u0275\u0275text(25, "Win.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span", 16);
        \u0275\u0275text(27, "Get paid.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "span", 17);
        \u0275\u0275text(29, ".\u062A\u0646\u0627\u0641\u0633. \u0627\u0631\u0628\u062D. \u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u062C\u0627\u0626\u0632\u062A\u0643");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "p", 18);
        \u0275\u0275text(31, " The first Arabic-native tournament platform for EA FC 25, PUBG Mobile, and Call of Duty Mobile. Free to join. Corporate prize pools paid out automatically. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 19)(33, "a", 20);
        \u0275\u0275text(34, " Join free ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(35, "svg", 21);
        \u0275\u0275element(36, "path", 22)(37, "path", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(38, "a", 24);
        \u0275\u0275text(39, "Browse tournaments");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 25)(41, "div", 26)(42, "div", 27);
        \u0275\u0275text(43, "0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "div", 28);
        \u0275\u0275text(45, "Max participants");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "div", 26)(47, "div", 29);
        \u0275\u0275text(48, "0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "div", 28);
        \u0275\u0275text(50, "Bracket formats");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "div", 26)(52, "div", 30);
        \u0275\u0275text(53, "0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "div", 28);
        \u0275\u0275text(55, "Prize SKUs");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "div", 26)(57, "div", 31);
        \u0275\u0275text(58, "0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "div", 28);
        \u0275\u0275text(60, "Companies");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(61, "aside", 32)(62, "div", 33);
        \u0275\u0275element(63, "div", 34);
        \u0275\u0275elementStart(64, "div", 35)(65, "span", 36);
        \u0275\u0275text(66, "EA FC 25 \xB7 Single Elim");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "span", 12);
        \u0275\u0275element(68, "span", 37);
        \u0275\u0275text(69, "Quarter-finals");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(70, "div", 38)(71, "div", 39);
        \u0275\u0275text(72, "Riyadh Spring Cup");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "div", 40);
        \u0275\u0275text(74, "Round 4 \xB7 8 of 64 remaining");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "div", 41)(76, "div", 42)(77, "div", 43)(78, "span", 44)(79, "span", 45);
        \u0275\u0275text(80, "\u{1F1F8}\u{1F1E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(81, "FaisalA");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(82, "span", 46);
        \u0275\u0275text(83, "3");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(84, "div", 47)(85, "span", 44)(86, "span", 45);
        \u0275\u0275text(87, "\u{1F1E6}\u{1F1EA}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(88, "OmarM_07");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "span", 46);
        \u0275\u0275text(90, "1");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(91, "div", 42)(92, "div", 43)(93, "span", 44)(94, "span", 45);
        \u0275\u0275text(95, "\u{1F1F0}\u{1F1FC}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(96, "NouraR");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "span", 46);
        \u0275\u0275text(98, "2");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(99, "div", 47)(100, "span", 44)(101, "span", 45);
        \u0275\u0275text(102, "\u{1F1F6}\u{1F1E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(103, "KhalidT");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "span", 46);
        \u0275\u0275text(105, "0");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(106, "div", 42)(107, "div", 43)(108, "span", 44)(109, "span", 45);
        \u0275\u0275text(110, "\u{1F1F8}\u{1F1E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(111, "SaraK");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "span", 46);
        \u0275\u0275text(113, "4");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(114, "div", 47)(115, "span", 44)(116, "span", 45);
        \u0275\u0275text(117, "\u{1F1E7}\u{1F1ED}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(118, "YousefL");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "span", 46);
        \u0275\u0275text(120, "2");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(121, "div", 42)(122, "div", 48)(123, "span", 44)(124, "span", 45);
        \u0275\u0275text(125, "\u{1F1F4}\u{1F1F2}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(126, "HamadZ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(127, "span", 46);
        \u0275\u0275text(128, "\u2014");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(129, "div", 48)(130, "span", 44)(131, "span", 45);
        \u0275\u0275text(132, "\u{1F1F8}\u{1F1E6}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(133, "AhmedB");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(134, "span", 46);
        \u0275\u0275text(135, "\u2014");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(136, "div", 49)(137, "div")(138, "div", 50);
        \u0275\u0275text(139, "Prize pool");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(140, "div", 51);
        \u0275\u0275text(141, "15,000");
        \u0275\u0275elementStart(142, "span", 52);
        \u0275\u0275text(143, " SAR");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(144, "a", 53);
        \u0275\u0275text(145, " Watch live ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(146, "svg", 54);
        \u0275\u0275element(147, "path", 22)(148, "path", 23);
        \u0275\u0275elementEnd()()()()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(149, "div", 55)(150, "div", 56);
        \u0275\u0275repeaterCreate(151, HomeComponent_For_152_Template, 9, 7, null, null, _forTrack0);
        \u0275\u0275template(153, HomeComponent_Conditional_153_Template, 21, 0);
        \u0275\u0275repeaterCreate(154, HomeComponent_For_155_Template, 9, 7, null, null, _forTrack1);
        \u0275\u0275template(156, HomeComponent_Conditional_156_Template, 21, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(157, HomeComponent_Conditional_157_Template, 8, 0, "div", 57);
        \u0275\u0275elementStart(158, "section", 58)(159, "div", 59)(160, "div", 60)(161, "div")(162, "div", 61);
        \u0275\u0275text(163, "Live & upcoming");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(164, "h2", 62);
        \u0275\u0275text(165, "Tournaments ");
        \u0275\u0275elementStart(166, "em");
        \u0275\u0275text(167, "right now");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(168, "a", 63);
        \u0275\u0275text(169, " View all ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(170, "svg", 54);
        \u0275\u0275element(171, "path", 22)(172, "path", 23);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(173, HomeComponent_Conditional_173_Template, 3, 1, "div", 64)(174, HomeComponent_Conditional_174_Template, 5, 0)(175, HomeComponent_Conditional_175_Template, 3, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(176, "section", 65)(177, "div", 59)(178, "div", 60)(179, "div")(180, "div", 61);
        \u0275\u0275text(181, "Supported games");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(182, "h2", 62);
        \u0275\u0275text(183, "Play what ");
        \u0275\u0275elementStart(184, "em");
        \u0275\u0275text(185, "you love");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(186, "p", 66);
        \u0275\u0275text(187, "Three flagship titles, every bracket format. More games rolling out across 2026 \u2014 vote inside the platform for what comes next.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(188, "div", 67);
        \u0275\u0275repeaterCreate(189, HomeComponent_For_190_Template, 25, 12, "a", 68, _forTrack2);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(191, "section", 58)(192, "div", 59)(193, "div", 60)(194, "div")(195, "div", 61);
        \u0275\u0275text(196, "How it works");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(197, "h2", 62);
        \u0275\u0275text(198, "Three steps to ");
        \u0275\u0275elementStart(199, "em");
        \u0275\u0275text(200, "winning");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(201, "p", 66);
        \u0275\u0275text(202, "From signup to payout in under five minutes. The platform handles brackets, scoring, and prize distribution.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(203, "div", 69);
        \u0275\u0275repeaterCreate(204, HomeComponent_For_205_Template, 8, 6, "div", 70, _forTrack3);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(206, "section", 65)(207, "div", 59)(208, "div", 60)(209, "div")(210, "div", 61);
        \u0275\u0275text(211, "Tournament formats");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(212, "h2", 62);
        \u0275\u0275text(213, "Four ways to ");
        \u0275\u0275elementStart(214, "em");
        \u0275\u0275text(215, "compete");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(216, "p", 66);
        \u0275\u0275text(217, "Every bracket type the IOC and ESL use, configurable in a click.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(218, "div", 71);
        \u0275\u0275repeaterCreate(219, HomeComponent_For_220_Template, 10, 6, "div", 72, _forTrack2);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(221, "section", 58)(222, "div", 59)(223, "div", 73)(224, "div", 74)(225, "div", 61);
        \u0275\u0275text(226, "For companies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(227, "h2", 62);
        \u0275\u0275text(228, "Run employee tournaments with ");
        \u0275\u0275elementStart(229, "em");
        \u0275\u0275text(230, "zero admin overhead");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(231, "p", 75);
        \u0275\u0275text(232, " HR teams across Saudi Arabia and the GCC use Dawri to run engagement programs for their employees. Set up a company tournament in under 10 minutes, fund the prize pool, and let the platform handle everything else. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(233, "div", 76);
        \u0275\u0275repeaterCreate(234, HomeComponent_For_235_Template, 5, 3, "div", 77, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(236, "a", 78);
        \u0275\u0275text(237, " View enterprise plans ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(238, "svg", 21);
        \u0275\u0275element(239, "path", 22)(240, "path", 23);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(241, "div", 79)(242, "div", 80)(243, "div", 81)(244, "span", 82);
        \u0275\u0275text(245, "Q1 Engineering Cup");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(246, "span", 83);
        \u0275\u0275element(247, "span", 37);
        \u0275\u0275text(248, "Live");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(249, "div", 84)(250, "div", 85)(251, "div", 86);
        \u0275\u0275text(252, "128");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(253, "div", 87);
        \u0275\u0275text(254, "Players");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(255, "div", 85)(256, "div", 86);
        \u0275\u0275text(257, "R4");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(258, "div", 87);
        \u0275\u0275text(259, "Current round");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(260, "div", 85)(261, "div", 86);
        \u0275\u0275text(262, "5K SAR");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(263, "div", 87);
        \u0275\u0275text(264, "Prize pool");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(265, "div", 88);
        \u0275\u0275text(266, "Bracket completion");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(267, "div", 89);
        \u0275\u0275element(268, "div", 90);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(269, "div", 91);
        \u0275\u0275repeaterCreate(270, HomeComponent_For_271_Template, 1, 2, "img", 92, _forTrack2);
        \u0275\u0275elementStart(272, "span", 93);
        \u0275\u0275text(273, "+84");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(274, "div", 94)(275, "div", 95)(276, "span", 96);
        \u0275\u0275text(277, "10 min");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(278, "span", 97);
        \u0275\u0275text(279, "to set up");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(280, "div", 98);
        \u0275\u0275elementStart(281, "div", 95)(282, "span", 96);
        \u0275\u0275text(283, "200+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(284, "span", 97);
        \u0275\u0275text(285, "companies");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(286, "div", 98);
        \u0275\u0275elementStart(287, "div", 95)(288, "span", 96);
        \u0275\u0275text(289, "Auto");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(290, "span", 97);
        \u0275\u0275text(291, "prize payouts");
        \u0275\u0275elementEnd()()()()()()()();
        \u0275\u0275elementStart(292, "section", 99);
        \u0275\u0275element(293, "div", 100)(294, "div", 101);
        \u0275\u0275elementStart(295, "div", 102);
        \u0275\u0275repeaterCreate(296, HomeComponent_For_297_Template, 1, 2, "span", 103, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(298, "div", 104)(299, "div", 105);
        \u0275\u0275text(300, "Ready to play");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(301, "h2", 106);
        \u0275\u0275text(302, "Join the ");
        \u0275\u0275elementStart(303, "em");
        \u0275\u0275text(304, "GCC's #1");
        \u0275\u0275elementEnd();
        \u0275\u0275element(305, "br");
        \u0275\u0275text(306, "esports platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(307, "p", 107);
        \u0275\u0275text(308, " Thousands of players across Saudi Arabia and the GCC are already competing. It's completely free to join. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(309, "div", 108)(310, "a", 20);
        \u0275\u0275text(311, " Create free account ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(312, "svg", 21);
        \u0275\u0275element(313, "path", 22)(314, "path", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(315, "a", 109);
        \u0275\u0275text(316, "Talk to sales");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275repeater(ctx.heroParticles);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(16, ctx.activeLiveCount() > 0 ? 16 : ctx.liveTournaments().length > 0 ? 17 : 18);
        \u0275\u0275advance(135);
        \u0275\u0275repeater(ctx.liveTournaments());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(153, ctx.liveTournaments().length === 0 ? 153 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.liveTournaments());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(156, ctx.liveTournaments().length === 0 ? 156 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(157, ctx.hasPartners() ? 157 : -1);
        \u0275\u0275advance(16);
        \u0275\u0275conditional(173, ctx.statsLoading() ? 173 : ctx.topTournaments().length === 0 ? 174 : 175);
        \u0275\u0275advance(16);
        \u0275\u0275repeater(ctx.games);
        \u0275\u0275advance(15);
        \u0275\u0275repeater(ctx.steps);
        \u0275\u0275advance(15);
        \u0275\u0275repeater(ctx.formats);
        \u0275\u0275advance(15);
        \u0275\u0275repeater(ctx.b2bFeatures);
        \u0275\u0275advance(36);
        \u0275\u0275repeater(ctx.players);
        \u0275\u0275advance(26);
        \u0275\u0275repeater(\u0275\u0275pureFunction0(5, _c0));
      }
    }, dependencies: [RouterLink, CommonModule, PlatformSponsorsStripComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  --gutter: 32px;\n  --maxw: 1440px;\n  --line: var(--br);\n  --line-2: var(--br2);\n  --text-dim: var(--mu);\n  --text-mute: var(--dim);\n  --good: var(--green);\n  --display: var(--fh);\n  --body: var(--fb);\n  --mono: var(--fm);\n  --arabic: var(--fa);\n}\n.home[_ngcontent-%COMP%] {\n  background: var(--bg);\n  overflow-x: hidden;\n}\nimg[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 100%;\n}\n@keyframes _ngcontent-%COMP%_heroFadeUp {\n  from {\n    opacity: 0;\n    transform: translateY(28px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat1 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(40px, -60px) scale(1.08);\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat2 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(-50px, 40px) scale(1.12);\n  }\n}\n@keyframes _ngcontent-%COMP%_orbFloat3 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, 50px) scale(0.95);\n  }\n  66% {\n    transform: translate(-30px, -30px) scale(1.05);\n  }\n}\n@keyframes _ngcontent-%COMP%_gridPan {\n  from {\n    background-position: 0 0;\n  }\n  to {\n    background-position: 80px 80px;\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0%, 100% {\n    opacity: 0.6;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_scroll {\n  from {\n    transform: translateX(0);\n  }\n  to {\n    transform: translateX(-50%);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.35;\n  }\n}\n@keyframes _ngcontent-%COMP%_tpulse {\n  0%, 100% {\n    opacity: 0.5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_barFill {\n  from {\n    width: 0;\n  }\n  to {\n    width: 72%;\n  }\n}\n@keyframes _ngcontent-%COMP%_floatP {\n  0% {\n    transform: translateY(0) scale(1);\n    opacity: 0;\n  }\n  10% {\n    opacity: 0.8;\n  }\n  90% {\n    opacity: 0.3;\n  }\n  100% {\n    transform: translateY(-120px) scale(0.3);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmerSlide {\n  0% {\n    transform: translateX(-100%) skewX(-20deg);\n    opacity: 0;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    transform: translateX(220%) skewX(-20deg);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_beamSweep {\n  0%, 100% {\n    opacity: 0.35;\n    transform: translateX(-50%) rotate(var(--rot)) scaleY(1);\n  }\n  50% {\n    opacity: 0.7;\n    transform: translateX(-50%) rotate(var(--rot)) scaleY(1.06);\n  }\n}\n@keyframes _ngcontent-%COMP%_pRise {\n  0% {\n    transform: translateY(0) scale(var(--s));\n    opacity: 0;\n  }\n  8% {\n    opacity: var(--o);\n  }\n  92% {\n    opacity: var(--o);\n  }\n  100% {\n    transform: translateY(-90vh) scale(calc(var(--s) * 0.4));\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_kenBurns {\n  0% {\n    transform: scale(1.06) translate(0, 0);\n  }\n  100% {\n    transform: scale(1.16) translate(-2%, -2%);\n  }\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 22px;\n  border-radius: var(--r);\n  font-family: var(--body);\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.2px;\n  border: 1px solid transparent;\n  text-decoration: none;\n  cursor: pointer;\n  transition:\n    transform 0.18s,\n    background 0.18s,\n    border-color 0.18s,\n    color 0.18s,\n    box-shadow 0.18s;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  transition: transform 0.2s;\n}\n.btn[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(3px);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #1a1100;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: var(--accent-soft);\n  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);\n}\n.btn-violet[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #fff;\n}\n.btn-violet[_ngcontent-%COMP%]:hover {\n  background: var(--primary-soft);\n  box-shadow: 0 8px 24px rgba(0, 108, 53, 0.3);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--line-2);\n  color: var(--text);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  border-color: var(--text);\n  background: rgba(255, 255, 255, 0.04);\n}\n.btn-lg[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  font-size: 15px;\n}\n.live-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 5px 12px 5px 10px;\n  border: 1px solid rgba(74, 222, 128, 0.3);\n  background: rgba(74, 222, 128, 0.08);\n  border-radius: 100px;\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--good);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.live-pill[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--good);\n  box-shadow: 0 0 8px var(--good);\n  animation: _ngcontent-%COMP%_pulse 1.6s ease-in-out infinite;\n}\n.live-pill.open-reg[_ngcontent-%COMP%] {\n  border-color: rgba(16, 185, 129, 0.3);\n  background: rgba(16, 185, 129, 0.1);\n  color: #10b981;\n}\n.section[_ngcontent-%COMP%] {\n  padding: 120px var(--gutter);\n  position: relative;\n}\n.section--alt[_ngcontent-%COMP%] {\n  background: var(--bg2);\n}\n.section-wrap[_ngcontent-%COMP%] {\n  max-width: var(--maxw);\n  margin: 0 auto;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 2.5px;\n  text-transform: uppercase;\n  color: var(--accent);\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.eyebrow[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 28px;\n  height: 1px;\n  background: var(--accent);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(40px, 5.5vw, 72px);\n  line-height: 0.95;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  color: var(--text);\n  max-width: 14ch;\n  margin-bottom: 24px;\n}\n.section-title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: var(--accent);\n}\n.section-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 40px;\n  margin-bottom: 60px;\n  flex-wrap: wrap;\n}\n.section-lede[_ngcontent-%COMP%] {\n  max-width: 460px;\n  color: var(--text-dim);\n  font-size: 15px;\n  line-height: 1.65;\n}\n.reveal[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: translateY(24px);\n  transition: opacity 0.65s ease, transform 0.65s ease;\n}\n.reveal.visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0);\n}\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: calc(100vh - 60px);\n  padding: 60px var(--gutter) 80px;\n  border-bottom: 1px solid var(--line);\n  overflow: hidden;\n  background:\n    radial-gradient(\n      ellipse 100% 80% at 30% 20%,\n      rgba(0, 108, 53, 0.14) 0%,\n      transparent 60%),\n    radial-gradient(\n      ellipse 80% 60% at 80% 80%,\n      rgba(212, 175, 55, 0.08) 0%,\n      transparent 50%),\n    var(--bg);\n}\n.hero-photo[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(10, 10, 18, 0.72) 0%,\n      rgba(10, 10, 18, 0.55) 40%,\n      rgba(10, 10, 18, 0.92) 100%),\n    linear-gradient(\n      90deg,\n      var(--bg) 0%,\n      rgba(10, 10, 18, 0.3) 45%,\n      transparent 75%),\n    url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80&auto=format&fit=crop);\n  background-size: cover;\n  background-position: center 30%;\n  animation: _ngcontent-%COMP%_kenBurns 28s ease-in-out infinite alternate;\n}\n.hero-grid-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.055) 1px,\n      transparent 1px);\n  background-size: 80px 80px;\n  animation: _ngcontent-%COMP%_gridPan 14s linear infinite;\n  mask-image:\n    radial-gradient(\n      ellipse 90% 70% at 50% 40%,\n      #000 20%,\n      transparent 75%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 90% 70% at 50% 40%,\n      #000 20%,\n      transparent 75%);\n  opacity: 0.65;\n}\n.hero-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 0;\n  pointer-events: none;\n  border-radius: 50%;\n}\n.hero-glow.g1[_ngcontent-%COMP%] {\n  width: 900px;\n  height: 900px;\n  top: -280px;\n  left: -180px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.32) 0%,\n      rgba(0, 108, 53, 0.08) 40%,\n      transparent 70%);\n  filter: blur(80px);\n  animation: _ngcontent-%COMP%_orbFloat1 18s ease-in-out infinite;\n}\n.hero-glow.g2[_ngcontent-%COMP%] {\n  width: 700px;\n  height: 700px;\n  bottom: -300px;\n  right: -120px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, 0.22) 0%,\n      rgba(212, 175, 55, 0.06) 40%,\n      transparent 70%);\n  filter: blur(90px);\n  animation: _ngcontent-%COMP%_orbFloat2 22s ease-in-out infinite;\n}\n.hero[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  z-index: 0;\n  pointer-events: none;\n  width: 500px;\n  height: 500px;\n  border-radius: 50%;\n  top: 20%;\n  right: 10%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 108, 53, 0.15) 0%,\n      transparent 65%);\n  filter: blur(60px);\n  animation: _ngcontent-%COMP%_orbFloat3 26s ease-in-out infinite;\n}\n.hero-beams[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  overflow: hidden;\n  mix-blend-mode: screen;\n  opacity: 0.9;\n}\n.hero-beams[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -30%;\n  left: 50%;\n  width: clamp(140px, 18vw, 300px);\n  height: 150%;\n  transform-origin: top center;\n  filter: blur(26px);\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(46, 139, 255, 0.34),\n      rgba(46, 139, 255, 0) 72%);\n  animation: _ngcontent-%COMP%_beamSweep 9s ease-in-out infinite;\n}\n.hero-beams[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  --rot:-22deg;\n  left: 32%;\n  animation-delay: 0s;\n}\n.hero-beams[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  --rot:6deg;\n  left: 54%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(0, 108, 53, 0.26),\n      rgba(0, 108, 53, 0) 72%);\n  animation-delay: 1.4s;\n}\n.hero-beams[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  --rot:26deg;\n  left: 72%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(212, 175, 55, 0.18),\n      rgba(212, 175, 55, 0) 72%);\n  animation-delay: 0.7s;\n}\n.hero-particles[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.hero-p[_ngcontent-%COMP%] {\n  --s:1.2;\n  --o:.8;\n  position: absolute;\n  bottom: -10px;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  left: calc(var(--i) * 2.6% + 1%);\n  background:\n    radial-gradient(\n      circle,\n      rgb(91, 166, 255),\n      rgba(46, 139, 255, 0) 70%);\n  box-shadow: 0 0 8px rgba(46, 139, 255, 0.6);\n  animation: _ngcontent-%COMP%_pRise calc(9s + var(--i) * 0.5s) linear infinite;\n  animation-delay: calc(var(--i) * -0.7s);\n}\n.hero-p[_ngcontent-%COMP%]:nth-child(3n) {\n  background:\n    radial-gradient(\n      circle,\n      rgb(232, 201, 101),\n      rgba(212, 175, 55, 0) 70%);\n  box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);\n  --s:1.6;\n  --o:.75;\n}\n.hero-p[_ngcontent-%COMP%]:nth-child(4n) {\n  background:\n    radial-gradient(\n      circle,\n      rgb(74, 222, 128),\n      rgba(74, 222, 128, 0) 70%);\n  box-shadow: 0 0 8px rgba(74, 222, 128, 0.55);\n  --s:1;\n  --o:.65;\n}\n.hero-p[_ngcontent-%COMP%]:nth-child(5n) {\n  --s:2;\n  --o:.5;\n}\n.hero-p[_ngcontent-%COMP%]:nth-child(7n) {\n  --s:.7;\n  --o:.9;\n}\n.hero-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: var(--maxw);\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1.4fr 1fr;\n  gap: 60px;\n  align-items: center;\n  min-height: 70vh;\n}\n@media (max-width: 980px) {\n  .hero-wrap[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 40px;\n  }\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_heroFadeUp 0.7s ease both;\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.05s;\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.14s;\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.22s;\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.3s;\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 0.38s;\n}\n.hero-left[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 0.46s;\n}\n.hero-right[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_heroFadeUp 0.8s 0.28s ease both;\n}\n.hero-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--text-dim);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  margin-bottom: 28px;\n}\n.hero-eyebrow[_ngcontent-%COMP%]   .live-pill[_ngcontent-%COMP%] {\n  font-size: 10px;\n  padding: 4px 10px 4px 8px;\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(56px, 9vw, 132px);\n  line-height: 0.88;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--text);\n  margin-bottom: 8px;\n}\n.hero-title[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {\n  display: block;\n}\n.hero-title[_ngcontent-%COMP%]   .line.accent[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.hero-title[_ngcontent-%COMP%]   .line.outline[_ngcontent-%COMP%] {\n  -webkit-text-stroke: 1.5px var(--text);\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n}\n.hero-arabic[_ngcontent-%COMP%] {\n  font-family: var(--arabic);\n  font-size: 22px;\n  font-weight: 700;\n  color: var(--text-dim);\n  margin: 24px 0 0;\n  display: block;\n  text-align: right;\n}\n.hero-sub[_ngcontent-%COMP%] {\n  font-size: 17px;\n  line-height: 1.6;\n  color: var(--text-dim);\n  max-width: 50ch;\n  margin: 32px 0 36px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.hero-meta[_ngcontent-%COMP%] {\n  margin-top: 48px;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0;\n  border-top: 1px solid var(--line);\n  border-bottom: 1px solid var(--line);\n}\n@media (max-width: 720px) {\n  .hero-meta[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .hero-meta[_ngcontent-%COMP%]   .hero-meta-item[_ngcontent-%COMP%]:nth-child(2) {\n    border-right: none;\n  }\n  .hero-meta[_ngcontent-%COMP%]   .hero-meta-item[_ngcontent-%COMP%]:nth-child(1), .hero-meta[_ngcontent-%COMP%]   .hero-meta-item[_ngcontent-%COMP%]:nth-child(2) {\n    border-bottom: 1px solid var(--line);\n  }\n  .hero-meta[_ngcontent-%COMP%]   .hero-meta-item[_ngcontent-%COMP%]:nth-child(3) {\n    padding-left: 0;\n  }\n}\n.hero-meta-item[_ngcontent-%COMP%] {\n  padding: 22px 24px 22px 0;\n  border-right: 1px solid var(--line);\n}\n.hero-meta-item[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n.hero-meta-item[_ngcontent-%COMP%]:not(:first-child) {\n  padding-left: 24px;\n}\n.hero-meta-n[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 36px;\n  line-height: 1;\n  color: var(--text);\n  letter-spacing: 0.5px;\n  font-variant-numeric: tabular-nums;\n}\n.hero-meta-n.accent-n[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.hero-meta-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin-top: 8px;\n}\n.feature-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      var(--bg3) 0%,\n      var(--bg2) 100%);\n  border: 1px solid var(--line-2);\n  border-radius: var(--r-lg);\n  overflow: hidden;\n  position: relative;\n  transition: box-shadow 0.3s, border-color 0.3s;\n}\n.feature-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(0, 108, 53, 0.09),\n      transparent 50%);\n}\n.feature-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 40px rgba(0, 108, 53, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.2);\n  border-color: rgba(212, 175, 55, 0.25);\n}\n.feature-card__shimmer[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 2;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      105deg,\n      transparent 40%,\n      rgba(255, 255, 255, 0.07) 50%,\n      transparent 60%);\n  transform: translateX(-100%) skewX(-20deg);\n  opacity: 0;\n}\n.feature-card[_ngcontent-%COMP%]:hover   .feature-card__shimmer[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_shimmerSlide 1s ease forwards;\n}\n.fc-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--line);\n}\n.fc-game[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n}\n.fc-body[_ngcontent-%COMP%] {\n  padding: 24px 22px 8px;\n}\n.fc-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 32px;\n  line-height: 1;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--text);\n  margin-bottom: 6px;\n}\n.fc-sub[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n  margin-bottom: 22px;\n}\n.mini-bracket[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 22px;\n}\n.mb-match[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.25);\n  border: 1px solid var(--line);\n  border-radius: var(--r);\n  padding: 12px 14px;\n}\n.mb-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 6px 0;\n  font-size: 13px;\n}\n.mb-row[_ngcontent-%COMP%]    + .mb-row[_ngcontent-%COMP%] {\n  border-top: 1px dashed var(--line);\n}\n.mb-row.win[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 700;\n}\n.mb-row.win[_ngcontent-%COMP%]   .mb-score[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.mb-row.lose[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n}\n.mb-row.pending[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n}\n.mb-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mb-flag[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.mb-score[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-weight: 700;\n}\n.fc-prize[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 18px 22px;\n  border-top: 1px solid var(--line);\n  background: rgba(0, 0, 0, 0.2);\n}\n.fc-prize-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--text-mute);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n}\n.fc-prize-n[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 28px;\n  color: var(--accent);\n  line-height: 1;\n}\n.fc-prize-curr[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n}\n.fc-cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text);\n  text-decoration: none;\n}\n.fc-cta[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: transform 0.2s;\n}\n.fc-cta[_ngcontent-%COMP%]:hover {\n  color: var(--accent);\n}\n.fc-cta[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.sponsors-wrap[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border-bottom: 1px solid var(--line);\n}\n.see-all-partners[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 16px var(--gutter);\n}\n.see-all-partners__link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--mono);\n  font-size: 12px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-dim);\n  text-decoration: none;\n  transition: color 0.15s;\n}\n.see-all-partners__link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: transform 0.2s;\n}\n.see-all-partners__link[_ngcontent-%COMP%]:hover {\n  color: var(--accent);\n}\n.see-all-partners__link[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(3px);\n}\n.ticker[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border-top: 1px solid var(--line);\n  border-bottom: 1px solid var(--line);\n  overflow: hidden;\n  padding: 13px 0;\n  font-family: var(--mono);\n  font-size: 12px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n}\n.ticker-track[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 40px;\n  white-space: nowrap;\n  animation: _ngcontent-%COMP%_scroll 60s linear infinite;\n}\n.ticker-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n}\n.ticker-live[_ngcontent-%COMP%] {\n  color: var(--good);\n}\n.ticker-game[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n}\n.ticker-name[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.ticker-score[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.ticker-sep[_ngcontent-%COMP%] {\n  color: var(--text-mute);\n  opacity: 0.4;\n  font-size: 18px;\n}\n.t-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.t-skel[_ngcontent-%COMP%] {\n  height: 160px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.05);\n  animation: _ngcontent-%COMP%_tpulse 1.5s ease-in-out infinite;\n}\n.t-empty[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: var(--text-dim);\n}\n.t-empty[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.t-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 1.25rem;\n  border-radius: 14px;\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.055),\n      rgba(255, 255, 255, 0.02));\n  border: 1px solid var(--line-2);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  text-decoration: none;\n  color: inherit;\n  transition:\n    transform 0.24s cubic-bezier(0.2, 0.7, 0.2, 1),\n    border-color 0.24s,\n    box-shadow 0.24s;\n}\n.t-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: var(--grad-brand);\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.35s ease;\n}\n.t-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      105deg,\n      transparent 40%,\n      rgba(255, 255, 255, 0.06) 50%,\n      transparent 60%);\n  transform: translateX(-120%) skewX(-18deg);\n  transition: transform 0.7s ease;\n}\n.t-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px);\n  border-color: var(--accent);\n  box-shadow: var(--sh-2), 0 18px 44px -18px rgba(212, 175, 55, 0.4);\n}\n.t-card[_ngcontent-%COMP%]:hover::before {\n  transform: scaleX(1);\n}\n.t-card[_ngcontent-%COMP%]:hover::after {\n  transform: translateX(120%) skewX(-18deg);\n}\n.t-card[_ngcontent-%COMP%]:hover   .t-cta[_ngcontent-%COMP%] {\n  color: var(--accent-soft);\n}\n.t-card[_ngcontent-%COMP%]:hover   .t-cta[_ngcontent-%COMP%]::after {\n  transform: translateX(4px);\n}\n.t-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  z-index: 1;\n}\n.t-game[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: 1px;\n  color: var(--text-dim);\n  text-transform: uppercase;\n}\n.t-status[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  font-weight: 700;\n  padding: 3px 9px 3px 8px;\n  border-radius: 20px;\n  letter-spacing: 1px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  position: relative;\n  z-index: 1;\n}\n.t-status.live[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.t-status.live[_ngcontent-%COMP%]::before {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #ef4444;\n  box-shadow: 0 0 8px #ef4444;\n  animation: _ngcontent-%COMP%_pulse 1.4s ease-in-out infinite;\n}\n.t-status.open[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.15);\n  color: #10b981;\n}\n.t-status.upcoming[_ngcontent-%COMP%] {\n  background: rgba(46, 139, 255, 0.14);\n  color: var(--electric-soft);\n}\n.t-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 1.15rem;\n  color: var(--text);\n  line-height: 1.2;\n  position: relative;\n  z-index: 1;\n}\n.t-meta[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: var(--text-dim);\n  position: relative;\n  z-index: 1;\n}\n.t-prize[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--accent);\n  margin-top: auto;\n  position: relative;\n  z-index: 1;\n}\n.t-cta[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 12px;\n  color: var(--accent);\n  letter-spacing: 1px;\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  transition: color 0.2s;\n}\n.t-cta[_ngcontent-%COMP%]::after {\n  content: "\\2192";\n  transition: transform 0.2s;\n  display: inline-block;\n}\n.games-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n@media (max-width: 900px) {\n  .games-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.game-card[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid var(--line);\n  border-radius: var(--r-lg);\n  overflow: hidden;\n  background: var(--bg2);\n  cursor: pointer;\n  text-decoration: none;\n  display: flex;\n  flex-direction: column;\n  transition:\n    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),\n    border-color 0.25s,\n    box-shadow 0.25s;\n}\n.game-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px) scale(1.01);\n  border-color: var(--game-color, var(--line-2));\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--game-color, var(--accent));\n}\n.game-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      ellipse 80% 50% at 50% 100%,\n      var(--game-color, transparent),\n      transparent 70%);\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.game-card[_ngcontent-%COMP%]:hover::after {\n  opacity: 0.16;\n}\n.game-cover[_ngcontent-%COMP%] {\n  height: 220px;\n  position: relative;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      145deg,\n      var(--bg4, #181826),\n      var(--bg3, #21212e));\n}\n.game-cover-img[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: saturate(0.85) brightness(0.62) contrast(1.05);\n  transform: scale(1.06);\n  transition: transform 0.6s ease, filter 0.35s ease;\n  animation: _ngcontent-%COMP%_kenBurns 18s ease-in-out infinite alternate;\n}\n.game-cover[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  pointer-events: none;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(8, 8, 16, 0.35) 0%,\n      rgba(8, 8, 16, 0.15) 45%,\n      rgba(8, 8, 16, 0.8) 100%),\n    radial-gradient(\n      ellipse 70% 60% at 80% 100%,\n      var(--game-color, transparent),\n      transparent 65%);\n}\n.game-card[_ngcontent-%COMP%]:hover   .game-cover-img[_ngcontent-%COMP%] {\n  transform: scale(1.14);\n  filter: saturate(1.05) brightness(0.72) contrast(1.05);\n}\n.game-cover-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 2;\n  background: var(--game-color, var(--accent));\n  box-shadow: 0 0 16px var(--game-color, var(--accent));\n}\n.game-cover-stripe[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  background-image:\n    repeating-linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.03) 0 2px,\n      transparent 2px 20px);\n}\n.game-cover-glyph[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -20px;\n  bottom: -40px;\n  z-index: 2;\n  font-family: var(--display);\n  font-size: 200px;\n  line-height: 0.8;\n  color: var(--game-color, rgba(255, 255, 255, 0.08));\n  opacity: 0.32;\n  letter-spacing: -8px;\n  pointer-events: none;\n  transition: opacity 0.3s, transform 0.4s;\n  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18);\n}\n.game-card[_ngcontent-%COMP%]:hover   .game-cover-glyph[_ngcontent-%COMP%] {\n  opacity: 0.28;\n  transform: scale(1.05) translateX(-8px);\n}\n.game-cover-tag[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  left: 16px;\n  z-index: 3;\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text);\n  padding: 4px 10px;\n  background: rgba(0, 0, 0, 0.55);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 100px;\n}\n.game-cover-active[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  bottom: 16px;\n  z-index: 3;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--good);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.game-cover-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--good);\n  box-shadow: 0 0 8px var(--good);\n  animation: _ngcontent-%COMP%_pulse 1.6s ease-in-out infinite;\n}\n.game-body[_ngcontent-%COMP%] {\n  padding: 24px 22px;\n  border-top: 1px solid var(--line);\n  flex: 1;\n  position: relative;\n  z-index: 1;\n}\n.game-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 26px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--text);\n  margin-bottom: 12px;\n  line-height: 1.05;\n}\n.game-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-dim);\n  line-height: 1.55;\n}\n.game-foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 22px;\n  border-top: 1px solid var(--line);\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-dim);\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  position: relative;\n  z-index: 1;\n}\n.game-foot-arrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  color: var(--game-color, var(--accent));\n}\n.game-foot-arrow[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: transform 0.2s;\n}\n.game-card[_ngcontent-%COMP%]:hover   .game-foot-arrow[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0;\n  border-top: 1px solid var(--line);\n  border-bottom: 1px solid var(--line);\n}\n@media (max-width: 900px) {\n  .steps[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.step[_ngcontent-%COMP%] {\n  padding: 48px 36px;\n  border-right: 1px solid var(--line);\n  position: relative;\n  overflow: hidden;\n}\n.step[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n@media (max-width: 900px) {\n  .step[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--line);\n  }\n  .step[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n}\n.step[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(0, 108, 53, 0.05),\n      transparent 60%);\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.step[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.step[_ngcontent-%COMP%]:hover   .step-num[_ngcontent-%COMP%] {\n  color: var(--accent);\n  -webkit-text-stroke: 0;\n  text-shadow: 0 0 60px rgba(212, 175, 55, 0.4);\n}\n.step-num[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 96px;\n  line-height: 0.85;\n  color: var(--bg3);\n  -webkit-text-stroke: 1px var(--line-2);\n  margin-bottom: 24px;\n  transition: color 0.3s, text-shadow 0.3s;\n}\n.step-connector[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 56px;\n  right: -18px;\n  z-index: 2;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--bg2);\n  border: 1px solid var(--line-2);\n  display: grid;\n  place-items: center;\n}\n@media (max-width: 900px) {\n  .step-connector[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.step-connector[_ngcontent-%COMP%]::after {\n  content: "\\2192";\n  font-family: var(--mono);\n  font-size: 14px;\n  color: var(--text-mute);\n  line-height: 1;\n}\n.step-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 24px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--text);\n  margin-bottom: 14px;\n  line-height: 1.05;\n}\n.step-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-dim);\n  line-height: 1.6;\n}\n.formats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0;\n  border: 1px solid var(--line);\n  border-radius: var(--r-lg);\n  overflow: hidden;\n}\n@media (max-width: 900px) {\n  .formats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 540px) {\n  .formats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.format[_ngcontent-%COMP%] {\n  padding: 36px 28px;\n  border-right: 1px solid var(--line);\n  background: var(--bg2);\n  position: relative;\n  overflow: hidden;\n  transition: background 0.2s;\n}\n.format[_ngcontent-%COMP%]:hover {\n  background: var(--bg3);\n}\n.format[_ngcontent-%COMP%]:hover   .format-bar[_ngcontent-%COMP%] {\n  transform: scaleX(1);\n}\n.format[_ngcontent-%COMP%]:hover   .format-num[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.format[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n@media (max-width: 900px) {\n  .format[_ngcontent-%COMP%]:nth-child(2n) {\n    border-right: none;\n  }\n  .format[_ngcontent-%COMP%]:nth-child(1), .format[_ngcontent-%COMP%]:nth-child(2) {\n    border-bottom: 1px solid var(--line);\n  }\n}\n.format-num[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 11px;\n  color: var(--text-mute);\n  letter-spacing: 2px;\n  display: block;\n  margin-bottom: 12px;\n  transition: color 0.2s;\n}\n.format-tag[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--accent);\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n  display: inline-block;\n}\n.format-name[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 22px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--text);\n  margin-bottom: 14px;\n  line-height: 1.08;\n}\n.format-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-dim);\n  line-height: 1.6;\n}\n.format-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent),\n      var(--primary));\n  transform: scaleX(0);\n  transform-origin: left;\n  transition: transform 0.3s ease;\n}\n.b2b[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 80px;\n  align-items: center;\n}\n@media (max-width: 900px) {\n  .b2b[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 50px;\n  }\n}\n.b2b-lede[_ngcontent-%COMP%] {\n  color: var(--text-dim);\n  font-size: 15px;\n  line-height: 1.65;\n  max-width: 56ch;\n}\n.b2b-feats[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  border-top: 1px solid var(--line);\n}\n.b2b-feat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 0;\n  border-bottom: 1px solid var(--line);\n  font-size: 15px;\n  color: var(--text);\n}\n.b2b-feat-check[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: rgba(0, 108, 53, 0.15);\n  border: 1px solid rgba(0, 108, 53, 0.3);\n  color: var(--good);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.b2b-visual[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border: 1px solid var(--line-2);\n  border-radius: var(--r-lg);\n  overflow: hidden;\n}\n.b2b-card[_ngcontent-%COMP%] {\n  padding: 28px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(0, 108, 53, 0.06) 0%,\n      transparent 50%);\n}\n.b2b-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.b2b-card__title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 20px;\n  text-transform: uppercase;\n  color: var(--text);\n}\n.b2b-card__live[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--mono);\n  font-size: 10px;\n  color: var(--good);\n  letter-spacing: 1.2px;\n  text-transform: uppercase;\n}\n.b2b-card__live[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--good);\n  box-shadow: 0 0 6px var(--good);\n  animation: _ngcontent-%COMP%_pulse 1.6s ease-in-out infinite;\n}\n.b2b-card__stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n.b2b-card__stat[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 12px 14px;\n  text-align: center;\n}\n.b2b-card__stat-n[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 20px;\n  color: var(--accent);\n  line-height: 1;\n}\n.b2b-card__stat-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  color: var(--text-mute);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-top: 4px;\n}\n.b2b-card__progress-label[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  color: var(--text-mute);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.b2b-card__bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.b2b-card__bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      var(--accent));\n  border-radius: 999px;\n  width: 0;\n  animation: _ngcontent-%COMP%_barFill 2s 1s ease forwards;\n}\n.b2b-card__players[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.b2b-card__avatar[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  border: 2px solid var(--bg2);\n  object-fit: cover;\n  margin-left: -8px;\n}\n.b2b-card__avatar[_ngcontent-%COMP%]:first-child {\n  margin-left: 0;\n}\n.b2b-card__more[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: var(--bg3);\n  border: 2px solid var(--bg2);\n  display: grid;\n  place-items: center;\n  font-family: var(--mono);\n  font-size: 9px;\n  color: var(--text-dim);\n  margin-left: -8px;\n  letter-spacing: 0;\n}\n.b2b-card__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 18px;\n  margin: 0 -28px -28px;\n  background: rgba(0, 0, 0, 0.2);\n  border-top: 1px solid var(--line);\n}\n.b2b-card__footer-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  flex: 1;\n  text-align: center;\n}\n.b2b-card__footer-n[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 20px;\n  color: var(--accent);\n  line-height: 1;\n}\n.b2b-card__footer-l[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 9px;\n  color: var(--text-mute);\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.b2b-card__divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 36px;\n  background: var(--line);\n}\n.cta[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 140px var(--gutter);\n  border-top: 1px solid var(--line);\n  text-align: center;\n  overflow: hidden;\n}\n.cta-grid-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  background-image:\n    linear-gradient(var(--line) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      var(--line) 1px,\n      transparent 1px);\n  background-size: 60px 60px;\n  mask-image:\n    radial-gradient(\n      ellipse 60% 80% at 50% 50%,\n      #000 20%,\n      transparent 70%);\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 60% 80% at 50% 50%,\n      #000 20%,\n      transparent 70%);\n  opacity: 0.4;\n}\n.cta-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 1000px;\n  height: 700px;\n  background:\n    radial-gradient(\n      ellipse,\n      rgba(0, 108, 53, 0.35) 0%,\n      rgba(0, 108, 53, 0.1) 40%,\n      transparent 70%);\n  filter: blur(70px);\n  z-index: 0;\n  animation: _ngcontent-%COMP%_shimmer 4s ease-in-out infinite;\n}\n.cta-particles[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.cta-p[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: var(--accent);\n  opacity: 0;\n  left: calc(var(--i) * 8% + 2%);\n  bottom: 20%;\n  animation: _ngcontent-%COMP%_floatP calc(3s + var(--i) * 0.4s) calc(var(--i) * 0.5s) ease-in-out infinite;\n}\n.cta-p[_ngcontent-%COMP%]:nth-child(3n) {\n  background: var(--primary);\n  width: 3px;\n  height: 3px;\n}\n.cta-p[_ngcontent-%COMP%]:nth-child(3n+1) {\n  background: var(--accent-soft, #e8c965);\n  width: 5px;\n  height: 5px;\n}\n.cta-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.cta-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: clamp(44px, 7vw, 96px);\n  line-height: 0.92;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-bottom: 24px;\n}\n.cta-title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  color: var(--accent);\n}\n.cta-sub[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: var(--text-dim);\n  max-width: 56ch;\n  margin: 0 auto 36px;\n  line-height: 1.65;\n}\n.cta-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n@media (prefers-reduced-motion: reduce) {\n  .hero-grid-bg[_ngcontent-%COMP%], .hero-glow[_ngcontent-%COMP%], .hero[_ngcontent-%COMP%]::before, .hero-beams[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .hero-p[_ngcontent-%COMP%], .feature-card__shimmer[_ngcontent-%COMP%], .hero-photo[_ngcontent-%COMP%], .game-cover-img[_ngcontent-%COMP%], .ticker-track[_ngcontent-%COMP%], .cta-p[_ngcontent-%COMP%] {\n    animation: none !important;\n  }\n  .hero-p[_ngcontent-%COMP%] {\n    opacity: 0.4 !important;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    transition: opacity 0.3s ease !important;\n    transform: none !important;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\pages\\home\\home.component.ts", lineNumber: 22 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-G6BGMO4O.js.map
