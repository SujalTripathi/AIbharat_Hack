/**
 * API interceptor for request/response monitoring
 * Add authentication, error handling, and logging
 */

import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { showToast } from './toast';

// Request timing storage
const requestTimings = new Map<string, number>();

/**
 * Setup API interceptors for monitoring and error handling
 */
export const setupAPIInterceptors = (apiInstance: AxiosInstance) => {
  // Request interceptor
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Store request start time
      const requestId = `${config.method}-${config.url}`;
      requestTimings.set(requestId, Date.now());

      // Add authorization token if available
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add request ID for tracking
      if (config.headers) {
        config.headers['X-Request-ID'] = generateRequestId();
      }

      // Log request in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📤 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
          params: config.params
        });
      }

      return config;
    },
    (error: AxiosError) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Calculate request duration
      const requestId = `${response.config.method}-${response.config.url}`;
      const startTime = requestTimings.get(requestId);
      const duration = startTime ? Date.now() - startTime : 0;
      requestTimings.delete(requestId);

      // Log response in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📥 API Response:', {
          method: response.config.method?.toUpperCase(),
          url: response.config.url,
          status: response.status,
          duration: `${duration}ms`,
          data: response.data
        });
      }

      // Track API performance
      if (duration > 3000) {
        console.warn(`⚠️ Slow API call: ${response.config.url} took ${duration}ms`);
      }

      // Handle successful response
      return response;
    },
    async (error: AxiosError) => {
      // Calculate request duration
      if (error.config) {
        const requestId = `${error.config.method}-${error.config.url}`;
        const startTime = requestTimings.get(requestId);
        const duration = startTime ? Date.now() - startTime : 0;
        requestTimings.delete(requestId);

        console.error('❌ API Error:', {
          method: error.config.method?.toUpperCase(),
          url: error.config.url,
          status: error.response?.status,
          duration: `${duration}ms`,
          message: error.message,
          data: error.response?.data
        });
      }

      // Handle specific error cases
      const errorResponse = error.response;

      if (!errorResponse) {
        // Network error
        showToast.error('Network error. Please check your connection.');
        return Promise.reject(error);
      }

      const status = errorResponse.status;
      const errorData: any = errorResponse.data;

      switch (status) {
        case 400:
          // Bad Request
          showToast.error(errorData?.message || 'Invalid request. Please check your input.');
          break;

        case 401:
          // Unauthorized
          showToast.error('Session expired. Please login again.');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          // Redirect to login
          window.location.href = '/login';
          break;

        case 403:
          // Forbidden
          showToast.error('You do not have permission to perform this action.');
          break;

        case 404:
          // Not Found
          showToast.error('Requested resource not found.');
          break;

        case 429:
          // Too Many Requests
          showToast.error('Too many requests. Please try again later.');
          break;

        case 500:
          // Server Error
          showToast.error('Server error. Our team has been notified.');
          break;

        case 503:
          // Service Unavailable
          showToast.error('Service temporarily unavailable. Please try again later.');
          break;

        default:
          showToast.error(errorData?.message || 'An unexpected error occurred.');
      }

      // Log error to monitoring service in production
      if (process.env.NODE_ENV === 'production') {
        logErrorToService(error);
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Log error to monitoring service
 */
function logErrorToService(error: AxiosError) {
  try {
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    const errorData = {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    console.log('Logging error to monitoring service:', errorData);

    // Example: Send to custom endpoint
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // });
  } catch (err) {
    console.error('Failed to log error:', err);
  }
}

/**
 * Retry failed requests
 */
export const retryRequest = async (
  fn: () => Promise<any>,
  retries: number = 3,
  delay: number = 1000
): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying request... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
};

/**
 * Check if error is retryable
 */
export const isRetryableError = (error: AxiosError): boolean => {
  if (!error.response) return true; // Network error
  const status = error.response.status;
  return status >= 500 || status === 429; // Server errors or rate limiting
};

export default setupAPIInterceptors;
