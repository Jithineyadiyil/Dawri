<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class UserAchievement extends Model
{
    use HasUuids;

    protected $fillable = ['user_id','achievement_id','progress','threshold','unlocked_at'];

    protected $casts = [
        'progress' => 'integer',
        'threshold' => 'integer',
        'unlocked_at' => 'datetime',
    ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function achievement(): BelongsTo { return $this->belongsTo(Achievement::class); }

    public function isUnlocked(): bool { return $this->unlocked_at !== null; }
}
