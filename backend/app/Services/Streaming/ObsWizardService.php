<?php

declare(strict_types=1);

namespace App\Services\Streaming;

use App\Models\BroadcastSetupLog;
use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Models\User;
use App\Repositories\Contracts\BroadcastSetupLogRepositoryInterface;
use App\Repositories\Contracts\LiveBroadcastRepositoryInterface;
use App\Services\Streaming\Exceptions\StreamingException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use InvalidArgumentException;
use RuntimeException;

/**
 * ObsWizardService
 *
 * Business logic for the OBS Setup Wizard.
 *
 * Responsibilities:
 *   1. Build the wizard configuration payload for a scope:
 *      - Broadcast scope    → uses LiveBroadcast (UUID) directly
 *      - Tournament scope   → finds the active broadcast for the tournament,
 *                             or returns a "no broadcast yet" sentinel
 *   2. Authorize that the requesting user owns this scope.
 *   3. Record wizard analytics events via the repository, with secret
 *      sanitization so stream keys never end up in the log table.
 *   4. Proxy the "Go Live" transition via LiveBroadcastService so the
 *      wizard's final step is genuinely one-flow.
 *
 * This class deliberately holds NO HTTP concerns — those live in the
 * ObsWizardController.
 *
 * @package App\Services\Streaming
 */
final class ObsWizardService
{
    /**
     * Recommended OBS encoder presets keyed by profile name.
     *
     * @var array<string, array<string, mixed>>
     */
    private const ENCODER_PROFILES = [
        'pc_high' => [
            'label'             => 'PC — High Quality (1080p60)',
            'resolution'        => '1920x1080',
            'fps'               => 60,
            'bitrate_kbps'      => 6000,
            'encoder'           => 'NVENC H.264 (or x264 if no NVIDIA GPU)',
            'rate_control'      => 'CBR',
            'keyframe_interval' => 2,
            'audio_bitrate'     => 160,
        ],
        'pc_balanced' => [
            'label'             => 'PC — Balanced (1080p30)',
            'resolution'        => '1920x1080',
            'fps'               => 30,
            'bitrate_kbps'      => 4500,
            'encoder'           => 'x264',
            'rate_control'      => 'CBR',
            'keyframe_interval' => 2,
            'audio_bitrate'     => 128,
        ],
        'console' => [
            'label'             => 'Console via Capture Card (1080p60)',
            'resolution'        => '1920x1080',
            'fps'               => 60,
            'bitrate_kbps'      => 6000,
            'encoder'           => 'x264',
            'rate_control'      => 'CBR',
            'keyframe_interval' => 2,
            'audio_bitrate'     => 160,
        ],
        'mobile' => [
            'label'             => 'Mobile Mirror (720p30)',
            'resolution'        => '1280x720',
            'fps'               => 30,
            'bitrate_kbps'      => 2500,
            'encoder'           => 'x264',
            'rate_control'      => 'CBR',
            'keyframe_interval' => 2,
            'audio_bitrate'     => 128,
        ],
    ];

    public function __construct(
        private readonly LiveBroadcastService                 $broadcastService,
        private readonly LiveBroadcastRepositoryInterface     $broadcastRepo,
        private readonly BroadcastSetupLogRepositoryInterface $logs,
    ) {
    }

    /* ═════════════════════════════════════════════════════════════════
       Public API
       ═════════════════════════════════════════════════════════════════ */

    /**
     * Build the wizard config for a *broadcast-scoped* session.
     *
     * @throws AuthorizationException If $user is neither creator nor admin.
     *
     * @return array<string, mixed>
     */
    public function configForBroadcast(LiveBroadcast $broadcast, User $user): array
    {
        $this->authorizeBroadcast($broadcast, $user);

        return $this->buildConfig(
            scope:           'broadcast',
            broadcast:       $broadcast,
            tournament:      $broadcast->tournament,
            alreadyComplete: $this->logs->hasCompletedForBroadcast($broadcast->id, $user->id),
        );
    }

    /**
     * Build the wizard config for a *tournament-scoped* session.
     *
     * Auto-resolves the active broadcast (status = created|ready|live) for
     * the tournament if one exists. If not, the wizard still renders but
     * with "no broadcast yet" sentinel that prompts the organizer to create
     * one first via the existing POST /tournaments/{id}/broadcast endpoint.
     *
     * @throws AuthorizationException If $user is neither organizer nor admin.
     *
     * @return array<string, mixed>
     */
    public function configForTournament(Tournament $tournament, User $user): array
    {
        $this->authorizeTournament($tournament, $user);

        $broadcast = $this->broadcastRepo->findByTournament($tournament->id);

        return $this->buildConfig(
            scope:           'tournament',
            broadcast:       $broadcast,
            tournament:      $tournament,
            alreadyComplete: $this->logs->hasCompletedForTournament($tournament->id, $user->id),
        );
    }

