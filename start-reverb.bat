@echo off
cd /d "%~dp0"
php backend/artisan reverb:start --port=8080
