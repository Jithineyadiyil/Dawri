import {
  takeUntilDestroyed
} from "./chunk-3KAEIJBU.js";
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
  DatePipe,
  DecimalPipe,
  DestroyRef,
  EventEmitter,
  HttpClient,
  HttpParams,
  TitleCasePipe,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-3NRO4OA5.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/pages/admin/finance/date-range-picker.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function DateRangePickerComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function DateRangePickerComponent_For_3_Template_button_click_0_listener() {
      const preset_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyPreset(preset_r2.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const preset_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activePreset === preset_r2.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", preset_r2.label, " ");
  }
}
var DateRangePickerComponent = class _DateRangePickerComponent {
  constructor() {
    this.from = "";
    this.to = "";
    this.rangeChange = new EventEmitter();
    this.presets = [
      { key: "today", label: "Today" },
      { key: "this_week", label: "This week" },
      { key: "this_month", label: "This month" },
      { key: "last_30", label: "Last 30 days" },
      { key: "quarter", label: "This quarter" },
      { key: "year", label: "This year" }
    ];
    this.activePreset = "last_30";
  }
  ngOnInit() {
    if (!this.from || !this.to) {
      this.applyPreset("last_30");
    }
  }
  applyPreset(key) {
    const now = /* @__PURE__ */ new Date();
    let start;
    let end = new Date(now);
    switch (key) {
      case "today":
        start = new Date(now);
        break;
      case "this_week": {
        const day = now.getDay();
        start = new Date(now);
        start.setDate(now.getDate() - day);
        break;
      }
      case "this_month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "last_30":
        start = new Date(now);
        start.setDate(now.getDate() - 30);
        break;
      case "quarter": {
        const q = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), q * 3, 1);
        break;
      }
      case "year":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return;
    }
    this.from = this.fmt(start);
    this.to = this.fmt(end);
    this.activePreset = key;
    this.emit();
  }
  onFromChange(v) {
    this.from = v;
    this.activePreset = "custom";
    this.emit();
  }
  onToChange(v) {
    this.to = v;
    this.activePreset = "custom";
    this.emit();
  }
  emit() {
    if (this.from && this.to) {
      this.rangeChange.emit({ from: this.from, to: this.to });
    }
  }
  fmt(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }
  static {
    this.\u0275fac = function DateRangePickerComponent_Factory(t) {
      return new (t || _DateRangePickerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DateRangePickerComponent, selectors: [["app-date-range-picker"]], inputs: { from: "from", to: "to" }, outputs: { rangeChange: "rangeChange" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 2, consts: [[1, "drp"], [1, "presets"], [1, "preset", 3, "active"], [1, "inputs"], ["type", "date", 3, "ngModelChange", "ngModel"], [1, "preset", 3, "click"]], template: function DateRangePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275repeaterCreate(2, DateRangePickerComponent_For_3_Template, 2, 3, "button", 2, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3)(5, "label");
        \u0275\u0275text(6, " From ");
        \u0275\u0275elementStart(7, "input", 4);
        \u0275\u0275listener("ngModelChange", function DateRangePickerComponent_Template_input_ngModelChange_7_listener($event) {
          return ctx.onFromChange($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "label");
        \u0275\u0275text(9, " To ");
        \u0275\u0275elementStart(10, "input", 4);
        \u0275\u0275listener("ngModelChange", function DateRangePickerComponent_Template_input_ngModelChange_10_listener($event) {
          return ctx.onToChange($event);
        });
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.presets);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngModel", ctx.from);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngModel", ctx.to);
      }
    }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.drp[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  align-items: center;\n  padding: 10px 14px;\n  background: #0d0d1a;\n  border: 1px solid #2a2a3a;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n.presets[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.preset[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 11px;\n  letter-spacing: 0.4px;\n  transition: all 0.15s;\n}\n.preset[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.preset.active[_ngcontent-%COMP%] {\n  background: #d4af37;\n  color: #fff;\n  border-color: #d4af37;\n}\n.inputs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.inputs[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: 10px;\n  color: #888;\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n}\n.inputs[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 6px 8px;\n  border-radius: 4px;\n  font-family: inherit;\n  font-size: 12px;\n  margin-top: 3px;\n}\n.inputs[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n/*# sourceMappingURL=date-range-picker.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DateRangePickerComponent, { className: "DateRangePickerComponent", filePath: "src\\app\\pages\\admin\\finance\\date-range-picker.component.ts", lineNumber: 102 });
})();

// src/app/pages/admin/finance/revenue-report.component.ts
var _c0 = ["chartCanvas"];
var _forTrack02 = ($index, $item) => $item.source + $item.period_label;
function RevenueReportComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Loading revenue report\u2026");
    \u0275\u0275elementEnd();
  }
}
function RevenueReportComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx, "");
  }
}
function RevenueReportComponent_Conditional_23_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "No revenue in this period.");
    \u0275\u0275elementEnd();
  }
}
function RevenueReportComponent_Conditional_23_Conditional_43_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 25);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 26);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 25);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 6, row_r1.source));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r1.period_label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r1.count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 8, row_r1.gross, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 11, row_r1.vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 14, row_r1.net, "1.2-2"));
  }
}
function RevenueReportComponent_Conditional_23_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 21)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 22);
    \u0275\u0275text(8, "Count");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 22);
    \u0275\u0275text(10, "Gross (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 22);
    \u0275\u0275text(12, "VAT (SAR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 22);
    \u0275\u0275text(14, "Net (SAR)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, RevenueReportComponent_Conditional_23_Conditional_43_For_17_Template, 17, 17, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(p_r2.rows);
  }
}
function RevenueReportComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3, "Grand total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 12)(10, "div", 13);
    \u0275\u0275text(11, "Marketplace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 14);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 15);
    \u0275\u0275text(16, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 16)(18, "div", 13);
    \u0275\u0275text(19, "Subscriptions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 14);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 15);
    \u0275\u0275text(24, "SAR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 17)(26, "div", 13);
    \u0275\u0275text(27, "Sponsorships");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 14);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 15);
    \u0275\u0275text(32, "SAR");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 18)(34, "h3");
    \u0275\u0275text(35, "Daily revenue trend");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 19);
    \u0275\u0275element(37, "canvas", null, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 18)(40, "h3");
    \u0275\u0275text(41, "Monthly breakdown by source");
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, RevenueReportComponent_Conditional_23_Conditional_42_Template, 2, 0, "p", 20)(43, RevenueReportComponent_Conditional_23_Conditional_43_Template, 18, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 6, p_r2.totals.grand_total, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("SAR \xB7 ", p_r2.period.days, " days");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 9, p_r2.totals.marketplace, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 12, p_r2.totals.subscriptions, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(30, 15, p_r2.totals.sponsorships, "1.2-2"));
    \u0275\u0275advance(13);
    \u0275\u0275conditional(42, p_r2.rows.length === 0 ? 42 : 43);
  }
}
var RevenueReportComponent = class _RevenueReportComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.destroyRef = inject(DestroyRef);
    this.base = "http://192.168.100.67:8001/api/v1/admin/finance";
    this.CHART_JS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
    this.payload = signal(null);
    this.loading = signal(false);
    this.error = signal(null);
    this.range = signal({ from: "", to: "" });
    this.sources = signal({
      marketplace: true,
      subscriptions: true,
      sponsorships: true
    });
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadChartJs();
  }
  onRangeChange(range) {
    this.range.set(range);
    this.load();
  }
  toggleSource(key) {
    const cur = this.sources();
    this.sources.set(__spreadProps(__spreadValues({}, cur), { [key]: !cur[key] }));
    this.load();
  }
  load() {
    const r = this.range();
    if (!r.from || !r.to)
      return;
    this.loading.set(true);
    this.error.set(null);
    const srcList = Object.entries(this.sources()).filter(([, on]) => on).map(([k]) => k);
    let params = new HttpParams().set("from", r.from).set("to", r.to);
    for (const s of srcList)
      params = params.append("sources[]", s);
    this.http.get(`${this.base}/revenue`, { params }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.payload.set(res.data);
        this.loading.set(false);
        this.renderChart();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? "Failed to load revenue report.");
      }
    });
  }
  downloadPdf() {
    const r = this.range();
    const srcList = Object.entries(this.sources()).filter(([, on]) => on).map(([k]) => k);
    const params = new URLSearchParams({ from: r.from, to: r.to });
    srcList.forEach((s) => params.append("sources[]", s));
    const token = localStorage.getItem("dawri_token");
    if (token)
      params.set("token", token);
    window.open(`${this.base}/revenue.pdf?${params.toString()}`, "_blank");
  }
  downloadXlsx() {
    const r = this.range();
    const srcList = Object.entries(this.sources()).filter(([, on]) => on).map(([k]) => k);
    const params = new URLSearchParams({ from: r.from, to: r.to });
    srcList.forEach((s) => params.append("sources[]", s));
    const token = localStorage.getItem("dawri_token");
    if (token)
      params.set("token", token);
    window.open(`${this.base}/revenue.xlsx?${params.toString()}`, "_blank");
  }
  // ── Chart.js bootstrap ────────────────────────────────────────
  loadChartJs() {
    if (typeof Chart !== "undefined") {
      this.renderChart();
      return;
    }
    if (document.querySelector(`script[src="${this.CHART_JS_URL}"]`)) {
      const check = () => typeof Chart !== "undefined" ? this.renderChart() : setTimeout(check, 100);
      check();
      return;
    }
    const s = document.createElement("script");
    s.src = this.CHART_JS_URL;
    s.async = true;
    s.onload = () => this.renderChart();
    document.head.appendChild(s);
  }
  renderChart() {
    const p = this.payload();
    if (!p || !this.chartCanvas)
      return;
    const existing = Chart.getChart(this.chartCanvas.nativeElement);
    if (existing)
      existing.destroy();
    const datasets = [];
    const sources = this.sources();
    const colors = {
      marketplace: "#d4af37",
      subscriptions: "#fbbf24",
      sponsorships: "#38bdf8"
    };
    const labels = {
      marketplace: "Marketplace",
      subscriptions: "Subscriptions",
      sponsorships: "Sponsorships"
    };
    for (const key of ["marketplace", "subscriptions", "sponsorships"]) {
      if (!sources[key])
        continue;
      datasets.push({
        label: labels[key],
        data: p.daily_series[key],
        borderColor: colors[key],
        backgroundColor: colors[key] + "20",
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        borderWidth: 2
      });
    }
    new Chart(this.chartCanvas.nativeElement, {
      type: "line",
      data: { labels: p.daily_series.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#ccc", font: { size: 11 } } },
          tooltip: {
            backgroundColor: "#0a0a14",
            titleColor: "#fff",
            bodyColor: "#ccc",
            borderColor: "#2a2a3a",
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
  static {
    this.\u0275fac = function RevenueReportComponent_Factory(t) {
      return new (t || _RevenueReportComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RevenueReportComponent, selectors: [["app-revenue-report"]], viewQuery: function RevenueReportComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartCanvas = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 8, consts: [["chartCanvas", ""], [1, "revenue-report"], [3, "rangeChange"], [1, "toolbar"], [1, "left"], [1, "chk"], ["type", "checkbox", 3, "change", "checked"], [1, "right"], [1, "btn-download", 3, "click", "disabled"], [1, "loading"], [1, "error-box"], [1, "kpi-grid"], [1, "kpi-tile"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], [1, "kpi-tile", "amber"], [1, "kpi-tile", "cyan"], [1, "report-card"], [2, "position", "relative", "height", "240px"], [1, "empty"], [1, "data-table"], [1, "r"], [1, "strong"], [1, "mono"], [1, "r", "mono"], [1, "r", "mono", "muted"]], template: function RevenueReportComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "app-date-range-picker", 2);
        \u0275\u0275listener("rangeChange", function RevenueReportComponent_Template_app_date_range_picker_rangeChange_1_listener($event) {
          return ctx.onRangeChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "label", 5)(5, "input", 6);
        \u0275\u0275listener("change", function RevenueReportComponent_Template_input_change_5_listener() {
          return ctx.toggleSource("marketplace");
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span");
        \u0275\u0275text(7, "Marketplace");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "label", 5)(9, "input", 6);
        \u0275\u0275listener("change", function RevenueReportComponent_Template_input_change_9_listener() {
          return ctx.toggleSource("subscriptions");
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span");
        \u0275\u0275text(11, "Subscriptions");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "label", 5)(13, "input", 6);
        \u0275\u0275listener("change", function RevenueReportComponent_Template_input_change_13_listener() {
          return ctx.toggleSource("sponsorships");
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span");
        \u0275\u0275text(15, "Sponsorships");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "div", 7)(17, "button", 8);
        \u0275\u0275listener("click", function RevenueReportComponent_Template_button_click_17_listener() {
          return ctx.downloadPdf();
        });
        \u0275\u0275text(18, "\u{1F4C4} PDF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 8);
        \u0275\u0275listener("click", function RevenueReportComponent_Template_button_click_19_listener() {
          return ctx.downloadXlsx();
        });
        \u0275\u0275text(20, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(21, RevenueReportComponent_Conditional_21_Template, 2, 0, "p", 9)(22, RevenueReportComponent_Conditional_22_Template, 2, 1, "div", 10)(23, RevenueReportComponent_Conditional_23_Template, 44, 18);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_6_0;
        let tmp_7_0;
        \u0275\u0275advance(5);
        \u0275\u0275property("checked", ctx.sources().marketplace);
        \u0275\u0275advance(4);
        \u0275\u0275property("checked", ctx.sources().subscriptions);
        \u0275\u0275advance(4);
        \u0275\u0275property("checked", ctx.sources().sponsorships);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.payload());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.payload());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(21, ctx.loading() && !ctx.payload() ? 21 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(22, (tmp_6_0 = ctx.error()) ? 22 : -1, tmp_6_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(23, (tmp_7_0 = ctx.payload()) ? 23 : -1, tmp_7_0);
      }
    }, dependencies: [CommonModule, DecimalPipe, TitleCasePipe, FormsModule, DateRangePickerComponent], styles: ['@charset "UTF-8";\n\n\n\n.admin-finance[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 30px;\n  margin: 0;\n  letter-spacing: 1.3px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #888;\n  font-size: 12px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid #2a2a3a;\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #888;\n  padding: 10px 18px;\n  cursor: pointer;\n  font-size: 13px;\n  letter-spacing: 0.4px;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color 0.15s, border-color 0.15s;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: #ccc;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff;\n  border-bottom-color: #d4af37;\n}\n.report-card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 18px 20px;\n  margin-bottom: 16px;\n}\n.report-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 14px 0;\n  font-size: 14px;\n  color: #ddd;\n  font-weight: 600;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 14px;\n}\n.toolbar[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.toolbar[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-primary[_ngcontent-%COMP%], .btn-ghost[_ngcontent-%COMP%], .btn-download[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  padding: 7px 14px;\n  font-size: 12px;\n  cursor: pointer;\n  border: 1px solid #2a2a3a;\n  font-weight: 500;\n  transition: all 0.15s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  color: #1a1205;\n  border-color: #d4af37;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #c19f2e;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #aaa;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.btn-download[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  color: #d4af37;\n  border-color: #d4af37;\n}\n.btn-download[_ngcontent-%COMP%]:hover {\n  background: #d4af37;\n  color: #000;\n}\n.select[_ngcontent-%COMP%], .search-input[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 6px 10px;\n  border-radius: 5px;\n  font-size: 12px;\n  font-family: inherit;\n}\n.select[_ngcontent-%COMP%]:focus, .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.search-input[_ngcontent-%COMP%] {\n  min-width: 240px;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.kpi-tile[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 14px 16px;\n  position: relative;\n  overflow: hidden;\n}\n.kpi-tile[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #d4af37;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]::before {\n  background: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]::before {\n  background: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]::before {\n  background: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]::before {\n  background: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #888;\n  margin-bottom: 6px;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 22px;\n  font-weight: 700;\n  color: #d4af37;\n  line-height: 1;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-sub[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 10px;\n  color: #666;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 9px 10px;\n  border-bottom: 1px solid #2a2a3a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n  color: #888;\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 12px;\n  color: #ddd;\n}\n.data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td.strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.data-table[_ngcontent-%COMP%]   td.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.data-table[_ngcontent-%COMP%]   td.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.data-table[_ngcontent-%COMP%]   tr.total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.08);\n  font-weight: 700;\n  color: #fff;\n  border-top: 1px solid #3a3a4a;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n}\n.status-paid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #4ade80;\n}\n.status-draft[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #d1d5db;\n}\n.status-overdue[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #9ca3af;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  font-size: 13px;\n}\n.error-box[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  margin-bottom: 16px;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 0;\n  font-size: 12px;\n  color: #888;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1a1a2a;\n  color: #fff;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=finance.component.css.map */', ".chk[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 12px;\n    color: #ccc;\n    cursor: pointer;\n    user-select: none;\n    padding: 5px 10px;\n    border-radius: 4px;\n    &:hover { background: #1a1a2a; }\n    input { cursor: pointer; }\n  }"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RevenueReportComponent, { className: "RevenueReportComponent", filePath: "src\\app\\pages\\admin\\finance\\revenue-report.component.ts", lineNumber: 48 });
})();

// src/app/pages/admin/finance/invoice-register.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function InvoiceRegisterComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, "Loading invoices\u2026");
    \u0275\u0275elementEnd();
  }
}
function InvoiceRegisterComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx, "");
  }
}
function InvoiceRegisterComponent_Conditional_23_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "No invoices match the filters.");
    \u0275\u0275elementEnd();
  }
}
function InvoiceRegisterComponent_Conditional_23_Conditional_50_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 32);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 33);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275element(16, "br");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 34);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 35);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 36);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 33);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "td", 27)(32, "button", 37);
    \u0275\u0275listener("click", function InvoiceRegisterComponent_Conditional_23_Conditional_50_For_25_Template_button_click_32_listener() {
      const inv_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.downloadInvoicePdf(inv_r3.id));
    });
    \u0275\u0275text(33, " \u{1F4C4} PDF ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_18_0;
    const inv_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r3.invoice_number);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(inv_r3.user_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r3.user_email);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r3.statusClass(inv_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(inv_r3.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_18_0 = inv_r3.payment_method) !== null && tmp_18_0 !== void 0 ? tmp_18_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", inv_r3.period_start ? \u0275\u0275pipeBind2(15, 14, inv_r3.period_start, "mediumDate") : "\u2014", "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u2192 ", inv_r3.period_end ? \u0275\u0275pipeBind2(18, 17, inv_r3.period_end, "mediumDate") : "\u2014", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 20, inv_r3.subtotal, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(24, 23, inv_r3.vat_amount, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(27, 26, inv_r3.total, "1.2-2"), " ", inv_r3.currency, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", inv_r3.paid_at ? \u0275\u0275pipeBind2(30, 29, inv_r3.paid_at, "shortDate") : "\u2014", " ");
  }
}
function InvoiceRegisterComponent_Conditional_23_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Invoice #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Customer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Method");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 27);
    \u0275\u0275text(14, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 27);
    \u0275\u0275text(16, "VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 27);
    \u0275\u0275text(18, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 27);
    \u0275\u0275text(22, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "tbody");
    \u0275\u0275repeaterCreate(24, InvoiceRegisterComponent_Conditional_23_Conditional_50_For_25_Template, 34, 32, "tr", null, _forTrack03);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 28)(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div")(30, "button", 29);
    \u0275\u0275listener("click", function InvoiceRegisterComponent_Conditional_23_Conditional_50_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.page() - 1));
    });
    \u0275\u0275text(31, "\u2190 Prev");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 29);
    \u0275\u0275listener("click", function InvoiceRegisterComponent_Conditional_23_Conditional_50_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.page() + 1));
    });
    \u0275\u0275text(33, "Next \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(24);
    \u0275\u0275repeater(p_r5.data);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("Page ", p_r5.meta.page, " of ", ctx_r3.lastPage(), " \xB7 ", p_r5.meta.total, " invoices total");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.page() <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.page() >= ctx_r3.lastPage());
  }
}
function InvoiceRegisterComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "div", 17);
    \u0275\u0275text(3, "Invoices");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 19);
    \u0275\u0275text(7, "matching filters");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 20)(9, "div", 17);
    \u0275\u0275text(10, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 18);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 19);
    \u0275\u0275text(15, "SAR pre-VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 21)(17, "div", 17);
    \u0275\u0275text(18, "VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 18);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 19);
    \u0275\u0275text(23, "SAR tax");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 16)(25, "div", 17);
    \u0275\u0275text(26, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 18);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 19);
    \u0275\u0275text(31, "SAR inc. VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 22)(33, "div", 17);
    \u0275\u0275text(34, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 18);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 19);
    \u0275\u0275text(39, "SAR collected");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 23)(41, "div", 17);
    \u0275\u0275text(42, "Unpaid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 18);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 19);
    \u0275\u0275text(47, "SAR outstanding");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "div", 24);
    \u0275\u0275template(49, InvoiceRegisterComponent_Conditional_23_Conditional_49_Template, 2, 0, "p", 25)(50, InvoiceRegisterComponent_Conditional_23_Conditional_50_Template, 34, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r5.summary.count);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 7, p_r5.summary.subtotal, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 10, p_r5.summary.vat, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 13, p_r5.summary.total, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(37, 16, p_r5.summary.paid, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(45, 19, p_r5.summary.unpaid, "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(49, p_r5.data.length === 0 ? 49 : 50);
  }
}
var InvoiceRegisterComponent = class _InvoiceRegisterComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.destroyRef = inject(DestroyRef);
    this.base = "http://192.168.100.67:8001/api/v1/admin/finance";
    this.payload = signal(null);
    this.loading = signal(false);
    this.error = signal(null);
    this.range = signal({ from: "", to: "" });
    this.status = signal("all");
    this.search = signal("");
    this.page = signal(1);
    this.perPage = signal(20);
  }
  ngOnInit() {
  }
  onRangeChange(r) {
    this.range.set(r);
    this.page.set(1);
    this.load();
  }
  onStatusChange(v) {
    this.status.set(v);
    this.page.set(1);
    this.load();
  }
  onSearchChange(v) {
    this.search.set(v);
    this.page.set(1);
    this.load();
  }
  goToPage(p) {
    this.page.set(p);
    this.load();
  }
  load() {
    const r = this.range();
    if (!r.from || !r.to)
      return;
    this.loading.set(true);
    this.error.set(null);
    let params = new HttpParams().set("from", r.from).set("to", r.to).set("status", this.status()).set("page", String(this.page())).set("per_page", String(this.perPage()));
    if (this.search().trim())
      params = params.set("search", this.search().trim());
    this.http.get(`${this.base}/invoices`, { params }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.payload.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? "Failed to load invoices.");
      }
    });
  }
  downloadPdf() {
    const params = this.buildQueryString();
    window.open(`${this.base}/invoices.pdf?${params}`, "_blank");
  }
  downloadXlsx() {
    const params = this.buildQueryString();
    window.open(`${this.base}/invoices.xlsx?${params}`, "_blank");
  }
  buildQueryString() {
    const r = this.range();
    const qp = new URLSearchParams({
      from: r.from,
      to: r.to,
      status: this.status()
    });
    if (this.search().trim())
      qp.set("search", this.search().trim());
    const token = localStorage.getItem("dawri_token");
    if (token)
      qp.set("token", token);
    return qp.toString();
  }
  /**
   * Download a single invoice as PDF. Uses the token-in-query auth
   * pattern so the browser can open the URL in a new tab without a
   * bearer header.
   */
  downloadInvoicePdf(invoiceId) {
    const base = "http://192.168.100.67:8001/api/v1/admin/finance/invoices";
    const token = localStorage.getItem("dawri_token");
    const tokenParam = token ? `?token=${encodeURIComponent(token)}` : "";
    window.open(`${base}/${invoiceId}.pdf${tokenParam}`, "_blank");
  }
  // View helpers
  statusClass(status) {
    return `status-pill status-${status}`;
  }
  lastPage() {
    const p = this.payload();
    if (!p)
      return 1;
    return Math.max(1, Math.ceil(p.meta.total / p.meta.per_page));
  }
  static {
    this.\u0275fac = function InvoiceRegisterComponent_Factory(t) {
      return new (t || _InvoiceRegisterComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvoiceRegisterComponent, selectors: [["app-invoice-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 7, consts: [[1, "invoice-register"], [3, "rangeChange"], [1, "toolbar"], [1, "left"], [1, "select", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "paid"], ["value", "draft"], ["value", "overdue"], ["value", "cancelled"], ["type", "text", "placeholder", "Search invoice #, customer name, email\u2026", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "right"], [1, "btn-download", 3, "click", "disabled"], [1, "loading"], [1, "error-box"], [1, "kpi-grid"], [1, "kpi-tile"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], [1, "kpi-tile", "amber"], [1, "kpi-tile", "cyan"], [1, "kpi-tile", "green"], [1, "kpi-tile", "red"], [1, "report-card"], [1, "empty"], [1, "data-table"], [1, "r"], [1, "pagination"], [3, "click", "disabled"], [1, "mono"], [1, "strong"], [1, "muted", "small"], [1, "muted", "small", "mono"], [1, "r", "mono"], [1, "r", "mono", "muted"], [1, "r", "mono", "strong"], ["title", "Download invoice PDF", 1, "btn-download", 3, "click"]], template: function InvoiceRegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "app-date-range-picker", 1);
        \u0275\u0275listener("rangeChange", function InvoiceRegisterComponent_Template_app_date_range_picker_rangeChange_1_listener($event) {
          return ctx.onRangeChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "select", 4);
        \u0275\u0275listener("ngModelChange", function InvoiceRegisterComponent_Template_select_ngModelChange_4_listener($event) {
          return ctx.onStatusChange($event);
        });
        \u0275\u0275elementStart(5, "option", 5);
        \u0275\u0275text(6, "All statuses");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "option", 6);
        \u0275\u0275text(8, "Paid");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "option", 7);
        \u0275\u0275text(10, "Draft");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "option", 8);
        \u0275\u0275text(12, "Overdue");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "option", 9);
        \u0275\u0275text(14, "Cancelled");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "input", 10);
        \u0275\u0275listener("ngModelChange", function InvoiceRegisterComponent_Template_input_ngModelChange_15_listener($event) {
          return ctx.onSearchChange($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 11)(17, "button", 12);
        \u0275\u0275listener("click", function InvoiceRegisterComponent_Template_button_click_17_listener() {
          return ctx.downloadPdf();
        });
        \u0275\u0275text(18, "\u{1F4C4} PDF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "button", 12);
        \u0275\u0275listener("click", function InvoiceRegisterComponent_Template_button_click_19_listener() {
          return ctx.downloadXlsx();
        });
        \u0275\u0275text(20, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(21, InvoiceRegisterComponent_Conditional_21_Template, 2, 0, "p", 13)(22, InvoiceRegisterComponent_Conditional_22_Template, 2, 1, "div", 14)(23, InvoiceRegisterComponent_Conditional_23_Template, 51, 22);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_5_0;
        let tmp_6_0;
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.status());
        \u0275\u0275advance(11);
        \u0275\u0275property("ngModel", ctx.search());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.payload());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.payload());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(21, ctx.loading() && !ctx.payload() ? 21 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(22, (tmp_5_0 = ctx.error()) ? 22 : -1, tmp_5_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(23, (tmp_6_0 = ctx.payload()) ? 23 : -1, tmp_6_0);
      }
    }, dependencies: [CommonModule, DecimalPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DateRangePickerComponent], styles: ['@charset "UTF-8";\n\n\n\n.admin-finance[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 30px;\n  margin: 0;\n  letter-spacing: 1.3px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #888;\n  font-size: 12px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid #2a2a3a;\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #888;\n  padding: 10px 18px;\n  cursor: pointer;\n  font-size: 13px;\n  letter-spacing: 0.4px;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color 0.15s, border-color 0.15s;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: #ccc;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff;\n  border-bottom-color: #d4af37;\n}\n.report-card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 18px 20px;\n  margin-bottom: 16px;\n}\n.report-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 14px 0;\n  font-size: 14px;\n  color: #ddd;\n  font-weight: 600;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 14px;\n}\n.toolbar[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.toolbar[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-primary[_ngcontent-%COMP%], .btn-ghost[_ngcontent-%COMP%], .btn-download[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  padding: 7px 14px;\n  font-size: 12px;\n  cursor: pointer;\n  border: 1px solid #2a2a3a;\n  font-weight: 500;\n  transition: all 0.15s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  color: #1a1205;\n  border-color: #d4af37;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #c19f2e;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #aaa;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.btn-download[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  color: #d4af37;\n  border-color: #d4af37;\n}\n.btn-download[_ngcontent-%COMP%]:hover {\n  background: #d4af37;\n  color: #000;\n}\n.select[_ngcontent-%COMP%], .search-input[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 6px 10px;\n  border-radius: 5px;\n  font-size: 12px;\n  font-family: inherit;\n}\n.select[_ngcontent-%COMP%]:focus, .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.search-input[_ngcontent-%COMP%] {\n  min-width: 240px;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.kpi-tile[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 14px 16px;\n  position: relative;\n  overflow: hidden;\n}\n.kpi-tile[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #d4af37;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]::before {\n  background: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]::before {\n  background: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]::before {\n  background: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]::before {\n  background: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #888;\n  margin-bottom: 6px;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 22px;\n  font-weight: 700;\n  color: #d4af37;\n  line-height: 1;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-sub[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 10px;\n  color: #666;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 9px 10px;\n  border-bottom: 1px solid #2a2a3a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n  color: #888;\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 12px;\n  color: #ddd;\n}\n.data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td.strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.data-table[_ngcontent-%COMP%]   td.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.data-table[_ngcontent-%COMP%]   td.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.data-table[_ngcontent-%COMP%]   tr.total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.08);\n  font-weight: 700;\n  color: #fff;\n  border-top: 1px solid #3a3a4a;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n}\n.status-paid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #4ade80;\n}\n.status-draft[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #d1d5db;\n}\n.status-overdue[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #9ca3af;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  font-size: 13px;\n}\n.error-box[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  margin-bottom: 16px;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 0;\n  font-size: 12px;\n  color: #888;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1a1a2a;\n  color: #fff;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=finance.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvoiceRegisterComponent, { className: "InvoiceRegisterComponent", filePath: "src\\app\\pages\\admin\\finance\\invoice-register.component.ts", lineNumber: 53 });
})();

// src/app/pages/admin/finance/vat-report.component.ts
var _forTrack04 = ($index, $item) => $item.month;
var _forTrack1 = ($index, $item) => $item.invoice_number;
function VatReportComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Loading VAT report\u2026");
    \u0275\u0275elementEnd();
  }
}
function VatReportComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx, "");
  }
}
function VatReportComponent_Conditional_13_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "No VAT-bearing activity in this period.");
    \u0275\u0275elementEnd();
  }
}
function VatReportComponent_Conditional_13_Conditional_92_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 20);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 20);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 20);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(m_r1.month);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 4, m_r1.gross, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 7, m_r1.vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 10, m_r1.net, "1.2-2"));
  }
}
function VatReportComponent_Conditional_13_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 17)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Month");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 18);
    \u0275\u0275text(6, "Gross");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 18);
    \u0275\u0275text(8, "VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 18);
    \u0275\u0275text(10, "Net");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, VatReportComponent_Conditional_13_Conditional_92_For_13_Template, 12, 13, "tr", null, _forTrack04);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275repeater(p_r2.monthly);
  }
}
function VatReportComponent_Conditional_13_Conditional_93_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 20);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 20);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 25);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r3.invoice_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r3.customer);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r3.paid_at);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 6, line_r3.net, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 9, line_r3.vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 12, line_r3.gross, "1.2-2"));
  }
}
function VatReportComponent_Conditional_13_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "h3");
    \u0275\u0275text(2, "Invoice-level VAT detail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 17)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Invoice #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Customer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Paid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 18);
    \u0275\u0275text(13, "Net");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 18);
    \u0275\u0275text(15, "VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 18);
    \u0275\u0275text(17, "Gross");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, VatReportComponent_Conditional_13_Conditional_93_For_20_Template, 16, 15, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(p_r2.invoice_lines);
  }
}
function VatReportComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11);
    \u0275\u0275text(3, "Total gross");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 12);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 13);
    \u0275\u0275text(8, "SAR inc. VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 14)(10, "div", 11);
    \u0275\u0275text(11, "Total VAT (output)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 12);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 13);
    \u0275\u0275text(16, "SAR due to ZATCA");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 15)(18, "div", 11);
    \u0275\u0275text(19, "Total net");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 12);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 13);
    \u0275\u0275text(24, "SAR pre-VAT");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 16)(26, "h3");
    \u0275\u0275text(27, "Summary by source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "table", 17)(29, "thead")(30, "tr")(31, "th");
    \u0275\u0275text(32, "Source");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th", 18);
    \u0275\u0275text(34, "Gross");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "th", 18);
    \u0275\u0275text(36, "VAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "th", 18);
    \u0275\u0275text(38, "Net");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "tbody")(40, "tr")(41, "td", 19);
    \u0275\u0275text(42, "Invoices (subscriptions)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "td", 20);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "td", 20);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "td", 20);
    \u0275\u0275text(50);
    \u0275\u0275pipe(51, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "tr")(53, "td", 19);
    \u0275\u0275text(54, "Marketplace (digital orders)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "td", 20);
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "td", 20);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "td", 20);
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "tr")(65, "td", 19);
    \u0275\u0275text(66, "Sponsorships (cash)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "td", 20);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "td", 20);
    \u0275\u0275text(71);
    \u0275\u0275pipe(72, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "td", 20);
    \u0275\u0275text(74);
    \u0275\u0275pipe(75, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "tr", 21)(77, "td");
    \u0275\u0275text(78, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "td", 20);
    \u0275\u0275text(80);
    \u0275\u0275pipe(81, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "td", 20);
    \u0275\u0275text(83);
    \u0275\u0275pipe(84, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "td", 20);
    \u0275\u0275text(86);
    \u0275\u0275pipe(87, "number");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(88, "div", 16)(89, "h3");
    \u0275\u0275text(90, "Monthly breakdown");
    \u0275\u0275elementEnd();
    \u0275\u0275template(91, VatReportComponent_Conditional_13_Conditional_91_Template, 2, 0, "p", 22)(92, VatReportComponent_Conditional_13_Conditional_92_Template, 14, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(93, VatReportComponent_Conditional_13_Conditional_93_Template, 21, 0, "div", 16);
  }
  if (rf & 2) {
    const p_r2 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 17, p_r2.summary.total_gross, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 20, p_r2.summary.total_vat, "1.2-2"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 23, p_r2.summary.total_net, "1.2-2"));
    \u0275\u0275advance(23);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(45, 26, p_r2.summary.invoices_gross, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(48, 29, p_r2.summary.invoices_vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(51, 32, p_r2.summary.invoices_net, "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(57, 35, p_r2.summary.marketplace_gross, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(60, 38, p_r2.summary.marketplace_vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(63, 41, p_r2.summary.marketplace_net, "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(69, 44, p_r2.summary.sponsorships_gross, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(72, 47, p_r2.summary.sponsorships_vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(75, 50, p_r2.summary.sponsorships_net, "1.2-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(81, 53, p_r2.summary.total_gross, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(84, 56, p_r2.summary.total_vat, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(87, 59, p_r2.summary.total_net, "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(91, p_r2.monthly.length === 0 ? 91 : 92);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(93, p_r2.invoice_lines.length > 0 ? 93 : -1);
  }
}
var VatReportComponent = class _VatReportComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.destroyRef = inject(DestroyRef);
    this.base = "http://192.168.100.67:8001/api/v1/admin/finance";
    this.payload = signal(null);
    this.loading = signal(false);
    this.error = signal(null);
    this.range = signal({ from: "", to: "" });
  }
  ngOnInit() {
  }
  onRangeChange(r) {
    this.range.set(r);
    this.load();
  }
  load() {
    const r = this.range();
    if (!r.from || !r.to)
      return;
    this.loading.set(true);
    this.error.set(null);
    const params = new HttpParams().set("from", r.from).set("to", r.to);
    this.http.get(`${this.base}/vat`, { params }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.payload.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message ?? "Failed to load VAT report.");
      }
    });
  }
  downloadPdf() {
    const r = this.range();
    const token = localStorage.getItem("dawri_token");
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : "";
    window.open(`${this.base}/vat.pdf?from=${r.from}&to=${r.to}${tokenParam}`, "_blank");
  }
  downloadXlsx() {
    const r = this.range();
    const token = localStorage.getItem("dawri_token");
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : "";
    window.open(`${this.base}/vat.xlsx?from=${r.from}&to=${r.to}${tokenParam}`, "_blank");
  }
  vatPct() {
    const rate = this.payload()?.vat_rate ?? 0.15;
    return `${(rate * 100).toFixed(0)}%`;
  }
  static {
    this.\u0275fac = function VatReportComponent_Factory(t) {
      return new (t || _VatReportComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VatReportComponent, selectors: [["app-vat-report"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 6, consts: [[1, "vat-report"], [3, "rangeChange"], [1, "toolbar"], [1, "left"], [1, "muted", "small"], [1, "right"], [1, "btn-download", 3, "click", "disabled"], [1, "loading"], [1, "error-box"], [1, "kpi-grid"], [1, "kpi-tile"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], [1, "kpi-tile", "amber"], [1, "kpi-tile", "cyan"], [1, "report-card"], [1, "data-table"], [1, "r"], [1, "strong"], [1, "r", "mono"], [1, "total-row"], [1, "empty"], [1, "mono"], [1, "muted", "small", "mono"], [1, "r", "mono", "strong"]], template: function VatReportComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "app-date-range-picker", 1);
        \u0275\u0275listener("rangeChange", function VatReportComponent_Template_app_date_range_picker_rangeChange_1_listener($event) {
          return ctx.onRangeChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "span", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5)(7, "button", 6);
        \u0275\u0275listener("click", function VatReportComponent_Template_button_click_7_listener() {
          return ctx.downloadPdf();
        });
        \u0275\u0275text(8, "\u{1F4C4} PDF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 6);
        \u0275\u0275listener("click", function VatReportComponent_Template_button_click_9_listener() {
          return ctx.downloadXlsx();
        });
        \u0275\u0275text(10, "\u{1F4CA} Excel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(11, VatReportComponent_Conditional_11_Template, 2, 0, "p", 7)(12, VatReportComponent_Conditional_12_Template, 2, 1, "div", 8)(13, VatReportComponent_Conditional_13_Template, 94, 62);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_4_0;
        let tmp_5_0;
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" Saudi Arabia (ZATCA) \xB7 VAT rate ", ctx.vatPct(), " \xB7 VAT on marketplace/sponsorships derived from VAT-inclusive totals ");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.payload());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.payload());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(11, ctx.loading() && !ctx.payload() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(12, (tmp_4_0 = ctx.error()) ? 12 : -1, tmp_4_0);
        \u0275\u0275advance();
        \u0275\u0275conditional(13, (tmp_5_0 = ctx.payload()) ? 13 : -1, tmp_5_0);
      }
    }, dependencies: [CommonModule, DecimalPipe, DateRangePickerComponent], styles: ['@charset "UTF-8";\n\n\n\n.admin-finance[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 30px;\n  margin: 0;\n  letter-spacing: 1.3px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #888;\n  font-size: 12px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid #2a2a3a;\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #888;\n  padding: 10px 18px;\n  cursor: pointer;\n  font-size: 13px;\n  letter-spacing: 0.4px;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color 0.15s, border-color 0.15s;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: #ccc;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff;\n  border-bottom-color: #d4af37;\n}\n.report-card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 18px 20px;\n  margin-bottom: 16px;\n}\n.report-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 14px 0;\n  font-size: 14px;\n  color: #ddd;\n  font-weight: 600;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 14px;\n}\n.toolbar[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.toolbar[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-primary[_ngcontent-%COMP%], .btn-ghost[_ngcontent-%COMP%], .btn-download[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  padding: 7px 14px;\n  font-size: 12px;\n  cursor: pointer;\n  border: 1px solid #2a2a3a;\n  font-weight: 500;\n  transition: all 0.15s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  color: #1a1205;\n  border-color: #d4af37;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #c19f2e;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #aaa;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.btn-download[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  color: #d4af37;\n  border-color: #d4af37;\n}\n.btn-download[_ngcontent-%COMP%]:hover {\n  background: #d4af37;\n  color: #000;\n}\n.select[_ngcontent-%COMP%], .search-input[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 6px 10px;\n  border-radius: 5px;\n  font-size: 12px;\n  font-family: inherit;\n}\n.select[_ngcontent-%COMP%]:focus, .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.search-input[_ngcontent-%COMP%] {\n  min-width: 240px;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.kpi-tile[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 14px 16px;\n  position: relative;\n  overflow: hidden;\n}\n.kpi-tile[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #d4af37;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]::before {\n  background: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]::before {\n  background: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]::before {\n  background: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]::before {\n  background: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #888;\n  margin-bottom: 6px;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 22px;\n  font-weight: 700;\n  color: #d4af37;\n  line-height: 1;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-sub[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 10px;\n  color: #666;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 9px 10px;\n  border-bottom: 1px solid #2a2a3a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n  color: #888;\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 12px;\n  color: #ddd;\n}\n.data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td.strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.data-table[_ngcontent-%COMP%]   td.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.data-table[_ngcontent-%COMP%]   td.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.data-table[_ngcontent-%COMP%]   tr.total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.08);\n  font-weight: 700;\n  color: #fff;\n  border-top: 1px solid #3a3a4a;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n}\n.status-paid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #4ade80;\n}\n.status-draft[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #d1d5db;\n}\n.status-overdue[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #9ca3af;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  font-size: 13px;\n}\n.error-box[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  margin-bottom: 16px;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 0;\n  font-size: 12px;\n  color: #888;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1a1a2a;\n  color: #fff;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=finance.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VatReportComponent, { className: "VatReportComponent", filePath: "src\\app\\pages\\admin\\finance\\vat-report.component.ts", lineNumber: 41 });
})();

// src/app/pages/admin/finance/finance.component.ts
function FinanceComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-revenue-report");
  }
}
function FinanceComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-invoice-register");
  }
}
function FinanceComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-vat-report");
  }
}
var FinanceComponent = class _FinanceComponent {
  constructor() {
    this.tab = signal("revenue");
  }
  setTab(t) {
    this.tab.set(t);
  }
  static {
    this.\u0275fac = function FinanceComponent_Factory(t) {
      return new (t || _FinanceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinanceComponent, selectors: [["app-admin-finance"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 9, consts: [[1, "admin-finance"], [1, "page-header"], [1, "subtitle"], [1, "tabs"], [3, "click"]], template: function FinanceComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
        \u0275\u0275text(3, "Finance & Reports");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 2);
        \u0275\u0275text(5, "Revenue reporting, invoice register, and ZATCA-ready VAT breakdown");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "nav", 3)(7, "button", 4);
        \u0275\u0275listener("click", function FinanceComponent_Template_button_click_7_listener() {
          return ctx.setTab("revenue");
        });
        \u0275\u0275text(8, "Revenue");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 4);
        \u0275\u0275listener("click", function FinanceComponent_Template_button_click_9_listener() {
          return ctx.setTab("invoices");
        });
        \u0275\u0275text(10, "Invoices");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 4);
        \u0275\u0275listener("click", function FinanceComponent_Template_button_click_11_listener() {
          return ctx.setTab("vat");
        });
        \u0275\u0275text(12, "VAT");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, FinanceComponent_Conditional_13_Template, 1, 0, "app-revenue-report")(14, FinanceComponent_Conditional_14_Template, 1, 0, "app-invoice-register")(15, FinanceComponent_Conditional_15_Template, 1, 0, "app-vat-report");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275classProp("active", ctx.tab() === "revenue");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "invoices");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.tab() === "vat");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(13, ctx.tab() === "revenue" ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(14, ctx.tab() === "invoices" ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(15, ctx.tab() === "vat" ? 15 : -1);
      }
    }, dependencies: [
      CommonModule,
      RevenueReportComponent,
      InvoiceRegisterComponent,
      VatReportComponent
    ], styles: ['@charset "UTF-8";\n\n\n\n.admin-finance[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.75rem;\n  color: #fff;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: "Bebas Neue", sans-serif;\n  font-size: 30px;\n  margin: 0;\n  letter-spacing: 1.3px;\n}\n.admin-finance[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #888;\n  font-size: 12px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid #2a2a3a;\n  margin-bottom: 20px;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #888;\n  padding: 10px 18px;\n  cursor: pointer;\n  font-size: 13px;\n  letter-spacing: 0.4px;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color 0.15s, border-color 0.15s;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: #ccc;\n}\n.admin-finance[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff;\n  border-bottom-color: #d4af37;\n}\n.report-card[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 18px 20px;\n  margin-bottom: 16px;\n}\n.report-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 14px 0;\n  font-size: 14px;\n  color: #ddd;\n  font-weight: 600;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 14px;\n}\n.toolbar[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.toolbar[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-primary[_ngcontent-%COMP%], .btn-ghost[_ngcontent-%COMP%], .btn-download[_ngcontent-%COMP%] {\n  border-radius: 5px;\n  padding: 7px 14px;\n  font-size: 12px;\n  cursor: pointer;\n  border: 1px solid #2a2a3a;\n  font-weight: 500;\n  transition: all 0.15s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #d4af37;\n  color: #1a1205;\n  border-color: #d4af37;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #c19f2e;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #aaa;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: #1a1a2a;\n  color: #fff;\n}\n.btn-download[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  color: #d4af37;\n  border-color: #d4af37;\n}\n.btn-download[_ngcontent-%COMP%]:hover {\n  background: #d4af37;\n  color: #000;\n}\n.select[_ngcontent-%COMP%], .search-input[_ngcontent-%COMP%] {\n  background: #0d0d1a;\n  border: 1px solid #2a2a3a;\n  color: #fff;\n  padding: 6px 10px;\n  border-radius: 5px;\n  font-size: 12px;\n  font-family: inherit;\n}\n.select[_ngcontent-%COMP%]:focus, .search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #d4af37;\n}\n.search-input[_ngcontent-%COMP%] {\n  min-width: 240px;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.kpi-tile[_ngcontent-%COMP%] {\n  background: #111122;\n  border: 1px solid #2a2a3a;\n  border-radius: 10px;\n  padding: 14px 16px;\n  position: relative;\n  overflow: hidden;\n}\n.kpi-tile[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #d4af37;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]::before {\n  background: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]::before {\n  background: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]::before {\n  background: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]::before {\n  background: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  color: #888;\n  margin-bottom: 6px;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n  font-size: 22px;\n  font-weight: 700;\n  color: #d4af37;\n  line-height: 1;\n}\n.kpi-tile.amber[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #d4af37;\n}\n.kpi-tile.cyan[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #38bdf8;\n}\n.kpi-tile.green[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.kpi-tile.red[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.kpi-tile[_ngcontent-%COMP%]   .kpi-sub[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 10px;\n  color: #666;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 9px 10px;\n  border-bottom: 1px solid #2a2a3a;\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n  color: #888;\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   th.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px;\n  border-bottom: 1px solid #1a1a2a;\n  font-size: 12px;\n  color: #ddd;\n}\n.data-table[_ngcontent-%COMP%]   td.r[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td.strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.data-table[_ngcontent-%COMP%]   td.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.data-table[_ngcontent-%COMP%]   td.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\n.data-table[_ngcontent-%COMP%]   tr.total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.08);\n  font-weight: 700;\n  color: #fff;\n  border-top: 1px solid #3a3a4a;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.7px;\n}\n.status-paid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #4ade80;\n}\n.status-draft[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #d1d5db;\n}\n.status-overdue[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #fca5a5;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2);\n  color: #9ca3af;\n}\n.loading[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #666;\n  font-size: 13px;\n}\n.error-box[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 6px;\n  color: #fca5a5;\n  margin-bottom: 16px;\n}\n.muted[_ngcontent-%COMP%] {\n  color: #888;\n}\n.mono[_ngcontent-%COMP%] {\n  font-family: "Space Mono", monospace;\n}\n.small[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 0;\n  font-size: 12px;\n  color: #888;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #2a2a3a;\n  color: #aaa;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1a1a2a;\n  color: #fff;\n}\n.pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=finance.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinanceComponent, { className: "FinanceComponent", filePath: "src\\app\\pages\\admin\\finance\\finance.component.ts", lineNumber: 33 });
})();
export {
  FinanceComponent
};
//# sourceMappingURL=chunk-37UNATER.js.map
