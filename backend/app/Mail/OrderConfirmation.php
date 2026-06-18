<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly User   $user,
        public readonly array  $orders,
        public readonly float  $totalPaid,
        public readonly string $paymentMethod,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: "Order confirmed — {$this->totalPaid} SAR");
    }

    public function content(): Content
    {
        return new Content(view: 'emails.order-confirmation');
    }
}
