<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Bracket;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

/**
 * Generates brackets for all supported tournament formats.
 * Column mapping: bracket_id, round_number, bracket_section,
 *                 participant_a_id, participant_b_id, participant_a_is_bye, participant_b_is_bye
 */
class BracketGeneratorService
{
    public function generate(Tournament $tournament): void
    {
        $participants = $tournament->participants()
            ->orderBy('seed', 'asc')
            ->get();

        if ($participants->count() < 2) {
            throw new RuntimeException('A tournament requires at least 2 participants.');
        }

        DB::transaction(function () use ($tournament, $participants): void {
            // Delete existing bracket + matches
            if ($tournament->bracket) {
                TournamentMatch::where('bracket_id', $tournament->bracket->id)->delete();
                $tournament->bracket->delete();
            }

            // Count rounds for bracket record
            $count       = $participants->count();
            $bracketSize = $this->nextPowerOfTwo($count);
            $totalRounds = (int) log($bracketSize, 2);

            // Create bracket record first
            $bracket = Bracket::create([
                'tournament_id'     => $tournament->id,
                'format'            => $tournament->format,
                'status'            => 'ongoing',
                'total_rounds'      => $totalRounds,
                'current_round'     => 1,
                'participant_count' => $count,
                'bye_count'         => $bracketSize - $count,
                'generated_at'      => now(),
            ]);

            match ($tournament->format) {
                'single_elimination' => $this->generateSingleElimination($bracket, $participants),
                'double_elimination' => $this->generateDoubleElimination($bracket, $participants),
                'round_robin'        => $this->generateRoundRobin($bracket, $participants),
                'swiss'              => $this->generateSwiss($bracket, $participants),
                default              => throw new InvalidArgumentException(
                    "Unsupported format: {$tournament->format}"
                ),
            };

            $tournament->update(['status' => 'ongoing']);
        });
    }

    // ─── Single Elimination ───────────────────────────────────────────────────

    private function generateSingleElimination(Bracket $bracket, Collection $participants): void
    {
        $count       = $participants->count();
        $bracketSize = $this->nextPowerOfTwo($count);
        $slots       = $this->buildSeededSlots($participants, $bracketSize);
        $round       = 1;
        $matchNumber = 1;

        $currentRoundMatches = [];

        for ($i = 0; $i < $bracketSize; $i += 2) {
            $pA = $slots[$i]     ?? null;
            $pB = $slots[$i + 1] ?? null;

            if ($pA === null && $pB === null) continue;

            $isByeA   = $pA === null;
            $isByeB   = $pB === null;
            $winnerId = ($isByeA || $isByeB) ? ($pA?->id ?? $pB?->id) : null;

            $match = TournamentMatch::create([
                'bracket_id'           => $bracket->id,
                'round_number'         => $round,
                'match_number'         => $matchNumber++,
                'bracket_section'      => 'winners',
                'participant_a_id'     => $pA?->id,
                'participant_b_id'     => $pB?->id,
                'participant_a_is_bye' => $isByeA,
                'participant_b_is_bye' => $isByeB,
                // 'walkover' is the canonical status for auto-advance matches.
                // The DB enum does not include 'bye' as a status value (the
                // is_bye boolean columns capture the bye fact independently),
                // so writing 'bye' triggers a truncation error on insert.
                'status'               => ($isByeA || $isByeB) ? 'walkover' : 'pending',
                'winner_id'            => $winnerId,
            ]);

            $currentRoundMatches[] = $match;
        }

        // Generate subsequent rounds (empty placeholder matches)
        while (count($currentRoundMatches) > 1) {
            $round++;
            $nextRoundMatches = [];

            for ($i = 0; $i < count($currentRoundMatches); $i += 2) {
                $m1 = $currentRoundMatches[$i];
                $m2 = $currentRoundMatches[$i + 1] ?? null;

                $newMatch = TournamentMatch::create([
                    'bracket_id'           => $bracket->id,
                    'round_number'         => $round,
                    'match_number'         => $matchNumber++,
                    'bracket_section'      => 'winners',
                    'participant_a_id'     => null,
                    'participant_b_id'     => null,
                    'participant_a_is_bye' => false,
                    'participant_b_is_bye' => false,
                    'status'               => 'pending',
                ]);

                // Link previous matches to this one
                $m1->update(['next_match_id' => $newMatch->id]);
                $m2?->update(['next_match_id' => $newMatch->id]);

                $nextRoundMatches[] = $newMatch;
            }

            $currentRoundMatches = $nextRoundMatches;
        }

        // ── Walkover propagation pass ───────────────────────────────────────
        // After all rounds are built and linked, walk every walkover match
        // (R1 byes) and push its winner into the next match's open slot.
        // Without this pass, walkover winners would never propagate because
        // the BracketAdvancementService::advance() method is only invoked
        // by API result-confirmation calls — bye matches never trigger one.
        // This must happen ONCE per walkover and ONLY here (not inline at
        // create-time) to avoid double-writes when advance() later runs on
        // sibling matches in the same R2 placeholder.
        $this->propagateWalkoverWinners($bracket->id);
    }

