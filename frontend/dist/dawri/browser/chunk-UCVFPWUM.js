import {
  CommonModule,
  InputFlags,
  computed,
  input,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuerySignal
} from "./chunk-3NRO4OA5.js";
import {
  __async
} from "./chunk-7XEFWCRO.js";

// src/app/core/services/voice-recorder.service.ts
var VoiceRecorderService = class _VoiceRecorderService {
  constructor() {
    this.recording = signal(false);
    this.elapsedMs = signal(0);
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
    this.startedAt = 0;
    this.timer = null;
    this.mime = "audio/webm";
  }
  /** Whether the browser supports recording at all. */
  supported() {
    return typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined";
  }
  /** Begin recording. Throws if mic permission is denied. */
  start() {
    return __async(this, null, function* () {
      if (this.recording())
        return;
      this.stream = yield navigator.mediaDevices.getUserMedia({ audio: true });
      this.mime = this.pickMime();
      this.recorder = new MediaRecorder(this.stream, this.mime ? { mimeType: this.mime } : void 0);
      this.chunks = [];
      this.recorder.ondataavailable = (e) => {
        if (e.data.size > 0)
          this.chunks.push(e.data);
      };
      this.recorder.start();
      this.startedAt = performance.now();
      this.recording.set(true);
      this.elapsedMs.set(0);
      this.timer = setInterval(() => this.elapsedMs.set(performance.now() - this.startedAt), 100);
    });
  }
  /** Stop and return the recorded clip. */
  stop() {
    return new Promise((resolve, reject) => {
      const rec = this.recorder;
      if (!rec) {
        reject(new Error("Not recording."));
        return;
      }
      const durationMs = Math.round(performance.now() - this.startedAt);
      rec.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.mime || "audio/webm" });
        this.cleanup();
        resolve({ blob, durationMs, mime: this.mime || "audio/webm" });
      };
      rec.stop();
    });
  }
  /** Discard the in-progress recording. */
  cancel() {
    const rec = this.recorder;
    if (rec && rec.state !== "inactive") {
      rec.onstop = null;
      rec.stop();
    }
    this.cleanup();
  }
  cleanup() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.recorder = null;
    this.chunks = [];
    this.recording.set(false);
    this.elapsedMs.set(0);
  }
  pickMime() {
    const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
    for (const c of candidates) {
      if (MediaRecorder.isTypeSupported?.(c))
        return c;
    }
    return "";
  }
  static {
    this.\u0275fac = function VoiceRecorderService_Factory(t) {
      return new (t || _VoiceRecorderService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VoiceRecorderService, factory: _VoiceRecorderService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/components/voice/voice-player.component.ts
var _c0 = ["audio"];
function VoicePlayerComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 3);
    \u0275\u0275element(1, "rect", 9)(2, "rect", 10);
    \u0275\u0275elementEnd();
  }
}
function VoicePlayerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 3);
    \u0275\u0275element(1, "path", 11);
    \u0275\u0275elementEnd();
  }
}
var VoicePlayerComponent = class _VoicePlayerComponent {
  constructor() {
    this.src = input.required();
    this.durationMs = input(null);
    this.mine = input(false);
    this.audioEl = viewChild("audio");
    this.playing = signal(false);
    this.current = signal(0);
    this.metaDur = signal(0);
    this.total = computed(() => {
      const ms = this.durationMs();
      if (ms && ms > 0)
        return ms / 1e3;
      const m = this.metaDur();
      return Number.isFinite(m) && m > 0 ? m : 0;
    });
    this.progressPct = computed(() => {
      const t = this.total();
      return t > 0 ? Math.min(100, this.current() / t * 100) : 0;
    });
    this.display = computed(() => this.fmt(this.playing() || this.current() > 0 ? this.current() : this.total()));
  }
  toggle() {
    const el = this.audioEl()?.nativeElement;
    if (!el)
      return;
    if (el.paused) {
      el.play();
      this.playing.set(true);
    } else {
      el.pause();
      this.playing.set(false);
    }
  }
  seek(ev) {
    const el = this.audioEl()?.nativeElement;
    const t = this.total();
    if (!el || t <= 0)
      return;
    const rect = ev.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
    el.currentTime = ratio * t;
    this.current.set(el.currentTime);
  }
  onTime() {
    this.current.set(this.audioEl()?.nativeElement.currentTime ?? 0);
  }
  onMeta() {
    this.metaDur.set(this.audioEl()?.nativeElement.duration ?? 0);
  }
  onEnded() {
    this.playing.set(false);
    this.current.set(0);
  }
  fmt(secs) {
    if (!Number.isFinite(secs) || secs < 0)
      secs = 0;
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
  static {
    this.\u0275fac = function VoicePlayerComponent_Factory(t) {
      return new (t || _VoicePlayerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VoicePlayerComponent, selectors: [["app-voice-player"]], viewQuery: function VoicePlayerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuerySignal(ctx.audioEl, _c0, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
      }
    }, inputs: { src: [InputFlags.SignalBased, "src"], durationMs: [InputFlags.SignalBased, "durationMs"], mine: [InputFlags.SignalBased, "mine"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 10, consts: [["audio", ""], [1, "vp"], ["type", "button", 1, "vp-btn", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "currentColor"], [1, "vp-track", 3, "click"], [1, "vp-fill"], [1, "vp-knob"], [1, "vp-time"], ["preload", "metadata", 3, "timeupdate", "ended", "loadedmetadata", "src"], ["x", "6", "y", "5", "width", "4", "height", "14", "rx", "1"], ["x", "14", "y", "5", "width", "4", "height", "14", "rx", "1"], ["d", "M8 5v14l11-7z"]], template: function VoicePlayerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "button", 2);
        \u0275\u0275listener("click", function VoicePlayerComponent_Template_button_click_1_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggle());
        });
        \u0275\u0275template(2, VoicePlayerComponent_Conditional_2_Template, 3, 0, ":svg:svg", 3)(3, VoicePlayerComponent_Conditional_3_Template, 2, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 4);
        \u0275\u0275listener("click", function VoicePlayerComponent_Template_div_click_4_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.seek($event));
        });
        \u0275\u0275element(5, "div", 5)(6, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 7);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "audio", 8, 0);
        \u0275\u0275listener("timeupdate", function VoicePlayerComponent_Template_audio_timeupdate_9_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onTime());
        })("ended", function VoicePlayerComponent_Template_audio_ended_9_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onEnded());
        })("loadedmetadata", function VoicePlayerComponent_Template_audio_loadedmetadata_9_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onMeta());
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("vp--mine", ctx.mine());
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.playing() ? "Pause" : "Play");
        \u0275\u0275advance();
        \u0275\u0275conditional(2, ctx.playing() ? 2 : 3);
        \u0275\u0275advance(3);
        \u0275\u0275styleProp("width", ctx.progressPct(), "%");
        \u0275\u0275advance();
        \u0275\u0275styleProp("left", ctx.progressPct(), "%");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.display());
        \u0275\u0275advance();
        \u0275\u0275property("src", ctx.src(), \u0275\u0275sanitizeUrl);
      }
    }, dependencies: [CommonModule], styles: ["\n\n.vp[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 200px;\n  max-width: 280px;\n}\n.vp-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  border: none;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  background: var(--primary, #006c35);\n  color: #fff;\n  transition: background .15s, transform .12s;\n  &:hover {\n    background: var(--primary-soft, #2d8c5e);\n  }\n  &:active {\n    transform: scale(.94);\n  }\n}\n.vp--mine[_ngcontent-%COMP%]   .vp-btn[_ngcontent-%COMP%] {\n  background: #fff;\n  color: var(--primary, #006c35);\n}\n.vp-track[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  height: 4px;\n  border-radius: 100px;\n  background: rgba(255, 255, 255, .18);\n  cursor: pointer;\n}\n.vp--mine[_ngcontent-%COMP%]   .vp-track[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .35);\n}\n.vp-fill[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0 auto 0 0;\n  height: 100%;\n  border-radius: 100px;\n  background: var(--accent, #d4af37);\n}\n.vp--mine[_ngcontent-%COMP%]   .vp-fill[_ngcontent-%COMP%] {\n  background: #fff;\n}\n.vp-knob[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n  background: var(--accent, #d4af37);\n  transform: translate(-50%, -50%);\n}\n.vp--mine[_ngcontent-%COMP%]   .vp-knob[_ngcontent-%COMP%] {\n  background: #fff;\n}\n.vp-time[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 11px;\n  color: var(--mu, #8a8aa0);\n  min-width: 34px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.vp--mine[_ngcontent-%COMP%]   .vp-time[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .85);\n}\naudio[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=voice-player.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VoicePlayerComponent, { className: "VoicePlayerComponent", filePath: "src\\app\\shared\\components\\voice\\voice-player.component.ts", lineNumber: 59 });
})();

export {
  VoiceRecorderService,
  VoicePlayerComponent
};
//# sourceMappingURL=chunk-UCVFPWUM.js.map
