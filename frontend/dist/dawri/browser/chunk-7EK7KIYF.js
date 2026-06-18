import {
  VoicePlayerComponent,
  VoiceRecorderService
} from "./chunk-UCVFPWUM.js";
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
import {
  CommunityService
} from "./chunk-GFWMVHEB.js";
import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  AuthService
} from "./chunk-EVGLZ2AV.js";
import "./chunk-OERRWE4S.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-ZNMMCWK4.js";
import {
  ChangeDetectorRef,
  CommonModule,
  DatePipe,
  DestroyRef,
  EventEmitter,
  NgForOf,
  NgIf,
  computed,
  effect,
  inject,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-3NRO4OA5.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/features/community/components/poll-display/poll-display.component.ts
function PollDisplayComponent_div_0_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, "multi");
    \u0275\u0275elementEnd();
  }
}
function PollDisplayComponent_div_0_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "closed");
    \u0275\u0275elementEnd();
  }
}
function PollDisplayComponent_div_0_button_9_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "\u2713");
    \u0275\u0275elementEnd();
  }
}
function PollDisplayComponent_div_0_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function PollDisplayComponent_div_0_button_9_Template_button_click_0_listener() {
      const opt_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.vote(opt_r2));
    });
    \u0275\u0275element(1, "span", 19);
    \u0275\u0275elementStart(2, "span", 20);
    \u0275\u0275template(3, PollDisplayComponent_div_0_button_9_span_3_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 23);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 24);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    const p_r4 = \u0275\u0275nextContext().ngIf;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("voted", opt_r2.voted);
    \u0275\u0275property("disabled", !p_r4.is_open || ctx_r2.busy());
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r2.pct(opt_r2), "%");
    \u0275\u0275advance();
    \u0275\u0275classProp("checked", opt_r2.voted)("round", p_r4.is_multiple);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", opt_r2.voted);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.pct(opt_r2), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r2.votes);
  }
}
function PollDisplayComponent_div_0_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Tap an option to vote", p_r4.is_multiple ? " \xB7 you can choose more than one" : "", " ");
  }
}
function PollDisplayComponent_div_0_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 by ", p_r4.author.nickname, "");
  }
}
function PollDisplayComponent_div_0_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PollDisplayComponent_div_0_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.close());
    });
    \u0275\u0275text(1, "Close");
    \u0275\u0275elementEnd();
  }
}
function PollDisplayComponent_div_0_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function PollDisplayComponent_div_0_button_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove());
    });
    \u0275\u0275text(1, "Delete");
    \u0275\u0275elementEnd();
  }
}
function PollDisplayComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, PollDisplayComponent_div_0_span_6_Template, 2, 0, "span", 5)(7, PollDisplayComponent_div_0_span_7_Template, 2, 0, "span", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 7);
    \u0275\u0275template(9, PollDisplayComponent_div_0_button_9_Template, 10, 13, "button", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, PollDisplayComponent_div_0_div_10_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(11, "div", 10)(12, "span", 11);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, PollDisplayComponent_div_0_span_14_Template, 2, 1, "span", 12);
    \u0275\u0275element(15, "span", 13);
    \u0275\u0275template(16, PollDisplayComponent_div_0_button_16_Template, 2, 0, "button", 14)(17, PollDisplayComponent_div_0_button_17_Template, 2, 0, "button", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.ngIf;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r4.question);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.is_multiple);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !p_r4.is_open);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", p_r4.options)("ngForTrackBy", ctx_r2.trackOpt);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.is_open && !ctx_r2.hasVoted());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", p_r4.total_votes, " vote", p_r4.total_votes === 1 ? "" : "s", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r4.author.nickname);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.canManage() && p_r4.is_open);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.canManage());
  }
}
var PollDisplayComponent = class _PollDisplayComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.api = inject(CommunityService);
    this.auth = inject(AuthService);
    this.cdr = inject(ChangeDetectorRef);
    this.pollView = signal(null);
    this.busy = signal(false);
  }
  ngOnChanges() {
    this.pollView.set(this.poll);
  }
  pct(opt) {
    const total = this.pollView()?.total_votes ?? 0;
    if (total === 0)
      return 0;
    return Math.round(opt.votes / total * 100);
  }
  /** Whether the current viewer has voted for any option in this poll. */
  hasVoted() {
    return (this.pollView()?.options ?? []).some((o) => o.voted);
  }
  /** Creator or platform admin may close/delete (community mods also, server-enforced). */
  canManage() {
    const me = this.auth.currentUser();
    const p = this.pollView();
    if (!me || !p)
      return false;
    return me.role === "admin" || me.id === p.author.id;
  }
  trackOpt(_i, opt) {
    return opt.id;
  }
  vote(opt) {
    const p = this.pollView();
    if (!p || !p.is_open || this.busy())
      return;
    this.busy.set(true);
    this.api.votePoll(p.id, opt.id).subscribe({
      next: (updated) => {
        this.pollView.set(updated);
        this.busy.set(false);
        this.cdr.markForCheck();
        this.state.syncPoll(this.channelId, updated);
      },
      error: () => {
        this.busy.set(false);
        this.cdr.markForCheck();
      }
    });
  }
  close() {
    const p = this.pollView();
    if (!p)
      return;
    this.busy.set(true);
    this.api.closePoll(p.id).subscribe({
      next: (updated) => {
        this.pollView.set(updated);
        this.busy.set(false);
        this.cdr.markForCheck();
        this.state.syncPoll(this.channelId, updated);
      },
      error: () => {
        this.busy.set(false);
        this.cdr.markForCheck();
      }
    });
  }
  remove() {
    const p = this.pollView();
    if (!p)
      return;
    if (!confirm("Delete this poll?"))
      return;
    this.state.deletePoll(this.channelId, p.id);
  }
  static {
    this.\u0275fac = function PollDisplayComponent_Factory(t) {
      return new (t || _PollDisplayComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PollDisplayComponent, selectors: [["app-poll-display"]], inputs: { poll: "poll", channelId: "channelId" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "poll", 4, "ngIf"], [1, "poll"], [1, "poll-head"], [1, "poll-icon"], [1, "poll-q"], ["class", "poll-flag", "title", "Multiple choice", 4, "ngIf"], ["class", "poll-flag closed", 4, "ngIf"], [1, "options"], ["class", "opt", 3, "voted", "disabled", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "poll-hint", 4, "ngIf"], [1, "poll-foot"], [1, "total"], ["class", "by", 4, "ngIf"], [1, "spacer"], ["class", "ghost", 3, "click", 4, "ngIf"], ["class", "ghost danger", 3, "click", 4, "ngIf"], ["title", "Multiple choice", 1, "poll-flag"], [1, "poll-flag", "closed"], [1, "opt", 3, "click", "disabled"], [1, "bar"], [1, "marker"], ["class", "tick", 4, "ngIf"], [1, "opt-label"], [1, "opt-pct"], [1, "opt-count"], [1, "tick"], [1, "poll-hint"], [1, "by"], [1, "ghost", 3, "click"], [1, "ghost", "danger", 3, "click"]], template: function PollDisplayComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, PollDisplayComponent_div_0_Template, 18, 11, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.pollView());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.18);\n  --text: #eaeaf2;\n  --mut: #7a7a92;\n}\n.poll[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-left: 2px solid var(--accent);\n  border-radius: 10px;\n  padding: 0.75rem 0.9rem;\n  margin: 0.4rem 0;\n}\n.poll-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.6rem;\n}\n.poll-icon[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.poll-q[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text);\n  font-size: 0.95rem;\n}\n.poll-flag[_ngcontent-%COMP%] {\n  font-size: 0.62rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #fff;\n  background: var(--accent);\n  padding: 0.05rem 0.4rem;\n  border-radius: 999px;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.poll-flag.closed[_ngcontent-%COMP%] {\n  background: #4c4c63;\n  color: #d0d0e0;\n}\n.options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.opt[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  background: var(--raised);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 0.55rem 0.7rem;\n  cursor: pointer;\n  overflow: hidden;\n  text-align: left;\n  color: var(--text);\n  font-size: 0.88rem;\n  transition: border-color 0.12s ease, background 0.12s ease;\n}\n.opt[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: rgba(124, 58, 237, 0.55);\n  background: rgba(124, 58, 237, 0.08);\n}\n.opt[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.opt.voted[_ngcontent-%COMP%] {\n  border-color: var(--accent);\n}\n.bar[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  background: rgba(124, 58, 237, 0.14);\n  transition: width 0.3s ease;\n  z-index: 0;\n}\n.opt.voted[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, 0.28);\n}\n.marker[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  flex-shrink: 0;\n  width: 20px;\n  height: 20px;\n  border-radius: 5px;\n  border: 2px solid var(--mut);\n  display: grid;\n  place-items: center;\n  transition: border-color 0.12s ease, background 0.12s ease;\n}\n.marker.round[_ngcontent-%COMP%] {\n  border-radius: 50%;\n}\n.marker.checked[_ngcontent-%COMP%] {\n  background: var(--accent);\n  border-color: var(--accent);\n}\n.tick[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 0.7rem;\n  font-weight: 900;\n  line-height: 1;\n}\n.opt-label[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  flex: 1;\n}\n.opt-pct[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.8rem;\n  color: var(--accent-s);\n  font-weight: 700;\n}\n.opt-count[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  font-size: 0.72rem;\n  color: var(--mut);\n  min-width: 1.5rem;\n  text-align: right;\n}\n.poll-hint[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n  margin-top: 0.45rem;\n  font-style: italic;\n}\n.poll-foot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-top: 0.6rem;\n  font-size: 0.75rem;\n  color: var(--mut);\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.ghost[_ngcontent-%COMP%]:hover {\n  color: var(--accent-s);\n}\n.ghost.danger[_ngcontent-%COMP%]:hover {\n  color: #ff6b6b;\n}\n/*# sourceMappingURL=poll-display.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PollDisplayComponent, { className: "PollDisplayComponent", filePath: "src\\app\\features\\community\\components\\poll-display\\poll-display.component.ts", lineNumber: 106 });
})();

// src/app/features/community/components/image-lightbox/image-lightbox.component.ts
var ImageLightboxComponent = class _ImageLightboxComponent {
  constructor() {
    this.close = new EventEmitter();
  }
  onBackdrop(e) {
    if (e.target.classList.contains("lb")) {
      this.close.emit();
    }
  }
  static {
    this.\u0275fac = function ImageLightboxComponent_Factory(t) {
      return new (t || _ImageLightboxComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImageLightboxComponent, selectors: [["app-image-lightbox"]], inputs: { src: "src" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "lb", 3, "click"], ["title", "Close", "aria-label", "Close", 1, "close", 3, "click"], ["alt", "", 1, "full", 3, "src"]], template: function ImageLightboxComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ImageLightboxComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "button", 1);
        \u0275\u0275listener("click", function ImageLightboxComponent_Template_button_click_1_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(2, "\u2715");
        \u0275\u0275elementEnd();
        \u0275\u0275element(3, "img", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("src", ctx.src, \u0275\u0275sanitizeUrl);
      }
    }, dependencies: [CommonModule], styles: ["\n\n.lb[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 2000;\n  background: rgba(0, 0, 0, 0.9);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  animation: _ngcontent-%COMP%_fade 0.14s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.full[_ngcontent-%COMP%] {\n  max-width: 95vw;\n  max-height: 92vh;\n  object-fit: contain;\n  border-radius: 8px;\n  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.6);\n}\n.close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1.1rem;\n  right: 1.2rem;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.1);\n  border: none;\n  color: #fff;\n  font-size: 1.1rem;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition: background 0.12s ease;\n}\n.close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.25);\n}\n/*# sourceMappingURL=image-lightbox.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImageLightboxComponent, { className: "ImageLightboxComponent", filePath: "src\\app\\features\\community\\components\\image-lightbox\\image-lightbox.component.ts", lineNumber: 38 });
})();

// src/app/features/community/components/role-badge/role-badge.component.ts
function RoleBadgeComponent_span_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("data-role", ctx_r0.role);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label());
  }
}
var RoleBadgeComponent = class _RoleBadgeComponent {
  constructor() {
    this.role = null;
  }
  label() {
    switch (this.role) {
      case "owner":
        return "Owner";
      case "admin":
        return "Admin";
      case "moderator":
        return "Mod";
      default:
        return null;
    }
  }
  static {
    this.\u0275fac = function RoleBadgeComponent_Factory(t) {
      return new (t || _RoleBadgeComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleBadgeComponent, selectors: [["app-role-badge"]], inputs: { role: "role" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "badge", 4, "ngIf"], [1, "badge"]], template: function RoleBadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, RoleBadgeComponent_span_0_Template, 2, 2, "span", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.label());
      }
    }, dependencies: [CommonModule, NgIf], styles: ['\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.6rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  padding: 0.05rem 0.35rem;\n  border-radius: 4px;\n  vertical-align: middle;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  line-height: 1.4;\n}\n.badge[data-role=owner][_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.18);\n  color: #d4af37;\n}\n.badge[data-role=admin][_ngcontent-%COMP%] {\n  background: rgba(255, 107, 107, 0.18);\n  color: #ff8a8a;\n}\n.badge[data-role=moderator][_ngcontent-%COMP%] {\n  background: rgba(0, 229, 255, 0.16);\n  color: #00e5ff;\n}\n/*# sourceMappingURL=role-badge.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleBadgeComponent, { className: "RoleBadgeComponent", filePath: "src\\app\\features\\community\\components\\role-badge\\role-badge.component.ts", lineNumber: 29 });
})();

// src/app/features/community/components/event-card/event-card.component.ts
function EventCardComponent_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, "cancelled");
    \u0275\u0275elementEnd();
  }
}
function EventCardComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "ended");
    \u0275\u0275elementEnd();
  }
}
function EventCardComponent_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.event.description);
  }
}
function EventCardComponent_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4CD} ", ctx_r0.event.location, "");
  }
}
function EventCardComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" until ", \u0275\u0275pipeBind2(2, 1, ctx_r0.event.ends_at, "MMM d, h:mm a"), " ");
  }
}
function EventCardComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 by ", ctx_r0.event.creator.nickname, "");
  }
}
function EventCardComponent_div_19_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function EventCardComponent_div_19_button_1_Template_button_click_0_listener() {
      const opt_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.rsvp(opt_r3.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const opt_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.event.my_status === opt_r3.key);
    \u0275\u0275attribute("data-kind", opt_r3.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r3.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.countFor(opt_r3.key));
  }
}
function EventCardComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275template(1, EventCardComponent_div_19_button_1_Template, 4, 5, "button", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.options);
  }
}
function EventCardComponent_div_20_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function EventCardComponent_div_20_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancel());
    });
    \u0275\u0275text(1, "Cancel event");
    \u0275\u0275elementEnd();
  }
}
function EventCardComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, EventCardComponent_div_20_button_1_Template, 2, 0, "button", 27);
    \u0275\u0275elementStart(2, "button", 28);
    \u0275\u0275listener("click", function EventCardComponent_div_20_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.remove());
    });
    \u0275\u0275text(3, "Delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.event.is_cancelled);
  }
}
var EventCardComponent = class _EventCardComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.options = [
      { key: "going", label: "Going" },
      { key: "maybe", label: "Maybe" },
      { key: "declined", label: "Can't go" }
    ];
  }
  countFor(key) {
    return this.event.counts[key] ?? 0;
  }
  /** Creator or platform admin (community mods also; server enforces). */
  canManage() {
    const me = this.auth.currentUser();
    if (!me)
      return false;
    return me.role === "admin" || me.id === this.event.creator.id;
  }
  rsvp(status) {
    if (this.event.is_cancelled)
      return;
    this.state.rsvpEvent(this.communityId, this.event.id, status);
  }
  cancel() {
    if (!confirm("Cancel this event? Members will see it as cancelled."))
      return;
    this.state.cancelEvent(this.communityId, this.event.id);
  }
  remove() {
    if (!confirm("Delete this event permanently?"))
      return;
    this.state.deleteEvent(this.communityId, this.event.id);
  }
  static {
    this.\u0275fac = function EventCardComponent_Factory(t) {
      return new (t || _EventCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventCardComponent, selectors: [["app-event-card"]], inputs: { event: "event", communityId: "communityId" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 19, consts: [[1, "event"], [1, "when"], [1, "day"], [1, "time"], [1, "info"], [1, "title-row"], [1, "title"], ["class", "badge cancelled", 4, "ngIf"], ["class", "badge past", 4, "ngIf"], ["class", "desc", 4, "ngIf"], [1, "meta"], ["class", "loc", 4, "ngIf"], ["class", "range", 4, "ngIf"], ["class", "by", 4, "ngIf"], ["class", "rsvp", 4, "ngIf"], ["class", "admin", 4, "ngIf"], [1, "badge", "cancelled"], [1, "badge", "past"], [1, "desc"], [1, "loc"], [1, "range"], [1, "by"], [1, "rsvp"], ["class", "rsvp-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "rsvp-btn", 3, "click"], [1, "n"], [1, "admin"], ["class", "ghost", 3, "click", 4, "ngIf"], [1, "ghost", "danger", 3, "click"], [1, "ghost", 3, "click"]], template: function EventCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
        \u0275\u0275text(3);
        \u0275\u0275pipe(4, "date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 3);
        \u0275\u0275text(6);
        \u0275\u0275pipe(7, "date");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "div", 5)(10, "span", 6);
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, EventCardComponent_span_12_Template, 2, 0, "span", 7)(13, EventCardComponent_span_13_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, EventCardComponent_p_14_Template, 2, 1, "p", 9);
        \u0275\u0275elementStart(15, "div", 10);
        \u0275\u0275template(16, EventCardComponent_span_16_Template, 2, 1, "span", 11)(17, EventCardComponent_span_17_Template, 3, 4, "span", 12)(18, EventCardComponent_span_18_Template, 2, 1, "span", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, EventCardComponent_div_19_Template, 2, 1, "div", 14)(20, EventCardComponent_div_20_Template, 4, 1, "div", 15);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("cancelled", ctx.event.is_cancelled);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 13, ctx.event.starts_at, "MMM d"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 16, ctx.event.starts_at, "h:mm a"));
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.event.title);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.event.is_cancelled);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.event.is_cancelled && !ctx.event.is_upcoming);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.event.description);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.event.location);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.event.ends_at);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.event.creator.nickname);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.event.is_cancelled);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.canManage());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.18);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n  --gold: #d4af37;\n}\n.event[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.9rem;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-left: 3px solid var(--accent);\n  border-radius: 12px;\n  padding: 0.85rem 1rem;\n}\n.event.cancelled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  border-left-color: #4c4c63;\n}\n.when[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-width: 64px;\n  padding: 0.4rem 0.5rem;\n  background: var(--raised);\n  border-radius: 10px;\n}\n.day[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.05rem;\n  color: var(--accent-s);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.time[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.7rem;\n  color: var(--mut);\n  margin-top: 0.15rem;\n}\n.info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text);\n  font-size: 1rem;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.6rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  padding: 0.05rem 0.4rem;\n  border-radius: 999px;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.badge.cancelled[_ngcontent-%COMP%] {\n  background: #ff6b6b;\n  color: #2a0a0a;\n}\n.badge.past[_ngcontent-%COMP%] {\n  background: #4c4c63;\n  color: #d0d0e0;\n}\n.desc[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #cfcfe0;\n  font-size: 0.88rem;\n  line-height: 1.45;\n  white-space: pre-wrap;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin-top: 0.4rem;\n  font-size: 0.76rem;\n  color: var(--mut);\n}\n.loc[_ngcontent-%COMP%] {\n  color: #b8b8c8;\n}\n.rsvp[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  margin-top: 0.7rem;\n  flex-wrap: wrap;\n}\n.rsvp-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  cursor: pointer;\n  background: var(--raised);\n  border: 1px solid var(--line);\n  color: #cfcfe0;\n  font-size: 0.8rem;\n  transition: border-color 0.12s ease, background 0.12s ease;\n}\n.rsvp-btn[_ngcontent-%COMP%]:hover {\n  border-color: rgba(124, 58, 237, 0.5);\n  background: rgba(124, 58, 237, 0.08);\n}\n.rsvp-btn[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.72rem;\n  color: var(--mut);\n}\n.rsvp-btn.active[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border-color: var(--accent);\n  font-weight: 700;\n  box-shadow: 0 0 12px rgba(124, 58, 237, 0.35);\n}\n.rsvp-btn.active[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n.admin[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  margin-top: 0.6rem;\n}\n.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 0.74rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.ghost[_ngcontent-%COMP%]:hover {\n  color: var(--accent-s);\n}\n.ghost.danger[_ngcontent-%COMP%]:hover {\n  color: #ff6b6b;\n}\n/*# sourceMappingURL=event-card.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventCardComponent, { className: "EventCardComponent", filePath: "src\\app\\features\\community\\components\\event-card\\event-card.component.ts", lineNumber: 91 });
})();

