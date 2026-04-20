<?php
declare(strict_types=1);
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'email'           => $this->email,
            'role'            => $this->role,
            'status'          => $this->status,
            'game_username'   => $this->game_username,
            'pubg_id'         => $this->pubg_id,
            'psn_id'          => $this->psn_id,
            'ranking_points'  => $this->ranking_points,
            'avatar_url'      => $this->avatar_url,
            'timezone'        => $this->timezone,
            'phone_verified'  => $this->phone_verified_at !== null,
            'created_at'      => $this->created_at?->toIso8601String(),
        ];
    }
}
