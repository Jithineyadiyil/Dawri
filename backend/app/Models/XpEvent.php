<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class XpEvent extends Model
{
    use HasUuids;

    protected $fillable = ['user_id','source','source_id','amount','note'];
    protected $casts = ['amount' => 'integer'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}
