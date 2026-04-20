<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\MatchRescheduleRequest;
use App\Models\TournamentMatch;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * MatchSchedulingService — match schedule & reschedule orchestration.
 *
 * Responsibilities:
 *   • Direct scheduling (organizer/admin): writes scheduled_at on the match.
 *   • Reschedule proposals: a participant proposes a new time; the other
 *     participant must accept. Organizer/admin can override consensus.
 *   • Cancellation by the original requester.
 *   • Authorization is enforced by the controller; this service assumes
 *     the caller has already been verified.
 *
 * Status transitions enforced:
 *   pending ─→ accepted | rejected | cancelled | overridden
 *   (terminal statuses cannot transition again)
 *
 * Race-safe via DB transaction + pessimistic lock on the match row during
 * any schedule mutation.
 */
class MatchSchedulingService
{
    /**
     * Directly set / update the scheduled_at on a match.
     * Called by the organizer-schedule endpoint (no counter-party consent needed).
     *
     * Side-effects:
     *   • Cancels any pending reschedule request (a direct reschedule supersedes it).
     *   • If the match was 'pending', transitions it to 'scheduled'.
     *
     * @param  TournamentMatch $match
     * @param  Carbon          $at     When the match should be played.
     * @param  User            $by     Who set the schedule (for audit trail).
     * @throws RuntimeException If the match is completed/disputed.
     */
    public function setSchedule(TournamentMatch $match, Carbon $at, User $by): TournamentMatch
    {
        return DB::transaction(function () use ($match, $at, $by): TournamentMatch {
            /** @var TournamentMatch $locked */
            $locked = TournamentMatch::whereKey($match->id)->lockForUpdate()->firstOrFail();

            if (in_array($locked->status, ['completed', 'walkover'], true)) {
                throw new RuntimeException('Cannot reschedule a completed match.');
            }

            // Cancel any pending request — an authoritative reschedule wins.
            MatchRescheduleRequest::where('match_id', $locked->id)
                ->where('status', MatchRescheduleRequest::STATUS_PENDING)
                ->update([
                    'status'          => MatchRescheduleRequest::STATUS_CANCELLED,
                    'responded_by_id' => $by->id,
                    'responded_at'    => now(),
                ]);

            $locked->update([
                'scheduled_at'     => $at,
                'scheduled_by_id'  => $by->id,
                'status'           => $locked->status === 'pending' ? 'scheduled' : $locked->status,
            ]);

            return $locked->refresh();
        });
    }

    /**
     * Participant proposes a new match time. Cancels any prior pending
     * request from the same user on the same match, so only one pending
     * request from a given player is active at a time.
     *
     * @throws RuntimeException If the match is already completed, or the proposed time is in the past.
     */
    public function requestReschedule(
        TournamentMatch $match,
        User $requester,
        Carbon $proposedAt,
        ?string $reason = null,
    ): MatchRescheduleRequest {
        if ($proposedAt->isPast()) {
            throw new RuntimeException('Proposed time must be in the future.');
        }

        if (in_array($match->status, ['completed', 'walkover'], true)) {
            throw new RuntimeException('Cannot reschedule a completed match.');
        }

        return DB::transaction(function () use ($match, $requester, $proposedAt, $reason) {
            // Cancel this user's prior pending request for this match.
            MatchRescheduleRequest::where('match_id', $match->id)
                ->where('requested_by_id', $requester->id)
                ->where('status', MatchRescheduleRequest::STATUS_PENDING)
                ->update([
                    'status'          => MatchRescheduleRequest::STATUS_CANCELLED,
                    'responded_by_id' => $requester->id,
                    'responded_at'    => now(),
                ]);

            return MatchRescheduleRequest::create([
                'match_id'        => $match->id,
                'requested_by_id' => $requester->id,
                'proposed_at'     => $proposedAt,
                'reason'          => $reason,
                'status'          => MatchRescheduleRequest::STATUS_PENDING,
            ]);
        });
    }

    /**
     * The opposing participant accepts or rejects the proposal.
     * On accept: updates the match's scheduled_at.
     *
     * @throws RuntimeException If request isn't pending or the responder is invalid.
     */
    public function respondReschedule(
        MatchRescheduleRequest $request,
        User $responder,
        bool $accept,
    ): MatchRescheduleRequest {
        return DB::transaction(function () use ($request, $responder, $accept): MatchRescheduleRequest {
            /** @var MatchRescheduleRequest $locked */
            $locked = MatchRescheduleRequest::whereKey($request->id)->lockForUpdate()->firstOrFail();

            if (! $locked->isPending()) {
                throw new RuntimeException('This reschedule request is no longer pending.');
            }

            if ($locked->requested_by_id === $responder->id) {
                throw new RuntimeException('You cannot respond to your own reschedule request.');
            }

            $locked->update([
                'status'          => $accept
                    ? MatchRescheduleRequest::STATUS_ACCEPTED
                    : MatchRescheduleRequest::STATUS_REJECTED,
                'responded_by_id' => $responder->id,
                'responded_at'    => now(),
            ]);

            if ($accept) {
                $this->setSchedule($locked->match, $locked->proposed_at, $responder);
            }

            return $locked->refresh();
        });
    }

    /**
     * Organizer / admin overrides the dual-accept requirement.
     * If $accept is true, the proposed time is applied immediately.
     *
     * @throws RuntimeException If the request is not pending.
     */
    public function organizerOverride(
        MatchRescheduleRequest $request,
        User $organizer,
        bool $accept,
    ): MatchRescheduleRequest {
        return DB::transaction(function () use ($request, $organizer, $accept): MatchRescheduleRequest {
            /** @var MatchRescheduleRequest $locked */
            $locked = MatchRescheduleRequest::whereKey($request->id)->lockForUpdate()->firstOrFail();

            if (! $locked->isPending()) {
                throw new RuntimeException('This reschedule request is no longer pending.');
            }

            $locked->update([
                'status'                 => MatchRescheduleRequest::STATUS_OVERRIDDEN,
                'responded_by_id'        => $organizer->id,
                'responded_at'           => now(),
                'was_organizer_override' => true,
            ]);

            if ($accept) {
                $this->setSchedule($locked->match, $locked->proposed_at, $organizer);
            }

            return $locked->refresh();
        });
    }

    /**
     * Requester cancels their own pending request.
     *
     * @throws RuntimeException If the request is not pending or not owned by $user.
     */
    public function cancelReschedule(MatchRescheduleRequest $request, User $user): MatchRescheduleRequest
    {
        return DB::transaction(function () use ($request, $user): MatchRescheduleRequest {
            /** @var MatchRescheduleRequest $locked */
            $locked = MatchRescheduleRequest::whereKey($request->id)->lockForUpdate()->firstOrFail();

            if (! $locked->isPending()) {
                throw new RuntimeException('Only pending requests can be cancelled.');
            }

            $isOwner    = $locked->requested_by_id === $user->id;
            $isOrganizer = in_array($user->role ?? '', ['organizer', 'admin'], true);

            if (! $isOwner && ! $isOrganizer) {
                throw new RuntimeException('Only the requester or an organizer can cancel this request.');
            }

            $locked->update([
                'status'          => MatchRescheduleRequest::STATUS_CANCELLED,
                'responded_by_id' => $user->id,
                'responded_at'    => now(),
            ]);

            return $locked->refresh();
        });
    }
}
