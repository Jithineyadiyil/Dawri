<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Company — enterprise tenant with optional brand defaults.
 */
class Company extends Model
{
    use HasUuids;

    protected $table = 'companies';

    protected $fillable = [
        'name', 'name_ar', 'domain', 'industry', 'country', 'city',
        'logo_url', 'primary_color', 'secondary_color', 'accent_color',
        'background_color', 'font_family', 'brand_config',
        'contact_name', 'contact_email', 'contact_phone',
        'employee_count', 'cr_number', 'status', 'notes',
    ];

    protected $casts = [
        'brand_config'   => 'array',
        'employee_count' => 'integer',
    ];

    public function users(): HasMany         { return $this->hasMany(User::class); }
    public function tournaments(): HasMany   { return $this->hasMany(Tournament::class); }
    public function subscriptions(): HasMany { return $this->hasMany(Subscription::class); }

    public function hasBranding(): bool
    {
        return ! empty($this->logo_url)
            || ! empty($this->primary_color)
            || ! empty($this->secondary_color)
            || ! empty($this->font_family);
    }
}
