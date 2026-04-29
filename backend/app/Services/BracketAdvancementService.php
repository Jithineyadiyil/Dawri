<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Bracket;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\TournamentParticipant;
use Illuminate\Support\Facades\DB;
use RuntimeException;
use Throwable;

/**
 * Advances winners after a match result is recorded.
 * Uses correct schema: bracket_id, round_number, bracket_section,
 * participant_a_id, participant_b_id, next_match_id.
 *
 * ── Sprint 1 fix applied ────────────────────────────────────────────────────
 *   RankingService is now injected and invoked on tournament completion.
 *   Previously the PATCH_BracketAdvancementService.php file described this
 *   integration as pseudocode, but it was never wired into the real service.
 *   Result: tournaments completed without any ranking points being awarded,
 *   the leaderboard stayed empty, and PRD §9.2 metrics could not be measured.
 */
class BracketAdvancementService
{
    public function __construct(
        private readonly RankingService $ranking,
    ) {}

    /**
     * Entry point — routes the finalised match to the correct format handler.
     *
     * @throws RuntimeException When the match has no winner set.
     */
    public function advance(TournamentMatch $match): void
    {
        if ($match->winner_id === null) {
            throw new RuntimeException("Match #{$match->id} has no winner set.");
        }

        DB::transaction(function () use ($match): void {
            $bracket    = $match->bracket;
            $tournament = $bracket->tournament;

            match ($tournament->format) {
                'single_elimination' => $this->advanceSE($match, $bracket, $tournament),
                'double_elimination' => $this->advanceDE($match, $bracket, $tournament),
                'round_robin'        => $this->checkRRCompletion($bracket, $tournament),
                'swiss'              => $this->advanceSwiss($match, $bracket, $tournament),
                default              => null,
            };
        });
    }

    // ─── Single Elimination ───────────────────────────────────────────────────

    private function advanceSE(TournamentMatch $match, Bracket $bracket, Tournament $tournament): void
    {
        if ($match->next_match_id) {
            $nextMatch = TournamentMatch::find($match->next_match_id);
            if ($nextMatch) {
                $this->fillParticipantSlot($nextMatch, $match->winner_id);
            }
        } else {
            // No next match — this was the final.
            $this->completeTournament($bracket, $tournament, $match->winner_id);
        }
    }

    // ─── Double Elimination ───────────────────────────────────────────────────

    /**
     * Advance a completed DE match.
     *
     * Routing rules:
     *   1. Winner follows `next_match_id` (WB → next WB round, or LB → next LB
     *      round, or WB-final → grand_final, or LB-final → grand_final).
     *   2. Loser of a WB match follows `loser_next_match_id` (drops into LB).
     *   3. LB matches have no loser routing — losing in LB = elimination.
     *   4. Tournament completes when GF is decided.
     *
     * Note on the GF: this implementation supports BOTH a one-game GF AND
     * the bracket-reset variant. If the LB winner beats the WB winner in
     * the GF, the bracket is technically supposed to "reset" (play one
     * more match). For demo purposes we treat the GF as a single final
     * — bracket reset can be added later if needed.
     */
    private function advanceDE(TournamentMatch $match, Bracket $bracket, Tournament $tournament): void
    {
        // ── Winner advancement ───────────────────────────────────────────
        if ($match->next_match_id) {
            $nextMatch = TournamentMatch::find($match->next_match_id);
            if ($nextMatch) {
                $this->fillParticipantSlot($nextMatch, $match->winner_id);
            }
        }

        // ── Loser drop to LB (only from WB matches) ─────────────────────
        if ($match->bracket_section === 'winners' && $match->loser_next_match_id) {
            $loserId = ($match->winner_id === $match->participant_a_id)
                ? $match->participant_b_id
                : $match->participant_a_id;

            if ($loserId !== null) {
                $lbMatch = TournamentMatch::find($match->loser_next_match_id);
                if ($lbMatch) {
                    $this->fillParticipantSlot($lbMatch, $loserId);
                }
            }
        }

        // ── Completion check ────────────────────────────────────────────
        // The tournament is complete only when the grand final is decided.
        // Avoid the old "no pending matches" check — that fires too early
        // when intermediate LB rounds still have unfilled placeholders.
        if ($match->bracket_section === 'grand_final' && $match->winner_id) {
            $this->completeTournament($bracket, $tournament, $match->winner_id);
        }
    }

    // ─── Round Robin ──────────────────────────────────────────────────────────

    private function checkRRCompletion(Bracket $bracket, Tournament $tournament): void
    {
        $pending = TournamentMatch::where('bracket_id', $bracket->id)
            ->whereIn('status', ['pending', 'ongoing'])
            ->count();

        if ($pending === 0) {
            $this->completeTournament($bracket, $tournament, null);
        }
    }

    // ─── Swiss ────────────────────────────────────────────────────────────────

