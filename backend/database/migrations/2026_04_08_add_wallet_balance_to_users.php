<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'wallet_balance')) {
            Schema::table('users', static function (Blueprint $table): void {
                $table->decimal('wallet_balance', 10, 2)->default(0)->after('email');
            });
        }
    }

    public function down(): void
    {
        Schema::table('users', fn ($t) => $t->dropColumn('wallet_balance'));
    }
};
