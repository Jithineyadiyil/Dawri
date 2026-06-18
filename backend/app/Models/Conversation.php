<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Conversation — a 1:1 private chat between two users.
 *
 * @property string $id
 * @property string $user_one_id
 * @property string $user_two_id
 * @property \Illuminate\Support\Carbon|null $last_message_at
 *
 * @property-read User $userOne
 * @property-read User $userTwo
 */
final class Conversation extends Model
{
    use HasUuids;

    public const TYPE_DM    = 'dm';
    public const TYPE_GROUP = 'group';
    public const TYPE_TEAM  = 'team';

    protected $fillable = [
        'type', 'team_id', 'name', 'created_by',
        'user_one_id', 'user_two_id', 'last_message_at',
    ];

    protected $casts = ['last_message_at' => 'datetime'];

    /** @return BelongsToMany<User> */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_participants')
            ->withPivot(['joined_at', 'last_read_at'])
            ->withTimestamps();
    }

    /** @return BelongsTo<Team, Conversation> */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /** @return BelongsTo<User, Conversation> */
    public function userOne(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    /** @return BelongsTo<User, Conversation> */
    public function userTwo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }

    /** @return HasMany<DirectMessage> */
    public function messages(): HasMany
    {
        return $this->hasMany(DirectMessage::class);
    }

    /**
     * True if the given user is a member of this conversation.
     * Checks the participants table — works for DMs, groups, and team chats.
     */
    public function hasParticipant(string $userId): bool
    {
        return $this->participants()->where('users.id', $userId)->exists();
    }

    /** The other participant's id relative to the given user id. */
    public function otherUserId(string $userId): string
    {
        return $this->user_one_id === $userId ? $this->user_two_id : $this->user_one_id;
    }

    /**
     * Find-or-create the single conversation for an unordered user pair.
     * Stores the two ids in canonical (sorted) order so the unique index
     * guarantees exactly one row per pair.
     */
    public static function between(string $a, string $b): self
    {
        [$one, $two] = $a < $b ? [$a, $b] : [$b, $a];

        $conv = self::firstOrCreate(
            ['user_one_id' => $one, 'user_two_id' => $two, 'type' => self::TYPE_DM],
            ['type' => self::TYPE_DM],
        );
        // Ensure both users are in the participants table (idempotent, fixes
        // any DM that pre-dated the multi-party migration).
        \Illuminate\Support\Facades\DB::table('conversation_participants')->insertOrIgnore([
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'conversation_id' => $conv->id, 'user_id' => $a, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
            ['id' => (string) \Illuminate\Support\Str::uuid(), 'conversation_id' => $conv->id, 'user_id' => $b, 'joined_at' => now(), 'created_at' => now(), 'updated_at' => now()],
        ]);
        return $conv;
    }

    /**
     * Find-or-create the conversation for a team. One row per team.
     * All current team members are kept in sync via TeamMemberObserver
     * (or whenever this is called from TeamController).
     */
    public static function forTeam(Team $team, User $createdBy): self
    {
        $conv = self::firstOrCreate(
            ['team_id' => $team->id, 'type' => self::TYPE_TEAM],
            ['name' => $team->name, 'created_by' => $createdBy->id],
        );
        return $conv;
    }
}
