# Dawri Platform — Setup Guide

## Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+
- Node.js 18+ and npm
- Windows: XAMPP / standalone PHP

## Backend Setup

### 1. Create MySQL database
```sql
CREATE DATABASE dawri CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configure environment
```bash
# .env is already configured for local dev
# Only change DB_PASSWORD if your MySQL root has a password
```

### 3. Run migrations and seed
```bash
php artisan migrate
php artisan db:seed
```

### 4. Start the server
```bash
php artisan serve
# Runs on http://localhost:8000
```

## Frontend Setup

```bash
cd frontend
npm install
ng serve
# Runs on http://localhost:4200
# Automatically proxies /api → localhost:8000
```

## Test Accounts
| Email | Password | Role |
|---|---|---|
| organizer@dawri.gg | password | Organizer |
| player1@dawri.gg | password | Player |
| player2@dawri.gg | password | Player |
| (player3–16 same pattern) | password | Player |

## API Endpoints (all at /api/v1/)
| Method | URL | Auth | Purpose |
|---|---|---|---|
| POST | /auth/register | No | Create account |
| POST | /auth/login | No | Get Sanctum token |
| POST | /auth/logout | Yes | Revoke token |
| GET | /auth/me | Yes | Current user |
| POST | /auth/otp/send | No | Send SMS OTP |
| POST | /auth/otp/verify | No | Verify OTP |
| GET | /tournaments | No | List tournaments |
| GET | /tournaments/{id} | No | Tournament detail |
| POST | /tournaments | Yes | Create tournament |
| POST | /tournaments/{id}/register | Yes | Join tournament |
| POST | /tournaments/{id}/bracket | Yes | Generate bracket |
| GET | /marketplace/products | No | List products |
| POST | /marketplace/orders | Yes | Place order |
| POST | /marketplace/orders/{id}/reveal | Yes | Reveal code |
| GET | /wallet | Yes | Wallet balance |
| POST | /wallet/topup | Yes | Top up wallet |

## Troubleshooting

**"Could not open input file: artisan"**
→ You are not in the project root. Run `cd` to the folder containing `artisan`.

**"SQLSTATE table already exists"**
→ The migration has SET FOREIGN_KEY_CHECKS=0 and dropIfExists guards. Run:
```bash
php artisan migrate:fresh
php artisan db:seed
```

**"The route /api/v1/auth/login could not be found"**
→ Make sure Angular is running with the proxy:
```bash
ng serve   # proxy.conf.json is auto-loaded via angular.json
```

**"APP_KEY not set"**
```bash
php artisan key:generate
```