// src/app/features/community/components/message-item/message-item.component.ts
function MessageItemComponent_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 18);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.message.author.avatar, \u0275\u0275sanitizeUrl)("alt", (tmp_3_0 = ctx_r0.message.author.nickname) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "");
  }
}
function MessageItemComponent_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.initials());
  }
}
function MessageItemComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 20);
    \u0275\u0275text(2, "\u21B3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r0.message.reply_to.author) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "Unknown");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.message.reply_to.snippet);
  }
}
function MessageItemComponent_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "(edited)");
    \u0275\u0275elementEnd();
  }
}
function MessageItemComponent_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "\u{1F4CC}");
    \u0275\u0275elementEnd();
  }
}
function MessageItemComponent_ng_container_16_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message.content);
  }
}
function MessageItemComponent_ng_container_16_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, "message removed");
    \u0275\u0275elementEnd();
  }
}
function MessageItemComponent_ng_container_16_app_poll_display_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-poll-display", 31);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("poll", ctx_r0.message.poll)("channelId", ctx_r0.message.channel_id);
  }
}
function MessageItemComponent_ng_container_16_app_event_card_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-event-card", 32);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("event", ctx_r0.message.event)("communityId", ctx_r0.communityId());
  }
}
function MessageItemComponent_ng_container_16_ng_container_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "app-voice-player", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.message.attachments[0].url)("durationMs", (tmp_6_0 = ctx_r0.message.attachments[0].duration_ms) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : null);
  }
}
function MessageItemComponent_ng_container_16_ng_container_5_ng_template_2_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function MessageItemComponent_ng_container_16_ng_container_5_ng_template_2_button_1_Template_button_click_0_listener() {
      const a_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openImage(a_r3.url));
    });
    \u0275\u0275element(1, "img", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r3 = ctx.$implicit;
    \u0275\u0275property("title", "View image");
    \u0275\u0275advance();
    \u0275\u0275property("src", a_r3.url, \u0275\u0275sanitizeUrl);
  }
}
function MessageItemComponent_ng_container_16_ng_container_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275template(1, MessageItemComponent_ng_container_16_ng_container_5_ng_template_2_button_1_Template, 2, 2, "button", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("single", ctx_r0.message.attachments.length === 1);
    \u0275\u0275attribute("data-count", ctx_r0.message.attachments.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.message.attachments);
  }
}
function MessageItemComponent_ng_container_16_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MessageItemComponent_ng_container_16_ng_container_5_div_1_Template, 2, 2, "div", 33)(2, MessageItemComponent_ng_container_16_ng_container_5_ng_template_2_Template, 2, 4, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const imageGrid_r4 = \u0275\u0275reference(3);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isAudio(ctx_r0.message.attachments[0]))("ngIfElse", imageGrid_r4);
  }
}
function MessageItemComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MessageItemComponent_ng_container_16_p_1_Template, 2, 1, "p", 25)(2, MessageItemComponent_ng_container_16_p_2_Template, 2, 0, "p", 26)(3, MessageItemComponent_ng_container_16_app_poll_display_3_Template, 1, 2, "app-poll-display", 27)(4, MessageItemComponent_ng_container_16_app_event_card_4_Template, 1, 2, "app-event-card", 28)(5, MessageItemComponent_ng_container_16_ng_container_5_Template, 4, 2, "ng-container", 6);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.message.is_deleted && ctx_r0.message.content);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.message.is_deleted);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.message.poll && !ctx_r0.message.is_deleted);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.message.event && !ctx_r0.message.is_deleted && ctx_r0.communityId());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.message.attachments == null ? null : ctx_r0.message.attachments.length) && !ctx_r0.message.is_deleted);
  }
}
function MessageItemComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 40);
    \u0275\u0275twoWayListener("ngModelChange", function MessageItemComponent_ng_template_17_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.draft, $event) || (ctx_r0.draft = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 41)(2, "button", 42);
    \u0275\u0275listener("click", function MessageItemComponent_ng_template_17_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveEdit());
    });
    \u0275\u0275text(3, "Save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 43);
    \u0275\u0275listener("click", function MessageItemComponent_ng_template_17_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancelEdit());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.draft);
  }
}
function MessageItemComponent_div_19_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function MessageItemComponent_div_19_button_1_Template_button_click_0_listener() {
      const r_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleReaction(r_r7.emoji));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("just-added", ctx_r0.justReacted() === r_r7.emoji);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r7.emoji, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r7.count);
  }
}
function MessageItemComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275template(1, MessageItemComponent_div_19_button_1_Template, 4, 4, "button", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.message.reactions);
  }
}
function MessageItemComponent_div_20_div_4_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_div_4_button_1_Template_button_click_0_listener() {
      const e_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.addReaction(e_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r11);
  }
}
function MessageItemComponent_div_20_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_div_4_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, MessageItemComponent_div_20_div_4_button_1_Template, 2, 1, "button", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.quickEmojis);
  }
}
function MessageItemComponent_div_20_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.togglePin());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.message.is_pinned ? "Unpin" : "Pin", " ");
  }
}
function MessageItemComponent_div_20_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 43);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_ng_container_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startEdit());
    });
    \u0275\u0275text(2, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 43);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_ng_container_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.delete());
    });
    \u0275\u0275text(4, "Delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function MessageItemComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 49)(2, "button", 50);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.togglePicker($event));
    });
    \u0275\u0275text(3, "\u{1F600}\uFE62");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, MessageItemComponent_div_20_div_4_Template, 2, 1, "div", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 43);
    \u0275\u0275listener("click", function MessageItemComponent_div_20_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reply());
    });
    \u0275\u0275text(6, "Reply");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, MessageItemComponent_div_20_button_7_Template, 2, 1, "button", 52)(8, MessageItemComponent_div_20_ng_container_8_Template, 5, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.pickerOpen());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.canPin());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.message.author.is_self);
  }
}
function MessageItemComponent_div_21_app_message_item_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-message-item", 57);
  }
  if (rf & 2) {
    const child_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("message", child_r14.message)("replies", child_r14.children)("depth", ctx_r0.depth + 1);
  }
}
function MessageItemComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275template(1, MessageItemComponent_div_21_app_message_item_1_Template, 1, 3, "app-message-item", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("capped", ctx_r0.depth >= ctx_r0.maxIndentDepth);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.replies)("ngForTrackBy", ctx_r0.trackChild);
  }
}
function MessageItemComponent_app_image_lightbox_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-image-lightbox", 58);
    \u0275\u0275listener("close", function MessageItemComponent_app_image_lightbox_22_Template_app_image_lightbox_close_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeImage());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const src_r16 = ctx.ngIf;
    \u0275\u0275property("src", src_r16);
  }
}
var MessageItemComponent = class _MessageItemComponent {
  constructor() {
    this.replies = [];
    this.depth = 0;
    this.maxIndentDepth = 4;
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.editing = signal(false);
    this.pickerOpen = signal(false);
    this.justReacted = signal(null);
    this.draft = "";
    this.quickEmojis = ["\u{1F44D}", "\u2764\uFE0F", "\u{1F602}", "\u{1F389}", "\u{1F525}", "\u{1F62E}", "\u{1F622}", "\u{1F44F}"];
    this.lightboxSrc = signal(null);
  }
  trackChild(_idx, node) {
    return node.message.id;
  }
  /** True when this message is the one a moderator jumped to (brief flash). */
  isFlashed() {
    return this.state.flashedMessageId() === this.message.id;
  }
  /** The author's role in this community (for the badge), or null. */
  authorRole() {
    const id = this.message.author.id;
    return id ? this.state.roleByUser()[id] ?? null : null;
  }
  /** Active community id (for the inline event card). */
  communityId() {
    return this.state.activeCommunityId();
  }
  initials() {
    return (this.message.author.nickname ?? "?").slice(0, 2).toUpperCase();
  }
  /**
   * Pin permission: the message author, or a moderator/admin/owner of the
   * active community, or a platform admin. (Server enforces the real rule.)
   */
  canPin() {
    if (this.message.author.is_self)
      return true;
    if (this.auth.currentUser()?.role === "admin")
      return true;
    const communityId = this.state.activeCommunityId();
    const myId = this.auth.currentUser()?.id;
    if (!communityId || !myId)
      return false;
    const me = (this.state.membersByCommunity()[communityId] ?? []).find((m) => m.user.id === myId);
    return !!me && (me.role === "owner" || me.role === "admin" || me.role === "moderator");
  }
  startEdit() {
    this.draft = this.message.content ?? "";
    this.editing.set(true);
  }
  cancelEdit() {
    this.editing.set(false);
    this.draft = "";
  }
  saveEdit() {
    if (this.draft.trim().length === 0)
      return;
    this.state.edit(this.message.id, this.draft);
    this.editing.set(false);
  }
  delete() {
    if (!confirm("Delete this message?"))
      return;
    this.state.delete(this.message);
  }
  toggleReaction(emoji) {
    const currentUserId = this.auth.currentUser()?.id ?? "";
    this.state.toggleReaction(this.message, emoji, currentUserId);
    this.justReacted.set(emoji);
    setTimeout(() => this.justReacted.set(null), 400);
  }
  togglePicker(ev) {
    ev.stopPropagation();
    this.pickerOpen.update((v) => !v);
  }
  addReaction(emoji) {
    const currentUserId = this.auth.currentUser()?.id ?? "";
    const mine = this.message.reactions.find((r) => r.emoji === emoji)?.users.includes(currentUserId);
    if (!mine) {
      this.state.toggleReaction(this.message, emoji, currentUserId);
    }
    this.pickerOpen.set(false);
  }
  togglePin() {
    this.state.togglePin(this.message);
  }
  reply() {
    this.state.setReplyTo(this.message);
  }
  openImage(url) {
    this.lightboxSrc.set(url);
  }
  /** True if an attachment is a voice note (audio), not an image. */
  isAudio(a) {
    return !!a?.mime && a.mime.startsWith("audio/");
  }
  closeImage() {
    this.lightboxSrc.set(null);
  }
  static {
    this.\u0275fac = function MessageItemComponent_Factory(t) {
      return new (t || _MessageItemComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MessageItemComponent, selectors: [["app-message-item"]], inputs: { message: "message", replies: "replies", depth: "depth" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 24, consts: [["editForm", ""], ["imageGrid", ""], [1, "thread"], [1, "message", 3, "id"], [1, "avatar"], [3, "src", "alt", 4, "ngIf"], [4, "ngIf"], [1, "body"], ["class", "reply-ref", 4, "ngIf"], [1, "nick"], [3, "role"], ["class", "edited", 4, "ngIf"], ["class", "pinned", "title", "Pinned", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["class", "reactions", 4, "ngIf"], ["class", "actions", 4, "ngIf"], ["class", "replies", 3, "capped", 4, "ngIf"], [3, "src", "close", 4, "ngIf"], [3, "src", "alt"], [1, "reply-ref"], [1, "reply-icon"], [1, "reply-author"], [1, "reply-snippet"], [1, "edited"], ["title", "Pinned", 1, "pinned"], ["class", "content", 4, "ngIf"], ["class", "content removed", 4, "ngIf"], [3, "poll", "channelId", 4, "ngIf"], [3, "event", "communityId", 4, "ngIf"], [1, "content"], [1, "content", "removed"], [3, "poll", "channelId"], [3, "event", "communityId"], ["class", "voice-attach", 4, "ngIf", "ngIfElse"], [1, "voice-attach"], [3, "src", "durationMs"], [1, "attachments"], ["type", "button", "class", "thumb", 3, "title", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "thumb", 3, "click", "title"], ["alt", "", "loading", "lazy", 3, "src"], ["rows", "2", 3, "ngModelChange", "ngModel"], [1, "edit-actions"], [3, "click"], [1, "ghost", 3, "click"], [1, "reactions"], ["class", "reaction", 3, "just-added", "click", 4, "ngFor", "ngForOf"], [1, "reaction", 3, "click"], [1, "count"], [1, "actions"], [1, "react-wrap"], ["title", "Add reaction", 1, "ghost", 3, "click"], ["class", "picker", 3, "click", 4, "ngIf"], ["class", "ghost", 3, "click", 4, "ngIf"], [1, "picker", 3, "click"], [3, "click", 4, "ngFor", "ngForOf"], [1, "replies"], [3, "message", "replies", "depth", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "message", "replies", "depth"], [3, "close", "src"]], template: function MessageItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "article", 3)(2, "div", 4);
        \u0275\u0275template(3, MessageItemComponent_img_3_Template, 1, 2, "img", 5)(4, MessageItemComponent_span_4_Template, 2, 1, "span", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 7);
        \u0275\u0275template(6, MessageItemComponent_div_6_Template, 7, 2, "div", 8);
        \u0275\u0275elementStart(7, "header")(8, "span", 9);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275element(10, "app-role-badge", 10);
        \u0275\u0275elementStart(11, "time");
        \u0275\u0275text(12);
        \u0275\u0275pipe(13, "date");
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, MessageItemComponent_span_14_Template, 2, 0, "span", 11)(15, MessageItemComponent_span_15_Template, 2, 0, "span", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, MessageItemComponent_ng_container_16_Template, 6, 5, "ng-container", 13)(17, MessageItemComponent_ng_template_17_Template, 6, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(19, MessageItemComponent_div_19_Template, 2, 1, "div", 14)(20, MessageItemComponent_div_20_Template, 9, 3, "div", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(21, MessageItemComponent_div_21_Template, 2, 4, "div", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, MessageItemComponent_app_image_lightbox_22_Template, 1, 1, "app-image-lightbox", 17);
      }
      if (rf & 2) {
        let tmp_8_0;
        const editForm_r17 = \u0275\u0275reference(18);
        \u0275\u0275advance();
        \u0275\u0275classProp("deleted", ctx.message.is_deleted)("flash", ctx.isFlashed())("is-pinned", ctx.message.is_pinned);
        \u0275\u0275property("id", "msg-" + ctx.message.id);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.message.author.avatar);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.message.author.avatar);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.message.reply_to);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate((tmp_8_0 = ctx.message.author.nickname) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : "Unknown");
        \u0275\u0275advance();
        \u0275\u0275property("role", ctx.authorRole());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 21, ctx.message.created_at, "short"));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.message.edited_at);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.message.is_pinned);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.editing())("ngIfElse", editForm_r17);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.message.reactions.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.message.is_deleted);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.replies.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.lightboxSrc());
      }
    }, dependencies: [_MessageItemComponent, CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, PollDisplayComponent, ImageLightboxComponent, RoleBadgeComponent, EventCardComponent, VoicePlayerComponent], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(255,255,255,0.07);\n  --text: #eaeaf2;\n  --mut: #7a7a92;\n  --gold: #d4af37;\n}\n.thread[_ngcontent-%COMP%] {\n  display: block;\n}\n.replies[_ngcontent-%COMP%] {\n  margin-left: 21px;\n  padding-left: 0.85rem;\n  border-left: 2px solid rgba(124, 58, 237, 0.22);\n}\n.replies.capped[_ngcontent-%COMP%] {\n  margin-left: 0;\n  padding-left: 0;\n  border-left: none;\n}\n.message[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 42px 1fr;\n  gap: 0.75rem;\n  padding: 0.45rem 0.65rem;\n  border-radius: 8px;\n  border-left: 2px solid transparent;\n  transition:\n    background 0.15s ease,\n    border-color 0.15s ease,\n    box-shadow 0.15s ease;\n}\n.message[_ngcontent-%COMP%]:hover {\n  background: var(--surface);\n  border-left-color: rgba(124, 58, 237, 0.55);\n  box-shadow: inset 3px 0 20px rgba(124, 58, 237, 0.08);\n}\n.message.is-pinned[_ngcontent-%COMP%] {\n  border-left-color: var(--gold) !important;\n  animation: _ngcontent-%COMP%_pinGlow 3s ease-in-out infinite;\n}\n.message.is-pinned[_ngcontent-%COMP%]:hover {\n  box-shadow: inset 3px 0 20px rgba(212, 175, 55, 0.12);\n}\n.message.flash[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_flashHi 2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_flashHi {\n  0%, 25% {\n    background: rgba(124, 58, 237, 0.2);\n    border-left-color: var(--accent);\n  }\n  100% {\n    background: transparent;\n    border-left-color: transparent;\n  }\n}\n@keyframes _ngcontent-%COMP%_msgSlideIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_reactionPop {\n  0% {\n    transform: scale(0.5);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.25);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_pinGlow {\n  0%, 100% {\n    box-shadow: 2px 0 12px rgba(212, 175, 55, .15);\n  }\n  50% {\n    box-shadow: 2px 0 24px rgba(212, 175, 55, .35);\n  }\n}\n[_nghost-%COMP%] {\n  animation: _ngcontent-%COMP%_msgSlideIn .25s ease both;\n}\n.message.deleted[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  background: var(--raised);\n  display: grid;\n  place-items: center;\n  color: var(--accent-s);\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  box-shadow: inset 0 0 0 1px rgba(124, 58, 237, 0.3);\n}\n.avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n  object-fit: cover;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.reply-ref[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.78rem;\n  color: #7a7a92;\n  margin-bottom: 0.15rem;\n  padding-left: 0.1rem;\n}\n.reply-icon[_ngcontent-%COMP%] {\n  color: var(--accent-s);\n  opacity: 0.8;\n}\n.reply-author[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #9a9ab0;\n}\n.reply-snippet[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 60%;\n  opacity: 0.8;\n}\n.nick[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text);\n}\ntime[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.edited[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n  font-style: italic;\n}\n.pinned[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.content[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  color: #d0d0e8;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  line-height: 1.6;\n  font-size: 0.9rem;\n}\n.voice-attach[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  display: inline-flex;\n  padding: 8px 12px;\n  background: rgba(255, 255, 255, .05);\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 12px;\n}\n.attachments[_ngcontent-%COMP%] {\n  margin-top: 0.4rem;\n  display: grid;\n  gap: 4px;\n  max-width: 420px;\n  grid-template-columns: repeat(2, 1fr);\n}\n.attachments.single[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 340px;\n}\n.attachments[data-count="3"][_ngcontent-%COMP%]   .thumb[_ngcontent-%COMP%]:first-child {\n  grid-column: span 2;\n}\n.thumb[_ngcontent-%COMP%] {\n  padding: 0;\n  border: none;\n  background: #110f1e;\n  border-radius: 8px;\n  overflow: hidden;\n  cursor: pointer;\n  aspect-ratio: 1 / 1;\n}\n.thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  transition: transform 0.18s ease;\n}\n.attachments.single[_ngcontent-%COMP%]   .thumb[_ngcontent-%COMP%] {\n  display: inline-block;\n  aspect-ratio: auto;\n  background: transparent;\n  max-width: 340px;\n  max-height: 340px;\n}\n.attachments.single[_ngcontent-%COMP%]   .thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: auto;\n  height: auto;\n  max-width: 340px;\n  max-height: 340px;\n  object-fit: contain;\n}\n.thumb[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  transform: scale(1.03);\n}\n.content.removed[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--mut);\n}\n.reactions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.3rem;\n  margin-top: 0.45rem;\n  flex-wrap: wrap;\n}\n.reaction[_ngcontent-%COMP%] {\n  padding: 0.12rem 0.55rem;\n  background: rgba(124, 58, 237, 0.1);\n  border: 1px solid rgba(124, 58, 237, 0.25);\n  border-radius: 999px;\n  color: #cfcfe0;\n  cursor: pointer;\n  font-size: 0.82rem;\n  transition:\n    border-color 0.12s ease,\n    background 0.12s ease,\n    box-shadow 0.12s ease,\n    transform 0.12s ease;\n}\n.reaction[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  background: rgba(124, 58, 237, 0.18);\n  box-shadow: 0 0 10px rgba(124, 58, 237, 0.3);\n  transform: scale(1.08);\n}\n.reaction.just-added[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_reactionPop .3s cubic-bezier(.34, 1.56, .64, 1) both;\n}\n.count[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  margin-inline-start: 0.25rem;\n  color: var(--accent-s);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 0.35rem;\n  opacity: 0;\n  transition: opacity 0.15s;\n  align-items: center;\n}\n.message[_ngcontent-%COMP%]:hover   .actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.react-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.picker[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 100%;\n  left: 0;\n  z-index: 20;\n  margin-bottom: 0.25rem;\n  background: #110f1e;\n  border: 1px solid rgba(124, 58, 237, 0.3);\n  border-radius: 10px;\n  padding: 0.35rem;\n  display: flex;\n  gap: 0.15rem;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 58, 237, 0.15);\n}\n.picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1.15rem;\n  padding: 0.2rem;\n  border-radius: 6px;\n}\n.picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: var(--surface);\n}\n.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 0.76rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  letter-spacing: 0.02em;\n  padding: 0.15rem 0.3rem;\n  border-radius: 4px;\n  transition: color 0.13s, background 0.13s;\n}\n.ghost[_ngcontent-%COMP%]:hover {\n  color: var(--accent-s);\n  background: rgba(124, 58, 237, 0.1);\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem;\n  background: #0b0a14;\n  color: var(--text);\n  border: 1px solid rgba(124, 58, 237, 0.3);\n  border-radius: 8px;\n  resize: vertical;\n  outline: none;\n}\ntextarea[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent);\n}\n.edit-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 0.3rem;\n}\nbutton[_ngcontent-%COMP%]:not(.ghost):not(.reaction):not(.picker   button)[_ngcontent-%COMP%]:not(.thumb) {\n  padding: 0.28rem 0.75rem;\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 7px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.82rem;\n  transition: background 0.14s, box-shadow 0.14s;\n}\nbutton[_ngcontent-%COMP%]:not(.ghost):not(.reaction):not(.picker   button)[_ngcontent-%COMP%]:not(.thumb):hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n/*# sourceMappingURL=message-item.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MessageItemComponent, { className: "MessageItemComponent", filePath: "src\\app\\features\\community\\components\\message-item\\message-item.component.ts", lineNumber: 229 });
})();

// src/app/features/community/components/message-list/message-list.component.ts
var _c0 = ["scroller"];
function MessageListComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1, "Loading messages\u2026");
    \u0275\u0275elementEnd();
  }
}
function MessageListComponent_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function MessageListComponent_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadMore());
    });
    \u0275\u0275text(1, " Load older messages ");
    \u0275\u0275elementEnd();
  }
}
function MessageListComponent_app_message_item_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-message-item", 8);
  }
  if (rf & 2) {
    const node_r4 = ctx.$implicit;
    \u0275\u0275property("message", node_r4.message)("replies", node_r4.children)("depth", 0);
  }
}
var MessageListComponent = class _MessageListComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.isLoading = this.state.isLoadingMessages;
    this.threadRoots = computed(() => {
      const all = this.state.activeMessages();
      const byId = /* @__PURE__ */ new Map();
      for (const m of all)
        byId.set(m.id, m);
      const childrenOf = /* @__PURE__ */ new Map();
      const roots = [];
      for (const m of all) {
        const parentLoaded = m.reply_to != null && byId.has(m.reply_to.id);
        if (parentLoaded) {
          const pid = m.reply_to.id;
          const arr = childrenOf.get(pid) ?? [];
          arr.push(m);
          childrenOf.set(pid, arr);
        } else {
          roots.push(m);
        }
      }
      const byTime = (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      const build = (msg) => ({
        message: msg,
        children: (childrenOf.get(msg.id) ?? []).sort(byTime).map(build)
      });
      return roots.sort(byTime).map(build);
    });
    this.hasMore = computed(() => {
      const id = this.state.activeChannelId();
      return id ? !!this.state.cursorByChannel()[id] : false;
    });
    this.autoScroll = true;
    effect(() => {
      const roots = this.threadRoots();
      if (roots.length === 0)
        return;
      if (this.autoScroll)
        queueMicrotask(() => this.scrollToBottom());
    });
  }
  loadMore() {
    const id = this.state.activeChannelId();
    if (id)
      this.state.loadMessages(id, true);
  }
  onScroll() {
    const el = this.scroller.nativeElement;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    this.autoScroll = nearBottom;
  }
  trackById(_idx, node) {
    return node.message.id;
  }
  scrollToBottom() {
    const el = this.scroller.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
  static {
    this.\u0275fac = function MessageListComponent_Factory(t) {
      return new (t || _MessageListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MessageListComponent, selectors: [["app-message-list"]], viewQuery: function MessageListComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.scroller = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 4, consts: [["scroller", ""], [1, "scroller", 3, "scroll"], ["class", "loading", 4, "ngIf"], ["class", "load-more", 3, "click", 4, "ngIf"], [1, "messages-reversed"], [3, "message", "replies", "depth", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "loading"], [1, "load-more", 3, "click"], [3, "message", "replies", "depth"]], template: function MessageListComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1, 0);
        \u0275\u0275listener("scroll", function MessageListComponent_Template_div_scroll_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onScroll());
        });
        \u0275\u0275template(2, MessageListComponent_div_2_Template, 2, 0, "div", 2)(3, MessageListComponent_button_3_Template, 2, 0, "button", 3);
        \u0275\u0275elementStart(4, "div", 4);
        \u0275\u0275template(5, MessageListComponent_app_message_item_5_Template, 1, 3, "app-message-item", 5);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.isLoading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.hasMore() && !ctx.isLoading());
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.threadRoots())("ngForTrackBy", ctx.trackById);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, MessageItemComponent], styles: ['\n\n@keyframes _ngcontent-%COMP%_channelFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n}\n.scroller[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.25rem;\n  min-height: 0;\n  animation: _ngcontent-%COMP%_channelFadeIn .2s ease both;\n}\n.messages-reversed[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.loading[_ngcontent-%COMP%], .load-more[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto 0.75rem;\n  padding: 0.45rem 1.1rem;\n  color: #7a7a92;\n  background: rgba(124, 58, 237, 0.06);\n  border: 1px solid rgba(124, 58, 237, 0.2);\n  border-radius: 8px;\n  cursor: pointer;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.8rem;\n  transition:\n    color 0.15s,\n    border-color 0.15s,\n    background 0.15s;\n}\n.load-more[_ngcontent-%COMP%]:hover {\n  color: #a78bfa;\n  border-color: #7c3aed;\n  background: rgba(124, 58, 237, 0.12);\n}\n/*# sourceMappingURL=message-list.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MessageListComponent, { className: "MessageListComponent", filePath: "src\\app\\features\\community\\components\\message-list\\message-list.component.ts", lineNumber: 58 });
})();

