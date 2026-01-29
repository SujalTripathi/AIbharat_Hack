# CareerAI API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API uses a simple user ID system stored in localStorage. JWT authentication can be added for production.

---

## 📄 Resume Endpoints

### Upload Resume
Upload and parse a PDF resume.

**Endpoint:** `POST /api/resume/upload`

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `resume` (file): PDF file (max 5MB)
  - `email` (string): User email

**Response:**
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "userId": "60d5ec49f1b2c8b9d8e9f1a1",
    "skills": ["JavaScript", "React", "Node.js"],
    "email": "user@example.com"
  }
}
```

### Analyze Resume
Get ATS score and AI-powered suggestions.

**Endpoint:** `POST /api/resume/analyze`

**Request:**
```json
{
  "userId": "60d5ec49f1b2c8b9d8e9f1a1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "atsScore": 85,
    "analysis": {
      "keywordMatches": ["React", "TypeScript"],
      "missingKeywords": ["AWS", "Docker"],
      "formatting": {
        "score": 80,
        "issues": ["Use bullet points"]
      },
      "content": {
        "score": 85,
        "strengths": ["Clear experience section"],
        "weaknesses": ["Missing quantifiable achievements"]
      }
    },
    "suggestions": [
      "Add more quantifiable achievements",
      "Include cloud platform experience"
    ],
    "improvedSections": {
      "summary": "Improved professional summary...",
      "experience": "Enhanced bullet points..."
    }
  }
}
```

### Get Resume History
Retrieve past resume analyses for a user.

**Endpoint:** `GET /api/resume/history/:userId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c8b9d8e9f1a2",
      "atsScore": 85,
      "createdAt": "2026-01-29T10:30:00.000Z"
    }
  ]
}
```

---

## 💬 Interview Endpoints

### Generate Questions
Generate role-specific interview questions.

**Endpoint:** `POST /api/interview/questions`

**Request:**
```json
{
  "jobRole": "Frontend Developer",
  "experienceLevel": "mid",
  "count": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobRole": "Frontend Developer",
    "questions": [
      {
        "question": "Explain the virtual DOM in React",
        "type": "technical",
        "difficulty": "medium"
      }
    ]
  }
}
```

### Evaluate Answer
Get AI feedback on an interview answer.

**Endpoint:** `POST /api/interview/evaluate`

**Request:**
```json
{
  "question": "Explain React hooks",
  "answer": "Hooks are functions that let you use state and lifecycle features...",
  "jobRole": "Frontend Developer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 8,
    "strengths": ["Clear explanation", "Good examples"],
    "improvements": ["Add more advanced use cases"],
    "feedback": "Strong answer with room for improvement...",
    "suggestedAnswer": "Enhanced version of the answer..."
  }
}
```

### Save Interview Session
Save completed interview session.

**Endpoint:** `POST /api/interview/save`

**Request:**
```json
{
  "userId": "60d5ec49f1b2c8b9d8e9f1a1",
  "jobRole": "Frontend Developer",
  "questions": [
    {
      "question": "Explain hooks",
      "answer": "User's answer",
      "score": 8,
      "feedback": "Good answer"
    }
  ],
  "jobId": "60d5ec49f1b2c8b9d8e9f1a3"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resultId": "60d5ec49f1b2c8b9d8e9f1a4",
    "overallScore": 75,
    "strengths": ["Technical knowledge"],
    "improvements": ["Communication skills"]
  }
}
```

---

## 💼 Job Endpoints

### Get All Jobs
Retrieve all active job listings.

**Endpoint:** `GET /api/jobs`

**Query Parameters:**
- `type` (optional): Filter by job type (Full-time, Internship, etc.)
- `search` (optional): Search in title, description, or company

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ec49f1b2c8b9d8e9f1a5",
      "title": "Frontend Developer",
      "company": "TechCorp",
      "description": "We are looking for...",
      "skills": ["React", "TypeScript"],
      "salary": "$80,000 - $120,000",
      "location": "Remote",
      "type": "Full-time"
    }
  ]
}
```

### Get Job Recommendations
Get AI-matched job recommendations.

**Endpoint:** `POST /api/jobs/recommendations`

**Request:**
```json
{
  "userId": "60d5ec49f1b2c8b9d8e9f1a1"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "job": {
        "id": "60d5ec49f1b2c8b9d8e9f1a5",
        "title": "Frontend Developer",
        "company": "TechCorp",
        "skills": ["React", "TypeScript"]
      },
      "matchPercentage": 85,
      "reasons": [
        "Strong React skills match",
        "TypeScript experience aligns"
      ],
      "concerns": ["May need more backend experience"],
      "interviewTips": [
        "Prepare React optimization examples",
        "Review TypeScript advanced types"
      ]
    }
  ]
}
```

---

## 📊 Skill Gap Endpoints

### Analyze Skill Gap
Compare user skills with job requirements.

**Endpoint:** `POST /api/skill-gap/analyze`

**Request:**
```json
{
  "userId": "60d5ec49f1b2c8b9d8e9f1a1",
  "jobId": "60d5ec49f1b2c8b9d8e9f1a5"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "currentSkills": ["React", "JavaScript"],
    "requiredSkills": ["React", "TypeScript", "AWS"],
    "missingSkills": ["TypeScript", "AWS"],
    "matchPercentage": 67,
    "recommendations": [
      {
        "skill": "TypeScript",
        "resources": [
          "TypeScript Official Docs",
          "TypeScript Deep Dive"
        ],
        "estimatedTime": "2-3 weeks",
        "priority": "High"
      }
    ]
  }
}
```

---

## 👤 User Endpoints

### Create User
Create or retrieve existing user.

**Endpoint:** `POST /api/user/create`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "60d5ec49f1b2c8b9d8e9f1a1",
    "email": "user@example.com",
    "isNew": true
  }
}
```

### Get User History
Get complete user activity history.

**Endpoint:** `GET /api/user/:userId/history`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d5ec49f1b2c8b9d8e9f1a1",
      "email": "user@example.com",
      "skills": ["React", "Node.js"]
    },
    "resumeAnalyses": [...],
    "interviews": [...],
    "skillGaps": [...],
    "stats": {
      "totalInterviews": 5,
      "averageInterviewScore": 75,
      "latestAtsScore": 85
    }
  }
}
```

---

## 🔧 Utility Endpoints

### Health Check
Check if API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "OK",
  "message": "CareerAI API is running"
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common Status Codes:**
- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found
- `500` - Server Error

---

## Rate Limits

Currently no rate limits. For production:
- Implement rate limiting (e.g., 100 requests/minute)
- Add API key authentication
- Monitor usage patterns

---

## Testing

### Using cURL

```bash
# Upload resume
curl -X POST http://localhost:5000/api/resume/upload \
  -F "resume=@resume.pdf" \
  -F "email=test@example.com"

# Get job recommendations
curl -X POST http://localhost:5000/api/jobs/recommendations \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID_HERE"}'
```

### Using Postman

Import the collection or manually test endpoints with:
1. Set base URL to `http://localhost:5000/api`
2. Add appropriate headers
3. Send requests with JSON body

---

**Need help?** Check the README or open an issue on GitHub.
