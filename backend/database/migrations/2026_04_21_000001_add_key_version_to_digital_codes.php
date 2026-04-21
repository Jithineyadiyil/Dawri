<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds a key_version column to digital_codes so that codes encrypted under
 * a previous APP_KEY can still be decrypted after rotation, provided the
 * application retains the old key in config/app.php['previous_keys'].
 *
 * See: https://laravel.com/docs/11.x/encryption#gracefully-rotating-encryption-keys
 *
 * This migration is idempotent: it checks for column existence before
 * attempting to add it so it can be re-run safely against environments
 * where it was partially applied.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('digital_codes', function (Blueprint $table): void {
            if (! Schema::hasColumn('digital_codes', 'key_version')) {
                $table->unsignedSmallInteger('key_version')
                    ->default(1)
                    ->after('code_enc')
                    ->comment('APP_KEY rotation version used to encrypt code_enc');
            }
        });
    }

    public function down(): void
    {
        Schema::table('digital_codes', function (Blueprint $table): void {
            if (Schema::hasColumn('digital_codes', 'key_version')) {
                $table->dropColumn('key_version');
            }
        });
    }
};