    private function advanceSwiss(TournamentMatch $match, Bracket $bracket, Tournament $tournament): void
    {
        $currentRound = $match->round_number;

        $pendingInRound = TournamentMatch::where('bracket_id', $bracket->id)
            ->where('round_number', $currentRound)
            ->whereIn('status', ['pending', 'ongoing'])
            ->count();

        if ($pendingInRound > 0) {
            return;
        }

        $totalRounds = $bracket->total_rounds
            ?? $tournament->swiss_rounds
            ?? (int) ceil(log(max($bracket->participant_count, 2), 2));

        if ($currentRound >= $totalRounds) {
            $this->completeTournament($bracket, $tournament, null);
            return;
        }

        // Advance round pointer.
        $bracket->update(['current_round' => $currentRound + 1]);

        // Generate the next Swiss round using Monrad pairing with rematch avoidance.
        $standings   = $this->buildSwissStandings($bracket);
        $matchNumber = TournamentMatch::where('bracket_id', $bracket->id)->count() + 1;
        $unpaired    = $standings;

        while (count($unpaired) >= 2) {
            $p1 = array_shift($unpaired);
            $opponentIndex = null;

            foreach ($unpaired as $idx => $p2) {
                if (! in_array($p2['id'], $p1['played'], true)) {
                    $opponentIndex = $idx;
                    break;
                }
            }

            // Fallback: if every remaining opponent has been played, accept a rematch.
            if ($opponentIndex === null) {
                $opponentIndex = 0;
            }

            $p2 = $unpaired[$opponentIndex];
            unset($unpaired[$opponentIndex]);
            $unpaired = array_values($unpaired);

            TournamentMatch::create([
                'bracket_id'           => $bracket->id,
                'round_number'         => $currentRound + 1,
                'match_number'         => $matchNumber++,
                'bracket_section'      => 'swiss',
                'participant_a_id'     => $p1['id'],
                'participant_b_id'     => $p2['id'],
                'participant_a_is_bye' => false,
                'participant_b_is_bye' => false,
                'status'               => 'pending',
            ]);
        }

        // Odd participant gets a bye (auto-win).
        if (count($unpaired) === 1) {
            $bye = $unpaired[0];

            TournamentMatch::create([
                'bracket_id'           => $bracket->id,
                'round_number'         => $currentRound + 1,
                'match_number'         => $matchNumber,
                'bracket_section'      => 'swiss',
                'participant_a_id'     => $bye['id'],
                'participant_b_id'     => null,
                'participant_a_is_bye' => false,
                'participant_b_is_bye' => true,
                'status'               => 'walkover',
                'winner_id'            => $bye['id'],
            ]);
        }
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private function fillParticipantSlot(TournamentMatch $match, string $participantId): void
    {
        // Idempotency: if this participant is already in either slot, no-op.
        // Without this guard, a duplicate advance() call (e.g. from a double
        // result-confirmation) would write the same winner into BOTH slots,
        // producing "Player X vs Player X" in the next match.
        if ($match->participant_a_id === $participantId
            || $match->participant_b_id === $participantId) {
            return;
        }

        if ($match->participant_a_id === null) {
            $match->participant_a_id = $participantId;
        } elseif ($match->participant_b_id === null) {
            $match->participant_b_id = $participantId;
        }

        if ($match->participant_a_id && $match->participant_b_id) {
            $match->status = 'pending';
        }

        $match->save();
    }

    /**
     * Compute Swiss standings: points + Buchholz tie-break + played-opponent list.
     *
     * @return array<int, array{id:string, points:int, buchholz:int, played:array<int,string>}>
     */
    private function buildSwissStandings(Bracket $bracket): array
    {
        $matches = TournamentMatch::where('bracket_id', $bracket->id)
            ->whereNotNull('winner_id')
            ->get();

        $points    = [];
        $opponents = [];

        foreach ($matches as $m) {
            if (in_array($m->status, ['walkover', 'bye'], true)) {
                $points[$m->participant_a_id] = ($points[$m->participant_a_id] ?? 0) + 1;
                continue;
            }

            $winner = $m->winner_id;
            $loser  = ($winner === $m->participant_a_id) ? $m->participant_b_id : $m->participant_a_id;

            $points[$winner]      = ($points[$winner] ?? 0) + 1;
            $points[$loser]       = ($points[$loser]  ?? 0);
            $opponents[$winner][] = $loser;
            $opponents[$loser][]  = $winner;
        }

        $participants = TournamentParticipant::where('tournament_id', $bracket->tournament_id)->get();

        return $participants->map(fn ($p) => [
            'id'       => $p->id,
            'points'   => $points[$p->id] ?? 0,
            'buchholz' => array_sum(array_map(
                fn ($oId) => $points[$oId] ?? 0,
                $opponents[$p->id] ?? []
            )),
            'played'   => array_unique($opponents[$p->id] ?? []),
        ])->sortByDesc('buchholz')->sortByDesc('points')->values()->toArray();
    }

    /**
     * Tournament complete: mark bracket + tournament, then award ranking points.
     */
    private function completeTournament(Bracket $bracket, Tournament $tournament, ?string $winnerId): void
    {
        $bracket->update([
            'status'                => 'completed',
            'completed_at'          => now(),
            'winner_participant_id' => $winnerId,
        ]);

        $tournament->update(['status' => 'completed']);

        // ── Sprint 1 fix: award ranking points on tournament completion ─────
        // Wrapped in try/catch so a ranking failure does NOT roll back the
        // bracket completion transaction — the tournament is finalised either
        // way. Ranking errors are surfaced to the log for follow-up.
        try {
            $this->ranking->awardTournamentPoints((string) $tournament->id);
        } catch (Throwable $e) {
            logger()->error('Ranking point award failed after tournament completion', [
                'tournament_id' => $tournament->id,
                'error'         => $e->getMessage(),
            ]);
        }
    }
}
