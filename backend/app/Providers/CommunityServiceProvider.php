<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Tournament;
use App\Observers\TournamentObserver;
use App\Repositories\Contracts\ChannelRepositoryInterface;
use App\Repositories\Contracts\CommunityMemberRepositoryInterface;
use App\Repositories\Contracts\CommunityRepositoryInterface;
use App\Repositories\Contracts\MessageRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Repositories\Contracts\PollRepositoryInterface;
use App\Repositories\Eloquent\ChannelRepository;
use App\Repositories\Eloquent\CommunityMemberRepository;
use App\Repositories\Eloquent\CommunityRepository;
use App\Repositories\Eloquent\MessageRepository;
use App\Repositories\Eloquent\EventRepository;
use App\Repositories\Eloquent\PollRepository;
use Illuminate\Support\ServiceProvider;

/**
 * Sprint 15 — wires repository contracts to Eloquent implementations and
 * registers the Tournament observer. Add to bootstrap/providers.php:
 *
 *   App\Providers\CommunityServiceProvider::class,
 */
final class CommunityServiceProvider extends ServiceProvider
{
    /** @var array<class-string, class-string> */
    public array $bindings = [
        CommunityRepositoryInterface::class       => CommunityRepository::class,
        ChannelRepositoryInterface::class         => ChannelRepository::class,
        MessageRepositoryInterface::class         => MessageRepository::class,
        CommunityMemberRepositoryInterface::class => CommunityMemberRepository::class,
        PollRepositoryInterface::class            => PollRepository::class,
        EventRepositoryInterface::class           => EventRepository::class,
    ];

    public function register(): void
    {
        // Bindings declared on the property are auto-registered by Laravel.
    }

    public function boot(): void
    {
        Tournament::observe(TournamentObserver::class);
    }
}