// src/app/features/community/components/reaction-picker/reaction-picker.component.ts
function ReactionPickerComponent_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function ReactionPickerComponent_button_1_Template_button_click_0_listener($event) {
      const e_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r2.pick.emit(e_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r2);
  }
}
var ReactionPickerComponent = class _ReactionPickerComponent {
  constructor() {
    this.pick = new EventEmitter();
    this.close = new EventEmitter();
    this.emojis = [
      "\u{1F44D}",
      "\u2764\uFE0F",
      "\u{1F525}",
      "\u{1F602}",
      "\u{1F389}",
      "\u{1F440}",
      "\u{1F64F}",
      "\u{1F4AF}",
      "\u26A1",
      "\u{1F3C6}",
      "\u{1F3AE}",
      "\u2694\uFE0F",
      "\u{1F6E1}\uFE0F",
      "\u{1F60E}",
      "\u{1F92F}",
      "\u{1F480}"
    ];
  }
  static {
    this.\u0275fac = function ReactionPickerComponent_Factory(t) {
      return new (t || _ReactionPickerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReactionPickerComponent, selectors: [["app-reaction-picker"]], outputs: { pick: "pick", close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "picker", 3, "click"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function ReactionPickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ReactionPickerComponent_Template_div_click_0_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275template(1, ReactionPickerComponent_button_1_Template, 2, 1, "button", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.emojis);
      }
    }, dependencies: [CommonModule, NgForOf], styles: ["\n\n.picker[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 56px;\n  left: 0.75rem;\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  gap: 0.25rem;\n  padding: 0.5rem;\n  background: #0e1428;\n  border: 1px solid #1a1f3a;\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n  z-index: 100;\n}\nbutton[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  font-size: 1.4rem;\n  cursor: pointer;\n  padding: 0.25rem;\n  border-radius: 4px;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #1a1f3a;\n}\n/*# sourceMappingURL=reaction-picker.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReactionPickerComponent, { className: "ReactionPickerComponent", filePath: "src\\app\\features\\community\\components\\reaction-picker\\reaction-picker.component.ts", lineNumber: 44 });
})();

// src/app/features/community/components/mention-textarea/mention-textarea.component.ts
function MentionTextareaComponent_ul_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 5);
    \u0275\u0275listener("click", function MentionTextareaComponent_ul_2_li_1_Template_li_click_0_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.apply(s_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("@", s_r2.user.nickname, "");
  }
}
function MentionTextareaComponent_ul_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 3);
    \u0275\u0275template(1, MentionTextareaComponent_ul_2_li_1_Template, 2, 1, "li", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.suggestions());
  }
}
var MentionTextareaComponent = class _MentionTextareaComponent {
  constructor() {
    this.value = "";
    this.placeholder = "";
    this.valueChange = new EventEmitter();
    this.submit = new EventEmitter();
    this.state = inject(CommunityStateService);
    this.suggestions = signal([]);
    this.currentMentionStart = -1;
  }
  onInput(text) {
    this.value = text;
    this.valueChange.emit(text);
    this.updateSuggestions(text);
  }
  onKey(ev) {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      this.submit.emit();
    } else if (ev.key === "Escape") {
      this.suggestions.set([]);
    }
  }
  apply(member) {
    if (this.currentMentionStart < 0)
      return;
    const before = this.value.slice(0, this.currentMentionStart);
    const after = this.value.slice(this.currentMentionStart).replace(/^@\S*/, `@${member.user.nickname} `);
    this.value = before + after;
    this.valueChange.emit(this.value);
    this.suggestions.set([]);
    this.currentMentionStart = -1;
  }
  updateSuggestions(text) {
    const match = /@(\w*)$/.exec(text);
    if (!match) {
      this.suggestions.set([]);
      this.currentMentionStart = -1;
      return;
    }
    this.currentMentionStart = match.index;
    const query = match[1].toLowerCase();
    const communityId = this.state.activeCommunityId();
    if (!communityId)
      return;
    const all = this.state.membersByCommunity()[communityId] ?? [];
    this.suggestions.set(all.filter((m) => (m.user.nickname ?? "").toLowerCase().includes(query)).slice(0, 8));
  }
  static {
    this.\u0275fac = function MentionTextareaComponent_Factory(t) {
      return new (t || _MentionTextareaComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MentionTextareaComponent, selectors: [["app-mention-textarea"]], inputs: { value: "value", placeholder: "placeholder" }, outputs: { valueChange: "valueChange", submit: "submit" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 3, consts: [[1, "wrap"], ["rows", "1", 3, "ngModelChange", "keydown", "ngModel", "placeholder"], ["class", "suggestions", 4, "ngIf"], [1, "suggestions"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function MentionTextareaComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "textarea", 1);
        \u0275\u0275twoWayListener("ngModelChange", function MentionTextareaComponent_Template_textarea_ngModelChange_1_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.value, $event) || (ctx.value = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function MentionTextareaComponent_Template_textarea_ngModelChange_1_listener($event) {
          return ctx.onInput($event);
        })("keydown", function MentionTextareaComponent_Template_textarea_keydown_1_listener($event) {
          return ctx.onKey($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(2, MentionTextareaComponent_ul_2_Template, 2, 1, "ul", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.value);
        \u0275\u0275property("placeholder", ctx.placeholder);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.suggestions().length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.wrap[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n}\ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.6rem;\n  background: #110f1e;\n  color: #eaeaf2;\n  border: 1px solid rgba(124, 58, 237, 0.2);\n  border-radius: 8px;\n  resize: none;\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n}\ntextarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: rgba(124, 58, 237, 0.6);\n  box-shadow: 0 0 0 1px rgba(124, 58, 237, 0.25);\n}\n.suggestions[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 100%;\n  left: 0;\n  right: 0;\n  background: #110f1e;\n  border: 1px solid rgba(124, 58, 237, 0.3);\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(124, 58, 237, 0.12);\n  list-style: none;\n  padding: 0.25rem;\n  margin: 0;\n  max-height: 160px;\n  overflow-y: auto;\n}\nli[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.6rem;\n  cursor: pointer;\n  color: #cfcfe0;\n  border-radius: 6px;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.85rem;\n}\nli[_ngcontent-%COMP%]:hover {\n  background: #1c1833;\n  color: #a78bfa;\n}\n/*# sourceMappingURL=mention-textarea.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MentionTextareaComponent, { className: "MentionTextareaComponent", filePath: "src\\app\\features\\community\\components\\mention-textarea\\mention-textarea.component.ts", lineNumber: 45 });
})();

// src/app/features/community/components/poll-create/poll-create.component.ts
function PollCreateComponent_div_17_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function PollCreateComponent_div_17_button_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const i_r2 = \u0275\u0275nextContext().index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeOption(i_r2));
    });
    \u0275\u0275text(1, "\u2715");
    \u0275\u0275elementEnd();
  }
}
function PollCreateComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "input", 16);
    \u0275\u0275listener("ngModelChange", function PollCreateComponent_div_17_Template_input_ngModelChange_1_listener($event) {
      const i_r2 = \u0275\u0275restoreView(_r1).index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setOption(i_r2, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, PollCreateComponent_div_17_button_2_Template, 2, 0, "button", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", row_r5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.canRemove(i_r2));
  }
}
function PollCreateComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Maximum ", ctx_r2.MAX, " options");
  }
}
var PollCreateComponent = class _PollCreateComponent {
  constructor() {
    this.cancel = new EventEmitter();
    this.created = new EventEmitter();
    this.state = inject(CommunityStateService);
    this.MAX = 10;
    this.question = "";
    this.isMultiple = false;
    this.options = signal([]);
    this.rows = computed(() => {
      const filled = this.options();
      if (filled.length >= this.MAX)
        return filled.slice(0, this.MAX);
      return [...filled, ""];
    });
    this.canCreate = computed(() => {
      const q = this.question.trim().length > 0;
      const filled = this.options().filter((o) => o.trim().length > 0).length;
      return q && filled >= 2;
    });
  }
  trackRow(i) {
    return i;
  }
  /** Whether a given row shows a remove button (only real, non-last-empty rows). */
  canRemove(i) {
    return i < this.options().length && this.options().length > 0;
  }
  setOption(i, value) {
    this.options.update((arr) => {
      const next = [...arr];
      if (i < next.length) {
        next[i] = value;
      } else {
        next.push(value);
      }
      while (next.length > 0 && next[next.length - 1].trim() === "" && next.length > i + 1) {
        next.pop();
      }
      return next;
    });
  }
  removeOption(i) {
    this.options.update((arr) => arr.filter((_, idx) => idx !== i));
  }
  create() {
    if (!this.canCreate())
      return;
    const opts = this.options().map((o) => o.trim()).filter((o) => o.length > 0);
    this.state.createPoll(this.channelId, {
      question: this.question.trim(),
      options: opts,
      is_multiple: this.isMultiple
    });
    this.created.emit();
  }
  onBackdrop(e) {
    if (e.target.classList.contains("overlay")) {
      this.cancel.emit();
    }
  }
  static {
    this.\u0275fac = function PollCreateComponent_Factory(t) {
      return new (t || _PollCreateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PollCreateComponent, selectors: [["app-poll-create"]], inputs: { channelId: "channelId" }, outputs: { cancel: "cancel", created: "created" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 8, consts: [[1, "overlay", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "sheet"], [1, "bar"], ["title", "Cancel", "aria-label", "Cancel", 1, "icon", 3, "click"], [1, "title"], ["title", "Send poll", "aria-label", "Send poll", 1, "send", 3, "click", "disabled"], [1, "body"], [1, "block"], [1, "label"], ["placeholder", "Ask a question", "maxlength", "300", "rows", "1", 1, "q", 3, "ngModelChange", "ngModel"], ["class", "opt-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "hint", 4, "ngIf"], [1, "setting"], ["type", "button", 1, "switch", 3, "click"], [1, "knob"], [1, "opt-row"], ["placeholder", "Add", "maxlength", "150", 1, "opt", 3, "ngModelChange", "ngModel"], ["class", "icon dim", "title", "Remove option", "aria-label", "Remove option", 3, "click", 4, "ngIf"], ["title", "Remove option", "aria-label", "Remove option", 1, "icon", "dim", 3, "click"], [1, "hint"]], template: function PollCreateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function PollCreateComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "header", 2)(3, "button", 3);
        \u0275\u0275listener("click", function PollCreateComponent_Template_button_click_3_listener() {
          return ctx.cancel.emit();
        });
        \u0275\u0275text(4, "\u2715");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6, "Create poll");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 5);
        \u0275\u0275listener("click", function PollCreateComponent_Template_button_click_7_listener() {
          return ctx.create();
        });
        \u0275\u0275text(8, "\u2713");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6)(10, "section", 7)(11, "label", 8);
        \u0275\u0275text(12, "Question");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "textarea", 9);
        \u0275\u0275twoWayListener("ngModelChange", function PollCreateComponent_Template_textarea_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.question, $event) || (ctx.question = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "section", 7)(15, "label", 8);
        \u0275\u0275text(16, "Options");
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, PollCreateComponent_div_17_Template, 3, 2, "div", 10)(18, PollCreateComponent_div_18_Template, 2, 1, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "section", 7)(20, "label", 12)(21, "span");
        \u0275\u0275text(22, "Allow multiple answers");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 13);
        \u0275\u0275listener("click", function PollCreateComponent_Template_button_click_23_listener() {
          return ctx.isMultiple = !ctx.isMultiple;
        });
        \u0275\u0275element(24, "span", 14);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", !ctx.canCreate());
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.question);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.rows())("ngForTrackBy", ctx.trackRow);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.rows().length >= ctx.MAX);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("on", ctx.isMultiple);
        \u0275\u0275attribute("aria-pressed", ctx.isMultiple);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.18);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n.sheet[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  max-height: 86vh;\n  overflow: hidden;\n  background: var(--bg);\n  border: 1px solid var(--line);\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6);\n  animation: _ngcontent-%COMP%_pop 0.16s ease-out;\n}\n@keyframes _ngcontent-%COMP%_pop {\n  from {\n    transform: translateY(8px) scale(0.98);\n    opacity: 0;\n  }\n  to {\n    transform: none;\n    opacity: 1;\n  }\n}\n.bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  letter-spacing: 0.04em;\n  font-size: 1.15rem;\n  color: var(--text);\n  text-transform: uppercase;\n}\n.icon[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  font-size: 1rem;\n  display: grid;\n  place-items: center;\n  transition: background 0.12s ease, color 0.12s ease;\n}\n.icon[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.icon.dim[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  font-size: 0.85rem;\n}\n.icon.dim[_ngcontent-%COMP%]:hover {\n  color: #ff6b6b;\n}\n.send[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  cursor: pointer;\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  font-size: 1.05rem;\n  font-weight: 800;\n  display: grid;\n  place-items: center;\n  transition: box-shadow 0.14s ease, opacity 0.14s ease;\n}\n.send[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 0 18px rgba(124, 58, 237, 0.5);\n}\n.send[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.body[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem 1.1rem;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n}\n.block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.55rem;\n}\n.label[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.7rem;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--accent-s);\n  padding-top: 0.5rem;\n}\n.q[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: none;\n  border-bottom: 2px solid var(--line);\n  border-radius: 10px 10px 0 0;\n  padding: 0.7rem 0.8rem;\n  color: var(--text);\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 1rem;\n  resize: none;\n  line-height: 1.4;\n  min-height: 2.6rem;\n}\n.q[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-bottom-color: var(--accent);\n}\n.opt-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.opt[_ngcontent-%COMP%] {\n  flex: 1;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 0.65rem 0.8rem;\n  color: var(--text);\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 0.95rem;\n  transition: border-color 0.12s ease;\n}\n.opt[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n}\n.opt[_ngcontent-%COMP%]::placeholder {\n  color: var(--mut);\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n  padding-left: 0.2rem;\n}\n.setting[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: var(--text);\n  font-size: 0.95rem;\n  cursor: pointer;\n}\n.switch[_ngcontent-%COMP%] {\n  position: relative;\n  width: 46px;\n  height: 26px;\n  border-radius: 999px;\n  background: var(--raised);\n  border: 1px solid var(--line);\n  cursor: pointer;\n  transition: background 0.16s ease, border-color 0.16s ease;\n}\n.switch.on[_ngcontent-%COMP%] {\n  background: var(--accent);\n  border-color: var(--accent);\n}\n.knob[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #fff;\n  transition: transform 0.16s ease;\n}\n.switch.on[_ngcontent-%COMP%]   .knob[_ngcontent-%COMP%] {\n  transform: translateX(20px);\n  background: var(--accent-d);\n}\n/*# sourceMappingURL=poll-create.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PollCreateComponent, { className: "PollCreateComponent", filePath: "src\\app\\features\\community\\components\\poll-create\\poll-create.component.ts", lineNumber: 155 });
})();

