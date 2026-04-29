<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * DistributorCredential — API credentials for a marketplace distributor.
 *
 * Credentials are encrypted at rest via Laravel's built-in `encrypted` cast
 * (AES-256-CBC, tied to APP_KEY). To the admin UI, they appear plaintext
 * when editing, but the actual database rows show only ciphertext.
 *
 * One-active-per-distributor-per-env invariant is enforced at query time
 * via the `active()` scope + a unique index on (distributor, environment).
 *
 * Lookup pattern from adapters:
 *   $creds = DistributorCredential::forActive('likecard');
 *   if (! $creds) { throw new CredentialsMissingException; }
 *   $apiKey = $creds->api_key;  // auto-decrypted
 */
class DistributorCredential extends Model
{
    /**
     * Supported distributor keys. Adapters check against this list before
     * resolving credentials, to catch typos at call-time rather than hitting
     * null downstream.
     */
    public const SUPPORTED = ['likecard', 'wupex', 'reloadly', 'jawaker'];

    /** Environment options — controlled vocabulary for admin UI. */
    public const ENVIRONMENTS = ['sandbox', 'production'];

    protected $fillable = [
        'distributor', 'environment',
        'api_key', 'api_secret', 'client_id', 'client_secret',
        'base_url', 'is_active',
        'updated_by_user_id',
        'last_tested_at', 'last_test_passed', 'last_test_error',
    ];

    protected $casts = [
        'api_key'          => 'encrypted',
        'api_secret'       => 'encrypted',
        'client_id'        => 'encrypted',
        'client_secret'    => 'encrypted',
        'is_active'        => 'boolean',
        'last_test_passed' => 'boolean',
        'last_tested_at'   => 'datetime',
    ];

    /**
     * Never include encrypted credential fields in default array/JSON
     * serialisation — admins get decrypted values via explicit resource
     * serialisation, and we want a safety net against accidental leakage.
     */
    protected $hidden = [
        'api_key', 'api_secret', 'client_id', 'client_secret',
    ];

    // ── Relationships ─────────────────────────────────────────────────

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_user_id');
    }

    // ── Scopes ────────────────────────────────────────────────────────

    public function scopeActive(Builder $q): Builder
    {
        return $q->where('is_active', true);
    }

    /**
     * Resolve the active credential set for a given distributor. Called by
     * distributor adapters at runtime to fetch keys instead of env().
     */
    public static function forActive(string $distributor): ?self
    {
        return static::active()
            ->where('distributor', $distributor)
            ->first();
    }

    // ── Accessors ─────────────────────────────────────────────────────

    /**
     * Masked display of api_key for admin lists — shows "sk-****1234" so
     * admins can eyeball which credential set is which without exposing
     * full values in a table view.
     */
    protected function apiKeyMasked(): Attribute
    {
        return Attribute::get(function () {
            $full = $this->api_key;
            if (! $full) return null;
            $len = strlen($full);
            if ($len <= 8) return str_repeat('*', $len);
            return substr($full, 0, 4) . str_repeat('*', max(4, $len - 8)) . substr($full, -4);
        });
    }
}
