# 🌐 CareerAI - Production Configuration

## Live URLs

### Frontend (Vercel)
- **URL**: https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app
- **Platform**: Vercel
- **Branch**: main
- **Environment**: Production

### Backend (Render)
- **URL**: https://careerai-backend-83ct.onrender.com
- **API Base**: https://careerai-backend-83ct.onrender.com/api
- **Health Check**: https://careerai-backend-83ct.onrender.com/api/health
- **Platform**: Render
- **Branch**: main
- **Environment**: Production

---

## 📝 Configuration Files Updated

### ✅ Frontend Configuration
1. **frontend/src/services/api.ts**
   - Default API URL: `https://careerai-backend-83ct.onrender.com/api`
   - Fallback to env variable if set

2. **frontend/.env.production**
   ```
   REACT_APP_API_URL=https://careerai-backend-83ct.onrender.com/api
   ```

3. **frontend/.env.example**
   - Updated with production URL

### ✅ Backend Configuration
1. **backend/server.js**
   - CORS origins:
     - `https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app`
     - `http://localhost:3000` (for local dev)

2. **backend/.env**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://sujaltripathi816_db_user:***@cluster0.gcsyxzd.mongodb.net/
   JWT_SECRET=***
   GROQ_API_KEY=gsk_***
   FRONTEND_URL=https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app
   ```

3. **backend/.env.example**
   - Updated with production URL pattern

---

## 🧪 Testing Endpoints

### Test Backend Health
```bash
curl https://careerai-backend-83ct.onrender.com/api/health
```

Expected Response:
```json
{
  "status": "OK",
  "message": "CareerAI API is running"
}
```

### Test Jobs API
```bash
curl https://careerai-backend-83ct.onrender.com/api/jobs
```

### Test CORS
```bash
curl -H "Origin: https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://careerai-backend-83ct.onrender.com/api/resume/analyze
```

---

## 🔄 Deployment Workflow

### Frontend (Vercel)
1. Push to `main` branch
2. Vercel auto-deploys
3. Build takes ~2 minutes
4. Live at: https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app

### Backend (Render)
1. Push to `main` branch
2. Render auto-deploys
3. Build takes ~3-5 minutes
4. Live at: https://careerai-backend-83ct.onrender.com

---

## ⚙️ Environment Variables (Vercel)

### Required
```
REACT_APP_API_URL=https://careerai-backend-83ct.onrender.com/api
```

### How to Update
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add/Update variables
5. Redeploy

---

## ⚙️ Environment Variables (Render)

### Required
```
PORT=5000
MONGODB_URI=mongodb+srv://...
GROQ_API_KEY=gsk_...
JWT_SECRET=...
FRONTEND_URL=https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app
NODE_ENV=production
```

### How to Update
1. Go to Render Dashboard
2. Select your service
3. Environment → Environment Variables
4. Update variables
5. Service auto-restarts

---

## 🔐 Security Notes

- ✅ CORS configured for production frontend only
- ✅ Environment variables secured
- ✅ API keys not exposed in frontend
- ✅ JWT authentication enabled
- ✅ MongoDB credentials secured

---

## 📊 Monitoring

### Vercel Analytics
- URL: https://vercel.com/dashboard/analytics
- Metrics: Page views, performance, vitals

### Render Metrics
- URL: https://dashboard.render.com
- Metrics: CPU, Memory, Response times

### MongoDB Atlas
- URL: https://cloud.mongodb.com
- Metrics: Operations, Connections, Storage

---

## 🚨 Important Notes

1. **Render Free Tier**: Service spins down after 15 min of inactivity
   - First request after idle may take 30-60 seconds
   - Consider upgrading for production use

2. **CORS**: Only allows requests from:
   - `https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app`
   - `http://localhost:3000` (development)

3. **API Rate Limits**: 
   - Groq: Check your plan limits
   - MongoDB Atlas: Free tier 512MB storage

4. **File Uploads**:
   - Max size: 5MB
   - Stored temporarily on Render
   - Cleared on service restart

---

## 🔄 To Redeploy

### If you make code changes:

```bash
# 1. Commit changes
git add .
git commit -m "Your change description"

# 2. Push to GitHub
git push origin main

# Both Vercel and Render will auto-deploy!
```

### Force redeploy without code changes:

**Vercel**: Dashboard → Deployments → Redeploy

**Render**: Dashboard → Manual Deploy → Deploy latest commit

---

## ✅ Checklist

- [x] Frontend deployed to Vercel
- [x] Backend deployed to Render
- [x] MongoDB Atlas connected
- [x] Groq API key configured
- [x] CORS configured correctly
- [x] Environment variables set
- [x] Health check endpoint working
- [x] Frontend can call backend APIs
- [x] Resume upload functional
- [x] Mock interview working
- [x] Skill gap analysis working
- [x] Job recommendations working

---

## 🎉 All Set!

Your CareerAI application is fully deployed and configured!

**Frontend**: https://a-ibharat-hack-git-main-sujaltripathis-projects.vercel.app

**Backend**: https://careerai-backend-83ct.onrender.com

---

Last Updated: January 29, 2026
