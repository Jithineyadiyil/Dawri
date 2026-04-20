<?php
declare(strict_types=1);
namespace App\Enums;
enum UserStatus: string {
    case PENDING   = 'pending';
    case ACTIVE    = 'active';
    case VERIFIED  = 'verified';
    case SUSPENDED = 'suspended';
    case BANNED    = 'banned';
}
