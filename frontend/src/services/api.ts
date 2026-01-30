import axios from 'axios';

// Production backend URL - Vercel doesn't use .env.production files
// Set REACT_APP_API_URL in Vercel dashboard to override this
const API_URL = process.env.REACT_APP_API_URL || 'https://careerai-backend-83ct.onrender.com/api';

console.log('🚀 API Base URL:', API_URL); // Debug log to verify URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  create: (email: string) => api.post('/user/create', { email }),
  getProfile: (userId: string) => api.get(`/user/${userId}`),
  getHistory: (userId: string) => api.get(`/user/${userId}/history`),
};

// Resume API
export const resumeAPI = {
  upload: (formData: FormData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  analyze: (userId: string) => api.post('/resume/analyze', { userId }),
  getHistory: (userId: string) => api.get(`/resume/history/${userId}`),
};

// Interview API
export const interviewAPI = {
  getQuestions: (jobRole: string, experienceLevel: string, count: number) =>
    api.post('/interview/questions', { jobRole, experienceLevel, count }),
  evaluateAnswer: (question: string, answer: string, jobRole: string) =>
    api.post('/interview/evaluate', { question, answer, jobRole }),
  saveSession: (data: any) => api.post('/interview/save', data),
  getHistory: (userId: string) => api.get(`/interview/history/${userId}`),
};

// Jobs API
export const jobsAPI = {
  getAll: (params?: any) => api.get('/jobs', { params }),
  getById: (jobId: string) => api.get(`/jobs/${jobId}`),
  getRecommendations: (userId: string) => api.post('/jobs/recommendations', { userId }),
  seedJobs: () => api.post('/jobs/seed'),
};

// Skill Gap API
export const skillGapAPI = {
  analyze: (userId: string, jobId: string) =>
    api.post('/skill-gap/analyze', { userId, jobId }),
  getHistory: (userId: string) => api.get(`/skill-gap/history/${userId}`),
  getForJob: (userId: string, jobId: string) =>
    api.get(`/skill-gap/${userId}/${jobId}`),
};

export default api;
