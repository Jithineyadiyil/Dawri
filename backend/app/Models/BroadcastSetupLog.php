<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * BroadcastSetupLog — append-only analytics row for the OBS Setup Wizard.
 *
 * @property string                              $id
 * @property string|null                         $broadcast_id
 * @property string|null                         $tournament_id
 * @property string                              $user_id
 * @property string                              $event
 * @property int|null                            $step_number
 * @property string|null                         $platform
 * @property string|null                         $source
 * @property array<string,mixed>|null            $metadata
 * @property string|null                         $ip_address
 * @property \Illuminate\Support\Carbon          $created_at
 *
 * @property-read LiveBroadcast|null             $broadcast
 * @property-read Tournament|null                $tournament
 * @property-read User                           $user
 */
class BroadcastSetupLog extends Model
{
    use HasFactory, HasUuids;

    /** Append-only: no updated_at. */
    public const UPDATED_AT = null;

    /** @var string */
    protected $table = 'broadcast_setup_logs';

    /** @var list<string> */
    protected $fillable = [
        'broadcast_id',
        'tournament_id',
        'user_id',
        'event',
        'step_number',
        'platform',
        'source',
        'metadata',
        'ip_address',
    ];

    /** @var array<string,string> */
    protected $casts = [
        'metadata'    => 'array',
        'step_number' => 'integer',
        'created_at'  => 'datetime',
    ];

    /**
     * Allowed event codes. Keep in sync with the Angular WizardEvent type.
     *
     * @var list<string>
     */
    public const EVENTS = [
        'wizard_opened',
        'step_viewed',
        'step_completed',
        'rtmp_copied',
        'key_copied',
        'stream_verified',
        'wizard_completed',
        'wizard_abandoned',
        'error_encountered',
    ];

    /**
     * Allowed platform values (mirrors LogWizardEventRequest).
     *
     * @var list<string>
     */
    public const PLATFORMS = ['windows', 'macos', 'linux', 'unknown'];

    /* ────────────── Relationships ────────────── */

    /**
     * @return BelongsTo<LiveBroadcast, BroadcastSetupLog>
     */
    public function broadcast(): BelongsTo
    {
        return $this->belongsTo(LiveBroadcast::class, 'broadcast_id');
    }

    /**
     * @return BelongsTo<Tournament, BroadcastSetupLog>
     */
    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    /**
     * @return BelongsTo<User, BroadcastSetupLog>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
