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
  organizer_id?: string;
  participants?: TournamentParticipant[];
  matches?: TournamentMatch[];
  bracket?: BracketData | null;
  created_at: string;
  updated_at: string;

  // Sprint 3 additions
  cover_image_url?: string | null;
  logo_url?: string | null;
  rules?: string | null;
  has_rules?: boolean;
  brand_override?: boolean;
  brand?: BrandPayload;
  company_id?: string | null;
  company?: { id: string; name: string; logo_url: string | null } | null;
  my_participant?: { id: string; rules_accepted_at: string | null } | null;
  is_full?: boolean;
}

// ─── Sprint 3: Branding ───────────────────────────────────────────────────────

export interface BrandPayload {
  primary_color:    string;
  secondary_color:  string;
  accent_color:     string;
  background_color: string;
  font_family:      string;
  logo_url:         string | null;
  source:           'platform' | 'company' | 'tournament';
}

export interface CompanyBranding {
  id:                string;
  name:              string;
  name_ar:           string | null;
  logo_url:          string | null;
  primary_color:     string | null;
  secondary_color:   string | null;
  accent_color:      string | null;
  background_color:  string | null;
  font_family:       string | null;
  has_branding:      boolean;
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

// ─── Sprint 2: Match Scheduling & Evidence ────────────────────────────────────

export interface MatchRescheduleRequest {
  id: string;
  match_id: string;
  requested_by: { id: string; name: string | null };
  proposed_at: string;
  reason: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'overridden';
  responded_by?: { id: string; name: string | null };
  responded_at: string | null;
  was_organizer_override: boolean;
  is_pending: boolean;
  created_at: string;
}

export interface MatchEvidence {
  id: string;
  match_id: string;
  uploaded_by: { id: string; name: string | null };
  file_type: 'image' | 'video';
  file_mime: string;
  file_size: number | null;
  url: string;
  caption: string | null;
  created_at: string;
}

// ── TournamentMatch extended for Sprint 2 ─────────────────────────────────────
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

  // Sprint 2 additions — may be undefined on older cached payloads.
  scheduled_at?: string | null;
  scheduled_by_id?: string | null;
  pending_reschedule?: MatchRescheduleRequest | null;
  evidence_count?: number;
  dispute_reason?: string | null;
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