// src/app/features/community/components/scheduled-posts/scheduled-posts.component.ts
function ScheduledPostsComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0 ", ctx_r0.error(), "");
  }
}
function ScheduledPostsComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function ScheduledPostsComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Nothing scheduled.");
    \u0275\u0275elementEnd();
  }
}
function ScheduledPostsComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "span", 20);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 22);
    \u0275\u0275listener("click", function ScheduledPostsComponent_div_22_Template_button_click_7_listener() {
      const s_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancel(s_r3));
    });
    \u0275\u0275text(8, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 2, s_r3.scheduled_for, "MMM d, h:mm a"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r3.content);
  }
}
var ScheduledPostsComponent = class _ScheduledPostsComponent {
  constructor() {
    this.close = new EventEmitter();
    this.api = inject(CommunityService);
    this.items = signal([]);
    this.loading = signal(true);
    this.saving = signal(false);
    this.error = signal(null);
    this.newContent = "";
    this.newWhen = "";
    this.minWhen = this.toLocalInput(new Date(Date.now() + 6e4));
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.api.listScheduled(this.channelId).subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  canSchedule() {
    return this.newContent.trim().length > 0 && this.newWhen.length > 0;
  }
  schedule() {
    if (!this.canSchedule())
      return;
    const when = new Date(this.newWhen);
    if (when.getTime() <= Date.now()) {
      this.error.set("Pick a time in the future.");
      return;
    }
    this.error.set(null);
    this.saving.set(true);
    this.api.scheduleMessage(this.channelId, this.newContent.trim(), when.toISOString()).subscribe({
      next: (created) => {
        this.items.update((list) => [...list, created].sort((a, b) => new Date(a.scheduled_for).getTime() - new Date(b.scheduled_for).getTime()));
        this.newContent = "";
        this.newWhen = "";
        this.saving.set(false);
      },
      error: (e) => {
        this.saving.set(false);
        this.error.set(e?.error?.errors?.scheduled_for?.[0] ?? e?.error?.message ?? "Could not schedule.");
      }
    });
  }
  cancel(s) {
    this.api.cancelScheduled(s.id).subscribe(() => {
      this.items.update((list) => list.filter((x) => x.id !== s.id));
    });
  }
  toLocalInput(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  onBackdrop(ev) {
    if (ev.target.classList.contains("overlay"))
      this.close.emit();
  }
  static {
    this.\u0275fac = function ScheduledPostsComponent_Factory(t) {
      return new (t || _ScheduledPostsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScheduledPostsComponent, selectors: [["app-scheduled-posts"]], inputs: { channelId: "channelId" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 9, consts: [[1, "overlay", 3, "click"], [1, "card"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "content"], [1, "block"], ["rows", "3", "maxlength", "4000", "placeholder", "What should it say?", 1, "f", 3, "ngModelChange", "ngModel"], [1, "when"], ["type", "datetime-local", 1, "f", 3, "ngModelChange", "ngModel", "min"], [1, "schedule", 3, "click", "disabled"], ["class", "err", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "hint", 4, "ngIf"], ["class", "item", 4, "ngFor", "ngForOf"], [1, "err"], [1, "loading"], [1, "hint"], [1, "item"], [1, "i-main"], [1, "i-when"], [1, "i-content"], [1, "mini", "danger", 3, "click"]], template: function ScheduledPostsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ScheduledPostsComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "header", 2)(3, "span", 3);
        \u0275\u0275text(4, "Scheduled posts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function ScheduledPostsComponent_Template_button_click_5_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(6, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "section", 6)(9, "h4");
        \u0275\u0275text(10, "Schedule a message");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "textarea", 7);
        \u0275\u0275twoWayListener("ngModelChange", function ScheduledPostsComponent_Template_textarea_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.newContent, $event) || (ctx.newContent = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 8)(13, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function ScheduledPostsComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.newWhen, $event) || (ctx.newWhen = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 10);
        \u0275\u0275listener("click", function ScheduledPostsComponent_Template_button_click_14_listener() {
          return ctx.schedule();
        });
        \u0275\u0275text(15);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(16, ScheduledPostsComponent_p_16_Template, 2, 1, "p", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "section", 6)(18, "h4");
        \u0275\u0275text(19, "Pending");
        \u0275\u0275elementEnd();
        \u0275\u0275template(20, ScheduledPostsComponent_div_20_Template, 2, 0, "div", 12)(21, ScheduledPostsComponent_p_21_Template, 2, 0, "p", 13)(22, ScheduledPostsComponent_div_22_Template, 9, 5, "div", 14);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.newContent);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.newWhen);
        \u0275\u0275property("min", ctx.minWhen);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.canSchedule() || ctx.saving());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Scheduling\u2026" : "Schedule", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && ctx.items().length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.items());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.18);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 970;\n  background: rgba(0, 0, 0, 0.6);\n  display: grid;\n  place-items: center;\n  padding: 1.5rem;\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 520px;\n  max-height: 82vh;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.2rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.25rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.content[_ngcontent-%COMP%] {\n  padding: 1.1rem 1.2rem;\n  overflow-y: auto;\n  min-height: 0;\n}\n.block[_ngcontent-%COMP%] {\n  margin-bottom: 1.4rem;\n}\nh4[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--mut);\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.f[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--raised);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 0.55rem 0.7rem;\n  color: var(--text);\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 0.92rem;\n}\n.f[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n}\ntextarea.f[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.5;\n  margin-bottom: 0.5rem;\n}\n.when[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.when[_ngcontent-%COMP%]   .f[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.schedule[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.55rem 1rem;\n  font-weight: 700;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.schedule[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n.schedule[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.err[_ngcontent-%COMP%] {\n  color: #ff8a8a;\n  font-size: 0.82rem;\n  margin: 0.5rem 0 0;\n}\n.loading[_ngcontent-%COMP%], .hint[_ngcontent-%COMP%] {\n  color: var(--mut);\n  font-size: 0.85rem;\n}\n.item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.55rem 0.6rem;\n  background: var(--raised);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  margin-bottom: 0.45rem;\n}\n.i-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.i-when[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.72rem;\n  color: var(--accent-s);\n}\n.i-content[_ngcontent-%COMP%] {\n  color: #dcdce8;\n  font-size: 0.88rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.mini[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--line);\n  color: #cfcfe0;\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.76rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.mini.danger[_ngcontent-%COMP%]:hover {\n  border-color: #ff6b6b;\n  color: #ff6b6b;\n}\n/*# sourceMappingURL=scheduled-posts.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScheduledPostsComponent, { className: "ScheduledPostsComponent", filePath: "src\\app\\features\\community\\components\\scheduled-posts\\scheduled-posts.component.ts", lineNumber: 86 });
})();

// src/app/features/community/components/message-composer/message-composer.component.ts
function MessageComposerComponent_app_poll_create_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-poll-create", 29);
    \u0275\u0275listener("cancel", function MessageComposerComponent_app_poll_create_1_Template_app_poll_create_cancel_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showPollForm.set(false));
    })("created", function MessageComposerComponent_app_poll_create_1_Template_app_poll_create_created_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showPollForm.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("channelId", ctx_r2.channelId());
  }
}
function MessageComposerComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2, "\u21B3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 32);
    \u0275\u0275text(4, "Replying to ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 33);
    \u0275\u0275listener("click", function MessageComposerComponent_div_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelReply());
    });
    \u0275\u0275text(8, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const r_r5 = ctx.ngIf;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((tmp_4_0 = r_r5.author.nickname) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "Unknown");
  }
}
function MessageComposerComponent_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "img", 38);
    \u0275\u0275elementStart(2, "button", 39);
    \u0275\u0275listener("click", function MessageComposerComponent_div_3_div_1_Template_button_click_2_listener() {
      const i_r7 = \u0275\u0275restoreView(_r6).index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeImage(i_r7));
    });
    \u0275\u0275text(3, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", p_r8, \u0275\u0275sanitizeUrl);
  }
}
function MessageComposerComponent_div_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Uploading\u2026");
    \u0275\u0275elementEnd();
  }
}
function MessageComposerComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275template(1, MessageComposerComponent_div_3_div_1_Template, 4, 1, "div", 35)(2, MessageComposerComponent_div_3_span_2_Template, 2, 0, "span", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.previews());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isUploading());
  }
}
function MessageComposerComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "span", 42)(2, "span", 42)(3, "span", 42);
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r2.typingUser(), " is typing\u2026");
  }
}
function MessageComposerComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 45);
    \u0275\u0275listener("click", function MessageComposerComponent_div_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismissError());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0 ", ctx_r2.postError(), "");
  }
}
function MessageComposerComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function MessageComposerComponent_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showScheduled.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 10);
    \u0275\u0275element(2, "circle", 11)(3, "polyline", 47);
    \u0275\u0275elementEnd()();
  }
}
function MessageComposerComponent_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function MessageComposerComponent_button_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startVoice());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 10);
    \u0275\u0275element(2, "path", 49)(3, "path", 50)(4, "line", 51)(5, "line", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.rec.supported())("title", ctx_r2.rec.supported() ? "Record voice message" : "Recording not supported");
  }
}
function MessageComposerComponent_app_reaction_picker_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-reaction-picker", 53);
    \u0275\u0275listener("pick", function MessageComposerComponent_app_reaction_picker_27_Template_app_reaction_picker_pick_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.insertEmoji($event));
    })("close", function MessageComposerComponent_app_reaction_picker_27_Template_app_reaction_picker_close_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.pickerOpen.set(false));
    });
    \u0275\u0275elementEnd();
  }
}
function MessageComposerComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-mention-textarea", 54);
    \u0275\u0275listener("valueChange", function MessageComposerComponent_ng_container_28_Template_app_mention_textarea_valueChange_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.content.set($event));
    })("submit", function MessageComposerComponent_ng_container_28_Template_app_mention_textarea_submit_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.send());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 55);
    \u0275\u0275listener("click", function MessageComposerComponent_ng_container_28_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.send());
    });
    \u0275\u0275text(3, "Send");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.content())("placeholder", ctx_r2.placeholder());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canSend());
  }
}
function MessageComposerComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "span", 57);
    \u0275\u0275elementStart(2, "span", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 59);
    \u0275\u0275text(5, "Recording\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 60);
    \u0275\u0275listener("click", function MessageComposerComponent_ng_template_29_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelVoice());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 61);
    \u0275\u0275element(8, "line", 62)(9, "line", 63);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "button", 55);
    \u0275\u0275listener("click", function MessageComposerComponent_ng_template_29_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.stopAndSendVoice());
    });
    \u0275\u0275text(11, "Send");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.recTime());
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r2.isUploading());
  }
}
function MessageComposerComponent_app_scheduled_posts_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-scheduled-posts", 64);
    \u0275\u0275listener("close", function MessageComposerComponent_app_scheduled_posts_31_Template_app_scheduled_posts_close_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showScheduled.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("channelId", ctx_r2.channelId());
  }
}
var MessageComposerComponent = class _MessageComposerComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.rec = inject(VoiceRecorderService);
    this.toast = inject(ToastService);
    this.showScheduled = signal(false);
    this.typingUser = signal(null);
    this.postError = this.state.postError;
    this.content = signal("");
    this.pickerOpen = signal(false);
    this.showPollForm = signal(false);
    this.isPosting = this.state.isPosting;
    this.isUploading = this.state.isUploading;
    this.selectedImages = signal([]);
    this.previews = signal([]);
    this.channelId = this.state.activeChannelId;
    this.channel = this.state.activeChannel;
    this.placeholder = computed(() => {
      const c = this.channel();
      return c ? `Message #${c.name}` : "Select a channel";
    });
    this.canPost = computed(() => {
      const c = this.channel();
      return !!c && !c.is_archived;
    });
    this.canSend = computed(() => this.canPost() && !this.isPosting() && !this.isUploading() && (this.content().trim().length > 0 || this.selectedImages().length > 0));
    this.replyingTo = this.state.replyingTo;
  }
  /** Mods/admins of the active community see the schedule + (server-enforced). */
  canModerate() {
    const role = this.auth.currentUser()?.role;
    if (role === "admin")
      return true;
    const uid = this.auth.currentUser()?.id;
    const cid = this.state.activeCommunityId();
    if (!uid || !cid)
      return false;
    const me = (this.state.membersByCommunity()[cid] ?? []).find((m) => m.user?.id === uid);
    return me ? ["owner", "admin", "moderator"].includes(me.role) : false;
  }
  send() {
    if (!this.canSend())
      return;
    const channelId = this.state.activeChannelId();
    if (!channelId)
      return;
    const images = this.selectedImages();
    if (images.length > 0) {
      this.state.uploadImages(channelId, images, this.content().trim());
      this.clearImages();
      this.content.set("");
      return;
    }
    this.state.post(channelId, this.content().trim());
    this.content.set("");
  }
  /** Dismiss the blocked-word / post error banner. */
  dismissError() {
    this.state.postError.set(null);
  }
  // ── Voice notes ───────────────────────────────────────────────────
  recTime() {
    const s = Math.floor(this.rec.elapsedMs() / 1e3);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  }
  startVoice() {
    return __async(this, null, function* () {
      if (!this.canPost()) {
        this.toast.error("You cannot post in this channel.");
        return;
      }
      try {
        yield this.rec.start();
      } catch {
        this.toast.error("Microphone access is needed to record.");
      }
    });
  }
  cancelVoice() {
    this.rec.cancel();
  }
  stopAndSendVoice() {
    return __async(this, null, function* () {
      const channelId = this.state.activeChannelId();
      if (!channelId) {
        this.rec.cancel();
        return;
      }
      let clip;
      try {
        clip = yield this.rec.stop();
      } catch {
        this.toast.error("Recording failed.");
        return;
      }
      if (clip.durationMs < 500) {
        this.toast.info("Too short \u2014 hold a moment longer.");
        return;
      }
      this.state.uploadVoice(channelId, clip.blob, clip.durationMs);
    });
  }
  onFilesPicked(event) {
    const input = event.target;
    const files = input.files ? Array.from(input.files) : [];
    if (files.length === 0)
      return;
    const images = files.filter((f) => f.type.startsWith("image/"));
    this.selectedImages.update((prev) => [...prev, ...images].slice(0, 10));
    this.rebuildPreviews();
    input.value = "";
  }
  removeImage(i) {
    this.selectedImages.update((arr) => arr.filter((_, idx) => idx !== i));
    this.rebuildPreviews();
  }
  rebuildPreviews() {
    for (const url of this.previews())
      URL.revokeObjectURL(url);
    this.previews.set(this.selectedImages().map((f) => URL.createObjectURL(f)));
  }
  clearImages() {
    for (const url of this.previews())
      URL.revokeObjectURL(url);
    this.previews.set([]);
    this.selectedImages.set([]);
  }
  cancelReply() {
    this.state.clearReplyTo();
  }
  togglePicker() {
    this.pickerOpen.update((v) => !v);
  }
  togglePollForm() {
    this.showPollForm.update((v) => !v);
  }
  insertEmoji(emoji) {
    this.content.update((c) => c + emoji);
    this.pickerOpen.set(false);
  }
  static {
    this.\u0275fac = function MessageComposerComponent_Factory(t) {
      return new (t || _MessageComposerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MessageComposerComponent, selectors: [["app-message-composer"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 11, consts: [["fileInput", ""], ["recBar", ""], [1, "composer-wrap"], [3, "channelId", "cancel", "created", 4, "ngIf"], ["class", "reply-banner", 4, "ngIf"], ["class", "preview-strip", 4, "ngIf"], ["class", "typing-indicator", 4, "ngIf"], ["class", "post-error", 4, "ngIf"], [1, "composer"], ["title", "Insert emoji", 1, "icon-btn", "emoji-btn", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M8 14s1.5 2 4 2 4-2 4-2"], ["x1", "9", "y1", "9", "x2", "9.01", "y2", "9"], ["x1", "15", "y1", "9", "x2", "15.01", "y2", "9"], ["title", "Create a poll", 1, "icon-btn", "poll-btn", 3, "click"], ["x1", "18", "y1", "20", "x2", "18", "y2", "10"], ["x1", "12", "y1", "20", "x2", "12", "y2", "4"], ["x1", "6", "y1", "20", "x2", "6", "y2", "14"], ["class", "icon-btn sched-btn", "title", "Scheduled posts", 3, "click", 4, "ngIf"], ["title", "Attach images", 1, "icon-btn", "img-btn", 3, "click"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["points", "21 15 16 10 5 21"], ["class", "icon-btn mic-btn", 3, "disabled", "title", "click", 4, "ngIf"], ["type", "file", "accept", "image/jpeg,image/png,image/webp,image/gif", "multiple", "", "hidden", "", 3, "change"], [3, "pick", "close", 4, "ngIf"], [4, "ngIf", "ngIfElse"], [3, "channelId", "close", 4, "ngIf"], [3, "cancel", "created", "channelId"], [1, "reply-banner"], [1, "rb-icon"], [1, "rb-text"], ["title", "Cancel reply", 1, "rb-cancel", 3, "click"], [1, "preview-strip"], ["class", "preview", 4, "ngFor", "ngForOf"], ["class", "upinfo", 4, "ngIf"], [1, "preview"], ["alt", "", 3, "src"], ["title", "Remove", 1, "rm", 3, "click"], [1, "upinfo"], [1, "typing-indicator"], [1, "typing-dot"], [2, "margin-left", "4px"], [1, "post-error"], ["title", "Dismiss", 1, "pe-x", 3, "click"], ["title", "Scheduled posts", 1, "icon-btn", "sched-btn", 3, "click"], ["points", "12 6 12 12 16 14"], [1, "icon-btn", "mic-btn", 3, "click", "disabled", "title"], ["d", "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"], ["d", "M19 10v2a7 7 0 0 1-14 0v-2"], ["x1", "12", "y1", "19", "x2", "12", "y2", "23"], ["x1", "8", "y1", "23", "x2", "16", "y2", "23"], [3, "pick", "close"], [1, "mention-field", 3, "valueChange", "submit", "value", "placeholder"], [1, "send", 3, "click", "disabled"], [1, "rec-bar"], [1, "rec-dot"], [1, "rec-time"], [1, "rec-label"], ["title", "Cancel", 1, "rec-cancel", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [3, "close", "channelId"]], template: function MessageComposerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275template(1, MessageComposerComponent_app_poll_create_1_Template, 1, 1, "app-poll-create", 3)(2, MessageComposerComponent_div_2_Template, 9, 1, "div", 4)(3, MessageComposerComponent_div_3_Template, 3, 2, "div", 5)(4, MessageComposerComponent_div_4_Template, 6, 1, "div", 6)(5, MessageComposerComponent_div_5_Template, 5, 1, "div", 7);
        \u0275\u0275elementStart(6, "div", 8)(7, "button", 9);
        \u0275\u0275listener("click", function MessageComposerComponent_Template_button_click_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.togglePicker());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 10);
        \u0275\u0275element(9, "circle", 11)(10, "path", 12)(11, "line", 13)(12, "line", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(13, "button", 15);
        \u0275\u0275listener("click", function MessageComposerComponent_Template_button_click_13_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.togglePollForm());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(14, "svg", 10);
        \u0275\u0275element(15, "line", 16)(16, "line", 17)(17, "line", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(18, MessageComposerComponent_button_18_Template, 4, 0, "button", 19);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(19, "button", 20);
        \u0275\u0275listener("click", function MessageComposerComponent_Template_button_click_19_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r11 = \u0275\u0275reference(26);
          return \u0275\u0275resetView(fileInput_r11.click());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(20, "svg", 10);
        \u0275\u0275element(21, "rect", 21)(22, "circle", 22)(23, "polyline", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, MessageComposerComponent_button_24_Template, 6, 2, "button", 24);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "input", 25, 0);
        \u0275\u0275listener("change", function MessageComposerComponent_Template_input_change_25_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFilesPicked($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, MessageComposerComponent_app_reaction_picker_27_Template, 1, 0, "app-reaction-picker", 26)(28, MessageComposerComponent_ng_container_28_Template, 4, 3, "ng-container", 27)(29, MessageComposerComponent_ng_template_29_Template, 12, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(31, MessageComposerComponent_app_scheduled_posts_31_Template, 1, 1, "app-scheduled-posts", 28);
      }
      if (rf & 2) {
        const recBar_r17 = \u0275\u0275reference(30);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPollForm() && ctx.channelId());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.replyingTo());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedImages().length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.typingUser());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.postError());
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.canModerate());
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", !ctx.rec.recording());
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.pickerOpen());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.rec.recording())("ngIfElse", recBar_r17);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.showScheduled() && ctx.channelId());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, ReactionPickerComponent, MentionTextareaComponent, PollCreateComponent, ScheduledPostsComponent], styles: ['\n\n.composer-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n}\n.reply-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.45rem 1.1rem;\n  background: #110f1e;\n  border-top: 1px solid rgba(124, 58, 237, 0.22);\n  font-size: 0.82rem;\n  color: #9a9ab0;\n}\n.rb-icon[_ngcontent-%COMP%] {\n  color: #a78bfa;\n}\n.rb-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #eaeaf2;\n}\n.rb-cancel[_ngcontent-%COMP%] {\n  margin-inline-start: auto;\n  background: none;\n  border: none;\n  color: #7a7a92;\n  cursor: pointer;\n  font-size: 0.9rem;\n  padding: 0 0.3rem;\n}\n.rb-cancel[_ngcontent-%COMP%]:hover {\n  color: #ff6b6b;\n}\n.post-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin: 0 1rem 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background: rgba(255, 107, 107, 0.1);\n  border: 1px solid rgba(255, 107, 107, 0.35);\n  border-radius: 8px;\n  color: #ff8a8a;\n  font-size: 0.84rem;\n}\n.pe-x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #ff8a8a;\n  cursor: pointer;\n  font-size: 0.85rem;\n}\n@keyframes _ngcontent-%COMP%_typingBounce {\n  0%, 80%, 100% {\n    transform: translateY(0);\n    opacity: .4;\n  }\n  40% {\n    transform: translateY(-6px);\n    opacity: 1;\n  }\n}\n.composer[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  gap: 0.4rem;\n  padding: 0.75rem 1rem;\n  border-top: 1px solid rgba(124, 58, 237, 0.15);\n  background: #0b0a14;\n  flex-shrink: 0;\n  align-items: flex-end;\n  transition: box-shadow 0.2s ease;\n}\n.composer[_ngcontent-%COMP%]:focus-within {\n  box-shadow: 0 -2px 20px rgba(124, 58, 237, 0.18);\n  border-top-color: rgba(124, 58, 237, 0.4);\n}\n.mention-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.typing-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  padding: 0.3rem 0.75rem;\n  background: rgba(124, 58, 237, 0.1);\n  border: 1px solid rgba(124, 58, 237, 0.2);\n  border-radius: 999px;\n  font-size: 0.75rem;\n  color: #7a7a92;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  margin: 0 1rem 0.4rem;\n  align-self: flex-start;\n  flex-shrink: 0;\n}\n.typing-dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: #a78bfa;\n  animation: _ngcontent-%COMP%_typingBounce 1.2s ease-in-out infinite;\n  &:nth-child(2) {\n    animation-delay: .15s;\n  }\n  &:nth-child(3) {\n    animation-delay: .3s;\n  }\n}\n.send[_ngcontent-%COMP%] {\n  background: #7c3aed;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.5rem 1.1rem;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.875rem;\n  transition: background 0.14s, box-shadow 0.14s;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.send[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 18px rgba(124, 58, 237, 0.45);\n}\n.send[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: #5a5a72;\n  padding: 0.4rem;\n  border-radius: 7px;\n  display: grid;\n  place-items: center;\n  transition: color 0.14s, background 0.14s;\n  flex-shrink: 0;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  color: #a78bfa;\n  background: rgba(124, 58, 237, 0.12);\n}\n.preview-strip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  align-items: center;\n  padding: 0.6rem 1.1rem;\n  border-top: 1px solid rgba(124, 58, 237, 0.18);\n  background: #110f1e;\n}\n.preview[_ngcontent-%COMP%] {\n  position: relative;\n  width: 64px;\n  height: 64px;\n  border-radius: 8px;\n  overflow: hidden;\n  border: 1px solid rgba(124, 58, 237, 0.25);\n}\n.preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.preview[_ngcontent-%COMP%]   .rm[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: none;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  font-size: 0.6rem;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  line-height: 1;\n}\n.preview[_ngcontent-%COMP%]   .rm[_ngcontent-%COMP%]:hover {\n  background: #ff6b6b;\n}\n.upinfo[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #a78bfa;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.rec-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0 6px;\n}\n.rec-dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #ef4444;\n  box-shadow: 0 0 8px #ef4444;\n  animation: _ngcontent-%COMP%_recPulse 1.1s ease-in-out infinite;\n  flex-shrink: 0;\n}\n.rec-time[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.85rem;\n  color: #eaeaf2;\n  min-width: 38px;\n}\n.rec-label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.82rem;\n  color: #7a7a92;\n}\n.rec-cancel[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, .14);\n  color: #7a7a92;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n}\n.rec-cancel[_ngcontent-%COMP%]:hover {\n  color: #fca5a5;\n  border-color: rgba(239, 68, 68, .4);\n}\n@keyframes _ngcontent-%COMP%_recPulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: .35;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .rec-dot[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=message-composer.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MessageComposerComponent, { className: "MessageComposerComponent", filePath: "src\\app\\features\\community\\components\\message-composer\\message-composer.component.ts", lineNumber: 204 });
})();