    /**
     * Walks all walkover matches in a bracket, pushing each winner forward
     * into its `next_match_id`'s next open slot. This mirrors what
     * BracketAdvancementService::fillParticipantSlot does, but is invoked
     * only once at generation time so byes are never stuck behind a missing
     * advance() call. Idempotent: safe to call after every bracket build.
     *
     * Chains are handled by iterating multiple passes — if propagating a
     * walkover winner produces a new match where both slots are now filled
     * with walkover winners (an unlikely but possible 2-vs-2 byes case),
     * that new match itself does NOT auto-resolve — it stays pending and
     * is played normally by the participants.
     */
    private function propagateWalkoverWinners(string $bracketId): void
    {
        $walkovers = TournamentMatch::where('bracket_id', $bracketId)
            ->where('status', 'walkover')
            ->whereNotNull('winner_id')
            ->whereNotNull('next_match_id')
            ->orderBy('round_number')
            ->orderBy('match_number')
            ->get();

        foreach ($walkovers as $walkover) {
            $next = TournamentMatch::find($walkover->next_match_id);
            if (! $next) continue;

            // Push the walkover winner into the first available slot.
            // Re-read fresh fields each time to handle the case where another
            // walkover already filled slot A in this same iteration.
            if ($next->participant_a_id === null) {
                $next->participant_a_id = $walkover->winner_id;
            } elseif ($next->participant_b_id === null
                   && $next->participant_a_id !== $walkover->winner_id) {
                // Defensive guard: refuse to write the same player into both
                // slots (this would happen if buggy code routed two distinct
                // walkovers to the same target; with proper seeding it should
                // never occur, but the guard prevents silent corruption).
                $next->participant_b_id = $walkover->winner_id;
            }
            $next->save();
        }
    }

    // ─── Double Elimination ───────────────────────────────────────────────────

