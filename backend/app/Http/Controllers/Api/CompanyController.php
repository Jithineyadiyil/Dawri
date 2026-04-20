<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCompanyBrandingRequest;
use App\Http\Resources\CompanyBrandingResource;
use App\Models\Company;
use App\Models\Tournament;
use App\Services\BrandingService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * CompanyController — endpoints for the authenticated user's company.
 *
 * Routes:
 *   GET   /companies/mine              — fetch company + branding
 *   PATCH /companies/mine/brand        — update brand colors/fonts
 *   POST  /companies/mine/logo         — upload company logo
 *   GET   /companies/mine/calendar     — tournament calendar view
 *
 * Sprint 4 addition: calendar() returns a list of tournaments for the
 * authenticated user's company within a given date window, lightweight
 * enough to render a month grid without loading participants or matches.
 */
class CompanyController extends Controller
{
    public function __construct(private readonly BrandingService $branding) {}

    public function mine(Request $request): JsonResponse
    {
        $company = $this->resolveCompany($request);
        if (! $company) {
            return response()->json(['message' => 'No company associated with this account.'], Response::HTTP_NOT_FOUND);
        }
        return (new CompanyBrandingResource($company))->response();
    }

    public function updateBranding(UpdateCompanyBrandingRequest $request): JsonResponse
    {
        $company = $this->resolveCompany($request);
        if (! $company) {
            return response()->json(['message' => 'No company associated with this account.'], Response::HTTP_NOT_FOUND);
        }
        $company->fill($request->validated())->save();
        return response()->json([
            'message' => 'Branding updated.',
            'data'    => new CompanyBrandingResource($company->fresh()),
        ]);
    }

    public function uploadLogo(Request $request): JsonResponse
    {
        $company = $this->resolveCompany($request);
        if (! $company) {
            return response()->json(['message' => 'No company associated.'], Response::HTTP_NOT_FOUND);
        }

        $request->validate(['file' => 'required|file|mimes:jpg,jpeg,png,webp,svg|max:2048']);

        /** @var UploadedFile $file */
        $file = $request->file('file');
        $ext  = strtolower($file->getClientOriginalExtension() ?: $file->extension());

        if (! empty($company->logo_path) && ! preg_match('#^https?://#i', (string) $company->logo_path)) {
            Storage::disk('public')->delete($company->logo_path);
        }

        $path = $file->storeAs("companies/{$company->id}", Str::uuid()->toString() . '.' . $ext, 'public');
        $company->logo_path = $path;
        $company->save();

        return response()->json([
            'message'  => 'Logo uploaded.',
            'logo_url' => $company->fresh()->logo_url,
        ]);
    }

    /**
     * Sprint 4 — tournament calendar for this user's context.
     *
     * Query params:
     *   from  (required, Y-m-d)  — window start (inclusive)
     *   to    (required, Y-m-d)  — window end   (inclusive)
     *
     * Scoping:
     *   • Admin: sees ALL tournaments by default (optionally filter with ?company_id=X)
     *   • Organizer / anyone: tournaments they organized PLUS tournaments belonging
     *     to their company PLUS tournaments organized by teammates in that company
     *
     * Date inclusion:
     *   A tournament "appears" on the calendar if ANY of these is true:
     *     • starts_at falls in [from, to]
     *     • registration_closes_at falls in [from, to]
     *     • status is ongoing / in_progress  (live tournaments always visible,
     *       even if they started before the window — the frontend pins these
     *       to day 1 of the viewed month)
     *
     * Cancelled tournaments are excluded; drafts are included so organizers
     * can see their work-in-progress on the grid.
     */
    public function calendar(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthorized.'], Response::HTTP_UNAUTHORIZED);
        }

        $request->validate([
            'from' => 'required|date_format:Y-m-d',
            'to'   => 'required|date_format:Y-m-d|after_or_equal:from',
        ]);

        $from = Carbon::createFromFormat('Y-m-d', (string) $request->query('from'))->startOfDay();
        $to   = Carbon::createFromFormat('Y-m-d', (string) $request->query('to'))->endOfDay();

        // ── Resolve viewing scope ─────────────────────────────────────
        $scopeCompany = null;
        if ($user->role === 'admin' && $request->query('company_id')) {
            $scopeCompany = Company::find($request->query('company_id'));
        } elseif ($user->company_id) {
            $scopeCompany = Company::find($user->company_id);
        }

        $q = Tournament::query()->where('status', '!=', 'cancelled');

