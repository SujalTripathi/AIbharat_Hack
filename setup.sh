#!/bin/bash

# CareerAI Setup Script
# This script automates the setup process for both backend and frontend

echo "🚀 CareerAI Setup Script"
echo "========================"
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your credentials:"
    echo "   - MONGODB_URI"
    echo "   - GROQ_API_KEY (get from https://console.groq.com)"
    echo ""
fi

echo "📥 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
fi

echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create uploads directory
echo ""
echo "📁 Creating uploads directory..."
mkdir -p backend/uploads
echo "✅ Uploads directory created"

echo ""
echo "✨ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit backend/.env with your MongoDB URI and Groq API key"
echo "2. Start MongoDB (if running locally)"
echo "3. Run 'cd backend && npm run dev' to start the backend"
echo "4. Run 'cd frontend && npm start' to start the frontend"
echo "5. Visit http://localhost:3000"
echo ""
echo "📚 Read QUICKSTART.md for detailed instructions"
echo ""
echo "Happy job hunting! 🎯"
