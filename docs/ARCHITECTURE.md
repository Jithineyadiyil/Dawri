# Dawri Marketplace — Architecture

Sprint 5 redesign. This document covers the distributor abstraction,
payment flow, and the end-to-end checkout pipeline.

---

## Layer overview

```
┌────────────────────────────────────────────────────────────┐
│  FRONTEND — Angular 17 (standalone component)              │
│  MarketplaceComponent                                      │
│    ├─ products (signal)                                    │
│    ├─ cart (signal, with batch qty)                        │
│    └─ currentIdempotencyKey (UUID, stable per attempt)     │
└──────────────────────┬─────────────────────────────────────┘
                       │ POST /api/v1/marketplace/orders
                       │ { items[], payment_method, idempotency_key }
                       ▼
┌────────────────────────────────────────────────────────────┐
│  HTTP — PlaceOrderRequest (FormRequest validation)         │
│    - product_id xor items[] required                       │
│    - max 20 items, max qty 10 per item                     │
│    - payment_method in [wallet, card, mada, stc_pay]       │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  CONTROLLER — MarketplaceController                        │
│   1. Check idempotency → short-circuit if seen             │
│   2. Expand items[] × qty into line rows                   │
│   3. PaymentService::charge (ONE payment for the batch)    │
│   4. For each line: fulfilOne() → DistributorRouter        │
│   5. On distributor fail after charge: PaymentService      │
│      ::refund() for that line only                         │
│   6. Dispatch OrderConfirmationNotification per success    │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  DISTRIBUTOR ROUTER — DistributorRouter                    │
│   1. Build candidate chain (brand-specific first)          │
│   2. Skip unconfigured adapters                            │
│   3. Skip adapters with open circuit                       │
│   4. Try each, record health after each attempt            │
│   5. On 3rd consecutive failure → open circuit 5min        │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌─────────┬────────┬──────────┬─────────────────────────────┐
│Likecard │WUPEX   │Reloadly  │Jawaker  (all implement      │
│(pri 10) │(pri 5) │(pri 7)   │(pri 3)   DistributorInterface│
└─────────┴────────┴──────────┴─────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────────────────┐
│  DATA — digital_orders, digital_codes, distributor_health │
│   - code_enc (AES-256 via Laravel Crypt)                   │
│   - key_version (for APP_KEY rotation)                     │
│   - idempotency_key UNIQUE per user                        │
└────────────────────────────────────────────────────────────┘
```

---

## Happy path — batch checkout of 3 cards

```
User clicks "Checkout" (cart: 2 × PSN, 1 × Netflix)
  │
  ▼
[FRONTEND]
  processCheckout() builds payload:
    {
      items: [
        { product_id: "psn-1", qty: 2 },
        { product_id: "netflix-1", qty: 1 }
      ],
      payment_method: "wallet",
      idempotency_key: "crypto.randomUUID()"
    }
  │
  ▼
[CONTROLLER] placeOrder()
  - No existing order for this key → proceed
  - Expand: 3 line-items totalling 250 SAR
  - PaymentService::charge (wallet) → success, balance debited
  │
  ├── fulfilOne #1 (PSN)    → Router → LikecardAdapter → success → code_enc stored
  ├── fulfilOne #2 (PSN)    → Router → LikecardAdapter → success → code_enc stored
  └── fulfilOne #3 (Netflix)→ Router → LikecardAdapter → success → code_enc stored
  │
  ▼
Response (201):
  {
    data: [...3 orders via DigitalOrderResource...],
    summary: { total_lines: 3, completed: 3, failed: 0, charged: 250 }
  }
```

---

## Partial-failure path — 2 succeed, 1 fails

