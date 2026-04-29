<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BulkUploadCodesRequest;
use App\Http\Resources\CodeBatchResource;
use App\Http\Resources\ProductCodeResource;
use App\Models\CodeBatch;
use App\Models\DigitalProduct;
use App\Models\ProductCode;
use App\Services\InventoryCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * AdminInventoryController
 *
 * Inventory-pool management for admins. All routes sit under
 * `/api/v1/admin/marketplace/...` with auth:sanctum + admin middleware.
 *
 * Endpoints:
 *   GET    /products/{product}/inventory                  — overview + batches
 *   POST   /products/{product}/inventory/upload           — bulk add codes
 *   GET    /products/{product}/inventory/codes            — paginated pool
 *   POST   /products/{product}/fulfillment-mode           — toggle api<->inventory
 *   POST   /products/{product}/auto-hide                  — toggle auto_hide_when_empty
 *   GET    /batches/{batch}                               — batch detail
 *   DELETE /batches/{batch}                               — delete (if no deliveries)
 */
class AdminInventoryController extends Controller
{
    public function __construct(
        private readonly InventoryCodeService $inventory,
    ) {}

    /**
     * GET — inventory overview for one product.
     */
    public function show(string $productId): JsonResponse
    {
        $product = DigitalProduct::findOrFail($productId);

        $batches = CodeBatch::query()
            ->where('product_id', $product->id)
            ->orderByDesc('created_at')
            ->limit(50)
            ->with('uploader:id,name')
            ->get();

        return response()->json([
            'data' => [
                'product' => [
                    'id'                   => $product->id,
                    'name'                 => $product->name,
                    'fulfillment_mode'     => $product->fulfillment_mode,
                    'is_active'            => (bool) $product->is_active,
                    'low_stock_threshold'  => (int) ($product->low_stock_threshold ?? 5),
                    'auto_hide_when_empty' => (bool) ($product->auto_hide_when_empty ?? true),
                ],
                'stock'   => $this->inventory->stockBreakdown($product->id),
                'batches' => CodeBatchResource::collection($batches),
            ],
        ]);
    }

    /**
     * POST — bulk upload codes.
     */
    public function upload(BulkUploadCodesRequest $request, string $productId): JsonResponse
    {
        $product = DigitalProduct::findOrFail($productId);

        if (!$product->isInventoryMode()) {
            return response()->json([
                'message' => 'Product must be in inventory fulfillment mode to upload codes. '
                           . 'Switch mode first.',
            ], 422);
        }

        $rows = $request->normalizedRows();
        if (empty($rows)) {
            return response()->json(['message' => 'No codes found in the payload.'], 422);
        }

        $result = $this->inventory->uploadBatch($product, $rows, [
            'supplier_name'       => (string) $request->input('supplier_name'),
            'supplier_ref'        => $request->input('supplier_ref'),
            'source'              => (string) $request->input('source', 'manual'),
            'unit_cost_sar'       => $request->filled('unit_cost_sar')
                                        ? (float) $request->input('unit_cost_sar')
                                        : null,
            'notes'               => $request->input('notes'),
            'uploaded_by_user_id' => $request->user()?->id,
        ]);

        return response()->json([
            'message' => "Uploaded {$result['inserted']} codes "
                       . "({$result['duplicates']} duplicates, {$result['invalid']} invalid).",
            'data'    => [
                'batch'         => new CodeBatchResource($result['batch']),
                'inserted'      => $result['inserted'],
                'duplicates'    => $result['duplicates'],
                'invalid'       => $result['invalid'],
                'sample_errors' => $result['sample_errors'],
                'stock'         => $this->inventory->stockBreakdown($product->id),
            ],
        ], 201);
    }

    /**
     * GET — paginated masked code list.
     */
    public function codes(Request $request, string $productId): JsonResponse
    {
        $product = DigitalProduct::findOrFail($productId);

        $status = $request->query('status');
        $q = ProductCode::query()
            ->where('product_id', $product->id)
            ->orderByDesc('created_at');

        if ($status && in_array($status, ProductCode::STATUSES, true)) {
            $q->where('status', $status);
        }

        $codes = $q->paginate(25);

        return response()->json([
            'data' => ProductCodeResource::collection($codes),
            'meta' => [
                'current_page' => $codes->currentPage(),
                'last_page'    => $codes->lastPage(),
                'total'        => $codes->total(),
                'per_page'     => $codes->perPage(),
            ],
        ]);
    }

    /**
     * POST — toggle fulfillment_mode.
     */
    public function setFulfillmentMode(Request $request, string $productId): JsonResponse
    {
        $validated = $request->validate([
            'fulfillment_mode' => ['required', Rule::in(DigitalProduct::MODES)],
        ]);

        $product = DigitalProduct::findOrFail($productId);
        $old = $product->fulfillment_mode;
        $product->fulfillment_mode = $validated['fulfillment_mode'];
        $product->save();

        return response()->json([
            'message' => "Fulfillment mode changed from {$old} to {$product->fulfillment_mode}.",
            'data'    => [
                'id'               => $product->id,
                'fulfillment_mode' => $product->fulfillment_mode,
                'stock'            => $this->inventory->stockBreakdown($product->id),
            ],
        ]);
    }

    /**
     * POST — toggle auto_hide_when_empty.
     *
     * Admin opt-in / opt-out of the auto-hide behaviour for inventory
     * products. When opted OUT, the product stays visible on the storefront
     * even at zero stock (storefront decides how to render — e.g. "Sold out"
     * badge). Admins who opt out manage their own is_active state.
     */
    public function setAutoHide(Request $request, string $productId): JsonResponse
    {
        $validated = $request->validate([
            'auto_hide_when_empty' => ['required', 'boolean'],
        ]);

        $product = DigitalProduct::findOrFail($productId);
        $product->auto_hide_when_empty = (bool) $validated['auto_hide_when_empty'];
        $product->save();

        return response()->json([
            'message' => $product->auto_hide_when_empty
                ? 'Auto-hide enabled — product will hide when stock reaches 0.'
                : 'Auto-hide disabled — product stays visible at 0 stock.',
            'data'    => [
                'id'                   => $product->id,
                'auto_hide_when_empty' => (bool) $product->auto_hide_when_empty,
            ],
        ]);
    }

    /**
     * GET — single batch detail.
     */
    public function batchShow(string $batchId): JsonResponse
    {
        $batch = CodeBatch::with('uploader:id,name')->findOrFail($batchId);
        return response()->json(['data' => new CodeBatchResource($batch)]);
    }

    /**
     * DELETE — remove batch if no code delivered yet.
     */
    public function batchDestroy(string $batchId): JsonResponse
    {
        $batch = CodeBatch::findOrFail($batchId);

        $delivered = ProductCode::query()
            ->where('batch_id', $batch->id)
            ->where('status', ProductCode::STATUS_DELIVERED)
            ->count();

        if ($delivered > 0) {
            return response()->json([
                'message' => "Cannot delete batch — {$delivered} code(s) already delivered.",
            ], 409);
        }

        $batch->delete();

        return response()->json([
            'message' => 'Batch deleted.',
            'data'    => ['id' => $batch->id],
        ]);
    }
}
