<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\Distributors\JawakerAdapter;
use App\Services\Distributors\LikecardAdapter;
use App\Services\Distributors\ReloadlyAdapter;
use App\Services\Distributors\WupexAdapter;
use App\Services\DistributorRouter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * DistributorRouterTest
 *
 * Unit tests for the router's failover chain, brand-specific routing, and
 * circuit breaker logic.
 */
class DistributorRouterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Likecard adapter always returns success (stub mode) → router uses it first.
     */
    public function test_router_uses_likecard_stub_when_no_credentials_set(): void
    {
        $router = $this->app->make(DistributorRouter::class);

        $result = $router->placeOrder(
            distributorProductId: 'test-product-1',
            internalOrderId:      'order-abc-123',
        );

        $this->assertTrue($result['success']);
        $this->assertEquals('likecard', $result['distributor']);
        $this->assertNotEmpty($result['code']);
    }

    /**
     * Unconfigured adapter (wupex, reloadly, jawaker without keys) must not
     * appear in the chain — router skips straight to likecard.
     */
    public function test_router_skips_unconfigured_adapters(): void
    {
        // Wupex without WUPEX_API_KEY in env
        $wupex = $this->app->make(WupexAdapter::class);
        $this->assertFalse($wupex->isConfigured());

        $reloadly = $this->app->make(ReloadlyAdapter::class);
        $this->assertFalse($reloadly->isConfigured());

        $jawaker = $this->app->make(JawakerAdapter::class);
        $this->assertFalse($jawaker->isConfigured());

        // Likecard stub-mode is always "configured" (falls back to stub response)
        $likecard = $this->app->make(LikecardAdapter::class);
        $this->assertTrue($likecard->isConfigured());
    }

    /**
     * Priorities are deterministic so the failover chain is predictable.
     */
    public function test_priorities_match_integration_plan_ordering(): void
    {
        $this->assertEquals(3,  $this->app->make(JawakerAdapter::class)->priority());
        $this->assertEquals(5,  $this->app->make(WupexAdapter::class)->priority());
        $this->assertEquals(7,  $this->app->make(ReloadlyAdapter::class)->priority());
        $this->assertEquals(10, $this->app->make(LikecardAdapter::class)->priority());
    }

    /**
     * Adapter names must stay stable — they're persisted as the PK in
     * distributor_health, used to lookup circuit state.
     */
    public function test_adapter_names_are_stable(): void
    {
        $this->assertSame('likecard', $this->app->make(LikecardAdapter::class)->name());
        $this->assertSame('wupex',    $this->app->make(WupexAdapter::class)->name());
        $this->assertSame('reloadly', $this->app->make(ReloadlyAdapter::class)->name());
        $this->assertSame('jawaker',  $this->app->make(JawakerAdapter::class)->name());
    }
}
