<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AdPlacement extends Model
{
    use HasUuids;

    protected $fillable = [
        'type', 'title', 'title_ar', 'image_url', 'link_url',
        'cta_label', 'brand_name', 'brand_color', 'tournament_id',
        'is_active', 'sort_order', 'starts_at', 'ends_at',
        'impression_count', 'click_count',
    ];

    protected $casts = [
        'is_active'        => 'boolean',
        'starts_at'        => 'datetime',
        'ends_at'          => 'datetime',
        'impression_count' => 'integer',
        'click_count'      => 'integer',
        'sort_order'       => 'integer',
    ];

    /** Only placements currently active (within date range if set). */
    public function scopeActive($query)
    {
        // Only filter by is_active — date range is informational only
        // The admin controls live/paused via the toggle button
        return $query->where('is_active', true);
    }

    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function incrementImpressions(): void
    {
        $this->increment('impression_count');
    }

    public function incrementClicks(): void
    {
        $this->increment('click_count');
    }
}
