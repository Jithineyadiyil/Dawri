import {
  CommunityStateService
} from "./chunk-QBAOKTDJ.js";
import {
  CommunityService
} from "./chunk-GFWMVHEB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-3NRO4OA5.js";
import "./chunk-7XEFWCRO.js";

// src/app/features/community/pages/community-admin/community-admin.component.ts
function CommunityAdminComponent_section_3_ng_container_18_tr_1_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function CommunityAdminComponent_section_3_ng_container_18_tr_1_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ch_r3 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.archive(ch_r3));
    });
    \u0275\u0275text(1, "Archive");
    \u0275\u0275elementEnd();
  }
}
function CommunityAdminComponent_section_3_ng_container_18_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 12)(10, "button", 13);
    \u0275\u0275listener("click", function CommunityAdminComponent_section_3_ng_container_18_tr_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ch_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.startEdit(ch_r3));
    });
    \u0275\u0275text(11, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, CommunityAdminComponent_section_3_ng_container_18_tr_1_button_12_Template, 2, 0, "button", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ch_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", ch_r3.name, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ch_r3.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ch_r3.topic || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ch_r3.position);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ch_r3.is_archived);
  }
}
function CommunityAdminComponent_section_3_ng_container_18_tr_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 16)(1, "td")(2, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function CommunityAdminComponent_section_3_ng_container_18_tr_2_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.editName, $event) || (ctx_r3.editName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function CommunityAdminComponent_section_3_ng_container_18_tr_2_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.editTopic, $event) || (ctx_r3.editTopic = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 12)(10, "button", 8);
    \u0275\u0275listener("click", function CommunityAdminComponent_section_3_ng_container_18_tr_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ch_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.saveEdit(ch_r3));
    });
    \u0275\u0275text(11, "Save");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 13);
    \u0275\u0275listener("click", function CommunityAdminComponent_section_3_ng_container_18_tr_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.cancelEdit());
    });
    \u0275\u0275text(13, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ch_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.editName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ch_r3.type);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.editTopic);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ch_r3.position);
  }
}
function CommunityAdminComponent_section_3_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, CommunityAdminComponent_section_3_ng_container_18_tr_1_Template, 13, 5, "tr", 9)(2, CommunityAdminComponent_section_3_ng_container_18_tr_2_Template, 14, 4, "tr", 10);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ch_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.editingId() !== ch_r3.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.editingId() === ch_r3.id);
  }
}
function CommunityAdminComponent_section_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section")(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "table", 2)(6, "thead")(7, "tr")(8, "th");
    \u0275\u0275text(9, "Channel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Topic");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Position");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, CommunityAdminComponent_section_3_ng_container_18_Template, 3, 2, "ng-container", 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 3)(20, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function CommunityAdminComponent_section_3_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newChannelName, $event) || (ctx_r3.newChannelName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 5);
    \u0275\u0275twoWayListener("ngModelChange", function CommunityAdminComponent_section_3_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newChannelType, $event) || (ctx_r3.newChannelType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option", 6);
    \u0275\u0275text(23, "text");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 7);
    \u0275\u0275text(25, "announcement");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 8);
    \u0275\u0275listener("click", function CommunityAdminComponent_section_3_Template_button_click_26_listener() {
      const c_r7 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addChannel(c_r7));
    });
    \u0275\u0275text(27, "Create channel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const c_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", c_r7.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", c_r7.type, ")");
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", c_r7.channels);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newChannelName);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newChannelType);
  }
}
var CommunityAdminComponent = class _CommunityAdminComponent {
  constructor() {
    this.state = inject(CommunityStateService);
    this.api = inject(CommunityService);
    this.communities = this.state.communities;
    this.newChannelName = "";
    this.newChannelType = "text";
    this.editingId = signal(null);
    this.editName = "";
    this.editTopic = "";
  }
  ngOnInit() {
    this.state.loadCommunities();
  }
  addChannel(community) {
    if (!this.newChannelName)
      return;
    this.api.createChannel(community.id, {
      name: this.newChannelName,
      type: this.newChannelType
    }).subscribe(() => {
      this.newChannelName = "";
      this.state.loadChannels(community.id);
    });
  }
  startEdit(channel) {
    this.editName = channel.name;
    this.editTopic = channel.topic ?? "";
    this.editingId.set(channel.id);
  }
  cancelEdit() {
    this.editingId.set(null);
    this.editName = "";
    this.editTopic = "";
  }
  saveEdit(channel) {
    const name = this.editName.trim();
    if (name.length === 0)
      return;
    this.api.updateChannel(channel.id, {
      name,
      topic: this.editTopic.trim()
    }).subscribe(() => {
      this.editingId.set(null);
      this.state.loadChannels(channel.community_id);
    });
  }
  archive(channel) {
    if (!confirm(`Archive #${channel.name}? Messages remain visible.`))
      return;
    this.api.archiveChannel(channel.id).subscribe(() => this.state.loadChannels(channel.community_id));
  }
  static {
    this.\u0275fac = function CommunityAdminComponent_Factory(t) {
      return new (t || _CommunityAdminComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommunityAdminComponent, selectors: [["app-community-admin"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "admin-wrap"], [4, "ngFor", "ngForOf"], [1, "channels"], [1, "new-channel"], ["placeholder", "new-channel-name", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "text"], ["value", "announcement"], [3, "click"], [4, "ngIf"], ["class", "edit-row", 4, "ngIf"], [1, "topic-cell"], [1, "row-actions"], [1, "ghost", 3, "click"], ["class", "ghost danger", 3, "click", 4, "ngIf"], [1, "ghost", "danger", 3, "click"], [1, "edit-row"], ["placeholder", "channel-name", 3, "ngModelChange", "ngModel"], ["placeholder", "Channel topic", 3, "ngModelChange", "ngModel"]], template: function CommunityAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2");
        \u0275\u0275text(2, "Community Administration");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, CommunityAdminComponent_section_3_Template, 28, 5, "section", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.communities());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.admin-wrap[_ngcontent-%COMP%] {\n  padding: 2rem;\n  color: #eaeaf2;\n}\nh2[_ngcontent-%COMP%] {\n  font-family:\n    "Anton",\n    "Bebas Neue",\n    sans-serif;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #eaeaf2;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  padding: 1rem;\n  background: #110f1e;\n  border: 1px solid rgba(124, 58, 237, 0.15);\n  border-radius: 8px;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.07);\n  text-align: start;\n}\n.topic-cell[_ngcontent-%COMP%] {\n  color: #7a7a92;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.edit-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.new-channel[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: flex;\n  gap: 0.5rem;\n}\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  background: #07070d;\n  color: #eaeaf2;\n  border: 1px solid rgba(255, 255, 255, 0.07);\n  border-radius: 4px;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background: #7c3aed;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: background 0.14s;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: #6d28d9;\n}\nbutton.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #7a7a92;\n  padding: 0.5rem;\n}\nbutton.ghost[_ngcontent-%COMP%]:hover {\n  color: #a78bfa;\n}\nbutton.ghost.danger[_ngcontent-%COMP%]:hover {\n  color: #ff6b6b;\n}\n/*# sourceMappingURL=community-admin.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommunityAdminComponent, { className: "CommunityAdminComponent", filePath: "src\\app\\features\\community\\pages\\community-admin\\community-admin.component.ts", lineNumber: 83 });
})();
export {
  CommunityAdminComponent
};
//# sourceMappingURL=chunk-QWNXLU2K.js.map
