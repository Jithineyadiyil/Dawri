<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\SubscriptionService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware to enforce subscription plan features and limits.
 *
 * Usage in routes:
 *   Route::post('/tournaments', ...)->middleware('subscription:create_tournaments');
 *   Route::post('/tournaments', ...)->middleware('subscription.limit:tournaments_per_month');
 *
 * Register in bootstrap/app.php:
 *   ->withMiddleware(function (Middleware $middleware) {
 *       $middleware->alias([
 *           'subscription'       => \App\Http\Middleware\CheckSubscription::class,
 *           'subscription.limit' => \App\Http\Middleware\CheckSubscriptionLimit::class,
 *       ]);
 *   })
 */
class CheckSubscription
{
    public function __construct(
        private readonly SubscriptionService $subscriptions,
    ) {}

    /**
     * Check if the user's plan includes the required feature.
     *
     * @param string $feature  The feature key from config/plans.php
     */
    public function handle(Request $request, Closure $next, string $feature): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Authentication required.'], 401);
        }

        if (! $this->subscriptions->canPerform($user->id, $feature)) {
            $plan = $user->subscription_plan ?? 'free';
            return response()->json([
                'message'      => "Your current plan ({$plan}) does not include this feature. Please upgrade.",
                'required'     => $feature,
                'current_plan' => $plan,
                'upgrade_url'  => '/subscription',
            ], 403);
        }

        return $next($request);
    }
}
