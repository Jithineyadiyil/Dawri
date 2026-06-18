<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CommunityInvite extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly string $communityName,
        public readonly string $inviterName,
        public readonly string $inviteUrl,
        public readonly ?string $expiresAt = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "{$this->inviterName} invited you to join {$this->communityName} on Dawri",
        );
    }

    public function content(): Content
    {
        return new Content(view: 'emails.community-invite');
    }
}
