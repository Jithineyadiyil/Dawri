<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

/**
 * Base class for all Dawri tournament notifications.
 * Delivers via 'database' channel (stored in notifications table)
 * so the frontend can poll/display them in the bell icon.
 */
abstract class TournamentNotification extends Notification
{
    use Queueable;

    /** All tournament notifications go to the database channel. */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Convert to database array.
     * Each subclass must implement this to provide the payload.
     */
    abstract public function toDatabase(object $notifiable): array;

    /**
     * toArray() delegates to toDatabase() for the database channel.
     */
    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
