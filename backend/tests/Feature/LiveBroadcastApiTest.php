<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Bracket;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * Feature tests for the Live Broadcast API.
 *
 * These tests exercise the full stack: routes → controller → service →
 * repository → DB → resource. The YouTube HTTP layer is faked.
 *
 * Note on test titles: all titles must be >= 3 characters to satisfy the
 * `CreateBroadcastRequest::rules()` min:3 constraint. Short test titles
 * ('X', 'A') previously caused 422 responses that masked the real flow.
 */
final class LiveBroadcastApiTest extends TestCase
{
    use RefreshDatabase;

    /** Re-usable valid title constant — keeps tests focused on what they actually assert. */
    private const VALID_TITLE = 'Test Broadcast';

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.youtube' => [
                'client_id'       => 'cid',
                'client_secret'   => 'csec',
                'refresh_token'   => 'rt',
                'channel_id'      => 'UCtest',
                'api_base_url'    => 'https://www.googleapis.com/youtube/v3',
                'oauth_token_url' => 'https://oauth2.googleapis.com/token',
                'default_privacy' => 'public',
                'enabled'         => true,
            ],
        ]);

        $this->fakeYouTubeHappyPath();
    }

    /* ───────── Create — happy path ─────────────────────────────────── */

    public function test_organizer_can_create_broadcast_for_their_match(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $resp = $this->postJson("/api/v1/matches/{$match->id}/broadcast", [
            'title'   => 'EA FC 25 — Quarterfinal 3',
            'privacy' => 'public',
            'source'  => 'obs',
        ]);

        $resp->assertCreated();
        $resp->assertJsonStructure([
            'data' => [
                'id', 'tournament_id', 'match_id', 'title', 'privacy', 'status',
                'watch_url', 'embed_url', 'rtmp_url', 'is_live', 'is_terminal',
            ],
        ]);
        $resp->assertJsonPath('data.privacy', 'public');
        $resp->assertJsonPath('data.is_live', false);

        // Resource MUST NOT leak the stream key.
        $resp->assertJsonMissingPath('data.stream_key');
        $resp->assertJsonMissingPath('data.stream_key_enc');

        // The match's stream_url should be populated from the watch URL.
        $this->assertNotNull($match->fresh()->stream_url);
    }

    public function test_creating_broadcast_is_idempotent_per_match(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $first  = $this->postJson("/api/v1/matches/{$match->id}/broadcast", ['title' => 'First call']);
        $second = $this->postJson("/api/v1/matches/{$match->id}/broadcast", ['title' => 'Second call']);

        $first->assertCreated();
        $second->assertCreated();
        $this->assertSame(
            $first->json('data.id'),
            $second->json('data.id'),
            'Repeated POST should return the same broadcast id',
        );
    }

    /* ───────── Authorization ───────────────────────────────────────── */

    public function test_non_organizer_cannot_create_broadcast(): void
    {
        [$organizer, $match] = $this->seedMatch();
        $intruder = User::factory()->create(['role' => 'player']);

        Sanctum::actingAs($intruder);

        $this->postJson("/api/v1/matches/{$match->id}/broadcast", ['title' => self::VALID_TITLE])
            ->assertForbidden();
    }

    public function test_unauthenticated_user_gets_401(): void
    {
        [$organizer, $match] = $this->seedMatch();
        $this->postJson("/api/v1/matches/{$match->id}/broadcast", ['title' => self::VALID_TITLE])
            ->assertUnauthorized();
    }

    /* ───────── Validation ──────────────────────────────────────────── */

    public function test_title_is_required(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $this->postJson("/api/v1/matches/{$match->id}/broadcast", [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    public function test_privacy_must_be_one_of_three_values(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $this->postJson("/api/v1/matches/{$match->id}/broadcast", [
            'title'   => self::VALID_TITLE,
            'privacy' => 'rainbow',
        ])->assertJsonValidationErrors(['privacy']);
    }

    /* ───────── Reveal credentials ──────────────────────────────────── */

    public function test_creator_can_reveal_rtmp_credentials(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $created = $this->postJson("/api/v1/matches/{$match->id}/broadcast", [
            'title' => self::VALID_TITLE,
        ])->json('data');

        $this->assertNotNull($created, 'Broadcast creation must succeed before testing credentials.');

        $resp = $this->getJson("/api/v1/broadcasts/{$created['id']}/credentials");

        $resp->assertOk()
            ->assertJsonStructure(['data' => ['rtmp_url', 'stream_key', 'instructions']]);

        $this->assertNotEmpty($resp->json('data.stream_key'));

        // Symfony normalises Cache-Control: alphabetises directives and may
        // add `private`. Assert each directive is present individually
        // rather than pinning an exact string.
        $cacheControl = (string) $resp->headers->get('Cache-Control');
        $this->assertStringContainsString('no-store',         $cacheControl);
        $this->assertStringContainsString('no-cache',         $cacheControl);
        $this->assertStringContainsString('must-revalidate',  $cacheControl);
        $this->assertStringContainsString('max-age=0',        $cacheControl);
    }

    public function test_non_creator_cannot_reveal_credentials(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $created = $this->postJson("/api/v1/matches/{$match->id}/broadcast", [
            'title' => self::VALID_TITLE,
        ])->json('data');

        $this->assertNotNull($created, 'Broadcast creation must succeed before testing credentials.');

        $stranger = User::factory()->create(['role' => 'player']);
        Sanctum::actingAs($stranger);

        $this->getJson("/api/v1/broadcasts/{$created['id']}/credentials")->assertForbidden();
    }

    /* ───────── State transitions ───────────────────────────────────── */

    public function test_go_live_transitions_status(): void
    {
        [$organizer, $match] = $this->seedMatch();
        Sanctum::actingAs($organizer);

        $created = $this->postJson("/api/v1/matches/{$match->id}/broadcast", [
            'title' => self::VALID_TITLE,
        ])->json('data');

        $this->assertNotNull($created, 'Broadcast creation must succeed before testing go-live.');

        $this->postJson("/api/v1/broadcasts/{$created['id']}/go-live")
            ->assertOk()
            ->assertJsonPath('data.status', 'live')
            ->assertJsonPath('data.is_live', true);
    }

    /* ───────── Helpers ─────────────────────────────────────────────── */

    /**
     * @return array{0: User, 1: TournamentMatch}
     */
    private function seedMatch(): array
    {
        $organizer  = User::factory()->create(['role' => 'organizer']);
        $tournament = Tournament::create([
            'id'                     => (string) Str::uuid(),
            'name'                   => 'Test Cup',
            'game'                   => 'EA FC 25',
            'format'                 => 'single_elimination',
            'max_participants'       => 8,
            'registration_closes_at' => now()->addDay(),
            'starts_at'              => now()->addDays(2),
            'organizer_id'           => $organizer->id,
            'status'                 => 'registration_open',
        ]);
        $bracket = Bracket::create([
            'id'                => (string) Str::uuid(),
            'tournament_id'     => $tournament->id,
            'format'            => 'single_elimination',
            'status'            => 'generated',
            'total_rounds'      => 3,
            'current_round'     => 1,
            'participant_count' => 8,
            'bye_count'         => 0,
        ]);
        $match = TournamentMatch::create([
            'id'              => (string) Str::uuid(),
            'bracket_id'      => $bracket->id,
            'round_number'    => 1,
            'match_number'    => 1,
            'bracket_section' => 'winners',
            'status'          => 'pending',
        ]);

        return [$organizer, $match];
    }

    private function fakeYouTubeHappyPath(): void
    {
        Http::fake([
            'oauth2.googleapis.com/token' => Http::response([
                'access_token' => 'ya29.fake',
                'expires_in'   => 3600,
            ], 200),
            'www.googleapis.com/youtube/v3/liveBroadcasts*' => Http::sequence()
                ->push(['id' => 'BCAST_' . Str::random(8)], 200)
                ->push([], 200)   // bind
                ->push([], 200),  // transition
            'www.googleapis.com/youtube/v3/liveStreams*' => Http::response([
                'id' => 'STREAM_xyz',
                'cdn' => [
                    'ingestionInfo' => [
                        'ingestionAddress' => 'rtmp://a.rtmp.youtube.com/live2',
                        'streamName'       => 'sk_aaaa_bbbb_cccc',
                    ],
                ],
            ], 200),
        ]);
    }
}
