@echo off
cd /d "%~dp0"
php backend/artisan serve --host=192.168.100.67 --port=8001
