<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

/**
 * Tournament — Sprint 3 adds cover image, rules, company link, brand override.
 */
class Tournament extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'tournaments';

    protected $fillable = [
        'name', 'name_ar', 'game', 'format',
        'max_participants', 'swiss_rounds',
        'registration_closes_at', 'starts_at', 'timezone',
        'is_public', 'entry_fee_sar', 'prize_pool',
        'organizer_id', 'moderator_id', 'company_id', 'status',
        'cover_image_path', 'rules', 'brand_override',
        'primary_color', 'secondary_color', 'accent_color',
        'background_color', 'font_family', 'logo_url',
    ];

    protected $casts = [
        'is_public'              => 'boolean',
        'brand_override'         => 'boolean',
        'prize_pool'             => 'array',
        'registration_closes_at' => 'datetime',
        'starts_at'              => 'datetime',
        'swiss_rounds'           => 'integer',
        'max_participants'       => 'integer',
        'entry_fee_sar'          => 'integer',
    ];

    protected $attributes = [
        'is_public'      => true,
        'brand_override' => false,
        'timezone'       => 'Asia/Riyadh',
        'entry_fee_sar'  => 0,
    ];

    protected $appends = ['cover_image_url'];

    public function organizer(): BelongsTo   { return $this->belongsTo(User::class, 'organizer_id'); }
    public function moderator(): BelongsTo   { return $this->belongsTo(User::class, 'moderator_id'); }
    public function company(): BelongsTo     { return $this->belongsTo(Company::class); }
    public function participants(): HasMany  { return $this->hasMany(TournamentParticipant::class); }
    public function bracket(): HasOne        { return $this->hasOne(Bracket::class); }
    public function matches(): HasManyThrough
    {
        return $this->hasManyThrough(
            TournamentMatch::class, Bracket::class,
            'tournament_id', 'bracket_id', 'id', 'id',
        );
    }

    protected function coverImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn (): ?string => $this->cover_image_path
                ? Storage::disk('public')->url($this->cover_image_path)
                : null,
        );
    }

    public function isRegistrationOpen(): bool
    {
        return in_array($this->status, ['registration', 'registration_open'], true);
    }

    public function isInProgress(): bool { return $this->status === 'in_progress'; }
    public function isCompleted(): bool  { return $this->status === 'completed'; }

    public function hasRules(): bool
    {
        return ! empty(trim((string) $this->rules));
    }
}
