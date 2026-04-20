import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:8001/api/v1';

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
  links: { first: string; last: string; prev: string | null; next: string | null };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginPayload    { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; password_confirmation: string; phone?: string; }
export interface AuthResponse    { token: string; user: User; }
export interface OtpResponse     { message: string; }

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'admin' | 'organizer' | 'player';
  avatar_url: string | null;
  phone_verified_at: string | null;
  created_at: string;
}

export interface PlayerProfile {
  id: string;
  user: User;
  bio: string | null;
  country: string | null;
  games: string[];
  wins: number;
  losses: number;
  tournaments_played: number;
  ranking_points: number;
}

export interface PlayerMatch {
  id: string;
  tournament_name: string;
  opponent_name: string;
  result: 'win' | 'loss' | 'bye';
  score1: number | null;
  score2: number | null;
  played_at: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardData {
  upcoming_matches: TournamentMatch[];
  active_tournaments: Tournament[];
  recent_results: PlayerMatch[];
  wallet_balance: number;
  ranking_points: number;
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  name: string;
  avatar_url: string | null;
  points: number;
  wins: number;
  losses: number;
  game: string;
}

// ─── Games ───────────────────────────────────────────────────────────────────

export interface Game {
  id: string;
  key: string;
  name: string;
  name_ar: string | null;
  icon_emoji: string | null;
  platform: string | null;
  is_active: boolean;
}

// ─── Tournaments ──────────────────────────────────────────────────────────────

export interface Tournament {
  id: string;
  name: string;
  name_ar: string | null;
  game: string;
  game_label: string;
  format: string;
  format_label: string;
  status: string;
  status_label: string;
  starts_at: string | null;
  registration_closes_at: string | null;
  timezone: string;
  max_participants: number;
  participant_count: number;
  participants_count: number;
  is_registration_open: boolean;
  is_registered: boolean;
  entry_fee_sar: number;
  prize_pool: any;
  swiss_rounds: number | null;
  organizer: { id: string; name: string } | null;
  participants?: TournamentParticipant[];
  matches?: TournamentMatch[];
  bracket?: BracketData | null;
  created_at: string;
  updated_at: string;
}

export interface BracketData {
  status: string;
  current_round: number;
  total_rounds: number;
  matches: TournamentMatch[];
  winner: { id: string; name: string } | null;
}

export interface TournamentParticipant {
  id: string;
  user_id: string;
  seed: number;
  wins: number;
  losses: number;
  points: number;
  buchholz: number;
  name: string;
}

export interface TournamentMatch {
  id: string;
  round_number: number;
  match_number: number;
  bracket_section: string;
  status: string;
  score_a: number | null;
  score_b: number | null;
  participant_a_is_bye: boolean;
  participant_b_is_bye: boolean;
  winner_id: string | null;
  next_match_id: string | null;
  participant_a: { id: string; name: string } | null;
  participant_b: { id: string; name: string } | null;
  winner: { id: string; name: string } | null;
}

export interface TournamentFilters {
  status?: string;
  format?: string;
  game?: string;
  search?: string;
  page?: number;
}

// ─── Marketplace ──────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  name_ar: string | null;
  brand: string;
  category: string;
  face_value: number;
  currency: string;
  our_price: number;
  region: string;
  image_url: string | null;
  is_active: boolean;
}

