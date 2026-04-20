<?php
declare(strict_types=1);
namespace App\Enums;
enum UserRole: string {
    case PLAYER    = 'player';
    case ORGANIZER = 'organizer';
    case MODERATOR = 'moderator';
    case HR_ADMIN  = 'hr_admin';
    case ADMIN     = 'admin';
}
