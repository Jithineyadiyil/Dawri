<?php
declare(strict_types=1);
namespace App\Enums;
enum BracketFormat: string {
    case SINGLE_ELIMINATION = 'single_elimination';
    case DOUBLE_ELIMINATION = 'double_elimination';
    case ROUND_ROBIN        = 'round_robin';
    case SWISS              = 'swiss';
    public function label(): string {
        return match($this) {
            self::SINGLE_ELIMINATION => 'Single Elimination',
            self::DOUBLE_ELIMINATION => 'Double Elimination',
            self::ROUND_ROBIN        => 'Round Robin',
            self::SWISS              => 'Swiss System',
        };
    }
}
