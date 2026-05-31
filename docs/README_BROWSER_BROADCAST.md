# Dawri — Browser Broadcast (Sprint 6)

Browser-based "Go Live" for organizers and admins. No OBS install,
no streaming knowledge required — click a button, grant camera/screen
permission, and Dawri's official YouTube channel goes live.

## Architecture in 30 seconds

```
Streamer's browser            Dawri (Laravel)              Mux Live              YouTube
─────────────────             ───────────────              ────────              ───────
getUserMedia /                                                                    
getDisplayMedia                                                                   
        │                                                                          
        │  1. POST /browser-session                                                
        │ ─────────────────────────►                                                
        │                            2. Create Mux live stream                    
        │                            ──────────────────────────►                  
        │                            3. Add YouTube simulcast target              
        │                            ──────────────────────────►                  
        │                            4. WHIP URL + playback URL                    
        │  ◄─────────────────────────                                              
        │                                                                          
        │  5. WHIP POST SDP offer (WebRTC)                                          
        │ ──────────────────────────────────────────────►                          
        │                                                                          
        │  6. WebRTC media flow ─────────────────────────►                          
        │                                                  7. Mux transcodes      
        │                                                     & forwards via RTMP  
        │                                                  ────────────────────►  
        │                                                                Dawri's   
        │                                                                channel   
        │                                                                live      
```

## Two-bridge pattern (cost insurance)

The streaming bridge sits behind `App\Services\Streaming\Contracts\StreamingBridgeInterface`.
Today the only implementation is `MuxBridge`. When/if Mux becomes too
expensive at scale, you can write `FfmpegBridge` (self-hosted, zero
per-broadcast cost) and swap the binding in
`StreamingBridgeServiceProvider::register()` — no other code changes.

## Cost reality check

| Phase | Mux cost | Notes |
|---|---|---|
| **Development on XAMPP** | $0 | `MUX_TEST_MODE=true` creates free test streams |
| **Production, ~30 matches/month, 2h each** | ~$92/month | $0.0055/min encode + $0.020/min YouTube simulcast |
| **If you migrate to self-hosted ffmpeg later** | $0 incremental | Costs only your VPS bill |

## File layout

```
backend/
├─ app/
│  ├─ Services/Streaming/
│  │  ├─ Contracts/StreamingBridgeInterface.php
│  │  ├─ Bridges/MuxBridge.php
│  │  ├─ Clients/MuxClient.php
│  │  ├─ DTOs/  (session + Mux response)
│  │  ├─ Exceptions/StreamingBridgeException.php
│  │  └─ BrowserBroadcastService.php
│  ├─ Http/
│  │  ├─ Controllers/Api/BrowserBroadcastController.php
│  │  ├─ Controllers/Api/Webhooks/MuxWebhookController.php
│  │  ├─ Requests/CreateBrowserSessionRequest.php
│  │  └─ Resources/BrowserBroadcastSessionResource.php
│  └─ Providers/StreamingBridgeServiceProvider.php
├─ config/services.streaming.php  ← merge into config/services.php
├─ database/migrations/2026_05_20_140000_add_browser_fields_to_live_broadcasts.php
├─ routes/api.streaming.php        ← append to existing
└─ tests/
   ├─ Unit/{MuxClient,MuxBridge,BrowserBroadcastService}Test.php
   └─ Feature/BrowserBroadcastApiTest.php

frontend/src/app/features/streaming/browser-broadcast/
├─ browser-broadcast.component.ts       (standalone, OnPush, signals)
├─ browser-broadcast.service.ts         (HttpClient wrapper)
├─ browser-broadcast.model.ts           (TypeScript types)
├─ whip-client.ts                       (minimal WHIP/WebRTC publisher)
├─ media-capture.service.ts             (getUserMedia + PIP composition)
├─ source-picker/source-picker.component.ts
├─ browser-broadcast.component.spec.ts
└─ whip-client.spec.ts
```

## Install order

See `INSTALLATION_INSTRUCTIONS.md` for the step-by-step. The short version:

1. Copy files into `D:\xamp new\htdocs\Dawri\backend\` and `frontend\` mirroring the structure above
2. Append the `.env` block, then `php artisan config:clear`
3. Merge the new entries into `config/services.php`
4. Apply the small repository + model patches in `app/Repositories_PATCH_INSTRUCTIONS.php`
5. Register `StreamingBridgeServiceProvider` in `bootstrap/providers.php`
6. Append the routes from `routes/api.streaming.php` (read the comments for the webhook route placement)
7. `php artisan migrate`
8. `php artisan test --filter=Mux` and `--filter=BrowserBroadcast`
9. Sign up at https://www.mux.com → API Access → copy Token ID + Secret into `.env`
10. Wire `<app-browser-broadcast [broadcastId]="...">` into your `broadcast-controls` page (see `PATCH_INSTRUCTIONS.md.ts`)

## Quality gates

- PSR-12, SOLID, Repository + Service layer, API Resources, strict types — all enforced
- PHPDoc on every public method; JSDoc on every TS export
- 18 PHPUnit cases + 11 Jest cases shipped
- All Mux calls go through `MuxClient` so there's a single seam for stubbing
- Webhook signatures verified before any state mutation (defense-in-depth: no secret configured ⇒ all webhooks rejected)
- Authorization in the Service layer; players cannot publish to Dawri's official channel (brand safety)

## Documentation block

| Field | Detail |
|---|---|
| Purpose | Let admins/organizers broadcast to Dawri's YouTube channel without OBS |
| Inputs | A LiveBroadcast UUID + an authenticated admin or tournament organizer |
| Outputs | A `BrowserBroadcastSession` (WHIP URL, playback URL, watch URL) |
| Edge cases | Player attempting to broadcast → 403; missing YouTube provisioning → auto-provisioned; brief disconnection → Mux `reconnect_window=60s`; Mux API down → 503 to the browser with retry-able error |
| Test Strategy | PHPUnit Unit (MuxClient, MuxBridge, BrowserBroadcastService), PHPUnit Feature (API), Jest (component + WHIP client), manual E2E via ngrok + Mux test streams |
| Standards | PSR-12 · SOLID · Angular Style Guide · OpenAPI-ready · WHIP draft-ietf-wish-whip |
