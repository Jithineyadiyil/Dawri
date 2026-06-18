import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import {
  ApiService
} from "./chunk-XKV56PBS.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  catchError,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/notifications/notifications.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function NotificationsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markAllRead());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2713 Mark all as read (", ctx_r1.unreadCount(), ") ");
  }
}
function NotificationsComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function NotificationsComponent_For_10_Template_button_click_0_listener() {
      const tab_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeFilter.set(tab_r4.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("notif-tab--active", ctx_r1.activeFilter() === tab_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r4.label, " ");
  }
}
function NotificationsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11);
    \u0275\u0275text(2, "\u{1F514}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No notifications here");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "{{ activeFilter() === 'unread' ? 'You're all caught up!' : 'Nothing to show yet.' }}");
    \u0275\u0275elementEnd()();
  }
}
function NotificationsComponent_Conditional_13_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 25);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_13_For_2_Conditional_12_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const n_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.markRead(n_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", n_r7.data.action_url);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", n_r7.data.action_label || "View", " \u2192 ");
  }
}
function NotificationsComponent_Conditional_13_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_13_For_2_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const n_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.markRead(n_r7));
    });
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "div", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 20)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, NotificationsComponent_Conditional_13_For_2_Conditional_12_Template, 2, 2, "a", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 22);
    \u0275\u0275template(14, NotificationsComponent_Conditional_13_For_2_Conditional_14_Template, 2, 0, "button", 23);
    \u0275\u0275elementStart(15, "button", 24);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_13_For_2_Template_button_click_15_listener() {
      const n_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteNotif(n_r7));
    });
    \u0275\u0275text(16, "\u2715");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const n_r7 = ctx.$implicit;
    \u0275\u0275classProp("notif-row--unread", !n_r7.read_at)("notif-row--urgent", n_r7.data.urgent);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r7.data.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(n_r7.data.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r7.data.body);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 10, n_r7.created_at, "EEEE d MMMM \xB7 HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(12, n_r7.data.action_url ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(14, !n_r7.read_at ? 14 : -1);
  }
}
function NotificationsComponent_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "button", 27);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_13_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadMore());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loadingMore());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingMore() ? "Loading\u2026" : "Load more notifications", " ");
  }
}
function NotificationsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, NotificationsComponent_Conditional_13_For_2_Template, 17, 13, "div", 13, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, NotificationsComponent_Conditional_13_Conditional_3_Template, 3, 2, "div", 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filtered());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, ctx_r1.hasMore() ? 3 : -1);
  }
}
var NotificationsComponent = class _NotificationsComponent {
  constructor() {
    this.api = inject(ApiService);
    this.auth = inject(AuthService);
    this.loading = signal(true);
    this.loadingMore = signal(false);
    this.notifications = signal([]);
    this.unreadCount = signal(0);
    this.hasMore = signal(false);
    this.activeFilter = signal("all");
    this.tabs = [
      { label: "All", value: "all" },
      { label: "Unread", value: "unread" },
      { label: "Urgent", value: "urgent" }
    ];
    this.filtered = () => {
      const f = this.activeFilter();
      return this.notifications().filter((n) => {
        if (f === "unread")
          return !n.read_at;
        if (f === "urgent")
          return n.data.urgent;
        return true;
      });
    };
    this.page = 1;
  }
  ngOnInit() {
    if (!this.auth.isLoggedIn())
      return;
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
  static {
    this.\u0275fac = function NotificationsComponent_Factory(t) {
      return new (t || _NotificationsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsComponent, selectors: [["app-notifications"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 2, consts: [[1, "notif-page"], [1, "notif-page__head"], [1, "eyebrow"], [1, "page-title"], [1, "btn-mark-all"], [1, "notif-tabs"], [1, "notif-tab", 3, "notif-tab--active"], [1, "notif-loading"], [1, "btn-mark-all", 3, "click"], [1, "notif-tab", 3, "click"], [1, "notif-empty-pg"], [1, "notif-empty-pg__icon"], [1, "notif-list-pg"], [1, "notif-row", 3, "notif-row--unread", "notif-row--urgent"], [2, "text-align", "center", "padding", "20px"], [1, "notif-row"], [1, "notif-row__icon"], [1, "notif-row__body"], [1, "notif-row__title"], [1, "notif-row__text"], [1, "notif-row__meta"], [1, "notif-row__link", 3, "routerLink"], [1, "notif-row__actions"], ["title", "Mark read", 1, "nr-btn", "nr-btn--read"], ["title", "Delete", 1, "nr-btn", "nr-btn--del", 3, "click"], [1, "notif-row__link", 3, "click", "routerLink"], ["title", "Mark read", 1, "nr-btn", "nr-btn--read", 3, "click"], [1, "btn-load-more", 3, "click", "disabled"]], template: function NotificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4, "Activity");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6, "Notifications");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, NotificationsComponent_Conditional_7_Template, 2, 1, "button", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 5);
        \u0275\u0275repeaterCreate(9, NotificationsComponent_For_10_Template, 2, 3, "button", 6, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, NotificationsComponent_Conditional_11_Template, 2, 0, "div", 7)(12, NotificationsComponent_Conditional_12_Template, 7, 0)(13, NotificationsComponent_Conditional_13_Template, 4, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(7, ctx.unreadCount() > 0 ? 7 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.tabs);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(11, ctx.loading() ? 11 : ctx.filtered().length === 0 ? 12 : 13);
      }
    }, dependencies: [CommonModule, DatePipe, RouterLink], styles: ["\n\n.notif-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: 32px 24px;\n}\n.notif-page__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--mono);\n  font-size: 10px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--accent, #f0a500);\n  margin-bottom: 4px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-family: var(--display);\n  font-size: 36px;\n  margin: 0;\n  color: #fff;\n}\n.btn-mark-all[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  background: rgba(240, 165, 0, .1);\n  border: 1px solid rgba(240, 165, 0, .3);\n  border-radius: 8px;\n  color: var(--accent, #f0a500);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all .15s;\n  &:hover {\n    background: rgba(240, 165, 0, .2);\n  }\n}\n.notif-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 20px;\n  padding: 4px;\n  background: rgba(255, 255, 255, .04);\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 10px;\n  width: fit-content;\n}\n.notif-tab[_ngcontent-%COMP%] {\n  padding: 7px 16px;\n  font-size: 12px;\n  font-family: var(--mono);\n  letter-spacing: .5px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  border-radius: 7px;\n  cursor: pointer;\n  transition: all .15s;\n}\n.notif-tab--active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .1);\n  color: #fff;\n  font-weight: 700;\n}\n.notif-tab[_ngcontent-%COMP%]:hover:not(.notif-tab--active) {\n  color: #d1d5db;\n}\n.notif-loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #6b7280;\n}\n.notif-empty-pg[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #6b7280;\n}\n.notif-empty-pg__icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: .4;\n  margin-bottom: 12px;\n}\n.notif-empty-pg[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #9ca3af;\n  margin: 0 0 8px;\n}\n.notif-empty-pg[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n.notif-list-pg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.notif-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 48px 1fr auto;\n  gap: 14px;\n  padding: 16px;\n  background: rgba(255, 255, 255, .03);\n  border: 1px solid rgba(255, 255, 255, .07);\n  border-radius: 12px;\n  transition: border-color .15s;\n}\n.notif-row[_ngcontent-%COMP%]:hover {\n  border-color: rgba(255, 255, 255, .14);\n}\n.notif-row--unread[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, .05);\n  border-left: 3px solid var(--accent, #f0a500);\n}\n.notif-row--urgent[_ngcontent-%COMP%] {\n  border-left: 3px solid #ef4444 !important;\n  background: rgba(239, 68, 68, .04);\n}\n.notif-row__icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .07);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.notif-row__body[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.notif-row__title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: #fff;\n  margin-bottom: 4px;\n}\n.notif-row__text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9ca3af;\n  line-height: 1.5;\n  margin-bottom: 8px;\n}\n.notif-row__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 11px;\n  color: #4b5563;\n  font-family: monospace;\n}\n.notif-row__link[_ngcontent-%COMP%] {\n  color: var(--accent, #f0a500);\n  font-weight: 700;\n  text-decoration: none;\n  &:hover {\n    text-decoration: underline;\n  }\n}\n.notif-row__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.nr-btn[_ngcontent-%COMP%] {\n  padding: 5px 10px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, .1);\n  background: transparent;\n  font-size: 12px;\n  cursor: pointer;\n  transition: all .15s;\n}\n.nr-btn--read[_ngcontent-%COMP%] {\n  color: #10b981;\n  border-color: rgba(16, 185, 129, .2);\n}\n.nr-btn--read[_ngcontent-%COMP%]:hover {\n  background: rgba(16, 185, 129, .1);\n}\n.nr-btn--del[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.nr-btn--del[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, .3);\n  background: rgba(239, 68, 68, .08);\n}\n.btn-load-more[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  background: rgba(255, 255, 255, .05);\n  border: 1px solid rgba(255, 255, 255, .12);\n  border-radius: 8px;\n  color: #9ca3af;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all .15s;\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, .1);\n    color: #fff;\n  }\n  &:disabled {\n    opacity: .5;\n    cursor: not-allowed;\n  }\n}\n/*# sourceMappingURL=notifications.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "src\\app\\pages\\notifications\\notifications.component.ts", lineNumber: 184 });
})();
export {
  NotificationsComponent
};
//# sourceMappingURL=chunk-4SWSRT65.js.map
