@echo off
cd /d "%~dp0"
start "Laravel API" cmd /k "php backend/artisan serve --host=192.168.100.67 --port=8001"
start "Angular Frontend" cmd /k "npm --prefix frontend run start -- --host 0.0.0.0 --port 4300 --disable-host-check"
start "Laravel Reverb" cmd /k "php backend/artisan reverb:start --port=8080"
