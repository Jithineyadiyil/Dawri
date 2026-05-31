<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\LiveBroadcast;
use App\Models\Tournament;
use App\Models\User;
use App\Services\Streaming\Contracts\StreamingBridgeInterface;
use App\Services\Streaming\DTOs\BrowserBroadcastSession;
use DateTimeImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Mockery;
use Tests\TestCase;

/**
 * Feature tests for the browser-broadcast HTTP endpoints.
 *
 * Uses a mocked StreamingBridgeInterface so we never actually call Mux,
 * but exercises the full Laravel HTTP stack (middleware, validation,
 * authorization, resource serialization).
 *
 * @covers \App\Http\Controllers\Api\BrowserBroadcastController
 */
final class BrowserBroadcastApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function unauthenticated_request_is_rejected(): void
    {
        $broadcast = LiveBroadcast::factory()->create();

        $this->postJson("/api/v1/broadcasts/{$broadcast->id}/browser-session")
             ->assertStatus(401);
    }

    /**
     * @test
     */
    public function organizer_can_open_session_for_their_tournament(): void
    {
        [$organizer, $broadcast] = $this->makeOrganizerWithBroadcast();

        $bridge = $this->bindBridgeMock(
            shouldOpen: true,
            session:    $this->fakeSession((string) $broadcast->id),
        );

        Sanctum::actingAs($organizer);

        $response = $this->postJson("/api/v1/broadcasts/{$broadcast->id}/browser-session");

        $response->assertCreated()
                 ->assertJsonStructure([
                     'data' => [
                         'broadcast_id',
                         'whip_url',
                         'whip_token',
                         'playback_url',
                         'watch_url',
                         'expires_at',
                         'provider',
                         'capabilities' => [
                             'webcam',
                             'screen',
                             'screen_with_cam',
                             'max_resolution',
                             'max_framerate',
                             'recommended_bitrate_kbps',
                         ],
                     ],
                 ])
                 ->assertJsonPath('data.provider', 'mux')
                 ->assertJsonPath('data.whip_url', 'https://global-live.mux.com/api/v1/whip/sk-1');

        $bridge->shouldHaveReceived('createSession');
    }

    /**
     * @test
     */
    public function unrelated_player_gets_403(): void
    {
        [, $broadcast] = $this->makeOrganizerWithBroadcast();

        $player = User::factory()->create(['role' => 'player']);

        $this->bindBridgeMock(shouldOpen: false);

        Sanctum::actingAs($player);

        $this->postJson("/api/v1/broadcasts/{$broadcast->id}/browser-session")
             ->assertStatus(403);
    }

    /**
     * @test
     */
    public function organizer_can_close_session(): void
    {
        [$organizer, $broadcast] = $this->makeOrganizerWithBroadcast();

        $bridge = $this->bindBridgeMock(shouldOpen: false);
        $bridge->shouldReceive('endSession')->once();

        Sanctum::actingAs($organizer);

        $this->deleteJson("/api/v1/broadcasts/{$broadcast->id}/browser-session")
             ->assertNoContent();
    }

    /**
     * @test
     */
    public function nonexistent_broadcast_returns_404(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        Sanctum::actingAs($admin);

        $this->bindBridgeMock(shouldOpen: false);

        $this->postJson('/api/v1/broadcasts/00000000-0000-0000-0000-000000000000/browser-session')
             ->assertStatus(404);
    }

    /**
     * @test
     */
    public function invalid_capture_mode_returns_422(): void
    {
        [$organizer, $broadcast] = $this->makeOrganizerWithBroadcast();
        $this->bindBridgeMock(shouldOpen: false);

        Sanctum::actingAs($organizer);

        $this->postJson(
            "/api/v1/broadcasts/{$broadcast->id}/browser-session",
            ['capture_mode' => 'invalid_value'],
        )->assertStatus(422)
         ->assertJsonValidationErrors(['capture_mode']);
    }

    // ─────────────────────── helpers ─────────────────────────────────────

    /**
     * @return array{0: User, 1: LiveBroadcast}
     */
    private function makeOrganizerWithBroadcast(): array
    {
        $organizer = User::factory()->create(['role' => 'organizer']);
        $tournament = Tournament::factory()->create(['organizer_id' => $organizer->id]);
        $broadcast = LiveBroadcast::factory()->create([
            'tournament_id'      => $tournament->id,
            'youtube_stream_key' => 'yt-key-test',
            'youtube_video_id'   => 'yt-vid-test',
        ]);

        return [$organizer, $broadcast];
    }

    /**
     * Bind a Mockery mock of StreamingBridgeInterface into the container.
     */
    private function bindBridgeMock(bool $shouldOpen, ?BrowserBroadcastSession $session = null)
    {
        $mock = Mockery::mock(StreamingBridgeInterface::class)->makePartial();
        $mock->shouldReceive('providerName')->andReturn('mux');

        if ($shouldOpen && $session) {
            $mock->shouldReceive('createSession')->andReturn($session);
        }

        $this->app->instance(StreamingBridgeInterface::class, $mock);
        return $mock;
    }

    private function fakeSession(string $broadcastId): BrowserBroadcastSession
    {
        return new BrowserBroadcastSession(
            broadcastId: $broadcastId,
            whipUrl:     'https://global-live.mux.com/api/v1/whip/sk-1',
            whipToken:   null,
            playbackUrl: 'https://stream.mux.com/pb-1.m3u8',
            watchUrl:    'https://www.youtube.com/watch?v=yt-vid-test',
            expiresAt:   new DateTimeImmutable('+5 minutes'),
            provider:    'mux',
        );
    }
}
