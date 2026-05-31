# Setting up Mux for Dawri Browser Broadcast

## 1. Create a Mux account

1. Go to https://www.mux.com → **Sign up** (no credit card required to start)
2. Verify your email and complete the org details
3. You'll land in the Mux dashboard

## 2. Get API credentials

1. In the Mux dashboard, click **Settings** (gear icon, bottom-left) → **Access Tokens**
2. Click **Generate new token**
3. Permissions: tick **Mux Video — Read + Write** (do **not** tick anything else for now)
4. Environment: pick **Development**
5. Click **Generate token**
6. Copy the two values shown:
   - **Token ID** → put in `.env` as `MUX_TOKEN_ID`
   - **Token Secret** → put in `.env` as `MUX_TOKEN_SECRET`

> ⚠️ The secret is shown **once**. If you miss it, regenerate the token.

## 3. Webhook signing secret

1. In the Mux dashboard, **Settings** → **Webhooks**
2. Click **Create new webhook**
3. URL — see Section 4 below. For now, put any placeholder.
4. **Environment**: pick **Development**
5. After creation, click into the webhook → copy the **Signing Secret**
6. Put it in `.env` as `MUX_WEBHOOK_SECRET`

## 4. Expose your XAMPP server to the internet (for webhooks)

Since you're on XAMPP locally, Mux can't reach `localhost:8001` directly.
Use [ngrok](https://ngrok.com) to create a public tunnel:

```cmd
:: One-time install
choco install ngrok

:: Authenticate (free account — sign up at ngrok.com)
ngrok config add-authtoken YOUR_NGROK_TOKEN

:: Open a tunnel to your Laravel port
ngrok http 8001
```

ngrok prints something like:

```
Forwarding   https://1a2b-3c4d.ngrok-free.app -> http://localhost:8001
```

Go back to the Mux webhook config and set the URL to:

```
https://1a2b-3c4d.ngrok-free.app/api/v1/webhooks/mux
```

Click **Save**.

> Every restart of ngrok gets you a new URL. Update the Mux webhook each
> time, or upgrade to ngrok's paid tier ($8/mo) for a stable subdomain.

## 5. Verify the connection

Back on the Mux dashboard, click into your webhook and use **Send test
event**. Check your Laravel logs:

```cmd
cd D:\xamp new\htdocs\Dawri\backend
type storage\logs\laravel.log | findstr mux
```

You should see `mux.api.call` or `mux_webhook.status_synced` entries.

## 6. Confirm test mode is on

Open `.env` and confirm:

```env
MUX_TEST_MODE=true
```

In test mode, all live streams you create are **free**. They have a
10-minute maximum runtime per session (long enough for development) and
show a faint "TEST" watermark. No bills will accrue.

When you go to production, flip this to `false` and create a new
Production-environment Access Token in the Mux dashboard.

## 7. Smoke test from the API

```cmd
cd D:\xamp new\htdocs\Dawri\backend
php artisan tinker
```

```php
$client = app(\App\Services\Streaming\Clients\MuxClient::class);
$stream = $client->createLiveStream(['passthrough' => 'smoke-test']);
echo $stream->id . PHP_EOL;
echo $stream->streamKey . PHP_EOL;
echo $stream->isTest ? 'TEST MODE ✓' : 'PRODUCTION';
$client->deleteLiveStream($stream->id);
```

If you see an ID, a stream key, and `TEST MODE ✓` — you're set.

## 8. Production cutover (later)

When ready to deploy:

1. Create a **Production** Access Token in Mux
2. Add a credit card to Mux (required for live streaming)
3. Set `MUX_TEST_MODE=false`, swap to production token + secret
4. Create a separate **Production-environment** webhook
5. Point it at your production webhook URL (no ngrok needed)
6. Update `MUX_WEBHOOK_SECRET` accordingly
7. `php artisan config:clear`

Expect ~$3 per 2-hour match in production costs (encoding + YouTube
simulcast). Mux gives a $20 credit on first sign-up, good for ~6 matches
of free production testing.

## Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| `Mux 401: Bad token` | Wrong/missing creds | Double-check token ID + secret in `.env`; run `php artisan config:clear` |
| Webhook handler returns 401 | Bad signature header | Verify `MUX_WEBHOOK_SECRET` matches the webhook in Mux dashboard |
| Stream creates but no YouTube broadcast | Missing YouTube key | Confirm `LiveBroadcastService::ensureProvisioned()` ran successfully |
| WHIP POST returns 401 from Mux | Stream was deleted on Mux side | Restart the session — Mux GC's old test streams aggressively |
| ngrok URL changes every restart | Free tier behavior | Either update Mux webhook each time, or upgrade ngrok |
