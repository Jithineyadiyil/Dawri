import {
  ApiService
} from "./chunk-XKV56PBS.js";
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/admin/admin-streams.component.ts
function AdminStreamsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function AdminStreamsComponent_Conditional_37_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275element(2, "span", 24);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "span", 26);
    \u0275\u0275text(6, "Stream Key:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "code", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 28)(10, "a", 29);
    \u0275\u0275text(11, " Watch on YouTube \u2197 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 30)(13, "button", 31);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_37_Conditional_9_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.refreshStatus());
    });
    \u0275\u0275text(14, "Refresh Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 32);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_37_Conditional_9_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.endStream());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("dot--live", ctx_r0.streamStatus() === "live");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.streamStatus() === "live" ? "LIVE NOW" : ctx_r0.streamStatus() === "ended" ? "Ended" : "Stream Ready", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.tournament().youtube_stream_key);
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r0.tournament().youtube_stream_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.ending());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.ending() ? "Ending\u2026" : "End Broadcast", " ");
  }
}
function AdminStreamsComponent_Conditional_37_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "p");
    \u0275\u0275text(2, "No YouTube stream configured for this tournament.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 34)(4, "div", 35);
    \u0275\u0275text(5, "Option A \u2014 Auto-create via YouTube API");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 36);
    \u0275\u0275text(7, "Requires YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN in .env");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 13);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_37_Conditional_10_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.createStream());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 37)(11, "div", 35);
    \u0275\u0275text(12, "Option B \u2014 Manual URL (use while setting up YouTube API)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 36);
    \u0275\u0275text(14, "Start a YouTube Live stream manually, paste the watch URL here");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 38)(16, "input", 39);
    \u0275\u0275listener("input", function AdminStreamsComponent_Conditional_37_Conditional_10_Template_input_input_16_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.manualUrl.set($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 40);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_37_Conditional_10_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveManualUrl());
    });
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 41);
    \u0275\u0275text(20, " Tip: To get a YouTube URL, go to studio.youtube.com \u2192 Go Live \u2192 copy the share link ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r0.creating());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.creating() ? "Creating on YouTube\u2026" : "Create YouTube Live Event", " ");
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r0.manualUrl());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.savingManual() || !ctx_r0.manualUrl());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.manualSaved() ? "Saved!" : ctx_r0.savingManual() ? "Saving\u2026" : "Save URL", " ");
  }
}
function AdminStreamsComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 18)(2, "div", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, AdminStreamsComponent_Conditional_37_Conditional_9_Template, 17, 7, "div", 22)(10, AdminStreamsComponent_Conditional_37_Conditional_10_Template, 21, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.tournament().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r0.tournament().game_label, " \xB7 ", ctx_r0.tournament().format_label, " \xB7 ", \u0275\u0275pipeBind2(6, 6, ctx_r0.tournament().starts_at, "d MMM yyyy HH:mm"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("ID: ", ctx_r0.tournament().id, "");
    \u0275\u0275advance();
    \u0275\u0275conditional(9, ctx_r0.tournament().youtube_broadcast_id ? 9 : 10);
  }
}
function AdminStreamsComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 42);
    \u0275\u0275text(2, "YouTube Live Event Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43)(4, "div", 44)(5, "label");
    \u0275\u0275text(6, "Stream Key (give to organizer)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 45)(8, "code");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 46);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_38_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.copyText(ctx_r0.newStream().stream_key));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 44)(13, "label");
    \u0275\u0275text(14, "RTMP URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "code");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 44)(18, "label");
    \u0275\u0275text(19, "Watch URL (embed on tournament page)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "code");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 47)(23, "h4");
    \u0275\u0275text(24, "Send this to the organizer:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 48)(26, "p")(27, "strong");
    \u0275\u0275text(28, "PS5 Setup:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "ol")(30, "li");
    \u0275\u0275text(31, "PS5 \u2192 Settings \u2192 Captures and Broadcasts \u2192 Broadcast \u2192 Custom RTMP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "li");
    \u0275\u0275text(33, "RTMP URL: ");
    \u0275\u0275elementStart(34, "code");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "li");
    \u0275\u0275text(37, "Stream Key: ");
    \u0275\u0275elementStart(38, "code");
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "li");
    \u0275\u0275text(41, "Press Start Broadcasting when the match begins");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "p")(43, "strong");
    \u0275\u0275text(44, "OBS Setup:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "ol")(46, "li");
    \u0275\u0275text(47, "OBS \u2192 Settings \u2192 Stream \u2192 Service: Custom\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "li");
    \u0275\u0275text(49, "Server: ");
    \u0275\u0275elementStart(50, "code");
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "li");
    \u0275\u0275text(53, "Stream Key: ");
    \u0275\u0275elementStart(54, "code");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.newStream().stream_key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.copied() ? "Copied" : "Copy");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.newStream().rtmp_url);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.newStream().watch_url);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r0.newStream().rtmp_url);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.newStream().stream_key);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.newStream().rtmp_url);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.newStream().stream_key);
  }
}
function AdminStreamsComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "button", 31);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_39_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmNo());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 50);
    \u0275\u0275listener("click", function AdminStreamsComponent_Conditional_39_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmYes());
    });
    \u0275\u0275text(7, "Confirm");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.confirmMsg());
  }
}
var AdminStreamsComponent = class _AdminStreamsComponent {
  constructor() {
    this.api = inject(ApiService);
    this.searchQuery = signal("");
    this.looking = signal(false);
    this.creating = signal(false);
    this.ending = signal(false);
    this.copied = signal(false);
    this.error = signal(null);
    this.tournament = signal(null);
    this.newStream = signal(null);
    this.streamStatus = signal("pending");
    this.manualUrl = signal("");
    this.savingManual = signal(false);
    this.manualSaved = signal(false);
    this.confirmMsg = signal(null);
    this.confirmCallback = null;
  }
  confirmYes() {
    this.confirmCallback?.();
    this.confirmMsg.set(null);
    this.confirmCallback = null;
  }
  confirmNo() {
    this.confirmMsg.set(null);
    this.confirmCallback = null;
  }
  ask(msg, cb) {
    this.confirmMsg.set(msg);
    this.confirmCallback = cb;
  }
  ngOnInit() {
  }
  lookupTournament() {
    const id = this.searchQuery().trim();
    if (!id)
      return;
    this.looking.set(true);
    this.error.set(null);
    this.tournament.set(null);
    this.newStream.set(null);
    this.api.getTournament(id).pipe(catchError((err) => {
      this.error.set(err?.error?.message ?? "Tournament not found. Check the ID.");
      this.looking.set(false);
      return of(null);
    })).subscribe((r) => {
      if (r) {
        this.tournament.set(r.data ?? r);
        this.streamStatus.set(r?.data?.youtube_stream_status ?? r?.youtube_stream_status ?? "pending");
      }
      this.looking.set(false);
    });
  }
  createStream() {
    const t = this.tournament();
    if (!t)
      return;
    this.creating.set(true);
    this.error.set(null);
    this.api.createYouTubeStream(t.id, t.name + " \u2014 Dawri Esports").pipe(catchError((err) => {
      this.error.set(err?.error?.message ?? "Failed to create YouTube stream. Check YOUTUBE_* env variables.");
      this.creating.set(false);
      return of(null);
    })).subscribe((r) => {
      if (r) {
        const broadcast = r.data ?? r;
        this.newStream.set({
          broadcast_id: broadcast.id,
          stream_key: broadcast.stream_key ?? "(key revealed after credentials endpoint)",
          watch_url: broadcast.watch_url,
          rtmp_url: broadcast.rtmp_url ?? "rtmp://a.rtmp.youtube.com/live2"
        });
        this.tournament.update((t2) => __spreadProps(__spreadValues({}, t2), {
          youtube_broadcast_id: broadcast.id,
          youtube_stream_url: broadcast.watch_url
        }));
        this.creating.set(false);
      }
    });
  }
  refreshStatus() {
    const t = this.tournament();
    const broadcastId = t?.youtube_broadcast_id;
    if (!t || !broadcastId)
      return;
    this.api.getYouTubeStreamStatus(broadcastId).pipe(catchError(() => of(null))).subscribe((r) => {
      if (r)
        this.streamStatus.set(r.data?.status ?? r.status ?? "pending");
    });
  }
  endStream() {
    const t = this.tournament();
    if (!t)
      return;
    this.ask("End this YouTube broadcast?", () => {
      this.ending.set(true);
      const broadcastId = t?.youtube_broadcast_id;
      if (!broadcastId) {
        this.ending.set(false);
        return;
      }
      this.api.endYouTubeStream(broadcastId).pipe(catchError(() => of(null))).subscribe(() => {
        this.ending.set(false);
        this.streamStatus.set("ended");
      });
    });
  }
  saveManualUrl() {
    const t = this.tournament();
    const url = this.manualUrl().trim();
    if (!t || !url)
      return;
    if (!url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("twitch.tv")) {
      this.error.set("Please enter a valid YouTube or Twitch URL.");
      return;
    }
    this.savingManual.set(true);
    this.error.set(null);
    this.api.updateTournamentStream(t.id, url).pipe(catchError((err) => {
      this.error.set(err?.error?.message ?? "Failed to save stream URL.");
      this.savingManual.set(false);
      return of(null);
    })).subscribe((r) => {
      if (r) {
        this.savingManual.set(false);
        this.manualSaved.set(true);
        this.tournament.update((t2) => __spreadProps(__spreadValues({}, t2), { youtube_stream_url: url, youtube_stream_status: "pending" }));
        setTimeout(() => this.manualSaved.set(false), 3e3);
      }
    });
  }
  copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2e3);
    });
  }
  static {
    this.\u0275fac = function AdminStreamsComponent_Factory(t) {
      return new (t || _AdminStreamsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminStreamsComponent, selectors: [["app-admin-streams"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 40, vars: 7, consts: [[1, "streams-page"], [1, "streams-header"], [1, "streams-title"], [1, "streams-sub"], [1, "setup-reminder"], [1, "setup-reminder__icon"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"], [1, "setup-reminder__title"], [1, "setup-reminder__text"], [1, "stream-search"], ["placeholder", "Enter tournament ID or paste from /tournaments page\u2026", 1, "search-input", 3, "input", "value"], [1, "btn-primary", 3, "click", "disabled"], [1, "alert", "alert--error"], [1, "tournament-card"], [1, "new-stream-result"], [1, "confirm-bar"], [1, "tc-info"], [1, "tc-name"], [1, "tc-meta"], [1, "tc-id"], [1, "tc-stream"], [1, "stream-exists-badge"], [1, "dot"], [1, "tc-stream-key"], [1, "key-label"], [1, "key-val"], [1, "tc-stream-url"], ["target", "_blank", "rel", "noopener", 1, "watch-link", 3, "href"], [1, "tc-actions"], [1, "btn-ghost", "btn-sm", 3, "click"], [1, "btn-danger", "btn-sm", 3, "click", "disabled"], [1, "tc-no-stream"], [1, "stream-option"], [1, "stream-option__label"], [1, "stream-option__hint"], [1, "stream-option", "stream-option--manual"], [1, "manual-url-row"], ["placeholder", "https://www.youtube.com/watch?v=\u2026 or https://twitch.tv/channel", 1, "search-input", 3, "input", "value"], [1, "btn-ghost", 3, "click", "disabled"], [1, "manual-url-hint"], [1, "nsr-title"], [1, "nsr-grid"], [1, "nsr-field"], [1, "nsr-key-wrap"], [3, "click"], [1, "nsr-instructions"], [1, "instruction-box"], [1, "confirm-actions"], [1, "btn-danger", "btn-sm", 3, "click"]], template: function AdminStreamsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "YouTube Live Streams");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Create and manage YouTube Live events for tournaments. Each tournament gets its own stream key.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 6);
        \u0275\u0275element(10, "circle", 7)(11, "path", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "div")(13, "div", 9);
        \u0275\u0275text(14, "One-time setup required");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 10);
        \u0275\u0275text(16, " Add to your ");
        \u0275\u0275elementStart(17, "code");
        \u0275\u0275text(18, ".env");
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, ": ");
        \u0275\u0275elementStart(20, "code");
        \u0275\u0275text(21, "YOUTUBE_CLIENT_ID");
        \u0275\u0275elementEnd();
        \u0275\u0275text(22, ", ");
        \u0275\u0275elementStart(23, "code");
        \u0275\u0275text(24, "YOUTUBE_CLIENT_SECRET");
        \u0275\u0275elementEnd();
        \u0275\u0275text(25, ", ");
        \u0275\u0275elementStart(26, "code");
        \u0275\u0275text(27, "YOUTUBE_REFRESH_TOKEN");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " \u2014 see ");
        \u0275\u0275elementStart(29, "code");
        \u0275\u0275text(30, "backend_config_readme.txt");
        \u0275\u0275elementEnd();
        \u0275\u0275text(31, " in the deployment package for instructions. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "div", 11)(33, "input", 12);
        \u0275\u0275listener("input", function AdminStreamsComponent_Template_input_input_33_listener($event) {
          return ctx.searchQuery.set($event.target.value);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 13);
        \u0275\u0275listener("click", function AdminStreamsComponent_Template_button_click_34_listener() {
          return ctx.lookupTournament();
        });
        \u0275\u0275text(35);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(36, AdminStreamsComponent_Conditional_36_Template, 2, 1, "div", 14)(37, AdminStreamsComponent_Conditional_37_Template, 11, 9, "div", 15)(38, AdminStreamsComponent_Conditional_38_Template, 56, 8, "div", 16)(39, AdminStreamsComponent_Conditional_39_Template, 8, 1, "div", 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(33);
        \u0275\u0275property("value", ctx.searchQuery());
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.searchQuery() || ctx.looking());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.looking() ? "Looking up\u2026" : "Look Up Tournament", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(36, ctx.error() ? 36 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(37, ctx.tournament() ? 37 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(38, ctx.newStream() ? 38 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(39, ctx.confirmMsg() ? 39 : -1);
      }
    }, dependencies: [CommonModule, DatePipe], styles: ["\n\n.streams-page[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.streams-page[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  max-width: 860px;\n}\n.streams-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.streams-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 800;\n  margin: 0;\n}\n.streams-sub[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 13px;\n  margin: 4px 0 0;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  background: #d4af37;\n  border: none;\n  border-radius: 8px;\n  color: #1a1205;\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 14px;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, .15);\n  border-radius: 8px;\n  color: #9ca3af;\n  cursor: pointer;\n  font-size: 13px;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  background: rgba(239, 68, 68, .15);\n  border: 1px solid rgba(239, 68, 68, .3);\n  border-radius: 8px;\n  color: #ef4444;\n  cursor: pointer;\n  font-size: 13px;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  font-size: 12px;\n  padding: 6px 12px;\n}\n.setup-reminder[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 14px 16px;\n  background: rgba(212, 175, 55, .06);\n  border: 1px solid rgba(212, 175, 55, .2);\n  border-radius: 10px;\n  margin-bottom: 24px;\n  align-items: flex-start;\n}\n.setup-reminder__icon[_ngcontent-%COMP%] {\n  color: #d4af37;\n  flex-shrink: 0;\n}\n.setup-reminder__title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: #d4af37;\n  margin-bottom: 4px;\n}\n.setup-reminder__text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  line-height: 1.6;\n}\n.setup-reminder__text[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .08);\n  padding: 1px 5px;\n  border-radius: 4px;\n  font-size: 11px;\n  color: #d1d5db;\n}\n.stream-search[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px 14px;\n  background: rgba(255, 255, 255, .05);\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 8px;\n  color: #fff;\n  font-size: 14px;\n  outline: none;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-size: 13px;\n  margin-bottom: 16px;\n}\n.alert--error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .1);\n  border: 1px solid rgba(239, 68, 68, .3);\n  color: #fca5a5;\n}\n.tournament-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: rgba(255, 255, 255, .04);\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 12px;\n  margin-bottom: 20px;\n}\n.tc-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n}\n.tc-meta[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.tc-id[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #4b5563;\n  font-family: monospace;\n  margin-top: 4px;\n}\n.tc-stream[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.stream-exists-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  background: rgba(16, 185, 129, .1);\n  border-radius: 100px;\n  color: #10b981;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  width: fit-content;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #10b981;\n}\n.dot--live[_ngcontent-%COMP%] {\n  background: #ef4444;\n  animation: pulse 1.4s infinite;\n}\n.tc-stream-key[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.key-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  font-family: monospace;\n  white-space: nowrap;\n}\n.key-val[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #10b981;\n  background: rgba(16, 185, 129, .08);\n  padding: 4px 10px;\n  border-radius: 6px;\n}\n.watch-link[_ngcontent-%COMP%] {\n  color: #d4af37;\n  font-size: 13px;\n  font-weight: 700;\n  text-decoration: none;\n}\n.tc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.tc-no-stream[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-top: 16px;\n}\n.stream-option[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: rgba(255, 255, 255, .03);\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.stream-option--manual[_ngcontent-%COMP%] {\n  border-style: dashed;\n}\n.stream-option__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n}\n.stream-option__hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n.manual-url-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.manual-url-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #4b5563;\n  font-style: italic;\n}\n.new-stream-result[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: rgba(16, 185, 129, .05);\n  border: 1px solid rgba(16, 185, 129, .2);\n  border-radius: 12px;\n}\n.nsr-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: #10b981;\n  margin-bottom: 16px;\n}\n.nsr-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.nsr-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6b7280;\n  font-family: monospace;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n  display: block;\n  margin-bottom: 6px;\n}\n.nsr-field[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #10b981;\n  background: rgba(16, 185, 129, .08);\n  padding: 8px 12px;\n  border-radius: 6px;\n  display: block;\n  word-break: break-all;\n}\n.nsr-key-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.nsr-key-wrap[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.nsr-key-wrap[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: rgba(255, 255, 255, .07);\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 6px;\n  color: #9ca3af;\n  cursor: pointer;\n  font-size: 13px;\n}\n.nsr-instructions[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.nsr-instructions[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  font-size: 14px;\n  color: #fff;\n}\n.instruction-box[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .03);\n  border: 1px solid rgba(255, 255, 255, .07);\n  border-radius: 8px;\n  padding: 16px;\n  font-size: 13px;\n  color: #9ca3af;\n}\n.instruction-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0 6px;\n  color: #fff;\n  font-weight: 600;\n}\n.instruction-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n.instruction-box[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.instruction-box[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: #10b981;\n  font-size: 12px;\n  background: rgba(16, 185, 129, .08);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n.confirm-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 600;\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  max-width: none;\n  padding: 12px 18px;\n  background: #111827;\n  border: 1px solid rgba(255, 255, 255, .12);\n  border-radius: 10px;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, .5);\n  font-size: 14px;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.confirm-bar[_ngcontent-%COMP%]   .btn-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border: none;\n  color: #fff;\n}\n/*# sourceMappingURL=admin-streams.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminStreamsComponent, { className: "AdminStreamsComponent", filePath: "src\\app\\pages\\admin\\admin-streams.component.ts", lineNumber: 234 });
})();
export {
  AdminStreamsComponent
};
//# sourceMappingURL=chunk-2CYSPF3U.js.map
