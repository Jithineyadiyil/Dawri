<?php

declare(strict_types=1);

namespace App\Services;

/**
 * StreamUrlService
 *
 * Parses Twitch and YouTube URLs to a normalised representation suitable
 * for storage and embedding. Treats unrecognised formats as invalid so
 * we never persist URLs that won't render.
 *
 * Why parse server-side?
 *   - Defence-in-depth: frontend validation is for UX, not security.
 *   - Storage hygiene: tracking parameters (utm_*, t=, etc.) get stripped
 *     so two pastes of "the same stream" produce identical canonical URLs.
 *   - Embedding: the Twitch/YouTube embed URL formats differ from the
 *     watch URLs users paste; we extract the channel/video id once and
 *     the frontend builds the iframe src deterministically.
 *
 * Sprint: live streaming (Option A).
 */
final class StreamUrlService
{
    public const PROVIDER_TWITCH  = 'twitch';
    public const PROVIDER_YOUTUBE = 'youtube';

    /**
     * Parse a user-supplied URL into a structured form.
     *
     * @param string|null $url  Raw URL from the user.
     * @return array{provider:string, identifier:string, canonical_url:string}|null
     *   Returns null when the URL is not a recognised Twitch/YouTube live URL.
     *
     * Edge cases handled:
     *   - `null` / empty / whitespace-only input → null
     *   - URLs without a scheme → tolerated (https:// is added)
     *   - Trailing slashes, query strings, fragments → stripped
     *   - Twitch VOD URLs (twitch.tv/videos/123) → null (not a live channel)
     *   - YouTube playlist URLs without a video → null
     */
    public function parse(?string $url): ?array
    {
        if ($url === null) {
            return null;
        }
        $url = trim($url);
        if ($url === '') {
            return null;
        }

        // Tolerate missing scheme (e.g. "twitch.tv/foo")
        if (! preg_match('#^https?://#i', $url)) {
            $url = 'https://' . $url;
        }

        $parts = parse_url($url);
        if ($parts === false || empty($parts['host'])) {
            return null;
        }

        $host = strtolower($parts['host']);
        $path = $parts['path'] ?? '';

        // ── Twitch ───────────────────────────────────────────────────────
        if ($host === 'twitch.tv' || $host === 'www.twitch.tv') {
            // Path shape we accept: /<channel> (case-insensitive)
            // Reject /videos/* (VODs) and /directory/* etc. — those aren't
            // live channels and Twitch's channel embed won't load them.
            $segments = array_values(array_filter(explode('/', $path), fn ($s) => $s !== ''));
            if (count($segments) !== 1) {
                return null;
            }
            $channel = strtolower($segments[0]);
            // Twitch usernames: 4-25 chars, [a-z0-9_], can't start with _
            if (! preg_match('/^[a-z0-9][a-z0-9_]{3,24}$/', $channel)) {
                return null;
            }
            return [
                'provider'      => self::PROVIDER_TWITCH,
                'identifier'    => $channel,
                'canonical_url' => 'https://www.twitch.tv/' . $channel,
            ];
        }

        // ── YouTube ──────────────────────────────────────────────────────
        // Accept:
        //   youtube.com/watch?v=<id>
        //   youtube.com/live/<id>
        //   youtu.be/<id>
        //   m.youtube.com/watch?v=<id>
        $isYouTube = in_array($host, ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'], true);
        if ($isYouTube) {
            $videoId = null;

            if ($host === 'youtu.be') {
                $segments = array_values(array_filter(explode('/', $path), fn ($s) => $s !== ''));
                if (count($segments) === 1 && self::isYouTubeVideoId($segments[0])) {
                    $videoId = $segments[0];
                }
            } elseif ($path === '/watch' && ! empty($parts['query'])) {
                parse_str($parts['query'], $q);
                if (! empty($q['v']) && self::isYouTubeVideoId((string) $q['v'])) {
                    $videoId = $q['v'];
                }
            } elseif (preg_match('#^/live/([A-Za-z0-9_-]{6,20})$#', $path, $m)) {
                if (self::isYouTubeVideoId($m[1])) {
                    $videoId = $m[1];
                }
            }

            if ($videoId !== null) {
                return [
                    'provider'      => self::PROVIDER_YOUTUBE,
                    'identifier'    => $videoId,
                    'canonical_url' => 'https://www.youtube.com/watch?v=' . $videoId,
                ];
            }
        }

        return null;
    }

    /**
     * YouTube video IDs are 11 chars from [A-Za-z0-9_-].
     * (Strictly 11 — older shorter ids don't exist on the live platform.)
     */
    private static function isYouTubeVideoId(string $id): bool
    {
        return (bool) preg_match('/^[A-Za-z0-9_-]{11}$/', $id);
    }
}
