<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class Achievement extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'key','name','name_ar','description','description_ar',
        'icon','tier','category','xp_reward','is_secret','sort_order',
    ];

    protected $casts = [
        'xp_reward' => 'integer',
        'is_secret' => 'boolean',
        'sort_order'=> 'integer',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_achievements')
            ->withPivot(['progress','threshold','unlocked_at'])
            ->withTimestamps();
    }
}