// src/app/features/community/components/member-list/member-list.component.ts
var _forTrack0 = ($index, $item) => $item.role;
var _forTrack1 = ($index, $item) => $item.user.id;
var _forTrack2 = ($index, $item) => $item.minutes;
var _c02 = () => [1, 2, 3, 4, 5];
function MemberListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function MemberListComponent_Conditional_24_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.search.set("");
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "line", 25)(3, "line", 26);
    \u0275\u0275elementEnd()();
  }
}
function MemberListComponent_Conditional_25_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 28);
  }
}
function MemberListComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "div", 27);
    \u0275\u0275repeaterCreate(2, MemberListComponent_Conditional_25_For_3_Template, 1, 0, "div", 28, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c02));
  }
}
function MemberListComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 29);
    \u0275\u0275element(2, "circle", 17)(3, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ' No members match "');
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, '" ');
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.search());
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 36);
    \u0275\u0275element(1, "polyline", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ml-collapse-icon--open", !ctx_r1.isCollapsed(group_r4.role));
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 43);
  }
  if (rf & 2) {
    let tmp_24_0;
    const m_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", m_r6.user.avatar, \u0275\u0275sanitizeUrl)("alt", (tmp_24_0 = m_r6.user.nickname) !== null && tmp_24_0 !== void 0 ? tmp_24_0 : "");
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.initials(m_r6.user.nickname));
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "line", 50)(3, "path", 51)(4, "path", 52)(5, "line", 53)(6, "line", 54);
    \u0275\u0275elementEnd()();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_8_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addFriend(m_r6, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "circle", 5)(4, "line", 58)(5, "line", 59);
    \u0275\u0275elementEnd()();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_9_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.acceptFriend(m_r6, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 61);
    \u0275\u0275element(2, "polyline", 62);
    \u0275\u0275elementEnd()();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "circle", 64)(3, "polyline", 65);
    \u0275\u0275elementEnd()();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_11_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.messageFriend(m_r6, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 67);
    \u0275\u0275elementEnd()();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_12_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const m_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(m_r6.user.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 69);
    \u0275\u0275element(2, "circle", 70)(3, "circle", 71)(4, "circle", 72);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275propertyInterpolate1("title", "Moderate ", m_r6.user.nickname, "");
    \u0275\u0275attribute("aria-expanded", ctx_r1.openMenuFor() === m_r6.user.id);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 79);
    \u0275\u0275listener("ngModelChange", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Conditional_1_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.updatePendingReason($event));
    })("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Conditional_1_Template_input_click_2_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Ban ", m_r6.user.nickname, "?");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.pendingAction().reason);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Remove ", m_r6.user.nickname, "?");
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275template(1, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Conditional_1_Template, 3, 2)(2, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Conditional_2_Template, 2, 1);
    \u0275\u0275elementStart(3, "div", 75)(4, "button", 76);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.pendingAction.set(null));
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 77);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.executePending());
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.pendingAction().type === "ban" ? 1 : 2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.pendingAction().type === "ban" ? "Ban" : "Remove", " ");
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_0_For_4_Template_button_click_0_listener() {
      const opt_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const m_r6 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.mute(m_r6, opt_r16.minutes));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r16.label);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "span", 83);
    \u0275\u0275text(2, "Mute for\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_0_For_4_Template, 2, 1, "button", null, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.muteOptions);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const m_r6 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.unmute(m_r6));
    });
    \u0275\u0275text(1, "Unmute");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 82);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const m_r6 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.startBan(m_r6));
    });
    \u0275\u0275text(1, "Ban\u2026");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const m_r6 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.unban(m_r6));
    });
    \u0275\u0275text(1, "Unban");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const m_r6 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setRole(m_r6, "admin"));
    });
    \u0275\u0275text(1, "Make admin");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const m_r6 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setRole(m_r6, "moderator"));
    });
    \u0275\u0275text(1, "Make moderator");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r22);
      const m_r6 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setRole(m_r6, "member"));
    });
    \u0275\u0275text(1, "Make member");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "span", 83);
    \u0275\u0275text(2, "Set role");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_3_Template, 2, 0, "button")(4, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_4_Template, 2, 0, "button")(5, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Conditional_5_Template, 2, 0, "button");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, m_r6.role !== "admin" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, m_r6.role !== "moderator" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, m_r6.role !== "member" ? 5 : -1);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_0_Template, 5, 0, "div", 80)(1, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_1_Template, 2, 0)(2, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_2_Template, 2, 0, "button", 81)(3, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_3_Template, 2, 0);
    \u0275\u0275elementStart(4, "button", 82);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r14);
      const m_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.startKick(m_r6));
    });
    \u0275\u0275text(5, "Remove from community");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Conditional_6_Template, 6, 3, "div", 80);
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(0, !m_r6.is_muted ? 0 : 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, !m_r6.is_banned ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(6, ctx_r1.canChangeRoles() ? 6 : -1);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_1_Template, 8, 2, "div", 74)(2, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Conditional_2_Template, 7, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.pendingAction() !== null && ctx_r1.pendingAction().member.user.id === m_r6.user.id ? 1 : 2);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 40);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Template_li_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(1, "span", 41);
    \u0275\u0275elementStart(2, "span", 42);
    \u0275\u0275template(3, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_3_Template, 1, 2, "img", 43)(4, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_4_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_7_Template, 7, 0, "span", 45)(8, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_8_Template, 6, 0)(9, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_9_Template, 3, 0)(10, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_10_Template, 4, 0)(11, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Case_11_Template, 3, 0)(12, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_12_Template, 5, 3, "button", 46)(13, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Conditional_13_Template, 3, 1, "div", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_26_0;
    let tmp_28_0;
    const m_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("ml-row--has-menu", ctx_r1.openMenuFor() === m_r6.user.id);
    \u0275\u0275advance();
    \u0275\u0275classMap("ml-dot--" + ctx_r1.presence(m_r6.user.id));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, m_r6.user.avatar ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ml-nick--muted", m_r6.is_muted);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_26_0 = m_r6.user.nickname) !== null && tmp_26_0 !== void 0 ? tmp_26_0 : "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional(7, m_r6.is_muted ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, (tmp_28_0 = ctx_r1.friendRel(m_r6.user.id)) === "none" ? 8 : tmp_28_0 === "pending_incoming" ? 9 : tmp_28_0 === "pending_outgoing" ? 10 : tmp_28_0 === "friends" ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(12, ctx_r1.canModerate(m_r6) ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, ctx_r1.openMenuFor() === m_r6.user.id ? 13 : -1);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.membersExpanded.set(false));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 85);
    \u0275\u0275element(2, "polyline", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Show less ");
    \u0275\u0275elementEnd();
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.membersExpanded.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 85);
    \u0275\u0275element(2, "polyline", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Show ", ctx_r1.visibleMembers(group_r4).length - ctx_r1.memberPageSize, " more ");
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 39);
    \u0275\u0275template(1, MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Conditional_1_Template, 4, 0, "button")(2, MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Conditional_2_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.membersExpanded() ? 1 : 2);
  }
}
function MemberListComponent_For_28_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275repeaterCreate(1, MemberListComponent_For_28_Conditional_0_Conditional_8_For_2_Template, 14, 12, "li", 38, _forTrack1);
    \u0275\u0275template(3, MemberListComponent_For_28_Conditional_0_Conditional_8_Conditional_3_Template, 3, 1, "li", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.displayedMembers(group_r4));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, group_r4.role === "member" && ctx_r1.visibleMembers(group_r4).length > ctx_r1.memberPageSize ? 3 : -1);
  }
}
function MemberListComponent_For_28_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 30)(1, "button", 31);
    \u0275\u0275listener("click", function MemberListComponent_For_28_Conditional_0_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const group_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      group_r4.role === "member" ? ctx_r1.toggleCollapse(group_r4.role) : null;
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(2, MemberListComponent_For_28_Conditional_0_Conditional_2_Template, 2, 2, ":svg:svg", 32);
    \u0275\u0275elementStart(3, "span", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 34);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, MemberListComponent_For_28_Conditional_0_Conditional_8_Template, 4, 1, "ul");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("ml-group-head--collapsible", group_r4.role === "member");
    \u0275\u0275advance();
    \u0275\u0275conditional(2, group_r4.role === "member" ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.visibleMembers(group_r4).length);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, !ctx_r1.isCollapsed(group_r4.role) ? 8 : -1);
  }
}
function MemberListComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MemberListComponent_For_28_Conditional_0_Template, 9, 6, "section", 30);
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r1.visibleMembers(group_r4).length > 0 ? 0 : -1);
  }
}
var MemberListComponent = class _MemberListComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.friends = inject(FriendService);
    this.dm = inject(DmService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.muteOptions = [
      { label: "5 minutes", minutes: 5 },
      { label: "30 minutes", minutes: 30 },
      { label: "1 hour", minutes: 60 },
      { label: "4 hours", minutes: 240 },
      { label: "1 day", minutes: 1440 },
      { label: "1 week", minutes: 10080 }
    ];
    this.openMenuFor = signal(null);
    this.search = signal("");
    this.showOnlineOnly = signal(false);
    this.membersExpanded = signal(false);
    this.collapsedGroups = signal(/* @__PURE__ */ new Set());
    this.pendingAction = signal(null);
    this.memberPageSize = 30;
    this.totalCount = computed(() => {
      const communityId = this.state.activeCommunityId();
      return communityId ? (this.state.membersByCommunity()[communityId] ?? []).length : 0;
    });
    this.onlineCount = computed(() => {
      const communityId = this.state.activeCommunityId();
      if (!communityId)
        return 0;
      return (this.state.membersByCommunity()[communityId] ?? []).filter((m) => this.state.presenceByUser()[m.user.id] === "online").length;
    });
    this.groups = computed(() => {
      const communityId = this.state.activeCommunityId();
      if (!communityId)
        return [];
      const q = this.search().toLowerCase().trim();
      const onlyOnline = this.showOnlineOnly();
      const members = (this.state.membersByCommunity()[communityId] ?? []).filter((m) => {
        if (q && !(m.user.nickname ?? "").toLowerCase().includes(q))
          return false;
        if (onlyOnline && this.state.presenceByUser()[m.user.id] !== "online")
          return false;
        return true;
      }).sort((a, b) => {
        const presenceOrder = { online: 0, idle: 1, offline: 2 };
        const pa = presenceOrder[this.state.presenceByUser()[a.user.id] ?? "offline"] ?? 2;
        const pb = presenceOrder[this.state.presenceByUser()[b.user.id] ?? "offline"] ?? 2;
        return pa - pb;
      });
      const buckets = { owner: [], admin: [], moderator: [], member: [] };
      for (const m of members)
        buckets[m.role].push(m);
      const labelMap = {
        owner: "Owner",
        admin: "Admins",
        moderator: "Moderators",
        member: "Members"
      };
      return ["owner", "admin", "moderator", "member"].filter((role) => buckets[role].length > 0).map((role) => ({ role, label: labelMap[role], members: buckets[role] }));
    });
    this.filteredTotal = computed(() => this.groups().reduce((sum, g) => sum + g.members.length, 0));
    this.myMembership = computed(() => {
      const communityId = this.state.activeCommunityId();
      const myId = this.auth.currentUser()?.id;
      if (!communityId || !myId)
        return null;
      return (this.state.membersByCommunity()[communityId] ?? []).find((m) => m.user.id === myId) ?? null;
    });
    if (!this.friends.loaded())
      this.friends.load();
  }
  /** Relationship between me and a member, for the row's friend button. */
  friendRel(userId) {
    return this.friends.relationshipWith(userId);
  }
  /** Send a friend request to a member. */
  addFriend(m, ev) {
    ev.stopPropagation();
    const u = {
      id: m.user.id,
      name: m.user.nickname ?? "",
      nickname: m.user.nickname ?? null,
      display_name: m.user.nickname ?? "Player",
      avatar_url: m.user.avatar ?? null
    };
    this.friends.sendRequest(u).subscribe({
      next: (r) => this.toast.success(r.status === "friends" ? `You and ${u.display_name} are now friends.` : `Friend request sent to ${u.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not send request.")
    });
  }
  /** Accept a member's incoming request straight from the roster. */
  acceptFriend(m, ev) {
    ev.stopPropagation();
    const req = this.friends.requests().find((r) => r.user.id === m.user.id);
    if (!req)
      return;
    this.friends.accept(req).subscribe({
      next: () => this.toast.success(`You and ${req.user.display_name} are now friends.`),
      error: (e) => this.toast.error(e?.error?.message ?? "Failed.")
    });
  }
  /** Open a private chat with a friend from the roster. */
  messageFriend(m, ev) {
    ev.stopPropagation();
    const u = {
      id: m.user.id,
      name: m.user.nickname ?? "",
      nickname: m.user.nickname ?? null,
      display_name: m.user.nickname ?? "Player",
      avatar_url: m.user.avatar ?? null
    };
    this.dm.openWith(u).subscribe({
      next: () => this.router.navigate(["/community/home"], { queryParams: { pane: "messages" } }),
      error: (e) => this.toast.error(e?.error?.message ?? "Could not open chat.")
    });
  }
  /** Members filtered for display in a group (applies online-only + search already). */
  visibleMembers(group) {
    return group.members;
  }
  /** Displayed members — truncated for the Members group unless expanded. */
  displayedMembers(group) {
    if (group.role !== "member" || this.membersExpanded() || this.search()) {
      return group.members;
    }
    return group.members.slice(0, this.memberPageSize);
  }
  isCollapsed(role) {
    return this.collapsedGroups().has(role);
  }
  toggleCollapse(role) {
    this.collapsedGroups.update((set) => {
      const next = new Set(set);
      next.has(role) ? next.delete(role) : next.add(role);
      return next;
    });
  }
  isPlatformAdmin() {
    return this.auth.currentUser()?.role === "admin";
  }
  canChangeRoles() {
    return this.isPlatformAdmin() || this.myMembership()?.role === "owner";
  }
  canModerate(target) {
    const myId = this.auth.currentUser()?.id;
    if (!myId || target.user.id === myId)
      return false;
    if (target.role === "owner")
      return false;
    if (this.isPlatformAdmin())
      return true;
    const mine = this.myMembership();
    if (!mine)
      return false;
    if (mine.role === "owner" || mine.role === "admin")
      return true;
    if (mine.role === "moderator")
      return target.role === "member";
    return false;
  }
  // ── Menu actions ───────────────────────────────────────────────────────────
  toggleMenu(userId, ev) {
    ev.stopPropagation();
    this.pendingAction.set(null);
    this.openMenuFor.update((cur) => cur === userId ? null : userId);
  }
  closeMenu() {
    this.openMenuFor.set(null);
    this.pendingAction.set(null);
  }
  close() {
    this.closeMenu();
  }
  /** Start destructive action flow — shows inline confirmation instead of window.prompt/confirm */
  startBan(m) {
    this.pendingAction.set({ type: "ban", member: m, reason: "" });
  }
  startKick(m) {
    this.pendingAction.set({ type: "kick", member: m, reason: "" });
  }
  updatePendingReason(reason) {
    const a = this.pendingAction();
    if (a)
      this.pendingAction.set(__spreadProps(__spreadValues({}, a), { reason }));
  }
  executePending() {
    const a = this.pendingAction();
    if (!a)
      return;
    if (a.type === "ban") {
      if (!a.reason.trim())
        return;
      this.state.moderate({ action: "ban", user_id: a.member.user.id, reason: a.reason.trim() });
    } else {
      this.state.moderate({ action: "kick", user_id: a.member.user.id });
    }
    this.close();
  }
  mute(m, minutes) {
    this.state.moderate({ action: "mute", user_id: m.user.id, minutes });
    this.close();
  }
  unmute(m) {
    this.state.moderate({ action: "unmute", user_id: m.user.id });
    this.close();
  }
  unban(m) {
    this.state.moderate({ action: "unban", user_id: m.user.id });
    this.close();
  }
  setRole(m, role) {
    this.state.moderate({ action: "set_role", user_id: m.user.id, role });
    this.close();
  }
  presence(userId) {
    return this.state.presenceByUser()[userId] ?? "offline";
  }
  initials(nickname) {
    return (nickname ?? "?").slice(0, 2).toUpperCase();
  }
  static {
    this.\u0275fac = function MemberListComponent_Factory(t) {
      return new (t || _MemberListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MemberListComponent, selectors: [["app-member-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 29, vars: 8, consts: [[1, "ml-root", 3, "click"], [1, "ml-header"], [1, "ml-header__title"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "ml-header__total"], [1, "ml-header__pills"], [1, "ml-online-pill"], [1, "ml-online-dot"], ["title", "Show online only", 1, "ml-filter-btn", 3, "click"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "ml-search"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", 1, "ml-search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.3-4.3"], ["type", "text", "placeholder", "Search members\u2026", 1, "ml-search-input", 3, "ngModelChange", "click", "ngModel"], [1, "ml-search-clear"], [1, "skel-group"], [1, "ml-empty"], [1, "ml-search-clear", 3, "click"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "skel-label"], [1, "skel-row"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round"], [1, "ml-group"], [1, "ml-group-head", 3, "click"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "ml-collapse-icon", 3, "ml-collapse-icon--open"], [1, "ml-group-label"], [1, "ml-group-count"], [1, "ml-group-line"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "ml-collapse-icon"], ["points", "6 9 12 15 18 9"], [1, "ml-row", 3, "ml-row--has-menu"], [1, "ml-show-more"], [1, "ml-row", 3, "click"], ["aria-hidden", "true", 1, "ml-dot"], [1, "ml-ava"], [3, "src", "alt"], [1, "ml-nick"], ["title", "Muted", "aria-label", "Muted", 1, "ml-muted-icon"], [1, "ml-kebab", 3, "title"], [1, "ml-menu"], [1, "ml-ava-letter"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["d", "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"], ["d", "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"], ["x1", "12", "y1", "19", "x2", "12", "y2", "23"], ["x1", "8", "y1", "23", "x2", "16", "y2", "23"], ["title", "Add friend", "aria-label", "Add friend", 1, "ml-friend", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["x1", "19", "y1", "8", "x2", "19", "y2", "14"], ["x1", "22", "y1", "11", "x2", "16", "y2", "11"], ["title", "Accept friend request", "aria-label", "Accept friend request", 1, "ml-friend", "ml-friend--accept", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12"], ["title", "Request sent", "aria-label", "Request sent", 1, "ml-friend", "ml-friend--pending"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], ["title", "Message friend", "aria-label", "Message friend", 1, "ml-friend", "ml-friend--friends", 3, "click"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], [1, "ml-kebab", 3, "click", "title"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "currentColor"], ["cx", "12", "cy", "5", "r", "1.5"], ["cx", "12", "cy", "12", "r", "1.5"], ["cx", "12", "cy", "19", "r", "1.5"], [1, "ml-menu", 3, "click"], [1, "ml-confirm"], [1, "ml-confirm-actions"], [1, "ml-confirm-cancel", 3, "click"], [1, "ml-confirm-ok", "danger", 3, "click"], [1, "ml-confirm-title"], ["type", "text", "placeholder", "Reason (required)", 1, "ml-confirm-input", 3, "ngModelChange", "click", "ngModel"], [1, "ml-menu-group"], [1, "danger"], [1, "danger", 3, "click"], [1, "ml-menu-label"], [3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["points", "18 15 12 9 6 15"]], template: function MemberListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function MemberListComponent_Template_div_click_0_listener() {
          return ctx.closeMenu();
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4)(5, "circle", 5)(6, "path", 6)(7, "path", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(8, " Members ");
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(9, "span", 8);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 9)(12, "span", 10);
        \u0275\u0275element(13, "span", 11);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 12);
        \u0275\u0275listener("click", function MemberListComponent_Template_button_click_15_listener($event) {
          ctx.showOnlineOnly.set(!ctx.showOnlineOnly());
          return $event.stopPropagation();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(16, "svg", 3);
        \u0275\u0275element(17, "path", 13)(18, "polyline", 14);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(19, "div", 15);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(20, "svg", 16);
        \u0275\u0275element(21, "circle", 17)(22, "path", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(23, "input", 19);
        \u0275\u0275listener("ngModelChange", function MemberListComponent_Template_input_ngModelChange_23_listener($event) {
          return ctx.search.set($event);
        })("click", function MemberListComponent_Template_input_click_23_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, MemberListComponent_Conditional_24_Template, 4, 0, "button", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, MemberListComponent_Conditional_25_Template, 4, 1, "div", 21)(26, MemberListComponent_Conditional_26_Template, 8, 1, "div", 22);
        \u0275\u0275repeaterCreate(27, MemberListComponent_For_28_Template, 1, 1, null, null, _forTrack0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate(ctx.totalCount());
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.onlineCount(), " online ");
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.showOnlineOnly());
        \u0275\u0275advance(8);
        \u0275\u0275property("ngModel", ctx.search());
        \u0275\u0275advance();
        \u0275\u0275conditional(24, ctx.search() ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(25, ctx.groups().length === 0 ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.groups().length > 0 && ctx.filteredTotal() === 0 && ctx.search() ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.groups());
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_sonar {\n  0% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, .6);\n  }\n  70% {\n    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmerWave {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n.ml-root[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  font-size: 0.85rem;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(124, 58, 237, .2) transparent;\n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n  &::-webkit-scrollbar-thumb {\n    background: rgba(124, 58, 237, .25);\n    border-radius: 2px;\n  }\n}\n.ml-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  padding: 0.65rem 0.75rem 0.5rem;\n  background: rgba(17, 15, 30, .95);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border-bottom: 1px solid rgba(124, 58, 237, .12);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.ml-header__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.62rem;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #7c3aed;\n  svg {\n    flex-shrink: 0;\n  }\n}\n.ml-header__total[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, .15);\n  color: #a78bfa;\n  font-size: 0.6rem;\n  padding: 1px 6px;\n  border-radius: 100px;\n  font-weight: 700;\n}\n.ml-header__pills[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.ml-online-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.58rem;\n  letter-spacing: .8px;\n  color: #4ade80;\n  white-space: nowrap;\n}\n.ml-online-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #22c55e;\n  box-shadow: 0 0 6px rgba(34, 197, 94, .8);\n  animation: _ngcontent-%COMP%_sonar 2.5s ease-out infinite;\n}\n.ml-filter-btn[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  border: none;\n  background: transparent;\n  color: #5a5a72;\n  cursor: pointer;\n  display: grid;\n  place-items: center;\n  transition: all .14s;\n  &.active {\n    color: #4ade80;\n    background: rgba(34, 197, 94, .12);\n  }\n  &:hover {\n    color: #a78bfa;\n    background: rgba(124, 58, 237, .15);\n  }\n}\n.ml-search[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0.75rem;\n  border-bottom: 1px solid rgba(124, 58, 237, .1);\n}\n.ml-search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1.25rem;\n  color: #5a5a72;\n  flex-shrink: 0;\n}\n.ml-search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: rgba(124, 58, 237, .06);\n  border: 1px solid rgba(124, 58, 237, .15);\n  border-radius: 8px;\n  padding: 0.45rem 0.75rem 0.45rem 1.85rem;\n  color: #eaeaf2;\n  font-size: 0.8rem;\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  outline: none;\n  transition: border-color .14s, background .14s;\n  &::placeholder {\n    color: #4c4c63;\n  }\n  &:focus {\n    border-color: rgba(124, 58, 237, .4);\n    background: rgba(124, 58, 237, .1);\n  }\n}\n.ml-search-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 1.1rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #5a5a72;\n  display: grid;\n  place-items: center;\n  padding: 2px;\n  &:hover {\n    color: #eaeaf2;\n  }\n}\n.ml-empty[_ngcontent-%COMP%] {\n  padding: 1.5rem 0.75rem;\n  text-align: center;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.75rem;\n  color: #5a5a72;\n  line-height: 1.6;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  svg {\n    opacity: .4;\n  }\n}\n.ml-group[_ngcontent-%COMP%] {\n  padding: 0.6rem 0;\n}\n.ml-group-head[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.2rem 0.75rem;\n  background: none;\n  border: none;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.6rem;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #7c3aed;\n  &--collapsible {\n    cursor: pointer;\n    &:hover .ml-group-label {\n      color: #a78bfa;\n    }\n  }\n  &:not(.ml-group-head--collapsible) {\n    cursor: default;\n  }\n}\n.ml-collapse-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #5a5a72;\n  transition: transform .2s;\n  &--open {\n    transform: rotate(0deg);\n  }\n}\n.ml-group-label[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.ml-group-count[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, .12);\n  color: #7c3aed;\n  font-size: 0.58rem;\n  padding: 1px 5px;\n  border-radius: 100px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.ml-group-line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background: rgba(124, 58, 237, .18);\n}\nul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.ml-row[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.28rem 0.75rem;\n  border-radius: 6px;\n  transition: background .12s;\n  &:hover {\n    background: #1c1833;\n    .ml-kebab {\n      opacity: 1;\n    }\n  }\n  &--has-menu {\n    background: #1c1833;\n    .ml-kebab {\n      opacity: 1;\n    }\n  }\n}\n.ml-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #3a3a55;\n  flex-shrink: 0;\n}\n.ml-dot--online[_ngcontent-%COMP%] {\n  background: #22c55e;\n  animation: _ngcontent-%COMP%_sonar 2.5s ease-out infinite;\n}\n.ml-dot--idle[_ngcontent-%COMP%] {\n  background: #d4af37;\n}\n.ml-dot--offline[_ngcontent-%COMP%] {\n  background: #3a3a55;\n}\n.ml-ava[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background: #1c1833;\n  overflow: hidden;\n  box-shadow: inset 0 0 0 1px rgba(124, 58, 237, .25);\n  img {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    object-fit: cover;\n  }\n}\n.ml-ava-letter[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 0.7rem;\n  color: #a78bfa;\n  line-height: 1;\n}\n.ml-nick[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #c8cbe0;\n  font-size: 0.83rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.ml-nick--muted[_ngcontent-%COMP%] {\n  opacity: .5;\n  text-decoration: line-through;\n}\n.ml-muted-icon[_ngcontent-%COMP%] {\n  color: #f87171;\n  opacity: .7;\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n.ml-kebab[_ngcontent-%COMP%] {\n  opacity: 0;\n  background: none;\n  border: none;\n  color: #7a7a92;\n  cursor: pointer;\n  padding: 0.2rem 0.25rem;\n  border-radius: 4px;\n  display: grid;\n  place-items: center;\n  transition: color .12s, background .12s;\n  &:hover {\n    color: #a78bfa;\n    background: rgba(124, 58, 237, .15);\n  }\n}\n.ml-friend[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #8a8aa0;\n  padding: 0.2rem 0.3rem;\n  border-radius: 5px;\n  display: grid;\n  place-items: center;\n  transition:\n    color .12s,\n    background .12s,\n    opacity .12s;\n}\nbutton.ml-friend[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.ml-row[_ngcontent-%COMP%]:hover   button.ml-friend[_ngcontent-%COMP%], .ml-row--has-menu[_ngcontent-%COMP%]   button.ml-friend[_ngcontent-%COMP%] {\n  opacity: 1;\n}\nbutton.ml-friend[_ngcontent-%COMP%]:hover {\n  color: var(--primary, #006c35);\n  background: rgba(0, 108, 53, .16);\n}\n.ml-friend--accept[_ngcontent-%COMP%] {\n  color: #4ade80 !important;\n  opacity: 1 !important;\n}\n.ml-friend--accept[_ngcontent-%COMP%]:hover {\n  background: rgba(74, 222, 128, .14) !important;\n}\n.ml-friend--pending[_ngcontent-%COMP%] {\n  color: var(--accent, #d4af37);\n  opacity: .85;\n  cursor: default;\n}\n.ml-friend--friends[_ngcontent-%COMP%] {\n  color: #4ade80;\n  opacity: .9;\n  cursor: default;\n}\n.ml-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.5rem;\n  top: 100%;\n  z-index: 30;\n  background: #110f1e;\n  border: 1px solid rgba(124, 58, 237, .25);\n  border-radius: 10px;\n  padding: 0.4rem;\n  min-width: 190px;\n  box-shadow: 0 10px 32px rgba(0, 0, 0, .55), 0 0 20px rgba(124, 58, 237, .12);\n  display: flex;\n  flex-direction: column;\n  gap: 0.12rem;\n  button {\n    text-align: left;\n    background: none;\n    border: none;\n    color: #c8cbe0;\n    padding: 0.42rem 0.6rem;\n    border-radius: 6px;\n    cursor: pointer;\n    font-size: 0.8rem;\n    transition: background .12s, color .12s;\n    &:hover {\n      background: #1c1833;\n      color: #eaeaf2;\n    }\n    &.danger {\n      color: #f87171;\n    }\n    &.danger:hover {\n      background: rgba(248, 113, 113, .1);\n    }\n  }\n}\n.ml-menu-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.08rem;\n  padding: 0.25rem 0;\n  border-top: 1px solid rgba(124, 58, 237, .18);\n  margin-top: 0.2rem;\n}\n.ml-menu-label[_ngcontent-%COMP%] {\n  font-size: 0.6rem;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: #5a5a72;\n  padding: 0.18rem 0.6rem;\n}\n.ml-confirm[_ngcontent-%COMP%] {\n  padding: 0.4rem;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ml-confirm-title[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #f87171;\n  font-weight: 600;\n  margin: 0 0.2rem;\n}\n.ml-confirm-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 7px 10px;\n  background: rgba(248, 113, 113, .08);\n  border: 1px solid rgba(248, 113, 113, .3);\n  border-radius: 6px;\n  color: #eaeaf2;\n  font-size: 0.8rem;\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  outline: none;\n  &:focus {\n    border-color: rgba(248, 113, 113, .5);\n  }\n  &::placeholder {\n    color: #5a5a72;\n  }\n}\n.ml-confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.ml-confirm-cancel[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 7px;\n  background: rgba(255, 255, 255, .06);\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 6px;\n  color: #9ca3af;\n  cursor: pointer;\n  font-size: 0.78rem;\n  transition: all .12s;\n  &:hover {\n    background: rgba(255, 255, 255, .1);\n    color: #eaeaf2;\n  }\n}\n.ml-confirm-ok[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 7px;\n  border: none;\n  border-radius: 6px;\n  color: #fff;\n  cursor: pointer;\n  font-size: 0.78rem;\n  font-weight: 700;\n  transition: all .12s;\n  &.danger {\n    background: rgba(248, 113, 113, .8);\n    &:hover {\n      background: #f87171;\n    }\n  }\n}\n.ml-show-more[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.75rem;\n  button {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    background: none;\n    border: none;\n    cursor: pointer;\n    font-family:\n      "JetBrains Mono",\n      ui-monospace,\n      monospace;\n    font-size: 0.68rem;\n    letter-spacing: .8px;\n    text-transform: uppercase;\n    color: #5a5a72;\n    transition: color .14s;\n    &:hover {\n      color: #a78bfa;\n    }\n  }\n}\n.skel-group[_ngcontent-%COMP%] {\n  padding: 0.85rem 0.75rem;\n}\n.skel-label[_ngcontent-%COMP%] {\n  height: 10px;\n  width: 60px;\n  border-radius: 4px;\n  margin-bottom: 0.65rem;\n  background:\n    linear-gradient(\n      90deg,\n      #1c1833 25%,\n      #2a2045 50%,\n      #1c1833 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmerWave 1.4s ease-in-out infinite;\n}\n.skel-row[_ngcontent-%COMP%] {\n  height: 28px;\n  border-radius: 6px;\n  margin-bottom: 0.35rem;\n  background:\n    linear-gradient(\n      90deg,\n      #1c1833 25%,\n      #231d40 50%,\n      #1c1833 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmerWave 1.4s ease-in-out infinite;\n}\n/*# sourceMappingURL=member-list.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MemberListComponent, { className: "MemberListComponent", filePath: "src\\app\\features\\community\\components\\member-list\\member-list.component.ts", lineNumber: 476 });
})();

// src/app/features/community/components/event-create/event-create.component.ts
var EventCreateComponent = class _EventCreateComponent {
  constructor() {
    this.cancel = new EventEmitter();
    this.created = new EventEmitter();
    this.state = inject(CommunityStateService);
    this.title = "";
    this.description = "";
    this.location = "";
    this.startsAt = "";
    this.endsAt = "";
  }
  /** Valid when title and a start time are present, and end (if set) is after start. */
  valid() {
    if (this.title.trim().length === 0)
      return false;
    if (!this.startsAt)
      return false;
    if (this.endsAt && new Date(this.endsAt) < new Date(this.startsAt))
      return false;
    return true;
  }
  // Use a method in the template for live validation (signals not needed here).
  canCreateNow() {
    return this.valid();
  }
  create() {
    if (!this.valid())
      return;
    this.state.createEvent(this.communityId, {
      title: this.title.trim(),
      description: this.description.trim() || null,
      location: this.location.trim() || null,
      // datetime-local yields 'YYYY-MM-DDTHH:mm' (local). Send as-is; the API
      // parses it. Append ':00' seconds for consistency.
      starts_at: this.toIso(this.startsAt),
      ends_at: this.endsAt ? this.toIso(this.endsAt) : null
    });
    this.created.emit();
  }
  toIso(local) {
    return local.length === 16 ? `${local}:00` : local;
  }
  static {
    this.\u0275fac = function EventCreateComponent_Factory(t) {
      return new (t || _EventCreateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventCreateComponent, selectors: [["app-event-create"]], inputs: { communityId: "communityId" }, outputs: { cancel: "cancel", created: "created" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 33, vars: 6, consts: [[1, "ec"], [1, "ec-head"], ["title", "Cancel", 1, "x", 3, "click"], [1, "lbl"], ["placeholder", "e.g. Tournament watch party", "maxlength", "200", 1, "f", 3, "ngModelChange", "ngModel"], [1, "opt"], ["rows", "2", "placeholder", "What's happening?", "maxlength", "5000", 1, "f", 3, "ngModelChange", "ngModel"], ["placeholder", "Discord, stream URL, or a place", "maxlength", "255", 1, "f", 3, "ngModelChange", "ngModel"], [1, "row"], [1, "col"], ["type", "datetime-local", 1, "f", 3, "ngModelChange", "ngModel"], [1, "actions"], [1, "create", 3, "click", "disabled"]], template: function EventCreateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span");
        \u0275\u0275text(3, "New event");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function EventCreateComponent_Template_button_click_4_listener() {
          return ctx.cancel.emit();
        });
        \u0275\u0275text(5, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "label", 3);
        \u0275\u0275text(7, "Title");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function EventCreateComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.title, $event) || (ctx.title = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "label", 3);
        \u0275\u0275text(10, "Description ");
        \u0275\u0275elementStart(11, "span", 5);
        \u0275\u0275text(12, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "textarea", 6);
        \u0275\u0275twoWayListener("ngModelChange", function EventCreateComponent_Template_textarea_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.description, $event) || (ctx.description = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "label", 3);
        \u0275\u0275text(15, "Location or link ");
        \u0275\u0275elementStart(16, "span", 5);
        \u0275\u0275text(17, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function EventCreateComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.location, $event) || (ctx.location = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 8)(20, "div", 9)(21, "label", 3);
        \u0275\u0275text(22, "Starts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function EventCreateComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.startsAt, $event) || (ctx.startsAt = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 9)(25, "label", 3);
        \u0275\u0275text(26, "Ends ");
        \u0275\u0275elementStart(27, "span", 5);
        \u0275\u0275text(28, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function EventCreateComponent_Template_input_ngModelChange_29_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.endsAt, $event) || (ctx.endsAt = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(30, "div", 11)(31, "button", 12);
        \u0275\u0275listener("click", function EventCreateComponent_Template_button_click_31_listener() {
          return ctx.create();
        });
        \u0275\u0275text(32, "Create event");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.title);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.description);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.location);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.startsAt);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.endsAt);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.canCreateNow());
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --surface: #110f1e;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.2);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.ec[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid rgba(124, 58, 237, 0.28);\n  border-radius: 12px;\n  padding: 0.9rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n.ec-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--accent-s);\n  margin-bottom: 0.2rem;\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 0.9rem;\n}\n.x[_ngcontent-%COMP%]:hover {\n  color: #ff6b6b;\n}\n.lbl[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n  margin-top: 0.35rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.opt[_ngcontent-%COMP%] {\n  text-transform: none;\n  opacity: 0.7;\n  letter-spacing: 0;\n}\n.f[_ngcontent-%COMP%] {\n  background: var(--raised);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 0.5rem 0.65rem;\n  color: var(--text);\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 0.92rem;\n}\n.f[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n}\ntextarea.f[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n}\n.col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 0.6rem;\n}\n.create[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.5rem 1.1rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.create[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n.create[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=event-create.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventCreateComponent, { className: "EventCreateComponent", filePath: "src\\app\\features\\community\\components\\event-create\\event-create.component.ts", lineNumber: 67 });
})();

// src/app/features/community/components/events-panel/events-panel.component.ts
function EventsPanelComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function EventsPanelComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(!ctx_r1.showForm()));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.showForm() ? "Close form" : "+ New event");
  }
}
function EventsPanelComponent_app_event_create_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-event-create", 15);
    \u0275\u0275listener("cancel", function EventsPanelComponent_app_event_create_12_Template_app_event_create_cancel_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    })("created", function EventsPanelComponent_app_event_create_12_Template_app_event_create_created_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r1.communityId);
  }
}
function EventsPanelComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, "Loading events\u2026");
    \u0275\u0275elementEnd();
  }
}
function EventsPanelComponent_div_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Create one to get the community together.");
    \u0275\u0275elementEnd();
  }
}
function EventsPanelComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " No events yet. ");
    \u0275\u0275template(2, EventsPanelComponent_div_15_span_2_Template, 2, 0, "span", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.canCreate());
  }
}
function EventsPanelComponent_app_event_card_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-event-card", 19);
  }
  if (rf & 2) {
    const ev_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("event", ev_r4)("communityId", ctx_r1.communityId);
  }
}
var EventsPanelComponent = class _EventsPanelComponent {
  constructor() {
    this.close = new EventEmitter();
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.showForm = signal(false);
    this.includePast = signal(false);
    this.isLoading = this.state.isLoadingEvents;
    this.events = computed(() => this.state.eventsByCommunity()[this.communityId] ?? []);
  }
  ngOnInit() {
    this.state.loadEvents(this.communityId, this.includePast());
  }
  /** Moderators+ (or platform admin) may create events. */
  canCreate() {
    const me = this.auth.currentUser();
    if (!me)
      return false;
    if (me.role === "admin")
      return true;
    const member = (this.state.membersByCommunity()[this.communityId] ?? []).find((m) => m.user.id === me.id);
    return !!member && (member.role === "owner" || member.role === "admin" || member.role === "moderator");
  }
  togglePast() {
    this.includePast.update((v) => !v);
    this.state.loadEvents(this.communityId, this.includePast());
  }
  trackEvent(_i, ev) {
    return ev.id;
  }
  onBackdrop(e) {
    if (e.target.classList.contains("overlay")) {
      this.close.emit();
    }
  }
  static {
    this.\u0275fac = function EventsPanelComponent_Factory(t) {
      return new (t || _EventsPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventsPanelComponent, selectors: [["app-events-panel"]], inputs: { communityId: "communityId" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 17, vars: 7, consts: [[1, "overlay", 3, "click"], [1, "panel"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "bar"], ["class", "new", 3, "click", 4, "ngIf"], [1, "past-toggle"], ["type", "checkbox", 3, "change", "checked"], [3, "communityId", "cancel", "created", 4, "ngIf"], [1, "list"], ["class", "loading", 4, "ngIf"], ["class", "empty", 4, "ngIf"], [3, "event", "communityId", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "new", 3, "click"], [3, "cancel", "created", "communityId"], [1, "loading"], [1, "empty"], [4, "ngIf"], [3, "event", "communityId"]], template: function EventsPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function EventsPanelComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "aside", 1)(2, "header", 2)(3, "span", 3);
        \u0275\u0275text(4, "Events");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function EventsPanelComponent_Template_button_click_5_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(6, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275template(8, EventsPanelComponent_button_8_Template, 2, 1, "button", 6);
        \u0275\u0275elementStart(9, "label", 7)(10, "input", 8);
        \u0275\u0275listener("change", function EventsPanelComponent_Template_input_change_10_listener() {
          return ctx.togglePast();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Show past ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(12, EventsPanelComponent_app_event_create_12_Template, 1, 1, "app-event-create", 9);
        \u0275\u0275elementStart(13, "div", 10);
        \u0275\u0275template(14, EventsPanelComponent_div_14_Template, 2, 0, "div", 11)(15, EventsPanelComponent_div_15_Template, 3, 1, "div", 12)(16, EventsPanelComponent_app_event_card_16_Template, 1, 2, "app-event-card", 13);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.canCreate());
        \u0275\u0275advance(2);
        \u0275\u0275property("checked", ctx.includePast());
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.showForm() && ctx.communityId);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.isLoading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading() && ctx.events().length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.events())("ngForTrackBy", ctx.trackEvent);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, EventCardComponent, EventCreateComponent], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.15);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 900;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: flex-end;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 460px;\n  height: 100%;\n  background: var(--bg);\n  border-left: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slide 0.18s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slide {\n  0% {\n    transform: translateX(40px);\n    opacity: 0;\n  }\n  60% {\n    transform: translateX(-6px);\n    opacity: 1;\n  }\n  80% {\n    transform: translateX(3px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.3rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1.1rem;\n  gap: 0.6rem;\n}\n.new[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.45rem 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  font-size: 0.85rem;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.new[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n.past-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8rem;\n  color: var(--mut);\n  cursor: pointer;\n}\n.list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.5rem 1.1rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n  min-height: 0;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  color: var(--mut);\n  font-size: 0.9rem;\n  padding: 1rem 0;\n  text-align: center;\n}\n/*# sourceMappingURL=events-panel.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventsPanelComponent, { className: "EventsPanelComponent", filePath: "src\\app\\features\\community\\components\\events-panel\\events-panel.component.ts", lineNumber: 83 });
})();

// src/app/features/community/components/rules-modal/rules-modal.component.ts
function RulesModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function RulesModalComponent_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "This community hasn't set any rules yet.");
    \u0275\u0275elementEnd();
  }
}
function RulesModalComponent_pre_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "pre", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.rules());
  }
}
var RulesModalComponent = class _RulesModalComponent {
  constructor() {
    this.close = new EventEmitter();
    this.api = inject(CommunityService);
    this.rules = signal(null);
    this.loading = signal(true);
  }
  ngOnInit() {
    this.api.getRules(this.communityId).subscribe({
      next: (r) => {
        this.rules.set(r);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  onBackdrop(ev) {
    if (ev.target.classList.contains("overlay"))
      this.close.emit();
  }
  static {
    this.\u0275fac = function RulesModalComponent_Factory(t) {
      return new (t || _RulesModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RulesModalComponent, selectors: [["app-rules-modal"]], inputs: { communityId: "communityId" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 3, consts: [[1, "overlay", 3, "click"], [1, "card"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "content"], ["class", "loading", 4, "ngIf"], ["class", "empty", 4, "ngIf"], ["class", "rules", 4, "ngIf"], [1, "pf"], [1, "ok", 3, "click"], [1, "loading"], [1, "empty"], [1, "rules"]], template: function RulesModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function RulesModalComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "header", 2)(3, "span", 3);
        \u0275\u0275text(4, "Community rules");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function RulesModalComponent_Template_button_click_5_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(6, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275template(8, RulesModalComponent_div_8_Template, 2, 0, "div", 6)(9, RulesModalComponent_p_9_Template, 2, 0, "p", 7)(10, RulesModalComponent_pre_10_Template, 2, 1, "pre", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "footer", 9)(12, "button", 10);
        \u0275\u0275listener("click", function RulesModalComponent_Template_button_click_12_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(13, "Got it");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && !ctx.rules());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && ctx.rules());
      }
    }, dependencies: [CommonModule, NgIf], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.18);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 970;\n  background: rgba(0, 0, 0, 0.6);\n  display: grid;\n  place-items: center;\n  padding: 1.5rem;\n}\n@keyframes _ngcontent-%COMP%_cardPop {\n  0% {\n    transform: scale(.92) translateY(16px);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.02) translateY(-4px);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(1) translateY(0);\n  }\n}\n.card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 520px;\n  max-height: 80vh;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 0 40px rgba(124, 58, 237, 0.15);\n  animation: _ngcontent-%COMP%_cardPop .3s cubic-bezier(.34, 1.56, .64, 1) both;\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.2rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.25rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.content[_ngcontent-%COMP%] {\n  padding: 1.1rem 1.2rem;\n  overflow-y: auto;\n  min-height: 0;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  color: var(--mut);\n  text-align: center;\n  padding: 1.5rem 0;\n}\n.rules[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #dcdce8;\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 0.95rem;\n  line-height: 1.6;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.pf[_ngcontent-%COMP%] {\n  padding: 0.9rem 1.2rem;\n  border-top: 1px solid var(--line);\n  display: flex;\n  justify-content: flex-end;\n}\n.ok[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.5rem 1.3rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.ok[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n/*# sourceMappingURL=rules-modal.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RulesModalComponent, { className: "RulesModalComponent", filePath: "src\\app\\features\\community\\components\\rules-modal\\rules-modal.component.ts", lineNumber: 53 });
})();

// src/app/features/community/components/channel-manage/channel-manage.component.ts
function ChannelManageComponent_header_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 17)(1, "span", 18);
    \u0275\u0275text(2, "Manage channels");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 19);
    \u0275\u0275listener("click", function ChannelManageComponent_header_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close.emit());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
}
function ChannelManageComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, " Will be created as ");
    \u0275\u0275elementStart(2, "code");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", ctx_r1.slugPreview(), "");
  }
}
function ChannelManageComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0 ", ctx_r1.createError(), "");
  }
}
function ChannelManageComponent_div_23_ng_container_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.topic);
  }
}
function ChannelManageComponent_div_23_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25)(4, "span", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ChannelManageComponent_div_23_ng_container_1_span_6_Template, 2, 1, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 28);
    \u0275\u0275listener("click", function ChannelManageComponent_div_23_ng_container_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEdit(c_r4));
    });
    \u0275\u0275text(8, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 29);
    \u0275\u0275listener("click", function ChannelManageComponent_div_23_ng_container_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const c_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.remove(c_r4));
    });
    \u0275\u0275text(10, "Delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const c_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.type === "announcement" ? "\u{1F4E2}" : "#");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r4.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", c_r4.topic);
  }
}
function ChannelManageComponent_div_23_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function ChannelManageComponent_div_23_ng_template_2_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editName, $event) || (ctx_r1.editName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ChannelManageComponent_div_23_ng_template_2_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editTopic, $event) || (ctx_r1.editTopic = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 34);
    \u0275\u0275listener("click", function ChannelManageComponent_div_23_ng_template_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const c_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveEdit(c_r4));
    });
    \u0275\u0275text(4, "Save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 28);
    \u0275\u0275listener("click", function ChannelManageComponent_div_23_ng_template_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275text(6, "Cancel");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editName);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editTopic);
  }
}
function ChannelManageComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275template(1, ChannelManageComponent_div_23_ng_container_1_Template, 11, 3, "ng-container", 23)(2, ChannelManageComponent_div_23_ng_template_2_Template, 7, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const editRow_r6 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingId() !== c_r4.id)("ngIfElse", editRow_r6);
  }
}
function ChannelManageComponent_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 35);
    \u0275\u0275text(1, "No channels yet.");
    \u0275\u0275elementEnd();
  }
}
var ChannelManageComponent = class _ChannelManageComponent {
  constructor() {
    this.embedded = false;
    this.close = new EventEmitter();
    this.api = inject(CommunityService);
    this.state = inject(CommunityStateService);
    this.channels = computed(() => this.state.channelsByCommunity()[this.communityId] ?? []);
    this.newName = "";
    this.newTopic = "";
    this.newType = "text";
    this.creating = signal(false);
    this.createError = signal(null);
    this.editingId = signal(null);
    this.editName = "";
    this.editTopic = "";
  }
  create() {
    const name = this.slugify(this.newName);
    if (!name || name.length < 2) {
      this.createError.set("Name must be at least 2 letters/numbers.");
      return;
    }
    this.createError.set(null);
    this.creating.set(true);
    this.api.createChannel(this.communityId, {
      name,
      topic: this.newTopic.trim() || null,
      type: this.newType
    }).subscribe({
      next: () => {
        this.newName = "";
        this.newTopic = "";
        this.newType = "text";
        this.creating.set(false);
        this.state.loadChannels(this.communityId);
      },
      error: (err) => {
        this.creating.set(false);
        const msg = err?.error?.errors?.name?.[0] ?? err?.error?.message ?? "Could not create the channel.";
        this.createError.set(msg);
      }
    });
  }
  /** Convert free text into a valid channel slug (lowercase, hyphens). */
  slugify(input) {
    return (input ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  }
  /** Live preview of the slug as the user types. */
  slugPreview() {
    return this.slugify(this.newName);
  }
  startEdit(c) {
    this.editingId.set(c.id);
    this.editName = c.name;
    this.editTopic = c.topic ?? "";
  }
  cancelEdit() {
    this.editingId.set(null);
  }
  saveEdit(c) {
    const name = this.slugify(this.editName);
    if (!name || name.length < 2)
      return;
    this.api.updateChannel(c.id, { name, topic: this.editTopic.trim() || null }).subscribe(() => {
      this.editingId.set(null);
      this.state.loadChannels(this.communityId);
    });
  }
  remove(c) {
    if (!confirm(`Delete #${c.name}? Its messages will no longer be accessible.`))
      return;
    this.api.archiveChannel(c.id).subscribe(() => this.state.loadChannels(this.communityId));
  }
  onBackdrop(ev) {
    if (this.embedded)
      return;
    if (ev.target.classList.contains("overlay"))
      this.close.emit();
  }
  static {
    this.\u0275fac = function ChannelManageComponent_Factory(t) {
      return new (t || _ChannelManageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChannelManageComponent, selectors: [["app-channel-manage"]], inputs: { communityId: "communityId", embedded: "embedded" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 25, vars: 18, consts: [["editRow", ""], [3, "click"], ["class", "ph", 4, "ngIf"], [1, "body"], [1, "block"], [1, "create"], ["placeholder", "channel-name", "maxlength", "60", 1, "f", 3, "ngModelChange", "ngModel"], [1, "f", "type", 3, "ngModelChange", "ngModel"], ["value", "text"], ["value", "announcement"], ["placeholder", "Topic (optional)", "maxlength", "200", 1, "f", 3, "ngModelChange", "ngModel"], ["class", "slug-hint", 4, "ngIf"], ["class", "create-err", 4, "ngIf"], [1, "actions"], [1, "create-btn", 3, "click", "disabled"], ["class", "ch", 4, "ngFor", "ngForOf"], ["class", "hint", 4, "ngIf"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "slug-hint"], [1, "create-err"], [1, "ch"], [4, "ngIf", "ngIfElse"], [1, "ch-hash"], [1, "ch-info"], [1, "ch-name"], ["class", "ch-topic", 4, "ngIf"], [1, "mini", 3, "click"], [1, "mini", "danger", 3, "click"], [1, "ch-topic"], [1, "edit-fields"], ["maxlength", "60", "placeholder", "name", 1, "f", 3, "ngModelChange", "ngModel"], ["maxlength", "200", "placeholder", "topic", 1, "f", 3, "ngModelChange", "ngModel"], [1, "mini", "ok", 3, "click"], [1, "hint"]], template: function ChannelManageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275listener("click", function ChannelManageComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "aside");
        \u0275\u0275template(2, ChannelManageComponent_header_2_Template, 5, 0, "header", 2);
        \u0275\u0275elementStart(3, "div", 3)(4, "section", 4)(5, "h4");
        \u0275\u0275text(6, "Create a channel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5)(8, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function ChannelManageComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.newName, $event) || (ctx.newName = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "select", 7);
        \u0275\u0275twoWayListener("ngModelChange", function ChannelManageComponent_Template_select_ngModelChange_9_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.newType, $event) || (ctx.newType = $event);
          return $event;
        });
        \u0275\u0275elementStart(10, "option", 8);
        \u0275\u0275text(11, "Text");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 9);
        \u0275\u0275text(13, "Announcement");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(14, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function ChannelManageComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.newTopic, $event) || (ctx.newTopic = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, ChannelManageComponent_p_15_Template, 4, 1, "p", 11)(16, ChannelManageComponent_p_16_Template, 2, 1, "p", 12);
        \u0275\u0275elementStart(17, "div", 13)(18, "button", 14);
        \u0275\u0275listener("click", function ChannelManageComponent_Template_button_click_18_listener() {
          return ctx.create();
        });
        \u0275\u0275text(19);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(20, "section", 4)(21, "h4");
        \u0275\u0275text(22, "Channels");
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, ChannelManageComponent_div_23_Template, 4, 2, "div", 15)(24, ChannelManageComponent_p_24_Template, 2, 0, "p", 16);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("overlay", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("panel", !ctx.embedded)("embedded-body", ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("flush", ctx.embedded);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.newName);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.newType);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.newTopic);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.newName.trim());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.createError());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.newName.trim() || ctx.creating());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.creating() ? "Creating\u2026" : "+ Create channel", " ");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngForOf", ctx.channels());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.channels().length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.15);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 960;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: flex-end;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 460px;\n  height: 100%;\n  background: var(--bg);\n  border-left: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slide 0.18s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slide {\n  from {\n    transform: translateX(30px);\n    opacity: 0;\n  }\n  to {\n    transform: none;\n    opacity: 1;\n  }\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.3rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.1rem 2rem;\n  min-height: 0;\n}\n.embedded-body[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.body.flush[_ngcontent-%COMP%] {\n  padding: 0.5rem 0 1rem;\n}\n.block[_ngcontent-%COMP%] {\n  margin-bottom: 1.6rem;\n}\nh4[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--mut);\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.hint[_ngcontent-%COMP%] {\n  color: var(--mut);\n  font-size: 0.85rem;\n}\n.create[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  margin-bottom: 0.4rem;\n}\n.create[_ngcontent-%COMP%]   .f[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.create[_ngcontent-%COMP%]   .type[_ngcontent-%COMP%] {\n  flex: 0 0 130px;\n}\n.f[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--raised);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 0.5rem 0.65rem;\n  color: var(--text);\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 0.92rem;\n}\n.f[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n}\n.actions[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  justify-content: flex-end;\n}\n.create-btn[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.5rem 1rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.create-btn[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n.create-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.slug-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mut);\n  margin: 0.4rem 0 0;\n}\n.slug-hint[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: var(--accent-s);\n  background: rgba(124, 58, 237, 0.1);\n  padding: 0.05rem 0.3rem;\n  border-radius: 4px;\n}\n.create-err[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #ff8a8a;\n  margin: 0.4rem 0 0;\n}\n.ch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.6rem;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  margin-bottom: 0.4rem;\n}\n.ch-hash[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.ch-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.ch-name[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 600;\n}\n.ch-topic[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mut);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.edit-fields[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.mini[_ngcontent-%COMP%] {\n  background: var(--raised);\n  border: 1px solid var(--line);\n  color: #cfcfe0;\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.76rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.mini[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent-s);\n}\n.mini.ok[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent-s);\n}\n.mini.danger[_ngcontent-%COMP%]:hover {\n  border-color: #ff6b6b;\n  color: #ff6b6b;\n}\n/*# sourceMappingURL=channel-manage.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChannelManageComponent, { className: "ChannelManageComponent", filePath: "src\\app\\features\\community\\components\\channel-manage\\channel-manage.component.ts", lineNumber: 116 });
})();

