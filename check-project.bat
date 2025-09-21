@echo off
echo Checking Firebase Project Configuration...
echo.
echo Looking for .env file...
if exist .env (
    echo ✅ .env file found
    echo.
    echo Current .env contents:
    type .env
    echo.
    echo Expected PROJECT_ID: fabtech-cb5c4
    findstr "REACT_APP_FIREBASE_PROJECT_ID" .env
) else (
    echo ❌ .env file NOT found!
    echo You need to create .env file with your Firebase config
)
echo.
pause
