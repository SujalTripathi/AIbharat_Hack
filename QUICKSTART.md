# CareerAI - Quick Start Guide

## Prerequisites
- Node.js 18+
- MongoDB
- Groq API Key

## 1️⃣ Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# - MONGODB_URI (your MongoDB connection string)
# - GROQ_API_KEY (from https://console.groq.com)

# Start backend
npm run dev
```

Backend runs on: `http://localhost:5000`

## 2️⃣ Frontend Setup (3 minutes)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm start
```

Frontend runs on: `http://localhost:3000`

## 3️⃣ Seed Sample Data

```bash
# Seed 50+ sample jobs
curl -X POST http://localhost:5000/api/jobs/seed
```

## 4️⃣ Start Using CareerAI

1. **Upload Resume**
   - Go to Resume Checker
   - Upload your PDF resume
   - Get instant ATS score

2. **Practice Interview**
   - Go to Mock Interview
   - Enter job role
   - Answer questions and get feedback

3. **Analyze Skills**
   - Go to Skill Gap
   - Select target job
   - Get learning recommendations

4. **Find Jobs**
   - Go to Job Match
   - View AI-matched opportunities

## 🚀 Deployment

### Vercel (Frontend)
```bash
cd frontend
vercel
```

### Railway (Backend)
```bash
cd backend
railway up
```

## 🔑 Get Groq API Key (Free)

1. Visit: https://console.groq.com
2. Sign up (free)
3. Create API key
4. Add to `.env` file

## 💡 Tips

- Use real resumes for best results
- Answer interview questions in detail
- Check History page to track progress
- Keep your resume updated

## ❓ Need Help?

- Backend not working? Check MongoDB connection
- Frontend not connecting? Verify REACT_APP_API_URL
- AI not responding? Check GROQ_API_KEY

---

**Happy Job Hunting! 🎯**
