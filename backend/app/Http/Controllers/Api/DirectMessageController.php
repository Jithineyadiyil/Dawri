<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\DirectMessageSent;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\DirectMessage;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * DirectMessageController — 1:1 private chat between friends.
 *
 *   GET  /dm                       — my conversations (latest first)
 *   GET  /dm/with/{user}           — open/create a conversation with a user
 *   GET  /dm/{conversation}/messages
 *   POST /dm/with/{user}           — send a message   { body }
 *   POST /dm/{conversation}/read   — mark received messages read
 */
final class DirectMessageController extends Controller
{
    /** GET /dm — conversation list (DMs + groups + team chats) with last message + unread count. */
    public function index(Request $request): JsonResponse
    {
        $me = $request->user();

        // Pull every conversation the user is a participant in (DMs, groups, teams).
        $convIds = \DB::table('conversation_participants')->where('user_id', $me->id)->pluck('conversation_id');
        $conversations = Conversation::query()
            ->whereIn('id', $convIds)
            ->with(['userOne', 'userTwo', 'team'])
            ->orderByDesc('last_message_at')
            ->get();

        $data = $conversations->map(function (Conversation $c) use ($me) {
            $last  = DirectMessage::query()
                ->where('conversation_id', $c->id)
                ->latest()
                ->first();

            // Resolve who/what this conversation is "with"
            $user = null; $group = null;
            if ($c->type === Conversation::TYPE_DM) {
                $user = $c->user_one_id === $me->id ? $c->userTwo : $c->userOne;
            } elseif ($c->type === Conversation::TYPE_TEAM && $c->team) {
                $group = [
                    'kind'     => 'team',
                    'id'       => $c->team->id,
                    'name'     => $c->team->name,
                    'tag'      => $c->team->tag,
                    'logo_url' => $c->team->logo_url,
                ];
            } else {
                $group = ['kind' => 'group', 'name' => $c->name];
            }

            return [
                'id'           => $c->id,
                'type'         => $c->type,
                'user'         => $user ? $this->publicUser($user) : null,
                'group'        => $group,
                'last_message' => $last ? [
                    'body'       => $last->audio_path ? 'Voice message' : $last->body,
                    'sender_id'  => $last->sender_id,
                    'created_at' => $last->created_at,
                ] : null,
                'unread'       => $this->unreadCount($c->id, $me->id),
                'updated_at'   => $c->last_message_at,
            ];
        });

        return response()->json(['data' => $data->values()]);
    }

    /** POST /dm/{conversation}/send — send to a group/team conversation. Body: { body }. */
    public function sendToConversation(Request $request, Conversation $conversation): JsonResponse
    {
        $me = $request->user();
        abort_unless($conversation->hasParticipant($me->id), 403, 'Not a participant.');

        $data = $request->validate(['body' => ['required', 'string', 'max:4000']]);
        $message = DirectMessage::create([
            'conversation_id' => $conversation->id,
            'sender_id'       => $me->id,
            'body'            => trim($data['body']),
        ]);
        $conversation->update(['last_message_at' => $message->created_at]);
        broadcast(new DirectMessageSent($message))->toOthers();
        return response()->json(['data' => $this->publicMessage($message)], 201);
    }

    /** GET /dm/with/{user} — get-or-create a conversation, friends only. */
    public function with(Request $request, User $user): JsonResponse
    {
        $me = $request->user();
        $this->assertCanMessage($me, $user);

        $c = Conversation::between($me->id, $user->id);

        return response()->json([
            'id'   => $c->id,
            'user' => $this->publicUser($user),
        ]);
    }

    /** GET /dm/{conversation}/messages — chronological, marks received read. */
    public function messages(Request $request, Conversation $conversation): JsonResponse
    {
        $me = $request->user();
        abort_unless($conversation->hasParticipant($me->id), 403);

        $this->markReceivedRead($conversation->id, $me->id);

        $messages = DirectMessage::query()
            ->where('conversation_id', $conversation->id)
            ->orderBy('created_at')
            ->limit(200)
            ->get()
            ->map(fn (DirectMessage $m) => $this->publicMessage($m));

        return response()->json(['data' => $messages->values()]);
    }

