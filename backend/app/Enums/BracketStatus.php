<?php
declare(strict_types=1);
namespace App\Enums;
enum BracketStatus: string {
    case PENDING     = 'pending';
    case GENERATED   = 'generated';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED   = 'completed';
    case CANCELLED   = 'cancelled';
}
