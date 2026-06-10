<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * Phase 3 — an image attached to a message.
 *
 * @property string   $id
 * @property string   $message_id
 * @property string   $path
 * @property string   $mime
 * @property int      $size
 * @property int|null $width
 * @property int|null $height
 * @property int      $position
 * @property-read string $url
 */
final class MessageAttachment extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'message_id',
        'path',
        'mime',
        'size',
        'width',
        'height',
        'position',
    ];

    protected $casts = [
        'size'     => 'integer',
        'width'    => 'integer',
        'height'   => 'integer',
        'position' => 'integer',
    ];

    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }

    /** Public URL for the stored image (mirrors User::avatar_url). */
    protected function url(): Attribute
    {
        return Attribute::make(
            get: fn (): string => Storage::disk('public')->url($this->path),
        );
    }
}
