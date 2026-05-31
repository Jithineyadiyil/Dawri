<?php

declare(strict_types=1);

namespace App\Services\Streaming\Exceptions;

use RuntimeException;
use Throwable;

/**
 * Thrown when a streaming bridge provider (Mux, Cloudflare, ffmpeg, ...)
 * rejects an operation or returns an unrecoverable error.
 *
 * Carries the provider name and a machine-readable failure code so
 * controllers can translate bridge failures into appropriate HTTP
 * status codes without inspecting the message string.
 */
final class StreamingBridgeException extends RuntimeException
{
    /** Provider rejected the request (HTTP 4xx from upstream). */
    public const REASON_PROVIDER_REJECTED = 'provider_rejected';

    /** Provider is unreachable or returned 5xx. */
    public const REASON_PROVIDER_UNAVAILABLE = 'provider_unavailable';

    /** Authentication with the provider failed (bad API key). */
    public const REASON_AUTH_FAILED = 'auth_failed';

    /** Required upstream state is missing (e.g. YouTube broadcast not created yet). */
    public const REASON_PRECONDITION_FAILED = 'precondition_failed';

    /** Account quota exceeded (rate limit, plan limit). */
    public const REASON_QUOTA_EXCEEDED = 'quota_exceeded';

    /** Webhook signature did not match. */
    public const REASON_INVALID_SIGNATURE = 'invalid_signature';

    /**
     * @param string         $reason   One of the REASON_* constants.
     * @param string         $provider Provider name (e.g. "mux").
     * @param string         $message  Human-readable failure description.
     * @param Throwable|null $previous Underlying exception, if any.
     */
    public function __construct(
        public readonly string $reason,
        public readonly string $provider,
        string $message,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, 0, $previous);
    }

    /**
     * Convenience: HTTP status code that best represents this failure.
     *
     * @return int Suitable status code for a JSON error response.
     */
    public function httpStatusCode(): int
    {
        return match ($this->reason) {
            self::REASON_AUTH_FAILED          => 502,
            self::REASON_PROVIDER_REJECTED    => 502,
            self::REASON_PROVIDER_UNAVAILABLE => 503,
            self::REASON_PRECONDITION_FAILED  => 409,
            self::REASON_QUOTA_EXCEEDED       => 429,
            self::REASON_INVALID_SIGNATURE    => 401,
            default                            => 500,
        };
    }
}
