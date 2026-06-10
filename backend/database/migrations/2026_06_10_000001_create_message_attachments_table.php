<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Phase 3 — image attachments on messages.
 *
 * A message may carry one or more images (stored on the 'public' disk via
 * AttachmentService). The carrier message rides the existing feed / broadcast /
 * pagination paths and the UI renders the images inline. Width/height are kept
 * so the client can reserve space and avoid layout shift while loading.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('message_attachments', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->uuid('message_id');
            $table->string('path');                 // relative path on the public disk
            $table->string('mime', 64);
            $table->unsignedInteger('size')->comment('bytes');
            $table->unsignedSmallInteger('width')->nullable();
            $table->unsignedSmallInteger('height')->nullable();
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('message_id')
                ->references('id')->on('messages')
                ->cascadeOnDelete();

            $table->index('message_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_attachments');
    }
};
