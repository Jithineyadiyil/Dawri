<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

/**
 * NotificationController
 *
 * Endpoints for the frontend notification bell:
 *   GET    /notifications            — paginated list (newest first)
 *   GET    /notifications/unread-count — badge count
 *   POST   /notifications/{id}/read  — mark one read
 *   POST   /notifications/read-all   — mark all read
 *   DELETE /notifications/{id}       — delete one
 */
class NotificationController extends Controller
{
    /** GET /notifications */
    public function index(Request $request): JsonResponse
    {
        $notifications = $request->user()
            ->notifications()
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => $notifications->items(),
            'meta' => [
                'total'        => $notifications->total(),
                'current_page' => $notifications->currentPage(),
                'last_page'    => $notifications->lastPage(),
                'unread_count' => $request->user()->unreadNotifications()->count(),
            ],
        ]);
    }

    /** GET /notifications/unread-count */
    public function unreadCount(Request $request): JsonResponse
    {
        return response()->json([
            'count' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    /** POST /notifications/{id}/read */
    public function markRead(Request $request, string $id): JsonResponse
    {
        $notification = $request->user()
            ->notifications()
            ->where('id', $id)
            ->firstOrFail();

        $notification->markAsRead();

        return response()->json(['message' => 'Marked as read.']);
    }

    /** POST /notifications/read-all */
    public function markAllRead(Request $request): JsonResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json(['message' => 'All notifications marked as read.']);
    }

    /** DELETE /notifications/{id} */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $request->user()
            ->notifications()
            ->where('id', $id)
            ->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
