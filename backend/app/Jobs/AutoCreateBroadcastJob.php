<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\TournamentMatch;
use App\Models\User;
use App\Services\Streaming\Exceptions\StreamingException;
use App\Services\Streaming\LiveBroadcastService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

/**
 * AutoCreateBroadcastJob — automatically provisions a YouTube broadcast for
 * a tournament match, used by "featured" tournaments where every match is
 * meant to be streamed without organizer involvement.
 *
 * Dispatch this from your match scheduling flow:
 *
 *   if ($tournament->is_featured) {
 *       AutoCreateBroadcastJob::dispatch($match->id)
 *           ->delay($match->scheduled_at->subMinutes(15));
 *   }
 *
 * Idempotent: re-running is safe because LiveBroadcastService::createForMatch
 * returns the existing broadcast if one already exists for the match.
 */
final class AutoCreateBroadcastJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** Try up to 3 times on transient YouTube failures. */
    public int $tries = 3;

    /** Wait 30s / 2m / 5m between retries. */
    public function backoff(): array
    {
        return [30, 120, 300];
    }

    public function __construct(
        public readonly string $matchId,
        public readonly ?string $actorId = null,
    ) {}

    public function handle(LiveBroadcastService $service): void
    {
        /** @var TournamentMatch|null $match */
        $match = TournamentMatch::with('bracket.tournament')->find($this->matchId);
        if ($match === null) {
            Log::info('AutoCreateBroadcastJob: match disappeared, skipping', ['match_id' => $this->matchId]);
            return;
        }

        $tournament = $match->bracket?->tournament;
        if ($tournament === null) {
            Log::warning('AutoCreateBroadcastJob: match has no tournament', ['match_id' => $this->matchId]);
            return;
        }

        // Actor: explicit (passed in by dispatcher), else the organizer.
        $actor = $this->actorId !== null
            ? User::find($this->actorId)
            : User::find($tournament->organizer_id);

        if ($actor === null) {
            Log::warning('AutoCreateBroadcastJob: actor not found', [
                'match_id' => $this->matchId,
                'actor_id' => $this->actorId,
            ]);
            return;
        }

        $title = sprintf('%s — Round %d Match %d', $tournament->name, $match->round_number, $match->match_number);

        try {
            $service->createForMatch($match, $actor, [
                'title'              => $title,
                'description'        => 'Auto-created broadcast for ' . $tournament->name,
                'privacy'            => 'public',
                'source'             => 'obs',
                'trigger'            => 'auto',
                'scheduled_start_at' => $match->scheduled_at,
            ]);
        } catch (StreamingException $e) {
            Log::error('AutoCreateBroadcastJob: streaming failure', [
                'match_id' => $this->matchId,
                'code'     => $e->errorCode,
                'message'  => $e->getMessage(),
            ]);

            // Auth/quota failures are NOT retried — the operator needs to
            // intervene. Other failures are transient and Laravel will retry.
            if (in_array($e->errorCode, [
                StreamingException::AUTH_FAILED,
                StreamingException::FEATURE_DISABLED,
                StreamingException::CHANNEL_NOT_STREAMABLE,
                StreamingException::QUOTA_EXCEEDED,
            ], true)) {
                $this->fail($e);
                return;
            }

            throw $e;
        }
    }
}
