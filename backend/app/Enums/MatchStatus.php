<?php
declare(strict_types=1);
namespace App\Enums;
enum MatchStatus: string {
    case PENDING   = 'pending';
    case SCHEDULED = 'scheduled';
    case ONGOING   = 'ongoing';
    case SUBMITTED = 'submitted';
    case DISPUTED  = 'disputed';
    case COMPLETED = 'completed';
    case WALKOVER  = 'walkover';
    case CANCELLED = 'cancelled';
}
