import {
  VoicePlayerComponent,
  VoiceRecorderService
} from "./chunk-UCVFPWUM.js";
import {
  DmService
} from "./chunk-5L7FNWZJ.js";
import {
  ToastService
} from "./chunk-MOASSL4Z.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-LNNIKBGT.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-ZNMMCWK4.js";
import {
  CommonModule,
  DatePipe,
  InputFlags,
  effect,
  inject,
  input,
  signal,
  viewChild,
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
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-3NRO4OA5.js";
import {
  __async
} from "./chunk-7XEFWCRO.js";

// src/app/features/social/messages-page.component.ts
var _c0 = ["feed"];
var _forTrack0 = ($index, $item) => $item.id;
var _c1 = () => [1, 2, 3, 4];
function MessagesPageComponent_Conditional_11_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 11);
  }
}
function MessagesPageComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MessagesPageComponent_Conditional_11_For_1_Template, 1, 0, "div", 11, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function MessagesPageComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "p");
    \u0275\u0275text(2, "No conversations yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 13);
    \u0275\u0275text(4, "Message a friend");
    \u0275\u0275elementEnd()();
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("src", c_r2.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", c_r2.user.display_name);
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((c_r2.user.display_name || "?").charAt(0));
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MessagesPageComponent_Conditional_13_For_1_Conditional_2_Conditional_0_Template, 1, 2, "img", 23)(1, MessagesPageComponent_Conditional_13_For_1_Conditional_2_Conditional_1_Template, 2, 1);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(0, c_r2.user.avatar_url ? 0 : 1);
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    let tmp_13_0;
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", c_r2.group.logo_url, \u0275\u0275sanitizeUrl)("alt", (tmp_13_0 = c_r2.group.name) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "Group");
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((c_r2.group == null ? null : c_r2.group.tag) || (c_r2.group == null ? null : c_r2.group.name) || "#").charAt(0).toUpperCase());
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", c_r2.user.display_name, " ");
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    let tmp_12_0;
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", ((c_r2.group == null ? null : c_r2.group.tag) ? "[" + c_r2.group.tag + "] " : "") + ((tmp_12_0 = c_r2.group == null ? null : c_r2.group.name) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "Team chat"), " ");
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, c_r2.last_message.created_at, "shortTime"));
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate2(" ", c_r2.last_message.sender_id === ctx_r2.dm.myId ? "You: " : "", "", c_r2.last_message.body, " ");
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Say hi ");
  }
}
function MessagesPageComponent_Conditional_13_For_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r2.unread);
  }
}
function MessagesPageComponent_Conditional_13_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function MessagesPageComponent_Conditional_13_For_1_Template_button_click_0_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.dm.activate(c_r2.id));
    });
    \u0275\u0275elementStart(1, "span", 16);
    \u0275\u0275template(2, MessagesPageComponent_Conditional_13_For_1_Conditional_2_Template, 2, 1)(3, MessagesPageComponent_Conditional_13_For_1_Conditional_3_Template, 1, 2)(4, MessagesPageComponent_Conditional_13_For_1_Conditional_4_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 17)(6, "span", 18)(7, "span", 19);
    \u0275\u0275template(8, MessagesPageComponent_Conditional_13_For_1_Conditional_8_Template, 1, 1)(9, MessagesPageComponent_Conditional_13_For_1_Conditional_9_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, MessagesPageComponent_Conditional_13_For_1_Conditional_10_Template, 3, 4, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 21);
    \u0275\u0275template(12, MessagesPageComponent_Conditional_13_For_1_Conditional_12_Template, 1, 2)(13, MessagesPageComponent_Conditional_13_For_1_Conditional_13_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, MessagesPageComponent_Conditional_13_For_1_Conditional_14_Template, 2, 1, "span", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", c_r2.id === ctx_r2.dm.activeId());
    \u0275\u0275advance();
    \u0275\u0275classProp("dm-ava--group", !c_r2.user);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, c_r2.user ? 2 : (c_r2.group == null ? null : c_r2.group.logo_url) ? 3 : 4);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(8, c_r2.user ? 8 : 9);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, c_r2.last_message ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(12, c_r2.last_message ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(14, c_r2.unread > 0 ? 14 : -1);
  }
}
function MessagesPageComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MessagesPageComponent_Conditional_13_For_1_Template, 15, 9, "button", 14, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.dm.conversations());
  }
}
function MessagesPageComponent_Conditional_15_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    const conv_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", conv_r5.user.avatar_url, \u0275\u0275sanitizeUrl)("alt", conv_r5.user.display_name);
  }
}
function MessagesPageComponent_Conditional_15_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const conv_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((conv_r5.user.display_name || "?").charAt(0));
  }
}
function MessagesPageComponent_Conditional_15_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MessagesPageComponent_Conditional_15_Conditional_5_Conditional_0_Template, 1, 2, "img", 23)(1, MessagesPageComponent_Conditional_15_Conditional_5_Conditional_1_Template, 2, 1);
  }
  if (rf & 2) {
    const conv_r5 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, conv_r5.user.avatar_url ? 0 : 1);
  }
}
function MessagesPageComponent_Conditional_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 23);
  }
  if (rf & 2) {
    let tmp_5_0;
    const conv_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("src", conv_r5.group.logo_url, \u0275\u0275sanitizeUrl)("alt", (tmp_5_0 = conv_r5.group == null ? null : conv_r5.group.name) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : "Group");
  }
}
function MessagesPageComponent_Conditional_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const conv_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((conv_r5.group == null ? null : conv_r5.group.tag) || (conv_r5.group == null ? null : conv_r5.group.name) || "#").charAt(0).toUpperCase());
  }
}
function MessagesPageComponent_Conditional_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const conv_r5 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", conv_r5.user.display_name, " ");
  }
}
function MessagesPageComponent_Conditional_15_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    let tmp_4_0;
    const conv_r5 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ((conv_r5.group == null ? null : conv_r5.group.tag) ? "[" + conv_r5.group.tag + "] " : "") + ((tmp_4_0 = conv_r5.group == null ? null : conv_r5.group.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "Team chat"), " ");
  }
}
function MessagesPageComponent_Conditional_15_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const conv_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate("@" + conv_r5.user.nickname);
  }
}
function MessagesPageComponent_Conditional_15_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1, "Team chat");
    \u0275\u0275elementEnd();
  }
}
function MessagesPageComponent_Conditional_15_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1, "Loading\u2026");
    \u0275\u0275elementEnd();
  }
}
function MessagesPageComponent_Conditional_15_For_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275element(1, "app-voice-player", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const m_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", m_r6.audio_url)("durationMs", (tmp_15_0 = m_r6.audio_duration_ms) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : null)("mine", m_r6.sender_id === ctx_r2.dm.myId);
  }
}
function MessagesPageComponent_Conditional_15_For_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r6.body);
  }
}
function MessagesPageComponent_Conditional_15_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275template(1, MessagesPageComponent_Conditional_15_For_18_Conditional_1_Template, 2, 3, "div", 38)(2, MessagesPageComponent_Conditional_15_For_18_Conditional_2_Template, 2, 1);
    \u0275\u0275elementStart(3, "div", 39);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("dm-msg--mine", m_r6.sender_id === ctx_r2.dm.myId);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, m_r6.audio_url ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 4, m_r6.created_at, "shortTime"));
  }
}
function MessagesPageComponent_Conditional_15_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275element(1, "span", 42);
    \u0275\u0275elementStart(2, "span", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 44);
    \u0275\u0275text(5, "Recording \u2014 tap send when done");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 45);
    \u0275\u0275listener("click", function MessagesPageComponent_Conditional_15_Conditional_19_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelVoice());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 46);
    \u0275\u0275element(8, "line", 47)(9, "line", 48);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "button", 49);
    \u0275\u0275listener("click", function MessagesPageComponent_Conditional_15_Conditional_19_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r7);
      const conv_r5 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.stopAndSendVoice(conv_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 5);
    \u0275\u0275element(12, "line", 50)(13, "polygon", 51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.recTime());
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r2.sending());
  }
}
function MessagesPageComponent_Conditional_15_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 5);
    \u0275\u0275element(2, "line", 50)(3, "polygon", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r2.sending());
  }
}
function MessagesPageComponent_Conditional_15_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function MessagesPageComponent_Conditional_15_Conditional_20_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.startVoice());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 56);
    \u0275\u0275element(2, "path", 57)(3, "path", 58)(4, "line", 59)(5, "line", 60);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", !ctx_r2.rec.supported())("title", ctx_r2.rec.supported() ? "Record voice message" : "Recording not supported");
  }
}
function MessagesPageComponent_Conditional_15_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 52);
    \u0275\u0275listener("ngSubmit", function MessagesPageComponent_Conditional_15_Conditional_20_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r8);
      const conv_r5 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.send(conv_r5));
    });
    \u0275\u0275elementStart(1, "textarea", 53);
    \u0275\u0275twoWayListener("ngModelChange", function MessagesPageComponent_Conditional_15_Conditional_20_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.draft, $event) || (ctx_r2.draft = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function MessagesPageComponent_Conditional_15_Conditional_20_Template_textarea_keydown_enter_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const conv_r5 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onEnter($event, conv_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, MessagesPageComponent_Conditional_15_Conditional_20_Conditional_2_Template, 4, 1, "button", 54)(3, MessagesPageComponent_Conditional_15_Conditional_20_Conditional_3_Template, 6, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const conv_r5 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate1("placeholder", "Message ", (tmp_4_0 = (tmp_4_0 = conv_r5.user == null ? null : conv_r5.user.display_name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : conv_r5.group == null ? null : conv_r5.group.name) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : "group", "\u2026");
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.draft);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, ctx_r2.draft.trim() ? 2 : conv_r5.user ? 3 : -1);
  }
}
function MessagesPageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 25)(1, "button", 26);
    \u0275\u0275listener("click", function MessagesPageComponent_Conditional_15_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dm.activeId.set(null));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 27);
    \u0275\u0275element(3, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 29);
    \u0275\u0275template(5, MessagesPageComponent_Conditional_15_Conditional_5_Template, 2, 1)(6, MessagesPageComponent_Conditional_15_Conditional_6_Template, 1, 2)(7, MessagesPageComponent_Conditional_15_Conditional_7_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 30)(9, "div", 31);
    \u0275\u0275template(10, MessagesPageComponent_Conditional_15_Conditional_10_Template, 1, 1)(11, MessagesPageComponent_Conditional_15_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, MessagesPageComponent_Conditional_15_Conditional_12_Template, 2, 1, "div", 32)(13, MessagesPageComponent_Conditional_15_Conditional_13_Template, 2, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 33, 0);
    \u0275\u0275template(16, MessagesPageComponent_Conditional_15_Conditional_16_Template, 2, 0, "div", 34);
    \u0275\u0275repeaterCreate(17, MessagesPageComponent_Conditional_15_For_18_Template, 6, 7, "div", 35, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, MessagesPageComponent_Conditional_15_Conditional_19_Template, 14, 2, "div", 36)(20, MessagesPageComponent_Conditional_15_Conditional_20_Template, 4, 4);
  }
  if (rf & 2) {
    const conv_r5 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("dm-ava--group", !conv_r5.user);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, conv_r5.user ? 5 : (conv_r5.group == null ? null : conv_r5.group.logo_url) ? 6 : 7);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(10, conv_r5.user ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(12, (conv_r5.user == null ? null : conv_r5.user.nickname) ? 12 : (conv_r5.group == null ? null : conv_r5.group.kind) === "team" ? 13 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(16, ctx_r2.dm.loadingThread() && ctx_r2.dm.activeMessages().length === 0 ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.dm.activeMessages());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(19, ctx_r2.rec.recording() ? 19 : 20);
  }
}
function MessagesPageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 62);
    \u0275\u0275element(2, "path", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Your messages");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Pick a conversation, or start one from a friend's profile.");
    \u0275\u0275elementEnd()();
  }
}
var MessagesPageComponent = class _MessagesPageComponent {
  constructor() {
    this.dm = inject(DmService);
    this.rec = inject(VoiceRecorderService);
    this.toast = inject(ToastService);
    this.route = inject(ActivatedRoute);
    this.feed = viewChild("feed");
    this.embedded = input(false);
    this.draft = "";
    this.sending = signal(false);
    effect(() => {
      this.dm.activeMessages();
      queueMicrotask(() => {
        const el = this.feed()?.nativeElement;
        if (el)
          el.scrollTop = el.scrollHeight;
      });
    });
  }
  ngOnInit() {
    this.dm.loadConversations();
    const convId = this.route.snapshot.queryParamMap.get("conversation");
    if (convId)
      this.dm.activate(convId);
  }
  onEnter(ev, conv) {
    const e = ev;
    if (e.shiftKey)
      return;
    e.preventDefault();
    this.send(conv);
  }
  send(conv) {
    const body = this.draft.trim();
    if (!body || this.sending())
      return;
    this.sending.set(true);
    this.dm.send(conv, body).subscribe({
      next: () => {
        this.draft = "";
        this.sending.set(false);
      },
      error: (e) => {
        this.toast.error(e?.error?.message ?? "Could not send.");
        this.sending.set(false);
      }
    });
  }
  // ── Voice notes ───────────────────────────────────────────────────
  recTime() {
    const s = Math.floor(this.rec.elapsedMs() / 1e3);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  }
  startVoice() {
    return __async(this, null, function* () {
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
  stopAndSendVoice(conv) {
    return __async(this, null, function* () {
      if (this.sending())
        return;
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
      this.sending.set(true);
      this.dm.sendVoice(conv, clip.blob, clip.durationMs).subscribe({
        next: () => this.sending.set(false),
        error: (e) => {
          this.toast.error(e?.error?.message ?? "Could not send voice note.");
          this.sending.set(false);
        }
      });
    });
  }
  static {
    this.\u0275fac = function MessagesPageComponent_Factory(t) {
      return new (t || _MessagesPageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MessagesPageComponent, selectors: [["app-messages-page"]], viewQuery: function MessagesPageComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuerySignal(ctx.feed, _c0, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
      }
    }, hostVars: 2, hostBindings: function MessagesPageComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("embedded", ctx.embedded());
      }
    }, inputs: { embedded: [InputFlags.SignalBased, "embedded"] }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 17, vars: 4, consts: [["feed", ""], [1, "dm"], [1, "dm-list"], [1, "dm-list__head"], ["routerLink", "/friends", "title", "Friends", 1, "dm-list__friends"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M22 21v-2a4 4 0 0 0-3-3.87"], ["d", "M16 3.13a4 4 0 0 1 0 7.75"], [1, "dm-thread"], [1, "dm-skel"], [1, "dm-empty", "dm-empty--list"], ["routerLink", "/friends", 1, "dm-btn", "dm-btn--primary"], [1, "dm-conv", 3, "active"], [1, "dm-conv", 3, "click"], [1, "dm-ava"], [1, "dm-conv__body"], [1, "dm-conv__top"], [1, "dm-conv__name"], [1, "dm-conv__time"], [1, "dm-conv__preview"], [1, "dm-conv__badge"], [3, "src", "alt"], [1, "dm-ava-letter"], [1, "dm-thread__head"], ["aria-label", "Back", 1, "dm-back", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "m15 18-6-6 6-6"], [1, "dm-ava", "dm-ava--sm"], [1, "dm-thread__who"], [1, "dm-thread__name"], [1, "dm-thread__nick"], [1, "dm-feed"], [1, "dm-loading"], [1, "dm-msg", 3, "dm-msg--mine"], [1, "dm-composer", "dm-rec"], [1, "dm-msg"], [1, "dm-bubble", "dm-bubble--audio"], [1, "dm-meta"], [3, "src", "durationMs", "mine"], [1, "dm-bubble"], [1, "dm-rec__dot"], [1, "dm-rec__time"], [1, "dm-rec__label"], ["type", "button", "title", "Cancel", 1, "dm-rec__cancel", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["type", "button", "aria-label", "Send voice", 1, "dm-send", 3, "click", "disabled"], ["x1", "22", "y1", "2", "x2", "11", "y2", "13"], ["points", "22 2 15 22 11 13 2 9 22 2"], [1, "dm-composer", 3, "ngSubmit"], ["name", "draft", "rows", "1", 1, "dm-input", 3, "ngModelChange", "keydown.enter", "ngModel", "placeholder"], ["type", "submit", "aria-label", "Send", 1, "dm-send", 3, "disabled"], ["type", "button", "aria-label", "Record voice message", 1, "dm-mic", 3, "click", "disabled", "title"], ["width", "19", "height", "19", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"], ["d", "M19 10v2a7 7 0 0 1-14 0v-2"], ["x1", "12", "y1", "19", "x2", "12", "y2", "23"], ["x1", "8", "y1", "23", "x2", "16", "y2", "23"], [1, "dm-empty"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.4", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"]], template: function MessagesPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "aside", 2)(2, "header", 3)(3, "h1");
        \u0275\u0275text(4, "Messages");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "a", 4);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(6, "svg", 5);
        \u0275\u0275element(7, "path", 6)(8, "circle", 7)(9, "path", 8)(10, "path", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(11, MessagesPageComponent_Conditional_11_Template, 2, 1)(12, MessagesPageComponent_Conditional_12_Template, 5, 0)(13, MessagesPageComponent_Conditional_13_Template, 2, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(14, "section", 10);
        \u0275\u0275template(15, MessagesPageComponent_Conditional_15_Template, 21, 7)(16, MessagesPageComponent_Conditional_16_Template, 7, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_2_0;
        \u0275\u0275advance();
        \u0275\u0275classProp("dm-list--hidden-mobile", ctx.dm.activeId());
        \u0275\u0275advance(10);
        \u0275\u0275conditional(11, ctx.dm.loadingList() && ctx.dm.conversations().length === 0 ? 11 : ctx.dm.conversations().length === 0 ? 12 : 13);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(15, (tmp_2_0 = ctx.dm.activeConversation()) ? 15 : 16, tmp_2_0);
      }
    }, dependencies: [CommonModule, DatePipe, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink, VoicePlayerComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.embedded[_nghost-%COMP%] {\n  height: 100%;\n  min-height: 0;\n}\n.dm[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 320px 1fr;\n  height: calc(100vh - 60px);\n  color: var(--text, #ececf1);\n}\n.embedded[_nghost-%COMP%]   .dm[_ngcontent-%COMP%] {\n  height: 100%;\n}\n@media (max-width: 760px) {\n  .dm[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .dm-list--hidden-mobile[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.dm-list[_ngcontent-%COMP%] {\n  border-right: 1px solid var(--br, rgba(255,255,255,.08));\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  background: var(--bg, #0a0a12);\n}\n.dm-list__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 18px 18px 12px;\n  position: sticky;\n  top: 0;\n  background: var(--bg, #0a0a12);\n}\n.dm-list__head[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 24px;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n  margin: 0;\n}\n.dm-list__friends[_ngcontent-%COMP%] {\n  color: var(--mu, #8a8aa0);\n  display: grid;\n  place-items: center;\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  &:hover {\n    color: var(--text);\n    background: rgba(255, 255, 255, .05);\n  }\n}\n.dm-conv[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 11px 14px;\n  width: 100%;\n  text-align: left;\n  background: transparent;\n  border: none;\n  border-left: 2px solid transparent;\n  cursor: pointer;\n  color: inherit;\n  transition: background .12s, border-color .12s;\n}\n.dm-conv[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, .03);\n}\n.dm-conv.active[_ngcontent-%COMP%] {\n  background: rgba(0, 108, 53, .1);\n  border-left-color: var(--primary, #006c35);\n}\n.dm-conv__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.dm-conv__top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 8px;\n}\n.dm-conv__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dm-conv__time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--mu);\n  flex-shrink: 0;\n}\n.dm-conv__preview[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12.5px;\n  color: var(--mu, #8a8aa0);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 2px;\n}\n.dm-conv__badge[_ngcontent-%COMP%] {\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 100px;\n  background: var(--primary, #006c35);\n  color: #fff;\n  font-family: var(--fm, monospace);\n  font-size: 10px;\n  font-weight: 700;\n  display: grid;\n  place-items: center;\n  flex-shrink: 0;\n}\n.dm-ava[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n  display: grid;\n  place-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary,#006c35),\n      var(--accent,#d4af37));\n}\n.dm-ava[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.dm-ava-letter[_ngcontent-%COMP%] {\n  font-family: var(--fh, sans-serif);\n  font-size: 18px;\n  color: #fff;\n}\n.dm-ava--sm[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n}\n.dm-thread[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.dm-thread__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 18px;\n  border-bottom: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.dm-back[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  color: var(--text);\n  cursor: pointer;\n}\n@media (max-width: 760px) {\n  .dm-back[_ngcontent-%COMP%] {\n    display: grid;\n    place-items: center;\n  }\n}\n.dm-thread__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 15px;\n}\n.dm-thread__nick[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--mu);\n}\n.dm-feed[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.dm-msg[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  max-width: 72%;\n}\n.dm-msg--mine[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  align-items: flex-end;\n}\n.dm-bubble[_ngcontent-%COMP%] {\n  padding: 9px 13px;\n  border-radius: 14px;\n  font-size: 14px;\n  line-height: 1.4;\n  word-break: break-word;\n  background: var(--bg3, #181826);\n  border: 1px solid var(--br, rgba(255,255,255,.08));\n  border-bottom-left-radius: 4px;\n}\n.dm-msg--mine[_ngcontent-%COMP%]   .dm-bubble[_ngcontent-%COMP%] {\n  background: var(--primary, #006c35);\n  border-color: transparent;\n  color: #fff;\n  border-bottom-left-radius: 14px;\n  border-bottom-right-radius: 4px;\n}\n.dm-meta[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--mu, #8a8aa0);\n  margin-top: 3px;\n  padding: 0 4px;\n}\n.dm-composer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: flex-end;\n  padding: 12px 16px;\n  border-top: 1px solid var(--br, rgba(255,255,255,.08));\n}\n.dm-input[_ngcontent-%COMP%] {\n  flex: 1;\n  resize: none;\n  max-height: 120px;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  border-radius: 12px;\n  padding: 11px 14px;\n  color: var(--text);\n  font-family: var(--fb, sans-serif);\n  font-size: 14px;\n  outline: none;\n  &:focus {\n    border-color: var(--primary, #006c35);\n  }\n}\n.dm-send[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  background: var(--primary, #006c35);\n  color: #fff;\n  display: grid;\n  place-items: center;\n  transition: background .15s, opacity .15s;\n  &:hover:not(:disabled) {\n    background: var(--primary-soft, #2d8c5e);\n  }\n  &:disabled {\n    opacity: .45;\n    cursor: not-allowed;\n  }\n}\n.dm-mic[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  flex-shrink: 0;\n  border-radius: 12px;\n  cursor: pointer;\n  background: var(--bg2, #10101c);\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  color: var(--mu, #8a8aa0);\n  display: grid;\n  place-items: center;\n  transition:\n    color .15s,\n    border-color .15s,\n    background .15s;\n  &:hover:not(:disabled) {\n    color: var(--primary, #4ade80);\n    border-color: rgba(0, 108, 53, .5);\n    background: rgba(0, 108, 53, .08);\n  }\n  &:disabled {\n    opacity: .4;\n    cursor: not-allowed;\n  }\n}\n.dm-rec[_ngcontent-%COMP%] {\n  align-items: center;\n  gap: 10px;\n}\n.dm-rec__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #ef4444;\n  box-shadow: 0 0 8px #ef4444;\n  animation: _ngcontent-%COMP%_recPulse 1.1s ease-in-out infinite;\n  flex-shrink: 0;\n}\n.dm-rec__time[_ngcontent-%COMP%] {\n  font-family: var(--fm, monospace);\n  font-size: 14px;\n  color: var(--text);\n  min-width: 38px;\n}\n.dm-rec__label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  color: var(--mu, #8a8aa0);\n}\n.dm-rec__cancel[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  flex-shrink: 0;\n  border-radius: 10px;\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid var(--br2, rgba(255,255,255,.14));\n  color: var(--mu);\n  display: grid;\n  place-items: center;\n  &:hover {\n    color: #fca5a5;\n    border-color: rgba(239, 68, 68, .4);\n  }\n}\n.dm-bubble--audio[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n}\n@keyframes _ngcontent-%COMP%_recPulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: .35;\n  }\n}\n.dm-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  text-align: center;\n  color: var(--mu, #8a8aa0);\n  svg {\n    color: var(--dim, #55556e);\n    margin-bottom: 12px;\n  }\n  h3 {\n    color: var(--text);\n    margin: 0 0 6px;\n    font-family: var(--fh, sans-serif);\n    letter-spacing: .5px;\n  }\n  p {\n    margin: 0;\n    max-width: 36ch;\n  }\n}\n.dm-empty--list[_ngcontent-%COMP%] {\n  height: auto;\n  padding: 40px 20px;\n}\n.dm-btn[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 13px;\n  text-decoration: none;\n  cursor: pointer;\n  margin-top: 12px;\n}\n.dm-btn--primary[_ngcontent-%COMP%] {\n  background: var(--primary,#006c35);\n  color: #fff;\n}\n.dm-skel[_ngcontent-%COMP%] {\n  height: 62px;\n  margin: 4px 12px;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, .05);\n  animation: _ngcontent-%COMP%_dmPulse 1.5s ease-in-out infinite;\n}\n.dm-loading[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--mu);\n  padding: 20px;\n  font-size: 13px;\n}\n@keyframes _ngcontent-%COMP%_dmPulse {\n  0%, 100% {\n    opacity: .5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .dm-skel[_ngcontent-%COMP%], .dm-rec__dot[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=messages-page.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MessagesPageComponent, { className: "MessagesPageComponent", filePath: "src\\app\\features\\social\\messages-page.component.ts", lineNumber: 245 });
})();

export {
  MessagesPageComponent
};
//# sourceMappingURL=chunk-6HJMVQ2X.js.map
