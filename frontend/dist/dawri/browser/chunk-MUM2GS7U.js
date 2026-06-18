import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-LNNIKBGT.js";
import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  DestroyRef,
  EventEmitter,
  HttpClient,
  SlicePipe,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵqueryRefresh,
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
  ɵɵviewQuery
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/admin/marketplace/inventory.service.ts
var InventoryService = class _InventoryService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = "http://192.168.100.67:8001/api/v1/admin/marketplace";
  }
  /** GET — overview (product meta + stock + recent batches). */
  overview(productId) {
    return this.http.get(`${this.base}/products/${productId}/inventory`);
  }
  /** GET — paginated masked code list. */
  codes(productId, opts = {}) {
    const params = {};
    if (opts.page)
      params["page"] = String(opts.page);
    if (opts.status)
      params["status"] = opts.status;
    return this.http.get(`${this.base}/products/${productId}/inventory/codes`, { params });
  }
  /** POST — bulk upload. */
  upload(productId, payload) {
    return this.http.post(`${this.base}/products/${productId}/inventory/upload`, payload);
  }
  /** POST — switch fulfillment mode. */
  setMode(productId, mode) {
    return this.http.post(`${this.base}/products/${productId}/fulfillment-mode`, { fulfillment_mode: mode });
  }
  /**
   * POST — toggle auto_hide_when_empty (Sprint 12A+).
   *
   * When true: product hides when stock hits 0, shows again on refill.
   * When false: product stays visible at 0 stock — storefront renders
   * "Sold out" based on stock breakdown instead.
   */
  setAutoHide(productId, autoHide) {
    return this.http.post(`${this.base}/products/${productId}/auto-hide`, { auto_hide_when_empty: autoHide });
  }
  /** DELETE — remove a batch (fails if any code delivered). */
  deleteBatch(batchId) {
    return this.http.delete(`${this.base}/batches/${batchId}`);
  }
  static {
    this.\u0275fac = function InventoryService_Factory(t) {
      return new (t || _InventoryService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryService, factory: _InventoryService.\u0275fac, providedIn: "root" });
  }
};

