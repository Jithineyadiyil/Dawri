<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PrizeAwarded extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly User   $user,
        public readonly object $tournament,
        public readonly string $placement,
        public readonly string $prize,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Congratulations! You won {$this->prize} in {$this->tournament->name}",
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.prize-awarded');
    }
}
