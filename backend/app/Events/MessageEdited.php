<?php

declare(strict_types=1);

namespace App\Events;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

final class MessageEdited implements ShouldBroadcast
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(public readonly Message $message)
    {
    }

    /** @return array<int, PresenceChannel> */
    public function broadcastOn(): array
    {
        return [new PresenceChannel('community.channel.' . $this->message->channel_id)];
    }

    public function broadcastAs(): string
    {
        return 'message.edited';
    }

    /** @return array<string, mixed> */
    public function broadcastWith(): array
    {
        return [
            'message' => (new MessageResource($this->message))->toArray(request()),
        ];
    }
}
