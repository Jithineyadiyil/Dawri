import {
  FriendService
} from "./chunk-H4EFRF6P.js";
import {
  DmService,
  ReverbConnectionService
} from "./chunk-5L7FNWZJ.js";
import {
  CommunityStateService
} from "./chunk-QBAOKTDJ.js";
import "./chunk-GFWMVHEB.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import "./chunk-OERRWE4S.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  computed,
  effect,
  filter,
  inject,
  signal,
  untracked,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import {
  __async
} from "./chunk-7XEFWCRO.js";

// src/app/features/community/components/server-sidebar/server-sidebar.component.ts
var _c0 = (a0) => ["/community", a0];
function ServerSidebarComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.socialAlerts());
  }
}
function ServerSidebarComponent_a_11_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 15);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", c_r2.icon_url, \u0275\u0275sanitizeUrl)("alt", c_r2.name);
  }
}
function ServerSidebarComponent_a_11_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.initials(c_r2.name));
  }
}
function ServerSidebarComponent_a_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275element(1, "span", 1);
    \u0275\u0275elementStart(2, "div", 12);
    \u0275\u0275template(3, ServerSidebarComponent_a_11_img_3_Template, 1, 2, "img", 13)(4, ServerSidebarComponent_a_11_span_4_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", c_r2.id === ctx_r0.activeId());
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, c_r2.slug))("title", c_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("global", c_r2.type === "global");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", c_r2.icon_url);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !c_r2.icon_url);
  }
}
var ServerSidebarComponent = class _ServerSidebarComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.friends = inject(FriendService);
    this.dm = inject(DmService);
    this.communities = this.state.communities;
    this.activeId = this.state.activeCommunityId;
    this.socialAlerts = computed(() => this.friends.requestCount() + this.dm.unread());
    if (!this.friends.loaded())
      this.friends.load();
    this.dm.loadUnread();
  }
  initials(name) {
    return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  }
  static {
    this.\u0275fac = function ServerSidebarComponent_Factory(t) {
      return new (t || _ServerSidebarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ServerSidebarComponent, selectors: [["app-server-sidebar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 2, consts: [["routerLink", "/community/home", "routerLinkActive", "active", "title", "Dawri Connect+ \u2014 Friends, Messages & Challenges", 1, "home-link"], [1, "pill"], [1, "bubble", "bubble--home"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "home-badge"], ["aria-hidden", "true", 1, "rail-divider"], [3, "routerLink", "active", "title", 4, "ngFor", "ngForOf"], [3, "routerLink", "title"], [1, "bubble"], [3, "src", "alt", 4, "ngIf"], [4, "ngIf"], [3, "src", "alt"]], template: function ServerSidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nav")(1, "a", 0);
        \u0275\u0275element(2, "span", 1);
        \u0275\u0275elementStart(3, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 3);
        \u0275\u0275element(5, "path", 4)(6, "circle", 5)(7, "path", 6)(8, "path", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, ServerSidebarComponent_Conditional_9_Template, 2, 1, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(10, "div", 9);
        \u0275\u0275template(11, ServerSidebarComponent_a_11_Template, 5, 10, "a", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, ctx.socialAlerts() > 0 ? 9 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.communities());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterLink, RouterLinkActive], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --gold: #d4af37;\n  --surface: #1c1833;\n  --text: #eaeaf2;\n}\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 1rem 0;\n  gap: 0.65rem;\n}\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n  position: relative;\n  display: grid;\n  place-items: center;\n}\n.pill[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -14px;\n  top: 50%;\n  transform: translateY(-50%) scaleY(0);\n  width: 4px;\n  height: 28px;\n  border-radius: 0 4px 4px 0;\n  background: var(--accent-s);\n  transition: transform 0.18s ease;\n}\na[_ngcontent-%COMP%]:hover   .pill[_ngcontent-%COMP%] {\n  transform: translateY(-50%) scaleY(0.5);\n  background: var(--text);\n}\na.active[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%] {\n  transform: translateY(-50%) scaleY(1);\n  background: var(--accent-s);\n}\n@keyframes _ngcontent-%COMP%_bubbleIn {\n  0% {\n    transform: scale(.8);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.08);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_pillExpand {\n  from {\n    transform: translateY(-50%) scaleY(0);\n  }\n  60% {\n    transform: translateY(-50%) scaleY(1.15);\n  }\n  to {\n    transform: translateY(-50%) scaleY(1);\n  }\n}\n.bubble[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 16px;\n  background: var(--surface);\n  display: grid;\n  place-items: center;\n  color: var(--text);\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.05rem;\n  letter-spacing: 0.04em;\n  transition:\n    border-radius 0.22s cubic-bezier(.34, 1.56, .64, 1),\n    box-shadow 0.22s ease,\n    transform 0.22s cubic-bezier(.34, 1.56, .64, 1),\n    background 0.18s ease;\n  cursor: pointer;\n}\n.bubble[_ngcontent-%COMP%]:hover {\n  border-radius: 12px;\n  transform: translateY(-3px) scale(1.06);\n  box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.6), 0 6px 20px rgba(124, 58, 237, 0.35);\n}\n.bubble.global[_ngcontent-%COMP%] {\n  background: #1a1710;\n  color: var(--gold);\n  box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.4);\n}\n.home-link[_ngcontent-%COMP%] {\n  position: relative;\n}\n.bubble--home[_ngcontent-%COMP%] {\n  background: #14211a;\n  color: #4ade80;\n  box-shadow: inset 0 0 0 1px rgba(0, 108, 53, .5);\n}\n.home-link.active[_ngcontent-%COMP%]   .bubble--home[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 0 0 2.5px #006c35, 0 0 20px rgba(0, 108, 53, .5);\n}\n.home-link[_ngcontent-%COMP%]:hover   .bubble--home[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 2px rgba(74, 222, 128, .6), 0 6px 20px rgba(0, 108, 53, .35);\n}\n.home-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 100px;\n  background: #ef4444;\n  color: #fff;\n  border: 2px solid #0d0a18;\n  font-family: "JetBrains Mono", monospace;\n  font-size: 0.6rem;\n  font-weight: 700;\n  display: grid;\n  place-items: center;\n  line-height: 1;\n}\n.rail-divider[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 2px;\n  border-radius: 2px;\n  background: rgba(255, 255, 255, .1);\n  margin: 2px 0;\n}\n.active[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 0 0 2.5px var(--accent-s), 0 0 24px rgba(124, 58, 237, 0.5);\n  animation: _ngcontent-%COMP%_bubbleIn .35s cubic-bezier(.34, 1.56, .64, 1) both;\n}\n.active[_ngcontent-%COMP%]   .bubble.global[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 2.5px var(--gold), 0 0 20px rgba(212, 175, 55, 0.4);\n}\n.active[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pillExpand .3s cubic-bezier(.34, 1.56, .64, 1) both;\n}\nimg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n  object-fit: cover;\n}\n/*# sourceMappingURL=server-sidebar.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ServerSidebarComponent, { className: "ServerSidebarComponent", filePath: "src\\app\\features\\community\\components\\server-sidebar\\server-sidebar.component.ts", lineNumber: 109 });
})();

// src/app/features/community/components/channel-list/channel-list.component.ts
var _c02 = (a0, a1) => ["/community", a0, "channel", a1];
function ChannelListComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function ChannelListComponent_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openManage());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 6);
    \u0275\u0275element(2, "circle", 7)(3, "path", 8);
    \u0275\u0275elementEnd()();
  }
}
function ChannelListComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "Channels");
    \u0275\u0275elementEnd();
  }
}
function ChannelListComponent_li_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function ChannelListComponent_li_6__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 16);
    \u0275\u0275element(1, "path", 17);
    \u0275\u0275elementEnd();
  }
}
function ChannelListComponent_li_6_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ch_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ch_r3.unread_count > 99 ? "99+" : ch_r3.unread_count, " ");
  }
}
function ChannelListComponent_li_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 10);
    \u0275\u0275template(2, ChannelListComponent_li_6_span_2_Template, 2, 0, "span", 11)(3, ChannelListComponent_li_6__svg_svg_3_Template, 2, 0, "svg", 12);
    \u0275\u0275elementStart(4, "span", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ChannelListComponent_li_6_span_6_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ch_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ch_r3.id === ctx_r1.activeChannelId());
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(7, _c02, (tmp_3_0 = ctx_r1.community()) == null ? null : tmp_3_0.slug, ch_r3.id));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ch_r3.type !== "announcement");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ch_r3.type === "announcement");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ch_r3.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ch_r3.unread_count && ch_r3.unread_count > 0);
  }
}
var ChannelListComponent = class _ChannelListComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.community = this.state.activeCommunity;
    this.channels = this.state.activeChannels;
    this.activeChannelId = this.state.activeChannelId;
    this.canManage = computed(() => {
      const role = this.auth.currentUser()?.role;
      if (role === "admin")
        return true;
      const uid = this.auth.currentUser()?.id;
      const cid = this.state.activeCommunityId();
      if (!uid || !cid)
        return false;
      const me = (this.state.membersByCommunity()[cid] ?? []).find((m) => m.user?.id === uid);
      return me ? ["owner", "admin", "moderator"].includes(me.role) : false;
    });
  }
  openManage() {
    this.state.requestManage();
  }
  static {
    this.\u0275fac = function ChannelListComponent_Factory(t) {
      return new (t || _ChannelListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChannelListComponent, selectors: [["app-channel-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 4, consts: [[1, "header"], [1, "title"], ["class", "gear", "title", "Manage community", 3, "click", 4, "ngIf"], ["class", "section-label", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["title", "Manage community", 1, "gear", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"], [1, "section-label"], [3, "routerLink"], ["class", "hash", 4, "ngIf"], ["class", "hash announce-icon", "width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [1, "name"], ["class", "badge", 4, "ngIf"], [1, "hash"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "hash", "announce-icon"], ["d", "M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"], [1, "badge"]], template: function ChannelListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "span", 1);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, ChannelListComponent_button_3_Template, 4, 0, "button", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, ChannelListComponent_div_4_Template, 2, 0, "div", 3);
        \u0275\u0275elementStart(5, "ul");
        \u0275\u0275template(6, ChannelListComponent_li_6_Template, 7, 10, "li", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate((tmp_0_0 = (tmp_0_0 = ctx.community()) == null ? null : tmp_0_0.name) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "Community");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.canManage());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.channels().length);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.channels());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --hover: #1c1833;\n  --text: #eaeaf2;\n  --mut: #7a7a92;\n  --dim: #4c4c63;\n  --line: rgba(255,255,255,0.06);\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.header[_ngcontent-%COMP%] {\n  padding: 1.1rem 1.1rem 0.9rem;\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  border-bottom: 1px solid rgba(124, 58, 237, 0.18);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  flex-shrink: 0;\n  background: rgba(124, 58, 237, 0.05);\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.25;\n  color: var(--text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.gear[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--mut);\n  font-size: 1rem;\n  line-height: 1;\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  transition:\n    color 0.16s ease,\n    background 0.16s ease,\n    transform 0.22s ease;\n}\n.gear[_ngcontent-%COMP%]:hover {\n  color: var(--accent-s);\n  background: var(--hover);\n  transform: rotate(60deg);\n}\n.section-label[_ngcontent-%COMP%] {\n  padding: 0.85rem 1.25rem 0.35rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.63rem;\n  text-transform: uppercase;\n  letter-spacing: 0.14em;\n  color: var(--dim);\n}\nul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0 0.55rem 0.8rem;\n  margin: 0;\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n}\nli[_ngcontent-%COMP%] {\n  margin: 0 0 2px;\n}\na[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.48rem 0.75rem;\n  border-radius: 8px;\n  color: var(--mut);\n  text-decoration: none;\n  position: relative;\n  border-left: 2px solid transparent;\n  transition:\n    background 0.13s ease,\n    color 0.13s ease,\n    border-color 0.13s ease;\n}\na[_ngcontent-%COMP%]:hover {\n  background: var(--hover);\n  color: var(--text);\n}\na.active[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, 0.15);\n  color: var(--text);\n  border-left-color: var(--accent);\n  box-shadow: inset 0 0 30px rgba(124, 58, 237, 0.12), inset 4px 0 16px rgba(124, 58, 237, 0.15);\n}\na.active[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\na.active[_ngcontent-%COMP%]   .hash[_ngcontent-%COMP%] {\n  color: var(--accent-s);\n  opacity: 1;\n}\n.hash[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.88rem;\n  flex-shrink: 0;\n}\n.announce-icon[_ngcontent-%COMP%] {\n  display: block;\n  flex-shrink: 0;\n}\n.name[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.86rem;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n@keyframes _ngcontent-%COMP%_badgePulse {\n  0%, 100% {\n    box-shadow: 0 0 8px rgba(124, 58, 237, .5);\n    transform: scale(1);\n  }\n  50% {\n    box-shadow: 0 0 16px rgba(124, 58, 237, .8);\n    transform: scale(1.1);\n  }\n}\n.badge[_ngcontent-%COMP%] {\n  margin-inline-start: auto;\n  background: var(--accent);\n  color: #fff;\n  font-size: 0.65rem;\n  padding: 0.05rem 0.42rem;\n  border-radius: 999px;\n  font-weight: 700;\n  flex-shrink: 0;\n  animation: _ngcontent-%COMP%_badgePulse 2s ease-in-out infinite;\n}\n/*# sourceMappingURL=channel-list.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChannelListComponent, { className: "ChannelListComponent", filePath: "src\\app\\features\\community\\components\\channel-list\\channel-list.component.ts", lineNumber: 118 });
})();

// src/app/features/community/pages/community-shell/community-shell.component.ts
function CommunityShellComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-channel-list", 2);
  }
}
var CommunityShellComponent = class _CommunityShellComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.reverb = inject(ReverbConnectionService);
    this.router = inject(Router);
    this.isHome = signal(false);
    const computeHome = () => this.isHome.set(this.router.url.split("?")[0].split("#")[0] === "/community/home");
    computeHome();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(computeHome);
    effect(() => {
      const community = this.state.activeCommunity();
      const channelId = this.state.activeChannelId();
      if (!community?.slug || !channelId)
        return;
      untracked(() => {
        const url = this.router.url.split("?")[0].split("#")[0];
        const isAtRoot = url === "/community" || url === "/community/";
        if (isAtRoot) {
          this.router.navigate(["/community", community.slug, "channel", channelId], { replaceUrl: true });
        }
      });
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.state.loadCommunities();
      yield this.reverb.init();
    });
  }
  ngOnDestroy() {
    this.reverb.disconnect();
  }
  static {
    this.\u0275fac = function CommunityShellComponent_Factory(t) {
      return new (t || _CommunityShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommunityShellComponent, selectors: [["app-community-shell"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 3, consts: [[1, "community-shell"], [1, "server-sidebar"], [1, "channel-list"], [1, "channel-content"], ["aria-hidden", "true", 1, "shell-bg"], [1, "shell-orb", "o1"], [1, "shell-orb", "o2"], [1, "shell-orb", "o3"], [1, "shell-grid"]], template: function CommunityShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-server-sidebar", 1);
        \u0275\u0275template(2, CommunityShellComponent_Conditional_2_Template, 1, 0, "app-channel-list", 2);
        \u0275\u0275elementStart(3, "main", 3)(4, "div", 4);
        \u0275\u0275element(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "router-outlet");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("shell--home", ctx.isHome());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(2, !ctx.isHome() ? 2 : -1);
      }
    }, dependencies: [CommonModule, RouterOutlet, ServerSidebarComponent, ChannelListComponent], styles: ['\n\n[_nghost-%COMP%] {\n  --v-bg: #0b0a14;\n  --v-rail: #0e0c1a;\n  --v-panel: #110f1e;\n  --v-surface: #161228;\n  --v-raised: #1c1833;\n  --v-line: rgba(124,58,237,0.14);\n  --v-line-2: rgba(255,255,255,0.06);\n  --v-accent: #7c3aed;\n  --v-accent-s: #a78bfa;\n  --v-accent-g: rgba(124,58,237,0.32);\n  --v-cta: #22c55e;\n  --v-gold: #d4af37;\n  --v-text: #eaeaf2;\n  --v-mut: #7a7a92;\n  --v-dim: #4c4c63;\n  --v-display:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  --v-mono:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  --v-body:\n    "Archivo",\n    system-ui,\n    sans-serif;\n}\n.community-shell[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 76px 248px 1fr;\n  height: calc(100vh - 64px);\n  background: var(--v-bg);\n  color: var(--v-text);\n  font-family: var(--v-body);\n  position: relative;\n}\n.community-shell.shell--home[_ngcontent-%COMP%] {\n  grid-template-columns: 76px 1fr;\n}\n.server-sidebar[_ngcontent-%COMP%] {\n  background: var(--v-rail);\n  position: relative;\n  box-shadow: inset -1px 0 0 var(--v-line-2);\n}\n.server-sidebar[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 3px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--v-accent) 0%,\n      var(--v-accent-s) 50%,\n      transparent 100%);\n  opacity: 0.9;\n}\n.channel-list[_ngcontent-%COMP%] {\n  background: var(--v-panel);\n  box-shadow: inset -1px 0 0 var(--v-line-2);\n}\n.channel-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: var(--v-bg);\n  position: relative;\n}\n.shell-bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  overflow: hidden;\n}\n.shell-grid[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(124, 58, 237, .06) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      rgba(124, 58, 237, .06) 1px,\n      transparent 1px);\n  background-size: 60px 60px;\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 70% 60% at 60% 40%,\n      #000 20%,\n      transparent 75%);\n  mask-image:\n    radial-gradient(\n      ellipse 70% 60% at 60% 40%,\n      #000 20%,\n      transparent 75%);\n  animation: _ngcontent-%COMP%_shellGridPan 20s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_shellGridPan {\n  from {\n    background-position: 0 0;\n  }\n  to {\n    background-position: 60px 60px;\n  }\n}\n.shell-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  pointer-events: none;\n}\n.shell-orb.o1[_ngcontent-%COMP%] {\n  width: 600px;\n  height: 600px;\n  top: -200px;\n  right: -100px;\n  background:\n    radial-gradient(\n      circle,\n      rgba(124, 58, 237, .18) 0%,\n      transparent 65%);\n  animation: _ngcontent-%COMP%_shellFloat1 22s ease-in-out infinite;\n}\n.shell-orb.o2[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  bottom: -100px;\n  left: 20%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(167, 139, 250, .12) 0%,\n      transparent 65%);\n  animation: _ngcontent-%COMP%_shellFloat2 28s ease-in-out infinite;\n}\n.shell-orb.o3[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  top: 40%;\n  right: 30%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(212, 175, 55, .08) 0%,\n      transparent 65%);\n  animation: _ngcontent-%COMP%_shellFloat3 18s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_shellFloat1 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(-60px, 80px);\n  }\n}\n@keyframes _ngcontent-%COMP%_shellFloat2 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  50% {\n    transform: translate(80px, -60px);\n  }\n}\n@keyframes _ngcontent-%COMP%_shellFloat3 {\n  0%, 100% {\n    transform: translate(0, 0);\n  }\n  33% {\n    transform: translate(-40px, 50px);\n  }\n  66% {\n    transform: translate(50px, -30px);\n  }\n}\n.channel-content[_ngcontent-%COMP%]    > router-outlet[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 768px) {\n  .community-shell[_ngcontent-%COMP%] {\n    grid-template-columns: 60px 1fr;\n  }\n  .channel-list[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=community-shell.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommunityShellComponent, { className: "CommunityShellComponent", filePath: "src\\app\\features\\community\\pages\\community-shell\\community-shell.component.ts", lineNumber: 152 });
})();
export {
  CommunityShellComponent
};
//# sourceMappingURL=chunk-AUK5OJBK.js.map
