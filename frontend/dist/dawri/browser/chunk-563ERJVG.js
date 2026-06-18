import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import "./chunk-OERRWE4S.js";
import {
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  HttpClient,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/pages/calendar/calendar.component.ts
var _forTrack0 = ($index, $item) => $item.iso;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.id + ":close";
var _c0 = (a0) => ["/tournaments", a0];
function CalendarComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275text(1, "+ New Tournament");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 24);
    \u0275\u0275text(1, "Browse Tournaments");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14)(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "Matches");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.stats().matches);
  }
}
function CalendarComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25)(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "Open");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.stats().open);
  }
}
function CalendarComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275element(1, "span", 26);
    \u0275\u0275text(2, "My match");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275element(1, "span", 27);
    \u0275\u0275text(2, "Draft");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, "Loading calendar\u2026");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function CalendarComponent_Conditional_50_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "You haven't registered for any tournaments this month.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 31);
    \u0275\u0275text(3, "Browse Tournaments");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_50_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "No tournaments scheduled this month.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 4);
    \u0275\u0275text(3, "Schedule one");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30);
    \u0275\u0275text(2, "\u{1F3C6}");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CalendarComponent_Conditional_50_Conditional_3_Template, 4, 0)(4, CalendarComponent_Conditional_50_Conditional_4_Template, 4, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, ctx_r0.scope() === "player" ? 3 : 4);
  }
}
function CalendarComponent_Conditional_51_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wd_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wd_r2);
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", day_r3.regClosures.length + " registration deadline(s)");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F512}", day_r3.regClosures.length > 1 ? day_r3.regClosures.length : "", " ");
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 42);
  }
  if (rf & 2) {
    const match_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", match_r4.opponent_avatar_url, \u0275\u0275sanitizeUrl)("alt", match_r4.opponent_display_name);
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (match_r4.opponent_display_name || "?").charAt(0).toUpperCase(), " ");
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 38)(1, "span", 41);
    \u0275\u0275template(2, CalendarComponent_Conditional_51_For_4_For_1_For_6_Conditional_2_Template, 1, 2, "img", 42)(3, CalendarComponent_Conditional_51_For_4_For_1_For_6_Conditional_3_Template, 2, 1);
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 44)(7, "span", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_32_0;
    const match_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, match_r4.tournament_id))("title", "Match vs " + match_r4.opponent_display_name + " \xB7 " + ((tmp_32_0 = match_r4.scheduled_at_time) !== null && tmp_32_0 !== void 0 ? tmp_32_0 : "") + " \xB7 " + ((tmp_32_0 = match_r4.tournament_name) !== null && tmp_32_0 !== void 0 ? tmp_32_0 : ""));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, match_r4.opponent_avatar_url ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("vs ", match_r4.opponent_display_name, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(match_r4.scheduled_at_time);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 R", match_r4.round_number, " ");
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "\u{1F3C6}");
    \u0275\u0275elementEnd();
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 47)(1, "span", 43);
    \u0275\u0275template(2, CalendarComponent_Conditional_51_For_4_For_1_For_8_Conditional_2_Template, 2, 0, "span", 48)(3, CalendarComponent_Conditional_51_For_4_For_1_For_8_Conditional_3_Template, 2, 0, "span", 49);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap("chip " + ctx_r0.statusClass(ev_r5) + (ev_r5.is_participant ? " chip--registered" : ""));
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, ev_r5.id))("title", ev_r5.name + " \xB7 " + ev_r5.game_label + " \xB7 " + ev_r5.status_label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, ev_r5.is_participant ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ev_r5.has_prize ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ev_r5.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ev_r5.game_label);
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 40)(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ev_r6 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, ev_r6.id))("title", "Registration closes: " + ev_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F512} ", ev_r6.name, "");
  }
}
function CalendarComponent_Conditional_51_For_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, CalendarComponent_Conditional_51_For_4_For_1_Conditional_4_Template, 2, 2, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, CalendarComponent_Conditional_51_For_4_For_1_For_6_Template, 10, 8, "a", 38, _forTrack1);
    \u0275\u0275repeaterCreate(7, CalendarComponent_Conditional_51_For_4_For_1_For_8_Template, 7, 10, "a", 39, _forTrack1);
    \u0275\u0275repeaterCreate(9, CalendarComponent_Conditional_51_For_4_For_1_For_10_Template, 3, 5, "a", 40, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r3 = ctx.$implicit;
    \u0275\u0275classProp("cal-day--out", !day_r3.inMonth)("cal-day--weekend", day_r3.isWeekend)("cal-day--today", day_r3.isToday);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(day_r3.date.getDate());
    \u0275\u0275advance();
    \u0275\u0275conditional(4, day_r3.regClosures.length ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(day_r3.matches);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(day_r3.starts);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(day_r3.regClosures);
  }
}
function CalendarComponent_Conditional_51_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CalendarComponent_Conditional_51_For_4_For_1_Template, 11, 8, "div", 33, _forTrack0);
  }
  if (rf & 2) {
    const week_r7 = ctx.$implicit;
    \u0275\u0275repeater(week_r7);
  }
}
function CalendarComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275repeaterCreate(1, CalendarComponent_Conditional_51_For_2_Template, 2, 1, "div", 32, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275repeaterCreate(3, CalendarComponent_Conditional_51_For_4_Template, 2, 0, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.weekdays);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.monthGrid());
  }
}
var API = "http://192.168.100.67:8001/api/v1";
var CalendarComponent = class _CalendarComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.auth = inject(AuthService);
    this.viewMonth = signal(this.startOfMonth(/* @__PURE__ */ new Date()));
    this.loading = signal(false);
    this.error = signal(null);
    this.events = signal([]);
    this.matches = signal([]);
    this.scope = signal("organizer");
    this.companyName = signal("");
    this.monthLabel = computed(() => this.viewMonth().toLocaleDateString(void 0, { month: "long", year: "numeric" }));
    this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.monthGrid = computed(() => {
      const first = this.viewMonth();
      const year = first.getFullYear();
      const month = first.getMonth();
      const gridStart = new Date(year, month, 1);
      gridStart.setDate(gridStart.getDate() - gridStart.getDay());
      const todayIso = this.isoDate(/* @__PURE__ */ new Date());
      const evMap = this.eventsByStartDate();
      const closeMap = this.eventsByCloseDate();
      const matchMap = this.matchesByDate();
      const weeks = [];
      const cursor = new Date(gridStart);
      for (let w = 0; w < 6; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const iso = this.isoDate(cursor);
          const dow = cursor.getDay();
          week.push({
            date: new Date(cursor),
            iso,
            inMonth: cursor.getMonth() === month,
            isToday: iso === todayIso,
            isWeekend: dow === 5 || dow === 6,
            // Fri/Sat (GCC weekend)
            starts: evMap.get(iso) ?? [],
            regClosures: closeMap.get(iso) ?? [],
            matches: matchMap.get(iso) ?? []
          });
          cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    });
    this.stats = computed(() => {
      const all = this.events();
      return {
        total: all.length,
        open: all.filter((e) => e.status === "registration" || e.status === "registration_open").length,
        live: all.filter((e) => e.status === "ongoing" || e.status === "in_progress").length,
        completed: all.filter((e) => e.status === "completed").length,
        matches: this.matches().length
      };
    });
    this.pageTitle = computed(() => this.scope() === "player" ? "My Schedule" : "Tournament Calendar");
    this.canCreateTournament = computed(() => this.scope() === "all" || this.scope() === "organizer");
  }
  ngOnInit() {
    this.loadMonth();
  }
  prevMonth() {
    const d = this.viewMonth();
    this.viewMonth.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.loadMonth();
  }
  nextMonth() {
    const d = this.viewMonth();
    this.viewMonth.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.loadMonth();
  }
  goToday() {
    this.viewMonth.set(this.startOfMonth(/* @__PURE__ */ new Date()));
    this.loadMonth();
  }
  loadMonth() {
    const first = this.viewMonth();
    const from = new Date(first);
    from.setDate(from.getDate() - from.getDay());
    const to = new Date(from);
    to.setDate(to.getDate() + 41);
    const params = `?from=${this.isoDate(from)}&to=${this.isoDate(to)}`;
    this.loading.set(true);
    this.error.set(null);
    this.http.get(`${API}/companies/mine/calendar${params}`).subscribe({
      next: (res) => {
        this.events.set(res.data.events ?? []);
        this.matches.set(res.data.matches ?? []);
        this.scope.set(res.data.scope ?? "organizer");
        this.companyName.set(res.data.company_name);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? "Failed to load calendar.");
      }
    });
  }
  matchesByDate() {
    const m = /* @__PURE__ */ new Map();
    for (const match of this.matches()) {
      const d = match.scheduled_at_date;
      if (!d)
        continue;
      const arr = m.get(d) ?? [];
      arr.push(match);
      m.set(d, arr);
    }
    for (const list of m.values()) {
      list.sort((a, b) => (a.scheduled_at_time ?? "").localeCompare(b.scheduled_at_time ?? ""));
    }
    return m;
  }
  eventsByStartDate() {
    const m = /* @__PURE__ */ new Map();
    const first = this.viewMonth();
    const dayOneIso = this.isoDate(first);
    const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0);
    const lastIso = this.isoDate(lastDay);
    const todayIso = this.isoDate(/* @__PURE__ */ new Date());
    const livePin = todayIso >= dayOneIso && todayIso <= lastIso ? todayIso : dayOneIso;
    for (const ev of this.events()) {
      let pinDate = ev.starts_at_date;
      if (ev.is_live) {
        if (!pinDate || pinDate < dayOneIso) {
          pinDate = livePin;
        }
      }
      if (!pinDate)
        continue;
      const arr = m.get(pinDate) ?? [];
      arr.push(ev);
      m.set(pinDate, arr);
    }
    return m;
  }
  eventsByCloseDate() {
    const m = /* @__PURE__ */ new Map();
    for (const ev of this.events()) {
      const d = ev.registration_closes_at_date;
      if (!d || d === ev.starts_at_date)
        continue;
      const arr = m.get(d) ?? [];
      arr.push(ev);
      m.set(d, arr);
    }
    return m;
  }
  startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }
  isoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }
  /** CSS modifier class for an event's status. */
  statusClass(ev) {
    return "chip--" + ev.status.replace(/_/g, "-");
  }
  static {
    this.\u0275fac = function CalendarComponent_Factory(t) {
      return new (t || _CalendarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalendarComponent, selectors: [["app-calendar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 52, vars: 11, consts: [[1, "calendar-page"], [1, "cal-header"], [1, "cal-eyebrow"], [1, "cal-title"], ["routerLink", "/tournaments/create", 1, "btn", "btn--gold", "btn--sm"], [1, "cal-toolbar"], [1, "cal-nav"], ["type", "button", "aria-label", "Previous month", 1, "btn", "btn--ghost", "btn--icon", 3, "click"], [1, "cal-month"], ["type", "button", "aria-label", "Next month", 1, "btn", "btn--ghost", "btn--icon", 3, "click"], ["type", "button", 1, "btn", "btn--cyan", "btn--sm", "cal-today", 3, "click"], [1, "cal-stats"], [1, "stat"], [1, "stat__num"], [1, "stat", "stat--match"], [1, "stat", "stat--live"], [1, "stat", "stat--done"], [1, "cal-legend"], [1, "legend"], [1, "dot", "dot--open"], [1, "dot", "dot--live"], [1, "dot", "dot--done"], [1, "cal-state", "cal-state--loading"], [1, "cal-grid"], ["routerLink", "/tournaments", 1, "btn", "btn--cyan", "btn--sm"], [1, "stat", "stat--open"], [1, "dot", "dot--match"], [1, "dot", "dot--draft"], [1, "cal-state", "cal-state--error"], [1, "cal-state", "cal-state--empty"], [1, "cal-empty__icon"], ["routerLink", "/tournaments", 1, "btn", "btn--gold", "btn--sm"], [1, "cal-dow"], [1, "cal-day", 3, "cal-day--out", "cal-day--weekend", "cal-day--today"], [1, "cal-day"], [1, "cal-day__header"], [1, "cal-day__num"], [1, "cal-day__close-badge", 3, "title"], [1, "chip", "chip--match", 3, "routerLink", "title"], [1, "chip", 3, "routerLink", "class", "title"], [1, "chip", "chip--close", 3, "routerLink", "title"], [1, "chip__match-head"], [1, "chip__match-avatar", 3, "src", "alt"], [1, "chip__name"], [1, "chip__meta"], [1, "chip__time"], [1, "chip__match-avatar", "chip__match-avatar--ph"], [1, "chip", 3, "routerLink", "title"], [1, "chip__tag"], [1, "chip__prize"]], template: function CalendarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "div", 2);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 3);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, CalendarComponent_Conditional_7_Template, 2, 0, "a", 4)(8, CalendarComponent_Conditional_8_Template, 2, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 5)(10, "div", 6)(11, "button", 7);
        \u0275\u0275listener("click", function CalendarComponent_Template_button_click_11_listener() {
          return ctx.prevMonth();
        });
        \u0275\u0275text(12, "\u2039");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 8);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 9);
        \u0275\u0275listener("click", function CalendarComponent_Template_button_click_15_listener() {
          return ctx.nextMonth();
        });
        \u0275\u0275text(16, "\u203A");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 10);
        \u0275\u0275listener("click", function CalendarComponent_Template_button_click_17_listener() {
          return ctx.goToday();
        });
        \u0275\u0275text(18, "Today");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 11)(20, "span", 12)(21, "span", 13);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, "Tournaments");
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, CalendarComponent_Conditional_24_Template, 4, 1, "span", 14)(25, CalendarComponent_Conditional_25_Template, 4, 1);
        \u0275\u0275elementStart(26, "span", 15)(27, "span", 13);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd();
        \u0275\u0275text(29, "Live");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span", 16)(31, "span", 13);
        \u0275\u0275text(32);
        \u0275\u0275elementEnd();
        \u0275\u0275text(33, "Completed");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(34, "div", 17)(35, "span", 18);
        \u0275\u0275element(36, "span", 19);
        \u0275\u0275text(37, "Registration open");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "span", 18);
        \u0275\u0275element(39, "span", 20);
        \u0275\u0275text(40, "Live");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "span", 18);
        \u0275\u0275element(42, "span", 21);
        \u0275\u0275text(43, "Completed");
        \u0275\u0275elementEnd();
        \u0275\u0275template(44, CalendarComponent_Conditional_44_Template, 3, 0, "span", 18)(45, CalendarComponent_Conditional_45_Template, 3, 0);
        \u0275\u0275elementStart(46, "span", 18);
        \u0275\u0275text(47, "\u{1F512} Registration closes");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(48, CalendarComponent_Conditional_48_Template, 2, 0, "div", 22)(49, CalendarComponent_Conditional_49_Template, 2, 1)(50, CalendarComponent_Conditional_50_Template, 5, 1)(51, CalendarComponent_Conditional_51_Template, 5, 0, "div", 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.companyName() || (ctx.scope() === "player" ? "Player" : "My Company"));
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.pageTitle());
        \u0275\u0275advance();
        \u0275\u0275conditional(7, ctx.canCreateTournament() ? 7 : 8);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.monthLabel());
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats().total);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(24, ctx.scope() === "player" ? 24 : 25);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.stats().live);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.stats().completed);
        \u0275\u0275advance(12);
        \u0275\u0275conditional(44, ctx.scope() === "player" ? 44 : 45);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(48, ctx.loading() ? 48 : ctx.error() ? 49 : !ctx.events().length && !ctx.matches().length ? 50 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(51, !ctx.loading() && !ctx.error() ? 51 : -1);
      }
    }, dependencies: [CommonModule, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  --gold: #f0a500;\n  --cyan: #00e5ff;\n  --green: #22c55e;\n  --red: #ef4444;\n  --purple:#a855f7;\n  --bg: #0b1022;\n  --bg2: #12182e;\n  --bg3: #1a2040;\n  --br: #2d3560;\n  --br2: #3d4670;\n  --text: #e4e6f0;\n  --mu: #8a90a8;\n  --fh:\n    "Bebas Neue",\n    "Rajdhani",\n    sans-serif;\n  --fb: "Rajdhani", sans-serif;\n  --fm: "Space Mono", monospace;\n}\n.calendar-page[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 28px 24px 80px;\n  color: var(--text);\n  font-family: var(--fb);\n}\n.cal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.cal-eyebrow[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  color: var(--cyan);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  margin-bottom: 4px;\n}\n.cal-title[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 2.4rem;\n  font-weight: 900;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold) 0%,\n      var(--cyan) 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.cal-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.cal-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.cal-month[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1.5rem;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  color: var(--gold);\n  min-width: 180px;\n  text-align: center;\n  text-transform: uppercase;\n}\n.cal-today[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.cal-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.stat[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  border-radius: 6px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: var(--mu);\n}\n.stat__num[_ngcontent-%COMP%] {\n  font-family: var(--fh);\n  font-size: 1rem;\n  color: var(--text);\n  letter-spacing: 0;\n}\n.stat--open[_ngcontent-%COMP%]   .stat__num[_ngcontent-%COMP%] {\n  color: var(--green);\n}\n.stat--live[_ngcontent-%COMP%]   .stat__num[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n.stat--done[_ngcontent-%COMP%]   .stat__num[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.stat--match[_ngcontent-%COMP%]   .stat__num[_ngcontent-%COMP%] {\n  color: var(--cyan);\n}\n.cal-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 14px;\n  padding: 10px 14px;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 8px;\n  margin-bottom: 14px;\n  font-size: 0.78rem;\n  color: var(--mu);\n}\n.legend[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.dot--open[_ngcontent-%COMP%] {\n  background: var(--green);\n}\n.dot--live[_ngcontent-%COMP%] {\n  background: var(--red);\n  box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);\n}\n.dot--done[_ngcontent-%COMP%] {\n  background: var(--gold);\n}\n.dot--draft[_ngcontent-%COMP%] {\n  background: var(--mu);\n}\n.dot--match[_ngcontent-%COMP%] {\n  background: var(--cyan);\n  box-shadow: 0 0 6px rgba(0, 229, 255, 0.5);\n}\n.cal-state[_ngcontent-%COMP%] {\n  padding: 40px 20px;\n  text-align: center;\n  background: var(--bg2);\n  border: 1px solid var(--br);\n  border-radius: 12px;\n  color: var(--mu);\n}\n.cal-state--error[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.3);\n  background: rgba(239, 68, 68, 0.06);\n  color: #fca5a5;\n}\n.cal-state--empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n}\n.cal-empty__icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n.cal-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, minmax(0, 1fr));\n  gap: 2px;\n  background: var(--br);\n  border: 1px solid var(--br);\n  border-radius: 10px;\n  overflow: hidden;\n}\n.cal-dow[_ngcontent-%COMP%] {\n  background: var(--bg3);\n  padding: 10px 8px;\n  text-align: center;\n  font-family: var(--fm);\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  color: var(--cyan);\n  text-transform: uppercase;\n}\n.cal-day[_ngcontent-%COMP%] {\n  background: var(--bg2);\n  min-height: 120px;\n  padding: 6px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  position: relative;\n}\n.cal-day--out[_ngcontent-%COMP%] {\n  background: rgba(11, 16, 34, 0.5);\n}\n.cal-day--out[_ngcontent-%COMP%]   .cal-day__num[_ngcontent-%COMP%] {\n  color: #495063;\n}\n.cal-day--weekend[_ngcontent-%COMP%]   .cal-day__num[_ngcontent-%COMP%] {\n  color: rgba(240, 165, 0, 0.7);\n}\n.cal-day--today[_ngcontent-%COMP%] {\n  background: rgba(0, 229, 255, 0.06);\n  box-shadow: inset 0 0 0 2px rgba(0, 229, 255, 0.4);\n}\n.cal-day--today[_ngcontent-%COMP%]   .cal-day__num[_ngcontent-%COMP%] {\n  background: var(--cyan);\n  color: #060810;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--fh);\n}\n.cal-day__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.cal-day__num[_ngcontent-%COMP%] {\n  font-family: var(--fb);\n  font-weight: 700;\n  font-size: 0.9rem;\n  color: var(--text);\n}\n.cal-day__close-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--gold);\n  background: rgba(240, 165, 0, 0.12);\n  border: 1px solid rgba(240, 165, 0, 0.3);\n  border-radius: 4px;\n  padding: 1px 5px;\n}\n.chip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  padding: 4px 6px;\n  border-radius: 4px;\n  background: var(--bg3);\n  border-left: 3px solid var(--mu);\n  color: var(--text);\n  text-decoration: none;\n  overflow: hidden;\n  font-size: 0.72rem;\n  line-height: 1.2;\n  cursor: pointer;\n  transition: transform 0.1s, box-shadow 0.15s;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  background: var(--br);\n}\n.chip__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.chip__meta[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-size: 0.65rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.chip__prize[_ngcontent-%COMP%] {\n  margin-right: 2px;\n}\n.chip--registration[_ngcontent-%COMP%], .chip--registration-open[_ngcontent-%COMP%] {\n  border-left-color: var(--green);\n  background: rgba(34, 197, 94, 0.1);\n}\n.chip--registration[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%], .chip--registration-open[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%] {\n  color: #86efac;\n}\n.chip--ongoing[_ngcontent-%COMP%], .chip--in-progress[_ngcontent-%COMP%] {\n  border-left-color: var(--red);\n  background: rgba(239, 68, 68, 0.1);\n  animation: _ngcontent-%COMP%_chip-pulse 1.8s ease-in-out infinite;\n}\n.chip--ongoing[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%], .chip--in-progress[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%] {\n  color: #fca5a5;\n}\n.chip--completed[_ngcontent-%COMP%] {\n  border-left-color: var(--gold);\n  background: rgba(240, 165, 0, 0.08);\n}\n.chip--completed[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.chip--draft[_ngcontent-%COMP%] {\n  border-left-color: var(--mu);\n  opacity: 0.7;\n}\n.chip--draft[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%] {\n  color: var(--mu);\n  font-style: italic;\n}\n.chip--close[_ngcontent-%COMP%] {\n  background: rgba(240, 165, 0, 0.05);\n  border-left-color: var(--gold);\n  opacity: 0.75;\n}\n.chip--close[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%] {\n  color: var(--gold);\n  font-size: 0.7rem;\n}\n.chip--match[_ngcontent-%COMP%] {\n  background: rgba(0, 229, 255, 0.1);\n  border-left-color: var(--cyan);\n}\n.chip--match[_ngcontent-%COMP%]   .chip__name[_ngcontent-%COMP%] {\n  color: #a7f3ff;\n}\n.chip--match[_ngcontent-%COMP%]   .chip__time[_ngcontent-%COMP%] {\n  font-family: var(--fm);\n  color: var(--cyan);\n  font-weight: 700;\n}\n.chip--registered[_ngcontent-%COMP%] {\n  box-shadow: inset 3px 0 0 var(--cyan), 0 0 0 1px rgba(0, 229, 255, 0.25);\n}\n.chip__tag[_ngcontent-%COMP%] {\n  color: var(--cyan);\n  margin-right: 2px;\n}\n.chip__match-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  min-width: 0;\n}\n.chip__match-avatar[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n  background: var(--bg);\n}\n.chip__match-avatar--ph[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--gold),\n      rgba(240, 165, 0, 0.6));\n  color: #1a1208;\n  font-family: var(--fh);\n  font-size: 0.6rem;\n  font-weight: 900;\n}\n@keyframes _ngcontent-%COMP%_chip-pulse {\n  0%, 100% {\n    box-shadow: inset 3px 0 0 var(--red);\n  }\n  50% {\n    box-shadow: inset 3px 0 0 var(--red), 0 0 8px rgba(239, 68, 68, 0.25);\n  }\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 9px 16px;\n  border-radius: 6px;\n  border: none;\n  font-family: var(--fh);\n  font-weight: 900;\n  letter-spacing: 1.5px;\n  font-size: 0.82rem;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.2s;\n  text-decoration: none;\n}\n.btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  transform: translateY(-1px);\n}\n.btn--gold[_ngcontent-%COMP%] {\n  background: var(--gold);\n  color: #1a1208;\n}\n.btn--cyan[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--cyan);\n  border: 1px solid var(--cyan);\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text);\n  border: 1px solid var(--br);\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  font-size: 0.75rem;\n}\n.btn--icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  padding: 0;\n  font-family: var(--fh);\n  font-size: 1.5rem;\n  line-height: 1;\n}\n@media (max-width: 720px) {\n  .cal-day[_ngcontent-%COMP%] {\n    min-height: 80px;\n    padding: 4px;\n  }\n  .cal-day__num[_ngcontent-%COMP%] {\n    font-size: 0.78rem;\n  }\n  .chip[_ngcontent-%COMP%] {\n    padding: 3px 4px;\n    font-size: 0.68rem;\n  }\n  .chip__meta[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .cal-month[_ngcontent-%COMP%] {\n    min-width: 120px;\n    font-size: 1.1rem;\n  }\n}\n@media (max-width: 480px) {\n  .cal-legend[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n    gap: 8px;\n  }\n  .cal-day[_ngcontent-%COMP%] {\n    min-height: 70px;\n  }\n}\n/*# sourceMappingURL=calendar.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalendarComponent, { className: "CalendarComponent", filePath: "src\\app\\pages\\calendar\\calendar.component.ts", lineNumber: 95 });
})();
export {
  CalendarComponent
};
//# sourceMappingURL=chunk-563ERJVG.js.map
