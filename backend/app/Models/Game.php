<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'key','name','name_ar','icon_url','icon_emoji',
        'platform','genre','supported_formats','is_active','sort_order',
    ];

    protected $casts = [
        'supported_formats' => 'array',
        'is_active'         => 'boolean',
        'sort_order'        => 'integer',
    ];
}