    /**
     * Build a properly-wired Double Elimination bracket.
     *
     * Structure for N participants (N rounded up to next power of 2):
     *
     *   • Winners Bracket (WB): log2(N) rounds, standard SE
     *   • Losers Bracket  (LB): 2 * log2(N) - 1 rounds.
     *       LB alternates "drop" rounds (WB losers join) and
     *       "consolidation" rounds (LB winners advance among themselves).
     *   • Grand Final: WB champion vs LB champion.
     *
     * Wiring:
     *   • Each WB match's `next_match_id` → next WB round (built by SE generator).
     *   • Each WB match's `loser_next_match_id` → the LB drop slot for that round.
     *   • Each LB match's `next_match_id` → next LB round, OR the GF for the last LB round.
     *   • The WB-final's `next_match_id` → the GF.
     *
     * Match numbering is sequential across the whole bracket: WB matches first
     * (already created by generateSingleElimination), then LB matches in
     * round/slot order, then the GF as the last match.
     */
    private function generateDoubleElimination(Bracket $bracket, Collection $participants): void
    {
        // ── Step 1: WB built by SE generator (creates WB matches with next_match_id wiring)
        $this->generateSingleElimination($bracket, $participants);

        $count        = $participants->count();
        $bracketSize  = $this->nextPowerOfTwo($count);
        $winnerRounds = (int) log($bracketSize, 2);

        // ── Step 2: collect WB matches by round
        // We need them ordered to wire loser_next_match_id correctly.
        $wbMatches = TournamentMatch::where('bracket_id', $bracket->id)
            ->where('bracket_section', 'winners')
            ->orderBy('round_number')
            ->orderBy('match_number')
            ->get()
            ->groupBy('round_number');

        // ── Step 3: compute LB structure
        // For winnerRounds = R, LB has 2R - 1 rounds (when R >= 2).
        // - Odd LB rounds (1, 3, 5, ...) are "drop" rounds — slots filled
        //   by NEW losers from a WB round (and from previous LB winners).
        // - Even LB rounds are "consolidation" rounds — only LB winners.
        //
        // 8p (R=3) example, 5 LB rounds:
        //   LB R1: 2 matches — paired WB-R1 losers (4 → 2)
        //   LB R2: 2 matches — LB-R1 winners vs WB-R2 losers
        //   LB R3: 1 match  — LB-R2 winners (2 → 1)
        //   LB R4: 1 match  — LB-R3 winner vs WB-R3 loser (= WB final loser)
        //   LB R5: omitted for R=3 because LB-R4 winner goes straight to GF
        //
        // 4p (R=2) example, 3 LB rounds:
        //   LB R1: 1 match  — paired WB-R1 losers (2 → 1)
        //   LB R2: 1 match  — LB-R1 winner vs WB-R2 loser (= WB final loser)
        //   LB R3: omitted; LB-R2 winner goes straight to GF
        //
        // Match-count formula per LB round:
        //   r=1:           wbR1Losers / 2          (= bracketSize / 4)
        //   r=2k (k>=1):   matches in r=(2k-1)     (LB winners + new WB losers, paired)
        //   r=2k+1:        matches in r=2k / 2     (LB winners only, paired)
        $lbRoundSizes = $this->computeLbRoundSizes($winnerRounds);
        $lbRoundCount = count($lbRoundSizes);

        // Avoid degenerate cases (single WB match → no LB needed; rare in practice).
        if ($winnerRounds < 1) {
            $bracket->update(['total_rounds' => $winnerRounds]);
            return;
        }

        // ── Step 4: create LB placeholder matches in round/slot order
        $matchNumber = TournamentMatch::where('bracket_id', $bracket->id)->count() + 1;
        $lbMatchesByRound = [];

        for ($r = 1; $r <= $lbRoundCount; $r++) {
            $lbMatchesByRound[$r] = [];
            for ($slot = 0; $slot < $lbRoundSizes[$r]; $slot++) {
                $m = TournamentMatch::create([
                    'bracket_id'           => $bracket->id,
                    'round_number'         => $r,
                    'match_number'         => $matchNumber++,
                    'bracket_section'      => 'losers',
                    'participant_a_id'     => null,
                    'participant_b_id'     => null,
                    'participant_a_is_bye' => false,
                    'participant_b_is_bye' => false,
                    'status'               => 'pending',
                ]);
                $lbMatchesByRound[$r][] = $m;
            }
        }

        // ── Step 5: create grand_final (single match), placed at round = winnerRounds + lbRoundCount + 1
        $gfRound = $winnerRounds + $lbRoundCount + 1;
        $gf = TournamentMatch::create([
            'bracket_id'           => $bracket->id,
            'round_number'         => $gfRound,
            'match_number'         => $matchNumber,
            'bracket_section'      => 'grand_final',
            'participant_a_id'     => null,
            'participant_b_id'     => null,
            'participant_a_is_bye' => false,
            'participant_b_is_bye' => false,
            'status'               => 'pending',
        ]);

        // ── Step 6: wire LB next_match_id pointers
        // - Drop rounds (odd r): winners go to next round (consolidation r+1).
        //   But for the LAST LB round (a consolidation), winner goes to GF.
        // - Consolidation rounds (even r): winners go to next drop round (r+1).
        //   But again, LAST LB round → GF.
        for ($r = 1; $r <= $lbRoundCount; $r++) {
            $isLastLbRound = ($r === $lbRoundCount);
            $nextRoundMatches = $isLastLbRound ? [$gf] : ($lbMatchesByRound[$r + 1] ?? []);

            foreach ($lbMatchesByRound[$r] as $idx => $lbMatch) {
                if ($isLastLbRound) {
                    // Single LB match → GF
                    $lbMatch->update(['next_match_id' => $gf->id]);
                    continue;
                }

                // Drop rounds: pair-up — LB R1 match[0] and match[1] both feed
                // LB R2 (consolidation r=2) at different slots? No — actually
                // in our model R1 (drop) winners ENTER R2 (consolidation) where
                // they meet WB-R2 losers. So each R1 match feeds one R2 slot.
                //
                // Consolidation rounds: winners pair up — match[0] and match[1]
                // both feed the same r+1 (drop) match.
                //
                // Simpler rule that works for both: $idx % count(nextRound) maps
                // current LB match to its target. For drop→consolidation (1:1
                // when sizes equal), each idx feeds idx. For consolidation→drop
                // (when next round has half the matches), each idx feeds idx/2.
                $targetIdx = (int) floor($idx * count($nextRoundMatches) / count($lbMatchesByRound[$r]));
                $lbMatch->update(['next_match_id' => $nextRoundMatches[$targetIdx]->id]);
            }
        }

        // ── Step 7: wire WB → LB drops (loser_next_match_id) AND wire WB final → GF
        // Mapping by WB round:
        //   WB R1 losers → LB R1 (drop). Two WB losers per LB R1 match.
        //   WB R_k (k>=2) losers → LB R_(2k-2) (drop round). One WB loser per LB slot.
        //   WB final winner → GF (next_match_id, not loser).
        for ($wbRound = 1; $wbRound <= $winnerRounds; $wbRound++) {
            $isWbFinal = ($wbRound === $winnerRounds);
            $lbDropRound = ($wbRound === 1) ? 1 : (2 * $wbRound - 2);
            $dropMatches = $lbMatchesByRound[$lbDropRound] ?? [];

            foreach ($wbMatches[$wbRound] as $wbIdx => $wbMatch) {
                if ($isWbFinal) {
                    // WB final winner goes to GF (overrides the SE generator's
                    // null next_match_id from "no next round" assumption).
                    $wbMatch->update(['next_match_id' => $gf->id]);
                }

                // Wire loser drop. For WB R1, two losers pair into each LB R1
                // match: WB matches 0 and 1 → LB R1 match 0; WB matches 2 and 3
                // → LB R1 match 1; etc.
                if (! empty($dropMatches)) {
                    if ($wbRound === 1) {
                        $targetIdx = (int) floor($wbIdx / 2);
                    } else {
                        $targetIdx = $wbIdx % count($dropMatches);
                    }
                    if (isset($dropMatches[$targetIdx])) {
                        $wbMatch->update(['loser_next_match_id' => $dropMatches[$targetIdx]->id]);
                    }
                }
            }
        }

        // ── Step 8: update bracket totals
        $bracket->update(['total_rounds' => $gfRound]);
    }

