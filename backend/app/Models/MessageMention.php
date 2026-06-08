<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MessageMention
 *
 * Denormalized record of "@username" mentions inside message content.
 * Written once by MessageService at post time. Driving feature:
 *  - Notification fan-out via UserMentionedNotification
 *  - Future "Mentions" inbox view in the UI
 *
 * @property string                       $id
 * @property string                       $message_id
 * @property string                       $mentioned_user_id
 * @property \Illuminate\Support\Carbon   $created_at
 *
 * @property-read Message $message
 * @property-read User    $mentionedUser
 */
final class MessageMention extends Model
{
    use HasUuids;

    public $timestamps = false;
    protected $table   = 'message_mentions';

    /** @var list<string> */
    protected $fillable = ['message_id', 'mentioned_user_id'];

    /** @var array<string, string> */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    /** @return BelongsTo<Message, MessageMention> */
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    /** @return BelongsTo<User, MessageMention> */
    public function mentionedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mentioned_user_id');
    }
}
