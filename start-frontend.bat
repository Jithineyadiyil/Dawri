@echo off
cd /d "%~dp0"
npm --prefix frontend run start -- --host 0.0.0.0 --port 4300 --disable-host-check