    /**
     * Record a wizard analytics event.
     *
     * @param  array<string,mixed>|null $metadata
     *
     * @throws InvalidArgumentException If event code/platform/step is out of range.
     */
    public function logEvent(
        ?LiveBroadcast $broadcast,
        ?Tournament    $tournament,
        User           $user,
        string         $event,
        ?int           $stepNumber = null,
        ?string        $platform   = null,
        ?array         $metadata   = null,
        ?string        $ipAddress  = null,
    ): BroadcastSetupLog {
        if ($broadcast === null && $tournament === null) {
            throw new InvalidArgumentException('At least one of $broadcast or $tournament must be set.');
        }
        if (! in_array($event, BroadcastSetupLog::EVENTS, true)) {
            throw new InvalidArgumentException("Unknown wizard event code: {$event}");
        }
        if ($platform !== null && ! in_array($platform, BroadcastSetupLog::PLATFORMS, true)) {
            $platform = 'unknown';
        }
        if ($stepNumber !== null && ($stepNumber < 1 || $stepNumber > 6)) {
            throw new InvalidArgumentException('step_number must be between 1 and 6.');
        }

        return $this->logs->record([
            'broadcast_id'  => $broadcast?->id,
            'tournament_id' => $tournament?->id ?? $broadcast?->tournament_id,
            'user_id'       => $user->id,
            'event'         => $event,
            'step_number'   => $stepNumber,
            'platform'      => $platform,
            'source'        => $broadcast?->source,
            'metadata'      => $this->sanitizeMetadata($metadata),
            'ip_address'    => $ipAddress,
        ]);
    }

    /**
     * One-flow finish: transition the broadcast to LIVE and record the
     * wizard_completed event. Mirrors LiveBroadcastService::goLive() but
     * with wizard-specific authorization (creator OR admin).
     *
     * @throws AuthorizationException If $user may not transition this broadcast.
     * @throws StreamingException     From the underlying YouTube transition.
     */
    public function finishAndGoLive(LiveBroadcast $broadcast, User $user): LiveBroadcast
    {
        $this->authorizeBroadcast($broadcast, $user);

        // Reuse the existing service — keeps lifecycle logic in one place.
        $updated = $this->broadcastService->goLive($broadcast);

        // Best-effort analytics — failure must NOT block the lifecycle change.
        try {
            $this->logEvent(
                broadcast:  $updated,
                tournament: null,
                user:       $user,
                event:      'wizard_completed',
                metadata:   ['auto_go_live' => true],
            );
        } catch (\Throwable $e) {
            Log::warning('Wizard: failed to record wizard_completed event', [
                'broadcast_id' => $broadcast->id,
                'user_id'      => $user->id,
                'error'        => $e->getMessage(),
            ]);
        }

        return $updated;
    }

    /* ═════════════════════════════════════════════════════════════════
       Authorization
       ═════════════════════════════════════════════════════════════════ */

    /**
     * Mirrors LiveBroadcastController::authorizeCreator() exactly so that
     * the wizard's permissions never diverge from the broadcast's owner.
     *
     * @throws AuthorizationException
     */
    private function authorizeBroadcast(LiveBroadcast $broadcast, User $user): void
    {
        $allowed = $user->id === $broadcast->created_by || ($user->role ?? null) === 'admin';

        if (! $allowed) {
            throw new AuthorizationException(
                'Only the broadcast creator or a platform admin may use the wizard for this broadcast.'
            );
        }
    }

    /**
     * Mirrors LiveBroadcastController::authorizeOrganizer() — organizer,
     * moderator, or admin may run the wizard at tournament scope.
     *
     * @throws AuthorizationException
     */
    private function authorizeTournament(Tournament $tournament, User $user): void
    {
        $isOrganizer = $user->id === $tournament->organizer_id;
        $isModerator = $user->id === $tournament->moderator_id;
        $isAdmin     = ($user->role ?? null) === 'admin';

        if (! ($isOrganizer || $isModerator || $isAdmin)) {
            throw new AuthorizationException(
                'Only the tournament organizer/moderator or a platform admin may use the wizard.'
            );
        }
    }

    /* ═════════════════════════════════════════════════════════════════
       Config builder
       ═════════════════════════════════════════════════════════════════ */

