<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Models\Invoice;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Tournament;
use App\Models\TournamentParticipant;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminController extends Controller
{
    // ═══════════════════════════════════════════════════════════════════
    // PLATFORM OVERVIEW
    // ═══════════════════════════════════════════════════════════════════

    public function overview(): JsonResponse
    {
        $totalCompanies    = Schema::hasTable('companies') ? Company::count() : 0;
        $activeCompanies   = Schema::hasTable('companies') ? Company::where('status', 'active')->count() : 0;
        $trialCompanies    = Schema::hasTable('companies') ? Company::where('status', 'trial')->count() : 0;
        $totalUsers        = User::count();
        $totalTournaments  = Tournament::count();
        $activeTournaments = Tournament::whereIn('status', ['registration_open', 'in_progress'])->count();

        $mrr = Schema::hasTable('subscriptions')
            ? Subscription::where('status', 'active')->sum('price') : 0;
        $totalRevenue = Schema::hasTable('invoices')
            ? Invoice::where('status', 'paid')->sum('total') : 0;
        $monthlyRevenue = Schema::hasTable('invoices')
            ? Invoice::where('status', 'paid')->where('created_at', '>=', now()->startOfMonth())->sum('total') : 0;

        $subsByPlan = Schema::hasTable('subscriptions')
            ? Subscription::whereIn('status', ['active', 'trial'])
                ->select('plan', DB::raw('COUNT(*) as count'), DB::raw('SUM(price) as revenue'))
                ->groupBy('plan')->get() : [];

        $revenueTrend = Schema::hasTable('invoices')
            ? Invoice::where('status', 'paid')->where('created_at', '>=', now()->subMonths(6))
                ->select(DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"), DB::raw('SUM(total) as total'))
                ->groupBy('month')->orderBy('month')->get() : [];

        $recentCompanies = Schema::hasTable('companies')
            ? Company::latest()->limit(5)->get(['id', 'name', 'name_ar', 'status', 'industry', 'created_at']) : [];

        return response()->json(['data' => [
            'stats' => [
                ['label' => 'Total Companies',    'value' => $totalCompanies,   'icon' => 'building'],
                ['label' => 'Active Companies',   'value' => $activeCompanies,  'icon' => 'check'],
                ['label' => 'On Trial',           'value' => $trialCompanies,   'icon' => 'clock'],
                ['label' => 'MRR',                'value' => $mrr,              'icon' => 'revenue', 'format' => 'currency'],
                ['label' => 'Total Users',        'value' => $totalUsers,       'icon' => 'users'],
                ['label' => 'Active Tournaments', 'value' => $activeTournaments,'icon' => 'trophy'],
                ['label' => 'Monthly Revenue',    'value' => $monthlyRevenue,   'icon' => 'chart',   'format' => 'currency'],
                ['label' => 'Total Revenue',      'value' => $totalRevenue,     'icon' => 'wallet',  'format' => 'currency'],
            ],
            'subscriptions_by_plan' => $subsByPlan,
            'revenue_trend'         => $revenueTrend,
            'recent_companies'      => $recentCompanies,
        ]]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // PLAN MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════

    public function plans(): JsonResponse
    {
        if (! Schema::hasTable('plans')) {
            return response()->json(['data' => config('plans.plans', [])]);
        }

        $plans = Plan::orderBy('sort_order')->get()->map->toApiArray();
        return response()->json(['data' => $plans]);
    }

    public function updatePlan(Request $request, string $key): JsonResponse
    {
        $plan = Plan::findOrFail($key);

        $data = $request->validate([
            'name'           => ['string', 'max:100'],
            'name_ar'        => ['nullable', 'string', 'max:100'],
            'price'          => ['nullable', 'numeric', 'min:0'],
            'description'    => ['nullable', 'string', 'max:500'],
            'description_ar' => ['nullable', 'string', 'max:500'],
            'is_active'      => ['boolean'],
            'limit_tournaments_per_month' => ['integer', 'min:-1'],
            'limit_max_participants'      => ['integer', 'min:0'],
            'limit_max_employees'         => ['integer', 'min:-1'],
            'limit_moderators'            => ['integer', 'min:-1'],
            'feat_create_tournaments'     => ['boolean'],
            'feat_hr_csv_import'          => ['boolean'],
            'feat_hr_api_integration'     => ['boolean'],
            'feat_white_label'            => ['boolean'],
            'feat_bulk_prizes'            => ['boolean'],
            'feat_engagement_reports'     => ['boolean'],
            'feat_advanced_analytics'     => ['boolean'],
            'feat_sso_saml'               => ['boolean'],
            'feat_dedicated_manager'      => ['boolean'],
            'feat_custom_sla'             => ['boolean'],
        ]);

        $plan->update($data);

        return response()->json(['data' => $plan->fresh()->toApiArray(), 'message' => 'Plan updated.']);
    }

    // ═══════════════════════════════════════════════════════════════════
    // COMPANIES
    // ═══════════════════════════════════════════════════════════════════

    public function companies(Request $request): JsonResponse
    {
        $query = Company::withCount(['users', 'tournaments']);

        if ($request->filled('search')) {
            $s = $request->input('search');
            $query->where(fn($q) => $q->where('name', 'like', "%{$s}%")
                ->orWhere('domain', 'like', "%{$s}%")
                ->orWhere('contact_email', 'like', "%{$s}%"));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $companies = $query->orderByDesc('created_at')->paginate($request->integer('per_page', 20));

        // Attach active subscription to each company
        $companyIds = collect($companies->items())->pluck('id');
        $activeSubs = Subscription::whereIn('company_id', $companyIds)
            ->whereIn('status', ['active', 'trial'])
            ->get()
            ->keyBy('company_id');

        $items = collect($companies->items())->map(function ($c) use ($activeSubs) {
            $arr = $c->toArray();
            $arr['active_subscription'] = $activeSubs[$c->id] ?? null;
            return $arr;
        });

        return response()->json([
            'data' => $items,
            'meta' => [
                'total'        => $companies->total(),
                'current_page' => $companies->currentPage(),
                'last_page'    => $companies->lastPage(),
            ],
        ]);
    }

    public function createCompany(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'           => ['required', 'string', 'max:200'],
            'name_ar'        => ['nullable', 'string', 'max:200'],
            'domain'         => ['nullable', 'string', 'max:100'],
            'industry'       => ['nullable', 'string', 'max:100'],
            'country'        => ['string', 'size:2'],
            'city'           => ['nullable', 'string', 'max:100'],
            'contact_name'   => ['nullable', 'string', 'max:100'],
            'contact_email'  => ['nullable', 'email'],
            'contact_phone'  => ['nullable', 'string', 'max:30'],
            'employee_count' => ['integer', 'min:1'],
            'cr_number'      => ['nullable', 'string', 'max:50'],
        ]);

        $company = Company::create(array_merge($data, ['status' => 'active']));
        return response()->json(['data' => $company], 201);
    }

    public function showCompany(string $id): JsonResponse
    {
        $company = Company::withCount(['users', 'tournaments'])->findOrFail($id);

        $users = User::where('company_id', $id)->get(['id', 'name', 'email', 'role', 'created_at']);
        $tournaments = Tournament::where('company_id', $id)->withCount('participants')
            ->orderByDesc('created_at')->limit(20)->get();
        $subs = Subscription::where('company_id', $id)->orderByDesc('created_at')->get();
        $invoices = Invoice::whereIn('subscription_id', $subs->pluck('id'))
            ->orderByDesc('created_at')->limit(20)->get();

        return response()->json(['data' => [
            'company'     => $company,
            'users'       => $users,
            'tournaments' => $tournaments,
            'subscriptions' => $subs,
            'invoices'    => $invoices,
        ]]);
    }

    public function updateCompany(Request $request, string $id): JsonResponse
    {
        $company = Company::findOrFail($id);
        $company->update($request->validate([
            'name'           => ['string', 'max:200'],
            'name_ar'        => ['nullable', 'string', 'max:200'],
            'domain'         => ['nullable', 'string', 'max:100'],
            'industry'       => ['nullable', 'string', 'max:100'],
            'country'        => ['string', 'size:2'],
            'city'           => ['nullable', 'string', 'max:100'],
            'contact_name'   => ['nullable', 'string', 'max:100'],
            'contact_email'  => ['nullable', 'email'],
            'contact_phone'  => ['nullable', 'string', 'max:30'],
            'employee_count' => ['integer', 'min:1'],
            'cr_number'      => ['nullable', 'string', 'max:50'],
            'status'         => ['string', 'in:active,suspended,churned,trial'],
            'notes'          => ['nullable', 'string', 'max:2000'],
        ]));
        return response()->json(['data' => $company->fresh()]);
    }

    public function deleteCompany(string $id): JsonResponse
    {
        $company = Company::findOrFail($id);
        if ($company->users()->count() > 0) {
            return response()->json(['message' => 'Cannot delete company with active users.'], 422);
        }
        $company->delete();
        return response()->json(['message' => 'Company deleted.']);
    }

    // ═══════════════════════════════════════════════════════════════════
    // SUBSCRIPTIONS
    // ═══════════════════════════════════════════════════════════════════

    public function subscriptions(Request $request): JsonResponse
    {
        $query = Subscription::with('user:id,name,email,company_id')->orderByDesc('created_at');
        if ($request->filled('status')) $query->where('status', $request->input('status'));
        if ($request->filled('plan'))   $query->where('plan', $request->input('plan'));

        $subs = $query->paginate($request->integer('per_page', 20));
        return response()->json(['data' => $subs->items(), 'meta' => [
            'total' => $subs->total(), 'current_page' => $subs->currentPage(), 'last_page' => $subs->lastPage(),
        ]]);
    }

    public function createSubscription(Request $request): JsonResponse
    {
        $data = $request->validate([
            'company_id' => ['required', 'uuid', 'exists:companies,id'],
            'user_id'    => ['required', 'uuid', 'exists:users,id'],
            'plan'       => ['required', 'string', 'in:starter,professional,enterprise'],
            'price'      => ['required', 'numeric', 'min:0'],
            'months'     => ['integer', 'min:1', 'max:36'],
            'notes'      => ['nullable', 'string'],
        ]);

        $months = $data['months'] ?? 1;
        Subscription::where('user_id', $data['user_id'])
            ->whereIn('status', ['active', 'trial'])
            ->update(['status' => 'cancelled', 'cancelled_at' => now()]);

        $sub = Subscription::create([
            'user_id' => $data['user_id'], 'company_id' => $data['company_id'],
            'plan' => $data['plan'], 'status' => 'active', 'price' => $data['price'],
            'billing_cycle' => 'monthly',
            'current_period_start' => now(), 'current_period_end' => now()->addMonths($months),
            'metadata' => ['admin_created' => true, 'notes' => $data['notes'] ?? null],
        ]);

        User::where('id', $data['user_id'])->update(['subscription_plan' => $data['plan'], 'company_id' => $data['company_id']]);
        Company::where('id', $data['company_id'])->update(['status' => 'active']);

        $vat = round($data['price'] * 0.15, 2);
        Invoice::create([
            'subscription_id' => $sub->id, 'user_id' => $data['user_id'],
            'invoice_number' => Invoice::nextNumber(),
            'subtotal' => $data['price'], 'vat_amount' => $vat, 'total' => round($data['price'] + $vat, 2),
            'currency' => 'SAR', 'status' => 'paid',
            'period_start' => now(), 'period_end' => now()->addMonths($months), 'paid_at' => now(),
            'payment_method' => 'admin_override',
            'line_items' => [['description' => ucfirst($data['plan']) . " Plan ({$months}mo)", 'amount' => $data['price']]],
        ]);

        return response()->json(['data' => $sub->fresh(), 'message' => 'Subscription created.'], 201);
    }

    public function updateSubscription(Request $request, string $id): JsonResponse
    {
        $sub = Subscription::findOrFail($id);
        $data = $request->validate([
            'plan'               => ['string', 'in:free,starter,professional,enterprise'],
            'status'             => ['string', 'in:active,trial,past_due,cancelled,expired'],
            'price'              => ['numeric', 'min:0'],
            'current_period_end' => ['date'],
        ]);
        $sub->update($data);
        if (isset($data['plan'])) {
            User::where('id', $sub->user_id)->update(['subscription_plan' => $data['plan']]);
        }
        return response()->json(['data' => $sub->fresh(), 'message' => 'Updated.']);
    }

    public function cancelSubscription(string $id): JsonResponse
    {
        $sub = Subscription::findOrFail($id);
        $sub->update(['status' => 'cancelled', 'cancelled_at' => now(), 'expires_at' => $sub->current_period_end]);
        User::where('id', $sub->user_id)->update(['subscription_plan' => 'free']);
        return response()->json(['message' => 'Cancelled.']);
    }

    public function extendSubscription(Request $request, string $id): JsonResponse
    {
        $request->validate(['months' => ['required', 'integer', 'min:1', 'max:24']]);
        $sub = Subscription::findOrFail($id);
        $base = $sub->current_period_end?->isFuture() ? $sub->current_period_end : now();
        $sub->update(['current_period_end' => $base->copy()->addMonths($request->input('months')), 'status' => 'active', 'cancelled_at' => null]);
        User::where('id', $sub->user_id)->update(['subscription_plan' => $sub->plan]);
        return response()->json(['data' => $sub->fresh(), 'message' => "Extended by {$request->input('months')} month(s)."]);
    }

    // ═══════════════════════════════════════════════════════════════════
    // USERS
    // ═══════════════════════════════════════════════════════════════════

    public function users(Request $request): JsonResponse
    {
        $query = User::query();
        if ($request->filled('search')) {
            $s = $request->input('search');
            $query->where(fn($q) => $q->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%"));
        }
        if ($request->filled('role')) $query->where('role', $request->input('role'));
        if ($request->filled('company_id')) $query->where('company_id', $request->input('company_id'));

        $users = $query->orderByDesc('created_at')->paginate($request->integer('per_page', 20));
        return response()->json([
            'data' => collect($users->items())->map(fn($u) => [
                'id' => $u->id, 'name' => $u->name, 'email' => $u->email,
                'role' => $u->role, 'company_id' => $u->company_id,
                'subscription_plan' => $u->subscription_plan,
                'phone_verified' => $u->phone_verified_at !== null,
                'created_at' => $u->created_at?->toIso8601String(),
            ]),
            'meta' => ['total' => $users->total(), 'current_page' => $users->currentPage(), 'last_page' => $users->lastPage()],
        ]);
    }

    public function updateUser(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update($request->validate([
            'name' => ['string', 'max:100'], 'role' => ['string', 'in:admin,organizer,player,moderator'],
            'company_id' => ['nullable', 'uuid'], 'status' => ['string', 'in:active,suspended,banned'],
        ]));
        return response()->json(['data' => $user->fresh(), 'message' => 'Updated.']);
    }

    // ═══════════════════════════════════════════════════════════════════
    // INVOICES
    // ═══════════════════════════════════════════════════════════════════

    public function invoices(Request $request): JsonResponse
    {
        $query = Invoice::with('user:id,name,email')->orderByDesc('created_at');
        if ($request->filled('status')) $query->where('status', $request->input('status'));
        $invoices = $query->paginate($request->integer('per_page', 20));
        return response()->json(['data' => $invoices->items(), 'meta' => [
            'total' => $invoices->total(), 'current_page' => $invoices->currentPage(), 'last_page' => $invoices->lastPage(),
        ]]);
    }

    public function markInvoicePaid(string $id): JsonResponse
    {
        Invoice::findOrFail($id)->update(['status' => 'paid', 'paid_at' => now()]);
        return response()->json(['message' => 'Marked as paid.']);
    }
}
