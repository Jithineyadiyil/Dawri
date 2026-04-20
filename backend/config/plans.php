<?php

declare(strict_types=1);

/**
 * Dawri Subscription Plans Configuration.
 *
 * Pricing tiers based on PRD + landing page specifications.
 * All prices in SAR, exclusive of VAT (15%).
 *
 * Tier structure:
 *   B2C: Free (players never pay to participate)
 *   B2B: Starter → Professional → Enterprise
 */
return [

    'vat_rate' => 0.15, // Saudi VAT

    'plans' => [

        'free' => [
            'name'        => 'Free',
            'name_ar'     => 'مجاني',
            'type'        => 'b2c',
            'price'       => 0,
            'billing'     => 'forever',
            'description' => 'For individual players who want to compete.',
            'description_ar' => 'للاعبين الأفراد الذين يريدون المنافسة.',
            'limits'      => [
                'tournaments_per_month'  => 0,       // Cannot create tournaments
                'max_participants'       => 0,
                'max_employees'          => 0,
                'moderators'             => 0,
            ],
            'features'    => [
                'join_tournaments'       => true,
                'marketplace_access'     => true,
                'ranking_leaderboard'    => true,
                'wallet'                 => true,
                'match_history'          => true,
                'create_tournaments'     => false,
                'hr_csv_import'          => false,
                'hr_api_integration'     => false,
                'white_label'            => false,
                'bulk_prize_distribution'=> false,
                'engagement_reports'     => false,
                'advanced_analytics'     => false,
                'sso_saml'               => false,
                'dedicated_manager'      => false,
                'custom_sla'             => false,
            ],
        ],

        'starter' => [
            'name'        => 'Starter',
            'name_ar'     => 'المبتدئ',
            'type'        => 'b2b',
            'price'       => 2499,
            'billing'     => 'monthly',
            'description' => 'For small companies running engagement events.',
            'description_ar' => 'للشركات الصغيرة التي تنظم فعاليات تفاعلية.',
            'limits'      => [
                'tournaments_per_month'  => 10,
                'max_participants'       => 64,
                'max_employees'          => 200,
                'moderators'             => 2,
            ],
            'features'    => [
                'join_tournaments'       => true,
                'marketplace_access'     => true,
                'ranking_leaderboard'    => true,
                'wallet'                 => true,
                'match_history'          => true,
                'create_tournaments'     => true,
                'hr_csv_import'          => true,
                'hr_api_integration'     => false,
                'white_label'            => false,
                'bulk_prize_distribution'=> false,
                'engagement_reports'     => true,
                'advanced_analytics'     => false,
                'sso_saml'               => false,
                'dedicated_manager'      => false,
                'custom_sla'             => false,
            ],
        ],

        'professional' => [
            'name'        => 'Professional',
            'name_ar'     => 'المحترف',
            'type'        => 'b2b',
            'price'       => 7499,
            'billing'     => 'monthly',
            'description' => 'For HR teams running regular engagement programs.',
            'description_ar' => 'لفرق الموارد البشرية التي تدير برامج تفاعل منتظمة.',
            'limits'      => [
                'tournaments_per_month'  => -1,  // Unlimited
                'max_participants'       => 256,
                'max_employees'          => 1000,
                'moderators'             => 10,
            ],
            'features'    => [
                'join_tournaments'       => true,
                'marketplace_access'     => true,
                'ranking_leaderboard'    => true,
                'wallet'                 => true,
                'match_history'          => true,
                'create_tournaments'     => true,
                'hr_csv_import'          => true,
                'hr_api_integration'     => true,
                'white_label'            => true,
                'bulk_prize_distribution'=> true,
                'engagement_reports'     => true,
                'advanced_analytics'     => true,
                'sso_saml'               => false,
                'dedicated_manager'      => false,
                'custom_sla'             => false,
            ],
        ],

        'enterprise' => [
            'name'        => 'Enterprise',
            'name_ar'     => 'المؤسسي',
            'type'        => 'b2b',
            'price'       => null,  // Custom pricing
            'billing'     => 'custom',
            'description' => 'For large enterprises and multi-location companies.',
            'description_ar' => 'للمؤسسات الكبيرة والشركات متعددة المواقع.',
            'limits'      => [
                'tournaments_per_month'  => -1,
                'max_participants'       => 512,
                'max_employees'          => -1,  // Unlimited
                'moderators'             => -1,
            ],
            'features'    => [
                'join_tournaments'       => true,
                'marketplace_access'     => true,
                'ranking_leaderboard'    => true,
                'wallet'                 => true,
                'match_history'          => true,
                'create_tournaments'     => true,
                'hr_csv_import'          => true,
                'hr_api_integration'     => true,
                'white_label'            => true,
                'bulk_prize_distribution'=> true,
                'engagement_reports'     => true,
                'advanced_analytics'     => true,
                'sso_saml'               => true,
                'dedicated_manager'      => true,
                'custom_sla'             => true,
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Trial Settings
    |--------------------------------------------------------------------------
    */
    'trial_days'     => 14,
    'trial_plan'     => 'professional', // Trial gives Professional features

    /*
    |--------------------------------------------------------------------------
    | Grace Period
    |--------------------------------------------------------------------------
    | Days after subscription expires before downgrading to free.
    */
    'grace_period_days' => 3,

];
