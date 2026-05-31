<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Streaming\Bridges\MuxBridge;
use App\Services\Streaming\Clients\MuxClient;
use App\Services\Streaming\Contracts\StreamingBridgeInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Client\Factory as HttpFactory;
use Illuminate\Support\ServiceProvider;
use Psr\Log\LoggerInterface;

/**
 * Wires the streaming bridge contract to its concrete implementation.
 *
 * Switching providers later (e.g. swapping Mux for a self-hosted ffmpeg
 * bridge) is a one-line change inside {@see self::register()} — no
 * changes anywhere in the calling code.
 *
 * Registration:
 *   Add `App\Providers\StreamingBridgeServiceProvider::class` to the
 *   `providers` array in `bootstrap/providers.php` (Laravel 11) or
 *   `config/app.php` (Laravel 10).
 */
final class StreamingBridgeServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // ── MuxClient: HTTP wrapper for Mux Video API ─────────────────
        $this->app->singleton(MuxClient::class, function (Application $app): MuxClient {
            return new MuxClient(
                http:     $app->make(HttpFactory::class),
                log:      $app->make(LoggerInterface::class),
                tokenId:  (string) config('services.mux.token_id'),
                secret:   (string) config('services.mux.token_secret'),
                testMode: (bool)   config('services.mux.test_mode', true),
                timeout:  (int)    config('services.mux.timeout', 10),
            );
        });

        // ── Bridge: Mux implementation of StreamingBridgeInterface ────
        $this->app->singleton(StreamingBridgeInterface::class, function (Application $app): MuxBridge {
            return new MuxBridge(
                client:            $app->make(MuxClient::class),
                log:               $app->make(LoggerInterface::class),
                whipBaseUrl:       (string) config('services.mux.whip_base_url'),
                webhookSecret:     (string) config('services.mux.webhook_secret'),
                youtubeRtmpUrl:    (string) config('services.youtube.rtmp_url', 'rtmp://a.rtmp.youtube.com/live2'),
                sessionTtlSeconds: (int)    config('services.mux.session_ttl', 300),
            );
        });
    }
}
