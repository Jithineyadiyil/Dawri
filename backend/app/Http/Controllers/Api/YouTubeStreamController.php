<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tournament;
use App\Services\YouTubeStreamService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * YouTubeStreamController
 *
 * Admin endpoints:
 *   POST   /admin/tournaments/{id}/youtube-stream       — create YouTube Live event
 *   DELETE /admin/tournaments/{id}/youtube-stream       — end & remove stream
 *   GET    /admin/tournaments/{id}/youtube-stream/status — poll broadcast status
 *
 * Organizer/Player endpoint (authenticated, own tournament only):
 *   GET    /tournaments/{id}/stream-key    — get stream key + setup instructions
 *
 * Public endpoint:
 *   GET    /tournaments/{id}/stream-info   — watch URL only (no key)
 */
class YouTubeStreamController extends Controller
{
    public function __construct(private readonly YouTubeStreamService $youtube) {}

    // ── Admin: create YouTube Live event ────────────────────────────────────

    public function create(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);

        if ($tournament->youtube_broadcast_id) {
            return response()->json([
                'message'      => 'This tournament already has a YouTube stream.',
                'broadcast_id' => $tournament->youtube_broadcast_id,
                'watch_url'    => $tournament->youtube_stream_url,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $event = $this->youtube->createLiveEvent(
                tournamentName: $tournament->name,
                scheduledAt:    $tournament->starts_at?->toIso8601String() ?? now()->addHour()->toIso8601String(),
                description:    $tournament->description ?? '',
            );

            $tournament->update([
                'youtube_broadcast_id'  => $event['broadcast_id'],
                'youtube_stream_key'    => $event['stream_key'],
                'youtube_stream_url'    => $event['watch_url'],
                'youtube_stream_status' => 'pending',
            ]);

            return response()->json([
                'message'      => 'YouTube Live event created successfully.',
                'broadcast_id' => $event['broadcast_id'],
                'stream_key'   => $event['stream_key'],
                'watch_url'    => $event['watch_url'],
                'rtmp_url'     => $event['rtmp_url'],
                'embed_url'    => $event['embed_url'],
                'setup_ps5'    => $this->ps5Instructions($event['stream_key']),
                'setup_obs'    => $this->obsInstructions($event['stream_key'], $event['rtmp_url']),
            ], Response::HTTP_CREATED);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_BAD_GATEWAY);
        }
    }

    // ── Admin: end broadcast ─────────────────────────────────────────────────

    public function end(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);

        if (!$tournament->youtube_broadcast_id) {
            return response()->json(['message' => 'No YouTube stream found.'], 404);
        }

        $this->youtube->endBroadcast($tournament->youtube_broadcast_id);

        $tournament->update(['youtube_stream_status' => 'ended']);

