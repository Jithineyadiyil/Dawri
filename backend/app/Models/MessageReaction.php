<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MessageReaction
 *
 * One row per (message, user, emoji). To toggle a reaction the client
 * calls DELETE — re-POSTing the same emoji will fail the UNIQUE
 * constraint, which the service translates into a clean idempotent
 * "already reacted" response.
 *
 * @property string                       $id
 * @property string                       $message_id
 * @property string                       $user_id
 * @property string                       $emoji
 * @property \Illuminate\Support\Carbon   $created_at
 *
 * @property-read Message $message
 * @property-read User    $user
 */
final class MessageReaction extends Model
{
    use HasUuids;

    public $timestamps = false;
    protected $table   = 'message_reactions';

    /** @var list<string> */
    protected $fillable = [
        'message_id',
        'user_id',
        'emoji',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    /** @return BelongsTo<Message, MessageReaction> */
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    /** @return BelongsTo<User, MessageReaction> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
