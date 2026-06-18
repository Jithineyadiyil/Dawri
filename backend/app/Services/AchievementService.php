<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Achievement;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\UserXp;
use App\Models\XpEvent;
use App\Notifications\AchievementUnlockedNotification;
use Illuminate\Support\Facades\DB;

/**
 * Central API for XP + achievement progress.
 *
 * Callers (controllers/listeners) invoke ::trigger($user, $event, $payload)
 * — the service then translates that event into XP grants and progress
 * increments on the relevant achievements. Unlocks fire a notification.
 */
final class AchievementService
{
    /**
     * Fire a domain event.
     *  $event keys:
     *    'match_win', 'match_played', 'tournament_win', 'tournament_played',
     *    'tournament_top3', 'streak', 'friend_added', 'team_joined',
     *    'team_created', 'voice_message_sent', 'challenge_won',
     *    'profile_completed', 'marketplace_purchase'
     */
    public function trigger(User $user, string $event, array $payload = []): void
    {
        $baseXp = match ($event) {
            'match_win'           => 25,
            'match_played'        => 5,
            'tournament_win'      => 250,
            'tournament_top3'     => 100,
            'tournament_played'   => 20,
            'streak'              => 0,                       // achievement-only
            'friend_added'        => 5,
            'team_joined'         => 25,
            'team_created'        => 50,
            'voice_message_sent'  => 1,
            'challenge_won'       => 30,
            'profile_completed'   => 75,
            'marketplace_purchase'=> 15,
            default               => 0,
        };
        if ($baseXp > 0) {
            $this->awardXp($user, $baseXp, $event, $payload['source_id'] ?? null);
        }

        // Map each event to which achievement keys it can progress.
        $progressMap = [
            'match_win'           => ['first_win' => 1, 'win_10' => 1, 'win_50' => 1, 'win_100' => 1],
            'tournament_win'      => ['tournament_champion' => 1, 'tournament_champion_5' => 1],
            'tournament_top3'     => ['podium' => 1, 'podium_10' => 1],
            'tournament_played'   => ['joined_tournament' => 1, 'tournament_veteran' => 1],
            'streak'              => ['streak_3' => $payload['streak'] ?? 0, 'streak_5' => $payload['streak'] ?? 0, 'streak_10' => $payload['streak'] ?? 0],
            'friend_added'        => ['first_friend' => 1, 'social_butterfly' => 1],
            'team_created'        => ['team_founder' => 1],
            'team_joined'         => ['team_player' => 1],
            'voice_message_sent'  => ['voice_chatter' => 1],
            'challenge_won'       => ['challenger' => 1, 'challenger_25' => 1],
            'profile_completed'   => ['identity' => 1],
            'marketplace_purchase'=> ['first_purchase' => 1],
        ];

        foreach ($progressMap[$event] ?? [] as $key => $delta) {
            if ($delta <= 0) { continue; }
            $this->advance($user, $key, $delta, $event === 'streak');
        }
    }

    /**
     * Advance progress on a single achievement. If $absolute is true the new
     * progress replaces the existing value (used for streak achievements
     * that should reflect the highest streak attained); otherwise it increments.
     * Unlocks when progress hits the achievement's threshold (sentinel: stored on the pivot).
     */
    public function advance(User $user, string $key, int $delta, bool $absolute = false): ?UserAchievement
    {
        $ach = Achievement::where('key', $key)->first();
        if (! $ach) { return null; }

        return DB::transaction(function () use ($user, $ach, $delta, $absolute) {
            $threshold = $this->thresholdFor($ach->key);
            $row = UserAchievement::firstOrCreate(
                ['user_id' => $user->id, 'achievement_id' => $ach->id],
                ['progress' => 0, 'threshold' => $threshold]
            );
            if ($row->unlocked_at) { return $row; }   // already unlocked, no-op

            $row->progress = $absolute
                ? max($row->progress, $delta)
                : ($row->progress + $delta);

            if ($row->progress >= $row->threshold) {
                $row->progress = $row->threshold;
                $row->unlocked_at = now();
                $row->save();
                $this->awardXp($user, $ach->xp_reward, 'achievement', $ach->key);
                $user->notify(new AchievementUnlockedNotification($ach));
            } else {
                $row->save();
            }
            return $row;
        });
    }

    public function awardXp(User $user, int $amount, string $source, ?string $sourceId = null): UserXp
    {
        return DB::transaction(function () use ($user, $amount, $source, $sourceId) {
            $xp = UserXp::firstOrCreate(['user_id' => $user->id], ['total_xp' => 0, 'level' => 1]);
            $xp->total_xp += $amount;
            // Level up while we've exceeded the current level's cumulative cost.
            while ($xp->total_xp >= $xp->xpForNextLevel()) {
                $xp->level += 1;
            }
            $xp->save();

            XpEvent::create([
                'user_id'   => $user->id,
                'source'    => $source,
                'source_id' => $sourceId,
                'amount'    => $amount,
            ]);
            return $xp;
        });
    }

    /**
     * Per-key threshold (seeded into pivot when first encountered).
     * Keeps the achievement table normalized — `threshold` lives on the
     * pivot so users can be re-seeded with a higher bar in future rebalances.
     */
    private function thresholdFor(string $key): int
    {
        return match ($key) {
            'first_win', 'first_friend', 'first_purchase', 'identity',
            'tournament_champion', 'podium', 'joined_tournament',
            'team_founder', 'team_player', 'voice_chatter', 'challenger',
                                       => 1,
            'streak_3'                 => 3,
            'streak_5'                 => 5,
            'streak_10'                => 10,
            'win_10', 'podium_10'      => 10,
            'social_butterfly'         => 10,
            'tournament_veteran'       => 25,
            'challenger_25'            => 25,
            'win_50'                   => 50,
            'win_100'                  => 100,
            'tournament_champion_5'    => 5,
            default                    => 1,
        };
    }
}
