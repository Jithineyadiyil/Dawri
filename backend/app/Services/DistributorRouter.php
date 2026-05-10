<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\DistributorInterface;
use App\Models\DistributorHealth;
use App\Services\Distributors\FazerCardsAdapter;
use App\Services\Distributors\JawakerAdapter;
use App\Services\Distributors\LikecardAdapter;
use App\Services\Distributors\ReloadlyAdapter;
use App\Services\Distributors\WupexAdapter;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

/**
 * DistributorRouter
 *
 * Orchestrates the chain of distributor adapters with:
 *   1. Priority ordering (configured adapters tried first, by priority())
 *   2. Brand-specific routing (Jawaker cards → JawakerAdapter when available)
 *   3. Circuit breaker per distributor (3 consecutive failures → "open" for 5 min)
 *   4. Automatic retry chain on retryable failures
 *
 * Database-backed health tracking lives in `distributor_health` table
 * (model: App\Models\DistributorHealth). States: 'closed' (healthy),
 * 'open' (skip), 'half-open' (next call is a trial).
 */
final class DistributorRouter
{
    /** Consecutive failures before circuit opens. */
    private const FAILURE_THRESHOLD = 3;

    /** Seconds to keep circuit open before trial ("half-open"). */
    private const OPEN_DURATION_SECONDS = 300;

    /** @var Collection<int, DistributorInterface> */
    private readonly Collection $adapters;

    public function __construct(
        LikecardAdapter    $likecard,
        FazerCardsAdapter  $fazercards,
        WupexAdapter       $wupex,
        ReloadlyAdapter    $reloadly,
        JawakerAdapter     $jawaker,
    ) {
        // Collection of all registered adapters, sorted by priority ascending
        // (lower number tried first). Brand-specific routing in selectChain().
        $this->adapters = collect([$likecard, $fazercards, $wupex, $reloadly, $jawaker])
            ->sortBy(fn (DistributorInterface $d) => $d->priority())
            ->values();
    }

    /**
     * Place an order across the failover chain.
     *
     * Strategy:
     *   1. Build the candidate chain (brand-specific adapters first if applicable)
     *   2. Skip adapters with open circuits
     *   3. Try each until one returns success OR a non-retryable failure
     *   4. Record health outcome after each attempt
     *
     * @return array{success:bool,order_id:?string,code:?string,message:?string,distributor:?string}
     */
    public function placeOrder(
        string $distributorProductId,
        string $internalOrderId,
        ?string $preferredDistributor = null,
        ?string $brand = null,
    ): array {
        $chain = $this->selectChain($preferredDistributor, $brand);

        $lastError = 'No distributors available';

        foreach ($chain as $adapter) {
            // Skip unconfigured adapters silently
            if (! $adapter->isConfigured()) {
                continue;
            }

            // Skip adapters with an open circuit
            if ($this->isCircuitOpen($adapter->name())) {
                Log::info('Skipping distributor with open circuit', ['distributor' => $adapter->name()]);
                continue;
            }

            Log::info('Trying distributor', ['distributor' => $adapter->name(), 'order' => $internalOrderId]);

            $result = $adapter->placeOrder($distributorProductId, $internalOrderId);

            // Record outcome
            if ($result['success']) {
                $this->recordSuccess($adapter->name());
                return [
                    'success'     => true,
                    'order_id'    => $result['order_id'],
                    'code'        => $result['code'],
                    'message'     => $result['message'] ?? 'OK',
                    'distributor' => $adapter->name(),
                ];
            }

            $this->recordFailure($adapter->name());
            $lastError = (string) ($result['message'] ?? 'Unknown error');

            // Non-retryable → stop the chain (it's a product-level failure,
            // trying another distributor won't help)
            if (! ($result['retryable'] ?? false)) {
                break;
            }
        }

        return [
            'success'     => false,
            'order_id'    => null,
            'code'        => null,
            'message'     => $lastError,
            'distributor' => null,
        ];
    }

    /**
     * Build the failover chain for a given request.
     *
     * @return Collection<int, DistributorInterface>
     */
    private function selectChain(?string $preferredDistributor, ?string $brand): Collection
    {
        // Brand-specific: Jawaker cards always go through JawakerAdapter first
        if ($brand !== null && stripos($brand, 'jawaker') !== false) {
            return $this->adapters
                ->sortByDesc(fn (DistributorInterface $d) => $d->name() === 'jawaker' ? 1 : 0)
                ->values();
        }

        // Preferred distributor override (e.g. admin forces a specific one)
        if ($preferredDistributor !== null) {
            return $this->adapters
                ->sortByDesc(fn (DistributorInterface $d) => $d->name() === $preferredDistributor ? 1 : 0)
                ->values();
        }

        return $this->adapters;
    }

    /**
     * Whether a distributor's circuit is currently open (should be skipped).
     */
    private function isCircuitOpen(string $distributorName): bool
    {
        $health = DistributorHealth::find($distributorName);
        if (! $health) {
            return false;
        }

        if ($health->circuit_status === 'closed') {
            return false;
        }

        // Open circuit — check if it's time to half-open (trial)
        if ($health->circuit_status === 'open' && $health->last_failure_at
            && $health->last_failure_at->diffInSeconds(now()) >= self::OPEN_DURATION_SECONDS
        ) {
            $health->update(['circuit_status' => 'half-open']);
            return false;
        }

        return $health->circuit_status === 'open';
    }

    private function recordSuccess(string $distributorName): void
    {
        DistributorHealth::updateOrCreate(
            ['distributor' => $distributorName],
            [
                'is_active'       => true,
                'last_success_at' => now(),
                'failure_count'   => 0,
                'circuit_status'  => 'closed',
            ],
        );
    }

    private function recordFailure(string $distributorName): void
    {
        $health = DistributorHealth::firstOrNew(['distributor' => $distributorName]);
        $health->last_failure_at = now();
        $health->failure_count   = ($health->failure_count ?? 0) + 1;

        // Open the circuit if we hit the threshold
        if ($health->failure_count >= self::FAILURE_THRESHOLD) {
            $health->circuit_status = 'open';
            Log::warning('Distributor circuit opened', [
                'distributor' => $distributorName,
                'failures'    => $health->failure_count,
            ]);
        }

        $health->is_active = true;
        $health->save();
    }
}
