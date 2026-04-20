<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Bracket;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\TournamentParticipant;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Advances winners after a match result is recorded.
 * Uses correct schema: bracket_id, round_number, bracket_section,
 * participant_a_id, participant_b_id, next_match_id
 */
class BracketAdvancementService
{
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
        // Use next_match_id linkage built during generation
        if ($match->next_match_id) {
            $nextMatch = TournamentMatch::find($match->next_match_id);
            if ($nextMatch) {
                $this->fillParticipantSlot($nextMatch, $match->winner_id);
            }
        } else {
            // No next match — this was the final
            $this->completeTournament($bracket, $tournament, $match->winner_id);
        }
    }

    // ─── Double Elimination ───────────────────────────────────────────────────

    private function advanceDE(TournamentMatch $match, Bracket $bracket, Tournament $tournament): void
    {
        // Advance winner
        $this->advanceSE($match, $bracket, $tournament);

        // Drop loser to losers bracket (only from winners bracket matches)
        if ($match->bracket_section === 'winners') {
            $loserId = ($match->winner_id === $match->participant_a_id)
                ? $match->participant_b_id
                : $match->participant_a_id;

            if ($loserId === null) return;

            $nextLosers = TournamentMatch::where('bracket_id', $bracket->id)
                ->where('bracket_section', 'losers')
                ->where(function ($q) {
                    $q->whereNull('participant_a_id')
                      ->orWhereNull('participant_b_id');
                })
                ->orderBy('round_number')
                ->orderBy('match_number')
                ->first();

            if ($nextLosers) {
                $this->fillParticipantSlot($nextLosers, $loserId);
            }
        }

        // Check if grand final is complete
        $pending = TournamentMatch::where('bracket_id', $bracket->id)
            ->whereIn('status', ['pending', 'ongoing'])
            ->count();

        if ($pending === 0) {
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

        if ($pendingInRound > 0) return;

        $totalRounds = $bracket->total_rounds
            ?? $tournament->swiss_rounds
            ?? (int) ceil(log(max($bracket->participant_count, 2), 2));

        if ($currentRound >= $totalRounds) {
            $this->completeTournament($bracket, $tournament, null);
            return;
        }

        // Update bracket current round
        $bracket->update(['current_round' => $currentRound + 1]);

        // Generate next Swiss round
        $standings   = $this->buildSwissStandings($bracket);
        $matchNumber = TournamentMatch::where('bracket_id', $bracket->id)->count() + 1;
        $unpaired    = $standings;

        while (count($unpaired) >= 2) {
            $p1 = array_shift($unpaired);
            $opponentIndex = null;
            foreach ($unpaired as $idx => $p2) {
                if (!in_array($p2['id'], $p1['played'], true)) {
                    $opponentIndex = $idx;
                    break;
                }
            }
            if ($opponentIndex === null) $opponentIndex = 0;
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
                'status'               => 'bye',
                'winner_id'            => $bye['id'],
            ]);
        }
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private function fillParticipantSlot(TournamentMatch $match, string $participantId): void
    {
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

    private function buildSwissStandings(Bracket $bracket): array
    {
        $matches   = TournamentMatch::where('bracket_id', $bracket->id)
            ->whereNotNull('winner_id')
            ->get();

        $points    = [];
        $opponents = [];

        foreach ($matches as $m) {
            if ($m->status === 'bye') {
                $points[$m->participant_a_id] = ($points[$m->participant_a_id] ?? 0) + 1;
                continue;
            }
            $winner = $m->winner_id;
            $loser  = ($winner === $m->participant_a_id) ? $m->participant_b_id : $m->participant_a_id;
            $points[$winner] = ($points[$winner] ?? 0) + 1;
            $points[$loser]  = ($points[$loser]  ?? 0);
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

    private function completeTournament(Bracket $bracket, Tournament $tournament, ?string $winnerId): void
    {
        $bracket->update([
            'status'                 => 'completed',
            'completed_at'           => now(),
            'winner_participant_id'  => $winnerId,
        ]);
        $tournament->update(['status' => 'completed']);
    }
}
