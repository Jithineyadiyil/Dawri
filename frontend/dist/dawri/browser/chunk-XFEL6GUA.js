import {
  RendererFactory2,
  inject,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";
import {
  __spreadValues
} from "./chunk-7XEFWCRO.js";

// src/app/core/services/branding.service.ts
var CSS_VAR_MAP = {
  primary_color: "--gold",
  secondary_color: "--cyan",
  accent_color: "--green",
  background_color: "--bg",
  font_family: "--fh"
};
var PLATFORM_DEFAULTS = {
  primary_color: "#f0a500",
  secondary_color: "#00e5ff",
  accent_color: "#22c55e",
  background_color: "#0b1022",
  font_family: "Bebas Neue, Rajdhani, sans-serif",
  logo_url: null,
  source: "platform"
};
var BrandingService = class _BrandingService {
  constructor() {
    this.renderer = inject(RendererFactory2).createRenderer(null, null);
  }
  /**
   * Apply a brand to the document root. Any null/empty values in the payload
   * are replaced with platform defaults before applying, so partial brands
   * degrade gracefully.
   */
  apply(brand) {
    const merged = __spreadValues(__spreadValues({}, PLATFORM_DEFAULTS), this.nonEmpty(brand ?? {}));
    const root = document.documentElement;
    for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
      const val = merged[key];
      if (val) {
        this.renderer.setStyle(root, cssVar, val, 2);
      }
    }
  }
  /** Restore platform defaults — call from component teardown. */
  reset() {
    const root = document.documentElement;
    for (const cssVar of Object.values(CSS_VAR_MAP)) {
      this.renderer.removeStyle(root, cssVar, 2);
    }
  }
  /** Returns only properties whose value is truthy. */
  nonEmpty(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v !== null && v !== void 0 && v !== "") {
        out[k] = v;
      }
    }
    return out;
  }
  static {
    this.\u0275fac = function BrandingService_Factory(t) {
      return new (t || _BrandingService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BrandingService, factory: _BrandingService.\u0275fac, providedIn: "root" });
  }
};

export {
  BrandingService
};
//# sourceMappingURL=chunk-XFEL6GUA.js.map
