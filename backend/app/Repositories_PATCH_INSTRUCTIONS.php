<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| LiveBroadcastRepository EXTENSIONS  (Sprint 6, May 2026)
|--------------------------------------------------------------------------
| Append the methods below to your existing files:
|   - app/Repositories/Contracts/LiveBroadcastRepositoryInterface.php
|   - app/Repositories/Eloquent/LiveBroadcastRepository.php
|
| Do NOT replace the files — only add the new method signatures and
| implementations. The rest of your Sprint 5 code stays untouched.
*/

// ════════════════════════════════════════════════════════════════════
//  LiveBroadcastRepositoryInterface.php — add this method declaration
// ════════════════════════════════════════════════════════════════════

/**
 * Find a broadcast by its Mux live stream ID.
 *
 * Used by the Mux webhook handler to map upstream events back to a
 * Dawri broadcast row without trusting any client-supplied identifier.
 *
 * @param string $muxStreamId
 *
 * @return \App\Models\LiveBroadcast|null
 */
// public function findByMuxStreamId(string $muxStreamId): ?\App\Models\LiveBroadcast;


// ════════════════════════════════════════════════════════════════════
//  LiveBroadcastRepository.php (Eloquent) — add this implementation
// ════════════════════════════════════════════════════════════════════

/**
 * @inheritDoc
 */
// public function findByMuxStreamId(string $muxStreamId): ?\App\Models\LiveBroadcast
// {
//     return \App\Models\LiveBroadcast::query()
//         ->where('mux_stream_id', $muxStreamId)
//         ->first();
// }


// ════════════════════════════════════════════════════════════════════
//  LiveBroadcast model — add to $fillable + $casts (if you use them)
// ════════════════════════════════════════════════════════════════════
//
//   protected $fillable = [
//       /* ... existing fields ... */
//       'bridge_provider',
//       'mux_stream_id',
//       'mux_playback_id',
//       'mux_simulcast_target_id',
//       'whip_url',
//   ];
