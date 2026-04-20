<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Tournament registration service — patched version.
 *
 * FIXES APPLIED:
 *  1. Phone verification check (PRD requirement)
 *  2. Seed race condition — seeds assigned as sequential insert, not count+1
 *  3. Unregister/withdraw with entry fee refund
 *  4. Cancel tournament with bulk refund
 *  5. Gamertag preserved in participant record
 *
 * MERGE INSTRUCTIONS:
 *   Copy the register(), unregister(), and cancelTournament() methods
 *   into your existing TournamentService. Keep any other methods intact.
 */
class TournamentRegistrationService
{
    public function __construct(
        private readonly ?WalletService $wallet = null,
    ) {}

    /**
     * Register a user for a tournament.
     *
     * @param string $tournamentId
     * @param string $userId
     * @param string|null $gamertag
     * @return TournamentParticipant
     *
     * @throws RuntimeException
     */
    public function register(string $tournamentId, string $userId, ?string $gamertag = null): TournamentParticipant
    {
        return DB::transaction(function () use ($tournamentId, $userId, $gamertag) {
            $tournament = Tournament::lockForUpdate()->findOrFail($tournamentId);
            $user = User::findOrFail($userId);

            // ── FIX #1: Phone verification check ──────────────────────────
            if ($user->phone_verified_at === null) {
                throw new RuntimeException('Phone verification required to join tournaments.');
            }

            // ── Existing validations ──────────────────────────────────────
            if ($tournament->status !== 'registration_open') {
                throw new RuntimeException('Tournament is not accepting registrations.');
            }

            $existing = TournamentParticipant::where('tournament_id', $tournamentId)
                ->where('user_id', $userId)
                ->first();

            if ($existing) {
                throw new RuntimeException('You are already registered for this tournament.');
            }

            $count = $tournament->participants()->where('status', 'registered')->count();
            if ($count >= $tournament->max_participants) {
                throw new RuntimeException('Tournament is full.');
            }

            // ── Entry fee debit ───────────────────────────────────────────
            if ($tournament->entry_fee > 0 && $this->wallet !== null) {
                $this->wallet->debit(
                    $userId,
                    $tournament->entry_fee,
                    "Entry fee: {$tournament->name}"
                );
            }

            // ── FIX #2: Seed via DB max instead of count+1 ───────────────
            // This prevents race condition where two concurrent inserts get
            // the same seed value.
            $maxSeed = TournamentParticipant::where('tournament_id', $tournamentId)
                ->max('seed') ?? 0;

            $participant = TournamentParticipant::create([
                'tournament_id' => $tournamentId,
                'user_id'       => $userId,
                'gamertag'      => $gamertag ?? $user->game_username ?? $user->name,
                'seed'          => $maxSeed + 1,
                'status'        => 'registered',
                'registered_at' => now(),
            ]);

            return $participant;
        });
    }

    /**
     * FIX #3: Unregister/withdraw from a tournament with entry fee refund.
     *
     * @param string $tournamentId
     * @param string $userId
     * @return void
     *
     * @throws RuntimeException
     */
    public function unregister(string $tournamentId, string $userId): void
    {
        DB::transaction(function () use ($tournamentId, $userId) {
            $tournament = Tournament::lockForUpdate()->findOrFail($tournamentId);

            if ($tournament->status !== 'registration_open') {
                throw new RuntimeException('Cannot withdraw after registration has closed.');
            }

            $participant = TournamentParticipant::where('tournament_id', $tournamentId)
                ->where('user_id', $userId)
                ->where('status', 'registered')
                ->firstOrFail();

            // Refund entry fee
            if ($tournament->entry_fee > 0 && $this->wallet !== null) {
                $this->wallet->credit(
                    $userId,
                    $tournament->entry_fee,
                    "Refund — withdrew from: {$tournament->name}"
                );
            }

            $participant->update(['status' => 'withdrawn']);
        });
    }

    /**
     * FIX #4: Cancel a tournament and refund all registered participants.
     *
     * @param string $tournamentId
     * @param string $cancelledByUserId
     * @return int Number of participants refunded
     *
     * @throws RuntimeException
     */
    public function cancelTournament(string $tournamentId, string $cancelledByUserId): int
    {
        return DB::transaction(function () use ($tournamentId, $cancelledByUserId) {
            $tournament = Tournament::lockForUpdate()->findOrFail($tournamentId);

            if (in_array($tournament->status, ['completed', 'cancelled'], true)) {
                throw new RuntimeException('Tournament is already ' . $tournament->status . '.');
            }

            $participants = $tournament->participants()
                ->where('status', 'registered')
                ->get();

            $refunded = 0;

            if ($tournament->entry_fee > 0 && $this->wallet !== null) {
                foreach ($participants as $participant) {
                    $this->wallet->credit(
                        $participant->user_id,
                        $tournament->entry_fee,
                        "Refund — tournament cancelled: {$tournament->name}"
                    );
                    $participant->update(['status' => 'withdrawn']);
                    $refunded++;
                }
            }

            $tournament->update(['status' => 'cancelled']);

            return $refunded;
        });
    }
}
