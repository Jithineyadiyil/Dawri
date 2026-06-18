<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Social broadcast channel authorization — direct messages.
|--------------------------------------------------------------------------
| Required from routes/channels.php alongside the community channels.
*/

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/**
 * Private channel for a 1:1 conversation. Authorized iff the user is one
 * of the two participants in that conversation.
 */
Broadcast::channel('dm.{conversationId}', function (User $user, string $conversationId) {
    $conversation = Conversation::find($conversationId);

    return $conversation !== null && $conversation->hasParticipant($user->id);
});