    /**
     * Returns the number of matches in each LB round, indexed by round number (1-based).
     *
     * Pattern for winnerRounds R:
     *   - LB R1 has bracketSize/4 matches (paired WB R1 losers)
     *   - For each subsequent WB round k (2..R), LB gains a drop round and a consolidation round
     *
     * For R=2 (4p):  [1=>1, 2=>1, 3=>1] — but actually only 2 LB rounds needed (drop + final consolidation/drop)
     * For R=3 (8p):  [1=>2, 2=>2, 3=>1, 4=>1]
     * For R=4 (16p): [1=>4, 2=>4, 3=>2, 4=>2, 5=>1, 6=>1]
     *
     * @return array<int,int> 1-indexed array of match counts per LB round
     */
    private function computeLbRoundSizes(int $winnerRounds): array
    {
        if ($winnerRounds < 2) {
            return []; // 2-player tournament — no LB needed
        }

        $sizes = [];
        $currentSize = (int) pow(2, $winnerRounds - 2); // LB R1 size

        // For each WB round 2..R, we add 2 LB rounds (drop + consolidation)
        // EXCEPT the last pair — the "consolidation" after the final WB-loser drop
        // doesn't exist (the LB winner goes straight to GF).
        $r = 1;
        $sizes[$r++] = $currentSize;

        for ($wbRound = 2; $wbRound <= $winnerRounds; $wbRound++) {
            // Drop round: same size as previous (LB winners pair with new WB losers)
            $sizes[$r++] = $currentSize;

            if ($wbRound < $winnerRounds) {
                // Consolidation round: half the size (LB winners pair among themselves)
                $currentSize = max(1, (int) ($currentSize / 2));
                $sizes[$r++] = $currentSize;
            }
        }

        return $sizes;
    }

    // ─── Round Robin ──────────────────────────────────────────────────────────

    private function generateRoundRobin(Bracket $bracket, Collection $participants): void
    {
        $list = $participants->values()->all();
        $n    = count($list);

        if ($n % 2 !== 0) {
            $list[] = null; // bye
            $n++;
        }

        $rounds      = $n - 1;
        $matchNumber = 1;

        for ($round = 1; $round <= $rounds; $round++) {
            for ($i = 0; $i < $n / 2; $i++) {
                $pA = $list[$i];
                $pB = $list[$n - 1 - $i];

                if ($pA === null || $pB === null) continue;

                TournamentMatch::create([
                    'bracket_id'           => $bracket->id,
                    'round_number'         => $round,
                    'match_number'         => $matchNumber++,
                    'bracket_section'      => 'round_robin',
                    'participant_a_id'     => $pA->id,
                    'participant_b_id'     => $pB->id,
                    'participant_a_is_bye' => false,
                    'participant_b_is_bye' => false,
                    'status'               => 'pending',
                ]);
            }

            // Rotate (keep first fixed)
            $fixed = array_shift($list);
            $last  = array_pop($list);
            array_unshift($list, $last);
            array_unshift($list, $fixed);
        }

        $bracket->update(['total_rounds' => $rounds]);
    }

