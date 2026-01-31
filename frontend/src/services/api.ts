import axios from 'axios';

// PRODUCTION URL - DO NOT CHANGE
const API_URL = 'https://careerai-backend-83ct.onrender.com/api';

console.log('🚀 [v3] API Base URL:', API_URL); // v3

const api = axios.create({
  baseURL: API_URL,
  timeout: 120000, // ⭐ INCREASED TO 2 MINUTES (was default 10s)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request setup error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout - backend might be waking up');
    }
    console.error(`❌ ${error.config?.url} - ${error.message}`);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      code: error.code
    });
    return Promise.reject(error);
  }
);

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
    timeout: 180000, // ⭐ 3 MINUTES for file uploads
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
