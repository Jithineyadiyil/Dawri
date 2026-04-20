<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = 'plans';
    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'key', 'name', 'name_ar', 'type', 'price', 'billing',
        'description', 'description_ar', 'is_active', 'sort_order',
        'limit_tournaments_per_month', 'limit_max_participants',
        'limit_max_employees', 'limit_moderators',
        'feat_create_tournaments', 'feat_hr_csv_import', 'feat_hr_api_integration',
        'feat_white_label', 'feat_bulk_prizes', 'feat_engagement_reports',
        'feat_advanced_analytics', 'feat_sso_saml', 'feat_dedicated_manager', 'feat_custom_sla',
    ];

    protected $casts = [
        'price'      => 'float',
        'is_active'  => 'boolean',
        'sort_order' => 'integer',
        'limit_tournaments_per_month' => 'integer',
        'limit_max_participants'      => 'integer',
        'limit_max_employees'         => 'integer',
        'limit_moderators'            => 'integer',
        'feat_create_tournaments'     => 'boolean',
        'feat_hr_csv_import'          => 'boolean',
        'feat_hr_api_integration'     => 'boolean',
        'feat_white_label'            => 'boolean',
        'feat_bulk_prizes'            => 'boolean',
        'feat_engagement_reports'     => 'boolean',
        'feat_advanced_analytics'     => 'boolean',
        'feat_sso_saml'               => 'boolean',
        'feat_dedicated_manager'      => 'boolean',
        'feat_custom_sla'             => 'boolean',
    ];

    public function toApiArray(): array
    {
        return [
            'key'            => $this->key,
            'name'           => $this->name,
            'name_ar'        => $this->name_ar,
            'type'           => $this->type,
            'price'          => $this->price,
            'billing'        => $this->billing,
            'description'    => $this->description,
            'description_ar' => $this->description_ar,
            'is_active'      => $this->is_active,
            'limits'         => [
                'tournaments_per_month' => $this->limit_tournaments_per_month,
                'max_participants'      => $this->limit_max_participants,
                'max_employees'         => $this->limit_max_employees,
                'moderators'            => $this->limit_moderators,
            ],
            'features'       => [
                'create_tournaments'     => $this->feat_create_tournaments,
                'hr_csv_import'          => $this->feat_hr_csv_import,
                'hr_api_integration'     => $this->feat_hr_api_integration,
                'white_label'            => $this->feat_white_label,
                'bulk_prize_distribution'=> $this->feat_bulk_prizes,
                'engagement_reports'     => $this->feat_engagement_reports,
                'advanced_analytics'     => $this->feat_advanced_analytics,
                'sso_saml'               => $this->feat_sso_saml,
                'dedicated_manager'      => $this->feat_dedicated_manager,
                'custom_sla'             => $this->feat_custom_sla,
            ],
        ];
    }
}
