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
                'status'               => ($isByeA || $isByeB) ? 'bye' : 'pending',
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
    }

    // ─── Double Elimination ───────────────────────────────────────────────────

    private function generateDoubleElimination(Bracket $bracket, Collection $participants): void
    {
        // Generate winners bracket first
        $this->generateSingleElimination($bracket, $participants);

        $count        = $participants->count();
        $bracketSize  = $this->nextPowerOfTwo($count);
        $winnerRounds = (int) log($bracketSize, 2);
        $loserRounds  = ($winnerRounds - 1) * 2;
        $matchNumber  = TournamentMatch::where('bracket_id', $bracket->id)->count() + 1;

        // Losers bracket placeholder matches
        for ($r = 1; $r <= $loserRounds; $r++) {
            $matchesInRound = max(1, (int) ($bracketSize / pow(2, (int) ceil($r / 2) + 1)));
            for ($m = 0; $m < $matchesInRound; $m++) {
                TournamentMatch::create([
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
            }
        }

        // Grand final
        TournamentMatch::create([
            'bracket_id'           => $bracket->id,
            'round_number'         => $winnerRounds + $loserRounds,
            'match_number'         => $matchNumber,
            'bracket_section'      => 'grand_final',
            'participant_a_id'     => null,
            'participant_b_id'     => null,
            'participant_a_is_bye' => false,
            'participant_b_is_bye' => false,
            'status'               => 'pending',
        ]);

        $bracket->update(['total_rounds' => $winnerRounds + $loserRounds + 1]);
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
                'status'               => 'bye',
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

    private function getSeedPositions(int $size): array
    {
        // Simple sequential positions — avoids infinite loop
        return range(0, $size - 1);
    }
}
