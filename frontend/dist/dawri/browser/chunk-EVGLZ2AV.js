import {
  environment
} from "./chunk-OERRWE4S.js";
import {
  Router
} from "./chunk-ZNMMCWK4.js";
import {
  HttpClient,
  catchError,
  computed,
  inject,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClient);
    this.router = inject(Router);
    this.base = environment.apiUrl;
    this.currentUser = signal(this.loadUser());
    this.token = signal(this.loadToken());
    this.walletBalance = signal(0);
    this.isAuthenticated = computed(() => this.token() !== null);
  }
  isLoggedIn() {
    return this.token() !== null;
  }
  isAdmin() {
    return this.currentUser()?.role === "admin";
  }
  getToken() {
    return this.token();
  }
  login(email, password) {
    return this.http.post(`${this.base}/auth/login`, { email, password }).pipe(tap((res) => this.persist(res)), catchError((err) => throwError(() => new Error(err.error?.message ?? err.error?.errors?.email?.[0] ?? "Login failed."))));
  }
  register(payload) {
    return this.http.post(`${this.base}/auth/register`, payload).pipe(tap((res) => this.persist(res)), catchError((err) => throwError(() => new Error(err.error?.message ?? "Registration failed."))));
  }
  /**
   * Logout — calls API then clears local state.
   * If API fails (token already revoked), still clears local state.
   */
  logout() {
    const token = this.token();
    this.clearLocal();
    if (token) {
      this.http.post(`${this.base}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({ error: () => {
      } });
    }
  }
  /**
   * Clear local state WITHOUT making an API call.
   * Used by the interceptor on 401 to avoid logout loops.
   */
  clearLocal() {
    localStorage.removeItem("dawri_token");
    localStorage.removeItem("dawri_user");
    this.token.set(null);
    this.currentUser.set(null);
    this.walletBalance.set(0);
  }
  fetchMe() {
    return this.http.get(`${this.base}/auth/me`).pipe(tap((res) => {
      this.currentUser.set(res.data);
      localStorage.setItem("dawri_user", JSON.stringify(res.data));
    }));
  }
  setSession(token, user) {
    localStorage.setItem("dawri_token", token);
    localStorage.setItem("dawri_user", JSON.stringify(user));
    this.token.set(token);
    this.currentUser.set(user);
  }
  updateUser(user) {
    localStorage.setItem("dawri_user", JSON.stringify(user));
    this.currentUser.set(user);
  }
  updateBalance(balance) {
    this.walletBalance.set(balance);
  }
  // ── Private ───────────────────────────────────────────────────────
  persist(res) {
    const token = res?.data?.token ?? res?.token;
    const user = res?.data?.user ?? res?.user;
    if (token && user) {
      this.setSession(token, user);
    }
  }
  loadToken() {
    return localStorage.getItem("dawri_token");
  }
  loadUser() {
    const raw = localStorage.getItem("dawri_user");
    if (!raw)
      return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-EVGLZ2AV.js.map