export interface Order {
  id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  code?: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  created_at: string;
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export interface SubscriptionPlan {
  key: string;
  name: string;
  price_monthly: number;
  price_annually: number;
  currency: string;
  features: string[];
}

export interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired' | 'trialing';
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'unpaid' | 'void';
  invoice_url: string | null;
  created_at: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // ── Auth ────────────────────────────────────────────────────────────────────

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE}/auth/register`, payload);
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/auth/logout`, {});
  }

  sendOtp(): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${API_BASE}/auth/otp/send`, {});
  }

  verifyOtp(otp: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${API_BASE}/auth/otp/verify`, { otp });
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────

  getDashboard(): Observable<{ data: DashboardData }> {
    return this.http.get<{ data: DashboardData }>(`${API_BASE}/dashboard`);
  }

  // ── Leaderboard ─────────────────────────────────────────────────────────────

  getLeaderboard(game: string, limit = 50): Observable<{ data: LeaderboardEntry[] }> {
    const params = new HttpParams().set('game', game).set('limit', limit.toString());
    return this.http.get<{ data: LeaderboardEntry[] }>(`${API_BASE}/leaderboard`, { params });
  }

  // ── Games ───────────────────────────────────────────────────────────────────

  getGames(): Observable<{ data: Game[] }> {
    return this.http.get<{ data: Game[] }>(`${API_BASE}/games/active`);
  }

  // ── Profile ─────────────────────────────────────────────────────────────────

  getPlayerProfile(userId: string): Observable<{ data: PlayerProfile }> {
    return this.http.get<{ data: PlayerProfile }>(`${API_BASE}/players/${userId}`);
  }

  getPlayerMatches(
    userId: string,
    opts: { limit?: number; page?: number } = {}
  ): Observable<PaginatedResponse<PlayerMatch>> {
    let params = new HttpParams();
    if (opts.limit) params = params.set('limit', opts.limit.toString());
    if (opts.page)  params = params.set('page',  opts.page.toString());
    return this.http.get<PaginatedResponse<PlayerMatch>>(`${API_BASE}/players/${userId}/matches`, { params });
  }

  // ── Tournaments ─────────────────────────────────────────────────────────────

  getTournaments(filters: TournamentFilters = {}): Observable<PaginatedResponse<Tournament>> {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.format) params = params.set('format', filters.format);
    if (filters.game)   params = params.set('game',   filters.game);
    if (filters.search) params = params.set('search', filters.search);
    if (filters.page)   params = params.set('page',   filters.page.toString());
    return this.http.get<PaginatedResponse<Tournament>>(`${API_BASE}/tournaments`, { params });
  }

  getTournament(id: string): Observable<{ data: Tournament }> {
    return this.http.get<{ data: Tournament }>(`${API_BASE}/tournaments/${id}`);
  }

  createTournament(payload: any): Observable<{ data: Tournament }> {
    return this.http.post<{ data: Tournament }>(`${API_BASE}/tournaments`, payload);
  }

  updateTournament(id: string, payload: any): Observable<{ data: Tournament }> {
    return this.http.put<{ data: Tournament }>(`${API_BASE}/tournaments/${id}`, payload);
  }

  deleteTournament(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/tournaments/${id}`);
  }

  generateBracket(id: string): Observable<{ message: string; tournament: Tournament }> {
    return this.http.post<{ message: string; tournament: Tournament }>(
      `${API_BASE}/tournaments/${id}/generate-bracket`, {}
    );
  }

  registerForTournament(id: string): Observable<{ message: string; participants_count: number }> {
    return this.http.post<{ message: string; participants_count: number }>(
      `${API_BASE}/tournaments/${id}/register`, {}
    );
  }

  /**
   * Submit match result.
   * Route: POST /tournaments/{tournamentId}/matches/{matchId}/result
   */
  submitResult(
    tournamentId: string,
    matchId: string,
    payload: { winner_participant_id: string; score_a?: number | null; score_b?: number | null }
  ): Observable<{ message: string; data: any }> {
    return this.http.post<{ message: string; data: any }>(
      `${API_BASE}/tournaments/${tournamentId}/matches/${matchId}/result`,
      payload
    );
  }

  confirmResult(matchId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/matches/${matchId}/confirm`, {});
  }

  disputeResult(matchId: string, reason: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/matches/${matchId}/dispute`, { reason });
  }

  // ── Marketplace ─────────────────────────────────────────────────────────────

  getProducts(category?: string): Observable<PaginatedResponse<Product>> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    return this.http.get<PaginatedResponse<Product>>(`${API_BASE}/marketplace/products`, { params });
  }

  purchaseProduct(productId: string, quantity = 1): Observable<{ data: Order }> {
    return this.http.post<{ data: Order }>(`${API_BASE}/marketplace/orders`, { product_id: productId, quantity });
  }

  getOrders(): Observable<PaginatedResponse<Order>> {
    return this.http.get<PaginatedResponse<Order>>(`${API_BASE}/marketplace/orders`);
  }

  revealCode(orderId: string): Observable<{ code: string }> {
    return this.http.post<{ code: string }>(`${API_BASE}/marketplace/orders/${orderId}/reveal`, {});
  }

  // ── Wallet ──────────────────────────────────────────────────────────────────

  getWallet(): Observable<{ data: Wallet }> {
    return this.http.get<{ data: Wallet }>(`${API_BASE}/wallet`);
  }

  topUpWallet(amount: number, paymentMethod: string): Observable<{ message: string; redirect_url?: string }> {
    return this.http.post<{ message: string; redirect_url?: string }>(
      `${API_BASE}/wallet/topup`, { amount, payment_method: paymentMethod }
    );
  }

  // ── Subscription ────────────────────────────────────────────────────────────

  getSubscriptionPlans(): Observable<{ data: SubscriptionPlan[] }> {
    return this.http.get<{ data: SubscriptionPlan[] }>(`${API_BASE}/subscription/plans`);
  }

  getSubscription(): Observable<{ data: Subscription | null }> {
    return this.http.get<{ data: Subscription | null }>(`${API_BASE}/subscription`);
  }

  subscribeToPlan(planKey: string): Observable<{ message: string; subscription: Subscription }> {
    return this.http.post<{ message: string; subscription: Subscription }>(
      `${API_BASE}/subscription`, { plan: planKey }
    );
  }

  changeSubscriptionPlan(planKey: string): Observable<{ message: string; subscription: Subscription }> {
    return this.http.put<{ message: string; subscription: Subscription }>(
      `${API_BASE}/subscription`, { plan: planKey }
    );
  }

  cancelSubscription(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_BASE}/subscription`);
  }

  getInvoices(): Observable<PaginatedResponse<Invoice>> {
    return this.http.get<PaginatedResponse<Invoice>>(`${API_BASE}/subscription/invoices`);
  }
}
