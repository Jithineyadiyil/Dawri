<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Company;
use App\Services\BrandingService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * RequiresWhiteLabel — gate routes that need a branding-eligible plan.
 *
 * Admins always pass. All others must be on Professional or Enterprise,
 * resolved via their personal subscription or their company's subscription.
 */
class RequiresWhiteLabel
{
    public function __construct(private readonly BrandingService $branding) {}

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], Response::HTTP_UNAUTHORIZED);
        }

        if ($user->role === 'admin') {
            return $next($request);
        }

        if ($this->branding->planAllowsBrandingForUser($user)) {
            return $next($request);
        }

        return response()->json([
            'message'         => 'White-label branding is available on Professional and Enterprise plans.',
            'required_plans'  => BrandingService::BRANDING_PLANS,
            'upgrade_url'     => '/subscription/plans',
        ], Response::HTTP_FORBIDDEN);
    }
}
