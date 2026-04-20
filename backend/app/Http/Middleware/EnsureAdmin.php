<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ensures the authenticated user has the 'admin' role.
 *
 * Register in bootstrap/app.php:
 *   $middleware->alias(['admin' => \App\Http\Middleware\EnsureAdmin::class]);
 */
class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Admin access required.'], 403);
        }

        return $next($request);
    }
}
