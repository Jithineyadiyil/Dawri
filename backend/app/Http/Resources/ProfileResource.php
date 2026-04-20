<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ProfileResource — full profile returned from /profile/me.
 *
 * Public player views (e.g. /players/{id}) should use a narrower resource
 * that omits email and phone.
 *
 * @mixin \App\Models\User
 */
class ProfileResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'name'           => $this->name,
            'nickname'       => $this->nickname,
            'display_name'   => $this->display_name,
            'email'          => $this->email,
            'phone'          => $this->phone,
            'role'           => $this->role,
            'avatar_url'     => $this->avatar_url,
            'bio'            => $this->bio,
            'country'        => $this->country,
            'city'           => $this->city,
            'game_username'  => $this->game_username,
            'psn_id'         => $this->psn_id,
            'pubg_id'        => $this->pubg_id,
            'cod_id'         => $this->cod_id,
            'preferred_games'=> $this->preferred_games,
            'status'         => $this->status,
            'subscription_plan' => $this->subscription_plan,
            'company_id'     => $this->company_id,
            'created_at'     => $this->created_at?->toIso8601String(),
        ];
    }
}