// src/app/pages/admin/marketplace/bulk-upload-modal.component.ts
function BulkUploadModalComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 9);
    \u0275\u0275text(1, " Codes \u2014 one per line. Tab-separated for serial + expiry: ");
    \u0275\u0275elementStart(2, "code");
    \u0275\u0275text(3, "CODE");
    \u0275\u0275elementStart(4, "kbd");
    \u0275\u0275text(5, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, "SERIAL");
    \u0275\u0275elementStart(7, "kbd");
    \u0275\u0275text(8, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, "YYYY-MM-DD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "textarea", 15);
    \u0275\u0275twoWayListener("ngModelChange", function BulkUploadModalComponent_Conditional_25_Template_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.pastedCodes, $event) || (ctx_r1.pastedCodes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pastedCodes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.countPastedRows(), " rows detected");
  }
}
function BulkUploadModalComponent_Conditional_26_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.csvRows().length, " rows parsed from file");
  }
}
function BulkUploadModalComponent_Conditional_26_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.csvError());
  }
}
function BulkUploadModalComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 9);
    \u0275\u0275text(1, " CSV file \u2014 columns: ");
    \u0275\u0275elementStart(2, "code");
    \u0275\u0275text(3, "code[,serial,expires_at]");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 17);
    \u0275\u0275listener("change", function BulkUploadModalComponent_Conditional_26_Template_input_change_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, BulkUploadModalComponent_Conditional_26_Conditional_5_Template, 2, 1, "p", 16)(6, BulkUploadModalComponent_Conditional_26_Conditional_6_Template, 2, 1, "p", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ctx_r1.csvRows().length > 0 ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, ctx_r1.csvError() ? 6 : -1);
  }
}
function BulkUploadModalComponent_Conditional_27_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r4);
  }
}
function BulkUploadModalComponent_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275repeaterCreate(1, BulkUploadModalComponent_Conditional_27_Conditional_4_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(r_r5.sample_errors);
  }
}
function BulkUploadModalComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275template(4, BulkUploadModalComponent_Conditional_27_Conditional_4_Template, 3, 0, "ul");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r5 = ctx;
    \u0275\u0275classProp("error", r_r5.inserted === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", r_r5.inserted, " inserted");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \xB7 ", r_r5.duplicates, " duplicates \xB7 ", r_r5.invalid, " invalid ");
    \u0275\u0275advance();
    \u0275\u0275conditional(4, r_r5.sample_errors && r_r5.sample_errors.length > 0 ? 4 : -1);
  }
}
function BulkUploadModalComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.apiError());
  }
}
var BulkUploadModalComponent = class _BulkUploadModalComponent {
  constructor() {
    this.productName = "";
    this.close = new EventEmitter();
    this.uploaded = new EventEmitter();
    this.inventory = inject(InventoryService);
    this.tab = signal("paste");
    this.busy = signal(false);
    this.result = signal(null);
    this.apiError = signal(null);
    this.csvRows = signal([]);
    this.csvError = signal(null);
    this.supplierName = "";
    this.supplierRef = "";
    this.unitCost = null;
    this.notes = "";
    this.pastedCodes = "";
  }
  countPastedRows() {
    return this.pastedCodes.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0).length;
  }
  canSubmit() {
    if (!this.supplierName.trim())
      return false;
    if (this.tab() === "paste")
      return this.countPastedRows() > 0;
    return this.csvRows().length > 0;
  }
  onOverlayClick(ev) {
    if (ev.target === ev.currentTarget)
      this.close.emit();
  }
  onFileSelected(ev) {
    const input = ev.target;
    const file = input.files?.[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        const rows = this.parseCsv(text);
        this.csvRows.set(rows);
        this.csvError.set(rows.length === 0 ? "No valid rows found in CSV." : null);
      } catch (e) {
        this.csvError.set(e?.message ?? "Failed to parse CSV");
        this.csvRows.set([]);
      }
    };
    reader.onerror = () => this.csvError.set("Failed to read file.");
    reader.readAsText(file);
  }
  /**
   * Minimal CSV parser — handles code, serial, expires_at columns.
   * Accepts comma or tab separators. Trims whitespace. Skips empty lines.
   * Quoted fields with embedded commas are supported.
   */
  parseCsv(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0)
      return [];
    const firstLower = lines[0].toLowerCase();
    const hasHeader = firstLower.includes("code");
    const dataLines = hasHeader ? lines.slice(1) : lines;
    const parseRow = (line) => {
      if (line.includes("	"))
        return line.split("	").map((s) => s.trim());
      return this.splitCsvLine(line).map((s) => s.trim());
    };
    return dataLines.map(parseRow).filter((cols) => cols[0] && cols[0].length > 0).map((cols) => ({
      code: cols[0],
      serial: cols[1] || void 0,
      expires_at: cols[2] || void 0
    }));
  }
  splitCsvLine(line) {
    const out = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
        continue;
      }
      if (c === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (c === "," && !inQuotes) {
        out.push(cur);
        cur = "";
        continue;
      }
      cur += c;
    }
    out.push(cur);
    return out;
  }
  submit() {
    if (!this.canSubmit() || this.busy())
      return;
    this.busy.set(true);
    this.apiError.set(null);
    this.result.set(null);
    const payload = {
      supplier_name: this.supplierName.trim(),
      supplier_ref: this.supplierRef.trim() || void 0,
      unit_cost_sar: this.unitCost ?? void 0,
      notes: this.notes.trim() || void 0,
      source: this.tab() === "csv" ? "csv_upload" : "manual"
    };
    if (this.tab() === "paste") {
      payload.codes_text = this.pastedCodes;
    } else {
      payload.codes = this.csvRows();
    }
    this.inventory.upload(this.productId, payload).subscribe({
      next: (resp) => {
        this.result.set(resp.data);
        this.busy.set(false);
        this.uploaded.emit(resp.data);
      },
      error: (err) => {
        this.apiError.set(err?.error?.message ?? "Upload failed \u2014 please check your payload.");
        this.busy.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function BulkUploadModalComponent_Factory(t) {
      return new (t || _BulkUploadModalComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BulkUploadModalComponent, selectors: [["app-bulk-upload-modal"]], inputs: { productId: "productId", productName: "productName" }, outputs: { close: "close", uploaded: "uploaded" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 34, vars: 15, consts: [[1, "overlay", 3, "click"], [1, "modal"], ["aria-label", "Close", 1, "close", 3, "click"], [1, "tabs"], [3, "click"], [1, "grid"], ["placeholder", "LikeCard, WUPEX, self\u2026", 3, "ngModelChange", "ngModel"], ["placeholder", "PO-2026-04-15", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", "min", "0", "placeholder", "47.50", 3, "ngModelChange", "ngModel"], [1, "full"], ["placeholder", "Optional batch notes", 3, "ngModelChange", "ngModel"], [1, "result", 3, "error"], [1, "error"], [1, "ghost", 3, "click"], [1, "primary", 3, "click", "disabled"], ["rows", "10", "placeholder", "ABCD-1234-EFGH-5678\nXYZ9-8765-WVUT-4321", 3, "ngModelChange", "ngModel"], [1, "hint"], ["type", "file", "accept", ".csv,.txt", 3, "change"], [1, "result"]], template: function BulkUploadModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function BulkUploadModalComponent_Template_div_click_0_listener($event) {
          return ctx.onOverlayClick($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "header")(3, "h2");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 2);
        \u0275\u0275listener("click", function BulkUploadModalComponent_Template_button_click_5_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(6, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 3)(8, "button", 4);
        \u0275\u0275listener("click", function BulkUploadModalComponent_Template_button_click_8_listener() {
          return ctx.tab.set("paste");
        });
        \u0275\u0275text(9, "Paste");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "button", 4);
        \u0275\u0275listener("click", function BulkUploadModalComponent_Template_button_click_10_listener() {
          return ctx.tab.set("csv");
        });
        \u0275\u0275text(11, "CSV upload");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 5)(13, "label");
        \u0275\u0275text(14, " Supplier name * ");
        \u0275\u0275elementStart(15, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function BulkUploadModalComponent_Template_input_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.supplierName, $event) || (ctx.supplierName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "label");
        \u0275\u0275text(17, " Supplier ref / invoice # ");
        \u0275\u0275elementStart(18, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function BulkUploadModalComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.supplierRef, $event) || (ctx.supplierRef = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "label");
        \u0275\u0275text(20, " Unit cost (SAR) ");
        \u0275\u0275elementStart(21, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function BulkUploadModalComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.unitCost, $event) || (ctx.unitCost = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "label", 9);
        \u0275\u0275text(23, " Notes ");
        \u0275\u0275elementStart(24, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function BulkUploadModalComponent_Template_input_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.notes, $event) || (ctx.notes = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(25, BulkUploadModalComponent_Conditional_25_Template, 13, 2)(26, BulkUploadModalComponent_Conditional_26_Template, 7, 2)(27, BulkUploadModalComponent_Conditional_27_Template, 5, 6, "div", 11)(28, BulkUploadModalComponent_Conditional_28_Template, 2, 1, "p", 12);
        \u0275\u0275elementStart(29, "footer")(30, "button", 13);
        \u0275\u0275listener("click", function BulkUploadModalComponent_Template_button_click_30_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(31, "Close");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "button", 14);
        \u0275\u0275listener("click", function BulkUploadModalComponent_Template_button_click_32_listener() {
          return ctx.submit();
        });
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_9_0;
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("Upload codes \u2014 ", ctx.productName, "");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.tab() === "paste");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "csv");
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.supplierName);
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("ngModel", ctx.supplierRef);
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("ngModel", ctx.unitCost);
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("ngModel", ctx.notes);
        \u0275\u0275advance();
        \u0275\u0275conditional(25, ctx.tab() === "paste" ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.tab() === "csv" ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(27, (tmp_9_0 = ctx.result()) ? 27 : -1, tmp_9_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(28, ctx.apiError() ? 28 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.busy() || !ctx.canSubmit());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.busy() ? "Uploading\u2026" : "Upload codes", " ");
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ['\n\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 24px;\n}\n.modal[_ngcontent-%COMP%] {\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 720px;\n  max-height: 92vh;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #2a2a3a;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #fff;\n  font-family: Rajdhani, sans-serif;\n  letter-spacing: .5px;\n}\n.close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  color: #888;\n  font-size: 20px;\n  cursor: pointer;\n}\n.close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 16px 24px 0;\n}\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 13px;\n}\n.tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #d4af37;\n  border-color: #d4af37;\n  color: #fff;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  padding: 16px 24px;\n}\n.grid[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\nlabel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  font-size: 12px;\n  color: #aaa;\n}\ninput[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 8px 10px;\n  border-radius: 6px;\n  font-size: 13px;\n  font-family: inherit;\n}\ntextarea[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 12px;\n}\ninput[_ngcontent-%COMP%]:focus, textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #888;\n  margin: 0 24px 12px;\n}\n.error[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n  margin: 8px 24px;\n}\n.result[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .1);\n  border: 1px solid rgba(34, 197, 94, .3);\n  color: #86efac;\n  padding: 12px 16px;\n  margin: 8px 24px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.result.error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .1);\n  border-color: rgba(239, 68, 68, .3);\n  color: #fca5a5;\n}\n.result[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  padding-left: 20px;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 16px 24px;\n  border-top: 1px solid #2a2a3a;\n  margin-top: auto;\n}\nbutton.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\nbutton.ghost[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: #888;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  border: 0;\n  color: #fff;\n  padding: 8px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}\nbutton.primary[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\ncode[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  padding: 1px 6px;\n  border-radius: 3px;\n  font-size: 11px;\n}\n/*# sourceMappingURL=bulk-upload-modal.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BulkUploadModalComponent, { className: "BulkUploadModalComponent", filePath: "src\\app\\pages\\admin\\marketplace\\bulk-upload-modal.component.ts", lineNumber: 145 });
})();

// src/app/pages/admin/marketplace/product-inventory-drawer.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ProductInventoryDrawerComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx.product.name);
  }
}
function ProductInventoryDrawerComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, "Loading inventory\u2026");
    \u0275\u0275elementEnd();
  }
}
function ProductInventoryDrawerComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, " This product fetches codes from the distributor at order time. Switch to Inventory mode to upload pre-purchased codes. ");
    \u0275\u0275elementEnd();
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, " This product serves codes from the pool below. ");
    \u0275\u0275elementEnd();
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Product hides from storefront when stock reaches 0. Re-enables automatically on refill. ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, ' Product stays visible at 0 stock. Storefront shows "Sold out" \u2014 you manage active state manually. ');
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 14)(1, "div", 30)(2, "div", 31)(3, "strong");
    \u0275\u0275text(4, "Auto-hide when empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 13);
    \u0275\u0275template(6, ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Conditional_6_Template, 1, 0)(7, ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Conditional_7_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 32);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ov_r4 = \u0275\u0275nextContext();
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleAutoHide(ov_r4.product.auto_hide_when_empty));
    });
    \u0275\u0275element(9, "span", 33);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ov_r4 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, ov_r4.product.auto_hide_when_empty ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("on", ov_r4.product.auto_hide_when_empty);
    \u0275\u0275property("disabled", ctx_r0.autoHideBusy());
    \u0275\u0275attribute("aria-label", ov_r4.product.auto_hide_when_empty ? "Disable auto-hide" : "Enable auto-hide");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ov_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Low stock \u2014 only ", ov_r4.stock.available, " code(s) left (threshold: ", ov_r4.product.low_stock_threshold, ") ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_40_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " (auto-hidden, stock = 0) ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_40_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " (manually hidden \u2014 toggle is_active in product edit to restore) ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " Product is currently ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "hidden");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " from storefront ");
    \u0275\u0275template(5, ProductInventoryDrawerComponent_Conditional_11_Conditional_40_Conditional_5_Template, 1, 0)(6, ProductInventoryDrawerComponent_Conditional_11_Conditional_40_Conditional_6_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ov_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ov_r4.product.auto_hide_when_empty ? 5 : 6);
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1, ' Stock is 0 but product stays visible (auto-hide disabled). Storefront will render "Sold out". ');
    \u0275\u0275elementEnd();
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, 'No batches yet. Click "Upload codes" to add the first one.');
    \u0275\u0275elementEnd();
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const b_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, b_r6.unit_cost_sar, "1.2-2"), " ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const b_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, b_r6.total_cost_sar, "1.2-2"), " ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 34);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 34);
    \u0275\u0275template(12, ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_12_Template, 2, 4)(13, ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_13_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 34);
    \u0275\u0275template(15, ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_15_Template, 2, 4)(16, ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Conditional_16_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td")(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td")(21, "button", 36);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Template_button_click_21_listener() {
      const b_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteBatch(b_r6));
    });
    \u0275\u0275text(22, "\u2715");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const b_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 11, b_r6.created_at, "MMM d, y"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(b_r6.supplier_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r6.supplier_ref || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 14, b_r6.code_count));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(12, b_r6.unit_cost_sar !== null ? 12 : 13);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(15, b_r6.total_cost_sar !== null ? 15 : 16);
    \u0275\u0275advance(3);
    \u0275\u0275classMapInterpolate1("src src-", b_r6.source, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r6.source);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.deletingBatchId() === b_r6.id);
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table")(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Supplier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Ref");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 34);
    \u0275\u0275text(10, "Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 34);
    \u0275\u0275text(12, "Cost/unit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 34);
    \u0275\u0275text(14, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Source");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, ProductInventoryDrawerComponent_Conditional_11_Conditional_49_For_20_Template, 23, 16, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ov_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ov_r4.batches);
  }
}
function ProductInventoryDrawerComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 10)(1, "label");
    \u0275\u0275text(2, "Fulfillment mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "button", 12);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_11_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.switchMode("api"));
    });
    \u0275\u0275text(5, "API (distributor)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 12);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_11_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.switchMode("inventory"));
    });
    \u0275\u0275text(7, "Inventory (pre-loaded)");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, ProductInventoryDrawerComponent_Conditional_11_Conditional_8_Template, 2, 0, "p", 13)(9, ProductInventoryDrawerComponent_Conditional_11_Conditional_9_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, ProductInventoryDrawerComponent_Conditional_11_Conditional_10_Template, 10, 5, "section", 14);
    \u0275\u0275elementStart(11, "section", 15)(12, "h3");
    \u0275\u0275text(13, "Stock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 16)(15, "div", 17)(16, "div", 18);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 19);
    \u0275\u0275text(20, "Available");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 20)(22, "div", 18);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 19);
    \u0275\u0275text(26, "Reserved");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 21)(28, "div", 18);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 19);
    \u0275\u0275text(32, "Delivered");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 22)(34, "div", 18);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 19);
    \u0275\u0275text(38, "Expired");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(39, ProductInventoryDrawerComponent_Conditional_11_Conditional_39_Template, 2, 2, "div", 23)(40, ProductInventoryDrawerComponent_Conditional_11_Conditional_40_Template, 7, 1, "div", 24)(41, ProductInventoryDrawerComponent_Conditional_11_Conditional_41_Template, 2, 0, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "section", 26)(43, "div", 27)(44, "h3");
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 28);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_11_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openUploadModal());
    });
    \u0275\u0275text(47, "+ Upload codes");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(48, ProductInventoryDrawerComponent_Conditional_11_Conditional_48_Template, 2, 0, "p", 29)(49, ProductInventoryDrawerComponent_Conditional_11_Conditional_49_Template, 21, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ov_r4 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ov_r4.product.fulfillment_mode === "api");
    \u0275\u0275property("disabled", ctx_r0.modeBusy());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ov_r4.product.fulfillment_mode === "inventory");
    \u0275\u0275property("disabled", ctx_r0.modeBusy());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, ov_r4.product.fulfillment_mode === "api" ? 8 : 9);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, ov_r4.product.fulfillment_mode === "inventory" ? 10 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 19, ov_r4.stock.available));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 21, ov_r4.stock.reserved));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 23, ov_r4.stock.delivered));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(36, 25, ov_r4.stock.expired));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(39, ctx_r0.isLowStock(ov_r4.stock, ov_r4.product.low_stock_threshold) ? 39 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(40, ov_r4.product.fulfillment_mode === "inventory" && !ov_r4.product.is_active ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(41, ov_r4.product.fulfillment_mode === "inventory" && !ov_r4.product.auto_hide_when_empty && ov_r4.stock.available === 0 && ov_r4.product.is_active ? 41 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Batches (", ov_r4.batches.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ov_r4.product.fulfillment_mode !== "inventory")("title", ov_r4.product.fulfillment_mode !== "inventory" ? "Switch to inventory mode first" : "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(48, ov_r4.batches.length === 0 ? 48 : 49);
  }
}
function ProductInventoryDrawerComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-bulk-upload-modal", 37);
    \u0275\u0275listener("close", function ProductInventoryDrawerComponent_Conditional_15_Template_app_bulk_upload_modal_close_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showUploadModal.set(false));
    })("uploaded", function ProductInventoryDrawerComponent_Conditional_15_Template_app_bulk_upload_modal_uploaded_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onUploaded($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("productId", ctx_r0.productId)("productName", ctx.product.name);
  }
}
function ProductInventoryDrawerComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 38)(4, "button", 6);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_16_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmNo());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 39);
    \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Conditional_16_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
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
function ProductInventoryDrawerComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.toastMsg());
  }
}
var ProductInventoryDrawerComponent = class _ProductInventoryDrawerComponent {
  constructor() {
    this.close = new EventEmitter();
    this.changed = new EventEmitter();
    this.inventory = inject(InventoryService);
    this.overview = signal(null);
    this.loading = signal(true);
    this.error = signal(null);
    this.modeBusy = signal(false);
    this.autoHideBusy = signal(false);
    this.deletingBatchId = signal(null);
    this.showUploadModal = signal(false);
    this.toastMsg = signal(null);
    this.confirmMsg = signal(null);
    this.confirmCallback = null;
  }
  notify(msg) {
    this.toastMsg.set(msg);
    setTimeout(() => this.toastMsg.set(null), 3500);
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
    this.refresh();
  }
  refresh() {
    this.loading.set(true);
    this.error.set(null);
    this.inventory.overview(this.productId).subscribe({
      next: (r) => {
        this.overview.set(r.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? "Failed to load inventory.");
        this.loading.set(false);
      }
    });
  }
  onOverlayClick(ev) {
    if (ev.target === ev.currentTarget)
      this.close.emit();
  }
  switchMode(mode) {
    const cur = this.overview();
    if (!cur || cur.product.fulfillment_mode === mode || this.modeBusy())
      return;
    this.ask(`Switch "${cur.product.name}" to ${mode.toUpperCase()} mode?`, () => {
      this.modeBusy.set(true);
      this.inventory.setMode(this.productId, mode).subscribe({
        next: () => {
          this.modeBusy.set(false);
          this.refresh();
          this.changed.emit();
        },
        error: (err) => {
          this.modeBusy.set(false);
          this.notify(err?.error?.message ?? "Failed to change mode.");
        }
      });
    });
  }
  /**
   * Toggle the auto-hide flag. Current value is passed in so the
   * button callsite doesn't have to re-query the signal.
   */
  toggleAutoHide(currentValue) {
    if (this.autoHideBusy())
      return;
    const next = !currentValue;
    this.autoHideBusy.set(true);
    this.inventory.setAutoHide(this.productId, next).subscribe({
      next: () => {
        this.autoHideBusy.set(false);
        this.refresh();
        this.changed.emit();
      },
      error: (err) => {
        this.autoHideBusy.set(false);
        this.notify(err?.error?.message ?? "Failed to change auto-hide setting.");
      }
    });
  }
  openUploadModal() {
    this.showUploadModal.set(true);
  }
  onUploaded(_result) {
    this.refresh();
    this.changed.emit();
  }
  deleteBatch(batch) {
    this.ask(`Delete batch from ${batch.supplier_name} (${batch.code_count} codes)? This is only allowed if NO code from this batch has been delivered.`, () => {
      this.deletingBatchId.set(batch.id);
      this.inventory.deleteBatch(batch.id).subscribe({
        next: () => {
          this.deletingBatchId.set(null);
          this.refresh();
          this.changed.emit();
        },
        error: (err) => {
          this.deletingBatchId.set(null);
          this.notify(err?.error?.message ?? "Failed to delete batch.");
        }
      });
    });
  }
  isLowStock(stock, threshold) {
    return stock.available > 0 && stock.available <= threshold;
  }
  static {
    this.\u0275fac = function ProductInventoryDrawerComponent_Factory(t) {
      return new (t || _ProductInventoryDrawerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductInventoryDrawerComponent, selectors: [["app-product-inventory-drawer"]], inputs: { productId: "productId" }, outputs: { close: "close", changed: "changed" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 7, consts: [[1, "overlay", 3, "click"], [1, "drawer"], [1, "subtitle"], ["aria-label", "Close", 1, "close", 3, "click"], [1, "loading"], [1, "error"], [1, "ghost", 3, "click"], [3, "productId", "productName"], [1, "inv-confirm-bar"], [1, "inv-toast"], [1, "mode"], [1, "toggle"], [3, "click", "disabled"], [1, "mode-hint"], [1, "auto-hide"], [1, "stock"], [1, "grid"], [1, "stat", "available"], [1, "num"], [1, "lbl"], [1, "stat", "reserved"], [1, "stat", "delivered"], [1, "stat", "expired"], [1, "low-stock-warn"], [1, "hidden-warn"], [1, "sold-out-warn"], [1, "batches"], [1, "batches-header"], [1, "primary", 3, "click", "disabled", "title"], [1, "empty"], [1, "auto-hide-row"], [1, "auto-hide-label"], [1, "switch", 3, "click", "disabled"], [1, "knob"], [1, "r"], [1, "muted"], ["title", "Delete this batch (only if no codes delivered)", 1, "danger-ghost", 3, "click", "disabled"], [3, "close", "uploaded", "productId", "productName"], [1, "inv-confirm-actions"], [1, "inv-danger", 3, "click"]], template: function ProductInventoryDrawerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Template_div_click_0_listener($event) {
          return ctx.onOverlayClick($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "header")(3, "div")(4, "h2");
        \u0275\u0275text(5, "Inventory");
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, ProductInventoryDrawerComponent_Conditional_6_Template, 2, 1, "p", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 3);
        \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Template_button_click_7_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(8, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, ProductInventoryDrawerComponent_Conditional_9_Template, 2, 0, "div", 4)(10, ProductInventoryDrawerComponent_Conditional_10_Template, 2, 1, "div", 5)(11, ProductInventoryDrawerComponent_Conditional_11_Template, 50, 27);
        \u0275\u0275elementStart(12, "footer")(13, "button", 6);
        \u0275\u0275listener("click", function ProductInventoryDrawerComponent_Template_button_click_13_listener() {
          return ctx.close.emit();
        });
        \u0275\u0275text(14, "Close");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(15, ProductInventoryDrawerComponent_Conditional_15_Template, 1, 2, "app-bulk-upload-modal", 7)(16, ProductInventoryDrawerComponent_Conditional_16_Template, 8, 1, "div", 8)(17, ProductInventoryDrawerComponent_Conditional_17_Template, 2, 1, "div", 9);
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_3_0;
        let tmp_4_0;
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, (tmp_0_0 = ctx.overview()) ? 6 : -1, tmp_0_0);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(9, ctx.loading() ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.error() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, (tmp_3_0 = ctx.overview()) ? 11 : -1, tmp_3_0);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(15, (tmp_4_0 = ctx.showUploadModal() && ctx.overview()) ? 15 : -1, tmp_4_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(16, ctx.confirmMsg() ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(17, ctx.toastMsg() ? 17 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, DatePipe, FormsModule, BulkUploadModalComponent], styles: ['\n\n.overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, .7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 900;\n  padding: 24px;\n}\n.drawer[_ngcontent-%COMP%] {\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 960px;\n  max-height: 92vh;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 20px 24px;\n  border-bottom: 1px solid #2a2a3a;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  color: #fff;\n  font-family: Rajdhani, sans-serif;\n  letter-spacing: .5px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #888;\n  font-size: 13px;\n}\n.close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  color: #888;\n  font-size: 20px;\n  cursor: pointer;\n}\n.close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #888;\n}\n.error[_ngcontent-%COMP%] {\n  color: #fca5a5;\n  background: rgba(239, 68, 68, .1);\n  border: 1px solid rgba(239, 68, 68, .3);\n  padding: 12px 16px;\n  margin: 16px 24px;\n  border-radius: 6px;\n  font-size: 13px;\n}\nsection[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-bottom: 1px solid #1f1f2e;\n}\nsection[_ngcontent-%COMP%]:last-of-type {\n  border-bottom: 0;\n}\nh3[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 13px;\n  color: #d4af37;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-family: Rajdhani, sans-serif;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #aaa;\n  margin-bottom: 8px;\n}\n.toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n}\n.toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 10px;\n  cursor: pointer;\n  font-size: 13px;\n}\n.toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:first-child {\n  border-radius: 6px 0 0 6px;\n}\n.toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child {\n  border-radius: 0 6px 6px 0;\n  border-left: 0;\n}\n.toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #d4af37;\n  border-color: #d4af37;\n  color: #fff;\n}\n.toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.mode-hint[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 12px;\n  margin: 8px 0 0;\n}\n.auto-hide-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n}\n.auto-hide-label[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.auto-hide-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 14px;\n  font-weight: 600;\n  display: block;\n}\n.auto-hide-label[_ngcontent-%COMP%]   .mode-hint[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n.switch[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 48px;\n  height: 26px;\n  border-radius: 13px;\n  background: #2a2a3a;\n  border: 0;\n  cursor: pointer;\n  position: relative;\n  padding: 0;\n  transition: background .2s;\n}\n.switch[_ngcontent-%COMP%]   .knob[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 20px;\n  height: 20px;\n  border-radius: 10px;\n  background: #fff;\n  transition: left .2s;\n}\n.switch.on[_ngcontent-%COMP%] {\n  background: #d4af37;\n}\n.switch.on[_ngcontent-%COMP%]   .knob[_ngcontent-%COMP%] {\n  left: 25px;\n}\n.switch[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n.stat[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  border-radius: 6px;\n  padding: 14px;\n  text-align: center;\n}\n.stat[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  font-family: "Space Mono", monospace;\n}\n.stat[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #888;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  margin-top: 4px;\n}\n.stat.available[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  color: #86efac;\n}\n.stat.reserved[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.stat.delivered[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  color: #60a5fa;\n}\n.stat.expired[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  color: #666;\n}\n.low-stock-warn[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  background: rgba(251, 191, 36, .1);\n  border: 1px solid rgba(251, 191, 36, .3);\n  color: #fbbf24;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.hidden-warn[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  background: rgba(239, 68, 68, .08);\n  border: 1px solid rgba(239, 68, 68, .25);\n  color: #fca5a5;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.sold-out-warn[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  background: rgba(96, 165, 250, .08);\n  border: 1px solid rgba(96, 165, 250, .25);\n  color: #60a5fa;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.batches-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.batches-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 10px 8px;\n  text-align: left;\n  border-bottom: 1px solid #1f1f2e;\n}\nth[_ngcontent-%COMP%] {\n  color: #888;\n  font-weight: 600;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: .5px;\n}\n.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\ntd.muted[_ngcontent-%COMP%] {\n  color: #666;\n}\n.src[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: #2a2a3a;\n  color: #aaa;\n}\n.src-webhook[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, .2);\n  color: #d4af37;\n}\n.src-csv_upload[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .2);\n  color: #86efac;\n}\n.src-manual[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, .2);\n  color: #fbbf24;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  border: 0;\n  color: #fff;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 13px;\n}\nbutton.primary[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\nbutton.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n}\nbutton.ghost[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: #888;\n}\nbutton.danger-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  color: #666;\n  font-size: 14px;\n  cursor: pointer;\n  padding: 4px 8px;\n}\nbutton.danger-ghost[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n}\nbutton.danger-ghost[_ngcontent-%COMP%]:disabled {\n  opacity: .3;\n  cursor: not-allowed;\n}\nfooter[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 16px 24px;\n  border-top: 1px solid #2a2a3a;\n  margin-top: auto;\n}\n.inv-toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  z-index: 950;\n  padding: 12px 20px;\n  border-radius: 8px;\n  font-size: 14px;\n  background: rgba(239, 68, 68, .18);\n  border: 1px solid rgba(239, 68, 68, .4);\n  color: #fca5a5;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, .5);\n}\n.inv-confirm-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 950;\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 12px 18px;\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, .5);\n  font-size: 14px;\n  color: #e5e5ea;\n}\n.inv-confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.inv-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border: none;\n  color: #fff;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}\n/*# sourceMappingURL=product-inventory-drawer.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductInventoryDrawerComponent, { className: "ProductInventoryDrawerComponent", filePath: "src\\app\\pages\\admin\\marketplace\\product-inventory-drawer.component.ts", lineNumber: 323 });
})();

// src/app/pages/admin/marketplace/marketplace-dashboard.component.ts
var _c0 = ["ordersCanvas"];
var _c1 = ["revenueCanvas"];
var _forTrack02 = ($index, $item) => $item.distributor;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.title;
function MarketplaceDashboardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "span", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 10);
    \u0275\u0275listener("click", function MarketplaceDashboardComponent_Conditional_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshManually());
    });
    \u0275\u0275text(4, "Refresh");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Updated ", ctx_r1.timeAgo(ctx.generated_at), "");
  }
}
function MarketplaceDashboardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.criticalAlertsCount(), " critical alert(s) require attention");
  }
}
function MarketplaceDashboardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Loading marketplace dashboard\u2026");
    \u0275\u0275elementEnd();
  }
}
function MarketplaceDashboardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 11);
    \u0275\u0275listener("click", function MarketplaceDashboardComponent_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadDashboard());
    });
    \u0275\u0275text(3, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx, " ");
  }
}
function MarketplaceDashboardComponent_Conditional_9_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "No completed orders in the last 30 days yet.");
    \u0275\u0275elementEnd();
  }
}
function MarketplaceDashboardComponent_Conditional_9_Conditional_69_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 28);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 29);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r4.brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 4, row_r4.units_sold));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 6, row_r4.revenue, "1.2-2"), " SAR");
  }
}
function MarketplaceDashboardComponent_Conditional_9_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 24)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Brand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 25);
    \u0275\u0275text(8, "Units");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 25);
    \u0275\u0275text(10, "Revenue");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, MarketplaceDashboardComponent_Conditional_9_Conditional_69_For_13_Template, 11, 9, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275repeater(p_r5.top_products);
  }
}
function MarketplaceDashboardComponent_Conditional_9_For_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 28);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 28);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r6.distributor);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.circuitPillClass(d_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r6.circuit_status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r6.product_count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r6.available_codes);
  }
}
function MarketplaceDashboardComponent_Conditional_9_Conditional_87_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "div", 32)(2, "div", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    \u0275\u0275classMapInterpolate1("alert-item severity-", a_r7.severity, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r7.detail);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r7.severity);
  }
}
function MarketplaceDashboardComponent_Conditional_9_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 26)(1, "h3");
    \u0275\u0275text(2, "Alerts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 30);
    \u0275\u0275repeaterCreate(4, MarketplaceDashboardComponent_Conditional_9_Conditional_87_For_5_Template, 8, 6, "li", 31, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(p_r5.alerts);
  }
}
function MarketplaceDashboardComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12)(1, "div", 13)(2, "div", 14);
    \u0275\u0275text(3, "Orders today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 16);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 13)(11, "div", 14);
    \u0275\u0275text(12, "Orders this week");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 15);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 16);
    \u0275\u0275text(17, "7 day window");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 13)(19, "div", 14);
    \u0275\u0275text(20, "Orders this month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 15);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 16);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 13)(28, "div", 14);
    \u0275\u0275text(29, "Completed (30d)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 15);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 16);
    \u0275\u0275text(34, "successful fulfillment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 17)(36, "div", 14);
    \u0275\u0275text(37, "Failed (30d)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 15);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 16);
    \u0275\u0275text(42, "fulfillment failures");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 13)(44, "div", 14);
    \u0275\u0275text(45, "Refunded (30d)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 15);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 16);
    \u0275\u0275text(50, "orders refunded");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "section", 18)(52, "div", 19)(53, "h3");
    \u0275\u0275text(54, "Orders (last 7 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 20);
    \u0275\u0275element(56, "canvas", null, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 19)(59, "h3");
    \u0275\u0275text(60, "Revenue (last 7 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 20);
    \u0275\u0275element(62, "canvas", null, 1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "section", 21)(65, "div", 22)(66, "h3");
    \u0275\u0275text(67, "Top-selling products (last 30 days)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(68, MarketplaceDashboardComponent_Conditional_9_Conditional_68_Template, 2, 0, "p", 23)(69, MarketplaceDashboardComponent_Conditional_9_Conditional_69_Template, 14, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 22)(71, "h3");
    \u0275\u0275text(72, "Distributor health");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "table", 24)(74, "thead")(75, "tr")(76, "th");
    \u0275\u0275text(77, "Distributor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "th");
    \u0275\u0275text(79, "Circuit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "th", 25);
    \u0275\u0275text(81, "Products");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "th", 25);
    \u0275\u0275text(83, "Codes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(84, "tbody");
    \u0275\u0275repeaterCreate(85, MarketplaceDashboardComponent_Conditional_9_For_86_Template, 10, 6, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(87, MarketplaceDashboardComponent_Conditional_9_Conditional_87_Template, 6, 0, "section", 26);
  }
  if (rf & 2) {
    const p_r5 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 10, p_r5.kpis.orders_today));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(9, 12, p_r5.kpis.revenue_today, "1.2-2"), " SAR revenue");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 15, p_r5.kpis.orders_week));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 17, p_r5.kpis.orders_month));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(26, 19, p_r5.kpis.revenue_month, "1.2-2"), " SAR revenue");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 22, p_r5.kpis.completed_30d));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(40, 24, p_r5.kpis.failed_30d));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 26, p_r5.kpis.refunded_30d));
    \u0275\u0275advance(21);
    \u0275\u0275conditional(68, p_r5.top_products.length === 0 ? 68 : 69);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(p_r5.distributor_summary);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(87, p_r5.alerts.length > 0 ? 87 : -1);
  }
}
var MarketplaceDashboardComponent = class _MarketplaceDashboardComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.destroyRef = inject(DestroyRef);
    this.base = "http://192.168.100.67:8001/api/v1/admin/marketplace/dashboard";
    this.isActive = true;
    this.payload = signal(null);
    this.loading = signal(false);
    this.error = signal(null);
    this.CHART_JS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
    this.refreshTimer = null;
    this.criticalAlertsCount = computed(() => this.payload()?.alerts.filter((a) => a.severity === "critical").length ?? 0);
  }
  ngOnInit() {
    if (this.isActive)
      this.loadDashboard();
    this.refreshTimer = window.setInterval(() => {
      if (this.isActive)
        this.loadDashboard();
    }, 6e4);
    this.destroyRef.onDestroy(() => {
      if (this.refreshTimer !== null)
        window.clearInterval(this.refreshTimer);
    });
  }
  ngAfterViewInit() {
    this.loadChartJsThenRender();
  }
  ngOnChanges(changes) {
    if (changes["isActive"]?.currentValue === true && !this.payload()) {
      this.loadDashboard();
    }
  }
  loadDashboard() {
    if (!this.payload())
      this.loading.set(true);
    this.error.set(null);
    this.http.get(this.base).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (r) => {
        this.payload.set(r.data);
        this.loading.set(false);
        if (typeof Chart !== "undefined" && this.ordersCanvas) {
          this.renderCharts();
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? "Failed to load marketplace dashboard.");
      }
    });
  }
  refreshManually() {
    this.loadDashboard();
  }
  // ── Chart.js bootstrap ─────────────────────────────────────────
  loadChartJsThenRender() {
    if (typeof Chart !== "undefined") {
      this.tryRender();
      return;
    }
    if (document.querySelector(`script[src="${this.CHART_JS_URL}"]`)) {
      const check = () => typeof Chart !== "undefined" ? this.tryRender() : setTimeout(check, 100);
      check();
      return;
    }
    const script = document.createElement("script");
    script.src = this.CHART_JS_URL;
    script.async = true;
    script.onload = () => this.tryRender();
    script.onerror = () => this.error.set("Failed to load charts library.");
    document.head.appendChild(script);
  }
  tryRender() {
    if (this.payload() && this.ordersCanvas)
      this.renderCharts();
  }
  renderCharts() {
    const p = this.payload();
    if (!p)
      return;
    const configs = [
      [this.ordersCanvas.nativeElement, p.charts.orders, "Orders", "#d4af37"],
      [this.revenueCanvas.nativeElement, p.charts.revenue, "Revenue (SAR)", "#fbbf24"]
    ];
    for (const [canvas, data, label, color] of configs) {
      const existing = Chart.getChart(canvas);
      if (existing)
        existing.destroy();
      new Chart(canvas, {
        type: "line",
        data: {
          labels: p.charts.labels,
          datasets: [{
            label,
            data,
            borderColor: color,
            backgroundColor: color + "20",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: color,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#0a0a14",
              titleColor: "#fff",
              bodyColor: "#ccc",
              borderColor: color,
              borderWidth: 1
            }
          },
          scales: {
            x: { grid: { color: "#1a1a2a" }, ticks: { color: "#666", font: { size: 10 } } },
            y: { grid: { color: "#1a1a2a" }, ticks: { color: "#666", font: { size: 10 } }, beginAtZero: true }
          }
        }
      });
    }
  }
  // ── Helpers ────────────────────────────────────────────────────
  timeAgo(iso) {
    if (!iso)
      return "";
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
    if (seconds < 60)
      return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
      return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
      return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }
  circuitPillClass(row) {
    return `pill pill-${row.circuit_status}`;
  }
  static {
    this.\u0275fac = function MarketplaceDashboardComponent_Factory(t) {
      return new (t || _MarketplaceDashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketplaceDashboardComponent, selectors: [["app-marketplace-dashboard"]], viewQuery: function MarketplaceDashboardComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.ordersCanvas = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.revenueCanvas = _t.first);
      }
    }, inputs: { isActive: "isActive" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 10, vars: 5, consts: [["ordersCanvas", ""], ["revenueCanvas", ""], [1, "mp-dashboard"], [1, "page-header"], [1, "title-row"], [1, "meta"], [1, "critical-banner"], [1, "loading"], [1, "error-box"], [1, "muted"], ["title", "Refresh", 1, "btn-ghost", 3, "click"], [1, "btn-ghost", 3, "click"], [1, "kpi-grid"], [1, "kpi-tile"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], [1, "kpi-tile", "warn"], [1, "charts-row"], [1, "chart-card"], [1, "chart-wrap"], [1, "bottom-row"], [1, "card"], [1, "empty"], [1, "data-table"], [1, "r"], [1, "alerts-card"], [1, "strong"], [1, "r", "mono"], [1, "r", "strong"], [1, "alerts-list"], [3, "class"], [1, "alert-body"], [1, "alert-title"], [1, "alert-detail", "muted"], [1, "alert-severity"]], template: function MarketplaceDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "header", 3)(2, "div", 4)(3, "h2");
        \u0275\u0275text(4, "Marketplace overview");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, MarketplaceDashboardComponent_Conditional_5_Template, 5, 1, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, MarketplaceDashboardComponent_Conditional_6_Template, 2, 1, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(7, MarketplaceDashboardComponent_Conditional_7_Template, 2, 0, "p", 7)(8, MarketplaceDashboardComponent_Conditional_8_Template, 4, 1, "div", 8)(9, MarketplaceDashboardComponent_Conditional_9_Template, 88, 28);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_3_0;
        let tmp_4_0;
        \u0275\u0275advance(5);
        \u0275\u0275conditional(5, (tmp_0_0 = ctx.payload()) ? 5 : -1, tmp_0_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.criticalAlertsCount() > 0 ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(7, ctx.loading() && !ctx.payload() ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(8, (tmp_3_0 = ctx.error()) ? 8 : -1, tmp_3_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(9, (tmp_4_0 = ctx.payload()) ? 9 : -1, tmp_4_0);
      }
    }, dependencies: [CommonModule, DecimalPipe], styles: ['@charset "UTF-8";\n\n\n\n.mp-dashboard[_ngcontent-%COMP%] {\n  color: #fff;\n  padding: 0;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: #666;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 24px;\n  letter-spacing: 1.2px;\n  margin: 0;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .title-row[_ngcontent-%COMP%]   .meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 12px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .critical-banner[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 10px 14px;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  font-size: 13px;\n  font-weight: 600;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .error-box[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #d4af37;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile.warn[_ngcontent-%COMP%]::before {\n  background: #fbbf24;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1.1px;\n  text-transform: uppercase;\n  color: #888;\n  margin-bottom: 6px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 28px;\n  font-weight: 700;\n  color: #d4af37;\n  line-height: 1;\n  margin-bottom: 8px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile.warn[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .kpi-tile[_ngcontent-%COMP%]   .kpi-sub[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #666;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 16px 18px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  font-size: 12px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #aaa;\n  font-weight: 600;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .chart-card[_ngcontent-%COMP%]   .chart-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  height: 180px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 14px;\n  margin-bottom: 20px;\n}\n@media (max-width: 1024px) {\n  .mp-dashboard[_ngcontent-%COMP%]   .bottom-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.mp-dashboard[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 16px 18px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 14px 0;\n  font-size: 14px;\n  color: #ddd;\n  font-weight: 600;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px;\n  color: #666;\n  font-size: 12px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 8px 10px;\n  border-bottom: 1px solid #2a2a3a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: #888;\n  font-weight: 600;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 12px;\n  color: #ddd;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .pill.pill-closed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #4ade80;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .pill.pill-open[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .pill.pill-half-open[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n  color: #fcd34d;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alerts-card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 16px 18px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alerts-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 14px;\n  color: #ddd;\n  font-weight: 600;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alerts-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-radius: 6px;\n  margin-bottom: 6px;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 10px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item[_ngcontent-%COMP%]   .alert-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item[_ngcontent-%COMP%]   .alert-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item[_ngcontent-%COMP%]   .alert-detail[_ngcontent-%COMP%] {\n  font-size: 11px;\n  margin-top: 2px;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item[_ngcontent-%COMP%]   .alert-severity[_ngcontent-%COMP%] {\n  font-size: 9px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  padding: 2px 7px;\n  border-radius: 3px;\n  font-weight: 700;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-critical[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-critical[_ngcontent-%COMP%]   .alert-title[_ngcontent-%COMP%] {\n  color: #fca5a5;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-critical[_ngcontent-%COMP%]   .alert-severity[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: #fff;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-warning[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.08);\n  border: 1px solid rgba(251, 191, 36, 0.25);\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-warning[_ngcontent-%COMP%]   .alert-title[_ngcontent-%COMP%] {\n  color: #fcd34d;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-warning[_ngcontent-%COMP%]   .alert-severity[_ngcontent-%COMP%] {\n  background: #fbbf24;\n  color: #000;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-info[_ngcontent-%COMP%] {\n  background: rgba(56, 189, 248, 0.08);\n  border: 1px solid rgba(56, 189, 248, 0.25);\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-info[_ngcontent-%COMP%]   .alert-title[_ngcontent-%COMP%] {\n  color: #7dd3fc;\n}\n.mp-dashboard[_ngcontent-%COMP%]   .alert-item.severity-info[_ngcontent-%COMP%]   .alert-severity[_ngcontent-%COMP%] {\n  background: #38bdf8;\n  color: #000;\n}\n/*# sourceMappingURL=marketplace-dashboard.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketplaceDashboardComponent, { className: "MarketplaceDashboardComponent", filePath: "src\\app\\pages\\admin\\marketplace\\marketplace-dashboard.component.ts", lineNumber: 87 });
})();

