<?php

declare(strict_types=1);

namespace App\Services\Streaming\Exceptions;

use RuntimeException;
use Throwable;

/**
 * StreamingException — raised by YouTubeStreamingService and
 * LiveBroadcastService when a YouTube API call or state transition fails.
 *
 * Carries a machine-readable `code` ("auth_failed", "quota_exceeded",
 * "channel_not_streamable", etc.) for the controller to translate into
 * proper HTTP status codes.
 *
 * The optional $context array holds the raw YouTube error payload — useful
 * for logs but should never be returned verbatim to the client.
 */
final class StreamingException extends RuntimeException
{
    public const AUTH_FAILED              = 'auth_failed';
    public const QUOTA_EXCEEDED           = 'quota_exceeded';
    public const CHANNEL_NOT_STREAMABLE   = 'channel_not_streamable';
    public const BROADCAST_NOT_FOUND      = 'broadcast_not_found';
    public const INVALID_TRANSITION       = 'invalid_transition';
    public const STREAM_BIND_FAILED       = 'stream_bind_failed';
    public const FEATURE_DISABLED         = 'feature_disabled';
    public const UPSTREAM_ERROR           = 'upstream_error';

    /**
     * @param array<string, mixed> $context  Raw YouTube error context (logs only)
     */
    public function __construct(
        public readonly string $errorCode,
        string $message,
        public readonly array $context = [],
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, 0, $previous);
    }

    /**
     * Map our error code to an appropriate HTTP status for the API response.
     */
    public function httpStatus(): int
    {
        return match ($this->errorCode) {
            self::AUTH_FAILED, self::FEATURE_DISABLED            => 503,
            self::QUOTA_EXCEEDED                                 => 429,
            self::CHANNEL_NOT_STREAMABLE, self::INVALID_TRANSITION => 422,
            self::BROADCAST_NOT_FOUND                            => 404,
            default                                              => 502,
        };
    }
}
