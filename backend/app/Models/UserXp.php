<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class UserXp extends Model
{
    use HasUuids;

    protected $table = 'user_xp';
    protected $fillable = ['user_id','total_xp','level'];
    protected $casts = ['total_xp' => 'integer', 'level' => 'integer'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }

    /**
     * XP needed to reach the NEXT level from the current total.
     * Curve: level N requires 100 * N * (N+1) / 2 cumulative XP.
     */
    public function xpForNextLevel(): int
    {
        $next = $this->level + 1;
        return 100 * $next * ($next + 1) / 2;
    }

    public function xpForCurrentLevel(): int
    {
        return 100 * $this->level * ($this->level + 1) / 2;
    }
}
