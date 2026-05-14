import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy,
  inject, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ApiService, MatchEvidence, MatchRescheduleRequest } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { BrandingService } from '../../core/services/branding.service';
import { ToastService } from '../../core/services/toast.service';
import { TournamentSponsorsComponent } from '../../shared/tournament-sponsors/tournament-sponsors.component';
import { TournamentSponsorsManageComponent } from '../../shared/tournament-sponsors-manage/tournament-sponsors-manage.component';
import { StreamEmbedComponent } from '../../shared/components/stream-embed/stream-embed.component';

/**
 * Bracket match shape used by the template. Sprint 2 adds scheduling and
 * evidence fields so the modal can render the schedule / reschedule /
 * evidence sub-sections without extra round trips to the API for simple
 * reads.
 */
export interface BracketMatch {
  id: string;
  round_number: number;
  match_number: number;
  bracket_section: string;
  status: string;
  participant_a: { id: string; name: string; display_name?: string | null; nickname?: string | null; avatar_url?: string | null; user_id?: string | null } | null;
  participant_b: { id: string; name: string; display_name?: string | null; nickname?: string | null; avatar_url?: string | null; user_id?: string | null } | null;
  participant_a_is_bye: boolean;
  participant_b_is_bye: boolean;
  winner_id: string | null;
  score_a: number | null;
  score_b: number | null;
  dispute_reason: string | null;
  next_match_id: string | null;

  // Sprint 2
  scheduled_at?: string | null;
  scheduled_by_id?: string | null;
  pending_reschedule?: MatchRescheduleRequest | null;
  evidence_count?: number;

  // Sprint: live streaming (Option A)
  // Canonical Twitch/YouTube URL (server-validated). null = no stream.
  // Frontend renders an embed when present and shows an editor for
  // organizers/participants when modify permission is granted.
  stream_url?: string | null;
}

export interface BracketRound {
  num: number;
  label: string;
  section: string;
  matches: BracketMatch[];
  slotHeight: number;
}

