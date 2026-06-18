<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property string $user_id
 * @property 'verified'|'professional' $requested_tier
 * @property 'pending'|'approved'|'rejected' $status
 * @property string $legal_name
 * @property string|null $organization_name
 * @property string $country
 * @property string|null $city
 * @property string|null $website
 * @property string|null $phone
 * @property string|null $reason
 * @property string|null $decided_by
 * @property \Illuminate\Support\Carbon|null $decided_at
 * @property string|null $decision_note
 */
final class OrganizerVerificationRequest extends Model
{
    use HasUuids;

    public const STATUS_PENDING  = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'user_id', 'requested_tier', 'status',
        'legal_name', 'organization_name', 'country', 'city', 'website', 'phone', 'reason',
        'decided_by', 'decided_at', 'decision_note',
    ];

    protected $casts = [
        'decided_at' => 'datetime',
    ];

    /** @return BelongsTo<User, OrganizerVerificationRequest> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<User, OrganizerVerificationRequest> */
    public function decider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'decided_by');
    }
}