        // ── Scope tournaments visible to this user ────────────────────
        if ($user->role === 'admin' && ! $scopeCompany) {
            // Admin with no company filter: see everything.
        } else {
            $companyId = $scopeCompany?->id;
            $q->where(function ($outer) use ($user, $companyId): void {
                $outer->where('organizer_id', $user->id);   // I organized it
                if ($companyId) {
                    $outer->orWhere('company_id', $companyId)  // Attached to my company
                          ->orWhereHas('organizer', function ($qq) use ($companyId): void {
                              $qq->where('company_id', $companyId);   // Teammate organized it
                          });
                }
            });
        }

        // ── Date / status filter ──────────────────────────────────────
        $q->where(function ($dq) use ($from, $to): void {
            $dq->whereBetween('starts_at', [$from, $to])
               ->orWhereBetween('registration_closes_at', [$from, $to])
               ->orWhereIn('status', ['ongoing', 'in_progress']); // always include live
        });

        $tournaments = $q->orderBy('starts_at')->get([
            'id', 'name', 'name_ar', 'game', 'format', 'status', 'tier',
            'organizer_id', 'company_id',
            'starts_at', 'registration_closes_at', 'timezone',
            'max_participants', 'prize_pool',
        ]);

        $events = $tournaments->map(fn (Tournament $t) => [
            'id'                     => $t->id,
            'name'                   => $t->name,
            'name_ar'                => $t->name_ar,
            'game'                   => $t->game,
            'game_label'             => $this->gameLabel($t->game),
            'format'                 => $t->format,
            'format_label'           => $this->formatLabel($t->format),
            'status'                 => $t->status,
            'status_label'           => $this->statusLabel($t->status),
            'tier'                   => $t->tier,
            'starts_at'              => $t->starts_at?->toIso8601String(),
            'starts_at_date'         => $t->starts_at?->format('Y-m-d'),
            'registration_closes_at' => $t->registration_closes_at?->toIso8601String(),
            'registration_closes_at_date' => $t->registration_closes_at?->format('Y-m-d'),
            'timezone'               => $t->timezone,
            'max_participants'       => $t->max_participants,
            'has_prize'              => ! empty($t->prize_pool),
            'is_live'                => in_array($t->status, ['ongoing', 'in_progress'], true),
        ])->values();

        $companyName = $scopeCompany?->name
            ?? ($user->role === 'admin' ? 'All Tournaments' : 'My Tournaments');

        return response()->json([
            'data' => [
                'company_id'   => $scopeCompany?->id,
                'company_name' => $companyName,
                'from'         => $from->format('Y-m-d'),
                'to'           => $to->format('Y-m-d'),
                'events'       => $events,
                'scope'        => $user->role === 'admin' && ! $scopeCompany ? 'all' : 'company_or_organizer',
            ],
        ]);
    }

    // ── Helpers ─────────────────────────────────────────────────────────

    /**
     * Resolve the company for the authenticated user.
     *   • Admins may pass ?company_id=... to inspect any company
     *   • Everyone else is scoped to their own company_id
     */
    private function resolveCompany(Request $request): ?Company
    {
        $user = $request->user();
        if (! $user) { return null; }

        if ($user->role === 'admin' && $request->query('company_id')) {
            return Company::find($request->query('company_id'));
        }

        return $user->company_id ? Company::find($user->company_id) : null;
    }

    private function gameLabel(?string $game): string
    {
        return match ($game) {
            'ea_fc', 'ea_fc25' => 'EA FC 25',
            'pubg_mobile'      => 'PUBG Mobile',
            'cod_mobile'       => 'Call of Duty: Mobile',
            default            => ucfirst(str_replace('_', ' ', (string) $game)),
        };
    }

    private function formatLabel(?string $format): string
    {
        return match ($format) {
            'single_elimination' => 'Single Elim',
            'double_elimination' => 'Double Elim',
            'round_robin'        => 'Round Robin',
            'swiss'              => 'Swiss',
            default              => ucfirst(str_replace('_', ' ', (string) $format)),
        };
    }

    private function statusLabel(?string $status): string
    {
        return match ($status) {
            'draft'                                     => 'Draft',
            'registration', 'registration_open'         => 'Open',
            'ongoing', 'in_progress'                    => 'Live',
            'completed'                                 => 'Completed',
            'cancelled'                                 => 'Cancelled',
            default                                     => ucfirst((string) $status),
        };
    }
}