    /** POST /dm/with/{user} — send a message. Body: { body }. */
    public function send(Request $request, User $user): JsonResponse
    {
        $me   = $request->user();
        $this->assertCanMessage($me, $user);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:4000'],
        ]);

        $c = Conversation::between($me->id, $user->id);

        $message = DirectMessage::create([
            'conversation_id' => $c->id,
            'sender_id'       => $me->id,
            'body'            => trim($data['body']),
        ]);

        $c->update(['last_message_at' => $message->created_at]);

        broadcast(new DirectMessageSent($message))->toOthers();

        return response()->json(['data' => $this->publicMessage($message)], 201);
    }

    /** POST /dm/with/{user}/voice — send a voice note. Multipart: audio, duration_ms. */
    public function sendVoice(Request $request, User $user): JsonResponse
    {
        $me = $request->user();
        $this->assertCanMessage($me, $user);

        $request->validate([
            'audio'       => ['required', 'file', 'mimetypes:audio/webm,audio/ogg,audio/mpeg,audio/mp4,audio/wav,audio/x-m4a', 'max:10240'],
            'duration_ms' => ['nullable', 'integer', 'min:0', 'max:600000'],
        ]);

        $c    = Conversation::between($me->id, $user->id);
        $path = $request->file('audio')->store("dm-voice/{$c->id}", 'public');

        $message = DirectMessage::create([
            'conversation_id'   => $c->id,
            'sender_id'         => $me->id,
            'body'              => '',
            'audio_path'        => $path,
            'audio_duration_ms' => (int) $request->input('duration_ms', 0),
        ]);

        $c->update(['last_message_at' => $message->created_at]);

        broadcast(new DirectMessageSent($message))->toOthers();

        return response()->json(['data' => $this->publicMessage($message)], 201);
    }

    /** POST /dm/{conversation}/read — mark all received messages read. */
    public function markRead(Request $request, Conversation $conversation): JsonResponse
    {
        $me = $request->user();
        abort_unless($conversation->hasParticipant($me->id), 403);

        $this->markReceivedRead($conversation->id, $me->id);

        return response()->json(['ok' => true]);
    }

    /** GET /dm/unread-count — total unread across all conversations (nav badge). */
    public function unreadTotal(Request $request): JsonResponse
    {
        $me = $request->user();

        $count = DirectMessage::query()
            ->whereNull('read_at')
            ->where('sender_id', '!=', $me->id)
            ->whereIn('conversation_id', function ($q) use ($me): void {
                $q->select('id')->from('conversations')
                  ->where('user_one_id', $me->id)->orWhere('user_two_id', $me->id);
            })
            ->count();

        return response()->json(['count' => $count]);
    }

    // ── Helpers ───────────────────────────────────────────────────────

    /** DMs require an accepted friendship between the two users. */
    private function assertCanMessage(User $me, User $other): void
    {
        abort_if($me->id === $other->id, 422, 'You cannot message yourself.');
        abort_unless($me->isFriendsWith($other->id), 403, 'You can only message friends.');
    }

    private function unreadCount(string $conversationId, string $meId): int
    {
        return DirectMessage::query()
            ->where('conversation_id', $conversationId)
            ->where('sender_id', '!=', $meId)
            ->whereNull('read_at')
            ->count();
    }

    private function markReceivedRead(string $conversationId, string $meId): void
    {
        DirectMessage::query()
            ->where('conversation_id', $conversationId)
            ->where('sender_id', '!=', $meId)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
    }

    /** @return array<string, mixed> */
    private function publicMessage(DirectMessage $m): array
    {
        return [
            'id'                => $m->id,
            'conversation_id'   => $m->conversation_id,
            'sender_id'         => $m->sender_id,
            'body'              => $m->body,
            'audio_url'         => $m->audio_url,
            'audio_duration_ms' => $m->audio_duration_ms,
            'read_at'           => $m->read_at,
            'created_at'        => $m->created_at,
        ];
    }

    /** @return array<string, mixed> */
    private function publicUser(User $u): array
    {
        return [
            'id'           => $u->id,
            'name'         => $u->name,
            'nickname'     => $u->nickname,
            'display_name' => $u->display_name,
            'avatar_url'   => $u->avatar_url,
        ];
    }
}
