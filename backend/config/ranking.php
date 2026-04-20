<?php

declare(strict_types=1);

/**
 * Ranking point configuration for the Dawri platform.
 *
 * Points are awarded based on tournament placement and multiplied by
 * the tournament tier. This config can be adjusted without code changes.
 */
return [

    /*
    |--------------------------------------------------------------------------
    | Placement Points
    |--------------------------------------------------------------------------
    | Points awarded based on final placement in a tournament.
    | Keys are placement ranges, values are base points.
    */
    'placement_points' => [
        1 => 100,   // 1st place
        2 => 75,    // 2nd place
        3 => 50,    // 3rd–4th
        4 => 50,
        5 => 25,    // 5th–8th
        6 => 25,
        7 => 25,
        8 => 25,
    ],

    // Default points for any participant who placed outside top 8
    'participation_points' => 10,

    /*
    |--------------------------------------------------------------------------
    | Tournament Tier Multipliers
    |--------------------------------------------------------------------------
    | Tournaments can be tagged with a tier that multiplies all points.
    */
    'tier_multipliers' => [
        'standard'     => 1.0,
        'featured'     => 2.0,
        'championship' => 3.0,
    ],

    // Default tier if tournament has no tier set
    'default_tier' => 'standard',

    /*
    |--------------------------------------------------------------------------
    | Win/Loss Points (per match)
    |--------------------------------------------------------------------------
    */
    'match_win_points'  => 3,
    'match_loss_points' => 1,

];
