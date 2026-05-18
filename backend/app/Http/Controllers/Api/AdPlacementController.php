<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdPlacement;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * AdPlacementController
 *
 * Admin CRUD for ad placements + public read endpoints for the frontend.
 *
 * Types:
 *   promoted_tournament — pinned card at top of tournament grid with "Promoted" badge
 *   in_grid_sponsor     — sponsor card injected every 6th slot in tournament grid
 *   tournament_banner   — 728×90 leaderboard banner above tabs on tournament detail
 */
class AdPlacementController extends Controller
{
    // ── Public endpoints (no auth required) ──────────────────────────────────

    /** GET /ad-placements?type=in_grid_sponsor — active placements for frontend rendering */
    public function index(Request $request): JsonResponse
    {
        $type = $request->query('type');
        $tournamentId = $request->query('tournament_id');

        $query = AdPlacement::active()->orderBy('sort_order');

        if ($type) {
            $query->ofType($type);
        }
        if ($tournamentId) {
            $query->where('tournament_id', $tournamentId);
        }

        // Track impressions (fire-and-forget, non-blocking)
        $placements = $query->get();
        AdPlacement::whereIn('id', $placements->pluck('id'))
            ->increment('impression_count');

        return response()->json(['data' => $placements]);
    }

    /** POST /ad-placements/{id}/click — track click */
    public function click(string $id): JsonResponse
    {
        $placement = AdPlacement::findOrFail($id);
        $placement->incrementClicks();
        return response()->json(['message' => 'ok']);
    }

    // ── Admin endpoints ───────────────────────────────────────────────────────

    public function adminIndex(): JsonResponse
    {
        $placements = AdPlacement::orderBy('type')->orderBy('sort_order')->get();
        return response()->json(['data' => $placements]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type'         => ['required', 'in:promoted_tournament,in_grid_sponsor,tournament_banner,sidebar_left,sidebar_right'],
            'title'        => ['required', 'string', 'max:200'],
            'title_ar'     => ['nullable', 'string', 'max:200'],
            'image_url'    => ['nullable', 'url', 'max:500'],
            'link_url'     => ['nullable', 'url', 'max:500'],
            'cta_label'    => ['nullable', 'string', 'max:100'],
            'brand_name'   => ['nullable', 'string', 'max:100'],
            'brand_color'  => ['nullable', 'string', 'max:20'],
            'tournament_id'=> ['nullable', 'uuid'],
            'sort_order'   => ['sometimes', 'integer'],
            'starts_at'    => ['nullable', 'date'],
            'ends_at'      => ['nullable', 'date', 'after:starts_at'],
        ]);

        $placement = AdPlacement::create($data);
        return response()->json(['data' => $placement], Response::HTTP_CREATED);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $placement = AdPlacement::findOrFail($id);
        $data = $request->validate([
            'type'         => ['sometimes', 'in:promoted_tournament,in_grid_sponsor,tournament_banner,sidebar_left,sidebar_right'],
            'title'        => ['sometimes', 'string', 'max:200'],
            'title_ar'     => ['nullable', 'string', 'max:200'],
            'image_url'    => ['nullable', 'url', 'max:500'],
            'link_url'     => ['nullable', 'url', 'max:500'],
            'cta_label'    => ['nullable', 'string', 'max:100'],
            'brand_name'   => ['nullable', 'string', 'max:100'],
            'brand_color'  => ['nullable', 'string', 'max:20'],
            'tournament_id'=> ['nullable', 'uuid'],
            'is_active'    => ['sometimes', 'boolean'],
            'sort_order'   => ['sometimes', 'integer'],
            'starts_at'    => ['nullable', 'date'],
            'ends_at'      => ['nullable', 'date'],
        ]);

