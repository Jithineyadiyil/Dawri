<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Subscription;
use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    /**
     * GET /api/v1/dashboard
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $role = $user->role ?? 'player';

        return match ($role) {
            'admin'     => $this->adminDashboard(),
            'organizer' => $this->organizerDashboard($user),
            default     => $this->playerDashboard($user),
        };
    }

    private function adminDashboard(): JsonResponse
    {
        $totalUsers = User::count();
        $totalTournaments = Tournament::count();
        $activeTournaments = Tournament::whereIn('status', ['registration_open', 'in_progress'])->count();
        $completedTournaments = Tournament::where('status', 'completed')->count();

        // Subscriptions
        $subsByPlan = [];
        if (Schema::hasTable('subscriptions')) {
            $subsByPlan = Subscription::whereIn('status', ['active', 'trial'])
                ->select('plan', DB::raw('COUNT(*) as count'))
                ->groupBy('plan')
                ->pluck('count', 'plan')
                ->toArray();
        }

        // Revenue
        $monthlyRevenue = 0;
        $totalRevenue = 0;
        $revenueTrend = [];
        if (Schema::hasTable('invoices')) {
            $monthlyRevenue = Invoice::where('status', 'paid')
                ->where('created_at', '>=', now()->startOfMonth())
                ->sum('total');
            $totalRevenue = Invoice::where('status', 'paid')->sum('total');
            $revenueTrend = Invoice::where('status', 'paid')
                ->where('created_at', '>=', now()->subMonths(6))
                ->select(DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"), DB::raw('SUM(total) as total'))
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->toArray();
        }

        $mau = TournamentParticipant::where('registered_at', '>=', now()->subDays(30))
            ->distinct('user_id')
            ->count('user_id');

        $recentSignups = User::where('created_at', '>=', now()->subDays(7))->count();

        $completionRate = $totalTournaments > 0
            ? round(($completedTournaments / $totalTournaments) * 100, 1)
            : 0;

        $recentTournaments = Tournament::latest()
            ->limit(5)
            ->get(['id', 'name', 'game', 'status', 'created_at']);

        return response()->json([
            'data' => [
                'role' => 'admin',
                'stats' => [
                    ['label' => 'Total Users',         'value' => $totalUsers,         'icon' => 'users'],
                    ['label' => 'Active Tournaments',  'value' => $activeTournaments,  'icon' => 'trophy'],
                    ['label' => 'Monthly Revenue',     'value' => $monthlyRevenue,     'icon' => 'revenue', 'format' => 'currency'],
                    ['label' => 'Monthly Active Users', 'value' => $mau,               'icon' => 'activity'],
                ],
                'subscriptions_by_plan' => $subsByPlan,
                'total_revenue'         => $totalRevenue,
                'recent_signups'        => $recentSignups,
                'completion_rate'       => $completionRate,
                'revenue_trend'         => $revenueTrend,
                'recent_tournaments'    => $recentTournaments,
            ],
        ]);
    }

    private function organizerDashboard(User $user): JsonResponse
    {
        $hasOrganizerId = Schema::hasColumn('tournaments', 'organizer_id');

        $myTournamentsQuery = $hasOrganizerId
            ? Tournament::where('organizer_id', $user->id)
            : Tournament::query(); // fallback: show all if no organizer_id

        $total = (clone $myTournamentsQuery)->count();
        $active = (clone $myTournamentsQuery)->whereIn('status', ['registration_open', 'in_progress'])->count();
        $completed = (clone $myTournamentsQuery)->where('status', 'completed')->count();

        $tournamentIds = (clone $myTournamentsQuery)->pluck('id');
        $totalParticipants = TournamentParticipant::whereIn('tournament_id', $tournamentIds)
            ->distinct('user_id')
            ->count('user_id');

        // Subscription
        $sub = null;
        $plan = $user->subscription_plan ?? 'free';
        $planConfig = config("plans.plans.{$plan}", config('plans.plans.free'));

        if (Schema::hasTable('subscriptions')) {
            $sub = Subscription::where('user_id', $user->id)
                ->whereIn('status', ['active', 'trial'])
                ->latest()
                ->first();
        }

        $tournamentsThisMonth = (clone $myTournamentsQuery)
            ->where('created_at', '>=', now()->startOfMonth())
            ->count();

        $recentTournaments = (clone $myTournamentsQuery)
            ->withCount('participants')
            ->latest()
            ->limit(10)
            ->get(['id', 'name', 'name_ar', 'game', 'format', 'status', 'max_participants', 'created_at']);

        return response()->json([
            'data' => [
                'role' => 'organizer',
                'stats' => [
                    ['label' => 'My Tournaments',    'value' => $total,             'icon' => 'trophy'],
                    ['label' => 'Active Now',        'value' => $active,            'icon' => 'live'],
                    ['label' => 'Total Participants', 'value' => $totalParticipants, 'icon' => 'users'],
                    ['label' => 'Completion Rate',   'value' => $total > 0 ? round(($completed / $total) * 100) . '%' : '0%', 'icon' => 'check'],
                ],
                'subscription' => [
                    'plan'          => $plan,
                    'plan_name'     => $planConfig['name'] ?? $plan,
                    'plan_name_ar'  => $planConfig['name_ar'] ?? '',
                    'status'        => $sub?->status ?? 'none',
                    'on_trial'      => $sub?->onTrial() ?? false,
                    'trial_ends_at' => $sub?->trial_ends_at?->toIso8601String(),
                    'period_end'    => $sub?->current_period_end?->toIso8601String(),
                    'price'         => $sub?->price ?? 0,
                ],
                'usage' => [
                    'tournaments_this_month' => $tournamentsThisMonth,
                    'limit'                  => $planConfig['limits']['tournaments_per_month'] ?? 0,
                ],
                'recent_tournaments' => $recentTournaments,
            ],
        ]);
    }

    private function playerDashboard(User $user): JsonResponse
    {
        $participations = TournamentParticipant::where('user_id', $user->id);
        $totalTournaments = (clone $participations)->count();
        $totalWins = (clone $participations)->sum('wins');
        $totalLosses = (clone $participations)->sum('losses');
        $winRate = ($totalWins + $totalLosses) > 0
            ? round(($totalWins / ($totalWins + $totalLosses)) * 100, 1)
            : 0;

        // Rankings
        $rankings = [];
        if (Schema::hasTable('player_rankings')) {
            $rankings = \App\Models\PlayerRanking::where('user_id', $user->id)
                ->orderByDesc('total_points')
                ->get(['game', 'rank_position', 'total_points', 'wins', 'losses'])
                ->toArray();
        }

        // Wallet
        $walletBalance = 0;
        if (Schema::hasTable('wallets')) {
            $wallet = \App\Models\Wallet::where('user_id', $user->id)->first();
            $walletBalance = $wallet ? (float) $wallet->balance : 0;
        }

        // Upcoming matches
        $participantIds = TournamentParticipant::where('user_id', $user->id)->pluck('id');
        $upcomingMatches = [];
        if ($participantIds->isNotEmpty()) {
            $upcomingMatches = \App\Models\TournamentMatch::with('bracket.tournament:id,name,game')
                ->where(function ($q) use ($participantIds) {
                    $q->whereIn('participant_a_id', $participantIds)
                      ->orWhereIn('participant_b_id', $participantIds);
                })
                ->where('status', 'active')
                ->limit(5)
                ->get()
                ->toArray();
        }

        // Recent results
        $recentResults = TournamentParticipant::with('tournament:id,name,game,status')
            ->where('user_id', $user->id)
            ->orderByDesc('registered_at')
            ->limit(5)
            ->get()
            ->toArray();

        return response()->json([
            'data' => [
                'role' => 'player',
                'stats' => [
                    ['label' => 'Tournaments', 'value' => $totalTournaments, 'icon' => 'trophy'],
                    ['label' => 'Wins',        'value' => $totalWins,        'icon' => 'win'],
                    ['label' => 'Win Rate',    'value' => $winRate . '%',    'icon' => 'percent'],
                    ['label' => 'Wallet',      'value' => $walletBalance,    'icon' => 'wallet', 'format' => 'currency'],
                ],
                'rankings'         => $rankings,
                'upcoming_matches' => $upcomingMatches,
                'recent_results'   => $recentResults,
            ],
        ]);
    }
}
