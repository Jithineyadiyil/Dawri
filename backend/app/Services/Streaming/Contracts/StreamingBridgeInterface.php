<?php

declare(strict_types=1);

namespace App\Services\Streaming\Contracts;

use App\Models\LiveBroadcast;
use App\Services\Streaming\DTOs\BrowserBroadcastSession;
use App\Services\Streaming\Exceptions\StreamingBridgeException;

/**
 * Pluggable contract for browser-to-YouTube streaming bridges.
 *
 * Implementations:
 *   - {@see \App\Services\Streaming\Bridges\MuxBridge}        (production)
 *   - FfmpegBridge (future — self-hosted, zero per-broadcast cost)
 *   - CloudflareBridge (future — alternative SaaS)
 *
 * The bridge sits between the streamer's browser (WHIP / WebRTC) and
 * YouTube's RTMP ingest. The bridge is responsible for:
 *   1. Creating an ingest endpoint the browser can publish to
 *   2. Forwarding the resulting media stream to YouTube via RTMP
 *   3. Cleaning up resources when the broadcast ends
 *
 * @api
 */
interface StreamingBridgeInterface
{
    /**
     * Create a browser-broadcast session for the given broadcast.
     *
     * The returned session contains the WHIP URL and short-lived token
     * the streamer's browser needs to begin pushing media. The bridge
     * has also (silently, server-side) wired YouTube as a simulcast
     * destination so the broadcast appears on Dawri's official channel.
     *
     * @param LiveBroadcast $broadcast Existing broadcast row (must already
     *                                  have a YouTube broadcast + stream key).
     *
     * @return BrowserBroadcastSession  Streamer-facing session details.
     *
     * @throws StreamingBridgeException When the bridge provider rejects
     *                                  the request (API error, quota,
     *                                  invalid YouTube credentials).
     */
    public function createSession(LiveBroadcast $broadcast): BrowserBroadcastSession;

    /**
     * Tear down a browser-broadcast session.
     *
     * Stops the ingest endpoint, removes simulcast targets, and releases
     * any provider-side resources. Safe to call multiple times.
     *
     * @param LiveBroadcast $broadcast Broadcast whose session should end.
     *
     * @return void
     *
     * @throws StreamingBridgeException Only if the provider returns a
     *                                  non-recoverable error during cleanup.
     *                                  Network errors are swallowed.
     */
    public function endSession(LiveBroadcast $broadcast): void;

    /**
     * Validate an incoming webhook payload signature from the bridge provider.
     *
     * Used by webhook controllers to reject spoofed events before any
     * state mutation. Each bridge implements its own signature scheme
     * (Mux: HMAC-SHA256 with Mux-Signature header; ffmpeg bridge: none).
     *
     * @param string $payload   Raw request body bytes.
     * @param string $signature Provider-supplied signature header value.
     *
     * @return bool True iff the signature is valid for the payload.
     */
    public function verifyWebhookSignature(string $payload, string $signature): bool;

    /**
     * Stable identifier for the bridge implementation.
     *
     * Used for logging, metrics, and the `live_broadcasts.bridge_provider`
     * column so historical broadcasts can be traced to the bridge that
     * served them even after the binding changes.
     *
     * @return string e.g. "mux", "ffmpeg", "cloudflare"
     */
    public function providerName(): string;
}
