@echo off

cd /d %~dp0
node scraping_sample.js "https://www.google.co.jp/"

pause