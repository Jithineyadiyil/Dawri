<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrganizerVerificationRequest;
use App\Models\User;
use App\Services\OrganizerCapsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * OrganizerVerificationController — Dawri 2.0 organizer tier flow.
 *
 *   User endpoints:
 *     GET  /me/organizer-status      — my tier + caps + pending request
 *     POST /me/organizer-verification — apply for verified/professional
 *
 *   Admin endpoints:
 *     GET   /admin/organizer-verifications        — pending list (default)
 *     POST  /admin/organizer-verifications/{req}/approve   { tier?, note? }
 *     POST  /admin/organizer-verifications/{req}/reject    { note? }
 */
final class OrganizerVerificationController extends Controller
{
    public function __construct(private readonly OrganizerCapsService $caps) {}

    // ── User ──────────────────────────────────────────────────────────

    /** GET /me/organizer-status */
    public function status(Request $request): JsonResponse
    {
        $me = $request->user();
        $pending = OrganizerVerificationRequest::query()
            ->where('user_id', $me->id)
            ->where('status', OrganizerVerificationRequest::STATUS_PENDING)
            ->latest()
            ->first();

        return response()->json([
            'tier'    => $me->organizer_tier ?? OrganizerCapsService::TIER_NONE,
            'caps'    => $this->caps->capsFor($me),
            'pending' => $pending ? $this->publicRequest($pending) : null,
        ]);
    }

    /** POST /me/organizer-verification */
    public function apply(Request $request): JsonResponse
    {
        $me = $request->user();
        $data = $request->validate([
            'requested_tier'    => ['required', Rule::in(['verified', 'professional'])],
            'legal_name'        => ['required', 'string', 'max:150'],
            'organization_name' => ['nullable', 'string', 'max:150'],
            'country'           => ['required', 'string', 'max:80'],
            'city'              => ['nullable', 'string', 'max:80'],
            'website'           => ['nullable', 'url', 'max:255'],
            'phone'             => ['nullable', 'string', 'max:40'],
            'reason'            => ['nullable', 'string', 'max:2000'],
        ]);

        $existingPending = OrganizerVerificationRequest::query()
            ->where('user_id', $me->id)
            ->where('status', OrganizerVerificationRequest::STATUS_PENDING)
            ->exists();
        if ($existingPending) {
            throw ValidationException::withMessages(['requested_tier' => 'You already have a pending request.']);
        }

        // Already at or above the requested tier
        $current = $me->organizer_tier ?? OrganizerCapsService::TIER_NONE;
        if (
            ($data['requested_tier'] === 'verified' && in_array($current, ['verified', 'professional'], true))
            || ($data['requested_tier'] === 'professional' && $current === 'professional')
        ) {
            throw ValidationException::withMessages(['requested_tier' => 'You already have this tier or higher.']);
        }

        $req = OrganizerVerificationRequest::create(array_merge($data, [
            'user_id' => $me->id,
            'status'  => OrganizerVerificationRequest::STATUS_PENDING,
        ]));

        return response()->json(['data' => $this->publicRequest($req)], 201);
    }

    // ── Admin ─────────────────────────────────────────────────────────

    /** GET /admin/organizer-verifications?status=pending|approved|rejected|all */
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status', OrganizerVerificationRequest::STATUS_PENDING);

        $q = OrganizerVerificationRequest::query()->with('user')->latest();
        if ($status !== 'all') {
            $q->where('status', $status);
        }

        return response()->json([
            'data' => $q->limit(200)->get()->map(fn ($r) => $this->publicRequest($r))->values(),
        ]);
    }

    /** POST /admin/organizer-verifications/{request}/approve  { tier?, note? } */
    public function approve(Request $request, OrganizerVerificationRequest $organizerVerification): JsonResponse
    {
        $data = $request->validate([
            'tier' => ['nullable', Rule::in(['verified', 'professional'])],
            'note' => ['nullable', 'string', 'max:2000'],
        ]);

        abort_if($organizerVerification->status !== OrganizerVerificationRequest::STATUS_PENDING, 409, 'Request already decided.');

        $tier = $data['tier'] ?? $organizerVerification->requested_tier;

        $organizerVerification->update([
            'status'        => OrganizerVerificationRequest::STATUS_APPROVED,
            'decided_by'    => $request->user()->id,
            'decided_at'    => now(),
            'decision_note' => $data['note'] ?? null,
        ]);

        /** @var User|null $user */
        $user = $organizerVerification->user;
        if ($user) {
            $user->organizer_tier = $tier;
            $user->save();
        }

        return response()->json(['data' => $this->publicRequest($organizerVerification->fresh('user'))]);
    }

    /** POST /admin/organizer-verifications/{request}/reject  { note? } */
    public function reject(Request $request, OrganizerVerificationRequest $organizerVerification): JsonResponse
    {
        $data = $request->validate([
            'note' => ['nullable', 'string', 'max:2000'],
        ]);

        abort_if($organizerVerification->status !== OrganizerVerificationRequest::STATUS_PENDING, 409, 'Request already decided.');

        $organizerVerification->update([
            'status'        => OrganizerVerificationRequest::STATUS_REJECTED,
            'decided_by'    => $request->user()->id,
            'decided_at'    => now(),
            'decision_note' => $data['note'] ?? null,
        ]);

        return response()->json(['data' => $this->publicRequest($organizerVerification->fresh('user'))]);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    /** @return array<string, mixed> */
    private function publicRequest(OrganizerVerificationRequest $r): array
    {
        return [
            'id'                => $r->id,
            'requested_tier'    => $r->requested_tier,
            'status'            => $r->status,
            'legal_name'        => $r->legal_name,
            'organization_name' => $r->organization_name,
            'country'           => $r->country,
            'city'              => $r->city,
            'website'           => $r->website,
            'phone'             => $r->phone,
            'reason'            => $r->reason,
            'decided_at'        => $r->decided_at,
            'decision_note'     => $r->decision_note,
            'created_at'        => $r->created_at,
            'user'              => $r->relationLoaded('user') && $r->user ? [
                'id'           => $r->user->id,
                'display_name' => $r->user->display_name,
                'avatar_url'   => $r->user->avatar_url,
                'organizer_tier' => $r->user->organizer_tier,
            ] : null,
        ];
    }
}
