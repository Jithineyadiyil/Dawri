<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Dispute;
use App\Models\TournamentMatch;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use RuntimeException;

/**
 * Manages the full dispute lifecycle: raise, assign, resolve, escalate.
 *
 * Replaces the inline controller logic that previously just set
 * match.status = 'disputed' with no tracking.
 */
class DisputeService
{
    /**
     * Raise a new dispute on a match.
     *
     * @param string $matchId
     * @param string $raisedByUserId
     * @param string $reason
     * @param string|null $evidencePath
     * @return Dispute
     *
     * @throws RuntimeException
     */
    public function raise(string $matchId, string $raisedByUserId, string $reason, ?string $evidencePath = null): Dispute
    {
        return DB::transaction(function () use ($matchId, $raisedByUserId, $reason, $evidencePath) {
            $match = TournamentMatch::findOrFail($matchId);

            if (! in_array($match->status, ['submitted', 'active', 'completed'], true)) {
                throw new RuntimeException("Cannot dispute a match with status: {$match->status}");
            }

            // Check if user is a participant in this match
            $participantIds = [$match->participant_a_id, $match->participant_b_id];
            $isParticipant = \App\Models\TournamentParticipant::whereIn('id', $participantIds)
                ->where('user_id', $raisedByUserId)
                ->exists();

            if (! $isParticipant) {
                throw new RuntimeException('Only match participants can raise disputes.');
            }

            // Check for existing open dispute on this match
            $existing = Dispute::where('match_id', $matchId)
                ->whereIn('status', ['open', 'under_review'])
                ->first();

            if ($existing) {
                throw new RuntimeException('A dispute is already open for this match.');
            }

            // Update match status
            $match->update(['status' => 'disputed']);

            // Auto-assign a moderator if the tournament has one
            $tournament = $match->bracket?->tournament;
            $moderatorId = $tournament?->moderator_id;

            $dispute = Dispute::create([
                'match_id'      => $matchId,
                'raised_by'     => $raisedByUserId,
                'reason'        => $reason,
                'evidence_path' => $evidencePath,
                'status'        => $moderatorId ? 'under_review' : 'open',
                'assigned_to'   => $moderatorId,
            ]);

            Log::info("Dispute raised on match {$matchId}", [
                'dispute_id' => $dispute->id,
                'raised_by'  => $raisedByUserId,
                'moderator'  => $moderatorId,
            ]);

            return $dispute;
        });
    }

    /**
     * Resolve a dispute with a final decision.
     *
     * @param string $disputeId
     * @param string $resolvedByUserId
     * @param string $resolution
     * @param string|null $winnerId  If set, overrides the match result.
     * @return Dispute
     */
    public function resolve(string $disputeId, string $resolvedByUserId, string $resolution, ?string $winnerId = null): Dispute
    {
        return DB::transaction(function () use ($disputeId, $resolvedByUserId, $resolution, $winnerId) {
            $dispute = Dispute::findOrFail($disputeId);

            if (! $dispute->isOpen()) {
                throw new RuntimeException('This dispute is already resolved.');
            }

            $dispute->update([
                'status'      => 'resolved',
                'resolved_by' => $resolvedByUserId,
                'resolution'  => $resolution,
                'resolved_at' => now(),
            ]);

            // Update match status back to active or completed
            $match = TournamentMatch::findOrFail($dispute->match_id);

            if ($winnerId !== null) {
                // Override the match result
                $match->update([
                    'winner_id' => $winnerId,
                    'status'    => 'completed',
                    'moderator_note' => "Dispute #{$dispute->id} resolved: {$resolution}",
                ]);
            } else {
                $match->update(['status' => 'active']);
            }

            Log::info("Dispute {$disputeId} resolved", [
                'resolved_by' => $resolvedByUserId,
                'winner_override' => $winnerId,
            ]);

            return $dispute;
        });
    }

    /**
     * Assign a moderator to an open dispute.
     *
     * @param string $disputeId
     * @param string $moderatorUserId
     * @return Dispute
     */
    public function assign(string $disputeId, string $moderatorUserId): Dispute
    {
        $dispute = Dispute::findOrFail($disputeId);

        if (! $dispute->isOpen()) {
            throw new RuntimeException('Cannot assign moderator to a resolved dispute.');
        }

        $dispute->update([
            'assigned_to' => $moderatorUserId,
            'status'      => 'under_review',
        ]);

        return $dispute;
    }

    /**
     * Dismiss a dispute (no action taken).
     *
     * @param string $disputeId
     * @param string $dismissedByUserId
     * @param string $reason
     * @return Dispute
     */
    public function dismiss(string $disputeId, string $dismissedByUserId, string $reason): Dispute
    {
        $dispute = Dispute::findOrFail($disputeId);

        if (! $dispute->isOpen()) {
            throw new RuntimeException('This dispute is already resolved.');
        }

        $dispute->update([
            'status'      => 'dismissed',
            'resolved_by' => $dismissedByUserId,
            'resolution'  => "Dismissed: {$reason}",
            'resolved_at' => now(),
        ]);

        // Restore match to previous state
        $match = TournamentMatch::find($dispute->match_id);
        if ($match && $match->status === 'disputed') {
            $match->update(['status' => $match->winner_id ? 'completed' : 'active']);
        }

        return $dispute;
    }
}