  // ── Matches (Sprint 1) ─────────────────────────────────────────────────────
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
      `${API_BASE}/tournaments/${tournamentId}/matches/${matchId}/result`, payload
    );
  }
  confirmResult(matchId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/matches/${matchId}/confirm`, {});
  }
  disputeResult(matchId: string, reason: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_BASE}/matches/${matchId}/dispute`, { reason });
  }

  // ── Matches (Sprint 2 — scheduling) ────────────────────────────────────────

  /**
   * Organizer/admin directly sets the match schedule.
   * @param matchId     Target match UUID
   * @param scheduledAt ISO-8601 datetime (must be future)
   */
  scheduleMatch(matchId: string, scheduledAt: string): Observable<{ message: string; data: any }> {
    return this.http.post<{ message: string; data: any }>(
      `${API_BASE}/matches/${matchId}/schedule`, { scheduled_at: scheduledAt }
    );
  }

  /**
   * Participant proposes a new match time.
   * @param matchId     Target match UUID
   * @param proposedAt  ISO-8601 datetime (must be future)
   * @param reason      Optional rationale, max 500 chars
   */
  requestReschedule(
    matchId: string,
    proposedAt: string,
    reason?: string,
  ): Observable<{ data: MatchRescheduleRequest }> {
    return this.http.post<{ data: MatchRescheduleRequest }>(
      `${API_BASE}/matches/${matchId}/reschedule-requests`,
      { proposed_at: proposedAt, reason: reason || null },
    );
  }

  /**
   * List all reschedule requests (pending + history) for a match.
   * Only participants / organizer / admin can view.
   */
  listReschedules(matchId: string): Observable<{ data: MatchRescheduleRequest[] }> {
    return this.http.get<{ data: MatchRescheduleRequest[] }>(
      `${API_BASE}/matches/${matchId}/reschedule-requests`,
    );
  }

  /**
   * Respond to a pending reschedule request.
   * @param action   'accept' | 'reject'
   * @param override If true AND the caller is organizer/admin, bypasses the
   *                 dual-acceptance rule.
   */
  respondReschedule(
    matchId: string,
    requestId: string,
    action: 'accept' | 'reject',
    override = false,
  ): Observable<{ data: MatchRescheduleRequest }> {
    return this.http.post<{ data: MatchRescheduleRequest }>(
      `${API_BASE}/matches/${matchId}/reschedule-requests/${requestId}/respond`,
      { action, override },
    );
  }

  /** Requester cancels their own pending request. */
  cancelReschedule(matchId: string, requestId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${API_BASE}/matches/${matchId}/reschedule-requests/${requestId}`,
    );
  }

  // ── Matches (Sprint 2 — evidence) ──────────────────────────────────────────

  /**
   * Upload an evidence file (screenshot or video clip).
   * Multipart/form-data POST.
   *
   * @param matchId Target match UUID
   * @param file    The file blob (≤5MB image, ≤50MB video)
   * @param caption Optional caption, max 255 chars
   */
  uploadEvidence(
    matchId: string,
    file: File,
    caption?: string,
  ): Observable<{ data: MatchEvidence }> {
    const form = new FormData();
    form.append('file', file);
    if (caption) { form.append('caption', caption); }
    return this.http.post<{ data: MatchEvidence }>(
      `${API_BASE}/matches/${matchId}/evidence`, form,
    );
  }

  /** List all evidence files on a match. */
  listEvidence(matchId: string): Observable<{ data: MatchEvidence[] }> {
    return this.http.get<{ data: MatchEvidence[] }>(
      `${API_BASE}/matches/${matchId}/evidence`,
    );
  }

  /** Delete one evidence file. Uploader or organizer only. */
  deleteEvidence(matchId: string, evidenceId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${API_BASE}/matches/${matchId}/evidence/${evidenceId}`,
    );
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

  // ── Sprint 3: Tournament cover / rules / branding ──────────────────────────

  /** Register with rules acceptance flag (Sprint 3 extension). */
  registerForTournamentWithRules(id: string, acceptRules: boolean):
    Observable<{ message: string; participants_count: number; participant_id: string }> {
    return this.http.post<{ message: string; participants_count: number; participant_id: string }>(
      `${API_BASE}/tournaments/${id}/register`, { accept_rules: acceptRules },
    );
  }

  uploadTournamentCover(id: string, file: File): Observable<{ message: string; cover_image_url: string }> {
    const form = new FormData(); form.append('file', file);
    return this.http.post<{ message: string; cover_image_url: string }>(
      `${API_BASE}/tournaments/${id}/cover`, form,
    );
  }

  deleteTournamentCover(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_BASE}/tournaments/${id}/cover`);
  }

  updateTournamentBranding(id: string, payload: Partial<{
    brand_override: boolean;
    primary_color: string | null;
    secondary_color: string | null;
    accent_color: string | null;
    background_color: string | null;
    font_family: string | null;
    logo_url: string | null;
  }>): Observable<{ message: string; brand: BrandPayload }> {
    return this.http.patch<{ message: string; brand: BrandPayload }>(
      `${API_BASE}/tournaments/${id}/brand`, payload,
    );
  }

  // ── Sprint 3: Company branding ─────────────────────────────────────────────

  getMyCompany(): Observable<{ data: CompanyBranding | null }> {
    return this.http.get<{ data: CompanyBranding | null }>(`${API_BASE}/companies/mine`);
  }

  updateCompanyBranding(payload: Partial<CompanyBranding>):
    Observable<{ message: string; data: CompanyBranding }> {
    return this.http.patch<{ message: string; data: CompanyBranding }>(
      `${API_BASE}/companies/mine/brand`, payload,
    );
  }

  uploadCompanyLogo(file: File): Observable<{ message: string; logo_url: string }> {
    const form = new FormData(); form.append('file', file);
    return this.http.post<{ message: string; logo_url: string }>(
      `${API_BASE}/companies/mine/logo`, form,
    );
  }
}
