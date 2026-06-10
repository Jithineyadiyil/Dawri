<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\CommunityAuditEntry;
use Illuminate\Database\Eloquent\Collection;

/**
 * Phase 6 — append-only community audit log.
 *
 * record() is intentionally tiny and side-effect-only so it can be called from
 * anywhere (moderation service, controllers) without ceremony. Failures to
 * write an audit entry must never break the underlying action, so callers may
 * wrap in try/catch if they wish; record() itself does not throw on logic.
 */
final class AuditService
{
    /**
     * Append an audit entry.
     *
     * @param array<string, mixed> $meta
     */
    public function record(
        string $communityId,
        ?string $actorId,
        string $action,
        ?string $targetUserId = null,
        array $meta = [],
    ): CommunityAuditEntry {
        return CommunityAuditEntry::create([
            'community_id'   => $communityId,
            'actor_id'       => $actorId,
            'target_user_id' => $targetUserId,
            'action'         => $action,
            'meta'           => $meta === [] ? null : $meta,
        ]);
    }

    /**
     * Recent entries for a community, newest first.
     *
     * @return Collection<int, CommunityAuditEntry>
     */
    public function recent(string $communityId, int $limit = 100): Collection
    {
        return CommunityAuditEntry::where('community_id', $communityId)
            ->with([
                'actor:id,name,nickname',
                'targetUser:id,name,nickname',
            ])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }
}
