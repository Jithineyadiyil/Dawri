<?php

declare(strict_types=1);

namespace App\Services\Streaming;

use App\Models\LiveBroadcast;
use App\Models\User;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\Contracts\StreamingBridgeInterface;
use App\Services\Streaming\DTOs\BrowserBroadcastSession;
use App\Services\Streaming\Exceptions\StreamingBridgeException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;
use Psr\Log\LoggerInterface;

/**
 * Browser-broadcast orchestration service.
 *
 * Lives one layer above the {@see StreamingBridgeInterface} implementation.
 * Owns the *what* of browser broadcasting (authorize, persist state, emit
 * audit logs); delegates the *how* of media plumbing to the bridge.
 *
 * Why this layering: when the user later swaps Mux for a self-hosted
 * ffmpeg bridge to save money, none of this service's logic changes —
 * only the bridge implementation bound in
 * {@see \App\Providers\StreamingBridgeServiceProvider}.
 */
final class BrowserBroadcastService
{
    /**
     * @param StreamingBridgeInterface          $bridge      Pluggable bridge.
     * @param LiveBroadcastRepositoryInterface  $broadcasts  Broadcast persistence.
     * @param LiveBroadcastService              $youtube     Existing YouTube service
     *                                                       (creates broadcast + stream key).
     * @param LoggerInterface                   $log         PSR-3 logger.
     */
    public function __construct(
        private readonly StreamingBridgeInterface $bridge,
        private readonly LiveBroadcastRepositoryInterface $broadcasts,
        private readonly LiveBroadcastService $youtube,
        private readonly LoggerInterface $log,
    ) {}

    /**
     * Open a browser-broadcast session for the given broadcast and user.
     *
     * The user must be an organizer of the broadcast's tournament OR an
     * admin. We do NOT permit arbitrary players to publish to Dawri's
     * YouTube channel — that would create brand-safety risk.
     *
     * @param string $broadcastId UUID of the LiveBroadcast.
     * @param User   $actor       Authenticated user attempting to broadcast.
     *
     * @return BrowserBroadcastSession Streamer-facing session.
     *
     * @throws AuthorizationException     When the actor is not allowed.
     * @throws StreamingBridgeException   When the bridge fails.
     */
    public function openSession(string $broadcastId, User $actor): BrowserBroadcastSession
    {
        $broadcast = $this->broadcasts->findOrFail($broadcastId);

        $this->authorize($broadcast, $actor);

        return DB::transaction(function () use ($broadcast, $actor): BrowserBroadcastSession {
            // Make sure YouTube broadcast exists — provision if missing.
            if (! $broadcast->youtube_stream_key) {
                $this->youtube->ensureProvisioned($broadcast);
                $broadcast->refresh();
            }

            $session = $this->bridge->createSession($broadcast);

            $this->log->info('browser_broadcast.session_opened', [
                'broadcast_id' => $broadcast->id,
                'actor_id'     => $actor->id,
                'provider'     => $session->provider,
            ]);

            return $session;
        });
    }

    /**
     * Close an existing browser-broadcast session.
     *
     * @param string $broadcastId UUID of the LiveBroadcast.
     * @param User   $actor       Authenticated user closing the session.
     *
     * @throws AuthorizationException
     * @throws StreamingBridgeException
     */
    public function closeSession(string $broadcastId, User $actor): void
    {
        $broadcast = $this->broadcasts->findOrFail($broadcastId);

        $this->authorize($broadcast, $actor);

        $this->bridge->endSession($broadcast);

        $this->log->info('browser_broadcast.session_closed', [
            'broadcast_id' => $broadcast->id,
            'actor_id'     => $actor->id,
        ]);
    }

    /**
     * Authorize the actor against the broadcast.
     *
     * Permitted: admin, the tournament organizer, or an explicitly
     * delegated caster (future use — `broadcast_casters` table).
     *
     * @throws AuthorizationException
     */
    private function authorize(LiveBroadcast $broadcast, User $actor): void
    {
        if ($actor->role === 'admin') {
            return;
        }

        $tournament = $broadcast->tournament;
        if ($tournament && $tournament->organizer_id === $actor->id) {
            return;
        }

        throw new AuthorizationException(
            'You are not allowed to broadcast on behalf of Dawri for this match.',
        );
    }
}
