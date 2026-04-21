<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\DigitalOrder;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

/**
 * OrderConfirmationNotification
 *
 * Sent to the buyer when a digital goods order is successfully fulfilled.
 * Email channel is live (uses framework mail); SMS channel logs to Laravel
 * for now — wire up Unifonic/Taqnyat in SmsChannel later.
 *
 * The redemption code itself is NEVER included in email/SMS for security;
 * users must reveal it via the in-app "Reveal Code" action which consumes
 * the one-time reveal token.
 */
final class OrderConfirmationNotification extends Notification
{
    use Queueable;

    public function __construct(private readonly DigitalOrder $order) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $channels = ['mail'];
        if (! empty($notifiable->phone)) {
            $channels[] = 'sms';  // custom channel, see toSms()
        }
        return $channels;
    }

    public function toMail(object $notifiable): MailMessage
    {
        $brand = $this->order->product?->brand ?? 'Gift Card';
        $value = number_format((float) $this->order->total_price, 2);

        return (new MailMessage)
            ->subject("Your {$brand} card is ready · Dawri")
            ->greeting('Order confirmed')
            ->line("Your {$brand} gift card purchase of {$value} SAR has been fulfilled.")
            ->line('For security, your redemption code is not included in this email. Please sign in to the Dawri app to reveal it.')
            ->action('Reveal code', url('/marketplace/orders'))
            ->line('Thanks for using Dawri.')
            ->salutation('— The Dawri team');
    }

    /**
     * SMS payload — routed via Unifonic/Taqnyat in production.
     *
     * @return array<string, string>
     */
    public function toSms(object $notifiable): array
    {
        $brand = $this->order->product?->brand ?? 'Gift Card';
        $text  = "Dawri: Your {$brand} card is ready. Sign in to reveal your code: dawri.gg/marketplace";

        // TODO: replace with real Unifonic/Taqnyat dispatcher
        Log::info('SMS (stub)', ['to' => $notifiable->phone, 'body' => $text]);

        return ['to' => (string) $notifiable->phone, 'body' => $text];
    }
}
