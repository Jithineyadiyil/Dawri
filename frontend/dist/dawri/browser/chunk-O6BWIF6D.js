import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  HttpClient,
  Observable,
  inject,
  shareReplay,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/components/platform-sponsors-strip/platform-sponsor.service.ts
var PlatformSponsorService = class _PlatformSponsorService {
  constructor() {
    this.http = inject(HttpClient);
    this.base = environment.apiUrl;
    this.cache$ = null;
    this.latest = signal(null);
  }
  load() {
    if (!this.cache$) {
      this.cache$ = this.http.get(`${this.base}/platform-sponsors`).pipe(
        // Map the response down to the inner shape
        (src) => new Observable((observer) => {
          return src.subscribe({
            next: (r) => observer.next(r.data),
            error: (e) => observer.error(e),
            complete: () => observer.complete()
          });
        }),
        tap((d) => this.latest.set(d)),
        shareReplay(1)
      );
    }
    return this.cache$;
  }
  refresh() {
    this.cache$ = null;
    return this.load();
  }
  static {
    this.\u0275fac = function PlatformSponsorService_Factory(t) {
      return new (t || _PlatformSponsorService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlatformSponsorService, factory: _PlatformSponsorService.\u0275fac, providedIn: "root" });
  }
};

export {
  PlatformSponsorService
};
//# sourceMappingURL=chunk-O6BWIF6D.js.map
