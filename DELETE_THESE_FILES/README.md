# Files to delete (cleanup — bugs 1 & 2)

Delete these three files from your backend. They're orphans from earlier
development: duplicate copies of `LikecardService.php` in the wrong namespace,
plus a routes paste-buffer that was never integrated.

## ⚠️ Delete these

```
D:\xamp new\htdocs\Dawri\backend\app\Http\Controllers\Api\LikecardService.php
D:\xamp new\htdocs\Dawri\backend\app\Http\Controllers\Api\LikecardService (1).php
D:\xamp new\htdocs\Dawri\backend\routes\api_marketplace.php
```

## Why

**`LikecardService.php` in `Http\Controllers\Api`**
The real `LikecardService` lives in `app/Services/LikecardService.php` (correct
namespace). The copies in `Http\Controllers\Api` declare the same class name
under a different namespace — Laravel's autoloader will pick up whichever comes
first in the classmap, creating subtle bugs. This Sprint's work is migrating
`LikecardService` into the new `App\Services\Distributors\LikecardAdapter` class
anyway, so the real old file will be replaced, and the orphans should just go.

**`LikecardService (1).php`**
Byte-identical copy of the above — likely a Windows "copy-paste" duplicate
from when the file was moved. Pure dead code.

**`routes/api_marketplace.php`**
The first line of this file is a comment:
```php
// Add inside Route::prefix('v1')->middleware('auth:sanctum') group in routes/api.php
```
It was never loaded as a real routes file — it's a paste buffer. The actual
marketplace routes already live in `routes/api.php` (lines 43, 83-85), so this
file serves no purpose.

## How to verify the deletion is safe

```cmd
cd /D "D:\xamp new\htdocs\Dawri\backend"
findstr /S /I /L "LikecardService" app\Http\Controllers\*.php
```

Should return no hits — if it does, there's a `use App\Http\Controllers\Api\LikecardService`
somewhere that needs updating to `use App\Services\LikecardService` (or the
new `App\Services\Distributors\LikecardAdapter`) before you delete.

Also check the routes:

```cmd
findstr /S /I /L "api_marketplace" routes\*.php bootstrap\*.php config\*.php
```

Should also return no hits. If it does, the orphan file is being loaded
somewhere — that `require`/`include` needs to be removed first.
