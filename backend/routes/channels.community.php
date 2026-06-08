<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Sprint 15 — Broadcasting channel authorization
|--------------------------------------------------------------------------
| Append this to routes/channels.php so Reverb can authorize websocket
| subscriptions for community presence + user-private channels.
*/

use App\Models\Channel;
use App\Models\User;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use Illuminate\Support\Facades\Broadcast;

/**
 * Presence channel for a community text channel.
 * Authorized iff the user is a non-banned member of the channel's community.
 *
 * Payload returned is what `members.each()` receives on the client.
 */
Broadcast::channel('community.channel.{channelId}', function (User $user, string $channelId) {
    $channel = Channel::find($channelId);
    if ($channel === null) {
        return false;
    }

    $members = app(CommunityMemberRepositoryInterface::class);
    if (! $members->isMember($channel->community_id, $user->id)) {
        return false;
    }

    return [
        'id'       => $user->id,
        'nickname' => $user->nickname ?? null,
        'avatar'   => $user->avatar_url ?? $user->avatar ?? null,
    ];
});

/**
 * Private user channel for moderation notifications.
 */
Broadcast::channel('user.{userId}', fn (User $user, string $userId) => $user->id === $userId);
