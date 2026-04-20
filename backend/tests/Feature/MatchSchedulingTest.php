<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Bracket;
use App\Models\MatchEvidence;
use App\Models\MatchRescheduleRequest;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\TournamentParticipant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

/**
 * Feature coverage for Sprint 2: match scheduling + reschedule proposals +
 * evidence uploads.
 *
 * Purpose:
 *   Validates the full happy-path lifecycle — organizer sets a schedule,
 *   a player proposes a change, the opponent accepts, evidence is uploaded,
 *   and authorization edge-cases are enforced.
 *
 * Parameters: none (self-contained via factories).
 * Return:     PHPUnit assertions.
 * Edge cases covered:
 *   • Non-participant cannot request a reschedule.
 *   • Requester cannot respond to their own request.
 *   • Organizer can override without opponent consent.
 *   • Evidence upload is blocked before the match is scheduled.
 *   • Per-user upload cap is enforced.
 */
class MatchSchedulingTest extends TestCase
{
    use RefreshDatabase;

    private User               $organizer;
    private User               $playerA;
    private User               $playerB;
    private User               $outsider;
    private TournamentMatch    $match;

    protected function setUp(): void
    {
        parent::setUp();

        $this->organizer = User::factory()->create(['role' => 'organizer', 'phone_verified_at' => now()]);
        $this->playerA   = User::factory()->create(['role' => 'player',    'phone_verified_at' => now()]);
        $this->playerB   = User::factory()->create(['role' => 'player',    'phone_verified_at' => now()]);
        $this->outsider  = User::factory()->create(['role' => 'player',    'phone_verified_at' => now()]);

        $tournament = Tournament::factory()->create([
            'organizer_id'    => $this->organizer->id,
            'format'          => 'single_elimination',
            'status'          => 'ongoing',
        ]);
        $bracket = Bracket::factory()->create(['tournament_id' => $tournament->id]);
        $pA = TournamentParticipant::factory()->create([
            'tournament_id' => $tournament->id, 'user_id' => $this->playerA->id,
        ]);
        $pB = TournamentParticipant::factory()->create([
            'tournament_id' => $tournament->id, 'user_id' => $this->playerB->id,
        ]);

        $this->match = TournamentMatch::factory()->create([
            'bracket_id'       => $bracket->id,
            'participant_a_id' => $pA->id,
            'participant_b_id' => $pB->id,
            'status'           => 'pending',
        ]);
    }

    public function test_organizer_can_schedule_a_match(): void
    {
        $this->actingAs($this->organizer, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/schedule", [
                'scheduled_at' => now()->addDay()->toIso8601String(),
            ])
            ->assertOk()
            ->assertJsonPath('data.status', 'scheduled');

        $this->assertNotNull($this->match->fresh()->scheduled_at);
    }

    public function test_non_participant_cannot_request_reschedule(): void
    {
        $this->match->update(['scheduled_at' => now()->addDay()]);

        $this->actingAs($this->outsider, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/reschedule-requests", [
                'proposed_at' => now()->addDays(2)->toIso8601String(),
            ])
            ->assertForbidden();
    }

    public function test_player_can_request_reschedule_and_opponent_accepts(): void
    {
        $this->match->update(['scheduled_at' => now()->addDay(), 'status' => 'scheduled']);

        // Player A proposes a new time.
        $req = $this->actingAs($this->playerA, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/reschedule-requests", [
                'proposed_at' => now()->addDays(3)->toIso8601String(),
                'reason'      => 'Exam clash.',
            ])
            ->assertCreated()
            ->json('data');

        // Player A cannot respond to their own.
        $this->actingAs($this->playerA, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/reschedule-requests/{$req['id']}/respond", [
                'action' => 'accept',
            ])
            ->assertForbidden();

        // Player B accepts.
        $this->actingAs($this->playerB, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/reschedule-requests/{$req['id']}/respond", [
                'action' => 'accept',
            ])
            ->assertOk()
            ->assertJsonPath('data.status', 'accepted');

        // Match scheduled_at was updated.
        $this->assertTrue($this->match->fresh()->scheduled_at->greaterThan(now()->addDays(2)));
    }

    public function test_organizer_can_override_reschedule_without_opponent(): void
    {
        $this->match->update(['scheduled_at' => now()->addDay(), 'status' => 'scheduled']);

        $req = MatchRescheduleRequest::create([
            'match_id'        => $this->match->id,
            'requested_by_id' => $this->playerA->id,
            'proposed_at'     => now()->addDays(5),
            'status'          => 'pending',
        ]);

        $this->actingAs($this->organizer, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/reschedule-requests/{$req->id}/respond", [
                'action'   => 'accept',
                'override' => true,
            ])
            ->assertOk()
            ->assertJsonPath('data.status', 'overridden')
            ->assertJsonPath('data.was_organizer_override', true);

        $this->assertTrue($this->match->fresh()->scheduled_at->greaterThan(now()->addDays(4)));
    }

    public function test_evidence_upload_blocked_before_schedule(): void
    {
        Storage::fake('public');

        $this->actingAs($this->playerA, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/evidence", [
                'file' => UploadedFile::fake()->image('proof.png'),
            ])
            ->assertStatus(422)
            ->assertJsonPath('message', 'Evidence can only be uploaded after the match is scheduled.');
    }

    public function test_evidence_upload_succeeds_after_schedule(): void
    {
        Storage::fake('public');
        $this->match->update(['scheduled_at' => now()->addHour(), 'status' => 'scheduled']);

        $this->actingAs($this->playerA, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/evidence", [
                'file'    => UploadedFile::fake()->image('proof.png', 800, 600),
                'caption' => 'Final score screen.',
            ])
            ->assertCreated()
            ->assertJsonPath('data.file_type', 'image')
            ->assertJsonPath('data.caption', 'Final score screen.');

        $this->assertEquals(1, MatchEvidence::where('match_id', $this->match->id)->count());
    }

    public function test_evidence_upload_respects_per_user_cap(): void
    {
        Storage::fake('public');
        $this->match->update(['scheduled_at' => now()->addHour(), 'status' => 'scheduled']);

        for ($i = 1; $i <= MatchEvidence::MAX_PER_USER_PER_MATCH; $i++) {
            $this->actingAs($this->playerA, 'sanctum')
                ->postJson("/api/v1/matches/{$this->match->id}/evidence", [
                    'file' => UploadedFile::fake()->image("proof-{$i}.png"),
                ])
                ->assertCreated();
        }

        // (N+1)th upload should now be rejected.
        $this->actingAs($this->playerA, 'sanctum')
            ->postJson("/api/v1/matches/{$this->match->id}/evidence", [
                'file' => UploadedFile::fake()->image('overflow.png'),
            ])
            ->assertStatus(422);
    }
}
