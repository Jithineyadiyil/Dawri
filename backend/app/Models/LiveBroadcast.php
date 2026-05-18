<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * LiveBroadcast — a YouTube Live broadcast created and managed by Dawri.
 *
 * Holds both the YouTube-side identifiers (broadcast id, stream id, RTMP
 * credentials) and Dawri-side links (tournament, match, creator). The
 * `stream_key_enc` column is transparently encrypted at rest via the
 * 'encrypted' cast — it must NEVER be returned through an API Resource.
 *
 * @property string                       $id
 * @property string|null                  $tournament_id
 * @property string|null                  $match_id
 * @property string                       $created_by
 * @property string                       $yt_broadcast_id
 * @property string|null                  $yt_stream_id
 * @property string                       $yt_channel_id
 * @property string                       $title
 * @property string|null                  $description
 * @property string                       $privacy           public|unlisted|private
 * @property string|null                  $rtmp_url
 * @property string|null                  $stream_key_enc    Decrypted on read via cast
 * @property string|null                  $watch_url
 * @property string|null                  $embed_url
 * @property string                       $status            created|ready|live|complete|failed
 * @property string                       $source            obs|browser|rtmp
 * @property string                       $trigger           manual|auto
 * @property \Carbon\CarbonImmutable|null $scheduled_start_at
 * @property \Carbon\CarbonImmutable|null $actual_start_at
 * @property \Carbon\CarbonImmutable|null $actual_end_at
 * @property string|null                  $last_error
 * @property int                          $failure_count
 *
 * @property-read Tournament|null      $tournament
 * @property-read TournamentMatch|null $match
 * @property-read User                  $creator
 */
class LiveBroadcast extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'live_broadcasts';

    /* ───────── Status / source / trigger / privacy constants ────────── */

    public const STATUS_CREATED  = 'created';
    public const STATUS_READY    = 'ready';
    public const STATUS_LIVE     = 'live';
    public const STATUS_COMPLETE = 'complete';
    public const STATUS_FAILED   = 'failed';

    public const SOURCE_OBS     = 'obs';
    public const SOURCE_BROWSER = 'browser';
    public const SOURCE_RTMP    = 'rtmp';

    public const TRIGGER_MANUAL = 'manual';
    public const TRIGGER_AUTO   = 'auto';

    public const PRIVACY_PUBLIC   = 'public';
    public const PRIVACY_UNLISTED = 'unlisted';
    public const PRIVACY_PRIVATE  = 'private';

    /* ───────── Mass assignment ──────────────────────────────────────── */

    protected $fillable = [
        'tournament_id', 'match_id', 'created_by',
        'yt_broadcast_id', 'yt_stream_id', 'yt_channel_id',
        'title', 'description', 'privacy',
        'rtmp_url', 'stream_key_enc',
        'watch_url', 'embed_url',
        'status', 'source', 'trigger',
        'scheduled_start_at', 'actual_start_at', 'actual_end_at',
        'last_error', 'failure_count',
    ];

    /* ───────── Casts ─────────────────────────────────────────────────── */

    protected $casts = [
        'stream_key_enc'     => 'encrypted',
        'scheduled_start_at' => 'datetime',
        'actual_start_at'    => 'datetime',
        'actual_end_at'      => 'datetime',
        'failure_count'      => 'integer',
    ];

    /* ───────── Hidden — these never leave the server ─────────────────── */

    protected $hidden = [
        'stream_key_enc',
        'last_error',
    ];

    /* ───────── Relationships ─────────────────────────────────────────── */

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function match(): BelongsTo
    {
        return $this->belongsTo(TournamentMatch::class, 'match_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /* ───────── Helpers ───────────────────────────────────────────────── */

    public function isLive(): bool
    {
        return $this->status === self::STATUS_LIVE;
    }

    public function isTerminal(): bool
    {
        return in_array($this->status, [self::STATUS_COMPLETE, self::STATUS_FAILED], true);
    }

    /**
     * Returns the decrypted RTMP stream key. Used exclusively by the
     * "reveal credentials" endpoint, which is rate-limited and audited.
     * Never include this value in a JsonResource.
     */
    public function getStreamKey(): ?string
    {
        return $this->stream_key_enc;   // cast handles decryption
    }
}
