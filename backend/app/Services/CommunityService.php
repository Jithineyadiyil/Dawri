<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Channel;
use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\Tournament;
use App\Models\User;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\CommunityRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Lifecycle orchestration for communities + channels.
 *
 * Public methods are idempotent (running them twice does not duplicate
 * resources) so they can be safely invoked from observers and listeners.
 */
final class CommunityService
{
    /** Default channels for the global Dawri Community. */
    public const GLOBAL_DEFAULT_CHANNELS = [
        ['name' => 'general',       'topic' => 'Welcome to Dawri — say hi!',                'type' => Channel::TYPE_TEXT],
        ['name' => 'announcements', 'topic' => 'Official news from the Dawri team',         'type' => Channel::TYPE_ANNOUNCEMENT],
        ['name' => 'ea-fc-25',      'topic' => 'EA FC 25 strategy, lineups, results',       'type' => Channel::TYPE_TEXT],
        ['name' => 'pubg-mobile',   'topic' => 'PUBG Mobile — squads, tactics, highlights', 'type' => Channel::TYPE_TEXT],
        ['name' => 'cod-mobile',    'topic' => 'Call of Duty Mobile community',             'type' => Channel::TYPE_TEXT],
        ['name' => 'tournaments',   'topic' => 'Upcoming events, brackets, signups',        'type' => Channel::TYPE_TEXT],
        ['name' => 'marketplace',   'topic' => 'Tips, deals, and digital goods chat',       'type' => Channel::TYPE_TEXT],
    ];

    /** Default channels for tournament-room communities. */
    public const TOURNAMENT_DEFAULT_CHANNELS = [
        ['name' => 'general',  'topic' => 'Tournament-wide chat',         'type' => Channel::TYPE_TEXT],
        ['name' => 'matches',  'topic' => 'Per-match coordination',       'type' => Channel::TYPE_TEXT],
        ['name' => 'rules',    'topic' => 'Organizer announcements only', 'type' => Channel::TYPE_ANNOUNCEMENT],
    ];

    public function __construct(
        private readonly CommunityRepositoryInterface $communities,
        private readonly ChannelRepositoryInterface $channels,
        private readonly CommunityMemberRepositoryInterface $members,
    ) {
    }

    /**
     * Idempotently provision the single platform-wide Dawri Community.
     * Called by GlobalCommunitySeeder + can be re-invoked any time.
     */
    public function ensureGlobalCommunity(): Community
    {
        $existing = $this->communities->findGlobal();
        if ($existing !== null) {
            return $existing;
        }

        return DB::transaction(function () {
            $community = $this->communities->create([
                'type'        => Community::TYPE_GLOBAL,
                'name'        => 'Dawri Community',
                'slug'        => Community::GLOBAL_SLUG,
                'description' => 'The official community for every Dawri player and organizer.',
                'is_active'   => true,
            ]);

            foreach (self::GLOBAL_DEFAULT_CHANNELS as $index => $cfg) {
                $this->channels->create([
                    'community_id' => $community->id,
                    'name'         => $cfg['name'],
                    'topic'        => $cfg['topic'],
                    'type'         => $cfg['type'],
                    'position'     => $index,
                ]);
            }

            return $community;
        });
    }

    /**
     * Idempotently provision the per-tournament private community room.
     * Called by TournamentObserver::created.
     */
    public function ensureTournamentCommunity(Tournament $tournament): Community
    {
        $existing = $this->communities->findByTournament($tournament->id);
        if ($existing !== null) {
            return $existing;
        }

        return DB::transaction(function () use ($tournament) {
            $shortId = substr(str_replace('-', '', $tournament->id), 0, 12);

            $community = $this->communities->create([
                'type'          => Community::TYPE_TOURNAMENT,
                'tournament_id' => $tournament->id,
                'name'          => $tournament->name . ' — Community',
                'slug'          => 'tour-' . $shortId,
                'description'   => sprintf('Private community for "%s" participants and organizers.', $tournament->name),
                'is_active'     => true,
            ]);

            foreach (self::TOURNAMENT_DEFAULT_CHANNELS as $index => $cfg) {
                $this->channels->create([
                    'community_id' => $community->id,
                    'name'         => $cfg['name'],
                    'topic'        => $cfg['topic'],
                    'type'         => $cfg['type'],
                    'position'     => $index,
                ]);
            }

            // The organizer is owner by default
            if (! empty($tournament->organizer_id)) {
                $this->members->attach($community->id, $tournament->organizer_id, CommunityMember::ROLE_OWNER);
            }

            return $community;
        });
    }

    /**
     * Add a participant to a tournament community when they register.
     * Called by TournamentObserver via TournamentRegistrationService.
     */
    public function joinTournamentCommunity(Tournament $tournament, User $user): ?CommunityMember
    {
        $community = $this->communities->findByTournament($tournament->id);
        if ($community === null) {
            // Defensive: tournament may have been created before Sprint 15.
            // Auto-provision the community now.
            $community = $this->ensureTournamentCommunity($tournament);
        }

        return $this->members->attach($community->id, $user->id, CommunityMember::ROLE_MEMBER);
    }

    /**
     * Join the global community. New users are added on registration
     * via a UserObserver (see RegisterUserCommunityListener).
     */
    public function joinGlobalCommunity(User $user): ?CommunityMember
    {
        $global = $this->communities->findGlobal();
        if ($global === null) {
            Log::warning('Global community missing — running ensureGlobalCommunity() now.');
            $global = $this->ensureGlobalCommunity();
        }

        return $this->members->attach($global->id, $user->id, CommunityMember::ROLE_MEMBER);
    }

    /**
     * Archive a tournament community some days after the tournament completes.
     * Scheduled by a console command (sprint 15 wiring docs).
     */
    public function archiveTournamentCommunity(Tournament $tournament): void
    {
        $community = $this->communities->findByTournament($tournament->id);
        if ($community === null || $community->isArchived()) {
            return;
        }

        $community->archived_at = now();
        $community->is_active = false;
        $community->save();
    }
}
