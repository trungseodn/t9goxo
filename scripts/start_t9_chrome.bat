@echo off
title Khoi dong Chrome Muse Debugging cho T9 (Port 9229)
echo ========================================================
echo   ZTTeam: Khoi dong Google Chrome Remote Debugging Port 9229
echo   Dung rieng cho he thong t9.goxo.us (Doc lap, khong xung dot)
echo ========================================================
echo Dang mo Google Chrome tren Port 9229...
start "" "chrome.exe" --remote-debugging-port=9229 --user-data-dir="%LOCALAPPDATA%\Google\Chrome_Muse_T9" https://muse.ai
echo.
echo ========================================================
echo   Vui long dang nhap Muse.ai tren cua so Chrome vua mo.
echo   Sau khi dang nhap xong, chay file worker tuong ung!
echo ========================================================
pause
