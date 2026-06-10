<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

Route::get('/', function () {
    return view('welcome');
});

/*
 * Serve files from the 'public' disk (storage/app/public) directly through
 * Laravel.
 *
 * Why this exists: under `php artisan serve` on Windows, PHP's built-in dev
 * server does not follow the public/storage junction, so /storage/... requests
 * fall through to the framework instead of being served as static files. This
 * route streams the file so uploaded images resolve in development. Under
 * Apache (which honours the junction + .htaccess) this route is simply never
 * reached for real files, so it is harmless in production.
 */
Route::get('/storage/{path}', function (string $path) {
    // Block path traversal; only allow files that actually exist on the disk.
    if (str_contains($path, '..')) {
        abort(Response::HTTP_NOT_FOUND);
    }

    $disk = Storage::disk('public');
    if (! $disk->exists($path)) {
        abort(Response::HTTP_NOT_FOUND);
    }

    return $disk->response($path);
})->where('path', '.*');
