@echo off
REM CareerAI Setup Script for Windows
REM This script automates the setup process for both backend and frontend

echo.
echo 🚀 CareerAI Setup Script
echo ========================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend

if not exist ".env" (
    echo 📝 Creating backend .env file...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env with your credentials:
    echo    - MONGODB_URI
    echo    - GROQ_API_KEY (get from https://console.groq.com)
    echo.
)

echo 📥 Installing backend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo ✅ Backend dependencies installed successfully
) else (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)

cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend

if not exist ".env" (
    echo 📝 Creating frontend .env file...
    copy .env.example .env
)

echo 📥 Installing frontend dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo ✅ Frontend dependencies installed successfully
) else (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

cd ..

REM Create uploads directory
echo.
echo 📁 Creating uploads directory...
if not exist "backend\uploads" mkdir backend\uploads
echo ✅ Uploads directory created

echo.
echo ✨ Setup Complete!
echo.
echo 📋 Next Steps:
echo 1. Edit backend\.env with your MongoDB URI and Groq API key
echo 2. Start MongoDB (if running locally)
echo 3. Run 'cd backend && npm run dev' to start the backend
echo 4. Run 'cd frontend && npm start' to start the frontend
echo 5. Visit http://localhost:3000
echo.
echo 📚 Read QUICKSTART.md for detailed instructions
echo.
echo Happy job hunting! 🎯
pause