    /**
     * @return array<string, mixed>
     */
    private function buildConfig(
        string         $scope,
        ?LiveBroadcast $broadcast,
        ?Tournament    $tournament,
        bool           $alreadyComplete,
    ): array {
        return [
            'scope'             => $scope,
            'broadcast_id'      => $broadcast?->id,
            'broadcast_status'  => $broadcast?->status,
            'broadcast_source'  => $broadcast?->source,
            'has_broadcast'     => $broadcast !== null,
            'is_live'           => $broadcast?->isLive() ?? false,
            'is_terminal'       => $broadcast?->isTerminal() ?? false,
            'tournament_id'     => $tournament?->id ?? $broadcast?->tournament_id,
            'tournament_name'   => $tournament?->name ?? 'Tournament broadcast',
            'watch_url'         => $broadcast?->watch_url,
            'embed_url'         => $broadcast?->embed_url,
            'credentials_url'   => $broadcast === null
                ? null
                : "/api/v1/broadcasts/{$broadcast->id}/credentials",
            'go_live_url'       => $broadcast === null
                ? null
                : "/api/v1/broadcasts/{$broadcast->id}/setup-wizard/finish",
            'create_broadcast_url' => $broadcast !== null || $tournament === null
                ? null
                : "/api/v1/tournaments/{$tournament->id}/broadcast",
            'download_links'    => $this->downloadLinks(),
            'encoder_profiles'  => self::ENCODER_PROFILES,
            'default_profile'   => 'pc_high',
            'troubleshooting'   => $this->troubleshootingTips(),
            'already_completed' => $alreadyComplete,
        ];
    }

    /* ═════════════════════════════════════════════════════════════════
       Static content
       ═════════════════════════════════════════════════════════════════ */

    /**
     * @return array<string,string>
     */
    private function downloadLinks(): array
    {
        return [
            'windows' => 'https://obsproject.com/download',
            'macos'   => 'https://obsproject.com/download',
            'linux'   => 'https://obsproject.com/download',
            'main'    => 'https://obsproject.com/download',
        ];
    }

    /**
     * @return list<array{title:string, body:string}>
     */
    private function troubleshootingTips(): array
    {
        return [
            [
                'title' => 'OBS shows "Failed to connect to server"',
                'body'  => 'The RTMP URL or stream key is wrong, OR Windows Defender Firewall is blocking outbound port 1935. Re-fetch credentials and allow OBS through the firewall.',
            ],
            [
                'title' => 'Dawri status stays at "ready" — never transitions to live',
                'body'  => 'OBS is not actually sending data. Check the indicator at the bottom-right of OBS — it must be green or yellow. Red means the stream is disconnected.',
            ],
            [
                'title' => 'YouTube returns 403 when you click "Go Live"',
                'body'  => 'YouTube requires an actual incoming RTMP signal before it accepts the live transition. Make sure OBS shows "Streaming" (green dot) for at least 15 seconds before clicking Finish Wizard.',
            ],
            [
                'title' => 'High CPU usage with x264 encoder',
                'body'  => 'If you have an NVIDIA GPU, switch encoder to NVIDIA NVENC H.264 (Output → Streaming → Encoder). Otherwise lower output resolution to 1280x720.',
            ],
            [
                'title' => 'Dropped frames (yellow/red indicator in OBS)',
                'body'  => 'Your upload bandwidth is insufficient for the bitrate. Reduce bitrate to 3500-4500 Kbps in Output settings, or use a wired ethernet connection instead of Wi-Fi.',
            ],
        ];
    }

    /**
     * Strip secret-shaped keys from user-supplied metadata before persistence.
     * Defence-in-depth: even if the frontend mistakenly attaches a stream key
     * to an analytics event, it never lands in the logs table.
     *
     * @param  array<string,mixed>|null $metadata
     * @return array<string,mixed>|null
     */
    private function sanitizeMetadata(?array $metadata): ?array
    {
        if ($metadata === null) {
            return null;
        }

        $forbidden = [
            'stream_key', 'streamkey', 'stream_key_enc',
            'token', 'access_token', 'refresh_token',
            'password', 'secret', 'rtmp_url',
        ];

        $clean = [];
        foreach ($metadata as $key => $value) {
            if (in_array(Str::lower((string) $key), $forbidden, true)) {
                continue;
            }
            if (is_scalar($value) || is_array($value) || $value === null) {
                $clean[$key] = $value;
            }
        }

        return $clean === [] ? null : $clean;
    }
}
