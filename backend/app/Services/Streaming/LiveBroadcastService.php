<?php

declare(strict_types=1);

namespace App\Services\Streaming;

use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\User;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\Exceptions\StreamingException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * LiveBroadcastService — orchestrates the full lifecycle of a Dawri-managed
 * YouTube broadcast.
 *
 * Responsibilities:
 *   • Create broadcast + stream, bind them, persist credentials
 *   • Transition lifecycle (testing → live → complete)
 *   • Update the corresponding tournament_match.stream_url on success
 *     so existing embed logic keeps working
 *   • Wrap each YouTube API failure in a DB transaction; never leave a
 *     half-created broadcast row with an empty yt_broadcast_id
 *
 * This service does NOT decide authorization — that's the controller's job.
 */
final class LiveBroadcastService
{
    public function __construct(
        private readonly YouTubeStreamingService $youtube,
        private readonly LiveBroadcastRepositoryInterface $repo,
    ) {}

    /**
     * Create a new broadcast attached to a tournament match.
     *
     * Flow:
     *   1. POST /liveBroadcasts          → get broadcastId
     *   2. POST /liveStreams             → get streamId + RTMP creds
     *   3. POST /liveBroadcasts/bind     → link them
     *   4. INSERT live_broadcasts row    → status=ready
     *   5. UPDATE tournament_matches.stream_url = watch_url
     *
     * If step 2 or 3 fails, step 1's broadcast is deleted to avoid orphans.
     *
     * @param array{
     *   title:string,
     *   description?:?string,
     *   privacy?:string,
     *   source?:string,
     *   trigger?:string,
     *   scheduled_start_at?:?Carbon,
     * } $opts
     *
     * @throws StreamingException
     */
    public function createForMatch(TournamentMatch $match, User $actor, array $opts): LiveBroadcast
    {
        // Reuse an active broadcast if one exists — idempotent endpoint.
        $existing = $this->repo->findByMatch($match->id);
        if ($existing !== null) {
            return $existing;
        }

        $title       = $opts['title'];
        $description = $opts['description'] ?? null;
        $privacy     = $opts['privacy'] ?? (string) config('services.youtube.default_privacy', 'public');
        $source      = $opts['source'] ?? LiveBroadcast::SOURCE_OBS;
        $trigger     = $opts['trigger'] ?? LiveBroadcast::TRIGGER_MANUAL;
        $startAt     = $opts['scheduled_start_at'] ?? Carbon::now()->addMinutes(5);

        return $this->createBroadcastTransactional(
            actor: $actor,
            title: $title,
            description: $description,
            privacy: $privacy,
            source: $source,
            trigger: $trigger,
            scheduledStartAt: $startAt,
            match: $match,
            tournament: null,
        );
    }

    /**
     * Create a tournament-level broadcast (not tied to a single match).
     *
     * @param array{
     *   title:string,
     *   description?:?string,
     *   privacy?:string,
     *   source?:string,
     *   trigger?:string,
     *   scheduled_start_at?:?Carbon,
     * } $opts
     *
     * @throws StreamingException
     */
    public function createForTournament(Tournament $tournament, User $actor, array $opts): LiveBroadcast
    {
        $existing = $this->repo->findByTournament($tournament->id);
        if ($existing !== null) {
            return $existing;
        }

        $title       = $opts['title'];
        $description = $opts['description'] ?? null;
        $privacy     = $opts['privacy'] ?? (string) config('services.youtube.default_privacy', 'public');
        $source      = $opts['source'] ?? LiveBroadcast::SOURCE_OBS;
        $trigger     = $opts['trigger'] ?? LiveBroadcast::TRIGGER_MANUAL;
        $startAt     = $opts['scheduled_start_at'] ?? Carbon::now()->addMinutes(5);

        return $this->createBroadcastTransactional(
            actor: $actor,
            title: $title,
            description: $description,
            privacy: $privacy,
            source: $source,
            trigger: $trigger,
            scheduledStartAt: $startAt,
            match: null,
            tournament: $tournament,
        );
    }

    /**
     * Move a broadcast to "live" status. Caller must ensure the organizer
     * has actually started pushing video to the RTMP endpoint — YouTube
     * returns 403 if no signal is detected.
     *
     * @throws StreamingException
     */
    public function goLive(LiveBroadcast $broadcast): LiveBroadcast
    {
        if ($broadcast->isTerminal()) {
            throw new StreamingException(
                StreamingException::INVALID_TRANSITION,
                "Broadcast {$broadcast->id} is in terminal state '{$broadcast->status}'",
            );
        }

        $this->youtube->transition($broadcast->yt_broadcast_id, 'live');

        return $this->repo->update($broadcast, [
            'status'          => LiveBroadcast::STATUS_LIVE,
            'actual_start_at' => Carbon::now(),
        ]);
    }

