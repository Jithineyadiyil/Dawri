import {
  HttpClient,
  HttpParams,
  inject,
  ɵɵdefineInjectable
} from "./chunk-3NRO4OA5.js";

// src/app/core/services/api.service.ts
var API_BASE = "http://192.168.100.67:8001/api/v1";
var ApiService = class _ApiService {
  constructor() {
    this.http = inject(HttpClient);
  }
  // ── Auth ────────────────────────────────────────────────────────────────────
  login(payload) {
    return this.http.post(`${API_BASE}/auth/login`, payload);
  }
  register(payload) {
    return this.http.post(`${API_BASE}/auth/register`, payload);
  }
  logout() {
    return this.http.post(`${API_BASE}/auth/logout`, {});
  }
  sendOtp() {
    return this.http.post(`${API_BASE}/auth/otp/send`, {});
  }
  verifyOtp(otp) {
    return this.http.post(`${API_BASE}/auth/otp/verify`, { otp });
  }
  forgotPassword(email) {
    return this.http.post(`${API_BASE}/auth/password/forgot`, { email });
  }
  resetPassword(payload) {
    return this.http.post(`${API_BASE}/auth/password/reset`, payload);
  }
  // ── Dashboard ───────────────────────────────────────────────────────────────
  getDashboard() {
    return this.http.get(`${API_BASE}/dashboard`);
  }
  // ── Leaderboard ─────────────────────────────────────────────────────────────
  getLeaderboard(game, limit = 50) {
    const params = new HttpParams().set("game", game).set("limit", limit.toString());
    return this.http.get(`${API_BASE}/leaderboard`, { params });
  }
  // ── Games ───────────────────────────────────────────────────────────────────
  getGames() {
    return this.http.get(`${API_BASE}/games/active`);
  }
  // ── Profile ─────────────────────────────────────────────────────────────────
  getPlayerProfile(userId) {
    return this.http.get(`${API_BASE}/players/${userId}`);
  }
  getPlayerMatches(userId, opts = {}) {
    let params = new HttpParams();
    if (opts.limit)
      params = params.set("limit", opts.limit.toString());
    if (opts.page)
      params = params.set("page", opts.page.toString());
    return this.http.get(`${API_BASE}/players/${userId}/matches`, { params });
  }
  // ── Tournaments ─────────────────────────────────────────────────────────────
  getTournaments(filters = {}) {
    let params = new HttpParams();
    if (filters.status)
      params = params.set("status", filters.status);
    if (filters.format)
      params = params.set("format", filters.format);
    if (filters.game)
      params = params.set("game", filters.game);
    if (filters.search)
      params = params.set("search", filters.search);
    if (filters.page)
      params = params.set("page", filters.page.toString());
    return this.http.get(`${API_BASE}/tournaments`, { params });
  }
  getTournament(id) {
    return this.http.get(`${API_BASE}/tournaments/${id}`);
  }
  createTournament(payload) {
    return this.http.post(`${API_BASE}/tournaments`, payload);
  }
  updateTournament(id, payload) {
    return this.http.put(`${API_BASE}/tournaments/${id}`, payload);
  }
  deleteTournament(id) {
    return this.http.delete(`${API_BASE}/tournaments/${id}`);
  }
  generateBracket(id) {
    return this.http.post(`${API_BASE}/tournaments/${id}/generate-bracket`, {});
  }
  registerForTournament(id) {
    return this.http.post(`${API_BASE}/tournaments/${id}/register`, {});
  }
  /**
   * Sprint 3: Register for a tournament with explicit rules acceptance.
   *
   * @param id             Tournament UUID
   * @param acceptedRules  True if the user checked "I accept the rules"
   *                       in the registration modal. Backend stamps
   *                       tournament_participants.rules_accepted_at
   *                       with the current time when this is true.
   */
  registerForTournamentWithRules(id, acceptedRules) {
    return this.http.post(`${API_BASE}/tournaments/${id}/register`, { accept_rules: acceptedRules });
  }
  // ── Matches (Sprint 1) ─────────────────────────────────────────────────────
  /**
   * Submit match result.
   * Route: POST /tournaments/{tournamentId}/matches/{matchId}/result
   */
  submitResult(tournamentId, matchId, payload) {
    return this.http.post(`${API_BASE}/tournaments/${tournamentId}/matches/${matchId}/result`, payload);
  }
  confirmResult(matchId) {
    return this.http.post(`${API_BASE}/matches/${matchId}/confirm`, {});
  }
  disputeResult(matchId, reason) {
    return this.http.post(`${API_BASE}/matches/${matchId}/dispute`, { reason });
  }
  // ── Matches (Sprint 2 — scheduling) ────────────────────────────────────────
  /**
   * Organizer/admin directly sets the match schedule.
   * @param matchId     Target match UUID
   * @param scheduledAt ISO-8601 datetime (must be future)
   */
  scheduleMatch(matchId, scheduledAt) {
    return this.http.post(`${API_BASE}/matches/${matchId}/schedule`, { scheduled_at: scheduledAt });
  }
  /**
   * Set the live-stream URL for a match.
   *
   * Server validates Twitch/YouTube URL formats and returns the parsed
   * provider + identifier so the caller can refresh the embed without a
   * round-trip to GET /matches/{id}.
   *
   * @param matchId   Target match UUID.
   * @param streamUrl Raw URL pasted by the user (any Twitch channel or
   *                  YouTube live/watch URL). Server normalises before
   *                  storage, so the response.data.stream.canonical_url
   *                  may differ from what was sent.
   */
  setMatchStream(matchId, streamUrl) {
    return this.http.post(`${API_BASE}/matches/${matchId}/stream`, { stream_url: streamUrl });
  }
  /**
   * Clear the live-stream URL for a match.
   * Useful when the wrong URL was set or the stream has ended and the
   * embed should be removed from the modal.
   */
  clearMatchStream(matchId) {
    return this.http.delete(`${API_BASE}/matches/${matchId}/stream`);
  }
  /**
   * Participant proposes a new match time.
   * @param matchId     Target match UUID
   * @param proposedAt  ISO-8601 datetime (must be future)
   * @param reason      Optional rationale, max 500 chars
   */
  requestReschedule(matchId, proposedAt, reason) {
    return this.http.post(`${API_BASE}/matches/${matchId}/reschedule-requests`, { proposed_at: proposedAt, reason: reason || null });
  }
  /**
   * List all reschedule requests (pending + history) for a match.
   * Only participants / organizer / admin can view.
   */
  listReschedules(matchId) {
    return this.http.get(`${API_BASE}/matches/${matchId}/reschedule-requests`);
  }
  /**
   * Respond to a pending reschedule request.
   * @param action   'accept' | 'reject'
   * @param override If true AND the caller is organizer/admin, bypasses the
   *                 dual-acceptance rule.
   */
  respondReschedule(matchId, requestId, action, override = false) {
    return this.http.post(`${API_BASE}/matches/${matchId}/reschedule-requests/${requestId}/respond`, { action, override });
  }
  /** Requester cancels their own pending request. */
  cancelReschedule(matchId, requestId) {
    return this.http.delete(`${API_BASE}/matches/${matchId}/reschedule-requests/${requestId}`);
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
  uploadEvidence(matchId, file, caption) {
    const form = new FormData();
    form.append("file", file);
    if (caption) {
      form.append("caption", caption);
    }
    return this.http.post(`${API_BASE}/matches/${matchId}/evidence`, form);
  }
  /** List all evidence files on a match. */
  listEvidence(matchId) {
    return this.http.get(`${API_BASE}/matches/${matchId}/evidence`);
  }
  /** Delete one evidence file. Uploader or organizer only. */
  deleteEvidence(matchId, evidenceId) {
    return this.http.delete(`${API_BASE}/matches/${matchId}/evidence/${evidenceId}`);
  }
  // ── Marketplace ─────────────────────────────────────────────────────────────
  getProducts(category) {
    let params = new HttpParams();
    if (category)
      params = params.set("category", category);
    return this.http.get(`${API_BASE}/marketplace/products`, { params });
  }
  purchaseProduct(productId, quantity = 1) {
    return this.http.post(`${API_BASE}/marketplace/orders`, { product_id: productId, quantity });
  }
  /**
   * Sprint 5: batched checkout — single API call fulfils the whole cart.
   * Server uses `idempotency_key` to de-duplicate retries of the same attempt.
   */
  placeOrderBatch(payload) {
    return this.http.post(`${API_BASE}/marketplace/orders`, payload);
  }
  getOrders() {
    return this.http.get(`${API_BASE}/marketplace/orders`);
  }
  revealCode(orderId) {
    return this.http.post(`${API_BASE}/marketplace/orders/${orderId}/reveal`, {});
  }
  // ── Wallet ──────────────────────────────────────────────────────────────────
  getWallet() {
    return this.http.get(`${API_BASE}/wallet`);
  }
  topUpWallet(amount, paymentMethod, idempotencyKey) {
    return this.http.post(`${API_BASE}/wallet/topup`, { amount, payment_method: paymentMethod, idempotency_key: idempotencyKey });
  }
  // ── Subscription ────────────────────────────────────────────────────────────
  getSubscriptionPlans() {
    return this.http.get(`${API_BASE}/subscription/plans`);
  }
  getSubscription() {
    return this.http.get(`${API_BASE}/subscription`);
  }
  subscribeToPlan(planKey) {
    return this.http.post(`${API_BASE}/subscription`, { plan: planKey });
  }
  changeSubscriptionPlan(planKey) {
    return this.http.put(`${API_BASE}/subscription`, { plan: planKey });
  }
  cancelSubscription() {
    return this.http.delete(`${API_BASE}/subscription`);
  }
  getInvoices() {
    return this.http.get(`${API_BASE}/subscription/invoices`);
  }
  // ── Challonge Features ──────────────────────────────────────────────────────
  shuffleSeeds(id) {
    return this.http.post(`${API_BASE}/tournaments/${id}/shuffle-seeds`, {}, { headers: this.authHeaders() });
  }
  substituteParticipant(tournamentId, participantId, payload) {
    return this.http.patch(`${API_BASE}/tournaments/${tournamentId}/participants/${participantId}/substitute`, payload, { headers: this.authHeaders() });
  }
  submitPrediction(tournamentId, matchId, predictedWinnerId) {
    return this.http.post(`${API_BASE}/tournaments/${tournamentId}/predictions`, { match_id: matchId, predicted_winner_id: predictedWinnerId }, { headers: this.authHeaders() });
  }
  getMyPredictions(tournamentId) {
    return this.http.get(`${API_BASE}/tournaments/${tournamentId}/predictions`, { headers: this.authHeaders() });
  }
  getPredictionLeaderboard(tournamentId) {
    return this.http.get(`${API_BASE}/tournaments/${tournamentId}/predictions/leaderboard`);
  }
  getAdPlacements(type) {
    return this.http.get(`${API_BASE}/ad-placements?type=${type}`);
  }
  trackAdClick(id) {
    this.http.post(`${API_BASE}/ad-placements/${id}/click`, {}).subscribe();
  }
  unregisterFromTournament(id) {
    return this.http.delete(`${API_BASE}/tournaments/${id}/register`, { headers: this.authHeaders() });
  }
  authHeaders() {
    const token = localStorage.getItem("dawri_token") ?? "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  // ── End Challonge Features ────────────────────────────────────────────────
  // ── Admin Ad Placements ───────────────────────────────────────────────────
  uploadAdImage(file) {
    const fd = new FormData();
    fd.append("image", file);
    return this.http.post(`${API_BASE}/admin/ad-placements/upload-image`, fd, { headers: this.authHeaders() });
  }
  adminGetAdPlacements() {
    return this.http.get(`${API_BASE}/admin/ad-placements`, { headers: this.authHeaders() });
  }
  adminCreateAdPlacement(payload) {
    return this.http.post(`${API_BASE}/admin/ad-placements`, payload, { headers: this.authHeaders() });
  }
  adminUpdateAdPlacement(id, payload) {
    return this.http.put(`${API_BASE}/admin/ad-placements/${id}`, payload, { headers: this.authHeaders() });
  }
  adminDeleteAdPlacement(id) {
    return this.http.delete(`${API_BASE}/admin/ad-placements/${id}`, { headers: this.authHeaders() });
  }
  adminToggleAdPlacement(id) {
    return this.http.post(`${API_BASE}/admin/ad-placements/${id}/toggle`, {}, { headers: this.authHeaders() });
  }
  adminGetAdStats() {
    return this.http.get(`${API_BASE}/admin/ad-placements/stats`, { headers: this.authHeaders() });
  }
  // ── Notifications ────────────────────────────────────────────────────────
  getNotifications(page = 1) {
    return this.http.get(`${API_BASE}/notifications?page=${page}`, { headers: this.authHeaders() });
  }
  getUnreadCount() {
    return this.http.get(`${API_BASE}/notifications/unread-count`, { headers: this.authHeaders() });
  }
  markNotificationRead(id) {
    return this.http.post(`${API_BASE}/notifications/${id}/read`, {}, { headers: this.authHeaders() });
  }
  markAllNotificationsRead() {
    return this.http.post(`${API_BASE}/notifications/read-all`, {}, { headers: this.authHeaders() });
  }
  deleteNotification(id) {
    return this.http.delete(`${API_BASE}/notifications/${id}`, { headers: this.authHeaders() });
  }
  getAdPlacementsForTournament(tournamentId) {
    return this.http.get(`${API_BASE}/ad-placements?type=tournament_banner&tournament_id=${tournamentId}`);
  }
  // ── YouTube Live Streaming ────────────────────────────────────────────────
  updateTournamentStream(tournamentId, watchUrl) {
    return this.http.patch(`${API_BASE}/tournaments/${tournamentId}/stream-url`, { youtube_stream_url: watchUrl }, { headers: this.authHeaders() });
  }
  getTournamentBroadcast(tournamentId) {
    return this.http.get(`${API_BASE}/tournaments/${tournamentId}/broadcast/active`, { headers: this.authHeaders() });
  }
  createYouTubeStream(tournamentId, title) {
    return this.http.post(`${API_BASE}/tournaments/${tournamentId}/broadcast`, { title, privacy: "unlisted" }, { headers: this.authHeaders() });
  }
  endYouTubeStream(broadcastId) {
    return this.http.post(`${API_BASE}/broadcasts/${broadcastId}/complete`, {}, { headers: this.authHeaders() });
  }
  getYouTubeStreamStatus(broadcastId) {
    return this.http.get(`${API_BASE}/broadcasts/${broadcastId}`, { headers: this.authHeaders() });
  }
  getStreamKey(broadcastId) {
    return this.http.get(`${API_BASE}/broadcasts/${broadcastId}/credentials`, { headers: this.authHeaders() });
  }
  getStreamInfo(tournamentId) {
    return this.http.get(`${API_BASE}/tournaments/${tournamentId}/stream-info`);
  }
  shuffleTournamentSeeds(tournamentId) {
    return this.http.post(`${API_BASE}/tournaments/${tournamentId}/shuffle-seeds`, {}, { headers: this.authHeaders() });
  }
  saveBracketPredictions(tournamentId, predictions) {
    return this.http.post(`${API_BASE}/tournaments/${tournamentId}/predictions`, { predictions }, { headers: this.authHeaders() });
  }
  static {
    this.\u0275fac = function ApiService_Factory(t) {
      return new (t || _ApiService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  ApiService
};
//# sourceMappingURL=chunk-XKV56PBS.js.map
