<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Company extends Model
{
    use HasUuids;

    protected $table = 'companies';

    protected $fillable = [
        'name', 'name_ar', 'domain', 'industry', 'country', 'city',
        'logo_url', 'contact_name', 'contact_email', 'contact_phone',
        'employee_count', 'cr_number', 'status', 'notes',
    ];

    protected $casts = [
        'employee_count' => 'integer',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscription(): HasOne
    {
        return $this->hasOne(Subscription::class)
            ->whereIn('status', ['active', 'trial'])
            ->latest();
    }

    public function tournaments(): HasMany
    {
        return $this->hasMany(Tournament::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' || $this->status === 'trial';
    }
}