@Component({
  selector: 'app-tournament-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, TournamentSponsorsComponent, TournamentSponsorsManageComponent, StreamEmbedComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss'],
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly api   = inject(ApiService);
  readonly auth          = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly fb    = inject(FormBuilder);
  private readonly brand = inject(BrandingService);

  // ── Top-level page state ─────────────────────────────────────────────
  readonly tournament    = signal<any>(null);
  readonly loading       = signal(true);
  readonly error         = signal<string | null>(null);
  readonly generating    = signal(false);
  readonly registering     = signal(false);
  readonly unregistering   = signal(false);
  readonly activeTab       = signal<'bracket' | 'standings' | 'matches' | 'live' | 'leaderboard' | 'prize' | 'players'>('bracket');
  readonly countdown       = signal<{ days: number; hours: number; mins: number; secs: number } | null>(null);
  readonly selectedRound   = signal<number>(1);
  readonly playerSearch    = signal('');
  readonly linkCopied      = signal(false);
  private countdownHandle: ReturnType<typeof setInterval> | null = null;
  readonly submitting    = signal(false);
  readonly selectedMatch = signal<BracketMatch | null>(null);
  readonly disputeMode   = signal(false);

  // ── Sprint 3 state ───────────────────────────────────────────────────
  readonly rulesExpanded   = signal(false);
  readonly showRegisterModal = signal(false);
  readonly acceptedRules   = signal(false);

  // Prize edit modal
  readonly showPrizeEditor = signal(false);
  readonly savingPrizes    = signal(false);
  readonly prizeForm       = this.fb.group({
    prize_1: [''],
    prize_2: [''],
    prize_3: [''],
  });

  /** True when the logged-in user can edit this tournament (organizer or admin). */
  readonly canEditTournament = computed(() => {
    const u = this.auth.currentUser();
    const t = this.tournament();
    if (!u || !t) return false;
    return u.role === 'admin' || u.id === (t as any).organizer_id;
  });

  /** Open the prize editor modal pre-populated from current normalizedPrizes. */
  openPrizeEditor(): void {
    const prizes = this.normalizedPrizes();
    this.prizeForm.reset({
      prize_1: prizes.find(p => p.position === 1)?.reward ?? '',
      prize_2: prizes.find(p => p.position === 2)?.reward ?? '',
      prize_3: prizes.find(p => p.position === 3)?.reward ?? '',
    });
    this.showPrizeEditor.set(true);
  }

  /** Save prizes via PUT /tournaments/{id}. */
  savePrizes(): void {
    const v = this.prizeForm.value;
    const pool: Array<{ position: number; reward: string }> = [];
    if (v.prize_1?.trim()) pool.push({ position: 1, reward: v.prize_1.trim() });
    if (v.prize_2?.trim()) pool.push({ position: 2, reward: v.prize_2.trim() });
    if (v.prize_3?.trim()) pool.push({ position: 3, reward: v.prize_3.trim() });

    this.savingPrizes.set(true);
    this.api.updateTournament(this.tournament()?.id, {
      prize_pool: pool.length ? pool : null,
    }).subscribe({
      next: (res: any) => {
        // Merge the fresh tournament into the signal so normalizedPrizes updates.
        const current = this.tournament();
        this.tournament.set({ ...current, prize_pool: pool.length ? pool : null });
        this.savingPrizes.set(false);
        this.showPrizeEditor.set(false);
        this.toast.success('Prizes saved.');
      },
      error: (err: any) => {
        this.savingPrizes.set(false);
        this.toast.error(err.error?.message ?? 'Failed to save prizes.');
      },
    });
  }

  /**
   * Normalized prize list. Handles all observed shapes:
   *   • null / undefined                        → []
   *   • array of { position, reward } (canonical)
   *   • array of primitives (e.g. ["100 SAR"])  → wraps to {position, reward}
   *   • JSON-encoded string (cast not applied)  → parses then recurses
   *   • single object                           → wraps in array
   *
   * Always returns an array of objects with `position` and `reward` fields.
   */
  readonly normalizedPrizes = computed<Array<{ position: number; reward: string }>>(() => {
    const raw = this.tournament()?.prize_pool;
    if (!raw) return [];

    // JSON string → parse
    let arr: any = raw;
    if (typeof raw === 'string') {
      try { arr = JSON.parse(raw); } catch { return []; }
    }

    // Single object → wrap
    if (!Array.isArray(arr) && typeof arr === 'object') { arr = [arr]; }
    if (!Array.isArray(arr)) return [];

    return arr.map((item: any, idx: number) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return { position: idx + 1, reward: String(item) };
      }
      return {
        position: Number(item?.position ?? item?.place ?? idx + 1),
        reward:   String(item?.reward ?? item?.prize ?? item?.value ?? ''),
      };
    }).filter((p: { position: number; reward: string }) => p.reward.trim().length > 0);
  });

  // ── Sprint 2 modal state ─────────────────────────────────────────────
  readonly showScheduleEditor    = signal(false);
  readonly showRescheduleForm    = signal(false);
  readonly rescheduleRequests    = signal<MatchRescheduleRequest[]>([]);
  readonly evidenceList          = signal<MatchEvidence[]>([]);
  readonly loadingMatchDetails   = signal(false);
  readonly uploadingEvidence     = signal(false);

  // ── Stream editor state (Sprint: live streaming Option A) ────────────
  // Modal-local UI state. The actual stream URL lives on the match
  // (m.stream_url); these signals only control the editor's open/closed
  // and saving state.
  readonly showStreamEditor      = signal(false);
  readonly savingStream          = signal(false);

  // ── Forms ────────────────────────────────────────────────────────────
  readonly resultForm = this.fb.group({
    winner_participant_id: ['', Validators.required],
    score_a: [null as number | null],
    score_b: [null as number | null],
  });

  readonly disputeForm = this.fb.group({
    reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  readonly scheduleForm = this.fb.group({
    scheduled_at: ['', Validators.required],
  });

  readonly rescheduleForm = this.fb.group({
    proposed_at: ['', Validators.required],
    reason:      ['', Validators.maxLength(500)],
  });

  readonly evidenceForm = this.fb.group({
    caption: ['', Validators.maxLength(255)],
  });
  readonly evidenceFile = signal<File | null>(null);

  /**
   * Stream URL editor form. The URL is validated server-side too — this
   * client-side check is just for early UX feedback (disable submit when
   * empty / clearly malformed). 500-char max matches the DB column.
   */
  readonly streamForm = this.fb.group({
    stream_url: ['', [Validators.required, Validators.maxLength(500)]],
  });

  // ── Computed ─────────────────────────────────────────────────────────
  readonly rounds = computed<BracketRound[]>(() => {
    const t = this.tournament();
    if (!t) return [];
    const matches: BracketMatch[] = t?.bracket?.matches ?? t?.matches ?? [];
    if (!matches.length) return [];
    const format: string = t.format ?? 'single_elimination';
    const map = new Map<string, BracketMatch[]>();
    for (const m of matches) {
      const key = `${m.bracket_section ?? 'winners'}::${m.round_number}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    }
    const MATCH_H = 88;
    const GAP     = 20;   // MUST match $slot-gap in tournament-detail.component.scss
    const sorted = [...map.entries()].sort((a, b) => {
      const [secA, rA] = a[0].split('::');
      const [secB, rB] = b[0].split('::');
      const secOrder: Record<string, number> = { winners: 0, swiss: 0, round_robin: 0, losers: 1, grand_final: 2 };
      const sO = (secOrder[secA] ?? 0) - (secOrder[secB] ?? 0);
      return sO !== 0 ? sO : parseInt(rA) - parseInt(rB);
    });
    return sorted.map(([key, ms], idx) => {
      const [section, rn] = key.split('::');
      const roundNum = parseInt(rn);
      let slotHeight: number;
      if (format === 'single_elimination' || (format === 'double_elimination' && section === 'winners')) {
        slotHeight = (MATCH_H + GAP) * Math.pow(2, idx) - GAP;
      } else {
        // Swiss / Round Robin: no artificial slot height — CSS gap handles spacing
        slotHeight = 0;
      }
      const totalRounds = t?.bracket?.total_rounds ?? sorted.length;
      return {
        num: roundNum,
        label: this.roundLabel(section, roundNum, totalRounds, format),
        section,
        matches: ms.sort((a, b) => a.match_number - b.match_number),
        slotHeight,
      };
    });
  });

  readonly leaderboard = computed(() => {
    const t = this.tournament();
    if (!t?.participants?.length) return [];
    return [...t.participants]
      .sort((a: any, b: any) => b.wins - a.wins || b.points - a.points || a.losses - b.losses)
      .map((p: any, i: number) => ({
        rank: i + 1,
        name: p.name ?? '—',
        display_name: p.display_name ?? p.name ?? '—',
        avatar_url: p.avatar_url ?? null,
        seed: p.seed,
        wins: p.wins ?? 0, losses: p.losses ?? 0,
        points: p.points ?? 0, buchholz: p.buchholz ?? 0,
      }));
  });

  // ── Bracket layout helpers (Sprint: Swiss standings + rounds filter) ──
  //
  // Flat-format = no tree structure, every round is its own independent
  // column. Swiss and round-robin behave this way. For these formats
  // we surface a standings table at the top of the Bracket tab and
  // allow the user to filter the columns to a single round.
  //
  // Tree formats (single_elimination, double_elimination) keep the
  // existing column-with-`]`-connectors rendering — adding a standings
  // table there would be redundant since the tree itself shows progression.

  /**
   * True when the tournament's format is column-based with no tree
   * connections between rounds. Drives both the standings-table
   * visibility and the round-filter chip availability.
   */
  readonly isFlatFormat = computed(() => {
    const fmt = this.tournament()?.format ?? '';
    return fmt === 'swiss' || fmt === 'round_robin';
  });

  /**
   * True when the leaderboard's #1 player has clearly clinched the
   * tournament — used to drive the "Champion" banner. Same logic as
   * the existing winner-of-final detection but works for Swiss too,
   * where there's no single "final match" to look at.
   */
  readonly clearChampion = computed(() => {
    const lb = this.leaderboard();
    if (lb.length < 2) return null;
    const t = this.tournament();
    if (t?.status !== 'completed') return null;
    return lb[0];
  });

  // ── Matches list (Sprint: list view) ─────────────────────────────────
  // The Matches tab presents a flat, vertically scrollable list of every
  // match in the tournament — easier to scan for "what's next?" or "show
  // all completed matches" than the wide bracket diagram. Filterable by
  // status group; reuses the same modal as the bracket view.

  /**
   * Status filter for the Matches tab. 'all' shows everything.
   * Buckets are coarse on purpose: distinguishing 'pending' from 'scheduled'
   * adds noise without value to a casual viewer.
   */
  readonly matchesFilter = signal<'all' | 'upcoming' | 'live' | 'completed'>('all');

  /**
   * Match buckets for the filter — kept stable so we can read counts cheaply.
   *
   * upcoming  = pending, scheduled       (no result yet, action TBD)
   * live      = ongoing, submitted, disputed  (in flight, may need attention)
   * completed = completed, walkover      (final, read-only)
   */
  private readonly MATCH_BUCKETS = {
    upcoming:  ['pending', 'scheduled'],
    live:      ['ongoing', 'submitted', 'disputed'],
    completed: ['completed', 'walkover'],
  } as const;

  /**
   * Flat list of matches to render under the Matches tab, respecting the
   * current filter. Order: by round number (then by match_number within
   * a round) so the list reads chronologically from earliest to final.
   * BYE-only "matches" are excluded — they aren't real matchups and just
   * clutter the list.
   */
  readonly matchesList = computed<BracketMatch[]>(() => {
    const t = this.tournament();
    const all: BracketMatch[] = t?.bracket?.matches ?? t?.matches ?? [];
    const filter = this.matchesFilter();
    // Cast through ReadonlyArray<string> so .includes() accepts any
    // m.status string. The `as const` on MATCH_BUCKETS narrows entries
    // to literal-only tuples, which is too strict for filter-by-string.
    const allowed: ReadonlyArray<string> | null =
      filter === 'all' ? null : this.MATCH_BUCKETS[filter];
    return all
      .filter(m => !m.participant_a_is_bye && !m.participant_b_is_bye)
      .filter(m => !allowed || allowed.includes(m.status))
      .sort((a, b) => (a.round_number - b.round_number) || (a.match_number - b.match_number));
  });

  /**
   * Counts per filter bucket — surfaced next to the chip labels so users
   * see "Live (3)" instead of clicking blindly.
   */
  readonly matchCounts = computed(() => {
    const t = this.tournament();
    const all: BracketMatch[] = t?.bracket?.matches ?? t?.matches ?? [];
    const real = all.filter(m => !m.participant_a_is_bye && !m.participant_b_is_bye);
    const inBucket = (bucket: ReadonlyArray<string>) =>
      real.filter(m => bucket.includes(m.status)).length;
    return {
      all:       real.length,
      upcoming:  inBucket(this.MATCH_BUCKETS.upcoming),
      live:      inBucket(this.MATCH_BUCKETS.live),
      completed: inBucket(this.MATCH_BUCKETS.completed),
    };
  });

  // ── Streams aggregator (Sprint: tournament Streams tab) ────────────
  // Shows ALL matches that have a stream URL set, regardless of status.
  // Renamed from "Live" → "Streams" because the tab now includes:
  //   - LIVE       (ongoing/submitted matches)     — red pulsing badge
  //   - STARTING   (scheduled within +2hr)         — blue dot
  //   - REPLAY     (completed/walkover matches)    — grey badge
  //   - SCHEDULED  (scheduled, not yet near time)  — neutral
  //
  // Sort: live first, then starting-soon, then scheduled, then replays
  // (most recent replays first). Spectators care most about live > soon
  // > replays, so the visual ordering matches the urgency of the content.
  //
  // Layout: uniform thumbnail grid for all stream counts. Earlier
  // implementation switched between live-iframe mode (≤4) and thumbnail
  // mode (5+), but the layout shift was jarring and even a single
  // embedded stream took too much vertical space at desktop widths.
  // Always-thumbnails gives a consistent grid and lets the page load
  // light — iframes only spin up when the user clicks one.

  /**
   * Time-of-day buckets for visual labelling — derived per-match in
   * streamCategory() rather than precomputed because tournament view
   * may live for hours and we want labels to update naturally.
   */
  private readonly STARTING_SOON_MS = 2 * 60 * 60 * 1000; // +2 hours

  /**
   * All matches with a stream URL set, sorted by category priority
   * then by time. This is what the Streams tab renders.
   *
   * Excludes BYE-only "matches" since they have no real participants
   * and no real stream context.
   */
  readonly liveStreams = computed<BracketMatch[]>(() => {
    const t = this.tournament();
    const all: BracketMatch[] = t?.bracket?.matches ?? t?.matches ?? [];

    return all
      .filter(m => !m.participant_a_is_bye && !m.participant_b_is_bye)
      .filter(m => !!m.stream_url)
      .sort((a, b) => {
        // Category priority: live=0, starting=1, scheduled=2, replay=3, other=4.
        // Lower = shown first.
        const oa = this.categoryRank(a);
        const ob = this.categoryRank(b);
        if (oa !== ob) return oa - ob;

        // Tie-breakers within a category:
        //   - Live/starting: earlier scheduled_at first (next-up reads first)
        //   - Replay:       MOST RECENT first
        if (oa === 3) {
          const ta = this.completionTime(a);
          const tb = this.completionTime(b);
          return tb - ta;
        }
        const ta = a.scheduled_at ? new Date(a.scheduled_at).getTime() : 0;
        const tb = b.scheduled_at ? new Date(b.scheduled_at).getTime() : 0;
        return ta - tb;
      });
  });

  /**
   * Category rank for sorting. Lower = appears first in the list.
   * Tied with streamCategory() string output below.
   */
  private categoryRank(m: BracketMatch): number {
    const cat = this.streamCategory(m);
    switch (cat) {
      case 'live':      return 0;
      case 'starting':  return 1;
      case 'scheduled': return 2;
      case 'replay':    return 3;
      default:          return 4;
    }
  }

  /** Best-available "when did this match end" timestamp for replay sort. */
  private completionTime(m: BracketMatch): number {
    return m.scheduled_at ? new Date(m.scheduled_at).getTime() : 0;
  }

  /**
   * Public categoriser used by the template to pick a status badge.
   *
   *   live       — match is in flight (ongoing/submitted/disputed)
   *   starting   — scheduled and within the next 2 hours
   *   scheduled  — scheduled but more than 2 hours away
   *   replay     — match has completed; embed shows the VOD or channel
   *   pending    — has a stream URL but no schedule and not in flight
   */
  streamCategory(m: BracketMatch): 'live' | 'starting' | 'scheduled' | 'replay' | 'pending' {
    if (m.status === 'ongoing' || m.status === 'submitted' || m.status === 'disputed') {
      return 'live';
    }
    if (m.status === 'completed' || m.status === 'walkover') {
      return 'replay';
    }
    if (m.scheduled_at) {
      const ts = new Date(m.scheduled_at).getTime();
      if (!Number.isNaN(ts)) {
        const delta = ts - Date.now();
        if (delta >= 0 && delta <= this.STARTING_SOON_MS) return 'starting';
        return 'scheduled';
      }
    }
    return 'pending';
  }

  /** Human label for the badge on each card. */
  streamCategoryLabel(m: BracketMatch): string {
    switch (this.streamCategory(m)) {
      case 'live':      return 'Live';
      case 'starting':  return 'Starting Soon';
      case 'scheduled': return 'Scheduled';
      case 'replay':    return 'Replay';
      default:          return 'Stream';
    }
  }

  /** Tab badge count — total streams visible in tab. */
  readonly liveStreamsCount = computed(() => this.liveStreams().length);

  /**
   * Count of streams that are GENUINELY live right now. Used to decide
   * whether the tab badge should pulse red. If only replays/scheduled
   * exist, no pulsing — we don't want to mislead spectators about what's
   * actually broadcasting.
   */
  readonly trulyLiveCount = computed(
    () => this.liveStreams().filter(m => this.streamCategory(m) === 'live').length,
  );

  /**
   * Build a per-stream display title for accessibility & overlay text.
   * Shows participant display names so spectators know who's playing.
   */
  liveStreamTitle(m: BracketMatch): string {
    const a = m.participant_a?.display_name ?? m.participant_a?.name ?? 'TBD';
    const b = m.participant_b?.display_name ?? m.participant_b?.name ?? 'TBD';
    return `Match #${m.match_number}: ${a} vs ${b}`;
  }


  readonly isOrganizerOrAdmin = computed(() => {
    const role = this.auth.currentUser()?.role ?? '';
    return role === 'organizer' || role === 'admin';
  });

  /**
   * True if the current user is the organizer of this tournament OR an admin.
   * Distinguished from generic role check — this also considers ownership.
   */
  readonly canManageMatch = computed(() => {
    const t = this.tournament();
    const u = this.auth.currentUser();
    if (!u) return false;
    if (u.role === 'admin') return true;
    const organizerId = t?.organizer_id ?? t?.organizer?.id;
    return organizerId !== undefined && String(organizerId) === String(u.id);
  });

  /** True if the current user is a participant in the currently-selected match. */
  readonly currentUserIsParticipant = computed(() => {
    const m = this.selectedMatch();
    const u = this.auth.currentUser();
    if (!m || !u) return false;
    // We don't have participant→user mapping on the BracketMatch shape, so
    // fall back to the tournament.participants list to resolve it.
    const t = this.tournament();
    const parts = t?.participants ?? [];
    const myP = parts.find((p: any) => String(p.user_id) === String(u.id));
    if (!myP) return false;
    return myP.id === m.participant_a?.id || myP.id === m.participant_b?.id;
  });

  /** True if there's a pending reschedule request awaiting the current user's response. */
  readonly pendingRescheduleAwaitingMe = computed<MatchRescheduleRequest | null>(() => {
    const reqs = this.rescheduleRequests();
    const u    = this.auth.currentUser();
    if (!u || !reqs.length) return null;
    return reqs.find(r =>
      r.is_pending && r.requested_by.id !== String(u.id)
    ) ?? null;
  });

  /** The current user's own pending request, if any. */
  readonly myPendingReschedule = computed<MatchRescheduleRequest | null>(() => {
    const reqs = this.rescheduleRequests();
    const u    = this.auth.currentUser();
    if (!u || !reqs.length) return null;
    return reqs.find(r => r.is_pending && r.requested_by.id === String(u.id)) ?? null;
  });

  // ── Lifecycle ────────────────────────────────────────────────────────

  // ════════════════════════════════════════════════════════════
  //  Challonge Feature Signals
  // ════════════════════════════════════════════════════════════

  // Shuffle Seeds
  readonly shuffling        = signal(false);

  // Substitution
  readonly showSubModal     = signal(false);
  readonly subParticipant   = signal<any>(null);
  readonly subUserId        = signal('');
  readonly subDisplayName   = signal('');
  readonly substituting     = signal(false);

  // Predictions
  readonly predictionsMode  = signal(false);
  readonly myPredictions    = signal<Record<string,string>>({});
  readonly predictionsSaved = signal(false);
  readonly predictionLb     = signal<any[]>([]);
  readonly showPredictionLb = signal(false);
  readonly submittingPred   = signal(false);

  // Form dots (Cricbuzz)
  readonly playerForm = computed<Record<string, ('W'|'L')[]>>(() => {
    const t = this.tournament();
    if (!t) return {};
    const matches: BracketMatch[] = t?.bracket?.matches ?? t?.matches ?? [];
    const completed = matches.filter((m: BracketMatch) => m.status === 'completed' && m.winner_id);
    const form: Record<string, ('W'|'L')[]> = {};
    const sorted = [...completed].sort((a, b) => a.round_number - b.round_number);
    for (const m of sorted) {
      const paId = m.participant_a?.id;
      const pbId = m.participant_b?.id;
      if (!paId || !pbId) continue;
      if (!form[paId]) form[paId] = [];
      if (!form[pbId]) form[pbId] = [];
      form[paId].push(m.winner_id === paId ? 'W' : 'L');
      form[pbId].push(m.winner_id === pbId ? 'W' : 'L');
    }
    for (const id of Object.keys(form)) form[id] = form[id].slice(-5);
    return form;
  });

  getPlayerForm(participantId: string): ('W'|'L')[] {
    return this.playerForm()[participantId] ?? [];
  }

  // ── Challonge Methods ─────────────────────────────────────────────────────

  shuffleSeeds(): void {
    const t = this.tournament();
    if (!t) return;
    if (!confirm('Randomly reassign all participant seeds? The bracket must not be generated yet.')) return;
    this.shuffling.set(true);
    this.api.shuffleSeeds(t.id).subscribe({
      next: () => { this.shuffling.set(false); this.reload(); this.toast.success('Seeds shuffled!'); },
      error: (err: any) => { this.shuffling.set(false); this.toast.error(err?.error?.message ?? 'Failed to shuffle.'); },
    });
  }

  openSubModal(p: any): void {
    this.subParticipant.set(p);
    this.subUserId.set('');
    this.subDisplayName.set('');
    this.showSubModal.set(true);
  }

  confirmSub(): void {
    const t = this.tournament();
    const p = this.subParticipant();
    if (!t || !p) return;
    if (!this.subUserId() && !this.subDisplayName()) {
      this.toast.error('Enter a user ID or guest display name.');
      return;
    }
    this.substituting.set(true);
    const payload: any = this.subUserId()
      ? { new_user_id: this.subUserId() }
      : { new_display_name: this.subDisplayName() };

    this.api.substituteParticipant(t.id, p.id, payload).subscribe({
      next: (res: any) => {
        this.substituting.set(false);
        this.showSubModal.set(false);
        this.reload();
        this.toast.success(res.message ?? 'Substituted!');
      },
      error: (err: any) => {
        this.substituting.set(false);
        this.toast.error(err?.error?.message ?? 'Substitution failed.');
      },
    });
  }

  togglePredictionsMode(): void {
    const entering = !this.predictionsMode();
    this.predictionsMode.set(entering);
    if (entering) {
      this.predictionsSaved.set(false);
      const t = this.tournament();
      if (!t) return;
      this.api.getMyPredictions(t.id).subscribe({
        next: (r) => {
          const map: Record<string,string> = {};
          Object.values(r.data ?? {}).forEach((v: any) => { map[v.match_id] = v.predicted_winner_id; });
          this.myPredictions.set(map);
        },
        error: () => {},
      });
    }
  }


  pickA(m: BracketMatch, event: Event): void {
    event.stopPropagation();
    if (!this.predictionsMode()) return;
    const id = m.participant_a?.id;
    if (id) this.setPrediction(m.id, id);
  }

  pickB(m: BracketMatch, event: Event): void {
    event.stopPropagation();
    if (!this.predictionsMode()) return;
    const id = m.participant_b?.id;
    if (id) this.setPrediction(m.id, id);
  }

  clickMatch(m: BracketMatch, event: Event): void {
    if (this.predictionsMode()) return;
    this.openMatch(m);
  }

  setPrediction(matchId: string, participantId: string): void {
    this.myPredictions.update(p => ({ ...p, [matchId]: participantId }));
  }

  hasPrediction(matchId: string): string | null {
    return this.myPredictions()[matchId] ?? null;
  }

  countPredictions(): number {
    return Object.keys(this.myPredictions()).length;
  }

  saveAllPredictions(): void {
    const t = this.tournament();
    if (!t) return;
    const entries = Object.entries(this.myPredictions());
    if (!entries.length) return;
    this.submittingPred.set(true);
    let done = 0;
    entries.forEach(([matchId, winnerId]) => {
      this.api.submitPrediction(t.id, matchId, winnerId).subscribe({
        next:  () => { if (++done === entries.length) { this.submittingPred.set(false); this.predictionsSaved.set(true); this.toast.success(`${done} prediction${done>1?'s':''} saved!`); } },
        error: () => { if (++done === entries.length) this.submittingPred.set(false); },
      });
    });
  }

  loadPredictionLeaderboard(): void {
    const t = this.tournament();
    if (!t) return;
    this.showPredictionLb.set(true);
    this.api.getPredictionLeaderboard(t.id).subscribe({
      next: (r) => this.predictionLb.set(r.data ?? []),
      error: () => {},
    });
  }

  private reload(): void {
    window.location.reload();
  }


  readonly tournamentBanner = signal<any>(null);
  loadTournamentBanner(id: string): void {
    this.api.getAdPlacementsForTournament(id).subscribe({ next: (r) => this.tournamentBanner.set((r.data??[])[0]??null), error: ()=>{} });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(p => {
        this.loading.set(true);
        this.error.set(null);
        this.tournament.set(null);
        return this.api.getTournament(p.get('id')!);
      })
    ).subscribe({
      next: (res: any) => {
        const t = res.data ?? res;
        this.tournament.set(t);
        this.loading.set(false);
        // Apply the tournament's resolved brand to the page.
        if (t?.brand) { this.brand.apply(t.brand); }
      },
      error: (err: any) => { this.error.set(err?.error?.message ?? 'Failed to load tournament.'); this.loading.set(false); },
    });
  }

  ngOnDestroy(): void {
    if (this.countdownHandle) clearInterval(this.countdownHandle);
    // Revert to platform defaults when leaving this page.
    this.brand.reset();
  }

  // ── Registration / bracket ───────────────────────────────────────────
  register(): void {
    if (!this.auth.isLoggedIn()) { this.toast.info('Sign in to register.'); return; }
    const t = this.tournament();
    // If tournament has rules and the user hasn't accepted them, open modal.
    if (t?.has_rules && !this.acceptedRules()) {
      this.showRegisterModal.set(true);
      return;
    }
    this.doRegister(this.acceptedRules());
  }

  /** User clicked Confirm & Register in the rules-acceptance modal. */
  confirmRegisterWithRules(): void {
    if (!this.acceptedRules()) {
      this.toast.warning('You must accept the rules to register.');
      return;
    }
    this.showRegisterModal.set(false);
    this.doRegister(true);
  }

  private doRegister(acceptedRules: boolean): void {
    this.registering.set(true);
    this.api.registerForTournamentWithRules(this.tournament()?.id, acceptedRules).subscribe({
      next: () => { this.refresh(); this.registering.set(false); this.toast.success('Registered!'); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.registering.set(false); },
    });
  }

  generateBracket(): void {
    this.generating.set(true);
    this.api.generateBracket(this.tournament()?.id).subscribe({
      next: () => { this.refresh(); this.generating.set(false); this.toast.success('Bracket generated!'); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.generating.set(false); },
    });
  }

  /**
   * Whether a match cell should respond to clicks.
   *
   * Active statuses (pending/scheduled/ongoing/submitted/disputed) open the
   * modal in editable mode for participants and organizers. Completed and
   * walkover matches also open the modal but in a read-only view — the
   * action forms inside (schedule editor, result form, dispute form) are
   * already gated by their own m.status checks, so the same modal naturally
   * presents as a read-only result panel for finished matches.
   *
   * BYE-only slots (no participant_b yet awaiting an opponent) stay
   * non-clickable since there's nothing to view.
   */
  matchIsClickable(m: BracketMatch): boolean {
    return ['pending', 'scheduled', 'ongoing', 'submitted', 'disputed', 'completed', 'walkover'].includes(m.status)
      && !!m.participant_a && !!m.participant_b;
  }

  openMatch(m: BracketMatch): void {
    if (!this.matchIsClickable(m)) return;
    this.selectedMatch.set(m);
    this.disputeMode.set(false);
    this.showScheduleEditor.set(false);
    this.showRescheduleForm.set(false);
    this.showStreamEditor.set(false);
    this.evidenceFile.set(null);
    this.resultForm.reset({ winner_participant_id: '', score_a: null, score_b: null });
    this.disputeForm.reset();
    this.scheduleForm.reset({ scheduled_at: this.toLocalIso(m.scheduled_at) });
    this.rescheduleForm.reset({ proposed_at: '', reason: '' });
    this.evidenceForm.reset();
    this.streamForm.reset({ stream_url: m.stream_url ?? '' });
    this.loadMatchDetails(m.id);
  }

  closeModal(): void {
    this.selectedMatch.set(null);
    this.rescheduleRequests.set([]);
    this.evidenceList.set([]);
  }

  getWinnerName(m: BracketMatch): string {
    if (!m.winner_id) return 'N/A';
    if (m.participant_a?.id === m.winner_id) return m.participant_a?.name ?? 'N/A';
    if (m.participant_b?.id === m.winner_id) return m.participant_b?.name ?? 'N/A';
    return 'N/A';
  }

  // ── Result lifecycle (Sprint 1) ──────────────────────────────────────
  submitResult(): void {
    if (this.resultForm.invalid) { this.resultForm.markAllAsTouched(); return; }
    this.submitting.set(true);
    const v = this.resultForm.value;
    const body: any = { winner_participant_id: v.winner_participant_id };
    if (v.score_a != null) body.score_a = v.score_a;
    if (v.score_b != null) body.score_b = v.score_b;
    this.api.submitResult(this.tournament()!.id, this.selectedMatch()!.id, body).subscribe({
      next: () => { this.submitting.set(false); this.toast.success('Result submitted!'); this.closeModal(); this.refresh(); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.submitting.set(false); },
    });
  }

  confirmResult(): void {
    this.submitting.set(true);
    this.api.confirmResult(this.selectedMatch()!.id).subscribe({
      next: () => { this.submitting.set(false); this.toast.success('Confirmed!'); this.closeModal(); this.refresh(); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.submitting.set(false); },
    });
  }

  disputeResult(): void { this.submitDispute(); }

  submitDispute(): void {
    if (this.disputeForm.invalid) return;
    this.submitting.set(true);
    this.api.disputeResult(this.selectedMatch()!.id, this.disputeForm.value.reason!).subscribe({
      next: () => { this.submitting.set(false); this.toast.warning('Dispute submitted.'); this.closeModal(); },
      error: (err: any) => { this.toast.error(err.error?.message ?? 'Failed.'); this.submitting.set(false); },
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SPRINT 2: SCHEDULE HANDLERS
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Loads all reschedule requests and evidence for a match. Called when
   * the modal opens.
   */
  private loadMatchDetails(matchId: string): void {
    this.loadingMatchDetails.set(true);
    this.api.listReschedules(matchId).subscribe({
      next: res => this.rescheduleRequests.set(res.data),
      error: () => this.rescheduleRequests.set([]),
    });
    this.api.listEvidence(matchId).subscribe({
      next: res => { this.evidenceList.set(res.data); this.loadingMatchDetails.set(false); },
      error: () => { this.evidenceList.set([]); this.loadingMatchDetails.set(false); },
    });
  }

  toggleScheduleEditor(): void {
    const m = this.selectedMatch();
    if (!m) return;
    this.scheduleForm.reset({ scheduled_at: this.toLocalIso(m.scheduled_at) });
    this.showScheduleEditor.update(v => !v);
  }

  /** Organizer saves a direct schedule change. */
  saveSchedule(): void {
    if (this.scheduleForm.invalid) { this.scheduleForm.markAllAsTouched(); return; }
    const m = this.selectedMatch();
    if (!m) return;
    const iso = this.fromLocalIso(this.scheduleForm.value.scheduled_at!);
    this.submitting.set(true);
    this.api.scheduleMatch(m.id, iso).subscribe({
      next: res => {
        this.submitting.set(false);
        this.toast.success('Schedule updated.');
        this.showScheduleEditor.set(false);
        // Update the modal-local match with new schedule
        this.selectedMatch.update(curr => curr ? ({
          ...curr,
          scheduled_at: res.data?.scheduled_at ?? iso,
          status: res.data?.status ?? curr.status,
        }) : curr);
        this.refresh();
      },
      error: (err: any) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? 'Failed to update schedule.');
      },
    });
  }

  // ── Stream editor (Sprint: live streaming Option A) ────────────────────
  //
  // The stream URL is a Twitch or YouTube URL. Server-side validation is
  // authoritative; the frontend just submits and reflects the response.
  //
  // ACL surfaces in canModifyStream(): organizers/admins always allowed,
  // and either of the two participants can also set/clear (it's their
  // match). Other viewers see the embed read-only.

  /** Permission gate for the editor + edit buttons. */
  canModifyStream(): boolean {
    return this.canManageMatch() || this.currentUserIsParticipant();
  }

  toggleStreamEditor(): void {
    const m = this.selectedMatch();
    if (!m) return;
    this.streamForm.reset({ stream_url: m.stream_url ?? '' });
    this.showStreamEditor.update(v => !v);
  }

  /**
   * Save the stream URL. The server normalises (canonicalises) the URL,
   * so we update the local match with the SERVER's stored value rather
   * than the raw input — keeps the embed in sync with what's persisted.
   */
  saveStream(): void {
    if (this.streamForm.invalid) { this.streamForm.markAllAsTouched(); return; }
    const m = this.selectedMatch();
    if (!m) return;
    const url = (this.streamForm.value.stream_url ?? '').trim();
    if (!url) return;

    this.savingStream.set(true);
    this.api.setMatchStream(m.id, url).subscribe({
      next: res => {
        this.savingStream.set(false);
        this.toast.success('Stream URL saved.');
        this.showStreamEditor.set(false);
        // Reflect the server-canonical URL on the modal-local match.
        const canonical = res.data?.stream?.canonical_url ?? url;
        this.selectedMatch.update(curr => curr ? ({ ...curr, stream_url: canonical }) : curr);
        this.refresh();
      },
      error: (err: any) => {
        this.savingStream.set(false);
        this.toast.error(err.error?.message ?? 'Invalid stream URL.');
      },
    });
  }

  /** Remove the stream URL — embed disappears, editor stays available. */
  removeStream(): void {
    const m = this.selectedMatch();
    if (!m) return;
    this.savingStream.set(true);
    this.api.clearMatchStream(m.id).subscribe({
      next: () => {
        this.savingStream.set(false);
        this.toast.success('Stream removed.');
        this.selectedMatch.update(curr => curr ? ({ ...curr, stream_url: null }) : curr);
        this.streamForm.reset({ stream_url: '' });
        this.refresh();
      },
      error: (err: any) => {
        this.savingStream.set(false);
        this.toast.error(err.error?.message ?? 'Failed to remove stream.');
      },
    });
  }

  toggleRescheduleForm(): void {
    this.rescheduleForm.reset({ proposed_at: '', reason: '' });
    this.showRescheduleForm.update(v => !v);
  }

  /** Player proposes a new time — opponent must accept (or organizer overrides). */
  requestReschedule(): void {
    if (this.rescheduleForm.invalid) { this.rescheduleForm.markAllAsTouched(); return; }
    const m = this.selectedMatch();
    if (!m) return;
    const iso = this.fromLocalIso(this.rescheduleForm.value.proposed_at!);
    this.submitting.set(true);
    this.api.requestReschedule(m.id, iso, this.rescheduleForm.value.reason || undefined).subscribe({
      next: res => {
        this.submitting.set(false);
        this.toast.success('Reschedule request sent.');
        this.showRescheduleForm.set(false);
        this.rescheduleRequests.update(list => [res.data, ...list]);
      },
      error: (err: any) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? 'Failed to request reschedule.');
      },
    });
  }

  respondToReschedule(req: MatchRescheduleRequest, accept: boolean): void {
    const m = this.selectedMatch();
    if (!m) return;
    this.submitting.set(true);
    this.api.respondReschedule(m.id, req.id, accept ? 'accept' : 'reject').subscribe({
      next: res => {
        this.submitting.set(false);
        this.toast.success(accept ? 'Reschedule accepted.' : 'Reschedule rejected.');
        this.rescheduleRequests.update(list => list.map(r => r.id === req.id ? res.data : r));
        if (accept) {
          this.selectedMatch.update(curr => curr ? ({ ...curr, scheduled_at: req.proposed_at }) : curr);
          this.refresh();
        }
      },
      error: (err: any) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? 'Failed to respond.');
      },
    });
  }

  /** Organizer/admin forces acceptance (or rejection) without opponent consent. */
  organizerOverride(req: MatchRescheduleRequest, accept: boolean): void {
    const m = this.selectedMatch();
    if (!m) return;
    this.submitting.set(true);
    this.api.respondReschedule(m.id, req.id, accept ? 'accept' : 'reject', true).subscribe({
      next: res => {
        this.submitting.set(false);
        this.toast.success('Request overridden.');
        this.rescheduleRequests.update(list => list.map(r => r.id === req.id ? res.data : r));
        if (accept) {
          this.selectedMatch.update(curr => curr ? ({ ...curr, scheduled_at: req.proposed_at }) : curr);
          this.refresh();
        }
      },
      error: (err: any) => {
        this.submitting.set(false);
        this.toast.error(err.error?.message ?? 'Failed to override.');
      },
    });
  }

  cancelMyReschedule(req: MatchRescheduleRequest): void {
    const m = this.selectedMatch();
    if (!m) return;
    this.api.cancelReschedule(m.id, req.id).subscribe({
      next: () => {
        this.toast.info('Request cancelled.');
        this.rescheduleRequests.update(list => list.map(r =>
          r.id === req.id ? { ...r, status: 'cancelled' as const, is_pending: false } : r
        ));
      },
      error: (err: any) => this.toast.error(err.error?.message ?? 'Failed to cancel.'),
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // SPRINT 2: EVIDENCE HANDLERS
  // ═══════════════════════════════════════════════════════════════════

  onEvidenceFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0] ?? null;
    this.evidenceFile.set(file);
  }

  uploadEvidence(): void {
    const m    = this.selectedMatch();
    const file = this.evidenceFile();
    if (!m || !file) { this.toast.info('Choose a file first.'); return; }
    this.uploadingEvidence.set(true);
    this.api.uploadEvidence(m.id, file, this.evidenceForm.value.caption || undefined).subscribe({
      next: res => {
        this.uploadingEvidence.set(false);
        this.toast.success('Evidence uploaded.');
        this.evidenceList.update(list => [res.data, ...list]);
        this.evidenceFile.set(null);
        this.evidenceForm.reset();
        // Clear the file input element
        const input = document.querySelector<HTMLInputElement>('#evidence-file-input');
        if (input) input.value = '';
      },
      error: (err: any) => {
        this.uploadingEvidence.set(false);
        this.toast.error(err.error?.message ?? 'Upload failed.');
      },
    });
  }

  deleteEvidence(ev: MatchEvidence): void {
    const m = this.selectedMatch();
    if (!m) return;
    if (!confirm('Delete this evidence? This cannot be undone.')) return;
    this.api.deleteEvidence(m.id, ev.id).subscribe({
      next: () => {
        this.toast.info('Evidence deleted.');
        this.evidenceList.update(list => list.filter(e => e.id !== ev.id));
      },
      error: (err: any) => this.toast.error(err.error?.message ?? 'Delete failed.'),
    });
  }

  canDeleteEvidence(ev: MatchEvidence): boolean {
    const u = this.auth.currentUser();
    if (!u) return false;
    return String(ev.uploaded_by.id) === String(u.id) || this.isOrganizerOrAdmin();
  }

  // ── Utilities ────────────────────────────────────────────────────────

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pending', scheduled: 'Scheduled', ongoing: 'Live',
      submitted: 'Awaiting confirm', confirmed: 'Confirmed',
      disputed: 'Disputed', completed: 'Done', walkover: 'Walkover', bye: 'Bye',
    };
    return map[status] ?? status;
  }

  rescheduleStatusLabel(s: string): string {
    const map: Record<string, string> = {
      pending: 'Pending', accepted: 'Accepted', rejected: 'Rejected',
      cancelled: 'Cancelled', overridden: 'Overridden',
    };
    return map[s] ?? s;
  }

  /**
   * Convert an ISO-8601 UTC timestamp to a value suitable for an
   * <input type="datetime-local"> element (i.e. local timezone, no tz suffix,
   * "YYYY-MM-DDTHH:mm").
   */
  private toLocalIso(iso: string | null | undefined): string {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off * 60 * 1000);
    return local.toISOString().slice(0, 16);
  }

  /**
   * Convert a datetime-local input value (local, no tz) back to a UTC ISO
   * string the backend expects.
   */
  private fromLocalIso(localVal: string): string {
    if (!localVal) return '';
    // `new Date(localVal)` interprets as local time.
    return new Date(localVal).toISOString();
  }

  private roundLabel(section: string, num: number, total: number, format: string): string {
    if (section === 'grand_final') return 'Grand Final';
    if (section === 'losers')      return `Losers R${num}`;
    if (section === 'round_robin') return `Round ${num}`;
    if (section === 'swiss')       return `Swiss R${num}`;
    const wbRounds = (format === 'double_elimination') ? Math.ceil(total / 2) : total;
    if (num === wbRounds)     return 'Final';
    if (num === wbRounds - 1) return 'Semis';
    if (num === wbRounds - 2) return 'Quarters';
    return `Round ${num}`;
  }

  private refresh(): void {
    const id = this.tournament()?.id;
    if (!id) return;
    this.api.getTournament(id).subscribe({
      next: (res: any) => {
        this.tournament.set(res.data ?? res);
        if (this.countdownHandle) clearInterval(this.countdownHandle);
        this.startCountdown();
      },
    });
  }


  // ── Result submission helpers ────────────────────────────────────────────
  readonly evidencePreview = signal<string | null>(null);

  canSubmitResult(m: BracketMatch): boolean {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return false;
    if (m.status === 'completed' || m.status === 'walkover') return false;
    const isParticipant =
      m.participant_a?.user_id === userId ||
      m.participant_b?.user_id === userId;
    return isParticipant || this.canManageMatch();
  }

  canConfirmResult(m: BracketMatch): boolean {
    const userId = this.auth.currentUser()?.id;
    if (!userId) return false;
    if (m.status !== 'submitted') return false;
    return (
      m.participant_a?.user_id === userId ||
      m.participant_b?.user_id === userId
    );
  }

  onEvidenceSelected(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.evidenceFile.set(file);
    const reader = new FileReader();
    reader.onload = () => this.evidencePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  clearEvidence(): void {
    this.evidenceFile.set(null);
    this.evidencePreview.set(null);
  }

  // ── Game art helpers ──────────────────────────────────────────────────────
  gameArtUrl(game: string): string {
    const map: Record<string, string> = {
      ea_fc25:    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80&fit=crop',
      pubg_mobile:'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80&fit=crop',
      cod_mobile: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&q=80&fit=crop',
    };
    return map[game] ?? 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=80&fit=crop';
  }

  // ── Round picker helpers ──────────────────────────────────────────────────
  isRoundFormat(): boolean {
    const t = this.tournament();
    return t?.format === 'swiss' || t?.format === 'round_robin';
  }

  readonly currentRoundMatches = computed(() => {
    const round = this.rounds().find(r => r.num === this.selectedRound());
    return round?.matches ?? [];
  });

  readonly roundStats = computed(() => {
    return this.rounds().map(r => ({
      num: r.num,
      label: r.label,
      completed: r.matches.filter(m => m.status === 'completed').length,
      total: r.matches.length,
    }));
  });

  readonly filteredLeaderboard = computed(() => {
    const q = this.playerSearch().toLowerCase().trim();
    if (!q) return this.leaderboard();
    return this.leaderboard().filter(p =>
      (p.display_name ?? p.name ?? '').toLowerCase().includes(q)
    );
  });

  selectRound(num: number): void {
    this.selectedRound.set(num);
  }

  
  // ── Edit Tournament ──────────────────────────────────────────────────────
  readonly showEditModal  = signal(false);
  readonly savingEdit     = signal(false);
  readonly editForm       = this.fb.group({
    name:                   [''],
    name_ar:                [''],
    description:            [''],
    rules:                  [''],
    registration_closes_at: [''],
    starts_at:              [''],
    max_participants:       [0],
    entry_fee_sar:          [0],
  });

  openEditModal(): void {
    const t = this.tournament();
    if (!t) return;
    this.editForm.patchValue({
      name:                   t.name ?? '',
      name_ar:                t.name_ar ?? '',
      description:            t.description ?? '',
      rules:                  t.rules ?? '',
      registration_closes_at: t.registration_closes_at ? t.registration_closes_at.slice(0,16) : '',
      starts_at:              t.starts_at ? t.starts_at.slice(0,16) : '',
      max_participants:       t.max_participants ?? 0,
      entry_fee_sar:          t.entry_fee_sar ?? 0,
    });
    this.showEditModal.set(true);
  }

  saveEdit(): void {
    const t = this.tournament();
    if (!t) return;
    this.savingEdit.set(true);
    const v = this.editForm.value;
    this.api.updateTournament(t.id, {
      name:                   v.name,
      name_ar:                v.name_ar || null,
      description:            v.description || null,
      rules:                  v.rules || null,
      registration_closes_at: v.registration_closes_at || null,
      starts_at:              v.starts_at || null,
      max_participants:       v.max_participants,
      entry_fee_sar:          v.entry_fee_sar,
    }).subscribe({
      next: () => {
        this.savingEdit.set(false);
        this.showEditModal.set(false);
        this.refresh();
        this.toast.success('Tournament updated.');
      },
      error: (err: any) => {
        this.savingEdit.set(false);
        this.toast.error(err?.error?.message ?? 'Update failed.');
      },
    });
  }

  // ── Delete Tournament ─────────────────────────────────────────────────────
  readonly showDeleteConfirm = signal(false);
  readonly deleting          = signal(false);

  deleteTournament(): void {
    const t = this.tournament();
    if (!t) return;
    this.deleting.set(true);
    this.api.deleteTournament(t.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.showDeleteConfirm.set(false);
        this.toast.success('Tournament deleted.');
        window.history.back();
      },
      error: (err: any) => {
        this.deleting.set(false);
        this.toast.error(err?.error?.message ?? 'Delete failed.');
      },
    });
  }

  // ── Jump to my match ─────────────────────────────────────────────────────
  jumpToMyMatch(): void {
    const t = this.tournament();
    const userId = this.auth.currentUser()?.id;
    if (!t || !userId) return;
    const matches: any[] = t?.bracket?.matches ?? t?.matches ?? [];
    const mine = (matches as BracketMatch[]).find(m =>
      (m.participant_a?.user_id === userId || m.participant_b?.user_id === userId) &&
      !['completed', 'walkover'].includes(m.status)
    );
    if (mine) {
      this.openMatch(mine);
    } else {
      this.toast.info('No active match found for you.');
    }
  }

  // ── Unregister ─────────────────────────────────────────────────────────────
  unregister(): void {
    const t = this.tournament();
    if (!t) return;
    this.unregistering.set(true);
    this.api.unregisterFromTournament(t.id).subscribe({
      next: () => {
        this.refresh();
        this.unregistering.set(false);
        this.toast.success('You have been unregistered.');
      },
      error: (err: any) => {
        this.toast.error(err?.error?.message ?? 'Failed to unregister.');
        this.unregistering.set(false);
      },
    });
  }

  // ── Share ───────────────────────────────────────────────────────────────────
  shareLink(): void {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: this.tournament()?.name ?? 'Tournament', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        this.linkCopied.set(true);
        setTimeout(() => this.linkCopied.set(false), 2500);
      });
    }
  }

  // ── Countdown ───────────────────────────────────────────────────────────────
  startCountdown(): void {
    this.updateCountdown();
    this.countdownHandle = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const t = this.tournament();
    if (!t) return;
    const target = t.starts_at
      ? new Date(t.starts_at).getTime()
      : t.registration_closes_at
        ? new Date(t.registration_closes_at).getTime()
        : null;
    if (!target) { this.countdown.set(null); return; }
    const diff = target - Date.now();
    if (diff <= 0) { this.countdown.set(null); return; }
    this.countdown.set({
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    });
  }

  // ── Prize display helpers ───────────────────────────────────────────────────
  totalPrizeDisplay(): string | null {
    const prizes = this.normalizedPrizes?.() ?? [];
    if (!prizes.length) return null;
    const sarPrizes = prizes
      .map((p: any) => p.reward ?? '')
      .filter((r: string) => /\d/.test(r));
    if (!sarPrizes.length) return prizes[0]?.reward ?? null;
    const total = sarPrizes.reduce((sum: number, r: string) => {
      const match = r.match(/([\d,]+)/);
      return sum + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
    }, 0);
    return total > 0 ? total.toLocaleString() : prizes[0]?.reward ?? null;
  }

  totalPrizeCurrency(): string {
    const prizes = this.normalizedPrizes?.() ?? [];
    if (!prizes.length) return '';
    const first = prizes[0]?.reward ?? '';
    if (/SAR/i.test(first)) return 'SAR';
    if (/USD/i.test(first)) return 'USD';
    return '';
  }

  // ── Organizer override reschedule ───────────────────────────────────────────
  organizerOverrideReschedule(req: any, accept: boolean): void {
    this.respondToReschedule(req, accept);
  }

}