// src/app/features/community/components/join-panel/join-panel.component.ts
function JoinPanelComponent_header_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 11)(1, "span", 12);
    \u0275\u0275text(2, "Join settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function JoinPanelComponent_header_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close.emit());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
}
function JoinPanelComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function JoinPanelComponent_button_8_Template_button_click_0_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPolicy(p_r4.key));
    });
    \u0275\u0275elementStart(1, "span", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.policy() === p_r4.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.desc);
  }
}
function JoinPanelComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No invite links yet.");
    \u0275\u0275elementEnd();
  }
}
function JoinPanelComponent_div_16_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const inv_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("/", inv_r6.max_uses, "");
  }
}
function JoinPanelComponent_div_16_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function JoinPanelComponent_div_16_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const inv_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.revoke(inv_r6.id));
    });
    \u0275\u0275text(1, "Revoke");
    \u0275\u0275elementEnd();
  }
}
function JoinPanelComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "code", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 21)(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275template(9, JoinPanelComponent_div_16_ng_container_9_Template, 2, 1, "ng-container", 22);
    \u0275\u0275text(10, " used");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 23)(12, "button", 24);
    \u0275\u0275listener("click", function JoinPanelComponent_div_16_Template_button_click_12_listener() {
      const inv_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copy(inv_r6.token));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, JoinPanelComponent_div_16_button_14_Template, 2, 0, "button", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const inv_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.linkFor(inv_r6.token));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("dead", !inv_r6.is_usable);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inv_r6.is_revoked ? "revoked" : inv_r6.is_usable ? "active" : "expired", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\xB7 ", inv_r6.uses, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", inv_r6.max_uses);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.copiedToken() === inv_r6.token ? "Copied!" : "Copy");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !inv_r6.is_revoked);
  }
}
function JoinPanelComponent_section_17_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r1.requests().length, ")");
  }
}
function JoinPanelComponent_section_17_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No pending requests.");
    \u0275\u0275elementEnd();
  }
}
function JoinPanelComponent_section_17_div_5_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 39);
  }
  if (rf & 2) {
    const r_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", r_r9.user.avatar, \u0275\u0275sanitizeUrl);
  }
}
function JoinPanelComponent_section_17_div_5_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const r_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_4_0 = r_r9.user.nickname) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "?").charAt(0));
  }
}
function JoinPanelComponent_section_17_div_5_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r9.message);
  }
}
function JoinPanelComponent_section_17_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31);
    \u0275\u0275template(2, JoinPanelComponent_section_17_div_5_img_2_Template, 1, 1, "img", 32)(3, JoinPanelComponent_section_17_div_5_span_3_Template, 2, 1, "span", 33);
    \u0275\u0275elementStart(4, "div", 34)(5, "span", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, JoinPanelComponent_section_17_div_5_span_7_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 37)(9, "button", 38);
    \u0275\u0275listener("click", function JoinPanelComponent_section_17_div_5_Template_button_click_9_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.approve(r_r9.id));
    });
    \u0275\u0275text(10, "Approve");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 26);
    \u0275\u0275listener("click", function JoinPanelComponent_section_17_div_5_Template_button_click_11_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deny(r_r9.id));
    });
    \u0275\u0275text(12, "Deny");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const r_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", r_r9.user.avatar);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !r_r9.user.avatar);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = r_r9.user.nickname) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : "Unknown");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", r_r9.message);
  }
}
function JoinPanelComponent_section_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 3)(1, "h4");
    \u0275\u0275text(2, "Pending requests ");
    \u0275\u0275template(3, JoinPanelComponent_section_17_span_3_Template, 2, 1, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, JoinPanelComponent_section_17_p_4_Template, 2, 0, "p", 8)(5, JoinPanelComponent_section_17_div_5_Template, 13, 4, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.requests().length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.requests().length === 0 && !ctx_r1.loadingRequests());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.requests());
  }
}
var JoinPanelComponent = class _JoinPanelComponent {
  constructor() {
    this.initialPolicy = "closed";
    this.embedded = false;
    this.close = new EventEmitter();
    this.policyChanged = new EventEmitter();
    this.api = inject(CommunityService);
    this.policy = signal("closed");
    this.invites = signal([]);
    this.requests = signal([]);
    this.loadingInvites = signal(false);
    this.loadingRequests = signal(false);
    this.generating = signal(false);
    this.copiedToken = signal(null);
    this.policies = [
      { key: "open", label: "Open", desc: "Anyone with an invite link joins instantly." },
      { key: "request", label: "Request to join", desc: "People request; a moderator approves them." },
      { key: "closed", label: "Invite-only", desc: "Only people with a valid invite link can join." }
    ];
  }
  ngOnInit() {
    this.policy.set(this.initialPolicy);
    this.refreshInvites();
    if (this.policy() === "request")
      this.refreshRequests();
  }
  refreshInvites() {
    this.loadingInvites.set(true);
    this.api.listInvites(this.communityId).subscribe({
      next: (list) => {
        this.invites.set(list);
        this.loadingInvites.set(false);
      },
      error: () => this.loadingInvites.set(false)
    });
  }
  refreshRequests() {
    this.loadingRequests.set(true);
    this.api.listJoinRequests(this.communityId).subscribe({
      next: (list) => {
        this.requests.set(list);
        this.loadingRequests.set(false);
      },
      error: () => this.loadingRequests.set(false)
    });
  }
  setPolicy(p) {
    if (p === this.policy())
      return;
    this.api.setJoinPolicy(this.communityId, p).subscribe((saved) => {
      this.policy.set(saved);
      this.policyChanged.emit(saved);
      if (saved === "request")
        this.refreshRequests();
    });
  }
  generate() {
    this.generating.set(true);
    this.api.createInvite(this.communityId, {}).subscribe({
      next: (inv) => {
        this.invites.update((list) => [inv, ...list]);
        this.generating.set(false);
      },
      error: () => this.generating.set(false)
    });
  }
  revoke(inviteId) {
    this.api.revokeInvite(inviteId).subscribe(() => this.refreshInvites());
  }
  approve(requestId) {
    this.api.approveRequest(requestId).subscribe(() => {
      this.requests.update((list) => list.filter((r) => r.id !== requestId));
    });
  }
  deny(requestId) {
    this.api.denyRequest(requestId).subscribe(() => {
      this.requests.update((list) => list.filter((r) => r.id !== requestId));
    });
  }
  linkFor(token) {
    return `${window.location.origin}/community/join/${token}`;
  }
  copy(token) {
    const link = this.linkFor(token);
    navigator.clipboard?.writeText(link).then(() => {
      this.copiedToken.set(token);
      setTimeout(() => this.copiedToken.set(null), 1500);
    });
  }
  onBackdrop(e) {
    if (this.embedded)
      return;
    if (e.target.classList.contains("overlay")) {
      this.close.emit();
    }
  }
  static {
    this.\u0275fac = function JoinPanelComponent_Factory(t) {
      return new (t || _JoinPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JoinPanelComponent, selectors: [["app-join-panel"]], inputs: { communityId: "communityId", initialPolicy: "initialPolicy", embedded: "embedded" }, outputs: { close: "close", policyChanged: "policyChanged" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 14, consts: [[3, "click"], ["class", "ph", 4, "ngIf"], [1, "body"], [1, "block"], [1, "policy"], ["class", "pol", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "block-head"], [1, "mini", 3, "click", "disabled"], ["class", "hint", 4, "ngIf"], ["class", "invite", 4, "ngFor", "ngForOf"], ["class", "block", 4, "ngIf"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "pol", 3, "click"], [1, "pol-name"], [1, "pol-desc"], [1, "hint"], [1, "invite"], [1, "inv-main"], [1, "link"], [1, "inv-meta"], [4, "ngIf"], [1, "inv-actions"], [1, "mini", 3, "click"], ["class", "mini danger", 3, "click", 4, "ngIf"], [1, "mini", "danger", 3, "click"], ["class", "count", 4, "ngIf"], ["class", "req", 4, "ngFor", "ngForOf"], [1, "count"], [1, "req"], [1, "req-user"], ["alt", "", "class", "ava", 3, "src", 4, "ngIf"], ["class", "ava letter", 4, "ngIf"], [1, "req-info"], [1, "req-name"], ["class", "req-msg", 4, "ngIf"], [1, "req-actions"], [1, "mini", "ok", 3, "click"], ["alt", "", 1, "ava", 3, "src"], [1, "ava", "letter"], [1, "req-msg"]], template: function JoinPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function JoinPanelComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "aside");
        \u0275\u0275template(2, JoinPanelComponent_header_2_Template, 5, 0, "header", 1);
        \u0275\u0275elementStart(3, "div", 2)(4, "section", 3)(5, "h4");
        \u0275\u0275text(6, "Who can join");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 4);
        \u0275\u0275template(8, JoinPanelComponent_button_8_Template, 5, 4, "button", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "section", 3)(10, "div", 6)(11, "h4");
        \u0275\u0275text(12, "Invite links");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 7);
        \u0275\u0275listener("click", function JoinPanelComponent_Template_button_click_13_listener() {
          return ctx.generate();
        });
        \u0275\u0275text(14, "+ New link");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(15, JoinPanelComponent_p_15_Template, 2, 0, "p", 8)(16, JoinPanelComponent_div_16_Template, 15, 8, "div", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, JoinPanelComponent_section_17_Template, 6, 3, "section", 10);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("overlay", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("panel", !ctx.embedded)("embedded-body", ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("flush", ctx.embedded);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.policies);
        \u0275\u0275advance(5);
        \u0275\u0275property("disabled", ctx.generating());
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.invites().length === 0 && !ctx.loadingInvites());
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.invites());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.policy() === "request");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.15);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 950;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: flex-end;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 460px;\n  height: 100%;\n  background: var(--bg);\n  border-left: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slide 0.18s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slide {\n  0% {\n    transform: translateX(40px);\n    opacity: 0;\n  }\n  60% {\n    transform: translateX(-6px);\n    opacity: 1;\n  }\n  80% {\n    transform: translateX(3px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.3rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.1rem 2rem;\n  min-height: 0;\n}\n.embedded-body[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.body.flush[_ngcontent-%COMP%] {\n  padding: 0.5rem 0 1rem;\n}\n.block[_ngcontent-%COMP%] {\n  margin-bottom: 1.6rem;\n}\n.block-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\nh4[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--mut);\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.count[_ngcontent-%COMP%] {\n  color: var(--accent);\n}\n.hint[_ngcontent-%COMP%] {\n  color: var(--mut);\n  font-size: 0.85rem;\n  margin: 0.2rem 0;\n}\n.policy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n.pol[_ngcontent-%COMP%] {\n  text-align: left;\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 0.6rem 0.8rem;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  transition: border-color 0.12s ease;\n}\n.pol[_ngcontent-%COMP%]:hover {\n  border-color: rgba(124, 58, 237, 0.45);\n}\n.pol.active[_ngcontent-%COMP%] {\n  border-color: var(--accent);\n  background: rgba(124, 58, 237, 0.1);\n}\n.pol-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text);\n}\n.pol-desc[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mut);\n}\n.invite[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 0.6rem 0.75rem;\n  margin-bottom: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.inv-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.link[_ngcontent-%COMP%] {\n  display: block;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.74rem;\n  color: #b8b8c8;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.inv-meta[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n  margin-top: 0.2rem;\n  display: flex;\n  gap: 0.3rem;\n}\n.inv-meta[_ngcontent-%COMP%]   .dead[_ngcontent-%COMP%] {\n  color: #ff6b6b;\n}\n.inv-actions[_ngcontent-%COMP%], .req-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.35rem;\n  flex-shrink: 0;\n}\n.mini[_ngcontent-%COMP%] {\n  background: var(--raised);\n  border: 1px solid var(--line);\n  color: #cfcfe0;\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.74rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.mini[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent-s);\n}\n.mini[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.mini.ok[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent-s);\n}\n.mini.danger[_ngcontent-%COMP%]:hover {\n  border-color: #ff6b6b;\n  color: #ff6b6b;\n}\n.req[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 0.6rem 0.75rem;\n  margin-bottom: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.6rem;\n}\n.req-user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  min-width: 0;\n}\n.ava[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n  object-fit: cover;\n  flex-shrink: 0;\n}\n.ava.letter[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  background: var(--raised);\n  color: var(--accent-s);\n  font-family: "Anton", sans-serif;\n}\n.req-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.req-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text);\n}\n.req-msg[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mut);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=join-panel.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JoinPanelComponent, { className: "JoinPanelComponent", filePath: "src\\app\\features\\community\\components\\join-panel\\join-panel.component.ts", lineNumber: 140 });
})();

