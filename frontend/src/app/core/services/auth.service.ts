import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: string;
  name: string;
  nickname?: string | null;
  display_name?: string;
  email: string;
  role?: string;
  avatar?: string;
  avatar_url?: string | null;
  game_username?: string;
  subscription_plan?: string;
  phone_verified_at?: string;
  created_at?: string;
}

interface AuthResponse {
  data?: { user: AuthUser; token: string };
  token?: string;
  user?: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http   = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly base   = environment.apiUrl;

  readonly currentUser     = signal<AuthUser | null>(this.loadUser());
  readonly token           = signal<string | null>(this.loadToken());
  readonly walletBalance   = signal<number>(0);
  readonly isAuthenticated = computed(() => this.token() !== null);

  isLoggedIn(): boolean { return this.token() !== null; }
  isAdmin():    boolean { return this.currentUser()?.role === 'admin'; }
  getToken():   string | null { return this.token(); }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/auth/login`, { email, password }).pipe(
      tap(res => this.persist(res)),
      catchError(err => throwError(() => new Error(
        err.error?.message ?? err.error?.errors?.email?.[0] ?? 'Login failed.'
      ))),
    );
  }

  register(payload: {
    name: string; email: string; password: string;
    password_confirmation: string; phone?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/auth/register`, payload).pipe(
      tap(res => this.persist(res)),
      catchError(err => throwError(() => new Error(err.error?.message ?? 'Registration failed.'))),
    );
  }

  /**
   * Logout — calls API then clears local state.
   * If API fails (token already revoked), still clears local state.
   */
  logout(): void {
    const token = this.token();
    this.clearLocal(); // Clear immediately to prevent loops

    if (token) {
      this.http.post(`${this.base}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({ error: () => {} }); // Fire and forget
    }
  }

  /**
   * Clear local state WITHOUT making an API call.
   * Used by the interceptor on 401 to avoid logout loops.
   */
  clearLocal(): void {
    localStorage.removeItem('dawri_token');
    localStorage.removeItem('dawri_user');
    this.token.set(null);
    this.currentUser.set(null);
    this.walletBalance.set(0);
  }

  fetchMe(): Observable<{ data: AuthUser }> {
    return this.http.get<{ data: AuthUser }>(`${this.base}/auth/me`).pipe(
      tap(res => {
        this.currentUser.set(res.data);
        localStorage.setItem('dawri_user', JSON.stringify(res.data));
      }),
    );
  }

  setSession(token: string, user: AuthUser): void {
    localStorage.setItem('dawri_token', token);
    localStorage.setItem('dawri_user', JSON.stringify(user));
    this.token.set(token);
    this.currentUser.set(user);
  }

  updateUser(user: AuthUser): void {
    localStorage.setItem('dawri_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  updateBalance(balance: number): void { this.walletBalance.set(balance); }

  // ── Private ───────────────────────────────────────────────────────

  private persist(res: AuthResponse): void {
    const token = res?.data?.token ?? res?.token;
    const user  = res?.data?.user  ?? res?.user;
    if (token && user) {
      this.setSession(token, user);
    }
  }

  private loadToken(): string | null {
    return localStorage.getItem('dawri_token');
  }

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem('dawri_user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
}
