@echo off

cd /d %~dp0
node scraping.js "https://www.google.co.jp/"

pause