// src/app/pages/admin/marketplace/admin-marketplace.component.ts
var _forTrack03 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.distributor;
function AdminMarketplaceComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 4);
    \u0275\u0275element(1, "app-marketplace-dashboard", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("isActive", ctx_r0.tab() === "dashboard");
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Loading products\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No products found.");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 21);
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", p_r4.image_url, \u0275\u0275sanitizeUrl)("alt", p_r4.brand);
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.name_ar);
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 20);
    \u0275\u0275template(2, AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Conditional_2_Template, 1, 2, "img", 21)(3, AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Conditional_3_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "div", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Conditional_7_Template, 2, 1, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 24);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 19);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 25);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 26);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 19);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td")(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td")(27, "span", 27);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "td", 28)(30, "button", 29);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Template_button_click_30_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openInventoryDrawer(p_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(31, "svg", 30);
    \u0275\u0275element(32, "path", 31)(33, "polyline", 32)(34, "line", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(35, "button", 34);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Template_button_click_35_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openEditProduct(p_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(36, "svg", 30);
    \u0275\u0275element(37, "path", 35)(38, "path", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "button", 37);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Template_button_click_39_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteProduct(p_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(40, "svg", 30);
    \u0275\u0275element(41, "polyline", 38)(42, "path", 39);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, p_r4.image_url ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, p_r4.name_ar ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.brand);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 18, p_r4.face_value, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.our_cost !== null ? \u0275\u0275pipeBind2(17, 21, p_r4.our_cost, "1.2-2") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 24, p_r4.our_price, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.productMargin(p_r4));
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("mode-chip mode-", p_r4.fulfillment_mode || "api", "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4.fulfillment_mode === "inventory" ? "Stock" : "API", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", p_r4.is_active)("inactive", !p_r4.is_active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4.is_active ? "Active" : "Hidden", " ");
  }
}
function AdminMarketplaceComponent_Conditional_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Image");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Brand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 19);
    \u0275\u0275text(12, "Face");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 19);
    \u0275\u0275text(14, "Cost");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 19);
    \u0275\u0275text(16, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 19);
    \u0275\u0275text(18, "Margin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 19);
    \u0275\u0275text(24, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "tbody");
    \u0275\u0275repeaterCreate(26, AdminMarketplaceComponent_Conditional_14_Conditional_7_For_27_Template, 43, 27, "tr", null, _forTrack03);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(26);
    \u0275\u0275repeater(ctx_r0.filteredProducts());
  }
}
function AdminMarketplaceComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 5)(1, "div", 13)(2, "input", 14);
    \u0275\u0275listener("ngModelChange", function AdminMarketplaceComponent_Conditional_14_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setProductSearch($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 15);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_14_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openCreateProduct());
    });
    \u0275\u0275text(4, "+ Add product");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, AdminMarketplaceComponent_Conditional_14_Conditional_5_Template, 2, 0, "p", 16)(6, AdminMarketplaceComponent_Conditional_14_Conditional_6_Template, 2, 0)(7, AdminMarketplaceComponent_Conditional_14_Conditional_7_Template, 28, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r0.productSearch());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(5, ctx_r0.productsLoading() ? 5 : ctx_r0.filteredProducts().length === 0 ? 6 : 7);
  }
}
function AdminMarketplaceComponent_Conditional_15_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Loading orders\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_15_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No orders match.");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_15_Conditional_18_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "div");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 24);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 26);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td")(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 24);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 19)(23, "button", 50);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_15_Conditional_18_For_20_Template_button_click_23_listener() {
      const o_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openOrderDetail(o_r7));
    });
    \u0275\u0275text(24, "View");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind3(3, 11, o_r7.id, 0, 8), "\u2026");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.orderUserName(o_r7) || "Unknown");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.orderUserEmail(o_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.orderProductName(o_r7));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(o_r7.distributor);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 15, o_r7.total_price, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275classMapInterpolate1("status-pill status-", o_r7.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r7.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 18, o_r7.created_at, "MMM d, y, h:mm a"));
  }
}
function AdminMarketplaceComponent_Conditional_15_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Order ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Distributor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 19);
    \u0275\u0275text(12, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "th", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, AdminMarketplaceComponent_Conditional_15_Conditional_18_For_20_Template, 25, 21, "tr", null, _forTrack03);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r0.filteredOrders());
  }
}
function AdminMarketplaceComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 6)(1, "div", 13)(2, "input", 41);
    \u0275\u0275listener("ngModelChange", function AdminMarketplaceComponent_Conditional_15_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setOrderSearch($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 42);
    \u0275\u0275listener("ngModelChange", function AdminMarketplaceComponent_Conditional_15_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setOrderStatusFilter($event));
    });
    \u0275\u0275elementStart(4, "option", 43);
    \u0275\u0275text(5, "All statuses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 44);
    \u0275\u0275text(7, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 45);
    \u0275\u0275text(9, "Processing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 46);
    \u0275\u0275text(11, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 47);
    \u0275\u0275text(13, "Failed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 48);
    \u0275\u0275text(15, "Refunded");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(16, AdminMarketplaceComponent_Conditional_15_Conditional_16_Template, 2, 0, "p", 16)(17, AdminMarketplaceComponent_Conditional_15_Conditional_17_Template, 2, 0)(18, AdminMarketplaceComponent_Conditional_15_Conditional_18_Template, 21, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r0.orderSearch());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r0.orderStatusFilter());
    \u0275\u0275advance(13);
    \u0275\u0275conditional(16, ctx_r0.ordersLoading() ? 16 : ctx_r0.filteredOrders().length === 0 ? 17 : 18);
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Loading distributors\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No distributors configured.");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 60)(2, "span", 61);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 62);
    \u0275\u0275text(5, "Inventory products");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 60)(7, "span", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 62);
    \u0275\u0275text(10, "Available codes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 60)(12, "span", 61);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 62);
    \u0275\u0275text(15, "Delivered 30d");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ss_r9 = ctx;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ss_r9.inventory_products);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ss_r9.available_codes);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ss_r9.delivered_30d);
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1, "secret");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1, "client_id");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1, "client_secret");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 68);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ci_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Updated ", \u0275\u0275pipeBind2(2, 1, ci_r10.updated_at, "MMM d, y, h:mm a"), "");
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "p", 63);
    \u0275\u0275text(2, "Credentials configured. ");
    \u0275\u0275elementStart(3, "span", 64);
    \u0275\u0275text(4, "Active");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 65);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 66)(8, "span", 67);
    \u0275\u0275text(9, "api_key");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_10_Template, 2, 0, "span", 67)(11, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_11_Template, 2, 0, "span", 67)(12, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_12_Template, 2, 0, "span", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Conditional_13_Template, 3, 4, "p", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ci_r10 = ctx;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("API key: ", ci_r10.api_key_masked, "");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(10, ci_r10.has_secret ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ci_r10.has_client_id ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ci_r10.has_client_secret ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, ci_r10.updated_at ? 13 : -1);
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 69);
    \u0275\u0275text(1, "No credentials configured. Distributor will not route any requests.");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 71);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r11);
      const d_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.dismissTestResult(d_r12));
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tr_r13 = ctx;
    \u0275\u0275classProp("success", tr_r13.success)("error", !tr_r13.success);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", tr_r13.success ? "OK" : "Failed", ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tr_r13.message, "");
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 72);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const d_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.testConnection(d_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.testBusyKey() === d_r12.distributor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.testBusyKey() === d_r12.distributor ? "Testing\u2026" : "Test", " ");
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "header")(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_6_Template, 16, 3, "div", 55)(7, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_7_Template, 14, 5, "div", 56)(8, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_8_Template, 2, 0)(9, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_9_Template, 7, 6, "div", 57);
    \u0275\u0275elementStart(10, "footer", 58)(11, "button", 15);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Template_button_click_11_listener() {
      const d_r12 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openCredentialsModal(d_r12));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Conditional_13_Template, 2, 2, "button", 59);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    let tmp_16_0;
    let tmp_17_0;
    const d_r12 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("configured", d_r12.has_active_creds);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(d_r12.display_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", d_r12.product_count, " products");
    \u0275\u0275advance();
    \u0275\u0275conditional(6, (tmp_15_0 = d_r12.stock_summary) ? 6 : -1, tmp_15_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, (tmp_16_0 = d_r12.has_active_creds && d_r12.credential_info) ? 7 : 8, tmp_16_0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, (tmp_17_0 = ctx_r0.testResults()[d_r12.distributor]) ? 9 : -1, tmp_17_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", d_r12.has_active_creds ? "Edit credentials" : "+ Add credentials", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(13, d_r12.has_active_creds ? 13 : -1);
  }
}
function AdminMarketplaceComponent_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275repeaterCreate(1, AdminMarketplaceComponent_Conditional_16_Conditional_3_For_2_Template, 14, 9, "div", 52, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.distributors());
  }
}
function AdminMarketplaceComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 7);
    \u0275\u0275template(1, AdminMarketplaceComponent_Conditional_16_Conditional_1_Template, 2, 0, "p", 16)(2, AdminMarketplaceComponent_Conditional_16_Conditional_2_Template, 2, 0)(3, AdminMarketplaceComponent_Conditional_16_Conditional_3_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.distributorsLoading() ? 1 : ctx_r0.distributors().length === 0 ? 2 : 3);
  }
}
function AdminMarketplaceComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeProductModal());
    });
    \u0275\u0275elementStart(1, "div", 74);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_17_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 75);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_17_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeProductModal());
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 76)(8, "div", 77)(9, "label");
    \u0275\u0275text(10, "Name ");
    \u0275\u0275elementStart(11, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.name, $event) || (ctx_r0.productForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label");
    \u0275\u0275text(13, "Name (Arabic) ");
    \u0275\u0275elementStart(14, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.name_ar, $event) || (ctx_r0.productForm.name_ar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label");
    \u0275\u0275text(16, "Distributor ");
    \u0275\u0275elementStart(17, "select", 42);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.distributor, $event) || (ctx_r0.productForm.distributor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(18, "option", 79);
    \u0275\u0275text(19, "LikeCard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 80);
    \u0275\u0275text(21, "WUPEX");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 81);
    \u0275\u0275text(23, "Reloadly");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 82);
    \u0275\u0275text(25, "Jawaker");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "label");
    \u0275\u0275text(27, "Distributor product ID ");
    \u0275\u0275elementStart(28, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.distributor_product_id, $event) || (ctx_r0.productForm.distributor_product_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "label");
    \u0275\u0275text(30, "Brand ");
    \u0275\u0275elementStart(31, "input", 84);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.brand, $event) || (ctx_r0.productForm.brand = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "label");
    \u0275\u0275text(33, "Category ");
    \u0275\u0275elementStart(34, "input", 85);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.category, $event) || (ctx_r0.productForm.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "label");
    \u0275\u0275text(36, "Face value ");
    \u0275\u0275elementStart(37, "input", 86);
    \u0275\u0275listener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFaceValueChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "label");
    \u0275\u0275text(39, "Currency ");
    \u0275\u0275elementStart(40, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.currency, $event) || (ctx_r0.productForm.currency = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "label");
    \u0275\u0275text(42, "Our cost (SAR) ");
    \u0275\u0275elementStart(43, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.our_cost, $event) || (ctx_r0.productForm.our_cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "label");
    \u0275\u0275text(45, " Our price (SAR) ");
    \u0275\u0275elementStart(46, "span", 88);
    \u0275\u0275text(47, "defaults to face value");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "input", 86);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.our_price, $event) || (ctx_r0.productForm.our_price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "label");
    \u0275\u0275text(50, "Region ");
    \u0275\u0275elementStart(51, "input", 89);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.region, $event) || (ctx_r0.productForm.region = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "label");
    \u0275\u0275text(53, "Sort order ");
    \u0275\u0275elementStart(54, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.sort_order, $event) || (ctx_r0.productForm.sort_order = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "label", 91);
    \u0275\u0275text(56, "Image URL ");
    \u0275\u0275elementStart(57, "input", 92);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_57_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.image_url, $event) || (ctx_r0.productForm.image_url = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "label");
    \u0275\u0275text(59, "Fulfillment mode ");
    \u0275\u0275elementStart(60, "select", 42);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_select_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.fulfillment_mode, $event) || (ctx_r0.productForm.fulfillment_mode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(61, "option", 93);
    \u0275\u0275text(62, "API (distributor)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "option", 94);
    \u0275\u0275text(64, "Inventory (pre-loaded)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "label");
    \u0275\u0275text(66, "Low stock threshold ");
    \u0275\u0275elementStart(67, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_67_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.low_stock_threshold, $event) || (ctx_r0.productForm.low_stock_threshold = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "label", 95)(69, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_17_Template_input_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.productForm.is_active, $event) || (ctx_r0.productForm.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(70, " Active (visible on storefront) ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(71, "footer")(72, "button", 97);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_17_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeProductModal());
    });
    \u0275\u0275text(73, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 98);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_17_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveProduct());
    });
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx === "edit" ? "Edit product" : "Create product");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.name);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.name_ar);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.distributor);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.distributor_product_id);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.brand);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.category);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.productForm.face_value);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.currency);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.our_cost);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.our_price);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.region);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.sort_order);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.image_url);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.fulfillment_mode);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.low_stock_threshold);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.productForm.is_active);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r0.productSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.productSaving() ? "Saving\u2026" : "Save", " ");
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, " \xB7 loading full detail\u2026");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Distributor order ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r17.distributor_order_id);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Idempotency key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd", 103);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r17.idempotency_key);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Fulfilled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 1, o_r17.fulfilled_at, "medium"));
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Refunded");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dt");
    \u0275\u0275text(6, "Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dd");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 2, o_r17.refunded_at, "medium"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(o_r17.refund_reason);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleCodeReveal());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.codeRevealed() ? "Hide" : "Show full", " ");
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275text(1, "Revealed");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
  }
  if (rf & 2) {
    const c_r19 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \xB7 ", \u0275\u0275pipeBind2(3, 1, c_r19.revealed_at, "medium"), " ");
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "Not yet revealed");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Expires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r19 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 1, c_r19.expires_at, "medium"));
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 100);
    \u0275\u0275text(1, "Delivered code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 104)(3, "div", 105)(4, "span", 106);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_6_Template, 2, 1, "button", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dl", 108)(8, "dt");
    \u0275\u0275text(9, "Delivered to user");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd");
    \u0275\u0275template(11, AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_11_Template, 4, 4)(12, AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_12_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, AdminMarketplaceComponent_Conditional_18_Conditional_68_Conditional_13_Template, 5, 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r19 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.codeRevealed() ? c_r19.full || c_r19.masked : c_r19.masked, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(6, c_r19.full ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(11, c_r19.revealed_at ? 11 : 12);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(13, c_r19.expires_at ? 13 : -1);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_69_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Serial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ic_r20 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ic_r20.serial_number);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_69_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, " \xB7 voided at refund");
    \u0275\u0275elementEnd();
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_69_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dt");
    \u0275\u0275text(1, "Delivered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dd");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ic_r20 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 1, ic_r20.delivered_at, "medium"));
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 100);
    \u0275\u0275text(1, "Inventory code (pool)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "dl", 108)(3, "dt");
    \u0275\u0275text(4, "Code ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dd", 110);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dt");
    \u0275\u0275text(8, "Batch ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd", 110);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AdminMarketplaceComponent_Conditional_18_Conditional_69_Conditional_11_Template, 4, 1);
    \u0275\u0275elementStart(12, "dt");
    \u0275\u0275text(13, "Pool status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd")(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, AdminMarketplaceComponent_Conditional_18_Conditional_69_Conditional_17_Template, 2, 0, "span", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AdminMarketplaceComponent_Conditional_18_Conditional_69_Conditional_18_Template, 5, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ic_r20 = ctx;
    const o_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ic_r20.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ic_r20.batch_id);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ic_r20.serial_number ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classMapInterpolate1("status-pill status-", ic_r20.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ic_r20.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(17, ic_r20.status === "expired" && o_r17.refunded_at ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ic_r20.delivered_at ? 18 : -1);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 100);
    \u0275\u0275text(1, "Admin notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "pre", 111);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r17 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r17.admin_notes);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_71_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 116)(1, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_18_Conditional_71_Conditional_11_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.refundVoidCode, $event) || (ctx_r0.refundVoidCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div")(3, "strong");
    \u0275\u0275text(4, "Also void the delivered code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 68);
    \u0275\u0275text(6, " Marks the inventory code as expired. Use when the code was never revealed by the user or when compensating for a duplicate delivery. The code will NOT be returned to the pool. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.refundVoidCode);
  }
}
function AdminMarketplaceComponent_Conditional_18_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3", 100);
    \u0275\u0275text(1, "Refund");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 112)(3, "label");
    \u0275\u0275text(4, "Reason ");
    \u0275\u0275elementStart(5, "span", 113);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 114);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_18_Conditional_71_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.refundReason, $event) || (ctx_r0.refundReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Internal note (optional) ");
    \u0275\u0275elementStart(10, "input", 115);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_18_Conditional_71_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.refundNotes, $event) || (ctx_r0.refundNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, AdminMarketplaceComponent_Conditional_18_Conditional_71_Conditional_11_Template, 7, 1, "label", 116);
    \u0275\u0275elementStart(12, "button", 117);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_18_Conditional_71_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.refundOrder());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r17 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.refundReason);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.refundNotes);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, (o_r17.inventory_code == null ? null : o_r17.inventory_code.can_void) ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.refundBusy());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.refundBusy() ? "Refunding\u2026" : "Refund to wallet", " ");
  }
}
function AdminMarketplaceComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_18_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeOrderDetail());
    });
    \u0275\u0275elementStart(1, "div", 99);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_18_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r16);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header")(3, "h2");
    \u0275\u0275text(4, "Order detail");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AdminMarketplaceComponent_Conditional_18_Conditional_5_Template, 2, 0, "span", 68);
    \u0275\u0275elementStart(6, "button", 75);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeOrderDetail());
    });
    \u0275\u0275text(7, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 76)(9, "h3", 100);
    \u0275\u0275text(10, "Order");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dl", 101)(12, "dt");
    \u0275\u0275text(13, "Order ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd", 49);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dt");
    \u0275\u0275text(17, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd")(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "dt");
    \u0275\u0275text(22, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "dd");
    \u0275\u0275text(24);
    \u0275\u0275elementStart(25, "span", 24);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "dt");
    \u0275\u0275text(28, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "dd");
    \u0275\u0275text(30);
    \u0275\u0275elementStart(31, "span", 24);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "dt");
    \u0275\u0275text(34, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "dd");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "dt");
    \u0275\u0275text(38, "Unit price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "dd");
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "dt");
    \u0275\u0275text(43, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "dd", 102);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "dt");
    \u0275\u0275text(48, "Distributor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "dd");
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275template(51, AdminMarketplaceComponent_Conditional_18_Conditional_51_Template, 4, 1)(52, AdminMarketplaceComponent_Conditional_18_Conditional_52_Template, 4, 1);
    \u0275\u0275elementStart(53, "dt");
    \u0275\u0275text(54, "Payment method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "dd");
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "dt");
    \u0275\u0275text(58, "Payment ref");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "dd", 49);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "dt");
    \u0275\u0275text(62, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "dd");
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(66, AdminMarketplaceComponent_Conditional_18_Conditional_66_Template, 5, 4)(67, AdminMarketplaceComponent_Conditional_18_Conditional_67_Template, 9, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(68, AdminMarketplaceComponent_Conditional_18_Conditional_68_Template, 14, 4)(69, AdminMarketplaceComponent_Conditional_18_Conditional_69_Template, 19, 9)(70, AdminMarketplaceComponent_Conditional_18_Conditional_70_Template, 4, 1)(71, AdminMarketplaceComponent_Conditional_18_Conditional_71_Template, 14, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "footer")(73, "button", 97);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_18_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeOrderDetail());
    });
    \u0275\u0275text(74, "Close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_21_0;
    let tmp_22_0;
    const o_r17 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ctx_r0.orderDetailLoading() ? 5 : -1);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(o_r17.id);
    \u0275\u0275advance(4);
    \u0275\u0275classMapInterpolate1("status-pill status-", o_r17.status, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r17.status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.orderUserName(o_r17), " \xB7 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.orderUserEmail(o_r17));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.orderProductName(o_r17));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \xB7 ", ctx_r0.orderProductBrand(o_r17), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r17.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(41, 25, o_r17.unit_price, "1.2-2"), " SAR");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(46, 28, o_r17.total_price, "1.2-2"), " SAR");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(o_r17.distributor);
    \u0275\u0275advance();
    \u0275\u0275conditional(51, o_r17.distributor_order_id ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(52, o_r17.idempotency_key ? 52 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r17.payment_method);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r17.payment_ref);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(65, 31, o_r17.created_at, "medium"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(66, o_r17.fulfilled_at ? 66 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(67, o_r17.refunded_at ? 67 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(68, (tmp_21_0 = o_r17.code) ? 68 : -1, tmp_21_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(69, (tmp_22_0 = o_r17.inventory_code) ? 69 : -1, tmp_22_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(70, o_r17.admin_notes ? 70 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(71, o_r17.status === "completed" && !o_r17.refunded_at ? 71 : -1);
  }
}
function AdminMarketplaceComponent_Conditional_19_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 127);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Conditional_42_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.clearCredentials());
    });
    \u0275\u0275text(1, " Remove credentials ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.credentialsSaving());
  }
}
function AdminMarketplaceComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeCredentialsModal());
    });
    \u0275\u0275elementStart(1, "div", 74);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r23);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 75);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeCredentialsModal());
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 76)(8, "p", 118);
    \u0275\u0275text(9, "Leave a field empty to keep its existing value unchanged.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 119)(11, "label");
    \u0275\u0275text(12, "API key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 120)(14, "input", 121);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_19_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.credentialForm.api_key, $event) || (ctx_r0.credentialForm.api_key = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 122);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleReveal("api_key"));
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 119)(18, "label");
    \u0275\u0275text(19, "API secret");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 120)(21, "input", 123);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_19_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.credentialForm.api_secret, $event) || (ctx_r0.credentialForm.api_secret = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 122);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleReveal("api_secret"));
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 119)(25, "label");
    \u0275\u0275text(26, "Client ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 120)(28, "input", 123);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_19_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.credentialForm.client_id, $event) || (ctx_r0.credentialForm.client_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 122);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleReveal("client_id"));
    });
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 119)(32, "label");
    \u0275\u0275text(33, "Client secret");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 120)(35, "input", 123);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_19_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.credentialForm.client_secret, $event) || (ctx_r0.credentialForm.client_secret = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 122);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleReveal("client_secret"));
    });
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "label", 124)(39, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function AdminMarketplaceComponent_Conditional_19_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.credentialForm.is_active, $event) || (ctx_r0.credentialForm.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " Active (route requests to this distributor) ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "footer");
    \u0275\u0275template(42, AdminMarketplaceComponent_Conditional_19_Conditional_42_Template, 2, 1, "button", 125);
    \u0275\u0275element(43, "div", 126);
    \u0275\u0275elementStart(44, "button", 97);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeCredentialsModal());
    });
    \u0275\u0275text(45, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 98);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_19_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveCredentials());
    });
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const d_r25 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", d_r25.display_name, " credentials");
    \u0275\u0275advance(10);
    \u0275\u0275property("type", ctx_r0.revealField()["api_key"] ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.credentialForm.api_key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.revealField()["api_key"] ? "Hide" : "Show", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx_r0.revealField()["api_secret"] ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.credentialForm.api_secret);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.revealField()["api_secret"] ? "Hide" : "Show", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx_r0.revealField()["client_id"] ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.credentialForm.client_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.revealField()["client_id"] ? "Hide" : "Show", " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx_r0.revealField()["client_secret"] ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.credentialForm.client_secret);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.revealField()["client_secret"] ? "Hide" : "Show", " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.credentialForm.is_active);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(42, d_r25.has_active_creds ? 42 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.credentialsSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.credentialsSaving() ? "Saving\u2026" : "Save", " ");
  }
}
function AdminMarketplaceComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-product-inventory-drawer", 128);
    \u0275\u0275listener("close", function AdminMarketplaceComponent_Conditional_20_Template_app_product_inventory_drawer_close_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeInventoryDrawer());
    })("changed", function AdminMarketplaceComponent_Conditional_20_Template_app_product_inventory_drawer_changed_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInventoryChanged());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("productId", ctx);
  }
}
function AdminMarketplaceComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 129)(4, "button", 97);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_21_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmNo());
    });
    \u0275\u0275text(5, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 130);
    \u0275\u0275listener("click", function AdminMarketplaceComponent_Conditional_21_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r27);
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
function AdminMarketplaceComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mp-toast--err", !ctx_r0.toastOk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.toastMsg());
  }
}
var AdminMarketplaceComponent = class _AdminMarketplaceComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl + "/admin/marketplace";
    this.toastMsg = signal(null);
    this.toastOk = signal(true);
    this.confirmMsg = signal(null);
    this.confirmCallback = null;
    this.tab = signal("dashboard");
    this.stats = signal(null);
    this.statsVm = computed(() => {
      const s = this.stats();
      const prods = this.products();
      return {
        total_products: prods.length,
        active_products: prods.filter((p) => p.is_active).length,
        total_orders: s?.totals?.total_orders ?? 0,
        completed: s?.totals?.completed ?? 0,
        gross_revenue: s?.totals?.gross_revenue ?? 0
      };
    });
    this.products = signal([]);
    this.productsLoading = signal(false);
    this.productSearch = signal("");
    this.filteredProducts = computed(() => {
      const q = this.productSearch().toLowerCase().trim();
      const all = this.products();
      if (!q)
        return all;
      return all.filter((p) => p.name.toLowerCase().includes(q) || (p.name_ar ?? "").toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.distributor.toLowerCase().includes(q));
    });
    this.productModalMode = signal(null);
    this.productSaving = signal(false);
    this.productForm = this.freshProductForm();
    this.inventoryDrawerProductId = signal(null);
    this.orders = signal([]);
    this.ordersLoading = signal(false);
    this.orderSearch = signal("");
    this.orderStatusFilter = signal("all");
    this.filteredOrders = computed(() => {
      const q = this.orderSearch().toLowerCase().trim();
      const s = this.orderStatusFilter();
      return this.orders().filter((o) => {
        if (s !== "all" && o.status !== s)
          return false;
        if (!q)
          return true;
        return o.id.toLowerCase().includes(q) || this.orderUserEmail(o).toLowerCase().includes(q) || this.orderUserName(o).toLowerCase().includes(q) || this.orderProductName(o).toLowerCase().includes(q) || (o.payment_ref ?? "").toLowerCase().includes(q);
      });
    });
    this.orderDetail = signal(null);
    this.orderDetailLoading = signal(false);
    this.refundBusy = signal(false);
    this.codeRevealed = signal(false);
    this.refundReason = "";
    this.refundNotes = "";
    this.refundVoidCode = false;
    this.distributors = signal([]);
    this.distributorsLoading = signal(false);
    this.credentialsModal = signal(null);
    this.credentialsSaving = signal(false);
    this.revealField = signal({});
    this.credentialForm = this.freshCredentialForm();
    this.testResults = signal({});
    this.testBusyKey = signal(null);
  }
  notify(msg, ok = true) {
    this.toastMsg.set(msg);
    this.toastOk.set(ok);
    setTimeout(() => this.toastMsg.set(null), 3500);
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
    this.loadStats();
    this.loadProducts();
    this.loadOrders();
    this.loadDistributors();
  }
  setTab(tab) {
    this.tab.set(tab);
  }
  /**
   * Read order user/product display values defensively — flat field
   * first (Sprint 12A+ shape), nested object second (Sprint 11 shape).
   * Returns an empty string on no data so the template renders cleanly.
   */
  orderUserName(o) {
    return o.user_name ?? o.user?.name ?? "";
  }
  orderUserEmail(o) {
    return o.user_email ?? o.user?.email ?? "";
  }
  orderProductName(o) {
    return o.product_name ?? o.product?.name ?? o.product_id ?? "";
  }
  orderProductBrand(o) {
    return o.product_brand ?? o.product?.brand ?? "";
  }
  loadStats() {
    this.http.get(`${this.base}/stats`).subscribe({
      next: (r) => this.stats.set(r.data),
      error: () => {
      }
    });
  }
  loadProducts() {
    this.productsLoading.set(true);
    this.http.get(`${this.base}/products?per_page=1000`).subscribe({
      next: (r) => {
        this.products.set(this.unwrapList(r));
        this.productsLoading.set(false);
      },
      error: () => this.productsLoading.set(false)
    });
  }
  setProductSearch(v) {
    this.productSearch.set(v);
  }
  openCreateProduct() {
    this.productForm = this.freshProductForm();
    this.productModalMode.set("create");
  }
  openEditProduct(p) {
    this.productForm = {
      id: p.id,
      distributor: p.distributor ?? "",
      distributor_product_id: p.distributor_product_id ?? "",
      name: p.name ?? "",
      name_ar: p.name_ar ?? "",
      brand: p.brand ?? "",
      category: p.category ?? "",
      face_value: p.face_value ?? 0,
      currency: p.currency ?? "SAR",
      our_cost: p.our_cost ?? 0,
      our_price: p.our_price ?? 0,
      region: p.region ?? "SA",
      image_url: p.image_url ?? "",
      is_active: !!p.is_active,
      sort_order: p.sort_order ?? 0,
      fulfillment_mode: p.fulfillment_mode ?? "api",
      low_stock_threshold: p.low_stock_threshold ?? 5
    };
    this.productModalMode.set("edit");
  }
  closeProductModal() {
    this.productModalMode.set(null);
  }
  /**
   * Sprint 12A+ pricing policy: no markup by default.
   * When the admin types in face value, mirror it to our_price IF
   * our_price is currently empty/zero or equal to the previous face value.
   * This respects manual overrides (if admin explicitly typed a different
   * price, we don't stomp on it).
   */
  onFaceValueChange(newVal) {
    const prev = this.productForm.face_value;
    const currentPrice = this.productForm.our_price;
    if (currentPrice === 0 || currentPrice === prev) {
      this.productForm.our_price = newVal;
    }
    this.productForm.face_value = newVal;
  }
  saveProduct() {
    if (this.productSaving())
      return;
    this.productSaving.set(true);
    const mode = this.productModalMode();
    const url = mode === "edit" ? `${this.base}/products/${this.productForm.id}` : `${this.base}/products`;
    const req = mode === "edit" ? this.http.put(url, this.productForm) : this.http.post(url, this.productForm);
    req.subscribe({
      next: () => {
        this.productSaving.set(false);
        this.productModalMode.set(null);
        this.loadProducts();
        this.loadStats();
      },
      error: (err) => {
        this.productSaving.set(false);
        const msg = err?.error?.message ?? Object.values(err?.error?.errors ?? {}).flat().join("\n") ?? "Save failed.";
        this.notify(msg, false);
      }
    });
  }
  deleteProduct(p) {
    this.ask(`Delete "${p.name}"? This cannot be undone.`, () => {
      this.http.delete(`${this.base}/products/${p.id}`).subscribe({
        next: () => {
          this.loadProducts();
          this.loadStats();
          this.notify("Product deleted.");
        },
        error: (err) => this.notify(err?.error?.message ?? "Delete failed.", false)
      });
    });
  }
  openInventoryDrawer(productId) {
    this.inventoryDrawerProductId.set(productId);
  }
  closeInventoryDrawer() {
    this.inventoryDrawerProductId.set(null);
  }
  onInventoryChanged() {
    this.loadProducts();
    this.loadDistributors();
  }
  productMargin(p) {
    const cost = p.our_cost ?? 0;
    if (cost <= 0)
      return "\u2014";
    const margin = (p.our_price - cost) / cost * 100;
    return `${margin.toFixed(1)}%`;
  }
  // Orders
  loadOrders() {
    this.ordersLoading.set(true);
    this.http.get(`${this.base}/orders?per_page=200`).subscribe({
      next: (r) => {
        this.orders.set(this.unwrapList(r));
        this.ordersLoading.set(false);
      },
      error: () => this.ordersLoading.set(false)
    });
  }
  setOrderSearch(v) {
    this.orderSearch.set(v);
  }
  setOrderStatusFilter(v) {
    this.orderStatusFilter.set(v);
  }
  openOrderDetail(o) {
    this.orderDetail.set(__spreadProps(__spreadValues({}, o), {
      distributor_order_id: null,
      idempotency_key: null,
      code: null,
      inventory_code: null
    }));
    this.codeRevealed.set(false);
    this.refundReason = "";
    this.refundNotes = "";
    this.refundVoidCode = false;
    this.orderDetailLoading.set(true);
    this.http.get(`${this.base}/orders/${o.id}`).subscribe({
      next: (r) => {
        this.orderDetail.set(r.data);
        this.orderDetailLoading.set(false);
      },
      error: () => {
        this.orderDetailLoading.set(false);
      }
    });
  }
  closeOrderDetail() {
    this.orderDetail.set(null);
    this.codeRevealed.set(false);
    this.refundReason = "";
    this.refundNotes = "";
    this.refundVoidCode = false;
  }
  toggleCodeReveal() {
    this.codeRevealed.update((v) => !v);
  }
  refundOrder() {
    const o = this.orderDetail();
    if (!o || this.refundBusy())
      return;
    if (!this.refundReason.trim()) {
      this.notify("Please provide a reason for the refund.", false);
      return;
    }
    const voidingCode = this.refundVoidCode && !!o.inventory_code?.can_void;
    const confirmMsg = voidingCode ? `Refund ${o.total_price} SAR to user wallet AND void the delivered code?` : `Refund ${o.total_price} SAR to user wallet?`;
    this.ask(confirmMsg, () => {
      this.refundBusy.set(true);
      this.http.post(`${this.base}/orders/${o.id}/refund`, {
        reason: this.refundReason,
        notes: this.refundNotes || null,
        void_code: voidingCode
      }).subscribe({
        next: (r) => {
          this.refundBusy.set(false);
          this.orderDetail.set(r.data);
          this.loadOrders();
          this.loadStats();
          this.loadDistributors();
        },
        error: (err) => {
          this.refundBusy.set(false);
          this.notify(err?.error?.message ?? "Refund failed.", false);
        }
      });
    });
  }
  // Distributors
  loadDistributors() {
    this.distributorsLoading.set(true);
    this.http.get(`${this.base}/distributors`).subscribe({
      next: (r) => {
        this.distributors.set(r.data ?? []);
        this.distributorsLoading.set(false);
      },
      error: () => this.distributorsLoading.set(false)
    });
  }
  openCredentialsModal(d) {
    this.credentialForm = this.freshCredentialForm();
    this.credentialForm.is_active = d.has_active_creds;
    this.revealField.set({});
    this.credentialsModal.set(d);
  }
  closeCredentialsModal() {
    this.credentialsModal.set(null);
    this.revealField.set({});
  }
  toggleReveal(field) {
    const cur = this.revealField();
    this.revealField.set(__spreadProps(__spreadValues({}, cur), { [field]: !cur[field] }));
  }
  saveCredentials() {
    const d = this.credentialsModal();
    if (!d || this.credentialsSaving())
      return;
    const body = { is_active: this.credentialForm.is_active };
    if (this.credentialForm.api_key.trim())
      body["api_key"] = this.credentialForm.api_key;
    if (this.credentialForm.api_secret.trim())
      body["api_secret"] = this.credentialForm.api_secret;
    if (this.credentialForm.client_id.trim())
      body["client_id"] = this.credentialForm.client_id;
    if (this.credentialForm.client_secret.trim())
      body["client_secret"] = this.credentialForm.client_secret;
    this.credentialsSaving.set(true);
    this.http.put(`${this.base}/distributors/${d.distributor}/credentials`, body).subscribe({
      next: () => {
        this.credentialsSaving.set(false);
        this.credentialsModal.set(null);
        this.loadDistributors();
      },
      error: (err) => {
        this.credentialsSaving.set(false);
        this.notify(err?.error?.message ?? "Save failed.", false);
      }
    });
  }
  clearCredentials() {
    const d = this.credentialsModal();
    if (!d)
      return;
    this.ask(`Remove all credentials for ${d.display_name}? This will disable routing to this distributor.`, () => {
      this.credentialsSaving.set(true);
      this.http.delete(`${this.base}/distributors/${d.distributor}/credentials`).subscribe({
        next: () => {
          this.credentialsSaving.set(false);
          this.credentialsModal.set(null);
          this.loadDistributors();
        },
        error: (err) => {
          this.credentialsSaving.set(false);
          this.notify(err?.error?.message ?? "Clear failed.", false);
        }
      });
    });
  }
  testConnection(d) {
    if (this.testBusyKey())
      return;
    this.testBusyKey.set(d.distributor);
    this.http.post(`${this.base}/distributors/${d.distributor}/test-connection`, {}).subscribe({
      next: (r) => {
        this.testResults.set(__spreadProps(__spreadValues({}, this.testResults()), { [d.distributor]: r.data }));
        this.testBusyKey.set(null);
      },
      error: (err) => {
        this.testResults.set(__spreadProps(__spreadValues({}, this.testResults()), {
          [d.distributor]: {
            success: false,
            message: err?.error?.message ?? "Connection test failed.",
            checked_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        }));
        this.testBusyKey.set(null);
      }
    });
  }
  dismissTestResult(d) {
    const cur = __spreadValues({}, this.testResults());
    delete cur[d.distributor];
    this.testResults.set(cur);
  }
  unwrapList(r) {
    if (!r)
      return [];
    if (Array.isArray(r.data))
      return r.data;
    if (Array.isArray(r.data?.data))
      return r.data.data;
    if (Array.isArray(r))
      return r;
    return [];
  }
  freshProductForm() {
    return {
      distributor: "likecard",
      distributor_product_id: "",
      name: "",
      name_ar: "",
      brand: "",
      category: "gaming",
      face_value: 0,
      currency: "SAR",
      our_cost: 0,
      our_price: 0,
      region: "SA",
      image_url: "",
      is_active: true,
      sort_order: 0,
      fulfillment_mode: "api",
      low_stock_threshold: 5
    };
  }
  freshCredentialForm() {
    return {
      api_key: "",
      api_secret: "",
      client_id: "",
      client_secret: "",
      is_active: true
    };
  }
  static {
    this.\u0275fac = function AdminMarketplaceComponent_Factory(t) {
      return new (t || _AdminMarketplaceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminMarketplaceComponent, selectors: [["app-admin-marketplace"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 19, consts: [[1, "admin-marketplace"], [1, "page-header"], [1, "tabs"], [3, "click"], [1, "tab-content", "dashboard-tab"], [1, "tab-content", "products-tab"], [1, "tab-content", "orders-tab"], [1, "tab-content", "distributors-tab"], [1, "overlay"], [3, "productId"], [1, "mp-confirm-bar"], [1, "mp-toast", 3, "mp-toast--err"], [3, "isActive"], [1, "toolbar"], ["type", "text", "placeholder", "Search products\u2026", 1, "search", 3, "ngModelChange", "ngModel"], [1, "primary", 3, "click"], [1, "loading"], [1, "empty"], [1, "data-table"], [1, "r"], [1, "img"], [3, "src", "alt"], [1, "name"], [1, "name-ar"], [1, "muted"], [1, "r", "muted"], [1, "r", "strong"], [1, "status"], [1, "r", "actions"], ["title", "Inventory", 1, "btn-icon", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"], ["points", "3.27 6.96 12 12.01 20.73 6.96"], ["x1", "12", "y1", "22.08", "x2", "12", "y2", "12"], ["title", "Edit", 1, "btn-icon", 3, "click"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["title", "Delete", 1, "btn-icon", "danger", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"], [1, "no-img"], ["type", "text", "placeholder", "Search orders by ID, user, product\u2026", 1, "search", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "pending"], ["value", "processing"], ["value", "completed"], ["value", "failed"], ["value", "refunded"], [1, "mono"], [1, "btn-ghost", 3, "click"], [1, "distributor-grid"], [1, "distributor-card", 3, "configured"], [1, "distributor-card"], [1, "active-count"], [1, "stock-grid"], [1, "creds-ok"], [1, "test-result", 3, "success", "error"], [1, "card-actions"], [1, "ghost", 3, "disabled"], [1, "stock-stat"], [1, "n"], [1, "l"], [1, "creds-status"], [1, "ok"], [1, "mono", "muted"], [1, "cred-flags"], [1, "flag"], [1, "muted", "small"], [1, "creds-missing"], [1, "test-result"], ["aria-label", "Dismiss", 1, "dismiss", 3, "click"], [1, "ghost", 3, "click", "disabled"], [1, "overlay", 3, "click"], [1, "modal", 3, "click"], [1, "close", 3, "click"], [1, "body"], [1, "grid-2"], ["maxlength", "200", 3, "ngModelChange", "ngModel"], ["value", "likecard"], ["value", "wupex"], ["value", "reloadly"], ["value", "jawaker"], ["maxlength", "120", 3, "ngModelChange", "ngModel"], ["maxlength", "100", 3, "ngModelChange", "ngModel"], ["maxlength", "50", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.01", "min", "0", 3, "ngModelChange", "ngModel"], ["maxlength", "3", 3, "ngModelChange", "ngModel"], [1, "hint-inline"], ["maxlength", "10", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [1, "full"], ["maxlength", "500", "placeholder", "/brands/apple.svg or https://\u2026", 3, "ngModelChange", "ngModel"], ["value", "api"], ["value", "inventory"], [1, "full", "inline"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "ghost", 3, "click"], [1, "primary", 3, "click", "disabled"], [1, "modal", "wide", 3, "click"], [1, "section-head"], [1, "kv"], [1, "strong"], [1, "mono", "muted", "small"], [1, "code-panel"], [1, "code-row"], [1, "code-value", "mono"], [1, "btn-ghost"], [1, "kv", "dense"], [1, "warn"], [1, "mono", "small"], [1, "admin-notes"], [1, "refund-box"], [1, "required"], ["type", "text", "placeholder", "Required", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Visible in admin audit trail", 3, "ngModelChange", "ngModel"], [1, "inline", "void-option"], [1, "danger", 3, "click", "disabled"], [1, "hint"], [1, "cred-field"], [1, "input-row"], ["placeholder", "sk_live_\u2026", 3, "ngModelChange", "type", "ngModel"], ["type", "button", 1, "btn-ghost", 3, "click"], [3, "ngModelChange", "type", "ngModel"], [1, "inline"], [1, "danger-ghost", 3, "disabled"], [1, "spacer"], [1, "danger-ghost", 3, "click", "disabled"], [3, "close", "changed", "productId"], [1, "mp-confirm-actions"], [1, "primary", "danger", 3, "click"], [1, "mp-toast"]], template: function AdminMarketplaceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
        \u0275\u0275text(3, "Marketplace");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "nav", 2)(5, "button", 3);
        \u0275\u0275listener("click", function AdminMarketplaceComponent_Template_button_click_5_listener() {
          return ctx.setTab("dashboard");
        });
        \u0275\u0275text(6, " Dashboard ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 3);
        \u0275\u0275listener("click", function AdminMarketplaceComponent_Template_button_click_7_listener() {
          return ctx.setTab("products");
        });
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 3);
        \u0275\u0275listener("click", function AdminMarketplaceComponent_Template_button_click_9_listener() {
          return ctx.setTab("orders");
        });
        \u0275\u0275text(10, " Orders ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 3);
        \u0275\u0275listener("click", function AdminMarketplaceComponent_Template_button_click_11_listener() {
          return ctx.setTab("distributors");
        });
        \u0275\u0275text(12, " Distributors & Keys ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, AdminMarketplaceComponent_Conditional_13_Template, 2, 1, "section", 4)(14, AdminMarketplaceComponent_Conditional_14_Template, 8, 2, "section", 5)(15, AdminMarketplaceComponent_Conditional_15_Template, 19, 3, "section", 6)(16, AdminMarketplaceComponent_Conditional_16_Template, 4, 1, "section", 7)(17, AdminMarketplaceComponent_Conditional_17_Template, 76, 19, "div", 8)(18, AdminMarketplaceComponent_Conditional_18_Template, 75, 34, "div", 8)(19, AdminMarketplaceComponent_Conditional_19_Template, 48, 17, "div", 8)(20, AdminMarketplaceComponent_Conditional_20_Template, 1, 1, "app-product-inventory-drawer", 9)(21, AdminMarketplaceComponent_Conditional_21_Template, 8, 1, "div", 10)(22, AdminMarketplaceComponent_Conditional_22_Template, 2, 3, "div", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_9_0;
        let tmp_10_0;
        let tmp_11_0;
        let tmp_12_0;
        \u0275\u0275advance(5);
        \u0275\u0275classProp("active", ctx.tab() === "dashboard");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "products");
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" Products (", ctx.products().length, ") ");
        \u0275\u0275advance();
        \u0275\u0275classProp("active", ctx.tab() === "orders");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "distributors");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(13, ctx.tab() === "dashboard" ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(14, ctx.tab() === "products" ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.tab() === "orders" ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(16, ctx.tab() === "distributors" ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(17, (tmp_9_0 = ctx.productModalMode()) ? 17 : -1, tmp_9_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(18, (tmp_10_0 = ctx.orderDetail()) ? 18 : -1, tmp_10_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(19, (tmp_11_0 = ctx.credentialsModal()) ? 19 : -1, tmp_11_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(20, (tmp_12_0 = ctx.inventoryDrawerProductId()) ? 20 : -1, tmp_12_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(21, ctx.confirmMsg() ? 21 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(22, ctx.toastMsg() ? 22 : -1);
      }
    }, dependencies: [CommonModule, SlicePipe, DecimalPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, MinValidator, NgModel, ProductInventoryDrawerComponent, MarketplaceDashboardComponent], styles: ['@charset "UTF-8";\n\n\n\n.admin-marketplace[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #e5e5ea;\n  font-family: inherit;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mp-toast[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  z-index: 600;\n  padding: 12px 20px;\n  border-radius: 8px;\n  font-size: 14px;\n  background: rgba(16, 185, 129, 0.18);\n  border: 1px solid rgba(16, 185, 129, 0.4);\n  color: #6ee7b7;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, 0.4);\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mp-toast--err[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.18);\n  border-color: rgba(239, 68, 68, 0.4);\n  color: #fca5a5;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mp-confirm-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 600;\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding: 12px 18px;\n  background: #15161d;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 10px;\n  box-shadow: 0 10px 32px -8px rgba(0, 0, 0, 0.5);\n  font-size: 14px;\n  color: #e5e5ea;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mp-confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .primary.danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border-color: #ef4444;\n  color: #fff;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-family: Rajdhani, sans-serif;\n  font-size: 28px;\n  letter-spacing: 1px;\n  color: #fff;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stats-row[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%] {\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 8px;\n  padding: 12px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 100px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stats-row[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 20px;\n  font-weight: 700;\n  color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stats-row[_ngcontent-%COMP%]   .stat[_ngcontent-%COMP%]   .l[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #888;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  border-bottom: 1px solid #2a2a3a;\n  margin-bottom: 20px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  color: #888;\n  padding: 12px 18px;\n  cursor: pointer;\n  font-size: 14px;\n  font-family: Rajdhani, sans-serif;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  transition: color 0.15s, border-color 0.15s;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #d4af37;\n  border-bottom-color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 16px;\n  align-items: center;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 10px 14px;\n  border-radius: 6px;\n  font-size: 13px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 8px;\n  overflow: hidden;\n  font-size: 13px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  text-align: left;\n  border-bottom: 1px solid #1f1f2e;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: #888;\n  font-weight: 600;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  background: #0f0f18;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.04);\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: #666;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 12px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #fff;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .name-ar[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 12px;\n  margin-top: 2px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.img[_ngcontent-%COMP%] {\n  width: 52px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  object-fit: contain;\n  border-radius: 4px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   td.img[_ngcontent-%COMP%]   .no-img[_ngcontent-%COMP%] {\n  color: #444;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%], .admin-marketplace[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #666;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mode-chip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  white-space: nowrap;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mode-chip.mode-api[_ngcontent-%COMP%] {\n  background: rgba(96, 165, 250, 0.15);\n  color: #60a5fa;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .mode-chip.mode-inventory[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 10px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #86efac;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status.inactive[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #fca5a5;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status-pill[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 8px;\n  border-radius: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status-pill.status-pending[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.15);\n  color: #fbbf24;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status-pill.status-processing[_ngcontent-%COMP%] {\n  background: rgba(96, 165, 250, 0.15);\n  color: #60a5fa;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status-pill.status-completed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #86efac;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status-pill.status-failed[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .status-pill.status-refunded[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.15);\n  color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  border: 0;\n  color: #fff;\n  padding: 10px 18px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 13px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 10px 18px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.ghost[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: #888;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  border: 0;\n  color: #fff;\n  padding: 10px 18px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.danger[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.danger-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(239, 68, 68, 0.4);\n  color: #fca5a5;\n  padding: 10px 14px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.danger-ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.danger-ghost[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.btn-ghost[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.btn-icon[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #888;\n  padding: 4px 8px;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-right: 4px;\n  font-size: 13px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.btn-icon[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   button.btn-icon.danger[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, 0.4);\n}\n.admin-marketplace[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 16px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%] {\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 8px;\n  padding: 20px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card.configured[_ngcontent-%COMP%] {\n  border-color: rgba(212, 175, 55, 0.35);\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Rajdhani, sans-serif;\n  font-size: 20px;\n  color: #fff;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .active-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #888;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-missing[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 13px;\n  margin: 16px 0;\n  line-height: 1.5;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  font-size: 13px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   .ok[_ngcontent-%COMP%] {\n  color: #86efac;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   .warn[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   .creds-status[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   .mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 11px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   .small[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   .creds-ok[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%] {\n  color: #666;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  text-align: center;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .distributor-card[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stock-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin: 14px 0;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stock-grid[_ngcontent-%COMP%]   .stock-stat[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  border-radius: 6px;\n  padding: 12px 6px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 68px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stock-grid[_ngcontent-%COMP%]   .stock-stat[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n  display: block;\n  font-family: "Space Mono", monospace;\n  font-size: 22px;\n  font-weight: 700;\n  color: #d4af37;\n  line-height: 1;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .stock-grid[_ngcontent-%COMP%]   .stock-stat[_ngcontent-%COMP%]   .l[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #888;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-top: 6px;\n  line-height: 1.3;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-flags[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n  margin: 8px 0;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-flags[_ngcontent-%COMP%]   .flag[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #86efac;\n  font-size: 10px;\n  padding: 3px 8px;\n  border-radius: 3px;\n  font-family: "Space Mono", monospace;\n  letter-spacing: 0.3px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding: 10px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  flex: 1;\n  line-height: 1.4;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-right: 4px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result[_ngcontent-%COMP%]   .dismiss[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  color: inherit;\n  opacity: 0.6;\n  cursor: pointer;\n  font-size: 12px;\n  padding: 0 4px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result[_ngcontent-%COMP%]   .dismiss[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  border: 1px solid rgba(34, 197, 94, 0.3);\n  color: #86efac;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .test-result.error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  color: #fca5a5;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 14px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 12px;\n  padding: 9px 10px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 950;\n  padding: 24px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%] {\n  background: #14141f;\n  border: 1px solid #2a2a3a;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 720px;\n  max-height: 92vh;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px;\n  border-bottom: 1px solid #2a2a3a;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #fff;\n  font-family: Rajdhani, sans-serif;\n  letter-spacing: 0.5px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 0;\n  color: #888;\n  font-size: 20px;\n  cursor: pointer;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 16px 24px;\n  border-top: 1px solid #2a2a3a;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   .inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  font-size: 12px;\n  color: #aaa;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 8px 10px;\n  border-radius: 6px;\n  font-size: 13px;\n  font-family: inherit;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .admin-marketplace[_ngcontent-%COMP%]   .grid-2[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 6px 16px;\n  margin: 0;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding-top: 4px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .kv[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #fff;\n  font-size: 13px;\n  padding-top: 4px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .refund-box[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding: 16px;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  border-radius: 8px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .refund-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 14px;\n  color: #fca5a5;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .refund-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 8px 10px;\n  border-radius: 6px;\n  font-size: 13px;\n  width: 100%;\n  margin-bottom: 12px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-field[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #aaa;\n  margin-bottom: 6px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-field[_ngcontent-%COMP%]   .input-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-field[_ngcontent-%COMP%]   .input-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #0a0a14;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 8px 10px;\n  border-radius: 6px;\n  font-size: 13px;\n  font-family: "Space Mono", monospace;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .cred-field[_ngcontent-%COMP%]   .input-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.admin-marketplace[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 12px;\n  margin: 0 0 16px;\n  padding: 10px 12px;\n  background: rgba(96, 165, 250, 0.05);\n  border: 1px solid rgba(96, 165, 250, 0.15);\n  border-radius: 6px;\n}\n.admin-marketplace[_ngcontent-%COMP%]   label.inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: #aaa;\n}\n.admin-marketplace[_ngcontent-%COMP%]   label.inline[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n/*# sourceMappingURL=admin-marketplace.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminMarketplaceComponent, { className: "AdminMarketplaceComponent", filePath: "src\\app\\pages\\admin\\marketplace\\admin-marketplace.component.ts", lineNumber: 169 });
})();
export {
  AdminMarketplaceComponent
};
//# sourceMappingURL=chunk-MUM2GS7U.js.map
