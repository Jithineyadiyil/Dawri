<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\DirectMessage — one message inside a Conversation.
 *
 * Either a text message (body) or a voice note (audio_path + duration).
 *
 * @property string $id
 * @property string $conversation_id
 * @property string $sender_id
 * @property string|null $body
 * @property string|null $audio_path
 * @property int|null $audio_duration_ms
 * @property \Illuminate\Support\Carbon|null $read_at
 *
 * @property-read string|null $audio_url
 * @property-read Conversation $conversation
 * @property-read User $sender
 */
final class DirectMessage extends Model
{
    use HasUuids;

    protected $fillable = ['conversation_id', 'sender_id', 'body', 'audio_path', 'audio_duration_ms', 'read_at'];

    protected $casts = ['read_at' => 'datetime', 'audio_duration_ms' => 'integer'];

    /** Public URL for the voice note, or null for text messages. */
    protected function audioUrl(): Attribute
    {
        return Attribute::get(fn (): ?string =>
            $this->audio_path ? Storage::disk('public')->url($this->audio_path) : null);
    }

    /** @return BelongsTo<Conversation, DirectMessage> */
    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    /** @return BelongsTo<User, DirectMessage> */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
