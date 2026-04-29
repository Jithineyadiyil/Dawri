<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\PlatformSponsorship;
use App\Models\Tournament;
use App\Models\User;
use Illuminate\Support\Carbon;

/**
 * Aggregates public-facing platform statistics for the /sponsors page.
 *
 * All counts are computed from real database state — no hardcoded
 * marketing numbers. If a stat cannot be computed reliably, it is
 * deliberately omitted rather than fabricated.
 *
 * Numbers shown to a public audience must always be defensible. Anything
 * that walks JSON columns, free-text reward strings, or third-party data
 * is parsed conservatively (under-report rather than over-report).
 */
class PublicStatsService
{
    /**
     * Currency-only reward pattern. Matches "500 SAR", "1,000 SAR", "1500SAR"
     * but NOT "PSN Card 200 SAR" or "200 SAR voucher" — those represent
     * non-cash rewards and we do not want to inflate the cash-distributed
     * total with their face values.
     */
    private const SAR_REWARD_PATTERN = '/^\s*([\d,]+(?:\.\d+)?)\s*SAR\s*$/i';

    /**
     * @return array{
     *   tournaments_completed: int,
     *   tournaments_active: int,
     *   registered_players: int,
     *   total_prize_distributed_sar: int,
     *   active_partners: int,
     *   generated_at: string
     * }
     */
    public function collect(): array
    {
        return [
            'tournaments_completed'      => $this->tournamentsCompleted(),
            'tournaments_active'         => $this->tournamentsActive(),
            'registered_players'         => $this->registeredPlayers(),
            'total_prize_distributed_sar'=> $this->totalPrizeDistributed(),
            'active_partners'            => $this->activePartners(),
            'generated_at'               => Carbon::now()->toIso8601String(),
        ];
    }

    private function tournamentsCompleted(): int
    {
        return Tournament::where('status', 'completed')->count();
    }

    private function tournamentsActive(): int
    {
        return Tournament::whereIn('status', [
            'registration_open', 'in_progress', 'ongoing',
        ])->count();
    }

    private function registeredPlayers(): int
    {
        return User::where('role', 'player')->where('active', true)->count();
    }

    /**
     * Sums numeric SAR rewards from prize_pool JSON across completed tournaments.
     * Excludes non-cash rewards (gift cards, vouchers, items) since their face
     * values aren't strictly cash distributed.
     */
    private function totalPrizeDistributed(): int
    {
        $total = 0;

        Tournament::where('status', 'completed')
            ->whereNotNull('prize_pool')
            ->select('prize_pool')
            ->chunk(500, function ($tournaments) use (&$total): void {
                foreach ($tournaments as $t) {
                    $pool = $t->prize_pool;
                    if (! is_array($pool)) {
                        continue;
                    }
                    foreach ($pool as $entry) {
                        $reward = $entry['reward'] ?? null;
                        if (! is_string($reward)) continue;
                        if (preg_match(self::SAR_REWARD_PATTERN, $reward, $m)) {
                            $total += (int) round((float) str_replace(',', '', $m[1]));
                        }
                    }
                }
            });

        return $total;
    }

    private function activePartners(): int
    {
        return PlatformSponsorship::active()->count();
    }
}
