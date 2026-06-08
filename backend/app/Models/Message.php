<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Message
 *
 * A community message. Soft-deletes are deliberate so moderators can audit
 * after the fact; hard delete is reserved for PDPL right-to-be-forgotten
 * requests handled outside the normal API surface.
 *
 * @property string                       $id
 * @property string                       $channel_id
 * @property string                       $user_id
 * @property string|null                  $parent_id   Reserved for Sprint 16 threads
 * @property string                       $content
 * @property \Illuminate\Support\Carbon|null $edited_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property string|null                  $deleted_by
 * @property bool                         $is_pinned
 * @property \Illuminate\Support\Carbon|null $pinned_at
 * @property string|null                  $pinned_by
 * @property \Illuminate\Support\Carbon   $created_at
 * @property \Illuminate\Support\Carbon   $updated_at
 *
 * @property-read Channel                                                          $channel
 * @property-read User                                                             $author
 * @property-read \Illuminate\Database\Eloquent\Collection<int, MessageReaction>   $reactions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, MessageMention>    $mentions
 */
final class Message extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    /** Self-edit grace window — users can edit their own message within this period. */
    public const SELF_EDIT_WINDOW_MINUTES = 15;

    /** Max characters per message — enforced again in SendMessageRequest. */
    public const MAX_LENGTH = 4000;

    /** @var list<string> */
    protected $fillable = [
        'channel_id',
        'user_id',
        'parent_id',
        'content',
        'edited_at',
        'is_pinned',
        'pinned_at',
        'pinned_by',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'edited_at' => 'datetime',
        'pinned_at' => 'datetime',
        'is_pinned' => 'boolean',
    ];

    /** @return BelongsTo<Channel, Message> */
    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }

    /** @return BelongsTo<User, Message> */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /** @return HasMany<MessageReaction> */
    public function reactions(): HasMany
    {
        return $this->hasMany(MessageReaction::class);
    }

    /** @return HasMany<MessageMention> */
    public function mentions(): HasMany
    {
        return $this->hasMany(MessageMention::class);
    }

    /**
     * Returns true if the author is still within their self-edit grace window.
     */
    public function isWithinEditWindow(): bool
    {
        return $this->created_at->diffInMinutes(now()) <= self::SELF_EDIT_WINDOW_MINUTES;
    }

    /** @param Builder<Message> $query */
    public function scopeVisible(Builder $query): Builder
    {
        return $query->whereNull('deleted_at');
    }
}
