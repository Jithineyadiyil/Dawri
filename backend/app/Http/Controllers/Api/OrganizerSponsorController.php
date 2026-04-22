<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrganizerSponsorRequest;
use App\Http\Resources\SponsorResource;
use App\Models\Sponsor;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

/**
 * OrganizerSponsorController
 *
 * Lets tournament organizers create their own sponsor entries without
 * waiting for admin intervention.
 *
 * Scoping rule: sponsors created by organizers are flagged `is_global=false`.
 * They only appear in the creator's own dropdowns (plus admin's view) until
 * an admin promotes them via POST /admin/sponsors/{id}/promote.
 *
 * Admins hitting POST /sponsors get is_global=true automatically — equivalent
 * to using the admin CRUD page.
 *
 * Routes (authenticated, organizer or admin):
 *   POST /api/v1/sponsors               — create new sponsor
 *   POST /api/v1/sponsors/{id}/logo     — upload logo file
 *   PATCH /api/v1/sponsors/{id}         — update sponsor metadata (owner or admin only)
 */
class OrganizerSponsorController extends Controller
{
    /** Max logo file size in bytes — 2 MB */
    private const MAX_LOGO_BYTES = 2 * 1024 * 1024;

    /** Allowed MIME types for uploaded logos */
    private const LOGO_MIME_ALLOWLIST = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

    /**
     * POST /sponsors — organizer creates a new brand entry.
     *
     * Admins calling this endpoint get is_global=true automatically.
     * Organizers get is_global=false (scoped until promoted).
     */
    public function store(StoreOrganizerSponsorRequest $request): JsonResponse
    {
        $user  = $request->user();
        $data  = $request->validated();
        $isAdmin = $user?->role === 'admin';

        $sponsor = Sponsor::create([
            ...$data,
            'slug'               => $this->makeUniqueSlug($data['name']),
            'is_active'          => true,
            'created_by_user_id' => $user?->id,
            'is_global'          => $isAdmin, // only admin entries are global by default
        ]);

        return response()->json([
            'data'    => new SponsorResource($sponsor),
            'message' => $isAdmin
                ? 'Sponsor added to global catalog.'
                : 'Sponsor created. It will be visible on your tournaments immediately, and reviewed by admin for global availability.',
        ], Response::HTTP_CREATED);
    }

    /**
     * PATCH /sponsors/{sponsor} — update sponsor metadata.
     * Only the creator or an admin may edit. Admins editing scoped sponsors
     * keep them scoped; to promote, use POST /admin/sponsors/{id}/promote.
     */
    public function update(Request $request, Sponsor $sponsor): JsonResponse
    {
        $this->authorizeOwnerOrAdmin($request, $sponsor);

        $data = $request->validate([
            'name'          => ['sometimes', 'string', 'min:2', 'max:120'],
            'name_ar'       => ['nullable', 'string', 'max:120'],
            'tagline'       => ['nullable', 'string', 'max:500'],
            'tagline_ar'    => ['nullable', 'string', 'max:500'],
            'website_url'   => ['nullable', 'url', 'max:300'],
            'contact_name'  => ['nullable', 'string', 'max:120'],
            'contact_email' => ['nullable', 'email', 'max:180'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
        ]);

        $sponsor->update($data);

        return response()->json(['data' => new SponsorResource($sponsor->refresh())]);
    }

    /**
     * POST /sponsors/{sponsor}/logo — upload/replace the logo file.
     *
     * Stored in storage/app/public/sponsor-logos/{uuid}.{ext}. The public
     * URL is computed via Storage::url() and saved to sponsors.logo_url.
     */
    public function uploadLogo(Request $request, Sponsor $sponsor): JsonResponse
    {
        $this->authorizeOwnerOrAdmin($request, $sponsor);

        $request->validate([
            'logo' => ['required', 'file', 'max:' . (self::MAX_LOGO_BYTES / 1024), 'mimes:png,jpg,jpeg,svg,webp'],
        ]);

        $file = $request->file('logo');

        // Double-check MIME (defense in depth — mimes:svg etc. can be fooled)
        if (! in_array($file->getMimeType(), self::LOGO_MIME_ALLOWLIST, true)) {
            return response()->json([
                'message' => 'Unsupported image type. Use PNG, JPG, SVG, or WebP.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Delete previous logo if it was uploaded (not an external URL)
        if ($sponsor->logo_url && str_starts_with((string) $sponsor->logo_url, '/storage/sponsor-logos/')) {
            $previous = str_replace('/storage/', '', $sponsor->logo_url);
            Storage::disk('public')->delete($previous);
        }

        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension());
        $filename  = $sponsor->id . '.' . $extension;
        $path      = $file->storeAs('sponsor-logos', $filename, 'public');

        $publicUrl = Storage::url($path); // => /storage/sponsor-logos/{uuid}.ext

        $sponsor->update(['logo_url' => $publicUrl]);

        return response()->json([
            'data'    => new SponsorResource($sponsor->refresh()),
            'message' => 'Logo uploaded.',
        ]);
    }

    /**
     * Ownership guard: allow admin, or the organizer who created this sponsor.
     */
    private function authorizeOwnerOrAdmin(Request $request, Sponsor $sponsor): void
    {
        $user = $request->user();
        if (! $user) {
            throw new AuthorizationException('Authentication required.');
        }
        if ($user->role === 'admin') {
            return;
        }
        if ((string) $sponsor->created_by_user_id === (string) $user->id) {
            return;
        }
        throw new AuthorizationException('You may only edit sponsors you created.');
    }

    /**
     * Generate a URL-safe slug that's unique in the sponsors table.
     * Appends a short random suffix if a collision occurs.
     */
    private function makeUniqueSlug(string $name): string
    {
        $base = Str::slug($name);
        if ($base === '') {
            $base = 'sponsor';
        }
        $slug = $base;
        $attempt = 0;
        while (Sponsor::where('slug', $slug)->exists()) {
            $attempt++;
            $slug = $base . '-' . Str::random(4);
            if ($attempt > 5) {
                $slug = $base . '-' . Str::uuid()->toString();
                break;
            }
        }
        return $slug;
    }
}