        return response()->json(['message' => 'Broadcast ended.']);
    }

    // ── Admin: poll status ───────────────────────────────────────────────────

    public function status(string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);

        if (!$tournament->youtube_broadcast_id) {
            return response()->json(['status' => 'none', 'message' => 'No stream configured.']);
        }

        $ytStatus = $this->youtube->broadcastStatus($tournament->youtube_broadcast_id);

        // Map YouTube lifecycle to our status
        $ourStatus = match ($ytStatus) {
            'live'     => 'live',
            'complete' => 'ended',
            'created', 'ready', 'testStarting', 'testing' => 'pending',
            default    => $tournament->youtube_stream_status ?? 'pending',
        };

        if ($ourStatus !== $tournament->youtube_stream_status) {
            $tournament->update(['youtube_stream_status' => $ourStatus]);
        }

        return response()->json([
            'status'       => $ourStatus,
            'yt_status'    => $ytStatus,
            'watch_url'    => $tournament->youtube_stream_url,
            'broadcast_id' => $tournament->youtube_broadcast_id,
        ]);
    }

    // ── Organizer: get stream key + setup guide ──────────────────────────────

    public function streamKey(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);
        $user       = $request->user();

        // Only organizer of this tournament or admin can see the key
        if ($tournament->organizer_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        if (!$tournament->youtube_broadcast_id) {
            return response()->json([
                'message'    => 'No YouTube stream has been set up for this tournament yet. Contact your Dawri admin.',
                'has_stream' => false,
            ]);
        }

        return response()->json([
            'has_stream'    => true,
            'stream_key'    => $tournament->youtube_stream_key,
            'rtmp_url'      => YouTubeStreamService::rtmpUrl(),
            'watch_url'     => $tournament->youtube_stream_url,
            'stream_status' => $tournament->youtube_stream_status,
            'setup_ps5'     => $this->ps5Instructions($tournament->youtube_stream_key ?? ''),
            'setup_obs'     => $this->obsInstructions($tournament->youtube_stream_key ?? '', YouTubeStreamService::rtmpUrl()),
        ]);
    }

    // ── Public: watch URL only (no key) ─────────────────────────────────────

    public function streamInfo(string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);

        if (!$tournament->youtube_stream_url) {
            return response()->json(['has_stream' => false]);
        }

        return response()->json([
            'has_stream'    => true,
            'watch_url'     => $tournament->youtube_stream_url,
            'stream_status' => $tournament->youtube_stream_status,
            'embed_url'     => str_replace('watch?v=', 'embed/', $tournament->youtube_stream_url),
        ]);
    }

    // ── Manual stream URL ────────────────────────────────────────────────────────

    public function setManualUrl(Request $request, string $id): JsonResponse
    {
        $tournament = Tournament::findOrFail($id);

        if ($tournament->organizer_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
        }

        $data = $request->validate(['youtube_stream_url' => ['required', 'url', 'max:500']]);
        $url  = $data['youtube_stream_url'];

        if (!str_contains($url, 'youtube.com') && !str_contains($url, 'youtu.be') && !str_contains($url, 'twitch.tv')) {
            return response()->json(['message' => 'Only YouTube and Twitch URLs are supported.'], 422);
        }

        $tournament->update(['youtube_stream_url' => $url, 'youtube_stream_status' => 'pending']);

        return response()->json(['message' => 'Stream URL saved.', 'watch_url' => $url]);
    }

    // ── Instruction generators ───────────────────────────────────────────────

    private function ps5Instructions(string $streamKey): array
    {
        return [
            'platform' => 'PlayStation 5',
            'steps' => [
                '1. On your PS5, go to Settings (top right gear icon)',
                '2. Select Users and Accounts → Link with Other Services → YouTube → Sign In (use your personal YouTube account — the stream goes to Dawri\'s channel via the stream key)',
                '3. After signing in, go back to Settings → Captures and Broadcasts → Broadcast',
                '4. Select Broadcasting Service → Custom RTMP',
                '5. RTMP URL: rtmp://a.rtmp.youtube.com/live2',
                '6. Stream Key: ' . $streamKey,
                '7. Set your Title, then press Start Broadcasting when your match begins',
                '8. The stream will appear live on the Dawri tournament page automatically',
            ],
            'stream_key' => $streamKey,
            'rtmp_url'   => 'rtmp://a.rtmp.youtube.com/live2',
            'note'       => 'Keep your stream key private. Do not share it publicly.',
        ];
    }

    private function obsInstructions(string $streamKey, string $rtmpUrl): array
    {
        return [
            'platform' => 'OBS Studio (PC / Mac)',
            'steps' => [
                '1. Open OBS Studio → Settings → Stream',
                '2. Service: Custom...',
                '3. Server: ' . $rtmpUrl,
                '4. Stream Key: ' . $streamKey,
                '5. Click OK → Start Streaming when your match begins',
                '6. Recommended settings: 1080p 60fps, 6000 Kbps bitrate',
            ],
            'stream_key' => $streamKey,
            'rtmp_url'   => $rtmpUrl,
            'note'       => 'Your stream goes directly to Dawri\'s YouTube channel.',
        ];
    }
}