        $placement->update($data);
        return response()->json(['data' => $placement->fresh()]);
    }

    public function destroy(string $id): JsonResponse
    {
        AdPlacement::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted.']);
    }

    /** POST /admin/ad-placements/upload-image — upload, resize and store banner image */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:5120'],
        ]);

        $file    = $request->file('image');
        $mime    = $file->getMimeType();

        // Target dimensions for sidebar ad
        // 400×1000 — wide enough for all sidebar widths, tall enough for any viewport
        // CSS handles scaling down; this ensures sharpness on all screen sizes
        $targetW = 400;
        $targetH = 1000;

        // Load source image via GD
        $src = match (true) {
            str_contains($mime, 'png')  => imagecreatefrompng($file->getRealPath()),
            str_contains($mime, 'gif')  => imagecreatefromgif($file->getRealPath()),
            str_contains($mime, 'webp') => imagecreatefromwebp($file->getRealPath()),
            default                     => imagecreatefromjpeg($file->getRealPath()),
        };

        if (!$src) {
            return response()->json(['message' => 'Could not process image.'], 422);
        }

        $srcW = imagesx($src);
        $srcH = imagesy($src);

        // Smart crop: scale to cover target, then centre-crop
        $scaleW = $targetW / $srcW;
        $scaleH = $targetH / $srcH;
        $scale  = max($scaleW, $scaleH);

        $scaledW = (int) round($srcW * $scale);
        $scaledH = (int) round($srcH * $scale);

        $offsetX = (int) round(($scaledW - $targetW) / 2);
        $offsetY = (int) round(($scaledH - $targetH) / 2);

        // Create destination canvas
        $dst = imagecreatetruecolor($targetW, $targetH);

        // Preserve transparency for PNG/GIF
        if (str_contains($mime, 'png') || str_contains($mime, 'gif')) {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            $transparent = imagecolorallocatealpha($dst, 0, 0, 0, 127);
            imagefilledrectangle($dst, 0, 0, $targetW, $targetH, $transparent);
        }

        // Scale + crop in one step
        imagecopyresampled(
            $dst, $src,
            0,       0,       // dst x, y
            $offsetX, $offsetY, // src x, y (crop offset)
            $targetW, $targetH, // dst w, h
            $srcW,   $srcH    // src w, h (full source, GD handles scale internally)
        );

        // Actually we need to scale first, then crop
        // Create intermediate scaled image
        $scaled = imagecreatetruecolor($scaledW, $scaledH);
        if (str_contains($mime, 'png') || str_contains($mime, 'gif')) {
            imagealphablending($scaled, false);
            imagesavealpha($scaled, true);
        }
        imagecopyresampled($scaled, $src, 0, 0, 0, 0, $scaledW, $scaledH, $srcW, $srcH);
        imagedestroy($src);

        // Crop from scaled to target
        $dst = imagecreatetruecolor($targetW, $targetH);
        if (str_contains($mime, 'png') || str_contains($mime, 'gif')) {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
        }
        imagecopy($dst, $scaled, 0, 0, $offsetX, $offsetY, $targetW, $targetH);
        imagedestroy($scaled);

        // Save to temp file then store
        $filename = 'ad-placements/' . uniqid('ad_') . '.jpg';
        $tmpPath  = sys_get_temp_dir() . '/' . basename($filename);

        imagejpeg($dst, $tmpPath, 90);
        imagedestroy($dst);

        // Store in Laravel public disk
        $stored = Storage::disk('public')->putFileAs(
            'ad-placements',
            new \Illuminate\Http\File($tmpPath),
            basename($filename)
        );

        @unlink($tmpPath);

        $url = url(Storage::url($stored));

        return response()->json([
            'url'    => $url,
            'width'  => $targetW,
            'height' => $targetH,
        ]);
    }

    public function toggle(string $id): JsonResponse
    {
        $placement = AdPlacement::findOrFail($id);
        $placement->update(['is_active' => ! $placement->is_active]);
        return response()->json(['data' => $placement->fresh()]);
    }

    public function stats(): JsonResponse
    {
        $stats = AdPlacement::selectRaw('
            type,
            COUNT(*) as total,
            SUM(is_active) as active,
            SUM(impression_count) as impressions,
            SUM(click_count) as clicks
        ')->groupBy('type')->get();

        return response()->json(['data' => $stats]);
    }
}
