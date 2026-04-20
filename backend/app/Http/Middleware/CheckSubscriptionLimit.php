<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\SubscriptionService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware to enforce subscription usage limits (e.g., tournaments/month).
 *
 * Usage: Route::post('/tournaments', ...)->middleware('subscription.limit:tournaments_per_month');
 */
class CheckSubscriptionLimit
{
    public function __construct(
        private readonly SubscriptionService $subscriptions,
    ) {}

    public function handle(Request $request, Closure $next, string $metric): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Authentication required.'], 401);
        }

        if (! $this->subscriptions->withinLimit($user->id, $metric)) {
            $plan = $user->subscription_plan ?? 'free';
            return response()->json([
                'message'      => "You have reached your monthly limit for this action. Please upgrade your plan.",
                'metric'       => $metric,
                'current_plan' => $plan,
                'upgrade_url'  => '/subscription',
            ], 429);
        }

        return $next($request);
    }
}
