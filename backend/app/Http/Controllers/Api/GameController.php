<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GameRequest;
use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class GameController extends Controller
{
    /** GET /api/v1/games — public, all games (admin list) */
    public function index(): AnonymousResourceCollection
    {
        return GameResource::collection(Game::orderBy('sort_order')->orderBy('name')->get());
    }

    /** GET /api/v1/games/active — public, active only (player dropdowns) */
    public function active(): AnonymousResourceCollection
    {
        return GameResource::collection(Game::where('is_active', true)->orderBy('sort_order')->get());
    }

    /** POST /api/v1/admin/games */
    public function store(GameRequest $request): JsonResponse
    {
        $game = Game::create($request->validated());
        return (new GameResource($game))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /** PUT /api/v1/admin/games/{game} */
    public function update(GameRequest $request, Game $game): GameResource
    {
        $game->update($request->validated());
        return new GameResource($game->fresh());
    }

    /** PATCH /api/v1/admin/games/{game}/toggle */
    public function toggle(Game $game): GameResource
    {
        $game->update(['is_active' => !$game->is_active]);
        return new GameResource($game->fresh());
    }

    /** DELETE /api/v1/admin/games/{game} */
    public function destroy(Game $game): JsonResponse
    {
        $game->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
