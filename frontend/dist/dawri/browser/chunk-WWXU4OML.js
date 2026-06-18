import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/features/social/challenge-ui.service.ts
var ChallengeUiService = class _ChallengeUiService {
  constructor() {
    this.createFor = signal(null);
  }
  open(user) {
    this.createFor.set(user);
  }
  close() {
    this.createFor.set(null);
  }
  static {
    this.\u0275fac = function ChallengeUiService_Factory(t) {
      return new (t || _ChallengeUiService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChallengeUiService, factory: _ChallengeUiService.\u0275fac, providedIn: "root" });
  }
};

export {
  ChallengeUiService
};
//# sourceMappingURL=chunk-WWXU4OML.js.map
