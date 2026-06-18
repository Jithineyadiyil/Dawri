<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Friendship
 *
 * One row per unordered user pair. See the migration for the data model.
 *
 * @property string                     $id
 * @property string                     $requester_id
 * @property string                     $addressee_id
 * @property 'pending'|'accepted'       $status
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @property-read User $requester
 * @property-read User $addressee
 */
final class Friendship extends Model
{
    use HasUuids;

    public const STATUS_PENDING  = 'pending';
    public const STATUS_ACCEPTED = 'accepted';

    /** @var list<string> */
    protected $fillable = ['requester_id', 'addressee_id', 'status'];

    /** @return BelongsTo<User, Friendship> */
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    /** @return BelongsTo<User, Friendship> */
    public function addressee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'addressee_id');
    }

    /** The "other" user relative to the given user id. */
    public function otherUser(string $userId): ?User
    {
        return $this->requester_id === $userId ? $this->addressee : $this->requester;
    }
}
