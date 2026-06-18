<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TournamentResult extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly User   $user,
        public readonly object $tournament,
        public readonly object $match,
        public readonly bool   $won,
    ) {}

    public function envelope(): Envelope
    {
        $subject = $this->won
            ? "Victory! You won your match in {$this->tournament->name}"
            : "Match result — {$this->tournament->name}";

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.tournament-result');
    }
}