    // ─── Swiss ────────────────────────────────────────────────────────────────

    private function generateSwiss(Bracket $bracket, Collection $participants): void
    {
        $list        = $participants->shuffle()->values()->all();
        $matchNumber = 1;

        for ($i = 0; $i + 1 < count($list); $i += 2) {
            TournamentMatch::create([
                'bracket_id'           => $bracket->id,
                'round_number'         => 1,
                'match_number'         => $matchNumber++,
                'bracket_section'      => 'swiss',
                'participant_a_id'     => $list[$i]->id,
                'participant_b_id'     => $list[$i + 1]->id,
                'participant_a_is_bye' => false,
                'participant_b_is_bye' => false,
                'status'               => 'pending',
            ]);
        }

        // Odd participant gets a bye
        if (count($list) % 2 !== 0) {
            $last = $list[count($list) - 1];
            TournamentMatch::create([
                'bracket_id'           => $bracket->id,
                'round_number'         => 1,
                'match_number'         => $matchNumber,
                'bracket_section'      => 'swiss',
                'participant_a_id'     => $last->id,
                'participant_b_id'     => null,
                'participant_a_is_bye' => false,
                'participant_b_is_bye' => true,
                // See SE generator note: 'bye' is not in the status enum.
                'status'               => 'walkover',
                'winner_id'            => $last->id,
            ]);
        }

        $totalRounds = $bracket->tournament->swiss_rounds ?? ceil(log($participants->count(), 2));
        $bracket->update(['total_rounds' => $totalRounds]);
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private function nextPowerOfTwo(int $n): int
    {
        $power = 1;
        while ($power < $n) $power *= 2;
        return $power;
    }

    private function buildSeededSlots(Collection $participants, int $bracketSize): array
    {
        $slots     = array_fill(0, $bracketSize, null);
        $positions = $this->getSeedPositions($bracketSize);

        foreach ($participants->values() as $index => $participant) {
            if (isset($positions[$index])) {
                $slots[$positions[$index]] = $participant;
            }
        }

        return $slots;
    }

    /**
     * Returns slot positions for seeds (0-indexed) in a bracket of $size slots.
     *
     * Implements the standard NCAA-style tournament seeding so that:
     *   - The top seed (idx 0) is at slot 0, the next seed faces the lowest seed
     *   - Bracket halves are balanced — top seeds 1 and 2 can only meet in the final
     *   - When N participants < bracket size, the trailing "phantom" seeds become
     *     byes and are paired against the top seeds (so seed 1 gets a R1 bye if any)
     *
     * Returns: array<int,int>  where key = participant index (seed - 1), value = slot index.
     *
     * Examples:
     *   size=4  → [0=>0, 1=>3, 2=>1, 3=>2]  // R1 pairings: (1v4, 2v3)
     *   size=8  → [0=>0, 1=>7, 2=>3, 3=>4, 4=>1, 5=>6, 6=>2, 7=>5]
     *   size=16 → 1,16,8,9,4,13,5,12,2,15,7,10,3,14,6,11
     *
     * Recursive rule: for size 2N, each seed s in size N expands to [s, 2N+1-s].
     */
    private function getSeedPositions(int $size): array
    {
        if ($size === 1) {
            return [0 => 0];
        }
        if ($size === 2) {
            return [0 => 0, 1 => 1];
        }

        // Build slot order: $seedOrder[slotIdx] = the seed number (1-indexed) at that slot
        $seedOrder = [1, 2];
        $current   = 2;

        while ($current < $size) {
            $newSize  = $current * 2;
            $newOrder = [];
            foreach ($seedOrder as $seedAt) {
                $newOrder[] = $seedAt;
                $newOrder[] = $newSize + 1 - $seedAt;
            }
            $seedOrder = $newOrder;
            $current   = $newSize;
        }

        // Invert: positions[seedIdx] = slotIdx
        $positions = [];
        foreach ($seedOrder as $slotIdx => $seedNum) {
            $positions[$seedNum - 1] = $slotIdx;
        }

        return $positions;
    }
}
