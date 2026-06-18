import {
  CHALLENGE_GAMES,
  ChallengeService
} from "./chunk-ILO7ZWQZ.js";
import {
  TeamService
} from "./chunk-5HMXBCYT.js";
import {
  ChallengeUiService
} from "./chunk-WWXU4OML.js";
import {
  FriendService
} from "./chunk-H4EFRF6P.js";
import {
  DmService
} from "./chunk-5L7FNWZJ.js";
import "./chunk-QBAOKTDJ.js";
import "./chunk-GFWMVHEB.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  InputFlags,
  catchError,
  computed,
  inject,
  input,
  interval,
  of,
  provideHttpClient,
  provideZoneChangeDetection,
  signal,
  throwError,
  withFetch,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn())
    return true;
  return router.createUrlTree(["/auth"]);
};
var guestGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn())
    return true;
  return router.createUrlTree(["/dashboard"]);
};
var adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn())
    return router.createUrlTree(["/auth"]);
  if (auth.currentUser()?.role === "admin")
    return true;
  return router.createUrlTree(["/dashboard"]);
};

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-G6BGMO4O.js").then((m) => m.HomeComponent),
    title: "Dawri \u2014 Esports Platform"
  },
  {
    path: "auth",
    loadComponent: () => import("./chunk-7WYMSNXK.js").then((m) => m.AuthComponent),
    canActivate: [guestGuard],
    title: "Sign In \u2014 Dawri"
  },
  {
    // Password reset landing — no guard so the link from email always works.
    // The AuthComponent reads ?token=&email= from query params and shows the reset form.
    path: "reset-password",
    loadComponent: () => import("./chunk-7WYMSNXK.js").then((m) => m.AuthComponent),
    title: "Reset Password \u2014 Dawri"
  },
  {
    path: "dashboard",
    loadComponent: () => import("./chunk-5WRJEC6Y.js").then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    title: "Dashboard \u2014 Dawri"
  },
  {
    path: "tournaments",
    loadComponent: () => import("./chunk-PIAGI42R.js").then((m) => m.TournamentsComponent),
    title: "Tournaments \u2014 Dawri"
  },
  // Specific route MUST come before :id
  {
    path: "tournaments/create",
    loadComponent: () => import("./chunk-QURWXKJP.js").then((m) => m.CreateTournamentComponent),
    canActivate: [authGuard],
    title: "Create Tournament \u2014 Dawri"
  },
  {
    path: "tournaments/:id",
    loadComponent: () => import("./chunk-BFC4HA46.js").then((m) => m.TournamentDetailComponent),
    title: "Tournament \u2014 Dawri"
  },
  {
    path: "marketplace",
    loadComponent: () => import("./chunk-3MDHHN4Y.js").then((m) => m.MarketplaceComponent),
    title: "Marketplace \u2014 Dawri"
  },
  {
    path: "pricing",
    loadComponent: () => import("./chunk-NKEG7CGR.js").then((m) => m.PricingComponent),
    title: "Pricing \u2014 Dawri"
  },
  {
    path: "leaderboard",
    loadComponent: () => import("./chunk-G4JJX7DN.js").then((m) => m.LeaderboardComponent),
    title: "Leaderboard \u2014 Dawri"
  },
  // Sprint 4: Company tournament calendar
  {
    path: "calendar",
    loadComponent: () => import("./chunk-563ERJVG.js").then((m) => m.CalendarComponent),
    canActivate: [authGuard],
    title: "Tournament Calendar \u2014 Dawri"
  },
  {
    path: "players/:id",
    loadComponent: () => import("./chunk-GIV2YAVZ.js").then((m) => m.ProfileComponent),
    title: "Player Profile \u2014 Dawri"
  },
  // Sprint 4: Current user's own editable profile
  {
    path: "profile",
    loadComponent: () => import("./chunk-FUWS6CE2.js").then((m) => m.MyProfileOverviewComponent),
    canActivate: [authGuard],
    title: "My Profile \u2014 Dawri"
  },
  {
    path: "profile/account",
    loadComponent: () => import("./chunk-MJYHLPVQ.js").then((m) => m.MyProfileComponent),
    canActivate: [authGuard],
    title: "Account Settings \u2014 Dawri"
  },
  {
    path: "subscription",
    loadComponent: () => import("./chunk-DFTNJWNJ.js").then((m) => m.SubscriptionComponent),
    canActivate: [authGuard],
    title: "Subscription \u2014 Dawri"
  },
  // Social — friends
  {
    path: "friends",
    loadComponent: () => import("./chunk-A3WDYVUF.js").then((m) => m.FriendsPageComponent),
    canActivate: [authGuard],
    title: "Friends \u2014 Dawri"
  },
  // Social — direct messages
  {
    path: "messages",
    loadComponent: () => import("./chunk-ZORXYBZK.js").then((m) => m.MessagesPageComponent),
    canActivate: [authGuard],
    title: "Messages \u2014 Dawri"
  },
  // Social — challenges
  {
    path: "challenges",
    loadComponent: () => import("./chunk-XCWP23KD.js").then((m) => m.ChallengesPageComponent),
    canActivate: [authGuard],
    title: "Challenges \u2014 Dawri"
  },
  // Discover players
  {
    path: "players",
    loadComponent: () => import("./chunk-PIPOHKEK.js").then((m) => m.PlayerDiscoveryPageComponent),
    canActivate: [authGuard],
    title: "Discover Players \u2014 Dawri"
  },
  // Teams
  {
    path: "teams",
    loadComponent: () => import("./chunk-XLOXW73S.js").then((m) => m.TeamsPageComponent),
    canActivate: [authGuard],
    title: "Teams \u2014 Dawri"
  },
  {
    path: "teams/create",
    loadComponent: () => import("./chunk-JS7SQOX2.js").then((m) => m.TeamCreatePageComponent),
    canActivate: [authGuard],
    title: "Create Team \u2014 Dawri"
  },
  {
    path: "teams/:slug",
    loadComponent: () => import("./chunk-MQXFZY24.js").then((m) => m.TeamProfilePageComponent),
    canActivate: [authGuard],
    title: "Team \u2014 Dawri"
  },
  // Organizer verification — self
  {
    path: "organizer/verify",
    loadComponent: () => import("./chunk-HIXVLD44.js").then((m) => m.OrganizerVerifyPageComponent),
    canActivate: [authGuard],
    title: "Organizer Verification \u2014 Dawri"
  },
  // Organizer verification — admin approvals
  {
    path: "admin/organizer-verifications",
    loadComponent: () => import("./chunk-MCW3ETFH.js").then((m) => m.AdminOrganizerVerificationsComponent),
    canActivate: [adminGuard],
    title: "Organizer Verifications \u2014 Admin \u2014 Dawri"
  },
  // Sprint 3: Company branding settings
  {
    path: "settings/company-branding",
    loadComponent: () => import("./chunk-TO7RLXEJ.js").then((m) => m.CompanyBrandingComponent),
    canActivate: [authGuard],
    title: "Company Branding \u2014 Dawri"
  },
  // Sprint 14: public sponsors showcase
  {
    path: "sponsors",
    loadComponent: () => import("./chunk-SWIFGEQY.js").then((m) => m.SponsorsComponent),
    title: "Our Partners \u2014 Dawri"
  },
  // ── Admin shell — all /admin/* pages render INSIDE the sidebar layout ──
  {
    path: "admin",
    canActivate: [adminGuard],
    loadComponent: () => import("./chunk-LYJY6XJL.js").then((m) => m.AdminComponent),
    title: "Admin Panel \u2014 Dawri",
    children: [
      {
        path: "marketplace",
        loadComponent: () => import("./chunk-MUM2GS7U.js").then((m) => m.AdminMarketplaceComponent),
        title: "Marketplace \u2014 Admin \u2014 Dawri"
      },
      {
        path: "finance",
        loadComponent: () => import("./chunk-37UNATER.js").then((m) => m.FinanceComponent),
        title: "Finance \u2014 Admin \u2014 Dawri"
      },
      {
        path: "sponsors",
        loadComponent: () => import("./chunk-J5OUUZ4K.js").then((m) => m.AdminSponsorsComponent),
        title: "Sponsors \u2014 Admin \u2014 Dawri"
      },
      {
        path: "platform-sponsors",
        loadComponent: () => import("./chunk-LB2LMPIB.js").then((m) => m.AdminPlatformSponsorsComponent),
        title: "Platform Sponsors \u2014 Admin \u2014 Dawri"
      },
      {
        path: "ads",
        loadComponent: () => import("./chunk-JDNUVDSM.js").then((m) => m.AdminAdsComponent),
        title: "Ad Placements \u2014 Admin \u2014 Dawri"
      },
      {
        path: "streams",
        loadComponent: () => import("./chunk-2CYSPF3U.js").then((m) => m.AdminStreamsComponent),
        title: "Live Streams \u2014 Admin \u2014 Dawri"
      }
    ]
  },
  // Notifications page
  {
    path: "notifications",
    loadComponent: () => import("./chunk-4SWSRT65.js").then((m) => m.NotificationsComponent)
  },
  // Sprint 7: public About Us page
  {
    path: "about",
    loadComponent: () => import("./chunk-7XKYY76U.js").then((m) => m.AboutComponent),
    title: "About \u2014 Dawri"
  },
  // Sprint 7: public Contact Us page
  {
    path: "contact",
    loadComponent: () => import("./chunk-IKA2NNZB.js").then((m) => m.ContactComponent),
    title: "Contact \u2014 Dawri"
  },
  // Sprint 7: public Privacy Policy page
  {
    path: "privacy",
    loadComponent: () => import("./chunk-X73J44OW.js").then((m) => m.PrivacyComponent),
    title: "Privacy Policy \u2014 Dawri"
  },
  // Sprint 15: Dawri Community (chat). The 'admin' sub-route is declared
  // inside COMMUNITY_ROUTES as a sibling of the shell, so loadChildren
  // covers /community, /community/:slug, /community/:slug/channel/:id,
  // and /community/admin.
  {
    path: "community",
    canActivate: [authGuard],
    loadChildren: () => import("./chunk-3LOQ5RE6.js").then((m) => m.COMMUNITY_ROUTES),
    title: "Community \u2014 Dawri"
  },
  {
    path: "**",
    redirectTo: ""
  }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();
  const isAuthEndpoint = req.url.includes("/auth/login") || req.url.includes("/auth/register") || req.url.includes("/auth/otp");
  const authReq = token && !isAuthEndpoint ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(authReq).pipe(catchError((err) => {
    if (err.status === 401 && !req.url.includes("/auth/logout")) {
      auth.clearLocal();
      router.navigate(["/auth"]);
    }
    return throwError(() => err);
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ]
};

// src/app/features/social/challenge-create.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function ChallengeCreateComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 6);
  }
  if (rf & 2) {
    const u_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", u_r3.avatar_url, \u0275\u0275sanitizeUrl)("alt", u_r3.display_name);
  }
}
function ChallengeCreateComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((u_r3.display_name || "?").charAt(0));
  }
}
function ChallengeCreateComponent_Conditional_0_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function ChallengeCreateComponent_Conditional_0_For_21_Template_button_click_0_listener() {
      const g_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.game.set(g_r5.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.game() === g_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(g_r5.label);
  }
}
function ChallengeCreateComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function ChallengeCreateComponent_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function ChallengeCreateComponent_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 3)(3, "div", 4)(4, "span", 5);
    \u0275\u0275template(5, ChallengeCreateComponent_Conditional_0_Conditional_5_Template, 1, 2, "img", 6)(6, ChallengeCreateComponent_Conditional_0_Conditional_6_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "div", 7);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 8);
    \u0275\u0275text(11, "Friendly 1v1 \u2014 pick a game");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 9);
    \u0275\u0275listener("click", function ChallengeCreateComponent_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 10);
    \u0275\u0275element(14, "line", 11)(15, "line", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "div", 13)(17, "span", 14);
    \u0275\u0275text(18, "Game");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 15);
    \u0275\u0275repeaterCreate(20, ChallengeCreateComponent_Conditional_0_For_21_Template, 2, 3, "button", 16, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 14);
    \u0275\u0275text(23, "Message (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ChallengeCreateComponent_Conditional_0_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.message, $event) || (ctx_r1.message = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "footer", 18)(26, "button", 19);
    \u0275\u0275listener("click", function ChallengeCreateComponent_Conditional_0_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(27, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 20);
    \u0275\u0275listener("click", function ChallengeCreateComponent_Conditional_0_Template_button_click_28_listener() {
      const u_r3 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit(u_r3));
    });
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const u_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, u_r3.avatar_url ? 5 : 6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Challenge ", u_r3.display_name, "");
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.games);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.message);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.sending());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.sending() ? "Sending\u2026" : "Send challenge", " ");
  }
}
var ChallengeCreateComponent = class _ChallengeCreateComponent {
  constructor() {
    this.ui = inject(ChallengeUiService);
    this.challenges = inject(ChallengeService);
    this.toast = inject(ToastService);
    this.games = CHALLENGE_GAMES;
    this.game = signal(CHALLENGE_GAMES[0].value);
    this.sending = signal(false);
    this.message = "";
  }
  close() {
    this.ui.close();
    this.message = "";
    this.game.set(CHALLENGE_GAMES[0].value);
  }
  submit(u) {
    if (this.sending())
      return;
    this.sending.set(true);
    this.challenges.create(u.id, this.game(), this.message.trim()).subscribe({
      next: () => {
        this.sending.set(false);
        this.toast.success(`Challenge sent to ${u.display_name}.`);
        this.close();
      },
      error: (e) => {
        this.sending.set(false);
        this.toast.error(e?.error?.message ?? "Could not send challenge.");
      }
    });
  }
  static {
    this.\u0275fac = function ChallengeCreateComponent_Factory(t) {
      return new (t || _ChallengeCreateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChallengeCreateComponent, selectors: [["app-challenge-create"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [[1, "cc-overlay"], [1, "cc-overlay", 3, "click"], [1, "cc-modal", 3, "click"], [1, "cc-head"], [1, "cc-who"], [1, "cc-ava"], [3, "src", "alt"], [1, "cc-title"], [1, "cc-sub"], ["aria-label", "Close", 1, "cc-x", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "cc-body"], [1, "cc-label"], [1, "cc-games"], ["type", "button", 1, "cc-game", 3, "active"], ["rows", "2", "maxlength", "500", "placeholder", "Trash talk, time, or rules\u2026", 1, "cc-input", 3, "ngModelChange", "ngModel"], [1, "cc-foot"], [1, "cc-btn", "cc-btn--ghost", 3, "click"], [1, "cc-btn", "cc-btn--primary", 3, "click", "disabled"], [1, "cc-ava-letter"], ["type", "button", 1, "cc-game", 3, "click"]], template: function ChallengeCreateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ChallengeCreateComponent_Conditional_0_Template, 30, 5, "div", 0);
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275conditional(0, (tmp_0_0 = ctx.ui.createFor()) ? 0 : -1, tmp_0_0);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ["\n\n.cc-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, .7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: grid;\n  place-items: center;\n  padding: 20px;\n}\n.cc-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 16px;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_ccIn .22s cubic-bezier(.22, 1, .36, 1) both;\n}\n@keyframes _ngcontent-%COMP%_ccIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px) scale(.97);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n.cc-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 18px 20px;\n  border-bottom: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.cc-who[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.cc-ava[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.cc-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.cc-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  color: #fff;\n}\n.cc-title[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-size: 16px;\n  color: var(--text, #ececf1);\n}\n.cc-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 2px;\n}\n.cc-x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mu, #8a8aa0);\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  &:hover {\n    color: var(--text);\n    background: rgba(255, 255, 255, .06);\n  }\n}\n.cc-body[_ngcontent-%COMP%] {\n  padding: 18px 20px;\n  display: flex;\n  flex-direction: column;\n}\n.cc-label[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--mu, #8a8aa0);\n  margin-bottom: 8px;\n}\n.cc-games[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.cc-game[_ngcontent-%COMP%] {\n  padding: 9px 14px;\n  border-radius: 9px;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 600;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  color: var(--text, #ececf1);\n  transition:\n    border-color .15s,\n    background .15s,\n    color .15s;\n}\n.cc-game[_ngcontent-%COMP%]:hover {\n  border-color: var(--br2, rgba(255,255,255,.14));\n}\n.cc-game.active[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .16);\n  border-color: var(--primary, #006c35);\n  color: #4ade80;\n}\n.cc-input[_ngcontent-%COMP%] {\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 10px;\n  padding: 10px 12px;\n  color: var(--text);\n  font-family: var(--fb, sans-serif);\n  font-size: 14px;\n  outline: none;\n  resize: vertical;\n  &:focus {\n    border-color: var(--primary, #006c35);\n  }\n}\n.cc-foot[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 14px 20px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.cc-btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  border-radius: 9px;\n  font-weight: 700;\n  font-size: 14px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n.cc-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  color: #fff;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n}\n.cc-btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border-color: var(--br2, rgba(255,255,255,.14));\n  color: var(--text);\n  &:hover {\n    background: rgba(255, 255, 255, .05);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .cc-modal[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=challenge-create.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChallengeCreateComponent, { className: "ChallengeCreateComponent", filePath: "src\\app\\features\\social\\challenge-create.component.ts", lineNumber: 88 });
})();

// src/app/components/notification-bell/notification-bell.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function NotificationBellComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.unreadCount() > 99 ? "99+" : ctx_r0.unreadCount());
  }
}
function NotificationBellComponent_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function NotificationBellComponent_Conditional_6_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.markAllRead());
    });
    \u0275\u0275text(1, "Mark all read");
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_Conditional_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "div", 13);
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_Conditional_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 14);
    \u0275\u0275text(2, "\u{1F514}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "You're all caught up!");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_Conditional_6_Conditional_7_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275listener("click", function NotificationBellComponent_Conditional_6_Conditional_7_For_2_Conditional_11_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const n_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      ctx_r0.markRead(n_r6);
      return \u0275\u0275resetView(ctx_r0.open.set(false));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", n_r6.data.action_url);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", n_r6.data.action_label || "View", " \u2192 ");
  }
}
function NotificationBellComponent_Conditional_6_Conditional_7_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function NotificationBellComponent_Conditional_6_Conditional_7_For_2_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const n_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.markRead(n_r6));
    });
    \u0275\u0275text(1, "\u25CF");
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_Conditional_6_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20)(4, "div", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275template(11, NotificationBellComponent_Conditional_6_Conditional_7_For_2_Conditional_11_Template, 2, 2, "a", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 25);
    \u0275\u0275template(13, NotificationBellComponent_Conditional_6_Conditional_7_For_2_Conditional_13_Template, 2, 0, "button", 26);
    \u0275\u0275elementStart(14, "button", 27);
    \u0275\u0275listener("click", function NotificationBellComponent_Conditional_6_Conditional_7_For_2_Template_button_click_14_listener() {
      const n_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteNotif(n_r6));
    });
    \u0275\u0275text(15, "\u2715");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const n_r6 = ctx.$implicit;
    \u0275\u0275classProp("notif-item--unread", !n_r6.read_at)("notif-item--urgent", n_r6.data.urgent);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r6.data.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(n_r6.data.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r6.data.body);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 10, n_r6.created_at, "d MMM \xB7 HH:mm"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, n_r6.data.action_url ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(13, !n_r6.read_at ? 13 : -1);
  }
}
function NotificationBellComponent_Conditional_6_Conditional_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "button", 30);
    \u0275\u0275listener("click", function NotificationBellComponent_Conditional_6_Conditional_7_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.loadMore());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.loadingMore());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.loadingMore() ? "Loading\u2026" : "Load more", " ");
  }
}
function NotificationBellComponent_Conditional_6_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, NotificationBellComponent_Conditional_6_Conditional_7_For_2_Template, 16, 13, "div", 16, _forTrack02);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, NotificationBellComponent_Conditional_6_Conditional_7_Conditional_3_Template, 3, 2, "div", 17);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.notifications());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, ctx_r0.hasMore() ? 3 : -1);
  }
}
function NotificationBellComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275listener("click", function NotificationBellComponent_Conditional_6_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "div", 8)(2, "span", 9);
    \u0275\u0275text(3, "Notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NotificationBellComponent_Conditional_6_Conditional_4_Template, 2, 0, "button", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, NotificationBellComponent_Conditional_6_Conditional_5_Template, 2, 0, "div", 11)(6, NotificationBellComponent_Conditional_6_Conditional_6_Template, 5, 0)(7, NotificationBellComponent_Conditional_6_Conditional_7_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ctx_r0.unreadCount() > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ctx_r0.loading() ? 5 : ctx_r0.notifications().length === 0 ? 6 : 7);
  }
}
var NotificationBellComponent = class _NotificationBellComponent {
  constructor() {
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.open = signal(false);
    this.loading = signal(false);
    this.loadingMore = signal(false);
    this.unreadCount = signal(0);
    this.notifications = signal([]);
    this.hasMore = signal(false);
    this.page = 1;
  }
  ngOnInit() {
    if (!this.auth.isLoggedIn())
      return;
    this.fetchUnreadCount();
    this.pollSub = interval(3e4).subscribe(() => this.fetchUnreadCount());
  }
  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }
  onDocClick(e) {
    const target = e.target;
    if (!target.closest("app-notification-bell"))
      this.open.set(false);
  }
  toggleOpen() {
    const next = !this.open();
    this.open.set(next);
    if (next && this.notifications().length === 0)
      this.load();
  }
  load() {
    this.loading.set(true);
    this.page = 1;
    this.api.getNotifications(1).pipe(catchError(() => of(null))).subscribe((r) => {
      if (r) {
        this.notifications.set(r.data ?? []);
        this.unreadCount.set(r.meta?.unread_count ?? 0);
        this.hasMore.set(r.meta?.current_page < r.meta?.last_page);
      }
      this.loading.set(false);
    });
  }
  loadMore() {
    this.loadingMore.set(true);
    this.api.getNotifications(++this.page).pipe(catchError(() => of(null))).subscribe((r) => {
      if (r) {
        this.notifications.update((n) => [...n, ...r.data ?? []]);
        this.hasMore.set(r.meta?.current_page < r.meta?.last_page);
      }
      this.loadingMore.set(false);
    });
  }
  markRead(n) {
    if (n.read_at)
      return;
    n.read_at = (/* @__PURE__ */ new Date()).toISOString();
    this.notifications.update((ns) => [...ns]);
    this.unreadCount.update((c) => Math.max(0, c - 1));
    this.api.markNotificationRead(n.id).pipe(catchError(() => of(null))).subscribe();
  }
  markAllRead() {
    this.notifications.update((ns) => ns.map((n) => __spreadProps(__spreadValues({}, n), { read_at: n.read_at ?? (/* @__PURE__ */ new Date()).toISOString() })));
    this.unreadCount.set(0);
    this.api.markAllNotificationsRead().pipe(catchError(() => of(null))).subscribe();
  }
  deleteNotif(n) {
    this.notifications.update((ns) => ns.filter((x) => x.id !== n.id));
    if (!n.read_at)
      this.unreadCount.update((c) => Math.max(0, c - 1));
    this.api.deleteNotification(n.id).pipe(catchError(() => of(null))).subscribe();
  }
  fetchUnreadCount() {
    this.api.getUnreadCount().pipe(catchError(() => of({ count: 0 }))).subscribe((r) => {
      this.unreadCount.set(r.count ?? 0);
    });
  }
  static {
    this.\u0275fac = function NotificationBellComponent_Factory(t) {
      return new (t || _NotificationBellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationBellComponent, selectors: [["app-notification-bell"]], hostBindings: function NotificationBellComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function NotificationBellComponent_click_HostBindingHandler($event) {
          return ctx.onDocClick($event);
        }, false, \u0275\u0275resolveDocument);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 5, consts: [[1, "notif-bell"], [1, "bell-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", 1, "bell-icon"], ["d", "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"], ["d", "M13.73 21a2 2 0 0 1-3.46 0"], [1, "bell-badge"], [1, "notif-dropdown"], [1, "notif-dropdown", 3, "click"], [1, "notif-header"], [1, "notif-header__title"], [1, "notif-header__markall"], [1, "notif-empty"], [1, "notif-header__markall", 3, "click"], [1, "notif-spinner"], [1, "notif-empty__icon"], [1, "notif-list"], [1, "notif-item", 3, "notif-item--unread", "notif-item--urgent"], [1, "notif-load-more"], [1, "notif-item"], [1, "notif-item__icon"], [1, "notif-item__body"], [1, "notif-item__title"], [1, "notif-item__text"], [1, "notif-item__meta"], [1, "notif-item__action", 3, "routerLink"], [1, "notif-item__actions"], ["title", "Mark as read", 1, "notif-item__read-btn"], ["title", "Delete", 1, "notif-item__del-btn", 3, "click"], [1, "notif-item__action", 3, "click", "routerLink"], ["title", "Mark as read", 1, "notif-item__read-btn", 3, "click"], [3, "click", "disabled"]], template: function NotificationBellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
        \u0275\u0275listener("click", function NotificationBellComponent_Template_button_click_1_listener() {
          return ctx.toggleOpen();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3)(4, "path", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, NotificationBellComponent_Conditional_5_Template, 2, 1, "span", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, NotificationBellComponent_Conditional_6_Template, 8, 2, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("notif-bell--open", ctx.open());
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", "Notifications" + (ctx.unreadCount() > 0 ? " (" + ctx.unreadCount() + " unread)" : ""));
        \u0275\u0275advance(4);
        \u0275\u0275conditional(5, ctx.unreadCount() > 0 ? 5 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.open() ? 6 : -1);
      }
    }, dependencies: [CommonModule, DatePipe, RouterLink], styles: ["\n\n.notif-bell[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n}\n.bell-btn[_ngcontent-%COMP%] {\n  position: relative;\n  background: none;\n  border: none;\n  color: var(--text-dim, #9ca3af);\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 8px;\n  transition: color .15s, background .15s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.bell-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.bell-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  min-width: 16px;\n  height: 16px;\n  padding: 0 4px;\n  background: #ef4444;\n  color: #fff;\n  font-size: 9px;\n  font-weight: 900;\n  font-family: monospace;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--bg, #0b1022);\n  animation: _ngcontent-%COMP%_bell-pop .3s ease;\n}\n@keyframes _ngcontent-%COMP%_bell-pop {\n  0% {\n    transform: scale(0);\n  }\n  70% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.notif-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 360px;\n  max-height: 480px;\n  background: #111827;\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 14px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, .6);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  z-index: 9999;\n  animation: _ngcontent-%COMP%_drop-in .2s ease;\n}\n@keyframes _ngcontent-%COMP%_drop-in {\n  from {\n    opacity: 0;\n    transform: translateY(-8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n.notif-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px 12px;\n  border-bottom: 1px solid rgba(255, 255, 255, .07);\n  flex-shrink: 0;\n}\n.notif-header__title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: #fff;\n}\n.notif-header__markall[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--accent, #f0a500);\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-family: monospace;\n  letter-spacing: .5px;\n}\n.notif-header__markall[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.notif-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  gap: 10px;\n  color: #4b5563;\n}\n.notif-empty__icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  opacity: .4;\n}\n.notif-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin: 0;\n}\n.notif-spinner[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 2px solid rgba(255, 255, 255, .1);\n  border-top-color: var(--accent, #f0a500);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.notif-list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  flex: 1;\n}\n.notif-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 36px 1fr auto;\n  gap: 10px;\n  padding: 12px 14px;\n  border-bottom: 1px solid rgba(255, 255, 255, .05);\n  transition: background .15s;\n}\n.notif-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, .03);\n}\n.notif-item--unread[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, .04);\n  border-left: 3px solid var(--accent, #f0a500);\n}\n.notif-item--urgent[_ngcontent-%COMP%] {\n  border-left: 3px solid #ef4444 !important;\n}\n.notif-item--unread[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, .04);\n  border-left: 3px solid var(--accent, #f0a500);\n}\n.notif-item--urgent[_ngcontent-%COMP%] {\n  border-left: 3px solid #ef4444 !important;\n}\n.notif-item__icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .07);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  flex-shrink: 0;\n}\n.notif-item__body[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.notif-item__title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #fff;\n  line-height: 1.3;\n  margin-bottom: 3px;\n}\n.notif-item__text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.notif-item__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 5px;\n  font-size: 10px;\n  color: #4b5563;\n  font-family: monospace;\n}\n.notif-item__action[_ngcontent-%COMP%] {\n  color: var(--accent, #f0a500);\n  text-decoration: none;\n  font-weight: 700;\n}\n.notif-item__action[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.notif-item__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.notif-item__read-btn[_ngcontent-%COMP%], .notif-item__del-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 12px;\n  color: #4b5563;\n  padding: 2px 4px;\n  border-radius: 4px;\n  transition: all .15s;\n}\n.notif-item__read-btn[_ngcontent-%COMP%] {\n  color: var(--accent, #f0a500);\n}\n.notif-item__read-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(240, 165, 0, .1);\n}\n.notif-item__del-btn[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  background: rgba(239, 68, 68, .1);\n}\n.notif-load-more[_ngcontent-%COMP%] {\n  padding: 10px;\n  text-align: center;\n  border-top: 1px solid rgba(255, 255, 255, .07);\n}\n.notif-load-more[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-family: monospace;\n}\n.notif-load-more[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--accent, #f0a500);\n}\n.notif-load-more[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n@media (max-width: 420px) {\n  .notif-dropdown[_ngcontent-%COMP%] {\n    width: calc(100vw - 16px);\n    right: -8px;\n  }\n}\n/*# sourceMappingURL=notification-bell.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationBellComponent, { className: "NotificationBellComponent", filePath: "src\\app\\components\\notification-bell\\notification-bell.component.ts", lineNumber: 244 });
})();

// src/app/shared/components/nav/nav.component.ts
function NavComponent_Conditional_19_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.connectAlerts());
  }
}
function NavComponent_Conditional_19_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.teams.alertCount());
  }
}
function NavComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 15);
    \u0275\u0275element(2, "path", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Connect+ ");
    \u0275\u0275template(4, NavComponent_Conditional_19_Conditional_4_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "a", 18);
    \u0275\u0275text(6, "Players");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 19);
    \u0275\u0275text(8, " Teams ");
    \u0275\u0275template(9, NavComponent_Conditional_19_Conditional_9_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ctx_r0.connectAlerts() > 0 ? 4 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(9, ctx_r0.teams.alertCount() > 0 ? 9 : -1);
  }
}
function NavComponent_Conditional_21_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 22);
    \u0275\u0275text(1, "Admin");
    \u0275\u0275elementEnd();
  }
}
function NavComponent_Conditional_21_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 23);
    \u0275\u0275text(1, "Plan");
    \u0275\u0275elementEnd();
  }
}
function NavComponent_Conditional_21_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 25);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl)("alt", (tmp_4_0 = (tmp_4_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_4_0.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "Profile");
  }
}
function NavComponent_Conditional_21_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.avatarLetter());
  }
}
function NavComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 20);
    \u0275\u0275text(1, "Dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 21);
    \u0275\u0275text(3, "Calendar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NavComponent_Conditional_21_Conditional_4_Template, 2, 0, "a", 22)(5, NavComponent_Conditional_21_Conditional_5_Template, 2, 0, "a", 23);
    \u0275\u0275element(6, "app-notification-bell");
    \u0275\u0275elementStart(7, "a", 24);
    \u0275\u0275template(8, NavComponent_Conditional_21_Conditional_8_Template, 1, 2, "img", 25)(9, NavComponent_Conditional_21_Conditional_9_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 26);
    \u0275\u0275listener("click", function NavComponent_Conditional_21_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.logout());
    });
    \u0275\u0275text(11, "Sign out");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ((tmp_1_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_1_0.role) === "admin" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ((tmp_2_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_2_0.role) === "organizer" ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", "My Profile \xB7 " + ((tmp_3_0 = (tmp_3_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_3_0.name) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : ""));
    \u0275\u0275advance();
    \u0275\u0275conditional(8, (tmp_4_0 = (tmp_4_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_4_0.avatar_url) ? 8 : 9, tmp_4_0);
  }
}
function NavComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 29);
    \u0275\u0275text(3, "Join Free \u2192");
    \u0275\u0275elementEnd();
  }
}
function NavComponent_Conditional_25_Conditional_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.connectAlerts());
  }
}
function NavComponent_Conditional_25_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 25);
  }
  if (rf & 2) {
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeUrl);
  }
}
function NavComponent_Conditional_25_Conditional_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.avatarLetter(), " ");
  }
}
function NavComponent_Conditional_25_Conditional_11_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 41);
    \u0275\u0275text(1, "Admin Panel");
    \u0275\u0275elementEnd();
  }
}
function NavComponent_Conditional_25_Conditional_11_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 42);
    \u0275\u0275text(1, "Manage Plan");
    \u0275\u0275elementEnd();
  }
}
function NavComponent_Conditional_25_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 36);
    \u0275\u0275text(1, "Dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 37);
    \u0275\u0275text(3, "Calendar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 38);
    \u0275\u0275text(5, " Dawri Connect+ ");
    \u0275\u0275template(6, NavComponent_Conditional_25_Conditional_11_Conditional_6_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 39)(8, "span", 40);
    \u0275\u0275template(9, NavComponent_Conditional_25_Conditional_11_Conditional_9_Template, 1, 1, "img", 25)(10, NavComponent_Conditional_25_Conditional_11_Conditional_10_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " My Profile ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, NavComponent_Conditional_25_Conditional_11_Conditional_12_Template, 2, 0, "a", 41)(13, NavComponent_Conditional_25_Conditional_11_Conditional_13_Template, 2, 0, "a", 42);
    \u0275\u0275elementStart(14, "button", 43);
    \u0275\u0275listener("click", function NavComponent_Conditional_25_Conditional_11_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.logout());
    });
    \u0275\u0275text(15, "Sign out");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, ctx_r0.connectAlerts() > 0 ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(9, (tmp_3_0 = (tmp_3_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_3_0.avatar_url) ? 9 : 10, tmp_3_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(12, ((tmp_4_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_4_0.role) === "admin" ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, ((tmp_5_0 = ctx_r0.auth.currentUser()) == null ? null : tmp_5_0.role) === "organizer" ? 13 : -1);
  }
}
function NavComponent_Conditional_25_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 44);
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
function NavComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275listener("click", function NavComponent_Conditional_25_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeMenu());
    });
    \u0275\u0275elementStart(1, "a", 31);
    \u0275\u0275text(2, "Tournaments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 32);
    \u0275\u0275text(4, "Marketplace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 33);
    \u0275\u0275text(6, "Leaderboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 34);
    \u0275\u0275text(8, "Partners");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "a", 35);
    \u0275\u0275text(10, "Pricing");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, NavComponent_Conditional_25_Conditional_11_Template, 16, 4)(12, NavComponent_Conditional_25_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275conditional(11, ctx_r0.auth.isLoggedIn() ? 11 : 12);
  }
}
function NavComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-challenge-create");
  }
}
var NavComponent = class _NavComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.friends = inject(FriendService);
    this.dm = inject(DmService);
    this.cs = inject(ChallengeService);
    this.teams = inject(TeamService);
    this.router = inject(Router);
    this.menuOpen = signal(false);
    this.connectAlerts = computed(() => this.friends.requestCount() + this.dm.unread() + this.cs.alertCount());
    if (this.auth.isLoggedIn()) {
      if (!this.friends.loaded())
        this.friends.load();
      this.dm.loadUnread();
      if (!this.cs.loaded())
        this.cs.load();
      if (!this.teams.loadedMine())
        this.teams.loadMine();
    }
  }
  /**
   * First character of the user's nickname (if set) or name, uppercased.
   * Used as the avatar placeholder when no photo is uploaded.
   */
  avatarLetter() {
    const u = this.auth.currentUser();
    const label = u?.nickname || u?.name || "U";
    return label.charAt(0).toUpperCase();
  }
  logout() {
    this.auth.logout();
    this.closeMenu();
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
  static {
    this.\u0275fac = function NavComponent_Factory(t) {
      return new (t || _NavComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NavComponent, selectors: [["app-nav"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 27, vars: 4, consts: [[1, "nav"], ["routerLink", "/", 1, "nav-logo", 3, "click"], [1, "logo-icon"], [1, "logo-text"], [1, "logo-ar"], [1, "nav-links"], ["routerLink", "/tournaments", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/marketplace", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/leaderboard", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/sponsors", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/pricing", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-actions"], ["aria-label", "Menu", 1, "nav-burger", 3, "click"], [1, "nav-drawer"], ["routerLink", "/community", "routerLinkActive", "active", "title", "Communities, Friends, Messages & Challenges", 1, "nav-link", "nav-link--friends", "nav-link--connect"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "currentColor", 2, "margin-right", "1px"], ["d", "M13 2 3 14h7l-1 8 10-12h-7l1-8z"], [1, "nav-badge"], ["routerLink", "/players", "routerLinkActive", "active", 1, "nav-link"], ["routerLink", "/teams", "routerLinkActive", "active", 1, "nav-link", "nav-link--friends"], ["routerLink", "/dashboard", "routerLinkActive", "active", 1, "nav-link", "nav-link--dash"], ["routerLink", "/calendar", "routerLinkActive", "active", 1, "nav-link", "nav-link--cal"], ["routerLink", "/admin", "routerLinkActive", "active", 1, "nav-link", "nav-link--admin"], ["routerLink", "/subscription", "routerLinkActive", "active", 1, "nav-link", "nav-link--sub"], ["routerLink", "/profile", 1, "nav-avatar", 3, "title"], [3, "src", "alt"], [1, "btn-nav-ghost", 3, "click"], [1, "nav-avatar__letter"], ["routerLink", "/auth", 1, "btn-nav-ghost"], ["routerLink", "/auth", 1, "btn-nav-gold"], [1, "nav-drawer", 3, "click"], ["routerLink", "/tournaments", 1, "drawer-link"], ["routerLink", "/marketplace", 1, "drawer-link"], ["routerLink", "/leaderboard", 1, "drawer-link"], ["routerLink", "/sponsors", 1, "drawer-link"], ["routerLink", "/pricing", 1, "drawer-link"], ["routerLink", "/dashboard", 1, "drawer-link"], ["routerLink", "/calendar", 1, "drawer-link"], ["routerLink", "/community", 1, "drawer-link"], ["routerLink", "/profile", 1, "drawer-link", "drawer-link--profile"], [1, "drawer-avatar"], ["routerLink", "/admin", 1, "drawer-link", "drawer-link--admin"], ["routerLink", "/subscription", 1, "drawer-link"], [1, "drawer-link", 3, "click"], ["routerLink", "/auth", 1, "drawer-link"]], template: function NavComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav", 0)(1, "a", 1);
        \u0275\u0275listener("click", function NavComponent_Template_a_click_1_listener() {
          return ctx.closeMenu();
        });
        \u0275\u0275elementStart(2, "span", 2);
        \u0275\u0275text(3, "\u26A1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "DAWRI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7, "\u062F\u0627\u0648\u0631\u064A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 5)(9, "a", 6);
        \u0275\u0275text(10, "Tournaments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "a", 7);
        \u0275\u0275text(12, "Marketplace");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "a", 8);
        \u0275\u0275text(14, "Leaderboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 9);
        \u0275\u0275text(16, "Partners");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "a", 10);
        \u0275\u0275text(18, "Pricing");
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, NavComponent_Conditional_19_Template, 10, 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 11);
        \u0275\u0275template(21, NavComponent_Conditional_21_Template, 12, 4)(22, NavComponent_Conditional_22_Template, 4, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 12);
        \u0275\u0275listener("click", function NavComponent_Template_button_click_23_listener() {
          return ctx.menuOpen.set(!ctx.menuOpen());
        });
        \u0275\u0275text(24, "\u2630");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, NavComponent_Conditional_25_Template, 13, 1, "div", 13)(26, NavComponent_Conditional_26_Template, 1, 0, "app-challenge-create");
      }
      if (rf & 2) {
        \u0275\u0275advance(19);
        \u0275\u0275conditional(19, ctx.auth.isLoggedIn() ? 19 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(21, ctx.auth.isLoggedIn() ? 21 : 22);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(25, ctx.menuOpen() ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.auth.isLoggedIn() ? 26 : -1);
      }
    }, dependencies: [RouterLink, RouterLinkActive, CommonModule, NotificationBellComponent, ChallengeCreateComponent], styles: ['\n\n.nav[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 200;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 0 32px;\n  background: rgba(6, 8, 16, .95);\n  -webkit-backdrop-filter: blur(16px);\n  backdrop-filter: blur(16px);\n  border-bottom: 1px solid #1e2a3a;\n}\n.nav-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  text-decoration: none;\n  margin-right: auto;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1.5rem;\n  letter-spacing: 0.1em;\n  color: #a855f7;\n}\n.logo-ar[_ngcontent-%COMP%] {\n  font-family: "Noto Sans Arabic", sans-serif;\n  font-size: 0.8rem;\n  color: #8892a4;\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.nav-link[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 700;\n  font-size: 0.82rem;\n  letter-spacing: 0.08em;\n  color: #8892a4;\n  text-transform: uppercase;\n  text-decoration: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  transition: all 0.15s;\n}\n.nav-link[_ngcontent-%COMP%]:hover, .nav-link.active[_ngcontent-%COMP%] {\n  color: #a855f7;\n}\n.nav-link--friends[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.nav-link--connect[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.nav-link--connect[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.nav-link--connect.active[_ngcontent-%COMP%], .nav-link--connect[_ngcontent-%COMP%]:hover {\n  color: #e8c965;\n}\n.nav-badge[_ngcontent-%COMP%] {\n  display: inline-grid;\n  place-items: center;\n  min-width: 17px;\n  height: 17px;\n  padding: 0 5px;\n  border-radius: 100px;\n  background: #006c35;\n  color: #fff;\n  font-family: "JetBrains Mono", monospace;\n  font-size: 0.62rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.nav-badge--blue[_ngcontent-%COMP%] {\n  background: #2e8bff;\n}\n.nav-link--dash[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.nav-link--dash.active[_ngcontent-%COMP%] {\n  color: #fbbf24;\n  background: rgba(251, 191, 36, 0.08);\n}\n.nav-link--cal[_ngcontent-%COMP%] {\n  color: #a855f7;\n}\n.nav-link--cal.active[_ngcontent-%COMP%] {\n  color: #a855f7;\n  background: rgba(168, 85, 247, 0.08);\n}\n.nav-link--admin[_ngcontent-%COMP%] {\n  color: #a855f7;\n}\n.nav-link--admin.active[_ngcontent-%COMP%] {\n  color: #a855f7;\n  background: rgba(168, 85, 247, 0.12);\n}\n.nav-link--sub[_ngcontent-%COMP%] {\n  color: #fbbf24;\n  opacity: 0.7;\n}\n.nav-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.nav-avatar[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #7e22ce);\n  color: #fff;\n  font-weight: 700;\n  font-size: 0.85rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  border: 2px solid transparent;\n  transition:\n    border-color .15s,\n    transform .15s,\n    box-shadow .2s;\n  flex-shrink: 0;\n}\n.nav-avatar[_ngcontent-%COMP%]:hover {\n  border-color: #fbbf24;\n  transform: scale(1.05);\n  box-shadow: 0 0 16px rgba(168, 85, 247, 0.4);\n}\n.nav-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.nav-avatar__letter[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 1rem;\n  letter-spacing: 0;\n}\n.btn-nav-ghost[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 700;\n  font-size: 0.78rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #8892a4;\n  padding: 7px 16px;\n  border: 1px solid #1e2a3a;\n  border-radius: 6px;\n  text-decoration: none;\n  cursor: pointer;\n  background: transparent;\n  transition: all 0.15s;\n}\n.btn-nav-ghost[_ngcontent-%COMP%]:hover {\n  border-color: #a855f7;\n  color: #a855f7;\n}\n.btn-nav-gold[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 700;\n  font-size: 0.78rem;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  padding: 7px 16px;\n  border-radius: 6px;\n  text-decoration: none;\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7 0%,\n      #7e22ce 100%);\n  color: #fff;\n  border: 1px solid #a855f7;\n}\n.btn-nav-gold[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.4);\n}\n.nav-burger[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  color: #a855f7;\n  font-size: 1.4rem;\n  cursor: pointer;\n}\n.nav-drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 60px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(6, 8, 16, .97);\n  z-index: 199;\n  display: flex;\n  flex-direction: column;\n  padding: 2rem;\n}\n.drawer-link[_ngcontent-%COMP%] {\n  font-family: "Rajdhani", sans-serif;\n  font-weight: 700;\n  font-size: 1rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #c8cfd8;\n  text-decoration: none;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #1e2a3a;\n  background: none;\n  border-left: none;\n  border-right: none;\n  border-top: none;\n  cursor: pointer;\n  text-align: left;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.drawer-link[_ngcontent-%COMP%]:hover {\n  color: #a855f7;\n}\n.drawer-link--admin[_ngcontent-%COMP%] {\n  color: #a855f7;\n}\n.drawer-link--profile[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.drawer-avatar[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #7e22ce);\n  color: #fff;\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 0.85rem;\n  flex-shrink: 0;\n}\n.drawer-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@media (max-width: 768px) {\n  .nav-links[_ngcontent-%COMP%], .nav-actions[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .nav-burger[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n/*# sourceMappingURL=nav.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NavComponent, { className: "NavComponent", filePath: "src\\app\\shared\\components\\nav\\nav.component.ts", lineNumber: 235 });
})();

// src/app/components/sidebar-ad/sidebar-ad.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function SidebarAdComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.currentAd().image_url, \u0275\u0275sanitizeUrl)("alt", ctx_r1.currentAd().title);
  }
}
function SidebarAdComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.currentAd().brand_name || ctx_r1.currentAd().title).charAt(0));
  }
}
function SidebarAdComponent_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.currentAd().brand_name);
  }
}
function SidebarAdComponent_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.currentAd().title_ar);
  }
}
function SidebarAdComponent_Conditional_0_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 15);
    \u0275\u0275listener("click", function SidebarAdComponent_Conditional_0_Conditional_15_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.trackClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.currentAd().link_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentAd().cta_label || "Learn More", " \u2192 ");
  }
}
function SidebarAdComponent_Conditional_0_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function SidebarAdComponent_Conditional_0_Conditional_16_For_2_Template_button_click_0_listener() {
      const i_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goTo(i_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("sad-dot--active", i_r5 === ctx_r1.currentIndex());
  }
}
function SidebarAdComponent_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, SidebarAdComponent_Conditional_0_Conditional_16_For_2_Template, 1, 2, "button", 16, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.ads());
  }
}
function SidebarAdComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
    \u0275\u0275text(3, "Sponsored");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 3);
    \u0275\u0275listener("click", function SidebarAdComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarAd());
    });
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275template(7, SidebarAdComponent_Conditional_0_Conditional_7_Template, 1, 2, "img", 5)(8, SidebarAdComponent_Conditional_0_Conditional_8_Template, 3, 1);
    \u0275\u0275element(9, "div", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275template(11, SidebarAdComponent_Conditional_0_Conditional_11_Template, 2, 1, "div", 8);
    \u0275\u0275elementStart(12, "div", 9);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, SidebarAdComponent_Conditional_0_Conditional_14_Template, 2, 1, "div", 10)(15, SidebarAdComponent_Conditional_0_Conditional_15_Template, 2, 2, "a", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, SidebarAdComponent_Conditional_0_Conditional_16_Template, 3, 0, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(7, ctx_r1.currentAd().image_url ? 7 : 8);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(11, ctx_r1.currentAd().brand_name ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentAd().title);
    \u0275\u0275advance();
    \u0275\u0275conditional(14, ctx_r1.currentAd().title_ar ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, ctx_r1.currentAd().link_url ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(16, ctx_r1.ads().length > 1 ? 16 : -1);
  }
}
var SidebarAdComponent = class _SidebarAdComponent {
  constructor() {
    this.side = input("sidebar_left");
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.ads = signal([]);
    this.currentIndex = signal(0);
    this.currentAd = signal(null);
    this.dismissed = signal(typeof sessionStorage !== "undefined" && sessionStorage.getItem("ad_dismissed_" + (this.side?.() ?? "")) === "1");
    this.isPremium = () => {
      const plan = this.auth.currentUser()?.subscription_plan;
      return plan && plan !== "free";
    };
  }
  // Persist dismissed state per-side in sessionStorage so closing on one page
  // keeps it closed on others, but resets when browser tab is closed
  get dismissedKey() {
    return "ad_dismissed_" + this.side();
  }
  closeSidebarAd() {
    this.dismissed.set(true);
    try {
      sessionStorage.setItem(this.dismissedKey, "1");
    } catch (_) {
    }
  }
  ngOnInit() {
    if (this.isPremium())
      return;
    this.api.getAdPlacements(this.side()).pipe(catchError(() => of({ data: [] }))).subscribe((r) => {
      const list = r.data ?? [];
      this.ads.set(list);
      if (list.length) {
        this.currentAd.set(list[0]);
        if (list.length > 1) {
          this.timer = setInterval(() => this.advance(), 8e3);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.timer)
      clearInterval(this.timer);
  }
  advance() {
    const next = (this.currentIndex() + 1) % this.ads().length;
    this.currentIndex.set(next);
    this.currentAd.set(this.ads()[next]);
  }
  goTo(i) {
    this.currentIndex.set(i);
    this.currentAd.set(this.ads()[i]);
  }
  trackClick() {
    const ad = this.currentAd();
    if (ad?.id)
      this.api.trackAdClick(ad.id);
  }
  static {
    this.\u0275fac = function SidebarAdComponent_Factory(t) {
      return new (t || _SidebarAdComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarAdComponent, selectors: [["app-sidebar-ad"]], inputs: { side: [InputFlags.SignalBased, "side"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [[1, "sad-wrap"], [1, "sad-top"], [1, "sad-sponsored"], ["title", "Close", 1, "sad-close", 3, "click"], [1, "sad-img-wrap"], [3, "src", "alt"], [1, "sad-overlay"], [1, "sad-content"], [1, "sad-brand"], [1, "sad-title"], ["dir", "rtl", 1, "sad-title-ar"], ["target", "_blank", "rel", "noopener", 1, "sad-cta", 3, "href"], [1, "sad-dots"], [1, "sad-placeholder"], [1, "sad-initial"], ["target", "_blank", "rel", "noopener", 1, "sad-cta", 3, "click", "href"], [1, "sad-dot", 3, "sad-dot--active"], [1, "sad-dot", 3, "click"]], template: function SidebarAdComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, SidebarAdComponent_Conditional_0_Template, 17, 6, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, !ctx.isPremium() && !ctx.dismissed() && ctx.currentAd() ? 0 : -1);
      }
    }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.sad-wrap[_ngcontent-%COMP%] {\n  --accent: #f0a500;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-height: 300px;\n  background: #080e1a;\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-top: 3px solid var(--accent);\n  border-radius: 10px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.sad-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 7px 10px;\n  background: rgba(0, 0, 0, .4);\n  flex-shrink: 0;\n  z-index: 10;\n}\n.sad-sponsored[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 9px;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: rgba(255, 255, 255, .35);\n}\n.sad-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: rgba(255, 255, 255, .3);\n  font-size: 12px;\n  cursor: pointer;\n  padding: 2px 5px;\n  border-radius: 4px;\n  line-height: 1;\n  transition: all .15s;\n}\n.sad-close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background: rgba(255, 255, 255, .1);\n}\n.sad-img-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n  min-height: 0;\n}\n.sad-img-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n  display: block;\n}\n.sad-placeholder[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      160deg,\n      #0d1a2e,\n      #091422);\n}\n.sad-initial[_ngcontent-%COMP%] {\n  font-size: 80px;\n  font-weight: 900;\n  color: var(--accent);\n  opacity: .15;\n}\n.sad-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 30%,\n      rgba(8, 14, 26, .7) 65%,\n      rgba(8, 14, 26, .97) 100%);\n}\n.sad-content[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 40px;\n  left: 0;\n  right: 0;\n  padding: 0 12px 8px;\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.sad-brand[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 9px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--accent);\n}\n.sad-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n  line-height: 1.3;\n  text-shadow: 0 1px 6px rgba(0, 0, 0, .8);\n}\n.sad-title-ar[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: rgba(255, 255, 255, .6);\n}\n.sad-cta[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 6px;\n  padding: 7px 12px;\n  background: var(--accent);\n  color: #080e1a;\n  font-size: 11px;\n  font-weight: 700;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 6px;\n  transition: opacity .15s;\n  align-self: stretch;\n}\n.sad-cta[_ngcontent-%COMP%]:hover {\n  opacity: .85;\n}\n.sad-dots[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  gap: 5px;\n  padding: 8px 0;\n  z-index: 6;\n  background: rgba(8, 14, 26, .5);\n}\n.sad-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  border: none;\n  background: rgba(255, 255, 255, .25);\n  cursor: pointer;\n  padding: 0;\n  transition: background .15s;\n}\n.sad-dot--active[_ngcontent-%COMP%] {\n  background: var(--accent);\n}\n/*# sourceMappingURL=sidebar-ad.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarAdComponent, { className: "SidebarAdComponent", filePath: "src\\app\\components\\sidebar-ad\\sidebar-ad.component.ts", lineNumber: 231 });
})();

// src/app/shared/components/footer/footer.component.ts
var FooterComponent = class _FooterComponent {
  static {
    this.\u0275fac = function FooterComponent_Factory(t) {
      return new (t || _FooterComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 0, consts: [[1, "footer"], [1, "footer-inner"], [1, "footer-brand"], [1, "footer-logo"], [1, "footer-logo__ar"], [1, "footer-tagline"], [1, "footer-links"], [1, "footer-col"], [1, "footer-col__title"], ["routerLink", "/tournaments", 1, "footer-col__link"], ["routerLink", "/marketplace", 1, "footer-col__link"], ["routerLink", "/pricing", 1, "footer-col__link"], ["routerLink", "/leaderboard", 1, "footer-col__link"], ["routerLink", "/about", 1, "footer-col__link"], ["routerLink", "/contact", 1, "footer-col__link"], ["routerLink", "/privacy", 1, "footer-col__link"], [1, "footer-bottom"]], template: function FooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "\u26A1 DAWRI ");
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "\u062F\u0627\u0648\u0631\u064A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "p", 5);
        \u0275\u0275text(8, "Saudi Arabia's premier esports tournament platform.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "strong", 8);
        \u0275\u0275text(12, "Platform");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "a", 9);
        \u0275\u0275text(14, "Tournaments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 10);
        \u0275\u0275text(16, "Marketplace");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "a", 11);
        \u0275\u0275text(18, "Pricing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "a", 12);
        \u0275\u0275text(20, "Leaderboard");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 7)(22, "strong", 8);
        \u0275\u0275text(23, "Company");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 13);
        \u0275\u0275text(25, "About");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 14);
        \u0275\u0275text(27, "Contact");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "a", 15);
        \u0275\u0275text(29, "Privacy");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(30, "div", 16);
        \u0275\u0275text(31, " \xA9 2026 Dawri Platform \xB7 \u062F\u0627\u0648\u0631\u064A \xB7 All rights reserved ");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterLink], styles: ["\n\n.footer[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  border-top: 1px solid var(--br);\n  padding: 48px 32px 24px;\n}\n.footer-inner[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  margin-bottom: 36px;\n}\n.footer-logo[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.5rem;\n  letter-spacing: 0.1em;\n  color: var(--gold);\n  margin-bottom: 10px;\n}\n.footer-logo__ar[_ngcontent-%COMP%] {\n  font-family: var(--fa);\n  font-size: 0.75rem;\n  color: var(--mu);\n  margin-left: 6px;\n}\n.footer-tagline[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--mu);\n  line-height: 1.6;\n}\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 48px;\n}\n.footer-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.footer-col__title[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--mu);\n  margin-bottom: 4px;\n}\n.footer-col__link[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--mu);\n  text-decoration: none;\n  transition: color 0.15s;\n}\n.footer-col__link[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n}\n.footer-bottom[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.75rem;\n  color: var(--dim);\n  padding-top: 24px;\n  border-top: 1px solid var(--br);\n  max-width: 1100px;\n  margin: 0 auto;\n}\n@media (max-width: 600px) {\n  .footer-inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=footer.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src\\app\\shared\\components\\footer\\footer.component.ts", lineNumber: 12 });
})();

// src/app/shared/components/toast/toast.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function ToastComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function ToastComponent_For_2_Template_div_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toast.dismiss(t_r2.id));
    });
    \u0275\u0275elementStart(1, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap("toast--" + t_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.icons[t_r2.type]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.message);
  }
}
var ToastComponent = class _ToastComponent {
  constructor() {
    this.toast = inject(ToastService);
    this.icons = {
      success: "\u2713",
      error: "\u2715",
      info: "\u2139",
      warning: "\u26A0"
    };
  }
  static {
    this.\u0275fac = function ToastComponent_Factory(t) {
      return new (t || _ToastComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastComponent, selectors: [["app-toast"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 0, consts: [[1, "toast-wrap"], ["role", "alert", 1, "toast", 3, "class"], ["role", "alert", 1, "toast", 3, "click"], [1, "toast__icon"], [1, "toast__msg"]], template: function ToastComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275repeaterCreate(1, ToastComponent_For_2_Template, 5, 4, "div", 1, _forTrack04);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.toast.toasts());
      }
    }, dependencies: [CommonModule], styles: ["\n\n.toast-wrap[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  z-index: 999;\n  max-width: 340px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.88rem;\n  font-weight: 600;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\n.toast--success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  border: 1px solid rgba(34, 197, 94, 0.3);\n  color: #4ade80;\n}\n.toast--error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  color: #f87171;\n}\n.toast--info[_ngcontent-%COMP%] {\n  background: rgba(0, 229, 255, 0.1);\n  border: 1px solid rgba(0, 229, 255, 0.25);\n  color: var(--cyan);\n}\n.toast--warning[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.1);\n  border: 1px solid rgba(245, 158, 11, 0.3);\n  color: #fbbf24;\n}\n.toast__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-weight: 700;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n/*# sourceMappingURL=toast.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastComponent, { className: "ToastComponent", filePath: "src\\app\\shared\\components\\toast\\toast.component.ts", lineNumber: 13 });
})();

// src/app/features/achievements/achievement-unlock-watcher.component.ts
var _forTrack05 = ($index, $item) => $item.key;
function AchievementUnlockWatcherComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "div", 1);
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3)(5, "div", 4);
    \u0275\u0275text(6, "Achievement Unlocked!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 5);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 6);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 7);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-tier", t_r1.tier);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.iconFor(t_r1.icon));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("+", t_r1.xp_reward, " XP");
  }
}
var AchievementUnlockWatcherComponent = class _AchievementUnlockWatcherComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.auth = inject(AuthService);
    this.timer = null;
    this.shown = /* @__PURE__ */ new Set();
    this.toasts = signal([]);
  }
  ngOnInit() {
    if (!this.auth.isLoggedIn?.())
      return;
    this.tick();
    this.timer = setInterval(() => this.tick(), 3e4);
  }
  ngOnDestroy() {
    if (this.timer)
      clearInterval(this.timer);
  }
  tick() {
    this.http.get(`${environment.apiUrl}/notifications?page=1`).subscribe({
      next: (res) => {
        const unlocks = (res.data ?? []).filter((n) => (n.data?.type === "achievement_unlocked" || n.type?.includes("AchievementUnlocked")) && !n.read_at && !this.shown.has(n.id));
        for (const n of unlocks) {
          const d = n.data ?? {};
          this.shown.add(n.id);
          this.push({
            key: d.key,
            name: d.name,
            description: d.description ?? "",
            tier: d.tier ?? "bronze",
            icon: d.icon ?? "trophy",
            xp_reward: d.xp_reward ?? 0
          });
          this.http.post(`${environment.apiUrl}/notifications/${n.id}/read`, {}).subscribe({ error: () => {
          } });
        }
      },
      error: () => {
      }
    });
  }
  push(t) {
    this.toasts.update((x) => [...x, t]);
    setTimeout(() => this.toasts.update((x) => x.filter((y) => y.key !== t.key)), 6e3);
  }
  iconFor(key) {
    const map = {
      "trophy": "\u{1F3C6}",
      "crown": "\u{1F451}",
      "flame": "\u{1F525}",
      "sword": "\u2694\uFE0F",
      "swords": "\u2694\uFE0F",
      "medal": "\u{1F947}",
      "shield": "\u{1F6E1}\uFE0F",
      "star": "\u2B50",
      "flag": "\u{1F6A9}",
      "crosshair": "\u{1F3AF}",
      "user-plus": "\u{1F91D}",
      "users": "\u{1F465}",
      "users-round": "\u{1F465}",
      "mic": "\u{1F399}\uFE0F",
      "shopping-bag": "\u{1F6CD}\uFE0F",
      "id-card": "\u{1FAAA}"
    };
    return map[key] ?? "\u{1F3C5}";
  }
  static {
    this.\u0275fac = function AchievementUnlockWatcherComponent_Factory(t) {
      return new (t || _AchievementUnlockWatcherComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AchievementUnlockWatcherComponent, selectors: [["app-achievement-unlock-watcher"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, consts: [[1, "auw-toast"], [1, "auw-toast__sparkle"], [1, "auw-toast__icon"], [1, "auw-toast__body"], [1, "auw-toast__head"], [1, "auw-toast__name"], [1, "auw-toast__desc"], [1, "auw-toast__xp"]], template: function AchievementUnlockWatcherComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275repeaterCreate(0, AchievementUnlockWatcherComponent_For_1_Template, 13, 5, "div", 0, _forTrack05);
      }
      if (rf & 2) {
        \u0275\u0275repeater(ctx.toasts());
      }
    }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  position: fixed;\n  top: 5rem;\n  right: 1.5rem;\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  pointer-events: none;\n}\n.auw-toast[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.85rem;\n  align-items: center;\n  padding: 1rem 1.25rem;\n  min-width: 320px;\n  max-width: 380px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(11, 16, 34, 0.95),\n      rgba(0, 108, 53, 0.85));\n  border: 2px solid #d4af37;\n  border-radius: 14px;\n  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.55), 0 0 24px rgba(212, 175, 55, 0.4);\n  animation: _ngcontent-%COMP%_auw-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both, _ngcontent-%COMP%_auw-out 0.4s ease 5.5s forwards;\n  position: relative;\n  overflow: hidden;\n}\n.auw-toast[data-tier=platinum][_ngcontent-%COMP%] {\n  border-color: #2e8bff;\n  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(46, 139, 255, 0.45);\n}\n.auw-toast[data-tier=gold][_ngcontent-%COMP%] {\n  border-color: #d4af37;\n}\n.auw-toast[data-tier=silver][_ngcontent-%COMP%] {\n  border-color: #c0c0c0;\n}\n.auw-toast[data-tier=bronze][_ngcontent-%COMP%] {\n  border-color: #cd7f32;\n}\n.auw-toast__sparkle[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    radial-gradient(\n      circle at 20% 30%,\n      rgba(255, 255, 255, 0.25),\n      transparent 30%),\n    radial-gradient(\n      circle at 80% 60%,\n      rgba(212, 175, 55, 0.4),\n      transparent 35%);\n  animation: _ngcontent-%COMP%_auw-shine 2s ease-in-out infinite;\n}\n.auw-toast__icon[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.9rem;\n  background: rgba(212, 175, 55, 0.18);\n  flex-shrink: 0;\n  z-index: 1;\n}\n.auw-toast__body[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.auw-toast__head[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  color: #d4af37;\n  font-weight: 700;\n}\n.auw-toast__name[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 800;\n  color: #fff;\n  margin-top: 0.1rem;\n}\n.auw-toast__desc[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  opacity: 0.85;\n  color: #fff;\n  margin-top: 0.2rem;\n  line-height: 1.3;\n}\n.auw-toast__xp[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #d4af37;\n  margin-top: 0.4rem;\n}\n@keyframes _ngcontent-%COMP%_auw-pop {\n  0% {\n    transform: translateX(40px) scale(0.85);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_auw-out {\n  to {\n    transform: translateX(40px);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_auw-shine {\n  0%, 100% {\n    opacity: 0.4;\n  }\n  50% {\n    opacity: 0.8;\n  }\n}\n/*# sourceMappingURL=achievement-unlock-watcher.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AchievementUnlockWatcherComponent, { className: "AchievementUnlockWatcherComponent", filePath: "src\\app\\features\\achievements\\achievement-unlock-watcher.component.ts", lineNumber: 90 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 0, consts: [[1, "app-layout"], [1, "app-layout__sidebar", "app-layout__sidebar--left"], ["side", "sidebar_left"], [1, "main-content"], [1, "app-layout__sidebar", "app-layout__sidebar--right"], ["side", "sidebar_right"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "app-nav");
        \u0275\u0275elementStart(1, "div", 0)(2, "aside", 1);
        \u0275\u0275element(3, "app-sidebar-ad", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "main", 3);
        \u0275\u0275element(5, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "aside", 4);
        \u0275\u0275element(7, "app-sidebar-ad", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(8, "app-footer")(9, "app-toast")(10, "app-achievement-unlock-watcher");
      }
    }, dependencies: [RouterOutlet, NavComponent, SidebarAdComponent, FooterComponent, ToastComponent, AchievementUnlockWatcherComponent], styles: ['@charset "UTF-8";\n\n\n\n.app-layout[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n  min-height: calc(100vh - 60px);\n}\n.app-layout__sidebar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  position: sticky;\n  top: 60px;\n  height: calc(100vh - 60px);\n  overflow: hidden;\n  width: 180px;\n}\n@media (min-width: 1600px) {\n  .app-layout__sidebar[_ngcontent-%COMP%] {\n    width: 220px;\n  }\n}\n@media (max-width: 1400px) {\n  .app-layout__sidebar[_ngcontent-%COMP%] {\n    width: 160px;\n  }\n}\n@media (max-width: 1280px) {\n  .app-layout__sidebar[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.app-layout__sidebar--left[_ngcontent-%COMP%] {\n  padding: 0 8px 0 0;\n}\n.app-layout__sidebar--right[_ngcontent-%COMP%] {\n  padding: 0 0 0 8px;\n}\n.app-layout__sidebar[_ngcontent-%COMP%]   app-sidebar-ad[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  min-height: calc(100vh - 60px);\n  overflow-x: hidden;\n  display: block;\n  position: relative;\n}\n/*# sourceMappingURL=app.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 16 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
