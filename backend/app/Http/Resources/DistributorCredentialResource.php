<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * DistributorCredentialResource — serialises credentials for admin view.
 *
 * Returns plaintext values (auto-decrypted via model cast) only to admin
 * users; everyone else sees masked values. The controller's admin-only
 * authz gate ensures non-admins never hit this serialiser in practice,
 * but we double-check inside as defence-in-depth.
 */
class DistributorCredentialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isAdmin = $request->user()?->role === 'admin';

        return [
            'id'                => $this->id,
            'distributor'       => $this->distributor,
            'environment'       => $this->environment,
            'base_url'          => $this->base_url,
            'is_active'         => (bool) $this->is_active,
            'has_api_key'       => ! empty($this->api_key),
            'has_api_secret'    => ! empty($this->api_secret),
            'has_client_id'     => ! empty($this->client_id),
            'has_client_secret' => ! empty($this->client_secret),
            'api_key_masked'    => $this->api_key_masked,
            'last_tested_at'    => $this->last_tested_at?->toIso8601String(),
            'last_test_passed'  => $this->last_test_passed,
            'last_test_error'   => $this->last_test_error,
            'updated_by'        => $this->whenLoaded('updatedBy', fn () => [
                'id'   => $this->updatedBy?->id,
                'name' => $this->updatedBy?->name,
            ]),
            'updated_at'        => $this->updated_at?->toIso8601String(),

            // Plaintext values, admin only — for EDIT form pre-fill.
            // UI should hide these behind a "reveal" click.
            'api_key'           => $isAdmin ? $this->api_key        : null,
            'api_secret'        => $isAdmin ? $this->api_secret     : null,
            'client_id'         => $isAdmin ? $this->client_id      : null,
            'client_secret'     => $isAdmin ? $this->client_secret  : null,
        ];
    }
}