    /**
     * End a broadcast and finalise the archive video.
     *
     * @throws StreamingException
     */
    public function complete(LiveBroadcast $broadcast): LiveBroadcast
    {
        if ($broadcast->isTerminal()) {
            return $broadcast;
        }

        $this->youtube->transition($broadcast->yt_broadcast_id, 'complete');

        return $this->repo->update($broadcast, [
            'status'        => LiveBroadcast::STATUS_COMPLETE,
            'actual_end_at' => Carbon::now(),
        ]);
    }

    /**
     * Cancel a broadcast that never went live. Deletes the YouTube
     * resource as well so it doesn't clutter the channel.
     *
     * @throws StreamingException
     */
    public function cancel(LiveBroadcast $broadcast): void
    {
        if (! $broadcast->isLive()) {
            try {
                $this->youtube->deleteBroadcast($broadcast->yt_broadcast_id);
            } catch (StreamingException $e) {
                // Best-effort: log but don't fail the local cleanup.
                Log::warning('Failed to delete YouTube broadcast on cancel', [
                    'broadcast_id' => $broadcast->id,
                    'yt_id'        => $broadcast->yt_broadcast_id,
                    'error'        => $e->getMessage(),
                ]);
            }
        }

        $this->repo->update($broadcast, [
            'status'        => LiveBroadcast::STATUS_FAILED,
            'actual_end_at' => Carbon::now(),
            'last_error'    => 'cancelled_by_user',
        ]);

        $this->repo->delete($broadcast);
    }

    /* ───────────────── private helpers ─────────────────────────────── */

    /**
     * Heart of the create flow. Wrapped in a DB transaction so a failure
     * mid-way doesn't leave a broadcast with no RTMP credentials.
     *
     * @throws StreamingException
     */
    private function createBroadcastTransactional(
        User $actor,
        string $title,
        ?string $description,
        string $privacy,
        string $source,
        string $trigger,
        Carbon $scheduledStartAt,
        ?TournamentMatch $match,
        ?Tournament $tournament,
    ): LiveBroadcast {
        // ── Step 1+2+3 happen against YouTube (NOT inside DB transaction) ──
        $broadcast = $this->youtube->createBroadcast($title, $description, $privacy, $scheduledStartAt);

        try {
            $stream = $this->youtube->createStream($title);
            $this->youtube->bindStreamToBroadcast($broadcast->broadcastId, $stream['stream_id']);
        } catch (Throwable $e) {
            // Roll back the YouTube broadcast so we don't leave orphans.
            try {
                $this->youtube->deleteBroadcast($broadcast->broadcastId);
            } catch (Throwable) {
                // Best-effort cleanup.
            }
            throw $e instanceof StreamingException ? $e : new StreamingException(
                StreamingException::STREAM_BIND_FAILED,
                'Stream creation/binding failed: ' . $e->getMessage(),
                [],
                $e,
            );
        }

        // ── Step 4+5 in DB transaction ───────────────────────────────────
        return DB::transaction(function () use (
            $broadcast, $stream, $actor, $description, $privacy,
            $source, $trigger, $scheduledStartAt, $match, $tournament
        ): LiveBroadcast {
            /** @var LiveBroadcast $row */
            $row = $this->repo->create([
                'tournament_id'      => $tournament?->id ?? $match?->bracket?->tournament_id,
                'match_id'           => $match?->id,
                'created_by'         => $actor->id,
                'yt_broadcast_id'    => $broadcast->broadcastId,
                'yt_stream_id'       => $stream['stream_id'],
                'yt_channel_id'      => $broadcast->channelId,
                'title'              => $broadcast->title,
                'description'        => $description,
                'privacy'            => $privacy,
                'rtmp_url'           => $stream['rtmp_url'],
                'stream_key_enc'     => $stream['stream_key'],     // cast handles encryption
                'watch_url'          => $broadcast->watchUrl,
                'embed_url'          => $broadcast->embedUrl,
                'status'             => LiveBroadcast::STATUS_READY,
                'source'             => $source,
                'trigger'            => $trigger,
                'scheduled_start_at' => $scheduledStartAt,
            ]);

            // Mirror watch URL into the match.stream_url column so existing
            // Option-A embed logic on /matches/{id} pages keeps working.
            if ($match !== null) {
                $match->forceFill(['stream_url' => $broadcast->watchUrl])->save();
            }

            return $row;
        });
    }
}
