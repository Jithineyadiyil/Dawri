<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Channel;
use App\Models\ScheduledMessage;
use App\Models\User;
use App\Services\MessageService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

/**
 * Phase 7 — publishes any scheduled messages whose time has arrived, by
 * replaying them through MessageService::post (so they sanitise, word-filter,
 * and broadcast exactly like a live post). Intended to run every minute via the
 * Laravel scheduler.
 */
final class PublishScheduledMessages extends Command
{
    protected $signature = 'community:publish-scheduled';

    protected $description = 'Publish community messages whose scheduled time has arrived';

    public function handle(MessageService $messages): int
    {
        $due = ScheduledMessage::query()
            ->whereNull('posted_at')
            ->whereNull('cancelled_at')
            ->where('scheduled_for', '<=', now())
            ->orderBy('scheduled_for')
            ->limit(100)
            ->get();

        if ($due->isEmpty()) {
            return self::SUCCESS;
        }

        $published = 0;

        foreach ($due as $scheduled) {
            $channel = Channel::find($scheduled->channel_id);
            $author  = User::find($scheduled->user_id);

            if ($channel === null || $author === null) {
                $scheduled->update([
                    'cancelled_at' => now(),
                    'error'        => 'Channel or author no longer exists.',
                ]);
                continue;
            }

            try {
                $message = $messages->post($channel, $author, $scheduled->content);
                $scheduled->update([
                    'posted_at'         => now(),
                    'posted_message_id' => $message->id,
                    'error'             => null,
                ]);
                $published++;
            } catch (\Throwable $e) {
                // e.g. a blocked word added after scheduling. Record and leave
                // it un-posted so a moderator can see why; don't retry forever.
                $scheduled->update([
                    'cancelled_at' => now(),
                    'error'        => $e->getMessage(),
                ]);
                Log::warning('Scheduled message failed to publish', [
                    'scheduled_message_id' => $scheduled->id,
                    'error'                => $e->getMessage(),
                ]);
            }
        }

        $this->info("Published {$published} scheduled message(s).");

        return self::SUCCESS;
    }
}