```
User clicks "Checkout" (cart: 3 × PUBG) — PUBG adapter has no stock
  │
  ▼
[CONTROLLER] placeOrder()
  - Total: 300 SAR → chargeWallet succeeds, balance debited by 300
  │
  ├── fulfilOne #1 → Router → Likecard success → code stored
  ├── fulfilOne #2 → Router → Likecard fails ("out of stock")
  │                  → PaymentService::refund(100 SAR, wallet)
  │                  → order.status = "refunded"
  └── fulfilOne #3 → Router → Likecard success → code stored
  │
  ▼
Response (201):
  {
    data: [completed, refunded, completed],
    summary: { total_lines: 3, completed: 2, failed: 1, charged: 300 }
  }

Final wallet: (starting - 300) + 100 refund = starting - 200
```

---

## Idempotency protection

```
User double-clicks "Checkout" → two simultaneous POSTs with same idempotency_key
  │
  ├── Request A (first to reach DB)
  │   └── No existing order → creates, charges, fulfils → 201 Created
  │
  └── Request B (arrives ms later)
      └── SELECT WHERE idempotency_key=? returns Request A's order
         → Returns existing row with `idempotent: true` → 200 OK

Net effect: ONE charge, ONE fulfilment, ONE notification.
```

---

## Circuit breaker state machine

```
         SUCCESS                    SUCCESS on trial
     ┌──────────────┐           ┌────────────────────┐
     │              ▼           │                    ▼
  ┌─────────┐   ┌──────┐    ┌──────────┐        ┌─────────┐
  │ CLOSED  │──▶│ FAIL │───▶│ HALF-OPEN│───────▶│ CLOSED  │
  │ healthy │   │count │    │  (trial) │        │         │
  └─────────┘   └──┬───┘    └────▲─────┘        └─────────┘
                   │ 3 fails      │
                   ▼              │ 5 min elapsed
              ┌────────┐          │
              │  OPEN  │──────────┘
              │  skip  │
              └────────┘
```

When `DistributorHealth.circuit_status = 'open'`, the router skips that
adapter entirely. Every 5 minutes the next request flips the circuit to
`half-open` and tries the adapter once — success closes the circuit,
failure re-opens it for another 5 minutes.

---

## Key files at a glance

| File | Purpose |
|---|---|
| `Contracts/DistributorInterface.php` | Abstract interface every distributor implements |
| `Services/DistributorRouter.php` | Orchestrates priority + circuit breaker |
| `Services/Distributors/*Adapter.php` | Per-vendor HTTP client |
| `Services/PaymentService.php` | charge() + refund() methods |
| `Models/DistributorHealth.php` | Persistent circuit state |
| `Http/Controllers/Api/MarketplaceController.php` | Glue: validates, orchestrates, responds |
| `Http/Requests/PlaceOrderRequest.php` | Input validation + normalisation |
| `Http/Resources/DigitalOrderResource.php` | Response shape (bilingual) |
| `Notifications/OrderConfirmationNotification.php` | Email + SMS on success |

---

## Design decisions

**Why adapters, not a single "if brand = X then" switch?**
Each vendor has its own auth scheme (X-Api-Key, Bearer, OAuth 2.0),
request/response format, and error model. Pushing the abstraction to the
interface level keeps `MarketplaceController` clean and makes adding a
new vendor a one-file task.

**Why circuit breaker in the database, not in-memory?**
Dawri runs multiple PHP-FPM workers. In-memory state (APCu, static
properties) would mean each worker has its own view of vendor health —
one worker could hammer a down endpoint while another has marked it open.
Shared DB state means the first worker to see 3 failures opens the
circuit for ALL workers.

**Why charge-first, fulfil-second (with refund on fail) instead of the
reverse?**
If we charged only after successful fulfilment, the user could get a
card code while the charge silently fails for a minute-later chargeback.
Charging first means we never hand out a code we haven't been paid for.
The 5-line refund code is cheaper than the fraud risk of the alternative.

**Why PowerShell for the palette sweep, not a Node script or SCSS mixin?**
Jithin's dev environment is Windows + XAMPP. PowerShell is native, no
extra dependencies, idempotent, and dry-runnable. A Node script would
add another thing to install. A global SCSS mixin would require
refactoring component `:host` blocks to use it — more invasive than a
one-shot hex-value sweep.
