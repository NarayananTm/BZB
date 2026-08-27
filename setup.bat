@echo off
REM BZB Platform - Quick Setup Script (Windows)
REM This script automates the initial setup

echo.
echo 🚀 BZB Platform - Initialization Script
echo ========================================
echo.

REM Check Node.js version
echo ✓ Checking Node.js version...
node -v

REM Check npm version
echo ✓ Checking npm version...
npm -v

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🔍 Running TypeScript check...
call npm run type-check

echo.
echo ✨ Setup complete!
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Visit: http://localhost:3000
echo 3. Read: PROJECT_SUMMARY.md for next steps
echo.
echo Happy coding! 🎉
pause
