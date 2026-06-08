<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserPresence
 *
 * Persisted presence state. The PrimaryKey IS user_id (1:1 with users).
 * PresenceService is the only writer; controllers and UI components
 * are read-only consumers.
 *
 * @property string                       $user_id
 * @property 'online'|'idle'|'offline'    $status
 * @property \Illuminate\Support\Carbon   $last_seen_at
 *
 * @property-read User $user
 */
final class UserPresence extends Model
{
    public const STATUS_ONLINE  = 'online';
    public const STATUS_IDLE    = 'idle';
    public const STATUS_OFFLINE = 'offline';

    /** Online users whose last_seen is older than this become "idle". */
    public const IDLE_AFTER_MINUTES = 5;

    /** Idle users whose last_seen is older than this become "offline". */
    public const OFFLINE_AFTER_MINUTES = 30;

    protected $table      = 'user_presence';
    protected $primaryKey = 'user_id';
    public $incrementing  = false;
    protected $keyType    = 'string';

    /** @var list<string> */
    protected $fillable = ['user_id', 'status', 'last_seen_at'];

    /** @var array<string, string> */
    protected $casts = [
        'last_seen_at' => 'datetime',
    ];

    /** @return BelongsTo<User, UserPresence> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
