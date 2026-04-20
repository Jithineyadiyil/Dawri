<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Represents a competitive season for ranking purposes.
 *
 * @property string $id
 * @property string $name
 * @property \Carbon\Carbon $starts_at
 * @property \Carbon\Carbon $ends_at
 * @property bool $is_active
 */
class Season extends Model
{
    use HasUuids;

    /** @var string */
    protected $table = 'seasons';

    /** @var list<string> */
    protected $fillable = ['name', 'starts_at', 'ends_at', 'is_active'];

    /** @var array<string, string> */
    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at'   => 'datetime',
        'is_active' => 'boolean',
    ];

    public function rankings(): HasMany
    {
        return $this->hasMany(PlayerRanking::class);
    }

    /**
     * Get the currently active season.
     */
    public static function current(): ?self
    {
        return static::where('is_active', true)
            ->where('starts_at', '<=', now())
            ->where('ends_at', '>=', now())
            ->first();
    }
}
