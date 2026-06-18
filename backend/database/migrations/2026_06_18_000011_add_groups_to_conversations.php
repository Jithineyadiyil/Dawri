<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Dawri 2.0 — extend conversations to support group chats (team-bound).
 *
 *   • conversations.type — 'dm' | 'group' | 'team'
 *   • conversations.team_id — link to teams (cascade-deleted with team)
 *   • conversations.name — group display name (null for dms)
 *   • user_one_id / user_two_id stay populated for 'dm' rows so the
 *     canonical-pair unique index keeps preventing duplicate 1:1 threads.
 *     For groups/teams they're nullable.
 *   • NEW table conversation_participants — source of truth for "who's
 *     in this conversation". DMs get 2 rows (back-filled). Groups get N.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('conversations', function (Blueprint $table): void {
            $table->enum('type', ['dm', 'group', 'team'])->default('dm')->after('id');
            $table->uuid('team_id')->nullable()->after('type');
            $table->string('name', 100)->nullable()->after('team_id');
            $table->uuid('created_by')->nullable()->after('name');

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnDelete();
            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            $table->index('type');
            $table->index('team_id');
        });

        // Make user_one_id/user_two_id nullable so group/team conversations
        // (which have no canonical pair) can be inserted. Raw SQL avoids the
        // doctrine/dbal dependency that ->change() needs.
        DB::statement('ALTER TABLE conversations MODIFY user_one_id CHAR(36) NULL');
        DB::statement('ALTER TABLE conversations MODIFY user_two_id CHAR(36) NULL');

        Schema::create('conversation_participants', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('conversation_id');
            $table->uuid('user_id');
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamp('last_read_at')->nullable();
            $table->timestamps();

            $table->foreign('conversation_id')->references('id')->on('conversations')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();

            $table->unique(['conversation_id', 'user_id']);
            $table->index('user_id');
        });

        // Back-fill: every existing DM gets 2 participant rows.
        $dms = DB::table('conversations')->select('id', 'user_one_id', 'user_two_id', 'created_at')->get();
        foreach ($dms as $c) {
            $now = now();
            foreach ([$c->user_one_id, $c->user_two_id] as $userId) {
                if (! $userId) continue;
                DB::table('conversation_participants')->insertOrIgnore([
                    'id'              => (string) Str::uuid(),
                    'conversation_id' => $c->id,
                    'user_id'         => $userId,
                    'joined_at'       => $c->created_at ?: $now,
                    'created_at'      => $now,
                    'updated_at'      => $now,
                ]);
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('conversation_participants');
        Schema::table('conversations', function (Blueprint $table): void {
            $table->dropForeign(['team_id']);
            $table->dropForeign(['created_by']);
            $table->dropIndex(['type']);
            $table->dropIndex(['team_id']);
            $table->dropColumn(['type', 'team_id', 'name', 'created_by']);
        });
    }
};
