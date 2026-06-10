<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\CommunityBlockedWord;
use Illuminate\Support\Facades\Cache;

/**
 * Phase 6 — keyword auto-moderation matcher.
 *
 * Loads a community's blocked-word list (cached briefly to keep the message
 * hot-path cheap) and checks message content. Matching is case-insensitive and
 * uses word boundaries where the term is alphanumeric, so "ass" does not match
 * "class" — but falls back to a plain substring check for terms containing
 * non-word characters (phrases, punctuation, or non-Latin scripts like Arabic
 * where \b is unreliable).
 *
 * Returns a match describing the first offending word, or null if clean.
 */
final class WordFilterService
{
    private const CACHE_TTL = 30; // seconds

    /**
     * @return array{word:string, mode:string}|null
     */
    public function check(string $communityId, string $content): ?array
    {
        $words = $this->wordsFor($communityId);
        if ($words === []) {
            return null;
        }

        $haystack = mb_strtolower($content);

        foreach ($words as $entry) {
            $term = $entry['word'];
            if ($term === '') {
                continue;
            }

            if ($this->matches($haystack, $term)) {
                return ['word' => $term, 'mode' => $entry['mode']];
            }
        }

        return null;
    }

    /**
     * Whether $term (already lower-cased) appears in $haystack (lower-cased).
     * Word-boundary match for purely [a-z0-9] terms; substring otherwise.
     */
    private function matches(string $haystack, string $term): bool
    {
        if (preg_match('/^[a-z0-9]+$/', $term) === 1) {
            return preg_match('/\b' . preg_quote($term, '/') . '\b/u', $haystack) === 1;
        }

        return mb_strpos($haystack, $term) !== false;
    }

    /**
     * @return array<int, array{word:string, mode:string}>
     */
    private function wordsFor(string $communityId): array
    {
        return Cache::remember(
            "community:{$communityId}:blocked-words",
            self::CACHE_TTL,
            static fn (): array => CommunityBlockedWord::where('community_id', $communityId)
                ->get(['word', 'mode'])
                ->map(static fn (CommunityBlockedWord $w): array => [
                    'word' => mb_strtolower($w->word),
                    'mode' => $w->mode,
                ])
                ->all(),
        );
    }

    /** Bust the cache when the list changes. */
    public function forget(string $communityId): void
    {
        Cache::forget("community:{$communityId}:blocked-words");
    }
}
