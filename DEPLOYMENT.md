# CareerAI Deployment Guide

## 🌐 Current Production URLs

**Live Application URLs:**
- **Frontend**: https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app/
- **Backend API**: https://careerai-backend-83ct.onrender.com
- **API Health Check**: https://careerai-backend-83ct.onrender.com/api/health

These URLs are already configured and working in production. For local development, use `localhost` URLs as specified in `.env.example` files.

---

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for database)
- Groq API key

### Step 1: Prepare Your Repository

1. **Commit all changes:**
```bash
git add .
git commit -m "Enhanced UI for hackathon submission"
git push origin main
```

### Step 2: Deploy Frontend (Vercel)

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure Build Settings:**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://careerai-backend-83ct.onrender.com/api
   ```
   
   > **Note**: Current production value is `https://careerai-backend-83ct.onrender.com/api`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live at `https://your-project.vercel.app`

### Step 3: Deploy Backend (Render/Railway)

#### Option A: Deploy to Render

1. **Go to Render Dashboard:**
   - Visit https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service:**
   ```
   Name: careerai-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://your-username:password@cluster.mongodb.net/careerai
   GROQ_API_KEY=your-groq-api-key
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   FRONTEND_URL=https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app
   NODE_ENV=production
   ```
   
   > **Note**: Current production FRONTEND_URL is `https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL (e.g., `https://careerai-backend.onrender.com`)

#### Option B: Deploy to Railway

1. **Go to Railway:**
   - Visit https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure:**
   ```
   Root Directory: backend
   Start Command: npm start
   ```

3. **Add Environment Variables:**
   Same as Render above

### Step 4: Update Frontend with Backend URL

1. **Update Vercel Environment Variable:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Update `REACT_APP_API_URL` with your backend URL
   - Redeploy

### Step 5: Configure CORS

Update `backend/src/index.ts` CORS settings:

```typescript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000' // Keep for local development
  ],
  credentials: true
}));
```

Commit and push this change to trigger a new backend deployment.

### Step 6: MongoDB Atlas Setup

1. **Create Cluster:**
   - Go to https://cloud.mongodb.com
   - Create a free cluster
   - Create a database user
   - Add `0.0.0.0/0` to IP whitelist (for production, restrict this)

2. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this as `MONGODB_URI` in your backend environment variables

### Step 7: Get Groq API Key

1. **Sign up at Groq:**
   - Visit https://console.groq.com
   - Sign up/Login
   - Navigate to API Keys
   - Create a new API key
   - Use this as `GROQ_API_KEY` in your backend environment variables

## 📦 Alternative: Deploy Both on Railway

Railway can host both frontend and backend:

1. **Deploy Backend:**
   - Create new project from GitHub repo
   - Set root directory to `backend`
   - Add environment variables
   - Deploy

2. **Deploy Frontend:**
   - Add new service to same project
   - Set root directory to `frontend`
   - Add build command: `npm run build && npm install -g serve`
   - Set start command: `serve -s build -l $PORT`
   - Add environment variable with backend URL
   - Deploy

## 🔧 Environment Variables Summary

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerai
GROQ_API_KEY=gsk_your_groq_api_key
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

## ✅ Post-Deployment Checklist

- [ ] Frontend is accessible and loads correctly
- [ ] Backend API is responding (test: `https://your-backend-url.com/api/health`)
- [ ] CORS is configured correctly
- [ ] MongoDB connection is working
- [ ] Groq API integration is working
- [ ] All pages are responsive on mobile/tablet/desktop
- [ ] Resume upload works
- [ ] Mock interview generates questions
- [ ] Skill gap analysis runs
- [ ] Job recommendations load
- [ ] History page shows data

## 🎯 Quick Test Commands

Test backend health:
```bash
curl https://your-backend-url.com/api/health
```

Test API endpoint:
```bash
curl https://your-backend-url.com/api/jobs
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check CORS configuration
- Verify `REACT_APP_API_URL` environment variable
- Check browser console for errors

### Backend crashes on startup
- Verify MongoDB connection string
- Check Groq API key is valid
- Review deployment logs

### 502/504 Gateway Errors
- Check backend is running
- Verify environment variables are set
- Restart backend service

### API calls fail with 401
- Check JWT_SECRET is set
- Verify token generation/validation

## 🌟 Performance Optimization

1. **Enable caching:**
   - Add cache headers for static assets
   - Use CDN for images

2. **Optimize bundle size:**
   - Frontend already uses code splitting
   - Enable gzip compression

3. **Database indexing:**
   - Add indexes to frequently queried fields in MongoDB

## 📊 Monitoring

1. **Vercel Analytics:**
   - Enable in project settings
   - Monitor page views and performance

2. **Backend Monitoring:**
   - Use Render/Railway built-in metrics
   - Set up error logging (e.g., Sentry)

3. **Database Monitoring:**
   - Use MongoDB Atlas performance advisor
   - Monitor query performance

## 🎉 You're Live!

Share your project:
- Frontend: `https://your-project.vercel.app`
- API: `https://your-backend.onrender.com`

---

**Need help?** Check the deployment platform docs:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
