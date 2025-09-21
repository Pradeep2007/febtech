@echo off
echo Testing Build Process...
echo.
echo Step 1: Checking environment variables...
if exist .env (
    echo ✅ .env file found
) else (
    echo ❌ .env file missing - this might cause build issues
)
echo.
echo Step 2: Installing dependencies...
call npm install
echo.
echo Step 3: Running build...
call npm run build
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo Your app is ready for deployment.
) else (
    echo ❌ Build failed with error code %ERRORLEVEL%
    echo Check the error messages above.
)
echo.
pause
