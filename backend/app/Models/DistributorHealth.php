<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * DistributorHealth
 *
 * Tracks the health state of each configured distributor for circuit-breaker
 * routing. Schema already exists per the integration plan; this model
 * provides an Eloquent wrapper.
 *
 * @property string            $distributor       PK — lowercase distributor name (e.g. "wupex")
 * @property bool              $is_active         Whether the adapter is enabled at all
 * @property \Carbon\Carbon    $last_success_at
 * @property \Carbon\Carbon    $last_failure_at
 * @property int               $failure_count     Reset to 0 on each success
 * @property 'closed'|'open'|'half-open' $circuit_status
 */
class DistributorHealth extends Model
{
    // Table name is singular (avoid Laravel's auto-pluralization)
    protected $table = 'distributor_health';

    // Primary key is the distributor name (string, not auto-increment)
    protected $primaryKey = 'distributor';
    public    $incrementing = false;
    protected $keyType     = 'string';

    public $timestamps = true;
    const CREATED_AT = null;
    // updated_at only

    protected $fillable = [
        'distributor',
        'is_active',
        'last_success_at',
        'last_failure_at',
        'failure_count',
        'circuit_status',
    ];

    protected $casts = [
        'is_active'       => 'boolean',
        'last_success_at' => 'datetime',
        'last_failure_at' => 'datetime',
        'failure_count'   => 'integer',
    ];
}
