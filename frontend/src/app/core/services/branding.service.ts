import { Injectable, inject, Renderer2, RendererFactory2 } from '@angular/core';

/**
 * Brand payload returned by the backend BrandingService.
 */
export interface BrandPayload {
  primary_color:    string;
  secondary_color:  string;
  accent_color:     string;
  background_color: string;
  font_family:      string;
  logo_url:         string | null;
  source:           'platform' | 'company' | 'tournament';
}

/**
 * Mapping from brand payload keys to the CSS custom properties already used
 * throughout Dawri's SCSS. Updating these vars live re-themes the page.
 */
const CSS_VAR_MAP: Record<keyof Omit<BrandPayload, 'logo_url' | 'source'>, string> = {
  primary_color:    '--gold',
  secondary_color:  '--cyan',
  accent_color:     '--green',
  background_color: '--bg',
  font_family:      '--fh',
};

const PLATFORM_DEFAULTS: BrandPayload = {
  primary_color:    '#f0a500',
  secondary_color:  '#00e5ff',
  accent_color:     '#22c55e',
  background_color: '#0b1022',
  font_family:      'Bebas Neue, Rajdhani, sans-serif',
  logo_url:         null,
  source:           'platform',
};

/**
 * BrandingService — applies per-page branding by overriding CSS custom
 * properties on the document root. Always call `reset()` when leaving a
 * branded page (component's ngOnDestroy) to restore the platform palette.
 *
 * This service is NOT route-aware by itself; callers drive it. That's
 * deliberate — it lets the tournament detail component apply its own
 * tournament's brand, and the company settings component preview the
 * company's brand, without either side needing router coupling.
 */
@Injectable({ providedIn: 'root' })
export class BrandingService {
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  /**
   * Apply a brand to the document root. Any null/empty values in the payload
   * are replaced with platform defaults before applying, so partial brands
   * degrade gracefully.
   */
  apply(brand: Partial<BrandPayload> | null | undefined): void {
    const merged: BrandPayload = { ...PLATFORM_DEFAULTS, ...this.nonEmpty(brand ?? {}) };
    const root = document.documentElement;

    for (const [key, cssVar] of Object.entries(CSS_VAR_MAP) as [keyof typeof CSS_VAR_MAP, string][]) {
      const val = merged[key];
      if (val) { this.renderer.setStyle(root, cssVar, val, 2); }
    }
  }

  /** Restore platform defaults — call from component teardown. */
  reset(): void {
    const root = document.documentElement;
    for (const cssVar of Object.values(CSS_VAR_MAP)) {
      this.renderer.removeStyle(root, cssVar, 2);
    }
  }

  /** Returns only properties whose value is truthy. */
  private nonEmpty<T extends object>(obj: T): Partial<T> {
    const out: Partial<T> = {};
    for (const [k, v] of Object.entries(obj) as [keyof T, T[keyof T]][]) {
      if (v !== null && v !== undefined && v !== '') { out[k] = v; }
    }
    return out;
  }
}
