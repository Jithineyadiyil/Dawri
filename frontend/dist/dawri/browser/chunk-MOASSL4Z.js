import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/core/services/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this.toasts = signal([]);
    this.next = 0;
  }
  success(msg) {
    this.add("success", msg);
  }
  error(msg) {
    this.add("error", msg);
  }
  info(msg) {
    this.add("info", msg);
  }
  warning(msg) {
    this.add("warning", msg);
  }
  dismiss(id) {
    this.toasts.update((ts) => ts.filter((t) => t.id !== id));
  }
  add(type, message) {
    const id = ++this.next;
    this.toasts.update((ts) => [...ts, { id, type, message }]);
    setTimeout(() => this.dismiss(id), 4e3);
  }
  static {
    this.\u0275fac = function ToastService_Factory(t) {
      return new (t || _ToastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};

export {
  ToastService
};
//# sourceMappingURL=chunk-MOASSL4Z.js.map