// src/app/features/community/components/admin-panel/admin-panel.component.ts
function AdminPanelComponent_header_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 5)(1, "span", 6);
    \u0275\u0275text(2, "Admin & safety");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 7);
    \u0275\u0275listener("click", function AdminPanelComponent_header_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close.emit());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
}
function AdminPanelComponent_section_11_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1, "Saved \u2713");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_section_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "p", 8);
    \u0275\u0275text(2, "Shown to members. Plain text \u2014 line breaks are kept.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 9);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelComponent_section_11_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.rulesDraft, $event) || (ctx_r1.rulesDraft = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "button", 11);
    \u0275\u0275listener("click", function AdminPanelComponent_section_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveRules());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AdminPanelComponent_section_11_span_7_Template, 2, 0, "span", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.rulesDraft);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.savingRules());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingRules() ? "Saving\u2026" : "Save rules", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.rulesSaved());
  }
}
function AdminPanelComponent_section_12_p_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, "No blocked words yet.");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_section_12_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function AdminPanelComponent_section_12_div_19_Template_button_click_5_listener() {
      const w_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeWord(w_r6.id));
    });
    \u0275\u0275text(6, "Remove");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const w_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(w_r6.word);
    \u0275\u0275advance();
    \u0275\u0275classProp("flag", w_r6.mode === "flag");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r6.mode);
  }
}
function AdminPanelComponent_section_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "p", 8);
    \u0275\u0275text(2, "Messages containing a ");
    \u0275\u0275elementStart(3, "b");
    \u0275\u0275text(4, "block");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " word are rejected; ");
    \u0275\u0275elementStart(6, "b");
    \u0275\u0275text(7, "flag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " words are allowed but logged.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 14)(10, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelComponent_section_12_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newWord, $event) || (ctx_r1.newWord = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function AdminPanelComponent_section_12_Template_input_keyup_enter_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addWord());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelComponent_section_12_Template_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.newMode, $event) || (ctx_r1.newMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(12, "option", 17);
    \u0275\u0275text(13, "Block");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 18);
    \u0275\u0275text(15, "Flag");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 19);
    \u0275\u0275listener("click", function AdminPanelComponent_section_12_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addWord());
    });
    \u0275\u0275text(17, "Add");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, AdminPanelComponent_section_12_p_18_Template, 2, 0, "p", 20)(19, AdminPanelComponent_section_12_div_19_Template, 7, 4, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newWord);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newMode);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.newWord.trim());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.words().length === 0 && !ctx_r1.loadingWords());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.words());
  }
}
function AdminPanelComponent_section_13_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, "No activity yet.");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_section_13_div_4_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const e_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_4_0 = e_r7.actor.nickname) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "Someone");
  }
}
function AdminPanelComponent_section_13_div_4_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const e_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2192 ", (tmp_4_0 = e_r7.target.nickname) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "a user", "");
  }
}
function AdminPanelComponent_section_13_div_4_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", ctx_r1.metaText(e_r7), "");
  }
}
function AdminPanelComponent_section_13_div_4_div_11_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function AdminPanelComponent_section_13_div_4_div_11_button_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const e_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remove(e_r7));
    });
    \u0275\u0275text(1, "Remove message");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_section_13_div_4_div_11_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "removed \u2713");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelComponent_section_13_div_4_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "button", 36);
    \u0275\u0275listener("click", function AdminPanelComponent_section_13_div_4_div_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const e_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.view(e_r7));
    });
    \u0275\u0275text(2, "View message");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminPanelComponent_section_13_div_4_div_11_button_3_Template, 2, 0, "button", 37)(4, AdminPanelComponent_section_13_div_4_div_11_span_4_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mid_r10 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r1.removed().has(mid_r10));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.removed().has(mid_r10));
  }
}
function AdminPanelComponent_section_13_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 31);
    \u0275\u0275template(8, AdminPanelComponent_section_13_div_4_span_8_Template, 2, 1, "span", 4)(9, AdminPanelComponent_section_13_div_4_span_9_Template, 2, 1, "span", 4)(10, AdminPanelComponent_section_13_div_4_span_10_Template, 2, 1, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminPanelComponent_section_13_div_4_div_11_Template, 5, 2, "div", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-action", e_r7.action);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.label(e_r7.action));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 7, e_r7.created_at, "MMM d, h:mm a"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", e_r7.actor);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", e_r7.target);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.metaText(e_r7));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.messageIdOf(e_r7));
  }
}
function AdminPanelComponent_section_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section")(1, "p", 8);
    \u0275\u0275text(2, "Recent moderation and admin actions.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AdminPanelComponent_section_13_p_3_Template, 2, 0, "p", 20)(4, AdminPanelComponent_section_13_div_4_Template, 12, 10, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.audit().length === 0 && !ctx_r1.loadingAudit());
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.audit());
  }
}
var AdminPanelComponent = class _AdminPanelComponent {
  constructor() {
    this.embedded = false;
    this.close = new EventEmitter();
    this.jumpToMessage = new EventEmitter();
    this.api = inject(CommunityService);
    this.state = inject(CommunityStateService);
    this.removed = signal(/* @__PURE__ */ new Set());
    this.tab = signal("rules");
    this.rulesDraft = "";
    this.savingRules = signal(false);
    this.rulesSaved = signal(false);
    this.words = signal([]);
    this.loadingWords = signal(false);
    this.newWord = "";
    this.newMode = "block";
    this.audit = signal([]);
    this.loadingAudit = signal(false);
  }
  ngOnInit() {
    this.api.getRules(this.communityId).subscribe((r) => this.rulesDraft = r ?? "");
  }
  switchTo(tab) {
    this.tab.set(tab);
    if (tab === "words" && this.words().length === 0)
      this.loadWords();
    if (tab === "audit")
      this.loadAudit();
  }
  // ── Rules ──
  saveRules() {
    this.savingRules.set(true);
    this.rulesSaved.set(false);
    this.api.setRules(this.communityId, this.rulesDraft.trim() || null).subscribe({
      next: () => {
        this.savingRules.set(false);
        this.rulesSaved.set(true);
        setTimeout(() => this.rulesSaved.set(false), 1500);
      },
      error: () => this.savingRules.set(false)
    });
  }
  // ── Words ──
  loadWords() {
    this.loadingWords.set(true);
    this.api.listBlockedWords(this.communityId).subscribe({
      next: (list) => {
        this.words.set(list);
        this.loadingWords.set(false);
      },
      error: () => this.loadingWords.set(false)
    });
  }
  addWord() {
    const w = this.newWord.trim();
    if (!w)
      return;
    this.api.addBlockedWord(this.communityId, w, this.newMode).subscribe((entry) => {
      this.words.update((list) => [...list.filter((x) => x.id !== entry.id), entry].sort((a, b) => a.word.localeCompare(b.word)));
      this.newWord = "";
    });
  }
  removeWord(id) {
    this.api.removeBlockedWord(this.communityId, id).subscribe(() => {
      this.words.update((list) => list.filter((w) => w.id !== id));
    });
  }
  // ── Audit ──
  loadAudit() {
    this.loadingAudit.set(true);
    this.api.getAuditLog(this.communityId).subscribe({
      next: (list) => {
        this.audit.set(list);
        this.loadingAudit.set(false);
      },
      error: () => this.loadingAudit.set(false)
    });
  }
  label(action) {
    const map = {
      mute: "muted",
      unmute: "unmuted",
      ban: "banned",
      unban: "unbanned",
      kick: "removed",
      set_role: "role changed",
      rules_updated: "rules updated",
      policy_updated: "join policy updated",
      word_added: "word added",
      word_removed: "word removed",
      word_flagged: "message flagged"
    };
    return map[action] ?? action;
  }
  metaText(e) {
    if (!e.meta)
      return "";
    const m = e.meta;
    if (typeof m["word"] === "string")
      return `"${m["word"]}"`;
    if (typeof m["reason"] === "string" && m["reason"])
      return String(m["reason"]);
    if (typeof m["minutes"] === "number")
      return `${m["minutes"]} min`;
    if (typeof m["role"] === "string")
      return String(m["role"]);
    return "";
  }
  /** The flagged message id from an entry's meta, if present. */
  messageIdOf(e) {
    const m = e.meta ?? {};
    return typeof m["message_id"] === "string" ? m["message_id"] : null;
  }
  /** Channel id from an entry's meta, if present. */
  channelIdOf(e) {
    const m = e.meta ?? {};
    return typeof m["channel_id"] === "string" ? m["channel_id"] : null;
  }
  /** Jump to the flagged message in its channel (closes the panel). */
  view(e) {
    const messageId = this.messageIdOf(e);
    const channelId = this.channelIdOf(e);
    if (messageId && channelId) {
      this.jumpToMessage.emit({ channelId, messageId });
    }
  }
  /** Remove (soft-delete) the flagged message. */
  remove(e) {
    const messageId = this.messageIdOf(e);
    const channelId = this.channelIdOf(e);
    if (!messageId || !channelId)
      return;
    if (!confirm("Remove this message? It will be deleted for everyone."))
      return;
    this.state.deleteMessageById(channelId, messageId);
    this.removed.update((set) => new Set(set).add(messageId));
  }
  onBackdrop(ev) {
    if (this.embedded)
      return;
    if (ev.target.classList.contains("overlay"))
      this.close.emit();
  }
  static {
    this.\u0275fac = function AdminPanelComponent_Factory(t) {
      return new (t || _AdminPanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPanelComponent, selectors: [["app-admin-panel"]], inputs: { communityId: "communityId", embedded: "embedded" }, outputs: { close: "close", jumpToMessage: "jumpToMessage" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 16, consts: [[3, "click"], ["class", "ph", 4, "ngIf"], [1, "tabs"], [1, "body"], [4, "ngIf"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "hint"], ["rows", "12", "placeholder", "e.g.\n1. Be respectful.\n2. No spam or self-promotion.\n3. English or Arabic only.", 1, "rules-area", 3, "ngModelChange", "ngModel"], [1, "actions"], [1, "save", 3, "click", "disabled"], ["class", "saved", 4, "ngIf"], [1, "saved"], [1, "add-row"], ["placeholder", "word or phrase", "maxlength", "100", 1, "f", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "f", "mode", 3, "ngModelChange", "ngModel"], ["value", "block"], ["value", "flag"], [1, "mini", 3, "click", "disabled"], ["class", "hint", 4, "ngIf"], ["class", "word", 4, "ngFor", "ngForOf"], [1, "word"], [1, "w-text"], [1, "w-mode"], [1, "mini", "danger", 3, "click"], ["class", "entry", 4, "ngFor", "ngForOf"], [1, "entry"], [1, "e-line"], [1, "e-action"], [1, "e-time"], [1, "e-detail"], ["class", "e-meta", 4, "ngIf"], ["class", "e-actions", 4, "ngIf"], [1, "e-meta"], [1, "e-actions"], [1, "mini", 3, "click"], ["class", "mini danger", 3, "click", 4, "ngIf"], ["class", "removed-tag", 4, "ngIf"], [1, "removed-tag"]], template: function AdminPanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "aside");
        \u0275\u0275template(2, AdminPanelComponent_header_2_Template, 5, 0, "header", 1);
        \u0275\u0275elementStart(3, "nav", 2)(4, "button", 0);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_4_listener() {
          return ctx.tab.set("rules");
        });
        \u0275\u0275text(5, "Rules");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "button", 0);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_6_listener() {
          return ctx.switchTo("words");
        });
        \u0275\u0275text(7, "Blocked words");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 0);
        \u0275\u0275listener("click", function AdminPanelComponent_Template_button_click_8_listener() {
          return ctx.switchTo("audit");
        });
        \u0275\u0275text(9, "Audit log");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 3);
        \u0275\u0275template(11, AdminPanelComponent_section_11_Template, 8, 4, "section", 4)(12, AdminPanelComponent_section_12_Template, 20, 5, "section", 4)(13, AdminPanelComponent_section_13_Template, 5, 2, "section", 4);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("overlay", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("panel", !ctx.embedded)("embedded-body", ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.embedded);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "rules");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "words");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "audit");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.tab() === "rules");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tab() === "words");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tab() === "audit");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --gold: #d4af37;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.15);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 960;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: flex-end;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  height: 100%;\n  background: var(--bg);\n  border-left: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slide 0.18s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slide {\n  0% {\n    transform: translateX(40px);\n    opacity: 0;\n  }\n  60% {\n    transform: translateX(-6px);\n    opacity: 1;\n  }\n  80% {\n    transform: translateX(3px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.3rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n  padding: 0.6rem 1.1rem 0;\n  border-bottom: 1px solid var(--line);\n}\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--mut);\n  padding: 0.5rem 0.7rem;\n  cursor: pointer;\n  font-size: 0.85rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  transition: color 0.13s;\n}\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--accent-s);\n}\n.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: var(--accent-s);\n  border-bottom-color: var(--accent);\n}\n.body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.1rem 2rem;\n  min-height: 0;\n}\n.embedded-body[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.hint[_ngcontent-%COMP%] {\n  color: var(--mut);\n  font-size: 0.82rem;\n  margin: 0 0 0.7rem;\n  line-height: 1.5;\n}\n.rules-area[_ngcontent-%COMP%], .f[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--raised);\n  border: 1px solid rgba(124, 58, 237, 0.2);\n  border-radius: 8px;\n  padding: 0.55rem 0.7rem;\n  color: var(--text);\n  font-family:\n    "Archivo",\n    system-ui,\n    sans-serif;\n  font-size: 0.92rem;\n}\n.rules-area[_ngcontent-%COMP%] {\n  resize: vertical;\n  line-height: 1.5;\n}\n.rules-area[_ngcontent-%COMP%]:focus, .f[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  margin-top: 0.7rem;\n}\n.save[_ngcontent-%COMP%] {\n  background: var(--accent);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.5rem 1.1rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background 0.14s, box-shadow 0.14s;\n}\n.save[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n  box-shadow: 0 0 14px rgba(124, 58, 237, 0.4);\n}\n.save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.saved[_ngcontent-%COMP%] {\n  color: var(--accent-s);\n  font-size: 0.82rem;\n}\n.add-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  margin-bottom: 0.8rem;\n}\n.add-row[_ngcontent-%COMP%]   .f[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.add-row[_ngcontent-%COMP%]   .mode[_ngcontent-%COMP%] {\n  flex: 0 0 90px;\n}\n.mini[_ngcontent-%COMP%] {\n  background: var(--raised);\n  border: 1px solid rgba(124, 58, 237, 0.2);\n  color: #cfcfe0;\n  border-radius: 6px;\n  padding: 0.3rem 0.7rem;\n  font-size: 0.78rem;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: border-color 0.12s, color 0.12s;\n}\n.mini[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent);\n  color: var(--accent-s);\n}\n.mini[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.mini.danger[_ngcontent-%COMP%]:hover {\n  border-color: #ff6b6b;\n  color: #ff6b6b;\n}\n.word[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.45rem 0.6rem;\n  background: var(--surface);\n  border: 1px solid rgba(124, 58, 237, 0.15);\n  border-radius: 8px;\n  margin-bottom: 0.4rem;\n}\n.w-text[_ngcontent-%COMP%] {\n  flex: 1;\n  color: var(--text);\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.85rem;\n}\n.w-mode[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  padding: 0.1rem 0.45rem;\n  border-radius: 999px;\n  background: rgba(255, 107, 107, 0.18);\n  color: #ff8a8a;\n}\n.w-mode.flag[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.18);\n  color: var(--gold);\n}\n.entry[_ngcontent-%COMP%] {\n  padding: 0.5rem 0;\n  border-bottom: 1px solid rgba(124, 58, 237, 0.1);\n}\n.e-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.e-action[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  color: var(--accent-s);\n}\n.e-action[data-action=ban][_ngcontent-%COMP%], .e-action[data-action=word_flagged][_ngcontent-%COMP%] {\n  color: #ff8a8a;\n}\n.e-action[data-action=rules_updated][_ngcontent-%COMP%], .e-action[data-action=word_added][_ngcontent-%COMP%], .e-action[data-action=word_removed][_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.e-time[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--mut);\n}\n.e-detail[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #cfcfe0;\n  margin-top: 0.2rem;\n}\n.e-meta[_ngcontent-%COMP%] {\n  color: var(--mut);\n}\n.e-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-top: 0.45rem;\n}\n.removed-tag[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--mut);\n  font-style: italic;\n}\n/*# sourceMappingURL=admin-panel.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPanelComponent, { className: "AdminPanelComponent", filePath: "src\\app\\features\\community\\components\\admin-panel\\admin-panel.component.ts", lineNumber: 146 });
})();

