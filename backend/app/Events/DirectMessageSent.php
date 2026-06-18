<?php

declare(strict_types=1);

namespace App\Events;

use App\Models\DirectMessage;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Fired when a direct message is sent. Broadcast to the conversation's
 * private channel so the other participant receives it in real time.
 */
final class DirectMessageSent implements ShouldBroadcast
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(public readonly DirectMessage $message)
    {
    }

    /** @return array<int, PrivateChannel> */
    public function broadcastOn(): array
    {
        return [new PrivateChannel('dm.' . $this->message->conversation_id)];
    }

    public function broadcastAs(): string
    {
        return 'dm.sent';
    }

    /** @return array<string, mixed> */
    public function broadcastWith(): array
    {
        $m = $this->message;

        return [
            'message' => [
                'id'                => $m->id,
                'conversation_id'   => $m->conversation_id,
                'sender_id'         => $m->sender_id,
                'body'              => $m->body,
                'audio_url'         => $m->audio_url,
                'audio_duration_ms' => $m->audio_duration_ms,
                'read_at'           => $m->read_at,
                'created_at'        => $m->created_at,
            ],
        ];
    }
}
