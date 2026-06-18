<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Achievement;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

final class AchievementUnlockedNotification extends Notification
{
    use Queueable;

    public function __construct(public Achievement $achievement) {}

    public function via(object $notifiable): array { return ['database']; }

    public function toArray(object $notifiable): array
    {
        return [
            'type'             => 'achievement_unlocked',
            'achievement_id'   => $this->achievement->id,
            'key'              => $this->achievement->key,
            'name'             => $this->achievement->name,
            'name_ar'          => $this->achievement->name_ar,
            'description'      => $this->achievement->description,
            'tier'             => $this->achievement->tier,
            'icon'             => $this->achievement->icon,
            'xp_reward'        => $this->achievement->xp_reward,
            'unlocked_at'      => now()->toIso8601String(),
        ];
    }
}