// src/app/features/community/components/community-insights/community-insights.component.ts
function CommunityInsightsComponent_header_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 6)(1, "span", 7);
    \u0275\u0275text(2, "Insights");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 8);
    \u0275\u0275listener("click", function CommunityInsightsComponent_header_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close.emit());
    });
    \u0275\u0275text(4, "\u2715");
    \u0275\u0275elementEnd()();
  }
}
function CommunityInsightsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function CommunityInsightsComponent_ng_container_5_div_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("title", t_r3.date + ": " + t_r3.count);
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", ctx_r1.barHeight(t_r3.count), "%");
  }
}
function CommunityInsightsComponent_ng_container_5_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275template(1, CommunityInsightsComponent_ng_container_5_div_25_div_1_Template, 2, 3, "div", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", d_r4.trend);
  }
}
function CommunityInsightsComponent_ng_container_5_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No messages in this window.");
    \u0275\u0275elementEnd();
  }
}
function CommunityInsightsComponent_ng_container_5_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No activity yet.");
    \u0275\u0275elementEnd();
  }
}
function CommunityInsightsComponent_ng_container_5_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26);
    \u0275\u0275element(4, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const d_r4 = \u0275\u0275nextContext().ngIf;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("# ", c_r5.channel, "");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.pct(c_r5.count, d_r4.per_channel[0].count), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r5.count);
  }
}
function CommunityInsightsComponent_ng_container_5_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No activity yet.");
    \u0275\u0275elementEnd();
  }
}
function CommunityInsightsComponent_ng_container_5_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r7 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.initials(m_r6.name));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", m_r6.count, " msgs");
  }
}
function CommunityInsightsComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 10)(2, "div", 11)(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 13);
    \u0275\u0275text(6, "Messages");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 11)(8, "span", 12);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 13);
    \u0275\u0275text(11, "Members");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 11)(13, "span", 12);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 13);
    \u0275\u0275text(16, "Channels");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 11)(18, "span", 12);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 13);
    \u0275\u0275text(21, "Last 7 days");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "section", 14)(23, "h4");
    \u0275\u0275text(24, "Messages \xB7 last 14 days");
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, CommunityInsightsComponent_ng_container_5_div_25_Template, 2, 1, "div", 15)(26, CommunityInsightsComponent_ng_container_5_ng_template_26_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "section", 14)(29, "h4");
    \u0275\u0275text(30, "By channel");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, CommunityInsightsComponent_ng_container_5_p_31_Template, 2, 0, "p", 16)(32, CommunityInsightsComponent_ng_container_5_div_32_Template, 7, 4, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "section", 14)(34, "h4");
    \u0275\u0275text(35, "Most active members");
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, CommunityInsightsComponent_ng_container_5_p_36_Template, 2, 0, "p", 16)(37, CommunityInsightsComponent_ng_container_5_div_37_Template, 9, 4, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const d_r4 = ctx.ngIf;
    const noTrend_r8 = \u0275\u0275reference(27);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(d_r4.totals.messages);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(d_r4.totals.members);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(d_r4.totals.channels);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(d_r4.totals.messages_last_7);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.maxTrend() > 0)("ngIfElse", noTrend_r8);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", d_r4.per_channel.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", d_r4.per_channel);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", d_r4.top_members.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", d_r4.top_members);
  }
}
var CommunityInsightsComponent = class _CommunityInsightsComponent {
  constructor() {
    this.embedded = false;
    this.close = new EventEmitter();
    this.api = inject(CommunityService);
    this.data = signal(null);
    this.loading = signal(true);
    this.maxTrend = computed(() => {
      const d = this.data();
      if (!d)
        return 0;
      return d.trend.reduce((m, t) => Math.max(m, t.count), 0);
    });
  }
  ngOnInit() {
    this.api.getAnalytics(this.communityId).subscribe({
      next: (d) => {
        this.data.set(d);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  barHeight(count) {
    const max = this.maxTrend();
    return max > 0 ? Math.max(3, Math.round(count / max * 100)) : 0;
  }
  pct(count, max) {
    return max > 0 ? Math.max(2, Math.round(count / max * 100)) : 0;
  }
  /** Two-letter fallback for the member avatar circle. */
  initials(name) {
    return (name ?? "?").slice(0, 2).toUpperCase();
  }
  onBackdrop(ev) {
    if (this.embedded)
      return;
    if (ev.target.classList.contains("overlay"))
      this.close.emit();
  }
  static {
    this.\u0275fac = function CommunityInsightsComponent_Factory(t) {
      return new (t || _CommunityInsightsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommunityInsightsComponent, selectors: [["app-community-insights"]], inputs: { communityId: "communityId", embedded: "embedded" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 11, consts: [["noTrend", ""], [3, "click"], ["class", "ph", 4, "ngIf"], [1, "body"], ["class", "loading", 4, "ngIf"], [4, "ngIf"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "loading"], [1, "cards"], [1, "card"], [1, "num"], [1, "lbl"], [1, "block"], ["class", "trend", 4, "ngIf", "ngIfElse"], ["class", "hint", 4, "ngIf"], ["class", "row", 4, "ngFor", "ngForOf"], ["class", "member", 4, "ngFor", "ngForOf"], [1, "trend"], ["class", "bar-wrap", 3, "title", 4, "ngFor", "ngForOf"], [1, "bar-wrap", 3, "title"], [1, "bar"], [1, "hint"], [1, "row"], [1, "row-name"], [1, "row-bar"], [1, "row-fill"], [1, "row-num"], [1, "member"], [1, "rank"], [1, "m-ava"], [1, "m-name"], [1, "m-num"]], template: function CommunityInsightsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275listener("click", function CommunityInsightsComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "aside");
        \u0275\u0275template(2, CommunityInsightsComponent_header_2_Template, 5, 0, "header", 2);
        \u0275\u0275elementStart(3, "div", 3);
        \u0275\u0275template(4, CommunityInsightsComponent_div_4_Template, 2, 0, "div", 4)(5, CommunityInsightsComponent_ng_container_5_Template, 38, 10, "ng-container", 5);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("overlay", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("panel", !ctx.embedded)("embedded-body", ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275classProp("flush", ctx.embedded);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading() && ctx.data());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --gold: #d4af37;\n  --bg: #0b0a14;\n  --surface: #161228;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.15);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 960;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: flex-end;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  height: 100%;\n  background: var(--bg);\n  border-left: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n}\n.embedded-body[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.3rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.1rem 2rem;\n  min-height: 0;\n}\n.body.flush[_ngcontent-%COMP%] {\n  padding: 0.75rem 0 1rem;\n}\n.loading[_ngcontent-%COMP%], .hint[_ngcontent-%COMP%] {\n  color: var(--mut);\n  font-size: 0.85rem;\n}\n.cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.6rem;\n  margin-bottom: 1.4rem;\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 0.75rem 0.9rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.num[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.7rem;\n  color: var(--accent);\n  line-height: 1;\n}\n.lbl[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.68rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--mut);\n}\n.block[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\nh4[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--mut);\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 3px;\n  height: 90px;\n  padding: 0.3rem 0;\n}\n.bar-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 100%;\n  display: flex;\n  align-items: flex-end;\n}\n.bar[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--accent),\n      var(--accent-d));\n  border-radius: 3px 3px 0 0;\n  transition: height 0.2s ease;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-bottom: 0.45rem;\n}\n.row-name[_ngcontent-%COMP%] {\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  font-size: 0.8rem;\n  color: #cfcfe0;\n  flex: 0 0 30%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.row-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: var(--raised);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.row-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--accent);\n  border-radius: 999px;\n}\n.row-num[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mut);\n  flex: 0 0 auto;\n  min-width: 28px;\n  text-align: right;\n}\n.member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.4rem 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.rank[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  color: var(--gold);\n  width: 20px;\n}\n.m-ava[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--raised);\n  display: grid;\n  place-items: center;\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 0.72rem;\n  color: var(--accent);\n  box-shadow: inset 0 0 0 1px var(--line);\n  flex-shrink: 0;\n}\n.m-name[_ngcontent-%COMP%] {\n  flex: 1;\n  color: var(--text);\n  font-size: 0.9rem;\n}\n.m-num[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--mut);\n}\n/*# sourceMappingURL=community-insights.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommunityInsightsComponent, { className: "CommunityInsightsComponent", filePath: "src\\app\\features\\community\\components\\community-insights\\community-insights.component.ts", lineNumber: 119 });
})();

// src/app/features/community/components/manage-panel/manage-panel.component.ts
function ManagePanelComponent_app_channel_manage_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-channel-manage", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r0.communityId)("embedded", true);
  }
}
function ManagePanelComponent_app_join_panel_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-join-panel", 12);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r0.communityId)("initialPolicy", ctx_r0.initialPolicy)("embedded", true);
  }
}
function ManagePanelComponent_app_admin_panel_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-admin-panel", 13);
    \u0275\u0275listener("jumpToMessage", function ManagePanelComponent_app_admin_panel_19_Template_app_admin_panel_jumpToMessage_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.jumpToMessage.emit($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r0.communityId)("embedded", true);
  }
}
function ManagePanelComponent_app_community_insights_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-community-insights", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r0.communityId)("embedded", true);
  }
}
var ManagePanelComponent = class _ManagePanelComponent {
  constructor() {
    this.initialPolicy = "closed";
    this.close = new EventEmitter();
    this.jumpToMessage = new EventEmitter();
    this.tab = signal("channels");
  }
  onBackdrop(ev) {
    if (ev.target.classList.contains("overlay"))
      this.close.emit();
  }
  static {
    this.\u0275fac = function ManagePanelComponent_Factory(t) {
      return new (t || _ManagePanelComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManagePanelComponent, selectors: [["app-manage-panel"]], inputs: { communityId: "communityId", initialPolicy: "initialPolicy" }, outputs: { close: "close", jumpToMessage: "jumpToMessage" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 12, consts: [[1, "overlay", 3, "click"], [1, "panel"], [1, "ph"], [1, "title"], ["title", "Close", 1, "x", 3, "click"], [1, "tabs"], [3, "click"], [1, "content"], [3, "communityId", "embedded", 4, "ngIf"], [3, "communityId", "initialPolicy", "embedded", 4, "ngIf"], [3, "communityId", "embedded", "jumpToMessage", 4, "ngIf"], [3, "communityId", "embedded"], [3, "communityId", "initialPolicy", "embedded"], [3, "jumpToMessage", "communityId", "embedded"]], template: function ManagePanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ManagePanelComponent_Template_div_click_0_listener($event) {
          return ctx.onBackdrop($event);
        });
        \u0275\u0275elementStart(1, "aside", 1)(2, "header", 2)(3, "span", 3);
        \u0275\u0275text(4, "Manage community");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function ManagePanelComponent_Template_button_click_5_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(6, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "nav", 5)(8, "button", 6);
        \u0275\u0275listener("click", function ManagePanelComponent_Template_button_click_8_listener() {
          return ctx.tab.set("channels");
        });
        \u0275\u0275text(9, "Channels");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 6);
        \u0275\u0275listener("click", function ManagePanelComponent_Template_button_click_10_listener() {
          return ctx.tab.set("join");
        });
        \u0275\u0275text(11, "Join & invites");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 6);
        \u0275\u0275listener("click", function ManagePanelComponent_Template_button_click_12_listener() {
          return ctx.tab.set("admin");
        });
        \u0275\u0275text(13, "Admin & safety");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 6);
        \u0275\u0275listener("click", function ManagePanelComponent_Template_button_click_14_listener() {
          return ctx.tab.set("insights");
        });
        \u0275\u0275text(15, "Insights");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 7);
        \u0275\u0275template(17, ManagePanelComponent_app_channel_manage_17_Template, 1, 2, "app-channel-manage", 8)(18, ManagePanelComponent_app_join_panel_18_Template, 1, 3, "app-join-panel", 9)(19, ManagePanelComponent_app_admin_panel_19_Template, 1, 2, "app-admin-panel", 10)(20, ManagePanelComponent_app_community_insights_20_Template, 1, 2, "app-community-insights", 8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275classProp("active", ctx.tab() === "channels");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "join");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "admin");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "insights");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.tab() === "channels");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tab() === "join");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tab() === "admin");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tab() === "insights");
      }
    }, dependencies: [CommonModule, NgIf, ChannelManageComponent, JoinPanelComponent, AdminPanelComponent, CommunityInsightsComponent], styles: ['\n\n[_nghost-%COMP%] {\n  --accent: #7c3aed;\n  --accent-s: #a78bfa;\n  --bg: #0b0a14;\n  --raised: #1c1833;\n  --line: rgba(124,58,237,0.15);\n  --text: #eaeaf2;\n  --mut: #8a8a9e;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 960;\n  background: rgba(0, 0, 0, 0.55);\n  display: flex;\n  justify-content: flex-end;\n}\n.panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 500px;\n  height: 100%;\n  background: var(--bg);\n  border-left: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slide 0.18s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slide {\n  0% {\n    transform: translateX(40px);\n    opacity: 0;\n  }\n  60% {\n    transform: translateX(-6px);\n    opacity: 1;\n  }\n  80% {\n    transform: translateX(3px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n}\n.ph[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.1rem;\n  border-bottom: 1px solid var(--line);\n}\n.title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  font-size: 1.3rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text);\n}\n.x[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--mut);\n  cursor: pointer;\n  font-size: 1.05rem;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n}\n.x[_ngcontent-%COMP%]:hover {\n  background: var(--raised);\n  color: var(--text);\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n  padding: 0.6rem 1.1rem 0;\n  border-bottom: 1px solid var(--line);\n}\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--mut);\n  padding: 0.55rem 0.75rem;\n  cursor: pointer;\n  font-size: 0.86rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  transition: color 0.13s;\n}\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: var(--accent-s);\n}\n.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: var(--accent-s);\n  border-bottom-color: var(--accent);\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0 1.1rem 1.5rem;\n  min-height: 0;\n}\n/*# sourceMappingURL=manage-panel.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManagePanelComponent, { className: "ManagePanelComponent", filePath: "src\\app\\features\\community\\components\\manage-panel\\manage-panel.component.ts", lineNumber: 86 });
})();

// src/app/features/community/pages/channel-view/channel-view.component.ts
function ChannelViewComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function ChannelViewComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPinned.set(!ctx_r1.showPinned()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "line", 28)(3, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.pinned().length, " ");
  }
}
function ChannelViewComponent_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function ChannelViewComponent_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showManage.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 9);
    \u0275\u0275element(2, "path", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Manage ");
    \u0275\u0275elementEnd();
  }
}
function ChannelViewComponent_div_27_li_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const p_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (tmp_3_0 = p_r4.author.nickname) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "Unknown", ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.content);
  }
}
function ChannelViewComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 34);
    \u0275\u0275element(3, "line", 28)(4, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Pinned messages ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "ul");
    \u0275\u0275template(7, ChannelViewComponent_div_27_li_7_Template, 5, 2, "li", 35);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.pinned());
  }
}
function ChannelViewComponent_app_events_panel_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-events-panel", 38);
    \u0275\u0275listener("close", function ChannelViewComponent_app_events_panel_33_Template_app_events_panel_close_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showEvents.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r1.communityId());
  }
}
function ChannelViewComponent_app_manage_panel_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-manage-panel", 39);
    \u0275\u0275listener("close", function ChannelViewComponent_app_manage_panel_34_Template_app_manage_panel_close_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showManage.set(false));
    })("jumpToMessage", function ChannelViewComponent_app_manage_panel_34_Template_app_manage_panel_jumpToMessage_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onJumpToMessage($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r1.communityId())("initialPolicy", ctx_r1.joinPolicy());
  }
}
function ChannelViewComponent_app_rules_modal_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-rules-modal", 38);
    \u0275\u0275listener("close", function ChannelViewComponent_app_rules_modal_35_Template_app_rules_modal_close_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showRules.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("communityId", ctx_r1.communityId());
  }
}
var ChannelViewComponent = class _ChannelViewComponent {
  /**
   * Phase 6 — jump to a flagged message. Switches channel if needed, then
   * scrolls to and flashes the message. Closes the admin panel first.
   */
  onJumpToMessage(payload) {
    this.showManage.set(false);
    const slug = this.state.activeCommunity()?.slug;
    const currentChannel = this.state.activeChannelId();
    const scrollToIt = () => {
      setTimeout(() => {
        const el = document.getElementById("msg-" + payload.messageId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        this.state.flashMessage(payload.messageId);
      }, 400);
    };
    if (currentChannel === payload.channelId) {
      scrollToIt();
    } else if (slug) {
      this.router.navigate(["/community", slug, "channel", payload.channelId]).then(scrollToIt);
    }
  }
  /** Current community's join policy (defaults to closed if unknown). */
  joinPolicy() {
    return this.state.activeCommunity()?.join_policy ?? "closed";
  }
  /** Moderators+ (or platform admin) can open join settings. */
  canManageJoin() {
    const me = this.auth.currentUser();
    if (!me)
      return false;
    if (me.role === "admin")
      return true;
    const cid = this.communityId();
    if (!cid)
      return false;
    const member = (this.state.membersByCommunity()[cid] ?? []).find((m) => m.user.id === me.id);
    return !!member && (member.role === "owner" || member.role === "admin" || member.role === "moderator");
  }
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.state = inject(CommunityStateService);
    this.auth = inject(AuthService);
    this.reverb = inject(ReverbConnectionService);
    this.destroyRef = inject(DestroyRef);
    this.manageSeen = 0;
    this.manageEffect = effect(() => {
      const n = this.state.manageRequested();
      if (n > this.manageSeen) {
        this.manageSeen = n;
        if (this.canManageJoin())
          this.showManage.set(true);
      }
    });
    this.channel = this.state.activeChannel;
    this.showPinned = signal(false);
    this.showEvents = signal(false);
    this.showManage = signal(false);
    this.showRules = signal(false);
    this.communityId = this.state.activeCommunityId;
    this.pinned = computed(() => {
      const id = this.state.activeChannelId();
      return id ? this.state.pinnedByChannel()[id] ?? [] : [];
    });
    this.subscribedChannelId = null;
    this.pendingSlug = null;
    this.pendingChannelId = null;
    effect(() => {
      const communities = this.state.communities();
      if (communities.length > 0 && this.pendingSlug) {
        untracked(() => {
          const slug = this.pendingSlug;
          const channelId = this.pendingChannelId;
          this.pendingSlug = null;
          this.pendingChannelId = null;
          this.resolveChannel(slug, channelId);
        });
      }
    });
  }
  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => this.resolveChannel(params.get("slug"), params.get("channelId")));
  }
  ngOnDestroy() {
    if (this.subscribedChannelId) {
      this.reverb.unsubscribeFromChannel(this.subscribedChannelId);
    }
  }
  resolveChannel(slug, channelId) {
    if (!slug)
      return;
    const community = this.state.communities().find((c) => c.slug === slug);
    if (!community) {
      this.pendingSlug = slug;
      this.pendingChannelId = channelId;
      return;
    }
    this.pendingSlug = null;
    this.pendingChannelId = null;
    const switchingCommunity = this.state.activeCommunityId() !== community.id;
    this.state.activeCommunityId.set(community.id);
    this.state.loadMembers(community.id);
    if (switchingCommunity && !channelId) {
      this.state.activeChannelId.set(null);
    }
    const loaded = this.state.channelsByCommunity()[community.id];
    if (!loaded) {
      this.state.loadChannels(community.id, !channelId);
      if (!channelId)
        return;
    }
    const channels = loaded ?? community.channels ?? [];
    const targetId = channelId ?? channels.find((c) => !c.is_archived)?.id ?? null;
    if (!targetId)
      return;
    this.state.activeChannelId.set(targetId);
    this.state.loadMessages(targetId);
    this.state.loadPinned(targetId);
    this.state.markChannelRead(targetId);
    this.showPinned.set(false);
    if (this.subscribedChannelId && this.subscribedChannelId !== targetId) {
      this.reverb.unsubscribeFromChannel(this.subscribedChannelId);
    }
    this.reverb.subscribeToChannel(targetId);
    this.subscribedChannelId = targetId;
  }
  static {
    this.\u0275fac = function ChannelViewComponent_Factory(t) {
      return new (t || _ChannelViewComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChannelViewComponent, selectors: [["app-channel-view"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 36, vars: 8, consts: [[1, "channel-header"], [1, "channel-row"], [1, "channel-id"], [1, "channel-title"], [1, "hash"], [1, "channel-topic"], [1, "channel-tools"], ["class", "tool-btn pin-toggle", "title", "Pinned messages", 3, "click", 4, "ngIf"], ["title", "Community events", 1, "tool-btn", "events-toggle", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["width", "18", "height", "18", "x", "3", "y", "4", "rx", "2", "ry", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["title", "Community rules", 1, "tool-btn", "rules-toggle", 3, "click"], ["d", "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], ["points", "10 9 9 9 8 9"], ["class", "tool-btn manage-toggle", "title", "Manage community", 3, "click", 4, "ngIf"], ["class", "pinned-panel", 4, "ngIf"], [1, "channel-body"], [1, "messages-pane"], [1, "members-pane"], [3, "communityId", "close", 4, "ngIf"], [3, "communityId", "initialPolicy", "close", "jumpToMessage", 4, "ngIf"], ["title", "Pinned messages", 1, "tool-btn", "pin-toggle", 3, "click"], ["x1", "12", "y1", "17", "x2", "12", "y2", "22"], ["d", "M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"], ["title", "Manage community", 1, "tool-btn", "manage-toggle", 3, "click"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], [1, "pinned-panel"], [1, "pinned-head"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], [4, "ngFor", "ngForOf"], [1, "pin-author"], [1, "pin-content"], [3, "close", "communityId"], [3, "close", "jumpToMessage", "communityId", "initialPolicy"]], template: function ChannelViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        \u0275\u0275text(5, "#");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 6);
        \u0275\u0275template(10, ChannelViewComponent_button_10_Template, 5, 1, "button", 7);
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275listener("click", function ChannelViewComponent_Template_button_click_11_listener() {
          return ctx.showEvents.set(true);
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 9);
        \u0275\u0275element(13, "rect", 10)(14, "line", 11)(15, "line", 12)(16, "line", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275text(17, " Events ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(18, "button", 14);
        \u0275\u0275listener("click", function ChannelViewComponent_Template_button_click_18_listener() {
          return ctx.showRules.set(true);
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(19, "svg", 9);
        \u0275\u0275element(20, "path", 15)(21, "polyline", 16)(22, "line", 17)(23, "line", 18)(24, "polyline", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275text(25, " Rules ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, ChannelViewComponent_button_26_Template, 4, 0, "button", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, ChannelViewComponent_div_27_Template, 8, 1, "div", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(28, "div", 22)(29, "div", 23);
        \u0275\u0275element(30, "app-message-list")(31, "app-message-composer");
        \u0275\u0275elementEnd();
        \u0275\u0275element(32, "app-member-list", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275template(33, ChannelViewComponent_app_events_panel_33_Template, 1, 1, "app-events-panel", 25)(34, ChannelViewComponent_app_manage_panel_34_Template, 1, 2, "app-manage-panel", 26)(35, ChannelViewComponent_app_rules_modal_35_Template, 1, 1, "app-rules-modal", 25);
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_1_0;
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1("", (tmp_0_0 = ctx.channel()) == null ? null : tmp_0_0.name, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate((tmp_1_0 = ctx.channel()) == null ? null : tmp_1_0.topic);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.pinned().length > 0);
        \u0275\u0275advance(16);
        \u0275\u0275property("ngIf", ctx.canManageJoin());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPinned() && ctx.pinned().length > 0);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.showEvents() && ctx.communityId());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showManage() && ctx.communityId());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showRules() && ctx.communityId());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, MessageListComponent, MessageComposerComponent, MemberListComponent, EventsPanelComponent, RulesModalComponent, ManagePanelComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  min-height: 0;\n}\n.channel-header[_ngcontent-%COMP%] {\n  padding: 0.7rem 1.1rem;\n  border-bottom: 1px solid rgba(124, 58, 237, 0.18);\n  background: #0e0c1a;\n  flex-shrink: 0;\n}\n.channel-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.channel-id[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  min-width: 0;\n}\n.channel-tools[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  flex-shrink: 0;\n}\n.channel-title[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  text-transform: uppercase;\n  font-size: 1.2rem;\n  letter-spacing: 0.05em;\n  color: #eaeaf2;\n  display: flex;\n  align-items: center;\n}\n.hash[_ngcontent-%COMP%] {\n  margin-inline-end: 0.2rem;\n  color: #7c3aed;\n  opacity: 0.9;\n}\n.channel-topic[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #7a7a92;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.tool-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: rgba(124, 58, 237, 0.08);\n  border: 1px solid rgba(124, 58, 237, 0.22);\n  color: #a78bfa;\n  border-radius: 8px;\n  padding: 0.3rem 0.65rem;\n  cursor: pointer;\n  font-size: 0.78rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n  white-space: nowrap;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    box-shadow 0.15s;\n}\n.tool-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(124, 58, 237, 0.18);\n  border-color: #7c3aed;\n  box-shadow: 0 0 12px rgba(124, 58, 237, 0.25);\n  color: #c4b5fd;\n}\n.manage-toggle[_ngcontent-%COMP%] {\n  border-color: rgba(124, 58, 237, 0.35);\n}\n.pinned-panel[_ngcontent-%COMP%] {\n  margin-top: 0.6rem;\n  background: rgba(124, 58, 237, 0.07);\n  border: 1px solid rgba(124, 58, 237, 0.2);\n  border-radius: 10px;\n  padding: 0.55rem 0.85rem;\n  max-height: 180px;\n  overflow-y: auto;\n}\n.pinned-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  color: #a78bfa;\n  margin-bottom: 0.45rem;\n  font-family:\n    "JetBrains Mono",\n    ui-monospace,\n    monospace;\n}\n.pinned-panel[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.pinned-panel[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #c8cbe0;\n}\n.pin-author[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #e6e8f5;\n  margin-inline-end: 0.35rem;\n}\n.pin-content[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.channel-body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 240px;\n  flex: 1;\n  overflow: hidden;\n  min-height: 0;\n}\n.messages-pane[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-height: 0;\n}\n.members-pane[_ngcontent-%COMP%] {\n  border-inline-start: 1px solid rgba(124, 58, 237, 0.15);\n  background: #110f1e;\n  overflow-y: auto;\n}\n@media (max-width: 1024px) {\n  .members-pane[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=channel-view.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChannelViewComponent, { className: "ChannelViewComponent", filePath: "src\\app\\features\\community\\pages\\channel-view\\channel-view.component.ts", lineNumber: 165 });
})();
export {
  ChannelViewComponent
};
//# sourceMappingURL=chunk-7EK7KIYF.js.map
