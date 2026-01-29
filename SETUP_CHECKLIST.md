# 🎯 CareerAI - Setup Checklist

Use this checklist to ensure everything is properly configured.

## ☑️ Prerequisites

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running (local) OR MongoDB Atlas account
- [ ] Groq account created at https://console.groq.com
- [ ] Git installed (optional, for version control)

## ☑️ Initial Setup

### Option 1: Automated (Recommended)
- [ ] Run `./setup.sh` (Linux/Mac) or `setup.bat` (Windows)

### Option 2: Manual
- [ ] Navigate to `/backend` directory
- [ ] Run `npm install` in backend
- [ ] Copy `.env.example` to `.env` in backend
- [ ] Navigate to `/frontend` directory
- [ ] Run `npm install` in frontend
- [ ] Copy `.env.example` to `.env` in frontend

## ☑️ Backend Configuration

Edit `backend/.env` file:

- [ ] Set `PORT` (default: 5000)
- [ ] Set `MONGODB_URI`
  - [ ] Local: `mongodb://localhost:27017/careerai`
  - [ ] Atlas: Your connection string
- [ ] Set `JWT_SECRET` (any random string)
- [ ] Set `GROQ_API_KEY` (from Groq console)
- [ ] Set `FRONTEND_URL` (default: http://localhost:3000)
- [ ] Set `MAX_FILE_SIZE` (default: 5242880)

## ☑️ Frontend Configuration

Edit `frontend/.env` file:

- [ ] Set `REACT_APP_API_URL` (default: http://localhost:5000/api)

## ☑️ MongoDB Setup

Choose one:

### Local MongoDB
- [ ] Install MongoDB Community Edition
- [ ] Start MongoDB service: `mongod`
- [ ] Verify connection: `mongo` or `mongosh`

### MongoDB Atlas (Cloud)
- [ ] Create account at https://mongodb.com/atlas
- [ ] Create free cluster
- [ ] Get connection string
- [ ] Whitelist your IP (0.0.0.0/0 for development)
- [ ] Create database user
- [ ] Update `MONGODB_URI` in backend/.env

## ☑️ Groq API Setup

- [ ] Visit https://console.groq.com
- [ ] Sign up for free account
- [ ] Navigate to API Keys section
- [ ] Create new API key
- [ ] Copy key to `GROQ_API_KEY` in backend/.env

## ☑️ Start Backend

- [ ] Open terminal
- [ ] Navigate to `backend` directory: `cd backend`
- [ ] Start development server: `npm run dev`
- [ ] Verify server running at http://localhost:5000
- [ ] Test health endpoint: `curl http://localhost:5000/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "CareerAI API is running"
}
```

## ☑️ Start Frontend

- [ ] Open NEW terminal
- [ ] Navigate to `frontend` directory: `cd frontend`
- [ ] Start development server: `npm start`
- [ ] Browser opens automatically at http://localhost:3000
- [ ] Verify app loads without errors

## ☑️ Seed Sample Data

- [ ] Backend must be running
- [ ] Run: `curl -X POST http://localhost:5000/api/jobs/seed`
- [ ] Verify 5+ jobs added successfully

Response should show:
```json
{
  "success": true,
  "message": "5 sample jobs added"
}
```

## ☑️ Test Features

### 1. Resume Checker
- [ ] Navigate to "Resume Checker" page
- [ ] Enter test email: test@example.com
- [ ] Upload a PDF resume (max 5MB)
- [ ] Verify upload success message
- [ ] Wait for AI analysis (~5-10 seconds)
- [ ] Check ATS score displayed (0-100)
- [ ] Review suggestions and improvements

### 2. Mock Interview
- [ ] Navigate to "Mock Interview" page
- [ ] Enter job role: "Frontend Developer"
- [ ] Select experience level: "Mid Level"
- [ ] Click "Start Interview"
- [ ] Verify 5 questions generated
- [ ] Answer first question (at least 50 words)
- [ ] Click "Submit Answer"
- [ ] Verify score (0-10) received
- [ ] Check detailed feedback
- [ ] Complete all questions
- [ ] Review overall score

### 3. Skill Gap Analyzer
- [ ] Ensure resume uploaded first
- [ ] Navigate to "Skill Gap" page
- [ ] Select a target job from dropdown
- [ ] Click "Analyze Skill Gap"
- [ ] Wait for AI analysis (~5-10 seconds)
- [ ] Verify match percentage displayed
- [ ] Check current skills listed
- [ ] Check missing skills identified
- [ ] Review learning recommendations

### 4. Job Recommendations
- [ ] Ensure resume uploaded first
- [ ] Navigate to "Job Match" page
- [ ] Wait for recommendations to load (~10-20 seconds)
- [ ] Verify jobs displayed with match %
- [ ] Check match reasons
- [ ] Expand a job for more details
- [ ] Review interview tips

### 5. History
- [ ] Navigate to "History" page
- [ ] Verify stats displayed correctly
- [ ] Check "Resume Analyses" tab
- [ ] Check "Interview Sessions" tab
- [ ] Check "Skill Gap Reports" tab
- [ ] Verify past activities shown

## ☑️ Troubleshooting

### Backend won't start
- [ ] Check MongoDB is running: `mongosh` or `mongo`
- [ ] Verify `.env` file exists in backend/
- [ ] Check port 5000 is not in use: `lsof -i :5000`
- [ ] Check for errors in terminal
- [ ] Verify all environment variables set

### Frontend won't start
- [ ] Check backend is running first
- [ ] Verify `.env` file exists in frontend/
- [ ] Check port 3000 is not in use
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules and reinstall

### Cannot connect to backend
- [ ] Verify backend running at http://localhost:5000
- [ ] Check CORS settings in backend/server.js
- [ ] Verify `REACT_APP_API_URL` in frontend/.env
- [ ] Check browser console for errors
- [ ] Test API directly: `curl http://localhost:5000/api/health`

### PDF upload fails
- [ ] Ensure file is PDF format
- [ ] Check file size (must be < 5MB)
- [ ] Verify uploads directory exists: `backend/uploads/`
- [ ] Check file permissions
- [ ] Review backend terminal for errors

### AI not responding
- [ ] Verify `GROQ_API_KEY` is correct
- [ ] Check Groq API status: https://status.groq.com
- [ ] Verify not hitting rate limits (30/min free tier)
- [ ] Check backend terminal for AI service errors
- [ ] Test with simpler prompts

### MongoDB connection issues
- [ ] Verify MongoDB service running
- [ ] Check `MONGODB_URI` format
- [ ] For Atlas: verify IP whitelist
- [ ] Check database user credentials
- [ ] Test connection: `mongosh "your_connection_string"`

## ☑️ Deployment (Optional)

### Deploy Backend to Railway
- [ ] Create Railway account
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Navigate to backend: `cd backend`
- [ ] Login: `railway login`
- [ ] Initialize: `railway init`
- [ ] Add environment variables in Railway dashboard
- [ ] Deploy: `railway up`
- [ ] Get deployed URL
- [ ] Update frontend `REACT_APP_API_URL`

### Deploy Frontend to Vercel
- [ ] Create Vercel account
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Navigate to frontend: `cd frontend`
- [ ] Deploy: `vercel`
- [ ] Follow prompts
- [ ] Add environment variables
- [ ] Deploy to production: `vercel --prod`

## ☑️ Production Checklist

Before going live:

- [ ] Update all `.env` files with production values
- [ ] Use production MongoDB database
- [ ] Secure JWT_SECRET (use long random string)
- [ ] Enable HTTPS
- [ ] Set up domain names
- [ ] Configure CORS for production domains
- [ ] Add rate limiting
- [ ] Set up monitoring/logging
- [ ] Create backups strategy
- [ ] Add authentication/authorization
- [ ] Review security best practices

## ☑️ Documentation Review

- [ ] Read README.md for complete overview
- [ ] Check QUICKSTART.md for setup steps
- [ ] Review API_DOCS.md for API reference
- [ ] Read PROJECT_SUMMARY.md for project details

## 🎉 Success Indicators

If all working correctly, you should see:

✅ Backend running on http://localhost:5000
✅ Frontend running on http://localhost:3000
✅ MongoDB connected successfully
✅ API health check returns 200 OK
✅ Resume upload works
✅ AI analysis completes in <10 seconds
✅ Interview questions generate successfully
✅ Job recommendations appear
✅ History page shows all activities

## 🆘 Getting Help

If stuck:

1. Check terminal/console for errors
2. Review error messages carefully
3. Verify all checklist items completed
4. Check MongoDB and Groq API status
5. Try restarting servers
6. Clear cache and reinstall dependencies
7. Review documentation files
8. Check environment variables

## 📝 Notes

- Keep terminals open while developing
- Backend must run before frontend
- Seed jobs before testing job features
- Use real resumes for best AI results
- Free Groq tier: 30 requests/minute
- MongoDB Atlas free tier: 512MB storage

---

**Happy building! 🚀**

Once all items checked, you're ready to use CareerAI!
