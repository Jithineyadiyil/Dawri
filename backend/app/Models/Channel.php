<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Channel
 *
 * A text channel within a community. Discord-style — channels are flat
 * (no categories in v1). Type "announcement" restricts posting to
 * moderators+; "text" allows any non-muted member.
 *
 * @property string                       $id
 * @property string                       $community_id
 * @property string                       $name
 * @property string|null                  $topic
 * @property 'text'|'announcement'        $type
 * @property int                          $position
 * @property bool                         $is_archived
 * @property \Illuminate\Support\Carbon   $created_at
 * @property \Illuminate\Support\Carbon   $updated_at
 *
 * @property-read Community                                                       $community
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Message>          $messages
 */
final class Channel extends Model
{
    use HasFactory;
    use HasUuids;

    public const TYPE_TEXT         = 'text';
    public const TYPE_ANNOUNCEMENT = 'announcement';

    /** @var list<string> */
    protected $fillable = [
        'community_id',
        'name',
        'topic',
        'type',
        'position',
        'is_archived',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'is_archived' => 'boolean',
        'position'    => 'integer',
    ];

    /** @return BelongsTo<Community, Channel> */
    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    /** @return HasMany<Message> */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    /** @return HasMany<Message> */
    public function pinnedMessages(): HasMany
    {
        return $this->hasMany(Message::class)
            ->where('is_pinned', true)
            ->whereNull('deleted_at')
            ->orderByDesc('pinned_at');
    }

    public function isAnnouncement(): bool
    {
        return $this->type === self::TYPE_ANNOUNCEMENT;
    }
}
