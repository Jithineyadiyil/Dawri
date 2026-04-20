<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UploadAvatarRequest;
use App\Http\Resources\ProfileResource;
use App\Services\AvatarService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

/**
 * ProfileController — endpoints for the authenticated user's own profile.
 *
 * Routes:
 *   GET    /profile/me              — full profile of current user
 *   PATCH  /profile/me              — update name / nickname / bio / etc.
 *   POST   /profile/me/avatar       — upload avatar (multipart)
 *   DELETE /profile/me/avatar       — remove avatar
 */
class ProfileController extends Controller
{
    public function __construct(private readonly AvatarService $avatars) {}

    public function me(Request $request): JsonResponse
    {
        return (new ProfileResource($request->user()))->response();
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->fill($request->validated())->save();

        return response()->json([
            'message' => 'Profile updated.',
            'data'    => new ProfileResource($user->fresh()),
        ]);
    }

    public function uploadAvatar(UploadAvatarRequest $request): JsonResponse
    {
        try {
            $user = $this->avatars->upload($request->user(), $request->file('file'));
        } catch (RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'message'    => 'Avatar uploaded.',
            'avatar_url' => $user->avatar_url,
        ]);
    }

    public function deleteAvatar(Request $request): JsonResponse
    {
        $this->avatars->remove($request->user());
        return response()->json(['message' => 'Avatar removed.']);
    }
}
