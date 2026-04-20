<?php

/**
 * PATCH FILE — BracketAdvancementService ranking hook.
 *
 * DO NOT replace your entire BracketAdvancementService with this file.
 * Instead, apply these two changes to your existing service:
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 1: Add RankingService to the constructor
 * ═══════════════════════════════════════════════════════════════════
 *
 * Find your existing constructor and add the RankingService parameter:
 *
 *   public function __construct(
 *       private readonly BracketRepositoryInterface $brackets,
 *       private readonly RankingService $ranking,         // ← ADD THIS
 *   ) {}
 *
 * ═══════════════════════════════════════════════════════════════════
 * CHANGE 2: Call awardTournamentPoints() when bracket completes
 * ═══════════════════════════════════════════════════════════════════
 *
 * Find the method that sets bracket status to 'completed' — it's
 * typically called checkBracketCompletion() or similar. Look for
 * a line like:
 *
 *   $bracket->update(['status' => BracketStatus::COMPLETED->value]);
 *   // or
 *   $bracket->update(['status' => 'completed', 'winner_participant_id' => $winnerId]);
 *
 * IMMEDIATELY AFTER that line, add:
 *
 *   // Award ranking points for all participants
 *   try {
 *       $this->ranking->awardTournamentPoints($bracket->tournament_id);
 *   } catch (\Throwable $e) {
 *       \Illuminate\Support\Facades\Log::error(
 *           "Failed to award ranking points for tournament {$bracket->tournament_id}: {$e->getMessage()}"
 *       );
 *       // Non-fatal — bracket completion should not fail due to ranking errors
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════
 *
 * That's it. The ranking system will now automatically award points
 * whenever a tournament bracket completes.
 */

// This file is documentation only — no executable code.
// See the instructions above for the exact changes to apply.
